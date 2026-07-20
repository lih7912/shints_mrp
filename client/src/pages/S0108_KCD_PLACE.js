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
import { ServiceS0108_KCD_PLACE } from "../service/service_biz/ServiceS0108_KCD_PLACE";

const emptyKCD_CODE = {
    id: 0,
    CD_GROUP: "",
    CD_CODE: "",
    CD_NAME: "",
    CD_FLAG: "",
};

const emptyTBL_KCD_PLACE = {
    id: 0,
    PLACE_CD: "",
    PLACE_NAME: "",
    USER_NAME: "",
    TEL_NO: "",
    EMAIL: " ",
    STATUS_NAME: "",
    STATUS_CD: "",
    PLACE_TYPE: "",
    PLACE_TYPE_NAME: "",
    DELIVERY_TYPE: "",
    DELIVERY_TYPE_NAME: "",
};

const emptyQRY_KCD_PLACE = {
    PLACE_CD: "",
    PLACE_NAME: "",
    STATUS_CD: "",
};

const emptyEDT_KCD_PLACE = {
    id: -1,
    PLACE_CD: "",
    PLACE_NAME: "",
    USER_NAME: "",
    TEL_NO: "",
    EMAIL: "",
    STATUS_CD: "0",
    PLACE_TYPE: "",
    DELIVERY_TYPE: "",
};

const S0108_KCD_PLACE = () => {
    const serviceLibRef = useRef(null);
    if (!serviceLibRef.current) {
        serviceLibRef.current = new ServiceLib();
        serviceLibRef.current.loginConfirm();
    }
    const serviceLib = serviceLibRef.current;
    const serviceS0108_KCD_PLACERef = useRef(null);
    if (!serviceS0108_KCD_PLACERef.current) serviceS0108_KCD_PLACERef.current = new ServiceS0108_KCD_PLACE();
    const serviceS0108_KCD_PLACE = serviceS0108_KCD_PLACERef.current;

    const toast = useRef(null);

    /* splitter 관련 */
    const [styleVal, setStyleVal] = useState({ width: "65vw" });

    /*QRY KCD_PLACE */

    const onInputChangeQRY_KCD_PLACE_PLACE_NAME = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KCD_PLACE = { ...dataQRY_KCD_PLACE };

        let tTypeVal = _dataQRY_KCD_PLACE[`${name}`];
        if (typeof tTypeVal === "string") _dataQRY_KCD_PLACE[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KCD_PLACE[`${name}`] = parseInt(val);

        setDataQRY_KCD_PLACE(_dataQRY_KCD_PLACE);
    };

    /* TABLE KCD_PLACE*/
    // DEFINE DATAGRID : TBL_KCD_PLACE
    const [datasTBL_KCD_PLACE, setDatasTBL_KCD_PLACE] = useState([]);
    const dt_TBL_KCD_PLACE = useRef(null);
    const [dataTBL_KCD_PLACE, setDataTBL_KCD_PLACE] =
        useState(emptyTBL_KCD_PLACE);
    const [selectedTBL_KCD_PLACE, setSelectedTBL_KCD_PLACE] = useState([]);
    const [flagSelectModeTBL_KCD_PLACE, setFlagSelectModeTBL_KCD_PLACE] =
        useState(false);

    const [datasQry_KCD_PLACE_STATUS_CD, setDatasQry_KCD_PLACE_STATUS_CD] =
        useState([]);
    const [dataQry_KCD_PLACE_STATUS_CD, setDataQry_KCD_PLACE_STATUS_CD] =
        useState({});

    const onDropdownChangeQry_KCD_PLACE_STATUS_CD = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataQRY_KCD_PLACE = { ...dataQRY_KCD_PLACE };

        let tTypeVal = _dataQRY_KCD_PLACE[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KCD_PLACE[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KCD_PLACE[`${name}`] = parseInt(val);
        }

        setDataQRY_KCD_PLACE(_dataQRY_KCD_PLACE);
        setDataQry_KCD_PLACE_STATUS_CD(e.value);
    };

    const [loading, setLoading] = useState(false);

    // DATAGRID CODE : TBL_KCD_PLACE

    const editTBL_KCD_PLACE = (argData) => {
        datasetEDT_KCD_PLACE(argData);
    };

    const onRowClick1TBL_KCD_PLACE = (argData0) => {
        var argData = {};

        if (typeof argData0.length !== "undefined") {
            argData = argData0[0];
        } else {
            argData = argData0;
        }

        let argTBL_KCD_PLACE = argData;
        console.log(argTBL_KCD_PLACE);
        editTBL_KCD_PLACE(argTBL_KCD_PLACE);
        setDataTBL_KCD_PLACE(argTBL_KCD_PLACE);
    };

    const onRowClickTBL_KCD_PLACE = (event) => {
        let argTBL_KCD_PLACE = event.data;
        if (flagSelectModeTBL_KCD_PLACE) return;

        // Service : NawooAll:mgrQueryTBL_KCD_PLACE
    };

    const [dataQRY_KCD_PLACE, setDataQRY_KCD_PLACE] =
        useState(emptyQRY_KCD_PLACE);

    const searchTBL_KCD_PLACE = () => {
        console.log(dataQRY_KCD_PLACE);

        if (dataQRY_KCD_PLACE.STATUS_CD == "") {
            var tobj = { ...dataQRY_KCD_PLACE };
            tobj.STATUS_CD = "0";
            setDataQRY_KCD_PLACE(tobj);
        }
        clearSelectedTBL_KCD_PLACE();
        setLoading(true);
        serviceS0108_KCD_PLACE
            .mgrQueryTBL_KCD_PLACE(dataQRY_KCD_PLACE)
            .then((data) => {
                if (typeof data.graphQLErrors === "undefined") {
                    console.log(data);
                    console.log(
                        "ServiceNawooAll.mgrQueryTBL_KCD_PLACE() call => " +
                            data.length,
                    );
                    setDatasTBL_KCD_PLACE(data);
                    setLoading(false);
                } else {
                    // var tStr = data.graphQLErrors[0].message;
                    console.log(
                        "ServiceNawooAll.mgrQueryTBL_KCD_PLACE()error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });

        // Service : NawooAll:mgrQueryTBL_KCD_PLACE
    };

    const clearSelectedTBL_KCD_PLACE = () => {
        setSelectedTBL_KCD_PLACE([]);
        setFlagSelectModeTBL_KCD_PLACE(false);
    };

    const exportExcelTBL_KCD_PLACE = () => {
        import("xlsx").then((xlsx) => {
            const worksheet = xlsx.utils.json_to_sheet(datasTBL_KCD_PLACE);
            const workbook = {
                Sheets: { data: worksheet },
                SheetNames: ["data"],
            };
            const excelBuffer = xlsx.write(workbook, {
                bookType: "xlsx",
                type: "array",
            });
            saveAsExcelFileTBL_KCD_PLACE(excelBuffer, "Place 목록");
        });
    };

    const saveAsExcelFileTBL_KCD_PLACE = (buffer, fileName) => {
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

    /**EDIT KCD_PLACE */
    const [datasEDT_KCD_PLACE, setDatasEDT_KCD_PLACE] = useState([]);
    const [dataEDT_KCD_PLACE, setDataEDT_KCD_PLACE] =
        useState(emptyEDT_KCD_PLACE);

    const datasetEDT_KCD_PLACE = (argData) => {
        var _argData = { ...dataEDT_KCD_PLACE };
        _argData.id = argData.id;
        _argData.PLACE_CD = argData.PLACE_CD;
        _argData.PLACE_NAME = argData.PLACE_NAME;
        _argData.USER_NAME = argData.USER_NAME;
        _argData.TEL_NO = argData.TEL_NO;
        _argData.EMAIL = argData.EMAIL;
        _argData.STATUS_CD = argData.STATUS_CD;
        _argData.PLACE_TYPE = argData.PLACE_TYPE;
        _argData.DELIVERY_TYPE = argData.DELIVERY_TYPE;

        setDataEDT_KCD_PLACE(_argData);

        editEDT_KCD_PLACE_STATUS_CD(argData.STATUS_CD);
        editEDT_KCD_PLACE_PLACE_TYPE(argData.PLACE_TYPE);
    };

    const resetEDT_KCD_PLACE = () => {
        setDataEDT_KCD_PLACE(emptyEDT_KCD_PLACE);
        datasetEDT_KCD_PLACE(emptyEDT_KCD_PLACE);

        // clearSelectedKCD_STYLE();
    };

    const saveEDT_KCD_PLACE = () => {
        console.log(dataEDT_KCD_PLACE);
        if (dataEDT_KCD_PLACE.id <= 0) {
            saveEDT_KCD_PLACE_INSERT();
        } else {
            saveEDT_KCD_PLACE_UPDATE();
        }
    };

    const saveEDT_KCD_PLACE_INSERT = () => {
        let _datasEDT_KCD_PLACE = [...datasEDT_KCD_PLACE];
        let _dataEDT_KCD_PLACE = { ...dataEDT_KCD_PLACE };

        if (typeof _dataEDT_KCD_PLACE.__typename !== "undefined")
            delete _dataEDT_KCD_PLACE.__typename;

        let tArray = [];
        tArray.push(_dataEDT_KCD_PLACE);

        serviceS0108_KCD_PLACE.mgrInsertEDT_KCD_PLACE(tArray).then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                if (data.length > 0 && data[0].CODE.includes("ERR")) {
                    alert(data[0].CODE);
                } else {
                    let _dataEDT_KCD_PLACE = { ...dataEDT_KCD_PLACE };
                    _dataEDT_KCD_PLACE.PLACE_CD = data[0].CODE;
                    console.log(_dataEDT_KCD_PLACE);
                    setDataEDT_KCD_PLACE(_dataEDT_KCD_PLACE);
                    getData();
                }
            } else {
                // var tStr = data.graphQLErrors[0].message;
                console.log(
                    "ServiceNawooAll.mgrInsertS0108_KCD_PLACE( error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });
    };

    const saveEDT_KCD_PLACE_UPDATE = () => {
        let _datasEDT_KCD_PLACE = [...datasEDT_KCD_PLACE];
        let _dataEDT_KCD_PLACE = { ...dataEDT_KCD_PLACE };

        if (typeof _dataEDT_KCD_PLACE.__typename !== "undefined")
            delete _dataEDT_KCD_PLACE.__typename;

        let tArray = [];
        tArray.push(_dataEDT_KCD_PLACE);

        serviceS0108_KCD_PLACE.mgrUpdateEDT_KCD_PLACE(tArray).then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                console.log(
                    "ServiceS0108_KCD_PLACE.mgrUpdateEDT_KCD_PLACE() call => " +
                        data.length,
                );

                getData();

                // Search
            } else {
                // var tStr = data.graphQLErrors[0].message;
                console.log(
                    "ServiceNawooAll.mgrUpdateS0108_KCD_PLACE( error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });
    };

    const saveEDT_KCD_PLACE_DELETE = () => {
        let _datasEDT_KCD_PLACE = [...datasEDT_KCD_PLACE];
        let _dataEDT_KCD_PLACE = { ...dataEDT_KCD_PLACE };

        if (typeof _dataEDT_KCD_PLACE.__typename !== "undefined")
            delete _dataEDT_KCD_PLACE.__typename;

        let tArray = [];
        tArray.push(_dataEDT_KCD_PLACE);

        serviceS0108_KCD_PLACE.mgrDeleteEDT_KCD_PLACE(tArray).then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                console.log(
                    "ServiceS0108_KCD_PLACE.mgrUpdateEDT_KCD_PLACE() call => " +
                        data.length,
                );

                getData();
                resetEDT_KCD_PLACE();
                // Search
            } else {
                // var tStr = data.graphQLErrors[0].message;
                console.log(
                    "ServiceNawooAll.mgrUpdateS0108_KCD_PLACE( error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });
    };

    const onInputChangeEDT_KCD_PLACE_PLACE_CD = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KCD_PLACE = { ...dataEDT_KCD_PLACE };

        let tTypeVal = _dataEDT_KCD_PLACE[`${name}`];
        if (typeof tTypeVal === "string") _dataEDT_KCD_PLACE[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KCD_PLACE[`${name}`] = parseInt(val);

        setDataEDT_KCD_PLACE(_dataEDT_KCD_PLACE);
    };

    const onInputChangeEDT_KCD_PLACE_PLACE_NAME = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KCD_PLACE = { ...dataEDT_KCD_PLACE };

        let tTypeVal = _dataEDT_KCD_PLACE[`${name}`];
        if (typeof tTypeVal === "string") _dataEDT_KCD_PLACE[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KCD_PLACE[`${name}`] = parseInt(val);

        setDataEDT_KCD_PLACE(_dataEDT_KCD_PLACE);
    };

    const onInputChangeEDT_KCD_PLACE_USER_NAME = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KCD_PLACE = { ...dataEDT_KCD_PLACE };

        let tTypeVal = _dataEDT_KCD_PLACE[`${name}`];
        if (typeof tTypeVal === "string") _dataEDT_KCD_PLACE[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KCD_PLACE[`${name}`] = parseInt(val);

        setDataEDT_KCD_PLACE(_dataEDT_KCD_PLACE);
    };

    const onInputChangeEDT_KCD_PLACE_TEL_NO = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KCD_PLACE = { ...dataEDT_KCD_PLACE };

        let tTypeVal = _dataEDT_KCD_PLACE[`${name}`];
        if (typeof tTypeVal === "string") _dataEDT_KCD_PLACE[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KCD_PLACE[`${name}`] = parseInt(val);

        setDataEDT_KCD_PLACE(_dataEDT_KCD_PLACE);
    };

    const onInputChangeEDT_KCD_PLACE_EMAIL = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KCD_PLACE = { ...dataEDT_KCD_PLACE };

        let tTypeVal = _dataEDT_KCD_PLACE[`${name}`];

        if (typeof tTypeVal === "string") _dataEDT_KCD_PLACE[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KCD_PLACE[`${name}`] = parseInt(val);
        else _dataEDT_KCD_PLACE[`${name}`] = val;

        setDataEDT_KCD_PLACE(_dataEDT_KCD_PLACE);
    };

    const [datasEDT_KCD_PLACE_STATUS_CD, setDatasEDT_KCD_PLACE_STATUS_CD] =
        useState([]);
    const [dataEDT_KCD_PLACE_STATUS_CD, setDataEDT_KCD_PLACE_STATUS_CD] =
        useState({});

    const editEDT_KCD_PLACE_STATUS_CD = (argValue) => {
        let _dataEDT_KCD_PLACE_STATUS_CD = datasEDT_KCD_PLACE_STATUS_CD.filter(
            (val) => val.CD_CODE === argValue,
        );
        setDataEDT_KCD_PLACE_STATUS_CD(_dataEDT_KCD_PLACE_STATUS_CD[0]);
    };

    const onDropdownChangeEDT_KCD_PLACE_STATUS_CD = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataEDT_KCD_PLACE = { ...dataEDT_KCD_PLACE };

        let tTypeVal = _dataEDT_KCD_PLACE[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_KCD_PLACE[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_KCD_PLACE[`${name}`] = parseInt(val);
        }

        setDataEDT_KCD_PLACE(_dataEDT_KCD_PLACE);
        setDataEDT_KCD_PLACE_STATUS_CD(e.value);
    };

    const [datasEDT_KCD_PLACE_PLACE_TYPE, setDatasEDT_KCD_PLACE_PLACE_TYPE] =
        useState([]);
    const [dataEDT_KCD_PLACE_PLACE_TYPE, setDataEDT_KCD_PLACE_PLACE_TYPE] =
        useState({});

    const editEDT_KCD_PLACE_PLACE_TYPE = (argValue) => {
        let _dataEDT_KCD_PLACE_PLACE_TYPE =
            datasEDT_KCD_PLACE_PLACE_TYPE.filter(
                (val) => val.CD_CODE === argValue,
            );
        setDataEDT_KCD_PLACE_PLACE_TYPE(_dataEDT_KCD_PLACE_PLACE_TYPE[0]);
    };

    const [
        datasEDT_KCD_PLACE_DELIVERY_TYPE,
        setDatasEDT_KCD_PLACE_DELIVERY_TYPE,
    ] = useState([]);
    const [
        dataEDT_KCD_PLACE_DELIVERY_TYPE,
        setDataEDT_KCD_PLACE_DELIVERY_TYPE,
    ] = useState({});

    useEffect(() => {
        getData();
        setLoading(true);
        // Effect
    }, []);

    const getData = () => {
        serviceS0108_KCD_PLACE
            .mgrQueryTBL_KCD_PLACE(dataQRY_KCD_PLACE)
            .then((data) => {
                if (typeof data.graphQLErrors === "undefined") {
                    console.log(
                        "ServiceS0108_KCD_PLACE.mgrQueryTBL_KCD_PLACE call => " +
                            data.length,
                    );
                    setDatasTBL_KCD_PLACE(data);
                } else {
                    console.log(
                        "serviceS0108_KCD_PLACE.mgrQueryTBL_KCD_PLACE error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });

        serviceS0108_KCD_PLACE.mgrQueryTBL_KCD_PLACE_CODE().then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                console.log(
                    "ServiceS0108_KCD_PLACE.mgrQueryTBL_KCD_PLACE_CODE call => " +
                        data.STATUS_CD.length,
                );
                setDatasQry_KCD_PLACE_STATUS_CD(data.STATUS_CD);
                setDataQry_KCD_PLACE_STATUS_CD(data.STATUS_CD[1]);

                setDatasEDT_KCD_PLACE_STATUS_CD(data.STATUS_CD);
                setDataEDT_KCD_PLACE_STATUS_CD(data.STATUS_CD[1]);

                setDatasEDT_KCD_PLACE_PLACE_TYPE(data.PLACE_TYPE);
                setDataEDT_KCD_PLACE_PLACE_TYPE(data.PLACE_TYPE[0]);
                setLoading(false);
            } else {
                console.log(
                    "serviceS0108_KCD_PLACE.mgrQueryTBL_KCD_PLACE error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });
    };

    // Support Area

    const onQryForwarderKeyPress = (e) => {
        if (e.key === "Enter") {
            console.log("enter press here! ");
            searchTBL_KCD_PLACE();
        }
    };

    return (
        <div className="af-div-main">
            <div
                className="af-div-first"
                style={{ width: "123rem", height: "3rem" }}
            >
                <span className="af-span-3-0" style={{ width: "33rem" }}>
                    <p
                        className="af-span-p"
                        style={{ width: "8rem", display: "inline-block" }}
                    >Forwarder</p>
                    <InputText
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "23rem",
                        }}
                        id="id_PLACE_NAME"
                        value={dataQRY_KCD_PLACE.PLACE_NAME}
                        onChange={(e) =>
                            onInputChangeQRY_KCD_PLACE_PLACE_NAME(
                                e,
                                "PLACE_NAME",
                            )
                        }
                        onKeyPress={(e) => onQryForwarderKeyPress(e)}
                    />
                </span>
                <span className="af-span-3-0" style={{ width: "33rem" }}>
                    <p
                        className="af-span-p"
                        style={{ width: "8rem", display: "inline-block" }}
                    >Status</p>
                    <div
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "23rem",
                        }}
                    >
                        <Dropdown
                            id="id_STATUS_CD"
                            value={dataQry_KCD_PLACE_STATUS_CD}
                            onChange={(e) =>
                                onDropdownChangeQry_KCD_PLACE_STATUS_CD(
                                    e,
                                    "STATUS_CD",
                                )
                            }
                            options={datasQry_KCD_PLACE_STATUS_CD}
                            optionLabel="CD_NAME"
                            placeholder=""
                            editable
                        ></Dropdown>
                    </div>
                </span>
                <span className="af-span-3-0">
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
                        onClick={searchTBL_KCD_PLACE}
                        size="small"
                    />

                    <Button
                        label="Excel"
                        className="p-button-text green"
                        onClick={exportExcelTBL_KCD_PLACE}
                        size="small"
                    />
                </span>
            </div>

            <div
                className="af-div-first"
                style={{
                    marginTop: "0.5rem",
                    width: "123rem",
                    height: "50rem",
                }}
            >
                <AFDataTable preventUnrelatedRerender
                    ref={dt_TBL_KCD_PLACE}
                    size="small"
                    value={datasTBL_KCD_PLACE}
                    tableStyle={{ tableLayout: "fixed" }}
                    resizableColumns
                    columnResizeMode="expand"
                    showGridlines
                    selectionMode="checkbox"
                    loading={loading}
                    selection={selectedTBL_KCD_PLACE}
                    onSelectionChange={(e) => {
                        setFlagSelectModeTBL_KCD_PLACE(true);
                        setSelectedTBL_KCD_PLACE(e.value);
                        console.log(
                            "selected length:" + selectedTBL_KCD_PLACE.length,
                        );
                        onRowClick1TBL_KCD_PLACE(e.value);
                    }}
                    onRowClick={onRowClickTBL_KCD_PLACE}
                    dataKey="id"
                    className="datatable-responsive"
                    virtualScrollerOptions={{ itemSize: 20 }}
                    emptyMessage=" " //header={headerTBL_KCD_PLACE}
                    responsiveLayout="scroll"
                    scrollable
                    scrollHeight="520px"
                >
                    <AFColumn field="PLACE_CD" headerClassName="t-header" header="Forwarder Code" style={{ flexBasis: "auto", width: "9rem" }} ></AFColumn>
                    <AFColumn field="PLACE_NAME" headerClassName="t-header" header="Forwarder" style={{ flexBasis: "auto", width: "19rem" }} ></AFColumn>
                    <AFColumn field="USER_NAME" headerClassName="t-header" header="Charger" style={{ flexBasis: "auto", width: "10rem" }} ></AFColumn>
                    <AFColumn field="TEL_NO" headerClassName="t-header" header="Tel" style={{ flexBasis: "auto", width: "10rem" }} ></AFColumn>
                    <AFColumn field="EMAIL" headerClassName="t-header" header="E-mail" style={{ flexBasis: "auto", width: "15rem" }} ></AFColumn>
                    <AFColumn field="STATUS_NAME" headerClassName="t-header" header="Status" style={{ flexBasis: "auto", width: "6rem" }} ></AFColumn>
                    {/* <AFColumn field="STATUS_CD" header="Status CD" style={{ flexBasis:'auto',width: '6rem',height:'1.8rem' }} headerStyle={{background:'#c8c8c8 '}}></AFColumn> */}
                </AFDataTable>
            </div>

            <div
                className="af-div-first"
                style={{ width: "123rem", height: "8rem", marginTop: "0.5rem" }}
            >
                <div
                    style={{
                        width: "116rem",
                        height: "8rem",
                        background: "white",
                        marginLeft: "1rem",
                    }}
                >
                    <span
                        style={{
                            marginLeft: "0.5rem",
                            height: "2rem",
                            display: "inline-block",
                            width: "33rem",
                            marginTop: "0.5rem",
                        }}
                    >
                        <p style={{ width: "8rem", display: "inline-block" }}>Forwarder Code</p>
                        <InputText
                            disabled
                            style={{
                                marginLeft: "0.5rem",
                                display: "inline-block",
                                width: "23rem",
                            }}
                            id="id_PLACE_CD"
                            value={dataEDT_KCD_PLACE.PLACE_CD}
                            onChange={(e) =>
                                onInputChangeEDT_KCD_PLACE_PLACE_CD(
                                    e,
                                    "PLACE_CD",
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
                        <p style={{ width: "8rem", display: "inline-block" }}>Forwarder</p>
                        <InputText
                            style={{
                                marginLeft: "0.5rem",
                                display: "inline-block",
                                width: "23rem",
                            }}
                            id="id_PLACE_NAME"
                            value={dataEDT_KCD_PLACE.PLACE_NAME}
                            onChange={(e) =>
                                onInputChangeEDT_KCD_PLACE_PLACE_NAME(
                                    e,
                                    "PLACE_NAME",
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
                        <p style={{ width: "8rem", display: "inline-block" }}>Charger</p>
                        <InputText
                            style={{
                                marginLeft: "0.5rem",
                                display: "inline-block",
                                width: "23rem",
                            }}
                            id="id_USER_NAME"
                            value={dataEDT_KCD_PLACE.USER_NAME}
                            onChange={(e) =>
                                onInputChangeEDT_KCD_PLACE_USER_NAME(
                                    e,
                                    "USER_NAME",
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
                        <p style={{ width: "8rem", display: "inline-block" }}>Tel</p>
                        <InputText
                            style={{
                                marginLeft: "0.5rem",
                                display: "inline-block",
                                width: "23rem",
                            }}
                            id="id_TEL_NO"
                            value={dataEDT_KCD_PLACE.TEL_NO}
                            onChange={(e) =>
                                onInputChangeEDT_KCD_PLACE_TEL_NO(e, "TEL_NO")
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
                        <p style={{ width: "8rem", display: "inline-block" }}>E-mail</p>
                        <InputText
                            style={{
                                marginLeft: "0.5rem",
                                display: "inline-block",
                                width: "23rem",
                            }}
                            id="id_EMAIL"
                            value={dataEDT_KCD_PLACE.EMAIL}
                            onChange={(e) =>
                                onInputChangeEDT_KCD_PLACE_EMAIL(e, "EMAIL")
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
                        <p style={{ width: "8rem", display: "inline-block" }}>Status</p>
                        <div
                            style={{
                                marginLeft: "0.5rem",
                                display: "inline-block",
                                width: "23rem",
                            }}
                        >
                            <Dropdown
                                id="id_STATUS_CD"
                                value={dataEDT_KCD_PLACE_STATUS_CD}
                                onChange={(e) =>
                                    onDropdownChangeEDT_KCD_PLACE_STATUS_CD(
                                        e,
                                        "STATUS_CD",
                                    )
                                }
                                options={datasEDT_KCD_PLACE_STATUS_CD}
                                optionLabel="CD_NAME"
                                placeholder=""
                                editable
                            ></Dropdown>
                        </div>
                    </span>

                    <div className="field col-6 md:col-6">
                        <Button
                            style={{ width: "10rem" }}
                            label="Save"
                            className="p-button-text"
                            onClick={saveEDT_KCD_PLACE}
                        />

                        <Button
                            style={{ width: "10rem" }}
                            label="Reset"
                            className="p-button-text"
                            onClick={resetEDT_KCD_PLACE}
                        />

                        <Button
                            style={{ width: "10rem" }}
                            label="Delete"
                            className="p-button-text"
                            onClick={saveEDT_KCD_PLACE_DELETE}
                        />
                    </div>
                </div>
            </div>

            <Divider />

            <div
                style={{
                    width: "116rem",
                    height: "1.5rem",
                    marginLeft: "88rem",
                }}
            >
                <div className="formgrid grid"></div>
            </div>

            <Divider />
            <Toast ref={toast} />
        </div>
    );
};

const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(S0108_KCD_PLACE, comparisonFn);
