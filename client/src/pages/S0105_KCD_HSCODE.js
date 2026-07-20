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
import { Divider } from "primereact/divider";
import { Splitter, SplitterPanel } from "primereact/splitter";
import { ScrollPanel } from "primereact/scrollpanel";
import { TabView, TabPanel } from "primereact/tabview";

import { ServiceLib } from "../service/service_lib/ServiceLib";
import { ServiceS0105_KCD_HSCODE } from "../service/service_biz/ServiceS0105_KCD_HSCODE";

const emptyKCD_CODE = {
    id: 0,
    CD_GROUP: "",
    CD_CODE: "",
    CD_NAME: "",
    CD_FLAG: "",
};

const emptyQRY_KCD_HSCODE = {
    HS_CD: "",
    HS_NAME: "",
};

const emptyTBL_KCD_HSCODE = {
    id: -1,
    HS_NO: "",
    HS_CD: "",
    HS_NAME: "",
};

const emptyEDT_KCD_HSCODE = {
    id: -1,
    HS_NO: "",
    HS_CD: "",
    HS_NAME: "",
};

const S0105_KCD_HSCODE = () => {
    const serviceLibRef = useRef(null);
    if (!serviceLibRef.current) {
        serviceLibRef.current = new ServiceLib();
        serviceLibRef.current.loginConfirm();
    }
    const serviceLib = serviceLibRef.current;
    const serviceS0105_KCD_HSCODERef = useRef(null);
    if (!serviceS0105_KCD_HSCODERef.current) serviceS0105_KCD_HSCODERef.current = new ServiceS0105_KCD_HSCODE();
    const serviceS0105_KCD_HSCODE = serviceS0105_KCD_HSCODERef.current;

    const toast = useRef(null);

    const [loading, setLoading] = useState(false);

    /* splitter 관련 */
    const [styleVal, setStyleVal] = useState({ width: "65vw" });

    /*QRY KCD_HSCODE */
    const [dataQRY_KCD_HSCODE, setDataQRY_KCD_HSCODE] =
        useState(emptyQRY_KCD_HSCODE);

    const onInputChangeQRY_KCD_HSCODE_HS_CD = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KCD_HSCODE = { ...dataQRY_KCD_HSCODE };

        let tTypeVal = _dataQRY_KCD_HSCODE[`${name}`];
        if (typeof tTypeVal === "string") _dataQRY_KCD_HSCODE[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KCD_HSCODE[`${name}`] = parseInt(val);

        setDataQRY_KCD_HSCODE(_dataQRY_KCD_HSCODE);
    };

    const onInputChangeQRY_KCD_HSCODE_HS_NAME = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KCD_HSCODE = { ...dataQRY_KCD_HSCODE };

        let tTypeVal = _dataQRY_KCD_HSCODE[`${name}`];
        if (typeof tTypeVal === "string") _dataQRY_KCD_HSCODE[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KCD_HSCODE[`${name}`] = parseInt(val);

        setDataQRY_KCD_HSCODE(_dataQRY_KCD_HSCODE);
    };

    /* TABLE KCD_HSCODE */
    // DEFINE DATAGRID : TBL_KCD_HSCODE
    const [datasTBL_KCD_HSCODE, setDatasTBL_KCD_HSCODE] = useState([]);
    const dt_TBL_KCD_HSCODE = useRef(null);
    const [dataTBL_KCD_HSCODE, setDataTBL_KCD_HSCODE] =
        useState(emptyTBL_KCD_HSCODE);
    const [selectedTBL_KCD_HSCODE, setSelectedTBL_KCD_HSCODE] = useState([]);
    const [flagSelectModeTBL_KCD_HSCODE, setFlagSelectModeTBL_KCD_HSCODE] =
        useState(false);

    // DATAGRID CODE : TBL_KCD_HSCODE

    const editTBL_KCD_HSCODE = (argData) => {
        datasetEDT_KCD_HSCODE(argData);
    };

    const onRowClick1TBL_KCD_HSCODE = (argData0) => {
        var argData = {};

        if (typeof argData0.length !== "undefined") {
            argData = argData0[0];
        } else {
            argData = argData0;
        }

        let argTBL_KCD_HSCODE = argData;
        editTBL_KCD_HSCODE(argTBL_KCD_HSCODE);
        setDataTBL_KCD_HSCODE(argTBL_KCD_HSCODE);
    };

    const onRowClickTBL_KCD_HSCODE = (event) => {
        let argTBL_KCD_HSCODE = event.data;
        if (flagSelectModeTBL_KCD_HSCODE) return;

        // Service : NawooAll:mgrQueryTBL_KCD_HSCODE
    };

    const searchTBL_KCD_HSCODE = () => {
        clearSelectedTBL_KCD_HSCODE();
        setLoading(true);

        serviceS0105_KCD_HSCODE
            .mgrQueryTBL_KCD_HSCODE(dataQRY_KCD_HSCODE)
            .then((data) => {
                if (typeof data.graphQLErrors === "undefined") {
                    console.log(
                        "ServiceNawooAll.mgrQueryTBL_KCD_HSCODE() call => " +
                            data.length,
                    );
                    setDatasTBL_KCD_HSCODE(data);
                    setLoading(false);
                } else {
                    // var tStr = data.graphQLErrors[0].message;
                    console.log(
                        "ServiceNawooAll.mgrQueryTBL_KCD_HSCODE()error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });

        // Service : NawooAll:mgrQueryTBL_KCD_HSCODE
    };

    const clearSelectedTBL_KCD_HSCODE = () => {
        setSelectedTBL_KCD_HSCODE([]);
        setFlagSelectModeTBL_KCD_HSCODE(false);
    };

    const exportExcelTBL_KCD_HSCODE = () => {
        import("xlsx").then((xlsx) => {
            const worksheet = xlsx.utils.json_to_sheet(datasTBL_KCD_HSCODE);
            const workbook = {
                Sheets: { data: worksheet },
                SheetNames: ["data"],
            };
            const excelBuffer = xlsx.write(workbook, {
                bookType: "xlsx",
                type: "array",
            });
            saveAsExcelFileTBL_KCD_HSCODE(excelBuffer, "HS Code 목록");
        });
    };

    const saveAsExcelFileTBL_KCD_HSCODE = (buffer, fileName) => {
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

    /**EDIT KCD_HSCODE */
    const [datasEDT_KCD_HSCODE, setDatasEDT_KCD_HSCODE] = useState([]);
    const [dataEDT_KCD_HSCODE, setDataEDT_KCD_HSCODE] =
        useState(emptyEDT_KCD_HSCODE);

    const datasetEDT_KCD_HSCODE = (argData) => {
        console.log(argData);
        var _argData = { ...dataEDT_KCD_HSCODE };
        _argData.HS_NO = argData.HS_NO;
        _argData.HS_CD = argData.HS_CD;
        _argData.HS_NAME = argData.HS_NAME;
        _argData.id = argData.id;

        setDataEDT_KCD_HSCODE(_argData);
    };

    const resetEDT_KCD_HSCODE = () => {
        setDataEDT_KCD_HSCODE(emptyEDT_KCD_HSCODE);
        // clearSelectedKCD_STYLE();
    };

    const saveEDT_KCD_HSCODE = () => {
        console.log(dataEDT_KCD_HSCODE.id);

        if (dataEDT_KCD_HSCODE.id <= 0) {
            saveEDT_KCD_HSCODE_INSERT();
        } else {
            saveEDT_KCD_HSCODE_UPDATE();
        }
    };

    const saveEDT_KCD_HSCODE_INSERT = () => {
        let _datasEDT_KCD_HSCODE = [...datasEDT_KCD_HSCODE];
        let _dataEDT_KCD_HSCODE = { ...dataEDT_KCD_HSCODE };

        if (typeof _dataEDT_KCD_HSCODE.__typename !== "undefined")
            delete _dataEDT_KCD_HSCODE.__typename;

        let tArray = [];
        tArray.push(_dataEDT_KCD_HSCODE);

        serviceS0105_KCD_HSCODE.mgrInsertEDT_KCD_HSCODE(tArray).then((data) => {
            console.log(data);
            if (typeof data.graphQLErrors === "undefined") {
                if (data.length > 0) {
                    alert(data[0].CODE);
                    if (data[0].CODE.includes("ERROR")) {
                    } else {
                        let _dataEDT_KCD_HSCODE = { ...dataEDT_KCD_HSCODE };
                        _dataEDT_KCD_HSCODE.HS_NO = data[0].CODE;
                        setDataEDT_KCD_HSCODE(_dataEDT_KCD_HSCODE);
                    }
                }
                // console.log("ServiceS0105_KCD_HSCODE.mgrInsertEDT_KCD_HSCODE() call => " + data.length);

                // Search
            } else {
                // var tStr = data.graphQLErrors[0].message;
                console.log(
                    "ServiceNawooAll.mgrInsertS0105_KCD_HSCODE( error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });
    };

    const saveEDT_KCD_HSCODE_UPDATE = () => {
        let _datasEDT_KCD_HSCODE = [...datasEDT_KCD_HSCODE];
        let _dataEDT_KCD_HSCODE = { ...dataEDT_KCD_HSCODE };

        if (typeof _dataEDT_KCD_HSCODE.__typename !== "undefined")
            delete _dataEDT_KCD_HSCODE.__typename;

        let tArray = [];
        tArray.push(_dataEDT_KCD_HSCODE);

        serviceS0105_KCD_HSCODE.mgrUpdateEDT_KCD_HSCODE(tArray).then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                console.log(
                    "ServiceS0105_KCD_HSCODE.mgrUpdateEDT_KCD_HSCODE() call => " +
                        data.length,
                );
                // Search
            } else {
                // var tStr = data.graphQLErrors[0].message;
                console.log(
                    "ServiceNawooAll.mgrUpdateS0105_KCD_HSCODE( error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });
    };

    const deleteEDT_KCD_HSCODE = () => {
        let _datasEDT_KCD_HSCODE = [...datasEDT_KCD_HSCODE];
        let _dataEDT_KCD_HSCODE = { ...dataEDT_KCD_HSCODE };

        if (typeof _dataEDT_KCD_HSCODE.__typename !== "undefined")
            delete _dataEDT_KCD_HSCODE.__typename;

        let tArray = [];
        tArray.push(_dataEDT_KCD_HSCODE);

        serviceS0105_KCD_HSCODE.mgrDeleteEDT_KCD_HSCODE(tArray).then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                console.log(
                    "ServiceS0105_KCD_HSCODE.mgrUpdateEDT_KCD_HSCODE() call => " +
                        data.length,
                );
                getData();
                // Search
            } else {
                // var tStr = data.graphQLErrors[0].message;
                console.log(
                    "ServiceNawooAll.mgrUpdateS0105_KCD_HSCODE( error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });
    };

    const onInputChangeEDT_KCD_HSCODE_HS_NO = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KCD_HSCODE = { ...dataEDT_KCD_HSCODE };

        let tTypeVal = _dataEDT_KCD_HSCODE[`${name}`];
        if (typeof tTypeVal === "string") _dataEDT_KCD_HSCODE[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KCD_HSCODE[`${name}`] = parseInt(val);

        setDataEDT_KCD_HSCODE(_dataEDT_KCD_HSCODE);
    };

    const onInputChangeEDT_KCD_HSCODE_HS_CD = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KCD_HSCODE = { ...dataEDT_KCD_HSCODE };

        let tTypeVal = _dataEDT_KCD_HSCODE[`${name}`];
        if (typeof tTypeVal === "string") _dataEDT_KCD_HSCODE[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KCD_HSCODE[`${name}`] = parseInt(val);

        setDataEDT_KCD_HSCODE(_dataEDT_KCD_HSCODE);
    };

    const onInputChangeEDT_KCD_HSCODE_HS_NAME = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KCD_HSCODE = { ...dataEDT_KCD_HSCODE };

        let tTypeVal = _dataEDT_KCD_HSCODE[`${name}`];
        if (typeof tTypeVal === "string") _dataEDT_KCD_HSCODE[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KCD_HSCODE[`${name}`] = parseInt(val);

        setDataEDT_KCD_HSCODE(_dataEDT_KCD_HSCODE);
    };

    useEffect(() => {
        // Effect
        setLoading(true);
        getData();
    }, []);

    const getData = () => {
        serviceS0105_KCD_HSCODE
            .mgrQueryTBL_KCD_HSCODE(dataQRY_KCD_HSCODE)
            .then((data) => {
                if (typeof data.graphQLErrors === "undefined") {
                    console.log(
                        "ServiceS0105_KCD_HSCODE.mgrQueryTBL_KCD_HSCODE call => " +
                            data.length,
                    );
                    setDatasTBL_KCD_HSCODE(data);
                    setLoading(false);
                } else {
                    console.log(
                        "serviceS0105_KCD_HSCODE.mgrQueryTBL_KCD_HSCODE error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });
    };

    // Support Area

    const onQryHSCodeKeyPress = (e) => {
        if (e.key === "Enter") {
            console.log("enter press here! ");
            searchTBL_KCD_HSCODE();
        }
    };

    return (
        <div className="af-div-main">
            <div
                className="af-div-first"
                style={{ width: "123rem", height: "3rem" }}
            >
                <div style={{ background: "white" }}>
                    <span
                        style={{
                            marginLeft: "0.5rem",
                            height: "3rem",
                            display: "inline-block",
                            width: "33rem",
                            marginTop: "0.75rem",
                        }}
                    >
                        <p style={{ width: "8rem", display: "inline-block" }}>HS Code</p>
                        <InputText
                            style={{
                                marginLeft: "0.5rem",
                                display: "inline-block",
                                width: "23rem",
                            }}
                            id="id_HS CD"
                            value={dataQRY_KCD_HSCODE.HS_CD}
                            onChange={(e) =>
                                onInputChangeQRY_KCD_HSCODE_HS_CD(e, "HS_CD")
                            }
                            onKeyPress={(e) => onQryHSCodeKeyPress(e)}
                        />
                    </span>
                    <span
                        style={{
                            marginLeft: "0.5rem",
                            height: "3rem",
                            display: "inline-block",
                            width: "33rem",
                        }}
                    >
                        <p style={{ width: "8rem", display: "inline-block" }}>HS Name</p>
                        <InputText
                            style={{
                                marginLeft: "0.5rem",
                                display: "inline-block",
                                width: "23rem",
                            }}
                            id="id_HS NAME"
                            value={dataQRY_KCD_HSCODE.HS_NAME}
                            onChange={(e) =>
                                onInputChangeQRY_KCD_HSCODE_HS_NAME(
                                    e,
                                    "HS_NAME",
                                )
                            }
                            onKeyPress={(e) => onQryHSCodeKeyPress(e)}
                        />
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
                            className="p-button-text"
                            size="small"
                            onClick={searchTBL_KCD_HSCODE}
                        />

                        <Button
                            label="Excel"
                            className="p-button-text green"
                            size="small"
                            onClick={exportExcelTBL_KCD_HSCODE}
                        />
                    </span>
                </div>
            </div>

            <div
                className="af-div-first"
                style={{ width: "123rem", height: "46rem", marginTop: "1rem" }}
            >
                <AFDataTable preventUnrelatedRerender
                    ref={dt_TBL_KCD_HSCODE}
                    size="small"
                    value={datasTBL_KCD_HSCODE}
                    tableStyle={{ tableLayout: "fixed" }}
                    resizableColumns
                    columnResizeMode="expand"
                    showGridlines
                    selectionMode="checkbox"
                    selection={selectedTBL_KCD_HSCODE}
                    loading={loading}
                    onSelectionChange={(e) => {
                        setFlagSelectModeTBL_KCD_HSCODE(true);
                        setSelectedTBL_KCD_HSCODE(e.value);
                        console.log(
                            "selected length:" + selectedTBL_KCD_HSCODE.length,
                        );
                        onRowClick1TBL_KCD_HSCODE(e.value);
                    }}
                    onRowClick={onRowClickTBL_KCD_HSCODE}
                    dataKey="id"
                    className="datatable-responsive"
                    virtualScrollerOptions={{ itemSize: 20 }}
                    emptyMessage=" " //header={headerTBL_KCD_HSCODE}
                    responsiveLayout="scroll"
                    scrollable
                    scrollHeight="500px"
                >
                    <AFColumn field="HS_NO" headerClassName="t-header" header="HS No" style={{ width: "5rem", flexBasis: "auto" }} headerStyle={{ height: "1.8rem" }} bodyStyle={{ height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="HS_CD" headerClassName="t-header" header="HS Code" style={{ width: "5rem", flexBasis: "auto" }} headerStyle={{ height: "1.8rem" }} bodyStyle={{ height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="HS_NAME" headerClassName="t-header" header="HS Name" style={{ width: "60rem", flexBasis: "auto" }} headerStyle={{ height: "1.8rem" }} bodyStyle={{ height: "1.8rem" }} ></AFColumn>
                </AFDataTable>
            </div>

            <div
                className="af-div-first"
                style={{ width: "123rem", height: "11rem" }}
            >
                <div className="flex flex-row justify-content-start align-items-top">
                    <div
                        style={{
                            width: "60rem",
                            height: "7rem",
                            marginTop: "0.5rem",
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
                            <p style={{ width: "8rem", display: "inline-block", }}>HS No</p>
                            <InputText
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "23rem",
                                }}
                                id="id_HS_NO"
                                value={dataEDT_KCD_HSCODE.HS_NO}
                                onChange={(e) =>
                                    onInputChangeEDT_KCD_HSCODE_HS_NO(
                                        e,
                                        "HS_NO",
                                    )
                                }
                                disabled
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
                            <p style={{ width: "8rem", display: "inline-block", }}>HS Code</p>
                            <InputText
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "23rem",
                                }}
                                id="id_HS_CODE"
                                value={dataEDT_KCD_HSCODE.HS_CD}
                                onChange={(e) =>
                                    onInputChangeEDT_KCD_HSCODE_HS_CD(
                                        e,
                                        "HS_CD",
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
                            <p style={{ width: "8rem", display: "inline-block", }}>HS Name</p>
                            <InputText
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "23rem",
                                }}
                                id="id_HS_NAME"
                                value={dataEDT_KCD_HSCODE.HS_NAME}
                                onChange={(e) =>
                                    onInputChangeEDT_KCD_HSCODE_HS_NAME(
                                        e,
                                        "HS_NAME",
                                    )
                                }
                            />
                        </span>
                        <div style={{ margin: "2rem" }}>
                            <Button
                                style={{
                                    display: "inline-block",
                                    width: "10rem",
                                }}
                                label="Save"
                                className="p-button-text"
                                onClick={saveEDT_KCD_HSCODE}
                            />

                            <Button
                                style={{
                                    display: "inline-block",
                                    width: "10rem",
                                }}
                                label="Reset"
                                className="p-button-text"
                                onClick={resetEDT_KCD_HSCODE}
                            />

                            <Button
                                style={{
                                    display: "inline-block",
                                    width: "10rem",
                                }}
                                label="Delete"
                                className="p-button-text"
                                onClick={deleteEDT_KCD_HSCODE}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <Divider />

            <Divider />
            <Toast ref={toast} />
        </div>
    );
};

const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(S0105_KCD_HSCODE, comparisonFn);
