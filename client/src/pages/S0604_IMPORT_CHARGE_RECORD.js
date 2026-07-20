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
import { ServiceS0604_IMPORT_CHARGE_RECORD } from "../service/service_biz/ServiceS0604_IMPORT_CHARGE_RECORD";

import "./page_common.scss";

const emptyKCD_CODE = {
    id: 0,
    CD_GROUP: "",
    CD_CODE: "",
    CD_NAME: "",
    CD_FLAG: "",
};

const emptyTBL_KSV_INVOICE_MST = {
    id: 0,
    BUYER_NAME: "",
    PO_CD: "",
    ORDER_CD: "",
    STYLE_NAME: "",
    SHIP_QTY: "",
    SHIP_PRICE: "",
    ORD_AMT: "",
    IMPORT_CHARGE: "",
    FACTORY_NAME: "",
    INVOICE_NO: "",
};

const emptyEDT_KSV_INVOICE_MST = {
    INVOICE_NO: "",
    ORDER_AMT: 0,
    CURR_CD: "",
    TOTAL_AMT: 0,
    DUTY_AMT: 0,
    SHIP_DATE: "",
    DELIVERY_TYPE: "",
    VENDOR_NAME: 0,
    REMARK: "",
    BUYER_CD: "",
    FREIGHT_AMT: 0,
    COST_CLEAR: 0,
};

const S0604_IMPORT_CHARGE_RECORD = () => {
    const serviceLibRef = useRef(null);
    if (!serviceLibRef.current) {
        serviceLibRef.current = new ServiceLib();
        serviceLibRef.current.loginConfirm();
    }
    const serviceLib = serviceLibRef.current;
    const serviceS0604_IMPORT_CHARGE_RECORD =
        new ServiceS0604_IMPORT_CHARGE_RECORD();

    const toast = useRef(null);

    /* splitter 관련 */
    const [styleVal, setStyleVal] = useState({ width: "65vw" });

    const process_INSERT_IMPCHARGE = () => {
        var tInData1 = { ...dataEDT_KSV_INVOICE_MST };
        tInData1.USER_ID = serviceLib.getUserInfo().USER_ID;
        Object.keys(tInData1).forEach((col, i) => {
            if (tInData1[`${col}`] === null) {
                if (typeof tInData1[`${col}`] === "string")
                    tInData1[`${col}`] = "";
                else tInData1[`${col}`] = 0;
            }
        });

        serviceS0604_IMPORT_CHARGE_RECORD
            .mgrInsert_INSERT_IMPCHARGE(tInData1)
            .then((data) => {
                if (typeof data.graphQLErrors === "undefined") {
                    if (typeof data.length === "undefined") {
                    } else {
                        console.log(
                            "ServiceMgrKCD_BUYER.mgr1KcdStyle call => " +
                                data.length,
                        );
                        toast.current.show({
                            severity: "success",
                            summary: "SUCCEED:Insert ImpCharge",
                            detail: data[0].CODE,
                            life: 3000,
                        });
                    }
                } else {
                    console.log(
                        "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                    toast.current.show({
                        severity: "success",
                        summary: "ERROR:Insert ImpCharge",
                        detail: "",
                        life: 3000,
                    });
                }
            });
    };

    const process_UPDATE_IMPCHARGE = () => {
        var tInData1 = { ...dataEDT_KSV_INVOICE_MST };
        tInData1.USER_ID = serviceLib.getUserInfo().USER_ID;
        Object.keys(tInData1).forEach((col, i) => {
            if (tInData1[`${col}`] === null) {
                if (typeof tInData1[`${col}`] === "string")
                    tInData1[`${col}`] = "";
                else tInData1[`${col}`] = 0;
            }
        });

        serviceS0604_IMPORT_CHARGE_RECORD
            .mgrInsert_UPDATE_IMPCHARGE(tInData1)
            .then((data) => {
                if (typeof data.graphQLErrors === "undefined") {
                    if (typeof data.length === "undefined") {
                    } else {
                        console.log(
                            "ServiceMgrKCD_BUYER.mgr1KcdStyle call => " +
                                data.length,
                        );
                        toast.current.show({
                            severity: "success",
                            summary: "SUCCEED:Update ImpCharge",
                            detail: data[0].CODE,
                            life: 3000,
                        });
                    }
                } else {
                    console.log(
                        "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                    toast.current.show({
                        severity: "success",
                        summary: "ERROR:Update ImpCharge",
                        detail: "",
                        life: 3000,
                    });
                }
            });
    };

    const process_DELETE_IMPCHARGE = () => {
        var tInData1 = { ...dataEDT_KSV_INVOICE_MST };
        tInData1.USER_ID = serviceLib.getUserInfo().USER_ID;
        Object.keys(tInData1).forEach((col, i) => {
            if (tInData1[`${col}`] === null) {
                if (typeof tInData1[`${col}`] === "string")
                    tInData1[`${col}`] = "";
                else tInData1[`${col}`] = 0;
            }
        });

        serviceS0604_IMPORT_CHARGE_RECORD
            .mgrInsert_DELETE_IMPCHARGE(tInData1)
            .then((data) => {
                if (typeof data.graphQLErrors === "undefined") {
                    if (typeof data.length === "undefined") {
                    } else {
                        console.log(
                            "ServiceMgrKCD_BUYER.mgr1KcdStyle call => " +
                                data.length,
                        );
                        toast.current.show({
                            severity: "success",
                            summary: "SUCCEED:Delete ImpCharge",
                            detail: data[0].CODE,
                            life: 3000,
                        });
                    }
                } else {
                    console.log(
                        "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                    toast.current.show({
                        severity: "success",
                        summary: "ERROR:Delete ImpCharge",
                        detail: "",
                        life: 3000,
                    });
                }
            });
    };

    const search_LIST_1 = () => {
        var _tData = { ...dataEDT_KSV_INVOICE_MST };
        var tInput = {};
        tInput.INVOICE_NO = _tData.INVOICE_NO.trim();

        setDatasTBL_KSV_INVOICE_MST([]);
        setSelectedTBL_KSV_INVOICE_MST([]);

        setLoadingTBL_KSV_INVOICE_MST(true);

        serviceS0604_IMPORT_CHARGE_RECORD
            .mgrQuery_LIST_1(tInput)
            .then((data) => {
                setLoadingTBL_KSV_INVOICE_MST(false);
                if (typeof data.graphQLErrors === "undefined") {
                    console.log(
                        "ServiceMgrKCD_BUYER.mgr1KcdStyle call => " +
                            data.DATA2.length,
                    );
                    if (data.DATA2.length <= 0) {
                        // datasetEDT_KSV_INVOICE_MST (emptyEDT_KSV_INVOICE_MST);
                        return;
                    }

                    var tArray2 = data.DATA2.map((col, i) => {
                        var tObj = { ...col };
                        tObj.id = i + 1;
                        return tObj;
                    });
                    setDatasTBL_KSV_INVOICE_MST(tArray2);

                    datasetEDT_KSV_INVOICE_MST(data.DATA1[0]);
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
    };

    const onRowClickTBL_KSV_INVOICE_MST = (event) => {
        let argTBL_KSV_INVOICE_MST = event.data;
        if (flagSelectModeTBL_KSV_INVOICE_MST) return;

        // Service : NawooAll:mgrQueryTBL_KSV_INVOICE_MST
    };

    /* EDIT KSV_INVOICE_MST*/
    const [datasEDT_KSV_INVOICE_MST, setDatasEDT_KSV_INVOICE_MST] = useState(
        [],
    );
    const [dataEDT_KSV_INVOICE_MST, setDataEDT_KSV_INVOICE_MST] = useState(
        emptyEDT_KSV_INVOICE_MST,
    );

    const datasetEDT_KSV_INVOICE_MST = (argData) => {
        var _argData = { ...dataEDT_KSV_INVOICE_MST };
        _argData.ORDER_AMT = argData.ORD_AMT;
        _argData.CURR_CD = argData.CURR_CD;
        editEDT_KSV_INVOICE_MST_CURR_CD(argData.CURR_CD);

        _argData.TOTAL_AMT = argData.TOT_AMT;
        _argData.DUTY_AMT = argData.ADJ_AMT;
        _argData.SHIP_DATE = argData.SHIP_DATE;
        _argData.DELIVERY_TYPE = argData.DELIVERY_TYPE;
        editEDT_KSV_INVOICE_MST_DELIVERY_TYPE(argData.DELIVERY_TYPE);

        _argData.VENDOR_NAME = argData.CUSTOMS;
        _argData.REMARK = argData.REMARK;
        _argData.BUYER_CD = argData.BUYER_CD;
        editEDT_KSV_INVOICE_MST_BUYER_CD(argData.BUYER_CD);

        _argData.FREIGHT_AMT = argData.FREIGHT;
        _argData.COST_CLEAR = argData.CLEARANCE;

        setDataEDT_KSV_INVOICE_MST(_argData);
    };

    const onInputChangeEDT_KSV_INVOICE_MST_INVOICE_NO = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_INVOICE_MST = { ...dataEDT_KSV_INVOICE_MST };

        let tTypeVal = _dataEDT_KSV_INVOICE_MST[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_INVOICE_MST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_INVOICE_MST[`${name}`] = parseInt(val);

        setDataEDT_KSV_INVOICE_MST(_dataEDT_KSV_INVOICE_MST);
    };

    const onInputChangeEDT_KSV_INVOICE_MST_ORDER_AMT = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_INVOICE_MST = { ...dataEDT_KSV_INVOICE_MST };

        let tTypeVal = _dataEDT_KSV_INVOICE_MST[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_INVOICE_MST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_INVOICE_MST[`${name}`] = parseInt(val);

        setDataEDT_KSV_INVOICE_MST(_dataEDT_KSV_INVOICE_MST);
    };

    const [
        datasEDT_KSV_INVOICE_MST_CURR_CD,
        setDatasEDT_KSV_INVOICE_MST_CURR_CD,
    ] = useState([]);
    const [
        dataEDT_KSV_INVOICE_MST_CURR_CD,
        setDataEDT_KSV_INVOICE_MST_CURR_CD,
    ] = useState({});

    const editEDT_KSV_INVOICE_MST_CURR_CD = (argValue) => {
        let _dataEDT_KSV_INVOICE_MST_CURR_CD =
            datasEDT_KSV_INVOICE_MST_CURR_CD.filter(
                (val) => val.CD_CODE === argValue,
            );
        setDataEDT_KSV_INVOICE_MST_CURR_CD(_dataEDT_KSV_INVOICE_MST_CURR_CD[0]);
    };

    const onDropdownChangeEDT_KSV_INVOICE_MST_CURR_CD = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataEDT_KSV_INVOICE_MST = { ...dataEDT_KSV_INVOICE_MST };

        let tTypeVal = _dataEDT_KSV_INVOICE_MST[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_KSV_INVOICE_MST[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_KSV_INVOICE_MST[`${name}`] = parseInt(val);
        }

        setDataEDT_KSV_INVOICE_MST(_dataEDT_KSV_INVOICE_MST);
        setDataEDT_KSV_INVOICE_MST_CURR_CD(e.value);
    };

    const onInputChangeEDT_KSV_INVOICE_MST_TOTAL_AMT = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_INVOICE_MST = { ...dataEDT_KSV_INVOICE_MST };

        let tTypeVal = _dataEDT_KSV_INVOICE_MST[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_INVOICE_MST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_INVOICE_MST[`${name}`] = parseInt(val);

        setDataEDT_KSV_INVOICE_MST(_dataEDT_KSV_INVOICE_MST);
    };

    const onInputChangeEDT_KSV_INVOICE_MST_DUTY_AMT = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_INVOICE_MST = { ...dataEDT_KSV_INVOICE_MST };

        let tTypeVal = _dataEDT_KSV_INVOICE_MST[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_INVOICE_MST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_INVOICE_MST[`${name}`] = parseInt(val);

        setDataEDT_KSV_INVOICE_MST(_dataEDT_KSV_INVOICE_MST);
    };

    const onCalChangeEDT_KSV_INVOICE_MST_SHIP_DATE = (e, name) => {
        let val1 = e.value || "";
        let val = "";
        if (val1 === "") {
            val = "";
        } else {
            val = getDateVal(val1);
        }

        let _dataEDT_KSV_INVOICE_MST = { ...dataEDT_KSV_INVOICE_MST };
        _dataEDT_KSV_INVOICE_MST[`${name}`] = val;
        setDataEDT_KSV_INVOICE_MST(_dataEDT_KSV_INVOICE_MST);
    };

    const [
        datasEDT_KSV_INVOICE_MST_DELIVERY_TYPE,
        setDatasEDT_KSV_INVOICE_MST_DELIVERY_TYPE,
    ] = useState([]);
    const [
        dataEDT_KSV_INVOICE_MST_DELIVERY_TYPE,
        setDataEDT_KSV_INVOICE_MST_DELIVERY_TYPE,
    ] = useState({});

    const editEDT_KSV_INVOICE_MST_DELIVERY_TYPE = (argValue) => {
        let _dataEDT_KSV_INVOICE_MST_DELIVERY_TYPE =
            datasEDT_KSV_INVOICE_MST_DELIVERY_TYPE.filter(
                (val) => val.CD_CODE === argValue,
            );
        setDataEDT_KSV_INVOICE_MST_DELIVERY_TYPE(
            _dataEDT_KSV_INVOICE_MST_DELIVERY_TYPE[0],
        );
    };

    const onDropdownChangeEDT_KSV_INVOICE_MST_DELIVERY_TYPE = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataEDT_KSV_INVOICE_MST = { ...dataEDT_KSV_INVOICE_MST };

        let tTypeVal = _dataEDT_KSV_INVOICE_MST[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_KSV_INVOICE_MST[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_KSV_INVOICE_MST[`${name}`] = parseInt(val);
        }

        setDataEDT_KSV_INVOICE_MST(_dataEDT_KSV_INVOICE_MST);
        setDataEDT_KSV_INVOICE_MST_DELIVERY_TYPE(e.value);
    };

    const onInputChangeEDT_KSV_INVOICE_MST_VENDOR_NAME = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_INVOICE_MST = { ...dataEDT_KSV_INVOICE_MST };

        let tTypeVal = _dataEDT_KSV_INVOICE_MST[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_INVOICE_MST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_INVOICE_MST[`${name}`] = parseInt(val);

        setDataEDT_KSV_INVOICE_MST(_dataEDT_KSV_INVOICE_MST);
    };

    const onInputChangeEDT_KSV_INVOICE_MST_REMARK = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_INVOICE_MST = { ...dataEDT_KSV_INVOICE_MST };

        let tTypeVal = _dataEDT_KSV_INVOICE_MST[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_INVOICE_MST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_INVOICE_MST[`${name}`] = parseInt(val);

        setDataEDT_KSV_INVOICE_MST(_dataEDT_KSV_INVOICE_MST);
    };

    const [
        datasEDT_KSV_INVOICE_MST_BUYER_CD,
        setDatasEDT_KSV_INVOICE_MST_BUYER_CD,
    ] = useState([]);
    const [
        dataEDT_KSV_INVOICE_MST_BUYER_CD,
        setDataEDT_KSV_INVOICE_MST_BUYER_CD,
    ] = useState({});

    const editEDT_KSV_INVOICE_MST_BUYER_CD = (argValue) => {
        let _dataEDT_KSV_INVOICE_MST_BUYER_CD =
            datasEDT_KSV_INVOICE_MST_BUYER_CD.filter(
                (val) => val.BUYER_CD === argValue,
            );
        setDataEDT_KSV_INVOICE_MST_BUYER_CD(
            _dataEDT_KSV_INVOICE_MST_BUYER_CD[0],
        );
    };

    const onDropdownChangeEDT_KSV_INVOICE_MST_BUYER_CD = (e, name) => {
        let val = (e.value && e.value.BUYER_CD) || "";

        let _dataEDT_KSV_INVOICE_MST = { ...dataEDT_KSV_INVOICE_MST };

        let tTypeVal = _dataEDT_KSV_INVOICE_MST[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_KSV_INVOICE_MST[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_KSV_INVOICE_MST[`${name}`] = parseInt(val);
        }

        setDataEDT_KSV_INVOICE_MST(_dataEDT_KSV_INVOICE_MST);
        setDataEDT_KSV_INVOICE_MST_BUYER_CD(e.value);
    };

    const onInputChangeEDT_KSV_INVOICE_MST_FREIGHT_AMT = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_INVOICE_MST = { ...dataEDT_KSV_INVOICE_MST };

        let tTypeVal = _dataEDT_KSV_INVOICE_MST[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_INVOICE_MST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_INVOICE_MST[`${name}`] = parseInt(val);

        setDataEDT_KSV_INVOICE_MST(_dataEDT_KSV_INVOICE_MST);
    };

    const onInputChangeEDT_KSV_INVOICE_MST_COST_CLEAR = (e, name) => {
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
        var _tObj = {};
        _tObj.INVOICE_NO = "";

        serviceS0604_IMPORT_CHARGE_RECORD.mgrQuery_CODE(_tObj).then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                setDatasEDT_KSV_INVOICE_MST_DELIVERY_TYPE(data.DELIVERY_TYPE);
                setDataEDT_KSV_INVOICE_MST_DELIVERY_TYPE(data.DELIVERY_TYPE[0]);

                setDatasEDT_KSV_INVOICE_MST_CURR_CD(data.CURR_CD);
                setDataEDT_KSV_INVOICE_MST_CURR_CD(data.CURR_CD[0]);

                setDatasEDT_KSV_INVOICE_MST_BUYER_CD(data.BUYER_CD);
                setDataEDT_KSV_INVOICE_MST_BUYER_CD(data.BUYER_CD[0]);
            } else {
                console.log(
                    "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });
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
        <div>
            <div
                style={{
                    marginLeft: "1rem",
                    marginTop: "1rem",
                    width: "99rem",
                    height: "30rem",
                }}
            >
                <AFDataTable preventUnrelatedRerender
                    ref={dt_TBL_KSV_INVOICE_MST}
                    size="small"
                    value={datasTBL_KSV_INVOICE_MST}
                    resizableColumns
                    columnResizeMode="fit"
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
                    virtualScrollerOptions={{ itemSize: 14 }}
                    emptyMessage=" " //header={headerTBL_KSV_INVOICE_MST}
                    loading={loadingTBL_KSV_INVOICE_MST}
                    responsiveLayout="scroll"
                    scrollable
                    scrollHeight="28rem"
                >
                    <AFColumn field="BUYER_CD" headerClassName="t-header" header="Buyer" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="PO_CD" headerClassName="t-header" header="Po No" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="ORDER_CD" headerClassName="t-header" header="Order" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="STYLE_NAME" headerClassName="t-header" header="Style" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="SHIP_QTY" headerClassName="t-header" header="Ship Qty" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="SHIP_PRICE" headerClassName="t-header" header="Ship Price" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="SHIP_AMT" headerClassName="t-header" header="Ord Amt" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="TOT_AMT" headerClassName="t-header" header="Import Charge" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="FACTORY_NAME" headerClassName="t-header" header="Factory" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="INVOICE_NO" headerClassName="t-header" header="Invoice No" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="SEQ" headerClassName="t-header" header="Seq" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="SHIP_DATE" headerClassName="t-header" header="Ship date" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="SHIP_PTYPE" headerClassName="t-header" header="Ship Ptype" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="NAT_CD" headerClassName="t-header" header="Nat Cd" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="DELIVERY_TYPE" headerClassName="t-header" header="Delivery Type" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="IMPORT_ORG" headerClassName="t-header" header="Import Org" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                </AFDataTable>
            </div>

            <div style={{ width: "100rem", height: "13rem" }}>
                <div className="flex flex-row justify-content-start align-items-top">
                    <div style={{ width: "100rem", height: "13rem" }}>
                        <span
                            style={{
                                marginLeft: "0.5rem",
                                height: "2rem",
                                display: "inline-block",
                                width: "23rem",
                            }}
                        >
                            <p style={{ width: "8rem", display: "inline-block", }}>Invoice No</p>
                            <InputText
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "13rem",
                                }}
                                id="id_INVOICE_NO"
                                value={dataEDT_KSV_INVOICE_MST.INVOICE_NO}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_INVOICE_MST_INVOICE_NO(
                                        e,
                                        "INVOICE_NO",
                                    )
                                }
                            />
                        </span>
                        <span
                            style={{
                                marginLeft: "0.5rem",
                                height: "2rem",
                                display: "inline-block",
                                width: "23rem",
                            }}
                        >
                            <p style={{ width: "8rem", display: "inline-block", }}>Order Amt</p>
                            <InputText
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "13rem",
                                }}
                                id="id_ORDER_AMT"
                                value={dataEDT_KSV_INVOICE_MST.ORDER_AMT}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_INVOICE_MST_ORDER_AMT(
                                        e,
                                        "ORDER_AMT",
                                    )
                                }
                                disabled
                            />
                        </span>
                        <span
                            style={{
                                marginLeft: "0.5rem",
                                height: "2rem",
                                display: "inline-block",
                                width: "10rem",
                            }}
                        >
                            <p style={{ width: "4rem", display: "inline-block", }}>Curr</p>
                            <div
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "5rem",
                                }}
                            >
                                <Dropdown
                                    id="id_CURR_CD"
                                    value={dataEDT_KSV_INVOICE_MST_CURR_CD}
                                    onChange={(e) =>
                                        onDropdownChangeEDT_KSV_INVOICE_MST_CURR_CD(
                                            e,
                                            "CURR_CD",
                                        )
                                    }
                                    options={datasEDT_KSV_INVOICE_MST_CURR_CD}
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
                                width: "33rem",
                            }}
                        >
                            <p style={{ width: "6rem", display: "inline-block", }}>Total</p>
                            <InputText
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "13rem",
                                }}
                                id="id_TOTAL_AMT"
                                value={dataEDT_KSV_INVOICE_MST.TOTAL_AMT}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_INVOICE_MST_TOTAL_AMT(
                                        e,
                                        "TOTAL_AMT",
                                    )
                                }
                                disabled
                            />
                        </span>
                        <span
                            style={{
                                marginLeft: "0.5rem",
                                height: "2rem",
                                display: "inline-block",
                                width: "56rem",
                            }}
                        >
                            <p style={{ width: "8rem", display: "inline-block", }}>Ship Date</p>
                            <div
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "13rem",
                                }}
                            >
                                <Calendar
                                    showButtonBar
                                    dateFormat="yy-mm-dd"
                                    id="id_SHIP_DATE"
                                    value={changeDateVal(
                                        dataEDT_KSV_INVOICE_MST.SHIP_DATE,
                                    )}
                                    onChange={(e) =>
                                        onCalChangeEDT_KSV_INVOICE_MST_SHIP_DATE(
                                            e,
                                            "SHIP_DATE",
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
                                width: "33rem",
                            }}
                        >
                            <p style={{ width: "7rem", display: "inline-block", }}>Duty</p>
                            <InputText
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "23rem",
                                }}
                                id="id_DUTY_AMT"
                                value={dataEDT_KSV_INVOICE_MST.DUTY_AMT}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_INVOICE_MST_DUTY_AMT(
                                        e,
                                        "DUTY_AMT",
                                    )
                                }
                            />
                        </span>

                        <span
                            style={{
                                marginLeft: "0.5rem",
                                height: "2rem",
                                display: "inline-block",
                                width: "23rem",
                            }}
                        >
                            <p style={{ width: "8rem", display: "inline-block", }}>Freight type</p>
                            <div
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "13rem",
                                }}
                            >
                                <Dropdown
                                    id="id_DELIVERY_TYPE"
                                    value={
                                        dataEDT_KSV_INVOICE_MST_DELIVERY_TYPE
                                    }
                                    onChange={(e) =>
                                        onDropdownChangeEDT_KSV_INVOICE_MST_DELIVERY_TYPE(
                                            e,
                                            "DELIVERY_TYPE",
                                        )
                                    }
                                    options={
                                        datasEDT_KSV_INVOICE_MST_DELIVERY_TYPE
                                    }
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
                                width: "50rem",
                            }}
                        >
                            <p style={{ width: "6rem", display: "inline-block", }}>Supplier</p>
                            <InputText
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "40rem",
                                }}
                                id="id_VENDOR_NAME"
                                value={dataEDT_KSV_INVOICE_MST.VENDOR_NAME}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_INVOICE_MST_VENDOR_NAME(
                                        e,
                                        "VENDOR_NAME",
                                    )
                                }
                                disabled
                            />
                        </span>
                        <span
                            style={{
                                marginLeft: "0.5rem",
                                height: "2rem",
                                display: "inline-block",
                                width: "33rem",
                            }}
                        >
                            <p style={{ width: "8rem", display: "inline-block", }}>Remark</p>
                            <InputText
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "23rem",
                                }}
                                id="id_REMARK"
                                value={dataEDT_KSV_INVOICE_MST.REMARK}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_INVOICE_MST_REMARK(
                                        e,
                                        "REMARK",
                                    )
                                }
                            />
                        </span>
                        <span
                            style={{
                                marginLeft: "0.5rem",
                                height: "2rem",
                                display: "inline-block",
                                width: "33rem",
                            }}
                        >
                            <p style={{ width: "8rem", display: "inline-block", }}>Freight</p>
                            <InputText
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "23rem",
                                }}
                                id="id_FREIGHT_AMT"
                                value={dataEDT_KSV_INVOICE_MST.FREIGHT_AMT}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_INVOICE_MST_FREIGHT_AMT(
                                        e,
                                        "FREIGHT_AMT",
                                    )
                                }
                            />
                        </span>
                        <span
                            style={{
                                marginLeft: "0.5rem",
                                height: "2rem",
                                display: "inline-block",
                                width: "33rem",
                            }}
                        >
                            <p style={{ width: "8rem", display: "inline-block", }}>Buyer</p>
                            <div
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "23rem",
                                }}
                            >
                                <Dropdown
                                    id="id_BUYER_CD"
                                    value={dataEDT_KSV_INVOICE_MST_BUYER_CD}
                                    onChange={(e) =>
                                        onDropdownChangeEDT_KSV_INVOICE_MST_BUYER_CD(
                                            e,
                                            "BUYER_CD",
                                        )
                                    }
                                    options={datasEDT_KSV_INVOICE_MST_BUYER_CD}
                                    optionLabel="BUYER_NAME"
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
                                width: "33rem",
                            }}
                        >
                            <p style={{ width: "8rem", display: "inline-block", }}>Cost Clearance</p>
                            <InputText
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "23rem",
                                }}
                                id="id_COST_CLEAR"
                                value={dataEDT_KSV_INVOICE_MST.COST_CLEAR}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_INVOICE_MST_COST_CLEAR(
                                        e,
                                        "COST_CLEAR",
                                    )
                                }
                            />
                        </span>
                    </div>
                </div>
            </div>

            <Toast ref={toast} />
            <Divider />

            <div
                style={{ width: "100rem", height: "2rem", marginLeft: "30rem" }}
            >
                <div className="formgrid grid">
                    <div>
                        <Button
                            style={{ display: "inline-block", width: "10rem" }}
                            label="Inquiry"
                            className="p-button-text"
                            onClick={search_LIST_1}
                        />

                        <Button
                            style={{ display: "inline-block", width: "10rem" }}
                            label="Insert"
                            className="p-button-text"
                            onClick={process_INSERT_IMPCHARGE}
                        />

                        <Button
                            style={{ display: "inline-block", width: "10rem" }}
                            label="Update"
                            className="p-button-text"
                            onClick={process_UPDATE_IMPCHARGE}
                        />

                        <Button
                            style={{ display: "inline-block", width: "10rem" }}
                            label="Delete"
                            className="p-button-text"
                            onClick={process_DELETE_IMPCHARGE}
                        />

                        <Button
                            style={{ display: "inline-block", width: "10rem" }}
                            label="Reset"
                            className="p-button-text"
                            onClick={blankFn}
                        />

                        <Button
                            style={{ display: "inline-block", width: "10rem" }}
                            label="Distribute"
                            className="p-button-text"
                            onClick={blankFn}
                        />

                        <Button
                            style={{ display: "inline-block", width: "10rem" }}
                            label="Update Amt"
                            className="p-button-text"
                            onClick={blankFn}
                        />
                    </div>
                </div>
            </div>

            <Divider />
        </div>
    );
};

const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(S0604_IMPORT_CHARGE_RECORD, comparisonFn);
