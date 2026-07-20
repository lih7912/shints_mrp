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
// import { ServiceS0418_GARMENT_FREIGHT } from '../service/service_biz/ServiceS0418_GARMENT_FREIGHT';

import "./page_common.scss";

const emptyKCD_CODE = {
    id: 0,
    CD_GROUP: "",
    CD_CODE: "",
    CD_NAME: "",
    CD_FLAG: "",
};

const emptyQRY_KSV_PO_MATLLIST = {
    S_FRT_DATE: "",
    E_FRT_DATE: "",
    FRT_TYPE: "",
    SENDER: "",
    QRY_KIND: "",
    RECEIVER: "",
    VENDOR_CD: "",
    USER_ID: "",
    PO_CD: "",
    BUYER_CD: "",
    BL_TYPE: "",
    INVOICE_NO: "",
};

const emptyTBL_KSV_PO_MATL_LIST = {
    id: 0,
    FRT_DATE: "",
    TRADE_TYPE: "",
    IS_OK: "",
    DEPARTURE: "",
    DESTINATION: "",
    SENDER: "",
    RECEIVER: "",
    BUYER: "",
    PO_CD: "",
    ORDER_CD: "",
    SPEC: "",
    Qty: "",
    WEIGHT: "",
    AMOUNT: "",
    CURR_CD: "",
    DELAY_REASON: "",
    FRT_TYPE: "",
    AREA_TYPE: "",
    MATL_TYPE: "",
    BL_NO: "",
    REMARK: "",
    STYLE_NAME: "",
    MATL_CD: "",
    WEIGHT_NET: "",
    NET: "",
    VAT: "",
    ADP_CHECK: "",
    INVOICE_NO: "",
    CHARGE_KIND: "",
    cHARGE_CODE: "",
    REG_USER: "",
    REG_DATETIME: "",
    TRADE_TYPE: "",
    FRT_TYPE: "",
    AREA_TYPE: "",
    MATL_TYPE: "",
    UNIT: "",
    PRICE: "",
    MW: "",
    GARMENT_COMPO: "",
    PO_SEQ: "",
    IN_DATETIME: "",
    MATL_NAME: "",
    COLOR: "",
    SPEC: "",
    UNIT: "",
    FRT_IDX: "",
};

const emptyEDT_KSV_PO_MATL_LIST = {
    FRT_DATE: "",
    TRADE_TYPE: "",
    AREA_TYPE: "",
    MATL_TYPE: "",
    PACEL_TYPE: "",
    REG_USER: "",
    DEPARTURE: "",
    DESTINATION: "",
    IS_COST: "",
    SENDER: "",
    RECEIVER: "",
    BUYER_CD: "",
    DELAY_REASON: "",
    NET: "",
    VAT: "",
    AMOUNT: "",
    CURR_CD: "",
    MW: "",
    CHARGE1: "",
    CHARGE2: "",
    WEIGHT_CBM: "",
    WEIGHT_NET: "",
    DESC: "",
    BL_NO: "",
    GARMENT_COMP: "",
    INVOICE_NO: "",
    REMARK: "",
    PO_CD: "",
    ORDER_CD: "",
    UNIT: "",
    PRICE_WON: "",
    QTY: "",
    MATL_CD: "",
    STYLE_NAME: "",
    AIR_CHARAGE: "",
    EXPRESS_CHARAGE: "",
};

const S0418_GARMENT_FREIGHT = () => {
    const serviceLibRef = useRef(null);
    if (!serviceLibRef.current) {
        serviceLibRef.current = new ServiceLib();
        serviceLibRef.current.loginConfirm();
    }
    const serviceLib = serviceLibRef.current;
    //const serviceS0418_GARMENT_FREIGHT = new ServiceS0418_GARMENT_FREIGHT();

    const toast = useRef(null);

    /* splitter 관련 */
    const [styleVal, setStyleVal] = useState({ width: "65vw" });

    /* QRY KSV_PO_MATLLIST*/
    const [dataQRY_KSV_PO_MATLLIST, setDataQRY_KSV_PO_MATLLIST] = useState(
        emptyQRY_KSV_PO_MATLLIST,
    );

    const onCalChangeQRY_KSV_PO_MATLLIST_S_FRT_DATE = (e, name) => {
        let val1 = e.value || "";
        let val = "";
        if (val1 === "") {
            val = "";
        } else {
            val = getDateVal(val1);
        }

        let _dataQRY_KSV_PO_MATLLIST = { ...dataQRY_KSV_PO_MATLLIST };
        _dataQRY_KSV_PO_MATLLIST[`${name}`] = val;
        setDataQRY_KSV_PO_MATLLIST(_dataQRY_KSV_PO_MATLLIST);
    };

    const onCalChangeQRY_KSV_PO_MATLLIST_E_FRT_DATE = (e, name) => {
        let val1 = e.value || "";
        let val = "";
        if (val1 === "") {
            val = "";
        } else {
            val = getDateVal(val1);
        }

        let _dataQRY_KSV_PO_MATLLIST = { ...dataQRY_KSV_PO_MATLLIST };
        _dataQRY_KSV_PO_MATLLIST[`${name}`] = val;
        setDataQRY_KSV_PO_MATLLIST(_dataQRY_KSV_PO_MATLLIST);
    };

    const [
        datasQRY_KSV_PO_MATLLIST_FRT_TYPE,
        setDatasQRY_KSV_PO_MATLLIST_FRT_TYPE,
    ] = useState([]);
    const [
        dataQRY_KSV_PO_MATLLIST_FRT_TYPE,
        setDataQRY_KSV_PO_MATLLIST_FRT_TYPE,
    ] = useState({});

    const onDropdownChangeQRY_KSV_PO_MATLLIST_FRT_TYPE = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataQRY_KSV_PO_MATLLIST = { ...dataQRY_KSV_PO_MATLLIST };

        let tTypeVal = _dataQRY_KSV_PO_MATLLIST[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_PO_MATLLIST[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_PO_MATLLIST[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_PO_MATLLIST(_dataQRY_KSV_PO_MATLLIST);
        setDataQRY_KSV_PO_MATLLIST_FRT_TYPE(e.value);
    };

    const [
        datasQRY_KSV_PO_MATLLIST_SENDER,
        setDatasQRY_KSV_PO_MATLLIST_SENDER,
    ] = useState([]);
    const [dataQRY_KSV_PO_MATLLIST_SENDER, setDataQRY_KSV_PO_MATLLIST_SENDER] =
        useState({});

    const onDropdownChangeQRY_KSV_PO_MATLLIST_SENDER = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataQRY_KSV_PO_MATLLIST = { ...dataQRY_KSV_PO_MATLLIST };

        let tTypeVal = _dataQRY_KSV_PO_MATLLIST[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_PO_MATLLIST[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_PO_MATLLIST[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_PO_MATLLIST(_dataQRY_KSV_PO_MATLLIST);
        setDataQRY_KSV_PO_MATLLIST_SENDER(e.value);
    };

    const [
        datasQRY_KSV_PO_MATLLIST_QRY_KIND,
        setDatasQRY_KSV_PO_MATLLIST_QRY_KIND,
    ] = useState([]);
    const [
        dataQRY_KSV_PO_MATLLIST_QRY_KIND,
        setDataQRY_KSV_PO_MATLLIST_QRY_KIND,
    ] = useState({});

    const onDropdownChangeQRY_KSV_PO_MATLLIST_QRY_KIND = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataQRY_KSV_PO_MATLLIST = { ...dataQRY_KSV_PO_MATLLIST };

        let tTypeVal = _dataQRY_KSV_PO_MATLLIST[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_PO_MATLLIST[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_PO_MATLLIST[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_PO_MATLLIST(_dataQRY_KSV_PO_MATLLIST);
        setDataQRY_KSV_PO_MATLLIST_QRY_KIND(e.value);
    };

    const [
        datasQRY_KSV_PO_MATLLIST_RECEIVER,
        setDatasQRY_KSV_PO_MATLLIST_RECEIVER,
    ] = useState([]);
    const [
        dataQRY_KSV_PO_MATLLIST_RECEIVER,
        setDataQRY_KSV_PO_MATLLIST_RECEIVER,
    ] = useState({});

    const onDropdownChangeQRY_KSV_PO_MATLLIST_RECEIVER = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataQRY_KSV_PO_MATLLIST = { ...dataQRY_KSV_PO_MATLLIST };

        let tTypeVal = _dataQRY_KSV_PO_MATLLIST[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_PO_MATLLIST[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_PO_MATLLIST[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_PO_MATLLIST(_dataQRY_KSV_PO_MATLLIST);
        setDataQRY_KSV_PO_MATLLIST_RECEIVER(e.value);
    };

    const [
        datasQRY_KSV_PO_MATLLIST_VENDOR_CD,
        setDatasQRY_KSV_PO_MATLLIST_VENDOR_CD,
    ] = useState([]);
    const [
        dataQRY_KSV_PO_MATLLIST_VENDOR_CD,
        setDataQRY_KSV_PO_MATLLIST_VENDOR_CD,
    ] = useState({});

    const onDropdownChangeQRY_KSV_PO_MATLLIST_VENDOR_CD = (e, name) => {
        let val = (e.value && e.value.VENDOR_CD) || "";

        let _dataQRY_KSV_PO_MATLLIST = { ...dataQRY_KSV_PO_MATLLIST };

        let tTypeVal = _dataQRY_KSV_PO_MATLLIST[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_PO_MATLLIST[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_PO_MATLLIST[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_PO_MATLLIST(_dataQRY_KSV_PO_MATLLIST);
        setDataQRY_KSV_PO_MATLLIST_VENDOR_CD(e.value);
    };

    const [
        datasQRY_KSV_PO_MATLLIST_USER_ID,
        setDatasQRY_KSV_PO_MATLLIST_USER_ID,
    ] = useState([]);
    const [
        dataQRY_KSV_PO_MATLLIST_USER_ID,
        setDataQRY_KSV_PO_MATLLIST_USER_ID,
    ] = useState({});

    const onDropdownChangeQRY_KSV_PO_MATLLIST_USER_ID = (e, name) => {
        let val = (e.value && e.value.USER_ID) || "";

        let _dataQRY_KSV_PO_MATLLIST = { ...dataQRY_KSV_PO_MATLLIST };

        let tTypeVal = _dataQRY_KSV_PO_MATLLIST[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_PO_MATLLIST[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_PO_MATLLIST[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_PO_MATLLIST(_dataQRY_KSV_PO_MATLLIST);
        setDataQRY_KSV_PO_MATLLIST_USER_ID(e.value);
    };

    const onInputChangeQRY_KSV_PO_MATLLIST_PO_CD = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_PO_MATLLIST = { ...dataQRY_KSV_PO_MATLLIST };

        let tTypeVal = _dataQRY_KSV_PO_MATLLIST[`${name}`];
        if (typeof tTypeVal === "string")
            _dataQRY_KSV_PO_MATLLIST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_PO_MATLLIST[`${name}`] = parseInt(val);

        setDataQRY_KSV_PO_MATLLIST(_dataQRY_KSV_PO_MATLLIST);
    };

    const onInputChangeQRY_KSV_PO_MATLLIST_BUYER_CD = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_PO_MATLLIST = { ...dataQRY_KSV_PO_MATLLIST };

        let tTypeVal = _dataQRY_KSV_PO_MATLLIST[`${name}`];
        if (typeof tTypeVal === "string")
            _dataQRY_KSV_PO_MATLLIST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_PO_MATLLIST[`${name}`] = parseInt(val);

        setDataQRY_KSV_PO_MATLLIST(_dataQRY_KSV_PO_MATLLIST);
    };

    const [
        datasQRY_KSV_PO_MATLLIST_BL_TYPE,
        setDatasQRY_KSV_PO_MATLLIST_BL_TYPE,
    ] = useState([]);
    const [
        dataQRY_KSV_PO_MATLLIST_BL_TYPE,
        setDataQRY_KSV_PO_MATLLIST_BL_TYPE,
    ] = useState({});

    const onDropdownChangeQRY_KSV_PO_MATLLIST_BL_TYPE = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataQRY_KSV_PO_MATLLIST = { ...dataQRY_KSV_PO_MATLLIST };

        let tTypeVal = _dataQRY_KSV_PO_MATLLIST[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_PO_MATLLIST[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_PO_MATLLIST[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_PO_MATLLIST(_dataQRY_KSV_PO_MATLLIST);
        setDataQRY_KSV_PO_MATLLIST_BL_TYPE(e.value);
    };

    const onInputChangeQRY_KSV_PO_MATLLIST_INVOICE_NO = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_PO_MATLLIST = { ...dataQRY_KSV_PO_MATLLIST };

        let tTypeVal = _dataQRY_KSV_PO_MATLLIST[`${name}`];
        if (typeof tTypeVal === "string")
            _dataQRY_KSV_PO_MATLLIST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_PO_MATLLIST[`${name}`] = parseInt(val);

        setDataQRY_KSV_PO_MATLLIST(_dataQRY_KSV_PO_MATLLIST);
    };

    /*TABLE KSV_PO_MATL_LIST */
    // DEFINE DATAGRID : TBL_KSV_PO_MATL_LIST
    const [datasTBL_KSV_PO_MATL_LIST, setDatasTBL_KSV_PO_MATL_LIST] = useState(
        [],
    );
    const dt_TBL_KSV_PO_MATL_LIST = useRef(null);
    const [dataTBL_KSV_PO_MATL_LIST, setDataTBL_KSV_PO_MATL_LIST] = useState(
        emptyTBL_KSV_PO_MATL_LIST,
    );
    const [selectedTBL_KSV_PO_MATL_LIST, setSelectedTBL_KSV_PO_MATL_LIST] =
        useState([]);
    const [
        flagSelectModeTBL_KSV_PO_MATL_LIST,
        setFlagSelectModeTBL_KSV_PO_MATL_LIST,
    ] = useState(false);

    // DATAGRID CODE : TBL_KSV_PO_MATL_LIST

    const onRowClick1TBL_KSV_PO_MATL_LIST = (argData0) => {
        var argData = {};

        if (typeof argData0.length !== "undefined") {
            argData = argData0[0];
        } else {
            argData = argData0;
        }

        let argTBL_KSV_PO_MATL_LIST = argData;

        setDataTBL_KSV_PO_MATL_LIST(argTBL_KSV_PO_MATL_LIST);
    };

    const onRowClickTBL_KSV_PO_MATL_LIST = (event) => {
        let argTBL_KSV_PO_MATL_LIST = event.data;
        if (flagSelectModeTBL_KSV_PO_MATL_LIST) return;

        // Service : NawooAll:mgrQueryTBL_KSV_PO_MATL_LIST
    };

    /**EDIT KSV_PO_MATL_LIST */
    const [datasEDT_KSV_PO_MATL_LIST, setDatasEDT_KSV_PO_MATL_LIST] = useState(
        [],
    );
    const [dataEDT_KSV_PO_MATL_LIST, setDataEDT_KSV_PO_MATL_LIST] = useState(
        emptyEDT_KSV_PO_MATL_LIST,
    );

    const onCalChangeEDT_KSV_PO_MATL_LIST_FRT_DATE = (e, name) => {
        let val1 = e.value || "";
        let val = "";
        if (val1 === "") {
            val = "";
        } else {
            val = getDateVal(val1);
        }

        let _dataEDT_KSV_PO_MATL_LIST = { ...dataEDT_KSV_PO_MATL_LIST };
        _dataEDT_KSV_PO_MATL_LIST[`${name}`] = val;
        setDataEDT_KSV_PO_MATL_LIST(_dataEDT_KSV_PO_MATL_LIST);
    };

    const [
        datasEDT_KSV_PO_MATL_LIST_TRADE_TYPE,
        setDatasEDT_KSV_PO_MATL_LIST_TRADE_TYPE,
    ] = useState([]);
    const [
        dataEDT_KSV_PO_MATL_LIST_TRADE_TYPE,
        setDataEDT_KSV_PO_MATL_LIST_TRADE_TYPE,
    ] = useState({});

    const onDropdownChangeEDT_KSV_PO_MATL_LIST_TRADE_TYPE = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataEDT_KSV_PO_MATL_LIST = { ...dataEDT_KSV_PO_MATL_LIST };

        let tTypeVal = _dataEDT_KSV_PO_MATL_LIST[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_KSV_PO_MATL_LIST[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_KSV_PO_MATL_LIST[`${name}`] = parseInt(val);
        }

        setDataEDT_KSV_PO_MATL_LIST(_dataEDT_KSV_PO_MATL_LIST);
        setDataEDT_KSV_PO_MATL_LIST_TRADE_TYPE(e.value);
    };

    const [
        datasEDT_KSV_PO_MATL_LIST_AREA_TYPE,
        setDatasEDT_KSV_PO_MATL_LIST_AREA_TYPE,
    ] = useState([]);
    const [
        dataEDT_KSV_PO_MATL_LIST_AREA_TYPE,
        setDataEDT_KSV_PO_MATL_LIST_AREA_TYPE,
    ] = useState({});

    const onDropdownChangeEDT_KSV_PO_MATL_LIST_AREA_TYPE = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataEDT_KSV_PO_MATL_LIST = { ...dataEDT_KSV_PO_MATL_LIST };

        let tTypeVal = _dataEDT_KSV_PO_MATL_LIST[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_KSV_PO_MATL_LIST[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_KSV_PO_MATL_LIST[`${name}`] = parseInt(val);
        }

        setDataEDT_KSV_PO_MATL_LIST(_dataEDT_KSV_PO_MATL_LIST);
        setDataEDT_KSV_PO_MATL_LIST_AREA_TYPE(e.value);
    };

    const [
        datasEDT_KSV_PO_MATL_LIST_MATL_TYPE,
        setDatasEDT_KSV_PO_MATL_LIST_MATL_TYPE,
    ] = useState([]);
    const [
        dataEDT_KSV_PO_MATL_LIST_MATL_TYPE,
        setDataEDT_KSV_PO_MATL_LIST_MATL_TYPE,
    ] = useState({});

    const onDropdownChangeEDT_KSV_PO_MATL_LIST_MATL_TYPE = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataEDT_KSV_PO_MATL_LIST = { ...dataEDT_KSV_PO_MATL_LIST };

        let tTypeVal = _dataEDT_KSV_PO_MATL_LIST[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_KSV_PO_MATL_LIST[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_KSV_PO_MATL_LIST[`${name}`] = parseInt(val);
        }

        setDataEDT_KSV_PO_MATL_LIST(_dataEDT_KSV_PO_MATL_LIST);
        setDataEDT_KSV_PO_MATL_LIST_MATL_TYPE(e.value);
    };

    const [
        datasEDT_KSV_PO_MATL_LIST_PACEL_TYPE,
        setDatasEDT_KSV_PO_MATL_LIST_PACEL_TYPE,
    ] = useState([]);
    const [
        dataEDT_KSV_PO_MATL_LIST_PACEL_TYPE,
        setDataEDT_KSV_PO_MATL_LIST_PACEL_TYPE,
    ] = useState({});

    const onDropdownChangeEDT_KSV_PO_MATL_LIST_PACEL_TYPE = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataEDT_KSV_PO_MATL_LIST = { ...dataEDT_KSV_PO_MATL_LIST };

        let tTypeVal = _dataEDT_KSV_PO_MATL_LIST[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_KSV_PO_MATL_LIST[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_KSV_PO_MATL_LIST[`${name}`] = parseInt(val);
        }

        setDataEDT_KSV_PO_MATL_LIST(_dataEDT_KSV_PO_MATL_LIST);
        setDataEDT_KSV_PO_MATL_LIST_PACEL_TYPE(e.value);
    };

    const onInputChangeEDT_KSV_PO_MATL_LIST_REG_USER = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_PO_MATL_LIST = { ...dataEDT_KSV_PO_MATL_LIST };

        let tTypeVal = _dataEDT_KSV_PO_MATL_LIST[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_PO_MATL_LIST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_PO_MATL_LIST[`${name}`] = parseInt(val);

        setDataEDT_KSV_PO_MATL_LIST(_dataEDT_KSV_PO_MATL_LIST);
    };

    const [
        datasEDT_KSV_PO_MATL_LIST_DEPARTURE,
        setDatasEDT_KSV_PO_MATL_LIST_DEPARTURE,
    ] = useState([]);
    const [
        dataEDT_KSV_PO_MATL_LIST_DEPARTURE,
        setDataEDT_KSV_PO_MATL_LIST_DEPARTURE,
    ] = useState({});

    const onDropdownChangeEDT_KSV_PO_MATL_LIST_DEPARTURE = (e, name) => {
        let val = (e.value && e.value.COM_CD) || "";

        let _dataEDT_KSV_PO_MATL_LIST = { ...dataEDT_KSV_PO_MATL_LIST };

        let tTypeVal = _dataEDT_KSV_PO_MATL_LIST[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_KSV_PO_MATL_LIST[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_KSV_PO_MATL_LIST[`${name}`] = parseInt(val);
        }

        setDataEDT_KSV_PO_MATL_LIST(_dataEDT_KSV_PO_MATL_LIST);
        setDataEDT_KSV_PO_MATL_LIST_DEPARTURE(e.value);
    };

    const [
        datasEDT_KSV_PO_MATL_LIST_DESTINATION,
        setDatasEDT_KSV_PO_MATL_LIST_DESTINATION,
    ] = useState([]);
    const [
        dataEDT_KSV_PO_MATL_LIST_DESTINATION,
        setDataEDT_KSV_PO_MATL_LIST_DESTINATION,
    ] = useState({});

    const onDropdownChangeEDT_KSV_PO_MATL_LIST_DESTINATION = (e, name) => {
        let val = (e.value && e.value.COM_CD) || "";

        let _dataEDT_KSV_PO_MATL_LIST = { ...dataEDT_KSV_PO_MATL_LIST };

        let tTypeVal = _dataEDT_KSV_PO_MATL_LIST[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_KSV_PO_MATL_LIST[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_KSV_PO_MATL_LIST[`${name}`] = parseInt(val);
        }

        setDataEDT_KSV_PO_MATL_LIST(_dataEDT_KSV_PO_MATL_LIST);
        setDataEDT_KSV_PO_MATL_LIST_DESTINATION(e.value);
    };

    const onCheckboxChangeEDT_KSV_PO_MATL_LIST_IS_COST = (e, name) => {
        let val = "";
        let _dataEDT_KSV_PO_MATL_LIST = { ...dataEDT_KSV_PO_MATL_LIST };
        if (e.checked) {
            val = "1";
        } else {
            val = "0";
        }
        _dataEDT_KSV_PO_MATL_LIST[`${name}`] = val;
        setDataEDT_KSV_PO_MATL_LIST(_dataEDT_KSV_PO_MATL_LIST);
    };

    const [
        datasEDT_KSV_PO_MATL_LIST_SENDER,
        setDatasEDT_KSV_PO_MATL_LIST_SENDER,
    ] = useState([]);
    const [
        dataEDT_KSV_PO_MATL_LIST_SENDER,
        setDataEDT_KSV_PO_MATL_LIST_SENDER,
    ] = useState({});

    const onDropdownChangeEDT_KSV_PO_MATL_LIST_SENDER = (e, name) => {
        let val = (e.value && e.value.SENDOR) || "";

        let _dataEDT_KSV_PO_MATL_LIST = { ...dataEDT_KSV_PO_MATL_LIST };

        let tTypeVal = _dataEDT_KSV_PO_MATL_LIST[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_KSV_PO_MATL_LIST[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_KSV_PO_MATL_LIST[`${name}`] = parseInt(val);
        }

        setDataEDT_KSV_PO_MATL_LIST(_dataEDT_KSV_PO_MATL_LIST);
        setDataEDT_KSV_PO_MATL_LIST_SENDER(e.value);
    };

    const [
        datasEDT_KSV_PO_MATL_LIST_RECEIVER,
        setDatasEDT_KSV_PO_MATL_LIST_RECEIVER,
    ] = useState([]);
    const [
        dataEDT_KSV_PO_MATL_LIST_RECEIVER,
        setDataEDT_KSV_PO_MATL_LIST_RECEIVER,
    ] = useState({});

    const onDropdownChangeEDT_KSV_PO_MATL_LIST_RECEIVER = (e, name) => {
        let val = (e.value && e.value.RECEIVER) || "";

        let _dataEDT_KSV_PO_MATL_LIST = { ...dataEDT_KSV_PO_MATL_LIST };

        let tTypeVal = _dataEDT_KSV_PO_MATL_LIST[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_KSV_PO_MATL_LIST[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_KSV_PO_MATL_LIST[`${name}`] = parseInt(val);
        }

        setDataEDT_KSV_PO_MATL_LIST(_dataEDT_KSV_PO_MATL_LIST);
        setDataEDT_KSV_PO_MATL_LIST_RECEIVER(e.value);
    };

    const [
        datasEDT_KSV_PO_MATL_LIST_BUYER_CD,
        setDatasEDT_KSV_PO_MATL_LIST_BUYER_CD,
    ] = useState([]);
    const [
        dataEDT_KSV_PO_MATL_LIST_BUYER_CD,
        setDataEDT_KSV_PO_MATL_LIST_BUYER_CD,
    ] = useState({});

    const onDropdownChangeEDT_KSV_PO_MATL_LIST_BUYER_CD = (e, name) => {
        let val = (e.value && e.value.BUYER_CD) || "";

        let _dataEDT_KSV_PO_MATL_LIST = { ...dataEDT_KSV_PO_MATL_LIST };

        let tTypeVal = _dataEDT_KSV_PO_MATL_LIST[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_KSV_PO_MATL_LIST[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_KSV_PO_MATL_LIST[`${name}`] = parseInt(val);
        }

        setDataEDT_KSV_PO_MATL_LIST(_dataEDT_KSV_PO_MATL_LIST);
        setDataEDT_KSV_PO_MATL_LIST_BUYER_CD(e.value);
    };

    const [
        datasEDT_KSV_PO_MATL_LIST_DELAY_REASON,
        setDatasEDT_KSV_PO_MATL_LIST_DELAY_REASON,
    ] = useState([]);
    const [
        dataEDT_KSV_PO_MATL_LIST_DELAY_REASON,
        setDataEDT_KSV_PO_MATL_LIST_DELAY_REASON,
    ] = useState({});

    const onDropdownChangeEDT_KSV_PO_MATL_LIST_DELAY_REASON = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataEDT_KSV_PO_MATL_LIST = { ...dataEDT_KSV_PO_MATL_LIST };

        let tTypeVal = _dataEDT_KSV_PO_MATL_LIST[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_KSV_PO_MATL_LIST[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_KSV_PO_MATL_LIST[`${name}`] = parseInt(val);
        }

        setDataEDT_KSV_PO_MATL_LIST(_dataEDT_KSV_PO_MATL_LIST);
        setDataEDT_KSV_PO_MATL_LIST_DELAY_REASON(e.value);
    };

    const onInputChangeEDT_KSV_PO_MATL_LIST_NET = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_PO_MATL_LIST = { ...dataEDT_KSV_PO_MATL_LIST };

        let tTypeVal = _dataEDT_KSV_PO_MATL_LIST[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_PO_MATL_LIST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_PO_MATL_LIST[`${name}`] = parseInt(val);

        setDataEDT_KSV_PO_MATL_LIST(_dataEDT_KSV_PO_MATL_LIST);
    };

    const onInputChangeEDT_KSV_PO_MATL_LIST_VAT = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_PO_MATL_LIST = { ...dataEDT_KSV_PO_MATL_LIST };

        let tTypeVal = _dataEDT_KSV_PO_MATL_LIST[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_PO_MATL_LIST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_PO_MATL_LIST[`${name}`] = parseInt(val);

        setDataEDT_KSV_PO_MATL_LIST(_dataEDT_KSV_PO_MATL_LIST);
    };

    const onInputChangeEDT_KSV_PO_MATL_LIST_AMOUNT = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_PO_MATL_LIST = { ...dataEDT_KSV_PO_MATL_LIST };

        let tTypeVal = _dataEDT_KSV_PO_MATL_LIST[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_PO_MATL_LIST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_PO_MATL_LIST[`${name}`] = parseInt(val);

        setDataEDT_KSV_PO_MATL_LIST(_dataEDT_KSV_PO_MATL_LIST);
    };

    const [
        datasEDT_KSV_PO_MATL_LIST_CURR_CD,
        setDatasEDT_KSV_PO_MATL_LIST_CURR_CD,
    ] = useState([]);
    const [
        dataEDT_KSV_PO_MATL_LIST_CURR_CD,
        setDataEDT_KSV_PO_MATL_LIST_CURR_CD,
    ] = useState({});

    const onDropdownChangeEDT_KSV_PO_MATL_LIST_CURR_CD = (e, name) => {
        let val = (e.value && e.value.CURR_CD) || "";

        let _dataEDT_KSV_PO_MATL_LIST = { ...dataEDT_KSV_PO_MATL_LIST };

        let tTypeVal = _dataEDT_KSV_PO_MATL_LIST[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_KSV_PO_MATL_LIST[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_KSV_PO_MATL_LIST[`${name}`] = parseInt(val);
        }

        setDataEDT_KSV_PO_MATL_LIST(_dataEDT_KSV_PO_MATL_LIST);
        setDataEDT_KSV_PO_MATL_LIST_CURR_CD(e.value);
    };

    const [datasEDT_KSV_PO_MATL_LIST_MW, setDatasEDT_KSV_PO_MATL_LIST_MW] =
        useState([]);
    const [dataEDT_KSV_PO_MATL_LIST_MW, setDataEDT_KSV_PO_MATL_LIST_MW] =
        useState({});

    const onDropdownChangeEDT_KSV_PO_MATL_LIST_MW = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataEDT_KSV_PO_MATL_LIST = { ...dataEDT_KSV_PO_MATL_LIST };

        let tTypeVal = _dataEDT_KSV_PO_MATL_LIST[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_KSV_PO_MATL_LIST[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_KSV_PO_MATL_LIST[`${name}`] = parseInt(val);
        }

        setDataEDT_KSV_PO_MATL_LIST(_dataEDT_KSV_PO_MATL_LIST);
        setDataEDT_KSV_PO_MATL_LIST_MW(e.value);
    };

    const [
        datasEDT_KSV_PO_MATL_LIST_CHARGE1,
        setDatasEDT_KSV_PO_MATL_LIST_CHARGE1,
    ] = useState([]);
    const [
        dataEDT_KSV_PO_MATL_LIST_CHARGE1,
        setDataEDT_KSV_PO_MATL_LIST_CHARGE1,
    ] = useState({});

    const onDropdownChangeEDT_KSV_PO_MATL_LIST_CHARGE1 = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataEDT_KSV_PO_MATL_LIST = { ...dataEDT_KSV_PO_MATL_LIST };

        let tTypeVal = _dataEDT_KSV_PO_MATL_LIST[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_KSV_PO_MATL_LIST[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_KSV_PO_MATL_LIST[`${name}`] = parseInt(val);
        }

        setDataEDT_KSV_PO_MATL_LIST(_dataEDT_KSV_PO_MATL_LIST);
        setDataEDT_KSV_PO_MATL_LIST_CHARGE1(e.value);
    };

    const [
        datasEDT_KSV_PO_MATL_LIST_CHARGE2,
        setDatasEDT_KSV_PO_MATL_LIST_CHARGE2,
    ] = useState([]);
    const [
        dataEDT_KSV_PO_MATL_LIST_CHARGE2,
        setDataEDT_KSV_PO_MATL_LIST_CHARGE2,
    ] = useState({});

    const onDropdownChangeEDT_KSV_PO_MATL_LIST_CHARGE2 = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataEDT_KSV_PO_MATL_LIST = { ...dataEDT_KSV_PO_MATL_LIST };

        let tTypeVal = _dataEDT_KSV_PO_MATL_LIST[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_KSV_PO_MATL_LIST[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_KSV_PO_MATL_LIST[`${name}`] = parseInt(val);
        }

        setDataEDT_KSV_PO_MATL_LIST(_dataEDT_KSV_PO_MATL_LIST);
        setDataEDT_KSV_PO_MATL_LIST_CHARGE2(e.value);
    };

    const onInputChangeEDT_KSV_PO_MATL_LIST_WEIGHT_CBM = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_PO_MATL_LIST = { ...dataEDT_KSV_PO_MATL_LIST };

        let tTypeVal = _dataEDT_KSV_PO_MATL_LIST[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_PO_MATL_LIST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_PO_MATL_LIST[`${name}`] = parseInt(val);

        setDataEDT_KSV_PO_MATL_LIST(_dataEDT_KSV_PO_MATL_LIST);
    };

    const onInputChangeEDT_KSV_PO_MATL_LIST_WEIGHT_NET = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_PO_MATL_LIST = { ...dataEDT_KSV_PO_MATL_LIST };

        let tTypeVal = _dataEDT_KSV_PO_MATL_LIST[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_PO_MATL_LIST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_PO_MATL_LIST[`${name}`] = parseInt(val);

        setDataEDT_KSV_PO_MATL_LIST(_dataEDT_KSV_PO_MATL_LIST);
    };

    const onInputChangeEDT_KSV_PO_MATL_LIST_DESC = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_PO_MATL_LIST = { ...dataEDT_KSV_PO_MATL_LIST };

        let tTypeVal = _dataEDT_KSV_PO_MATL_LIST[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_PO_MATL_LIST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_PO_MATL_LIST[`${name}`] = parseInt(val);

        setDataEDT_KSV_PO_MATL_LIST(_dataEDT_KSV_PO_MATL_LIST);
    };

    const onInputChangeEDT_KSV_PO_MATL_LIST_BL_NO = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_PO_MATL_LIST = { ...dataEDT_KSV_PO_MATL_LIST };

        let tTypeVal = _dataEDT_KSV_PO_MATL_LIST[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_PO_MATL_LIST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_PO_MATL_LIST[`${name}`] = parseInt(val);

        setDataEDT_KSV_PO_MATL_LIST(_dataEDT_KSV_PO_MATL_LIST);
    };

    const onInputChangeEDT_KSV_PO_MATL_LIST_GARMENT_COMP = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_PO_MATL_LIST = { ...dataEDT_KSV_PO_MATL_LIST };

        let tTypeVal = _dataEDT_KSV_PO_MATL_LIST[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_PO_MATL_LIST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_PO_MATL_LIST[`${name}`] = parseInt(val);

        setDataEDT_KSV_PO_MATL_LIST(_dataEDT_KSV_PO_MATL_LIST);
    };

    const onInputChangeEDT_KSV_PO_MATL_LIST_INVOICE_NO = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_PO_MATL_LIST = { ...dataEDT_KSV_PO_MATL_LIST };

        let tTypeVal = _dataEDT_KSV_PO_MATL_LIST[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_PO_MATL_LIST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_PO_MATL_LIST[`${name}`] = parseInt(val);

        setDataEDT_KSV_PO_MATL_LIST(_dataEDT_KSV_PO_MATL_LIST);
    };

    const onInputChangeEDT_KSV_PO_MATL_LIST_REMARK = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_PO_MATL_LIST = { ...dataEDT_KSV_PO_MATL_LIST };

        let tTypeVal = _dataEDT_KSV_PO_MATL_LIST[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_PO_MATL_LIST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_PO_MATL_LIST[`${name}`] = parseInt(val);

        setDataEDT_KSV_PO_MATL_LIST(_dataEDT_KSV_PO_MATL_LIST);
    };

    const onInputChangeEDT_KSV_PO_MATL_LIST_PO_CD = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_PO_MATL_LIST = { ...dataEDT_KSV_PO_MATL_LIST };

        let tTypeVal = _dataEDT_KSV_PO_MATL_LIST[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_PO_MATL_LIST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_PO_MATL_LIST[`${name}`] = parseInt(val);

        setDataEDT_KSV_PO_MATL_LIST(_dataEDT_KSV_PO_MATL_LIST);
    };

    const onInputChangeEDT_KSV_PO_MATL_LIST_ORDER_CD = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_PO_MATL_LIST = { ...dataEDT_KSV_PO_MATL_LIST };

        let tTypeVal = _dataEDT_KSV_PO_MATL_LIST[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_PO_MATL_LIST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_PO_MATL_LIST[`${name}`] = parseInt(val);

        setDataEDT_KSV_PO_MATL_LIST(_dataEDT_KSV_PO_MATL_LIST);
    };

    const onInputChangeEDT_KSV_PO_MATL_LIST_UNIT = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_PO_MATL_LIST = { ...dataEDT_KSV_PO_MATL_LIST };

        let tTypeVal = _dataEDT_KSV_PO_MATL_LIST[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_PO_MATL_LIST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_PO_MATL_LIST[`${name}`] = parseInt(val);

        setDataEDT_KSV_PO_MATL_LIST(_dataEDT_KSV_PO_MATL_LIST);
    };

    const onInputChangeEDT_KSV_PO_MATL_LIST_PRICE_WON = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_PO_MATL_LIST = { ...dataEDT_KSV_PO_MATL_LIST };

        let tTypeVal = _dataEDT_KSV_PO_MATL_LIST[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_PO_MATL_LIST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_PO_MATL_LIST[`${name}`] = parseInt(val);

        setDataEDT_KSV_PO_MATL_LIST(_dataEDT_KSV_PO_MATL_LIST);
    };

    const onInputChangeEDT_KSV_PO_MATL_LIST_QTY = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_PO_MATL_LIST = { ...dataEDT_KSV_PO_MATL_LIST };

        let tTypeVal = _dataEDT_KSV_PO_MATL_LIST[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_PO_MATL_LIST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_PO_MATL_LIST[`${name}`] = parseInt(val);

        setDataEDT_KSV_PO_MATL_LIST(_dataEDT_KSV_PO_MATL_LIST);
    };

    const onInputChangeEDT_KSV_PO_MATL_LIST_MATL_CD = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_PO_MATL_LIST = { ...dataEDT_KSV_PO_MATL_LIST };

        let tTypeVal = _dataEDT_KSV_PO_MATL_LIST[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_PO_MATL_LIST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_PO_MATL_LIST[`${name}`] = parseInt(val);

        setDataEDT_KSV_PO_MATL_LIST(_dataEDT_KSV_PO_MATL_LIST);
    };

    const onInputChangeEDT_KSV_PO_MATL_LIST_STYLE_NAME = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_PO_MATL_LIST = { ...dataEDT_KSV_PO_MATL_LIST };

        let tTypeVal = _dataEDT_KSV_PO_MATL_LIST[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_PO_MATL_LIST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_PO_MATL_LIST[`${name}`] = parseInt(val);

        setDataEDT_KSV_PO_MATL_LIST(_dataEDT_KSV_PO_MATL_LIST);
    };

    const onInputChangeEDT_KSV_PO_MATL_LIST_AIR_CHARAGE = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_PO_MATL_LIST = { ...dataEDT_KSV_PO_MATL_LIST };

        let tTypeVal = _dataEDT_KSV_PO_MATL_LIST[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_PO_MATL_LIST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_PO_MATL_LIST[`${name}`] = parseInt(val);

        setDataEDT_KSV_PO_MATL_LIST(_dataEDT_KSV_PO_MATL_LIST);
    };

    const onInputChangeEDT_KSV_PO_MATL_LIST_EXPRESS_CHARAGE = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_PO_MATL_LIST = { ...dataEDT_KSV_PO_MATL_LIST };

        let tTypeVal = _dataEDT_KSV_PO_MATL_LIST[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_PO_MATL_LIST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_PO_MATL_LIST[`${name}`] = parseInt(val);

        setDataEDT_KSV_PO_MATL_LIST(_dataEDT_KSV_PO_MATL_LIST);
    };

    useEffect(() => {}, []);

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
                    <p style={{ width: "8rem", display: "inline-block" }}>Freigth Date</p>
                    <div
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "23rem",
                        }}
                    >
                        <Calendar
                            showButtonBar
                            dateFormat="yymmdd"
                            id="id_S_FRT_DATE"
                            value={changeDateVal(
                                dataQRY_KSV_PO_MATLLIST.S_FRT_DATE,
                            )}
                            onChange={(e) =>
                                onCalChangeQRY_KSV_PO_MATLLIST_S_FRT_DATE(
                                    e,
                                    "S_FRT_DATE",
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
                        width: "33rem",
                    }}
                >
                    <p style={{ width: "8rem", display: "inline-block" }}>~</p>
                    <div
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "23rem",
                        }}
                    >
                        <Calendar
                            showButtonBar
                            dateFormat="yymmdd"
                            id="id_E_FRT_DATE"
                            value={changeDateVal(
                                dataQRY_KSV_PO_MATLLIST.E_FRT_DATE,
                            )}
                            onChange={(e) =>
                                onCalChangeQRY_KSV_PO_MATLLIST_E_FRT_DATE(
                                    e,
                                    "E_FRT_DATE",
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
                        width: "33rem",
                    }}
                >
                    <p style={{ width: "8rem", display: "inline-block" }}>.</p>
                    <div
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "23rem",
                        }}
                    >
                        <Dropdown
                            id="id_FRT_TYPE"
                            value={dataQRY_KSV_PO_MATLLIST_FRT_TYPE}
                            onChange={(e) =>
                                onDropdownChangeQRY_KSV_PO_MATLLIST_FRT_TYPE(
                                    e,
                                    "FRT_TYPE",
                                )
                            }
                            options={datasQRY_KSV_PO_MATLLIST_FRT_TYPE}
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
                        width: "33rem",
                    }}
                >
                    <p style={{ width: "8rem", display: "inline-block" }}>.</p>
                    <div
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "23rem",
                        }}
                    >
                        <Dropdown
                            id="id_SENDER"
                            value={dataQRY_KSV_PO_MATLLIST_SENDER}
                            onChange={(e) =>
                                onDropdownChangeQRY_KSV_PO_MATLLIST_SENDER(
                                    e,
                                    "SENDER",
                                )
                            }
                            options={datasQRY_KSV_PO_MATLLIST_SENDER}
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
                        width: "33rem",
                    }}
                >
                    <p style={{ width: "8rem", display: "inline-block" }}>.</p>
                    <div
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "23rem",
                        }}
                    >
                        <Dropdown
                            id="id_QRY_KIND"
                            value={dataQRY_KSV_PO_MATLLIST_QRY_KIND}
                            onChange={(e) =>
                                onDropdownChangeQRY_KSV_PO_MATLLIST_QRY_KIND(
                                    e,
                                    "QRY_KIND",
                                )
                            }
                            options={datasQRY_KSV_PO_MATLLIST_QRY_KIND}
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
                        width: "33rem",
                    }}
                >
                    <p style={{ width: "8rem", display: "inline-block" }}>Destination</p>
                    <div
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "23rem",
                        }}
                    >
                        <Dropdown
                            id="id_RECEIVER"
                            value={dataQRY_KSV_PO_MATLLIST_RECEIVER}
                            onChange={(e) =>
                                onDropdownChangeQRY_KSV_PO_MATLLIST_RECEIVER(
                                    e,
                                    "RECEIVER",
                                )
                            }
                            options={datasQRY_KSV_PO_MATLLIST_RECEIVER}
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
                        width: "33rem",
                    }}
                >
                    <p style={{ width: "8rem", display: "inline-block" }}>Supplier</p>
                    <div
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "23rem",
                        }}
                    >
                        <Dropdown
                            id="id_VENDOR_CD"
                            value={dataQRY_KSV_PO_MATLLIST_VENDOR_CD}
                            onChange={(e) =>
                                onDropdownChangeQRY_KSV_PO_MATLLIST_VENDOR_CD(
                                    e,
                                    "VENDOR_CD",
                                )
                            }
                            options={datasQRY_KSV_PO_MATLLIST_VENDOR_CD}
                            optionLabel="VENDOR_NAME"
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
                        width: "33rem",
                    }}
                >
                    <p style={{ width: "8rem", display: "inline-block" }}>.</p>
                    <div
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "23rem",
                        }}
                    >
                        <Dropdown
                            id="id_USER_ID"
                            value={dataQRY_KSV_PO_MATLLIST_USER_ID}
                            onChange={(e) =>
                                onDropdownChangeQRY_KSV_PO_MATLLIST_USER_ID(
                                    e,
                                    "USER_ID",
                                )
                            }
                            options={datasQRY_KSV_PO_MATLLIST_USER_ID}
                            optionLabel="USER_NAME"
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
                        width: "33rem",
                    }}
                >
                    <p style={{ width: "8rem", display: "inline-block" }}>PO</p>
                    <InputText
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "23rem",
                        }}
                        id="id_PO_CD"
                        value={dataQRY_KSV_PO_MATLLIST.PO_CD}
                        onChange={(e) =>
                            onInputChangeQRY_KSV_PO_MATLLIST_PO_CD(e, "PO_CD")
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
                    <p style={{ width: "8rem", display: "inline-block" }}>Buyer</p>
                    <InputText
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "23rem",
                        }}
                        id="id_BUYER_CD"
                        value={dataQRY_KSV_PO_MATLLIST.BUYER_CD}
                        onChange={(e) =>
                            onInputChangeQRY_KSV_PO_MATLLIST_BUYER_CD(
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
                    <p style={{ width: "8rem", display: "inline-block" }}>BL</p>
                    <div
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "23rem",
                        }}
                    >
                        <Dropdown
                            id="id_BL_TYPE"
                            value={dataQRY_KSV_PO_MATLLIST_BL_TYPE}
                            onChange={(e) =>
                                onDropdownChangeQRY_KSV_PO_MATLLIST_BL_TYPE(
                                    e,
                                    "BL_TYPE",
                                )
                            }
                            options={datasQRY_KSV_PO_MATLLIST_BL_TYPE}
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
                        width: "33rem",
                    }}
                >
                    <p style={{ width: "8rem", display: "inline-block" }}>Invoice</p>
                    <InputText
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "23rem",
                        }}
                        id="id_INVOICE_NO"
                        value={dataQRY_KSV_PO_MATLLIST.INVOICE_NO}
                        onChange={(e) =>
                            onInputChangeQRY_KSV_PO_MATLLIST_INVOICE_NO(
                                e,
                                "INVOICE_NO",
                            )
                        }
                    />
                </span>
            </div>
            <div style={{ width: "100rem", height: "2rem" }}></div>

            <div
                style={{
                    marginLeft: "1rem",
                    marginTop: "1rem",
                    width: "99rem",
                    height: "22rem",
                }}
            >
                <AFDataTable preventUnrelatedRerender
                    ref={dt_TBL_KSV_PO_MATL_LIST}
                    size="small"
                    value={datasTBL_KSV_PO_MATL_LIST}
                    resizableColumns
                    columnResizeMode="fit"
                    showGridlines
                    selectionMode="checkbox"
                    selection={selectedTBL_KSV_PO_MATL_LIST}
                    onSelectionChange={(e) => {
                        setFlagSelectModeTBL_KSV_PO_MATL_LIST(true);
                        setSelectedTBL_KSV_PO_MATL_LIST(e.value);
                        console.log(
                            "selected length:" +
                                selectedTBL_KSV_PO_MATL_LIST.length,
                        );
                        onRowClick1TBL_KSV_PO_MATL_LIST(e.value);
                    }}
                    onRowClick={onRowClickTBL_KSV_PO_MATL_LIST}
                    dataKey="id"
                    className="datatable-responsive"
                    virtualScrollerOptions={{ itemSize: 50 }}
                    emptyMessage="No TBL_KSV_PO_MATL_LIST found."
                    header={headerTBL_KSV_PO_MATL_LIST}
                    responsiveLayout="scroll"
                    scrollable
                    scrollHeight="18rem"
                >
                    <AFColumn field="FRT_DATE" header="Frt Date" headerStyle={{ width: "10rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="TRADE_TYPE" header="Trade Tyoe" headerStyle={{ width: "10rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="IS_OK" header="OK" headerStyle={{ width: "10rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="DEPARTURE" header="Departure" headerStyle={{ width: "10rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="DESTINATION" header="Destination" headerStyle={{ width: "10rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="SENDER" header="Sender" headerStyle={{ width: "10rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="RECEIVER" header="Receiver" headerStyle={{ width: "10rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="BUYER" header="Buyer" headerStyle={{ width: "10rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="PO_CD" header="PO" headerStyle={{ width: "10rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="ORDER_CD" header="Order" headerStyle={{ width: "10rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="SPEC" header="Spec" headerStyle={{ width: "10rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="Qty" header="Qty" headerStyle={{ width: "10rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="WEIGHT" header="Weight" headerStyle={{ width: "10rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="AMOUNT" header="Amount" headerStyle={{ width: "10rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="CURR_CD" header="Curr" headerStyle={{ width: "10rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="DELAY_REASON" header="Reason" headerStyle={{ width: "10rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="FRT_TYPE" header="Frt Type" headerStyle={{ width: "10rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="AREA_TYPE" header="Area Type" headerStyle={{ width: "10rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="MATL_TYPE" header="Matl Type" headerStyle={{ width: "10rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="BL_NO" header="BL No" headerStyle={{ width: "10rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="REMARK" header="Remark" headerStyle={{ width: "10rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="STYLE_NAME" header="Style" headerStyle={{ width: "10rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="MATL_CD" header="Matl Cd" headerStyle={{ width: "10rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="WEIGHT_NET" header="Weight Net" headerStyle={{ width: "10rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="NET" header="Net" headerStyle={{ width: "10rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="VAT" header="VAT" headerStyle={{ width: "10rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="ADP_CHECK" header="ADP Check" headerStyle={{ width: "10rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="INVOICE_NO" header="Invoice No" headerStyle={{ width: "10rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="CHARGE_KIND" header="Charge Kind" headerStyle={{ width: "10rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="cHARGE_CODE" header="Charge Code" headerStyle={{ width: "10rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="REG_USER" header="Reg User" headerStyle={{ width: "10rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="REG_DATETIME" header="Reg DateTime" headerStyle={{ width: "10rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="TRADE_TYPE" header="Trade Type" headerStyle={{ width: "10rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="FRT_TYPE" header="Frt Type" headerStyle={{ width: "10rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="AREA_TYPE" header="Area Type" headerStyle={{ width: "10rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="MATL_TYPE" header="Matl Type" headerStyle={{ width: "10rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="UNIT" header="Unit" headerStyle={{ width: "10rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="PRICE" header="Price" headerStyle={{ width: "10rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="MW" header="MW" headerStyle={{ width: "10rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="GARMENT_COMPO" header="Garment Comp" headerStyle={{ width: "10rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="PO_SEQ" header="Po Seq" headerStyle={{ width: "10rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="IN_DATETIME" header="In DateTime" headerStyle={{ width: "10rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="MATL_NAME" header="Matl Name" headerStyle={{ width: "10rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="COLOR" header="Color" headerStyle={{ width: "10rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="SPEC" header="Spec" headerStyle={{ width: "10rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="UNIT" header="Unit" headerStyle={{ width: "10rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="FRT_IDX" header="Frt Idx" headerStyle={{ width: "10rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                </AFDataTable>
            </div>

            <Divider />

            <div style={{ width: "100rem", height: "2rem" }}>
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
                    <div style={{ width: "60rem", height: "30rem" }}>
                        <span
                            style={{
                                marginLeft: "0.5rem",
                                height: "2rem",
                                display: "inline-block",
                                width: "33rem",
                            }}
                        >
                            <p style={{ width: "8rem", display: "inline-block", }}>Frt Date</p>
                            <div
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "23rem",
                                }}
                            >
                                <Calendar
                                    showButtonBar
                                    dateFormat="yymmdd"
                                    id="id_FRT_DATE"
                                    value={changeDateVal(
                                        dataEDT_KSV_PO_MATL_LIST.FRT_DATE,
                                    )}
                                    onChange={(e) =>
                                        onCalChangeEDT_KSV_PO_MATL_LIST_FRT_DATE(
                                            e,
                                            "FRT_DATE",
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
                                width: "33rem",
                            }}
                        >
                            <p style={{ width: "8rem", display: "inline-block", }}>.</p>
                            <div
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "23rem",
                                }}
                            >
                                <Dropdown
                                    id="id_TRADE_TYPE"
                                    value={dataEDT_KSV_PO_MATL_LIST_TRADE_TYPE}
                                    onChange={(e) =>
                                        onDropdownChangeEDT_KSV_PO_MATL_LIST_TRADE_TYPE(
                                            e,
                                            "TRADE_TYPE",
                                        )
                                    }
                                    options={
                                        datasEDT_KSV_PO_MATL_LIST_TRADE_TYPE
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
                                width: "33rem",
                            }}
                        >
                            <p style={{ width: "8rem", display: "inline-block", }}>.</p>
                            <div
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "23rem",
                                }}
                            >
                                <Dropdown
                                    id="id_AREA_TYPE"
                                    value={dataEDT_KSV_PO_MATL_LIST_AREA_TYPE}
                                    onChange={(e) =>
                                        onDropdownChangeEDT_KSV_PO_MATL_LIST_AREA_TYPE(
                                            e,
                                            "AREA_TYPE",
                                        )
                                    }
                                    options={
                                        datasEDT_KSV_PO_MATL_LIST_AREA_TYPE
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
                                width: "33rem",
                            }}
                        >
                            <p style={{ width: "8rem", display: "inline-block", }}>.</p>
                            <div
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "23rem",
                                }}
                            >
                                <Dropdown
                                    id="id_MATL_TYPE"
                                    value={dataEDT_KSV_PO_MATL_LIST_MATL_TYPE}
                                    onChange={(e) =>
                                        onDropdownChangeEDT_KSV_PO_MATL_LIST_MATL_TYPE(
                                            e,
                                            "MATL_TYPE",
                                        )
                                    }
                                    options={
                                        datasEDT_KSV_PO_MATL_LIST_MATL_TYPE
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
                                width: "33rem",
                            }}
                        >
                            <p style={{ width: "8rem", display: "inline-block", }}>.</p>
                            <div
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "23rem",
                                }}
                            >
                                <Dropdown
                                    id="id_PACEL_TYPE"
                                    value={dataEDT_KSV_PO_MATL_LIST_PACEL_TYPE}
                                    onChange={(e) =>
                                        onDropdownChangeEDT_KSV_PO_MATL_LIST_PACEL_TYPE(
                                            e,
                                            "PACEL_TYPE",
                                        )
                                    }
                                    options={
                                        datasEDT_KSV_PO_MATL_LIST_PACEL_TYPE
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
                                width: "33rem",
                            }}
                        >
                            <p style={{ width: "8rem", display: "inline-block", }}>Reg User</p>
                            <InputText
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "23rem",
                                }}
                                id="id_REG_USER"
                                value={dataEDT_KSV_PO_MATL_LIST.REG_USER}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_PO_MATL_LIST_REG_USER(
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
                                width: "33rem",
                            }}
                        >
                            <p style={{ width: "8rem", display: "inline-block", }}>Departure</p>
                            <div
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "23rem",
                                }}
                            >
                                <Dropdown
                                    id="id_DEPARTURE"
                                    value={dataEDT_KSV_PO_MATL_LIST_DEPARTURE}
                                    onChange={(e) =>
                                        onDropdownChangeEDT_KSV_PO_MATL_LIST_DEPARTURE(
                                            e,
                                            "DEPARTURE",
                                        )
                                    }
                                    options={
                                        datasEDT_KSV_PO_MATL_LIST_DEPARTURE
                                    }
                                    optionLabel="COM_NAME"
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
                                width: "33rem",
                            }}
                        >
                            <p style={{ width: "8rem", display: "inline-block", }}>Destination</p>
                            <div
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "23rem",
                                }}
                            >
                                <Dropdown
                                    id="id_DESTINATION"
                                    value={dataEDT_KSV_PO_MATL_LIST_DESTINATION}
                                    onChange={(e) =>
                                        onDropdownChangeEDT_KSV_PO_MATL_LIST_DESTINATION(
                                            e,
                                            "DESTINATION",
                                        )
                                    }
                                    options={
                                        datasEDT_KSV_PO_MATL_LIST_DESTINATION
                                    }
                                    optionLabel="COM_NAME"
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
                                width: "33rem",
                            }}
                        >
                            <p style={{ width: "8rem", display: "inline-block", }}>Cost</p>
                            <div
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "23rem",
                                }}
                            >
                                <Checkbox
                                    style={{
                                        display: "inline-block",
                                        width: "20rem",
                                        marginLeft: 80,
                                    }}
                                    id="id_IS_COST"
                                    checked={changeCheckBoxVal(
                                        dataEDT_KSV_PO_MATL_LIST.IS_COST,
                                    )}
                                    onChange={(e) =>
                                        onCheckboxChangeEDT_KSV_PO_MATL_LIST_IS_COST(
                                            e,
                                            "IS_COST",
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
                                width: "33rem",
                            }}
                        >
                            <p style={{ width: "8rem", display: "inline-block", }}>Sender</p>
                            <div
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "23rem",
                                }}
                            >
                                <Dropdown
                                    id="id_SENDER"
                                    value={dataEDT_KSV_PO_MATL_LIST_SENDER}
                                    onChange={(e) =>
                                        onDropdownChangeEDT_KSV_PO_MATL_LIST_SENDER(
                                            e,
                                            "SENDER",
                                        )
                                    }
                                    options={datasEDT_KSV_PO_MATL_LIST_SENDER}
                                    optionLabel="SENDOR"
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
                                width: "33rem",
                            }}
                        >
                            <p style={{ width: "8rem", display: "inline-block", }}>Receiver</p>
                            <div
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "23rem",
                                }}
                            >
                                <Dropdown
                                    id="id_RECEIVER"
                                    value={dataEDT_KSV_PO_MATL_LIST_RECEIVER}
                                    onChange={(e) =>
                                        onDropdownChangeEDT_KSV_PO_MATL_LIST_RECEIVER(
                                            e,
                                            "RECEIVER",
                                        )
                                    }
                                    options={datasEDT_KSV_PO_MATL_LIST_RECEIVER}
                                    optionLabel="RECEIVER"
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
                                width: "33rem",
                            }}
                        >
                            <p style={{ width: "8rem", display: "inline-block", }}>Buyer</p>
                            <div
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "23rem",
                                }}
                            >
                                <Dropdown
                                    id="id_BUYER_CD"
                                    value={dataEDT_KSV_PO_MATL_LIST_BUYER_CD}
                                    onChange={(e) =>
                                        onDropdownChangeEDT_KSV_PO_MATL_LIST_BUYER_CD(
                                            e,
                                            "BUYER_CD",
                                        )
                                    }
                                    options={datasEDT_KSV_PO_MATL_LIST_BUYER_CD}
                                    optionLabel="BUYER_NAME"
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
                                width: "33rem",
                            }}
                        >
                            <p style={{ width: "8rem", display: "inline-block", }}>Reason</p>
                            <div
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "23rem",
                                }}
                            >
                                <Dropdown
                                    id="id_DELAY_REASON"
                                    value={
                                        dataEDT_KSV_PO_MATL_LIST_DELAY_REASON
                                    }
                                    onChange={(e) =>
                                        onDropdownChangeEDT_KSV_PO_MATL_LIST_DELAY_REASON(
                                            e,
                                            "DELAY_REASON",
                                        )
                                    }
                                    options={
                                        datasEDT_KSV_PO_MATL_LIST_DELAY_REASON
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
                                width: "33rem",
                            }}
                        >
                            <p style={{ width: "8rem", display: "inline-block", }}>Net</p>
                            <InputText
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "23rem",
                                }}
                                id="id_NET"
                                value={dataEDT_KSV_PO_MATL_LIST.NET}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_PO_MATL_LIST_NET(
                                        e,
                                        "NET",
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
                            <p style={{ width: "8rem", display: "inline-block", }}>Vat</p>
                            <InputText
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "23rem",
                                }}
                                id="id_VAT"
                                value={dataEDT_KSV_PO_MATL_LIST.VAT}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_PO_MATL_LIST_VAT(
                                        e,
                                        "VAT",
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
                            <p style={{ width: "8rem", display: "inline-block", }}>Amount</p>
                            <InputText
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "23rem",
                                }}
                                id="id_AMOUNT"
                                value={dataEDT_KSV_PO_MATL_LIST.AMOUNT}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_PO_MATL_LIST_AMOUNT(
                                        e,
                                        "AMOUNT",
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
                            <p style={{ width: "8rem", display: "inline-block", }}>Curr</p>
                            <div
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "23rem",
                                }}
                            >
                                <Dropdown
                                    id="id_CURR_CD"
                                    value={dataEDT_KSV_PO_MATL_LIST_CURR_CD}
                                    onChange={(e) =>
                                        onDropdownChangeEDT_KSV_PO_MATL_LIST_CURR_CD(
                                            e,
                                            "CURR_CD",
                                        )
                                    }
                                    options={datasEDT_KSV_PO_MATL_LIST_CURR_CD}
                                    optionLabel="CURR_NAME"
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
                                width: "33rem",
                            }}
                        >
                            <p style={{ width: "8rem", display: "inline-block", }}>M/W</p>
                            <div
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "23rem",
                                }}
                            >
                                <Dropdown
                                    id="id_MW"
                                    value={dataEDT_KSV_PO_MATL_LIST_MW}
                                    onChange={(e) =>
                                        onDropdownChangeEDT_KSV_PO_MATL_LIST_MW(
                                            e,
                                            "MW",
                                        )
                                    }
                                    options={datasEDT_KSV_PO_MATL_LIST_MW}
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
                                width: "33rem",
                            }}
                        >
                            <p style={{ width: "8rem", display: "inline-block", }}>Charge</p>
                            <div
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "23rem",
                                }}
                            >
                                <Dropdown
                                    id="id_CHARGE1"
                                    value={dataEDT_KSV_PO_MATL_LIST_CHARGE1}
                                    onChange={(e) =>
                                        onDropdownChangeEDT_KSV_PO_MATL_LIST_CHARGE1(
                                            e,
                                            "CHARGE1",
                                        )
                                    }
                                    options={datasEDT_KSV_PO_MATL_LIST_CHARGE1}
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
                                width: "33rem",
                            }}
                        >
                            <p style={{ width: "8rem", display: "inline-block", }}>.</p>
                            <div
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "23rem",
                                }}
                            >
                                <Dropdown
                                    id="id_CHARGE2"
                                    value={dataEDT_KSV_PO_MATL_LIST_CHARGE2}
                                    onChange={(e) =>
                                        onDropdownChangeEDT_KSV_PO_MATL_LIST_CHARGE2(
                                            e,
                                            "CHARGE2",
                                        )
                                    }
                                    options={datasEDT_KSV_PO_MATL_LIST_CHARGE2}
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
                                width: "33rem",
                            }}
                        >
                            <p style={{ width: "8rem", display: "inline-block", }}>Weight/CBM</p>
                            <InputText
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "23rem",
                                }}
                                id="id_WEIGHT_CBM"
                                value={dataEDT_KSV_PO_MATL_LIST.WEIGHT_CBM}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_PO_MATL_LIST_WEIGHT_CBM(
                                        e,
                                        "WEIGHT_CBM",
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
                            <p style={{ width: "8rem", display: "inline-block", }}>Weight/Net</p>
                            <InputText
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "23rem",
                                }}
                                id="id_WEIGHT_NET"
                                value={dataEDT_KSV_PO_MATL_LIST.WEIGHT_NET}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_PO_MATL_LIST_WEIGHT_NET(
                                        e,
                                        "WEIGHT_NET",
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
                            <p style={{ width: "8rem", display: "inline-block", }}>Desc</p>
                            <InputText
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "23rem",
                                }}
                                id="id_DESC"
                                value={dataEDT_KSV_PO_MATL_LIST.DESC}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_PO_MATL_LIST_DESC(
                                        e,
                                        "DESC",
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
                            <p style={{ width: "8rem", display: "inline-block", }}>BL No</p>
                            <InputText
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "23rem",
                                }}
                                id="id_BL_NO"
                                value={dataEDT_KSV_PO_MATL_LIST.BL_NO}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_PO_MATL_LIST_BL_NO(
                                        e,
                                        "BL_NO",
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
                            <p style={{ width: "8rem", display: "inline-block", }}>Garment Comp</p>
                            <InputText
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "23rem",
                                }}
                                id="id_GARMENT_COMP"
                                value={dataEDT_KSV_PO_MATL_LIST.GARMENT_COMP}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_PO_MATL_LIST_GARMENT_COMP(
                                        e,
                                        "GARMENT_COMP",
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
                            <p style={{ width: "8rem", display: "inline-block", }}>Invoice No</p>
                            <InputText
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "23rem",
                                }}
                                id="id_INVOICE_NO"
                                value={dataEDT_KSV_PO_MATL_LIST.INVOICE_NO}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_PO_MATL_LIST_INVOICE_NO(
                                        e,
                                        "INVOICE_NO",
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
                            <p style={{ width: "8rem", display: "inline-block", }}>Remark</p>
                            <InputText
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "23rem",
                                }}
                                id="id_REMARK"
                                value={dataEDT_KSV_PO_MATL_LIST.REMARK}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_PO_MATL_LIST_REMARK(
                                        e,
                                        "REMARK",
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
                            <p style={{ width: "8rem", display: "inline-block", }}>Po</p>
                            <InputText
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "23rem",
                                }}
                                id="id_PO_CD"
                                value={dataEDT_KSV_PO_MATL_LIST.PO_CD}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_PO_MATL_LIST_PO_CD(
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
                                width: "33rem",
                            }}
                        >
                            <p style={{ width: "8rem", display: "inline-block", }}>Order</p>
                            <InputText
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "23rem",
                                }}
                                id="id_ORDER_CD"
                                value={dataEDT_KSV_PO_MATL_LIST.ORDER_CD}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_PO_MATL_LIST_ORDER_CD(
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
                                width: "33rem",
                            }}
                        >
                            <p style={{ width: "8rem", display: "inline-block", }}>Unit</p>
                            <InputText
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "23rem",
                                }}
                                id="id_UNIT"
                                value={dataEDT_KSV_PO_MATL_LIST.UNIT}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_PO_MATL_LIST_UNIT(
                                        e,
                                        "UNIT",
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
                            <p style={{ width: "8rem", display: "inline-block", }}>Price(W)</p>
                            <InputText
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "23rem",
                                }}
                                id="id_PRICE_WON"
                                value={dataEDT_KSV_PO_MATL_LIST.PRICE_WON}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_PO_MATL_LIST_PRICE_WON(
                                        e,
                                        "PRICE_WON",
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
                            <p style={{ width: "8rem", display: "inline-block", }}>Qty</p>
                            <InputText
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "23rem",
                                }}
                                id="id_QTY"
                                value={dataEDT_KSV_PO_MATL_LIST.QTY}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_PO_MATL_LIST_QTY(
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
                                width: "33rem",
                            }}
                        >
                            <p style={{ width: "8rem", display: "inline-block", }}>Matl Cd</p>
                            <InputText
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "23rem",
                                }}
                                id="id_MATL_CD"
                                value={dataEDT_KSV_PO_MATL_LIST.MATL_CD}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_PO_MATL_LIST_MATL_CD(
                                        e,
                                        "MATL_CD",
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
                            <p style={{ width: "8rem", display: "inline-block", }}>Style</p>
                            <InputText
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "23rem",
                                }}
                                id="id_STYLE_NAME"
                                value={dataEDT_KSV_PO_MATL_LIST.STYLE_NAME}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_PO_MATL_LIST_STYLE_NAME(
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
                            <p style={{ width: "8rem", display: "inline-block", }}>Air Charge</p>
                            <InputText
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "23rem",
                                }}
                                id="id_AIR_CHARAGE"
                                value={dataEDT_KSV_PO_MATL_LIST.AIR_CHARAGE}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_PO_MATL_LIST_AIR_CHARAGE(
                                        e,
                                        "AIR_CHARAGE",
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
                            <p style={{ width: "8rem", display: "inline-block", }}>Express Charge</p>
                            <InputText
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "23rem",
                                }}
                                id="id_EXPRESS_CHARAGE"
                                value={dataEDT_KSV_PO_MATL_LIST.EXPRESS_CHARAGE}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_PO_MATL_LIST_EXPRESS_CHARAGE(
                                        e,
                                        "EXPRESS_CHARAGE",
                                    )
                                }
                            />
                        </span>
                    </div>

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

export default React.memo(S0418_GARMENT_FREIGHT, comparisonFn);
