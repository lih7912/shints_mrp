/* eslint-disable */
import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
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
import { ServiceS020401_ORDER_INFO } from "../service/service_biz/ServiceS020401_ORDER_INFO";

//import './page_common.scss';

const emptyKCD_CODE = {
    id: 0,
    CD_GROUP: "",
    CD_CODE: "",
    CD_NAME: "",
    CD_FLAG: "",
};

const emptyQRY_ORDER_INFO = {
    ORDER_CD: "",
};

const emptyTBL_KSV_ORDER_MEM = {
    id: 0,
    PROD_CD: "",
    ADD_FLAG: "",
    COLOR: "",
    TOT_CNT: "",
    PRICE: "",
    SIZE_CNT: "",
    OLD_PROD_CD: "",
    end_price: "",
    MID_SIZE: "",
    MID_SIZE_QTY: "",
    SIZE_LOSS: "",
};

const emptyTBL_KSV_ORDER_MEM1 = {
    id: 0,
    INVOICE_DATE: "",
    SHIP_PROD_TYPE: "",
    SHIP_QTY: "",
    SALE_PRICE: "",
    INVOICE_NO: "",
};

const emptyTBL_KSV_ORDER_MEM2 = {
    ORDER_CD: "",
    NAT_CD: "",
    DUE_DATE: "",
    TOT_QTY: "",
};

const emptyEDT_KSV_ORDER_MST = {
    IS_OUTSOURCING: "",
    IS_SAMPLE: "",
    IS_FACTORY_FOB: "",
    ORDER_CD: "",
    STYLE_NAME: "",
    BUYER_NAME: "",
    SIZE_GROUP: "",
    SIZE_MEMBER: "",
    FACTORY_CD: "",
    PO_CD: "",
    REG_USER: "",
    ORDER_STATUS: "",
    REG_DATETIME: "",
    APPROVAL_USER: "",
    APPROVAL_DATETIME: "",
    BUYER_TEAM: "",
    mid_size1: "",
};

const emptyEDT_KSV_ORDER_MST1 = {
    ORDER_DATE: "",
    TOT_CNT: "", // Order Qty
    ADD_CNT: "", // Order Qty
    OVER_QTY: "", // Order Qty
    SHIP_QTY: "",

    DUE_DATE: "",
    FOB_USD: "",
    ORDER_AMT: "",

    MATL_DUE_DATE: "",
    LABOR_COST: "",
    LABOR_AMT: "",

    NAT_CD: "",
    MATERIAL_COST: "",
    MATERIAL_AMT: "",

    CURR_CD: "",
    IMPORT_COST: "",
    IMPORT_CHARGE: "",

    FOB: "",
    UNIT_COST: "",
    TOTAL_COST: "",
};

const emptyEDT_KSV_ORDER_MST2 = {
    REF_ORDER_NO: "",
    REMARK1: "",
    REMARK2: "",
    NOTE: "",
    PATT_USER: "",
    PATT_COST: "",
    SEW_USER: "",
    SEW_COST: "",
    WELDING_COST: "",
    SAMPLE_LEVEL: "",
    SAMPLE_SEQ: "",
    SAMPLE_REASON: "",
    ETC: "",
    ORG_DUE_DATE: "",
};

const emptyEDT_KSV_ORDER_MST3 = {
    FC_PRICE2: "",
    END_REMARK: "",
};

const S020401_ORDER_INFO = () => {
    const serviceLibRef = useRef(null);
    if (!serviceLibRef.current) {
        serviceLibRef.current = new ServiceLib();
        serviceLibRef.current.loginConfirm();
    }
    const serviceLib = serviceLibRef.current;
    const serviceS020401_ORDER_INFORef = useRef(null);
    if (!serviceS020401_ORDER_INFORef.current) serviceS020401_ORDER_INFORef.current = new ServiceS020401_ORDER_INFO();
    const serviceS020401_ORDER_INFO = serviceS020401_ORDER_INFORef.current;

    const toast = useRef(null);

    /* splitter 관련 */
    const [styleVal, setStyleVal] = useState({ width: "65vw" });

    const process_DELETE_ORDER = () => {};

    const process_INSERT_CAPA = () => {
        var _tObj = { ...dataEDT_KSV_ORDER_MST };
        var tObj = {};
        tObj.ORDER_CD = _tObj.ORDER_CD;
        tObj.USER_ID = "sales1";

        serviceS020401_ORDER_INFO.mgrInsert_INSERT_CAPA(tObj).then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                if (data.length > 0 && data[0].CODE.includes("SUCC")) {
                    toast.current.show({
                        severity: "success",
                        summary: "SUCCEED: Insert Capa",
                        detail: data[0].CODE,
                        life: 3000,
                    });
                } else {
                    toast.current.show({
                        severity: "success",
                        summary: "FAILED: Insert Capa",
                        detail: data[0].CODE,
                        life: 3000,
                    });
                }
            } else {
                toast.current.show({
                    severity: "success",
                    summary: "FAILED: Insert Capa",
                    detail: "fatal error",
                    life: 3000,
                });
            }
        });
    };

    /* QRY */
    const [dataQRY_ORDER_INFO, setDataQRY_ORDER_INFO] =
        useState(emptyQRY_ORDER_INFO);

    /* TABLE KSV_ORDER_MEM*/
    // DEFINE DATAGRID : TBL_KSV_ORDER_MEM
    const [datasTBL_KSV_ORDER_MEM_COL, setDatasTBL_KSV_ORDER_MEM_COL] =
        useState([]);
    const [datasTBL_KSV_ORDER_MEM, setDatasTBL_KSV_ORDER_MEM] = useState([]);
    const dt_TBL_KSV_ORDER_MEM = useRef(null);
    const [dataTBL_KSV_ORDER_MEM, setDataTBL_KSV_ORDER_MEM] = useState(
        emptyTBL_KSV_ORDER_MEM,
    );
    const [selectedTBL_KSV_ORDER_MEM, setSelectedTBL_KSV_ORDER_MEM] = useState(
        [],
    );
    const [
        flagSelectModeTBL_KSV_ORDER_MEM,
        setFlagSelectModeTBL_KSV_ORDER_MEM,
    ] = useState(false);

    // DATAGRID CODE : TBL_KSV_ORDER_MEM
    const dynamicColumnsTBL_KSV_ORDER_MEM = datasTBL_KSV_ORDER_MEM_COL.map(
        (col, i) => {
            var tHeader = `id_msg_${col.field_name}_KSV_ORDER_MST_dt`;
            var tHeaderStr = serviceLib.getLocaleMessage(tHeader);
            //          return  <AFColumn field={col} header={serviceLib.getLocaleMessage({tHeader})} style={{ width: '10rem',height:'1.8rem',flexBasis:'auto' }}  editor={(options) => cellEditorKSV_ORDER_MEM(options)} onCellEditComplete={onCellEditCompleteKSV_ORDER_MEM}></AFColumn>
            return (
                <AFColumn field={col.field} headerClassName="t-header" header={tHeaderStr} style={{ width: "5rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
            );
        },
    );

    const onRowClick1TBL_KSV_ORDER_MEM = (argData0) => {
        var argData = {};

        if (typeof argData0.length !== "undefined") {
            argData = argData0[0];
        } else {
            argData = argData0;
        }

        let argTBL_KSV_ORDER_MEM = argData;

        setDataTBL_KSV_ORDER_MEM(argTBL_KSV_ORDER_MEM);
    };

    const onRowClickTBL_KSV_ORDER_MEM = (event) => {
        let argTBL_KSV_ORDER_MEM = event.data;
        if (flagSelectModeTBL_KSV_ORDER_MEM) return;

        // Service : NawooAll:mgrQueryTBL_KSV_ORDER_MEM
    };

    // const searchTBL_KSV_ORDER_MEM = () => {
    //     clearSelectedTBL_KSV_ORDER_MEM();

    //     serviceS020401_ORDER_INFO.mgrQueryTBL_KSV_ORDER_MEM(dataQRY_KSV_ORDER_MEM).then(data => {
    //         if (typeof data.graphQLErrors === 'undefined') {
    //             console.log("ServiceNawooAll.mgrQueryTBL_KSV_ORDER_MEM() call => " + data.length);
    //             setDatasTBL_KSV_ORDER_MEM(data);
    //         } else {
    //             // var tStr = data.graphQLErrors[0].message;
    //             console.log("ServiceNawooAll.mgrQueryTBL_KSV_ORDER_MEM()error => " + JSON.stringify(data.graphQLErrors));
    //
    //         }
    //     });

    //     // Service : NawooAll:mgrQueryTBL_KSV_ORDER_MEM
    // }

    /* TABLE KSV_ORDER_MEM1*/
    // DEFINE DATAGRID : TBL_KSV_ORDER_MEM1
    const [datasTBL_KSV_ORDER_MEM1, setDatasTBL_KSV_ORDER_MEM1] = useState([]);
    const dt_TBL_KSV_ORDER_MEM1 = useRef(null);
    const [dataTBL_KSV_ORDER_MEM1, setDataTBL_KSV_ORDER_MEM1] = useState(
        emptyTBL_KSV_ORDER_MEM1,
    );
    const [selectedTBL_KSV_ORDER_MEM1, setSelectedTBL_KSV_ORDER_MEM1] =
        useState([]);
    const [
        flagSelectModeTBL_KSV_ORDER_MEM1,
        setFlagSelectModeTBL_KSV_ORDER_MEM1,
    ] = useState(false);

    // DATAGRID CODE : TBL_KSV_ORDER_MEM1

    const onRowClick1TBL_KSV_ORDER_MEM1 = (argData0) => {
        var argData = {};

        if (typeof argData0.length !== "undefined") {
            argData = argData0[0];
        } else {
            argData = argData0;
        }

        let argTBL_KSV_ORDER_MEM1 = argData;

        setDataTBL_KSV_ORDER_MEM1(argTBL_KSV_ORDER_MEM1);
    };

    const onRowClickTBL_KSV_ORDER_MEM1 = (event) => {
        let argTBL_KSV_ORDER_MEM1 = event.data;
        if (flagSelectModeTBL_KSV_ORDER_MEM1) return;

        // Service : NawooAll:mgrQueryTBL_KSV_ORDER_MEM1
    };

    // const searchTBL_KSV_ORDER_MEM1 = () => {
    //     clearSelectedTBL_KSV_ORDER_MEM1();

    //     serviceS020401_ORDER_INFO.mgrQueryTBL_KSV_ORDER_MEM1(dataQRY_KSV_ORDER_MEM1).then(data => {
    //         if (typeof data.graphQLErrors === 'undefined') {
    //             console.log("ServiceNawooAll.mgrQueryTBL_KSV_ORDER_MEM1() call => " + data.length);
    //             setDatasTBL_KSV_ORDER_MEM1(data);
    //         } else {
    //             // var tStr = data.graphQLErrors[0].message;
    //             console.log("ServiceNawooAll.mgrQueryTBL_KSV_ORDER_MEM1()error => " + JSON.stringify(data.graphQLErrors));
    //
    //         }
    //     });

    //     // Service : NawooAll:mgrQueryTBL_KSV_ORDER_MEM1
    // }

    /* TABLE KSV_ORDER_MEM2*/
    // DEFINE DATAGRID : TBL_KSV_ORDER_MEM2
    const [datasTBL_KSV_ORDER_MEM2, setDatasTBL_KSV_ORDER_MEM2] = useState([]);
    const dt_TBL_KSV_ORDER_MEM2 = useRef(null);
    const [dataTBL_KSV_ORDER_MEM2, setDataTBL_KSV_ORDER_MEM2] = useState(
        emptyTBL_KSV_ORDER_MEM2,
    );
    const [selectedTBL_KSV_ORDER_MEM2, setSelectedTBL_KSV_ORDER_MEM2] =
        useState([]);
    const [
        flagSelectModeTBL_KSV_ORDER_MEM2,
        setFlagSelectModeTBL_KSV_ORDER_MEM2,
    ] = useState(false);

    // DATAGRID CODE : TBL_KSV_ORDER_MEM2

    const onRowClick1TBL_KSV_ORDER_MEM2 = (argData0) => {
        var argData = {};

        if (typeof argData0.length !== "undefined") {
            argData = argData0[0];
        } else {
            argData = argData0;
        }

        let argTBL_KSV_ORDER_MEM2 = argData;

        setDataTBL_KSV_ORDER_MEM2(argTBL_KSV_ORDER_MEM2);

        setDatasTBL_KSV_ORDER_MEM(argData.ORDER_MEM);
    };

    const onRowClickTBL_KSV_ORDER_MEM2 = (event) => {
        let argTBL_KSV_ORDER_MEM2 = event.data;
        if (flagSelectModeTBL_KSV_ORDER_MEM2) return;

        // Service : NawooAll:mgrQueryTBL_KSV_ORDER_MEM1
    };

    /**EDIT_KSV_ORDER_MST */
    const [datasEDT_KSV_ORDER_MST, setDatasEDT_KSV_ORDER_MST] = useState([]);
    const [dataEDT_KSV_ORDER_MST, setDataEDT_KSV_ORDER_MST] = useState(
        emptyEDT_KSV_ORDER_MST,
    );

    const onCheckboxChangeEDT_KSV_ORDER_MST_IS_OUTSOURCING = (e, name) => {
        let val = "";
        let _dataEDT_KSV_ORDER_MST = { ...dataEDT_KSV_ORDER_MST };
        if (e.checked) {
            val = "1";
        } else {
            val = "0";
        }
        _dataEDT_KSV_ORDER_MST[`${name}`] = val;
        setDataEDT_KSV_ORDER_MST(_dataEDT_KSV_ORDER_MST);
    };

    const onCheckboxChangeEDT_KSV_ORDER_MST_IS_SAMPLE = (e, name) => {
        let val = "";
        let _dataEDT_KSV_ORDER_MST = { ...dataEDT_KSV_ORDER_MST };
        if (e.checked) {
            val = "1";
        } else {
            val = "0";
        }
        _dataEDT_KSV_ORDER_MST[`${name}`] = val;
        setDataEDT_KSV_ORDER_MST(_dataEDT_KSV_ORDER_MST);
    };

    const onCheckboxChangeEDT_KSV_ORDER_MST_IS_FACTORY_FOB = (e, name) => {
        let val = "";
        let _dataEDT_KSV_ORDER_MST = { ...dataEDT_KSV_ORDER_MST };
        if (e.checked) {
            val = "1";
        } else {
            val = "0";
        }
        _dataEDT_KSV_ORDER_MST[`${name}`] = val;
        setDataEDT_KSV_ORDER_MST(_dataEDT_KSV_ORDER_MST);
    };

    const onInputChangeEDT_KSV_ORDER_MST_ORDER_CD = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_ORDER_MST = { ...dataEDT_KSV_ORDER_MST };

        let tTypeVal = _dataEDT_KSV_ORDER_MST[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_ORDER_MST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_ORDER_MST[`${name}`] = parseInt(val);

        setDataEDT_KSV_ORDER_MST(_dataEDT_KSV_ORDER_MST);
    };

    const onInputChangeEDT_KSV_ORDER_MST_STYLE_NAME = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_ORDER_MST = { ...dataEDT_KSV_ORDER_MST };

        let tTypeVal = _dataEDT_KSV_ORDER_MST[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_ORDER_MST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_ORDER_MST[`${name}`] = parseInt(val);

        setDataEDT_KSV_ORDER_MST(_dataEDT_KSV_ORDER_MST);
    };

    const [
        datasEDT_KSV_ORDER_MST_ORDER_STATUS,
        setDatasEDT_KSV_ORDER_MST_ORDER_STATUS,
    ] = useState([]);
    const [
        dataEDT_KSV_ORDER_MST_ORDER_STATUS,
        setDataEDT_KSV_ORDER_MST_ORDER_STATUS,
    ] = useState({});

    const onDropdownChangeEDT_KSV_ORDER_MST_ORDER_STATUS = (e, name) => {
        let val = (e.value && e.value.ORDER_STATUS) || "";

        let _dataEDT_KSV_ORDER_MST = { ...dataEDT_KSV_ORDER_MST };

        let tTypeVal = _dataEDT_KSV_ORDER_MST[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_KSV_ORDER_MST[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_KSV_ORDER_MST[`${name}`] = parseInt(val);
        }

        setDataEDT_KSV_ORDER_MST(_dataEDT_KSV_ORDER_MST);
        setDataEDT_KSV_ORDER_MST_ORDER_STATUS(e.value);
    };

    const onInputChangeEDT_KSV_ORDER_MST_BUYER_NAME = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_ORDER_MST = { ...dataEDT_KSV_ORDER_MST };

        let tTypeVal = _dataEDT_KSV_ORDER_MST[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_ORDER_MST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_ORDER_MST[`${name}`] = parseInt(val);

        setDataEDT_KSV_ORDER_MST(_dataEDT_KSV_ORDER_MST);
    };

    const onInputChangeEDT_KSV_ORDER_MST_SIZE_GROUP = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_ORDER_MST = { ...dataEDT_KSV_ORDER_MST };

        let tTypeVal = _dataEDT_KSV_ORDER_MST[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_ORDER_MST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_ORDER_MST[`${name}`] = parseInt(val);

        setDataEDT_KSV_ORDER_MST(_dataEDT_KSV_ORDER_MST);
    };

    const [
        datasEDT_KSV_ORDER_MST_FACTORY_CD,
        setDatasEDT_KSV_ORDER_MST_FACTORY_CD,
    ] = useState([]);
    const [
        dataEDT_KSV_ORDER_MST_FACTORY_CD,
        setDataEDT_KSV_ORDER_MST_FACTORY_CD,
    ] = useState({});

    const editEDT_KSV_ORDER_MST_FACTORY_CD = (argValue) => {
        let _dataEDT_KSV_ORDER_MST_FACTORY_CD =
            datasEDT_KSV_ORDER_MST_FACTORY_CD.filter(
                (val) => val.FACTORY_CD === argValue,
            );
        setDataEDT_KSV_ORDER_MST_FACTORY_CD(
            _dataEDT_KSV_ORDER_MST_FACTORY_CD[0],
        );
    };

    const onDropdownChangeEDT_KSV_ORDER_MST_FACTORY_CD = (e, name) => {
        let val = (e.value && e.value.FACTORY_CD) || "";

        let _dataEDT_KSV_ORDER_MST = { ...dataEDT_KSV_ORDER_MST };

        let tTypeVal = _dataEDT_KSV_ORDER_MST[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_KSV_ORDER_MST[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_KSV_ORDER_MST[`${name}`] = parseInt(val);
        }

        setDataEDT_KSV_ORDER_MST(_dataEDT_KSV_ORDER_MST);
        setDataEDT_KSV_ORDER_MST_FACTORY_CD(e.value);
    };

    const onInputChangeEDT_KSV_ORDER_MST_PO_CD = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_ORDER_MST = { ...dataEDT_KSV_ORDER_MST };

        let tTypeVal = _dataEDT_KSV_ORDER_MST[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_ORDER_MST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_ORDER_MST[`${name}`] = parseInt(val);

        setDataEDT_KSV_ORDER_MST(_dataEDT_KSV_ORDER_MST);
    };

    const onInputChangeEDT_KSV_ORDER_MST_REG_USER = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_ORDER_MST = { ...dataEDT_KSV_ORDER_MST };

        let tTypeVal = _dataEDT_KSV_ORDER_MST[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_ORDER_MST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_ORDER_MST[`${name}`] = parseInt(val);

        setDataEDT_KSV_ORDER_MST(_dataEDT_KSV_ORDER_MST);
    };

    const onInputChangeEDT_KSV_ORDER_MST_REG_DATETIME = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_ORDER_MST = { ...dataEDT_KSV_ORDER_MST };

        let tTypeVal = _dataEDT_KSV_ORDER_MST[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_ORDER_MST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_ORDER_MST[`${name}`] = parseInt(val);

        setDataEDT_KSV_ORDER_MST(_dataEDT_KSV_ORDER_MST);
    };

    const onInputChangeEDT_KSV_ORDER_MST_APPROVAL_USER = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_ORDER_MST = { ...dataEDT_KSV_ORDER_MST };

        let tTypeVal = _dataEDT_KSV_ORDER_MST[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_ORDER_MST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_ORDER_MST[`${name}`] = parseInt(val);

        setDataEDT_KSV_ORDER_MST(_dataEDT_KSV_ORDER_MST);
    };

    const onInputChangeEDT_KSV_ORDER_MST_APPROVAL_DATETIME = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_ORDER_MST = { ...dataEDT_KSV_ORDER_MST };

        let tTypeVal = _dataEDT_KSV_ORDER_MST[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_ORDER_MST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_ORDER_MST[`${name}`] = parseInt(val);

        setDataEDT_KSV_ORDER_MST(_dataEDT_KSV_ORDER_MST);
    };

    const [
        datasEDT_KSV_ORDER_MST_BUYER_TEAM,
        setDatasEDT_KSV_ORDER_MST_BUYER_TEAM,
    ] = useState([]);
    const [
        dataEDT_KSV_ORDER_MST_BUYER_TEAM,
        setDataEDT_KSV_ORDER_MST_BUYER_TEAM,
    ] = useState({});

    const editEDT_KSV_ORDER_MST_BUYER_TEAM = (argValue) => {
        let _dataEDT_KSV_ORDER_MST_BUYER_TEAM =
            datasEDT_KSV_ORDER_MST_BUYER_TEAM.filter(
                (val) => val.CD_CODE === argValue,
            );
        setDataEDT_KSV_ORDER_MST_BUYER_TEAM(
            _dataEDT_KSV_ORDER_MST_BUYER_TEAM[0],
        );
    };

    const onDropdownChangeEDT_KSV_ORDER_MST_BUYER_TEAM = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataEDT_KSV_ORDER_MST = { ...dataEDT_KSV_ORDER_MST };

        let tTypeVal = _dataEDT_KSV_ORDER_MST[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_KSV_ORDER_MST[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_KSV_ORDER_MST[`${name}`] = parseInt(val);
        }

        setDataEDT_KSV_ORDER_MST(_dataEDT_KSV_ORDER_MST);
        setDataEDT_KSV_ORDER_MST_BUYER_TEAM(e.value);
    };

    const onInputChangeEDT_KSV_ORDER_MST_mid_size1 = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_ORDER_MST = { ...dataEDT_KSV_ORDER_MST };

        let tTypeVal = _dataEDT_KSV_ORDER_MST[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_ORDER_MST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_ORDER_MST[`${name}`] = parseInt(val);

        setDataEDT_KSV_ORDER_MST(_dataEDT_KSV_ORDER_MST);
    };

    /**EDIT_KSV_ORDER_MST1 */
    const [datasEDT_KSV_ORDER_MST1, setDatasEDT_KSV_ORDER_MST1] = useState([]);
    const [dataEDT_KSV_ORDER_MST1, setDataEDT_KSV_ORDER_MST1] = useState(
        emptyEDT_KSV_ORDER_MST1,
    );

    const onCalChangeEDT_KSV_ORDER_MST1_ORDER_DATE = (e, name) => {
        let val1 = e.value || "";
        let val = "";
        if (val1 === "") {
            val = "";
        } else {
            val = getDateVal(val1);
        }

        let _dataEDT_KSV_ORDER_MST1 = { ...dataEDT_KSV_ORDER_MST1 };
        _dataEDT_KSV_ORDER_MST1[`${name}`] = val;
        setDataEDT_KSV_ORDER_MST1(_dataEDT_KSV_ORDER_MST1);
    };

    const onInputChangeEDT_KSV_ORDER_MST1_TOT_CNT = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_ORDER_MST1 = { ...dataEDT_KSV_ORDER_MST1 };

        let tTypeVal = _dataEDT_KSV_ORDER_MST1[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_ORDER_MST1[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_ORDER_MST1[`${name}`] = parseInt(val);

        setDataEDT_KSV_ORDER_MST1(_dataEDT_KSV_ORDER_MST1);
    };

    const onInputChangeEDT_KSV_ORDER_MST1_ADD_CNT = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_ORDER_MST1 = { ...dataEDT_KSV_ORDER_MST1 };

        let tTypeVal = _dataEDT_KSV_ORDER_MST1[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_ORDER_MST1[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_ORDER_MST1[`${name}`] = parseInt(val);

        setDataEDT_KSV_ORDER_MST1(_dataEDT_KSV_ORDER_MST1);
    };

    const onInputChangeEDT_KSV_ORDER_MST1_OVER_QTY = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_ORDER_MST1 = { ...dataEDT_KSV_ORDER_MST1 };

        let tTypeVal = _dataEDT_KSV_ORDER_MST1[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_ORDER_MST1[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_ORDER_MST1[`${name}`] = parseInt(val);

        setDataEDT_KSV_ORDER_MST1(_dataEDT_KSV_ORDER_MST1);
    };

    const onInputChangeEDT_KSV_ORDER_MST1_SHIP_QTY = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_ORDER_MST1 = { ...dataEDT_KSV_ORDER_MST1 };

        let tTypeVal = _dataEDT_KSV_ORDER_MST1[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_ORDER_MST1[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_ORDER_MST1[`${name}`] = parseInt(val);

        setDataEDT_KSV_ORDER_MST1(_dataEDT_KSV_ORDER_MST1);
    };

    const onCalChangeEDT_KSV_ORDER_MST1_DUE_DATE = (e, name) => {
        let val1 = e.value || "";
        let val = "";
        if (val1 === "") {
            val = "";
        } else {
            val = getDateVal(val1);
        }

        let _dataEDT_KSV_ORDER_MST1 = { ...dataEDT_KSV_ORDER_MST1 };
        _dataEDT_KSV_ORDER_MST1[`${name}`] = val;
        setDataEDT_KSV_ORDER_MST1(_dataEDT_KSV_ORDER_MST1);
    };

    const onInputChangeEDT_KSV_ORDER_MST1_FOB_USD = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_ORDER_MST1 = { ...dataEDT_KSV_ORDER_MST1 };

        let tTypeVal = _dataEDT_KSV_ORDER_MST1[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_ORDER_MST1[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_ORDER_MST1[`${name}`] = parseInt(val);

        setDataEDT_KSV_ORDER_MST1(_dataEDT_KSV_ORDER_MST1);
    };

    const onInputChangeEDT_KSV_ORDER_MST1_ORDER_AMT = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_ORDER_MST1 = { ...dataEDT_KSV_ORDER_MST1 };

        let tTypeVal = _dataEDT_KSV_ORDER_MST1[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_ORDER_MST1[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_ORDER_MST1[`${name}`] = parseInt(val);

        setDataEDT_KSV_ORDER_MST1(_dataEDT_KSV_ORDER_MST1);
    };

    const onCalChangeEDT_KSV_ORDER_MST1_MATL_DUE_DATE = (e, name) => {
        let val1 = e.value || "";
        let val = "";
        if (val1 === "") {
            val = "";
        } else {
            val = getDateVal(val1);
        }

        let _dataEDT_KSV_ORDER_MST1 = { ...dataEDT_KSV_ORDER_MST1 };
        _dataEDT_KSV_ORDER_MST1[`${name}`] = val;
        setDataEDT_KSV_ORDER_MST1(_dataEDT_KSV_ORDER_MST1);
    };

    const onInputChangeEDT_KSV_ORDER_MST1_LABOR_COST = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_ORDER_MST1 = { ...dataEDT_KSV_ORDER_MST1 };

        let tTypeVal = _dataEDT_KSV_ORDER_MST1[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_ORDER_MST1[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_ORDER_MST1[`${name}`] = parseInt(val);

        setDataEDT_KSV_ORDER_MST1(_dataEDT_KSV_ORDER_MST1);
    };

    const onInputChangeEDT_KSV_ORDER_MST1_LABOR_AMT = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_ORDER_MST1 = { ...dataEDT_KSV_ORDER_MST1 };

        let tTypeVal = _dataEDT_KSV_ORDER_MST1[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_ORDER_MST1[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_ORDER_MST1[`${name}`] = parseInt(val);

        setDataEDT_KSV_ORDER_MST1(_dataEDT_KSV_ORDER_MST1);
    };

    const [datasEDT_KSV_ORDER_MST1_NAT_CD, setDatasEDT_KSV_ORDER_MST1_NAT_CD] =
        useState([]);
    const [dataEDT_KSV_ORDER_MST1_NAT_CD, setDataEDT_KSV_ORDER_MST1_NAT_CD] =
        useState({});

    const editEDT_KSV_ORDER_MST1_NAT_CD = (argValue) => {
        let _dataEDT_KSV_ORDER_MST1_NAT_CD =
            datasEDT_KSV_ORDER_MST1_NAT_CD.filter(
                (val) => val.NAT_CD === argValue,
            );
        setDataEDT_KSV_ORDER_MST1_NAT_CD(_dataEDT_KSV_ORDER_MST1_NAT_CD[0]);
    };

    const onDropdownChangeEDT_KSV_ORDER_MST1_NAT_CD = (e, name) => {
        let val = (e.value && e.value.NAT_CD) || "";

        let _dataEDT_KSV_ORDER_MST1 = { ...dataEDT_KSV_ORDER_MST1 };

        let tTypeVal = _dataEDT_KSV_ORDER_MST1[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_KSV_ORDER_MST1[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_KSV_ORDER_MST1[`${name}`] = parseInt(val);
        }

        setDataEDT_KSV_ORDER_MST1(_dataEDT_KSV_ORDER_MST1);
        setDataEDT_KSV_ORDER_MST1_NAT_CD(e.value);
    };

    const onInputChangeEDT_KSV_ORDER_MST1_MATERIAL_COST = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_ORDER_MST1 = { ...dataEDT_KSV_ORDER_MST1 };

        let tTypeVal = _dataEDT_KSV_ORDER_MST1[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_ORDER_MST1[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_ORDER_MST1[`${name}`] = parseInt(val);

        setDataEDT_KSV_ORDER_MST1(_dataEDT_KSV_ORDER_MST1);
    };

    const onInputChangeEDT_KSV_ORDER_MST1_MATERIAL_AMT = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_ORDER_MST1 = { ...dataEDT_KSV_ORDER_MST1 };

        let tTypeVal = _dataEDT_KSV_ORDER_MST1[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_ORDER_MST1[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_ORDER_MST1[`${name}`] = parseInt(val);

        setDataEDT_KSV_ORDER_MST1(_dataEDT_KSV_ORDER_MST1);
    };

    const [
        datasEDT_KSV_ORDER_MST1_CURR_CD,
        setDatasEDT_KSV_ORDER_MST1_CURR_CD,
    ] = useState([]);
    const [dataEDT_KSV_ORDER_MST1_CURR_CD, setDataEDT_KSV_ORDER_MST1_CURR_CD] =
        useState({});

    const editEDT_KSV_ORDER_MST1_CURR_CD = (argValue) => {
        let _dataEDT_KSV_ORDER_MST1_CURR_CD =
            datasEDT_KSV_ORDER_MST1_CURR_CD.filter(
                (val) => val.CD_CODE === argValue,
            );
        setDataEDT_KSV_ORDER_MST1_CURR_CD(_dataEDT_KSV_ORDER_MST1_CURR_CD[0]);
    };

    const onDropdownChangeEDT_KSV_ORDER_MST1_CURR_CD = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataEDT_KSV_ORDER_MST1 = { ...dataEDT_KSV_ORDER_MST1 };

        let tTypeVal = _dataEDT_KSV_ORDER_MST1[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_KSV_ORDER_MST1[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_KSV_ORDER_MST1[`${name}`] = parseInt(val);
        }

        setDataEDT_KSV_ORDER_MST1(_dataEDT_KSV_ORDER_MST1);
        setDataEDT_KSV_ORDER_MST1_CURR_CD(e.value);
    };

    const onInputChangeEDT_KSV_ORDER_MST1_IMPORT_COST = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_ORDER_MST1 = { ...dataEDT_KSV_ORDER_MST1 };

        let tTypeVal = _dataEDT_KSV_ORDER_MST1[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_ORDER_MST1[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_ORDER_MST1[`${name}`] = parseInt(val);

        setDataEDT_KSV_ORDER_MST1(_dataEDT_KSV_ORDER_MST1);
    };

    const onInputChangeEDT_KSV_ORDER_MST1_IMPORT_CHARGE = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_ORDER_MST1 = { ...dataEDT_KSV_ORDER_MST1 };

        let tTypeVal = _dataEDT_KSV_ORDER_MST1[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_ORDER_MST1[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_ORDER_MST1[`${name}`] = parseInt(val);

        setDataEDT_KSV_ORDER_MST1(_dataEDT_KSV_ORDER_MST1);
    };

    const onInputChangeEDT_KSV_ORDER_MST1_FOB = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_ORDER_MST1 = { ...dataEDT_KSV_ORDER_MST1 };

        let tTypeVal = _dataEDT_KSV_ORDER_MST1[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_ORDER_MST1[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_ORDER_MST1[`${name}`] = parseInt(val);

        setDataEDT_KSV_ORDER_MST1(_dataEDT_KSV_ORDER_MST1);
    };

    const onInputChangeEDT_KSV_ORDER_MST1_UNIT_COST = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_ORDER_MST1 = { ...dataEDT_KSV_ORDER_MST1 };

        let tTypeVal = _dataEDT_KSV_ORDER_MST1[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_ORDER_MST1[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_ORDER_MST1[`${name}`] = parseInt(val);

        setDataEDT_KSV_ORDER_MST1(_dataEDT_KSV_ORDER_MST1);
    };

    const onInputChangeEDT_KSV_ORDER_MST1_TOTAL_COST = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_ORDER_MST1 = { ...dataEDT_KSV_ORDER_MST1 };

        let tTypeVal = _dataEDT_KSV_ORDER_MST1[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_ORDER_MST1[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_ORDER_MST1[`${name}`] = parseInt(val);

        setDataEDT_KSV_ORDER_MST1(_dataEDT_KSV_ORDER_MST1);
    };

    /**EDIT_KSV_ORDER_MST2 */
    const [datasEDT_KSV_ORDER_MST2, setDatasEDT_KSV_ORDER_MST2] = useState([]);
    const [dataEDT_KSV_ORDER_MST2, setDataEDT_KSV_ORDER_MST2] = useState(
        emptyEDT_KSV_ORDER_MST2,
    );

    const onInputChangeEDT_KSV_ORDER_MST2_REF_ORDER_NO = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_ORDER_MST2 = { ...dataEDT_KSV_ORDER_MST2 };

        let tTypeVal = _dataEDT_KSV_ORDER_MST2[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_ORDER_MST2[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_ORDER_MST2[`${name}`] = parseInt(val);

        setDataEDT_KSV_ORDER_MST2(_dataEDT_KSV_ORDER_MST2);
    };

    const onInputChangeEDT_KSV_ORDER_MST2_REMARK1 = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_ORDER_MST2 = { ...dataEDT_KSV_ORDER_MST2 };

        let tTypeVal = _dataEDT_KSV_ORDER_MST2[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_ORDER_MST2[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_ORDER_MST2[`${name}`] = parseInt(val);

        setDataEDT_KSV_ORDER_MST2(_dataEDT_KSV_ORDER_MST2);
    };

    const onInputChangeEDT_KSV_ORDER_MST2_REMARK2 = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_ORDER_MST2 = { ...dataEDT_KSV_ORDER_MST2 };

        let tTypeVal = _dataEDT_KSV_ORDER_MST2[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_ORDER_MST2[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_ORDER_MST2[`${name}`] = parseInt(val);

        setDataEDT_KSV_ORDER_MST2(_dataEDT_KSV_ORDER_MST2);
    };

    const onInputChangeEDT_KSV_ORDER_MST2_NOTE = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_ORDER_MST2 = { ...dataEDT_KSV_ORDER_MST2 };

        let tTypeVal = _dataEDT_KSV_ORDER_MST2[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_ORDER_MST2[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_ORDER_MST2[`${name}`] = parseInt(val);

        setDataEDT_KSV_ORDER_MST2(_dataEDT_KSV_ORDER_MST2);
    };

    const [
        datasEDT_KSV_ORDER_MST2_PATT_USER,
        setDatasEDT_KSV_ORDER_MST2_PATT_USER,
    ] = useState([]);
    const [
        dataEDT_KSV_ORDER_MST2_PATT_USER,
        setDataEDT_KSV_ORDER_MST2_PATT_USER,
    ] = useState({});

    const editEDT_KSV_ORDER_MST2_PATT_USER = (argValue) => {
        let _dataEDT_KSV_ORDER_MST2_PATT_USER =
            datasEDT_KSV_ORDER_MST2_PATT_USER.filter(
                (val) => val.USER_ID === argValue,
            );
        setDataEDT_KSV_ORDER_MST2_PATT_USER(
            _dataEDT_KSV_ORDER_MST2_PATT_USER[0],
        );
    };

    const onDropdownChangeEDT_KSV_ORDER_MST2_PATT_USER = (e, name) => {
        let val = (e.value && e.value.USER_ID) || "";

        let _dataEDT_KSV_ORDER_MST2 = { ...dataEDT_KSV_ORDER_MST2 };

        let tTypeVal = _dataEDT_KSV_ORDER_MST2[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_KSV_ORDER_MST2[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_KSV_ORDER_MST2[`${name}`] = parseInt(val);
        }

        setDataEDT_KSV_ORDER_MST2(_dataEDT_KSV_ORDER_MST2);
        setDataEDT_KSV_ORDER_MST2_PATT_USER(e.value);
    };

    const onInputChangeEDT_KSV_ORDER_MST2_PATT_COST = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_ORDER_MST2 = { ...dataEDT_KSV_ORDER_MST2 };

        let tTypeVal = _dataEDT_KSV_ORDER_MST2[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_ORDER_MST2[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_ORDER_MST2[`${name}`] = parseInt(val);

        setDataEDT_KSV_ORDER_MST2(_dataEDT_KSV_ORDER_MST2);
    };

    const [
        datasEDT_KSV_ORDER_MST2_SEW_USER,
        setDatasEDT_KSV_ORDER_MST2_SEW_USER,
    ] = useState([]);
    const [
        dataEDT_KSV_ORDER_MST2_SEW_USER,
        setDataEDT_KSV_ORDER_MST2_SEW_USER,
    ] = useState({});

    const editEDT_KSV_ORDER_MST2_SEW_USER = (argValue) => {
        let _dataEDT_KSV_ORDER_MST2_SEW_USER =
            datasEDT_KSV_ORDER_MST2_SEW_USER.filter(
                (val) => val.USER_ID === argValue,
            );
        setDataEDT_KSV_ORDER_MST2_SEW_USER(_dataEDT_KSV_ORDER_MST2_SEW_USER[0]);
    };

    const onDropdownChangeEDT_KSV_ORDER_MST2_SEW_USER = (e, name) => {
        let val = (e.value && e.value.USER_NAME) || "";

        let _dataEDT_KSV_ORDER_MST2 = { ...dataEDT_KSV_ORDER_MST2 };

        let tTypeVal = _dataEDT_KSV_ORDER_MST2[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_KSV_ORDER_MST2[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_KSV_ORDER_MST2[`${name}`] = parseInt(val);
        }

        setDataEDT_KSV_ORDER_MST2(_dataEDT_KSV_ORDER_MST2);
        setDataEDT_KSV_ORDER_MST2_SEW_USER(e.value);
    };

    const onInputChangeEDT_KSV_ORDER_MST2_SEW_COST = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_ORDER_MST2 = { ...dataEDT_KSV_ORDER_MST2 };

        let tTypeVal = _dataEDT_KSV_ORDER_MST2[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_ORDER_MST2[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_ORDER_MST2[`${name}`] = parseInt(val);

        setDataEDT_KSV_ORDER_MST2(_dataEDT_KSV_ORDER_MST2);
    };

    const onInputChangeEDT_KSV_ORDER_MST2_WELDING_COST = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_ORDER_MST2 = { ...dataEDT_KSV_ORDER_MST2 };

        let tTypeVal = _dataEDT_KSV_ORDER_MST2[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_ORDER_MST2[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_ORDER_MST2[`${name}`] = parseInt(val);

        setDataEDT_KSV_ORDER_MST2(_dataEDT_KSV_ORDER_MST2);
    };

    const [
        datasEDT_KSV_ORDER_MST2_SAMPLE_LEVEL,
        setDatasEDT_KSV_ORDER_MST2_SAMPLE_LEVEL,
    ] = useState([]);
    const [
        dataEDT_KSV_ORDER_MST2_SAMPLE_LEVEL,
        setDataEDT_KSV_ORDER_MST2_SAMPLE_LEVEL,
    ] = useState({});

    const editEDT_KSV_ORDER_MST2_SAMPLE_LEVEL = (argValue) => {
        let _dataEDT_KSV_ORDER_MST2_SAMPLE_LEVEL =
            datasEDT_KSV_ORDER_MST2_SAMPLE_LEVEL.filter(
                (val) => val.CD_CODE === argValue,
            );
        setDataEDT_KSV_ORDER_MST2_SAMPLE_LEVEL(
            _dataEDT_KSV_ORDER_MST2_SAMPLE_LEVEL[0],
        );
    };

    const onDropdownChangeEDT_KSV_ORDER_MST2_SAMPLE_LEVEL = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataEDT_KSV_ORDER_MST2 = { ...dataEDT_KSV_ORDER_MST2 };

        let tTypeVal = _dataEDT_KSV_ORDER_MST2[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_KSV_ORDER_MST2[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_KSV_ORDER_MST2[`${name}`] = parseInt(val);
        }

        setDataEDT_KSV_ORDER_MST2(_dataEDT_KSV_ORDER_MST2);
        setDataEDT_KSV_ORDER_MST2_SAMPLE_LEVEL(e.value);
    };

    const [
        datasEDT_KSV_ORDER_MST2_SAMPLE_SEQ,
        setDatasEDT_KSV_ORDER_MST2_SAMPLE_SEQ,
    ] = useState([]);
    const [
        dataEDT_KSV_ORDER_MST2_SAMPLE_SEQ,
        setDataEDT_KSV_ORDER_MST2_SAMPLE_SEQ,
    ] = useState({});

    const editEDT_KSV_ORDER_MST2_SAMPLE_SEQ = (argValue) => {
        let _dataEDT_KSV_ORDER_MST2_SAMPLE_SEQ =
            datasEDT_KSV_ORDER_MST2_SAMPLE_SEQ.filter(
                (val) => val.CD_CODE === argValue,
            );
        setDataEDT_KSV_ORDER_MST2_SAMPLE_SEQ(
            _dataEDT_KSV_ORDER_MST2_SAMPLE_SEQ[0],
        );
    };

    const onDropdownChangeEDT_KSV_ORDER_MST2_SAMPLE_SEQ = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataEDT_KSV_ORDER_MST2 = { ...dataEDT_KSV_ORDER_MST2 };

        let tTypeVal = _dataEDT_KSV_ORDER_MST2[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_KSV_ORDER_MST2[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_KSV_ORDER_MST2[`${name}`] = parseInt(val);
        }

        setDataEDT_KSV_ORDER_MST2(_dataEDT_KSV_ORDER_MST2);
        setDataEDT_KSV_ORDER_MST2_SAMPLE_SEQ(e.value);
    };

    const [
        datasEDT_KSV_ORDER_MST2_SAMPLE_REASON,
        setDatasEDT_KSV_ORDER_MST2_SAMPLE_REASON,
    ] = useState([]);
    const [
        dataEDT_KSV_ORDER_MST2_SAMPLE_REASON,
        setDataEDT_KSV_ORDER_MST2_SAMPLE_REASON,
    ] = useState({});

    const editEDT_KSV_ORDER_MST2_SAMPLE_REASON = (argValue) => {
        let _dataEDT_KSV_ORDER_MST2_SAMPLE_REASON =
            datasEDT_KSV_ORDER_MST2_SAMPLE_REASON.filter(
                (val) => val.CD_CODE === argValue,
            );
        setDataEDT_KSV_ORDER_MST2_SAMPLE_REASON(
            _dataEDT_KSV_ORDER_MST2_SAMPLE_REASON[0],
        );
    };

    const onDropdownChangeEDT_KSV_ORDER_MST2_SAMPLE_REASON = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataEDT_KSV_ORDER_MST2 = { ...dataEDT_KSV_ORDER_MST2 };

        let tTypeVal = _dataEDT_KSV_ORDER_MST2[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_KSV_ORDER_MST2[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_KSV_ORDER_MST2[`${name}`] = parseInt(val);
        }

        setDataEDT_KSV_ORDER_MST2(_dataEDT_KSV_ORDER_MST2);
        setDataEDT_KSV_ORDER_MST2_SAMPLE_REASON(e.value);
    };

    const onInputChangeEDT_KSV_ORDER_MST2_ETC = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_ORDER_MST2 = { ...dataEDT_KSV_ORDER_MST2 };

        let tTypeVal = _dataEDT_KSV_ORDER_MST2[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_ORDER_MST2[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_ORDER_MST2[`${name}`] = parseInt(val);

        setDataEDT_KSV_ORDER_MST2(_dataEDT_KSV_ORDER_MST2);
    };

    const onCalChangeEDT_KSV_ORDER_MST2_ORG_DUE_DATE = (e, name) => {
        let val1 = e.value || "";
        let val = "";
        if (val1 === "") {
            val = "";
        } else {
            val = getDateVal(val1);
        }

        let _dataEDT_KSV_ORDER_MST2 = { ...dataEDT_KSV_ORDER_MST2 };
        _dataEDT_KSV_ORDER_MST2[`${name}`] = val;
        setDataEDT_KSV_ORDER_MST2(_dataEDT_KSV_ORDER_MST2);
    };

    /**EDIT_KSV_ORDER_MST3 */

    const [datasEDT_KSV_ORDER_MST3, setDatasEDT_KSV_ORDER_MST3] = useState([]);
    const [dataEDT_KSV_ORDER_MST3, setDataEDT_KSV_ORDER_MST3] = useState(
        emptyEDT_KSV_ORDER_MST3,
    );

    const onInputChangeEDT_KSV_ORDER_MST3_FC_PRICE2 = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_ORDER_MST3 = { ...dataEDT_KSV_ORDER_MST3 };

        let tTypeVal = _dataEDT_KSV_ORDER_MST3[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_ORDER_MST3[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_ORDER_MST3[`${name}`] = parseInt(val);

        setDataEDT_KSV_ORDER_MST3(_dataEDT_KSV_ORDER_MST3);
    };

    const onInputChangeEDT_KSV_ORDER_MST3_END_REMARK = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_ORDER_MST3 = { ...dataEDT_KSV_ORDER_MST3 };

        let tTypeVal = _dataEDT_KSV_ORDER_MST3[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_ORDER_MST3[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_ORDER_MST3[`${name}`] = parseInt(val);

        setDataEDT_KSV_ORDER_MST3(_dataEDT_KSV_ORDER_MST3);
    };

    useEffect(() => {
        let tOrderCd = "";

        var tUrls = window.location.href.split("?");
        if (tUrls.length <= 1) {
        } else {
            var tParams1 = tUrls[1].split("&");
            var tParams2 = tParams1.map((col, i) => {
                var tObj = {};
                var tCols = col.split("=");

                if (tCols[0].includes("ORDER_CD")) {
                    tObj.key = tCols[0];
                    tObj.value = tCols[1];
                    console.log(tObj);
                    return tObj;
                }
            });
            if (tParams2.length > 0) {
                tOrderCd = tParams2[0].value;
            }
            console.log(tParams2);
        }

        if (tOrderCd !== "") {
            console.log("S0204 Order Cd :(param)" + tOrderCd);
        } else {
            tOrderCd = localStorage.getItem("AF_S0204_ORDER_CD");
            console.log("S0204 Order Cd: (localstorage)" + tOrderCd);
            if (tOrderCd === null) tOrderCd = "IS22-D0088";
        }

        // const serviceMgrKCD_VENDOR = new ServiceMgrKCD_VENDOR();
        let _dataQRY_ORDER_INFO = { ...dataQRY_ORDER_INFO };
        _dataQRY_ORDER_INFO.ORDER_CD = tOrderCd;
        setDataQRY_ORDER_INFO(_dataQRY_ORDER_INFO);

        serviceS020401_ORDER_INFO
            .mgrQueryORDER_INFO(_dataQRY_ORDER_INFO)
            .then((data) => {
                if (typeof data.graphQLErrors === "undefined") {
                    // setDatasKCD_VENDOR(data);

                    var tORDER_MST = data.ORDER_MST[0];
                    var tSAMPLE_COST = data.SAMPLE_COST[0];
                    var tPO = data.PO[0];

                    let _dataEDT_KSV_ORDER_MST = { ...dataEDT_KSV_ORDER_MST };
                    _dataEDT_KSV_ORDER_MST.IS_OUTSOURCING = "0";
                    _dataEDT_KSV_ORDER_MST.IS_SAMPLE = tORDER_MST.SAMPLE_FLAG;
                    _dataEDT_KSV_ORDER_MST.IS_FACTORY_FOB = "0";
                    _dataEDT_KSV_ORDER_MST.ORDER_CD = tORDER_MST.ORDER_CD;
                    _dataEDT_KSV_ORDER_MST.STYLE_NAME = tORDER_MST.STYLE_NAME;
                    _dataEDT_KSV_ORDER_MST.BUYER_NAME = tORDER_MST.BUYER_NAME;
                    _dataEDT_KSV_ORDER_MST.SIZE_GROUP = tORDER_MST.SIZE_GROUP;
                    _dataEDT_KSV_ORDER_MST.SIZE_MEMBER = tORDER_MST.SIZE_MEMBER;
                    _dataEDT_KSV_ORDER_MST.FACTORY_CD = tORDER_MST.FACTORY_CD;

                    if (data.PO.length <= 0) _dataEDT_KSV_ORDER_MST.PO_CD = "";
                    else _dataEDT_KSV_ORDER_MST.PO_CD = tPO.PO_CD;

                    _dataEDT_KSV_ORDER_MST.REG_USER = tORDER_MST.REG_USER;
                    _dataEDT_KSV_ORDER_MST.REG_DATETIME =
                        tORDER_MST.REG_DATETIME;
                    _dataEDT_KSV_ORDER_MST.ORDER_STATUS =
                        tORDER_MST.ORDER_STATUS_NAME;
                    _dataEDT_KSV_ORDER_MST.APPROVAL_USER =
                        tORDER_MST.APPROVAL_USER;
                    _dataEDT_KSV_ORDER_MST.APPROVAL_DATETIME =
                        tORDER_MST.APPROVAL_DATETIME;
                    _dataEDT_KSV_ORDER_MST.BUYER_TEAM = tORDER_MST.BUYER_TEAM;
                    _dataEDT_KSV_ORDER_MST.mid_size1 = tORDER_MST.mid_size1;
                    setDataEDT_KSV_ORDER_MST(_dataEDT_KSV_ORDER_MST);

                    setDatasEDT_KSV_ORDER_MST_FACTORY_CD(data.CODE_FACTORY_CD);
                    editEDT_KSV_ORDER_MST_FACTORY_CD(tORDER_MST.FACTORY_CD);

                    setDatasEDT_KSV_ORDER_MST_BUYER_TEAM(data.CODE_BUYER_TEAM);
                    editEDT_KSV_ORDER_MST_BUYER_TEAM(tORDER_MST.BUYER_TEAM);

                    // MST1
                    let _dataEDT_KSV_ORDER_MST1 = { ...dataEDT_KSV_ORDER_MST1 };
                    _dataEDT_KSV_ORDER_MST1.ORDER_DATE = tORDER_MST.ORDER_DATE;
                    _dataEDT_KSV_ORDER_MST1.TOT_CNT = tORDER_MST.TOT_CNT;
                    _dataEDT_KSV_ORDER_MST1.ADD_CNT = tORDER_MST.ADD_CNT;
                    _dataEDT_KSV_ORDER_MST1.OVER_QTY = tORDER_MST.OVER_QTY;
                    _dataEDT_KSV_ORDER_MST1.SHIP_QTY = "0";

                    _dataEDT_KSV_ORDER_MST1.DUE_DATE = tORDER_MST.DUE_DATE;
                    _dataEDT_KSV_ORDER_MST1.FOB_USD = tORDER_MST.USD_PRICE;
                    _dataEDT_KSV_ORDER_MST1.ORDER_AMT =
                        parseFloat(tORDER_MST.USD_PRICE) *
                        parseFloat(tORDER_MST.TOT_CNT);

                    _dataEDT_KSV_ORDER_MST1.MATL_DUE_DATE =
                        tORDER_MST.MATL_DUE_DATE;
                    _dataEDT_KSV_ORDER_MST1.LABOR_COST = tORDER_MST.FC_PRICE;
                    _dataEDT_KSV_ORDER_MST1.LABOR_AMT = "0";

                    _dataEDT_KSV_ORDER_MST1.NAT_CD = tORDER_MST.NAT_CD;
                    _dataEDT_KSV_ORDER_MST1.MATERIAL_COST =
                        tORDER_MST.AVR_PRICE;
                    _dataEDT_KSV_ORDER_MST1.MATERIAL_AMT = tORDER_MST.MATL_AMT;

                    _dataEDT_KSV_ORDER_MST1.CURR_CD = tORDER_MST.CURR_CD;
                    _dataEDT_KSV_ORDER_MST1.IMPORT_COST = "0";
                    _dataEDT_KSV_ORDER_MST1.IMPORT_CHARGE = "0";

                    _dataEDT_KSV_ORDER_MST1.FOB = tORDER_MST.AVR_PRICE;
                    _dataEDT_KSV_ORDER_MST1.UNIT_COST = "0";
                    _dataEDT_KSV_ORDER_MST1.TOTAL_COST = "0";
                    setDataEDT_KSV_ORDER_MST1(_dataEDT_KSV_ORDER_MST1);

                    setDatasEDT_KSV_ORDER_MST1_NAT_CD(data.CODE_NAT_CD);
                    editEDT_KSV_ORDER_MST1_NAT_CD(tORDER_MST.NAT_CD);

                    setDatasEDT_KSV_ORDER_MST1_CURR_CD(data.CODE_CURR_CD);
                    editEDT_KSV_ORDER_MST1_CURR_CD(tORDER_MST.CURR_CD);

                    // MST2
                    let _dataEDT_KSV_ORDER_MST2 = { ...dataEDT_KSV_ORDER_MST2 };
                    _dataEDT_KSV_ORDER_MST2.REF_ORDER_NO =
                        tORDER_MST.REF_ORDER_NO;
                    _dataEDT_KSV_ORDER_MST2.REMARK1 = tORDER_MST.REMARK;
                    _dataEDT_KSV_ORDER_MST2.REMARK2 = "";
                    _dataEDT_KSV_ORDER_MST2.NOTE = "";
                    _dataEDT_KSV_ORDER_MST2.ORG_DUE_DATE =
                        tORDER_MST.ORG_DUE_DATE;
                    if (data.SAMPLE_COST.length <= 0) {
                        _dataEDT_KSV_ORDER_MST2.PATT_USER = " ";
                        _dataEDT_KSV_ORDER_MST2.PATT_COST = "0";
                        _dataEDT_KSV_ORDER_MST2.SEW_USER = " ";
                        _dataEDT_KSV_ORDER_MST2.SEW_COST = "0";
                        _dataEDT_KSV_ORDER_MST2.WELDING_COST = "0";
                        _dataEDT_KSV_ORDER_MST2.SAMPLE_LEVEL = " ";
                        _dataEDT_KSV_ORDER_MST2.SAMPLE_SEQ = " ";
                        _dataEDT_KSV_ORDER_MST2.SAMPLE_REASON = " ";
                    } else {
                        _dataEDT_KSV_ORDER_MST2.PATT_USER =
                            tSAMPLE_COST.PATT_USER;
                        _dataEDT_KSV_ORDER_MST2.PATT_COST =
                            tSAMPLE_COST.PATT_COST;
                        _dataEDT_KSV_ORDER_MST2.SEW_USER =
                            tSAMPLE_COST.SEW_USER;
                        _dataEDT_KSV_ORDER_MST2.SEW_COST =
                            tSAMPLE_COST.SEW_COST;
                        _dataEDT_KSV_ORDER_MST2.WELDING_COST =
                            tSAMPLE_COST.WELDING_COST;
                        _dataEDT_KSV_ORDER_MST2.SAMPLE_LEVEL =
                            tSAMPLE_COST.SAMPLE_STEP;
                        _dataEDT_KSV_ORDER_MST2.SAMPLE_SEQ =
                            tSAMPLE_COST.SAMPLE_ROUND;
                        _dataEDT_KSV_ORDER_MST2.SAMPLE_REASON =
                            tSAMPLE_COST.SAMPLE_REASON;
                    }
                    setDataEDT_KSV_ORDER_MST2(_dataEDT_KSV_ORDER_MST2);

                    setDatasEDT_KSV_ORDER_MST2_PATT_USER(data.CODE_PATT_USER);
                    editEDT_KSV_ORDER_MST2_PATT_USER(
                        _dataEDT_KSV_ORDER_MST2.PATT_USER,
                    );

                    setDatasEDT_KSV_ORDER_MST2_SEW_USER(data.CODE_SEW_USER);
                    editEDT_KSV_ORDER_MST2_SEW_USER(
                        _dataEDT_KSV_ORDER_MST2.SEW_USER,
                    );

                    setDatasEDT_KSV_ORDER_MST2_SAMPLE_LEVEL(
                        data.CODE_SAMPLE_STEP,
                    );
                    editEDT_KSV_ORDER_MST2_SAMPLE_LEVEL(
                        _dataEDT_KSV_ORDER_MST2.SAMPLE_LEVEL,
                    );

                    setDatasEDT_KSV_ORDER_MST2_SAMPLE_SEQ(
                        data.CODE_SAMPLE_ROUND,
                    );
                    editEDT_KSV_ORDER_MST2_SAMPLE_SEQ(
                        _dataEDT_KSV_ORDER_MST2.SAMPLE_SEQ,
                    );

                    setDatasEDT_KSV_ORDER_MST2_SAMPLE_REASON(
                        data.CODE_SAMPLE_REASON,
                    );
                    editEDT_KSV_ORDER_MST2_SAMPLE_REASON(
                        _dataEDT_KSV_ORDER_MST2.SAMPLE_REASON,
                    );

                    // MST3
                    let _dataEDT_KSV_ORDER_MST3 = { ...dataEDT_KSV_ORDER_MST3 };
                    _dataEDT_KSV_ORDER_MST3.FC_PRICE2 = tORDER_MST.FC_PRICE2;
                    _dataEDT_KSV_ORDER_MST3.END_REMARK = tORDER_MST.END_STATUS;
                    setDataEDT_KSV_ORDER_MST3(_dataEDT_KSV_ORDER_MST3);

                    // INVOICE
                    var tIdx = 0;
                    var tArrayInvoice = [];
                    for (tIdx = 0; tIdx < data.INVOICE_MEM.length; tIdx++) {
                        var tObj1 = data.INVOICE_MEM[tIdx];
                        var tObj0 = {};
                        tObj0.id = tIdx + 1;
                        tObj0.INVOICE_DATE = tObj1.SHIP_DATE;
                        tObj0.SHIP_PROD_TYPE = tObj1.SHIP_TYPE_NAME;
                        tObj0.SHIP_QTY = tObj1.SHIP_QTY;
                        tObj0.SALE_PRICE = tObj1.SALE_PRICE;
                        tObj0.INVOICE_NO = tObj1.INVOICE_NO;
                        tArrayInvoice.push(tObj0);
                    }
                    setDatasTBL_KSV_ORDER_MEM1(tArrayInvoice);

                    //
                    setDatasTBL_KSV_ORDER_MEM2(data.ORDER_MST_ARRAY);

                    // ORDER_MEM
                    var tObjCols = [];

                    if (data.ORDER_MST_ARRAY[0].ORDER_MEM.length > 0) {
                        var tOneORDER_MEM = data.ORDER_MST_ARRAY[0].ORDER_MEM;

                        var tIdx = 0;
                        var tKeys = Object.keys(tOneORDER_MEM);
                        for (tIdx = 0; tIdx < tKeys.length; tIdx++) {
                            var tKey = tKeys[tIdx];
                            if (tKey.includes("SIZE_COL")) {
                                var tObjColOne = {};
                                tObjColOne.field_name = tKey.split("_")[2];
                                tObjColOne.field = tKey;
                                tObjColOne.kind = "EDIT";
                                tObjCols.push(tObjColOne);
                            }
                        }

                        setDatasTBL_KSV_ORDER_MEM_COL(tObjCols);
                        setDatasTBL_KSV_ORDER_MEM(
                            data.ORDER_MST_ARRAY[0].ORDER_MEM,
                        );
                    }

                    console.log(
                        "serviceS020401_ORDER_INFO.mgrQueryORDER_INFO call(1) => " +
                            data.ORDER_MST.ORDER_CD,
                    );
                } else {
                    console.log(
                        "serviceS020401_ORDER_INFO.mgrQueryORDER_INFO error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });
    }, []);

    const blankFn = () => {};

    // Support Area

    const changeCheckBoxVal = (argVal) => {
        if (argVal === "1") return true;
        else return false;
    };

    const changeDateVal = (argVal) => {
        if (argVal === "") return argVal;
        var tType = typeof argVal;
        if (tType !== "string") {
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
                    height: "10rem",
                }}
            >
                <span
                    style={{
                        marginLeft: "0.5rem",
                        height: "2rem",
                        display: "inline-block",
                        width: "28rem",
                    }}
                >
                    <p style={{ width: "8rem", display: "inline-block" }}>Order</p>
                    <InputText
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "18rem",
                        }}
                        id="id_ORDER_CD"
                        value={dataEDT_KSV_ORDER_MST.ORDER_CD}
                        onChange={(e) =>
                            onInputChangeEDT_KSV_ORDER_MST_ORDER_CD(
                                e,
                                "ORDER_CD",
                            )
                        }
                    />
                </span>
                <span
                    style={{
                        marginLeft: "0.5rem",
                        height: "2rem",
                        display: "inline-block",
                        width: "11rem",
                    }}
                >
                    <p style={{ width: "8rem", display: "inline-block" }}>Outsourcing</p>
                    <div
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "2rem",
                        }}
                    >
                        <Checkbox
                            style={{ display: "inline-block", width: "2rem" }}
                            id="id_IS_OUTSOURCING"
                            checked={changeCheckBoxVal(
                                dataEDT_KSV_ORDER_MST.IS_OUTSOURCING,
                            )}
                            onChange={(e) =>
                                onCheckboxChangeEDT_KSV_ORDER_MST_IS_OUTSOURCING(
                                    e,
                                    "IS_OUTSOURCING",
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
                        width: "11rem",
                    }}
                >
                    <p style={{ width: "6rem", display: "inline-block" }}>Sample</p>
                    <div
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "2rem",
                        }}
                    >
                        <Checkbox
                            style={{ display: "inline-block", width: "2rem" }}
                            id="id_IS_SAMPLE"
                            checked={changeCheckBoxVal(
                                dataEDT_KSV_ORDER_MST.IS_SAMPLE,
                            )}
                            onChange={(e) =>
                                onCheckboxChangeEDT_KSV_ORDER_MST_IS_SAMPLE(
                                    e,
                                    "IS_SAMPLE",
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
                        width: "11rem",
                    }}
                >
                    <p style={{ width: "6rem", display: "inline-block" }}>Factory FOB</p>
                    <div
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "2rem",
                        }}
                    >
                        <Checkbox
                            style={{ display: "inline-block", width: "2rem" }}
                            id="id_IS_FACTORY_FOB"
                            checked={changeCheckBoxVal(
                                dataEDT_KSV_ORDER_MST.IS_FACTORY_FOB,
                            )}
                            onChange={(e) =>
                                onCheckboxChangeEDT_KSV_ORDER_MST_IS_FACTORY_FOB(
                                    e,
                                    "IS_FACTORY_FOB",
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
                        width: "13rem",
                    }}
                >
                    <p style={{ width: "2rem", display: "inline-block" }}>PO</p>
                    <InputText
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "10rem",
                        }}
                        id="id_PO_CD"
                        value={dataEDT_KSV_ORDER_MST.PO_CD}
                        onChange={(e) =>
                            onInputChangeEDT_KSV_ORDER_MST_PO_CD(e, "PO_CD")
                        }
                    />
                </span>
                <span
                    style={{
                        marginLeft: "1rem",
                        height: "2rem",
                        display: "inline-block",
                        width: "15rem",
                    }}
                >
                    <p style={{ width: "4rem", display: "inline-block" }}>User</p>
                    <InputText
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "10rem",
                        }}
                        id="id_REG_USER"
                        value={dataEDT_KSV_ORDER_MST.REG_USER}
                        onChange={(e) =>
                            onInputChangeEDT_KSV_ORDER_MST_REG_USER(
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
                        width: "35rem",
                    }}
                >
                    <p style={{ width: "8rem", display: "inline-block" }}>Style</p>
                    <InputText
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "25rem",
                        }}
                        id="id_STYLE_NAME"
                        value={dataEDT_KSV_ORDER_MST.STYLE_NAME}
                        onChange={(e) =>
                            onInputChangeEDT_KSV_ORDER_MST_STYLE_NAME(
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
                        width: "25rem",
                    }}
                >
                    <p style={{ width: "9rem", display: "inline-block" }}>Order Status</p>
                    <div
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "15rem",
                        }}
                    >
                        <Dropdown
                            id="id_ORDER_STATUS_CD"
                            value={dataEDT_KSV_ORDER_MST_ORDER_STATUS}
                            onChange={(e) =>
                                onDropdownChangeEDT_KSV_ORDER_MST_ORDER_STATUS(
                                    e,
                                    "ORDER_STATUS",
                                )
                            }
                            options={datasEDT_KSV_ORDER_MST_ORDER_STATUS}
                            optionLabel="ORDER_STATUS"
                            placeholder=""
                            editable
                        ></Dropdown>
                    </div>
                </span>
                <span>
                    <InputText
                        style={{
                            marginLeft: "5rem",
                            display: "inline-block",
                            width: "10rem",
                        }}
                        id="id_STYLE_NAME"
                        value={dataEDT_KSV_ORDER_MST.STYLE_NAME}
                        onChange={(e) =>
                            onInputChangeEDT_KSV_ORDER_MST_STYLE_NAME(
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
                        width: "16rem",
                    }}
                >
                    <p style={{ width: "5rem", display: "inline-block" }}>Reg Date</p>
                    <InputText
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "10rem",
                        }}
                        id="id_REG_DATETIME"
                        value={dataEDT_KSV_ORDER_MST.REG_DATETIME}
                        onChange={(e) =>
                            onInputChangeEDT_KSV_ORDER_MST_REG_DATETIME(
                                e,
                                "REG_DATETIME",
                            )
                        }
                    />
                </span>
                <span
                    style={{
                        marginLeft: "0.5rem",
                        height: "2rem",
                        display: "inline-block",
                        width: "40rem",
                    }}
                >
                    <p style={{ width: "8rem", display: "inline-block" }}>Buyer</p>
                    <InputText
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "25rem",
                        }}
                        id="id_BUYER_NAME"
                        value={dataEDT_KSV_ORDER_MST.BUYER_NAME}
                        onChange={(e) =>
                            onInputChangeEDT_KSV_ORDER_MST_BUYER_NAME(
                                e,
                                "BUYER_NAME",
                            )
                        }
                    />
                </span>
                <span
                    style={{
                        marginLeft: "0.5rem",
                        height: "2rem",
                        display: "inline-block",
                        width: "20rem",
                    }}
                >
                    <p style={{ width: "4rem", display: "inline-block" }}>Factory</p>
                    <div
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "15rem",
                        }}
                    >
                        <Dropdown
                            id="id_FACTORY_CD"
                            value={dataEDT_KSV_ORDER_MST_FACTORY_CD}
                            onChange={(e) =>
                                onDropdownChangeEDT_KSV_ORDER_MST_FACTORY_CD(
                                    e,
                                    "FACTORY_CD",
                                )
                            }
                            options={datasEDT_KSV_ORDER_MST_FACTORY_CD}
                            optionLabel="FACTORY_NAME"
                            placeholder=""
                            editable
                            disabled
                        ></Dropdown>
                    </div>
                </span>
                <span
                    style={{
                        marginLeft: "0.5rem",
                        height: "2rem",
                        display: "inline-block",
                        width: "15rem",
                    }}
                >
                    <p style={{ width: "4rem", display: "inline-block" }}>Team</p>
                    <div
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "10rem",
                        }}
                    >
                        <Dropdown
                            id="id_BUYER_TEAM"
                            value={dataEDT_KSV_ORDER_MST_BUYER_TEAM}
                            onChange={(e) =>
                                onDropdownChangeEDT_KSV_ORDER_MST_BUYER_TEAM(
                                    e,
                                    "BUYER_TEAM",
                                )
                            }
                            options={datasEDT_KSV_ORDER_MST_BUYER_TEAM}
                            optionLabel="CD_NAME"
                            placeholder=""
                            editable
                            filter
                            disabled
                        ></Dropdown>
                    </div>
                </span>
                <span
                    style={{
                        marginLeft: "0.5rem",
                        height: "2rem",
                        display: "inline-block",
                        width: "15rem",
                    }}
                >
                    <p style={{ width: "4rem", display: "inline-block" }}>App.User</p>
                    <InputText
                        style={{
                            marginLeft: "1rem",
                            display: "inline-block",
                            width: "10rem",
                        }}
                        id="id_APPROVAL_USER"
                        value={dataEDT_KSV_ORDER_MST.APPROVAL_USER}
                        onChange={(e) =>
                            onInputChangeEDT_KSV_ORDER_MST_APPROVAL_USER(
                                e,
                                "APPROVAL_USER",
                            )
                        }
                    />
                </span>

                <span
                    style={{
                        marginLeft: "0.5rem",
                        height: "2rem",
                        display: "inline-block",
                        width: "61rem",
                    }}
                >
                    <p style={{ width: "8rem", display: "inline-block" }}>Size Group</p>
                    <InputText
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "25rem",
                        }}
                        id="id_SIZE_GROUP"
                        value={dataEDT_KSV_ORDER_MST.SIZE_MEMBER}
                        onChange={(e) =>
                            onInputChangeEDT_KSV_ORDER_MST_SIZE_GROUP(
                                e,
                                "SIZE_MEMBER",
                            )
                        }
                    />

                    <Button
                        style={{ display: "inline-block", width: "14rem" }}
                        label="Size/Qty Change"
                        className="p-button-text"
                        onClick={blankFn}
                    />

                    <Button
                        style={{ display: "inline-block", width: "10rem" }}
                        label="Insert Capa"
                        className="p-button-text"
                        onClick={process_INSERT_CAPA}
                    />
                </span>
                <span
                    style={{
                        marginLeft: "0.5rem",
                        height: "2rem",
                        display: "inline-block",
                        width: "9.5rem",
                    }}
                >
                    <p style={{ width: "3.5rem", display: "inline-block" }}>Mid</p>
                    <InputText
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "3rem",
                        }}
                        id="id_mid_size1"
                        value={dataEDT_KSV_ORDER_MST.mid_size1}
                        onChange={(e) =>
                            onInputChangeEDT_KSV_ORDER_MST_mid_size1(
                                e,
                                "mid_size1",
                            )
                        }
                    />
                </span>
                <span
                    style={{
                        marginLeft: "0.5rem",
                        height: "2rem",
                        display: "inline-block",
                        width: "20.5rem",
                    }}
                >
                    <p style={{ width: "9.5rem", display: "inline-block" }}>App.Date</p>
                    <InputText
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "10rem",
                        }}
                        id="id_APPROVAL_DATETIME"
                        value={dataEDT_KSV_ORDER_MST.APPROVAL_DATETIME}
                        onChange={(e) =>
                            onInputChangeEDT_KSV_ORDER_MST_APPROVAL_DATETIME(
                                e,
                                "APPROVAL_DATETIME",
                            )
                        }
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
                <div style={{ width: "25rem", float: "left" }}>
                    <div
                        style={{
                            width: "25rem",
                            height: "20rem",
                            marginTop: "1rem",
                        }}
                    >
                        <AFDataTable preventUnrelatedRerender
                            ref={dt_TBL_KSV_ORDER_MEM2}
                            size="small"
                            value={datasTBL_KSV_ORDER_MEM2}
                            resizableColumns
                            columnResizeMode="fit"
                            showGridlines
                            selectionMode="checkbox"
                            selection={selectedTBL_KSV_ORDER_MEM2}
                            onSelectionChange={(e) => {
                                setFlagSelectModeTBL_KSV_ORDER_MEM2(true);
                                setSelectedTBL_KSV_ORDER_MEM2(e.value);
                                console.log(
                                    "selected length:" +
                                        selectedTBL_KSV_ORDER_MEM2.length,
                                );
                                onRowClick1TBL_KSV_ORDER_MEM2(e.value);
                            }}
                            onRowClick={onRowClickTBL_KSV_ORDER_MEM2}
                            dataKey="ORDER_CD"
                            className="datatable-responsive"
                            virtualScrollerOptions={{ itemSize: 9 }}
                            emptyMessage=" "
                            //header={headerTBL_KSV_ORDER_MEM}
                            responsiveLayout="scroll"
                            scrollable
                            scrollHeight="18rem"
                        >
                            <AFColumn field="ORDER_CD" headerClassName="t-header" header="Order Cd" style={{ width: "8rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                            <AFColumn field="NAT_CD" headerClassName="t-header" header="Country" style={{ width: "6rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                            <AFColumn field="DUE_DATE" headerClassName="t-header" header="Due Date" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                        </AFDataTable>
                    </div>
                </div>

                <div style={{ width: "74rem", float: "left" }}>
                    <div
                        style={{
                            width: "74rem",
                            height: "20rem",
                            marginTop: "1rem",
                        }}
                    >
                        <AFDataTable preventUnrelatedRerender
                            ref={dt_TBL_KSV_ORDER_MEM}
                            size="small"
                            value={datasTBL_KSV_ORDER_MEM}
                            resizableColumns
                            columnResizeMode="fit"
                            showGridlines
                            selectionMode="checkbox"
                            selection={selectedTBL_KSV_ORDER_MEM}
                            onSelectionChange={(e) => {
                                setFlagSelectModeTBL_KSV_ORDER_MEM(true);
                                setSelectedTBL_KSV_ORDER_MEM(e.value);
                                console.log(
                                    "selected length:" +
                                        selectedTBL_KSV_ORDER_MEM.length,
                                );
                                onRowClick1TBL_KSV_ORDER_MEM(e.value);
                            }}
                            onRowClick={onRowClickTBL_KSV_ORDER_MEM}
                            dataKey="id"
                            className="datatable-responsive"
                            virtualScrollerOptions={{ itemSize: 18 }}
                            emptyMessage=" "
                            //header={headerTBL_KSV_ORDER_MEM}
                            responsiveLayout="scroll"
                            scrollable
                            scrollHeight="18rem"
                        >
                            <AFColumn field="PROD_CD" headerClassName="t-header" header="Prod" style={{ width: "8rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                            <AFColumn field="ADD_FLAG" headerClassName="t-header" header="Add Ship" style={{ width: "8rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                            <AFColumn field="COLOR" headerClassName="t-header" header="Color" style={{ width: "5rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                            <AFColumn field="TOT_CNT" headerClassName="t-header" header="Total" style={{ width: "4rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                            <AFColumn field="PRICE" headerClassName="t-header" header="Price" style={{ width: "4rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                            {dynamicColumnsTBL_KSV_ORDER_MEM}
                        </AFDataTable>
                    </div>
                </div>
            </div>

            <Divider />

            <div
                style={{ marginLeft: "1rem", width: "99rem", height: "22rem" }}
            >
                <div style={{ width: "64rem", float: "left" }}>
                    <div
                        style={{
                            width: "64rem",
                            height: "20rem",
                            marginTop: "1rem",
                        }}
                    >
                        <span
                            style={{
                                marginLeft: "0.5rem",
                                height: "2rem",
                                display: "inline-block",
                                width: "23rem",
                            }}
                        >
                            <p style={{ width: "8rem", display: "inline-block", }}>Order Date</p>
                            <div
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "10rem",
                                }}
                            >
                                <Calendar
                                    showButtonBar
                                    dateFormat="yy-mm-dd"
                                    id="id_ORDER_DATE"
                                    value={changeDateVal(
                                        dataEDT_KSV_ORDER_MST1.ORDER_DATE,
                                    )}
                                    onChange={(e) =>
                                        onCalChangeEDT_KSV_ORDER_MST1_ORDER_DATE(
                                            e,
                                            "ORDER_DATE",
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
                                width: "20rem",
                            }}
                        >
                            <p style={{ width: "5rem", display: "inline-block", }}>Order Qty</p>
                            <InputText
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "4rem",
                                }}
                                id="id_TOT_CNT"
                                value={dataEDT_KSV_ORDER_MST1.TOT_CNT}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_ORDER_MST1_TOT_CNT(
                                        e,
                                        "TOT_CNT",
                                    )
                                }
                                disabled
                            />

                            <InputText
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "4rem",
                                }}
                                id="id_ADD_CNT"
                                value={dataEDT_KSV_ORDER_MST1.ADD_CNT}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_ORDER_MST1_ADD_CNT(
                                        e,
                                        "ADD_CNT",
                                    )
                                }
                                disabled
                            />

                            <InputText
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "4rem",
                                }}
                                id="id_OVER_QTY"
                                value={dataEDT_KSV_ORDER_MST1.OVER_QTY}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_ORDER_MST1_OVER_QTY(
                                        e,
                                        "OVER_QTY",
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
                                width: "16rem",
                            }}
                        >
                            <p style={{ width: "5rem", display: "inline-block", }}>Ship Qty</p>
                            <InputText
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "10rem",
                                }}
                                id="id_SHIP_QTY"
                                value={dataEDT_KSV_ORDER_MST1.SHIP_QTY}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_ORDER_MST1_SHIP_QTY(
                                        e,
                                        "SHIP_QTY",
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
                                width: "23rem",
                            }}
                        >
                            <p style={{ width: "8rem", display: "inline-block", }}>Due Date</p>
                            <div
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "10rem",
                                }}
                            >
                                <Calendar
                                    showButtonBar
                                    dateFormat="yy-mm-dd"
                                    id="id_DUE_DATE"
                                    value={changeDateVal(
                                        dataEDT_KSV_ORDER_MST1.DUE_DATE,
                                    )}
                                    onChange={(e) =>
                                        onCalChangeEDT_KSV_ORDER_MST1_DUE_DATE(
                                            e,
                                            "DUE_DATE",
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
                                width: "20rem",
                            }}
                        >
                            <p style={{ width: "5rem", display: "inline-block", }}>FOB</p>
                            <InputText
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "10rem",
                                }}
                                id="id_FOB_USD"
                                value={dataEDT_KSV_ORDER_MST1.FOB_USD}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_ORDER_MST1_FOB_USD(
                                        e,
                                        "FOB_USD",
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
                                width: "16rem",
                            }}
                        >
                            <p style={{ width: "5rem", display: "inline-block", }}>Order Amt</p>
                            <InputText
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "10rem",
                                }}
                                id="id_ORDER_AMT"
                                value={dataEDT_KSV_ORDER_MST1.ORDER_AMT}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_ORDER_MST1_ORDER_AMT(
                                        e,
                                        "ORDER_AMT",
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
                                width: "22rem",
                            }}
                        >
                            <p style={{ width: "8rem", display: "inline-block", }}>Matl Due Date</p>
                            <div
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "10rem",
                                }}
                            >
                                <Calendar
                                    showButtonBar
                                    dateFormat="yy-mm-dd"
                                    id="id_MATL_DUE_DATE"
                                    value={changeDateVal(
                                        dataEDT_KSV_ORDER_MST1.MATL_DUE_DATE,
                                    )}
                                    onChange={(e) =>
                                        onCalChangeEDT_KSV_ORDER_MST1_MATL_DUE_DATE(
                                            e,
                                            "MATL_DUE_DATE",
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
                                width: "21rem",
                            }}
                        >
                            <p style={{ width: "6rem", display: "inline-block", }}>Labor Cost</p>
                            <InputText
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "10rem",
                                }}
                                id="id_LABOR_COST"
                                value={dataEDT_KSV_ORDER_MST1.LABOR_COST}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_ORDER_MST1_LABOR_COST(
                                        e,
                                        "LABOR_COST",
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
                                width: "16rem",
                            }}
                        >
                            <p style={{ width: "5rem", display: "inline-block", }}>Labor Amt</p>
                            <InputText
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "10rem",
                                }}
                                id="id_LABOR_AMT"
                                value={dataEDT_KSV_ORDER_MST1.LABOR_AMT}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_ORDER_MST1_LABOR_AMT(
                                        e,
                                        "LABOR_AMT",
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
                                width: "21rem",
                            }}
                        >
                            <p style={{ width: "8rem", display: "inline-block", }}>Country</p>
                            <div
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "10rem",
                                }}
                            >
                                <Dropdown
                                    id="id_NAT_CD"
                                    value={dataEDT_KSV_ORDER_MST1_NAT_CD}
                                    onChange={(e) =>
                                        onDropdownChangeEDT_KSV_ORDER_MST1_NAT_CD(
                                            e,
                                            "NAT_CD",
                                        )
                                    }
                                    options={datasEDT_KSV_ORDER_MST1_NAT_CD}
                                    optionLabel="NAT_NAME"
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
                                width: "21rem",
                            }}
                        >
                            <p style={{ width: "7rem", display: "inline-block", }}>Material Cost</p>
                            <InputText
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "10rem",
                                }}
                                id="id_MATERIAL_COST"
                                value={dataEDT_KSV_ORDER_MST1.MATERIAL_COST}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_ORDER_MST1_MATERIAL_COST(
                                        e,
                                        "MATERIAL_COST",
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
                                width: "17rem",
                            }}
                        >
                            <p style={{ width: "6rem", display: "inline-block", }}>Material Amt</p>
                            <InputText
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "10rem",
                                }}
                                id="id_MATERIAL_AMT"
                                value={dataEDT_KSV_ORDER_MST1.MATERIAL_AMT}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_ORDER_MST1_MATERIAL_AMT(
                                        e,
                                        "MATERIAL_AMT",
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
                                width: "21rem",
                            }}
                        >
                            <p style={{ width: "8rem", display: "inline-block", }}>Currency</p>
                            <div
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "10rem",
                                }}
                            >
                                <Dropdown
                                    id="id_CURR_CD"
                                    value={dataEDT_KSV_ORDER_MST1_CURR_CD}
                                    onChange={(e) =>
                                        onDropdownChangeEDT_KSV_ORDER_MST1_CURR_CD(
                                            e,
                                            "CURR_CD",
                                        )
                                    }
                                    options={datasEDT_KSV_ORDER_MST1_CURR_CD}
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
                                width: "20rem",
                            }}
                        >
                            <p style={{ width: "7rem", display: "inline-block", }}>Import Cost</p>
                            <InputText
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "10rem",
                                }}
                                id="id_IMPORT_COST"
                                value={dataEDT_KSV_ORDER_MST1.IMPORT_COST}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_ORDER_MST1_IMPORT_COST(
                                        e,
                                        "IMPORT_COST",
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
                                width: "18rem",
                            }}
                        >
                            <p style={{ width: "7rem", display: "inline-block", }}>Import Charge</p>
                            <InputText
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "10rem",
                                }}
                                id="id_IMPORT_CHARGE"
                                value={dataEDT_KSV_ORDER_MST1.IMPORT_CHARGE}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_ORDER_MST1_IMPORT_CHARGE(
                                        e,
                                        "IMPORT_CHARGE",
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
                                width: "20rem",
                            }}
                        >
                            <p style={{ width: "8rem", display: "inline-block", }}>FOB</p>
                            <div
                                style={{
                                    display: "inline-block",
                                    width: "10rem",
                                }}
                            >
                                <InputText
                                    style={{
                                        marginLeft: "0.5rem",
                                        display: "inline-block",
                                        width: "10rem",
                                    }}
                                    id="id_FOB"
                                    value={dataEDT_KSV_ORDER_MST1.FOB}
                                    onChange={(e) =>
                                        onInputChangeEDT_KSV_ORDER_MST1_FOB(
                                            e,
                                            "FOB",
                                        )
                                    }
                                    disabled
                                />
                            </div>
                        </span>
                        <span
                            style={{
                                marginLeft: "0.5rem",
                                height: "2rem",
                                display: "inline-block",
                                width: "20rem",
                            }}
                        >
                            <p style={{ width: "8rem", display: "inline-block", }}>Unit COST</p>
                            <InputText
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "10rem",
                                }}
                                id="id_UNIT_COST"
                                value={dataEDT_KSV_ORDER_MST1.UNIT_COST}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_ORDER_MST1_UNIT_COST(
                                        e,
                                        "UNIT_COST",
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
                                width: "19rem",
                            }}
                        >
                            <p style={{ width: "8rem", display: "inline-block", }}>Total COST</p>
                            <InputText
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "10rem",
                                }}
                                id="id_TOTAL_COST"
                                value={dataEDT_KSV_ORDER_MST1.TOTAL_COST}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_ORDER_MST1_TOTAL_COST(
                                        e,
                                        "TOTAL_COST",
                                    )
                                }
                                disabled
                            />
                        </span>
                    </div>
                </div>
                <Divider
                    layout="vertical"
                    style={{ float: "left", height: "22.5rem" }}
                />
                <div
                    style={{
                        float: "left",
                        width: "32.5rem",
                        marginTop: "1rem",
                    }}
                >
                    <AFDataTable preventUnrelatedRerender
                        ref={dt_TBL_KSV_ORDER_MEM1}
                        size="small"
                        value={datasTBL_KSV_ORDER_MEM1}
                        resizableColumns
                        columnResizeMode="fit"
                        showGridlines
                        selectionMode="checkbox"
                        selection={selectedTBL_KSV_ORDER_MEM1}
                        onSelectionChange={(e) => {
                            setFlagSelectModeTBL_KSV_ORDER_MEM1(true);
                            setSelectedTBL_KSV_ORDER_MEM1(e.value);
                            console.log(
                                "selected length:" +
                                    selectedTBL_KSV_ORDER_MEM1.length,
                            );
                            onRowClick1TBL_KSV_ORDER_MEM1(e.value);
                        }}
                        onRowClick={onRowClickTBL_KSV_ORDER_MEM1}
                        dataKey="id"
                        className="datatable-responsive"
                        virtualScrollerOptions={{ itemSize: 50 }}
                        emptyMessage=" "
                        //header={headerTBL_KSV_ORDER_MEM1}
                        responsiveLayout="scroll"
                        scrollable
                        scrollHeight="18rem"
                    >
                        <AFColumn field="INVOICE_DATE" headerClassName="t-header" header="Inv Sd" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                        <AFColumn field="SHIP_PROD_TYPE" headerClassName="t-header" header="Ship Prod Type" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                        <AFColumn field="SHIP_QTY" headerClassName="t-header" header="Qty" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                        <AFColumn field="SALE_PRICE" headerClassName="t-header" header="S Price" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                        <AFColumn field="INVOICE_NO" headerClassName="t-header" header="InVoice NO" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    </AFDataTable>
                </div>
            </div>

            <Divider />

            <div
                style={{ width: "100rem", height: "20rem", marginTop: "1rem" }}
            >
                <div className="flex flex-row justify-content-start align-items-top">
                    <div style={{ width: "99rem", height: "13rem" }}>
                        <span
                            style={{
                                marginLeft: "0.5rem",
                                height: "2rem",
                                display: "inline-block",
                                width: "28rem",
                            }}
                        >
                            <p style={{ width: "8rem", display: "inline-block", }}>Buyer PO</p>
                            <InputText
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "18rem",
                                }}
                                id="id_REF_ORDER_NO"
                                value={dataEDT_KSV_ORDER_MST2.REF_ORDER_NO}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_ORDER_MST2_REF_ORDER_NO(
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
                                width: "17rem",
                            }}
                        >
                            <p style={{ width: "8rem", display: "inline-block", }}>패턴유저</p>
                            <div
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "8rem",
                                }}
                            >
                                <Dropdown
                                    id="id_PATT_USER"
                                    value={dataEDT_KSV_ORDER_MST2_PATT_USER}
                                    onChange={(e) =>
                                        onDropdownChangeEDT_KSV_ORDER_MST2_PATT_USER(
                                            e,
                                            "PATT_USER",
                                        )
                                    }
                                    options={datasEDT_KSV_ORDER_MST2_PATT_USER}
                                    optionLabel="USER_NAME"
                                    placeholder=""
                                    editable
                                    filter
                                ></Dropdown>
                            </div>
                        </span>
                        <span
                            style={{
                                marginLeft: "0.5rem",
                                height: "2rem",
                                display: "inline-block",
                                width: "7rem",
                            }}
                        >
                            {/* <p style={{ width: '8rem', display: 'inline-block' }}> 패턴Cost </p> */}
                            <div
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "6rem",
                                }}
                            >
                                <InputText
                                    style={{
                                        marginLeft: "0.5rem",
                                        display: "inline-block",
                                        width: "8rem",
                                    }}
                                    id="id_PATT_COST"
                                    value={dataEDT_KSV_ORDER_MST2.PATT_COST}
                                    onChange={(e) =>
                                        onInputChangeEDT_KSV_ORDER_MST2_PATT_COST(
                                            e,
                                            "PATT_COST",
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
                                width: "17rem",
                            }}
                        >
                            <p style={{ width: "8rem", display: "inline-block", }}>샘플단계</p>
                            <div
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "8rem",
                                }}
                            >
                                <Dropdown
                                    id="id_SAMPLE_LEVEL"
                                    value={dataEDT_KSV_ORDER_MST2_SAMPLE_LEVEL}
                                    onChange={(e) =>
                                        onDropdownChangeEDT_KSV_ORDER_MST2_SAMPLE_LEVEL(
                                            e,
                                            "SAMPLE_LEVEL",
                                        )
                                    }
                                    options={
                                        datasEDT_KSV_ORDER_MST2_SAMPLE_LEVEL
                                    }
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
                                width: "17rem",
                            }}
                        >
                            <p style={{ width: "8rem", display: "inline-block", }}>ETC</p>
                            <InputText
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "8rem",
                                }}
                                id="id_ETC"
                                value={dataEDT_KSV_ORDER_MST2.ETC}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_ORDER_MST2_ETC(
                                        e,
                                        "ETC",
                                    )
                                }
                            />
                        </span>
                        <span
                            style={{
                                marginLeft: "0.5rem",
                                height: "2rem",
                                display: "inline-block",
                                width: "28rem",
                            }}
                        >
                            <p style={{ width: "8rem", display: "inline-block", }}>Remark1</p>
                            <InputText
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "18rem",
                                }}
                                id="id_REMARK1"
                                value={dataEDT_KSV_ORDER_MST2.REMARK1}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_ORDER_MST2_REMARK1(
                                        e,
                                        "REMARK1",
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
                            <p style={{ width: "8rem", display: "inline-block", }}>봉제유저</p>
                            <div
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "8rem",
                                }}
                            >
                                <Dropdown
                                    id="id_SEW_USER"
                                    value={dataEDT_KSV_ORDER_MST2_SEW_USER}
                                    onChange={(e) =>
                                        onDropdownChangeEDT_KSV_ORDER_MST2_SEW_USER(
                                            e,
                                            "SEW_USER",
                                        )
                                    }
                                    options={datasEDT_KSV_ORDER_MST2_SEW_USER}
                                    optionLabel="USER_NAME"
                                    placeholder=""
                                    editable
                                    filter
                                ></Dropdown>
                            </div>
                        </span>
                        <span
                            style={{
                                marginLeft: "0.5rem",
                                height: "2rem",
                                display: "inline-block",
                                width: "7rem",
                            }}
                        >
                            {/* <p style={{ width: '8rem', display: 'inline-block' }}> 봉제Cost </p> */}
                            <div
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "6rem",
                                }}
                            >
                                <InputText
                                    style={{
                                        marginLeft: "0.5rem",
                                        display: "inline-block",
                                        width: "8rem",
                                    }}
                                    id="id_SEW_COST"
                                    value={dataEDT_KSV_ORDER_MST2.SEW_COST}
                                    onChange={(e) =>
                                        onInputChangeEDT_KSV_ORDER_MST2_SEW_COST(
                                            e,
                                            "SEW_COST",
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
                                width: "17rem",
                            }}
                        >
                            <p style={{ width: "8rem", display: "inline-block", }}>차수</p>
                            <div
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "8rem",
                                }}
                            >
                                <Dropdown
                                    id="id_SAMPLE_SEQ"
                                    value={dataEDT_KSV_ORDER_MST2_SAMPLE_SEQ}
                                    onChange={(e) =>
                                        onDropdownChangeEDT_KSV_ORDER_MST2_SAMPLE_SEQ(
                                            e,
                                            "SAMPLE_SEQ",
                                        )
                                    }
                                    options={datasEDT_KSV_ORDER_MST2_SAMPLE_SEQ}
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
                                width: "28rem",
                            }}
                        >
                            <p style={{ width: "8rem", display: "inline-block", }}>Remark2</p>
                            <InputText
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "17rem",
                                }}
                                id="id_REMARK2"
                                value={dataEDT_KSV_ORDER_MST2.REMARK2}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_ORDER_MST2_REMARK2(
                                        e,
                                        "REMARK2",
                                    )
                                }
                            />
                        </span>
                        <span
                            style={{
                                marginLeft: "0.5rem",
                                height: "2rem",
                                display: "inline-block",
                                width: "24.5rem",
                            }}
                        >
                            <p style={{ width: "8rem", display: "inline-block", }}>웰딩Cost</p>
                            <InputText
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "8rem",
                                }}
                                id="id_WELDING_COST"
                                value={dataEDT_KSV_ORDER_MST2.WELDING_COST}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_ORDER_MST2_WELDING_COST(
                                        e,
                                        "WELDING_COST",
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
                            <p style={{ width: "8rem", display: "inline-block", }}>원인</p>
                            <div
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "8rem",
                                }}
                            >
                                <Dropdown
                                    id="id_SAMPLE_REASON"
                                    value={dataEDT_KSV_ORDER_MST2_SAMPLE_REASON}
                                    onChange={(e) =>
                                        onDropdownChangeEDT_KSV_ORDER_MST2_SAMPLE_REASON(
                                            e,
                                            "SAMPLE_REASON",
                                        )
                                    }
                                    options={
                                        datasEDT_KSV_ORDER_MST2_SAMPLE_REASON
                                    }
                                    optionLabel="CD_NAME"
                                    placeholder=""
                                    editable
                                ></Dropdown>
                            </div>
                        </span>
                        <span
                            style={{
                                marginLeft: "0.5rem",
                                height: "7rem",
                                display: "inline-block",
                                width: "54rem",
                            }}
                        >
                            <p style={{ width: "8rem", display: "inline-block", height: "7rem", }}>Note</p>
                            <InputTextarea
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "44rem",
                                }}
                                id="id_NOTE"
                                value={dataEDT_KSV_ORDER_MST2.NOTE}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_ORDER_MST2_NOTE(
                                        e,
                                        "NOTE",
                                    )
                                }
                                rows={5}
                                cols={30}
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
                            <p style={{ width: "7rem", display: "inline-block", }}>Org</p>
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
                                    id="id_ORG_DUE_DATE"
                                    value={changeDateVal(
                                        dataEDT_KSV_ORDER_MST2.ORG_DUE_DATE,
                                    )}
                                    onChange={(e) =>
                                        onCalChangeEDT_KSV_ORDER_MST2_ORG_DUE_DATE(
                                            e,
                                            "ORG_DUE_DATE",
                                        )
                                    }
                                />
                            </div>
                        </span>
                    </div>
                </div>
                <div style={{ width: "40rem", height: "7rem" }}>
                    <span
                        style={{
                            marginLeft: "0.5rem",
                            height: "2rem",
                            display: "inline-block",
                            width: "33rem",
                        }}
                    >
                        <p style={{ width: "8rem", display: "inline-block" }}>FC</p>
                        <InputText
                            style={{
                                marginLeft: "0.5rem",
                                display: "inline-block",
                                width: "23rem",
                            }}
                            id="id_FC_PRICE2"
                            value={dataEDT_KSV_ORDER_MST3.FC_PRICE2}
                            onChange={(e) =>
                                onInputChangeEDT_KSV_ORDER_MST3_FC_PRICE2(
                                    e,
                                    "FC_PRICE2",
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
                        <p style={{ width: "8rem", display: "inline-block" }}>End</p>
                        <InputText
                            style={{
                                marginLeft: "0.5rem",
                                display: "inline-block",
                                width: "23rem",
                            }}
                            id="id_END_REMARK"
                            value={dataEDT_KSV_ORDER_MST3.END_REMARK}
                            onChange={(e) =>
                                onInputChangeEDT_KSV_ORDER_MST3_END_REMARK(
                                    e,
                                    "END_REMARK",
                                )
                            }
                        />
                    </span>
                </div>
            </div>
            <Divider />

            <div
                style={{ width: "100rem", height: "2rem", marginLeft: "1rem" }}
            >
                <div className="formgrid grid">
                    <div className="field col-6 md:col-6">
                        <Button
                            style={{ display: "inline-block", width: "10rem" }}
                            label="Order Delete"
                            icon="pi pi-times"
                            className="p-button-text"
                            onClick={process_DELETE_ORDER}
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

export default React.memo(S020401_ORDER_INFO, comparisonFn);
