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
import { ServiceS0410_STSIN_INPUT_LIST } from "../service/service_biz/ServiceS0410_STSIN_INPUT_LIST";

import "./page_common.scss";

const emptyKCD_CODE = {
    id: 0,
    CD_GROUP: "",
    CD_CODE: "",
    CD_NAME: "",
    CD_FLAG: "",
};

const emptyQRY_KSV_STOCK_IN = {
    S_IN_DATE: "",
    E_IN_DATE: "",
    MATL_NAME: "",
    IS_PAYREPORT_ONLY: "",
    USER_ID: "",
    PO_CD: "",
    MATL_CD: "",
    TYPE: "",
    IS_INCLUDE_OUTPUT: "",
    BILL_LIST: "",
    BUYER_CD: "",
    VENDOR_CD: "",
    PAY_BANK: "",
    BILL_TYPE1: "",
    BILL_TYPE2: "",
};

const emptyTBL_KSV_PO_MRP = {
    id: 0,
    PO_CD: "",
    ORDER_CD: "",
    VENDOR_NAME: "",
    MATL_NAME: "",
    COLOR: "",
    SPEC: "",
    UNIT: "",
    IN_QTY: "",
    T_QTY: "",
    LC_QTY: "",
    BILL_TYPE: "",
    IN_DATE: "",
    IN_TYPE: "",
    PAY_PRICE: "",
    CURR_CD: "",
    PAY_DATE: "",
    PAY_REPORT: "",
    LC_BILL_NO: "",
    MATL_CD: "",
    MIN_FLAG: "",
    STOCK_QTY: "",
    OUT_STATUS: "",
    OUT_QTY: "",
    PO_SEQ: "",
    MRP_SEQ: "",
    BILL_FLAg: "",
    IN_TYPE: "",
    CALC_FLAG: "",
};

const S0410_STSIN_INPUT_LIST = () => {
    const serviceLibRef = useRef(null);
    if (!serviceLibRef.current) {
        serviceLibRef.current = new ServiceLib();
        serviceLibRef.current.loginConfirm();
    }
    const serviceLib = serviceLibRef.current;
    const serviceS0410_STSIN_INPUT_LISTRef = useRef(null);
    if (!serviceS0410_STSIN_INPUT_LISTRef.current) serviceS0410_STSIN_INPUT_LISTRef.current = new ServiceS0410_STSIN_INPUT_LIST();
    const serviceS0410_STSIN_INPUT_LIST = serviceS0410_STSIN_INPUT_LISTRef.current;

    const toast = useRef(null);

    /* splitter 관련 */
    const [styleVal, setStyleVal] = useState({ width: "65vw" });

    const import_PAY_REPORT = () => {
        var tArray = datasTBL_KSV_PO_MRP.map((col, i) => {
            var tObj = { ...col };
            // tObj.BANK_CD = dataQRY_KSV_STOCK_IN.PAY_BANK;
            tObj.BANK_CD = "TONG";
            tObj.USER_ID = dataQRY_KSV_STOCK_IN.USER_ID;
            delete tObj.__typename;
            delete tObj.id;
            return tObj;
        });

        serviceS0410_STSIN_INPUT_LIST
            .mgrInsert_IMPORT_PAY_REPORT(tArray)
            .then((data) => {
                if (typeof data.graphQLErrors === "undefined") {
                    console.log(
                        "mgrInsert_IMPORT_PAY_REPORT call => " + data.length,
                    );
                    toast.current.show({
                        severity: "success",
                        summary: "Success Import PayReport",
                        detail: data[0].CODE,
                        life: 3000,
                    });
                    search_STOCK_IN();
                    //
                } else {
                    console.log(
                        "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                    toast.current.show({
                        severity: "success",
                        summary: "Error Import PayReport",
                        detail: "",
                        life: 3000,
                    });
                }
            });
    };

    const conform_PAY_REPORT = () => {
        var tArray = datasTBL_KSV_PO_MRP.map((col, i) => {
            var tObj = { ...col };
            // tObj.BANK_CD = dataQRY_KSV_STOCK_IN.PAY_BANK;
            tObj.BANK_CD = "TONG";
            tObj.USER_ID = dataQRY_KSV_STOCK_IN.USER_ID;
            delete tObj.__typename;
            delete tObj.id;
            return tObj;
        });

        serviceS0410_STSIN_INPUT_LIST
            .mgrInsert_CONFIRM_PAY_REPORT(tArray)
            .then((data) => {
                if (typeof data.graphQLErrors === "undefined") {
                    console.log(
                        "mgrInsert_CONFIRM_PAY_REPORT call => " + data.length,
                    );
                    toast.current.show({
                        severity: "success",
                        summary: "Success Confirm PayReport",
                        detail: data[0].CODE,
                        life: 3000,
                    });
                    search_STOCK_IN();
                    //
                } else {
                    console.log(
                        "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                    toast.current.show({
                        severity: "success",
                        summary: "Error Confirm PayReport",
                        detail: "",
                        life: 3000,
                    });
                }
            });
    };

    const search_STOCK_IN = () => {
        var tObj = {};
        tObj.S_IN_DATE = dataQRY_KSV_STOCK_IN.S_IN_DATE;
        tObj.E_IN_DATE = dataQRY_KSV_STOCK_IN.E_IN_DATE;
        tObj.PO_CD = dataQRY_KSV_STOCK_IN.PO_CD;
        tObj.MATL_CD = dataQRY_KSV_STOCK_IN.MATL_CD;
        tObj.BUYER_CD = dataQRY_KSV_STOCK_IN.BUYER_CD;
        tObj.MATL_NAME = dataQRY_KSV_STOCK_IN.MATL_NAME;
        tObj.VENDOR_CD = dataQRY_KSV_STOCK_IN.VENDOR_CD;
        // tObj.VENDOR_TYPE = dataQRY_KSV_STOCK_IN.TYPE;
        tObj.VENDOR_TYPE = "";
        // tObj.USER_ID = dataQRY_KSV_STOCK_IN.USER_ID;
        tObj.USER_ID = "";
        if (tObj.S_IN_DATE === "") {
            tObj.S_IN_DATE = "20220101";
            tObj.E_IN_DATE = "20231231";
        }
        if (tObj.PO_CD === "") {
            tObj.PO_CD = "PO23-0229";
        }
        setDataQRY_KSV_STOCK_IN(tObj);

        serviceS0410_STSIN_INPUT_LIST.mgrQuery_STOCK_IN(tObj).then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                console.log(
                    "ServiceMgrKCD_BUYER.mgr1KcdStyle call => " + data.length,
                );
                var tArray = data.map((col, i) => {
                    var tObj = { ...col };
                    tObj.id = i + 1;
                    return tObj;
                });
                setDatasTBL_KSV_PO_MRP(tArray);
            } else {
                console.log(
                    "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });
    };

    /* QRY KSV_STOCK_IN*/
    const [dataQRY_KSV_STOCK_IN, setDataQRY_KSV_STOCK_IN] = useState(
        emptyQRY_KSV_STOCK_IN,
    );

    const onCalChangeQRY_KSV_STOCK_IN_S_IN_DATE = (e, name) => {
        let val1 = e.value || "";
        let val = "";
        if (val1 === "") {
            val = "";
        } else {
            val = getDateVal(val1);
        }

        let _dataQRY_KSV_STOCK_IN = { ...dataQRY_KSV_STOCK_IN };
        _dataQRY_KSV_STOCK_IN[`${name}`] = val;
        setDataQRY_KSV_STOCK_IN(_dataQRY_KSV_STOCK_IN);
    };

    const onCalChangeQRY_KSV_STOCK_IN_E_IN_DATE = (e, name) => {
        let val1 = e.value || "";
        let val = "";
        if (val1 === "") {
            val = "";
        } else {
            val = getDateVal(val1);
        }

        let _dataQRY_KSV_STOCK_IN = { ...dataQRY_KSV_STOCK_IN };
        _dataQRY_KSV_STOCK_IN[`${name}`] = val;
        setDataQRY_KSV_STOCK_IN(_dataQRY_KSV_STOCK_IN);
    };

    const onInputChangeQRY_KSV_STOCK_IN_MATL_NAME = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_STOCK_IN = { ...dataQRY_KSV_STOCK_IN };

        let tTypeVal = _dataQRY_KSV_STOCK_IN[`${name}`];
        if (typeof tTypeVal === "string")
            _dataQRY_KSV_STOCK_IN[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_STOCK_IN[`${name}`] = parseInt(val);

        setDataQRY_KSV_STOCK_IN(_dataQRY_KSV_STOCK_IN);
    };

    const onCheckboxChangeQRY_KSV_STOCK_IN_IS_PAYREPORT_ONLY = (e, name) => {
        let val = "";
        let _dataQRY_KSV_STOCK_IN = { ...dataQRY_KSV_STOCK_IN };
        if (e.checked) {
            val = "1";
        } else {
            val = "0";
        }
        _dataQRY_KSV_STOCK_IN[`${name}`] = val;
        setDataQRY_KSV_STOCK_IN(_dataQRY_KSV_STOCK_IN);
    };

    const [datasQRY_KSV_STOCK_IN_USER_ID, setDatasQRY_KSV_STOCK_IN_USER_ID] =
        useState([]);
    const [dataQRY_KSV_STOCK_IN_USER_ID, setDataQRY_KSV_STOCK_IN_USER_ID] =
        useState({});

    const onDropdownChangeQRY_KSV_STOCK_IN_USER_ID = (e, name) => {
        let val = (e.value && e.value.USER_ID) || "";

        let _dataQRY_KSV_STOCK_IN = { ...dataQRY_KSV_STOCK_IN };

        let tTypeVal = _dataQRY_KSV_STOCK_IN[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_STOCK_IN[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_STOCK_IN[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_STOCK_IN(_dataQRY_KSV_STOCK_IN);
        setDataQRY_KSV_STOCK_IN_USER_ID(e.value);
    };

    const onInputChangeQRY_KSV_STOCK_IN_PO_CD = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_STOCK_IN = { ...dataQRY_KSV_STOCK_IN };

        let tTypeVal = _dataQRY_KSV_STOCK_IN[`${name}`];
        if (typeof tTypeVal === "string")
            _dataQRY_KSV_STOCK_IN[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_STOCK_IN[`${name}`] = parseInt(val);

        setDataQRY_KSV_STOCK_IN(_dataQRY_KSV_STOCK_IN);
    };

    const onInputChangeQRY_KSV_STOCK_IN_MATL_CD = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_STOCK_IN = { ...dataQRY_KSV_STOCK_IN };

        let tTypeVal = _dataQRY_KSV_STOCK_IN[`${name}`];
        if (typeof tTypeVal === "string")
            _dataQRY_KSV_STOCK_IN[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_STOCK_IN[`${name}`] = parseInt(val);

        setDataQRY_KSV_STOCK_IN(_dataQRY_KSV_STOCK_IN);
    };

    const [datasQRY_KSV_STOCK_IN_TYPE, setDatasQRY_KSV_STOCK_IN_TYPE] =
        useState([]);
    const [dataQRY_KSV_STOCK_IN_TYPE, setDataQRY_KSV_STOCK_IN_TYPE] = useState(
        {},
    );

    const onDropdownChangeQRY_KSV_STOCK_IN_TYPE = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataQRY_KSV_STOCK_IN = { ...dataQRY_KSV_STOCK_IN };

        let tTypeVal = _dataQRY_KSV_STOCK_IN[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_STOCK_IN[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_STOCK_IN[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_STOCK_IN(_dataQRY_KSV_STOCK_IN);
        setDataQRY_KSV_STOCK_IN_TYPE(e.value);
    };

    const onCheckboxChangeQRY_KSV_STOCK_IN_IS_INCLUDE_OUTPUT = (e, name) => {
        let val = "";
        let _dataQRY_KSV_STOCK_IN = { ...dataQRY_KSV_STOCK_IN };
        if (e.checked) {
            val = "1";
        } else {
            val = "0";
        }
        _dataQRY_KSV_STOCK_IN[`${name}`] = val;
        setDataQRY_KSV_STOCK_IN(_dataQRY_KSV_STOCK_IN);
    };

    const [
        datasQRY_KSV_STOCK_IN_BILL_LIST,
        setDatasQRY_KSV_STOCK_IN_BILL_LIST,
    ] = useState([]);
    const [dataQRY_KSV_STOCK_IN_BILL_LIST, setDataQRY_KSV_STOCK_IN_BILL_LIST] =
        useState({});

    const onDropdownChangeQRY_KSV_STOCK_IN_BILL_LIST = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataQRY_KSV_STOCK_IN = { ...dataQRY_KSV_STOCK_IN };

        let tTypeVal = _dataQRY_KSV_STOCK_IN[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_STOCK_IN[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_STOCK_IN[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_STOCK_IN(_dataQRY_KSV_STOCK_IN);
        setDataQRY_KSV_STOCK_IN_BILL_LIST(e.value);
    };

    const [datasQRY_KSV_STOCK_IN_BUYER_CD, setDatasQRY_KSV_STOCK_IN_BUYER_CD] =
        useState([]);
    const [dataQRY_KSV_STOCK_IN_BUYER_CD, setDataQRY_KSV_STOCK_IN_BUYER_CD] =
        useState({});

    const onDropdownChangeQRY_KSV_STOCK_IN_BUYER_CD = (e, name) => {
        let val = (e.value && e.value.BUYER_CD) || "";

        let _dataQRY_KSV_STOCK_IN = { ...dataQRY_KSV_STOCK_IN };

        let tTypeVal = _dataQRY_KSV_STOCK_IN[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_STOCK_IN[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_STOCK_IN[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_STOCK_IN(_dataQRY_KSV_STOCK_IN);
        setDataQRY_KSV_STOCK_IN_BUYER_CD(e.value);
    };

    const [
        datasQRY_KSV_STOCK_IN_VENDOR_CD,
        setDatasQRY_KSV_STOCK_IN_VENDOR_CD,
    ] = useState([]);
    const [dataQRY_KSV_STOCK_IN_VENDOR_CD, setDataQRY_KSV_STOCK_IN_VENDOR_CD] =
        useState({});

    const onDropdownChangeQRY_KSV_STOCK_IN_VENDOR_CD = (e, name) => {
        let val = (e.value && e.value.VENDOR_CD) || "";

        let _dataQRY_KSV_STOCK_IN = { ...dataQRY_KSV_STOCK_IN };

        let tTypeVal = _dataQRY_KSV_STOCK_IN[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_STOCK_IN[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_STOCK_IN[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_STOCK_IN(_dataQRY_KSV_STOCK_IN);
        setDataQRY_KSV_STOCK_IN_VENDOR_CD(e.value);
    };

    const [datasQRY_KSV_STOCK_IN_PAY_BANK, setDatasQRY_KSV_STOCK_IN_PAY_BANK] =
        useState([]);
    const [dataQRY_KSV_STOCK_IN_PAY_BANK, setDataQRY_KSV_STOCK_IN_PAY_BANK] =
        useState({});

    const onDropdownChangeQRY_KSV_STOCK_IN_PAY_BANK = (e, name) => {
        let val = (e.value && e.value.BANK_CD) || "";

        let _dataQRY_KSV_STOCK_IN = { ...dataQRY_KSV_STOCK_IN };

        let tTypeVal = _dataQRY_KSV_STOCK_IN[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_STOCK_IN[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_STOCK_IN[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_STOCK_IN(_dataQRY_KSV_STOCK_IN);
        setDataQRY_KSV_STOCK_IN_PAY_BANK(e.value);
    };

    const [
        datasQRY_KSV_STOCK_IN_BILL_TYPE1,
        setDatasQRY_KSV_STOCK_IN_BILL_TYPE1,
    ] = useState([]);
    const [
        dataQRY_KSV_STOCK_IN_BILL_TYPE1,
        setDataQRY_KSV_STOCK_IN_BILL_TYPE1,
    ] = useState({});

    const onDropdownChangeQRY_KSV_STOCK_IN_BILL_TYPE1 = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataQRY_KSV_STOCK_IN = { ...dataQRY_KSV_STOCK_IN };

        let tTypeVal = _dataQRY_KSV_STOCK_IN[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_STOCK_IN[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_STOCK_IN[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_STOCK_IN(_dataQRY_KSV_STOCK_IN);
        setDataQRY_KSV_STOCK_IN_BILL_TYPE1(e.value);
    };

    const [
        datasQRY_KSV_STOCK_IN_BILL_TYPE2,
        setDatasQRY_KSV_STOCK_IN_BILL_TYPE2,
    ] = useState([]);
    const [
        dataQRY_KSV_STOCK_IN_BILL_TYPE2,
        setDataQRY_KSV_STOCK_IN_BILL_TYPE2,
    ] = useState({});

    const onDropdownChangeQRY_KSV_STOCK_IN_BILL_TYPE2 = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataQRY_KSV_STOCK_IN = { ...dataQRY_KSV_STOCK_IN };

        let tTypeVal = _dataQRY_KSV_STOCK_IN[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_STOCK_IN[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_STOCK_IN[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_STOCK_IN(_dataQRY_KSV_STOCK_IN);
        setDataQRY_KSV_STOCK_IN_BILL_TYPE2(e.value);
    };

    /* TABLE KSV_PO_MRP*/
    // DEFINE DATAGRID : TBL_KSV_PO_MRP
    const [datasTBL_KSV_PO_MRP, setDatasTBL_KSV_PO_MRP] = useState([]);
    const dt_TBL_KSV_PO_MRP = useRef(null);
    const [dataTBL_KSV_PO_MRP, setDataTBL_KSV_PO_MRP] =
        useState(emptyTBL_KSV_PO_MRP);
    const [selectedTBL_KSV_PO_MRP, setSelectedTBL_KSV_PO_MRP] = useState([]);
    const [flagSelectModeTBL_KSV_PO_MRP, setFlagSelectModeTBL_KSV_PO_MRP] =
        useState(false);

    // DATAGRID CODE : TBL_KSV_PO_MRP

    const onRowClick1TBL_KSV_PO_MRP = (argData0) => {
        var argData = {};

        if (typeof argData0.length !== "undefined") {
            argData = argData0[0];
        } else {
            argData = argData0;
        }

        let argTBL_KSV_PO_MRP = argData;

        setDataTBL_KSV_PO_MRP(argTBL_KSV_PO_MRP);
    };

    const onRowClickTBL_KSV_PO_MRP = (event) => {
        let argTBL_KSV_PO_MRP = event.data;
        if (flagSelectModeTBL_KSV_PO_MRP) return;

        // Service : NawooAll:mgrQueryTBL_KSV_PO_MRP
    };

    const exportExcelTBL_KSV_PO_MRP = () => {};

    useEffect(() => {
        var tObj = {};
        tObj.S_IN_DATE = dataQRY_KSV_STOCK_IN.S_IN_DATE;
        tObj.E_IN_DATE = dataQRY_KSV_STOCK_IN.E_IN_DATE;
        tObj.PO_CD = dataQRY_KSV_STOCK_IN.PO_CD;
        tObj.MATL_CD = dataQRY_KSV_STOCK_IN.MATL_CD;
        tObj.BUYER_CD = dataQRY_KSV_STOCK_IN.BUYER_CD;
        tObj.MATL_NAME = dataQRY_KSV_STOCK_IN.MATL_NAME;
        tObj.VENDOR_CD = dataQRY_KSV_STOCK_IN.VENDOR_CD;
        tObj.VENDOR_TYPE = dataQRY_KSV_STOCK_IN.VENDOR_TYPE;
        tObj.USER_ID = dataQRY_KSV_STOCK_IN.USER_ID;
        if (tObj.S_IN_DATE === "") {
            tObj.S_IN_DATE = "20220101";
            tObj.E_IN_DATE = "20231231";
        }
        if (tObj.PO_CD === "") {
            tObj.PO_CD = "PO23-0229";
        }
        setDataQRY_KSV_STOCK_IN(tObj);

        serviceS0410_STSIN_INPUT_LIST.mgrQuery_CODE(tObj).then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                console.log(
                    "ServiceMgrKCD_BUYER.mgr1KcdStyle call => " +
                        data.VENDOR_CD.length,
                );
                setDatasQRY_KSV_STOCK_IN_USER_ID(data.USER_ID);
                setDataQRY_KSV_STOCK_IN_USER_ID(data.USER_ID[0]);

                setDatasQRY_KSV_STOCK_IN_TYPE(data.VENDOR_TYPE);
                setDataQRY_KSV_STOCK_IN_TYPE(data.VENDOR_TYPE[0]);

                setDatasQRY_KSV_STOCK_IN_BUYER_CD(data.BUYER_CD);
                setDataQRY_KSV_STOCK_IN_BUYER_CD(data.BUYER_CD[0]);

                setDatasQRY_KSV_STOCK_IN_VENDOR_CD(data.VENDOR_CD);
                setDataQRY_KSV_STOCK_IN_VENDOR_CD(data.VENDOR_CD[0]);

                setDatasQRY_KSV_STOCK_IN_BILL_TYPE2(data.BILL_TYPE);
                setDataQRY_KSV_STOCK_IN_BILL_TYPE2(data.BILL_TYPE[0]);

                setDatasQRY_KSV_STOCK_IN_BILL_TYPE1(data.BILL_TYPE2);
                setDataQRY_KSV_STOCK_IN_BILL_TYPE1(data.BILL_TYPE2[0]);

                setDatasQRY_KSV_STOCK_IN_PAY_BANK(data.BANK_CD);
                setDataQRY_KSV_STOCK_IN_PAY_BANK(data.BANK_CD[0]);
            } else {
                console.log(
                    "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });

        // search_STOCK_IN ();
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
                    height: "10rem",
                }}
            >
                <span
                    style={{
                        marginLeft: "0.5rem",
                        height: "2rem",
                        display: "inline-block",
                        width: "19rem",
                    }}
                >
                    <p style={{ width: "8rem", display: "inline-block" }}>In Date</p>
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
                            id="id_S_IN_DATE"
                            value={changeDateVal(
                                dataQRY_KSV_STOCK_IN.S_IN_DATE,
                            )}
                            onChange={(e) =>
                                onCalChangeQRY_KSV_STOCK_IN_S_IN_DATE(
                                    e,
                                    "S_IN_DATE",
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
                    <p style={{ width: "1rem", display: "inline-block" }}>~</p>
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
                            id="id_E_IN_DATE"
                            value={changeDateVal(
                                dataQRY_KSV_STOCK_IN.E_IN_DATE,
                            )}
                            onChange={(e) =>
                                onCalChangeQRY_KSV_STOCK_IN_E_IN_DATE(
                                    e,
                                    "E_IN_DATE",
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
                        width: "22rem",
                    }}
                >
                    <p style={{ width: "8rem", display: "inline-block" }}>Desc</p>
                    <InputText
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "13rem",
                        }}
                        id="id_MATL_NAME"
                        value={dataQRY_KSV_STOCK_IN.MATL_NAME}
                        onChange={(e) =>
                            onInputChangeQRY_KSV_STOCK_IN_MATL_NAME(
                                e,
                                "MATL_NAME",
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
                    <p style={{ width: "10rem", display: "inline-block" }}>No PayReport Only</p>
                    <div
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "1rem",
                        }}
                    >
                        <Checkbox
                            style={{
                                display: "inline-block",
                                width: "1rem",
                                marginLeft: "0.5rem",
                            }}
                            id="id_IS_PAYREPORT_ONLY"
                            checked={changeCheckBoxVal(
                                dataQRY_KSV_STOCK_IN.IS_PAYREPORT_ONLY,
                            )}
                            onChange={(e) =>
                                onCheckboxChangeQRY_KSV_STOCK_IN_IS_PAYREPORT_ONLY(
                                    e,
                                    "IS_PAYREPORT_ONLY",
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
                        width: "25rem",
                    }}
                >
                    <p style={{ width: "5rem", display: "inline-block" }}>User</p>
                    <div
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "10rem",
                        }}
                    >
                        <Dropdown
                            id="id_USER_ID"
                            value={dataQRY_KSV_STOCK_IN_USER_ID}
                            onChange={(e) =>
                                onDropdownChangeQRY_KSV_STOCK_IN_USER_ID(
                                    e,
                                    "USER_ID",
                                )
                            }
                            options={datasQRY_KSV_STOCK_IN_USER_ID}
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
                        width: "19rem",
                    }}
                >
                    <p style={{ width: "8rem", display: "inline-block" }}>Po No</p>
                    <InputText
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "10rem",
                        }}
                        id="id_PO_CD"
                        value={dataQRY_KSV_STOCK_IN.PO_CD}
                        onChange={(e) =>
                            onInputChangeQRY_KSV_STOCK_IN_PO_CD(e, "PO_CD")
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
                    <p style={{ width: "5rem", display: "inline-block" }}>Matl Cd</p>
                    <InputText
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "10rem",
                        }}
                        id="id_MATL_CD"
                        value={dataQRY_KSV_STOCK_IN.MATL_CD}
                        onChange={(e) =>
                            onInputChangeQRY_KSV_STOCK_IN_MATL_CD(e, "MATL_CD")
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
                    <p style={{ width: "4rem", display: "inline-block" }}>Type</p>
                    <div
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "13rem",
                        }}
                    >
                        <Dropdown
                            id="id_TYPE"
                            value={dataQRY_KSV_STOCK_IN_TYPE}
                            onChange={(e) =>
                                onDropdownChangeQRY_KSV_STOCK_IN_TYPE(e, "TYPE")
                            }
                            options={datasQRY_KSV_STOCK_IN_TYPE}
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
                        width: "12rem",
                    }}
                >
                    <p style={{ width: "8rem", display: "inline-block" }}>Include Output</p>
                    <div
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "1rem",
                        }}
                    >
                        <Checkbox
                            style={{
                                display: "inline-block",
                                width: "1rem",
                                marginLeft: "2.5rem",
                            }}
                            id="id_IS_INCLUDE_OUTPUT"
                            checked={changeCheckBoxVal(
                                dataQRY_KSV_STOCK_IN.IS_INCLUDE_OUTPUT,
                            )}
                            onChange={(e) =>
                                onCheckboxChangeQRY_KSV_STOCK_IN_IS_INCLUDE_OUTPUT(
                                    e,
                                    "IS_INCLUDE_OUTPUT",
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
                        width: "26rem",
                    }}
                >
                    <p style={{ width: "5rem", display: "inline-block" }}>Bill List</p>
                    <div
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "16rem",
                        }}
                    >
                        <Dropdown
                            id="id_BILL_LIST"
                            value={dataQRY_KSV_STOCK_IN_BILL_LIST}
                            onChange={(e) =>
                                onDropdownChangeQRY_KSV_STOCK_IN_BILL_LIST(
                                    e,
                                    "BILL_LIST",
                                )
                            }
                            options={datasQRY_KSV_STOCK_IN_BILL_LIST}
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
                    <p style={{ width: "8rem", display: "inline-block" }}>Buyer</p>
                    <div
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "23rem",
                        }}
                    >
                        <Dropdown
                            id="id_BUYER_CD"
                            value={dataQRY_KSV_STOCK_IN_BUYER_CD}
                            onChange={(e) =>
                                onDropdownChangeQRY_KSV_STOCK_IN_BUYER_CD(
                                    e,
                                    "BUYER_CD",
                                )
                            }
                            options={datasQRY_KSV_STOCK_IN_BUYER_CD}
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
                        width: "32rem",
                    }}
                >
                    <p style={{ width: "6.5rem", display: "inline-block" }}>Supplier</p>
                    <div
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "23rem",
                        }}
                    >
                        <Dropdown
                            id="id_VENDOR_CD"
                            value={dataQRY_KSV_STOCK_IN_VENDOR_CD}
                            onChange={(e) =>
                                onDropdownChangeQRY_KSV_STOCK_IN_VENDOR_CD(
                                    e,
                                    "VENDOR_CD",
                                )
                            }
                            options={datasQRY_KSV_STOCK_IN_VENDOR_CD}
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
                    <p style={{ width: "6rem", display: "inline-block" }}>Pay Bank</p>
                    <div
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "23rem",
                        }}
                    >
                        <Dropdown
                            id="id_PAY_BANK"
                            value={dataQRY_KSV_STOCK_IN_PAY_BANK}
                            onChange={(e) =>
                                onDropdownChangeQRY_KSV_STOCK_IN_PAY_BANK(
                                    e,
                                    "PAY_BANK",
                                )
                            }
                            options={datasQRY_KSV_STOCK_IN_PAY_BANK}
                            optionLabel="BANK_NAME"
                            placeholder=""
                            editable
                        ></Dropdown>
                    </div>
                </span>

                <span style={{ display: "inline-block", marginLeft: "77rem" }}>
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
                        className="p-button-text"
                        onClick={search_STOCK_IN}
                    />

                    <Button
                        label="Excel"
                        style={{ color: "green" }}
                        icon="pi pi-upload"
                        className="p-button-text"
                        onClick={exportExcelTBL_KSV_PO_MRP}
                    />
                </span>
            </div>
            <Divider />
            <div
                style={{ marginLeft: "1rem", width: "100rem", height: "3rem" }}
            >
                <span
                    style={{
                        marginLeft: "0.5rem",
                        height: "2rem",
                        display: "inline-block",
                        width: "51rem",
                    }}
                >
                    <p style={{ width: "8rem", display: "inline-block" }}>Bill Type1</p>
                    <div
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "23rem",
                        }}
                    >
                        <Dropdown
                            id="id_BILL_TYPE1"
                            value={dataQRY_KSV_STOCK_IN_BILL_TYPE1}
                            onChange={(e) =>
                                onDropdownChangeQRY_KSV_STOCK_IN_BILL_TYPE1(
                                    e,
                                    "BILL_TYPE1",
                                )
                            }
                            options={datasQRY_KSV_STOCK_IN_BILL_TYPE1}
                            optionLabel="CD_NAME"
                            placeholder=""
                            editable
                        ></Dropdown>
                    </div>
                    <Button
                        label="Import Matl Bill List_Temp"
                        style={{ display: "inline-block" }}
                        className="p-button-text"
                        onClick={import_PAY_REPORT}
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
                    <p style={{ width: "8rem", display: "inline-block" }}>Bill Type2</p>
                    <div
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "23rem",
                        }}
                    >
                        <Dropdown
                            id="id_BILL_TYPE2"
                            value={dataQRY_KSV_STOCK_IN_BILL_TYPE2}
                            onChange={(e) =>
                                onDropdownChangeQRY_KSV_STOCK_IN_BILL_TYPE2(
                                    e,
                                    "BILL_TYPE2",
                                )
                            }
                            options={datasQRY_KSV_STOCK_IN_BILL_TYPE2}
                            optionLabel="CD_NAME"
                            placeholder=""
                            editable
                        ></Dropdown>
                    </div>
                    <Button
                        label="L/C Deposit Bill List_Temp"
                        style={{ display: "inline-block" }}
                        className="p-button-text"
                        onClick={blankFn}
                    />
                </span>

                <span style={{ display: "inline-block" }}>
                    <Button
                        label="Bill Request"
                        className="p-button-text"
                        onClick={blankFn}
                    />
                    <Button
                        label="Bill Cancel"
                        className="p-button-text"
                        onClick={blankFn}
                    />
                </span>
            </div>
            <div style={{ width: "100rem", height: "2rem" }}></div>

            <div
                style={{
                    marginLeft: "1rem",
                    marginTop: "1rem",
                    width: "99rem",
                    height: "30rem",
                }}
            >
                <AFDataTable preventUnrelatedRerender
                    ref={dt_TBL_KSV_PO_MRP}
                    size="small"
                    value={datasTBL_KSV_PO_MRP}
                    resizableColumns
                    columnResizeMode="fit"
                    showGridlines
                    selectionMode="checkbox"
                    selection={selectedTBL_KSV_PO_MRP}
                    onSelectionChange={(e) => {
                        setFlagSelectModeTBL_KSV_PO_MRP(true);
                        setSelectedTBL_KSV_PO_MRP(e.value);
                        console.log(
                            "selected length:" + selectedTBL_KSV_PO_MRP.length,
                        );
                        onRowClick1TBL_KSV_PO_MRP(e.value);
                    }}
                    onRowClick={onRowClickTBL_KSV_PO_MRP}
                    dataKey="id"
                    className="datatable-responsive"
                    virtualScrollerOptions={{ itemSize: 14 }}
                    emptyMessage=" " //header={headerTBL_KSV_PO_MRP}
                    responsiveLayout="scroll"
                    scrollable
                    scrollHeight="28rem"
                >
                    <AFColumn field="PO_CD" headerClassName="t-header" header="Po No" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="ORDER_CD" headerClassName="t-header" header="Order No" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="VENDOR_NAME" headerClassName="t-header" header="Supplier" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="MATL_NAME" headerClassName="t-header" header="Description" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="COLOR" headerClassName="t-header" header="Color" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="SPEC" headerClassName="t-header" header="Spec" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="UNIT" headerClassName="t-header" header="Unit" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="IN_QTY" headerClassName="t-header" header="InQty" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="TOT_QTY" headerClassName="t-header" header="Total" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="LC_QTY" headerClassName="t-header" header="LC Qty" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="BILL_TYPE" headerClassName="t-header" header="Bill Type" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="IN_DATE" headerClassName="t-header" header="In Date" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="IN_TYPE" headerClassName="t-header" header="In Type" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="PAY_PRICE" headerClassName="t-header" header="Pay Price" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="PAY_CURR_CD" headerClassName="t-header" header="Curr" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="PAY_DATE" headerClassName="t-header" header="Pay Date" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="PAY_REPORT" headerClassName="t-header" header="Pay Report" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="LC_BILL_NO" headerClassName="t-header" header="Lc Bill No" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="MATL_CD" headerClassName="t-header" header="Matl Cd" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="MIN_FLAG" headerClassName="t-header" header="Min" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="STOCK_QTY" headerClassName="t-header" header="Stock" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="OUT_STATUS" headerClassName="t-header" header="O Status" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="OUT_QTY" headerClassName="t-header" header="Out Qty" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="PO_SEQ" headerClassName="t-header" header="Po Seq" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="MRP_SEQ" headerClassName="t-header" header="Mrp Seq" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="IN_DATETIME" headerClassName="t-header" header="Reg Date" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="BILL_FLAG" headerClassName="t-header" header="Bill flag" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="IN_TYPE" headerClassName="t-header" header="In Type" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="VENDOR_TYPE" headerClassName="t-header" header="Vendor Type" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="STOCK_IDX" headerClassName="t-header" header="Stock Idx" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="CALC_FLAG" headerClassName="t-header" header="Calc Flag" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                </AFDataTable>
            </div>

            <Divider />

            <div
                style={{ width: "100rem", height: "2rem", marginLeft: "50rem" }}
            >
                <div className="formgrid grid">
                    <div>
                        <Button
                            style={{ display: "inline-block", width: "10rem" }}
                            label="Comp"
                            className="p-button-text"
                            onClick={blankFn}
                        />

                        <Button
                            style={{ display: "inline-block", width: "10rem" }}
                            label="PayReport"
                            className="p-button-text"
                            onClick={conform_PAY_REPORT}
                        />

                        <Button
                            style={{ display: "inline-block", width: "10rem" }}
                            label="Qty Update"
                            className="p-button-text"
                            onClick={blankFn}
                        />

                        <Button
                            style={{ display: "inline-block", width: "10rem" }}
                            label="Input Cancel"
                            className="p-button-text"
                            onClick={blankFn}
                        />

                        <Button
                            style={{ display: "inline-block", width: "10rem" }}
                            label="List"
                            className="p-button-text"
                            onClick={blankFn}
                        />
                    </div>
                </div>
            </div>

            <Divider />

            <div style={{ width: "100rem", height: "30rem" }}>
                <div className="flex flex-row justify-content-start align-items-top">
                    <div style={{ width: "60rem", height: "30rem" }}></div>

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

export default React.memo(S0410_STSIN_INPUT_LIST, comparisonFn);
