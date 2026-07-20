/* eslint-disable */
import React, { useState, useEffect, useRef } from "react";
import { AFDataTable } from "../components/AFDataTable";
import { AFColumn } from "../components/AFColumn";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { Tooltip } from "primereact/tooltip";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";

import { ServiceLib } from "../service/service_lib/ServiceLib";
import { ServiceS0708_MANAGE_BUYER_INPUT } from "../service/service_biz/ServiceS0708_MANAGE_BUYER_INPUT";

import "./page_common.scss";

const $ = require("jquery");

const emptyKCD_CODE = {
    id: 0,
    CD_GROUP: "",
    CD_CODE: "",
    CD_NAME: "",
    CD_FLAG: "",
};

const emptyQRY_KSV_INVOICE_MST = {
    BUYER_CD: "",
    REF_NO: "",
    S_BILL_DATE: "",
    E_BILL_DATE: "",
    S_PAY_DATE: "",
    E_PAY_DATE: "",
    END_TYPE: "",
};

const emptyTBL_KSV_INVOICE_MST = {
    id: 0,
    REF_NO: "",
    BANK_NAME: "",
    BUYER_NAME: "",
    BILL_DATE: "",
    CURR_CD: "",
    BILL_AMT: "",
    CONFIRM_AMT: "",
    BAL_AMT: "",
    END_FLAG: "",
    BILL_TYPE: "",
};

const emptyTBL_KSV_INVOICE_MST1 = {
    id: 0,
    CREDIT_NO: "",
    AMOUNT: "",
};

const emptyTBL_KSV_INVOICE_MST2 = {
    id: 0,
    INVOICE_NO: "",
    CURR_CD: "",
    AMOUNT: "",
    SHIP_DATE: "",
    DUE_DATE: "",
    CURR_BILL_AMT: "",
    OA_NEGO: "",
    REMAIN_AMT: "",
    BUYER_NAME: "",
};

const emptyTBL_KSV_INVOICE_MST3 = {
    id: 0,
    KIND: "",
    CURR_CD: "",
    AMOUNT: "",
    IN_DATE: "",
    DUE_DATE: "",
    CURR_BILL_AMT: "",
    REMAIN_AMT: "",
    BUYER_NAME: "",
};

const emptyTBL_KSV_INVOICE_MST4 = {
    id: 0,
    BILL_AMT: "",
    REF_NO: "",
    EXCHANGE_RATE: "",
};

const S0708_MANAGE_BUYER_INPUT = () => {
    const serviceLibRef = useRef(null);
    if (!serviceLibRef.current) {
        serviceLibRef.current = new ServiceLib();
        serviceLibRef.current.loginConfirm();
    }
    const serviceLib = serviceLibRef.current;
    const serviceS0708_MANAGE_BUYER_INPUT =
        new ServiceS0708_MANAGE_BUYER_INPUT();

    const toast = useRef(null);

    /* splitter 관련 */
    const [styleVal, setStyleVal] = useState({ width: "65vw" });

    const process_INSERT_BILL = () => {
        if (selectedTBL_KSV_INVOICE_MST.length <= 0) {
            alert("처리할 데이타(Ref No)를 선택하지 않았습니다<br><br>Data to be processed (Ref No) has not been selected");
            return;
        }
        if (selectedTBL_KSV_INVOICE_MST2.length <= 0) {
            alert("처리할 데이타(Invoice No)를 선택하지 않았습니다<br><br>Data to be processed (Invoice No) has not been selected");
            return;
        }

        var tRetDate = serviceLib.getCurrDate().substring(0, 8);
        dataQRY_KSV_INVOICE_MST.S_PAY_DATE = tRetDate;

        var tInput1 = { ...selectedTBL_KSV_INVOICE_MST[0] };
        tInput1.BALANCE = String(
            parseFloat(serviceLib.numToFixed(tInput1.BALANCE, 2)),
        );
        delete tInput1.id;
        delete tInput1.__typename;

        var tInput2_0 = [...selectedTBL_KSV_INVOICE_MST2];
        var tInput2 = [];
        tInput2_0.forEach((col, i) => {
            var tObj = {
                INVOICE_NO: col.INVOICE_NO,
                CURR_CD: col.CURR_CD,
                TOT_AMT: col.TOT_AMT,
                SHIP_DATE: col.SHIP_DATE,
                DUE_DATE: col.DUE_DATE,
                BALANCE: col.BALANCE,
                BUYER_NAME: col.BUYER_NAME,
                IN_AMT: col.IN_AMT,
                OA_NEGO: col.OA_NEGO,
                BUYER_CD: col.BUYER_CD,
                TOTAL_COST: col.TOTAL_COST,
            };
            tObj.BILL_DATE = dataQRY_KSV_INVOICE_MST.S_PAY_DATE;
            tInput2.push(tObj);
        });

        if (tInput1.END_FLAG_N === "End") {
            alert("이미 End 처리된 데이타 입니다<br><br>This data has already been End processed.");
            return;
        }

        var tErrorStr = "";
        var tInAmt = 0;
        tInput2.forEach((col, i) => {
            if (col.CURR_CD !== tInput1.CURR_CD)
                tErrorStr = "통화가 같지 않습니다";
            if (parseFloat(col.IN_AMT) <= 0)
                tErrorStr = "금회 입금액을 입력하지 않았습니다";
            if (tInput1.PRE_FLAG_N !== "상계용") {
                tInAmt += parseFloat(col.IN_AMT);
            }
        });

        tInAmt = parseFloat(tInAmt.toFixed(2));

        if (tInput1.PRE_FLAG_N !== "상계용") {
            if (tInAmt > parseFloat(tInput1.BALANCE)) {
                tErrorStr = `Invoice 입금액이 남은 금액을 초과합니다(1)(${tInAmt} / ${tInput1.BALANCE})`;
            }
        }

        if (tErrorStr !== "") {
            alert(tErrorStr);
            return;
        }

        setLoadingTBL_KSV_INVOICE_MST4(true);
        serviceS0708_MANAGE_BUYER_INPUT
            .mgrInsert_INSERT_BILL(tInput1, tInput2)
            .then((data) => {
                setLoadingTBL_KSV_INVOICE_MST4(false);
                if (typeof data.graphQLErrors === "undefined") {
                    if (data.length > 0) {
                        alert(data[0].CODE);

                        if (data[0].CODE.includes("SUCC")) {
                            var tQry = { ...dataQRY_KSV_INVOICE_MST };
                            tQry.REF_NO = tInput1.REF_NO;
                            search_LIST_1_1(tQry);
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

    const process_INSERT_DC = () => {
        if (selectedTBL_KSV_INVOICE_MST.length <= 0) {
            alert("처리할 데이타(Ref No)를 선택하지 않았습니다<br><br>Data to be processed (Ref No) has not been selected");
            return;
        }
        if (selectedTBL_KSV_INVOICE_MST3.length <= 0) {
            alert("처리할 데이타(Invoice No)를 선택하지 않았습니다<br><br>Data to be processed (Invoice No) has not been selected");
            return;
        }

        var tInput1 = { ...selectedTBL_KSV_INVOICE_MST[0] };
        tInput1.BALANCE = String(
            parseFloat(serviceLib.numToFixed(tInput1.BALANCE, 2)),
        );

        var tInput2_0 = [...selectedTBL_KSV_INVOICE_MST3];

        var tInput1 = { ...selectedTBL_KSV_INVOICE_MST[0] };
        delete tInput1.id;
        delete tInput1.__typename;

        var tRetDate = serviceLib.getCurrDate().substring(0, 8);
        dataQRY_KSV_INVOICE_MST.S_PAY_DATE = tRetDate;

        var tErrorStr = "";
        var tInput2 = [];
        tInput2_0.forEach((col, i) => {
            var tObj = { ...col };
            delete tObj.id;
            delete tObj.__typename;
            tObj.BILL_DATE = dataQRY_KSV_INVOICE_MST.S_PAY_DATE;
            if (tObj.CRDB_CD.substring(0, 1) === "D") {
                if (tInput1.PRE_FLAG_N !== "상계용") {
                    if (
                        tInAmt >
                        parseFloat(serviceLib.numToFixed(tInput1.BALANCE, 2))
                    ) {
                        tErrorStr = `Invoice 입금액이 남은 금액을 초과합니다(2)(${tInAmt}/${tInput1.BALANCE})`;
                    }
                }
            } else {
                if (
                    tInAmt >
                    parseFloat(serviceLib.numToFixed(tInput1.CREDIT_AMT, 2))
                ) {
                    tErrorStr = `Invoice 입금액이 남은 금액을 초과합니다(3)(${tInAmt}/${tInput1.BALANCE})`;
                }
            }
            tInput2.push(tObj);
        });
        if (tErrorStr !== "") {
            alert(tErrorStr);
            return;
        }

        if (tInput1.END_FLAG_N === "End") {
            alert("이미 End 처리된 데이타 입니다<br><br>This data has already been End processed.");
            return;
        }

        var tInAmt = 0;
        tInput2.forEach((col, i) => {
            if (col.CURR_CD !== tInput1.CURR_CD)
                tErrorStr = "통화가 같지 않습니다";
            if (parseFloat(col.IN_AMT) <= 0)
                tErrorStr = "금회 입금액을 입력하지 않았습니다";
            if (tInput1.PRE_FLAG_N !== "상계용") {
                tInAmt += parseFloat(col.IN_AMT);
            }
        });

        if (tErrorStr !== "") {
            alert(tErrorStr);
            return;
        }

        setLoadingTBL_KSV_INVOICE_MST4(true);
        serviceS0708_MANAGE_BUYER_INPUT
            .mgrInsert_INSERT_DC(tInput1, tInput2)
            .then((data) => {
                setLoadingTBL_KSV_INVOICE_MST4(false);
                if (typeof data.graphQLErrors === "undefined") {
                    if (data.length > 0) {
                        alert(data[0].CODE);

                        if (data[0].CODE.includes("SUCC")) {
                            var tQry = { ...dataQRY_KSV_INVOICE_MST };
                            tQry.REF_NO = tInput1.REF_NO;
                            search_LIST_1_1(tQry);
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
    const process_DELETE_BILL = () => {
        if (selectedTBL_KSV_INVOICE_MST.length <= 0) {
            alert("처리할 데이타(Ref No)를 선택하지 않았습니다<br><br>Data to be processed (Ref No) has not been selected");
            return;
        }
        if (selectedTBL_KSV_INVOICE_MST4.length <= 0) {
            alert("처리할 데이타(Invoice No)를 선택하지 않았습니다<br><br>Data to be processed (Invoice No) has not been selected");
            return;
        }

        var tInput1 = { ...selectedTBL_KSV_INVOICE_MST[0] };
        var tInput2_0 = [...selectedTBL_KSV_INVOICE_MST4];

        var tInput1 = { ...selectedTBL_KSV_INVOICE_MST[0] };
        delete tInput1.id;
        delete tInput1.__typename;

        var tInput2 = [];
        tInput2_0.forEach((col, i) => {
            var tObj = { ...col };
            delete tObj.id;
            delete tObj.__typename;
            tInput2.push(tObj);
        });

        var tErrorStr = "";
        var tInAmt = 0;
        tInput2.forEach((col, i) => {
            if (col.END_DATE !== "")
                tErrorStr = "이미 End 처리된 데이타 입니다(삭제불가)";
            if (col.INVOICE_NO.substring(0, 1) === "C")
                tErrorStr = "Credit 삭제를 이용하세요";
            if (col.INVOICE_NO.substring(0, 1) === "D")
                tErrorStr = "Debit 삭제를 이용하세요";
        });

        if (tErrorStr !== "") {
            alert(tErrorStr);
            return;
        }

        setLoadingTBL_KSV_INVOICE_MST4(true);
        serviceS0708_MANAGE_BUYER_INPUT
            .mgrInsert_DELETE_BILL(tInput2)
            .then((data) => {
                setLoadingTBL_KSV_INVOICE_MST4(false);
                if (typeof data.graphQLErrors === "undefined") {
                    if (data.length > 0) {
                        alert(data[0].CODE);

                        if (data[0].CODE.includes("SUCC")) {
                            var tQry = { ...dataQRY_KSV_INVOICE_MST };
                            tQry.REF_NO = tInput1.REF_NO;
                            search_LIST_1_1(tQry);
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

    const process_DELETE_CREDIT = () => {
        if (selectedTBL_KSV_INVOICE_MST.length <= 0) {
            alert("처리할 데이타(Ref No)를 선택하지 않았습니다<br><br>Data to be processed (Ref No) has not been selected");
            return;
        }
        if (selectedTBL_KSV_INVOICE_MST1.length <= 0) {
            alert("처리할 데이타(Credit)를 선택하지 않았습니다<br><br>No data (credit) has been selected to process");
            return;
        }

        var tInput1 = { ...selectedTBL_KSV_INVOICE_MST[0] };
        var tInput2_0 = [...selectedTBL_KSV_INVOICE_MST1];

        var tInput1 = { ...selectedTBL_KSV_INVOICE_MST[0] };
        delete tInput1.id;
        delete tInput1.__typename;

        var tInput2 = [];
        tInput2_0.forEach((col, i) => {
            var tObj = {};
            tObj.REF_NO = tInput1.REF_NO;
            tObj.CREDIT_CD = col.CREDIT_CD;
            tObj.CREDIT_AMT = col.CREDIT_AMT;
            tInput2.push(tObj);
        });

        var tErrorStr = "";

        if (tErrorStr !== "") {
            alert(tErrorStr);
            return;
        }

        setLoadingTBL_KSV_INVOICE_MST1(true);
        serviceS0708_MANAGE_BUYER_INPUT
            .mgrInsert_DELETE_CREDIT(tInput2)
            .then((data) => {
                setLoadingTBL_KSV_INVOICE_MST1(false);
                if (typeof data.graphQLErrors === "undefined") {
                    if (data.length > 0) {
                        alert(data[0].CODE);

                        if (data[0].CODE.includes("SUCC")) {
                            var tQry = { ...dataQRY_KSV_INVOICE_MST };
                            tQry.REF_NO = tInput1.REF_NO;
                            search_LIST_1_1(tQry);
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

    const process_DELETE_DC = () => {
        if (selectedTBL_KSV_INVOICE_MST.length <= 0) {
            alert("처리할 데이타(Ref No)를 선택하지 않았습니다<br><br>Data to be processed (Ref No) has not been selected");
            return;
        }
        if (selectedTBL_KSV_INVOICE_MST4.length <= 0) {
            alert("처리할 데이타(Invoice No)를 선택하지 않았습니다<br><br>Data to be processed (Invoice No) has not been selected");
            return;
        }

        var tInput1 = { ...selectedTBL_KSV_INVOICE_MST[0] };
        var tInput2_0 = [...selectedTBL_KSV_INVOICE_MST4];

        var tInput1 = { ...selectedTBL_KSV_INVOICE_MST[0] };
        delete tInput1.id;
        delete tInput1.__typename;

        var tInput2 = [];
        tInput2_0.forEach((col, i) => {
            var tObj = { ...col };
            delete tObj.id;
            delete tObj.__typename;
            tInput2.push(tObj);
        });

        var tErrorStr = "";
        var tInAmt = 0;
        tInput2.forEach((col, i) => {
            if (col.END_DATE !== "")
                tErrorStr = "이미 End 처리된 데이타 입니다(삭제불가)";
            if (col.INVOICE_NO.substring(0, 1) === "C")
                tErrorStr = "Credit 삭제를 이용하세요";
            if (col.INVOICE_NO.substring(0, 1) !== "D")
                tErrorStr = "Invoice Bill 삭제를 이용하세요 ";
        });

        if (tErrorStr !== "") {
            alert(tErrorStr);
            return;
        }

        setLoadingTBL_KSV_INVOICE_MST4(true);
        serviceS0708_MANAGE_BUYER_INPUT
            .mgrInsert_DELETE_DC(tInput2)
            .then((data) => {
                setLoadingTBL_KSV_INVOICE_MST4(false);
                if (typeof data.graphQLErrors === "undefined") {
                    if (data.length > 0) {
                        alert(data[0].CODE);

                        if (data[0].CODE.includes("SUCC")) {
                            var tQry = { ...dataQRY_KSV_INVOICE_MST };
                            tQry.REF_NO = tInput1.REF_NO;
                            search_LIST_1_1(tQry);
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

    const search_LIST_1 = (argData) => {
        var _tData = {};

        if (typeof argData === "undefined") {
            _tData = { ...dataQRY_KSV_INVOICE_MST };
        } else {
            if (typeof argData.REF_NO === "undefined")
                _tData = { ...dataQRY_KSV_INVOICE_MST };
            else _tData = { ...argData };
        }

        setDatasTBL_KSV_INVOICE_MST([]);
        setSelectedTBL_KSV_INVOICE_MST([]);

        setLoadingTBL_KSV_INVOICE_MST(true);

        serviceS0708_MANAGE_BUYER_INPUT.mgrQuery_LIST_1(_tData).then((data) => {
            setLoadingTBL_KSV_INVOICE_MST(false);
            if (typeof data.graphQLErrors === "undefined") {
                console.log(
                    "ServiceMgrKCD_BUYER.mgr1KcdStyle call => " + data.length,
                );

                if (data.length <= 0) {
                    setDatasTBL_KSV_INVOICE_MST([]);
                    return;
                }

                var tArray2 = data.map((col, i) => {
                    var tObj = { ...col };
                    tObj.id = i + 1;
                    return tObj;
                });
                setDatasTBL_KSV_INVOICE_MST(tArray2);

                setDatasTBL_KSV_INVOICE_MST1([]);
                setDatasTBL_KSV_INVOICE_MST2([]);
                setDatasTBL_KSV_INVOICE_MST3([]);
                setDatasTBL_KSV_INVOICE_MST4([]);
            } else {
                console.log(
                    "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });
    };

    const search_LIST_1_1 = (argData) => {
        var _tData = {};

        if (typeof argData === "undefined") {
            _tData = { ...dataQRY_KSV_INVOICE_MST };
        } else {
            if (typeof argData.REF_NO === "undefined")
                _tData = { ...dataQRY_KSV_INVOICE_MST };
            else _tData = { ...argData };
        }

        setDatasTBL_KSV_INVOICE_MST([]);
        setSelectedTBL_KSV_INVOICE_MST([]);

        setLoadingTBL_KSV_INVOICE_MST(true);

        serviceS0708_MANAGE_BUYER_INPUT.mgrQuery_LIST_1(_tData).then((data) => {
            setLoadingTBL_KSV_INVOICE_MST(false);
            if (typeof data.graphQLErrors === "undefined") {
                console.log(
                    "ServiceMgrKCD_BUYER.mgr1KcdStyle call => " + data.length,
                );

                if (data.length <= 0) {
                    setDatasTBL_KSV_INVOICE_MST([]);
                    return;
                }

                var tArray2 = data.map((col, i) => {
                    var tObj = { ...col };
                    tObj.id = i + 1;
                    return tObj;
                });
                setDatasTBL_KSV_INVOICE_MST(tArray2);

                var argData = { ...tArray2[0] };

                var tInObj = {};
                tInObj.BUYER_CD = argData.BUYER_CD;
                var tRetDate = serviceLib.getCurrDate().substring(0, 8);
                tInObj.S_DUE_DATE = tRetDate;
                search_LIST_2(tInObj);
                search_LIST_3(tInObj);

                var tInObj1 = {};
                tInObj1.REF_NO = argData.REF_NO;
                tInObj1.PRE_FLAG = argData.PRE_FLAG;
                search_LIST_4(tInObj1);
                search_LIST_5(tInObj1);
            } else {
                console.log(
                    "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });
    };

    const search_LIST_2 = (argData) => {
        var tInObj = {};
        tInObj.BUYER_CD = argData.BUYER_CD;
        tInObj.S_DUE_DATE = argData.S_DUE_DATE;

        setDatasTBL_KSV_INVOICE_MST2([]);
        setSelectedTBL_KSV_INVOICE_MST2([]);

        setLoadingTBL_KSV_INVOICE_MST2(true);

        serviceS0708_MANAGE_BUYER_INPUT.mgrQuery_LIST_2(tInObj).then((data) => {
            setLoadingTBL_KSV_INVOICE_MST2(false);
            if (typeof data.graphQLErrors === "undefined") {
                console.log(
                    "ServiceMgrKCD_BUYER.mgr1KcdStyle call => " + data.length,
                );

                const formatted = data.map((item) => ({
                    ...item,
                    BALANCE: Number(item.BALANCE).toFixed(2),
                    TOT_AMT: Number(item.TOT_AMT).toFixed(2),
                }));

                data = JSON.parse(JSON.stringify(formatted));

                if (data.length <= 0) {
                    setDatasTBL_KSV_INVOICE_MST2([]);
                    return;
                }

                var tArray2 = data.map((col, i) => {
                    var tObj = { ...col };
                    tObj.id = i + 1;
                    tObj.IN_AMT = tObj.BALANCE;
                    return tObj;
                });
                setDatasTBL_KSV_INVOICE_MST2(tArray2);
            } else {
                console.log(
                    "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });
    };

    const search_LIST_3 = (argData) => {
        var tInObj = {};
        tInObj.BUYER_CD = argData.BUYER_CD;

        setDatasTBL_KSV_INVOICE_MST3([]);
        setSelectedTBL_KSV_INVOICE_MST3([]);

        setLoadingTBL_KSV_INVOICE_MST3(true);

        serviceS0708_MANAGE_BUYER_INPUT.mgrQuery_LIST_3(tInObj).then((data) => {
            setLoadingTBL_KSV_INVOICE_MST3(false);
            if (typeof data.graphQLErrors === "undefined") {
                console.log(
                    "ServiceMgrKCD_BUYER.mgr1KcdStyle call => " + data.length,
                );

                if (data.length <= 0) {
                    setDatasTBL_KSV_INVOICE_MST3([]);
                    return;
                }

                var tArray2 = data.map((col, i) => {
                    var tObj = { ...col };
                    tObj.id = i + 1;
                    if (parseFloat(tObj.BALANCE) > 0)
                        tObj.IN_AMT = tObj.BALANCE;
                    return tObj;
                });
                setDatasTBL_KSV_INVOICE_MST3(tArray2);
            } else {
                console.log(
                    "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });
    };

    const search_LIST_4 = (argData) => {
        var tInObj = { ...argData };

        setDatasTBL_KSV_INVOICE_MST4([]);
        setSelectedTBL_KSV_INVOICE_MST4([]);

        setLoadingTBL_KSV_INVOICE_MST4(true);

        serviceS0708_MANAGE_BUYER_INPUT.mgrQuery_LIST_4(tInObj).then((data) => {
            setLoadingTBL_KSV_INVOICE_MST4(false);
            if (typeof data.graphQLErrors === "undefined") {
                console.log(
                    "ServiceMgrKCD_BUYER.mgr1KcdStyle call => " + data.length,
                );

                if (data.length <= 0) {
                    setDatasTBL_KSV_INVOICE_MST4([]);
                    return;
                }

                var tArray2 = data.map((col, i) => {
                    var tObj = { ...col };
                    tObj.id = i + 1;
                    return tObj;
                });

                setDatasTBL_KSV_INVOICE_MST4(tArray2);
            } else {
                console.log(
                    "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });
    };

    const search_LIST_5 = (argData) => {
        var tInObj = { ...argData };

        setDatasTBL_KSV_INVOICE_MST1([]);
        setSelectedTBL_KSV_INVOICE_MST1([]);

        setLoadingTBL_KSV_INVOICE_MST1(true);

        serviceS0708_MANAGE_BUYER_INPUT.mgrQuery_LIST_5(tInObj).then((data) => {
            setLoadingTBL_KSV_INVOICE_MST1(false);
            if (typeof data.graphQLErrors === "undefined") {
                console.log(
                    "ServiceMgrKCD_BUYER.mgr1KcdStyle call => " + data.length,
                );

                if (data.length <= 0) {
                    setDatasTBL_KSV_INVOICE_MST1([]);
                    return;
                }

                var tArray2 = data.map((col, i) => {
                    var tObj = { ...col };
                    tObj.id = i + 1;
                    return tObj;
                });
                setDatasTBL_KSV_INVOICE_MST1(tArray2);
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

    const onInputChangeQRY_KSV_INVOICE_MST_REF_NO = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_INVOICE_MST = { ...dataQRY_KSV_INVOICE_MST };

        let tTypeVal = _dataQRY_KSV_INVOICE_MST[`${name}`];
        if (typeof tTypeVal === "string")
            _dataQRY_KSV_INVOICE_MST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_INVOICE_MST[`${name}`] = parseInt(val);

        setDataQRY_KSV_INVOICE_MST(_dataQRY_KSV_INVOICE_MST);
    };

    const onCalChangeQRY_KSV_INVOICE_MST_S_BILL_DATE = (e, name) => {
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

    const onCalChangeQRY_KSV_INVOICE_MST_E_BILL_DATE = (e, name) => {
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
        datasQRY_KSV_INVOICE_MST_END_TYPE,
        setDatasQRY_KSV_INVOICE_MST_END_TYPE,
    ] = useState([]);
    const [
        dataQRY_KSV_INVOICE_MST_END_TYPE,
        setDataQRY_KSV_INVOICE_MST_END_TYPE,
    ] = useState({});

    const onDropdownChangeQRY_KSV_INVOICE_MST_END_TYPE = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataQRY_KSV_INVOICE_MST = { ...dataQRY_KSV_INVOICE_MST };

        let tTypeVal = _dataQRY_KSV_INVOICE_MST[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_INVOICE_MST[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_INVOICE_MST[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_INVOICE_MST(_dataQRY_KSV_INVOICE_MST);
        setDataQRY_KSV_INVOICE_MST_END_TYPE(e.value);
    };

    /* TABLE KSV_INVOICE_MST*/
    // DEFINE DATAGRID : TBL_KSV_INVOICE_MST
    const [loadingTBL_KSV_INVOICE_MST, setLoadingTBL_KSV_INVOICE_MST] =
        useState(false);

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

    // DATAGRID CODE : TBL_KSV_INVOICE_MST

    const onRowClick1TBL_KSV_INVOICE_MST = (argData0) => {
        var argData = {};

        if (typeof argData0.length !== "undefined") {
            argData = argData0[0];
        } else {
            argData = argData0;
        }

        let argTBL_KSV_INVOICE_MST = argData;

        setDataTBL_KSV_INVOICE_MST(argTBL_KSV_INVOICE_MST);

        var tInObj = {};
        tInObj.BUYER_CD = argData.BUYER_CD;

        var tRetDate = serviceLib.getCurrDate().substring(0, 8);
        // tInObj.S_DUE_DATE = dataQRY_KSV_INVOICE_MST.S_PAY_DATE;
        tInObj.S_DUE_DATE = tRetDate;

        search_LIST_2(tInObj);
        search_LIST_3(tInObj);

        var tInObj1 = {};
        tInObj1.REF_NO = argData.REF_NO;
        tInObj1.PRE_FLAG = argData.PRE_FLAG;
        search_LIST_4(tInObj1);
        search_LIST_5(tInObj1);
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
            tObj.REF_NO = col.REF_NO;
            tArray.push(tObj);
        });

        if (tArray.length <= 0) {
            alert("처리할 데이타가 없습니다.<br><br>There is no data to process.");
            return;
        }

        setLoadingTBL_KSV_INVOICE_MST(true);
        serviceS0708_MANAGE_BUYER_INPUT
            .mgrQuery_EXCEL_TT_LIST(tArray)
            .then((data) => {
                setLoadingTBL_KSV_INVOICE_MST(false);
                if (typeof data.graphQLErrors === "undefined") {
                    if (data.length > 0) {
                        console.log(data);
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

    /**TABLE KSV_INVOICE_MST1 */
    // DEFINE DATAGRID : TBL_KSV_INVOICE_MST1
    const [loadingTBL_KSV_INVOICE_MST1, setLoadingTBL_KSV_INVOICE_MST1] =
        useState(false);

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
    const [loadingTBL_KSV_INVOICE_MST2, setLoadingTBL_KSV_INVOICE_MST2] =
        useState(false);

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

    // DATAGRID CODE : TBL_KSV_INVOICE_MST2

    const onRowClick1TBL_KSV_INVOICE_MST2 = (argData0) => {
        var argData = {};

        if (typeof argData0.length !== "undefined") {
            argData = argData0[0];
        } else {
            argData = argData0;
        }

        let argTBL_KSV_INVOICE_MST2 = argData;

        setDataTBL_KSV_INVOICE_MST2(argTBL_KSV_INVOICE_MST2);
    };

    /**TABLE KSV_INVOICE_MST3 */
    // DEFINE DATAGRID : TBL_KSV_INVOICE_MST3
    const [loadingTBL_KSV_INVOICE_MST3, setLoadingTBL_KSV_INVOICE_MST3] =
        useState(false);

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

    /**TABLE KSV_INVOICE_MST4 */
    // DEFINE DATAGRID : TBL_KSV_INVOICE_MST4
    const onRowClick1TBL_KSV_INVOICE_MST3 = (argData0) => {
        var argData = {};

        if (typeof argData0.length !== "undefined") {
            argData = argData0[0];
        } else {
            argData = argData0;
        }

        let argTBL_KSV_INVOICE_MST3 = argData;

        setDataTBL_KSV_INVOICE_MST3(argTBL_KSV_INVOICE_MST3);
    };

    const [loadingTBL_KSV_INVOICE_MST4, setLoadingTBL_KSV_INVOICE_MST4] =
        useState(false);

    const [datasTBL_KSV_INVOICE_MST4, setDatasTBL_KSV_INVOICE_MST4] = useState(
        [],
    );
    const dt_TBL_KSV_INVOICE_MST4 = useRef(null);
    const [dataTBL_KSV_INVOICE_MST4, setDataTBL_KSV_INVOICE_MST4] = useState(
        emptyTBL_KSV_INVOICE_MST4,
    );
    const [selectedTBL_KSV_INVOICE_MST4, setSelectedTBL_KSV_INVOICE_MST4] =
        useState([]);
    const [
        flagSelectModeTBL_KSV_INVOICE_MST4,
        setFlagSelectModeTBL_KSV_INVOICE_MST4,
    ] = useState(false);

    // DATAGRID CODE : TBL_KSV_INVOICE_MST4

    const onRowClick1TBL_KSV_INVOICE_MST4 = (argData0) => {
        var argData = {};

        if (typeof argData0.length !== "undefined") {
            argData = argData0[0];
        } else {
            argData = argData0;
        }

        let argTBL_KSV_INVOICE_MST4 = argData;

        setDataTBL_KSV_INVOICE_MST4(argTBL_KSV_INVOICE_MST4);
    };

    const onRowClickTBL_KSV_INVOICE_MST4 = (event) => {
        let argTBL_KSV_INVOICE_MST4 = event.data;
        if (flagSelectModeTBL_KSV_INVOICE_MST4) return;

        // Service : NawooAll:mgrQueryTBL_KSV_INVOICE_MST4
    };

    useEffect(() => {
        var _tObj = {};
        _tObj.BUYER_CD = "";

        serviceS0708_MANAGE_BUYER_INPUT.mgrQuery_CODE(_tObj).then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                var tRetDate = serviceLib.getCurrDate().substring(0, 8);

                var tObj = { ...emptyQRY_KSV_INVOICE_MST };
                tObj.S_BILL_DATE = `${tRetDate.substring(0, 6)}01`;
                tObj.E_BILL_DATE = tRetDate;
                setDataQRY_KSV_INVOICE_MST(tObj);

                setDatasQRY_KSV_INVOICE_MST_BUYER_CD(data.BUYER_CD);
                setDataQRY_KSV_INVOICE_MST_BUYER_CD(data.BUYER_CD[0]);

                setDatasQRY_KSV_INVOICE_MST_END_TYPE(data.END_TYPE);
                setDataQRY_KSV_INVOICE_MST_END_TYPE(data.END_TYPE[0]);
            } else {
                console.log(
                    "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });

        search_LIST_1();
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

    const onCellEditCompleteKSV_INVOICE_MST2 = (e) => {
        let { rowData, newValue, value, field, originalEvent: event } = e;
        var tRowData = { ...rowData };
        tRowData[field] = String(newValue ?? "");

        const syncSelectedRows = (selectedRows) => {
            return selectedRows.map((col) => {
                if (String(col.id) === String(tRowData.id)) {
                    return { ...col, [field]: tRowData[field] };
                }
                return col;
            });
        };

        var tUpdatedMst2 = false;
        var tArray2 = [];
        datasTBL_KSV_INVOICE_MST2.forEach((col, i) => {
            var tObj = { ...col };
            if (String(tObj.id) === String(tRowData.id)) {
                tArray2.push(tRowData);
                tUpdatedMst2 = true;
            } else {
                tArray2.push(tObj);
            }
        });

        if (tUpdatedMst2) {
            setDatasTBL_KSV_INVOICE_MST2(tArray2);
            setSelectedTBL_KSV_INVOICE_MST2(
                syncSelectedRows(selectedTBL_KSV_INVOICE_MST2),
            );
            return;
        }

        var tArray3 = [];
        datasTBL_KSV_INVOICE_MST3.forEach((col, i) => {
            var tObj = { ...col };
            if (String(tObj.id) === String(tRowData.id)) {
                tArray3.push(tRowData);
            } else {
                tArray3.push(tObj);
            }
        });

        setDatasTBL_KSV_INVOICE_MST3(tArray3);
        setSelectedTBL_KSV_INVOICE_MST3(
            syncSelectedRows(selectedTBL_KSV_INVOICE_MST3),
        );
    };

    // GUIDE: 에디터 컴포넌트에 onKeyDown 이벤트를 연결한다.
    const onChangeTextEdit = (e, options) => {
        const updatedValue = e.target.value;
        options.editorCallback(updatedValue);
    };

    const handleFocus = (event) => {
        console.log(event);
        event.target.select();
    };
    const textEditor = (options) => {
        return (
            <InputText
                type="text"
                value={options.value}
                onChange={(e) => {
                    onChangeTextEdit(e, options);
                }}
                onFocus={handleFocus}
            />
        );
    };

    const cellEditorKSV_INVOICE_MST2 = (options) => {
        return textEditor(options);
    };

    const topTableHeight = "calc(50vh - 1rem)";

    const bottomAreaHeight = `clamp(22rem, calc(100vh - ${topTableHeight} - 6rem), 50vh)`;
    const bottomEachTableHeight = `calc((${bottomAreaHeight} - 2rem) / 2)`;
    const bottomRightGridHeight = `calc(${bottomAreaHeight} - 3.5rem)`;

    const leftTopTableWrapStyle = {
        width: "calc(100vw - 43rem)",
        minWidth: "80rem",
        minHeight: "20rem",
        height: topTableHeight,
    };

    const rightTopTableWrapStyle = {
        marginLeft: "0.5rem",
        width: "42rem",
        minHeight: "20rem",
        height: topTableHeight,
    };

    const leftBottomWrapStyle = {
        width: "calc(100vw - 37.5rem)",
        minWidth: "85rem",
        height: bottomAreaHeight,
        paddingTop: "0.5rem",
    };

    const leftBottomTableStyle = {
        width: "calc(100vw - 44rem)",
        minWidth: "78rem",
    };

    const topRowStyle = {
        display: "flex",
        flexWrap: "nowrap",
        alignItems: "flex-start",
        width: "95%",
    };

    const bottomRowStyle = {
        display: "flex",
        flexWrap: "nowrap",
        alignItems: "flex-start",
        width: "95%",
    };

    return (
        <div className="af-div-main" style={{ minWidth: "124rem", overflowX: "hidden", overflowY: "hidden" }}>
            <div
                className="af-div-first"
                style={{ width: "123rem", height: "3rem" }}
            >
                <span className="af-span-3-0" style={{ width: "14rem" }}>
                    <p className="af-span-p" style={{ width: "4rem" }}>Buyer</p>
                    <div className="af-span-div" style={{ width: "9rem" }}>
                        <Dropdown
                            filter
                            style={{ width: "9rem" }}
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
                        ></Dropdown>
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "16rem" }}>
                    <p className="af-span-p" style={{ width: "6rem" }}>임금예정일</p>
                    <div className="af-span-div" style={{ width: "9rem" }}>
                        <Calendar
                            showButtonBar
                            style={{ width: "9rem" }}
                            dateFormat="yy-mm-dd"
                            id="id_S_BILL_DATE"
                            value={changeDateVal(
                                dataQRY_KSV_INVOICE_MST.S_BILL_DATE,
                            )}
                            onChange={(e) =>
                                onCalChangeQRY_KSV_INVOICE_MST_S_BILL_DATE(
                                    e,
                                    "S_BILL_DATE",
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
                            id="id_E_BILL_DATE"
                            value={changeDateVal(
                                dataQRY_KSV_INVOICE_MST.E_BILL_DATE,
                            )}
                            onChange={(e) =>
                                onCalChangeQRY_KSV_INVOICE_MST_E_BILL_DATE(
                                    e,
                                    "E_BILL_DATE",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "16rem" }}>
                    <p className="af-span-p" style={{ width: "6rem" }}>End Type</p>
                    <div className="af-span-div" style={{ width: "9rem" }}>
                        <Dropdown
                            style={{ width: "9rem" }}
                            id="id_END_TYPE"
                            value={dataQRY_KSV_INVOICE_MST_END_TYPE}
                            onChange={(e) =>
                                onDropdownChangeQRY_KSV_INVOICE_MST_END_TYPE(
                                    e,
                                    "END_TYPE",
                                )
                            }
                            options={datasQRY_KSV_INVOICE_MST_END_TYPE}
                            optionLabel="CD_NAME"
                            placeholder=""
                            editable
                        ></Dropdown>
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "16rem" }}>
                    <p className="af-span-p" style={{ width: "4rem" }}>Ref#</p>
                    <div className="af-span-div" style={{ width: "11rem" }}>
                        <InputText
                            style={{ width: "11rem" }}
                            id="id_CREDIT_AMT"
                            value={dataQRY_KSV_INVOICE_MST.REF_NO}
                            onChange={(e) =>
                                onInputChangeQRY_KSV_INVOICE_MST_REF_NO(
                                    e,
                                    "REF_NO",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "10rem" }}>
                    <div className="af-span-div-btn" style={{ width: "10rem" }}>
                        <Button
                            label={
                                <span>
                                    Search(<u>S</u>)
                                </span>
                            }
                            style={{ width: "10rem" }}
                            className="p-button-text"
                            onClick={search_LIST_1}
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "10rem" }}>
                    <div className="af-span-div-btn" style={{ width: "10rem" }}>
                        <Button
                            label="#미정산리스트"
                            style={{ width: "10rem" }}
                            className="p-button-text"
                            onClick={blankFn}
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "10rem" }}>
                    <div className="af-span-div-btn" style={{ width: "10rem" }}>
                        <Button
                            label="#입금조회"
                            style={{ width: "10rem" }}
                            className="p-button-text"
                            onClick={blankFn}
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "10rem" }}>
                    <div className="af-span-div-btn" style={{ width: "10rem" }}>
                        <Button
                            label="TT 입금리스트"
                            style={{ width: "10rem" }}
                            className="p-button-text green"
                            onClick={exportExcelTBL_KSV_INVOICE_MST}
                        />
                    </div>
                </span>
            </div>

            <div style={topRowStyle}>

            <div
                className="af-div-second"
                style={{ ...leftTopTableWrapStyle, flex: "1 0 auto", float: "none" }}
            >
                <div
                    className="af-div-second"
                    style={leftTopTableWrapStyle}
                >
                    <AFDataTable preventUnrelatedRerender
                        style={{ width: "100%" }}
                        ref={dt_TBL_KSV_INVOICE_MST}
                        size="small"
                        value={datasTBL_KSV_INVOICE_MST}
                        tableStyle={{ tableLayout: "fixed" }}
                        loading={loadingTBL_KSV_INVOICE_MST}
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
                        scrollHeight={topTableHeight}
                    >
                        <AFColumn field="REF_NO" headerClassName="t-header" header="Ref no" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                        <AFColumn field="BANK_NAME" headerClassName="t-header" header="Bank" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                        <AFColumn field="BUYER_NAME" headerClassName="t-header" header="Buyer" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                        <AFColumn field="BILL_DATE" headerClassName="t-header" header="입금일자" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} body={(rowData) => serviceLib.dateFormatHMS(rowData.BILL_DATE) } ></AFColumn>
                        <AFColumn field="CURR_CD" headerClassName="t-header" header="통화" style={{ width: "4rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                        <AFColumn field="BILL_AMT" headerClassName="t-header" header="입금금액" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.BILL_AMT, 2) } ></AFColumn>
                        <AFColumn field="CHECK_AMT" headerClassName="t-header" header="확인금액" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.CHECK_AMT, 2) } ></AFColumn>
                        <AFColumn field="BALANCE" headerClassName="t-header" header="Balance" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.BALANCE, 2) } ></AFColumn>
                        <AFColumn field="END_FLAG_N" headerClassName="t-header" header="End" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                        <AFColumn field="PRE_FLAG_N" headerClassName="t-header" header="Type" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                        <AFColumn field="TOT_AMT" headerClassName="t-header" header="Tot Amt" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.TOT_AMT, 2) } ></AFColumn>
                        <AFColumn field="CREDIT_AMT" headerClassName="t-header" header="Credit Amt" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.CREDIT_AMT, 2) } ></AFColumn>
                        <AFColumn field="CHARGE" headerClassName="t-header" header="Charge" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.CHARGE, 2) } ></AFColumn>
                        <AFColumn field="REG_USER" headerClassName="t-header" header="Reg User" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                        <AFColumn field="REMARK" headerClassName="t-header" header="Remark" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                        <AFColumn field="BUYER_CD" headerClassName="t-header" header="Buyer" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                        <AFColumn field="BANK_CD" headerClassName="t-header" header="Bank" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                        <AFColumn field="MOM_CD" headerClassName="t-header" header="Mom Cd" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    </AFDataTable>
                </div>
            </div>
            <div
                className="af-div-second"
                style={{ ...rightTopTableWrapStyle, flex: "0 0 42rem", float: "none", paddingTop: "0.5rem" }}
            >
                <AFDataTable preventUnrelatedRerender
                    style={{ width: "100%" }}
                    ref={dt_TBL_KSV_INVOICE_MST1}
                    size="small"
                    value={datasTBL_KSV_INVOICE_MST1}
                    loading={loadingTBL_KSV_INVOICE_MST1}
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
                    scrollHeight={topTableHeight}
                >
                    <AFColumn field="CREDIT_CD" headerClassName="t-header" header="Credit No" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="CREDIT_AMT" headerClassName="t-header" header="금액" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.CREDIT_AMT, 2) } ></AFColumn>
                </AFDataTable>
            </div>

            </div>

            <div style={bottomRowStyle}>

            <div
                className="af-div-first"
                style={{ ...leftBottomWrapStyle, flex: "1 0 auto", float: "none" }}
            >
                <div
                    className="af-div-first"
                    style={{ ...leftBottomTableStyle, height: bottomEachTableHeight }}
                >
                    <AFDataTable preventUnrelatedRerender
                        style={{ width: "100%" }}
                        ref={dt_TBL_KSV_INVOICE_MST2}
                        size="small"
                        value={datasTBL_KSV_INVOICE_MST2}
                        tableStyle={{ tableLayout: "fixed" }}
                        loading={loadingTBL_KSV_INVOICE_MST2}
                        resizableColumns
                        columnResizeMode="expand"
                        showGridlines
                        selectionMode="checkbox"
                        selection={selectedTBL_KSV_INVOICE_MST2}
                        onSelectionChange={(e) => {
                            setSelectedTBL_KSV_INVOICE_MST2(e.value);
                            onRowClick1TBL_KSV_INVOICE_MST2(e.value);
                        }}
                        // onRowClick={onRowClickTBL_KSV_INVOICE_MST2}
                        dataKey="id"
                        className="datatable-responsive"
                        virtualScrollerOptions={{ itemSize: 20 }}
                        emptyMessage=" " //header={headerTBL_KSV_INVOICE_MST2}
                        responsiveLayout="scroll"
                        editMode="cell"
                        scrollable
                        scrollHeight={bottomEachTableHeight}
                    >
                        <AFColumn selectionMode="multiple" field="__checkbox__" reorderable={false} headerClassName="t-header" headerStyle={{ width: "3rem" }} ></AFColumn>
                        <AFColumn field="INVOICE_NO" headerClassName="t-header" header="Invoice No" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                        <AFColumn field="CURR_CD" headerClassName="t-header" header="통화" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                        <AFColumn field="TOT_AMT" headerClassName="t-header" header="Amount" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.TOT_AMT, 2) } ></AFColumn>
                        <AFColumn field="SHIP_DATE" headerClassName="t-header" header="선적일" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} body={(rowData) => serviceLib.dateFormatHMS(rowData.SHIP_DATE) } ></AFColumn>
                        <AFColumn field="DUE_DATE" headerClassName="t-header" header="입금예정일" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} body={(rowData) => serviceLib.dateFormatHMS(rowData.DUE_DATE) } ></AFColumn>
                        <AFColumn field="IN_AMT" headerClassName="t-header" header="금회입금액" style={{ color: "green", width: "10rem", height: "1.8rem", flexBasis: "auto", }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.IN_AMT, 2) } editor={(options) => cellEditorKSV_INVOICE_MST2(options) } onCellEditComplete={ onCellEditCompleteKSV_INVOICE_MST2 } ></AFColumn>
                        <AFColumn field="OA_NEGO" headerClassName="t-header" header="OA Nego" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.OA_NEGO, 2) } ></AFColumn>
                        <AFColumn field="BALANCE" headerClassName="t-header" header="미입금잔액" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.BALANCE, 2) } ></AFColumn>
                        <AFColumn field="TAX_TOT_AMT" headerClassName="t-header" header="전표발행금액" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.TAX_TOT_AMT, 2) } ></AFColumn>
                        <AFColumn field="BUYER_NAME" headerClassName="t-header" header="Buyer" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                        <AFColumn field="TAX_CD" headerClassName="t-header" header="Tax#" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    </AFDataTable>
                </div>
                <div
                    className="af-div-second"
                    style={{ width: "6rem", height: bottomEachTableHeight,paddingTop: "6rem" }}
                >
                    <span className="af-span-3-0" style={{ width: "5rem" }}>
                        <div
                            className="af-span-div-btn"
                            style={{ width: "4rem" }}
                        >
                            <Button
                                label="->"
                                style={{ width: "4rem" }}
                                className="p-button-text"
                                onClick={process_INSERT_BILL}
                            />
                        </div>
                    </span>
                    <span className="af-span-3-0" style={{ width: "5rem" }}>
                        <div
                            className="af-span-div-btn"
                            style={{ width: "4rem" }}
                        >
                            <Button
                                label="<-"
                                style={{ width: "4rem" }}
                                className="p-button-text"
                                onClick={process_DELETE_BILL}
                            />
                        </div>
                    </span>
                </div>

                <div
                    className="af-div-first"
                    style={{ ...leftBottomTableStyle, height: bottomEachTableHeight, paddingTop: "0.5rem" }}
                >
                    <AFDataTable preventUnrelatedRerender
                        style={{ width: "100%" }}
                        ref={dt_TBL_KSV_INVOICE_MST3}
                        size="small"
                        value={datasTBL_KSV_INVOICE_MST3}
                        loading={loadingTBL_KSV_INVOICE_MST3}
                        tableStyle={{ tableLayout: "fixed" }}
                        resizableColumns
                        columnResizeMode="expand"
                        showGridlines
                        selectionMode="checkbox"
                        selection={selectedTBL_KSV_INVOICE_MST3}
                        onSelectionChange={(e) => {
                            setSelectedTBL_KSV_INVOICE_MST3(e.value);
                            onRowClick1TBL_KSV_INVOICE_MST3(e.value);
                        }}
                        // onRowClick={onRowClickTBL_KSV_INVOICE_MST3}
                        dataKey="id"
                        className="datatable-responsive"
                        virtualScrollerOptions={{ itemSize: 20 }}
                        emptyMessage=" " // header={headerTBL_KSV_INVOICE_MST3}
                        responsiveLayout="scroll"
                        scrollable
                        scrollHeight={bottomEachTableHeight}
                    >
                        <AFColumn selectionMode="multiple" field="__checkbox__" reorderable={false} headerClassName="t-header" headerStyle={{ width: "3rem" }} ></AFColumn>
                        <AFColumn field="CRDB_CD" headerClassName="t-header" header="Debit/Credit" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                        <AFColumn field="CURR_CD" headerClassName="t-header" header="통화" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                        <AFColumn field="END_DATE" headerClassName="t-header" header="정산일" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} body={(rowData) => serviceLib.dateFormatHMS(rowData.END_DATE) } ></AFColumn>
                        <AFColumn field="CRDB_AMT" headerClassName="t-header" header="Amount" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.CRDB_AMT, 2) } ></AFColumn>
                        <AFColumn field="BALANCE" headerClassName="t-header" header="Balance" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.BALANCE, 2) } ></AFColumn>
                        <AFColumn field="IN_AMT" headerClassName="t-header" header="금회입금액" style={{ color: "green", width: "10rem", height: "1.8rem", flexBasis: "auto", }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.IN_AMT, 2) } editor={(options) => cellEditorKSV_INVOICE_MST2(options) } onCellEditComplete={ onCellEditCompleteKSV_INVOICE_MST2 } ></AFColumn>
                        <AFColumn field="REST_AMT" headerClassName="t-header" header="미입금잔액" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.REST_AMT, 2) } ></AFColumn>
                        <AFColumn field="VAT_AMT" headerClassName="t-header" header="Vat" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.VAT_AMT, 2) } ></AFColumn>
                        <AFColumn field="BUYER_NAME" headerClassName="t-header" header="Buyer" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                        <AFColumn field="ORG_AMT" headerClassName="t-header" header="Org Amt" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.ORG_AMT, 2) } ></AFColumn>
                    </AFDataTable>
                </div>

                <div
                    className="af-div-second"
                    style={{ width: "6rem", height: bottomEachTableHeight, paddingTop: "6rem" }}
                >
                    <span className="af-span-3-0" style={{ width: "5rem" }}>
                        <div
                            className="af-span-div-btn"
                            style={{ width: "4rem" }}
                        >
                            <Button
                                label="->"
                                style={{ width: "4rem" }}
                                className="p-button-text"
                                onClick={process_INSERT_DC}
                            />
                        </div>
                    </span>
                    <span className="af-span-3-0" style={{ width: "5rem" }}>
                        <div
                            className="af-span-div-btn"
                            style={{ width: "4rem" }}
                        >
                            <Button
                                label="<-"
                                style={{ width: "4rem" }}
                                className="p-button-text"
                                onClick={process_DELETE_DC}
                            />
                        </div>
                    </span>
                </div>
            </div>

            <div
                className="af-div-first"
                style={{ width: "37rem", height: bottomRightGridHeight, flex: "0 0 37rem", float: "none" }}
            >
                <span className="af-span-3-0" style={{ width: "13rem" }}>
                    <div className="af-span-div-btn" style={{ width: "12rem" }}>
                        <Button
                            label="Credit 삭제"
                            style={{ width: "12rem" }}
                            className="p-button-text"
                            onClick={process_DELETE_CREDIT}
                        />
                    </div>
                </span>
                <AFDataTable preventUnrelatedRerender
                    ref={dt_TBL_KSV_INVOICE_MST4}
                    size="small"
                    value={datasTBL_KSV_INVOICE_MST4}
                    loading={loadingTBL_KSV_INVOICE_MST4}
                    tableStyle={{ tableLayout: "fixed" }}
                    resizableColumns
                    columnResizeMode="expand"
                    showGridlines
                    selectionMode="checkbox"
                    selection={selectedTBL_KSV_INVOICE_MST4}
                    onSelectionChange={(e) => {
                        setFlagSelectModeTBL_KSV_INVOICE_MST4(true);
                        setSelectedTBL_KSV_INVOICE_MST4(e.value);
                        console.log(
                            "selected length:" +
                                selectedTBL_KSV_INVOICE_MST4.length,
                        );
                        onRowClick1TBL_KSV_INVOICE_MST4(e.value);
                    }}
                    onRowClick={onRowClickTBL_KSV_INVOICE_MST4}
                    dataKey="id"
                    className="datatable-responsive"
                    virtualScrollerOptions={{ itemSize: 20 }}
                    emptyMessage=" " //header={headerTBL_KSV_INVOICE_MST4}
                    responsiveLayout="scroll"
                    scrollable
                    scrollHeight={bottomRightGridHeight}
                >
                    <AFColumn field="BILL_DATE" headerClassName="t-header" header="입금예정일" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} body={(rowData) => serviceLib.dateFormatHMS(rowData.BILL_DATE) } ></AFColumn>
                    <AFColumn field="BILL_AMT" headerClassName="t-header" header="입금액" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.BILL_AMT, 2) } ></AFColumn>
                    <AFColumn field="INVOICE_NO" headerClassName="t-header" header="Invoice/Debit" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="CURRENCY_RATE" headerClassName="t-header" header="환율" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.CURRENCY_RATE, 4) } ></AFColumn>
                </AFDataTable>
            </div>

            </div>

            <Toast ref={toast} />
        </div>
    );
};

const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(S0708_MANAGE_BUYER_INPUT, comparisonFn);
