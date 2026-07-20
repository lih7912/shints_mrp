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
import { ServiceS0506_FACTORY_OUTPUT_LIST } from "../service/service_biz/ServiceS0506_FACTORY_OUTPUT_LIST";

import "./page_common.scss";

const emptyKCD_CODE = {
    id: 0,
    CD_GROUP: "",
    CD_CODE: "",
    CD_NAME: "",
    CD_FLAG: "",
};

const emptyQRY_KSV_STOCK_FACOUT = {
    DELIVERY: "",
    PO_CD: "",
    ORDER_CD: "",
    VENDOR_CD: "",
    MATL_CD: "",
    MATL_NAME: "",
    SPEC: "",
    COLOR: "",
    UNIT: "",
};

const emptyTBL_KSV_STOCK_FACOUT = {
    id: 0,
    PO_CD: "",
    OUT_DATE: "",
    ORDER_CD: "",
    VENDOR_NAME: "",
    MATL_NAME: "",
    COLOR: "",
    SPEC: "",
    UNIT: "",
    OUT_QTY: "",
    MATL_CD: "",
    VENDOR_TYPE: "",
};

const S0506_FACTORY_OUTPUT_LIST = () => {
    const serviceLibRef = useRef(null);
    if (!serviceLibRef.current) {
        serviceLibRef.current = new ServiceLib();
        serviceLibRef.current.loginConfirm();
    }
    const serviceLib = serviceLibRef.current;
    const serviceS0506_FACTORY_OUTPUT_LIST =
        new ServiceS0506_FACTORY_OUTPUT_LIST();

    const toast = useRef(null);

    /* splitter 관련 */
    const [styleVal, setStyleVal] = useState({ width: "65vw" });

    const search_LIST_1 = () => {
        var tObj = { ...dataQRY_KSV_STOCK_FACOUT };

        Object.keys(tObj).forEach((col, i) => {
            if (tObj[`${col}`] === null || tObj[`${col}`] === " ") {
                tObj[`${col}`] = "";
            }
        });

        setDatasTBL_KSV_STOCK_FACOUT([]);
        setSelectedTBL_KSV_STOCK_FACOUT([]);

        if (tObj.PO_CD === "");
        else tObj.PO_CD = tObj.PO_CD.trim();

        serviceS0506_FACTORY_OUTPUT_LIST.mgrQuery_LIST_1(tObj).then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                console.log(
                    "ServiceMgrKCD_BUYER.mgr1KcdStyle call => " + data.length,
                );

                var tArray = data.map((col, i) => {
                    var tObj = { ...col };
                    tObj.id = i + 1;
                    return tObj;
                });
                setDatasTBL_KSV_STOCK_FACOUT(tArray);
            } else {
                console.log(
                    "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });
    };

    /* QRY KSV_STOCK_FACOUT*/
    const [dataQRY_KSV_STOCK_FACOUT, setDataQRY_KSV_STOCK_FACOUT] = useState(
        emptyQRY_KSV_STOCK_FACOUT,
    );

    const [
        datasQRY_KSV_STOCK_FACOUT_DELIVERY,
        setDatasQRY_KSV_STOCK_FACOUT_DELIVERY,
    ] = useState([]);
    const [
        dataQRY_KSV_STOCK_FACOUT_DELIVERY,
        setDataQRY_KSV_STOCK_FACOUT_DELIVERY,
    ] = useState({});

    const onDropdownChangeQRY_KSV_STOCK_FACOUT_DELIVERY = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataQRY_KSV_STOCK_FACOUT = { ...dataQRY_KSV_STOCK_FACOUT };

        let tTypeVal = _dataQRY_KSV_STOCK_FACOUT[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_STOCK_FACOUT[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_STOCK_FACOUT[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_STOCK_FACOUT(_dataQRY_KSV_STOCK_FACOUT);
        setDataQRY_KSV_STOCK_FACOUT_DELIVERY(e.value);
    };

    const onInputChangeQRY_KSV_STOCK_FACOUT_PO_CD = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_STOCK_FACOUT = { ...dataQRY_KSV_STOCK_FACOUT };

        let tTypeVal = _dataQRY_KSV_STOCK_FACOUT[`${name}`];
        if (typeof tTypeVal === "string")
            _dataQRY_KSV_STOCK_FACOUT[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_STOCK_FACOUT[`${name}`] = parseInt(val);

        setDataQRY_KSV_STOCK_FACOUT(_dataQRY_KSV_STOCK_FACOUT);
    };

    const onInputChangeQRY_KSV_STOCK_FACOUT_ORDER_CD = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_STOCK_FACOUT = { ...dataQRY_KSV_STOCK_FACOUT };

        let tTypeVal = _dataQRY_KSV_STOCK_FACOUT[`${name}`];
        if (typeof tTypeVal === "string")
            _dataQRY_KSV_STOCK_FACOUT[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_STOCK_FACOUT[`${name}`] = parseInt(val);

        setDataQRY_KSV_STOCK_FACOUT(_dataQRY_KSV_STOCK_FACOUT);
    };

    const [
        datasQRY_KSV_STOCK_FACOUT_VENDOR_CD,
        setDatasQRY_KSV_STOCK_FACOUT_VENDOR_CD,
    ] = useState([]);
    const [
        dataQRY_KSV_STOCK_FACOUT_VENDOR_CD,
        setDataQRY_KSV_STOCK_FACOUT_VENDOR_CD,
    ] = useState({});

    const onDropdownChangeQRY_KSV_STOCK_FACOUT_VENDOR_CD = (e, name) => {
        let val = (e.value && e.value.VENDOR_CD) || "";

        let _dataQRY_KSV_STOCK_FACOUT = { ...dataQRY_KSV_STOCK_FACOUT };

        let tTypeVal = _dataQRY_KSV_STOCK_FACOUT[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_STOCK_FACOUT[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_STOCK_FACOUT[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_STOCK_FACOUT(_dataQRY_KSV_STOCK_FACOUT);
        setDataQRY_KSV_STOCK_FACOUT_VENDOR_CD(e.value);
    };

    const onInputChangeQRY_KSV_STOCK_FACOUT_MATL_CD = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_STOCK_FACOUT = { ...dataQRY_KSV_STOCK_FACOUT };

        let tTypeVal = _dataQRY_KSV_STOCK_FACOUT[`${name}`];
        if (typeof tTypeVal === "string")
            _dataQRY_KSV_STOCK_FACOUT[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_STOCK_FACOUT[`${name}`] = parseInt(val);

        setDataQRY_KSV_STOCK_FACOUT(_dataQRY_KSV_STOCK_FACOUT);
    };

    const onInputChangeQRY_KSV_STOCK_FACOUT_MATL_NAME = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_STOCK_FACOUT = { ...dataQRY_KSV_STOCK_FACOUT };

        let tTypeVal = _dataQRY_KSV_STOCK_FACOUT[`${name}`];
        if (typeof tTypeVal === "string")
            _dataQRY_KSV_STOCK_FACOUT[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_STOCK_FACOUT[`${name}`] = parseInt(val);

        setDataQRY_KSV_STOCK_FACOUT(_dataQRY_KSV_STOCK_FACOUT);
    };

    const onInputChangeQRY_KSV_STOCK_FACOUT_SPEC = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_STOCK_FACOUT = { ...dataQRY_KSV_STOCK_FACOUT };

        let tTypeVal = _dataQRY_KSV_STOCK_FACOUT[`${name}`];
        if (typeof tTypeVal === "string")
            _dataQRY_KSV_STOCK_FACOUT[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_STOCK_FACOUT[`${name}`] = parseInt(val);

        setDataQRY_KSV_STOCK_FACOUT(_dataQRY_KSV_STOCK_FACOUT);
    };

    const onInputChangeQRY_KSV_STOCK_FACOUT_COLOR = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_STOCK_FACOUT = { ...dataQRY_KSV_STOCK_FACOUT };

        let tTypeVal = _dataQRY_KSV_STOCK_FACOUT[`${name}`];
        if (typeof tTypeVal === "string")
            _dataQRY_KSV_STOCK_FACOUT[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_STOCK_FACOUT[`${name}`] = parseInt(val);

        setDataQRY_KSV_STOCK_FACOUT(_dataQRY_KSV_STOCK_FACOUT);
    };

    const onInputChangeQRY_KSV_STOCK_FACOUT_UNIT = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_STOCK_FACOUT = { ...dataQRY_KSV_STOCK_FACOUT };

        let tTypeVal = _dataQRY_KSV_STOCK_FACOUT[`${name}`];
        if (typeof tTypeVal === "string")
            _dataQRY_KSV_STOCK_FACOUT[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_STOCK_FACOUT[`${name}`] = parseInt(val);

        setDataQRY_KSV_STOCK_FACOUT(_dataQRY_KSV_STOCK_FACOUT);
    };

    /*TABLE KSV_STOCK_FACOUT */
    // DEFINE DATAGRID : TBL_KSV_STOCK_FACOUT
    const [datasTBL_KSV_STOCK_FACOUT, setDatasTBL_KSV_STOCK_FACOUT] = useState(
        [],
    );
    const dt_TBL_KSV_STOCK_FACOUT = useRef(null);
    const [dataTBL_KSV_STOCK_FACOUT, setDataTBL_KSV_STOCK_FACOUT] = useState(
        emptyTBL_KSV_STOCK_FACOUT,
    );
    const [selectedTBL_KSV_STOCK_FACOUT, setSelectedTBL_KSV_STOCK_FACOUT] =
        useState([]);
    const [
        flagSelectModeTBL_KSV_STOCK_FACOUT,
        setFlagSelectModeTBL_KSV_STOCK_FACOUT,
    ] = useState(false);

    // DATAGRID CODE : TBL_KSV_STOCK_FACOUT

    const onRowClick1TBL_KSV_STOCK_FACOUT = (argData0) => {
        var argData = {};

        if (typeof argData0.length !== "undefined") {
            argData = argData0[0];
        } else {
            argData = argData0;
        }

        let argTBL_KSV_STOCK_FACOUT = argData;

        setDataTBL_KSV_STOCK_FACOUT(argTBL_KSV_STOCK_FACOUT);
    };

    const onRowClickTBL_KSV_STOCK_FACOUT = (event) => {
        let argTBL_KSV_STOCK_FACOUT = event.data;
        if (flagSelectModeTBL_KSV_STOCK_FACOUT) return;

        // Service : NawooAll:mgrQueryTBL_KSV_STOCK_FACOUT
    };

    const exportExcelTBL_KSV_STOCK_FACOUT = () => {};

    useEffect(() => {
        var _tObj = {};
        _tObj.KEY1 = "";

        serviceS0506_FACTORY_OUTPUT_LIST.mgrQuery_CODE(_tObj).then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                console.log(
                    "ServiceMgrKCD_BUYER.mgr1KcdStyle call => " +
                        data.VENDOR_CD.length,
                );
                setDatasQRY_KSV_STOCK_FACOUT_DELIVERY(data.VENDOR_TYPE);
                setDataQRY_KSV_STOCK_FACOUT_DELIVERY(data.VENDOR_TYPE[0]);

                setDatasQRY_KSV_STOCK_FACOUT_VENDOR_CD(data.VENDOR_CD);
                setDataQRY_KSV_STOCK_FACOUT_VENDOR_CD(data.VENDOR_CD[0]);
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
                    height: "6rem",
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
                        width: "50rem",
                    }}
                >
                    <p style={{ width: "12rem", display: "inline-block" }}>Type</p>
                    <div
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "15rem",
                        }}
                    >
                        <Dropdown
                            id="id_DELIVERY"
                            value={dataQRY_KSV_STOCK_FACOUT_DELIVERY}
                            onChange={(e) =>
                                onDropdownChangeQRY_KSV_STOCK_FACOUT_DELIVERY(
                                    e,
                                    "DELIVERY",
                                )
                            }
                            options={datasQRY_KSV_STOCK_FACOUT_DELIVERY}
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
                        width: "19rem",
                    }}
                >
                    <p style={{ width: "8rem", display: "inline-block" }}>Po No</p>
                    <InputText
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "10rem",
                        }}
                        id="id_PO_CD"
                        value={dataQRY_KSV_STOCK_FACOUT.PO_CD}
                        onChange={(e) =>
                            onInputChangeQRY_KSV_STOCK_FACOUT_PO_CD(e, "PO_CD")
                        }
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
                    <p style={{ width: "5rem", display: "inline-block" }}>Order</p>
                    <InputText
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "10rem",
                        }}
                        id="id_ORDER_CD"
                        value={dataQRY_KSV_STOCK_FACOUT.ORDER_CD}
                        onChange={(e) =>
                            onInputChangeQRY_KSV_STOCK_FACOUT_ORDER_CD(
                                e,
                                "ORDER_CD",
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
                            value={dataQRY_KSV_STOCK_FACOUT_VENDOR_CD}
                            onChange={(e) =>
                                onDropdownChangeQRY_KSV_STOCK_FACOUT_VENDOR_CD(
                                    e,
                                    "VENDOR_CD",
                                )
                            }
                            options={datasQRY_KSV_STOCK_FACOUT_VENDOR_CD}
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
                        width: "15rem",
                    }}
                >
                    <p style={{ width: "8rem", display: "inline-block" }}>Matl Cd</p>
                    <InputText
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "6rem",
                        }}
                        id="id_MATL_CD"
                        value={dataQRY_KSV_STOCK_FACOUT.MATL_CD}
                        onChange={(e) =>
                            onInputChangeQRY_KSV_STOCK_FACOUT_MATL_CD(
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
                        width: "24rem",
                    }}
                >
                    <p style={{ width: "8rem", display: "inline-block" }}>Desc</p>
                    <InputText
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "15rem",
                        }}
                        id="id_MATL_NAME"
                        value={dataQRY_KSV_STOCK_FACOUT.MATL_NAME}
                        onChange={(e) =>
                            onInputChangeQRY_KSV_STOCK_FACOUT_MATL_NAME(
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
                    <p style={{ width: "8rem", display: "inline-block" }}>Spec</p>
                    <InputText
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "15rem",
                        }}
                        id="id_SPEC"
                        value={dataQRY_KSV_STOCK_FACOUT.SPEC}
                        onChange={(e) =>
                            onInputChangeQRY_KSV_STOCK_FACOUT_SPEC(e, "SPEC")
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
                    <p style={{ width: "8rem", display: "inline-block" }}>Color</p>
                    <InputText
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "15rem",
                        }}
                        id="id_COLOR"
                        value={dataQRY_KSV_STOCK_FACOUT.COLOR}
                        onChange={(e) =>
                            onInputChangeQRY_KSV_STOCK_FACOUT_COLOR(e, "COLOR")
                        }
                    />
                </span>
                <span
                    style={{
                        marginLeft: "0.5rem",
                        height: "2rem",
                        display: "inline-block",
                        width: "11rem",
                    }}
                >
                    <p style={{ width: "4rem", display: "inline-block" }}>Unit</p>
                    <InputText
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "6rem",
                        }}
                        id="id_UNIT"
                        value={dataQRY_KSV_STOCK_FACOUT.UNIT}
                        onChange={(e) =>
                            onInputChangeQRY_KSV_STOCK_FACOUT_UNIT(e, "UNIT")
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
                        icon="pi pi-search"
                        className="p-button-text"
                        onClick={search_LIST_1}
                    />

                    <Button
                        label="Excel"
                        style={{ color: "green" }}
                        icon="pi pi-upload"
                        className="p-button-text"
                        onClick={exportExcelTBL_KSV_STOCK_FACOUT}
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
                    ref={dt_TBL_KSV_STOCK_FACOUT}
                    size="small"
                    value={datasTBL_KSV_STOCK_FACOUT}
                    resizableColumns
                    columnResizeMode="fit"
                    showGridlines
                    selectionMode="checkbox"
                    selection={selectedTBL_KSV_STOCK_FACOUT}
                    onSelectionChange={(e) => {
                        setFlagSelectModeTBL_KSV_STOCK_FACOUT(true);
                        setSelectedTBL_KSV_STOCK_FACOUT(e.value);
                        console.log(
                            "selected length:" +
                                selectedTBL_KSV_STOCK_FACOUT.length,
                        );
                        onRowClick1TBL_KSV_STOCK_FACOUT(e.value);
                    }}
                    onRowClick={onRowClickTBL_KSV_STOCK_FACOUT}
                    dataKey="id"
                    className="datatable-responsive"
                    virtualScrollerOptions={{ itemSize: 14 }}
                    emptyMessage=" " //header={headerTBL_KSV_STOCK_FACOUT}
                    responsiveLayout="scroll"
                    scrollable
                    scrollHeight="28rem"
                >
                    <AFColumn field="PO_CD" headerClassName="t-header" header="PO" style={{ width: "8rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="OUT_DATE" headerClassName="t-header" header="Out Date" style={{ width: "8rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="ORDER_CD" headerClassName="t-header" header="Order" style={{ width: "8rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="VENDOR_NAME" headerClassName="t-header" header="Supplier" style={{ width: "13rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="MATL_NAME" headerClassName="t-header" header="Description" style={{ width: "15rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="COLOR" headerClassName="t-header" header="Color" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="SPEC" headerClassName="t-header" header="Spec" style={{ width: "15rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="UNIT" headerClassName="t-header" header="Unit" style={{ width: "5rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="OUT_QTY" headerClassName="t-header" header="Out Qty" style={{ width: "6rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="MATL_CD" headerClassName="t-header" header="Matl Cd" style={{ width: "8rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="VENDOR_TYPE" headerClassName="t-header" header="Vendor Type" style={{ width: "8rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                </AFDataTable>
            </div>

            <Divider />

            <div
                style={{ width: "100rem", height: "2rem", marginLeft: "76rem" }}
            >
                <div className="formgrid grid">
                    <div className="field col-6 md:col-6">
                        <Button
                            style={{ display: "inline-block", width: "15rem" }}
                            label="Cancel FacOut"
                            icon="pi pi-times"
                            className="p-button-text"
                            onClick={blankFn}
                        />

                        <Button
                            style={{ display: "inline-block", width: "10rem" }}
                            label="List"
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

export default React.memo(S0506_FACTORY_OUTPUT_LIST, comparisonFn);
