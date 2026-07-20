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
import { ServiceS0210_CAPABOOK_RECORD_SAMPLE_BVT } from "../service/service_biz/ServiceS0210_CAPABOOK_RECORD_SAMPLE_BVT";

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
};

const emptyQRY_KSV_CAPABOOK_MEM1 = {
    BOOK_DATE: "",
    PO_CD: "",
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

const emptyTBL_KSV_CAPABOOK_MEM1 = {
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

const S0210_CAPABOOK_RECORD_SAMPLE_BVT = () => {
    const serviceLibRef = useRef(null);
    if (!serviceLibRef.current) {
        serviceLibRef.current = new ServiceLib();
        serviceLibRef.current.loginConfirm();
    }
    const serviceLib = serviceLibRef.current;
    const serviceS0210_CAPABOOK_RECORD_SAMPLE_BVT =
        new ServiceS0210_CAPABOOK_RECORD_SAMPLE_BVT();

    const toast = useRef(null);

    /* splitter 관련 */
    const [styleVal, setStyleVal] = useState({ width: "65vw" });

    /*QRY KSV_CAPABOOK_MEM*/
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

    /* QRY KSV_CAPABOOK_MEM1*/
    const [dataQRY_KSV_CAPABOOK_MEM1, setDataQRY_KSV_CAPABOOK_MEM1] = useState(
        emptyQRY_KSV_CAPABOOK_MEM1,
    );

    const onInputChangeQRY_KSV_CAPABOOK_MEM1_BOOK_DATE = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_CAPABOOK_MEM1 = { ...dataQRY_KSV_CAPABOOK_MEM1 };

        let tTypeVal = _dataQRY_KSV_CAPABOOK_MEM1[`${name}`];
        if (typeof tTypeVal === "string")
            _dataQRY_KSV_CAPABOOK_MEM1[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_CAPABOOK_MEM1[`${name}`] = parseInt(val);

        setDataQRY_KSV_CAPABOOK_MEM1(_dataQRY_KSV_CAPABOOK_MEM1);
    };

    const onInputChangeQRY_KSV_CAPABOOK_MEM1_PO_CD = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_CAPABOOK_MEM1 = { ...dataQRY_KSV_CAPABOOK_MEM1 };

        let tTypeVal = _dataQRY_KSV_CAPABOOK_MEM1[`${name}`];
        if (typeof tTypeVal === "string")
            _dataQRY_KSV_CAPABOOK_MEM1[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_CAPABOOK_MEM1[`${name}`] = parseInt(val);

        setDataQRY_KSV_CAPABOOK_MEM1(_dataQRY_KSV_CAPABOOK_MEM1);
    };

    /** TABLE KSV_CAPABOOK_MEM*/

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

        serviceS0210_CAPABOOK_RECORD_SAMPLE_BVT
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

    /** TABLE KSV_CAPABOOK_MEM1*/

    // DEFINE DATAGRID : TBL_KSV_CAPABOOK_MEM1
    const [datasTBL_KSV_CAPABOOK_MEM1, setDatasTBL_KSV_CAPABOOK_MEM1] =
        useState([]);
    const dt_TBL_KSV_CAPABOOK_MEM1 = useRef(null);
    const [dataTBL_KSV_CAPABOOK_MEM1, setDataTBL_KSV_CAPABOOK_MEM1] = useState(
        emptyTBL_KSV_CAPABOOK_MEM1,
    );
    const [selectedTBL_KSV_CAPABOOK_MEM1, setSelectedTBL_KSV_CAPABOOK_MEM1] =
        useState([]);
    const [
        flagSelectModeTBL_KSV_CAPABOOK_MEM1,
        setFlagSelectModeTBL_KSV_CAPABOOK_MEM1,
    ] = useState(false);

    // DATAGRID CODE : TBL_KSV_CAPABOOK_MEM1

    const onRowClick1TBL_KSV_CAPABOOK_MEM1 = (argData0) => {
        var argData = {};

        if (typeof argData0.length !== "undefined") {
            argData = argData0[0];
        } else {
            argData = argData0;
        }

        let argTBL_KSV_CAPABOOK_MEM1 = argData;

        setDataTBL_KSV_CAPABOOK_MEM1(argTBL_KSV_CAPABOOK_MEM1);
    };

    const onRowClickTBL_KSV_CAPABOOK_MEM1 = (event) => {
        let argTBL_KSV_CAPABOOK_MEM1 = event.data;
        if (flagSelectModeTBL_KSV_CAPABOOK_MEM1) return;

        // Service : NawooAll:mgrQueryTBL_KSV_CAPABOOK_MEM1
    };

    const searchTBL_KSV_CAPABOOK_MEM1 = () => {
        clearSelectedTBL_KSV_CAPABOOK_MEM1();

        serviceS0210_CAPABOOK_RECORD_SAMPLE_BVT
            .mgrQueryTBL_KSV_CAPABOOK_MEM1(dataQRY_KSV_CAPABOOK_MEM1)
            .then((data) => {
                if (typeof data.graphQLErrors === "undefined") {
                    console.log(
                        "ServiceNawooAll.mgrQueryTBL_KSV_CAPABOOK_MEM1() call => " +
                            data.length,
                    );
                    setDatasTBL_KSV_CAPABOOK_MEM1(data);
                } else {
                    // var tStr = data.graphQLErrors[0].message;
                    console.log(
                        "ServiceNawooAll.mgrQueryTBL_KSV_CAPABOOK_MEM1()error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });

        // Service : NawooAll:mgrQueryTBL_KSV_CAPABOOK_MEM1
    };

    const clearSelectedTBL_KSV_CAPABOOK_MEM1 = () => {
        setSelectedTBL_KSV_CAPABOOK_MEM1([]);
        setFlagSelectModeTBL_KSV_CAPABOOK_MEM1(false);
    };

    const exportExcelTBL_KSV_CAPABOOK_MEM1 = () => {};

    /**EDIT KSV_CAPABOOK_MEM */
    const [datasEDT_KSV_CAPABOOK_MEM, setDatasEDT_KSV_CAPABOOK_MEM] = useState(
        [],
    );
    const [dataEDT_KSV_CAPABOOK_MEM, setDataEDT_KSV_CAPABOOK_MEM] = useState(
        emptyEDT_KSV_CAPABOOK_MEM,
    );

    const onInputChangeEDT_KSV_CAPABOOK_MEM_MONTH = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_CAPABOOK_MEM = { ...dataEDT_KSV_CAPABOOK_MEM };

        let tTypeVal = _dataEDT_KSV_CAPABOOK_MEM[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_CAPABOOK_MEM[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_CAPABOOK_MEM[`${name}`] = parseInt(val);

        setDataEDT_KSV_CAPABOOK_MEM(_dataEDT_KSV_CAPABOOK_MEM);
    };

    const onInputChangeEDT_KSV_CAPABOOK_MEM_IN_DATE = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_CAPABOOK_MEM = { ...dataEDT_KSV_CAPABOOK_MEM };

        let tTypeVal = _dataEDT_KSV_CAPABOOK_MEM[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_CAPABOOK_MEM[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_CAPABOOK_MEM[`${name}`] = parseInt(val);

        setDataEDT_KSV_CAPABOOK_MEM(_dataEDT_KSV_CAPABOOK_MEM);
    };

    const onInputChangeEDT_KSV_CAPABOOK_MEM_STYLE_CD = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_CAPABOOK_MEM = { ...dataEDT_KSV_CAPABOOK_MEM };

        let tTypeVal = _dataEDT_KSV_CAPABOOK_MEM[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_CAPABOOK_MEM[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_CAPABOOK_MEM[`${name}`] = parseInt(val);

        setDataEDT_KSV_CAPABOOK_MEM(_dataEDT_KSV_CAPABOOK_MEM);
    };

    const onInputChangeEDT_KSV_CAPABOOK_MEM_STYLE_NAME = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_CAPABOOK_MEM = { ...dataEDT_KSV_CAPABOOK_MEM };

        let tTypeVal = _dataEDT_KSV_CAPABOOK_MEM[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_CAPABOOK_MEM[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_CAPABOOK_MEM[`${name}`] = parseInt(val);

        setDataEDT_KSV_CAPABOOK_MEM(_dataEDT_KSV_CAPABOOK_MEM);
    };

    const onInputChangeEDT_KSV_CAPABOOK_MEM_BUYER_CD = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_CAPABOOK_MEM = { ...dataEDT_KSV_CAPABOOK_MEM };

        let tTypeVal = _dataEDT_KSV_CAPABOOK_MEM[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_CAPABOOK_MEM[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_CAPABOOK_MEM[`${name}`] = parseInt(val);

        setDataEDT_KSV_CAPABOOK_MEM(_dataEDT_KSV_CAPABOOK_MEM);
    };

    // const onInputChangeEDT_KSV_CAPABOOK_MEM_BUYER_CD = (e, name) => {
    //     let val = (e.target && e.target.value) || '';

    //     let _dataEDT_KSV_CAPABOOK_MEM = { ...dataEDT_KSV_CAPABOOK_MEM };

    //     let tTypeVal = _dataEDT_KSV_CAPABOOK_MEM[`${name}`];
    //     if (typeof tTypeVal === "string") _dataEDT_KSV_CAPABOOK_MEM[`${name}`] = val;
    //     else if (typeof tTypeVal === "number") _dataEDT_KSV_CAPABOOK_MEM[`${name}`] = parseInt(val);

    //     setDataEDT_KSV_CAPABOOK_MEM(_dataEDT_KSV_CAPABOOK_MEM);
    // }

    const onInputChangeEDT_KSV_CAPABOOK_MEM_PO_CD = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_CAPABOOK_MEM = { ...dataEDT_KSV_CAPABOOK_MEM };

        let tTypeVal = _dataEDT_KSV_CAPABOOK_MEM[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_CAPABOOK_MEM[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_CAPABOOK_MEM[`${name}`] = parseInt(val);

        setDataEDT_KSV_CAPABOOK_MEM(_dataEDT_KSV_CAPABOOK_MEM);
    };

    const onInputChangeEDT_KSV_CAPABOOK_MEM_ORDER_CD = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_CAPABOOK_MEM = { ...dataEDT_KSV_CAPABOOK_MEM };

        let tTypeVal = _dataEDT_KSV_CAPABOOK_MEM[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_CAPABOOK_MEM[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_CAPABOOK_MEM[`${name}`] = parseInt(val);

        setDataEDT_KSV_CAPABOOK_MEM(_dataEDT_KSV_CAPABOOK_MEM);
    };

    const onInputChangeEDT_KSV_CAPABOOK_MEM_QTY = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_CAPABOOK_MEM = { ...dataEDT_KSV_CAPABOOK_MEM };

        let tTypeVal = _dataEDT_KSV_CAPABOOK_MEM[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_CAPABOOK_MEM[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_CAPABOOK_MEM[`${name}`] = parseInt(val);

        setDataEDT_KSV_CAPABOOK_MEM(_dataEDT_KSV_CAPABOOK_MEM);
    };

    const onInputChangeEDT_KSV_CAPABOOK_MEM_COLOR = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_CAPABOOK_MEM = { ...dataEDT_KSV_CAPABOOK_MEM };

        let tTypeVal = _dataEDT_KSV_CAPABOOK_MEM[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_CAPABOOK_MEM[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_CAPABOOK_MEM[`${name}`] = parseInt(val);

        setDataEDT_KSV_CAPABOOK_MEM(_dataEDT_KSV_CAPABOOK_MEM);
    };

    const onInputChangeEDT_KSV_CAPABOOK_MEM_USE_SIZE = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_CAPABOOK_MEM = { ...dataEDT_KSV_CAPABOOK_MEM };

        let tTypeVal = _dataEDT_KSV_CAPABOOK_MEM[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_CAPABOOK_MEM[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_CAPABOOK_MEM[`${name}`] = parseInt(val);

        setDataEDT_KSV_CAPABOOK_MEM(_dataEDT_KSV_CAPABOOK_MEM);
    };

    const [
        datasEDT_KSV_CAPABOOK_MEM_USAGE,
        setDatasEDT_KSV_CAPABOOK_MEM_USAGE,
    ] = useState([]);
    const [dataEDT_KSV_CAPABOOK_MEM_USAGE, setDataEDT_KSV_CAPABOOK_MEM_USAGE] =
        useState({});

    const onDropdownChangeEDT_KSV_CAPABOOK_MEM_USAGE = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataEDT_KSV_CAPABOOK_MEM = { ...dataEDT_KSV_CAPABOOK_MEM };

        let tTypeVal = _dataEDT_KSV_CAPABOOK_MEM[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_KSV_CAPABOOK_MEM[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_KSV_CAPABOOK_MEM[`${name}`] = parseInt(val);
        }

        setDataEDT_KSV_CAPABOOK_MEM(_dataEDT_KSV_CAPABOOK_MEM);
        setDataEDT_KSV_CAPABOOK_MEM_USAGE(e.value);
    };

    const [datasEDT_KSV_CAPABOOK_MEM_NR, setDatasEDT_KSV_CAPABOOK_MEM_NR] =
        useState([]);
    const [dataEDT_KSV_CAPABOOK_MEM_NR, setDataEDT_KSV_CAPABOOK_MEM_NR] =
        useState({});

    const onInputChangeEDT_KSV_CAPABOOK_MEM_REMARK = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_CAPABOOK_MEM = { ...dataEDT_KSV_CAPABOOK_MEM };

        let tTypeVal = _dataEDT_KSV_CAPABOOK_MEM[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_CAPABOOK_MEM[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_CAPABOOK_MEM[`${name}`] = parseInt(val);

        setDataEDT_KSV_CAPABOOK_MEM(_dataEDT_KSV_CAPABOOK_MEM);
    };

    const onInputChangeEDT_KSV_CAPABOOK_MEM_MW = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_CAPABOOK_MEM = { ...dataEDT_KSV_CAPABOOK_MEM };

        let tTypeVal = _dataEDT_KSV_CAPABOOK_MEM[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_CAPABOOK_MEM[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_CAPABOOK_MEM[`${name}`] = parseInt(val);

        setDataEDT_KSV_CAPABOOK_MEM(_dataEDT_KSV_CAPABOOK_MEM);
    };

    const onCalChangeEDT_KSV_CAPABOOK_MEM_S_ETA = (e, name) => {
        let val1 = e.value || "";
        let val = "";
        if (val1 === "") {
            val = "";
        } else {
            val = getDateVal(val1);
        }

        let _dataEDT_KSV_CAPABOOK_MEM = { ...dataEDT_KSV_CAPABOOK_MEM };
        _dataEDT_KSV_CAPABOOK_MEM[`${name}`] = val;
        setDataEDT_KSV_CAPABOOK_MEM(_dataEDT_KSV_CAPABOOK_MEM);
    };

    // const onCalChangeEDT_KSV_CAPABOOK_MEM_S_ETA = (e, name) => {
    //     let val1 = e.value || '';
    //     let val = '';
    //     if (val1 === '') {
    //         val = '';
    //     } else {
    //         val = getDateVal(val1);
    //     }

    //     let _dataEDT_KSV_CAPABOOK_MEM = { ...dataEDT_KSV_CAPABOOK_MEM };
    //     _dataEDT_KSV_CAPABOOK_MEM[`${name}`] = val;
    //     setDataEDT_KSV_CAPABOOK_MEM(_dataEDT_KSV_CAPABOOK_MEM);

    // }

    const onCalChangeEDT_KSV_CAPABOOK_MEM_M_ETA = (e, name) => {
        let val1 = e.value || "";
        let val = "";
        if (val1 === "") {
            val = "";
        } else {
            val = getDateVal(val1);
        }

        let _dataEDT_KSV_CAPABOOK_MEM = { ...dataEDT_KSV_CAPABOOK_MEM };
        _dataEDT_KSV_CAPABOOK_MEM[`${name}`] = val;
        setDataEDT_KSV_CAPABOOK_MEM(_dataEDT_KSV_CAPABOOK_MEM);
    };

    const onInputChangeEDT_KSV_CAPABOOK_MEM_EXP_CMPT = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_CAPABOOK_MEM = { ...dataEDT_KSV_CAPABOOK_MEM };

        let tTypeVal = _dataEDT_KSV_CAPABOOK_MEM[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_CAPABOOK_MEM[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_CAPABOOK_MEM[`${name}`] = parseInt(val);

        setDataEDT_KSV_CAPABOOK_MEM(_dataEDT_KSV_CAPABOOK_MEM);
    };

    const [
        datasEDT_KSV_CAPABOOK_MEM_BVT_KIND,
        setDatasEDT_KSV_CAPABOOK_MEM_BVT_KIND,
    ] = useState([]);
    const [
        dataEDT_KSV_CAPABOOK_MEM_BVT_KIND,
        setDataEDT_KSV_CAPABOOK_MEM_BVT_KIND,
    ] = useState({});

    const onDropdownChangeEDT_KSV_CAPABOOK_MEM_BVT_KIND = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataEDT_KSV_CAPABOOK_MEM = { ...dataEDT_KSV_CAPABOOK_MEM };

        let tTypeVal = _dataEDT_KSV_CAPABOOK_MEM[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_KSV_CAPABOOK_MEM[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_KSV_CAPABOOK_MEM[`${name}`] = parseInt(val);
        }

        setDataEDT_KSV_CAPABOOK_MEM(_dataEDT_KSV_CAPABOOK_MEM);
        setDataEDT_KSV_CAPABOOK_MEM_BVT_KIND(e.value);
    };

    const onInputChangeEDT_KSV_CAPABOOK_MEM_TPR = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_CAPABOOK_MEM = { ...dataEDT_KSV_CAPABOOK_MEM };

        let tTypeVal = _dataEDT_KSV_CAPABOOK_MEM[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_CAPABOOK_MEM[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_CAPABOOK_MEM[`${name}`] = parseInt(val);

        setDataEDT_KSV_CAPABOOK_MEM(_dataEDT_KSV_CAPABOOK_MEM);
    };

    const onInputChangeEDT_KSV_CAPABOOK_MEM_EMBOSSING = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_CAPABOOK_MEM = { ...dataEDT_KSV_CAPABOOK_MEM };

        let tTypeVal = _dataEDT_KSV_CAPABOOK_MEM[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_CAPABOOK_MEM[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_CAPABOOK_MEM[`${name}`] = parseInt(val);

        setDataEDT_KSV_CAPABOOK_MEM(_dataEDT_KSV_CAPABOOK_MEM);
    };

    const onInputChangeEDT_KSV_CAPABOOK_MEM_WASHING = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_CAPABOOK_MEM = { ...dataEDT_KSV_CAPABOOK_MEM };

        let tTypeVal = _dataEDT_KSV_CAPABOOK_MEM[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_CAPABOOK_MEM[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_CAPABOOK_MEM[`${name}`] = parseInt(val);

        setDataEDT_KSV_CAPABOOK_MEM(_dataEDT_KSV_CAPABOOK_MEM);
    };

    const onInputChangeEDT_KSV_CAPABOOK_MEM_DL = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_CAPABOOK_MEM = { ...dataEDT_KSV_CAPABOOK_MEM };

        let tTypeVal = _dataEDT_KSV_CAPABOOK_MEM[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_CAPABOOK_MEM[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_CAPABOOK_MEM[`${name}`] = parseInt(val);

        setDataEDT_KSV_CAPABOOK_MEM(_dataEDT_KSV_CAPABOOK_MEM);
    };

    const onInputChangeEDT_KSV_CAPABOOK_MEM_S = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_CAPABOOK_MEM = { ...dataEDT_KSV_CAPABOOK_MEM };

        let tTypeVal = _dataEDT_KSV_CAPABOOK_MEM[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_CAPABOOK_MEM[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_CAPABOOK_MEM[`${name}`] = parseInt(val);

        setDataEDT_KSV_CAPABOOK_MEM(_dataEDT_KSV_CAPABOOK_MEM);
    };

    const onInputChangeEDT_KSV_CAPABOOK_MEM_FND = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_CAPABOOK_MEM = { ...dataEDT_KSV_CAPABOOK_MEM };

        let tTypeVal = _dataEDT_KSV_CAPABOOK_MEM[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_CAPABOOK_MEM[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_CAPABOOK_MEM[`${name}`] = parseInt(val);

        setDataEDT_KSV_CAPABOOK_MEM(_dataEDT_KSV_CAPABOOK_MEM);
    };

    const onInputChangeEDT_KSV_CAPABOOK_MEM_EMBRO = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_CAPABOOK_MEM = { ...dataEDT_KSV_CAPABOOK_MEM };

        let tTypeVal = _dataEDT_KSV_CAPABOOK_MEM[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_CAPABOOK_MEM[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_CAPABOOK_MEM[`${name}`] = parseInt(val);

        setDataEDT_KSV_CAPABOOK_MEM(_dataEDT_KSV_CAPABOOK_MEM);
    };

    const onInputChangeEDT_KSV_CAPABOOK_MEM_TP = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_CAPABOOK_MEM = { ...dataEDT_KSV_CAPABOOK_MEM };

        let tTypeVal = _dataEDT_KSV_CAPABOOK_MEM[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_CAPABOOK_MEM[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_CAPABOOK_MEM[`${name}`] = parseInt(val);

        setDataEDT_KSV_CAPABOOK_MEM(_dataEDT_KSV_CAPABOOK_MEM);
    };

    const onInputChangeEDT_KSV_CAPABOOK_MEM_SP = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_CAPABOOK_MEM = { ...dataEDT_KSV_CAPABOOK_MEM };

        let tTypeVal = _dataEDT_KSV_CAPABOOK_MEM[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_CAPABOOK_MEM[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_CAPABOOK_MEM[`${name}`] = parseInt(val);

        setDataEDT_KSV_CAPABOOK_MEM(_dataEDT_KSV_CAPABOOK_MEM);
    };

    const onInputChangeEDT_KSV_CAPABOOK_MEM_LTHR = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_CAPABOOK_MEM = { ...dataEDT_KSV_CAPABOOK_MEM };

        let tTypeVal = _dataEDT_KSV_CAPABOOK_MEM[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_CAPABOOK_MEM[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_CAPABOOK_MEM[`${name}`] = parseInt(val);

        setDataEDT_KSV_CAPABOOK_MEM(_dataEDT_KSV_CAPABOOK_MEM);
    };

    const onInputChangeEDT_KSV_CAPABOOK_MEM_G = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_CAPABOOK_MEM = { ...dataEDT_KSV_CAPABOOK_MEM };

        let tTypeVal = _dataEDT_KSV_CAPABOOK_MEM[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_CAPABOOK_MEM[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_CAPABOOK_MEM[`${name}`] = parseInt(val);

        setDataEDT_KSV_CAPABOOK_MEM(_dataEDT_KSV_CAPABOOK_MEM);
    };

    const onInputChangeEDT_KSV_CAPABOOK_MEM_W = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_CAPABOOK_MEM = { ...dataEDT_KSV_CAPABOOK_MEM };

        let tTypeVal = _dataEDT_KSV_CAPABOOK_MEM[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_CAPABOOK_MEM[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_CAPABOOK_MEM[`${name}`] = parseInt(val);

        setDataEDT_KSV_CAPABOOK_MEM(_dataEDT_KSV_CAPABOOK_MEM);
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
                    <p style={{ width: "8rem", display: "inline-block" }}>Last Date</p>
                    <InputText
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "23rem",
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
                        width: "33rem",
                    }}
                >
                    <p style={{ width: "8rem", display: "inline-block" }}>User</p>
                    <InputText
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "23rem",
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
                    height: "18rem",
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
                    virtualScrollerOptions={{ itemSize: 8 }}
                    emptyMessage=" "
                    //header={headerTBL_KSV_CAPABOOK_MEM}
                    responsiveLayout="scroll"
                    scrollable
                    scrollHeight="16rem"
                >
                    <AFColumn field="JOB_CD" headerClassName="t-header" header="Job CD" style={{ width: "4rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="MONTH" headerClassName="t-header" header="month" style={{ width: "4rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="IN_DATE" headerClassName="t-header" header="Book Date" style={{ width: "8rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="BUYER_NAME" headerClassName="t-header" header="Buyer Name" style={{ width: "8rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="BUYER_CD" headerClassName="t-header" header="Buyer CD" style={{ width: "8rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="PO_CD" headerClassName="t-header" header="po#" style={{ width: "8rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="ORDER_CD" headerClassName="t-header" header="Order#" style={{ width: "8rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="STYLE_NAME" headerClassName="t-header" header="Style Name" style={{ width: "15rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="STYLE_CD" headerClassName="t-header" header="Style CD" style={{ width: "8rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="NR" headerClassName="t-header" header="N/R" style={{ width: "8rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="QTY" headerClassName="t-header" header="Qty" style={{ width: "8rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="STS_QTY" headerClassName="t-header" header="Sts Qty" style={{ width: "8rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="COLOR" headerClassName="t-header" header="Color" style={{ width: "8rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="USE_SIZE" headerClassName="t-header" header="Size" style={{ width: "8rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="USAGE_NAME" headerClassName="t-header" header="Usage" style={{ width: "8rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="USAGE" headerClassName="t-header" header="Usage CD" style={{ width: "8rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="MW" headerClassName="t-header" header="M/W" style={{ width: "8rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="SHIP_DATE" headerClassName="t-header" header="Ship Date" style={{ width: "8rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="S_ETA" headerClassName="t-header" header="S ETA" style={{ width: "8rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="M_ETA" headerClassName="t-header" header="M ETA" style={{ width: "8rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="SD" headerClassName="t-header" header="S/D" style={{ width: "8rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="FOB" headerClassName="t-header" header="FOB" style={{ width: "8rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="EXP_CMPT" headerClassName="t-header" header="Exp CMPT" style={{ width: "8rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="NEGO_TYPE" headerClassName="t-header" header="Nego TYPE" style={{ width: "8rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="EMBRO" headerClassName="t-header" header="EMBRO" style={{ width: "8rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="TP" headerClassName="t-header" header="T/P" style={{ width: "8rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="SP" headerClassName="t-header" header="S/P" style={{ width: "8rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="LTHR" headerClassName="t-header" header="LTHR" style={{ width: "8rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="G" headerClassName="t-header" header="G" style={{ width: "8rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="W" headerClassName="t-header" header="W" style={{ width: "8rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="S" headerClassName="t-header" header="S" style={{ width: "8rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="FND" headerClassName="t-header" header="FND" style={{ width: "8rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="DL" headerClassName="t-header" header="DL" style={{ width: "8rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="TPR" headerClassName="t-header" header="TPR" style={{ width: "8rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="EMBOSSING" headerClassName="t-header" header="EMBOSSING" style={{ width: "8rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="WASHING" headerClassName="t-header" header="WASHING" style={{ width: "8rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="DOWN" headerClassName="t-header" header="DOWN" style={{ width: "8rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="CUT" headerClassName="t-header" header="CUT" style={{ width: "8rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="FTP" headerClassName="t-header" header="FTP" style={{ width: "8rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="DTP" headerClassName="t-header" header="DTP" style={{ width: "8rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="LAZE" headerClassName="t-header" header="LAZE" style={{ width: "8rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="BVT_KIND" headerClassName="t-header" header="BVT KIND" style={{ width: "8rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="SEQ" headerClassName="t-header" header="SEQ" style={{ width: "8rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="REMARK" headerClassName="t-header" header="Remark" style={{ width: "8rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                </AFDataTable>
            </div>
            <Divider />

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
                    <p style={{ width: "8rem", display: "inline-block" }}>Book Date</p>
                    <InputText
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "23rem",
                        }}
                        id="id_BOOK_DATE"
                        value={dataQRY_KSV_CAPABOOK_MEM1.BOOK_DATE}
                        onChange={(e) =>
                            onInputChangeQRY_KSV_CAPABOOK_MEM1_BOOK_DATE(
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
                        width: "33rem",
                    }}
                >
                    <p style={{ width: "8rem", display: "inline-block" }}>PO$</p>
                    <InputText
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "23rem",
                        }}
                        id="id_PO_CD"
                        value={dataQRY_KSV_CAPABOOK_MEM1.PO_CD}
                        onChange={(e) =>
                            onInputChangeQRY_KSV_CAPABOOK_MEM1_PO_CD(e, "PO_CD")
                        }
                    />
                </span>
                <span style={{ display: "inline-block" }}>
                    <Button
                        label={
                            <span>
                                Search(<u>S</u>)
                            </span>
                        }
                        id="btnSearch"
                        icon="pi pi-search"
                        style={{ height: "1.1rem" }}
                        className="p-button-text"
                        onClick={searchTBL_KSV_CAPABOOK_MEM1}
                    />

                    <Button
                        label="Excel"
                        icon="pi pi-upload"
                        style={{ height: "1.1rem" }}
                        className="p-button-text green"
                        onClick={exportExcelTBL_KSV_CAPABOOK_MEM1}
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
                    ref={dt_TBL_KSV_CAPABOOK_MEM1}
                    size="small"
                    value={datasTBL_KSV_CAPABOOK_MEM1}
                    resizableColumns
                    columnResizeMode="fit"
                    showGridlines
                    selectionMode="checkbox"
                    selection={selectedTBL_KSV_CAPABOOK_MEM1}
                    onSelectionChange={(e) => {
                        setFlagSelectModeTBL_KSV_CAPABOOK_MEM1(true);
                        setSelectedTBL_KSV_CAPABOOK_MEM1(e.value);
                        console.log(
                            "selected length:" +
                                selectedTBL_KSV_CAPABOOK_MEM1.length,
                        );
                        onRowClick1TBL_KSV_CAPABOOK_MEM1(e.value);
                    }}
                    onRowClick={onRowClickTBL_KSV_CAPABOOK_MEM1}
                    dataKey="id"
                    className="datatable-responsive"
                    virtualScrollerOptions={{ itemSize: 13 }}
                    emptyMessage=" "
                    //header={headerTBL_KSV_CAPABOOK_MEM1}
                    responsiveLayout="scroll"
                    scrollable
                    scrollHeight="26rem"
                >
                    <AFColumn field="JOB_CD" headerClassName="t-header" header="Job CD" style={{ width: "4rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="MONTH" headerClassName="t-header" header="Month" style={{ width: "4rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="IN_DATE" headerClassName="t-header" header="Book Date" style={{ width: "8rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="BUYER_NAME" headerClassName="t-header" header="Buyer Name" style={{ width: "8rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="BUYER_CD" headerClassName="t-header" header="Buyer CD" style={{ width: "8rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="PO_CD" headerClassName="t-header" header="po#" style={{ width: "8rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="ORDER_CD" headerClassName="t-header" header="Order#" style={{ width: "8rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="STYLE_NAME" headerClassName="t-header" header="Style Name" style={{ width: "15rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="STYLE_CD" headerClassName="t-header" header="Style CD" style={{ width: "8rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="NR" headerClassName="t-header" header="N/R" style={{ width: "8rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="QTY" headerClassName="t-header" header="Qty" style={{ width: "8rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="STS_QTY" headerClassName="t-header" header="Sts Qty" style={{ width: "8rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="COLOR" headerClassName="t-header" header="Color" style={{ width: "8rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="USE_SIZE" headerClassName="t-header" header="Size" style={{ width: "8rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="USAGE_NAME" headerClassName="t-header" header="Usage" style={{ width: "8rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="USAGE" headerClassName="t-header" header="Usage CD" style={{ width: "8rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="MW" headerClassName="t-header" header="M/W" style={{ width: "8rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="SHIP_DATE" headerClassName="t-header" header="Ship Date" style={{ width: "8rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="S_ETA" headerClassName="t-header" header="S ETA" style={{ width: "8rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="M_ETA" headerClassName="t-header" header="M ETA" style={{ width: "8rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="SD" headerClassName="t-header" header="S/D" style={{ width: "8rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="FOB" headerClassName="t-header" header="FOB" style={{ width: "8rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="EXP_CMPT" headerClassName="t-header" header="Exp CMPT" style={{ width: "8rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="NEGO_TYPE" headerClassName="t-header" header="Nego TYPE" style={{ width: "8rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="EMBRO" headerClassName="t-header" header="EMBRO" style={{ width: "8rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="TP" headerClassName="t-header" header="T/P" style={{ width: "8rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="SP" headerClassName="t-header" header="S/P" style={{ width: "8rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="LTHR" headerClassName="t-header" header="LTHR" style={{ width: "8rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="G" headerClassName="t-header" header="G" style={{ width: "8rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="W" headerClassName="t-header" header="W" style={{ width: "8rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="S" headerClassName="t-header" header="S" style={{ width: "8rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="FND" headerClassName="t-header" header="FND" style={{ width: "8rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="DL" headerClassName="t-header" header="DL" style={{ width: "8rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="TPR" headerClassName="t-header" header="TPR" style={{ width: "8rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="EMBOSSING" headerClassName="t-header" header="EMBOSSING" style={{ width: "8rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="WASHING" headerClassName="t-header" header="WASHING" style={{ width: "8rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="DOWN" headerClassName="t-header" header="DOWN" style={{ width: "8rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="CUT" headerClassName="t-header" header="CUT" style={{ width: "8rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="FTP" headerClassName="t-header" header="FTP" style={{ width: "8rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="DTP" headerClassName="t-header" header="DTP" style={{ width: "8rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="LAZE" headerClassName="t-header" header="LAZE" style={{ width: "8rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="BVT_KIND" headerClassName="t-header" header="BVT KIND" style={{ width: "8rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="SEQ" hheaderClassName="t-header" eader="SEQ" style={{ width: "8rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="REMARK" headerClassName="t-header" header="Remark" style={{ width: "8rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                </AFDataTable>
            </div>

            <Divider />

            <div style={{ width: "100rem", height: "18rem" }}>
                <div className="flex flex-row justify-content-start align-items-top">
                    <div style={{ width: "55rem", height: "18rem" }}>
                        <span
                            style={{
                                marginLeft: "0.5rem",
                                height: "2rem",
                                display: "inline-block",
                                width: "24rem",
                            }}
                        >
                            <p style={{ width: "8rem", display: "inline-block", }}>MONTH</p>
                            <InputText
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "15rem",
                                }}
                                id="id_MONTH"
                                value={dataEDT_KSV_CAPABOOK_MEM.MONTH}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_CAPABOOK_MEM_MONTH(
                                        e,
                                        "MONTH",
                                    )
                                }
                            />
                        </span>
                        <span
                            style={{
                                marginLeft: "0.5rem",
                                height: "2rem",
                                display: "inline-block",
                                width: "24rem",
                            }}
                        >
                            <p style={{ width: "8rem", display: "inline-block", }}>Book Date</p>
                            <Calendar
                                showButtonBar
                                dateFormat="yy-mm-dd"
                                style={{ marginLeft: "0.5rem", width: "15rem" }}
                                id="id_IN_DATE"
                                value={dataEDT_KSV_CAPABOOK_MEM.IN_DATE}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_CAPABOOK_MEM_IN_DATE(
                                        e,
                                        "IN_DATE",
                                    )
                                }
                            />
                        </span>
                        <span
                            style={{
                                marginLeft: "0.5rem",
                                height: "2rem",
                                display: "inline-block",
                                width: "51rem",
                            }}
                        >
                            <p style={{ width: "8rem", display: "inline-block", }}>Style CD</p>
                            <InputText
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "15rem",
                                }}
                                id="id_STYLE_CD"
                                value={dataEDT_KSV_CAPABOOK_MEM.STYLE_CD}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_CAPABOOK_MEM_STYLE_CD(
                                        e,
                                        "STYLE_CD",
                                    )
                                }
                            />
                        </span>
                        <span
                            style={{
                                marginLeft: "0.5rem",
                                height: "2rem",
                                display: "inline-block",
                                width: "51rem",
                            }}
                        >
                            <p style={{ width: "8rem", display: "inline-block", }}>Style Name</p>
                            <InputText
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "28rem",
                                }}
                                id="id_STYLE_NAME"
                                value={dataEDT_KSV_CAPABOOK_MEM.STYLE_NAME}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_CAPABOOK_MEM_STYLE_NAME(
                                        e,
                                        "STYLE_NAME",
                                    )
                                }
                            />

                            <div style={{ display: "inline-block" }}>
                                <Button
                                    style={{
                                        display: "inline-block",
                                        width: "8rem",
                                        height: "2rem",
                                    }}
                                    label={
                                        <span>
                                            Search(<u>S</u>)
                                        </span>
                                    }
                                    icon="pi pi-check"
                                    className="p-button-text"
                                    onClick={blankFn}
                                ></Button>
                            </div>
                        </span>
                        <span
                            style={{
                                marginLeft: "0.5rem",
                                marginTop: "0.5rem",
                                height: "2rem",
                                display: "inline-block",
                                width: "51rem",
                            }}
                        >
                            <p style={{ width: "8rem", display: "inline-block", }}>Buyer CD</p>
                            <Dropdown
                                style={{ marginLeft: "0.5rem", width: "35rem" }}
                                id="id_BUYER_CD"
                                value={dataEDT_KSV_CAPABOOK_MEM.BUYER_CD}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_CAPABOOK_MEM_BUYER_CD(
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
                                width: "24rem",
                            }}
                        >
                            <p style={{ width: "8rem", display: "inline-block", }}>Order#</p>
                            <InputText
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "7rem",
                                }}
                                id="id_ORDER_CD"
                                value={dataEDT_KSV_CAPABOOK_MEM.ORDER_CD}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_CAPABOOK_MEM_ORDER_CD(
                                        e,
                                        "ORDER_CD",
                                    )
                                }
                            />

                            <div style={{ display: "inline-block" }}>
                                <Button
                                    style={{
                                        display: "inline-block",
                                        width: "8rem",
                                        height: "2rem",
                                    }}
                                    label="refresh"
                                    icon="pi pi-check"
                                    className="p-button-text"
                                    onClick={blankFn}
                                ></Button>
                            </div>
                        </span>
                        <span
                            style={{
                                marginLeft: "0.5rem",
                                height: "2rem",
                                display: "inline-block",
                                width: "24rem",
                            }}
                        >
                            <p style={{ width: "8rem", display: "inline-block", }}>Kind#</p>
                            <Dropdown
                                style={{ marginLeft: "0.5rem", width: "15rem" }}
                                id="id_ORDER_CD"
                            />
                        </span>
                        <span
                            style={{
                                marginLeft: "0.5rem",
                                height: "2rem",
                                display: "inline-block",
                                width: "24rem",
                            }}
                        >
                            <p style={{ width: "8rem", display: "inline-block", }}>po#</p>
                            <InputText
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "7rem",
                                }}
                                id="id_PO_CD"
                                value={dataEDT_KSV_CAPABOOK_MEM.PO_CD}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_CAPABOOK_MEM_PO_CD(
                                        e,
                                        "PO_CD",
                                    )
                                }
                            />
                        </span>
                        <span
                            style={{
                                marginLeft: "0.5rem",
                                height: "2rem",
                                display: "inline-block",
                                width: "24rem",
                            }}
                        >
                            <p style={{ width: "8rem", display: "inline-block", }}>Color</p>
                            <InputText
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "15rem",
                                }}
                                id="id_COLOR"
                                value={dataEDT_KSV_CAPABOOK_MEM.COLOR}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_CAPABOOK_MEM_COLOR(
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
                                width: "24rem",
                            }}
                        >
                            <p style={{ width: "8rem", display: "inline-block", }}>Qty</p>
                            <InputText
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "5rem",
                                }}
                                id="id_QTY"
                                value={dataEDT_KSV_CAPABOOK_MEM.QTY}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_CAPABOOK_MEM_QTY(
                                        e,
                                        "QTY",
                                    )
                                }
                            />

                            <p style={{ width: "1rem", display: "inline-block", }}>/</p>
                            <InputText
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "5rem",
                                }}
                                id="id_QTY"
                                value={dataEDT_KSV_CAPABOOK_MEM.QTY}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_CAPABOOK_MEM_QTY(
                                        e,
                                        "QTY",
                                    )
                                }
                            />
                        </span>
                        <span
                            style={{
                                marginLeft: "0.5rem",
                                height: "2rem",
                                display: "inline-block",
                                width: "24rem",
                            }}
                        >
                            <p style={{ width: "8rem", display: "inline-block", }}>Size</p>
                            <InputText
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "15rem",
                                }}
                                id="id_USE_SIZE"
                                value={dataEDT_KSV_CAPABOOK_MEM.USE_SIZE}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_CAPABOOK_MEM_USE_SIZE(
                                        e,
                                        "USE_SIZE",
                                    )
                                }
                            />
                        </span>
                        <span
                            style={{
                                marginLeft: "0.5rem",
                                height: "2rem",
                                display: "inline-block",
                                width: "51rem",
                            }}
                        >
                            <p style={{ width: "8rem", display: "inline-block", }}>Remark</p>
                            <InputText
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "39.5rem",
                                }}
                                id="id_REMARK"
                                value={dataEDT_KSV_CAPABOOK_MEM.REMARK}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_CAPABOOK_MEM_REMARK(
                                        e,
                                        "REMARK",
                                    )
                                }
                            />
                        </span>
                    </div>

                    <div style={{ width: "45rem", height: "18rem" }}>
                        <span
                            style={{
                                marginLeft: "0.5rem",
                                height: "2rem",
                                display: "inline-block",
                                width: "17rem",
                            }}
                        >
                            <p style={{ width: "8rem", display: "inline-block", }}>M/W</p>
                            <InputText
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "8rem",
                                }}
                                id="id_MW"
                                value={dataEDT_KSV_CAPABOOK_MEM.MW}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_CAPABOOK_MEM_MW(
                                        e,
                                        "MW",
                                    )
                                }
                            />
                        </span>
                        <span
                            style={{
                                marginLeft: "0.5rem",
                                height: "2rem",
                                display: "inline-block",
                                width: "12rem",
                            }}
                        >
                            <p style={{ width: "8rem", display: "inline-block", }}>TPR</p>
                            <InputText
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "3rem",
                                }}
                                id="id_TPR"
                                value={dataEDT_KSV_CAPABOOK_MEM.TPR}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_CAPABOOK_MEM_TPR(
                                        e,
                                        "TPR",
                                    )
                                }
                            />
                        </span>
                        <span
                            style={{
                                marginLeft: "0.5rem",
                                height: "2rem",
                                display: "inline-block",
                                width: "12rem",
                            }}
                        >
                            <p style={{ width: "8rem", display: "inline-block", }}>EMBRODERY</p>
                            <InputText
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "3rem",
                                }}
                                id="id_EMBRO"
                                value={dataEDT_KSV_CAPABOOK_MEM.EMBRO}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_CAPABOOK_MEM_EMBRO(
                                        e,
                                        "EMBRO",
                                    )
                                }
                            />
                        </span>
                        <span
                            style={{
                                marginLeft: "0.5rem",
                                height: "2rem",
                                display: "inline-block",
                                width: "17rem",
                            }}
                        >
                            <p style={{ width: "8rem", display: "inline-block", }}>SHIP DATE</p>
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
                                    id="id_S_ETA"
                                    value={changeDateVal(
                                        dataEDT_KSV_CAPABOOK_MEM.S_ETA,
                                    )}
                                    onChange={(e) =>
                                        onCalChangeEDT_KSV_CAPABOOK_MEM_S_ETA(
                                            e,
                                            "S_ETA",
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
                                width: "12rem",
                            }}
                        >
                            <p style={{ width: "8rem", display: "inline-block", }}>S</p>
                            <InputText
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "3rem",
                                }}
                                id="id_S"
                                value={dataEDT_KSV_CAPABOOK_MEM.S}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_CAPABOOK_MEM_S(e, "S")
                                }
                            />
                        </span>
                        <span
                            style={{
                                marginLeft: "0.5rem",
                                height: "2rem",
                                display: "inline-block",
                                width: "12rem",
                            }}
                        >
                            <p style={{ width: "8rem", display: "inline-block", }}>T/P</p>
                            <InputText
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "3rem",
                                }}
                                id="id_TP"
                                value={dataEDT_KSV_CAPABOOK_MEM.TP}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_CAPABOOK_MEM_TP(
                                        e,
                                        "TP",
                                    )
                                }
                            />
                        </span>
                        <span
                            style={{
                                marginLeft: "0.5rem",
                                height: "2rem",
                                display: "inline-block",
                                width: "17rem",
                            }}
                        >
                            <p style={{ width: "8rem", display: "inline-block", }}>M ETA</p>
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
                                    id="id_M_ETA"
                                    value={changeDateVal(
                                        dataEDT_KSV_CAPABOOK_MEM.M_ETA,
                                    )}
                                    onChange={(e) =>
                                        onCalChangeEDT_KSV_CAPABOOK_MEM_M_ETA(
                                            e,
                                            "M_ETA",
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
                                width: "12rem",
                            }}
                        >
                            <p style={{ width: "8rem", display: "inline-block", }}>4ND</p>
                            <InputText
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "3rem",
                                }}
                                id="id_FND"
                                value={dataEDT_KSV_CAPABOOK_MEM.FND}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_CAPABOOK_MEM_FND(
                                        e,
                                        "FND",
                                    )
                                }
                            />
                        </span>
                        <span
                            style={{
                                marginLeft: "0.5rem",
                                height: "2rem",
                                display: "inline-block",
                                width: "12rem",
                            }}
                        >
                            <p style={{ width: "8rem", display: "inline-block", }}>S/P</p>
                            <InputText
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "3rem",
                                }}
                                id="id_SP"
                                value={dataEDT_KSV_CAPABOOK_MEM.SP}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_CAPABOOK_MEM_SP(
                                        e,
                                        "SP",
                                    )
                                }
                            />
                        </span>
                        <span
                            style={{
                                marginLeft: "0.5rem",
                                height: "2rem",
                                display: "inline-block",
                                width: "17rem",
                            }}
                        >
                            <p style={{ width: "8rem", display: "inline-block", }}>W/Sheet ETA</p>
                            <InputText
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "8rem",
                                }}
                                id="id_SP"
                            />
                        </span>
                        <span
                            style={{
                                marginLeft: "0.5rem",
                                height: "2rem",
                                display: "inline-block",
                                width: "12rem",
                            }}
                        >
                            <p style={{ width: "8rem", display: "inline-block", }}>D/L</p>
                            <InputText
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "3rem",
                                }}
                                id="id_DL"
                                value={dataEDT_KSV_CAPABOOK_MEM.DL}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_CAPABOOK_MEM_DL(
                                        e,
                                        "DL",
                                    )
                                }
                            />
                        </span>
                        <span
                            style={{
                                marginLeft: "0.5rem",
                                height: "2rem",
                                display: "inline-block",
                                width: "12rem",
                            }}
                        >
                            <p style={{ width: "8rem", display: "inline-block", }}>LTHR</p>
                            <InputText
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "3rem",
                                }}
                                id="id_LTHR"
                                value={dataEDT_KSV_CAPABOOK_MEM.LTHR}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_CAPABOOK_MEM_LTHR(
                                        e,
                                        "LTHR",
                                    )
                                }
                            />
                        </span>
                        <span
                            style={{
                                marginLeft: "0.5rem",
                                height: "2rem",
                                display: "inline-block",
                                width: "17rem",
                            }}
                        >
                            <p style={{ width: "8rem", display: "inline-block", }}>S</p>
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
                                    id="id_S_ETA"
                                    value={changeDateVal(
                                        dataEDT_KSV_CAPABOOK_MEM.S_ETA,
                                    )}
                                    onChange={(e) =>
                                        onCalChangeEDT_KSV_CAPABOOK_MEM_S_ETA(
                                            e,
                                            "S_ETA",
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
                                width: "12rem",
                            }}
                        >
                            <p style={{ width: "8rem", display: "inline-block", }}>EMBOSSING</p>
                            <InputText
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "3rem",
                                }}
                                id="id_EMBOSSING"
                                value={dataEDT_KSV_CAPABOOK_MEM.EMBOSSING}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_CAPABOOK_MEM_EMBOSSING(
                                        e,
                                        "EMBOSSING",
                                    )
                                }
                            />
                        </span>
                        <span
                            style={{
                                marginLeft: "0.5rem",
                                height: "2rem",
                                display: "inline-block",
                                width: "12rem",
                            }}
                        >
                            <p style={{ width: "8rem", display: "inline-block", }}>G</p>
                            <InputText
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "3rem",
                                }}
                                id="id_G"
                                value={dataEDT_KSV_CAPABOOK_MEM.G}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_CAPABOOK_MEM_G(e, "G")
                                }
                            />
                        </span>
                        <span
                            style={{
                                marginLeft: "0.5rem",
                                height: "2rem",
                                display: "inline-block",
                                width: "17rem",
                            }}
                        >
                            <p style={{ width: "8rem", display: "inline-block", }}>Exp</p>
                            <InputText
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "8rem",
                                }}
                                id="id_EXP_CMPT"
                                value={dataEDT_KSV_CAPABOOK_MEM.EXP_CMPT}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_CAPABOOK_MEM_EXP_CMPT(
                                        e,
                                        "EXP_CMPT",
                                    )
                                }
                            />
                        </span>
                        <span
                            style={{
                                marginLeft: "0.5rem",
                                height: "2rem",
                                display: "inline-block",
                                width: "12rem",
                            }}
                        >
                            <p style={{ width: "8rem", display: "inline-block", }}>WASHING</p>
                            <InputText
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "3rem",
                                }}
                                id="id_WASHING"
                                value={dataEDT_KSV_CAPABOOK_MEM.WASHING}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_CAPABOOK_MEM_WASHING(
                                        e,
                                        "WASHING",
                                    )
                                }
                            />
                        </span>
                        <span
                            style={{
                                marginLeft: "0.5rem",
                                height: "2rem",
                                display: "inline-block",
                                width: "12rem",
                            }}
                        >
                            <p style={{ width: "8rem", display: "inline-block", }}>W</p>
                            <InputText
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "3rem",
                                }}
                                id="id_W"
                                value={dataEDT_KSV_CAPABOOK_MEM.W}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_CAPABOOK_MEM_W(e, "W")
                                }
                            />
                        </span>
                        <span
                            style={{
                                marginLeft: "0.5rem",
                                height: "2rem",
                                display: "inline-block",
                                width: "22rem",
                            }}
                        >
                            <p style={{ width: "8rem", display: "inline-block", }}>Usage</p>
                            <div
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "13rem",
                                }}
                            >
                                <Dropdown
                                    id="id_USAGE"
                                    value={dataEDT_KSV_CAPABOOK_MEM_USAGE}
                                    onChange={(e) =>
                                        onDropdownChangeEDT_KSV_CAPABOOK_MEM_USAGE(
                                            e,
                                            "USAGE",
                                        )
                                    }
                                    options={datasEDT_KSV_CAPABOOK_MEM_USAGE}
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
                                width: "22rem",
                            }}
                        >
                            <p style={{ width: "5.5rem", display: "inline-block", }}>BVT</p>
                            <div
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "13rem",
                                }}
                            >
                                <Dropdown
                                    id="id_BVT_KIND"
                                    value={dataEDT_KSV_CAPABOOK_MEM_BVT_KIND}
                                    onChange={(e) =>
                                        onDropdownChangeEDT_KSV_CAPABOOK_MEM_BVT_KIND(
                                            e,
                                            "BVT_KIND",
                                        )
                                    }
                                    options={datasEDT_KSV_CAPABOOK_MEM_BVT_KIND}
                                    optionLabel="Cd_NAME"
                                    placeholder=""
                                    editable
                                ></Dropdown>
                            </div>
                        </span>
                    </div>
                </div>
            </div>

            <Divider />

            <div style={{ width: "100rem", height: "2rem" }}>
                <div className="formgrid grid">
                    <div>
                        <Button
                            style={{ display: "inline-block", width: "10rem" }}
                            label="Insert"
                            className="p-button-text"
                            onClick={blankFn}
                        />

                        <Button
                            style={{ display: "inline-block", width: "10rem" }}
                            label="Ins Cancel"
                            className="p-button-text"
                            onClick={blankFn}
                        />

                        <Button
                            style={{ display: "inline-block", width: "10rem" }}
                            label="Update"
                            className="p-button-text"
                            onClick={blankFn}
                        />

                        <Button
                            style={{ display: "inline-block", width: "10rem" }}
                            label="Upd Cancel"
                            className="p-button-text"
                            onClick={blankFn}
                        />

                        <Button
                            style={{ display: "inline-block", width: "10rem" }}
                            label="Delete"
                            className="p-button-text"
                            onClick={blankFn}
                        />

                        <Button
                            style={{ display: "inline-block", width: "10rem" }}
                            label="Del Cancel"
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
                            style={{ display: "inline-block", width: "10rem" }}
                            label="Reset"
                            className="p-button-text"
                            onClick={blankFn}
                        />

                        <Button
                            style={{ display: "inline-block", width: "10rem" }}
                            label="Sel Update"
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

export default React.memo(S0210_CAPABOOK_RECORD_SAMPLE_BVT, comparisonFn);
