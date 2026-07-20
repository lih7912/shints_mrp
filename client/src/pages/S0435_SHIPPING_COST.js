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

const moment = require("moment");

import { ServiceLib } from "../service/service_lib/ServiceLib";
import { ServiceS0435_SHIPPING_COST } from "../service/service_biz/ServiceS0435_SHIPPING_COST";

import "./page_common.scss";

const emptyKCD_CODE = {
    id: 0,
    CD_GROUP: "",
    CD_CODE: "",
    CD_NAME: "",
    CD_FLAG: "",
};

const emptyQRY_KSV_PO_MRP = {
    STATUS_CD: "",
    SHIP_MODE: "",
    ORIGIN_PORT: "",
    DESTINATION: "",
    S_ETA: "",
    E_ETA: "",
    PAYER: "",
    BL_NO: "",
    REMARK: "",
    INVOICE_NO: "",
};

const emptyQRY_KSV_PO_MRP2 = {
    IN_QTY: "",
};

const emptyTBL_KSV_PO_MRP = {
    id: 0,
    OP_KIND: "",
    BUYER_NAME: "",
    BUYER_CD: "",
    PO_CD: "",
    VENDOR_NAME: "",
    VENDOR_CD: "",
    KIND1: "",
    MRP_DATE: "",
    ORDER_DATE: "",
    TARGET_ETA: "",
    READY_DATE: "",
    PI_ISSUE: "",
    PI_FIX: "",
    PI_FILE: "",
    PI_CD: "",
    AMOUNT: "",
    PAY_TYPE: "",
    TERM: "",
    REQUEST_DATE: "",
    BANKCOPY_DATE: "",
    CONFIRM_NO: "",
};

const emptyTBL_KSV_PO_MRP1 = {
    id: 0,
    OP_KIND: "",
    BUYER_NAME: "",
    BUYER_CD: "",
    PO_CD: "",
    VENDOR_NAME: "",
    VENDOR_CD: "",
    KIND1: "",
    MRP_DATE: "",
    ORDER_DATE: "",
    TARGET_ETA: "",
    READY_DATE: "",
    PI_ISSUE: "",
    PI_FIX: "",
    PI_FILE: "",
    PI_CD: "",
    AMOUNT: "",
    PAY_TYPE: "",
    TERM: "",
    REQUEST_DATE: "",
    BANKCOPY_DATE: "",
    CONFIRM_NO: "",
};

const emptyTBL_KSV_PO_MRP2 = {
    id: 0,
    OP_KIND: "",
    BUYER_NAME: "",
    BUYER_CD: "",
    PO_CD: "",
    VENDOR_NAME: "",
    VENDOR_CD: "",
    KIND1: "",
    MRP_DATE: "",
    ORDER_DATE: "",
    TARGET_ETA: "",
    READY_DATE: "",
    PI_ISSUE: "",
    PI_FIX: "",
    PI_FILE: "",
    PI_CD: "",
    AMOUNT: "",
    PAY_TYPE: "",
    TERM: "",
    REQUEST_DATE: "",
    BANKCOPY_DATE: "",
    CONFIRM_NO: "",
};

const emptyEDT_KSV_PO_MRP = {
    CURR_CD: "USD",
    SHIPPING_COST: "",
    SHIPPING_COST_PAID: "",
    CHK_SHINTS: "",
    CHK_BVT: "",
    CHK_ETP: "",
    CHK_OTHER: "",
};

const S0435_SHIPPING_COST = () => {
    const serviceLibRef = useRef(null);
    if (!serviceLibRef.current) {
        serviceLibRef.current = new ServiceLib();
        serviceLibRef.current.loginConfirm();
    }
    const serviceLib = serviceLibRef.current;
    const serviceS0435_SHIPPING_COSTRef = useRef(null);
    if (!serviceS0435_SHIPPING_COSTRef.current) serviceS0435_SHIPPING_COSTRef.current = new ServiceS0435_SHIPPING_COST();
    const serviceS0435_SHIPPING_COST = serviceS0435_SHIPPING_COSTRef.current;

    const toast = useRef(null);

    /* splitter 관련 */
    const [styleVal, setStyleVal] = useState({ width: "65vw" });

    // dialog
    const [urlIframe, setUrlIframe] = useState("");
    const [createDialog, setCreateDialog] = useState(false);
    const hideDialog = () => {
        setCreateDialog(false);
    };

    // Search

    // Search KSV_STOCK_MEM
    const search_LIST_1 = () => {
        var tObj = { ...dataQRY_KSV_PO_MRP };

        setLoadingTBL_KSV_PO_MRP(true);
        serviceS0435_SHIPPING_COST.mgrQuery_LIST_1(tObj).then((data) => {
            setLoadingTBL_KSV_PO_MRP(false);
            if (typeof data.graphQLErrors === "undefined") {
                var tArray = data.map((col, i) => {
                    var tObj = { ...col };
                    tObj.id = i + 1;
                    return tObj;
                });
                setDatasTBL_KSV_PO_MRP(tArray);
            } else {
                console.log(
                    "mgrQuery_PO_CD error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });
    };

    const process_UPDATE_SHIPPING_COST = () => {
        var tObj = { ...selectedTBL_KSV_PO_MRP[0] };
        var tInput = { ...dataEDT_KSV_PO_MRP };
        tInput.SHIPMENT_CD = tObj.SHIPMENT_CD;

        if (!tInput.SHIPPING_COST) {
            alert("Shipping Cost는 필수입력값 입니다.<br><br>Shipping Cost is a required input value.");
            return;
        }
        if (!tInput.CURR_CD) {
            alert("Curr Cd는 필수입력값 입니다.<br><br>Curr Cd is a required input value.");
            return;
        }
        if (
            tInput.CHK_SHINTS !== "1" &&
            tInput.CHK_BVT !== "1" &&
            tInput.CHK_ETP !== "1" &&
            tInput.CHK_OTHER !== "1"
        ) {
            alert("Payer 구분이 입력되어야 합니다<br><br>Payer classification must be entered");
            return;
        }

        console.log(tInput);

        setLoadingTBL_KSV_PO_MRP(true);

        serviceS0435_SHIPPING_COST
            .mgrUpdate_SHIPPING_COST(tInput)
            .then((data) => {
                setLoadingTBL_KSV_PO_MRP(false);
                if (typeof data.graphQLErrors === "undefined") {
                    if (data.length > 0) {
                        alert(data[0].CODE);
                        search_LIST_1();
                    }
                } else {
                    toast.current.show({
                        severity: "success",
                        summary: "Fail:Update Shipping Cost",
                        detail: "",
                        life: 3000,
                    });
                }
            });
    };

    const process_CANCEL_SHIPPING_COST = () => {
        var tObj = { ...selectedTBL_KSV_PO_MRP[0] };
        var tInput = { ...dataEDT_KSV_PO_MRP };
        tInput.SHIPMENT_CD = tObj.SHIPMENT_CD;

        if (!tInput.SHIPPING_COST) {
            alert("Shipping Cost는 필수입력값 입니다.<br><br>Shipping Cost is a required input value.");
            return;
        }
        if (!tInput.CURR_CD) {
            alert("Curr Cd는 필수입력값 입니다.<br><br>Curr Cd is a required input value.");
            return;
        }
        if (
            tInput.CHK_SHINTS !== "1" &&
            tInput.CHK_BVT !== "1" &&
            tInput.CHK_ETP !== "1" &&
            tInput.CHK_OTHER !== "1"
        ) {
            alert("Payer 구분이 입력되어야 합니다<br><br>Payer classification must be entered");
            return;
        }

        console.log(tInput);

        setLoadingTBL_KSV_PO_MRP(true);

        serviceS0435_SHIPPING_COST
            .mgrCancel_SHIPPING_COST(tInput)
            .then((data) => {
                setLoadingTBL_KSV_PO_MRP(false);
                if (typeof data.graphQLErrors === "undefined") {
                    if (data.length > 0) {
                        alert(data[0].CODE);
                        search_LIST_1();
                    }
                } else {
                    toast.current.show({
                        severity: "success",
                        summary: "Fail:Cancel Shipping Cost",
                        detail: "",
                        life: 3000,
                    });
                }
            });
    };


    /* QRY KSV_PO_MRP*/
    const [dataQRY_KSV_PO_MRP, setDataQRY_KSV_PO_MRP] =
        useState(emptyQRY_KSV_PO_MRP);

    const onInputChangeQRY_KSV_PO_MRP_BL_NO = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_PO_MRP = { ...dataQRY_KSV_PO_MRP };

        let tTypeVal = _dataQRY_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string") _dataQRY_KSV_PO_MRP[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_PO_MRP[`${name}`] = parseInt(val);

        setDataQRY_KSV_PO_MRP(_dataQRY_KSV_PO_MRP);
    };

    const onInputChangeQRY_KSV_PO_MRP_REMARK = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_PO_MRP = { ...dataQRY_KSV_PO_MRP };

        let tTypeVal = _dataQRY_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string") _dataQRY_KSV_PO_MRP[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_PO_MRP[`${name}`] = parseInt(val);

        setDataQRY_KSV_PO_MRP(_dataQRY_KSV_PO_MRP);
    };

    const onCalChangeQRY_KSV_PO_MRP_S_ETA = (e, name) => {
        let val1 = e.value || "";
        let val = "";
        if (val1 === "") {
            val = "";
        } else {
            val = getDateVal(val1);
        }

        let _dataQRY_KSV_PO_MRP = { ...dataQRY_KSV_PO_MRP };
        _dataQRY_KSV_PO_MRP[`${name}`] = val;
        setDataQRY_KSV_PO_MRP(_dataQRY_KSV_PO_MRP);
    };

    const onCalChangeQRY_KSV_PO_MRP_E_ETA = (e, name) => {
        let val1 = e.value || "";
        let val = "";
        if (val1 === "") {
            val = "";
        } else {
            val = getDateVal(val1);
        }

        let _dataQRY_KSV_PO_MRP = { ...dataQRY_KSV_PO_MRP };
        _dataQRY_KSV_PO_MRP[`${name}`] = val;
        setDataQRY_KSV_PO_MRP(_dataQRY_KSV_PO_MRP);
    };

    const [
        datasQRY_KSV_PO_MRP_ORIGIN_PORT,
        setDatasQRY_KSV_PO_MRP_ORIGIN_PORT,
    ] = useState([]);
    const [dataQRY_KSV_PO_MRP_ORIGIN_PORT, setDataQRY_KSV_PO_MRP_ORIGIN_PORT] =
        useState({});

    const onDropdownChangeQRY_KSV_PO_MRP_ORIGIN_PORT = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataQRY_KSV_PO_MRP = { ...dataQRY_KSV_PO_MRP };

        let tTypeVal = _dataQRY_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_PO_MRP[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_PO_MRP[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_PO_MRP(_dataQRY_KSV_PO_MRP);
        setDataQRY_KSV_PO_MRP_ORIGIN_PORT(e.value);
    };

    const [datasQRY_KSV_PO_MRP_PAYER, setDatasQRY_KSV_PO_MRP_PAYER] = useState(
        [],
    );
    const [dataQRY_KSV_PO_MRP_PAYER, setDataQRY_KSV_PO_MRP_PAYER] = useState(
        {},
    );

    const onDropdownChangeQRY_KSV_PO_MRP_PAYER = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataQRY_KSV_PO_MRP = { ...dataQRY_KSV_PO_MRP };

        let tTypeVal = _dataQRY_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_PO_MRP[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_PO_MRP[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_PO_MRP(_dataQRY_KSV_PO_MRP);
        setDataQRY_KSV_PO_MRP_PAYER(e.value);
    };

    const [
        datasQRY_KSV_PO_MRP_DESTINATION,
        setDatasQRY_KSV_PO_MRP_DESTINATION,
    ] = useState([]);
    const [dataQRY_KSV_PO_MRP_DESTINATION, setDataQRY_KSV_PO_MRP_DESTINATION] =
        useState({});

    const onDropdownChangeQRY_KSV_PO_MRP_DESTINATION = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataQRY_KSV_PO_MRP = { ...dataQRY_KSV_PO_MRP };

        let tTypeVal = _dataQRY_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_PO_MRP[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_PO_MRP[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_PO_MRP(_dataQRY_KSV_PO_MRP);
        setDataQRY_KSV_PO_MRP_DESTINATION(e.value);
    };

    const [datasQRY_KSV_PO_MRP_SHIP_MODE, setDatasQRY_KSV_PO_MRP_SHIP_MODE] =
        useState([]);
    const [dataQRY_KSV_PO_MRP_SHIP_MODE, setDataQRY_KSV_PO_MRP_SHIP_MODE] =
        useState({});

    const onDropdownChangeQRY_KSV_PO_MRP_SHIP_MODE = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataQRY_KSV_PO_MRP = { ...dataQRY_KSV_PO_MRP };

        let tTypeVal = _dataQRY_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_PO_MRP[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_PO_MRP[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_PO_MRP(_dataQRY_KSV_PO_MRP);
        setDataQRY_KSV_PO_MRP_SHIP_MODE(e.value);
    };

    const [datasQRY_KSV_PO_MRP_STATUS_CD, setDatasQRY_KSV_PO_MRP_STATUS_CD] =
        useState([]);
    const [dataQRY_KSV_PO_MRP_STATUS_CD, setDataQRY_KSV_PO_MRP_STATUS_CD] =
        useState({});

    const onDropdownChangeQRY_KSV_PO_MRP_STATUS_CD = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataQRY_KSV_PO_MRP = { ...dataQRY_KSV_PO_MRP };

        let tTypeVal = _dataQRY_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_PO_MRP[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_PO_MRP[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_PO_MRP(_dataQRY_KSV_PO_MRP);
        setDataQRY_KSV_PO_MRP_STATUS_CD(e.value);
    };

    /* QRY KSV_PO_MRP*/
    const [dataQRY_KSV_PO_MRP2, setDataQRY_KSV_PO_MRP2] =
        useState(emptyQRY_KSV_PO_MRP2);

    /* TABLE KSV_PO_MRP*/
    // DEFINE DATAGRID : TBL_KSV_PO_MRP
    const [loadingTBL_KSV_PO_MRP, setLoadingTBL_KSV_PO_MRP] = useState(false);

    const [datasTBL_KSV_PO_MRP, setDatasTBL_KSV_PO_MRP] = useState([]);
    const dt_TBL_KSV_PO_MRP = useRef(null);
    const [dataTBL_KSV_PO_MRP, setDataTBL_KSV_PO_MRP] =
        useState(emptyTBL_KSV_PO_MRP);
    const [selectedTBL_KSV_PO_MRP, setSelectedTBL_KSV_PO_MRP] = useState([]);
    const [flagSelectModeTBL_KSV_PO_MRP, setFlagSelectModeTBL_KSV_PO_MRP] =
        useState(false);

    // DATAGRID CODE : TBL_KSV_PO_MRP

    const onRowClick1TBL_KSV_PO_MRP = (argData0) => {
        var argData = {};

        if (typeof argData0.length !== "undefined") {
            if (argData0.length <= 0) return;
            argData = { ...argData0[0] };
        } else {
            argData = { ...argData0 };
        }

        if (!argData.SHIPPING_COST_CURR) argData.SHIPPING_COST_CURR = "USD";

        let argTBL_KSV_PO_MRP = { ...argData };

        setDataTBL_KSV_PO_MRP(argTBL_KSV_PO_MRP);

        var tObj = { ...dataEDT_KSV_PO_MRP };
        tObj.CURR_CD = argData.SHIPPING_COST_CURR;
        tObj.SHIPPING_COST = argData.SHIPPING_COST;
        tObj.SHIPPING_COST_PAID = argData.SHIPPING_COST_PAID;
        tObj.CHK_SHINTS = "0";
        tObj.CHK_BVT = "0";
        tObj.CHK_ETP = "0";
        tObj.CHK_OTHER = "0";
        if (tObj.SHIPPING_COST_PAID === "SHINTS") tObj.CHK_SHINTS = "1";
        else if (tObj.SHIPPING_COST_PAID === "BVT") tObj.CHK_BVT = "1";
        else if (tObj.SHIPPING_COST_PAID === "ETP") tObj.CHK_ETP = "1";
        else {
            if (tObj.SHIPPING_COST_PAID !== "") tObj.OTHER = "1";
        }
        setDataEDT_KSV_PO_MRP(tObj);

        editEDT_KSV_PO_MRP_CURR_CD(argData.SHIPPING_COST_CURR);
        // search_LIST_2(argData);
        // resetEDT_KSV_PO_MRP(argData);
    };

    const onRowClickTBL_KSV_PO_MRP = (event) => {
        let argTBL_KSV_PO_MRP = event.data;
        if (flagSelectModeTBL_KSV_PO_MRP) return;

        // Service : NawooAll:mgrQueryTBL_KSV_PO_MRP
    };

    const exportExcelTBL_KSV_PO_MRP = () => {
        var tArray = [];
        datasTBL_KSV_PO_MRP.forEach((col, i) => {
            var tObj = {};
            tObj.Status = col.STATUS_CD;
            tObj.ETD = col.ETD;
            tObj.Ship_Mode = col.SHIP_MODE;
            tObj.Origin = col.ORIGIN_PORT;
            tObj.Destination = col.DESTINATION;
            tObj.Weight = col.S_WEIGHT;
            tObj.CBM = col.S_CBM;
            tObj.BL_NO = col.BL_NO;
            tObj.ETA = col.ETA;
            tObj.Curr = col.SHIPPING_COST_CURR;
            tObj.Cost = col.SHIPPING_COST;
            tObj.Pay = col.SHIPPING_COST_PAID;
            tObj.Curr_Import = col.IMPORT_COST_CURR;
            tObj.Import_Cost = col.IMPORT_COST;
            tObj.Pay_Import = col.IMPORT_COST_PAID;
            tObj.Duty_Cost = col.DUTY_COST;
            tObj.Shipment_Cd = col.SHIPMENT_CD;
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
            saveAsExcelFileTBL_KSV_PO_MRP(excelBuffer, "Shipping Cost");
        });
    };

    const saveAsExcelFileTBL_KSV_PO_MRP = (buffer, fileName) => {
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

    /* TABLE KSV_PO_MRP*/
    // DEFINE DATAGRID : TBL_KSV_PO_MRP1
    const [loadingTBL_KSV_PO_MRP1, setLoadingTBL_KSV_PO_MRP1] = useState(false);

    const [datasTBL_KSV_PO_MRP1, setDatasTBL_KSV_PO_MRP1] = useState([]);
    const dt_TBL_KSV_PO_MRP1 = useRef(null);
    const [dataTBL_KSV_PO_MRP1, setDataTBL_KSV_PO_MRP1] =
        useState(emptyTBL_KSV_PO_MRP1);
    const [selectedTBL_KSV_PO_MRP1, setSelectedTBL_KSV_PO_MRP1] = useState([]);
    const [flagSelectModeTBL_KSV_PO_MRP1, setFlagSelectModeTBL_KSV_PO_MRP1] =
        useState(false);

    // DATAGRID CODE : TBL_KSV_PO_MRP1

    /* TABLE KSV_PO_MRP*/
    // DEFINE DATAGRID : TBL_KSV_PO_MRP2
    const [loadingTBL_KSV_PO_MRP2, setLoadingTBL_KSV_PO_MRP2] = useState(false);

    const [datasTBL_KSV_PO_MRP2, setDatasTBL_KSV_PO_MRP2] = useState([]);
    const dt_TBL_KSV_PO_MRP2 = useRef(null);
    const [dataTBL_KSV_PO_MRP2, setDataTBL_KSV_PO_MRP2] =
        useState(emptyTBL_KSV_PO_MRP2);
    const [selectedTBL_KSV_PO_MRP2, setSelectedTBL_KSV_PO_MRP2] = useState([]);
    const [flagSelectModeTBL_KSV_PO_MRP2, setFlagSelectModeTBL_KSV_PO_MRP2] =
        useState(false);

    // DATAGRID CODE : TBL_KSV_PO_MRP2

    /* QRY KSV_PO_MRP*/
    const [dataEDT_KSV_PO_MRP, setDataEDT_KSV_PO_MRP] =
        useState(emptyEDT_KSV_PO_MRP);

    const [datasEDT_KSV_PO_MRP_CURR_CD, setDatasEDT_KSV_PO_MRP_CURR_CD] =
        useState([]);
    const [dataEDT_KSV_PO_MRP_CURR_CD, setDataEDT_KSV_PO_MRP_CURR_CD] =
        useState({});

    const editEDT_KSV_PO_MRP_CURR_CD = (argValue) => {
        let _dataEDT_KSV_PO_MRP_CURR_CD = datasEDT_KSV_PO_MRP_CURR_CD.filter(
            (val) => val.CD_CODE === argValue,
        );
        setDataEDT_KSV_PO_MRP_CURR_CD(_dataEDT_KSV_PO_MRP_CURR_CD[0]);
    };

    const onDropdownChangeEDT_KSV_PO_MRP_CURR_CD = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataEDT_KSV_PO_MRP = { ...dataEDT_KSV_PO_MRP };

        let tTypeVal = _dataEDT_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_KSV_PO_MRP[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_KSV_PO_MRP[`${name}`] = parseInt(val);
        }

        setDataEDT_KSV_PO_MRP(_dataEDT_KSV_PO_MRP);
        setDataEDT_KSV_PO_MRP_CURR_CD(e.value);
    };

    const onInputChangeEDT_KSV_PO_MRP_SHIPPING_COST = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_PO_MRP = { ...dataEDT_KSV_PO_MRP };

        let tTypeVal = _dataEDT_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string") _dataEDT_KSV_PO_MRP[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_PO_MRP[`${name}`] = parseInt(val);

        setDataEDT_KSV_PO_MRP(_dataEDT_KSV_PO_MRP);
    };

    const [
        dataEDT_KSV_PO_MRP_SHIPPING_COST_PAID_DISABLED,
        setDataEDT_KSV_PO_MRP_SHIPPING_COST_PAID_DISABLED,
    ] = useState(true);
    const onInputChangeEDT_KSV_PO_MRP_SHIPPING_COST_PAID = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_PO_MRP = { ...dataEDT_KSV_PO_MRP };

        let tTypeVal = _dataEDT_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string") _dataEDT_KSV_PO_MRP[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_PO_MRP[`${name}`] = parseInt(val);

        setDataEDT_KSV_PO_MRP(_dataEDT_KSV_PO_MRP);
    };

    const onCheckboxChangeEDT_KSV_PO_MRP_CHK_SHINTS = (e, name) => {
        let val = "";
        let _dataEDT_KSV_PO_MRP = { ...dataEDT_KSV_PO_MRP };
        if (e.checked) {
            val = "1";
        } else {
            val = "0";
        }
        _dataEDT_KSV_PO_MRP[`${name}`] = val;
        setDataEDT_KSV_PO_MRP(_dataEDT_KSV_PO_MRP);
    };

    const onCheckboxChangeEDT_KSV_PO_MRP_CHK_BVT = (e, name) => {
        let val = "";
        let _dataEDT_KSV_PO_MRP = { ...dataEDT_KSV_PO_MRP };
        if (e.checked) {
            val = "1";
        } else {
            val = "0";
        }
        _dataEDT_KSV_PO_MRP[`${name}`] = val;
        setDataEDT_KSV_PO_MRP(_dataEDT_KSV_PO_MRP);
    };

    const onCheckboxChangeEDT_KSV_PO_MRP_CHK_ETP = (e, name) => {
        let val = "";
        let _dataEDT_KSV_PO_MRP = { ...dataEDT_KSV_PO_MRP };
        if (e.checked) {
            val = "1";
        } else {
            val = "0";
        }
        _dataEDT_KSV_PO_MRP[`${name}`] = val;
        setDataEDT_KSV_PO_MRP(_dataEDT_KSV_PO_MRP);
    };

    const onCheckboxChangeEDT_KSV_PO_MRP_CHK_OTHER = (e, name) => {
        let val = "";
        let _dataEDT_KSV_PO_MRP = { ...dataEDT_KSV_PO_MRP };
        if (e.checked) {
            val = "1";
            setDataEDT_KSV_PO_MRP_SHIPPING_COST_PAID_DISABLED(false);
        } else {
            val = "0";
            setDataEDT_KSV_PO_MRP_SHIPPING_COST_PAID_DISABLED(true);
        }
        _dataEDT_KSV_PO_MRP[`${name}`] = val;
        setDataEDT_KSV_PO_MRP(_dataEDT_KSV_PO_MRP);
    };

    ///

    useEffect(() => {
        var tObj = {};
        serviceS0435_SHIPPING_COST.mgrQuery_CODE(tObj).then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                setDatasQRY_KSV_PO_MRP_SHIP_MODE(data.SHIP_MODE);
                setDataQRY_KSV_PO_MRP_SHIP_MODE(data.SHIP_MODE[0]);

                setDatasQRY_KSV_PO_MRP_DESTINATION(data.DESTINATION);
                setDataQRY_KSV_PO_MRP_DESTINATION(data.DESTINATION[0]);

                setDatasQRY_KSV_PO_MRP_ORIGIN_PORT(data.ORIGIN_PORT);
                setDataQRY_KSV_PO_MRP_ORIGIN_PORT(data.ORIGIN_PORT[0]);

                setDatasQRY_KSV_PO_MRP_STATUS_CD(data.STATUS_CD);
                setDataQRY_KSV_PO_MRP_STATUS_CD(data.STATUS_CD[0]);

                var tObj = {};
                data.CURR_CD.forEach((col, i) => {
                    if (col.CD_CODE === "USD") tObj = { ...col };
                });

                setDatasEDT_KSV_PO_MRP_CURR_CD(data.CURR_CD);
                setDataEDT_KSV_PO_MRP_CURR_CD(tObj);

                console.log(data);
                setDatasQRY_KSV_PO_MRP_PAYER(data.PAYER);
                setDataQRY_KSV_PO_MRP_PAYER(data.PAYER[0]);

                var tRetDate = serviceLib.getCurrDate();
                var tEdt = { ...dataQRY_KSV_PO_MRP };
                tEdt.S_ETA = `${tRetDate.substring(0, 4)}0101`;
                tEdt.E_ETA = `${tRetDate.substring(0, 4)}1231`;
                setDataQRY_KSV_PO_MRP(tEdt);
            } else {
                console.log(
                    "mgrQuery_PO_CD error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });
        //search_LIST_1();
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

    const onRowDoubleClickTBL_KSV_PO_MRP = (event) => {
        if (!event.data.SHIPMENT_CD) {
            alert("SHIP# is required.");
            return;
        }

        var tUrl2 = `S043401_SHIPMENT_INFO?SHIPMENT_CD=${event.data.SHIPMENT_CD}&STATUS=${event.data.STATUS_N}&REMARK=${event.data.REMARK}`;
        var tValObj = {
            key: "4-11",
            label: "Shipment Info",
            icon: "pi pi-fw pi-user-edit",
            url1: "S043401_SHIPMENT_INFO",
        };
        var tArgObj = { ...tValObj };
        tArgObj.url1 = tUrl2;
        var tFuncObj = {};
        tFuncObj.func = "call_url";
        tFuncObj.message = { ...tArgObj };
        window.parent.postMessage(tFuncObj, "*");
    };

    return (
        <div className="af-div-main">
            <div
                className="af-div-first"
                style={{ width: "123rem", height: "6rem" }}
            >
                <span className="af-span-3-0" style={{ width: "17rem" }}>
                    <p className="af-span-p" style={{ width: "7rem" }}>Origin</p>
                    <div className="af-span-div" style={{ width: "9rem" }}>
                        <Dropdown
                            style={{ width: "9rem" }}
                            id="id_ORIGIN_PORT"
                            value={dataQRY_KSV_PO_MRP_ORIGIN_PORT}
                            onChange={(e) =>
                                onDropdownChangeQRY_KSV_PO_MRP_ORIGIN_PORT(
                                    e,
                                    "ORIGIN_PORT",
                                )
                            }
                            options={datasQRY_KSV_PO_MRP_ORIGIN_PORT}
                            optionLabel="CD_NAME"
                            placeholder=""
                            editable
                            filter
                        ></Dropdown>
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "17rem" }}>
                    <p className="af-span-p" style={{ width: "7rem" }}>Destination</p>
                    <div className="af-span-div" style={{ width: "9rem" }}>
                        <Dropdown
                            style={{ width: "9rem" }}
                            id="id_DESTINATION"
                            value={dataQRY_KSV_PO_MRP_DESTINATION}
                            onChange={(e) =>
                                onDropdownChangeQRY_KSV_PO_MRP_DESTINATION(
                                    e,
                                    "DESTINATION",
                                )
                            }
                            options={datasQRY_KSV_PO_MRP_DESTINATION}
                            optionLabel="CD_NAME"
                            placeholder=""
                            editable
                            filter
                        ></Dropdown>
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "17rem" }}>
                    <p className="af-span-p" style={{ width: "7rem" }}>Status</p>
                    <div className="af-span-div" style={{ width: "9rem" }}>
                        <Dropdown
                            style={{ width: "9rem" }}
                            id="id_STATUS_CD"
                            value={dataQRY_KSV_PO_MRP_STATUS_CD}
                            onChange={(e) =>
                                onDropdownChangeQRY_KSV_PO_MRP_STATUS_CD(
                                    e,
                                    "STATUS_CD",
                                )
                            }
                            options={datasQRY_KSV_PO_MRP_STATUS_CD}
                            optionLabel="CD_NAME"
                            placeholder=""
                            editable
                            filter
                        ></Dropdown>
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "17rem" }}>
                    <p className="af-span-p" style={{ width: "7rem" }}>Ship Mode</p>
                    <div className="af-span-div" style={{ width: "9rem" }}>
                        <Dropdown
                            style={{ width: "9rem" }}
                            id="id_SHIP_MODE"
                            value={dataQRY_KSV_PO_MRP_SHIP_MODE}
                            onChange={(e) =>
                                onDropdownChangeQRY_KSV_PO_MRP_SHIP_MODE(
                                    e,
                                    "SHIP_MODE",
                                )
                            }
                            options={datasQRY_KSV_PO_MRP_SHIP_MODE}
                            optionLabel="CD_NAME"
                            placeholder=""
                            editable
                            filter
                        ></Dropdown>
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "37rem" }}>
                    <p className="af-span-p" style={{ width: "7rem" }}>BL#</p>
                    <div className="af-span-div" style={{ width: "9rem" }}>
                        <InputText
                            style={{ width: "9rem" }}
                            id="id_BL_FILE"
                            value={dataQRY_KSV_PO_MRP.BL_NO}
                            onChange={(e) =>
                                onInputChangeQRY_KSV_PO_MRP_BL_NO(e, "BL_NO")
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "17rem" }}>
                    <p className="af-span-p" style={{ width: "7rem" }}>Invoice#</p>
                    <div className="af-span-div" style={{ width: "9rem" }}>
                        <InputText
                            style={{ width: "9rem" }}
                            id="id_BL_FILE"
                            value={dataQRY_KSV_PO_MRP.INVOICE_NO}
                            onChange={(e) =>
                                onInputChangeQRY_KSV_PO_MRP_BL_NO(
                                    e,
                                    "INVOICE_NO",
                                )
                            }
                        />
                    </div>
                </span>

                <span className="af-span-3" style={{ width: "17rem" }}>
                    <p className="af-span-p" style={{ width: "7rem" }}>ETA</p>
                    <div className="af-span-div" style={{ width: "9rem" }}>
                        <Calendar
                            showButtonBar
                            style={{ width: "9rem" }}
                            dateFormat="yy-mm-dd"
                            id="id_ETA"
                            value={changeDateVal(dataQRY_KSV_PO_MRP.S_ETA)}
                            onChange={(e) =>
                                onCalChangeQRY_KSV_PO_MRP_S_ETA(e, "S_ETA")
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "17rem" }}>
                    <p className="af-span-p" style={{ width: "1rem" }}>~</p>
                    <div className="af-span-div" style={{ width: "9rem" }}>
                        <Calendar
                            showButtonBar
                            style={{ width: "9rem" }}
                            dateFormat="yy-mm-dd"
                            id="id_ETA"
                            value={changeDateVal(dataQRY_KSV_PO_MRP.E_ETA)}
                            onChange={(e) =>
                                onCalChangeQRY_KSV_PO_MRP_E_ETA(e, "E_ETA")
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "17rem" }}>
                    <p className="af-span-p" style={{ width: "7rem" }}>Payer</p>
                    <div className="af-span-div" style={{ width: "9rem" }}>
                        <Dropdown
                            style={{ width: "9rem" }}
                            id="id_PAYER"
                            value={dataQRY_KSV_PO_MRP_PAYER}
                            onChange={(e) =>
                                onDropdownChangeQRY_KSV_PO_MRP_PAYER(e, "PAYER")
                            }
                            options={datasQRY_KSV_PO_MRP_PAYER}
                            optionLabel="CD_NAME"
                            placeholder=""
                        ></Dropdown>
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "17rem" }}>
                    <p className="af-span-p" style={{ width: "7rem" }}>Remark</p>
                    <div className="af-span-div" style={{ width: "9rem" }}>
                        <InputText
                            style={{ width: "9rem" }}
                            id="id_BL_FILE"
                            value={dataQRY_KSV_PO_MRP.REMARK}
                            onChange={(e) =>
                                onInputChangeQRY_KSV_PO_MRP_REMARK(e, "REMARK")
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "7rem" }}>
                    <div className="af-span-div-btn" style={{ width: "6rem" }}>
                        <Tooltip
                            className="menuCodeTooltip"
                            target={`#btnSearch`}
                            content={`Alt+S`}
                            position="bottom"
                        />

                        <Button
                            style={{ width: "6rem" }}
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
                <span className="af-span-3-0" style={{ width: "7rem" }}>
                    <div className="af-span-div-btn" style={{ width: "6rem" }}>
                        <Button
                            style={{ width: "6rem" }}
                            label="Excel"
                            className="p-button-text green"
                            onClick={exportExcelTBL_KSV_PO_MRP}
                        />
                    </div>
                </span>
            </div>

            <div
                className="af-div-first"
                style={{ width: "123rem", height: "48.5rem" }}
            >
                <AFDataTable preventUnrelatedRerender
                    ref={dt_TBL_KSV_PO_MRP}
                    size="small"
                    value={datasTBL_KSV_PO_MRP}
                    tableStyle={{ tableLayout: "fixed" }}
                    loading={loadingTBL_KSV_PO_MRP}
                    showGridlines
                    selectionMode="checkbox"
                    resizableColumns
                    columnResizeMode="fit"
                    selection={selectedTBL_KSV_PO_MRP}
                    onSelectionChange={(e) => {
                        setFlagSelectModeTBL_KSV_PO_MRP(true);
                        setSelectedTBL_KSV_PO_MRP(e.value);
                        console.log(
                            "selected length:" + selectedTBL_KSV_PO_MRP.length,
                        );
                        onRowClick1TBL_KSV_PO_MRP(e.value);
                    }}
                    onRowClick={onRowClickTBL_KSV_PO_MRP}
                    dataKey="id"
                    className="datatable-responsive"
                    onRowDoubleClick={onRowDoubleClickTBL_KSV_PO_MRP}
                    virtualScrollerOptions={{ itemSize: 20 }}
                    emptyMessage=" " //header={headerTBL_KSV_PO_MRP}
                    responsiveLayout="scroll"
                    scrollable
                    scrollHeight="528px"
                >
                    <AFColumn field="STATUS_CD" headerClassName="t-header" header="Status" style={{ width: "4rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="SHIPMENT_CD" headerClassName="t-header" header="Ship#" className="orange" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="ETD" headerClassName="t-header" header="ETD" style={{ width: "6rem", flexBasis: "auto" }} body={(row) => serviceLib.dateFormat(row.ETD)} ></AFColumn>

                    <AFColumn field="SHIP_MODE" headerClassName="t-header" header="Ship.Mode" style={{ width: "6rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="ORIGIN_PORT" headerClassName="t-header" header="Origin" style={{ width: "8rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="DESTINATION" headerClassName="t-header" header="Destination" style={{ width: "6rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="S_WEIGHT" className="text-right" headerClassName="t-header" header="Weight" style={{ width: "6rem", flexBasis: "auto" }} body={(row) => serviceLib.formatNumber(row.S_WEIGHT, 3)} ></AFColumn>
                    <AFColumn field="S_CBM" className="text-right" headerClassName="t-header" header="CBM" style={{ width: "6rem", flexBasis: "auto" }} body={(row) => serviceLib.formatNumber(row.S_CBM, 3)} ></AFColumn>
                    <AFColumn field="BL_NO" headerClassName="t-header" header="BL#" style={{ width: "8rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="INVOICE_NO" headerClassName="t-header" header="Invoice#" style={{ width: "8rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="ETA" headerClassName="t-header" header="ETA" style={{ width: "6rem", flexBasis: "auto" }} body={(row) => serviceLib.dateFormat(row.ETA)} ></AFColumn>
                    <AFColumn field="SHIPPING_COST_CURR" headerClassName="t-header" header="Curr" style={{ width: "3rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="SHIPPING_COST" className="text-right" headerClassName="t-header" header="Cost" style={{ width: "6rem", flexBasis: "auto" }} body={(row) => serviceLib.formatNumber(row.SHIPPING_COST, 4) } ></AFColumn>
                    <AFColumn field="SHIPPING_COST_PAID" headerClassName="t-header" header="Pay" style={{ width: "6rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="IMPORT_COST_CURR" headerClassName="t-header" header="Curr(Import)" style={{ width: "3rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="IMPORT_COST" className="text-right" headerClassName="t-header" header="Import Cost" style={{ width: "6rem", flexBasis: "auto" }} body={(row) => serviceLib.formatNumber(row.IMPORT_COST, 4) } ></AFColumn>
                    <AFColumn field="IMPORT_COST_PAID" headerClassName="t-header" header="Pay(Import)" style={{ width: "6rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="DUTY_COST" className="text-right" headerClassName="t-header" header="Duty Cost" style={{ width: "6rem", flexBasis: "auto" }} body={(row) => serviceLib.formatNumber(row.DUTY_COST, 4) } ></AFColumn>
                </AFDataTable>
            </div>

            <div
                className="af-div-first"
                style={{ width: "123rem", height: "6rem" }}
            >
                <span className="af-span-3-0" style={{ width: "17rem" }}>
                    <p className="af-span-p" style={{ width: "7rem" }}>Curr</p>
                    <div className="af-span-div" style={{ width: "9rem" }}>
                        <Dropdown
                            style={{ width: "7rem" }}
                            id="id_SHIP_MODE"
                            value={dataEDT_KSV_PO_MRP_CURR_CD}
                            onChange={(e) =>
                                onDropdownChangeEDT_KSV_PO_MRP_CURR_CD(
                                    e,
                                    "CURR_CD",
                                )
                            }
                            options={datasEDT_KSV_PO_MRP_CURR_CD}
                            optionLabel="CD_NAME"
                            placeholder=""
                        ></Dropdown>
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "22rem" }}>
                    <p className="af-span-p" style={{ width: "12rem" }}>Shipping Cost</p>
                    <div className="af-span-div" style={{ width: "9rem" }}>
                        <InputText
                            style={{ width: "9rem" }}
                            id="id_BL_FILE"
                            value={dataEDT_KSV_PO_MRP.SHIPPING_COST}
                            onChange={(e) =>
                                onInputChangeEDT_KSV_PO_MRP_SHIPPING_COST(
                                    e,
                                    "SHIPPING_COST",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "78rem" }}>
                    <div className="af-span-div-btn" style={{ width: "12rem" }}>
                        <Button
                            style={{ width: "12rem" }}
                            label="Save"
                            className="p-button-text"
                            onClick={process_UPDATE_SHIPPING_COST}
                        />
                    </div>
                    <div className="af-span-div-btn" style={{ width: "12rem" }}>
                        <Button
                            style={{ width: "12rem" }}
                            label="Cancel"
                            className="p-button-text"
                            onClick={process_CANCEL_SHIPPING_COST}
                        />
                    </div>
                </span>

                <span className="af-span-3" style={{ width: "8rem" }}>
                    <p className="af-span-p" style={{ width: "7rem" }}>Prepaid By:</p>
                </span>
                <span className="af-span-3" style={{ width: "7rem" }}>
                    <p className="af-span-p" style={{ width: "4rem" }}>Shints</p>
                    <div className="af-span-checkbox">
                        <Checkbox
                            id="id_SINGAPORE_COMBINE"
                            checked={changeCheckBoxVal(
                                dataEDT_KSV_PO_MRP.CHK_SHINTS,
                            )}
                            onChange={(e) =>
                                onCheckboxChangeEDT_KSV_PO_MRP_CHK_SHINTS(
                                    e,
                                    "CHK_SHINTS",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "7rem" }}>
                    <p className="af-span-p" style={{ width: "4rem" }}>BVT</p>
                    <div className="af-span-checkbox">
                        <Checkbox
                            id="id_SINGAPORE_COMBINE"
                            checked={changeCheckBoxVal(
                                dataEDT_KSV_PO_MRP.CHK_BVT,
                            )}
                            onChange={(e) =>
                                onCheckboxChangeEDT_KSV_PO_MRP_CHK_BVT(
                                    e,
                                    "CHK_BVT",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "7rem" }}>
                    <p className="af-span-p" style={{ width: "4rem" }}>ETP</p>
                    <div className="af-span-checkbox">
                        <Checkbox
                            id="id_SINGAPORE_COMBINE"
                            checked={changeCheckBoxVal(
                                dataEDT_KSV_PO_MRP.CHK_ETP,
                            )}
                            onChange={(e) =>
                                onCheckboxChangeEDT_KSV_PO_MRP_CHK_ETP(
                                    e,
                                    "CHK_ETP",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "7rem" }}>
                    <p className="af-span-p" style={{ width: "4rem" }}>Other</p>
                    <div className="af-span-checkbox">
                        <Checkbox
                            id="id_SINGAPORE_COMBINE"
                            checked={changeCheckBoxVal(
                                dataEDT_KSV_PO_MRP.CHK_OTHER,
                            )}
                            onChange={(e) =>
                                onCheckboxChangeEDT_KSV_PO_MRP_CHK_OTHER(
                                    e,
                                    "CHK_OTHER",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "14rem" }}>
                    <div className="af-span-div" style={{ width: "13rem" }}>
                        <InputText
                            disabled={
                                dataEDT_KSV_PO_MRP_SHIPPING_COST_PAID_DISABLED
                            }
                            style={{ width: "13rem" }}
                            id="id_BL_FILE"
                            value={dataEDT_KSV_PO_MRP.SHIPPING_COST_PAID}
                            onChange={(e) =>
                                onInputChangeEDT_KSV_PO_MRP_SHIPPING_COST_PAID(
                                    e,
                                    "SHIPPING_COST_PAID",
                                )
                            }
                        />
                    </div>
                </span>
            </div>

            <Toast ref={toast} />

            <Dialog
                visible={createDialog}
                position="top-right"
                style={{ width: "98vw" }}
                header=""
                modal={true}
                className="p-fluid"
                onHide={hideDialog}
            ></Dialog>
        </div>
    );
};

const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(S0435_SHIPPING_COST, comparisonFn);
