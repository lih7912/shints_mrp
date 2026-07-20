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
import { ServiceS0405_PO_MRP_LIST } from "../service/service_biz/ServiceS0405_PO_MRP_LIST";

import "./page_common.scss";

const emptyKCD_CODE = {
    id: 0,
    CD_GROUP: "",
    CD_CODE: "",
    CD_NAME: "",
    CD_FLAG: "",
};

const emptyQRY_KSV_PO_MRP = {
    PO_CD: "",
    STYLE_CD: "",
    BUYER_CD: "",
};

const emptyQRY_KSV_PO_MRP1 = {
    CURR_DATE: "",
    IS_PRICE: "",
    QRY_CD_1: "",
    IS_MRP_BY_ORDER: "",
    IS_PRODUCT_BASE: "",
    IS_ALL_ORDER: "",
    IS_BVT: "",
};

const emptyTBL_KSV_PO_MEM = {
    id: 0,
    PO_CD: "",
    ORDER_CD: "",
    STYLE_NAME: "",
    BUYER_NAME: "",
    DUE_DATE: "",
    TOT_QTY: "",
    SEQ: "",
    ORDER_STATUS: "",
};

const S0405_PO_MRP_LIST = () => {
    const serviceLibRef = useRef(null);
    if (!serviceLibRef.current) {
        serviceLibRef.current = new ServiceLib();
        serviceLibRef.current.loginConfirm();
    }
    const serviceLib = serviceLibRef.current;
    const serviceS0405_PO_MRP_LISTRef = useRef(null);
    if (!serviceS0405_PO_MRP_LISTRef.current) serviceS0405_PO_MRP_LISTRef.current = new ServiceS0405_PO_MRP_LIST();
    const serviceS0405_PO_MRP_LIST = serviceS0405_PO_MRP_LISTRef.current;

    const toast = useRef(null);

    /* splitter 관련 */
    const [styleVal, setStyleVal] = useState({ width: "65vw" });

    const searchQuery = () => {
        var tObj = { ...dataQRY_KSV_PO_MRP };
        serviceS0405_PO_MRP_LIST.mgrQueryTBL_KSV_PO_MEM(tObj).then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                console.log(
                    "ServiceMgrKCD_BUYER.mgr1KcdStyle call => " + data.length,
                );

                setDatasTBL_KSV_PO_MEM(data);
            } else {
                console.log(
                    "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });
    };

    /* QRY KSV_PO_MRP*/
    const [dataQRY_KSV_PO_MRP, setDataQRY_KSV_PO_MRP] =
        useState(emptyQRY_KSV_PO_MRP);

    const [datasQRY_KSV_PO_MRP_PO_CD, setDatasQRY_KSV_PO_MRP_PO_CD] = useState(
        [],
    );
    const [dataQRY_KSV_PO_MRP_PO_CD, setDataQRY_KSV_PO_MRP_PO_CD] = useState(
        {},
    );

    const onDropdownChangeQRY_KSV_PO_MRP_PO_CD = (e, name) => {
        let val = "";
        console.log(typeof e.value);

        if (typeof e.value === "string") {
            val = e.value;
        } else {
            val = (e.value && e.value.PO_CD) || "";
        }

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

    const onInputChangeQRY_KSV_PO_MRP_STYLE_CD = (e, name) => {
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

    /*QRY KSV_PO_MRP1 */
    const [dataQRY_KSV_PO_MRP1, setDataQRY_KSV_PO_MRP1] =
        useState(emptyQRY_KSV_PO_MRP1);

    const onCalChangeQRY_KSV_PO_MRP1_CURR_DATE = (e, name) => {
        let val1 = e.value || "";
        let val = "";
        if (val1 === "") {
            val = "";
        } else {
            val = getDateVal(val1);
        }

        let _dataQRY_KSV_PO_MRP1 = { ...dataQRY_KSV_PO_MRP1 };
        _dataQRY_KSV_PO_MRP1[`${name}`] = val;
        setDataQRY_KSV_PO_MRP1(_dataQRY_KSV_PO_MRP1);
    };

    const onCheckboxChangeQRY_KSV_PO_MRP1_IS_PRICE = (e, name) => {
        let val = "";
        let _dataQRY_KSV_PO_MRP1 = { ...dataQRY_KSV_PO_MRP1 };
        if (e.checked) {
            val = "1";
        } else {
            val = "0";
        }
        _dataQRY_KSV_PO_MRP1[`${name}`] = val;
        setDataQRY_KSV_PO_MRP1(_dataQRY_KSV_PO_MRP1);
    };

    const [datasQRY_KSV_PO_MRP1_QRY_CD_1, setDatasQRY_KSV_PO_MRP1_QRY_CD_1] =
        useState([]);
    const [dataQRY_KSV_PO_MRP1_QRY_CD_1, setDataQRY_KSV_PO_MRP1_QRY_CD_1] =
        useState({});

    const onDropdownChangeQRY_KSV_PO_MRP1_QRY_CD_1 = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataQRY_KSV_PO_MRP1 = { ...dataQRY_KSV_PO_MRP1 };

        let tTypeVal = _dataQRY_KSV_PO_MRP1[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_PO_MRP1[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_PO_MRP1[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_PO_MRP1(_dataQRY_KSV_PO_MRP1);
        setDataQRY_KSV_PO_MRP1_QRY_CD_1(e.value);
    };

    const onCheckboxChangeQRY_KSV_PO_MRP1_IS_MRP_BY_ORDER = (e, name) => {
        let val = "";
        let _dataQRY_KSV_PO_MRP1 = { ...dataQRY_KSV_PO_MRP1 };
        if (e.checked) {
            val = "1";
        } else {
            val = "0";
        }
        _dataQRY_KSV_PO_MRP1[`${name}`] = val;
        setDataQRY_KSV_PO_MRP1(_dataQRY_KSV_PO_MRP1);
    };

    const onCheckboxChangeQRY_KSV_PO_MRP1_IS_PRODUCT_BASE = (e, name) => {
        let val = "";
        let _dataQRY_KSV_PO_MRP1 = { ...dataQRY_KSV_PO_MRP1 };
        if (e.checked) {
            val = "1";
        } else {
            val = "0";
        }
        _dataQRY_KSV_PO_MRP1[`${name}`] = val;
        setDataQRY_KSV_PO_MRP1(_dataQRY_KSV_PO_MRP1);
    };

    const onCheckboxChangeQRY_KSV_PO_MRP1_IS_ALL_ORDER = (e, name) => {
        let val = "";
        let _dataQRY_KSV_PO_MRP1 = { ...dataQRY_KSV_PO_MRP1 };
        if (e.checked) {
            val = "1";
        } else {
            val = "0";
        }
        _dataQRY_KSV_PO_MRP1[`${name}`] = val;
        setDataQRY_KSV_PO_MRP1(_dataQRY_KSV_PO_MRP1);
    };

    const onCheckboxChangeQRY_KSV_PO_MRP1_IS_BVT = (e, name) => {
        let val = "";
        let _dataQRY_KSV_PO_MRP1 = { ...dataQRY_KSV_PO_MRP1 };
        if (e.checked) {
            val = "1";
        } else {
            val = "0";
        }
        _dataQRY_KSV_PO_MRP1[`${name}`] = val;
        setDataQRY_KSV_PO_MRP1(_dataQRY_KSV_PO_MRP1);
    };

    /**TABLE KSV_PO_MEM */
    // DEFINE DATAGRID : TBL_KSV_PO_MEM
    const [datasTBL_KSV_PO_MEM, setDatasTBL_KSV_PO_MEM] = useState([]);
    const dt_TBL_KSV_PO_MEM = useRef(null);
    const [dataTBL_KSV_PO_MEM, setDataTBL_KSV_PO_MEM] =
        useState(emptyTBL_KSV_PO_MEM);
    const [selectedTBL_KSV_PO_MEM, setSelectedTBL_KSV_PO_MEM] = useState([]);
    const [flagSelectModeTBL_KSV_PO_MEM, setFlagSelectModeTBL_KSV_PO_MEM] =
        useState(false);

    // DATAGRID CODE : TBL_KSV_PO_MEM

    const onRowClick1TBL_KSV_PO_MEM = (argData0) => {
        var argData = {};

        if (typeof argData0.length !== "undefined") {
            argData = argData0[0];
        } else {
            argData = argData0;
        }

        let argTBL_KSV_PO_MEM = argData;

        setDataTBL_KSV_PO_MEM(argTBL_KSV_PO_MEM);
    };

    const onRowClickTBL_KSV_PO_MEM = (event) => {
        let argTBL_KSV_PO_MEM = event.data;
        if (flagSelectModeTBL_KSV_PO_MEM) return;

        // Service : NawooAll:mgrQueryTBL_KSV_PO_MEM
    };

    const exportExcelTBL_KSV_PO_MEM = () => {};

    useEffect(() => {
        var tObj = { ...emptyQRY_KSV_PO_MRP };

        serviceS0405_PO_MRP_LIST.mgrQuery_CODE(tObj).then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                console.log(
                    "ServiceMgrKCD_BUYER.mgr1KcdStyle call => " +
                        data.BUYER_CD.length,
                );

                setDatasQRY_KSV_PO_MRP_BUYER_CD(data.BUYER_CD);
                setDataQRY_KSV_PO_MRP_BUYER_CD(data.BUYER_CD[0]);

                setDatasQRY_KSV_PO_MRP_PO_CD(data.PO_CD);
                setDataQRY_KSV_PO_MRP_PO_CD(data.PO_CD[0]);
            } else {
                console.log(
                    "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });

        serviceS0405_PO_MRP_LIST.mgrQueryTBL_KSV_PO_MEM(tObj).then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                console.log(
                    "ServiceMgrKCD_BUYER.mgr1KcdStyle call => " + data.length,
                );

                setDatasTBL_KSV_PO_MEM(data);
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
                        width: "20rem",
                    }}
                >
                    <p style={{ width: "4rem", display: "inline-block" }}>PO</p>
                    <div
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "15rem",
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
                        width: "20rem",
                    }}
                >
                    <p style={{ width: "4rem", display: "inline-block" }}>Style</p>
                    <InputText
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "15rem",
                        }}
                        id="id_STYLE_CD"
                        value={dataQRY_KSV_PO_MRP.STYLE_CD}
                        onChange={(e) =>
                            onInputChangeQRY_KSV_PO_MRP_STYLE_CD(e, "STYLE_CD")
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
                    <p style={{ width: "4rem", display: "inline-block" }}>Buyer</p>
                    <div
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "15rem",
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
                        label="Matl Card"
                        icon="pi pi-check"
                        style={{ height: "1.1rem" }}
                        className="p-button-text"
                        onClick={exportExcelTBL_KSV_PO_MEM}
                    />

                    <Button
                        label="Excel"
                        icon="pi pi-upload"
                        style={{ height: "1.1rem" }}
                        className="p-button-text green"
                        onClick={exportExcelTBL_KSV_PO_MEM}
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
                    ref={dt_TBL_KSV_PO_MEM}
                    size="small"
                    value={datasTBL_KSV_PO_MEM}
                    resizableColumns
                    columnResizeMode="fit"
                    showGridlines
                    selectionMode="checkbox"
                    selection={selectedTBL_KSV_PO_MEM}
                    onSelectionChange={(e) => {
                        setFlagSelectModeTBL_KSV_PO_MEM(true);
                        setSelectedTBL_KSV_PO_MEM(e.value);
                        console.log(
                            "selected length:" + selectedTBL_KSV_PO_MEM.length,
                        );
                        onRowClick1TBL_KSV_PO_MEM(e.value);
                    }}
                    onRowClick={onRowClickTBL_KSV_PO_MEM}
                    dataKey="id"
                    className="datatable-responsive"
                    virtualScrollerOptions={{ itemSize: 9 }}
                    emptyMessage=" " //header={headerTBL_KSV_PO_MEM}
                    responsiveLayout="scroll"
                    scrollable
                    scrollHeight="18rem"
                >
                    <AFColumn field="PO_CD" header="Po" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="ORDER_CD" header="Order" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="STYLE_NAME" header="Style" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="BUYER_NAME" header="Buyer" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="DUE_DATE" header="Due Date" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="TOT_QTY" header="Order Qty" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="SEQ" header="Seq" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="ORDER_STATUS" header="Status" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                </AFDataTable>
            </div>

            <Divider />

            <div style={{ width: "100rem", height: "2rem" }}>
                <div className="formgrid grid">
                    <div>
                        <span
                            style={{
                                marginLeft: "0.5rem",
                                height: "2rem",
                                display: "inline-block",
                                width: "14rem",
                            }}
                        >
                            <p style={{ width: "6rem", display: "inline-block", }}>Curr Date</p>
                            <div
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "7rem",
                                }}
                            >
                                <Calendar
                                    showButtonBar
                                    dateFormat="yy-mm-dd"
                                    id="id_CURR_DATE"
                                    value={changeDateVal(
                                        dataQRY_KSV_PO_MRP1.CURR_DATE,
                                    )}
                                    onChange={(e) =>
                                        onCalChangeQRY_KSV_PO_MRP1_CURR_DATE(
                                            e,
                                            "CURR_DATE",
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
                                width: "10rem",
                            }}
                        >
                            <p style={{ width: "7rem", display: "inline-block", }}>Without Price</p>
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
                                    id="id_IS_PRICE"
                                    checked={changeCheckBoxVal(
                                        dataQRY_KSV_PO_MRP1.IS_PRICE,
                                    )}
                                    onChange={(e) =>
                                        onCheckboxChangeQRY_KSV_PO_MRP1_IS_PRICE(
                                            e,
                                            "IS_PRICE",
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
                                width: "9rem",
                            }}
                        >
                            {/* <p style={{ width: '8rem', display: 'inline-block' }}> Qry1 </p> */}
                            <div
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "8rem",
                                }}
                            >
                                <Dropdown
                                    id="id_QRY_CD_1"
                                    value={dataQRY_KSV_PO_MRP1_QRY_CD_1}
                                    onChange={(e) =>
                                        onDropdownChangeQRY_KSV_PO_MRP1_QRY_CD_1(
                                            e,
                                            "QRY_CD_1",
                                        )
                                    }
                                    options={datasQRY_KSV_PO_MRP1_QRY_CD_1}
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
                                width: "10rem",
                            }}
                        >
                            <p style={{ width: "8rem", display: "inline-block", }}>Mrp By Order</p>
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
                                    id="id_IS_MRP_BY_ORDER"
                                    checked={changeCheckBoxVal(
                                        dataQRY_KSV_PO_MRP1.IS_MRP_BY_ORDER,
                                    )}
                                    onChange={(e) =>
                                        onCheckboxChangeQRY_KSV_PO_MRP1_IS_MRP_BY_ORDER(
                                            e,
                                            "IS_MRP_BY_ORDER",
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
                                width: "10rem",
                            }}
                        >
                            <p style={{ width: "8rem", display: "inline-block", }}>Product Base</p>
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
                                    id="id_IS_PRODUCT_BASE"
                                    checked={changeCheckBoxVal(
                                        dataQRY_KSV_PO_MRP1.IS_PRODUCT_BASE,
                                    )}
                                    onChange={(e) =>
                                        onCheckboxChangeQRY_KSV_PO_MRP1_IS_PRODUCT_BASE(
                                            e,
                                            "IS_PRODUCT_BASE",
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
                            <p style={{ width: "6rem", display: "inline-block", }}>All Order</p>
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
                                    id="id_IS_ALL_ORDER"
                                    checked={changeCheckBoxVal(
                                        dataQRY_KSV_PO_MRP1.IS_ALL_ORDER,
                                    )}
                                    onChange={(e) =>
                                        onCheckboxChangeQRY_KSV_PO_MRP1_IS_ALL_ORDER(
                                            e,
                                            "IS_ALL_ORDER",
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
                                width: "4rem",
                            }}
                        >
                            <p style={{ width: "2rem", display: "inline-block", }}>Bvt</p>
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
                                    id="id_IS_BVT"
                                    checked={changeCheckBoxVal(
                                        dataQRY_KSV_PO_MRP1.IS_BVT,
                                    )}
                                    onChange={(e) =>
                                        onCheckboxChangeQRY_KSV_PO_MRP1_IS_BVT(
                                            e,
                                            "IS_BVT",
                                        )
                                    }
                                />
                            </div>
                        </span>
                    </div>
                    <div style={{ display: "inline-block" }}>
                        <Button
                            style={{ display: "inline-block", width: "8rem" }}
                            label="MRP List"
                            className="p-button-text"
                            onClick={blankFn}
                        />

                        <Button
                            style={{ display: "inline-block", width: "12rem" }}
                            label="MRP List (Color)"
                            className="p-button-text"
                            onClick={blankFn}
                        />

                        <Button
                            style={{ display: "inline-block", width: "12rem" }}
                            label="Combined MRP"
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

export default React.memo(S0405_PO_MRP_LIST, comparisonFn);
