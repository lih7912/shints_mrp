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
import { ServiceS0211_CAPABOOK_LIST_SAMPLE_BVT } from "../service/service_biz/ServiceS0211_CAPABOOK_LIST_SAMPLE_BVT";

// import './page_common.scss';

const emptyKCD_CODE = {
    id: 0,
    CD_GROUP: "",
    CD_CODE: "",
    CD_NAME: "",
    CD_FLAG: "",
};

const emptyQRY_KSV_CAPABOOK_MEM = {
    BOOK_DATE: "",
    USER_NAME: "",
    TEAM: "",
};

const emptyTBL_KSV_CAPABOOK_MEM = {
    id: 0,
    JOB_CD: "",
    MONTH: "",
    IN_DATE: "",
    BUYER_NAME: "",
    BUYER_CD: "",
    PO_CD: "",
    ORDER_CD: "",
    STYLE_NAME: "",
    STYLE_CD: "",
    NR: "",
    QTY: "",
    STS_QTY: "",
    COLOR: "",
    USE_SIZE: "",
    USAGE_NAME: "",
    USAGE: "",
    MW: "",
    SHIP_DATE: "",
    S_ETA: "",
    M_ETA: "",
    SD: "",
    FOB: "",
    EXP_CMPT: "",
    NEGO_TYPE: "",
    EMBRO: "",
    TP: "",
    SP: "",
    LTHR: "",
    G: "",
    W: "",
    S: "",
    FND: "",
    DL: "",
    TPR: "",
    EMBOSSING: "",
    WASHING: "",
    DOWN: "",
    CUT: "",
    FTP: "",
    DTP: "",
    LAZE: "",
    BVT_KIND: "",
    SEQ: "",
    REMARK: "",
};

const emptyEDT_KSV_CAPABOOK_MEM = {
    MONTH: "",
    IN_DATE: "",
    STYLE_CD: "",
    STYLE_NAME: "",
    BUYER_CD: "",
    BUYER_CD: "",
    JOB_CD: "",
    PO_CD: "",
    ORDER_CD: "",
    FOB: "",
    QTY: "",
    STS_QTY: "",
    COLOR: "",
    USE_SIZE: "",
    USAGE: "",
    NR: "",
    REMARK: "",
    MW: "",
    S_ETA: "",
    S_ETA: "",
    M_ETA: "",
    EXP_CMPT: "",
    BVT_KIND: "",
    TPR: "",
    EMBOSSING: "",
    WASHING: "",
    DL: "",
    S: "",
    FND: "",
    DOWN: "",
    CUT: "",
    EMBRO: "",
    TP: "",
    SP: "",
    LTHR: "",
    G: "",
    W: "",
    FTP: "",
    DTP: "",
    SD: "",
    NEGO_TYPE: "",
    LAZE: "",
    SEQ: "",
};

const S0211_CAPABOOK_LIST_SAMPLE_BVT = () => {
    const serviceLibRef = useRef(null);
    if (!serviceLibRef.current) {
        serviceLibRef.current = new ServiceLib();
        serviceLibRef.current.loginConfirm();
    }
    const serviceLib = serviceLibRef.current;
    const serviceS0211_CAPABOOK_LIST_SAMPLE_BVT =
        new ServiceS0211_CAPABOOK_LIST_SAMPLE_BVT();

    const toast = useRef(null);

    /* splitter 관련 */
    const [styleVal, setStyleVal] = useState({ width: "65vw" });

    /*QRY KSV_CAPABOOK_MEM */
    const [dataQRY_KSV_CAPABOOK_MEM, setDataQRY_KSV_CAPABOOK_MEM] = useState(
        emptyQRY_KSV_CAPABOOK_MEM,
    );

    const onInputChangeQRY_KSV_CAPABOOK_MEM_BOOK_DATE = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_CAPABOOK_MEM = { ...dataQRY_KSV_CAPABOOK_MEM };

        let tTypeVal = _dataQRY_KSV_CAPABOOK_MEM[`${name}`];
        if (typeof tTypeVal === "string")
            _dataQRY_KSV_CAPABOOK_MEM[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_CAPABOOK_MEM[`${name}`] = parseInt(val);

        setDataQRY_KSV_CAPABOOK_MEM(_dataQRY_KSV_CAPABOOK_MEM);
    };

    const onInputChangeQRY_KSV_CAPABOOK_MEM_USER_NAME = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_CAPABOOK_MEM = { ...dataQRY_KSV_CAPABOOK_MEM };

        let tTypeVal = _dataQRY_KSV_CAPABOOK_MEM[`${name}`];
        if (typeof tTypeVal === "string")
            _dataQRY_KSV_CAPABOOK_MEM[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_CAPABOOK_MEM[`${name}`] = parseInt(val);

        setDataQRY_KSV_CAPABOOK_MEM(_dataQRY_KSV_CAPABOOK_MEM);
    };

    const onInputChangeQRY_KSV_CAPABOOK_MEM_TEAM = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_CAPABOOK_MEM = { ...dataQRY_KSV_CAPABOOK_MEM };

        let tTypeVal = _dataQRY_KSV_CAPABOOK_MEM[`${name}`];
        if (typeof tTypeVal === "string")
            _dataQRY_KSV_CAPABOOK_MEM[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_CAPABOOK_MEM[`${name}`] = parseInt(val);

        setDataQRY_KSV_CAPABOOK_MEM(_dataQRY_KSV_CAPABOOK_MEM);
    };

    /*TABLE KSV_CAPABOOK_MEM */
    // DEFINE DATAGRID : TBL_KSV_CAPABOOK_MEM
    const [datasTBL_KSV_CAPABOOK_MEM, setDatasTBL_KSV_CAPABOOK_MEM] = useState(
        [],
    );
    const dt_TBL_KSV_CAPABOOK_MEM = useRef(null);
    const [dataTBL_KSV_CAPABOOK_MEM, setDataTBL_KSV_CAPABOOK_MEM] = useState(
        emptyTBL_KSV_CAPABOOK_MEM,
    );
    const [selectedTBL_KSV_CAPABOOK_MEM, setSelectedTBL_KSV_CAPABOOK_MEM] =
        useState([]);
    const [
        flagSelectModeTBL_KSV_CAPABOOK_MEM,
        setFlagSelectModeTBL_KSV_CAPABOOK_MEM,
    ] = useState(false);

    // DATAGRID CODE : TBL_KSV_CAPABOOK_MEM

    const onRowClick1TBL_KSV_CAPABOOK_MEM = (argData0) => {
        var argData = {};

        if (typeof argData0.length !== "undefined") {
            argData = argData0[0];
        } else {
            argData = argData0;
        }

        let argTBL_KSV_CAPABOOK_MEM = argData;

        setDataTBL_KSV_CAPABOOK_MEM(argTBL_KSV_CAPABOOK_MEM);
    };

    const onRowClickTBL_KSV_CAPABOOK_MEM = (event) => {
        let argTBL_KSV_CAPABOOK_MEM = event.data;
        if (flagSelectModeTBL_KSV_CAPABOOK_MEM) return;

        // Service : NawooAll:mgrQueryTBL_KSV_CAPABOOK_MEM
    };

    const searchTBL_KSV_CAPABOOK_MEM = () => {
        clearSelectedTBL_KSV_CAPABOOK_MEM();

        serviceS0211_CAPABOOK_LIST_SAMPLE_BVT
            .mgrQueryTBL_KSV_CAPABOOK_MEM(dataQRY_KSV_CAPABOOK_MEM)
            .then((data) => {
                if (typeof data.graphQLErrors === "undefined") {
                    console.log(
                        "ServiceNawooAll.mgrQueryTBL_KSV_CAPABOOK_MEM() call => " +
                            data.length,
                    );
                    setDatasTBL_KSV_CAPABOOK_MEM(data);
                } else {
                    // var tStr = data.graphQLErrors[0].message;
                    console.log(
                        "ServiceNawooAll.mgrQueryTBL_KSV_CAPABOOK_MEM()error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });

        // Service : NawooAll:mgrQueryTBL_KSV_CAPABOOK_MEM
    };

    const clearSelectedTBL_KSV_CAPABOOK_MEM = () => {
        setSelectedTBL_KSV_CAPABOOK_MEM([]);
        setFlagSelectModeTBL_KSV_CAPABOOK_MEM(false);
    };

    const exportExcelTBL_KSV_CAPABOOK_MEM = () => {};

    /** EDIT KSV_CAPABOOK_MEM*/

    const [datasEDT_KSV_CAPABOOK_MEM, setDatasEDT_KSV_CAPABOOK_MEM] = useState(
        [],
    );
    const [dataEDT_KSV_CAPABOOK_MEM, setDataEDT_KSV_CAPABOOK_MEM] = useState(
        emptyEDT_KSV_CAPABOOK_MEM,
    );

    // const onInputChangeEDT_KSV_CAPABOOK_MEM_BUYER_CD = (e, name) => {
    // let val = (e.target && e.target.value) || '';

    // let _dataEDT_KSV_CAPABOOK_MEM = { ...dataEDT_KSV_CAPABOOK_MEM };

    // let tTypeVal = _dataEDT_KSV_CAPABOOK_MEM[`${name}`];
    // if (typeof tTypeVal === "string") _dataEDT_KSV_CAPABOOK_MEM[`${name}`] = val;
    // else if (typeof tTypeVal === "number") _dataEDT_KSV_CAPABOOK_MEM[`${name}`] = parseInt(val);

    // setDataEDT_KSV_CAPABOOK_MEM(_dataEDT_KSV_CAPABOOK_MEM);
    // }

    const [
        datasEDT_KSV_CAPABOOK_MEM_USAGE,
        setDatasEDT_KSV_CAPABOOK_MEM_USAGE,
    ] = useState([]);
    const [dataEDT_KSV_CAPABOOK_MEM_USAGE, setDataEDT_KSV_CAPABOOK_MEM_USAGE] =
        useState({});

    const [datasEDT_KSV_CAPABOOK_MEM_NR, setDatasEDT_KSV_CAPABOOK_MEM_NR] =
        useState([]);
    const [dataEDT_KSV_CAPABOOK_MEM_NR, setDataEDT_KSV_CAPABOOK_MEM_NR] =
        useState({});

    // const onCalChangeEDT_KSV_CAPABOOK_MEM_S_ETA = (e, name) => {
    //    let val1 = e.value || '';
    //    let val = '';
    //    if (val1 === '') {
    //       val = '';
    //    } else {
    //       val = getDateVal(val1);
    //    }

    //    let _dataEDT_KSV_CAPABOOK_MEM = { ...dataEDT_KSV_CAPABOOK_MEM };
    //    _dataEDT_KSV_CAPABOOK_MEM[`${name}`] = val;
    //    setDataEDT_KSV_CAPABOOK_MEM(_dataEDT_KSV_CAPABOOK_MEM);

    // }

    const [
        datasEDT_KSV_CAPABOOK_MEM_BVT_KIND,
        setDatasEDT_KSV_CAPABOOK_MEM_BVT_KIND,
    ] = useState([]);
    const [
        dataEDT_KSV_CAPABOOK_MEM_BVT_KIND,
        setDataEDT_KSV_CAPABOOK_MEM_BVT_KIND,
    ] = useState({});

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
                        width: "26rem",
                    }}
                >
                    <p style={{ width: "5rem", display: "inline-block" }}>Last Date</p>
                    <InputText
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "20rem",
                        }}
                        id="id_BOOK_DATE"
                        value={dataQRY_KSV_CAPABOOK_MEM.BOOK_DATE}
                        onChange={(e) =>
                            onInputChangeQRY_KSV_CAPABOOK_MEM_BOOK_DATE(
                                e,
                                "BOOK_DATE",
                            )
                        }
                    />
                </span>
                <span
                    style={{
                        marginLeft: "0.5rem",
                        height: "2rem",
                        display: "inline-block",
                        width: "26rem",
                    }}
                >
                    <p style={{ width: "5rem", display: "inline-block" }}>User</p>
                    <InputText
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "20rem",
                        }}
                        id="id_USER_NAME"
                        value={dataQRY_KSV_CAPABOOK_MEM.USER_NAME}
                        onChange={(e) =>
                            onInputChangeQRY_KSV_CAPABOOK_MEM_USER_NAME(
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
                        width: "26rem",
                    }}
                >
                    <p style={{ width: "5rem", display: "inline-block" }}>Dept</p>
                    <InputText
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "20rem",
                        }}
                        id="id_TEAM"
                        value={dataQRY_KSV_CAPABOOK_MEM.TEAM}
                        onChange={(e) =>
                            onInputChangeQRY_KSV_CAPABOOK_MEM_TEAM(e, "TEAM")
                        }
                    />
                </span>
                <span style={{ display: "inline-block", marginLeft: "3rem" }}>
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
                        onClick={searchTBL_KSV_CAPABOOK_MEM}
                    />

                    <Button
                        label="Excel"
                        icon="pi pi-upload"
                        style={{ height: "1.1rem" }}
                        className="p-button-text green"
                        onClick={exportExcelTBL_KSV_CAPABOOK_MEM}
                    />
                </span>
            </div>

            <div
                style={{
                    marginLeft: "1rem",
                    marginTop: "1rem",
                    width: "99rem",
                    height: "28rem",
                }}
            >
                <AFDataTable preventUnrelatedRerender
                    ref={dt_TBL_KSV_CAPABOOK_MEM}
                    size="small"
                    value={datasTBL_KSV_CAPABOOK_MEM}
                    resizableColumns
                    columnResizeMode="fit"
                    showGridlines
                    selectionMode="checkbox"
                    selection={selectedTBL_KSV_CAPABOOK_MEM}
                    onSelectionChange={(e) => {
                        setFlagSelectModeTBL_KSV_CAPABOOK_MEM(true);
                        setSelectedTBL_KSV_CAPABOOK_MEM(e.value);
                        console.log(
                            "selected length:" +
                                selectedTBL_KSV_CAPABOOK_MEM.length,
                        );
                        onRowClick1TBL_KSV_CAPABOOK_MEM(e.value);
                    }}
                    onRowClick={onRowClickTBL_KSV_CAPABOOK_MEM}
                    dataKey="id"
                    className="datatable-responsive"
                    virtualScrollerOptions={{ itemSize: 50 }}
                    emptyMessage=" "
                    //header={headerTBL_KSV_CAPABOOK_MEM}
                    responsiveLayout="scroll"
                    scrollable
                    scrollHeight="26rem"
                >
                    <AFColumn field="JOB_CD" headerClassName="t-header" header="Job CD" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="MONTH" headerClassName="t-header" header="month" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="IN_DATE" headerClassName="t-header" header="Book Date" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="BUYER_NAME" headerClassName="t-header" header="Buyer Name" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="BUYER_CD" headerClassName="t-header" header="Buyer CD" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="PO_CD" headerClassName="t-header" header="po#" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="ORDER_CD" headerClassName="t-header" header="Order#" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="STYLE_NAME" headerClassName="t-header" header="Style Name" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="STYLE_CD" headerClassName="t-header" header="Style CD" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="NR" headerClassName="t-header" header="N/R" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="QTY" headerClassName="t-header" header="Qty" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="STS_QTY" headerClassName="t-header" header="Sts Qty" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="COLOR" headerClassName="t-header" header="Color" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="USE_SIZE" headerClassName="t-header" header="Size" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="USAGE_NAME" headerClassName="t-header" header="Usage Name" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="USAGE" headerClassName="t-header" header="Usage CD" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="MW" headerClassName="t-header" header="M/W" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="SHIP_DATE" headerClassName="t-header" header="Ship Date" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="S_ETA" headerClassName="t-header" header="S ETA" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="M_ETA" headerClassName="t-header" header="M ETA" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="SD" headerClassName="t-header" header="S/D" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="FOB" headerClassName="t-header" header="FOB" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="EXP_CMPT" headerClassName="t-header" header="Exp CMPT" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="NEGO_TYPE" headerClassName="t-header" header="Nego TYPE" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="EMBRO" headerClassName="t-header" header="EMBRO" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="TP" headerClassName="t-header" header="T/P" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="SP" headerClassName="t-header" header="S/P" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="LTHR" headerClassName="t-header" header="LTHR" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="G" headerClassName="t-header" header="G" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="W" headerClassName="t-header" header="W" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="S" headerClassName="t-header" header="S" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="FND" headerClassName="t-header" header="FND" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="DL" headerClassName="t-header" header="DL" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="TPR" headerClassName="t-header" header="TPR" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="EMBOSSING" headerClassName="t-header" header="EMBOSSING" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="WASHING" headerClassName="t-header" header="WASHING" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="DOWN" headerClassName="t-header" header="DOWN" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="CUT" headerClassName="t-header" header="CUT" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="FTP" headerClassName="t-header" header="FTP" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="DTP" headerClassName="t-header" header="DTP" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="LAZE" headerClassName="t-header" header="LAZE" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="BVT_KIND" headerClassName="t-header" header="BVT KIND" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="SEQ" headerClassName="t-header" header="SEQ" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="REMARK" headerClassName="t-header" header="Remark" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                </AFDataTable>
            </div>

            <Divider />

            <div
                style={{ width: "100rem", height: "2rem", marginLeft: "37rem" }}
            >
                <div className="formgrid grid">
                    <div>
                        <Button
                            style={{ display: "inline-block", width: "10rem" }}
                            label="Inquiry"
                            className="p-button-text"
                            onClick={blankFn}
                        />

                        <Button
                            style={{ display: "inline-block", width: "10rem" }}
                            label="Reset"
                            className="p-button-text"
                            onClick={blankFn}
                        />

                        <Button
                            style={{ display: "inline-block", width: "10rem" }}
                            label="All"
                            className="p-button-text"
                            onClick={blankFn}
                        />

                        <Button
                            style={{ display: "inline-block", width: "10rem" }}
                            label="End"
                            className="p-button-text"
                            onClick={blankFn}
                        />

                        <Button
                            style={{ display: "inline-block", width: "10rem" }}
                            label="End Cancel"
                            className="p-button-text"
                            onClick={blankFn}
                        />

                        <Button
                            style={{ display: "inline-block", width: "15rem" }}
                            label="Capa Booking List"
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

export default React.memo(S0211_CAPABOOK_LIST_SAMPLE_BVT, comparisonFn);
