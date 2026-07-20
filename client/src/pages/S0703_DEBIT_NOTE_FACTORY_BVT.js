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
import { ServiceS0703_DEBIT_NOTE_FACTORY_BVT } from "../service/service_biz/ServiceS0703_DEBIT_NOTE_FACTORY_BVT";
import { ServiceS0701_CREDIT_NOTE } from "../service/service_biz/ServiceS0701_CREDIT_NOTE";

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
    STATUS_CD: "",
    BILL_TO: "",
    CHARGER: "",
    TEAM: "",

    TITLE: "",
    BUYER_CD: "",
    CRDB_CD: "",
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

const emptyTBL_KSV_INVOICE_MST3 = {
    id: 0,
    NUMBER: "",
    PAY_TO: "",
    PAY_AMT: "",
    DATE_OF_ISSUE: "",
};

const emptyEDT_KSV_INVOICE_MST1 = {
    DEBIT_NO: "",
    END_TYPE: "",
    DATE_OF_ISSUE: "",
    CHARGER: "",
    BUYER_CD: "",
    TITLE: "",
    REMARK: "",
    REMARK_S: "",
    PAY_AMT: "",
    BAL_AMT: "",
    PAY_CURR_CD: "",
    STATUS_CD: "",
    CONFIRM_USER: "",

    LINK_TO: "",
    DEBIT_TYPE: "",
    PAY_TO: "",
    EXP_DATE: "",
    BANK_CD: "",
    PAYMENT_PLAN: "",
    PAY_TYPE: "",
    VAT_AMT: "",
    PO_CD: "",
    ORDER_CD: "",
    GW_CODE: "",
    BL_NO: "",
    CBM: "",
    WEIGHT: "",
    TRANSPORT: "",
    FREIGHT: "",
};

const emptyEDT_KSV_INVOICE_MST2 = {
    END_TYPE: "",
    END_DATE: "",
    AMT: "",
};

const emptyEDT_KSV_INVOICE_MST3 = {
    CRDB_DATE: "",
};

const S0703_DEBIT_NOTE_FACTORY_BVT = () => {
    const serviceLibRef = useRef(null);
    if (!serviceLibRef.current) {
        serviceLibRef.current = new ServiceLib();
        serviceLibRef.current.loginConfirm();
    }
    const serviceLib = serviceLibRef.current;
    const serviceS0703_DEBIT_NOTE_FACTORY_BVT =
        new ServiceS0703_DEBIT_NOTE_FACTORY_BVT();
    const serviceS0701_CREDIT_NOTERef = useRef(null);
    if (!serviceS0701_CREDIT_NOTERef.current) serviceS0701_CREDIT_NOTERef.current = new ServiceS0701_CREDIT_NOTE();
    const serviceS0701_CREDIT_NOTE = serviceS0701_CREDIT_NOTERef.current;

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
        setDataQRY_KSV_INVOICE_MST(tObj0);

        setDataQRY_KSV_INVOICE_MST_PAY_TO(datasQRY_KSV_INVOICE_MST_PAY_TO[0]);
        setDataQRY_KSV_INVOICE_MST_BILL_TO(datasQRY_KSV_INVOICE_MST_BILL_TO[0]);
        setDataQRY_KSV_INVOICE_MST_CHARGER(datasQRY_KSV_INVOICE_MST_CHARGER[0]);
        setDataQRY_KSV_INVOICE_MST_STATUS_CD(
            datasQRY_KSV_INVOICE_MST_STATUS_CD[0],
        );
        setDataQRY_KSV_INVOICE_MST_BUYER_CD(
            datasQRY_KSV_INVOICE_MST_BUYER_CD[0],
        );
    };

    const process_INSERT_DEBIT_NOTE_FACTORY_BVT = () => {
        var tObj = { ...dataEDT_KSV_INVOICE_MST1 };
        var tUserInfo = serviceLib.getUserInfo();
        tObj.USER_ID = tUserInfo.USER_ID;

        tObj.DEBIT_NO = "";

        if (tObj.PAY_AMT === "" || parseFloat(tObj.PAY_AMT) <= 0) {
            alert("청구액은 필수 입력 사항입니다.<br><br>Charge amount is required.");
            return;
        }
        if (tObj.PAY_CURR_CD === "") {
            alert("통화는 필수 입력 사항입니다.<br><br>Currency is required.");
            return;
        }

        if (tObj.DEBIT_TYPE === "") {
            alert("DEBIT TYPE은 필수 입력 사항입니다.<br><br>DEBIT TYPE is required.");
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
        serviceS0703_DEBIT_NOTE_FACTORY_BVT
            .mgrUpdate_INSERT_DEBIT_NOTE_FACTORY_BVT(tObj)
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
                                tObj2.PO_CD = "";
                                tObj2.ORDER_CD = "";
                                search_LIST_1_BY_NUMBER(tObj2);
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

    const process_CANCEL_DEBIT_NOTE_FACTORY_BVT = () => {
        var tObj = { ...dataEDT_KSV_INVOICE_MST1 };
        var tUserInfo = serviceLib.getUserInfo();
        tObj.USER_ID = tUserInfo.USER_ID;

        // setDatasTBL_KSV_INVOICE_MST([]);
        // setSelectedTBL_KSV_INVOICE_MST([]);

        // 2
        setLoadingTBL_KSV_INVOICE_MST(true);
        serviceS0703_DEBIT_NOTE_FACTORY_BVT
            .mgrUpdate_CANCEL_DEBIT_NOTE_FACTORY_BVT(tObj)
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

    const process_UPDATE_DEBIT_NOTE_FACTORY_BVT = () => {
        var tObj = { ...dataEDT_KSV_INVOICE_MST1 };
        if (tObj.DEBIT_NO === "") {
            alert("CRDB_NO가 없습니다<br><br>CRDB_NO does not exist");
            return;
        }
        if (tObj.LINK_TO === "") {
            alert("Link To가 없습니다<br><br>There is no Link To");
            return;
        }

        if (tObj.DEBIT_TYPE === "") {
            alert("DEBIT TYPE은 필수 입력 사항입니다.<br><br>DEBIT TYPE is required.");
            return;
        }

        if (tObj.GW_CODE) {
            alert("상신중인 데이타는 수정할수 없습니다.<br><br>Data in progress cannot be modified.");
            return;
        }

        // setDatasTBL_KSV_INVOICE_MST([]);
        // setSelectedTBL_KSV_INVOICE_MST([]);

        // 2
        setLoadingTBL_KSV_INVOICE_MST(true);
        serviceS0703_DEBIT_NOTE_FACTORY_BVT
            .mgrUpdate_UPDATE_DEBIT_NOTE_FACTORY_BVT(tObj)
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
                                tObj2.DEBIT_NO = tObj.DEBIT_NO;
                                tObj2.PO_CD = "";
                                tObj2.ORDER_CD = "";
                                search_LIST_1_BY_NUMBER(tObj2);
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

    const process_CONFIRM_DEBIT_NOTE_FACTORY_BVT = () => {
        const debitTypeCode = String(
            (dataEDT_KSV_INVOICE_MST1 && dataEDT_KSV_INVOICE_MST1.DEBIT_TYPE) ||
                (dataTBL_KSV_INVOICE_MST && dataTBL_KSV_INVOICE_MST.DEBIT_TYPE) ||
                (dataEDT_KSV_INVOICE_MST1_DEBIT_TYPE &&
                    dataEDT_KSV_INVOICE_MST1_DEBIT_TYPE.CD_CODE) ||
                "",
        ).trim();
        const debitTypeName = String(
            (dataTBL_KSV_INVOICE_MST &&
                dataTBL_KSV_INVOICE_MST.DEBIT_TYPE_NAME) ||
                (dataEDT_KSV_INVOICE_MST1_DEBIT_TYPE &&
                    dataEDT_KSV_INVOICE_MST1_DEBIT_TYPE.CD_NAME) ||
                "",
        )
            .trim()
            .toUpperCase();
        const isNormalType = debitTypeCode === "1" || debitTypeName === "NORMAL";
        if (!isNormalType) {
            alert(
                "NORMAL type인 경우에만 Confirm 할 수 있습니다.<br><br>Confirm is allowed only for NORMAL type.",
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

        // 2
        setLoadingTBL_KSV_INVOICE_MST(true);
        serviceS0703_DEBIT_NOTE_FACTORY_BVT
            .mgrUpdate_UPDATE_CONFIRM(tInArray)
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

    const popup_UPDATE_CRDB_DATE = () => {
        var tArray  = [];
        selectedTBL_KSV_INVOICE_MST.forEach((col, i) => {
            var tOne = {};
            tOne.CRDB_CD = col.CRDB_CD;
            tOne.MESSER = col.MESSER;
            tOne.CRDB_AMT = col.CRDB_AMT;
            tOne.CRDB_DATE = col.CRDB_DATE;
            tArray.push(tOne);
        });

        setDatasTBL_KSV_INVOICE_MST3(tArray);
        setCreateDialog(true);
    };


    const process_UPDATE_CRDB_DATE = () => {

        var tInObjs = [];
        var chk = 0;

        alert (`${dataEDT_KSV_INVOICE_MST3.CRDB_DATE}`);

        selectedTBL_KSV_INVOICE_MST.forEach((col, i) => {
            var tOne = {};
            tOne.CRDB_CD = col.CRDB_CD;
            tOne.CRDB_DATE = dataEDT_KSV_INVOICE_MST3.CRDB_DATE;
            tInObjs.push(tOne);
            if (!tOne.CRDB_DATE) chk = 1;
        });
        if (chk > 0) {
            alert(`You must input issue date for update`);
            return;
        }

        // 2
        setLoadingTBL_KSV_INVOICE_MST(true);
        serviceS0703_DEBIT_NOTE_FACTORY_BVT
            .mgrUpdate_UPDATE_CRDB_DATE(tInObjs)
            .then((data) => {
                setLoadingTBL_KSV_INVOICE_MST(false);
                if (typeof data.graphQLErrors === "undefined") {
                    // console.log("ServiceMgrKCD_BUYER.mgr1KcdStyle call => " + data.length);
                    if (data.length > 0) {
                        alert(data[0].CODE);
                        if (data[0].CODE.includes('SUCC')) {
                            setCreateDialog(false);
                            setSelectedTBL_KSV_INVOICE_MST([]);
                            search_LIST_1();
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

    const process_END_DEBIT_NOTE_FACTORY_BVT = () => {
        var tObj = { ...dataEDT_KSV_INVOICE_MST1 };
        var tUserInfo = serviceLib.getUserInfo();
        tObj.USER_ID = tUserInfo.USER_ID;

        var tObj1 = { ...dataEDT_KSV_INVOICE_MST2 };

        let selectedItem = selectedTBL_KSV_INVOICE_MST.map(
            ({ id, __typename, ...rest }) => rest,
        );

        setLoadingTBL_KSV_INVOICE_MST(true);
        serviceS0703_DEBIT_NOTE_FACTORY_BVT
            .mgrUpdate_END_DEBIT_NOTE_FACTORY_BVT(tObj, tObj1, selectedItem)
            .then((data) => {
                setLoadingTBL_KSV_INVOICE_MST(false);
                if (typeof data.graphQLErrors === "undefined") {
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
        var tObj1 = { ...dataEDT_KSV_INVOICE_MST2 };
        var tUserInfo = serviceLib.getUserInfo();
        tObj.USER_ID = tUserInfo.USER_ID;

        let selectedItem = selectedTBL_KSV_INVOICE_MST.map(
            ({ id, __typename, ...rest }) => rest,
        );

        setLoadingTBL_KSV_INVOICE_MST2(true);
        serviceS0703_DEBIT_NOTE_FACTORY_BVT
            .mgrUpdate_CANCEL_END_CREDIT(tObj, tObj1, selectedItem)
            .then((data) => {
                setLoadingTBL_KSV_INVOICE_MST2(false);
                if (typeof data.graphQLErrors === "undefined") {
                    // console.log("ServiceMgrKCD_BUYER.mgr1KcdStyle call => " + data.length);
                    if (data.length > 0) {
                        alert(data[0].CODE);
                    }
                    search_LIST_1(tObj);
                    search_LIST_2(tObj);
                } else {
                    console.log(
                        "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });
    };

    const GW_WINDOW_NAME = "GW_DEBIT_BVT_POPUP";
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
        serviceS0703_DEBIT_NOTE_FACTORY_BVT
            .mgrQuery_REPORT(tArray)
            .then((data) => {
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

    const search_CODE = (argData, argMode) => {
        var _tObj = { ...argData };
        serviceS0703_DEBIT_NOTE_FACTORY_BVT
            .mgrQuery_CODE(_tObj)
            .then((data) => {
                if (typeof data.graphQLErrors === "undefined") {
                    if (argMode === "") {
                        setDatasQRY_KSV_INVOICE_MST_PAY_TO(data.MESSER);
                        setDataQRY_KSV_INVOICE_MST_PAY_TO(data.MESSER[0]);

                        setDatasQRY_KSV_INVOICE_MST_BILL_TO(data.MESSER);
                        setDataQRY_KSV_INVOICE_MST_BILL_TO(data.MESSER[0]);

                        setDatasQRY_KSV_INVOICE_MST_CHARGER(data.USER);
                        setDataQRY_KSV_INVOICE_MST_CHARGER(data.USER[0]);

                        setDatasQRY_KSV_INVOICE_MST_STATUS_CD(
                            data.DEBIT_STATUS,
                        );
                        setDataQRY_KSV_INVOICE_MST_STATUS_CD(
                            data.DEBIT_STATUS[0],
                        );

                        setDatasQRY_KSV_INVOICE_MST_BUYER_CD(data.BUYER3);
                        setDataQRY_KSV_INVOICE_MST_BUYER_CD(data.BUYER3[0]);

                        setDatasEDT_KSV_INVOICE_MST1_BUYER_CD(data.BUYER3);
                        setDataEDT_KSV_INVOICE_MST1_BUYER_CD(data.BUYER3[0]);

                        setDatasEDT_KSV_INVOICE_MST1_STATUS_CD(
                            data.DEBIT_STATUS,
                        );
                        setDataEDT_KSV_INVOICE_MST1_STATUS_CD(
                            data.DEBIT_STATUS[0],
                        );

                        setDatasEDT_KSV_INVOICE_MST1_LINK_TO(data.FACTORY);
                        setDataEDT_KSV_INVOICE_MST1_LINK_TO(data.FACTORY[0]);

                        setDatasEDT_KSV_INVOICE_MST1_DEBIT_TYPE(
                            data.DEBIT_TYPE,
                        );
                        setDataEDT_KSV_INVOICE_MST1_DEBIT_TYPE(
                            data.DEBIT_TYPE[0],
                        );

                        setDatasEDT_KSV_INVOICE_MST1_PAY_TO(data.MESSER);
                        setDataEDT_KSV_INVOICE_MST1_PAY_TO(data.MESSER[0]);

                        setDatasEDT_KSV_INVOICE_MST1_BANK_CD(data.BANK);
                        setDataEDT_KSV_INVOICE_MST1_BANK_CD(data.BANK[0]);

                        setDatasEDT_KSV_INVOICE_MST1_END_TYPE(
                            data.CREDIT_END_TYPE,
                        );
                        setDataEDT_KSV_INVOICE_MST1_END_TYPE(
                            data.CREDIT_END_TYPE[0],
                        );

                        setDatasEDT_KSV_INVOICE_MST1_PAY_CURR_CD(data.CURR_CD);
                        setDataEDT_KSV_INVOICE_MST1_PAY_CURR_CD(
                            data.CURR_CD[0],
                        );

                        setDatasEDT_KSV_INVOICE_MST2_END_TYPE(
                            data.CREDIT_END_TYPE,
                        );
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
        serviceS0703_DEBIT_NOTE_FACTORY_BVT
            .mgrQuery_CODE1(_tObj)
            .then((data) => {
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
        serviceS0703_DEBIT_NOTE_FACTORY_BVT
            .mgrQuery_QRY_BANK(tObj)
            .then((data) => {
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
        setSelectedTBL_KSV_INVOICE_MST([]);

        // 2
        setLoadingTBL_KSV_INVOICE_MST(true);
        serviceS0703_DEBIT_NOTE_FACTORY_BVT
            .mgrQuery_LIST_1(tObj)
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

    const search_LIST_1_BY_NUMBER = (argData) => {
        var tObj = { ...dataQRY_KSV_INVOICE_MST1 };

        if (argData && argData.DEBIT_NO) {
            tObj = {};
            tObj.DEBIT_NO = argData.DEBIT_NO;
        }

        setDatasTBL_KSV_INVOICE_MST([]);
        // setSelectedTBL_KSV_INVOICE_MST([]);

        // 2
        setLoadingTBL_KSV_INVOICE_MST(true);
        serviceS0703_DEBIT_NOTE_FACTORY_BVT
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

        // 2
        serviceS0703_DEBIT_NOTE_FACTORY_BVT
            .mgrQuery_LIST_2(tObj)
            .then((data) => {
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
        let val = (e.value && e.value.BUYER_CD) || "";

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

    const onInputChangeQRY_KSV_INVOICE_MST_TEAM = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_INVOICE_MST = { ...dataQRY_KSV_INVOICE_MST };

        let tTypeVal = _dataQRY_KSV_INVOICE_MST[`${name}`];
        if (typeof tTypeVal === "string")
            _dataQRY_KSV_INVOICE_MST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_INVOICE_MST[`${name}`] = parseInt(val);

        setDataQRY_KSV_INVOICE_MST(_dataQRY_KSV_INVOICE_MST);
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

    const onInputChangeQRY_KSV_INVOICE_MST_CRDB_CD = (e, name) => {
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

    /* QRY KSV_INVOICE_MST1*/
    const [dataQRY_KSV_INVOICE_MST1, setDataQRY_KSV_INVOICE_MST1] = useState(
        emptyQRY_KSV_INVOICE_MST1,
    );

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

    const onRowClick1TBL_KSV_INVOICE_MST = (argData0, selectedRows) => {
        var argData = {};

        if (typeof argData0.length !== "undefined") {
            argData = argData0[0];
        } else {
            argData = argData0;
        }

        if (!argData) return;

        console.log(selectedRows);
        if (selectedRows.length > 1) {
            resetEDT_KSV_INVOICE_MST1();
            return;
        }

        let argTBL_KSV_INVOICE_MST = argData;

        setDataTBL_KSV_INVOICE_MST(argTBL_KSV_INVOICE_MST);

        datasetEDT_KSV_INVOICE_MST1(argData);

        var tObj = { ...dataEDT_KSV_INVOICE_MST2 };
        tObj.AMT = String(argData.BALANCE);
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

        setDataETC_BAL(argData.BALANCE);
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
            tObj.Pay_Amt = Number(col.CRDB_AMT);
            tObj.Balance = Number(col.BALANCE);
            tObj.Curr = col.CURR_CD;
            tObj.Usd_Bal = Number(col.USD_BAL);
            tObj.Title = col.TITLE;
            tObj.Charger = col.CHARGER;
            tObj.Exp_Date = col.END_DATE;
            tObj.Remark = col.REMARK;
            //tObj.Status = col.STATUS;
            tObj.Status = col.CREDIT_STATUS;
            tObj.GW_Status = col.GW_STATUS;
            tObj.PO = col.PO_CD;
            tObj.Order = col.ORDER_CD;
            tObj.Bank = col.BANK_CD;
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
            saveAsExcelFileTBL_KSV_INVOICE_MST(
                excelBuffer,
                "Debit_Note_List(BVT)",
            );
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

    /**TABLE KSV_INVOICE_MST3 */
    const [createDialog, setCreateDialog] = useState(false);
    const hideDialog = () => {
        setCreateDialog(false);
    };

    // DEFINE DATAGRID : TBL_KSV_INVOICE_MST3
    const [datasTBL_KSV_INVOICE_MST3, setDatasTBL_KSV_INVOICE_MST3] = useState(
        [],
    );
    const dt_TBL_KSV_INVOICE_MST3 = useRef(null);
    const [dataTBL_KSV_INVOICE_MST3, setDataTBL_KSV_INVOICE_MST3] = useState(
        emptyTBL_KSV_INVOICE_MST3,
    );
    const [selectedTBL_KSV_INVOICE_MST3, setSelectedTBL_KSV_INVOICE_MST3] =
        useState([]);
    const [
        flagSelectModeTBL_KSV_INVOICE_MST3,
        setFlagSelectModeTBL_KSV_INVOICE_MST3,
    ] = useState(false);
    const [loadingTBL_KSV_INVOICE_MST3, setLoadingTBL_KSV_INVOICE_MST3] =
        useState(false);
    // DATAGRID CODE : TBL_KSV_INVOICE_MST3

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
        _argData.BL_NO = argData.BL_NO;
        _argData.TRANSPORT = argData.TRANSPORT;
        _argData.FREIGHT = argData.FREIGHT;
        _argData.CBM = argData.CBM;
        _argData.WEIGHT = argData.WEIGHT;
        _argData.REMARK_S = argData.REMARK_S;
        _argData.CONFIRM = argData.CONF_USER;
        setDataEDT_KSV_INVOICE_MST1(_argData);

        var tObj = {};
        datasEDT_KSV_INVOICE_MST1_BUYER_CD.forEach((col, i) => {
            if (col.BUYER_CD === argData.BUYER_CD) tObj = { ...col };
        });
        if (typeof tObj.BUYER_CD !== "undefined") {
            setDataEDT_KSV_INVOICE_MST1_BUYER_CD(tObj);
        } else {
            setDataEDT_KSV_INVOICE_MST1_BUYER_CD(
                datasEDT_KSV_INVOICE_MST1_BUYER_CD[0],
            );
        }

        let tArray1 = [];
        var tObj1 = {};
        tObj1.COM_CD = "";
        tObj1.COM_NAME = " ";
        tArray1.push(tObj1);
        tObj1 = {};
        tObj1.COM_CD = argData.MESSER_CD;
        tObj1.COM_NAME = argData.MESSER;
        tArray1.push(tObj1);
        setDatasEDT_KSV_INVOICE_MST1_PAY_TO(tArray1);
        setDataEDT_KSV_INVOICE_MST1_PAY_TO(tArray1[1]);

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
        editEDT_KSV_INVOICE_MST1_TRANSPORT(argData.TRANSPORT);
        editEDT_KSV_INVOICE_MST1_FREIGHT(argData.FREIGHT);
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

    const onInputChangeEDT_KSV_INVOICE_MST1_REMARK_S = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_INVOICE_MST1 = { ...dataEDT_KSV_INVOICE_MST1 };

        let tTypeVal = _dataEDT_KSV_INVOICE_MST1[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_INVOICE_MST1[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_INVOICE_MST1[`${name}`] = parseInt(val);

        setDataEDT_KSV_INVOICE_MST1(_dataEDT_KSV_INVOICE_MST1);
    };

    const onInputChangeEDT_KSV_INVOICE_MST1_CONFIRM = (e, name) => {
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
        datasEDT_KSV_INVOICE_MST1_TRANSPORT,
        setDatasEDT_KSV_INVOICE_MST1_TRANSPORT,
    ] = useState([]);
    const [
        dataEDT_KSV_INVOICE_MST1_TRANSPORT,
        setDataEDT_KSV_INVOICE_MST1_TRANSPORT,
    ] = useState({});

    const editEDT_KSV_INVOICE_MST1_TRANSPORT = (argValue) => {
        let _dataEDT_KSV_INVOICE_MST1_TRANSPORT =
            datasEDT_KSV_INVOICE_MST1_TRANSPORT.filter(
                (val) => val.CD_CODE === argValue,
            );
        setDataEDT_KSV_INVOICE_MST1_TRANSPORT(
            _dataEDT_KSV_INVOICE_MST1_TRANSPORT[0],
        );
    };

    const [
        datasEDT_KSV_INVOICE_MST1_FREIGHT,
        setDatasEDT_KSV_INVOICE_MST1_FREIGHT,
    ] = useState([]);
    const [
        dataEDT_KSV_INVOICE_MST1_FREIGHT,
        setDataEDT_KSV_INVOICE_MST1_FREIGHT,
    ] = useState({});

    const editEDT_KSV_INVOICE_MST1_FREIGHT = (argValue) => {
        let _dataEDT_KSV_INVOICE_MST1_FREIGHT =
            datasEDT_KSV_INVOICE_MST1_FREIGHT.filter(
                (val) => val.CD_CODE === argValue,
            );
        setDataEDT_KSV_INVOICE_MST1_FREIGHT(
            _dataEDT_KSV_INVOICE_MST1_FREIGHT[0],
        );
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
        //let _dataEDT_KSV_INVOICE_MST1_DEBIT_TYPE1 = datasEDT_KSV_INVOICE_MST1_DEBIT_TYPE.filter(val => val.CD_CODE === argValue);
        setDataEDT_KSV_INVOICE_MST1_DEBIT_TYPE(
            datasEDT_KSV_INVOICE_MST1_DEBIT_TYPE[0],
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

    const [
        datasEDT_KSV_INVOICE_MST1_BANK_CD,
        setDatasEDT_KSV_INVOICE_MST1_BANK_CD,
    ] = useState([]);
    const [
        dataEDT_KSV_INVOICE_MST1_BANK_CD,
        setDataEDT_KSV_INVOICE_MST1_BANK_CD,
    ] = useState({});

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

    const [
        datasEDT_KSV_INVOICE_MST1_PO_CD,
        setDatasEDT_KSV_INVOICE_MST1_PO_CD,
    ] = useState([]);
    const [dataEDT_KSV_INVOICE_MST1_PO_CD, setDataEDT_KSV_INVOICE_MST1_PO_CD] =
        useState({});

    const editEDT_KSV_INVOICE_MST1_PO_CD = (argValue) => {
        let _dataEDT_KSV_INVOICE_MST1_PO_CD =
            datasEDT_KSV_INVOICE_MST1_PO_CD.filter(
                (val) => val.PO_CD === argValue,
            );
        setDataEDT_KSV_INVOICE_MST1_PO_CD(_dataEDT_KSV_INVOICE_MST1_PO_CD[0]);
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

    const resetEDT_KSV_INVOICE_MST1 = () => {
        setDataEDT_KSV_INVOICE_MST1(emptyEDT_KSV_INVOICE_MST1);

        editEDT_KSV_INVOICE_MST1_PAY_CURR_CD("");
        editEDT_KSV_INVOICE_MST1_STATUS_CD("");
        editEDT_KSV_INVOICE_MST1_LINK_TO("");
        editEDT_KSV_INVOICE_MST1_DEBIT_TYPE("");
        editEDT_KSV_INVOICE_MST1_END_TYPE("");
        editEDT_KSV_INVOICE_MST1_PO_CD("");
        editEDT_KSV_INVOICE_MST1_ORDER_CD("");

        setDataEDT_KSV_INVOICE_MST1_BUYER_CD(
            datasEDT_KSV_INVOICE_MST1_BUYER_CD[0],
        );

        var tObj = { ...datasEDT_KSV_INVOICE_MST1_PAY_TO[0] };
        var tArray = [];
        tArray.push(tObj);
        setDatasEDT_KSV_INVOICE_MST1_PAY_TO(tArray);
        setDataEDT_KSV_INVOICE_MST1_PAY_TO(tArray[0]);

        tObj = { ...datasEDT_KSV_INVOICE_MST1_BANK_CD[0] };
        tArray = [];
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
        tEdit2.END_DATE = moment().format("YYYYMMDD");
        tEdit2.AMT = "0";
        setDataEDT_KSV_INVOICE_MST2(tEdit2);
        setDataEDT_KSV_INVOICE_MST2_END_TYPE(
            datasEDT_KSV_INVOICE_MST2_END_TYPE[0],
        );

        setDatasTBL_KSV_INVOICE_MST2([]);
        setSelectedTBL_KSV_INVOICE_MST2([]);
    };

    /**EDIT KSV_INVOICE_MST3 */
    const [datasEDT_KSV_INVOICE_MST3, setDatasEDT_KSV_INVOICE_MST3] = useState(
        [],
    );
    const [dataEDT_KSV_INVOICE_MST3, setDataEDT_KSV_INVOICE_MST3] = useState(
        emptyEDT_KSV_INVOICE_MST3,
    );
    const onCalChangeEDT_KSV_INVOICE_MST3_CRDB_DATE = (e, name) => {
        let val1 = e.value || "";
        let val = "";
        if (val1 === "") {
            val = "";
        } else {
            val = getDateVal(val1);
        }

        let _dataEDT_KSV_INVOICE_MST3 = { ...dataEDT_KSV_INVOICE_MST3 };
        _dataEDT_KSV_INVOICE_MST3[`${name}`] = val;
        setDataEDT_KSV_INVOICE_MST3(_dataEDT_KSV_INVOICE_MST3);

        var tArray = [];
        datasTBL_KSV_INVOICE_MST3.forEach((col, i) => {
            var tOne = { ...col };
            tOne.CRDB_DATE = val;
            tArray.push(tOne);
        });
        setDatasTBL_KSV_INVOICE_MST3(tArray);
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

    //
    const onKeyPress_COMM_QRY = (e, name) => {
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
                window.localStorage.getItem("S0703_DEBIT_NOTE_FACTORY_BVT"),
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

        setDataEDT_KSV_INVOICE_MST2({
            ...dataEDT_KSV_INVOICE_MST2,
            END_DATE: moment().format("YYYYMMDD"),
        });

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

        serviceS0703_DEBIT_NOTE_FACTORY_BVT
            .mgrQuery_CODE(_tObj)
            .then((data) => {
                if (typeof data.graphQLErrors === "undefined") {
                    if (argMode === "") {
                        setDatasQRY_KSV_INVOICE_MST_PAY_TO(data.DEBIT_TYPE);
                        setDataQRY_KSV_INVOICE_MST_PAY_TO(data.DEBIT_TYPE[0]);

                        setDatasQRY_KSV_INVOICE_MST_BILL_TO(data.BUYER3);
                        setDataQRY_KSV_INVOICE_MST_BILL_TO(data.BUYER3[0]);

                        setDatasQRY_KSV_INVOICE_MST_CHARGER(data.USER);
                        setDataQRY_KSV_INVOICE_MST_CHARGER(data.USER[0]);

                        setDatasQRY_KSV_INVOICE_MST_STATUS_CD(
                            data.DEBIT_STATUS,
                        );
                        setDataQRY_KSV_INVOICE_MST_STATUS_CD(
                            data.DEBIT_STATUS[0],
                        );

                        setDatasEDT_KSV_INVOICE_MST1_BUYER_CD(data.BUYER3);
                        setDataEDT_KSV_INVOICE_MST1_BUYER_CD(data.BUYER3[0]);

                        setDatasEDT_KSV_INVOICE_MST1_STATUS_CD(
                            data.DEBIT_STATUS,
                        );
                        setDataEDT_KSV_INVOICE_MST1_STATUS_CD(
                            data.DEBIT_STATUS[0],
                        );

                        setDatasEDT_KSV_INVOICE_MST1_DEBIT_TYPE(
                            data.DEBIT_TYPE,
                        );
                        setDataEDT_KSV_INVOICE_MST1_DEBIT_TYPE(
                            data.DEBIT_TYPE[0],
                        );

                        setDatasEDT_KSV_INVOICE_MST1_PAY_CURR_CD(data.CURR_CD);
                        setDataEDT_KSV_INVOICE_MST1_PAY_CURR_CD(
                            data.CURR_CD[0],
                        );
                    }

                    if (typeof tSaveObj.ORDER_CD !== "undefined") {
                        var argData = { ...tSaveObj };
                        var _argData = { ...emptyEDT_KSV_INVOICE_MST1 };
                        if (argData.ORDER_CD !== "")
                            _argData.BUYER_CD = argData.ORDER_CD.substring(
                                0,
                                2,
                            );
                        else _argData.BUYER_CD = argData.BUYER_CD;
                        _argData.DATE_OF_ISSUE = serviceLib.getCurrDate1();
                        _argData.EXP_DATE = serviceLib.getCurrDate1();
                        _argData.LINK_TO = argData.FACTORY_CD;
                        _argData.PAY_CURR_CD = argData.CURR_CD;
                        _argData.PAY_TO = argData.VENDOR_CD;
                        _argData.PAY_AMT = argData.TOT_AMT;
                        _argData.PO_CD = argData.PO_CD;
                        _argData.ORDER_CD = argData.ORDER_CD;
                        _argData.CHARGER = serviceLib.getUserInfo().USER_ID;
                        setDataEDT_KSV_INVOICE_MST1(_argData);

                        var tArray = [];
                        var tObj = {};
                        tObj.BUYER_CD = argData.BUYER_CD;
                        tObj.BUYER_NAME = argData.BUYER_NAME;
                        tArray.push(tObj);
                        // setDatasEDT_KSV_INVOICE_MST1_BUYER_CD(tArray);
                        // setDataEDT_KSV_INVOICE_MST1_BUYER_CD(tArray[0]);

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
                        tObj.PO_CD = argData.PO_CD;
                        tArray.push(tObj);
                        setDatasEDT_KSV_INVOICE_MST1_PO_CD(tArray);
                        setDataEDT_KSV_INVOICE_MST1_PO_CD(tArray[0]);

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

    return (
        <div className="af-div-main">
            <div
                className="af-div-first"
                style={{ width: "100rem", height: "9rem" }}
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
                    <p className="af-span-p" style={{ width: "7rem" }}>Type</p>
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
                            onKeyPress={(e) => onKeyPress_COMM_QRY(e, "COM_CD")}
                        ></Dropdown>
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "17rem" }}>
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
                        ></Dropdown>
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "28rem" }}>
                    <p className="af-span-p" style={{ width: "7rem" }}>Bill To</p>
                    <div className="af-span-div" style={{ width: "20rem" }}>
                        <Dropdown
                            style={{ width: "20rem" }}
                            id="id_BILL_TO"
                            value={dataQRY_KSV_INVOICE_MST_BILL_TO}
                            onChange={(e) =>
                                onDropdownChangeQRY_KSV_INVOICE_MST_BILL_TO(
                                    e,
                                    "BILL_TO",
                                )
                            }
                            options={datasQRY_KSV_INVOICE_MST_BILL_TO}
                            optionLabel="BUYER_NAME"
                            placeholder=""
                            filter
                            onKeyPress={(e) =>
                                onKeyPress_COMM_QRY(e, "BUYER_CD")
                            }
                        ></Dropdown>
                    </div>
                </span>

                <span className="af-span" style={{ width: "31.5rem" }}>
                    <p className="af-span-p" style={{ width: "10.5rem" }}>Person in Charge</p>
                    <div className="af-span-div" style={{ width: "20.5rem" }}>
                        <Dropdown
                            style={{ width: "20.5rem" }}
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
                <span className="af-span-3" style={{ width: "17rem" }}>
                    <p className="af-span-p" style={{ width: "7rem" }}>Team</p>
                    <div className="af-span-div" style={{ width: "9rem" }}>
                        <InputText
                            style={{ width: "9rem" }}
                            id="id_TITLE"
                            value={dataQRY_KSV_INVOICE_MST.TEAM}
                            onChange={(e) =>
                                onInputChangeQRY_KSV_INVOICE_MST_TEAM(e, "TEAM")
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "17rem" }}>
                    <p className="af-span-p" style={{ width: "7rem" }}>Debit#</p>
                    <div className="af-span-div" style={{ width: "9rem" }}>
                        <InputText
                            style={{ width: "9rem" }}
                            id="id_TITLE"
                            value={dataQRY_KSV_INVOICE_MST.CRDB_CD}
                            onChange={(e) =>
                                onInputChangeQRY_KSV_INVOICE_MST_CRDB_CD(
                                    e,
                                    "CRDB_CD",
                                )
                            }
                        />
                    </div>
                </span>

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
                <span className="af-span-3" style={{ width: "6rem" }}>
                    <div className="af-span-div-btn" style={{ width: "5rem" }}>
                        <Button
                            style={{ width: "5rem" }}
                            label="Reset"
                            className="p-button-text"
                            onClick={process_RESET_QRY}
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "6rem" }}>
                    <div className="af-span-div-btn" style={{ width: "5rem" }}>
                        <Button
                            style={{ width: "5rem" }}
                            label="Debit"
                            className="p-button-text green"
                            onClick={search_REPORT}
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "6rem" }}>
                    <div className="af-span-div-btn" style={{ width: "5rem" }}>
                        <Button
                            style={{ width: "5rem" }}
                            label="Excel"
                            className="p-button-text green"
                            onClick={exportExcelTBL_KSV_INVOICE_MST}
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "40rem" }}>
                    <p className="af-span-p" style={{ width: "10rem" }}>Title</p>
                    <div className="af-span-div" style={{ width: "20.5rem" }}>
                        <InputText
                            style={{ width: "20.5rem" }}
                            id="id_TITLE"
                            value={dataQRY_KSV_INVOICE_MST.TITLE}
                            onChange={(e) =>
                                onInputChangeQRY_KSV_INVOICE_MST_TITLE(e, "TITLE")
                            }
                        />
                    </div>
                </span>
            </div>

            <div
                className="af-div-second"
                style={{ marginLeft: "1rem", width: "21.5rem", height: "6rem" }}
            >
                <span className="af-span-3-0" style={{ width: "19rem" }}>
                    <p className="af-span-p" style={{ width: "9rem" }}>End Date</p>
                    <div className="af-span-div" style={{ width: "9rem" }}>
                        <Calendar
                            showButtonBar
                            style={{ width: "9rem" }}
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
                <span className="af-span-3" style={{ width: "9rem" }}>
                    <div className="af-span-div-btn" style={{ width: "8rem" }}>
                        <Button
                            style={{ width: "8rem" }}
                            label="Confirm"
                            className="p-button-text"
                            onClick={process_CONFIRM_DEBIT_NOTE_FACTORY_BVT}
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "9rem" }}>
                    <div className="af-span-div-btn" style={{ width: "8rem" }}>
                        <Button
                            style={{ width: "8rem" }}
                            label="End"
                            className="p-button-text"
                            onClick={process_END_DEBIT_NOTE_FACTORY_BVT}
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "9rem" }}>
                    <div className="af-span-div-btn" style={{ width: "8rem" }}>
                        <Button
                            style={{ width: "8rem" }}
                            label="End Cancel"
                            className="p-button-text"
                            onClick={process_CANCEL_END_CREDIT}
                        />
                    </div>
                </span>
            </div>

            <div
                className="af-div-first"
                style={{ width: "123rem", height: "42rem" }}
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
                        onRowClick1TBL_KSV_INVOICE_MST(e.value, e.value);
                    }}
                    onRowClick={onRowClickTBL_KSV_INVOICE_MST}
                    dataKey="id"
                    className="datatable-responsive"
                    virtualScrollerOptions={{ itemSize: 20 }}
                    emptyMessage=" " //header={headerTBL_KSV_INVOICE_MST}
                    responsiveLayout="scroll"
                    scrollable
                    scrollHeight="42rem"
                >
                    <AFColumn selectionMode="multiple" field="__checkbox__" reorderable={false} headerClassName="t-header" headerStyle={{ width: "3rem" }} ></AFColumn>
                    <AFColumn field="CHARGER_TEAM" headerClassName="t-header" header="Team" style={{ width: "6rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="CRDB_CD" headerClassName="t-header" header="Number" style={{ width: "5rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="CRDB_SEQ" headerClassName="t-header" header="Seq" style={{ width: "3rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="BUYER_CD" headerClassName="t-header" header="Buyer" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="MESSER" headerClassName="t-header" header="Bill To" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="CRDB_AMT" headerClassName="t-header" header="pay Amt" style={{ width: "8rem", height: "1.8rem", flexBasis: "auto", }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.CRDB_AMT, 2) } ></AFColumn>
                    <AFColumn field="BALANCE" headerClassName="t-header" header="Balance" style={{ width: "8rem", height: "1.8rem", flexBasis: "auto", }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.BALANCE, 2) } ></AFColumn>
                    <AFColumn field="CURR_CD" headerClassName="t-header" header="Curr" style={{ width: "3rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="TITLE" headerClassName="t-header" header="Title" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="CHARGER" headerClassName="t-header" header="Charger" style={{ width: "8rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="CRDB_DATE" headerClassName="t-header" header="Issue Date" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="CONF_USER" headerClassName="t-header" header="Conf User" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="CONF_FLAG" headerClassName="t-header" header="Confirm" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} bodyStyle={{ textAlign: "center" }} body={(rowData) => rowData.CONF_FLAG === "Y" && String(rowData.CONF_USER || "").trim() !== "" ? <i className="pi pi-check" style={{ color: "green" }} /> : null} ></AFColumn>
                    <AFColumn field="CREDIT_STATUS" headerClassName="t-header" header="Status" style={{ width: "6rem", height: "1.8rem", flexBasis: "auto", }} bodyStyle={{ textAlign: "center" }} body={(rowData) => rowData.CREDIT_STATUS === "1" ? <i className="pi pi-check" style={{ color: "green" }} /> : rowData.CREDIT_STATUS} ></AFColumn>
                    <AFColumn field="REMARK" headerClassName="t-header" header="Remark" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="REMARK_S" headerClassName="t-header" header="RemarkS" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                </AFDataTable>
            </div>

            <div
                className="af-div-first"
                style={{ width: "123rem", height: "9rem" }}
            >
                <span className="af-span-3-0" style={{ width: "16rem" }}>
                    <p className="af-span-p" style={{ width: "5rem" }}>Debit#</p>
                    <div className="af-span-div" style={{ width: "10rem" }}>
                        <InputText
                            style={{ width: "10rem" }}
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
                <span className="af-span-3-0" style={{ width: "18rem" }}>
                    <p className="af-span-p" style={{ width: "7rem" }}>Type</p>
                    <div className="af-span-div" style={{ width: "10rem" }}>
                        <Dropdown
                            style={{ width: "10rem" }}
                            id="id_BUYER_CD"
                            filter
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
                        ></Dropdown>
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "21rem" }}>
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
                <span className="af-span-3-0" style={{ width: "21rem" }}>
                    <p className="af-span-p" style={{ width: "10rem" }}>Issue Date</p>
                    <div className="af-span-div" style={{ width: "10rem" }}>
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
                <span className="af-span-3-0" style={{ width: "30rem" }}>
                    <p className="af-span-p" style={{ width: "10rem" }}>Charger</p>
                    <div className="af-span-div" style={{ width: "10rem" }}>
                        <InputText
                            style={{ width: "10rem" }}
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

                <span className="af-span-3" style={{ width: "40rem" }}>
                    <p
                        className="af-span-p"
                        style={{ width: "5rem", color: "red" }}
                    >*Buyer#</p>
                    <div className="af-span-div" style={{ width: "29rem" }}>
                        <Dropdown
                            style={{ width: "29rem" }}
                            id="id_PO_CD"
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
                            filter
                        ></Dropdown>
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "36rem" }}>
                    <p
                        className="af-span-p"
                        style={{ width: "5rem", color: "red" }}
                    >*Title</p>
                    <div className="af-span-div" style={{ width: "30rem" }}>
                        <InputText
                            style={{ width: "30rem" }}
                            id="id_VAT_AMT"
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
                <span className="af-span-3" style={{ width: "21rem" }}>
                    <p
                        className="af-span-p"
                        style={{ width: "10rem", color: "red" }}
                    >*Total Amt</p>
                    <div className="af-span-div" style={{ width: "10rem" }}>
                        <InputText
                            style={{ width: "10rem" }}
                            id="id_PAY_AMT"
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
                <span className="af-span-3" style={{ width: "8rem" }}>
                    <p className="af-span-p" style={{ width: "1rem" }}> </p>
                    <div className="af-span-div" style={{ width: "6rem" }}>
                        <Dropdown
                            style={{ width: "6rem" }}
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

                <span className="af-span-3" style={{ width: "35rem" }}>
                    <p className="af-span-p" style={{ width: "5rem" }}>Remark</p>
                    <div className="af-span-div" style={{ width: "29rem" }}>
                        <InputText
                            style={{ width: "29rem" }}
                            id="id_VAT_AMT"
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
                <span className="af-span-3" style={{ width: "41rem" }}>
                    <p className="af-span-p" style={{ width: "10rem" }}>Remark(S)</p>
                    <div className="af-span-div" style={{ width: "30rem" }}>
                        <InputText
                            style={{ width: "30rem" }}
                            id="id_VAT_AMT"
                            value={dataEDT_KSV_INVOICE_MST1.REMARK_S}
                            onChange={(e) =>
                                onInputChangeEDT_KSV_INVOICE_MST1_REMARK_S(
                                    e,
                                    "REMARK_S",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "21rem" }}>
                    <p
                        className="af-span-p"
                        style={{ width: "10rem", color: "red" }}
                    >*Amt</p>
                    <div className="af-span-div" style={{ width: "10rem" }}>
                        <InputText
                            style={{ width: "10rem" }}
                            id="id_PAY_AMT"
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
                <span className="af-span-3" style={{ width: "16rem" }}>
                    <p className="af-span-p" style={{ width: "5rem" }}>Confirm</p>
                    <div className="af-span-div" style={{ width: "10rem" }}>
                        <InputText
                            disabled
                            style={{ width: "10rem" }}
                            id="id_VAT_AMT"
                            value={dataEDT_KSV_INVOICE_MST1.CONFIRM}
                            onChange={(e) =>
                                onInputChangeEDT_KSV_INVOICE_MST1_CONFIRM(
                                    e,
                                    "CONFIRM",
                                )
                            }
                        />
                    </div>
                </span>
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
                            onClick={process_INSERT_DEBIT_NOTE_FACTORY_BVT}
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "11rem" }}>
                    <div className="af-span-div-btn" style={{ width: "10rem" }}>
                        <Button
                            style={{ width: "10rem" }}
                            label="Update"
                            className="p-button-text"
                            onClick={process_UPDATE_DEBIT_NOTE_FACTORY_BVT}
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "11rem" }}>
                    <div className="af-span-div-btn" style={{ width: "10rem" }}>
                        <Button
                            style={{ width: "10rem" }}
                            label="Cancel"
                            className="p-button-text"
                            onClick={process_CANCEL_DEBIT_NOTE_FACTORY_BVT}
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "11rem" }}>
                    <div className="af-span-div-btn" style={{ width: "10rem" }}>
                        <Button
                            style={{ width: "10rem" }}
                            label="Confirm"
                            className="p-button-text"
                            onClick={process_CONFIRM_DEBIT_NOTE_FACTORY_BVT}
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
                <span className="af-span-3" style={{ width: "14rem" }}>
                    <div className="af-span-div-btn" style={{ width: "13rem" }}>
                        <Button
                            style={{ width: "13rem" }}
                            label="Update Issue Date"
                            className="p-button-text"
                            onClick={popup_UPDATE_CRDB_DATE}
                        />
                    </div>
                </span>
            </div>

            <Toast ref={toast} />

            {/* Update Issue Date Dialog */}
            <Dialog
                visible={createDialog}
                position="mid-center"
                style={{
                    width: "100rem",
                    height: "40rem",
                    marginLeft: "0rem",
                    marginTop: "0rem",
                    paddingLeft: "0rem",
                    paddingTop: "0rem",
                }}
                header="Update Issue Date"
                modal={true}
                className="p-fluid"
                onHide={hideDialog}
            >
                <div className="af-div-main">
                    <div
                        className="af-div-first"
                        style={{ width: "100rem", height: "3rem" }}
                    >
                        <span className="af-span-3-0" style={{ width: "21rem" }}>
                           <p className="af-span-p" style={{ width: "10rem" }}>Issue Date</p>
                           <div className="af-span-div" style={{ width: "10rem" }}>
                               <Calendar
                                   showButtonBar
                                   style={{ width: "10rem" }}
                                   dateFormat="yy-mm-dd"
                                   id="id_DATE_OF_ISSUE"
                                   value={changeDateVal(
                                       dataEDT_KSV_INVOICE_MST3.CRDB_DATE,
                                   )}
                                   onChange={(e) =>
                                       onCalChangeEDT_KSV_INVOICE_MST3_CRDB_DATE(
                                           e,
                                           "CRDB_DATE", 
                                       )
                                   }
                               />
                            </div>
                        </span>
                        <span
                            className="af-span-3-0"
                            style={{ width: "16rem" }}
                        >
                            <div
                                className="af-span-div-btn"
                                style={{ width: "14rem" }}
                            >
                                <Button
                                    label="Save"
                                    style={{ width: "14rem" }}
                                    className="p-button-text"
                                    onClick={process_UPDATE_CRDB_DATE}
                                />
                            </div>
                        </span>
                    </div>
                    <div
                        className="af-div-first"
                        style={{ width: "100%", height: "33rem" }}
                    >
                        <AFDataTable preventUnrelatedRerender
                            ref={dt_TBL_KSV_INVOICE_MST3}
                            editMode="cell"
                            size="small"
                            value={datasTBL_KSV_INVOICE_MST3}
                            tableStyle={{ tableLayout: "fixed" }}
                            resizableColumns
                            columnResizeMode="expand"
                            loading={loadingTBL_KSV_INVOICE_MST3}
                            metaKeySelection={false}
                            showGridlines
                            selectionMode="multiple"
                            selection={selectedTBL_KSV_INVOICE_MST3}
                            onSelectionChange={(e) => {
                                setSelectedTBL_KSV_INVOICE_MST3(e.value);
                            }}
                            dataKey="id"
                            className="datatable-responsive"
                            virtualScrollerOptions={{ itemSize: 20 }}
                            emptyMessage=" "
                            responsiveLayout="scroll"
                            scrollable
                            scrollHeight="33rem"
                        >
                            <AFColumn field="CRDB_CD" headerClassName="t-header" header="Number" style={{ width: "5rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                            <AFColumn field="MESSER" headerClassName="t-header" header="Bill To" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                            <AFColumn field="CRDB_AMT" headerClassName="t-header" header="pay Amt" style={{ width: "8rem", height: "1.8rem", flexBasis: "auto", }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.CRDB_AMT, 2) } ></AFColumn>
                            <AFColumn field="CRDB_DATE" headerClassName="t-header" header="Issue Date" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                        </AFDataTable>
                    </div>
                </div>
            </Dialog>
        </div>
    );
};

const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(S0703_DEBIT_NOTE_FACTORY_BVT, comparisonFn);
