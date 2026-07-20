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
import { ServiceS0416_MATL_DELAY_REPORT } from "../service/service_biz/ServiceS0416_MATL_DELAY_REPORT";

import "./page_common.scss";

const emptyKCD_CODE = {
    id: 0,
    CD_GROUP: "",
    CD_CODE: "",
    CD_NAME: "",
    CD_FLAG: "",
};

const emptyQRY_KSV_PO_MATLLIST = {
    FACTORY_CD: "",
    BUYER_CD: "",
    TRADE_TYPE: "",
    VENDOR_CD: "",
    PO_CD: "",
    MATL_TYPE: "",
    IS_INPUT: "",
    IS_OUTPUT: "",
    ETD: "",
    ETA: "",
    QRY1: "",
};

const emptyTBL_KSV_PO_MATL_LIST = {
    id: 0,
    REG_DATE: "",
    PO_CD: "",
    BUYER_CD: "",
    TARGET_ETD: "",
    TARGET_ETA: "",
    VENDOR_NAME: "",
    MATL_CD: "",
    MATL_NAME: "",
    COLOR: "",
    SPEC: "",
    UNIT: "",
    PO_QTY: "",
    BAL_QTY: "",
    REMARK: "",
    READY_DATE: "",
    ETD: "",
    ETA: "",
    DELIVERY: "",
    FARE_TYPE: "",
    SHIP_QTY: "",
    MATL_CD1: "",
    MATL_SEQ: "",
};

const S0416_MATL_DELAY_REPORT = () => {
    const serviceLibRef = useRef(null);
    if (!serviceLibRef.current) {
        serviceLibRef.current = new ServiceLib();
        serviceLibRef.current.loginConfirm();
    }
    const serviceLib = serviceLibRef.current;
    const serviceS0416_MATL_DELAY_REPORTRef = useRef(null);
    if (!serviceS0416_MATL_DELAY_REPORTRef.current) serviceS0416_MATL_DELAY_REPORTRef.current = new ServiceS0416_MATL_DELAY_REPORT();
    const serviceS0416_MATL_DELAY_REPORT = serviceS0416_MATL_DELAY_REPORTRef.current;

    const toast = useRef(null);

    /* splitter 관련 */
    const [styleVal, setStyleVal] = useState({ width: "65vw" });

    const [data_CODE, setData_CODE] = useState({});

    const insert_DELAY = () => {
        var tObj = selectedTBL_KSV_PO_MATL_LIST.map((col, i) => {
            var tObj = { ...col };
            delete tObj.id;
            delete tObj.__typename;
            tObj.USER_ID = serviceLib.getUserInfo().USER_ID;
            return tObj;
        });

        serviceS0416_MATL_DELAY_REPORT
            .mgrInsert_INSERT_DELAY(tObj)
            .then((data) => {
                if (typeof data.graphQLErrors === "undefined") {
                    console.log(
                        "ServiceMgrKCD_BUYER.mgr1KcdStyle call => " +
                            data.length,
                    );
                    var tArray = data.map((col, i) => {
                        var tObj = { ...col };
                        tObj.id = i + 1;
                        return tObj;
                    });
                    setDatasTBL_KSV_PO_MATL_LIST(tArray);
                } else {
                    console.log(
                        "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });
    };

    const search_DELAY = () => {
        var _tObj1 = { ...dataQRY_KSV_PO_MATLLIST };
        serviceS0416_MATL_DELAY_REPORT.mgrQuery_DELAY(_tObj1).then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                console.log(
                    "ServiceMgrKCD_BUYER.mgr1KcdStyle call => " + data.length,
                );
                var tArray = data.map((col, i) => {
                    var tObj = { ...col };
                    tObj.id = i + 1;
                    return tObj;
                });
                setDatasTBL_KSV_PO_MATL_LIST(tArray);
            } else {
                console.log(
                    "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });
    };

    /* QRY KSV_PO_MATLLIST */
    const [dataQRY_KSV_PO_MATLLIST, setDataQRY_KSV_PO_MATLLIST] = useState(
        emptyQRY_KSV_PO_MATLLIST,
    );

    const [
        datasQRY_KSV_PO_MATLLIST_FACTORY_CD,
        setDatasQRY_KSV_PO_MATLLIST_FACTORY_CD,
    ] = useState([]);
    const [
        dataQRY_KSV_PO_MATLLIST_FACTORY_CD,
        setDataQRY_KSV_PO_MATLLIST_FACTORY_CD,
    ] = useState({});

    const onDropdownChangeQRY_KSV_PO_MATLLIST_FACTORY_CD = (e, name) => {
        let val = (e.value && e.value.FACTORY_CD) || "";

        let _dataQRY_KSV_PO_MATLLIST = { ...dataQRY_KSV_PO_MATLLIST };

        let tTypeVal = _dataQRY_KSV_PO_MATLLIST[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_PO_MATLLIST[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_PO_MATLLIST[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_PO_MATLLIST(_dataQRY_KSV_PO_MATLLIST);
        setDataQRY_KSV_PO_MATLLIST_FACTORY_CD(e.value);
    };

    const [
        datasQRY_KSV_PO_MATLLIST_BUYER_CD,
        setDatasQRY_KSV_PO_MATLLIST_BUYER_CD,
    ] = useState([]);
    const [
        dataQRY_KSV_PO_MATLLIST_BUYER_CD,
        setDataQRY_KSV_PO_MATLLIST_BUYER_CD,
    ] = useState({});

    const onDropdownChangeQRY_KSV_PO_MATLLIST_BUYER_CD = (e, name) => {
        let val = "";
        if (typeof e.value === "string") val = e.value;
        else {
            val = (e.value && e.value.BUYER_CD) || "";
        }

        let _dataQRY_KSV_PO_MATLLIST = { ...dataQRY_KSV_PO_MATLLIST };

        let tTypeVal = _dataQRY_KSV_PO_MATLLIST[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_PO_MATLLIST[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_PO_MATLLIST[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_PO_MATLLIST(_dataQRY_KSV_PO_MATLLIST);
        setDataQRY_KSV_PO_MATLLIST_BUYER_CD(e.value);
    };

    const [
        datasQRY_KSV_PO_MATLLIST_TRADE_TYPE,
        setDatasQRY_KSV_PO_MATLLIST_TRADE_TYPE,
    ] = useState([]);
    const [
        dataQRY_KSV_PO_MATLLIST_TRADE_TYPE,
        setDataQRY_KSV_PO_MATLLIST_TRADE_TYPE,
    ] = useState({});

    const onDropdownChangeQRY_KSV_PO_MATLLIST_TRADE_TYPE = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataQRY_KSV_PO_MATLLIST = { ...dataQRY_KSV_PO_MATLLIST };

        let tTypeVal = _dataQRY_KSV_PO_MATLLIST[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_PO_MATLLIST[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_PO_MATLLIST[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_PO_MATLLIST(_dataQRY_KSV_PO_MATLLIST);
        setDataQRY_KSV_PO_MATLLIST_TRADE_TYPE(e.value);
    };

    const [
        datasQRY_KSV_PO_MATLLIST_VENDOR_CD,
        setDatasQRY_KSV_PO_MATLLIST_VENDOR_CD,
    ] = useState([]);
    const [
        dataQRY_KSV_PO_MATLLIST_VENDOR_CD,
        setDataQRY_KSV_PO_MATLLIST_VENDOR_CD,
    ] = useState({});

    const onDropdownChangeQRY_KSV_PO_MATLLIST_VENDOR_CD = (e, name) => {
        let val = "";
        if (typeof e.value === "string") val = e.value;
        else {
            val = (e.value && e.value.BUYER_CD) || "";
        }

        let _dataQRY_KSV_PO_MATLLIST = { ...dataQRY_KSV_PO_MATLLIST };

        let tTypeVal = _dataQRY_KSV_PO_MATLLIST[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_PO_MATLLIST[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_PO_MATLLIST[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_PO_MATLLIST(_dataQRY_KSV_PO_MATLLIST);
        setDataQRY_KSV_PO_MATLLIST_VENDOR_CD(e.value);
    };

    const [datasQRY_KSV_PO_MATLLIST_PO_CD, setDatasQRY_KSV_PO_MATLLIST_PO_CD] =
        useState([]);
    const [dataQRY_KSV_PO_MATLLIST_PO_CD, setDataQRY_KSV_PO_MATLLIST_PO_CD] =
        useState({});

    const onDropdownChangeQRY_KSV_PO_MATLLIST_PO_CD = (e, name) => {
        let val = "";
        if (typeof e.value === "string") val = e.value;
        else {
            val = (e.value && e.value.BUYER_CD) || "";
        }

        let _dataQRY_KSV_PO_MATLLIST = { ...dataQRY_KSV_PO_MATLLIST };

        let tTypeVal = _dataQRY_KSV_PO_MATLLIST[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_PO_MATLLIST[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_PO_MATLLIST[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_PO_MATLLIST(_dataQRY_KSV_PO_MATLLIST);
        setDataQRY_KSV_PO_MATLLIST_PO_CD(e.value);
    };

    const [
        datasQRY_KSV_PO_MATLLIST_MATL_TYPE,
        setDatasQRY_KSV_PO_MATLLIST_MATL_TYPE,
    ] = useState([]);
    const [
        dataQRY_KSV_PO_MATLLIST_MATL_TYPE,
        setDataQRY_KSV_PO_MATLLIST_MATL_TYPE,
    ] = useState({});

    const onDropdownChangeQRY_KSV_PO_MATLLIST_MATL_TYPE = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataQRY_KSV_PO_MATLLIST = { ...dataQRY_KSV_PO_MATLLIST };

        let tTypeVal = _dataQRY_KSV_PO_MATLLIST[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_PO_MATLLIST[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_PO_MATLLIST[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_PO_MATLLIST(_dataQRY_KSV_PO_MATLLIST);
        setDataQRY_KSV_PO_MATLLIST_MATL_TYPE(e.value);
    };

    const onCheckboxChangeQRY_KSV_PO_MATLLIST_IS_INPUT = (e, name) => {
        let val = "";
        let _dataQRY_KSV_PO_MATLLIST = { ...dataQRY_KSV_PO_MATLLIST };
        if (e.checked) {
            val = "1";
        } else {
            val = "0";
        }
        _dataQRY_KSV_PO_MATLLIST[`${name}`] = val;
        setDataQRY_KSV_PO_MATLLIST(_dataQRY_KSV_PO_MATLLIST);
    };

    const onCheckboxChangeQRY_KSV_PO_MATLLIST_IS_OUTPUT = (e, name) => {
        let val = "";
        let _dataQRY_KSV_PO_MATLLIST = { ...dataQRY_KSV_PO_MATLLIST };
        if (e.checked) {
            val = "1";
        } else {
            val = "0";
        }
        _dataQRY_KSV_PO_MATLLIST[`${name}`] = val;
        setDataQRY_KSV_PO_MATLLIST(_dataQRY_KSV_PO_MATLLIST);
    };

    const onCalChangeQRY_KSV_PO_MATLLIST_ETD = (e, name) => {
        let val1 = e.value || "";
        let val = "";
        if (val1 === "") {
            val = "";
        } else {
            val = getDateVal(val1);
        }

        let _dataQRY_KSV_PO_MATLLIST = { ...dataQRY_KSV_PO_MATLLIST };
        _dataQRY_KSV_PO_MATLLIST[`${name}`] = val;
        setDataQRY_KSV_PO_MATLLIST(_dataQRY_KSV_PO_MATLLIST);
    };

    const onCalChangeQRY_KSV_PO_MATLLIST_ETA = (e, name) => {
        let val1 = e.value || "";
        let val = "";
        if (val1 === "") {
            val = "";
        } else {
            val = getDateVal(val1);
        }

        let _dataQRY_KSV_PO_MATLLIST = { ...dataQRY_KSV_PO_MATLLIST };
        _dataQRY_KSV_PO_MATLLIST[`${name}`] = val;
        setDataQRY_KSV_PO_MATLLIST(_dataQRY_KSV_PO_MATLLIST);
    };

    const onInputChangeQRY_KSV_PO_MATLLIST_QRY1 = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_PO_MATLLIST = { ...dataQRY_KSV_PO_MATLLIST };

        let tTypeVal = _dataQRY_KSV_PO_MATLLIST[`${name}`];
        if (typeof tTypeVal === "string")
            _dataQRY_KSV_PO_MATLLIST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_PO_MATLLIST[`${name}`] = parseInt(val);

        setDataQRY_KSV_PO_MATLLIST(_dataQRY_KSV_PO_MATLLIST);
    };

    /*TABLE KSV_PO_MATL_LIST */
    // DEFINE DATAGRID : TBL_KSV_PO_MATL_LIST
    const [datasTBL_KSV_PO_MATL_LIST, setDatasTBL_KSV_PO_MATL_LIST] = useState(
        [],
    );
    const dt_TBL_KSV_PO_MATL_LIST = useRef(null);
    const [dataTBL_KSV_PO_MATL_LIST, setDataTBL_KSV_PO_MATL_LIST] = useState(
        emptyTBL_KSV_PO_MATL_LIST,
    );
    const [selectedTBL_KSV_PO_MATL_LIST, setSelectedTBL_KSV_PO_MATL_LIST] =
        useState([]);
    const [
        flagSelectModeTBL_KSV_PO_MATL_LIST,
        setFlagSelectModeTBL_KSV_PO_MATL_LIST,
    ] = useState(false);

    // DATAGRID CODE : TBL_KSV_PO_MATL_LIST

    const onRowClick1TBL_KSV_PO_MATL_LIST = (argData0) => {
        var argData = {};

        if (typeof argData0.length !== "undefined") {
            argData = argData0[0];
        } else {
            argData = argData0;
        }

        let argTBL_KSV_PO_MATL_LIST = argData;

        setDataTBL_KSV_PO_MATL_LIST(argTBL_KSV_PO_MATL_LIST);
    };

    const onRowClickTBL_KSV_PO_MATL_LIST = (event) => {
        let argTBL_KSV_PO_MATL_LIST = event.data;
        if (flagSelectModeTBL_KSV_PO_MATL_LIST) return;

        // Service : NawooAll:mgrQueryTBL_KSV_PO_MATL_LIST
    };

    const exportExcelTBL_KSV_PO_MATL_LIST = () => {};

    useEffect(() => {
        var _tObj = {};
        _tObj.INVOICE_NO = "";
        _tObj.PACK_CD = "";

        serviceS0416_MATL_DELAY_REPORT.mgrQuery_CODE(_tObj).then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                setData_CODE(data);

                setDatasQRY_KSV_PO_MATLLIST_FACTORY_CD(data.FACTORY_CD);
                setDataQRY_KSV_PO_MATLLIST_FACTORY_CD(data.FACTORY_CD[0]);

                setDatasQRY_KSV_PO_MATLLIST_BUYER_CD(data.BUYER_CD);
                setDataQRY_KSV_PO_MATLLIST_BUYER_CD(data.BUYER_CD[0]);

                setDatasQRY_KSV_PO_MATLLIST_MATL_TYPE(data.MATL_TYPE);
                setDataQRY_KSV_PO_MATLLIST_MATL_TYPE(data.MATL_TYPE[0]);

                setDatasQRY_KSV_PO_MATLLIST_VENDOR_CD(data.VENDOR_CD);
                setDataQRY_KSV_PO_MATLLIST_VENDOR_CD(data.VENDOR_CD[0]);

                setDatasQRY_KSV_PO_MATLLIST_PO_CD(data.PO_CD);
                setDataQRY_KSV_PO_MATLLIST_PO_CD(data.PO_CD[0]);

                setDatasQRY_KSV_PO_MATLLIST_TRADE_TYPE(data.DELIVERY2);
                setDataQRY_KSV_PO_MATLLIST_TRADE_TYPE(data.DELIVERY2[0]);
            } else {
                console.log(
                    "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });

        var _tObj1 = { ...dataQRY_KSV_PO_MATLLIST };
        serviceS0416_MATL_DELAY_REPORT.mgrQuery_DELAY(_tObj1).then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                console.log(
                    "ServiceMgrKCD_BUYER.mgr1KcdStyle call => " + data.length,
                );
                var tArray = data.map((col, i) => {
                    var tObj = { ...col };
                    tObj.id = i + 1;
                    return tObj;
                });
                setDatasTBL_KSV_PO_MATL_LIST(tArray);
            } else {
                console.log(
                    "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });
    }, []);

    const blankFn = () => {};

    const onCellEditComplete = (e) => {
        let { rowData, newValue, field, originalEvent: event } = e;
        console.log(newValue);
        if (newValue !== "") rowData[field] = newValue;
        // console.log(field);
        // console.log(newValue);
        // rowData[field] = newRowData[field];
    };

    const cellEditor = (options, arg_kind) => {
        if (arg_kind === "text") return textEditor(options);
        else if (arg_kind === "cb_delay_reason") return dropboxEditor1(options);
        else if (arg_kind === "cb_fare_type") return dropboxEditor2(options);
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

    const dropboxEditor1 = (options) => {
        return (
            <Dropdown
                id="id_MATL_TYPE"
                value={options.value}
                onChange={(e) => options.editorCallback(e.value.CD_CODE)}
                options={data_CODE.DELAY_REASON}
                optionLabel="CD_NAME"
                placeholder=""
                editable
            ></Dropdown>
        );
    };

    const dropboxEditor2 = (options) => {
        return (
            <Dropdown
                id="id_MATL_TYPE"
                value={options.value}
                onChange={(e) => options.editorCallback(e.value.CD_CODE)}
                options={data_CODE.FARE_TYPE}
                optionLabel="CD_NAME"
                placeholder=""
                editable
            ></Dropdown>
        );
    };

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
                    height: "7rem",
                }}
            >
                <span
                    style={{
                        marginLeft: "0.5rem",
                        height: "2rem",
                        display: "inline-block",
                        width: "28rem",
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
                            value={dataQRY_KSV_PO_MATLLIST_FACTORY_CD}
                            onChange={(e) =>
                                onDropdownChangeQRY_KSV_PO_MATLLIST_FACTORY_CD(
                                    e,
                                    "FACTORY_CD",
                                )
                            }
                            options={datasQRY_KSV_PO_MATLLIST_FACTORY_CD}
                            optionLabel="FACTORY_NAME"
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
                        width: "28rem",
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
                            value={dataQRY_KSV_PO_MATLLIST_BUYER_CD}
                            onChange={(e) =>
                                onDropdownChangeQRY_KSV_PO_MATLLIST_BUYER_CD(
                                    e,
                                    "BUYER_CD",
                                )
                            }
                            options={datasQRY_KSV_PO_MATLLIST_BUYER_CD}
                            optionLabel="BUYER_NAME"
                            placeholder=""
                            editable
                            filter
                        ></Dropdown>
                    </div>
                </span>
                <span
                    style={{
                        marginLeft: "0.5rem",
                        height: "2rem",
                        display: "inline-block",
                        width: "28rem",
                    }}
                >
                    <p style={{ width: "8rem", display: "inline-block" }}>Type</p>
                    <div
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "18rem",
                        }}
                    >
                        <Dropdown
                            id="id_TRADE_TYPE"
                            value={dataQRY_KSV_PO_MATLLIST_TRADE_TYPE}
                            onChange={(e) =>
                                onDropdownChangeQRY_KSV_PO_MATLLIST_TRADE_TYPE(
                                    e,
                                    "TRADE_TYPE",
                                )
                            }
                            options={datasQRY_KSV_PO_MATLLIST_TRADE_TYPE}
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
                        width: "28rem",
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
                            value={dataQRY_KSV_PO_MATLLIST_VENDOR_CD}
                            onChange={(e) =>
                                onDropdownChangeQRY_KSV_PO_MATLLIST_VENDOR_CD(
                                    e,
                                    "VENDOR_CD",
                                )
                            }
                            options={datasQRY_KSV_PO_MATLLIST_VENDOR_CD}
                            optionLabel="VENDOR_NAME"
                            placeholder=""
                            editable
                            filter
                        ></Dropdown>
                    </div>
                </span>
                <span
                    style={{
                        marginLeft: "0.5rem",
                        height: "2rem",
                        display: "inline-block",
                        width: "28rem",
                    }}
                >
                    <p style={{ width: "8rem", display: "inline-block" }}>PO</p>
                    <div
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "18rem",
                        }}
                    >
                        <Dropdown
                            id="id_PO_CD"
                            value={dataQRY_KSV_PO_MATLLIST_PO_CD}
                            onChange={(e) =>
                                onDropdownChangeQRY_KSV_PO_MATLLIST_PO_CD(
                                    e,
                                    "PO_CD",
                                )
                            }
                            options={datasQRY_KSV_PO_MATLLIST_PO_CD}
                            optionLabel="PO_CD"
                            placeholder=""
                            editable
                            filter
                        ></Dropdown>
                    </div>
                </span>
                <span
                    style={{
                        marginLeft: "0.5rem",
                        height: "2rem",
                        display: "inline-block",
                        width: "28rem",
                    }}
                >
                    <p style={{ width: "8rem", display: "inline-block" }}>Matl Type</p>
                    <div
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "18rem",
                        }}
                    >
                        <Dropdown
                            id="id_MATL_TYPE"
                            value={dataQRY_KSV_PO_MATLLIST_MATL_TYPE}
                            onChange={(e) =>
                                onDropdownChangeQRY_KSV_PO_MATLLIST_MATL_TYPE(
                                    e,
                                    "MATL_TYPE",
                                )
                            }
                            options={datasQRY_KSV_PO_MATLLIST_MATL_TYPE}
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
                        width: "28rem",
                    }}
                >
                    <p style={{ width: "8rem", display: "inline-block" }}>No Input</p>
                    <div
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "18rem",
                        }}
                    >
                        <Checkbox
                            style={{ display: "inline-block", width: "20rem" }}
                            id="id_IS_INPUT"
                            checked={changeCheckBoxVal(
                                dataQRY_KSV_PO_MATLLIST.IS_INPUT,
                            )}
                            onChange={(e) =>
                                onCheckboxChangeQRY_KSV_PO_MATLLIST_IS_INPUT(
                                    e,
                                    "IS_INPUT",
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
                        width: "28rem",
                    }}
                >
                    <p style={{ width: "8rem", display: "inline-block" }}>No Output</p>
                    <div
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "18rem",
                        }}
                    >
                        <Checkbox
                            style={{ display: "inline-block", width: "20rem" }}
                            id="id_IS_OUTPUT"
                            checked={changeCheckBoxVal(
                                dataQRY_KSV_PO_MATLLIST.IS_OUTPUT,
                            )}
                            onChange={(e) =>
                                onCheckboxChangeQRY_KSV_PO_MATLLIST_IS_OUTPUT(
                                    e,
                                    "IS_OUTPUT",
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
                        width: "28rem",
                    }}
                >
                    <p style={{ width: "8rem", display: "inline-block" }}>Target ETD</p>
                    <div
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "18rem",
                        }}
                    >
                        <Calendar
                            showButtonBar
                            dateFormat="yymmdd"
                            id="id_ETD"
                            value={changeDateVal(dataQRY_KSV_PO_MATLLIST.ETD)}
                            onChange={(e) =>
                                onCalChangeQRY_KSV_PO_MATLLIST_ETD(e, "ETD")
                            }
                        />
                    </div>
                </span>
                <span
                    style={{
                        marginLeft: "0.5rem",
                        height: "2rem",
                        display: "inline-block",
                        width: "28rem",
                    }}
                >
                    <p style={{ width: "8rem", display: "inline-block" }}>Target ETA</p>
                    <div
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "18rem",
                        }}
                    >
                        <Calendar
                            showButtonBar
                            dateFormat="yymmdd"
                            id="id_ETA"
                            value={changeDateVal(dataQRY_KSV_PO_MATLLIST.ETA)}
                            onChange={(e) =>
                                onCalChangeQRY_KSV_PO_MATLLIST_ETA(e, "ETA")
                            }
                        />
                    </div>
                </span>
                <span
                    style={{
                        marginLeft: "0.5rem",
                        height: "2rem",
                        display: "inline-block",
                        width: "28rem",
                    }}
                >
                    <p style={{ width: "8rem", display: "inline-block" }}>Qry1</p>
                    <InputText
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "18rem",
                        }}
                        id="id_QRY1"
                        value={dataQRY_KSV_PO_MATLLIST.QRY1}
                        onChange={(e) =>
                            onInputChangeQRY_KSV_PO_MATLLIST_QRY1(e, "QRY1")
                        }
                    />
                </span>
                <span style={{ display: "inline-block", marginLeft: "20rem" }}>
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
                        style={{ height: "1.1rem" }}
                        icon="pi pi-search"
                        className="p-button-text"
                        onClick={search_DELAY}
                    />

                    <Button
                        label="Excel"
                        style={{ height: "1.1rem", color: "green" }}
                        icon="pi pi-upload"
                        className="p-button-text"
                        onClick={exportExcelTBL_KSV_PO_MATL_LIST}
                    />
                </span>
            </div>
            <div style={{ width: "100rem", height: "2rem" }}></div>

            <div
                style={{
                    marginLeft: "1rem",
                    marginTop: "1rem",
                    width: "99rem",
                    height: "28rem",
                }}
            >
                <AFDataTable preventUnrelatedRerender
                    ref={dt_TBL_KSV_PO_MATL_LIST}
                    size="small"
                    value={datasTBL_KSV_PO_MATL_LIST}
                    resizableColumns
                    columnResizeMode="fit"
                    showGridlines
                    selectionMode="checkbox"
                    selection={selectedTBL_KSV_PO_MATL_LIST}
                    onSelectionChange={(e) => {
                        setFlagSelectModeTBL_KSV_PO_MATL_LIST(true);
                        setSelectedTBL_KSV_PO_MATL_LIST(e.value);
                        console.log(
                            "selected length:" +
                                selectedTBL_KSV_PO_MATL_LIST.length,
                        );
                        onRowClick1TBL_KSV_PO_MATL_LIST(e.value);
                    }}
                    onRowClick={onRowClickTBL_KSV_PO_MATL_LIST}
                    dataKey="id"
                    className="datatable-responsive"
                    virtualScrollerOptions={{ itemSize: 13 }}
                    emptyMessage=" " //header={headerTBL_KSV_PO_MATL_LIST}
                    responsiveLayout="scroll"
                    scrollable
                    scrollHeight="26rem"
                >
                    <AFColumn field="REG_DATE" headerClassName="t-header" header="Reg Date" style={{ width: "8rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="PO_CD" headerClassName="t-header" header="PO" style={{ width: "8rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="BUYER_CD" headerClassName="t-header" header="Buyer" style={{ width: "8rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="PD_CONF_DATE" headerClassName="t-header" header="Po Conf Date" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="PLAN_ETD" headerClassName="t-header" header="Target ETD" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="PLAN_ETA" headerClassName="t-header" header="Target ETA" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="VENDOR_NAME" headerClassName="t-header" header="Supplier" style={{ width: "15rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="MATL_CD" headerClassName="t-header" header="Matl Cd" style={{ width: "8rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="MATL_NAME" headerClassName="t-header" header="Description" style={{ width: "15rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="COLOR" headerClassName="t-header" header="Color" style={{ width: "8rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="SPEC" headerClassName="t-header" header="Spec" style={{ width: "15rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="UNIT" headerClassName="t-header" header="Unit" style={{ width: "8rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="NEED_QTY" headerClassName="t-header" header="Po Qty" style={{ width: "8rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="REMAIN_QTY" headerClassName="t-header" header="Bal Qty" style={{ width: "8rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>

                    <AFColumn field="DELAY_REASON" headerClassName="t-header" header="Delay Reason" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} editor={(options) => cellEditor(options, "text")} onCellEditComplete={onCellEditComplete} ></AFColumn>

                    <AFColumn field="REMARK" headerClassName="t-header" header="Remark" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} editor={(options) => cellEditor(options, "text")} onCellEditComplete={onCellEditComplete} ></AFColumn>
                    <AFColumn field="EX_IN_DATE" headerClassName="t-header" header="Ready Date" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} editor={(options) => cellEditor(options, "text")} onCellEditComplete={onCellEditComplete} ></AFColumn>
                    <AFColumn field="CUT_DATE" headerClassName="t-header" header="Cut Date" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} editor={(options) => cellEditor(options, "text")} onCellEditComplete={onCellEditComplete} ></AFColumn>
                    <AFColumn field="ETD" headerClassName="t-header" header="ETD" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} editor={(options) => cellEditor(options, "text")} onCellEditComplete={onCellEditComplete} ></AFColumn>
                    <AFColumn field="ETA" headerClassName="t-header" header="ETA" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} editor={(options) => cellEditor(options, "text")} onCellEditComplete={onCellEditComplete} ></AFColumn>
                    <AFColumn field="DELIVERY_TYPE" headerClassName="t-header" header="Delivery" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="FARE_TYPE" headerClassName="t-header" header="Fare" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} editor={(options) => cellEditor(options, "text")} onCellEditComplete={onCellEditComplete} ></AFColumn>
                    {/*editor={(options) => cellEditor(options, 'text')}*/}
                    <AFColumn field="MATL_CD1" headerClassName="t-header" header="Matl Cd1" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="SEQ" headerClassName="t-header" header="Seq" style={{ width: "5rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="PD_CONF_DATE2" headerClassName="t-header" header="Po Conf Date2" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="ORIGINAL_ETD" headerClassName="t-header" header="Org ETD" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} editor={(options) => cellEditor(options, "text")} onCellEditComplete={onCellEditComplete} ></AFColumn>
                    <AFColumn field="ORIGINAL_ETA" headerClassName="t-header" header="Org ETA" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} editor={(options) => cellEditor(options, "text")} onCellEditComplete={onCellEditComplete} ></AFColumn>
                    <AFColumn field="SHIP_QTY" headerClassName="t-header" header="Ship Qty" style={{ width: "7rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="END_FLAG" headerClassName="t-header" header="End flag" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="EX_IN_DATE1" headerClassName="t-header" header="Ready Date1" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="UPD_USER" headerClassName="t-header" header="Upd User" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                </AFDataTable>
            </div>

            <Divider />

            <div
                style={{ width: "100rem", height: "2rem", marginLeft: "71rem" }}
            >
                <div className="formgrid grid">
                    <div className="field col-6 md:col-6">
                        <Button
                            style={{ display: "inline-block", width: "10rem" }}
                            label="Reset"
                            icon="pi pi-times"
                            className="p-button-text"
                            onClick={blankFn}
                        />

                        <Button
                            style={{ display: "inline-block", width: "10rem" }}
                            label="Save"
                            icon="pi pi-check"
                            className="p-button-text"
                            onClick={insert_DELAY}
                        />

                        <Button
                            style={{ display: "inline-block", width: "10rem" }}
                            label="Copy"
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

export default React.memo(S0416_MATL_DELAY_REPORT, comparisonFn);
