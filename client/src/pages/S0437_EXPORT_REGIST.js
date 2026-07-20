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
import { ServiceS0437_EXPORT_REGIST } from "../service/service_biz/ServiceS0437_EXPORT_REGIST";

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
    S_ETD: "",
    E_ETD: "",
    LICENSE_DATE: "",
    PAYMENT_TYPE: "",
    SHIP_DATE: "",
    DESTINATION: "",
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
    PAYMENT_TYPE: "",
    LICENSE_NO: "",
    LICENSE_DATE: "",
    SHIP_MODE: "",
    PLACE_CD: "",
    BL_FILE: "",

    ORIGIN_PORT: "",
    SHIP_LINE: "",
    BL_NO: "",

    ETA: "",
    CONTAINER_NO: "",
    CI_FILE: "",

    DESTINATION: "",
    SINGAPORE_COMBINE: "",
    COST: 0,

    PL_FILE: "",
};

const S0437_EXPORT_REGIST = () => {
    const serviceLibRef = useRef(null);
    if (!serviceLibRef.current) {
        serviceLibRef.current = new ServiceLib();
        serviceLibRef.current.loginConfirm();
    }
    const serviceLib = serviceLibRef.current;
    const serviceS0437_EXPORT_REGISTRef = useRef(null);
    if (!serviceS0437_EXPORT_REGISTRef.current) serviceS0437_EXPORT_REGISTRef.current = new ServiceS0437_EXPORT_REGIST();
    const serviceS0437_EXPORT_REGIST = serviceS0437_EXPORT_REGISTRef.current;

    const toast = useRef(null);

    /* splitter 관련 */
    const [styleVal, setStyleVal] = useState({ width: "65vw" });

    //
    const [urlIframe, setUrlIframe] = useState("");
    const [createDialog, setCreateDialog] = useState(false);
    const hideDialog = () => {
        setCreateDialog(false);
    };

    // Search

    // Search KSV_STOCK_MEM
    const search_LIST_1 = () => {
        var tRetDate = serviceLib.getCurrDate().substring(0, 8);

        setSelectedTBL_KSV_PO_MRP2([]);
        setDatasTBL_KSV_PO_MRP2([]);

        var tObj = { ...dataQRY_KSV_PO_MRP };
        setLoadingTBL_KSV_PO_MRP(true);

        // 3_3
        serviceS0437_EXPORT_REGIST.mgrQuery_LIST_1(tObj).then((data) => {
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

    const process_EXPORT_REGIST = () => {
        var tInput = [...selectedTBL_KSV_PO_MRP];

        var tFlag = 0;
        var tObjs = tInput.map((col, i) => {
            var tObj = { ...col };
            if (typeof tObj.__typename !== "undefined") delete tObj.__typename;
            if (typeof tObj.id !== "undefined") delete tObj.id;
            if (tObj.STATUS === "export") tFlag = 1;
            return tObj;
        });

        if (tFlag === 1) {
            alert("이미 수출등록되었습니다<br><br>Already registered for export");
            return;
        }

        var _tObj0 = { ...dataEDT_KSV_PO_MRP };
        var tInput1 = {};
        tInput1.PAYMENT_TYPE = _tObj0.PAYMENT_TYPE;
        tInput1.LICENSE_DATE = _tObj0.LICENSE_DATE;
        tInput1.LICENSE_NO = _tObj0.LICENSE_NO;
        tInput1.REG_USER = serviceLib.getUserInfo().USER_ID;

        if (tInput1.PAYMENT_TYPE === "") {
            alert("Payment는 필수입력값 입니다.<br><br>Payment is a required input.");
            return;
        }
        if (tInput1.LICENSE_DATE === "") {
            alert("License Date는 필수입력값 입니다.<br><br>License Date is a required input value.");
            return;
        }
        if (tInput1.LICENSE_NO === "") {
            alert("License No는 필수입력값 입니다.<br><br>License No is a required input value.");
            return;
        }

        setSelectedTBL_KSV_PO_MRP([]);

        setLoadingTBL_KSV_PO_MRP(true);
        serviceS0437_EXPORT_REGIST
            .mgrInsert_EXPORT_REGIST(tObjs, tInput1)
            .then((data) => {
                setLoadingTBL_KSV_PO_MRP(false);
                if (typeof data.graphQLErrors === "undefined") {
                    if (data.length > 0) {
                        alert(data[0].CODE);
                        if (data[0].CODE.includes("SUCC")) {
                            search_LIST_1();
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

    const onCalChangeQRY_KSV_PO_MRP_SHIP_DATE = (e, name) => {
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
    const onCalChangeQRY_KSV_PO_MRP_LICENSE_DATE = (e, name) => {
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
    const onCalChangeQRY_KSV_PO_MRP_S_ETD = (e, name) => {
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
    const onCalChangeQRY_KSV_PO_MRP_E_ETD = (e, name) => {
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
        datasQRY_KSV_PO_MRP_PAYMENT_TYPE,
        setDatasQRY_KSV_PO_MRP_PAYMENT_TYPE,
    ] = useState([]);
    const [
        dataQRY_KSV_PO_MRP_PAYMENT_TYPE,
        setDataQRY_KSV_PO_MRP_PAYMENT_TYPE,
    ] = useState({});

    const onDropdownChangeQRY_KSV_PO_MRP_PAYMENT_TYPE = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataQRY_KSV_PO_MRP = { ...dataQRY_KSV_PO_MRP };

        let tTypeVal = _dataQRY_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_PO_MRP[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_PO_MRP[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_PO_MRP(_dataQRY_KSV_PO_MRP);
        setDataQRY_KSV_PO_MRP_PAYMENT_TYPE(e.value);
    };

    const [
        datasQRY_KSV_PO_MRP_ORIGIN_PORT,
        setDatasQRY_KSV_PO_MRP_ORIGIN_PORT,
    ] = useState([]);
    const [dataQRY_KSV_PO_MRP_ORIGIN_PORT, setDataQRY_KSV_PO_MRP_ORIGIN_PORT] =
        useState({});

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
    const [datasTBL_KSV_PO_MRP, setDatasTBL_KSV_PO_MRP] = useState([]);
    const dt_TBL_KSV_PO_MRP = useRef(null);
    const [dataTBL_KSV_PO_MRP, setDataTBL_KSV_PO_MRP] =
        useState(emptyTBL_KSV_PO_MRP);
    const [selectedTBL_KSV_PO_MRP, setSelectedTBL_KSV_PO_MRP] = useState([]);
    const [flagSelectModeTBL_KSV_PO_MRP, setFlagSelectModeTBL_KSV_PO_MRP] =
        useState(false);

    const [loadingTBL_KSV_PO_MRP, setLoadingTBL_KSV_PO_MRP] = useState(false);

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

    /* QRY KSV_PO_MRP*/
    const [dataEDT_KSV_PO_MRP, setDataEDT_KSV_PO_MRP] =
        useState(emptyEDT_KSV_PO_MRP);

    const [datasEDT_KSV_PO_MRP_SHIP_MODE, setDatasEDT_KSV_PO_MRP_SHIP_MODE] =
        useState([]);
    const [dataEDT_KSV_PO_MRP_SHIP_MODE, setDataEDT_KSV_PO_MRP_SHIP_MODE] =
        useState({});

    const [
        datasEDT_KSV_PO_MRP_PAYMENT_TYPE,
        setDatasEDT_KSV_PO_MRP_PAYMENT_TYPE,
    ] = useState([]);
    const [
        dataEDT_KSV_PO_MRP_PAYMENT_TYPE,
        setDataEDT_KSV_PO_MRP_PAYMENT_TYPE,
    ] = useState({});

    const onDropdownChangeEDT_KSV_PO_MRP_PAYMENT_TYPE = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataEDT_KSV_PO_MRP = { ...dataEDT_KSV_PO_MRP };

        let tTypeVal = _dataEDT_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_KSV_PO_MRP[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_KSV_PO_MRP[`${name}`] = parseInt(val);
        }

        setDataEDT_KSV_PO_MRP(_dataEDT_KSV_PO_MRP);
        setDataEDT_KSV_PO_MRP_PAYMENT_TYPE(e.value);
    };

    const [datasEDT_KSV_PO_MRP_SHIP_LINE, setDatasEDT_KSV_PO_MRP_SHIP_LINE] =
        useState([]);
    const [dataEDT_KSV_PO_MRP_SHIP_LINE, setDataEDT_KSV_PO_MRP_SHIP_LINE] =
        useState({});

    const [datasEDT_KSV_PO_MRP_PLACE_CD, setDatasEDT_KSV_PO_MRP_PLACE_CD] =
        useState([]);
    const [dataEDT_KSV_PO_MRP_PLACE_CD, setDataEDT_KSV_PO_MRP_PLACE_CD] =
        useState({});

    const onInputChangeEDT_KSV_PO_MRP_LICENSE_NO = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_PO_MRP = { ...dataEDT_KSV_PO_MRP };

        let tTypeVal = _dataEDT_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string") _dataEDT_KSV_PO_MRP[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_PO_MRP[`${name}`] = parseInt(val);

        setDataEDT_KSV_PO_MRP(_dataEDT_KSV_PO_MRP);
    };

    const onCalChangeEDT_KSV_PO_MRP_LICENSE_DATE = (e, name) => {
        let val1 = e.value || "";
        let val = "";
        if (val1 === "") {
            val = "";
        } else {
            val = getDateVal(val1);
        }

        let _dataEDT_KSV_PO_MRP = { ...dataEDT_KSV_PO_MRP };
        _dataEDT_KSV_PO_MRP[`${name}`] = val;
        setDataEDT_KSV_PO_MRP(_dataEDT_KSV_PO_MRP);
    };

    const [
        datasEDT_KSV_PO_MRP_DESTINATION,
        setDatasEDT_KSV_PO_MRP_DESTINATION,
    ] = useState([]);
    const [dataEDT_KSV_PO_MRP_DESTINATION, setDataEDT_KSV_PO_MRP_DESTINATION] =
        useState({});

    ///

    useEffect(() => {
        var tObj = {};
        serviceS0437_EXPORT_REGIST.mgrQuery_CODE(tObj).then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                setDatasEDT_KSV_PO_MRP_PAYMENT_TYPE(data.PAYMENT);
                setDataEDT_KSV_PO_MRP_PAYMENT_TYPE(data.PAYMENT[0]);

                setDatasQRY_KSV_PO_MRP_PAYMENT_TYPE(data.PAYMENT);
                setDataQRY_KSV_PO_MRP_PAYMENT_TYPE(data.PAYMENT[0]);

                setDatasQRY_KSV_PO_MRP_DESTINATION(data.DESTINATION);
                setDataQRY_KSV_PO_MRP_DESTINATION(data.DESTINATION[0]);

                setDatasQRY_KSV_PO_MRP_STATUS_CD(data.STATUS_CD);
                setDataQRY_KSV_PO_MRP_STATUS_CD(data.STATUS_CD[0]);

                var tRetDate = serviceLib.getCurrDate().substring(0, 8);
                var tObj = { ...dataQRY_KSV_PO_MRP };
                tObj.S_ETD = "";
                tObj.E_ETD = tRetDate;
                setDataQRY_KSV_PO_MRP(tObj);
            } else {
                console.log(
                    "mgrQuery_PO_CD error => " +
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
                <span className="af-span-3-0" style={{ width: "14rem" }}>
                    <p className="af-span-p" style={{ width: "5rem" }}>Status</p>
                    <div className="af-span-div" style={{ width: "8rem" }}>
                        <Dropdown
                            style={{ width: "8rem" }}
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
                <span className="af-span-3-0" style={{ width: "14rem" }}>
                    <p className="af-span-p" style={{ width: "5rem" }}>ETD</p>
                    <div className="af-span-div" style={{ width: "8rem" }}>
                        <Calendar
                            showButtonBar
                            style={{ width: "8rem" }}
                            dateFormat="yy-mm-dd"
                            id="id_ETA"
                            value={changeDateVal(dataQRY_KSV_PO_MRP.S_ETD)}
                            onChange={(e) =>
                                onCalChangeQRY_KSV_PO_MRP_S_ETD(e, "S_ETD")
                            }
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
                            id="id_ETA"
                            value={changeDateVal(dataQRY_KSV_PO_MRP.E_ETD)}
                            onChange={(e) =>
                                onCalChangeQRY_KSV_PO_MRP_E_ETD(e, "E_ETD")
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "19rem" }}>
                    <p className="af-span-p" style={{ width: "10rem" }}>License Date</p>
                    <div className="af-span-div" style={{ width: "8rem" }}>
                        <Calendar
                            showButtonBar
                            style={{ width: "8rem" }}
                            dateFormat="yy-mm-dd"
                            id="id_ETA"
                            value={changeDateVal(
                                dataQRY_KSV_PO_MRP.LICENSE_DATE,
                            )}
                            onChange={(e) =>
                                onCalChangeQRY_KSV_PO_MRP_LICENSE_DATE(
                                    e,
                                    "LICENSE_DATE",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "17rem" }}>
                    <p className="af-span-p" style={{ width: "6rem" }}>Payment</p>
                    <div className="af-span-div" style={{ width: "10rem" }}>
                        <Dropdown
                            style={{ width: "10rem" }}
                            id="id_STATUS_CD"
                            value={dataQRY_KSV_PO_MRP_PAYMENT_TYPE}
                            onChange={(e) =>
                                onDropdownChangeQRY_KSV_PO_MRP_PAYMENT_TYPE(
                                    e,
                                    "PAYMENT_TYPE",
                                )
                            }
                            options={datasQRY_KSV_PO_MRP_PAYMENT_TYPE}
                            optionLabel="CD_NAME"
                            placeholder=""
                            editable
                            filter
                        ></Dropdown>
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "17rem" }}>
                    <p className="af-span-p" style={{ width: "8rem" }}>Ship Date</p>
                    <div className="af-span-div" style={{ width: "8rem" }}>
                        <Calendar
                            showButtonBar
                            style={{ width: "8rem" }}
                            dateFormat="yy-mm-dd"
                            id="id_ETA"
                            value={changeDateVal(dataQRY_KSV_PO_MRP.SHIP_DATE)}
                            onChange={(e) =>
                                onCalChangeQRY_KSV_PO_MRP_SHIP_DATE(
                                    e,
                                    "SHIP_DATE",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "17rem" }}>
                    <p className="af-span-p" style={{ width: "8rem" }}>Destination</p>
                    <div className="af-span-div" style={{ width: "8rem" }}>
                        <Dropdown
                            style={{ width: "8rem" }}
                            id="id_STATUS_CD"
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
            </div>

            <div
                className="af-div-first"
                style={{ width: "123rem", height: "50rem" }}
            >
                <AFDataTable preventUnrelatedRerender
                    ref={dt_TBL_KSV_PO_MRP}
                    size="small"
                    value={datasTBL_KSV_PO_MRP}
                    tableStyle={{ tableLayout: "fixed" }}
                    loading={loadingTBL_KSV_PO_MRP}
                    metaKeySelection={false}
                    showGridlines
                    selectionMode="multiple"
                    resizableColumns
                    columnResizeMode="expand"
                    selection={selectedTBL_KSV_PO_MRP}
                    onSelectionChange={(e) => {
                        setSelectedTBL_KSV_PO_MRP(e.value);
                        onRowClick1TBL_KSV_PO_MRP(e.value);
                    }}
                    onRowClick={onRowClickTBL_KSV_PO_MRP}
                    dataKey="id"
                    className="datatable-responsive"
                    virtualScrollerOptions={{ itemSize: 20 }}
                    emptyMessage=" " //header={headerTBL_KSV_PO_MRP}
                    responsiveLayout="scroll"
                    loading={loadingTBL_KSV_PO_MRP}
                    scrollable
                    scrollHeight="50rem"
                >
                    <AFColumn field="STATUS" headerClassName="t-header" header="Status" style={{ width: "6rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="ETD" headerClassName="t-header" header="ETD" style={{ width: "6rem", height: "1.8rem", flexBasis: "auto", }} body={(rowData) => serviceLib.dateFormat(rowData.ETD)} ></AFColumn>
                    <AFColumn field="SHIP_MODE_N" headerClassName="t-header" header="Ship.M" style={{ width: "6rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="DESTINATION" headerClassName="t-header" header="Destination" style={{ width: "6rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="BL_NO" headerClassName="t-header" header="B/L#" style={{ width: "6rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="INVOICE_NO" headerClassName="t-header" header="C/I#" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="S_AMT" headerClassName="t-header" header="Amt" style={{ width: "8rem", height: "1.8rem", flexBasis: "auto", }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.S_AMT, 2) } ></AFColumn>
                    <AFColumn field="LICENSE_DATE" headerClassName="t-header" header="수출신고일" style={{ width: "6rem", height: "1.8rem", flexBasis: "auto", }} body={(rowData) => serviceLib.dateFormat(rowData.ETD)} ></AFColumn>
                    <AFColumn field="LICENSE_NO" headerClassName="t-header" header="수출신고번호" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="PAYMENT_TYPE_N" headerClassName="t-header" header="Payment" style={{ width: "4rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="DOCU_NO" headerClassName="t-header" header="전표번호" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                </AFDataTable>
            </div>

            <div
                className="af-div-first"
                style={{ width: "123rem", height: "3rem" }}
            >
                <span className="af-span-3-0" style={{ width: "20rem" }}>
                    <p className="af-span-p" style={{ width: "7rem" }}>Payment</p>
                    <div className="af-span-div" style={{ width: "12rem" }}>
                        <Dropdown
                            style={{ width: "12rem" }}
                            id="id_SHIP_MODE"
                            value={dataEDT_KSV_PO_MRP_PAYMENT_TYPE}
                            onChange={(e) =>
                                onDropdownChangeEDT_KSV_PO_MRP_PAYMENT_TYPE(
                                    e,
                                    "PAYMENT_TYPE",
                                )
                            }
                            options={datasEDT_KSV_PO_MRP_PAYMENT_TYPE}
                            optionLabel="CD_NAME"
                            placeholder=""
                        ></Dropdown>
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "25rem" }}>
                    <p className="af-span-p" style={{ width: "12rem" }}>License Date</p>
                    <div className="af-span-div" style={{ width: "12rem" }}>
                        <Calendar
                            showButtonBar
                            dateFormat="yy-mm-dd"
                            id="id_ETA"
                            value={changeDateVal(
                                dataEDT_KSV_PO_MRP.LICENSE_DATE,
                            )}
                            onChange={(e) =>
                                onCalChangeEDT_KSV_PO_MRP_LICENSE_DATE(
                                    e,
                                    "LICENSE_DATE",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "25rem" }}>
                    <p className="af-span-p" style={{ width: "12rem" }}>License No</p>
                    <div className="af-span-div" style={{ width: "12rem" }}>
                        <InputText
                            style={{ width: "12rem" }}
                            id="id_BL_FILE"
                            value={dataEDT_KSV_PO_MRP.LICENSE_NO}
                            onChange={(e) =>
                                onInputChangeEDT_KSV_PO_MRP_LICENSE_NO(
                                    e,
                                    "LICENSE_NO",
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
                            label="Save"
                            className="p-button-text"
                            onClick={process_EXPORT_REGIST}
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "11rem" }}>
                    <div className="af-span-div-btn" style={{ width: "10rem" }}>
                        <Button
                            style={{ width: "10rem" }}
                            label="Cancel"
                            className="p-button-text"
                            onClick={blankFn}
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "11rem" }}>
                    <div className="af-span-div-btn" style={{ width: "10rem" }}>
                        <Button
                            style={{ width: "10rem" }}
                            label="Reset"
                            className="p-button-text"
                            onClick={blankFn}
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
            >
                <iframe
                    src={urlIframe}
                    width="1400px"
                    height="1000px"
                    id="id1"
                    className="myClassname"
                    scrolling="yes"
                />
            </Dialog>
        </div>
    );
};

const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(S0437_EXPORT_REGIST, comparisonFn);
