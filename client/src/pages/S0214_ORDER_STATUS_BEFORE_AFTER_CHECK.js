/* eslint-disable */
import React, { useCallback, useState, useEffect, useRef } from "react";
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
import axios from "axios";

import { ServiceLib } from "../service/service_lib/ServiceLib";
import { ServiceS0214_ORDER_STATUS_BEFORE_AFTER_CHECK } from "../service/service_biz/ServiceS0214_ORDER_STATUS_BEFORE_AFTER_CHECK";
import { ServiceS0204_ORDER_LIST } from "../service/service_biz/ServiceS0204_ORDER_LIST";

// import './page_common.scss';

const moment = require("moment");

const emptyKCD_CODE = {
    id: 0,
    CD_GROUP: "",
    CD_CODE: "",
    CD_NAME: "",
    CD_FLAG: "",
};

const emptyQRY_KSV_ORDER_MST = {
    SHIPDATE_FLAG: "1",
    S_SHIP_DATE: "",
    E_SHIP_DATE: "",
    ORDER_CD: "",
    BUYER_CD: "",
    PARTIAL_SHIP_FLAG: "1",
    END_REPORT_FLAG: "1",
    END_FLAG: "",
};

const emptyTBL_KSV_ORDER_MST = {
    id: 0,
    ORDER_CD: "",
    STYLE_NAME: "",
    STYLE_CD: "",
    TOT_CNT: "",
    SHIP_CNT: "",
    FOB_PRICE: "",
    USD_PRICE: "",
    ORDER_AMT: "",
    SHIP_DATE: "",
    SHIP_DATE: "",
    MATL_AMT: "",
    CMPT: "",
    ETC: "",
    COST: "",
    PROFIT: "",
    TOTAL_COST: "",
    REMARK: "",
    END: "",
};

const S0214_ORDER_STATUS_BEFORE_AFTER_CHECK = () => {
    const serviceLibRef = useRef(null);
    if (!serviceLibRef.current) {
        serviceLibRef.current = new ServiceLib();
        serviceLibRef.current.loginConfirm();
    }
    const serviceLib = serviceLibRef.current;
    const serviceS0214_ORDER_STATUS_BEFORE_AFTER_CHECK =
        new ServiceS0214_ORDER_STATUS_BEFORE_AFTER_CHECK();
    const serviceS0204_ORDER_LISTRef = useRef(null);
    if (!serviceS0204_ORDER_LISTRef.current) serviceS0204_ORDER_LISTRef.current = new ServiceS0204_ORDER_LIST();
    const serviceS0204_ORDER_LIST = serviceS0204_ORDER_LISTRef.current;

    const toast = useRef(null);

    /* splitter 관련 */
    const [styleVal, setStyleVal] = useState({ width: "65vw" });

    const [saveLIST_1, setSaveLIST_1] = useState([]);

    const search_LIST_1 = () => {
        var tObj = { ...dataQRY_KSV_ORDER_MST };
        tObj.SHIPDATE_FLAG = '1';
        tObj.REPORT_KIND = '';
        console.log(tObj);

        if (
            tObj.ORDER_CD === "" &&
            tObj.BUYER_CD === "" &&
            tObj.S_SHIP_DATE === ""
        ) {
            alert("Order, Buyer, 시작일자중 하나는 입력해야 합니다<br><br>One of Order, Buyer, and Start Date must be entered.");
            return;
        }

        setLoadingTBL_KSV_ORDER_MST(true);
        setDatasTBL_KSV_ORDER_MST([]);
        setSelectedTBL_KSV_ORDER_MST([]);

        serviceS0214_ORDER_STATUS_BEFORE_AFTER_CHECK
            .mgrQueryTBL_KSV_ORDER_MST(tObj)
            .then((data) => {
                setLoadingTBL_KSV_ORDER_MST(false);
                if (typeof data.graphQLErrors === "undefined") {
                    if (typeof data.datas !== "undefined") {
                        var tArray = [];
                        data.datas.forEach((col, i) => {
                            var tObj = { ...col };
                            tObj.id = i + 1;
                            if (tObj.ORDER_CD === "") tObj.SHIP_DATE = "";
                            tArray.push(tObj);
                        });
                        setSaveLIST_1(tArray);
                        setDatasTBL_KSV_ORDER_MST(tArray);
                    }
                } else {
                    // var tStr = data.graphQLErrors[0].message;
                    console.log(
                        "ServiceNawooAll.mgrQueryTBL_KSV_ORDER_MST_CODE()error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });
    };

    const process_RESET = () => {
        setDataQRY_KSV_ORDER_MST(emptyQRY_KSV_ORDER_MST);
        setDataQRY_KSV_ORDER_MST_BUYER_CD(datasQRY_KSV_ORDER_MST_BUYER_CD[0]);
        setDatasTBL_KSV_ORDER_MST([]);
    };

    const process_END_ORDER = () => {
        if (selectedTBL_KSV_ORDER_MST.length < 1) {
            alert("작업할 데이타를 선택하세요<br><br>Choose the data you want to work with");
            return;
        }

        var tInObj = [];
        var tFlag1 = 0;
        var tFlag2 = 0;
        var tFlag3 = 0;
        for (let tObj of selectedTBL_KSV_ORDER_MST) {
            if (tObj.STATUS === "") {
                continue;
            }

            //if (tObj.KIND !== 'After') tFlag3 = 1;
            if (tObj.ORDER_STATUS !== "8") tFlag1 = 1;
            if (tObj.ORDER_STATUS === "5" || tObj.ORDER_STATUS === "9")
                tFlag2 = 1;

            tInObj.push({ ORDER_CD: tObj.ORDER_CD });
        }

        console.log(tInObj);

        if (tFlag3 === 1) {
            alert("Order Cd가 있는 행을 선택해 주세요<br><br>Please select the row with Order Cd");
            return;
        }

        if (tFlag2 === 1) {
            alert("END/Partial Ship은 Order End가 안됩니다<br><br>Order End is not possible for END/Partial Ship.");
            return;
        }

        if (tFlag1 === 1) {
            alert("END Report된 Order 만 End 가능합니다<br><br>Only orders with an END report can be ended.");
            return;
        }

        setLoadingTBL_KSV_ORDER_MST(true);
        serviceS0204_ORDER_LIST.mgrUpdate_END_ORDER(tInObj).then((data) => {
            setLoadingTBL_KSV_ORDER_MST(false);
            if (typeof data.graphQLErrors === "undefined") {
                if (data.length > 0 && data[0].CODE.includes("SUCC")) {
                    toast.current.show({
                        severity: "success",
                        summary: "SUCCEED: Delete Order",
                        detail: data[0].CODE,
                        life: 3000,
                    });
                } else {
                    toast.current.show({
                        severity: "success",
                        summary: "FAILED: Delete Order",
                        detail: data[0].CODE,
                        life: 3000,
                    });
                }
                // search_ORDER_LIST();
            } else {
                toast.current.show({
                    severity: "success",
                    summary: "FAILED: Delete Order",
                    detail: "fatal error",
                    life: 3000,
                });
            }
        });
    };

    const process_END_ORDER_CANCEL = () => {
        if (selectedTBL_KSV_ORDER_MST.length <= 0) return;

        var tInObj = [];
        var tFlag1 = 0;
        var tFlag2 = 0;
        var tFlag3 = 0;

        for (let tObj of selectedTBL_KSV_ORDER_MST) {
            if (tObj.STATUS === "") {
                continue;
            }

            if (tObj.KIND !== "After") tFlag3 = 1;
            if (tObj.ORDER_STATUS !== "9") tFlag1 = 1;

            tInObj.push({ ORDER_CD: tObj.ORDER_CD });
        }

        if (tFlag3 === 1) {
            alert("Order Cd가 있는 행을 선택해 주세요<br><br>Please select the row with Order Cd");
            return;
        }

        if (tFlag1 === 1) {
            alert("END된 Order 만 End Cancel 가능합니다<br><br>Only ENDed orders can be End Cancelled.");
            return;
        }

        setLoadingTBL_KSV_ORDER_MST(true);
        serviceS0204_ORDER_LIST
            .mgrUpdate_END_ORDER_CANCEL(tInObj)
            .then((data) => {
                setLoadingTBL_KSV_ORDER_MST(false);
                if (typeof data.graphQLErrors === "undefined") {
                    if (data.length > 0 && data[0].CODE.includes("SUCC")) {
                        toast.current.show({
                            severity: "success",
                            summary: "SUCCEED: Delete Order",
                            detail: data[0].CODE,
                            life: 3000,
                        });
                    } else {
                        toast.current.show({
                            severity: "success",
                            summary: "FAILED: Delete Order",
                            detail: data[0].CODE,
                            life: 3000,
                        });
                    }
                    // search_ORDER_LIST();
                } else {
                    toast.current.show({
                        severity: "success",
                        summary: "FAILED: Delete Order",
                        detail: "fatal error",
                        life: 3000,
                    });
                }
            });
    };

    const process_EXCEL_END_REPORT = () => {
        var tObj = { ...dataQRY_KSV_ORDER_MST };

        if (
            tObj.ORDER_CD === "" &&
            tObj.BUYER_CD === "" &&
            tObj.S_SHIP_DATE === ""
        ) {
            alert("시작일자를 입력해야 합니다<br><br>You must enter a start date");
            return;
        }

        setLoadingTBL_KSV_ORDER_MST(true);
        setDatasTBL_KSV_ORDER_MST([]);
        setSelectedTBL_KSV_ORDER_MST([]);

        tObj.SHIPDATE_FLAG = '1';
        tObj.PARTIAL_SHIP_FLAG = '0';
        tObj.END_REPORT_FLAG = '1';
        tObj.END_FLAG = '0';
        tObj.REPORT_KIND = 'END_REPORT';

        serviceS0214_ORDER_STATUS_BEFORE_AFTER_CHECK
            .mgrQueryTBL_KSV_ORDER_MST(tObj)
            .then((data) => {
                setLoadingTBL_KSV_ORDER_MST(false);
                if (typeof data.graphQLErrors === "undefined") {
                    if (typeof data.datas !== "undefined") {
                        var tArray = [];
                        data.datas.forEach((col, i) => {
                            var tObj = { ...col };
                            tObj.id = i + 1;
                            tArray.push(tObj);
                        });
                        setDatasTBL_KSV_ORDER_MST(tArray);

                        if (data.FILE_URL) {
                            serviceLib.downloadFile(
                                data.FILE_URL,
                                data.FILE_NAME || `${data.filename || "S0214"}.xlsx`,
                            );
                        } else if (data.filename !== "") {
                            var tFileName = `${data.filename}.xlsx`;
                            let _url1 = `${window.location.protocol}//${window.location.hostname}:3202/restapi/`;
                            var tUrl = `${_url1}filedown/excel/${tFileName}`;
                            console.log(tUrl);
                            window.open(tUrl);
                        }
                    }
                } else {
                    // var tStr = data.graphQLErrors[0].message;
                    console.log(
                        "ServiceNawooAll.mgrQueryTBL_KSV_ORDER_MST_CODE()error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });
    };

    const process_EXCEL = () => {
        var tObj = { ...dataQRY_KSV_ORDER_MST };

        if (
            tObj.ORDER_CD === "" &&
            tObj.BUYER_CD === "" &&
            tObj.S_SHIP_DATE === ""
        ) {
            alert("시작일자를 입력해야 합니다<br><br>You must enter a start date");
            return;
        }

        setLoadingTBL_KSV_ORDER_MST(true);
        setDatasTBL_KSV_ORDER_MST([]);
        setSelectedTBL_KSV_ORDER_MST([]);

        tObj.SHIPDATE_FLAG = '1';
        tObj.REPORT_KIND = 'EXCEL';

        serviceS0214_ORDER_STATUS_BEFORE_AFTER_CHECK
            .mgrQueryTBL_KSV_ORDER_MST(tObj)
            .then((data) => {
                setLoadingTBL_KSV_ORDER_MST(false);
                if (typeof data.graphQLErrors === "undefined") {
                    if (typeof data.datas !== "undefined") {
                        var tArray = [];
                        data.datas.forEach((col, i) => {
                            var tObj = { ...col };
                            tObj.id = i + 1;
                            tArray.push(tObj);
                        });
                        setDatasTBL_KSV_ORDER_MST(tArray);

                        if (data.FILE_URL) {
                            serviceLib.downloadFile(
                                data.FILE_URL,
                                data.FILE_NAME || `${data.filename || "S0214"}.xlsx`,
                            );
                        } else if (data.filename !== "") {
                            var tFileName = `${data.filename}.xlsx`;
                            let _url1 = `${window.location.protocol}//${window.location.hostname}:3202/restapi/`;
                            var tUrl = `${_url1}filedown/excel/${tFileName}`;
                            console.log(tUrl);
                            window.open(tUrl);
                        }
                    }
                } else {
                    // var tStr = data.graphQLErrors[0].message;
                    console.log(
                        "ServiceNawooAll.mgrQueryTBL_KSV_ORDER_MST_CODE()error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });
    };

    const process_EXCEL_PARTIAL = () => {
        var tObj = { ...dataQRY_KSV_ORDER_MST };

        if (
            tObj.ORDER_CD === "" &&
            tObj.BUYER_CD === "" &&
            tObj.S_SHIP_DATE === ""
        ) {
            alert("시작일자를 입력해야 합니다<br><br>You must enter a start date");
            return;
        }

        setLoadingTBL_KSV_ORDER_MST(true);
        setDatasTBL_KSV_ORDER_MST([]);
        setSelectedTBL_KSV_ORDER_MST([]);

        tObj.SHIPDATE_FLAG = '1';
        tObj.PARTIAL_SHIP_FLAG = '1';
        tObj.END_REPORT_FLAG = '0';
        tObj.END_FLAG = '0';
        tObj.REPORT_KIND = 'PARTIAL';

        serviceS0214_ORDER_STATUS_BEFORE_AFTER_CHECK
            .mgrQueryTBL_KSV_ORDER_MST(tObj)
            .then((data) => {
                setLoadingTBL_KSV_ORDER_MST(false);
                if (typeof data.graphQLErrors === "undefined") {
                    if (typeof data.datas !== "undefined") {
                        var tArray = [];
                        data.datas.forEach((col, i) => {
                            var tObj = { ...col };
                            tObj.id = i + 1;
                            tArray.push(tObj);
                        });
                        setDatasTBL_KSV_ORDER_MST(tArray);

                        if (data.FILE_URL) {
                            serviceLib.downloadFile(
                                data.FILE_URL,
                                data.FILE_NAME || `${data.filename || "S0214"}.xlsx`,
                            );
                        } else if (data.filename !== "") {
                            var tFileName = `${data.filename}.xlsx`;
                            let _url1 = `${window.location.protocol}//${window.location.hostname}:3202/restapi/`;
                            var tUrl = `${_url1}filedown/excel/${tFileName}`;
                            console.log(tUrl);
                            window.open(tUrl);
                        }
                    }
                } else {
                    // var tStr = data.graphQLErrors[0].message;
                    console.log(
                        "ServiceNawooAll.mgrQueryTBL_KSV_ORDER_MST_CODE()error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });
    };

    const process_EXCEL_REPORT5 = () => {
        var tObj = { ...dataQRY_KSV_ORDER_MST };

        if (
            tObj.ORDER_CD === "" &&
            tObj.BUYER_CD === "" &&
            tObj.S_SHIP_DATE === ""
        ) {
            alert("시작일자를 입력해야 합니다<br><br>You must enter a start date");
            return;
        }

        setLoadingTBL_KSV_ORDER_MST(true);
        // setDatasTBL_KSV_ORDER_MST([]);
        // setSelectedTBL_KSV_ORDER_MST([]);

        serviceS0214_ORDER_STATUS_BEFORE_AFTER_CHECK
            .mgrQuery_EXCEL_REPORT5(tObj)
            .then((data) => {
                setLoadingTBL_KSV_ORDER_MST(false);
                if (typeof data.graphQLErrors === "undefined") {
                    if (data.length > 0) {
                        if (data[0].CODE.includes("SUCC")) {
                            toast.current.show({
                                severity: "success",
                                summary: "Success Order Sheet",
                                detail: data[0].CODE,
                                life: 3000,
                            });
                            console.log(
                                "Order Sheet Succeed => " + data[0].CODE,
                            );

                            if (data[0].URL) {
                                serviceLib.downloadFile(
                                    data[0].URL,
                                    data[0].FILE_NAME || "S0214_REPORT.xlsx",
                                );
                            } else {
                                downloadFile(data[0].CODE);
                            }
                        }
                    }
                } else {
                    // var tStr = data.graphQLErrors[0].message;
                    console.log(
                        "ServiceNawooAll.mgrQueryTBL_KSV_ORDER_MST_CODE()error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });
    };

    const downloadFile = async (data) => {
        const fileUrl = data.split("?")[2].toString();
        const fileName = data.split("?")[1].toString();

        serviceLib.downloadFile(fileUrl, fileName);
    };

    /* QRY KSV_ORDER_MST*/

    const [dataQRY_KSV_ORDER_MST, setDataQRY_KSV_ORDER_MST] = useState(
        emptyQRY_KSV_ORDER_MST,
    );

    const onCheckboxChangeQRY_KSV_ORDER_MST_SHIPDATE_FLAG = (e, name) => {
        let val = "";
        let _dataQRY_KSV_ORDER_MST = { ...dataQRY_KSV_ORDER_MST };
        if (e.checked) {
            val = "1";
        } else {
            val = "0";
        }
        _dataQRY_KSV_ORDER_MST[`${name}`] = val;
        setDataQRY_KSV_ORDER_MST(_dataQRY_KSV_ORDER_MST);
    };

    const onCalChangeQRY_KSV_ORDER_MST_S_SHIP_DATE = (e, name) => {
        let val1 = e.value || "";
        let val = "";
        if (val1 === "") {
            val = "";
        } else {
            val = getDateVal(val1);
        }

        let _dataQRY_KSV_ORDER_MST = { ...dataQRY_KSV_ORDER_MST };
        _dataQRY_KSV_ORDER_MST[`${name}`] = val;
        setDataQRY_KSV_ORDER_MST(_dataQRY_KSV_ORDER_MST);
    };

    const onCalChangeQRY_KSV_ORDER_MST_E_SHIP_DATE = (e, name) => {
        let val1 = e.value || "";
        let val = "";
        if (val1 === "") {
            val = "";
        } else {
            val = getDateVal(val1);
        }

        let _dataQRY_KSV_ORDER_MST = { ...dataQRY_KSV_ORDER_MST };
        _dataQRY_KSV_ORDER_MST[`${name}`] = val;
        setDataQRY_KSV_ORDER_MST(_dataQRY_KSV_ORDER_MST);
    };

    const onInputChangeQRY_KSV_ORDER_MST_ORDER_CD = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_ORDER_MST = { ...dataQRY_KSV_ORDER_MST };

        let tTypeVal = _dataQRY_KSV_ORDER_MST[`${name}`];
        if (typeof tTypeVal === "string")
            _dataQRY_KSV_ORDER_MST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_ORDER_MST[`${name}`] = parseInt(val);

        setDataQRY_KSV_ORDER_MST(_dataQRY_KSV_ORDER_MST);
    };

    const [
        datasQRY_KSV_ORDER_MST_BUYER_CD,
        setDatasQRY_KSV_ORDER_MST_BUYER_CD,
    ] = useState([]);
    const [dataQRY_KSV_ORDER_MST_BUYER_CD, setDataQRY_KSV_ORDER_MST_BUYER_CD] =
        useState({});

    const onDropdownChangeQRY_KSV_ORDER_MST_BUYER_CD = (e, name) => {
        let val = (e.value && e.value.BUYER_CD) || "";

        let _dataQRY_KSV_ORDER_MST = { ...dataQRY_KSV_ORDER_MST };

        let tTypeVal = _dataQRY_KSV_ORDER_MST[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_ORDER_MST[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_ORDER_MST[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_ORDER_MST(_dataQRY_KSV_ORDER_MST);
        setDataQRY_KSV_ORDER_MST_BUYER_CD(e.value);
    };

    const onCheckboxChangeQRY_KSV_ORDER_MST_PARTIAL_SHIP_FLAG = (e, name) => {
        let val = "";
        let _dataQRY_KSV_ORDER_MST = { ...dataQRY_KSV_ORDER_MST };
        if (e.checked) {
            val = "1";
        } else {
            val = "0";
        }
        _dataQRY_KSV_ORDER_MST[`${name}`] = val;
        setDataQRY_KSV_ORDER_MST(_dataQRY_KSV_ORDER_MST);
    };

    const onCheckboxChangeQRY_KSV_ORDER_MST_END_REPORT_FLAG = (e, name) => {
        let val = "";
        let _dataQRY_KSV_ORDER_MST = { ...dataQRY_KSV_ORDER_MST };
        if (e.checked) {
            val = "1";
        } else {
            val = "0";
        }
        _dataQRY_KSV_ORDER_MST[`${name}`] = val;
        setDataQRY_KSV_ORDER_MST(_dataQRY_KSV_ORDER_MST);
    };

    const onCheckboxChangeQRY_KSV_ORDER_MST_END_FLAG = (e, name) => {
        let val = "";
        let _dataQRY_KSV_ORDER_MST = { ...dataQRY_KSV_ORDER_MST };
        if (e.checked) {
            val = "1";
        } else {
            val = "0";
        }
        _dataQRY_KSV_ORDER_MST[`${name}`] = val;
        setDataQRY_KSV_ORDER_MST(_dataQRY_KSV_ORDER_MST);
    };

    /*TABLE KSV_ORDER_MST */
    // DEFINE DATAGRID : TBL_KSV_ORDER_MST
    const [loadingTBL_KSV_ORDER_MST, setLoadingTBL_KSV_ORDER_MST] =
        useState(false);
    const [datasTBL_KSV_ORDER_MST, setDatasTBL_KSV_ORDER_MST] = useState([]);
    const dt_TBL_KSV_ORDER_MST = useRef(null);
    const [dataTBL_KSV_ORDER_MST, setDataTBL_KSV_ORDER_MST] = useState(
        emptyTBL_KSV_ORDER_MST,
    );
    const [selectedTBL_KSV_ORDER_MST, setSelectedTBL_KSV_ORDER_MST] = useState(
        [],
    );
    const [
        flagSelectModeTBL_KSV_ORDER_MST,
        setFlagSelectModeTBL_KSV_ORDER_MST,
    ] = useState(false);

    // DATAGRID CODE : TBL_KSV_ORDER_MST

    const onRowClick1TBL_KSV_ORDER_MST = (argData0) => {
        var argData = {};

        if (typeof argData0.length !== "undefined") {
            argData = argData0[0];
        } else {
            argData = argData0;
        }

        let argTBL_KSV_ORDER_MST = argData;

        setDataTBL_KSV_ORDER_MST(argTBL_KSV_ORDER_MST);
    };

    const onRowClickTBL_KSV_ORDER_MST = (event) => {
        let argTBL_KSV_ORDER_MST = event.data;
        if (flagSelectModeTBL_KSV_ORDER_MST) return;

        // Service : NawooAll:mgrQueryTBL_KSV_ORDER_MST
    };

    const onRowDoubleClickTBL_KSV_ORDER_MST = useCallback((event) => {
        var tUrls = window.location.href.split("/");
        console.log("URL=>" + tUrls[2]);
        var tUrl1 = "";

        if (!event.data.ORDER_CD) {
            alert('Order Cd가 있는 곳을 선택해 주세요.');
            return;
        }


        if (window.location.href.includes("3288")) {
            tUrl1 = "http://afroba.iptime.org:3288/webapp/mrpapp/index.html#/";
        } else if (window.location.href.includes("3201")) {
            if (window.location.href.includes("afroba")) {
                tUrl1 = "http://afroba.iptime.org:3201/#/";
            }
            if (window.location.href.includes("localhost")) {
                tUrl1 = "http://localhost:3201/#/";
            }
        } else if (window.location.href.includes("3203")) {
            tUrl1 = "http://192.168.0.105:3203/#/";
        } else {
            tUrl1 = "http://localhost:3201/#/";
        }
        // tUrl1 += "S020401_ORDER_INFO?ORDER_CD=" + event.data.ORDER_CD;
        tUrl1 = `${window.location.origin}/#/`;
        tUrl1 += `S020602_ORDER_REG?ORDER_CD=${event.data.ORDER_CD}&STYLE_CD=${event.data.STYLE_CD}&ORDER_STATUS=${event.data.STATUS}`;

        var tUrl2 = `S020602_ORDER_REG?ORDER_CD=${event.data.ORDER_CD}&STYLE_CD=${event.data.STYLE_CD}&ORDER_STATUS=${event.data.STATUS}`;

        var tValObj = {
            key: "1-20",
            label: "Order Info",
            icon: "pi pi-fw pi-user-edit",
            url1: "S020602_ORDER_REG",
        };
        var tArgObj = { ...tValObj };
        tArgObj.url1 = tUrl2;
        var tFuncObj = {};
        tFuncObj.func = "call_url";
        tFuncObj.message = { ...tArgObj };
        window.parent.postMessage(tFuncObj, "*");

        var tObjs = [...selectedTBL_KSV_ORDER_MST];
        tObjs.push(event.data);
        setSelectedTBL_KSV_ORDER_MST(tObjs);
    }, [selectedTBL_KSV_ORDER_MST]);


    const exportExcelTBL_KSV_ORDER_MST = () => {
        var tArray = [];
        saveLIST_1.forEach((col, i) => {
            var tObj = {};
            tObj.ORDER_CD = col.ORDER_CD;
            tObj.STATUS = col.STATUS;
            tObj.STYLE_NAME = col.STYLE_NAME;
            tObj.TOT_CNT = col.TOT_CNT;
            tObj.SHIP_CNT = col.SHIP_CNT;
            tObj.USD_PRICE = col.USD_PRICE;
            tObj.COMM_AMT = col.COMM_AMT;
            tObj.ORD_AMT = col.ORD_AMT;
            tObj.SHIP_DATE = col.SHIP_DATE;
            tObj.KIND = col.KIND;
            tObj.MATL_PRICE = col.MATL_PRICE;
            tObj.FC_PRICE = col.FC_PRICE;
            tObj.COMMISSION = col.COMMISSION;
            tObj.ETC_PRICE = col.ETC_PRICE;
            tObj.TOT_PRICE = col.TOT_PRICE;
            tObj.RATE = col.RATE;
            tObj.TOT_AMT = col.TOT_AMT;
            tObj.REMARK = col.REMARK;
            tObj.END_DATETIME = col.END_DATETIME;
            tObj.STYLE_CD = col.STYLE_CD;
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
            saveAsExcelFileTBL_KSV_ORDER_MST(
                excelBuffer,
                "Order(Before&After)",
            );
        });
    };

    const saveAsExcelFileTBL_KSV_ORDER_MST = (buffer, fileName) => {
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

    useEffect(() => {
        var tRetDate1 = serviceLib.getCurrDate1();
        var tQryObj = { ...dataQRY_KSV_ORDER_MST };
        tQryObj.S_SHIP_DATE = tRetDate1;
        tQryObj.E_SHIP_DATE = moment().endOf("month").format("YYYYMMDD");
        setDataQRY_KSV_ORDER_MST(tQryObj);

        serviceS0214_ORDER_STATUS_BEFORE_AFTER_CHECK
            .mgrQueryTBL_KSV_ORDER_MST_CODE()
            .then((data) => {
                if (typeof data.graphQLErrors === "undefined") {
                    console.log(
                        "ServiceNawooAll.mgrQueryTBL_KSV_ORDER_MST_CODE() call => " +
                            data.BUYER_CD.length,
                    );
                    setDatasQRY_KSV_ORDER_MST_BUYER_CD(data.BUYER_CD);
                    setDataQRY_KSV_ORDER_MST_BUYER_CD(data.BUYER_CD[0]);
                } else {
                    // var tStr = data.graphQLErrors[0].message;
                    console.log(
                        "ServiceNawooAll.mgrQueryTBL_KSV_ORDER_MST_CODE()error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });
    }, []);

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

    const buttonRef = useRef(null);
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "F1") {
                e.preventDefault(); // F1의 기본 도움말 호출 방지
                if (buttonRef.current) {
                    buttonRef.current.click();
                }
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    return (
        <div className="af-div-main">
            <div
                className="af-div-first"
                style={{ width: "123rem", height: "6rem" }}
            >
                <span className="af-span-3-0" style={{ width: "31rem" }}>
                    <p className="af-span-p" style={{ width: "6rem" }}>Ship Date</p>
                    {/*
                    <div className="af-span-checkbox">
                        <Checkbox
                            id="id_SHIPDATE_FLAG"
                            checked={changeCheckBoxVal(
                                dataQRY_KSV_ORDER_MST.SHIPDATE_FLAG,
                            )}
                            onChange={(e) =>
                                onCheckboxChangeQRY_KSV_ORDER_MST_SHIPDATE_FLAG(
                                    e,
                                    "SHIPDATE_FLAG",
                                )
                            }
                        />
                    </div>
                    <p className="af-span-p" style={{ width: "1rem" }}> </p>
                    */}
                    <div className="af-span-div" style={{ width: "9rem" }}>
                        <Calendar
                            showButtonBar
                            style={{ width: "9rem" }}
                            dateFormat="yy-mm-dd"
                            id="id_S_SHIP_DATE"
                            value={changeDateVal(
                                dataQRY_KSV_ORDER_MST.S_SHIP_DATE,
                            )}
                            onChange={(e) =>
                                onCalChangeQRY_KSV_ORDER_MST_S_SHIP_DATE(
                                    e,
                                    "S_SHIP_DATE",
                                )
                            }
                        />
                    </div>
                    <p className="af-span-p" style={{ width: "1rem" }}>~</p>
                    <div className="af-span-div" style={{ width: "9rem" }}>
                        <Calendar
                            showButtonBar
                            style={{ width: "9rem" }}
                            dateFormat="yy-mm-dd"
                            id="id_S_SHIP_DATE"
                            value={changeDateVal(
                                dataQRY_KSV_ORDER_MST.E_SHIP_DATE,
                            )}
                            onChange={(e) =>
                                onCalChangeQRY_KSV_ORDER_MST_E_SHIP_DATE(
                                    e,
                                    "E_SHIP_DATE",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "89rem" }}>
                    <p className="af-span-p" style={{ width: "8rem" }}>Buyer#</p>
                    <div className="af-span-div" style={{ width: "23rem" }}>
                        <Dropdown
                            style={{ width: "23rem" }}
                            id="id_BUYER_CD"
                            value={dataQRY_KSV_ORDER_MST_BUYER_CD}
                            onChange={(e) =>
                                onDropdownChangeQRY_KSV_ORDER_MST_BUYER_CD(
                                    e,
                                    "BUYER_CD",
                                )
                            }
                            options={datasQRY_KSV_ORDER_MST_BUYER_CD}
                            optionLabel="BUYER_NAME"
                            placeholder=""
                            editable
                            filter
                        ></Dropdown>
                    </div>
                </span>

                <span className="af-span-3" style={{ width: "28.5rem" }}>
                    <p className="af-span-p" style={{ width: "6rem" }}>Order#</p>
                    <div className="af-span-div" style={{ width: "21.5rem" }}>
                        <InputText
                            style={{ width: "21.5rem" }}
                            id="id_ORDER_CD"
                            value={dataQRY_KSV_ORDER_MST.ORDER_CD}
                            onChange={(e) =>
                                onInputChangeQRY_KSV_ORDER_MST_ORDER_CD(
                                    e,
                                    "ORDER_CD",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "14rem" }}>
                    <p className="af-span-p" style={{ width: "10rem" }}>Partial Ship</p>
                    <div className="af-span-checkbox">
                        <Checkbox
                            id="id_PARTIAL_SHIP_FLAG"
                            checked={changeCheckBoxVal(
                                dataQRY_KSV_ORDER_MST.PARTIAL_SHIP_FLAG,
                            )}
                            onChange={(e) =>
                                onCheckboxChangeQRY_KSV_ORDER_MST_PARTIAL_SHIP_FLAG(
                                    e,
                                    "PARTIAL_SHIP_FLAG",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "14rem" }}>
                    <p className="af-span-p" style={{ width: "10rem" }}>End Report</p>
                    <div className="af-span-checkbox">
                        <Checkbox
                            id="id_END_REPORT_FLAG"
                            checked={changeCheckBoxVal(
                                dataQRY_KSV_ORDER_MST.END_REPORT_FLAG,
                            )}
                            onChange={(e) =>
                                onCheckboxChangeQRY_KSV_ORDER_MST_END_REPORT_FLAG(
                                    e,
                                    "END_REPORT_FLAG",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "7rem" }}>
                    <p className="af-span-p" style={{ width: "3rem" }}>End</p>
                    <div className="af-span-checkbox">
                        <Checkbox
                            id="id_END_FLAG"
                            checked={changeCheckBoxVal(
                                dataQRY_KSV_ORDER_MST.END_FLAG,
                            )}
                            onChange={(e) =>
                                onCheckboxChangeQRY_KSV_ORDER_MST_END_FLAG(
                                    e,
                                    "END_FLAG",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "11rem" }}>
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
                            onClick={search_LIST_1}
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "11rem" }}>
                    <div className="af-span-div-btn" style={{ width: "10rem" }}>
                        <Button
                            label="Reset"
                            style={{ width: "10rem" }}
                            className="p-button-text"
                            onClick={process_RESET}
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "11rem" }}>
                    <div className="af-span-div-btn" style={{ width: "10rem" }}>
                        <Button
                            label="Excel"
                            style={{ width: "10rem" }}
                            className="p-button-text green"
                            onClick={process_EXCEL}
                        />
                    </div>
                </span>
            </div>
            <div
                className="af-div-first"
                style={{ width: "123rem", height: "51.3rem" }}
            >
                <AFDataTable preventUnrelatedRerender
                    ref={dt_TBL_KSV_ORDER_MST}
                    size="small"
                    value={datasTBL_KSV_ORDER_MST}
                    tableStyle={{ tableLayout: "fixed" }}
                    loading={loadingTBL_KSV_ORDER_MST}
                    metaKeySelection={false}
                    showGridlines
                    selectionMode="checkbox"
                    resizableColumns
                    columnResizeMode="expand"
                    selection={selectedTBL_KSV_ORDER_MST}
                    onSelectionChange={(e) => {
                        const clickedRows = e.value;
                        const prevSelected = selectedTBL_KSV_ORDER_MST;

                        const added = clickedRows.filter(
                            (r) => !prevSelected.some((p) => p.id === r.id),
                        );
                        const removed = prevSelected.filter(
                            (p) => !clickedRows.some((r) => r.id === p.id),
                        );

                        let updatedSelection;

                        if (added.length > 0) {
                            const orderCdsToAdd = new Set(
                                added.map((row) => row.ORDER_CD),
                            );
                            const rowsToAdd = datasTBL_KSV_ORDER_MST.filter(
                                (row) => orderCdsToAdd.has(row.ORDER_CD),
                            );

                            const combined = [...clickedRows, ...rowsToAdd];
                            const uniqueMap = new Map();
                            for (const row of combined)
                                uniqueMap.set(row.id, row);
                            updatedSelection = Array.from(uniqueMap.values());
                        } else if (removed.length > 0) {
                            const orderCdsToRemove = new Set(
                                removed.map((row) => row.ORDER_CD),
                            );
                            updatedSelection = clickedRows.filter(
                                (row) => !orderCdsToRemove.has(row.ORDER_CD),
                            );
                        } else {
                            updatedSelection = clickedRows;
                        }

                        setFlagSelectModeTBL_KSV_ORDER_MST(true);
                        setSelectedTBL_KSV_ORDER_MST(updatedSelection);
                        console.log(
                            "selected length:" + updatedSelection.length,
                        );
                        onRowClick1TBL_KSV_ORDER_MST(updatedSelection);
                    }}
                    onRowClick={onRowClickTBL_KSV_ORDER_MST}
                    onRowDoubleClick={onRowDoubleClickTBL_KSV_ORDER_MST}
                    dataKey="id"
                    className="datatable-responsive"
                    virtualScrollerOptions={{ itemSize: 20 }}
                    emptyMessage=" "
                    //header={headerTBL_KSV_ORDER_MST}
                    responsiveLayout="scroll"
                    scrollable
                    scrollHeight="559px"
                >
                    <AFColumn selectionMode="multiple" field="__checkbox__" reorderable={false} headerClassName="t-header" headerStyle={{ width: "1rem" }} ></AFColumn>
                    <AFColumn field="ORDER_CD" headerClassName="t-header" header="Order#" style={{ height: "1.8rem", flexBasis: "auto" }} className="bgBlue" ></AFColumn>
                    <AFColumn field="STATUS" headerClassName="t-header" header="Status" style={{ height: "1.8rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="STYLE_NAME" headerClassName="t-header" header="Style Name" style={{ height: "1.8rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="TOT_CNT" headerClassName="t-header" header="Ord Qty" bodyClassName="col-right" style={{ height: "1.8rem", flexBasis: "auto" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.TOT_CNT, 2) } ></AFColumn>
                    <AFColumn field="SHIP_CNT" headerClassName="t-header" header="Ship Qty" bodyClassName="col-right" style={{ height: "1.8rem", flexBasis: "auto" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.SHIP_CNT, 2) } ></AFColumn>
                    <AFColumn field="USD_PRICE" headerClassName="t-header" header="Usd($)" bodyClassName="col-right" style={{ height: "1.8rem", flexBasis: "auto" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.USD_PRICE, 2) } ></AFColumn>

                    <AFColumn field="ORD_AMT" headerClassName="t-header" header="Ord.Amt" bodyClassName="col-right" style={{ height: "1.8rem", flexBasis: "auto" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.ORD_AMT, 2) } className="bgBlue" ></AFColumn>
                    <AFColumn field="SHIP_DATE" headerClassName="t-header" header="Ship Date" style={{ height: "1.8rem", flexBasis: "auto" }} bodyStyle={{ textAlign: "center" }} body={(rowData) => serviceLib.dateFormat(rowData.SHIP_DATE) } ></AFColumn>
                    <AFColumn field="KIND" headerClassName="t-header" header="Kind" style={{ height: "1.8rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="MATL_PRICE" headerClassName="t-header" header="Matl.Price" style={{ height: "1.8rem", flexBasis: "auto" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.MATL_PRICE, 2) } ></AFColumn>
                    <AFColumn field="FC_PRICE" headerClassName="t-header" header="Fc.Price" style={{ height: "1.8rem", flexBasis: "auto" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.FC_PRICE, 2) } ></AFColumn>
                    <AFColumn field="COMMISSION" headerClassName="t-header" header="Comm.Price" style={{ height: "1.8rem", flexBasis: "auto" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.COMMISSION, 2) } ></AFColumn>
                    <AFColumn field="ETC_PRICE" headerClassName="t-header" header="Etc.Price" style={{ height: "1.8rem", flexBasis: "auto" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.ETC_PRICE, 2) } ></AFColumn>
                    <AFColumn field="TOT_PRICE" headerClassName="t-header" header="Tot.Price" style={{ height: "1.8rem", flexBasis: "auto" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.TOT_PRICE, 2) } ></AFColumn>
                    <AFColumn field="RATE" headerClassName="t-header" header="Rate" style={{ height: "1.8rem", flexBasis: "auto" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.RATE, 2) } className="bgPink" ></AFColumn>
                    <AFColumn field="TOT_AMT" headerClassName="t-header" header="Tot.Amt" style={{ height: "1.8rem", flexBasis: "auto" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.TOT_AMT, 2) } className="bgBlue" ></AFColumn>
                    <AFColumn field="REMARK" headerClassName="t-header" header="Remark" style={{ height: "1.8rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="END_DATETIME" headerClassName="t-header" header="End.Date" style={{ height: "1.8rem", flexBasis: "auto" }} bodyStyle={{ textAlign: "center" }} body={(rowData) => serviceLib.dateFormat(rowData.END_DATETIME) } ></AFColumn>
                    <AFColumn field="STYLE_CD" headerClassName="t-header" header="Style CD" style={{ height: "1.8rem", flexBasis: "auto" }} ></AFColumn>
                </AFDataTable>
            </div>

            <div
                className="af-div-first"
                style={{ width: "123rem", height: "3rem" }}
            >
                <span className="af-span-3-0" style={{ width: "11rem" }}>
                    <div className="af-span-div-btn" style={{ width: "10rem" }}>
                        <Button
                            label="End Report"
                            style={{ width: "10rem" }}
                            className="p-button-text green"
                            onClick={process_EXCEL_END_REPORT}
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "11rem" }}>
                    <div className="af-span-div-btn" style={{ width: "10rem" }}>
                        <Button
                            label="End(F1)"
                            style={{ width: "10rem" }}
                            className="p-button-text"
                            onClick={process_END_ORDER}
                            tooltip="F1"
                            tooltipOptions={{ position: "top" }}
                            ref={buttonRef}
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "11rem" }}>
                    <div className="af-span-div-btn" style={{ width: "10rem" }}>
                        <Button
                            label="End Cancel"
                            style={{ width: "10rem" }}
                            className="p-button-text"
                            onClick={process_END_ORDER_CANCEL}
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "11rem" }}>
                    <div className="af-span-div-btn" style={{ width: "10rem" }}>
                        <Button
                            label="List(Partial)"
                            style={{ width: "10rem" }}
                            className="p-button-text green"
                            onClick={process_EXCEL_PARTIAL}
                        />
                    </div>
                </span>
            </div>

            <Toast ref={toast} />
        </div>
    );
};

const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(S0214_ORDER_STATUS_BEFORE_AFTER_CHECK, comparisonFn);
