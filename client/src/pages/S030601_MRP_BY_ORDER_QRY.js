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
// import { ServiceS030601_MRP_BY_ORDER_QRY } from '../service/service_biz/ServiceS030601_MRP_BY_ORDER_QRY';

import "./page_common.scss";

const emptyKCD_CODE = {
    id: 0,
    CD_GROUP: "",
    CD_CODE: "",
    CD_NAME: "",
    CD_FLAG: "",
};

const emptyQRY_KSV_ORDER_MST = {
    STYLE_NAME: "",
    STYLE_CD: "",
};

const emptyTBL_KSV_ORDER_MST = {
    id: 0,
    PO_CD: "",
    ORDER_CD: "",
    ORDER_STATUS_NAME: "",
    ORDER_STATUS: "",
};

const S030601_MRP_BY_ORDER_QRY = () => {
    const serviceLibRef = useRef(null);
    if (!serviceLibRef.current) {
        serviceLibRef.current = new ServiceLib();
        serviceLibRef.current.loginConfirm();
    }
    const serviceLib = serviceLibRef.current;
    // const serviceS030601_MRP_BY_ORDER_QRY = new ServiceS030601_MRP_BY_ORDER_QRY();

    const toast = useRef(null);

    /* splitter 관련 */
    const [styleVal, setStyleVal] = useState({ width: "65vw" });

    /*QRY KSV_ORDER_MST */

    const [dataQRY_KSV_ORDER_MST, setDataQRY_KSV_ORDER_MST] = useState(
        emptyQRY_KSV_ORDER_MST,
    );

    const onInputChangeQRY_KSV_ORDER_MST_STYLE_NAME = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_ORDER_MST = { ...dataQRY_KSV_ORDER_MST };

        let tTypeVal = _dataQRY_KSV_ORDER_MST[`${name}`];
        if (typeof tTypeVal === "string")
            _dataQRY_KSV_ORDER_MST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_ORDER_MST[`${name}`] = parseInt(val);

        setDataQRY_KSV_ORDER_MST(_dataQRY_KSV_ORDER_MST);
    };

    const [
        datasQRY_KSV_ORDER_MST_STYLE_CD,
        setDatasQRY_KSV_ORDER_MST_STYLE_CD,
    ] = useState([]);
    const [dataQRY_KSV_ORDER_MST_STYLE_CD, setDataQRY_KSV_ORDER_MST_STYLE_CD] =
        useState({});

    const onDropdownChangeQRY_KSV_ORDER_MST_STYLE_CD = (e, name) => {
        let val = (e.value && e.value.STYLE_CD) || "";

        let _dataQRY_KSV_ORDER_MST = { ...dataQRY_KSV_ORDER_MST };

        let tTypeVal = _dataQRY_KSV_ORDER_MST[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_ORDER_MST[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_ORDER_MST[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_ORDER_MST(_dataQRY_KSV_ORDER_MST);
        setDataQRY_KSV_ORDER_MST_STYLE_CD(e.value);
    };

    /*TABLE KSV_ORDER_MST */
    // DEFINE DATAGRID : TBL_KSV_ORDER_MST
    const [datasTBL_KSV_ORDER_MST, setDatasTBL_KSV_ORDER_MST] = useState([]);
    const dt_TBL_KSV_ORDER_MST = useRef(null);
    const [dataTBL_KSV_ORDER_MST, setDataTBL_KSV_ORDER_MST] = useState(
        emptyTBL_KSV_ORDER_MST,
    );
    const [selectedTBL_KSV_ORDER_MST, setSelectedTBL_KSV_ORDER_MST] = useState(
        [],
    );
    const [
        flagSelectModeTBL_KSV_ORDER_MST,
        setFlagSelectModeTBL_KSV_ORDER_MST,
    ] = useState(false);

    // DATAGRID CODE : TBL_KSV_ORDER_MST

    const onRowClick1TBL_KSV_ORDER_MST = (argData0) => {
        var argData = {};

        if (typeof argData0.length !== "undefined") {
            argData = argData0[0];
        } else {
            argData = argData0;
        }

        let argTBL_KSV_ORDER_MST = argData;

        setDataTBL_KSV_ORDER_MST(argTBL_KSV_ORDER_MST);
    };

    const onRowClickTBL_KSV_ORDER_MST = (event) => {
        let argTBL_KSV_ORDER_MST = event.data;
        if (flagSelectModeTBL_KSV_ORDER_MST) return;

        // Service : NawooAll:mgrQueryTBL_KSV_ORDER_MST
    };

    const searchTBL_KSV_ORDER_MST = () => {
        clearSelectedTBL_KSV_ORDER_MST();

        // serviceS030601_MRP_BY_ORDER_QRY.mgrQueryTBL_KSV_ORDER_MST(dataQRY_KSV_ORDER_MST).then(data => {
        //     if (typeof data.graphQLErrors === 'undefined') {
        //         console.log("ServiceNawooAll.mgrQueryTBL_KSV_ORDER_MST() call => " + data.length);
        //         setDatasTBL_KSV_ORDER_MST(data);
        //     } else {
        //         // var tStr = data.graphQLErrors[0].message;
        //         console.log("ServiceNawooAll.mgrQueryTBL_KSV_ORDER_MST()error => " + JSON.stringify(data.graphQLErrors));
        //
        //     }
        // });

        // Service : NawooAll:mgrQueryTBL_KSV_ORDER_MST
    };

    const clearSelectedTBL_KSV_ORDER_MST = () => {
        setSelectedTBL_KSV_ORDER_MST([]);
        setFlagSelectModeTBL_KSV_ORDER_MST(false);
    };

    const exportExcelTBL_KSV_ORDER_MST = () => {
        import("xlsx").then((xlsx) => {
            const worksheet = xlsx.utils.json_to_sheet(datasTBL_KSV_ORDER_MST);
            const workbook = {
                Sheets: { data: worksheet },
                SheetNames: ["data"],
            };
            const excelBuffer = xlsx.write(workbook, {
                bookType: "xlsx",
                type: "array",
            });
            saveAsExcelFileTBL_KSV_ORDER_MST(excelBuffer, "스타일목록");
        });
    };

    const saveAsExcelFileTBL_KSV_ORDER_MST = (buffer, fileName) => {
        import("file-saver").then((module) => {
            if (module && module.default) {
                let EXCEL_TYPE =
                    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
                let EXCEL_EXTENSION = ".xlsx";
                const data = new Blob([buffer], {
                    type: EXCEL_TYPE,
                });
                module.default.saveAs(
                    data,
                    fileName +
                        "_export_" +
                        new Date().getTime() +
                        EXCEL_EXTENSION,
                );
            }
        });
    };
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
                    <p style={{ width: "8rem", display: "inline-block" }}>Style Name</p>
                    <InputText
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "23rem",
                        }}
                        id="id_STYLE_NAME"
                        value={dataQRY_KSV_ORDER_MST.STYLE_NAME}
                        onChange={(e) =>
                            onInputChangeQRY_KSV_ORDER_MST_STYLE_NAME(
                                e,
                                "STYLE_NAME",
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
                    <p style={{ width: "8rem", display: "inline-block" }}>Style CD</p>
                    <div
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "23rem",
                        }}
                    >
                        <Dropdown
                            id="id_STYLE_CD"
                            value={dataQRY_KSV_ORDER_MST_STYLE_CD}
                            onChange={(e) =>
                                onDropdownChangeQRY_KSV_ORDER_MST_STYLE_CD(
                                    e,
                                    "STYLE_CD",
                                )
                            }
                            options={datasQRY_KSV_ORDER_MST_STYLE_CD}
                            optionLabel="STYLE_NAME"
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
                        onClick={searchTBL_KSV_ORDER_MST}
                    />

                    <Button
                        label="Excel"
                        style={{ height: "1.1rem", color: "green" }}
                        icon="pi pi-upload"
                        className="p-button-text"
                        onClick={exportExcelTBL_KSV_ORDER_MST}
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
                    ref={dt_TBL_KSV_ORDER_MST}
                    size="small"
                    value={datasTBL_KSV_ORDER_MST}
                    resizableColumns
                    columnResizeMode="fit"
                    showGridlines
                    selectionMode="checkbox"
                    selection={selectedTBL_KSV_ORDER_MST}
                    onSelectionChange={(e) => {
                        setFlagSelectModeTBL_KSV_ORDER_MST(true);
                        setSelectedTBL_KSV_ORDER_MST(e.value);
                        console.log(
                            "selected length:" +
                                selectedTBL_KSV_ORDER_MST.length,
                        );
                        onRowClick1TBL_KSV_ORDER_MST(e.value);
                    }}
                    onRowClick={onRowClickTBL_KSV_ORDER_MST}
                    dataKey="id"
                    className="datatable-responsive"
                    virtualScrollerOptions={{ itemSize: 9 }}
                    emptyMessage=" "
                    //header={headerTBL_KSV_ORDER_MST}
                    responsiveLayout="scroll"
                    scrollable
                    scrollHeight="18rem"
                >
                    <AFColumn field="PO_CD" header="PO" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="ORDER_CD" header="Order" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="ORDER_STATUS_NAME" header="Order Status" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="ORDER_STATUS" header="Order Status Cd" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
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

export default React.memo(S030601_MRP_BY_ORDER_QRY, comparisonFn);
