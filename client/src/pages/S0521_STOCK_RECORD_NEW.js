/* eslint-disable */
import React, { useState, useEffect, useRef } from "react";
import moment from "moment";
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
import { ServiceS0521_STOCK_RECORD_NEW } from "../service/service_biz/ServiceS0521_STOCK_RECORD_NEW";

import "./page_common.scss";

const emptyKCD_CODE = {
    id: 0,
    CD_GROUP: "",
    CD_CODE: "",
    CD_NAME: "",
    CD_FLAG: "",
};

const emptyQRY_KSV_PO_MRP = {
    S_OUT_DATE: "",
    E_OUT_DATE: "",
    BUYER_CD: "",
    PO_CD: "",
    ORDER_CD: "",
    MATL_CD: "",
    MATL_NAME: "",
    COLOR: "",
    SPEC: "",
    IS_NEW: "",
    FACTORY_CD: "",
    IS_OUT_DATE_ENABLED: true,
};

const emptyQRY_KSV_PO_MRP1 = {
    BUYER_CD: "",
    PO_CD: "",
    VENDOR_CD: "",
    MRP_DATE: "",
};

const emptyTBL_KSV_PO_MRP = {
    id: 0,
    OP_KIND: "",
    BUYER_NAME: "",
    BUYER_CD: "",
    PO_CD: "",
    SUPPLIER: "",
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
    STOCK_DATE: "",
    CHARGER: "",
    OWNER_SHIP: "",
    REASON_MAKE: "",
    AUTHORITY: "",
    CONDITION: "",
    MANAGER: "",
    REMARK: "",
    PURPOSE: "",
    FACTORY_NAME: "",
    FACTORY_CD: "",
};

const S0521_STOCK_RECORD_NEW = () => {
    const serviceLibRef = useRef(null);
    if (!serviceLibRef.current) {
        serviceLibRef.current = new ServiceLib();
        serviceLibRef.current.loginConfirm();
    }
    const serviceLib = serviceLibRef.current;
    const serviceS0521_STOCK_RECORD_NEWRef = useRef(null);
    if (!serviceS0521_STOCK_RECORD_NEWRef.current) serviceS0521_STOCK_RECORD_NEWRef.current = new ServiceS0521_STOCK_RECORD_NEW();
    const serviceS0521_STOCK_RECORD_NEW = serviceS0521_STOCK_RECORD_NEWRef.current;

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

    const getDefaultOutDateRange = (queryData) => {
        // If OUT_DATE filter is not enabled, clear the dates (server will apply 3-year range)
        if (!queryData.IS_OUT_DATE_ENABLED) {
            return {
                ...queryData,
                S_OUT_DATE: "",
                E_OUT_DATE: "",
            };
        }

        const eOutDate = queryData.E_OUT_DATE || moment().format("YYYYMMDD");
        const sOutDate =
            queryData.S_OUT_DATE ||
            moment(eOutDate, "YYYYMMDD").subtract(1, "year").format("YYYYMMDD");

        return {
            ...queryData,
            S_OUT_DATE: sOutDate,
            E_OUT_DATE: eOutDate,
        };
    };

    // Search KSV_STOCK_MEM
    const search_LIST_1 = () => {
        var tInObj = getDefaultOutDateRange(dataQRY_KSV_PO_MRP);

        if (tInObj.IS_NEW === "1") {
            const hasNewStockFilter = [
                tInObj.MATL_NAME,
                tInObj.MATL_CD,
                tInObj.COLOR,
                tInObj.SPEC,
            ].some((value) => String(value || "").trim() !== "");

            if (!hasNewStockFilter) {
                alert(
                    "New Stock 조회 시 Description, Matl#, Color, Spec 중 하나는 반드시 입력해주세요.<br><br>When New Stock is checked, at least one of Description, Matl#, Color, or Spec is required.",
                );
                return;
            }
        }

        if (
            tInObj.S_OUT_DATE !== dataQRY_KSV_PO_MRP.S_OUT_DATE ||
            tInObj.E_OUT_DATE !== dataQRY_KSV_PO_MRP.E_OUT_DATE ||
            tInObj.IS_OUT_DATE_ENABLED !== dataQRY_KSV_PO_MRP.IS_OUT_DATE_ENABLED
        ) {
            setDataQRY_KSV_PO_MRP(tInObj);
        }

        setLoadingTBL_KSV_PO_MRP(true);
        // 2

        console.log(tInObj);
        serviceS0521_STOCK_RECORD_NEW.mgrQuery_LIST_1(tInObj).then((data) => {
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

    const process_STOCK_MOVE = () => {
        if (selectedTBL_KSV_PO_MRP.length <= 0) {
            return;
        }

        console.log(dataEDT_KSV_PO_MRP);
        if (
            !dataEDT_KSV_PO_MRP.AUTHORITY ||
            !dataEDT_KSV_PO_MRP.CONDITION ||
            !dataEDT_KSV_PO_MRP.MANAGER ||
            !dataEDT_KSV_PO_MRP.REMARK
        ) {
            alert("필수값을 확인해주세요.<br><br>Please check the required values.");
            return;
        }

        var _tObj0 = { ...selectedTBL_KSV_PO_MRP[0] };

        var tInput = { ...dataEDT_KSV_PO_MRP };
        tInput.STOCK_IDX = _tObj0.STOCK_IDX;
        tInput.IS_NEW = dataQRY_KSV_PO_MRP.IS_NEW;

        var tInput1 = [...datasTBL_KSV_PO_MRP2];
        var tLostFlag = 0;
        var tContinueFlag = 0;
        tInput1.forEach(async (col, i) => {
            if (col.SEQ === "LOST") {
                if (parseFloat(col.QTY) > 0) {
                    tLostFlag = 1;
                    var tRet = await confirm(
                        "Lost 수량이 있습니다. Lost처리하는것이 맞습니까?<br><br>There is a Lost quantity. Do you want to proceed with Lost processing?",
                    );
                    if (tRet) {
                        process_STOCK_MOVE_SUB();
                        return;
                    } else {
                        return;
                    }
                }
            }
        });
        if (tLostFlag === 0) process_STOCK_MOVE_SUB();
    };

    const process_STOCK_MOVE_SUB = () => {
        if (selectedTBL_KSV_PO_MRP.length <= 0) {
            return;
        }

        var _tObj0 = { ...selectedTBL_KSV_PO_MRP[0] };

        var tInput = { ...dataEDT_KSV_PO_MRP };
        tInput.STOCK_IDX = _tObj0.STOCK_IDX;
        tInput.IS_NEW = dataQRY_KSV_PO_MRP.IS_NEW;

        var tInput1 = [...datasTBL_KSV_PO_MRP2];
        var tInput2 = { ..._tObj0 };
        delete tInput2.id;
        delete tInput2.__typename;

        setLoadingTBL_KSV_PO_MRP(true);

        console.log(tInput1);

        serviceS0521_STOCK_RECORD_NEW
            .mgrInsert_STOCK_MOVE(tInput, tInput1, tInput2)
            .then((data) => {
                setLoadingTBL_KSV_PO_MRP(false);
                if (typeof data.graphQLErrors === "undefined") {
                    if (data.length > 0) {
                        alert(data[0].CODE);
                        if (data[0].CODE.includes("SUCC")) {
                            setSelectedTBL_KSV_PO_MRP([]);
                            resetEDT_KSV_PO_MRP();

                            setSelectedTBL_KSV_PO_MRP2([]);
                            setDatasTBL_KSV_PO_MRP2([]);

                            if (dataQRY_KSV_PO_MRP.IS_NEW !== "1")
                                search_LIST_1();
                            // search_LIST_2();
                        }
                    }
                } else {
                    // console.log("mgrQuery_PO_CD error => " + JSON.stringify(data.graphQLErrors));
                    toast.current.show({
                        severity: "success",
                        summary: "Fail:Stock_in",
                        detail: "",
                        life: 3000,
                    });
                }
            });
    };

    /* QRY KSV_PO_MRP*/
    const [dataQRY_KSV_PO_MRP, setDataQRY_KSV_PO_MRP] =
        useState(emptyQRY_KSV_PO_MRP);

    const onCalChangeQRY_KSV_PO_MRP_S_OUT_DATE = (e, name) => {
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
    const onCalChangeQRY_KSV_PO_MRP_E_OUT_DATE = (e, name) => {
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

    const onCheckboxChangeOutDateEnabled = (e) => {
        let _dataQRY_KSV_PO_MRP = { ...dataQRY_KSV_PO_MRP };
        _dataQRY_KSV_PO_MRP.IS_OUT_DATE_ENABLED = e.checked;
        // When enabling, set default dates to 1 year
        if (e.checked) {
            const eOutDate = _dataQRY_KSV_PO_MRP.E_OUT_DATE || moment().format("YYYYMMDD");
            const sOutDate =
                _dataQRY_KSV_PO_MRP.S_OUT_DATE ||
                moment(eOutDate, "YYYYMMDD").subtract(1, "year").format("YYYYMMDD");
            _dataQRY_KSV_PO_MRP.S_OUT_DATE = sOutDate;
            _dataQRY_KSV_PO_MRP.E_OUT_DATE = eOutDate;
        } else {
            // When disabling, clear dates (server will apply 3-year range)
            _dataQRY_KSV_PO_MRP.S_OUT_DATE = "";
            _dataQRY_KSV_PO_MRP.E_OUT_DATE = "";
        }
        setDataQRY_KSV_PO_MRP(_dataQRY_KSV_PO_MRP);
    };

    const [datasQRY_KSV_PO_MRP_BUYER_CD, setDatasQRY_KSV_PO_MRP_BUYER_CD] =
        useState([]);
    const [dataQRY_KSV_PO_MRP_BUYER_CD, setDataQRY_KSV_PO_MRP_BUYER_CD] =
        useState({});

    const onDropdownChangeQRY_KSV_PO_MRP_BUYER_CD = (e, name) => {
        let val = (e.value && e.value.BUYER_CD) || "";

        let _dataQRY_KSV_PO_MRP = { ...dataQRY_KSV_PO_MRP };

        let tTypeVal = _dataQRY_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_PO_MRP[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_PO_MRP[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_PO_MRP(_dataQRY_KSV_PO_MRP);
        setDataQRY_KSV_PO_MRP_BUYER_CD(e.value);
    };

    const [datasQRY_KSV_PO_MRP_PO_CD, setDatasQRY_KSV_PO_MRP_PO_CD] = useState(
        [],
    );
    const [dataQRY_KSV_PO_MRP_PO_CD, setDataQRY_KSV_PO_MRP_PO_CD] = useState(
        {},
    );

    const onInputChangeQRY_KSV_PO_MRP_PO_CD = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_PO_MRP = { ...dataQRY_KSV_PO_MRP };

        let tTypeVal = _dataQRY_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string") _dataQRY_KSV_PO_MRP[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_PO_MRP[`${name}`] = parseInt(val);

        setDataQRY_KSV_PO_MRP(_dataQRY_KSV_PO_MRP);
    };

    const onInputChangeQRY_KSV_PO_MRP_ORDER_CD = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_PO_MRP = { ...dataQRY_KSV_PO_MRP };

        let tTypeVal = _dataQRY_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string") _dataQRY_KSV_PO_MRP[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_PO_MRP[`${name}`] = parseInt(val);

        setDataQRY_KSV_PO_MRP(_dataQRY_KSV_PO_MRP);
    };

    const [datasQRY_KSV_PO_MRP_ORDER_CD, setDatasQRY_KSV_PO_MRP_ORDER_CD] =
        useState([]);
    const [dataQRY_KSV_PO_MRP_ORDER_CD, setDataQRY_KSV_PO_MRP_ORDER_CD] =
        useState({});

    const onInputChangeQRY_KSV_PO_MRP_MATL_CD = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_PO_MRP = { ...dataQRY_KSV_PO_MRP };

        let tTypeVal = _dataQRY_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string") _dataQRY_KSV_PO_MRP[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_PO_MRP[`${name}`] = parseInt(val);

        setDataQRY_KSV_PO_MRP(_dataQRY_KSV_PO_MRP);
    };

    const onInputChangeQRY_KSV_PO_MRP_MATL_NAME = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_PO_MRP = { ...dataQRY_KSV_PO_MRP };

        let tTypeVal = _dataQRY_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string") _dataQRY_KSV_PO_MRP[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_PO_MRP[`${name}`] = parseInt(val);

        setDataQRY_KSV_PO_MRP(_dataQRY_KSV_PO_MRP);
    };

    const onInputChangeQRY_KSV_PO_MRP_SPEC = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_PO_MRP = { ...dataQRY_KSV_PO_MRP };

        let tTypeVal = _dataQRY_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string") _dataQRY_KSV_PO_MRP[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_PO_MRP[`${name}`] = parseInt(val);

        setDataQRY_KSV_PO_MRP(_dataQRY_KSV_PO_MRP);
    };

    const onCheckboxChangeQRY_KSV_PO_MRP_IS_NEW = (e, name) => {
        let val = "";
        let _dataQRY_KSV_PO_MRP = { ...dataQRY_KSV_PO_MRP };
        if (e.checked) {
            val = "1";
        } else {
            val = "0";
        }
        _dataQRY_KSV_PO_MRP[`${name}`] = val;
        setDataQRY_KSV_PO_MRP(_dataQRY_KSV_PO_MRP);
    };

    /* QRY KSV_PO_MRP*/
    const [dataQRY_KSV_PO_MRP1, setDataQRY_KSV_PO_MRP1] =
        useState(emptyQRY_KSV_PO_MRP1);

    const [datasQRY_KSV_PO_MRP1_BUYER_CD, setDatasQRY_KSV_PO_MRP1_BUYER_CD] =
        useState([]);
    const [dataQRY_KSV_PO_MRP1_BUYER_CD, setDataQRY_KSV_PO_MRP1_BUYER_CD] =
        useState({});

    const [datasQRY_KSV_PO_MRP1_PO_CD, setDatasQRY_KSV_PO_MRP1_PO_CD] =
        useState([]);
    const [dataQRY_KSV_PO_MRP1_PO_CD, setDataQRY_KSV_PO_MRP1_PO_CD] = useState(
        {},
    );

    const [datasQRY_KSV_PO_MRP1_PU_STATUS, setDatasQRY_KSV_PO_MRP1_PU_STATUS] =
        useState([]);
    const [dataQRY_KSV_PO_MRP1_PU_STATUS, setDataQRY_KSV_PO_MRP1_PU_STATUS] =
        useState({});

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
            argData = argData0[0];
        } else {
            argData = argData0;
        }

        let argTBL_KSV_PO_MRP = argData;

        setDataTBL_KSV_PO_MRP(argTBL_KSV_PO_MRP);

        var tObj = { ...dataEDT_KSV_PO_MRP };
        tObj.STOCK_DATE = argData.STOCK_DATE;
        tObj.CHARGER = argData.CHARGER;
        tObj.OWNER_SHIP = argData.OWNER_SHIP;
        tObj.REASON_MAKE = argData.REASON_MAKE;
        tObj.AUTHORITY = argData.AUTHORITY;
        tObj.CONDITION = argData.CONDITION;
        tObj.MANAGER = argData.MANAGER;
        tObj.REMARK = argData.REASON_REMARK;
        tObj.PURPOSE = argData.PURPOSE;
        setDataEDT_KSV_PO_MRP(tObj);

        console.log(argData);

        editEDT_KSV_PO_MRP_OWNER_SHIP(tObj.OWNER_SHIP);
        editEDT_KSV_PO_MRP_REASON_MAKE(tObj.REASON_MAKE);
        editEDT_KSV_PO_MRP_AUTHORITY(tObj.AUTHORITY);
        editEDT_KSV_PO_MRP_CONDITION(tObj.CONDITION);
        editEDT_KSV_PO_MRP_MANAGER(tObj.MANAGER);
        editEDT_KSV_PO_MRP_REMARK(tObj.REMARK);
        editEDT_KSV_PO_MRP_PURPOSE(tObj.PURPOSE);

        var tRetArray = [];

        var tArray = [
            "1",
            "2",
            "3",
            "4",
            "5",
            "6",
            "7",
            "8",
            "9",
            "10",
            "LOST",
        ];
        tArray.forEach((col, i) => {
            var tObj = {};
            tObj.SEQ = col;
            if (col === "LOST") {
                tObj.QTY = parseFloat(argData.STOCK_QTY);
                // if (dataQRY_KSV_PO_MRP.IS_NEW === "1") tObj.QTY = 0;
            } else tObj.QTY = 0;
            tObj.LOCATION = "";
            tRetArray.push(tObj);
        });

        setDatasTBL_KSV_PO_MRP2(tRetArray);

        // search_LIST_2(argData);
        // resetEDT_KSV_PO_MRP(argData);
    };

    const onRowClickTBL_KSV_PO_MRP = (event) => {
        let argTBL_KSV_PO_MRP = event.data;
        if (flagSelectModeTBL_KSV_PO_MRP) return;

        // Service : NawooAll:mgrQueryTBL_KSV_PO_MRP
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

    const onRowClick1TBL_KSV_PO_MRP2 = (argData0) => {
        var argData = {};

        if (typeof argData0.length !== "undefined") {
            argData = argData0[0];
        } else {
            argData = argData0;
        }

        let argTBL_KSV_PO_MRP2 = argData;

        setDataTBL_KSV_PO_MRP2(argTBL_KSV_PO_MRP2);
    };

    const onRowClickTBL_KSV_PO_MRP2 = (event) => {
        let argTBL_KSV_PO_MRP2 = event.data;
        if (flagSelectModeTBL_KSV_PO_MRP2) return;

        // Service : NawooAll:mgrQueryTBL_KSV_PO_MRP2
    };

    /* QRY KSV_PO_MRP*/
    const [dataEDT_KSV_PO_MRP, setDataEDT_KSV_PO_MRP] =
        useState(emptyEDT_KSV_PO_MRP);

    const resetEDT_KSV_PO_MRP = (argData) => {
        var tObj = { ...emptyEDT_KSV_PO_MRP };
        setDataEDT_KSV_PO_MRP(tObj);
        editEDT_KSV_PO_MRP_OWNER_SHIP("");
        editEDT_KSV_PO_MRP_REASON_MAKE("");
        editEDT_KSV_PO_MRP_AUTHORITY("");
        editEDT_KSV_PO_MRP_CONDITION("");
        editEDT_KSV_PO_MRP_MANAGER("");
        editEDT_KSV_PO_MRP_REMARK("");
        editEDT_KSV_PO_MRP_PURPOSE("");
    };

    const onInputChangeEDT_KSV_PO_MRP_STOCK_DATE = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_PO_MRP = { ...dataEDT_KSV_PO_MRP };

        let tTypeVal = _dataEDT_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string") _dataEDT_KSV_PO_MRP[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_PO_MRP[`${name}`] = parseInt(val);

        setDataEDT_KSV_PO_MRP(_dataEDT_KSV_PO_MRP);
    };

    const onInputChangeEDT_KSV_PO_MRP_CHARGER = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_PO_MRP = { ...dataEDT_KSV_PO_MRP };

        let tTypeVal = _dataEDT_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string") _dataEDT_KSV_PO_MRP[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_PO_MRP[`${name}`] = parseInt(val);

        setDataEDT_KSV_PO_MRP(_dataEDT_KSV_PO_MRP);
    };

    const [datasEDT_KSV_PO_MRP_OWNER_SHIP, setDatasEDT_KSV_PO_MRP_OWNER_SHIP] =
        useState([]);
    const [dataEDT_KSV_PO_MRP_OWNER_SHIP, setDataEDT_KSV_PO_MRP_OWNER_SHIP] =
        useState({});

    const editEDT_KSV_PO_MRP_OWNER_SHIP = (argValue) => {
        let _dataEDT_KSV_PO_MRP_OWNER_SHIP =
            datasEDT_KSV_PO_MRP_OWNER_SHIP.filter(
                (val) => val.CD_CODE === argValue,
            );
        setDataEDT_KSV_PO_MRP_OWNER_SHIP(_dataEDT_KSV_PO_MRP_OWNER_SHIP[0]);
    };

    const onDropdownChangeEDT_KSV_PO_MRP_OWNER_SHIP = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataEDT_KSV_PO_MRP = { ...dataEDT_KSV_PO_MRP };

        let tTypeVal = _dataEDT_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_KSV_PO_MRP[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_KSV_PO_MRP[`${name}`] = parseInt(val);
        }

        setDataEDT_KSV_PO_MRP(_dataEDT_KSV_PO_MRP);
        setDataEDT_KSV_PO_MRP_OWNER_SHIP(e.value);
    };

    const [
        datasEDT_KSV_PO_MRP_REASON_MAKE,
        setDatasEDT_KSV_PO_MRP_REASON_MAKE,
    ] = useState([]);
    const [dataEDT_KSV_PO_MRP_REASON_MAKE, setDataEDT_KSV_PO_MRP_REASON_MAKE] =
        useState({});

    const editEDT_KSV_PO_MRP_REASON_MAKE = (argValue) => {
        let _dataEDT_KSV_PO_MRP_REASON_MAKE =
            datasEDT_KSV_PO_MRP_REASON_MAKE.filter(
                (val) => val.CD_CODE === argValue,
            );
        setDataEDT_KSV_PO_MRP_REASON_MAKE(_dataEDT_KSV_PO_MRP_REASON_MAKE[0]);
    };

    const onDropdownChangeEDT_KSV_PO_MRP_REASON_MAKE = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataEDT_KSV_PO_MRP = { ...dataEDT_KSV_PO_MRP };

        let tTypeVal = _dataEDT_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_KSV_PO_MRP[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_KSV_PO_MRP[`${name}`] = parseInt(val);
        }

        setDataEDT_KSV_PO_MRP(_dataEDT_KSV_PO_MRP);
        setDataEDT_KSV_PO_MRP_REASON_MAKE(e.value);
    };

    const [datasEDT_KSV_PO_MRP_AUTHORITY, setDatasEDT_KSV_PO_MRP_AUTHORITY] =
        useState([]);
    const [dataEDT_KSV_PO_MRP_AUTHORITY, setDataEDT_KSV_PO_MRP_AUTHORITY] =
        useState({});

    const editEDT_KSV_PO_MRP_AUTHORITY = (argValue) => {
        let _dataEDT_KSV_PO_MRP_AUTHORITY =
            datasEDT_KSV_PO_MRP_AUTHORITY.filter(
                (val) => val.CD_CODE === argValue,
            );
        setDataEDT_KSV_PO_MRP_AUTHORITY(_dataEDT_KSV_PO_MRP_AUTHORITY[0]);
    };

    const onDropdownChangeEDT_KSV_PO_MRP_AUTHORITY = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataEDT_KSV_PO_MRP = { ...dataEDT_KSV_PO_MRP };

        let tTypeVal = _dataEDT_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_KSV_PO_MRP[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_KSV_PO_MRP[`${name}`] = parseInt(val);
        }

        setDataEDT_KSV_PO_MRP(_dataEDT_KSV_PO_MRP);
        setDataEDT_KSV_PO_MRP_AUTHORITY(e.value);
    };

    const [datasEDT_KSV_PO_MRP_CONDITION, setDatasEDT_KSV_PO_MRP_CONDITION] =
        useState([]);
    const [dataEDT_KSV_PO_MRP_CONDITION, setDataEDT_KSV_PO_MRP_CONDITION] =
        useState({});

    const editEDT_KSV_PO_MRP_CONDITION = (argValue) => {
        let _dataEDT_KSV_PO_MRP_CONDITION =
            datasEDT_KSV_PO_MRP_CONDITION.filter(
                (val) => val.CD_CODE === argValue,
            );
        setDataEDT_KSV_PO_MRP_CONDITION(_dataEDT_KSV_PO_MRP_CONDITION[0]);
    };

    const onDropdownChangeEDT_KSV_PO_MRP_CONDITION = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataEDT_KSV_PO_MRP = { ...dataEDT_KSV_PO_MRP };

        let tTypeVal = _dataEDT_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_KSV_PO_MRP[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_KSV_PO_MRP[`${name}`] = parseInt(val);
        }

        setDataEDT_KSV_PO_MRP(_dataEDT_KSV_PO_MRP);
        setDataEDT_KSV_PO_MRP_CONDITION(e.value);
    };

    const [datasEDT_KSV_PO_MRP_MANAGER, setDatasEDT_KSV_PO_MRP_MANAGER] =
        useState([]);
    const [dataEDT_KSV_PO_MRP_MANAGER, setDataEDT_KSV_PO_MRP_MANAGER] =
        useState({});

    const editEDT_KSV_PO_MRP_MANAGER = (argValue) => {
        let _dataEDT_KSV_PO_MRP_MANAGER = datasEDT_KSV_PO_MRP_MANAGER.filter(
            (val) => val.CD_CODE === argValue,
        );
        setDataEDT_KSV_PO_MRP_MANAGER(_dataEDT_KSV_PO_MRP_MANAGER[0]);
    };

    const onDropdownChangeEDT_KSV_PO_MRP_MANAGER = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataEDT_KSV_PO_MRP = { ...dataEDT_KSV_PO_MRP };

        let tTypeVal = _dataEDT_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_KSV_PO_MRP[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_KSV_PO_MRP[`${name}`] = parseInt(val);
        }

        setDataEDT_KSV_PO_MRP(_dataEDT_KSV_PO_MRP);
        setDataEDT_KSV_PO_MRP_MANAGER(e.value);
    };

    const [datasEDT_KSV_PO_MRP_REMARK, setDatasEDT_KSV_PO_MRP_REMARK] =
        useState([]);
    const [dataEDT_KSV_PO_MRP_REMARK, setDataEDT_KSV_PO_MRP_REMARK] = useState(
        {},
    );

    const editEDT_KSV_PO_MRP_REMARK = (argValue) => {
        let _dataEDT_KSV_PO_MRP_REMARK = datasEDT_KSV_PO_MRP_REMARK.filter(
            (val) => val.CD_CODE === argValue,
        );
        setDataEDT_KSV_PO_MRP_REMARK(_dataEDT_KSV_PO_MRP_REMARK[0]);
    };

    const onDropdownChangeEDT_KSV_PO_MRP_REMARK = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataEDT_KSV_PO_MRP = { ...dataEDT_KSV_PO_MRP };

        let tTypeVal = _dataEDT_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_KSV_PO_MRP[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_KSV_PO_MRP[`${name}`] = parseInt(val);
        }

        setDataEDT_KSV_PO_MRP(_dataEDT_KSV_PO_MRP);
        setDataEDT_KSV_PO_MRP_REMARK(e.value);
    };

    const [datasEDT_KSV_PO_MRP_PURPOSE, setDatasEDT_KSV_PO_MRP_PURPOSE] =
        useState([]);
    const [dataEDT_KSV_PO_MRP_PURPOSE, setDataEDT_KSV_PO_MRP_PURPOSE] =
        useState({});

    const editEDT_KSV_PO_MRP_PURPOSE = (argValue) => {
        let _dataEDT_KSV_PO_MRP_PURPOSE = datasEDT_KSV_PO_MRP_PURPOSE.filter(
            (val) => val.CD_CODE === argValue,
        );
        setDataEDT_KSV_PO_MRP_PURPOSE(_dataEDT_KSV_PO_MRP_PURPOSE[0]);
    };

    const onDropdownChangeEDT_KSV_PO_MRP_PURPOSE = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataEDT_KSV_PO_MRP = { ...dataEDT_KSV_PO_MRP };

        let tTypeVal = _dataEDT_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_KSV_PO_MRP[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_KSV_PO_MRP[`${name}`] = parseInt(val);
        }

        setDataEDT_KSV_PO_MRP(_dataEDT_KSV_PO_MRP);
        setDataEDT_KSV_PO_MRP_PURPOSE(e.value);
    };

    useEffect(() => {
        var tObj = {};
        serviceS0521_STOCK_RECORD_NEW.mgrQuery_CODE(tObj).then((data) => {
            console.log(data);
            if (typeof data.graphQLErrors === "undefined") {
                setDatasQRY_KSV_PO_MRP_BUYER_CD(data.BUYER_CD);
                setDataQRY_KSV_PO_MRP_BUYER_CD(data.BUYER_CD[0]);

                setDatasQRY_KSV_PO_MRP_PO_CD(data.PO_CD);
                setDataQRY_KSV_PO_MRP_PO_CD(data.PO_CD[0]);

                setDatasQRY_KSV_PO_MRP_ORDER_CD(data.ORDER_CD);
                setDataQRY_KSV_PO_MRP_ORDER_CD(data.ORDER_CD[0]);

                setDatasEDT_KSV_PO_MRP_OWNER_SHIP(data.OWNER_SHIP);
                setDataEDT_KSV_PO_MRP_OWNER_SHIP(data.OWNER_SHIP[0]);

                setDatasEDT_KSV_PO_MRP_REASON_MAKE(data.REASON_MAKE);
                setDataEDT_KSV_PO_MRP_REASON_MAKE(data.REASON_MAKE[0]);

                setDatasEDT_KSV_PO_MRP_AUTHORITY(data.AUTHORITY);
                setDataEDT_KSV_PO_MRP_AUTHORITY(data.AUTHORITY[2]);

                setDatasEDT_KSV_PO_MRP_CONDITION(data.CONDITION);
                setDataEDT_KSV_PO_MRP_CONDITION(data.CONDITION[3]);

                setDatasEDT_KSV_PO_MRP_MANAGER(data.MANAGER);
                setDataEDT_KSV_PO_MRP_MANAGER(data.MANAGER[2]);

                setDatasEDT_KSV_PO_MRP_REMARK(data.REMARK);
                setDataEDT_KSV_PO_MRP_REMARK(data.REMARK[0]);

                setDatasEDT_KSV_PO_MRP_PURPOSE(data.PURPOSE);
                setDataEDT_KSV_PO_MRP_PURPOSE(data.PURPOSE[0]);

                setDatasQryFactoryCd(data.FACTORY);
                setDataQryFactoryCd(data.FACTORY[0]);

                var tObj0 = getDefaultOutDateRange({ ...dataQRY_KSV_PO_MRP });
                setDataQRY_KSV_PO_MRP(tObj0);
            } else {
                console.log(
                    "mgrQuery_PO_CD error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });

        // search_LIST_1();
        // search_LIST_2();
    }, []);

    const blankFn = () => {};

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

    const onCellEditCompleteKSV_PO_MRP2 = (e) => {
        let { rowData, newValue, value, field, originalEvent: event } = e;
        var tRowData = { ...rowData };
        tRowData[field] = newValue;

        var tArray = [];
        datasTBL_KSV_PO_MRP2.forEach((col, i) => {
            var tObj = { ...col };
            if (tObj.COLOR === tRowData.COLOR) {
                tArray.push(tRowData);
            } else {
                tArray.push(tObj);
            }
        });

        if (field === "QTY") rowData[field] = serviceLib.getFloat(newValue, 2);
        if (field === "LOCATION") rowData[field] = newValue || "";
        if (field === "RACK") rowData[field] = newValue || "";
        if (field === "QTY" && rowData.SEQ === "LOST") return;

        var tSumQty = 0;

        var tOrgObj = { ...dataTBL_KSV_PO_MRP };
        var tOrgQty = isNaN(parseFloat(tOrgObj.STOCK_QTY))
            ? 0
            : parseFloat(tOrgObj.STOCK_QTY);

        if (field === "QTY") {
            var _tObjs = [...datasTBL_KSV_PO_MRP2];
            var _tObjs1 = [...datasTBL_KSV_PO_MRP2];
            var tNewArray = [];

            _tObjs.forEach((col, i) => {
                var tObj0 = { ...col };
                if (col.SEQ === "LOST") {
                    console.log(tSumQty);
                    tObj0.QTY = tOrgQty - tSumQty;
                } else if (col.SEQ === rowData.SEQ) {
                    tSumQty += isNaN(parseFloat(newValue))
                        ? 0
                        : parseFloat(newValue);
                    tObj0.QTY = isNaN(parseFloat(newValue))
                        ? 0
                        : parseFloat(newValue);
                } else {
                    tSumQty += tObj0.QTY;
                }
                tNewArray.push(tObj0);
            });

            setDatasTBL_KSV_PO_MRP2(tNewArray);
        }
    };

    // GUIDE: 에디터 컴포넌트에 onKeyDown 이벤트를 연결한다.
    const onChangeTextEdit = (e, options) => {
        options.editorCallback(e.target.value);
    };

    const handleFocus = (event) => event.target.select();

    const cellEditorKSV_PO_MRP2 = (options) => {
        return textEditor(options);
    };

    const textEditor = (options) => {
        return (
            <InputText
                type="text"
                value={options.value}
                onChange={(e) => onChangeTextEdit(e, options)}
                onFocus={handleFocus}
            />
        );
    };

    const [datasQryFactoryCd, setDatasQryFactoryCd] = useState([]);
    const [dataQryFactoryCd, setDataQryFactoryCd] = useState({});

    const onDropdownChangeQryFactoryCd = (e, name) => {
        setDataQryFactoryCd(e.value);
        setDataQRY_KSV_PO_MRP({
            ...dataQRY_KSV_PO_MRP,
            FACTORY_CD: e.value.FACTORY_CD,
        });
    };

    return (
        <div className="af-div-main">
            <div
                className="af-div-first"
                style={{ width: "123rem", height: "6rem" }}
            >
                <span className="af-span-3" style={{ width: "18rem" }}>
                    <p className="af-span-p" style={{ width: "7rem" }}>Factory</p>
                    <div className="af-span-div" style={{ width: "10rem" }}>
                        <Dropdown
                            style={{ width: "10rem" }}
                            id="id_FACTORY_CD"
                            value={dataQryFactoryCd}
                            onChange={(e) =>
                                onDropdownChangeQryFactoryCd(e, "FACTORY_CD")
                            }
                            options={datasQryFactoryCd}
                            optionLabel="FACTORY_NAME"
                            placeholder=""
                            editable
                        ></Dropdown>
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "28rem" }}>
                    <p className="af-span-p" style={{ width: "7rem" }}>Out Date</p>
                    <div className="af-span-div" style={{ width: "1.5rem" }}>
                        <Checkbox
                            checked={dataQRY_KSV_PO_MRP.IS_OUT_DATE_ENABLED}
                            onChange={onCheckboxChangeOutDateEnabled}
                        />
                    </div>
                    <div className="af-span-div" style={{ width: "8rem" }}>
                        <Calendar
                            showButtonBar
                            style={{ width: "8rem" }}
                            dateFormat="yy-mm-dd"
                            id="id_E_DUE_DATE"
                            disabled={!dataQRY_KSV_PO_MRP.IS_OUT_DATE_ENABLED}
                            value={changeDateVal(dataQRY_KSV_PO_MRP.S_OUT_DATE)}
                            onChange={(e) =>
                                onCalChangeQRY_KSV_PO_MRP_S_OUT_DATE(
                                    e,
                                    "S_OUT_DATE",
                                )
                            }
                        />
                    </div>
                    <p className="af-span-p" style={{ width: "1rem" }}>~</p>
                    <div className="af-span-div" style={{ width: "8rem" }}>
                        <Calendar
                            showButtonBar
                            style={{ width: "8rem" }}
                            dateFormat="yy-mm-dd"
                            id="id_E_DUE_DATE"
                            disabled={!dataQRY_KSV_PO_MRP.IS_OUT_DATE_ENABLED}
                            value={changeDateVal(dataQRY_KSV_PO_MRP.E_OUT_DATE)}
                            onChange={(e) =>
                                onCalChangeQRY_KSV_PO_MRP_E_OUT_DATE(
                                    e,
                                    "E_OUT_DATE",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "14rem" }}>
                    <p className="af-span-p" style={{ width: "4rem" }}>Buyer</p>
                    <div className="af-span-div" style={{ width: "9rem" }}>
                        <Dropdown
                            style={{ width: "9rem" }}
                            id="id_ORIGIN_PORT"
                            value={dataQRY_KSV_PO_MRP_BUYER_CD}
                            onChange={(e) =>
                                onDropdownChangeQRY_KSV_PO_MRP_BUYER_CD(
                                    e,
                                    "BUYER_CD",
                                )
                            }
                            options={datasQRY_KSV_PO_MRP_BUYER_CD}
                            optionLabel="BUYER_NAME"
                            placeholder=""
                            editable
                            filter
                        ></Dropdown>
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "14rem" }}>
                    <p className="af-span-p" style={{ width: "4rem" }}>PO#</p>
                    <div className="af-span-div" style={{ width: "9rem" }}>
                        <InputText
                            style={{ width: "9rem" }}
                            id="id_BL_FILE"
                            value={dataQRY_KSV_PO_MRP.PO_CD}
                            onChange={(e) =>
                                onInputChangeQRY_KSV_PO_MRP_PO_CD(e, "PO_CD")
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "14rem" }}>
                    <p className="af-span-p" style={{ width: "4rem" }}>Order#</p>
                    <div className="af-span-div" style={{ width: "9rem" }}>
                        <InputText
                            style={{ width: "9rem" }}
                            id="id_BL_FILE"
                            value={dataQRY_KSV_PO_MRP.ORDER_CD}
                            onChange={(e) =>
                                onInputChangeQRY_KSV_PO_MRP_ORDER_CD(
                                    e,
                                    "ORDER_CD",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "14rem" }}>
                    <p className="af-span-p" style={{ width: "4rem" }}>Color</p>
                    <div className="af-span-div" style={{ width: "9rem" }}>
                        <InputText
                            style={{ width: "9rem" }}
                            id="id_BL_FILE"
                            value={dataQRY_KSV_PO_MRP.COLOR}
                            onChange={(e) =>
                                onInputChangeQRY_KSV_PO_MRP_ORDER_CD(e, "COLOR")
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "15rem" }}>
                    <div className="af-span-div-btn" style={{ width: "9rem" }}>
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
                            style={{ width: "9rem" }}
                            className="p-button-text"
                            onClick={search_LIST_1}
                        />
                    </div>
                </span>

                <span className="af-span-3" style={{ width: "18rem" }}>
                    <p className="af-span-p" style={{ width: "7rem" }}>Matl#</p>
                    <div className="af-span-div" style={{ width: "10rem" }}>
                        <InputText
                            style={{ width: "10rem" }}
                            id="id_BL_FILE"
                            value={dataQRY_KSV_PO_MRP.MATL_CD}
                            onChange={(e) =>
                                onInputChangeQRY_KSV_PO_MRP_MATL_CD(
                                    e,
                                    "MATL_CD",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "52rem" }}>
                    <p className="af-span-p" style={{ width: "7rem" }}>Description</p>
                    <div className="af-span-div" style={{ width: "44em" }}>
                        <InputText
                            style={{ width: "44rem" }}
                            id="id_BL_FILE"
                            value={dataQRY_KSV_PO_MRP.MATL_NAME}
                            onChange={(e) =>
                                onInputChangeQRY_KSV_PO_MRP_MATL_NAME(
                                    e,
                                    "MATL_NAME",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "17rem" }}>
                    <p className="af-span-p" style={{ width: "7rem" }}>Spec</p>
                    <div className="af-span-div" style={{ width: "9rem" }}>
                        <InputText
                            style={{ width: "9rem" }}
                            id="id_BL_FILE"
                            value={dataQRY_KSV_PO_MRP.SPEC}
                            onChange={(e) =>
                                onInputChangeQRY_KSV_PO_MRP_SPEC(e, "SPEC")
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "14rem" }}>
                    <p className="af-span-p" style={{ width: "6rem", textDecoration: "line-through" }}>New Stock</p>
                    <div className="af-span-checkbox">
                        <Checkbox
                            disabled
                            id="id_IS_DUEDATE"
                            checked={changeCheckBoxVal(
                                dataQRY_KSV_PO_MRP.IS_NEW,
                            )}
                            onChange={(e) =>
                                onCheckboxChangeQRY_KSV_PO_MRP_IS_NEW(
                                    e,
                                    "IS_NEW",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "10rem" }}>
                    <div className="af-span-div-btn" style={{ width: "9rem" }}>
                        <Button
                            label="Reset"
                            style={{ width: "9rem" }}
                            className="p-button-text"
                            onClick={blankFn}
                        />
                    </div>
                </span>
            </div>

            <div
                className="af-div-first"
                style={{ width: "123rem", height: "29rem" }}
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
                    columnResizeMode="expand"
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
                    virtualScrollerOptions={{ itemSize: 20 }}
                    emptyMessage=" " //header={headerTBL_KSV_PO_MRP}
                    responsiveLayout="scroll"
                    scrollable
                    scrollHeight="29rem"
                >
                    <AFColumn field="STOCK_DATE" headerClassName="t-header" header="Out Date" style={{ width: "8rem", flexBasis: "auto" }} body={(rowData) => serviceLib.dateFormatHMS(rowData.STOCK_DATE) } ></AFColumn>
                    <AFColumn field="REASON_MAKE" headerClassName="t-header" header="Reason" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="CONDITION" headerClassName="t-header" header="Condition" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="PO_CD" headerClassName="t-header" header="PO#" style={{ width: "7rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="ORDER_CD" headerClassName="t-header" header="Order#" style={{ width: "7rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="MATL_CD" headerClassName="t-header" header="Matl#" style={{ width: "6rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="SUPPLIER" headerClassName="t-header" header="Supplier" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="MATL_NAME" headerClassName="t-header" header="Desc" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="COLOR" headerClassName="t-header" header="Color" style={{ width: "8rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="SPEC" headerClassName="t-header" header="Spec" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="UNIT" headerClassName="t-header" header="Unit" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="STOCK_QTY" headerClassName="t-header" header="Qty" style={{ width: "6rem", flexBasis: "auto" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.STOCK_QTY, 0) } ></AFColumn>
                    <AFColumn field="REMARK" headerClassName="t-header" header="Remark" style={{ width: "6rem", flexBasis: "auto" }} ></AFColumn>
                    {/* 향후 삭제 */}
                    <AFColumn field="WAITING_QTY" headerClassName="t-header" header="Wait Qty" style={{ width: "6rem", flexBasis: "auto" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.WAITING_QTY, 0) } ></AFColumn>
                    <AFColumn field="STOCK_STATUS" headerClassName="t-header" header="Status(Bef)" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="STOCK_STATUS_2" headerClassName="t-header" header="Status" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                </AFDataTable>
            </div>

            <div
                className="af-div-first"
                style={{ width: "82rem", height: "50rem" }}
            >
                <span className="af-span-3-0" style={{ width: "17rem" }}>
                    <p className="af-span-p" style={{ width: "7rem" }}>Stock Date</p>
                    <div className="af-span-div" style={{ width: "9rem" }}>
                        <InputText
                            disabled
                            style={{ width: "9rem" }}
                            id="id_BL_FILE"
                            value={dataEDT_KSV_PO_MRP.STOCK_DATE}
                            onChange={(e) =>
                                onInputChangeEDT_KSV_PO_MRP_STOCK_DATE(
                                    e,
                                    "STOCK_DATE",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "17rem" }}>
                    <p className="af-span-p" style={{ width: "7rem" }}>Charger</p>
                    <div className="af-span-div" style={{ width: "9rem" }}>
                        <InputText
                            disabled
                            style={{ width: "9rem" }}
                            id="id_BL_FILE"
                            value={dataEDT_KSV_PO_MRP.CHARGER}
                            onChange={(e) =>
                                onInputChangeEDT_KSV_PO_MRP_CHARGER(
                                    e,
                                    "CHARGER",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "17rem" }}>
                    <p className="af-span-p" style={{ width: "7rem" }}>Owner Ship</p>
                    <div className="af-span-div" style={{ width: "9rem" }}>
                        <Dropdown
                            disabled
                            style={{ width: "9rem" }}
                            id="id_OWNER_SHIP"
                            value={dataEDT_KSV_PO_MRP_OWNER_SHIP}
                            onChange={(e) =>
                                onDropdownChangeEDT_KSV_PO_MRP_OWNER_SHIP(
                                    e,
                                    "OWNER_SHIP",
                                )
                            }
                            options={datasEDT_KSV_PO_MRP_OWNER_SHIP}
                            optionLabel="CD_NAME"
                            placeholder=""
                        ></Dropdown>
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "17rem" }}>
                    <p className="af-span-p" style={{ width: "7rem" }}>Reason</p>
                    <div className="af-span-div" style={{ width: "9rem" }}>
                        <Dropdown
                            disabled
                            style={{ width: "9rem" }}
                            id="id_REASON_MAKE"
                            value={dataEDT_KSV_PO_MRP_REASON_MAKE}
                            onChange={(e) =>
                                onDropdownChangeEDT_KSV_PO_MRP_REASON_MAKE(
                                    e,
                                    "REASON_MAKE",
                                )
                            }
                            options={datasEDT_KSV_PO_MRP_REASON_MAKE}
                            optionLabel="CD_NAME"
                            placeholder=""
                        ></Dropdown>
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "17rem" }}>
                    <p className="af-span-p red" style={{ width: "7rem" }}>*Authority</p>
                    <div className="af-span-div" style={{ width: "9rem" }}>
                        <Dropdown
                            style={{ width: "9rem" }}
                            id="id_AUTHORITY"
                            value={dataEDT_KSV_PO_MRP_AUTHORITY}
                            onChange={(e) =>
                                onDropdownChangeEDT_KSV_PO_MRP_AUTHORITY(
                                    e,
                                    "AUTHORITY",
                                )
                            }
                            options={datasEDT_KSV_PO_MRP_AUTHORITY}
                            optionLabel="CD_NAME"
                            placeholder=""
                        ></Dropdown>
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "17rem" }}>
                    <p className="af-span-p red" style={{ width: "7rem" }}>*Condition</p>
                    <div className="af-span-div" style={{ width: "9rem" }}>
                        <Dropdown
                            style={{ width: "9rem" }}
                            id="id_CONDITION"
                            value={dataEDT_KSV_PO_MRP_CONDITION}
                            onChange={(e) =>
                                onDropdownChangeEDT_KSV_PO_MRP_CONDITION(
                                    e,
                                    "CONDITION",
                                )
                            }
                            options={datasEDT_KSV_PO_MRP_CONDITION}
                            optionLabel="CD_NAME"
                            placeholder=""
                        ></Dropdown>
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "17rem" }}>
                    <p className="af-span-p red" style={{ width: "7rem" }}>*Manager</p>
                    <div className="af-span-div" style={{ width: "9rem" }}>
                        <Dropdown
                            style={{ width: "9rem" }}
                            id="id_MANAGER"
                            value={dataEDT_KSV_PO_MRP_MANAGER}
                            onChange={(e) =>
                                onDropdownChangeEDT_KSV_PO_MRP_MANAGER(
                                    e,
                                    "MANAGER",
                                )
                            }
                            options={datasEDT_KSV_PO_MRP_MANAGER}
                            optionLabel="CD_NAME"
                            placeholder=""
                        ></Dropdown>
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "17rem" }}>
                    <p className="af-span-p red" style={{ width: "7rem" }}>*Remark</p>
                    <div className="af-span-div" style={{ width: "9rem" }}>
                        <Dropdown
                            style={{ width: "9rem" }}
                            id="id_REMARK"
                            value={dataEDT_KSV_PO_MRP_REMARK}
                            onChange={(e) =>
                                onDropdownChangeEDT_KSV_PO_MRP_REMARK(
                                    e,
                                    "REMARK",
                                )
                            }
                            options={datasEDT_KSV_PO_MRP_REMARK}
                            optionLabel="CD_NAME"
                            placeholder=""
                        ></Dropdown>
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "80rem" }}>
                    <p className="af-span-p" style={{ width: "7rem" }}>Purpose</p>
                    <div className="af-span-div" style={{ width: "9rem" }}>
                        <Dropdown
                            style={{ width: "9rem" }}
                            id="id_PURPOSE"
                            value={dataEDT_KSV_PO_MRP_PURPOSE}
                            onChange={(e) =>
                                onDropdownChangeEDT_KSV_PO_MRP_PURPOSE(
                                    e,
                                    "PURPOSE",
                                )
                            }
                            options={datasEDT_KSV_PO_MRP_PURPOSE}
                            optionLabel="CD_NAME"
                            placeholder=""
                            filter
                        ></Dropdown>
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "10rem" }}>
                    <div className="af-span-div-btn" style={{ width: "9rem" }}>
                        <Button
                            style={{ width: "9rem" }}
                            label="Save"
                            className="p-button-text"
                            onClick={process_STOCK_MOVE}
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "10rem" }}>
                    <div className="af-span-div-btn" style={{ width: "9rem" }}>
                        <Button
                            style={{ width: "9rem" }}
                            label="Reset"
                            className="p-button-text"
                            onClick={blankFn}
                        />
                    </div>
                </span>
            </div>

            <div
                className="af-div-first"
                style={{ width: "41.5rem", height: "25rem", paddingTop: "0.5rem" }}
            >
                <AFDataTable preventUnrelatedRerender
                    ref={dt_TBL_KSV_PO_MRP2}
                    editMode="cell"
                    size="small"
                    value={datasTBL_KSV_PO_MRP2}
                    tableStyle={{ tableLayout: "fixed" }}
                    resizableColumns
                    columnResizeMode="expand"
                    loading={loadingTBL_KSV_PO_MRP2}
                    showGridlines
                    selectionMode="checkbox"
                    selection={selectedTBL_KSV_PO_MRP2}
                    onSelectionChange={(e) => {
                        setFlagSelectModeTBL_KSV_PO_MRP2(true);
                        setSelectedTBL_KSV_PO_MRP2(e.value);
                        console.log(
                            "selected length:" + selectedTBL_KSV_PO_MRP2.length,
                        );
                        onRowClick1TBL_KSV_PO_MRP2(e.value);
                    }}
                    onRowClick={onRowClickTBL_KSV_PO_MRP2}
                    dataKey="SEQ"
                    className="datatable-responsive"
                    virtualScrollerOptions={{ itemSize: 20 }}
                    emptyMessage=" " //header={headerTBL_KSV_PO_MRP2}
                    responsiveLayout="scroll"
                    scrollable
                    scrollHeight="270px"
                >
                    <AFColumn field="SEQ" headerClassName="t-header" header="Unit#" style={{ width: "5rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="QTY" headerClassName="t-header" header="Qty" style={{ width: "5rem", flexBasis: "auto", color: "green", }} editor={(options) => cellEditorKSV_PO_MRP2(options)} onCellEditComplete={onCellEditCompleteKSV_PO_MRP2} ></AFColumn>
                    <AFColumn field="RACK" headerClassName="t-header" header="Rack" style={{ width: "5rem", flexBasis: "auto", color: "green", }} editor={(options) => cellEditorKSV_PO_MRP2(options)} onCellEditComplete={onCellEditCompleteKSV_PO_MRP2} ></AFColumn>
                    <AFColumn field="LOCATION" headerClassName="t-header" header="Location" style={{ width: "8rem", flexBasis: "auto", color: "green", }} editor={(options) => cellEditorKSV_PO_MRP2(options)} onCellEditComplete={onCellEditCompleteKSV_PO_MRP2} ></AFColumn>
                </AFDataTable>
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

export default React.memo(S0521_STOCK_RECORD_NEW, comparisonFn);
