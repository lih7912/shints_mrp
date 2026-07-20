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
import { ServiceS0403_MATL_PO_LIST } from "../service/service_biz/ServiceS0403_MATL_PO_LIST";

import "./page_common.scss";

const emptyKCD_CODE = {
    id: 0,
    CD_GROUP: "",
    CD_CODE: "",
    CD_NAME: "",
    CD_FLAG: "",
};

const emptyQRY_KSV_PO_MRP = {
    PO_REG_S_DATE: "",
    PO_REG_E_DATE: "",
    ETD_S_DATE: "",
    ETD_E_DATE: "",
    PO_CD: "",
    MATL_TYPE: "",
    MATL_NAME: "",
    COLOR: "",
    VENDOR_TYPE: "",
    VENDOR_CD: "",
    SPEC: "",
    MATL_CD: "",
    BUYER_CD: "",
};

const emptyTBL_KSV_PO_MRP = {
    id: 0,
    PO_CD: "",
    ORDER_CD: "",
    STYLE_NAME: "",
    VENDOR_NAME: "",
    MATL_NAME: "",
    COLOR: "",
    SPEC: "",
    UNIT: "",
    MATL_CD: "",
    CURR_CD: "",
    MATL_PRICE: "",
    TOT_AMT: "",
    USE_QTY: "",
    PO_QTY: "",
    PO_DATE: "",
    MATL_DUE_DATE: "",
    DIFF_QTY: "",
};

const S0403_MATL_PO_LIST = () => {
    const serviceLibRef = useRef(null);
    if (!serviceLibRef.current) {
        serviceLibRef.current = new ServiceLib();
        serviceLibRef.current.loginConfirm();
    }
    const serviceLib = serviceLibRef.current;
    const serviceS0403_MATL_PO_LISTRef = useRef(null);
    if (!serviceS0403_MATL_PO_LISTRef.current) serviceS0403_MATL_PO_LISTRef.current = new ServiceS0403_MATL_PO_LIST();
    const serviceS0403_MATL_PO_LIST = serviceS0403_MATL_PO_LISTRef.current;

    const toast = useRef(null);

    /* splitter 관련 */
    const [styleVal, setStyleVal] = useState({ width: "65vw" });

    /* QRY KSV_PO_MRP*/
    const [dataQRY_KSV_PO_MRP, setDataQRY_KSV_PO_MRP] =
        useState(emptyQRY_KSV_PO_MRP);

    const onCalChangeQRY_KSV_PO_MRP_PO_REG_S_DATE = (e, name) => {
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

    const onCalChangeQRY_KSV_PO_MRP_PO_REG_E_DATE = (e, name) => {
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

    const onCalChangeQRY_KSV_PO_MRP_ETD_S_DATE = (e, name) => {
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

    const [datasQRY_KSV_PO_MRP_PO_CD, setDatasQRY_KSV_PO_MRP_PO_CD] = useState(
        [],
    );
    const [dataQRY_KSV_PO_MRP_PO_CD, setDataQRY_KSV_PO_MRP_PO_CD] = useState(
        {},
    );

    const onDropdownChangeQRY_KSV_PO_MRP_PO_CD = (e, name) => {
        let val = (e.value && e.value.PO_CD) || "";

        let _dataQRY_KSV_PO_MRP = { ...dataQRY_KSV_PO_MRP };

        let tTypeVal = _dataQRY_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_PO_MRP[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_PO_MRP[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_PO_MRP(_dataQRY_KSV_PO_MRP);
        setDataQRY_KSV_PO_MRP_PO_CD(e.value);
    };

    const [datasQRY_KSV_PO_MRP_MATL_TYPE, setDatasQRY_KSV_PO_MRP_MATL_TYPE] =
        useState([]);
    const [dataQRY_KSV_PO_MRP_MATL_TYPE, setDataQRY_KSV_PO_MRP_MATL_TYPE] =
        useState({});

    const onDropdownChangeQRY_KSV_PO_MRP_MATL_TYPE = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataQRY_KSV_PO_MRP = { ...dataQRY_KSV_PO_MRP };

        let tTypeVal = _dataQRY_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_PO_MRP[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_PO_MRP[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_PO_MRP(_dataQRY_KSV_PO_MRP);
        setDataQRY_KSV_PO_MRP_MATL_TYPE(e.value);
    };

    const onInputChangeQRY_KSV_PO_MRP_MATL_NAME = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_PO_MRP = { ...dataQRY_KSV_PO_MRP };

        let tTypeVal = _dataQRY_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string") _dataQRY_KSV_PO_MRP[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_PO_MRP[`${name}`] = parseInt(val);

        setDataQRY_KSV_PO_MRP(_dataQRY_KSV_PO_MRP);
    };

    const onInputChangeQRY_KSV_PO_MRP_COLOR = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_PO_MRP = { ...dataQRY_KSV_PO_MRP };

        let tTypeVal = _dataQRY_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string") _dataQRY_KSV_PO_MRP[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_PO_MRP[`${name}`] = parseInt(val);

        setDataQRY_KSV_PO_MRP(_dataQRY_KSV_PO_MRP);
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

        setDataQRY_KSV_PO_MRP(_dataQRY_KSV_PO_MRP);
        setDataQRY_KSV_PO_MRP_VENDOR_TYPE(e.value);
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

    const onInputChangeQRY_KSV_PO_MRP_SPEC = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_PO_MRP = { ...dataQRY_KSV_PO_MRP };

        let tTypeVal = _dataQRY_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string") _dataQRY_KSV_PO_MRP[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_PO_MRP[`${name}`] = parseInt(val);

        setDataQRY_KSV_PO_MRP(_dataQRY_KSV_PO_MRP);
    };

    const onInputChangeQRY_KSV_PO_MRP_MATL_CD = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_PO_MRP = { ...dataQRY_KSV_PO_MRP };

        let tTypeVal = _dataQRY_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string") _dataQRY_KSV_PO_MRP[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_PO_MRP[`${name}`] = parseInt(val);

        setDataQRY_KSV_PO_MRP(_dataQRY_KSV_PO_MRP);
    };

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

    /* TABLE KSV_PO_MRP*/
    // DEFINE DATAGRID : TBL_KSV_PO_MRP
    const [datasTBL_KSV_PO_MRP, setDatasTBL_KSV_PO_MRP] = useState([]);
    const dt_TBL_KSV_PO_MRP = useRef(null);
    const [dataTBL_KSV_PO_MRP, setDataTBL_KSV_PO_MRP] =
        useState(emptyTBL_KSV_PO_MRP);
    const [selectedTBL_KSV_PO_MRP, setSelectedTBL_KSV_PO_MRP] = useState([]);
    const [flagSelectModeTBL_KSV_PO_MRP, setFlagSelectModeTBL_KSV_PO_MRP] =
        useState(false);

    // DATAGRID CODE : TBL_KSV_PO_MRP
    const searchQuery = () => {
        var tObj = { ...dataQRY_KSV_PO_MRP };
        serviceS0403_MATL_PO_LIST.mgrQueryTBL_KSV_PO_MRP(tObj).then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                console.log(
                    "ServiceMgrKCD_BUYER.mgr1KcdStyle call => " + data.length,
                );
                setDatasTBL_KSV_PO_MRP(data);
            } else {
                console.log(
                    "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });
    };

    const onRowClick1TBL_KSV_PO_MRP = (argData0) => {
        var argData = {};

        if (typeof argData0.length !== "undefined") {
            argData = argData0[0];
        } else {
            argData = argData0;
        }

        let argTBL_KSV_PO_MRP = argData;

        setDataTBL_KSV_PO_MRP(argTBL_KSV_PO_MRP);
    };

    const onRowClickTBL_KSV_PO_MRP = (event) => {
        let argTBL_KSV_PO_MRP = event.data;
        if (flagSelectModeTBL_KSV_PO_MRP) return;

        // Service : NawooAll:mgrQueryTBL_KSV_PO_MRP
    };

    const exportExcelTBL_KSV_PO_MRP = () => {};

    useEffect(() => {
        var tObj = { ...emptyQRY_KSV_PO_MRP };
        serviceS0403_MATL_PO_LIST.mgrQuery_CODE(tObj).then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                console.log(
                    "ServiceMgrKCD_BUYER.mgr1KcdStyle call => " +
                        data.MATL_TYPE.length,
                );
                setDatasQRY_KSV_PO_MRP_MATL_TYPE(data.MATL_TYPE);
                setDataQRY_KSV_PO_MRP_MATL_TYPE(data.MATL_TYPE[0]);

                setDatasQRY_KSV_PO_MRP_VENDOR_TYPE(data.VENDOR_TYPE);
                setDataQRY_KSV_PO_MRP_VENDOR_TYPE(data.VENDOR_TYPE[0]);

                setDatasQRY_KSV_PO_MRP_BUYER_CD(data.BUYER_CD);
                setDataQRY_KSV_PO_MRP_BUYER_CD(data.BUYER_CD[0]);

                setDatasQRY_KSV_PO_MRP_PO_CD(data.PO_CD);
                setDataQRY_KSV_PO_MRP_PO_CD(data.PO_CD[0]);

                setDatasQRY_KSV_PO_MRP_VENDOR_CD(data.VENDOR_CD);
                setDataQRY_KSV_PO_MRP_VENDOR_CD(data.VENDOR_CD[0]);
            } else {
                console.log(
                    "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });

        serviceS0403_MATL_PO_LIST.mgrQueryTBL_KSV_PO_MRP(tObj).then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                console.log(
                    "ServiceMgrKCD_BUYER.mgr1KcdStyle call => " + data.length,
                );
                setDatasTBL_KSV_PO_MRP(data);
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
                    width: "100rem",
                    height: "7rem",
                }}
            >
                <span
                    style={{
                        marginLeft: "0.5rem",
                        height: "2rem",
                        display: "inline-block",
                        width: "20rem",
                    }}
                >
                    <p style={{ width: "8rem", display: "inline-block" }}>
                        
                        <RadioButton /> PO Reg Date
                    </p>
                    <div
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "10rem",
                        }}
                    >
                        <Calendar
                            showButtonBar
                            dateFormat="yy-mm-dd"
                            id="id_PO_REG_S_DATE"
                            value={changeDateVal(
                                dataQRY_KSV_PO_MRP.PO_REG_S_DATE,
                            )}
                            onChange={(e) =>
                                onCalChangeQRY_KSV_PO_MRP_PO_REG_S_DATE(
                                    e,
                                    "PO_REG_S_DATE",
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
                    <p style={{ width: "1rem", display: "inline-block" }}>~</p>
                    <div
                        style={{
                            marginLeft: "2rem",
                            display: "inline-block",
                            width: "10rem",
                        }}
                    >
                        <Calendar
                            showButtonBar
                            dateFormat="yy-mm-dd"
                            id="id_PO_REG_E_DATE"
                            value={changeDateVal(
                                dataQRY_KSV_PO_MRP.PO_REG_E_DATE,
                            )}
                            onChange={(e) =>
                                onCalChangeQRY_KSV_PO_MRP_PO_REG_E_DATE(
                                    e,
                                    "PO_REG_E_DATE",
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
                        width: "40rem",
                    }}
                >
                    <p style={{ width: "8rem", display: "inline-block" }}>
                        
                        <RadioButton /> ETD
                    </p>
                    <div
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "23rem",
                        }}
                    >
                        <Calendar
                            showButtonBar
                            dateFormat="yy-mm-dd"
                            id="id_ETD_S_DATE"
                            value={changeDateVal(dataQRY_KSV_PO_MRP.ETD_S_DATE)}
                            onChange={(e) =>
                                onCalChangeQRY_KSV_PO_MRP_ETD_S_DATE(
                                    e,
                                    "ETD_S_DATE",
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
                    <p style={{ width: "8rem", display: "inline-block" }}>PO</p>
                    <div
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "17rem",
                        }}
                    >
                        <Dropdown
                            id="id_PO_CD"
                            value={dataQRY_KSV_PO_MRP_PO_CD}
                            onChange={(e) =>
                                onDropdownChangeQRY_KSV_PO_MRP_PO_CD(e, "PO_CD")
                            }
                            options={datasQRY_KSV_PO_MRP_PO_CD}
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
                        width: "27rem",
                    }}
                >
                    <p style={{ width: "8rem", display: "inline-block" }}>Matl Type</p>
                    <div
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "17rem",
                        }}
                    >
                        <Dropdown
                            id="id_MATL_TYPE"
                            value={dataQRY_KSV_PO_MRP_MATL_TYPE}
                            onChange={(e) =>
                                onDropdownChangeQRY_KSV_PO_MRP_MATL_TYPE(
                                    e,
                                    "MATL_TYPE",
                                )
                            }
                            options={datasQRY_KSV_PO_MRP_MATL_TYPE}
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
                        width: "27rem",
                    }}
                >
                    <p style={{ width: "8rem", display: "inline-block" }}>Desc</p>
                    <InputText
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "17rem",
                        }}
                        id="id_MATL_NAME"
                        value={dataQRY_KSV_PO_MRP.MATL_NAME}
                        onChange={(e) =>
                            onInputChangeQRY_KSV_PO_MRP_MATL_NAME(
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
                            width: "17rem",
                        }}
                        id="id_COLOR"
                        value={dataQRY_KSV_PO_MRP.COLOR}
                        onChange={(e) =>
                            onInputChangeQRY_KSV_PO_MRP_COLOR(e, "COLOR")
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
                    <p style={{ width: "8rem", display: "inline-block" }}>Supplier Type</p>
                    <div
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "17rem",
                        }}
                    >
                        <Dropdown
                            id="id_VENDOR_TYPE"
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
                            width: "17rem",
                        }}
                    >
                        <Dropdown
                            id="id_VENDOR_CD"
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
                            editable
                        ></Dropdown>
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
                    <p style={{ width: "8rem", display: "inline-block" }}>Spec</p>
                    <InputText
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "17rem",
                        }}
                        id="id_SPEC"
                        value={dataQRY_KSV_PO_MRP.SPEC}
                        onChange={(e) =>
                            onInputChangeQRY_KSV_PO_MRP_SPEC(e, "SPEC")
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
                            width: "17rem",
                        }}
                        id="id_MATL_CD"
                        value={dataQRY_KSV_PO_MRP.MATL_CD}
                        onChange={(e) =>
                            onInputChangeQRY_KSV_PO_MRP_MATL_CD(e, "MATL_CD")
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
                    <p style={{ width: "8rem", display: "inline-block" }}>Buyer</p>
                    <div
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "17rem",
                        }}
                    >
                        <Dropdown
                            id="id_BUYER_CD"
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
                        onClick={searchQuery}
                    />

                    <Button
                        label="Excel"
                        icon="pi pi-upload"
                        style={{ height: "1.1rem" }}
                        className="p-button-text green"
                        onClick={exportExcelTBL_KSV_PO_MRP}
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
                    ref={dt_TBL_KSV_PO_MRP}
                    size="small"
                    value={datasTBL_KSV_PO_MRP}
                    resizableColumns
                    columnResizeMode="fit"
                    showGridlines
                    selectionMode="checkbox"
                    selection={selectedTBL_KSV_PO_MRP}
                    onSelectionChange={(e) => {
                        setFlagSelectModeTBL_KSV_PO_MRP(true);
                        setSelectedTBL_KSV_PO_MRP(e.value);
                        console.log(
                            "selected length:" + selectedTBL_KSV_PO_MRP.length,
                        );
                        onRowClick1TBL_KSV_PO_MRP(e.value);
                    }}
                    onRowClick={onRowClickTBL_KSV_PO_MRP}
                    dataKey="id"
                    className="datatable-responsive"
                    virtualScrollerOptions={{ itemSize: 13 }}
                    emptyMessage=" " //header={headerTBL_KSV_PO_MRP}
                    responsiveLayout="scroll"
                    scrollable
                    scrollHeight="26rem"
                >
                    <AFColumn field="PO_CD" headerClassName="t-header" header="PO" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="ORDER_CD" headerClassName="t-header" header="Order" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="STYLE_NAME" headerClassName="t-header" header="Style" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="VENDOR_NAME" headerClassName="t-header" header="Supplier" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="MATL_NAME" headerClassName="t-header" header="Description" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="COLOR" headerClassName="t-header" header="Color" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="SPEC" headerClassName="t-header" header="Spec" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="UNIT" headerClassName="t-header" header="Unit" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="MATL_CD" headerClassName="t-header" header="Matl Cd" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="CURR_CD" headerClassName="t-header" header="Curr" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="MATL_PRICE" headerClassName="t-header" header="M Price" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="TOT_AMT" headerClassName="t-header" header="Amout" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="EXP_USEQTY" headerClassName="t-header" header="Mrp Qty" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="EXP_POQTY" headerClassName="t-header" header="Po Qty" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="PO_DATE" headerClassName="t-header" header="Po Date" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="MATL_DUE_DATE" headerClassName="t-header" header="Due Date" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="EXP_DIFF" headerClassName="t-header" header="Diff Qty" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
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
                            onClick={blankFn}
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

export default React.memo(S0403_MATL_PO_LIST, comparisonFn);
