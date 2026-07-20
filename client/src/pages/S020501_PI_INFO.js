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
import { ServiceS020501_PI_INFO } from "../service/service_biz/ServiceS020501_PI_INFO";

// import './page_common.scss';

const emptyKCD_CODE = {
    id: 0,
    CD_GROUP: "",
    CD_CODE: "",
    CD_NAME: "",
    CD_FLAG: "",
};

const emptyTBL_KSV_ORDER_PIMST = {
    id: 0,
    REF_ORDER_NO: "",
    ORDER_CD: "",
    STYLE_NAME: "",
    TOT_CNT: "",
    UNIT: "",
    TERM: "",
    UNIT_PRICE: "",
    AMOUNT: "",
    CURR_CD: "",
    ETD: "",
};

const emptyEDT_KSV_ORDER_PIMST = {
    PI_CD: "",
    REG_DATETIME: "",
    REG_USER: "",
    C_D: "",
    LOADING_PORT: "",
    TOLENCE: "",
    DESTINATION: "",
    PARTIAl_SHIP: "",
    TRANSPORT: "",
};

const S020501_PI_INFO = () => {
    const serviceLibRef = useRef(null);
    if (!serviceLibRef.current) {
        serviceLibRef.current = new ServiceLib();
        serviceLibRef.current.loginConfirm();
    }
    const serviceLib = serviceLibRef.current;
    const serviceS020501_PI_INFORef = useRef(null);
    if (!serviceS020501_PI_INFORef.current) serviceS020501_PI_INFORef.current = new ServiceS020501_PI_INFO();
    const serviceS020501_PI_INFO = serviceS020501_PI_INFORef.current;

    const toast = useRef(null);

    /* splitter 관련 */
    const [styleVal, setStyleVal] = useState({ width: "65vw" });

    /*TABLE KSV_ORDER_PIMST*/
    // DEFINE DATAGRID : TBL_KSV_ORDER_PIMST
    const [datasTBL_KSV_ORDER_PIMST, setDatasTBL_KSV_ORDER_PIMST] = useState(
        [],
    );
    const dt_TBL_KSV_ORDER_PIMST = useRef(null);
    const [dataTBL_KSV_ORDER_PIMST, setDataTBL_KSV_ORDER_PIMST] = useState(
        emptyTBL_KSV_ORDER_PIMST,
    );
    const [selectedTBL_KSV_ORDER_PIMST, setSelectedTBL_KSV_ORDER_PIMST] =
        useState([]);
    const [
        flagSelectModeTBL_KSV_ORDER_PIMST,
        setFlagSelectModeTBL_KSV_ORDER_PIMST,
    ] = useState(false);

    // DATAGRID CODE : TBL_KSV_ORDER_PIMST

    const onRowClick1TBL_KSV_ORDER_PIMST = (argData0) => {
        var argData = {};

        if (typeof argData0.length !== "undefined") {
            argData = argData0[0];
        } else {
            argData = argData0;
        }

        let argTBL_KSV_ORDER_PIMST = argData;

        setDataTBL_KSV_ORDER_PIMST(argTBL_KSV_ORDER_PIMST);
    };

    const onRowClickTBL_KSV_ORDER_PIMST = (event) => {
        let argTBL_KSV_ORDER_PIMST = event.data;
        if (flagSelectModeTBL_KSV_ORDER_PIMST) return;

        // Service : NawooAll:mgrQueryTBL_KSV_ORDER_PIMST
    };

    /* EDIT KSV_ORDER_PIMST */
    const [datasEDT_KSV_ORDER_PIMST, setDatasEDT_KSV_ORDER_PIMST] = useState(
        [],
    );
    const [dataEDT_KSV_ORDER_PIMST, setDataEDT_KSV_ORDER_PIMST] = useState(
        emptyEDT_KSV_ORDER_PIMST,
    );

    const onInputChangeEDT_KSV_ORDER_PIMST_PI_CD = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_ORDER_PIMST = { ...dataEDT_KSV_ORDER_PIMST };

        let tTypeVal = _dataEDT_KSV_ORDER_PIMST[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_ORDER_PIMST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_ORDER_PIMST[`${name}`] = parseInt(val);

        setDataEDT_KSV_ORDER_PIMST(_dataEDT_KSV_ORDER_PIMST);
    };

    const onCalChangeEDT_KSV_ORDER_PIMST_REG_DATETIME = (e, name) => {
        let val1 = e.value || "";
        let val = "";
        if (val1 === "") {
            val = "";
        } else {
            val = getDateVal(val1);
        }

        let _dataEDT_KSV_ORDER_PIMST = { ...dataEDT_KSV_ORDER_PIMST };
        _dataEDT_KSV_ORDER_PIMST[`${name}`] = val;
        setDataEDT_KSV_ORDER_PIMST(_dataEDT_KSV_ORDER_PIMST);
    };

    const onInputChangeEDT_KSV_ORDER_PIMST_REG_USER = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_ORDER_PIMST = { ...dataEDT_KSV_ORDER_PIMST };

        let tTypeVal = _dataEDT_KSV_ORDER_PIMST[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_ORDER_PIMST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_ORDER_PIMST[`${name}`] = parseInt(val);

        setDataEDT_KSV_ORDER_PIMST(_dataEDT_KSV_ORDER_PIMST);
    };

    const [datasEDT_KSV_ORDER_PIMST_C_D, setDatasEDT_KSV_ORDER_PIMST_C_D] =
        useState([]);
    const [dataEDT_KSV_ORDER_PIMST_C_D, setDataEDT_KSV_ORDER_PIMST_C_D] =
        useState({});

    const onDropdownChangeEDT_KSV_ORDER_PIMST_C_D = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataEDT_KSV_ORDER_PIMST = { ...dataEDT_KSV_ORDER_PIMST };

        let tTypeVal = _dataEDT_KSV_ORDER_PIMST[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_KSV_ORDER_PIMST[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_KSV_ORDER_PIMST[`${name}`] = parseInt(val);
        }

        setDataEDT_KSV_ORDER_PIMST(_dataEDT_KSV_ORDER_PIMST);
        setDataEDT_KSV_ORDER_PIMST_C_D(e.value);
    };

    const onInputChangeEDT_KSV_ORDER_PIMST_LOADING_PORT = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_ORDER_PIMST = { ...dataEDT_KSV_ORDER_PIMST };

        let tTypeVal = _dataEDT_KSV_ORDER_PIMST[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_ORDER_PIMST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_ORDER_PIMST[`${name}`] = parseInt(val);

        setDataEDT_KSV_ORDER_PIMST(_dataEDT_KSV_ORDER_PIMST);
    };

    const onInputChangeEDT_KSV_ORDER_PIMST_TOLENCE = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_ORDER_PIMST = { ...dataEDT_KSV_ORDER_PIMST };

        let tTypeVal = _dataEDT_KSV_ORDER_PIMST[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_ORDER_PIMST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_ORDER_PIMST[`${name}`] = parseInt(val);

        setDataEDT_KSV_ORDER_PIMST(_dataEDT_KSV_ORDER_PIMST);
    };

    const onInputChangeEDT_KSV_ORDER_PIMST_DESTINATION = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_ORDER_PIMST = { ...dataEDT_KSV_ORDER_PIMST };

        let tTypeVal = _dataEDT_KSV_ORDER_PIMST[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_ORDER_PIMST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_ORDER_PIMST[`${name}`] = parseInt(val);

        setDataEDT_KSV_ORDER_PIMST(_dataEDT_KSV_ORDER_PIMST);
    };

    const onInputChangeEDT_KSV_ORDER_PIMST_PARTIAl_SHIP = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_ORDER_PIMST = { ...dataEDT_KSV_ORDER_PIMST };

        let tTypeVal = _dataEDT_KSV_ORDER_PIMST[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_ORDER_PIMST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_ORDER_PIMST[`${name}`] = parseInt(val);

        setDataEDT_KSV_ORDER_PIMST(_dataEDT_KSV_ORDER_PIMST);
    };

    const [
        datasEDT_KSV_ORDER_PIMST_TRANSPORT,
        setDatasEDT_KSV_ORDER_PIMST_TRANSPORT,
    ] = useState([]);
    const [
        dataEDT_KSV_ORDER_PIMST_TRANSPORT,
        setDataEDT_KSV_ORDER_PIMST_TRANSPORT,
    ] = useState({});

    const onDropdownChangeEDT_KSV_ORDER_PIMST_TRANSPORT = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataEDT_KSV_ORDER_PIMST = { ...dataEDT_KSV_ORDER_PIMST };

        let tTypeVal = _dataEDT_KSV_ORDER_PIMST[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_KSV_ORDER_PIMST[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_KSV_ORDER_PIMST[`${name}`] = parseInt(val);
        }

        setDataEDT_KSV_ORDER_PIMST(_dataEDT_KSV_ORDER_PIMST);
        setDataEDT_KSV_ORDER_PIMST_TRANSPORT(e.value);
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
                    height: "1rem",
                }}
            ></div>

            <div
                style={{
                    marginLeft: "1rem",
                    marginTop: "1rem",
                    width: "99rem",
                    height: "28rem",
                }}
            >
                <AFDataTable preventUnrelatedRerender
                    ref={dt_TBL_KSV_ORDER_PIMST}
                    size="small"
                    value={datasTBL_KSV_ORDER_PIMST}
                    resizableColumns
                    columnResizeMode="fit"
                    showGridlines
                    selectionMode="checkbox"
                    selection={selectedTBL_KSV_ORDER_PIMST}
                    onSelectionChange={(e) => {
                        setFlagSelectModeTBL_KSV_ORDER_PIMST(true);
                        setSelectedTBL_KSV_ORDER_PIMST(e.value);
                        console.log(
                            "selected length:" +
                                selectedTBL_KSV_ORDER_PIMST.length,
                        );
                        onRowClick1TBL_KSV_ORDER_PIMST(e.value);
                    }}
                    onRowClick={onRowClickTBL_KSV_ORDER_PIMST}
                    dataKey="id"
                    className="datatable-responsive"
                    virtualScrollerOptions={{ itemSize: 13 }}
                    emptyMessage=" "
                    // header={headerTBL_KSV_ORDER_PIMST}
                    responsiveLayout="scroll"
                    scrollable
                    scrollHeight="26rem"
                >
                    <AFColumn field="REF_ORDER_NO" headerClassName="t-header" header="BUY" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="ORDER_CD" headerClassName="t-header" header="Order#" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="STYLE_NAME" headerClassName="t-header" header="Style" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="TOT_CNT" headerClassName="t-header" header="Qty" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="UNIT" headerClassName="t-header" header="Unit" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="TERM" headerClassName="t-header" header="Term" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="UNIT_PRICE" headerClassName="t-header" header="U.Price" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="AMOUNT" headerClassName="t-header" header="Amount" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="CURR_CD" headerClassName="t-header" header="Curr" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="ETD" headerClassName="t-header" header="ETD" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                </AFDataTable>
            </div>

            <Divider />
            <div style={{ width: "100rem", height: "25rem" }}>
                <div className="flex flex-row justify-content-start align-items-top">
                    <div style={{ width: "60rem", height: "25rem" }}>
                        <span
                            style={{
                                marginLeft: "0.5rem",
                                height: "2rem",
                                display: "inline-block",
                                width: "33rem",
                            }}
                        >
                            <p style={{ width: "8rem", display: "inline-block", }}>PI#</p>
                            <InputText
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "23rem",
                                }}
                                id="id_PI_CD"
                                value={dataEDT_KSV_ORDER_PIMST.PI_CD}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_ORDER_PIMST_PI_CD(
                                        e,
                                        "PI_CD",
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
                            <p style={{ width: "8rem", display: "inline-block", }}>Reg Date</p>
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
                                    id="id_REG_DATETIME"
                                    value={changeDateVal(
                                        dataEDT_KSV_ORDER_PIMST.REG_DATETIME,
                                    )}
                                    onChange={(e) =>
                                        onCalChangeEDT_KSV_ORDER_PIMST_REG_DATETIME(
                                            e,
                                            "REG_DATETIME",
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
                            <p style={{ width: "8rem", display: "inline-block", }}>Reg USER</p>
                            <InputText
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "23rem",
                                }}
                                id="id_REG_USER"
                                value={dataEDT_KSV_ORDER_PIMST.REG_USER}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_ORDER_PIMST_REG_USER(
                                        e,
                                        "REG_USER",
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
                            <p style={{ width: "8rem", display: "inline-block", }}>C/D</p>
                            <div
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "23rem",
                                }}
                            >
                                <Dropdown
                                    id="id_C_D"
                                    value={dataEDT_KSV_ORDER_PIMST_C_D}
                                    onChange={(e) =>
                                        onDropdownChangeEDT_KSV_ORDER_PIMST_C_D(
                                            e,
                                            "C_D",
                                        )
                                    }
                                    options={datasEDT_KSV_ORDER_PIMST_C_D}
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
                                width: "33rem",
                            }}
                        >
                            <p style={{ width: "8rem", display: "inline-block", }}>Loading Port</p>
                            <InputText
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "23rem",
                                }}
                                id="id_LOADING_PORT"
                                value={dataEDT_KSV_ORDER_PIMST.LOADING_PORT}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_ORDER_PIMST_LOADING_PORT(
                                        e,
                                        "LOADING_PORT",
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
                            <p style={{ width: "8rem", display: "inline-block", }}>Tolenrance</p>
                            <InputText
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "23rem",
                                }}
                                id="id_TOLENCE"
                                value={dataEDT_KSV_ORDER_PIMST.TOLENCE}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_ORDER_PIMST_TOLENCE(
                                        e,
                                        "TOLENCE",
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
                            <p style={{ width: "8rem", display: "inline-block", }}>Destination</p>
                            <InputText
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "23rem",
                                }}
                                id="id_DESTINATION"
                                value={dataEDT_KSV_ORDER_PIMST.DESTINATION}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_ORDER_PIMST_DESTINATION(
                                        e,
                                        "DESTINATION",
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
                            <p style={{ width: "8rem", display: "inline-block", }}>Partial Ship</p>
                            <InputText
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "23rem",
                                }}
                                id="id_PARTIAl_SHIP"
                                value={dataEDT_KSV_ORDER_PIMST.PARTIAl_SHIP}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_ORDER_PIMST_PARTIAl_SHIP(
                                        e,
                                        "PARTIAl_SHIP",
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
                            <p style={{ width: "8rem", display: "inline-block", }}>Transport</p>
                            <div
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "23rem",
                                }}
                            >
                                <Dropdown
                                    id="id_TRANSPORT"
                                    value={dataEDT_KSV_ORDER_PIMST_TRANSPORT}
                                    onChange={(e) =>
                                        onDropdownChangeEDT_KSV_ORDER_PIMST_TRANSPORT(
                                            e,
                                            "TRANSPORT",
                                        )
                                    }
                                    options={datasEDT_KSV_ORDER_PIMST_TRANSPORT}
                                    optionLabel="CD_NAME"
                                    placeholder=""
                                    editable
                                ></Dropdown>
                            </div>
                        </span>
                    </div>

                    <div style={{ width: "40rem", height: "30rem" }}></div>
                </div>
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
            <Toast ref={toast} />
        </div>
    );
};

const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(S020501_PI_INFO, comparisonFn);
