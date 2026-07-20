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
import { ServiceS0101_KCD_FACTORY } from "../service/service_biz/ServiceS0101_KCD_FACTORY";

const S0101_KCD_FACTORY = () => {
    const serviceLibRef = useRef(null);
    if (!serviceLibRef.current) {
        serviceLibRef.current = new ServiceLib();
        serviceLibRef.current.loginConfirm();
    }
    const serviceLib = serviceLibRef.current;
    const serviceS0101_KCD_FACTORYRef = useRef(null);
    if (!serviceS0101_KCD_FACTORYRef.current) serviceS0101_KCD_FACTORYRef.current = new ServiceS0101_KCD_FACTORY();
    const serviceS0101_KCD_FACTORY = serviceS0101_KCD_FACTORYRef.current;

    const toast = useRef(null);

    /* QRY S0101_KCD_FACTORY*/
    let dataQRY_KCD_FACTORY = {
        FACTORY_CD: "",
        FACTORY_NAME: "",
        STATUS_CD: "",
    };

    // const [dataQRY_KCD_FACTORY, setDataQRY_KCD_FACTORY] = useState(emptyQRY_KCD_FACTORY);
    const [dataQRY_KCD_FACTORY_FACTORY_CD, setDataQRY_KCD_FACTORY_FACTORY_CD] =
        useState("");
    const [
        dataQRY_KCD_FACTORY_FACTORY_NAME,
        setDataQRY_KCD_FACTORY_FACTORY_NAME,
    ] = useState("");
    const [datasQRY_KCD_FACTORY_STATUS_CD, setDatasQRY_KCD_FACTORY_STATUS_CD] =
        useState([]);
    const [dataQRY_KCD_FACTORY_STATUS_CD, setDataQRY_KCD_FACTORY_STATUS_CD] =
        useState({});

    const get_dataQRY_KCD_FACTORY = () => {
        var tObj = { ...dataQRY_KCD_FACTORY };
        tObj.FACTORY_CD = dataQRY_KCD_FACTORY_FACTORY_CD;
        tObj.FACTORY_NAME = dataQRY_KCD_FACTORY_FACTORY_NAME;
        tObj.STATUS_CD = dataQRY_KCD_FACTORY_STATUS_CD.CD_CODE;
        return tObj;
    };

    /* TABLE S0101_KCD_FACTORY*/
    // DEFINE DATAGRID : TBL_KCD_FACTORY
    let emptyTBL_KCD_FACTORY = {};

    const [datasTBL_KCD_FACTORY, setDatasTBL_KCD_FACTORY] = useState([]);
    const dt_TBL_KCD_FACTORY = useRef(null);
    const [dataTBL_KCD_FACTORY, setDataTBL_KCD_FACTORY] =
        useState(emptyTBL_KCD_FACTORY);
    const [selectedTBL_KCD_FACTORY, setSelectedTBL_KCD_FACTORY] = useState([]);

    const editTBL_KCD_FACTORY = (argData) => {
        put_dataEDT_KCD_FACTORY(argData);
    };

    const onRowClick1TBL_KCD_FACTORY = (argData0) => {
        var argData = {};
        if (typeof argData0.length !== "undefined") {
            argData = argData0[0];
        } else {
            argData = argData0;
        }
        let argTBL_KCD_FACTORY = argData;
        editTBL_KCD_FACTORY(argTBL_KCD_FACTORY);
        setDataTBL_KCD_FACTORY(argTBL_KCD_FACTORY);
    };

    const onRowClickTBL_KCD_FACTORY = (event) => {
        // Service : NawooAll:mgrQueryTBL_KCD_FACTORY
    };
    const searchTBL_KCD_FACTORY = () => {
        var tInObj = get_dataQRY_KCD_FACTORY();
        serviceS0101_KCD_FACTORY
            .mgrQueryTBL_KCD_FACTORY(tInObj)
            .then((data) => {
                if (typeof data.graphQLErrors === "undefined") {
                    setDatasTBL_KCD_FACTORY(data);
                } else {
                    console.log(
                        "ServiceNawooAll.mgrQueryTBL_KCD_FACTORY()error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });
    };

    const exportExcelTBL_KCD_FACTORY = () => {
        import("xlsx").then((xlsx) => {
            const worksheet = xlsx.utils.json_to_sheet(datasTBL_KCD_FACTORY);
            const workbook = {
                Sheets: { data: worksheet },
                SheetNames: ["data"],
            };
            const excelBuffer = xlsx.write(workbook, {
                bookType: "xlsx",
                type: "array",
            });
            saveAsExcelFileTBL_KCD_FACTORY(excelBuffer, "공장목록");
        });
    };

    const saveAsExcelFileTBL_KCD_FACTORY = (buffer, fileName) => {
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

    /**EDIT S0101_KCD_FACTORY */
    let dataEDT_KCD_FACTORY = {
        FACTORY_CD: "",
        FACTORY_NAME: "",
        USER_NAME: "",
        EMAIL: "",
        TEL_NO: "",
        FAX_NO: "",

        NAT_CD: "",

        ZIP_NO: "",
        ADDR1: "",
        ADDR2: "",
        PORT: "",
        AIRPORT: "",
        BANK_CD: "",
        BANK_NAME: "",
        ACCOUNT_NO: "",
        ACCOUNT_NAME: "",

        STATUS_CD: "",

        id: 0,
    };

    // const [datasEDT_KCD_FACTORY, setDatasEDT_KCD_FACTORY] = useState([]);
    // const [dataEDT_KCD_FACTORY, setDataEDT_KCD_FACTORY] = useState(emptyEDT_KCD_FACTORY);
    // const [dataEDT_KCD_FACTORY, setDataEDT_KCD_FACTORY] = useState(emptyEDT_KCD_FACTORY);

    const [dataEDT_KCD_FACTORY_FACTORY_CD, setDataEDT_KCD_FACTORY_FACTORY_CD] =
        useState("");
    const [
        dataEDT_KCD_FACTORY_FACTORY_NAME,
        setDataEDT_KCD_FACTORY_FACTORY_NAME,
    ] = useState("");
    const [dataEDT_KCD_FACTORY_USER_NAME, setDataEDT_KCD_FACTORY_USER_NAME] =
        useState("");
    const [dataEDT_KCD_FACTORY_EMAIL, setDataEDT_KCD_FACTORY_EMAIL] =
        useState("");
    const [dataEDT_KCD_FACTORY_TEL_NO, setDataEDT_KCD_FACTORY_TEL_NO] =
        useState("");
    const [dataEDT_KCD_FACTORY_FAX_NO, setDataEDT_KCD_FACTORY_FAX_NO] =
        useState("");

    const [datasEDT_KCD_FACTORY_NAT_CD, setDatasEDT_KCD_FACTORY_NAT_CD] =
        useState([]);
    const [dataEDT_KCD_FACTORY_NAT_CD, setDataEDT_KCD_FACTORY_NAT_CD] =
        useState({});
    const editEDT_KCD_FACTORY_NAT_CD = (argValue) => {
        let _dataEDT_KCD_FACTORY_NAT_CD = datasEDT_KCD_FACTORY_NAT_CD.filter(
            (val) => val.NAT_CD === argValue,
        );
        setDataEDT_KCD_FACTORY_NAT_CD(_dataEDT_KCD_FACTORY_NAT_CD[0]);
    };

    const [dataEDT_KCD_FACTORY_ZIP_NO, setDataEDT_KCD_FACTORY_ZIP_NO] =
        useState("");
    const [dataEDT_KCD_FACTORY_ADDR1, setDataEDT_KCD_FACTORY_ADDR1] =
        useState("");
    const [dataEDT_KCD_FACTORY_ADDR2, setDataEDT_KCD_FACTORY_ADDR2] =
        useState("");
    const [dataEDT_KCD_FACTORY_PORT, setDataEDT_KCD_FACTORY_PORT] =
        useState("");
    const [dataEDT_KCD_FACTORY_AIRPORT, setDataEDT_KCD_FACTORY_AIRPORT] =
        useState("");
    const [dataEDT_KCD_FACTORY_BANK_CD, setDataEDT_KCD_FACTORY_BANK_CD] =
        useState("");
    const [dataEDT_KCD_FACTORY_BANK_NAME, setDataEDT_KCD_FACTORY_BANK_NAME] =
        useState("");
    const [dataEDT_KCD_FACTORY_ACCOUNT_NO, setDataEDT_KCD_FACTORY_ACCOUNT_NO] =
        useState("");
    const [
        dataEDT_KCD_FACTORY_ACCOUNT_NAME,
        setDataEDT_KCD_FACTORY_ACCOUNT_NAME,
    ] = useState("");

    const [datasEDT_KCD_FACTORY_STATUS_CD, setDatasEDT_KCD_FACTORY_STATUS_CD] =
        useState([]);
    const [dataEDT_KCD_FACTORY_STATUS_CD, setDataEDT_KCD_FACTORY_STATUS_CD] =
        useState({});
    const editEDT_KCD_FACTORY_STATUS_CD = (argValue) => {
        let _dataEDT_KCD_FACTORY_STATUS_CD =
            datasEDT_KCD_FACTORY_STATUS_CD.filter(
                (val) => val.CD_CODE === argValue,
            );
        setDataEDT_KCD_FACTORY_STATUS_CD(_dataEDT_KCD_FACTORY_STATUS_CD[0]);
    };
    const [dataEDT_KCD_FACTORY_id, setDataEDT_KCD_FACTORY_id] = useState(0);

    const get_dataEDT_KCD_FACTORY = () => {
        var tObj = { ...dataEDT_KCD_FACTORY };
        tObj.FACTORY_CD = dataEDT_KCD_FACTORY_FACTORY_CD;
        tObj.FACTORY_NAME = dataEDT_KCD_FACTORY_FACTORY_NAME;
        tObj.USER_NAME = dataEDT_KCD_FACTORY_USER_NAME;
        tObj.EMAIL = dataEDT_KCD_FACTORY_EMAIL;
        tObj.TEL_NO = dataEDT_KCD_FACTORY_TEL_NO;
        tObj.FAX_NO = dataEDT_KCD_FACTORY_FAX_NO;

        tObj.NAT_CD = dataEDT_KCD_FACTORY_NAT_CD.NAT_CD;

        tObj.ZIP_NO = dataEDT_KCD_FACTORY_ZIP_NO;
        tObj.ADDR1 = dataEDT_KCD_FACTORY_ADDR1;
        tObj.ADDR2 = dataEDT_KCD_FACTORY_ADDR2;
        tObj.PORT = dataEDT_KCD_FACTORY_PORT;
        tObj.AIRPORT = dataEDT_KCD_FACTORY_AIRPORT;
        tObj.BANK_CD = dataEDT_KCD_FACTORY_BANK_CD;
        tObj.BANK_NAME = dataEDT_KCD_FACTORY_BANK_NAME;
        tObj.ACCOUNT_NO = dataEDT_KCD_FACTORY_ACCOUNT_NO;
        tObj.ACCOUNT_NAME = dataEDT_KCD_FACTORY_ACCOUNT_NAME;

        tObj.STATUS_CD = dataEDT_KCD_FACTORY_STATUS_CD.CD_CODE;

        return tObj;
    };

    const put_dataEDT_KCD_FACTORY = (argData) => {
        setDataEDT_KCD_FACTORY_FACTORY_CD(argData.FACTORY_CD);
        setDataEDT_KCD_FACTORY_FACTORY_NAME(argData.FACTORY_NAME);
        setDataEDT_KCD_FACTORY_USER_NAME(argData.USER_NAME);
        setDataEDT_KCD_FACTORY_EMAIL(argData.EMAIL);
        setDataEDT_KCD_FACTORY_TEL_NO(argData.TEL_NO);
        setDataEDT_KCD_FACTORY_FAX_NO(argData.FAX_NO);
        editEDT_KCD_FACTORY_NAT_CD(argData.NAT_CD);
        setDataEDT_KCD_FACTORY_ZIP_NO(argData.ZIP_NO);
        setDataEDT_KCD_FACTORY_ADDR1(argData.ADDR1);
        setDataEDT_KCD_FACTORY_ADDR2(argData.ADDR2);
        setDataEDT_KCD_FACTORY_PORT(argData.PORT);
        setDataEDT_KCD_FACTORY_AIRPORT(argData.AIRPORT);
        setDataEDT_KCD_FACTORY_BANK_CD(argData.BANK_CD);
        setDataEDT_KCD_FACTORY_BANK_NAME(argData.BANK_NAME);
        setDataEDT_KCD_FACTORY_ACCOUNT_NO(argData.ACCOUNT_NO);
        setDataEDT_KCD_FACTORY_ACCOUNT_NAME(argData.ACCOUNT_NAME);
        editEDT_KCD_FACTORY_STATUS_CD(argData.STATUS_CD);
        setDataEDT_KCD_FACTORY_id(argData.id);
    };

    /////

    const resetEDT_KCD_FACTORY = () => {
        put_dataEDT_KCD_FACTORY(dataEDT_KCD_FACTORY);
    };

    const saveEDT_KCD_FACTORY = () => {
        if (dataEDT_KCD_FACTORY_FACTORY_CD === "") saveEDT_KCD_FACTORY_INSERT();
        else saveEDT_KCD_FACTORY_UPDATE();
    };

    const saveEDT_KCD_FACTORY_INSERT = () => {
        let _dataEDT_KCD_FACTORY = get_dataEDT_KCD_FACTORY();

        let tArray = [];
        tArray.push(_dataEDT_KCD_FACTORY);

        serviceS0101_KCD_FACTORY
            .mgrInsertEDT_KCD_FACTORY(tArray)
            .then((data) => {
                if (typeof data.graphQLErrors === "undefined") {
                    searchTBL_KCD_FACTORY();
                } else {
                    console.log(
                        "ServiceNawooAll.mgrInsertS0101_KCD_FACTORY( error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });
    };

    const saveEDT_KCD_FACTORY_UPDATE = () => {
        let _dataEDT_KCD_FACTORY = get_dataEDT_KCD_FACTORY();

        let tArray = [];
        tArray.push(_dataEDT_KCD_FACTORY);

        serviceS0101_KCD_FACTORY
            .mgrUpdateEDT_KCD_FACTORY(tArray)
            .then((data) => {
                if (typeof data.graphQLErrors === "undefined") {
                    searchTBL_KCD_FACTORY();
                } else {
                    console.log(
                        "ServiceNawooAll.mgrUpdateS0101_KCD_FACTORY( error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });
    };

    const saveEDT_KCD_FACTORY_DELETE = () => {
        let _dataEDT_KCD_FACTORY = get_dataEDT_KCD_FACTORY();

        let tArray = [];
        tArray.push(_dataEDT_KCD_FACTORY);

        serviceS0101_KCD_FACTORY
            .mgrDeleteEDT_KCD_FACTORY(tArray)
            .then((data) => {
                console.log(data);
                if (typeof data.graphQLErrors === "undefined") {
                    searchTBL_KCD_FACTORY();
                } else {
                    console.log(
                        "ServiceNawooAll.mgrDeleteS0101_KCD_FACTORY( error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });
    };

    /////
    const onQryFactoryKeyPress = (e) => {
        if (e.key === "Enter") {
            console.log("enter press here! ");
            searchTBL_KCD_FACTORY();
        }
    };

    /////

    // Support Area

    /**
     * loading test
     *
     *  */
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        searchTBL_KCD_FACTORY();
        serviceS0101_KCD_FACTORY.mgrQueryTBL_KCD_FACTORY_CODE().then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                setDatasQRY_KCD_FACTORY_STATUS_CD(data.STATUS_CD);
                setDataQRY_KCD_FACTORY_STATUS_CD(data.STATUS_CD[0]);
                setDatasEDT_KCD_FACTORY_STATUS_CD(data.STATUS_CD);
                setDataEDT_KCD_FACTORY_STATUS_CD(data.STATUS_CD[0]);
                setDatasEDT_KCD_FACTORY_NAT_CD(data.NAT_CD);
                setDataEDT_KCD_FACTORY_NAT_CD(data.NAT_CD[1]);
            } else {
                console.log(
                    "serviceS0101_KCD_FACTORY.mgrQueryTBL_KCD_FACTORY error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });
    }, []);

    return (
        <div className="af-div-main" style={{ height: "80rem" }}>
            <div
                className="af-div-first"
                style={{ width: "123rem", height: "4rem" }}
            >
                <div
                    style={{
                        background: "white",
                        marginTop: "0.5rem",
                        display: "inline-block",
                        width: "116rem",
                    }}
                >
                    <span
                        style={{
                            marginLeft: "0.5rem",
                            height: "3rem",
                            display: "inline-block",
                            width: "28rem",
                        }}
                    >
                        <p style={{ width: "8rem", display: "inline-block" }}>FACTORY NAME</p>
                        <InputText
                            style={{
                                marginLeft: "0.5rem",
                                display: "inline-block",
                                width: "18rem",
                            }}
                            id="id_FACTORY_NAME"
                            onKeyPress={(e) => onQryFactoryKeyPress(e)}
                            value={dataQRY_KCD_FACTORY_FACTORY_NAME}
                            onChange={(e) =>
                                setDataQRY_KCD_FACTORY_FACTORY_NAME(
                                    e.target.value,
                                )
                            }
                        />
                    </span>
                    <span
                        style={{
                            marginLeft: "0.5rem",
                            height: "3rem",
                            display: "inline-block",
                            width: "24rem",
                        }}
                    >
                        <p style={{ width: "4rem", display: "inline-block" }}>STATUS</p>
                        <div
                            style={{
                                marginLeft: "0.5rem",
                                display: "inline-block",
                                width: "18rem",
                            }}
                        >
                            <Dropdown
                                id="id_STATUS_CD"
                                value={dataQRY_KCD_FACTORY_STATUS_CD}
                                options={datasQRY_KCD_FACTORY_STATUS_CD}
                                onChange={(e) =>
                                    setDataQRY_KCD_FACTORY_STATUS_CD(
                                        e.target.value,
                                    )
                                }
                                optionLabel="CD_NAME"
                                placeholder=""
                                editable
                            ></Dropdown>
                        </div>
                    </span>
                    <span
                        style={{
                            display: "inline-block",
                            width: "16rem",
                            marginLeft: "1rem",
                        }}
                    >
                        <Button
                            label={
                                <span>
                                    Search(<u>S</u>)
                                </span>
                            }
                            accessKey="S"
                            className="p-button-text"
                            onClick={searchTBL_KCD_FACTORY}
                            size="small"
                        />

                        <Button
                            label="Excel"
                            className="p-button-text green"
                            onClick={exportExcelTBL_KCD_FACTORY}
                            size="small"
                        />
                    </span>
                </div>
            </div>

            <div
                className="af-div-first"
                style={{ width: "123rem", height: "42.5rem" }}
            >
                <AFDataTable preventUnrelatedRerender
                    ref={dt_TBL_KCD_FACTORY}
                    size="small"
                    value={datasTBL_KCD_FACTORY}
                    tableStyle={{ tableLayout: "fixed" }}
                    resizableColumns
                    columnResizeMode="expand"
                    showGridlines
                    selectionMode="checkbox"
                    selection={selectedTBL_KCD_FACTORY}
                    onSelectionChange={(e) => {
                        setSelectedTBL_KCD_FACTORY(e.value);
                        onRowClick1TBL_KCD_FACTORY(e.value);
                    }}
                    onRowClick={onRowClickTBL_KCD_FACTORY}
                    dataKey="id"
                    loading={loading}
                    virtualScrollerOptions={{ itemSize: 20 }}
                    emptyMessage=" "
                    responsiveLayout="scroll"
                    scrollable
                    scrollHeight="464px"
                >
                    <AFColumn field="FACTORY_CD" headerClassName="t-header" header="Factory Code" style={{ hight: "1.8rem", width: "8rem" }} ></AFColumn>
                    <AFColumn field="FACTORY_NAME" headerClassName="t-header" header="Factory Name" style={{ width: "21rem", minWidth: "21rem", hight: "1.8rem", }} ></AFColumn>
                    <AFColumn field="USER_NAME" headerClassName="t-header" header="Contact Person" style={{ width: "10rem", hight: "1.8rem", minWidth: "10rem", }} ></AFColumn>
                    <AFColumn field="EMAIL" headerClassName="t-header" header="Email" style={{ hight: "1.8rem", width: "15rem", minWidth: "15rem", }} ></AFColumn>
                    <AFColumn field="TEL_NO" headerClassName="t-header" header="Tel" style={{ hight: "1.8rem", width: "12rem", minWidth: "12rem", }} ></AFColumn>
                    <AFColumn field="FAX_NO" headerClassName="t-header" header="Fax" style={{ hight: "1.8rem", width: "10rem", minWidth: "10rem", }} ></AFColumn>
                    <AFColumn field="NAT_NAME" headerClassName="t-header" header="Country" style={{ hight: "1.8rem", width: "8rem", minWidth: "8rem", }} ></AFColumn>
                    <AFColumn field="ZIP_NO" headerClassName="t-header" header="Zip" style={{ hight: "1.8rem", width: "7rem", minWidth: "7rem", }} ></AFColumn>
                    <AFColumn field="ADDR1" headerClassName="t-header" header="Addr1" style={{ hight: "1.8rem", width: "25rem", minWidth: "25rem", }} ></AFColumn>
                    <AFColumn field="ADDR2" headerClassName="t-header" header="Addr2" style={{ hight: "1.8rem", width: "12rem", minWidth: "12rem", }} ></AFColumn>
                    <AFColumn field="PORT" headerClassName="t-header" header="SeaPort" style={{ hight: "1.8rem", width: "10rem", minWidth: "10rem", }} ></AFColumn>
                    <AFColumn field="AIRPORT" headerClassName="t-header" header="AirPort" style={{ hight: "1.8rem", width: "10rem", minWidth: "10rem", }} ></AFColumn>
                    <AFColumn field="STATUS_NAME" headerClassName="t-header" header="Status" style={{ hight: "1.8rem", width: "10rem", minWidth: "10rem", }} ></AFColumn>
                    <AFColumn field="BANK_CD" headerClassName="t-header" header="Bank Cd" style={{ hight: "1.8rem", width: "10rem", minWidth: "10rem", }} ></AFColumn>
                    <AFColumn field="BANK_NAME" headerClassName="t-header" header="Bank Name" style={{ hight: "1.8rem", width: "10rem", minWidth: "10rem", }} ></AFColumn>
                    <AFColumn field="ACCOUNT_NO" headerClassName="t-header" header="Account NO" style={{ hight: "1.8rem", width: "10rem", minWidth: "10rem", }} ></AFColumn>
                    <AFColumn field="ACCOUNT_NAME" headerClassName="t-header" header="Account Name" style={{ hight: "1.8rem", width: "10rem", minWidth: "10rem", }} ></AFColumn>
                </AFDataTable>
            </div>

            <div
                className="af-div-first"
                style={{ width: "123rem", height: "14rem" }}
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
                    <p style={{ width: "8rem", display: "inline-block" }}>Factory Code</p>
                    <InputText
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "23rem",
                        }}
                        id="id_FACTORY_CD"
                        disabled
                        value={dataEDT_KCD_FACTORY_FACTORY_CD}
                        onChange={(e) =>
                            setDataEDT_KCD_FACTORY_FACTORY_CD(e.target.value)
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
                    <p style={{ width: "8rem", display: "inline-block" }}>Factory Name</p>
                    <InputText
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "23rem",
                        }}
                        id="id_FACTORY_NAME"
                        onFocus={(e) => {
                            e.target.select();
                        }}
                        value={dataEDT_KCD_FACTORY_FACTORY_NAME}
                        onChange={(e) =>
                            setDataEDT_KCD_FACTORY_FACTORY_NAME(e.target.value)
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
                    <p style={{ width: "8rem", display: "inline-block" }}>Contact Person</p>
                    <InputText
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "23rem",
                        }}
                        id="id_USER_NAME"
                        onFocus={(e) => {
                            e.target.select();
                        }}
                        value={dataEDT_KCD_FACTORY_USER_NAME}
                        onChange={(e) =>
                            setDataEDT_KCD_FACTORY_USER_NAME(e.target.value)
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
                    <p style={{ width: "8rem", display: "inline-block" }}>Email</p>
                    <InputText
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "23rem",
                        }}
                        id="id_EMAIL"
                        onFocus={(e) => {
                            e.target.select();
                        }}
                        value={dataEDT_KCD_FACTORY_EMAIL}
                        onChange={(e) =>
                            setDataEDT_KCD_FACTORY_EMAIL(e.target.value)
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
                        onFocus={(e) => {
                            e.target.select();
                        }}
                        value={dataEDT_KCD_FACTORY_TEL_NO}
                        onChange={(e) =>
                            setDataEDT_KCD_FACTORY_TEL_NO(e.target.value)
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
                    <p style={{ width: "8rem", display: "inline-block" }}>Fax</p>
                    <InputText
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "23rem",
                        }}
                        id="id_FAX_NO"
                        onFocus={(e) => {
                            e.target.select();
                        }}
                        value={dataEDT_KCD_FACTORY_FAX_NO}
                        onChange={(e) =>
                            setDataEDT_KCD_FACTORY_FAX_NO(e.target.value)
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
                    <p style={{ width: "8rem", display: "inline-block" }}>Country</p>
                    <div
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "23rem",
                        }}
                    >
                        <Dropdown
                            id="id_NAT_CD"
                            style={{ width: "23rem" }}
                            options={datasEDT_KCD_FACTORY_NAT_CD}
                            optionLabel="NAT_NAME"
                            placeholder=""
                            editable
                            value={dataEDT_KCD_FACTORY_NAT_CD}
                            onChange={(e) =>
                                setDataEDT_KCD_FACTORY_NAT_CD(e.target.value)
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
                    <p style={{ width: "8rem", display: "inline-block" }}>Zip No</p>
                    <InputText
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "23rem",
                        }}
                        id="id_ZIP_NO"
                        onFocus={(e) => {
                            e.target.select();
                        }}
                        value={dataEDT_KCD_FACTORY_ZIP_NO}
                        onChange={(e) =>
                            setDataEDT_KCD_FACTORY_ZIP_NO(e.target.value)
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
                            style={{ width: "23rem" }}
                            options={datasEDT_KCD_FACTORY_STATUS_CD}
                            optionLabel="CD_NAME"
                            placeholder=""
                            editable
                            value={dataEDT_KCD_FACTORY_STATUS_CD}
                            onChange={(e) =>
                                setDataEDT_KCD_FACTORY_STATUS_CD(e.target.value)
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
                    <p style={{ width: "8rem", display: "inline-block" }}>Addr1</p>
                    <InputText
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "23rem",
                        }}
                        id="id_ADDR1"
                        onFocus={(e) => {
                            e.target.select();
                        }}
                        value={dataEDT_KCD_FACTORY_ADDR1}
                        onChange={(e) =>
                            setDataEDT_KCD_FACTORY_ADDR1(e.target.value)
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
                    <p style={{ width: "8rem", display: "inline-block" }}>Addr2</p>
                    <InputText
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "23rem",
                        }}
                        id="id_ADDR2"
                        onFocus={(e) => {
                            e.target.select();
                        }}
                        value={dataEDT_KCD_FACTORY_ADDR2}
                        onChange={(e) =>
                            setDataEDT_KCD_FACTORY_ADDR2(e.target.value)
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
                    <p style={{ width: "8rem", display: "inline-block" }}>SeaPort</p>
                    <InputText
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "23rem",
                        }}
                        id="id_PORT"
                        onFocus={(e) => {
                            e.target.select();
                        }}
                        value={dataEDT_KCD_FACTORY_PORT}
                        onChange={(e) =>
                            setDataEDT_KCD_FACTORY_PORT(e.target.value)
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
                    <p style={{ width: "8rem", display: "inline-block" }}>AirPort</p>
                    <InputText
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "23rem",
                        }}
                        id="id_AIRPORT"
                        onFocus={(e) => {
                            e.target.select();
                        }}
                        value={dataEDT_KCD_FACTORY_AIRPORT}
                        onChange={(e) =>
                            setDataEDT_KCD_FACTORY_AIRPORT(e.target.value)
                        }
                    />
                </span>
                <div style={{ marginLeft: "25px", marginTop: "10px" }}>
                    <Button
                        style={{ width: "10rem" }}
                        label="Save"
                        className="p-button-text"
                        onClick={saveEDT_KCD_FACTORY}
                    />

                    <Button
                        style={{ width: "10rem" }}
                        label="Reset"
                        className="p-button-text"
                        onClick={resetEDT_KCD_FACTORY}
                    />

                    <Button
                        style={{ width: "10rem" }}
                        label="Delete"
                        className="p-button-text"
                        onClick={saveEDT_KCD_FACTORY_DELETE}
                    />
                </div>
            </div>
            <Toast ref={toast} />
        </div>
    );
};

const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(S0101_KCD_FACTORY, comparisonFn);
