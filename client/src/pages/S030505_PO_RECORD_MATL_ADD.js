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
import { ServiceS030505_PO_RECORD_MATL_ADD } from "../service/service_biz/ServiceS030505_PO_RECORD_MATL_ADD";
import { ServiceS030513_MRP_LIST } from "../service/service_biz/ServiceS030513_MRP_LIST";
import { ServiceS0301_MATL_RECORD } from "../service/service_biz/ServiceS0301_MATL_RECORD";

import "./page_common.scss";

const emptyKCD_CODE = {
    id: 0,
    CD_GROUP: "",
    CD_CODE: "",
    CD_NAME: "",
    CD_FLAG: "",
};

const emptyQRY_KSV_PO_MRP = {
    PO_CD: "",
    ORDER_CD: "",
    PO_SEQ: "",
    DELIVERY_TYPE: "",
    CURRENCY: "",
};

const emptyQRY_KSV_PO_MRP1 = {
    MATL_CD: "",
    MATL_NAME: "",
    COLOR: "",
    SPEC: "",
    VENDOR_CD: "",
    FACTORY_CD: "",
};

const emptyTBL_KSV_PO_MRP = {
    MATL_CD: "",
    MATL_NAME: "",
    COLOR: "",
    SPEC: "",
    MATL_PRICE: "0",
    CURR_CD: "",
    UNIT: "",
    COL1: "0",
    PO_QTY: "0",
    CD_NAME: "",
    REASON_TYPE: "",
    FARE_TYPE: "",
    REMARK: "",
    VENDOR_NAME: "",
    COL2: "",
    USE_PO_TYPE: "",
    PO_CD: "",
    PO_SEQ: "0",
    ORDER_CD: "",
    MRP_SEQ: "0",
    MATL_SEQ: "0",
    COL3: "",
    STOCK_IDX: "",
    VENDOR_CD: "",
};

const emptyTBL_KSV_PO_MRP1 = {
    id: 0,
    MATL_CD: "",
    MATL_NAME: "",
    COLOR: "",
    SPEC: "",
    MATL_PRICE: "",
    CURR_CD: "",
    UNIT: "",
    PO_QTY: "",
    USE_PO_TYPE_NAME: "",
    USE_PO_TYPE: "",
    REASON_TYPE: "",
    FARE_TYPE: "",
    REMARK: "",
    VENDOR_NAME: "",
    PO_SEQ: "",
    ORDER_CD: "",
    STOCK_IDX: "",
};

const S030505_PO_RECORD_MATL_ADD = () => {
    const serviceLibRef = useRef(null);
    if (!serviceLibRef.current) {
        serviceLibRef.current = new ServiceLib();
        serviceLibRef.current.loginConfirm();
    }
    const serviceLib = serviceLibRef.current;
    const serviceS030505_PO_RECORD_MATL_ADD =
        new ServiceS030505_PO_RECORD_MATL_ADD();
    const serviceS030513_MRP_LISTRef = useRef(null);
    if (!serviceS030513_MRP_LISTRef.current) serviceS030513_MRP_LISTRef.current = new ServiceS030513_MRP_LIST();
    const serviceS030513_MRP_LIST = serviceS030513_MRP_LISTRef.current;
    const serviceS0301_MATL_RECORDRef = useRef(null);
    if (!serviceS0301_MATL_RECORDRef.current) serviceS0301_MATL_RECORDRef.current = new ServiceS0301_MATL_RECORD();
    const serviceS0301_MATL_RECORD = serviceS0301_MATL_RECORDRef.current;

    const toast = useRef(null);
    const parent1 = useRef(null);

    /* splitter 관련 */
    const [styleVal, setStyleVal] = useState({ width: "65vw" });

    const process_RESET = () => {
        setDatasTBL_KSV_PO_MRP([]);
        setSelectedTBL_KSV_PO_MRP([]);
    };

    const process_RESET_UNDER = () => {
        setDatasTBL_KSV_PO_MRP1([]);
        setSelectedTBL_KSV_PO_MRP1([]);

        setDataQRY_KSV_PO_MRP1(emptyQRY_KSV_PO_MRP1);
    };

    const searchMATL_MST = () => {
        setDataOP_KIND("발주");
        var tObj = { ...dataQRY_KSV_PO_MRP1 };
        if (tObj.FACTORY_CD === "" || tObj.FACTORY_CD === " ") {
            alert("FACTORY가 입력되지 않았습니다<br><br>FACTORY has not been entered");
            return;
        }
        if (
            tObj.MATL_CD === "" &&
            tObj.MATL_NAME === "" &&
            tObj.COLOR === "" &&
            tObj.SPEC === ""
        ) {
            alert(
                "Matl Cd, Matl Name, Color, Spec중 하나는 필수입력값 입니다.",
            );
            return;
        }

        clearSelectedTBL_KSV_PO_MRP1();
        setDatasTBL_KSV_PO_MRP1([]);
        setLoadingTBL_KSV_PO_MRP1(true);

        serviceS030505_PO_RECORD_MATL_ADD
            .mgrQueryTBL_KCD_MATL_MST(dataQRY_KSV_PO_MRP1)
            .then((data) => {
                setLoadingTBL_KSV_PO_MRP1(false);
                if (typeof data.graphQLErrors === "undefined") {
                    if (data.length > 0) {
                        setDatasTBL_KSV_PO_MRP1(
                            data.map((col, i) => ({
                                ...col,
                                id: i + 1,
                                REASON_TYPE:
                                    datasQRY_KSV_PO_MRP_REASON_TYPE.filter(
                                        (element) =>
                                            element.CD_CODE === col.REASON_TYPE,
                                    )[0].CD_NAME,
                                FARE_TYPE: datasQRY_KSV_PO_MRP_FARE_TYPE.filter(
                                    (element) =>
                                        element.CD_CODE === col.FARE_TYPE,
                                )[0].CD_NAME,
                            })),
                        );
                    }
                } else {
                    console.log(
                        "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });
    };

    const popup_DEBIT_NOTE = () => {
        // var tSTYLE_CD = 'ST23-0734';
        if (selectedTBL_KSV_PO_MRP.length <= 0) {
            alert("작업할 자재를 조회하세요<br><br>Search for materials to work with");
            return;
        }

        var tTotAmt = 0;
        var tCurrCd = "";
        var tVendorCd = "";
        var tOrderCd = "";
        var tVendorName = "";
        var tFlag = 0;
        selectedTBL_KSV_PO_MRP.forEach((col, i) => {
            tTotAmt += parseInt(col.PO_QTY) * parseFloat(col.MATL_PRICE);
            if (tVendorCd !== col.VENDOR_CD || tCurrCd !== col.CURR_CD) {
                if (i > 0) tFlag = 1;
            }
            tCurrCd = col.CURR_CD;
            tVendorCd = col.VENDOR_CD;
            tOrderCd = col.ORDER_CD;
            tVendorName = col.VENDOR_NAME;
        });
        if (tFlag === 1) {
            alert("같은 Supplier, Curr Cd만 선택가능합니다 .<br><br>Only the same Supplier and Curr Cd can be selected.");
            return;
        }

        var tQryObj1 = { ...dataQRY_KSV_PO_MRP1 };
        var tQryObj = { ...dataQRY_KSV_PO_MRP };

        var tSaveObj = {};
        tSaveObj.PO_CD = tQryObj.PO_CD;
        tSaveObj.ORDER_CD = tOrderCd;
        tSaveObj.CURR_CD = tCurrCd;
        tSaveObj.TOT_AMT = String(tTotAmt);
        tSaveObj.VENDOR_CD = tVendorCd;
        tSaveObj.VENDOR_NAME = tVendorName;
        tSaveObj.FACTORY_CD = tQryObj1.FACTORY_CD;
        window.localStorage.setItem(
            "S0702_DEBIT_NOTE",
            JSON.stringify(tSaveObj),
        );

        var tUrl2 = `S0702_DEBIT_NOTE?PO_CD=${tQryObj.PO_CD}&ORDER_CD=${tQryObj.ORDER_CD}`;
        var tValObj = {
            key: "6-4",
            label: "Debit Note",
            icon: "pi pi-fw pi-user-edit",
            width: "1365px",
            height: "675px",
            url1: "S0702_DEBIT_NOTE",
        };
        var tArgObj = { ...tValObj };
        tArgObj.url1 = tUrl2;
        var tFuncObj = {};
        tFuncObj.func = "call_url";
        tFuncObj.message = { ...tArgObj };
        window.parent.postMessage(tFuncObj, "*");
    };

    const search_REPORT_ADD_MATL_REQ = (argData) => {
        var tQryObj = { ...dataQRY_KSV_PO_MRP };

        var tInObj = {};
        tInObj.PO_CD = tQryObj.PO_CD;
        tInObj.PO_SEQ = tQryObj.PO_SEQ;

        if (tInObj.PO_SEQ === "") {
            alert("먼저 PO_SEQ를 선택하여 조회후 처리하십시요<br><br>First, select PO_SEQ to search and process.");
            return;
        }

        setLoadingTBL_KSV_PO_MRP(true);
        serviceS030513_MRP_LIST
            .mgrQuery_REPORT_ADD_MATL_REQ(tInObj)
            .then((data) => {
                setLoadingTBL_KSV_PO_MRP(false);
                if (typeof data.graphQLErrors === "undefined") {
                    if (data.length > 0) {
                        alert(data[0].CODE);
                        if (data[0].CODE.includes("SUCC")) {
                            downloadFile(
                                data[0].CODE.split("?")[2].toString(),
                                data[0].CODE.split("?")[1].toString(),
                            );
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
        var tObj = {};
        if (typeof argData.PO_CD === "undefined")
            tObj = { ...dataQRY_KSV_PO_MRP };
        else tObj = { ...argData };

        setDatasTBL_KSV_PO_MRP([]);

        console.log("tObj => ", tObj);

        serviceS030505_PO_RECORD_MATL_ADD.mgrQuery_LIST_1(tObj).then((data) => {
            console.log(data);
            if (typeof data.graphQLErrors === "undefined") {
                if (data.PO_MRP.length > 0) {
                    var tArray = [];
                    data.PO_MRP.forEach((col, i) => {
                        var tObj1 = { ...col };
                        tObj1.id = i + 1;
                        tObj1.PO_SEQ = tObj.PO_SEQ;
                        tObj1.REASON_TYPE =
                            datasQRY_KSV_PO_MRP_REASON_TYPE.filter(
                                (element) =>
                                    element.CD_CODE === tObj1.REASON_TYPE,
                            )[0]?.CD_NAME;
                        tObj1.FARE_TYPE = datasQRY_KSV_PO_MRP_FARE_TYPE.filter(
                            (element) => element.CD_CODE === tObj1.FARE_TYPE,
                        )[0]?.CD_NAME;
                        tArray.push(tObj1);
                    });

                    setDatasTBL_KSV_PO_MRP(tArray);
                }
            } else {
                console.log(
                    "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });
    };

    /* QRY KSV_PO_MST*/
    const [dataQRY_KSV_PO_MRP, setDataQRY_KSV_PO_MRP] =
        useState(emptyQRY_KSV_PO_MRP);

    const [
        datasQRY_KSV_PO_MRP_REASON_TYPE,
        setDatasQRY_KSV_PO_MRP_REASON_TYPE,
    ] = useState([]);
    const [dataQRY_KSV_PO_MRP_REASON_TYPE, setDataQRY_KSV_PO_MRP_REASON_TYPE] =
        useState({});

    const [datasQRY_KSV_PO_MRP_FARE_TYPE, setDatasQRY_KSV_PO_MRP_FARE_TYPE] =
        useState([]);
    const [dataQRY_KSV_PO_MRP_FARE_TYPE, setDataQRY_KSV_PO_MRP_FARE_TYPE] =
        useState({});

    const [datasQRY_KSV_PO_MRP_PO_CD, setDatasQRY_KSV_PO_MRP_PO_CD] = useState(
        [],
    );
    const [dataQRY_KSV_PO_MRP_PO_CD, setDataQRY_KSV_PO_MRP_PO_CD] = useState(
        {},
    );

    const [datasQRY_KSV_PO_MRP_PO_SEQ, setDatasQRY_KSV_PO_MRP_PO_SEQ] =
        useState([]);
    const [dataQRY_KSV_PO_MRP_PO_SEQ, setDataQRY_KSV_PO_MRP_PO_SEQ] = useState(
        {},
    );

    const onDropdownChangeQRY_KSV_PO_MRP_PO_SEQ = (e, name) => {
        let val = (e.value && e.value.PO_SEQ) || "";

        let _dataQRY_KSV_PO_MRP = { ...dataQRY_KSV_PO_MRP };

        let tTypeVal = _dataQRY_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_PO_MRP[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_PO_MRP[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_PO_MRP(_dataQRY_KSV_PO_MRP);
        setDataQRY_KSV_PO_MRP_PO_SEQ(e.value);
    };

    const [dataOP_KIND, setDataOP_KIND] = useState("");

    const [datasQRY_KSV_PO_MRP_ORDER_CD, setDatasQRY_KSV_PO_MRP_ORDER_CD] =
        useState([]);
    const [dataQRY_KSV_PO_MRP_ORDER_CD, setDataQRY_KSV_PO_MRP_ORDER_CD] =
        useState({});

    const onDropdownChangeQRY_KSV_PO_MRP_ORDER_CD = (e, name) => {
        console.log(e);
        let val = (e.value && e.value.ORDER_CD) || "";

        let _dataQRY_KSV_PO_MRP = { ...dataQRY_KSV_PO_MRP };

        let tTypeVal = _dataQRY_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_PO_MRP[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_PO_MRP[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_PO_MRP(_dataQRY_KSV_PO_MRP);
        setDataQRY_KSV_PO_MRP_ORDER_CD(e.value);
    };

    const onInputChangeQRY_KSV_PO_MRP_PO_CD = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_PO_MRP = { ...dataQRY_KSV_PO_MRP };

        let tTypeVal = _dataQRY_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string") _dataQRY_KSV_PO_MRP[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_PO_MRP[`${name}`] = parseInt(val);

        setDataQRY_KSV_PO_MRP(_dataQRY_KSV_PO_MRP);
    };

    const [
        datasQRY_KSV_PO_MRP_DELIVERY_TYPE,
        setDatasQRY_KSV_PO_MRP_DELIVERY_TYPE,
    ] = useState([]);
    const [
        dataQRY_KSV_PO_MRP_DELIVERY_TYPE,
        setDataQRY_KSV_PO_MRP_DELIVERY_TYPE,
    ] = useState({});

    const onDropdownChangeQRY_KSV_PO_MRP_DELIVERY_TYPE = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataQRY_KSV_PO_MRP = { ...dataQRY_KSV_PO_MRP };

        let tTypeVal = _dataQRY_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_PO_MRP[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_PO_MRP[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_PO_MRP(_dataQRY_KSV_PO_MRP);
        setDataQRY_KSV_PO_MRP_DELIVERY_TYPE(e.value);
    };

    /* QRY KSV_PO_MST1*/
    const [dataQRY_KSV_PO_MRP1, setDataQRY_KSV_PO_MRP1] =
        useState(emptyQRY_KSV_PO_MRP1);

    const onInputChangeQRY_KSV_PO_MRP1_MATL_CD = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_PO_MRP1 = { ...dataQRY_KSV_PO_MRP1 };

        let tTypeVal = _dataQRY_KSV_PO_MRP1[`${name}`];
        if (typeof tTypeVal === "string") _dataQRY_KSV_PO_MRP1[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_PO_MRP1[`${name}`] = parseInt(val);

        setDataQRY_KSV_PO_MRP1(_dataQRY_KSV_PO_MRP1);
    };

    const onInputChangeQRY_KSV_PO_MRP1_MATL_NAME = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_PO_MRP1 = { ...dataQRY_KSV_PO_MRP1 };

        let tTypeVal = _dataQRY_KSV_PO_MRP1[`${name}`];
        if (typeof tTypeVal === "string") _dataQRY_KSV_PO_MRP1[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_PO_MRP1[`${name}`] = parseInt(val);

        setDataQRY_KSV_PO_MRP1(_dataQRY_KSV_PO_MRP1);
    };

    const onInputChangeQRY_KSV_PO_MRP1_COLOR = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_PO_MRP1 = { ...dataQRY_KSV_PO_MRP1 };

        let tTypeVal = _dataQRY_KSV_PO_MRP1[`${name}`];
        if (typeof tTypeVal === "string") _dataQRY_KSV_PO_MRP1[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_PO_MRP1[`${name}`] = parseInt(val);

        setDataQRY_KSV_PO_MRP1(_dataQRY_KSV_PO_MRP1);
    };

    const onInputChangeQRY_KSV_PO_MRP1_SPEC = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_PO_MRP1 = { ...dataQRY_KSV_PO_MRP1 };

        let tTypeVal = _dataQRY_KSV_PO_MRP1[`${name}`];
        if (typeof tTypeVal === "string") _dataQRY_KSV_PO_MRP1[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_PO_MRP1[`${name}`] = parseInt(val);

        setDataQRY_KSV_PO_MRP1(_dataQRY_KSV_PO_MRP1);
    };

    const [
        datasQRY_KSV_PO_MRP1_FACTORY_CD,
        setDatasQRY_KSV_PO_MRP1_FACTORY_CD,
    ] = useState([]);
    const [dataQRY_KSV_PO_MRP1_FACTORY_CD, setDataQRY_KSV_PO_MRP1_FACTORY_CD] =
        useState({});

    const onDropdownChangeQRY_KSV_PO_MRP1_FACTORY_CD = (e, name) => {
        let val = (e.value && e.value.FACTORY_CD) || "";

        let _dataQRY_KSV_PO_MRP1 = { ...dataQRY_KSV_PO_MRP1 };

        let tTypeVal = _dataQRY_KSV_PO_MRP1[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_PO_MRP1[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_PO_MRP1[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_PO_MRP1(_dataQRY_KSV_PO_MRP1);
        setDataQRY_KSV_PO_MRP1_FACTORY_CD(e.value);
    };

    const [datasQRY_KSV_PO_MRP1_VENDOR_CD, setDatasQRY_KSV_PO_MRP1_VENDOR_CD] =
        useState([]);
    const [dataQRY_KSV_PO_MRP1_VENDOR_CD, setDataQRY_KSV_PO_MRP1_VENDOR_CD] =
        useState({});

    const onInputChangeQRY_KSV_PO_MRP1_VENDOR_CD = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_PO_MRP1 = { ...dataQRY_KSV_PO_MRP1 };

        let tTypeVal = _dataQRY_KSV_PO_MRP1[`${name}`];
        if (typeof tTypeVal === "string") _dataQRY_KSV_PO_MRP1[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_PO_MRP1[`${name}`] = parseInt(val);

        setDataQRY_KSV_PO_MRP1(_dataQRY_KSV_PO_MRP1);
    };

    /**TABLE KSV_ORDER_MST1 */
    // DEFINE DATAGRID : TBL_KSV_PO_MRP
    const [datasTBL_KSV_PO_MRP, setDatasTBL_KSV_PO_MRP] = useState([]);
    const dt_TBL_KSV_PO_MRP = useRef(null);
    const [dataTBL_KSV_PO_MRP, setDataTBL_KSV_PO_MRP] =
        useState(emptyTBL_KSV_PO_MRP);
    const [selectedTBL_KSV_PO_MRP, setSelectedTBL_KSV_PO_MRP] = useState([]);
    const [flagSelectModeTBL_KSV_PO_MRP, setFlagSelectModeTBL_KSV_PO_MRP] =
        useState(false);
    const [loadingTBL_KSV_PO_MRP, setLoadingTBL_KSV_PO_MRP] = useState(false);

    // DATAGRID CODE : TBL_KSV_PO_MRP

    const onCellEditCompleteKSV_PO_MST_TEXT = (e) => {
        // console.log(e);
        let { rowData, newValue, field, originalEvent: event } = e;
        if (field === "REASON_TYPE") {
            var tRetObj = JSON.parse(
                window.localStorage.getItem("S030505_REASON_TYPE"),
            );
            rowData[field] = tRetObj.CD_NAME;
            // console.log(tRetObj);
        }
        if (field === "FARE_TYPE") {
            var tRetObj = JSON.parse(
                window.localStorage.getItem("S030505_FARE_TYPE"),
            );
            rowData[field] = tRetObj.CD_NAME;
            // console.log(tRetObj);
        }
        if (field === "PO_QTY") rowData[field] = newValue;
        if (field === "REMARK") rowData[field] = newValue;
    };

    const cellEditorKSV_PO_MST_TEXT = (options) => {
        return textEditor(options);
    };

    const cellEditorKSV_PO_MST_DP = (options) => {
        if (options.field === "REASON_TYPE")
            return dropdownEditor_REASON(options);
        if (options.field === "FARE_TYPE") return dropdownEditor_FARE(options);
    };

    const textEditor = (options) => {
        return (
            <InputText
                type="text"
                value={options.value}
                onChange={(e) => {
                    console.log(e.target.value);
                    options.editorCallback(e.target.value);
                }}
            />
        );
    };

    const dropdownEditor_REASON = (options) => {
        return (
            <div className="flex" ref={parent1}>
                <Dropdown
                    style={{ width: "9rem" }}
                    value={dataQRY_KSV_PO_MRP_REASON_TYPE}
                    onChange={(e) => {
                        options.editorCallback(e.value);
                    }}
                    onMouseDown={(event) => {
                        if (options.editorCallback) {
                            var tFlag = 0;
                            var tRetObj = {};
                            datasQRY_KSV_PO_MRP_REASON_TYPE.forEach(
                                (col, i) => {
                                    if (
                                        col.CD_NAME === event.target.outerText
                                    ) {
                                        tFlag = 1;
                                        tRetObj = { ...col };
                                    }
                                },
                            );
                            if (tFlag === 1) {
                                setDataQRY_KSV_PO_MRP_REASON_TYPE(tRetObj);
                                window.localStorage.setItem(
                                    "S030505_REASON_TYPE",
                                    JSON.stringify(tRetObj),
                                );
                                options.editorCallback(tRetObj.CD_CODE);
                                //console.log(tRetObj);
                            }
                        }
                    }}
                    options={datasQRY_KSV_PO_MRP_REASON_TYPE}
                    optionLabel="CD_NAME"
                    placeholder=""
                    optionValue="CD_CODE"
                ></Dropdown>
            </div>
        );
    };

    const dropdownEditor_FARE = (options) => {
        return (
            <div className="flex" ref={parent1}>
                <Dropdown
                    style={{ width: "9rem" }}
                    value={dataQRY_KSV_PO_MRP_FARE_TYPE}
                    onChange={(e) => {
                        options.editorCallback(e.value);
                    }}
                    onMouseDown={(event) => {
                        if (options.editorCallback) {
                            var tFlag = 0;
                            var tRetObj = {};
                            datasQRY_KSV_PO_MRP_FARE_TYPE.forEach((col, i) => {
                                if (col.CD_NAME === event.target.outerText) {
                                    tFlag = 1;
                                    tRetObj = { ...col };
                                }
                            });
                            if (tFlag === 1) {
                                setDataQRY_KSV_PO_MRP_FARE_TYPE(tRetObj);
                                window.localStorage.setItem(
                                    "S030505_FARE_TYPE",
                                    JSON.stringify(tRetObj),
                                );
                                options.editorCallback(tRetObj.CD_CODE);
                                //console.log(tRetObj);
                            }
                        }
                    }}
                    options={datasQRY_KSV_PO_MRP_FARE_TYPE}
                    optionLabel="CD_NAME"
                    placeholder=""
                    optionValue="CD_CODE"
                ></Dropdown>
            </div>
        );
    };

    const onRowClick1TBL_KSV_PO_MRP = (argData0) => {
        var argData = {};

        if (typeof argData0.length !== "undefined") {
            argData = argData0[0];
        } else {
            argData = argData0;
        }

        let argTBL_KSV_PO_MRP = argData;

        setDataTBL_KSV_PO_MRP(argTBL_KSV_PO_MRP);
    };

    const onRowClickTBL_KSV_PO_MRP = (event) => {
        let argTBL_KSV_PO_MRP = event.data;
        // ROW 클릭 시 해당 ROW만 SINGLE 선택
        setSelectedTBL_KSV_PO_MRP([argTBL_KSV_PO_MRP]);
        setFlagSelectModeTBL_KSV_PO_MRP(false);
        onRowClick1TBL_KSV_PO_MRP(argTBL_KSV_PO_MRP);
    };

    const exportExcelTBL_KSV_PO_MRP = () => {};

    const downloadFile = async (argFileUrl, argFileName) => {
        serviceLib.downloadFile(argFileUrl, argFileName);
    };

    /**TABLE KSV_R_MST */
    // DEFINE DATAGRID : TBL_KSV_PO_MRP1
    const [datasTBL_KSV_PO_MRP1, setDatasTBL_KSV_PO_MRP1] = useState([]);
    const dt_TBL_KSV_PO_MRP1 = useRef(null);
    const [dataTBL_KSV_PO_MRP1, setDataTBL_KSV_PO_MRP1] =
        useState(emptyTBL_KSV_PO_MRP1);
    const [selectedTBL_KSV_PO_MRP1, setSelectedTBL_KSV_PO_MRP1] = useState([]);
    const [flagSelectModeTBL_KSV_PO_MRP1, setFlagSelectModeTBL_KSV_PO_MRP1] =
        useState(false);

    const [loadingTBL_KSV_PO_MRP1, setLoadingTBL_KSV_PO_MRP1] = useState(false);

    // DATAGRID CODE : TBL_KSV_PO_MRP1

    const searchMATL_STOCK = () => {
        setDataOP_KIND("재고사용");
        var tObj = { ...dataQRY_KSV_PO_MRP1 };
        if (tObj.FACTORY_CD === "" || tObj.FACTORY_CD === " ") {
            alert("FACTORY가 입력되지 않았습니다<br><br>FACTORY has not been entered");
            return;
        }
        if (
            tObj.MATL_CD === "" &&
            tObj.MATL_NAME === "" &&
            tObj.COLOR === "" &&
            tObj.SPEC === ""
        ) {
            alert(
                "Matl Cd, Matl Name, Color, Spec중 하나는 필수입력값 입니다.",
            );
            return;
        }

        setDatasTBL_KSV_PO_MRP1([]);
        setLoadingTBL_KSV_PO_MRP1(true);

        serviceS030505_PO_RECORD_MATL_ADD
            .mgrQueryTBL_KCD_MATL_MST2(dataQRY_KSV_PO_MRP1)
            .then((data) => {
                setLoadingTBL_KSV_PO_MRP1(false);
                if (typeof data.graphQLErrors === "undefined") {
                    if (data.length > 0) {
                        setDatasTBL_KSV_PO_MRP1(
                            data.map((col, i) => {
                                return {
                                    ...col,
                                    id: i + 1,
                                    REASON_TYPE:
                                        datasQRY_KSV_PO_MRP_REASON_TYPE.filter(
                                            (element) =>
                                                element.CD_CODE ===
                                                col.REASON_TYPE,
                                        )[0].CD_NAME,
                                    FARE_TYPE:
                                        datasQRY_KSV_PO_MRP_FARE_TYPE.filter(
                                            (element) =>
                                                element.CD_CODE ===
                                                col.FARE_TYPE,
                                        )[0].CD_NAME,
                                };
                            }),
                        );
                    }
                } else {
                    console.log(
                        "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });
    };

    const addPo = () => {
        var tData1 = {};
        tData1.PO_CD = dataQRY_KSV_PO_MRP.PO_CD;
        tData1.PO_SEQ = dataQRY_KSV_PO_MRP.PO_SEQ;
        tData1.USER_ID = "";
        tData1.ORDER_CD = dataQRY_KSV_PO_MRP.ORDER_CD;
        tData1.DELIVERY_TYPE = dataQRY_KSV_PO_MRP.DELIVERY_TYPE;
        tData1.FACTORY_CD = dataQRY_KSV_PO_MRP1.FACTORY_CD;

        var tData2 = [];
        datasTBL_KSV_PO_MRP.forEach((col, i) => {
            var tObj = { ...col };

            console.log(datasQRY_KSV_PO_MRP_REASON_TYPE);
            console.log(datasQRY_KSV_PO_MRP_FARE_TYPE);

            if (!tObj.REASON_TYPE) {
                tObj.REASON_TYPE = " ";
            }

            if (!tObj.FARE_TYPE) {
                tObj.FARE_TYPE = "";
            }

            console.log(tObj);

            tObj.REASON_TYPE = datasQRY_KSV_PO_MRP_REASON_TYPE.filter(
                (element) => element.CD_NAME === tObj.REASON_TYPE,
            )[0].CD_CODE;
            tObj.FARE_TYPE = datasQRY_KSV_PO_MRP_FARE_TYPE.filter(
                (element) => element.CD_NAME === tObj.FARE_TYPE,
            )[0].CD_CODE;

            if (typeof tObj.__typename !== "undefined") delete tObj.__typename;
            if (typeof tObj.id !== "undefined") delete tObj.id;
            if (typeof tObj.PO_SEQ !== "undefined") delete tObj.PO_SEQ;
            if (col.PO_SEQ === "" && parseInt(col.PO_QTY) > 0) {
                tData2.push(tObj);
            }
        });
        if (tData2.length <= 0) {
            alert("추가할 데이타가 없습니다. PO_QTY 을 입력했는지 확인하세요<br><br>There is no data to add. Make sure you enter PO_QTY");
            return;
        }

        setLoadingTBL_KSV_PO_MRP(true);
        serviceS030505_PO_RECORD_MATL_ADD
            .mgrAddPo(tData1, tData2)
            .then((data) => {
                setLoadingTBL_KSV_PO_MRP(false);
                if (typeof data.graphQLErrors === "undefined") {
                    if (data.length > 0) {
                        console.log(data);
                        if (data[0].CODE.includes("SUCC")) {
                            var tPoSeq = data[0].CODE.split(":")[1];
                            tData1.PO_SEQ = tPoSeq;

                            var tObjs = [...datasQRY_KSV_PO_MRP_PO_SEQ];
                            var tFlag2 = 0;

                            if (tFlag2 === 0) {
                                var tObj = {};
                                tObj.PO_SEQ = tPoSeq;
                                tObjs.push(tObj);
                                setDatasQRY_KSV_PO_MRP_PO_SEQ(tObjs);
                                setDataQRY_KSV_PO_MRP_PO_SEQ(
                                    tObjs[tObjs.length - 1],
                                );
                                setDataQRY_KSV_PO_MRP({
                                    ...dataQRY_KSV_PO_MRP,
                                    PO_SEQ: tPoSeq,
                                });
                                search_LIST_1(tData1);
                            }
                        } else {
                            toast.current.show({
                                severity: "error",
                                summary: "Po Add Error",
                                detail: data[0].CODE,
                                life: 3000,
                            });
                        }
                    }
                } else {
                    toast.current.show({
                        severity: "success",
                        summary: "Po Add Error",
                        detail: "",
                        life: 3000,
                    });
                }
            });
    };

    const updatePo = () => {
        var tData1 = {};
        tData1.PO_CD = dataQRY_KSV_PO_MRP.PO_CD;
        tData1.PO_SEQ = dataQRY_KSV_PO_MRP.PO_SEQ;
        tData1.USER_ID = "";
        tData1.ORDER_CD = dataQRY_KSV_PO_MRP.ORDER_CD;
        tData1.DELIVERY_TYPE = dataQRY_KSV_PO_MRP.DELIVERY_TYPE;
        tData1.FACTORY_CD = dataQRY_KSV_PO_MRP1.FACTORY_CD;

        var tData2 = [];
        datasTBL_KSV_PO_MRP.forEach((col, i) => {
            var tObj = { ...col };

            tObj.REASON_TYPE = datasQRY_KSV_PO_MRP_REASON_TYPE.filter(
                (element) => element.CD_NAME === tObj.REASON_TYPE,
            )[0].CD_CODE;
            tObj.FARE_TYPE = datasQRY_KSV_PO_MRP_FARE_TYPE.filter(
                (element) => element.CD_NAME === tObj.FARE_TYPE,
            )[0].CD_CODE;

            if (typeof tObj.__typename !== "undefined") delete tObj.__typename;
            if (typeof tObj.id !== "undefined") delete tObj.id;
            if (typeof tObj.PO_SEQ !== "undefined") delete tObj.PO_SEQ;
            if (col.PO_SEQ !== "" && parseInt(col.PO_QTY) > 0) {
                tData2.push(tObj);
            }
        });

        if (tData2.length <= 0) {
            alert("작업할 자재를 선택하십시요<br><br>Choose the material you want to work with");
            return;
        }

        console.log(tData2);

        setLoadingTBL_KSV_PO_MRP(true);
        serviceS030505_PO_RECORD_MATL_ADD
            .mgrUpdatePo(tData1, tData2)
            .then((data) => {
                setLoadingTBL_KSV_PO_MRP(false);
                if (typeof data.graphQLErrors === "undefined") {
                    if (data.length > 0) {
                        if (data[0].CODE.includes("SUCC")) {
                            var tPoSeq = data[0].CODE.split(":")[1];
                            search_LIST_1(tData1);
                        }
                    }
                } else {
                    toast.current.show({
                        severity: "success",
                        summary: "Po Add Error",
                        detail: "",
                        life: 3000,
                    });
                }
            });
    };

    const deletePo = () => {
        if (dataQRY_KSV_PO_MRP.PO_SEQ === "") {
            alert("PO_SEQ을 선택후 조회후 작업하십시요<br><br>Select PO_SEQ, search, and then work.");
            return;
        }

        var tData1 = {};
        tData1.PO_CD = dataQRY_KSV_PO_MRP.PO_CD;
        tData1.PO_SEQ = dataQRY_KSV_PO_MRP.PO_SEQ;
        tData1.USER_ID = "";
        tData1.ORDER_CD = dataQRY_KSV_PO_MRP.ORDER_CD;
        tData1.DELIVERY_TYPE = dataQRY_KSV_PO_MRP.DELIVERY_TYPE;
        tData1.FACTORY_CD = dataQRY_KSV_PO_MRP1.FACTORY_CD;

        var tData2 = [];
        datasTBL_KSV_PO_MRP.forEach((col, i) => {
            var tObj = { ...col };
            if (typeof tObj.__typename !== "undefined") delete tObj.__typename;
            if (typeof tObj.id !== "undefined") delete tObj.id;
            if (typeof tObj.PO_SEQ !== "undefined") delete tObj.PO_SEQ;
            if (col.PO_SEQ !== "" && parseInt(col.PO_QTY) > 0) {
                tData2.push(tObj);
            }
        });
        if (tData2.length <= 0) {
            alert("작업할 자재를 선택하십시요<br><br>Choose the material you want to work with");
            return;
        }

        setLoadingTBL_KSV_PO_MRP(true);
        serviceS030505_PO_RECORD_MATL_ADD
            .mgrDeletePo(tData1, tData2)
            .then((data) => {
                setLoadingTBL_KSV_PO_MRP(false);
                console.log(data);
                if (typeof data.graphQLErrors === "undefined") {
                    if (data.length > 0) {
                        if (data[0].CODE.includes("SUCC")) {
                            var tPoSeq = data[0].CODE.split(":")[1];
                            search_LIST_1(tData1);

                            var tObjs = [...datasQRY_KSV_PO_MRP_PO_SEQ];
                            console.log(tObjs);
                            tObjs = tObjs.filter(
                                (item) => item.PO_SEQ !== tPoSeq,
                            );

                            setDatasQRY_KSV_PO_MRP_PO_SEQ(tObjs);
                            setDataQRY_KSV_PO_MRP_PO_SEQ(
                                tObjs[tObjs.length - 1],
                            );
                            setDataQRY_KSV_PO_MRP({
                                ...dataQRY_KSV_PO_MRP,
                                PO_SEQ: tObjs[tObjs.length - 1].PO_SEQ,
                            });
                        }
                    }
                } else {
                    toast.current.show({
                        severity: "success",
                        summary: "Po Add Error",
                        detail: "",
                        life: 3000,
                    });
                }
            });
    };

    const matlRemove = () => {
        if (datasTBL_KSV_PO_MRP.length === selectedTBL_KSV_PO_MRP.length) {
            alert("모든 자재를 삭제할 수는 없습니다<br><br>Not all materials can be deleted");
            return;
        }

        var tData1 = {};
        tData1.PO_CD = dataQRY_KSV_PO_MRP.PO_CD;
        tData1.PO_SEQ = dataQRY_KSV_PO_MRP.PO_SEQ;
        tData1.USER_ID = "";
        tData1.ORDER_CD = dataQRY_KSV_PO_MRP.ORDER_CD;
        tData1.DELIVERY_TYPE = dataQRY_KSV_PO_MRP.DELIVERY_TYPE;
        tData1.FACTORY_CD = dataQRY_KSV_PO_MRP1.FACTORY_CD;

        if (!tData1.PO_SEQ) {
            let updatedData = datasTBL_KSV_PO_MRP
                .filter(
                    (item) =>
                        !selectedTBL_KSV_PO_MRP.some(
                            (selected) => selected.id === item.id,
                        ),
                )
                .map((item, index) => ({
                    ...item,
                    id: index + 1,
                }));

            setDatasTBL_KSV_PO_MRP(updatedData);
            return;
        }

        var tData2 = [];
        selectedTBL_KSV_PO_MRP.forEach((col, i) => {
            var tObj = { ...col };

            tObj.REASON_TYPE = datasQRY_KSV_PO_MRP_REASON_TYPE.filter(
                (element) => element.CD_NAME === tObj.REASON_TYPE,
            )[0].CD_CODE;
            tObj.FARE_TYPE = datasQRY_KSV_PO_MRP_FARE_TYPE.filter(
                (element) => element.CD_NAME === tObj.FARE_TYPE,
            )[0].CD_CODE;

            if (typeof tObj.__typename !== "undefined") delete tObj.__typename;
            if (typeof tObj.id !== "undefined") delete tObj.id;
            if (typeof tObj.PO_SEQ !== "undefined") delete tObj.PO_SEQ;
            if (col.PO_SEQ !== "" && parseInt(col.PO_QTY) > 0) {
                tData2.push(tObj);
            }
        });

        if (tData2.length <= 0) {
            alert("작업할 자재를 선택하십시요<br><br>Choose the material you want to work with");
            return;
        }

        console.log(tData2);

        setLoadingTBL_KSV_PO_MRP(true);
        serviceS030505_PO_RECORD_MATL_ADD
            .mgrMaterialRemove(tData1, tData2)
            .then((data) => {
                setLoadingTBL_KSV_PO_MRP(false);
                console.log(data);
                if (data[0].CODE.includes("SUCCESS")) {
                    search_LIST_1(tData1);
                } else {
                    toast.current.show({
                        severity: "success",
                        summary: "Material Remove Error",
                        detail: "",
                        life: 3000,
                    });
                }
            });
    };

    const addMaterial = () => {
        var tQryObj = { ...dataQRY_KSV_PO_MRP };

        if (selectedTBL_KSV_PO_MRP1.length <= 0) {
            alert("추가할 자재를 선택하십시요<br><br>Select the material you want to add");
            return;
        }

        if (tQryObj.ORDER_CD === "") {
            alert("오더를 선택해야 합니다<br><br>You must select an order");
            return;
        }

        let _tArray = [...datasTBL_KSV_PO_MRP]; // 기존 데이터 복사

        selectedTBL_KSV_PO_MRP1.forEach((srcRow) => {
            const tSrcObj = { ...srcRow };
            const tDestObj = { ...srcRow };

            if (dataOP_KIND === "재고사용") {
                tDestObj.PO_TYPE_NAME = "재고사용";
                tDestObj.USE_PO_TYPE = "2";
                tDestObj.STOCK_IDX = String(tSrcObj.STOCK_IDX);
            } else {
                tDestObj.PO_TYPE_NAME = "발주";
                tDestObj.USE_PO_TYPE = "1";
                tDestObj.STOCK_IDX = "0";
            }

            tDestObj.ORDER_CD = tQryObj.ORDER_CD;
            tDestObj.PO_SEQ = "";

            const isDuplicate = _tArray.some(
                (item) => item.MATL_CD === tDestObj.MATL_CD,
            );

            if (isDuplicate && dataOP_KIND !== "재고사용") {
                alert(`${tDestObj.MATL_CD} 는 중복되어 추가되지 않았습니다.`);
                return;
            }

            clearSelectedTBL_KSV_PO_MRP1();

            _tArray.push(tDestObj);
        });

        const tArray = _tArray.map((col, i) => ({
            ...col,
            id: i + 1,
        }));

        console.log(tArray);

        setDatasTBL_KSV_PO_MRP(tArray);
    };

    const onRowClick1TBL_KSV_PO_MRP1 = (argData0) => {
        var argData = {};

        if (typeof argData0?.length !== "undefined") {
            argData = argData0[0];
        } else {
            argData = argData0;
        }

        let argTBL_KSV_PO_MRP1 = argData;

        setDataTBL_KSV_PO_MRP1(argTBL_KSV_PO_MRP1);
    };

    const onRowClickTBL_KSV_PO_MRP1 = (event) => {
        let argTBL_KSV_PO_MRP1 = event.data;
        // ROW 클릭 시 해당 ROW만 SINGLE 선택
        setSelectedTBL_KSV_PO_MRP1([argTBL_KSV_PO_MRP1]);
        setFlagSelectModeTBL_KSV_PO_MRP1(false);
        onRowClick1TBL_KSV_PO_MRP1(argTBL_KSV_PO_MRP1);
    };

    const clearSelectedTBL_KSV_PO_MRP1 = () => {
        setSelectedTBL_KSV_PO_MRP1([]);
        setFlagSelectModeTBL_KSV_PO_MRP1(false);
    };

    useEffect(() => {
        init();
    }, []);

    const init = () => {
        let tParam = "";
        var tPoCd = "";

        var tUrls = window.location.href.split("?");
        if (tUrls.length <= 1) {
        } else {
            var tParams1 = tUrls[1].split("&");
            var tParams2 = tParams1.map((col, i) => {
                var tObj = {};
                var tCols = col.split("=");

                if (tCols[0].includes("PO_CD")) {
                    tObj.key = tCols[0];
                    tObj.value = tCols[1];
                    tPoCd = tObj.value;
                    console.log(tObj);
                    return tObj;
                }
            });
            if (tParams2.length > 0) {
                tParam = tParams2[0].value;
            }
            console.log(tParams2);
        }

        var tObj = {};
        tObj.PO_CD = tPoCd;

        serviceS030505_PO_RECORD_MATL_ADD.mgrQuery_CODE(tObj).then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                console.log(data);

                setDatasQRY_KSV_PO_MRP_PO_CD(data.PO_CD);

                setDatasQRY_KSV_PO_MRP_PO_SEQ(data.PO_CD);
                setDataQRY_KSV_PO_MRP_PO_SEQ(data.PO_CD[0]);

                setDatasQRY_KSV_PO_MRP_ORDER_CD(data.ORDER_CD);
                setDataQRY_KSV_PO_MRP_ORDER_CD(data.ORDER_CD[0]);

                setDatasQRY_KSV_PO_MRP1_FACTORY_CD(data.FACTORY_CD);
                setDataQRY_KSV_PO_MRP1_FACTORY_CD(data.FACTORY_CD[0]);

                setDatasQRY_KSV_PO_MRP_DELIVERY_TYPE(data.DELIVERY_TYPE);
                setDataQRY_KSV_PO_MRP_DELIVERY_TYPE(data.DELIVERY_TYPE[0]);

                setDatasQRY_KSV_PO_MRP_REASON_TYPE(data.REASON_TYPE);
                setDataQRY_KSV_PO_MRP_REASON_TYPE(data.REASON_TYPE[0]);

                console.log(data.REASON_TYPE);

                setDatasQRY_KSV_PO_MRP_FARE_TYPE(data.FARE_TYPE);
                setDataQRY_KSV_PO_MRP_FARE_TYPE(data.FARE_TYPE[0]);

                setDatasQRY_KSV_PO_MRP1_VENDOR_CD(data.VENDOR_CD);
                setDataQRY_KSV_PO_MRP1_VENDOR_CD(data.VENDOR_CD[0]);

                var tObj = { ...dataQRY_KSV_PO_MRP };
                tObj.PO_CD = tPoCd;
                tObj.PO_SEQ = "";
                tObj.ORDER_CD = "";
                setDataQRY_KSV_PO_MRP(tObj);

                search_LIST_1(tObj);

                setDataQRY_KSV_PO_MRP1({
                    ...dataQRY_KSV_PO_MRP1,
                    FACTORY_CD: data.FACTORY_CD[0].FACTORY_CD,
                });
            } else {
                console.log(
                    "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });
    };

    // Support Area

    const onChangeTextEdit = (e, options) => {
        options.editorCallback(e.target.value);
    };

    const handleFocus = (event) => event.target.select();

    const cellEditorTBL_KSV_PO_MRP = (options) => {
        return (
            <InputText
                type="text"
                value={options.value}
                onChange={(e) => onChangeTextEdit(e, options)}
                onFocus={handleFocus}
            />
        );
    };

    const cellEditorTBL_KSV_PO_MRP1 = (options) => {
        return (
            <InputText
                type="text"
                value={options.value}
                onChange={(e) => onChangeTextEdit(e, options)}
                onFocus={handleFocus}
            />
        );
    };

    const onCellEditCompleteTBL_KSV_PO_MRP = (e) => {
        let { rowData, newValue, field, originalEvent } = e;

        if (newValue !== null && newValue !== rowData[field]) {
            rowData[field] = newValue;
        }
    };

    const onCellEditCompleteTBL_KSV_PO_MRP1 = (e) => {
        let { rowData, newValue, field, originalEvent } = e;

        if (newValue !== null && newValue !== rowData[field]) {
            rowData[field] = newValue;
        }
    };

    return (
        <div className="af-div-main">
            <div
                className="af-div-first"
                style={{ width: "123rem", height: "6rem" }}
            >
                <span className="af-span-3-0" style={{ width: "17rem" }}>
                    <p className="af-span-p" style={{ width: "7rem" }}>PO#</p>
                    <div className="af-span-div" style={{ width: "9rem" }}>
                        <InputText
                            style={{ width: "9rem" }}
                            id="id_PO_SEQ"
                            value={dataQRY_KSV_PO_MRP.PO_CD}
                            onChange={(e) =>
                                onInputChangeQRY_KSV_PO_MRP_PO_CD(e, "PO_CD")
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "17rem" }}>
                    <p className="af-span-p" style={{ width: "7rem" }}>PO Seq</p>
                    <div className="af-span-div" style={{ width: "9rem" }}>
                        <Dropdown
                            style={{ width: "9rem" }}
                            id="id_PO_CD"
                            value={dataQRY_KSV_PO_MRP_PO_SEQ}
                            onChange={(e) =>
                                onDropdownChangeQRY_KSV_PO_MRP_PO_SEQ(
                                    e,
                                    "PO_SEQ",
                                )
                            }
                            options={datasQRY_KSV_PO_MRP_PO_SEQ}
                            optionLabel="PO_SEQ"
                            placeholder=""
                            editable
                        ></Dropdown>
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "20rem" }}>
                    <p className="af-span-p" style={{ width: "7rem" }}>Order#</p>
                    <div className="af-span-div" style={{ width: "12rem" }}>
                        <Dropdown
                            filter
                            style={{ width: "12rem" }}
                            id="id_ORDER_CD"
                            value={dataQRY_KSV_PO_MRP_ORDER_CD}
                            onChange={(e) =>
                                onDropdownChangeQRY_KSV_PO_MRP_ORDER_CD(
                                    e,
                                    "ORDER_CD",
                                )
                            }
                            options={datasQRY_KSV_PO_MRP_ORDER_CD}
                            optionLabel="ORDER_CD"
                            placeholder=""
                            editable
                        ></Dropdown>
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "17rem" }}>
                    <p className="af-span-p" style={{ width: "7rem" }}>Ship Mode</p>
                    <div className="af-span-div" style={{ width: "9rem" }}>
                        <Dropdown
                            style={{ width: "9rem" }}
                            id="id_DELIVERY_TYPE"
                            value={dataQRY_KSV_PO_MRP_DELIVERY_TYPE}
                            onChange={(e) =>
                                onDropdownChangeQRY_KSV_PO_MRP_DELIVERY_TYPE(
                                    e,
                                    "DELIVERY_TYPE",
                                )
                            }
                            options={datasQRY_KSV_PO_MRP_DELIVERY_TYPE}
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
                            label="Reset"
                            style={{ width: "10rem" }}
                            className="p-button-text"
                            onClick={process_RESET}
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "25rem" }}>
                    <div className="af-span-div-btn" style={{ width: "10rem" }}>
                        <Button
                            label="Excel"
                            style={{ width: "10rem" }}
                            className="p-button-text green"
                            onClick={exportExcelTBL_KSV_PO_MRP}
                        />
                    </div>
                </span>

                <span className="af-span-3-0" style={{ width: "11rem" }}>
                    <div className="af-span-div-btn" style={{ width: "10rem" }}>
                        <Button
                            label="Update Seq"
                            style={{ width: "10rem" }}
                            className="p-button-text"
                            onClick={updatePo}
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "11rem" }}>
                    <div className="af-span-div-btn" style={{ width: "10rem" }}>
                        <Button
                            label="delete Seq"
                            style={{ width: "10rem" }}
                            className="p-button-text"
                            onClick={deletePo}
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "11rem" }}>
                    <div className="af-span-div-btn" style={{ width: "10rem" }}>
                        <Button
                            label="Add Seq"
                            style={{ width: "10rem" }}
                            className="p-button-text"
                            onClick={addPo}
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "15rem" }}>
                    <div className="af-span-div-btn" style={{ width: "14rem" }}>
                        <Button
                            label="Add PO Req. List"
                            style={{ width: "14rem" }}
                            className="p-button-text green"
                            onClick={search_REPORT_ADD_MATL_REQ}
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "11rem" }}>
                    <div className="af-span-div-btn" style={{ width: "10rem" }}>
                        <Button
                            label="Debit"
                            style={{ width: "10rem" }}
                            className="p-button-text"
                            onClick={popup_DEBIT_NOTE}
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "11rem" }}>
                    <div className="af-span-div-btn" style={{ width: "10rem" }}>
                        <Button
                            label="Matl Remove"
                            style={{ width: "10rem" }}
                            className="p-button-text"
                            onClick={matlRemove}
                        />
                    </div>
                </span>
            </div>

            <div
                className="af-div-first"
                style={{ width: "123rem", height: "24rem" }}
            >
                <AFDataTable preventUnrelatedRerender
                    ref={dt_TBL_KSV_PO_MRP}
                    editMode="cell"
                    size="small"
                    value={datasTBL_KSV_PO_MRP}
                    loading={loadingTBL_KSV_PO_MRP}
                    tableStyle={{ tableLayout: "fixed" }}
                    resizableColumns
                    columnResizeMode="expand"
                    metaKeySelection={false}
                    showGridlines
                    selectionMode="multiple"
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
                    scrollHeight="260px"
                >
                    <AFColumn selectionMode="multiple" field="__checkbox__" reorderable={false} headerClassName="t-header" headerStyle={{ width: "3rem" }} ></AFColumn>

                    <AFColumn field="PO_SEQ" headerClassName="t-header" header="Po Seq" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="MATL_CD" headerClassName="t-header" header="Matl Cd" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="MATL_NAME" headerClassName="t-header" header="Description" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="COLOR" headerClassName="t-header" header="Color" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="SPEC" headerClassName="t-header" header="Spec" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="MATL_PRICE" headerClassName="t-header" header="Price" style={{ width: "6rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="CURR_CD" headerClassName="t-header" header="Curr" style={{ width: "6rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="UNIT" headerClassName="t-header" header="Unit" style={{ width: "6rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="STOCK_QTY" headerClassName="t-header" header="Stock Qty" style={{ width: "6rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="PO_QTY" headerClassName="t-header" header="Po Qty" style={{ width: "6rem", flexBasis: "auto", color: "green", }} editor={(options) => cellEditorTBL_KSV_PO_MRP(options)} onCellEditComplete={onCellEditCompleteTBL_KSV_PO_MRP} ></AFColumn>
                    <AFColumn field="PO_TYPE_NAME" headerClassName="t-header" header="Po Type" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="REASON_TYPE" headerClassName="t-header" header="Reason Type" headerStyle={{ color: "green" }} style={{ width: "10rem", flexBasis: "auto" }} editor={(options) => cellEditorKSV_PO_MST_DP(options)} onCellEditComplete={onCellEditCompleteKSV_PO_MST_TEXT} ></AFColumn>
                    <AFColumn field="FARE_TYPE" headerClassName="t-header" header="Fare Type" headerStyle={{ color: "green" }} style={{ width: "10rem", flexBasis: "auto" }} editor={(options) => cellEditorKSV_PO_MST_DP(options)} onCellEditComplete={onCellEditCompleteKSV_PO_MST_TEXT} ></AFColumn>
                    <AFColumn field="REMARK" headerClassName="t-header" header="Remark" headerStyle={{ color: "green" }} style={{ width: "10rem", flexBasis: "auto" }} editor={(options) => cellEditorKSV_PO_MST_TEXT(options)} onCellEditComplete={onCellEditCompleteKSV_PO_MST_TEXT} ></AFColumn>
                    <AFColumn field="VENDOR_NAME" headerClassName="t-header" header="Supplier" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="STOCK_STATUS" headerClassName="t-header" header="Stock.S" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="USE_PO_TYPE" headerClassName="t-header" header="Use Po Type.S" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="USE_PO_CD" headerClassName="t-header" header="Use Po Cd" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="USE_PO_SEQ" headerClassName="t-header" header="Use Po Seq" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="USE_ORDER_CD" headerClassName="t-header" header="Use Order" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="USE_MRP_SEQ" headerClassName="t-header" header="Use Mrp Seq" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="USE_MATL_SEQ" headerClassName="t-header" header="Use Matl Seq" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="MATL_SEQ" headerClassName="t-header" header="Matl Seq" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="FACTORY_CD" headerClassName="t-header" header="Factory#" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="STOCK_IDX" headerClassName="t-header" header="Stock Idx" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="ORDER_CD" headerClassName="t-header" header="Order Cd" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                </AFDataTable>
            </div>

            <div
                className="af-div-first"
                style={{ width: "123rem", height: "6rem" }}
            >
                <span className="af-span-3-0" style={{ width: "34rem" }}>
                    <p className="af-span-p" style={{ width: "7rem" }}>Desc</p>
                    <div className="af-span-div" style={{ width: "26rem" }}>
                        <InputText
                            style={{ width: "26rem" }}
                            id="id_MATL_NAME"
                            value={dataQRY_KSV_PO_MRP1.MATL_NAME}
                            onChange={(e) =>
                                onInputChangeQRY_KSV_PO_MRP1_MATL_NAME(
                                    e,
                                    "MATL_NAME",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "26rem" }}>
                    <p className="af-span-p" style={{ width: "7rem" }}>Color</p>
                    <div className="af-span-div" style={{ width: "18rem" }}>
                        <InputText
                            style={{ width: "18rem" }}
                            id="id_COLOR"
                            value={dataQRY_KSV_PO_MRP1.COLOR}
                            onChange={(e) =>
                                onInputChangeQRY_KSV_PO_MRP1_COLOR(e, "COLOR")
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "17rem" }}>
                    <p className="af-span-p" style={{ width: "7rem" }}>Matl#</p>
                    <div className="af-span-div" style={{ width: "9rem" }}>
                        <InputText
                            style={{ width: "9rem" }}
                            id="id_MATL_CD"
                            value={dataQRY_KSV_PO_MRP1.MATL_CD}
                            onChange={(e) =>
                                onInputChangeQRY_KSV_PO_MRP1_MATL_CD(
                                    e,
                                    "MATL_CD",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "11rem" }}>
                    <div className="af-span-div-btn" style={{ width: "10rem" }}>
                        <Button
                            label="Matl Inquiry"
                            style={{ width: "10rem" }}
                            className="p-button-text"
                            onClick={searchMATL_MST}
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "24rem" }}>
                    <div className="af-span-div-btn" style={{ width: "10rem" }}>
                        <Button
                            label="Stock Inquiry"
                            style={{ width: "10rem" }}
                            className="p-button-text"
                            onClick={searchMATL_STOCK}
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "34rem" }}>
                    <p className="af-span-p" style={{ width: "7rem" }}>Spec</p>
                    <div className="af-span-div" style={{ width: "26rem" }}>
                        <InputText
                            style={{ width: "26rem" }}
                            id="id_SPEC"
                            value={dataQRY_KSV_PO_MRP1.SPEC}
                            onChange={(e) =>
                                onInputChangeQRY_KSV_PO_MRP1_SPEC(e, "SPEC")
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "17rem" }}>
                    <p className="af-span-p" style={{ width: "7rem" }}>Supplier</p>
                    <div className="af-span-div" style={{ width: "9rem" }}>
                        <InputText
                            style={{ width: "9rem" }}
                            id="id_SPEC"
                            value={dataQRY_KSV_PO_MRP1.VENDOR_CD}
                            onChange={(e) =>
                                onInputChangeQRY_KSV_PO_MRP1_VENDOR_CD(
                                    e,
                                    "VENDOR_CD",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "26rem" }}>
                    <p className="af-span-p" style={{ width: "7rem" }}>Factory#</p>
                    <div className="af-span-div" style={{ width: "18rem" }}>
                        {/*<InputText style={{ width: '18rem' }} value={dataQRY_KSV_PO_MRP1.FACTORY_CD} onChange={(e) => onInputChangeQRY_KSV_PO_MRP1_FACTORY_CD(e, 'FACTORY_CD')} />*/}
                        <Dropdown
                            style={{ width: "18rem" }}
                            id="id_FACTORY_CD"
                            value={dataQRY_KSV_PO_MRP1_FACTORY_CD}
                            onChange={(e) =>
                                onDropdownChangeQRY_KSV_PO_MRP1_FACTORY_CD(
                                    e,
                                    "FACTORY_CD",
                                )
                            }
                            optionLabel="FACTORY_NAME"
                            options={datasQRY_KSV_PO_MRP1_FACTORY_CD}
                        ></Dropdown>
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "11rem" }}>
                    <div className="af-span-div-btn" style={{ width: "10rem" }}>
                        <Button
                            label="Matl Add"
                            style={{ width: "10rem" }}
                            className="p-button-text"
                            onClick={addMaterial}
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "11rem" }}>
                    <div className="af-span-div-btn" style={{ width: "10rem" }}>
                        <Button
                            label="Reset"
                            style={{ width: "10rem" }}
                            className="p-button-text"
                            onClick={process_RESET_UNDER}
                        />
                    </div>
                </span>
            </div>

            <div
                className="af-div-first"
                style={{ width: "123rem", height: "24rem" }}
            >
                <AFDataTable preventUnrelatedRerender
                    ref={dt_TBL_KSV_PO_MRP1}
                    editMode="cell"
                    size="small"
                    value={datasTBL_KSV_PO_MRP1}
                    tableStyle={{ tableLayout: "fixed" }}
                    loading={loadingTBL_KSV_PO_MRP1}
                    resizableColumns
                    columnResizeMode="expand"
                    showGridlines
                    selectionMode="checkbox"
                    selection={selectedTBL_KSV_PO_MRP1}
                    onSelectionChange={(e) => {
                        setFlagSelectModeTBL_KSV_PO_MRP1(true);
                        setSelectedTBL_KSV_PO_MRP1(e.value);
                        onRowClick1TBL_KSV_PO_MRP1(e.value);
                    }}
                    onRowClick={onRowClickTBL_KSV_PO_MRP1}
                    dataKey="id"
                    className="datatable-responsive"
                    virtualScrollerOptions={{ itemSize: 20 }}
                    emptyMessage=" " //header={headerTBL_KSV_PO_MRP1}
                    responsiveLayout="scroll"
                    scrollable
                    scrollHeight="250px"
                >
                    <AFColumn selectionMode="multiple" field="__checkbox__" reorderable={false} headerClassName="t-header" headerStyle={{ width: "3rem" }} ></AFColumn>

                    <AFColumn field="MATL_CD" headerClassName="t-header" header="Matl Cd" style={{ width: "6rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="MATL_NAME" headerClassName="t-header" header="Description" style={{ width: "15rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="COLOR" headerClassName="t-header" header="Color" style={{ width: "6rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="SPEC" headerClassName="t-header" header="Spec" style={{ width: "6rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="MATL_PRICE" headerClassName="t-header" header="Price" style={{ width: "6rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="CURR_CD" headerClassName="t-header" header="Curr" style={{ width: "6rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="UNIT" headerClassName="t-header" header="Unit" style={{ width: "6rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="STOCK_QTY" headerClassName="t-header" header="Stock Qty" style={{ width: "6rem", flexBasis: "auto" }} ></AFColumn>

                    <AFColumn field="PO_QTY" headerClassName="t-header" header="Po Qty" style={{ color: "green", width: "6rem", flexBasis: "auto", }} editor={(options) => cellEditorTBL_KSV_PO_MRP1(options)} onCellEditComplete={onCellEditCompleteTBL_KSV_PO_MRP1} ></AFColumn>

                    <AFColumn field="PO_TYPE_NAME" headerClassName="t-header" header="Po Type" style={{ width: "6rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="VENDOR_NAME" headerClassName="t-header" header="Supplier" style={{ width: "14rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="STOCK_STATUS" headerClassName="t-header" header="Stock.S" style={{ width: "6rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="USE_PO_CD" headerClassName="t-header" header="Use Po Cd" style={{ width: "6rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="USE_PO_SEQ" headerClassName="t-header" header="Use Po Seq" style={{ width: "6rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="USE_ORDER_CD" headerClassName="t-header" header="Use Order" style={{ width: "6rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="REASON_TYPE" headerClassName="t-header" header="Reason Type" style={{ width: "6rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="FARE_TYPE" headerClassName="t-header" header="Fare Type" style={{ width: "6rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="REMARK" headerClassName="t-header" header="Remark" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="USE_PO_TYPE" headerClassName="t-header" header="Use Po Type.S" style={{ width: "6rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="USE_MRP_SEQ" headerClassName="t-header" header="Use Mrp Seq" style={{ width: "6rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="USE_MATL_SEQ" headerClassName="t-header" header="Use Matl Seq" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="MATL_SEQ" headerClassName="t-header" header="Matl Seq" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="FACTORY_CD" headerClassName="t-header" header="Factory#" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="STOCK_IDX" headerClassName="t-header" header="Stock Idx" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="ORDER_CD" headerClassName="t-header" header="Order Cd" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                </AFDataTable>
            </div>

            <Toast ref={toast} />
        </div>
    );
};

const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(S030505_PO_RECORD_MATL_ADD, comparisonFn);
