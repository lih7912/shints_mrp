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
import { TabView, TabPanel } from "primereact/tabview";

import { ServiceLib } from "../service/service_lib/ServiceLib";
import { ServiceS040101_PURCHASER_REG } from "../service/service_biz/ServiceS040101_PURCHASER_REG";

import "./page_common.scss";

const moment = require("moment");

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
    IS_NOT_FIX: "0",
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

    PAY_CONDITION: "",

    CURR_CD2: "",
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

const emptyEDT_KSV_PO_MRP4 = {
    MATL_PRICE: "",
    CURR_CD: "",
};

const S040101_PURCHASER_REG = () => {
    const serviceLibRef = useRef(null);
    if (!serviceLibRef.current) {
        serviceLibRef.current = new ServiceLib();
        serviceLibRef.current.loginConfirm();
    }
    const serviceLib = serviceLibRef.current;
    const serviceS040101_PURCHASER_REGRef = useRef(null);
    if (!serviceS040101_PURCHASER_REGRef.current) serviceS040101_PURCHASER_REGRef.current = new ServiceS040101_PURCHASER_REG();
    const serviceS040101_PURCHASER_REG = serviceS040101_PURCHASER_REGRef.current;

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

    //

    const popup_INFO = (argObj) => {
        var tObj = { ...argObj };

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
    };

    const process_UPDATE_MATL_PRICE_COL = () => {
        var tEdit = { ...dataEDT_KSV_PO_MRP4 };

        var tArray = [];
        datasTBL_KSV_PO_MRP4.forEach((col, i) => {
            var tFlag = 0;
            selectedTBL_KSV_PO_MRP4.forEach((col1, i) => {
                if (col.MATL_CD === col1.MATL_CD) tFlag = 1;
            });
            var tObj = { ...col };
            if (tFlag === 1) {
                tObj.MATL_PRICE = tEdit.MATL_PRICE;
                tObj.CURR_CD = tEdit.CURR_CD;
            }
            tArray.push(tObj);
        });

        setDatasTBL_KSV_PO_MRP4(tArray);
        setSelectedTBL_KSV_PO_MRP4([]);
    };

    const process_UPDATE_MATL_PRICE = () => {
        var tInputs = [...datasTBL_KSV_PO_MRP4];

        serviceS040101_PURCHASER_REG
            .mgrUpdate_UPDATE_MATL_PRICE(tInputs)
            .then((data) => {
                if (typeof data.graphQLErrors === "undefined") {
                    if (data.length > 0) {
                        alert(data[0].CODE);
                    }
                } else {
                    console.log(
                        "mgrQuery_PO_CD error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });
    };

    const process_RESET_QRY = () => {
        console.log(datasQRY_KSV_PO_MRP_VENDOR_TYPE);
        setDataQRY_KSV_PO_MRP(emptyQRY_KSV_PO_MRP);
        setDataQRY_KSV_PO_MRP_PU_STATUS(datasQRY_KSV_PO_MRP_PU_STATUS[0]);
        setDataQRY_KSV_PO_MRP_BUYER_CD(datasQRY_KSV_PO_MRP_BUYER_CD[0]);
        setDataQRY_KSV_PO_MRP_VENDOR_TYPE(datasQRY_KSV_PO_MRP_VENDOR_TYPE[0]);
        setDataQRY_KSV_PO_MRP_VENDOR_CD(datasQRY_KSV_PO_MRP_VENDOR_CD[0]);

        setDatasTBL_KSV_PO_MRP1([]);

        process_RESET_EDIT();
    };

    const process_RESET_EDIT = () => {
        setDataEDT_KSV_PO_MRP(emptyEDT_KSV_PO_MRP);
        setDataEDT_KSV_PO_MRP_NORMI(datasEDT_KSV_PO_MRP_NORMI[0]);
        setDataEDT_KSV_PO_MRP_CURR_CD(datasEDT_KSV_PO_MRP_CURR_CD[0]);
        setDataEDT_KSV_PO_MRP_BILL_TO(datasEDT_KSV_PO_MRP_BILL_TO[0]);
        setDataEDT_KSV_PO_MRP_FORWARDER(datasEDT_KSV_PO_MRP_FORWARDER[0]);
        setDataEDT_KSV_PO_MRP_ORIGIN_PORT(datasEDT_KSV_PO_MRP_ORIGIN_PORT[0]);
        setDataEDT_KSV_PO_MRP_TRADE_TERM(datasEDT_KSV_PO_MRP_TRADE_TERM[0]);

        setSelectedTBL_KSV_PO_MRP1([]);

        setDatasTBL_KSV_PO_MRP2([]);
        setSelectedTBL_KSV_PO_MRP2([]);
    };

    const process_APPLY = (argDatas) => {
        var tObjs = [];
        if (typeof argDatas.length !== "undefined") tObjs = [...argDatas];
        else tObjs = [...selectedTBL_KSV_PO_MRP1];

        if (tObjs.length > 20) {
            alert(`PO can only select up to ten`);
            return;
        }

        if (tObjs[0].PU_STATUS !== "New" && tObjs.length > 1) {
            alert(`Please select only one data point.`);
            return;
        }

        if (tObjs[0].PU_STATUS !== "New") {
            // alert(`${tObjs[0].PU_CD}에 대해 Update 내용이 있습니다. purchase info화면으로 이동하며 Update내용을 확인해서 Save 해주세요`);
            alert(
                `${tObjs[0].PU_CD} has an update. You’ll be moved to the [Purchase Info] screen. Please check and save`,
            );
            var tInObj = {};
            tInObj.PU_CD = tObjs[0].PU_CD;
            tInObj.PU_STATUS = tObjs[0].PU_STATUS;
            popup_INFO(tInObj);
            return;
        }

        var tCheckFlag = 0;
        var tBefObj = {};
        tObjs.forEach((col, i) => {
            if (i === 0) {
                tBefObj = { ...col };
            } else {
                if (tBefObj.BUYER_NAME !== col.BUYER_NAME) tCheckFlag = 4;
                if (tBefObj.VENDOR_NAME !== col.VENDOR_NAME) tCheckFlag = 1;
                if (tBefObj.PU_STATUS !== col.PU_STATUS) tCheckFlag = 2;
                if (tBefObj.FACTORY_NAME !== col.FACTORY_NAME) tCheckFlag = 3;
            }
        });
        if (tCheckFlag > 0) {
            var tDetailStr = "";
            if (tCheckFlag === 1) tDetailStr = "You can Same supplier!!";
            if (tCheckFlag === 2) tDetailStr = "You can Same Status!!";
            if (tCheckFlag === 3) tDetailStr = "You can Same Factory!!";
            if (tCheckFlag === 4) tDetailStr = "You can Same Buyer!!";
            alert(tDetailStr);

            return;
        }

        if (tObjs[0].PU_STATUS === "Update") {
            if (tObjs[0].length > 1) {
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

        var tPoArray = [];
        var tSumAmt = 0;
        tObjs.forEach((col, i) => {
            tPoArray.push(col.PO_CD);
            tSumAmt += parseFloat(col.MATL_AMT);
        });

        var tPoCds = "";
        tPoArray.forEach((col, i) => {
            if (col) {
                if (tPoCds === "") tPoCds = `'${col}'`;
                else tPoCds += `/'${col}'`;
            }
        });
        var tInObj = { ...tObjs[0] };
        tInObj.PO_CD1 = tPoCds;
        tInObj.S_PO_AMT = String(tSumAmt);

        if (
            tObjs[0].VENDOR_NAME === "BUYER" ||
            dataQRY_KSV_PO_MRP_VENDOR_TYPE.CD_CODE === "4"
        ) {
            search_LIST_3(tInObj, tObjs, "BUYER");
        } else {
            search_LIST_3(tInObj, tObjs);
        }

        //if (dataQRY_KSV_PO_MRP_VENDOR_TYPE)
    };

    const process_APPLY_NOT_PURCHASE = async (argDatas) => {
        var tObjs = [];

        if (typeof argDatas.length !== "undefined") tObjs = [...argDatas];
        else tObjs = [...selectedTBL_KSV_PO_MRP1];

        var tRet = await confirm(
            `We will process [Not Purchased]. If you do so, [STS-IN, STS-OUT, FAC-IN] will be automatically processed.`,
        );
        if (tRet);
        else return;

        if (tObjs[0].PU_STATUS !== "New" && tObjs.length > 1) {
            alert(`Please select only one data point.`);
            return;
        }

        if (tObjs[0].PU_STATUS !== "New") {
            // alert(`${tObjs[0].PU_CD}에 대해 Update 내용이 있습니다. purchase info화면으로 이동하며 Update내용을 확인해서 Save 해주세요`);
            alert(
                `${tObjs[0].PU_CD} has an update. You’ll be moved to the [Purchase Info] screen. Please check and save`,
            );
            var tInObj = {};
            tInObj.PU_CD = tObjs[0].PU_CD;
            tInObj.PU_STATUS = tObjs[0].PU_STATUS;
            popup_INFO(tInObj);
            return;
        }

        var tCheckFlag = 0;
        var tBefObj = {};
        tObjs.forEach((col, i) => {
            if (i === 0) {
                tBefObj = { ...col };
            } else {
                if (tBefObj.BUYER_NAME !== col.BUYER_NAME) tCheckFlag = 4;
                if (tBefObj.VENDOR_NAME !== col.VENDOR_NAME) tCheckFlag = 1;
                if (tBefObj.PU_STATUS !== col.PU_STATUS) tCheckFlag = 2;
                if (tBefObj.FACTORY_NAME !== col.FACTORY_NAME) tCheckFlag = 3;
            }
        });
        if (tCheckFlag > 0) {
            var tDetailStr = "";
            if (tCheckFlag === 1) tDetailStr = "You can Same supplier!!";
            if (tCheckFlag === 2) tDetailStr = "You can Same Status!!";
            if (tCheckFlag === 3) tDetailStr = "You can Same Factory!!";
            if (tCheckFlag === 4) tDetailStr = "You can Same Buyer!!";
            alert(tDetailStr);

            return;
        }

        if (tObjs[0].PU_STATUS === "Update") {
            if (tObjs[0].length > 1) {
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

        var tPoArray = [];
        var tSumAmt = 0;
        tObjs.forEach((col, i) => {
            var tIdx = 0;
            var tFlag = 0;
            for (tIdx = 0; tIdx < tPoArray.length; tIdx++) {
                if (tPoArray[tIdx] === col.PO_CD) {
                    tFlag = 1;
                    break;
                }
            }
            if (tFlag === 0) {
                tPoArray.push(col.PO_CD);
            }
            tSumAmt += parseFloat(col.MATL_AMT);
        });

        var tPoCds = "";
        tPoArray.forEach((col, i) => {
            if (col) {
                if (tPoCds === "") tPoCds = `'${col}'`;
                else tPoCds += `/'${col}'`;
            }
        });
        var tInObj = { ...tObjs[0] };
        tInObj.PO_CD1 = tPoCds;
        tInObj.S_PO_AMT = String(tSumAmt);

        search_LIST_3(tInObj, tObjs, "NOT_PURCHASE");

        //if (dataQRY_KSV_PO_MRP_VENDOR_TYPE)
    };

    // popup
    const popup_MATL_MST = (e) => {
        var tObj = {};
        if (typeof e.MATL_CD !== "undefined") {
            tObj = { ...e };
        } else {
            if (selectedTBL_KSV_PO_MRP2.length <= 0) return;
            tObj = { ...selectedTBL_KSV_PO_MRP2[0] };
        }

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

    const search_LIST_3 = (argInObj, argData, isBuyer) => {
        var tInObj = { ...argInObj };

        var tObj0 = [];
        if (argData.length <= 0) {
            // var tObj0 = [ ...selectedTBL_KSV_PO_MRP1 ];
            tObj0 = [...selectedTBL_KSV_PO_MRP1];
        } else {
            tObj0 = [...argData];
        }

        var tPoCds = "";
        var tSavePo = "";
        var tSaveVendor = "";
        var tFlag = 0;
        tObj0.forEach((col, i) => {
            if (i === 0) {
                tPoCds += col.PO_CD;
                tSavePo = col.PO_CD;
                tSaveVendor = col.VENDOR_CD;
            } else {
                if (tSaveVendor !== col.VENDOR_CD) {
                    tFlag = 1;
                } else {
                    tSaveVendor = col.VENDOR_CD;
                }
                if (tSavePo !== col.PO_CD) {
                    tPoCds += "/" + col.PO_CD;
                    tSavePo = col.PO_CD;
                }
            }
        });

        if (tFlag === 1) {
            toast.current.show({
                severity: "success",
                summary: "Info",
                detail: "동일한 Supplier만 선택가능합니다.",
                life: 3000,
            });
            return;
        }

        var tObj = {};
        tObj.PO_CD = tPoCds;
        tObj.BUYER_CD = tObj0[0].BUYER_CD;
        tObj.VENDOR_CD = tObj0[0].VENDOR_CD;
        tObj.MATL_TYPE = tObj0[0].MATL_TYPE;
        tObj.PU_CD2 = tObj0[0].PU_CD2;
        tObj.CURR_CD = tObj0[0].CURR_CD;

        setLoadingTBL_KSV_PO_MRP2(true);

        serviceS040101_PURCHASER_REG.mgrQuery_LIST_3(tObj).then((data) => {
            setLoadingTBL_KSV_PO_MRP2(false);

            var tPayAmt = 0;
            if (typeof data.graphQLErrors === "undefined") {
                var tCurrCd = "";
                var tFactoryCd = "";
                var tSaveCurr = "";
                var tFlagCurr = 0;
                var tVendorType = data.PU_MST_NEW.VENDOR_TYPE;

                var tArray = data.STOCK_MEM.map((col, i) => {
                    if (tSaveCurr !== "" && tSaveCurr !== col.CURR_CD)
                        tFlagCurr = 1;
                    else tSaveCurr = col.CURR_CD;
                    var tObj = { ...col };
                    tObj.id = i + 1;
                    tPayAmt +=
                        parseFloat(tObj.PO_UPDATE_QTY) *
                        parseFloat(tObj.PO_PRICE);
                    console.log(
                        "Pay Amnt:",
                        tPayAmt,
                        parseFloat(tObj.PO_UPDATE_QTY),
                        parseFloat(tObj.PO_PRICE),
                    );
                    if (i === 0) {
                        tCurrCd = tObj.CURR_CD;
                        tFactoryCd = tObj.FACTORY_CD;
                    }
                    return tObj;
                });

                setDatasTBL_KSV_PO_MRP2(tArray);
                // setSelectedTBL_KSV_PO_MRP2(tArray);

                tInObj = { ...data.PU_MST_NEW[0] };
                tInObj.CURR_CD = tCurrCd;
                tInObj.FACTORY_CD = tFactoryCd;
                console.log("Pay Amnt:", String(tPayAmt));
                tInObj.PAY_AMT = String(serviceLib.numToFixed(tPayAmt, 2));
                tInObj.PO_CD1 = argInObj.PO_CD1;
                tInObj.PO_CD2 = argInObj.PO_CD2;
                tInObj.PO_CD3 = argInObj.PO_CD3;
                tInObj.PO_CD4 = argInObj.PO_CD4;
                tInObj.PO_CD5 = argInObj.PO_CD5;
                tInObj.PO_CD6 = argInObj.PO_CD6;
                if (isBuyer) {
                    setDataEDT_KSV_PO_MRP_PAY_CONDITION(
                        datasEDT_KSV_PO_MRP_PAY_CONDITION[15],
                    );
                    tInObj.PAY_CONDITION =
                        datasEDT_KSV_PO_MRP_PAY_CONDITION[15].CD_CODE;
                }
                var tEditObj1 = datasetEDT_KSV_PO_MRP(tInObj);

                if (isBuyer === "NOT_PURCHASE")
                    process_INSERT_PU_MST_NOT_PURCHASE(tEditObj1, tArray);
            } else {
                console.log(
                    "mgrQuery_PO_CD error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });
    };

    const search_LIST_1 = (argData) => {
        var tObj0 = { ...dataQRY_KSV_PO_MRP };
        if (typeof argData.USER_ID !== "undefined") {
            tObj0 = { ...argData };
        } else {
            tObj0 = { ...dataQRY_KSV_PO_MRP };
        }

        tObj0.VENDOR_TYPE = dataQRY_KSV_PO_MRP_VENDOR_TYPE.CD_CODE;

        setSelectedTBL_KSV_PO_MRP1([]);
        setLoadingTBL_KSV_PO_MRP1(true);

        // 2_1
        serviceS040101_PURCHASER_REG.mgrQuery_LIST_1(tObj0).then((data) => {
            setLoadingTBL_KSV_PO_MRP1(false);
            if (typeof data.graphQLErrors === "undefined") {
                var tArray = [];
                if (data.message !== "") alert(data.message);
                data.datas.forEach((col, i) => {
                    var tObj = { ...col };
                    tObj.id = i + 1;

                    tArray.push(tObj);
                });
                // alert(` Data length: ${data.length}/${tArray.length}`);
                setDatasTBL_KSV_PO_MRP1(tArray);
            } else {
                console.log(
                    "mgrQuery_PO_CD error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });
    };

    const process_UPDATE_DEPOSIT = () => {
        var tInObj0 = { ...dataEDT_KSV_PO_MRP };

        var tInObj = { ...dataEDT_KSV_PO_MRP2 };
        tInObj.PU_CD = tInObj0.PU_CD;

        serviceS040101_PURCHASER_REG.mgrInsert_DEPOSIT(tInObj).then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                console.log("mgrInsert_STOCK_IN call => " + data.length);
                if (data.length > 0) {
                    toast.current.show({
                        severity: "success",
                        summary: "Success:Stock_in",
                        detail: data[0].CODE,
                        life: 3000,
                    });
                    if (data[0].CODE.includes("SUCC")) {
                        var tObj = { ...dataEDT_KSV_PO_MRP };
                        tObj.DEPOSIT_REQUEST = "Deposit Req";
                        setDataEDT_KSV_PO_MRP(tObj);
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

        serviceS040101_PURCHASER_REG.mgrInsert_LC(tInObj).then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                console.log("mgrInsert_STOCK_IN call => " + data.length);
                if (data.length > 0) {
                    toast.current.show({
                        severity: "success",
                        summary: "Success:Stock_in",
                        detail: data[0].CODE,
                        life: 3000,
                    });
                    if (data[0].CODE.includes("SUCC")) {
                        var tObj = { ...dataEDT_KSV_PO_MRP };
                        tObj.LC_REQUEST = "Lc Req";
                        setDataEDT_KSV_PO_MRP(tObj);
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

    const process_INSERT_PU_MST_1 = () => {
        var tInput = { ...dataEDT_KSV_PO_MRP };

        console.log(tInput);

        var tStr = "";
        if (tInput.NORMI === "") tStr = `NORMI/`;
        // if (tInput.ORDER_DATE === '') tStr += `Order Date/`;
        if (tInput.DUE_DATE === "") tStr += `Due Date/`;
        if (tInput.BITT_TO === "") tStr += `Bill to/`;
        if (tInput.EX_FACTORY === "") tStr += `Ex Factory/`;
        if (tInput.PAY_DATE === "") tStr += `Pay Date/`;
        // if (tInput.FORWARDER === '') tStr += `Forwarder/`;
        // if (tInput.ORIGIN_PORT === '') tStr += `Origin Port/`;
        if (dataEDT_KSV_PO_MRP_TRADE_TERM.CD_CODE === "") tStr += `Trade Term/`;
        // if (tInput.PAY_CONDITION.trim() === '') tStr += `Pay Condition/`;
        if (dataEDT_KSV_PO_MRP_PAY_CONDITION.CD_CODE === "")
            tStr += `Pay Condition/`;
        if (tStr !== "") {
            alert(`${tStr} 항목을 입력해야 합니다.<br><br>${tStr} is required.`);
            return;
        }

        tInput.TRADE_TERM = dataEDT_KSV_PO_MRP_TRADE_TERM.CD_CODE;
        tInput.PAY_CONDITION = dataEDT_KSV_PO_MRP_PAY_CONDITION.CD_CODE;

        if (tInput.CURR_CD === null) tInput.CURR_CD = "USD";
        if (typeof tInput.CURR_CD === "undefined") tInput.CURR_CD = "USD";

        var tInput1 = [];
        if (selectedTBL_KSV_PO_MRP1.length <= 0) return;
        var tObjs = selectedTBL_KSV_PO_MRP1.forEach((col, i) => {
            var tObj = { ...col };
            if (typeof tObj.__typename !== "undefined") delete tObj.__typename;
            if (typeof tObj.id !== "undefined") delete tObj.id;
            tInput1.push(tObj);
        });

        var tInput2 = [];
        var tFlag = 0;

        if (datasTBL_KSV_PO_MRP2.length <= 0) {
            alert("작업할 자재 데이타가 없습니다. <br><br>There is no material data to work with.");
            return;
        }

        var tSaveCurr = "";
        var tFlagCurr = 0;
        var tObjs = datasTBL_KSV_PO_MRP2.forEach((col, i) => {
            var tObj = { ...col };
            if (typeof tObj.__typename !== "undefined") delete tObj.__typename;
            if (typeof tObj.id !== "undefined") delete tObj.id;

            if (tSaveCurr !== "" && tSaveCurr !== col.CURR_CD) tFlagCurr = 1;
            else tSaveCurr = col.CURR_CD;

            if (typeof tObj.SURCHARGE_AMT === "undefined")
                tObj.SURCHARGE_AMT = "0";
            if (parseFloat(tObj.MASTER_PRICE) <= 0) tFlag = 1;

            tObj.PO_UPDATE_QTY = tObj.PO_QTY;

            var tDatas = [...tObj.DATAS];
            var tDatas1 = [];
            tDatas.forEach((col1, i1) => {
                var tObj2 = { ...col1 };
                if (typeof tObj2.__typename !== "undefined")
                    delete tObj2.__typename;
                if (typeof tObj2.id !== "undefined") delete tObj2.id;
                tDatas1.push(tObj2);
            });
            tObj.DATAS = [...tDatas1];

            tInput2.push(tObj);
        });

        if (tFlagCurr === 1) {
            alert(
                "Please Unify Currency : 동일한 화폐만 PU MST로 묶을수 있습니다",
            );

            return;
        }

        setLoadingTBL_KSV_PO_MRP2(true);
        serviceS040101_PURCHASER_REG
            .mgrInsert_PU_MST_1(tInput, tInput1, tInput2)
            .then((data) => {
                setLoadingTBL_KSV_PO_MRP2(false);
                if (typeof data.graphQLErrors === "undefined") {
                    console.log("mgrInsert_STOCK_IN call => " + data.length);
                    if (data.length > 0) {
                        alert(data[0].CODE);
                        if (data[0].CODE.includes("SUCC")) {
                            var tArray = [];
                            datasTBL_KSV_PO_MRP1.forEach((col, i) => {
                                var tCheck = 0;
                                selectedTBL_KSV_PO_MRP1.forEach((col1, i1) => {
                                    if (
                                        col.PO_CD === col1.PO_CD &&
                                        col.VENDOR_NAME === col1.VENDOR_NAME &&
                                        col.BUYER_NAME === col1.BUYER_NAME
                                    ) {
                                        tCheck = 1;
                                    }
                                });
                                if (tCheck === 0) tArray.push(col);
                            });

                            setDatasTBL_KSV_PO_MRP1(tArray);
                            setSelectedTBL_KSV_PO_MRP1([]);
                            setDataEDT_KSV_PO_MRP(emptyEDT_KSV_PO_MRP);

                            setSelectedTBL_KSV_PO_MRP2([]);
                            setDatasTBL_KSV_PO_MRP2([]);

                            // search_LIST_1({});

                            // setSelectedTBL_KSV_PO_MRP1([]);
                            // search_LIST_2();

                            // setCreateDialog(false);

                            // Won 잠시막음 : 화면 사라지는 현상: 0319
                            var tCols = data[0].CODE.split(":");
                            var tPuCd = "";
                            if (tCols.length > 2) tPuCd = tCols[2];

                            var tUrl = `${window.location.origin}/#/`;
                            tUrl += `S0401_PURCHASING_MANAGER?OP_CODE=SEARCH&PU_CD=${tPuCd}`;

                            var tUrl2 = `S0401_PURCHASING_MANAGER?OP_CODE=SEARCH&PU_CD=${tPuCd}`;
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
                        } else {
                            toast.current.show({
                                severity: "success",
                                summary: "Error:Stock_in",
                                detail: data[0].CODE,
                                life: 3000,
                            });
                        }
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

    const process_INSERT_PU_MST_NOT_PURCHASE = (argEdit, argStockMems) => {
        var tInput = { ...argEdit };

        console.log(tInput);

        if (!tInput.DUE_DATE) tInput.DUE_DATE = tInput.PAY_DATE;
        if (!tInput.EX_FACTORY) tInput.EX_FACTORY = tInput.DUE_DATE;

        var tStr = "";
        if (tInput.NORMI === "") tStr = `NORMI/`;
        // if (tInput.ORDER_DATE === '') tStr += `Order Date/`;
        if (tInput.DUE_DATE === "") tStr += `Due Date/`;
        if (tInput.BITT_TO === "") tStr += `Bill to/`;
        if (tInput.EX_FACTORY === "") tStr += `Ex Factory/`;
        if (tInput.PAY_DATE === "") tStr += `Pay Date/`;
        // if (tInput.FORWARDER === '') tStr += `Forwarder/`;
        // if (tInput.ORIGIN_PORT === '') tStr += `Origin Port/`;
        if (dataEDT_KSV_PO_MRP_TRADE_TERM.CD_CODE === "") tStr += `Trade Term/`;
        // if (tInput.PAY_CONDITION.trim() === '') tStr += `Pay Condition/`;
        if (dataEDT_KSV_PO_MRP_PAY_CONDITION.CD_CODE === "")
            tStr += `Pay Condition/`;
        if (tStr !== "") {
            alert(`${tStr} 항목을 입력해야 합니다.<br><br>${tStr} is required.`);
            return;
        }

        tInput.TRADE_TERM = dataEDT_KSV_PO_MRP_TRADE_TERM.CD_CODE;
        tInput.PAY_CONDITION = dataEDT_KSV_PO_MRP_PAY_CONDITION.CD_CODE;

        if (tInput.CURR_CD === null) tInput.CURR_CD = "USD";
        if (typeof tInput.CURR_CD === "undefined") tInput.CURR_CD = "USD";

        var tInput1 = [];
        if (selectedTBL_KSV_PO_MRP1.length <= 0) return;
        var tObjs = selectedTBL_KSV_PO_MRP1.forEach((col, i) => {
            var tObj = { ...col };
            if (typeof tObj.__typename !== "undefined") delete tObj.__typename;
            if (typeof tObj.id !== "undefined") delete tObj.id;
            tInput1.push(tObj);
        });

        var tInput2 = [];
        var tFlag = 0;

        if (argStockMems.length <= 0) {
            alert("작업할 자재 데이타가 없습니다. <br><br>There is no material data to work with.");
            return;
        }

        var tSaveCurr = "";
        var tFlagCurr = 0;
        var tObjs = argStockMems.forEach((col, i) => {
            var tObj = { ...col };
            if (typeof tObj.__typename !== "undefined") delete tObj.__typename;
            if (typeof tObj.id !== "undefined") delete tObj.id;

            if (tSaveCurr !== "" && tSaveCurr !== col.CURR_CD) tFlagCurr = 1;
            else tSaveCurr = col.CURR_CD;

            if (typeof tObj.SURCHARGE_AMT === "undefined")
                tObj.SURCHARGE_AMT = "0";
            if (parseFloat(tObj.MASTER_PRICE) <= 0) tFlag = 1;

            tObj.PO_UPDATE_QTY = tObj.PO_QTY;

            var tDatas = [...tObj.DATAS];
            var tDatas1 = [];
            tDatas.forEach((col1, i1) => {
                var tObj2 = { ...col1 };
                if (typeof tObj2.__typename !== "undefined")
                    delete tObj2.__typename;
                if (typeof tObj2.id !== "undefined") delete tObj2.id;
                tDatas1.push(tObj2);
            });
            tObj.DATAS = [...tDatas1];

            tInput2.push(tObj);
        });

        if (tFlagCurr === 1) {
            alert(
                "Please Unify Currency : 동일한 화폐만 PU MST로 묶을수 있습니다",
            );

            return;
        }

        setLoadingTBL_KSV_PO_MRP2(true);
        serviceS040101_PURCHASER_REG
            .mgrInsert_PU_MST_NOT_PURCHASE(tInput, tInput1, tInput2)
            .then((data) => {
                setLoadingTBL_KSV_PO_MRP2(false);
                if (typeof data.graphQLErrors === "undefined") {
                    console.log("mgrInsert_STOCK_IN call => " + data.length);
                    if (data.length > 0) {
                        alert(data[0].CODE);
                        if (data[0].CODE.includes("SUCC")) {
                            var tArray = [];
                            datasTBL_KSV_PO_MRP1.forEach((col, i) => {
                                var tCheck = 0;
                                selectedTBL_KSV_PO_MRP1.forEach((col1, i1) => {
                                    if (
                                        col.PO_CD === col1.PO_CD &&
                                        col.VENDOR_NAME === col1.VENDOR_NAME &&
                                        col.BUYER_NAME === col1.BUYER_NAME
                                    ) {
                                        tCheck = 1;
                                    }
                                });
                                if (tCheck === 0) tArray.push(col);
                            });

                            setDatasTBL_KSV_PO_MRP1(tArray);
                            setSelectedTBL_KSV_PO_MRP1([]);
                            setDataEDT_KSV_PO_MRP(emptyEDT_KSV_PO_MRP);

                            setSelectedTBL_KSV_PO_MRP2([]);
                            setDatasTBL_KSV_PO_MRP2([]);

                            // search_LIST_1({});

                            // setSelectedTBL_KSV_PO_MRP1([]);
                            // search_LIST_2();

                            // setCreateDialog(false);

                            // Won 잠시막음 : 화면 사라지는 현상: 0319
                            var tCols = data[0].CODE.split(":");
                            var tPuCd = "";
                            if (tCols.length > 2) tPuCd = tCols[2];

                            var tUrl = `${window.location.origin}/#/`;
                            tUrl += `S0401_PURCHASING_MANAGER?OP_CODE=SEARCH&PU_CD=${tPuCd}`;

                            var tUrl2 = `S0401_PURCHASING_MANAGER?OP_CODE=SEARCH&PU_CD=${tPuCd}`;
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
                        } else {
                            toast.current.show({
                                severity: "success",
                                summary: "Error:Stock_in",
                                detail: data[0].CODE,
                                life: 3000,
                            });
                        }
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

    const [datasQRY_KSV_PO_MRP_VENDOR_CD, setDatasQRY_KSV_PO_MRP_VENDOR_CD] =
        useState([]);
    const [dataQRY_KSV_PO_MRP_VENDOR_CD, setDataQRY_KSV_PO_MRP_VENDOR_CD] =
        useState({});

    const onDropdownChangeQRY_KSV_PO_MRP_VENDOR_CD = (e, name) => {
        let val = (e.value && e.value.VENDOR_CD) || "";

        let _dataQRY_KSV_PO_MRP = { ...dataQRY_KSV_PO_MRP };

        let tTypeVal = _dataQRY_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_PO_MRP[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_PO_MRP[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_PO_MRP(_dataQRY_KSV_PO_MRP);
        setDataQRY_KSV_PO_MRP_VENDOR_CD(e.value);
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

        console.log(val);

        if (val === "4") {
            // BUYER
            setIsBillTo(true);
            setDataEDT_KSV_PO_MRP({ ...dataEDT_KSV_PO_MRP, PAY_DATE: "" });
            setDataEDT_KSV_PO_MRP_TRADE_TERM(datasEDT_KSV_PO_MRP_TRADE_TERM[0]);
        } else {
            setIsBillTo(false);
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

    const [datasQRY_KSV_PO_MRP_USER_ID, setDatasQRY_KSV_PO_MRP_USER_ID] =
        useState([]);
    const [dataQRY_KSV_PO_MRP_USER_ID, setDataQRY_KSV_PO_MRP_USER_ID] =
        useState({});

    const [isVMorEm, setIsVMorEm] = useState(false);
    const onDropdownChangeQRY_KSV_PO_MRP_USER_ID = (e, name) => {
        let val = (e.value && e.value.USER_ID) || "";

        if (!val) {
            setDataQRY_KSV_PO_MRP(datasQRY_KSV_PO_MRP_USER_ID[0]);
            setDataQRY_KSV_PO_MRP_USER_ID("");
        }

        let _dataQRY_KSV_PO_MRP = { ...dataQRY_KSV_PO_MRP };

        let tTypeVal = _dataQRY_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_PO_MRP[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_PO_MRP[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_PO_MRP(_dataQRY_KSV_PO_MRP);
        setDataQRY_KSV_PO_MRP_USER_ID(e.value);

        var tObj1 = {};
        tObj1.BUYER_CD = "";
        tObj1.USER_ID = e.value.USER_ID;
        serviceS040101_PURCHASER_REG.mgrQuery_CODE2(tObj1).then((data) => {
            console.log(data);
            if (typeof data.graphQLErrors === "undefined") {
                setDatasQRY_KSV_PO_MRP_BUYER_CD(data.BUYER_CD);
                setDataQRY_KSV_PO_MRP_BUYER_CD(data.BUYER_CD[0]);
            } else {
                console.log(
                    "mgrQuery_PO_CD error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });

        let part = e.value.USER_NAME.split("/")[1];

        if (part === "VM" || part === "EM") {
            setDataQRY_KSV_PO_MRP_VENDOR_TYPE(
                datasQRY_KSV_PO_MRP_VENDOR_TYPE[3],
            );
            setIsVMorEm(true);
        } else {
            setDataQRY_KSV_PO_MRP_VENDOR_TYPE(
                datasQRY_KSV_PO_MRP_VENDOR_TYPE[0],
            );
            setIsVMorEm(false);
        }
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

        setDataEDT_KSV_PO_MRP((prev) => ({
            ...prev,
            CURR_CD2: argData.CURR_CD,
        }));

        editEDT_KSV_PO_MRP_CURR_CD2(argData.CURR_CD);
    };

    const onRowDoubleClickTBL_KSV_PO_MRP2 = (argData0) => {
        var tRemark = "";
        var tColName = "";
        var tKeys = Object.keys(argData0.data);
        tKeys.forEach((col, i) => {
            var tValue = argData0.data[`${col}`];
            if (tValue === argData0.originalEvent.target.innerText) {
                tColName = col;
            }
        });
        if (tColName === "MATL_CD") {
            var tObj = {};
            tObj.MATL_CD = argData0.originalEvent.target.innerText;
            popup_MATL_MST(tObj);
        }
    };

    const onCellEditCompleteKSV_PO_MRP2 = (e) => {
        let { rowData, newValue, field, originalEvent: event } = e;

        var tOldAmt =
            parseFloat(rowData["PO_QTY"]) * parseFloat(rowData["PO_PRICE"]);

        if (field === "PO_QTY") {
            rowData[field] = String(
                serviceLib.getFloat(parseFloat(newValue), 2),
            );
            var tMrpQty = parseFloat(rowData.MRP_QTY);
            var tStockQty = parseFloat(rowData.STOCK_QTY);
            var tPoQty = parseFloat(rowData.PO_QTY);
            var tMoqQty = 0;

            var tOrgPoQty = tMrpQty - tStockQty;
            if (tPoQty > tOrgPoQty) {
                tMoqQty = tPoQty - tOrgPoQty;
            }

            tPoQty = serviceLib.getFloat(tPoQty, 2);
            tMrpQty = serviceLib.getFloat(tMrpQty, 2);
            tStockQty = serviceLib.getFloat(tStockQty, 2);
            tMoqQty = serviceLib.getFloat(tMoqQty, 2);
            rowData["PO_QTY"] = String(tPoQty);
            rowData["MRP_QTY"] = String(tMrpQty);
            rowData["STOCK_QTY"] = String(tStockQty);
            rowData["MOQ_QTY"] = String(tMoqQty);
        }

        if (field === "SURCHARGE_AMT") {
            rowData[field] = String(
                serviceLib.getFloat(parseFloat(newValue), 2),
            );
            // var tPoUpdateQty = parseFloat(rowData.PO_UPDATE_QTY);
            var tPoUpdateQty = parseFloat(rowData.PO_QTY);
            var tMasterPrice = parseFloat(rowData.MASTER_PRICE);
            var tSurAmt = parseFloat(rowData.SURCHARGE_AMT);
            var tSurPrice = 0;
            if (tPoUpdateQty > 0)
                tSurPrice = serviceLib.getFloat(tSurAmt / tPoUpdateQty, 2);
            var tPoPrice = tMasterPrice + tSurPrice;

            rowData.SURCHARGE_AMT = String(tSurAmt);
            rowData.SURCHARGE_PRICE = String(tSurPrice);
            rowData.PO_PRICE = String(tPoPrice);
        }
        if (field === "SURCHARGE_REMARK") {
            rowData[field] = newValue;
        }

        var tNewAmt =
            parseFloat(rowData["PO_QTY"]) * parseFloat(rowData["PO_PRICE"]);

        var tDiffAmt = tNewAmt - tOldAmt;

        var tEditObj = { ...dataEDT_KSV_PO_MRP };
        var tPayAmt = parseFloat(tEditObj.PAY_AMT) + tDiffAmt;
        tEditObj.PAY_AMT = String(serviceLib.numToFixed(tPayAmt, 2));
        setDataEDT_KSV_PO_MRP(tEditObj);

        // var _dataTBL_KSV_PO_MRP2 = { ...dataTBL_KSV_PO_MRP2 };
        // setDataTBL_KSV_PO_MRP2(rowData);
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
                value={options.value}
                onChange={(e) => onChangeTextEdit(e, options)}
                onFocus={handleFocus}
            />
        );
    };

    /* QRY KSV_PO_MRP*/
    const [dataEDT_KSV_PO_MRP, setDataEDT_KSV_PO_MRP] =
        useState(emptyEDT_KSV_PO_MRP);

    const datasetEDT_KSV_PO_MRP = (argData) => {
        var tRetDate1 = serviceLib.getCurrDate1();

        var tObj = { ...dataEDT_KSV_PO_MRP };
        tObj.PU_CD = argData.PU_CD;
        tObj.VENDOR_CD = argData.VENDOR_NAME;
        // tObj.VENDOR_TYPE = argData.VENDOR_TYPE;
        tObj.VENDOR_TYPE = argData.VENDOR_TYPE_N;
        tObj.REG_USER = serviceLib.getUserInfo().USER_ID;
        tObj.BUYER_CD = argData.BUYER_CD;
        tObj.PAY_TERM = argData.PAY_TERM;
        tObj.PO_CD1 = argData.PO_CD1;
        tObj.MRP_DATE = argData.MRP_DATE;

        var tSelPayCondition = {};
        if (argData.PAY_CONDITION === "") {
            tObj.PAY_CONDITION = argData.PAY_TYPE;
            setDataEDT_KSV_PO_MRP_PAY_CONDITION(
                datasEDT_KSV_PO_MRP_PAY_CONDITION[0],
            );
        } else {
            datasEDT_KSV_PO_MRP_PAY_CONDITION.forEach((col, i) => {
                if (col.CD_CODE === argData.PAY_CONDITION)
                    tSelPayCondition = { ...col };
            });
            // console.log(`Pay condition:${argData.PAY_CONDITION}`);
            // console.log(tSelPayCondition);
            if (typeof tSelPayCondition.CD_CODE !== "undefined") {
                tObj.PAY_CONDITION = tSelPayCondition.CD_NAME;
                setDataEDT_KSV_PO_MRP_PAY_CONDITION(tSelPayCondition);
            } else {
                tObj.PAY_CONDITION = "";
                setDataEDT_KSV_PO_MRP_PAY_CONDITION(
                    datasEDT_KSV_PO_MRP_PAY_CONDITION[0],
                );
            }
        }

        // tObj.OVER_SHORT  = argData.OVER_SHORT;
        tObj.OVER_SHORT = argData.OVERSHORT_RATE;
        tObj.PO_CD2 = argData.PO_CD2;
        // tObj.TARGET_ETA  = argData.TARGET_ETA;
        tObj.TARGET_ETA = argData.MATL_DUE_DATE;

        tObj.CURR_CD = argData.CURR_CD;
        editEDT_KSV_PO_MRP_CURR_CD(argData.CURR_CD);

        tObj.PI_NO = argData.P_PI_NO;

        tObj.PO_CD3 = argData.PO_CD3;

        tObj.ORDER_DATE = "";
        // tObj.ORDER_DATE = serviceLib.getCurrDate1();
        // tObj.PAY_AMT = argData.S_PO_AMT;
        tObj.PAY_AMT = argData.PAY_AMT;
        tObj.PI_FILE = argData.PI_FILE;

        tObj.PO_CD4 = argData.PO_CD4;
        // tObj.DUE_DATE = argData.PROD_DUE_DATE;
        tObj.DUE_DATE = tObj.TARGET_ETA;

        if (argData.FACTORY_CD === "FC034") tObj.SHIP_TO = "BVT";
        else if (argData.FACTORY_CD === "FC044") tObj.SHIP_TO = "ETP";
        else if (argData.FACTORY_CD === "FC010") tObj.SHIP_TO = "SHINTS";
        else if (argData.FACTORY_CD === "FC045") tObj.SHIP_TO = "SHINTS";
        else tObj.SHIP_TO = "OTHER";

        if (argData.VENDOR_TYPE === "1") {
            tObj.BILL_TO = "SHINTS";
            editEDT_KSV_PO_MRP_BILL_TO("SHINTS");
            tObj.NORMI = "X";
            tObj.TRADE_TERM = "FOB";
            editEDT_KSV_PO_MRP_NORMI("X");
            editEDT_KSV_PO_MRP_TRADE_TERM("FOB");
        } else if (argData.VENDOR_TYPE === "3") {
            tObj.BILL_TO = "SHINTS";
            editEDT_KSV_PO_MRP_BILL_TO("SHINTS");
            tObj.NORMI = "X";
            editEDT_KSV_PO_MRP_NORMI("X");
            tObj.TRADE_TERM = "FOB";
            editEDT_KSV_PO_MRP_TRADE_TERM("FOB");
        } else if (argData.VENDOR_TYPE === "4") {
            tObj.BILL_TO = "BUYER";
            editEDT_KSV_PO_MRP_BILL_TO("BUYER");
            tObj.NORMI = "O";
            editEDT_KSV_PO_MRP_NORMI("O");
            tObj.TRADE_TERM = "FOB";
            editEDT_KSV_PO_MRP_TRADE_TERM("FOB");
        } else if (argData.VENDOR_TYPE === "5") {
            if (tObj.SHIP_TO === "BVT") tObj.BILL_TO = "BVT";
            else if (tObj.SHIP_TO === "ETP") tObj.BILL_TO = "ETP";
            else tObj.BILL_TO = "";
            editEDT_KSV_PO_MRP_BILL_TO(tObj.BILL_TO);
            tObj.NORMI = "X";
            editEDT_KSV_PO_MRP_NORMI("X");
            tObj.TRADE_TERM = "DDP";
            editEDT_KSV_PO_MRP_TRADE_TERM("DDP");
        } else {
            tObj.BILL_TO = "";
            editEDT_KSV_PO_MRP_BILL_TO(tObj.BILL_TO);
            tObj.NORMI = "X";
            editEDT_KSV_PO_MRP_NORMI("X");
            tObj.TRADE_TERM = "DDP";
            editEDT_KSV_PO_MRP_TRADE_TERM("FOB");
        }

        tObj.PO_CD5 = argData.PO_CD5;
        // tObj.EX_FACTORY  = argData.MATL_DUE_DATE;
        // tObj.EX_FACTORY  = tRetDate1;
        if (tObj.DUE_DATE) tObj.EX_FACTORY = tObj.DUE_DATE;
        else tObj.EX_FACTORY = "";
        tObj.PAY_DATE = tRetDate1;

        tObj.PO_CD6 = argData.PO_CD6;

        editEDT_KSV_PO_MRP_FORWARDER("");

        editEDT_KSV_PO_MRP_ORIGIN_PORT("");

        setDataEDT_KSV_PO_MRP(tObj);

        return tObj;
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

    const onInputChangeEDT_KSV_PO_MRP_VENDOR_CD = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_PO_MRP = { ...dataEDT_KSV_PO_MRP };

        let tTypeVal = _dataEDT_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string") _dataEDT_KSV_PO_MRP[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_PO_MRP[`${name}`] = parseInt(val);

        setDataEDT_KSV_PO_MRP(_dataEDT_KSV_PO_MRP);
    };

    const onInputChangeEDT_KSV_PO_MRP_VENDOR_TYPE = (e, name) => {
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

    const onInputChangeEDT_KSV_PO_MRP_BUYER_CD = (e, name) => {
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

    const onInputChangeEDT_KSV_PO_MRP_PO_CD1 = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_PO_MRP = { ...dataEDT_KSV_PO_MRP };

        let tTypeVal = _dataEDT_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string") _dataEDT_KSV_PO_MRP[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_PO_MRP[`${name}`] = parseInt(val);

        setDataEDT_KSV_PO_MRP(_dataEDT_KSV_PO_MRP);
    };
    const onCalChangeEDT_KSV_PO_MRP_MRP_DATE = (e, name) => {
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

    const [datasEDT_KSV_PO_MRP_NORMI, setDatasEDT_KSV_PO_MRP_NORMI] = useState(
        [],
    );
    const [dataEDT_KSV_PO_MRP_NORMI, setDataEDT_KSV_PO_MRP_NORMI] = useState(
        {},
    );

    const editEDT_KSV_PO_MRP_NORMI = (argValue) => {
        let _dataEDT_KSV_PO_MRP_NORMI = datasEDT_KSV_PO_MRP_NORMI.filter(
            (val) => val.CD_CODE === argValue,
        );
        setDataEDT_KSV_PO_MRP_NORMI(_dataEDT_KSV_PO_MRP_NORMI[0]);
    };
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
    const onDropdownChangeEDT_KSV_PO_MRP_CURR_CD2 = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataEDT_KSV_PO_MRP = { ...dataEDT_KSV_PO_MRP };

        let tTypeVal = _dataEDT_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_KSV_PO_MRP[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_KSV_PO_MRP[`${name}`] = parseInt(val);
        }

        setDataEDT_KSV_PO_MRP(_dataEDT_KSV_PO_MRP);
        setDataEDT_KSV_PO_MRP_CURR_CD2(e.value);
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

    const onInputChangeEDT_KSV_PO_MRP_PO_CD2 = (e, name) => {
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
    const onInputChangeEDT_KSV_PO_MRP_PAY_AMT = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_PO_MRP = { ...dataEDT_KSV_PO_MRP };

        let tTypeVal = _dataEDT_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string") _dataEDT_KSV_PO_MRP[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_PO_MRP[`${name}`] = parseInt(val);

        setDataEDT_KSV_PO_MRP(_dataEDT_KSV_PO_MRP);
    };

    const onCalChangeEDT_KSV_PO_MRP_DUE_DATE = (e, name) => {
        let val1 = e.value || "";
        let val = "";
        if (val1 === "") {
            val = "";
        } else {
            val = getDateVal(val1);
        }

        let _dataEDT_KSV_PO_MRP = { ...dataEDT_KSV_PO_MRP };
        _dataEDT_KSV_PO_MRP[`${name}`] = val;
        _dataEDT_KSV_PO_MRP.EX_FACTORY = val;
        if (_dataEDT_KSV_PO_MRP.TARGET_ETA === "")
            _dataEDT_KSV_PO_MRP.TARGET_ETA = val;
        setDataEDT_KSV_PO_MRP(_dataEDT_KSV_PO_MRP);
    };
    const [datasEDT_KSV_PO_MRP_BILL_TO, setDatasEDT_KSV_PO_MRP_BILL_TO] =
        useState([]);
    const [dataEDT_KSV_PO_MRP_BILL_TO, setDataEDT_KSV_PO_MRP_BILL_TO] =
        useState({});

    const editEDT_KSV_PO_MRP_BILL_TO = (argValue) => {
        let _dataEDT_KSV_PO_MRP_BILL_TO = datasEDT_KSV_PO_MRP_BILL_TO.filter(
            (val) => val.CD_CODE === argValue,
        );
        setDataEDT_KSV_PO_MRP_BILL_TO(_dataEDT_KSV_PO_MRP_BILL_TO[0]);
    };

    const [isBillTo, setIsBillTo] = useState(false);

    const onDropdownChangeEDT_KSV_PO_MRP_BILL_TO = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataEDT_KSV_PO_MRP = { ...dataEDT_KSV_PO_MRP };

        let tTypeVal = _dataEDT_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_KSV_PO_MRP[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_KSV_PO_MRP[`${name}`] = parseInt(val);
        }

        setDataEDT_KSV_PO_MRP(_dataEDT_KSV_PO_MRP);
        setDataEDT_KSV_PO_MRP_BILL_TO(e.value);

        console.log(val);

        if (val === "BUYER") {
            setIsBillTo(true);
            setDataEDT_KSV_PO_MRP({ ...dataEDT_KSV_PO_MRP, PAY_DATE: "" });
            setDataEDT_KSV_PO_MRP_TRADE_TERM(datasEDT_KSV_PO_MRP_TRADE_TERM[0]);
        } else {
            setIsBillTo(false);
        }
    };

    const [
        datasEDT_KSV_PO_MRP_PAY_CONDITION,
        setDatasEDT_KSV_PO_MRP_PAY_CONDITION,
    ] = useState([]);
    const [
        dataEDT_KSV_PO_MRP_PAY_CONDITION,
        setDataEDT_KSV_PO_MRP_PAY_CONDITION,
    ] = useState({});

    const onDropdownChangeEDT_KSV_PO_MRP_PAY_CONDITION = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataEDT_KSV_PO_MRP = { ...dataEDT_KSV_PO_MRP };

        let tTypeVal = _dataEDT_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_KSV_PO_MRP[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_KSV_PO_MRP[`${name}`] = parseInt(val);
        }

        setDataEDT_KSV_PO_MRP(_dataEDT_KSV_PO_MRP);
        setDataEDT_KSV_PO_MRP_PAY_CONDITION(e.value);
    };

    const [datasEDT_KSV_PO_MRP_CURR_CD, setDatasEDT_KSV_PO_MRP_CURR_CD] =
        useState([]);
    const [dataEDT_KSV_PO_MRP_CURR_CD, setDataEDT_KSV_PO_MRP_CURR_CD] =
        useState({});

    const editEDT_KSV_PO_MRP_CURR_CD = (argValue) => {
        let _dataEDT_KSV_PO_MRP_CURR_CD = datasEDT_KSV_PO_MRP_CURR_CD.filter(
            (val) => val.CD_CODE === argValue,
        );
        setDataEDT_KSV_PO_MRP_CURR_CD(_dataEDT_KSV_PO_MRP_CURR_CD[0]);
    };

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

    const [datasEDT_KSV_PO_MRP_FORWARDER, setDatasEDT_KSV_PO_MRP_FORWARDER] =
        useState([]);
    const [dataEDT_KSV_PO_MRP_FORWARDER, setDataEDT_KSV_PO_MRP_FORWARDER] =
        useState({});

    const editEDT_KSV_PO_MRP_FORWARDER = (argValue) => {
        let _dataEDT_KSV_PO_MRP_FORWARDER =
            datasEDT_KSV_PO_MRP_FORWARDER.filter(
                (val) => val.PLACE_CD === argValue,
            );
        setDataEDT_KSV_PO_MRP_FORWARDER(_dataEDT_KSV_PO_MRP_FORWARDER[0]);
    };

    const onDropdownChangeEDT_KSV_PO_MRP_FORWARDER = (e, name) => {
        let val = (e.value && e.value.PLACE_CD) || "";

        let _dataEDT_KSV_PO_MRP = { ...dataEDT_KSV_PO_MRP };

        let tTypeVal = _dataEDT_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_KSV_PO_MRP[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_KSV_PO_MRP[`${name}`] = parseInt(val);
        }

        setDataEDT_KSV_PO_MRP(_dataEDT_KSV_PO_MRP);
        setDataEDT_KSV_PO_MRP_FORWARDER(e.value);
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

    const [dataEDT_PRICE_UPDATE, setDataEDT_PRICE_UPDATE] = useState("");
    const [visibleDialogReason, setVisibleDialogReason] = useState(false);
    const [reasonMap, setReasonMap] = useState({}); // MATL_CD => REASON

    const onReasonChange = (matlCd, value) => {
        setReasonMap((prev) => ({ ...prev, [matlCd]: value }));
    };

    const transferPriceUpdateData = async () => {
        let tEdtObj = { ...dataEDT_KSV_PO_MRP };

        let updateCurrCd = tEdtObj.CURR_CD2;
        let updatePrice = dataEDT_PRICE_UPDATE;
        let selectedRowpriceUpdate = selectedTBL_KSV_PO_MRP2;

        const missingReasons = selectedRowpriceUpdate.filter(
            (item) =>
                !reasonMap[item.MATL_CD] ||
                reasonMap[item.MATL_CD].trim() === "",
        );

        if (
            missingReasons.length > 0 &&
            selectedRowpriceUpdate[0].MASTER_PRICE != 0
        ) {
            alert("Please enter the reason.");
            return false;
        }

        try {
            for (const item of selectedRowpriceUpdate) {
                await serviceS040101_PURCHASER_REG.mgrUpdate_UPDATE_MATL_PRICE({
                    MATL_CD: item.MATL_CD,
                    CURR_CD: updateCurrCd,
                    MATL_PRICE: updatePrice,
                    UPDATE_REASON: reasonMap[item.MATL_CD],
                });
            }

            alert("The price has been successfully updated.");
            process_APPLY(selectedTBL_KSV_PO_MRP1);
            return true;
        } catch (e) {
            console.error("가격 업데이트 실패:", e);
            alert("An error occurred while updating the price.");
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
        let tEdtObj = { ...dataEDT_KSV_PO_MRP };

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

    const [datasEDT_KSV_PO_MRP_TRADE_TERM, setDatasEDT_KSV_PO_MRP_TRADE_TERM] =
        useState([]);
    const [dataEDT_KSV_PO_MRP_TRADE_TERM, setDataEDT_KSV_PO_MRP_TRADE_TERM] =
        useState({});

    const editEDT_KSV_PO_MRP_TRADE_TERM = (argValue) => {
        let _dataEDT_KSV_PO_MRP_TRADE_TERM =
            datasEDT_KSV_PO_MRP_TRADE_TERM.filter(
                (val) => val.CD_CODE === argValue,
            );
        setDataEDT_KSV_PO_MRP_TRADE_TERM(_dataEDT_KSV_PO_MRP_TRADE_TERM[0]);
    };

    const onDropdownChangeEDT_KSV_PO_MRP_TRADE_TERM = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataEDT_KSV_PO_MRP = { ...dataEDT_KSV_PO_MRP };

        let tTypeVal = _dataEDT_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_KSV_PO_MRP[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_KSV_PO_MRP[`${name}`] = parseInt(val);
        }

        setDataEDT_KSV_PO_MRP(_dataEDT_KSV_PO_MRP);
        setDataEDT_KSV_PO_MRP_TRADE_TERM(e.value);
    };

    /* QRY KSV_PO_MRP*/
    const [dataEDT_KSV_PO_MRP2, setDataEDT_KSV_PO_MRP2] =
        useState(emptyEDT_KSV_PO_MRP2);

    const onInputChangeEDT_KSV_PO_MRP2_REG_USER = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_PO_MRP2 = { ...dataEDT_KSV_PO_MRP2 };

        let tTypeVal = _dataEDT_KSV_PO_MRP2[`${name}`];
        if (typeof tTypeVal === "string") _dataEDT_KSV_PO_MRP2[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_PO_MRP2[`${name}`] = parseInt(val);

        setDataEDT_KSV_PO_MRP2(_dataEDT_KSV_PO_MRP2);
    };

    const onInputChangeEDT_KSV_PO_MRP2_VENDOR_NAME = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_PO_MRP2 = { ...dataEDT_KSV_PO_MRP2 };

        let tTypeVal = _dataEDT_KSV_PO_MRP2[`${name}`];
        if (typeof tTypeVal === "string") _dataEDT_KSV_PO_MRP2[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_PO_MRP2[`${name}`] = parseInt(val);

        setDataEDT_KSV_PO_MRP2(_dataEDT_KSV_PO_MRP2);
    };

    const onInputChangeEDT_KSV_PO_MRP2_PAY_CONDITION = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_PO_MRP2 = { ...dataEDT_KSV_PO_MRP2 };

        let tTypeVal = _dataEDT_KSV_PO_MRP2[`${name}`];
        if (typeof tTypeVal === "string") _dataEDT_KSV_PO_MRP2[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_PO_MRP2[`${name}`] = parseInt(val);

        setDataEDT_KSV_PO_MRP2(_dataEDT_KSV_PO_MRP2);
    };

    const onInputChangeEDT_KSV_PO_MRP2_CURRENCY = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_PO_MRP2 = { ...dataEDT_KSV_PO_MRP2 };

        let tTypeVal = _dataEDT_KSV_PO_MRP2[`${name}`];
        if (typeof tTypeVal === "string") _dataEDT_KSV_PO_MRP2[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_PO_MRP2[`${name}`] = parseInt(val);

        setDataEDT_KSV_PO_MRP2(_dataEDT_KSV_PO_MRP2);
    };

    const onInputChangeEDT_KSV_PO_MRP2_AMOUNT = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_PO_MRP2 = { ...dataEDT_KSV_PO_MRP2 };

        let tTypeVal = _dataEDT_KSV_PO_MRP2[`${name}`];
        if (typeof tTypeVal === "string") _dataEDT_KSV_PO_MRP2[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_PO_MRP2[`${name}`] = parseInt(val);

        setDataEDT_KSV_PO_MRP2(_dataEDT_KSV_PO_MRP2);
    };

    const onInputChangeEDT_KSV_PO_MRP2_DEPOSIT_AMOUNT = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_PO_MRP2 = { ...dataEDT_KSV_PO_MRP2 };

        let tTypeVal = _dataEDT_KSV_PO_MRP2[`${name}`];
        if (typeof tTypeVal === "string") _dataEDT_KSV_PO_MRP2[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_PO_MRP2[`${name}`] = parseInt(val);

        setDataEDT_KSV_PO_MRP2(_dataEDT_KSV_PO_MRP2);
    };

    const onInputChangeEDT_KSV_PO_MRP2_DEPOSIT_RATE = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_PO_MRP2 = { ...dataEDT_KSV_PO_MRP2 };

        let tTypeVal = _dataEDT_KSV_PO_MRP2[`${name}`];
        if (typeof tTypeVal === "string") _dataEDT_KSV_PO_MRP2[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_PO_MRP2[`${name}`] = parseInt(val);

        setDataEDT_KSV_PO_MRP2(_dataEDT_KSV_PO_MRP2);
    };

    const onCalChangeEDT_KSV_PO_MRP2_PAY_DATE = (e, name) => {
        let val1 = e.value || "";
        let val = "";
        if (val1 === "") {
            val = "";
        } else {
            val = getDateVal(val1);
        }

        let _dataEDT_KSV_PO_MRP2 = { ...dataEDT_KSV_PO_MRP2 };
        _dataEDT_KSV_PO_MRP2[`${name}`] = val;
        setDataEDT_KSV_PO_MRP2(_dataEDT_KSV_PO_MRP2);
    };

    const [datasEDT_KSV_PO_MRP2_PAY_BANK, setDatasEDT_KSV_PO_MRP2_PAY_BANK] =
        useState([]);
    const [dataEDT_KSV_PO_MRP2_PAY_BANK, setDataEDT_KSV_PO_MRP2_PAY_BANK] =
        useState({});

    const onDropdownChangeEDT_KSV_PO_MRP2_PAY_BANK = (e, name) => {
        let val = (e.value && e.value.PAY_BANK) || "";

        let _dataEDT_KSV_PO_MRP2 = { ...dataEDT_KSV_PO_MRP2 };

        let tTypeVal = _dataEDT_KSV_PO_MRP2[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_KSV_PO_MRP2[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_KSV_PO_MRP2[`${name}`] = parseInt(val);
        }

        setDataEDT_KSV_PO_MRP2(_dataEDT_KSV_PO_MRP2);
        setDataEDT_KSV_PO_MRP2_PAY_BANK(e.value);
    };

    /* QRY KSV_PO_MRP*/
    const [dataEDT_KSV_PO_MRP3, setDataEDT_KSV_PO_MRP3] =
        useState(emptyEDT_KSV_PO_MRP3);

    const onInputChangeEDT_KSV_PO_MRP3_REG_USER = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_PO_MRP3 = { ...dataEDT_KSV_PO_MRP3 };

        let tTypeVal = _dataEDT_KSV_PO_MRP3[`${name}`];
        if (typeof tTypeVal === "string") _dataEDT_KSV_PO_MRP3[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_PO_MRP3[`${name}`] = parseInt(val);

        setDataEDT_KSV_PO_MRP3(_dataEDT_KSV_PO_MRP3);
    };

    const onInputChangeEDT_KSV_PO_MRP3_BUYER_NAME = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_PO_MRP3 = { ...dataEDT_KSV_PO_MRP3 };

        let tTypeVal = _dataEDT_KSV_PO_MRP3[`${name}`];
        if (typeof tTypeVal === "string") _dataEDT_KSV_PO_MRP3[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_PO_MRP3[`${name}`] = parseInt(val);

        setDataEDT_KSV_PO_MRP3(_dataEDT_KSV_PO_MRP3);
    };

    const onInputChangeEDT_KSV_PO_MRP3_VENDOR_NAME = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_PO_MRP3 = { ...dataEDT_KSV_PO_MRP3 };

        let tTypeVal = _dataEDT_KSV_PO_MRP3[`${name}`];
        if (typeof tTypeVal === "string") _dataEDT_KSV_PO_MRP3[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_PO_MRP3[`${name}`] = parseInt(val);

        setDataEDT_KSV_PO_MRP3(_dataEDT_KSV_PO_MRP3);
    };

    const onInputChangeEDT_KSV_PO_MRP3_TRADE_TERM = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_PO_MRP3 = { ...dataEDT_KSV_PO_MRP3 };

        let tTypeVal = _dataEDT_KSV_PO_MRP3[`${name}`];
        if (typeof tTypeVal === "string") _dataEDT_KSV_PO_MRP3[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_PO_MRP3[`${name}`] = parseInt(val);

        setDataEDT_KSV_PO_MRP3(_dataEDT_KSV_PO_MRP3);
    };

    const onInputChangeEDT_KSV_PO_MRP3_AMOUNT = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_PO_MRP3 = { ...dataEDT_KSV_PO_MRP3 };

        let tTypeVal = _dataEDT_KSV_PO_MRP3[`${name}`];
        if (typeof tTypeVal === "string") _dataEDT_KSV_PO_MRP3[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_PO_MRP3[`${name}`] = parseInt(val);

        setDataEDT_KSV_PO_MRP3(_dataEDT_KSV_PO_MRP3);
    };

    const onCalChangeEDT_KSV_PO_MRP3_PAY_DATE = (e, name) => {
        let val1 = e.value || "";
        let val = "";
        if (val1 === "") {
            val = "";
        } else {
            val = getDateVal(val1);
        }

        let _dataEDT_KSV_PO_MRP3 = { ...dataEDT_KSV_PO_MRP3 };
        _dataEDT_KSV_PO_MRP3[`${name}`] = val;
        setDataEDT_KSV_PO_MRP3(_dataEDT_KSV_PO_MRP3);
    };

    const [datasEDT_KSV_PO_MRP3_PAY_BANK, setDatasEDT_KSV_PO_MRP3_PAY_BANK] =
        useState([]);
    const [dataEDT_KSV_PO_MRP3_PAY_BANK, setDataEDT_KSV_PO_MRP3_PAY_BANK] =
        useState({});

    const onDropdownChangeEDT_KSV_PO_MRP3_PAY_BANK = (e, name) => {
        let val = (e.value && e.value.PAY_BANK) || "";

        let _dataEDT_KSV_PO_MRP3 = { ...dataEDT_KSV_PO_MRP3 };

        let tTypeVal = _dataEDT_KSV_PO_MRP3[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_KSV_PO_MRP3[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_KSV_PO_MRP3[`${name}`] = parseInt(val);
        }

        setDataEDT_KSV_PO_MRP3(_dataEDT_KSV_PO_MRP3);
        setDataEDT_KSV_PO_MRP3_PAY_BANK(e.value);
    };

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

    const onRowClick1TBL_KSV_PO_MRP3 = (argData0) => {
        var argData = {};

        if (typeof argData0.length !== "undefined") {
            argData = argData0[0];
        } else {
            argData = argData0;
        }

        let argTBL_KSV_PO_MRP3 = argData;

        setDataTBL_KSV_PO_MRP3(argTBL_KSV_PO_MRP3);
    };

    const onRowClickTBL_KSV_PO_MRP3 = (event) => {
        let argTBL_KSV_PO_MRP3 = event.data;
        if (flagSelectModeTBL_KSV_PO_MRP3) return;

        // Service : NawooAll:mgrQueryTBL_KSV_PO_MRP3
    };

    /* QRY KSV_PO_MRP*/
    const [dataEDT_KSV_PO_MRP4, setDataEDT_KSV_PO_MRP4] =
        useState(emptyEDT_KSV_PO_MRP4);

    const onInputChangeEDT_KSV_PO_MRP4_MATL_PRICE = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_PO_MRP4 = { ...dataEDT_KSV_PO_MRP4 };

        let tTypeVal = _dataEDT_KSV_PO_MRP4[`${name}`];
        if (typeof tTypeVal === "string") _dataEDT_KSV_PO_MRP4[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_PO_MRP4[`${name}`] = parseInt(val);

        setDataEDT_KSV_PO_MRP4(_dataEDT_KSV_PO_MRP4);
    };

    const onInputChangeEDT_KSV_PO_MRP4_CURR_CD = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_PO_MRP4 = { ...dataEDT_KSV_PO_MRP4 };

        let tTypeVal = _dataEDT_KSV_PO_MRP4[`${name}`];
        if (typeof tTypeVal === "string") _dataEDT_KSV_PO_MRP4[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_PO_MRP4[`${name}`] = parseInt(val);

        setDataEDT_KSV_PO_MRP4(_dataEDT_KSV_PO_MRP4);
    };

    /* TABLE KSV_PO_MRP*/
    // DEFINE DATAGRID : TBL_KSV_PO_MRP4
    let emptyTBL_KSV_PO_MRP4 = {};

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

        var tUserInfo = serviceLib.getUserInfo();

        var tObj1 = {};
        tObj1.BUYER_CD = "";
        serviceS040101_PURCHASER_REG.mgrQuery_CODE2(tObj1).then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                setDatasEDT_KSV_PO_MRP_FORWARDER(data.PLACE_CD);
                setDataEDT_KSV_PO_MRP_FORWARDER(data.PLACE_CD[0]);

                setDatasEDT_KSV_PO_MRP_NORMI(data.NORMI);
                setDataEDT_KSV_PO_MRP_NORMI(data.NORMI[0]);

                setDatasEDT_KSV_PO_MRP_TRADE_TERM(data.TRADE_TERM);
                setDataEDT_KSV_PO_MRP_TRADE_TERM(data.TRADE_TERM[0]);

                setDatasEDT_KSV_PO_MRP_CURR_CD(data.CURR_CD);
                setDataEDT_KSV_PO_MRP_CURR_CD(data.CURR_CD[0]);

                setDatasEDT_KSV_PO_MRP_CURR_CD2(data.CURR_CD);
                setDataEDT_KSV_PO_MRP_CURR_CD2(data.CURR_CD[0]);

                setDatasEDT_KSV_PO_MRP_PAY_CONDITION(data.PAY_CONDITION);
                setDataEDT_KSV_PO_MRP_PAY_CONDITION(data.PAY_CONDITION[15]);
                setDataEDT_KSV_PO_MRP({
                    ...dataEDT_KSV_PO_MRP,
                    PAY_CONDITION: data.PAY_CONDITION[15].CD_CODE,
                });

                setDatasEDT_KSV_PO_MRP_BILL_TO(data.BILL_TYPE);
                setDataEDT_KSV_PO_MRP_BILL_TO(data.BILL_TYPE[0]);

                setDatasEDT_KSV_PO_MRP_ORIGIN_PORT(data.ORIGIN_PORT);
                setDataEDT_KSV_PO_MRP_ORIGIN_PORT(data.ORIGIN_PORT[0]);

                setDatasQRY_KSV_PO_MRP_PU_STATUS(data.PU_STATUS);
                setDataQRY_KSV_PO_MRP_PU_STATUS(data.PU_STATUS[0]);

                setDatasQRY_KSV_PO_MRP_VENDOR_TYPE(data.VENDOR_TYPE);
                var tObj = {};
                var tVendorType = "";
                if (tUserInfo.PART === "S11") {
                    data.VENDOR_TYPE.forEach((col, i) => {
                        if (col.CD_CODE === "1") tObj = { ...col };
                    });
                }
                if (tUserInfo.PART === "VPUR") {
                    data.VENDOR_TYPE.forEach((col, i) => {
                        if (col.CD_CODE === "3") tObj = { ...col };
                    });
                }
                if (tUserInfo.PART === "VFP") {
                    data.VENDOR_TYPE.forEach((col, i) => {
                        if (col.CD_CODE === "5") tObj = { ...col };
                    });
                }
                if (typeof tObj.CD_CODE !== "undefined") {
                    setDataQRY_KSV_PO_MRP_VENDOR_TYPE(tObj);
                    tVendorType = tObj.CD_CODE;
                } else setDataQRY_KSV_PO_MRP_VENDOR_TYPE(data.VENDOR_TYPE[0]);

                setDatasQRY_KSV_PO_MRP_BUYER_CD(data.BUYER_CD);
                setDataQRY_KSV_PO_MRP_BUYER_CD(data.BUYER_CD[0]);

                setDatasQRY_KSV_PO_MRP_VENDOR_CD(data.VENDOR_CD);
                setDataQRY_KSV_PO_MRP_VENDOR_CD(data.VENDOR_CD[0]);

                setDatasQRY_KSV_PO_MRP_USER_ID(data.USER);
                var selObj = {};
                data.USER.forEach((col, i) => {
                    if (col.USER_ID === tUserInfo.USER_ID) selObj = { ...col };
                });
                if (typeof selObj.USER_ID !== "undefined")
                    setDataQRY_KSV_PO_MRP_USER_ID(selObj);
                else setDataQRY_KSV_PO_MRP_USER_ID(data.USER[0]);

                var tRetDate = serviceLib.getCurrDate().substring(0, 8);
                var tSDate = `${tRetDate.substring(0, 6)}01`;
                var tEDate = moment().endOf("month").format("YYYYMMDD");

                var tObj = { ...dataQRY_KSV_PO_MRP };
                tObj.S_MRP_DATE = moment(tSDate, "YYYYMMDD")
                    .subtract(2, "months")
                    .startOf("month")
                    .format("YYYYMMDD");
                // tObj.E_MRP_DATE = tEDate;
                tObj.E_MRP_DATE = "";
                tObj.S_MATL_ETA = moment(tSDate, "YYYYMMDD")
                    .subtract(2, "months")
                    .startOf("month")
                    .format("YYYYMMDD");
                // tObj.E_MATL_ETA = tEDate;
                tObj.E_MATL_ETA = "";
                tObj.USER_ID = tUserInfo.USER_ID;
                tObj.VENDOR_TYPE = tVendorType;
                setDataQRY_KSV_PO_MRP(tObj);
            } else {
                console.log(
                    "mgrQuery_PO_CD error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });

        /*
     process_APPLY(tObj);
    */

        var tVendorType1 = "";
        if (tUserInfo.PART === "S11") tVendorType1 = "1";
        else if (tUserInfo.PART === "VPUR") tVendorType1 = "3";
        else if (tUserInfo.PART === "VFP") tVendorType1 = "5";
        var tRetDate = serviceLib.getCurrDate().substring(0, 8);
        var tSDate = `${tRetDate.substring(0, 6)}01`;
        var tEDate = moment().endOf("month").format("YYYYMMDD");
        var tObj = { ...dataQRY_KSV_PO_MRP };
        tObj.S_MRP_DATE = moment(tSDate, "YYYYMMDD")
            .subtract(2, "months")
            .startOf("month")
            .format("YYYYMMDD");
        tObj.E_MRP_DATE = "";
        // tObj.E_MRP_DATE = tEDate;
        tObj.S_MATL_ETA = moment(tSDate, "YYYYMMDD")
            .subtract(2, "months")
            .startOf("month")
            .format("YYYYMMDD");
        tObj.E_MATL_ETA = "";
        // tObj.E_MATL_ETA = tEDate;
        tObj.USER_ID = tUserInfo.USER_ID;
        tObj.VENDOR_TYPE = tVendorType1;

        // search_LIST_1(tObj);
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
            <div style={{ height: "34rem" }}>
                <div
                    className="af-div-first"
                    style={{ width: "123rem", height: "6rem" }}
                >
                    <span className="af-span-3-0" style={{ width: "21rem" }}>
                        <p className="af-span-p" style={{ width: "5rem" }}>PIC</p>
                        <div className="af-span-div" style={{ width: "15rem" }}>
                            <Dropdown
                                style={{ width: "15rem" }}
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
                    <span className="af-span-3-0" style={{ width: "30.5rem" }}>
                        <p className="af-span-p" style={{ width: "5rem" }}>Buyer</p>
                        <div className="af-span-div" style={{ width: "21rem" }}>
                            <Dropdown
                                style={{ width: "20rem" }}
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
                        <p className="af-span-p" style={{ width: "5rem" }}>MRP Date</p>
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
                    <span className="af-span-3-1" style={{ width: "9rem" }}>
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
                    <span className="af-span-3-2" style={{ width: "9rem" }}>
                        <div
                            className="af-span-div-btn"
                            style={{ width: "8.5rem" }}
                        >
                            <Button
                                label="Reset"
                                style={{ width: "8.5rem" }}
                                className="p-button-text"
                                onClick={process_RESET_QRY}
                            />
                        </div>
                    </span>
                    <span className="af-span-3-1" style={{ width: "20rem" }}>
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
                    <span className="af-span-3" style={{ width: "21rem" }}>
                        <p className="af-span-p" style={{ width: "5rem" }}>PO#</p>
                        <div className="af-span-div" style={{ width: "15rem" }}>
                            <InputText
                                style={{ width: "15rem" }}
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
                    <span className="af-span-3" style={{ width: "30.5rem" }}>
                        <p className="af-span-p" style={{ width: "5rem" }}>Supplier</p>
                        <div
                            className="af-span-div"
                            style={{ width: "24.5rem" }}
                        >
                            {/*<InputText style={{ width: '24.5rem' }} id="id_TARGET_ETA" value={dataQRY_KSV_PO_MRP.VENDOR_CD} onChange={(e) => onInputChangeQRY_KSV_PO_MRP_VENDOR_CD(e, 'VENDOR_CD')} />*/}
                            <Dropdown
                                style={{ width: "20rem" }}
                                id="id_PO_CD"
                                filter
                                value={dataQRY_KSV_PO_MRP_VENDOR_CD}
                                onChange={(e) =>
                                    onDropdownChangeQRY_KSV_PO_MRP_VENDOR_CD(
                                        e,
                                        "VENDOR_CD",
                                    )
                                }
                                options={datasQRY_KSV_PO_MRP_VENDOR_CD}
                                optionLabel="VENDOR_NAME"
                                placeholder=""
                            ></Dropdown>
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
                                value={changeDateVal(
                                    dataQRY_KSV_PO_MRP.S_MATL_ETA,
                                )}
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
                                value={changeDateVal(
                                    dataQRY_KSV_PO_MRP.E_MATL_ETA,
                                )}
                                onChange={(e) =>
                                    onCalChangeQRY_KSV_PO_MRP_E_MATL_ETA(
                                        e,
                                        "E_MATL_ETA",
                                    )
                                }
                            />
                        </div>
                    </span>
                    <span className="af-span-3" style={{ width: "30rem" }}>
                        <p className="af-span-p" style={{ width: "5rem" }}>Type</p>
                        <div className="af-span-div" style={{ width: "9rem" }}>
                            <Dropdown
                                disabled={isVMorEm}
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
                        <div
                            className="af-span-div-btn"
                            style={{ width: "8.5rem", marginLeft: "47px" }}
                        >
                            <Button
                                label="Not Purchased"
                                style={{ width: "8.5rem" }}
                                class="p-button-text red emergency_blink"
                                onClick={process_APPLY_NOT_PURCHASE}
                            />
                        </div>
                    </span>
                </div>

                <div
                    className="af-div-first"
                    style={{ width: "calc(100% - 70rem)", height: "25rem" }}
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
                                "selected length:" +
                                    selectedTBL_KSV_PO_MRP1.length,
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
                        scrollHeight="273px"
                    >
                        <AFColumn selectionMode="multiple" field="__checkbox__" reorderable={false} headerClassName="t-header" headerStyle={{ width: "3rem" }} ></AFColumn>

                        <AFColumn field="PU_STATUS" headerClassName="t-header" header="Status" style={{ width: "5rem", flexBasis: "auto" }} ></AFColumn>
                        <AFColumn field="BUYER_NAME" headerClassName="t-header" header="Buyer" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                        <AFColumn field="CURR_CD" headerClassName="t-header" header="Curr" style={{ width: "8rem", flexBasis: "auto" }} ></AFColumn>
                        <AFColumn field="PO_CD" headerClassName="t-header" header="PO#" style={{ width: "8rem", flexBasis: "auto" }} ></AFColumn>
                        <AFColumn field="PO_SEQ" headerClassName="t-header" header="Seq" style={{ width: "2rem", flexBasis: "auto" }} ></AFColumn>
                        <AFColumn field="VENDOR_NAME" headerClassName="t-header" header="Supplier" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                        <AFColumn field="VENDOR_MATL_TYPE" headerClassName="t-header" header="Matl" style={{ width: "4rem", flexBasis: "auto" }} ></AFColumn>
                        <AFColumn field="MRP_DATE" headerClassName="t-header" header="MRP Date" style={{ width: "6rem", flexBasis: "auto" }} body={(rowData) => serviceLib.dateFormat(rowData.MRP_DATE) } ></AFColumn>
                        <AFColumn field="MATL_DUE_DATE" headerClassName="t-header" header="Target ETA" style={{ width: "6rem", flexBasis: "auto" }} body={(rowData) => serviceLib.dateFormat(rowData.MATL_DUE_DATE) } ></AFColumn>
                        <AFColumn field="PO_QTY" headerClassName="t-header" header="Bal" style={{ width: "6rem", flexBasis: "auto" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.PO_QTY, 2) } ></AFColumn>
                        <AFColumn field="FACTORY_NAME" headerClassName="t-header" header="Factory" style={{ width: "6rem", flexBasis: "auto" }} ></AFColumn>
                    </AFDataTable>
                </div>

                <div
                    className="af-div-second"
                    style={{
                        width: "63rem",
                        height: "25rem",
                        marginLeft: "10px",
                    }}
                >
                    <span className="af-span-3-0" style={{ width: "15rem" }}>
                        <p className="af-span-p" style={{ width: "6rem" }}>PU#</p>
                        <div className="af-span-div" style={{ width: "8rem" }}>
                            <InputText
                                disabled
                                style={{ width: "9rem" }}
                                id="id_TARGET_ETA"
                                value={dataEDT_KSV_PO_MRP.PU_CD}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_PO_MRP_PU_CD(
                                        e,
                                        "PU_CD",
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
                                    onInputChangeEDT_KSV_PO_MRP_VENDOR_CD(
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
                                    onInputChangeEDT_KSV_PO_MRP_VENDOR_TYPE(
                                        e,
                                        "VENDOR_TYPE",
                                    )
                                }
                            />
                        </div>
                    </span>

                    <span className="af-span-3-0" style={{ width: "15rem" }}>
                        <p className="af-span-p" style={{ width: "6rem" }}>Purchaser</p>
                        <div className="af-span-div" style={{ width: "8rem" }}>
                            <InputText
                                disabled
                                style={{ width: "9rem" }}
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
                                    onInputChangeEDT_KSV_PO_MRP_BUYER_CD(
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
                                    onInputChangeEDT_KSV_PO_MRP_PAY_TERM(
                                        e,
                                        "PAY_TERM",
                                    )
                                }
                            />
                        </div>
                    </span>

                    <span className="af-span-3-0" style={{ width: "15rem" }}>
                        <p className="af-span-p red" style={{ width: "6rem" }}>*Due Date</p>
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
                                    onCalChangeEDT_KSV_PO_MRP_DUE_DATE(
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
                                    onCalChangeEDT_KSV_PO_MRP_MRP_DATE(
                                        e,
                                        "MRP_DATE",
                                    )
                                }
                            />
                        </div>
                    </span>
                    <span className="af-span-3-0" style={{ width: "31rem" }}>
                        <p className="af-span-p" style={{ width: "5rem" }}>Normi</p>
                        <div className="af-span-div" style={{ width: "9rem" }}>
                            <Dropdown
                                style={{ width: "9rem" }}
                                id="id_PO_CD"
                                filter
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
                    <span className="af-span-3" style={{ width: "15rem" }}>
                        <p className="af-span-p" style={{ width: "6rem" }}>Bill to</p>
                        <div className="af-span-div" style={{ width: "8rem" }}>
                            <Dropdown
                                style={{ width: "8rem" }}
                                id="id_PO_CD"
                                filter
                                value={dataEDT_KSV_PO_MRP_BILL_TO}
                                onChange={(e) =>
                                    onDropdownChangeEDT_KSV_PO_MRP_BILL_TO(
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

                    <span className="af-span-3-0" style={{ width: "36rem" }}>
                        <p className="af-span-p" style={{ width: "6rem" }}>Pay Rule</p>
                        <div className="af-span-div" style={{ width: "9rem" }}>
                            <Dropdown
                                style={{ width: "23.5rem" }}
                                id="id_PO_CD"
                                filter
                                value={dataEDT_KSV_PO_MRP_PAY_CONDITION}
                                onChange={(e) =>
                                    onDropdownChangeEDT_KSV_PO_MRP_PAY_CONDITION(
                                        e,
                                        "PAY_CONDITION",
                                    )
                                }
                                options={datasEDT_KSV_PO_MRP_PAY_CONDITION}
                                optionLabel="CD_NAME"
                                placeholder=""
                                editable
                            ></Dropdown>
                        </div>
                    </span>

                    <span className="af-span-3" style={{ width: "15rem" }}>
                        <p className="af-span-p" style={{ width: "6rem" }}>Ready Date</p>
                        <div className="af-span-div" style={{ width: "8rem" }}>
                            <Calendar
                                showButtonBar
                                disabled
                                style={{ width: "9rem" }}
                                dateFormat="yy-mm-dd"
                                id="id_S_PO_DATE"
                                value={changeDateVal(
                                    dataEDT_KSV_PO_MRP.EX_FACTORY,
                                )}
                                onChange={(e) =>
                                    onCalChangeEDT_KSV_PO_MRP_EX_FACTORY(
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
                                showButtonBar
                                disabled
                                style={{ width: "9rem" }}
                                dateFormat="yy-mm-dd"
                                id="id_S_PO_DATE"
                                value={changeDateVal(
                                    dataEDT_KSV_PO_MRP.TARGET_ETA,
                                )}
                                onChange={(e) =>
                                    onCalChangeEDT_KSV_PO_MRP_TARGET_ETA(
                                        e,
                                        "TARGET_ETA",
                                    )
                                }
                            />
                        </div>
                    </span>
                    <span className="af-span-3" style={{ width: "15rem" }}>
                        <p className="af-span-p" style={{ width: "5rem" }}>Curr</p>
                        <div className="af-span-div" style={{ width: "9rem" }}>
                            <Dropdown
                                disabled
                                style={{ width: "9rem" }}
                                id="id_PO_CD"
                                filter
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
                    <span className="af-span-3-0" style={{ width: "16rem" }}>
                        <p className="af-span-p" style={{ width: "6rem" }}>Over/Short</p>
                        <div className="af-span-div" style={{ width: "9rem" }}>
                            <InputText
                                disabled
                                style={{ width: "9rem" }}
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

                    <span className="af-span-3" style={{ width: "15rem" }}>
                        <p className="af-span-p" style={{ width: "6rem" }}>Pay Date</p>
                        <div className="af-span-div" style={{ width: "8rem" }}>
                            <Calendar
                                showButtonBar
                                disabled={isBillTo}
                                style={{ width: "8rem" }}
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

                    <span className="af-span-3" style={{ width: "15rem" }}>
                        <p className="af-span-p" style={{ width: "6rem" }}>Order Date</p>
                        <div className="af-span-div" style={{ width: "8rem" }}>
                            <Calendar
                                showButtonBar
                                disabled
                                style={{ width: "9rem" }}
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
                    <span className="af-span-3" style={{ width: "30rem" }}>
                        <p className="af-span-p" style={{ width: "5rem" }}>Amount</p>
                        <div className="af-span-div" style={{ width: "9rem" }}>
                            <InputText
                                disabled
                                style={{ width: "9rem" }}
                                id="id_TARGET_ETA"
                                value={dataEDT_KSV_PO_MRP.PAY_AMT}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_PO_MRP_PAY_AMT(
                                        e,
                                        "PAY_AMT",
                                    )
                                }
                            />
                        </div>
                    </span>

                    <span className="af-span-3" style={{ width: "60rem" }}>
                        <p className="af-span-p" style={{ width: "6rem" }}>PO#</p>
                        <div className="af-span-div" style={{ width: "53rem" }}>
                            <InputText
                                disabled
                                style={{ width: "53rem" }}
                                id="id_TARGET_ETA"
                                value={dataEDT_KSV_PO_MRP.PO_CD1}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_PO_MRP_PO_CD1(
                                        e,
                                        "PO_CD1",
                                    )
                                }
                            />
                        </div>
                    </span>

                    <span className="af-span-3" style={{ width: "60rem" }}>
                        <p className="af-span-p" style={{ width: "6rem" }}>PO2#</p>
                        <div className="af-span-div" style={{ width: "53rem" }}>
                            <InputText
                                disabled
                                style={{ width: "53rem" }}
                                id="id_TARGET_ETA"
                                value={dataEDT_KSV_PO_MRP.PO_CD2}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_PO_MRP_PO_CD2(
                                        e,
                                        "PO_CD2",
                                    )
                                }
                            />
                        </div>
                    </span>

                    <span className="af-span-3" style={{ width: "45rem" }}>
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
                    <span className="af-span-3-2" style={{ width: "8.5rem" }}>
                        <p className="af-span-p" style={{ width: "1rem" }}> </p>
                        <div
                            className="af-span-div-btn"
                            style={{ width: "7rem" }}
                        >
                            <Button
                                label="Reset"
                                style={{ width: "7rem" }}
                                className="p-button-text"
                                onClick={process_RESET_EDIT}
                            />
                        </div>
                    </span>
                    <span className="af-span-3-2" style={{ width: "7.5rem" }}>
                        <div
                            className="af-span-div-btn"
                            style={{ width: "7rem" }}
                        >
                            <Button
                                label="Save"
                                style={{ width: "7rem" }}
                                className="p-button-text"
                                onClick={process_INSERT_PU_MST_1}
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
                                    onInputChangeEDT_KSV_PO_MRP_SHIP_TO(
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
                    <span className="af-span-3" style={{ width: "15rem" }}>
                        <p className="af-span-p" style={{ width: "5rem" }}>Incoterms</p>
                        <div className="af-span-div" style={{ width: "9rem" }}>
                            <Dropdown
                                style={{ width: "9rem" }}
                                disabled={isBillTo}
                                id="id_PO_CD"
                                filter
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
                    <span className="af-span-3-2" style={{ width: "15rem" }}>
                        <p className="af-span-p" style={{ width: "0.5rem" }}> </p>
                        <div
                            className="af-span-div-btn"
                            style={{ width: "14rem" }}
                        >
                            <Button
                                label="Material Record"
                                style={{ width: "14.7rem" }}
                                className="p-button-text orange"
                                onClick={popup_MATL_MST}
                            />
                        </div>
                    </span>

                    <span className="af-span-3-0" style={{ width: "30.5rem" }}>
                        <p className="af-span-p" style={{ width: "6rem" }}></p>
                        <div
                            className="af-span-div"
                            style={{ width: "23.5rem" }}
                        ></div>
                    </span>
                    <span className="af-span-3" style={{ width: "10rem" }}>
                        <p className="af-span-p" style={{ width: "3rem" }}>Curr</p>
                        <div className="af-span-div" style={{ width: "6rem" }}>
                            <Dropdown
                                style={{ width: "6rem" }}
                                id="id_PO_CD"
                                filter
                                value={dataEDT_KSV_PO_MRP_CURR_CD2}
                                onChange={(e) =>
                                    onDropdownChangeEDT_KSV_PO_MRP_CURR_CD2(
                                        e,
                                        "CURR_CD2",
                                    )
                                }
                                options={datasEDT_KSV_PO_MRP_CURR_CD2}
                                optionLabel="CD_NAME"
                                placeholder=""
                                editable
                            ></Dropdown>
                        </div>
                    </span>
                    <span className="af-span-3" style={{ width: "10rem" }}>
                        <InputText
                            style={{ width: "9rem" }}
                            value={dataEDT_PRICE_UPDATE}
                            onChange={(e) =>
                                setDataEDT_PRICE_UPDATE(e.target.value)
                            }
                        />
                    </span>
                    <span className="af-span-3-2" style={{ width: "10rem" }}>
                        <div
                            className="af-span-div-btn"
                            style={{ width: "9rem" }}
                        >
                            <Button
                                label="Price Update"
                                style={{ width: "9rem" }}
                                className="p-button-text"
                                onClick={priceUpdate}
                            />
                        </div>
                    </span>
                </div>
            </div>

            <div
                className="af-div-first"
                style={{ width: "123rem", height: "30rem" }}
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
                    // showGridlines selectionMode="checkbox"
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
                    scrollHeight="320px"
                >
                    <AFColumn selectionMode="multiple" field="__checkbox__" reorderable={false} headerClassName="t-header" headerStyle={{ width: "3rem" }} ></AFColumn>

                    <AFColumn className="af-col" style={{ width: "4rem" }} field="PU_STATUS" headerClassName="t-header" header="Status" ></AFColumn>
                    <AFColumn className="af-col" style={{ width: "6rem" }} field="PO_CD" headerClassName="t-header" header="PO#" ></AFColumn>
                    <AFColumn className="af-col" style={{ width: "2rem" }} field="PO_SEQ" headerClassName="t-header" header="Seq" ></AFColumn>
                    <AFColumn className="af-col" style={{ width: "6rem" }} field="MATL_CD" headerClassName="t-header" header="Matl#" ></AFColumn>
                    <AFColumn className="af-col" style={{ width: "10rem" }} field="MATL_NAME" headerClassName="t-header" header="Description" ></AFColumn>
                    <AFColumn className="af-col" style={{ width: "10rem" }} field="COLOR" headerClassName="t-header" header="Color" ></AFColumn>
                    <AFColumn className="af-col" style={{ width: "10rem" }} field="SPEC" headerClassName="t-header" header="Spec" ></AFColumn>
                    <AFColumn className="af-col" style={{ width: "4rem" }} field="UNIT" headerClassName="t-header" header="Unit" ></AFColumn>
                    <AFColumn className="af-col" style={{ width: "6rem" }} field="MRP_QTY" headerClassName="t-header" header="MRP Qty" bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.MRP_QTY, 2) } ></AFColumn>
                    <AFColumn className="af-col" style={{ width: "6rem" }} field="STOCK_QTY" headerClassName="t-header" header="Stock" bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.STOCK_QTY, 2) } bodyClassName={(rowData) => rowData.STOCK_QTY > 0 ? "tableRed" : "" } ></AFColumn>
                    <AFColumn className="af-col" style={{ width: "6rem" }} field="MOQ_QTY" headerClassName="t-header" header="MOQ" bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.MOQ_QTY, 2) } ></AFColumn>
                    <AFColumn className="af-col" style={{ width: "6rem" }} headerStyle={{ color: "green" }} field="PO_QTY" headerClassName="t-header" header="PO Qty" bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.PO_QTY, 2) } editor={(options) => cellEditorKSV_PO_MRP2(options)} onCellEditComplete={onCellEditCompleteKSV_PO_MRP2} ></AFColumn>

                    <AFColumn className="af-col" style={{ width: "3rem" }} field="CURR_CD" headerClassName="t-header" header="Curr" ></AFColumn>
                    <AFColumn className="af-col" style={{ width: "6rem" }} field="MASTER_PRICE" headerClassName="t-header" header="Master P" bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.MASTER_PRICE, 4) } ></AFColumn>
                    <AFColumn className="af-col" style={{ width: "6rem" }} field="SURCHARGE_PRICE" headerClassName="t-header" header="Sur P" bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.SURCHARGE_PRICE, 4) } ></AFColumn>
                    <AFColumn className="af-col" style={{ width: "6rem" }} field="PO_PRICE" headerClassName="t-header" header="PO P" ></AFColumn>
                    <AFColumn className="af-col" style={{ width: "6rem" }} headerStyle={{ color: "green" }} field="SURCHARGE_AMT" headerClassName="t-header" header="Surcharge" bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.SURCHARGE_AMT, 2) } editor={(options) => cellEditorKSV_PO_MRP2(options)} onCellEditComplete={onCellEditCompleteKSV_PO_MRP2} ></AFColumn>
                    <AFColumn className="af-col" style={{ width: "10rem" }} headerStyle={{ color: "green" }} field="SURCHARGE_REMARK" headerClassName="t-header" header="Reason" editor={(options) => cellEditorKSV_PO_MRP2(options)} onCellEditComplete={onCellEditCompleteKSV_PO_MRP2} ></AFColumn>
                </AFDataTable>
            </div>

            {/* Deposit Request */}
            <Dialog
                visible={createDialog2}
                position="top-right"
                style={{ width: "98vw" }}
                header="Deposit Request"
                modal={true}
                className="p-fluid"
                onHide={hideDialog2}
            >
                <div
                    className="af-div-first"
                    style={{ width: "60rem", height: "36rem" }}
                >
                    <span className="af-span-3-0" style={{ width: "50rem" }}>
                        <p className="af-span-p" style={{ width: "12rem" }}>Purchaser</p>
                        <div className="af-span-div" style={{ width: "17rem" }}>
                            <InputText
                                style={{ width: "17rem" }}
                                id="id_TARGET_ETA"
                                value={dataEDT_KSV_PO_MRP2.REG_USER}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_PO_MRP2_REG_USER(
                                        e,
                                        "REG_USER",
                                    )
                                }
                            />
                        </div>
                    </span>
                    <span className="af-span-3" style={{ width: "50rem" }}>
                        <p className="af-span-p" style={{ width: "12rem" }}>Supplier</p>
                        <div className="af-span-div" style={{ width: "17rem" }}>
                            <InputText
                                style={{ width: "17rem" }}
                                id="id_TARGET_ETA"
                                value={dataEDT_KSV_PO_MRP2.VENDOR_NAME}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_PO_MRP2_VENDOR_NAME(
                                        e,
                                        "VENDOR_NAME",
                                    )
                                }
                            />
                        </div>
                    </span>
                    <span className="af-span-3" style={{ width: "50rem" }}>
                        <p className="af-span-p" style={{ width: "12rem" }}>Pay Condition</p>
                        <div className="af-span-div" style={{ width: "17rem" }}>
                            <InputText
                                style={{ width: "17rem" }}
                                id="id_TARGET_ETA"
                                value={dataEDT_KSV_PO_MRP2.PAY_CONDITION}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_PO_MRP2_PAY_CONDITION(
                                        e,
                                        "PAY_CONDITION",
                                    )
                                }
                            />
                        </div>
                    </span>
                    <span className="af-span-3" style={{ width: "50rem" }}>
                        <p className="af-span-p" style={{ width: "12rem" }}>Currency</p>
                        <div className="af-span-div" style={{ width: "17rem" }}>
                            <InputText
                                style={{ width: "17rem" }}
                                id="id_TARGET_ETA"
                                value={dataEDT_KSV_PO_MRP2.CURRENCY}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_PO_MRP2_CURRENCY(
                                        e,
                                        "CURRENCY",
                                    )
                                }
                            />
                        </div>
                    </span>
                    <span className="af-span-3" style={{ width: "50rem" }}>
                        <p className="af-span-p" style={{ width: "12rem" }}>Amount</p>
                        <div className="af-span-div" style={{ width: "17rem" }}>
                            <InputText
                                style={{ width: "17rem" }}
                                id="id_TARGET_ETA"
                                value={dataEDT_KSV_PO_MRP2.AMOUNT}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_PO_MRP2_AMOUNT(
                                        e,
                                        "AMOUNT",
                                    )
                                }
                            />
                        </div>
                    </span>
                    <span className="af-span-3" style={{ width: "50rem" }}>
                        <p className="af-span-p" style={{ width: "12rem" }}>Deposit Amount</p>
                        <div className="af-span-div" style={{ width: "17rem" }}>
                            <InputText
                                style={{ width: "17rem" }}
                                id="id_TARGET_ETA"
                                value={dataEDT_KSV_PO_MRP2.DEPOSIT_AMOUNT}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_PO_MRP2_DEPOSIT_AMOUNT(
                                        e,
                                        "DEPOSIT_AMOUNT",
                                    )
                                }
                            />
                        </div>
                    </span>
                    <span className="af-span-3" style={{ width: "50rem" }}>
                        <p className="af-span-p" style={{ width: "12rem" }}>Deposit Rate</p>
                        <div className="af-span-div" style={{ width: "17rem" }}>
                            <InputText
                                style={{ width: "17rem" }}
                                id="id_TARGET_ETA"
                                value={dataEDT_KSV_PO_MRP2.DEPOSIT_RATE}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_PO_MRP2_DEPOSIT_RATE(
                                        e,
                                        "DEPOSIT_RATE",
                                    )
                                }
                            />
                        </div>
                    </span>
                    <span className="af-span-3" style={{ width: "50rem" }}>
                        <p className="af-span-p" style={{ width: "12rem" }}>Pay Bank</p>
                        <div className="af-span-div" style={{ width: "17rem" }}>
                            <Dropdown
                                style={{ width: "17rem" }}
                                id="id_NORMI"
                                value={dataEDT_KSV_PO_MRP2_PAY_BANK}
                                onChange={(e) =>
                                    onDropdownChangeEDT_KSV_PO_MRP2_PAY_BANK(
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
                    <span className="af-span-3" style={{ width: "50rem" }}>
                        <p className="af-span-p" style={{ width: "12rem" }}>Pay Date</p>
                        <div className="af-span-div" style={{ width: "17rem" }}>
                            <Calendar
                                showButtonBar
                                style={{ width: "17rem" }}
                                dateFormat="yy-mm-dd"
                                id="id_S_PO_DATE"
                                value={changeDateVal(
                                    dataEDT_KSV_PO_MRP2.PAY_DATE,
                                )}
                                onChange={(e) =>
                                    onCalChangeEDT_KSV_PO_MRP2_PAY_DATE(
                                        e,
                                        "PAY_DATE",
                                    )
                                }
                            />
                        </div>
                    </span>
                    <span className="af-span-3" style={{ width: "25rem" }}>
                        <div
                            className="af-span-div-btn"
                            style={{ width: "12rem" }}
                        >
                            <Button
                                style={{ width: "10rem" }}
                                label="Save"
                                className="p-button-text"
                                onClick={process_UPDATE_DEPOSIT}
                            />
                        </div>
                    </span>
                    <span className="af-span-3" style={{ width: "25rem" }}>
                        <div
                            className="af-span-div-btn"
                            style={{ width: "12rem" }}
                        >
                            <Button
                                style={{ width: "10rem" }}
                                label="Exit"
                                className="p-button-text"
                                onClick={blankFn}
                            />
                        </div>
                    </span>
                </div>
            </Dialog>

            <Dialog
                visible={createDialog3}
                position="top-right"
                style={{ width: "98vw" }}
                header="LC Request"
                modal={true}
                className="p-fluid"
                onHide={hideDialog3}
            >
                <div
                    style={{
                        marginLeft: "1rem",
                        marginTop: "1rem",
                        width: "95rem",
                        height: "22rem",
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
                        <p style={{ width: "8rem", display: "inline-block" }}>Purchaser</p>
                        <InputText
                            style={{
                                marginLeft: "0.5rem",
                                display: "inline-block",
                                width: "17rem",
                            }}
                            id="id_TARGET_ETA"
                            value={dataEDT_KSV_PO_MRP3.REG_USER}
                            onChange={(e) =>
                                onInputChangeEDT_KSV_PO_MRP3_REG_USER(
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
                            width: "90rem",
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
                            value={dataEDT_KSV_PO_MRP3.BUYER_NAME}
                            onChange={(e) =>
                                onInputChangeEDT_KSV_PO_MRP3_BUYER_NAME(
                                    e,
                                    "BUYER_NAME",
                                )
                            }
                        />
                    </span>
                    <span
                        style={{
                            marginLeft: "0.5rem",
                            height: "2rem",
                            display: "inline-block",
                            width: "90rem",
                        }}
                    >
                        <p style={{ width: "8rem", display: "inline-block" }}>Supplier</p>
                        <InputText
                            style={{
                                marginLeft: "0.5rem",
                                display: "inline-block",
                                width: "17rem",
                            }}
                            id="id_TARGET_ETA"
                            value={dataEDT_KSV_PO_MRP3.VENDOR_NAME}
                            onChange={(e) =>
                                onInputChangeEDT_KSV_PO_MRP3_VENDOR_NAME(
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
                            width: "90rem",
                        }}
                    >
                        <p style={{ width: "8rem", display: "inline-block" }}>Trade.Term</p>
                        <InputText
                            style={{
                                marginLeft: "0.5rem",
                                display: "inline-block",
                                width: "17rem",
                            }}
                            id="id_TARGET_ETA"
                            value={dataEDT_KSV_PO_MRP3.TRADE_TERM}
                            onChange={(e) =>
                                onInputChangeEDT_KSV_PO_MRP3_TRADE_TERM(
                                    e,
                                    "TRADE_TERM",
                                )
                            }
                        />
                    </span>
                    <span
                        style={{
                            marginLeft: "0.5rem",
                            height: "2rem",
                            display: "inline-block",
                            width: "90rem",
                        }}
                    >
                        <p style={{ width: "8rem", display: "inline-block" }}>Tot.Amt</p>
                        <InputText
                            style={{
                                marginLeft: "0.5rem",
                                display: "inline-block",
                                width: "17rem",
                            }}
                            id="id_TARGET_ETA"
                            value={dataEDT_KSV_PO_MRP3.AMOUNT}
                            onChange={(e) =>
                                onInputChangeEDT_KSV_PO_MRP3_AMOUNT(e, "AMOUNT")
                            }
                        />
                    </span>
                    <span
                        style={{
                            marginLeft: "0.5rem",
                            height: "2rem",
                            display: "inline-block",
                            width: "90rem",
                        }}
                    >
                        <p style={{ width: "8rem", display: "inline-block" }}>Pay Bank</p>
                        <div
                            style={{
                                marginLeft: "0.5rem",
                                display: "inline-block",
                                width: "18rem",
                            }}
                        >
                            <Dropdown
                                id="id_NORMI"
                                value={dataEDT_KSV_PO_MRP3_PAY_BANK}
                                onChange={(e) =>
                                    onDropdownChangeEDT_KSV_PO_MRP3_PAY_BANK(
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
                    <span
                        style={{
                            marginLeft: "0.5rem",
                            height: "2rem",
                            display: "inline-block",
                            width: "90rem",
                        }}
                    >
                        <p style={{ width: "8rem", display: "inline-block" }}>Pay Date</p>
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
                                    dataEDT_KSV_PO_MRP3.PAY_DATE,
                                )}
                                onChange={(e) =>
                                    onCalChangeEDT_KSV_PO_MRP3_PAY_DATE(
                                        e,
                                        "PAY_DATE",
                                    )
                                }
                            />
                        </div>
                    </span>
                </div>

                <div
                    style={{
                        marginLeft: "1rem",
                        marginTop: "1.5rem",
                        width: "95rem",
                        height: "26rem",
                    }}
                >
                    <AFDataTable preventUnrelatedRerender
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
                            setFlagSelectModeTBL_KSV_PO_MRP3(true);
                            setSelectedTBL_KSV_PO_MRP3(e.value);
                            console.log(
                                "selected length:" +
                                    selectedTBL_KSV_PO_MRP3.length,
                            );
                            onRowClick1TBL_KSV_PO_MRP3(e.value);
                        }}
                        onRowClick={onRowClickTBL_KSV_PO_MRP3}
                        dataKey="id"
                        className="datatable-responsive"
                        virtualScrollerOptions={{ itemSize: 20 }}
                        emptyMessage=" " //header={headerTBL_KSV_PO_MRP3}
                        responsiveLayout="scroll"
                        scrollable
                        scrollHeight="26rem"
                    >
                        <AFColumn className="af-col" style={{ width: "10rem" }} field="PO_CD" headerClassName="t-header" header="Po" ></AFColumn>
                        <AFColumn className="af-col" style={{ width: "10rem" }} field="MATL_CD" headerClassName="t-header" header="Matl" ></AFColumn>
                        <AFColumn className="af-col" style={{ width: "10rem" }} field="MATL_NAME" headerClassName="t-header" header="Desc" ></AFColumn>
                        <AFColumn className="af-col" style={{ width: "10rem" }} field="COLOR" headerClassName="t-header" header="Color" ></AFColumn>
                        <AFColumn className="af-col" style={{ width: "10rem" }} field="SPEC" headerClassName="t-header" header="Spec" ></AFColumn>
                        <AFColumn className="af-col" style={{ width: "10rem" }} field="UNIT" headerClassName="t-header" header="Unit" ></AFColumn>
                        <AFColumn className="af-col" style={{ width: "10rem" }} field="PO_QTY" headerClassName="t-header" header="Qty" ></AFColumn>
                        <AFColumn className="af-col" style={{ width: "10rem" }} field="PO_PRICE" headerClassName="t-header" header="Po price" ></AFColumn>
                        <AFColumn className="af-col" style={{ width: "10rem" }} field="AMOUNT" headerClassName="t-header" header="Amount" ></AFColumn>
                    </AFDataTable>
                </div>
                <Divider />

                <div
                    style={{
                        width: "123rem",
                        height: "2rem",
                        marginLeft: "71rem",
                    }}
                >
                    <div className="formgrid grid">
                        <div className="field col-6 md:col-6">
                            <Button
                                style={{ width: "10rem" }}
                                label="Save"
                                className="p-button-text"
                                onClick={process_UPDATE_LC}
                            />

                            <Button
                                style={{ width: "10rem" }}
                                label="Exit"
                                className="p-button-text"
                                onClick={blankFn}
                            />
                        </div>
                    </div>
                </div>
            </Dialog>

            <Dialog
                visible={createDialog4}
                position="top-right"
                style={{ width: "98vw" }}
                header="Matl Price Update"
                modal={true}
                className="p-fluid"
                onHide={hideDialog4}
            >
                <div
                    className="af-div-first"
                    style={{ width: "100rem", height: "4rem" }}
                >
                    <span className="af-span-3-0" style={{ width: "16rem" }}>
                        <p className="af-span-p" style={{ width: "7rem" }}>Price</p>
                        <div className="af-span-div" style={{ width: "8rem" }}>
                            <InputText
                                style={{ width: "8rem" }}
                                id="id_TARGET_ETA"
                                value={dataEDT_KSV_PO_MRP4.MATL_PRICE}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_PO_MRP4_MATL_PRICE(
                                        e,
                                        "MATL_PRICE",
                                    )
                                }
                            />
                        </div>
                    </span>
                    <span className="af-span-3-0" style={{ width: "16rem" }}>
                        <p className="af-span-p" style={{ width: "7rem" }}>Curr</p>
                        <div className="af-span-div" style={{ width: "8rem" }}>
                            <InputText
                                disabled
                                style={{ width: "8rem" }}
                                id="id_TARGET_ETA"
                                value={dataEDT_KSV_PO_MRP4.CURR_CD}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_PO_MRP4_CURR_CD(
                                        e,
                                        "CURR_CD",
                                    )
                                }
                            />
                        </div>
                    </span>
                    <span className="af-span-3-0" style={{ width: "10rem" }}>
                        <div
                            className="af-span-div-btn"
                            style={{ width: "8.5rem" }}
                        >
                            <Button
                                label="Update"
                                style={{ width: "8.5rem" }}
                                className="p-button-text"
                                onClick={process_UPDATE_MATL_PRICE_COL}
                            />
                        </div>
                    </span>
                    <span className="af-span-3-0" style={{ width: "10rem" }}>
                        <div
                            className="af-span-div-btn"
                            style={{ width: "8.5rem" }}
                        >
                            <Button
                                label="Save"
                                style={{ width: "8.5rem" }}
                                className="p-button-text"
                                onClick={process_UPDATE_MATL_PRICE}
                            />
                        </div>
                    </span>
                </div>
                <div
                    className="af-div-first"
                    style={{ width: "100rem", height: "30rem" }}
                >
                    <AFDataTable preventUnrelatedRerender
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
                            setFlagSelectModeTBL_KSV_PO_MRP4(true);
                            setSelectedTBL_KSV_PO_MRP4(e.value);
                            console.log(
                                "selected length:" +
                                    selectedTBL_KSV_PO_MRP4.length,
                            );
                            onRowClick1TBL_KSV_PO_MRP4(e.value);
                        }}
                        onRowClick={onRowClickTBL_KSV_PO_MRP4}
                        dataKey="MATL_CD"
                        className="datatable-responsive"
                        virtualScrollerOptions={{ itemSize: 20 }}
                        emptyMessage=" " //header={headerTBL_KSV_PO_MRP4}
                        responsiveLayout="scroll"
                        scrollable
                        scrollHeight="320px"
                    >
                        <AFColumn className="af-col" style={{ width: "6rem" }} field="MATL_CD" headerClassName="t-header" header="Matl" ></AFColumn>
                        <AFColumn className="af-col" style={{ width: "20rem" }} field="MATL_NAME" headerClassName="t-header" header="Desc" ></AFColumn>
                        <AFColumn className="af-col" style={{ width: "20rem" }} field="COLOR" headerClassName="t-header" header="Color" ></AFColumn>
                        <AFColumn className="af-col" style={{ width: "20rem" }} field="SPEC" headerClassName="t-header" header="Spec" ></AFColumn>
                        <AFColumn className="af-col" style={{ width: "4rem" }} field="UNIT" headerClassName="t-header" header="Unit" ></AFColumn>
                        <AFColumn className="af-col" style={{ width: "6rem" }} field="MATL_PRICE" headerClassName="t-header" header="Master P" ></AFColumn>
                    </AFDataTable>
                </div>
            </Dialog>

            <Dialog
                header="Price Change Reason"
                visible={visibleDialogReason}
                modal
                onHide={() => setVisibleDialogReason(false)}
                footer={
                    <div style={{ textAlign: "right" }}>
                        <Button
                            style={{ width: "8rem" }}
                            label="확인"
                            onClick={onConfirmDialog}
                            autoFocus
                        />
                        <Button
                            style={{ width: "8rem" }}
                            label="취소"
                            onClick={onCancelDialog}
                        />
                    </div>
                }
            >
                <DataTable
                    value={selectedTBL_KSV_PO_MRP2}
                    tableStyle={{ tableLayout: "fixed" }}
                    resizableColumns
                    columnResizeMode="expand"
                    style={{ width: "50vw" }}
                >
                    <Column
                        className="af-col"
                        field="MATL_CD"
                        header="Material Code"
                        style={{ width: "8rem" }}
                    />
                    <Column
                        className="af-col"
                        field="MATL_NAME"
                        header="Description"
                        style={{ width: "8rem" }}
                    />
                    <Column
                        className="af-col"
                        field="COLOR"
                        header="Color"
                        style={{ width: "8rem" }}
                    />
                    <Column
                        field="MASTER_PRICE"
                        header="Master P."
                        body={(rowData) =>
                            parseFloat(rowData.MASTER_PRICE).toFixed(2)
                        }
                        style={{ width: "8rem" }}
                    />

                    <Column
                        header="New P."
                        body={() =>
                            dataEDT_PRICE_UPDATE
                                ? parseFloat(dataEDT_PRICE_UPDATE).toFixed(2)
                                : ""
                        }
                        style={{ width: "8rem" }}
                    />

                    <Column
                        header="Reason"
                        body={(rowData) => (
                            <InputText
                                style={{ width: "100%" }}
                                value={reasonMap[rowData.MATL_CD] || ""}
                                onChange={(e) =>
                                    onReasonChange(
                                        rowData.MATL_CD,
                                        e.target.value,
                                    )
                                }
                            />
                        )}
                    />
                </DataTable>
            </Dialog>

            <Toast ref={toast} />
        </div>
    );
};

const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(S040101_PURCHASER_REG, comparisonFn);
