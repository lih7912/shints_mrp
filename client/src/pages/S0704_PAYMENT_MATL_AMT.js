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
import { ServiceS0704_PAYMENT_MATL_AMT } from "../service/service_biz/ServiceS0704_PAYMENT_MATL_AMT";

import "./page_common.scss";

const emptyKCD_CODE = {
    id: 0,
    CD_GROUP: "",
    CD_CODE: "",
    CD_NAME: "",
    CD_FLAG: "",
};

const emptyQRY_KSV_INVOICE_MST = {
    S_ISSUE_DATE: "",
    S_ISSUE_DATE: "",
    VENDOR_CD: "",
};

const emptyTBL_KSV_INVOICE_MST = {
    id: 0,
    PAY_DATE: "",
    VENDOR_NAME: "",
    CURR_CD: "",
    AMOUNT: "",
    TAX: "",
    TT_FLAG: "",
    PUR_APP: "",
    CLOSING: "",
    TAX_DATE: "",
    PAY_REPORT: "",
    VENDOR_CD: "",
    APPROKEY: "",
    TAXBILL_CD: "",
};

const emptyTBL_KSV_INVOICE_MST1 = {
    id: 0,
    PO_CD: "",
    CURR_CD: "",
    TOT_AMT: "",
    PAY_AMT: "",
    BAL_AMT: "",
    AMOUNT: "",
    IN_DATE: "",
    REG_USER: "",
};

const emptyTBL_KSV_INVOICE_MST2 = {
    id: 0,
    DOCU_NO: "",
    CURR_CD: "",
    AMOUNT: "",
    IN_DATE: "",
    BUY_DATE: "",
    TAX_DATE: "",
    REG_USER: "",
};

const emptyTBL_KSV_INVOICE_MST3 = {
    id: 0,
    PO_CD: "",
    CURR_CD: "",
    AMOUNT: "",
    IN_DATE: "",
    REG_USER: "",
};

const emptyEDT_KSV_INVOICE_MST = {
    ITEM1: "",
    PAY_DATE: "",
    ITEM2: "",
    LINE_NO: "",
    DOCU_NO: "",
    IS_MANUAL: "",
    S_STS_IN_DATE: "",
    E_STS_IN_DATE: "",
    S_STS_OUT_DATE: "",
    E_STS_OUT_DATE: "",
    S_FAC_IN_DATE: "",
    E_FAC_IN_DATE: "",
    S_FAC_OUT_DATE: "",
    E_FAC_OUT_DATE: "",
};

const S0704_PAYMENT_MATL_AMT = () => {
    const serviceLibRef = useRef(null);
    if (!serviceLibRef.current) {
        serviceLibRef.current = new ServiceLib();
        serviceLibRef.current.loginConfirm();
    }
    const serviceLib = serviceLibRef.current;
    const serviceS0704_PAYMENT_MATL_AMTRef = useRef(null);
    if (!serviceS0704_PAYMENT_MATL_AMTRef.current) serviceS0704_PAYMENT_MATL_AMTRef.current = new ServiceS0704_PAYMENT_MATL_AMT();
    const serviceS0704_PAYMENT_MATL_AMT = serviceS0704_PAYMENT_MATL_AMTRef.current;

    const toast = useRef(null);

    /* splitter 관련 */
    const [styleVal, setStyleVal] = useState({ width: "65vw" });

    /* QRY KSV_INVOICE_MST*/
    const [dataQRY_KSV_INVOICE_MST, setDataQRY_KSV_INVOICE_MST] = useState(
        emptyQRY_KSV_INVOICE_MST,
    );

    const onCalChangeQRY_KSV_INVOICE_MST_S_ISSUE_DATE = (e, name) => {
        let val1 = e.value || "";
        let val = "";
        if (val1 === "") {
            val = "";
        } else {
            val = getDateVal(val1);
        }

        let _dataQRY_KSV_INVOICE_MST = { ...dataQRY_KSV_INVOICE_MST };
        _dataQRY_KSV_INVOICE_MST[`${name}`] = val;
        setDataQRY_KSV_INVOICE_MST(_dataQRY_KSV_INVOICE_MST);
    };

    // const onCalChangeQRY_KSV_INVOICE_MST_S_ISSUE_DATE = (e, name) => {
    //     let val1 = e.value || '';
    //     let val = '';
    //     if (val1 === '') {
    //         val = '';
    //     } else {
    //         val = getDateVal(val1);
    //     }

    //     let _dataQRY_KSV_INVOICE_MST = { ...dataQRY_KSV_INVOICE_MST };
    //     _dataQRY_KSV_INVOICE_MST[`${name}`] = val;
    //     setDataQRY_KSV_INVOICE_MST(_dataQRY_KSV_INVOICE_MST);

    // }

    const [
        datasQRY_KSV_INVOICE_MST_VENDOR_CD,
        setDatasQRY_KSV_INVOICE_MST_VENDOR_CD,
    ] = useState([]);
    const [
        dataQRY_KSV_INVOICE_MST_VENDOR_CD,
        setDataQRY_KSV_INVOICE_MST_VENDOR_CD,
    ] = useState({});

    const onDropdownChangeQRY_KSV_INVOICE_MST_VENDOR_CD = (e, name) => {
        let val = (e.value && e.value.VENDOR_CD) || "";

        let _dataQRY_KSV_INVOICE_MST = { ...dataQRY_KSV_INVOICE_MST };

        let tTypeVal = _dataQRY_KSV_INVOICE_MST[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_INVOICE_MST[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_INVOICE_MST[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_INVOICE_MST(_dataQRY_KSV_INVOICE_MST);
        setDataQRY_KSV_INVOICE_MST_VENDOR_CD(e.value);
    };

    /*TABLE KSV_INVOICE_MST */
    // DEFINE DATAGRID : TBL_KSV_INVOICE_MST
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

    const searchTBL_KSV_INVOICE_MST = () => {
        clearSelectedTBL_KSV_INVOICE_MST();

        serviceS0704_PAYMENT_MATL_AMT
            .mgrQueryTBL_KSV_INVOICE_MST(dataQRY_KSV_INVOICE_MST)
            .then((data) => {
                if (typeof data.graphQLErrors === "undefined") {
                    console.log(
                        "ServiceNawooAll.mgrQueryTBL_KSV_INVOICE_MST() call => " +
                            data.length,
                    );
                    setDatasTBL_KSV_INVOICE_MST(data);
                } else {
                    // var tStr = data.graphQLErrors[0].message;
                    console.log(
                        "ServiceNawooAll.mgrQueryTBL_KSV_INVOICE_MST()error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });

        // Service : NawooAll:mgrQueryTBL_KSV_INVOICE_MST
    };

    const clearSelectedTBL_KSV_INVOICE_MST = () => {
        setSelectedTBL_KSV_INVOICE_MST([]);
        setFlagSelectModeTBL_KSV_INVOICE_MST(false);
    };

    const exportExcelTBL_KSV_INVOICE_MST = () => {};

    /**TABLE KSV_INVOICE_MST1 */
    // DEFINE DATAGRID : TBL_KSV_INVOICE_MST1
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
            argData = argData0[0];
        } else {
            argData = argData0;
        }

        let argTBL_KSV_INVOICE_MST1 = argData;

        setDataTBL_KSV_INVOICE_MST1(argTBL_KSV_INVOICE_MST1);
    };

    const onRowClickTBL_KSV_INVOICE_MST1 = (event) => {
        let argTBL_KSV_INVOICE_MST1 = event.data;
        if (flagSelectModeTBL_KSV_INVOICE_MST1) return;

        // Service : NawooAll:mgrQueryTBL_KSV_INVOICE_MST1
    };

    /**TABLE KSV_INVOICE_MST2 */
    // DEFINE DATAGRID : TBL_KSV_INVOICE_MST2
    const [datasTBL_KSV_INVOICE_MST2, setDatasTBL_KSV_INVOICE_MST2] = useState(
        [],
    );
    const dt_TBL_KSV_INVOICE_MST2 = useRef(null);
    const [dataTBL_KSV_INVOICE_MST2, setDataTBL_KSV_INVOICE_MST2] = useState(
        emptyTBL_KSV_INVOICE_MST2,
    );
    const [selectedTBL_KSV_INVOICE_MST2, setSelectedTBL_KSV_INVOICE_MST2] =
        useState([]);
    const [
        flagSelectModeTBL_KSV_INVOICE_MST2,
        setFlagSelectModeTBL_KSV_INVOICE_MST2,
    ] = useState(false);

    // DATAGRID CODE : TBL_KSV_INVOICE_MST2

    const onRowClick1TBL_KSV_INVOICE_MST2 = (argData0) => {
        var argData = {};

        if (typeof argData0.length !== "undefined") {
            argData = argData0[0];
        } else {
            argData = argData0;
        }

        let argTBL_KSV_INVOICE_MST2 = argData;

        setDataTBL_KSV_INVOICE_MST2(argTBL_KSV_INVOICE_MST2);
    };

    const onRowClickTBL_KSV_INVOICE_MST2 = (event) => {
        let argTBL_KSV_INVOICE_MST2 = event.data;
        if (flagSelectModeTBL_KSV_INVOICE_MST2) return;

        // Service : NawooAll:mgrQueryTBL_KSV_INVOICE_MST2
    };

    /**TABLE KSV_INVOICE_MST3 */
    // DEFINE DATAGRID : TBL_KSV_INVOICE_MST3
    const [datasTBL_KSV_INVOICE_MST3, setDatasTBL_KSV_INVOICE_MST3] = useState(
        [],
    );
    const dt_TBL_KSV_INVOICE_MST3 = useRef(null);
    const [dataTBL_KSV_INVOICE_MST3, setDataTBL_KSV_INVOICE_MST3] = useState(
        emptyTBL_KSV_INVOICE_MST3,
    );
    const [selectedTBL_KSV_INVOICE_MST3, setSelectedTBL_KSV_INVOICE_MST3] =
        useState([]);
    const [
        flagSelectModeTBL_KSV_INVOICE_MST3,
        setFlagSelectModeTBL_KSV_INVOICE_MST3,
    ] = useState(false);

    // DATAGRID CODE : TBL_KSV_INVOICE_MST3

    const onRowClick1TBL_KSV_INVOICE_MST3 = (argData0) => {
        var argData = {};

        if (typeof argData0.length !== "undefined") {
            argData = argData0[0];
        } else {
            argData = argData0;
        }

        let argTBL_KSV_INVOICE_MST3 = argData;

        setDataTBL_KSV_INVOICE_MST3(argTBL_KSV_INVOICE_MST3);
    };

    const onRowClickTBL_KSV_INVOICE_MST3 = (event) => {
        let argTBL_KSV_INVOICE_MST3 = event.data;
        if (flagSelectModeTBL_KSV_INVOICE_MST3) return;

        // Service : NawooAll:mgrQueryTBL_KSV_INVOICE_MST3
    };

    /**EDIT KSV_INVOICE_MST */
    const [datasEDT_KSV_INVOICE_MST, setDatasEDT_KSV_INVOICE_MST] = useState(
        [],
    );
    const [dataEDT_KSV_INVOICE_MST, setDataEDT_KSV_INVOICE_MST] = useState(
        emptyEDT_KSV_INVOICE_MST,
    );

    const onInputChangeEDT_KSV_INVOICE_MST_ITEM1 = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_INVOICE_MST = { ...dataEDT_KSV_INVOICE_MST };

        let tTypeVal = _dataEDT_KSV_INVOICE_MST[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_INVOICE_MST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_INVOICE_MST[`${name}`] = parseInt(val);

        setDataEDT_KSV_INVOICE_MST(_dataEDT_KSV_INVOICE_MST);
    };

    const onCalChangeEDT_KSV_INVOICE_MST_PAY_DATE = (e, name) => {
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

    const onInputChangeEDT_KSV_INVOICE_MST_ITEM2 = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_INVOICE_MST = { ...dataEDT_KSV_INVOICE_MST };

        let tTypeVal = _dataEDT_KSV_INVOICE_MST[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_INVOICE_MST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_INVOICE_MST[`${name}`] = parseInt(val);

        setDataEDT_KSV_INVOICE_MST(_dataEDT_KSV_INVOICE_MST);
    };

    const onInputChangeEDT_KSV_INVOICE_MST_LINE_NO = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_INVOICE_MST = { ...dataEDT_KSV_INVOICE_MST };

        let tTypeVal = _dataEDT_KSV_INVOICE_MST[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_INVOICE_MST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_INVOICE_MST[`${name}`] = parseInt(val);

        setDataEDT_KSV_INVOICE_MST(_dataEDT_KSV_INVOICE_MST);
    };

    const onInputChangeEDT_KSV_INVOICE_MST_DOCU_NO = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_INVOICE_MST = { ...dataEDT_KSV_INVOICE_MST };

        let tTypeVal = _dataEDT_KSV_INVOICE_MST[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_INVOICE_MST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_INVOICE_MST[`${name}`] = parseInt(val);

        setDataEDT_KSV_INVOICE_MST(_dataEDT_KSV_INVOICE_MST);
    };

    const onCheckboxChangeEDT_KSV_INVOICE_MST_IS_MANUAL = (e, name) => {
        let val = "";
        let _dataEDT_KSV_INVOICE_MST = { ...dataEDT_KSV_INVOICE_MST };
        if (e.checked) {
            val = "1";
        } else {
            val = "0";
        }
        _dataEDT_KSV_INVOICE_MST[`${name}`] = val;
        setDataEDT_KSV_INVOICE_MST(_dataEDT_KSV_INVOICE_MST);
    };

    const onCalChangeEDT_KSV_INVOICE_MST_S_STS_IN_DATE = (e, name) => {
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

    const onCalChangeEDT_KSV_INVOICE_MST_E_STS_IN_DATE = (e, name) => {
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

    const onCalChangeEDT_KSV_INVOICE_MST_S_STS_OUT_DATE = (e, name) => {
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

    const onCalChangeEDT_KSV_INVOICE_MST_E_STS_OUT_DATE = (e, name) => {
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

    const onCalChangeEDT_KSV_INVOICE_MST_S_FAC_IN_DATE = (e, name) => {
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

    const onCalChangeEDT_KSV_INVOICE_MST_E_FAC_IN_DATE = (e, name) => {
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

    const onCalChangeEDT_KSV_INVOICE_MST_S_FAC_OUT_DATE = (e, name) => {
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

    const onCalChangeEDT_KSV_INVOICE_MST_E_FAC_OUT_DATE = (e, name) => {
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

    useEffect(() => {}, []);

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
        <div>
            <div
                style={{
                    marginLeft: "1rem",
                    marginTop: "1rem",
                    width: "100rem",
                    height: "2rem",
                }}
            >
                <span
                    style={{
                        marginLeft: "0.5rem",
                        height: "2rem",
                        display: "inline-block",
                        width: "22rem",
                    }}
                >
                    <p style={{ width: "8rem", display: "inline-block" }}>Date</p>
                    <div
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "13rem",
                        }}
                    >
                        <Calendar
                            showButtonBar
                            dateFormat="yymmdd"
                            id="id_S_ISSUE_DATE"
                            value={changeDateVal(
                                dataQRY_KSV_INVOICE_MST.S_ISSUE_DATE,
                            )}
                            onChange={(e) =>
                                onCalChangeQRY_KSV_INVOICE_MST_S_ISSUE_DATE(
                                    e,
                                    "S_ISSUE_DATE",
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
                        width: "15rem",
                    }}
                >
                    <p style={{ width: "1rem", display: "inline-block" }}>~</p>
                    <div
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "13rem",
                        }}
                    >
                        <Calendar
                            showButtonBar
                            dateFormat="yymmdd"
                            id="id_S_ISSUE_DATE"
                            value={changeDateVal(
                                dataQRY_KSV_INVOICE_MST.S_ISSUE_DATE,
                            )}
                            onChange={(e) =>
                                onCalChangeQRY_KSV_INVOICE_MST_S_ISSUE_DATE(
                                    e,
                                    "S_ISSUE_DATE",
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
                        width: "27rem",
                    }}
                >
                    <p style={{ width: "8rem", display: "inline-block" }}>Supplier</p>
                    <div
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "18rem",
                        }}
                    >
                        <Dropdown
                            id="id_VENDOR_CD"
                            value={dataQRY_KSV_INVOICE_MST_VENDOR_CD}
                            onChange={(e) =>
                                onDropdownChangeQRY_KSV_INVOICE_MST_VENDOR_CD(
                                    e,
                                    "VENDOR_CD",
                                )
                            }
                            options={datasQRY_KSV_INVOICE_MST_VENDOR_CD}
                            optionLabel="VENDOR_NAME"
                            placeholder=""
                            editable
                        ></Dropdown>
                    </div>
                </span>
                <span style={{ display: "inline-block" }}>
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
                        icon="pi pi-search"
                        style={{ height: "1.1rem" }}
                        className="p-button-text"
                        onClick={searchTBL_KSV_INVOICE_MST}
                    />

                    <Button
                        label="Reset"
                        icon="pi pi-search"
                        style={{ height: "1.1rem" }}
                        className="p-button-text"
                        onClick={searchTBL_KSV_INVOICE_MST}
                    />

                    <Button
                        label="Excel"
                        icon="pi pi-upload"
                        style={{ height: "1.1rem" }}
                        className="p-button-text green"
                        onClick={exportExcelTBL_KSV_INVOICE_MST}
                    />
                </span>
            </div>

            <div
                style={{
                    marginLeft: "1rem",
                    marginTop: "1rem",
                    width: "99rem",
                    height: "20rem",
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
                    virtualScrollerOptions={{ itemSize: 50 }}
                    emptyMessage="No TBL_KSV_INVOICE_MST found." //header={headerTBL_KSV_INVOICE_MST}
                    responsiveLayout="scroll"
                    scrollable
                    scrollHeight="18rem"
                >
                    <AFColumn field="PAY_DATE" header="Pay Date" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="VENDOR_NAME" header="Supplier" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="CURR_CD" header="Curr" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="AMOUNT" header="Amount" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="TAX" header="TAX" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="TT_FLAG" header="T/T" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="PUR_APP" header="Pur App" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="CLOSING" header="Closing" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="TAX_DATE" header="Tax Date" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="PAY_REPORT" header="Pay Report" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="VENDOR_CD" header="Supplier CD" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="APPROKEY" header="APPROKEY" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="TAXBILL_CD" header="TaxBill CD" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                </AFDataTable>
            </div>

            <div style={{ width: "100rem", height: "21rem" }}>
                <div className="flex flex-row justify-content-start align-items-top">
                    <div style={{ width: "55rem", height: "21rem" }}>
                        <div
                            style={{
                                marginLeft: "1rem",
                                marginTop: "1rem",
                                width: "54rem",
                                height: "20rem",
                            }}
                        >
                            <AFDataTable preventUnrelatedRerender
                                ref={dt_TBL_KSV_INVOICE_MST1}
                                size="small"
                                value={datasTBL_KSV_INVOICE_MST1}
                                resizableColumns
                                columnResizeMode="fit"
                                showGridlines
                                selectionMode="checkbox"
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
                                virtualScrollerOptions={{ itemSize: 50 }}
                                emptyMessage="No TBL_KSV_INVOICE_MST1 found." //eader={headerTBL_KSV_INVOICE_MST1}
                                responsiveLayout="scroll"
                                scrollable
                                scrollHeight="18rem"
                            >
                                <AFColumn field="PO_CD" header="PO" headerStyle={{ width: "10rem", height: "1.8rem", }} bodyStyle={{ width: "10rem", height: "1.8rem", }} ></AFColumn>
                                <AFColumn field="CURR_CD" header="Curr" headerStyle={{ width: "10rem", height: "1.8rem", }} bodyStyle={{ width: "10rem", height: "1.8rem", }} ></AFColumn>
                                <AFColumn field="TOT_AMT" header="TOT" headerStyle={{ width: "10rem", height: "1.8rem", }} bodyStyle={{ width: "10rem", height: "1.8rem", }} ></AFColumn>
                                <AFColumn field="PAY_AMT" header="PAY" headerStyle={{ width: "10rem", height: "1.8rem", }} bodyStyle={{ width: "10rem", height: "1.8rem", }} ></AFColumn>
                                <AFColumn field="BAL_AMT" header="Balance" headerStyle={{ width: "10rem", height: "1.8rem", }} bodyStyle={{ width: "10rem", height: "1.8rem", }} ></AFColumn>
                                <AFColumn field="AMOUNT" header="Amount" headerStyle={{ width: "10rem", height: "1.8rem", }} bodyStyle={{ width: "10rem", height: "1.8rem", }} ></AFColumn>
                                <AFColumn field="IN_DATE" header="In Date" headerStyle={{ width: "10rem", height: "1.8rem", }} bodyStyle={{ width: "10rem", height: "1.8rem", }} ></AFColumn>
                                <AFColumn field="REG_USER" header="Reg User" headerStyle={{ width: "10rem", height: "1.8rem", }} bodyStyle={{ width: "10rem", height: "1.8rem", }} ></AFColumn>
                            </AFDataTable>
                        </div>
                    </div>

                    <div style={{ width: "45rem", height: "20rem" }}>
                        <span
                            style={{
                                marginLeft: "0.5rem",
                                height: "2rem",
                                display: "inline-block",
                                width: "20rem",
                            }}
                        >
                            <p style={{ width: "6rem", display: "inline-block", }}>배부</p>
                            <InputText
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "13rem",
                                }}
                                id="id_ITEM1"
                                value={dataEDT_KSV_INVOICE_MST.ITEM1}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_INVOICE_MST_ITEM1(
                                        e,
                                        "ITEM1",
                                    )
                                }
                            />
                        </span>
                        <span style={{ display: "inline-block" }}>
                            <Button
                                label="Balance->Amount"
                                style={{ height: "1.1rem" }}
                                className="p-button-text"
                                onClick={blankFn}
                            />

                            <Button
                                label="배부"
                                style={{ height: "1.1rem" }}
                                className="p-button-text"
                                onClick={blankFn}
                            />
                        </span>
                        <span
                            style={{
                                marginLeft: "0.5rem",
                                height: "2rem",
                                display: "inline-block",
                                width: "17rem",
                            }}
                        >
                            <p style={{ width: "6rem", display: "inline-block", }}>매입</p>
                            <div
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "10rem",
                                }}
                            >
                                <Calendar
                                    showButtonBar
                                    dateFormat="yymmdd"
                                    id="id_PAY_DATE"
                                    value={changeDateVal(
                                        dataEDT_KSV_INVOICE_MST.PAY_DATE,
                                    )}
                                    onChange={(e) =>
                                        onCalChangeEDT_KSV_INVOICE_MST_PAY_DATE(
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
                                width: "11rem",
                            }}
                        >
                            {/* <p style={{ width: '8rem', display: 'inline-block' }}> . </p> */}
                            <InputText
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "10rem",
                                }}
                                id="id_ITEM2"
                                value={dataEDT_KSV_INVOICE_MST.ITEM2}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_INVOICE_MST_ITEM2(
                                        e,
                                        "ITEM2",
                                    )
                                }
                            />
                        </span>
                        <span style={{ display: "inline-block" }}>
                            <Button
                                label="갱신"
                                style={{ height: "1.1rem" }}
                                className="p-button-text"
                                onClick={blankFn}
                            />

                            <Button
                                label="매입"
                                style={{ height: "1.1rem" }}
                                className="p-button-text"
                                onClick={blankFn}
                            />
                        </span>
                        <span
                            style={{
                                marginLeft: "0.5rem",
                                height: "2rem",
                                display: "inline-block",
                                width: "19rem",
                            }}
                        >
                            <p style={{ width: "6rem", display: "inline-block", }}>라인번호</p>
                            <InputText
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "10rem",
                                }}
                                id="id_LINE_NO"
                                value={dataEDT_KSV_INVOICE_MST.LINE_NO}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_INVOICE_MST_LINE_NO(
                                        e,
                                        "LINE_NO",
                                    )
                                }
                            />
                        </span>
                        <span
                            style={{
                                marginLeft: "0.5rem",
                                height: "2rem",
                                display: "inline-block",
                                width: "15rem",
                            }}
                        >
                            <p style={{ width: "4rem", display: "inline-block", }}>전표번호</p>
                            <InputText
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "10rem",
                                }}
                                id="id_DOCU_NO"
                                value={dataEDT_KSV_INVOICE_MST.DOCU_NO}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_INVOICE_MST_DOCU_NO(
                                        e,
                                        "DOCU_NO",
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
                            <p style={{ width: "6rem", display: "inline-block", }}>전표수기입력</p>
                            <div
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "1rem",
                                }}
                            >
                                <Checkbox
                                    style={{
                                        display: "inline-block",
                                        width: "1rem",
                                        marginLeft: "0.5rem",
                                    }}
                                    id="id_IS_MANUAL"
                                    checked={changeCheckBoxVal(
                                        dataEDT_KSV_INVOICE_MST.IS_MANUAL,
                                    )}
                                    onChange={(e) =>
                                        onCheckboxChangeEDT_KSV_INVOICE_MST_IS_MANUAL(
                                            e,
                                            "IS_MANUAL",
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
                                width: "17rem",
                            }}
                        >
                            <p style={{ width: "6rem", display: "inline-block", }}>STS IN</p>
                            <div
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "10rem",
                                }}
                            >
                                <Calendar
                                    showButtonBar
                                    dateFormat="yymmdd"
                                    id="id_S_STS_IN_DATE"
                                    value={changeDateVal(
                                        dataEDT_KSV_INVOICE_MST.S_STS_IN_DATE,
                                    )}
                                    onChange={(e) =>
                                        onCalChangeEDT_KSV_INVOICE_MST_S_STS_IN_DATE(
                                            e,
                                            "S_STS_IN_DATE",
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
                                width: "12rem",
                            }}
                        >
                            <p style={{ width: "1rem", display: "inline-block", }}>~</p>
                            <div
                                style={{
                                    marginLeft: "1rem",
                                    display: "inline-block",
                                    width: "10rem",
                                }}
                            >
                                <Calendar
                                    showButtonBar
                                    dateFormat="yymmdd"
                                    id="id_E_STS_IN_DATE"
                                    value={changeDateVal(
                                        dataEDT_KSV_INVOICE_MST.E_STS_IN_DATE,
                                    )}
                                    onChange={(e) =>
                                        onCalChangeEDT_KSV_INVOICE_MST_E_STS_IN_DATE(
                                            e,
                                            "E_STS_IN_DATE",
                                        )
                                    }
                                />
                            </div>
                        </span>
                        <span style={{ display: "inline-block" }}>
                            <Button
                                label="매입전표취소"
                                style={{ height: "1.1rem" }}
                                className="p-button-text"
                                onClick={blankFn}
                            />
                        </span>
                        <span
                            style={{
                                marginLeft: "0.5rem",
                                height: "2rem",
                                display: "inline-block",
                                width: "17rem",
                            }}
                        >
                            <p style={{ width: "6rem", display: "inline-block", }}>STS OUT</p>
                            <div
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "10rem",
                                }}
                            >
                                <Calendar
                                    showButtonBar
                                    dateFormat="yymmdd"
                                    id="id_S_STS_OUT_DATE"
                                    value={changeDateVal(
                                        dataEDT_KSV_INVOICE_MST.S_STS_OUT_DATE,
                                    )}
                                    onChange={(e) =>
                                        onCalChangeEDT_KSV_INVOICE_MST_S_STS_OUT_DATE(
                                            e,
                                            "S_STS_OUT_DATE",
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
                                width: "12rem",
                            }}
                        >
                            <p style={{ width: "1rem", display: "inline-block", }}>~</p>
                            <div
                                style={{
                                    marginLeft: "1rem",
                                    display: "inline-block",
                                    width: "10rem",
                                }}
                            >
                                <Calendar
                                    showButtonBar
                                    dateFormat="yymmdd"
                                    id="id_E_STS_OUT_DATE"
                                    value={changeDateVal(
                                        dataEDT_KSV_INVOICE_MST.E_STS_OUT_DATE,
                                    )}
                                    onChange={(e) =>
                                        onCalChangeEDT_KSV_INVOICE_MST_E_STS_OUT_DATE(
                                            e,
                                            "E_STS_OUT_DATE",
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
                                width: "17rem",
                            }}
                        >
                            <p style={{ width: "6rem", display: "inline-block", }}>FAC IN</p>
                            <div
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "10rem",
                                }}
                            >
                                <Calendar
                                    showButtonBar
                                    dateFormat="yymmdd"
                                    id="id_S_FAC_IN_DATE"
                                    value={changeDateVal(
                                        dataEDT_KSV_INVOICE_MST.S_FAC_IN_DATE,
                                    )}
                                    onChange={(e) =>
                                        onCalChangeEDT_KSV_INVOICE_MST_S_FAC_IN_DATE(
                                            e,
                                            "S_FAC_IN_DATE",
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
                                width: "12rem",
                            }}
                        >
                            <p style={{ width: "1rem", display: "inline-block", }}>~</p>
                            <div
                                style={{
                                    marginLeft: "1rem",
                                    display: "inline-block",
                                    width: "10rem",
                                }}
                            >
                                <Calendar
                                    showButtonBar
                                    dateFormat="yymmdd"
                                    id="id_E_FAC_IN_DATE"
                                    value={changeDateVal(
                                        dataEDT_KSV_INVOICE_MST.E_FAC_IN_DATE,
                                    )}
                                    onChange={(e) =>
                                        onCalChangeEDT_KSV_INVOICE_MST_E_FAC_IN_DATE(
                                            e,
                                            "E_FAC_IN_DATE",
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
                                width: "17rem",
                            }}
                        >
                            <p style={{ width: "6rem", display: "inline-block", }}>FAC OUT</p>
                            <div
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "10rem",
                                }}
                            >
                                <Calendar
                                    showButtonBar
                                    dateFormat="yymmdd"
                                    id="id_S_FAC_OUT_DATE"
                                    value={changeDateVal(
                                        dataEDT_KSV_INVOICE_MST.S_FAC_OUT_DATE,
                                    )}
                                    onChange={(e) =>
                                        onCalChangeEDT_KSV_INVOICE_MST_S_FAC_OUT_DATE(
                                            e,
                                            "S_FAC_OUT_DATE",
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
                                width: "12rem",
                            }}
                        >
                            <p style={{ width: "1rem", display: "inline-block", }}>~</p>
                            <div
                                style={{
                                    marginLeft: "1rem",
                                    display: "inline-block",
                                    width: "10rem",
                                }}
                            >
                                <Calendar
                                    showButtonBar
                                    dateFormat="yymmdd"
                                    id="id_E_FAC_OUT_DATE"
                                    value={changeDateVal(
                                        dataEDT_KSV_INVOICE_MST.E_FAC_OUT_DATE,
                                    )}
                                    onChange={(e) =>
                                        onCalChangeEDT_KSV_INVOICE_MST_E_FAC_OUT_DATE(
                                            e,
                                            "E_FAC_OUT_DATE",
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
                                width: "8rem",
                            }}
                        >
                            <div
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "1rem",
                                }}
                            >
                                <Checkbox
                                    style={{
                                        display: "inline-block",
                                        width: "1rem",
                                        marginLeft: "0.5rem",
                                    }}
                                    id="id_IS_MANUAL"
                                />
                            </div>
                            <p style={{ width: "6rem", display: "inline-block", }}>Reg Datetime</p>
                        </span>
                    </div>
                </div>
            </div>

            <div style={{ width: "100rem", height: "21rem" }}>
                <div className="flex flex-row justify-content-start align-items-top">
                    <div style={{ width: "60rem", height: "21rem" }}>
                        <div
                            style={{
                                marginLeft: "1rem",
                                marginTop: "1rem",
                                width: "59rem",
                                height: "20rem",
                            }}
                        >
                            <AFDataTable preventUnrelatedRerender
                                ref={dt_TBL_KSV_INVOICE_MST2}
                                size="small"
                                value={datasTBL_KSV_INVOICE_MST2}
                                resizableColumns
                                columnResizeMode="fit"
                                showGridlines
                                selectionMode="checkbox"
                                selection={selectedTBL_KSV_INVOICE_MST2}
                                onSelectionChange={(e) => {
                                    setFlagSelectModeTBL_KSV_INVOICE_MST2(true);
                                    setSelectedTBL_KSV_INVOICE_MST2(e.value);
                                    console.log(
                                        "selected length:" +
                                            selectedTBL_KSV_INVOICE_MST2.length,
                                    );
                                    onRowClick1TBL_KSV_INVOICE_MST2(e.value);
                                }}
                                onRowClick={onRowClickTBL_KSV_INVOICE_MST2}
                                dataKey="id"
                                className="datatable-responsive"
                                virtualScrollerOptions={{ itemSize: 50 }}
                                emptyMessage="No TBL_KSV_INVOICE_MST2 found." //header={headerTBL_KSV_INVOICE_MST2}
                                responsiveLayout="scroll"
                                scrollable
                                scrollHeight="16rem"
                            >
                                <AFColumn field="DOCU_NO" header="전표번호" headerStyle={{ width: "10rem", height: "1.8rem", }} bodyStyle={{ width: "10rem", height: "1.8rem", }} ></AFColumn>
                                <AFColumn field="CURR_CD" header="Curr" headerStyle={{ width: "10rem", height: "1.8rem", }} bodyStyle={{ width: "10rem", height: "1.8rem", }} ></AFColumn>
                                <AFColumn field="AMOUNT" header="Amount" headerStyle={{ width: "10rem", height: "1.8rem", }} bodyStyle={{ width: "10rem", height: "1.8rem", }} ></AFColumn>
                                <AFColumn field="IN_DATE" header="In Date" headerStyle={{ width: "10rem", height: "1.8rem", }} bodyStyle={{ width: "10rem", height: "1.8rem", }} ></AFColumn>
                                <AFColumn field="BUY_DATE" header="Buy Date" headerStyle={{ width: "10rem", height: "1.8rem", }} bodyStyle={{ width: "10rem", height: "1.8rem", }} ></AFColumn>
                                <AFColumn field="TAX_DATE" header="Tax Date" headerStyle={{ width: "10rem", height: "1.8rem", }} bodyStyle={{ width: "10rem", height: "1.8rem", }} ></AFColumn>
                                <AFColumn field="REG_USER" header="Reg User" headerStyle={{ width: "10rem", height: "1.8rem", }} bodyStyle={{ width: "10rem", height: "1.8rem", }} ></AFColumn>
                            </AFDataTable>
                        </div>
                    </div>
                    <div style={{ width: "40rem", height: "21rem" }}>
                        <div
                            style={{
                                marginLeft: "1rem",
                                marginTop: "1rem",
                                width: "39rem",
                                height: "20rem",
                            }}
                        >
                            <AFDataTable preventUnrelatedRerender
                                ref={dt_TBL_KSV_INVOICE_MST3}
                                size="small"
                                value={datasTBL_KSV_INVOICE_MST3}
                                resizableColumns
                                columnResizeMode="fit"
                                showGridlines
                                selectionMode="checkbox"
                                selection={selectedTBL_KSV_INVOICE_MST3}
                                onSelectionChange={(e) => {
                                    setFlagSelectModeTBL_KSV_INVOICE_MST3(true);
                                    setSelectedTBL_KSV_INVOICE_MST3(e.value);
                                    console.log(
                                        "selected length:" +
                                            selectedTBL_KSV_INVOICE_MST3.length,
                                    );
                                    onRowClick1TBL_KSV_INVOICE_MST3(e.value);
                                }}
                                onRowClick={onRowClickTBL_KSV_INVOICE_MST3}
                                dataKey="id"
                                className="datatable-responsive"
                                virtualScrollerOptions={{ itemSize: 50 }}
                                emptyMessage="No TBL_KSV_INVOICE_MST3 found." //header={headerTBL_KSV_INVOICE_MST3}
                                responsiveLayout="scroll"
                                scrollable
                                scrollHeight="16rem"
                            >
                                <AFColumn field="PO_CD" header="PO" headerStyle={{ width: "10rem", height: "1.8rem", }} bodyStyle={{ width: "10rem", height: "1.8rem", }} ></AFColumn>
                                <AFColumn field="CURR_CD" header="Curr" headerStyle={{ width: "10rem", height: "1.8rem", }} bodyStyle={{ width: "10rem", height: "1.8rem", }} ></AFColumn>
                                <AFColumn field="AMOUNT" header="Amount" headerStyle={{ width: "10rem", height: "1.8rem", }} bodyStyle={{ width: "10rem", height: "1.8rem", }} ></AFColumn>
                                <AFColumn field="IN_DATE" header="In Date" headerStyle={{ width: "10rem", height: "1.8rem", }} bodyStyle={{ width: "10rem", height: "1.8rem", }} ></AFColumn>
                                <AFColumn field="REG_USER" header="Reg User" headerStyle={{ width: "10rem", height: "1.8rem", }} bodyStyle={{ width: "10rem", height: "1.8rem", }} ></AFColumn>
                            </AFDataTable>
                        </div>
                    </div>
                </div>
            </div>

            <Toast ref={toast} />
            <Divider />

            <div style={{ width: "100rem", height: "2rem" }}>
                <div className="formgrid grid">
                    <div>
                        <Button
                            style={{ display: "inline-block", width: "10rem" }}
                            label="결제현황(월별)"
                            className="p-button-text"
                            onClick={blankFn}
                        />

                        <Button
                            style={{ display: "inline-block", width: "12rem" }}
                            label="결제현황(일자별)"
                            className="p-button-text"
                            onClick={blankFn}
                        />

                        <Button
                            style={{ display: "inline-block", width: "10rem" }}
                            label="결제금액 리스트"
                            className="p-button-text"
                            onClick={blankFn}
                        />

                        <Button
                            style={{ display: "inline-block", width: "11rem" }}
                            label="미결제금액 리스트"
                            className="p-button-text"
                            onClick={blankFn}
                        />

                        <Button
                            style={{ display: "inline-block", width: "8rem" }}
                            label="자재 ETD"
                            className="p-button-text"
                            onClick={blankFn}
                        />

                        <Button
                            style={{ display: "inline-block", width: "12rem" }}
                            label="자재 ETD-Vendor"
                            className="p-button-text"
                            onClick={blankFn}
                        />

                        <Button
                            style={{ display: "inline-block", width: "8rem" }}
                            label="Order List"
                            className="p-button-text"
                            onClick={blankFn}
                        />

                        <Button
                            style={{ display: "inline-block", width: "12rem" }}
                            label="FacIn STSIn List"
                            className="p-button-text"
                            onClick={blankFn}
                        />

                        <span
                            style={{
                                height: "2rem",
                                display: "inline-block",
                                width: "8rem",
                            }}
                        >
                            <InputText
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "7rem",
                                }}
                                id="id_DOCU_NO"
                            />
                        </span>
                        <Button
                            style={{ display: "inline-block", width: "10rem" }}
                            label="STSInOutFacIn"
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

export default React.memo(S0704_PAYMENT_MATL_AMT, comparisonFn);
