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
import { ServiceS0421_ENDDING_MATL_AMT_BUYER } from "../service/service_biz/ServiceS0421_ENDDING_MATL_AMT_BUYER";

import "./page_common.scss";

const emptyKCD_CODE = {
    id: 0,
    CD_GROUP: "",
    CD_CODE: "",
    CD_NAME: "",
    CD_FLAG: "",
};

const emptyQRY_KSV_STOCK_MEM = {
    S_IN_DATE: "",
    E_IN_DATE: "",
    VENDOR_TYPE: "",
    VENDOR_CD: "",
    CLOSE_OX: "",
    PO_CD: "",
    MATL_NAME: "",
    AMOUNT: "",
    QTY: "",
    BUYER_CD: "",
    COLOR: "",
    SPEC: "",
    IS_NORMAL: "",
    IS_TT: "",
    CHANGER: "",
    S_CLOSE_DATE: "",
    E_CLOSE_DATE: "",
    CLOSE_DATE: "",
    PAY_DATE: "",
};

const emptyTBL_KSV_STOCK_IN = {
    id: 0,
    PO_CD: "",
    BUYER: "",
    MATL_CD: "",
    MATL_NAME: "",
    COLOR: "",
    SPEC: "",
    IN_QTY_TOT: "",
    IN_QTY_PAY: "",
    IN_CURR_CD: "",
    IN_PRICE: "",
    PAY_CURR_CD: "",
    PAY_PRICE: "",
    MATL_PRICE: "",
    TT_FLAG: "",
    WARE_NAME: "",
    PAY_AMT: "",
    END_FLAG: "",
    END_DATE: "",
    PAY_DATE: "",
    BILL_FLAG: "",
    BILL_DATE: "",
    VENDOR_NAME: "",
    PO_SEQ: "",
    ORDER_CD: "",
    MRP_SEQ: "",
    IN_DATETIME: "",
    MATL_SEQ: "",
    CALC_FLAG: "",
    VENDOR_CD: "",
    PUR_FACTORY: "",
    PAY_REPORT: "",
};

const S0421_ENDDING_MATL_AMT_BUYER = () => {
    const serviceLibRef = useRef(null);
    if (!serviceLibRef.current) {
        serviceLibRef.current = new ServiceLib();
        serviceLibRef.current.loginConfirm();
    }
    const serviceLib = serviceLibRef.current;
    const serviceS0421_ENDDING_MATL_AMT_BUYER =
        new ServiceS0421_ENDDING_MATL_AMT_BUYER();

    const toast = useRef(null);

    /* splitter 관련 */
    const [styleVal, setStyleVal] = useState({ width: "65vw" });

    /* QRY KSV_STOCK_MEM*/
    const [dataQRY_KSV_STOCK_MEM, setDataQRY_KSV_STOCK_MEM] = useState(
        emptyQRY_KSV_STOCK_MEM,
    );

    const onCalChangeQRY_KSV_STOCK_MEM_S_IN_DATE = (e, name) => {
        let val1 = e.value || "";
        let val = "";
        if (val1 === "") {
            val = "";
        } else {
            val = getDateVal(val1);
        }

        let _dataQRY_KSV_STOCK_MEM = { ...dataQRY_KSV_STOCK_MEM };
        _dataQRY_KSV_STOCK_MEM[`${name}`] = val;
        setDataQRY_KSV_STOCK_MEM(_dataQRY_KSV_STOCK_MEM);
    };

    const onCalChangeQRY_KSV_STOCK_MEM_E_IN_DATE = (e, name) => {
        let val1 = e.value || "";
        let val = "";
        if (val1 === "") {
            val = "";
        } else {
            val = getDateVal(val1);
        }

        let _dataQRY_KSV_STOCK_MEM = { ...dataQRY_KSV_STOCK_MEM };
        _dataQRY_KSV_STOCK_MEM[`${name}`] = val;
        setDataQRY_KSV_STOCK_MEM(_dataQRY_KSV_STOCK_MEM);
    };

    const [
        datasQRY_KSV_STOCK_MEM_VENDOR_TYPE,
        setDatasQRY_KSV_STOCK_MEM_VENDOR_TYPE,
    ] = useState([]);
    const [
        dataQRY_KSV_STOCK_MEM_VENDOR_TYPE,
        setDataQRY_KSV_STOCK_MEM_VENDOR_TYPE,
    ] = useState({});

    const onDropdownChangeQRY_KSV_STOCK_MEM_VENDOR_TYPE = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataQRY_KSV_STOCK_MEM = { ...dataQRY_KSV_STOCK_MEM };

        let tTypeVal = _dataQRY_KSV_STOCK_MEM[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_STOCK_MEM[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_STOCK_MEM[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_STOCK_MEM(_dataQRY_KSV_STOCK_MEM);
        setDataQRY_KSV_STOCK_MEM_VENDOR_TYPE(e.value);
    };

    const [
        datasQRY_KSV_STOCK_MEM_VENDOR_CD,
        setDatasQRY_KSV_STOCK_MEM_VENDOR_CD,
    ] = useState([]);
    const [
        dataQRY_KSV_STOCK_MEM_VENDOR_CD,
        setDataQRY_KSV_STOCK_MEM_VENDOR_CD,
    ] = useState({});

    const onDropdownChangeQRY_KSV_STOCK_MEM_VENDOR_CD = (e, name) => {
        let val = (e.value && e.value.VENDOR_CD) || "";

        let _dataQRY_KSV_STOCK_MEM = { ...dataQRY_KSV_STOCK_MEM };

        let tTypeVal = _dataQRY_KSV_STOCK_MEM[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_STOCK_MEM[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_STOCK_MEM[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_STOCK_MEM(_dataQRY_KSV_STOCK_MEM);
        setDataQRY_KSV_STOCK_MEM_VENDOR_CD(e.value);
    };

    const [
        datasQRY_KSV_STOCK_MEM_CLOSE_OX,
        setDatasQRY_KSV_STOCK_MEM_CLOSE_OX,
    ] = useState([]);
    const [dataQRY_KSV_STOCK_MEM_CLOSE_OX, setDataQRY_KSV_STOCK_MEM_CLOSE_OX] =
        useState({});

    const onDropdownChangeQRY_KSV_STOCK_MEM_CLOSE_OX = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataQRY_KSV_STOCK_MEM = { ...dataQRY_KSV_STOCK_MEM };

        let tTypeVal = _dataQRY_KSV_STOCK_MEM[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_STOCK_MEM[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_STOCK_MEM[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_STOCK_MEM(_dataQRY_KSV_STOCK_MEM);
        setDataQRY_KSV_STOCK_MEM_CLOSE_OX(e.value);
    };

    const [datasQRY_KSV_STOCK_MEM_PO_CD, setDatasQRY_KSV_STOCK_MEM_PO_CD] =
        useState([]);
    const [dataQRY_KSV_STOCK_MEM_PO_CD, setDataQRY_KSV_STOCK_MEM_PO_CD] =
        useState({});

    const onDropdownChangeQRY_KSV_STOCK_MEM_PO_CD = (e, name) => {
        let val = (e.value && e.value.PO_CD) || "";

        let _dataQRY_KSV_STOCK_MEM = { ...dataQRY_KSV_STOCK_MEM };

        let tTypeVal = _dataQRY_KSV_STOCK_MEM[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_STOCK_MEM[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_STOCK_MEM[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_STOCK_MEM(_dataQRY_KSV_STOCK_MEM);
        setDataQRY_KSV_STOCK_MEM_PO_CD(e.value);
    };

    const onInputChangeQRY_KSV_STOCK_MEM_MATL_NAME = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_STOCK_MEM = { ...dataQRY_KSV_STOCK_MEM };

        let tTypeVal = _dataQRY_KSV_STOCK_MEM[`${name}`];
        if (typeof tTypeVal === "string")
            _dataQRY_KSV_STOCK_MEM[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_STOCK_MEM[`${name}`] = parseInt(val);

        setDataQRY_KSV_STOCK_MEM(_dataQRY_KSV_STOCK_MEM);
    };

    const onInputChangeQRY_KSV_STOCK_MEM_AMOUNT = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_STOCK_MEM = { ...dataQRY_KSV_STOCK_MEM };

        let tTypeVal = _dataQRY_KSV_STOCK_MEM[`${name}`];
        if (typeof tTypeVal === "string")
            _dataQRY_KSV_STOCK_MEM[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_STOCK_MEM[`${name}`] = parseInt(val);

        setDataQRY_KSV_STOCK_MEM(_dataQRY_KSV_STOCK_MEM);
    };

    const onInputChangeQRY_KSV_STOCK_MEM_QTY = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_STOCK_MEM = { ...dataQRY_KSV_STOCK_MEM };

        let tTypeVal = _dataQRY_KSV_STOCK_MEM[`${name}`];
        if (typeof tTypeVal === "string")
            _dataQRY_KSV_STOCK_MEM[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_STOCK_MEM[`${name}`] = parseInt(val);

        setDataQRY_KSV_STOCK_MEM(_dataQRY_KSV_STOCK_MEM);
    };

    const [
        datasQRY_KSV_STOCK_MEM_BUYER_CD,
        setDatasQRY_KSV_STOCK_MEM_BUYER_CD,
    ] = useState([]);
    const [dataQRY_KSV_STOCK_MEM_BUYER_CD, setDataQRY_KSV_STOCK_MEM_BUYER_CD] =
        useState({});

    const onDropdownChangeQRY_KSV_STOCK_MEM_BUYER_CD = (e, name) => {
        let val = (e.value && e.value.BUYER_CD) || "";

        let _dataQRY_KSV_STOCK_MEM = { ...dataQRY_KSV_STOCK_MEM };

        let tTypeVal = _dataQRY_KSV_STOCK_MEM[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_STOCK_MEM[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_STOCK_MEM[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_STOCK_MEM(_dataQRY_KSV_STOCK_MEM);
        setDataQRY_KSV_STOCK_MEM_BUYER_CD(e.value);
    };

    const onInputChangeQRY_KSV_STOCK_MEM_COLOR = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_STOCK_MEM = { ...dataQRY_KSV_STOCK_MEM };

        let tTypeVal = _dataQRY_KSV_STOCK_MEM[`${name}`];
        if (typeof tTypeVal === "string")
            _dataQRY_KSV_STOCK_MEM[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_STOCK_MEM[`${name}`] = parseInt(val);

        setDataQRY_KSV_STOCK_MEM(_dataQRY_KSV_STOCK_MEM);
    };

    const onInputChangeQRY_KSV_STOCK_MEM_SPEC = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_STOCK_MEM = { ...dataQRY_KSV_STOCK_MEM };

        let tTypeVal = _dataQRY_KSV_STOCK_MEM[`${name}`];
        if (typeof tTypeVal === "string")
            _dataQRY_KSV_STOCK_MEM[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_STOCK_MEM[`${name}`] = parseInt(val);

        setDataQRY_KSV_STOCK_MEM(_dataQRY_KSV_STOCK_MEM);
    };

    const onCheckboxChangeQRY_KSV_STOCK_MEM_IS_NORMAL = (e, name) => {
        let val = "";
        let _dataQRY_KSV_STOCK_MEM = { ...dataQRY_KSV_STOCK_MEM };
        if (e.checked) {
            val = "1";
        } else {
            val = "0";
        }
        _dataQRY_KSV_STOCK_MEM[`${name}`] = val;
        setDataQRY_KSV_STOCK_MEM(_dataQRY_KSV_STOCK_MEM);
    };

    const onCheckboxChangeQRY_KSV_STOCK_MEM_IS_TT = (e, name) => {
        let val = "";
        let _dataQRY_KSV_STOCK_MEM = { ...dataQRY_KSV_STOCK_MEM };
        if (e.checked) {
            val = "1";
        } else {
            val = "0";
        }
        _dataQRY_KSV_STOCK_MEM[`${name}`] = val;
        setDataQRY_KSV_STOCK_MEM(_dataQRY_KSV_STOCK_MEM);
    };

    const [datasQRY_KSV_STOCK_MEM_CHANGER, setDatasQRY_KSV_STOCK_MEM_CHANGER] =
        useState([]);
    const [dataQRY_KSV_STOCK_MEM_CHANGER, setDataQRY_KSV_STOCK_MEM_CHANGER] =
        useState({});

    const onDropdownChangeQRY_KSV_STOCK_MEM_CHANGER = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataQRY_KSV_STOCK_MEM = { ...dataQRY_KSV_STOCK_MEM };

        let tTypeVal = _dataQRY_KSV_STOCK_MEM[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_STOCK_MEM[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_STOCK_MEM[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_STOCK_MEM(_dataQRY_KSV_STOCK_MEM);
        setDataQRY_KSV_STOCK_MEM_CHANGER(e.value);
    };

    const onCalChangeQRY_KSV_STOCK_MEM_S_CLOSE_DATE = (e, name) => {
        let val1 = e.value || "";
        let val = "";
        if (val1 === "") {
            val = "";
        } else {
            val = getDateVal(val1);
        }

        let _dataQRY_KSV_STOCK_MEM = { ...dataQRY_KSV_STOCK_MEM };
        _dataQRY_KSV_STOCK_MEM[`${name}`] = val;
        setDataQRY_KSV_STOCK_MEM(_dataQRY_KSV_STOCK_MEM);
    };

    const onCalChangeQRY_KSV_STOCK_MEM_E_CLOSE_DATE = (e, name) => {
        let val1 = e.value || "";
        let val = "";
        if (val1 === "") {
            val = "";
        } else {
            val = getDateVal(val1);
        }

        let _dataQRY_KSV_STOCK_MEM = { ...dataQRY_KSV_STOCK_MEM };
        _dataQRY_KSV_STOCK_MEM[`${name}`] = val;
        setDataQRY_KSV_STOCK_MEM(_dataQRY_KSV_STOCK_MEM);
    };

    const onCalChangeQRY_KSV_STOCK_MEM_CLOSE_DATE = (e, name) => {
        let val1 = e.value || "";
        let val = "";
        if (val1 === "") {
            val = "";
        } else {
            val = getDateVal(val1);
        }

        let _dataQRY_KSV_STOCK_MEM = { ...dataQRY_KSV_STOCK_MEM };
        _dataQRY_KSV_STOCK_MEM[`${name}`] = val;
        setDataQRY_KSV_STOCK_MEM(_dataQRY_KSV_STOCK_MEM);
    };

    const onCalChangeQRY_KSV_STOCK_MEM_PAY_DATE = (e, name) => {
        let val1 = e.value || "";
        let val = "";
        if (val1 === "") {
            val = "";
        } else {
            val = getDateVal(val1);
        }

        let _dataQRY_KSV_STOCK_MEM = { ...dataQRY_KSV_STOCK_MEM };
        _dataQRY_KSV_STOCK_MEM[`${name}`] = val;
        setDataQRY_KSV_STOCK_MEM(_dataQRY_KSV_STOCK_MEM);
    };

    /*TABLE KSV_STOCK_IN */
    // DEFINE DATAGRID : TBL_KSV_STOCK_IN
    const [datasTBL_KSV_STOCK_IN, setDatasTBL_KSV_STOCK_IN] = useState([]);
    const dt_TBL_KSV_STOCK_IN = useRef(null);
    const [dataTBL_KSV_STOCK_IN, setDataTBL_KSV_STOCK_IN] = useState(
        emptyTBL_KSV_STOCK_IN,
    );
    const [selectedTBL_KSV_STOCK_IN, setSelectedTBL_KSV_STOCK_IN] = useState(
        [],
    );
    const [flagSelectModeTBL_KSV_STOCK_IN, setFlagSelectModeTBL_KSV_STOCK_IN] =
        useState(false);

    // DATAGRID CODE : TBL_KSV_STOCK_IN

    const onRowClick1TBL_KSV_STOCK_IN = (argData0) => {
        var argData = {};

        if (typeof argData0.length !== "undefined") {
            argData = argData0[0];
        } else {
            argData = argData0;
        }

        let argTBL_KSV_STOCK_IN = argData;

        setDataTBL_KSV_STOCK_IN(argTBL_KSV_STOCK_IN);
    };

    const onRowClickTBL_KSV_STOCK_IN = (event) => {
        let argTBL_KSV_STOCK_IN = event.data;
        if (flagSelectModeTBL_KSV_STOCK_IN) return;

        // Service : NawooAll:mgrQueryTBL_KSV_STOCK_IN
    };

    const searchTBL_KSV_STOCK_IN = () => {
        clearSelectedTBL_KSV_STOCK_IN();

        // serviceS0421_ENDDING_MATL_AMT_BUYER.mgrQueryTBL_KSV_STOCK_IN(dataQRY_).then(data => {
        //     if (typeof data.graphQLErrors === 'undefined') {
        //         console.log("ServiceNawooAll.mgrQueryTBL_KSV_STOCK_IN() call => " + data.length);
        //         setDatasTBL_KSV_STOCK_IN(data);
        //     } else {
        //         // var tStr = data.graphQLErrors[0].message;
        //         console.log("ServiceNawooAll.mgrQueryTBL_KSV_STOCK_IN()error => " + JSON.stringify(data.graphQLErrors));
        //
        //     }
        // });

        // Service : NawooAll:mgrQueryTBL_KSV_STOCK_IN
    };

    const clearSelectedTBL_KSV_STOCK_IN = () => {
        setSelectedTBL_KSV_STOCK_IN([]);
        setFlagSelectModeTBL_KSV_STOCK_IN(false);
    };

    const exportExcelTBL_KSV_STOCK_IN = () => {};

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
                    height: "10rem",
                }}
            >
                <span
                    style={{
                        marginLeft: "0.5rem",
                        height: "2rem",
                        display: "inline-block",
                        width: "23rem",
                    }}
                >
                    <p style={{ width: "8rem", display: "inline-block" }}>In Date</p>
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
                            id="id_S_IN_DATE"
                            value={changeDateVal(
                                dataQRY_KSV_STOCK_MEM.S_IN_DATE,
                            )}
                            onChange={(e) =>
                                onCalChangeQRY_KSV_STOCK_MEM_S_IN_DATE(
                                    e,
                                    "S_IN_DATE",
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
                            id="id_E_IN_DATE"
                            value={changeDateVal(
                                dataQRY_KSV_STOCK_MEM.E_IN_DATE,
                            )}
                            onChange={(e) =>
                                onCalChangeQRY_KSV_STOCK_MEM_E_IN_DATE(
                                    e,
                                    "E_IN_DATE",
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
                        width: "23rem",
                    }}
                >
                    <p style={{ width: "8rem", display: "inline-block" }}>Supplier Type</p>
                    <div
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "13rem",
                        }}
                    >
                        <Dropdown
                            id="id_VENDOR_TYPE"
                            value={dataQRY_KSV_STOCK_MEM_VENDOR_TYPE}
                            onChange={(e) =>
                                onDropdownChangeQRY_KSV_STOCK_MEM_VENDOR_TYPE(
                                    e,
                                    "VENDOR_TYPE",
                                )
                            }
                            options={datasQRY_KSV_STOCK_MEM_VENDOR_TYPE}
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
                    <p style={{ width: "8rem", display: "inline-block" }}>Supplier</p>
                    <div
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "23rem",
                        }}
                    >
                        <Dropdown
                            id="id_VENDOR_CD"
                            value={dataQRY_KSV_STOCK_MEM_VENDOR_CD}
                            onChange={(e) =>
                                onDropdownChangeQRY_KSV_STOCK_MEM_VENDOR_CD(
                                    e,
                                    "VENDOR_CD",
                                )
                            }
                            options={datasQRY_KSV_STOCK_MEM_VENDOR_CD}
                            optionLabel="VENDOR_NAME"
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
                        width: "16rem",
                    }}
                >
                    <p style={{ width: "8rem", display: "inline-block" }}>Close OX</p>
                    <div
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "7rem",
                        }}
                    >
                        <Dropdown
                            id="id_CLOSE_OX"
                            value={dataQRY_KSV_STOCK_MEM_CLOSE_OX}
                            onChange={(e) =>
                                onDropdownChangeQRY_KSV_STOCK_MEM_CLOSE_OX(
                                    e,
                                    "CLOSE_OX",
                                )
                            }
                            options={datasQRY_KSV_STOCK_MEM_CLOSE_OX}
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
                        width: "14rem",
                    }}
                >
                    <p style={{ width: "4rem", display: "inline-block" }}>PO</p>
                    <div
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "9rem",
                        }}
                    >
                        <Dropdown
                            id="id_PO_CD"
                            value={dataQRY_KSV_STOCK_MEM_PO_CD}
                            onChange={(e) =>
                                onDropdownChangeQRY_KSV_STOCK_MEM_PO_CD(
                                    e,
                                    "PO_CD",
                                )
                            }
                            options={datasQRY_KSV_STOCK_MEM_PO_CD}
                            optionLabel="PO_CD"
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
                        width: "49rem",
                    }}
                >
                    <p style={{ width: "8rem", display: "inline-block" }}>Description</p>
                    <InputText
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "23rem",
                        }}
                        id="id_MATL_NAME"
                        value={dataQRY_KSV_STOCK_MEM.MATL_NAME}
                        onChange={(e) =>
                            onInputChangeQRY_KSV_STOCK_MEM_MATL_NAME(
                                e,
                                "MATL_NAME",
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
                    <p style={{ width: "8rem", display: "inline-block" }}>Amt</p>
                    <InputText
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "13rem",
                        }}
                        id="id_AMOUNT"
                        value={dataQRY_KSV_STOCK_MEM.AMOUNT}
                        onChange={(e) =>
                            onInputChangeQRY_KSV_STOCK_MEM_AMOUNT(e, "AMOUNT")
                        }
                        disabled
                    />
                </span>
                <span
                    style={{
                        marginLeft: "0.5rem",
                        height: "2rem",
                        display: "inline-block",
                        width: "20rem",
                    }}
                >
                    <p style={{ width: "4rem", display: "inline-block" }}>Color</p>
                    <InputText
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "15rem",
                        }}
                        id="id_COLOR"
                        value={dataQRY_KSV_STOCK_MEM.COLOR}
                        onChange={(e) =>
                            onInputChangeQRY_KSV_STOCK_MEM_COLOR(e, "COLOR")
                        }
                    />
                </span>
                <span
                    style={{
                        marginLeft: "0.5rem",
                        height: "2rem",
                        display: "inline-block",
                        width: "20rem",
                    }}
                >
                    <p style={{ width: "4rem", display: "inline-block" }}>Spec</p>
                    <InputText
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "15rem",
                        }}
                        id="id_SPEC"
                        value={dataQRY_KSV_STOCK_MEM.SPEC}
                        onChange={(e) =>
                            onInputChangeQRY_KSV_STOCK_MEM_SPEC(e, "SPEC")
                        }
                    />
                </span>
                <span
                    style={{
                        marginLeft: "0.5rem",
                        height: "2rem",
                        display: "inline-block",
                        width: "7rem",
                    }}
                >
                    <p style={{ width: "5rem", display: "inline-block" }}>Normal</p>
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
                            id="id_IS_NORMAL"
                            checked={changeCheckBoxVal(
                                dataQRY_KSV_STOCK_MEM.IS_NORMAL,
                            )}
                            onChange={(e) =>
                                onCheckboxChangeQRY_KSV_STOCK_MEM_IS_NORMAL(
                                    e,
                                    "IS_NORMAL",
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
                        width: "13rem",
                    }}
                >
                    <p style={{ width: "2rem", display: "inline-block" }}>T/T</p>
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
                            id="id_IS_TT"
                            checked={changeCheckBoxVal(
                                dataQRY_KSV_STOCK_MEM.IS_TT,
                            )}
                            onChange={(e) =>
                                onCheckboxChangeQRY_KSV_STOCK_MEM_IS_TT(
                                    e,
                                    "IS_TT",
                                )
                            }
                        />
                    </div>
                    <Button
                        label="T/T Upd"
                        style={{ display: "inline-block", marginLeft: "1rem" }}
                        className="p-button-text"
                        onClick={blankFn}
                    />
                </span>
                <span
                    style={{
                        marginLeft: "0.5rem",
                        height: "2rem",
                        display: "inline-block",
                        width: "14rem",
                    }}
                >
                    {/* <p style={{ width: '5rem', display: 'inline-block' }}> Changer </p> */}
                    <div
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "5rem",
                        }}
                    >
                        <Dropdown
                            id="id_CHANGER"
                            value={dataQRY_KSV_STOCK_MEM_CHANGER}
                            onChange={(e) =>
                                onDropdownChangeQRY_KSV_STOCK_MEM_CHANGER(
                                    e,
                                    "CHANGER",
                                )
                            }
                            options={datasQRY_KSV_STOCK_MEM_CHANGER}
                            optionLabel="CD_NAME"
                            placeholder=""
                            editable
                        ></Dropdown>
                    </div>
                    <Button
                        label="Upd"
                        style={{ display: "inline-block", marginLeft: "1rem" }}
                        className="p-button-text"
                        onClick={blankFn}
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
                    <p style={{ width: "8rem", display: "inline-block" }}>Qty</p>
                    <InputText
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "13rem",
                        }}
                        id="id_QTY"
                        value={dataQRY_KSV_STOCK_MEM.QTY}
                        onChange={(e) =>
                            onInputChangeQRY_KSV_STOCK_MEM_QTY(e, "QTY")
                        }
                        disabled
                    />
                </span>
                <span
                    style={{
                        marginLeft: "0.5rem",
                        height: "2rem",
                        display: "inline-block",
                        width: "26rem",
                    }}
                >
                    <p style={{ width: "4rem", display: "inline-block" }}>Buyer</p>
                    <div
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "20rem",
                        }}
                    >
                        <Dropdown
                            id="id_BUYER_CD"
                            value={dataQRY_KSV_STOCK_MEM_BUYER_CD}
                            onChange={(e) =>
                                onDropdownChangeQRY_KSV_STOCK_MEM_BUYER_CD(
                                    e,
                                    "BUYER_CD",
                                )
                            }
                            options={datasQRY_KSV_STOCK_MEM_BUYER_CD}
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
                        width: "22rem",
                    }}
                >
                    <p style={{ width: "6em", display: "inline-block" }}>Close Date</p>
                    <div
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "15rem",
                        }}
                    >
                        <Calendar
                            showButtonBar
                            dateFormat="yymmdd"
                            id="id_CLOSE_DATE"
                            value={changeDateVal(
                                dataQRY_KSV_STOCK_MEM.CLOSE_DATE,
                            )}
                            onChange={(e) =>
                                onCalChangeQRY_KSV_STOCK_MEM_CLOSE_DATE(
                                    e,
                                    "CLOSE_DATE",
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
                        width: "22rem",
                    }}
                >
                    <p style={{ width: "6rem", display: "inline-block" }}>Pay Date</p>
                    <div
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "15rem",
                        }}
                    >
                        <Calendar
                            showButtonBar
                            dateFormat="yymmdd"
                            id="id_PAY_DATE"
                            value={changeDateVal(
                                dataQRY_KSV_STOCK_MEM.PAY_DATE,
                            )}
                            onChange={(e) =>
                                onCalChangeQRY_KSV_STOCK_MEM_PAY_DATE(
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
                        width: "23rem",
                    }}
                >
                    <p style={{ width: "8rem", display: "inline-block" }}>Close Date</p>
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
                            id="id_S_CLOSE_DATE"
                            value={changeDateVal(
                                dataQRY_KSV_STOCK_MEM.S_CLOSE_DATE,
                            )}
                            onChange={(e) =>
                                onCalChangeQRY_KSV_STOCK_MEM_S_CLOSE_DATE(
                                    e,
                                    "S_CLOSE_DATE",
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
                        width: "16rem",
                    }}
                >
                    <p style={{ width: "1rem", display: "inline-block" }}>~</p>
                    <div
                        style={{
                            marginLeft: "1.5rem",
                            display: "inline-block",
                            width: "13rem",
                        }}
                    >
                        <Calendar
                            showButtonBar
                            dateFormat="yymmdd"
                            id="id_E_CLOSE_DATE"
                            value={changeDateVal(
                                dataQRY_KSV_STOCK_MEM.E_CLOSE_DATE,
                            )}
                            onChange={(e) =>
                                onCalChangeQRY_KSV_STOCK_MEM_E_CLOSE_DATE(
                                    e,
                                    "E_CLOSE_DATE",
                                )
                            }
                        />
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
                        onClick={searchTBL_KSV_STOCK_IN}
                    />

                    <Button
                        label="Excel"
                        icon="pi pi-upload"
                        style={{ height: "1.1rem" }}
                        className="p-button-text green"
                        onClick={exportExcelTBL_KSV_STOCK_IN}
                    />
                </span>
            </div>
            <div style={{ width: "100rem", height: "2rem" }}></div>

            <div
                style={{
                    marginLeft: "1rem",
                    marginTop: "1rem",
                    width: "99rem",
                    height: "30rem",
                }}
            >
                <AFDataTable preventUnrelatedRerender
                    ref={dt_TBL_KSV_STOCK_IN}
                    size="small"
                    value={datasTBL_KSV_STOCK_IN}
                    resizableColumns
                    columnResizeMode="fit"
                    showGridlines
                    selectionMode="checkbox"
                    selection={selectedTBL_KSV_STOCK_IN}
                    onSelectionChange={(e) => {
                        setFlagSelectModeTBL_KSV_STOCK_IN(true);
                        setSelectedTBL_KSV_STOCK_IN(e.value);
                        console.log(
                            "selected length:" +
                                selectedTBL_KSV_STOCK_IN.length,
                        );
                        onRowClick1TBL_KSV_STOCK_IN(e.value);
                    }}
                    onRowClick={onRowClickTBL_KSV_STOCK_IN}
                    dataKey="id"
                    className="datatable-responsive"
                    virtualScrollerOptions={{ itemSize: 50 }}
                    emptyMessage="No TBL_KSV_STOCK_IN found." //header={headerTBL_KSV_STOCK_IN}
                    responsiveLayout="scroll"
                    scrollable
                    scrollHeight="28rem"
                >
                    <AFColumn field="PO_CD" header="PO" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="BUYER" header="Buyer" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="MATL_CD" header="Matl Cd" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="MATL_NAME" header="Description" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="COLOR" header="Color" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="SPEC" header="Spec" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="IN_QTY_TOT" header="In Qty(Tot)" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="IN_QTY_PAY" header="In Qty(Pay)" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="IN_CURR_CD" header="In Curr" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="IN_PRICE" header="In Price" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="PAY_CURR_CD" header="Pay Curr" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="PAY_PRICE" header="Pay Price" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="MATL_PRICE" header="Matl Price" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="TT_FLAG" header="T/T" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="WARE_NAME" header="Pur Factory" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="PAY_AMT" header="Pay Amt" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="END_FLAG" header="Close" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="END_DATE" header="Close Date" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="PAY_DATE" header="Pay Date" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="BILL_FLAG" header="Bill" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="BILL_DATE" header="Bill Date" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="VENDOR_NAME" header="Supplier" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="PO_SEQ" header="Po Seq" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="ORDER_CD" header="Order" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="MRP_SEQ" header="Mrp Seq" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="IN_DATETIME" header="In Date" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="MATL_SEQ" header="Matl Seq" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="CALC_FLAG" header="Calc Flag" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="VENDOR_CD" header="Vendor Cd" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="PUR_FACTORY" header="Pur Factory" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="PAY_REPORT" header="Pay Report" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                </AFDataTable>
            </div>

            <Divider />

            <div
                style={{ width: "100rem", height: "2rem", marginLeft: "51rem" }}
            >
                <div className="formgrid grid">
                    <div>
                        <Button
                            style={{ display: "inline-block", width: "10rem" }}
                            label="Inquiry(Input)"
                            className="p-button-text"
                            onClick={blankFn}
                        />

                        <Button
                            style={{ display: "inline-block", width: "10rem" }}
                            label="Update"
                            className="p-button-text"
                            onClick={blankFn}
                        />

                        <Button
                            style={{ display: "inline-block", width: "10rem" }}
                            label="Close"
                            className="p-button-text"
                            onClick={blankFn}
                        />

                        <Button
                            style={{ display: "inline-block", width: "10rem" }}
                            label="Close Cancel"
                            className="p-button-text"
                            onClick={blankFn}
                        />

                        <Button
                            style={{ display: "inline-block", width: "10rem" }}
                            label="Confirm Curr"
                            className="p-button-text"
                            onClick={blankFn}
                        />
                    </div>
                </div>
            </div>

            <Divider />

            <div style={{ width: "100rem", height: "30rem" }}>
                <div className="flex flex-row justify-content-start align-items-top">
                    <div style={{ width: "60rem", height: "30rem" }}></div>

                    <div style={{ width: "40rem", height: "30rem" }}></div>
                </div>
            </div>

            <Toast ref={toast} />
        </div>
    );
};

const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(S0421_ENDDING_MATL_AMT_BUYER, comparisonFn);
