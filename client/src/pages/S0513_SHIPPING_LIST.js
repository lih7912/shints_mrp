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
import { ServiceS0513_SHIPPING_LIST } from "../service/service_biz/ServiceS0513_SHIPPING_LIST";

import "./page_common.scss";
import { parse } from "graphql";

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
    S_SHIP_DATE: "",
    E_SHIP_DATE: "",
    S_ATD: "",
    E_ATD: "",
    //SHIP_MODE:'',
    PAYMENT_TYPE: "",
    DELIVERY_TYPE: "",
    NAT_CD: "",
    BL_NO: "",
};

const emptyQRY_KSV_ORDER_SHIP1 = {
    ORDER_CD: "",
    BUYER_CD: "",
    FACTORY_CD: "",
};

const emptyEDT_KSV_ORDER_SHIP = {
    INVOICE_NO: "",
    BL_NO: "",
    BL_FILE: "",
    BL_FILE2: "",
    EX_FACTORY_DATE: "",
    COUNTRY: "",
    PL_FILE: "",
    PL_FILE2: "",
    SHIP_DATE: "",
    ATD: "",
    SHIP_MODE: "",
    CI_FILE: "",
    CI_FILE2: "",
    DELIVERY_TYPE: "",
    OTHER_FILE: "",
    OTHER_FILE2: "",
};

const S0513_SHIPPING_LIST = () => {
    const serviceLibRef = useRef(null);
    if (!serviceLibRef.current) {
        serviceLibRef.current = new ServiceLib();
        serviceLibRef.current.loginConfirm();
    }
    const serviceLib = serviceLibRef.current;
    const serviceS0513_SHIPPING_LISTRef = useRef(null);
    if (!serviceS0513_SHIPPING_LISTRef.current) serviceS0513_SHIPPING_LISTRef.current = new ServiceS0513_SHIPPING_LIST();
    const serviceS0513_SHIPPING_LIST = serviceS0513_SHIPPING_LISTRef.current;

    const toast = useRef(null);

    /* splitter 관련 */
    const [styleVal, setStyleVal] = useState({ width: "65vw" });

    const [urlIframe, setUrlIframe] = useState("");
    const [createDialog, setCreateDialog] = useState(false);

    const [saveLIST_2, setSaveLIST_2] = useState([]);
    const [dataKCD_FILEINFO_BL_FILE, setDataKCD_FILEINFO_BL_FILE] = useState(
        {},
    );
    const [dataKCD_FILEINFO_PL_FILE, setDataKCD_FILEINFO_PL_FILE] = useState(
        {},
    );
    const [dataKCD_FILEINFO_CI_FILE, setDataKCD_FILEINFO_CI_FILE] = useState(
        {},
    );
    const [dataKCD_FILEINFO_OTHER_FILE, setDataKCD_FILEINFO_OTHER_FILE] =
        useState({});
    const [dataKCD_FILEINFO_BL_FILE2, setDataKCD_FILEINFO_BL_FILE2] = useState(
        {},
    );
    const [dataKCD_FILEINFO_PL_FILE2, setDataKCD_FILEINFO_PL_FILE2] = useState(
        {},
    );
    const [dataKCD_FILEINFO_CI_FILE2, setDataKCD_FILEINFO_CI_FILE2] = useState(
        {},
    );
    const [dataKCD_FILEINFO_OTHER_FILE2, setDataKCD_FILEINFO_OTHER_FILE2] =
        useState({});

    const process_RESET = () => {
        setDataQRY_KSV_ORDER_SHIP(emptyQRY_KSV_ORDER_SHIP);
        setDataQRY_KSV_ORDER_SHIP_FACTORY_CD(
            datasQRY_KSV_ORDER_SHIP_FACTORY_CD[0],
        );
        setDataQRY_KSV_ORDER_SHIP_BUYER_CD(datasQRY_KSV_ORDER_SHIP_BUYER_CD[0]);
        setDataQRY_KSV_ORDER_SHIP_PAYMENT_TYPE(
            datasQRY_KSV_ORDER_SHIP_PAYMENT_TYPE[0],
        );
        setDataQRY_KSV_ORDER_SHIP_DELIVERY_TYPE(
            datasQRY_KSV_ORDER_SHIP_DELIVERY_TYPE[0],
        );
        setDataQRY_KSV_ORDER_SHIP_NAT_CD(datasQRY_KSV_ORDER_SHIP_NAT_CD[0]);

        setDatasTBL_KSV_ORDER_SHIP([]);
        setDatasTBL_KSV_ORDER_SHIP3([]);
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

    const search_LIST_1 = (argData) => {
        var _tData = {};
        var tInvoiceNo = "";
        var tRetArray = [];
        if (typeof argData.INVOICE_NO !== "undefined") {
            _tData = { ...argData };
            tInvoiceNo = argData.INVOICE_NO;
            var tSaveData = JSON.parse(
                sessionStorage.getItem("S0513_INVOICE_INFO_DATAS"),
            );
            if (!tSaveData) tSaveData = [];
            var tSeq = 1;
            tSaveData.forEach((col, i) => {
                var tObj = { ...col };
                if (col.INVOICE_NO === tInvoiceNo);
                else {
                    tObj.id = tSeq;
                    tSeq += 1;
                    tRetArray.push(tObj);
                }
            });
        } else {
            _tData = { ...dataQRY_KSV_ORDER_SHIP };
        }

        setDatasTBL_KSV_ORDER_SHIP([]);
        setSelectedTBL_KSV_ORDER_SHIP([]);

        setDatasTBL_KSV_ORDER_SHIP3([]);
        setSelectedTBL_KSV_ORDER_SHIP3([]);

        // 2
        setLoadingTBL_KSV_ORDER_SHIP(true);

        serviceS0513_SHIPPING_LIST
            .mgrQuery_LIST_1(_tData)
            .then(async (data) => {
                setLoadingTBL_KSV_ORDER_SHIP(false);

                if (typeof data.graphQLErrors === "undefined") {
                    console.log(
                        "ServiceMgrKCD_BUYER.mgr1KcdStyle call => " +
                            data.length,
                    );
                    var tObj = { ...data[0] };

                    console.log(tObj);

                    if (parseInt(tObj.REC_COUNT) >= 1001) {
                        if (
                            await confirm(
                                `1000건 초과 전체 데이타는 이메일로 발송합니다.<br>계속하시겠습니까?<BR><BR>Full data over 1000 will be emailed.<br>Do you want to continue?<br><br>TOTAL:${tObj.REC_COUNT}`,
                            )
                        ) {
                            search_LIST_EXCEL(null, "emailSend");
                        }
                    }

                    if (parseInt(tObj.REC_COUNT) <= 0) {
                        setDatasTBL_KSV_ORDER_SHIP([]);
                    } else {
                        var tSeq = tRetArray.length + 1;
                        data.forEach((col, i) => {
                            var tObj = { ...col };
                            if (!tObj.COMPLETE && tObj.DOCU_NO) {
                                tObj.COMPLETE = "1";
                            }
                            tObj.id = tSeq;
                            tSeq += 1;
                            tRetArray.push(tObj);
                        });
                        setDatasTBL_KSV_ORDER_SHIP(tRetArray);

                        if (tInvoiceNo) {
                            const selectedRow = tRetArray.find(
                                (row) => row.INVOICE_NO === tInvoiceNo,
                            );

                            if (selectedRow) {
                                var tSelArray = [];
                                tSelArray.push(selectedRow);
                                setSelectedTBL_KSV_ORDER_SHIP(tSelArray);
                                onRowClick1TBL_KSV_ORDER_SHIP(tSelArray);
                            }
                        }
                    }
                } else {
                    console.log(
                        "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });

        //search_CODE();
    };

    const search_LIST_EXCEL = (argData, emailSend) => {
        var _tData = {};
        if (typeof argData?.INVOICE_NO !== "undefined") {
            _tData = { ...argData, EMAIL_SEND: emailSend };
        } else {
            _tData = { ...dataQRY_KSV_ORDER_SHIP, EMAIL_SEND: emailSend };
        }

        // process_RESET();

        // setDatasTBL_KSV_ORDER_SHIP([]);
        // setSelectedTBL_KSV_ORDER_SHIP([]);

        // 2
        if (emailSend) {
            serviceS0513_SHIPPING_LIST.mgrQuery_EXCEL(_tData);
            return;
        }

        setLoadingTBL_KSV_ORDER_SHIP(true);

        serviceS0513_SHIPPING_LIST.mgrQuery_EXCEL(_tData).then((data) => {
            setLoadingTBL_KSV_ORDER_SHIP(false);
            if (typeof data.graphQLErrors === "undefined") {
                if (data.length > 0) {
                    if (data[0].CODE.includes("SUCC"))
                        serviceLib.downloadFile(
                            data[0].CODE.split("?")[2].toString(),
                            data[0].CODE.split("?")[1].toString(),
                        );
                }
            } else {
                console.log(
                    "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });
    };

    const search_LIST_2 = (argData) => {
        setDatasTBL_KSV_ORDER_SHIP1([]);
        setSelectedTBL_KSV_ORDER_SHIP1([]);

        // 3
        serviceS0513_SHIPPING_LIST.mgrQuery_LIST_2(argData).then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                console.log(
                    "ServiceMgrKCD_BUYER.mgr1KcdStyle call => " + data.length,
                );
                var tArray = [];
                var tIdx = 0;
                var tSeq = 0;
                setSaveLIST_2(data);
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
                    var tSumOrder = 0;
                    var tSumShip = 0;
                    var tSumTotShip = 0;
                    var tSumAmount = 0;
                    var tCount = 0;
                    var tIdx999 = 0;
                    for (tIdx999 = 0; tIdx999 < tSizeArray.length; tIdx999++) {
                        var tOne1 = {};
                        tOne1.ORDER_CD = tOne.ORDER_CD;
                        tOne1.CURR_CD = tOne.CURR_CD;
                        tOne1.STYLE_NAME = tOne.STYLE_NAME;
                        tOne1.COLOR = tOne.COLOR;
                        tOne1.PROD_CD = tOne.PROD_CD;
                        var i = tIdx999;
                        tOne1.SIZE = tSizeArray[tIdx999];
                        tOne1.TOT_CNT = String(
                            parseInt(
                                tOne.ORDER_SIZE_CNT.substring(i * 6, i * 6 + 6),
                            ),
                        );
                        if (parseFloat(tOne1.TOT_CNT) <= 0) continue;
                        tOne1.PROD_CNT = tOne1.TOT_CNT;
                        tOne1.TOT_SHIP_CNT = String(
                            parseInt(
                                tOne.TOT_SHIP_SIZE_CNT.substring(
                                    i * 6,
                                    i * 6 + 6,
                                ),
                            ),
                        );
                        tOne1.SHIP_CNT = String(
                            parseInt(
                                tOne.SHIP_SIZE_CNT.substring(i * 6, i * 6 + 6),
                            ),
                        );
                        tSumOrder += parseFloat(tOne1.TOT_CNT);
                        tSumTotShip += parseFloat(tOne1.TOT_SHIP_CNT);
                        tSumShip += parseFloat(tOne1.SHIP_CNT);
                        var tRemainQty =
                            parseFloat(tOne1.TOT_CNT) -
                            parseFloat(tOne1.TOT_SHIP_CNT);
                        tOne1.REMAIN_QTY = String(tRemainQty);
                        tOne1.SHIP_QTY = "0";
                        var tPrice = parseFloat(tOne.SHIP_PRICE);
                        if (tPrice <= 0) tPrice = parseFloat(tOne.PRICE);
                        tOne1.PRICE = String(tPrice);
                        tOne1.AMOUNT = String(
                            parseFloat(tOne1.SHIP_CNT) * parseFloat(tPrice),
                        );
                        // tOne1.AMOUNT = String(parseFloat(tOne1.SHIP_QTY) * parseFloat(tOne1.PRICE));
                        tSumAmount += parseFloat(tOne1.AMOUNT);
                        tOne1.id = tSeq;
                        tSeq += 1;
                        if (tCount > 0) {
                            tOne1.ORDER_CD = "";
                            tOne1.STYLE_NAME = "";
                            tOne1.COLOR = "";
                        }
                        tArray.push(tOne1);
                        tCount += 1;
                    }
                    if (tSizeArray.length > 0) {
                        var tOne1 = {};
                        tOne1.ORDER_CD = "";
                        tOne1.CURR_CD = "";
                        tOne1.STYLE_NAME = "";
                        tOne1.COLOR = "";
                        tOne1.SIZE = "Total";
                        tOne1.TOT_CNT = String(tSumOrder);
                        tOne1.PROD_CNT = String(tSumOrder);
                        tOne1.SHIP_CNT = String(tSumShip);
                        tOne1.TOT_SHIP_CNT = String(tSumTotShip);
                        tOne1.REMAIN_QTY = "";
                        tOne1.SHIP_QTY = "";
                        tOne1.PRICE = "";
                        tOne1.AMOUNT = String(tSumAmount);
                        tOne1.id = tSeq;
                        tSeq += 1;
                        tArray.push(tOne1);
                    }
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

    const search_LIST_2_2 = (argData) => {
        if (!argData.INVOICE_NO) return;

        var tObj = {};
        tObj.INVOICE_NO = argData.INVOICE_NO;

        setSelectedTBL_KSV_ORDER_SHIP3([]);
        // 3
        serviceS0513_SHIPPING_LIST.mgrQuery_LIST_2_2(tObj).then((data) => {
            setSelectedTBL_KSV_ORDER_SHIP3([]);
            if (typeof data.graphQLErrors === "undefined") {
                var tArray = [];
                data.forEach((col, i) => {
                    var tObj = { ...col };
                    tObj.id = i + 1;
                    tArray.push(tObj);
                });
                setDatasTBL_KSV_ORDER_SHIP3(tArray);
            } else {
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

    const onCalChangeQRY_KSV_ORDER_SHIP_S_SHIP_DATE = (e, name) => {
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

    const onCalChangeQRY_KSV_ORDER_SHIP_E_SHIP_DATE = (e, name) => {
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

    const onCalChangeQRY_KSV_ORDER_SHIP_S_ATD = (e, name) => {
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

    const onCalChangeQRY_KSV_ORDER_SHIP_E_ATD = (e, name) => {
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
        } else {
            _dataQRY_KSV_ORDER_SHIP[`${name}`] = String(val);
        }

        setDataQRY_KSV_ORDER_SHIP(_dataQRY_KSV_ORDER_SHIP);
        setDataQRY_KSV_ORDER_SHIP_FACTORY_CD(e.value);
    };

    const [datasQRY_KSV_ORDER_SHIP_NAT_CD, setDatasQRY_KSV_ORDER_SHIP_NAT_CD] =
        useState([]);
    const [dataQRY_KSV_ORDER_SHIP_NAT_CD, setDataQRY_KSV_ORDER_SHIP_NAT_CD] =
        useState({});

    const onDropdownChangeQRY_KSV_ORDER_SHIP_NAT_CD = (e, name) => {
        let val = (e.value && e.value.NAT_CD) || "";

        let _dataQRY_KSV_ORDER_SHIP = { ...dataQRY_KSV_ORDER_SHIP };

        let tTypeVal = _dataQRY_KSV_ORDER_SHIP[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_ORDER_SHIP[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_ORDER_SHIP[`${name}`] = parseInt(val);
        } else {
            _dataQRY_KSV_ORDER_SHIP[`${name}`] = String(val);
        }

        setDataQRY_KSV_ORDER_SHIP(_dataQRY_KSV_ORDER_SHIP);
        setDataQRY_KSV_ORDER_SHIP_NAT_CD(e.value);
    };

    const [
        datasQRY_KSV_ORDER_SHIP_STYLE_CD,
        setDatasQRY_KSV_ORDER_SHIP_STYLE_CD,
    ] = useState([]);
    const [
        dataQRY_KSV_ORDER_SHIP_STYLE_CD,
        setDataQRY_KSV_ORDER_SHIP_STYLE_CD,
    ] = useState({});

    const onInputChangeQRY_KSV_ORDER_SHIP_STYLE_CD = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_ORDER_SHIP = { ...dataQRY_KSV_ORDER_SHIP };

        let tTypeVal = _dataQRY_KSV_ORDER_SHIP[`${name}`];
        if (typeof tTypeVal === "string")
            _dataQRY_KSV_ORDER_SHIP[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_ORDER_SHIP[`${name}`] = parseInt(val);
        else {
            _dataQRY_KSV_ORDER_SHIP[`${name}`] = String(val);
        }

        setDataQRY_KSV_ORDER_SHIP(_dataQRY_KSV_ORDER_SHIP);
    };

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
        } else {
            _dataQRY_KSV_ORDER_SHIP[`${name}`] = String(val);
        }

        setDataQRY_KSV_ORDER_SHIP(_dataQRY_KSV_ORDER_SHIP);
        setDataQRY_KSV_ORDER_SHIP_BUYER_CD(e.value);
    };

    const onInputChangeQRY_KSV_ORDER_SHIP_ORDER_CD = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_ORDER_SHIP = { ...dataQRY_KSV_ORDER_SHIP };

        let tTypeVal = _dataQRY_KSV_ORDER_SHIP[`${name}`];
        if (typeof tTypeVal === "string")
            _dataQRY_KSV_ORDER_SHIP[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_ORDER_SHIP[`${name}`] = parseInt(val);
        else {
            _dataQRY_KSV_ORDER_SHIP[`${name}`] = String(val);
        }

        setDataQRY_KSV_ORDER_SHIP(_dataQRY_KSV_ORDER_SHIP);
    };

    const [
        datasQRY_KSV_ORDER_SHIP_SHIP_MODE,
        setDatasQRY_KSV_ORDER_SHIP_SHIP_MODE,
    ] = useState([]);
    const [
        dataQRY_KSV_ORDER_SHIP_SHIP_MODE,
        setDataQRY_KSV_ORDER_SHIP_SHIP_MODE,
    ] = useState({});

    const [
        datasQRY_KSV_ORDER_SHIP_PAYMENT_TYPE,
        setDatasQRY_KSV_ORDER_SHIP_PAYMENT_TYPE,
    ] = useState([]);
    const [
        dataQRY_KSV_ORDER_SHIP_PAYMENT_TYPE,
        setDataQRY_KSV_ORDER_SHIP_PAYMENT_TYPE,
    ] = useState({});

    const onDropdownChangeQRY_KSV_ORDER_SHIP_PAYMENT_TYPE = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataQRY_KSV_ORDER_SHIP = { ...dataQRY_KSV_ORDER_SHIP };

        let tTypeVal = _dataQRY_KSV_ORDER_SHIP[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_ORDER_SHIP[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_ORDER_SHIP[`${name}`] = parseInt(val);
        } else {
            _dataQRY_KSV_ORDER_SHIP[`${name}`] = String(val);
        }

        setDataQRY_KSV_ORDER_SHIP(_dataQRY_KSV_ORDER_SHIP);
        setDataQRY_KSV_ORDER_SHIP_PAYMENT_TYPE(e.value);
    };

    const [
        datasQRY_KSV_ORDER_SHIP_DELIVERY_TYPE,
        setDatasQRY_KSV_ORDER_SHIP_DELIVERY_TYPE,
    ] = useState([]);
    const [
        dataQRY_KSV_ORDER_SHIP_DELIVERY_TYPE,
        setDataQRY_KSV_ORDER_SHIP_DELIVERY_TYPE,
    ] = useState({});

    const [paymentTypeDisabled, setPaymentTypeDisabled] = useState(false);
    const onDropdownChangeQRY_KSV_ORDER_SHIP_DELIVERY_TYPE = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataQRY_KSV_ORDER_SHIP = { ...dataQRY_KSV_ORDER_SHIP };

        let tTypeVal = _dataQRY_KSV_ORDER_SHIP[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_ORDER_SHIP[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_ORDER_SHIP[`${name}`] = parseInt(val);
        } else {
            _dataQRY_KSV_ORDER_SHIP[`${name}`] = String(val);
        }

        console.log(_dataQRY_KSV_ORDER_SHIP.DELIVERY_TYPE);

        if (
            _dataQRY_KSV_ORDER_SHIP.DELIVERY_TYPE === "FK" ||
            _dataQRY_KSV_ORDER_SHIP.DELIVERY_TYPE === "6"
        ) {
            // Factory keep, Handy Carry
            setDataQRY_KSV_ORDER_SHIP_PAYMENT_TYPE(
                datasQRY_KSV_ORDER_SHIP_PAYMENT_TYPE[2],
            );
            setPaymentTypeDisabled(true);
        } else {
            setDataQRY_KSV_ORDER_SHIP_PAYMENT_TYPE(
                datasQRY_KSV_ORDER_SHIP_PAYMENT_TYPE[0],
            );
            setPaymentTypeDisabled(false);
        }

        setDataQRY_KSV_ORDER_SHIP(_dataQRY_KSV_ORDER_SHIP);
        setDataQRY_KSV_ORDER_SHIP_DELIVERY_TYPE(e.value);
    };

    /*QRY KSV_STOCK_FACOUT */
    const [dataQRY_KSV_ORDER_SHIP1, setDataQRY_KSV_ORDER_SHIP1] = useState(
        emptyQRY_KSV_ORDER_SHIP1,
    );

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
        datasEDT_KSV_ORDER_SHIP_PAYMENT_TYPE,
        setDatasEDT_KSV_ORDER_SHIP_PAYMENT_TYPE,
    ] = useState([]);
    const [
        dataEDT_KSV_ORDER_SHIP_PAYMENT_TYPE,
        setDataEDT_KSV_ORDER_SHIP_PAYMENT_TYPE,
    ] = useState({});

    const editEDT_KSV_ORDER_SHIP_PAYMENT_TYPE = (argValue) => {
        let _dataEDT_KSV_ORDER_SHIP_PAYMENT_TYPE =
            datasEDT_KSV_ORDER_SHIP_PAYMENT_TYPE.filter(
                (val) => val.CD_CODE === argValue,
            );
        setDataEDT_KSV_ORDER_SHIP_PAYMENT_TYPE(
            _dataEDT_KSV_ORDER_SHIP_PAYMENT_TYPE[0],
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

    /* */
    let emptyTBL_KSV_ORDER_SHIP3 = {};

    const [datasTBL_KSV_ORDER_SHIP3, setDatasTBL_KSV_ORDER_SHIP3] = useState(
        [],
    );
    const dt_TBL_KSV_ORDER_SHIP3 = useRef(null);
    const [dataTBL_KSV_ORDER_SHIP3, setDataTBL_KSV_ORDER_SHIP3] = useState(
        emptyTBL_KSV_ORDER_SHIP3,
    );
    const [selectedTBL_KSV_ORDER_SHIP3, setSelectedTBL_KSV_ORDER_SHIP3] =
        useState([]);
    const [
        flagSelectModeTBL_KSV_ORDER_SHIP3,
        setFlagSelectModeTBL_KSV_ORDER_SHIP3,
    ] = useState(false);
    const [loadingTBL_KSV_ORDER_SHIP3, setLoadingTBL_KSV_ORDER_SHIP3] =
        useState(false);

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
        _tObj.ATD = argData.ATD;
        _tObj.EX_FACTORY_DATE = argData.EXFACTORY;
        _tObj.BL_NO = argData.BL_NO;
        _tObj.COUNTRY = argData.NAT_CD;
        //_tObj.SHIP_MODE = argData.SHIP_PTYPE;
        _tObj.PAYMENT_TYPE = argData.PAYMENT_TYPE;
        if (argData.INVOICE_NO.includes("bvt")) {
            setDataQRY_KSV_ORDER_SHIP_PAYMENT_TYPE(
                datasEDT_KSV_ORDER_SHIP_PAYMENT_TYPE[2],
            );
        }
        _tObj.DELIVERY_TYPE = argData.DELIVERY_TYPE;
        _tObj.BL_FILE = argData.BL_FILE;
        _tObj.PL_FILE = argData.PL_FILE;
        _tObj.CI_FILE = argData.CI_FILE;
        _tObj.OTHER_FILE = argData.OTHER_FILE;
        _tObj.BL_FILE2 = argData.BL_FILE2;
        _tObj.PL_FILE2 = argData.PL_FILE2;
        _tObj.CI_FILE2 = argData.CI_FILE2;
        _tObj.OTHER_FILE2 = argData.OTHER_FILE2;
        setDataEDT_KSV_ORDER_SHIP(_tObj);

        editEDT_KSV_ORDER_SHIP_COUNTRY(_tObj.COUNTRY);
        //editEDT_KSV_ORDER_SHIP_SHIP_MODE(_tObj.SHIP_MODE);
        editEDT_KSV_ORDER_SHIP_PAYMENT_TYPE(_tObj.PAYMENT_TYPE);
        editEDT_KSV_ORDER_SHIP_DELIVERY_TYPE(_tObj.DELIVERY_TYPE);

        var tFileObj = {};
        tFileObj.NAME = argData.BL_FILE;
        tFileObj.URL = argData.BL_FILE_URL;
        setDataKCD_FILEINFO_BL_FILE(tFileObj);

        tFileObj = {};
        tFileObj.NAME = argData.PL_FILE;
        tFileObj.URL = argData.PL_FILE_URL;
        setDataKCD_FILEINFO_PL_FILE(tFileObj);

        tFileObj = {};
        tFileObj.NAME = argData.CI_FILE;
        tFileObj.URL = argData.CI_FILE_URL;
        setDataKCD_FILEINFO_CI_FILE(tFileObj);

        tFileObj = {};
        tFileObj.NAME = argData.OTHER_FILE;
        tFileObj.URL = argData.OTHER_FILE_URL;
        setDataKCD_FILEINFO_OTHER_FILE(tFileObj);

        var tFileObj = {};
        tFileObj.NAME = argData.BL_FILE2;
        tFileObj.URL = argData.BL_FILE_URL2;
        setDataKCD_FILEINFO_BL_FILE2(tFileObj);

        tFileObj = {};
        tFileObj.NAME = argData.PL_FILE2;
        tFileObj.URL = argData.PL_FILE_URL2;
        setDataKCD_FILEINFO_PL_FILE2(tFileObj);

        tFileObj = {};
        tFileObj.NAME = argData.CI_FILE2;
        tFileObj.URL = argData.CI_FILE_URL2;
        setDataKCD_FILEINFO_CI_FILE2(tFileObj);

        tFileObj = {};
        tFileObj.NAME = argData.OTHER_FILE2;
        tFileObj.URL = argData.OTHER_FILE_URL2;
        setDataKCD_FILEINFO_OTHER_FILE2(tFileObj);

        var tInput = {};
        tInput.INVOICE_NO = argData.INVOICE_NO;
        tInput.BUYER_CD = argData.BUYER_CD;
        tInput.SHIP_DATE = argData.SHIP_DATE;
        tInput.NAT_CD = argData.NAT_CD;
        tInput.SHIP_MODE = argData.SHIP_PTYPE;
        tInput.ORDER_CD = argData.ORDER_CD;

        search_LIST_2(tInput);
    };

    const onRowClickTBL_KSV_ORDER_SHIP = (event) => {
        search_LIST_2_2(event.data);
    };

    const saveFormToSession = () => {
        // JSON으로 저장
        sessionStorage.setItem(
            "S0513_INVOICE_INFO",
            JSON.stringify(dataQRY_KSV_ORDER_SHIP),
        );
    };

    const popup_INVOICE_INFO = (argData) => {
        sessionStorage.setItem(
            "S0513_INVOICE_INFO_INPUT",
            JSON.stringify(argData),
        );
        sessionStorage.setItem(
            "S0513_INVOICE_INFO_DATAS",
            JSON.stringify(datasTBL_KSV_ORDER_SHIP),
        );
        saveFormToSession();

        var tUrls = window.location.href.split("/");
        console.log("URL=>" + tUrls[2]);
        var tUrl1 = "";
        if (window.location.href.includes("3288")) {
            tUrl1 = "http://afroba.iptime.org:3288/webapp/mrpapp/index.html#/";
        } else if (window.location.href.includes("3201")) {
            if (window.location.href.includes("afroba")) {
                tUrl1 = "http://afroba.iptime.org:3201/#/";
            }
            if (window.location.href.includes("localhost")) {
                tUrl1 = "http://localhost:3201/#/";
            }
        } else if (window.location.href.includes("3203")) {
            tUrl1 = "http://192.168.0.105:3203/#/";
        } else {
            tUrl1 = "http://localhost:3201/#/";
        }
        tUrl1 = `${window.location.origin}/#/`;
        tUrl1 += `S051301_SHIPPING_REGIST?INVOICE_NO=${argData.INVOICE_NO}`;

        var tUrl2 = `S051301_SHIPPING_REGIST?INVOICE_NO=${argData.INVOICE_NO}`;

        var tValObj = {
            key: "4-16",
            label: "Garment Ship Regist",
            icon: "pi pi-fw pi-user-edit",
            width: "1365px",
            height: "675px",
            url1: "S051301_SHIPPING_REGIST",
        };
        var tArgObj = { ...tValObj };
        tArgObj.url1 = tUrl2;
        var tFuncObj = {};
        tFuncObj.func = "call_url";
        tFuncObj.message = { ...tArgObj };
        window.parent.postMessage(tFuncObj, "*");
    };

    const process_REGIST = () => {
        sessionStorage.setItem(
            "S0513_INVOICE_INFO",
            JSON.stringify(dataQRY_KSV_ORDER_SHIP, null, 4),
        );
        sessionStorage.setItem(
            "S0513_INVOICE_INFO_INPUT",
            JSON.stringify({}, null, 4),
        );

        var tUrls = window.location.href.split("/");
        console.log("URL=>" + tUrls[2]);
        var tUrl1 = "";
        if (window.location.href.includes("3288")) {
            tUrl1 = "http://afroba.iptime.org:3288/webapp/mrpapp/index.html#/";
        } else if (window.location.href.includes("3201")) {
            if (window.location.href.includes("afroba")) {
                tUrl1 = "http://afroba.iptime.org:3201/#/";
            }
            if (window.location.href.includes("localhost")) {
                tUrl1 = "http://localhost:3201/#/";
            }
        } else if (window.location.href.includes("3203")) {
            tUrl1 = "http://192.168.0.105:3203/#/";
        } else {
            tUrl1 = "http://localhost:3201/#/";
        }
        tUrl1 = `${window.location.origin}/#/`;
        tUrl1 += `S051301_SHIPPING_REGIST`;

        var tUrl2 = `S051301_SHIPPING_REGIST`;

        var tValObj = {
            key: "4-16",
            label: "Garment Ship Regist",
            icon: "pi pi-fw pi-user-edit",
            width: "1365px",
            height: "675px",
            url1: "S051301_SHIPPING_REGIST",
        };
        var tArgObj = { ...tValObj };
        tArgObj.url1 = tUrl2;
        var tFuncObj = {};
        tFuncObj.func = "call_url";
        tFuncObj.message = { ...tArgObj };
        window.parent.postMessage(tFuncObj, "*");
    };

    const onRowDoubleClickTBL_KSV_ORDER_SHIP = (argData0) => {
        var tRemark = "";
        var tColName = "";
        var tKeys = Object.keys(argData0.data);
        tKeys.forEach((col, i) => {
            var tValue = argData0.data[`${col}`];
            if (tValue === argData0.originalEvent.target.innerText) {
                if (tColName === "" && tValue !== "") tColName = col;
            }
        });

        console.log("Col Name:" + tColName);
        popup_INVOICE_INFO(argData0.data);
    };

    const onFileCellDoubleClick = (field, rowData) => {
        console.log("Double clicked file column:", field);
        switch (field) {
            case "BL_FILE":
                serviceLib.downloadFile(
                    dataKCD_FILEINFO_BL_FILE.URL,
                    dataKCD_FILEINFO_BL_FILE.NAME,
                );
                break;
            case "PL_FILE":
                serviceLib.downloadFile(
                    dataKCD_FILEINFO_PL_FILE.URL,
                    dataKCD_FILEINFO_PL_FILE.NAME,
                );
                break;
            case "CI_FILE":
                serviceLib.downloadFile(
                    dataKCD_FILEINFO_CI_FILE.URL,
                    dataKCD_FILEINFO_CI_FILE.NAME,
                );
                break;
            case "OTHER_FILE":
                serviceLib.downloadFile(
                    dataKCD_FILEINFO_OTHER_FILE.URL,
                    dataKCD_FILEINFO_OTHER_FILE.NAME,
                );
                break;
            case "BL_FILE2":
                serviceLib.downloadFile(
                    dataKCD_FILEINFO_BL_FILE2.URL,
                    dataKCD_FILEINFO_BL_FILE2.NAME,
                );
                break;
            case "PL_FILE2":
                serviceLib.downloadFile(
                    dataKCD_FILEINFO_PL_FILE2.URL,
                    dataKCD_FILEINFO_PL_FILE2.NAME,
                );
                break;
            case "CI_FILE2":
                serviceLib.downloadFile(
                    dataKCD_FILEINFO_CI_FILE2.URL,
                    dataKCD_FILEINFO_CI_FILE2.NAME,
                );
                break;
            case "OTHER_FILE2":
                serviceLib.downloadFile(
                    dataKCD_FILEINFO_OTHER_FILE2.URL,
                    dataKCD_FILEINFO_OTHER_FILE2.NAME,
                );
                break;
            default:
                popup_INVOICE_INFO(rowData);
                break;
        }
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
    const [loadingTBL_KSV_ORDER_SHIP1, setLoadingTBL_KSV_ORDER_SHIP1] =
        useState(false);

    // DATAGRID CODE : TBL_KSV_ORDER_SHIP1

    // GUIDE: 에디터 컴포넌트에 onKeyDown 이벤트를 연결한다.

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
    const [loadingTBL_KSV_ORDER_SHIP2, setLoadingTBL_KSV_ORDER_SHIP2] =
        useState(false);

    // DATAGRID CODE : TBL_KSV_ORDER_SHIP2

    const [isLoadedFromSession, setIsLoadedFromSession] = useState(false);
    const loadFormFromSession = () => {
        const saved = sessionStorage.getItem("S0513_INVOICE_INFO");
        if (!saved) return;

        const parsed = JSON.parse(saved);
        if (typeof parsed.INVOICE_NO !== "undefined") {
        } else {
            parsed = { ...emptyQRY_KSV_ORDER_SHIP };
        }

        setDataQRY_KSV_ORDER_SHIP(parsed);
        setDataQRY_KSV_ORDER_SHIP_FACTORY_CD(parsed.FACTORY_CD);
        setDataQRY_KSV_ORDER_SHIP_BUYER_CD(parsed.BUYER_CD);
        setDataQRY_KSV_ORDER_SHIP_PAYMENT_TYPE(parsed.PAYMENT_TYPE);
        setDataQRY_KSV_ORDER_SHIP_DELIVERY_TYPE(parsed.DELIVERY_TYPE);
        setDataQRY_KSV_ORDER_SHIP_NAT_CD(parsed.NAT_CD);
        setDataQRY_KSV_ORDER_SHIP_SHIP_MODE(parsed.SHIP_MODE);

        // setIsLoadedFromSession(true);

        return {
            FACTORY_CD: parsed.FACTORY_CD,
            BUYER_CD: parsed.BUYER_CD,
            STYLE_CD: parsed.STYLE_CD,
            ORDER_CD: parsed.ORDER_CD,
            INVOICE_NO: parsed.INVOICE_NO,
            S_SHIP_DATE: parsed.S_SHIP_DATE,
            E_SHIP_DATE: parsed.E_SHIP_DATE,
            S_ATD: parsed.S_ATD,
            E_ATD: parsed.E_ATD,
            SHIP_MODE: parsed.SHIP_MODE,
            PAYMENT_TYPE: parsed.PAYMENT_TYPE,
            DELIVERY_TYPE: parsed.DELIVERY_TYPE,
            NAT_CD: parsed.NAT_CD,
        };
    };

    useEffect(() => {
        let tInvoiceNo = "";

        var tUrls = window.location.href.split("?");
        if (tUrls.length <= 1) {
        } else {
            var tParams1 = tUrls[1].split("&");
            var tParams2 = tParams1.map((col, i) => {
                var tObj = {};
                var tCols = col.split("=");
                if (tCols[0].includes("INVOICE_NO")) {
                    tObj.key = tCols[0];
                    tObj.value = tCols[1];
                    tInvoiceNo = tObj.value;
                }
            });
        }

        var _tObj = {};
        _tObj.BUYER_CD = "";

        serviceS0513_SHIPPING_LIST.mgrQuery_CODE(_tObj).then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                setDatasQRY_KSV_ORDER_SHIP_FACTORY_CD(data.FACTORY_CD);
                setDataQRY_KSV_ORDER_SHIP_FACTORY_CD(data.FACTORY_CD[0]);

                //setDatasQRY_KSV_ORDER_SHIP_STYLE_CD(data.STYLE_CD);
                //setDataQRY_KSV_ORDER_SHIP_STYLE_CD(data.STYLE_CD[0]);

                setDatasQRY_KSV_ORDER_SHIP_BUYER_CD(data.BUYER_CD);
                setDataQRY_KSV_ORDER_SHIP_BUYER_CD(data.BUYER_CD[0]);

                setDatasQRY_KSV_ORDER_SHIP_PAYMENT_TYPE(data.PAYMENT_TYPE);
                setDataQRY_KSV_ORDER_SHIP_PAYMENT_TYPE(data.PAYMENT_TYPE[0]);

                setDatasQRY_KSV_ORDER_SHIP_DELIVERY_TYPE(data.DELIVERY_TYPE);
                setDataQRY_KSV_ORDER_SHIP_DELIVERY_TYPE(data.DELIVERY_TYPE[0]);

                setDatasEDT_KSV_ORDER_SHIP_COUNTRY(data.NAT_CD);
                setDataEDT_KSV_ORDER_SHIP_COUNTRY(data.NAT_CD[0]);

                setDatasQRY_KSV_ORDER_SHIP_NAT_CD(data.NAT_CD);
                setDataQRY_KSV_ORDER_SHIP_NAT_CD(data.NAT_CD[0]);

                setDatasEDT_KSV_ORDER_SHIP_PAYMENT_TYPE(data.PAYMENT_TYPE);
                setDataEDT_KSV_ORDER_SHIP_PAYMENT_TYPE(data.PAYMENT_TYPE[0]);

                setDatasEDT_KSV_ORDER_SHIP_DELIVERY_TYPE(data.DELIVERY_TYPE);
                setDataEDT_KSV_ORDER_SHIP_DELIVERY_TYPE(data.DELIVERY_TYPE[0]);

                var tObj0 = { ...dataQRY_KSV_ORDER_SHIP };

                if (tInvoiceNo !== "") {
                    var tObj = loadFormFromSession();
                    if (!tObj) {
                        tObj = { ...tObj0 };
                    }
                    setDataQRY_KSV_ORDER_SHIP(tObj);

                    var tQryObj = { ...tObj };
                    tQryObj.INVOICE_NO = tInvoiceNo;
                    search_LIST_1(tQryObj);
                } else {
                    setDataQRY_KSV_ORDER_SHIP(tObj0);
                }
            } else {
                console.log(
                    "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });
    }, []);

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
        <div className="af-div-main">
            <div
                className="af-div-first"
                style={{ width: "123rem", height: "8rem" }}
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
                        ></Dropdown>
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
                        <InputText
                            style={{ width: "15rem" }}
                            id="id_PO_CD"
                            value={dataQRY_KSV_ORDER_SHIP.STYLE_CD}
                            onChange={(e) =>
                                onInputChangeQRY_KSV_ORDER_SHIP_STYLE_CD(
                                    e,
                                    "STYLE_CD",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "30rem" }}>
                    <div className="af-span-div-btn" style={{ width: "9rem" }}>
                        <Tooltip
                            className="menuCodeTooltip"
                            target={`#btnSearch`}
                            content={`Alt+S`}
                            position="bottom"
                        />

                        <Button
                            style={{ width: "9rem" }}
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
                    <div className="af-span-div-btn" style={{ width: "9rem" }}>
                        <Button
                            style={{ width: "9rem" }}
                            label="Excel"
                            className="p-button-text green"
                            onClick={search_LIST_EXCEL}
                        />
                    </div>
                </span>

                <span className="af-span-3" style={{ width: "20rem" }}>
                    <p className="af-span-p" style={{ width: "7rem" }}>Invoice#</p>
                    <div className="af-span-div" style={{ width: "12rem" }}>
                        <InputText
                            style={{ width: "12rem" }}
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

                <span className="af-span-3" style={{ width: "23rem" }}>
                    <p className="af-span-p" style={{ width: "7rem" }}>Payment</p>
                    <div className="af-span-div" style={{ width: "15rem" }}>
                        <Dropdown
                            disabled={paymentTypeDisabled}
                            style={{ width: "15rem" }}
                            id="id_PAYMENT_TYPE"
                            value={dataQRY_KSV_ORDER_SHIP_PAYMENT_TYPE}
                            onChange={(e) =>
                                onDropdownChangeQRY_KSV_ORDER_SHIP_PAYMENT_TYPE(
                                    e,
                                    "PAYMENT_TYPE",
                                )
                            }
                            options={datasQRY_KSV_ORDER_SHIP_PAYMENT_TYPE}
                            optionLabel="CD_NAME"
                            placeholder=""
                            editable
                        ></Dropdown>
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "23rem" }}>
                    <p className="af-span-p" style={{ width: "7rem" }}>Ship Mode</p>
                    <div className="af-span-div" style={{ width: "15rem" }}>
                        <Dropdown
                            style={{ width: "15rem" }}
                            id="id_ORDER_CD"
                            value={dataQRY_KSV_ORDER_SHIP_DELIVERY_TYPE}
                            onChange={(e) =>
                                onDropdownChangeQRY_KSV_ORDER_SHIP_DELIVERY_TYPE(
                                    e,
                                    "DELIVERY_TYPE",
                                )
                            }
                            options={datasQRY_KSV_ORDER_SHIP_DELIVERY_TYPE}
                            optionLabel="CD_NAME"
                            placeholder=""
                            editable
                        ></Dropdown>
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "23rem" }}>
                    <p className="af-span-p" style={{ width: "7rem" }}>Country</p>
                    <div className="af-span-div" style={{ width: "15rem" }}>
                        <Dropdown
                            style={{ width: "15rem" }}
                            id="id_ORDER_CD"
                            value={dataQRY_KSV_ORDER_SHIP_NAT_CD}
                            onChange={(e) =>
                                onDropdownChangeQRY_KSV_ORDER_SHIP_NAT_CD(
                                    e,
                                    "NAT_CD",
                                )
                            }
                            options={datasQRY_KSV_ORDER_SHIP_NAT_CD}
                            optionLabel="NAT_NAME"
                            placeholder=""
                            editable
                            filter
                        ></Dropdown>
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "9rem" }}>
                    <div className="af-span-div-btn" style={{ width: "9rem" }}>
                        <Button
                            style={{ width: "9rem" }}
                            label="Regist"
                            className="p-button-text orange"
                            onClick={process_REGIST}
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "9rem" }}>
                    <div className="af-span-div-btn" style={{ width: "9rem" }}>
                        <Button
                            style={{ width: "9rem" }}
                            label="Reset"
                            className="p-button-text"
                            onClick={process_RESET}
                        />
                    </div>
                </span>

                <span className="af-span-3" style={{ width: "21rem" }}>
                    <p className="af-span-p" style={{ width: "7rem" }}>ETD</p>
                    <div className="af-span-div" style={{ width: "6rem" }}>
                        <Calendar
                            showButtonBar
                            dateFormat="yy-mm-dd"
                            style={{ width: "6rem" }}
                            id="id_IN_DATE"
                            value={changeDateVal(
                                dataQRY_KSV_ORDER_SHIP.S_SHIP_DATE,
                            )}
                            onChange={(e) =>
                                onCalChangeQRY_KSV_ORDER_SHIP_S_SHIP_DATE(
                                    e,
                                    "S_SHIP_DATE",
                                )
                            }
                        />
                    </div>
                    <p className="af-span-p" style={{ width: "1rem" }}>~</p>
                    <div className="af-span-div" style={{ width: "6rem" }}>
                        <Calendar
                            showButtonBar
                            dateFormat="yy-mm-dd"
                            style={{ width: "6rem" }}
                            id="id_IN_DATE"
                            value={changeDateVal(
                                dataQRY_KSV_ORDER_SHIP.E_SHIP_DATE,
                            )}
                            onChange={(e) =>
                                onCalChangeQRY_KSV_ORDER_SHIP_E_SHIP_DATE(
                                    e,
                                    "E_SHIP_DATE",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "22rem" }}>
                    <p className="af-span-p" style={{ width: "6rem" }}>ATD</p>
                    <div className="af-span-div" style={{ width: "6rem" }}>
                        <Calendar
                            showButtonBar
                            dateFormat="yy-mm-dd"
                            style={{ width: "6rem" }}
                            id="id_IN_DATE"
                            value={changeDateVal(dataQRY_KSV_ORDER_SHIP.S_ATD)}
                            onChange={(e) =>
                                onCalChangeQRY_KSV_ORDER_SHIP_S_ATD(e, "S_ATD")
                            }
                        />
                    </div>
                    <p className="af-span-p" style={{ width: "1rem" }}>~</p>
                    <div className="af-span-div" style={{ width: "6rem" }}>
                        <Calendar
                            showButtonBar
                            dateFormat="yy-mm-dd"
                            style={{ width: "6rem" }}
                            id="id_IN_DATE"
                            value={changeDateVal(dataQRY_KSV_ORDER_SHIP.E_ATD)}
                            onChange={(e) =>
                                onCalChangeQRY_KSV_ORDER_SHIP_E_ATD(e, "E_ATD")
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "70rem" }}>
                    <p className="af-span-p" style={{ width: "7rem" }}>BL#</p>
                    <div className="af-span-div" style={{ width: "15rem" }}>
                        <InputText
                            style={{ width: "15rem" }}
                            value={dataQRY_KSV_ORDER_SHIP.BL_NO}
                            onChange={(e) =>
                                onInputChangeQRY_KSV_ORDER_SHIP_INVOICE_NO(
                                    e,
                                    "BL_NO",
                                )
                            }
                        />
                    </div>
                </span>
            </div>

            <div
                className="af-div-first"
                style={{ width: "123rem", height: "34rem" }}
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
                    onRowDoubleClick={onRowDoubleClickTBL_KSV_ORDER_SHIP}
                    virtualScrollerOptions={{ itemSize: 20 }}
                    emptyMessage="" //header={headerTBL_KSV_ORDER_SHIP}
                    responsiveLayout="scroll"
                    scrollable
                    scrollHeight="90%"
                >
                    <AFColumn field="INVOICE_NO" className="orange" header="Invoice#" headerStyle={{ width: "8rem" }} ></AFColumn>

                    <AFColumn field="BUYER_NAME" header="Buyer" headerStyle={{ width: "8rem" }} ></AFColumn>
                    <AFColumn field="SHIP_DATE" header="ETD" headerStyle={{ width: "6rem" }} body={(rowData) => serviceLib.dateFormatHMS(rowData.SHIP_DATE) } ></AFColumn>
                    <AFColumn field="ATD" header="ATD" headerStyle={{ width: "6rem" }} body={(rowData) => serviceLib.dateFormatHMS(rowData.ATD) } ></AFColumn>
                    <AFColumn field="NAT_CD" header="Country" headerStyle={{ width: "8rem" }} hidden ></AFColumn>
                    <AFColumn field="NAT_NAME" header="Country" headerStyle={{ width: "8rem" }} ></AFColumn>
                    {/*<AFColumn field="PAYMENT_TYPE" header="Payment#" headerStyle={{ width: '10rem' }} ></AFColumn>*/}
                    <AFColumn field="PAYMENT_NAME" header="Payment Type" headerStyle={{ width: "8rem" }} ></AFColumn>
                    {/*<AFColumn field="SHIP_MODE_N" header="Ship Kind" headerStyle={{ width: '8rem' }} ></AFColumn>*/}
                    <AFColumn field="DELIVERY_TYPE_N" header="Ship Mode" headerStyle={{ width: "5rem" }} ></AFColumn>
                    <AFColumn field="ORDER_QTY" header="Order Qty" headerStyle={{ width: "5rem" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.ORDER_QTY, 2) } ></AFColumn>
                    <AFColumn field="SHIP_QTY" header="Ship Qty" headerStyle={{ width: "5rem" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.SHIP_QTY, 2) } ></AFColumn>
                    <AFColumn field="ORD_AMT" header="Ship Amt" headerStyle={{ width: "5rem" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.ORD_AMT, 2) } ></AFColumn>
                    <AFColumn field="ADJ_AMT" header="Adjust Amt" headerStyle={{ width: "5rem" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.ADJ_AMT, 2) } ></AFColumn>
                    <AFColumn field="TOT_AMT" header="Invoice Amt" headerStyle={{ width: "5rem" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.TOT_AMT, 2) } ></AFColumn>
                    <AFColumn field="BILL_AMT" header="Received Amt" headerStyle={{ width: "5rem" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.BILL_AMT, 2) } ></AFColumn>
                    <AFColumn field="OA_NEGO" header="OA Nego" headerStyle={{ width: "5rem" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.OA_NEGO, 2) } ></AFColumn>
                    <AFColumn field="BL_NO" header="BL#" headerStyle={{ width: "5rem" }} ></AFColumn>
                    <AFColumn field="BL_FILE" header="BL" headerStyle={{ width: "3rem", textAlign: "center" }} bodyStyle={{ textAlign: "center", cursor: "pointer" }} body={(rowData) => ( <div onDoubleClick={(e) => { e.stopPropagation(); onFileCellDoubleClick("BL_FILE", rowData); }} > {rowData.BL_FILE ? "✔️" : ""} </div> )} />
                    <AFColumn field="PL_FILE" header="PL" headerStyle={{ width: "3rem", textAlign: "center" }} bodyStyle={{ textAlign: "center", cursor: "pointer" }} body={(rowData) => ( <div onDoubleClick={(e) => { e.stopPropagation(); onFileCellDoubleClick("PL_FILE", rowData); }} > {rowData.PL_FILE ? "✔️" : ""} </div> )} />
                    <AFColumn field="CI_FILE" header="CI" headerStyle={{ width: "3rem", textAlign: "center" }} bodyStyle={{ textAlign: "center", cursor: "pointer" }} body={(rowData) => ( <div onDoubleClick={(e) => { e.stopPropagation(); onFileCellDoubleClick("CI_FILE", rowData); }} > {rowData.CI_FILE ? "✔️" : ""} </div> )} />
                    <AFColumn field="OTHER_FILE" header="Othr." headerStyle={{ width: "3rem", textAlign: "center" }} bodyStyle={{ textAlign: "center", cursor: "pointer" }} body={(rowData) => ( <div onDoubleClick={(e) => { e.stopPropagation(); onFileCellDoubleClick( "OTHER_FILE", rowData, ); }} > {rowData.OTHER_FILE ? "✔️" : ""} </div> )} />
                    <AFColumn field="BL_FILE2" header="BL2" headerStyle={{ width: "3rem", textAlign: "center" }} bodyStyle={{ textAlign: "center", cursor: "pointer" }} body={(rowData) => ( <div onDoubleClick={(e) => { e.stopPropagation(); onFileCellDoubleClick("BL_FILE2", rowData); }} > {rowData.BL_FILE2 ? "✔️" : ""} </div> )} />
                    <AFColumn field="PL_FILE2" header="PL2" headerStyle={{ width: "3rem", textAlign: "center" }} bodyStyle={{ textAlign: "center", cursor: "pointer" }} body={(rowData) => ( <div onDoubleClick={(e) => { e.stopPropagation(); onFileCellDoubleClick("PL_FILE2", rowData); }} > {rowData.PL_FILE2 ? "✔️" : ""} </div> )} />
                    <AFColumn field="CI_FILE2" header="CI2" headerStyle={{ width: "3rem", textAlign: "center" }} bodyStyle={{ textAlign: "center", cursor: "pointer" }} body={(rowData) => ( <div onDoubleClick={(e) => { e.stopPropagation(); onFileCellDoubleClick("CI_FILE2", rowData); }} > {rowData.CI_FILE2 ? "✔️" : ""} </div> )} />
                    <AFColumn field="OTHER_FILE2" header="Othr2" headerStyle={{ width: "3rem", textAlign: "center" }} bodyStyle={{ textAlign: "center", cursor: "pointer" }} body={(rowData) => ( <div onDoubleClick={(e) => { e.stopPropagation(); onFileCellDoubleClick( "OTHER_FILE2", rowData, ); }} > {rowData.OTHER_FILE2 ? "✔️" : ""} </div> )} />
                    <AFColumn field="COMPLETE" header="COMPLETE" headerStyle={{ width: "6rem" }} bodyStyle={{ textAlign: "CENTER" }} body={(rowData) => ( <div>{rowData.COMPLETE === "1" || rowData.DOCU_NO ? "✔️" : ""}</div> )} ></AFColumn>
                </AFDataTable>
            </div>

            <div
                className="af-div-first"
                style={{ width: "123rem", height: "3rem" }}
            >
                <span className="af-span-3" style={{ width: "9rem" }}>
                    <div className="af-span-div-btn" style={{ width: "9rem" }}>
                        <Button
                            style={{ width: "9rem" }}
                            label="Update"
                            className="p-button-text orange"
                            onClick={blankFn}
                        />
                    </div>
                </span>
            </div>

            <div
                className="af-div-first"
                style={{ width: "123rem", height: "40vh" }}
            >
                <AFDataTable preventUnrelatedRerender
                    ref={dt_TBL_KSV_ORDER_SHIP3}
                    size="small"
                    value={datasTBL_KSV_ORDER_SHIP3}
                    loading={loadingTBL_KSV_ORDER_SHIP3}
                    tableStyle={{ tableLayout: "fixed" }}
                    resizableColumns
                    columnResizeMode="expand"
                    showGridlines
                    selectionMode="checkbox"
                    selection={selectedTBL_KSV_ORDER_SHIP3}
                    onSelectionChange={(e) => {
                        setSelectedTBL_KSV_ORDER_SHIP3(e.value);
                    }}
                    dataKey="id"
                    className="datatable-responsive"
                    virtualScrollerOptions={{ itemSize: 20 }}
                    emptyMessage=""
                    //header={headerTBL_KSV_ORDER_SHIP}
                    responsiveLayout="scroll"
                    scrollable
                    //  scrollHeight="580px"
                    scrollHeight="90%"
                >
                    <AFColumn field="BUYER_CD" header="Buyer" headerStyle={{ width: "5rem" }} ></AFColumn>
                    <AFColumn field="PO_CD" header="Po#" headerStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="ORDER_CD" header="Order#" headerStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="STYLE_NAME" header="Style" headerStyle={{ width: "15rem" }} ></AFColumn>
                    <AFColumn field="SHIP_QTY" header="Ship Qty" headerStyle={{ width: "6rem" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.SHIP_QTY, 2) } ></AFColumn>
                    <AFColumn field="CURR_CD" header="Curr" headerStyle={{ width: "4rem" }} ></AFColumn>
                    <AFColumn field="FOB" header="Fob" headerStyle={{ width: "6rem" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.FOB, 4) } ></AFColumn>
                    <AFColumn field="SALES_PRICE" header="S.Price" headerStyle={{ width: "6rem" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.SALES_PRICE, 4) } ></AFColumn>
                    <AFColumn field="SHIP_PRICE" header="Ship Price" headerStyle={{ width: "6rem" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.SHIP_PRICE, 4) } ></AFColumn>
                    <AFColumn field="TOT_AMT" header="Ship Amount" headerStyle={{ width: "8rem" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.TOT_AMT, 2) } ></AFColumn>
                    <AFColumn field="FACTORY_NAME" header="Factory" headerStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="INVOICE_NO" header="Invoice#" headerStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="SEQ" header="Seq" headerStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="SHIP_DATE" header="Ship Date" headerStyle={{ width: "10rem" }} body={(rowData) => serviceLib.dateFormatHMS(rowData.SHIP_DATE) } ></AFColumn>
                    <AFColumn field="NAT_CD" header="Nat#" headerStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="COUNTRY" header="Country" headerStyle={{ width: "10rem" }} ></AFColumn>
                </AFDataTable>
            </div>

            <Toast ref={toast} />
        </div>
    );
};

const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(S0513_SHIPPING_LIST, comparisonFn);
