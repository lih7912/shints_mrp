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
import { OverlayPanel } from "primereact/overlaypanel";

import moment from "moment";
import { ServiceLib } from "../service/service_lib/ServiceLib";
import { ServiceS0801_DOCU_REGIST_DOMESTIC } from "../service/service_biz/ServiceS0801_DOCU_REGIST_DOMESTIC";

import "./page_common.scss";

const emptyKCD_CODE = {
    id: 0,
    CD_GROUP: "",
    CD_CODE: "",
    CD_NAME: "",
    CD_FLAG: "",
};

const emptyQRY_KSV_ORDER_SHIP = {
    STATUS_CD: "",
    ORDER_USER_ID: "",
    BUYER_CD: "",
    NEOE_CD: "",
    S_BILL_DATE: "",
    E_BILL_DATE: "",
};

const emptyQRY_KSV_ORDER_SHIP1 = {
    ORDER_CD: "",
};

const emptyEDT_KSV_ORDER_SHIP = {
    S_KRW_PAY_AMOUNT: "",
    S_KRW_TAX_AMOUNT: "",
    S_KRW_TOT_AMOUNT: "",
    BILL_DATE: "",
    PAY_DUE_DATE: "",
    DOCU_NO: "",
    ACCT_USER_ID: "",
};

const S0801_DOCU_REGIST_DOMESTIC = () => {
    const serviceLibRef = useRef(null);
    if (!serviceLibRef.current) {
        serviceLibRef.current = new ServiceLib();
        serviceLibRef.current.loginConfirm();
    }
    const serviceLib = serviceLibRef.current;
    const serviceS0801_DOCU_REGIST_DOMESTIC =
        new ServiceS0801_DOCU_REGIST_DOMESTIC();

    const toast = useRef(null);
    const op = useRef(null);
    const dt_iframe = useRef(null);

    /* splitter 관련 */
    const [styleVal, setStyleVal] = useState({ width: "65vw" });

    const [createDialog, setCreateDialog] = useState(false);

    const [urlIframe, setUrlIframe] = useState("");
    const popup_TAX_BILL = (e) => {
        var tUrl = `${window.location.origin}/#/`;
        tUrl += "S080101_DOCU_REGIST_DOMESTIC?TAX_CD=";

        var tUrl2 = "S080101_DOCU_REGIST_DOMESTIC?TAX_CD=";
        var tValObj = {
            key: "7-11",
            label: "세금계산서 등록",
            icon: "pi pi-fw pi-user-edit",
            url1: "S080101_DOCU_REGIST_DOMESTIC",
        };
        var tArgObj = { ...tValObj };
        tArgObj.url1 = tUrl2;
        var tFuncObj = {};
        tFuncObj.func = "call_url";
        tFuncObj.message = { ...tArgObj };
        window.parent.postMessage(tFuncObj, "*");
    };

    const popup_TAXBILL_RE = (e) => {
        if (selectedTBL_KSV_ORDER_SHIP.length <= 0) {
            alert("선택된 세금계산서가 없습니다<br><br>There are no tax invoices selected");
            return;
        }
        var tSelObj = { ...selectedTBL_KSV_ORDER_SHIP[0] };

        if (tSelObj.DOCU_NO && tSelObj.DOCU_NO.substring(0, 3) !== "AF_") {
            alert("전표 처리된 세금계산서는 수정할수 없습니다<br><br>Tax invoices that have been processed cannot be modified.");
            return;
        }

        var tUrl = `${window.location.origin}/#/`;
        tUrl += `S080101_DOCU_REGIST_DOMESTIC?TAX_CD=${tSelObj.TAX_CD}`;

        var tUrl2 = `S080101_DOCU_REGIST_DOMESTIC?TAX_CD=${tSelObj.TAX_CD}`;
        var tValObj = {
            key: "7-11",
            label: "세금계산서 등록",
            icon: "pi pi-fw pi-user-edit",
            url1: "S080101_DOCU_REGIST_DOMESTIC",
        };
        var tArgObj = { ...tValObj };
        tArgObj.url1 = tUrl2;
        var tFuncObj = {};
        tFuncObj.func = "call_url";
        tFuncObj.message = { ...tArgObj };
        window.parent.postMessage(tFuncObj, "*");
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

    const process_RESET = () => {
        setDataQRY_KSV_ORDER_SHIP(emptyQRY_KSV_ORDER_SHIP);
        setDataQRY_KSV_ORDER_SHIP_BUYER_CD(datasQRY_KSV_ORDER_SHIP_BUYER_CD[0]);
        setDataQRY_KSV_ORDER_SHIP_STATUS_CD(
            datasQRY_KSV_ORDER_SHIP_STATUS_CD[0],
        );
        setDataQRY_KSV_ORDER_SHIP_ORDER_USER_ID(
            datasQRY_KSV_ORDER_SHIP_ORDER_USER_ID[0],
        );

        setDataEDT_KSV_ORDER_SHIP(emptyEDT_KSV_ORDER_SHIP);
        setDatasTBL_KSV_ORDER_SHIP([]);
        setSelectedTBL_KSV_ORDER_SHIP([]);
        setDatasTBL_KSV_ORDER_SHIP1([]);
        setSelectedTBL_KSV_ORDER_SHIP1([]);
    };

    const process_DELETE_TAXBILL = () => {
        if (selectedTBL_KSV_ORDER_SHIP.length <= 0) {
            alert("작업할 세금계산서를 선택해 주세요<br><br>Please select the tax invoice you wish to work on");
            return;
        }

        var tFlag = 0;
        var tInArray = [];
        selectedTBL_KSV_ORDER_SHIP.forEach((col, i) => {
            if (col.DOCU_NO !== "") tFlag = 1;
            var tObj = {};
            tObj.TAX_CD = col.TAX_CD;
            tInArray.push(tObj);
        });
        if (tFlag === 1) {
            alert("전표처리된 세금계산서는 삭제할수 없습니다<br><br>Tax invoices that have been processed cannot be deleted.");
            return;
        }

        setDatasTBL_KSV_ORDER_SHIP([]);
        setSelectedTBL_KSV_ORDER_SHIP([]);

        setLoadingTBL_KSV_ORDER_SHIP(true);
        // 2
        serviceS0801_DOCU_REGIST_DOMESTIC
            .mgrInsert_DELETE_TAXBILL(tInArray)
            .then((data) => {
                setLoadingTBL_KSV_ORDER_SHIP(false);
                if (typeof data.graphQLErrors === "undefined") {
                    if (data.length > 0) {
                        alert(data[0].CODE);
                        if (data[0].CODE.includes("SUCC")) {
                            search_LIST_1();
                            setDatasTBL_KSV_ORDER_SHIP1([]);
                            setSelectedTBL_KSV_ORDER_SHIP1([]);
                        }
                    }
                } else {
                    console.log(
                        "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });

        // search_CODE();
    };

    const search_LIST_1 = () => {
        var _tData = { ...dataQRY_KSV_ORDER_SHIP };

        setDatasTBL_KSV_ORDER_SHIP([]);
        setSelectedTBL_KSV_ORDER_SHIP([]);

        setLoadingTBL_KSV_ORDER_SHIP(true);

        // 2
        serviceS0801_DOCU_REGIST_DOMESTIC
            .mgrQuery_LIST_1(_tData)
            .then((data) => {
                setLoadingTBL_KSV_ORDER_SHIP(false);
                if (typeof data.graphQLErrors === "undefined") {
                    console.log(
                        "ServiceMgrKCD_BUYER.mgr1KcdStyle call => " +
                            data.length,
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

        // search_CODE();
    };

    const search_LIST_2 = (argData) => {
        setDatasTBL_KSV_ORDER_SHIP1([]);
        setSelectedTBL_KSV_ORDER_SHIP1([]);

        var tObj = {};
        tObj.TAX_CD = argData.TAX_CD;

        // 3
        serviceS0801_DOCU_REGIST_DOMESTIC.mgrQuery_LIST_2(tObj).then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                console.log(
                    "ServiceMgrKCD_BUYER.mgr1KcdStyle call => " + data.length,
                );
                var tArray = [];
                var tIdx = 0;
                var tSeq = 0;
                for (tIdx = 0; tIdx < data.length; tIdx++) {
                    var tOne = { ...data[tIdx] };
                    tOne.id = tIdx;
                    tArray.push(tOne);
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

    const process_DOCU_CANCEL = () => {
        /*
        if (1) {
            alert("기능 구현중입니다  <br><br>Function is being implemented");
            return;
        }
        */

        if (selectedTBL_KSV_ORDER_SHIP.length <= 0) {
            alert("작업할 데이타를 선택하세요 <br><br>Choose the data you want to work with");
            return;
        }
        var tEdtObj = { ...dataEDT_KSV_ORDER_SHIP };
        if (tEdtObj.DOCU_NO === "") {
            alert(`전표 처리가 된것만 취소처리 가능합니다  <br><br>Only invoices that have been processed can be cancelled.`);
            return;
        }

        var _tInput0 = { ...selectedTBL_KSV_ORDER_SHIP[0] };
        if (typeof _tInput0.__typename !== "undefined")
            delete _tInput0.__typename;
        if (typeof _tInput0.id !== "undefined") delete _tInput0.id;
        var tIn1_Array = [];
        tIn1_Array.push(_tInput0);

        var tIn2_Array = [];
        datasTBL_KSV_ORDER_SHIP1.forEach((col, i) => {
            var tObj = { ...col };
            if (typeof tObj.__typename !== "undefined") delete tObj.__typename;
            if (typeof tObj.id !== "undefined") delete tObj.id;
            tIn2_Array.push(tObj);
        });

        setLoadingTBL_KSV_ORDER_SHIP1(true);
        serviceS0801_DOCU_REGIST_DOMESTIC
            .mgrInsert_DOCU_DELETE(tIn1_Array, tIn2_Array)
            .then((data) => {
                setLoadingTBL_KSV_ORDER_SHIP1(false);
                if (typeof data.graphQLErrors === "undefined") {
                    if (typeof data.length === "undefined") {
                    } else {
                        alert(data[0].CODE);
                        if (data[0].CODE.includes("SUCC")) {
                            search_LIST_1();
                        }
                        console.log(
                            "ServiceMgrKCD_BUYER.mgr1KcdStyle call => " +
                                data.length,
                        );
                        toast.current.show({
                            severity: "success",
                            summary: "SUCCEED:Insert Order Ship",
                            detail: data[0].CODE,
                            life: 3000,
                        });
                    }
                } else {
                    console.log(
                        "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                    toast.current.show({
                        severity: "success",
                        summary: "ERROR:Insert Order Ship",
                        detail: "",
                        life: 3000,
                    });
                }
            });
    };

    const process_PROC_FOC = () => {

        if (selectedTBL_KSV_ORDER_SHIP.length <= 0) {
            alert("작업할 데이타를 선택하세요 <br><br>Choose the data you want to work with");
            return;
        }
        var tEdtObj = { ...dataEDT_KSV_ORDER_SHIP };
        if (tEdtObj.DOCU_NO) {
            alert(`전표 처리가 된것은 전표 생략 처리가 안됩니다. `);
            return;
        }

        var _tInput0 = { ...selectedTBL_KSV_ORDER_SHIP[0] };
        if (typeof _tInput0.__typename !== "undefined")
            delete _tInput0.__typename;
        if (typeof _tInput0.id !== "undefined") delete _tInput0.id;
        var tIn1_Array = [];
        tIn1_Array.push(_tInput0);

        var tIn2_Array = [];
        datasTBL_KSV_ORDER_SHIP1.forEach((col, i) => {
            var tObj = { ...col };
            if (typeof tObj.__typename !== "undefined") delete tObj.__typename;
            if (typeof tObj.id !== "undefined") delete tObj.id;
            tIn2_Array.push(tObj);
        });

        setLoadingTBL_KSV_ORDER_SHIP1(true);
        serviceS0801_DOCU_REGIST_DOMESTIC
            .mgrInsert_PROC_FOC(tIn1_Array, tIn2_Array)
            .then((data) => {
                setLoadingTBL_KSV_ORDER_SHIP1(false);
                if (typeof data.graphQLErrors === "undefined") {
                    if (typeof data.length === "undefined") {
                    } else {
                        alert(data[0].CODE);
                        if (data[0].CODE.includes("SUCC")) {
                            search_LIST_1();
                        }
                        console.log(
                            "ServiceMgrKCD_BUYER.mgr1KcdStyle call => " +
                                data.length,
                        );
                        toast.current.show({
                            severity: "success",
                            summary: "SUCCEED:Insert Order Ship",
                            detail: data[0].CODE,
                            life: 3000,
                        });
                    }
                } else {
                    console.log(
                        "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                    toast.current.show({
                        severity: "success",
                        summary: "ERROR:Insert Order Ship",
                        detail: "",
                        life: 3000,
                    });
                }
            });
    };

    const process_DOCU_REGIST = () => {
        if (selectedTBL_KSV_ORDER_SHIP.length <= 0) {
            alert("작업할 데이타를 선택하세요 <br><br>Choose the data you want to work with");
            return;
        }

        if (selectedTBL_KSV_ORDER_SHIP.length > 1) {
            alert(
                "한개의 데이타만 선택해 주세요. 현재는 1개씩 전표등록이 가능합니다  ",
            );
            return;
        }

        var tEdtObj = { ...dataEDT_KSV_ORDER_SHIP };
        if (tEdtObj.DOCU_NO !== "") {
            alert(`이미 전표 처리가 되었습니다:${tEdtObj.DOCU_NO}  `);
            return;
        }

        var _tInput0 = { ...selectedTBL_KSV_ORDER_SHIP[0] };
        if (typeof _tInput0.__typename !== "undefined")
            delete _tInput0.__typename;
        if (typeof _tInput0.id !== "undefined") delete _tInput0.id;
        var tIn1_Array = [];
        _tInput0.BILL_DATE = dataEDT_KSV_ORDER_SHIP.BILL_DATE;
        _tInput0.PAY_DUE_DATE = dataEDT_KSV_ORDER_SHIP.PAY_DUE_DATE;
        tIn1_Array.push(_tInput0);

        var tIn2_Array = [];
        datasTBL_KSV_ORDER_SHIP1.forEach((col, i) => {
            var tObj = { ...col };
            if (typeof tObj.__typename !== "undefined") delete tObj.__typename;
            if (typeof tObj.id !== "undefined") delete tObj.id;
            tIn2_Array.push(tObj);
        });

        setLoadingTBL_KSV_ORDER_SHIP1(true);
        serviceS0801_DOCU_REGIST_DOMESTIC
            .mgrInsert_DOCU_REGIST(tIn1_Array, tIn2_Array)
            .then((data) => {
                setLoadingTBL_KSV_ORDER_SHIP1(false);
                if (typeof data.graphQLErrors === "undefined") {
                    if (typeof data.length === "undefined") {
                    } else {
                        alert(data[0].CODE);
                        if (data[0].CODE.includes("SUCC")) {
                            search_LIST_1();
                        }
                        console.log(
                            "ServiceMgrKCD_BUYER.mgr1KcdStyle call => " +
                                data.length,
                        );
                        toast.current.show({
                            severity: "success",
                            summary: "SUCCEED:Insert Order Ship",
                            detail: data[0].CODE,
                            life: 3000,
                        });
                    }
                } else {
                    console.log(
                        "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                    toast.current.show({
                        severity: "success",
                        summary: "ERROR:Insert Order Ship",
                        detail: "",
                        life: 3000,
                    });
                }
            });
    };

    /*QRY KSV_STOCK_FACOUT */
    const [dataQRY_KSV_ORDER_SHIP, setDataQRY_KSV_ORDER_SHIP] = useState(
        emptyQRY_KSV_ORDER_SHIP,
    );

    const [
        datasQRY_KSV_ORDER_SHIP_STATUS_CD,
        setDatasQRY_KSV_ORDER_SHIP_STATUS_CD,
    ] = useState([]);
    const [
        dataQRY_KSV_ORDER_SHIP_STATUS_CD,
        setDataQRY_KSV_ORDER_SHIP_STATUS_CD,
    ] = useState({});

    const onDropdownChangeQRY_KSV_ORDER_SHIP_STATUS_CD = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataQRY_KSV_ORDER_SHIP = { ...dataQRY_KSV_ORDER_SHIP };

        let tTypeVal = _dataQRY_KSV_ORDER_SHIP[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_ORDER_SHIP[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_ORDER_SHIP[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_ORDER_SHIP(_dataQRY_KSV_ORDER_SHIP);
        setDataQRY_KSV_ORDER_SHIP_STATUS_CD(e.value);
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
        let val = (e.value && e.value.BUYER_CD) || "";

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

    const onInputChangeQRY_KSV_ORDER_SHIP_NEOE_CD = (e, name) => {
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
        datasQRY_KSV_ORDER_SHIP_ORDER_USER_ID,
        setDatasQRY_KSV_ORDER_SHIP_ORDER_USER_ID,
    ] = useState([]);
    const [
        dataQRY_KSV_ORDER_SHIP_ORDER_USER_ID,
        setDataQRY_KSV_ORDER_SHIP_ORDER_USER_ID,
    ] = useState({});

    const onDropdownChangeQRY_KSV_ORDER_SHIP_ORDER_USER_ID = (e, name) => {
        let val = (e.value && e.value.USER_ID) || "";

        let _dataQRY_KSV_ORDER_SHIP = { ...dataQRY_KSV_ORDER_SHIP };

        let tTypeVal = _dataQRY_KSV_ORDER_SHIP[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_ORDER_SHIP[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_ORDER_SHIP[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_ORDER_SHIP(_dataQRY_KSV_ORDER_SHIP);
        setDataQRY_KSV_ORDER_SHIP_ORDER_USER_ID(e.value);
    };

    const onCalChangeQRY_KSV_ORDER_SHIP_S_BILL_DATE = (e, name) => {
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

    const onCalChangeQRY_KSV_ORDER_SHIP_E_BILL_DATE = (e, name) => {
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

    /*QRY KSV_STOCK_FACOUT */
    const [dataEDT_KSV_ORDER_SHIP, setDataEDT_KSV_ORDER_SHIP] = useState(
        emptyEDT_KSV_ORDER_SHIP,
    );

    const datasetEDT_KSV_ORDER_SHIP = (argData) => {
        var tObj = { ...dataEDT_KSV_ORDER_SHIP };
        tObj.S_KRW_PAY_AMOUNT = Number(argData.KRW_PAY_AMOUNT).toLocaleString();
        tObj.S_KRW_TAX_AMOUNT = Number(argData.KRW_TAX_AMOUNT).toLocaleString();
        tObj.S_KRW_TOT_AMOUNT = Number(argData.KRW_TOT_AMOUNT).toLocaleString();
        tObj.BILL_DATE = argData.BILL_DATE;
        var _billDate = argData.BILL_DATE || '';
        var _payDueDays = parseInt(argData.BUYER_PAY_DUE_DATE) || 0;
        if (_billDate !== '') {
            tObj.PAY_DUE_DATE = moment(_billDate, 'YYYYMMDD').add(_payDueDays, 'days').format('YYYYMMDD');
        } else {
            tObj.PAY_DUE_DATE = argData.PAY_DUE_DATE || '';
        }
        tObj.DOCU_NO = argData.DOCU_NO;
        tObj.ACCT_USER_ID = argData.ACC_USER;
        setDataEDT_KSV_ORDER_SHIP(tObj);
    };

    const onCalChangeEDT_KSV_ORDER_SHIP_BILL_DATE = (e, name) => {
        let val1 = e.value || "";
        let val = "";
        if (val1 === "") {
            val = "";
        } else {
            val = getDateVal(val1);
        }

        let _dataEDT_KSV_ORDER_SHIP = { ...dataEDT_KSV_ORDER_SHIP };
        _dataEDT_KSV_ORDER_SHIP[`${name}`] = val;

        var _payDueDays = parseInt(dataTBL_KSV_ORDER_SHIP.BUYER_PAY_DUE_DATE) || 0;
        if (val !== '' && _payDueDays > 0) {
            _dataEDT_KSV_ORDER_SHIP.PAY_DUE_DATE = moment(val, 'YYYYMMDD').add(_payDueDays, 'days').format('YYYYMMDD');
        }

        setDataEDT_KSV_ORDER_SHIP(_dataEDT_KSV_ORDER_SHIP);
    };

    const onCalChangeEDT_KSV_ORDER_SHIP_PAY_DUE_DATE = (e, name) => {
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

    const onInputChangeEDT_KSV_ORDER_SHIP_S_KRW_PAY_AMOUNT = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_ORDER_SHIP = { ...dataEDT_KSV_ORDER_SHIP };

        let tTypeVal = _dataEDT_KSV_ORDER_SHIP[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_ORDER_SHIP[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_ORDER_SHIP[`${name}`] = parseInt(val);

        setDataEDT_KSV_ORDER_SHIP(_dataEDT_KSV_ORDER_SHIP);
    };

    const onInputChangeEDT_KSV_ORDER_SHIP_S_KRW_TAX_AMOUNT = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_ORDER_SHIP = { ...dataEDT_KSV_ORDER_SHIP };

        let tTypeVal = _dataEDT_KSV_ORDER_SHIP[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_ORDER_SHIP[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_ORDER_SHIP[`${name}`] = parseInt(val);

        setDataEDT_KSV_ORDER_SHIP(_dataEDT_KSV_ORDER_SHIP);
    };

    const onInputChangeEDT_KSV_ORDER_SHIP_S_KRW_TOT_AMOUNT = (e, name) => {
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

    const onInputChangeEDT_KSV_ORDER_SHIP_ACCT_USER_ID = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_ORDER_SHIP = { ...dataEDT_KSV_ORDER_SHIP };

        let tTypeVal = _dataEDT_KSV_ORDER_SHIP[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_ORDER_SHIP[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_ORDER_SHIP[`${name}`] = parseInt(val);

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

        datasetEDT_KSV_ORDER_SHIP(argData);

        search_LIST_2(argData);
    };

    const onRowClickTBL_KSV_ORDER_SHIP = (event) => {
        let argTBL_KSV_ORDER_SHIP = event.data;
        if (flagSelectModeTBL_KSV_ORDER_SHIP) return;

        // Service : NawooAll:mgrQueryTBL_KSV_ORDER_SHIP
    };

    const exportExcelTBL_KSV_ORDER_SHIP = () => {
        import("xlsx").then((xlsx) => {
            const worksheet = xlsx.utils.json_to_sheet(datasTBL_KSV_ORDER_SHIP);
            const workbook = {
                Sheets: { data: worksheet },
                SheetNames: ["data"],
            };
            const excelBuffer = xlsx.write(workbook, {
                bookType: "xlsx",
                type: "array",
            });
            saveAsExcelFileTBL_KSV_ORDER_SHIP(excelBuffer, "매출등록목록");
        });
    };

    const saveAsExcelFileTBL_KSV_ORDER_SHIP = (buffer, fileName) => {
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

    useEffect(() => {
        var tRetDate = serviceLib.getCurrDate().substring(0, 8);
        var tQry = { ...dataQRY_KSV_ORDER_SHIP };
        tQry.S_BILL_DATE = tRetDate;
        tQry.E_BILL_DATE = tRetDate;
        setDataQRY_KSV_ORDER_SHIP(tQry);

        var tUserInfo = serviceLib.getUserInfo();
        var tEdtObj = { ...dataEDT_KSV_ORDER_SHIP };
        tEdtObj.ACCT_USER_ID = tUserInfo.USER_ID;
        setDataEDT_KSV_ORDER_SHIP(tEdtObj);

        var _tObj = {};
        _tObj.BUYER_CD = "";

        serviceS0801_DOCU_REGIST_DOMESTIC.mgrQuery_CODE(_tObj).then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                setDatasQRY_KSV_ORDER_SHIP_BUYER_CD(data.BUYER_CD);
                setDataQRY_KSV_ORDER_SHIP_BUYER_CD(data.BUYER_CD[0]);

                setDatasQRY_KSV_ORDER_SHIP_STATUS_CD(data.STATUS_CD);
                setDataQRY_KSV_ORDER_SHIP_STATUS_CD(data.STATUS_CD[0]);

                setDatasQRY_KSV_ORDER_SHIP_ORDER_USER_ID(data.USER);
                setDataQRY_KSV_ORDER_SHIP_ORDER_USER_ID(data.USER[0]);
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
        <div className="af-div-main page-shell">
            <div
                className="af-div-first"
                style={{ width: "80rem", height: "8rem" }}
            >
                <span className="af-span-3-0" style={{ width: "39rem" }}>
                    <p className="af-span-p" style={{ width: "10rem" }}>Status</p>
                    <div className="af-span-div" style={{ width: "20rem" }}>
                        <Dropdown
                            filter
                            style={{ width: "20rem" }}
                            id="id_ORDER_CD"
                            value={dataQRY_KSV_ORDER_SHIP_STATUS_CD}
                            onChange={(e) =>
                                onDropdownChangeQRY_KSV_ORDER_SHIP_STATUS_CD(
                                    e,
                                    "STATUS_CD",
                                )
                            }
                            options={datasQRY_KSV_ORDER_SHIP_STATUS_CD}
                            optionLabel="CD_NAME"
                            placeholder=""
                            editable
                        ></Dropdown>
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "39rem" }}>
                    <p className="af-span-p" style={{ width: "10rem" }}>영업담당자</p>
                    <div className="af-span-div" style={{ width: "20rem" }}>
                        <Dropdown
                            filter
                            style={{ width: "20rem" }}
                            id="id_ORDER_CD"
                            editable
                            value={dataQRY_KSV_ORDER_SHIP_ORDER_USER_ID}
                            onChange={(e) =>
                                onDropdownChangeQRY_KSV_ORDER_SHIP_ORDER_USER_ID(
                                    e,
                                    "ORDER_USER_ID",
                                )
                            }
                            options={datasQRY_KSV_ORDER_SHIP_ORDER_USER_ID}
                            optionLabel="USER_NAME"
                            placeholder=""
                            editable
                        ></Dropdown>
                    </div>
                </span>

                <span className="af-span-3" style={{ width: "39rem" }}>
                    <p className="af-span-p" style={{ width: "10rem" }}>Buyer#</p>
                    <div className="af-span-div" style={{ width: "20rem" }}>
                        <Dropdown
                            filter
                            style={{ width: "20rem" }}
                            id="id_ORDER_CD"
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
                <span className="af-span-3" style={{ width: "39rem" }}>
                    <p className="af-span-p" style={{ width: "10rem" }}>매입자</p>
                    <div className="af-span-div" style={{ width: "20rem" }}>
                        <InputText
                            style={{ width: "20rem" }}
                            id="id_PO_CD"
                            value={dataQRY_KSV_ORDER_SHIP.NEOE_CD}
                            onChange={(e) =>
                                onInputChangeQRY_KSV_ORDER_SHIP_NEOE_CD(
                                    e,
                                    "NEOE_CD",
                                )
                            }
                        />
                    </div>
                </span>

                <span className="af-span-3" style={{ width: "21rem" }}>
                    <p className="af-span-p" style={{ width: "10rem" }}>계산서발행일</p>
                    <div className="af-span-div" style={{ width: "10rem" }}>
                        <Calendar
                            showButtonBar
                            style={{ width: "10rem" }}
                            dateFormat="yy-mm-dd"
                            id="id_E_DUE_DATE"
                            value={changeDateVal(
                                dataQRY_KSV_ORDER_SHIP.S_BILL_DATE,
                            )}
                            onChange={(e) =>
                                onCalChangeQRY_KSV_ORDER_SHIP_S_BILL_DATE(
                                    e,
                                    "S_BILL_DATE",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "39rem" }}>
                    <p className="af-span-p" style={{ width: "0.5rem" }}>~</p>
                    <div className="af-span-div" style={{ width: "10rem" }}>
                        <Calendar
                            showButtonBar
                            style={{ width: "10rem" }}
                            dateFormat="yy-mm-dd"
                            id="id_E_DUE_DATE"
                            value={changeDateVal(
                                dataQRY_KSV_ORDER_SHIP.E_BILL_DATE,
                            )}
                            onChange={(e) =>
                                onCalChangeQRY_KSV_ORDER_SHIP_E_BILL_DATE(
                                    e,
                                    "E_BILL_DATE",
                                )
                            }
                        />
                    </div>
                </span>
            </div>
            <div
                className="af-div-second"
                style={{ width: "43rem", height: "8rem" }}
            >
                <span className="af-span-3" style={{ width: "40rem" }}>
                    <div className="af-span-div-btn" style={{ width: "25rem" }}>
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

                        <Button
                            style={{ width: "12rem" }}
                            label="Reset"
                            className="p-button-text"
                            onClick={process_RESET}
                        />
                    </div>
                </span>

                <span className="af-span-3" style={{ width: "40rem" }}>
                    <div className="af-span-div-btn" style={{ width: "25rem" }}>
                        <Button
                            style={{ width: "12rem" }}
                            label="Delete"
                            className="p-button-text"
                            onClick={process_DELETE_TAXBILL}
                        />

                        <Button
                            style={{ width: "12rem" }}
                            label="Excel"
                            className="p-button-text green"
                            onClick={exportExcelTBL_KSV_ORDER_SHIP}
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "40rem" }}>
                    <div className="af-span-div-btn" style={{ width: "25rem" }}>
                        <Button
                            style={{ width: "12rem" }}
                            label="세금계산서 등록"
                            className="p-button-text orange"
                            onClick={(e) => popup_TAX_BILL(e)}
                        />

                        <Button
                            style={{ width: "12rem" }}
                            label="세금계산서 수정"
                            className="p-button-text orange"
                            onClick={popup_TAXBILL_RE}
                        />
                    </div>
                </span>
            </div>

            <div
                className="af-div-first"
                style={{ width: "100%", height: "21.5rem" }}
            >
                <AFDataTable preventUnrelatedRerender
                    ref={dt_TBL_KSV_ORDER_SHIP}
                    size="small"
                    value={datasTBL_KSV_ORDER_SHIP}
                    loading={loadingTBL_KSV_ORDER_SHIP}
                    tableStyle={{ tableLayout: "fixed" }}
                    resizableColumns
                    columnResizeMode="fit"
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
                    emptyMessage="No results found." //header={headerTBL_KSV_ORDER_SHIP}
                    responsiveLayout="scroll"
                    scrollable
                    scrollHeight="235px"
                >
                    <AFColumn field="STATUS_NAME" header="Status" headerStyle={{ width: "8rem", height: "1.8rem" }} bodyStyle={{ width: "8rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="TAX_CD" header="Tax#" headerStyle={{ width: "8rem", height: "1.8rem" }} bodyStyle={{ width: "8rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="REG_DATE" header="등록일" headerStyle={{ width: "8rem", height: "1.8rem" }} bodyStyle={{ width: "8rem", height: "1.8rem" }} body={(rowData) => serviceLib.dateFormatHMS(rowData.REG_DATE) } ></AFColumn>
                    <AFColumn field="BILL_DATE" header="계산서발행일" headerStyle={{ width: "8rem", height: "1.8rem" }} bodyStyle={{ width: "8rem", height: "1.8rem" }} body={(rowData) => serviceLib.dateFormatHMS(rowData.BILL_DATE) } ></AFColumn>
                    <AFColumn field="PAY_DUE_DATE" header="입금만기일" headerStyle={{ width: "8rem", height: "1.8rem" }} bodyStyle={{ width: "8rem", height: "1.8rem" }} body={(rowData) => serviceLib.dateFormatHMS(rowData.PAY_DUE_DATE) } ></AFColumn>

                    <AFColumn field="ORDER_USER_NAME" header="영업담당자" headerStyle={{ width: "8rem", height: "1.8rem" }} bodyStyle={{ width: "8rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="BUYER_CD" header="바이어#" headerStyle={{ width: "8rem", height: "1.8rem" }} bodyStyle={{ width: "8rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="NEOE_CD_N" header="매입처명" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="KRW_PAY_AMOUNT" header="공급가액(W)" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.KRW_PAY_AMOUNT, 2) } ></AFColumn>
                    <AFColumn field="KRW_TAX_AMOUNT" header="부가세(W)" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.KRW_TAX_AMOUNT, 2) } ></AFColumn>
                    <AFColumn field="KRW_TOT_AMOUNT" header="총액(W)" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.KRW_TOT_AMOUNT, 2) } ></AFColumn>
                    <AFColumn field="DOCU_NO" header="전표번호" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>

                    <AFColumn field="ACC_USER_NAME" header="회계담당자" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="BUYER_EMAIL" header="Buyer Email" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>

                    <AFColumn field="NEOE_CD_N" header="매입처" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                </AFDataTable>
            </div>

            <div
                className="af-div-first"
                style={{ width: "96rem", height: "30.5rem", paddingTop: "1rem" }}
            >
                <AFDataTable preventUnrelatedRerender
                    ref={dt_TBL_KSV_ORDER_SHIP1}
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
                    emptyMessage="No results found." //header={headerTBL_KSV_ORDER_SHIP}
                    responsiveLayout="scroll"
                    scrollable
                    scrollHeight="337px"
                >
                    <AFColumn field="SHIP_DATE" header="Ship Date" headerStyle={{ width: "7rem", height: "1.8rem" }} bodyStyle={{ width: "7rem", height: "1.8rem" }} body={(rowData) => serviceLib.dateFormatHMS(rowData.SHIP_DATE) } ></AFColumn>
                    <AFColumn field="INVOICE_NO" header="CI#" headerStyle={{ width: "7rem", height: "1.8rem" }} bodyStyle={{ width: "7rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="BUYER_NAME" header="바이어#" headerStyle={{ width: "7rem", height: "1.8rem" }} bodyStyle={{ width: "7rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="PO_CD" header="PO#" headerStyle={{ width: "7rem", height: "1.8rem" }} bodyStyle={{ width: "7rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="ORDER_CD" header="Order#" headerStyle={{ width: "7rem", height: "1.8rem" }} bodyStyle={{ width: "7rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="STYLE_NAME" header="Style" headerStyle={{ width: "7rem", height: "1.8rem" }} bodyStyle={{ width: "7rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="SHIP_QTY" header="Ship Qty" headerStyle={{ width: "7rem", height: "1.8rem" }} bodyStyle={{ width: "7rem", height: "1.8rem" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.SHIP_QTY, 2) } ></AFColumn>

                    <AFColumn field="CURR_CD" header="Curr" headerStyle={{ width: "7rem", height: "1.8rem" }} bodyStyle={{ width: "7rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="PRICE" header="Price" headerStyle={{ width: "7rem", height: "1.8rem" }} bodyStyle={{ width: "7rem", height: "1.8rem" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.PRICE, 4) } ></AFColumn>
                    <AFColumn field="PAY_AMT" header="공급가액" headerStyle={{ width: "7rem", height: "1.8rem" }} bodyStyle={{ width: "7rem", height: "1.8rem" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.PAY_AMT, 2) } ></AFColumn>
                    <AFColumn field="KRW_SHIP_AMOUNT" header="공급가액(W)" headerStyle={{ width: "7rem", height: "1.8rem" }} bodyStyle={{ width: "7rem", height: "1.8rem" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.KRW_SHIP_AMOUNT, 2) } ></AFColumn>
                    <AFColumn field="KRW_TAX_AMOUNT" header="부가세(W)" headerStyle={{ width: "7rem", height: "1.8rem" }} bodyStyle={{ width: "7rem", height: "1.8rem" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.KRW_TAX_AMOUNT, 2) } ></AFColumn>
                    <AFColumn field="KRW_TOT_AMOUNT" header="총액(W)" headerStyle={{ width: "7rem", height: "1.8rem" }} bodyStyle={{ width: "7rem", height: "1.8rem" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.KRW_TOT_AMOUNT, 2) } ></AFColumn>
                </AFDataTable>
            </div>

            <div
                className="af-div-first"
                style={{ width: "26rem", height: "31rem", marginLeft: "1rem" }}
            >
                <span className="af-span-3-0" style={{ width: "30rem" }}>
                    <p className="af-span-p" style={{ width: "6rem" }}>공급가액(W)</p>
                    <div className="af-span-div" style={{ width: "18rem" }}>
                        <InputText
                            style={{ width: "18rem", textAlign: "right" }}
                            id="id_PO_CD"
                            value={dataEDT_KSV_ORDER_SHIP.S_KRW_PAY_AMOUNT}
                            onChange={(e) =>
                                onInputChangeEDT_KSV_ORDER_SHIP_S_KRW_PAY_AMOUNT(
                                    e,
                                    "S_KRW_PAY_AMOUNT",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "30rem" }}>
                    <p className="af-span-p" style={{ width: "6rem" }}>부가세(W)</p>
                    <div className="af-span-div" style={{ width: "18rem" }}>
                        <InputText
                            style={{ width: "18rem", textAlign: "right" }}
                            id="id_PO_CD"
                            value={dataEDT_KSV_ORDER_SHIP.S_KRW_TAX_AMOUNT}
                            onChange={(e) =>
                                onInputChangeEDT_KSV_ORDER_SHIP_S_KRW_TAX_AMOUNT(
                                    e,
                                    "S_KRW_TAX_AMOUNT",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "30rem" }}>
                    <p className="af-span-p" style={{ width: "6rem" }}>총액(W)</p>
                    <div className="af-span-div" style={{ width: "18rem" }}>
                        <InputText
                            style={{ width: "18rem", textAlign: "right" }}
                            id="id_PO_CD"
                            value={dataEDT_KSV_ORDER_SHIP.S_KRW_TOT_AMOUNT}
                            onChange={(e) =>
                                onInputChangeEDT_KSV_ORDER_SHIP_S_KRW_TOT_AMOUNT(
                                    e,
                                    "S_KRW_TOT_AMOUNT",
                                )
                            }
                        />
                    </div>
                </span>

                <span className="af-span-3-0" style={{ width: "30rem" }}>
                    <p className="af-span-p" style={{ width: "6rem" }}> </p>
                </span>
                <span className="af-span-3-0" style={{ width: "30rem" }}>
                    <p className="af-span-p" style={{ width: "6rem" }}>계산서발행일</p>
                    <div className="af-span-div" style={{ width: "18rem" }}>
                        <Calendar
                            showButtonBar
                            style={{ width: "18rem" }}
                            dateFormat="yy-mm-dd"
                            id="id_E_DUE_DATE"
                            value={changeDateVal(
                                dataEDT_KSV_ORDER_SHIP.BILL_DATE,
                            )}
                            onChange={(e) =>
                                onCalChangeEDT_KSV_ORDER_SHIP_BILL_DATE(
                                    e,
                                    "BILL_DATE",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "30rem" }}>
                    <p className="af-span-p" style={{ width: "6rem" }}>입금만기일</p>
                    <div className="af-span-div" style={{ width: "18rem" }}>
                        <Calendar
                            showButtonBar
                            style={{ width: "18rem" }}
                            dateFormat="yy-mm-dd"
                            id="id_PAY_DUE_DATE"
                            value={changeDateVal(
                                dataEDT_KSV_ORDER_SHIP.PAY_DUE_DATE,
                            )}
                            onChange={(e) =>
                                onCalChangeEDT_KSV_ORDER_SHIP_PAY_DUE_DATE(
                                    e,
                                    "PAY_DUE_DATE",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "30rem" }}>
                    <p className="af-span-p" style={{ width: "6rem" }}> </p>
                    <div className="af-span-div-btn" style={{ width: "27rem" }}>
                        <Button
                            style={{ width: "8rem" }}
                            label="전표등록"
                            aria-label="전표등록"
                            className="p-button-text"
                            onClick={process_DOCU_REGIST}
                        />

                        <Button
                            style={{ width: "8rem" }}
                            label="전표취소"
                            aria-label="전표취소"
                            className="p-button-text"
                            onClick={process_DOCU_CANCEL}
                        />

                        <Button
                            style={{ width: "8rem" }}
                            label="전표생략"
                            aria-label="전표생략"
                            className="p-button-text"
                            onClick={process_PROC_FOC}
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "30rem" }}>
                    <p className="af-span-p" style={{ width: "6rem" }}> </p>
                </span>

                <span className="af-span-3-0" style={{ width: "30rem" }}>
                    <p className="af-span-p" style={{ width: "6rem" }}>전표번호</p>
                    <div className="af-span-div" style={{ width: "18rem" }}>
                        <InputText
                            disabled
                            style={{ width: "18rem" }}
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
                <span className="af-span-3-0" style={{ width: "30rem" }}>
                    <p className="af-span-p" style={{ width: "6rem" }}>회계담당자</p>
                    <div className="af-span-div" style={{ width: "18rem" }}>
                        <InputText
                            disabled
                            style={{ width: "18rem" }}
                            id="id_PO_CD"
                            value={dataEDT_KSV_ORDER_SHIP.ACCT_USER_ID}
                            onChange={(e) =>
                                onInputChangeEDT_KSV_ORDER_SHIP_ACCT_USER_ID(
                                    e,
                                    "ACCT_USER_ID",
                                )
                            }
                        />
                    </div>
                </span>
            </div>

            <Toast ref={toast} />
            <OverlayPanel
                style={{
                    width: "123rem",
                    height: "60rem",
                    marginLeft: "0rem",
                    marginTop: "0rem",
                }}
                ref={op}
                showCloseIcon
            >
                <iframe
                    src={urlIframe}
                    frameBorder="0"
                    ref={dt_iframe}
                    width="1360px"
                    height="670px"
                    id="id1"
                    className="myClassname"
                    scrolling="no"
                />
            </OverlayPanel>
        </div>
    );
};

const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(S0801_DOCU_REGIST_DOMESTIC, comparisonFn);
