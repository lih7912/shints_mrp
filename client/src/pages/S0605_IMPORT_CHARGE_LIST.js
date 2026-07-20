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
import { ServiceS0605_IMPORT_CHARGE_LIST } from "../service/service_biz/ServiceS0605_IMPORT_CHARGE_LIST";

import "./page_common.scss";

const emptyKCD_CODE = {
    id: 0,
    CD_GROUP: "",
    CD_CODE: "",
    CD_NAME: "",
    CD_FLAG: "",
};

const emptyQRY_KSV_INVOICE_MST = {
    S_SHIP_DATE: "",
    E_SHIP_DATE: "",
    DELIVERY_TYPE: "",
    BUYER_CD: "",
};

const emptyTBL_KSV_INVOICE_MST = {
    id: 0,
    INVOICE_NO: "",
    SHIP_DATE: "",
    CURR_CD: "",
    ORD_AMT: "",
    TOT_AMT: "",
    DUTY_AMT: "",
    FREIGHT_AMT: "",
    COST_CLEARANCE: "",
    REMARK: "",
    DELIVERY_TYPE: "",
    BUYER_NAME: "",
    BUYER_CD: "",
};

const emptyTBL_KSV_INVOICE_MST1 = {
    id: 0,
    INVOICE_NO: "",
    ORDER_CD: "",
    STYLE_NAME: "",
    SHIP_QTY: "",
    ORD_PRICE: "",
    AMOUNT: "",
    BUYER_CD: "",
    PO_CD: "",
    ETC_CHARGE: "",
};

const S0605_IMPORT_CHARGE_LIST = () => {
    const serviceLibRef = useRef(null);
    if (!serviceLibRef.current) {
        serviceLibRef.current = new ServiceLib();
        serviceLibRef.current.loginConfirm();
    }
    const serviceLib = serviceLibRef.current;
    const serviceS0605_IMPORT_CHARGE_LIST =
        new ServiceS0605_IMPORT_CHARGE_LIST();

    const toast = useRef(null);

    /* splitter 관련 */
    const [styleVal, setStyleVal] = useState({ width: "65vw" });

    const search_LIST_1 = () => {
        var _tData = { ...dataQRY_KSV_INVOICE_MST };

        setDatasTBL_KSV_INVOICE_MST([]);
        setSelectedTBL_KSV_INVOICE_MST([]);

        setLoadingTBL_KSV_INVOICE_MST(true);

        serviceS0605_IMPORT_CHARGE_LIST.mgrQuery_LIST_1(_tData).then((data) => {
            setLoadingTBL_KSV_INVOICE_MST(false);
            if (typeof data.graphQLErrors === "undefined") {
                console.log(
                    "ServiceMgrKCD_BUYER.mgr1KcdStyle call => " + data.length,
                );
                var tArray2 = data.map((col, i) => {
                    var tObj = { ...col };
                    tObj.id = i + 1;
                    return tObj;
                });
                setDatasTBL_KSV_INVOICE_MST(tArray2);
            } else {
                console.log(
                    "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });
    };

    const search_LIST_2 = (argData) => {
        var tInput = {};
        tInput.INVOICE_NO = argData;

        setDatasTBL_KSV_INVOICE_MST1([]);
        setSelectedTBL_KSV_INVOICE_MST1([]);

        setLoadingTBL_KSV_INVOICE_MST1(true);

        serviceS0605_IMPORT_CHARGE_LIST.mgrQuery_LIST_2(tInput).then((data) => {
            setLoadingTBL_KSV_INVOICE_MST1(false);
            if (typeof data.graphQLErrors === "undefined") {
                console.log(
                    "ServiceMgrKCD_BUYER.mgr1KcdStyle call => " + data.length,
                );
                var tArray2 = data.map((col, i) => {
                    var tObj = { ...col };
                    tObj.id = i + 1;
                    return tObj;
                });
                setDatasTBL_KSV_INVOICE_MST1(tArray2);
            } else {
                console.log(
                    "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });
    };

    /* QRY KSV_INVOICE_MST*/
    const [dataQRY_KSV_INVOICE_MST, setDataQRY_KSV_INVOICE_MST] = useState(
        emptyQRY_KSV_INVOICE_MST,
    );

    const onCalChangeQRY_KSV_INVOICE_MST_S_SHIP_DATE = (e, name) => {
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

    const onCalChangeQRY_KSV_INVOICE_MST_E_SHIP_DATE = (e, name) => {
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

    const [
        datasQRY_KSV_INVOICE_MST_DELIVERY_TYPE,
        setDatasQRY_KSV_INVOICE_MST_DELIVERY_TYPE,
    ] = useState([]);
    const [
        dataQRY_KSV_INVOICE_MST_DELIVERY_TYPE,
        setDataQRY_KSV_INVOICE_MST_DELIVERY_TYPE,
    ] = useState({});

    const onDropdownChangeQRY_KSV_INVOICE_MST_DELIVERY_TYPE = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataQRY_KSV_INVOICE_MST = { ...dataQRY_KSV_INVOICE_MST };

        let tTypeVal = _dataQRY_KSV_INVOICE_MST[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_INVOICE_MST[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_INVOICE_MST[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_INVOICE_MST(_dataQRY_KSV_INVOICE_MST);
        setDataQRY_KSV_INVOICE_MST_DELIVERY_TYPE(e.value);
    };

    const [
        datasQRY_KSV_INVOICE_MST_BUYER_CD,
        setDatasQRY_KSV_INVOICE_MST_BUYER_CD,
    ] = useState([]);
    const [
        dataQRY_KSV_INVOICE_MST_BUYER_CD,
        setDataQRY_KSV_INVOICE_MST_BUYER_CD,
    ] = useState({});

    const onDropdownChangeQRY_KSV_INVOICE_MST_BUYER_CD = (e, name) => {
        let val = (e.value && e.value.BUYER_CD) || "";

        let _dataQRY_KSV_INVOICE_MST = { ...dataQRY_KSV_INVOICE_MST };

        let tTypeVal = _dataQRY_KSV_INVOICE_MST[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_INVOICE_MST[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_INVOICE_MST[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_INVOICE_MST(_dataQRY_KSV_INVOICE_MST);
        setDataQRY_KSV_INVOICE_MST_BUYER_CD(e.value);
    };

    /*TABLE KSV_INVOICE_MST */
    // DEFINE DATAGRID : TBL_KSV_INVOICE_MST
    const [loadingTBL_KSV_INVOICE_MST, setLoadingTBL_KSV_INVOICE_MST] =
        useState(false);

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

        search_LIST_2(argData.INVOICE_NO);
    };

    const onRowClickTBL_KSV_INVOICE_MST = (event) => {
        let argTBL_KSV_INVOICE_MST = event.data;
        if (flagSelectModeTBL_KSV_INVOICE_MST) return;

        // Service : NawooAll:mgrQueryTBL_KSV_INVOICE_MST
    };

    const exportExcelTBL_KSV_INVOICE_MST = () => {};

    /**TABLE KSV_INVOICE_MST1 */
    // DEFINE DATAGRID : TBL_KSV_INVOICE_MST1
    const [loadingTBL_KSV_INVOICE_MST1, setLoadingTBL_KSV_INVOICE_MST1] =
        useState(false);

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

    useEffect(() => {
        var _tObj = {};
        _tObj.INVOICE_NO = "";

        serviceS0605_IMPORT_CHARGE_LIST.mgrQuery_CODE(_tObj).then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                setDatasQRY_KSV_INVOICE_MST_DELIVERY_TYPE(data.DELIVERY_TYPE);
                setDataQRY_KSV_INVOICE_MST_DELIVERY_TYPE(data.DELIVERY_TYPE[0]);

                setDatasQRY_KSV_INVOICE_MST_BUYER_CD(data.BUYER_CD);
                setDataQRY_KSV_INVOICE_MST_BUYER_CD(data.BUYER_CD[0]);
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
                    <p style={{ width: "8rem", display: "inline-block" }}>Ship Date</p>
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
                            id="id_S_SHIP_DATE"
                            value={changeDateVal(
                                dataQRY_KSV_INVOICE_MST.S_SHIP_DATE,
                            )}
                            onChange={(e) =>
                                onCalChangeQRY_KSV_INVOICE_MST_S_SHIP_DATE(
                                    e,
                                    "S_SHIP_DATE",
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
                            id="id_E_SHIP_DATE"
                            value={changeDateVal(
                                dataQRY_KSV_INVOICE_MST.E_SHIP_DATE,
                            )}
                            onChange={(e) =>
                                onCalChangeQRY_KSV_INVOICE_MST_E_SHIP_DATE(
                                    e,
                                    "E_SHIP_DATE",
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
                    <p style={{ width: "8rem", display: "inline-block" }}>Freight Type</p>
                    <div
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "13rem",
                        }}
                    >
                        <Dropdown
                            id="id_DELIVERY_TYPE"
                            value={dataQRY_KSV_INVOICE_MST_DELIVERY_TYPE}
                            onChange={(e) =>
                                onDropdownChangeQRY_KSV_INVOICE_MST_DELIVERY_TYPE(
                                    e,
                                    "DELIVERY_TYPE",
                                )
                            }
                            options={datasQRY_KSV_INVOICE_MST_DELIVERY_TYPE}
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
                        width: "22rem",
                    }}
                >
                    <p style={{ width: "5rem", display: "inline-block" }}>Buyer</p>
                    <div
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "15rem",
                        }}
                    >
                        <Dropdown
                            id="id_BUYER_CD"
                            value={dataQRY_KSV_INVOICE_MST_BUYER_CD}
                            onChange={(e) =>
                                onDropdownChangeQRY_KSV_INVOICE_MST_BUYER_CD(
                                    e,
                                    "BUYER_CD",
                                )
                            }
                            options={datasQRY_KSV_INVOICE_MST_BUYER_CD}
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
                        onClick={search_LIST_1}
                    />

                    <Button
                        label="Excel"
                        icon="pi pi-upload"
                        style={{ color: "green", height: "1.1rem" }}
                        className="p-button-text"
                        onClick={exportExcelTBL_KSV_INVOICE_MST}
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
                    virtualScrollerOptions={{ itemSize: 14 }}
                    loading={loadingTBL_KSV_INVOICE_MST}
                    emptyMessage="No TBL_KSV_INVOICE_MST found." //header={headerTBL_KSV_INVOICE_MST}
                    responsiveLayout="scroll"
                    scrollable
                    scrollHeight="28rem"
                >
                    <AFColumn field="INVOICE_NO" header="Invoce" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="SHIP_DATE" header="Ship Date" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="CURR_CD" header="curr" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="ORD_AMT" header="Ord Amt" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="TOT_AMT" header="Tot Amt" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="CUSTOMS" header="Duty" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="VAT" header="Duty" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="FREIGHT" header="Freight" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="CLEARANCE" header="Cost Clea" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="REMARK" header="Remark" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="CD_NAME" header="Freight Type" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="BUYER_NAME" header="Buyer" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="BUYER_CD" header="Buyer cd" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                </AFDataTable>
            </div>

            <div
                style={{
                    marginLeft: "1rem",
                    marginTop: "1rem",
                    width: "99rem",
                    height: "26rem",
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
                    virtualScrollerOptions={{ itemSize: 12 }}
                    loading={loadingTBL_KSV_INVOICE_MST1}
                    emptyMessage="No TBL_KSV_INVOICE_MST1 found." //header={headerTBL_KSV_INVOICE_MST1}
                    responsiveLayout="scroll"
                    scrollable
                    scrollHeight="24rem"
                >
                    <AFColumn field="INVOICE_NO" header="Invoce" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="ORDER_CD" header="order" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="STYLE_NAME" header="Style" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="SHIP_QTY" header="Ship Qty" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="SHIP_PRICE" header="Ship Price" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="TOT_AMT" header="Tot Amt" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="BUYER_CD" header="Buyer" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="PO_CD" header="PO" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="ETC_CHARGE" header="Etc charge" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
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

export default React.memo(S0605_IMPORT_CHARGE_LIST, comparisonFn);
