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
import { ServiceS0531_PENDDING_SHIPMENT } from "../service/service_biz/ServiceS0531_PENDDING_SHIPMENT";

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

const S0531_PENDDING_SHIPMENT = () => {
    const serviceLibRef = useRef(null);
    if (!serviceLibRef.current) {
        serviceLibRef.current = new ServiceLib();
        serviceLibRef.current.loginConfirm();
    }
    const serviceLib = serviceLibRef.current;
    const serviceS0531_PENDDING_SHIPMENTRef = useRef(null);
    if (!serviceS0531_PENDDING_SHIPMENTRef.current) serviceS0531_PENDDING_SHIPMENTRef.current = new ServiceS0531_PENDDING_SHIPMENT();
    const serviceS0531_PENDDING_SHIPMENT = serviceS0531_PENDDING_SHIPMENTRef.current;

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

        serviceS0531_PENDDING_SHIPMENT.mgrQuery_CODE(tInObj).then((data) => {
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

    const search_LIST_1 = () => {
        var _tData = { ...dataQRY_KSV_ORDER_SHIP };

        if (_tData.FACTORY_CD === "" || _tData.BUYER_CD === "") {
            alert("Factory, Buyer는 필수입력값 입니다.<br><br>Factory and Buyer are required input values.");
            return;
        }

        setDatasTBL_KSV_ORDER_SHIP([]);
        setSelectedTBL_KSV_ORDER_SHIP([]);

        // 2
        setLoadingTBL_KSV_ORDER_SHIP(true);
        serviceS0531_PENDDING_SHIPMENT.mgrQuery_LIST_1(_tData).then((data) => {
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

        search_CODE();
    };

    const search_LIST_2 = (argData) => {
        setDatasTBL_KSV_ORDER_SHIP1([]);
        setSelectedTBL_KSV_ORDER_SHIP1([]);

        // 3
        serviceS0531_PENDDING_SHIPMENT.mgrQuery_LIST_2(argData).then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                console.log(
                    "ServiceMgrKCD_BUYER.mgr1KcdStyle call => " + data.length,
                );
                var tArray = [];
                var tIdx = 0;
                var tSeq = 0;
                for (tIdx = 0; tIdx < data.length; tIdx++) {
                    var tOne = { ...data[tIdx] };
                    var tSizeArray = tOne.SIZE_MEMBER.split(",");
                    if (tOne.SHIP_SIZE_CNT === "") {
                        var tIdx9 = 0;
                        for (
                            tIdx9 = 0;
                            tIdx9 < tOne.ORDER_SIZE_CNT.length;
                            tIdx9++
                        ) {
                            tOne.SHIP_SIZE_CNT += "0";
                        }
                    }
                    tSizeArray.forEach((col, i) => {
                        var tOne1 = { ...tOne };
                        tOne1.SIZE = col;
                        tOne1.TOT_CNT = String(
                            parseInt(
                                tOne.ORDER_SIZE_CNT.substring(i * 6, i * 6 + 6),
                            ),
                        );
                        tOne1.SHIP_CNT = String(
                            parseInt(
                                tOne.SHIP_SIZE_CNT.substring(i * 6, i * 6 + 6),
                            ),
                        );
                        tOne1.REMAIN_QTY = "0";
                        tOne1.SHIP_QTY = "0";
                        tOne1.AMOUNT = String(
                            parseFloat(tOne1.SHIP_QTY) *
                                parseFloat(tOne1.PRICE),
                        );
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
        serviceS0531_PENDDING_SHIPMENT.mgrQuery_LIST_3(tInObj).then((data) => {
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

    const process_INSERT_PENDING = () => {
        var tInputs = [...selectedTBL_KSV_ORDER_SHIP];
        if (tInputs.length <= 0) {
            alert("작업할 데이타를 하나이상 선택하세요<br><br>Select one or more data to work with");
            return;
        }

        var tInArray = [];
        tInputs.forEach((col, i) => {
            var tObj = { ...col };
            if (typeof tObj.id !== "undefined") delete tObj.id;
            if (typeof tObj.__typename !== "undefined") delete tObj.__typename;
            tInArray.push(tObj);
        });

        setLoadingTBL_KSV_ORDER_SHIP(true);
        serviceS0531_PENDDING_SHIPMENT
            .mgrInsert_INSERT_PENDING(tInArray)
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

    const onDropdownChangeQRY_KSV_ORDER_SHIP_STYLE_CD = (e, name) => {
        let val = (e.value && e.value.STYLE_CD) || "";

        let _dataQRY_KSV_ORDER_SHIP = { ...dataQRY_KSV_ORDER_SHIP };

        let tTypeVal = _dataQRY_KSV_ORDER_SHIP[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_ORDER_SHIP[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_ORDER_SHIP[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_ORDER_SHIP(_dataQRY_KSV_ORDER_SHIP);
        setDataQRY_KSV_ORDER_SHIP_STYLE_CD(e.value);
    };

    const [
        datasQRY_KSV_ORDER_SHIP_BUYER_CD,
        setDatasQRY_KSV_ORDER_SHIP_BUYER_CD,
    ] = useState([]);
    const [
        dataQRY_KSV_ORDER_SHIP_BUYER_CD,
        setDataQRY_KSV_ORDER_SHIP_BUYER_CD,
    ] = useState({});

    const onInputChangeQRY_KSV_ORDER_SHIP_BUYER_CD = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_ORDER_SHIP = { ...dataQRY_KSV_ORDER_SHIP };

        let tTypeVal = _dataQRY_KSV_ORDER_SHIP[`${name}`];
        if (typeof tTypeVal === "string")
            _dataQRY_KSV_ORDER_SHIP[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_ORDER_SHIP[`${name}`] = parseInt(val);

        setDataQRY_KSV_ORDER_SHIP(_dataQRY_KSV_ORDER_SHIP);
    };

    const onInputChangeQRY_KSV_ORDER_SHIP_ORDER_CD = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_ORDER_SHIP = { ...dataQRY_KSV_ORDER_SHIP };

        let tTypeVal = _dataQRY_KSV_ORDER_SHIP[`${name}`];
        if (typeof tTypeVal === "string")
            _dataQRY_KSV_ORDER_SHIP[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_ORDER_SHIP[`${name}`] = parseInt(val);

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

        let argTBL_KSV_ORDER_SHIP = argData;

        setDataTBL_KSV_ORDER_SHIP(argTBL_KSV_ORDER_SHIP);

        var _tObj = { ...dataEDT_KSV_ORDER_SHIP };
        _tObj.INVOICE_NO = argData.INVOICE_NO;
        _tObj.SHIP_DATE = argData.SHIP_DATE;
        _tObj.EX_FACTORY_DATE = argData.EX_FACTORY_DATE;
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

        search_LIST_2(tInput);
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

    useEffect(() => {
        var _tObj = {};
        _tObj.BUYER_CD = "";

        serviceS0531_PENDDING_SHIPMENT.mgrQuery_CODE(_tObj).then((data) => {
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

    const onCellEditCompleteTBL_KSV_ORDER_SHIP = (e) => {
        let { rowData, newValue, value, field, originalEvent: event } = e;
        var tRowData = { ...rowData };
        tRowData[field] = newValue;

        var tArray = [];
        datasTBL_KSV_ORDER_SHIP.forEach((col, i) => {
            var tObj = { ...col };
            if (tObj.COLOR === tRowData.COLOR) {
                tArray.push(tRowData);
            } else {
                tArray.push(tObj);
            }
        });

        setDatasTBL_KSV_ORDER_SHIP(tArray);
    };

    // GUIDE: 에디터 컴포넌트에 onKeyDown 이벤트를 연결한다.
    const onChangeTextEdit = (e, options) => {
        options.editorCallback(e.target.value);
    };

    const handleFocus = (event) => event.target.select();

    const cellEditorTBL_KSV_ORDER_SHIP = (options) => {
        return textEditor(options);
    };

    const textEditor = (options) => {
        return (
            <InputText
                type="text"
                value={options.value}
                onChange={(e) => onChangeTextEdit(e, options)}
                onFocus={handleFocus}
            />
        );
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
                        <InputText
                            style={{ width: "15rem" }}
                            id="id_PO_CD"
                            value={dataQRY_KSV_ORDER_SHIP.BUYER_CD}
                            onChange={(e) =>
                                onInputChangeQRY_KSV_ORDER_SHIP_BUYER_CD(
                                    e,
                                    "BUYER_CD",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "23rem" }}>
                    <p className="af-span-p" style={{ width: "7rem" }}>Order#</p>
                    <div className="af-span-div" style={{ width: "15rem" }}>
                        <InputText
                            style={{ width: "15rem" }}
                            id="id_PO_CD"
                            value={dataQRY_KSV_ORDER_SHIP.ORDER_CD}
                            onChange={(e) =>
                                onInputChangeQRY_KSV_ORDER_SHIP_ORDER_CD(
                                    e,
                                    "ORDER_CD",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "23rem" }}>
                    <p className="af-span-p" style={{ width: "7rem" }}>Style#</p>
                    <div className="af-span-div" style={{ width: "15rem" }}>
                        <Dropdown
                            style={{ width: "15rem" }}
                            id="id_ORDER_CD"
                            filter
                            value={dataQRY_KSV_ORDER_SHIP_STYLE_CD}
                            onChange={(e) =>
                                onDropdownChangeQRY_KSV_ORDER_SHIP_STYLE_CD(
                                    e,
                                    "STYLE_CD",
                                )
                            }
                            options={datasQRY_KSV_ORDER_SHIP_STYLE_CD}
                            optionLabel="STYLE_NAME"
                            placeholder=""
                            editable
                        ></Dropdown>
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
                            onClick={search_LIST_1}
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "13rem" }}>
                    <div className="af-span-div-btn" style={{ width: "12rem" }}>
                        <Button
                            style={{ width: "12rem" }}
                            label="Save"
                            className="p-button-text"
                            onClick={process_INSERT_PENDING}
                        />
                    </div>
                </span>
            </div>

            <div
                className="af-div-first"
                style={{ width: "123rem", height: "58rem" }}
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
                        setSelectedTBL_KSV_ORDER_SHIP(e.value);
                        onRowClick1TBL_KSV_ORDER_SHIP(e.value);
                    }}
                    // onRowClick={onRowClickTBL_KSV_ORDER_SHIP}
                    dataKey="id"
                    className="datatable-responsive"
                    virtualScrollerOptions={{ itemSize: 20 }}
                    emptyMessage="" //header={headerTBL_KSV_ORDER_SHIP}
                    responsiveLayout="scroll"
                    scrollable
                    scrollHeight="55rem"
                >
                    <AFColumn selectionMode="multiple" field="__checkbox__" reorderable={false} headerClassName="t-header" headerStyle={{ width: "3rem" }} ></AFColumn>
                    <AFColumn field="END_DATE" header="Production Date" headerStyle={{ width: "10rem" }} body={(rowData) => serviceLib.dateFormatHMS(rowData.END_DATE) } ></AFColumn>
                    <AFColumn field="PENDING_DAYS" header="Pending Days" headerStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="BUYER_NAME" header="Buyer" headerStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="ORDER_CD" header="Order#" headerStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="STYLE_NAME" header="Style" headerStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="TOT_CNT" header="Production Qty" headerStyle={{ width: "10rem" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.TOT_CNT, 2) } ></AFColumn>
                    <AFColumn field="SHIP_QTY" header="Ship Qty" headerStyle={{ width: "10rem" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.SHIP_QTY, 2) } ></AFColumn>
                    <AFColumn field="BAL_QTY" header="Pending Qty" headerStyle={{ width: "10rem" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.BAL_QTY, 2) } ></AFColumn>
                    <AFColumn field="CURR_CD" header="Curr" headerStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="ORDER_PRICE" header="Order Price" headerStyle={{ width: "10rem" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.ORDER_PRICE, 4) } ></AFColumn>
                    <AFColumn field="PENDING_AMT" header="Pending Amount" headerStyle={{ width: "10rem" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.PENDING_AMT, 2) } ></AFColumn>
                    <AFColumn field="REMARK" header="Remark" headerStyle={{ color: "green", width: "10rem" }} editor={(options) => cellEditorTBL_KSV_ORDER_SHIP(options) } onCellEditComplete={ onCellEditCompleteTBL_KSV_ORDER_SHIP } ></AFColumn>
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

export default React.memo(S0531_PENDDING_SHIPMENT, comparisonFn);
