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

import $ from "jquery";

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
    SHIP_MODE: "5",
    CI_FILE: "",
    CI_FILE2: "",
    DELIVERY_TYPE: "",
    OTHER_FILE: "",
    OTHER_FILE2: "",
    SHIP_AMT: "0",
    ADJ_AMT: "0",
    TOT_AMT: "0",
    BUYER_CD: "",
    FACTORY_CD: "",
    IS_NON_GARMENT: "0",
};

const S051301_SHIPPING_REGIST = () => {
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

    const [cntTotal, setCntTotal] = useState("");
    const [isREGIST, setIsREGIST] = useState("");
    const [isATD, setIsATD] = useState(true);

    const [urlIframe, setUrlIframe] = useState("");
    const [createDialog, setCreateDialog] = useState(false);
    const hideDialog = () => {
        setCreateDialog(false);
    };

    const popup_ADD_ORDER = () => {
        var tRetDate = serviceLib.getCurrDate().substring(0, 8);

        var tSelObj = {};
        if (selectedTBL_KSV_ORDER_SHIP.length > 0) {
            tSelObj = { ...selectedTBL_KSV_ORDER_SHIP[0] };
            if (tSelObj.DOCU_NO !== "") {
                alert(
                    "이미 전표 처리된 invoice 에 오더를 추가할수 없습니다(Add Order)",
                );
                return;
            }
            if (tSelObj.SHIP_DATE !== tRetDate) {
                alert("ETD가 다르면 Order 을 추가할수 없습니다<br><br>If the ETD is different, you cannot add an Order.");
                return;
            }
        }

        var tInput0 = { ...dataQRY_KSV_ORDER_SHIP };

        var tObj = { ...dataQRY_KSV_ORDER_SHIP1 };
        tObj.BUYER_CD = tInput0.BUYER_CD;
        tObj.FACTORY_CD = tInput0.FACTORY_CD;
        setDataQRY_KSV_ORDER_SHIP1(tObj);

        search_LIST_3(tObj);

        setCreateDialog(true);
    };

    const [saveInvoiceInfo, setSaveInvoiceInfo] = useState({});
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

    const process_FILL_SHIPQTY = () => {
        var tTotal = 0;
        var tTotAmt = 0;
        var tTotQty = 0;
        var tArray = [];

        datasTBL_KSV_ORDER_SHIP1.forEach((col, i) => {
            var tObj = { ...col };
            if (col.SIZE !== "Total") {
                if (
                    parseFloat(tObj.REMAIN_QTY) > 0 &&
                    parseFloat(tObj.SHIP_QTY) <= 0
                ) {
                    tObj.SHIP_CNT = String(
                        parseFloat(tObj.SHIP_CNT) + parseFloat(tObj.REMAIN_QTY),
                    );
                    var tAmt =
                        parseFloat(tObj.SHIP_CNT) * parseFloat(col.PRICE);
                    tObj.REMAIN_QTY = "0";
                    tObj.AMOUNT = String(tAmt);
                }
                tTotQty += parseFloat(tObj.SHIP_CNT);
                tTotAmt += parseFloat(tObj.AMOUNT);
                tArray.push(tObj);
            } else {
                tObj.SHIP_CNT = tTotQty;
                tObj.AMOUNT = tTotAmt;
                tTotal += tTotAmt;
                tTotQty = 0;
                tTotAmt = 0;
                tArray.push(tObj);
            }
        });
        setDatasTBL_KSV_ORDER_SHIP1(tArray);

        var tEDT = { ...dataEDT_KSV_ORDER_SHIP };
        tEDT.SHIP_AMT = String(tTotal);
        var tTotal0 = tTotal + parseFloat(tEDT.ADJ_AMT);
        tEDT.TOT_AMT = String(tTotal0);
        setDataEDT_KSV_ORDER_SHIP(tEDT);
    };

    const process_RESET = () => {
        var _tObj = { ...dataEDT_KSV_ORDER_SHIP };
        _tObj.INVOICE_NO = "";
        _tObj.SHIP_DATE = "";
        _tObj.ATD = "";
        _tObj.EX_FACTORY_DATE = "";
        _tObj.BL_NO = "";
        _tObj.COUNTRY = " ";
        _tObj.PAYMENT_TYPE = " ";
        _tObj.DELIVERY_TYPE = " ";
        _tObj.BL_FILE = "";
        _tObj.PL_FILE = "";
        _tObj.CI_FILE = "";
        _tObj.OTHER_FILE = "";
        _tObj.BL_FILE2 = "";
        _tObj.PL_FILE2 = "";
        _tObj.CI_FILE2 = "";
        _tObj.OTHER_FILE2 = "";
        _tObj.TOT_AMT = "0";
        _tObj.ADJ_AMT = "0";
        _tObj.SHHIP_AMT = "0";
        _tObj.IS_NON_GARMENT = "0";
        _tObj.SHIP_AMT = "0";
        _tObj.ADJ_AMT = "0";
        _tObj.TOT_AMT;

        setDataEDT_KSV_ORDER_SHIP(_tObj);

        editEDT_KSV_ORDER_SHIP_COUNTRY(" ");
        editEDT_KSV_ORDER_SHIP_PAYMENT_TYPE(" ");
        editEDT_KSV_ORDER_SHIP_DELIVERY_TYPE(" ");

        setDatasTBL_KSV_ORDER_SHIP1([]);
        setSelectedTBL_KSV_ORDER_SHIP1([]);
        setSelectedTBL_KSV_ORDER_SHIP([]);
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

    const search_LIST_EXCEL = (argData) => {
        var _tData = {};
        _tData.INVOICE_NO = dataEDT_KSV_ORDER_SHIP.INVOICE_NO;

        setLoadingTBL_KSV_ORDER_SHIP2(true);
        serviceS0513_SHIPPING_LIST
            .mgrQuery_EXCEL_BY_INVOICE(_tData)
            .then((data) => {
                setLoadingTBL_KSV_ORDER_SHIP2(false);
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

    const search_CODE_0 = (argData) => {
        console.log(argData);
        var _tObj = {};
        _tObj.BUYER_CD = "";
        serviceS0513_SHIPPING_LIST.mgrQuery_CODE(_tObj).then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                if (typeof argData.INVOICE_NO !== "undefined") {
                    setDatasEDT_KSV_ORDER_SHIP_COUNTRY(data.NAT_CD);
                    var tObj9 = {};
                    data.NAT_CD.forEach((col, i) => {
                        if (col.NAT_CD === argData.NAT_CD) tObj9 = { ...col };
                    });
                    if (typeof tObj9.NAT_CD !== "undefined")
                        setDataEDT_KSV_ORDER_SHIP_COUNTRY(tObj9);
                    else setDataEDT_KSV_ORDER_SHIP_COUNTRY(data.NAT_CD[0]);

                    let paymentType = JSON.parse(
                        JSON.stringify(data.PAYMENT_TYPE),
                    );
                    paymentType.splice(-2); // remove FACTORY LC, FOB PAYMENT
                    paymentType[2].CD_NAME = "FOC";

                    setDatasEDT_KSV_ORDER_SHIP_PAYMENT_TYPE(paymentType);
                    tObj9 = {};
                    paymentType.forEach((col, i) => {
                        if (col.CD_CODE === argData.PAYMENT_TYPE)
                            tObj9 = { ...col };
                    });
                    if (typeof tObj9.CD_CODE !== "undefined")
                        setDataEDT_KSV_ORDER_SHIP_PAYMENT_TYPE(tObj9);
                    else setDataEDT_KSV_ORDER_SHIP_PAYMENT_TYPE(paymentType[0]);

                    setDatasEDT_KSV_ORDER_SHIP_DELIVERY_TYPE(
                        data.DELIVERY_TYPE,
                    );

                    tObj9 = {};
                    data.DELIVERY_TYPE.forEach((col, i) => {
                        if (col.CD_CODE === argData.DELIVERY_TYPE)
                            tObj9 = { ...col };
                    });

                    if (
                        tObj9.CD_CODE === "6" ||
                        tObj9.CD_CODE === "7" ||
                        tObj9.CD_CODE === "FK"
                    ) {
                        $("#invoiceLabel").removeClass("red");
                        $("#id_invoiceCode").val("").attr("disabled", true);
                    } else {
                        $("#invoiceLabel").addClass("red");
                        $("#id_invoiceCode").attr("disabled", false);
                    }

                    if (typeof tObj9.CD_CODE !== "undefined")
                        setDataEDT_KSV_ORDER_SHIP_DELIVERY_TYPE(tObj9);
                    else
                        setDataEDT_KSV_ORDER_SHIP_DELIVERY_TYPE(
                            data.DELIVERY_TYPE[0],
                        );

                    setDatasEDT_KSV_ORDER_SHIP_BUYER_CD(data.BUYER_CD);
                    tObj9 = {};
                    data.BUYER_CD.forEach((col, i) => {
                        if (col.BUYER_CD === argData.BUYER_CD)
                            tObj9 = { ...col };
                    });
                    if (typeof tObj9.BUYER_CD !== "undefined")
                        setDataEDT_KSV_ORDER_SHIP_BUYER_CD(tObj9);
                    else setDataEDT_KSV_ORDER_SHIP_BUYER_CD(data.BUYER_CD[0]);

                    setDatasEDT_KSV_ORDER_SHIP_FACTORY_CD(data.FACTORY_CD);
                    tObj9 = {};
                    data.FACTORY_CD.forEach((col, i) => {
                        if (col.FACTORY_CD === argData.FACTORY_CD)
                            tObj9 = { ...col };
                    });
                    if (typeof tObj9.FACTORY_CD !== "undefined")
                        setDataEDT_KSV_ORDER_SHIP_FACTORY_CD(tObj9);
                    else setDataEDT_KSV_ORDER_SHIP_FACTORY_CD(data.FACTORY_CD[0]);

                } else {
                    process_RESET();
                    setDatasEDT_KSV_ORDER_SHIP_COUNTRY(data.NAT_CD);
                    setDataEDT_KSV_ORDER_SHIP_COUNTRY(data.NAT_CD[0]);

                    let paymentType = JSON.parse(
                        JSON.stringify(data.PAYMENT_TYPE),
                    );
                    paymentType.splice(-2); // remove FACTORY LC, FOB PAYMENT
                    paymentType[2].CD_NAME = "FOC";

                    setDatasEDT_KSV_ORDER_SHIP_PAYMENT_TYPE(paymentType);
                    tObj9 = {};
                    console.log(data.P);
                    if (typeof tObj9.CD_CODE !== "undefined")
                        setDataEDT_KSV_ORDER_SHIP_PAYMENT_TYPE(tObj9);
                    else setDataEDT_KSV_ORDER_SHIP_PAYMENT_TYPE(paymentType[0]);

                    setDatasEDT_KSV_ORDER_SHIP_DELIVERY_TYPE(
                        data.DELIVERY_TYPE,
                    );
                    setDataEDT_KSV_ORDER_SHIP_DELIVERY_TYPE(
                        data.DELIVERY_TYPE[0],
                    );

                    setDatasEDT_KSV_ORDER_SHIP_BUYER_CD(data.BUYER_CD);
                    setDataEDT_KSV_ORDER_SHIP_BUYER_CD(data.BUYER_CD[0]);

                    setDatasEDT_KSV_ORDER_SHIP_FACTORY_CD(data.FACTORY_CD);
                    setDataEDT_KSV_ORDER_SHIP_FACTORY_CD(data.FACTORY_CD[0]);
                }
            } else {
                console.log(
                    "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });
    };

    const search_LIST_1 = (argData) => {
        var _tData = { ...argData };

        // 2
        serviceS0513_SHIPPING_LIST.mgrQuery_LIST_1(_tData).then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                var findObj = {};
                data.forEach((col9, i9) => {
                    if (col9.INVOICE_NO === _tData.INVOICE_NO)
                        findObj = { ...col9 };
                });

                // var argData = { ...data[0] };
                var argData = { ...findObj };
                setSaveInvoiceInfo(argData);
                var _tObj = { ...dataEDT_KSV_ORDER_SHIP };
                _tObj.INVOICE_NO = argData.INVOICE_NO;
                _tObj.SHIP_DATE = argData.SHIP_DATE;
                _tObj.BUYER_CD = argData.BUYER_CD;
                _tObj.ATD = argData.ATD;
                _tObj.EX_FACTORY_DATE = argData.EXFACTORY;
                _tObj.BL_NO = argData.BL_NO;
                _tObj.COUNTRY = argData.NAT_CD;
                _tObj.PAYMENT_TYPE = argData.PAYMENT_TYPE;
                _tObj.DELIVERY_TYPE = argData.DELIVERY_TYPE;
                _tObj.BL_FILE = argData.BL_FILE;
                _tObj.PL_FILE = argData.PL_FILE;
                _tObj.CI_FILE = argData.CI_FILE;
                _tObj.OTHER_FILE = argData.OTHER_FILE;
                _tObj.BL_FILE2 = argData.BL_FILE2;
                _tObj.PL_FILE2 = argData.PL_FILE2;
                _tObj.CI_FILE2 = argData.CI_FILE2;
                _tObj.OTHER_FILE2 = argData.OTHER_FILE2;
                _tObj.SHIP_AMT = argData.ORD_AMT;
                _tObj.ADJ_AMT = argData.ADJ_AMT;
                _tObj.TOT_AMT = argData.TOT_AMT;
                _tObj.IS_NON_GARMENT = argData.IS_NON_GARMENT;
                setDataEDT_KSV_ORDER_SHIP(_tObj);

                if (argData.IS_NON_GARMENT === "1") {
                    setIsOrder(false);
                    setIsGarment(true);
                }

                if (
                    argData.PAYMENT_TYPE === "" ||
                    argData.PAYMENT_TYPE === null
                )
                    setIsREGIST("미등록");
                else setIsREGIST("등록");

                var tFileObj = {};
                tFileObj.NAME = argData.BL_FILE;
                tFileObj.URL = argData.BL_FILE_URL;
                setDataKCD_FILEINFO_BL_FILE(tFileObj);
                if (argData.BL_FILE !== "" || argData.ATD !== "")
                    setIsATD(false);

                tFileObj = {};
                tFileObj.NAME = argData.PL_FILE;
                tFileObj.URL = argData.PL_FILE_URL;
                setDataKCD_FILEINFO_PL_FILE(tFileObj);
                if (argData.PL_FILE !== "" || argData.ATD !== "")
                    setIsATD(false);

                tFileObj = {};
                tFileObj.NAME = argData.CI_FILE;
                tFileObj.URL = argData.CI_FILE_URL;
                setDataKCD_FILEINFO_CI_FILE(tFileObj);
                if (argData.CI_FILE !== "" || argData.ATD !== "")
                    setIsATD(false);

                tFileObj = {};
                tFileObj.NAME = argData.OTHER_FILE;
                tFileObj.URL = argData.OTHER_FILE_URL;
                setDataKCD_FILEINFO_OTHER_FILE(tFileObj);
                if (argData.OTHER_FILE !== "" || argData.ATD !== "")
                    setIsATD(false);

                var tFileObj = {};
                tFileObj.NAME = argData.BL_FILE2;
                tFileObj.URL = argData.BL_FILE_URL2;
                setDataKCD_FILEINFO_BL_FILE2(tFileObj);
                if (argData.BL_FILE2 !== "" || argData.ATD !== "")
                    setIsATD(false);

                tFileObj = {};
                tFileObj.NAME = argData.PL_FILE2;
                tFileObj.URL = argData.PL_FILE_URL2;
                setDataKCD_FILEINFO_PL_FILE2(tFileObj);
                if (argData.PL_FILE2 !== "" || argData.ATD !== "")
                    setIsATD(false);

                tFileObj = {};
                tFileObj.NAME = argData.CI_FILE2;
                tFileObj.URL = argData.CI_FILE_URL2;
                setDataKCD_FILEINFO_CI_FILE2(tFileObj);
                if (argData.CI_FILE2 !== "" || argData.ATD !== "")
                    setIsATD(false);

                tFileObj = {};
                tFileObj.NAME = argData.OTHER_FILE2;
                tFileObj.URL = argData.OTHER_FILE_URL2;
                setDataKCD_FILEINFO_OTHER_FILE2(tFileObj);
                if (argData.OTHER_FILE2 !== "" || argData.ATD !== "")
                    setIsATD(false);

                //search_LIST_2(argData);
                //search_CODE_0(argData);
            } else {
                console.log(
                    "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });
    };

    const search_LIST_2 = (argData) => {
        //setDatasTBL_KSV_ORDER_SHIP1([]);
        //setSelectedTBL_KSV_ORDER_SHIP1([]);

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
                var sumTotal = 0;
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

                        tOne1.PRICE = String(
                            parseFloat(
                                tOne.PRICE_CNT.substring(i * 10, i * 10 + 10),
                            ),
                        );
                        tOne1.PRICE = parseFloat(tOne1.PRICE).toFixed(2);

                        console.log(tOne1.PRICE);

                        tOne1.AMOUNT = String(
                            parseFloat(tOne1.SHIP_CNT) *
                                parseFloat(tOne1.PRICE),
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
                        tOne1.ORDER_STATUS = tOne.ORDER_STATUS;
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
                        tOne1.ORDER_STATUS = '';
                        tOne1.id = tSeq;
                        tSeq += 1;
                        tArray.push(tOne1);
                        sumTotal += tSumAmount;
                    }
                }

                var tArray1 = [];
                tArray.forEach((col, i) => {
                    var tObj = { ...col };
                    tObj.id = i + 1;
                    tArray1.push(tObj);
                });

                setDatasTBL_KSV_ORDER_SHIP1(tArray1);
                setCntTotal(String(sumTotal.toFixed(2)));
            } else {
                console.log(
                    "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });
    };

    const search_LIST_2_1 = (argData) => {
        var tInObjs = [];
        argData.forEach((col, i) => {
            var tFlag = 0;
            datasTBL_KSV_ORDER_SHIP1.forEach((col1, i1) => {
                if (
                    col.ORDER_CD === col1.ORDER_CD &&
                    col.PROD_CD === col1.PROD_CD
                )
                    tFlag = 1;
            });
            if (tFlag === 0) {
                var tObj = { ...col };
                tInObjs.push(tObj);
            }
        });

        // setDatasTBL_KSV_ORDER_SHIP1([]);
        setSelectedTBL_KSV_ORDER_SHIP1([]);

        // 3
        serviceS0513_SHIPPING_LIST.mgrQuery_LIST_2_1(tInObjs).then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                console.log(
                    "ServiceMgrKCD_BUYER.mgr1KcdStyle call => " + data.length,
                );
                var tArray = [...datasTBL_KSV_ORDER_SHIP1];
                var tIdx = 0;
                var tSeq = 0;
                var tArray9 = [...saveLIST_2];
                data.forEach((col, i) => {
                    var tObj = { ...col };
                    tArray9.push(tObj);
                });
                setSaveLIST_2(tArray9);

                // setSaveLIST_2(data);
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
                        tArray.push(tOne1);
                    }
                }

                var tArray1 = [];
                tArray.forEach((col, i) => {
                    var tObj = { ...col };
                    tObj.id = i + 1;
                    tArray1.push(tObj);
                });

                setDatasTBL_KSV_ORDER_SHIP1(tArray1);

                setCreateDialog(false);
                setDatasTBL_KSV_ORDER_SHIP2([]);
            } else {
                console.log(
                    "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });
    };

    const search_LIST_3 = (argData) => {
        var tInput0 = {};
        if (typeof argData.FACTORY_CD === "undefined") {
            tInput0 = { ...dataQRY_KSV_ORDER_SHIP1 };
        } else {
            tInput0 = { ...argData };
        }
        // var tInput = { ...dataQRY_KSV_ORDER_SHIP1 };

        setDatasTBL_KSV_ORDER_SHIP2([]);
        setSelectedTBL_KSV_ORDER_SHIP2([]);

        var tInObj = {};
        tInObj.ORDER_CD = tInput0.ORDER_CD;
        tInObj.BUYER_CD = tInput0.BUYER_CD;
        tInObj.FACTORY_CD = tInput0.FACTORY_CD;

        // 4
        setLoadingTBL_KSV_ORDER_SHIP2(true);
        serviceS0513_SHIPPING_LIST.mgrQuery_LIST_3(tInObj).then((data) => {
            setLoadingTBL_KSV_ORDER_SHIP2(false);
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
        if (selectedTBL_KSV_ORDER_SHIP2.length <= 0) {
            alert("적용할 데이타를 선택하세요<br><br>Select the data to apply");
            return;
        }
        var tInObjs = [];
        var tSaveBuyerCd = "";
        var tSaveCurrCd = "";
        var tFlag1 = 0;
        var tFlag2 = 0;
        var tFlag3 = 0;
        selectedTBL_KSV_ORDER_SHIP2.forEach((col, i) => {
            var tObj = {};

            if (!col) {
                return;
            }

            if (
                tSaveBuyerCd !== "" &&
                tSaveBuyerCd !== col.ORDER_CD.substring(0, 2)
            ) {
                tFlag1 = 1;
            }
            if (tSaveCurrCd !== "" && tSaveCurrCd !== col.CURR_CD) {
                tFlag2 = 1;
            }
            if (parseFloat(col.BAL_CNT) <= 0) tFlag3 = 1;
            tObj.ORDER_CD = col.ORDER_CD;
            tObj.PROD_CD = col.PROD_CD;
            tSaveBuyerCd = col.ORDER_CD.substring(0, 2);
            tSaveCurrCd = col.CURR_CD;
            tInObjs.push(tObj);
        });
        if (tFlag1 === 1) {
            alert("같은 바이어만 가능합니다<br><br>Only available to same buyers");
            return;
        }
        if (tFlag2 === 1) {
            alert("같은 Curr만 가능합니다<br><br>Only the same Curr is possible");
            return;
        }

        search_LIST_2_1(tInObjs);
        setCreateDialog(false);
    };

    const process_REMOVE_ORDER = () => {
        var _tDataArray = [...selectedTBL_KSV_ORDER_SHIP1];
        var tSelObj = {};
        if (_tDataArray.length <= 0) {
            alert("작업할 데이타를 선택하세요<br><br>Choose the data you want to work with");
            return;
        } else {
            tSelObj = { ...selectedTBL_KSV_ORDER_SHIP1[0] };
        }

        if (tSelObj.ORDER_CD === "") {
            alert("Order 번호가 있는 데이타를 선택해 주세요<br><br>Please select the data with the order number");
            return;
        }

        var tInData = {};
        tInData.ORDER_CD = tSelObj.ORDER_CD;

        serviceS0513_SHIPPING_LIST
            .mgrInsert_CHECK_REMOVE_ORDER(tInData)
            .then((data) => {
                if (typeof data.graphQLErrors === "undefined") {
                    if (typeof data.length === "undefined") {
                    } else {
                        if (data.length > 0) {
                            alert(data[0].CODE);
                            if (data[0].CODE.includes("SUCC")) {
                                process_REMOVE_ORDER_sub(tSelObj);
                            }
                        }
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

    const process_REMOVE_ORDER_sub = (argSelObj) => {
        var tSelObj = { ...argSelObj };
        if (typeof saveInvoiceInfo.DOCU_NO !== "undefined") {
            if (saveInvoiceInfo.DOCU_NO !== "") {
                alert("전표처리된 invoice는 수정할수 없습니다(remove order)<br><br>Invoices that have been processed cannot be modified (remove order)");
                return;
            }
        }

        var _tData1 = [];
        var tFlag1 = 0;
        datasTBL_KSV_ORDER_SHIP1.forEach((col, i) => {
            if (
                tFlag1 === 0 &&
                col.ORDER_CD === tSelObj.ORDER_CD &&
                col.COLOR === tSelObj.COLOR
            ) {
                tFlag1 = 1;
            } else if (tFlag1 === 1 && col.ORDER_CD === "") {
            } else if (
                tFlag1 === 1 &&
                (col.ORDER_CD !== tSelObj.ORDER_CD ||
                    (col.ORDER_CD === tSelObj.ORDER_CD &&
                        col.COLOR !== tSelObj.COLOR))
            ) {
                tFlag1 = 0;
                var tObj = { ...col };
                _tData1.push(tObj);
            } else {
                var tObj = { ...col };
                _tData1.push(tObj);
            }
        });
        setSelectedTBL_KSV_ORDER_SHIP1([]);
        setDatasTBL_KSV_ORDER_SHIP1(_tData1);

        alert("Save을 이용해서 저장해야만 Remove 결과가 반영됩니다<br><br>The Remove result will be reflected only when you save it using Save.");
    };

    const process_INSERT = async (event) => {
        var _tDataArray = [...datasTBL_KSV_ORDER_SHIP1];
        var check1 = 0;
        _tDataArray.forEach((col, i) => {
            if (parseFloat(col.PRICE) > 100.0) {
                check1 = 1;
            }
        });

        if (check1 > 0) {
            // 가격입력이 100 달러를 넘을경우 경고 확인창.
            // USD 로 가격이 입력되는데 너무 큰 값이 실수로 입력되는것 막음
            var tRet = await window.confirm(
                " The [ship price] input exceeds $100. Do you want to continue creating the invoice? ",
            );
            if (tRet) {
                process_INSERT_SUB();
            }
        } else {
            process_INSERT_SUB();
        }
    };

    const process_INSERT_SUB = () => {
        var _tData0 = { ...dataEDT_KSV_ORDER_SHIP };
        var _tDataArray = [...datasTBL_KSV_ORDER_SHIP1];
        var tSelObj = {};
        if (selectedTBL_KSV_ORDER_SHIP.length > 0) {
            tSelObj = { ...selectedTBL_KSV_ORDER_SHIP[0] };
            if (
                typeof tSelObj.DOCU_NO !== "undefined" &&
                tSelObj.DOCU_NO !== null &&
                tSelObj.DOCU_NO !== ""
            ) {
                alert("전표처리된 invoice는 수정할수 없습니다(Insert)<br><br>Please check the message above.");
                return;
            }
        }

        if (
            dataEDT_KSV_ORDER_SHIP.DELIVERY_TYPE === "6" ||
            dataEDT_KSV_ORDER_SHIP.DELIVERY_TYPE === "7" ||
            dataEDT_KSV_ORDER_SHIP.DELIVERY_TYPE === "FK"
        ) {
        } else {
            if (
                _tData0.INVOICE_NO === "" ||
                _tData0.SHIP_DATE === "" ||
                _tData0.EXFACTORY === "" ||
                !_tData0.COUNTRY ||
                !_tData0.PAYMENT_TYPE ||
                !_tData0.DELIVERY_TYPE
            ) {
                alert("invoice No, ETD, Ex Factory는 필수 입력입니다<br><br>invoice No, ETD, Ex Factory are required inputs");
                return;
            }

            if (
                _tData0.COUNTRY === " " ||
                _tData0.PAYMENT_TYPE === " " ||
                _tData0.DELIVERY_TYPE === " "
            ) {
                alert("Country, Payment Type, Delivery Type은 필수 입력입니다<br><br>Country, Payment Type, and Delivery Type are required inputs.");
                return;
            }
        }

        if (_tDataArray.length <= 0 && _tData0.IS_NON_GARMENT !== "1") {
            // alert('전체 Order Remove는 Invoice Delete을 이용하세요');
            alert(
                "Invoice에 등록할 Order 데이터가 없습니다. Order데이타는 하나 이상이 있어야 합니다. 만약 전체 Order을 Remove한 경우라면 Invoice Delete을 이용하여 Invoice을 삭제하십시요 ",
            );
            return;
        }

        var _tSumAmt = 0;
        var _tSumQty = 0;

        var _tArray = [];
        var _tWorkObj = {};
        var _sizeArray = [];
        _tDataArray.forEach((col, i) => {
            if (col.ORDER_CD !== "") {
                // 첫번째
                if (typeof _tWorkObj.ORDER_CD !== "undefined") {
                    _tWorkObj.IN_SHIP_QTY = String(_tWorkObj.IN_SHIP_QTY);
                    _tWorkObj.IN_SHIP_SIZE_CNT = "";
                    _tWorkObj.PRICE_CNT = "";

                    var tSavePrice = _tSumAmt / _tSumQty;
                    if (dataEDT_KSV_ORDER_SHIP.DELIVERY_TYPE === "FK") {
                        tSavePrice = 0;
                    }
                    console.log(
                        `Ship price Calculateion:${_tSumAmt} / ${_tSumQty} = ${tSavePrice}`,
                    );
                    _tWorkObj.PRICE = serviceLib.numToFixed(tSavePrice, 4);

                    // console.log(_sizeArray);
                    _sizeArray.forEach((col3, i3) => {
                        let tZero = "000000";
                        let tStr =
                            tZero.substring(0, 6 - String(col3.value).length) +
                            String(col3.value);
                        _tWorkObj.IN_SHIP_SIZE_CNT += tStr;

                        var tTmpPrice = String(col3.price_value);
                        if (dataEDT_KSV_ORDER_SHIP.DELIVERY_TYPE === "FK") {
                            tTmpPrice = "0";
                        }

                        let tZero1 = "0000000000";
                        let tStr1 =
                            tZero1.substring(0, 10 - String(tTmpPrice).length) +
                            String(tTmpPrice);
                        _tWorkObj.PRICE_CNT += tStr1;
                    });
                    _tArray.push(_tWorkObj);
                }

                _tSumAmt = 0;
                _tSumQty = 0;

                var tIdx = 0;
                _sizeArray = [];
                for (tIdx = 0; tIdx < saveLIST_2.length; tIdx++) {
                    var tOne9 = { ...saveLIST_2[tIdx] };
                    if (
                        tOne9.ORDER_CD === col.ORDER_CD &&
                        tOne9.COLOR === col.COLOR
                    ) {
                        var tSizeArray = tOne9.SIZE_MEMBER.split(",");
                        tSizeArray.forEach((col1, i1) => {
                            var tObj8 = {};
                            tObj8.size = col1;
                            tObj8.idx = i1;
                            tObj8.value = 0;
                            tObj8.price_value = 0;
                            _sizeArray.push(tObj8);
                        });
                    }
                }

                _tWorkObj = { ...col };
                _tWorkObj.IN_SHIP_QTY = parseInt(_tWorkObj.SHIP_CNT);
                _tWorkObj.PRICE_CNT = "";

                if (parseFloat(_tWorkObj.IN_SHIP_QTY) > 0) {
                    _tSumAmt =
                        parseFloat(_tWorkObj.SHIP_CNT) *
                        parseFloat(_tWorkObj.PRICE);
                    _tSumQty = parseFloat(_tWorkObj.SHIP_CNT);
                }

                var tmpArray = [];
                _sizeArray.forEach((col2, i2) => {
                    var tObj7 = { ...col2 };
                    if (col2.size === col.SIZE) {
                        tObj7.value = parseInt(_tWorkObj.SHIP_CNT);
                        tObj7.price_value = parseFloat(_tWorkObj.PRICE);
                        if (dataEDT_KSV_ORDER_SHIP.DELIVERY_TYPE === "FK") {
                            tObj7.price_value = 0;
                        }
                    }
                    tmpArray.push(tObj7);
                });
                _sizeArray = [...tmpArray];
                // let tZero = '000000';
                // _tWorkObj.IN_SHIP_SIZE_CNT = tZero.substring(0, 6 - String(_tWorkObj.IN_SHIP_QTY).length) + String(_tWorkObj.IN_SHIP_QTY);
            } else {
                if (col.SIZE !== "Total") {
                    var tShipQty = parseInt(col.SHIP_CNT);
                    if (typeof col.PRICE === "undefined") col.PRICE = "0";
                    if (dataEDT_KSV_ORDER_SHIP.DELIVERY_TYPE === "FK")
                        col.PRICE = "0";
                    var tPrice0 = parseFloat(col.PRICE);
                    _tWorkObj.IN_SHIP_QTY += tShipQty;
                    if (parseFloat(tShipQty) > 0) {
                        // _tWorkObj.PRICE = col.PRICE;
                        _tSumAmt +=
                            parseFloat(col.SHIP_CNT) * parseFloat(col.PRICE);
                        _tSumQty += parseFloat(col.SHIP_CNT);
                    }
                    tmpArray = [];
                    _sizeArray.forEach((col2, i2) => {
                        var tObj7 = { ...col2 };
                        if (col2.size === col.SIZE) {
                            tObj7.value = parseInt(tShipQty);
                            if (dataEDT_KSV_ORDER_SHIP.DELIVERY_TYPE === "FK") {
                                tPrice0 = 0;
                            }
                            tObj7.price_value = parseFloat(tPrice0);
                        }
                        tmpArray.push(tObj7);
                    });
                    _sizeArray = [...tmpArray];
                }
            }
        });

        var tSavePrice0 = _tSumAmt / _tSumQty;
        _tWorkObj.PRICE = serviceLib.numToFixed(tSavePrice0, 4);
        _tWorkObj.IN_SHIP_QTY = String(_tWorkObj.IN_SHIP_QTY);
        _tWorkObj.IN_SHIP_SIZE_CNT = "";
        _sizeArray.forEach((col3, i3) => {
            let tZero = "000000";
            let tStr =
                tZero.substring(0, 6 - String(col3.value).length) +
                String(col3.value);
            _tWorkObj.IN_SHIP_SIZE_CNT += tStr;

            let tZero1 = "0000000000";
            var tTmpPrice = parseFloat(col3.price_value);
            if (dataEDT_KSV_ORDER_SHIP.DELIVERY_TYPE === "FK") {
                tTmpPrice = 0;
            }
            let tStr1 =
                tZero1.substring(0, 10 - String(tTmpPrice).length) +
                String(tTmpPrice);
            _tWorkObj.PRICE_CNT += tStr1;
        });
        _tArray.push(_tWorkObj);

        var tInData1 = {};
        tInData1.INVOICE_NO = _tData0.INVOICE_NO;
        tInData1.SHIP_DATE = _tData0.SHIP_DATE;
        tInData1.EX_FACTORY_DATE = _tData0.EX_FACTORY_DATE;
        tInData1.DELIVERY_TYPE = _tData0.DELIVERY_TYPE;
        tInData1.PAYMENT_TYPE = _tData0.PAYMENT_TYPE;
        tInData1.COUNTRY = _tData0.COUNTRY;
        tInData1.USER_ID = serviceLib.getUserInfo().USER_ID;
        tInData1.BL_NO = _tData0.BL_NO;
        tInData1.ATD = _tData0.ATD;
        tInData1.TOT_AMT = _tData0.TOT_AMT;
        tInData1.ADJ_AMT = _tData0.ADJ_AMT;
        tInData1.SHIP_AMT = _tData0.SHIP_AMT;
        tInData1.IS_NON_GARMENT = _tData0.IS_NON_GARMENT;
        tInData1.BUYER_CD = _tData0.BUYER_CD;
        tInData1.FACTORY_CD = _tData0.FACTORY_CD;

        if (
            dataEDT_KSV_ORDER_SHIP.DELIVERY_TYPE === "FK" &&
            _tData0.TOT_AMT > 0
        ) {
            alert("Factory Keep인 경우에는 Ship Amount는 0이어야 합니다<br><br>In case of Factory Keep, Ship Amount must be 0");
            return;
        }

        var tAdjAmt = parseFloat(_tData0.ADJ_AMT) || 0;
        var tTotAmt = parseFloat(_tData0.TOT_AMT) || 0;
        var tShipAmt = parseFloat(_tData0.SHIP_AMT) || 0;

        var tVal1 = parseFloat(parseFloat(_tData0.TOT_AMT).toFixed(2));
        var tVal2 = parseFloat(tAdjAmt) + parseFloat(tShipAmt);
        tVal2 = parseFloat(parseFloat(tVal2).toFixed(2));

        if (tVal1 !== tVal2) {
            alert(
                `Ship Amt 와 Adj Amt 의 합계가 Tot Amt와 다릅니다 (${tShipAmt}) + ${tAdjAmt} = ${tTotAmt} / ${tVal1} , ${tVal2} `,
            );
            return;
        }

        var tInData = [];
        if (_tData0.IS_NON_GARMENT === "1") {
        } else {
            _tArray.forEach((col, i) => {
                var tObj = {};
                tObj.COLOR = col.COLOR;
                tObj.IN_SHIP_QTY = col.IN_SHIP_QTY;
                tObj.IN_SHIP_SIZE_CNT = col.IN_SHIP_SIZE_CNT;
                tObj.PRICE_CNT = col.PRICE_CNT;
                tObj.ORDER_CD = col.ORDER_CD;
                tObj.PRICE = col.PRICE;
                tObj.PROD_CD = col.PROD_CD;
                tObj.PO_CD = col.PO_CD;
                console.log(
                    `Price: ${tObj.ORDER_CD}, ${tObj.COLOR}, ${tObj.PRICE}`,
                );
                // 일단 Ship Qty가 0이어도 등록하도록

                tInData.push(tObj);
            });

            if (tInData.length <= 0) {
                alert(
                    "Invoice에 포함된 Order의 상태가 전부 Cancel이거나 End 상태입니다. Order상태를 확인하세요",
                );
                return;
            }
        }

        setLoadingTBL_KSV_ORDER_SHIP1(true);
        serviceS0513_SHIPPING_LIST
            .mgrInsert_INSERT_ORDER_SHIP(tInData, tInData1)
            .then((data) => {
                setLoadingTBL_KSV_ORDER_SHIP1(false);
                if (typeof data.graphQLErrors === "undefined") {
                    if (typeof data.length === "undefined") {
                    } else {
                        if (data.length > 0) {
                            alert(data[0].CODE);
                            if (data[0].CODE.includes("SUCC")) {
                                setDatasTBL_KSV_ORDER_SHIP1([]);
                                // search_LIST_1();
                                var tCols = data[0].CODE.split(":");
                                if (tCols.length >= 3) {
                                    var tInvoiceNo = tCols[2];
                                    popup_INVOICE_MST(tInvoiceNo);
                                }
                            }
                        }
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

    const popup_INVOICE_MST = (argInvoiceNo) => {
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
        tUrl1 += `S0513_SHIPPING_LIST?INVOICE_NO=${argInvoiceNo}`;

        var tUrl2 = `S0513_SHIPPING_LIST?INVOICE_NO=${argInvoiceNo}`;

        var tValObj = {
            key: "4-8",
            label: "Garment Ship",
            icon: "pi pi-fw pi-user-edit",
            width: "1365px",
            height: "675px",
            url1: "S0513_SHIPPING_LIST",
        };
        var tArgObj = { ...tValObj };
        tArgObj.url1 = tUrl2;
        var tFuncObj = {};
        tFuncObj.func = "call_url";
        tFuncObj.message = { ...tArgObj };
        window.parent.postMessage(tFuncObj, "*");
    };

    const process_DELETE = () => {
        var _tData0 = { ...dataEDT_KSV_ORDER_SHIP };
        var _tDataArray = [...datasTBL_KSV_ORDER_SHIP1];

        var tSelObj = {};
        if (selectedTBL_KSV_ORDER_SHIP.length > 0) {
            tSelObj = { ...selectedTBL_KSV_ORDER_SHIP[0] };
            if (tSelObj.DOCU_NO !== "") {
                alert("전표처리된 invoice는 수정할수 없습니다<br><br>Invoices that have been processed cannot be modified.");
                return;
            }
        }

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
        tInData1.PAYMENT_TYPE = _tData0.PAYMENT_TYPE;
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

        setLoadingTBL_KSV_ORDER_SHIP1(true);
        serviceS0513_SHIPPING_LIST
            .mgrDelete_DELETE_ORDER_SHIP(tInData, tInData1)
            .then((data) => {
                setLoadingTBL_KSV_ORDER_SHIP1(false);
                if (typeof data.graphQLErrors === "undefined") {
                    if (typeof data.length === "undefined") {
                    } else {
                        if (data.length > 0) {
                            alert(data[0].CODE);
                            if (data[0].CODE.includes("SUCC")) {
                                setDatasTBL_KSV_ORDER_SHIP1([]);
                                search_LIST_1();
                            }
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

    /*QRY KSV_STOCK_FACOUT */
    const [dataQRY_KSV_ORDER_SHIP1, setDataQRY_KSV_ORDER_SHIP1] = useState(
        emptyQRY_KSV_ORDER_SHIP1,
    );

    const onInputChangeQRY_KSV_ORDER_SHIP1_FACTORY_CD = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_ORDER_SHIP1 = { ...dataQRY_KSV_ORDER_SHIP1 };

        let tTypeVal = _dataQRY_KSV_ORDER_SHIP1[`${name}`];
        if (typeof tTypeVal === "string")
            _dataQRY_KSV_ORDER_SHIP1[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_ORDER_SHIP1[`${name}`] = parseInt(val);

        setDataQRY_KSV_ORDER_SHIP1(_dataQRY_KSV_ORDER_SHIP1);
    };

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

    const onInputChangeQRY_KSV_ORDER_SHIP1_BUYER_CD = (e, name) => {
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
    const [isOrder, setIsOrder] = useState(true);
    const [isGarment, setIsGarment] = useState(false);

    const [dataEDT_KSV_ORDER_SHIP, setDataEDT_KSV_ORDER_SHIP] = useState(
        emptyEDT_KSV_ORDER_SHIP,
    );

    const onCheckboxChangeEDT_KSV_ORDER_SHIP_IS_NON_GARMENT = (e, name) => {
        let val = "";
        let _dataEDT_KSV_ORDER_SHIP = { ...dataEDT_KSV_ORDER_SHIP };
        if (e.checked) {
            val = "1";
            setIsOrder(false);
            setIsGarment(true);
            setDatasTBL_KSV_ORDER_SHIP1([]);
            setSelectedTBL_KSV_ORDER_SHIP1([]);
        } else {
            val = "0";
            setIsOrder(true);
            setIsGarment(false);
        }
        _dataEDT_KSV_ORDER_SHIP[`${name}`] = val;
        setDataEDT_KSV_ORDER_SHIP(_dataEDT_KSV_ORDER_SHIP);
    };

    const onInputChangeEDT_KSV_ORDER_SHIP_SHIP_AMT = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_ORDER_SHIP = { ...dataEDT_KSV_ORDER_SHIP };

        let tTypeVal = _dataEDT_KSV_ORDER_SHIP[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_ORDER_SHIP[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_ORDER_SHIP[`${name}`] = parseInt(val);

        var tAdjAmt = parseFloat(_dataEDT_KSV_ORDER_SHIP.ADJ_AMT) || 0;
        var tTotAmt = (parseFloat(val) || 0) + tAdjAmt;
        _dataEDT_KSV_ORDER_SHIP.TOT_AMT = String(tTotAmt.toFixed(2));

        setDataEDT_KSV_ORDER_SHIP(_dataEDT_KSV_ORDER_SHIP);
    };
    const onInputChangeEDT_KSV_ORDER_SHIP_ADJ_AMT = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_ORDER_SHIP = { ...dataEDT_KSV_ORDER_SHIP };

        let tTypeVal = _dataEDT_KSV_ORDER_SHIP[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_ORDER_SHIP[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_ORDER_SHIP[`${name}`] = parseInt(val);

        var tShipAmt = parseFloat(_dataEDT_KSV_ORDER_SHIP.SHIP_AMT) || 0;
        var tTotAmt = (parseFloat(val) || 0) + tShipAmt;
        _dataEDT_KSV_ORDER_SHIP.TOT_AMT = String(tTotAmt.toFixed(2));

        setDataEDT_KSV_ORDER_SHIP(_dataEDT_KSV_ORDER_SHIP);
    };
    const onInputChangeEDT_KSV_ORDER_SHIP_TOT_AMT = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_ORDER_SHIP = { ...dataEDT_KSV_ORDER_SHIP };

        let tTypeVal = _dataEDT_KSV_ORDER_SHIP[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_ORDER_SHIP[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_ORDER_SHIP[`${name}`] = parseInt(val);

        setDataEDT_KSV_ORDER_SHIP(_dataEDT_KSV_ORDER_SHIP);
    };

    const onInputChangeEDT_KSV_ORDER_SHIP_INVOICE_NO = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_ORDER_SHIP = { ...dataEDT_KSV_ORDER_SHIP };

        let tTypeVal = _dataEDT_KSV_ORDER_SHIP[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_ORDER_SHIP[`${name}`] = val.replace(
                /[\s\u3000\u00A0\uFEFF]/g,
                "",
            );
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
    const onInputChangeEDT_KSV_ORDER_SHIP_BL_FILE2 = (e, name) => {
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
    const onInputChangeEDT_KSV_ORDER_SHIP_PL_FILE2 = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_ORDER_SHIP = { ...dataEDT_KSV_ORDER_SHIP };

        let tTypeVal = _dataEDT_KSV_ORDER_SHIP[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_ORDER_SHIP[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_ORDER_SHIP[`${name}`] = parseInt(val);

        setDataEDT_KSV_ORDER_SHIP(_dataEDT_KSV_ORDER_SHIP);
    };

    const onInputChangeEDT_KSV_ORDER_SHIP_CI_FILE = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_ORDER_SHIP = { ...dataEDT_KSV_ORDER_SHIP };

        let tTypeVal = _dataEDT_KSV_ORDER_SHIP[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_ORDER_SHIP[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_ORDER_SHIP[`${name}`] = parseInt(val);

        setDataEDT_KSV_ORDER_SHIP(_dataEDT_KSV_ORDER_SHIP);
    };
    const onInputChangeEDT_KSV_ORDER_SHIP_CI_FILE2 = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_ORDER_SHIP = { ...dataEDT_KSV_ORDER_SHIP };

        let tTypeVal = _dataEDT_KSV_ORDER_SHIP[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_ORDER_SHIP[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_ORDER_SHIP[`${name}`] = parseInt(val);

        setDataEDT_KSV_ORDER_SHIP(_dataEDT_KSV_ORDER_SHIP);
    };

    const onInputChangeEDT_KSV_ORDER_SHIP_OTHER_FILE = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_ORDER_SHIP = { ...dataEDT_KSV_ORDER_SHIP };

        let tTypeVal = _dataEDT_KSV_ORDER_SHIP[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_ORDER_SHIP[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_ORDER_SHIP[`${name}`] = parseInt(val);

        setDataEDT_KSV_ORDER_SHIP(_dataEDT_KSV_ORDER_SHIP);
    };
    const onInputChangeEDT_KSV_ORDER_SHIP_OTHER_FILE2 = (e, name) => {
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

    const onCalChangeEDT_KSV_ORDER_SHIP_ATD = (e, name) => {
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
        datasEDT_KSV_ORDER_SHIP_FACTORY_CD,
        setDatasEDT_KSV_ORDER_SHIP_FACTORY_CD,
    ] = useState([]);
    const [
        dataEDT_KSV_ORDER_SHIP_FACTORY_CD,
        setDataEDT_KSV_ORDER_SHIP_FACTORY_CD,
    ] = useState({});

    const onDropdownChangeEDT_KSV_ORDER_SHIP_FACTORY_CD = (e, name) => {
        let val = (e.value && e.value.FACTORY_CD) || "";

        let _dataEDT_KSV_ORDER_SHIP = { ...dataEDT_KSV_ORDER_SHIP };

        let tTypeVal = _dataEDT_KSV_ORDER_SHIP[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_KSV_ORDER_SHIP[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_KSV_ORDER_SHIP[`${name}`] = parseInt(val);
        }

        setDataEDT_KSV_ORDER_SHIP(_dataEDT_KSV_ORDER_SHIP);
        setDataEDT_KSV_ORDER_SHIP_FACTORY_CD(e.value);
    };

    const [
        datasEDT_KSV_ORDER_SHIP_BUYER_CD,
        setDatasEDT_KSV_ORDER_SHIP_BUYER_CD,
    ] = useState([]);
    const [
        dataEDT_KSV_ORDER_SHIP_BUYER_CD,
        setDataEDT_KSV_ORDER_SHIP_BUYER_CD,
    ] = useState({});

    const onDropdownChangeEDT_KSV_ORDER_SHIP_BUYER_CD = (e, name) => {
        let val = (e.value && e.value.BUYER_CD) || "";

        let _dataEDT_KSV_ORDER_SHIP = { ...dataEDT_KSV_ORDER_SHIP };

        let tTypeVal = _dataEDT_KSV_ORDER_SHIP[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_KSV_ORDER_SHIP[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_KSV_ORDER_SHIP[`${name}`] = parseInt(val);
        }

        setDataEDT_KSV_ORDER_SHIP(_dataEDT_KSV_ORDER_SHIP);
        setDataEDT_KSV_ORDER_SHIP_BUYER_CD(e.value);
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

    const onDropdownChangeEDT_KSV_ORDER_SHIP_PAYMENT_TYPE = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataEDT_KSV_ORDER_SHIP = { ...dataEDT_KSV_ORDER_SHIP };

        let tTypeVal = _dataEDT_KSV_ORDER_SHIP[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_KSV_ORDER_SHIP[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_KSV_ORDER_SHIP[`${name}`] = parseInt(val);
        } else {
        }

        setDataEDT_KSV_ORDER_SHIP(_dataEDT_KSV_ORDER_SHIP);
        setDataEDT_KSV_ORDER_SHIP_PAYMENT_TYPE(e.value);
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

    const [paymentTypeDisabled, setPaymentTypeDisabled] = useState(false);
    const onDropdownChangeEDT_KSV_ORDER_SHIP_DELIVERY_TYPE = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataEDT_KSV_ORDER_SHIP = { ...dataEDT_KSV_ORDER_SHIP };

        let tTypeVal = _dataEDT_KSV_ORDER_SHIP[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_KSV_ORDER_SHIP[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_KSV_ORDER_SHIP[`${name}`] = parseInt(val);
        }

        if (val === "6" || val === "7" || val === "FK") {
            $("#invoiceLabel").removeClass("red");
            $("#id_invoiceCode").val("").attr("disabled", true);
        } else {
            $("#invoiceLabel").addClass("red");
            $("#id_invoiceCode").attr("disabled", false);
        }

        if (_dataEDT_KSV_ORDER_SHIP.DELIVERY_TYPE === "FK") {
            setDataEDT_KSV_ORDER_SHIP_PAYMENT_TYPE(
                datasEDT_KSV_ORDER_SHIP_PAYMENT_TYPE[2],
            );
            _dataEDT_KSV_ORDER_SHIP.PAYMENT_TYPE =
                datasEDT_KSV_ORDER_SHIP_PAYMENT_TYPE[2].CD_CODE;
            setPaymentTypeDisabled(true);

            var tTotQty = 0;
            var tTotAmt = 0;
            var tTotal = 0;
            var tArray = [];

            datasTBL_KSV_ORDER_SHIP1.forEach((col, i) => {
                var tObj = { ...col };
                if (col.SIZE !== "Total") {
                    tTotQty += parseFloat(tObj.SHIP_CNT);
                    tTotAmt += 0;
                    tObj.AMOUNT = 0;
                    tArray.push(tObj);
                } else {
                    tObj.SHIP_CNT = tTotQty;
                    tObj.AMOUNT = 0;
                    tTotal += 0;
                    tTotQty = 0;
                    tTotAmt = 0;
                    tArray.push(tObj);
                }
            });
            setDatasTBL_KSV_ORDER_SHIP1(tArray);

            _dataEDT_KSV_ORDER_SHIP.SHIP_AMT = String(tTotal);
            _dataEDT_KSV_ORDER_SHIP.ADJ_AMT = String(0);
            var tTotal0 = tTotal;
            _dataEDT_KSV_ORDER_SHIP.TOT_AMT = String(tTotal0);
        } else {
            //setDataEDT_KSV_ORDER_SHIP_PAYMENT_TYPE(datasEDT_KSV_ORDER_SHIP_PAYMENT_TYPE[0]);
            setPaymentTypeDisabled(false);

            var tTotQty = 0;
            var tTotAmt = 0;
            var tTotal = 0;
            var tArray = [];

            datasTBL_KSV_ORDER_SHIP1.forEach((col, i) => {
                var tObj = { ...col };
                if (col.SIZE !== "Total") {
                    tTotQty += parseFloat(tObj.SHIP_CNT);
                    tTotAmt += parseFloat(tObj.AMOUNT);
                    tArray.push(tObj);
                } else {
                    tObj.SHIP_CNT = tTotQty;
                    tObj.AMOUNT = tTotAmt;
                    tTotal += tTotAmt;
                    tTotQty = 0;
                    tTotAmt = 0;
                    tArray.push(tObj);
                }
            });
            setDatasTBL_KSV_ORDER_SHIP1(tArray);

            _dataEDT_KSV_ORDER_SHIP.SHIP_AMT = String(tTotal);
            var tTotal0 = tTotal + parseFloat(_dataEDT_KSV_ORDER_SHIP.ADJ_AMT);
            _dataEDT_KSV_ORDER_SHIP.TOT_AMT = String(tTotal0);
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

    const onRowClick1TBL_KSV_ORDER_SHIP1 = (argData0) => {
        var argData = {};

        if (typeof argData0.length !== "undefined") {
            argData = argData0[0];
        } else {
            argData = argData0;
        }

        let argTBL_KSV_ORDER_SHIP1 = argData;

        setDataTBL_KSV_ORDER_SHIP1(argTBL_KSV_ORDER_SHIP1);
    };

    const onRowClickTBL_KSV_ORDER_SHIP1 = (event) => {
        let argTBL_KSV_ORDER_SHIP1 = event.data;
        if (flagSelectModeTBL_KSV_ORDER_SHIP1) return;

        // Service : NawooAll:mgrQueryTBL_KSV_ORDER_SHIP1
    };

    const onCellEditCompleteTBL_KSV_ORDER_SHIP1 = (e) => {
        let { rowData, newValue, value, field, originalEvent: event } = e;

        var tOrderCnt = parseFloat(rowData.TOT_CNT);
        var tShipedCnt = parseFloat(rowData.TOT_SHIP_CNT);
        var tShipCnt = parseFloat(newValue);
        var tBalCnt = tOrderCnt - tShipedCnt - tShipCnt;

        if (parseInt(rowData.ORDER_STATUS) >= 7) {
            toast.current.show({
                severity: "success",
                summary: "Info",
                detail: "End Report 상태는 수정할 수 없습니다.  (End Report orders cannot be modified.).",
                life: 3000,
            });
            return;
        }

        rowData[field] = newValue;
        var tRowData = { ...rowData };

        if (field === "PROD_CNT") {
            rowData["PROD_CNT"] = String(tShipAmount);
        }
        if (field === "PRICE") {
            var tShipQty = parseFloat(tRowData.SHIP_CNT);
            var tShipPrice = parseFloat(tRowData.PRICE);
            var tShipAmount = tShipQty * tShipPrice;
            rowData["AMOUNT"] = String(tShipAmount);
        }

        let balQty = parseFloat(tRowData.REMAIN_QTY);

        if (field === "SHIP_CNT") {
            rowData["REMAIN_QTY"] = String(tBalCnt);

            var tShipQty = parseFloat(newValue || 0);
            var tShipPrice = parseFloat(tRowData.PRICE || 0);
            var tShipAmount = tShipQty * tShipPrice;
            if (dataEDT_KSV_ORDER_SHIP.DELIVERY_TYPE === "FK") tShipAmount = 0;
            console.log(
                `calc ship amt: ${tShipQty}, ${tShipPrice}, ${tShipAmount}`,
            );
            rowData["AMOUNT"] = String(tShipAmount);
        }

        tRowData = { ...rowData };

        var tTotal = 0;
        var tTotAmt = 0;
        var tTotQty = 0;
        var tArray = [];

        datasTBL_KSV_ORDER_SHIP1.forEach((col, i) => {
            var tObj = { ...col };
            if (parseFloat(tRowData.id) === i + 1) tObj = { ...tRowData };
            if (col.SIZE !== "Total") {
                tTotQty += parseFloat(tObj.SHIP_CNT);
                tTotAmt += parseFloat(tObj.AMOUNT);
                tArray.push(tObj);
            } else {
                tObj.SHIP_CNT = tTotQty;
                tObj.AMOUNT = tTotAmt;
                tTotal += tTotAmt;
                tTotQty = 0;
                tTotAmt = 0;
                tArray.push(tObj);
            }
        });

        setDatasTBL_KSV_ORDER_SHIP1(tArray);
        var tEDT = { ...dataEDT_KSV_ORDER_SHIP };
        tEDT.SHIP_AMT = String(tTotal);
        var tTotal0 = tTotal + parseFloat(tEDT.ADJ_AMT);
        tEDT.TOT_AMT = String(tTotal0);
        setDataEDT_KSV_ORDER_SHIP(tEDT);
    };

    const cellEditorTBL_KSV_ORDER_SHIP1 = (options) => {
        return textEditor(options);
    };

    // GUIDE: 에디터 컴포넌트에 onKeyDown 이벤트를 연결한다.
    const onChangeTextEdit = (e, options) => {
        options.editorCallback(e.target.value);
    };

    const handleFocus = (event) => event.target.select();

    const textEditor = (options) => {
        return (
            <InputText
                style={{ width: "5rem" }}
                type="text"
                value={options.value}
                onChange={(e) => onChangeTextEdit(e, options)}
                onFocus={handleFocus}
            />
        );
    };

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

        var tEdtObj = { ...dataEDT_KSV_ORDER_SHIP };
        if (tEdtObj.INVOICE_NO === "") {
            alert("invoice을 먼저 등록한후 파일을 Upload할수 있습니다<br><br>You can upload the file after registering the invoice first.");
            return;
        }

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
            tInObj.TITLE = `order_ship bl_file:${tInObj.FILE_KEY}`;
            tInObj.NAME = fileName;
            tInObj.URL = imgURL;
            tInObj.OBJECT_NAME = objectName;
            serviceS0513_SHIPPING_LIST
                .mgrInsert_FILE_ADD(tInObj)
                .then((data) => {
                    if (typeof data.graphQLErrors === "undefined") {
                        if (data.length > 0) {
                            alert(data[0].CODE);
                            if (data[0].CODE.includes("SUCC")) {
                                tEdtObj.BL_FILE = tInObj.NAME;
                                setDataEDT_KSV_ORDER_SHIP(tEdtObj);
                                setDataKCD_FILEINFO_BL_FILE(tInObj);
                                // search_LIST_1();
                                setIsATD(false);
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
            tInObj.TITLE = `order_ship pl_file:${tInObj.FILE_KEY}`;
            tInObj.NAME = fileName;
            tInObj.URL = imgURL;
            tInObj.OBJECT_NAME = objectName;
            serviceS0513_SHIPPING_LIST
                .mgrInsert_FILE_ADD(tInObj)
                .then((data) => {
                    if (typeof data.graphQLErrors === "undefined") {
                        if (data.length > 0) {
                            alert(data[0].CODE);
                            if (data[0].CODE.includes("SUCC")) {
                                tEdtObj.PL_FILE = tInObj.NAME;
                                setDataEDT_KSV_ORDER_SHIP(tEdtObj);
                                setDataKCD_FILEINFO_PL_FILE(tInObj);
                                // search_LIST_1();
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

    const s3FileUpload_CI_FILE = async (e) => {
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
            tInObj.KIND = "ORDER_SHIP_CI_FILE";
            tInObj.FILE_KEY = tEdtObj.INVOICE_NO;
            tInObj.TITLE = `order_ship ci_file:${tInObj.FILE_KEY}`;
            tInObj.NAME = fileName;
            tInObj.URL = imgURL;
            tInObj.OBJECT_NAME = objectName;
            serviceS0513_SHIPPING_LIST
                .mgrInsert_FILE_ADD(tInObj)
                .then((data) => {
                    if (typeof data.graphQLErrors === "undefined") {
                        if (data.length > 0) {
                            alert(data[0].CODE);
                            if (data[0].CODE.includes("SUCC")) {
                                tEdtObj.CI_FILE = tInObj.NAME;
                                setDataEDT_KSV_ORDER_SHIP(tEdtObj);
                                setDataKCD_FILEINFO_CI_FILE(tInObj);
                                // search_LIST_1();
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

    const s3FileUpload_OTHER_FILE = async (e) => {
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
            tInObj.KIND = "ORDER_SHIP_OTHER_FILE";
            tInObj.FILE_KEY = tEdtObj.INVOICE_NO;
            tInObj.TITLE = `order_ship other file:${tInObj.FILE_KEY}`;
            tInObj.NAME = fileName;
            tInObj.URL = imgURL;
            tInObj.OBJECT_NAME = objectName;
            serviceS0513_SHIPPING_LIST
                .mgrInsert_FILE_ADD(tInObj)
                .then((data) => {
                    if (typeof data.graphQLErrors === "undefined") {
                        if (data.length > 0) {
                            alert(data[0].CODE);
                            if (data[0].CODE.includes("SUCC")) {
                                tEdtObj.OTHER_FILE = tInObj.NAME;
                                setDataEDT_KSV_ORDER_SHIP(tEdtObj);
                                setDataKCD_FILEINFO_OTHER_FILE(tInObj);
                                // search_LIST_1();
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

    const s3FileUpload_BL_FILE2 = async (e) => {
        const fileName = e.target.files[0].name;
        const img = e.target.files[0];
        const formData = new FormData();
        formData.append("file", img);

        var tEdtObj = { ...dataEDT_KSV_ORDER_SHIP };
        if (tEdtObj.INVOICE_NO === "") {
            alert("invoice을 먼저 등록한후 파일을 Upload할수 있습니다<br><br>You can upload the file after registering the invoice first.");
            return;
        }

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
            tInObj.KIND = "ORDER_SHIP_BL_FILE2";
            tInObj.FILE_KEY = tEdtObj.INVOICE_NO;
            tInObj.TITLE = `order_ship bl_file2 ${tInObj.FILE_KEY}`;
            tInObj.NAME = fileName;
            tInObj.URL = imgURL;
            tInObj.OBJECT_NAME = objectName;
            serviceS0513_SHIPPING_LIST
                .mgrInsert_FILE_ADD(tInObj)
                .then((data) => {
                    if (typeof data.graphQLErrors === "undefined") {
                        if (data.length > 0) {
                            alert(data[0].CODE);
                            if (data[0].CODE.includes("SUCC")) {
                                tEdtObj.BL_FILE2 = tInObj.NAME;
                                setDataEDT_KSV_ORDER_SHIP(tEdtObj);
                                setDataKCD_FILEINFO_BL_FILE2(tInObj);
                                // search_LIST_1();
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

    const s3FileUpload_PL_FILE2 = async (e) => {
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
            tInObj.KIND = "ORDER_SHIP_PL_FILE2";
            tInObj.FILE_KEY = tEdtObj.INVOICE_NO;
            tInObj.TITLE = `order_ship pl_file2:${tInObj.FILE_KEY}`;
            tInObj.NAME = fileName;
            tInObj.URL = imgURL;
            tInObj.OBJECT_NAME = objectName;
            serviceS0513_SHIPPING_LIST
                .mgrInsert_FILE_ADD(tInObj)
                .then((data) => {
                    if (typeof data.graphQLErrors === "undefined") {
                        if (data.length > 0) {
                            alert(data[0].CODE);
                            if (data[0].CODE.includes("SUCC")) {
                                tEdtObj.PL_FILE2 = tInObj.NAME;
                                setDataEDT_KSV_ORDER_SHIP(tEdtObj);
                                setDataKCD_FILEINFO_PL_FILE2(tInObj);
                                // search_LIST_1();
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

    const s3FileUpload_CI_FILE2 = async (e) => {
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
            tInObj.KIND = "ORDER_SHIP_CI_FILE2";
            tInObj.FILE_KEY = tEdtObj.INVOICE_NO;
            tInObj.TITLE = `order_ship ci_file2:${tInObj.FILE_KEY}`;
            tInObj.NAME = fileName;
            tInObj.URL = imgURL;
            tInObj.OBJECT_NAME = objectName;
            serviceS0513_SHIPPING_LIST
                .mgrInsert_FILE_ADD(tInObj)
                .then((data) => {
                    if (typeof data.graphQLErrors === "undefined") {
                        if (data.length > 0) {
                            alert(data[0].CODE);
                            if (data[0].CODE.includes("SUCC")) {
                                tEdtObj.CI_FILE2 = tInObj.NAME;
                                setDataEDT_KSV_ORDER_SHIP(tEdtObj);
                                setDataKCD_FILEINFO_CI_FILE2(tInObj);
                                // search_LIST_1();
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

    const s3FileUpload_OTHER_FILE2 = async (e) => {
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
            tInObj.KIND = "ORDER_SHIP_OTHER_FILE2";
            tInObj.FILE_KEY = tEdtObj.INVOICE_NO;
            tInObj.TITLE = `order_ship other file2:${tInObj.FILE_KEY}`;
            tInObj.NAME = fileName;
            tInObj.URL = imgURL;
            tInObj.OBJECT_NAME = objectName;
            serviceS0513_SHIPPING_LIST
                .mgrInsert_FILE_ADD(tInObj)
                .then((data) => {
                    if (typeof data.graphQLErrors === "undefined") {
                        if (data.length > 0) {
                            alert(data[0].CODE);
                            if (data[0].CODE.includes("SUCC")) {
                                tEdtObj.OTHER_FILE2 = tInObj.NAME;
                                setDataEDT_KSV_ORDER_SHIP(tEdtObj);
                                setDataKCD_FILEINFO_OTHER_FILE2(tInObj);
                                // search_LIST_1();
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

    //
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

        // var argData = JSON.parse(sessionStorage.getItem('S0513_INVOICE_INFO'));
        var argData = JSON.parse(
            sessionStorage.getItem("S0513_INVOICE_INFO_INPUT"),
        );
        if (!argData) argData = {};

        console.log(argData);

        if (typeof argData.INVOICE_NO !== "undefined") {
            var tIn1 = {};
            tIn1.FACTORY_CD = "";
            tIn1.BUYER_CD = "";
            tIn1.STYLE_CD = "";
            tIn1.ORDER_CD = "";
            tIn1.INVOICE_NO = argData.INVOICE_NO;
            tIn1.S_SHIP_DATE = "";
            tIn1.E_SHIP_DATE = "";
            tIn1.SHIP_MODE = "";
            tIn1.PAYMENT_TYPE = "";
            tIn1.DELIVERY_TYPE = "";

            search_LIST_1(tIn1);

            //
            var tInput = {};
            tInput.INVOICE_NO = argData.INVOICE_NO;
            tInput.BUYER_CD = argData.BUYER_CD;
            tInput.SHIP_DATE = argData.SHIP_DATE;
            if (argData.ATD) tInput.SHIP_DATE = argData.ATD;
            tInput.NAT_CD = argData.NAT_CD;
            tInput.PAYMENT_TYPE = argData.PAYMENT_TYPE;
            tInput.ORDER_CD = argData.ORDER_CD;

            search_LIST_2(tInput);
            search_CODE_0(argData);
        } else {
            search_CODE_0(argData);
        }
    }, []);

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
        <div className="af-div-main">
            <div
                className="af-div-first"
                style={{ width: "123rem", height: "14rem" }}
            >
                <span className="af-span-3-0" style={{ width: "23rem" }}>
                    <p
                        id="invoiceLabel"
                        className="af-span-p red"
                        style={{ width: "7rem" }}
                    >*Invoice#</p>
                    <div className="af-span-div" style={{ width: "11rem" }}>
                        <InputText
                            style={{ width: "11rem" }}
                            id="id_invoiceCode"
                            value={dataEDT_KSV_ORDER_SHIP.INVOICE_NO}
                            onChange={(e) =>
                                onInputChangeEDT_KSV_ORDER_SHIP_INVOICE_NO(
                                    e,
                                    "INVOICE_NO",
                                )
                            }
                        />
                    </div>
                    <p className="af-span-p" style={{ width: "4rem" }}>({isREGIST})</p>
                </span>
                <span className="af-span-3-0" style={{ width: "23rem" }}>
                    <p className="af-span-p" style={{ width: "7rem" }}>BL#</p>
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
                <span className="af-span-3-0" style={{ width: "45rem" }}>
                    <p className="af-span-p" style={{ width: "9rem" }}>BL File(Draft)</p>
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
                    <p className="af-span-p" style={{ width: "4rem" }}>Final</p>
                    <div className="af-span-div" style={{ width: "8rem" }}>
                        <InputText
                            style={{ width: "8rem" }}
                            id="id_PO_CD"
                            value={dataEDT_KSV_ORDER_SHIP.BL_FILE2}
                            onChange={(e) =>
                                onInputChangeEDT_KSV_ORDER_SHIP_BL_FILE2(
                                    e,
                                    "BL_FILE2",
                                )
                            }
                        />
                    </div>
                    <div className="af-span-div" style={{ width: "6rem" }}>
                        <button style={{ width: "6rem", height: "1.5rem" }}>
                            <label
                                className="inputFileCustom"
                                htmlFor="inputFileAdd2"
                            >
                                Upload
                            </label>
                        </button>
                        <input
                            type="file"
                            id="inputFileAdd2"
                            onChange={s3FileUpload_BL_FILE2}
                            style={{ display: "none" }}
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "13rem" }}>
                    <div className="af-span-div-btn" style={{ width: "12rem" }}>
                        <Button
                            style={{ width: "12rem" }}
                            label="Save"
                            className="p-button-text"
                            onClick={process_INSERT}
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "16rem" }}>
                    <div className="af-span-div-btn" style={{ width: "12rem" }}>
                        <Button
                            style={{ width: "12rem" }}
                            label="Delete"
                            className="p-button-text"
                            onClick={process_DELETE}
                        />
                    </div>
                </span>

                <span className="af-span-3" style={{ width: "23rem" }}>
                    <p className="af-span-p red" style={{ width: "7rem" }}>*Ex Factory</p>
                    <div className="af-span-div" style={{ width: "15rem" }}>
                        <Calendar
                            showButtonBar
                            dateFormat="yy-mm-dd"
                            style={{ width: "15rem" }}
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
                <span className="af-span-3" style={{ width: "23rem" }}>
                    <p className="af-span-p red" style={{ width: "7rem" }}>*Country</p>
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
                            filter
                        ></Dropdown>
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "45rem" }}>
                    <p className="af-span-p" style={{ width: "9rem" }}>CI/PL</p>
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
                                htmlFor="inputFileAdd11"
                            >
                                Upload
                            </label>
                        </button>
                        <input
                            type="file"
                            id="inputFileAdd11"
                            onChange={s3FileUpload_PL_FILE}
                            style={{ display: "none" }}
                        />
                    </div>
                    <p className="af-span-p" style={{ width: "4rem" }}>Final</p>
                    <div className="af-span-div" style={{ width: "8rem" }}>
                        <InputText
                            style={{ width: "8rem" }}
                            id="id_PO_CD"
                            value={dataEDT_KSV_ORDER_SHIP.PL_FILE2}
                            onChange={(e) =>
                                onInputChangeEDT_KSV_ORDER_SHIP_PL_FILE2(
                                    e,
                                    "PL_FILE2",
                                )
                            }
                        />
                    </div>
                    <div className="af-span-div" style={{ width: "6rem" }}>
                        <button style={{ width: "6rem", height: "1.5rem" }}>
                            <label
                                className="inputFileCustom"
                                htmlFor="inputFileAdd12"
                            >
                                Upload
                            </label>
                        </button>
                        <input
                            type="file"
                            id="inputFileAdd12"
                            onChange={s3FileUpload_PL_FILE2}
                            style={{ display: "none" }}
                        />
                    </div>
                </span>

                <span className="af-span-3" style={{ width: "13rem" }}>
                    <div className="af-span-div-btn" style={{ width: "12rem" }}>
                        <Button
                            style={{ width: "12rem" }}
                            label="Reset"
                            className="p-button-text"
                            onClick={process_RESET}
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "16rem" }}>
                    <div className="af-span-div-btn" style={{ width: "12rem" }}>
                        <Button
                            disabled={isGarment}
                            style={{ width: "12rem" }}
                            label="Add Order"
                            className="p-button-text orange"
                            onClick={popup_ADD_ORDER}
                        />
                    </div>
                </span>

                <span className="af-span-3" style={{ width: "23rem" }}>
                    <p className="af-span-p red" style={{ width: "7rem" }}>*ETD</p>
                    <div className="af-span-div" style={{ width: "15rem" }}>
                        <Calendar
                            showButtonBar
                            dateFormat="yy-mm-dd"
                            style={{ width: "15rem" }}
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

                <span className="af-span-3" style={{ width: "23rem" }}>
                    <p className="af-span-p red" style={{ width: "7rem" }}>*Payment</p>
                    <div className="af-span-div" style={{ width: "15rem" }}>
                        <Dropdown
                            disabled={paymentTypeDisabled}
                            style={{ width: "15rem" }}
                            value={dataEDT_KSV_ORDER_SHIP_PAYMENT_TYPE}
                            onChange={(e) =>
                                onDropdownChangeEDT_KSV_ORDER_SHIP_PAYMENT_TYPE(
                                    e,
                                    "PAYMENT_TYPE",
                                )
                            }
                            options={datasEDT_KSV_ORDER_SHIP_PAYMENT_TYPE}
                            optionLabel="CD_NAME"
                            placeholder=""
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "45rem" }}>
                    <p className="af-span-p" style={{ width: "9rem" }}>C/O</p>
                    <div className="af-span-div" style={{ width: "8rem" }}>
                        <InputText
                            style={{ width: "8rem" }}
                            id="id_PO_CD"
                            value={dataEDT_KSV_ORDER_SHIP.CI_FILE}
                            onChange={(e) =>
                                onInputChangeEDT_KSV_ORDER_SHIP_CI_FILE(
                                    e,
                                    "CI_FILE",
                                )
                            }
                        />
                    </div>
                    <div className="af-span-div" style={{ width: "6rem" }}>
                        <button style={{ width: "6rem", height: "1.5rem" }}>
                            <label
                                className="inputFileCustom"
                                htmlFor="inputFileAdd_Detail"
                            >
                                Upload
                            </label>
                        </button>
                        <input
                            type="file"
                            id="inputFileAdd_Detail"
                            onChange={s3FileUpload_CI_FILE}
                            style={{ display: "none" }}
                        />
                    </div>
                    <p className="af-span-p" style={{ width: "4rem" }}>Final</p>
                    <div className="af-span-div" style={{ width: "8rem" }}>
                        <InputText
                            style={{ width: "8rem" }}
                            id="id_PO_CD"
                            value={dataEDT_KSV_ORDER_SHIP.CI_FILE2}
                            onChange={(e) =>
                                onInputChangeEDT_KSV_ORDER_SHIP_CI_FILE2(
                                    e,
                                    "CI_FILE2",
                                )
                            }
                        />
                    </div>
                    <div className="af-span-div" style={{ width: "6rem" }}>
                        <button style={{ width: "6rem", height: "1.5rem" }}>
                            <label
                                className="inputFileCustom"
                                htmlFor="inputFileAdd_Detail2"
                            >
                                Upload
                            </label>
                        </button>
                        <input
                            type="file"
                            id="inputFileAdd_Detail2"
                            onChange={s3FileUpload_CI_FILE2}
                            style={{ display: "none" }}
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "13rem" }}>
                    <div className="af-span-div-btn" style={{ width: "12rem" }}>
                        <Button
                            disabled={isGarment}
                            style={{ width: "12rem" }}
                            label="Fill ShipQty"
                            className="p-button-text"
                            onClick={process_FILL_SHIPQTY}
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "15rem" }}>
                    <div className="af-span-div-btn" style={{ width: "12rem" }}>
                        <Button
                            disabled={isGarment}
                            style={{ width: "12rem" }}
                            label="Remove Order"
                            className="p-button-text"
                            onClick={process_REMOVE_ORDER}
                        />
                    </div>
                </span>

                <span className="af-span-3" style={{ width: "23rem" }}>
                    <p className="af-span-p" style={{ width: "7rem" }}>ATD</p>
                    <div className="af-span-div" style={{ width: "15rem" }}>
                        <Calendar
                            showButtonBar
                            disabled={isATD}
                            dateFormat="yy-mm-dd"
                            style={{ width: "15rem" }}
                            id="id_IN_DATE"
                            value={changeDateVal(dataEDT_KSV_ORDER_SHIP.ATD)}
                            onChange={(e) =>
                                onCalChangeEDT_KSV_ORDER_SHIP_ATD(e, "ATD")
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "23rem" }}>
                    <p className="af-span-p red" style={{ width: "7rem" }}>*Delivery</p>
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
                <span className="af-span-3" style={{ width: "45rem" }}>
                    <p className="af-span-p" style={{ width: "9rem" }}>Other (Draft)</p>
                    <div className="af-span-div" style={{ width: "8rem" }}>
                        <InputText
                            style={{ width: "8rem" }}
                            id="id_PO_CD"
                            value={dataEDT_KSV_ORDER_SHIP.OTHER_FILE}
                            onChange={(e) =>
                                onInputChangeEDT_KSV_ORDER_SHIP_OTHER_FILE(
                                    e,
                                    "OTHER_FILE",
                                )
                            }
                        />
                    </div>
                    <div className="af-span-div" style={{ width: "6rem" }}>
                        <button style={{ width: "6rem", height: "1.5rem" }}>
                            <label
                                className="inputFileCustom"
                                htmlFor="inputFileAdd_Other"
                            >
                                Upload
                            </label>
                        </button>
                        <input
                            type="file"
                            id="inputFileAdd_Other"
                            onChange={s3FileUpload_OTHER_FILE}
                            style={{ display: "none" }}
                        />
                    </div>
                    <p className="af-span-p" style={{ width: "4rem" }}>Final</p>
                    <div className="af-span-div" style={{ width: "8rem" }}>
                        <InputText
                            style={{ width: "8rem" }}
                            id="id_PO_CD"
                            value={dataEDT_KSV_ORDER_SHIP.OTHER_FILE2}
                            onChange={(e) =>
                                onInputChangeEDT_KSV_ORDER_SHIP_OTHER_FILE2(
                                    e,
                                    "OTHER_FILE2",
                                )
                            }
                        />
                    </div>
                    <div className="af-span-div" style={{ width: "6rem" }}>
                        <button style={{ width: "6rem", height: "1.5rem" }}>
                            <label
                                className="inputFileCustom"
                                htmlFor="inputFileAdd_Other2"
                            >
                                Upload
                            </label>
                        </button>
                        <input
                            type="file"
                            id="inputFileAdd_Other2"
                            onChange={s3FileUpload_OTHER_FILE2}
                            style={{ display: "none" }}
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "13rem" }}>
                    <div className="af-span-div-btn" style={{ width: "12rem" }}>
                        <Button
                            style={{ width: "12rem" }}
                            label="Excel"
                            className="p-button-text green"
                            onClick={search_LIST_EXCEL}
                        />
                    </div>
                </span>

                <span
                    className="af-span-3"
                    style={{ width: "100rem", paddingTop: "3px" }}
                >
                    <p className="af-span-p" style={{ width: "7rem" }}>Ship Amt</p>
                    <div className="af-span-div" style={{ width: "8rem" }}>
                        <InputText
                            disabled={isOrder}
                            style={{ width: "8rem" }}
                            id="id_PO_CD"
                            value={dataEDT_KSV_ORDER_SHIP.SHIP_AMT}
                            onChange={(e) =>
                                onInputChangeEDT_KSV_ORDER_SHIP_SHIP_AMT(
                                    e,
                                    "SHIP_AMT",
                                )
                            }
                        />
                    </div>

                    <p className="af-span-p" style={{ width: "1rem" }}>+</p>

                    <p className="af-span-p" style={{ width: "4rem" }}>Adj Amt</p>
                    <div className="af-span-div" style={{ width: "8rem" }}>
                        <InputText
                            style={{ width: "8rem" }}
                            id="id_PO_CD"
                            value={dataEDT_KSV_ORDER_SHIP.ADJ_AMT}
                            onChange={(e) =>
                                onInputChangeEDT_KSV_ORDER_SHIP_ADJ_AMT(
                                    e,
                                    "ADJ_AMT",
                                )
                            }
                        />
                    </div>

                    <p className="af-span-p" style={{ width: "1rem" }}>=</p>

                    <p className="af-span-p" style={{ width: "4rem" }}>Tot Amt</p>
                    <div className="af-span-div" style={{ width: "8rem" }}>
                        <InputText
                            disabled={isGarment}
                            style={{ width: "8rem" }}
                            id="id_PO_CD"
                            value={dataEDT_KSV_ORDER_SHIP.TOT_AMT}
                            onChange={(e) =>
                                onInputChangeEDT_KSV_ORDER_SHIP_TOT_AMT(
                                    e,
                                    "TOT_AMT",
                                )
                            }
                        />
                    </div>
                    <p className="af-span-p" style={{ width: "9rem" }}>Non Garment</p>
                    <div className="af-span-checkbox">
                        <Checkbox
                            id="id_IS_SAMPLE"
                            checked={changeCheckBoxVal(
                                dataEDT_KSV_ORDER_SHIP.IS_NON_GARMENT,
                            )}
                            onChange={(e) =>
                                onCheckboxChangeEDT_KSV_ORDER_SHIP_IS_NON_GARMENT(
                                    e,
                                    "IS_NON_GARMENT",
                                )
                            }
                        />
                    </div>
                    <p className="af-span-p" style={{ width: "7rem" }}>Buyer</p>
                    <div className="af-span-div" style={{ width: "15rem" }}>
                        <Dropdown
                            disabled={isOrder}
                            style={{ width: "15rem" }}
                            id="id_ORDER_CD"
                            value={dataEDT_KSV_ORDER_SHIP_BUYER_CD}
                            onChange={(e) =>
                                onDropdownChangeEDT_KSV_ORDER_SHIP_BUYER_CD(
                                    e,
                                    "BUYER_CD",
                                )
                            }
                            options={datasEDT_KSV_ORDER_SHIP_BUYER_CD}
                            optionLabel="BUYER_NAME"
                            placeholder=""
                            filter
                        ></Dropdown>
                    </div>
                    <p className="af-span-p" style={{ width: "7rem" }}>Factory</p>
                    <div className="af-span-div" style={{ width: "15rem" }}>
                        <Dropdown
                            disabled={isOrder}
                            style={{ width: "15rem" }}
                            id="id_ORDER_CD"
                            value={dataEDT_KSV_ORDER_SHIP_FACTORY_CD}
                            onChange={(e) =>
                                onDropdownChangeEDT_KSV_ORDER_SHIP_FACTORY_CD(
                                    e,
                                    "FACTORY_CD",
                                )
                            }
                            options={datasEDT_KSV_ORDER_SHIP_FACTORY_CD}
                            optionLabel="FACTORY_NAME"
                            placeholder=""
                            filter
                        ></Dropdown>
                    </div>
                </span>
            </div>

            <div
                className="af-div-first"
                style={{ width: "123rem", height: "47rem" }}
            >
                <AFDataTable preventUnrelatedRerender
                    ref={dt_TBL_KSV_ORDER_SHIP1}
                    editMode="cell"
                    size="small"
                    value={datasTBL_KSV_ORDER_SHIP1}
                    loading={loadingTBL_KSV_ORDER_SHIP1}
                    tableStyle={{ tableLayout: "fixed" }}
                    resizableColumns
                    columnResizeMode="expand"
                    showGridlines
                    selectionMode="checkbox"
                    selection={selectedTBL_KSV_ORDER_SHIP1}
                    onSelectionChange={(e) => {
                        setFlagSelectModeTBL_KSV_ORDER_SHIP1(true);
                        setSelectedTBL_KSV_ORDER_SHIP1(e.value);
                        console.log(
                            "selected length:" +
                                selectedTBL_KSV_ORDER_SHIP1.length,
                        );
                        onRowClick1TBL_KSV_ORDER_SHIP1(e.value);
                    }}
                    onRowClick={onRowClickTBL_KSV_ORDER_SHIP1}
                    dataKey="id"
                    className="datatable-responsive"
                    virtualScrollerOptions={{ itemSize: 20 }}
                    emptyMessage="" //header={headerTBL_KSV_ORDER_SHIP}
                    responsiveLayout="scroll"
                    scrollHeight="500px"
                    scrollable
                >
                    <AFColumn field="ORDER_CD" header="Order" headerStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="STYLE_NAME" header="Style" headerStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="COLOR" header="Color" headerStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="SIZE" header="Size" headerStyle={{ width: "10rem" }} ></AFColumn>

                    <AFColumn field="TOT_CNT" header="Order Qty" headerStyle={{ width: "10rem" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.TOT_CNT, 2) } ></AFColumn>
                    <AFColumn field="PROD_CNT" header="Prod Qty" headerStyle={{ width: "10rem" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.PROD_CNT, 2) } ></AFColumn>
                    <AFColumn field="TOT_SHIP_CNT" header="Shipped Qty" headerStyle={{ width: "10rem" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.TOT_SHIP_CNT, 2) } ></AFColumn>
                    <AFColumn field="REMAIN_QTY" header="Bal Qty" headerStyle={{ width: "10rem" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.REMAIN_QTY, 2) } ></AFColumn>
                    <AFColumn style={{ width: "6rem" }} field="SHIP_CNT" header="Ship Qty" headerStyle={{ color: "green" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.SHIP_CNT, 2) } editor={(options) => cellEditorTBL_KSV_ORDER_SHIP1(options) } onCellEditComplete={ onCellEditCompleteTBL_KSV_ORDER_SHIP1 } ></AFColumn>

                    <AFColumn field="CURR_CD" header="Curr" headerStyle={{ width: "3rem" }} ></AFColumn>
                    <AFColumn style={{ width: "6rem" }} field="PRICE" header="Ship Price" headerStyle={{ color: "green" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.PRICE, 2) } editor={(options) => cellEditorTBL_KSV_ORDER_SHIP1(options) } onCellEditComplete={ onCellEditCompleteTBL_KSV_ORDER_SHIP1 } ></AFColumn>
                    <AFColumn field="AMOUNT" header="Amount" headerStyle={{ width: "10rem" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.AMOUNT, 2) } ></AFColumn>
                </AFDataTable>
            </div>

            <Dialog
                visible={createDialog}
                position="mid-center"
                style={{ width: "950px", height: "600px" }}
                header=""
                modal={true}
                className="p-fluid"
                onHide={hideDialog}
            >
                <div
                    className="af-div-first"
                    style={{ width: "80rem", height: "5rem" }}
                >
                    <span className="af-span-3-0" style={{ width: "19rem" }}>
                        <p className="af-span-p" style={{ width: "7rem" }}>Factory#</p>
                        <div className="af-span-div" style={{ width: "11rem" }}>
                            <InputText
                                disbled
                                style={{ width: "11rem" }}
                                id="id_PO_CD"
                                value={dataQRY_KSV_ORDER_SHIP1.FACTORY_CD}
                                onChange={(e) =>
                                    onInputChangeQRY_KSV_ORDER_SHIP1_FACTORY_CD(
                                        e,
                                        "FACTORY_CD",
                                    )
                                }
                            />
                        </div>
                    </span>
                    <span className="af-span-3-0" style={{ width: "19rem" }}>
                        <p className="af-span-p" style={{ width: "7rem" }}>Buyer#</p>
                        <div className="af-span-div" style={{ width: "11rem" }}>
                            <InputText
                                disbled
                                style={{ width: "11rem" }}
                                id="id_PO_CD"
                                value={dataQRY_KSV_ORDER_SHIP1.BUYER_CD}
                                onChange={(e) =>
                                    onInputChangeQRY_KSV_ORDER_SHIP1_BUYER_CD(
                                        e,
                                        "BUYER_CD",
                                    )
                                }
                            />
                        </div>
                    </span>
                    <span className="af-span-3-0" style={{ width: "19rem" }}>
                        <p className="af-span-p" style={{ width: "7rem" }}>Order#</p>
                        <div className="af-span-div" style={{ width: "11rem" }}>
                            <InputText
                                style={{ width: "11rem" }}
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
                    <span className="af-span-3-0" style={{ width: "10rem" }}>
                        <div
                            className="af-span-div-btn"
                            style={{ width: "10rem" }}
                        >
                            <Tooltip
                                className="menuCodeTooltip"
                                target={`#btnSearch`}
                                content={`Alt+S`}
                                position="bottom"
                            />

                            <Button
                                style={{ width: "10rem" }}
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
                    <span className="af-span-3-0" style={{ width: "10rem" }}>
                        <div
                            className="af-span-div-btn"
                            style={{ width: "10rem" }}
                        >
                            <Button
                                style={{ width: "10rem" }}
                                label="Apply"
                                className="p-button-text"
                                onClick={process_APPLY}
                            />
                        </div>
                    </span>
                </div>

                <div
                    className="af-div-first"
                    style={{ width: "85rem", height: "45rem" }}
                >
                    <AFDataTable preventUnrelatedRerender
                        ref={dt_TBL_KSV_ORDER_SHIP2}
                        editMode="cell"
                        size="small"
                        value={datasTBL_KSV_ORDER_SHIP2}
                        loading={loadingTBL_KSV_ORDER_SHIP2}
                        tableStyle={{ tableLayout: "fixed" }}
                        resizableColumns
                        columnResizeMode="expand"
                        metaKeySelection={false}
                        showGridlines
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
                        scrollHeight="45rem"
                    >
                        <AFColumn selectionMode="multiple" field="__checkbox__" reorderable={false} headerClassName="t-header" headerStyle={{ width: "3rem" }} ></AFColumn>
                        <AFColumn field="ORDER_CD" header="Order" headerStyle={{ width: "10rem" }} ></AFColumn>
                        <AFColumn field="STYLE_NAME" header="Style" headerStyle={{ width: "10rem" }} ></AFColumn>
                        <AFColumn field="COLOR" header="Color" headerStyle={{ width: "10rem" }} ></AFColumn>
                        <AFColumn field="TOT_CNT" header="Order Qty" headerStyle={{ width: "10rem" }} ></AFColumn>
                        <AFColumn field="SHIP_CNT" header="Ship Qty" headerStyle={{ width: "10rem" }} ></AFColumn>
                        <AFColumn field="BAL_CNT" header="Bal Qty" headerStyle={{ width: "10rem" }} ></AFColumn>
                        <AFColumn field="CURR_CD" header="Curr" headerStyle={{ width: "10rem" }} ></AFColumn>
                        <AFColumn field="PRICE" header="Price" headerStyle={{ width: "10rem" }} ></AFColumn>
                    </AFDataTable>
                </div>
            </Dialog>
            <Toast ref={toast} />
        </div>
    );
};

const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(S051301_SHIPPING_REGIST, comparisonFn);
