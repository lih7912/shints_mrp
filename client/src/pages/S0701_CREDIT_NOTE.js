/* eslint-disable */
import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
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
import { ServiceS0701_CREDIT_NOTE } from "../service/service_biz/ServiceS0701_CREDIT_NOTE";

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

const S0701_CREDIT_NOTE = () => {
    const serviceLibRef = useRef(null);
    if (!serviceLibRef.current) {
        serviceLibRef.current = new ServiceLib();
        serviceLibRef.current.loginConfirm();
    }
    const serviceLib = serviceLibRef.current;
    const serviceS0701_CREDIT_NOTERef = useRef(null);
    if (!serviceS0701_CREDIT_NOTERef.current) serviceS0701_CREDIT_NOTERef.current = new ServiceS0701_CREDIT_NOTE();
    const serviceS0701_CREDIT_NOTE = serviceS0701_CREDIT_NOTERef.current;

    var tUserInfo = serviceLib.getUserInfo();

    const toast = useRef(null);

    /* splitter 관련 */
    const [styleVal, setStyleVal] = useState({ width: "65vw" });

    const process_RESET_QRY = () => {
        var tRetDate = serviceLib.getCurrDate().substring(0, 8);
        var tObj0 = { ...emptyQRY_KSV_INVOICE_MST };
        //tObj0.S_ISSUE_DATE = `${tRetDate.substring(0, 6)}01`;
        tObj0.E_ISSUE_DATE = `${tRetDate}`;
        setDataQRY_KSV_INVOICE_MST(tObj0);

        setDataQRY_KSV_INVOICE_MST_PAY_TO(datasQRY_KSV_INVOICE_MST_PAY_TO[0]);
        setDataQRY_KSV_INVOICE_MST_BILL_TO(datasQRY_KSV_INVOICE_MST_BILL_TO[0]);
        setDataQRY_KSV_INVOICE_MST_CHARGER(datasQRY_KSV_INVOICE_MST_CHARGER[0]);
        setDataQRY_KSV_INVOICE_MST_STATUS_CD(
            datasQRY_KSV_INVOICE_MST_STATUS_CD[7],
        );
        setDataQRY_KSV_INVOICE_MST_BUYER_CD(
            datasQRY_KSV_INVOICE_MST_BUYER_CD[0],
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
        serviceS0701_CREDIT_NOTE
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

    const process_INSERT_CREDIT_NOTE = () => {
        var tObj = { ...dataEDT_KSV_INVOICE_MST1 };
        tObj.USER_ID = tUserInfo.USER_ID;

        if (typeof dataEDT_KSV_INVOICE_MST1_BANK_CD.BANK_CD !== "undefined")
            tObj.BANK_CD = dataEDT_KSV_INVOICE_MST1_BANK_CD.BANK_CD;
        if (typeof dataEDT_KSV_INVOICE_MST1_BUYER_CD.BUYER_CD !== "undefined")
            tObj.BUYER_CD = dataEDT_KSV_INVOICE_MST1_BUYER_CD.BUYER_CD;

        if (!tObj.DATE_OF_ISSUE) {
            alert("Issue Date는 필수 입력 사항입니다.<br><br>Issue Date is required.");
            return;
        }

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

        if (tObj.BUYER_CD === "") {
            alert("Buyer은 필수 입력 사항입니다.<br><br>Buyer is required.");
            return;
        }

        if (tObj.TITLE === "") {
            alert("Title은 필수 입력 사항입니다.<br><br>Title is required.");
            return;
        }

        setDatasTBL_KSV_INVOICE_MST([]);
        setSelectedTBL_KSV_INVOICE_MST([]);

        // 2
        setLoadingTBL_KSV_INVOICE_MST(true);
        serviceS0701_CREDIT_NOTE
            .mgrUpdate_INSERT_CREDIT_NOTE(tObj)
            .then((data) => {
                setLoadingTBL_KSV_INVOICE_MST(false);
                if (typeof data.graphQLErrors === "undefined") {
                    // console.log("ServiceMgrKCD_BUYER.mgr1KcdStyle call => " + data.length);
                    if (data.length > 0) {
                        let tMsg = data[0].CODE;
                        if (data[0].CODE.includes("SUCC")) {
                            tMsg += "<br><br>전자 결재 후 종결 가능합니다.";
                        }
                        alert(tMsg);
                        if (data[0].CODE.includes("SUCC")) {
                            var tCols = data[0].CODE.split(":");
                            if (tCols.length >= 3) {
                                var tObj = {};
                                tObj.DEBIT_NO = tCols[2];
                                search_LIST_1_BY_NUMBER(tObj);
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
    };

    const process_COPY_CREDIT_NOTE = () => {
        var tCurrDate = serviceLib.getCurrDate1();

        var tObj = { ...dataEDT_KSV_INVOICE_MST1 };
        tObj.DEBIT_NO = "";
        tObj.STATUS_CD = "";
        tObj.DATE_OF_ISSUE = tCurrDate;
        tObj.EXP_DATE = tCurrDate;
        tObj.GW_CODE = "";
        setDataEDT_KSV_INVOICE_MST1(tObj);
    };

    const process_CANCEL_CREDIT_NOTE = () => {
        var tObj = { ...dataEDT_KSV_INVOICE_MST1 };
        tObj.USER_ID = serviceLib.getUserInfo().USER_ID;

        // setDatasTBL_KSV_INVOICE_MST([]);
        // setSelectedTBL_KSV_INVOICE_MST([]);

        // 2
        setLoadingTBL_KSV_INVOICE_MST(true);
        serviceS0701_CREDIT_NOTE
            .mgrUpdate_CANCEL_CREDIT_NOTE(tObj)
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

    const process_UPDATE_CREDIT_NOTE = () => {
        var tObj = { ...dataEDT_KSV_INVOICE_MST1 };
        var selObj = { ...dataTBL_KSV_INVOICE_MST };
        console.log(tObj);
        if (tObj.DEBIT_NO === "") {
            alert("CRDB_NO가 없습니다<br><br>CRDB_NO does not exist");
            return;
        }

        if (!tObj.DATE_OF_ISSUE) {
            alert("Issue Date는 필수 입력 사항입니다.<br><br>Issue Date is required.");
            return;
        }

        if (
            tObj.ORDER_CD !== "" &&
            tObj.ORDER_CD.substring(0, 2) !== tObj.BUYER_CD
        ) {
            alert(
                `Order Cd와 Buyer Cd가 틀립니다.[${tObj.ORDER_CD}/${tObj.BUYER_CD}]`,
            );
            return;
        }
        if (
            tObj.GW_CODE &&
            (selObj.GW_STATUS === "상신" || selObj.GW_STATUS === "종결")
        ) {
            alert("상신/종결중인 데이타는 수정할수 없습니다.<br><br>Data that has been submitted/closed cannot be modified.");
            return;
        }

        // setDatasTBL_KSV_INVOICE_MST([]);
        // setSelectedTBL_KSV_INVOICE_MST([]);

        // 2
        setLoadingTBL_KSV_INVOICE_MST(true);
        serviceS0701_CREDIT_NOTE
            .mgrUpdate_UPDATE_CREDIT_NOTE(tObj)
            .then((data) => {
                setLoadingTBL_KSV_INVOICE_MST(false);
                if (typeof data.graphQLErrors === "undefined") {
                    // console.log("ServiceMgrKCD_BUYER.mgr1KcdStyle call => " + data.length);
                    if (data.length > 0) {
                        alert(data[0].CODE);
                        if (data[0].CODE.includes("SUCC")) {
                            var tObj2 = {};
                            tObj2.DEBIT_NO = tObj.DEBIT_NO;
                            search_LIST_1_BY_NUMBER(tObj2);
                        }
                    }
                } else {
                    console.log(
                        "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });
    };

    const process_END_CREDIT_NOTE = () => {
        if (selectedTBL_KSV_INVOICE_MST.length <= 0) {
            alert("You must select work record.");
            return;
        } else {
            var tSelObj = { ...selectedTBL_KSV_INVOICE_MST[0] };
            if (
                tSelObj.GW_STATUS &&
                (tSelObj.GW_STATUS === "상신" || tSelObj.GW_STATUS === "종결")
            ) {
            } else {
                alert(
                    `GW 상태가 상신/종결인 Debit만 End 처리가능합니다.(${tSelObj.GW_STATUS}) `,
                );
                return;
            }
        }

        var tObj = { ...dataEDT_KSV_INVOICE_MST1 };
    tObj.USER_ID = serviceLib.getUserInfo().USER_ID;

        var tObj1 = { ...dataEDT_KSV_INVOICE_MST2 };

        // setDatasTBL_KSV_INVOICE_MST([]);
        // setSelectedTBL_KSV_INVOICE_MST([]);

        // 2
        setLoadingTBL_KSV_INVOICE_MST(true);
        serviceS0701_CREDIT_NOTE
            .mgrUpdate_END_CREDIT_NOTE(tObj, tObj1)
            .then((data) => {
                setLoadingTBL_KSV_INVOICE_MST(false);
                if (typeof data.graphQLErrors === "undefined") {
                    // console.log("ServiceMgrKCD_BUYER.mgr1KcdStyle call => " + data.length);
                    if (data.length > 0) {
                        alert(data[0].CODE);
                    }
                    search_LIST_1();

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
        tObj.USER_ID = serviceLib.getUserInfo().USER_ID;

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
        serviceS0701_CREDIT_NOTE
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
    const GW_WINDOW_NAME = "GW_CREDIT_POPUP";
    const gwWinRef = useRef(null);

    const process_GW = () => {
        // 이미 열려 있으면 새로 안 띄움
        if (gwWinRef.current?.closed === false) {
            alert("이미 열려 있는 창이 있습니다.<br><br>There is already a window open.");
            gwWinRef.current.focus();
            return;
        }

        if (selectedTBL_KSV_INVOICE_MST.length <= 0) {
            alert("작업할 데이타를 선택하세요<br><br>Choose the data you want to work with");
            return;
        }

        if (selectedTBL_KSV_INVOICE_MST.length > 10) {
            alert("작업할 데이타는 10개 까지만 선택가능합니다 <br><br>You can select up to 10 data items to work with.");
            return;
        }
        var tCurrDate = serviceLib.getCurrDate();
        var tUserInfo = serviceLib.getUserInfo();

        var tObj = { ...selectedTBL_KSV_INVOICE_MST[0] };



        var crdbArray = '';
        var crdbAmt = 0;
        selectedTBL_KSV_INVOICE_MST.forEach((col, i) => {
            if (col.CRDB_CD) {
                if (crdbArray === '') crdbArray = `${col.CRDB_CD}`;
                else  crdbArray += `,${col.CRDB_CD}`;
                crdbAmt += parseFloat(col.CRDB_AMT);
            }
        });
        var tTitle = `크레딧발행승인요청서-${crdbArray}`;

        // var tInfo  = `${tObj.CRDB_CD}/?/${tObj.CRDB_DATE}/?/${tObj.MESSER}/?/${tObj.CURR_CD}/?/${tObj.CRDB_AMT}/?/${tTitle}`;

        var tIssueDate = serviceLib.dateFormat(tObj.CRDB_DATE);
        var tCrdbAmt = serviceLib.numComAndFix(parseFloat(crdbAmt), 2);

        const post_data = {};
        post_data.title = tTitle;

        var tInfo = [];
        selectedTBL_KSV_INVOICE_MST.forEach((col, i) => {
            var tObj = { ...col };
            var tInfo0 = `${tObj.CRDB_CD}/?/${tObj.CRDB_DATE}/?/${tObj.MESSER}/?/${tObj.CURR_CD}/?/${tObj.CRDB_AMT}/?/${tObj.TITLE}`;
            tInfo.push(tInfo0);
        });
        post_data.info = tInfo;
        console.log(`Selected Record: ${selectedTBL_KSV_INVOICE_MST.length}:  ${tTitle} : ${tInfo}`);


        setDatasTBL_KSV_INVOICE_MST([]);
        let _url1 = `${window.location.protocol}//${window.location.hostname}:3202/restapi/`;
        setLoadingTBL_KSV_INVOICE_MST(true);
        axios
            .post(
                `${_url1}request_gw_credit/CD/${tCurrDate}/${tObj.CRDB_CD}/${tUserInfo.USER_ID}`,
                post_data,
            )
            .then((response) => {
                setLoadingTBL_KSV_INVOICE_MST(false);
                alert(
                    "GW RES DATA: " +
                        response.data.data.ADDRESS +
                        "=>" +
                        response.data.data.APPROKEY,
                );
                console.log(response.data);
                console.log(
                    "GW RES DATA: " +
                        response.data.data.ADDRESS +
                        "=>" +
                        response.data.data.APPROKEY,
                );

                gwWinRef.current = window.open(
                    response.data.data.ADDRESS,
                    GW_WINDOW_NAME,
                );

                // 닫힘 감시 — 닫히면 ref 초기화
                const timer = setInterval(() => {
                    if (gwWinRef.current?.closed) {
                        gwWinRef.current = null;
                        clearInterval(timer);
                    }
                }, 500);

                search_LIST_1();
            });
    };

    const search_CODE = (argData, argMode) => {
        var _tObj = { ...argData };

        serviceS0701_CREDIT_NOTE.mgrQuery_CODE(_tObj).then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                if (argMode === "") {
                    setDatasQRY_KSV_INVOICE_MST_PAY_TO(data.DEBIT_TYPE);
                    setDataQRY_KSV_INVOICE_MST_PAY_TO(data.DEBIT_TYPE[0]);

                    setDatasQRY_KSV_INVOICE_MST_BILL_TO(data.MESSER);
                    setDataQRY_KSV_INVOICE_MST_BILL_TO(data.MESSER[0]);

                    setDatasQRY_KSV_INVOICE_MST_CHARGER(data.USER);
                    setDataQRY_KSV_INVOICE_MST_CHARGER(data.USER[0]);

                    setDatasQRY_KSV_INVOICE_MST_STATUS_CD(data.DEBIT_STATUS);
                    setDataQRY_KSV_INVOICE_MST_STATUS_CD(data.DEBIT_STATUS[7]);

                    var tRetDate = serviceLib.getCurrDate().substring(0, 8);
                    let _dataQRY_KSV_INVOICE_MST = {
                        ...dataQRY_KSV_INVOICE_MST,
                    };
                    _dataQRY_KSV_INVOICE_MST["STATUS_CD"] = "99";
                    _dataQRY_KSV_INVOICE_MST["E_ISSUE_DATE"] = tRetDate;

                    setDataQRY_KSV_INVOICE_MST(_dataQRY_KSV_INVOICE_MST);

                    console.log(_dataQRY_KSV_INVOICE_MST);

                    setDatasQRY_KSV_INVOICE_MST_BUYER_CD(data.BUYER3);
                    setDataQRY_KSV_INVOICE_MST_BUYER_CD(data.BUYER3[0]);

                    setDatasEDT_KSV_INVOICE_MST1_BUYER_CD(data.BUYER3);
                    setDataEDT_KSV_INVOICE_MST1_BUYER_CD(data.BUYER3[0]);

                    let copiedDataDEBIT_TYPE = JSON.parse(
                        JSON.stringify(data.DEBIT_STATUS),
                    );
                    copiedDataDEBIT_TYPE.pop();

                    setDatasEDT_KSV_INVOICE_MST1_STATUS_CD(
                        copiedDataDEBIT_TYPE,
                    );
                    setDataEDT_KSV_INVOICE_MST1_STATUS_CD(
                        copiedDataDEBIT_TYPE[0],
                    );

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
                    setDataEDT_KSV_INVOICE_MST1_PO_CD(data.PO_CD[0] || null);

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
        serviceS0701_CREDIT_NOTE.mgrQuery_CODE1(_tObj).then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                setDatasEDT_KSV_INVOICE_MST1_PO_CD(data.PO_CD);
                setDataEDT_KSV_INVOICE_MST1_PO_CD(data.PO_CD[0] || null);

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

    const search_BANK_BY_BILL_TO = (argData) => {
        var _tObj = {};
        _tObj.COM_CD = argData.COM_CD.trim();
        serviceS0701_CREDIT_NOTE
            .mgrQuery_BANK_BY_BILL_TO(_tObj)
            .then((data) => {
                if (typeof data.graphQLErrors === "undefined") {
                    setDatasEDT_KSV_INVOICE_MST1_BANK_CD(data.BANK);
                    setDataEDT_KSV_INVOICE_MST1_BANK_CD(data.BANK[0]);
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

        let dpoObj = { ...dataQRY_KSV_INVOICE_MST1 };
        tObj.DEBIT_NO = dpoObj.DEBIT_NO;
        tObj.PO_CD = dpoObj.PO_CD;
        tObj.ORDER_CD = dpoObj.ORDER_CD;

        setDatasTBL_KSV_INVOICE_MST([]);
        // setSelectedTBL_KSV_INVOICE_MST([]);

        console.log(tObj);
        // 2
        setLoadingTBL_KSV_INVOICE_MST(true);
        serviceS0701_CREDIT_NOTE.mgrQuery_LIST_1(tObj).then((data) => {
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
            } else {
                console.log(
                    "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });
    };

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
        serviceS0701_CREDIT_NOTE.mgrQuery_REPORT(tArray).then((data) => {
            setLoadingTBL_KSV_INVOICE_MST(false);
            if (typeof data.graphQLErrors === "undefined") {
                if (data.length > 0) {
                    alert(data[0].CODE);
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

    const search_LIST_1_BY_NUMBER = (argKind) => {
        var tObj = { ...dataQRY_KSV_INVOICE_MST1 };

        if (argKind && argKind.DEBIT_NO) tObj.DEBIT_NO = argKind.DEBIT_NO;

        setDatasTBL_KSV_INVOICE_MST([]);
        setSelectedTBL_KSV_INVOICE_MST([]);

        // 2
        setLoadingTBL_KSV_INVOICE_MST(true);
        serviceS0701_CREDIT_NOTE
            .mgrQuery_LIST_1_BY_NUMBER(tObj)
            .then((data) => {
                setLoadingTBL_KSV_INVOICE_MST(false);
                if (typeof data.graphQLErrors === "undefined") {
                    console.log(
                        "ServiceMgrKCD_BUYER.mgr1KcdStyle call => " +
                            data.length,
                    );
                    var tArray = data.map((col, i) => {
                        var tObj = { ...col };
                        tObj.id = i + 1;
                        return tObj;
                    });
                    setDatasTBL_KSV_INVOICE_MST(tArray);
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

        setDatasTBL_KSV_INVOICE_MST2([]);
        setSelectedTBL_KSV_INVOICE_MST2([]);

        setDataEDT_KSV_INVOICE_MST2_END_TYPE(
            datasEDT_KSV_INVOICE_MST2_END_TYPE[0],
        );

        // 2
        serviceS0701_CREDIT_NOTE.mgrQuery_LIST_2(tObj).then((data) => {
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

        if (typeof argData0.length !== "undefined") {
            if (argData0.length <= 0) return;
            argData = argData0[argData0.length - 1];
        } else {
            argData = argData0;
        }

        if (!argData) return;

        let argTBL_KSV_INVOICE_MST = argData;

        setDataTBL_KSV_INVOICE_MST(argTBL_KSV_INVOICE_MST);

        datasetEDT_KSV_INVOICE_MST1(argData);

        const rowBuyerCode = String(argData.BUYER_CD || "")
            .trim()
            .toUpperCase();
        const matchingBuyer = datasEDT_KSV_INVOICE_MST1_BUYER_CD.find(
            (item) => {
                const buyerName = String(item?.BUYER_NAME || "");
                const matched = buyerName.match(/^\(\s*([^\s\)]{2})/);
                if (!matched || !matched[1]) return false;
                return matched[1].toUpperCase() === rowBuyerCode;
            },
        );
        setDataEDT_KSV_INVOICE_MST1_BUYER_CD(
            matchingBuyer || datasEDT_KSV_INVOICE_MST1_BUYER_CD[0] || {},
        );

        const normalizeText = (val) =>
            String(val || "")
                .trim()
                .toUpperCase();
        const rowMesserName = normalizeText(argData.MESSER);
        const matchingMesser = datasEDT_KSV_INVOICE_MST1_PAY_TO.find(
            (item) => normalizeText(item?.COM_NAME) === rowMesserName,
        );
        setDataEDT_KSV_INVOICE_MST1_PAY_TO(
            matchingMesser || datasEDT_KSV_INVOICE_MST1_PAY_TO[0] || {},
        );

        var tObj = { ...dataEDT_KSV_INVOICE_MST2 };
        tObj.AMT = String(argData.END_AMT || 0);
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

        setDataETC_BAL(parseFloat(argData.BALANCE) + parseFloat(argData.VAT));
    };

    const onRowClickTBL_KSV_INVOICE_MST = (event) => {
        let argTBL_KSV_INVOICE_MST = event.data;
        if (flagSelectModeTBL_KSV_INVOICE_MST) return;

        // Service : NawooAll:mgrQueryTBL_KSV_INVOICE_MST
    };

    const exportExcelTBL_KSV_INVOICE_MST = () => {
        var tArray = [];
        datasTBL_KSV_INVOICE_MST.forEach((col, i) => {
            var tObj = {};
            tObj.Team = col.CHARGER_TEAM;
            tObj.Number = col.CRDB_CD;
            tObj.Seq = col.CRDB_SEQ;
            tObj.Date_Of_Issue = col.CRDB_DATE;
            tObj.Bill_To = col.MESSER;
            tObj.Pay_Amt = col.CRDB_AMT;
            tObj.Balance = col.BALANCE;
            tObj.Curr = col.CURR_CD;
            tObj.Usd_Bal = col.USD_BAL;
            tObj.Title = col.TITLE;
            tObj.Charger = col.CHARGER;
            tObj.Exp_Date = col.END_DATE;
            tObj.Remark = col.REMARK;
            tObj.Status = col.STATUS;
            tObj.GW_Status = col.GW_STATUS;
            tObj.PO = col.PO_CD;
            tObj.Order = col.ORDER_CD;
            tObj.Bank = col.BANK_CD;
            tObj.Messer = col.MESSER_CD;
            tObj.Status_Cd = col.STATUS_CD;
            tObj.Buyer_Cd = col.BUYER_CD;
            tObj.Buyer = col.BUYER_NAME;
            tObj.Payment = col.PAYMENT_PLAN;
            tObj.GW_Key = col.APPROKEY;
            tObj.Docu_No = col.DOCU_NO;
            tObj.End_User = col.END_USER;
            tObj.Reg_User = col.REG_USER;
            tObj.Debit_Type = col.DEBIT_TYPE_NAME;
            tObj.Link_To = col.LINK_TO;
            tObj.Buyer_Team = col.BUYER_TEAM;
            tObj.Conf_User = col.CONF_USER;
            tObj.End_Type = col.END_TYPE_NAME;
            tObj.Vat = col.VAT;
            tArray.push(tObj);
        });
        import("xlsx").then((xlsx) => {
            const worksheet = xlsx.utils.json_to_sheet(tArray);
            const workbook = {
                Sheets: { data: worksheet },
                SheetNames: ["data"],
            };
            const excelBuffer = xlsx.write(workbook, {
                bookType: "xlsx",
                type: "array",
            });
            saveAsExcelFileTBL_KSV_INVOICE_MST(excelBuffer, "Credit_Note_List");
        });
    };

    const saveAsExcelFileTBL_KSV_INVOICE_MST = (buffer, fileName) => {
        import("file-saver").then((module) => {
            if (module && module.default) {
                let EXCEL_TYPE =
                    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
                let EXCEL_EXTENSION = ".xlsx";
                const data = new Blob([buffer], {
                    type: EXCEL_TYPE,
                });
                module.default.saveAs(
                    data,
                    fileName +
                        "_export_" +
                        new Date().getTime() +
                        EXCEL_EXTENSION,
                );
            }
        });
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
        tObj.AMT = argData.END_AMT;
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

    const datasetEDT_KSV_INVOICE_MST1 = (argData) => {
        var _argData = { ...dataEDT_KSV_INVOICE_MST1 };
        _argData.DEBIT_NO = argData.CRDB_CD;
        _argData.BUYER_CD = argData.BUYER_CD;
        _argData.STATUS_CD = argData.STATUS_CD;
        _argData.DATE_OF_ISSUE = argData.CRDB_DATE;
        _argData.LINK_TO = argData.LINK_TO;
        _argData.DEBIT_TYPE = argData.DEBIT_TYPE;
        _argData.PAY_TO = argData.MESSER_CD;
        _argData.EXP_DATE = argData.END_DATE;
        _argData.BANK_CD = argData.BANK_CD;
        _argData.PAYMENT_PLAN = argData.PAYMENT_PLAN;
        _argData.TITLE = argData.TITLE;
        _argData.REMARK = argData.REMARK;
        _argData.CHARGER = argData.CHARGER;
        _argData.END_TYPE = argData.END_TYPE;
        _argData.PAY_AMT = argData.CRDB_AMT;
        _argData.PAY_TYPE = "";
        _argData.PAY_CURR_CD = argData.CURR_CD;
        _argData.VAT_AMT = argData.VAT;
        _argData.PO_CD = argData.PO_CD;
        _argData.ORDER_CD = argData.ORDER_CD;
        _argData.GW_CODE = argData.APPROKEY;
        setDataEDT_KSV_INVOICE_MST1(_argData);

        var tIdx2 = 0;
        let tArray2 = [];
        var tObj2 = {};
        tObj2.BANK_CD = "";
        tObj2.BANK_NAME = " ";
        tArray2.push(tObj2);
        if (argData.BANK_CD !== "") {
            tIdx2 = 1;
            tObj2 = {};
            tObj2.BANK_CD = argData.BANK_CD;
            tObj2.BANK_NAME = argData.BANK_NAME;
            tArray2.push(tObj2);
        }
        setDatasEDT_KSV_INVOICE_MST1_BANK_CD(tArray2);
        setDataEDT_KSV_INVOICE_MST1_BANK_CD(tArray2[tIdx2]);

        tIdx2 = 0;
        tArray2 = [];
        tObj2 = {};
        tObj2.PO_CD = "";
        tObj2.PO_DATE = " ";
        tArray2.push(tObj2);
        if (argData.PO_CD !== "") {
            tObj2 = {};
            tObj2.PO_CD = argData.PO_CD;
            tObj2.PO_DATE = argData.PO_CD;
            tArray2.push(tObj2);
            tIdx2 = 1;
        }
        setDatasEDT_KSV_INVOICE_MST1_PO_CD(tArray2);
        setDataEDT_KSV_INVOICE_MST1_PO_CD(tArray2[tIdx2]);

        tIdx2 = 0;
        tArray2 = [];
        tObj2 = {};
        tObj2.ORDER_CD = "";
        tObj2.STYLE_CD = " ";
        tArray2.push(tObj2);
        if (argData.ORDER_CD !== "") {
            tObj2 = {};
            tObj2.ORDER_CD = argData.ORDER_CD;
            tObj2.STYLE_CD = argData.ORDER_CD;
            tArray2.push(tObj2);
            tIdx2 = 1;
        }
        setDatasEDT_KSV_INVOICE_MST1_ORDER_CD(tArray2);
        setDataEDT_KSV_INVOICE_MST1_ORDER_CD(tArray2[tIdx2]);

        editEDT_KSV_INVOICE_MST1_STATUS_CD(argData.STATUS_CD);
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

    const editEDT_KSV_INVOICE_MST1_STATUS_CD = (argValue) => {
        let _dataEDT_KSV_INVOICE_MST1_STATUS_CD =
            datasEDT_KSV_INVOICE_MST1_STATUS_CD.filter(
                (val) => val.CD_CODE === argValue,
            );
        setDataEDT_KSV_INVOICE_MST1_STATUS_CD(
            _dataEDT_KSV_INVOICE_MST1_STATUS_CD[0],
        );
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

        // 은행정보 읽어오기
        search_BANK_BY_BILL_TO(e.value);
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

    const [
        datasEDT_KSV_INVOICE_MST1_PAY_TYPE,
        setDatasEDT_KSV_INVOICE_MST1_PAY_TYPE,
    ] = useState([]);
    const [
        dataEDT_KSV_INVOICE_MST1_PAY_TYPE,
        setDataEDT_KSV_INVOICE_MST1_PAY_TYPE,
    ] = useState({});

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
        useState(null);

    const editEDT_KSV_INVOICE_MST1_PO_CD = (argValue) => {
        let _dataEDT_KSV_INVOICE_MST1_PO_CD =
            datasEDT_KSV_INVOICE_MST1_PO_CD.filter(
                (val) => val.PO_CD === argValue,
            );
        setDataEDT_KSV_INVOICE_MST1_PO_CD(
            _dataEDT_KSV_INVOICE_MST1_PO_CD[0] || null,
        );
    };

    const onDropdownChangeEDT_KSV_INVOICE_MST1_PO_CD = (e, name) => {
        let val = e.value || "";

        let _dataEDT_KSV_INVOICE_MST1 = { ...dataEDT_KSV_INVOICE_MST1 };

        let tTypeVal = _dataEDT_KSV_INVOICE_MST1[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_KSV_INVOICE_MST1[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_KSV_INVOICE_MST1[`${name}`] = parseInt(val);
        }

        setDataEDT_KSV_INVOICE_MST1(_dataEDT_KSV_INVOICE_MST1);
        editEDT_KSV_INVOICE_MST1_PO_CD(val);
    };

    const [
        datasEDT_KSV_INVOICE_MST1_ORDER_CD,
        setDatasEDT_KSV_INVOICE_MST1_ORDER_CD,
    ] = useState([]);
    const [
        dataEDT_KSV_INVOICE_MST1_ORDER_CD,
        setDataEDT_KSV_INVOICE_MST1_ORDER_CD,
    ] = useState({});

    const editEDT_KSV_INVOICE_MST1_ORDER_CD = (argValue) => {
        let _dataEDT_KSV_INVOICE_MST1_ORDER_CD =
            datasEDT_KSV_INVOICE_MST1_ORDER_CD.filter(
                (val) => val.ORDER_CD === argValue,
            );
        setDataEDT_KSV_INVOICE_MST1_ORDER_CD(
            _dataEDT_KSV_INVOICE_MST1_ORDER_CD[0],
        );
    };

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

    const resetEDT_KSV_INVOICE_MST1 = () => {
        var tRetDate = serviceLib.getCurrDate().substring(0, 8);
        var tEmptyObj = { ...emptyEDT_KSV_INVOICE_MST1 };
        tEmptyObj.DATE_OF_ISSUE = tRetDate;
        setDataEDT_KSV_INVOICE_MST1(tEmptyObj);

        editEDT_KSV_INVOICE_MST1_PAY_CURR_CD(" ");
        editEDT_KSV_INVOICE_MST1_STATUS_CD(" ");
        editEDT_KSV_INVOICE_MST1_LINK_TO(" ");
        editEDT_KSV_INVOICE_MST1_DEBIT_TYPE(" ");
        editEDT_KSV_INVOICE_MST1_END_TYPE(" ");
        editEDT_KSV_INVOICE_MST1_PO_CD(" ");
        editEDT_KSV_INVOICE_MST1_ORDER_CD(" ");

        setDataEDT_KSV_INVOICE_MST1_PAY_TO(
            datasEDT_KSV_INVOICE_MST1_PAY_TO[0] || {},
        );

        let tObj = { ...datasEDT_KSV_INVOICE_MST1_BANK_CD[0] };
        let tArray = [];
        tArray.push(tObj);
        setDatasEDT_KSV_INVOICE_MST1_BANK_CD(tArray);
        setDataEDT_KSV_INVOICE_MST1_BANK_CD(tArray[0]);

        tObj = { ...datasEDT_KSV_INVOICE_MST1_PO_CD[0] };
        tArray = [];
        tArray.push(tObj);
        setDatasEDT_KSV_INVOICE_MST1_PO_CD(tArray);
        setDataEDT_KSV_INVOICE_MST1_PO_CD(tArray[0]);

        tObj = { ...datasEDT_KSV_INVOICE_MST1_ORDER_CD[0] };
        tArray = [];
        tArray.push(tObj);
        setDatasEDT_KSV_INVOICE_MST1_ORDER_CD(tArray);
        setDataEDT_KSV_INVOICE_MST1_ORDER_CD(tArray[0]);

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
        var tRetDate = serviceLib.getCurrDate().substring(0, 8);
        var tObj0 = { ...dataQRY_KSV_INVOICE_MST };
        //tObj0.S_ISSUE_DATE = `${tRetDate.substring(0, 6)}01`;
        tObj0.E_ISSUE_DATE = `${tRetDate}`;
        setDataQRY_KSV_INVOICE_MST(tObj0);

        var _tObj = {};
        _tObj.USER_ID = "";
        _tObj.COM_CD = "";
        _tObj.BUYER_CD = "";
        _tObj.BANK_CD = "";
        _tObj.PO_CD = "";
        _tObj.ORDER_CD = "";

        search_CODE(_tObj, "");
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

    const mainTableSelectionRef = useRef(null);
    const amountTableSelectionRef = useRef(null);
    const endTableSelectionRef = useRef(null);

    mainTableSelectionRef.current = (selectedRows) => {
        onRowClick1TBL_KSV_INVOICE_MST(selectedRows);
    };

    amountTableSelectionRef.current = (selectedRows) => {
        onRowClick1TBL_KSV_INVOICE_MST1(selectedRows);
    };

    endTableSelectionRef.current = (selectedRows) => {
        onRowClick1TBL_KSV_INVOICE_MST2(selectedRows);
    };

    const handleSelectionChangeTBL_KSV_INVOICE_MST = useCallback((e) => {
        const selectedRows = e.value || [];
        setFlagSelectModeTBL_KSV_INVOICE_MST(true);
        setSelectedTBL_KSV_INVOICE_MST(selectedRows);
        console.log("selected length:" + selectedRows.length);
        if (mainTableSelectionRef.current) {
            mainTableSelectionRef.current(selectedRows);
        }
    }, []);

    const handleSelectionChangeTBL_KSV_INVOICE_MST1 = useCallback((e) => {
        const selectedRows = e.value || [];
        setFlagSelectModeTBL_KSV_INVOICE_MST1(true);
        setSelectedTBL_KSV_INVOICE_MST1(selectedRows);
        console.log("selected length:" + selectedRows.length);
        if (amountTableSelectionRef.current) {
            amountTableSelectionRef.current(selectedRows);
        }
    }, []);

    const handleSelectionChangeTBL_KSV_INVOICE_MST2 = useCallback((e) => {
        const selectedRows = e.value || [];
        setFlagSelectModeTBL_KSV_INVOICE_MST2(true);
        setSelectedTBL_KSV_INVOICE_MST2(selectedRows);
        console.log("selected length:" + selectedRows.length);
        if (endTableSelectionRef.current) {
            endTableSelectionRef.current(selectedRows);
        }
    }, []);

    const handleRowClickTBL_KSV_INVOICE_MST = useCallback((event) => {
        if (event && event.data) {
            if (mainTableSelectionRef.current) {
                mainTableSelectionRef.current(event.data);
            }
        }
    }, []);

    const handleRowClickTBL_KSV_INVOICE_MST1 = useCallback(() => {}, []);

    const handleRowClickTBL_KSV_INVOICE_MST2 = useCallback(() => {}, []);

    const selectedMainRow =
        selectedTBL_KSV_INVOICE_MST[0] ||
        (dataTBL_KSV_INVOICE_MST && dataTBL_KSV_INVOICE_MST.CRDB_CD
            ? dataTBL_KSV_INVOICE_MST
            : null);
    const disableUpdateButton =
        !!selectedMainRow &&
        (
            selectedMainRow.GW_STATUS === "종결" ||
            (selectedMainRow.STATUS === "Taxbill End" && tUserInfo.PART !== "AC")
        );
    const enableEndButton =
        !!selectedMainRow &&
        (selectedMainRow.GW_STATUS === "상신" ||
            selectedMainRow.GW_STATUS === "종결");

    return (
        <div className="af-div-main">
            <div style={{ display: "flex", flexDirection: "column", width: "123rem" }}>
                <div
                    style={{ width: "123rem", height: "4rem", display: "flex", flexDirection: "row" }}
                >
                    <span className="af-span-3-0" style={{ width: "15.5rem" }}>
                        <p className="af-span-p" style={{ width: "7rem" }}>Issue Date</p>
                        <div className="af-span-div" style={{ width: "8rem" }}>
                            <Calendar
                                style={{ width: "8rem" }}
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
                                showButtonBar
                            />
                        </div>
                    </span>
                    <span className="af-span-3-0" style={{ width: "10rem" }}>
                        <p className="af-span-p" style={{ width: "1rem" }}>~</p>
                        <div className="af-span-div" style={{ width: "8rem" }}>
                            <Calendar
                                showButtonBar
                                style={{ width: "8rem" }}
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

                    <span className="af-span-3" style={{ width: "18rem" }}>
                        <p className="af-span-p" style={{ width: "5rem" }}>Pay To</p>
                        <div className="af-span-div" style={{ width: "12rem" }}>
                            <Dropdown
                                style={{ width: "12rem" }}
                                id="id_BILL_TO"
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
                                filter
                                onKeyPress={(e) => onKeyPress_COMM_QRY(e, "COM_CD")}
                            ></Dropdown>
                        </div>
                    </span>


                    <div style={{ width: "40rem", display: "flex", flexDirection: "row" }}>
                        <span className="af-span-3" style={{ width: "8rem" }}>
                            <div className="af-span-div-btn" style={{ width: "7rem" }}>
                                <Tooltip
                                    className="menuCodeTooltip"
                                    target={`#btnSearch`}
                                    content={`Alt+S`}
                                    position="bottom"
                                />

                                <Button
                                    style={{ width: "7rem" }}
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
                        <span className="af-span-3" style={{ width: "8rem" }}>
                            <div className="af-span-div-btn" style={{ width: "7rem" }}>
                                <Button
                                    style={{ width: "7rem" }}
                                    label="Reset"
                                    className="p-button-text"
                                    onClick={process_RESET_QRY}
                                />
                            </div>
                        </span>
                        <span className="af-span-3" style={{ width: "8rem" }}>
                            <div className="af-span-div-btn" style={{ width: "7rem" }}>
                                <Button
                                    style={{ width: "7rem" }}
                                    label="Credit"
                                    className="p-button-text green"
                                    onClick={search_REPORT}
                                />
                            </div>
                        </span>
                        <span className="af-span-3" style={{ width: "8rem" }}>
                            <div className="af-span-div-btn" style={{ width: "7rem" }}>
                                <Button
                                    style={{ width: "7rem" }}
                                    label="Excel"
                                    className="p-button-text green"
                                    onClick={exportExcelTBL_KSV_INVOICE_MST}
                                />
                            </div>
                        </span>
                        <span className="af-span-3" style={{ width: "8rem" }}>
                            <div
                                className="af-span-div-btn"
                                style={{ width: "7rem" }}
                            >
                                <Button
                                    style={{ width: "7rem" }}
                                    label="전자결재"
                                    className="p-button-text orange"
                                    onClick={process_GW}
                                />
                            </div>
                        </span>
                    </div>
                </div>

                <div
                    style={{ width: "123rem", height: "2rem", display: "flex", flexDirection: "row" }}
                >
                    <span className="af-span-3" style={{ width: "23rem" }}>
                        <p className="af-span-p" style={{ width: "10rem" }}>Person in Charge</p>
                        <div className="af-span-div" style={{ width: "12rem" }}>
                            <Dropdown
                                style={{ width: "12rem" }}
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
                                editable
                            ></Dropdown>
                        </div>
                    </span>
                    <span className="af-span-3" style={{ width: "16rem" }}>
                        <p className="af-span-p" style={{ width: "4.5rem" }}>Status</p>
                        <div className="af-span-div" style={{ width: "10rem" }}>
                            <Dropdown
                                style={{ width: "10rem" }}
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
                            ></Dropdown>
                        </div>
                    </span>

                    <span className="af-span-3" style={{ width: "20rem" }}>
                        <p className="af-span-p" style={{ width: "5rem" }}>Title</p>
                        <div className="af-span-div" style={{ width: "14rem" }}>
                            <InputText
                                style={{ width: "14rem" }}
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

                    <span className="af-span-3" style={{ width: "20rem" }}>
                        <p className="af-span-p" style={{ width: "5rem" }}>Buyer#</p>
                        <div className="af-span-div" style={{ width: "14rem" }}>
                            <Dropdown
                                style={{ width: "14rem" }}
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
                                editable
                                filter
                                onKeyPress={(e) =>
                                    onKeyPress_COMM_QRY(e, "BUYER_CD")
                                }
                            ></Dropdown>
                        </div>
                    </span>
                </div>


                <div
                    style={{ width: "123rem", height: "3rem", display: "flex", flexDirection: "row" }}
                >
                    <span className="af-span-3-0">
                        <p className="af-span-p" style={{ width: "4rem" }}>Credit#</p>
                        <div className="af-span-div" style={{ width: "8rem" }}>
                            <InputText
                                style={{ width: "8rem" }}
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
                    <span className="af-span-3-0">
                        <p className="af-span-p" style={{ width: "4rem" }}>PO#</p>
                        <div className="af-span-div" style={{ width: "8rem" }}>
                            <InputText
                                style={{ width: "8rem" }}
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
                    <span className="af-span-3-0">
                        <p className="af-span-p" style={{ width: "4rem" }}>Order#</p>
                        <div className="af-span-div" style={{ width: "8rem" }}>
                            <InputText
                                style={{ width: "8rem" }}
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

            {/*}
            <div
                className="af-div-first"
                style={{
                    marginLeft: "0.5rem",
                    width: "40rem",
                    height: "18rem",
                }}
            >
                <div
                    className="af-div-first"
                    style={{ width: "40rem", height: "14rem" }}
                >
                    {useMemo(
                        () => (
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
                                onSelectionChange={handleSelectionChangeTBL_KSV_INVOICE_MST1}
                                onRowClick={handleRowClickTBL_KSV_INVOICE_MST1}
                                dataKey="id"
                                className="datatable-responsive"
                                virtualScrollerOptions={{ itemSize: 20 }}
                                emptyMessage=" "
                                responsiveLayout="scroll"
                                scrollable
                                scrollHeight="14rem"
                            >
                                <AFColumn field="CURR_CD" headerClassName="t-header" header="Curr" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto" }}></AFColumn>
                                <AFColumn field="AMOUNT" headerClassName="t-header" header="Amount" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto" }}></AFColumn>
                                <AFColumn field="AMT_USD" headerClassName="t-header" header="Amount($)" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto" }}></AFColumn>
                            </AFDataTable>
                        ),
                        [
                            datasTBL_KSV_INVOICE_MST1,
                            selectedTBL_KSV_INVOICE_MST1,
                            handleSelectionChangeTBL_KSV_INVOICE_MST1,
                            handleRowClickTBL_KSV_INVOICE_MST1,
                        ],
                    )}
                </div>
                <div
                    className="af-div-second"
                    style={{ width: "39rem", height: "3rem" }}
                >
                    <span className="af-span-3" style={{ width: "31rem" }}>
                        <p className="af-span-p" style={{ width: "10rem" }}>Bal Amt($)</p>
                        <div className="af-span-div" style={{ width: "20rem" }}>
                            <InputText
                                disabled
                                style={{ width: "18rem" }}
                                id="id_DEBIT_NO"
                                value={dataETC_BAL}
                                onChange={(e) => setDataETC_BAL(e.target.value)}
                            />
                        </div>
                    </span>
                </div>
            </div>
            */}

            <div
                className="af-div-first"
                style={{ width: "123rem", height: "25rem" }}
            >
                {useMemo(
                    () => (
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
                            onSelectionChange={handleSelectionChangeTBL_KSV_INVOICE_MST}
                            onRowClick={handleRowClickTBL_KSV_INVOICE_MST}
                            dataKey="id"
                            className="datatable-responsive"
                            virtualScrollerOptions={{ itemSize: 20 }}
                            emptyMessage=" "
                            responsiveLayout="scroll"
                            scrollable
                            scrollHeight="273px"
                        >
                            <AFColumn selectionMode="multiple" field="__checkbox__" reorderable={false} headerClassName="t-header" headerStyle={{ width: "3rem" }}></AFColumn>
                            <AFColumn field="CRDB_CD" headerClassName="t-header" header="Number" style={{ width: "8rem", height: "1.8rem", flexBasis: "auto" }}></AFColumn>
                            <AFColumn field="CRDB_SEQ" headerClassName="t-header" header="Seq" style={{ width: "3rem", height: "1.8rem", flexBasis: "auto" }}></AFColumn>
                            <AFColumn field="CRDB_DATE" headerClassName="t-header" header="Date Of" style={{ width: "7rem", height: "1.8rem", flexBasis: "auto" }} body={(rowData) => serviceLib.dateFormatHMS(rowData.CRDB_DATE)}></AFColumn>
                            <AFColumn field="MESSER" headerClassName="t-header" header="Bill To" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto" }}></AFColumn>
                            <AFColumn field="CURR_CD" headerClassName="t-header" header="Curr" style={{ width: "3rem", height: "1.8rem", flexBasis: "auto" }}></AFColumn>
                            <AFColumn field="CRDB_AMT" headerClassName="t-header" header="Amt" style={{ width: "8rem", height: "1.8rem", flexBasis: "auto" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.CRDB_AMT, 2)}></AFColumn>
                            <AFColumn field="VAT" headerClassName="t-header" header="VAT" style={{ width: "7rem", height: "1.8rem", flexBasis: "auto" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.VAT, 2)}></AFColumn>
                            <AFColumn field="TOTAL_AMT" headerClassName="t-header" header="Total Amt" style={{ width: "8rem", height: "1.8rem", flexBasis: "auto" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(parseFloat(rowData.CRDB_AMT || 0) + parseFloat(rowData.VAT || 0), 2)}></AFColumn>
                            <AFColumn field="END_AMT" headerClassName="t-header" header="End Amt" style={{ width: "8rem", height: "1.8rem", flexBasis: "auto" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.END_AMT, 2)}></AFColumn>
                            <AFColumn field="BALANCE" headerClassName="t-header" header="Balance" style={{ width: "8rem", height: "1.8rem", flexBasis: "auto" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.BALANCE, 2)}></AFColumn>
                            <AFColumn field="USD_BAL" headerClassName="t-header" header="Usd Bal" style={{ width: "8rem", height: "1.8rem", flexBasis: "auto" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.USD_BAL, 2)}></AFColumn>
                            <AFColumn field="TITLE" headerClassName="t-header" header="Title" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto" }}></AFColumn>
                            <AFColumn field="CHARGER" headerClassName="t-header" header="Charger" style={{ width: "8rem", height: "1.8rem", flexBasis: "auto" }}></AFColumn>
                            <AFColumn field="END_DATE" headerClassName="t-header" header="Exp Date" style={{ width: "6rem", height: "1.8rem", flexBasis: "auto" }} body={(rowData) => serviceLib.dateFormatHMS(rowData.END_DATE)}></AFColumn>
                            <AFColumn field="REMARK" headerClassName="t-header" header="Remark" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto" }}></AFColumn>
                            <AFColumn field="STATUS" headerClassName="t-header" header="Status" style={{ width: "6rem", height: "1.8rem", flexBasis: "auto" }} body={(rowData) => rowData.STATUS}></AFColumn>
                            <AFColumn field="GW_STATUS" headerClassName="t-header" header="GW" style={{ width: "6rem", height: "1.8rem", flexBasis: "auto" }}></AFColumn>
                            <AFColumn field="CA_NO" headerClassName="t-header" header="CA#" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto" }}></AFColumn>
                            <AFColumn field="PO_CD" headerClassName="t-header" header="Po" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto" }}></AFColumn>
                            <AFColumn field="ORDER_CD" headerClassName="t-header" header="Order" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto" }}></AFColumn>
                            <AFColumn field="BANK_CD" headerClassName="t-header" header="Bank" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto" }}></AFColumn>
                            <AFColumn field="MESSER_CD" headerClassName="t-header" header="Messer" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto" }}></AFColumn>
                            {/*<AFColumn field="STATUS_CD" headerClassName="t-header" header="Status" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto" }}></AFColumn>*/}
                            <AFColumn field="BUYER_CD" headerClassName="t-header" header="Buyer" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto" }}></AFColumn>
                            <AFColumn field="BUYER_NAME" headerClassName="t-header" header="Buyer.N" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto" }}></AFColumn>
                            <AFColumn field="PAYMENT_PLAN" headerClassName="t-header" header="Payment" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto" }}></AFColumn>
                            {/*<AFColumn field="APPROKEY" headerClassName="t-header" header="GW.Key" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto" }}></AFColumn>
                            <AFColumn field="DOCU_NO" headerClassName="t-header" header="Docu#" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto" }}></AFColumn>*/}
                            <AFColumn field="END_USER" headerClassName="t-header" header="End User" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto" }}></AFColumn>
                            <AFColumn field="REG_USER" headerClassName="t-header" header="Reg User" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto" }}></AFColumn>
                            {/*<AFColumn field="DEBIT_TYPE" headerClassName="t-header" header="Debit.T" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto" }}></AFColumn>*/}
                            <AFColumn field="DEBIT_TYPE_NAME" headerClassName="t-header" header="Debit.T.N" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto" }}></AFColumn>
                            <AFColumn field="LINK_TO" headerClassName="t-header" header="Link To" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto" }}></AFColumn>
                            <AFColumn field="END_DATE2" headerClassName="t-header" header="End.Date2" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto" }} body={(rowData) => serviceLib.dateFormatHMS(rowData.END_DATE2)}></AFColumn>
                            <AFColumn field="BUYER_TEAM" headerClassName="t-header" header="Buyer.Team" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto" }}></AFColumn>
                            <AFColumn field="CONF_USER" headerClassName="t-header" header="Conf.User" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto" }}></AFColumn>
                            <AFColumn field="END_TYPE" headerClassName="t-header" header="End.Type" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto" }}></AFColumn>
                            <AFColumn field="END_TYPE_NAME" headerClassName="t-header" header="End.Type.N" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto" }}></AFColumn>
                        </AFDataTable>
                    ),
                    [
                        datasTBL_KSV_INVOICE_MST,
                        loadingTBL_KSV_INVOICE_MST,
                        selectedTBL_KSV_INVOICE_MST,
                        handleSelectionChangeTBL_KSV_INVOICE_MST,
                        handleRowClickTBL_KSV_INVOICE_MST,
                        serviceLib,
                    ],
                )}
            </div>

            <div
                className="af-div-first"
                style={{
                    width: "123rem",
                    height: "14rem",
                    display: "flex",
                    gap: "0.5rem",
                    alignItems: "flex-start",
                    flexWrap: "nowrap",
                    overflow: "hidden",
                }}
            >
                <div
                    className="af-div-first af-grid-container s0701-compact-grid"
                    style={{
                        width: "80rem",
                        minWidth: "70rem",
                        maxWidth: "70rem",
                        height: "14rem",
                        boxSizing: "border-box",
                    }}
                >
                    {/* 1행 */}
                    <div className="af-grid-item">
                    <label className="af-label"> Credit# </label>
                    <InputText
                        className="af-input"
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

                    <div className="af-grid-item">
                    <label className="af-label"> Buyer </label>
                    <Dropdown
                        className="af-input"
                        id="id_BUYER_CD"
                        value={dataEDT_KSV_INVOICE_MST1_BUYER_CD}
                        onChange={(e) =>
                            onDropdownChangeEDT_KSV_INVOICE_MST1_BUYER_CD(
                                e,
                                "BUYER_CD",
                            )
                        }
                        options={datasEDT_KSV_INVOICE_MST1_BUYER_CD}
                        optionLabel="BUYER_NAME"
                        editable
                        filter
                        onKeyPress={(e) => onKeyPress_COMM_EDT(e, "BUYER_CD")}
                    />
                    </div>

                    <div className="af-grid-item">
                    <label className="af-label"> Status </label>
                    <Dropdown
                        className="af-input"
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
                        editable
                    />
                    </div>

                    <div className="af-grid-item">
                    <label className="af-label"> Charger </label>
                    <InputText
                        className="af-input"
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

                    <div className="af-grid-item">
                    <label className="af-label"> End Type </label>
                    <Dropdown
                        className="af-input"
                        id="id_END_TYPE"
                        value={dataEDT_KSV_INVOICE_MST1.END_TYPE}
                        onChange={(e) =>
                            onDropdownChangeEDT_KSV_INVOICE_MST1_END_TYPE(
                                e,
                                "END_TYPE",
                            )
                        }
                        options={datasEDT_KSV_INVOICE_MST1_END_TYPE}
                        optionLabel="CD_NAME"
                        editable
                    />
                    </div>

                    <div className="af-grid-item">
                    <label className="af-label"> Issue Date </label>
                    <Calendar
                        className="af-input"
                        showButtonBar
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

                    <div className="af-grid-item">
                    <label className="af-label"> Type </label>
                    <Dropdown
                        className="af-input"
                        id="id_DEBIT_TYPE"
                        value={dataEDT_KSV_INVOICE_MST1.DEBIT_TYPE}
                        onChange={(e) =>
                            onDropdownChangeEDT_KSV_INVOICE_MST1_DEBIT_TYPE(
                                e,
                                "DEBIT_TYPE",
                            )
                        }
                        options={datasEDT_KSV_INVOICE_MST1_DEBIT_TYPE}
                        optionLabel="CD_NAME"
                        editable
                    />
                    </div>

                    <div className="af-grid-item">
                    <label className="af-label">
                        Amt
                    </label>
                    <div className="af-input-group">
                        <InputText
                            className=""
                            style={{ width: "5rem" }}
                            id="id_PAY_AMT"
                            value={dataEDT_KSV_INVOICE_MST1.PAY_AMT}
                            onChange={(e) =>
                                onInputChangeEDT_KSV_INVOICE_MST1_PAY_AMT(
                                    e,
                                    "PAY_AMT",
                                )
                            }
                        />

                        <Dropdown
                            className=""
                            style={{ width: "5rem" }}
                            id="id_PAY_TYPE"
                            value={dataEDT_KSV_INVOICE_MST1.PAY_CURR_CD}
                            onChange={(e) =>
                                onDropdownChangeEDT_KSV_INVOICE_MST1_PAY_CURR_CD(
                                    e,
                                    "PAY_CURR_CD",
                                )
                            }
                            options={datasEDT_KSV_INVOICE_MST1_PAY_CURR_CD}
                            optionLabel="CD_NAME"
                            editable
                        />
                        
                    </div>
                    </div>

                    {/* 3행 */}
                    <div className="af-grid-item">
                    <label className="af-label"> Bill to </label>
                    <Dropdown
                        style={{ width: "100%" }}
                        className="af-input"
                        id="id_PAY_TO"
                        value={dataEDT_KSV_INVOICE_MST1_PAY_TO}
                        onChange={(e) =>
                            onDropdownChangeEDT_KSV_INVOICE_MST1_PAY_TO(
                                e,
                                "PAY_TO",
                            )
                        }
                        options={datasEDT_KSV_INVOICE_MST1_PAY_TO}
                        optionLabel="COM_NAME"
                        filter
                    />
                    </div>

                    <div className="af-grid-item">
                    <label className="af-label"> Pay Date </label>
                    <Calendar
                        className="af-input"
                        showButtonBar
                        dateFormat="yy-mm-dd"
                        id="id_EXP_DATE"
                        value={changeDateVal(dataEDT_KSV_INVOICE_MST1.EXP_DATE)}
                        onChange={(e) =>
                            onCalChangeEDT_KSV_INVOICE_MST1_EXP_DATE(
                                e,
                                "EXP_DATE",
                            )
                        }
                    />
                    </div>

                    <div className="af-grid-item">
                    <label className="af-label"> Title </label>
                    <InputText
                        className="af-input"
                        id="id_TITLE"
                        value={dataEDT_KSV_INVOICE_MST1.TITLE}
                        onChange={(e) =>
                            onInputChangeEDT_KSV_INVOICE_MST1_TITLE(e, "TITLE")
                        }
                    />
                    </div>

                    <div className="af-grid-item">
                    <label className="af-label"> VAT </label>
                        <InputText
                            className="af-input"
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

                    {/* 4행 */}
                    <div className="af-grid-item af-span-2">
                    <label className="af-label"> Pay Plan </label>
                    <InputText
                        className="af-input"
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

                    <div className="af-grid-item">
                    <label className="af-label"> PO# </label>
                    <Dropdown
                        className="af-input"
                        id="id_PO_CD"
                        value={dataEDT_KSV_INVOICE_MST1.PO_CD}
                        onChange={(e) =>
                            onDropdownChangeEDT_KSV_INVOICE_MST1_PO_CD(
                                e,
                                "PO_CD",
                            )
                        }
                        options={datasEDT_KSV_INVOICE_MST1_PO_CD}
                        optionLabel="PO_CD"
                        optionValue="PO_CD"
                        filter
                        editable
                    />
                    </div>

                    <div className="af-grid-item">
                    <label className="af-label"> Order# </label>
                    <Dropdown
                        className="af-input"
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
                        editable
                    />
                    </div>

                    <div className="af-grid-item af-span-2">
                    <label className="af-label"> Remark </label>
                    <InputText
                        className="af-input"
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

                    {/* 5행 */}
                    <div className="af-grid-item">
                    <label className="af-label"> Remark(A) </label>
                    <InputText
                        className="af-input"
                        id="id_REMARK_A"
                        value={dataEDT_KSV_INVOICE_MST1.REMARK_A}
                        onChange={(e) =>
                            onInputChangeEDT_KSV_INVOICE_MST1_REMARK(
                                e,
                                "REMARK_A",
                            )
                        }
                    />
                    </div>

                    <div className="af-grid-item">
                    <label className="af-label"> GW </label>
                    <InputText
                        className="af-input"
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
                </div>

                <div
                    className="af-div-first"
                    style={{
                        width: "52rem",
                        minWidth: "52rem",
                        maxWidth: "52rem",
                        height: "10rem",
                        boxSizing: "border-box",
                        paddingTop: "0.5rem",
                    }}
                >
                    {useMemo(
                        () => (
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
                                onSelectionChange={handleSelectionChangeTBL_KSV_INVOICE_MST2}
                                onRowClick={handleRowClickTBL_KSV_INVOICE_MST2}
                                dataKey="id"
                                className="datatable-responsive"
                                virtualScrollerOptions={{ itemSize: 20 }}
                                emptyMessage=" "
                                responsiveLayout="scroll"
                                scrollable
                                scrollHeight="13rem"
                            >
                                <AFColumn field="END_DATE" headerClassName="t-header" header="End Date" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto" }} body={(rowData) => serviceLib.dateFormatHMS(rowData.END_DATE)}></AFColumn>
                                <AFColumn field="CRDB_AMT" headerClassName="t-header" header="End Amt" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.CRDB_AMT, 2)}></AFColumn>
                                <AFColumn field="REF_NO" headerClassName="t-header" header="Ref#" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto" }}></AFColumn>
                                <AFColumn field="REG_DATETIME" headerClassName="t-header" header="RegDate" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto" }} body={(rowData) => serviceLib.dateFormatHMS(rowData.REG_DATETIME)}></AFColumn>
                            </AFDataTable>
                        ),
                        [
                            datasTBL_KSV_INVOICE_MST2,
                            selectedTBL_KSV_INVOICE_MST2,
                            handleSelectionChangeTBL_KSV_INVOICE_MST2,
                            handleRowClickTBL_KSV_INVOICE_MST2,
                            serviceLib,
                        ],
                    )}

                    <div
                        className="af-div-first"
                        style={{
                            width: "52rem",
                            height: "6rem",
                            marginTop: '-0.5rem',
                        }}
                    >
                        <div
                            className="af-div-second"
                            style={{ width: "60rem", height: "6rem" }}
                        >
                            <span className="af-span-3" style={{ width: "16rem" }}>
                                <p className="af-span-p" style={{ width: "7rem" }}>End Type</p>
                                <div className="af-span-div" style={{ width: "8rem" }}>
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
                            <span className="af-span-3" style={{ width: "9rem" }}>
                                <div
                                    className="af-span-div-btn"
                                    style={{ width: "8rem" }}
                                >
                                    <Button
                                        label="ET Upd"
                                        style={{ width: "8rem" }}
                                        className="p-button-text"
                                        onClick={process_UPDATE_END_TYPE}
                                    />
                                </div>
                            </span>

                            <span className="af-span-3" style={{ width: "12.5rem" }}>
                                <p className="af-span-p" style={{ width: "5rem" }}>End Date</p>
                                <div className="af-span-div" style={{ width: "7rem" }}>
                                    <Calendar
                                        showButtonBar
                                        style={{ width: "7rem" }}
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
                            <span className="af-span-3" style={{ width: "9.5rem" }}>
                                <p className="af-span-p" style={{ width: "3rem" }}>Amt</p>
                                <div className="af-span-div" style={{ width: "6rem" }}>
                                    <InputText
                                        style={{ width: "6rem" }}
                                        id="id_AMT"
                                        value={dataEDT_KSV_INVOICE_MST2.AMT}
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
                </div>
            </div>

            <div
                className="af-div-first"
                style={{ width: "123rem", height: "3rem" }}
            >
                <span className="af-span-3" style={{ width: "11rem" }}>
                    <div className="af-span-div-btn" style={{ width: "10rem" }}>
                        <Button
                            style={{ width: "10rem" }}
                            label="Insert"
                            className="p-button-text"
                            onClick={process_INSERT_CREDIT_NOTE}
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "11rem" }}>
                    <div className="af-span-div-btn" style={{ width: "10rem" }}>
                        <Button
                            style={{ width: "10rem" }}
                            label="Update"
                            className="p-button-text"
                            onClick={process_UPDATE_CREDIT_NOTE}
                            disabled={disableUpdateButton}
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "11rem" }}>
                    <div className="af-span-div-btn" style={{ width: "10rem" }}>
                        <Button
                            style={{ width: "10rem" }}
                            label="Copy"
                            className="p-button-text"
                            onClick={process_COPY_CREDIT_NOTE}
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "11rem" }}>
                    <div className="af-span-div-btn" style={{ width: "10rem" }}>
                        <Button
                            style={{ width: "10rem" }}
                            label="Cancel"
                            className="p-button-text"
                            onClick={process_CANCEL_CREDIT_NOTE}
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "11rem" }}>
                    <div className="af-span-div-btn" style={{ width: "10rem" }}>
                        <Button
                            style={{ width: "10rem" }}
                            label="Reset"
                            className="p-button-text"
                            onClick={resetEDT_KSV_INVOICE_MST1}
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
                            onClick={process_END_CREDIT_NOTE}
                            disabled={!enableEndButton}
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

            <Toast ref={toast} />
        </div>
    );
};

const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(S0701_CREDIT_NOTE, comparisonFn);
