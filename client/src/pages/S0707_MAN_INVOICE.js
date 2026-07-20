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
import { ServiceS0707_MAN_INVOICE } from "../service/service_biz/ServiceS0707_MAN_INVOICE";

import "./page_common.scss";

const emptyKCD_CODE = {
    id: 0,
    CD_GROUP: "",
    CD_CODE: "",
    CD_NAME: "",
    CD_FLAG: "",
};

const emptyQRY_KSV_INVOICE_MST = {
    S_BILL_DATE: "",
    E_BILL_DATE: "",
    BUYER_CD: "",
    REF_NO: "",
    END_FLAG: "",
    PRE_FLAG: "",
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

const emptyEDT_KSV_INVOICE_MST = {
    REF_NO: "",
    BILL_DATE: "",
    BILL_AMT: "0",
    CURR_CD: "USD",
    END_TYPE: "",
    BUYER_CD: "",
    CHARGE: "0",
    BILL_TYPE: "",
    BANK_CD: "",
    CREDIT_AMT: "0",
    REMARK: "",
};

const S0707_MAN_INVOICE = () => {
    const serviceLibRef = useRef(null);
    if (!serviceLibRef.current) {
        serviceLibRef.current = new ServiceLib();
        serviceLibRef.current.loginConfirm();
    }
    const serviceLib = serviceLibRef.current;
    const serviceS0707_MAN_INVOICERef = useRef(null);
    if (!serviceS0707_MAN_INVOICERef.current) serviceS0707_MAN_INVOICERef.current = new ServiceS0707_MAN_INVOICE();
    const serviceS0707_MAN_INVOICE = serviceS0707_MAN_INVOICERef.current;

    const toast = useRef(null);

    /* splitter 관련 */
    const [styleVal, setStyleVal] = useState({ width: "65vw" });

    const process_INSERT_TT = () => {
        var tInData1 = { ...dataEDT_KSV_INVOICE_MST };
        tInData1.USER_ID = serviceLib.getUserInfo().USER_ID;

        console.log(dataEDT_KSV_INVOICE_MST_BILL_TYPE);

        if (tInData1.BUYER_CD === "") {
            if (dataEDT_KSV_INVOICE_MST_BILL_TYPE.CD_CODE !== "3") {
                // 상계용
                alert("Buyer는 필수입력입니다<br><br>Buyer is required input");
                return;
            }
        }

        setLoadingTBL_KSV_INVOICE_MST(true);
        serviceS0707_MAN_INVOICE.mgrInsert_INSERT_TT(tInData1).then((data) => {
            setLoadingTBL_KSV_INVOICE_MST(false);
            if (typeof data.graphQLErrors === "undefined") {
                if (typeof data.length === "undefined") {
                } else {
                    alert(data[0].CODE);
                    var tQry = { ...emptyQRY_KSV_INVOICE_MST };
                    tQry.REF_NO = tInData1.REF_NO;
                    search_LIST_1(tQry);
                    if (data[0].CODE.includes("SUCC"))
                        resetEDT_KSV_INVOICE_MST();
                }
            } else {
                console.log(
                    "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                        JSON.stringify(data.graphQLErrors),
                );
                toast.current.show({
                    severity: "success",
                    summary: "ERROR:Insert LC NEGO",
                    detail: "",
                    life: 3000,
                });
            }
        });
    };

    const process_UPDATE_TT = () => {
        var tInData1 = { ...dataEDT_KSV_INVOICE_MST };
        tInData1.USER_ID = serviceLib.getUserInfo().USER_ID;

        if (tInData1.BUYER_CD === "") {
            if (dataEDT_KSV_INVOICE_MST_BILL_TYPE.CD_CODE !== "3") {
                // 상계용
                alert("Buyer는 필수입력입니다<br><br>Buyer is required input");
                return;
            }
        }

        console.log(tInData1);
        console.log(selectedTBL_KSV_INVOICE_MST);

        // END_FLAG
        var tCheckVal = parseFloat(
            serviceLib.numToFixed(selectedTBL_KSV_INVOICE_MST[0].BALANCE, 2),
        );
        if (tInData1.END_TYPE === "1" && tCheckVal > 0) {
            alert(
                `상계용 Ref no:${selectedTBL_KSV_INVOICE_MST[0].REF_NO}는 상계금액이 남아있습니다(${tCheckVal})`,
            );
            return;
        }

        tInData1.BALANCE = selectedTBL_KSV_INVOICE_MST[0].BALANCE;
        tInData1.CHECK_AMT = selectedTBL_KSV_INVOICE_MST[0].CHECK_AMT;

        setLoadingTBL_KSV_INVOICE_MST(true);
        serviceS0707_MAN_INVOICE.mgrInsert_UPDATE_TT(tInData1).then((data) => {
            setLoadingTBL_KSV_INVOICE_MST(false);
            if (typeof data.graphQLErrors === "undefined") {
                if (typeof data.length === "undefined") {
                } else {
                    alert(data[0].CODE);
                    var tQry = { ...emptyQRY_KSV_INVOICE_MST };
                    tQry.REF_NO = tInData1.REF_NO;
                    search_LIST_1(tQry);
                    if (data[0].CODE.includes("SUCC"))
                        resetEDT_KSV_INVOICE_MST();
                }
            } else {
                console.log(
                    "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                        JSON.stringify(data.graphQLErrors),
                );
                toast.current.show({
                    severity: "success",
                    summary: "ERROR:Insert LC NEGO",
                    detail: "",
                    life: 3000,
                });
            }
        });
    };

    const process_DELETE_TT = () => {
        if (selectedTBL_KSV_INVOICE_MST.length <= 0) {
            alert("작업할 데이타를 선택하세요<br><br>Choose the data you want to work with");
            return;
        }
        var tSelObj = { ...selectedTBL_KSV_INVOICE_MST[0] };

        if (parseFloat(tSelObj.CHECK_AMT) > 0) {
            alert("확인금액이 0보다 큰것은 삭제할수 없습니다<br><br>Items with a confirmation amount greater than 0 cannot be deleted.");
            return;
        }

        var tInData1 = { ...dataEDT_KSV_INVOICE_MST };

        setLoadingTBL_KSV_INVOICE_MST(true);
        serviceS0707_MAN_INVOICE.mgrInsert_DELETE_TT(tInData1).then((data) => {
            setLoadingTBL_KSV_INVOICE_MST(false);
            if (typeof data.graphQLErrors === "undefined") {
                if (typeof data.length === "undefined") {
                } else {
                    alert(data[0].CODE);
                    if (data[0].CODE.includes("SUCC")) {
                        var tQry = { ...emptyQRY_KSV_INVOICE_MST };
                        tQry.REF_NO = tInData1.REF_NO;
                        search_LIST_1(tQry);
                        resetEDT_KSV_INVOICE_MST();
                    }
                }
            } else {
                console.log(
                    "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                        JSON.stringify(data.graphQLErrors),
                );
                toast.current.show({
                    severity: "success",
                    summary: "ERROR:Insert LC NEGO",
                    detail: "",
                    life: 3000,
                });
            }
        });
    };

    const search_CODE = (argData) => {
        var _tObj = {};
        _tObj.BUYER_CD = argData;

        serviceS0707_MAN_INVOICE.mgrQuery_CODE(_tObj).then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                if (argData !== "") {
                    setDatasEDT_KSV_INVOICE_MST_BANK_CD(data.BANK_CD);
                    setDataEDT_KSV_INVOICE_MST_BANK_CD(data.BANK_CD[0]);
                } else {
                    setDatasEDT_KSV_INVOICE_MST_BUYER_CD(data.BUYER_CD);
                    setDataEDT_KSV_INVOICE_MST_BUYER_CD(data.BUYER_CD[0]);

                    setDatasEDT_KSV_INVOICE_MST_END_TYPE(data.END_TYPE);
                    setDataEDT_KSV_INVOICE_MST_END_TYPE(data.END_TYPE[0]);

                    setDatasEDT_KSV_INVOICE_MST_BILL_TYPE(data.PRE_TYPE);
                    setDataEDT_KSV_INVOICE_MST_BILL_TYPE(data.PRE_TYPE[0]);

                    setDatasEDT_KSV_INVOICE_MST_CURR_CD(data.CURR_CD);
                    setDataEDT_KSV_INVOICE_MST_CURR_CD(data.CURR_CD[0]);

                    setDatasEDT_KSV_INVOICE_MST_BANK_CD(data.BANK_CD);
                    setDataEDT_KSV_INVOICE_MST_BANK_CD(data.BANK_CD[0]);
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
        if (typeof argData.REF_NO !== "undefined") _tData = { ...argData };
        else _tData = { ...dataQRY_KSV_INVOICE_MST };

        setDatasTBL_KSV_INVOICE_MST([]);
        setSelectedTBL_KSV_INVOICE_MST([]);

        setLoadingTBL_KSV_INVOICE_MST(true);
        serviceS0707_MAN_INVOICE.mgrQuery_LIST_1(_tData).then((data) => {
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
            } else {
                console.log(
                    "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });
    };

    const search_REF_NO = (argData0) => {
        var _tData = {};
        if (typeof argData0.BILL_TYPE === "undefined") {
            _tData = { ...dataEDT_KSV_INVOICE_MST };
        } else {
            _tData = { ...argData0 };
        }

        var tInObj = {};
        tInObj.REF_NO = _tData.REF_NO;
        tInObj.BILL_TYPE = _tData.BILL_TYPE;
        tInObj.BUYER_CD = _tData.BUYER_CD;

        serviceS0707_MAN_INVOICE.mgrQuery_REF_NO(tInObj).then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                if (data.length > 0) {
                    if (tInObj.BILL_TYPE === "3") {
                        // 상계용
                        alert(`상계용 Ref no: ${data[0].REF_NO}`);
                        var tEdt = { ...dataEDT_KSV_INVOICE_MST };
                        tEdt.REF_NO = data[0].REF_NO;
                        setDataEDT_KSV_INVOICE_MST(tEdt);
                    } else {
                        alert("이미 있는 REF NO입니다<br><br>This is an already existing REF NO.");
                    }
                } else {
                    alert("사용가능한 REF NO입니다<br><br>REF NO available");
                }
            } else {
                console.log(
                    "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });
    };

    /*QRY KSV_INVOICE_MST */
    const [dataQRY_KSV_INVOICE_MST, setDataQRY_KSV_INVOICE_MST] = useState(
        emptyQRY_KSV_INVOICE_MST,
    );

    const [
        datasQRY_KSV_INVOICE_MST_PRE_FLAG,
        setDatasQRY_KSV_INVOICE_MST_PRE_FLAG,
    ] = useState([]);
    const [
        dataQRY_KSV_INVOICE_MST_PRE_FLAG,
        setDataQRY_KSV_INVOICE_MST_PRE_FLAG,
    ] = useState({});

    const onDropdownChangeQRY_KSV_INVOICE_MST_PRE_FLAG = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataQRY_KSV_INVOICE_MST = { ...dataQRY_KSV_INVOICE_MST };

        let tTypeVal = _dataQRY_KSV_INVOICE_MST[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_INVOICE_MST[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_INVOICE_MST[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_INVOICE_MST(_dataQRY_KSV_INVOICE_MST);
        setDataQRY_KSV_INVOICE_MST_PRE_FLAG(e.value);
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
        datasQRY_KSV_INVOICE_MST_END_FLAG,
        setDatasQRY_KSV_INVOICE_MST_END_FLAG,
    ] = useState([]);
    const [
        dataQRY_KSV_INVOICE_MST_END_FLAG,
        setDataQRY_KSV_INVOICE_MST_END_FLAG,
    ] = useState({});

    const onDropdownChangeQRY_KSV_INVOICE_MST_END_FLAG = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataQRY_KSV_INVOICE_MST = { ...dataQRY_KSV_INVOICE_MST };

        let tTypeVal = _dataQRY_KSV_INVOICE_MST[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_INVOICE_MST[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_INVOICE_MST[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_INVOICE_MST(_dataQRY_KSV_INVOICE_MST);
        setDataQRY_KSV_INVOICE_MST_END_FLAG(e.value);
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

        datasetEDT_KSV_INVOICE_MST(argData);
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
            tObj.Ref_No = col.REF_NO;
            tObj.Bank = col.BANK_NAME;
            tObj.Buyer = col.BUYER_NAME;
            tObj.입금일자 = col.BILL_DATE;
            tObj.통화 = col.CURR_CD;
            tObj.입금금액 = col.BILL_AMT;
            tObj.확인금액 = col.CHECK_AMT;
            tObj.Balance = col.BALANCE;
            tObj.End = col.END_FLAG_N;
            tObj.Type = col.PRE_FLAG_N;
            tObj.Total_Amt = col.TOT_AMT;
            tObj.Credit_Amt = col.CREDIT_AMT;
            tObj.Charge = col.CHARGE;
            tObj.Reg_User = col.REG_USER;
            tObj.Remark = col.REMARK;
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
            saveAsExcelFileTBL_KSV_INVOICE_MST(excelBuffer, "매출입금내역");
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

    /**EDIT KSV_INVOICE_MST */
    const [datasEDT_KSV_INVOICE_MST, setDatasEDT_KSV_INVOICE_MST] = useState(
        [],
    );
    const [dataEDT_KSV_INVOICE_MST, setDataEDT_KSV_INVOICE_MST] = useState(
        emptyEDT_KSV_INVOICE_MST,
    );

    const datasetEDT_KSV_INVOICE_MST = (argData) => {
        var _argData = { ...dataEDT_KSV_INVOICE_MST };
        _argData.REF_NO = argData.REF_NO;
        _argData.BILL_DATE = argData.BILL_DATE;
        if (argData.REF_NO === "") _argData.BILL_AMT = argData.BILL_AMT;
        else _argData.BILL_AMT = argData.TOT_AMT;
        _argData.CURR_CD = argData.CURR_CD;
        _argData.END_TYPE = argData.END_FLAG;
        _argData.BUYER_CD = argData.BUYER_CD;
        _argData.CHARGE = argData.CHARGE;
        if (argData.REF_NO === "") _argData.BILL_TYPE = argData.BILL_TYPE;
        else _argData.BILL_TYPE = argData.PRE_FLAG;
        _argData.BANK_CD = argData.BANK_CD;
        _argData.CREDIT_AMT = argData.CREDIT_AMT;
        _argData.REMARK = argData.REMARK;

        _argData.BILL_AMT = serviceLib.numComAndFix(_argData.BILL_AMT, 2);
        _argData.CHARGE = serviceLib.numComAndFix(_argData.CHARGE, 2);

        setDataEDT_KSV_INVOICE_MST(_argData);

        editEDT_KSV_INVOICE_MST_CURR_CD(argData.CURR_CD);
        editEDT_KSV_INVOICE_MST_BUYER_CD(argData.BUYER_CD);

        editEDT_KSV_INVOICE_MST_BANK_CD(argData.BANK_CD);

        editEDT_KSV_INVOICE_MST_BILL_TYPE(argData.PRE_FLAG);
        editEDT_KSV_INVOICE_MST_END_TYPE(argData.END_FLAG);
    };

    const resetEDT_KSV_INVOICE_MST = () => {
        // clearSelectedKCD_STYLE();

        datasetEDT_KSV_INVOICE_MST(emptyEDT_KSV_INVOICE_MST);
    };

    const onInputChangeEDT_KSV_INVOICE_MST_REF_NO = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_INVOICE_MST = { ...dataEDT_KSV_INVOICE_MST };

        let tTypeVal = _dataEDT_KSV_INVOICE_MST[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_INVOICE_MST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_INVOICE_MST[`${name}`] = parseInt(val);

        setDataEDT_KSV_INVOICE_MST(_dataEDT_KSV_INVOICE_MST);
    };

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

    const onInputChangeEDT_KSV_INVOICE_MST_BILL_AMT = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_INVOICE_MST = { ...dataEDT_KSV_INVOICE_MST };

        let tTypeVal = _dataEDT_KSV_INVOICE_MST[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_INVOICE_MST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_INVOICE_MST[`${name}`] = parseInt(val);

        setDataEDT_KSV_INVOICE_MST(_dataEDT_KSV_INVOICE_MST);
    };

    const [
        datasEDT_KSV_INVOICE_MST_CURR_CD,
        setDatasEDT_KSV_INVOICE_MST_CURR_CD,
    ] = useState([]);
    const [
        dataEDT_KSV_INVOICE_MST_CURR_CD,
        setDataEDT_KSV_INVOICE_MST_CURR_CD,
    ] = useState({});

    const editEDT_KSV_INVOICE_MST_CURR_CD = (argValue) => {
        let _dataEDT_KSV_INVOICE_MST_CURR_CD =
            datasEDT_KSV_INVOICE_MST_CURR_CD.filter(
                (val) => val.CD_CODE === argValue,
            );
        setDataEDT_KSV_INVOICE_MST_CURR_CD(_dataEDT_KSV_INVOICE_MST_CURR_CD[0]);
    };

    const onDropdownChangeEDT_KSV_INVOICE_MST_CURR_CD = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataEDT_KSV_INVOICE_MST = { ...dataEDT_KSV_INVOICE_MST };

        let tTypeVal = _dataEDT_KSV_INVOICE_MST[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_KSV_INVOICE_MST[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_KSV_INVOICE_MST[`${name}`] = parseInt(val);
        }

        setDataEDT_KSV_INVOICE_MST(_dataEDT_KSV_INVOICE_MST);
        setDataEDT_KSV_INVOICE_MST_CURR_CD(e.value);
    };

    const [
        datasEDT_KSV_INVOICE_MST_END_TYPE,
        setDatasEDT_KSV_INVOICE_MST_END_TYPE,
    ] = useState([]);
    const [
        dataEDT_KSV_INVOICE_MST_END_TYPE,
        setDataEDT_KSV_INVOICE_MST_END_TYPE,
    ] = useState({});

    const editEDT_KSV_INVOICE_MST_END_TYPE = (argValue) => {
        let _dataEDT_KSV_INVOICE_MST_END_TYPE =
            datasEDT_KSV_INVOICE_MST_END_TYPE.filter(
                (val) => val.CD_CODE === argValue,
            );
        setDataEDT_KSV_INVOICE_MST_END_TYPE(
            _dataEDT_KSV_INVOICE_MST_END_TYPE[0],
        );
    };

    const onDropdownChangeEDT_KSV_INVOICE_MST_END_TYPE = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataEDT_KSV_INVOICE_MST = { ...dataEDT_KSV_INVOICE_MST };

        let tTypeVal = _dataEDT_KSV_INVOICE_MST[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_KSV_INVOICE_MST[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_KSV_INVOICE_MST[`${name}`] = parseInt(val);
        }

        setDataEDT_KSV_INVOICE_MST(_dataEDT_KSV_INVOICE_MST);
        setDataEDT_KSV_INVOICE_MST_END_TYPE(e.value);
    };

    const [
        datasEDT_KSV_INVOICE_MST_BUYER_CD,
        setDatasEDT_KSV_INVOICE_MST_BUYER_CD,
    ] = useState([]);
    const [
        dataEDT_KSV_INVOICE_MST_BUYER_CD,
        setDataEDT_KSV_INVOICE_MST_BUYER_CD,
    ] = useState({});

    const editEDT_KSV_INVOICE_MST_BUYER_CD = (argValue) => {
        let _dataEDT_KSV_INVOICE_MST_BUYER_CD =
            datasEDT_KSV_INVOICE_MST_BUYER_CD.filter(
                (val) => val.BUYER_CD === argValue,
            );
        setDataEDT_KSV_INVOICE_MST_BUYER_CD(
            _dataEDT_KSV_INVOICE_MST_BUYER_CD[0],
        );
    };

    const onDropdownChangeEDT_KSV_INVOICE_MST_BUYER_CD = (e, name) => {
        let val = (e.value && e.value.BUYER_CD) || "";

        let _dataEDT_KSV_INVOICE_MST = { ...dataEDT_KSV_INVOICE_MST };

        let tTypeVal = _dataEDT_KSV_INVOICE_MST[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_KSV_INVOICE_MST[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_KSV_INVOICE_MST[`${name}`] = parseInt(val);
        }

        setDataEDT_KSV_INVOICE_MST(_dataEDT_KSV_INVOICE_MST);
        setDataEDT_KSV_INVOICE_MST_BUYER_CD(e.value);

        search_CODE(val);
    };

    const onInputChangeEDT_KSV_INVOICE_MST_CHARGE = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_INVOICE_MST = { ...dataEDT_KSV_INVOICE_MST };

        let tTypeVal = _dataEDT_KSV_INVOICE_MST[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_INVOICE_MST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_INVOICE_MST[`${name}`] = parseInt(val);

        setDataEDT_KSV_INVOICE_MST(_dataEDT_KSV_INVOICE_MST);
    };

    const [
        datasEDT_KSV_INVOICE_MST_BILL_TYPE,
        setDatasEDT_KSV_INVOICE_MST_BILL_TYPE,
    ] = useState([]);
    const [
        dataEDT_KSV_INVOICE_MST_BILL_TYPE,
        setDataEDT_KSV_INVOICE_MST_BILL_TYPE,
    ] = useState({});

    const editEDT_KSV_INVOICE_MST_BILL_TYPE = (argValue) => {
        let _dataEDT_KSV_INVOICE_MST_BILL_TYPE =
            datasEDT_KSV_INVOICE_MST_BILL_TYPE.filter(
                (val) => val.CD_CODE === argValue,
            );
        setDataEDT_KSV_INVOICE_MST_BILL_TYPE(
            _dataEDT_KSV_INVOICE_MST_BILL_TYPE[0],
        );
    };

    const onDropdownChangeEDT_KSV_INVOICE_MST_BILL_TYPE = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataEDT_KSV_INVOICE_MST = { ...dataEDT_KSV_INVOICE_MST };

        let tTypeVal = _dataEDT_KSV_INVOICE_MST[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_KSV_INVOICE_MST[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_KSV_INVOICE_MST[`${name}`] = parseInt(val);
        }

        setDataEDT_KSV_INVOICE_MST(_dataEDT_KSV_INVOICE_MST);
        setDataEDT_KSV_INVOICE_MST_BILL_TYPE(e.value);

        if (e.value.CD_CODE === "3") {
            // 상계용
            var tInObj = {};
            tInObj.BILL_TYPE = "3";
            tInObj.REF_NO = _dataEDT_KSV_INVOICE_MST.REF_NO;
            tInObj.BUYER_CD = _dataEDT_KSV_INVOICE_MST.BUYER_CD;
            search_REF_NO(tInObj);
        }
    };

    const [
        datasEDT_KSV_INVOICE_MST_BANK_CD,
        setDatasEDT_KSV_INVOICE_MST_BANK_CD,
    ] = useState([]);
    const [
        dataEDT_KSV_INVOICE_MST_BANK_CD,
        setDataEDT_KSV_INVOICE_MST_BANK_CD,
    ] = useState({});

    const editEDT_KSV_INVOICE_MST_BANK_CD = (argValue) => {
        let _dataEDT_KSV_INVOICE_MST_BANK_CD =
            datasEDT_KSV_INVOICE_MST_BANK_CD.filter(
                (val) => val.BANK_CD === argValue,
            );
        setDataEDT_KSV_INVOICE_MST_BANK_CD(_dataEDT_KSV_INVOICE_MST_BANK_CD[0]);
    };

    const onDropdownChangeEDT_KSV_INVOICE_MST_BANK_CD = (e, name) => {
        let val = (e.value && e.value.BANK_CD) || "";

        let _dataEDT_KSV_INVOICE_MST = { ...dataEDT_KSV_INVOICE_MST };

        let tTypeVal = _dataEDT_KSV_INVOICE_MST[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_KSV_INVOICE_MST[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_KSV_INVOICE_MST[`${name}`] = parseInt(val);
        }

        setDataEDT_KSV_INVOICE_MST(_dataEDT_KSV_INVOICE_MST);
        setDataEDT_KSV_INVOICE_MST_BANK_CD(e.value);
    };

    const onInputChangeEDT_KSV_INVOICE_MST_REMARK = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_INVOICE_MST = { ...dataEDT_KSV_INVOICE_MST };

        let tTypeVal = _dataEDT_KSV_INVOICE_MST[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_INVOICE_MST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_INVOICE_MST[`${name}`] = parseInt(val);

        setDataEDT_KSV_INVOICE_MST(_dataEDT_KSV_INVOICE_MST);
    };

    useEffect(() => {
        var _tObj = {};
        _tObj.BUYER_CD = "";

        serviceS0707_MAN_INVOICE.mgrQuery_CODE(_tObj).then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                if (_tObj.BUYER_CD !== "") {
                    setDatasEDT_KSV_INVOICE_MST_BANK_CD(data.BANK_CD);
                    setDataEDT_KSV_INVOICE_MST_BANK_CD(data.BANK_CD[0]);
                } else {
                    setDatasEDT_KSV_INVOICE_MST_BUYER_CD(data.BUYER_CD);
                    setDataEDT_KSV_INVOICE_MST_BUYER_CD(data.BUYER_CD[0]);

                    setDatasQRY_KSV_INVOICE_MST_BUYER_CD(data.BUYER_CD);
                    setDataQRY_KSV_INVOICE_MST_BUYER_CD(data.BUYER_CD[0]);

                    setDatasEDT_KSV_INVOICE_MST_END_TYPE(data.END_TYPE);
                    setDataEDT_KSV_INVOICE_MST_END_TYPE(data.END_TYPE[0]);

                    setDatasQRY_KSV_INVOICE_MST_END_FLAG(data.END_TYPE);
                    setDataQRY_KSV_INVOICE_MST_END_FLAG(data.END_TYPE[0]);

                    console.log(data.PRE_TYPE);
                    setDatasEDT_KSV_INVOICE_MST_BILL_TYPE(data.PRE_TYPE);
                    setDataEDT_KSV_INVOICE_MST_BILL_TYPE(data.PRE_TYPE[0]);

                    setDatasQRY_KSV_INVOICE_MST_PRE_FLAG(data.PRE_TYPE);
                    setDataQRY_KSV_INVOICE_MST_PRE_FLAG(data.PRE_TYPE[0]);

                    setDatasEDT_KSV_INVOICE_MST_CURR_CD(data.CURR_CD);
                    var tCurrObj = {};
                    data.CURR_CD.forEach((col, i) => {
                        if (col.CD_CODE === "USD") tCurrObj = { ...col };
                    });
                    setDataEDT_KSV_INVOICE_MST_CURR_CD(tCurrObj);

                    setDatasEDT_KSV_INVOICE_MST_BANK_CD(data.BANK_CD);
                    setDataEDT_KSV_INVOICE_MST_BANK_CD(data.BANK_CD[0]);
                }

                var tRetDate = serviceLib.getCurrDate().substring(0, 8);
                var tObj = { ...dataQRY_KSV_INVOICE_MST };
                tObj.S_BILL_DATE = `${tRetDate.substring(0, 6)}01`;
                tObj.E_BILL_DATE = `${tRetDate.substring(0, 6)}31`;
                setDataQRY_KSV_INVOICE_MST(tObj);
            } else {
                console.log(
                    "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });

        // search_LIST_1();
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
                style={{ width: "123rem", height: "3rem" }}
            >
                <span className="af-span-3-0" style={{ width: "16rem" }}>
                    <p className="af-span-p" style={{ width: "5rem" }}>입금기간</p>
                    <div className="af-span-div" style={{ width: "10rem" }}>
                        <Calendar
                            showButtonBar
                            style={{ width: "10rem" }}
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
                <span className="af-span-3-0" style={{ width: "12rem" }}>
                    <p className="af-span-p" style={{ width: "1rem" }}>~</p>
                    <div className="af-span-div" style={{ width: "10rem" }}>
                        <Calendar
                            showButtonBar
                            style={{ width: "10rem" }}
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
                    <p className="af-span-p" style={{ width: "5rem" }}>Ref#</p>
                    <div className="af-span-div" style={{ width: "10rem" }}>
                        <InputText
                            style={{ width: "10rem" }}
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
                <span className="af-span-3-0" style={{ width: "15rem" }}>
                    <p className="af-span-p" style={{ width: "6rem" }}>Buyer#</p>
                    <div className="af-span-div" style={{ width: "8rem" }}>
                        <Dropdown
                            style={{ width: "8rem" }}
                            id="id_CURR_CD"
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
                        ></Dropdown>
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "15rem" }}>
                    <p className="af-span-p" style={{ width: "6rem" }}>End Flag</p>
                    <div className="af-span-div" style={{ width: "8rem" }}>
                        <Dropdown
                            style={{ width: "8rem" }}
                            id="id_CURR_CD"
                            value={dataQRY_KSV_INVOICE_MST_END_FLAG}
                            onChange={(e) =>
                                onDropdownChangeQRY_KSV_INVOICE_MST_END_FLAG(
                                    e,
                                    "END_FLAG",
                                )
                            }
                            options={datasQRY_KSV_INVOICE_MST_END_FLAG}
                            optionLabel="CD_NAME"
                            placeholder=""
                            editable
                        ></Dropdown>
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "15rem" }}>
                    <p className="af-span-p" style={{ width: "6rem" }}>Pre Flag</p>
                    <div className="af-span-div" style={{ width: "8rem" }}>
                        <Dropdown
                            style={{ width: "8rem" }}
                            id="id_CURR_CD"
                            value={dataQRY_KSV_INVOICE_MST_PRE_FLAG}
                            onChange={(e) =>
                                onDropdownChangeQRY_KSV_INVOICE_MST_PRE_FLAG(
                                    e,
                                    "PRE_FLAG",
                                )
                            }
                            options={datasQRY_KSV_INVOICE_MST_PRE_FLAG}
                            optionLabel="CD_NAME"
                            placeholder=""
                            editable
                        ></Dropdown>
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "11rem" }}>
                    <div className="af-span-div-btn" style={{ width: "10rem" }}>
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
                            style={{ width: "10rem" }}
                            className="p-button-text"
                            onClick={search_LIST_1}
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "11rem" }}>
                    <div className="af-span-div-btn" style={{ width: "10rem" }}>
                        <Button
                            label="Excel"
                            style={{ width: "10rem" }}
                            className="p-button-text green"
                            onClick={exportExcelTBL_KSV_INVOICE_MST}
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
                    emptyMessage=" " // header={headerTBL_KSV_INVOICE_MST}
                    responsiveLayout="scroll"
                    scrollable
                    scrollHeight="490px"
                >
                    <AFColumn field="REF_NO" headerClassName="t-header" header="Ref no" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="BANK_NAME" headerClassName="t-header" header="Bank" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="BUYER_NAME" headerClassName="t-header" header="Buyer" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="BILL_DATE" headerClassName="t-header" header="입금일자" style={{ width: "10rem", flexBasis: "auto" }} body={(rowData) => serviceLib.dateFormatHMS(rowData.BILL_DATE) } ></AFColumn>
                    <AFColumn field="CURR_CD" headerClassName="t-header" header="통화" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="BILL_AMT" headerClassName="t-header" header="입금금액" style={{ width: "10rem", flexBasis: "auto" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.BILL_AMT, 2) } ></AFColumn>
                    <AFColumn field="CHECK_AMT" headerClassName="t-header" header="확인금액" style={{ width: "10rem", flexBasis: "auto" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.CHECK_AMT, 2) } ></AFColumn>
                    <AFColumn field="BALANCE" headerClassName="t-header" header="Balance" style={{ width: "10rem", flexBasis: "auto" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.BALANCE, 2) } ></AFColumn>
                    <AFColumn field="END_FLAG_N" headerClassName="t-header" header="End" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="PRE_FLAG_N" headerClassName="t-header" header="Type" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="TOT_AMT" headerClassName="t-header" header="Tot Amt" style={{ width: "10rem", flexBasis: "auto" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.TOT_AMT, 2) } ></AFColumn>
                    <AFColumn field="CREDIT_AMT" headerClassName="t-header" header="Credit" style={{ width: "10rem", flexBasis: "auto" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.CREDIT_AMT, 2) } ></AFColumn>
                    <AFColumn field="CHARGE" headerClassName="t-header" header="Charge" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="BUYER_CD" headerClassName="t-header" header="Buyer#" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="REG_USER" headerClassName="t-header" header="Reg" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="REMARK" headerClassName="t-header" header="Remark" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                </AFDataTable>
            </div>

            <div
                className="af-div-first"
                style={{ width: "123rem", height: "9rem" }}
            >
                <span className="af-span-3-0" style={{ width: "22rem" }}>
                    <p className="af-span-p" style={{ width: "8rem" }}>거래번호</p>
                    <div className="af-span-div" style={{ width: "13rem" }}>
                        <InputText
                            style={{ width: "13rem" }}
                            id="id_REF_NO"
                            value={dataEDT_KSV_INVOICE_MST.REF_NO}
                            onChange={(e) =>
                                onInputChangeEDT_KSV_INVOICE_MST_REF_NO(
                                    e,
                                    "REF_NO",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "11rem" }}>
                    <div className="af-span-div-btn" style={{ width: "10rem" }}>
                        <Button
                            label={
                                <span>
                                    Search(<u>S</u>)
                                </span>
                            }
                            style={{ width: "10rem" }}
                            className="p-button-text"
                            onClick={search_REF_NO}
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "11rem" }}>
                    <div className="af-span-div-btn" style={{ width: "10rem" }}>
                        <Button
                            label="#Upd. Ref"
                            style={{ width: "10rem" }}
                            className="p-button-text"
                            onClick={blankFn}
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "25rem" }}>
                    <p className="af-span-p" style={{ width: "8rem" }}>입금일</p>
                    <div className="af-span-div" style={{ width: "16rem" }}>
                        <Calendar
                            showButtonBar
                            style={{ width: "16rem" }}
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
                <span className="af-span-3-0" style={{ width: "22rem" }}>
                    <p className="af-span-p" style={{ width: "8rem" }}>입금액</p>
                    <div className="af-span-div" style={{ width: "13rem" }}>
                        <InputText
                            style={{ width: "13rem" }}
                            id="id_BILL_AMT"
                            value={dataEDT_KSV_INVOICE_MST.BILL_AMT}
                            onChange={(e) =>
                                onInputChangeEDT_KSV_INVOICE_MST_BILL_AMT(
                                    e,
                                    "BILL_AMT",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "28rem" }}>
                    <p className="af-span-p" style={{ width: "8rem" }}>Curr</p>
                    <div className="af-span-div" style={{ width: "13rem" }}>
                        <Dropdown
                            style={{ width: "13rem" }}
                            id="id_CURR_CD"
                            value={dataEDT_KSV_INVOICE_MST_CURR_CD}
                            onChange={(e) =>
                                onDropdownChangeEDT_KSV_INVOICE_MST_CURR_CD(
                                    e,
                                    "CURR_CD",
                                )
                            }
                            options={datasEDT_KSV_INVOICE_MST_CURR_CD}
                            optionLabel="CD_NAME"
                            placeholder=""
                            editable
                        ></Dropdown>
                    </div>
                </span>

                <span className="af-span-3" style={{ width: "45rem" }}>
                    <p className="af-span-p" style={{ width: "8rem" }}>Buyer</p>
                    <div className="af-span-div" style={{ width: "36rem" }}>
                        <Dropdown
                            style={{ width: "36rem" }}
                            id="id_BUYER_CD"
                            value={dataEDT_KSV_INVOICE_MST_BUYER_CD}
                            onChange={(e) =>
                                onDropdownChangeEDT_KSV_INVOICE_MST_BUYER_CD(
                                    e,
                                    "BUYER_CD",
                                )
                            }
                            options={datasEDT_KSV_INVOICE_MST_BUYER_CD}
                            optionLabel="BUYER_NAME"
                            placeholder=""
                            editable
                            filter
                        ></Dropdown>
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "25rem" }}>
                    <p className="af-span-p" style={{ width: "8rem" }}>수수료</p>
                    <div className="af-span-div" style={{ width: "16rem" }}>
                        <InputText
                            style={{ width: "16rem" }}
                            id="id_CHARGE"
                            value={dataEDT_KSV_INVOICE_MST.CHARGE}
                            onChange={(e) =>
                                onInputChangeEDT_KSV_INVOICE_MST_CHARGE(
                                    e,
                                    "CHARGE",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "22rem" }}>
                    <p className="af-span-p" style={{ width: "8rem" }}>Bill Type</p>
                    <div className="af-span-div" style={{ width: "13rem" }}>
                        <Dropdown
                            style={{ width: "13rem" }}
                            id="id_BILL_TYPE"
                            value={dataEDT_KSV_INVOICE_MST_BILL_TYPE}
                            onChange={(e) =>
                                onDropdownChangeEDT_KSV_INVOICE_MST_BILL_TYPE(
                                    e,
                                    "BILL_TYPE",
                                )
                            }
                            options={datasEDT_KSV_INVOICE_MST_BILL_TYPE}
                            optionLabel="CD_NAME"
                            placeholder=""
                            editable
                        ></Dropdown>
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "22rem" }}>
                    <p className="af-span-p" style={{ width: "8rem" }}>End Type</p>
                    <div className="af-span-div" style={{ width: "13rem" }}>
                        <Dropdown
                            style={{ width: "13rem" }}
                            id="id_END_TYPE"
                            value={dataEDT_KSV_INVOICE_MST_END_TYPE}
                            onChange={(e) =>
                                onDropdownChangeEDT_KSV_INVOICE_MST_END_TYPE(
                                    e,
                                    "END_TYPE",
                                )
                            }
                            options={datasEDT_KSV_INVOICE_MST_END_TYPE}
                            optionLabel="CD_NAME"
                            placeholder=""
                            editable
                        ></Dropdown>
                    </div>
                </span>

                <span className="af-span-3" style={{ width: "45rem" }}>
                    <p className="af-span-p" style={{ width: "8rem" }}>Bank</p>
                    <div className="af-span-div" style={{ width: "36rem" }}>
                        <Dropdown
                            style={{ width: "36rem" }}
                            id="id_BANK_CD"
                            value={dataEDT_KSV_INVOICE_MST_BANK_CD}
                            onChange={(e) =>
                                onDropdownChangeEDT_KSV_INVOICE_MST_BANK_CD(
                                    e,
                                    "BANK_CD",
                                )
                            }
                            options={datasEDT_KSV_INVOICE_MST_BANK_CD}
                            optionLabel="BANK_NAME"
                            placeholder=""
                            editable
                            filter
                        ></Dropdown>
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "42rem" }}>
                    <p className="af-span-p" style={{ width: "8rem" }}>Remark</p>
                    <div className="af-span-div" style={{ width: "33rem" }}>
                        <InputText
                            style={{ width: "33rem" }}
                            id="id_REMARK"
                            value={dataEDT_KSV_INVOICE_MST.REMARK}
                            onChange={(e) =>
                                onInputChangeEDT_KSV_INVOICE_MST_REMARK(
                                    e,
                                    "REMARK",
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
                <span className="af-span-3-0" style={{ width: "11rem" }}>
                    <div className="af-span-div-btn" style={{ width: "10rem" }}>
                        <Button
                            style={{ width: "10rem" }}
                            label="Insert"
                            className="p-button-text"
                            onClick={process_INSERT_TT}
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "11rem" }}>
                    <div className="af-span-div-btn" style={{ width: "10rem" }}>
                        <Button
                            style={{ width: "10rem" }}
                            label="Delete"
                            className="p-button-text"
                            onClick={process_DELETE_TT}
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "11rem" }}>
                    <div className="af-span-div-btn" style={{ width: "10rem" }}>
                        <Button
                            style={{ width: "10rem" }}
                            label="Update"
                            className="p-button-text"
                            onClick={process_UPDATE_TT}
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "11rem" }}>
                    <div className="af-span-div-btn" style={{ width: "10rem" }}>
                        <Button
                            style={{ width: "10rem" }}
                            label="Reset"
                            className="p-button-text"
                            onClick={resetEDT_KSV_INVOICE_MST}
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

export default React.memo(S0707_MAN_INVOICE, comparisonFn);
