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
import { ServiceS020502_PI_ORDER_ADD } from "../service/service_biz/ServiceS020502_PI_ORDER_ADD";

// import './page_common.scss';

const emptyKCD_CODE = {
    id: 0,
    CD_GROUP: "",
    CD_CODE: "",
    CD_NAME: "",
    CD_FLAG: "",
};

const emptyQRY_KSV_ORDER_PIMEM = {
    BUYER_CD: "",
    PO_CD: "",
    ORDER_CD: "",
    REF_ORDER_NO: "",
    STYLE_CD: "",
};

const emptyTBL_KSV_ORDER_PIMEM = {
    id: 0,
    BUYER_NAME: "",
    BUYER_CD: "",
    REF_ORDER_NO: "",
    ORDER_CD: "",
    STYLE_CD: "",
    STYLE_NAME: "",
    QTY: "",
    PRICE: "",
    CURR_CD: "",
};

const S020502_PI_ORDER_ADD = () => {
    const serviceLibRef = useRef(null);
    if (!serviceLibRef.current) {
        serviceLibRef.current = new ServiceLib();
        serviceLibRef.current.loginConfirm();
    }
    const serviceLib = serviceLibRef.current;
    const serviceS020502_PI_ORDER_ADDRef = useRef(null);
    if (!serviceS020502_PI_ORDER_ADDRef.current) serviceS020502_PI_ORDER_ADDRef.current = new ServiceS020502_PI_ORDER_ADD();
    const serviceS020502_PI_ORDER_ADD = serviceS020502_PI_ORDER_ADDRef.current;

    const toast = useRef(null);

    /* splitter 관련 */
    const [styleVal, setStyleVal] = useState({ width: "65vw" });

    /* QRY KSV_ORDER_PIMEM*/
    const [dataQRY_KSV_ORDER_PIMEM, setDataQRY_KSV_ORDER_PIMEM] = useState(
        emptyQRY_KSV_ORDER_PIMEM,
    );

    const onInputChangeQRY_KSV_ORDER_PIMEM_BUYER_CD = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_ORDER_PIMEM = { ...dataQRY_KSV_ORDER_PIMEM };

        let tTypeVal = _dataQRY_KSV_ORDER_PIMEM[`${name}`];
        if (typeof tTypeVal === "string")
            _dataQRY_KSV_ORDER_PIMEM[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_ORDER_PIMEM[`${name}`] = parseInt(val);

        setDataQRY_KSV_ORDER_PIMEM(_dataQRY_KSV_ORDER_PIMEM);
    };

    const onInputChangeQRY_KSV_ORDER_PIMEM_PO_CD = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_ORDER_PIMEM = { ...dataQRY_KSV_ORDER_PIMEM };

        let tTypeVal = _dataQRY_KSV_ORDER_PIMEM[`${name}`];
        if (typeof tTypeVal === "string")
            _dataQRY_KSV_ORDER_PIMEM[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_ORDER_PIMEM[`${name}`] = parseInt(val);

        setDataQRY_KSV_ORDER_PIMEM(_dataQRY_KSV_ORDER_PIMEM);
    };

    const onInputChangeQRY_KSV_ORDER_PIMEM_ORDER_CD = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_ORDER_PIMEM = { ...dataQRY_KSV_ORDER_PIMEM };

        let tTypeVal = _dataQRY_KSV_ORDER_PIMEM[`${name}`];
        if (typeof tTypeVal === "string")
            _dataQRY_KSV_ORDER_PIMEM[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_ORDER_PIMEM[`${name}`] = parseInt(val);

        setDataQRY_KSV_ORDER_PIMEM(_dataQRY_KSV_ORDER_PIMEM);
    };

    const onInputChangeQRY_KSV_ORDER_PIMEM_REF_ORDER_NO = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_ORDER_PIMEM = { ...dataQRY_KSV_ORDER_PIMEM };

        let tTypeVal = _dataQRY_KSV_ORDER_PIMEM[`${name}`];
        if (typeof tTypeVal === "string")
            _dataQRY_KSV_ORDER_PIMEM[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_ORDER_PIMEM[`${name}`] = parseInt(val);

        setDataQRY_KSV_ORDER_PIMEM(_dataQRY_KSV_ORDER_PIMEM);
    };

    const onInputChangeQRY_KSV_ORDER_PIMEM_STYLE_CD = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_ORDER_PIMEM = { ...dataQRY_KSV_ORDER_PIMEM };

        let tTypeVal = _dataQRY_KSV_ORDER_PIMEM[`${name}`];
        if (typeof tTypeVal === "string")
            _dataQRY_KSV_ORDER_PIMEM[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_ORDER_PIMEM[`${name}`] = parseInt(val);

        setDataQRY_KSV_ORDER_PIMEM(_dataQRY_KSV_ORDER_PIMEM);
    };

    /* TABLE KSV_ORDER_PIMEM*/
    // DEFINE DATAGRID : TBL_KSV_ORDER_PIMEM
    const [datasTBL_KSV_ORDER_PIMEM, setDatasTBL_KSV_ORDER_PIMEM] = useState(
        [],
    );
    const dt_TBL_KSV_ORDER_PIMEM = useRef(null);
    const [dataTBL_KSV_ORDER_PIMEM, setDataTBL_KSV_ORDER_PIMEM] = useState(
        emptyTBL_KSV_ORDER_PIMEM,
    );
    const [selectedTBL_KSV_ORDER_PIMEM, setSelectedTBL_KSV_ORDER_PIMEM] =
        useState([]);
    const [
        flagSelectModeTBL_KSV_ORDER_PIMEM,
        setFlagSelectModeTBL_KSV_ORDER_PIMEM,
    ] = useState(false);

    // DATAGRID CODE : TBL_KSV_ORDER_PIMEM

    const onRowClick1TBL_KSV_ORDER_PIMEM = (argData0) => {
        var argData = {};

        if (typeof argData0.length !== "undefined") {
            argData = argData0[0];
        } else {
            argData = argData0;
        }

        let argTBL_KSV_ORDER_PIMEM = argData;

        setDataTBL_KSV_ORDER_PIMEM(argTBL_KSV_ORDER_PIMEM);
    };

    const onRowClickTBL_KSV_ORDER_PIMEM = (event) => {
        let argTBL_KSV_ORDER_PIMEM = event.data;
        if (flagSelectModeTBL_KSV_ORDER_PIMEM) return;

        // Service : NawooAll:mgrQueryTBL_KSV_ORDER_PIMEM
    };

    const searchTBL_KSV_ORDER_PIMEM = () => {
        clearSelectedTBL_KSV_ORDER_PIMEM();

        serviceS020502_PI_ORDER_ADD
            .mgrQueryTBL_KSV_ORDER_PIMEM(dataQRY_KSV_ORDER_PIMEM)
            .then((data) => {
                if (typeof data.graphQLErrors === "undefined") {
                    console.log(
                        "ServiceNawooAll.mgrQueryTBL_KSV_ORDER_PIMEM() call => " +
                            data.length,
                    );
                    setDatasTBL_KSV_ORDER_PIMEM(data);
                } else {
                    // var tStr = data.graphQLErrors[0].message;
                    console.log(
                        "ServiceNawooAll.mgrQueryTBL_KSV_ORDER_PIMEM()error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });

        // Service : NawooAll:mgrQueryTBL_KSV_ORDER_PIMEM
    };

    const clearSelectedTBL_KSV_ORDER_PIMEM = () => {
        setSelectedTBL_KSV_ORDER_PIMEM([]);
        setFlagSelectModeTBL_KSV_ORDER_PIMEM(false);
    };

    const exportExcelTBL_KSV_ORDER_PIMEM = () => {};

    useEffect(() => {}, []);

    const blankFn = () => {};

    // Support Area

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
                        height: "2rem",
                        display: "inline-block",
                        width: "26rem",
                    }}
                >
                    <p style={{ width: "7rem", display: "inline-block" }}>Buyer CD</p>
                    <InputText
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "18rem",
                        }}
                        id="id_BUYER_CD"
                        value={dataQRY_KSV_ORDER_PIMEM.BUYER_CD}
                        onChange={(e) =>
                            onInputChangeQRY_KSV_ORDER_PIMEM_BUYER_CD(
                                e,
                                "BUYER_CD",
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
                    <p style={{ width: "8rem", display: "inline-block" }}>PO CD</p>
                    <InputText
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "23rem",
                        }}
                        id="id_PO_CD"
                        value={dataQRY_KSV_ORDER_PIMEM.PO_CD}
                        onChange={(e) =>
                            onInputChangeQRY_KSV_ORDER_PIMEM_PO_CD(e, "PO_CD")
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
                    <p style={{ width: "8rem", display: "inline-block" }}>Order CD</p>
                    <InputText
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "23rem",
                        }}
                        id="id_ORDER_CD"
                        value={dataQRY_KSV_ORDER_PIMEM.ORDER_CD}
                        onChange={(e) =>
                            onInputChangeQRY_KSV_ORDER_PIMEM_ORDER_CD(
                                e,
                                "ORDER_CD",
                            )
                        }
                    />
                </span>
                <span
                    style={{
                        height: "2rem",
                        display: "inline-block",
                        width: "26rem",
                    }}
                >
                    <p style={{ width: "7rem", display: "inline-block" }}>Buyer PO</p>
                    <InputText
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "18rem",
                        }}
                        id="id_REF_ORDER_NO"
                        value={dataQRY_KSV_ORDER_PIMEM.REF_ORDER_NO}
                        onChange={(e) =>
                            onInputChangeQRY_KSV_ORDER_PIMEM_REF_ORDER_NO(
                                e,
                                "REF_ORDER_NO",
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
                    <p style={{ width: "8rem", display: "inline-block" }}>Style</p>
                    <InputText
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "15rem",
                        }}
                        id="id_STYLE_CD"
                        value={dataQRY_KSV_ORDER_PIMEM.STYLE_CD}
                        onChange={(e) =>
                            onInputChangeQRY_KSV_ORDER_PIMEM_STYLE_CD(
                                e,
                                "STYLE_CD",
                            )
                        }
                    />
                </span>
                <span style={{ display: "inline-block", marginLeft: "25rem" }}>
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
                        onClick={searchTBL_KSV_ORDER_PIMEM}
                    />

                    <Button
                        label="Excel"
                        style={{ height: "1.1rem" }}
                        icon="pi pi-upload"
                        className="p-button-text green"
                        onClick={exportExcelTBL_KSV_ORDER_PIMEM}
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
                    ref={dt_TBL_KSV_ORDER_PIMEM}
                    size="small"
                    value={datasTBL_KSV_ORDER_PIMEM}
                    resizableColumns
                    columnResizeMode="fit"
                    showGridlines
                    selectionMode="checkbox"
                    selection={selectedTBL_KSV_ORDER_PIMEM}
                    onSelectionChange={(e) => {
                        setFlagSelectModeTBL_KSV_ORDER_PIMEM(true);
                        setSelectedTBL_KSV_ORDER_PIMEM(e.value);
                        console.log(
                            "selected length:" +
                                selectedTBL_KSV_ORDER_PIMEM.length,
                        );
                        onRowClick1TBL_KSV_ORDER_PIMEM(e.value);
                    }}
                    onRowClick={onRowClickTBL_KSV_ORDER_PIMEM}
                    dataKey="id"
                    className="datatable-responsive"
                    virtualScrollerOptions={{ itemSize: 14 }}
                    emptyMessage=" "
                    // header={headerTBL_KSV_ORDER_PIMEM}
                    responsiveLayout="scroll"
                    scrollable
                    scrollHeight="28rem"
                >
                    <AFColumn field="BUYER_NAME" headerClassName="t-header" header="Buyer Name" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="BUYER_CD" headerClassName="t-header" header="Buyer CD" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="REF_ORDER_NO" headerClassName="t-header" header="Buyer PO" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="ORDER_CD" headerClassName="t-header" header="Order CD" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="STYLE_CD" headerClassName="t-header" header="Style CD" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="STYLE_NAME" headerClassName="t-header" header="Style Name" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="QTY" headerClassName="t-header" header="Qty" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="PRICE" headerClassName="t-header" header="Price" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="CURR_CD" headerClassName="t-header" header="Curr" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
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

export default React.memo(S020502_PI_ORDER_ADD, comparisonFn);
