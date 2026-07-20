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
import { ServiceS0607_LC_NEGO } from "../service/service_biz/ServiceS0607_LC_NEGO";

import "./page_common.scss";

const emptyKCD_CODE = {
    id: 0,
    CD_GROUP: "",
    CD_CODE: "",
    CD_NAME: "",
    CD_FLAG: "",
};

const emptyTBL_KSV_INVOICE_MST1 = {
    REF_NO: "",
    S_START_DATE: "",
    E_START_DATE: "",
    BUYER_CD: "",
    TOT_AMT: "0",
    CURR_CD: "",
    INVOICE_NEGO_TYPE: "",
    START_DATE: "",
    END_DATE: "",
    BILL_DATE: "",
    EXCHANGE_COMM: "0",
    HANDLING_CHARGE: "0",
    POSTAGE: "0",
    DELAY_DAYS: "0",
    TOT_AMT2: "0",
    AMT_WON: "0",
    AMT_CURR: "0",
    DELAY_INTEREST: "0",
    RATE: "0",
    LESS_CHARGE: "0",
    GRAND_TOT: "0",
    BANK_CD: "",
};

const emptyEDT_KSV_INVOICE_MST1 = {
    REF_NO: "",
    S_START_DATE: "",
    E_START_DATE: "",
    BUYER_CD: "",
    TOT_AMT: "0",
    CURR_CD: "",
    INVOICE_NEGO_TYPE: "",
    START_DATE: "",
    EXCHANGE_COMM: "0",
    END_DATE: "",
    HANDLING_CHARGE: "0",
    BILL_DATE: "",
    POSTAGE: "0",
    DELAY_DAYS: "0",
    TOT_AMT2: "0",
    AMT_WON: "0",
    DELAY_INTEREST: "0",
    DELAY_RATE: "0",
    LESS_CHARGE: "0",
    GRAND_TOT: "0",
    BANK_CD: "",
};

const emptyEDT_KSV_INVOICE_MST = {
    INVOICE_NO: "",
    BILL_AMT: "",
};

const S0607_LC_NEGO = () => {
    const serviceLibRef = useRef(null);
    if (!serviceLibRef.current) {
        serviceLibRef.current = new ServiceLib();
        serviceLibRef.current.loginConfirm();
    }
    const serviceLib = serviceLibRef.current;
    const serviceS0607_LC_NEGORef = useRef(null);
    if (!serviceS0607_LC_NEGORef.current) serviceS0607_LC_NEGORef.current = new ServiceS0607_LC_NEGO();
    const serviceS0607_LC_NEGO = serviceS0607_LC_NEGORef.current;

    const toast = useRef(null);

    /* splitter 관련 */
    const [styleVal, setStyleVal] = useState({ width: "65vw" });

    const process_RESET = () => {
        setDatasTBL_KSV_INVOICE_MST([]);
        setSelectedTBL_KSV_INVOICE_MST([]);
        setDatasTBL_KSV_INVOICE_MST1([]);
        setSelectedTBL_KSV_INVOICE_MST1([]);

        var tRetDate = serviceLib.getCurrDate().substring(0, 8);

        var tEdt = { ...emptyEDT_KSV_INVOICE_MST1 };
        tEdt.START_DATE = tRetDate;
        tEdt.BILL_DATE = tRetDate;
        tEdt.END_DATE = tRetDate;
        tEdt.S_START_DATE = tRetDate;
        tEdt.E_START_DATE = tRetDate;
        setDataEDT_KSV_INVOICE_MST1(tEdt);

        setDataEDT_KSV_INVOICE_MST1_BUYER_CD(
            datasEDT_KSV_INVOICE_MST1_BUYER_CD[0],
        );
        setDataEDT_KSV_INVOICE_MST1_CURR_CD(
            datasEDT_KSV_INVOICE_MST1_CURR_CD[0],
        );
        setDataEDT_KSV_INVOICE_MST1_INVOICE_NEGO_TYPE(
            datasEDT_KSV_INVOICE_MST1_INVOICE_NEGO_TYPE[0],
        );
        var tObj = {};
        tObj.BANK_CD = "";
        tObj.BANK_NAME = " ";
        var tArray = [];
        tArray.push(tObj);
        setDatasEDT_KSV_INVOICE_MST1_BANK_CD(tArray);
        setDataEDT_KSV_INVOICE_MST1_BANK_CD(tArray[0]);

        setDataEDT_KSV_INVOICE_MST(emptyEDT_KSV_INVOICE_MST);
        var tObj = {};
        tObj.INVOICE_CD = "";
        tObj.INVOICE_NAME = " ";
        tObj.INVOICE_AMT = "0";
        var tArray = [];
        tArray.push(tObj);
        setDatasEDT_KSV_INVOICE_MST_INVOICE_NO(tArray);
        setDataEDT_KSV_INVOICE_MST_INVOICE_NO(tArray[0]);
    };

    const process_INSERT_LC_NEGO = () => {
        if (selectedTBL_KSV_INVOICE_MST1.length > 0) {
            alert("조회된 데이타는 Insert할수 없습니다<br><br>Viewed data cannot be inserted.");
            return;
        }

        var tInData1 = { ...dataEDT_KSV_INVOICE_MST1 };
        tInData1.USER_ID = serviceLib.getUserInfo().USER_ID;

        delete tInData1.__typename;
        delete tInData1.id;
        delete tInData1.INVOICE_NEGO_TYPE_N;
        delete tInData1.BANK_NAME;
        delete tInData1.BUYER_NAME;
        delete tInData1.AMT_CURR;

        if (
            tInData1.REF_NO === "" ||
            tInData1.TOT_AMT === "" ||
            parseFloat(tInData1.TOT_AMT) <= 0 ||
            tInData1.START_DATE === "" ||
            tInData1.BILL_DATE === "" ||
            tInData1.CURR_CD === "" ||
            tInData1.INVOICE_NEGO_TYPE === "" ||
            tInData1.BANK_CD === ""
        ) {
            alert(
                "Ref No, Amount, Nego Date, Bill Date, Bank, Curr Cd, Nego Type 는 필수 입력입니다",
            );
            return;
        }

        setLoadingTBL_KSV_INVOICE_MST1(true);
        serviceS0607_LC_NEGO.mgrInsert_INSERT_LC_NEGO(tInData1).then((data) => {
            setLoadingTBL_KSV_INVOICE_MST1(false);
            if (typeof data.graphQLErrors === "undefined") {
                if (typeof data.length === "undefined") {
                } else {
                    alert(data[0].CODE);
                    search_LIST_1();
                    // console.log("ServiceMgrKCD_BUYER.mgr1KcdStyle call => " + data.length);
                }
            } else {
                console.log(
                    "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                        JSON.stringify(data.graphQLErrors),
                );
                toast.current.show({
                    severity: "success",
                    summary: "ERROR:Insert LC NEGO",
                    detail: "",
                    life: 3000,
                });
            }
        });
    };

    const process_UPDATE_LC_NEGO = () => {
        if (selectedTBL_KSV_INVOICE_MST1.length <= 0) {
            alert("작업할 데이타를 선택하십시요<br><br>Select the data you want to work with");
            return;
        }

        var tInData1 = { ...dataEDT_KSV_INVOICE_MST1 };
        tInData1.USER_ID = serviceLib.getUserInfo().USER_ID;

        delete tInData1.__typename;
        delete tInData1.id;
        delete tInData1.INVOICE_NEGO_TYPE_N;
        delete tInData1.BANK_NAME;
        delete tInData1.BUYER_NAME;
        delete tInData1.AMT_CURR;

        if (
            tInData1.REF_NO === "" ||
            tInData1.TOT_AMT === "" ||
            parseFloat(tInData1.TOT_AMT) <= 0 ||
            tInData1.START_DATE === "" ||
            tInData1.BILL_DATE === "" ||
            tInData1.CURR_CD === "" ||
            tInData1.INVOICE_NEGO_TYPE === "" ||
            tInData1.BANK_CD === ""
        ) {
            alert(
                "Ref No, Amount, Nego Date, Bill Date, Bank, Curr Cd, Nego Type 는 필수 입력입니다",
            );
            return;
        }

        setLoadingTBL_KSV_INVOICE_MST1(true);
        serviceS0607_LC_NEGO.mgrUpdate_UPDATE_LC_NEGO(tInData1).then((data) => {
            setLoadingTBL_KSV_INVOICE_MST1(false);
            if (typeof data.graphQLErrors === "undefined") {
                if (typeof data.length === "undefined") {
                } else {
                    alert(data[0].CODE);
                    search_LIST_1();
                    // console.log("ServiceMgrKCD_BUYER.mgr1KcdStyle call => " + data.length);
                }
            } else {
                console.log(
                    "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                        JSON.stringify(data.graphQLErrors),
                );
                toast.current.show({
                    severity: "success",
                    summary: "ERROR:Insert LC NEGO",
                    detail: "",
                    life: 3000,
                });
            }
        });
    };

    const process_DELETE_LC_NEGO = () => {
        if (selectedTBL_KSV_INVOICE_MST1.length <= 0) {
            alert("작업할 데이타를 선택하십시요<br><br>Select the data you want to work with");
            return;
        }

        var tInData1 = { ...dataEDT_KSV_INVOICE_MST1 };
        tInData1.USER_ID = serviceLib.getUserInfo().USER_ID;

        delete tInData1.__typename;
        delete tInData1.id;
        delete tInData1.INVOICE_NEGO_TYPE_N;
        delete tInData1.BANK_NAME;
        delete tInData1.BUYER_NAME;
        delete tInData1.AMT_CURR;

        setLoadingTBL_KSV_INVOICE_MST1(true);
        serviceS0607_LC_NEGO.mgrDelete_DELETE_LC_NEGO(tInData1).then((data) => {
            setLoadingTBL_KSV_INVOICE_MST1(false);
            if (typeof data.graphQLErrors === "undefined") {
                if (typeof data.length === "undefined") {
                } else {
                    alert(data[0].CODE);
                    search_LIST_1();
                    // console.log("ServiceMgrKCD_BUYER.mgr1KcdStyle call => " + data.length);
                }
            } else {
                console.log(
                    "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                        JSON.stringify(data.graphQLErrors),
                );
                toast.current.show({
                    severity: "success",
                    summary: "ERROR:Insert LC NEGO",
                    detail: "",
                    life: 3000,
                });
            }
        });
    };

    const process_INSERT_INVOICE = () => {
        if (selectedTBL_KSV_INVOICE_MST1.length <= 0) {
            alert("작업할 데이타를 선택하십시요<br><br>Select the data you want to work with");
            return;
        }

        var tInData0 = { ...dataEDT_KSV_INVOICE_MST };
        var tInData1 = { ...dataEDT_KSV_INVOICE_MST1 };
        tInData1.USER_ID = serviceLib.getUserInfo().USER_ID;
        tInData1.INVOICE_NO = tInData0.INVOICE_NO;
        tInData1.BILL_AMT = String(parseFloat(tInData0.BILL_AMT).toFixed(2));

        var tData = { ...selectedTBL_KSV_INVOICE_MST1[0] };

        var tVal1 = parseFloat(parseFloat(tData.BAL_AMT).toFixed(2));
        var tVal2 = parseFloat(parseFloat(tInData0.BILL_AMT).toFixed(2));
        var tDiff = Math.abs(tVal1 - tVal2);

        if (tDiff > 2 && tVal2 > tVal1) {
            alert(
                `Bill 처리할 금액이 계좌 잔고보다 큽니다. (${tVal2}/${tVal1})`,
            );
            return;
        }

        delete tInData1.__typename;
        delete tInData1.id;
        delete tInData1.INVOICE_NEGO_TYPE_N;
        delete tInData1.BANK_NAME;
        delete tInData1.BUYER_NAME;
        delete tInData1.AMT_CURR;

        setLoadingTBL_KSV_INVOICE_MST(true);
        serviceS0607_LC_NEGO
            .mgrInsert_INSERT_LC_INVOICE(tInData1)
            .then((data) => {
                setLoadingTBL_KSV_INVOICE_MST(false);
                if (typeof data.graphQLErrors === "undefined") {
                    if (typeof data.length === "undefined") {
                    } else {
                        alert(data[0].CODE);

                        if (data[0].CODE.includes("SUCC")) {
                            search_LIST_1();
                            search_LIST_2(tInData1.REF_NO);
                            search_CODE(tInData1.BUYER_CD, "INVOICE");
                        }
                        // search_LIST_1();
                        // console.log("ServiceMgrKCD_BUYER.mgr1KcdStyle call => " + data.length);
                    }
                } else {
                    console.log(
                        "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                    toast.current.show({
                        severity: "success",
                        summary: "ERROR:Insert INVOICE",
                        detail: "",
                        life: 3000,
                    });
                }
            });
    };

    const process_DELETE_INVOICE = () => {
        if (selectedTBL_KSV_INVOICE_MST.length <= 0) {
            alert("작업할 데이타를 선택하십시요(Nego)<br><br>Select the data you want to work with (Nego)");
            return;
        }

        if (selectedTBL_KSV_INVOICE_MST1.length <= 0) {
            alert("작업할 데이타를 선택하십시요(Invoice)<br><br>Select the data you want to work with (Invoice)");
            return;
        }

        var tInData0 = { ...dataEDT_KSV_INVOICE_MST };
        var tInData1 = { ...dataEDT_KSV_INVOICE_MST1 };
        tInData1.USER_ID = serviceLib.getUserInfo().USER_ID;
        tInData1.INVOICE_NO = tInData0.INVOICE_NO;
        tInData1.BILL_AMT = String(parseFloat(tInData0.BILL_AMT));

        delete tInData1.__typename;
        delete tInData1.id;
        delete tInData1.INVOICE_NEGO_TYPE_N;
        delete tInData1.BANK_NAME;
        delete tInData1.BUYER_NAME;
        delete tInData1.AMT_CURR;

        setLoadingTBL_KSV_INVOICE_MST(true);
        serviceS0607_LC_NEGO
            .mgrDelete_DELETE_LC_INVOICE(tInData1)
            .then((data) => {
                setLoadingTBL_KSV_INVOICE_MST(false);
                if (typeof data.graphQLErrors === "undefined") {
                    if (typeof data.length === "undefined") {
                    } else {
                        alert(data[0].CODE);
                        search_LIST_1();
                        // console.log("ServiceMgrKCD_BUYER.mgr1KcdStyle call => " + data.length);
                    }
                } else {
                    console.log(
                        "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                    toast.current.show({
                        severity: "success",
                        summary: "ERROR:Insert INVOICE",
                        detail: "",
                        life: 3000,
                    });
                }
            });
    };

    const search_CODE = (argBuyer, argKind, argBankCd) => {
        var _tObj = {};
        _tObj.BUYER_CD = argBuyer;

        serviceS0607_LC_NEGO.mgrQuery_CODE(_tObj).then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                if (argKind === "BANK") {
                    if (typeof argBankCd === "undefined") {
                        setDatasEDT_KSV_INVOICE_MST1_BANK_CD(data.BANK_CD);
                        setDataEDT_KSV_INVOICE_MST1_BANK_CD(data.BANK_CD[0]);

                        setDatasEDT_KSV_INVOICE_MST_INVOICE_NO(data.INVOICE_NO);
                        setDataEDT_KSV_INVOICE_MST_INVOICE_NO(
                            data.INVOICE_NO[0],
                        );
                    } else {
                        setDatasEDT_KSV_INVOICE_MST1_BANK_CD(data.BANK_CD);
                        var tObj0 = {};
                        data.BANK_CD.forEach((col, i) => {
                            if (col.BANK_CD === argBankCd) tObj0 = { ...col };
                        });
                        if (typeof tObj0.BANK_CD !== "undefined")
                            setDataEDT_KSV_INVOICE_MST1_BANK_CD(tObj0);
                        else
                            setDataEDT_KSV_INVOICE_MST1_BANK_CD(
                                data.BANK_CD[0],
                            );

                        setDatasEDT_KSV_INVOICE_MST_INVOICE_NO(data.INVOICE_NO);
                        setDataEDT_KSV_INVOICE_MST_INVOICE_NO(
                            data.INVOICE_NO[0],
                        );
                    }
                }
                if (argKind === "INVOICE") {
                    setDatasEDT_KSV_INVOICE_MST_INVOICE_NO(data.INVOICE_NO);
                    setDataEDT_KSV_INVOICE_MST_INVOICE_NO(data.INVOICE_NO[0]);

                    var tEdt = { ...emptyEDT_KSV_INVOICE_MST };
                    setDataEDT_KSV_INVOICE_MST(tEdt);
                }
            } else {
                console.log(
                    "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });
    };

    const search_LIST_1 = () => {
        var _tData = { ...dataEDT_KSV_INVOICE_MST1 };
        var tInput = {};
        tInput.REF_NO = _tData.REF_NO.trim();
        tInput.BUYER_CD = _tData.BUYER_CD.trim();
        tInput.S_DATE = _tData.S_START_DATE;
        tInput.E_DATE = _tData.E_START_DATE;

        setDatasTBL_KSV_INVOICE_MST([]);
        setSelectedTBL_KSV_INVOICE_MST([]);
        setDatasTBL_KSV_INVOICE_MST1([]);
        setSelectedTBL_KSV_INVOICE_MST1([]);

        setLoadingTBL_KSV_INVOICE_MST1(true);
        serviceS0607_LC_NEGO.mgrQuery_LIST_1(tInput).then((data) => {
            setLoadingTBL_KSV_INVOICE_MST1(false);
            if (typeof data.graphQLErrors === "undefined") {
                console.log(
                    "ServiceMgrKCD_BUYER.mgr1KcdStyle call => " + data.length,
                );

                if (data.length <= 0) {
                    setDatasTBL_KSV_INVOICE_MST([]);
                    return;
                }

                var tArray2 = data.map((col, i) => {
                    var tObj = { ...col };
                    tObj.id = i + 1;
                    return tObj;
                });
                setDatasTBL_KSV_INVOICE_MST1(tArray2);

                if (tArray2.length === 1) {
                    setDataTBL_KSV_INVOICE_MST1(tArray2[0]);

                    var tSelArray = [];
                    tSelArray.push(tArray2[0]);
                    setSelectedTBL_KSV_INVOICE_MST1(tSelArray);

                    onRowClick1TBL_KSV_INVOICE_MST1(tArray2[0]);
                }
            } else {
                console.log(
                    "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });
    };

    const search_LIST_2 = (argData) => {
        var tInput = {};
        tInput.REF_NO = argData;

        setDatasTBL_KSV_INVOICE_MST([]);
        setSelectedTBL_KSV_INVOICE_MST([]);

        setLoadingTBL_KSV_INVOICE_MST(true);

        serviceS0607_LC_NEGO.mgrQuery_LIST_2(tInput).then((data) => {
            setLoadingTBL_KSV_INVOICE_MST(false);
            if (typeof data.graphQLErrors === "undefined") {
                console.log(
                    "ServiceMgrKCD_BUYER.mgr1KcdStyle call => " + data.length,
                );

                if (data.length <= 0) {
                    setDatasTBL_KSV_INVOICE_MST([]);
                    return;
                }
                var tArray2 = data.map((col, i) => {
                    var tObj = { ...col };
                    tObj.id = i + 1;
                    return tObj;
                });
                setDatasTBL_KSV_INVOICE_MST(tArray2);
            } else {
                console.log(
                    "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });
    };

    /*TABLE KSV_INVOICE_MST */
    // DEFINE DATAGRID : TBL_KSV_INVOICE_MST
    let emptyTBL_KSV_INVOICE_MST = {};

    const [loadingTBL_KSV_INVOICE_MST, setLoadingTBL_KSV_INVOICE_MST] =
        useState(false);

    const [datasTBL_KSV_INVOICE_MST, setDatasTBL_KSV_INVOICE_MST] = useState(
        [],
    );
    const dt_TBL_KSV_INVOICE_MST = useRef(null);
    const [dataTBL_KSV_INVOICE_MST, setDataTBL_KSV_INVOICE_MST] = useState(
        emptyTBL_KSV_INVOICE_MST,
    );
    const [selectedTBL_KSV_INVOICE_MST, setSelectedTBL_KSV_INVOICE_MST] =
        useState([]);
    const [
        flagSelectModeTBL_KSV_INVOICE_MST,
        setFlagSelectModeTBL_KSV_INVOICE_MST,
    ] = useState(false);

    // DATAGRID CODE : TBL_KSV_INVOICE_MST

    const onRowClick1TBL_KSV_INVOICE_MST = (argData0) => {
        var argData = {};

        if (typeof argData0.length !== "undefined") {
            argData = argData0[0];
        } else {
            argData = argData0;
        }

        let argTBL_KSV_INVOICE_MST = argData;

        setDataTBL_KSV_INVOICE_MST(argTBL_KSV_INVOICE_MST);

        datasetEDT_KSV_INVOICE_MST(argData);

        var tArray = [];
        var tObj = {};
        tObj.INVOICE_NO = argData.INVOICE_NO;
        tObj.INVOICE_AMT = argData.BILL_AMT;
        tObj.INVOICE_NAME = `${tObj.INVOICE_NO}/${tObj.INVOICE_AMT}`;
        tArray.push(tObj);
        setDatasEDT_KSV_INVOICE_MST_INVOICE_NO(tArray);
        setDataEDT_KSV_INVOICE_MST_INVOICE_NO(tArray[0]);
    };

    const onRowClickTBL_KSV_INVOICE_MST = (event) => {
        let argTBL_KSV_INVOICE_MST = event.data;
        if (flagSelectModeTBL_KSV_INVOICE_MST) return;

        // Service : NawooAll:mgrQueryTBL_KSV_INVOICE_MST
    };

    /* TABLE KSV_INVOICE_MST1*/
    // DEFINE DATAGRID : TBL_KSV_INVOICE_MST1
    const [loadingTBL_KSV_INVOICE_MST1, setLoadingTBL_KSV_INVOICE_MST1] =
        useState(false);

    const [datasTBL_KSV_INVOICE_MST1, setDatasTBL_KSV_INVOICE_MST1] = useState(
        [],
    );
    const dt_TBL_KSV_INVOICE_MST1 = useRef(null);
    const [dataTBL_KSV_INVOICE_MST1, setDataTBL_KSV_INVOICE_MST1] = useState(
        emptyTBL_KSV_INVOICE_MST1,
    );
    const [selectedTBL_KSV_INVOICE_MST1, setSelectedTBL_KSV_INVOICE_MST1] =
        useState([]);
    const [
        flagSelectModeTBL_KSV_INVOICE_MST1,
        setFlagSelectModeTBL_KSV_INVOICE_MST1,
    ] = useState(false);

    // DATAGRID CODE : TBL_KSV_INVOICE_MST1

    const onRowClick1TBL_KSV_INVOICE_MST1 = (argData0) => {
        var argData = {};

        if (typeof argData0.length !== "undefined") {
            if (argData0.length <= 0) return;
            argData = argData0[0];
        } else {
            argData = argData0;
        }

        let argTBL_KSV_INVOICE_MST1 = argData;

        setDataTBL_KSV_INVOICE_MST1(argTBL_KSV_INVOICE_MST1);

        search_CODE(argData.BUYER_CD, "BANK", argData.BANK_CD);

        datasetEDT_KSV_INVOICE_MST1(argData);
        search_LIST_2(argData.REF_NO);

        search_CODE(argData.BUYER_CD, "INVOICE");
    };

    const onRowClickTBL_KSV_INVOICE_MST1 = (event) => {
        let argTBL_KSV_INVOICE_MST1 = event.data;
        if (flagSelectModeTBL_KSV_INVOICE_MST1) return;

        // Service : NawooAll:mgrQueryTBL_KSV_INVOICE_MST1
    };

    /**EDIT KSV_INVOICE_MST */
    const [datasEDT_KSV_INVOICE_MST1, setDatasEDT_KSV_INVOICE_MST1] = useState(
        [],
    );
    const [dataEDT_KSV_INVOICE_MST1, setDataEDT_KSV_INVOICE_MST1] = useState(
        emptyEDT_KSV_INVOICE_MST1,
    );

    const datasetEDT_KSV_INVOICE_MST1 = (argData) => {
        var _tData = { ...argData };

        _tData.S_START_DATE = "";
        _tData.E_START_DATE = "";
        _tData.DELAY_RATE = "0";
        _tData.GRAND_TOT = "0";

        setDataEDT_KSV_INVOICE_MST1(_tData);

        editEDT_KSV_INVOICE_MST1_BUYER_CD(_tData.BUYER_CD);
        editEDT_KSV_INVOICE_MST1_CURR_CD(_tData.CURR_CD);
        editEDT_KSV_INVOICE_MST1_INVOICE_NEGO_TYPE(_tData.INVOICE_NEGO_TYPE);
        // editEDT_KSV_INVOICE_MST1_BANK_CD(_tData.BANK_CD);
    };

    const onInputChangeEDT_KSV_INVOICE_MST1_REF_NO = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_INVOICE_MST1 = { ...dataEDT_KSV_INVOICE_MST1 };

        let tTypeVal = _dataEDT_KSV_INVOICE_MST1[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_INVOICE_MST1[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_INVOICE_MST1[`${name}`] = parseInt(val);

        setDataEDT_KSV_INVOICE_MST1(_dataEDT_KSV_INVOICE_MST1);
    };

    const onCalChangeEDT_KSV_INVOICE_MST1_S_START_DATE = (e, name) => {
        let val1 = e.value || "";
        let val = "";
        if (val1 === "") {
            val = "";
        } else {
            val = getDateVal(val1);
        }

        let _dataEDT_KSV_INVOICE_MST1 = { ...dataEDT_KSV_INVOICE_MST1 };
        _dataEDT_KSV_INVOICE_MST1[`${name}`] = val;
        setDataEDT_KSV_INVOICE_MST1(_dataEDT_KSV_INVOICE_MST1);
    };

    const onCalChangeEDT_KSV_INVOICE_MST1_E_START_DATE = (e, name) => {
        let val1 = e.value || "";
        let val = "";
        if (val1 === "") {
            val = "";
        } else {
            val = getDateVal(val1);
        }

        let _dataEDT_KSV_INVOICE_MST1 = { ...dataEDT_KSV_INVOICE_MST1 };
        _dataEDT_KSV_INVOICE_MST1[`${name}`] = val;
        setDataEDT_KSV_INVOICE_MST1(_dataEDT_KSV_INVOICE_MST1);
    };

    const [
        datasEDT_KSV_INVOICE_MST1_BUYER_CD,
        setDatasEDT_KSV_INVOICE_MST1_BUYER_CD,
    ] = useState([]);
    const [
        dataEDT_KSV_INVOICE_MST1_BUYER_CD,
        setDataEDT_KSV_INVOICE_MST1_BUYER_CD,
    ] = useState({});

    const editEDT_KSV_INVOICE_MST1_BUYER_CD = (argValue) => {
        let _dataEDT_KSV_INVOICE_MST1_BUYER_CD =
            datasEDT_KSV_INVOICE_MST1_BUYER_CD.filter(
                (val) => val.BUYER_CD === argValue,
            );
        setDataEDT_KSV_INVOICE_MST1_BUYER_CD(
            _dataEDT_KSV_INVOICE_MST1_BUYER_CD[0],
        );
    };

    const onDropdownChangeEDT_KSV_INVOICE_MST1_BUYER_CD = (e, name) => {
        let val = (e.value && e.value.BUYER_CD) || "";

        let _dataEDT_KSV_INVOICE_MST1 = { ...dataEDT_KSV_INVOICE_MST1 };

        let tTypeVal = _dataEDT_KSV_INVOICE_MST1[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_KSV_INVOICE_MST1[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_KSV_INVOICE_MST1[`${name}`] = parseInt(val);
        }

        _dataEDT_KSV_INVOICE_MST1.BUYER_CD = val;

        setDataEDT_KSV_INVOICE_MST1(_dataEDT_KSV_INVOICE_MST1);
        setDataEDT_KSV_INVOICE_MST1_BUYER_CD(e.value);

        search_CODE(val, "BANK");
    };

    const onInputChangeEDT_KSV_INVOICE_MST1_TOT_AMT = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_INVOICE_MST1 = { ...dataEDT_KSV_INVOICE_MST1 };

        let tTypeVal = _dataEDT_KSV_INVOICE_MST1[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_INVOICE_MST1[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_INVOICE_MST1[`${name}`] = parseInt(val);

        setDataEDT_KSV_INVOICE_MST1(_dataEDT_KSV_INVOICE_MST1);
    };

    const [
        datasEDT_KSV_INVOICE_MST1_CURR_CD,
        setDatasEDT_KSV_INVOICE_MST1_CURR_CD,
    ] = useState([]);
    const [
        dataEDT_KSV_INVOICE_MST1_CURR_CD,
        setDataEDT_KSV_INVOICE_MST1_CURR_CD,
    ] = useState({});

    const editEDT_KSV_INVOICE_MST1_CURR_CD = (argValue) => {
        let _dataEDT_KSV_INVOICE_MST1_CURR_CD =
            datasEDT_KSV_INVOICE_MST1_CURR_CD.filter(
                (val) => val.CD_CODE === argValue,
            );
        setDataEDT_KSV_INVOICE_MST1_CURR_CD(
            _dataEDT_KSV_INVOICE_MST1_CURR_CD[0],
        );
    };

    const onDropdownChangeEDT_KSV_INVOICE_MST1_CURR_CD = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataEDT_KSV_INVOICE_MST1 = { ...dataEDT_KSV_INVOICE_MST1 };

        let tTypeVal = _dataEDT_KSV_INVOICE_MST1[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_KSV_INVOICE_MST1[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_KSV_INVOICE_MST1[`${name}`] = parseInt(val);
        }

        _dataEDT_KSV_INVOICE_MST1.CURR_CD = val;

        setDataEDT_KSV_INVOICE_MST1(_dataEDT_KSV_INVOICE_MST1);
        setDataEDT_KSV_INVOICE_MST1_CURR_CD(e.value);
    };

    const [
        datasEDT_KSV_INVOICE_MST1_INVOICE_NEGO_TYPE,
        setDatasEDT_KSV_INVOICE_MST1_INVOICE_NEGO_TYPE,
    ] = useState([]);
    const [
        dataEDT_KSV_INVOICE_MST1_INVOICE_NEGO_TYPE,
        setDataEDT_KSV_INVOICE_MST1_INVOICE_NEGO_TYPE,
    ] = useState({});

    const editEDT_KSV_INVOICE_MST1_INVOICE_NEGO_TYPE = (argValue) => {
        let _dataEDT_KSV_INVOICE_MST1_INVOICE_NEGO_TYPE =
            datasEDT_KSV_INVOICE_MST1_INVOICE_NEGO_TYPE.filter(
                (val) => val.CD_CODE === argValue,
            );
        setDataEDT_KSV_INVOICE_MST1_INVOICE_NEGO_TYPE(
            _dataEDT_KSV_INVOICE_MST1_INVOICE_NEGO_TYPE[0],
        );
    };

    const onDropdownChangeEDT_KSV_INVOICE_MST1_INVOICE_NEGO_TYPE = (
        e,
        name,
    ) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataEDT_KSV_INVOICE_MST1 = { ...dataEDT_KSV_INVOICE_MST1 };

        let tTypeVal = _dataEDT_KSV_INVOICE_MST1[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_KSV_INVOICE_MST1[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_KSV_INVOICE_MST1[`${name}`] = parseInt(val);
        }

        _dataEDT_KSV_INVOICE_MST1.INVOICE_NEGO_TYPE = val;

        setDataEDT_KSV_INVOICE_MST1(_dataEDT_KSV_INVOICE_MST1);
        setDataEDT_KSV_INVOICE_MST1_INVOICE_NEGO_TYPE(e.value);
    };

    const onCalChangeEDT_KSV_INVOICE_MST1_START_DATE = (e, name) => {
        let val1 = e.value || "";
        let val = "";
        if (val1 === "") {
            val = "";
        } else {
            val = getDateVal(val1);
        }

        let _dataEDT_KSV_INVOICE_MST1 = { ...dataEDT_KSV_INVOICE_MST1 };
        _dataEDT_KSV_INVOICE_MST1[`${name}`] = val;
        setDataEDT_KSV_INVOICE_MST1(_dataEDT_KSV_INVOICE_MST1);
    };

    const onInputChangeEDT_KSV_INVOICE_MST1_EXCHANGE_COMM = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_INVOICE_MST1 = { ...dataEDT_KSV_INVOICE_MST1 };

        let tTypeVal = _dataEDT_KSV_INVOICE_MST1[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_INVOICE_MST1[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_INVOICE_MST1[`${name}`] = parseInt(val);

        setDataEDT_KSV_INVOICE_MST1(_dataEDT_KSV_INVOICE_MST1);
    };

    const onCalChangeEDT_KSV_INVOICE_MST1_END_DATE = (e, name) => {
        let val1 = e.value || "";
        let val = "";
        if (val1 === "") {
            val = "";
        } else {
            val = getDateVal(val1);
        }

        let _dataEDT_KSV_INVOICE_MST1 = { ...dataEDT_KSV_INVOICE_MST1 };
        _dataEDT_KSV_INVOICE_MST1[`${name}`] = val;
        setDataEDT_KSV_INVOICE_MST1(_dataEDT_KSV_INVOICE_MST1);
    };

    const onInputChangeEDT_KSV_INVOICE_MST1_HANDLING_CHARGE = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_INVOICE_MST1 = { ...dataEDT_KSV_INVOICE_MST1 };

        let tTypeVal = _dataEDT_KSV_INVOICE_MST1[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_INVOICE_MST1[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_INVOICE_MST1[`${name}`] = parseInt(val);

        setDataEDT_KSV_INVOICE_MST1(_dataEDT_KSV_INVOICE_MST1);
    };

    const onCalChangeEDT_KSV_INVOICE_MST1_BILL_DATE = (e, name) => {
        let val1 = e.value || "";
        let val = "";
        if (val1 === "") {
            val = "";
        } else {
            val = getDateVal(val1);
        }

        let _dataEDT_KSV_INVOICE_MST1 = { ...dataEDT_KSV_INVOICE_MST1 };
        _dataEDT_KSV_INVOICE_MST1[`${name}`] = val;
        setDataEDT_KSV_INVOICE_MST1(_dataEDT_KSV_INVOICE_MST1);
    };

    const onInputChangeEDT_KSV_INVOICE_MST1_POSTAGE = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_INVOICE_MST1 = { ...dataEDT_KSV_INVOICE_MST1 };

        let tTypeVal = _dataEDT_KSV_INVOICE_MST1[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_INVOICE_MST1[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_INVOICE_MST1[`${name}`] = parseInt(val);

        setDataEDT_KSV_INVOICE_MST1(_dataEDT_KSV_INVOICE_MST1);
    };

    const onInputChangeEDT_KSV_INVOICE_MST1_DELAY_DAYS = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_INVOICE_MST1 = { ...dataEDT_KSV_INVOICE_MST1 };

        let tTypeVal = _dataEDT_KSV_INVOICE_MST1[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_INVOICE_MST1[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_INVOICE_MST1[`${name}`] = parseInt(val);

        setDataEDT_KSV_INVOICE_MST1(_dataEDT_KSV_INVOICE_MST1);
    };

    const onInputChangeEDT_KSV_INVOICE_MST1_TOT_AMT2 = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_INVOICE_MST1 = { ...dataEDT_KSV_INVOICE_MST1 };

        let tTypeVal = _dataEDT_KSV_INVOICE_MST1[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_INVOICE_MST1[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_INVOICE_MST1[`${name}`] = parseInt(val);

        setDataEDT_KSV_INVOICE_MST1(_dataEDT_KSV_INVOICE_MST1);
    };

    const onInputChangeEDT_KSV_INVOICE_MST1_AMT_WON = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_INVOICE_MST1 = { ...dataEDT_KSV_INVOICE_MST1 };

        let tTypeVal = _dataEDT_KSV_INVOICE_MST1[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_INVOICE_MST1[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_INVOICE_MST1[`${name}`] = parseInt(val);

        setDataEDT_KSV_INVOICE_MST1(_dataEDT_KSV_INVOICE_MST1);
    };

    const onInputChangeEDT_KSV_INVOICE_MST1_DELAY_INTEREST = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_INVOICE_MST1 = { ...dataEDT_KSV_INVOICE_MST1 };

        let tTypeVal = _dataEDT_KSV_INVOICE_MST1[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_INVOICE_MST1[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_INVOICE_MST1[`${name}`] = parseInt(val);

        setDataEDT_KSV_INVOICE_MST1(_dataEDT_KSV_INVOICE_MST1);
    };

    const onInputChangeEDT_KSV_INVOICE_MST1_DELAY_RATE = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_INVOICE_MST1 = { ...dataEDT_KSV_INVOICE_MST1 };

        let tTypeVal = _dataEDT_KSV_INVOICE_MST1[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_INVOICE_MST1[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_INVOICE_MST1[`${name}`] = parseInt(val);

        setDataEDT_KSV_INVOICE_MST1(_dataEDT_KSV_INVOICE_MST1);
    };

    const onInputChangeEDT_KSV_INVOICE_MST1_LESS_CHARGE = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_INVOICE_MST1 = { ...dataEDT_KSV_INVOICE_MST1 };

        let tTypeVal = _dataEDT_KSV_INVOICE_MST1[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_INVOICE_MST1[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_INVOICE_MST1[`${name}`] = parseInt(val);

        setDataEDT_KSV_INVOICE_MST1(_dataEDT_KSV_INVOICE_MST1);
    };

    const onInputChangeEDT_KSV_INVOICE_MST1_GRAND_TOT = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_INVOICE_MST1 = { ...dataEDT_KSV_INVOICE_MST1 };

        let tTypeVal = _dataEDT_KSV_INVOICE_MST1[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_INVOICE_MST1[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_INVOICE_MST1[`${name}`] = parseInt(val);

        setDataEDT_KSV_INVOICE_MST1(_dataEDT_KSV_INVOICE_MST1);
    };

    const [
        datasEDT_KSV_INVOICE_MST1_BANK_CD,
        setDatasEDT_KSV_INVOICE_MST1_BANK_CD,
    ] = useState([]);
    const [
        dataEDT_KSV_INVOICE_MST1_BANK_CD,
        setDataEDT_KSV_INVOICE_MST1_BANK_CD,
    ] = useState({});

    const onDropdownChangeEDT_KSV_INVOICE_MST1_BANK_CD = (e, name) => {
        let val = (e.value && e.value.BANK_CD) || "";

        let _dataEDT_KSV_INVOICE_MST1 = { ...dataEDT_KSV_INVOICE_MST1 };

        let tTypeVal = _dataEDT_KSV_INVOICE_MST1[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_KSV_INVOICE_MST1[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_KSV_INVOICE_MST1[`${name}`] = parseInt(val);
        }

        _dataEDT_KSV_INVOICE_MST1.BANK_CD = val;

        setDataEDT_KSV_INVOICE_MST1(_dataEDT_KSV_INVOICE_MST1);
        setDataEDT_KSV_INVOICE_MST1_BANK_CD(e.value);
    };

    /**EDIT KSV_INVOICE_MST */
    const [datasEDT_KSV_INVOICE_MST, setDatasEDT_KSV_INVOICE_MST] = useState(
        [],
    );
    const [dataEDT_KSV_INVOICE_MST, setDataEDT_KSV_INVOICE_MST] = useState(
        emptyEDT_KSV_INVOICE_MST,
    );

    const datasetEDT_KSV_INVOICE_MST = (argData) => {
        var _argData = { ...dataEDT_KSV_INVOICE_MST };
        _argData.INVOICE_NO = argData.INVOICE_NO;
        _argData.BILL_AMT = serviceLib.numComAndFix(argData.BILL_AMT, 2);
        setDataEDT_KSV_INVOICE_MST(_argData);
        // editEDT_KSV_INVOICE_MST_INVOICE_NO(argData.INVOICE_NO);
    };

    const [
        datasEDT_KSV_INVOICE_MST_INVOICE_NO,
        setDatasEDT_KSV_INVOICE_MST_INVOICE_NO,
    ] = useState([]);
    const [
        dataEDT_KSV_INVOICE_MST_INVOICE_NO,
        setDataEDT_KSV_INVOICE_MST_INVOICE_NO,
    ] = useState({});

    const onDropdownChangeEDT_KSV_INVOICE_MST_INVOICE_NO = (e, name) => {
        let val = (e.value && e.value.INVOICE_NO) || "";

        let _dataEDT_KSV_INVOICE_MST = { ...dataEDT_KSV_INVOICE_MST };

        let tTypeVal = _dataEDT_KSV_INVOICE_MST[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_KSV_INVOICE_MST[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_KSV_INVOICE_MST[`${name}`] = parseInt(val);
        }

        _dataEDT_KSV_INVOICE_MST.INVOICE_NO = val;
        _dataEDT_KSV_INVOICE_MST.BILL_AMT = e.value.INVOICE_AMT;

        setDataEDT_KSV_INVOICE_MST(_dataEDT_KSV_INVOICE_MST);
        setDataEDT_KSV_INVOICE_MST_INVOICE_NO(e.value);
    };

    const onInputChangeEDT_KSV_INVOICE_MST_BILL_AMT = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_INVOICE_MST = { ...dataEDT_KSV_INVOICE_MST };

        let tTypeVal = _dataEDT_KSV_INVOICE_MST[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_INVOICE_MST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_INVOICE_MST[`${name}`] = parseInt(val);

        setDataEDT_KSV_INVOICE_MST(_dataEDT_KSV_INVOICE_MST);
    };

    useEffect(() => {
        var tRetDate = serviceLib.getCurrDate().substring(0, 8);
        var tObj0 = { ...dataEDT_KSV_INVOICE_MST1 };
        tObj0.S_START_DATE = `${tRetDate.substring(0, 6)}01`;
        tObj0.E_START_DATE = `${tRetDate}`;
        setDataEDT_KSV_INVOICE_MST1(tObj0);

        var _tObj = {};
        _tObj.BUYER_CD = "";

        serviceS0607_LC_NEGO.mgrQuery_CODE(_tObj).then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                setDatasEDT_KSV_INVOICE_MST1_BUYER_CD(data.BUYER_CD);
                setDataEDT_KSV_INVOICE_MST1_BUYER_CD(data.BUYER_CD[0]);

                setDatasEDT_KSV_INVOICE_MST1_CURR_CD(data.CURR_CD);
                setDataEDT_KSV_INVOICE_MST1_CURR_CD(data.CURR_CD[0]);

                setDatasEDT_KSV_INVOICE_MST1_INVOICE_NEGO_TYPE(
                    data.INVOICE_NEGO_TYPE,
                );
                setDataEDT_KSV_INVOICE_MST1_INVOICE_NEGO_TYPE(
                    data.INVOICE_NEGO_TYPE[0],
                );

                setDatasEDT_KSV_INVOICE_MST1_BANK_CD(data.BANK_CD);
                setDataEDT_KSV_INVOICE_MST1_BANK_CD(data.BANK_CD[0]);

                setDatasEDT_KSV_INVOICE_MST_INVOICE_NO(data.INVOICE_NO);
                setDataEDT_KSV_INVOICE_MST_INVOICE_NO(data.INVOICE_NO[0]);
            } else {
                console.log(
                    "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });

        // search_LIST_1();
    }, []);

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
                style={{ width: "80rem", height: "25rem" }}
            >
                <span className="af-span-3-0" style={{ width: "39rem" }}>
                    <p className="af-span-p" style={{ width: "12rem" }}>Ref NO</p>
                    <div className="af-span-div" style={{ width: "26rem" }}>
                        <InputText
                            style={{ width: "26rem" }}
                            id="id_INVOICE_NO"
                            value={dataEDT_KSV_INVOICE_MST1.REF_NO}
                            onChange={(e) =>
                                onInputChangeEDT_KSV_INVOICE_MST1_REF_NO(
                                    e,
                                    "REF_NO",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "23rem" }}>
                    <p className="af-span-p" style={{ width: "12rem" }}>Start Date</p>
                    <div className="af-span-div" style={{ width: "10rem" }}>
                        <Calendar
                            showButtonBar
                            style={{ width: "10rem" }}
                            dateFormat="yy-mm-dd"
                            id="id_SHIP_DATE"
                            value={changeDateVal(
                                dataEDT_KSV_INVOICE_MST1.S_START_DATE,
                            )}
                            onChange={(e) =>
                                onCalChangeEDT_KSV_INVOICE_MST1_S_START_DATE(
                                    e,
                                    "S_START_DATE",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "12rem" }}>
                    <p className="af-span-p" style={{ width: "1rem" }}>~</p>
                    <div className="af-span-div" style={{ width: "10rem" }}>
                        <Calendar
                            showButtonBar
                            style={{ width: "10rem" }}
                            dateFormat="yy-mm-dd"
                            id="id_SHIP_DATE"
                            value={changeDateVal(
                                dataEDT_KSV_INVOICE_MST1.E_START_DATE,
                            )}
                            onChange={(e) =>
                                onCalChangeEDT_KSV_INVOICE_MST1_E_START_DATE(
                                    e,
                                    "E_START_DATE",
                                )
                            }
                        />
                    </div>
                </span>

                <span className="af-span-3" style={{ width: "79rem" }}>
                    <p className="af-span-p" style={{ width: "12rem" }}>Buyer</p>
                    <div className="af-span-div" style={{ width: "66rem" }}>
                        <Dropdown
                            style={{ width: "66rem" }}
                            id="id_INVOICE_TYPE"
                            value={dataEDT_KSV_INVOICE_MST1_BUYER_CD}
                            onChange={(e) =>
                                onDropdownChangeEDT_KSV_INVOICE_MST1_BUYER_CD(
                                    e,
                                    "BUYER_CD",
                                )
                            }
                            options={datasEDT_KSV_INVOICE_MST1_BUYER_CD}
                            optionLabel="BUYER_NAME"
                            placeholder=""
                            editable
                            filter
                        ></Dropdown>
                    </div>
                </span>

                <span className="af-span-3" style={{ width: "25rem" }}>
                    <p className="af-span-p" style={{ width: "12rem" }}>Amt</p>
                    <div className="af-span-div" style={{ width: "10rem" }}>
                        <InputText
                            style={{ width: "10rem" }}
                            id="id_INVOICE_NO"
                            value={dataEDT_KSV_INVOICE_MST1.TOT_AMT}
                            onChange={(e) =>
                                onInputChangeEDT_KSV_INVOICE_MST1_TOT_AMT(
                                    e,
                                    "TOT_AMT",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "15rem" }}>
                    <p className="af-span-p" style={{ width: "4rem" }}>Curr</p>
                    <div className="af-span-div" style={{ width: "10rem" }}>
                        <Dropdown
                            style={{ width: "10rem" }}
                            id="id_INVOICE_TYPE"
                            value={dataEDT_KSV_INVOICE_MST1_CURR_CD}
                            onChange={(e) =>
                                onDropdownChangeEDT_KSV_INVOICE_MST1_CURR_CD(
                                    e,
                                    "CURR_CD",
                                )
                            }
                            options={datasEDT_KSV_INVOICE_MST1_CURR_CD}
                            optionLabel="CD_NAME"
                            placeholder=""
                            editable
                        ></Dropdown>
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "15rem" }}>
                    <p className="af-span-p" style={{ width: "4rem" }}>Type</p>
                    <div className="af-span-div" style={{ width: "10rem" }}>
                        <Dropdown
                            style={{ width: "10rem" }}
                            id="id_INVOICE_TYPE"
                            value={dataEDT_KSV_INVOICE_MST1_INVOICE_NEGO_TYPE}
                            onChange={(e) =>
                                onDropdownChangeEDT_KSV_INVOICE_MST1_INVOICE_NEGO_TYPE(
                                    e,
                                    "INVOICE_NEGO_TYPE",
                                )
                            }
                            options={
                                datasEDT_KSV_INVOICE_MST1_INVOICE_NEGO_TYPE
                            }
                            optionLabel="CD_NAME"
                            placeholder=""
                            editable
                        ></Dropdown>
                    </div>
                </span>

                <span className="af-span-3" style={{ width: "39rem" }}>
                    <p className="af-span-p" style={{ width: "12rem" }}>Nego Date</p>
                    <div className="af-span-div" style={{ width: "26rem" }}>
                        <Calendar
                            showButtonBar
                            style={{ width: "26rem" }}
                            dateFormat="yy-mm-dd"
                            id="id_SHIP_DATE"
                            value={changeDateVal(
                                dataEDT_KSV_INVOICE_MST1.START_DATE,
                            )}
                            onChange={(e) =>
                                onCalChangeEDT_KSV_INVOICE_MST1_START_DATE(
                                    e,
                                    "START_DATE",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "39rem" }}>
                    <p className="af-span-p" style={{ width: "12rem" }}>Exchange Rate</p>
                    <div className="af-span-div" style={{ width: "26rem" }}>
                        <InputText
                            style={{ width: "26rem" }}
                            id="id_INVOICE_NO"
                            value={dataEDT_KSV_INVOICE_MST1.EXCHANGE_COMM}
                            onChange={(e) =>
                                onInputChangeEDT_KSV_INVOICE_MST1_EXCHANGE_COMM(
                                    e,
                                    "EXCHANGE_COMM",
                                )
                            }
                        />
                    </div>
                </span>

                <span className="af-span-3" style={{ width: "39rem" }}>
                    <p className="af-span-p" style={{ width: "12rem" }}>End Date</p>
                    <div className="af-span-div" style={{ width: "26rem" }}>
                        <Calendar
                            showButtonBar
                            style={{ width: "26rem" }}
                            dateFormat="yy-mm-dd"
                            id="id_SHIP_DATE"
                            value={changeDateVal(
                                dataEDT_KSV_INVOICE_MST1.END_DATE,
                            )}
                            onChange={(e) =>
                                onCalChangeEDT_KSV_INVOICE_MST1_END_DATE(
                                    e,
                                    "END_DATE",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "39rem" }}>
                    <p className="af-span-p" style={{ width: "12rem" }}>Handling Fee</p>
                    <div className="af-span-div" style={{ width: "26rem" }}>
                        <InputText
                            style={{ width: "26rem" }}
                            id="id_INVOICE_NO"
                            value={dataEDT_KSV_INVOICE_MST1.HANDLING_CHARGE}
                            onChange={(e) =>
                                onInputChangeEDT_KSV_INVOICE_MST1_HANDLING_CHARGE(
                                    e,
                                    "HANDLING_CHARGE",
                                )
                            }
                        />
                    </div>
                </span>

                <span className="af-span-3" style={{ width: "39rem" }}>
                    <p className="af-span-p" style={{ width: "12rem" }}>Pay Date</p>
                    <div className="af-span-div" style={{ width: "26rem" }}>
                        <Calendar
                            showButtonBar
                            style={{ width: "26rem" }}
                            dateFormat="yy-mm-dd"
                            id="id_SHIP_DATE"
                            value={changeDateVal(
                                dataEDT_KSV_INVOICE_MST1.BILL_DATE,
                            )}
                            onChange={(e) =>
                                onCalChangeEDT_KSV_INVOICE_MST1_BILL_DATE(
                                    e,
                                    "BILL_DATE",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "39rem" }}>
                    <p className="af-span-p" style={{ width: "12rem" }}>Postage</p>
                    <div className="af-span-div" style={{ width: "26rem" }}>
                        <InputText
                            style={{ width: "26rem" }}
                            id="id_INVOICE_NO"
                            value={dataEDT_KSV_INVOICE_MST1.POSTAGE}
                            onChange={(e) =>
                                onInputChangeEDT_KSV_INVOICE_MST1_POSTAGE(
                                    e,
                                    "POSTAGE",
                                )
                            }
                        />
                    </div>
                </span>

                <span className="af-span-3" style={{ width: "25rem" }}>
                    <p className="af-span-p" style={{ width: "12rem" }}>Delay Date</p>
                    <div className="af-span-div" style={{ width: "10rem" }}>
                        <InputText
                            style={{ width: "10rem" }}
                            id="id_INVOICE_NO"
                            value={dataEDT_KSV_INVOICE_MST1.DELAY_DAYS}
                            onChange={(e) =>
                                onInputChangeEDT_KSV_INVOICE_MST1_DELAY_DAYS(
                                    e,
                                    "DELAY_DAYS",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "15rem" }}>
                    <p className="af-span-p" style={{ width: "4rem" }}>Tot(W)</p>
                    <div className="af-span-div" style={{ width: "10rem" }}>
                        <InputText
                            style={{ width: "10rem" }}
                            id="id_INVOICE_NO"
                            value={dataEDT_KSV_INVOICE_MST1.TOT_AMT2}
                            onChange={(e) =>
                                onInputChangeEDT_KSV_INVOICE_MST1_TOT_AMT2(
                                    e,
                                    "TOT_AMT2",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "15rem" }}>
                    <p className="af-span-p" style={{ width: "4rem" }}>Amt(W)</p>
                    <div className="af-span-div" style={{ width: "10rem" }}>
                        <InputText
                            style={{ width: "10rem" }}
                            id="id_INVOICE_NO"
                            value={dataEDT_KSV_INVOICE_MST1.AMT_WON}
                            onChange={(e) =>
                                onInputChangeEDT_KSV_INVOICE_MST1_AMT_WON(
                                    e,
                                    "AMT_WON",
                                )
                            }
                        />
                    </div>
                </span>

                <span className="af-span-3" style={{ width: "39rem" }}>
                    <p className="af-span-p" style={{ width: "12rem" }}>Delay Interest</p>
                    <div className="af-span-div" style={{ width: "26rem" }}>
                        <InputText
                            style={{ width: "26rem" }}
                            id="id_INVOICE_NO"
                            value={dataEDT_KSV_INVOICE_MST1.DELAY_INTEREST}
                            onChange={(e) =>
                                onInputChangeEDT_KSV_INVOICE_MST1_DELAY_INTEREST(
                                    e,
                                    "DELAY_INTEREST",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "39rem" }}>
                    <p className="af-span-p" style={{ width: "12rem" }}>Rate</p>
                    <div className="af-span-div" style={{ width: "26rem" }}>
                        <InputText
                            style={{ width: "10rem" }}
                            id="id_INVOICE_NO"
                            value={dataEDT_KSV_INVOICE_MST1.DELAY_RATE}
                            onChange={(e) =>
                                onInputChangeEDT_KSV_INVOICE_MST1_DELAY_RATE(
                                    e,
                                    "DELAY_RATE",
                                )
                            }
                        />
                    </div>
                </span>

                <span className="af-span-3" style={{ width: "39rem" }}>
                    <p className="af-span-p" style={{ width: "12rem" }}>Less Charge</p>
                    <div className="af-span-div" style={{ width: "26rem" }}>
                        <InputText
                            style={{ width: "26rem" }}
                            id="id_INVOICE_NO"
                            value={dataEDT_KSV_INVOICE_MST1.LESS_CHARGE}
                            onChange={(e) =>
                                onInputChangeEDT_KSV_INVOICE_MST1_LESS_CHARGE(
                                    e,
                                    "LESS_CHARGE",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "39rem" }}>
                    <p className="af-span-p" style={{ width: "12rem" }}>Grand Tot</p>
                    <div className="af-span-div" style={{ width: "26rem" }}>
                        <InputText
                            style={{ width: "26rem" }}
                            id="id_INVOICE_NO"
                            value={dataEDT_KSV_INVOICE_MST1.GRAND_TOT}
                            onChange={(e) =>
                                onInputChangeEDT_KSV_INVOICE_MST1_GRAND_TOT(
                                    e,
                                    "GRAND_TOT",
                                )
                            }
                        />
                    </div>
                </span>

                <span className="af-span-3" style={{ width: "39rem" }}>
                    <p className="af-span-p" style={{ width: "12rem" }}>Bank</p>
                    <div className="af-span-div" style={{ width: "26rem" }}>
                        <Dropdown
                            style={{ width: "26rem" }}
                            id="id_INVOICE_TYPE"
                            value={dataEDT_KSV_INVOICE_MST1_BANK_CD}
                            onChange={(e) =>
                                onDropdownChangeEDT_KSV_INVOICE_MST1_BANK_CD(
                                    e,
                                    "BANK_CD",
                                )
                            }
                            options={datasEDT_KSV_INVOICE_MST1_BANK_CD}
                            optionLabel="BANK_NAME"
                            placeholder=""
                            editable
                            filter
                        ></Dropdown>
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "39rem" }}>
                    <div className="af-span-div-btn" style={{ width: "12rem" }}>
                        <Tooltip
                            className="menuCodeTooltip"
                            target={`#btnSearch`}
                            content={`Alt+S`}
                            position="bottom"
                        />

                        <Button
                            style={{ width: "12rem" }}
                            label={
                                <span>
                                    Search(<u>S</u>)
                                </span>
                            }
                            accessKey="S"
                            id="btnSearch"
                            className="p-button-text"
                            onClick={search_LIST_1}
                        />
                    </div>
                </span>
            </div>

            <div
                className="af-div-second"
                style={{ width: "42rem", height: "25rem", marginLeft: "10px" }}
            >
                <div
                    className="af-div-first"
                    style={{ width: "42rem", height: "15rem" }}
                >
                    <AFDataTable preventUnrelatedRerender
                        ref={dt_TBL_KSV_INVOICE_MST}
                        size="small"
                        value={datasTBL_KSV_INVOICE_MST}
                        tableStyle={{ tableLayout: "fixed" }}
                        resizableColumns
                        columnResizeMode="expand"
                        loading={loadingTBL_KSV_INVOICE_MST}
                        showGridlines
                        selectionMode="checkbox"
                        selection={selectedTBL_KSV_INVOICE_MST}
                        onSelectionChange={(e) => {
                            setFlagSelectModeTBL_KSV_INVOICE_MST(true);
                            setSelectedTBL_KSV_INVOICE_MST(e.value);
                            console.log(
                                "selected length:" +
                                    selectedTBL_KSV_INVOICE_MST.length,
                            );
                            onRowClick1TBL_KSV_INVOICE_MST(e.value);
                        }}
                        onRowClick={onRowClickTBL_KSV_INVOICE_MST}
                        dataKey="id"
                        className="datatable-responsive"
                        virtualScrollerOptions={{ itemSize: 20 }}
                        emptyMessage=" " //header={headerTBL_KSV_INVOICE_MST}
                        responsiveLayout="scroll"
                        scrollable
                        scrollHeight="17rem"
                    >
                        <AFColumn field="INVOICE_NO" headerClassName="t-header" header="Invoice NO" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                        <AFColumn field="BILL_AMT" headerClassName="t-header" header="Amt" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.BILL_AMT, 2) } ></AFColumn>
                    </AFDataTable>
                </div>

                <div
                    className="af-div-first"
                    style={{ width: "42rem", height: "9rem" }}
                >
                    <span className="af-span-3-0" style={{ width: "39rem" }}>
                        <p className="af-span-p" style={{ width: "12rem" }}>Invoice NO</p>
                        <div className="af-span-div" style={{ width: "26rem" }}>
                            <Dropdown
                                style={{ width: "26rem" }}
                                id="id_INVOICE_TYPE"
                                value={dataEDT_KSV_INVOICE_MST_INVOICE_NO}
                                onChange={(e) =>
                                    onDropdownChangeEDT_KSV_INVOICE_MST_INVOICE_NO(
                                        e,
                                        "INVOICE_NO",
                                    )
                                }
                                options={datasEDT_KSV_INVOICE_MST_INVOICE_NO}
                                optionLabel="INVOICE_NAME"
                                placeholder=""
                                editable
                                filter
                            ></Dropdown>
                        </div>
                    </span>
                    <span className="af-span-3" style={{ width: "39rem" }}>
                        <p className="af-span-p" style={{ width: "12rem" }}>Invoice Amt</p>
                        <div className="af-span-div" style={{ width: "26rem" }}>
                            <InputText
                                style={{ width: "26rem", textAlign: "right" }}
                                id="id_INVOICE_AMT"
                                value={dataEDT_KSV_INVOICE_MST.BILL_AMT}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_INVOICE_MST_BILL_AMT(
                                        e,
                                        "BILL_AMT",
                                    )
                                }
                            />
                        </div>
                    </span>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            marginTop: "10px",
                        }}
                    >
                        <span className="af-span-3" style={{ width: "12rem" }}>
                            <div
                                className="af-span-div"
                                style={{ width: "11rem" }}
                            >
                                <Button
                                    style={{ width: "11rem" }}
                                    label="Add"
                                    className="p-button-text"
                                    onClick={process_INSERT_INVOICE}
                                />
                            </div>
                        </span>
                        <span className="af-span-3" style={{ width: "12rem" }}>
                            <div
                                className="af-span-div"
                                style={{ width: "11rem" }}
                            >
                                <Button
                                    style={{ width: "11rem" }}
                                    label="Delete"
                                    className="p-button-text"
                                    onClick={process_DELETE_INVOICE}
                                />
                            </div>
                        </span>
                    </div>
                </div>
            </div>

            <div
                className="af-div-first"
                style={{ width: "123rem", height: "32.2rem" }}
            >
                <AFDataTable preventUnrelatedRerender
                    ref={dt_TBL_KSV_INVOICE_MST1}
                    size="small"
                    value={datasTBL_KSV_INVOICE_MST1}
                    tableStyle={{ tableLayout: "fixed" }}
                    resizableColumns
                    columnResizeMode="expand"
                    showGridlines
                    selectionMode="checkbox"
                    loading={loadingTBL_KSV_INVOICE_MST1}
                    selection={selectedTBL_KSV_INVOICE_MST1}
                    onSelectionChange={(e) => {
                        setFlagSelectModeTBL_KSV_INVOICE_MST1(true);
                        setSelectedTBL_KSV_INVOICE_MST1(e.value);
                        console.log(
                            "selected length:" +
                                selectedTBL_KSV_INVOICE_MST1.length,
                        );
                        onRowClick1TBL_KSV_INVOICE_MST1(e.value);
                    }}
                    onRowClick={onRowClickTBL_KSV_INVOICE_MST1}
                    dataKey="id"
                    className="datatable-responsive"
                    virtualScrollerOptions={{ itemSize: 20 }}
                    emptyMessage=" " //header={headerTBL_KSV_INVOICE_MST1}
                    responsiveLayout="scroll"
                    scrollable
                    scrollHeight="340px"
                >
                    <AFColumn field="REF_NO" headerClassName="t-header" header="Ref No" style={{ width: "13rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="TOT_AMT" headerClassName="t-header" header="AMT" style={{ width: "8rem", height: "1.8rem", flexBasis: "auto", }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.TOT_AMT, 2) } ></AFColumn>
                    <AFColumn field="BAL_AMT" headerClassName="t-header" header="Bal AMT" style={{ width: "8rem", height: "1.8rem", flexBasis: "auto", }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.BAL_AMT, 2) } ></AFColumn>
                    <AFColumn field="CURR_CD" headerClassName="t-header" header="Curr" style={{ width: "5rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="START_DATE" headerClassName="t-header" header="Nego Date" style={{ width: "8rem", height: "1.8rem", flexBasis: "auto", }} body={(rowData) => serviceLib.dateFormatHMS(rowData.START_DATE) } ></AFColumn>
                    <AFColumn field="END_DATE" headerClassName="t-header" header="Due Date" style={{ width: "8rem", height: "1.8rem", flexBasis: "auto", }} body={(rowData) => serviceLib.dateFormatHMS(rowData.END_DATE) } ></AFColumn>
                    <AFColumn field="BILL_DATE" headerClassName="t-header" header="Payment Date" style={{ width: "9rem", height: "1.8rem", flexBasis: "auto", }} body={(rowData) => serviceLib.dateFormatHMS(rowData.BILL_DATE) } ></AFColumn>
                    <AFColumn field="DELAY_DAYS" headerClassName="t-header" header="Delay Date" style={{ width: "8rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="DELAY_INTEREST" headerClassName="t-header" header="Delay Interest" style={{ width: "9rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="LESS_CHARGE" headerClassName="t-header" header="Less Charge" style={{ width: "9rem", height: "1.8rem", flexBasis: "auto", }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.LESS_CHARGE, 2) } ></AFColumn>
                    <AFColumn field="BANK_NAME" headerClassName="t-header" header="Bank" style={{ width: "15rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="EXCHANGE_COMM" headerClassName="t-header" header="Exchange" style={{ width: "8rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="HANDLING_CHARGE" headerClassName="t-header" header="Handling Charge" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.HANDLING_CHARGE, 2) } ></AFColumn>
                    <AFColumn field="POSTAGE" headerClassName="t-header" header="Postage" style={{ width: "7rem", height: "1.8rem", flexBasis: "auto", }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.POSTAGE, 2) } ></AFColumn>
                    <AFColumn field="AMT_WON" headerClassName="t-header" header="Amt Won" style={{ width: "8rem", height: "1.8rem", flexBasis: "auto", }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.AMT_WON, 2) } ></AFColumn>
                    <AFColumn field="AMT_CURR" headerClassName="t-header" header="Amt Curr" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="TOT_AMT2" headerClassName="t-header" header="Tot Amt2" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.TOT_AMT2, 2) } ></AFColumn>
                    <AFColumn field="INVOICE_NEGO_TYPE_N" headerClassName="t-header" header="Nego Type" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                </AFDataTable>
            </div>

            <div
                className="af-div-first"
                style={{ width: "123rem", height: "3rem" }}
            >
                <span className="af-span-3" style={{ width: "13rem" }}>
                    <div className="af-span-div-btn" style={{ width: "12rem" }}>
                        <Button
                            style={{ width: "12rem" }}
                            label="Registration"
                            className="p-button-text"
                            onClick={process_INSERT_LC_NEGO}
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "13rem" }}>
                    <div className="af-span-div-btn" style={{ width: "12rem" }}>
                        <Button
                            style={{ width: "12rem" }}
                            label="Modify"
                            className="p-button-text"
                            onClick={process_UPDATE_LC_NEGO}
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "13rem" }}>
                    <div className="af-span-div-btn" style={{ width: "12rem" }}>
                        <Button
                            style={{ width: "12rem" }}
                            label="Delete"
                            className="p-button-text"
                            onClick={process_DELETE_LC_NEGO}
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "13rem" }}>
                    <div className="af-span-div-btn" style={{ width: "12rem" }}>
                        <Button
                            style={{ width: "12rem" }}
                            label="Reset"
                            className="p-button-text"
                            onClick={process_RESET}
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

export default React.memo(S0607_LC_NEGO, comparisonFn);
