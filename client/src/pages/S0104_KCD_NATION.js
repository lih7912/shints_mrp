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
import { ServiceS0104_KCD_NATION } from "../service/service_biz/ServiceS0104_KCD_NATION";

import "./page_common.scss";

const emptyKCD_CODE = {
    id: 0,
    CD_GROUP: "",
    CD_CODE: "",
    CD_NAME: "",
    CD_FLAG: "",
};

const emptyEDT_KCD_NATION = {
    id: -1,
    NAT_CD: "",
    NAT_NAME: "",
    STATUS_CD: "",
};

const emptyQRY_KCD_NATION = {
    NAT_CD: "",
    NAT_NAME: "",
};

const emptyTBL_KCD_NATION = {
    id: 0,
    NAT_CD: "",
    NAT_NAME: "",
    STATUS_NAME: "",
    STATUS_CD: "",
};

const S0104_KCD_NATION = () => {
    const serviceLibRef = useRef(null);
    if (!serviceLibRef.current) {
        serviceLibRef.current = new ServiceLib();
        serviceLibRef.current.loginConfirm();
    }
    const serviceLib = serviceLibRef.current;
    const serviceS0104_KCD_NATIONRef = useRef(null);
    if (!serviceS0104_KCD_NATIONRef.current) serviceS0104_KCD_NATIONRef.current = new ServiceS0104_KCD_NATION();
    const serviceS0104_KCD_NATION = serviceS0104_KCD_NATIONRef.current;

    const toast = useRef(null);

    /* splitter 관련 */
    const [styleVal, setStyleVal] = useState({ width: "65vw" });

    /* EDIT */

    const [datasEDT_KCD_NATION, setDatasEDT_KCD_NATION] = useState([]);
    const [dataEDT_KCD_NATION, setDataEDT_KCD_NATION] =
        useState(emptyEDT_KCD_NATION);

    const datasetEDT_KCD_NATION = (argData) => {
        var _argData = { ...dataEDT_KCD_NATION };
        _argData.id = argData.id;
        _argData.NAT_CD = argData.NAT_CD;
        _argData.NAT_NAME = argData.NAT_NAME;
        _argData.STATUS_CD = argData.STATUS_CD;

        setDataEDT_KCD_NATION(_argData);
        editEDT_KCD_NATION_STATUS_CD(argData.STATUS_CD);
    };

    const resetEDT_KCD_NATION = () => {
        setDataEDT_KCD_NATION(emptyEDT_KCD_NATION);
        // clearSelectedKCD_STYLE();
    };

    const saveEDT_KCD_NATION = () => {
        console.log(dataEDT_KCD_NATION);
        if (dataEDT_KCD_NATION.NAT_CD.length != 2) {
            alert("코드에는 두자리 값만 입력할 수 있습니다<br><br>You can only enter two digits in your code");
            return;
        }
        if (dataEDT_KCD_NATION.id <= 0) {
            saveEDT_KCD_NATION_INSERT();
        } else {
            saveEDT_KCD_NATION_UPDATE();
        }
    };

    const saveEDT_KCD_NATION_INSERT = () => {
        let _datasEDT_KCD_NATION = [...datasEDT_KCD_NATION];
        let _dataEDT_KCD_NATION = { ...dataEDT_KCD_NATION };

        if (typeof _dataEDT_KCD_NATION.__typename !== "undefined")
            delete _dataEDT_KCD_NATION.__typename;

        let tArray = [];
        tArray.push(_dataEDT_KCD_NATION);

        serviceS0104_KCD_NATION.mgrInsertEDT_KCD_NATION(tArray).then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                console.log(
                    "ServiceS0104_KCD_NATION.mgrInsertEDT_KCD_NATION() call => " +
                        data.length,
                );
                // Search

                serviceS0104_KCD_NATION
                    .mgrQueryTBL_KCD_NATION(dataQRY_KCD_NATION)
                    .then((data) => {
                        if (typeof data.graphQLErrors === "undefined") {
                            console.log(
                                "ServiceS0104_KCD_NATION.mgrQueryTBL_KCD_NATION call => " +
                                    data.length,
                            );
                            toast.current.show({
                                severity: "success",
                                summary: "Save",
                                life: 3000,
                            });

                            setDatasTBL_KCD_NATION(data);
                        } else {
                            console.log(
                                "serviceS0104_KCD_NATION.mgrQueryTBL_KCD_NATION error => " +
                                    JSON.stringify(data.graphQLErrors),
                            );
                        }
                    });
            } else {
                var tStr = data.graphQLErrors[0].message;
                console.log(
                    "ServiceNawooAll.mgrInsertS0104_KCD_NATION( error => " +
                        JSON.stringify(data.graphQLErrors),
                );
                toast.current.show({
                    severity: "success",
                    summary: "Query Error",
                    detail: tStr,
                    life: 3000,
                });
            }
        });
    };

    const saveEDT_KCD_NATION_UPDATE = () => {
        let _datasEDT_KCD_NATION = [...datasEDT_KCD_NATION];
        let _dataEDT_KCD_NATION = { ...dataEDT_KCD_NATION };

        if (typeof _dataEDT_KCD_NATION.__typename !== "undefined")
            delete _dataEDT_KCD_NATION.__typename;

        let tArray = [];
        tArray.push(_dataEDT_KCD_NATION);

        serviceS0104_KCD_NATION.mgrUpdateEDT_KCD_NATION(tArray).then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                console.log(
                    "ServiceS0104_KCD_NATION.mgrUpdateEDT_KCD_NATION() call => " +
                        data.length,
                );
                toast.current.show({
                    severity: "success",
                    summary: "Update",
                    life: 3000,
                });

                resetEDT_KCD_NATION();
                getNationList();

                // Search
            } else {
                // var tStr = data.graphQLErrors[0].message;
                console.log(
                    "ServiceNawooAll.mgrUpdateS0104_KCD_NATION( error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });
    };

    /**delete nation */
    const delete_KCD_NATION = () => {
        let _dataEDT_KCD_NATION = { ...dataEDT_KCD_NATION };

        if (typeof _dataEDT_KCD_NATION.__typename !== "undefined")
            delete _dataEDT_KCD_NATION.__typename;

        let tArray = [];
        tArray.push(_dataEDT_KCD_NATION);

        serviceS0104_KCD_NATION.mgrDeleteEDT_KCD_NATION(tArray).then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                console.log(
                    "ServiceS0104_KCD_NATION.mgrUpdateEDT_KCD_NATION() call => " +
                        data.length,
                );
                toast.current.show({
                    severity: "success",
                    summary: "Delete",
                    life: 3000,
                });

                resetEDT_KCD_NATION();
                getNationList();

                // Search
            } else {
                // var tStr = data.graphQLErrors[0].message;
                console.log(
                    "ServiceNawooAll.mgrUpdateS0104_KCD_NATION( error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });
    };

    const onInputChangeEDT_KCD_NATION_NAT_CD = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KCD_NATION = { ...dataEDT_KCD_NATION };

        let tTypeVal = _dataEDT_KCD_NATION[`${name}`];
        if (typeof tTypeVal === "string") _dataEDT_KCD_NATION[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KCD_NATION[`${name}`] = parseInt(val);

        setDataEDT_KCD_NATION(_dataEDT_KCD_NATION);
    };

    const onInputChangeEDT_KCD_NATION_NAT_NAME = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KCD_NATION = { ...dataEDT_KCD_NATION };

        let tTypeVal = _dataEDT_KCD_NATION[`${name}`];
        if (typeof tTypeVal === "string") _dataEDT_KCD_NATION[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KCD_NATION[`${name}`] = parseInt(val);

        setDataEDT_KCD_NATION(_dataEDT_KCD_NATION);
    };

    const [datasEDT_KCD_NATION_STATUS_CD, setDatasEDT_KCD_NATION_STATUS_CD] =
        useState([]);
    const [dataEDT_KCD_NATION_STATUS_CD, setDataEDT_KCD_NATION_STATUS_CD] =
        useState({});

    const editEDT_KCD_NATION_STATUS_CD = (argValue) => {
        let _dataEDT_KCD_NATION_STATUS_CD =
            datasEDT_KCD_NATION_STATUS_CD.filter(
                (val) => val.CD_CODE === argValue,
            );
        setDataEDT_KCD_NATION_STATUS_CD(_dataEDT_KCD_NATION_STATUS_CD[0]);
    };

    /* QRY */

    const [dataQRY_KCD_NATION, setDataQRY_KCD_NATION] =
        useState(emptyQRY_KCD_NATION);

    const onInputChangeQRY_KCD_NATION_NAT_CD = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KCD_NATION = { ...dataQRY_KCD_NATION };

        let tTypeVal = _dataQRY_KCD_NATION[`${name}`];
        if (typeof tTypeVal === "string") _dataQRY_KCD_NATION[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KCD_NATION[`${name}`] = parseInt(val);

        setDataQRY_KCD_NATION(_dataQRY_KCD_NATION);
    };

    const onInputChangeQRY_KCD_NATION_NAT_NAME = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KCD_NATION = { ...dataQRY_KCD_NATION };

        let tTypeVal = _dataQRY_KCD_NATION[`${name}`];
        if (typeof tTypeVal === "string") _dataQRY_KCD_NATION[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KCD_NATION[`${name}`] = parseInt(val);

        setDataQRY_KCD_NATION(_dataQRY_KCD_NATION);
    };

    /* TBL */

    // DEFINE DATAGRID : TBL_KCD_NATION
    const [datasTBL_KCD_NATION, setDatasTBL_KCD_NATION] = useState([]);
    const dt_TBL_KCD_NATION = useRef(null);
    const [dataTBL_KCD_NATION, setDataTBL_KCD_NATION] =
        useState(emptyTBL_KCD_NATION);
    const [selectedTBL_KCD_NATION, setSelectedTBL_KCD_NATION] = useState([]);
    const [flagSelectModeTBL_KCD_NATION, setFlagSelectModeTBL_KCD_NATION] =
        useState(false);

    // DATAGRID CODE : TBL_KCD_NATION

    const editTBL_KCD_NATION = (argData) => {
        datasetEDT_KCD_NATION(argData);
    };

    const onRowClick1TBL_KCD_NATION = (argData0) => {
        var argData = {};

        if (typeof argData0.length !== "undefined") {
            argData = argData0[0];
        } else {
            argData = argData0;
        }

        let argTBL_KCD_NATION = argData;
        editTBL_KCD_NATION(argTBL_KCD_NATION);
        setDataTBL_KCD_NATION(argTBL_KCD_NATION);
    };

    const onRowClickTBL_KCD_NATION = (event) => {
        let argTBL_KCD_NATION = event.data;
        if (flagSelectModeTBL_KCD_NATION) return;

        // Service : NawooAll:mgrQueryTBL_KCD_NATION
    };

    const searchTBL_KCD_NATION = () => {
        clearSelectedTBL_KCD_NATION();
        resetEDT_KCD_NATION();

        serviceS0104_KCD_NATION
            .mgrQueryTBL_KCD_NATION(dataQRY_KCD_NATION)
            .then((data) => {
                if (typeof data.graphQLErrors === "undefined") {
                    console.log(
                        "ServiceNawooAll.mgrQueryTBL_KCD_NATION() call => " +
                            data.length,
                    );
                    setDatasTBL_KCD_NATION(data);
                } else {
                    // var tStr = data.graphQLErrors[0].message;
                    console.log(
                        "ServiceNawooAll.mgrQueryTBL_KCD_NATION()error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });

        // Service : NawooAll:mgrQueryTBL_KCD_NATION
    };

    const clearSelectedTBL_KCD_NATION = () => {
        setSelectedTBL_KCD_NATION([]);
        setFlagSelectModeTBL_KCD_NATION(false);
    };

    const exportExcelTBL_KCD_NATION = () => {
        import("xlsx").then((xlsx) => {
            const worksheet = xlsx.utils.json_to_sheet(datasTBL_KCD_NATION);
            const workbook = {
                Sheets: { data: worksheet },
                SheetNames: ["data"],
            };
            const excelBuffer = xlsx.write(workbook, {
                bookType: "xlsx",
                type: "array",
            });
            saveAsExcelFileTBL_KCD_NATION(excelBuffer, "국가목록");
        });
    };

    const saveAsExcelFileTBL_KCD_NATION = (buffer, fileName) => {
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

    /* */

    useEffect(() => {
        getNationList();
    }, []);

    const getNationList = () => {
        serviceS0104_KCD_NATION
            .mgrQueryTBL_KCD_NATION(dataQRY_KCD_NATION)
            .then((data) => {
                if (typeof data.graphQLErrors === "undefined") {
                    console.log(
                        "ServiceS0104_KCD_NATION.mgrQueryTBL_KCD_NATION call => " +
                            data.length,
                    );
                    setDatasTBL_KCD_NATION(data);
                } else {
                    console.log(
                        "serviceS0104_KCD_NATION.mgrQueryTBL_KCD_NATION error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });

        serviceS0104_KCD_NATION.mgrQueryTBL_KCD_NATION_CODE().then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                console.log(
                    "ServiceS0104_KCD_NATION.mgrQueryTBL_KCD_NATION_CODE call => " +
                        data.STATUS_CD.length,
                );
                setDatasEDT_KCD_NATION_STATUS_CD(data.STATUS_CD);
                setDataEDT_KCD_NATION_STATUS_CD(data.STATUS_CD[0]);
            } else {
                console.log(
                    "serviceS0104_KCD_NATION.mgrQueryTBL_KCD_NATION error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });
    };

    // Support Area

    const onQryNationNameKeyPress = (e) => {
        if (e.key === "Enter") {
            console.log("enter press here! ");
            searchTBL_KCD_NATION();
        }
    };

    return (
        <div className="af-div-main">
            <div
                className="af-div-first"
                style={{ width: "123rem", height: "3rem" }}
            >
                <div style={{ marginTop: "0.5rem" }}>
                    <span
                        style={{
                            marginLeft: "0.5rem",
                            height: "2rem",
                            width: "33rem",
                            marginTop: "1rem",
                        }}
                    >
                        <p style={{ width: "8rem", display: "inline-block" }}>Country Code</p>
                        <InputText
                            style={{
                                marginLeft: "0.5rem",
                                display: "inline-block",
                                width: "23rem",
                            }}
                            id="id_NAT_CD"
                            value={dataQRY_KCD_NATION.NAT_CD}
                            onChange={(e) =>
                                onInputChangeQRY_KCD_NATION_NAT_CD(e, "NAT_CD")
                            }
                            onKeyPress={(e) => onQryNationNameKeyPress(e)}
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
                        <p style={{ width: "8rem", display: "inline-block" }}>Country Name</p>
                        <InputText
                            style={{
                                marginLeft: "0.5rem",
                                display: "inline-block",
                                width: "23rem",
                            }}
                            id="id_NAT_NAME"
                            value={dataQRY_KCD_NATION.NAT_NAME}
                            onChange={(e) =>
                                onInputChangeQRY_KCD_NATION_NAT_NAME(
                                    e,
                                    "NAT_NAME",
                                )
                            }
                            onKeyPress={(e) => onQryNationNameKeyPress(e)}
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
                            onClick={searchTBL_KCD_NATION}
                            size="small"
                        />

                        <Button
                            label="Excel"
                            className="p-button-text green"
                            onClick={exportExcelTBL_KCD_NATION}
                            size="small"
                        />
                    </span>
                </div>
            </div>

            <div
                className="af-div-first"
                style={{ width: "123rem", height: "48rem" }}
            >
                <AFDataTable preventUnrelatedRerender
                    ref={dt_TBL_KCD_NATION}
                    size="small"
                    value={datasTBL_KCD_NATION}
                    tableStyle={{ tableLayout: "fixed" }}
                    resizableColumns
                    columnResizeMode="expand"
                    showGridlines
                    selectionMode="checkbox"
                    selection={selectedTBL_KCD_NATION}
                    onSelectionChange={(e) => {
                        setFlagSelectModeTBL_KCD_NATION(true);
                        setSelectedTBL_KCD_NATION(e.value);
                        console.log(
                            "selected length:" + selectedTBL_KCD_NATION.length,
                        );
                        onRowClick1TBL_KCD_NATION(e.value);
                    }}
                    onRowClick={onRowClickTBL_KCD_NATION}
                    dataKey="id"
                    className="datatable-responsive"
                    virtualScrollerOptions={{ itemSize: 20 }}
                    emptyMessage=" " //header={headerTBL_KCD_NATION}
                    responsiveLayout="scroll"
                    scrollable
                    scrollHeight="520px"
                >
                    <AFColumn field="NAT_CD" headerClassName="t-header" bodyClassName="t-header" header="Country Code" style={{ width: "5rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="NAT_NAME" headerClassName="t-header" header="Country Name" style={{ width: "70rem", flexBasis: "auto" }} ></AFColumn>
                </AFDataTable>
            </div>

            <div
                className="af-div-first"
                style={{
                    width: "123rem",
                    height: "10rem",
                    backgroundColor: "white",
                }}
            >
                <div className="flex flex-column justify-content-start align-items-top">
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
                            <p style={{ width: "8rem", display: "inline-block", }}>Country Code</p>
                            <InputText
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "23rem",
                                }}
                                id="id_NAT_CD"
                                value={dataEDT_KCD_NATION.NAT_CD}
                                onChange={(e) =>
                                    onInputChangeEDT_KCD_NATION_NAT_CD(
                                        e,
                                        "NAT_CD",
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
                            <p style={{ width: "8rem", display: "inline-block", }}>Country Name</p>
                            <InputText
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "23rem",
                                }}
                                id="id_NAT_NAME"
                                value={dataEDT_KCD_NATION.NAT_NAME}
                                onChange={(e) =>
                                    onInputChangeEDT_KCD_NATION_NAT_NAME(
                                        e,
                                        "NAT_NAME",
                                    )
                                }
                            />
                        </span>
                        <div style={{ marginTop: "20px", marginLeft: "10px" }}>
                            <Button
                                style={{ width: "10rem" }}
                                label="Save"
                                className="p-button-text"
                                onClick={saveEDT_KCD_NATION}
                            />

                            <Button
                                style={{ width: "10rem" }}
                                label="Reset"
                                className="p-button-text"
                                onClick={resetEDT_KCD_NATION}
                            />

                            <Button
                                style={{ width: "10rem" }}
                                label="Delete"
                                className="p-button-text"
                                onClick={delete_KCD_NATION}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <Toast ref={toast} />
        </div>
    );
};

const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(S0104_KCD_NATION, comparisonFn);
