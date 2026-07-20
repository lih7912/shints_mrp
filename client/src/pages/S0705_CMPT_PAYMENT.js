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
import { ServiceS0705_CMPT_PAYMENT } from "../service/service_biz/ServiceS0705_CMPT_PAYMENT";

import "./page_common.scss";

const emptyKCD_CODE = {
    id: 0,
    CD_GROUP: "",
    CD_CODE: "",
    CD_NAME: "",
    CD_FLAG: "",
};

const emptyQRY_KSV_INVOICE_MST = {
    FACTORY_CD: "",
    BUYER_CD: "",
    S_ISSUE_DATE: "",
    E_ISSUE_DATE: "",
    IS_SHIP_DATE: "1",
    IS_EXFACTORY: "",
    IS_NEGO_CMPT: "",
    INVOICE_NO: "",
    INVOICE_TYPE: "",
};

const emptyTBL_KSV_INVOICE_MST = {
    id: 0,
    BUYER_NAME: "",
    INVOICE_NO: "",
    PO_CD: "",
    ORDER_CD: "",
    STYLE_NAME: "",
    SHIP_PROD_TYPE: "",
    SHIP_DATE: "",
    EXFACTORY: "",
    SHIP_QTY: "",
    CMPT_ORD: "",
    CMPT_ACT: "",
    CMPT_AMT: "",
    SALES_PART: "",
    ACCOUNT_PART: "",
};

const emptyEDT_KSV_INVOICE_MST = {
    BILL_DATE: "",
};

const S0705_CMPT_PAYMENT = () => {
    const serviceLibRef = useRef(null);
    if (!serviceLibRef.current) {
        serviceLibRef.current = new ServiceLib();
        serviceLibRef.current.loginConfirm();
    }
    const serviceLib = serviceLibRef.current;
    const serviceS0705_CMPT_PAYMENTRef = useRef(null);
    if (!serviceS0705_CMPT_PAYMENTRef.current) serviceS0705_CMPT_PAYMENTRef.current = new ServiceS0705_CMPT_PAYMENT();
    const serviceS0705_CMPT_PAYMENT = serviceS0705_CMPT_PAYMENTRef.current;

    const toast = useRef(null);

    /* splitter 관련 */
    const [styleVal, setStyleVal] = useState({ width: "65vw" });

    const process_EXCEL_PRINT = () => {
        var tObj = {};
        tObj.BILL_DATE = dataEDT_KSV_INVOICE_MST.BILL_DATE;
        tObj.FACTORY_CD = dataQRY_KSV_INVOICE_MST.FACTORY_CD;

        if (tObj.BILL_DATE === "" || tObj.FACTORY_CD === "") {
            alert("BILL_DATE, Factory 을 입력해야합니다<br><br>You must enter BILL_DATE, Factory");
            return;
        }

        setLoadingTBL_KSV_INVOICE_MST(true);
        serviceS0705_CMPT_PAYMENT.mgrQuery_EXCEL_PRINT(tObj).then((data) => {
            setLoadingTBL_KSV_INVOICE_MST(false);
            if (typeof data.graphQLErrors === "undefined") {
                if (data[0].CODE.includes("SUCC")) {
                            serviceLib.downloadFile(
                                data[0].CODE.split("?")[2].toString(),
                                data[0].CODE.split("?")[1].toString(),
                            );
                }
            } 
        });
    };
    const process_UPDATE_BILL = () => {
        if (selectedTBL_KSV_INVOICE_MST.length <= 0) {
            alert("작업할 데이타를 하나이상 선택하세요<br><br>Select one or more data to work with");
            return;
        }

        var _tInput0 = [];
        selectedTBL_KSV_INVOICE_MST.forEach((col, i) => {
            var tObj = { ...col };
            if (typeof tObj.__typename !== "undefined") delete tObj.__typename;
            if (typeof tObj.id !== "undefined") delete tObj.id;
            _tInput0.push(tObj);
        });

        var tObj = { ...dataEDT_KSV_INVOICE_MST };

        var tInObj = {};
        tInObj.BILL_DATE = tObj.BILL_DATE;

        if (tObj.BILL_DATE === "") {
            alert("BILL DATE을 입력하시요<br><br>Please enter BILL DATE");
            return;
        }

        setLoadingTBL_KSV_INVOICE_MST(true);
        serviceS0705_CMPT_PAYMENT
            .mgrInsert_UPDATE_BILL(_tInput0, tInObj)
            .then((data) => {
                setLoadingTBL_KSV_INVOICE_MST(false);
                if (typeof data.graphQLErrors === "undefined") {
                    if (typeof data.length === "undefined") {
                    } else {
                        alert(data[0].CODE);
                        if (data[0].CODE.includes("SUCC")) {
                            search_LIST_1();
                        }
                        // console.log("ServiceMgrKCD_BUYER.mgr1KcdStyle call => " + data.length);
                    }
                } else {
                    // console.log("ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " + JSON.stringify(data.graphQLErrors));
                }
            });
    };
    const process_UPDATE_SALES = () => {
        if (selectedTBL_KSV_INVOICE_MST.length <= 0) {
            alert("작업할 데이타를 하나이상 선택하세요<br><br>Select one or more data to work with");
            return;
        }

        var _tInput0 = [];
        selectedTBL_KSV_INVOICE_MST.forEach((col, i) => {
            var tObj = { ...col };
            if (typeof tObj.__typename !== "undefined") delete tObj.__typename;
            if (typeof tObj.id !== "undefined") delete tObj.id;
            _tInput0.push(tObj);
        });

        var tObj = { ...dataEDT_KSV_INVOICE_MST };
        var tInObj = {};
        tInObj.BILL_DATE = tObj.BILL_DATE;

        setLoadingTBL_KSV_INVOICE_MST(true);
        serviceS0705_CMPT_PAYMENT
            .mgrInsert_UPDATE_SALES(_tInput0, tInObj)
            .then((data) => {
                setLoadingTBL_KSV_INVOICE_MST(false);
                if (typeof data.graphQLErrors === "undefined") {
                    if (typeof data.length === "undefined") {
                    } else {
                        alert(data[0].CODE);
                        if (data[0].CODE.includes("SUCC")) {
                            search_LIST_1();
                        }
                    }
                } else {
                    // console.log("ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " + JSON.stringify(data.graphQLErrors));
                }
            });
    };
    const process_CANCEL_BILL = () => {
        if (selectedTBL_KSV_INVOICE_MST.length <= 0) {
            alert("작업할 데이타를 하나이상 선택하세요<br><br>Select one or more data to work with");
            return;
        }

        var _tInput0 = [];
        selectedTBL_KSV_INVOICE_MST.forEach((col, i) => {
            var tObj = { ...col };
            if (typeof tObj.__typename !== "undefined") delete tObj.__typename;
            if (typeof tObj.id !== "undefined") delete tObj.id;
            _tInput0.push(tObj);
        });

        var tObj = { ...dataEDT_KSV_INVOICE_MST };
        var tInObj = {};
        tInObj.BILL_DATE = tObj.BILL_DATE;

        setLoadingTBL_KSV_INVOICE_MST(true);
        serviceS0705_CMPT_PAYMENT
            .mgrInsert_CANCEL_BILL(_tInput0, tInObj)
            .then((data) => {
                setLoadingTBL_KSV_INVOICE_MST(false);
                if (typeof data.graphQLErrors === "undefined") {
                    if (typeof data.length === "undefined") {
                    } else {
                        alert(data[0].CODE);
                        if (data[0].CODE.includes("SUCC")) {
                            search_LIST_1();
                        }
                    }
                } else {
                    // console.log("ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " + JSON.stringify(data.graphQLErrors));
                }
            });
    };
    const process_CANCEL_SALES = () => {
        if (selectedTBL_KSV_INVOICE_MST.length <= 0) {
            alert("작업할 데이타를 하나이상 선택하세요<br><br>Select one or more data to work with");
            return;
        }

        var _tInput0 = [];
        selectedTBL_KSV_INVOICE_MST.forEach((col, i) => {
            var tObj = { ...col };
            if (typeof tObj.__typename !== "undefined") delete tObj.__typename;
            if (typeof tObj.id !== "undefined") delete tObj.id;
            _tInput0.push(tObj);
        });

        var tObj = { ...dataEDT_KSV_INVOICE_MST };
        var tInObj = {};
        tInObj.BILL_DATE = tObj.BILL_DATE;

        setLoadingTBL_KSV_INVOICE_MST(true);
        serviceS0705_CMPT_PAYMENT
            .mgrInsert_CANCEL_SALES(_tInput0, tInObj)
            .then((data) => {
                setLoadingTBL_KSV_INVOICE_MST(false);
                if (typeof data.graphQLErrors === "undefined") {
                    if (typeof data.length === "undefined") {
                    } else {
                        alert(data[0].CODE);
                        if (data[0].CODE.includes("SUCC")) {
                            search_LIST_1();
                        }
                    }
                } else {
                    // console.log("ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " + JSON.stringify(data.graphQLErrors));
                }
            });
    };

    const search_LIST_1 = () => {
        var _tData = { ...dataQRY_KSV_INVOICE_MST };

        if (_tData.IS_EXFACTORY === "0" && _tData.IS_SHIP_DATE === "0") {
            alert("Ship Date, Exfactory중 하나를 선택하세요<br><br>Select either Ship Date or Exfactory");
            return;
        }

        setDatasTBL_KSV_INVOICE_MST([]);
        setSelectedTBL_KSV_INVOICE_MST([]);

        setLoadingTBL_KSV_INVOICE_MST(true);

        // 2
        serviceS0705_CMPT_PAYMENT.mgrQuery_LIST_1(_tData).then((data) => {
            setLoadingTBL_KSV_INVOICE_MST(false);
            if (typeof data.graphQLErrors === "undefined") {
                console.log(
                    "ServiceMgrKCD_BUYER.mgr1KcdStyle call => " + data.length,
                );
                var tArray2 = data.map((col, i) => {
                    var tObj = { ...col };
                    tObj.id = i + 1;
                    return tObj;
                });
                setDatasTBL_KSV_INVOICE_MST(tArray2);
            } else {
                console.log(
                    "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });

        // search_CODE();
    };

    /* QRY KSV_INVOICE_MST*/
    const [dataQRY_KSV_INVOICE_MST, setDataQRY_KSV_INVOICE_MST] = useState(
        emptyQRY_KSV_INVOICE_MST,
    );

    const [
        datasQRY_KSV_INVOICE_MST_FACTORY_CD,
        setDatasQRY_KSV_INVOICE_MST_FACTORY_CD,
    ] = useState([]);
    const [
        dataQRY_KSV_INVOICE_MST_FACTORY_CD,
        setDataQRY_KSV_INVOICE_MST_FACTORY_CD,
    ] = useState({});

    const onDropdownChangeQRY_KSV_INVOICE_MST_FACTORY_CD = (e, name) => {
        let val = (e.value && e.value.FACTORY_CD) || "";

        let _dataQRY_KSV_INVOICE_MST = { ...dataQRY_KSV_INVOICE_MST };

        let tTypeVal = _dataQRY_KSV_INVOICE_MST[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_INVOICE_MST[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_INVOICE_MST[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_INVOICE_MST(_dataQRY_KSV_INVOICE_MST);
        setDataQRY_KSV_INVOICE_MST_FACTORY_CD(e.value);
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
        let val = "";
        if (typeof e.value === "string") {
            val = e.value;
        } else {
            val = (e.value && e.value.BUYER_CD) || "";
        }

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

    const onCheckboxChangeQRY_KSV_INVOICE_MST_IS_SHIP_DATE = (e, name) => {
        let val = "";
        let _dataQRY_KSV_INVOICE_MST = { ...dataQRY_KSV_INVOICE_MST };
        if (e.checked) {
            val = "1";
            _dataQRY_KSV_INVOICE_MST["IS_EXFACTORY"] = "0";
        } else {
            val = "0";
        }
        _dataQRY_KSV_INVOICE_MST[`${name}`] = val;
        setDataQRY_KSV_INVOICE_MST(_dataQRY_KSV_INVOICE_MST);
    };

    const onCheckboxChangeQRY_KSV_INVOICE_MST_IS_EXFACTORY = (e, name) => {
        let val = "";
        let _dataQRY_KSV_INVOICE_MST = { ...dataQRY_KSV_INVOICE_MST };
        if (e.checked) {
            val = "1";
            _dataQRY_KSV_INVOICE_MST["IS_SHIP_DATE"] = "0";
        } else {
            val = "0";
        }
        _dataQRY_KSV_INVOICE_MST[`${name}`] = val;
        setDataQRY_KSV_INVOICE_MST(_dataQRY_KSV_INVOICE_MST);
    };

    const onInputChangeQRY_KSV_INVOICE_MST_INVOICE_NO = (e, name) => {
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
        datasQRY_KSV_INVOICE_MST_INVOICE_TYPE,
        setDatasQRY_KSV_INVOICE_MST_INVOICE_TYPE,
    ] = useState([]);
    const [
        dataQRY_KSV_INVOICE_MST_INVOICE_TYPE,
        setDataQRY_KSV_INVOICE_MST_INVOICE_TYPE,
    ] = useState({});

    const onDropdownChangeQRY_KSV_INVOICE_MST_INVOICE_TYPE = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataQRY_KSV_INVOICE_MST = { ...dataQRY_KSV_INVOICE_MST };

        let tTypeVal = _dataQRY_KSV_INVOICE_MST[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_INVOICE_MST[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_INVOICE_MST[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_INVOICE_MST(_dataQRY_KSV_INVOICE_MST);
        setDataQRY_KSV_INVOICE_MST_INVOICE_TYPE(e.value);
    };

    /* TABLE KSV_INVOICE_MST*/
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
            argData = argData0[0];
        } else {
            argData = argData0;
        }

        if (!argData) return;

        let argTBL_KSV_INVOICE_MST = argData;

        setDataTBL_KSV_INVOICE_MST(argTBL_KSV_INVOICE_MST);

        var tObj = { ...dataEDT_KSV_INVOICE_MST };
        tObj.BILL_DATE = argData.BILL_DATE;
        setDataEDT_KSV_INVOICE_MST(tObj);
    };

    const exportExcelTBL_KSV_INVOICE_MST = () => {
        var tArray = [];
        datasTBL_KSV_INVOICE_MST.forEach((col, i) => {
            var tObj = {};
            tObj.Buyer = col.BUYER_CD;
            tObj.Invoice_No = col.INVOICE_NO;
            tObj.Po_Cd = col.PO_CD;
            tObj.Order_Cd = col.ORDER_CD;
            tObj.Style = col.STYLE_NAME;
            tObj.Ship_Prod_Type = col.SHIP_PTYPE_N;
            tObj.Order_Qty = 0;
            tObj.Ship_Date = col.SHIP_DATE;
            tObj.Exfactory = col.EXFACTORY;
            tObj.Ship_Qty = parseFloat(col.SHIP_CNT).toFixed(0);
            tObj.Cmpt_Ord = parseFloat(col.FC_ORD_PRICE).toFixed(4);
            tObj.Cmpt_Act = parseFloat(col.FC_BILL_PRICE).toFixed(4);
            tObj.Cmpt_Amt = parseFloat(col.FC_AMT).toFixed(2);
            tObj.Sales_Part = col.BILL_CHK_N;
            tObj.Account_Part = "";
            tObj.Bill_Date = col.BILL_DATE;
            tObj.Screen_Print = parseFloat(col.SCREEN_PRINT).toFixed(0);
            tObj.Heat_Silicon = parseFloat(col.HEAT_SILICON).toFixed(0);
            tObj.Embroidery = parseFloat(col.EMBROIDERY).toFixed(0);
            tObj.TPR = parseFloat(col.TPR).toFixed(0);
            tObj.Welding = parseFloat(col.WELDING).toFixed(0);
            tObj.Quilting = parseFloat(col.QUILTING).toFixed(0);
            tObj.Digital_Print = parseFloat(col.DIGITAL_PRINT).toFixed(0);
            tObj.Label_Print = parseFloat(col.LABEL_PRINT).toFixed(0);
            tObj.Sub_Total = "0";
            tObj.Sub_Amt = "0";
            tObj.Local = "0";
            tObj.Claim_NS = "";
            tObj.Cmpt_Total = parseFloat(col.CMPT_TOTAL).toFixed(0);
            tObj.Total_Amt = parseFloat(col.TOTAL_AMT).toFixed(0);
            tObj.End_Remark = col.REMARK;
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
            saveAsExcelFileTBL_KSV_INVOICE_MST(excelBuffer, "CMPT 결제목록");
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

    /**EDIT ISV_INVOICE_MST */
    const [datasEDT_KSV_INVOICE_MST, setDatasEDT_KSV_INVOICE_MST] = useState(
        [],
    );
    const [dataEDT_KSV_INVOICE_MST, setDataEDT_KSV_INVOICE_MST] = useState(
        emptyEDT_KSV_INVOICE_MST,
    );

    const onCalChangeEDT_KSV_INVOICE_MST_BILL_DATE = (e, name) => {
        let val1 = e.value || "";
        let val = "";
        if (val1 === "") {
            val = "";
        } else {
            val = getDateVal(val1);
        }

        let _dataEDT_KSV_INVOICE_MST = { ...dataEDT_KSV_INVOICE_MST };
        _dataEDT_KSV_INVOICE_MST[`${name}`] = val;
        setDataEDT_KSV_INVOICE_MST(_dataEDT_KSV_INVOICE_MST);
    };

    useEffect(() => {
        var _tObj = {};
        _tObj.BUYER_CD = "";

        serviceS0705_CMPT_PAYMENT.mgrQuery_CODE(_tObj).then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                setDatasQRY_KSV_INVOICE_MST_FACTORY_CD(data.FACTORY_CD);
                setDataQRY_KSV_INVOICE_MST_FACTORY_CD(data.FACTORY_CD[0]);

                setDatasQRY_KSV_INVOICE_MST_BUYER_CD(data.BUYER_CD);
                setDataQRY_KSV_INVOICE_MST_BUYER_CD(data.BUYER_CD[0]);

                setDatasQRY_KSV_INVOICE_MST_INVOICE_TYPE(data.INVOICE_TYPE);
                setDataQRY_KSV_INVOICE_MST_INVOICE_TYPE(data.INVOICE_TYPE[0]);

                var tRetDate = serviceLib.getCurrDate().substring(0, 8);

                var tObj = { ...dataQRY_KSV_INVOICE_MST };
                tObj.S_ISSUE_DATE = `${tRetDate.substring(0, 8)}`;
                tObj.E_ISSUE_DATE = `${tRetDate.substring(0, 8)}`;
                setDataQRY_KSV_INVOICE_MST(tObj);
            } else {
                console.log(
                    "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });
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
                style={{ width: "123rem", height: "10rem" }}
            >
                <span className="af-span-3-0" style={{ width: "25rem" }}>
                    <p className="af-span-p" style={{ width: "7rem" }}>Factory</p>
                    <div className="af-span-div" style={{ width: "15rem" }}>
                        <Dropdown
                            style={{ width: "15rem" }}
                            id="id_FACTORY_CD"
                            value={dataQRY_KSV_INVOICE_MST_FACTORY_CD}
                            onChange={(e) =>
                                onDropdownChangeQRY_KSV_INVOICE_MST_FACTORY_CD(
                                    e,
                                    "FACTORY_CD",
                                )
                            }
                            options={datasQRY_KSV_INVOICE_MST_FACTORY_CD}
                            optionLabel="FACTORY_NAME"
                            placeholder=""
                            editable
                        ></Dropdown>
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "45rem" }}>
                    <p className="af-span-p" style={{ width: "7rem" }}>Buyer</p>
                    <div className="af-span-div" style={{ width: "15rem" }}>
                        <Dropdown
                            filter
                            style={{ width: "15rem" }}
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
                <span className="af-span-3-0" style={{ width: "43rem" }}>
                    <div className="af-span-div-btn" style={{ width: "12rem" }}>
                        <Tooltip
                            className="menuCodeTooltip"
                            target={`#btnSearch`}
                            content={`Alt+S`}
                            position="bottom"
                        />

                        <Button
                            label={
                                <span>
                                    Search(<u>S</u>)
                                </span>
                            }
                            accessKey="S"
                            id="btnSearch"
                            style={{ width: "14rem" }}
                            className="p-button-text"
                            onClick={search_LIST_1}
                        />
                    </div>
                </span>

                <span className="af-span-3" style={{ width: "25rem" }}>
                    <p className="af-span-p" style={{ width: "7rem" }}>Invoice#</p>
                    <div className="af-span-div" style={{ width: "15rem" }}>
                        <InputText
                            style={{ width: "15rem" }}
                            id="id_INVOICE_NO"
                            value={dataQRY_KSV_INVOICE_MST.INVOICE_NO}
                            onChange={(e) =>
                                onInputChangeQRY_KSV_INVOICE_MST_INVOICE_NO(
                                    e,
                                    "INVOICE_NO",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "45rem" }}>
                    <p className="af-span-p" style={{ width: "7rem" }}>Inv Type</p>
                    <div className="af-span-div" style={{ width: "15rem" }}>
                        <Dropdown
                            style={{ width: "15rem" }}
                            id="id_INVOICE_TYPE"
                            value={dataQRY_KSV_INVOICE_MST_INVOICE_TYPE}
                            onChange={(e) =>
                                onDropdownChangeQRY_KSV_INVOICE_MST_INVOICE_TYPE(
                                    e,
                                    "INVOICE_TYPE",
                                )
                            }
                            options={datasQRY_KSV_INVOICE_MST_INVOICE_TYPE}
                            optionLabel="CD_NAME"
                            placeholder=""
                            editable
                        ></Dropdown>
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "43rem" }}>
                    <div className="af-span-div-btn" style={{ width: "14rem" }}>
                        <Button
                            label="CMPT Request List"
                            style={{ width: "14rem" }}
                            className="p-button-text green"
                            onClick={exportExcelTBL_KSV_INVOICE_MST}
                        />
                    </div>
                </span>

                <span className="af-span-3" style={{ width: "23rem" }}>
                    <p className="af-span-p" style={{ width: "7rem" }}>Date</p>
                    <div className="af-span-div" style={{ width: "15rem" }}>
                        <Calendar
                            showButtonBar
                            style={{ width: "15rem" }}
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
                <span className="af-span-3" style={{ width: "17rem" }}>
                    <p className="af-span-p" style={{ width: "1rem" }}>~</p>
                    <div className="af-span-div" style={{ width: "15rem" }}>
                        <Calendar
                            showButtonBar
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
                <span className="af-span-3" style={{ width: "10rem" }}>
                    <p className="af-span-p" style={{ width: "7rem" }}>Ship Date</p>
                    <div className="af-span-checkbox">
                        <Checkbox
                            id="id_IS_SHIP_DATE"
                            checked={changeCheckBoxVal(
                                dataQRY_KSV_INVOICE_MST.IS_SHIP_DATE,
                            )}
                            onChange={(e) =>
                                onCheckboxChangeQRY_KSV_INVOICE_MST_IS_SHIP_DATE(
                                    e,
                                    "IS_SHIP_DATE",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "52rem" }}>
                    <p className="af-span-p" style={{ width: "7rem" }}>Ex Factory</p>
                    <div className="af-span-checkbox">
                        <Checkbox
                            id="id_IS_EXFACTORY"
                            checked={changeCheckBoxVal(
                                dataQRY_KSV_INVOICE_MST.IS_EXFACTORY,
                            )}
                            onChange={(e) =>
                                onCheckboxChangeQRY_KSV_INVOICE_MST_IS_EXFACTORY(
                                    e,
                                    "IS_EXFACTORY",
                                )
                            }
                        />
                    </div>
                </span>
            </div>

            <div
                className="af-div-first"
                style={{ width: "123rem", height: "45rem" }}
            >
                <AFDataTable preventUnrelatedRerender
                    ref={dt_TBL_KSV_INVOICE_MST}
                    size="small"
                    value={datasTBL_KSV_INVOICE_MST}
                    tableStyle={{ tableLayout: "fixed" }}
                    resizableColumns
                    columnResizeMode="expand"
                    // metaKeySelection={false}
                    showGridlines
                    selectionMode="checkbox"
                    selection={selectedTBL_KSV_INVOICE_MST}
                    onSelectionChange={(e) => {
                        setSelectedTBL_KSV_INVOICE_MST(e.value);
                        onRowClick1TBL_KSV_INVOICE_MST(e.value);
                    }}
                    // onRowClick={onRowClickTBL_KSV_INVOICE_MST}
                    dataKey="id"
                    className="datatable-responsive"
                    virtualScrollerOptions={{ itemSize: 20 }}
                    emptyMessage=" " //header={headerTBL_KSV_INVOICE_MST}
                    responsiveLayout="scroll"
                    loading={loadingTBL_KSV_INVOICE_MST}
                    scrollable
                    scrollHeight="490px"
                >
                    <AFColumn selectionMode="multiple" field="__checkbox__" reorderable={false} headerClassName="t-header" headerStyle={{ width: "3rem" }} ></AFColumn>
                    <AFColumn field="BUYER_CD" headerClassName="t-header" header="Buyer#" style={{ width: "3rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="INVOICE_NO" headerClassName="t-header" header="Invoice#" style={{ width: "7rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="PO_CD" headerClassName="t-header" header="PO#" style={{ width: "7rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="ORDER_CD" headerClassName="t-header" header="Order#" style={{ width: "7rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="STYLE_NAME" headerClassName="t-header" header="Style" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="SHIP_PTYPE_N" headerClassName="t-header" header="Ship Prod Type" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="SHIP_DATE" headerClassName="t-header" header="Ship Date" style={{ width: "7rem", height: "1.8rem", flexBasis: "auto", }} body={(rowData) => serviceLib.dateFormatHMS(rowData.SHIP_DATE) } ></AFColumn>
                    <AFColumn field="EXFACTORY" headerClassName="t-header" header="ExFactory" style={{ width: "7rem", height: "1.8rem", flexBasis: "auto", }} body={(rowData) => serviceLib.dateFormatHMS(rowData.EXFACTORY) } ></AFColumn>
                    <AFColumn field="SHIP_CNT" headerClassName="t-header" header="Ship Qty" style={{ width: "7rem", height: "1.8rem", flexBasis: "auto", }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.SHIP_CNT, 2) } ></AFColumn>
                    <AFColumn field="FC_ORD_PRICE" headerClassName="t-header" header="Fc Ord Price" style={{ width: "7rem", height: "1.8rem", flexBasis: "auto", }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.FC_ORD_PRICE, 4) } ></AFColumn>
                    <AFColumn field="FC_BILL_PRICE" headerClassName="t-header" header="Fc Bill Price" style={{ width: "7rem", height: "1.8rem", flexBasis: "auto", }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.FC_BILL_PRICE, 4) } ></AFColumn>
                    <AFColumn field="FC_AMT" headerClassName="t-header" header="Fc Amt" style={{ width: "7rem", height: "1.8rem", flexBasis: "auto", }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.FC_AMT, 2) } ></AFColumn>
                    <AFColumn field="BILL_CHK_N" headerClassName="t-header" header="Bill Chk" style={{ width: "6rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="BILL_FLAG_N" headerClassName="t-header" header="Bill Flag" style={{ width: "5rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="BILL_DATE" headerClassName="t-header" header="Bill Date" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} body={(rowData) => serviceLib.dateFormatHMS(rowData.BILL_DATE) } ></AFColumn>
                    <AFColumn field="BILL_CHK" headerClassName="t-header" header="Bill Chk#" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="BILL_FLAG" headerClassName="t-header" header="Bill Flag#" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="SHIP_PTYPE" headerClassName="t-header" header="Ship Ptype#" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="FC_NEGO_TYPE" headerClassName="t-header" header="Fc Nego Type#" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="SCREEN_PRINT" headerClassName="t-header" header="Screen Print" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.SCREEN_PRINT, 2) } ></AFColumn>
                    <AFColumn field="HEAT_SILICON" headerClassName="t-header" header="Heat Silicon" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.HEAT_SILICON, 2) } ></AFColumn>
                    <AFColumn field="EMBROIDERY" headerClassName="t-header" header="Embroidery" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.EMBROIDERY, 2) } ></AFColumn>
                    <AFColumn field="TPR" headerClassName="t-header" header="Tpr" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.TPR, 2) } ></AFColumn>
                    <AFColumn field="WELDING" headerClassName="t-header" header="Welding" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.WELDING, 2) } ></AFColumn>
                    <AFColumn field="QUILTING" headerClassName="t-header" header="Quilting" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.QUILTING, 2) } ></AFColumn>
                    <AFColumn field="DIGITAL_PRINT" headerClassName="t-header" header="Digital Print" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.DIGITAL_PRINT, 2) } ></AFColumn>
                    <AFColumn field="LABEL_PRINT" headerClassName="t-header" header="Label Print" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.LABEL_PRINT, 2) } ></AFColumn>
                    <AFColumn field="LINE_CHARGE" headerClassName="t-header" header="Line Charge" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.LINE_CHARGE, 2) } ></AFColumn>
                    <AFColumn field="CMPT_TOTAL" headerClassName="t-header" header="Cmpt Total" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.CMPT_TOTAL, 2) } ></AFColumn>
                    <AFColumn field="TOTAL_AMT" headerClassName="t-header" header="Total Amt" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.TOTAL_AMT, 2) } ></AFColumn>
                    <AFColumn field="REMARK" headerClassName="t-header" header="Remark" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="TOTAL_CNT" headerClassName="t-header" header="Total Cnt" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.TOTAL_CNT, 2) } ></AFColumn>
                </AFDataTable>
            </div>

            <div
                className="af-div-first"
                style={{ width: "62rem", height: "6rem" }}
            >
                <span className="af-span-3-0" style={{ width: "9rem" }}>
                    <p className="af-span-p" style={{ width: "9rem" }}>Sales Part</p>
                </span>
                <div style={{ marginLeft: "35px" }}>
                    <span className="af-span-3" style={{ width: "16rem" }}>
                        <div
                            className="af-span-div-btn"
                            style={{ width: "15rem" }}
                        >
                            <Button
                                style={{ width: "15rem" }}
                                label="Sales Part Check"
                                className="p-button-text"
                                onClick={process_UPDATE_SALES}
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
                                onClick={process_CANCEL_SALES}
                            />
                        </div>
                    </span>
                </div>
            </div>

            <div
                className="af-div-first"
                style={{ width: "60rem", height: "6rem", marginLeft: "1rem" }}
            >
                <span className="af-span-3-0" style={{ width: "59rem" }}>
                    <p className="af-span-p" style={{ width: "9.3rem" }}>Account Part</p>
                </span>
                <span className="af-span-3" style={{ width: "19rem" }}>
                    <p className="af-span-p" style={{ width: "7rem" }}>Bill Date</p>
                    <div className="af-span-div" style={{ width: "11rem" }}>
                        <Calendar
                            showButtonBar
                            style={{ width: "11rem" }}
                            dateFormat="yy-mm-dd"
                            id="id_BILL_DATE"
                            value={changeDateVal(
                                dataEDT_KSV_INVOICE_MST.BILL_DATE,
                            )}
                            onChange={(e) =>
                                onCalChangeEDT_KSV_INVOICE_MST_BILL_DATE(
                                    e,
                                    "BILL_DATE",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "11rem" }}>
                    <div className="af-span-div-btn" style={{ width: "10rem" }}>
                        <Button
                            style={{ width: "10rem" }}
                            label="Bill"
                            className="p-button-text"
                            onClick={process_UPDATE_BILL}
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "11rem" }}>
                    <div className="af-span-div-btn" style={{ width: "10rem" }}>
                        <Button
                            style={{ width: "10rem" }}
                            label="Cancel"
                            className="p-button-text"
                            onClick={process_CANCEL_BILL}
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "11rem" }}>
                    <div className="af-span-div-btn" style={{ width: "10rem" }}>
                        <Button
                            style={{ width: "10rem" }}
                            label="Bill List"
                            className="p-button-text green"
                            onClick={process_EXCEL_PRINT}
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

export default React.memo(S0705_CMPT_PAYMENT, comparisonFn);
