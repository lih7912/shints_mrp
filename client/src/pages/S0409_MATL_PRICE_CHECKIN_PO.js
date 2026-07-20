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
// import { ServiceS0409_MATL_PRICE_CHECKIN_PO } from '../service/service_biz/ServiceS0409_MATL_PRICE_CHECKIN_PO';

import "./page_common.scss";

const emptyKCD_CODE = {
    id: 0,
    CD_GROUP: "",
    CD_CODE: "",
    CD_NAME: "",
    CD_FLAG: "",
};

const emptyQRY_KSV_STOCK_IN = {
    PO_CD: "",
    STYLE_CD: "",
};

const emptyTBL_KCD_VENDOR = {
    id: 0,
    VENDOR_CD: "",
    VENDOR_NAME: "",
};

const emptyTBL_KSV_PO_MRP = {
    id: 0,
    MATL_CD: "",
    MATL_NAME: "",
    COLOR: "",
    SPEC: "",
    PO_QTY: "",
    CURR_CD: "",
    PRICE_TYPE: "",
    S_PRICE: "",
    MATL_PRICE: "",
    MATL_NEGO: "",
    PERCENT: "",
    DIFF: "",
    REMARK: "",
    TEMP_PRICE: "",
    CONF_FLAG: "",
    MATL_SEQ: "",
    VENDOR_NAME: "",
};

const emptyTBL_KSV_PO_MST = {
    id: 0,
    PO_CD: "",
};

const emptyTBL_KSV_PO_MST1 = {
    id: 0,
    PO_CD: "",
};

const emptyEDT_KSV_PO_MRP1 = {
    MATL_NAME: "",
    COLOR: "",
    SPEC: "",
    IS_CURR_CHANGE: "",
    CURR_CD: "",
    PRICE: "",
};

const S0409_MATL_PRICE_CHECKIN_PO = () => {
    const serviceLibRef = useRef(null);
    if (!serviceLibRef.current) {
        serviceLibRef.current = new ServiceLib();
        serviceLibRef.current.loginConfirm();
    }
    const serviceLib = serviceLibRef.current;
    // const serviceS0409_MATL_PRICE_CHECKIN_PO = new ServiceS0409_MATL_PRICE_CHECKIN_PO();

    const toast = useRef(null);

    /* splitter 관련 */
    const [styleVal, setStyleVal] = useState({ width: "65vw" });

    /*QRY KSV_STOCK_IN */
    const [dataQRY_KSV_STOCK_IN, setDataQRY_KSV_STOCK_IN] = useState(
        emptyQRY_KSV_STOCK_IN,
    );

    const [datasQRY_KSV_STOCK_IN_PO_CD, setDatasQRY_KSV_STOCK_IN_PO_CD] =
        useState([]);
    const [dataQRY_KSV_STOCK_IN_PO_CD, setDataQRY_KSV_STOCK_IN_PO_CD] =
        useState({});

    const onDropdownChangeQRY_KSV_STOCK_IN_PO_CD = (e, name) => {
        let val = (e.value && e.value.PO_CD) || "";

        let _dataQRY_KSV_STOCK_IN = { ...dataQRY_KSV_STOCK_IN };

        let tTypeVal = _dataQRY_KSV_STOCK_IN[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_STOCK_IN[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_STOCK_IN[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_STOCK_IN(_dataQRY_KSV_STOCK_IN);
        setDataQRY_KSV_STOCK_IN_PO_CD(e.value);
    };

    const onInputChangeQRY_KSV_STOCK_IN_STYLE_CD = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_STOCK_IN = { ...dataQRY_KSV_STOCK_IN };

        let tTypeVal = _dataQRY_KSV_STOCK_IN[`${name}`];
        if (typeof tTypeVal === "string")
            _dataQRY_KSV_STOCK_IN[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_STOCK_IN[`${name}`] = parseInt(val);

        setDataQRY_KSV_STOCK_IN(_dataQRY_KSV_STOCK_IN);
    };

    /* TABLE KCD_VENDOR*/
    // DEFINE DATAGRID : TBL_KCD_VENDOR
    const [datasTBL_KCD_VENDOR, setDatasTBL_KCD_VENDOR] = useState([]);
    const dt_TBL_KCD_VENDOR = useRef(null);
    const [dataTBL_KCD_VENDOR, setDataTBL_KCD_VENDOR] =
        useState(emptyTBL_KCD_VENDOR);
    const [selectedTBL_KCD_VENDOR, setSelectedTBL_KCD_VENDOR] = useState([]);
    const [flagSelectModeTBL_KCD_VENDOR, setFlagSelectModeTBL_KCD_VENDOR] =
        useState(false);

    // DATAGRID CODE : TBL_KCD_VENDOR

    const onRowClick1TBL_KCD_VENDOR = (argData0) => {
        var argData = {};

        if (typeof argData0.length !== "undefined") {
            argData = argData0[0];
        } else {
            argData = argData0;
        }

        let argTBL_KCD_VENDOR = argData;

        setDataTBL_KCD_VENDOR(argTBL_KCD_VENDOR);
    };

    const onRowClickTBL_KCD_VENDOR = (event) => {
        let argTBL_KCD_VENDOR = event.data;
        if (flagSelectModeTBL_KCD_VENDOR) return;

        // Service : NawooAll:mgrQueryTBL_KCD_VENDOR
    };

    /**TABLE KSV_PO_MRP */
    // DEFINE DATAGRID : TBL_KSV_PO_MRP
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

    /**TABLE KSV_PO_MST */
    // DEFINE DATAGRID : TBL_KSV_PO_MST
    const [datasTBL_KSV_PO_MST, setDatasTBL_KSV_PO_MST] = useState([]);
    const dt_TBL_KSV_PO_MST = useRef(null);
    const [dataTBL_KSV_PO_MST, setDataTBL_KSV_PO_MST] =
        useState(emptyTBL_KSV_PO_MST);
    const [selectedTBL_KSV_PO_MST, setSelectedTBL_KSV_PO_MST] = useState([]);
    const [flagSelectModeTBL_KSV_PO_MST, setFlagSelectModeTBL_KSV_PO_MST] =
        useState(false);

    // DATAGRID CODE : TBL_KSV_PO_MST

    const onRowClick1TBL_KSV_PO_MST = (argData0) => {
        var argData = {};

        if (typeof argData0.length !== "undefined") {
            argData = argData0[0];
        } else {
            argData = argData0;
        }

        let argTBL_KSV_PO_MST = argData;

        setDataTBL_KSV_PO_MST(argTBL_KSV_PO_MST);
    };

    const onRowClickTBL_KSV_PO_MST = (event) => {
        let argTBL_KSV_PO_MST = event.data;
        if (flagSelectModeTBL_KSV_PO_MST) return;

        // Service : NawooAll:mgrQueryTBL_KSV_PO_MST
    };

    /**TABLE KSV_PO_MST1 */

    // DEFINE DATAGRID : TBL_KSV_PO_MST1
    const [datasTBL_KSV_PO_MST1, setDatasTBL_KSV_PO_MST1] = useState([]);
    const dt_TBL_KSV_PO_MST1 = useRef(null);
    const [dataTBL_KSV_PO_MST1, setDataTBL_KSV_PO_MST1] =
        useState(emptyTBL_KSV_PO_MST1);
    const [selectedTBL_KSV_PO_MST1, setSelectedTBL_KSV_PO_MST1] = useState([]);
    const [flagSelectModeTBL_KSV_PO_MST1, setFlagSelectModeTBL_KSV_PO_MST1] =
        useState(false);

    // DATAGRID CODE : TBL_KSV_PO_MST1

    const onRowClick1TBL_KSV_PO_MST1 = (argData0) => {
        var argData = {};

        if (typeof argData0.length !== "undefined") {
            argData = argData0[0];
        } else {
            argData = argData0;
        }

        let argTBL_KSV_PO_MST1 = argData;

        setDataTBL_KSV_PO_MST1(argTBL_KSV_PO_MST1);
    };

    const onRowClickTBL_KSV_PO_MST1 = (event) => {
        let argTBL_KSV_PO_MST1 = event.data;
        if (flagSelectModeTBL_KSV_PO_MST1) return;

        // Service : NawooAll:mgrQueryTBL_KSV_PO_MST1
    };

    /**EDIT KSV_PO_MRP1 */
    const [datasEDT_KSV_PO_MRP1, setDatasEDT_KSV_PO_MRP1] = useState([]);
    const [dataEDT_KSV_PO_MRP1, setDataEDT_KSV_PO_MRP1] =
        useState(emptyEDT_KSV_PO_MRP1);

    const onInputChangeEDT_KSV_PO_MRP1_MATL_NAME = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_PO_MRP1 = { ...dataEDT_KSV_PO_MRP1 };

        let tTypeVal = _dataEDT_KSV_PO_MRP1[`${name}`];
        if (typeof tTypeVal === "string") _dataEDT_KSV_PO_MRP1[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_PO_MRP1[`${name}`] = parseInt(val);

        setDataEDT_KSV_PO_MRP1(_dataEDT_KSV_PO_MRP1);
    };

    const onInputChangeEDT_KSV_PO_MRP1_COLOR = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_PO_MRP1 = { ...dataEDT_KSV_PO_MRP1 };

        let tTypeVal = _dataEDT_KSV_PO_MRP1[`${name}`];
        if (typeof tTypeVal === "string") _dataEDT_KSV_PO_MRP1[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_PO_MRP1[`${name}`] = parseInt(val);

        setDataEDT_KSV_PO_MRP1(_dataEDT_KSV_PO_MRP1);
    };

    const onInputChangeEDT_KSV_PO_MRP1_SPEC = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_PO_MRP1 = { ...dataEDT_KSV_PO_MRP1 };

        let tTypeVal = _dataEDT_KSV_PO_MRP1[`${name}`];
        if (typeof tTypeVal === "string") _dataEDT_KSV_PO_MRP1[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_PO_MRP1[`${name}`] = parseInt(val);

        setDataEDT_KSV_PO_MRP1(_dataEDT_KSV_PO_MRP1);
    };

    const onCheckboxChangeEDT_KSV_PO_MRP1_IS_CURR_CHANGE = (e, name) => {
        let val = "";
        let _dataEDT_KSV_PO_MRP1 = { ...dataEDT_KSV_PO_MRP1 };
        if (e.checked) {
            val = "1";
        } else {
            val = "0";
        }
        _dataEDT_KSV_PO_MRP1[`${name}`] = val;
        setDataEDT_KSV_PO_MRP1(_dataEDT_KSV_PO_MRP1);
    };

    const [datasEDT_KSV_PO_MRP1_CURR_CD, setDatasEDT_KSV_PO_MRP1_CURR_CD] =
        useState([]);
    const [dataEDT_KSV_PO_MRP1_CURR_CD, setDataEDT_KSV_PO_MRP1_CURR_CD] =
        useState({});

    const onDropdownChangeEDT_KSV_PO_MRP1_CURR_CD = (e, name) => {
        let val = (e.value && e.value.CD_NAME) || "";

        let _dataEDT_KSV_PO_MRP1 = { ...dataEDT_KSV_PO_MRP1 };

        let tTypeVal = _dataEDT_KSV_PO_MRP1[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_KSV_PO_MRP1[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_KSV_PO_MRP1[`${name}`] = parseInt(val);
        }

        setDataEDT_KSV_PO_MRP1(_dataEDT_KSV_PO_MRP1);
        setDataEDT_KSV_PO_MRP1_CURR_CD(e.value);
    };

    const onInputChangeEDT_KSV_PO_MRP1_PRICE = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_PO_MRP1 = { ...dataEDT_KSV_PO_MRP1 };

        let tTypeVal = _dataEDT_KSV_PO_MRP1[`${name}`];
        if (typeof tTypeVal === "string") _dataEDT_KSV_PO_MRP1[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_PO_MRP1[`${name}`] = parseInt(val);

        setDataEDT_KSV_PO_MRP1(_dataEDT_KSV_PO_MRP1);
    };

    useEffect(() => {}, []);

    const blankFn = () => {};

    // Support Area

    const changeCheckBoxVal = (argVal) => {
        if (argVal === "1") return true;
        else return false;
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
                        width: "33rem",
                    }}
                >
                    <p style={{ width: "8rem", display: "inline-block" }}>PO</p>
                    <div
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "23rem",
                        }}
                    >
                        <Dropdown
                            id="id_PO_CD"
                            value={dataQRY_KSV_STOCK_IN_PO_CD}
                            onChange={(e) =>
                                onDropdownChangeQRY_KSV_STOCK_IN_PO_CD(
                                    e,
                                    "PO_CD",
                                )
                            }
                            options={datasQRY_KSV_STOCK_IN_PO_CD}
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
                        width: "33rem",
                    }}
                >
                    <p style={{ width: "8rem", display: "inline-block" }}>Style</p>
                    <InputText
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "23rem",
                        }}
                        id="id_STYLE_CD"
                        value={dataQRY_KSV_STOCK_IN.STYLE_CD}
                        onChange={(e) =>
                            onInputChangeQRY_KSV_STOCK_IN_STYLE_CD(
                                e,
                                "STYLE_CD",
                            )
                        }
                    />
                </span>
            </div>
            <div style={{ width: "100rem", height: "2rem" }}></div>

            <div
                style={{
                    marginLeft: "1rem",
                    marginTop: "1rem",
                    width: "99rem",
                    height: "22rem",
                }}
            >
                <AFDataTable preventUnrelatedRerender
                    ref={dt_TBL_KCD_VENDOR}
                    size="small"
                    value={datasTBL_KCD_VENDOR}
                    resizableColumns
                    columnResizeMode="fit"
                    showGridlines
                    selectionMode="checkbox"
                    selection={selectedTBL_KCD_VENDOR}
                    onSelectionChange={(e) => {
                        setFlagSelectModeTBL_KCD_VENDOR(true);
                        setSelectedTBL_KCD_VENDOR(e.value);
                        console.log(
                            "selected length:" + selectedTBL_KCD_VENDOR.length,
                        );
                        onRowClick1TBL_KCD_VENDOR(e.value);
                    }}
                    onRowClick={onRowClickTBL_KCD_VENDOR}
                    dataKey="id"
                    className="datatable-responsive"
                    virtualScrollerOptions={{ itemSize: 50 }}
                    emptyMessage="No TBL_KCD_VENDOR found."
                    header={headerTBL_KCD_VENDOR}
                    responsiveLayout="scroll"
                    scrollable
                    scrollHeight="18rem"
                >
                    <AFColumn field="VENDOR_CD" header="Supplier" headerStyle={{ width: "10rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="VENDOR_NAME" header="Supplier1" headerStyle={{ width: "10rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                </AFDataTable>
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
                    virtualScrollerOptions={{ itemSize: 50 }}
                    emptyMessage="No TBL_KSV_PO_MRP found."
                    header={headerTBL_KSV_PO_MRP}
                    responsiveLayout="scroll"
                    scrollable
                    scrollHeight="18rem"
                >
                    <AFColumn field="MATL_CD" header="Matl Cd" headerStyle={{ width: "10rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="MATL_NAME" header="Description" headerStyle={{ width: "10rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="COLOR" header="Color" headerStyle={{ width: "10rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="SPEC" header="Spec" headerStyle={{ width: "10rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="PO_QTY" header="Po Qty" headerStyle={{ width: "10rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="CURR_CD" header="curr" headerStyle={{ width: "10rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="PRICE_TYPE" header="Price Type" headerStyle={{ width: "10rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="S_PRICE" header="Sale Price" headerStyle={{ width: "10rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="MATL_PRICE" header="Matl Price" headerStyle={{ width: "10rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="MATL_NEGO" header="Matl Nego" headerStyle={{ width: "10rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="PERCENT" header="%" headerStyle={{ width: "10rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="DIFF" header="Diff" headerStyle={{ width: "10rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="REMARK" header="Remark" headerStyle={{ width: "10rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="TEMP_PRICE" header="Temp Price" headerStyle={{ width: "10rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="CONF_FLAG" header="cont" headerStyle={{ width: "10rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="MATL_SEQ" header="Matl Seq" headerStyle={{ width: "10rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="VENDOR_NAME" header="Supplier" headerStyle={{ width: "10rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                </AFDataTable>
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
                    ref={dt_TBL_KSV_PO_MST}
                    size="small"
                    value={datasTBL_KSV_PO_MST}
                    resizableColumns
                    columnResizeMode="fit"
                    showGridlines
                    selectionMode="checkbox"
                    selection={selectedTBL_KSV_PO_MST}
                    onSelectionChange={(e) => {
                        setFlagSelectModeTBL_KSV_PO_MST(true);
                        setSelectedTBL_KSV_PO_MST(e.value);
                        console.log(
                            "selected length:" + selectedTBL_KSV_PO_MST.length,
                        );
                        onRowClick1TBL_KSV_PO_MST(e.value);
                    }}
                    onRowClick={onRowClickTBL_KSV_PO_MST}
                    dataKey="id"
                    className="datatable-responsive"
                    virtualScrollerOptions={{ itemSize: 50 }}
                    emptyMessage="No TBL_KSV_PO_MST found."
                    header={headerTBL_KSV_PO_MST}
                    responsiveLayout="scroll"
                    scrollable
                    scrollHeight="18rem"
                >
                    <AFColumn field="PO_CD" header="Pp No" headerStyle={{ width: "10rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                </AFDataTable>
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
                    ref={dt_TBL_KSV_PO_MST1}
                    size="small"
                    value={datasTBL_KSV_PO_MST1}
                    resizableColumns
                    columnResizeMode="fit"
                    showGridlines
                    selectionMode="checkbox"
                    selection={selectedTBL_KSV_PO_MST1}
                    onSelectionChange={(e) => {
                        setFlagSelectModeTBL_KSV_PO_MST1(true);
                        setSelectedTBL_KSV_PO_MST1(e.value);
                        console.log(
                            "selected length:" + selectedTBL_KSV_PO_MST1.length,
                        );
                        onRowClick1TBL_KSV_PO_MST1(e.value);
                    }}
                    onRowClick={onRowClickTBL_KSV_PO_MST1}
                    dataKey="id"
                    className="datatable-responsive"
                    virtualScrollerOptions={{ itemSize: 50 }}
                    emptyMessage="No TBL_KSV_PO_MST1 found."
                    header={headerTBL_KSV_PO_MST1}
                    responsiveLayout="scroll"
                    scrollable
                    scrollHeight="18rem"
                >
                    <AFColumn field="PO_CD" header="Pp No" headerStyle={{ width: "10rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                </AFDataTable>
            </div>

            <Divider />

            <div style={{ width: "100rem", height: "2rem" }}>
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
                    <div style={{ width: "60rem", height: "30rem" }}>
                        <span
                            style={{
                                marginLeft: "0.5rem",
                                height: "2rem",
                                display: "inline-block",
                                width: "33rem",
                            }}
                        >
                            <p style={{ width: "8rem", display: "inline-block", }}>Desc</p>
                            <InputText
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "23rem",
                                }}
                                id="id_MATL_NAME"
                                value={dataEDT_KSV_PO_MRP1.MATL_NAME}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_PO_MRP1_MATL_NAME(
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
                                width: "33rem",
                            }}
                        >
                            <p style={{ width: "8rem", display: "inline-block", }}>Color</p>
                            <InputText
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "23rem",
                                }}
                                id="id_COLOR"
                                value={dataEDT_KSV_PO_MRP1.COLOR}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_PO_MRP1_COLOR(
                                        e,
                                        "COLOR",
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
                            <p style={{ width: "8rem", display: "inline-block", }}>Spec</p>
                            <InputText
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "23rem",
                                }}
                                id="id_SPEC"
                                value={dataEDT_KSV_PO_MRP1.SPEC}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_PO_MRP1_SPEC(e, "SPEC")
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
                            <p style={{ width: "8rem", display: "inline-block", }}>curr Change</p>
                            <div
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "23rem",
                                }}
                            >
                                <Checkbox
                                    style={{
                                        display: "inline-block",
                                        width: "20rem",
                                        marginLeft: 80,
                                    }}
                                    id="id_IS_CURR_CHANGE"
                                    checked={changeCheckBoxVal(
                                        dataEDT_KSV_PO_MRP1.IS_CURR_CHANGE,
                                    )}
                                    onChange={(e) =>
                                        onCheckboxChangeEDT_KSV_PO_MRP1_IS_CURR_CHANGE(
                                            e,
                                            "IS_CURR_CHANGE",
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
                            <p style={{ width: "8rem", display: "inline-block", }}>.</p>
                            <div
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "23rem",
                                }}
                            >
                                <Dropdown
                                    id="id_CURR_CD"
                                    value={dataEDT_KSV_PO_MRP1_CURR_CD}
                                    onChange={(e) =>
                                        onDropdownChangeEDT_KSV_PO_MRP1_CURR_CD(
                                            e,
                                            "CURR_CD",
                                        )
                                    }
                                    options={datasEDT_KSV_PO_MRP1_CURR_CD}
                                    optionLabel="CURR_TYPE"
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
                            <p style={{ width: "8rem", display: "inline-block", }}>Price</p>
                            <InputText
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "23rem",
                                }}
                                id="id_PRICE"
                                value={dataEDT_KSV_PO_MRP1.PRICE}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_PO_MRP1_PRICE(
                                        e,
                                        "PRICE",
                                    )
                                }
                            />
                        </span>
                    </div>

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

export default React.memo(S0409_MATL_PRICE_CHECKIN_PO, comparisonFn);
