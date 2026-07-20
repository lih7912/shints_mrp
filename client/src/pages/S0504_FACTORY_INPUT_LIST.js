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
import { ServiceS0504_FACTORY_INPUT_LIST } from "../service/service_biz/ServiceS0504_FACTORY_INPUT_LIST";

import "./page_common.scss";

const emptyKCD_CODE = {
    id: 0,
    CD_GROUP: "",
    CD_CODE: "",
    CD_NAME: "",
    CD_FLAG: "",
};

const emptyQRY_KSV_STOCK_FACIN = {
    PO_NO: "",
    FACTORY_CD: "",
    TYPE: "",
    MATL_CD: "",
    BUYER_CD: "",
    VENDOR_CD: "",
    SPEC: "",
    MATL_NAME: "",
    COLOR: "",
    UNIT: "",
    DELIVERY: "",
};

const emptyTBL_KSV_STOCK_FACIN = {
    id: 0,
    PO_CD: "",
    IN_DATE: "",
    DELIVERY: "",
    VENDOR_NAME: "",
    MATL_NAME: "",
    COLOR: "",
    SPEC: "",
    UNIT: "",
    PO_QTY: "",
    IN_QTY: "",
    ERR_QTY: "",
    LOCATION: "",
    MATL_CD: "",
    VENDOR_TYPE: "",
    BUYER_NAME: "",
    REG_USER: "",
};

const S0504_FACTORY_INPUT_LIST = () => {
    const serviceLibRef = useRef(null);
    if (!serviceLibRef.current) {
        serviceLibRef.current = new ServiceLib();
        serviceLibRef.current.loginConfirm();
    }
    const serviceLib = serviceLibRef.current;
    const serviceS0504_FACTORY_INPUT_LIST =
        new ServiceS0504_FACTORY_INPUT_LIST();

    const toast = useRef(null);

    /* splitter 관련 */
    const [styleVal, setStyleVal] = useState({ width: "65vw" });

    const process_UPDATE_LOCATION = () => {
        var tObj0 = [...selectedTBL_KSV_STOCK_FACIN];

        var tIdx = 0;
        var tArray = [];
        for (tIdx = 0; tIdx < tObj0.length; tIdx++) {
            var tObj = { ...tObj0[tIdx] };
            Object.keys(tObj).forEach((col, i) => {
                if (tObj[`${col}`] === null || tObj[`${col}`] === " ") {
                    tObj[`${col}`] = "";
                }
            });
            delete tObj.id;
            delete tObj.__typename;
            tArray.push(tObj);
        }

        serviceS0504_FACTORY_INPUT_LIST
            .mgrInsert_UPDATE_LOCATION(tArray)
            .then((data) => {
                if (typeof data.graphQLErrors === "undefined") {
                    console.log(
                        "ServiceMgrKCD_BUYER.mgr1KcdStyle call => " +
                            data.length,
                    );
                    toast.current.show({
                        severity: "success",
                        summary: "SUCCE: Update Location",
                        detail: data[0].CODE,
                        life: 3000,
                    });
                } else {
                    console.log(
                        "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                    toast.current.show({
                        severity: "success",
                        summary: "Error: Update Location",
                        detail: "",
                        life: 3000,
                    });
                }
            });
    };

    const process_CANCEL_FACIN = () => {
        if (selectedTBL_KSV_STOCK_FACIN.length <= 0) return;

        var tObj0 = [...selectedTBL_KSV_STOCK_FACIN];

        var tIdx = 0;
        var tArray = [];
        for (tIdx = 0; tIdx < tObj0.length; tIdx++) {
            var tObj = { ...tObj0[tIdx] };
            Object.keys(tObj).forEach((col, i) => {
                if (tObj[`${col}`] === null || tObj[`${col}`] === " ") {
                    tObj[`${col}`] = "";
                }
            });
            delete tObj.id;
            delete tObj.__typename;
            tArray.push(tObj);
        }

        serviceS0504_FACTORY_INPUT_LIST
            .mgrInsert_CANCEL_FACIN(tArray)
            .then((data) => {
                if (typeof data.graphQLErrors === "undefined") {
                    console.log(
                        "ServiceMgrKCD_BUYER.mgr1KcdStyle call => " +
                            data.length,
                    );
                    if (data.length > 0)
                        toast.current.show({
                            severity: "success",
                            summary: "SUCCE: Update Location",
                            detail: data[0].CODE,
                            life: 3000,
                        });
                } else {
                    console.log(
                        "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                    toast.current.show({
                        severity: "success",
                        summary: "Error: Update Location",
                        detail: "",
                        life: 3000,
                    });
                }
            });
    };

    const search_LIST_1 = () => {
        var tObj = { ...dataQRY_KSV_STOCK_FACIN };

        Object.keys(tObj).forEach((col, i) => {
            if (tObj[`${col}`] === null || tObj[`${col}`] === " ") {
                tObj[`${col}`] = "";
            }
        });

        setDatasTBL_KSV_STOCK_FACIN([]);
        setSelectedTBL_KSV_STOCK_FACIN([]);

        if (tObj.PO_NO === "");
        else tObj.PO_NO = tObj.PO_NO.trim();

        // 2
        serviceS0504_FACTORY_INPUT_LIST.mgrQuery_LIST_1(tObj).then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                console.log(
                    "ServiceMgrKCD_BUYER.mgr1KcdStyle call => " + data.length,
                );

                var tArray = data.map((col, i) => {
                    var tObj = { ...col };
                    tObj.id = i + 1;
                    return tObj;
                });
                setDatasTBL_KSV_STOCK_FACIN(tArray);
            } else {
                console.log(
                    "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });
    };

    const search_LIST_2 = () => {
        var tObj = { ...dataQRY_KSV_STOCK_FACIN };

        Object.keys(tObj).forEach((col, i) => {
            if (tObj[`${col}`] === null || tObj[`${col}`] === " ") {
                tObj[`${col}`] = "";
            }
        });

        setDatasTBL_KSV_STOCK_FACIN([]);
        setSelectedTBL_KSV_STOCK_FACIN([]);

        if (tObj.PO_NO === "") return;
        else tObj.PO_NO = tObj.PO_NO.trim();

        // 4_3
        serviceS0504_FACTORY_INPUT_LIST.mgrQuery_LIST_2(tObj).then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                console.log(
                    "ServiceMgrKCD_BUYER.mgr1KcdStyle call => " + data.length,
                );

                var tArray = data.map((col, i) => {
                    var tObj = { ...col };
                    tObj.id = i + 1;
                    return tObj;
                });
                setDatasTBL_KSV_STOCK_FACIN(tArray);
            } else {
                console.log(
                    "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });
    };

    /*QRY KSV_STOCK_FACIN */
    const [dataQRY_KSV_STOCK_FACIN, setDataQRY_KSV_STOCK_FACIN] = useState(
        emptyQRY_KSV_STOCK_FACIN,
    );

    const onInputChangeQRY_KSV_STOCK_FACIN_PO_NO = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_STOCK_FACIN = { ...dataQRY_KSV_STOCK_FACIN };

        let tTypeVal = _dataQRY_KSV_STOCK_FACIN[`${name}`];
        if (typeof tTypeVal === "string")
            _dataQRY_KSV_STOCK_FACIN[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_STOCK_FACIN[`${name}`] = parseInt(val);

        setDataQRY_KSV_STOCK_FACIN(_dataQRY_KSV_STOCK_FACIN);
    };

    const [
        datasQRY_KSV_STOCK_FACIN_FACTORY_CD,
        setDatasQRY_KSV_STOCK_FACIN_FACTORY_CD,
    ] = useState([]);
    const [
        dataQRY_KSV_STOCK_FACIN_FACTORY_CD,
        setDataQRY_KSV_STOCK_FACIN_FACTORY_CD,
    ] = useState({});

    const onDropdownChangeQRY_KSV_STOCK_FACIN_FACTORY_CD = (e, name) => {
        let val = (e.value && e.value.FACTORY_CD) || "";

        let _dataQRY_KSV_STOCK_FACIN = { ...dataQRY_KSV_STOCK_FACIN };

        let tTypeVal = _dataQRY_KSV_STOCK_FACIN[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_STOCK_FACIN[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_STOCK_FACIN[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_STOCK_FACIN(_dataQRY_KSV_STOCK_FACIN);
        setDataQRY_KSV_STOCK_FACIN_FACTORY_CD(e.value);
    };

    const [datasQRY_KSV_STOCK_FACIN_TYPE, setDatasQRY_KSV_STOCK_FACIN_TYPE] =
        useState([]);
    const [dataQRY_KSV_STOCK_FACIN_TYPE, setDataQRY_KSV_STOCK_FACIN_TYPE] =
        useState({});

    const onDropdownChangeQRY_KSV_STOCK_FACIN_TYPE = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataQRY_KSV_STOCK_FACIN = { ...dataQRY_KSV_STOCK_FACIN };

        let tTypeVal = _dataQRY_KSV_STOCK_FACIN[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_STOCK_FACIN[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_STOCK_FACIN[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_STOCK_FACIN(_dataQRY_KSV_STOCK_FACIN);
        setDataQRY_KSV_STOCK_FACIN_TYPE(e.value);
    };

    const onInputChangeQRY_KSV_STOCK_FACIN_MATL_CD = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_STOCK_FACIN = { ...dataQRY_KSV_STOCK_FACIN };

        let tTypeVal = _dataQRY_KSV_STOCK_FACIN[`${name}`];
        if (typeof tTypeVal === "string")
            _dataQRY_KSV_STOCK_FACIN[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_STOCK_FACIN[`${name}`] = parseInt(val);

        setDataQRY_KSV_STOCK_FACIN(_dataQRY_KSV_STOCK_FACIN);
    };

    const [
        datasQRY_KSV_STOCK_FACIN_BUYER_CD,
        setDatasQRY_KSV_STOCK_FACIN_BUYER_CD,
    ] = useState([]);
    const [
        dataQRY_KSV_STOCK_FACIN_BUYER_CD,
        setDataQRY_KSV_STOCK_FACIN_BUYER_CD,
    ] = useState({});

    const onDropdownChangeQRY_KSV_STOCK_FACIN_BUYER_CD = (e, name) => {
        let val = (e.value && e.value.BUYER_CD) || "";

        let _dataQRY_KSV_STOCK_FACIN = { ...dataQRY_KSV_STOCK_FACIN };

        let tTypeVal = _dataQRY_KSV_STOCK_FACIN[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_STOCK_FACIN[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_STOCK_FACIN[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_STOCK_FACIN(_dataQRY_KSV_STOCK_FACIN);
        setDataQRY_KSV_STOCK_FACIN_BUYER_CD(e.value);
    };

    const [
        datasQRY_KSV_STOCK_FACIN_VENDOR_CD,
        setDatasQRY_KSV_STOCK_FACIN_VENDOR_CD,
    ] = useState([]);
    const [
        dataQRY_KSV_STOCK_FACIN_VENDOR_CD,
        setDataQRY_KSV_STOCK_FACIN_VENDOR_CD,
    ] = useState({});

    const onDropdownChangeQRY_KSV_STOCK_FACIN_VENDOR_CD = (e, name) => {
        let val = (e.value && e.value.VENDOR_CD) || "";

        let _dataQRY_KSV_STOCK_FACIN = { ...dataQRY_KSV_STOCK_FACIN };

        let tTypeVal = _dataQRY_KSV_STOCK_FACIN[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_STOCK_FACIN[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_STOCK_FACIN[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_STOCK_FACIN(_dataQRY_KSV_STOCK_FACIN);
        setDataQRY_KSV_STOCK_FACIN_VENDOR_CD(e.value);
    };

    const onInputChangeQRY_KSV_STOCK_FACIN_SPEC = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_STOCK_FACIN = { ...dataQRY_KSV_STOCK_FACIN };

        let tTypeVal = _dataQRY_KSV_STOCK_FACIN[`${name}`];
        if (typeof tTypeVal === "string")
            _dataQRY_KSV_STOCK_FACIN[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_STOCK_FACIN[`${name}`] = parseInt(val);

        setDataQRY_KSV_STOCK_FACIN(_dataQRY_KSV_STOCK_FACIN);
    };

    const onInputChangeQRY_KSV_STOCK_FACIN_MATL_NAME = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_STOCK_FACIN = { ...dataQRY_KSV_STOCK_FACIN };

        let tTypeVal = _dataQRY_KSV_STOCK_FACIN[`${name}`];
        if (typeof tTypeVal === "string")
            _dataQRY_KSV_STOCK_FACIN[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_STOCK_FACIN[`${name}`] = parseInt(val);

        setDataQRY_KSV_STOCK_FACIN(_dataQRY_KSV_STOCK_FACIN);
    };

    const onInputChangeQRY_KSV_STOCK_FACIN_COLOR = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_STOCK_FACIN = { ...dataQRY_KSV_STOCK_FACIN };

        let tTypeVal = _dataQRY_KSV_STOCK_FACIN[`${name}`];
        if (typeof tTypeVal === "string")
            _dataQRY_KSV_STOCK_FACIN[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_STOCK_FACIN[`${name}`] = parseInt(val);

        setDataQRY_KSV_STOCK_FACIN(_dataQRY_KSV_STOCK_FACIN);
    };

    const onInputChangeQRY_KSV_STOCK_FACIN_UNIT = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_STOCK_FACIN = { ...dataQRY_KSV_STOCK_FACIN };

        let tTypeVal = _dataQRY_KSV_STOCK_FACIN[`${name}`];
        if (typeof tTypeVal === "string")
            _dataQRY_KSV_STOCK_FACIN[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_STOCK_FACIN[`${name}`] = parseInt(val);

        setDataQRY_KSV_STOCK_FACIN(_dataQRY_KSV_STOCK_FACIN);
    };

    const onInputChangeQRY_KSV_STOCK_FACIN_DELIVERY = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_STOCK_FACIN = { ...dataQRY_KSV_STOCK_FACIN };

        let tTypeVal = _dataQRY_KSV_STOCK_FACIN[`${name}`];
        if (typeof tTypeVal === "string")
            _dataQRY_KSV_STOCK_FACIN[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_STOCK_FACIN[`${name}`] = parseInt(val);

        setDataQRY_KSV_STOCK_FACIN(_dataQRY_KSV_STOCK_FACIN);
    };

    /* TABLE KSV_STOCK_FACIN*/
    // DEFINE DATAGRID : TBL_KSV_STOCK_FACIN
    const [datasTBL_KSV_STOCK_FACIN, setDatasTBL_KSV_STOCK_FACIN] = useState(
        [],
    );
    const dt_TBL_KSV_STOCK_FACIN = useRef(null);
    const [dataTBL_KSV_STOCK_FACIN, setDataTBL_KSV_STOCK_FACIN] = useState(
        emptyTBL_KSV_STOCK_FACIN,
    );
    const [selectedTBL_KSV_STOCK_FACIN, setSelectedTBL_KSV_STOCK_FACIN] =
        useState([]);
    const [
        flagSelectModeTBL_KSV_STOCK_FACIN,
        setFlagSelectModeTBL_KSV_STOCK_FACIN,
    ] = useState(false);

    // DATAGRID CODE : TBL_KSV_STOCK_FACIN

    const onRowClick1TBL_KSV_STOCK_FACIN = (argData0) => {
        var argData = {};

        if (typeof argData0.length !== "undefined") {
            argData = argData0[0];
        } else {
            argData = argData0;
        }

        let argTBL_KSV_STOCK_FACIN = argData;

        setDataTBL_KSV_STOCK_FACIN(argTBL_KSV_STOCK_FACIN);
    };

    const onRowClickTBL_KSV_STOCK_FACIN = (event) => {
        let argTBL_KSV_STOCK_FACIN = event.data;
        if (flagSelectModeTBL_KSV_STOCK_FACIN) return;

        // Service : NawooAll:mgrQueryTBL_KSV_STOCK_FACIN
    };

    const exportExcelTBL_KSV_STOCK_FACIN = () => {};

    useEffect(() => {
        var _tObj = {};
        _tObj.KEY1 = "";

        serviceS0504_FACTORY_INPUT_LIST.mgrQuery_CODE(_tObj).then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                console.log(
                    "ServiceMgrKCD_BUYER.mgr1KcdStyle call => " +
                        data.FACTORY_CD.length,
                );
                setDatasQRY_KSV_STOCK_FACIN_FACTORY_CD(data.FACTORY_CD);
                setDataQRY_KSV_STOCK_FACIN_FACTORY_CD(data.FACTORY_CD[0]);

                setDatasQRY_KSV_STOCK_FACIN_TYPE(data.VENDOR_TYPE);
                setDataQRY_KSV_STOCK_FACIN_TYPE(data.VENDOR_TYPE[0]);

                setDatasQRY_KSV_STOCK_FACIN_BUYER_CD(data.BUYER_CD);
                setDataQRY_KSV_STOCK_FACIN_BUYER_CD(data.BUYER_CD[0]);

                setDatasQRY_KSV_STOCK_FACIN_VENDOR_CD(data.VENDOR_CD);
                setDataQRY_KSV_STOCK_FACIN_VENDOR_CD(data.VENDOR_CD[0]);
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

    return (
        <div>
            <div
                style={{
                    marginLeft: "1rem",
                    marginTop: "1rem",
                    width: "100rem",
                    height: "8rem",
                }}
            >
                <span
                    style={{
                        marginLeft: "0.5rem",
                        height: "2rem",
                        display: "inline-block",
                        width: "19rem",
                    }}
                >
                    <p style={{ width: "8rem", display: "inline-block" }}>In Date</p>
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
                            id="id_S_IN_DATE"
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
                    <p style={{ width: "1rem", display: "inline-block" }}>~</p>
                    <div
                        style={{
                            marginLeft: "1rem",
                            display: "inline-block",
                            width: "10rem",
                        }}
                    >
                        <Calendar
                            showButtonBar
                            dateFormat="yy-mm-dd"
                            id="id_E_IN_DATE"
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
                    <p style={{ width: "4rem", display: "inline-block" }}>Po No</p>
                    <InputText
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "10rem",
                        }}
                        id="id_PO_NO"
                        value={dataQRY_KSV_STOCK_FACIN.PO_NO}
                        onChange={(e) =>
                            onInputChangeQRY_KSV_STOCK_FACIN_PO_NO(e, "PO_NO")
                        }
                    />
                </span>
                <span
                    style={{
                        marginLeft: "0.5rem",
                        height: "2rem",
                        display: "inline-block",
                        width: "25rem",
                    }}
                >
                    <p style={{ width: "6rem", display: "inline-block" }}>Factory</p>
                    <div
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "18rem",
                        }}
                    >
                        <Dropdown
                            id="id_FACTORY_CD"
                            value={dataQRY_KSV_STOCK_FACIN_FACTORY_CD}
                            onChange={(e) =>
                                onDropdownChangeQRY_KSV_STOCK_FACIN_FACTORY_CD(
                                    e,
                                    "FACTORY_CD",
                                )
                            }
                            options={datasQRY_KSV_STOCK_FACIN_FACTORY_CD}
                            optionLabel="FACTORY_CD"
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
                        width: "20rem",
                    }}
                >
                    <p style={{ width: "8rem", display: "inline-block" }}>User</p>
                    <div
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "10rem",
                        }}
                    >
                        <Dropdown
                            id="id_TYPE"
                            value={dataQRY_KSV_STOCK_FACIN_TYPE}
                            onChange={(e) =>
                                onDropdownChangeQRY_KSV_STOCK_FACIN_TYPE(
                                    e,
                                    "TYPE",
                                )
                            }
                            options={datasQRY_KSV_STOCK_FACIN_TYPE}
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
                        width: "27.5rem",
                    }}
                >
                    <p style={{ width: "8rem", display: "inline-block" }}>Type</p>
                    <div
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "10rem",
                        }}
                    >
                        <Dropdown
                            id="id_TYPE"
                            value={dataQRY_KSV_STOCK_FACIN_TYPE}
                            onChange={(e) =>
                                onDropdownChangeQRY_KSV_STOCK_FACIN_TYPE(
                                    e,
                                    "TYPE",
                                )
                            }
                            options={datasQRY_KSV_STOCK_FACIN_TYPE}
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
                        width: "20rem",
                    }}
                >
                    <p style={{ width: "8rem", display: "inline-block" }}>Matl Cd</p>
                    <InputText
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "10rem",
                        }}
                        id="id_MATL_CD"
                        value={dataQRY_KSV_STOCK_FACIN.MATL_CD}
                        onChange={(e) =>
                            onInputChangeQRY_KSV_STOCK_FACIN_MATL_CD(
                                e,
                                "MATL_CD",
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
                    <p style={{ width: "5rem", display: "inline-block" }}>Buyer</p>
                    <div
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "23rem",
                        }}
                    >
                        <Dropdown
                            id="id_BUYER_CD"
                            value={dataQRY_KSV_STOCK_FACIN_BUYER_CD}
                            onChange={(e) =>
                                onDropdownChangeQRY_KSV_STOCK_FACIN_BUYER_CD(
                                    e,
                                    "BUYER_CD",
                                )
                            }
                            options={datasQRY_KSV_STOCK_FACIN_BUYER_CD}
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
                            value={dataQRY_KSV_STOCK_FACIN_VENDOR_CD}
                            onChange={(e) =>
                                onDropdownChangeQRY_KSV_STOCK_FACIN_VENDOR_CD(
                                    e,
                                    "VENDOR_CD",
                                )
                            }
                            options={datasQRY_KSV_STOCK_FACIN_VENDOR_CD}
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
                        width: "50rem",
                    }}
                >
                    <p style={{ width: "7.5rem", display: "inline-block" }}>Spec</p>
                    <InputText
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "15rem",
                        }}
                        id="id_SPEC"
                        value={dataQRY_KSV_STOCK_FACIN.SPEC}
                        onChange={(e) =>
                            onInputChangeQRY_KSV_STOCK_FACIN_SPEC(e, "SPEC")
                        }
                    />
                </span>
                <span
                    style={{
                        marginLeft: "0.5rem",
                        height: "2rem",
                        display: "inline-block",
                        width: "28rem",
                    }}
                >
                    <p style={{ width: "8rem", display: "inline-block" }}>Desc</p>
                    <InputText
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "18rem",
                        }}
                        id="id_MATL_NAME"
                        value={dataQRY_KSV_STOCK_FACIN.MATL_NAME}
                        onChange={(e) =>
                            onInputChangeQRY_KSV_STOCK_FACIN_MATL_NAME(
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
                        width: "24rem",
                    }}
                >
                    <p style={{ width: "7.5rem", display: "inline-block" }}>Color</p>
                    <InputText
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "15rem",
                        }}
                        id="id_COLOR"
                        value={dataQRY_KSV_STOCK_FACIN.COLOR}
                        onChange={(e) =>
                            onInputChangeQRY_KSV_STOCK_FACIN_COLOR(e, "COLOR")
                        }
                    />
                </span>
                <span
                    style={{
                        marginLeft: "0.5rem",
                        height: "2rem",
                        display: "inline-block",
                        width: "12rem",
                    }}
                >
                    <p style={{ width: "3rem", display: "inline-block" }}>Unit</p>
                    <InputText
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "8rem",
                        }}
                        id="id_UNIT"
                        value={dataQRY_KSV_STOCK_FACIN.UNIT}
                        onChange={(e) =>
                            onInputChangeQRY_KSV_STOCK_FACIN_UNIT(e, "UNIT")
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
                    <p style={{ width: "8rem", display: "inline-block" }}>Delivery</p>
                    <InputText
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "18rem",
                        }}
                        id="id_DELIVERY"
                        value={dataQRY_KSV_STOCK_FACIN.DELIVERY}
                        onChange={(e) =>
                            onInputChangeQRY_KSV_STOCK_FACIN_DELIVERY(
                                e,
                                "DELIVERY",
                            )
                        }
                    />
                </span>
                <span style={{ marginLeft: "82rem" }}>
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

                    <Button
                        label="Excel"
                        style={{ height: "1.1rem", color: "green" }}
                        icon="pi pi-upload"
                        className="p-button-text"
                        onClick={exportExcelTBL_KSV_STOCK_FACIN}
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
                    ref={dt_TBL_KSV_STOCK_FACIN}
                    size="small"
                    value={datasTBL_KSV_STOCK_FACIN}
                    resizableColumns
                    columnResizeMode="fit"
                    metaKeySelection={false}
                    showGridlines
                    selectionMode="multiple"
                    selection={selectedTBL_KSV_STOCK_FACIN}
                    onSelectionChange={(e) => {
                        setFlagSelectModeTBL_KSV_STOCK_FACIN(true);
                        setSelectedTBL_KSV_STOCK_FACIN(e.value);
                        console.log(
                            "selected length:" +
                                selectedTBL_KSV_STOCK_FACIN.length,
                        );
                        onRowClick1TBL_KSV_STOCK_FACIN(e.value);
                    }}
                    onRowClick={onRowClickTBL_KSV_STOCK_FACIN}
                    dataKey="id"
                    className="datatable-responsive"
                    virtualScrollerOptions={{ itemSize: 14 }}
                    emptyMessage=" " //header={headerTBL_KSV_STOCK_FACIN}
                    responsiveLayout="scroll"
                    scrollable
                    scrollHeight="28rem"
                >
                    <AFColumn field="PO_CD" headerClassName="t-header" header="PO" style={{ width: "8rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="IN_DATE" headerClassName="t-header" header="In Date" style={{ width: "8rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="DELIVERY" headerClassName="t-header" header="Delivery" style={{ width: "15rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="VENDOR_NAME" headerClassName="t-header" header="Supplier" style={{ width: "15rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="MATL_NAME" headerClassName="t-header" header="Description" style={{ width: "15rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="COLOR" headerClassName="t-header" header="Color" style={{ width: "12rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="SPEC" headerClassName="t-header" header="Spec" style={{ width: "15rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="UNIT" headerClassName="t-header" header="Unit" style={{ width: "4rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="COL1" headerClassName="t-header" header="Po Qty" style={{ width: "5rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="COL2" headerClassName="t-header" header="StsOut Qty" style={{ width: "5rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="IN_QTY" headerClassName="t-header" header="In Qty" style={{ width: "4rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="ERR_QTY" headerClassName="t-header" header="Err Qty" style={{ width: "4rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="LOCATION" headerClassName="t-header" header="Location" style={{ width: "8rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="MATL_CD" headerClassName="t-header" header="Matl Cd" style={{ width: "8rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="VENDOR_TYPE" headerClassName="t-header" header="Vendor Type" style={{ width: "9rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="BUYER_NAME" headerClassName="t-header" header="Buyer" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="REG_USER" headerClassName="t-header" header="Reg User" style={{ width: "7rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                </AFDataTable>
            </div>

            <Divider />

            <div
                style={{ width: "100rem", height: "2rem", marginLeft: "42rem" }}
            >
                <div className="formgrid grid">
                    <div>
                        <Button
                            style={{ display: "inline-block", width: "13rem" }}
                            label="Inq. (PO Qty)"
                            className="p-button-text"
                            onClick={search_LIST_2}
                        />

                        <Button
                            style={{ display: "inline-block", width: "10rem" }}
                            label="Reset"
                            className="p-button-text"
                            onClick={blankFn}
                        />

                        <Button
                            style={{ display: "inline-block", width: "13rem" }}
                            label="Cancel FacIn"
                            className="p-button-text"
                            onClick={process_CANCEL_FACIN}
                        />

                        <Button
                            style={{ display: "inline-block", width: "13rem" }}
                            label="Location Update"
                            className="p-button-text"
                            onClick={process_UPDATE_LOCATION}
                        />

                        <Button
                            style={{ display: "inline-block", width: "10rem" }}
                            label="List"
                            className="p-button-text"
                            onClick={blankFn}
                        />
                    </div>
                </div>
            </div>

            <Divider />

            <div style={{ width: "100rem", height: "40rem" }}>
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

export default React.memo(S0504_FACTORY_INPUT_LIST, comparisonFn);
