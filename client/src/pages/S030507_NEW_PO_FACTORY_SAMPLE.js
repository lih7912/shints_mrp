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
// import { ServiceS030507_NEW_PO_FACTORY_SAMPLE } from '../service/service_biz/ServiceS030507_NEW_PO_FACTORY_SAMPLE';

import "./page_common.scss";

const emptyKCD_CODE = {
    id: 0,
    CD_GROUP: "",
    CD_CODE: "",
    CD_NAME: "",
    CD_FLAG: "",
};

const emptyQRY_KSV_PO_MST = {
    BUYER_CD: "",
    FACTORY_CD: "",
    PLACE_CD: "",
    PO_CD: "",
    PO_SEQ: "",
    ORDER_CD: "",
    TYPE_CD: "",
    END_REMARK: "",
    PO_DATE: "",
    DELIVERY_DATE: "",
    MATL_NEED_DATE: "",
};

const emptyQRY_KSV_PO_MST1 = {
    MATL_CD: "",
    MATL_NAME: "",
    COLOR: "",
    SPEC: "",
    SPEC: "",
};

const emptyTBL_KSV_ORDER_MST = {
    id: 0,
    MATL_CD: "",
    MATL_NAME: "",
    COLOR: "",
    SPEC: "",
    MATL_PRICE: "",
    CURR_CD: "",
    UNIT: "",
    PO_QTY: "",
    PO_TYPE: "",
    VENDOR_NAME: "",
    USE_PO_TYPE: "",
    MATL_SEQ: "",
    ORDER_CD: "",
    STOCK_IDX: "",
    FACTORY_CD: "",
    MRP_SEQ: "",
};

const emptyTBL_KSV_ORDER_MST1 = {
    id: 0,
    MATL_CD: "",
    MATL_NAME: "",
    COLOR: "",
    SPEC: "",
    MATL_PRICE: "",
    CURR_CD: "",
    UNIT: "",
    STOCK_QTY: "",
    RACK: "",
    PO_QTY: "",
    PO_TYPE: "",
    VENDOR_NAME: "",
    USE_PO_TYPE: "",
    MATL_SEQ: "",
    ORDER_CD: "",
    STOCK_IDX: "",
    FACTORY_CD: "",
    MRP_SEQ: "",
};

const S030507_NEW_PO_FACTORY_SAMPLE = () => {
    const serviceLibRef = useRef(null);
    if (!serviceLibRef.current) {
        serviceLibRef.current = new ServiceLib();
        serviceLibRef.current.loginConfirm();
    }
    const serviceLib = serviceLibRef.current;
    // const serviceS030507_NEW_PO_FACTORY_SAMPLE = new ServiceS030507_NEW_PO_FACTORY_SAMPLE();

    const toast = useRef(null);

    /* splitter 관련 */
    const [styleVal, setStyleVal] = useState({ width: "65vw" });

    /* QRY KSV_PO_MST*/
    const [dataQRY_KSV_PO_MST, setDataQRY_KSV_PO_MST] =
        useState(emptyQRY_KSV_PO_MST);

    const [datasQRY_KSV_PO_MST_BUYER_CD, setDatasQRY_KSV_PO_MST_BUYER_CD] =
        useState([]);
    const [dataQRY_KSV_PO_MST_BUYER_CD, setDataQRY_KSV_PO_MST_BUYER_CD] =
        useState({});

    const onDropdownChangeQRY_KSV_PO_MST_BUYER_CD = (e, name) => {
        let val = (e.value && e.value.BUYER_NAME) || "";

        let _dataQRY_KSV_PO_MST = { ...dataQRY_KSV_PO_MST };

        let tTypeVal = _dataQRY_KSV_PO_MST[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_PO_MST[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_PO_MST[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_PO_MST(_dataQRY_KSV_PO_MST);
        setDataQRY_KSV_PO_MST_BUYER_CD(e.value);
    };

    const [datasQRY_KSV_PO_MST_FACTORY_CD, setDatasQRY_KSV_PO_MST_FACTORY_CD] =
        useState([]);
    const [dataQRY_KSV_PO_MST_FACTORY_CD, setDataQRY_KSV_PO_MST_FACTORY_CD] =
        useState({});

    const onDropdownChangeQRY_KSV_PO_MST_FACTORY_CD = (e, name) => {
        let val = (e.value && e.value.FACTORY_NAME) || "";

        let _dataQRY_KSV_PO_MST = { ...dataQRY_KSV_PO_MST };

        let tTypeVal = _dataQRY_KSV_PO_MST[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_PO_MST[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_PO_MST[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_PO_MST(_dataQRY_KSV_PO_MST);
        setDataQRY_KSV_PO_MST_FACTORY_CD(e.value);
    };

    const [datasQRY_KSV_PO_MST_PLACE_CD, setDatasQRY_KSV_PO_MST_PLACE_CD] =
        useState([]);
    const [dataQRY_KSV_PO_MST_PLACE_CD, setDataQRY_KSV_PO_MST_PLACE_CD] =
        useState({});

    const onDropdownChangeQRY_KSV_PO_MST_PLACE_CD = (e, name) => {
        let val = (e.value && e.value.PLACE_NAME) || "";

        let _dataQRY_KSV_PO_MST = { ...dataQRY_KSV_PO_MST };

        let tTypeVal = _dataQRY_KSV_PO_MST[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_PO_MST[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_PO_MST[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_PO_MST(_dataQRY_KSV_PO_MST);
        setDataQRY_KSV_PO_MST_PLACE_CD(e.value);
    };

    const onInputChangeQRY_KSV_PO_MST_PO_CD = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_PO_MST = { ...dataQRY_KSV_PO_MST };

        let tTypeVal = _dataQRY_KSV_PO_MST[`${name}`];
        if (typeof tTypeVal === "string") _dataQRY_KSV_PO_MST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_PO_MST[`${name}`] = parseInt(val);

        setDataQRY_KSV_PO_MST(_dataQRY_KSV_PO_MST);
    };

    const onInputChangeQRY_KSV_PO_MST_PO_SEQ = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_PO_MST = { ...dataQRY_KSV_PO_MST };

        let tTypeVal = _dataQRY_KSV_PO_MST[`${name}`];
        if (typeof tTypeVal === "string") _dataQRY_KSV_PO_MST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_PO_MST[`${name}`] = parseInt(val);

        setDataQRY_KSV_PO_MST(_dataQRY_KSV_PO_MST);
    };

    const onInputChangeQRY_KSV_PO_MST_ORDER_CD = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_PO_MST = { ...dataQRY_KSV_PO_MST };

        let tTypeVal = _dataQRY_KSV_PO_MST[`${name}`];
        if (typeof tTypeVal === "string") _dataQRY_KSV_PO_MST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_PO_MST[`${name}`] = parseInt(val);

        setDataQRY_KSV_PO_MST(_dataQRY_KSV_PO_MST);
    };

    const [datasQRY_KSV_PO_MST_TYPE_CD, setDatasQRY_KSV_PO_MST_TYPE_CD] =
        useState([]);
    const [dataQRY_KSV_PO_MST_TYPE_CD, setDataQRY_KSV_PO_MST_TYPE_CD] =
        useState({});

    const onInputChangeQRY_KSV_PO_MST_END_REMARK = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_PO_MST = { ...dataQRY_KSV_PO_MST };

        let tTypeVal = _dataQRY_KSV_PO_MST[`${name}`];
        if (typeof tTypeVal === "string") _dataQRY_KSV_PO_MST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_PO_MST[`${name}`] = parseInt(val);

        setDataQRY_KSV_PO_MST(_dataQRY_KSV_PO_MST);
    };

    const onCalChangeQRY_KSV_PO_MST_PO_DATE = (e, name) => {
        let val1 = e.value || "";
        let val = "";
        if (val1 === "") {
            val = "";
        } else {
            val = getDateVal(val1);
        }

        let _dataQRY_KSV_PO_MST = { ...dataQRY_KSV_PO_MST };
        _dataQRY_KSV_PO_MST[`${name}`] = val;
        setDataQRY_KSV_PO_MST(_dataQRY_KSV_PO_MST);
    };

    const onCalChangeQRY_KSV_PO_MST_DELIVERY_DATE = (e, name) => {
        let val1 = e.value || "";
        let val = "";
        if (val1 === "") {
            val = "";
        } else {
            val = getDateVal(val1);
        }

        let _dataQRY_KSV_PO_MST = { ...dataQRY_KSV_PO_MST };
        _dataQRY_KSV_PO_MST[`${name}`] = val;
        setDataQRY_KSV_PO_MST(_dataQRY_KSV_PO_MST);
    };

    const onCalChangeQRY_KSV_PO_MST_MATL_NEED_DATE = (e, name) => {
        let val1 = e.value || "";
        let val = "";
        if (val1 === "") {
            val = "";
        } else {
            val = getDateVal(val1);
        }

        let _dataQRY_KSV_PO_MST = { ...dataQRY_KSV_PO_MST };
        _dataQRY_KSV_PO_MST[`${name}`] = val;
        setDataQRY_KSV_PO_MST(_dataQRY_KSV_PO_MST);
    };

    /* QRY KSV_PO_MST1 */

    const [dataQRY_KSV_PO_MST1, setDataQRY_KSV_PO_MST1] =
        useState(emptyQRY_KSV_PO_MST1);

    const onInputChangeQRY_KSV_PO_MST1_MATL_CD = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_PO_MST1 = { ...dataQRY_KSV_PO_MST1 };

        let tTypeVal = _dataQRY_KSV_PO_MST1[`${name}`];
        if (typeof tTypeVal === "string") _dataQRY_KSV_PO_MST1[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_PO_MST1[`${name}`] = parseInt(val);

        setDataQRY_KSV_PO_MST1(_dataQRY_KSV_PO_MST1);
    };

    const onInputChangeQRY_KSV_PO_MST1_MATL_NAME = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_PO_MST1 = { ...dataQRY_KSV_PO_MST1 };

        let tTypeVal = _dataQRY_KSV_PO_MST1[`${name}`];
        if (typeof tTypeVal === "string") _dataQRY_KSV_PO_MST1[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_PO_MST1[`${name}`] = parseInt(val);

        setDataQRY_KSV_PO_MST1(_dataQRY_KSV_PO_MST1);
    };

    const onInputChangeQRY_KSV_PO_MST1_COLOR = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_PO_MST1 = { ...dataQRY_KSV_PO_MST1 };

        let tTypeVal = _dataQRY_KSV_PO_MST1[`${name}`];
        if (typeof tTypeVal === "string") _dataQRY_KSV_PO_MST1[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_PO_MST1[`${name}`] = parseInt(val);

        setDataQRY_KSV_PO_MST1(_dataQRY_KSV_PO_MST1);
    };

    const onInputChangeQRY_KSV_PO_MST1_SPEC = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_PO_MST1 = { ...dataQRY_KSV_PO_MST1 };

        let tTypeVal = _dataQRY_KSV_PO_MST1[`${name}`];
        if (typeof tTypeVal === "string") _dataQRY_KSV_PO_MST1[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_PO_MST1[`${name}`] = parseInt(val);

        setDataQRY_KSV_PO_MST1(_dataQRY_KSV_PO_MST1);
    };

    // const onInputChangeQRY_KSV_PO_MST1_SPEC = (e, name) => {
    //     let val = (e.target && e.target.value) || '';

    //     let _dataQRY_KSV_PO_MST1 = { ...dataQRY_KSV_PO_MST1 };

    //     let tTypeVal = _dataQRY_KSV_PO_MST1[`${name}`];
    //     if (typeof tTypeVal === "string") _dataQRY_KSV_PO_MST1[`${name}`] = val;
    //     else if (typeof tTypeVal === "number") _dataQRY_KSV_PO_MST1[`${name}`] = parseInt(val);

    //     setDataQRY_KSV_PO_MST1(_dataQRY_KSV_PO_MST1);
    // }

    /**TABLE KSV_ORDER_MST */
    // DEFINE DATAGRID : TBL_KSV_ORDER_MST
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

    /**TABLE KSV_ORDER_MST1 */
    // DEFINE DATAGRID : TBL_KSV_ORDER_MST1
    const [datasTBL_KSV_ORDER_MST1, setDatasTBL_KSV_ORDER_MST1] = useState([]);
    const dt_TBL_KSV_ORDER_MST1 = useRef(null);
    const [dataTBL_KSV_ORDER_MST1, setDataTBL_KSV_ORDER_MST1] = useState(
        emptyTBL_KSV_ORDER_MST1,
    );
    const [selectedTBL_KSV_ORDER_MST1, setSelectedTBL_KSV_ORDER_MST1] =
        useState([]);
    const [
        flagSelectModeTBL_KSV_ORDER_MST1,
        setFlagSelectModeTBL_KSV_ORDER_MST1,
    ] = useState(false);

    // DATAGRID CODE : TBL_KSV_ORDER_MST1

    const onRowClick1TBL_KSV_ORDER_MST1 = (argData0) => {
        var argData = {};

        if (typeof argData0.length !== "undefined") {
            argData = argData0[0];
        } else {
            argData = argData0;
        }

        let argTBL_KSV_ORDER_MST1 = argData;

        setDataTBL_KSV_ORDER_MST1(argTBL_KSV_ORDER_MST1);
    };

    const onRowClickTBL_KSV_ORDER_MST1 = (event) => {
        let argTBL_KSV_ORDER_MST1 = event.data;
        if (flagSelectModeTBL_KSV_ORDER_MST1) return;

        // Service : NawooAll:mgrQueryTBL_KSV_ORDER_MST1
    };

    useEffect(() => {}, []);

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
                    width: "100rem",
                    height: "6rem",
                }}
            >
                <span
                    style={{
                        marginLeft: "0.5rem",
                        height: "2rem",
                        display: "inline-block",
                        width: "27rem",
                    }}
                >
                    <p style={{ width: "8rem", display: "inline-block" }}>Buyer</p>
                    <div
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "18rem",
                        }}
                    >
                        <Dropdown
                            id="id_BUYER_CD"
                            value={dataQRY_KSV_PO_MST_BUYER_CD}
                            onChange={(e) =>
                                onDropdownChangeQRY_KSV_PO_MST_BUYER_CD(
                                    e,
                                    "BUYER_CD",
                                )
                            }
                            options={datasQRY_KSV_PO_MST_BUYER_CD}
                            optionLabel="undefined"
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
                        width: "17rem",
                    }}
                >
                    <p style={{ width: "8rem", display: "inline-block" }}>PO</p>
                    <InputText
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "8rem",
                        }}
                        id="id_PO_CD"
                        value={dataQRY_KSV_PO_MST.PO_CD}
                        onChange={(e) =>
                            onInputChangeQRY_KSV_PO_MST_PO_CD(e, "PO_CD")
                        }
                        disabled
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
                    <p style={{ width: "3rem", display: "inline-block" }}>Seq</p>
                    <InputText
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "3rem",
                        }}
                        id="id_PO_SEQ"
                        value={dataQRY_KSV_PO_MST.PO_SEQ}
                        onChange={(e) =>
                            onInputChangeQRY_KSV_PO_MST_PO_SEQ(e, "PO_SEQ")
                        }
                        disabled
                    />

                    <InputText
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "8rem",
                        }}
                        id="id_PO_SEQ"
                        value={dataQRY_KSV_PO_MST.PO_SEQ}
                        onChange={(e) =>
                            onInputChangeQRY_KSV_PO_MST_PO_SEQ(e, "PO_SEQ")
                        }
                    />
                </span>
                <span
                    style={{
                        marginLeft: "0.5rem",
                        height: "2rem",
                        display: "inline-block",
                        width: "27rem",
                    }}
                >
                    <p style={{ width: "8rem", display: "inline-block" }}>PO Date</p>
                    <div
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "18rem",
                        }}
                    >
                        <Calendar
                            showButtonBar
                            dateFormat="yy-mm-dd"
                            id="id_PO_DATE"
                            value={changeDateVal(dataQRY_KSV_PO_MST.PO_DATE)}
                            onChange={(e) =>
                                onCalChangeQRY_KSV_PO_MST_PO_DATE(e, "PO_DATE")
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
                    <p style={{ width: "8rem", display: "inline-block" }}>Factory</p>
                    <div
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "18rem",
                        }}
                    >
                        <Dropdown
                            id="id_FACTORY_CD"
                            value={dataQRY_KSV_PO_MST_FACTORY_CD}
                            onChange={(e) =>
                                onDropdownChangeQRY_KSV_PO_MST_FACTORY_CD(
                                    e,
                                    "FACTORY_CD",
                                )
                            }
                            options={datasQRY_KSV_PO_MST_FACTORY_CD}
                            optionLabel="undefined"
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
                        width: "33.5rem",
                    }}
                >
                    <p style={{ width: "8rem", display: "inline-block" }}>Order</p>
                    <InputText
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "8rem",
                        }}
                        id="id_ORDER_CD"
                        value={dataQRY_KSV_PO_MST.ORDER_CD}
                        onChange={(e) =>
                            onInputChangeQRY_KSV_PO_MST_ORDER_CD(e, "ORDER_CD")
                        }
                        disabled
                    />
                </span>
                <span
                    style={{
                        marginLeft: "0.5rem",
                        height: "2rem",
                        display: "inline-block",
                        width: "27rem",
                    }}
                >
                    <p style={{ width: "8rem", display: "inline-block" }}>Delivery Date</p>
                    <div
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "18rem",
                        }}
                    >
                        <Calendar
                            showButtonBar
                            dateFormat="yy-mm-dd"
                            id="id_DELIVERY_DATE"
                            value={changeDateVal(
                                dataQRY_KSV_PO_MST.DELIVERY_DATE,
                            )}
                            onChange={(e) =>
                                onCalChangeQRY_KSV_PO_MST_DELIVERY_DATE(
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
                        width: "27rem",
                    }}
                >
                    <p style={{ width: "8rem", display: "inline-block" }}>Place</p>
                    <div
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "18rem",
                        }}
                    >
                        <Dropdown
                            id="id_PLACE_CD"
                            value={dataQRY_KSV_PO_MST_PLACE_CD}
                            onChange={(e) =>
                                onDropdownChangeQRY_KSV_PO_MST_PLACE_CD(
                                    e,
                                    "PLACE_CD",
                                )
                            }
                            options={datasQRY_KSV_PO_MST_PLACE_CD}
                            optionLabel="undefined"
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
                        width: "33.5rem",
                    }}
                >
                    <p style={{ width: "8rem", display: "inline-block" }}>End Remark</p>
                    <InputText
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "24rem",
                        }}
                        id="id_END_REMARK"
                        value={dataQRY_KSV_PO_MST.END_REMARK}
                        onChange={(e) =>
                            onInputChangeQRY_KSV_PO_MST_END_REMARK(
                                e,
                                "END_REMARK",
                            )
                        }
                    />
                </span>
                <span
                    style={{
                        marginLeft: "0.5rem",
                        height: "2rem",
                        display: "inline-block",
                        width: "27rem",
                    }}
                >
                    <p style={{ width: "8rem", display: "inline-block" }}>Matl Need Date</p>
                    <div
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "18rem",
                        }}
                    >
                        <Calendar
                            showButtonBar
                            dateFormat="yy-mm-dd"
                            id="id_MATL_NEED_DATE"
                            value={changeDateVal(
                                dataQRY_KSV_PO_MST.MATL_NEED_DATE,
                            )}
                            onChange={(e) =>
                                onCalChangeQRY_KSV_PO_MST_MATL_NEED_DATE(
                                    e,
                                    "MATL_NEED_DATE",
                                )
                            }
                        />
                    </div>
                </span>
            </div>

            <div
                style={{
                    marginLeft: "1rem",
                    marginTop: "1rem",
                    width: "99rem",
                    height: "22rem",
                }}
            >
                <AFDataTable preventUnrelatedRerender
                    ref={dt_TBL_KSV_ORDER_MST}
                    size="small"
                    value={datasTBL_KSV_ORDER_MST}
                    resizableColumns
                    columnResizeMode="fit"
                    showGridlines
                    selectionMode="checkbox"
                    selection={selectedTBL_KSV_ORDER_MST}
                    onSelectionChange={(e) => {
                        setFlagSelectModeTBL_KSV_ORDER_MST(true);
                        setSelectedTBL_KSV_ORDER_MST(e.value);
                        console.log(
                            "selected length:" +
                                selectedTBL_KSV_ORDER_MST.length,
                        );
                        onRowClick1TBL_KSV_ORDER_MST(e.value);
                    }}
                    onRowClick={onRowClickTBL_KSV_ORDER_MST}
                    dataKey="id"
                    className="datatable-responsive"
                    virtualScrollerOptions={{ itemSize: 9 }}
                    emptyMessage=" " //header={headerTBL_KSV_ORDER_MST}
                    responsiveLayout="scroll"
                    scrollable
                    scrollHeight="18rem"
                >
                    <AFColumn field="MATL_CD" headerClassName="t-header" header="Matl Cd" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="MATL_NAME" headerClassName="t-header" header="Description" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="COLOR" headerClassName="t-header" header="Color" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="SPEC" headerClassName="t-header" header="Spec" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="MATL_PRICE" headerClassName="t-header" header="Price" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="CURR_CD" headerClassName="t-header" header="Curr" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="UNIT" headerClassName="t-header" header="Unit" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="PO_QTY" headerClassName="t-header" header="Po Qty" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="PO_TYPE" headerClassName="t-header" header="Po Type" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="VENDOR_NAME" headerClassName="t-header" header="Supplier" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="USE_PO_TYPE" headerClassName="t-header" header="Use PO Type" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="MATL_SEQ" headerClassName="t-header" header="Matl Seq" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="ORDER_CD" headerClassName="t-header" header="Order" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="STOCK_IDX" headerClassName="t-header" header="Stock Idx" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="FACTORY_CD" headerClassName="t-header" header="Factory" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="MRP_SEQ" headerClassName="t-header" header="Mrp Seq" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                </AFDataTable>
            </div>
            <Divider />

            <div
                style={{ width: "100rem", height: "2rem", marginLeft: "37rem" }}
            >
                <div className="formgrid grid">
                    <div>
                        <Button
                            style={{ display: "inline-block", width: "15rem" }}
                            label="Insert Sample PO"
                            icon="pi pi-check"
                            className="p-button-text"
                            onClick={blankFn}
                        />

                        <Button
                            style={{ display: "inline-block", width: "10rem" }}
                            label="Reset"
                            icon="pi pi-times"
                            className="p-button-text"
                            onClick={blankFn}
                        />

                        <Button
                            style={{ display: "inline-block", width: "10rem" }}
                            label={
                                <span>
                                    Search(<u>S</u>)
                                </span>
                            }
                            accessKey="S"
                            id="btnSearch"
                            icon="pi pi-check"
                            className="p-button-text"
                            onClick={blankFn}
                        />

                        <Button
                            style={{ display: "inline-block", width: "10rem" }}
                            label="Complete"
                            icon="pi pi-check"
                            className="p-button-text"
                            onClick={blankFn}
                        />

                        <Button
                            style={{ display: "inline-block", width: "10rem" }}
                            label="Update"
                            icon="pi pi-check"
                            className="p-button-text"
                            onClick={blankFn}
                        />

                        <Button
                            style={{ display: "inline-block", width: "10rem" }}
                            label="Delete"
                            icon="pi pi-times"
                            className="p-button-text"
                            onClick={blankFn}
                        />
                    </div>
                </div>
            </div>

            <Divider />

            <div
                style={{
                    marginLeft: "1rem",
                    marginTop: "2rem",
                    width: "100rem",
                    height: "4rem",
                }}
            >
                <span
                    style={{
                        marginLeft: "0.5rem",
                        height: "2rem",
                        display: "inline-block",
                        width: "27rem",
                    }}
                >
                    <p style={{ width: "8rem", display: "inline-block" }}>Description</p>
                    <InputText
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "18rem",
                        }}
                        id="id_MATL_NAME"
                        value={dataQRY_KSV_PO_MST1.MATL_NAME}
                        onChange={(e) =>
                            onInputChangeQRY_KSV_PO_MST1_MATL_NAME(
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
                        width: "27rem",
                    }}
                >
                    <p style={{ width: "8rem", display: "inline-block" }}>Color</p>
                    <InputText
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "18rem",
                        }}
                        id="id_COLOR"
                        value={dataQRY_KSV_PO_MST1.COLOR}
                        onChange={(e) =>
                            onInputChangeQRY_KSV_PO_MST1_COLOR(e, "COLOR")
                        }
                    />
                </span>
                <span
                    style={{
                        marginLeft: "0.5rem",
                        height: "2rem",
                        display: "inline-block",
                        width: "27rem",
                    }}
                >
                    <p style={{ width: "8rem", display: "inline-block" }}>Matl Cd</p>
                    <InputText
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "18rem",
                        }}
                        id="id_MATL_CD"
                        value={dataQRY_KSV_PO_MST1.MATL_CD}
                        onChange={(e) =>
                            onInputChangeQRY_KSV_PO_MST1_MATL_CD(e, "MATL_CD")
                        }
                    />
                </span>
                <span
                    style={{
                        marginLeft: "0.5rem",
                        height: "2rem",
                        display: "inline-block",
                        width: "27rem",
                    }}
                >
                    <p style={{ width: "8rem", display: "inline-block" }}>Spec</p>
                    <InputText
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "18rem",
                        }}
                        id="id_SPEC"
                        value={dataQRY_KSV_PO_MST1.SPEC}
                        onChange={(e) =>
                            onInputChangeQRY_KSV_PO_MST1_SPEC(e, "SPEC")
                        }
                    />
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
                    <InputText
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "18rem",
                        }}
                        id="id_SPEC"
                        value={dataQRY_KSV_PO_MST1.SPEC}
                        onChange={(e) =>
                            onInputChangeQRY_KSV_PO_MST1_SPEC(e, "SPEC")
                        }
                    />
                </span>
            </div>

            <div
                style={{
                    marginLeft: "1rem",
                    marginTop: "1rem",
                    width: "99rem",
                    height: "22rem",
                }}
            >
                <AFDataTable preventUnrelatedRerender
                    ref={dt_TBL_KSV_ORDER_MST1}
                    size="small"
                    value={datasTBL_KSV_ORDER_MST1}
                    resizableColumns
                    columnResizeMode="fit"
                    showGridlines
                    selectionMode="checkbox"
                    selection={selectedTBL_KSV_ORDER_MST1}
                    onSelectionChange={(e) => {
                        setFlagSelectModeTBL_KSV_ORDER_MST1(true);
                        setSelectedTBL_KSV_ORDER_MST1(e.value);
                        console.log(
                            "selected length:" +
                                selectedTBL_KSV_ORDER_MST1.length,
                        );
                        onRowClick1TBL_KSV_ORDER_MST1(e.value);
                    }}
                    onRowClick={onRowClickTBL_KSV_ORDER_MST1}
                    dataKey="id"
                    className="datatable-responsive"
                    virtualScrollerOptions={{ itemSize: 9 }}
                    emptyMessage=" " //header={headerTBL_KSV_ORDER_MST1}
                    responsiveLayout="scroll"
                    scrollable
                    scrollHeight="18rem"
                >
                    <AFColumn field="MATL_CD" headerClassName="t-header" header="Matl Cd" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="MATL_NAME" headerClassName="t-header" header="Description" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="COLOR" headerClassName="t-header" header="Color" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="SPEC" headerClassName="t-header" header="Spec" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="MATL_PRICE" headerClassName="t-header" header="Price" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="CURR_CD" headerClassName="t-header" header="Curr" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="UNIT" headerClassName="t-header" header="Unit" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="STOCK_QTY" headerClassName="t-header" header="Stock Qty" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="RACK" headerClassName="t-header" header="Rack" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="PO_QTY" headerClassName="t-header" header="Po Qty" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="PO_TYPE" headerClassName="t-header" header="Po Type" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="VENDOR_NAME" headerClassName="t-header" header="Supplier" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="USE_PO_TYPE" headerClassName="t-header" header="Use PO Type" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="MATL_SEQ" headerClassName="t-header" header="Matl Seq" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="ORDER_CD" headerClassName="t-header" header="Order" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="STOCK_IDX" headerClassName="t-header" header="Stock Idx" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="FACTORY_CD" headerClassName="t-header" header="Factory" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="MRP_SEQ" headerClassName="t-header" header="Mrp Seq" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                </AFDataTable>
            </div>

            <Divider />

            <div
                style={{ width: "100rem", height: "2rem", marginLeft: "55rem" }}
            >
                <div className="formgrid grid">
                    <div>
                        <Button
                            style={{ display: "inline-block", width: "10rem" }}
                            label={
                                <span>
                                    Search(<u>S</u>)
                                </span>
                            }
                            accessKey="S"
                            id="btnSearch"
                            icon="pi pi-times"
                            className="p-button-text"
                            onClick={blankFn}
                        />

                        <Button
                            style={{ display: "inline-block", width: "15rem" }}
                            label="Search Stock"
                            icon="pi pi-check"
                            className="p-button-text"
                            onClick={blankFn}
                        />

                        <Button
                            style={{ display: "inline-block", width: "10rem" }}
                            label="Reset"
                            icon="pi pi-check"
                            className="p-button-text"
                            onClick={blankFn}
                        />

                        <Button
                            style={{ display: "inline-block", width: "10rem" }}
                            label="Add Matl"
                            icon="pi pi-check"
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

export default React.memo(S030507_NEW_PO_FACTORY_SAMPLE, comparisonFn);
