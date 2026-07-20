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
import { ServiceS0413_INVOICE_REG_MATL } from "../service/service_biz/ServiceS0413_INVOICE_REG_MATL";

import "./page_common.scss";

const emptyKCD_CODE = {
    id: 0,
    CD_GROUP: "",
    CD_CODE: "",
    CD_NAME: "",
    CD_FLAG: "",
};

const emptyQRY_KSV_MATL_INVOICE = {
    INVOICE_NO_STR: "",
    INVOICE_NO: "",
    FREIGHT_TYPE: "",
    PACK_NO: "",
    FACTORY_NAME: "",
    OUT_DATE: "",
    TOTAL_AMOUNT: "",
    Freight_AMOUNT: "",
    CURR_CD: "",
    CURR_DATE: "",
    CURR_RATE: "",
    PAYMENT_TYPE: "",
    TRADE_TYPE: "",
    TRADE_KIND: "",
    DOCU_NO: "",
    LICENSE_NO: "",
    LICENSE_Date: "",
    NEOE_NO: "",
};

const emptyTBL_KSV_MATL_INVOICE = {
    id: 0,
    PACK_CD: "",
    PO_CD: "",
    PO_AMT: "",
    DELIVERY_AMT: "",
    IN_DELIVERY_AMT: "",
};

const S0413_INVOICE_REG_MATL = () => {
    const serviceLibRef = useRef(null);
    if (!serviceLibRef.current) {
        serviceLibRef.current = new ServiceLib();
        serviceLibRef.current.loginConfirm();
    }
    const serviceLib = serviceLibRef.current;
    const serviceS0413_INVOICE_REG_MATLRef = useRef(null);
    if (!serviceS0413_INVOICE_REG_MATLRef.current) serviceS0413_INVOICE_REG_MATLRef.current = new ServiceS0413_INVOICE_REG_MATL();
    const serviceS0413_INVOICE_REG_MATL = serviceS0413_INVOICE_REG_MATLRef.current;

    const toast = useRef(null);

    /* splitter 관련 */
    const [styleVal, setStyleVal] = useState({ width: "65vw" });

    const [data_INVOICE, setData_INVOICE] = useState({});
    const [data_INVOICE_1, setData_INVOICE_1] = useState({});

    const insert_INVOICE = () => {
        var tInput = {};
        tInput.INVOICE_NO = dataQRY_KSV_MATL_INVOICE.INVOICE_NO_STR;
        tInput.PACK_CD = dataQRY_KSV_MATL_INVOICE.PACK_NO.trim();
        tInput.OUT_DATE = dataQRY_KSV_MATL_INVOICE.OUT_DATE;
        tInput.DELIVERY_AMT = serviceLib.getFloat(
            dataQRY_KSV_MATL_INVOICE.Freight_AMOUNT,
            2,
        );
        tInput.DELIVERY_WON = 0.0;
        tInput.CURR_DATE = dataQRY_KSV_MATL_INVOICE.CURR_DATE;
        tInput.CURR_CD = dataQRY_KSV_MATL_INVOICE.CURR_CD;
        tInput.USD_RATE = dataQRY_KSV_MATL_INVOICE.CURR_RATE;
        tInput.PAYMENT_TYPE = dataQRY_KSV_MATL_INVOICE.PAYMENT_TYPE;
        tInput.TRADE_TYPE = dataQRY_KSV_MATL_INVOICE.TRADE_TYPE;
        tInput.TRADE_KIND = dataQRY_KSV_MATL_INVOICE.TRADE_KIND;
        tInput.LICENSE_NO = dataQRY_KSV_MATL_INVOICE.LICENSE_NO;
        tInput.LICENSE_DATE = dataQRY_KSV_MATL_INVOICE.LICENSE_Date;

        var tInput1 = datasTBL_KSV_MATL_INVOICE.map((col, i) => {
            var tObj = { ...col };
            delete tObj.__typename;
            return tObj;
        });

        console.log(tInput);
        console.log(tInput1);

        serviceS0413_INVOICE_REG_MATL
            .mgrInsert_INSERT_INVOICE(tInput, tInput1)
            .then((data) => {
                if (typeof data.graphQLErrors === "undefined") {
                    console.log(
                        "ServiceMgrKCD_BUYER.mgr1KcdStyle call => " +
                            data.length,
                    );
                    toast.current.show({
                        severity: "success",
                        summary: "Succeed Insert Invoice",
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
                        summary: "Error Insert Invoice",
                        detail: "",
                        life: 3000,
                    });
                }
            });
    };

    const search_INVOICE = () => {
        // emptyQRY_KSV_MATL_INVOICE
        var _tObj = {};
        _tObj.INVOICE_NO = dataQRY_KSV_MATL_INVOICE.INVOICE_NO_STR;
        _tObj.PACK_CD = "";

        serviceS0413_INVOICE_REG_MATL.mgrQuery_INVOICE(_tObj).then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                console.log(
                    "ServiceMgrKCD_BUYER.mgr1KcdStyle call => " + data.length,
                );
                if (data.INVOICE.length <= 0) {
                    toast.current.show({
                        severity: "success",
                        summary: "등록되지 않은 invoice입니다",
                        detail: "",
                        life: 3000,
                    });
                    var _tData = { ...dataQRY_KSV_MATL_INVOICE };
                    _tData.Freight_AMOUNT = 0;
                    _tData.OUT_DATE = "";
                    _tData.CURR_RATE = 0;
                    _tData.CURR_DATE = "";
                    _tData.LICENSE_NO = "";
                    _tData.LICENSE_Date = "";
                    setDataQRY_KSV_MATL_INVOICE(_tData);

                    editQRY_KSV_MATL_INVOICE_INVOICE_NO(" ");
                    editQRY_KSV_MATL_INVOICE_PACK_NO(" ");
                    editQRY_KSV_MATL_INVOICE_CURR_CD(" ");
                    editQRY_KSV_MATL_INVOICE_PAYMENT_TYPE(" ");
                    editQRY_KSV_MATL_INVOICE_TRADE_TYPE(" ");
                    editQRY_KSV_MATL_INVOICE_TRADE_KIND(" ");

                    setDatasTBL_KSV_MATL_INVOICE([]);
                } else {
                    setData_INVOICE(data);

                    var tData = { ...data.INVOICE[0] };
                    var tData1 = { ...data.INVOICE_1[0] };

                    var tTotAmt = 0;
                    var tArray = data.INVOICE_PO.map((col, i) => {
                        var tObj = { ...col };
                        tTotAmt += serviceLib.getFloat(col.PO_AMT, 2);
                        return tObj;
                    });

                    var _tData = { ...dataQRY_KSV_MATL_INVOICE };
                    _tData.Freight_AMOUNT = serviceLib.getFloat(
                        tData.DELIVERY_AMT,
                        2,
                    );
                    _tData.OUT_DATE = tData.OUT_DATE;
                    _tData.CURR_RATE = tData.USD_RATE;
                    _tData.CURR_DATE = tData.CURR_DATE;
                    _tData.LICENSE_NO = tData.LICENSE_NO;
                    _tData.LICENSE_Date = tData.LICENSE_DATE;
                    _tData.FACTORY_NAME = tData1.FACTORY_NAME;
                    _tData.FREIGHT_TYPE = tData1.DELIVERY_TYPE_N;
                    _tData.TOTAL_AMOUNT = tTotAmt;
                    setDataQRY_KSV_MATL_INVOICE(_tData);

                    editQRY_KSV_MATL_INVOICE_PACK_NO(tData.PACK_CD);
                    editQRY_KSV_MATL_INVOICE_CURR_CD(tData.CURR_CD);
                    editQRY_KSV_MATL_INVOICE_PAYMENT_TYPE(tData.PAYMENT_TYPE);
                    editQRY_KSV_MATL_INVOICE_TRADE_TYPE(tData.TRADE_TYPE);
                    editQRY_KSV_MATL_INVOICE_TRADE_KIND(tData.TRADE_KIND);

                    var tArray2 = data.INVOICE_PO.map((col, i) => {
                        var tObj = { ...col };
                        tObj.PO_AMT = serviceLib.getFloat(tObj.PO_AMT, 2);
                        tObj.DELIVERY_AMT = serviceLib.getFloat(
                            tObj.DELIVERY_AMT,
                            2,
                        );
                        tObj.DELIVERY_WON = serviceLib.getFloat(
                            tObj.DELIVERY_WON,
                            0,
                        );
                        return tObj;
                    });

                    setDatasTBL_KSV_MATL_INVOICE(tArray2);
                }
            } else {
                console.log(
                    "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });
    };

    const search_INVOICE_1 = () => {
        // emptyQRY_KSV_MATL_INVOICE
        var _tObj = {};
        _tObj.INVOICE_NO = "";
        _tObj.PACK_CD = dataQRY_KSV_MATL_INVOICE.PACK_NO.trim();

        serviceS0413_INVOICE_REG_MATL.mgrQuery_INVOICE(_tObj).then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                console.log(
                    "ServiceMgrKCD_BUYER.mgr1KcdStyle call => " + data.length,
                );
                if (data.INVOICE.length <= 0 && _tObj.INVOICE_NO !== "") {
                    toast.current.show({
                        severity: "success",
                        summary: "등록되지 않은 invoice입니다",
                        detail: "",
                        life: 3000,
                    });

                    var _tData = { ...dataQRY_KSV_MATL_INVOICE };
                    _tData.Freight_AMOUNT = 0;
                    _tData.OUT_DATE = "";
                    _tData.CURR_RATE = 0;
                    _tData.CURR_DATE = "";
                    _tData.LICENSE_NO = "";
                    _tData.LICENSE_Date = "";
                    setDataQRY_KSV_MATL_INVOICE(_tData);

                    editQRY_KSV_MATL_INVOICE_INVOICE_NO(" ");
                    editQRY_KSV_MATL_INVOICE_PACK_NO(" ");
                    editQRY_KSV_MATL_INVOICE_CURR_CD(" ");
                    editQRY_KSV_MATL_INVOICE_PAYMENT_TYPE(" ");
                    editQRY_KSV_MATL_INVOICE_TRADE_TYPE(" ");
                    editQRY_KSV_MATL_INVOICE_TRADE_KIND(" ");

                    setDatasTBL_KSV_MATL_INVOICE([]);
                } else {
                    setData_INVOICE(data);

                    var tData1 = { ...data.INVOICE_1[0] };

                    var tTotAmt = 0;
                    var tArray = data.INVOICE_PO.map((col, i) => {
                        var tObj = { ...col };
                        tTotAmt += serviceLib.getFloat(col.PO_AMT, 2);
                        return tObj;
                    });

                    var _tData = { ...dataQRY_KSV_MATL_INVOICE };
                    _tData.FACTORY_NAME = tData1.FACTORY_NAME;
                    _tData.FREIGHT_TYPE = tData1.DELIVERY_TYPE_N;
                    _tData.TOTAL_AMOUNT = tTotAmt;
                    _tData.CURR_RATE = 1;
                    _tData.CURR_CD = "USD";
                    _tData.CURR_DATE = "20230517";
                    _tData.INVOICE_NO_STR =
                        dataQRY_KSV_MATL_INVOICE.PACK_NO.trim();
                    setDataQRY_KSV_MATL_INVOICE(_tData);

                    editQRY_KSV_MATL_INVOICE_INVOICE_NO(" ");
                    editQRY_KSV_MATL_INVOICE_CURR_CD("USD");
                    editQRY_KSV_MATL_INVOICE_PAYMENT_TYPE(" ");
                    editQRY_KSV_MATL_INVOICE_TRADE_TYPE(" ");
                    editQRY_KSV_MATL_INVOICE_TRADE_KIND(" ");

                    var tArray2 = data.INVOICE_PO.map((col, i) => {
                        var tObj = { ...col };
                        tObj.PO_AMT = serviceLib.getFloat(tObj.PO_AMT, 2);
                        tObj.DELIVERY_AMT = serviceLib.getFloat(
                            tObj.DELIVERY_AMT,
                            2,
                        );
                        tObj.DELIVERY_WON = serviceLib.getFloat(
                            tObj.DELIVERY_WON,
                            0,
                        );
                        return tObj;
                    });

                    setDatasTBL_KSV_MATL_INVOICE(tArray2);
                }
            } else {
                console.log(
                    "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });
    };

    /* QRY KSV_MATL_INVOICE*/
    const [dataQRY_KSV_MATL_INVOICE, setDataQRY_KSV_MATL_INVOICE] = useState(
        emptyQRY_KSV_MATL_INVOICE,
    );

    const onInputChangeQRY_KSV_MATL_INVOICE_INVOICE_NO_STR = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_MATL_INVOICE = { ...dataQRY_KSV_MATL_INVOICE };

        let tTypeVal = _dataQRY_KSV_MATL_INVOICE[`${name}`];
        if (typeof tTypeVal === "string")
            _dataQRY_KSV_MATL_INVOICE[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_MATL_INVOICE[`${name}`] = parseInt(val);

        setDataQRY_KSV_MATL_INVOICE(_dataQRY_KSV_MATL_INVOICE);
    };

    const [
        datasQRY_KSV_MATL_INVOICE_INVOICE_NO,
        setDatasQRY_KSV_MATL_INVOICE_INVOICE_NO,
    ] = useState([]);
    const [
        dataQRY_KSV_MATL_INVOICE_INVOICE_NO,
        setDataQRY_KSV_MATL_INVOICE_INVOICE_NO,
    ] = useState({});

    const editQRY_KSV_MATL_INVOICE_INVOICE_NO = (argValue) => {
        let _dataQRY_KSV_MATL_INVOICE_INVOICE_NO =
            datasQRY_KSV_MATL_INVOICE_INVOICE_NO.filter(
                (val) => val.INVOICE_NO === argValue,
            );
        setDataQRY_KSV_MATL_INVOICE_INVOICE_NO(
            _dataQRY_KSV_MATL_INVOICE_INVOICE_NO[0],
        );
    };

    const onDropdownChangeQRY_KSV_MATL_INVOICE_INVOICE_NO = (e, name) => {
        let val = (e.value && e.value.INVOICE_NO) || "";

        let _dataQRY_KSV_MATL_INVOICE = { ...dataQRY_KSV_MATL_INVOICE };

        let tTypeVal = _dataQRY_KSV_MATL_INVOICE[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_MATL_INVOICE[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_MATL_INVOICE[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_MATL_INVOICE(_dataQRY_KSV_MATL_INVOICE);
        setDataQRY_KSV_MATL_INVOICE_INVOICE_NO(e.value);

        var _tData = { ...dataQRY_KSV_MATL_INVOICE };
        _tData.INVOICE_NO_STR = e.value.INVOICE_NO;
        setDataQRY_KSV_MATL_INVOICE(_tData);
    };

    const onInputChangeQRY_KSV_MATL_INVOICE_FREIGHT_TYPE = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_MATL_INVOICE = { ...dataQRY_KSV_MATL_INVOICE };

        let tTypeVal = _dataQRY_KSV_MATL_INVOICE[`${name}`];
        if (typeof tTypeVal === "string")
            _dataQRY_KSV_MATL_INVOICE[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_MATL_INVOICE[`${name}`] = parseInt(val);

        setDataQRY_KSV_MATL_INVOICE(_dataQRY_KSV_MATL_INVOICE);
    };

    const [
        datasQRY_KSV_MATL_INVOICE_PACK_NO,
        setDatasQRY_KSV_MATL_INVOICE_PACK_NO,
    ] = useState([]);
    const [
        dataQRY_KSV_MATL_INVOICE_PACK_NO,
        setDataQRY_KSV_MATL_INVOICE_PACK_NO,
    ] = useState({});

    const editQRY_KSV_MATL_INVOICE_PACK_NO = (argValue) => {
        let _dataQRY_KSV_MATL_INVOICE_PACK_NO =
            datasQRY_KSV_MATL_INVOICE_PACK_NO.filter(
                (val) => val.PACK_CD === argValue,
            );
        setDataQRY_KSV_MATL_INVOICE_PACK_NO(
            _dataQRY_KSV_MATL_INVOICE_PACK_NO[0],
        );
    };

    const onDropdownChangeQRY_KSV_MATL_INVOICE_PACK_NO = (e, name) => {
        let val = "";
        if (typeof e.value === "string") {
            val = e.value;
        } else {
            val = (e.value && e.value.PACK_CD) || "";
        }

        let _dataQRY_KSV_MATL_INVOICE = { ...dataQRY_KSV_MATL_INVOICE };

        let tTypeVal = _dataQRY_KSV_MATL_INVOICE[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_MATL_INVOICE[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_MATL_INVOICE[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_MATL_INVOICE(_dataQRY_KSV_MATL_INVOICE);
        setDataQRY_KSV_MATL_INVOICE_PACK_NO(e.value);
    };

    const onInputChangeQRY_KSV_MATL_INVOICE_FACTORY_NAME = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_MATL_INVOICE = { ...dataQRY_KSV_MATL_INVOICE };

        let tTypeVal = _dataQRY_KSV_MATL_INVOICE[`${name}`];
        if (typeof tTypeVal === "string")
            _dataQRY_KSV_MATL_INVOICE[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_MATL_INVOICE[`${name}`] = parseInt(val);

        setDataQRY_KSV_MATL_INVOICE(_dataQRY_KSV_MATL_INVOICE);
    };

    const onCalChangeQRY_KSV_MATL_INVOICE_OUT_DATE = (e, name) => {
        let val1 = e.value || "";
        let val = "";
        if (val1 === "") {
            val = "";
        } else {
            val = getDateVal(val1);
        }

        let _dataQRY_KSV_MATL_INVOICE = { ...dataQRY_KSV_MATL_INVOICE };
        _dataQRY_KSV_MATL_INVOICE[`${name}`] = val;
        setDataQRY_KSV_MATL_INVOICE(_dataQRY_KSV_MATL_INVOICE);
    };

    const onInputChangeQRY_KSV_MATL_INVOICE_TOTAL_AMOUNT = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_MATL_INVOICE = { ...dataQRY_KSV_MATL_INVOICE };

        let tTypeVal = _dataQRY_KSV_MATL_INVOICE[`${name}`];
        if (typeof tTypeVal === "string")
            _dataQRY_KSV_MATL_INVOICE[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_MATL_INVOICE[`${name}`] = parseInt(val);

        setDataQRY_KSV_MATL_INVOICE(_dataQRY_KSV_MATL_INVOICE);
    };

    const onInputChangeQRY_KSV_MATL_INVOICE_Freight_AMOUNT = (e, name) => {
        let val = (e.target && e.target.value) || "0";

        let _dataQRY_KSV_MATL_INVOICE = { ...dataQRY_KSV_MATL_INVOICE };

        let tTypeVal = _dataQRY_KSV_MATL_INVOICE[`${name}`];
        if (typeof tTypeVal === "string")
            _dataQRY_KSV_MATL_INVOICE[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_MATL_INVOICE[`${name}`] = parseFloat(val);

        setDataQRY_KSV_MATL_INVOICE(_dataQRY_KSV_MATL_INVOICE);
    };

    const [
        datasQRY_KSV_MATL_INVOICE_CURR_CD,
        setDatasQRY_KSV_MATL_INVOICE_CURR_CD,
    ] = useState([]);
    const [
        dataQRY_KSV_MATL_INVOICE_CURR_CD,
        setDataQRY_KSV_MATL_INVOICE_CURR_CD,
    ] = useState({});

    const editQRY_KSV_MATL_INVOICE_CURR_CD = (argValue) => {
        let _dataQRY_KSV_MATL_INVOICE_CURR_CD =
            datasQRY_KSV_MATL_INVOICE_CURR_CD.filter(
                (val) => val.CD_CODE === argValue,
            );
        setDataQRY_KSV_MATL_INVOICE_CURR_CD(
            _dataQRY_KSV_MATL_INVOICE_CURR_CD[0],
        );
    };

    const onDropdownChangeQRY_KSV_MATL_INVOICE_CURR_CD = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataQRY_KSV_MATL_INVOICE = { ...dataQRY_KSV_MATL_INVOICE };

        let tTypeVal = _dataQRY_KSV_MATL_INVOICE[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_MATL_INVOICE[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_MATL_INVOICE[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_MATL_INVOICE(_dataQRY_KSV_MATL_INVOICE);
        setDataQRY_KSV_MATL_INVOICE_CURR_CD(e.value);
    };

    const onCalChangeQRY_KSV_MATL_INVOICE_CURR_DATE = (e, name) => {
        let val1 = e.value || "";
        let val = "";
        if (val1 === "") {
            val = "";
        } else {
            val = getDateVal(val1);
        }

        let _dataQRY_KSV_MATL_INVOICE = { ...dataQRY_KSV_MATL_INVOICE };
        _dataQRY_KSV_MATL_INVOICE[`${name}`] = val;
        setDataQRY_KSV_MATL_INVOICE(_dataQRY_KSV_MATL_INVOICE);
    };

    const onInputChangeQRY_KSV_MATL_INVOICE_CURR_RATE = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_MATL_INVOICE = { ...dataQRY_KSV_MATL_INVOICE };

        let tTypeVal = _dataQRY_KSV_MATL_INVOICE[`${name}`];
        if (typeof tTypeVal === "string")
            _dataQRY_KSV_MATL_INVOICE[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_MATL_INVOICE[`${name}`] = parseInt(val);

        setDataQRY_KSV_MATL_INVOICE(_dataQRY_KSV_MATL_INVOICE);
    };

    const [
        datasQRY_KSV_MATL_INVOICE_PAYMENT_TYPE,
        setDatasQRY_KSV_MATL_INVOICE_PAYMENT_TYPE,
    ] = useState([]);
    const [
        dataQRY_KSV_MATL_INVOICE_PAYMENT_TYPE,
        setDataQRY_KSV_MATL_INVOICE_PAYMENT_TYPE,
    ] = useState({});

    const editQRY_KSV_MATL_INVOICE_PAYMENT_TYPE = (argValue) => {
        let _dataQRY_KSV_MATL_INVOICE_PAYMENT_TYPE =
            datasQRY_KSV_MATL_INVOICE_PAYMENT_TYPE.filter(
                (val) => val.CD_CODE === argValue,
            );
        setDataQRY_KSV_MATL_INVOICE_PAYMENT_TYPE(
            _dataQRY_KSV_MATL_INVOICE_PAYMENT_TYPE[0],
        );
    };

    const onDropdownChangeQRY_KSV_MATL_INVOICE_PAYMENT_TYPE = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataQRY_KSV_MATL_INVOICE = { ...dataQRY_KSV_MATL_INVOICE };

        let tTypeVal = _dataQRY_KSV_MATL_INVOICE[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_MATL_INVOICE[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_MATL_INVOICE[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_MATL_INVOICE(_dataQRY_KSV_MATL_INVOICE);
        setDataQRY_KSV_MATL_INVOICE_PAYMENT_TYPE(e.value);
    };

    const [
        datasQRY_KSV_MATL_INVOICE_TRADE_TYPE,
        setDatasQRY_KSV_MATL_INVOICE_TRADE_TYPE,
    ] = useState([]);
    const [
        dataQRY_KSV_MATL_INVOICE_TRADE_TYPE,
        setDataQRY_KSV_MATL_INVOICE_TRADE_TYPE,
    ] = useState({});

    const editQRY_KSV_MATL_INVOICE_TRADE_TYPE = (argValue) => {
        let _dataQRY_KSV_MATL_INVOICE_TRADE_TYPE =
            datasQRY_KSV_MATL_INVOICE_TRADE_TYPE.filter(
                (val) => val.CD_CODE === argValue,
            );
        setDataQRY_KSV_MATL_INVOICE_TRADE_TYPE(
            _dataQRY_KSV_MATL_INVOICE_TRADE_TYPE[0],
        );
    };

    const onDropdownChangeQRY_KSV_MATL_INVOICE_TRADE_TYPE = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataQRY_KSV_MATL_INVOICE = { ...dataQRY_KSV_MATL_INVOICE };

        let tTypeVal = _dataQRY_KSV_MATL_INVOICE[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_MATL_INVOICE[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_MATL_INVOICE[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_MATL_INVOICE(_dataQRY_KSV_MATL_INVOICE);
        setDataQRY_KSV_MATL_INVOICE_TRADE_TYPE(e.value);
    };

    const [
        datasQRY_KSV_MATL_INVOICE_TRADE_KIND,
        setDatasQRY_KSV_MATL_INVOICE_TRADE_KIND,
    ] = useState([]);
    const [
        dataQRY_KSV_MATL_INVOICE_TRADE_KIND,
        setDataQRY_KSV_MATL_INVOICE_TRADE_KIND,
    ] = useState({});

    const editQRY_KSV_MATL_INVOICE_TRADE_KIND = (argValue) => {
        let _dataQRY_KSV_MATL_INVOICE_TRADE_KIND =
            datasQRY_KSV_MATL_INVOICE_TRADE_KIND.filter(
                (val) => val.CD_CODE === argValue,
            );
        setDataQRY_KSV_MATL_INVOICE_TRADE_KIND(
            _dataQRY_KSV_MATL_INVOICE_TRADE_KIND[0],
        );
    };

    const onDropdownChangeQRY_KSV_MATL_INVOICE_TRADE_KIND = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataQRY_KSV_MATL_INVOICE = { ...dataQRY_KSV_MATL_INVOICE };

        let tTypeVal = _dataQRY_KSV_MATL_INVOICE[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_MATL_INVOICE[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_MATL_INVOICE[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_MATL_INVOICE(_dataQRY_KSV_MATL_INVOICE);
        setDataQRY_KSV_MATL_INVOICE_TRADE_KIND(e.value);
    };

    const onInputChangeQRY_KSV_MATL_INVOICE_DOCU_NO = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_MATL_INVOICE = { ...dataQRY_KSV_MATL_INVOICE };

        let tTypeVal = _dataQRY_KSV_MATL_INVOICE[`${name}`];
        if (typeof tTypeVal === "string")
            _dataQRY_KSV_MATL_INVOICE[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_MATL_INVOICE[`${name}`] = parseInt(val);

        setDataQRY_KSV_MATL_INVOICE(_dataQRY_KSV_MATL_INVOICE);
    };

    const onInputChangeQRY_KSV_MATL_INVOICE_LICENSE_NO = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_MATL_INVOICE = { ...dataQRY_KSV_MATL_INVOICE };

        let tTypeVal = _dataQRY_KSV_MATL_INVOICE[`${name}`];
        if (typeof tTypeVal === "string")
            _dataQRY_KSV_MATL_INVOICE[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_MATL_INVOICE[`${name}`] = parseInt(val);

        setDataQRY_KSV_MATL_INVOICE(_dataQRY_KSV_MATL_INVOICE);
    };

    const onCalChangeQRY_KSV_MATL_INVOICE_LICENSE_Date = (e, name) => {
        let val1 = e.value || "";
        let val = "";
        if (val1 === "") {
            val = "";
        } else {
            val = getDateVal(val1);
        }

        let _dataQRY_KSV_MATL_INVOICE = { ...dataQRY_KSV_MATL_INVOICE };
        _dataQRY_KSV_MATL_INVOICE[`${name}`] = val;
        setDataQRY_KSV_MATL_INVOICE(_dataQRY_KSV_MATL_INVOICE);
    };

    const [
        datasQRY_KSV_MATL_INVOICE_NEOE_NO,
        setDatasQRY_KSV_MATL_INVOICE_NEOE_NO,
    ] = useState([]);
    const [
        dataQRY_KSV_MATL_INVOICE_NEOE_NO,
        setDataQRY_KSV_MATL_INVOICE_NEOE_NO,
    ] = useState({});

    const onDropdownChangeQRY_KSV_MATL_INVOICE_NEOE_NO = (e, name) => {
        let val = (e.value && e.value.CD_PARTNER) || "";

        let _dataQRY_KSV_MATL_INVOICE = { ...dataQRY_KSV_MATL_INVOICE };

        let tTypeVal = _dataQRY_KSV_MATL_INVOICE[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_MATL_INVOICE[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_MATL_INVOICE[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_MATL_INVOICE(_dataQRY_KSV_MATL_INVOICE);
        setDataQRY_KSV_MATL_INVOICE_NEOE_NO(e.value);
    };

    /* TABLE KSV_MATL_INVOICE*/
    // DEFINE DATAGRID : TBL_KSV_MATL_INVOICE
    const [datasTBL_KSV_MATL_INVOICE, setDatasTBL_KSV_MATL_INVOICE] = useState(
        [],
    );
    const dt_TBL_KSV_MATL_INVOICE = useRef(null);
    const [dataTBL_KSV_MATL_INVOICE, setDataTBL_KSV_MATL_INVOICE] = useState(
        emptyTBL_KSV_MATL_INVOICE,
    );
    const [selectedTBL_KSV_MATL_INVOICE, setSelectedTBL_KSV_MATL_INVOICE] =
        useState([]);
    const [
        flagSelectModeTBL_KSV_MATL_INVOICE,
        setFlagSelectModeTBL_KSV_MATL_INVOICE,
    ] = useState(false);

    // DATAGRID CODE : TBL_KSV_MATL_INVOICE

    const onRowClick1TBL_KSV_MATL_INVOICE = (argData0) => {
        var argData = {};

        if (typeof argData0.length !== "undefined") {
            argData = argData0[0];
        } else {
            argData = argData0;
        }

        let argTBL_KSV_MATL_INVOICE = argData;

        setDataTBL_KSV_MATL_INVOICE(argTBL_KSV_MATL_INVOICE);
    };

    const onRowClickTBL_KSV_MATL_INVOICE = (event) => {
        let argTBL_KSV_MATL_INVOICE = event.data;
        if (flagSelectModeTBL_KSV_MATL_INVOICE) return;

        // Service : NawooAll:mgrQueryTBL_KSV_MATL_INVOICE
    };

    const searchTBL_KSV_MATL_INVOICE = () => {
        clearSelectedTBL_KSV_MATL_INVOICE();

        // serviceS0413_INVOICE_REG_MATL.mgrQueryTBL_KSV_MATL_INVOICE(dataQRY_).then(data => {
        //     if (typeof data.graphQLErrors === 'undefined') {
        //         console.log("ServiceNawooAll.mgrQueryTBL_KSV_MATL_INVOICE() call => " + data.length);
        //         setDatasTBL_KSV_MATL_INVOICE(data);
        //     } else {
        //         // var tStr = data.graphQLErrors[0].message;
        //         console.log("ServiceNawooAll.mgrQueryTBL_KSV_MATL_INVOICE()error => " + JSON.stringify(data.graphQLErrors));
        //
        //     }
        // });

        // Service : NawooAll:mgrQueryTBL_KSV_MATL_INVOICE
    };

    const clearSelectedTBL_KSV_MATL_INVOICE = () => {
        setSelectedTBL_KSV_MATL_INVOICE([]);
        setFlagSelectModeTBL_KSV_MATL_INVOICE(false);
    };

    const exportExcelTBL_KSV_MATL_INVOICE = () => {};

    useEffect(() => {
        var _tObj = {};
        _tObj.INVOICE_NO = "";

        serviceS0413_INVOICE_REG_MATL.mgrQuery_CODE(_tObj).then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                console.log(
                    "ServiceMgrKCD_BUYER.mgr1KcdStyle call => " +
                        data.CURR_CD.length,
                );

                setDatasQRY_KSV_MATL_INVOICE_INVOICE_NO(data.INVOICE);
                setDataQRY_KSV_MATL_INVOICE_INVOICE_NO(data.INVOICE[0]);

                setDatasQRY_KSV_MATL_INVOICE_PACK_NO(data.PACK_CD);
                setDataQRY_KSV_MATL_INVOICE_PACK_NO(data.PACK_CD[0]);

                setDatasQRY_KSV_MATL_INVOICE_CURR_CD(data.CURR_CD);
                setDataQRY_KSV_MATL_INVOICE_CURR_CD(data.CURR_CD[0]);

                setDatasQRY_KSV_MATL_INVOICE_PAYMENT_TYPE(data.PAYMENT_TYPE);
                setDataQRY_KSV_MATL_INVOICE_PAYMENT_TYPE(data.PAYMENT_TYPE[0]);

                setDatasQRY_KSV_MATL_INVOICE_TRADE_TYPE(data.TRADE_TYPE);
                setDataQRY_KSV_MATL_INVOICE_TRADE_TYPE(data.TRADE_TYPE[0]);

                setDatasQRY_KSV_MATL_INVOICE_TRADE_KIND(data.TRADE_KIND);
                setDataQRY_KSV_MATL_INVOICE_TRADE_KIND(data.TRADE_KIND[0]);

                setDatasQRY_KSV_MATL_INVOICE_NEOE_NO(data.NEOE_KIND);
                setDataQRY_KSV_MATL_INVOICE_NEOE_NO(data.NEOE_KIND[0]);
            } else {
                console.log(
                    "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });
    }, []);

    const onKeyPressFn = (e, name) => {
        if (e.key === "Enter" && name === "Freight_AMOUNT") {
            console.log("Key Press:" + e.target.value);

            var tValue1 = parseFloat(e.target.value);
            var tTotAmt = parseFloat(dataQRY_KSV_MATL_INVOICE.TOTAL_AMOUNT);

            var tArray2 = datasTBL_KSV_MATL_INVOICE.map((col, i) => {
                var tObj = { ...col };
                var tValue3 = serviceLib.getFloat(
                    tValue1 * (tObj.PO_AMT / tTotAmt),
                    2,
                );
                tObj.DELIVERY_AMT = tValue3;
                return tObj;
            });

            setDatasTBL_KSV_MATL_INVOICE(tArray2);
            // searchTBL_KCD_FACTORY()
        }
    };

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
                    height: "15rem",
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
                    <p style={{ width: "8rem", display: "inline-block" }}>Invoice No</p>
                    <InputText
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "13rem",
                        }}
                        id="id_INVOICE_NO_STR"
                        value={dataQRY_KSV_MATL_INVOICE.INVOICE_NO_STR}
                        onChange={(e) =>
                            onInputChangeQRY_KSV_MATL_INVOICE_INVOICE_NO_STR(
                                e,
                                "INVOICE_NO_STR",
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
                    {/* <p style={{ width: '8rem', display: 'inline-block' }}> . </p> */}
                    <div
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "23rem",
                        }}
                    >
                        <Dropdown
                            id="id_INVOICE_NO"
                            value={dataQRY_KSV_MATL_INVOICE_INVOICE_NO}
                            onChange={(e) =>
                                onDropdownChangeQRY_KSV_MATL_INVOICE_INVOICE_NO(
                                    e,
                                    "INVOICE_NO",
                                )
                            }
                            options={datasQRY_KSV_MATL_INVOICE_INVOICE_NO}
                            optionLabel="INVOICE_NO"
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
                    <p style={{ width: "8rem", display: "inline-block" }}>Freight Type</p>
                    <InputText
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "23rem",
                        }}
                        id="id_FREIGHT_TYPE"
                        value={dataQRY_KSV_MATL_INVOICE.FREIGHT_TYPE}
                        onChange={(e) =>
                            onInputChangeQRY_KSV_MATL_INVOICE_FREIGHT_TYPE(
                                e,
                                "FREIGHT_TYPE",
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
                        width: "48rem",
                    }}
                >
                    <p style={{ width: "8rem", display: "inline-block" }}>Confirm PL No</p>
                    <div
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "13rem",
                        }}
                    >
                        <Dropdown
                            id="id_PACK_NO"
                            value={dataQRY_KSV_MATL_INVOICE_PACK_NO}
                            onChange={(e) =>
                                onDropdownChangeQRY_KSV_MATL_INVOICE_PACK_NO(
                                    e,
                                    "PACK_NO",
                                )
                            }
                            options={datasQRY_KSV_MATL_INVOICE_PACK_NO}
                            optionLabel="PACK_CD"
                            placeholder=""
                            editable
                        ></Dropdown>
                    </div>
                    <span style={{ display: "inline-block" }}>
                        <Button
                            label="조회"
                            style={{ height: "1.1rem", marginLeft: "1rem" }}
                            className="p-button-text"
                            onClick={search_INVOICE_1}
                        />
                    </span>
                </span>
                <span
                    style={{
                        marginLeft: "0.5rem",
                        height: "2rem",
                        display: "inline-block",
                        width: "33rem",
                    }}
                >
                    <p style={{ width: "8rem", display: "inline-block" }}>Factory</p>
                    <InputText
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "23rem",
                        }}
                        id="id_FACTORY_NAME"
                        value={dataQRY_KSV_MATL_INVOICE.FACTORY_NAME}
                        onChange={(e) =>
                            onInputChangeQRY_KSV_MATL_INVOICE_FACTORY_NAME(
                                e,
                                "FACTORY_NAME",
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
                        width: "48rem",
                    }}
                >
                    <p style={{ width: "8rem", display: "inline-block" }}>Out Date</p>
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
                            id="id_OUT_DATE"
                            value={changeDateVal(
                                dataQRY_KSV_MATL_INVOICE.OUT_DATE,
                            )}
                            onChange={(e) =>
                                onCalChangeQRY_KSV_MATL_INVOICE_OUT_DATE(
                                    e,
                                    "OUT_DATE",
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
                    <p style={{ width: "8rem", display: "inline-block" }}>Total Amt</p>
                    <InputText
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "8rem",
                        }}
                        id="id_TOTAL_AMOUNT"
                        value={dataQRY_KSV_MATL_INVOICE.TOTAL_AMOUNT}
                        onChange={(e) =>
                            onInputChangeQRY_KSV_MATL_INVOICE_TOTAL_AMOUNT(
                                e,
                                "TOTAL_AMOUNT",
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
                    {/* <p style={{ width: '8rem', display: 'inline-block' }}> . </p> */}
                    <div
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "23rem",
                        }}
                    >
                        <Dropdown
                            id="id_CURR_CD"
                            value={dataQRY_KSV_MATL_INVOICE_CURR_CD}
                            onChange={(e) =>
                                onDropdownChangeQRY_KSV_MATL_INVOICE_CURR_CD(
                                    e,
                                    "CURR_CD",
                                )
                            }
                            options={datasQRY_KSV_MATL_INVOICE_CURR_CD}
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
                        width: "48rem",
                    }}
                ></span>
                <span
                    style={{
                        marginLeft: "0.5rem",
                        height: "2rem",
                        display: "inline-block",
                        width: "33rem",
                    }}
                >
                    <p style={{ width: "8rem", display: "inline-block" }}>Freight Amt</p>
                    <InputText
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "23rem",
                        }}
                        id="id_Freight_AMOUNT"
                        value={dataQRY_KSV_MATL_INVOICE.Freight_AMOUNT}
                        onChange={(e) =>
                            onInputChangeQRY_KSV_MATL_INVOICE_Freight_AMOUNT(
                                e,
                                "Freight_AMOUNT",
                            )
                        }
                        onKeyPress={(e) => onKeyPressFn(e, "Freight_AMOUNT")}
                    />
                </span>
                <span
                    style={{
                        marginLeft: "0.5rem",
                        height: "2rem",
                        display: "inline-block",
                        width: "48rem",
                    }}
                >
                    <p style={{ width: "8rem", display: "inline-block" }}>Curr Date</p>
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
                            id="id_CURR_DATE"
                            value={changeDateVal(
                                dataQRY_KSV_MATL_INVOICE.CURR_DATE,
                            )}
                            onChange={(e) =>
                                onCalChangeQRY_KSV_MATL_INVOICE_CURR_DATE(
                                    e,
                                    "CURR_DATE",
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
                    <p style={{ width: "8rem", display: "inline-block" }}>Curr Rate</p>
                    <InputText
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "23rem",
                        }}
                        id="id_CURR_RATE"
                        value={dataQRY_KSV_MATL_INVOICE.CURR_RATE}
                        onChange={(e) =>
                            onInputChangeQRY_KSV_MATL_INVOICE_CURR_RATE(
                                e,
                                "CURR_RATE",
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
                    <p style={{ width: "8rem", display: "inline-block" }}>Payment</p>
                    <div
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "13rem",
                        }}
                    >
                        <Dropdown
                            id="id_PAYMENT_TYPE"
                            value={dataQRY_KSV_MATL_INVOICE_PAYMENT_TYPE}
                            onChange={(e) =>
                                onDropdownChangeQRY_KSV_MATL_INVOICE_PAYMENT_TYPE(
                                    e,
                                    "PAYMENT_TYPE",
                                )
                            }
                            options={datasQRY_KSV_MATL_INVOICE_PAYMENT_TYPE}
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
                    <div style={{ display: "inline-block", width: "13rem" }}>
                        <Dropdown
                            id="id_TRADE_TYPE"
                            value={dataQRY_KSV_MATL_INVOICE_TRADE_TYPE}
                            onChange={(e) =>
                                onDropdownChangeQRY_KSV_MATL_INVOICE_TRADE_TYPE(
                                    e,
                                    "TRADE_TYPE",
                                )
                            }
                            options={datasQRY_KSV_MATL_INVOICE_TRADE_TYPE}
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
                            id="id_TRADE_KIND"
                            value={dataQRY_KSV_MATL_INVOICE_TRADE_KIND}
                            onChange={(e) =>
                                onDropdownChangeQRY_KSV_MATL_INVOICE_TRADE_KIND(
                                    e,
                                    "TRADE_KIND",
                                )
                            }
                            options={datasQRY_KSV_MATL_INVOICE_TRADE_KIND}
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
                        width: "23rem",
                    }}
                >
                    <p style={{ width: "8rem", display: "inline-block" }}>Toray</p>
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
                            id="id_IS_M_PO"
                        />
                    </div>
                    <span style={{ display: "inline-block" }}>
                        <Button
                            label="면허 Upd"
                            style={{ height: "1.1rem", marginLeft: "1rem" }}
                            className="p-button-text"
                            onClick={blankFn}
                        />
                    </span>
                </span>
            </div>
            <div style={{ width: "100rem", height: "5rem" }}>
                <span
                    style={{
                        marginLeft: "0.5rem",
                        height: "2rem",
                        display: "inline-block",
                        width: "33rem",
                    }}
                >
                    <p style={{ width: "8rem", display: "inline-block" }}>전표번호</p>
                    <InputText
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "23rem",
                        }}
                        id="id_DOCU_NO"
                        value={dataQRY_KSV_MATL_INVOICE.DOCU_NO}
                        onChange={(e) =>
                            onInputChangeQRY_KSV_MATL_INVOICE_DOCU_NO(
                                e,
                                "DOCU_NO",
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
                    <p style={{ width: "8rem", display: "inline-block" }}>License No</p>
                    <InputText
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "23rem",
                        }}
                        id="id_LICENSE_NO"
                        value={dataQRY_KSV_MATL_INVOICE.LICENSE_NO}
                        onChange={(e) =>
                            onInputChangeQRY_KSV_MATL_INVOICE_LICENSE_NO(
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
                    <p style={{ width: "8rem", display: "inline-block" }}>License Date</p>
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
                            id="id_LICENSE_Date"
                            value={changeDateVal(
                                dataQRY_KSV_MATL_INVOICE.LICENSE_Date,
                            )}
                            onChange={(e) =>
                                onCalChangeQRY_KSV_MATL_INVOICE_LICENSE_Date(
                                    e,
                                    "LICENSE_Date",
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
                    <p style={{ width: "8rem", display: "inline-block" }}>Neoe No</p>
                    <div
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "23rem",
                        }}
                    >
                        <Dropdown
                            id="id_NEOE_NO"
                            value={dataQRY_KSV_MATL_INVOICE_NEOE_NO}
                            onChange={(e) =>
                                onDropdownChangeQRY_KSV_MATL_INVOICE_NEOE_NO(
                                    e,
                                    "NEOE_NO",
                                )
                            }
                            options={datasQRY_KSV_MATL_INVOICE_NEOE_NO}
                            optionLabel="LN_PARTNER"
                            placeholder=""
                            editable
                        ></Dropdown>
                    </div>
                </span>
                <span style={{ display: "inline-block" }}>
                    <Button
                        label="자동전표생성"
                        icon="pi pi-check"
                        style={{ height: "1.1rem" }}
                        className="p-button-text"
                        onClick={searchTBL_KSV_MATL_INVOICE}
                    />

                    <Button
                        label="전표취소"
                        icon="pi pi-times"
                        style={{ height: "1.1rem" }}
                        className="p-button-text"
                        onClick={exportExcelTBL_KSV_MATL_INVOICE}
                    />
                </span>
            </div>

            <div
                style={{
                    marginLeft: "1rem",
                    marginTop: "1rem",
                    width: "99rem",
                    height: "30rem",
                }}
            >
                <AFDataTable preventUnrelatedRerender
                    ref={dt_TBL_KSV_MATL_INVOICE}
                    size="small"
                    value={datasTBL_KSV_MATL_INVOICE}
                    resizableColumns
                    columnResizeMode="fit"
                    showGridlines
                    selectionMode="checkbox"
                    selection={selectedTBL_KSV_MATL_INVOICE}
                    onSelectionChange={(e) => {
                        setFlagSelectModeTBL_KSV_MATL_INVOICE(true);
                        setSelectedTBL_KSV_MATL_INVOICE(e.value);
                        console.log(
                            "selected length:" +
                                selectedTBL_KSV_MATL_INVOICE.length,
                        );
                        onRowClick1TBL_KSV_MATL_INVOICE(e.value);
                    }}
                    onRowClick={onRowClickTBL_KSV_MATL_INVOICE}
                    dataKey="id"
                    className="datatable-responsive"
                    virtualScrollerOptions={{ itemSize: 50 }}
                    emptyMessage=" " //header={headerTBL_KSV_MATL_INVOICE}
                    responsiveLayout="scroll"
                    scrollable
                    scrollHeight="28rem"
                >
                    <AFColumn field="PACK_CD" headerClassName="t-header" header="PL No" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="PO_CD" headerClassName="t-header" header="Po No" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="PO_AMT" headerClassName="t-header" header="Po Amt" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="DELIVERY_AMT" headerClassName="t-header" header="Delivery Amt" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="IN_DELIVERY_AMT" headerClassName="t-header" header="Delivery Amt" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
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
                            label="조회"
                            icon="pi pi-search"
                            className="p-button-text"
                            onClick={search_INVOICE}
                        />

                        <Button
                            style={{ display: "inline-block", width: "10rem" }}
                            label="등록"
                            icon="pi pi-check"
                            className="p-button-text"
                            onClick={insert_INVOICE}
                        />

                        <Button
                            style={{ display: "inline-block", width: "10rem" }}
                            label="수정"
                            icon="pi pi-check"
                            className="p-button-text"
                            onClick={blankFn}
                        />

                        <Button
                            style={{ display: "inline-block", width: "10rem" }}
                            label="삭제"
                            icon="pi pi-times"
                            className="p-button-text"
                            onClick={blankFn}
                        />

                        <Button
                            style={{ display: "inline-block", width: "10rem" }}
                            label="초기화"
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

export default React.memo(S0413_INVOICE_REG_MATL, comparisonFn);
