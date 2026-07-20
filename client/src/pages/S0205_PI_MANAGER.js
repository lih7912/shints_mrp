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
import { ServiceS0205_PI_MANAGER } from "../service/service_biz/ServiceS0205_PI_MANAGER";
import apiOption from "../assets/env_graphql";

// import './page_common.scss';

const emptyKCD_CODE = {
    id: 0,
    CD_GROUP: "",
    CD_CODE: "",
    CD_NAME: "",
    CD_FLAG: "",
};

const emptyQRY_KSV_ORDER_PIMST = {
    BUYER_CD: "",
    PI_CD: "",
    STATUS_CD: "",
    S_REG_DATE: "",
    E_REG_DATE: "",
};

const emptyQRY_KSV_ORDER_PIMST2 = {
    ORDER_CD: "",
};

const emptyTBL_KSV_ORDER_PIMST = {
    id: 0,
    STATUS_NAME: "",
    STATUS_CD: "",
    BUYER_NAME: "",
    BUYER_CD: "",
    REG_DATETIME: "",
    PI_CD: "",
    QTY: "",
    AMT: "",
    REG_USER: "",
    File: "",
};

const emptyTBL_KSV_ORDER_PIMST2 = {
    id: 0,
    STATUS_NAME: "",
    STATUS_CD: "",
    BUYER_NAME: "",
    BUYER_CD: "",
    REG_DATETIME: "",
    PI_CD: "",
    QTY: "",
    AMT: "",
    REG_USER: "",
    File: "",
};

const emptyTBL_KSV_ORDER_PIMST3 = {
    id: 0,
    STATUS_NAME: "",
    STATUS_CD: "",
    BUYER_NAME: "",
    BUYER_CD: "",
    REG_DATETIME: "",
    PI_CD: "",
    QTY: "",
    AMT: "",
    REG_USER: "",
    File: "",
};

const emptyEDT_KSV_PI_MST = {
    BUYER_CD: " ",
    PI_CD: "",
    CD: " ",
    REG_DATE: "         ",
    LOADING_PORT: "",
    DESTINATION: "",
    REG_USER: "",
    TOLENCE: " ",
    TOLENCE_ETC: " ",
    PART_SHIP: " ",
    TRANS_SHIP: " ",
    FILE_NAME: " ",
    FILE_URL: " ",
    FILE_OBJECT: " ",
};

const S0205_PI_MANAGER = () => {
    const serviceLibRef = useRef(null);
    if (!serviceLibRef.current) {
        serviceLibRef.current = new ServiceLib();
        serviceLibRef.current.loginConfirm();
    }
    const serviceLib = serviceLibRef.current;
    const serviceS0205_PI_MANAGERRef = useRef(null);
    if (!serviceS0205_PI_MANAGERRef.current) serviceS0205_PI_MANAGERRef.current = new ServiceS0205_PI_MANAGER();
    const serviceS0205_PI_MANAGER = serviceS0205_PI_MANAGERRef.current;

    const toast = useRef(null);

    const [isAddOrder, setIsAddOrder] = useState(false);
    const [fileUrl, setFileUrl] = useState("");

    /* splitter 관련 */

    const [styleVal, setStyleVal] = useState({ width: "65vw" });

    const search_CODE = (argBuyerCd, argDestination, argPort) => {
        var tInObj = {};
        tInObj.BUYER_CD = argBuyerCd;

        serviceS0205_PI_MANAGER.mgrQuery_CODE(tInObj).then((data) => {
            console.log(data);
            if (typeof data.graphQLErrors === "undefined") {
                setDatasEDT_KSV_PI_MST_DESTINATION(data.ORIGIN_PORT);

                var tObj = {};
                var tFlag = 0;
                setDataEDT_KSV_PI_MST_DESTINATION(
                    datasEDT_KSV_PI_MST_DESTINATION[0],
                );
                data.ORIGIN_PORT.forEach((col, i) => {
                    if (col.CD_NAME === argDestination) {
                        setDataEDT_KSV_PI_MST_DESTINATION(col);
                    }
                });

                var tObj1 = {};
                data.LOADING_PORT.forEach((col, i) => {
                    if (col.CD_NAME === argPort) {
                        setDataEDT_KSV_PI_MST_LOADING_PORT(col);
                    }
                });
            } else {
                console.log(
                    "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });
    };

    const process_APPLY_ADD_ORDER = () => {
        if (selectedTBL_KSV_ORDER_PIMST3.length <= 0) return;

        var tOldArray = [];
        var tSumAmt = 0;
        var tCurrCd = "";
        datasTBL_KSV_ORDER_PIMST2.forEach((col, i) => {
            if (col.REF_ORDER_NO !== "Total") {
                var tObj = { ...col };
                tSumAmt += parseFloat(col.AMT);
                tOldArray.push(tObj);
                tCurrCd = tObj.CURR_CD;
            }
        });

        var tNewArray = [...tOldArray];
        var tIdx = 0;
        for (tIdx = 0; tIdx < selectedTBL_KSV_ORDER_PIMST3.length; tIdx++) {
            var tFlag = 0;
            var tOne = { ...selectedTBL_KSV_ORDER_PIMST3[tIdx] };

            var tIdx1 = 0;
            for (tIdx1 = 0; tIdx1 < tOldArray.length; tIdx1++) {
                var tObj0 = { ...tOldArray[tIdx1] };
                if (tObj0.ORDER_CD === tOne.ORDER_CD) {
                    tFlag = 1;
                    break;
                }
                if (tObj0.CURR_CD !== tOne.CURR_CD) {
                    tFlag = 2;
                    break;
                }
            }
            if (tFlag === 1) continue;
            if (tFlag === 2) {
                alert("서로 다른 Curr는 Apply할수 없습니다<br><br>Different Curr cannot be applied");
                return;
            }
            tSumAmt += parseFloat(tOne.AMT);
            tNewArray.push(tOne);
        }

        var tObj = {};
        tObj.REF_ORDER_NO = "Total";
        tObj.AVR_PRICE = "0";
        tObj.AMT = String(tSumAmt);
        tNewArray.push(tObj);
        setDatasTBL_KSV_ORDER_PIMST2(tNewArray);

        setIsAddOrder(false);
    };

    const process_CANCEL_ADD_ORDER = () => {
        setIsAddOrder(false);
    };

    const process_SEARCH_ADD_ORDER = () => {
        var tInObj = {};
        tInObj.BUYER_CD = dataQRY_KSV_ORDER_PIMST2.ORDER_CD;
        tInObj.ORDER_CD = [];
        datasTBL_KSV_ORDER_PIMST2.forEach((col, i) => {
            if (
                col.ORDER_CD === null ||
                col.ORDER_CD === "" ||
                typeof col.ORDER_CD === "undefined"
            );
            else tInObj.ORDER_CD.push(col.ORDER_CD);
        });
        search_LIST_2_3(tInObj);
    };

    const process_ADD_ORDER = () => {
        if (dataEDT_KSV_PI_MST.BUYER_CD === "") return;

        var tInObj = {};
        tInObj.BUYER_CD = dataEDT_KSV_PI_MST.BUYER_CD;
        tInObj.ORDER_CD = [];
        datasTBL_KSV_ORDER_PIMST2.forEach((col, i) => {
            if (
                col.ORDER_CD === null ||
                col.ORDER_CD === "" ||
                typeof col.ORDER_CD === "undefined"
            );
            else tInObj.ORDER_CD.push(col.ORDER_CD);
        });
        search_LIST_2_3(tInObj);
        setIsAddOrder(true);
    };

    const hideDialog = () => {
        setIsAddOrder(false);
    };

    const process_REMOVE_ORDER = () => {
        if (selectedTBL_KSV_ORDER_PIMST2.length <= 0) return;

        var tOldArray = [];
        datasTBL_KSV_ORDER_PIMST2.forEach((col, i) => {
            var tObj = { ...col };
            if (col.REF_ORDER_NO !== "Total") tOldArray.push(tObj);
        });

        if (tOldArray.length <= 1) {
            alert("마지막 1개는 PI을 삭제해 주세요<br><br>Please delete the last one, PI");
            return;
        }

        var tDelObj = { ...selectedTBL_KSV_ORDER_PIMST2[0] };
        var tNewArray = [];
        var tSum = 0;
        tOldArray.forEach((col, i) => {
            var tObj = { ...col };
            if (col.ORDER_CD === tDelObj.ORDER_CD);
            else {
                tSum += parseFloat(tObj.AMT);
                tNewArray.push(tObj);
            }
        });

        var tObj = {};
        tObj.REF_ORDER_NO = "Total";
        tObj.AVR_PRICE = "0";
        tObj.AMT = String(tSum);
        tNewArray.push(tObj);

        setDatasTBL_KSV_ORDER_PIMST2(tNewArray);
    };

    const process_RESET = () => {
        setSelectedTBL_KSV_ORDER_PIMST2([]);
        setDatasTBL_KSV_ORDER_PIMST2([]);

        setSelectedTBL_KSV_ORDER_PIMST3([]);
        setDatasTBL_KSV_ORDER_PIMST3([]);

        setDataEDT_KSV_PI_MST(emptyEDT_KSV_PI_MST);

        editEDT_KSV_PI_MST_BUYER_CD(" ");
        editEDT_KSV_PI_MST_CD(" ");
        editEDT_KSV_PI_MST_TOLENCE(" ");
        editEDT_KSV_PI_MST_PART_SHIP(" ");
        editEDT_KSV_PI_MST_PART_SHIP(" ");
    };

    const process_INSERT_PI = () => {
        var tIn = { ...dataEDT_KSV_PI_MST };

        tIn.DESTINATION = dataEDT_KSV_PI_MST_DESTINATION;

        if (
            tIn.CD === "" ||
            tIn.LOADING_PORT === "" ||
            tIn.DESTINATION === "" ||
            tIn.TOLENCE === "" ||
            tIn.PART_SHIP === "" ||
            tIn.TRANS_SHIP === ""
        ) {
            alert(
                "Loading Port, Destination, tolerance, Part Ship, Trans Ship중 입력안된것이 있습니다",
            );
            return;
        }
        tIn.TOLENCE_N = dataEDT_KSV_PI_MST_TOLENCE.CD_NAME;
        tIn.LOADING_PORT = dataEDT_KSV_PI_MST_LOADING_PORT.CD_NAME;
        tIn.DESTINATION = dataEDT_KSV_PI_MST_DESTINATION.CD_NAME;
        if (tIn.TOLENCE === "50");
        else tIn.TOLENCE_ETC = "";

        var tIn20 = [...datasTBL_KSV_ORDER_PIMST2];

        var tIn2 = [];
        tIn20.forEach((col, i) => {
            var tObj = { ...col };
            delete tObj.__typename;
            if (tObj.REF_ORDER_NO !== "Total") tIn2.push(tObj);
        });

        setLoadingTBL_KSV_ORDER_PIMST(true);
        setDatasTBL_KSV_ORDER_PIMST2([]);

        if (tIn.PI_CD === "") {
            serviceS0205_PI_MANAGER.mgrInsert_PI_MST(tIn, tIn2).then((data) => {
                setLoadingTBL_KSV_ORDER_PIMST(false);
                if (typeof data.graphQLErrors === "undefined") {
                    if (data.length > 0) {
                        toast.current.show({
                            severity: "success",
                            summary: "Info",
                            detail: data[0].CODE,
                            life: 3000,
                        });
                        if (data[0].CODE.includes("SUCC")) {
                            var tCol = data[0].CODE.split(":");
                            var _tObj = { ...dataEDT_KSV_PI_MST };
                            _tObj.PI_CD = tCol[1];
                            setDataEDT_KSV_PI_MST(_tObj);

                            var tQryObj = { ...dataQRY_KSV_ORDER_PIMST };
                            tQryObj.PI_CD = tCol[1];
                            setDataQRY_KSV_ORDER_PIMST(tQryObj);

                            search_LIST_1(tQryObj);
                        }
                    }
                } else {
                    toast.current.show({
                        severity: "success",
                        summary: "Info",
                        detail: "",
                        life: 3000,
                    });
                    console.log(
                        "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });
        } else {
            serviceS0205_PI_MANAGER.mgrUpdate_PI_MST(tIn, tIn2).then((data) => {
                // setLoadingTBL_KSV_ORDER_PIMST(false);
                if (typeof data.graphQLErrors === "undefined") {
                    if (data.length > 0) {
                        toast.current.show({
                            severity: "success",
                            summary: "Info",
                            detail: data[0].CODE,
                            life: 3000,
                        });
                        if (data[0].CODE.includes("SUCC")) {
                        } else {
                            // process_RESET();
                        }
                        search_LIST_1();
                    }
                } else {
                    toast.current.show({
                        severity: "success",
                        summary: "Info",
                        detail: "",
                        life: 3000,
                    });
                    console.log(
                        "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });
        }
    };

    const process_DELETE_PI = () => {
        var tIn = { ...dataEDT_KSV_PI_MST };
        tIn.TOLENCE_N = dataEDT_KSV_PI_MST_TOLENCE?.CD_NAME;

        var tIn20 = [...datasTBL_KSV_ORDER_PIMST2];

        var tIn2 = [];
        tIn20.forEach((col, i) => {
            var tObj = { ...col };
            delete tObj.__typename;
            tIn2.push(tObj);
        });

        // setLoadingTBL_KSV_ORDER_PIMST(true);

        serviceS0205_PI_MANAGER.mgrDelete_PI_MST(tIn, tIn2).then((data) => {
            // setLoadingTBL_KSV_ORDER_PIMST(false);
            if (typeof data.graphQLErrors === "undefined") {
                if (data.length > 0) {
                    toast.current.show({
                        severity: "success",
                        summary: "Info",
                        detail: data[0].CODE,
                        life: 3000,
                    });
                    if (data[0].CODE.includes("SUCC")) {
                        process_RESET();
                    }
                    search_LIST_1();
                }
            } else {
                toast.current.show({
                    severity: "success",
                    summary: "Info",
                    detail: "",
                    life: 3000,
                });
                console.log(
                    "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });
    };

    const search_LIST_1 = (argData) => {
        var tIn = {};

        if (
            typeof argData === "undefined" ||
            typeof argData.PI_CD === "undefined"
        ) {
            tIn = { ...dataQRY_KSV_ORDER_PIMST };
        } else {
            tIn = { ...argData };
        }

        setLoadingTBL_KSV_ORDER_PIMST(true);

        serviceS0205_PI_MANAGER.mgrQuery_LIST_1(tIn).then((data) => {
            setLoadingTBL_KSV_ORDER_PIMST(false);
            if (typeof data.graphQLErrors === "undefined") {
                var tArray = data.map((col, i) => {
                    var tObj = { ...col };
                    tObj.id = i + 1;
                    return tObj;
                });

                console.log(tArray);
                setDatasTBL_KSV_ORDER_PIMST(tArray);
            } else {
                console.log(
                    "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });
    };

    const search_LIST_2_1 = (argData) => {
        var tIn = {};
        tIn.PI_CD = argData.PI_CD;
        tIn.BUYER_CD = "";

        setLoadingTBL_KSV_ORDER_PIMST2(true);

        serviceS0205_PI_MANAGER.mgrQuery_LIST_2_1(tIn).then((data) => {
            setLoadingTBL_KSV_ORDER_PIMST2(false);
            if (typeof data.graphQLErrors === "undefined") {
                var tSum = 0;
                var tSumQty = 0;
                var tArray = data.map((col, i) => {
                    var tObj = { ...col };
                    tObj.id = i + 1;
                    tSum += parseFloat(tObj.AMT);
                    tSumQty += parseFloat(tObj.TOT_CNT);
                    return tObj;
                });
                var tObj = {};
                tObj.REF_ORDER_NO = "Total";
                tObj.AVR_PRICE = "0";
                tObj.AMT = String(tSum);
                tObj.TOT_CNT = String(tSumQty);
                tArray.push(tObj);

                setDatasTBL_KSV_ORDER_PIMST2(tArray);
            } else {
                console.log(
                    "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });
    };

    const search_EXCEL_PI_PRINT = (argData) => {
        var tObj = { ...dataEDT_KSV_PI_MST };

        var tIn = {};
        tIn.PI_CD = tObj.PI_CD;
        tIn.BUYER_CD = "";

        if (!tIn.PI_CD) {
            alert("Select PI");
            return;
        }

        setLoadingTBL_KSV_ORDER_PIMST2(true);
        serviceS0205_PI_MANAGER.mgrQuery_EXCEL_PI_PRINT(tIn).then((data) => {
            setLoadingTBL_KSV_ORDER_PIMST2(false);

            if (typeof data.graphQLErrors === "undefined") {
                if (data.length > 0) {
                    if (data[0].CODE.includes("SUCCEED")) {
                        //alert(data[0].CODE);
                        serviceLib.downloadFile(
                            data[0].CODE.split("?")[2].toString(),
                            data[0].CODE.split("?")[1].toString(),
                        );
                    } else {
                        alert(data[0].CODE);
                    }
                }
            } else {
                console.log(
                    "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });
    };

    const search_LIST_2_2 = (argData) => {
        var tIn = {};
        tIn.ORDER_CD = [...argData];

        setLoadingTBL_KSV_ORDER_PIMST2(true);

        serviceS0205_PI_MANAGER.mgrQuery_LIST_2_2(tIn).then((data) => {
            setLoadingTBL_KSV_ORDER_PIMST2(false);
            if (typeof data.graphQLErrors === "undefined") {
                var tSum = 0;
                var tArray = data.map((col, i) => {
                    var tObj = { ...col };
                    tObj.id = i + 1;
                    tSum += parseFloat(tObj.AMT);
                    return tObj;
                });
                var tObj = {};
                tObj.REF_ORDER_NO = "Total";
                tObj.AVR_PRICE = "0";
                tObj.AMT = String(tSum);
                tArray.push(tObj);
                setDatasTBL_KSV_ORDER_PIMST2(tArray);

                var tObj = { ...dataEDT_KSV_PI_MST };

                tObj.BUYER_CD = tIn.ORDER_CD[0].substring(0, 2);
                setDataEDT_KSV_PI_MST(tObj);

                console.log(tObj.BUYER_CD);

                editEDT_KSV_PI_MST_BUYER_CD(tObj.BUYER_CD);
            } else {
                console.log(
                    "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });
    };

    const search_LIST_2_3 = (argData) => {
        setLoadingTBL_KSV_ORDER_PIMST3(true);

        serviceS0205_PI_MANAGER.mgrQuery_LIST_2_3(argData).then((data) => {
            setLoadingTBL_KSV_ORDER_PIMST3(false);
            if (typeof data.graphQLErrors === "undefined") {
                setSelectedTBL_KSV_ORDER_PIMST3([]);
                var tArray = data.map((col, i) => {
                    var tObj = { ...col };
                    tObj.id = i + 1;
                    return tObj;
                });
                setDatasTBL_KSV_ORDER_PIMST3(tArray);
            } else {
                console.log(
                    "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });
    };

    /*QRY KSV_ORDER_PIMST */

    const [dataQRY_KSV_ORDER_PIMST, setDataQRY_KSV_ORDER_PIMST] = useState(
        emptyQRY_KSV_ORDER_PIMST,
    );

    const [
        datasQRY_KSV_ORDER_PIMST_BUYER_CD,
        setDatasQRY_KSV_ORDER_PIMST_BUYER_CD,
    ] = useState([]);
    const [
        dataQRY_KSV_ORDER_PIMST_BUYER_CD,
        setDataQRY_KSV_ORDER_PIMST_BUYER_CD,
    ] = useState({});

    const onDropdownChangeQRY_KSV_ORDER_PIMST_BUYER_CD = (e, name) => {
        let val = (e.value && e.value.BUYER_CD) || "";

        let _dataQRY_KSV_ORDER_PIMST = { ...dataQRY_KSV_ORDER_PIMST };

        let tTypeVal = _dataQRY_KSV_ORDER_PIMST[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_ORDER_PIMST[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_ORDER_PIMST[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_ORDER_PIMST(_dataQRY_KSV_ORDER_PIMST);
        setDataQRY_KSV_ORDER_PIMST_BUYER_CD(e.value);
    };

    const onInputChangeQRY_KSV_ORDER_PIMST_PI_CD = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_ORDER_PIMST = { ...dataQRY_KSV_ORDER_PIMST };

        let tTypeVal = _dataQRY_KSV_ORDER_PIMST[`${name}`];
        if (typeof tTypeVal === "string")
            _dataQRY_KSV_ORDER_PIMST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_ORDER_PIMST[`${name}`] = parseInt(val);

        setDataQRY_KSV_ORDER_PIMST(_dataQRY_KSV_ORDER_PIMST);
    };

    const [
        datasQRY_KSV_ORDER_PIMST_STATUS_CD,
        setDatasQRY_KSV_ORDER_PIMST_STATUS_CD,
    ] = useState([]);
    const [
        dataQRY_KSV_ORDER_PIMST_STATUS_CD,
        setDataQRY_KSV_ORDER_PIMST_STATUS_CD,
    ] = useState({});

    const onDropdownChangeQRY_KSV_ORDER_PIMST_STATUS_CD = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataQRY_KSV_ORDER_PIMST = { ...dataQRY_KSV_ORDER_PIMST };

        let tTypeVal = _dataQRY_KSV_ORDER_PIMST[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_ORDER_PIMST[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_ORDER_PIMST[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_ORDER_PIMST(_dataQRY_KSV_ORDER_PIMST);
        setDataQRY_KSV_ORDER_PIMST_STATUS_CD(e.value);
    };

    const onCalChangeQRY_KSV_ORDER_PIMST_S_REG_DATE = (e, name) => {
        let val1 = e.value || "";
        let val = "";
        if (val1 === "") {
            val = "";
        } else {
            val = getDateVal(val1);
        }

        let _dataQRY_KSV_ORDER_PIMST = { ...dataQRY_KSV_ORDER_PIMST };
        _dataQRY_KSV_ORDER_PIMST[`${name}`] = val;
        setDataQRY_KSV_ORDER_PIMST(_dataQRY_KSV_ORDER_PIMST);
    };

    const onCalChangeQRY_KSV_ORDER_PIMST_E_REG_DATE = (e, name) => {
        let val1 = e.value || "";
        let val = "";
        if (val1 === "") {
            val = "";
        } else {
            val = getDateVal(val1);
        }

        let _dataQRY_KSV_ORDER_PIMST = { ...dataQRY_KSV_ORDER_PIMST };
        _dataQRY_KSV_ORDER_PIMST[`${name}`] = val;
        setDataQRY_KSV_ORDER_PIMST(_dataQRY_KSV_ORDER_PIMST);
    };

    //
    const [dataQRY_KSV_ORDER_PIMST2, setDataQRY_KSV_ORDER_PIMST2] = useState(
        emptyQRY_KSV_ORDER_PIMST2,
    );

    const onInputChangeQRY_KSV_ORDER_PIMST2_ORDER_CD = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_ORDER_PIMST2 = { ...dataQRY_KSV_ORDER_PIMST2 };

        let tTypeVal = _dataQRY_KSV_ORDER_PIMST2[`${name}`];
        if (typeof tTypeVal === "string")
            _dataQRY_KSV_ORDER_PIMST2[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_ORDER_PIMST2[`${name}`] = parseInt(val);

        setDataQRY_KSV_ORDER_PIMST2(_dataQRY_KSV_ORDER_PIMST2);
    };

    /*TABLE KSV_ORDER_PIMST*/
    // DEFINE DATAGRID : TBL_KSV_ORDER_PIMST
    const [loadingTBL_KSV_ORDER_PIMST, setLoadingTBL_KSV_ORDER_PIMST] =
        useState(false);

    const [datasTBL_KSV_ORDER_PIMST, setDatasTBL_KSV_ORDER_PIMST] = useState(
        [],
    );
    const dt_TBL_KSV_ORDER_PIMST = useRef(null);
    const [dataTBL_KSV_ORDER_PIMST, setDataTBL_KSV_ORDER_PIMST] = useState(
        emptyTBL_KSV_ORDER_PIMST,
    );
    const [selectedTBL_KSV_ORDER_PIMST, setSelectedTBL_KSV_ORDER_PIMST] =
        useState([]);
    const [
        flagSelectModeTBL_KSV_ORDER_PIMST,
        setFlagSelectModeTBL_KSV_ORDER_PIMST,
    ] = useState(false);

    // DATAGRID CODE : TBL_KSV_ORDER_PIMST

    const editTBL_KSV_ORDER_PIMST = (argData) => {
        var tObj = { ...dataEDT_KSV_PI_MST };

        tObj.BUYER_CD = argData.BUYER_CD;
        tObj.PI_CD = argData.PI_CD;
        tObj.CD = argData.PI_REMARK4;
        tObj.REG_DATE = argData.REG_DATETIME.substring(0, 8);
        tObj.LOADING_PORT = argData.PORT;
        tObj.DESTINATION = argData.DESTINATION;
        tObj.REG_USER = argData.REG_USER;
        tObj.TOLENCE = argData.PI_REMARK1;
        tObj.TOLENCE_ETC = argData.PI_REMARK8;
        tObj.PART_SHIP = argData.PI_REMARK2;
        tObj.TRANS_SHIP = argData.PI_REMARK3;
        tObj.FILE_NAME = argData.FILE_NAME;
        tObj.FILE_URL = argData.FILE_URL;
        tObj.FILE_OBJECT = argData.FILE_OBJECT;

        setDataEDT_KSV_PI_MST(tObj);

        if (tObj.TOLENCE === "50") setIsTOLENCE_ETC(false);
        else setIsTOLENCE_ETC(true);

        editEDT_KSV_PI_MST_BUYER_CD(tObj.BUYER_CD);
        editEDT_KSV_PI_MST_LOADING_PORT(tObj.LOADING_PORT);
        editEDT_KSV_PI_MST_CD(tObj.CD);
        editEDT_KSV_PI_MST_TOLENCE(tObj.TOLENCE);
        editEDT_KSV_PI_MST_PART_SHIP(tObj.PART_SHIP);
        editEDT_KSV_PI_MST_TRANS_SHIP(tObj.TRANS_SHIP);

        var tFlag = 0;
        var tObj = {};
        datasEDT_KSV_PI_MST_DESTINATION.forEach((col, i) => {
            if (col.CD_CODE === argData.DESTINATION) {
                tFlag = 1;
                tObj = { ...col };
            }
        });
        if (tFlag === 1) setDataEDT_KSV_PI_MST_DESTINATION(tObj);
        else {
            var tArray = [...datasEDT_KSV_PI_MST_DESTINATION];
            var tObj = {};
            tObj.CD_CODE = argData.DESTINATION;
            tObj.CD_NAME = argData.DESTINATION;
            tArray.push(tObj);
            setDatasEDT_KSV_PI_MST_DESTINATION(tArray);
            setDataEDT_KSV_PI_MST_DESTINATION(tObj);
        }
    };

    const onRowClick1TBL_KSV_ORDER_PIMST = (argData0) => {
        var argData = {};

        if (typeof argData0.length !== "undefined") {
            argData = argData0[0];
        } else {
            argData = argData0;
        }

        let argTBL_KSV_ORDER_PIMST = argData;
        editTBL_KSV_ORDER_PIMST(argTBL_KSV_ORDER_PIMST);
        setDataTBL_KSV_ORDER_PIMST(argTBL_KSV_ORDER_PIMST);

        search_LIST_2_1(argData);
        search_CODE(argData.BUYER_CD, argData.SHIP_ADDR1, argData.PORT);

        let _url1 = `${window.location.protocol}//${window.location.hostname}:3202/restapi/`;
        var tUrl = `${_url1}fileupload/pi/` + argData.PI_CD;
        setDataUrl(tUrl);
    };

    const onRowClickTBL_KSV_ORDER_PIMST = (event) => {
        let argTBL_KSV_ORDER_PIMST = event.data;
        if (flagSelectModeTBL_KSV_ORDER_PIMST) return;

        // Service : NawooAll:mgrQueryTBL_KSV_ORDER_PIMST
    };

    const exportExcelTBL_KSV_ORDER_PIMST = async () => {
        if (!datasTBL_KSV_ORDER_PIMST || datasTBL_KSV_ORDER_PIMST.length <= 0) {
            alert("No data");
            return;
        }

        const toExcelNumber = (value) => {
            if (value === null || value === "" || typeof value === "undefined") {
                return null;
            }

            const parsed = Number(String(value).replace(/,/g, ""));
            return Number.isFinite(parsed) ? parsed : null;
        };

        const excelRows = datasTBL_KSV_ORDER_PIMST.map((row) => ({
            "PI Status Name": row.STATUS_NAME ?? "",
            Buyer: row.BUYER_NAME ?? "",
            "Reg Date": serviceLib.dateFormat(row.REG_DATETIME) ?? "",
            "PI#": row.PI_CD ?? "",
            Qty: toExcelNumber(row.QTY),
            "Amt($)": toExcelNumber(row.AMT),
            User: row.REG_USER ?? "",
            File: row.File ?? "",
            "PI Status CD": row.STATUS_CD ?? "",
            "Buyer CD": row.BUYER_CD ?? "",
            DE: row.DE ?? "",
        }));

        await serviceLib.exportExcel("PI_LIST", "PI_LIST", excelRows, {
            headerColor: "FFFFF2CC",
            columnNumberFormats: {
                Qty: "#,##0",
                "Amt($)": "#,##0.00",
            },
        });
    };

    /*TABLE KSV_ORDER_PIMST2*/
    // DEFINE DATAGRID : TBL_KSV_ORDER_PIMST2
    const [loadingTBL_KSV_ORDER_PIMST2, setLoadingTBL_KSV_ORDER_PIMST2] =
        useState(false);

    const [datasTBL_KSV_ORDER_PIMST2, setDatasTBL_KSV_ORDER_PIMST2] = useState(
        [],
    );
    const dt_TBL_KSV_ORDER_PIMST2 = useRef(null);
    const [dataTBL_KSV_ORDER_PIMST2, setDataTBL_KSV_ORDER_PIMST2] = useState(
        emptyTBL_KSV_ORDER_PIMST2,
    );
    const [selectedTBL_KSV_ORDER_PIMST2, setSelectedTBL_KSV_ORDER_PIMST2] =
        useState([]);
    const [
        flagSelectModeTBL_KSV_ORDER_PIMST2,
        setFlagSelectModeTBL_KSV_ORDER_PIMST2,
    ] = useState(false);

    // DATAGRID CODE : TBL_KSV_ORDER_PIMST2

    const onRowClick1TBL_KSV_ORDER_PIMST2 = (argData0) => {
        var argData = {};

        if (typeof argData0.length !== "undefined") {
            argData = argData0[0];
        } else {
            argData = argData0;
        }

        let argTBL_KSV_ORDER_PIMST2 = argData;

        setDataTBL_KSV_ORDER_PIMST2(argTBL_KSV_ORDER_PIMST2);

        editEDT_KSV_PI_MST_BUYER_CD(argData.ORDER_CD?.substring(0, 2));
    };

    const onRowClickTBL_KSV_ORDER_PIMST2 = (event) => {
        let argTBL_KSV_ORDER_PIMST2 = event.data;
        if (flagSelectModeTBL_KSV_ORDER_PIMST2) return;

        // Service : NawooAll:mgrQueryTBL_KSV_ORDER_PIMST2
    };

    /*TABLE KSV_ORDER_PIMST3*/
    // DEFINE DATAGRID : TBL_KSV_ORDER_PIMST3
    const [loadingTBL_KSV_ORDER_PIMST3, setLoadingTBL_KSV_ORDER_PIMST3] =
        useState(false);

    const [datasTBL_KSV_ORDER_PIMST3, setDatasTBL_KSV_ORDER_PIMST3] = useState(
        [],
    );
    const dt_TBL_KSV_ORDER_PIMST3 = useRef(null);
    const [dataTBL_KSV_ORDER_PIMST3, setDataTBL_KSV_ORDER_PIMST3] = useState(
        emptyTBL_KSV_ORDER_PIMST3,
    );
    const [selectedTBL_KSV_ORDER_PIMST3, setSelectedTBL_KSV_ORDER_PIMST3] =
        useState([]);
    const [
        flagSelectModeTBL_KSV_ORDER_PIMST3,
        setFlagSelectModeTBL_KSV_ORDER_PIMST3,
    ] = useState(false);

    // DATAGRID CODE : TBL_KSV_ORDER_PIMST3

    const onRowClick1TBL_KSV_ORDER_PIMST3 = (argData0) => {
        var argData = {};

        if (typeof argData0.length !== "undefined") {
            argData = argData0[0];
        } else {
            argData = argData0;
        }

        let argTBL_KSV_ORDER_PIMST3 = argData;

        setDataTBL_KSV_ORDER_PIMST3(argTBL_KSV_ORDER_PIMST3);
    };

    const onRowClickTBL_KSV_ORDER_PIMST3 = (event) => {
        let argTBL_KSV_ORDER_PIMST3 = event.data;
        if (flagSelectModeTBL_KSV_ORDER_PIMST3) return;

        // Service : NawooAll:mgrQueryTBL_KSV_ORDER_PIMST3
    };

    // EDIT
    const [dataEDT_KSV_PI_MST, setDataEDT_KSV_PI_MST] =
        useState(emptyEDT_KSV_PI_MST);

    const onInputChangeEDT_KSV_PI_MST_PI_CD = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_PI_MST = { ...dataEDT_KSV_PI_MST };

        let tTypeVal = _dataEDT_KSV_PI_MST[`${name}`];
        if (typeof tTypeVal === "string") _dataEDT_KSV_PI_MST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_PI_MST[`${name}`] = parseInt(val);

        setDataEDT_KSV_PI_MST(_dataEDT_KSV_PI_MST);
    };

    const onInputChangeEDT_KSV_PI_MST_BUYER_CD = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_PI_MST = { ...dataEDT_KSV_PI_MST };

        let tTypeVal = _dataEDT_KSV_PI_MST[`${name}`];
        if (typeof tTypeVal === "string") _dataEDT_KSV_PI_MST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_PI_MST[`${name}`] = parseInt(val);

        setDataEDT_KSV_PI_MST(_dataEDT_KSV_PI_MST);
    };

    const [isTOLENCE_ETC, setIsTOLENCE_ETC] = useState(true);
    const onInputChangeEDT_KSV_PI_MST_TOLENCE_ETC = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_PI_MST = { ...dataEDT_KSV_PI_MST };

        let tTypeVal = _dataEDT_KSV_PI_MST[`${name}`];
        if (typeof tTypeVal === "string") _dataEDT_KSV_PI_MST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_PI_MST[`${name}`] = parseInt(val);

        setDataEDT_KSV_PI_MST(_dataEDT_KSV_PI_MST);
    };

    const onInputChangeEDT_KSV_PI_MST_REG_USER = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_PI_MST = { ...dataEDT_KSV_PI_MST };

        let tTypeVal = _dataEDT_KSV_PI_MST[`${name}`];
        if (typeof tTypeVal === "string") _dataEDT_KSV_PI_MST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_PI_MST[`${name}`] = parseInt(val);

        setDataEDT_KSV_PI_MST(_dataEDT_KSV_PI_MST);
    };

    const onInputChangeEDT_KSV_PI_MST_FILE_NAME = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_PI_MST = { ...dataEDT_KSV_PI_MST };

        let tTypeVal = _dataEDT_KSV_PI_MST[`${name}`];
        if (typeof tTypeVal === "string") _dataEDT_KSV_PI_MST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_PI_MST[`${name}`] = parseInt(val);

        setDataEDT_KSV_PI_MST(_dataEDT_KSV_PI_MST);
    };

    const onCalChangeEDT_KSV_PI_MST_REG_DATE = (e, name) => {
        let val1 = e.value || "";
        let val = "";
        if (val1 === "") {
            val = "";
        } else {
            val = getDateVal(val1);
        }

        let _dataEDT_KSV_PI_MST = { ...dataEDT_KSV_PI_MST };
        _dataEDT_KSV_PI_MST[`${name}`] = val;
        setDataEDT_KSV_PI_MST(_dataEDT_KSV_PI_MST);
    };

    const [datasEDT_KSV_PI_MST_BUYER_CD, setDatasEDT_KSV_PI_MST_BUYER_CD] =
        useState([]);
    const [dataEDT_KSV_PI_MST_BUYER_CD, setDataEDT_KSV_PI_MST_BUYER_CD] =
        useState({});

    const editEDT_KSV_PI_MST_BUYER_CD = (argValue) => {
        let _dataEDT_KSV_PI_MST_BUYER_CD = [];
        // console.log(datasEDT_KSV_PI_MST_BUYER_CD);
        datasEDT_KSV_PI_MST_BUYER_CD.forEach((col, i) => {
            var tObj = { ...col };
            // console.log(argValue + ',' + col.BUYER_CD);
            if (col.BUYER_CD === argValue)
                _dataEDT_KSV_PI_MST_BUYER_CD.push(tObj);
        });
        // console.log(argValue);
        // console.log(_dataEDT_KSV_PI_MST_BUYER_CD);
        setDataEDT_KSV_PI_MST_BUYER_CD(_dataEDT_KSV_PI_MST_BUYER_CD[0]);
    };

    const [datasEDT_KSV_PI_MST_CD, setDatasEDT_KSV_PI_MST_CD] = useState([]);
    const [dataEDT_KSV_PI_MST_CD, setDataEDT_KSV_PI_MST_CD] = useState({});

    const editEDT_KSV_PI_MST_CD = (argValue) => {
        let _tDatas = [];
        datasEDT_KSV_PI_MST_CD.forEach((col, i) => {
            var tObj = { ...col };
            if (col.CD_CODE === argValue) _tDatas.push(tObj);
        });
        setDataEDT_KSV_PI_MST_CD(_tDatas[0]);
    };

    const onDropdownChangeEDT_KSV_PI_MST_CD = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataEDT_KSV_PI_MST = { ...dataEDT_KSV_PI_MST };

        let tTypeVal = _dataEDT_KSV_PI_MST[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_KSV_PI_MST[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_KSV_PI_MST[`${name}`] = parseInt(val);
        }

        setDataEDT_KSV_PI_MST(_dataEDT_KSV_PI_MST);
        setDataEDT_KSV_PI_MST_CD(e.value);
    };

    const [
        datasEDT_KSV_PI_MST_LOADING_PORT,
        setDatasEDT_KSV_PI_MST_LOADING_PORT,
    ] = useState([]);
    const [
        dataEDT_KSV_PI_MST_LOADING_PORT,
        setDataEDT_KSV_PI_MST_LOADING_PORT,
    ] = useState({});

    const editEDT_KSV_PI_MST_LOADING_PORT = (argValue) => {
        let _tDatas = [];
        datasEDT_KSV_PI_MST_LOADING_PORT.forEach((col, i) => {
            var tObj = { ...col };
            if (col.CD_CODE === argValue) _tDatas.push(tObj);
        });
        setDataEDT_KSV_PI_MST_LOADING_PORT(_tDatas[0]);
    };

    const onDropdownChangeEDT_KSV_PI_MST_LOADING_PORT = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataEDT_KSV_PI_MST = { ...dataEDT_KSV_PI_MST };

        let tTypeVal = _dataEDT_KSV_PI_MST[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_KSV_PI_MST[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_KSV_PI_MST[`${name}`] = parseInt(val);
        }

        setDataEDT_KSV_PI_MST(_dataEDT_KSV_PI_MST);
        setDataEDT_KSV_PI_MST_LOADING_PORT(e.value);
    };

    const [
        datasEDT_KSV_PI_MST_DESTINATION,
        setDatasEDT_KSV_PI_MST_DESTINATION,
    ] = useState([]);
    const [dataEDT_KSV_PI_MST_DESTINATION, setDataEDT_KSV_PI_MST_DESTINATION] =
        useState({});
    const [
        savesEDT_KSV_PI_MST_DESTINATION,
        setSavesEDT_KSV_PI_MST_DESTINATION,
    ] = useState([]);

    const onDropdownChangeEDT_KSV_PI_MST_DESTINATION = (e, name) => {
        let _dataEDT_KSV_PI_MST = { ...dataEDT_KSV_PI_MST };

        let val = "";
        if (typeof e.value !== "object") {
            var tArray = [...savesEDT_KSV_PI_MST_DESTINATION];
            val = e.value;
            var tObj = {};
            tObj.CD_CODE = val;
            tObj.CD_NAME = val;
            tArray.push(tObj);
            setDatasEDT_KSV_PI_MST_DESTINATION(tArray);
            setDataEDT_KSV_PI_MST_DESTINATION(tObj);
        } else {
            val = (e.value && e.value.CD_CODE) || "";
            setDataEDT_KSV_PI_MST_DESTINATION(e.value);
            let tTypeVal = _dataEDT_KSV_PI_MST[`${name}`];
            if (typeof tTypeVal === "string" && typeof val === "string") {
                _dataEDT_KSV_PI_MST[`${name}`] = String(val);
            } else if (
                typeof tTypeVal === "number" &&
                typeof val === "string"
            ) {
                _dataEDT_KSV_PI_MST[`${name}`] = parseInt(val);
            }
            setDataEDT_KSV_PI_MST(_dataEDT_KSV_PI_MST);
        }
    };

    const [datasEDT_KSV_PI_MST_TOLENCE, setDatasEDT_KSV_PI_MST_TOLENCE] =
        useState([]);
    const [dataEDT_KSV_PI_MST_TOLENCE, setDataEDT_KSV_PI_MST_TOLENCE] =
        useState({});

    const editEDT_KSV_PI_MST_TOLENCE = (argValue) => {
        let _tDatas = [];
        datasEDT_KSV_PI_MST_TOLENCE.forEach((col, i) => {
            var tObj = { ...col };
            if (col.CD_CODE === argValue) _tDatas.push(tObj);
        });
        setDataEDT_KSV_PI_MST_TOLENCE(_tDatas[0]);
    };

    const onDropdownChangeEDT_KSV_PI_MST_TOLENCE = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataEDT_KSV_PI_MST = { ...dataEDT_KSV_PI_MST };

        let tTypeVal = _dataEDT_KSV_PI_MST[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_KSV_PI_MST[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_KSV_PI_MST[`${name}`] = parseInt(val);
        }

        if (val === "50") setIsTOLENCE_ETC(false);
        else setIsTOLENCE_ETC(true);

        setDataEDT_KSV_PI_MST(_dataEDT_KSV_PI_MST);
        setDataEDT_KSV_PI_MST_TOLENCE(e.value);
    };

    const [datasEDT_KSV_PI_MST_PART_SHIP, setDatasEDT_KSV_PI_MST_PART_SHIP] =
        useState([]);
    const [dataEDT_KSV_PI_MST_PART_SHIP, setDataEDT_KSV_PI_MST_PART_SHIP] =
        useState({});

    const editEDT_KSV_PI_MST_PART_SHIP = (argValue) => {
        let _tDatas = [];
        datasEDT_KSV_PI_MST_PART_SHIP.forEach((col, i) => {
            var tObj = { ...col };
            if (col.CD_CODE === argValue) _tDatas.push(tObj);
        });
        setDataEDT_KSV_PI_MST_PART_SHIP(_tDatas[0]);
    };

    const onDropdownChangeEDT_KSV_PI_MST_PART_SHIP = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataEDT_KSV_PI_MST = { ...dataEDT_KSV_PI_MST };

        let tTypeVal = _dataEDT_KSV_PI_MST[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_KSV_PI_MST[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_KSV_PI_MST[`${name}`] = parseInt(val);
        }

        setDataEDT_KSV_PI_MST(_dataEDT_KSV_PI_MST);
        setDataEDT_KSV_PI_MST_PART_SHIP(e.value);
    };

    const [datasEDT_KSV_PI_MST_TRANS_SHIP, setDatasEDT_KSV_PI_MST_TRANS_SHIP] =
        useState([]);
    const [dataEDT_KSV_PI_MST_TRANS_SHIP, setDataEDT_KSV_PI_MST_TRANS_SHIP] =
        useState({});

    const editEDT_KSV_PI_MST_TRANS_SHIP = (argValue) => {
        let _tDatas = [];
        datasEDT_KSV_PI_MST_TRANS_SHIP.forEach((col, i) => {
            var tObj = { ...col };
            if (col.CD_CODE === argValue) _tDatas.push(tObj);
        });
        setDataEDT_KSV_PI_MST_TRANS_SHIP(_tDatas[0]);
    };

    const onDropdownChangeEDT_KSV_PI_MST_TRANS_SHIP = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataEDT_KSV_PI_MST = { ...dataEDT_KSV_PI_MST };

        let tTypeVal = _dataEDT_KSV_PI_MST[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_KSV_PI_MST[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_KSV_PI_MST[`${name}`] = parseInt(val);
        }

        setDataEDT_KSV_PI_MST(_dataEDT_KSV_PI_MST);
        setDataEDT_KSV_PI_MST_TRANS_SHIP(e.value);
    };

    /*File Upload */
    const [dataUrl, setDataUrl] = useState("");

    useEffect(() => {
        var tRetDate1 = serviceLib.getCurrDate1();
        var tUserInfo = serviceLib.getUserInfo();

        let tOrderCds = [];

        var tUrls = window.location.href.split("?");
        if (tUrls.length <= 1) {
        } else {
            var tParams1 = tUrls[1].split("&");
            if (tParams1[0].split("=")[0] != "label") {
                var tParams2 = tParams1.map((col, i) => {
                    var tObj = {};
                    var tCols = col.split("=");

                    if (tCols[0].includes("ORDER_CD")) {
                        tObj.key = tCols[0];
                        tObj.value = tCols[1];
                        console.log(tObj);
                        return tObj;
                    }
                });
                if (tParams2.length > 0) {
                    tOrderCds = tParams2[0].value.split("|");
                }
                console.log(tParams2);
            }
        }

        var tBuyerCd = "";
        if (tOrderCds.length > 0) {
            tBuyerCd = tOrderCds[0].substring(0, 2);
        } else {
        }
        console.log(tBuyerCd);

        var tInObj = {};
        tInObj.BUYER_CD = tBuyerCd;

        serviceS0205_PI_MANAGER.mgrQuery_CODE(tInObj).then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                setDatasQRY_KSV_ORDER_PIMST_BUYER_CD(data.BUYER_CD);
                setDataQRY_KSV_ORDER_PIMST_BUYER_CD(data.BUYER_CD[0]);

                setDatasQRY_KSV_ORDER_PIMST_STATUS_CD(data.STATUS_CD);
                setDataQRY_KSV_ORDER_PIMST_STATUS_CD(data.STATUS_CD[0]);

                setDatasEDT_KSV_PI_MST_CD(data.PI_ORIGIN);
                setDataEDT_KSV_PI_MST_CD(data.PI_ORIGIN[0]);

                setDatasEDT_KSV_PI_MST_LOADING_PORT(data.LOADING_PORT);
                setDataEDT_KSV_PI_MST_LOADING_PORT(data.LOADING_PORT[0]);

                setDatasEDT_KSV_PI_MST_DESTINATION(data.ORIGIN_PORT);
                setSavesEDT_KSV_PI_MST_DESTINATION(data.ORIGIN_PORT);
                setDataEDT_KSV_PI_MST_DESTINATION(data.ORIGIN_PORT[0]);

                setDatasEDT_KSV_PI_MST_TOLENCE(data.TOLENCE);
                setDataEDT_KSV_PI_MST_TOLENCE(data.TOLENCE[0]);

                setDatasEDT_KSV_PI_MST_PART_SHIP(data.PART_SHIP);
                setDataEDT_KSV_PI_MST_PART_SHIP(data.PART_SHIP[0]);

                setDatasEDT_KSV_PI_MST_TRANS_SHIP(data.TRANS_SHIP);
                setDataEDT_KSV_PI_MST_TRANS_SHIP(data.TRANS_SHIP[0]);

                var tEdtObj = { ...dataEDT_KSV_PI_MST };
                tEdtObj.REG_USER = tUserInfo.USER_ID;
                tEdtObj.REG_DATE = tRetDate1;
                tEdtObj.BUYER_CD = tBuyerCd;
                setDataEDT_KSV_PI_MST(tEdtObj);
            } else {
                console.log(
                    "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });

        // search_LIST_1();

        if (tOrderCds.length > 0) {
            search_LIST_2_2(tOrderCds);
        }
    }, []);

    // Support Area

    const changeDateVal = (argVal) => {
        if (argVal === "") return argVal;
        var tType = typeof argVal;
        if (tType !== "string") {
            // console.log(tType);
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
            var tEdtObj0 = { ...dataEDT_KSV_PI_MST };

            var tInObj = {};
            tInObj.PI_CD = tEdtObj0.PI_CD;
            tInObj.TITLE = "Profoma Invoice";
            tInObj.NAME = fileName;
            tInObj.URL = imgURL;
            tInObj.OBJECT_NAME = objectName;
            serviceS0205_PI_MANAGER.mgrInsert_FILE_INFO(tInObj).then((data) => {
                setLoadingTBL_KSV_ORDER_PIMST(false);
                if (typeof data.graphQLErrors === "undefined") {
                    if (data.length > 0) {
                        toast.current.show({
                            severity: "success",
                            summary: "Info",
                            detail: data[0].CODE,
                            life: 3000,
                        });
                        if (data[0].CODE.includes("SUCC")) {
                            var tEdtObj = { ...dataEDT_KSV_PI_MST };
                            tEdtObj.FILE_NAME = fileName;
                            tEdtObj.FILE_URL = imgURL;
                            tEdtObj.FILE_OBJECT = objectName;
                            setDataEDT_KSV_PI_MST(tEdtObj);
                        }
                    }
                } else {
                    toast.current.show({
                        severity: "success",
                        summary: "Info",
                        detail: "",
                        life: 3000,
                    });
                    console.log(
                        "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });
        } catch (err) {
            console.log(err);
        }
    };

    const onDownloadFile = () => {
        var tEdtObj = { ...dataEDT_KSV_PI_MST };
        if (tEdtObj.FILE_NAME !== "" && tEdtObj.FILE_URL !== "") {
            serviceLib.downloadFile(tEdtObj.FILE_URL, tEdtObj.FILE_NAME);
            // window.open(tEdtObj.FILE_URL);
        }
    };

    return (
        <div className="af-div-main">
            <div
                className="af-div-first"
                style={{ width: "123rem", height: "3rem" }}
            >
                <span className="af-span-3-0" style={{ width: "17rem" }}>
                    <p className="af-span-p" style={{ width: "6rem" }}>Buyer#</p>
                    <div className="af-span-div" style={{ width: "10rem" }}>
                        <Dropdown
                            filter
                            style={{ width: "10rem" }}
                            id="id_BUYER_CD"
                            value={dataQRY_KSV_ORDER_PIMST_BUYER_CD}
                            onChange={(e) =>
                                onDropdownChangeQRY_KSV_ORDER_PIMST_BUYER_CD(
                                    e,
                                    "BUYER_CD",
                                )
                            }
                            options={datasQRY_KSV_ORDER_PIMST_BUYER_CD}
                            optionLabel="BUYER_NAME"
                            placeholder=""
                            editable
                        ></Dropdown>
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "17rem" }}>
                    <p className="af-span-p" style={{ width: "6rem" }}>PI#</p>
                    <div className="af-span-div" style={{ width: "10rem" }}>
                        <InputText
                            style={{ width: "10rem" }}
                            id="id_PI_CD"
                            value={dataQRY_KSV_ORDER_PIMST.PI_CD}
                            onChange={(e) =>
                                onInputChangeQRY_KSV_ORDER_PIMST_PI_CD(
                                    e,
                                    "PI_CD",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "17rem" }}>
                    <p className="af-span-p" style={{ width: "6rem" }}>Status</p>
                    <div className="af-span-div" style={{ width: "10rem" }}>
                        <Dropdown
                            style={{ width: "10rem" }}
                            id="id_STATUS_CD"
                            value={dataQRY_KSV_ORDER_PIMST_STATUS_CD}
                            onChange={(e) =>
                                onDropdownChangeQRY_KSV_ORDER_PIMST_STATUS_CD(
                                    e,
                                    "STATUS_CD",
                                )
                            }
                            options={datasQRY_KSV_ORDER_PIMST_STATUS_CD}
                            optionLabel="CD_NAME"
                            placeholder=""
                            editable
                        ></Dropdown>
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "15rem" }}>
                    <p className="af-span-p" style={{ width: "6rem" }}>Reg Date</p>
                    <div className="af-span-div" style={{ width: "8rem" }}>
                        <Calendar
                            showButtonBar
                            style={{ width: "8rem" }}
                            dateFormat="yy-mm-dd"
                            id="id_S_REG_DATE"
                            value={changeDateVal(
                                dataQRY_KSV_ORDER_PIMST.S_REG_DATE,
                            )}
                            onChange={(e) =>
                                onCalChangeQRY_KSV_ORDER_PIMST_S_REG_DATE(
                                    e,
                                    "S_REG_DATE",
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
                            id="id_E_REG_DATE"
                            value={changeDateVal(
                                dataQRY_KSV_ORDER_PIMST.E_REG_DATE,
                            )}
                            onChange={(e) =>
                                onCalChangeQRY_KSV_ORDER_PIMST_E_REG_DATE(
                                    e,
                                    "E_REG_DATE",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "11rem" }}>
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
                            onClick={(e) => {
                                process_RESET();
                                search_LIST_1();
                            }}
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "11rem" }}>
                    <div className="af-span-div-btn" style={{ width: "10rem" }}>
                        <Button
                            label="Excel"
                            style={{ width: "10rem" }}
                            className="p-button-text green"
                            onClick={exportExcelTBL_KSV_ORDER_PIMST}
                        />
                    </div>
                </span>
            </div>
            <div
                className="af-div-first"
                style={{ width: "123rem", height: "30rem" }}
            >
                <AFDataTable preventUnrelatedRerender
                    loading={loadingTBL_KSV_ORDER_PIMST}
                    ref={dt_TBL_KSV_ORDER_PIMST}
                    size="small"
                    value={datasTBL_KSV_ORDER_PIMST}
                    resizableColumns
                    columnResizeMode="expand"
                    showGridlines
                    selectionMode="checkbox"
                    selection={selectedTBL_KSV_ORDER_PIMST}
                    onSelectionChange={(e) => {
                        setFlagSelectModeTBL_KSV_ORDER_PIMST(true);
                        setSelectedTBL_KSV_ORDER_PIMST(e.value);
                        console.log(
                            "selected length:" +
                                selectedTBL_KSV_ORDER_PIMST.length,
                        );
                        onRowClick1TBL_KSV_ORDER_PIMST(e.value);
                    }}
                    onRowClick={onRowClickTBL_KSV_ORDER_PIMST}
                    dataKey="id"
                    className="datatable-responsive"
                    virtualScrollerOptions={{ itemSize: 20 }}
                    emptyMessage=" "
                    // header={headerTBL_KSV_ORDER_PIMST}
                    responsiveLayout="scroll"
                    scrollable
                    scrollHeight="327px"
                >
                    <AFColumn field="STATUS_NAME" headerClassName="t-header" header="PI Status Name" className="af-col" style={{ windth: "5rem" }} ></AFColumn>
                    <AFColumn field="BUYER_NAME" headerClassName="t-header" header="Buyer" className="af-col" style={{ windth: "10rem" }} ></AFColumn>
                    <AFColumn field="REG_DATETIME" headerClassName="t-header" header="Reg Date" bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.dateFormat(rowData.REG_DATETIME) } className="af-col" style={{ windth: "6rem" }} ></AFColumn>
                    <AFColumn field="PI_CD" headerClassName="t-header" header="PI#" className="af-col" style={{ windth: "6rem" }} ></AFColumn>
                    <AFColumn field="QTY" headerClassName="t-header" header="Qty" bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.QTY) } className="af-col" style={{ windth: "6rem" }} ></AFColumn>
                    <AFColumn field="AMT" headerClassName="t-header" header="Amt($)" bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.AMT, 2) } className="af-col" style={{ windth: "6rem" }} ></AFColumn>
                    <AFColumn field="REG_USER" headerClassName="t-header" header="User" className="af-col" style={{ windth: "6rem" }} ></AFColumn>
                    <AFColumn field="File" headerClassName="t-header" header="File" className="af-col" style={{ windth: "10rem" }} ></AFColumn>
                    <AFColumn field="STATUS_CD" headerClassName="t-header" header="PI Status CD" className="af-col" style={{ windth: "4rem" }} ></AFColumn>
                    <AFColumn field="BUYER_CD" headerClassName="t-header" header="Buyer CD" className="af-col" style={{ windth: "6rem" }} ></AFColumn>
                    <AFColumn field="DE" headerClassName="t-header" header="Buyer CD" className="af-col" style={{ windth: "6rem" }} ></AFColumn>
                </AFDataTable>
            </div>

            <div
                className="af-div-first"
                style={{ width: "123rem", height: "10rem" }}
            >
                <span className="af-span-3-0" style={{ width: "19rem" }}>
                    <p className="af-span-p" style={{ width: "8rem" }}>Buyer#</p>
                    <div className="af-span-div" style={{ width: "10rem" }}>
                        <InputText
                            disabled
                            style={{ width: "10rem" }}
                            id="id_TARGET_ETA"
                            value={dataEDT_KSV_PI_MST.BUYER_CD}
                            onChange={(e) =>
                                onInputChangeEDT_KSV_PI_MST_BUYER_CD(
                                    e,
                                    "BUYER_CD",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "19rem" }}>
                    <p className="af-span-p" style={{ width: "8rem" }}>PI#</p>
                    <div className="af-span-div" style={{ width: "10rem" }}>
                        <InputText
                            disabled
                            style={{ width: "10rem" }}
                            id="id_TARGET_ETA"
                            value={dataEDT_KSV_PI_MST.PI_CD}
                            onChange={(e) =>
                                onInputChangeEDT_KSV_PI_MST_PI_CD(e, "PI_CD")
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "19rem" }}>
                    <p className="af-span-p" style={{ width: "8rem" }}>C/O</p>
                    <div className="af-span-div" style={{ width: "10rem" }}>
                        <Dropdown
                            style={{ width: "10rem" }}
                            id="id_CD"
                            value={dataEDT_KSV_PI_MST_CD}
                            onChange={(e) =>
                                onDropdownChangeEDT_KSV_PI_MST_CD(e, "CD")
                            }
                            options={datasEDT_KSV_PI_MST_CD}
                            optionLabel="CD_NAME"
                            placeholder=""
                            editable
                        ></Dropdown>
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "38rem" }}>
                    <p className="af-span-p" style={{ width: "8rem" }}>Loading Port</p>
                    <div className="af-span-div" style={{ width: "29rem" }}>
                        <Dropdown
                            style={{ width: "29rem" }}
                            id="id_CD"
                            value={dataEDT_KSV_PI_MST_LOADING_PORT}
                            onChange={(e) =>
                                onDropdownChangeEDT_KSV_PI_MST_LOADING_PORT(
                                    e,
                                    "LOADING_PORT",
                                )
                            }
                            options={datasEDT_KSV_PI_MST_LOADING_PORT}
                            optionLabel="CD_NAME"
                            placeholder=""
                            editable
                        ></Dropdown>
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "11rem" }}>
                    <div className="af-span-div-btn" style={{ width: "10rem" }}>
                        <Button
                            label="Save"
                            style={{ width: "10rem" }}
                            className="p-button-text"
                            onClick={process_INSERT_PI}
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "11rem" }}>
                    <div className="af-span-div-btn" style={{ width: "10rem" }}>
                        <Button
                            label="Export PI"
                            style={{ width: "10rem" }}
                            className="p-button-text green"
                            onClick={search_EXCEL_PI_PRINT}
                        />
                    </div>
                </span>

                <span className="af-span-3" style={{ width: "19rem" }}>
                    <p className="af-span-p" style={{ width: "8rem" }}>Reg User</p>
                    <div className="af-span-div" style={{ width: "10rem" }}>
                        <InputText
                            disabled
                            style={{ width: "10rem" }}
                            id="id_TARGET_ETA"
                            value={dataEDT_KSV_PI_MST.REG_USER}
                            onChange={(e) =>
                                onInputChangeEDT_KSV_PI_MST_REG_USER(
                                    e,
                                    "REG_USER",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "19rem" }}>
                    <p className="af-span-p" style={{ width: "8rem" }}>Reg Date</p>
                    <div className="af-span-div" style={{ width: "10rem" }}>
                        <Calendar
                            showButtonBar
                            style={{ width: "10rem" }}
                            dateFormat="yy-mm-dd"
                            id="id_S_PO_DATE"
                            value={changeDateVal(dataEDT_KSV_PI_MST.REG_DATE)}
                            onChange={(e) =>
                                onCalChangeEDT_KSV_PI_MST_REG_DATE(
                                    e,
                                    "REG_DATE",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "19rem" }}>
                    <p className="af-span-p" style={{ width: "8rem" }}>Part Ship</p>
                    <div className="af-span-div" style={{ width: "10rem" }}>
                        <Dropdown
                            style={{ width: "10rem" }}
                            id="id_PART_SHIP"
                            value={dataEDT_KSV_PI_MST_PART_SHIP}
                            onChange={(e) =>
                                onDropdownChangeEDT_KSV_PI_MST_PART_SHIP(
                                    e,
                                    "PART_SHIP",
                                )
                            }
                            options={datasEDT_KSV_PI_MST_PART_SHIP}
                            optionLabel="CD_NAME"
                            placeholder=""
                            editable
                        ></Dropdown>
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "38rem" }}>
                    <p className="af-span-p" style={{ width: "8rem" }}>Destination</p>
                    <div className="af-span-div" style={{ width: "29rem" }}>
                        <Dropdown
                            style={{ width: "29rem" }}
                            id="id_CD"
                            value={dataEDT_KSV_PI_MST_DESTINATION}
                            onChange={(e) =>
                                onDropdownChangeEDT_KSV_PI_MST_DESTINATION(
                                    e,
                                    "DESTINATION",
                                )
                            }
                            options={datasEDT_KSV_PI_MST_DESTINATION}
                            optionLabel="CD_NAME"
                            placeholder=""
                            editable
                        ></Dropdown>
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "11rem" }}>
                    <div className="af-span-div-btn" style={{ width: "10rem" }}>
                        <Button
                            label="Delete"
                            style={{ width: "10rem" }}
                            className="p-button-text"
                            onClick={process_DELETE_PI}
                        />
                    </div>
                </span>

                <span className="af-span-3" style={{ width: "19rem" }}>
                    <p className="af-span-p" style={{ width: "8rem" }}>Trans Ship</p>
                    <div className="af-span-div" style={{ width: "10rem" }}>
                        <Dropdown
                            style={{ width: "10rem" }}
                            id="id_TRANS_SHIP"
                            value={dataEDT_KSV_PI_MST_TRANS_SHIP}
                            onChange={(e) =>
                                onDropdownChangeEDT_KSV_PI_MST_TRANS_SHIP(
                                    e,
                                    "TRANS_SHIP",
                                )
                            }
                            options={datasEDT_KSV_PI_MST_TRANS_SHIP}
                            optionLabel="CD_NAME"
                            placeholder=""
                            editable
                        ></Dropdown>
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "38.5rem" }}>
                    <p className="af-span-p" style={{ width: "8rem" }}>Tolerance</p>
                    <div className="af-span-div" style={{ width: "29.5rem" }}>
                        <Dropdown
                            style={{ width: "29.5rem" }}
                            id="id_TOLENCE"
                            value={dataEDT_KSV_PI_MST_TOLENCE}
                            onChange={(e) =>
                                onDropdownChangeEDT_KSV_PI_MST_TOLENCE(
                                    e,
                                    "TOLENCE",
                                )
                            }
                            options={datasEDT_KSV_PI_MST_TOLENCE}
                            optionLabel="CD_NAME"
                            placeholder=""
                            editable
                        ></Dropdown>
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "38rem" }}>
                    <p className="af-span-p" style={{ width: "8rem" }}>PI File</p>
                    <div className="af-span-div-btn" style={{ width: "8rem" }}>
                        <button>
                            <label className="inputFileCustom" for="inputFile">
                                File Upload
                            </label>
                        </button>
                        <input
                            type="file"
                            id="inputFile"
                            onChange={s3FileUpload}
                            style={{ display: "none" }}
                        />
                    </div>
                    <div className="af-span-div" style={{ width: "10rem" }}>
                        <InputText
                            style={{ width: "10rem" }}
                            id="id_TARGET_ETA"
                            value={dataEDT_KSV_PI_MST.FILE_NAME}
                            onChange={(e) =>
                                onInputChangeEDT_KSV_PI_MST_FILE_NAME(
                                    e,
                                    "FILE_NAME",
                                )
                            }
                        />
                    </div>
                    <div className="af-span-div-btn" style={{ width: "8rem" }}>
                        <Button
                            style={{ width: "8rem" }}
                            label="Download"
                            className="p-button-text"
                            onClick={onDownloadFile}
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "11rem" }}>
                    <div className="af-span-div-btn" style={{ width: "10rem" }}>
                        <Button
                            label="Remove Order"
                            style={{ width: "10rem" }}
                            className="p-button-text"
                            onClick={process_REMOVE_ORDER}
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "11rem" }}>
                    <div className="af-span-div-btn" style={{ width: "10rem" }}>
                        <Button
                            label="Add Order"
                            style={{ width: "10rem" }}
                            className="p-button-text orange"
                            onClick={process_ADD_ORDER}
                        />
                    </div>
                </span>

                <span className="af-span-3" style={{ width: "19rem" }}>
                    <p className="af-span-p" style={{ width: "8rem" }}> </p>
                </span>
                <span className="af-span-3" style={{ width: "38.5rem" }}>
                    <p className="af-span-p" style={{ width: "8rem" }}> </p>
                    <div className="af-span-div" style={{ width: "29.5rem" }}>
                        <InputText
                            style={{ width: "29.5rem" }}
                            disabled={isTOLENCE_ETC}
                            id="id_TARGET_ETA"
                            value={dataEDT_KSV_PI_MST.TOLENCE_ETC}
                            onChange={(e) =>
                                onInputChangeEDT_KSV_PI_MST_TOLENCE_ETC(
                                    e,
                                    "TOLENCE_ETC",
                                )
                            }
                        />
                    </div>
                </span>
            </div>

            <div
                className="af-div-first"
                style={{ width: "123rem", height: "17rem" }}
            >
                <AFDataTable preventUnrelatedRerender
                    tableStyle={{ tableLayout: "fixed" }}
                    loading={loadingTBL_KSV_ORDER_PIMST2}
                    ref={dt_TBL_KSV_ORDER_PIMST2}
                    size="small"
                    value={datasTBL_KSV_ORDER_PIMST2}
                    resizableColumns
                    columnResizeMode="expand"
                    showGridlines
                    selectionMode="checkbox"
                    selection={selectedTBL_KSV_ORDER_PIMST2}
                    onSelectionChange={(e) => {
                        setFlagSelectModeTBL_KSV_ORDER_PIMST2(true);
                        setSelectedTBL_KSV_ORDER_PIMST2(e.value);
                        console.log(
                            "selected length:" +
                                selectedTBL_KSV_ORDER_PIMST2.length,
                        );
                        onRowClick1TBL_KSV_ORDER_PIMST2(e.value);
                    }}
                    onRowClick={onRowClickTBL_KSV_ORDER_PIMST2}
                    dataKey="id"
                    className="datatable-responsive"
                    virtualScrollerOptions={{ itemSize: 20 }}
                    emptyMessage=" "
                    // header={headerTBL_KSV_ORDER_PIMST}
                    responsiveLayout="scroll"
                    scrollable
                    scrollHeight="185px"
                >
                    <AFColumn field="REF_ORDER_NO" headerClassName="t-header" header="Buyer.Po" className="af-col" style={{ windth: "7rem" }} ></AFColumn>
                    <AFColumn field="PO_CD" headerClassName="t-header" header="PO#" className="af-col" style={{ windth: "6rem" }} ></AFColumn>
                    <AFColumn field="ORDER_CD" headerClassName="t-header" header="ORDER#" className="af-col" style={{ windth: "7rem" }} ></AFColumn>
                    <AFColumn field="STYLE_NAME" headerClassName="t-header" header="Style" className="af-col" style={{ windth: "10rem" }} ></AFColumn>
                    <AFColumn field="TOT_CNT" headerClassName="t-header" header="Qty" bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.TOT_CNT) } className="af-col" style={{ windth: "6rem" }} ></AFColumn>
                    <AFColumn field="UNIT" headerClassName="t-header" header="Unit" className="af-col" style={{ windth: "4rem" }} ></AFColumn>
                    <AFColumn field="PRICE_TERM" headerClassName="t-header" header="Term" className="af-col" style={{ windth: "4rem" }} ></AFColumn>
                    <AFColumn field="AVR_PRICE" headerClassName="t-header" header="U.Price" bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.AVR_PRICE, 4) } className="af-col" style={{ windth: "6rem" }} ></AFColumn>
                    <AFColumn field="AMT" headerClassName="t-header" header="Amt" bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.AMT, 2) } className="af-col" style={{ windth: "6rem" }} ></AFColumn>
                    <AFColumn field="CURR_CD" headerClassName="t-header" header="Curr" className="af-col" style={{ windth: "4rem" }} ></AFColumn>
                    <AFColumn field="DUE_DATE" headerClassName="t-header" header="ETD" body={(rowData) => serviceLib.dateFormat(rowData.DUE_DATE) } className="af-col" style={{ windth: "6rem" }} ></AFColumn>
                    <AFColumn field="STYLE_CD" headerClassName="t-header" header="Style#" className="af-col" style={{ windth: "4rem" }} ></AFColumn>
                    <AFColumn field="NAT_NAME" headerClassName="t-header" header="Country" className="af-col" style={{ windth: "8rem" }} ></AFColumn>
                </AFDataTable>
            </div>

            <Dialog
                visible={isAddOrder}
                position="mid-center"
                style={{ width: "100vw" }}
                header="주문조회"
                modal={true}
                className="p-fluid"
                onHide={hideDialog}
            >
                <div
                    className="af-div-first"
                    style={{ width: "120rem", height: "3rem" }}
                >
                    <span className="af-span-3-0" style={{ width: "17rem" }}>
                        <p className="af-span-p" style={{ width: "6rem" }}>Buyer#</p>
                        <div className="af-span-div" style={{ width: "10rem" }}>
                            <InputText
                                style={{ width: "10rem" }}
                                id="id_PI_CD"
                                value={dataQRY_KSV_ORDER_PIMST2.ORDER_CD}
                                onChange={(e) =>
                                    onInputChangeQRY_KSV_ORDER_PIMST2_ORDER_CD(
                                        e,
                                        "ORDER_CD",
                                    )
                                }
                            />
                        </div>
                    </span>
                    <span className="af-span-3-0" style={{ width: "11rem" }}>
                        <div
                            className="af-span-div-btn"
                            style={{ width: "10rem" }}
                        >
                            <Button
                                label="Search"
                                style={{ width: "10rem" }}
                                className="p-button-text"
                                onClick={process_SEARCH_ADD_ORDER}
                            />
                        </div>
                    </span>
                    <span className="af-span-3-0" style={{ width: "11rem" }}>
                        <div
                            className="af-span-div-btn"
                            style={{ width: "10rem" }}
                        >
                            <Button
                                label="Apply"
                                style={{ width: "10rem" }}
                                className="p-button-text"
                                onClick={process_APPLY_ADD_ORDER}
                            />
                        </div>
                    </span>
                    <span className="af-span-3-0" style={{ width: "11rem" }}>
                        <div
                            className="af-span-div-btn"
                            style={{ width: "10rem" }}
                        >
                            <Button
                                label="Cancel"
                                style={{ width: "10rem" }}
                                className="p-button-text"
                                onClick={process_CANCEL_ADD_ORDER}
                            />
                        </div>
                    </span>
                </div>
                <div
                    className="af-div-first"
                    style={{ width: "120rem", height: "50rem" }}
                >
                    <AFDataTable preventUnrelatedRerender
                        metaKeySelection={false}
                        tableStyle={{ tableLayout: "fixed" }}
                        showGridlines
                        selectionMode="multiple"
                        loading={loadingTBL_KSV_ORDER_PIMST3}
                        ref={dt_TBL_KSV_ORDER_PIMST3}
                        size="small"
                        value={datasTBL_KSV_ORDER_PIMST3}
                        resizableColumns
                        columnResizeMode="expand"
                        selection={selectedTBL_KSV_ORDER_PIMST3}
                        onSelectionChange={(e) => {
                            setFlagSelectModeTBL_KSV_ORDER_PIMST3(true);
                            setSelectedTBL_KSV_ORDER_PIMST3(e.value);
                            console.log(
                                "selected length:" +
                                    selectedTBL_KSV_ORDER_PIMST3.length,
                            );
                            onRowClick1TBL_KSV_ORDER_PIMST3(e.value);
                        }}
                        onRowClick={onRowClickTBL_KSV_ORDER_PIMST3}
                        dataKey="id"
                        className="datatable-responsive"
                        virtualScrollerOptions={{ itemSize: 20 }}
                        emptyMessage=" "
                        // header={headerTBL_KSV_ORDER_PIMST}
                        responsiveLayout="scroll"
                        scrollable
                        scrollHeight="50rem"
                    >
                        <AFColumn field="REF_ORDER_NO" headerClassName="t-header" header="Buyer.Po" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                        <AFColumn field="PO_CD" headerClassName="t-header" header="PO#" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                        <AFColumn field="BUYER_NAME" headerClassName="t-header" header="Buyer" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                        <AFColumn field="ORDER_CD" headerClassName="t-header" header="ORDER#" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                        <AFColumn field="STYLE_NAME" headerClassName="t-header" header="Style" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                        <AFColumn field="TOT_CNT" headerClassName="t-header" header="Qty" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.TOT_CNT, 0) } ></AFColumn>
                        <AFColumn field="UNIT" headerClassName="t-header" header="Unit" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                        <AFColumn field="PRICE_TERM" headerClassName="t-header" header="Term" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                        <AFColumn field="AVR_PRICE" headerClassName="t-header" header="U.Price" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.AMT, 2) } ></AFColumn>
                        <AFColumn field="AMT" headerClassName="t-header" header="Amt" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.AMT, 2) } ></AFColumn>
                        <AFColumn field="CURR_CD" headerClassName="t-header" header="Curr" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                        <AFColumn field="DUE_DATE" headerClassName="t-header" header="ETD" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} body={(rowData) => serviceLib.dateFormat(rowData.DUE_DATE) } ></AFColumn>
                        <AFColumn field="STYLE_CD" headerClassName="t-header" header="Style#" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    </AFDataTable>
                </div>
            </Dialog>
            <Toast ref={toast} />
        </div>
    );
};

const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(S0205_PI_MANAGER, comparisonFn);
