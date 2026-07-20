/* eslint-disable */
import React, { useState, useEffect, useRef } from "react";
import { AFDataTable } from "../components/AFDataTable";
import { AFColumn } from "../components/AFColumn";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { Tooltip } from "primereact/tooltip";
import { Calendar } from "primereact/calendar";
import { Divider } from "primereact/divider";
import { InputText } from "primereact/inputtext";
import { ServiceLib } from "../service/service_lib/ServiceLib";
import { ServiceS0218_EXCHANGE_RATE_RECORD } from "../service/service_biz/ServiceS0218_EXCHANGE_RATE_RECORD";

// import './page_common.scss';

const emptyKCD_CODE = {
    id: 0,
    CD_GROUP: "",
    CD_CODE: "",
    CD_NAME: "",
    CD_FLAG: "",
};

const emptyQRY_KCD_CURR_COMM = {
    START_DATE: "",
};

const emptyTBL_KCD_CURR_COMM = {
    id: 0,
    START_DATE: "",
};

const emptyTBL_KCD_CURR_COMM1 = {
    id: 0,
    CURR: "",
    USE_RATE: "",
    USE_PRICE: "",
};

const emptyEDT_KCD_CURR_COMM1 = {
    CURR: "",
    USE_RATE: "",
    USE_PRICE: "",
};

const S0218_EXCHANGE_RATE_RECORD = () => {
    const serviceLibRef = useRef(null);
    if (!serviceLibRef.current) {
        serviceLibRef.current = new ServiceLib();
        serviceLibRef.current.loginConfirm();
    }
    const serviceLib = serviceLibRef.current;
    const serviceS0218_EXCHANGE_RATE_RECORD =
        new ServiceS0218_EXCHANGE_RATE_RECORD();

    const toast = useRef(null);

    /* splitter 관련 */
    const [styleVal, setStyleVal] = useState({ width: "65vw" });

    /* QRY KCD_CURR_COMM*/
    const [dataQRY_KCD_CURR_COMM, setDataQRY_KCD_CURR_COMM] = useState(
        emptyQRY_KCD_CURR_COMM,
    );

    const onCalChangeQRY_KCD_CURR_COMM_START_DATE = (e, name) => {
        let val1 = e.value || "";
        let val = "";
        if (val1 === "") {
            val = "";
        } else {
            val = getDateVal(val1);
        }

        let _dataQRY_KCD_CURR_COMM = { ...dataQRY_KCD_CURR_COMM };
        _dataQRY_KCD_CURR_COMM[`${name}`] = val;
        setDataQRY_KCD_CURR_COMM(_dataQRY_KCD_CURR_COMM);
    };

    /*TABLE KCD_CURR_COMM */
    // DEFINE DATAGRID : TBL_KCD_CURR_COMM
    const [datasTBL_KCD_CURR_COMM, setDatasTBL_KCD_CURR_COMM] = useState([]);
    const dt_TBL_KCD_CURR_COMM = useRef(null);
    const [dataTBL_KCD_CURR_COMM, setDataTBL_KCD_CURR_COMM] = useState(
        emptyTBL_KCD_CURR_COMM,
    );
    const [selectedTBL_KCD_CURR_COMM, setSelectedTBL_KCD_CURR_COMM] = useState(
        [],
    );
    const [
        flagSelectModeTBL_KCD_CURR_COMM,
        setFlagSelectModeTBL_KCD_CURR_COMM,
    ] = useState(false);

    // DATAGRID CODE : TBL_KCD_CURR_COMM

    const onRowClick1TBL_KCD_CURR_COMM = (argData0) => {
        var argData = {};

        if (typeof argData0.length !== "undefined") {
            argData = argData0[0];
        } else {
            argData = argData0;
        }

        let argTBL_KCD_CURR_COMM = argData;

        setDataTBL_KCD_CURR_COMM(argTBL_KCD_CURR_COMM);

        var _tObj = {};
        _tObj.START_DATE = argData.START_DATE;

        serviceS0218_EXCHANGE_RATE_RECORD
            .mgrQueryTBL_KCD_CURR_COMM1(_tObj)
            .then((data) => {
                if (typeof data.graphQLErrors === "undefined") {
                    console.log(
                        "ServiceNawooAll.mgrQueryTBL_KCD_CURR_COMM1() call => " +
                            data.length,
                    );
                    console.log(data);

                    let tArray = data.map((col, i) => {
                        let tObj = { ...col };
                        tObj.id = i + 1;
                        tObj.USD_RATE = serviceLib.getNumberFormat(
                            col.USD_RATE,
                            8,
                        );
                        tObj.CURR_AMT = serviceLib.getNumberFormat(
                            col.CURR_AMT,
                            8,
                        );
                        return tObj;
                    });

                    setDatasTBL_KCD_CURR_COMM1(tArray);
                } else {
                    // var tStr = data.graphQLErrors[0].message;
                    console.log(
                        "ServiceNawooAll.mgrQueryTBL_KCD_CURR_COMM()error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });
    };

    const onRowClickTBL_KCD_CURR_COMM = (event) => {
        let argTBL_KCD_CURR_COMM = event.data;
        console.log(event.data["START_DATE"]);
        let _dataQRY_KCD_CURR_COMM = dataQRY_KCD_CURR_COMM;
        _dataQRY_KCD_CURR_COMM.START_DATE = event.data["START_DATE"];
        setDataQRY_KCD_CURR_COMM(_dataQRY_KCD_CURR_COMM);
        if (flagSelectModeTBL_KCD_CURR_COMM) return;

        // Service : NawooAll:mgrQueryTBL_KCD_CURR_COMM
    };

    const searchTBL_KCD_CURR_COMM = () => {
        clearSelectedTBL_KCD_CURR_COMM();

        serviceS0218_EXCHANGE_RATE_RECORD
            .mgrQueryTBL_KCD_CURR_COMM(dataQRY_KCD_CURR_COMM)
            .then((data) => {
                if (typeof data.graphQLErrors === "undefined") {
                    console.log(
                        "ServiceNawooAll.mgrQueryTBL_KCD_CURR_COMM() call => " +
                            data.length,
                    );
                    setDatasTBL_KCD_CURR_COMM(data);
                } else {
                    // var tStr = data.graphQLErrors[0].message;
                    console.log(
                        "ServiceNawooAll.mgrQueryTBL_KCD_CURR_COMM()error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });

        // Service : NawooAll:mgrQueryTBL_KCD_CURR_COMM
    };

    const clearSelectedTBL_KCD_CURR_COMM = () => {
        setSelectedTBL_KCD_CURR_COMM([]);
        setFlagSelectModeTBL_KCD_CURR_COMM(false);
    };

    const exportExcelTBL_KCD_CURR_COMM = () => {};

    /**TABLE KCD_CURR_COMM1 */
    // DEFINE DATAGRID : TBL_KCD_CURR_COMM1
    const [datasTBL_KCD_CURR_COMM1, setDatasTBL_KCD_CURR_COMM1] = useState([]);
    const dt_TBL_KCD_CURR_COMM1 = useRef(null);
    const [dataTBL_KCD_CURR_COMM1, setDataTBL_KCD_CURR_COMM1] = useState(
        emptyTBL_KCD_CURR_COMM1,
    );
    const [selectedTBL_KCD_CURR_COMM1, setSelectedTBL_KCD_CURR_COMM1] =
        useState([]);
    const [
        flagSelectModeTBL_KCD_CURR_COMM1,
        setFlagSelectModeTBL_KCD_CURR_COMM1,
    ] = useState(false);

    // DATAGRID CODE : TBL_KCD_CURR_COMM1

    const onRowClick1TBL_KCD_CURR_COMM1 = (argData0) => {
        var argData = {};

        if (typeof argData0.length !== "undefined") {
            argData = argData0[0];
        } else {
            argData = argData0;
        }

        let argTBL_KCD_CURR_COMM1 = argData;

        setDataTBL_KCD_CURR_COMM1(argTBL_KCD_CURR_COMM1);
    };

    const onRowClickTBL_KCD_CURR_COMM1 = (event) => {
        let argTBL_KCD_CURR_COMM1 = event.data;
        if (flagSelectModeTBL_KCD_CURR_COMM1) return;

        // Service : NawooAll:mgrQueryTBL_KCD_CURR_COMM1
    };

    /**EDIT KCD_CURR_COMM1 */

    const [datasEDT_KCD_CURR_COMM1, setDatasEDT_KCD_CURR_COMM1] = useState([]);
    const [dataEDT_KCD_CURR_COMM1, setDataEDT_KCD_CURR_COMM1] = useState(
        emptyEDT_KCD_CURR_COMM1,
    );

    const saveEDT_KCD_CURR_COMM1 = () => {
        saveEDT_KCD_CURR_COMM1_INSERT();
    };

    const buildEDT_KCD_CURR_COMM1Row = (col) => {
        return {
            CURR: col.CD_CODE || col.CURR_CD,
            START_DATE: dataQRY_KCD_CURR_COMM.START_DATE,
            USE_RATE: col.USD_RATE,
            USE_PRICE: col.CURR_AMT,
        };
    };

    const saveEDT_KCD_CURR_COMM1_INSERT = () => {
        let _datasEDT_KCD_CURR_COMM1 = [...datasEDT_KCD_CURR_COMM1];
        let _dataEDT_KCD_CURR_COMM1 = { ...dataEDT_KCD_CURR_COMM1 };

        if (typeof _dataEDT_KCD_CURR_COMM1.__typename !== "undefined")
            delete _dataEDT_KCD_CURR_COMM1.__typename;

        let tArray = [];
        datasTBL_KCD_CURR_COMM1.forEach((col, i) => {
            var tOne = buildEDT_KCD_CURR_COMM1Row(col);
            tArray.push(tOne);
        });

        // console.log(tArray);

        serviceS0218_EXCHANGE_RATE_RECORD
            .mgrInsertEDT_KCD_CURR_COMM1(tArray)
            .then((data) => {
                if (typeof data.graphQLErrors === "undefined") {
                    if (data.length > 0) alert(data[0].CODE);
                    searchTBL_KCD_CURR_COMM();
                } else {
                    alert('System Error: IT팀에 연락하세요');
                    console.log(
                        "ServiceNawooAll.mgrInsertS0218_EXCHANGE_RATE_RECORD( error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });
    };

    const delEDT_KCD_CURR_COMM1 = () => {
        let _datasEDT_KCD_CURR_COMM1 = [...datasEDT_KCD_CURR_COMM1];
        let _dataEDT_KCD_CURR_COMM1 = { ...dataEDT_KCD_CURR_COMM1 };

        if (typeof _dataEDT_KCD_CURR_COMM1.__typename !== "undefined")
            delete _dataEDT_KCD_CURR_COMM1.__typename;
        
        let tArray = [];
        datasTBL_KCD_CURR_COMM1.forEach((col, i) => {
                    var tOne = buildEDT_KCD_CURR_COMM1Row(col);
            tArray.push(tOne);
        });
                 
        // console.log(tArray); 

        serviceS0218_EXCHANGE_RATE_RECORD
            .mgrDeleteEDT_KCD_CURR_COMM1(tArray)
            .then((data) => {
                if (typeof data.graphQLErrors === "undefined") {
                    if (data.length > 0) alert(data[0].CODE);
                    searchTBL_KCD_CURR_COMM();
                } else {
                    alert('System Error: IT팀에 연락하세요');
                    console.log(
                        "ServiceNawooAll.mgrInsertS0218_EXCHANGE_RATE_RECORD( error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });
    };

    const saveEDT_KCD_CURR_COMM1_UPDATE = () => {
    };

    const onChangeTextEdit = (e, options) => {
        options.editorCallback(e.target.value);
    };

    const handleFocus = (event) => event.target.select();

    const normalizeRateValue = (value) => {
        if (value === null || typeof value === "undefined") return "";

        const nextValue = String(value).replaceAll(",", "").trim();
        if (nextValue === "") return "";

        if (!/^-?\d*(\.\d*)?$/.test(nextValue)) return null;
        return serviceLib.getNumberFormat(nextValue, 8);
    };

    const cellEditorTBL_KCD_CURR_COMM1 = (options) => {
        return (
            <InputText
                type="text"
                value={options.value}
                onChange={(e) => onChangeTextEdit(e, options)}
                onFocus={handleFocus}
            />
        );
    };

    const onCellEditCompleteTBL_KCD_CURR_COMM1 = (e) => {
        const { rowData, newValue, field } = e;
        const normalizedValue = normalizeRateValue(newValue);

        if (normalizedValue === null) return;
        if (normalizedValue === rowData[field]) return;

        setDatasTBL_KCD_CURR_COMM1((prev) =>
            prev.map((col) => {
                if (col.id !== rowData.id) return col;
                return {
                    ...col,
                    [field]: normalizedValue,
                };
            }),
        );
    };

    useEffect(() => {
        searchTBL_KCD_CURR_COMM();
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
        <div className="af-div-main">
            <div style={{ padding: "15px" }}>
                <div
                    style={{
                        float: "left",
                        width: "28rem",
                        height: "62rem",
                        backgroundColor: "white",
                        marginTop: "33px",
                    }}
                >
                    <AFDataTable preventUnrelatedRerender
                        ref={dt_TBL_KCD_CURR_COMM}
                        size="small"
                        value={datasTBL_KCD_CURR_COMM}
                        resizableColumns
                        columnResizeMode="fit"
                        showGridlines
                        selectionMode="checkbox"
                        selection={selectedTBL_KCD_CURR_COMM}
                        onSelectionChange={(e) => {
                            setFlagSelectModeTBL_KCD_CURR_COMM(true);
                            setSelectedTBL_KCD_CURR_COMM(e.value);
                            console.log(
                                "selected length:" +
                                    selectedTBL_KCD_CURR_COMM.length,
                            );
                            onRowClick1TBL_KCD_CURR_COMM(e.value);
                        }}
                        onRowClick={onRowClickTBL_KCD_CURR_COMM}
                        dataKey="START_DATE"
                        className="datatable-responsive"
                        virtualScrollerOptions={{ itemSize: 12 }}
                        emptyMessage=" "
                        //header={headerTBL_KCD_CURR_COMM}
                        responsiveLayout="scroll"
                        scrollable
                        scrollHeight="675px"
                    >
                        <AFColumn field="START_DATE" headerClassName="t-header" header="기준 일자" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyClassName="text-center" bodyStyle={{ width: "10rem", height: "1.8rem" }} body={(row) => serviceLib.dateFormat(row.START_DATE)}></AFColumn>
                    </AFDataTable>
                </div>
                <div
                    style={{
                        float: "left",
                        marginLeft: "5px",
                        height: "62rem",
                        width: "94.5rem",
                        backgroundColor: "white",
                    }}
                >
                    <div style={{ height: "3rem", width: "100%" }}>
                        <span
                            style={{
                                marginLeft: "0.5rem",
                                height: "2rem",
                                display: "inline-block",
                                width: "19rem",
                                marginTop: "0.5rem",
                            }}
                        >
                            <p style={{ width: "8rem", display: "inline-block", }}>기준 일자</p>
                            <div
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "8rem",
                                }}
                            >
                                <Calendar
                                    showButtonBar
                                    dateFormat="yy-mm-dd"
                                    inputId="id_Start_DATE"
                                    id="id_Start_DATE"
                                    value={changeDateVal(
                                        dataQRY_KCD_CURR_COMM.START_DATE,
                                    )}
                                    onChange={(e) =>
                                        onCalChangeQRY_KCD_CURR_COMM_START_DATE(
                                            e,
                                            "START_DATE",
                                        )
                                    }
                                />
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
                                className="p-button-text"
                                onClick={searchTBL_KCD_CURR_COMM}
                                size="small"
                            />

                            <Button
                                label="Excel"
                                className="p-button-text green"
                                onClick={exportExcelTBL_KCD_CURR_COMM}
                                size="small"
                            />
                        </span>
                    </div>
                    <div style={{ height: "62rem", width: "100%", marginTop: "3px" }}>
                        <AFDataTable preventUnrelatedRerender
                            ref={dt_TBL_KCD_CURR_COMM1}
                            editMode="cell"
                            size="small"
                            value={datasTBL_KCD_CURR_COMM1}
                            resizableColumns
                            columnResizeMode="fit"
                            showGridlines
                            selectionMode="checkbox"
                            selection={selectedTBL_KCD_CURR_COMM1}
                            onSelectionChange={(e) => {
                                setFlagSelectModeTBL_KCD_CURR_COMM1(true);
                                setSelectedTBL_KCD_CURR_COMM1(e.value);
                                console.log(
                                    "selected length:" +
                                        selectedTBL_KCD_CURR_COMM1.length,
                                );
                                onRowClick1TBL_KCD_CURR_COMM1(e.value);
                            }}
                            onRowClick={onRowClickTBL_KCD_CURR_COMM1}
                            dataKey="id"
                            className="datatable-responsive"
                            virtualScrollerOptions={{ itemSize: 12 }}
                            emptyMessage=" "
                            //header={headerTBL_KCD_CURR_COMM1}
                            responsiveLayout="scroll"
                            scrollable
                            scrollHeight="610px"
                        >
                            <AFColumn field="CURR_CD" headerClassName="t-header" header="통화" headerStyle={{ width: "10rem", height: "1.8rem", }} bodyClassName="text-center" bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                            <AFColumn field="USD_RATE" headerClassName="t-header" header="달러화" headerStyle={{ width: "10rem", height: "1.8rem", }} bodyClassName="col-right text-right" bodyStyle={{ width: "10rem", height: "1.8rem" }} editor={(options) => cellEditorTBL_KCD_CURR_COMM1(options)} onCellEditComplete={onCellEditCompleteTBL_KCD_CURR_COMM1}></AFColumn>
                            <AFColumn field="CURR_AMT" headerClassName="t-header" header="대달러환율" headerStyle={{ width: "10rem", height: "1.8rem", }} bodyClassName="col-right text-right" bodyStyle={{ width: "10rem", height: "1.8rem" }} editor={(options) => cellEditorTBL_KCD_CURR_COMM1(options)} onCellEditComplete={onCellEditCompleteTBL_KCD_CURR_COMM1}></AFColumn>
                        </AFDataTable>
                    </div>
                    <div
                            style={{
                                marginTop: "20px",
                                display: "flex",
                                justifyContent: ''

                            }}
                        >
                            <Button
                                style={{
                                    display: "inline-block",
                                    width: "10rem",
                                }}
                                label="Save"
                                className="p-button-text"
                                onClick={saveEDT_KCD_CURR_COMM1}
                            />

                            <Button
                                style={{
                                    display: "inline-block",
                                    width: "10rem",
                                }}
                                label="Reset"
                                className="p-button-text"
                                onClick={blankFn}
                            />

                            <Button
                                style={{
                                    display: "inline-block",
                                    width: "10rem",
                                }}
                                label="Delete"
                                className="p-button-text"
                                onClick={delEDT_KCD_CURR_COMM1}
                            />
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

export default React.memo(S0218_EXCHANGE_RATE_RECORD, comparisonFn);
