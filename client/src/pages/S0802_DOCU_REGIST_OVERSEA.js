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
import { ServiceS0802_DOCU_REGIST_OVERSEA } from "../service/service_biz/ServiceS0802_DOCU_REGIST_OVERSEA";
import { ServiceS0513_SHIPPING_LIST } from "../service/service_biz/ServiceS0513_SHIPPING_LIST"; // FOR PAYMENT TYPE

import "./page_common.scss";

const moment = require("moment");

const emptyKCD_CODE = {
    id: 0,
    CD_GROUP: "",
    CD_CODE: "",
    CD_NAME: "",
    CD_FLAG: "",
};

const emptyQRY_KSV_ORDER_SHIP = {
    S_SHIP_DATE: "",
    E_SHIP_DATE: "",
    INVOICE_NO: "",
    FACTORY_CD: "",
    BUYER_CD: "",
    STYLE_CD: "",
    ORDER_CD: "",
    SHIP_MODE: "",
    DELIVERY_TYPE: "",
};

const emptyQRY_KSV_ORDER_SHIP1 = {
    TYPE: "Advance",
    PAY_TO: "",
    BUYER_CD: "",
};

const emptyEDT_KSV_ORDER_SHIP1 = {
    DEPOSIT_AMT: "",
    CRDB_CD: "",
};

const emptyEDT_KSV_ORDER_SHIP = {
    INVOICE_NO: "",
    INCOME_DATE1: "",
    AMOUNT1: "",
    INCOME_DATE2: "",
    AMOUNT2: "",
    INCOME_DATE3: "",
    AMOUNT3: "",
    DOCU_NO: "",
    NEON_CODE: "",
    AMOUNT: "",
    INCOME_DATE: "",
    CURR_CD: "",
    VAT: "",
    PAYMENT_CONDITION: "",
    REMARK: "",
    CRDB_CD: "",
    DEPOSIT_AMT: "0",
};

const S0802_DOCU_REGIST_OVERSEA = () => {
    const serviceLibRef = useRef(null);
    if (!serviceLibRef.current) {
        serviceLibRef.current = new ServiceLib();
        serviceLibRef.current.loginConfirm();
    }
    const serviceLib = serviceLibRef.current;
    const serviceS0802_DOCU_REGIST_OVERSEA =
        new ServiceS0802_DOCU_REGIST_OVERSEA();
    const serviceS0513_SHIPPING_LIST = new ServiceS0513_SHIPPING_LIST(); // FOR PAYMENT TYPE

    const toast = useRef(null);

    /* splitter 관련 */
    const [styleVal, setStyleVal] = useState({ width: "65vw" });

    const [urlIframe, setUrlIframe] = useState("");
    const [createDialog, setCreateDialog] = useState(false);
    const hideDialog = () => {
        setCreateDialog(false);
    };

    const popup_DEPOSIT_APPLY = () => {
        if (selectedTBL_KSV_ORDER_SHIP.length <= 0) {
            alert("작업할 데이타를 선택하세요<br><br>Choose the data you want to work with");
            return;
        }

        var tInData = {};
        tInData.BUYER_CD = selectedTBL_KSV_ORDER_SHIP[0].BUYER_CD;
        tInData.PAY_TO = selectedTBL_KSV_ORDER_SHIP[0].BUYER_NAME;

        setCreateDialog(true);
        search_DEPOSIT_APPLY(tInData);
    };

    //

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

    const search_DEPOSIT_APPLY = (argData) => {
        var tQryObj = { ...dataQRY_KSV_ORDER_SHIP1 };
        tQryObj.PAY_TO = argData.PAY_TO;
        tQryObj.BUYER_CD = argData.BUYER_CD;
        setDataQRY_KSV_ORDER_SHIP1(tQryObj);

        setDatasTBL_KSV_ORDER_SHIP2([]);
        setSelectedTBL_KSV_ORDER_SHIP2([]);
        setDataEDT_KSV_ORDER_SHIP1(emptyEDT_KSV_ORDER_SHIP1);

        setLoadingTBL_KSV_ORDER_SHIP2(true);
        // 2
        serviceS0802_DOCU_REGIST_OVERSEA
            .mgrQuery_LIST_DEPOSIT(tQryObj)
            .then((data) => {
                setLoadingTBL_KSV_ORDER_SHIP2(false);
                if (typeof data.graphQLErrors === "undefined") {
                    var tArray2 = [];
                    data.forEach((col, i) => {
                        var tObj = { ...col };
                        tObj.id = i + 1;
                        tArray2.push(tObj);
                    });
                    setDatasTBL_KSV_ORDER_SHIP2(tArray2);
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
        if (typeof argData.INVOICE_NO !== "undefined") _tData = { ...argData };
        else
            _tData = {
                ...dataQRY_KSV_ORDER_SHIP,
                PAYMENT_TYPE: dataQRY_KSV_ORDER_SHIP_PAYMENT_TYPE.CD_CODE,
            };

        var saveArray = [];
        if (typeof argData.length !== "undefined") {
            saveArray = [...argData];
        }

        setDatasTBL_KSV_ORDER_SHIP([]);
        setSelectedTBL_KSV_ORDER_SHIP([]);
        setDataEDT_KSV_ORDER_SHIP(emptyEDT_KSV_ORDER_SHIP);

        console.log(_tData);
        setLoadingTBL_KSV_ORDER_SHIP(true);

        // 2
        serviceS0802_DOCU_REGIST_OVERSEA
            .mgrQuery_LIST_1(_tData)
            .then((data) => {
                setLoadingTBL_KSV_ORDER_SHIP(false);
                if (typeof data.graphQLErrors === "undefined") {
                    console.log(
                        "ServiceMgrKCD_BUYER.mgr1KcdStyle call => " +
                            data.length,
                    );
                    var tArray2 = [];
                    data.forEach((col, i) => {
                        var tObj = { ...col };
                        tObj.id = i + 1;
                        // var tTotalAmt = parseFloat(tObj.TOT_AMT) + parseFloat(tObj.DEPOSIT_AMT);
                        var tTotalAmt = parseFloat(tObj.TOT_AMT);
                        tObj.TOTAL_AMT = tTotalAmt.toFixed(2);
                        saveArray.forEach((col1, i1) => {
                            if (col.INVOICE_NO === col1.INVOICE_NO) {
                                tArray2.push(tObj);
                            }
                        });
                        if (saveArray.length <= 0) tArray2.push(tObj);
                    });
                    setDatasTBL_KSV_ORDER_SHIP(tArray2);
                } else {
                    console.log(
                        "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });

        // search_CODE();
    };

    const process_DOCU_REGIST = () => {
        if (selectedTBL_KSV_ORDER_SHIP.length <= 0) return;

        var _tInput0_0 = [...selectedTBL_KSV_ORDER_SHIP];
        var _tInput0 = [];
        var tSaveBuyerCd = "";
        var tFlag = 0;
        var tFlag1 = 0;  // 잔표생성여부 Check
        var tFlag2 = 0;  // 입금예정일 입력여브

        _tInput0_0.forEach((col, i) => {
            var tObj = { ...col };
            if (i > 0 && col.BUYER_CD !== tSaveBuyerCd) tFlag = 1;
            if (typeof tObj.__typename !== "undefined") delete tObj.__typename;
            if (typeof tObj.id !== "undefined") delete tObj.id;
            if (tObj.DOCU_NO !== "") tFlag1 = 1;
            if (!tObj.INCOME_DATE && parseFloat(tObj.TOT_AMT1) > 0) tFlag2 = 1;
            _tInput0.push(tObj);
            tSaveBuyerCd = col.BUYER_CD;
        });

        if (tFlag > 0) {
            alert("다른 바이어는 같이 전표처리 할수 없습니다<br><br>Other buyers cannot process invoices together.");
            return;
        }
        if (tFlag1 > 0) {
            alert("이미 전표 처리된 데이타는 매출 처리 할수 없습니다<br><br>Data that has already been processed cannot be sold.");
            return;
        }
        if (tFlag2 > 0) {
            alert("매출입금예정일은 입력되어야 합니다.<br><br>The expected sales deposit date must be entered.");
            return;
        }

        var tObj = { ...dataEDT_KSV_ORDER_SHIP };

        var tInObj = {};
        tInObj.DOCU_NO = tObj.DOCU_NO;
        tInObj.NEOE_CODE = tObj.NEOE_CODE;
        tInObj.CURR_CD = tObj.CURR_CD;
        tInObj.VAT = tObj.VAT;
        tInObj.AMOUNT = tObj.AMOUNT;
        tInObj.INCOME_DATE = tObj.INCOME_DATE;
        tInObj.AMOUNT1 = tObj.AMOUNT1;
        tInObj.INCOME_DATE1 = tObj.INCOME_DATE1;
        tInObj.AMOUNT2 = tObj.AMOUNT2;
        tInObj.INCOME_DATE2 = tObj.INCOME_DATE2;
        tInObj.AMOUNT3 = tObj.AMOUNT3;
        tInObj.INCOME_DATE3 = tObj.INCOME_DATE3;
        
        /*
        if (tObj.INCOME_DATE === "") {
            // AMOUNT1과 DEPOSIT_AMT가 같으면 INCOME_DATE가 없어도 진행 가능 (리졸버에서 ATD 사용)
            if (parseFloat(tObj.AMOUNT1) !== parseFloat(tObj.DEPOSIT_AMT)) {
                if (tObj.INCOME_DATE1 !== "") {
                    tObj.INCOME_DATE = tObj.INCOME_DATE1;
                } else {
                    alert("매출입금예정일은 입력되어야 합니다.<br><br>The expected sales deposit date must be entered.");
                    return;
                }
            } else {
                // AMOUNT1 === DEPOSIT_AMT인 경우 ATD를 INCOME_DATE로 사용
                tInObj.INCOME_DATE = selectedTBL_KSV_ORDER_SHIP[0].ATD || "";
            }
        }
        */

        setLoadingTBL_KSV_ORDER_SHIP(true);
        serviceS0802_DOCU_REGIST_OVERSEA
            .mgrInsert_DOCU_REGIST(_tInput0, tInObj)
            .then((data) => {
                setLoadingTBL_KSV_ORDER_SHIP(false);
                if (typeof data.graphQLErrors === "undefined") {
                    if (typeof data.length === "undefined") {
                    } else {
                        alert(data[0].CODE);
                        if (data[0].CODE.includes("SUCC")) {
                            var tCols1 = data[0].CODE.split(":");
                            var tObj1 = { ...dataEDT_KSV_ORDER_SHIP };
                            tObj1.DOCU_NO = tCols1[1];
                            setDataEDT_KSV_ORDER_SHIP(tObj1);
                            search_LIST_1(selectedTBL_KSV_ORDER_SHIP);
                        }
                        alert("SUCCEED:Insert Order Ship\n" + data[0].CODE);
                    }
                } else {
                        alert("ERROR:Insert Order Ship\n" + JSON.stringify(data.graphQLErrors));
                }
            });
    };

    const process_UPDATE_INCOME_DATE = () => {
        if (selectedTBL_KSV_ORDER_SHIP.length <= 0) return;

        var _tInput0_0 = [...selectedTBL_KSV_ORDER_SHIP];
        var _tInput0 = [];
        var tSaveBuyerCd = "";
        var tFlag = 0;
        var tFlag1 = 0;
        _tInput0_0.forEach((col, i) => {
            var tObj = { ...col };
            if (i > 0 && col.BUYER_CD !== tSaveBuyerCd) tFlag = 1;
            if (typeof tObj.__typename !== "undefined") delete tObj.__typename;
            if (typeof tObj.id !== "undefined") delete tObj.id;
            if (tObj.DOCU_NO !== "") tFlag1 = 1;
            _tInput0.push(tObj);
            tSaveBuyerCd = col.BUYER_CD;
        });

        var tObj = { ...dataEDT_KSV_ORDER_SHIP };

        var tInObj = {};
        tInObj.INVOICE_NO = tObj.INVOICE_NO;
        tInObj.DOCU_NO = tObj.DOCU_NO;
        tInObj.NEOE_CODE = tObj.NEOE_CODE;
        tInObj.CURR_CD = tObj.CURR_CD;
        tInObj.AMOUNT = tObj.AMOUNT;
        tInObj.AMOUNT1 = tObj.AMOUNT1;
        tInObj.AMOUNT2 = tObj.AMOUNT2;
        tInObj.AMOUNT3 = tObj.AMOUNT3;
        tInObj.VAT = tObj.VAT;
        tInObj.INCOME_DATE = tObj.INCOME_DATE;
        tInObj.INCOME_DATE1 = tObj.INCOME_DATE1;
        tInObj.INCOME_DATE2 = tObj.INCOME_DATE2;
        tInObj.INCOME_DATE3 = tObj.INCOME_DATE3;

        if (tObj.INCOME_DATE1 === "" || parseFloat(tInObj.AMOUNT1) <= 0) {
            alert(
                "매출입금예정일 또는 금액이 입력되어야 합니다.(처음 매출입금예정일 항목은 입력되어야 합니다)",
            );
            return;
        }

        if (
            (tObj.INCOME_DATE2 !== "" && parseFloat(tInObj.AMOUNT2) <= 0) ||
            (tObj.INCOME_DATE2 === "" && parseFloat(tInObj.AMOUNT2) > 0)
        ) {
            alert("매출입금일 두번째 항목이 잘못 입력되었습니다<br><br>The second item of sales deposit date was entered incorrectly.");
            return;
        }

        if (
            (tObj.INCOME_DATE3 !== "" && parseFloat(tInObj.AMOUNT3) <= 0) ||
            (tObj.INCOME_DATE3 === "" && parseFloat(tInObj.AMOUNT3) > 0)
        ) {
            alert("매출입금일 세번째 항목이 잘못 입력되었습니다<br><br>The third item, sales deposit date, was entered incorrectly.");
            return;
        }

        setLoadingTBL_KSV_ORDER_SHIP(true);
        serviceS0802_DOCU_REGIST_OVERSEA
            .mgrInsert_UPDATE_INCOME_DATE(_tInput0, tInObj)
            .then((data) => {
                setLoadingTBL_KSV_ORDER_SHIP(false);
                if (typeof data.graphQLErrors === "undefined") {
                    if (typeof data.length === "undefined") {
                    } else {
                        alert(data[0].CODE);
                        if (data[0].CODE.includes("SUCC")) {
                            var tObj00 = { ...dataEDT_KSV_ORDER_SHIP };
                            tObj00.INCOME_DATE = tObj00.INCOME_DATE1;
                            setDataEDT_KSV_ORDER_SHIP(tObj00);
                            search_LIST_1({});
                        }
                        alert("SUCCEED:Insert Order Ship\n" + data[0].CODE);
                    }
                } else {
                    alert("ERROR:Insert Order Ship\n" + JSON.stringify(data.graphQLErrors));
                }
            });
    };

    const process_DEPOSIT_APPLY = () => {
        if (selectedTBL_KSV_ORDER_SHIP2.length <= 0) {
            alert("작업할 데이터를 선택하세요(2)<br><br>Select the data you want to work with (2)");
            return;
        }
        if (selectedTBL_KSV_ORDER_SHIP.length <= 0) {
            alert("작업할 데이터를 선택하세요(1)<br><br>Select the data you want to work with (1)");
            return;
        }

        var tSelObj = { ...selectedTBL_KSV_ORDER_SHIP[0] };
        var tSelObj2 = { ...selectedTBL_KSV_ORDER_SHIP2[0] };

        var tEdit = { ...dataEDT_KSV_ORDER_SHIP1 };
        tEdit.INVOICE_NO = tSelObj.INVOICE_NO;

        if (parseFloat(tEdit.DEPOSIT_AMT) > parseFloat(tSelObj2.USD_BAL)) {
            alert("Deposit금액은 Bal금액을 초과할수 없습니다<br><br>Deposit amount cannot exceed Bal amount.");
            return;
        }

        setLoadingTBL_KSV_ORDER_SHIP2(true);
        serviceS0802_DOCU_REGIST_OVERSEA
            .mgrInsert_UPDATE_DEPOSIT(tEdit)
            .then((data) => {
                setLoadingTBL_KSV_ORDER_SHIP2(false);
                if (typeof data.graphQLErrors === "undefined") {
                    if (typeof data.length === "undefined") {
                    } else {
                        alert(data[0].CODE);
                        if (data[0].CODE.includes("SUCC")) {
                            var tEdit1 = { ...dataEDT_KSV_ORDER_SHIP };
                            tEdit1.CRDB_CD = tEdit.CRDB_CD;
                            tEdit1.DEPOSIT_AMT = tEdit.DEPOSIT_AMT;
                            setDataEDT_KSV_ORDER_SHIP(tEdit1);
                            setCreateDialog(false);
                            search_LIST_1({});
                        }
                    }
                } else {
                    alert("ERROR:Insert Order Ship\n" + JSON.stringify(data.graphQLErrors));
                }
            });
    };

    const process_DEPOSIT_CANCEL = () => {
        if (selectedTBL_KSV_ORDER_SHIP.length <= 0) {
            alert("작업할 데이터를 선택하세요(1)<br><br>Select the data you want to work with (1)");
            return;
        }
        var tSelObj = { ...selectedTBL_KSV_ORDER_SHIP[0] };

        var tEdit = { ...dataEDT_KSV_ORDER_SHIP };
        if (tEdit.DOCU_NO) {
            alert("Deposit with docu_no applied cannot be deleted");
            return;
        }

        var tInObj = {};
        tInObj.CRDB_CD = tEdit.CRDB_CD;
        tInObj.DEPOSIT_AMT = tEdit.DEPOSIT_AMT;
        tInObj.INVOICE_NO = tSelObj.INVOICE_NO;

        setLoadingTBL_KSV_ORDER_SHIP(true);
        serviceS0802_DOCU_REGIST_OVERSEA
            .mgrInsert_DELETE_DEPOSIT(tInObj)
            .then((data) => {
                setLoadingTBL_KSV_ORDER_SHIP(false);
                if (typeof data.graphQLErrors === "undefined") {
                    if (typeof data.length === "undefined") {
                    } else {
                        alert(data[0].CODE);
                        if (data[0].CODE.includes("SUCC")) {
                            search_LIST_1({});
                        }
                    }
                } else {
                    alert("ERROR:Insert Order Ship\n" + JSON.stringify(data.graphQLErrors));
                }
            });
    };

    const process_DOCU_DELETE = () => {
        if (selectedTBL_KSV_ORDER_SHIP.length <= 0) return;

        var _tInput0_0 = [...selectedTBL_KSV_ORDER_SHIP];
        var _tInput0 = [];
        var tFlag = 0;
        _tInput0_0.forEach((col, i) => {
            var tObj = { ...col };
            if (typeof tObj.__typename !== "undefined") delete tObj.__typename;
            if (typeof tObj.id !== "undefined") delete tObj.id;
            if (tObj.DOCU_NO === "") tFlag = 1;
            _tInput0.push(tObj);
        });

        if (tFlag === 1) {
            alert("전표처리 되지않은 항목은 취소 처리 할 수 없습니다.<br><br>Items that have not been invoiced cannot be cancelled.");
            return;
        }

        var tObj = { ...dataEDT_KSV_ORDER_SHIP };

        var tInObj = {};
        tInObj.DOCU_NO = tObj.DOCU_NO;
        tInObj.NEOE_CODE = tObj.NEOE_CODE;
        tInObj.CURR_CD = tObj.CURR_CD;
        tInObj.AMOUNT = tObj.AMOUNT;
        tInObj.VAT = tObj.VAT;
        tInObj.INCOME_DATE = tObj.INCOME_DATE;

        setLoadingTBL_KSV_ORDER_SHIP(true);
        serviceS0802_DOCU_REGIST_OVERSEA
            .mgrInsert_DOCU_DELETE(_tInput0, tInObj)
            .then((data) => {
                setLoadingTBL_KSV_ORDER_SHIP(false);
                if (typeof data.graphQLErrors === "undefined") {
                    if (typeof data.length === "undefined") {
                    } else {
                        alert(data[0].CODE);
                        if (data[0].CODE.includes("SUCC")) {
                            var tCols1 = data[0].CODE.split(":");
                            var tObj1 = { ...dataEDT_KSV_ORDER_SHIP };
                            tObj1.DOCU_NO = "";
                            setDataEDT_KSV_ORDER_SHIP(tObj1);
                            search_LIST_1({});
                        }
                        alert("SUCCEED:Insert Order Ship\n" + data[0].CODE);
                    }
                } else {
                    alert("ERROR:Insert Order Ship\n" + JSON.stringify(data.graphQLErrors));
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
        datasQRY_KSV_ORDER_SHIP_SHIP_MODE,
        setDatasQRY_KSV_ORDER_SHIP_SHIP_MODE,
    ] = useState([]);
    const [
        dataQRY_KSV_ORDER_SHIP_SHIP_MODE,
        setDataQRY_KSV_ORDER_SHIP_SHIP_MODE,
    ] = useState({});

    const onDropdownChangeQRY_KSV_ORDER_SHIP_SHIP_MODE = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataQRY_KSV_ORDER_SHIP = { ...dataQRY_KSV_ORDER_SHIP };

        let tTypeVal = _dataQRY_KSV_ORDER_SHIP[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_ORDER_SHIP[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_ORDER_SHIP[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_ORDER_SHIP(_dataQRY_KSV_ORDER_SHIP);
        setDataQRY_KSV_ORDER_SHIP_SHIP_MODE(e.value);
    };

    const [
        datasQRY_KSV_ORDER_SHIP_DELIVERY_TYPE,
        setDatasQRY_KSV_ORDER_SHIP_DELIVERY_TYPE,
    ] = useState([]);
    const [
        dataQRY_KSV_ORDER_SHIP_DELIVERY_TYPE,
        setDataQRY_KSV_ORDER_SHIP_DELIVERY_TYPE,
    ] = useState({});

    const onDropdownChangeQRY_KSV_ORDER_SHIP_DELIVERY_TYPE = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataQRY_KSV_ORDER_SHIP = { ...dataQRY_KSV_ORDER_SHIP };

        let tTypeVal = _dataQRY_KSV_ORDER_SHIP[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_ORDER_SHIP[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_ORDER_SHIP[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_ORDER_SHIP(_dataQRY_KSV_ORDER_SHIP);
        setDataQRY_KSV_ORDER_SHIP_DELIVERY_TYPE(e.value);
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

    /*QRY KSV_STOCK_FACOUT */
    const [dataQRY_KSV_ORDER_SHIP1, setDataQRY_KSV_ORDER_SHIP1] = useState(
        emptyQRY_KSV_ORDER_SHIP1,
    );

    const onInputChangeQRY_KSV_ORDER_SHIP1_TYPE = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_ORDER_SHIP1 = { ...dataQRY_KSV_ORDER_SHIP1 };

        let tTypeVal = _dataQRY_KSV_ORDER_SHIP1[`${name}`];
        if (typeof tTypeVal === "string")
            _dataQRY_KSV_ORDER_SHIP1[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_ORDER_SHIP1[`${name}`] = parseInt(val);

        setDataQRY_KSV_ORDER_SHIP1(_dataQRY_KSV_ORDER_SHIP1);
    };
    const onInputChangeQRY_KSV_ORDER_SHIP1_PAY_TO = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_ORDER_SHIP1 = { ...dataQRY_KSV_ORDER_SHIP1 };

        let tTypeVal = _dataQRY_KSV_ORDER_SHIP1[`${name}`];
        if (typeof tTypeVal === "string")
            _dataQRY_KSV_ORDER_SHIP1[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_ORDER_SHIP1[`${name}`] = parseInt(val);

        setDataQRY_KSV_ORDER_SHIP1(_dataQRY_KSV_ORDER_SHIP1);
    };

    /*EDT KSV_STOCK_FACOUT */

    const [dataEDT_KSV_ORDER_SHIP1, setDataEDT_KSV_ORDER_SHIP1] = useState(
        emptyEDT_KSV_ORDER_SHIP1,
    );

    const onInputChangeEDT_KSV_ORDER_SHIP1_DEPOSIT_AMT = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_ORDER_SHIP1 = { ...dataEDT_KSV_ORDER_SHIP1 };

        let tTypeVal = _dataEDT_KSV_ORDER_SHIP1[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_ORDER_SHIP1[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_ORDER_SHIP1[`${name}`] = parseInt(val);

        setDataEDT_KSV_ORDER_SHIP1(_dataEDT_KSV_ORDER_SHIP1);
    };

    /*QRY KSV_STOCK_FACOUT */
    const [dataEDT_KSV_ORDER_SHIP, setDataEDT_KSV_ORDER_SHIP] = useState(
        emptyEDT_KSV_ORDER_SHIP,
    );

    const [
        datasEDT_KSV_ORDER_SHIP_CURR_CD,
        setDatasEDT_KSV_ORDER_SHIP_CURR_CD,
    ] = useState([]);
    const [dataEDT_KSV_ORDER_SHIP_CURR_CD, setDataEDT_KSV_ORDER_SHIP_CURR_CD] =
        useState({});

    const editEDT_KSV_ORDER_SHIP_CURR_CD = (argValue) => {
        let _dataEDT_KSV_ORDER_SHIP_CURR_CD =
            datasEDT_KSV_ORDER_SHIP_CURR_CD.filter(
                (val) => val.CD_CODE === argValue,
            );
        setDataEDT_KSV_ORDER_SHIP_CURR_CD(_dataEDT_KSV_ORDER_SHIP_CURR_CD[0]);
    };

    const onDropdownChangeEDT_KSV_ORDER_SHIP_CURR_CD = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataEDT_KSV_ORDER_SHIP = { ...dataEDT_KSV_ORDER_SHIP };

        let tTypeVal = _dataEDT_KSV_ORDER_SHIP[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_KSV_ORDER_SHIP[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_KSV_ORDER_SHIP[`${name}`] = parseInt(val);
        }

        setDataEDT_KSV_ORDER_SHIP(_dataEDT_KSV_ORDER_SHIP);
        setDataEDT_KSV_ORDER_SHIP_CURR_CD(e.value);
    };

    const [
        datasEDT_KSV_ORDER_SHIP_NEOE_CODE,
        setDatasEDT_KSV_ORDER_SHIP_NEOE_CODE,
    ] = useState([]);
    const [
        dataEDT_KSV_ORDER_SHIP_NEOE_CODE,
        setDataEDT_KSV_ORDER_SHIP_NEOE_CODE,
    ] = useState({});

    const editEDT_KSV_ORDER_SHIP_NEOE_CODE = (argValue) => {
        let _dataEDT_KSV_ORDER_SHIP_NEOE_CODE =
            datasEDT_KSV_ORDER_SHIP_NEOE_CODE.filter(
                (val) => val.CD_CODE === argValue,
            );
        setDataEDT_KSV_ORDER_SHIP_NEOE_CODE(
            _dataEDT_KSV_ORDER_SHIP_NEOE_CODE[0],
        );
    };

    const onInputChangeEDT_KSV_ORDER_SHIP_NEOE_CODE = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_ORDER_SHIP = { ...dataEDT_KSV_ORDER_SHIP };

        let tTypeVal = _dataEDT_KSV_ORDER_SHIP[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_ORDER_SHIP[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_ORDER_SHIP[`${name}`] = parseInt(val);

        setDataEDT_KSV_ORDER_SHIP(_dataEDT_KSV_ORDER_SHIP);
    };

    const onInputChangeEDT_KSV_ORDER_SHIP_CRDB_CD = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_ORDER_SHIP = { ...dataEDT_KSV_ORDER_SHIP };

        let tTypeVal = _dataEDT_KSV_ORDER_SHIP[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_ORDER_SHIP[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_ORDER_SHIP[`${name}`] = parseInt(val);

        setDataEDT_KSV_ORDER_SHIP(_dataEDT_KSV_ORDER_SHIP);
    };

    const onInputChangeEDT_KSV_ORDER_SHIP_DEPOSIT_AMT = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_ORDER_SHIP = { ...dataEDT_KSV_ORDER_SHIP };

        let tTypeVal = _dataEDT_KSV_ORDER_SHIP[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_ORDER_SHIP[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_ORDER_SHIP[`${name}`] = parseInt(val);

        setDataEDT_KSV_ORDER_SHIP(_dataEDT_KSV_ORDER_SHIP);
    };

    const onInputChangeEDT_KSV_ORDER_SHIP_REMARK = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_ORDER_SHIP = { ...dataEDT_KSV_ORDER_SHIP };

        let tTypeVal = _dataEDT_KSV_ORDER_SHIP[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_ORDER_SHIP[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_ORDER_SHIP[`${name}`] = parseInt(val);

        setDataEDT_KSV_ORDER_SHIP(_dataEDT_KSV_ORDER_SHIP);
    };

    const onInputChangeEDT_KSV_ORDER_SHIP_DOCU_NO = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_ORDER_SHIP = { ...dataEDT_KSV_ORDER_SHIP };

        let tTypeVal = _dataEDT_KSV_ORDER_SHIP[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_ORDER_SHIP[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_ORDER_SHIP[`${name}`] = parseInt(val);

        setDataEDT_KSV_ORDER_SHIP(_dataEDT_KSV_ORDER_SHIP);
    };

    const onInputChangeEDT_KSV_ORDER_SHIP_AMOUNT1 = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_ORDER_SHIP = { ...dataEDT_KSV_ORDER_SHIP };

        let tTypeVal = _dataEDT_KSV_ORDER_SHIP[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_ORDER_SHIP[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_ORDER_SHIP[`${name}`] = parseInt(val);

        setDataEDT_KSV_ORDER_SHIP(_dataEDT_KSV_ORDER_SHIP);
    };

    const onInputChangeEDT_KSV_ORDER_SHIP_AMOUNT2 = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_ORDER_SHIP = { ...dataEDT_KSV_ORDER_SHIP };

        let tTypeVal = _dataEDT_KSV_ORDER_SHIP[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_ORDER_SHIP[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_ORDER_SHIP[`${name}`] = parseInt(val);

        setDataEDT_KSV_ORDER_SHIP(_dataEDT_KSV_ORDER_SHIP);
    };
    const onInputChangeEDT_KSV_ORDER_SHIP_AMOUNT3 = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_ORDER_SHIP = { ...dataEDT_KSV_ORDER_SHIP };

        let tTypeVal = _dataEDT_KSV_ORDER_SHIP[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_ORDER_SHIP[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_ORDER_SHIP[`${name}`] = parseInt(val);

        setDataEDT_KSV_ORDER_SHIP(_dataEDT_KSV_ORDER_SHIP);
    };

    const onCalChangeEDT_KSV_ORDER_SHIP_INCOME_DATE1 = (e, name) => {
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
    const onCalChangeEDT_KSV_ORDER_SHIP_INCOME_DATE2 = (e, name) => {
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
    const onCalChangeEDT_KSV_ORDER_SHIP_INCOME_DATE3 = (e, name) => {
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
    const [loadingTBL_KSV_ORDER_SHIP, setLoadingTBL_KSV_ORDER_SHIP] = useState(false);

    // DATAGRID CODE : TBL_KSV_ORDER_SHIP

    const onRowClick1TBL_KSV_ORDER_SHIP = (argData0) => {
        if (typeof argData0 === "undefined") return;

        var argData = {};

        if (typeof argData0.length !== "undefined") {
            if (argData0.length > 0) {
                argData = argData0[argData0.length - 1];
            }
        } else {
            argData = argData0;
        }

        if (argData0.length > 0) {
            let argTBL_KSV_ORDER_SHIP = argData;

            setDataTBL_KSV_ORDER_SHIP(argTBL_KSV_ORDER_SHIP);
        }

        var _tObj = {};

        if (argData0.length <= 0) {
            _tObj.INVOICE_NO = "";
            _tObj.DOCU_NO = "";
            _tObj.NEOE_CODE = "";
            _tObj.CURR_CD = "";
            _tObj.AMOUNT = "";
            _tObj.AMOUNT1 = "";
            _tObj.AMOUNT2 = "";
            _tObj.AMOUNT3 = "";
            _tObj.VAT = "";
            _tObj.INCOME_DATE = "";
            _tObj.INCOME_DATE1 = "";
            _tObj.INCOME_DATE2 = "";
            _tObj.INCOME_DATE3 = "";
            editEDT_KSV_ORDER_SHIP_CURR_CD("");
            editEDT_KSV_ORDER_SHIP_NEOE_CODE("");
        } else {
            _tObj.INVOICE_NO = argData.INVOICE_NO;
            _tObj.DOCU_NO = argData.DOCU_NO;
            _tObj.NEOE_CODE = argData.NEOE_A23;
            _tObj.CURR_CD = argData.CURR_CD;
            _tObj.AMOUNT = argData.TOT_AMT;
            _tObj.AMOUNT = argData.ORD_AMT;
            _tObj.AMOUNT1 = argData.TOT_AMT1;
            _tObj.AMOUNT2 = argData.TOT_AMT2;
            _tObj.AMOUNT3 = argData.TOT_AMT3;
            _tObj.VAT = argData.VAT_AMT;
            _tObj.INCOME_DATE = argData.INCOME_DATE;
            _tObj.INCOME_DATE1 = argData.INCOME_DATE1;
            _tObj.INCOME_DATE2 = argData.INCOME_DATE2;
            _tObj.INCOME_DATE3 = argData.INCOME_DATE3;
            _tObj.CRDB_CD = argData.CRDB_CD;
            _tObj.DEPOSIT_AMT = argData.DEPOSIT_AMT;

            editEDT_KSV_ORDER_SHIP_CURR_CD(argData.CURR_CD);
            editEDT_KSV_ORDER_SHIP_NEOE_CODE(_tObj.NEOE_CODE);
        }
        setDataEDT_KSV_ORDER_SHIP(_tObj);
    };

    const exportExcelTBL_KSV_ORDER_SHIP = () => {
        const parseAmount = (value) => {
            if (value === null || typeof value === "undefined") return 0;
            const n = parseFloat(String(value).replace(/,/g, ""));
            return Number.isNaN(n) ? 0 : n;
        };

        const parseExcelDate = (value) => {
            if (!value) return "";
            if (value instanceof Date) return value;

            const toUtcDate = (momentDate) =>
                new Date(Date.UTC(momentDate.year(), momentDate.month(), momentDate.date()));

            const rawValue = String(value).trim();
            const parsed = moment(rawValue, ["YYYYMMDD", "YYYY-MM-DD", "YYYY/MM/DD"], true);
            if (parsed.isValid()) {
                return toUtcDate(parsed);
            }

            const fallback = moment(rawValue);
            return fallback.isValid() ? toUtcDate(fallback) : "";
        };

        var tArray = [];
        datasTBL_KSV_ORDER_SHIP.forEach((col, i) => {
            const tInvoiceAmt = parseAmount(col.TOT_AMT);
            const tOaAmt = parseAmount(col.OA_AMT);
            const tTtAmt1 = parseAmount(col.TT_AMT);
            const tTtAmt2 = parseAmount(col.TT_AMT1);
            const tTtAmt3 = parseAmount(col.TT_AMT2);
            const tTtAmt4 = parseAmount(col.TT_AMT3);
            const tReceivedAmt = tTtAmt1 + tTtAmt2 + tTtAmt3 + tTtAmt4;
            const tBalanceAmt = tInvoiceAmt - tReceivedAmt;

            var tObj = {};
            tObj["인보이스 번호"] = col.INVOICE_NO || "";
            tObj["바이어 명"] = col.BUYER_NAME || "";
            tObj["payment term"] = col.PAYMENT_TERM || "";
            tObj["ATD"] = serviceLib.dateFormat(col.ATD);
            tObj["DEPOSIT NO"] = col.CRDB_CD || "";
            tObj["DEPOSIT AMT"] = parseAmount(col.DEPOSIT_AMT);
            tObj["입금 예정일 1"] = serviceLib.dateFormat(col.INCOME_DATE1);
            tObj["입금 예정금액 1"] = parseAmount(col.TOT_AMT1);
            tObj["입금 예정일 2"] = serviceLib.dateFormat(col.INCOME_DATE2);
            tObj["입금 예정금액 2"] = parseAmount(col.TOT_AMT2);
            tObj["INVOICE AMT"] = tInvoiceAmt;
            tObj["RECEIVED AMT"] = tReceivedAmt;
            tObj["BALANCE AMT"] = tBalanceAmt;
            tObj["OA 실행일"] = serviceLib.dateFormat(col.OA_DATE);
            tObj["OA #"] = col.OA_REF_NO || "";
            tObj["OA AMT"] = tOaAmt;
            tObj["TT 입금일 1"] = serviceLib.dateFormat(col.TT_DATE);
            tObj["TT # 1"] = col.TT_REF_NO || "";
            tObj["TT AMT 1"] = tTtAmt1;
            tObj["TT 입금일 2"] = serviceLib.dateFormat(col.TT_DATE1);
            tObj["TT # 2"] = col.TT_REF_NO1 || "";
            tObj["TT AMT 2"] = tTtAmt2;
            tObj["TT 입금일 3"] = serviceLib.dateFormat(col.TT_DATE2);
            tObj["TT # 3"] = col.TT_REF_NO2 || "";
            tObj["TT AMT 3"] = tTtAmt3;
            tObj["TT 입금일 4"] = serviceLib.dateFormat(col.TT_DATE3);
            tObj["TT # 4"] = col.TT_REF_NO3 || "";
            tObj["TT AMT 4"] = tTtAmt4;
            tArray.push(tObj);
        });

        serviceLib.exportExcel("매출등록해외리스트", "매출등록해외리스트", tArray, {
            headerColor: "FFFDEB9C",
            dateColumns: [
                "ATD",
                "OA 실행일",
                "입금 예정일 1",
                "입금 예정일 2",
                "TT 입금일 1",
                "TT 입금일 2",
                "TT 입금일 3",
                "TT 입금일 4",
            ],
            dateValueParser: parseExcelDate,
            dateNumberFormat: "yyyy-mm-dd",
            columnNumberFormats: {
                "DEPOSIT AMT": '_($* #,##0.00_);_($* (#,##0.00);_($* "-"??_);_(@_)',
                "입금 예정금액 1": '_($* #,##0.00_);_($* (#,##0.00);_($* "-"??_);_(@_)',
                "입금 예정금액 2": '_($* #,##0.00_);_($* (#,##0.00);_($* "-"??_);_(@_)',
                "INVOICE AMT": '_($* #,##0.00_);_($* (#,##0.00);_($* "-"??_);_(@_)',
                "RECEIVED AMT": '_($* #,##0.00_);_($* (#,##0.00);_($* "-"??_);_(@_)',
                "BALANCE AMT": '_($* #,##0.00_);_($* (#,##0.00);_($* "-"??_);_(@_)',
                "OA AMT": '_($* #,##0.00_);_($* (#,##0.00);_($* "-"??_);_(@_)',
                "TT AMT 1": '_($* #,##0.00_);_($* (#,##0.00);_($* "-"??_);_(@_)',
                "TT AMT 2": '_($* #,##0.00_);_($* (#,##0.00);_($* "-"??_);_(@_)',
                "TT AMT 3": '_($* #,##0.00_);_($* (#,##0.00);_($* "-"??_);_(@_)',
                "TT AMT 4": '_($* #,##0.00_);_($* (#,##0.00);_($* "-"??_);_(@_)',
            },
        });
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

    const [datasMA_CODEDTL, setDatasMA_CODEDTL] = useState([]);
    const [datasMA_EXCHANGE, setDatasMA_EXCHANGE] = useState([]);
    const [datasFI_MNGD, setDatasFI_MNGD] = useState([]);

    // DATAGRID CODE : TBL_KSV_ORDER_SHIP2

    const onRowClick1TBL_KSV_ORDER_SHIP2 = (argData0) => {
        var argData = { ...argData0.data };

        let argTBL_KSV_ORDER_SHIP2 = argData;

        setDataTBL_KSV_ORDER_SHIP2(argTBL_KSV_ORDER_SHIP2);

        var tBalAmt = parseFloat(argData.USD_BAL);
        var tEdit = { ...dataEDT_KSV_ORDER_SHIP1 };
        tEdit.CRDB_CD = argData.CRDB_CD;
        tEdit.DEPOSIT_AMT = String(tBalAmt);
        setDataEDT_KSV_ORDER_SHIP1(tEdit);
    };

    const onRowClickTBL_KSV_ORDER_SHIP2 = (event) => {
        let argTBL_KSV_ORDER_SHIP2 = event.data;
        if (flagSelectModeTBL_KSV_ORDER_SHIP2) return;

        // Service : NawooAll:mgrQueryTBL_KSV_ORDER_SHIP2
    };

    useEffect(() => {
        var tRetDate = serviceLib.getCurrDate().substring(0, 8);
        var tQry = { ...dataQRY_KSV_ORDER_SHIP };
        tQry.S_SHIP_DATE = moment().startOf("year").format("YYYYMMDD");
        tQry.E_SHIP_DATE = "";
        setDataQRY_KSV_ORDER_SHIP(tQry);

        var _tObj = {};
        _tObj.BUYER_CD = "";

        serviceS0802_DOCU_REGIST_OVERSEA.mgrQuery_CODE(_tObj).then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                setDatasQRY_KSV_ORDER_SHIP_FACTORY_CD(data.FACTORY_CD);
                setDataQRY_KSV_ORDER_SHIP_FACTORY_CD(data.FACTORY_CD[0]);

                setDatasQRY_KSV_ORDER_SHIP_STYLE_CD(data.STYLE_CD);
                setDataQRY_KSV_ORDER_SHIP_STYLE_CD(data.STYLE_CD[0]);

                setDatasQRY_KSV_ORDER_SHIP_BUYER_CD(data.BUYER_CD);
                setDataQRY_KSV_ORDER_SHIP_BUYER_CD(data.BUYER_CD[0]);

                setDatasQRY_KSV_ORDER_SHIP_SHIP_MODE(data.SHIP_MODE);
                setDataQRY_KSV_ORDER_SHIP_SHIP_MODE(data.SHIP_MODE[0]);

                setDatasQRY_KSV_ORDER_SHIP_DELIVERY_TYPE(data.DELIVERY_TYPE);
                setDataQRY_KSV_ORDER_SHIP_DELIVERY_TYPE(data.DELIVERY_TYPE[0]);

                setDatasEDT_KSV_ORDER_SHIP_CURR_CD(data.CURR_CD);
                setDataEDT_KSV_ORDER_SHIP_CURR_CD(data.CURR_CD[0]);

                setDatasEDT_KSV_ORDER_SHIP_NEOE_CODE(data.NEOE_CODE);
                setDataEDT_KSV_ORDER_SHIP_NEOE_CODE(data.NEOE_CODE[0]);
            } else {
                console.log(
                    "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });

        serviceS0513_SHIPPING_LIST.mgrQuery_CODE(_tObj).then((data) => {
            setDatasQRY_KSV_ORDER_SHIP_PAYMENT_TYPE(data.PAYMENT_TYPE);
            setDataQRY_KSV_ORDER_SHIP_PAYMENT_TYPE(data.PAYMENT_TYPE[0]);
        });

        var tObj2 = {};
        tObj2.CURR_DATE = "20241022";
        serviceS0802_DOCU_REGIST_OVERSEA
            .mgrQuery_NEOE_INFO(tObj2)
            .then((data) => {
                if (typeof data.graphQLErrors === "undefined") {
                    if (data.MA_CODEDTL.length > 0)
                        setDatasMA_CODEDTL(data.MA_CODEDTL);
                    if (data.MA_EXCHANGE.length > 0)
                        setDatasMA_EXCHANGE(data.MA_EXCHANGE);
                    if (data.FI_MNGD.length > 0) setDatasFI_MNGD(data.FI_MNGD);
                } else {
                    console.log("mgrQuery_NEOE_CODE call => Error");
                    // var tStr = data.graphQLErrors[0].message;
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
                style={{ width: "123rem", height: "6rem" }}
            >
                <span className="af-span-3-0" style={{ width: "27rem" }}>
                    <p className="af-span-p" style={{ width: "7rem" }}>Ship Date</p>
                    <div className="af-span-div" style={{ width: "9rem" }}>
                        <Calendar
                            showButtonBar
                            style={{ width: "9rem" }}
                            dateFormat="yy-mm-dd"
                            id="id_E_DUE_DATE"
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
                    <div className="af-span-div" style={{ width: "9rem" }}>
                        <Calendar
                            showButtonBar
                            style={{ width: "9rem" }}
                            dateFormat="yy-mm-dd"
                            id="id_E_DUE_DATE"
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
                <span className="af-span-3-0" style={{ width: "27rem" }}>
                    <p className="af-span-p" style={{ width: "7rem" }}>Invoice#</p>
                    <div className="af-span-div" style={{ width: "19rem" }}>
                        <InputText
                            style={{ width: "19rem" }}
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
                <span className="af-span-3-0" style={{ width: "20rem" }}>
                    <p className="af-span-p" style={{ width: "7rem" }}>Factory</p>
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
                <span className="af-span-3-0" style={{ width: "20rem" }}>
                    <p className="af-span-p" style={{ width: "7rem" }}>Ship Kind</p>
                    <div className="af-span-div" style={{ width: "12rem" }}>
                        <Dropdown
                            style={{ width: "12rem" }}
                            id="id_ORDER_CD"
                            value={dataQRY_KSV_ORDER_SHIP_SHIP_MODE}
                            onChange={(e) =>
                                onDropdownChangeQRY_KSV_ORDER_SHIP_SHIP_MODE(
                                    e,
                                    "SHIP_MODE",
                                )
                            }
                            options={datasQRY_KSV_ORDER_SHIP_SHIP_MODE}
                            optionLabel="CD_NAME"
                            placeholder=""
                            editable
                        ></Dropdown>
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "19rem" }}>
                    <div className="af-span-div-btn" style={{ width: "10rem" }}>
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
                            onClick={search_LIST_1}
                        />
                    </div>
                </span>

                <span className="af-span-3" style={{ width: "27rem" }}>
                    <p className="af-span-p" style={{ width: "7rem" }}>Buyer#</p>
                    <div className="af-span-div" style={{ width: "19rem" }}>
                        <Dropdown
                            style={{ width: "19rem" }}
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
                <span
                    className="af-span-3"
                    style={{ width: "25rem", marginLeft: "27px" }}
                >
                    <p className="af-span-p" style={{ width: "5rem" }}>Order#</p>
                    <InputText
                        style={{ width: "7rem", marginLeft: "5px" }}
                        id="id_PO_CD"
                        value={dataQRY_KSV_ORDER_SHIP.ORDER_CD}
                        onChange={(e) =>
                            onInputChangeQRY_KSV_ORDER_SHIP_ORDER_CD(
                                e,
                                "ORDER_CD",
                            )
                        }
                    />

                    <p className="af-span-p" style={{ width: "5rem" }}>Payment</p>
                    <Dropdown
                        style={{ width: "7rem", marginLeft: "5px" }}
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
                    ></Dropdown>
                </span>
                <span className="af-span-3" style={{ width: "20rem" }}>
                    <p className="af-span-p" style={{ width: "7rem" }}>Style</p>
                    <div className="af-span-div" style={{ width: "12rem" }}>
                        <Dropdown
                            style={{ width: "12rem" }}
                            id="id_ORDER_CD"
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
                <span className="af-span-3" style={{ width: "20rem" }}>
                    <p className="af-span-p" style={{ width: "7rem" }}>Ship Mode</p>
                    <div className="af-span-div" style={{ width: "12rem" }}>
                        <Dropdown
                            style={{ width: "12rem" }}
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
                <span className="af-span-3" style={{ width: "19rem" }}>
                    <div className="af-span-div-btn" style={{ width: "10rem" }}>
                        <Button
                            style={{ width: "10rem" }}
                            label={<span>Excel</span>}
                            id="btnSearch"
                            className="p-button-text green"
                            onClick={exportExcelTBL_KSV_ORDER_SHIP}
                        />
                    </div>
                </span>
            </div>

            <div
                className="af-div-first"
                style={{ width: "123rem", height: "13rem" }}
            >
                <span className="af-span-3-0" style={{ width: "18rem" }}>
                    <p className="af-span-p" style={{ width: "17rem" }}> </p>
                </span>
                <span className="af-span-3-0" style={{ width: "18rem" }}>
                    <p className="af-span-p" style={{ width: "5rem" }}>Amt</p>
                    <div className="af-span-div" style={{ width: "12rem" }}>
                        <InputText
                            disabled
                            style={{ width: "12rem" }}
                            id="id_PO_CD"
                            value={dataEDT_KSV_ORDER_SHIP.AMOUNT}
                            onChange={(e) =>
                                onInputChangeEDT_KSV_ORDER_SHIP_AMOUNT1(
                                    e,
                                    "AMOUNT1",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "19rem" }}>
                    <p className="af-span-p" style={{ width: "6rem" }}>전표번호</p>
                    <div className="af-span-div" style={{ width: "12rem" }}>
                        <InputText
                            disabled
                            style={{ width: "12rem" }}
                            id="id_PO_CD"
                            value={dataEDT_KSV_ORDER_SHIP.DOCU_NO}
                            onChange={(e) =>
                                onInputChangeEDT_KSV_ORDER_SHIP_DOCU_NO(
                                    e,
                                    "DOCU_NO",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "22rem" }}>
                    <p className="af-span-p" style={{ width: "9rem" }}>Neoe Buyer#</p>
                    <div className="af-span-div" style={{ width: "12rem" }}>
                        <InputText
                            disabled
                            style={{ width: "12rem" }}
                            id="id_PO_CD"
                            value={dataEDT_KSV_ORDER_SHIP.NEOE_CODE}
                            onChange={(e) =>
                                onInputChangeEDT_KSV_ORDER_SHIP_NEOE_CODE(
                                    e,
                                    "NEOE_CODE",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "13rem" }}>
                    <p className="af-span-p" style={{ width: "5rem" }}>Curr</p>
                    <div className="af-span-div" style={{ width: "7rem" }}>
                        <Dropdown
                            disabled
                            style={{ width: "7rem" }}
                            id="id_ORDER_CD"
                            value={dataEDT_KSV_ORDER_SHIP_CURR_CD}
                            onChange={(e) =>
                                onDropdownChangeEDT_KSV_ORDER_SHIP_CURR_CD(
                                    e,
                                    "CURR_CD",
                                )
                            }
                            options={datasEDT_KSV_ORDER_SHIP_CURR_CD}
                            optionLabel="CD_NAME"
                            placeholder=""
                            editable
                        ></Dropdown>
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "13rem" }}>
                    <div className="af-span-div-btn" style={{ width: "12rem" }}>
                        <Button
                            style={{ width: "12rem" }}
                            label="자동전표생성"
                            className="p-button-text"
                            onClick={process_DOCU_REGIST}
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "13rem" }}>
                    <div className="af-span-div-btn" style={{ width: "12rem" }}>
                        <Button
                            style={{ width: "12rem" }}
                            label="자동전표삭제"
                            className="p-button-text"
                            onClick={process_DOCU_DELETE}
                        />
                    </div>
                </span>

                <span className="af-span-3" style={{ width: "18rem" }}>
                    <p className="af-span-p" style={{ width: "8rem" }}>Deposit</p>
                    <div className="af-span-div" style={{ width: "9rem" }}>
                        <InputText
                            style={{ width: "12rem" }}
                            id="id_PO_CD"
                            value={dataEDT_KSV_ORDER_SHIP.CRDB_CD}
                            onChange={(e) =>
                                onInputChangeEDT_KSV_ORDER_SHIP_CRDB_CD(
                                    e,
                                    "CRDB_CD",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "18rem" }}>
                    <p className="af-span-p" style={{ width: "5rem" }}> </p>
                    <div className="af-span-div" style={{ width: "12rem" }}>
                        <InputText
                            style={{ width: "12rem" }}
                            id="id_PO_CD"
                            value={dataEDT_KSV_ORDER_SHIP.DEPOSIT_AMT}
                            onChange={(e) =>
                                onInputChangeEDT_KSV_ORDER_SHIP_DEPOSIT_AMT(
                                    e,
                                    "DEPOSIT_AMT",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "13rem" }}>
                    <div className="af-span-div-btn" style={{ width: "12rem" }}>
                        <Button
                            style={{ width: "12rem" }}
                            label="Deposit Apply"
                            className="p-button-text"
                            onClick={popup_DEPOSIT_APPLY}
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "13rem" }}>
                    <div className="af-span-div-btn" style={{ width: "12rem" }}>
                        <Button
                            style={{ width: "12rem" }}
                            label="Deposit Cancel"
                            className="p-button-text"
                            onClick={process_DEPOSIT_CANCEL}
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "42rem" }}>
                    <p className="af-span-p" style={{ width: "9rem" }}>Remark</p>
                    <div className="af-span-div" style={{ width: "32rem" }}>
                        <InputText
                            style={{ width: "32rem" }}
                            id="id_PO_CD"
                            value={dataEDT_KSV_ORDER_SHIP.REMARK}
                            onChange={(e) =>
                                onInputChangeEDT_KSV_ORDER_SHIP_REMARK(
                                    e,
                                    "REMARK",
                                )
                            }
                        />
                    </div>
                </span>

                <span className="af-span-3" style={{ width: "18rem" }}>
                    <p className="af-span-p" style={{ width: "8rem" }}>매출입금예정일1</p>
                    <div className="af-span-div" style={{ width: "9rem" }}>
                        <Calendar
                            showButtonBar
                            style={{ width: "9rem" }}
                            dateFormat="yy-mm-dd"
                            id="id_E_DUE_DATE"
                            value={changeDateVal(
                                dataEDT_KSV_ORDER_SHIP.INCOME_DATE1,
                            )}
                            onChange={(e) =>
                                onCalChangeEDT_KSV_ORDER_SHIP_INCOME_DATE1(
                                    e,
                                    "INCOME_DATE1",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "18rem" }}>
                    <p className="af-span-p" style={{ width: "5rem" }}>Amt1</p>
                    <div className="af-span-div" style={{ width: "12rem" }}>
                        <InputText
                            style={{ width: "12rem" }}
                            id="id_PO_CD"
                            value={dataEDT_KSV_ORDER_SHIP.AMOUNT1}
                            onChange={(e) =>
                                onInputChangeEDT_KSV_ORDER_SHIP_AMOUNT1(
                                    e,
                                    "AMOUNT1",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "80rem" }}>
                    <div className="af-span-div-btn" style={{ width: "12rem" }}>
                        <Button
                            style={{ width: "12rem" }}
                            label="입금예정일 Update"
                            className="p-button-text"
                            onClick={process_UPDATE_INCOME_DATE}
                        />
                    </div>
                </span>

                <span className="af-span-3" style={{ width: "18rem" }}>
                    <p className="af-span-p" style={{ width: "8rem" }}>매출입금예정일2</p>
                    <div className="af-span-div" style={{ width: "9rem" }}>
                        <Calendar
                            showButtonBar
                            style={{ width: "9rem" }}
                            dateFormat="yy-mm-dd"
                            id="id_E_DUE_DATE"
                            value={changeDateVal(
                                dataEDT_KSV_ORDER_SHIP.INCOME_DATE2,
                            )}
                            onChange={(e) =>
                                onCalChangeEDT_KSV_ORDER_SHIP_INCOME_DATE2(
                                    e,
                                    "INCOME_DATE2",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "100rem" }}>
                    <p className="af-span-p" style={{ width: "5rem" }}>Amt2</p>
                    <div className="af-span-div" style={{ width: "12rem" }}>
                        <InputText
                            style={{ width: "12rem" }}
                            id="id_PO_CD"
                            value={dataEDT_KSV_ORDER_SHIP.AMOUNT2}
                            onChange={(e) =>
                                onInputChangeEDT_KSV_ORDER_SHIP_AMOUNT2(
                                    e,
                                    "AMOUNT2",
                                )
                            }
                        />
                    </div>
                </span>

                <span className="af-span-3" style={{ width: "18rem" }}>
                    <p className="af-span-p" style={{ width: "8rem" }}>매출입금예정일3</p>
                    <div className="af-span-div" style={{ width: "9rem" }}>
                        <Calendar
                            showButtonBar
                            style={{ width: "9rem" }}
                            dateFormat="yy-mm-dd"
                            id="id_E_DUE_DATE"
                            value={changeDateVal(
                                dataEDT_KSV_ORDER_SHIP.INCOME_DATE3,
                            )}
                            onChange={(e) =>
                                onCalChangeEDT_KSV_ORDER_SHIP_INCOME_DATE3(
                                    e,
                                    "INCOME_DATE3",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "100rem" }}>
                    <p className="af-span-p" style={{ width: "5rem" }}>Amt3</p>
                    <div className="af-span-div" style={{ width: "12rem" }}>
                        <InputText
                            style={{ width: "12rem" }}
                            id="id_PO_CD"
                            value={dataEDT_KSV_ORDER_SHIP.AMOUNT3}
                            onChange={(e) =>
                                onInputChangeEDT_KSV_ORDER_SHIP_AMOUNT3(
                                    e,
                                    "AMOUNT3",
                                )
                            }
                        />
                    </div>
                </span>
            </div>

            <div
                className="af-div-first"
                style={{ width: "123rem", height: "41.5rem" }}
            >
                <AFDataTable preventUnrelatedRerender
                    ref={dt_TBL_KSV_ORDER_SHIP}
                    size="small"
                    value={datasTBL_KSV_ORDER_SHIP}
                    tableStyle={{ tableLayout: "fixed" }}
                    loading={loadingTBL_KSV_ORDER_SHIP}
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
                    emptyMessage="No results found." //header={headerTBL_KSV_ORDER_SHIP}
                    responsiveLayout="scroll"
                    scrollable
                    scrollHeight="453px"
                >
                    <AFColumn selectionMode="multiple" field="__checkbox__" reorderable={false} headerClassName="t-header" headerStyle={{ width: "3rem" }} ></AFColumn>

                    <AFColumn field="STATUS_NAME" header="Type" headerStyle={{ width: "5rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="INVOICE_NO" header="Invoice#" headerStyle={{ width: "8rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="BUYER_NAME" header="Buyer" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="SHIP_DATE" header="ETD" headerStyle={{ width: "8rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} body={(rowData) => serviceLib.dateFormatHMS(rowData.SHIP_DATE) } ></AFColumn>
                    <AFColumn field="ATD" header="ATD" headerStyle={{ width: "8rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} body={(rowData) => serviceLib.dateFormatHMS(rowData.ATD) } ></AFColumn>
                    <AFColumn field="INCOME_DATE" header="입금예정일" headerStyle={{ width: "8rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} body={(rowData) => serviceLib.dateFormatHMS(rowData.INCOME_DATE) } ></AFColumn>
                    <AFColumn field="DELIVERY_TYPE_N" header="Ship Mode" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="FROM_PORT_N" header="From" headerStyle={{ width: "5rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="TO_PORT_N" header="To" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="DOCU_NO" header="Docu#" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="OA_REF_NO" header="OA#" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="DEPOSIT_AMT" header="Deposit Amt" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.DEPOSIT_AMT, 2) } ></AFColumn>
                    <AFColumn field="CURR_CD" header="Curr" headerStyle={{ width: "5rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="TOTAL_AMT" header="Inv Amt" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.TOTAL_AMT, 2) } ></AFColumn>
                    <AFColumn field="TOT_AMT_WON" header="Inv Amt(KRW)" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.TOT_AMT_WON, 2) } ></AFColumn>
                    <AFColumn field="OA_AMT" header="OA Amt" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.OA_AMT, 2) } ></AFColumn>
                    <AFColumn field="OA_DATE" header="OA 발행일" headerStyle={{ width: "8rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} body={(rowData) => serviceLib.dateFormatHMS(rowData.OA_DATE) } ></AFColumn>

                    <AFColumn field="TT_AMT" header="TT Amt 1" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.TT_AMT, 2) } ></AFColumn>
                    <AFColumn field="TT_REF_NO" header="TT 1#" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="TT_DATE" header="TT 입금일 1" headerStyle={{ width: "8rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} body={(rowData) => serviceLib.dateFormatHMS(rowData.TT_DATE) } ></AFColumn>

                    <AFColumn field="TT_AMT1" header="TT Amt 2" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.TT_AMT1, 2) } ></AFColumn>
                    <AFColumn field="TT_REF_NO1" header="TT 2#" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="TT_DATE1" header="TT 입금일 2" headerStyle={{ width: "8rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} body={(rowData) => serviceLib.dateFormatHMS(rowData.TT_DATE1) } ></AFColumn>

                    <AFColumn field="TT_AMT2" header="TT Amt 3" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.TT_AMT2, 2) } ></AFColumn>
                    <AFColumn field="TT_REF_NO2" header="TT 3#" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="TT_DATE2" header="TT 입금일 3" headerStyle={{ width: "8rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} body={(rowData) => serviceLib.dateFormatHMS(rowData.TT_DATE2) } ></AFColumn>

                    <AFColumn field="TT_AMT3" header="TT Amt 4" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.TT_AMT3, 2) } ></AFColumn>
                    <AFColumn field="TT_REF_NO3" header="TT 4#" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="TT_DATE3" header="TT 입금일 4" headerStyle={{ width: "8rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} body={(rowData) => serviceLib.dateFormatHMS(rowData.TT_DATE2) } ></AFColumn>
                </AFDataTable>
            </div>

            <Toast ref={toast} />

            <Dialog
                visible={createDialog}
                position="center"
                style={{ width: "122rem" }}
                header="Deposit Apply"
                modal={true}
                className="p-fluid"
                onHide={hideDialog}
            >
                <div
                    className="af-div-first"
                    style={{ width: "120rem", height: "3rem" }}
                >
                    <span className="af-span-3-0" style={{ width: "27rem" }}>
                        <p className="af-span-p" style={{ width: "7rem" }}>Type</p>
                        <div className="af-span-div" style={{ width: "19rem" }}>
                            <InputText
                                disabled
                                style={{ width: "19rem" }}
                                id="id_PO_CD"
                                value={dataQRY_KSV_ORDER_SHIP1.TYPE}
                                onChange={(e) =>
                                    onInputChangeQRY_KSV_ORDER_SHIP1_TYPE(
                                        e,
                                        "TYPE",
                                    )
                                }
                            />
                        </div>
                    </span>
                    <span className="af-span-3-0" style={{ width: "27rem" }}>
                        <p className="af-span-p" style={{ width: "7rem" }}>Pay To</p>
                        <div className="af-span-div" style={{ width: "19rem" }}>
                            <InputText
                                disabled
                                style={{ width: "19rem" }}
                                id="id_PO_CD"
                                value={dataQRY_KSV_ORDER_SHIP1.PAY_TO}
                                onChange={(e) =>
                                    onInputChangeQRY_KSV_ORDER_SHIP1_PAY_TO(
                                        e,
                                        "PAY_TO",
                                    )
                                }
                            />
                        </div>
                    </span>
                </div>

                <div
                    className="af-div-first"
                    style={{ width: "120rem", height: "40rem" }}
                >
                    <AFDataTable preventUnrelatedRerender
                        ref={dt_TBL_KSV_ORDER_SHIP2}
                        size="small"
                        loading={loadingTBL_KSV_ORDER_SHIP2}
                        value={datasTBL_KSV_ORDER_SHIP2}
                        resizableColumns
                        columnResizeMode="fit"
                        metaKeySelection={false}
                        resizableColumns
                        columnResizeMode="expand"
                        showGridlines
                        selectionMode="checkbox"
                        selection={selectedTBL_KSV_ORDER_SHIP2}
                        onRowSelect={onRowClick1TBL_KSV_ORDER_SHIP2}
                        onSelectionChange={(e) => {
                            setSelectedTBL_KSV_ORDER_SHIP2(e.value);
                        }}
                        onRowClick={onRowClickTBL_KSV_ORDER_SHIP2}
                        dataKey="id"
                        className="datatable-responsive"
                        virtualScrollerOptions={{ itemSize: 20 }}
                        emptyMessage="No TBL_KSV_ORDER_SHIP2 found." //header={headerTBL_KSV_ORDER_SHIP2}
                        responsiveLayout="scroll"
                        scrollable
                        scrollHeight="40rem"
                    >
                        <AFColumn field="CRDB_CD" header="Credit#" headerStyle={{ width: "5rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                        <AFColumn field="PAY_TO" header="Pay To" headerStyle={{ width: "5rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                        <AFColumn field="TITLE" header="Title" headerStyle={{ width: "5rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                        <AFColumn field="REMARK" header="Remark" headerStyle={{ width: "5rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                        <AFColumn field="USD_BAL" header="Usd(Bal)" headerStyle={{ width: "5rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                        <AFColumn field="ISSUE_DATE" header="Date of Issue" headerStyle={{ width: "5rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                        <AFColumn field="CHARGER" header="Charger" headerStyle={{ width: "5rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    </AFDataTable>
                </div>
                <div
                    className="af-div-first"
                    style={{ width: "120rem", height: "3rem" }}
                >
                    <span className="af-span-3-0" style={{ width: "30rem" }}>
                        <p className="af-span-p" style={{ width: "10rem" }}>Deposit Amount</p>
                        <div className="af-span-div" style={{ width: "19rem" }}>
                            <InputText
                                style={{ width: "19rem" }}
                                id="id_PO_CD"
                                value={dataEDT_KSV_ORDER_SHIP1.DEPOSIT_AMT}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_ORDER_SHIP1_DEPOSIT_AMT(
                                        e,
                                        "DEPOSIT_AMT",
                                    )
                                }
                            />
                        </div>
                    </span>
                    <span className="af-span-3" style={{ width: "13rem" }}>
                        <div
                            className="af-span-div-btn"
                            style={{ width: "12rem" }}
                        >
                            <Button
                                style={{ width: "12rem" }}
                                label="Deposit Apply"
                                className="p-button-text"
                                onClick={process_DEPOSIT_APPLY}
                            />
                        </div>
                    </span>
                </div>
            </Dialog>
        </div>
    );
};

const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(S0802_DOCU_REGIST_OVERSEA, comparisonFn);
