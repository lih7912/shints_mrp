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

import axios from "axios";
import apiOption from "../assets/env_graphql";

import { ServiceLib } from "../service/service_lib/ServiceLib";
import { ServiceS0530_INVOICE_LIST } from "../service/service_biz/ServiceS0530_INVOICE_LIST";

import "./page_common.scss";

const emptyKCD_CODE = {
    id: 0,
    CD_GROUP: "",
    CD_CODE: "",
    CD_NAME: "",
    CD_FLAG: "",
};

const emptyQRY_KSV_ORDER_SHIP = {
    FACTORY_CD: "",
    BUYER_CD: "",
    STYLE_CD: "",
    ORDER_CD: "",
    INVOICE_NO: "",
    S_DATE: "",
    E_DATE: "",
};

const emptyQRY_KSV_ORDER_SHIP1 = {
    ORDER_CD: "",
};

const emptyEDT_KSV_ORDER_SHIP = {
    INVOICE_NO: "",
    BL_NO: "",
    BL_FILE: "",
    EX_FACTORY_DATE: "",
    COUNTRY: "",
    PL_FILE: "",
    SHIP_DATE: "",
    SHIP_MODE: "",
    DEBIT_FILE: "",
    DELIVERY_TYPE: "",
};

const S0530_INVOICE_LIST = () => {
    const serviceLibRef = useRef(null);
    if (!serviceLibRef.current) {
        serviceLibRef.current = new ServiceLib();
        serviceLibRef.current.loginConfirm();
    }
    const serviceLib = serviceLibRef.current;
    const serviceS0530_INVOICE_LISTRef = useRef(null);
    if (!serviceS0530_INVOICE_LISTRef.current) serviceS0530_INVOICE_LISTRef.current = new ServiceS0530_INVOICE_LIST();
    const serviceS0530_INVOICE_LIST = serviceS0530_INVOICE_LISTRef.current;

    const toast = useRef(null);

    /* splitter 관련 */
    const [styleVal, setStyleVal] = useState({ width: "65vw" });

    const [urlIframe, setUrlIframe] = useState("");
    const [createDialog, setCreateDialog] = useState(false);
    const hideDialog = () => {
        setCreateDialog(false);
    };

    //
    const [dataKCD_FILEINFO_BL_FILE, setDataKCD_FILEINFO_BL_FILE] = useState(
        {},
    );
    const [dataKCD_FILEINFO_PL_FILE, setDataKCD_FILEINFO_PL_FILE] = useState(
        {},
    );

    const process_RESET = () => {
        var _tObj = { ...dataEDT_KSV_ORDER_SHIP };
        _tObj.INVOICE_NO = "";
        _tObj.SHIP_DATE = "";
        _tObj.EX_FACTORY_DATE = "";
        _tObj.BL_NO = "";
        _tObj.COUNTRY = " ";
        _tObj.SHIP_MODE = " ";
        _tObj.DELIVERY_TYPE = " ";
        _tObj.BL_FILE = "";
        _tObj.PL_FILE = "";
        _tObj.DEBIT_FILE = "";
        setDataEDT_KSV_ORDER_SHIP(_tObj);

        editEDT_KSV_ORDER_SHIP_COUNTRY(" ");
        editEDT_KSV_ORDER_SHIP_SHIP_MODE(" ");
        editEDT_KSV_ORDER_SHIP_DELIVERY_TYPE(" ");

        setDatasTBL_KSV_ORDER_SHIP1([]);
        setSelectedTBL_KSV_ORDER_SHIP1([]);
    };

    //
    const [data_HEADER_STR, setData_HEADER_STR] = useState([]);

    const dynamicColumns_1 = data_HEADER_STR.map((col, i) => {
        var tHeader = `id_msg_${col}_KSV_ORDER_MST_dt`;
        var tHeaderStr = serviceLib.getLocaleMessage(tHeader);
        var tCol = `COL_${i}`;
        return (
            <AFColumn field={tCol} header={tHeaderStr} headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
        );

        // return  <AFColumn field={tCol} header={tHeaderStr} headerStyle={{ width: '10rem',height:'1.8rem' }} bodyStyle={{ width: '10rem',height:'1.8rem' }} editor={(options) => cellEditorKSV_ORDER_MEM(options)} onCellEditComplete={onCellEditCompleteKSV_ORDER_MEM}></AFColumn>
        //       return  <AFColumn field={col.field} header={tHeaderStr} headerStyle={{ width: '10rem',height:'1.8rem' }} bodyStyle={{ width: '10rem',height:'1.8rem' }} ></AFColumn>
    });

    const search_CODE = () => {
        var _tData = { ...dataQRY_KSV_ORDER_SHIP };
        var tInObj = {};
        tInObj.BUYER_CD = _tData.BUYER_CD;

        serviceS0530_INVOICE_LIST.mgrQuery_CODE(tInObj).then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                if (_tData.BUYER_CD === "") {
                    setDatasQRY_KSV_ORDER_SHIP_FACTORY_CD(data.FACTORY_CD);
                    setDataQRY_KSV_ORDER_SHIP_FACTORY_CD(data.FACTORY_CD[0]);

                    setDatasQRY_KSV_ORDER_SHIP_STYLE_CD(data.STYLE_CD);
                    setDataQRY_KSV_ORDER_SHIP_STYLE_CD(data.STYLE_CD[0]);

                    setDatasQRY_KSV_ORDER_SHIP_BUYER_CD(data.BUYER_CD);
                    setDataQRY_KSV_ORDER_SHIP_BUYER_CD(data.BUYER_CD[0]);

                    setDatasEDT_KSV_ORDER_SHIP_COUNTRY(data.NAT_CD);
                    setDataEDT_KSV_ORDER_SHIP_COUNTRY(data.NAT_CD[0]);

                    setDatasEDT_KSV_ORDER_SHIP_SHIP_MODE(data.SHIP_MODE);
                    setDataEDT_KSV_ORDER_SHIP_SHIP_MODE(data.SHIP_MODE[0]);

                    setDatasEDT_KSV_ORDER_SHIP_DELIVERY_TYPE(
                        data.DELIVERY_TYPE,
                    );
                    setDataEDT_KSV_ORDER_SHIP_DELIVERY_TYPE(
                        data.DELIVERY_TYPE[0],
                    );
                } else {
                    setDatasQRY_KSV_ORDER_SHIP_STYLE_CD(data.STYLE_CD);
                    setDataQRY_KSV_ORDER_SHIP_STYLE_CD(data.STYLE_CD[0]);
                }
            } else {
                console.log(
                    "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });
    };

    const search_LIST_0 = () => {
        var _tData = { ...dataQRY_KSV_ORDER_SHIP };

        if (_tData.FACTORY_CD === "" || _tData.BUYER_CD === "") {
            alert("Factory, Buyer는 필수입력값 입니다.<br><br>Factory and Buyer are required input values.");
            return;
        }

        setDatasTBL_KSV_ORDER_SHIP0([]);
        setSelectedTBL_KSV_ORDER_SHIP0([]);

        // 2
        setLoadingTBL_KSV_ORDER_SHIP0(true);
        serviceS0530_INVOICE_LIST.mgrQuery_LIST_0(_tData).then((data) => {
            setLoadingTBL_KSV_ORDER_SHIP0(false);
            if (typeof data.graphQLErrors === "undefined") {
                console.log(
                    "ServiceMgrKCD_BUYER.mgr1KcdStyle call => " + data.length,
                );
                var tArray2 = data.map((col, i) => {
                    var tObj = { ...col };
                    tObj.id = i + 1;
                    return tObj;
                });
                setDatasTBL_KSV_ORDER_SHIP0(tArray2);
            } else {
                console.log(
                    "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });
        search_CODE();
    };

    const search_LIST_1 = (argInvoiceNo) => {
        var _tData = { ...dataQRY_KSV_ORDER_SHIP };

        if (_tData.FACTORY_CD === "" || _tData.BUYER_CD === "") {
            alert("Factory, Buyer는 필수입력값 입니다.<br><br>Factory and Buyer are required input values.");
            return;
        }

        _tData.INVOICE_NO = argInvoiceNo;

        setDatasTBL_KSV_ORDER_SHIP([]);
        setSelectedTBL_KSV_ORDER_SHIP([]);

        // 2
        setLoadingTBL_KSV_ORDER_SHIP(true);
        serviceS0530_INVOICE_LIST.mgrQuery_LIST_1(_tData).then((data) => {
            setLoadingTBL_KSV_ORDER_SHIP(false);
            if (typeof data.graphQLErrors === "undefined") {
                console.log(
                    "ServiceMgrKCD_BUYER.mgr1KcdStyle call => " + data.length,
                );
                var tArray2 = data.map((col, i) => {
                    var tObj = { ...col };
                    tObj.id = i + 1;
                    return tObj;
                });
                setDatasTBL_KSV_ORDER_SHIP(tArray2);
            } else {
                console.log(
                    "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });
    };

    const search_LIST_3 = () => {
        var tInput0 = { ...dataQRY_KSV_ORDER_SHIP };
        var tInput = { ...dataQRY_KSV_ORDER_SHIP1 };

        setDatasTBL_KSV_ORDER_SHIP2([]);
        setSelectedTBL_KSV_ORDER_SHIP2([]);

        var tInObj = {};
        tInObj.ORDER_CD = tInput.ORDER_CD;
        tInObj.BUYER_CD = tInput0.BUYER_CD;

        // 4
        serviceS0530_INVOICE_LIST.mgrQuery_LIST_3(tInObj).then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                console.log(
                    "ServiceMgrKCD_BUYER.mgr1KcdStyle call => " + data.length,
                );
                var tArray = data.map((col, i) => {
                    var tOne = { ...col };
                    tOne.id = i + 1;
                    tOne.BAL_QTY = String(
                        parseFloat(tOne.TOT_QTY) - parseFloat(tOne.SHIP_QTY),
                    );
                    return tOne;
                });
                setDatasTBL_KSV_ORDER_SHIP2(tArray);
            } else {
                console.log(
                    "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });
    };

    const process_APPLY = () => {
        var data = [...selectedTBL_KSV_ORDER_SHIP2];
        var tArray = [];
        var tIdx = 0;
        var tSeq = 0;
        for (tIdx = 0; tIdx < data.length; tIdx++) {
            var tOne = { ...data[tIdx] };
            var tSizeArray = tOne.SIZE_MEMBER.split(",");
            tSizeArray.forEach((col, i) => {
                var tOne1 = { ...tOne };
                tOne1.SIZE = col;
                tOne1.TOT_CNT = String(
                    parseInt(tOne.ORDER_SIZE_CNT.substring(i * 6, i * 6 + 6)),
                );
                if (tOne.SHIP_SIZE_CNT === "") tOne1.SHIP_CNT = String(0);
                else
                    tOne1.SHIP_CNT = String(
                        parseInt(
                            tOne.SHIP_SIZE_CNT.substring(i * 6, i * 6 + 6),
                        ),
                    );
                if (tOne.SHIP_CNT > tOne.TOT_CNT)
                    tOne1.REMAIN_QTY = String("0");
                else tOne1.REMAIN_QTY = String(tOne1.TOT_CNT - tOne1.SHIP_CNT);
                tOne1.IN_SHIP_QTY = String(tOne1.IN_SHIP_QTY);
                tOne1.SHIP_QTY = String(0);
                tOne1.AMOUNT = String(0);
                tOne1.id = tSeq;
                tSeq += 1;
                if (i > 0) {
                    tOne1.ORDER_CD = "";
                    tOne1.STYLE_NAME = "";
                    tOne1.COLOR = "";
                }
                tArray.push(tOne1);
            });
        }
        setDatasTBL_KSV_ORDER_SHIP1(tArray);
        setCreateDialog(false);
    };

    const process_INSERT = () => {
        var _tData0 = { ...dataEDT_KSV_ORDER_SHIP };
        var _tDataArray = [...datasTBL_KSV_ORDER_SHIP1];

        var _tArray = [];
        var _tWorkObj = {};
        _tDataArray.forEach((col, i) => {
            if (col.ORDER_CD !== "") {
                if (typeof _tWorkObj.ORDER_CD !== "undefined") {
                    _tWorkObj.IN_SHIP_QTY = String(_tWorkObj.IN_SHIP_QTY);
                    _tArray.push(_tWorkObj);
                }
                _tWorkObj = { ...col };
                _tWorkObj.IN_SHIP_QTY = parseInt(_tWorkObj.SHIP_QTY);
                let tZero = "000000";
                _tWorkObj.IN_SHIP_SIZE_CNT =
                    tZero.substring(
                        0,
                        6 - String(_tWorkObj.IN_SHIP_QTY).length,
                    ) + String(_tWorkObj.IN_SHIP_QTY);
            } else {
                var tShipQty = parseInt(col.SHIP_QTY);
                _tWorkObj.IN_SHIP_QTY += tShipQty;
                let tZero = "000000";
                _tWorkObj.IN_SHIP_SIZE_CNT =
                    _tWorkObj.IN_SHIP_SIZE_CNT +
                    tZero.substring(0, 6 - String(tShipQty).length) +
                    String(tShipQty);
            }
        });
        _tWorkObj.IN_SHIP_QTY = String(_tWorkObj.IN_SHIP_QTY);
        _tArray.push(_tWorkObj);

        var tInData1 = {};
        tInData1.INVOICE_NO = _tData0.INVOICE_NO;
        tInData1.SHIP_DATE = _tData0.SHIP_DATE;
        tInData1.EX_FACTORY_DATE = _tData0.EX_FACTORY_DATE;
        tInData1.DELIVERY_TYPE = _tData0.DELIVERY_TYPE;
        tInData1.SHIP_MODE = _tData0.SHIP_MODE;
        tInData1.COUNTRY = _tData0.COUNTRY;
        tInData1.USER_ID = serviceLib.getUserInfo().USER_ID;
        tInData1.BL_NO = _tData0.BL_NO;

        var tInData = _tArray.map((col, i) => {
            var tObj = {};
            tObj.COLOR = col.COLOR;
            tObj.IN_SHIP_QTY = col.IN_SHIP_QTY;
            tObj.IN_SHIP_SIZE_CNT = col.IN_SHIP_SIZE_CNT;
            tObj.ORDER_CD = col.ORDER_CD;
            tObj.PRICE = col.PRICE;
            tObj.PROD_CD = col.PROD_CD;
            tObj.PO_CD = col.PO_CD;
            return tObj;
        });

        console.log(tInData);
        console.log(tInData1);

        setLoadingTBL_KSV_ORDER_SHIP(true);
        serviceS0530_INVOICE_LIST
            .mgrInsert_INSERT_ORDER_SHIP(tInData, tInData1)
            .then((data) => {
                setLoadingTBL_KSV_ORDER_SHIP(false);
                if (typeof data.graphQLErrors === "undefined") {
                    if (typeof data.length === "undefined") {
                    } else {
                        if (data.length > 0) {
                            alert(data[0].CODE);
                            search_LIST_1();
                        }
                        // console.log("ServiceMgrKCD_BUYER.mgr1KcdStyle call => " + data.length);
                    }
                } else {
                    alert(JSON.stringify(data.graphQLErrors));
                    console.log(
                        "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });
    };

    /*QRY KSV_STOCK_FACOUT */
    const [dataQRY_KSV_ORDER_SHIP, setDataQRY_KSV_ORDER_SHIP] = useState(
        emptyQRY_KSV_ORDER_SHIP,
    );

    const [
        datasQRY_KSV_ORDER_SHIP_FACTORY_CD,
        setDatasQRY_KSV_ORDER_SHIP_FACTORY_CD,
    ] = useState([]);
    const [
        dataQRY_KSV_ORDER_SHIP_FACTORY_CD,
        setDataQRY_KSV_ORDER_SHIP_FACTORY_CD,
    ] = useState({});

    const onDropdownChangeQRY_KSV_ORDER_SHIP_FACTORY_CD = (e, name) => {
        let val = (e.value && e.value.FACTORY_CD) || "";

        let _dataQRY_KSV_ORDER_SHIP = { ...dataQRY_KSV_ORDER_SHIP };

        let tTypeVal = _dataQRY_KSV_ORDER_SHIP[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_ORDER_SHIP[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_ORDER_SHIP[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_ORDER_SHIP(_dataQRY_KSV_ORDER_SHIP);
        setDataQRY_KSV_ORDER_SHIP_FACTORY_CD(e.value);
    };

    const [
        datasQRY_KSV_ORDER_SHIP_STYLE_CD,
        setDatasQRY_KSV_ORDER_SHIP_STYLE_CD,
    ] = useState([]);
    const [
        dataQRY_KSV_ORDER_SHIP_STYLE_CD,
        setDataQRY_KSV_ORDER_SHIP_STYLE_CD,
    ] = useState({});

    const [
        datasQRY_KSV_ORDER_SHIP_BUYER_CD,
        setDatasQRY_KSV_ORDER_SHIP_BUYER_CD,
    ] = useState([]);
    const [
        dataQRY_KSV_ORDER_SHIP_BUYER_CD,
        setDataQRY_KSV_ORDER_SHIP_BUYER_CD,
    ] = useState({});

    const onDropdownChangeQRY_KSV_ORDER_SHIP_BUYER_CD = (e, name) => {
        let val = "";
        if (typeof e.value === "string") {
            val = e.value;
        } else {
            val = (e.value && e.value.BUYER_CD) || "";
        }

        let _dataQRY_KSV_ORDER_SHIP = { ...dataQRY_KSV_ORDER_SHIP };

        let tTypeVal = _dataQRY_KSV_ORDER_SHIP[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_ORDER_SHIP[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_ORDER_SHIP[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_ORDER_SHIP(_dataQRY_KSV_ORDER_SHIP);
        setDataQRY_KSV_ORDER_SHIP_BUYER_CD(e.value);
    };

    const onInputChangeQRY_KSV_ORDER_SHIP_INVOICE_NO = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_ORDER_SHIP = { ...dataQRY_KSV_ORDER_SHIP };

        let tTypeVal = _dataQRY_KSV_ORDER_SHIP[`${name}`];
        if (typeof tTypeVal === "string")
            _dataQRY_KSV_ORDER_SHIP[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_ORDER_SHIP[`${name}`] = parseInt(val);

        setDataQRY_KSV_ORDER_SHIP(_dataQRY_KSV_ORDER_SHIP);
    };

    const onCalChangeQRY_KSV_ORDER_SHIP_S_DATE = (e, name) => {
        let val1 = e.value || "";
        let val = "";
        if (val1 === "") {
            val = "";
        } else {
            val = getDateVal(val1);
        }

        let _dataQRY_KSV_ORDER_SHIP = { ...dataQRY_KSV_ORDER_SHIP };
        _dataQRY_KSV_ORDER_SHIP[`${name}`] = val;
        setDataQRY_KSV_ORDER_SHIP(_dataQRY_KSV_ORDER_SHIP);
    };

    const onCalChangeQRY_KSV_ORDER_SHIP_E_DATE = (e, name) => {
        let val1 = e.value || "";
        let val = "";
        if (val1 === "") {
            val = "";
        } else {
            val = getDateVal(val1);
        }

        let _dataQRY_KSV_ORDER_SHIP = { ...dataQRY_KSV_ORDER_SHIP };
        _dataQRY_KSV_ORDER_SHIP[`${name}`] = val;
        setDataQRY_KSV_ORDER_SHIP(_dataQRY_KSV_ORDER_SHIP);
    };

    /*QRY KSV_STOCK_FACOUT */
    const [dataQRY_KSV_ORDER_SHIP1, setDataQRY_KSV_ORDER_SHIP1] = useState(
        emptyQRY_KSV_ORDER_SHIP1,
    );

    const onInputChangeQRY_KSV_ORDER_SHIP1_ORDER_CD = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_ORDER_SHIP1 = { ...dataQRY_KSV_ORDER_SHIP1 };

        let tTypeVal = _dataQRY_KSV_ORDER_SHIP1[`${name}`];
        if (typeof tTypeVal === "string")
            _dataQRY_KSV_ORDER_SHIP1[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_ORDER_SHIP1[`${name}`] = parseInt(val);

        setDataQRY_KSV_ORDER_SHIP1(_dataQRY_KSV_ORDER_SHIP1);
    };

    /*QRY KSV_STOCK_FACOUT */
    const [dataEDT_KSV_ORDER_SHIP, setDataEDT_KSV_ORDER_SHIP] = useState(
        emptyEDT_KSV_ORDER_SHIP,
    );

    const onInputChangeEDT_KSV_ORDER_SHIP_INVOICE_NO = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_ORDER_SHIP = { ...dataEDT_KSV_ORDER_SHIP };

        let tTypeVal = _dataEDT_KSV_ORDER_SHIP[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_ORDER_SHIP[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_ORDER_SHIP[`${name}`] = parseInt(val);

        setDataEDT_KSV_ORDER_SHIP(_dataEDT_KSV_ORDER_SHIP);
    };

    const onInputChangeEDT_KSV_ORDER_SHIP_BL_NO = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_ORDER_SHIP = { ...dataEDT_KSV_ORDER_SHIP };

        let tTypeVal = _dataEDT_KSV_ORDER_SHIP[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_ORDER_SHIP[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_ORDER_SHIP[`${name}`] = parseInt(val);

        setDataEDT_KSV_ORDER_SHIP(_dataEDT_KSV_ORDER_SHIP);
    };

    const onInputChangeEDT_KSV_ORDER_SHIP_BL_FILE = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_ORDER_SHIP = { ...dataEDT_KSV_ORDER_SHIP };

        let tTypeVal = _dataEDT_KSV_ORDER_SHIP[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_ORDER_SHIP[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_ORDER_SHIP[`${name}`] = parseInt(val);

        setDataEDT_KSV_ORDER_SHIP(_dataEDT_KSV_ORDER_SHIP);
    };

    const onInputChangeEDT_KSV_ORDER_SHIP_PL_FILE = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_ORDER_SHIP = { ...dataEDT_KSV_ORDER_SHIP };

        let tTypeVal = _dataEDT_KSV_ORDER_SHIP[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_ORDER_SHIP[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_ORDER_SHIP[`${name}`] = parseInt(val);

        setDataEDT_KSV_ORDER_SHIP(_dataEDT_KSV_ORDER_SHIP);
    };

    const onCalChangeEDT_KSV_ORDER_SHIP_EX_FACTORY_DATE = (e, name) => {
        let val1 = e.value || "";
        let val = "";
        if (val1 === "") {
            val = "";
        } else {
            val = getDateVal(val1);
        }

        let _dataEDT_KSV_ORDER_SHIP = { ...dataEDT_KSV_ORDER_SHIP };
        _dataEDT_KSV_ORDER_SHIP[`${name}`] = val;
        setDataEDT_KSV_ORDER_SHIP(_dataEDT_KSV_ORDER_SHIP);
    };

    const onCalChangeEDT_KSV_ORDER_SHIP_SHIP_DATE = (e, name) => {
        let val1 = e.value || "";
        let val = "";
        if (val1 === "") {
            val = "";
        } else {
            val = getDateVal(val1);
        }

        let _dataEDT_KSV_ORDER_SHIP = { ...dataEDT_KSV_ORDER_SHIP };
        _dataEDT_KSV_ORDER_SHIP[`${name}`] = val;
        setDataEDT_KSV_ORDER_SHIP(_dataEDT_KSV_ORDER_SHIP);
    };

    const [
        datasEDT_KSV_ORDER_SHIP_COUNTRY,
        setDatasEDT_KSV_ORDER_SHIP_COUNTRY,
    ] = useState([]);
    const [dataEDT_KSV_ORDER_SHIP_COUNTRY, setDataEDT_KSV_ORDER_SHIP_COUNTRY] =
        useState({});

    const editEDT_KSV_ORDER_SHIP_COUNTRY = (argValue) => {
        let _dataEDT_KSV_ORDER_SHIP_COUNTRY =
            datasEDT_KSV_ORDER_SHIP_COUNTRY.filter(
                (val) => val.NAT_CD === argValue,
            );
        setDataEDT_KSV_ORDER_SHIP_COUNTRY(_dataEDT_KSV_ORDER_SHIP_COUNTRY[0]);
    };

    const onDropdownChangeEDT_KSV_ORDER_SHIP_COUNTRY = (e, name) => {
        let val = (e.value && e.value.NAT_CD) || "";

        let _dataEDT_KSV_ORDER_SHIP = { ...dataEDT_KSV_ORDER_SHIP };

        let tTypeVal = _dataEDT_KSV_ORDER_SHIP[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_KSV_ORDER_SHIP[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_KSV_ORDER_SHIP[`${name}`] = parseInt(val);
        }

        setDataEDT_KSV_ORDER_SHIP(_dataEDT_KSV_ORDER_SHIP);
        setDataEDT_KSV_ORDER_SHIP_COUNTRY(e.value);
    };

    const [
        datasEDT_KSV_ORDER_SHIP_SHIP_MODE,
        setDatasEDT_KSV_ORDER_SHIP_SHIP_MODE,
    ] = useState([]);
    const [
        dataEDT_KSV_ORDER_SHIP_SHIP_MODE,
        setDataEDT_KSV_ORDER_SHIP_SHIP_MODE,
    ] = useState({});

    const editEDT_KSV_ORDER_SHIP_SHIP_MODE = (argValue) => {
        let _dataEDT_KSV_ORDER_SHIP_SHIP_MODE =
            datasEDT_KSV_ORDER_SHIP_SHIP_MODE.filter(
                (val) => val.CD_CODE === argValue,
            );
        setDataEDT_KSV_ORDER_SHIP_SHIP_MODE(
            _dataEDT_KSV_ORDER_SHIP_SHIP_MODE[0],
        );
    };

    const onDropdownChangeEDT_KSV_ORDER_SHIP_SHIP_MODE = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataEDT_KSV_ORDER_SHIP = { ...dataEDT_KSV_ORDER_SHIP };

        let tTypeVal = _dataEDT_KSV_ORDER_SHIP[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_KSV_ORDER_SHIP[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_KSV_ORDER_SHIP[`${name}`] = parseInt(val);
        }

        setDataEDT_KSV_ORDER_SHIP(_dataEDT_KSV_ORDER_SHIP);
        setDataEDT_KSV_ORDER_SHIP_SHIP_MODE(e.value);
    };

    const [
        datasEDT_KSV_ORDER_SHIP_DELIVERY_TYPE,
        setDatasEDT_KSV_ORDER_SHIP_DELIVERY_TYPE,
    ] = useState([]);
    const [
        dataEDT_KSV_ORDER_SHIP_DELIVERY_TYPE,
        setDataEDT_KSV_ORDER_SHIP_DELIVERY_TYPE,
    ] = useState({});

    const editEDT_KSV_ORDER_SHIP_DELIVERY_TYPE = (argValue) => {
        let _dataEDT_KSV_ORDER_SHIP_DELIVERY_TYPE =
            datasEDT_KSV_ORDER_SHIP_DELIVERY_TYPE.filter(
                (val) => val.CD_CODE === argValue,
            );
        setDataEDT_KSV_ORDER_SHIP_DELIVERY_TYPE(
            _dataEDT_KSV_ORDER_SHIP_DELIVERY_TYPE[0],
        );
    };

    const onDropdownChangeEDT_KSV_ORDER_SHIP_DELIVERY_TYPE = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataEDT_KSV_ORDER_SHIP = { ...dataEDT_KSV_ORDER_SHIP };

        let tTypeVal = _dataEDT_KSV_ORDER_SHIP[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_KSV_ORDER_SHIP[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_KSV_ORDER_SHIP[`${name}`] = parseInt(val);
        }

        setDataEDT_KSV_ORDER_SHIP(_dataEDT_KSV_ORDER_SHIP);
        setDataEDT_KSV_ORDER_SHIP_DELIVERY_TYPE(e.value);
    };

    /* TABLE KSV_STOCK_FACOUT*/
    // DEFINE DATAGRID : TBL_KSV_ORDER_SHIP
    let emptyTBL_KSV_ORDER_SHIP = {};

    const [datasTBL_KSV_ORDER_SHIP, setDatasTBL_KSV_ORDER_SHIP] = useState([]);
    const dt_TBL_KSV_ORDER_SHIP = useRef(null);
    const [dataTBL_KSV_ORDER_SHIP, setDataTBL_KSV_ORDER_SHIP] = useState(
        emptyTBL_KSV_ORDER_SHIP,
    );
    const [selectedTBL_KSV_ORDER_SHIP, setSelectedTBL_KSV_ORDER_SHIP] =
        useState([]);
    const [
        flagSelectModeTBL_KSV_ORDER_SHIP,
        setFlagSelectModeTBL_KSV_ORDER_SHIP,
    ] = useState(false);
    const [loadingTBL_KSV_ORDER_SHIP, setLoadingTBL_KSV_ORDER_SHIP] =
        useState(false);

    // DATAGRID CODE : TBL_KSV_ORDER_SHIP

    const onRowClick1TBL_KSV_ORDER_SHIP = (argData0) => {
        var argData = {};

        if (typeof argData0.length !== "undefined") {
            argData = argData0[0];
        } else {
            argData = argData0;
        }
    };

    const onRowClickTBL_KSV_ORDER_SHIP = (event) => {
        let argTBL_KSV_ORDER_SHIP = event.data;
        if (flagSelectModeTBL_KSV_ORDER_SHIP) return;

        // Service : NawooAll:mgrQueryTBL_KSV_ORDER_SHIP
    };

    /* TABLE KSV_STOCK_FACOUT*/
    // DEFINE DATAGRID : TBL_KSV_ORDER_SHIP0
    let emptyTBL_KSV_ORDER_SHIP0 = {};

    const [datasTBL_KSV_ORDER_SHIP0, setDatasTBL_KSV_ORDER_SHIP0] = useState(
        [],
    );
    const dt_TBL_KSV_ORDER_SHIP0 = useRef(null);
    const [dataTBL_KSV_ORDER_SHIP0, setDataTBL_KSV_ORDER_SHIP0] = useState(
        emptyTBL_KSV_ORDER_SHIP0,
    );
    const [selectedTBL_KSV_ORDER_SHIP0, setSelectedTBL_KSV_ORDER_SHIP0] =
        useState([]);
    const [
        flagSelectModeTBL_KSV_ORDER_SHIP0,
        setFlagSelectModeTBL_KSV_ORDER_SHIP0,
    ] = useState(false);
    const [loadingTBL_KSV_ORDER_SHIP0, setLoadingTBL_KSV_ORDER_SHIP0] =
        useState(false);

    // DATAGRID CODE : TBL_KSV_ORDER_SHIP0

    const onRowClick1TBL_KSV_ORDER_SHIP0 = (argData0) => {
        var argData = {};

        if (typeof argData0.length !== "undefined") {
            argData = argData0[0];
        } else {
            argData = argData0;
        }

        let argTBL_KSV_ORDER_SHIP0 = argData;

        setDataTBL_KSV_ORDER_SHIP0(argTBL_KSV_ORDER_SHIP0);

        var _tObj = { ...dataEDT_KSV_ORDER_SHIP };
        _tObj.INVOICE_NO = argData.INVOICE_NO;
        _tObj.SHIP_DATE = argData.SHIP_DATE;
        _tObj.EX_FACTORY_DATE = argData.EXFACTORY;
        _tObj.BL_NO = argData.BL_NO;
        _tObj.COUNTRY = argData.NAT_CD;
        _tObj.SHIP_MODE = argData.SHIP_PTYPE;
        _tObj.DELIVERY_TYPE = argData.DELIVERY_TYPE;
        _tObj.BL_FILE = argData.BL_FILE;
        _tObj.PL_FILE = argData.PL_FILE;
        _tObj.DEBIT_FILE = "";
        setDataEDT_KSV_ORDER_SHIP(_tObj);

        editEDT_KSV_ORDER_SHIP_COUNTRY(_tObj.COUNTRY);
        editEDT_KSV_ORDER_SHIP_SHIP_MODE(_tObj.SHIP_MODE);
        editEDT_KSV_ORDER_SHIP_DELIVERY_TYPE(_tObj.DELIVERY_TYPE);

        var tFileObj = {};
        tFileObj.NAME = argData.BL_FILE;
        tFileObj.URL = argData.BL_FILE_URL;
        setDataKCD_FILEINFO_BL_FILE(tFileObj);

        tFileObj = {};
        tFileObj.NAME = argData.PL_FILE;
        tFileObj.URL = argData.PL_FILE_URL;
        setDataKCD_FILEINFO_PL_FILE(tFileObj);

        var tInput = {};
        tInput.INVOICE_NO = argData.INVOICE_NO;
        tInput.BUYER_CD = argData.BUYER_CD;
        tInput.SHIP_DATE = argData.SHIP_DATE;
        tInput.NAT_CD = argData.NAT_CD;
        tInput.SHIP_MODE = argData.SHIP_PTYPE;
        tInput.ORDER_CD = argData.ORDER_CD;

        search_LIST_1(argData.INVOICE_NO);
    };

    const onRowClickTBL_KSV_ORDER_SHIP0 = (event) => {
        let argTBL_KSV_ORDER_SHIP0 = event.data;
        if (flagSelectModeTBL_KSV_ORDER_SHIP0) return;

        // Service : NawooAll:mgrQueryTBL_KSV_ORDER_SHIP0
    };

    /* TABLE KSV_STOCK_FACOUT*/
    // DEFINE DATAGRID : TBL_KSV_ORDER_SHIP1
    let emptyTBL_KSV_ORDER_SHIP1 = {};

    const [datasTBL_KSV_ORDER_SHIP1, setDatasTBL_KSV_ORDER_SHIP1] = useState(
        [],
    );
    const dt_TBL_KSV_ORDER_SHIP1 = useRef(null);
    const [dataTBL_KSV_ORDER_SHIP1, setDataTBL_KSV_ORDER_SHIP1] = useState(
        emptyTBL_KSV_ORDER_SHIP1,
    );
    const [selectedTBL_KSV_ORDER_SHIP1, setSelectedTBL_KSV_ORDER_SHIP1] =
        useState([]);
    const [
        flagSelectModeTBL_KSV_ORDER_SHIP1,
        setFlagSelectModeTBL_KSV_ORDER_SHIP1,
    ] = useState(false);

    // DATAGRID CODE : TBL_KSV_ORDER_SHIP1

    /* TABLE KSV_STOCK_FACOUT*/
    // DEFINE DATAGRID : TBL_KSV_ORDER_SHIP2
    let emptyTBL_KSV_ORDER_SHIP2 = {};

    const [datasTBL_KSV_ORDER_SHIP2, setDatasTBL_KSV_ORDER_SHIP2] = useState(
        [],
    );
    const dt_TBL_KSV_ORDER_SHIP2 = useRef(null);
    const [dataTBL_KSV_ORDER_SHIP2, setDataTBL_KSV_ORDER_SHIP2] = useState(
        emptyTBL_KSV_ORDER_SHIP2,
    );
    const [selectedTBL_KSV_ORDER_SHIP2, setSelectedTBL_KSV_ORDER_SHIP2] =
        useState([]);
    const [
        flagSelectModeTBL_KSV_ORDER_SHIP2,
        setFlagSelectModeTBL_KSV_ORDER_SHIP2,
    ] = useState(false);

    // DATAGRID CODE : TBL_KSV_ORDER_SHIP2

    const onRowClick1TBL_KSV_ORDER_SHIP2 = (argData0) => {
        var argData = {};

        if (typeof argData0.length !== "undefined") {
            argData = argData0[0];
        } else {
            argData = argData0;
        }

        let argTBL_KSV_ORDER_SHIP2 = argData;

        setDataTBL_KSV_ORDER_SHIP2(argTBL_KSV_ORDER_SHIP2);
    };

    const onRowClickTBL_KSV_ORDER_SHIP2 = (event) => {
        let argTBL_KSV_ORDER_SHIP2 = event.data;
        if (flagSelectModeTBL_KSV_ORDER_SHIP2) return;

        // Service : NawooAll:mgrQueryTBL_KSV_ORDER_SHIP2
    };

    //
    const s3FileUpload_BL_FILE = async (e) => {
        const fileName = e.target.files[0].name;
        const img = e.target.files[0];
        const formData = new FormData();
        formData.append("file", img);

        try {
            var tUrl = `${apiOption.apiuri}/restapi/imgUpload`;
            const s3UrlResponse = await axios.get(tUrl);
            console.log(s3UrlResponse.data.uploadURL);

            const presignedUrl = s3UrlResponse.data.uploadURL;
            const objectName = s3UrlResponse.data.imageName;
            await fetch(presignedUrl, {
                method: "PUT",
                headers: {
                    "Content-Type": img.type,
                },
                body: img,
            });

            const imgURL = s3UrlResponse.data.uploadURL.split("?")[0];
            var tEdtObj = { ...dataEDT_KSV_ORDER_SHIP };

            var tInObj = {};
            tInObj.KIND = "ORDER_SHIP_BL_FILE";
            tInObj.FILE_KEY = tEdtObj.INVOICE_NO;
            tInObj.TITLE = `order_ship doc:${tInObj.FILE_KEY}`;
            tInObj.NAME = fileName;
            tInObj.URL = imgURL;
            tInObj.OBJECT_NAME = objectName;
            serviceS0530_INVOICE_LIST
                .mgrInsert_FILE_ADD(tInObj)
                .then((data) => {
                    if (typeof data.graphQLErrors === "undefined") {
                        if (data.length > 0) {
                            alert(data[0].CODE);
                            if (data[0].CODE.includes("SUCC")) {
                                tEdtObj.BL_FILE = tInObj.NAME;
                                setDataEDT_KSV_ORDER_SHIP(tEdtObj);
                                setDataKCD_FILEINFO_BL_FILE(tInObj);
                            }
                        }
                    } else {
                        toast.current.show({
                            severity: "success",
                            summary: "Info",
                            detail: "",
                            life: 3000,
                        });
                        // console.log("ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " + JSON.stringify(data.graphQLErrors));
                    }
                });
        } catch (err) {
            console.log(err);
        }
    };

    const s3FileUpload_PL_FILE = async (e) => {
        var tEdtObj = { ...dataEDT_KSV_ORDER_SHIP };
        if (tEdtObj.INVOICE_NO === "") {
            alert("invoice no가 입력되지 않았습니다<br><br>invoice no has not been entered");
            return;
        }

        const fileName = e.target.files[0].name;
        const img = e.target.files[0];
        const formData = new FormData();
        formData.append("file", img);

        try {
            var tUrl = `${apiOption.apiuri}/restapi/imgUpload`;
            const s3UrlResponse = await axios.get(tUrl);
            console.log(s3UrlResponse.data.uploadURL);

            const presignedUrl = s3UrlResponse.data.uploadURL;
            const objectName = s3UrlResponse.data.imageName;
            await fetch(presignedUrl, {
                method: "PUT",
                headers: {
                    "Content-Type": img.type,
                },
                body: img,
            });

            const imgURL = s3UrlResponse.data.uploadURL.split("?")[0];

            var tInObj = {};
            tInObj.KIND = "ORDER_SHIP_PL_FILE";
            tInObj.FILE_KEY = tEdtObj.INVOICE_NO;
            tInObj.TITLE = `order_ship doc:${tInObj.FILE_KEY}`;
            tInObj.NAME = fileName;
            tInObj.URL = imgURL;
            tInObj.OBJECT_NAME = objectName;
            serviceS0530_INVOICE_LIST
                .mgrInsert_FILE_ADD(tInObj)
                .then((data) => {
                    if (typeof data.graphQLErrors === "undefined") {
                        if (data.length > 0) {
                            alert(data[0].CODE);
                            if (data[0].CODE.includes("SUCC")) {
                                tEdtObj.PL_FILE = tInObj.NAME;
                                setDataEDT_KSV_ORDER_SHIP(tEdtObj);
                                setDataKCD_FILEINFO_PL_FILE(tInObj);
                            }
                        }
                    } else {
                        toast.current.show({
                            severity: "success",
                            summary: "Info",
                            detail: "",
                            life: 3000,
                        });
                        // console.log("ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " + JSON.stringify(data.graphQLErrors));
                    }
                });
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        var _tObj = {};
        _tObj.BUYER_CD = "";

        serviceS0530_INVOICE_LIST.mgrQuery_CODE(_tObj).then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                setDatasQRY_KSV_ORDER_SHIP_FACTORY_CD(data.FACTORY_CD);
                setDataQRY_KSV_ORDER_SHIP_FACTORY_CD(data.FACTORY_CD[0]);

                setDatasQRY_KSV_ORDER_SHIP_STYLE_CD(data.STYLE_CD);
                setDataQRY_KSV_ORDER_SHIP_STYLE_CD(data.STYLE_CD[0]);

                setDatasQRY_KSV_ORDER_SHIP_BUYER_CD(data.BUYER_CD);
                setDataQRY_KSV_ORDER_SHIP_BUYER_CD(data.BUYER_CD[0]);

                setDatasEDT_KSV_ORDER_SHIP_COUNTRY(data.NAT_CD);
                setDataEDT_KSV_ORDER_SHIP_COUNTRY(data.NAT_CD[0]);

                setDatasEDT_KSV_ORDER_SHIP_SHIP_MODE(data.SHIP_MODE);
                setDataEDT_KSV_ORDER_SHIP_SHIP_MODE(data.SHIP_MODE[0]);

                setDatasEDT_KSV_ORDER_SHIP_DELIVERY_TYPE(data.DELIVERY_TYPE);
                setDataEDT_KSV_ORDER_SHIP_DELIVERY_TYPE(data.DELIVERY_TYPE[0]);
            } else {
                console.log(
                    "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });

        // search_LIST_1();
    }, []);

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
        <div className="af-div-main">
            <div
                className="af-div-first"
                style={{ width: "123rem", height: "3rem" }}
            >
                <span className="af-span-3-0" style={{ width: "20rem" }}>
                    <p className="af-span-p" style={{ width: "7rem" }}>Factory#</p>
                    <div className="af-span-div" style={{ width: "12rem" }}>
                        <Dropdown
                            style={{ width: "12rem" }}
                            id="id_ORDER_CD"
                            value={dataQRY_KSV_ORDER_SHIP_FACTORY_CD}
                            onChange={(e) =>
                                onDropdownChangeQRY_KSV_ORDER_SHIP_FACTORY_CD(
                                    e,
                                    "FACTORY_CD",
                                )
                            }
                            options={datasQRY_KSV_ORDER_SHIP_FACTORY_CD}
                            optionLabel="FACTORY_NAME"
                            placeholder=""
                            editable
                        ></Dropdown>
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "23rem" }}>
                    <p className="af-span-p" style={{ width: "7rem" }}>Buyer#</p>
                    <div className="af-span-div" style={{ width: "15rem" }}>
                        <Dropdown
                            style={{ width: "15rem" }}
                            id="id_ORDER_CD"
                            filter
                            editable
                            value={dataQRY_KSV_ORDER_SHIP_BUYER_CD}
                            onChange={(e) =>
                                onDropdownChangeQRY_KSV_ORDER_SHIP_BUYER_CD(
                                    e,
                                    "BUYER_CD",
                                )
                            }
                            options={datasQRY_KSV_ORDER_SHIP_BUYER_CD}
                            optionLabel="BUYER_NAME"
                            placeholder=""
                            editable
                        ></Dropdown>
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "23rem" }}>
                    <p className="af-span-p" style={{ width: "7rem" }}>Invoice#</p>
                    <div className="af-span-div" style={{ width: "15rem" }}>
                        <InputText
                            style={{ width: "15rem" }}
                            id="id_PO_CD"
                            value={dataQRY_KSV_ORDER_SHIP.INVOICE_NO}
                            onChange={(e) =>
                                onInputChangeQRY_KSV_ORDER_SHIP_INVOICE_NO(
                                    e,
                                    "INVOICE_NO",
                                )
                            }
                        />
                    </div>
                </span>

                <span className="af-span-3" style={{ width: "17rem" }}>
                    <p className="af-span-p" style={{ width: "8rem" }}>Ship Date</p>
                    <div className="af-span-div" style={{ width: "8rem" }}>
                        <Calendar
                            showButtonBar
                            style={{ width: "8rem" }}
                            dateFormat="yymmdd"
                            id="id_IN_DATE"
                            value={changeDateVal(dataQRY_KSV_ORDER_SHIP.S_DATE)}
                            onChange={(e) =>
                                onCalChangeQRY_KSV_ORDER_SHIP_S_DATE(
                                    e,
                                    "S_DATE",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "10rem" }}>
                    <p className="af-span-p" style={{ width: "1rem" }}>~</p>
                    <div className="af-span-div" style={{ width: "8rem" }}>
                        <Calendar
                            showButtonBar
                            style={{ width: "8rem" }}
                            dateFormat="yymmdd"
                            id="id_IN_DATE"
                            value={changeDateVal(dataQRY_KSV_ORDER_SHIP.E_DATE)}
                            onChange={(e) =>
                                onCalChangeQRY_KSV_ORDER_SHIP_E_DATE(
                                    e,
                                    "E_DATE",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "13rem" }}>
                    <div className="af-span-div-btn" style={{ width: "12rem" }}>
                        <Tooltip
                            className="menuCodeTooltip"
                            target={`#btnSearch`}
                            content={`Alt+S`}
                            position="bottom"
                        />

                        <Button
                            style={{ width: "12rem" }}
                            label={
                                <span>
                                    Search(<u>S</u>)
                                </span>
                            }
                            accessKey="S"
                            id="btnSearch"
                            className="p-button-text"
                            onClick={search_LIST_0}
                        />
                    </div>
                </span>
            </div>

            <div
                className="af-div-first"
                style={{ width: "123rem", height: "15rem" }}
            >
                <AFDataTable preventUnrelatedRerender
                    ref={dt_TBL_KSV_ORDER_SHIP0}
                    size="small"
                    value={datasTBL_KSV_ORDER_SHIP0}
                    loading={loadingTBL_KSV_ORDER_SHIP0}
                    tableStyle={{ tableLayout: "fixed" }}
                    resizableColumns
                    columnResizeMode="expand"
                    showGridlines
                    selectionMode="checkbox"
                    selection={selectedTBL_KSV_ORDER_SHIP0}
                    onSelectionChange={(e) => {
                        setFlagSelectModeTBL_KSV_ORDER_SHIP0(true);
                        setSelectedTBL_KSV_ORDER_SHIP0(e.value);
                        console.log(
                            "selected length:" +
                                selectedTBL_KSV_ORDER_SHIP0.length,
                        );
                        onRowClick1TBL_KSV_ORDER_SHIP0(e.value);
                    }}
                    onRowClick={onRowClickTBL_KSV_ORDER_SHIP0}
                    dataKey="id"
                    className="datatable-responsive"
                    virtualScrollerOptions={{ itemSize: 20 }}
                    emptyMessage="" //header={headerTBL_KSV_ORDER_SHIP0}
                    responsiveLayout="scroll"
                    scrollable
                    scrollHeight="15rem"
                >
                    <AFColumn field="INVOICE_NO" header="Invoice#" headerStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="BUYER_NAME" header="Buyer" headerStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="SHIP_DATE" header="Ship Date" headerStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="NAT_CD" header="Country" headerStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="SHIP_MODE_N" header="Ship Mode" headerStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="DELIVERY_TYPE_N" header="Delivery" headerStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="ORDER_QTY" header="Order Qty" headerStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="SHIP_QTY" header="Ship Qty" headerStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="SHIP_AMOUNT" header="Amount" headerStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="BL_FILE" header="BL file" headerStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="PL_FILE" header="PL file" headerStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="DEBIT_FILE" header="Debit file" headerStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="DOCU_NO" header="Docu No" headerStyle={{ width: "10rem" }} ></AFColumn>
                </AFDataTable>
            </div>

            <div
                className="af-div-first"
                style={{ width: "123rem", height: "10rem" }}
            >
                <span className="af-span-3-0" style={{ width: "26rem" }}>
                    <p className="af-span-p" style={{ width: "10rem" }}>Invoice#</p>
                    <div className="af-span-div" style={{ width: "15rem" }}>
                        <InputText
                            style={{ width: "15rem" }}
                            id="id_PO_CD"
                            value={dataEDT_KSV_ORDER_SHIP.INVOICE_NO}
                            onChange={(e) =>
                                onInputChangeEDT_KSV_ORDER_SHIP_INVOICE_NO(
                                    e,
                                    "INVOICE_NO",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "26rem" }}>
                    <p className="af-span-p" style={{ width: "10rem" }}>BL#</p>
                    <div className="af-span-div" style={{ width: "15rem" }}>
                        <InputText
                            style={{ width: "15rem" }}
                            id="id_PO_CD"
                            value={dataEDT_KSV_ORDER_SHIP.BL_NO}
                            onChange={(e) =>
                                onInputChangeEDT_KSV_ORDER_SHIP_BL_NO(
                                    e,
                                    "BL_NO",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "26rem" }}>
                    <p className="af-span-p" style={{ width: "10rem" }}>BL File</p>
                    <div className="af-span-div" style={{ width: "8rem" }}>
                        <InputText
                            style={{ width: "8rem" }}
                            id="id_PO_CD"
                            value={dataEDT_KSV_ORDER_SHIP.BL_FILE}
                            onChange={(e) =>
                                onInputChangeEDT_KSV_ORDER_SHIP_BL_FILE(
                                    e,
                                    "BL_FILE",
                                )
                            }
                        />
                    </div>
                    <div className="af-span-div" style={{ width: "6rem" }}>
                        <button style={{ width: "6rem", height: "1.5rem" }}>
                            <label
                                className="inputFileCustom"
                                htmlFor="inputFileAdd"
                            >
                                Upload
                            </label>
                        </button>
                        <input
                            type="file"
                            id="inputFileAdd"
                            onChange={s3FileUpload_BL_FILE}
                            style={{ display: "none" }}
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "40rem" }}>
                    <div className="af-span-div-btn" style={{ width: "12rem" }}>
                        <Button
                            style={{ width: "12rem" }}
                            label="Update"
                            className="p-button-text"
                            onClick={process_INSERT}
                        />
                    </div>
                </span>

                <span className="af-span-3" style={{ width: "26rem" }}>
                    <p className="af-span-p" style={{ width: "10rem" }}>Ex Factory</p>
                    <div className="af-span-div" style={{ width: "15rem" }}>
                        <Calendar
                            showButtonBar
                            style={{ width: "15rem" }}
                            dateFormat="yymmdd"
                            id="id_IN_DATE"
                            value={changeDateVal(
                                dataEDT_KSV_ORDER_SHIP.EX_FACTORY_DATE,
                            )}
                            onChange={(e) =>
                                onCalChangeEDT_KSV_ORDER_SHIP_EX_FACTORY_DATE(
                                    e,
                                    "EX_FACTORY_DATE",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "26rem" }}>
                    <p className="af-span-p" style={{ width: "10rem" }}>Country</p>
                    <div className="af-span-div" style={{ width: "15rem" }}>
                        <Dropdown
                            style={{ width: "15rem" }}
                            id="id_ORDER_CD"
                            value={dataEDT_KSV_ORDER_SHIP_COUNTRY}
                            onChange={(e) =>
                                onDropdownChangeEDT_KSV_ORDER_SHIP_COUNTRY(
                                    e,
                                    "COUNTRY",
                                )
                            }
                            options={datasEDT_KSV_ORDER_SHIP_COUNTRY}
                            optionLabel="NAT_NAME"
                            placeholder=""
                            editable
                        ></Dropdown>
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "55rem" }}>
                    <p className="af-span-p" style={{ width: "10rem" }}>PL File</p>
                    <div className="af-span-div" style={{ width: "8rem" }}>
                        <InputText
                            style={{ width: "8rem" }}
                            id="id_PO_CD"
                            value={dataEDT_KSV_ORDER_SHIP.PL_FILE}
                            onChange={(e) =>
                                onInputChangeEDT_KSV_ORDER_SHIP_PL_FILE(
                                    e,
                                    "PL_FILE",
                                )
                            }
                        />
                    </div>
                    <div className="af-span-div" style={{ width: "6rem" }}>
                        <button style={{ width: "6rem", height: "1.5rem" }}>
                            <label
                                className="inputFileCustom"
                                htmlFor="inputFileAdd1"
                            >
                                Upload
                            </label>
                        </button>
                        <input
                            type="file"
                            id="inputFileAdd1"
                            onChange={s3FileUpload_PL_FILE}
                            style={{ display: "none" }}
                        />
                    </div>
                </span>

                <span className="af-span-3" style={{ width: "26rem" }}>
                    <p className="af-span-p" style={{ width: "10rem" }}>Ship Date</p>
                    <div className="af-span-div" style={{ width: "15rem" }}>
                        <Calendar
                            showButtonBar
                            style={{ width: "15rem" }}
                            dateFormat="yymmdd"
                            id="id_IN_DATE"
                            value={changeDateVal(
                                dataEDT_KSV_ORDER_SHIP.SHIP_DATE,
                            )}
                            onChange={(e) =>
                                onCalChangeEDT_KSV_ORDER_SHIP_SHIP_DATE(
                                    e,
                                    "SHIP_DATE",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "26rem" }}>
                    <p className="af-span-p" style={{ width: "10rem" }}>Ship Mode</p>
                    <div className="af-span-div" style={{ width: "15rem" }}>
                        <Dropdown
                            style={{ width: "15rem" }}
                            id="id_ORDER_CD"
                            value={dataEDT_KSV_ORDER_SHIP_SHIP_MODE}
                            onChange={(e) =>
                                onDropdownChangeEDT_KSV_ORDER_SHIP_SHIP_MODE(
                                    e,
                                    "SHIP_MODE",
                                )
                            }
                            options={datasEDT_KSV_ORDER_SHIP_SHIP_MODE}
                            optionLabel="CD_NAME"
                            placeholder=""
                            editable
                        ></Dropdown>
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "26rem" }}>
                    <p className="af-span-p" style={{ width: "10rem" }}>Delivery</p>
                    <div className="af-span-div" style={{ width: "15rem" }}>
                        <Dropdown
                            style={{ width: "15rem" }}
                            id="id_ORDER_CD"
                            value={dataEDT_KSV_ORDER_SHIP_DELIVERY_TYPE}
                            onChange={(e) =>
                                onDropdownChangeEDT_KSV_ORDER_SHIP_DELIVERY_TYPE(
                                    e,
                                    "DELIVERY_TYPE",
                                )
                            }
                            options={datasEDT_KSV_ORDER_SHIP_DELIVERY_TYPE}
                            optionLabel="CD_NAME"
                            placeholder=""
                            editable
                        ></Dropdown>
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "30rem" }}>
                    <div className="af-span-div-btn" style={{ width: "12rem" }}>
                        <Button
                            style={{ width: "12rem" }}
                            label="Reset"
                            className="p-button-text"
                            onClick={process_RESET}
                        />
                    </div>
                </span>
            </div>

            <div
                className="af-div-first"
                style={{ width: "123rem", height: "15rem" }}
            >
                <AFDataTable preventUnrelatedRerender
                    ref={dt_TBL_KSV_ORDER_SHIP}
                    size="small"
                    value={datasTBL_KSV_ORDER_SHIP}
                    loading={loadingTBL_KSV_ORDER_SHIP}
                    tableStyle={{ tableLayout: "fixed" }}
                    resizableColumns
                    columnResizeMode="expand"
                    showGridlines
                    selectionMode="checkbox"
                    selection={selectedTBL_KSV_ORDER_SHIP}
                    onSelectionChange={(e) => {
                        setFlagSelectModeTBL_KSV_ORDER_SHIP(true);
                        setSelectedTBL_KSV_ORDER_SHIP(e.value);
                        console.log(
                            "selected length:" +
                                selectedTBL_KSV_ORDER_SHIP.length,
                        );
                        onRowClick1TBL_KSV_ORDER_SHIP(e.value);
                    }}
                    onRowClick={onRowClickTBL_KSV_ORDER_SHIP}
                    dataKey="id"
                    className="datatable-responsive"
                    virtualScrollerOptions={{ itemSize: 20 }}
                    emptyMessage="" //header={headerTBL_KSV_ORDER_SHIP}
                    responsiveLayout="scroll"
                    scrollable
                    scrollHeight="15rem"
                >
                    <AFColumn field="INVOICE_NO" header="Invoice#" headerStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="ORDER_CD" header="Order#" headerStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="BUYER_NAME" header="Buyer" headerStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="SHIP_DATE" header="Ship Date" headerStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="NAT_CD" header="Country" headerStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="SHIP_MODE_N" header="Ship Mode" headerStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="DELIVERY_TYPE_N" header="Delivery" headerStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="ORDER_QTY" header="Order Qty" headerStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="SHIP_QTY" header="Ship Qty" headerStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="SHIP_AMOUNT" header="Amount" headerStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="BL_FILE" header="BL file" headerStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="PL_FILE" header="PL file" headerStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="DEBIT_FILE" header="Debit file" headerStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="DOCU_NO" header="Docu No" headerStyle={{ width: "10rem" }} ></AFColumn>
                </AFDataTable>
            </div>

            <Toast ref={toast} />

            <Dialog
                visible={createDialog}
                position="top-right"
                style={{ width: "98vw" }}
                header=""
                modal={true}
                className="p-fluid"
                onHide={hideDialog}
            >
                <div
                    className="af-div-first"
                    style={{ width: "120rem", height: "3rem" }}
                >
                    <span className="af-span-3-0" style={{ width: "26rem" }}>
                        <p className="af-span-p" style={{ width: "10rem" }}>Order#</p>
                        <div className="af-span-div" style={{ width: "15rem" }}>
                            <InputText
                                style={{ width: "15rem" }}
                                id="id_PO_CD"
                                value={dataQRY_KSV_ORDER_SHIP1.ORDER_CD}
                                onChange={(e) =>
                                    onInputChangeQRY_KSV_ORDER_SHIP1_ORDER_CD(
                                        e,
                                        "ORDER_CD",
                                    )
                                }
                            />
                        </div>
                    </span>
                    <span className="af-span-3-0" style={{ width: "16rem" }}>
                        <div
                            className="af-span-div-btn"
                            style={{ width: "12rem" }}
                        >
                            <Tooltip
                                className="menuCodeTooltip"
                                target={`#btnSearch`}
                                content={`Alt+S`}
                                position="bottom"
                            />

                            <Button
                                style={{ width: "12rem" }}
                                label={
                                    <span>
                                        Search(<u>S</u>)
                                    </span>
                                }
                                accessKey="S"
                                id="btnSearch"
                                className="p-button-text"
                                onClick={search_LIST_3}
                            />
                        </div>
                    </span>
                    <span className="af-span-3-0" style={{ width: "16rem" }}>
                        <div
                            className="af-span-div-btn"
                            style={{ width: "12rem" }}
                        >
                            <Button
                                style={{ width: "12rem" }}
                                label="Apply"
                                className="p-button-text"
                                onClick={process_APPLY}
                            />
                        </div>
                    </span>
                </div>

                <div
                    className="af-div-first"
                    style={{ width: "120rem", height: "30rem" }}
                >
                    <AFDataTable preventUnrelatedRerender
                        ref={dt_TBL_KSV_ORDER_SHIP2}
                        editMode="cell"
                        size="small"
                        value={datasTBL_KSV_ORDER_SHIP2}
                        tableStyle={{ tableLayout: "fixed" }}
                        resizableColumns
                        columnResizeMode="expand"
                        metaKeySelection={false}
                        showGridlines
                        selectionMode="multiple"
                        selection={selectedTBL_KSV_ORDER_SHIP2}
                        onSelectionChange={(e) => {
                            setFlagSelectModeTBL_KSV_ORDER_SHIP2(true);
                            setSelectedTBL_KSV_ORDER_SHIP2(e.value);
                            console.log(
                                "selected length:" +
                                    selectedTBL_KSV_ORDER_SHIP2.length,
                            );
                            onRowClick1TBL_KSV_ORDER_SHIP2(e.value);
                        }}
                        onRowClick={onRowClickTBL_KSV_ORDER_SHIP2}
                        dataKey="id"
                        className="datatable-responsive"
                        virtualScrollerOptions={{ itemSize: 20 }}
                        emptyMessage="No TBL_KSV_ORDER_SHIP2 found." //header={headerTBL_KSV_ORDER_SHIP2}
                        responsiveLayout="scroll"
                        scrollable
                        scrollHeight="30rem"
                    >
                        <AFColumn field="ORDER_CD" header="Order" headerStyle={{ width: "10rem" }} ></AFColumn>
                        <AFColumn field="STYLE_NAME" header="Style" headerStyle={{ width: "10rem" }} ></AFColumn>
                        <AFColumn field="COLOR" header="Color" headerStyle={{ width: "10rem" }} ></AFColumn>
                        <AFColumn field="TOT_CNT" header="Order Qty" headerStyle={{ width: "10rem" }} ></AFColumn>
                        <AFColumn field="SHIP_CNT" header="Ship Qty" headerStyle={{ width: "10rem" }} ></AFColumn>
                        <AFColumn field="BAL_CNT" header="Bal Qty" headerStyle={{ width: "10rem" }} ></AFColumn>
                    </AFDataTable>
                </div>
            </Dialog>
        </div>
    );
};

const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(S0530_INVOICE_LIST, comparisonFn);
