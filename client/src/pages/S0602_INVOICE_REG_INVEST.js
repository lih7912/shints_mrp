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
import { ServiceS0602_INVOICE_REG_INVEST } from "../service/service_biz/ServiceS0602_INVOICE_REG_INVEST";

import "./page_common.scss";

const emptyKCD_CODE = {
    id: 0,
    CD_GROUP: "",
    CD_CODE: "",
    CD_NAME: "",
    CD_FLAG: "",
};

const emptyTBL_KSV_INVOICE_MST = {
    id: 0,
    BUYER_NAME: "",
    PO_CD: "",
    ORDER_CD: "",
    STYLE_NAME: "",
    SHIP_QTY: "",
    FOB: "",
    S_PRICE: "",
    SHIP_PRICE: "",
    SHIP_AMT: "",
    FACTORY_NAME: "",
    INVOICE_NO: "",
    SEQ: "",
    EXFACTORY: "",
    SHIP_DATE: "",
    SHIP_PTTYPE: "",
    NAT_CD: "",
    DELIVERY_TYPE: "",
};

const emptyTBL_KSV_INVOICE_MST1 = {
    id: 0,
    BUYER_NAME: "",
    NAT_NAME: "",
    INVOICE_NO: "",
    PO_CD: "",
    ORDER_CD: "",
    STYLE_NAME: "",
    SHIP_PROD_TYPE: "",
    DELIVERY_TYPE: "",
    SHIP_QTY: "",
    FOB: "",
    FACTORY_NAME: "",
    FACTORY_CD: "",
    NAT_CD: "",
    DELIVERY_TYPE: "",
    SHIP_PTTYPE: "",
    SHIP_DATE: "",
    ORDER_STATUS: "",
};

const emptyEDT_KSV_INVOICE_MST = {
    INVOICE_NO: "",
    INVOICE_TYPE: "",
    SHIP_DATE: "",
    DUE_DATE: "",
    DELIVERY_TYPE: "",
    CURR_CD: "",
    MANAGE_AMT: "",
    ORD_AMT: "",
    ADD_AMT: "",
    TOT_AMT: "",
    BILL_AMT: "",
    NEGO_AMT: "",
    FROM: "",
    REMARK: "",
    BUYER_CD: "",
    REMAIN_AMT: "",
    ETC_AMT: "",
    PAYMENT_TYPE: "",
    TRADE_TYPE: "",
    TRADE_TYPE2: "",
    LICENSE_DATE: "",
    LICENSE_NO: "",
};

const emptyEDT_KSV_INVOICE_MST1 = {
    EXT_INVOICE: "",
    INVOICE_TYPE: "",
    VOS_AMT: "",
    VAT_AMT: "",
    VAT_DATE: "",
};

const emptyEDT_KSV_INVOICE_MST2 = {
    DOCU_NO: "",
    PROD_TYPE: "",
    NEOE: "",
};

const S0602_INVOICE_REG_INVEST = () => {
    const serviceLibRef = useRef(null);
    if (!serviceLibRef.current) {
        serviceLibRef.current = new ServiceLib();
        serviceLibRef.current.loginConfirm();
    }
    const serviceLib = serviceLibRef.current;
    const serviceS0602_INVOICE_REG_INVEST =
        new ServiceS0602_INVOICE_REG_INVEST();

    const toast = useRef(null);

    /* splitter 관련 */
    const [styleVal, setStyleVal] = useState({ width: "65vw" });

    /* TABLE KSV_INVOICE_MST*/
    // DEFINE DATAGRID : TBL_KSV_INVOICE_MST
    const [datasTBL_KSV_INVOICE_MST, setDatasTBL_KSV_INVOICE_MST] = useState(
        [],
    );
    const dt_TBL_KSV_INVOICE_MST = useRef(null);
    const [dataTBL_KSV_INVOICE_MST, setDataTBL_KSV_INVOICE_MST] = useState(
        emptyTBL_KSV_INVOICE_MST,
    );
    const [selectedTBL_KSV_INVOICE_MST, setSelectedTBL_KSV_INVOICE_MST] =
        useState([]);
    const [
        flagSelectModeTBL_KSV_INVOICE_MST,
        setFlagSelectModeTBL_KSV_INVOICE_MST,
    ] = useState(false);

    // DATAGRID CODE : TBL_KSV_INVOICE_MST

    const onRowClick1TBL_KSV_INVOICE_MST = (argData0) => {
        var argData = {};

        if (typeof argData0.length !== "undefined") {
            argData = argData0[0];
        } else {
            argData = argData0;
        }

        let argTBL_KSV_INVOICE_MST = argData;

        setDataTBL_KSV_INVOICE_MST(argTBL_KSV_INVOICE_MST);
    };

    const onRowClickTBL_KSV_INVOICE_MST = (event) => {
        let argTBL_KSV_INVOICE_MST = event.data;
        if (flagSelectModeTBL_KSV_INVOICE_MST) return;

        // Service : NawooAll:mgrQueryTBL_KSV_INVOICE_MST
    };

    /* TABLE KSV_INVOICE_MST1*/
    // DEFINE DATAGRID : TBL_KSV_INVOICE_MST1
    const [datasTBL_KSV_INVOICE_MST1, setDatasTBL_KSV_INVOICE_MST1] = useState(
        [],
    );
    const dt_TBL_KSV_INVOICE_MST1 = useRef(null);
    const [dataTBL_KSV_INVOICE_MST1, setDataTBL_KSV_INVOICE_MST1] = useState(
        emptyTBL_KSV_INVOICE_MST1,
    );
    const [selectedTBL_KSV_INVOICE_MST1, setSelectedTBL_KSV_INVOICE_MST1] =
        useState([]);
    const [
        flagSelectModeTBL_KSV_INVOICE_MST1,
        setFlagSelectModeTBL_KSV_INVOICE_MST1,
    ] = useState(false);

    // DATAGRID CODE : TBL_KSV_INVOICE_MST1

    const onRowClick1TBL_KSV_INVOICE_MST1 = (argData0) => {
        var argData = {};

        if (typeof argData0.length !== "undefined") {
            argData = argData0[0];
        } else {
            argData = argData0;
        }

        let argTBL_KSV_INVOICE_MST1 = argData;

        setDataTBL_KSV_INVOICE_MST1(argTBL_KSV_INVOICE_MST1);
    };

    const onRowClickTBL_KSV_INVOICE_MST1 = (event) => {
        let argTBL_KSV_INVOICE_MST1 = event.data;
        if (flagSelectModeTBL_KSV_INVOICE_MST1) return;

        // Service : NawooAll:mgrQueryTBL_KSV_INVOICE_MST1
    };

    /**EDIT KSV_INVOICE_MST */
    const [datasEDT_KSV_INVOICE_MST, setDatasEDT_KSV_INVOICE_MST] = useState(
        [],
    );
    const [dataEDT_KSV_INVOICE_MST, setDataEDT_KSV_INVOICE_MST] = useState(
        emptyEDT_KSV_INVOICE_MST,
    );

    const onInputChangeEDT_KSV_INVOICE_MST_INVOICE_NO = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_INVOICE_MST = { ...dataEDT_KSV_INVOICE_MST };

        let tTypeVal = _dataEDT_KSV_INVOICE_MST[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_INVOICE_MST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_INVOICE_MST[`${name}`] = parseInt(val);

        setDataEDT_KSV_INVOICE_MST(_dataEDT_KSV_INVOICE_MST);
    };

    const [
        datasEDT_KSV_INVOICE_MST_INVOICE_TYPE,
        setDatasEDT_KSV_INVOICE_MST_INVOICE_TYPE,
    ] = useState([]);
    const [
        dataEDT_KSV_INVOICE_MST_INVOICE_TYPE,
        setDataEDT_KSV_INVOICE_MST_INVOICE_TYPE,
    ] = useState({});

    const onDropdownChangeEDT_KSV_INVOICE_MST_INVOICE_TYPE = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataEDT_KSV_INVOICE_MST = { ...dataEDT_KSV_INVOICE_MST };

        let tTypeVal = _dataEDT_KSV_INVOICE_MST[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_KSV_INVOICE_MST[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_KSV_INVOICE_MST[`${name}`] = parseInt(val);
        }

        setDataEDT_KSV_INVOICE_MST(_dataEDT_KSV_INVOICE_MST);
        setDataEDT_KSV_INVOICE_MST_INVOICE_TYPE(e.value);
    };

    const onCalChangeEDT_KSV_INVOICE_MST_SHIP_DATE = (e, name) => {
        let val1 = e.value || "";
        let val = "";
        if (val1 === "") {
            val = "";
        } else {
            val = getDateVal(val1);
        }

        let _dataEDT_KSV_INVOICE_MST = { ...dataEDT_KSV_INVOICE_MST };
        _dataEDT_KSV_INVOICE_MST[`${name}`] = val;
        setDataEDT_KSV_INVOICE_MST(_dataEDT_KSV_INVOICE_MST);
    };

    const onCalChangeEDT_KSV_INVOICE_MST_DUE_DATE = (e, name) => {
        let val1 = e.value || "";
        let val = "";
        if (val1 === "") {
            val = "";
        } else {
            val = getDateVal(val1);
        }

        let _dataEDT_KSV_INVOICE_MST = { ...dataEDT_KSV_INVOICE_MST };
        _dataEDT_KSV_INVOICE_MST[`${name}`] = val;
        setDataEDT_KSV_INVOICE_MST(_dataEDT_KSV_INVOICE_MST);
    };

    const [
        datasEDT_KSV_INVOICE_MST_DELIVERY_TYPE,
        setDatasEDT_KSV_INVOICE_MST_DELIVERY_TYPE,
    ] = useState([]);
    const [
        dataEDT_KSV_INVOICE_MST_DELIVERY_TYPE,
        setDataEDT_KSV_INVOICE_MST_DELIVERY_TYPE,
    ] = useState({});

    const onDropdownChangeEDT_KSV_INVOICE_MST_DELIVERY_TYPE = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataEDT_KSV_INVOICE_MST = { ...dataEDT_KSV_INVOICE_MST };

        let tTypeVal = _dataEDT_KSV_INVOICE_MST[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_KSV_INVOICE_MST[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_KSV_INVOICE_MST[`${name}`] = parseInt(val);
        }

        setDataEDT_KSV_INVOICE_MST(_dataEDT_KSV_INVOICE_MST);
        setDataEDT_KSV_INVOICE_MST_DELIVERY_TYPE(e.value);
    };

    const [
        datasEDT_KSV_INVOICE_MST_CURR_CD,
        setDatasEDT_KSV_INVOICE_MST_CURR_CD,
    ] = useState([]);
    const [
        dataEDT_KSV_INVOICE_MST_CURR_CD,
        setDataEDT_KSV_INVOICE_MST_CURR_CD,
    ] = useState({});

    const onDropdownChangeEDT_KSV_INVOICE_MST_CURR_CD = (e, name) => {
        let val = (e.value && e.value.CURR_CD) || "";

        let _dataEDT_KSV_INVOICE_MST = { ...dataEDT_KSV_INVOICE_MST };

        let tTypeVal = _dataEDT_KSV_INVOICE_MST[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_KSV_INVOICE_MST[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_KSV_INVOICE_MST[`${name}`] = parseInt(val);
        }

        setDataEDT_KSV_INVOICE_MST(_dataEDT_KSV_INVOICE_MST);
        setDataEDT_KSV_INVOICE_MST_CURR_CD(e.value);
    };

    const onInputChangeEDT_KSV_INVOICE_MST_MANAGE_AMT = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_INVOICE_MST = { ...dataEDT_KSV_INVOICE_MST };

        let tTypeVal = _dataEDT_KSV_INVOICE_MST[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_INVOICE_MST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_INVOICE_MST[`${name}`] = parseInt(val);

        setDataEDT_KSV_INVOICE_MST(_dataEDT_KSV_INVOICE_MST);
    };

    const onInputChangeEDT_KSV_INVOICE_MST_ORD_AMT = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_INVOICE_MST = { ...dataEDT_KSV_INVOICE_MST };

        let tTypeVal = _dataEDT_KSV_INVOICE_MST[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_INVOICE_MST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_INVOICE_MST[`${name}`] = parseInt(val);

        setDataEDT_KSV_INVOICE_MST(_dataEDT_KSV_INVOICE_MST);
    };

    const onInputChangeEDT_KSV_INVOICE_MST_ADD_AMT = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_INVOICE_MST = { ...dataEDT_KSV_INVOICE_MST };

        let tTypeVal = _dataEDT_KSV_INVOICE_MST[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_INVOICE_MST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_INVOICE_MST[`${name}`] = parseInt(val);

        setDataEDT_KSV_INVOICE_MST(_dataEDT_KSV_INVOICE_MST);
    };

    const onInputChangeEDT_KSV_INVOICE_MST_TOT_AMT = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_INVOICE_MST = { ...dataEDT_KSV_INVOICE_MST };

        let tTypeVal = _dataEDT_KSV_INVOICE_MST[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_INVOICE_MST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_INVOICE_MST[`${name}`] = parseInt(val);

        setDataEDT_KSV_INVOICE_MST(_dataEDT_KSV_INVOICE_MST);
    };

    const onInputChangeEDT_KSV_INVOICE_MST_BILL_AMT = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_INVOICE_MST = { ...dataEDT_KSV_INVOICE_MST };

        let tTypeVal = _dataEDT_KSV_INVOICE_MST[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_INVOICE_MST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_INVOICE_MST[`${name}`] = parseInt(val);

        setDataEDT_KSV_INVOICE_MST(_dataEDT_KSV_INVOICE_MST);
    };

    const onInputChangeEDT_KSV_INVOICE_MST_NEGO_AMT = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_INVOICE_MST = { ...dataEDT_KSV_INVOICE_MST };

        let tTypeVal = _dataEDT_KSV_INVOICE_MST[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_INVOICE_MST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_INVOICE_MST[`${name}`] = parseInt(val);

        setDataEDT_KSV_INVOICE_MST(_dataEDT_KSV_INVOICE_MST);
    };

    const [datasEDT_KSV_INVOICE_MST_FROM, setDatasEDT_KSV_INVOICE_MST_FROM] =
        useState([]);
    const [dataEDT_KSV_INVOICE_MST_FROM, setDataEDT_KSV_INVOICE_MST_FROM] =
        useState({});

    const onDropdownChangeEDT_KSV_INVOICE_MST_FROM = (e, name) => {
        let val = (e.value && e.value.FACTORY_CD) || "";

        let _dataEDT_KSV_INVOICE_MST = { ...dataEDT_KSV_INVOICE_MST };

        let tTypeVal = _dataEDT_KSV_INVOICE_MST[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_KSV_INVOICE_MST[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_KSV_INVOICE_MST[`${name}`] = parseInt(val);
        }

        setDataEDT_KSV_INVOICE_MST(_dataEDT_KSV_INVOICE_MST);
        setDataEDT_KSV_INVOICE_MST_FROM(e.value);
    };

    const onInputChangeEDT_KSV_INVOICE_MST_REMARK = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_INVOICE_MST = { ...dataEDT_KSV_INVOICE_MST };

        let tTypeVal = _dataEDT_KSV_INVOICE_MST[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_INVOICE_MST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_INVOICE_MST[`${name}`] = parseInt(val);

        setDataEDT_KSV_INVOICE_MST(_dataEDT_KSV_INVOICE_MST);
    };

    const [
        datasEDT_KSV_INVOICE_MST_BUYER_CD,
        setDatasEDT_KSV_INVOICE_MST_BUYER_CD,
    ] = useState([]);
    const [
        dataEDT_KSV_INVOICE_MST_BUYER_CD,
        setDataEDT_KSV_INVOICE_MST_BUYER_CD,
    ] = useState({});

    const onDropdownChangeEDT_KSV_INVOICE_MST_BUYER_CD = (e, name) => {
        let val = (e.value && e.value.BUYER_CD) || "";

        let _dataEDT_KSV_INVOICE_MST = { ...dataEDT_KSV_INVOICE_MST };

        let tTypeVal = _dataEDT_KSV_INVOICE_MST[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_KSV_INVOICE_MST[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_KSV_INVOICE_MST[`${name}`] = parseInt(val);
        }

        setDataEDT_KSV_INVOICE_MST(_dataEDT_KSV_INVOICE_MST);
        setDataEDT_KSV_INVOICE_MST_BUYER_CD(e.value);
    };

    const onInputChangeEDT_KSV_INVOICE_MST_REMAIN_AMT = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_INVOICE_MST = { ...dataEDT_KSV_INVOICE_MST };

        let tTypeVal = _dataEDT_KSV_INVOICE_MST[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_INVOICE_MST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_INVOICE_MST[`${name}`] = parseInt(val);

        setDataEDT_KSV_INVOICE_MST(_dataEDT_KSV_INVOICE_MST);
    };

    const onInputChangeEDT_KSV_INVOICE_MST_ETC_AMT = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_INVOICE_MST = { ...dataEDT_KSV_INVOICE_MST };

        let tTypeVal = _dataEDT_KSV_INVOICE_MST[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_INVOICE_MST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_INVOICE_MST[`${name}`] = parseInt(val);

        setDataEDT_KSV_INVOICE_MST(_dataEDT_KSV_INVOICE_MST);
    };

    const [
        datasEDT_KSV_INVOICE_MST_PAYMENT_TYPE,
        setDatasEDT_KSV_INVOICE_MST_PAYMENT_TYPE,
    ] = useState([]);
    const [
        dataEDT_KSV_INVOICE_MST_PAYMENT_TYPE,
        setDataEDT_KSV_INVOICE_MST_PAYMENT_TYPE,
    ] = useState({});

    const onDropdownChangeEDT_KSV_INVOICE_MST_PAYMENT_TYPE = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataEDT_KSV_INVOICE_MST = { ...dataEDT_KSV_INVOICE_MST };

        let tTypeVal = _dataEDT_KSV_INVOICE_MST[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_KSV_INVOICE_MST[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_KSV_INVOICE_MST[`${name}`] = parseInt(val);
        }

        setDataEDT_KSV_INVOICE_MST(_dataEDT_KSV_INVOICE_MST);
        setDataEDT_KSV_INVOICE_MST_PAYMENT_TYPE(e.value);
    };

    const [
        datasEDT_KSV_INVOICE_MST_TRADE_TYPE,
        setDatasEDT_KSV_INVOICE_MST_TRADE_TYPE,
    ] = useState([]);
    const [
        dataEDT_KSV_INVOICE_MST_TRADE_TYPE,
        setDataEDT_KSV_INVOICE_MST_TRADE_TYPE,
    ] = useState({});

    const onDropdownChangeEDT_KSV_INVOICE_MST_TRADE_TYPE = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataEDT_KSV_INVOICE_MST = { ...dataEDT_KSV_INVOICE_MST };

        let tTypeVal = _dataEDT_KSV_INVOICE_MST[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_KSV_INVOICE_MST[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_KSV_INVOICE_MST[`${name}`] = parseInt(val);
        }

        setDataEDT_KSV_INVOICE_MST(_dataEDT_KSV_INVOICE_MST);
        setDataEDT_KSV_INVOICE_MST_TRADE_TYPE(e.value);
    };

    const [
        datasEDT_KSV_INVOICE_MST_TRADE_TYPE2,
        setDatasEDT_KSV_INVOICE_MST_TRADE_TYPE2,
    ] = useState([]);
    const [
        dataEDT_KSV_INVOICE_MST_TRADE_TYPE2,
        setDataEDT_KSV_INVOICE_MST_TRADE_TYPE2,
    ] = useState({});

    const onDropdownChangeEDT_KSV_INVOICE_MST_TRADE_TYPE2 = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataEDT_KSV_INVOICE_MST = { ...dataEDT_KSV_INVOICE_MST };

        let tTypeVal = _dataEDT_KSV_INVOICE_MST[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_KSV_INVOICE_MST[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_KSV_INVOICE_MST[`${name}`] = parseInt(val);
        }

        setDataEDT_KSV_INVOICE_MST(_dataEDT_KSV_INVOICE_MST);
        setDataEDT_KSV_INVOICE_MST_TRADE_TYPE2(e.value);
    };

    const onCalChangeEDT_KSV_INVOICE_MST_LICENSE_DATE = (e, name) => {
        let val1 = e.value || "";
        let val = "";
        if (val1 === "") {
            val = "";
        } else {
            val = getDateVal(val1);
        }

        let _dataEDT_KSV_INVOICE_MST = { ...dataEDT_KSV_INVOICE_MST };
        _dataEDT_KSV_INVOICE_MST[`${name}`] = val;
        setDataEDT_KSV_INVOICE_MST(_dataEDT_KSV_INVOICE_MST);
    };

    const onInputChangeEDT_KSV_INVOICE_MST_LICENSE_NO = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_INVOICE_MST = { ...dataEDT_KSV_INVOICE_MST };

        let tTypeVal = _dataEDT_KSV_INVOICE_MST[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_INVOICE_MST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_INVOICE_MST[`${name}`] = parseInt(val);

        setDataEDT_KSV_INVOICE_MST(_dataEDT_KSV_INVOICE_MST);
    };

    /**EDIT KSV_INVOICE_MST1 */
    const [datasEDT_KSV_INVOICE_MST1, setDatasEDT_KSV_INVOICE_MST1] = useState(
        [],
    );
    const [dataEDT_KSV_INVOICE_MST1, setDataEDT_KSV_INVOICE_MST1] = useState(
        emptyEDT_KSV_INVOICE_MST1,
    );

    const onInputChangeEDT_KSV_INVOICE_MST1_EXT_INVOICE = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_INVOICE_MST1 = { ...dataEDT_KSV_INVOICE_MST1 };

        let tTypeVal = _dataEDT_KSV_INVOICE_MST1[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_INVOICE_MST1[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_INVOICE_MST1[`${name}`] = parseInt(val);

        setDataEDT_KSV_INVOICE_MST1(_dataEDT_KSV_INVOICE_MST1);
    };

    const [
        datasEDT_KSV_INVOICE_MST1_INVOICE_TYPE,
        setDatasEDT_KSV_INVOICE_MST1_INVOICE_TYPE,
    ] = useState([]);
    const [
        dataEDT_KSV_INVOICE_MST1_INVOICE_TYPE,
        setDataEDT_KSV_INVOICE_MST1_INVOICE_TYPE,
    ] = useState({});

    const onDropdownChangeEDT_KSV_INVOICE_MST1_INVOICE_TYPE = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataEDT_KSV_INVOICE_MST1 = { ...dataEDT_KSV_INVOICE_MST1 };

        let tTypeVal = _dataEDT_KSV_INVOICE_MST1[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_KSV_INVOICE_MST1[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_KSV_INVOICE_MST1[`${name}`] = parseInt(val);
        }

        setDataEDT_KSV_INVOICE_MST1(_dataEDT_KSV_INVOICE_MST1);
        setDataEDT_KSV_INVOICE_MST1_INVOICE_TYPE(e.value);
    };

    const onInputChangeEDT_KSV_INVOICE_MST1_VOS_AMT = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_INVOICE_MST1 = { ...dataEDT_KSV_INVOICE_MST1 };

        let tTypeVal = _dataEDT_KSV_INVOICE_MST1[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_INVOICE_MST1[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_INVOICE_MST1[`${name}`] = parseInt(val);

        setDataEDT_KSV_INVOICE_MST1(_dataEDT_KSV_INVOICE_MST1);
    };

    const onInputChangeEDT_KSV_INVOICE_MST1_VAT_AMT = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_INVOICE_MST1 = { ...dataEDT_KSV_INVOICE_MST1 };

        let tTypeVal = _dataEDT_KSV_INVOICE_MST1[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_INVOICE_MST1[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_INVOICE_MST1[`${name}`] = parseInt(val);

        setDataEDT_KSV_INVOICE_MST1(_dataEDT_KSV_INVOICE_MST1);
    };

    const onInputChangeEDT_KSV_INVOICE_MST1_VAT_DATE = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_INVOICE_MST1 = { ...dataEDT_KSV_INVOICE_MST1 };

        let tTypeVal = _dataEDT_KSV_INVOICE_MST1[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_INVOICE_MST1[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_INVOICE_MST1[`${name}`] = parseInt(val);

        setDataEDT_KSV_INVOICE_MST1(_dataEDT_KSV_INVOICE_MST1);
    };

    /**EDIT KSV_INVOICE_MST2 */
    const [datasEDT_KSV_INVOICE_MST2, setDatasEDT_KSV_INVOICE_MST2] = useState(
        [],
    );
    const [dataEDT_KSV_INVOICE_MST2, setDataEDT_KSV_INVOICE_MST2] = useState(
        emptyEDT_KSV_INVOICE_MST2,
    );

    const onInputChangeEDT_KSV_INVOICE_MST2_DOCU_NO = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_INVOICE_MST2 = { ...dataEDT_KSV_INVOICE_MST2 };

        let tTypeVal = _dataEDT_KSV_INVOICE_MST2[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_INVOICE_MST2[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_INVOICE_MST2[`${name}`] = parseInt(val);

        setDataEDT_KSV_INVOICE_MST2(_dataEDT_KSV_INVOICE_MST2);
    };

    const [
        datasEDT_KSV_INVOICE_MST2_PROD_TYPE,
        setDatasEDT_KSV_INVOICE_MST2_PROD_TYPE,
    ] = useState([]);
    const [
        dataEDT_KSV_INVOICE_MST2_PROD_TYPE,
        setDataEDT_KSV_INVOICE_MST2_PROD_TYPE,
    ] = useState({});

    const onDropdownChangeEDT_KSV_INVOICE_MST2_PROD_TYPE = (e, name) => {
        let val = (e.value && e.value.BUYER_CD) || "";

        let _dataEDT_KSV_INVOICE_MST2 = { ...dataEDT_KSV_INVOICE_MST2 };

        let tTypeVal = _dataEDT_KSV_INVOICE_MST2[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_KSV_INVOICE_MST2[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_KSV_INVOICE_MST2[`${name}`] = parseInt(val);
        }

        setDataEDT_KSV_INVOICE_MST2(_dataEDT_KSV_INVOICE_MST2);
        setDataEDT_KSV_INVOICE_MST2_PROD_TYPE(e.value);
    };

    const [datasEDT_KSV_INVOICE_MST2_NEOE, setDatasEDT_KSV_INVOICE_MST2_NEOE] =
        useState([]);
    const [dataEDT_KSV_INVOICE_MST2_NEOE, setDataEDT_KSV_INVOICE_MST2_NEOE] =
        useState({});

    const onDropdownChangeEDT_KSV_INVOICE_MST2_NEOE = (e, name) => {
        let val = (e.value && e.value.BUYER_CD) || "";

        let _dataEDT_KSV_INVOICE_MST2 = { ...dataEDT_KSV_INVOICE_MST2 };

        let tTypeVal = _dataEDT_KSV_INVOICE_MST2[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_KSV_INVOICE_MST2[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_KSV_INVOICE_MST2[`${name}`] = parseInt(val);
        }

        setDataEDT_KSV_INVOICE_MST2(_dataEDT_KSV_INVOICE_MST2);
        setDataEDT_KSV_INVOICE_MST2_NEOE(e.value);
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
                    width: "99rem",
                    height: "22rem",
                }}
            >
                <AFDataTable preventUnrelatedRerender
                    ref={dt_TBL_KSV_INVOICE_MST}
                    size="small"
                    value={datasTBL_KSV_INVOICE_MST}
                    resizableColumns
                    columnResizeMode="fit"
                    showGridlines
                    selectionMode="checkbox"
                    selection={selectedTBL_KSV_INVOICE_MST}
                    onSelectionChange={(e) => {
                        setFlagSelectModeTBL_KSV_INVOICE_MST(true);
                        setSelectedTBL_KSV_INVOICE_MST(e.value);
                        console.log(
                            "selected length:" +
                                selectedTBL_KSV_INVOICE_MST.length,
                        );
                        onRowClick1TBL_KSV_INVOICE_MST(e.value);
                    }}
                    onRowClick={onRowClickTBL_KSV_INVOICE_MST}
                    dataKey="id"
                    className="datatable-responsive"
                    virtualScrollerOptions={{ itemSize: 9 }}
                    emptyMessage=" " //header={headerTBL_KSV_INVOICE_MST}
                    responsiveLayout="scroll"
                    scrollable
                    scrollHeight="18rem"
                >
                    <AFColumn field="BUYER_NAME" header="Buyer" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="PO_CD" header="PO" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="ORDER_CD" header="Order" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="STYLE_NAME" header="Style" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="SHIP_QTY" header="Ship Qty" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="FOB" header="Fob" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="S_PRICE" header="S" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="SHIP_PRICE" header="Ship" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="SHIP_AMT" header="Ship" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="FACTORY_NAME" header="Factory" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="INVOICE_NO" header="Invoice No" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="SEQ" header="Seq" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="EXFACTORY" header="ExFactory" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="SHIP_DATE" header="Ship Date" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="SHIP_PTTYPE" header="Ship Type" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="NAT_CD" header="Country" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="DELIVERY_TYPE" header="Delivery" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                </AFDataTable>
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
                    ref={dt_TBL_KSV_INVOICE_MST1}
                    size="small"
                    value={datasTBL_KSV_INVOICE_MST1}
                    resizableColumns
                    columnResizeMode="fit"
                    showGridlines
                    selectionMode="checkbox"
                    selection={selectedTBL_KSV_INVOICE_MST1}
                    onSelectionChange={(e) => {
                        setFlagSelectModeTBL_KSV_INVOICE_MST1(true);
                        setSelectedTBL_KSV_INVOICE_MST1(e.value);
                        console.log(
                            "selected length:" +
                                selectedTBL_KSV_INVOICE_MST1.length,
                        );
                        onRowClick1TBL_KSV_INVOICE_MST1(e.value);
                    }}
                    onRowClick={onRowClickTBL_KSV_INVOICE_MST1}
                    dataKey="id"
                    className="datatable-responsive"
                    virtualScrollerOptions={{ itemSize: 9 }}
                    emptyMessage=" " //header={headerTBL_KSV_INVOICE_MST1}
                    responsiveLayout="scroll"
                    scrollable
                    scrollHeight="18rem"
                >
                    <AFColumn field="BUYER_NAME" header="Buyer" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="NAT_NAME" header="Country" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="INVOICE_NO" header="Invoice No" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="PO_CD" header="PO" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="ORDER_CD" header="Order" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="STYLE_NAME" header="Style" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="SHIP_PROD_TYPE" header="Ship Prod Type" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="DELIVERY_TYPE" header="Delivery" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="SHIP_QTY" header="Ship Qty" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="FOB" header="Fob" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="FACTORY_NAME" header="Factory" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="FACTORY_CD" header="Factory Cd" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="NAT_CD" header="Nat Cd" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="DELIVERY_TYPE" header="Delivery" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="SHIP_PTTYPE" header="Ship Type" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="SHIP_DATE" header="Ship Date" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="ORDER_STATUS" header="Ord Status" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                </AFDataTable>
            </div>

            <div style={{ width: "100rem", height: "20rem" }}>
                <div className="flex flex-row justify-content-start align-items-top">
                    <div style={{ width: "70rem", height: "17rem" }}>
                        <span
                            style={{
                                marginLeft: "0.5rem",
                                height: "2rem",
                                display: "inline-block",
                                width: "19rem",
                            }}
                        >
                            <p style={{ width: "8rem", display: "inline-block", }}>Invoice 번호</p>
                            <InputText
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "10rem",
                                }}
                                id="id_INVOICE_NO"
                                value={dataEDT_KSV_INVOICE_MST.INVOICE_NO}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_INVOICE_MST_INVOICE_NO(
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
                                width: "11rem",
                            }}
                        >
                            {/* <p style={{ width: '8rem', display: 'inline-block' }}> Invoice Type </p> */}
                            <div
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "10rem",
                                }}
                            >
                                <Dropdown
                                    id="id_INVOICE_TYPE"
                                    value={dataEDT_KSV_INVOICE_MST_INVOICE_TYPE}
                                    onChange={(e) =>
                                        onDropdownChangeEDT_KSV_INVOICE_MST_INVOICE_TYPE(
                                            e,
                                            "INVOICE_TYPE",
                                        )
                                    }
                                    options={
                                        datasEDT_KSV_INVOICE_MST_INVOICE_TYPE
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
                                width: "20rem",
                            }}
                        >
                            <p style={{ width: "8rem", display: "inline-block", }}>예상선적금액</p>
                            <InputText
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "10rem",
                                }}
                                id="id_MANAGE_AMT"
                                value={dataEDT_KSV_INVOICE_MST.MANAGE_AMT}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_INVOICE_MST_MANAGE_AMT(
                                        e,
                                        "MANAGE_AMT",
                                    )
                                }
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
                            <p style={{ width: "3rem", display: "inline-block", }}>From</p>
                            <div
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "13rem",
                                }}
                            >
                                <Dropdown
                                    id="id_FROM"
                                    value={dataEDT_KSV_INVOICE_MST_FROM}
                                    onChange={(e) =>
                                        onDropdownChangeEDT_KSV_INVOICE_MST_FROM(
                                            e,
                                            "FROM",
                                        )
                                    }
                                    options={datasEDT_KSV_INVOICE_MST_FROM}
                                    optionLabel="FACTORY_NAME"
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
                                width: "19rem",
                            }}
                        >
                            <p style={{ width: "8rem", display: "inline-block", }}>선적일</p>
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
                                    id="id_SHIP_DATE"
                                    value={changeDateVal(
                                        dataEDT_KSV_INVOICE_MST.SHIP_DATE,
                                    )}
                                    onChange={(e) =>
                                        onCalChangeEDT_KSV_INVOICE_MST_SHIP_DATE(
                                            e,
                                            "SHIP_DATE",
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
                            <p style={{ width: "6rem", display: "inline-block", }}>선적금액</p>
                            <InputText
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "10rem",
                                }}
                                id="id_ORD_AMT"
                                value={dataEDT_KSV_INVOICE_MST.ORD_AMT}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_INVOICE_MST_ORD_AMT(
                                        e,
                                        "ORD_AMT",
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
                                width: "25rem",
                            }}
                        >
                            <p style={{ width: "6rem", display: "inline-block", }}>Remark</p>
                            <InputText
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "18rem",
                                }}
                                id="id_REMARK"
                                value={dataEDT_KSV_INVOICE_MST.REMARK}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_INVOICE_MST_REMARK(
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
                                width: "19rem",
                            }}
                        >
                            <p style={{ width: "8rem", display: "inline-block", }}>입금예정일</p>
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
                                        dataEDT_KSV_INVOICE_MST.DUE_DATE,
                                    )}
                                    onChange={(e) =>
                                        onCalChangeEDT_KSV_INVOICE_MST_DUE_DATE(
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
                                width: "17rem",
                            }}
                        >
                            <p style={{ width: "6rem", display: "inline-block", }}>가감액</p>
                            <InputText
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "10rem",
                                }}
                                id="id_ADD_AMT"
                                value={dataEDT_KSV_INVOICE_MST.ADD_AMT}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_INVOICE_MST_ADD_AMT(
                                        e,
                                        "ADD_AMT",
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
                            <p style={{ width: "6rem", display: "inline-block", }}>바이어</p>
                            <div
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "18rem",
                                }}
                            >
                                <Dropdown
                                    id="id_BUYER_CD"
                                    value={dataEDT_KSV_INVOICE_MST_BUYER_CD}
                                    onChange={(e) =>
                                        onDropdownChangeEDT_KSV_INVOICE_MST_BUYER_CD(
                                            e,
                                            "BUYER_CD",
                                        )
                                    }
                                    options={datasEDT_KSV_INVOICE_MST_BUYER_CD}
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
                                width: "19rem",
                            }}
                        >
                            <p style={{ width: "8rem", display: "inline-block", }}>Freight Type</p>
                            <div
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "10rem",
                                }}
                            >
                                <Dropdown
                                    id="id_DELIVERY_TYPE"
                                    value={
                                        dataEDT_KSV_INVOICE_MST_DELIVERY_TYPE
                                    }
                                    onChange={(e) =>
                                        onDropdownChangeEDT_KSV_INVOICE_MST_DELIVERY_TYPE(
                                            e,
                                            "DELIVERY_TYPE",
                                        )
                                    }
                                    options={
                                        datasEDT_KSV_INVOICE_MST_DELIVERY_TYPE
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
                            <p style={{ width: "6rem", display: "inline-block", }}>총액</p>
                            <InputText
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "10rem",
                                }}
                                id="id_TOT_AMT"
                                value={dataEDT_KSV_INVOICE_MST.TOT_AMT}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_INVOICE_MST_TOT_AMT(
                                        e,
                                        "TOT_AMT",
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
                                width: "15rem",
                            }}
                        >
                            <p style={{ width: "6rem", display: "inline-block", }}>잔액</p>
                            <InputText
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "8rem",
                                }}
                                id="id_REMAIN_AMT"
                                value={dataEDT_KSV_INVOICE_MST.REMAIN_AMT}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_INVOICE_MST_REMAIN_AMT(
                                        e,
                                        "REMAIN_AMT",
                                    )
                                }
                            />
                        </span>
                        <span
                            style={{
                                marginLeft: "0.5rem",
                                height: "2rem",
                                display: "inline-block",
                                width: "13rem",
                            }}
                        >
                            <p style={{ width: "4rem", display: "inline-block", }}>기타금액</p>
                            <InputText
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "8rem",
                                }}
                                id="id_ETC_AMT"
                                value={dataEDT_KSV_INVOICE_MST.ETC_AMT}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_INVOICE_MST_ETC_AMT(
                                        e,
                                        "ETC_AMT",
                                    )
                                }
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
                            <p style={{ width: "8rem", display: "inline-block", }}>통화</p>
                            <div
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "10rem",
                                }}
                            >
                                <Dropdown
                                    id="id_CURR_CD"
                                    value={dataEDT_KSV_INVOICE_MST_CURR_CD}
                                    onChange={(e) =>
                                        onDropdownChangeEDT_KSV_INVOICE_MST_CURR_CD(
                                            e,
                                            "CURR_CD",
                                        )
                                    }
                                    options={datasEDT_KSV_INVOICE_MST_CURR_CD}
                                    optionLabel="CURR_CD"
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
                            <p style={{ width: "6rem", display: "inline-block", }}>입금액</p>
                            <InputText
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "10rem",
                                }}
                                id="id_BILL_AMT"
                                value={dataEDT_KSV_INVOICE_MST.BILL_AMT}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_INVOICE_MST_BILL_AMT(
                                        e,
                                        "BILL_AMT",
                                    )
                                }
                            />
                        </span>
                        <span
                            style={{ display: "inline-block", width: "18rem" }}
                        >
                            <Button
                                label="조회"
                                icon="pi pi-search"
                                style={{ height: "1.1rem" }}
                                className="p-button-text"
                                onClick={blankFn}
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
                            <p style={{ width: "8rem", display: "inline-block", }}>Payment</p>
                            <div
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "10rem",
                                }}
                            >
                                <Dropdown
                                    id="id_PAYMENT_TYPE"
                                    value={dataEDT_KSV_INVOICE_MST_PAYMENT_TYPE}
                                    onChange={(e) =>
                                        onDropdownChangeEDT_KSV_INVOICE_MST_PAYMENT_TYPE(
                                            e,
                                            "PAYMENT_TYPE",
                                        )
                                    }
                                    options={
                                        datasEDT_KSV_INVOICE_MST_PAYMENT_TYPE
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
                                width: "11rem",
                            }}
                        >
                            {/* <p style={{ width: '8rem', display: 'inline-block' }}> . </p> */}
                            <div
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "10rem",
                                }}
                            >
                                <Dropdown
                                    id="id_TRADE_TYPE"
                                    value={dataEDT_KSV_INVOICE_MST_TRADE_TYPE}
                                    onChange={(e) =>
                                        onDropdownChangeEDT_KSV_INVOICE_MST_TRADE_TYPE(
                                            e,
                                            "TRADE_TYPE",
                                        )
                                    }
                                    options={
                                        datasEDT_KSV_INVOICE_MST_TRADE_TYPE
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
                                width: "11rem",
                            }}
                        >
                            {/* <p style={{ width: '8rem', display: 'inline-block' }}> . </p> */}
                            <div
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "10rem",
                                }}
                            >
                                <Dropdown
                                    id="id_TRADE_TYPE2"
                                    value={dataEDT_KSV_INVOICE_MST_TRADE_TYPE2}
                                    onChange={(e) =>
                                        onDropdownChangeEDT_KSV_INVOICE_MST_TRADE_TYPE2(
                                            e,
                                            "TRADE_TYPE2",
                                        )
                                    }
                                    options={
                                        datasEDT_KSV_INVOICE_MST_TRADE_TYPE2
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
                                width: "19rem",
                            }}
                        >
                            <p style={{ width: "8rem", display: "inline-block", }}>Nego</p>
                            <InputText
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "10rem",
                                }}
                                id="id_NEGO_AMT"
                                value={dataEDT_KSV_INVOICE_MST.NEGO_AMT}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_INVOICE_MST_NEGO_AMT(
                                        e,
                                        "NEGO_AMT",
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
                            <p style={{ width: "8rem", display: "inline-block", }}>면허No</p>
                            <InputText
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "23rem",
                                }}
                                id="id_LICENSE_NO"
                                value={dataEDT_KSV_INVOICE_MST.LICENSE_NO}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_INVOICE_MST_LICENSE_NO(
                                        e,
                                        "LICENSE_NO",
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
                            <p style={{ width: "8rem", display: "inline-block", }}>면허일</p>
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
                                    id="id_LICENSE_DATE"
                                    value={changeDateVal(
                                        dataEDT_KSV_INVOICE_MST.LICENSE_DATE,
                                    )}
                                    onChange={(e) =>
                                        onCalChangeEDT_KSV_INVOICE_MST_LICENSE_DATE(
                                            e,
                                            "LICENSE_DATE",
                                        )
                                    }
                                />
                            </div>
                        </span>
                    </div>

                    <div style={{ width: "30rem", height: "17rem" }}>
                        <span
                            style={{
                                marginLeft: "0.5rem",
                                height: "2rem",
                                display: "inline-block",
                                width: "33rem",
                            }}
                        >
                            <p style={{ width: "8rem", display: "inline-block", }}>외부Invoice번호</p>
                            <InputText
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "23rem",
                                }}
                                id="id_EXT_INVOICE"
                                value={dataEDT_KSV_INVOICE_MST1.EXT_INVOICE}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_INVOICE_MST1_EXT_INVOICE(
                                        e,
                                        "EXT_INVOICE",
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
                            <p style={{ width: "8rem", display: "inline-block", }}>Invoice Type</p>
                            <div
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "23rem",
                                }}
                            >
                                <Dropdown
                                    id="id_INVOICE_TYPE"
                                    value={
                                        dataEDT_KSV_INVOICE_MST1_INVOICE_TYPE
                                    }
                                    onChange={(e) =>
                                        onDropdownChangeEDT_KSV_INVOICE_MST1_INVOICE_TYPE(
                                            e,
                                            "INVOICE_TYPE",
                                        )
                                    }
                                    options={
                                        datasEDT_KSV_INVOICE_MST1_INVOICE_TYPE
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
                            <p style={{ width: "8rem", display: "inline-block", }}>공급가액(KRW)</p>
                            <InputText
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "23rem",
                                }}
                                id="id_VOS_AMT"
                                value={dataEDT_KSV_INVOICE_MST1.VOS_AMT}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_INVOICE_MST1_VOS_AMT(
                                        e,
                                        "VOS_AMT",
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
                            <p style={{ width: "8rem", display: "inline-block", }}>VAT(KRW)</p>
                            <InputText
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "23rem",
                                }}
                                id="id_VAT_AMT"
                                value={dataEDT_KSV_INVOICE_MST1.VAT_AMT}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_INVOICE_MST1_VAT_AMT(
                                        e,
                                        "VAT_AMT",
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
                            <p style={{ width: "8rem", display: "inline-block", }}>Date</p>
                            <InputText
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "23rem",
                                }}
                                id="id_VAT_DATE"
                                value={dataEDT_KSV_INVOICE_MST1.VAT_DATE}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_INVOICE_MST1_VAT_DATE(
                                        e,
                                        "VAT_DATE",
                                    )
                                }
                            />
                        </span>
                        <span
                            style={{
                                display: "inline-block",
                                marginLeft: "20rem",
                            }}
                        >
                            <Button
                                label="Update"
                                style={{ height: "1.1rem" }}
                                className="p-button-text"
                                onClick={blankFn}
                            />
                        </span>
                    </div>
                </div>
                <div style={{ width: "100rem" }}>
                    <span
                        style={{
                            marginLeft: "0.5rem",
                            height: "2rem",
                            display: "inline-block",
                            width: "23rem",
                        }}
                    >
                        <p style={{ width: "8rem", display: "inline-block" }}>전표번호</p>
                        <InputText
                            style={{
                                marginLeft: "0.5rem",
                                display: "inline-block",
                                width: "13rem",
                            }}
                            id="id_DOCU_NO"
                            value={dataEDT_KSV_INVOICE_MST2.DOCU_NO}
                            onChange={(e) =>
                                onInputChangeEDT_KSV_INVOICE_MST2_DOCU_NO(
                                    e,
                                    "DOCU_NO",
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
                        <p style={{ width: "8rem", display: "inline-block" }}>제품군</p>
                        <div
                            style={{
                                marginLeft: "0.5rem",
                                display: "inline-block",
                                width: "8rem",
                            }}
                        >
                            <Dropdown
                                id="id_PROD_TYPE"
                                value={dataEDT_KSV_INVOICE_MST2_PROD_TYPE}
                                onChange={(e) =>
                                    onDropdownChangeEDT_KSV_INVOICE_MST2_PROD_TYPE(
                                        e,
                                        "PROD_TYPE",
                                    )
                                }
                                options={datasEDT_KSV_INVOICE_MST2_PROD_TYPE}
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
                        <p style={{ width: "8rem", display: "inline-block" }}>NEOE거래처</p>
                        <div
                            style={{
                                marginLeft: "0.5rem",
                                display: "inline-block",
                                width: "23rem",
                            }}
                        >
                            <Dropdown
                                id="id_NEOE"
                                value={dataEDT_KSV_INVOICE_MST2_NEOE}
                                onChange={(e) =>
                                    onDropdownChangeEDT_KSV_INVOICE_MST2_NEOE(
                                        e,
                                        "NEOE",
                                    )
                                }
                                options={datasEDT_KSV_INVOICE_MST2_NEOE}
                                optionLabel="BUYER_NAME"
                                placeholder=""
                                editable
                            ></Dropdown>
                        </div>
                    </span>
                    <span style={{ display: "inline-block" }}>
                        <Button
                            label="자동전표생성"
                            style={{ height: "1.1rem" }}
                            className="p-button-text"
                            onClick={blankFn}
                        />

                        <Button
                            label="전표취소"
                            style={{ height: "1.1rem" }}
                            className="p-button-text"
                            onClick={blankFn}
                        />
                    </span>
                </div>
            </div>

            <Toast ref={toast} />
            <Divider />

            <div style={{ width: "100rem", height: "2rem" }}>
                <div className="formgrid grid">
                    <div>
                        <Button
                            style={{ display: "inline-block", width: "10rem" }}
                            label="INVOICE 조회"
                            className="p-button-text"
                            onClick={blankFn}
                        />

                        <Button
                            style={{ display: "inline-block", width: "10rem" }}
                            label="INVOICE 등록"
                            className="p-button-text"
                            onClick={blankFn}
                        />

                        <Button
                            style={{ display: "inline-block", width: "10rem" }}
                            label="INVOICE 수정"
                            className="p-button-text"
                            onClick={blankFn}
                        />

                        <Button
                            style={{ display: "inline-block", width: "10rem" }}
                            label="INVOICE 삭제"
                            className="p-button-text"
                            onClick={blankFn}
                        />

                        <Button
                            style={{ display: "inline-block", width: "8rem" }}
                            label="Reset"
                            className="p-button-text"
                            onClick={blankFn}
                        />

                        <Button
                            style={{ display: "inline-block", width: "8rem" }}
                            label="Excel"
                            className="p-button-text"
                            onClick={blankFn}
                        />

                        <Button
                            style={{ display: "inline-block", width: "10rem" }}
                            label="Excel(원)"
                            className="p-button-text"
                            onClick={blankFn}
                        />

                        <Button
                            style={{ display: "inline-block", width: "10rem" }}
                            label="Debit 등록"
                            className="p-button-text"
                            onClick={blankFn}
                        />

                        <Button
                            style={{ display: "inline-block", width: "12rem" }}
                            label="선적수량/단가수정"
                            className="p-button-text"
                            onClick={blankFn}
                        />

                        <Button
                            style={{ display: "inline-block", width: "10rem" }}
                            label="선택오더삭제"
                            className="p-button-text"
                            onClick={blankFn}
                        />
                    </div>
                </div>
            </div>

            <Divider />
        </div>
    );
};

const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(S0602_INVOICE_REG_INVEST, comparisonFn);
