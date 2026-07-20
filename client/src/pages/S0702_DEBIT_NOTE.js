/* eslint-disable */
import React, { useState, useEffect, useRef } from "react";
import classNames from "classnames";
import axios from "axios";
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
import { ServiceS0702_DEBIT_NOTE } from "../service/service_biz/ServiceS0702_DEBIT_NOTE";
import { ServiceS0701_CREDIT_NOTE } from "../service/service_biz/ServiceS0701_CREDIT_NOTE";
import { ServiceS0703_DEBIT_NOTE_FACTORY_BVT } from "../service/service_biz/ServiceS0703_DEBIT_NOTE_FACTORY_BVT";

const moment = require("moment");

import "./page_common.scss";

const emptyKCD_CODE = {
    id: 0,
    CD_GROUP: "",
    CD_CODE: "",
    CD_NAME: "",
    CD_FLAG: "",
};

const emptyQRY_KSV_INVOICE_MST = {
    S_ISSUE_DATE: "",
    E_ISSUE_DATE: "",
    PAY_TO: "",
    BILL_TO: "",
    CHARGER: "",
    STATUS_CD: "",
    TITLE: "",
    BUYER_CD: "",
    DEBIT_TYPE: "",
};

const emptyQRY_KSV_INVOICE_MST1 = {
    DEBIT_NO: "",
    PO_CD: "",
    ORDER_CD: "",
};

const emptyTBL_KSV_INVOICE_MST = {
    id: 0,
    TEAM: "",
    NUMBER: "",
    SEQ: "",
    DATE_OF_ISSUE: "",
    PAY_TO: "",
    PAY_AMT: "",
    BAL_AMT: "",
    CURR_CD: "",
    USD_BAL: "",
    TITLE: "",
    CHARGER: "",
    EXP_DATE: "",
    REMARK: "",
    STATUS: "",
};

const emptyTBL_KSV_INVOICE_MST1 = {
    id: 0,
    CURR_CD: "",
    AMOUNT: "",
    AMT_USD: "",
};

const emptyTBL_KSV_INVOICE_MST2 = {
    id: 0,
    END_DATE: "",
    END_AMT: "",
};

const emptyEDT_KSV_INVOICE_MST1 = {
    DEBIT_NO: "",
    BUYER_CD: "",
    STATUS_CD: "",
    DATE_OF_ISSUE: "",
    LINK_TO: "",
    DEBIT_TYPE: "",
    PAY_TO: "",
    EXP_DATE: "",
    BANK_CD: "",
    PAYMENT_PLAN: "",
    TITLE: "",
    REMARK: "",
    CHARGER: "",
    END_TYPE: "",
    PAY_AMT: "",
    PAY_TYPE: "",
    PAY_CURR_CD: "",
    VAT_AMT: "",
    PO_CD: "",
    ORDER_CD: "",
    GW_CODE: "",
};

const emptyEDT_KSV_INVOICE_MST2 = {
    END_TYPE: "",
    END_DATE: "",
    AMT: "",
};

const S0702_DEBIT_NOTE = () => {
    const serviceLibRef = useRef(null);
    if (!serviceLibRef.current) {
        serviceLibRef.current = new ServiceLib();
        serviceLibRef.current.loginConfirm();
    }
    const serviceLib = serviceLibRef.current;
    const serviceS0702_DEBIT_NOTERef = useRef(null);
    if (!serviceS0702_DEBIT_NOTERef.current) serviceS0702_DEBIT_NOTERef.current = new ServiceS0702_DEBIT_NOTE();
    const serviceS0702_DEBIT_NOTE = serviceS0702_DEBIT_NOTERef.current;
    const serviceS0703_DEBIT_NOTE_FACTORY_BVTRef = useRef(null);
    if (!serviceS0703_DEBIT_NOTE_FACTORY_BVTRef.current) serviceS0703_DEBIT_NOTE_FACTORY_BVTRef.current = new ServiceS0703_DEBIT_NOTE_FACTORY_BVT();
    const serviceS0703_DEBIT_NOTE_FACTORY_BVT = serviceS0703_DEBIT_NOTE_FACTORY_BVTRef.current;
    const serviceS0701_CREDIT_NOTERef = useRef(null);
    if (!serviceS0701_CREDIT_NOTERef.current) serviceS0701_CREDIT_NOTERef.current = new ServiceS0701_CREDIT_NOTE();
    const serviceS0701_CREDIT_NOTE = serviceS0701_CREDIT_NOTERef.current;

    var tUserInfo = serviceLib.getUserInfo();

    const toast = useRef(null);

    //
    const [savePARAM, setSavePARAM] = useState({});

    /* splitter 관련 */
    const [styleVal, setStyleVal] = useState({ width: "65vw" });

    const process_RESET_QRY = () => {
        var tRetDate = serviceLib.getCurrDate().substring(0, 8);
        var tObj0 = { ...emptyQRY_KSV_INVOICE_MST };

        // 작년 12월 1일
        const S_ISSUE_DATE = moment()
            .subtract(1, "years")
            .month(11)
            .date(1)
            .format("YYYYMMDD");
        // 올해 12월 말일
        const E_ISSUE_DATE = moment()
            .month(11)
            .endOf("month")
            .format("YYYYMMDD");

        tObj0.S_ISSUE_DATE = S_ISSUE_DATE;
        tObj0.E_ISSUE_DATE = E_ISSUE_DATE;

        setDataQRY_KSV_INVOICE_MST_PAY_TO(datasQRY_KSV_INVOICE_MST_PAY_TO[0]);
        setDataQRY_KSV_INVOICE_MST_BILL_TO(datasQRY_KSV_INVOICE_MST_BILL_TO[0]);
        setDataQRY_KSV_INVOICE_MST_CHARGER(datasQRY_KSV_INVOICE_MST_CHARGER[0]);
        tObj0.CHARGER = (datasQRY_KSV_INVOICE_MST_CHARGER[0] && datasQRY_KSV_INVOICE_MST_CHARGER[0].USER_ID) || '';
        setDataQRY_KSV_INVOICE_MST(tObj0);
        setDataQRY_KSV_INVOICE_MST_STATUS_CD(
            datasQRY_KSV_INVOICE_MST_STATUS_CD[0],
        );
        setDataQRY_KSV_INVOICE_MST_BUYER_CD(
            datasQRY_KSV_INVOICE_MST_BUYER_CD[0],
        );
        setDataQRY_KSV_INVOICE_MST_DEBIT_TYPE(
            datasQRY_KSV_INVOICE_MST_DEBIT_TYPE[0],
        );
    };

    const process_UPDATE_END_TYPE = () => {
        if (selectedTBL_KSV_INVOICE_MST2.length <= 0) {
            alert("작업할 데이타를 선택하세요<br><br>Choose the data you want to work with");
            return;
        }
        var tObj = { ...selectedTBL_KSV_INVOICE_MST2[0] };

        var tInObj = {};
        tInObj.CRDB_CD = selectedTBL_KSV_INVOICE_MST[0].CRDB_CD;
        tInObj.END_DATE = tObj.END_DATE;
        tInObj.AMT = tObj.CRDB_AMT;
        tInObj.END_TYPE = dataEDT_KSV_INVOICE_MST2.END_TYPE;

        var tInArray = [];
        tInArray.push(tInObj);

        setLoadingTBL_KSV_INVOICE_MST2(true);
        serviceS0702_DEBIT_NOTE
            .mgrUpdate_UPDATE_END_TYPE(tInArray)
            .then((data) => {
                setLoadingTBL_KSV_INVOICE_MST2(false);
                if (typeof data.graphQLErrors === "undefined") {
                    // console.log("ServiceMgrKCD_BUYER.mgr1KcdStyle call => " + data.length);
                    if (data.length > 0) {
                        alert(data[0].CODE);
                    }
                    search_LIST_2(selectedTBL_KSV_INVOICE_MST[0]);
                } else {
                    console.log(
                        "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });
    };

    const process_INSERT_DEBIT_NOTE = () => {
        var tObj = { ...dataEDT_KSV_INVOICE_MST1 };
        tObj.USER_ID = tUserInfo.USER_ID;

        tObj.DEBIT_NO = "";

        if (typeof dataEDT_KSV_INVOICE_MST1_BANK_CD.BANK_CD !== "undefined")
            tObj.BANK_CD = dataEDT_KSV_INVOICE_MST1_BANK_CD.BANK_CD;
        if (typeof dataEDT_KSV_INVOICE_MST1_BUYER_CD.BUYER_CD !== "undefined")
            tObj.BUYER_CD = dataEDT_KSV_INVOICE_MST1_BUYER_CD.BUYER_CD;

        if (tObj.PAY_TO === "") {
            alert("청구처는 필수 입력 사항입니다.<br><br>Billing to is a required field.");
            return;
        }

        if (tObj.PAY_AMT === "" || parseFloat(tObj.PAY_AMT) <= 0) {
            alert("청구액은 필수 입력 사항입니다.<br><br>Charge amount is required.");
            return;
        }

        if (tObj.PAY_CURR_CD === "") {
            alert("통화는 필수 입력 사항입니다.<br><br>Currency is required.");
            return;
        }

        if (tObj.BANK_CD === "") {
            alert("은행은 필수 입력 사항입니다.<br><br>Bank is required.");
            return;
        }

        if (tObj.BUYER_CD === "") {
            alert("Buyer은 필수 입력 사항입니다.<br><br>Buyer is required.");
            return;
        }

        if (tObj.TITLE === "") {
            alert("Title은 필수 입력 사항입니다.<br><br>Title is required.");
            return;
        }

        if (tObj.expDate === "") {
            alert("Exp Recept Date는 필수 입력 사항입니다.<br><br>Exp Recept Date is required.");
            return;
        }

        // BILL Regist에서 등록된 Debit
        if (typeof savePARAM.BILL_NO !== "undefined")
            tObj.BILL_NO = savePARAM.BILL_NO;
        else tObj.BILL_NO = "";

        tObj.STOCK_IDX = "";
        if (typeof savePARAM.STOCK_IDX !== "undefined") {
            if (savePARAM.STOCK_IDX !== "")
                tObj.STOCK_IDX = savePARAM.STOCK_IDX;
        }

        setDatasTBL_KSV_INVOICE_MST([]);
        setSelectedTBL_KSV_INVOICE_MST([]);

        // 2
        setLoadingTBL_KSV_INVOICE_MST(true);
        serviceS0702_DEBIT_NOTE
            .mgrUpdate_INSERT_DEBIT_NOTE(tObj)
            .then((data) => {
                setLoadingTBL_KSV_INVOICE_MST(false);
                if (typeof data.graphQLErrors === "undefined") {
                    // console.log("ServiceMgrKCD_BUYER.mgr1KcdStyle call => " + data.length);
                    if (data.length > 0) {
                        alert(data[0].CODE);
                        if (data[0].CODE.includes("SUCC")) {
                            var tCols = data[0].CODE.split(":");
                            if (tCols.length >= 3) {
                                var tObj2 = {};
                                tObj2.DEBIT_NO = tCols[2];
                                search_LIST_1_BY_NUMBER(tObj2);
                            }
                        }
                    }
                    // search_LIST_1();
                } else {
                    console.log(
                        "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });
    };

    const process_CANCEL_DEBIT_NOTE = () => {
        var tObj = { ...dataEDT_KSV_INVOICE_MST1 };
        tObj.USER_ID = tUserInfo.USER_ID;

        // setDatasTBL_KSV_INVOICE_MST([]);
        // setSelectedTBL_KSV_INVOICE_MST([]);

        // 2
        setLoadingTBL_KSV_INVOICE_MST(true);
        serviceS0702_DEBIT_NOTE
            .mgrUpdate_CANCEL_DEBIT_NOTE(tObj)
            .then((data) => {
                setLoadingTBL_KSV_INVOICE_MST(false);
                if (typeof data.graphQLErrors === "undefined") {
                    // console.log("ServiceMgrKCD_BUYER.mgr1KcdStyle call => " + data.length);
                    if (data.length > 0) {
                        alert(data[0].CODE);
                    }
                    search_LIST_1();
                } else {
                    console.log(
                        "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });
    };

    const process_UPDATE_DEBIT_NOTE = () => {
        var tObj = { ...dataEDT_KSV_INVOICE_MST1 };
        const payAmt = parseFloat(String(tObj.PAY_AMT || 0).replace(/,/g, "")) || 0;
        const vatAmt = parseFloat(String(tObj.VAT_AMT || 0).replace(/,/g, "")) || 0;
        tObj.PAY_AMT = String(payAmt - vatAmt);
        if (tObj.DEBIT_NO === "") {
            alert("CRDB_NO가 없습니다<br><br>CRDB_NO does not exist");
            return;
        }
        if (tObj.LINK_TO === "") {
            alert("Link To가 없습니다<br><br>There is no Link To");
            return;
        }
        if (
            tObj.ORDER_CD !== "" &&
            tObj.ORDER_CD.substring(0, 2) !== tObj.BUYER_CD
        ) {
            alert(
                `Order Cd와 Buyer Cd가 틀립니다.(${tObj.BUYER_CD}, ${tObj.ORDER_CD.substring(0, 2)})`,
            );
            return;
        }
        if (tObj.GW_CODE !== "") {
            alert("상신중인 데이타는 수정할수 없습니다.<br><br>Data in progress cannot be modified.");
            return;
        }

        // setDatasTBL_KSV_INVOICE_MST([]);
        // setSelectedTBL_KSV_INVOICE_MST([]);

        // Amt가 변경된 경우(기존 CRDB_AMT) INSSERT 처리하여 HISTORY로 남김.
        setLoadingTBL_KSV_INVOICE_MST(true);
        serviceS0702_DEBIT_NOTE
            .mgrUpdate_UPDATE_DEBIT_NOTE(tObj)
            .then((data) => {
                setLoadingTBL_KSV_INVOICE_MST(false);
                if (typeof data.graphQLErrors === "undefined") {
                    // console.log("ServiceMgrKCD_BUYER.mgr1KcdStyle call => " + data.length);
                    if (data.length > 0) {
                        alert(data[0].CODE);
                    }
                    var tObj2 = {};
                    tObj2.DEBIT_NO = tObj.DEBIT_NO;
                    search_LIST_1_BY_NUMBER(tObj2);
                } else {
                    console.log(
                        "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });
    };

    const process_CONFIRM_DEBIT_NOTE = () => {
        const debitTypeCode = String(
            (dataEDT_KSV_INVOICE_MST1 && dataEDT_KSV_INVOICE_MST1.DEBIT_TYPE) ||
                (dataTBL_KSV_INVOICE_MST && dataTBL_KSV_INVOICE_MST.DEBIT_TYPE) ||
                "",
        ).trim();
        const debitTypeName = String(
            (dataTBL_KSV_INVOICE_MST &&
                dataTBL_KSV_INVOICE_MST.DEBIT_TYPE_NAME) ||
                "",
        )
            .trim()
            .toLowerCase();
        const isInsideDebit =
            debitTypeCode === "3" || debitTypeName === "inside debit";
        if (!isInsideDebit) {
            alert(
                "Inside Debit인 경우에만 Confirm 할 수 있습니다.<br><br>Confirm is allowed only for Inside Debit.",
            );
            return;
        }

        const allowedConfirmUsers = new Set([
            "haein",
            "andrew",
            "jhoen",
            "ciara",
            "jake",
            "ken",
            "oliver",
            "chuck",
            "changbae",
            "mjshim",
            "jay.jung",
            "kevin",
            "kevin1",
            "lih7912",
            "won21kr",
        ]);
        const currentUserId = String((tUserInfo && tUserInfo.USER_ID) || "")
            .trim()
            .toLowerCase();
        if (!allowedConfirmUsers.has(currentUserId)) {
            alert(
                "Confirm 권한이 없습니다.<br><br>You are not allowed to confirm this document.",
            );
            return;
        }

        const confUser = String(
            (dataTBL_KSV_INVOICE_MST && dataTBL_KSV_INVOICE_MST.CONF_USER) ||
                "",
        ).trim();

        if (dataTBL_KSV_INVOICE_MST.CONF_FLAG === "Y" && confUser !== "") {
            alert("이미 Confirm 처리 되어있습니다.<br><br>Already confirmed.");
            return;
        }

        var tObj = {};
        tObj.CRDB_CD = dataEDT_KSV_INVOICE_MST1.DEBIT_NO;

        var tInArray = [];
        tInArray.push(tObj);

        setLoadingTBL_KSV_INVOICE_MST(true);
        serviceS0703_DEBIT_NOTE_FACTORY_BVT
            .mgrUpdate_UPDATE_CONFIRM(tInArray)
            .then((data) => {
                setLoadingTBL_KSV_INVOICE_MST(false);
                if (typeof data.graphQLErrors === "undefined") {
                    if (data.length > 0) {
                        alert(data[0].CODE);
                    }
                    search_LIST_1();
                } else {
                    console.log(
                        "process_CONFIRM_DEBIT_NOTE error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });
    };

    const process_END_DEBIT_NOTE = () => {
        var tObj = { ...dataEDT_KSV_INVOICE_MST1 };
        tObj.USER_ID = tUserInfo.USER_ID;

        var tObj1 = { ...dataEDT_KSV_INVOICE_MST2 };

        // setDatasTBL_KSV_INVOICE_MST([]);
        // setSelectedTBL_KSV_INVOICE_MST([]);

        if (!tObj1.END_DATE) {
           alert (`End Date는 필수 입력입니다. End Date is required.`);
           return;
        }

        // 2
        setLoadingTBL_KSV_INVOICE_MST(true);
        serviceS0702_DEBIT_NOTE
            .mgrUpdate_END_DEBIT_NOTE(tObj, tObj1)
            .then((data) => {
                setLoadingTBL_KSV_INVOICE_MST(false);
                if (typeof data.graphQLErrors === "undefined") {
                    // console.log("ServiceMgrKCD_BUYER.mgr1KcdStyle call => " + data.length);
                    if (data.length > 0) {
                        alert(data[0].CODE);
                    }
                    var tObj2 = {};
                    tObj2.DEBIT_NO = tObj.DEBIT_NO;
                    search_LIST_1_BY_NUMBER(tObj2);

                    var tObj9 = {};
                    tObj9.CRDB_CD = tObj.DEBIT_NO;
                    search_LIST_2(tObj9);
                } else {
                    console.log(
                        "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });
    };

    const process_CANCEL_END_CREDIT = () => {
        var tObj = { ...dataEDT_KSV_INVOICE_MST1 };
        tObj.USER_ID = tUserInfo.USER_ID;

        var tArray = [...selectedTBL_KSV_INVOICE_MST2];
        if (tArray.length <= 0) {
            alert("작업할 데이타를 선택하십시오<br><br>Choose the data you want to work with");
            return;
        }
        var tObj1 = [];
        tArray.forEach((col, i) => {
            var tOne = { ...col };
            if (typeof tOne.id !== "undefined") delete tOne.id;
            if (typeof tOne.__typename !== "undefined") delete tOne.__typename;
            tObj1.push(tOne);
        });

        // setDatasTBL_KSV_INVOICE_MST([]);
        // setSelectedTBL_KSV_INVOICE_MST([]);

        // 2
        setLoadingTBL_KSV_INVOICE_MST2(true);
        serviceS0702_DEBIT_NOTE
            .mgrUpdate_CANCEL_END_CREDIT(tObj, tObj1)
            .then((data) => {
                setLoadingTBL_KSV_INVOICE_MST2(false);
                if (typeof data.graphQLErrors === "undefined") {
                    // console.log("ServiceMgrKCD_BUYER.mgr1KcdStyle call => " + data.length);
                    if (data.length > 0) {
                        alert(data[0].CODE);
                    }
                    search_LIST_2(tObj);
                } else {
                    console.log(
                        "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });
    };

    const GW_WINDOW_NAME = "GW_DEBIT_POPUP";
    const gwWinRef = useRef(null);

    const search_REPORT = () => {
        if (selectedTBL_KSV_INVOICE_MST.length <= 0) {
            alert("하나이상의 데이타를 선택하세요<br><br>Select one or more data");
            return;
        }

        var tArray = [];
        var tInObj = {};
        tInObj.CRDB_CD = selectedTBL_KSV_INVOICE_MST[0].CRDB_CD;
        tArray.push(tInObj);

        setLoadingTBL_KSV_INVOICE_MST(true);
        serviceS0702_DEBIT_NOTE.mgrQuery_REPORT(tArray).then((data) => {
            setLoadingTBL_KSV_INVOICE_MST(false);
            if (typeof data.graphQLErrors === "undefined") {
                if (data.length > 0) {
                    if (data[0].CODE.includes("SUCC")) {
                        serviceLib.downloadFile(
                            data[0].CODE.split("?")[2].toString(),
                            data[0].CODE.split("?")[1].toString(),
                        );
                    }
                }
            } else {
                console.log(
                    "Search List error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });
    };

    const search_CODE = (argData, argMode) => {
        var _tObj = { ...argData };
        serviceS0702_DEBIT_NOTE.mgrQuery_CODE(_tObj).then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                if (argMode === "") {
                    setDatasQRY_KSV_INVOICE_MST_PAY_TO(data.DEBIT_TYPE);
                    setDataQRY_KSV_INVOICE_MST_PAY_TO(data.DEBIT_TYPE[0]);

                    setDatasQRY_KSV_INVOICE_MST_BILL_TO(data.MESSER);
                    setDataQRY_KSV_INVOICE_MST_BILL_TO(data.MESSER[0]);

                    setDatasQRY_KSV_INVOICE_MST_CHARGER(data.USER);
                    setDataQRY_KSV_INVOICE_MST_CHARGER(data.USER[0]);
                    setDataQRY_KSV_INVOICE_MST((prev) => ({ ...prev, CHARGER: (data.USER[0] && data.USER[0].USER_ID) || '' }));

                    setDatasQRY_KSV_INVOICE_MST_STATUS_CD(data.DEBIT_STATUS);
                    setDataQRY_KSV_INVOICE_MST_STATUS_CD(data.DEBIT_STATUS[0]);

                    setDatasQRY_KSV_INVOICE_MST_BUYER_CD(data.BUYER3);
                    setDataQRY_KSV_INVOICE_MST_BUYER_CD(data.BUYER3[0]);

                    setDatasQRY_KSV_INVOICE_MST_DEBIT_TYPE(data.DEBIT_TYPE);
                    setDataQRY_KSV_INVOICE_MST_DEBIT_TYPE(data.DEBIT_TYPE[0]);

                    setDatasEDT_KSV_INVOICE_MST1_BUYER_CD(data.BUYER3);
                    setDataEDT_KSV_INVOICE_MST1_BUYER_CD(data.BUYER3[0]);

                    setDatasEDT_KSV_INVOICE_MST1_STATUS_CD(data.DEBIT_STATUS);
                    setDataEDT_KSV_INVOICE_MST1_STATUS_CD(data.DEBIT_STATUS[0]);

                    setDatasEDT_KSV_INVOICE_MST1_LINK_TO(data.FACTORY);
                    setDataEDT_KSV_INVOICE_MST1_LINK_TO(data.FACTORY[0]);

                    setDatasEDT_KSV_INVOICE_MST1_DEBIT_TYPE(data.DEBIT_TYPE);
                    setDataEDT_KSV_INVOICE_MST1_DEBIT_TYPE(data.DEBIT_TYPE[0]);

                    setDatasEDT_KSV_INVOICE_MST1_PAY_TO(data.MESSER);
                    setDataEDT_KSV_INVOICE_MST1_PAY_TO(data.MESSER[0]);

                    setDatasEDT_KSV_INVOICE_MST1_BANK_CD(data.BANK);
                    setDataEDT_KSV_INVOICE_MST1_BANK_CD(data.BANK[0]);

                    setDatasEDT_KSV_INVOICE_MST1_END_TYPE(data.CREDIT_END_TYPE);
                    setDataEDT_KSV_INVOICE_MST1_END_TYPE(
                        data.CREDIT_END_TYPE[0],
                    );

                    setDatasEDT_KSV_INVOICE_MST1_PAY_CURR_CD(data.CURR_CD);
                    setDataEDT_KSV_INVOICE_MST1_PAY_CURR_CD(data.CURR_CD[0]);

                    setDatasEDT_KSV_INVOICE_MST2_END_TYPE(data.CREDIT_END_TYPE);
                    setDataEDT_KSV_INVOICE_MST2_END_TYPE(
                        data.CREDIT_END_TYPE[0],
                    );

                    setDatasEDT_KSV_INVOICE_MST1_PO_CD(data.PO_CD);
                    setDataEDT_KSV_INVOICE_MST1_PO_CD(data.PO_CD[0]);

                    setDatasEDT_KSV_INVOICE_MST1_ORDER_CD(data.ORDER_CD);
                    setDataEDT_KSV_INVOICE_MST1_ORDER_CD(data.ORDER_CD[0]);

                    setDatasEDT_KSV_INVOICE_MST1_PAY_TYPE(data.PAY_TYPE);
                    setDataEDT_KSV_INVOICE_MST1_PAY_TYPE(data.PAY_TYPE[0]);
                }

                if (argMode === "COM_CD") {
                    setDatasQRY_KSV_INVOICE_MST_BILL_TO(data.MESSER);
                    setDataQRY_KSV_INVOICE_MST_BILL_TO(data.MESSER[0]);

                    setDatasEDT_KSV_INVOICE_MST1_PAY_TO(data.MESSER);
                    setDataEDT_KSV_INVOICE_MST1_PAY_TO(data.MESSER[0]);
                }
                if (argMode === "BUYER_CD") {
                    setDatasQRY_KSV_INVOICE_MST_BUYER_CD(data.BUYER3);
                    setDataQRY_KSV_INVOICE_MST_BUYER_CD(data.BUYER3[0]);

                    setDatasEDT_KSV_INVOICE_MST1_BUYER_CD(data.BUYER3);
                    setDataEDT_KSV_INVOICE_MST1_BUYER_CD(data.BUYER3[0]);
                }
                if (argMode === "BANK_CD") {
                    setDatasEDT_KSV_INVOICE_MST1_BANK_CD(data.BANK);
                    setDataEDT_KSV_INVOICE_MST1_BANK_CD(data.BANK[0]);
                }
            } else {
                console.log(
                    "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });
    };

    const search_CODE1 = (argData) => {
        var _tObj = {};
        _tObj.BUYER_CD = argData.trim();
        serviceS0702_DEBIT_NOTE.mgrQuery_CODE1(_tObj).then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                setDatasEDT_KSV_INVOICE_MST1_PO_CD(data.PO_CD);
                setDataEDT_KSV_INVOICE_MST1_PO_CD(data.PO_CD[0]);

                setDatasEDT_KSV_INVOICE_MST1_ORDER_CD(data.ORDER_CD);
                setDataEDT_KSV_INVOICE_MST1_ORDER_CD(data.ORDER_CD[0]);
            } else {
                console.log(
                    "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });
    };

    const search_QRY_BANK = (argData, argOpKind) => {
        var tObj = {};
        tObj.BANK_CD = argData.trim();

        // 2
        serviceS0702_DEBIT_NOTE.mgrQuery_QRY_BANK(tObj).then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                if (data.length > 0) {
                    setDatasEDT_KSV_INVOICE_MST1_BANK_CD(data);
                    if (data.length > 1)
                        setDataEDT_KSV_INVOICE_MST1_BANK_CD(data[1]);
                    else setDataEDT_KSV_INVOICE_MST1_BANK_CD(data[0]);
                }
            } else {
            }
        });
    };

    const search_LIST_1 = () => {
        var tObj = { ...dataQRY_KSV_INVOICE_MST };

        Object.keys(tObj).forEach((col, i) => {
            if (tObj[`${col}`] === null || tObj[`${col}`] === " ") {
                tObj[`${col}`] = "";
            }
        });

        setDatasTBL_KSV_INVOICE_MST([]);
        // setSelectedTBL_KSV_INVOICE_MST([]);

        // 2
        setLoadingTBL_KSV_INVOICE_MST(true);
        serviceS0702_DEBIT_NOTE.mgrQuery_LIST_1(tObj).then((data) => {
            setLoadingTBL_KSV_INVOICE_MST(false);
            if (typeof data.graphQLErrors === "undefined") {
                console.log(
                    "ServiceMgrKCD_BUYER.mgr1KcdStyle call => " + data.length,
                );
                var tArray = data.map((col, i) => {
                    var tObj = { ...col };
                    tObj.id = i + 1;
                    return tObj;
                });
                setDatasTBL_KSV_INVOICE_MST(tArray);
                setDataETC_END_AMT_SUM(0);
            } else {
                console.log(
                    "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });
    };

    const search_LIST_1_BY_NUMBER = (argKind) => {
        var tObj = { ...dataQRY_KSV_INVOICE_MST1 };

        if (argKind && argKind.DEBIT_NO) {
            tObj.DEBIT_NO = argKind.DEBIT_NO;
        }

        setDatasTBL_KSV_INVOICE_MST([]);
        // setSelectedTBL_KSV_INVOICE_MST([]);

        // 2
        setLoadingTBL_KSV_INVOICE_MST(true);
        serviceS0702_DEBIT_NOTE.mgrQuery_LIST_1_BY_NUMBER(tObj).then((data) => {
            setLoadingTBL_KSV_INVOICE_MST(false);
            if (typeof data.graphQLErrors === "undefined") {
                console.log(
                    "ServiceMgrKCD_BUYER.mgr1KcdStyle call => " + data.length,
                );
                if (!Array.isArray(data) || data.length === 0) {
                    setDatasTBL_KSV_INVOICE_MST1([]);
                    setDataTBL_KSV_INVOICE_MST(null);
                    setDataEDT_KSV_INVOICE_MST1(emptyEDT_KSV_INVOICE_MST1);
                    setDataEDT_KSV_INVOICE_MST2(emptyEDT_KSV_INVOICE_MST1);
                    setDataETC_BAL("");
                    setDataETC_END_AMT_SUM(0);
                    setDataETC_CONF_USER("");
                    return;
                }
                var tArray = data.map((col, i) => {
                    var tObj = { ...col };
                    tObj.id = i + 1;
                    return tObj;
                });
                setDatasTBL_KSV_INVOICE_MST(tArray);
                onRowClick1TBL_KSV_INVOICE_MST(tArray[0]);
            } else {
                console.log(
                    "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });
    };

    const search_LIST_2 = (argData) => {
        var tObj = {};
        tObj.CRDB_CD = argData.CRDB_CD;

        const parseAmt = (value) => {
            if (value === null || typeof value === "undefined") return 0;
            const num = parseFloat(String(value).replace(/,/g, ""));
            return Number.isFinite(num) ? num : 0;
        };

        setDatasTBL_KSV_INVOICE_MST2([]);
        setSelectedTBL_KSV_INVOICE_MST2([]);

        setDataEDT_KSV_INVOICE_MST2_END_TYPE(
            datasEDT_KSV_INVOICE_MST2_END_TYPE[0],
        );

        // 2
        serviceS0702_DEBIT_NOTE.mgrQuery_LIST_2(tObj).then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                console.log(
                    "ServiceMgrKCD_BUYER.mgr1KcdStyle call => " + data.length,
                );
                var tArray = data.map((col, i) => {
                    var tObj = { ...col };
                    tObj.id = i + 1;
                    return tObj;
                });
                setDatasTBL_KSV_INVOICE_MST2(tArray);

                const totalAmt = parseAmt(argData.CRDB_AMT);
                const endAmtSum = tArray.reduce(
                    (acc, row) => acc + parseAmt(row.CRDB_AMT),
                    0,
                );
                setDataETC_END_AMT_SUM(endAmtSum);
                setDataETC_BAL(totalAmt - endAmtSum);
            } else {
                console.log(
                    "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });
    };

    /* QRY KSV_INVOICE_MST*/
    const [dataQRY_KSV_INVOICE_MST, setDataQRY_KSV_INVOICE_MST] = useState(
        emptyQRY_KSV_INVOICE_MST,
    );

    const onCalChangeQRY_KSV_INVOICE_MST_S_ISSUE_DATE = (e, name) => {
        let val1 = e.value || "";
        let val = "";
        if (val1 === "") {
            val = "";
        } else {
            val = getDateVal(val1);
        }

        let _dataQRY_KSV_INVOICE_MST = { ...dataQRY_KSV_INVOICE_MST };
        _dataQRY_KSV_INVOICE_MST[`${name}`] = val;
        setDataQRY_KSV_INVOICE_MST(_dataQRY_KSV_INVOICE_MST);
    };

    const onCalChangeQRY_KSV_INVOICE_MST_E_ISSUE_DATE = (e, name) => {
        let val1 = e.value || "";
        let val = "";
        if (val1 === "") {
            val = "";
        } else {
            val = getDateVal(val1);
        }

        let _dataQRY_KSV_INVOICE_MST = { ...dataQRY_KSV_INVOICE_MST };
        _dataQRY_KSV_INVOICE_MST[`${name}`] = val;
        setDataQRY_KSV_INVOICE_MST(_dataQRY_KSV_INVOICE_MST);
    };

    const [
        datasQRY_KSV_INVOICE_MST_PAY_TO,
        setDatasQRY_KSV_INVOICE_MST_PAY_TO,
    ] = useState([]);
    const [dataQRY_KSV_INVOICE_MST_PAY_TO, setDataQRY_KSV_INVOICE_MST_PAY_TO] =
        useState({});

    const onDropdownChangeQRY_KSV_INVOICE_MST_PAY_TO = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataQRY_KSV_INVOICE_MST = { ...dataQRY_KSV_INVOICE_MST };

        let tTypeVal = _dataQRY_KSV_INVOICE_MST[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_INVOICE_MST[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_INVOICE_MST[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_INVOICE_MST(_dataQRY_KSV_INVOICE_MST);
        setDataQRY_KSV_INVOICE_MST_PAY_TO(e.value);
    };

    const [
        datasQRY_KSV_INVOICE_MST_BILL_TO,
        setDatasQRY_KSV_INVOICE_MST_BILL_TO,
    ] = useState([]);
    const [
        dataQRY_KSV_INVOICE_MST_BILL_TO,
        setDataQRY_KSV_INVOICE_MST_BILL_TO,
    ] = useState({});

    const onDropdownChangeQRY_KSV_INVOICE_MST_BILL_TO = (e, name) => {
        let val = (e.value && e.value.COM_CD) || "";

        let _dataQRY_KSV_INVOICE_MST = { ...dataQRY_KSV_INVOICE_MST };

        let tTypeVal = _dataQRY_KSV_INVOICE_MST[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_INVOICE_MST[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_INVOICE_MST[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_INVOICE_MST(_dataQRY_KSV_INVOICE_MST);
        setDataQRY_KSV_INVOICE_MST_BILL_TO(e.value);
    };

    const [
        datasQRY_KSV_INVOICE_MST_CHARGER,
        setDatasQRY_KSV_INVOICE_MST_CHARGER,
    ] = useState([]);
    const [
        dataQRY_KSV_INVOICE_MST_CHARGER,
        setDataQRY_KSV_INVOICE_MST_CHARGER,
    ] = useState({});

    const onDropdownChangeQRY_KSV_INVOICE_MST_CHARGER = (e, name) => {
        let val = (e.value && e.value.USER_ID) || "";

        let _dataQRY_KSV_INVOICE_MST = { ...dataQRY_KSV_INVOICE_MST };

        let tTypeVal = _dataQRY_KSV_INVOICE_MST[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_INVOICE_MST[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_INVOICE_MST[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_INVOICE_MST(_dataQRY_KSV_INVOICE_MST);
        setDataQRY_KSV_INVOICE_MST_CHARGER(e.value);
    };

    const [
        datasQRY_KSV_INVOICE_MST_STATUS_CD,
        setDatasQRY_KSV_INVOICE_MST_STATUS_CD,
    ] = useState([]);
    const [
        dataQRY_KSV_INVOICE_MST_STATUS_CD,
        setDataQRY_KSV_INVOICE_MST_STATUS_CD,
    ] = useState({});

    const onDropdownChangeQRY_KSV_INVOICE_MST_STATUS_CD = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataQRY_KSV_INVOICE_MST = { ...dataQRY_KSV_INVOICE_MST };

        let tTypeVal = _dataQRY_KSV_INVOICE_MST[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_INVOICE_MST[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_INVOICE_MST[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_INVOICE_MST(_dataQRY_KSV_INVOICE_MST);
        setDataQRY_KSV_INVOICE_MST_STATUS_CD(e.value);
    };

    const onInputChangeQRY_KSV_INVOICE_MST_TITLE = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_INVOICE_MST = { ...dataQRY_KSV_INVOICE_MST };

        let tTypeVal = _dataQRY_KSV_INVOICE_MST[`${name}`];
        if (typeof tTypeVal === "string")
            _dataQRY_KSV_INVOICE_MST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_INVOICE_MST[`${name}`] = parseInt(val);

        setDataQRY_KSV_INVOICE_MST(_dataQRY_KSV_INVOICE_MST);
    };

    const [
        datasQRY_KSV_INVOICE_MST_BUYER_CD,
        setDatasQRY_KSV_INVOICE_MST_BUYER_CD,
    ] = useState([]);
    const [
        dataQRY_KSV_INVOICE_MST_BUYER_CD,
        setDataQRY_KSV_INVOICE_MST_BUYER_CD,
    ] = useState({});

    const onDropdownChangeQRY_KSV_INVOICE_MST_BUYER_CD = (e, name) => {
        let val = (e.value && e.value.BUYER_CD) || "";

        let _dataQRY_KSV_INVOICE_MST = { ...dataQRY_KSV_INVOICE_MST };

        let tTypeVal = _dataQRY_KSV_INVOICE_MST[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_INVOICE_MST[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_INVOICE_MST[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_INVOICE_MST(_dataQRY_KSV_INVOICE_MST);
        setDataQRY_KSV_INVOICE_MST_BUYER_CD(e.value);
    };

    const [
        datasQRY_KSV_INVOICE_MST_DEBIT_TYPE,
        setDatasQRY_KSV_INVOICE_MST_DEBIT_TYPE,
    ] = useState([]);
    const [
        dataQRY_KSV_INVOICE_MST_DEBIT_TYPE,
        setDataQRY_KSV_INVOICE_MST_DEBIT_TYPE,
    ] = useState({});

    const onDropdownChangeQRY_KSV_INVOICE_MST_DEBIT_TYPE = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataQRY_KSV_INVOICE_MST = { ...dataQRY_KSV_INVOICE_MST };

        let tTypeVal = _dataQRY_KSV_INVOICE_MST[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_INVOICE_MST[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_INVOICE_MST[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_INVOICE_MST(_dataQRY_KSV_INVOICE_MST);
        setDataQRY_KSV_INVOICE_MST_DEBIT_TYPE(e.value);
    };

    /* QRY KSV_INVOICE_MST1*/
    const [dataQRY_KSV_INVOICE_MST1, setDataQRY_KSV_INVOICE_MST1] = useState(
        emptyQRY_KSV_INVOICE_MST1,
    );

    const onInputChangeQRY_KSV_INVOICE_MST1_DEBIT_NO = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_INVOICE_MST1 = { ...dataQRY_KSV_INVOICE_MST1 };

        let tTypeVal = _dataQRY_KSV_INVOICE_MST1[`${name}`];
        if (typeof tTypeVal === "string")
            _dataQRY_KSV_INVOICE_MST1[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_INVOICE_MST1[`${name}`] = parseInt(val);

        setDataQRY_KSV_INVOICE_MST1(_dataQRY_KSV_INVOICE_MST1);
    };

    const onInputChangeQRY_KSV_INVOICE_MST1_PO_CD = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_INVOICE_MST1 = { ...dataQRY_KSV_INVOICE_MST1 };

        let tTypeVal = _dataQRY_KSV_INVOICE_MST1[`${name}`];
        if (typeof tTypeVal === "string")
            _dataQRY_KSV_INVOICE_MST1[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_INVOICE_MST1[`${name}`] = parseInt(val);

        setDataQRY_KSV_INVOICE_MST1(_dataQRY_KSV_INVOICE_MST1);
    };

    const onInputChangeQRY_KSV_INVOICE_MST1_ORDER_CD = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_INVOICE_MST1 = { ...dataQRY_KSV_INVOICE_MST1 };

        let tTypeVal = _dataQRY_KSV_INVOICE_MST1[`${name}`];
        if (typeof tTypeVal === "string")
            _dataQRY_KSV_INVOICE_MST1[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_INVOICE_MST1[`${name}`] = parseInt(val);

        setDataQRY_KSV_INVOICE_MST1(_dataQRY_KSV_INVOICE_MST1);
    };

    /**TABLE KSV_INVOICE_MST */
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
    const [loadingTBL_KSV_INVOICE_MST, setLoadingTBL_KSV_INVOICE_MST] =
        useState(false);

    // DATAGRID CODE : TBL_KSV_INVOICE_MST

    const onRowClick1TBL_KSV_INVOICE_MST = (argData0) => {
        var argData = {};

        if (typeof argData0?.length !== "undefined") {
            argData = argData0[0];
        } else {
            argData = argData0;
        }

        if (!argData) {
            setDataTBL_KSV_INVOICE_MST(null);
            setDatasTBL_KSV_INVOICE_MST1([]);
            setDataEDT_KSV_INVOICE_MST1(emptyEDT_KSV_INVOICE_MST1);
            setDataEDT_KSV_INVOICE_MST2(emptyEDT_KSV_INVOICE_MST1);
            setDataETC_BAL("");
            setDataETC_CONF_USER("");
            return;
        }

        let argTBL_KSV_INVOICE_MST = argData;

        setDataTBL_KSV_INVOICE_MST(argTBL_KSV_INVOICE_MST);

        datasetEDT_KSV_INVOICE_MST1(argData);

        var tObj = { ...dataEDT_KSV_INVOICE_MST2 };
        tObj.AMT = String(argData.CRDB_AMT);
        setDataEDT_KSV_INVOICE_MST2(tObj);

        search_LIST_2(argData);

        var tArray = [];
        var tObj2 = {};
        tObj2.CURR_CD = argData.CURR_CD;
        tObj2.AMOUNT = argData.CRDB_AMT;
        if (argData.CURR_CD === "USD") tObj2.AMT_USD = argData.CRDB_AMT;
        else
            tObj2.AMT_USD = String(
                parseFloat(argData.CRDB_AMT) * parseFloat(argData.USD_RATE),
            );
        tArray.push(tObj2);
        setDatasTBL_KSV_INVOICE_MST1(tArray);

        setDataETC_BAL("");
        setDataETC_END_AMT_SUM(0);
        setDataETC_CONF_USER(argData.CONF_USER || "");
    };

    const onRowClickTBL_KSV_INVOICE_MST = (event) => {
        let argTBL_KSV_INVOICE_MST = event.data;
        if (flagSelectModeTBL_KSV_INVOICE_MST) return;

        // Service : NawooAll:mgrQueryTBL_KSV_INVOICE_MST
    };

    const exportExcelTBL_KSV_INVOICE_MST = async () => {
        const parseNumber = (value) => {
            if (value === null || typeof value === "undefined") return 0;
            const num = Number(String(value).replace(/,/g, ""));
            return Number.isFinite(num) ? num : 0;
        };

        const parseYYYYMMDD = (value) => {
            const raw = String(value || "").replace(/[^0-9]/g, "");
            if (raw.length !== 8) return "";
            const y = parseInt(raw.substring(0, 4), 10);
            const m = parseInt(raw.substring(4, 6), 10);
            const d = parseInt(raw.substring(6, 8), 10);
            if (!y || !m || !d) return "";
            return new Date(y, m - 1, d);
        };

        const ExcelJS = (await import("exceljs")).default;
        const fileSaverModule = await import("file-saver");
        const saveAs = fileSaverModule && fileSaverModule.default;
        if (!saveAs) return;

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("Debit_Note_List");

        worksheet.columns = [
            { header: "Team", key: "team", width: 10 },
            { header: "Number", key: "number", width: 14 },
            { header: "Seq", key: "seq", width: 8 },
            { header: "Date of Issue", key: "dateOfIssue", width: 14 },
            { header: "Bill To", key: "billTo", width: 22 },
            { header: "Pay Amt", key: "payAmt", width: 14 },
            { header: "Balance", key: "balance", width: 14 },
            { header: "Curr", key: "curr", width: 8 },
            { header: "Usd bal", key: "usdBal", width: 14 },
            { header: "Title", key: "title", width: 24 },
            { header: "Charger", key: "charger", width: 14 },
            { header: "Exp Date", key: "expDate", width: 14 },
            { header: "Remark", key: "remark", width: 24 },
            { header: "Status", key: "status", width: 12 },
            { header: "GW Status", key: "gwStatus", width: 14 },
            { header: "PO", key: "po", width: 14 },
            { header: "Order", key: "order", width: 14 },
            { header: "Bank", key: "bank", width: 12 },
            { header: "Messer", key: "messer", width: 14 },
            { header: "Status Cd", key: "statusCd", width: 12 },
            { header: "Buyer Cd", key: "buyerCd", width: 12 },
            { header: "Buyer", key: "buyer", width: 20 },
            { header: "Payment", key: "payment", width: 20 },
            { header: "End User", key: "endUser", width: 14 },
            { header: "Reg User", key: "regUser", width: 14 },
            { header: "Debit Type", key: "debitType", width: 14 },
            { header: "Conf User", key: "confUser", width: 14 },
            { header: "Vat", key: "vat", width: 14 },
        ];

        datasTBL_KSV_INVOICE_MST.forEach((col) => {
            const issueDate = parseYYYYMMDD(col.CRDB_DATE);
            const expDate = parseYYYYMMDD(col.END_DATE);

            const row = worksheet.addRow({
                team: col.CHARGER_TEAM || "",
                number: col.CRDB_CD || "",
                seq: parseNumber(col.CRDB_SEQ),
                dateOfIssue: issueDate || "",
                billTo: col.MESSER || "",
                payAmt: parseNumber(col.CRDB_AMT),
                balance: parseNumber(col.BALANCE),
                curr: col.CURR_CD || "",
                usdBal: parseNumber(col.USD_BAL),
                title: col.TITLE || "",
                charger: col.CHARGER || "",
                expDate: expDate || "",
                remark: col.REMARK || "",
                status: col.STATUS || "",
                gwStatus: col.GW_STATUS || "",
                po: col.PO_CD || "",
                order: col.ORDER_CD || "",
                bank: col.BANK_CD || "",
                messer: col.MESSER_CD || "",
                statusCd: col.STATUS_CD || "",
                buyerCd: col.BUYER_CD || "",
                buyer: col.BUYER_NAME || "",
                payment: col.PAYMENT_PLAN || "",
                endUser: col.END_USER || "",
                regUser: col.REG_USER || "",
                debitType: col.DEBIT_TYPE_NAME || "",
                confUser: col.CONF_USER || "",
                vat: parseNumber(col.VAT),
            });

            row.getCell("dateOfIssue").numFmt = "yyyy-mm-dd";
            row.getCell("expDate").numFmt = "yyyy-mm-dd";
            row.getCell("seq").numFmt = "0";
            row.getCell("payAmt").numFmt = "#,##0.00";
            row.getCell("balance").numFmt = "#,##0.00";
            row.getCell("usdBal").numFmt = "#,##0.00";
            row.getCell("vat").numFmt = "#,##0.00";
        });

        const headerRow = worksheet.getRow(1);
        headerRow.eachCell((cell) => {
            cell.font = { bold: true };
            cell.fill = {
                type: "pattern",
                pattern: "solid",
                fgColor: { argb: "FFFFF2CC" },
            };
            cell.border = {
                top: { style: "thin", color: { argb: "FFBFBFBF" } },
                left: { style: "thin", color: { argb: "FFBFBFBF" } },
                bottom: { style: "thin", color: { argb: "FFBFBFBF" } },
                right: { style: "thin", color: { argb: "FFBFBFBF" } },
            };
        });

        worksheet.eachRow((row, rowNumber) => {
            if (rowNumber === 1) return;
            row.eachCell((cell) => {
                cell.border = {
                    top: { style: "thin", color: { argb: "FFBFBFBF" } },
                    left: { style: "thin", color: { argb: "FFBFBFBF" } },
                    bottom: { style: "thin", color: { argb: "FFBFBFBF" } },
                    right: { style: "thin", color: { argb: "FFBFBFBF" } },
                };
            });
        });

        const excelBuffer = await workbook.xlsx.writeBuffer();
        const data = new Blob([excelBuffer], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
        });
        saveAs(data, `Debit_Note_List_export_${new Date().getTime()}.xlsx`);
    };

    /**TABLE KSV_INVOICE_MST1 */
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

    /**TABLE KSV_INVOICE_MST2 */
    // DEFINE DATAGRID : TBL_KSV_INVOICE_MST2
    const [datasTBL_KSV_INVOICE_MST2, setDatasTBL_KSV_INVOICE_MST2] = useState(
        [],
    );
    const dt_TBL_KSV_INVOICE_MST2 = useRef(null);
    const [dataTBL_KSV_INVOICE_MST2, setDataTBL_KSV_INVOICE_MST2] = useState(
        emptyTBL_KSV_INVOICE_MST2,
    );
    const [selectedTBL_KSV_INVOICE_MST2, setSelectedTBL_KSV_INVOICE_MST2] =
        useState([]);
    const [
        flagSelectModeTBL_KSV_INVOICE_MST2,
        setFlagSelectModeTBL_KSV_INVOICE_MST2,
    ] = useState(false);
    const [loadingTBL_KSV_INVOICE_MST2, setLoadingTBL_KSV_INVOICE_MST2] =
        useState(false);

    // DATAGRID CODE : TBL_KSV_INVOICE_MST2

    const onRowClick1TBL_KSV_INVOICE_MST2 = (argData0) => {
        var argData = {};

        if (typeof argData0.length !== "undefined") {
            argData = argData0[0];
        } else {
            argData = argData0;
        }

        var tObj = { ...dataEDT_KSV_INVOICE_MST2 };
        tObj.END_DATE = argData.END_DATE;
        tObj.END_TYPE = argData.END_TYPE;
        tObj.AMT = argData.CRDB_AMT;
        setDataEDT_KSV_INVOICE_MST2(tObj);
        editEDT_KSV_INVOICE_MST2_END_TYPE(tObj.END_TYPE);
    };

    const onRowClickTBL_KSV_INVOICE_MST2 = (event) => {
        let argTBL_KSV_INVOICE_MST2 = event.data;
        if (flagSelectModeTBL_KSV_INVOICE_MST2) return;

        // Service : NawooAll:mgrQueryTBL_KSV_INVOICE_MST2
    };

    /**EDIT KSV_INVOICE_MST1 */
    const [datasEDT_KSV_INVOICE_MST1, setDatasEDT_KSV_INVOICE_MST1] = useState(
        [],
    );
    const [dataEDT_KSV_INVOICE_MST1, setDataEDT_KSV_INVOICE_MST1] = useState(
        emptyEDT_KSV_INVOICE_MST1,
    );
    const [dataETC_BAL, setDataETC_BAL] = useState("");
    const [dataETC_END_AMT_SUM, setDataETC_END_AMT_SUM] = useState(0);
    const [dataETC_CONF_USER, setDataETC_CONF_USER] = useState("");
    const [dataETC_STATUS_DISPLAY, setDataETC_STATUS_DISPLAY] = useState("");

    const parseAmtValue = (value) => {
        if (value === null || typeof value === "undefined") return 0;
        const num = parseFloat(String(value).replace(/,/g, ""));
        return Number.isFinite(num) ? num : 0;
    };

    const isCurrentDebitRow = (rowData) => {
        if (!dataTBL_KSV_INVOICE_MST || !rowData) return false;

        const selectedCrdbCd = String(dataTBL_KSV_INVOICE_MST.CRDB_CD || "");
        const rowCrdbCd = String(rowData.CRDB_CD || "");
        if (selectedCrdbCd === "" || rowCrdbCd === "") return false;
        if (selectedCrdbCd !== rowCrdbCd) return false;

        const selectedSeq = dataTBL_KSV_INVOICE_MST.CRDB_SEQ;
        const rowSeq = rowData.CRDB_SEQ;
        if (typeof selectedSeq === "undefined" || typeof rowSeq === "undefined") {
            return true;
        }

        return String(selectedSeq) === String(rowSeq);
    };

    const getRowEndAmt = (rowData) => {
        return parseAmtValue(rowData.END_AMT);
    };

    const getRowAmtExVat = (rowData) => {
        const amt = parseAmtValue(rowData.CRDB_AMT);
        const vat = parseAmtValue(rowData.VAT);
        return amt - vat;
    };

    const getRowBalance = (rowData) => {
        const totalAmt = parseAmtValue(rowData.CRDB_AMT);
        return totalAmt - parseAmtValue(rowData.END_AMT);
    };

    const datasetEDT_KSV_INVOICE_MST1 = (argData) => {
        var _argData = { ...dataEDT_KSV_INVOICE_MST1 };
        if (!argData) {
            setDataEDT_KSV_INVOICE_MST1(emptyEDT_KSV_INVOICE_MST1);
            return;
        }
        const safeArgData = argData || {};
        const rowPayAmt =
            parseFloat(String(safeArgData.CRDB_AMT || 0).replace(/,/g, "")) || 0;
        _argData.DEBIT_NO = safeArgData.CRDB_CD;
        _argData.BUYER_CD = safeArgData.BUYER_CD;
        _argData.STATUS_CD = safeArgData.STATUS_CD;
        _argData.DATE_OF_ISSUE = safeArgData.CRDB_DATE;
        _argData.LINK_TO = safeArgData.LINK_TO;
        _argData.DEBIT_TYPE = safeArgData.DEBIT_TYPE;
        _argData.PAY_TO = safeArgData.MESSER_CD;
        _argData.EXP_DATE = safeArgData.END_DATE;
        _argData.BANK_CD = safeArgData.BANK_CD;
        _argData.PAYMENT_PLAN = safeArgData.PAYMENT_PLAN;
        _argData.TITLE = safeArgData.TITLE;
        _argData.REMARK = safeArgData.REMARK;
        _argData.CHARGER = safeArgData.CHARGER;
        _argData.END_TYPE = safeArgData.END_TYPE;
        _argData.PAY_AMT = String(rowPayAmt);
        _argData.PAY_TYPE = "";
        _argData.PAY_CURR_CD = safeArgData.CURR_CD;
        _argData.VAT_AMT = safeArgData.VAT;
        _argData.PO_CD = safeArgData.PO_CD;
        _argData.ORDER_CD = safeArgData.ORDER_CD;
        _argData.GW_CODE = safeArgData.APPROKEY;
        setDataEDT_KSV_INVOICE_MST1(_argData);

        let tArray = [];
        let tObj = {};
        tObj.BUYER_CD = "";
        tObj.BUYER_NAME = " ";
        tArray.push(tObj);

        tObj = {};
        datasEDT_KSV_INVOICE_MST1_BUYER_CD.forEach((col, i) => {
            if (col.BUYER_CD === safeArgData.BUYER_CD) tObj = { ...col };
        });
        if (typeof tObj.BUYER_CD !== "undefined")
            setDataEDT_KSV_INVOICE_MST1_BUYER_CD(tObj);
        else
            setDataEDT_KSV_INVOICE_MST1_BUYER_CD(
                datasEDT_KSV_INVOICE_MST1_BUYER_CD[0],
            );

        tObj = {};
        datasEDT_KSV_INVOICE_MST1_PAY_TO.forEach((col, i) => {
            if (col.COM_CD === safeArgData.MESSER_CD) tObj = { ...col };
        });
        if (typeof tObj.COM_CD !== "undefined")
            setDataEDT_KSV_INVOICE_MST1_PAY_TO(tObj);
        else
            setDataEDT_KSV_INVOICE_MST1_PAY_TO(
                datasEDT_KSV_INVOICE_MST1_PAY_TO[0],
            );

        tObj = {};
        datasEDT_KSV_INVOICE_MST1_BANK_CD.forEach((col, i) => {
            if (col.BANK_CD === safeArgData.BANK_CD) tObj = { ...col };
        });
        if (typeof tObj.BANK_CD !== "undefined")
            setDataEDT_KSV_INVOICE_MST1_BANK_CD(tObj);
        else
            setDataEDT_KSV_INVOICE_MST1_BANK_CD(
                datasEDT_KSV_INVOICE_MST1_BANK_CD[0],
            );

        tObj = {};
        datasEDT_KSV_INVOICE_MST1_PO_CD.forEach((col, i) => {
            if (col.PO_CD === safeArgData.PO_CD) tObj = { ...col };
        });
        if (typeof tObj.PO_CD !== "undefined")
            setDataEDT_KSV_INVOICE_MST1_PO_CD(tObj);
        else
            setDataEDT_KSV_INVOICE_MST1_PO_CD(
                datasEDT_KSV_INVOICE_MST1_PO_CD[0],
            );

        tObj = {};
        datasEDT_KSV_INVOICE_MST1_ORDER_CD.forEach((col, i) => {
            if (col.ORDER_CD === safeArgData.ORDER_CD) tObj = { ...col };
        });
        if (typeof tObj.ORDER_CD !== "undefined")
            setDataEDT_KSV_INVOICE_MST1_ORDER_CD(tObj);
        else
            setDataEDT_KSV_INVOICE_MST1_ORDER_CD(
                datasEDT_KSV_INVOICE_MST1_ORDER_CD[0],
            );

        editEDT_KSV_INVOICE_MST1_STATUS_CD(argData.STATUS_CD, argData.STATUS);
        setDataETC_STATUS_DISPLAY(argData.STATUS || "");
        editEDT_KSV_INVOICE_MST1_LINK_TO(argData.LINK_TO);
        editEDT_KSV_INVOICE_MST1_DEBIT_TYPE(argData.DEBIT_TYPE);
        editEDT_KSV_INVOICE_MST1_END_TYPE(argData.END_TYPE);
        editEDT_KSV_INVOICE_MST1_PAY_CURR_CD(argData.CURR_CD);
    };

    const onInputChangeEDT_KSV_INVOICE_MST1_DEBIT_NO = (e, name) => {
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
        datasEDT_KSV_INVOICE_MST1_BUYER_CD,
        setDatasEDT_KSV_INVOICE_MST1_BUYER_CD,
    ] = useState([]);
    const [
        dataEDT_KSV_INVOICE_MST1_BUYER_CD,
        setDataEDT_KSV_INVOICE_MST1_BUYER_CD,
    ] = useState({});

    const onDropdownChangeEDT_KSV_INVOICE_MST1_BUYER_CD = (e, name) => {
        let val = (e.value && e.value.BUYER_CD) || "";

        let _dataEDT_KSV_INVOICE_MST1 = { ...dataEDT_KSV_INVOICE_MST1 };

        let tTypeVal = _dataEDT_KSV_INVOICE_MST1[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_KSV_INVOICE_MST1[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_KSV_INVOICE_MST1[`${name}`] = parseInt(val);
        }

        setDataEDT_KSV_INVOICE_MST1(_dataEDT_KSV_INVOICE_MST1);
        setDataEDT_KSV_INVOICE_MST1_BUYER_CD(e.value);

        search_CODE1(val);
    };

    const [
        datasEDT_KSV_INVOICE_MST1_STATUS_CD,
        setDatasEDT_KSV_INVOICE_MST1_STATUS_CD,
    ] = useState([]);
    const [
        dataEDT_KSV_INVOICE_MST1_STATUS_CD,
        setDataEDT_KSV_INVOICE_MST1_STATUS_CD,
    ] = useState({});

    const editEDT_KSV_INVOICE_MST1_STATUS_CD = (argValue, displayStatus) => {
        let matched = null;
        const cleanDisplayStatus = displayStatus ? String(displayStatus).trim() : "";

        // 먼저 CD_NAME(LABEL)으로 찾기 - displayStatus가 정확한 레이블이므로 우선
        if (cleanDisplayStatus) {
            matched = datasEDT_KSV_INVOICE_MST1_STATUS_CD.find(
                (val) => val.CD_NAME === cleanDisplayStatus,
            );
        }

        // CD_NAME으로 못 찾으면 CD_CODE로 찾기
        if (!matched && argValue) {
            matched = datasEDT_KSV_INVOICE_MST1_STATUS_CD.find(
                (val) => val.CD_CODE === argValue,
            );
        }

        if (matched) {
            setDataEDT_KSV_INVOICE_MST1_STATUS_CD(matched);
        } else if (argValue || cleanDisplayStatus) {
            setDataEDT_KSV_INVOICE_MST1_STATUS_CD({
                CD_CODE: argValue,
                CD_NAME: cleanDisplayStatus || argValue,
            });
        } else {
            setDataEDT_KSV_INVOICE_MST1_STATUS_CD({});
        }
    };

    const onDropdownChangeEDT_KSV_INVOICE_MST1_STATUS_CD = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataEDT_KSV_INVOICE_MST1 = { ...dataEDT_KSV_INVOICE_MST1 };

        let tTypeVal = _dataEDT_KSV_INVOICE_MST1[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_KSV_INVOICE_MST1[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_KSV_INVOICE_MST1[`${name}`] = parseInt(val);
        }

        setDataEDT_KSV_INVOICE_MST1(_dataEDT_KSV_INVOICE_MST1);
        setDataEDT_KSV_INVOICE_MST1_STATUS_CD(e.value);
    };

    const [
        datasEDT_KSV_INVOICE_MST1_PAY_CURR_CD,
        setDatasEDT_KSV_INVOICE_MST1_PAY_CURR_CD,
    ] = useState([]);
    const [
        dataEDT_KSV_INVOICE_MST1_PAY_CURR_CD,
        setDataEDT_KSV_INVOICE_MST1_PAY_CURR_CD,
    ] = useState({});

    const editEDT_KSV_INVOICE_MST1_PAY_CURR_CD = (argValue) => {
        let _dataEDT_KSV_INVOICE_MST1_PAY_CURR_CD =
            datasEDT_KSV_INVOICE_MST1_PAY_CURR_CD.filter(
                (val) => val.CD_CODE === argValue,
            );
        setDataEDT_KSV_INVOICE_MST1_PAY_CURR_CD(
            _dataEDT_KSV_INVOICE_MST1_PAY_CURR_CD[0],
        );
    };

    const onDropdownChangeEDT_KSV_INVOICE_MST1_PAY_CURR_CD = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataEDT_KSV_INVOICE_MST1 = { ...dataEDT_KSV_INVOICE_MST1 };

        let tTypeVal = _dataEDT_KSV_INVOICE_MST1[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_KSV_INVOICE_MST1[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_KSV_INVOICE_MST1[`${name}`] = parseInt(val);
        }

        setDataEDT_KSV_INVOICE_MST1(_dataEDT_KSV_INVOICE_MST1);
        setDataEDT_KSV_INVOICE_MST1_PAY_CURR_CD(e.value);
    };

    const onCalChangeEDT_KSV_INVOICE_MST1_DATE_OF_ISSUE = (e, name) => {
        let val1 = e.value || "";
        let val = "";
        if (val1 === "") {
            val = "";
        } else {
            val = getDateVal(val1);
        }

        let _dataEDT_KSV_INVOICE_MST1 = { ...dataEDT_KSV_INVOICE_MST1 };
        _dataEDT_KSV_INVOICE_MST1[`${name}`] = val;
        setDataEDT_KSV_INVOICE_MST1(_dataEDT_KSV_INVOICE_MST1);
    };

    const [
        datasEDT_KSV_INVOICE_MST1_LINK_TO,
        setDatasEDT_KSV_INVOICE_MST1_LINK_TO,
    ] = useState([]);
    const [
        dataEDT_KSV_INVOICE_MST1_LINK_TO,
        setDataEDT_KSV_INVOICE_MST1_LINK_TO,
    ] = useState({});

    const editEDT_KSV_INVOICE_MST1_LINK_TO = (argValue) => {
        let _dataEDT_KSV_INVOICE_MST1_LINK_TO =
            datasEDT_KSV_INVOICE_MST1_LINK_TO.filter(
                (val) => val.FACTORY_CD === argValue,
            );
        setDataEDT_KSV_INVOICE_MST1_LINK_TO(
            _dataEDT_KSV_INVOICE_MST1_LINK_TO[0],
        );
    };

    const onDropdownChangeEDT_KSV_INVOICE_MST1_LINK_TO = (e, name) => {
        let val = (e.value && e.value.FACTORY_CD) || "";

        let _dataEDT_KSV_INVOICE_MST1 = { ...dataEDT_KSV_INVOICE_MST1 };

        let tTypeVal = _dataEDT_KSV_INVOICE_MST1[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_KSV_INVOICE_MST1[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_KSV_INVOICE_MST1[`${name}`] = parseInt(val);
        }

        setDataEDT_KSV_INVOICE_MST1(_dataEDT_KSV_INVOICE_MST1);
        setDataEDT_KSV_INVOICE_MST1_LINK_TO(e.value);
    };

    const [
        datasEDT_KSV_INVOICE_MST1_DEBIT_TYPE,
        setDatasEDT_KSV_INVOICE_MST1_DEBIT_TYPE,
    ] = useState([]);
    const [
        dataEDT_KSV_INVOICE_MST1_DEBIT_TYPE,
        setDataEDT_KSV_INVOICE_MST1_DEBIT_TYPE,
    ] = useState({});

    const editEDT_KSV_INVOICE_MST1_DEBIT_TYPE = (argValue) => {
        let _dataEDT_KSV_INVOICE_MST1_DEBIT_TYPE =
            datasEDT_KSV_INVOICE_MST1_DEBIT_TYPE.filter(
                (val) => val.CD_CODE === argValue,
            );
        setDataEDT_KSV_INVOICE_MST1_DEBIT_TYPE(
            _dataEDT_KSV_INVOICE_MST1_DEBIT_TYPE[0],
        );
    };

    const onDropdownChangeEDT_KSV_INVOICE_MST1_DEBIT_TYPE = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataEDT_KSV_INVOICE_MST1 = { ...dataEDT_KSV_INVOICE_MST1 };

        let tTypeVal = _dataEDT_KSV_INVOICE_MST1[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_KSV_INVOICE_MST1[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_KSV_INVOICE_MST1[`${name}`] = parseInt(val);
        }

        setDataEDT_KSV_INVOICE_MST1(_dataEDT_KSV_INVOICE_MST1);
        setDataEDT_KSV_INVOICE_MST1_DEBIT_TYPE(e.value);
    };

    const [
        datasEDT_KSV_INVOICE_MST1_PAY_TO,
        setDatasEDT_KSV_INVOICE_MST1_PAY_TO,
    ] = useState([]);
    const [
        dataEDT_KSV_INVOICE_MST1_PAY_TO,
        setDataEDT_KSV_INVOICE_MST1_PAY_TO,
    ] = useState({});

    const onDropdownChangeEDT_KSV_INVOICE_MST1_PAY_TO = (e, name) => {
        let val = (e.value && e.value.COM_CD) || "";

        let _dataEDT_KSV_INVOICE_MST1 = { ...dataEDT_KSV_INVOICE_MST1 };

        let tTypeVal = _dataEDT_KSV_INVOICE_MST1[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_KSV_INVOICE_MST1[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_KSV_INVOICE_MST1[`${name}`] = parseInt(val);
        }

        setDataEDT_KSV_INVOICE_MST1(_dataEDT_KSV_INVOICE_MST1);
        setDataEDT_KSV_INVOICE_MST1_PAY_TO(e.value);

        //search_BANK_BY_BILL_TO(e.value);
    };

    const onCalChangeEDT_KSV_INVOICE_MST1_EXP_DATE = (e, name) => {
        let val1 = e.value || "";
        let val = "";
        if (val1 === "") {
            val = "";
        } else {
            val = getDateVal(val1);
        }

        let _dataEDT_KSV_INVOICE_MST1 = { ...dataEDT_KSV_INVOICE_MST1 };
        _dataEDT_KSV_INVOICE_MST1[`${name}`] = val;
        setDataEDT_KSV_INVOICE_MST1(_dataEDT_KSV_INVOICE_MST1);
    };

    const [
        datasEDT_KSV_INVOICE_MST1_BANK_CD,
        setDatasEDT_KSV_INVOICE_MST1_BANK_CD,
    ] = useState([]);
    const [
        dataEDT_KSV_INVOICE_MST1_BANK_CD,
        setDataEDT_KSV_INVOICE_MST1_BANK_CD,
    ] = useState({});

    const onDropdownChangeEDT_KSV_INVOICE_MST1_BANK_CD = (e, name) => {
        let val = (e.value && e.value.BANK_CD) || "";

        let _dataEDT_KSV_INVOICE_MST1 = { ...dataEDT_KSV_INVOICE_MST1 };

        let tTypeVal = _dataEDT_KSV_INVOICE_MST1[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_KSV_INVOICE_MST1[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_KSV_INVOICE_MST1[`${name}`] = parseInt(val);
        }

        setDataEDT_KSV_INVOICE_MST1(_dataEDT_KSV_INVOICE_MST1);
        setDataEDT_KSV_INVOICE_MST1_BANK_CD(e.value);
    };

    const onInputChangeEDT_KSV_INVOICE_MST1_PAYMENT_PLAN = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_INVOICE_MST1 = { ...dataEDT_KSV_INVOICE_MST1 };

        let tTypeVal = _dataEDT_KSV_INVOICE_MST1[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_INVOICE_MST1[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_INVOICE_MST1[`${name}`] = parseInt(val);

        setDataEDT_KSV_INVOICE_MST1(_dataEDT_KSV_INVOICE_MST1);
    };

    const onInputChangeEDT_KSV_INVOICE_MST1_TITLE = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_INVOICE_MST1 = { ...dataEDT_KSV_INVOICE_MST1 };

        let tTypeVal = _dataEDT_KSV_INVOICE_MST1[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_INVOICE_MST1[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_INVOICE_MST1[`${name}`] = parseInt(val);

        setDataEDT_KSV_INVOICE_MST1(_dataEDT_KSV_INVOICE_MST1);
    };

    const onInputChangeEDT_KSV_INVOICE_MST1_REMARK = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_INVOICE_MST1 = { ...dataEDT_KSV_INVOICE_MST1 };

        let tTypeVal = _dataEDT_KSV_INVOICE_MST1[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_INVOICE_MST1[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_INVOICE_MST1[`${name}`] = parseInt(val);

        setDataEDT_KSV_INVOICE_MST1(_dataEDT_KSV_INVOICE_MST1);
    };

    const onInputChangeEDT_KSV_INVOICE_MST1_CHARGER = (e, name) => {
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
        datasEDT_KSV_INVOICE_MST1_END_TYPE,
        setDatasEDT_KSV_INVOICE_MST1_END_TYPE,
    ] = useState([]);
    const [
        dataEDT_KSV_INVOICE_MST1_END_TYPE,
        setDataEDT_KSV_INVOICE_MST1_END_TYPE,
    ] = useState({});

    const editEDT_KSV_INVOICE_MST1_END_TYPE = (argValue) => {
        let _dataEDT_KSV_INVOICE_MST1_END_TYPE =
            datasEDT_KSV_INVOICE_MST1_END_TYPE.filter(
                (val) => val.CD_CODE === argValue,
            );
        setDataEDT_KSV_INVOICE_MST1_END_TYPE(
            _dataEDT_KSV_INVOICE_MST1_END_TYPE[0],
        );
    };

    const onDropdownChangeEDT_KSV_INVOICE_MST1_END_TYPE = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataEDT_KSV_INVOICE_MST1 = { ...dataEDT_KSV_INVOICE_MST1 };

        let tTypeVal = _dataEDT_KSV_INVOICE_MST1[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_KSV_INVOICE_MST1[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_KSV_INVOICE_MST1[`${name}`] = parseInt(val);
        }

        // alert(`${name}:${val}`);

        setDataEDT_KSV_INVOICE_MST1(_dataEDT_KSV_INVOICE_MST1);
        setDataEDT_KSV_INVOICE_MST1_END_TYPE(e.value);
    };

    const onInputChangeEDT_KSV_INVOICE_MST1_PAY_AMT = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_INVOICE_MST1 = { ...dataEDT_KSV_INVOICE_MST1 };

        let tTypeVal = _dataEDT_KSV_INVOICE_MST1[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_INVOICE_MST1[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_INVOICE_MST1[`${name}`] = parseInt(val);

        setDataEDT_KSV_INVOICE_MST1(_dataEDT_KSV_INVOICE_MST1);
    };

    const onInputChangeEDT_KSV_INVOICE_MST1_PAY_AMT_EX_VAT = (e, name) => {
        let val =
            typeof e?.value !== "undefined"
                ? e.value
                : (e.target && e.target.value) || "";

        let _dataEDT_KSV_INVOICE_MST1 = { ...dataEDT_KSV_INVOICE_MST1 };
        const amtVal = parseFloat(String(val ?? "").replace(/,/g, "")) || 0;
        const vatVal =
            parseFloat(
                String(_dataEDT_KSV_INVOICE_MST1.VAT_AMT || 0).replace(
                    /,/g,
                    "",
                ),
            ) || 0;

        let tTypeVal = _dataEDT_KSV_INVOICE_MST1[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_INVOICE_MST1[`${name}`] = String(amtVal + vatVal);
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_INVOICE_MST1[`${name}`] = amtVal + vatVal;

        setDataEDT_KSV_INVOICE_MST1(_dataEDT_KSV_INVOICE_MST1);
    };

    const [
        datasEDT_KSV_INVOICE_MST1_PAY_TYPE,
        setDatasEDT_KSV_INVOICE_MST1_PAY_TYPE,
    ] = useState([]);
    const [
        dataEDT_KSV_INVOICE_MST1_PAY_TYPE,
        setDataEDT_KSV_INVOICE_MST1_PAY_TYPE,
    ] = useState({});

    const onDropdownChangeEDT_KSV_INVOICE_MST1_PAY_TYPE = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataEDT_KSV_INVOICE_MST1 = { ...dataEDT_KSV_INVOICE_MST1 };

        let tTypeVal = _dataEDT_KSV_INVOICE_MST1[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_KSV_INVOICE_MST1[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_KSV_INVOICE_MST1[`${name}`] = parseInt(val);
        }

        setDataEDT_KSV_INVOICE_MST1(_dataEDT_KSV_INVOICE_MST1);
        setDataEDT_KSV_INVOICE_MST1_PAY_TYPE(e.value);
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

    const [
        datasEDT_KSV_INVOICE_MST1_PO_CD,
        setDatasEDT_KSV_INVOICE_MST1_PO_CD,
    ] = useState([]);
    const [dataEDT_KSV_INVOICE_MST1_PO_CD, setDataEDT_KSV_INVOICE_MST1_PO_CD] =
        useState({});

    const onDropdownChangeEDT_KSV_INVOICE_MST1_PO_CD = (e, name) => {
        let val = (e.value && e.value.PO_CD) || "";

        let _dataEDT_KSV_INVOICE_MST1 = { ...dataEDT_KSV_INVOICE_MST1 };

        let tTypeVal = _dataEDT_KSV_INVOICE_MST1[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_KSV_INVOICE_MST1[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_KSV_INVOICE_MST1[`${name}`] = parseInt(val);
        }

        setDataEDT_KSV_INVOICE_MST1(_dataEDT_KSV_INVOICE_MST1);
        setDataEDT_KSV_INVOICE_MST1_PO_CD(e.value);
    };

    const [
        datasEDT_KSV_INVOICE_MST1_ORDER_CD,
        setDatasEDT_KSV_INVOICE_MST1_ORDER_CD,
    ] = useState([]);
    const [
        dataEDT_KSV_INVOICE_MST1_ORDER_CD,
        setDataEDT_KSV_INVOICE_MST1_ORDER_CD,
    ] = useState({});

    const onDropdownChangeEDT_KSV_INVOICE_MST1_ORDER_CD = (e, name) => {
        let val = (e.value && e.value.ORDER_CD) || "";

        let _dataEDT_KSV_INVOICE_MST1 = { ...dataEDT_KSV_INVOICE_MST1 };

        let tTypeVal = _dataEDT_KSV_INVOICE_MST1[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_KSV_INVOICE_MST1[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_KSV_INVOICE_MST1[`${name}`] = parseInt(val);
        }

        setDataEDT_KSV_INVOICE_MST1(_dataEDT_KSV_INVOICE_MST1);
        setDataEDT_KSV_INVOICE_MST1_ORDER_CD(e.value);
    };

    const onInputChangeEDT_KSV_INVOICE_MST1_GW_CODE = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_INVOICE_MST1 = { ...dataEDT_KSV_INVOICE_MST1 };

        let tTypeVal = _dataEDT_KSV_INVOICE_MST1[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_INVOICE_MST1[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_INVOICE_MST1[`${name}`] = parseInt(val);

        setDataEDT_KSV_INVOICE_MST1(_dataEDT_KSV_INVOICE_MST1);
    };

    const search_CODE_RESET = () => {
        var _tObj = {};
        _tObj.USER_ID = "";
        _tObj.COM_CD = "";
        _tObj.BUYER_CD = "";
        _tObj.BANK_CD = "";
        _tObj.PO_CD = "";
        _tObj.ORDER_CD = "";

        var argMode = "";

        setLoadingTBL_KSV_INVOICE_MST(true);
        serviceS0702_DEBIT_NOTE.mgrQuery_CODE(_tObj).then((data) => {
            setLoadingTBL_KSV_INVOICE_MST(false);
            if (typeof data.graphQLErrors === "undefined") {
                console.log(data);

                if (argMode === "") {
                    setDatasQRY_KSV_INVOICE_MST_PAY_TO(data.DEBIT_TYPE);
                    setDataQRY_KSV_INVOICE_MST_PAY_TO(data.DEBIT_TYPE[0]);

                    setDatasQRY_KSV_INVOICE_MST_BILL_TO(data.MESSER);
                    setDataQRY_KSV_INVOICE_MST_BILL_TO(data.MESSER[0]);

                    setDatasQRY_KSV_INVOICE_MST_CHARGER(data.USER);
                    //setDataQRY_KSV_INVOICE_MST_CHARGER(data.USER[0]);

                    let searchString = serviceLib.getUserInfo().USER_ID; // 찾고 싶은 사용자 아이디

                    console.log(searchString);

                    // 특정 name을 가진 객체 찾기
                    let foundUser = data.USER.find(
                        (user) => user.USER_ID === searchString,
                    );
                    setDataQRY_KSV_INVOICE_MST_CHARGER(foundUser);
                    setDataQRY_KSV_INVOICE_MST((prev) => ({
                        ...prev,
                        CHARGER: (foundUser && foundUser.USER_ID) || '',
                    }));

                    setDatasQRY_KSV_INVOICE_MST_STATUS_CD(data.DEBIT_STATUS);
                    setDataQRY_KSV_INVOICE_MST_STATUS_CD(data.DEBIT_STATUS[0]);

                    setDatasQRY_KSV_INVOICE_MST_BUYER_CD(data.BUYER3);
                    setDataQRY_KSV_INVOICE_MST_BUYER_CD(data.BUYER3[0]);

                    setDatasQRY_KSV_INVOICE_MST_DEBIT_TYPE(data.DEBIT_TYPE);
                    setDataQRY_KSV_INVOICE_MST_DEBIT_TYPE(data.DEBIT_TYPE[0]);

                    setDatasEDT_KSV_INVOICE_MST1_BUYER_CD(data.BUYER3);
                    setDataEDT_KSV_INVOICE_MST1_BUYER_CD(data.BUYER3[0]);

                    setDatasEDT_KSV_INVOICE_MST1_STATUS_CD(data.DEBIT_STATUS);
                    setDataEDT_KSV_INVOICE_MST1_STATUS_CD(data.DEBIT_STATUS[0]);

                    setDatasEDT_KSV_INVOICE_MST1_LINK_TO(data.FACTORY);
                    setDataEDT_KSV_INVOICE_MST1_LINK_TO(data.FACTORY[0]);

                    setDatasEDT_KSV_INVOICE_MST1_DEBIT_TYPE(data.DEBIT_TYPE);
                    setDataEDT_KSV_INVOICE_MST1_DEBIT_TYPE(data.DEBIT_TYPE[0]);

                    setDatasEDT_KSV_INVOICE_MST1_PAY_TO(data.MESSER);
                    setDataEDT_KSV_INVOICE_MST1_PAY_TO(data.MESSER[0]);

                    setDatasEDT_KSV_INVOICE_MST1_BANK_CD(data.BANK);
                    setDataEDT_KSV_INVOICE_MST1_BANK_CD(data.BANK[0]);

                    setDatasEDT_KSV_INVOICE_MST1_END_TYPE(data.CREDIT_END_TYPE);
                    setDataEDT_KSV_INVOICE_MST1_END_TYPE(
                        data.CREDIT_END_TYPE[0],
                    );

                    setDatasEDT_KSV_INVOICE_MST1_PAY_CURR_CD(data.CURR_CD);
                    setDataEDT_KSV_INVOICE_MST1_PAY_CURR_CD(data.CURR_CD[0]);

                    setDatasEDT_KSV_INVOICE_MST2_END_TYPE(data.CREDIT_END_TYPE);
                    setDataEDT_KSV_INVOICE_MST2_END_TYPE(
                        data.CREDIT_END_TYPE[0],
                    );

                    setDatasEDT_KSV_INVOICE_MST1_PO_CD(data.PO_CD);
                    setDataEDT_KSV_INVOICE_MST1_PO_CD(data.PO_CD[0]);

                    setDatasEDT_KSV_INVOICE_MST1_ORDER_CD(data.ORDER_CD);
                    setDataEDT_KSV_INVOICE_MST1_ORDER_CD(data.ORDER_CD[0]);

                    setDatasEDT_KSV_INVOICE_MST1_PAY_TYPE(data.PAY_TYPE);
                    setDataEDT_KSV_INVOICE_MST1_PAY_TYPE(data.PAY_TYPE[0]);
                }
            } else {
                console.log(
                    "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });
    };

    const process_RESET_EDT = () => {
        setDataEDT_KSV_INVOICE_MST1(emptyEDT_KSV_INVOICE_MST1);
        setDataETC_BAL("");
        setDataETC_END_AMT_SUM(0);
        setDataETC_CONF_USER("");
        setDataETC_STATUS_DISPLAY("");

        search_CODE_RESET();

        var tEdit2 = { ...dataEDT_KSV_INVOICE_MST2 };
        tEdit2.END_TYPE = "";
        tEdit2.END_DATE = "";
        tEdit2.AMT = "0";
        setDataEDT_KSV_INVOICE_MST2(tEdit2);
        setDataEDT_KSV_INVOICE_MST2_END_TYPE(
            datasEDT_KSV_INVOICE_MST2_END_TYPE[0],
        );

        setDatasTBL_KSV_INVOICE_MST2([]);
        setSelectedTBL_KSV_INVOICE_MST2([]);
    };

    /**EDIT KSV_INVOICE_MST2 */
    const [datasEDT_KSV_INVOICE_MST2, setDatasEDT_KSV_INVOICE_MST2] = useState(
        [],
    );
    const [dataEDT_KSV_INVOICE_MST2, setDataEDT_KSV_INVOICE_MST2] = useState(
        emptyEDT_KSV_INVOICE_MST2,
    );

    const [
        datasEDT_KSV_INVOICE_MST2_END_TYPE,
        setDatasEDT_KSV_INVOICE_MST2_END_TYPE,
    ] = useState([]);
    const [
        dataEDT_KSV_INVOICE_MST2_END_TYPE,
        setDataEDT_KSV_INVOICE_MST2_END_TYPE,
    ] = useState({});

    const editEDT_KSV_INVOICE_MST2_END_TYPE = (argValue) => {
        let _dataEDT_KSV_INVOICE_MST2_END_TYPE =
            datasEDT_KSV_INVOICE_MST2_END_TYPE.filter(
                (val) => val.CD_CODE === argValue,
            );
        setDataEDT_KSV_INVOICE_MST2_END_TYPE(
            _dataEDT_KSV_INVOICE_MST2_END_TYPE[0],
        );
    };

    const onDropdownChangeEDT_KSV_INVOICE_MST2_END_TYPE = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataEDT_KSV_INVOICE_MST2 = { ...dataEDT_KSV_INVOICE_MST2 };

        let tTypeVal = _dataEDT_KSV_INVOICE_MST2[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_KSV_INVOICE_MST2[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_KSV_INVOICE_MST2[`${name}`] = parseInt(val);
        }

        setDataEDT_KSV_INVOICE_MST2(_dataEDT_KSV_INVOICE_MST2);
        setDataEDT_KSV_INVOICE_MST2_END_TYPE(e.value);
    };

    const onCalChangeEDT_KSV_INVOICE_MST2_END_DATE = (e, name) => {
        let val1 = e.value || "";
        let val = "";
        if (val1 === "") {
            val = "";
        } else {
            val = getDateVal(val1);
        }

        let _dataEDT_KSV_INVOICE_MST2 = { ...dataEDT_KSV_INVOICE_MST2 };
        _dataEDT_KSV_INVOICE_MST2[`${name}`] = val;
        setDataEDT_KSV_INVOICE_MST2(_dataEDT_KSV_INVOICE_MST2);
    };

    const onInputChangeEDT_KSV_INVOICE_MST2_AMT = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_INVOICE_MST2 = { ...dataEDT_KSV_INVOICE_MST2 };

        let tTypeVal = _dataEDT_KSV_INVOICE_MST2[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_INVOICE_MST2[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_INVOICE_MST2[`${name}`] = parseInt(val);

        setDataEDT_KSV_INVOICE_MST2(_dataEDT_KSV_INVOICE_MST2);
    };

    //
    const onKeyPress_COMM_QRY = (e, name) => {
        if (e.key === "Enter") {
            search_COMM_QRY(e.target.value, name);
        }
    };

    const onKeyPress_COMM_EDT = (e, name) => {
        if (e.key === "Enter") {
            search_COMM_QRY(e.target.value, name);
        }
    };

    const search_COMM_QRY = (argData, argMode) => {
        var _tObj = {};
        _tObj.USER_ID = "";
        _tObj.COM_CD = "";
        _tObj.BUYER_CD = "";
        _tObj.BANK_CD = "";
        _tObj.PO_CD = "";
        _tObj.ORDER_CD = "";

        if (argMode === "COM_CD") {
            _tObj.COM_CD = argData.trim();
            search_CODE(_tObj, argMode);
        }
        if (argMode === "BUYER_CD") {
            _tObj.BUYER_CD = argData.trim();
            search_CODE(_tObj, argMode);
        }
        if (argMode === "BANK_CD") {
            _tObj.BANK_CD = argData.trim();
            search_CODE(_tObj, argMode);
        }
    };

    //

    useEffect(() => {
        let tParam = "";
        var tPoCd = "";
        var tOrderCd = "";

        var tUrls = window.location.href.split("?");
        if (tUrls.length <= 1) {
        } else {
            var tParams1 = tUrls[1].split("&");
            tParams1.forEach((col, i) => {
                var tObj = {};
                var tCols = col.split("=");
                if (tCols[0].includes("PO_CD")) {
                    tObj.key = tCols[0];
                    tObj.value = tCols[1];
                    tPoCd = tObj.value;
                }
                if (tCols[0].includes("ORDER_CD")) {
                    tObj.key = tCols[0];
                    tObj.value = tCols[1];
                    tOrderCd = tObj.value;
                }
            });
        }

        var tSaveObj = {};
        if (tPoCd !== "") {
            // PO_CD, ORDER_CD, CURR_CD, VENDOR_CD, VENDOR_NAME, TOT_AMT, STOCK_IDX
            tSaveObj = JSON.parse(
                window.localStorage.getItem("S0702_DEBIT_NOTE"),
            );
            console.log(tSaveObj);
            setSavePARAM(tSaveObj);
        }

        var _tObj = {};
        _tObj.USER_ID = serviceLib.getUserInfo().USER_ID;
        _tObj.BUYER_CD = "";
        if (
            typeof tSaveObj.BUYER_CD !== "undefined" &&
            tSaveObj.BUYER_CD !== ""
        )
            _tObj.BUYER_CD = tSaveObj.BUYER_CD;
        if (
            typeof tSaveObj.ORDER_CD !== "undefined" &&
            tSaveObj.ORDER_CD !== "" &&
            tSaveObj.ORDER_CD.length > 5
        )
            _tObj.BUYER_CD = tSaveObj.ORDER_CD.substring(0, 2);
        tSaveObj.BUYER_CD = _tObj.BUYER_CD;

        var tRetDate = serviceLib.getCurrDate().substring(0, 8);
        var tObj0 = { ...dataQRY_KSV_INVOICE_MST };
        // 작년 12월 1일
        const S_ISSUE_DATE = moment()
            .subtract(1, "years")
            .month(11)
            .date(1)
            .format("YYYYMMDD");
        // 올해 12월 말일
        const E_ISSUE_DATE = moment()
            .month(11)
            .endOf("month")
            .format("YYYYMMDD");

        tObj0.S_ISSUE_DATE = S_ISSUE_DATE;
        tObj0.E_ISSUE_DATE = E_ISSUE_DATE;
        setDataQRY_KSV_INVOICE_MST(tObj0);

        var _tObj = {};
        _tObj.USER_ID = "";
        _tObj.COM_CD = "";
        _tObj.BUYER_CD = "";
        _tObj.BANK_CD = "";
        _tObj.PO_CD = "";
        _tObj.ORDER_CD = "";

        var argMode = "";

        serviceS0702_DEBIT_NOTE.mgrQuery_CODE(_tObj).then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                console.log(data);

                if (argMode === "") {
                    setDatasQRY_KSV_INVOICE_MST_PAY_TO(data.DEBIT_TYPE);
                    setDataQRY_KSV_INVOICE_MST_PAY_TO(data.DEBIT_TYPE[0]);

                    setDatasQRY_KSV_INVOICE_MST_BILL_TO(data.MESSER);
                    setDataQRY_KSV_INVOICE_MST_BILL_TO(data.MESSER[0]);

                    setDatasQRY_KSV_INVOICE_MST_CHARGER(data.USER);
                    //setDataQRY_KSV_INVOICE_MST_CHARGER(data.USER[0]);

                    let searchString = serviceLib.getUserInfo().USER_ID; // 찾고 싶은 사용자 아이디

                    // 특정 name을 가진 객체 찾기
                    let foundUser = data.USER.find(
                        (user) => user.USER_ID === searchString,
                    );
                    setDataQRY_KSV_INVOICE_MST_CHARGER(foundUser);
                    setDataQRY_KSV_INVOICE_MST((prev) => ({
                        ...prev,
                        CHARGER: (foundUser && foundUser.USER_ID) || '',
                    }));

                    setDatasQRY_KSV_INVOICE_MST_STATUS_CD(data.DEBIT_STATUS);
                    setDataQRY_KSV_INVOICE_MST_STATUS_CD(data.DEBIT_STATUS[0]);

                    setDatasQRY_KSV_INVOICE_MST_BUYER_CD(data.BUYER3);
                    setDataQRY_KSV_INVOICE_MST_BUYER_CD(data.BUYER3[0]);

                    setDatasQRY_KSV_INVOICE_MST_DEBIT_TYPE(data.DEBIT_TYPE);
                    setDataQRY_KSV_INVOICE_MST_DEBIT_TYPE(data.DEBIT_TYPE[0]);

                    setDatasEDT_KSV_INVOICE_MST1_BUYER_CD(data.BUYER3);
                    setDataEDT_KSV_INVOICE_MST1_BUYER_CD(data.BUYER3[0]);

                    setDatasEDT_KSV_INVOICE_MST1_STATUS_CD(data.DEBIT_STATUS);
                    setDataEDT_KSV_INVOICE_MST1_STATUS_CD(data.DEBIT_STATUS[0]);

                    setDatasEDT_KSV_INVOICE_MST1_LINK_TO(data.FACTORY);
                    setDataEDT_KSV_INVOICE_MST1_LINK_TO(data.FACTORY[0]);

                    setDatasEDT_KSV_INVOICE_MST1_DEBIT_TYPE(data.DEBIT_TYPE);
                    setDataEDT_KSV_INVOICE_MST1_DEBIT_TYPE(data.DEBIT_TYPE[0]);

                    setDatasEDT_KSV_INVOICE_MST1_PAY_TO(data.MESSER);
                    setDataEDT_KSV_INVOICE_MST1_PAY_TO(data.MESSER[0]);

                    setDatasEDT_KSV_INVOICE_MST1_BANK_CD(data.BANK);
                    setDataEDT_KSV_INVOICE_MST1_BANK_CD(data.BANK[0]);

                    setDatasEDT_KSV_INVOICE_MST1_END_TYPE(data.CREDIT_END_TYPE);
                    setDataEDT_KSV_INVOICE_MST1_END_TYPE(
                        data.CREDIT_END_TYPE[0],
                    );

                    setDatasEDT_KSV_INVOICE_MST1_PAY_CURR_CD(data.CURR_CD);
                    setDataEDT_KSV_INVOICE_MST1_PAY_CURR_CD(data.CURR_CD[0]);

                    setDatasEDT_KSV_INVOICE_MST2_END_TYPE(data.CREDIT_END_TYPE);
                    setDataEDT_KSV_INVOICE_MST2_END_TYPE(
                        data.CREDIT_END_TYPE[0],
                    );

                    setDatasEDT_KSV_INVOICE_MST1_PO_CD(data.PO_CD);
                    setDataEDT_KSV_INVOICE_MST1_PO_CD(data.PO_CD[0]);

                    setDatasEDT_KSV_INVOICE_MST1_ORDER_CD(data.ORDER_CD);
                    setDataEDT_KSV_INVOICE_MST1_ORDER_CD(data.ORDER_CD[0]);

                    setDatasEDT_KSV_INVOICE_MST1_PAY_TYPE(data.PAY_TYPE);
                    setDataEDT_KSV_INVOICE_MST1_PAY_TYPE(data.PAY_TYPE[0]);
                }

                if (typeof tSaveObj.PO_CD !== "undefined") {
                    var argData = { ...tSaveObj };
                    var _argData = { ...emptyEDT_KSV_INVOICE_MST1 };

                    var tPoArray = [];
                    var tCols = argData.PO_CD.split("/");
                    tCols.forEach((col9, i9) => {
                        if (col9) tPoArray.push(col9);
                    });

                    if (argData.ORDER_CD !== "")
                        _argData.BUYER_CD = argData.ORDER_CD.substring(0, 2);
                    else _argData.BUYER_CD = argData.BUYER_CD;
                    _argData.DATE_OF_ISSUE = serviceLib.getCurrDate1();
                    _argData.EXP_DATE = serviceLib.getCurrDate1();
                    _argData.LINK_TO = argData.FACTORY_CD;
                    _argData.PAY_CURR_CD = argData.CURR_CD;
                    _argData.PAY_TO = argData.VENDOR_CD;
                    _argData.PAY_AMT = argData.TOT_AMT;
                    _argData.PO_CD = tPoArray[0];
                    _argData.ORDER_CD = argData.ORDER_CD;
                    _argData.TITLE = argData.TITLE;
                    _argData.CHARGER = serviceLib.getUserInfo().USER_ID;
                    setDataEDT_KSV_INVOICE_MST1(_argData);

                    var tArray = [];
                    var tObj = {};
                    tObj.BUYER_CD = "";
                    tObj.BUYER_NAME = " ";
                    tArray.push(tObj);
                    tObj = {};
                    tObj.BUYER_CD = argData.BUYER_CD;
                    tObj.BUYER_NAME = argData.BUYER_NAME;
                    tArray.push(tObj);
                    setDatasEDT_KSV_INVOICE_MST1_BUYER_CD(tArray);
                    setDataEDT_KSV_INVOICE_MST1_BUYER_CD(tArray[1]);

                    tObj = {};
                    data.FACTORY.forEach((col, i) => {
                        if (col.FACTORY_CD === _argData.LINK_TO)
                            tObj = { ...col };
                    });
                    setDataEDT_KSV_INVOICE_MST1_LINK_TO(tObj);

                    tObj = {};
                    data.CURR_CD.forEach((col, i) => {
                        if (col.CD_CODE === _argData.PAY_CURR_CD)
                            tObj = { ...col };
                    });
                    setDataEDT_KSV_INVOICE_MST1_PAY_CURR_CD(tObj);

                    tArray = [];
                    tObj = {};
                    tObj.COM_CD = argData.VENDOR_CD;
                    tObj.COM_NAME = argData.VENDOR_NAME;
                    tArray.push(tObj);
                    setDatasEDT_KSV_INVOICE_MST1_PAY_TO(tArray);
                    setDataEDT_KSV_INVOICE_MST1_PAY_TO(tArray[0]);

                    tArray = [];
                    tObj = {};
                    tObj.PO_CD = "";
                    tArray.push(tObj);

                    tPoArray.forEach((col9, i9) => {
                        var tObj9 = {};
                        tObj9.PO_CD = col9;
                        tArray.push(tObj9);
                    });

                    setDatasEDT_KSV_INVOICE_MST1_PO_CD(tArray);
                    setDataEDT_KSV_INVOICE_MST1_PO_CD(tArray[1]);

                    var tTmpVal = " ";
                    if (argData.ORDER_CD !== "") tTmpVal = argData.ORDER_CD;
                    tArray = [];
                    tObj = {};
                    tObj.ORDER_CD = tTmpVal;
                    tArray.push(tObj);
                    setDatasEDT_KSV_INVOICE_MST1_ORDER_CD(tArray);
                    setDataEDT_KSV_INVOICE_MST1_ORDER_CD(tArray[0]);

                    search_QRY_BANK(argData.VENDOR_CD);
                } else {
                    var _argData = { ...emptyEDT_KSV_INVOICE_MST1 };
                    _argData.CHARGER = serviceLib.getUserInfo().USER_ID;
                    setDataEDT_KSV_INVOICE_MST1(_argData);
                }
            } else {
                console.log(
                    "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });
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

    const currentStatusName = String(dataTBL_KSV_INVOICE_MST?.STATUS || "")
        .trim()
        .toUpperCase();
    const isTaxbillEndStatus =
        currentStatusName.includes("TAXBILL") &&
        currentStatusName.includes("END");
    const isEndOrCancelStatus =
        currentStatusName.includes("END") ||
        currentStatusName.includes("CANCEL");
    const isAcPartUser =
        String(tUserInfo?.PART || "")
            .trim()
            .toUpperCase() === "AC";
    const disableUpdateByStatus =
        isEndOrCancelStatus && !(isTaxbillEndStatus && isAcPartUser);

    return (
        <div className="af-div-main">
            <div style={{ width: "123rem", height: "11rem" }}>
                <div
                    className="af-div-first"
                    style={{ width: "123rem", height: "7rem" }}
                >
                    <span className="af-span-3-0" style={{ width: "20rem" }}>
                        <p className="af-span-p" style={{ width: "10rem" }}>Issue Date</p>
                        <div className="af-span-div" style={{ width: "9rem" }}>
                            <Calendar
                                showButtonBar
                                style={{ width: "9rem" }}
                                dateFormat="yy-mm-dd"
                                id="id_S_ISSUE_DATE"
                                value={changeDateVal(
                                    dataQRY_KSV_INVOICE_MST.S_ISSUE_DATE,
                                )}
                                onChange={(e) =>
                                    onCalChangeQRY_KSV_INVOICE_MST_S_ISSUE_DATE(
                                        e,
                                        "S_ISSUE_DATE",
                                    )
                                }
                            />
                        </div>
                    </span>
                    <span className="af-span-3-0" style={{ width: "11rem" }}>
                        <p className="af-span-p" style={{ width: "1rem" }}>~</p>
                        <div className="af-span-div" style={{ width: "9rem" }}>
                            <Calendar
                                showButtonBar
                                style={{ width: "9rem" }}
                                dateFormat="yy-mm-dd"
                                id="id_S_ISSUE_DATE"
                                value={changeDateVal(
                                    dataQRY_KSV_INVOICE_MST.E_ISSUE_DATE,
                                )}
                                onChange={(e) =>
                                    onCalChangeQRY_KSV_INVOICE_MST_E_ISSUE_DATE(
                                        e,
                                        "E_ISSUE_DATE",
                                    )
                                }
                            />
                        </div>
                    </span>
                    <span className="af-span-3-0" style={{ width: "17rem" }}>
                        <p className="af-span-p" style={{ width: "7rem" }}>Pay To</p>
                        <div className="af-span-div" style={{ width: "9rem" }}>
                            <Dropdown
                                style={{ width: "9rem" }}
                                id="id_PAY_TO"
                                value={dataQRY_KSV_INVOICE_MST_PAY_TO}
                                onChange={(e) =>
                                    onDropdownChangeQRY_KSV_INVOICE_MST_PAY_TO(
                                        e,
                                        "PAY_TO",
                                    )
                                }
                                options={datasQRY_KSV_INVOICE_MST_PAY_TO}
                                optionLabel="CD_NAME"
                                placeholder=""
                                onKeyPress={(e) =>
                                    onKeyPress_COMM_QRY(e, "COM_CD")
                                }
                            ></Dropdown>
                        </div>
                    </span>
                    <span className="af-span-3" style={{ width: "60rem" }}>
                            <div
                                className="af-span-div-btn"
                                style={{ width: "7rem" }}
                            >
                                <Tooltip
                                    className="menuCodeTooltip"
                                    target={`#btnSearch`}
                                    content={`Alt+S`}
                                    position="bottom"
                                />

                                <Button
                                    style={{ width: "7rem" }}
                                    id="btnSearch"
                                    label={
                                        <span>
                                            Search(<u>S</u>)
                                        </span>
                                    }
                                    accessKey="S"
                                    className="p-button-text"
                                    onClick={search_LIST_1}
                                />
                            </div>
                            <div
                                className="af-span-div-btn"
                                style={{ width: "7rem" }}
                            >
                                <Button
                                    style={{ width: "7rem" }}
                                    label="Reset"
                                    className="p-button-text"
                                    onClick={process_RESET_QRY}
                                />
                            </div>
                            <div
                                className="af-span-div-btn"
                                style={{ width: "7rem" }}
                            >
                                <Button
                                    style={{ width: "7rem" }}
                                    label="Debit"
                                    className="p-button-text green"
                                    onClick={search_REPORT}
                                />
                            </div>
                            <div
                                className="af-span-div-btn"
                                style={{ width: "7rem" }}
                            >
                                <Button
                                    style={{ width: "7rem" }}
                                    label="Excel"
                                    className="p-button-text green"
                                    onClick={exportExcelTBL_KSV_INVOICE_MST}
                                />
                            </div>
                    </span>

                    <span className="af-span-3" style={{ width: "32rem" }}>
                        <p className="af-span-p" style={{ width: "10rem" }}>Bill To</p>
                        <div className="af-span-div" style={{ width: "20rem" }}>
                            <Dropdown
                                style={{ width: "20rem" }}
                                value={dataQRY_KSV_INVOICE_MST_BILL_TO}
                                onChange={(e) =>
                                    onDropdownChangeQRY_KSV_INVOICE_MST_BILL_TO(
                                        e,
                                        "BILL_TO",
                                    )
                                }
                                options={datasQRY_KSV_INVOICE_MST_BILL_TO}
                                optionLabel="COM_NAME"
                                placeholder=""
                                onKeyPress={(e) =>
                                    onKeyPress_COMM_QRY(e, "COM_CD")
                                }
                                filter
                            ></Dropdown>
                        </div>
                    </span>
                    <span className="af-span-3" style={{ width: "31rem" }}>
                        <p className="af-span-p" style={{ width: "10rem" }}>Person in Charge</p>
                        <div className="af-span-div" style={{ width: "20rem" }}>
                            <Dropdown
                                style={{ width: "20rem" }}
                                id="id_CHARGER"
                                value={dataQRY_KSV_INVOICE_MST_CHARGER}
                                onChange={(e) =>
                                    onDropdownChangeQRY_KSV_INVOICE_MST_CHARGER(
                                        e,
                                        "CHARGER",
                                    )
                                }
                                options={datasQRY_KSV_INVOICE_MST_CHARGER}
                                optionLabel="USER_NAME"
                                placeholder=""
                                filter
                            ></Dropdown>
                        </div>
                    </span>
                    <span className="af-span-3" style={{ width: "40rem" }}>
                        <p className="af-span-p" style={{ width: "7rem" }}>Status</p>
                        <div className="af-span-div" style={{ width: "9rem" }}>
                            <Dropdown
                                style={{ width: "9rem" }}
                                id="id_STATUS_CD"
                                value={dataQRY_KSV_INVOICE_MST_STATUS_CD}
                                onChange={(e) =>
                                    onDropdownChangeQRY_KSV_INVOICE_MST_STATUS_CD(
                                        e,
                                        "STATUS_CD",
                                    )
                                }
                                options={datasQRY_KSV_INVOICE_MST_STATUS_CD}
                                optionLabel="CD_NAME"
                                placeholder=""
                                editable
                            ></Dropdown>
                        </div>
                    </span>
                    <span className="af-span-3" style={{ width: "32rem" }}>
                        <p className="af-span-p" style={{ width: "10rem" }}>Title</p>
                        <div className="af-span-div" style={{ width: "20rem" }}>
                            <InputText
                                style={{ width: "20rem" }}
                                id="id_TITLE"
                                value={dataQRY_KSV_INVOICE_MST.TITLE}
                                onChange={(e) =>
                                    onInputChangeQRY_KSV_INVOICE_MST_TITLE(
                                        e,
                                        "TITLE",
                                    )
                                }
                            />
                        </div>
                    </span>
                    <span className="af-span-3" style={{ width: "69rem" }}>
                        <p className="af-span-p" style={{ width: "10rem" }}>Buyer#</p>
                        <div className="af-span-div" style={{ width: "20rem" }}>
                            <Dropdown
                                style={{ width: "20rem" }}
                                id="id_BUYER_CD"
                                value={dataQRY_KSV_INVOICE_MST_BUYER_CD}
                                onChange={(e) =>
                                    onDropdownChangeQRY_KSV_INVOICE_MST_BUYER_CD(
                                        e,
                                        "BUYER_CD",
                                    )
                                }
                                options={datasQRY_KSV_INVOICE_MST_BUYER_CD}
                                optionLabel="BUYER_NAME"
                                placeholder=""
                                filter
                                onKeyPress={(e) =>
                                    onKeyPress_COMM_QRY(e, "BUYER_CD")
                                }
                            ></Dropdown>
                        </div>
                        <p
                            className="af-span-p"
                            style={{ width: "8rem", marginLeft: "1rem" }}
                        >
                            Debit Type
                        </p>
                        <div className="af-span-div" style={{ width: "12rem" }}>
                            <Dropdown
                                style={{ width: "12rem" }}
                                id="id_QRY_DEBIT_TYPE"
                                value={dataQRY_KSV_INVOICE_MST_DEBIT_TYPE}
                                onChange={(e) =>
                                    onDropdownChangeQRY_KSV_INVOICE_MST_DEBIT_TYPE(
                                        e,
                                        "DEBIT_TYPE",
                                    )
                                }
                                options={datasQRY_KSV_INVOICE_MST_DEBIT_TYPE}
                                optionLabel="CD_NAME"
                                placeholder=""
                            ></Dropdown>
                        </div>
                    </span>
                </div>
                {/*}
                <div
                    className="af-div-second"
                    style={{ width: "52rem", height: "13rem" }}
                >
                    <div
                        className="af-div-first"
                        style={{ width: "52rem", height: "9rem" }}
                    >
                        <AFDataTable preventUnrelatedRerender
                            ref={dt_TBL_KSV_INVOICE_MST1}
                            size="small"
                            value={datasTBL_KSV_INVOICE_MST1}
                            tableStyle={{ tableLayout: "fixed" }}
                            resizableColumns
                            columnResizeMode="expand"
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
                            virtualScrollerOptions={{ itemSize: 20 }}
                            emptyMessage=" " //header={headerTBL_KSV_INVOICE_MST1}
                            responsiveLayout="scroll"
                            scrollable
                            scrollHeight="8rem"
                        >
                            <AFColumn field="CURR_CD" headerClassName="t-header" header="Curr" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                            <AFColumn field="AMOUNT" headerClassName="t-header" header="Amount" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.AMOUNT, 2) } ></AFColumn>
                            <AFColumn field="AMT_USD" headerClassName="t-header" header="Amount($)" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.AMT_USD, 2) } ></AFColumn>
                        </AFDataTable>
                    </div>
                    <div
                        className="af-div-second"
                        style={{ width: "52rem", height: "3rem" }}
                    >
                        <span className="af-span-3" style={{ width: "31rem" }}>
                            <p className="af-span-p" style={{ width: "10rem" }}>Bal Amt($)</p>
                            <div
                                className="af-span-div"
                                style={{ width: "20rem" }}
                            >
                                <InputText
                                    disabled
                                    style={{ width: "18rem" }}
                                    id="id_DEBIT_NO"
                                    value={dataETC_BAL}
                                    onChange={(e) =>
                                        setDataETC_BAL(e.target.value)
                                    }
                                />
                            </div>
                        </span>
                    </div>
                </div>
                */}
                <div
                    className="af-div-first"
                    style={{ width: "123rem", height: "2rem" }}
                >
                    <span className="af-span-3-0" style={{ width: "21rem" }}>
                        <p className="af-span-p" style={{ width: "7rem" }}>Debit#</p>
                        <div className="af-span-div" style={{ width: "10rem" }}>
                            <InputText
                                style={{ width: "10rem" }}
                                id="id_DEBIT_NO"
                                value={dataQRY_KSV_INVOICE_MST1.DEBIT_NO}
                                onChange={(e) =>
                                    onInputChangeQRY_KSV_INVOICE_MST1_DEBIT_NO(
                                        e,
                                        "DEBIT_NO",
                                    )
                                }
                            />
                        </div>
                    </span>
                    <span className="af-span-3" style={{ width: "15rem" }}>
                        <div
                            className="af-span-div-btn"
                            style={{ width: "14rem" }}
                        >
                            <Button
                                style={{ width: "14rem" }}
                                label="Inquiry by Debit No"
                                className="p-button-text"
                                onClick={search_LIST_1_BY_NUMBER}
                            />
                        </div>
                    </span>
                    <span className="af-span-3-0" style={{ width: "21rem" }}>
                        <p className="af-span-p" style={{ width: "7rem" }}>PO#</p>
                        <div className="af-span-div" style={{ width: "10rem" }}>
                            <InputText
                                style={{ width: "10rem" }}
                                id="id_PO_CD"
                                value={dataQRY_KSV_INVOICE_MST1.PO_CD}
                                onChange={(e) =>
                                    onInputChangeQRY_KSV_INVOICE_MST1_PO_CD(
                                        e,
                                        "PO_CD",
                                    )
                                }
                            />
                        </div>
                    </span>
                    <span className="af-span-3-0" style={{ width: "21rem" }}>
                        <p className="af-span-p" style={{ width: "7rem" }}>Order#</p>
                        <div className="af-span-div" style={{ width: "10rem" }}>
                            <InputText
                                style={{ width: "10rem" }}
                                id="id_ORDER_CD"
                                value={dataQRY_KSV_INVOICE_MST1.ORDER_CD}
                                onChange={(e) =>
                                    onInputChangeQRY_KSV_INVOICE_MST1_ORDER_CD(
                                        e,
                                        "ORDER_CD",
                                    )
                                }
                            />
                        </div>
                    </span>
                </div>
            </div>

            <div
                className="af-div-first"
                style={{ width: "123rem", height: "16rem" }}
            >
                <AFDataTable preventUnrelatedRerender
                    ref={dt_TBL_KSV_INVOICE_MST}
                    size="small"
                    value={datasTBL_KSV_INVOICE_MST}
                    loading={loadingTBL_KSV_INVOICE_MST}
                    tableStyle={{ tableLayout: "fixed" }}
                    resizableColumns
                    columnResizeMode="expand"
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
                    virtualScrollerOptions={{ itemSize: 20 }}
                    emptyMessage=" " //header={headerTBL_KSV_INVOICE_MST}
                    responsiveLayout="scroll"
                    scrollable
                    scrollHeight="16rem"
                >
                    <AFColumn field="CHARGER_TEAM" headerClassName="t-header" header="Team" style={{ width: "6rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="CRDB_CD" headerClassName="t-header" header="Number" style={{ width: "5rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="CRDB_SEQ" headerClassName="t-header" header="Seq" style={{ width: "3rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="CRDB_DATE" headerClassName="t-header" header="Date of Issue" style={{ width: "5rem", height: "1.8rem", flexBasis: "auto", }} body={(rowData) => serviceLib.dateFormatHMS(rowData.CRDB_DATE) } ></AFColumn>
                    <AFColumn field="MESSER" headerClassName="t-header" header="Bill To" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="CURR_CD" headerClassName="t-header" header="Curr" style={{ width: "5rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="CRDB_AMT" headerClassName="t-header" header="Amt" style={{ width: "8rem", height: "1.8rem", flexBasis: "auto", }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(getRowAmtExVat(rowData), 2) } ></AFColumn>
                    <AFColumn field="VAT" headerClassName="t-header" header="Vat" style={{ width: "8rem", height: "1.8rem", flexBasis: "auto", }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.VAT, 2) } ></AFColumn>
                    <AFColumn field="TOTAL_AMT" headerClassName="t-header" header="Total AMT" style={{ width: "9rem", height: "1.8rem", flexBasis: "auto", }} bodyStyle={{ textAlign: "right" }} body={(rowData) => {
                        return serviceLib.numWithCommas(parseAmtValue(rowData.CRDB_AMT), 2);
                    }} ></AFColumn>
                    <AFColumn field="END_AMT" headerClassName="t-header" header="End Amt" style={{ width: "9rem", height: "1.8rem", flexBasis: "auto", }} bodyStyle={{ textAlign: "right" }} body={(rowData) => {
                        return serviceLib.numWithCommas(parseAmtValue(rowData.END_AMT), 2);
                    }} ></AFColumn>
                    <AFColumn field="BALANCE" headerClassName="t-header" header="Balance" style={{ width: "8rem", height: "1.8rem", flexBasis: "auto", }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(getRowBalance(rowData), 2) } ></AFColumn>
                    <AFColumn field="USD_BAL" headerClassName="t-header" header="Usd Bal" style={{ width: "8rem", height: "1.8rem", flexBasis: "auto", }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.USD_BAL, 2) } ></AFColumn>
                    <AFColumn field="TITLE" headerClassName="t-header" header="Title" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="CHARGER" headerClassName="t-header" header="Charger" style={{ width: "8rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="END_DATE" headerClassName="t-header" header="Exp Date" style={{ width: "6rem", height: "1.8rem", flexBasis: "auto", }} body={(rowData) => serviceLib.dateFormatHMS(rowData.END_DATE) } ></AFColumn>
                    <AFColumn field="REMARK" headerClassName="t-header" header="Remark" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="CONF_FLAG" headerClassName="t-header" header="Confirm" style={{ width: "6rem", height: "1.8rem", flexBasis: "auto", }} bodyClassName="text-center" body={(rowData) => rowData.CONF_FLAG === "Y" && String(rowData.CONF_USER || "").trim() !== "" ? <i className="pi pi-check" style={{ color: "green" }} /> : null} ></AFColumn>
                    <AFColumn field="STATUS" headerClassName="t-header" header="Status" style={{ width: "6rem", height: "1.8rem", flexBasis: "auto", }} body={(rowData) => rowData.STATUS === "1" ? <i className="pi pi-check" style={{ color: "green" }} /> : rowData.STATUS} ></AFColumn>
                    <AFColumn field="GW_STATUS" headerClassName="t-header" header="GW" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="CA_NO" headerClassName="t-header" header="CA#" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="PO_CD" headerClassName="t-header" header="Po" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="ORDER_CD" headerClassName="t-header" header="Order" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="BANK_CD" headerClassName="t-header" header="Bank" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="MESSER_CD" headerClassName="t-header" header="Messer" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    {/*<AFColumn field="STATUS_CD" headerClassName="t-header" header="Status" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="BUYER_CD" headerClassName="t-header" header="Buyer" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>*/}
                    <AFColumn field="BUYER_NAME" headerClassName="t-header" header="Buyer" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="PAYMENT_PLAN" headerClassName="t-header" header="Payment" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    {/*}
                    <AFColumn field="APPROKEY" headerClassName="t-header" header="GW.Key" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="DOCU_NO" headerClassName="t-header" header="Docu#" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    */}
                    <AFColumn field="END_USER" headerClassName="t-header" header="End User" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="REG_USER" headerClassName="t-header" header="Reg User" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    {/*<AFColumn field="DEBIT_TYPE" headerClassName="t-header" header="Debit.T" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>*/}
                    <AFColumn field="DEBIT_TYPE_NAME" headerClassName="t-header" header="Debit Type" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="LINK_TO" headerClassName="t-header" header="Link To" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="END_DATE2" headerClassName="t-header" header="End Date2" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} body={(rowData) => serviceLib.dateFormatHMS(rowData.END_DATE2) } ></AFColumn>
                    <AFColumn field="BUYER_TEAM" headerClassName="t-header" header="Buyer Team" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="CONF_USER" headerClassName="t-header" header="Conf User" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    {/*<AFColumn field="END_TYPE" headerClassName="t-header" header="End.Type" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>*/}
                    <AFColumn field="END_TYPE_NAME" headerClassName="t-header" header="End Type" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                </AFDataTable>
            </div>

            <div style={{ height: "28rem" }}>
                <div
                    className="af-div-first"
                    style={{ width: "70rem", height: "25rem" }}
                >
                    <span className="af-span-3-0" style={{ width: "47rem" }}>
                        <p className="af-span-p" style={{ width: "10rem" }}>Debit#</p>
                        <div className="af-span-div" style={{ width: "20rem" }}>
                            <InputText
                                style={{ width: "19rem" }}
                                id="id_DEBIT_NO"
                                value={dataEDT_KSV_INVOICE_MST1.DEBIT_NO}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_INVOICE_MST1_DEBIT_NO(
                                        e,
                                        "DEBIT_NO",
                                    )
                                }
                                disabled
                            />
                        </div>
                    </span>
                    <span className="af-span-3-0" style={{ width: "47rem" }}>
                        <p className="af-span-p" style={{ width: "10rem", color: "red" }}>*Buyer</p>
                        <div className="af-span-div" style={{ width: "20rem" }}>
                            <Dropdown
                                style={{ width: "20rem" }}
                                id="id_BUYER_CD"
                                filter
                                value={dataEDT_KSV_INVOICE_MST1_BUYER_CD}
                                onChange={(e) =>
                                    onDropdownChangeEDT_KSV_INVOICE_MST1_BUYER_CD(
                                        e,
                                        "BUYER_CD",
                                    )
                                }
                                options={datasEDT_KSV_INVOICE_MST1_BUYER_CD}
                                optionLabel="BUYER_NAME"
                                placeholder=""
                                onKeyPress={(e) =>
                                    onKeyPress_COMM_EDT(e, "BUYER_CD")
                                }
                            ></Dropdown>
                        </div>
                    </span>

                    <span className="af-span-3" style={{ width: "21rem" }}>
                        <p className="af-span-p" style={{ width: "10rem" }}>Status</p>
                        <div className="af-span-div" style={{ width: "10rem" }}>
                            <Dropdown
                                style={{ width: "10rem" }}
                                id="id_STATUS_CD"
                                value={dataEDT_KSV_INVOICE_MST1_STATUS_CD}
                                onChange={(e) =>
                                    onDropdownChangeEDT_KSV_INVOICE_MST1_STATUS_CD(
                                        e,
                                        "STATUS_CD",
                                    )
                                }
                                options={datasEDT_KSV_INVOICE_MST1_STATUS_CD}
                                optionLabel="CD_NAME"
                                placeholder=""
                            ></Dropdown>
                        </div>
                    </span>
                    <span className="af-span-3" style={{ width: "31rem" }}>
                        <p className="af-span-p" style={{ width: "10rem" }}>Charger</p>
                        <div className="af-span-div" style={{ width: "20rem" }}>
                            <InputText
                                style={{ width: "20rem" }}
                                id="id_CHARGER"
                                value={dataEDT_KSV_INVOICE_MST1.CHARGER}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_INVOICE_MST1_CHARGER(
                                        e,
                                        "CHARGER",
                                    )
                                }
                                disabled
                            />
                        </div>
                    </span>
                    <span className="af-span-3" style={{ width: "16rem" }}>
                        <p className="af-span-p" style={{ width: "7rem" }}>End Type</p>
                        <div className="af-span-div" style={{ width: "8rem" }}>
                            <Dropdown
                                style={{ width: "8rem" }}
                                id="id_END_TYPE"
                                value={dataEDT_KSV_INVOICE_MST1_END_TYPE}
                                onChange={(e) =>
                                    onDropdownChangeEDT_KSV_INVOICE_MST1_END_TYPE(
                                        e,
                                        "END_TYPE"
                                    )
                                }
                                options={datasEDT_KSV_INVOICE_MST1_END_TYPE}
                                optionLabel="CD_NAME"
                                placeholder=""
                                editable
                            ></Dropdown>
                        </div>
                    </span>

                    <span className="af-span-3" style={{ width: "21rem" }}>
                        <p
                            className="af-span-p"
                            style={{ width: "9.5rem", color: "red" }}
                        >*Issue Date</p>
                        <div
                            className="af-span-div"
                            style={{ width: "10rem", color: "red" }}
                        >
                            <Calendar
                                showButtonBar
                                style={{ width: "10rem" }}
                                dateFormat="yy-mm-dd"
                                id="id_DATE_OF_ISSUE"
                                value={changeDateVal(
                                    dataEDT_KSV_INVOICE_MST1.DATE_OF_ISSUE,
                                )}
                                onChange={(e) =>
                                    onCalChangeEDT_KSV_INVOICE_MST1_DATE_OF_ISSUE(
                                        e,
                                        "DATE_OF_ISSUE",
                                    )
                                }
                            />
                        </div>
                    </span>
                    <span className="af-span-3" style={{ width: "31rem" }}>
                        <p
                            className="af-span-p"
                            style={{ width: "10rem", color: "red" }}
                        >*Link To</p>
                        <div className="af-span-div" style={{ width: "20rem" }}>
                            <Dropdown
                                style={{ width: "20rem" }}
                                id="id_LINK_TO"
                                value={dataEDT_KSV_INVOICE_MST1_LINK_TO}
                                onChange={(e) =>
                                    onDropdownChangeEDT_KSV_INVOICE_MST1_LINK_TO(
                                        e,
                                        "LINK_TO",
                                    )
                                }
                                options={datasEDT_KSV_INVOICE_MST1_LINK_TO}
                                optionLabel="FACTORY_NAME"
                                placeholder=""
                                editable
                            ></Dropdown>
                        </div>
                    </span>
                    <span className="af-span-3" style={{ width: "16rem" }}>
                        <p
                            className="af-span-p"
                            style={{ width: "7rem", color: "red" }}
                        >*Debit Type</p>
                        <div className="af-span-div" style={{ width: "8rem" }}>
                            <Dropdown
                                style={{ width: "8rem" }}
                                id="id_DEBIT_TYPE"
                                value={dataEDT_KSV_INVOICE_MST1_DEBIT_TYPE}
                                onChange={(e) =>
                                    onDropdownChangeEDT_KSV_INVOICE_MST1_DEBIT_TYPE(
                                        e,
                                        "DEBIT_TYPE",
                                    )
                                }
                                options={datasEDT_KSV_INVOICE_MST1_DEBIT_TYPE}
                                optionLabel="CD_NAME"
                                placeholder=""
                                editable
                            ></Dropdown>
                        </div>
                    </span>

                    <span className="af-span-3" style={{ width: "21rem" }}>
                        <p
                            className="af-span-p"
                            style={{ width: "9.5rem", color: "red" }}
                        >*Curr</p>
                        <div className="af-span-div" style={{ width: "10rem" }}>
                            <Dropdown
                                style={{ width: "10rem" }}
                                id="id_PAY_TYPE"
                                value={dataEDT_KSV_INVOICE_MST1_PAY_CURR_CD}
                                onChange={(e) =>
                                    onDropdownChangeEDT_KSV_INVOICE_MST1_PAY_CURR_CD(
                                        e,
                                        "PAY_CURR_CD",
                                    )
                                }
                                options={datasEDT_KSV_INVOICE_MST1_PAY_CURR_CD}
                                optionLabel="CD_NAME"
                                placeholder=""
                                editable
                            ></Dropdown>
                        </div>
                    </span>
                    <span className="af-span-3" style={{ width: "31rem" }}>
                        <p
                            className="af-span-p"
                            style={{ width: "10rem", color: "red" }}
                        >*Amt</p>
                        <div className="af-span-div" style={{ width: "20rem" }}>
                            <InputNumber
                                style={{ width: "20rem" }}
                                id="id_PAY_AMT"
                                value={
                                    (parseFloat(
                                        String(
                                            dataEDT_KSV_INVOICE_MST1.PAY_AMT ||
                                                0,
                                        ).replace(/,/g, "")
                                    ) || 0) -
                                        (parseFloat(
                                            String(
                                                dataEDT_KSV_INVOICE_MST1.VAT_AMT ||
                                                    0,
                                            ).replace(/,/g, "")
                                        ) || 0)
                                }
                                useGrouping={false}
                                minFractionDigits={0}
                                maxFractionDigits={2}
                                onValueChange={(e) =>
                                    onInputChangeEDT_KSV_INVOICE_MST1_PAY_AMT_EX_VAT(
                                        e,
                                        "PAY_AMT",
                                    )
                                }
                            />
                        </div>
                    </span>
                    <span className="af-span-3" style={{ width: "21rem" }}>
                        <p className="af-span-p" style={{ width: "7rem" }}>VAT</p>
                        <div className="af-span-div" style={{ width: "8rem" }}>
                            <InputText
                                style={{ width: "8rem" }}
                                id="id_VAT_AMT"
                                value={dataEDT_KSV_INVOICE_MST1.VAT_AMT}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_INVOICE_MST1_VAT_AMT(
                                        e,
                                        "VAT_AMT",
                                    )
                                }
                            />
                        </div>
                    </span>

                    <span className="af-span-3" style={{ width: "31rem" }}>
                        <p
                            className="af-span-p"
                            style={{ width: "10rem", color: "red" }}
                        >*Bill To</p>
                        <div className="af-span-div" style={{ width: "20rem" }}>
                            <Dropdown
                                style={{ width: "20rem" }}
                                id="id_PAY_TO"
                                filter
                                value={dataEDT_KSV_INVOICE_MST1_PAY_TO}
                                onChange={(e) =>
                                    onDropdownChangeEDT_KSV_INVOICE_MST1_PAY_TO(
                                        e,
                                        "PAY_TO",
                                    )
                                }
                                options={datasEDT_KSV_INVOICE_MST1_PAY_TO}
                                optionLabel="COM_NAME"
                                placeholder=""
                                onKeyPress={(e) =>
                                    onKeyPress_COMM_EDT(e, "COM_CD")
                                }
                            ></Dropdown>
                        </div>
                    </span>
                    <span className="af-span-3" style={{ width: "16rem" }}>
                        <p className="af-span-p" style={{ width: "7rem" }}>Pay Type</p>
                        <div className="af-span-div" style={{ width: "8rem" }}>
                            <Dropdown
                                style={{ width: "8rem" }}
                                id="id_PAY_TYPE"
                                value={dataEDT_KSV_INVOICE_MST1_PAY_TYPE}
                                onChange={(e) =>
                                    onDropdownChangeEDT_KSV_INVOICE_MST1_PAY_TYPE(
                                        e,
                                        "PAY_TYPE",
                                    )
                                }
                                options={datasEDT_KSV_INVOICE_MST1_PAY_TYPE}
                                optionLabel="CD_NAME"
                                placeholder=""
                                editable
                            ></Dropdown>
                        </div>
                    </span>

                    <span className="af-span-3" style={{ width: "21rem" }}>
                        <p className="af-span-p red" style={{ width: "9.5rem" }}>*Exp Recept Date</p>
                        <div className="af-span-div" style={{ width: "10rem" }}>
                            <Calendar
                                showButtonBar
                                style={{ width: "10rem" }}
                                dateFormat="yy-mm-dd"
                                id="id_EXP_DATE"
                                value={changeDateVal(
                                    dataEDT_KSV_INVOICE_MST1.EXP_DATE,
                                )}
                                onChange={(e) =>
                                    onCalChangeEDT_KSV_INVOICE_MST1_EXP_DATE(
                                        e,
                                        "EXP_DATE",
                                    )
                                }
                            />
                        </div>
                    </span>

                    <span className="af-span-3" style={{ width: "47rem" }}>
                        <p
                            className="af-span-p"
                            style={{ width: "10rem", color: "red" }}
                        >*Bank</p>
                        <div className="af-span-div" style={{ width: "20rem" }}>
                            <Dropdown
                                style={{ width: "20rem" }}
                                id="id_BANK_CD"
                                value={dataEDT_KSV_INVOICE_MST1_BANK_CD}
                                onChange={(e) =>
                                    onDropdownChangeEDT_KSV_INVOICE_MST1_BANK_CD(
                                        e,
                                        "BANK_CD",
                                    )
                                }
                                options={datasEDT_KSV_INVOICE_MST1_BANK_CD}
                                optionLabel="BANK_NAME"
                                placeholder=""
                                onKeyPress={(e) =>
                                    onKeyPress_COMM_QRY(e, "BANK_CD")
                                }
                                filter
                            ></Dropdown>
                        </div>
                    </span>

                    <span className="af-span-3" style={{ width: "21rem" }}>
                        <p className="af-span-p" style={{ width: "10rem" }}>Payment Plan</p>
                        <div className="af-span-div" style={{ width: "10rem" }}>
                            <InputText
                                style={{ width: "10rem" }}
                                id="id_PAYMENT_PLAN"
                                value={dataEDT_KSV_INVOICE_MST1.PAYMENT_PLAN}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_INVOICE_MST1_PAYMENT_PLAN(
                                        e,
                                        "PAYMENT_PLAN",
                                    )
                                }
                            />
                        </div>
                    </span>
                    <span className="af-span-3" style={{ width: "47rem" }}>
                        <p className="af-span-p" style={{ width: "10rem" }}>PO#</p>
                        <div className="af-span-div" style={{ width: "20rem" }}>
                            <Dropdown
                                style={{ width: "20rem" }}
                                id="id_PO_CD"
                                value={dataEDT_KSV_INVOICE_MST1_PO_CD}
                                onChange={(e) =>
                                    onDropdownChangeEDT_KSV_INVOICE_MST1_PO_CD(
                                        e,
                                        "PO_CD",
                                    )
                                }
                                options={datasEDT_KSV_INVOICE_MST1_PO_CD}
                                optionLabel="PO_CD"
                                placeholder=""
                                filter
                            ></Dropdown>
                        </div>
                    </span>

                    <span className="af-span-3" style={{ width: "21rem" }}>
                        <p className="af-span-p" style={{ width: "10rem" }}>Order#</p>
                        <div className="af-span-div" style={{ width: "10rem" }}>
                            <Dropdown
                                style={{ width: "10rem" }}
                                id="id_ORDER_CD"
                                value={dataEDT_KSV_INVOICE_MST1_ORDER_CD}
                                onChange={(e) =>
                                    onDropdownChangeEDT_KSV_INVOICE_MST1_ORDER_CD(
                                        e,
                                        "ORDER_CD",
                                    )
                                }
                                options={datasEDT_KSV_INVOICE_MST1_ORDER_CD}
                                optionLabel="STYLE_CD"
                                placeholder=""
                                filter
                            ></Dropdown>
                        </div>
                    </span>
                    <span className="af-span-3" style={{ width: "47rem" }}>
                        <p className="af-span-p" style={{ width: "10rem" }}>Remark</p>
                        <div className="af-span-div" style={{ width: "36rem" }}>
                            <InputText
                                style={{ width: "36rem" }}
                                id="id_REMARK"
                                value={dataEDT_KSV_INVOICE_MST1.REMARK}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_INVOICE_MST1_REMARK(
                                        e,
                                        "REMARK",
                                    )
                                }
                            />
                        </div>
                    </span>

                    <span className="af-span-3" style={{ width: "21rem" }}>
                        <p className="af-span-p" style={{ width: "10rem" }}>GW</p>
                        <div className="af-span-div" style={{ width: "10rem" }}>
                            <InputText
                                style={{ width: "10rem" }}
                                id="id_GW_CODE"
                                value={dataEDT_KSV_INVOICE_MST1.GW_CODE}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_INVOICE_MST1_GW_CODE(
                                        e,
                                        "GW_CODE",
                                    )
                                }
                            />
                        </div>
                    </span>
                    <span className="af-span-3" style={{ width: "47rem" }}>
                        <p
                            className="af-span-p"
                            style={{ width: "10rem", color: "red" }}
                        >*Title</p>
                        <div className="af-span-div" style={{ width: "36rem" }}>
                            <InputText
                                style={{ width: "36rem" }}
                                id="id_TITLE"
                                value={dataEDT_KSV_INVOICE_MST1.TITLE}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_INVOICE_MST1_TITLE(
                                        e,
                                        "TITLE",
                                    )
                                }
                            />
                        </div>
                    </span>
                    <span className="af-span-3-0" style={{ width: "22rem" }}>
                        <p className="af-span-p" style={{ width: "10rem" }}>Charger</p>
                        <div className="af-span-div" style={{ width: "10rem" }}>
                            <InputText
                                style={{ width: "10rem" }}
                                id="id_CHARGER_ROW2"
                                value={dataEDT_KSV_INVOICE_MST1.CHARGER}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_INVOICE_MST1_CHARGER(
                                        e,
                                        "CHARGER",
                                    )
                                }
                                disabled
                            />
                        </div>
                    </span>
                    {/*
                    <span className="af-span-3" style={{ width: "21rem" }}>
                        <p
                            className="af-span-p"
                            style={{ width: "10rem", color: "red" }}
                        >*Total Amt</p>
                        <div className="af-span-div" style={{ width: "10rem" }}>
                            <InputText
                                style={{ width: "10rem" }}
                                id="id_PAY_AMT_TOT"
                                value={dataEDT_KSV_INVOICE_MST1.PAY_AMT}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_INVOICE_MST1_PAY_AMT(
                                        e,
                                        "PAY_AMT",
                                    )
                                }
                            />
                        </div>
                    </span>
                    <span className="af-span-3" style={{ width: "25.5rem" }}>
                        <p className="af-span-p" style={{ width: "1rem" }}> </p>
                        <div className="af-span-div" style={{ width: "6rem" }}>
                            <Dropdown
                                style={{ width: "6rem" }}
                                id="id_PAY_CURR_CD_ROW2"
                                value={dataEDT_KSV_INVOICE_MST1_PAY_CURR_CD}
                                onChange={(e) =>
                                    onDropdownChangeEDT_KSV_INVOICE_MST1_PAY_CURR_CD(
                                        e,
                                        "PAY_CURR_CD",
                                    )
                                }
                                options={datasEDT_KSV_INVOICE_MST1_PAY_CURR_CD}
                                optionLabel="CD_NAME"
                                placeholder=""
                                editable
                            ></Dropdown>
                        </div>
                    </span>
                    */}
                    <span
                        className="af-span-3"
                        style={{ width: "21rem"}}
                    >
                        <p className="af-span-p" style={{ width: "10rem" }}>Conf User</p>
                        <div className="af-span-div" style={{ width: "10rem" }}>
                            <InputText
                                style={{ width: "10rem" }}
                                id="id_CONF_USER"
                                value={dataETC_CONF_USER}
                                onChange={(e) =>
                                    setDataETC_CONF_USER(e.target.value)
                                }
                                disabled
                            />
                        </div>
                    </span>
                </div>
                <div
                    className="af-div-second"
                    style={{ width: "53rem", height: "25rem" }}
                >
                    <div
                        className="af-div-first"
                        style={{ width: "52rem", height: "13rem" }}
                    >
                        <AFDataTable preventUnrelatedRerender
                            ref={dt_TBL_KSV_INVOICE_MST2}
                            size="small"
                            value={datasTBL_KSV_INVOICE_MST2}
                            tableStyle={{ tableLayout: "fixed" }}
                            resizableColumns
                            columnResizeMode="expand"
                            showGridlines
                            selectionMode="checkbox"
                            selection={selectedTBL_KSV_INVOICE_MST2}
                            onSelectionChange={(e) => {
                                setFlagSelectModeTBL_KSV_INVOICE_MST2(true);
                                setSelectedTBL_KSV_INVOICE_MST2(e.value);
                                console.log(
                                    "selected length:" +
                                        selectedTBL_KSV_INVOICE_MST2.length,
                                );
                                onRowClick1TBL_KSV_INVOICE_MST2(e.value);
                            }}
                            onRowClick={onRowClickTBL_KSV_INVOICE_MST2}
                            dataKey="id"
                            className="datatable-responsive"
                            virtualScrollerOptions={{ itemSize: 20 }}
                            emptyMessage=" " //header={headerTBL_KSV_INVOICE_MST2}
                            responsiveLayout="scroll"
                            scrollable
                            scrollHeight="13rem"
                        >
                            <AFColumn field="END_DATE" headerClassName="t-header" header="End Date" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} body={(rowData) => serviceLib.dateFormat(rowData.END_DATE) } ></AFColumn>
                            <AFColumn field="CRDB_AMT" headerClassName="t-header" header="End Amt" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas( rowData.CRDB_AMT, 2, ) } ></AFColumn>
                            <AFColumn field="REF_NO" headerClassName="t-header" header="Ref#" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                            <AFColumn field="REG_DATETIME" headerClassName="t-header" header="Reg Date" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} body={(rowData) => serviceLib.dateFormat(rowData.REG_DATETIME)} ></AFColumn>
                        </AFDataTable>
                    </div>
                    <div
                        className="af-div-second"
                        style={{ width: "52rem", height: "6rem" }}
                    >
                        <span className="af-span-3" style={{ width: "16rem" }}>
                            <p className="af-span-p" style={{ width: "7rem" }}>End Type</p>
                            <div
                                className="af-span-div"
                                style={{ width: "8rem" }}
                            >
                                <Dropdown
                                    style={{ width: "8rem" }}
                                    id="id_END_TYPE"
                                    value={dataEDT_KSV_INVOICE_MST2_END_TYPE}
                                    onChange={(e) =>
                                        onDropdownChangeEDT_KSV_INVOICE_MST2_END_TYPE(
                                            e,
                                            "END_TYPE",
                                        )
                                    }
                                    options={datasEDT_KSV_INVOICE_MST2_END_TYPE}
                                    optionLabel="CD_NAME"
                                    placeholder=""
                                    editable
                                ></Dropdown>
                            </div>
                        </span>
                        <span className="af-span-3" style={{ width: "34rem" }}>
                            <div
                                className="af-span-div-btn"
                                style={{ width: "10rem" }}
                            >
                                <Button
                                    label="ET Upd"
                                    style={{ width: "10rem" }}
                                    className="p-button-text"
                                    onClick={process_UPDATE_END_TYPE}
                                />
                            </div>
                        </span>
                        <span className="af-span-3" style={{ width: "16rem" }}>
                            <p className="af-span-p" style={{ width: "7rem" }}>End Date</p>
                            <div
                                className="af-span-div"
                                style={{ width: "8rem" }}
                            >
                                <Calendar
                                    showButtonBar
                                    style={{ width: "8rem" }}
                                    dateFormat="yy-mm-dd"
                                    id="id_END_DATE"
                                    value={changeDateVal(
                                        dataEDT_KSV_INVOICE_MST2.END_DATE,
                                    )}
                                    onChange={(e) =>
                                        onCalChangeEDT_KSV_INVOICE_MST2_END_DATE(
                                            e,
                                            "END_DATE",
                                        )
                                    }
                                />
                            </div>
                        </span>
                        <span className="af-span-3" style={{ width: "16rem" }}>
                            <p className="af-span-p" style={{ width: "7rem" }}>End Amt</p>
                            <div
                                className="af-span-div"
                                style={{ width: "8rem" }}
                            >
                                <InputText
                                    disabled
                                    style={{ width: "8rem" }}
                                    id="id_AMT"
                                    value={serviceLib.numWithCommas(dataETC_END_AMT_SUM, 2)}
                                    onChange={(e) =>
                                        onInputChangeEDT_KSV_INVOICE_MST2_AMT(
                                            e,
                                            "AMT",
                                        )
                                    }
                                />
                            </div>
                        </span>
                    </div>
                </div>

                <div
                    className="af-div-first"
                    style={{ width: "123rem", height: "3rem" }}
                >
                    <span className="af-span-3" style={{ width: "11rem" }}>
                        <div
                            className="af-span-div-btn"
                            style={{ width: "10rem" }}
                        >
                            <Button
                                style={{ width: "10rem" }}
                                label="Insert"
                                className="p-button-text"
                                onClick={process_INSERT_DEBIT_NOTE}
                            />
                        </div>
                    </span>
                    <span className="af-span-3" style={{ width: "11rem" }}>
                        <div
                            className="af-span-div-btn"
                            style={{ width: "10rem" }}
                        >
                            <Button
                                style={{ width: "10rem" }}
                                label="Update"
                                className="p-button-text"
                                onClick={process_UPDATE_DEBIT_NOTE}
                                disabled={disableUpdateByStatus}
                            />
                        </div>
                    </span>
                    <span className="af-span-3" style={{ width: "11rem" }}>
                        <div
                            className="af-span-div-btn"
                            style={{ width: "10rem" }}
                        >
                            <Button
                                style={{ width: "10rem" }}
                                label="Cancel"
                                className="p-button-text"
                                onClick={process_CANCEL_DEBIT_NOTE}
                            />
                        </div>
                    </span>
                    <span className="af-span-3" style={{ width: "11rem" }}>
                        <div
                            className="af-span-div-btn"
                            style={{ width: "10rem" }}
                        >
                            <Button
                                style={{ width: "10rem" }}
                                label="Reset"
                                className="p-button-text"
                                onClick={process_RESET_EDT}
                            />
                        </div>
                    </span>

                    <span className="af-span-3" style={{ width: "11rem" }}>
                        <div
                            className="af-span-div-btn"
                            style={{ width: "10rem" }}
                        >
                            <Button
                                style={{ width: "10rem" }}
                                label="Confirm"
                                className="p-button-text"
                                onClick={process_CONFIRM_DEBIT_NOTE}
                            />
                        </div>
                    </span>
                    <span className="af-span-3" style={{ width: "11rem" }}>
                        <div
                            className="af-span-div-btn"
                            style={{ width: "10rem" }}
                        >
                            <Button
                                style={{ width: "10rem" }}
                                label="End"
                                className="p-button-text"
                                onClick={process_END_DEBIT_NOTE}
                            />
                        </div>
                    </span>
                    <span className="af-span-3" style={{ width: "11rem" }}>
                        <div
                            className="af-span-div-btn"
                            style={{ width: "10rem" }}
                        >
                            <Button
                                style={{ width: "10rem" }}
                                label="End Cancel"
                                className="p-button-text"
                                onClick={process_CANCEL_END_CREDIT}
                            />
                        </div>
                    </span>
                </div>
            </div>

            <Toast ref={toast} />
        </div>
    );
};

const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(S0702_DEBIT_NOTE, comparisonFn);
