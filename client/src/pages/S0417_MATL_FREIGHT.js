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
import { ServiceS0417_MATL_FREIGHT } from "../service/service_biz/ServiceS0417_MATL_FREIGHT";

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
    BL_NO: "",
    DESTINATION: "",
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
    GARMENT_COMPO: "",
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

const emptyEDT_KSV_PO_MATL_LIST1 = {
    FRT_DATE: "",
    BL_NO: "",
    AMOUNT: "",
    ETA: "",
    WEIGHT: "",
};

const S0417_MATL_FREIGHT = () => {
    const serviceLibRef = useRef(null);
    if (!serviceLibRef.current) {
        serviceLibRef.current = new ServiceLib();
        serviceLibRef.current.loginConfirm();
    }
    const serviceLib = serviceLibRef.current;
    const serviceS0417_MATL_FREIGHTRef = useRef(null);
    if (!serviceS0417_MATL_FREIGHTRef.current) serviceS0417_MATL_FREIGHTRef.current = new ServiceS0417_MATL_FREIGHT();
    const serviceS0417_MATL_FREIGHT = serviceS0417_MATL_FREIGHTRef.current;

    const toast = useRef(null);

    /* splitter 관련 */
    const [styleVal0, setStyleVal0] = useState({
        width: "100rem",
        height: "26rem",
        marginTop: "1rem",
        display: "block",
    });
    const [styleVal1, setStyleVal1] = useState({
        width: "100rem",
        height: "26rem",
        marginTop: "1rem",
        display: "none",
    });

    const [styleVal_1, setStyleVal_1] = useState({
        width: "100rem",
        height: "26rem",
        marginTop: "1rem",
        display: "block",
    });
    const [styleVal_2, setStyleVal_2] = useState({
        width: "100rem",
        height: "26rem",
        marginTop: "1rem",
        display: "none",
    });
    const [styleVal_3, setStyleVal_3] = useState({
        width: "100rem",
        height: "26rem",
        marginTop: "1rem",
        display: "none",
    });
    const [dataHEAD_STR, setDataHEAD_STR] = useState("");

    const [styleVal, setStyleVal] = useState({ width: "65vw" });

    const insert_MATL_FREIGHT = () => {
        var tObj = { ...dataEDT_KSV_PO_MATL_LIST };
        console.log(tObj);

        tObj.CHARGE_KIND = tObj.CHARGE1;
        tObj.CHARGE_CODE = tObj.CHARGE2;
        tObj.GARMENT_COMPO = tObj.GARMENT_COMP;
        tObj.FRT_TYPE = tObj.MATL_TYPE;
        tObj.MATL_TYPE = tObj.PACEL_TYPE;
        tObj.MATL_NAME = tObj.DESC;
        tObj.WEIGHT = tObj.WEIGHT_CBM;
        tObj.PRICE = tObj.PRICE_WON;
        tObj.STYLE_CD = tObj.STYLE_NAME;
        tObj.SPEC = tObj.DESC;
        delete tObj.CHARGE1;
        delete tObj.CHARGE2;
        delete tObj.GARMENT_COMP;
        delete tObj.PACEL_TYPE;
        delete tObj.DESC;
        delete tObj.WEIGHT_CBM;
        delete tObj.PRICE_WON;

        Object.keys(tObj).forEach((col, i) => {
            if (tObj[`${col}`] === null) {
                tObj[`${col}`] = "";
            }
        });

        var tArray = [];
        tArray.push(tObj);

        serviceS0417_MATL_FREIGHT
            .mgrInsert_INSERT_MATL_FREIGHT(tArray)
            .then((data) => {
                if (typeof data.graphQLErrors === "undefined") {
                    toast.current.show({
                        severity: "success",
                        summary: "SUCCEED: Insert matl Freight ",
                        detail: data[0].CODE,
                        life: 3000,
                    });
                } else {
                    console.log(
                        "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                    toast.current.show({
                        severity: "success",
                        summary: "ERROR: Insert matl Freight ",
                        detail: "",
                        life: 3000,
                    });
                }
            });
    };

    const add_EXPRESS = () => {
        var tArray0 = [...selectedTBL_KSV_PO_MATL_LIST];
        var tIdx = 0;
        var tArray = [];
        for (tIdx = 0; tIdx < tArray0.length; tIdx++) {
            var tObj = { ...tArray0[tIdx] };
            Object.keys(tObj).forEach((col, i) => {
                if (tObj[`${col}`] === null) {
                    tObj[`${col}`] = "";
                }
            });
            delete tObj.id;
            delete tObj.__typename;
            tArray.push(tObj);
        }

        var tInput2 = { ...dataEDT_KSV_PO_MATL_LIST1 };
    tInput2.USER_ID = serviceLib.getUserInfo().USER_ID;
        tInput2.AMOUNT = parseFloat(tInput2.AMOUNT);

        serviceS0417_MATL_FREIGHT
            .mgrInsert_ADD_EXPRESS(tArray, tInput2)
            .then((data) => {
                if (typeof data.graphQLErrors === "undefined") {
                    toast.current.show({
                        severity: "success",
                        summary: "SUCCEED: Insert matl Freight ",
                        detail: data[0].CODE,
                        life: 3000,
                    });
                } else {
                    console.log(
                        "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                    toast.current.show({
                        severity: "success",
                        summary: "ERROR: Insert matl Freight ",
                        detail: "",
                        life: 3000,
                    });
                }
            });
    };

    const reset_MATL_FREIGHT = () => {
        datasetEDT_KSV_PO_MATL_LIST(emptyEDT_KSV_PO_MATL_LIST);
    };

    const search_MATL_FREIGHT = () => {
        var _tObj = { ...dataQRY_KSV_PO_MATLLIST };
        if (dataIS_EXPRESS === "1") _tObj.QRY_KIND = "ADP";
        else if (dataIS_DHL === "1") _tObj.QRY_KIND = "DHL";
        else _tObj.QRY_KIND = "";

        serviceS0417_MATL_FREIGHT.mgrQuery_MATL_FREIGHT(_tObj).then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                var tArray = data.map((col, i) => {
                    var tObj = { ...col };
                    tObj.id = i + 1;
                    return tObj;
                });
                console.log("mgrQuery_MATL_FREIGHT:" + tArray.length);
                setDatasTBL_KSV_PO_MATL_LIST(tArray);
            } else {
                console.log(
                    "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });
    };

    const show_FIND_PO = () => {
        setDataFIND_KIND("PO");
        setIsDialogS0417_1(true);
    };
    const show_FIND_ORDER = () => {
        setDataFIND_KIND("ORDER");
        setIsDialogS0417_1(true);
    };
    const search_FIND = () => {
        if (dataFIND_KIND === "PO") {
            search_FIND_PO();
        } else {
            search_FIND_ORDER();
        }
    };

    const search_FIND_PO = () => {
        var _tObj = {};
        _tObj.KIND = "PO";
        _tObj.PO_CD = dataFIND_STR;
        _tObj.ORDER_CD = "";

        serviceS0417_MATL_FREIGHT.mgrQuery_FIND(_tObj).then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                var tArray = data.map((col, i) => {
                    var tObj = { ...col };
                    tObj.id = i + 1;
                    return tObj;
                });
                setDatasTBL_FIND(tArray);
            } else {
                console.log(
                    "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });
    };

    const search_FIND_ORDER = () => {
        var _tObj = {};
        _tObj.KIND = "ORDER";
        _tObj.PO_CD = "";
        _tObj.ORDER_CD = dataFIND_STR;

        serviceS0417_MATL_FREIGHT.mgrQuery_FIND(_tObj).then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                var tArray = data.map((col, i) => {
                    var tObj = { ...col };
                    tObj.id = i + 1;
                    return tObj;
                });
                setDatasTBL_FIND(tArray);
            } else {
                console.log(
                    "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });
    };

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
        let val = (e.value && e.value.USER_ID) || "";

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

    const [datasQRY_KSV_PO_MATLLIST_BL_NO, setDatasQRY_KSV_PO_MATLLIST_BL_NO] =
        useState([]);
    const [dataQRY_KSV_PO_MATLLIST_BL_NO, setDataQRY_KSV_PO_MATLLIST_BL_NO] =
        useState({});

    const onDropdownChangeQRY_KSV_PO_MATLLIST_BL_NO = (e, name) => {
        let val = (e.value && e.value.BL_NO) || "";

        let _dataQRY_KSV_PO_MATLLIST = { ...dataQRY_KSV_PO_MATLLIST };

        let tTypeVal = _dataQRY_KSV_PO_MATLLIST[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_PO_MATLLIST[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_PO_MATLLIST[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_PO_MATLLIST(_dataQRY_KSV_PO_MATLLIST);
        setDataQRY_KSV_PO_MATLLIST_BL_NO(e.value);
    };

    const [
        datasQRY_KSV_PO_MATLLIST_DESTINATION,
        setDatasQRY_KSV_PO_MATLLIST_DESTINATION,
    ] = useState([]);
    const [
        dataQRY_KSV_PO_MATLLIST_DESTINATION,
        setDataQRY_KSV_PO_MATLLIST_DESTINATION,
    ] = useState({});

    const onDropdownChangeQRY_KSV_PO_MATLLIST_DESTINATION = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataQRY_KSV_PO_MATLLIST = { ...dataQRY_KSV_PO_MATLLIST };

        let tTypeVal = _dataQRY_KSV_PO_MATLLIST[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_PO_MATLLIST[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_PO_MATLLIST[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_PO_MATLLIST(_dataQRY_KSV_PO_MATLLIST);
        setDataQRY_KSV_PO_MATLLIST_DESTINATION(e.value);
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

    /* TABLE KSV_PO_MATL_LIST*/
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

        if (dataIS_EXPRESS === "1" || dataIS_DHL === "1") {
            var tObj = { ...dataEDT_KSV_PO_MATL_LIST1 };
            tObj.WEIGHT = argData.WEIGHT;
            setDataEDT_KSV_PO_MATL_LIST1(tObj);
        } else {
            datasetEDT_KSV_PO_MATL_LIST(argData);
        }
    };

    const onRowClickTBL_KSV_PO_MATL_LIST = (event) => {
        let argTBL_KSV_PO_MATL_LIST = event.data;
        if (flagSelectModeTBL_KSV_PO_MATL_LIST) return;

        // Service : NawooAll:mgrQueryTBL_KSV_PO_MATL_LIST
    };

    const searchTBL_KSV_PO_MATL_LIST = () => {
        clearSelectedTBL_KSV_PO_MATL_LIST();

        // serviceS0417_MATL_FREIGHT.mgrQueryTBL_KSV_PO_MATL_LIST(dataQRY_).then(data => {
        //     if (typeof data.graphQLErrors === 'undefined') {
        //         console.log("ServiceNawooAll.mgrQueryTBL_KSV_PO_MATL_LIST() call => " + data.length);
        //         setDatasTBL_KSV_PO_MATL_LIST(data);
        //     } else {
        //         // var tStr = data.graphQLErrors[0].message;
        //         console.log("ServiceNawooAll.mgrQueryTBL_KSV_PO_MATL_LIST()error => " + JSON.stringify(data.graphQLErrors));
        //
        //     }
        // });

        // Service : NawooAll:mgrQueryTBL_KSV_PO_MATL_LIST
    };

    const clearSelectedTBL_KSV_PO_MATL_LIST = () => {
        setSelectedTBL_KSV_PO_MATL_LIST([]);
        setFlagSelectModeTBL_KSV_PO_MATL_LIST(false);
    };

    const exportExcelTBL_KSV_PO_MATL_LIST = () => {};

    /**EDIT KSV_PO_MATL_LIST */

    const [dataIS_EXPRESS, setDataIS_EXPRESS] = useState("0");
    const [dataIS_DHL, setDataIS_DHL] = useState("0");

    const onCheckboxChangeIS_EXPRESS = (e, name) => {
        let val = "";
        if (e.checked) {
            val = "1";
            setStyleVal_1(styleVal1);
            setStyleVal_2(styleVal0);
            setDataHEAD_STR("Add Express");
        } else {
            val = "0";
            setStyleVal_1(styleVal0);
            setStyleVal_2(styleVal1);
            setDataHEAD_STR("");
        }
        setDataIS_EXPRESS(val);
    };

    const onCheckboxChangeIS_DHL = (e, name) => {
        let val = "";
        if (e.checked) {
            val = "1";
            setStyleVal_1(styleVal1);
            setStyleVal_2(styleVal0);
            setDataHEAD_STR("Add DHL");
        } else {
            val = "0";
            setStyleVal_1(styleVal0);
            setStyleVal_2(styleVal1);
            setDataHEAD_STR("");
        }
        setDataIS_DHL(val);
    };

    const [datasEDT_KSV_PO_MATL_LIST, setDatasEDT_KSV_PO_MATL_LIST] = useState(
        [],
    );
    const [dataEDT_KSV_PO_MATL_LIST, setDataEDT_KSV_PO_MATL_LIST] = useState(
        emptyEDT_KSV_PO_MATL_LIST,
    );

    const datasetEDT_KSV_PO_MATL_LIST = (argData) => {
        var _argData = { ...dataEDT_KSV_PO_MATL_LIST };
        _argData.FRT_DATE = argData.FRT_DATE;
        _argData.TRADE_TYPE = argData.TRADE_TYPE;
        _argData.AREA_TYPE = argData.AREA_TYPE;
        _argData.MATL_TYPE = argData.FRT_TYPE;
        _argData.PACEL_TYPE = argData.MATL_TYPE;
        _argData.REG_USER = argData.REG_USER;
        _argData.DEPARTURE = argData.DEPARTURE;
        _argData.DESTINATION = argData.DESTINATION;
        _argData.IS_COST = argData.IS_COST;
        _argData.SENDER = argData.SENDER;
        _argData.RECEIVER = argData.RECEIVER;
        _argData.BUYER_CD = argData.BUYER_CD;
        _argData.DELAY_REASON = argData.DELAY_REASON;
        _argData.NET = argData.NET;
        _argData.VAT = argData.VAT;
        _argData.AMOUNT = argData.AMOUNT;
        _argData.CURR_CD = argData.CURR_CD;
        _argData.MW = argData.MW;
        _argData.CHARGE1 = argData.CHARGE_KIND;
        _argData.CHARGE2 = argData.CHARGE_CODE;
        _argData.WEIGHT_CBM = argData.WEIGHT;
        _argData.WEIGHT_NET = argData.WEIGHT_NET;
        _argData.DESC = argData.MATL_NAME;
        _argData.BL_NO = argData.BL_NO;
        _argData.GARMENT_COMP = argData.GARMENT_COMPO;
        _argData.INVOICE_NO = argData.INVOICE_NO;
        _argData.REMARK = argData.REMARK;
        _argData.PO_CD = argData.PO_CD;
        _argData.ORDER_CD = argData.ORDER_CD;
        _argData.UNIT = argData.UNIT;
        _argData.PRICE_WON = argData.PRICE;
        _argData.QTY = argData.QTY;
        _argData.MATL_CD = argData.MATL_CD;
        _argData.STYLE_NAME = argData.STYLE_NAME;
        // _argData.AIR_CHARAGE = argData.AIR_CHARAGE;
        // _argData.EXPRESS_CHARAGE = argData.EXPRESS_CHARAGE;

        setDataEDT_KSV_PO_MATL_LIST(_argData);

        var data = { ...argData };

        editEDT_KSV_PO_MATL_LIST_TRADE_TYPE(data.TRADE_TYPE);
        editEDT_KSV_PO_MATL_LIST_AREA_TYPE(data.AREA_TYPE);
        editEDT_KSV_PO_MATL_LIST_MATL_TYPE(data.FRT_TYPE);
        editEDT_KSV_PO_MATL_LIST_PACEL_TYPE(data.MATL_TYPE);
        editEDT_KSV_PO_MATL_LIST_DEPARTURE(data.DEPARTURE);
        editEDT_KSV_PO_MATL_LIST_DESTINATION(data.DESTINATION);
        editEDT_KSV_PO_MATL_LIST_SENDER(data.SENDER);
        editEDT_KSV_PO_MATL_LIST_RECEIVER(data.RECEIVER);
        editEDT_KSV_PO_MATL_LIST_BUYER_CD(data.BUYER_CD);
        editEDT_KSV_PO_MATL_LIST_DELAY_REASON(data.DELAY_REASON);
        editEDT_KSV_PO_MATL_LIST_CURR_CD(data.CURR_CD);
        editEDT_KSV_PO_MATL_LIST_MW(data.MW);
        editEDT_KSV_PO_MATL_LIST_CHARGE1(data.CHARGE_KIND);
        // setDatasEDT_KSV_PO_MATL_LIST_CHARGE2([]);
    };

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
        datasEDT_KSV_PO_MATL_LIST_BUYER_TEAM,
        setDatasEDT_KSV_PO_MATL_LIST_BUYER_TEAM,
    ] = useState([]);
    const [
        datasEDT_KSV_PO_MATL_LIST_FACTORY_CD,
        setDatasEDT_KSV_PO_MATL_LIST_FACTORY_CD,
    ] = useState([]);
    const [
        datasEDT_KSV_PO_MATL_LIST_VENDOR_CD,
        setDatasEDT_KSV_PO_MATL_LIST_VENDOR_CD,
    ] = useState([]);

    const [
        datasEDT_KSV_PO_MATL_LIST_TRADE_TYPE,
        setDatasEDT_KSV_PO_MATL_LIST_TRADE_TYPE,
    ] = useState([]);
    const [
        dataEDT_KSV_PO_MATL_LIST_TRADE_TYPE,
        setDataEDT_KSV_PO_MATL_LIST_TRADE_TYPE,
    ] = useState({});

    const editEDT_KSV_PO_MATL_LIST_TRADE_TYPE = (argValue) => {
        let _dataEDT_KSV_PO_MATL_LIST_TRADE_TYPE =
            datasEDT_KSV_PO_MATL_LIST_TRADE_TYPE.filter(
                (val) => val.CD_CODE === argValue,
            );
        setDataEDT_KSV_PO_MATL_LIST_TRADE_TYPE(
            _dataEDT_KSV_PO_MATL_LIST_TRADE_TYPE[0],
        );
    };

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

    const editEDT_KSV_PO_MATL_LIST_AREA_TYPE = (argValue) => {
        let _dataEDT_KSV_PO_MATL_LIST_AREA_TYPE =
            datasEDT_KSV_PO_MATL_LIST_AREA_TYPE.filter(
                (val) => val.CD_CODE === argValue,
            );
        setDataEDT_KSV_PO_MATL_LIST_AREA_TYPE(
            _dataEDT_KSV_PO_MATL_LIST_AREA_TYPE[0],
        );
    };

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

    const editEDT_KSV_PO_MATL_LIST_MATL_TYPE = (argValue) => {
        let _dataEDT_KSV_PO_MATL_LIST_MATL_TYPE =
            datasEDT_KSV_PO_MATL_LIST_MATL_TYPE.filter(
                (val) => val.CD_CODE === argValue,
            );
        setDataEDT_KSV_PO_MATL_LIST_MATL_TYPE(
            _dataEDT_KSV_PO_MATL_LIST_MATL_TYPE[0],
        );
    };

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

    const editEDT_KSV_PO_MATL_LIST_PACEL_TYPE = (argValue) => {
        let _dataEDT_KSV_PO_MATL_LIST_PACEL_TYPE =
            datasEDT_KSV_PO_MATL_LIST_PACEL_TYPE.filter(
                (val) => val.CD_CODE === argValue,
            );
        setDataEDT_KSV_PO_MATL_LIST_PACEL_TYPE(
            _dataEDT_KSV_PO_MATL_LIST_PACEL_TYPE[0],
        );
    };

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

    const editEDT_KSV_PO_MATL_LIST_DEPARTURE = (argValue) => {
        let _dataEDT_KSV_PO_MATL_LIST_DEPARTURE =
            datasEDT_KSV_PO_MATL_LIST_DEPARTURE.filter(
                (val) => val.CD_CODE === argValue,
            );
        setDataEDT_KSV_PO_MATL_LIST_DEPARTURE(
            _dataEDT_KSV_PO_MATL_LIST_DEPARTURE[0],
        );
    };

    const onDropdownChangeEDT_KSV_PO_MATL_LIST_DEPARTURE = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

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

    const editEDT_KSV_PO_MATL_LIST_DESTINATION = (argValue) => {
        let _dataEDT_KSV_PO_MATL_LIST_DESTINATION =
            datasEDT_KSV_PO_MATL_LIST_DESTINATION.filter(
                (val) => val.CD_CODE === argValue,
            );
        setDataEDT_KSV_PO_MATL_LIST_DESTINATION(
            _dataEDT_KSV_PO_MATL_LIST_DESTINATION[0],
        );
    };

    const onDropdownChangeEDT_KSV_PO_MATL_LIST_DESTINATION = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

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

    const editEDT_KSV_PO_MATL_LIST_SENDER = (argValue) => {
        let _dataEDT_KSV_PO_MATL_LIST_SENDER =
            datasEDT_KSV_PO_MATL_LIST_SENDER.filter(
                (val) => val.USER_ID === argValue,
            );
        setDataEDT_KSV_PO_MATL_LIST_SENDER(_dataEDT_KSV_PO_MATL_LIST_SENDER[0]);
    };

    const onDropdownChangeEDT_KSV_PO_MATL_LIST_SENDER = (e, name) => {
        let val = (e.value && e.value.USER_ID) || "";

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

    const editEDT_KSV_PO_MATL_LIST_RECEIVER = (argValue) => {
        let _dataEDT_KSV_PO_MATL_LIST_RECEIVER =
            datasEDT_KSV_PO_MATL_LIST_RECEIVER.filter(
                (val) => val.RECEIVER_ID === argValue,
            );
        setDataEDT_KSV_PO_MATL_LIST_RECEIVER(
            _dataEDT_KSV_PO_MATL_LIST_RECEIVER[0],
        );
    };

    const onDropdownChangeEDT_KSV_PO_MATL_LIST_RECEIVER = (e, name) => {
        let val = (e.value && e.value.RECEIVER_ID) || "";

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

    const editEDT_KSV_PO_MATL_LIST_BUYER_CD = (argValue) => {
        let _dataEDT_KSV_PO_MATL_LIST_BUYER_CD =
            datasEDT_KSV_PO_MATL_LIST_BUYER_CD.filter(
                (val) => val.BUYER_CD === argValue,
            );
        setDataEDT_KSV_PO_MATL_LIST_BUYER_CD(
            _dataEDT_KSV_PO_MATL_LIST_BUYER_CD[0],
        );
    };

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

    const editEDT_KSV_PO_MATL_LIST_DELAY_REASON = (argValue) => {
        let _dataEDT_KSV_PO_MATL_LIST_DELAY_REASON =
            datasEDT_KSV_PO_MATL_LIST_DELAY_REASON.filter(
                (val) => val.CD_CODE === argValue,
            );
        setDataEDT_KSV_PO_MATL_LIST_DELAY_REASON(
            _dataEDT_KSV_PO_MATL_LIST_DELAY_REASON[0],
        );
    };

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

    const editEDT_KSV_PO_MATL_LIST_CURR_CD = (argValue) => {
        let _dataEDT_KSV_PO_MATL_LIST_CURR_CD =
            datasEDT_KSV_PO_MATL_LIST_CURR_CD.filter(
                (val) => val.CD_CODE === argValue,
            );
        setDataEDT_KSV_PO_MATL_LIST_CURR_CD(
            _dataEDT_KSV_PO_MATL_LIST_CURR_CD[0],
        );
    };

    const onDropdownChangeEDT_KSV_PO_MATL_LIST_CURR_CD = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

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

    const editEDT_KSV_PO_MATL_LIST_MW = (argValue) => {
        let _dataEDT_KSV_PO_MATL_LIST_MW = datasEDT_KSV_PO_MATL_LIST_MW.filter(
            (val) => val.CD_CODE === argValue,
        );
        setDataEDT_KSV_PO_MATL_LIST_MW(_dataEDT_KSV_PO_MATL_LIST_MW[0]);
    };

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

    const editEDT_KSV_PO_MATL_LIST_CHARGE1 = (argValue) => {
        let _dataEDT_KSV_PO_MATL_LIST_CHARGE1 =
            datasEDT_KSV_PO_MATL_LIST_CHARGE1.filter(
                (val) => val.CD_CODE === argValue,
            );
        setDataEDT_KSV_PO_MATL_LIST_CHARGE1(
            _dataEDT_KSV_PO_MATL_LIST_CHARGE1[0],
        );
    };

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

        if (val === "1") {
            var tArray = datasEDT_KSV_PO_MATL_LIST_BUYER_CD.map((col, i) => {
                var tObj = { ...col };
                tObj.CD_CODE = col.BUYER_CD;
                tObj.CD_NAME = col.BUYER_NAME;
                return tObj;
            });
            setDatasEDT_KSV_PO_MATL_LIST_CHARGE2(tArray);
            setDataEDT_KSV_PO_MATL_LIST_CHARGE2(tArray[0]);
        }
        if (val === "2") {
            var tArray = datasEDT_KSV_PO_MATL_LIST_VENDOR_CD.map((col, i) => {
                var tObj = { ...col };
                tObj.CD_CODE = col.VENDOR_CD;
                tObj.CD_NAME = col.VENDOR_NAME;
                return tObj;
            });
            setDatasEDT_KSV_PO_MATL_LIST_CHARGE2(tArray);
            setDataEDT_KSV_PO_MATL_LIST_CHARGE2(tArray[0]);
        }
        if (val === "3") {
            var tArray = datasEDT_KSV_PO_MATL_LIST_BUYER_TEAM.map((col, i) => {
                var tObj = { ...col };
                tObj.CD_CODE = col.CD_CODE;
                tObj.CD_NAME = col.CD_NAME;
                return tObj;
            });
            setDatasEDT_KSV_PO_MATL_LIST_CHARGE2(tArray);
            setDataEDT_KSV_PO_MATL_LIST_CHARGE2(tArray[0]);
        }
        if (val === "4") {
            var tArray = datasEDT_KSV_PO_MATL_LIST_FACTORY_CD.map((col, i) => {
                var tObj = { ...col };
                tObj.CD_CODE = col.FACTORY_CD;
                tObj.CD_NAME = col.FACTORY_NAME;
                return tObj;
            });
            setDatasEDT_KSV_PO_MATL_LIST_CHARGE2(tArray);
            setDataEDT_KSV_PO_MATL_LIST_CHARGE2(tArray[0]);
        }
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

    useEffect(() => {
        var _tObj = {};
        _tObj.INVOICE_NO = "";

        serviceS0417_MATL_FREIGHT.mgrQuery_CODE(_tObj).then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                console.log(
                    "ServiceMgrKCD_BUYER.mgr1KcdStyle call => " +
                        data.CURR_CD.length,
                );

                setDatasQRY_KSV_PO_MATLLIST_FRT_TYPE(data.FRT_TYPE);
                setDataQRY_KSV_PO_MATLLIST_FRT_TYPE(data.FRT_TYPE[0]);

                setDatasQRY_KSV_PO_MATLLIST_SENDER(data.SENDER);
                setDataQRY_KSV_PO_MATLLIST_SENDER(data.SENDER[0]);

                setDatasQRY_KSV_PO_MATLLIST_BL_NO(data.BL_NO);
                setDataQRY_KSV_PO_MATLLIST_BL_NO(data.BL_NO[0]);

                setDatasQRY_KSV_PO_MATLLIST_DESTINATION(data.DESTINATION);
                setDataQRY_KSV_PO_MATLLIST_DESTINATION(data.DESTINATION[0]);

                setDatasQRY_KSV_PO_MATLLIST_VENDOR_CD(data.VENDOR_CD);
                setDataQRY_KSV_PO_MATLLIST_VENDOR_CD(data.VENDOR_CD[0]);

                setDatasQRY_KSV_PO_MATLLIST_USER_ID(data.SENDER);
                setDataQRY_KSV_PO_MATLLIST_USER_ID(data.SENDER[0]);

                setDatasQRY_KSV_PO_MATLLIST_BL_TYPE(data.BL_TYPE);
                setDataQRY_KSV_PO_MATLLIST_BL_TYPE(data.BL_TYPE[0]);

                setDatasEDT_KSV_PO_MATL_LIST_TRADE_TYPE(data.TRADE_TYPE);
                setDataEDT_KSV_PO_MATL_LIST_TRADE_TYPE(data.TRADE_TYPE[0]);

                setDatasEDT_KSV_PO_MATL_LIST_AREA_TYPE(data.AREA_TYPE);
                setDataEDT_KSV_PO_MATL_LIST_AREA_TYPE(data.AREA_TYPE[0]);

                setDatasEDT_KSV_PO_MATL_LIST_MATL_TYPE(data.FRT_TYPE);
                setDataEDT_KSV_PO_MATL_LIST_MATL_TYPE(data.FRT_TYPE[0]);

                setDatasEDT_KSV_PO_MATL_LIST_PACEL_TYPE(data.PARCEL_TYPE);
                setDataEDT_KSV_PO_MATL_LIST_PACEL_TYPE(data.PARCEL_TYPE[0]);

                setDatasEDT_KSV_PO_MATL_LIST_DEPARTURE(data.DEPARTURE);
                setDataEDT_KSV_PO_MATL_LIST_DEPARTURE(data.DEPARTURE[0]);

                setDatasEDT_KSV_PO_MATL_LIST_DESTINATION(data.DESTINATION);
                setDataEDT_KSV_PO_MATL_LIST_DESTINATION(data.DESTINATION[0]);

                setDatasEDT_KSV_PO_MATL_LIST_SENDER(data.SENDER);
                setDataEDT_KSV_PO_MATL_LIST_SENDER(data.SENDER[0]);

                setDatasEDT_KSV_PO_MATL_LIST_RECEIVER(data.RECEIVER);
                setDataEDT_KSV_PO_MATL_LIST_RECEIVER(data.RECEIVER[0]);

                setDatasEDT_KSV_PO_MATL_LIST_BUYER_CD(data.BUYER_CD);
                setDataEDT_KSV_PO_MATL_LIST_BUYER_CD(data.BUYER_CD[0]);

                setDatasEDT_KSV_PO_MATL_LIST_DELAY_REASON(data.DELAY_REASON);
                setDataEDT_KSV_PO_MATL_LIST_DELAY_REASON(data.DELAY_REASON[0]);

                setDatasEDT_KSV_PO_MATL_LIST_CURR_CD(data.CURR_CD);
                setDataEDT_KSV_PO_MATL_LIST_CURR_CD(data.CURR_CD[0]);

                setDatasEDT_KSV_PO_MATL_LIST_MW(data.MW);
                setDataEDT_KSV_PO_MATL_LIST_MW(data.MW[0]);

                setDatasEDT_KSV_PO_MATL_LIST_CHARGE1(data.CHARGE_KIND);
                setDataEDT_KSV_PO_MATL_LIST_CHARGE1(data.CHARGE_KIND[0]);

                setDatasEDT_KSV_PO_MATL_LIST_CHARGE2([]);

                setDatasEDT_KSV_PO_MATL_LIST_FACTORY_CD(data.FACTORY_CD);
                setDatasEDT_KSV_PO_MATL_LIST_BUYER_TEAM(data.BUYER_TEAM);
                setDatasEDT_KSV_PO_MATL_LIST_VENDOR_CD(data.VENDOR_CD);

                var _argData = { ...dataEDT_KSV_PO_MATL_LIST };
                _argData.AIR_CHARAGE = data.AIR_CHARGE[0].CD_CODE;
                _argData.EXPRESS_CHARAGE = data.EXPRESS_CHARGE[0].CD_CODE;
                setDataEDT_KSV_PO_MATL_LIST(_argData);
            } else {
                console.log(
                    "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });
    }, []);

    const blankFn = () => {};

    // EDT2
    const [datasEDT_KSV_PO_MATL_LIST1, setDatasEDT_KSV_PO_MATL_LIST1] =
        useState([]);
    const [dataEDT_KSV_PO_MATL_LIST1, setDataEDT_KSV_PO_MATL_LIST1] = useState(
        emptyEDT_KSV_PO_MATL_LIST1,
    );

    const onCalChangeEDT_KSV_PO_MATL_LIST1_FRT_DATE = (e, name) => {
        let val1 = e.value || "";
        let val = "";
        if (val1 === "") {
            val = "";
        } else {
            val = getDateVal(val1);
        }

        let _dataEDT_KSV_PO_MATL_LIST1 = { ...dataEDT_KSV_PO_MATL_LIST1 };
        _dataEDT_KSV_PO_MATL_LIST1[`${name}`] = val;
        setDataEDT_KSV_PO_MATL_LIST1(_dataEDT_KSV_PO_MATL_LIST1);
    };

    const onInputChangeEDT_KSV_PO_MATL_LIST1_BL_NO = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_PO_MATL_LIST1 = { ...dataEDT_KSV_PO_MATL_LIST1 };

        let tTypeVal = _dataEDT_KSV_PO_MATL_LIST1[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_PO_MATL_LIST1[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_PO_MATL_LIST1[`${name}`] = parseInt(val);

        setDataEDT_KSV_PO_MATL_LIST1(_dataEDT_KSV_PO_MATL_LIST1);
    };

    const onInputChangeEDT_KSV_PO_MATL_LIST1_AMOUNT = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_PO_MATL_LIST1 = { ...dataEDT_KSV_PO_MATL_LIST1 };

        let tTypeVal = _dataEDT_KSV_PO_MATL_LIST1[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_PO_MATL_LIST1[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_PO_MATL_LIST1[`${name}`] = parseInt(val);

        setDataEDT_KSV_PO_MATL_LIST1(_dataEDT_KSV_PO_MATL_LIST1);
    };

    const onInputChangeEDT_KSV_PO_MATL_LIST1_WEIGHT = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_PO_MATL_LIST1 = { ...dataEDT_KSV_PO_MATL_LIST1 };

        let tTypeVal = _dataEDT_KSV_PO_MATL_LIST1[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_PO_MATL_LIST1[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_PO_MATL_LIST1[`${name}`] = parseInt(val);

        setDataEDT_KSV_PO_MATL_LIST1(_dataEDT_KSV_PO_MATL_LIST1);
    };

    const onCalChangeEDT_KSV_PO_MATL_LIST1_ETA = (e, name) => {
        let val1 = e.value || "";
        let val = "";
        if (val1 === "") {
            val = "";
        } else {
            val = getDateVal(val1);
        }

        let _dataEDT_KSV_PO_MATL_LIST1 = { ...dataEDT_KSV_PO_MATL_LIST1 };
        _dataEDT_KSV_PO_MATL_LIST1[`${name}`] = val;
        setDataEDT_KSV_PO_MATL_LIST1(_dataEDT_KSV_PO_MATL_LIST1);
    };

    // Dialog
    const [isDialogS0417_1, setIsDialogS0417_1] = useState(false);
    const [dataFIND_STR, setDataFIND_STR] = useState("");
    const [dataFIND_KIND, setDataFIND_KIND] = useState("");

    const onHideDialogS0417_1 = () => {
        setIsDialogS0417_1(false);
    };

    const onInputChangeFIND_STR = (e, name) => {
        let val = (e.target && e.target.value) || "";
        setDataFIND_STR(val);
    };

    const [datasTBL_FIND, setDatasTBL_FIND] = useState([]);
    const dt_TBL_FIND = useRef(null);
    const [dataTBL_FIND, setDataTBL_FIND] = useState({});
    const [selectedTBL_FIND, setSelectedTBL_FIND] = useState([]);
    const [flagSelectModeTBL_TBL, setFlagSelectModeTBL_FIND] = useState(false);

    const onRowClick1TBL_FIND = (argData0) => {
        var argData = {};

        if (typeof argData0.length !== "undefined") {
            argData = argData0[0];
        } else {
            argData = argData0;
        }

        let argTBL_FIND = argData;
        setDataTBL_FIND(argTBL_FIND);

        if (dataFIND_KIND === "PO") {
            var _tObj = { ...dataEDT_KSV_PO_MATL_LIST };
            _tObj.PO_CD = argData.COL1;
            _tObj.BUYER_CD = argData.COL2;
            _tObj.CHARGE2 = argData.COL3;
            setDataEDT_KSV_PO_MATL_LIST(_tObj);

            editEDT_KSV_PO_MATL_LIST_BUYER_CD(argData.COL2);
        } else if (dataFIND_KIND === "PO") {
            var _tObj = { ...dataEDT_KSV_PO_MATL_LIST };
            _tObj.ORDER_CD = argData.COL1;
            setDataEDT_KSV_PO_MATL_LIST(_tObj);
        }
    };
    const onRowClickTBL_FIND = (event) => {
        let argTBL_FIND = event.data;
        // if (flagSelectModeTBL_FIND) return;
    };

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
                    height: "7rem",
                }}
            >
                <span
                    style={{
                        marginLeft: "0.5rem",
                        height: "2rem",
                        display: "inline-block",
                        width: "22rem",
                    }}
                >
                    <p style={{ width: "8rem", display: "inline-block" }}>Freigth Date</p>
                    <div
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "13rem",
                        }}
                    >
                        <Calendar
                            showButtonBar
                            dateFormat="yy-mm-dd"
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
                        width: "15rem",
                    }}
                >
                    <p style={{ width: "1rem", display: "inline-block" }}>~</p>
                    <div
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "13rem",
                        }}
                    >
                        <Calendar
                            showButtonBar
                            dateFormat="yy-mm-dd"
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
                        width: "14rem",
                    }}
                >
                    {/* <p style={{ width: '8rem', display: 'inline-block' }}> . </p> */}
                    <div
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "13rem",
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
                        width: "14rem",
                    }}
                >
                    {/* <p style={{ width: '8rem', display: 'inline-block' }}> . </p> */}
                    <div
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "13rem",
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
                            optionLabel="USER_ID"
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
                        width: "14rem",
                    }}
                >
                    {/* <p style={{ width: '8rem', display: 'inline-block' }}> . </p> */}
                    <div
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "13rem",
                        }}
                    >
                        <Dropdown
                            id="id_QRY_KIND"
                            value={dataQRY_KSV_PO_MATLLIST_BL_NO}
                            onChange={(e) =>
                                onDropdownChangeQRY_KSV_PO_MATLLIST_BL_NO(
                                    e,
                                    "BL_NO",
                                )
                            }
                            options={datasQRY_KSV_PO_MATLLIST_BL_NO}
                            optionLabel="BL_NO"
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
                    <p style={{ width: "8rem", display: "inline-block" }}>Destination</p>
                    <div
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "18rem",
                        }}
                    >
                        <Dropdown
                            id="id_RECEIVER"
                            value={dataQRY_KSV_PO_MATLLIST_DESTINATION}
                            onChange={(e) =>
                                onDropdownChangeQRY_KSV_PO_MATLLIST_DESTINATION(
                                    e,
                                    "DESTINATION",
                                )
                            }
                            options={datasQRY_KSV_PO_MATLLIST_DESTINATION}
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
                    <p style={{ width: "8rem", display: "inline-block" }}>Supplier</p>
                    <div
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "18rem",
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
                        width: "28rem",
                    }}
                >
                    <p style={{ width: "8rem", display: "inline-block" }}>User ID</p>
                    <div
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "18rem",
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
                        width: "20rem",
                    }}
                >
                    <p style={{ width: "8rem", display: "inline-block" }}>PO</p>
                    <InputText
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "10rem",
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
                        width: "23rem",
                    }}
                >
                    <p style={{ width: "8rem", display: "inline-block" }}>Buyer</p>
                    <InputText
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "13rem",
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
                        width: "17rem",
                    }}
                >
                    <p style={{ width: "8rem", display: "inline-block" }}>BL</p>
                    <div
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "8rem",
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
                        width: "20rem",
                    }}
                >
                    <p style={{ width: "8rem", display: "inline-block" }}>Invoice</p>
                    <InputText
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "10rem",
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
            <div
                style={{ width: "100rem", height: "2rem", marginLeft: "40rem" }}
            >
                <span className="block mt-2 md:mt-0 p-input-icon-left">
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
                        onClick={search_MATL_FREIGHT}
                    />

                    <Button
                        label="Freight(Daily)"
                        className="p-button-text"
                        onClick={exportExcelTBL_KSV_PO_MATL_LIST}
                    />

                    <Button
                        label="Third Freight(Daily)"
                        className="p-button-text"
                        onClick={searchTBL_KSV_PO_MATL_LIST}
                    />

                    <Button
                        label="Freight(Monthly)"
                        className="p-button-text"
                        onClick={exportExcelTBL_KSV_PO_MATL_LIST}
                    />

                    <Button
                        label="Freight(User)"
                        className="p-button-text"
                        onClick={searchTBL_KSV_PO_MATL_LIST}
                    />
                    <Button
                        label="전자결재"
                        className="p-button-text"
                        onClick={exportExcelTBL_KSV_PO_MATL_LIST}
                    />
                    <Button
                        label="Excel"
                        className="p-button-text green"
                        onClick={exportExcelTBL_KSV_PO_MATL_LIST}
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
                    virtualScrollerOptions={{ itemSize: 10 }}
                    emptyMessage=" " //header={headerTBL_KSV_PO_MATL_LIST}
                    responsiveLayout="scroll"
                    scrollable
                    scrollHeight="21rem"
                >
                    <AFColumn field="FRT_DATE" headerClassName="t-header" header="Frt Date" style={{ width: "8rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="TRADE_TYPE_N" headerClassName="t-header" header="Trade Tyoe" style={{ width: "8rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="COL" headerClassName="t-header" header="OK" style={{ width: "5rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="CONFIRM_CHECK" headerClassName="t-header" header="OK" style={{ width: "5rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="DEPARTURE_N" headerClassName="t-header" header="Departure" style={{ width: "14rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="DESTINATION_N" headerClassName="t-header" header="Destination" style={{ width: "14rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="SENDER" headerClassName="t-header" header="Sender" style={{ width: "7rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="RECEIVER" headerClassName="t-header" header="Receiver" style={{ width: "7rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="BUYER_CD" headerClassName="t-header" header="Buyer" style={{ width: "7rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="PO_CD" headerClassName="t-header" header="PO" style={{ width: "8rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="ORDER_CD" headerClassName="t-header" header="Order" style={{ width: "8rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="SPEC" headerClassName="t-header" header="Spec" style={{ width: "8rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="QTY" headerClassName="t-header" header="Qty" style={{ width: "5rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="WEIGHT" headerClassName="t-header" header="Weight" style={{ width: "5rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="AMOUNT" headerClassName="t-header" header="Amount" style={{ width: "5rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="CURR_CD" headerClassName="t-header" header="Curr" style={{ width: "5rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="DELAY_REASON_N" headerClassName="t-header" header="Reason" style={{ width: "8rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="FRT_TYPE_N" headerClassName="t-header" header="Frt Type" style={{ width: "8rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="AREA_TYPE_N" headerClassName="t-header" header="Area Type" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="PARCEL_TYPE_N" headerClassName="t-header" header="Parcel Type" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="BL_NO" headerClassName="t-header" header="BL No" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="REMARK" headerClassName="t-header" header="Remark" style={{ width: "15rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="STYLE_NAME" headerClassName="t-header" header="Style" style={{ width: "15rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="MATL_CD" headerClassName="t-header" header="Matl Cd" style={{ width: "8rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="WEIGHT_NET" headerClassName="t-header" header="Weight Net" style={{ width: "8rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="NET" headerClassName="t-header" header="Net" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="VAT" headerClassName="t-header" header="VAT" style={{ width: "4rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="ADP_CHECK" headerClassName="t-header" header="ADP Check" style={{ width: "8rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="INVOICE_NO" headerClassName="t-header" header="Invoice No" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="CHARGE_KIND" headerClassName="t-header" header="Charge Kind" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="cHARGE_CODE" headerClassName="t-header" header="Charge Code" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="REG_USER" headerClassName="t-header" header="Reg User" style={{ width: "7rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="REG_DATETIME" headerClassName="t-header" header="Reg DateTime" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="TRADE_TYPE" headerClassName="t-header" header="Trade Type" style={{ width: "8rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="DESTINATION" headerClassName="t-header" header="Trade Type" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="FRT_TYPE" headerClassName="t-header" header="Frt Type" style={{ width: "8rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="AREA_TYPE" headerClassName="t-header" header="Area Type" style={{ width: "8rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="MATL_TYPE" headerClassName="t-header" header="Matl Type" style={{ width: "8rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="UNIT" headerClassName="t-header" header="Unit" style={{ width: "5rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="PRICE" headerClassName="t-header" header="Price" style={{ width: "5rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="MW" headerClassName="t-header" header="MW" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="GARMENT_COMPO" headerClassName="t-header" header="Garment Comp" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="PO_SEQ" headerClassName="t-header" header="Po Seq" style={{ width: "6rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="MRP_SEQ" headerClassName="t-header" header="Mrp Seq" style={{ width: "6rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="IN_DATETIME" headerClassName="t-header" header="In DateTime" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="MATL_NAME" headerClassName="t-header" header="Matl Name" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="COLOR" headerClassName="t-header" header="Color" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="FRT_IDX" headerClassName="t-header" header="Frt Idx" style={{ width: "8rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                </AFDataTable>
            </div>

            <Divider />

            <div style={styleVal_2}>
                <div>
                    <div style={{ width: "100rem", height: "15rem" }}>
                        <span
                            style={{
                                marginLeft: "0.5rem",
                                height: "2rem",
                                display: "inline-block",
                                width: "17rem",
                            }}
                        >
                            <p style={{ width: "8rem", display: "inline-block", }}>*Frt Date</p>
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
                                    id="id_FRT_DATE"
                                    value={changeDateVal(
                                        dataEDT_KSV_PO_MATL_LIST1.FRT_DATE,
                                    )}
                                    onChange={(e) =>
                                        onCalChangeEDT_KSV_PO_MATL_LIST1_FRT_DATE(
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
                                width: "30rem",
                            }}
                        >
                            <p style={{ width: "5rem", display: "inline-block", }}>Bl No</p>
                            <InputText
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "23rem",
                                }}
                                id="id_AMOUNT"
                                value={dataEDT_KSV_PO_MATL_LIST1.BL_NO}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_PO_MATL_LIST1_BL_NO(
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
                                width: "14rem",
                            }}
                        >
                            <p style={{ width: "5rem", display: "inline-block", }}>Amount</p>
                            <InputText
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "8rem",
                                }}
                                id="id_AMOUNT"
                                value={dataEDT_KSV_PO_MATL_LIST1.AMOUNT}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_PO_MATL_LIST1_AMOUNT(
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
                                width: "14rem",
                            }}
                        >
                            <p style={{ width: "5rem", display: "inline-block", }}>Weight</p>
                            <InputText
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "8rem",
                                }}
                                id="id_AMOUNT"
                                value={dataEDT_KSV_PO_MATL_LIST1.WEIGHT}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_PO_MATL_LIST1_WEIGHT(
                                        e,
                                        "WEIGHT",
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
                            <p style={{ width: "8rem", display: "inline-block", }}>ETA</p>
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
                                    id="id_FRT_DATE"
                                    value={changeDateVal(
                                        dataEDT_KSV_PO_MATL_LIST1.ETA,
                                    )}
                                    onChange={(e) =>
                                        onCalChangeEDT_KSV_PO_MATL_LIST1_ETA(
                                            e,
                                            "ETA",
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
                            <Button
                                label={dataHEAD_STR}
                                style={{
                                    display: "inline-block",
                                    marginLeft: "11rem",
                                }}
                                className="p-button-text"
                                onClick={add_EXPRESS}
                            />
                        </span>
                    </div>
                </div>
            </div>
            <div style={styleVal_1}>
                <div>
                    <div style={{ width: "100rem", height: "15rem" }}>
                        <span
                            style={{
                                marginLeft: "0.5rem",
                                height: "2rem",
                                display: "inline-block",
                                width: "17rem",
                            }}
                        >
                            <p style={{ width: "8rem", display: "inline-block", }}>*Frt Date</p>
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
                                width: "9rem",
                            }}
                        >
                            {/* <p style={{ width: '8rem', display: 'inline-block' }}> . </p> */}
                            <div
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "8rem",
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
                                width: "9rem",
                            }}
                        >
                            {/* <p style={{ width: '8rem', display: 'inline-block' }}> . </p> */}
                            <div
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "8rem",
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
                                width: "9rem",
                            }}
                        >
                            {/* <p style={{ width: '8rem', display: 'inline-block' }}> . </p> */}
                            <div
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "8rem",
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
                                width: "9rem",
                            }}
                        >
                            {/* <p style={{ width: '8rem', display: 'inline-block' }}> . </p> */}
                            <div
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "8rem",
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
                                width: "43rem",
                            }}
                        >
                            <p style={{ width: "8rem", display: "inline-block", }}>Reg User</p>
                            <InputText
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "10rem",
                                }}
                                id="id_REG_USER"
                                value={dataEDT_KSV_PO_MATL_LIST.REG_USER}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_PO_MATL_LIST_REG_USER(
                                        e,
                                        "REG_USER",
                                    )
                                }
                                disabled
                            />

                            <Button
                                label="Sea Freight"
                                style={{
                                    display: "inline-block",
                                    marginLeft: "9rem",
                                }}
                                className="p-button-text"
                                onClick={blankFn}
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
                            <p style={{ width: "8rem", display: "inline-block", }}>*Destination</p>
                            <div
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "23rem",
                                }}
                            >
                                <Dropdown
                                    id="id_DESTINATION"
                                    style={{ width: "23rem" }}
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
                                width: "30rem",
                            }}
                        >
                            <p style={{ width: "4rem", display: "inline-block", }}>Cost</p>
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
                            <Button
                                label="Air Freight"
                                style={{
                                    display: "inline-block",
                                    marginLeft: "11rem",
                                }}
                                className="p-button-text"
                                onClick={blankFn}
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
                            <p style={{ width: "8rem", display: "inline-block", }}>*Sender</p>
                            <div
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "8rem",
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
                                width: "22rem",
                            }}
                        >
                            <p style={{ width: "8rem", display: "inline-block", }}>*Buyer</p>
                            <div
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "13rem",
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
                                width: "17rem",
                            }}
                        >
                            <p style={{ width: "8rem", display: "inline-block", }}>Receiver</p>
                            <div
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "8rem",
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
                                width: "25rem",
                            }}
                        >
                            <p style={{ width: "8rem", display: "inline-block", }}>Reason</p>
                            <div
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "15rem",
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
                                width: "17rem",
                            }}
                        >
                            <p style={{ width: "8rem", display: "inline-block", }}>Net</p>
                            <InputText
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "8rem",
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
                                width: "11rem",
                            }}
                        >
                            <p style={{ width: "2rem", display: "inline-block", }}>Vat</p>
                            <InputText
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "8rem",
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
                                width: "14rem",
                            }}
                        >
                            <p style={{ width: "5rem", display: "inline-block", }}>Amount</p>
                            <InputText
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "8rem",
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
                                width: "7rem",
                            }}
                        >
                            {/* <p style={{ width: '8rem', display: 'inline-block' }}> Curr </p> */}
                            <div
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "6rem",
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
                                width: "13rem",
                            }}
                        >
                            <p style={{ width: "4rem", display: "inline-block", }}>M/W</p>
                            <div
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "8rem",
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
                                width: "14rem",
                            }}
                        >
                            <p style={{ width: "5rem", display: "inline-block", }}>Charge</p>
                            <div
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "8rem",
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
                                width: "19rem",
                            }}
                        >
                            {/* <p style={{ width: '8rem', display: 'inline-block' }}> . </p> */}
                            <div
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "18rem",
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
                                width: "25.5rem",
                            }}
                        >
                            <p style={{ width: "8rem", display: "inline-block", }}>Weight/CBM</p>
                            <InputText
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "8rem",
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
                                width: "17rem",
                            }}
                        >
                            <p style={{ width: "8rem", display: "inline-block", }}>Weight/Net</p>
                            <InputText
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "8rem",
                                }}
                                id="id_WEIGHT_NET"
                                value={dataEDT_KSV_PO_MATL_LIST.WEIGHT_NET}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_PO_MATL_LIST_WEIGHT_NET(
                                        e,
                                        "WEIGHT_NET",
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
                                width: "33rem",
                            }}
                        >
                            <p style={{ width: "8rem", display: "inline-block", }}>*Desc/Spec</p>
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
                            <p style={{ width: "8rem", display: "inline-block", }}>*BL No</p>
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
                                marginLeft: "1rem",
                                height: "2rem",
                                display: "inline-block",
                                width: "9rem",
                            }}
                        >
                            <InputText
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "8rem",
                                }}
                                id="id_BL_NO"
                                disabled
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
                                marginLeft: "4.5rem",
                                height: "2rem",
                                display: "inline-block",
                                width: "60rem",
                            }}
                        >
                            <p style={{ width: "14rem", display: "inline-block", }}>Remark</p>
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

                            <Button
                                label="OK/Cancel"
                                style={{
                                    display: "inline-block",
                                    marginLeft: "1rem",
                                }}
                                className="p-button-text"
                                onClick={blankFn}
                            />
                        </span>
                    </div>

                    <div
                        style={{
                            width: "100rem",
                            height: "7rem",
                            marginTop: "0.5rem",
                            display: "inline-block",
                        }}
                    >
                        <span
                            style={{
                                marginLeft: "0.5rem",
                                height: "2rem",
                                display: "inline-block",
                                width: "30rem",
                            }}
                        >
                            <p style={{ width: "8rem", display: "inline-block", }}>Po</p>
                            <InputText
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "13rem",
                                }}
                                id="id_PO_CD"
                                value={dataEDT_KSV_PO_MATL_LIST.PO_CD}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_PO_MATL_LIST_PO_CD(
                                        e,
                                        "PO_CD",
                                    )
                                }
                                disabled
                            />

                            <Button
                                label="PO"
                                style={{
                                    display: "inline-block",
                                    marginLeft: "1rem",
                                }}
                                className="p-button-text"
                                onClick={show_FIND_PO}
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
                            <p style={{ width: "4rem", display: "inline-block", }}>Unit</p>
                            <InputText
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "8rem",
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
                                width: "10rem",
                            }}
                        >
                            <p style={{ width: "4rem", display: "inline-block", }}>Price(W)</p>
                            <InputText
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "5rem",
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
                                width: "9rem",
                            }}
                        >
                            <p style={{ width: "3rem", display: "inline-block", }}>Qty</p>
                            <InputText
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "5rem",
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
                                width: "30rem",
                            }}
                        >
                            <p style={{ width: "6rem", display: "inline-block", }}>*Matl Cd</p>
                            <InputText
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "8rem",
                                }}
                                id="id_MATL_CD"
                                value={dataEDT_KSV_PO_MATL_LIST.MATL_CD}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_PO_MATL_LIST_MATL_CD(
                                        e,
                                        "MATL_CD",
                                    )
                                }
                                disabled
                            />

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
                                style={{
                                    display: "inline-block",
                                    marginLeft: "1rem",
                                }}
                                className="p-button-text"
                                onClick={blankFn}
                            />
                        </span>
                        <span
                            style={{
                                marginLeft: "0.5rem",
                                height: "2rem",
                                display: "inline-block",
                                width: "30rem",
                            }}
                        >
                            <p style={{ width: "8rem", display: "inline-block", }}>*Order</p>
                            <InputText
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "13rem",
                                }}
                                id="id_ORDER_CD"
                                value={dataEDT_KSV_PO_MATL_LIST.ORDER_CD}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_PO_MATL_LIST_ORDER_CD(
                                        e,
                                        "ORDER_CD",
                                    )
                                }
                                disabled
                            />

                            <Button
                                label="Orders"
                                style={{
                                    display: "inline-block",
                                    marginLeft: "1rem",
                                }}
                                className="p-button-text"
                                onClick={show_FIND_ORDER}
                            />
                        </span>
                        <span
                            style={{
                                marginLeft: "0.5rem",
                                height: "2rem",
                                display: "inline-block",
                                width: "59rem",
                            }}
                        >
                            <p style={{ width: "4rem", display: "inline-block", }}>Style</p>
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
                                width: "40rem",
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

                            <Button
                                label="Upd"
                                style={{
                                    display: "inline-block",
                                    marginLeft: "1rem",
                                }}
                                className="p-button-text"
                                onClick={blankFn}
                            />
                        </span>
                        <span
                            style={{
                                marginLeft: "0.5rem",
                                height: "2rem",
                                display: "inline-block",
                                width: "55rem",
                            }}
                        >
                            <Button
                                label="Buyer Info. Save"
                                style={{
                                    display: "inline-block",
                                    marginLeft: "1rem",
                                }}
                                className="p-button-text"
                                onClick={blankFn}
                            />

                            {/* <p style={{ width: '8rem', display: 'inline-block' }}> Express Charge </p> */}
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

                            <Button
                                label="Query by PO"
                                style={{
                                    display: "inline-block",
                                    marginLeft: "1rem",
                                }}
                                className="p-button-text"
                                onClick={blankFn}
                            />
                        </span>
                    </div>
                </div>
            </div>
            <Divider />

            <div style={{ width: "100rem", height: "7rem" }}>
                <div className="formgrid grid">
                    <div className="field col-6 md:col-6">
                        <Button
                            style={{ display: "inline-block", width: "10rem" }}
                            label="Insert"
                            className="p-button-text"
                            onClick={insert_MATL_FREIGHT}
                        />

                        <Button
                            style={{ display: "inline-block", width: "10rem" }}
                            label="Update"
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
                            label="Reset"
                            className="p-button-text"
                            onClick={reset_MATL_FREIGHT}
                        />

                        <Divider />
                        <Button
                            style={{ display: "inline-block", width: "10rem" }}
                            label="Debit Note"
                            className="p-button-text"
                            onClick={blankFn}
                        />

                        <Button
                            style={{ display: "inline-block", width: "20rem" }}
                            label="Import Material(Supplier)"
                            className="p-button-text"
                            onClick={blankFn}
                        />

                        <Button
                            style={{ display: "inline-block", width: "10rem" }}
                            label="Excel"
                            className="p-button-text"
                            onClick={blankFn}
                        />
                    </div>
                    <div className="field col-6 md:col-6">
                        <div
                            style={{
                                marginLeft: "0.5rem",
                                display: "inline-block",
                                width: "2rem",
                            }}
                        >
                            <Checkbox
                                style={{
                                    display: "inline-block",
                                    width: "1rem",
                                    marginLeft: "0.5rem",
                                }}
                                id="id_IS_COST"
                                checked={changeCheckBoxVal(dataIS_EXPRESS)}
                                onChange={(e) =>
                                    onCheckboxChangeIS_EXPRESS(e, "IS_EXPRESS")
                                }
                            />
                        </div>
                        <Button
                            style={{ display: "inline-block", width: "10rem" }}
                            label="Express Add"
                            className="p-button-text"
                            onClick={blankFn}
                        />

                        <Button
                            style={{ display: "inline-block", width: "10rem" }}
                            label="Express Upd"
                            className="p-button-text"
                            onClick={blankFn}
                        />

                        <Button
                            style={{ display: "inline-block", width: "10rem" }}
                            label="Express Del"
                            className="p-button-text"
                            onClick={blankFn}
                        />

                        <Button
                            style={{ display: "inline-block", width: "10rem" }}
                            label="Express List"
                            className="p-button-text"
                            onClick={blankFn}
                        />

                        <Divider />
                        <div
                            style={{
                                marginLeft: "0.5rem",
                                display: "inline-block",
                                width: "2rem",
                            }}
                        >
                            <Checkbox
                                style={{
                                    display: "inline-block",
                                    width: "1rem",
                                    marginLeft: "0.5rem",
                                }}
                                id="id_IS_COST"
                                checked={changeCheckBoxVal(dataIS_DHL)}
                                onChange={(e) =>
                                    onCheckboxChangeIS_DHL(e, "IS_DHL")
                                }
                            />
                        </div>
                        <Button
                            style={{ display: "inline-block", width: "10rem" }}
                            label="DHL Add "
                            className="p-button-text"
                            onClick={blankFn}
                        />

                        <Button
                            style={{ display: "inline-block", width: "15rem" }}
                            label="DHL Upd"
                            className="p-button-text"
                            onClick={blankFn}
                        />

                        <Button
                            style={{ display: "inline-block", width: "10rem" }}
                            label="DHL Del"
                            className="p-button-text"
                            onClick={blankFn}
                        />

                        <Button
                            style={{ display: "inline-block", width: "10rem" }}
                            label="DHL List"
                            className="p-button-text"
                            onClick={blankFn}
                        />
                    </div>
                </div>
            </div>

            <Divider />
            <Toast ref={toast} />

            <Dialog
                visible={isDialogS0417_1}
                position="top-right"
                style={{ width: "70vw" }}
                modal={true}
                className="p-fluid"
                onHide={onHideDialogS0417_1}
            >
                <div
                    style={{
                        marginLeft: "1rem",
                        marginTop: "1rem",
                        width: "50rem",
                        height: "5rem",
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
                        <p style={{ width: "8rem", display: "inline-block" }}>PO Cd</p>
                        <InputText
                            style={{
                                marginLeft: "0.5rem",
                                display: "inline-block",
                                width: "23rem",
                            }}
                            id="id_AIR_CHARAGE"
                            value={dataFIND_STR}
                            onChange={(e) =>
                                onInputChangeFIND_STR(e, "FIND_STR")
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
                        <InputText
                            style={{
                                marginLeft: "0.5rem",
                                display: "inline-block",
                                width: "10rem",
                            }}
                            id="id_AIR_CHARAGE"
                            value={dataFIND_KIND}
                            disabled
                        />
                    </span>
                    <span
                        style={{
                            marginLeft: "0.5rem",
                            height: "2rem",
                            display: "inline-block",
                            width: "10rem",
                        }}
                    >
                        <Button
                            style={{ display: "inline-block", width: "9rem" }}
                            label={
                                <span>
                                    Search(<u>S</u>)
                                </span>
                            }
                            className="p-button-text"
                            onClick={search_FIND}
                        />
                    </span>
                </div>
                <div
                    style={{
                        marginLeft: "1rem",
                        marginTop: "1rem",
                        width: "50rem",
                        height: "30rem",
                    }}
                >
                    <AFDataTable preventUnrelatedRerender
                        ref={dt_TBL_FIND}
                        size="small"
                        value={datasTBL_FIND}
                        resizableColumns
                        columnResizeMode="fit"
                        showGridlines
                        selectionMode="checkbox"
                        selection={selectedTBL_FIND}
                        onSelectionChange={(e) => {
                            setFlagSelectModeTBL_FIND(true);
                            setSelectedTBL_FIND(e.value);
                            console.log(
                                "selected length:" + selectedTBL_FIND.length,
                            );
                            onRowClick1TBL_FIND(e.value);
                        }}
                        onRowClick={onRowClickTBL_FIND}
                        dataKey="id"
                        className="datatable-responsive"
                        virtualScrollerOptions={{ itemSize: 10 }}
                        emptyMessage=" " //header={headerTBL_KSV_PO_MATL_LIST}
                        responsiveLayout="scroll"
                        scrollable
                        scrollHeight="22rem"
                    >
                        <AFColumn field="COL1" headerClassName="t-header" header="Po Cd" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                        <AFColumn field="COL2" headerClassName="t-header" header="Buyer Cd" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                        <AFColumn field="COL3" headerClassName="t-header" header="Buyer Team" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    </AFDataTable>
                </div>
            </Dialog>
        </div>
    );
};

const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(S0417_MATL_FREIGHT, comparisonFn);
