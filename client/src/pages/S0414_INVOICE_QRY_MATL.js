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
import { ServiceS0414_INVOICE_QRY_MATL } from "../service/service_biz/ServiceS0414_INVOICE_QRY_MATL";

import "./page_common.scss";

const emptyKCD_CODE = {
    id: 0,
    CD_GROUP: "",
    CD_CODE: "",
    CD_NAME: "",
    CD_FLAG: "",
};

const emptyQRY_KSV_MATL_INVOICE = {
    S_OUT_DATE: "",
    E_OUT_DATE: "",
    DELIVERY_TYPE: "",
    FACTORY_CD: "",
    PAYMENT_TYPE: "",
    TRADE_TYPE: "",
};

const emptyTBL_KSV_MATL_INVOICE_PO = {
    INVOICE_NO: "",
    PO_CD: "",
    PO_AMT: "",
    DELIVERY_AMT: "",
};

const emptyTBL_KSV_MATL_INVOICE = {
    id: 0,
    INVOICE_NO: "",
    OUT_DATE: "",
    PACK_CD: "",
    TOT_AMT: "",
    DELIVERY_TYPE_NAME: "",
    DELIVERY_AMT: "",
    CURR_RATE: "",
    DELIVERY_AMT_USD: "",
    FACTORY_NAME: "",
};

const S0414_INVOICE_QRY_MATL = () => {
    const serviceLibRef = useRef(null);
    if (!serviceLibRef.current) {
        serviceLibRef.current = new ServiceLib();
        serviceLibRef.current.loginConfirm();
    }
    const serviceLib = serviceLibRef.current;
    const serviceS0414_INVOICE_QRY_MATLRef = useRef(null);
    if (!serviceS0414_INVOICE_QRY_MATLRef.current) serviceS0414_INVOICE_QRY_MATLRef.current = new ServiceS0414_INVOICE_QRY_MATL();
    const serviceS0414_INVOICE_QRY_MATL = serviceS0414_INVOICE_QRY_MATLRef.current;

    const toast = useRef(null);

    /* splitter 관련 */
    const [styleVal, setStyleVal] = useState({ width: "65vw" });

    const search_INVOICE = () => {
        var _tObj1 = { ...dataQRY_KSV_MATL_INVOICE };
        serviceS0414_INVOICE_QRY_MATL.mgrQuery_INVOICE(_tObj1).then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                console.log(
                    "ServiceMgrKCD_BUYER.mgr1KcdStyle call => " + data.length,
                );
                var tArray = data.map((col, i) => {
                    var tObj = { ...col };
                    tObj.id = i + 1;
                    return tObj;
                });
                setDatasTBL_KSV_MATL_INVOICE(tArray);
            } else {
                console.log(
                    "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });
    };

    const search_INVOICE_PO = (argData) => {
        var _tObj1 = {};
        _tObj1.INVOICE_NO = argData;

        serviceS0414_INVOICE_QRY_MATL
            .mgrQuery_INVOICE_PO(_tObj1)
            .then((data) => {
                if (typeof data.graphQLErrors === "undefined") {
                    console.log(
                        "ServiceMgrKCD_BUYER.mgr1KcdStyle call => " +
                            data.length,
                    );
                    setDatasTBL_KSV_MATL_INVOICE_PO(data);
                } else {
                    console.log(
                        "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });
    };

    /* QRY KSV_MATL_INVOICE */
    const [dataQRY_KSV_MATL_INVOICE, setDataQRY_KSV_MATL_INVOICE] = useState(
        emptyQRY_KSV_MATL_INVOICE,
    );

    const onCalChangeQRY_KSV_MATL_INVOICE_S_OUT_DATE = (e, name) => {
        let val1 = e.value || "";
        let val = "";
        if (val1 === "") {
            val = "";
        } else {
            val = getDateVal(val1);
        }

        let _dataQRY_KSV_MATL_INVOICE = { ...dataQRY_KSV_MATL_INVOICE };
        _dataQRY_KSV_MATL_INVOICE[`${name}`] = val;
        setDataQRY_KSV_MATL_INVOICE(_dataQRY_KSV_MATL_INVOICE);
    };

    const onCalChangeQRY_KSV_MATL_INVOICE_E_OUT_DATE = (e, name) => {
        let val1 = e.value || "";
        let val = "";
        if (val1 === "") {
            val = "";
        } else {
            val = getDateVal(val1);
        }

        let _dataQRY_KSV_MATL_INVOICE = { ...dataQRY_KSV_MATL_INVOICE };
        _dataQRY_KSV_MATL_INVOICE[`${name}`] = val;
        setDataQRY_KSV_MATL_INVOICE(_dataQRY_KSV_MATL_INVOICE);
    };

    const [
        datasQRY_KSV_MATL_INVOICE_DELIVERY_TYPE,
        setDatasQRY_KSV_MATL_INVOICE_DELIVERY_TYPE,
    ] = useState([]);
    const [
        dataQRY_KSV_MATL_INVOICE_DELIVERY_TYPE,
        setDataQRY_KSV_MATL_INVOICE_DELIVERY_TYPE,
    ] = useState({});

    const onDropdownChangeQRY_KSV_MATL_INVOICE_DELIVERY_TYPE = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataQRY_KSV_MATL_INVOICE = { ...dataQRY_KSV_MATL_INVOICE };

        let tTypeVal = _dataQRY_KSV_MATL_INVOICE[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_MATL_INVOICE[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_MATL_INVOICE[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_MATL_INVOICE(_dataQRY_KSV_MATL_INVOICE);
        setDataQRY_KSV_MATL_INVOICE_DELIVERY_TYPE(e.value);
    };

    const [
        datasQRY_KSV_MATL_INVOICE_FACTORY_CD,
        setDatasQRY_KSV_MATL_INVOICE_FACTORY_CD,
    ] = useState([]);
    const [
        dataQRY_KSV_MATL_INVOICE_FACTORY_CD,
        setDataQRY_KSV_MATL_INVOICE_FACTORY_CD,
    ] = useState({});

    const onDropdownChangeQRY_KSV_MATL_INVOICE_FACTORY_CD = (e, name) => {
        let val = (e.value && e.value.FACTORY_CD) || "";

        let _dataQRY_KSV_MATL_INVOICE = { ...dataQRY_KSV_MATL_INVOICE };

        let tTypeVal = _dataQRY_KSV_MATL_INVOICE[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_MATL_INVOICE[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_MATL_INVOICE[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_MATL_INVOICE(_dataQRY_KSV_MATL_INVOICE);
        setDataQRY_KSV_MATL_INVOICE_FACTORY_CD(e.value);
    };

    const [
        datasQRY_KSV_MATL_INVOICE_PAYMENT_TYPE,
        setDatasQRY_KSV_MATL_INVOICE_PAYMENT_TYPE,
    ] = useState([]);
    const [
        dataQRY_KSV_MATL_INVOICE_PAYMENT_TYPE,
        setDataQRY_KSV_MATL_INVOICE_PAYMENT_TYPE,
    ] = useState({});

    const onDropdownChangeQRY_KSV_MATL_INVOICE_PAYMENT_TYPE = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataQRY_KSV_MATL_INVOICE = { ...dataQRY_KSV_MATL_INVOICE };

        let tTypeVal = _dataQRY_KSV_MATL_INVOICE[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_MATL_INVOICE[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_MATL_INVOICE[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_MATL_INVOICE(_dataQRY_KSV_MATL_INVOICE);
        setDataQRY_KSV_MATL_INVOICE_PAYMENT_TYPE(e.value);
    };

    const [
        datasQRY_KSV_MATL_INVOICE_TRADE_TYPE,
        setDatasQRY_KSV_MATL_INVOICE_TRADE_TYPE,
    ] = useState([]);
    const [
        dataQRY_KSV_MATL_INVOICE_TRADE_TYPE,
        setDataQRY_KSV_MATL_INVOICE_TRADE_TYPE,
    ] = useState({});

    const onDropdownChangeQRY_KSV_MATL_INVOICE_TRADE_TYPE = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataQRY_KSV_MATL_INVOICE = { ...dataQRY_KSV_MATL_INVOICE };

        let tTypeVal = _dataQRY_KSV_MATL_INVOICE[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_MATL_INVOICE[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_MATL_INVOICE[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_MATL_INVOICE(_dataQRY_KSV_MATL_INVOICE);
        setDataQRY_KSV_MATL_INVOICE_TRADE_TYPE(e.value);
    };

    /* TABLE KSV_MATL_INVOICE*/
    const [datasTBL_KSV_MATL_INVOICE_PO, setDatasTBL_KSV_MATL_INVOICE_PO] =
        useState([]);
    const dt_TBL_KSV_MATL_INVOICE_PO = useRef(null);
    const [dataTBL_KSV_MATL_INVOICE_PO, setDataTBL_KSV_MATL_INVOICE_PO] =
        useState(emptyTBL_KSV_MATL_INVOICE_PO);
    const [
        selectedTBL_KSV_MATL_INVOICE_PO,
        setSelectedTBL_KSV_MATL_INVOICE_PO,
    ] = useState([]);
    const [
        flagSelectModeTBL_KSV_MATL_INVOICE_PO,
        setFlagSelectModeTBL_KSV_MATL_INVOICE_PO,
    ] = useState(false);

    // DATAGRID CODE : TBL_KSV_MATL_INVOICE_PO

    const onRowClick1TBL_KSV_MATL_INVOICE_PO = (argData0) => {
        var argData = {};

        if (typeof argData0.length !== "undefined") {
            argData = argData0[0];
        } else {
            argData = argData0;
        }

        let argTBL_KSV_MATL_INVOICE_PO = argData;

        setDataTBL_KSV_MATL_INVOICE_PO(argTBL_KSV_MATL_INVOICE_PO);
    };

    const onRowClickTBL_KSV_MATL_INVOICE_PO = (event) => {
        let argTBL_KSV_MATL_INVOICE_PO = event.data;
        if (flagSelectModeTBL_KSV_MATL_INVOICE_PO) return;

        // Service : NawooAll:mgrQueryTBL_KSV_MATL_INVOICE_PO
    };

    /* TABLE KSV_MATL_INVOICE*/
    // DEFINE DATAGRID : TBL_KSV_MATL_INVOICE
    const [datasTBL_KSV_MATL_INVOICE, setDatasTBL_KSV_MATL_INVOICE] = useState(
        [],
    );
    const dt_TBL_KSV_MATL_INVOICE = useRef(null);
    const [dataTBL_KSV_MATL_INVOICE, setDataTBL_KSV_MATL_INVOICE] = useState(
        emptyTBL_KSV_MATL_INVOICE,
    );
    const [selectedTBL_KSV_MATL_INVOICE, setSelectedTBL_KSV_MATL_INVOICE] =
        useState([]);
    const [
        flagSelectModeTBL_KSV_MATL_INVOICE,
        setFlagSelectModeTBL_KSV_MATL_INVOICE,
    ] = useState(false);

    // DATAGRID CODE : TBL_KSV_MATL_INVOICE

    const onRowClick1TBL_KSV_MATL_INVOICE = (argData0) => {
        var argData = {};

        if (typeof argData0.length !== "undefined") {
            argData = argData0[0];
        } else {
            argData = argData0;
        }

        let argTBL_KSV_MATL_INVOICE = argData;

        setDataTBL_KSV_MATL_INVOICE(argTBL_KSV_MATL_INVOICE);

        search_INVOICE_PO(argData.INVOICE_NO);
    };

    const onRowClickTBL_KSV_MATL_INVOICE = (event) => {
        let argTBL_KSV_MATL_INVOICE = event.data;
        if (flagSelectModeTBL_KSV_MATL_INVOICE) return;

        // Service : NawooAll:mgrQueryTBL_KSV_MATL_INVOICE
    };

    const exportExcelTBL_KSV_MATL_INVOICE = () => {};

    useEffect(() => {
        var _tObj = {};
        _tObj.INVOICE_NO = "";
        _tObj.PACK_CD = "";

        serviceS0414_INVOICE_QRY_MATL.mgrQuery_CODE(_tObj).then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                setDatasQRY_KSV_MATL_INVOICE_DELIVERY_TYPE(data.DELIVERY_TYPE);
                setDataQRY_KSV_MATL_INVOICE_DELIVERY_TYPE(
                    data.DELIVERY_TYPE[0],
                );

                setDatasQRY_KSV_MATL_INVOICE_FACTORY_CD(data.FACTORY_CD);
                setDataQRY_KSV_MATL_INVOICE_FACTORY_CD(data.FACTORY_CD[0]);

                setDatasQRY_KSV_MATL_INVOICE_PAYMENT_TYPE(data.PAYMENT_TYPE);
                setDataQRY_KSV_MATL_INVOICE_PAYMENT_TYPE(data.PAYMENT_TYPE[0]);

                setDatasQRY_KSV_MATL_INVOICE_TRADE_TYPE(data.TRADE_TYPE);
                setDataQRY_KSV_MATL_INVOICE_TRADE_TYPE(data.TRADE_TYPE[0]);
            } else {
                console.log(
                    "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });

        var _tObj1 = { ...dataQRY_KSV_MATL_INVOICE };
        serviceS0414_INVOICE_QRY_MATL.mgrQuery_INVOICE(_tObj1).then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                console.log(
                    "ServiceMgrKCD_BUYER.mgr1KcdStyle call => " + data.length,
                );
                var tArray = data.map((col, i) => {
                    var tObj = { ...col };
                    tObj.id = i + 1;
                    return tObj;
                });
                setDatasTBL_KSV_MATL_INVOICE(tArray);
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
                    height: "3rem",
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
                    <p style={{ width: "8rem", display: "inline-block" }}>Out Date</p>
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
                            id="id_S_OUT_DATE"
                            value={changeDateVal(
                                dataQRY_KSV_MATL_INVOICE.S_OUT_DATE,
                            )}
                            onChange={(e) =>
                                onCalChangeQRY_KSV_MATL_INVOICE_S_OUT_DATE(
                                    e,
                                    "S_OUT_DATE",
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
                            dateFormat="yy-mm-dd"
                            id="id_E_OUT_DATE"
                            value={changeDateVal(
                                dataQRY_KSV_MATL_INVOICE.E_OUT_DATE,
                            )}
                            onChange={(e) =>
                                onCalChangeQRY_KSV_MATL_INVOICE_E_OUT_DATE(
                                    e,
                                    "E_OUT_DATE",
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
                    <p style={{ width: "8rem", display: "inline-block" }}>Delivery</p>
                    <div
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "13rem",
                        }}
                    >
                        <Dropdown
                            id="id_DELIVERY_TYPE"
                            value={dataQRY_KSV_MATL_INVOICE_DELIVERY_TYPE}
                            onChange={(e) =>
                                onDropdownChangeQRY_KSV_MATL_INVOICE_DELIVERY_TYPE(
                                    e,
                                    "DELIVERY_TYPE",
                                )
                            }
                            options={datasQRY_KSV_MATL_INVOICE_DELIVERY_TYPE}
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
                        width: "30rem",
                    }}
                >
                    <p style={{ width: "8rem", display: "inline-block" }}>Factory</p>
                    <div
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "20rem",
                        }}
                    >
                        <Dropdown
                            id="id_FACTORY_CD"
                            value={dataQRY_KSV_MATL_INVOICE_FACTORY_CD}
                            onChange={(e) =>
                                onDropdownChangeQRY_KSV_MATL_INVOICE_FACTORY_CD(
                                    e,
                                    "FACTORY_CD",
                                )
                            }
                            options={datasQRY_KSV_MATL_INVOICE_FACTORY_CD}
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
                        width: "22rem",
                    }}
                >
                    <p style={{ width: "6rem", display: "inline-block" }}>Payment</p>
                    <div
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "15rem",
                        }}
                    >
                        <Dropdown
                            id="id_PAYMENT_TYPE"
                            value={dataQRY_KSV_MATL_INVOICE_PAYMENT_TYPE}
                            onChange={(e) =>
                                onDropdownChangeQRY_KSV_MATL_INVOICE_PAYMENT_TYPE(
                                    e,
                                    "PAYMENT_TYPE",
                                )
                            }
                            options={datasQRY_KSV_MATL_INVOICE_PAYMENT_TYPE}
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
                        width: "24rem",
                    }}
                >
                    {/* <p style={{ width: '8rem', display: 'inline-block' }}> . </p> */}
                    <div
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "23rem",
                        }}
                    >
                        <Dropdown
                            id="id_TRADE_TYPE"
                            value={dataQRY_KSV_MATL_INVOICE_TRADE_TYPE}
                            onChange={(e) =>
                                onDropdownChangeQRY_KSV_MATL_INVOICE_TRADE_TYPE(
                                    e,
                                    "TRADE_TYPE",
                                )
                            }
                            options={datasQRY_KSV_MATL_INVOICE_TRADE_TYPE}
                            optionLabel="CD_NAME"
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
                        style={{ height: "1.1rem" }}
                        icon="pi pi-search"
                        className="p-button-text"
                        onClick={search_INVOICE}
                    />

                    <Button
                        label="Excel"
                        style={{ height: "1.1rem", color: "green" }}
                        icon="pi pi-upload"
                        className="p-button-text"
                        onClick={exportExcelTBL_KSV_MATL_INVOICE}
                    />
                </span>
            </div>
            <div style={{ width: "100rem", height: "2rem" }}></div>

            <div
                style={{
                    marginLeft: "1rem",
                    marginTop: "1rem",
                    width: "65rem",
                    height: "22rem",
                    float: "left",
                }}
            >
                <AFDataTable preventUnrelatedRerender
                    ref={dt_TBL_KSV_MATL_INVOICE}
                    size="small"
                    value={datasTBL_KSV_MATL_INVOICE}
                    resizableColumns
                    columnResizeMode="fit"
                    showGridlines
                    selectionMode="checkbox"
                    selection={selectedTBL_KSV_MATL_INVOICE}
                    onSelectionChange={(e) => {
                        setFlagSelectModeTBL_KSV_MATL_INVOICE(true);
                        setSelectedTBL_KSV_MATL_INVOICE(e.value);
                        console.log(
                            "selected length:" +
                                selectedTBL_KSV_MATL_INVOICE.length,
                        );
                        onRowClick1TBL_KSV_MATL_INVOICE(e.value);
                    }}
                    onRowClick={onRowClickTBL_KSV_MATL_INVOICE}
                    dataKey="id"
                    className="datatable-responsive"
                    virtualScrollerOptions={{ itemSize: 9 }}
                    emptyMessage=" " //header={headerTBL_KSV_MATL_INVOICE}
                    responsiveLayout="scroll"
                    scrollable
                    scrollHeight="18rem"
                >
                    <AFColumn field="INVOICE_NO" headerClassName="t-header" header="INVOICE No" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="OUT_DATE" headerClassName="t-header" header="Out Date" style={{ width: "8rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="PACK_CD" headerClassName="t-header" header="PL No" style={{ width: "12rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="PO_AMT" headerClassName="t-header" header="Tot Amt" style={{ width: "7rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="DELIVERY_TYPE_N" headerClassName="t-header" header="Delivery Type" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="DELIVERY_WON" headerClassName="t-header" header="Delivery Amt" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="WON_AMT" headerClassName="t-header" header="Won Amt" style={{ width: "8rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="DELIVERY_AMT" headerClassName="t-header" header="Delivery Amt($)" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="FACTORY_NAME" headerClassName="t-header" header="Factory" style={{ width: "15rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="LICENSE_NO" headerClassName="t-header" header="License No" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="LICENSE_DATE" headerClassName="t-header" header="License Date" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                </AFDataTable>
            </div>
            <div
                style={{
                    marginLeft: "1rem",
                    marginTop: "1rem",
                    width: "34rem",
                    height: "22rem",
                    float: "left",
                }}
            >
                <AFDataTable preventUnrelatedRerender
                    ref={dt_TBL_KSV_MATL_INVOICE_PO}
                    size="small"
                    value={datasTBL_KSV_MATL_INVOICE_PO}
                    resizableColumns
                    columnResizeMode="fit"
                    showGridlines
                    selectionMode="checkbox"
                    selection={selectedTBL_KSV_MATL_INVOICE_PO}
                    onSelectionChange={(e) => {
                        setFlagSelectModeTBL_KSV_MATL_INVOICE_PO(true);
                        setSelectedTBL_KSV_MATL_INVOICE_PO(e.value);
                        console.log(
                            "selected length:" +
                                selectedTBL_KSV_MATL_INVOICE_PO.length,
                        );
                        onRowClick1TBL_KSV_MATL_INVOICE_PO(e.value);
                    }}
                    onRowClick={onRowClickTBL_KSV_MATL_INVOICE_PO}
                    dataKey="id"
                    className="datatable-responsive"
                    virtualScrollerOptions={{ itemSize: 9 }}
                    emptyMessage=" " //header={headerTBL_KSV_MATL_INVOICE}
                    responsiveLayout="scroll"
                    scrollable
                    scrollHeight="18rem"
                >
                    <AFColumn field="INVOICE_NO" headerClassName="t-header" header="INVOICE No" style={{ width: "8rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="PO_CD" headerClassName="t-header" header="Po Cd" style={{ width: "8rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="PO_AMT" headerClassName="t-header" header="Tot Amt" style={{ width: "6rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="DELIVERY_AMT" headerClassName="t-header" header="Delivery Amt($)" style={{ width: "15rem", flexBasis: "auto" }} ></AFColumn>
                </AFDataTable>
            </div>

            <Divider />

            <div
                style={{ width: "100rem", height: "2rem", marginLeft: "61rem" }}
            >
                <div className="formgrid grid">
                    <div>
                        <Button
                            style={{ display: "inline-block", width: "10rem" }}
                            label="초기화"
                            icon="pi pi-times"
                            className="p-button-text"
                            onClick={blankFn}
                        />

                        <Button
                            style={{ display: "inline-block", width: "15rem" }}
                            label="부자재 출고 리스트"
                            icon="pi pi-check"
                            className="p-button-text"
                            onClick={blankFn}
                        />

                        <Button
                            style={{ display: "inline-block", width: "15rem" }}
                            label="부자재 운송비 리스트"
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

export default React.memo(S0414_INVOICE_QRY_MATL, comparisonFn);
