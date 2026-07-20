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
import { ServiceS051801_FACTORY_ARRIVAL_ETP } from "../service/service_biz/ServiceS051801_FACTORY_ARRIVAL_ETP";

import "./page_common.scss";

const emptyKCD_CODE = {
    id: 0,
    CD_GROUP: "",
    CD_CODE: "",
    CD_NAME: "",
    CD_FLAG: "",
};

const emptyQRY_KSV_PO_MRP = {
    STATUS_CD: "",
    SHIP_MODE: "",
    ORIGIN_PORT: "",
    DESTINATION: "",
    ETA: "",
};

const emptyQRY_KSV_PO_MRP2 = {
    IN_QTY: "",
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
    CUSTOMER_NO: "",
};

const S051801_FACTORY_ARRIVAL_ETP = () => {
    const serviceLibRef = useRef(null);
    if (!serviceLibRef.current) {
        serviceLibRef.current = new ServiceLib();
        serviceLibRef.current.loginConfirm();
    }
    const serviceLib = serviceLibRef.current;
    const serviceS051801_FACTORY_ARRIVAL_ETP =
        new ServiceS051801_FACTORY_ARRIVAL_ETP();

    const toast = useRef(null);

    /* splitter 관련 */
    const [styleVal, setStyleVal] = useState({ width: "65vw" });

    //
    const [urlIframe, setUrlIframe] = useState("");
    const [createDialog, setCreateDialog] = useState(false);
    const hideDialog = () => {
        setCreateDialog(false);
    };

    // Search

    // Search KSV_STOCK_MEM
    const search_LIST_1 = () => {
        setSelectedTBL_KSV_PO_MRP2([]);
        setDatasTBL_KSV_PO_MRP2([]);

        var tObj = { ...dataQRY_KSV_PO_MRP };

        setLoadingTBL_KSV_PO_MRP(true);

        // 3_1
        serviceS051801_FACTORY_ARRIVAL_ETP
            .mgrQuery_LIST_1(tObj)
            .then((data) => {
                setLoadingTBL_KSV_PO_MRP(false);
                if (typeof data.graphQLErrors === "undefined") {
                    var tArray = data.map((col, i) => {
                        var tObj = { ...col };
                        tObj.id = i + 1;
                        return tObj;
                    });
                    setDatasTBL_KSV_PO_MRP(tArray);
                } else {
                    console.log(
                        "mgrQuery_PO_CD error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });
    };

    const search_LIST_2 = (argData) => {
        var tObj = {};
        tObj.SHIPMENT_CD = argData.SHIPMENT_CD;

        setLoadingTBL_KSV_PO_MRP2(true);

        // 3_2
        serviceS051801_FACTORY_ARRIVAL_ETP
            .mgrQuery_LIST_2(tObj)
            .then((data) => {
                setLoadingTBL_KSV_PO_MRP2(false);
                if (typeof data.graphQLErrors === "undefined") {
                    var tArray = data.map((col, i) => {
                        var tObj = { ...col };
                        tObj.id = i + 1;
                        return tObj;
                    });
                    setDatasTBL_KSV_PO_MRP2(tArray);
                } else {
                    console.log(
                        "mgrQuery_PO_CD error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });
    };

    const process_CUSTOMER_NO = () => {
        var tInput0 = { ...dataEDT_KSV_PO_MRP };
        var tInput = [...selectedTBL_KSV_PO_MRP];

        var tObjs = tInput.map((col, i) => {
            var tObj = { ...col };
            if (typeof tObj.__typename !== "undefined") delete tObj.__typename;
            if (typeof tObj.id !== "undefined") delete tObj.id;
            return tObj;
        });

        serviceS051801_FACTORY_ARRIVAL_ETP
            .mgrUpdate_CUSTOMER_NO(tInput0, tObjs)
            .then((data) => {
                if (typeof data.graphQLErrors === "undefined") {
                    console.log("mgrInsert_STOCK_IN call => " + data[0].CODE);
                    toast.current.show({
                        severity: "success",
                        summary: "Success:Delete Shipment",
                        detail: data[0].CODE,
                        life: 3000,
                    });
                    setSelectedTBL_KSV_PO_MRP([]);
                    search_LIST_1();
                } else {
                    // console.log("mgrQuery_PO_CD error => " + JSON.stringify(data.graphQLErrors));
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

    const onCalChangeQRY_KSV_PO_MRP_ETA = (e, name) => {
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

    const [
        datasQRY_KSV_PO_MRP_ORIGIN_PORT,
        setDatasQRY_KSV_PO_MRP_ORIGIN_PORT,
    ] = useState([]);
    const [dataQRY_KSV_PO_MRP_ORIGIN_PORT, setDataQRY_KSV_PO_MRP_ORIGIN_PORT] =
        useState({});

    const onDropdownChangeQRY_KSV_PO_MRP_ORIGIN_PORT = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataQRY_KSV_PO_MRP = { ...dataQRY_KSV_PO_MRP };

        let tTypeVal = _dataQRY_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_PO_MRP[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_PO_MRP[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_PO_MRP(_dataQRY_KSV_PO_MRP);
        setDataQRY_KSV_PO_MRP_ORIGIN_PORT(e.value);
    };

    const [
        datasQRY_KSV_PO_MRP_DESTINATION,
        setDatasQRY_KSV_PO_MRP_DESTINATION,
    ] = useState([]);
    const [dataQRY_KSV_PO_MRP_DESTINATION, setDataQRY_KSV_PO_MRP_DESTINATION] =
        useState({});

    const onDropdownChangeQRY_KSV_PO_MRP_DESTINATION = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataQRY_KSV_PO_MRP = { ...dataQRY_KSV_PO_MRP };

        let tTypeVal = _dataQRY_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_PO_MRP[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_PO_MRP[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_PO_MRP(_dataQRY_KSV_PO_MRP);
        setDataQRY_KSV_PO_MRP_DESTINATION(e.value);
    };

    const [datasQRY_KSV_PO_MRP_SHIP_MODE, setDatasQRY_KSV_PO_MRP_SHIP_MODE] =
        useState([]);
    const [dataQRY_KSV_PO_MRP_SHIP_MODE, setDataQRY_KSV_PO_MRP_SHIP_MODE] =
        useState({});

    const onDropdownChangeQRY_KSV_PO_MRP_SHIP_MODE = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataQRY_KSV_PO_MRP = { ...dataQRY_KSV_PO_MRP };

        let tTypeVal = _dataQRY_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_PO_MRP[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_PO_MRP[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_PO_MRP(_dataQRY_KSV_PO_MRP);
        setDataQRY_KSV_PO_MRP_SHIP_MODE(e.value);
    };

    const [datasQRY_KSV_PO_MRP_STATUS_CD, setDatasQRY_KSV_PO_MRP_STATUS_CD] =
        useState([]);
    const [dataQRY_KSV_PO_MRP_STATUS_CD, setDataQRY_KSV_PO_MRP_STATUS_CD] =
        useState({});

    const onDropdownChangeQRY_KSV_PO_MRP_STATUS_CD = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataQRY_KSV_PO_MRP = { ...dataQRY_KSV_PO_MRP };

        let tTypeVal = _dataQRY_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_PO_MRP[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_PO_MRP[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_PO_MRP(_dataQRY_KSV_PO_MRP);
        setDataQRY_KSV_PO_MRP_STATUS_CD(e.value);
    };

    /* QRY KSV_PO_MRP*/
    const [dataQRY_KSV_PO_MRP2, setDataQRY_KSV_PO_MRP2] =
        useState(emptyQRY_KSV_PO_MRP2);

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

    const onRowClick1TBL_KSV_PO_MRP = (argData0) => {
        var argData = {};

        if (typeof argData0.length !== "undefined") {
            if (argData0.length <= 0) return;
            argData = argData0[0];
        } else {
            argData = argData0;
        }

        let argTBL_KSV_PO_MRP = argData;

        setDataTBL_KSV_PO_MRP(argTBL_KSV_PO_MRP);

        search_LIST_2(argData);
        // resetEDT_KSV_PO_MRP(argData);
    };

    const onRowClickTBL_KSV_PO_MRP = (event) => {
        let argTBL_KSV_PO_MRP = event.data;
        if (flagSelectModeTBL_KSV_PO_MRP) return;

        // Service : NawooAll:mgrQueryTBL_KSV_PO_MRP
    };

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
            argData = argData0[0];
        } else {
            argData = argData0;
        }

        let argTBL_KSV_PO_MRP2 = argData;

        setDataTBL_KSV_PO_MRP2(argTBL_KSV_PO_MRP2);
    };

    const onRowClickTBL_KSV_PO_MRP2 = (event) => {
        let argTBL_KSV_PO_MRP2 = event.data;
        if (flagSelectModeTBL_KSV_PO_MRP2) return;

        // Service : NawooAll:mgrQueryTBL_KSV_PO_MRP2
    };

    /* QRY KSV_PO_MRP*/
    const [dataEDT_KSV_PO_MRP, setDataEDT_KSV_PO_MRP] =
        useState(emptyEDT_KSV_PO_MRP);

    const onInputChangeEDT_KSV_PO_MRP_CUSTOMER_NO = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_PO_MRP = { ...dataEDT_KSV_PO_MRP };

        let tTypeVal = _dataEDT_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string") _dataEDT_KSV_PO_MRP[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_PO_MRP[`${name}`] = parseInt(val);

        setDataEDT_KSV_PO_MRP(_dataEDT_KSV_PO_MRP);
    };

    ///

    useEffect(() => {
        var tObj = {};
        serviceS051801_FACTORY_ARRIVAL_ETP.mgrQuery_CODE(tObj).then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                setDatasQRY_KSV_PO_MRP_SHIP_MODE(data.SHIP_MODE);
                setDataQRY_KSV_PO_MRP_SHIP_MODE(data.SHIP_MODE[0]);

                setDatasQRY_KSV_PO_MRP_DESTINATION(data.DESTINATION);
                setDataQRY_KSV_PO_MRP_DESTINATION(data.DESTINATION[2]);

                setDatasQRY_KSV_PO_MRP_ORIGIN_PORT(data.ORIGIN_PORT);
                setDataQRY_KSV_PO_MRP_ORIGIN_PORT(data.ORIGIN_PORT[0]);

                setDatasQRY_KSV_PO_MRP_STATUS_CD(data.STATUS_CD);
                setDataQRY_KSV_PO_MRP_STATUS_CD(data.STATUS_CD[0]);
            } else {
                console.log(
                    "mgrQuery_PO_CD error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });

        search_LIST_1();
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
        <div>
            <div
                style={{
                    float: "left",
                    marginLeft: "1rem",
                    marginTop: "1rem",
                    width: "99rem",
                    height: "30rem",
                }}
            >
                <div
                    style={{
                        marginLeft: "1rem",
                        marginTop: "1rem",
                        width: "99rem",
                        height: "4rem",
                    }}
                >
                    <span
                        style={{
                            height: "2rem",
                            display: "inline-block",
                            width: "20rem",
                        }}
                    >
                        <p style={{ width: "8rem", display: "inline-block" }}>Origin Port</p>
                        <div
                            style={{
                                marginLeft: "0.5rem",
                                display: "inline-block",
                                width: "11rem",
                            }}
                        >
                            <Dropdown
                                id="id_ORIGIN_PORT"
                                value={dataQRY_KSV_PO_MRP_ORIGIN_PORT}
                                onChange={(e) =>
                                    onDropdownChangeQRY_KSV_PO_MRP_ORIGIN_PORT(
                                        e,
                                        "ORIGIN_PORT",
                                    )
                                }
                                options={datasQRY_KSV_PO_MRP_ORIGIN_PORT}
                                optionLabel="CD_NAME"
                                placeholder=""
                                editable
                                filter
                            ></Dropdown>
                        </div>
                    </span>
                    <span
                        style={{
                            height: "2rem",
                            display: "inline-block",
                            width: "20rem",
                        }}
                    >
                        <p style={{ width: "8rem", display: "inline-block" }}>Destinaion</p>
                        <div
                            style={{
                                marginLeft: "0.5rem",
                                display: "inline-block",
                                width: "11rem",
                            }}
                        >
                            <Dropdown
                                id="id_DESTINATION"
                                value={dataQRY_KSV_PO_MRP_DESTINATION}
                                onChange={(e) =>
                                    onDropdownChangeQRY_KSV_PO_MRP_DESTINATION(
                                        e,
                                        "DESTINATION",
                                    )
                                }
                                options={datasQRY_KSV_PO_MRP_DESTINATION}
                                optionLabel="CD_NAME"
                                placeholder=""
                                editable
                                filter
                            ></Dropdown>
                        </div>
                    </span>
                    <span
                        style={{
                            height: "2rem",
                            display: "inline-block",
                            width: "20rem",
                        }}
                    >
                        <p style={{ width: "8rem", display: "inline-block" }}>Status</p>
                        <div
                            style={{
                                marginLeft: "0.5rem",
                                display: "inline-block",
                                width: "11rem",
                            }}
                        >
                            <Dropdown
                                id="id_STATUS_CD"
                                value={dataQRY_KSV_PO_MRP_STATUS_CD}
                                onChange={(e) =>
                                    onDropdownChangeQRY_KSV_PO_MRP_STATUS_CD(
                                        e,
                                        "STATUS_CD",
                                    )
                                }
                                options={datasQRY_KSV_PO_MRP_STATUS_CD}
                                optionLabel="CD_NAME"
                                placeholder=""
                                editable
                                filter
                            ></Dropdown>
                        </div>
                    </span>
                    <span
                        style={{
                            height: "2rem",
                            display: "inline-block",
                            width: "20rem",
                        }}
                    >
                        <p style={{ width: "8rem", display: "inline-block" }}>Ship Mode</p>
                        <div
                            style={{
                                marginLeft: "0.5rem",
                                display: "inline-block",
                                width: "11rem",
                            }}
                        >
                            <Dropdown
                                id="id_SHIP_MODE"
                                value={dataQRY_KSV_PO_MRP_SHIP_MODE}
                                onChange={(e) =>
                                    onDropdownChangeQRY_KSV_PO_MRP_SHIP_MODE(
                                        e,
                                        "SHIP_MODE",
                                    )
                                }
                                options={datasQRY_KSV_PO_MRP_SHIP_MODE}
                                optionLabel="CD_NAME"
                                placeholder=""
                                editable
                                filter
                            ></Dropdown>
                        </div>
                    </span>
                    <span
                        style={{
                            height: "2rem",
                            display: "inline-block",
                            width: "20rem",
                        }}
                    >
                        <p style={{ width: "8rem", display: "inline-block" }}>ETA</p>
                        <div
                            style={{
                                height: "2rem",
                                display: "inline-block",
                                width: "11rem",
                                marginLeft: "0.5rem",
                            }}
                        >
                            <Calendar
                                showButtonBar
                                dateFormat="yy-mm-dd"
                                id="id_ETA"
                                value={changeDateVal(dataQRY_KSV_PO_MRP.ETA)}
                                onChange={(e) =>
                                    onCalChangeQRY_KSV_PO_MRP_ETA(e, "ETA")
                                }
                            />
                        </div>
                    </span>
                    <span
                        style={{
                            height: "2rem",
                            display: "inline-block",
                            width: "10rem",
                        }}
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
                            style={{ height: "1.1rem" }}
                            icon="pi pi-search"
                            className="p-button-text"
                            onClick={search_LIST_1}
                        />
                    </span>
                </div>

                <div
                    style={{
                        marginLeft: "0.5rem",
                        marginTop: "1rem",
                        width: "99rem",
                        height: "26rem",
                    }}
                >
                    <AFDataTable preventUnrelatedRerender
                        ref={dt_TBL_KSV_PO_MRP}
                        size="small"
                        value={datasTBL_KSV_PO_MRP}
                        loading={loadingTBL_KSV_PO_MRP}
                        showGridlines
                        selectionMode="checkbox"
                        resizableColumns
                        columnResizeMode="fit"
                        selection={selectedTBL_KSV_PO_MRP}
                        onSelectionChange={(e) => {
                            setFlagSelectModeTBL_KSV_PO_MRP(true);
                            setSelectedTBL_KSV_PO_MRP(e.value);
                            console.log(
                                "selected length:" +
                                    selectedTBL_KSV_PO_MRP.length,
                            );
                            onRowClick1TBL_KSV_PO_MRP(e.value);
                        }}
                        onRowClick={onRowClickTBL_KSV_PO_MRP}
                        dataKey="id"
                        className="datatable-responsive"
                        virtualScrollerOptions={{ itemSize: 12 }}
                        emptyMessage=" " //header={headerTBL_KSV_PO_MRP}
                        responsiveLayout="scroll"
                        scrollable
                        scrollHeight="24rem"
                    >
                        <AFColumn field="ATA" headerClassName="t-header" header="ATA" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                        <AFColumn field="CLEARANCE_NO" headerClassName="t-header" header="Customer#" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                        <AFColumn field="SHIPMENT_CD" headerClassName="t-header" header="Ship#" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                        <AFColumn field="STATUS_CD" headerClassName="t-header" header="Status" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                        <AFColumn field="REG_DATETIME" headerClassName="t-header" header="Ship Date" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                        <AFColumn field="SHIP_MODE" headerClassName="t-header" header="Ship.Mode" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                        <AFColumn field="ORG_ORIGIN_PORT" headerClassName="t-header" header="Origin" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                        <AFColumn field="ORG_DESTINATION" headerClassName="t-header" header="Destination" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                        <AFColumn field="DESTINATION" headerClassName="t-header" header="Temp.Destination" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                        <AFColumn field="IS_SINGAPORE" headerClassName="t-header" header="Singapore.Comb" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                        <AFColumn field="BL_NO" headerClassName="t-header" header="BL.NO" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                        <AFColumn field="ETA" headerClassName="t-header" header="ETA" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                        <AFColumn field="S_WEIGHT" headerClassName="t-header" header="Weight" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                        <AFColumn field="S_CBM" headerClassName="t-header" header="CBM" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                        <AFColumn field="S_SHIP_COST" headerClassName="t-header" header="Ship Cost" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                        <AFColumn field="S_IMPORT_COST" headerClassName="t-header" header="Import Cost" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                        <AFColumn field="BL_FILE" headerClassName="t-header" header="BL File" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                        <AFColumn field="PL_FILE" headerClassName="t-header" header="PL File" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                        <AFColumn field="CI_FILE" headerClassName="t-header" header="CI File" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    </AFDataTable>
                </div>
            </div>

            <div
                style={{
                    float: "left",
                    marginLeft: "0.5rem",
                    marginTop: "1rem",
                    width: "99rem",
                    height: "3rem",
                }}
            >
                <div
                    style={{
                        marginTop: "1rem",
                        width: "70rem",
                        height: "3rem",
                    }}
                >
                    <span
                        style={{
                            height: "2rem",
                            display: "inline-block",
                            width: "24rem",
                        }}
                    >
                        <p style={{ width: "8rem", display: "inline-block" }}>Customer#</p>
                        <InputText
                            style={{
                                marginLeft: "0.5rem",
                                display: "inline-block",
                                width: "15rem",
                            }}
                            id="id_CONTAINER_NO"
                            value={dataEDT_KSV_PO_MRP.CUSTOMER_NO}
                            onChange={(e) =>
                                onInputChangeEDT_KSV_PO_MRP_CUSTOMER_NO(
                                    e,
                                    "CUSTOMER_NO",
                                )
                            }
                        />
                    </span>
                    <span
                        style={{
                            height: "2rem",
                            display: "inline-block",
                            width: "10rem",
                        }}
                    >
                        <Button
                            label="Save"
                            style={{ height: "1.1rem" }}
                            icon="pi pi-search"
                            className="p-button-text"
                            onClick={process_CUSTOMER_NO}
                        />
                    </span>
                </div>
            </div>

            <div
                style={{
                    float: "left",
                    marginLeft: "1rem",
                    marginTop: "1rem",
                    width: "99rem",
                    height: "30rem",
                }}
            >
                <div
                    style={{
                        marginLeft: "0.5rem",
                        marginTop: "1rem",
                        width: "98rem",
                        height: "26rem",
                    }}
                >
                    <AFDataTable preventUnrelatedRerender
                        ref={dt_TBL_KSV_PO_MRP2}
                        size="small"
                        value={datasTBL_KSV_PO_MRP2}
                        resizableColumns
                        columnResizeMode="fit"
                        loading={loadingTBL_KSV_PO_MRP2}
                        showGridlines
                        selectionMode="checkbox"
                        selection={selectedTBL_KSV_PO_MRP2}
                        onSelectionChange={(e) => {
                            setFlagSelectModeTBL_KSV_PO_MRP2(true);
                            setSelectedTBL_KSV_PO_MRP2(e.value);
                            console.log(
                                "selected length:" +
                                    selectedTBL_KSV_PO_MRP2.length,
                            );
                            onRowClick1TBL_KSV_PO_MRP2(e.value);
                        }}
                        onRowClick={onRowClickTBL_KSV_PO_MRP2}
                        dataKey="id"
                        className="datatable-responsive"
                        virtualScrollerOptions={{ itemSize: 12 }}
                        emptyMessage=" " //header={headerTBL_KSV_PO_MRP2}
                        responsiveLayout="scroll"
                        scrollable
                        scrollHeight="24rem"
                    >
                        <AFColumn field="PU_CD" headerClassName="t-header" header="Pu#" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                        <AFColumn field="STSOUT_CD" headerClassName="t-header" header="Stsout#" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                        <AFColumn field="INVOICE_NO" headerClassName="t-header" header="Invoice#" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                        <AFColumn field="TRADE_TERM" headerClassName="t-header" header="Trade.Term" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                        <AFColumn field="READY_DATE" headerClassName="t-header" header="Ready.Date" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                        <AFColumn field="ETA" headerClassName="t-header" header="ETA" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                        <AFColumn field="ORIGIN_PORT" headerClassName="t-header" header="Origin.Port" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                        <AFColumn field="DESTINATION" headerClassName="t-header" header="Dest.Port" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                        <AFColumn field="CT_QTY" headerClassName="t-header" header="CT.QTY" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                        <AFColumn field="CBM" headerClassName="t-header" header="CBM" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                        <AFColumn field="WEIGHT" headerClassName="t-header" header="Weight" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                        <AFColumn field="VENDOR_CD" headerClassName="t-header" header="Supplier" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                        <AFColumn field="BUYER_CD" headerClassName="t-header" header="Buyer" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                        <AFColumn field="PO_CD" headerClassName="t-header" header="PO#" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    </AFDataTable>
                </div>
            </div>

            <Divider />
            <Toast ref={toast} />

            <Dialog
                visible={createDialog}
                position="top-right"
                style={{ width: "98vw" }}
                header=""
                modal={true}
                className="p-fluid"
                onHide={hideDialog}
            >
                <iframe
                    src={urlIframe}
                    width="1400px"
                    height="1000px"
                    id="id1"
                    className="myClassname"
                    scrolling="yes"
                />
            </Dialog>
        </div>
    );
};

const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(S051801_FACTORY_ARRIVAL_ETP, comparisonFn);
