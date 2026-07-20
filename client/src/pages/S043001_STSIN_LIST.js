/* eslint-disable */
import React, {
    useState,
    useEffect,
    useRef,
    useMemo,
    useCallback,
} from "react";
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
import { ServiceS043001_STSIN_LIST } from "../service/service_biz/ServiceS043001_STSIN_LIST";

import "./page_common.scss";

const emptyKCD_CODE = {
    id: 0,
    CD_GROUP: "",
    CD_CODE: "",
    CD_NAME: "",
    CD_FLAG: "",
};

const emptyQRY_KSV_PO_MRP = {
    USER_ID: "",
    BUYER_CD: "",
    PO_CD: "",
    VENDOR_CD: "",
    MRP_DATE: "",
    PU_STATUS: "",
};

const emptyQRY_KSV_PO_MRP2 = {
    IN_QTY: "",
};

const emptyQRY_KSV_PO_MRP1 = {
    PU_CD: "",
    VENDOR_CD: "",
    S_EX_FACTORY: "",
    E_EX_FACTORY: "",

    REG_USER: "",
    VENDOR_TYPE: "",
    S_PAY_DATE: "",
    E_PAY_DATE: "",

    BUYER_CD: "",
    SHIP_TO: "",
    BILL_TO: "",
    PO_CD: "",
    MATL_CD: "",
    MATL_NAME: "",
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

const emptyTBL_KSV_PO_MRP3 = {
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
    INVOICE_NO: "",
    PAY_TERM: "",
    CT_QTY: "",

    READY_DATE: "",
    ORIGIN_PORT: "",
    WEIGHT: "",

    TARGET_ETA: "",
    DESTINATION: "",
    CBM: "",
};

const S043001_STSIN_LIST = () => {
    const serviceLibRef = useRef(null);
    if (!serviceLibRef.current) {
        serviceLibRef.current = new ServiceLib();
        serviceLibRef.current.loginConfirm();
    }
    const serviceLib = serviceLibRef.current;
    const serviceS043001_STSIN_LISTRef = useRef(null);
    if (!serviceS043001_STSIN_LISTRef.current) serviceS043001_STSIN_LISTRef.current = new ServiceS043001_STSIN_LIST();
    const serviceS043001_STSIN_LIST = serviceS043001_STSIN_LISTRef.current;

    const toast = useRef(null);

    /* splitter 관련 */
    const [styleVal, setStyleVal] = useState({ width: "65vw" });

    const [sumInQty, setSumInQty] = useState("");

    // dialog
    const [urlIframe, setUrlIframe] = useState("");
    const [createDialog, setCreateDialog] = useState(false);
    const hideDialog = () => {
        setCreateDialog(false);
    };

    // Search

    // Search KSV_STOCK_MEM

    const search_LIST_2 = (argData) => {
        var tObj0 = { ...dataQRY_KSV_PO_MRP1 };

        if (
            !tObj0.PO_CD &&
            !tObj0.PU_CD &&
            !tObj0.VENDOR_CD &&
            !tObj0.MATL_CD &&
            !tObj0.MATL_NAME
        ) {
            if (tObj0.S_PAY_DATE || tObj0.E_PAY_DATE) ;
            else if (tObj0.S_EX_FACTORY || tObj0.E_EX_FACTORY) ;
            else {
                alert(
                    "PO_CD, PU_CD, Vendor, Matl#, Desc 중 하나는 입력하신후 조회하세요<br><br>Enter one of PO_CD, PU_CD, Vendor, Matl#, or Desc and search.",
                );
                return;
            }
        }

        var tObj = { ...tObj0 };
        tObj.PO_CD = tObj0.PO_CD.trim();
        tObj.PU_CD = tObj0.PU_CD.trim();
        tObj.MATL_CD = tObj0.MATL_CD.trim();
        tObj.MATL_NAME = tObj0.MATL_NAME.trim();

        setLoadingTBL_KSV_PO_MRP2(true);
        setDatasTBL_KSV_PO_MRP2([]);
        setSelectedTBL_KSV_PO_MRP2([]);

        // 4_2
        serviceS043001_STSIN_LIST.mgrQuery_LIST_2(tObj).then((data) => {
            setLoadingTBL_KSV_PO_MRP2(false);
            if (typeof data.graphQLErrors === "undefined") {
                var tArray = data.map((col, i) => {
                    var tObj = { ...col };
                    tObj.id = i + 1;
                    return tObj;
                });
                setDatasTBL_KSV_PO_MRP2(tArray);
            } else {
                console.log(
                    "mgrQuery_PO_CD error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });
    };

    const search_LIST_3 = useCallback(
        (argData) => {
            setLoadingTBL_KSV_PO_MRP3(true);
            setDatasTBL_KSV_PO_MRP3([]);
            setSelectedTBL_KSV_PO_MRP3([]);

            // 4_2
            serviceS043001_STSIN_LIST.mgrQuery_LIST_3(argData).then((data) => {
                setLoadingTBL_KSV_PO_MRP3(false);
                if (typeof data.graphQLErrors === "undefined") {
                    var tArray = data.map((col, i) => {
                        var tObj = { ...col };
                        tObj.id = i + 1;
                        return tObj;
                    });
                    setDatasTBL_KSV_PO_MRP3(tArray);
                } else {
                    console.log(
                        "mgrQuery_PO_CD error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });
        },
        [serviceS043001_STSIN_LIST],
    );

    const process_CANCEL_STSIN = () => {
        var _tDatas = [...selectedTBL_KSV_PO_MRP2];
        if (_tDatas.length <= 0) return;

        var tCntFull = 0;
        var tCntPart = 0;

        var tInputArray = _tDatas.map((col, i) => {
            var tObj = { ...col };
            if (typeof tObj.id !== "undefined") delete tObj.id;
            if (typeof tObj.__typename !== "undefined") delete tObj.__typename;
            if (tObj.STSIN_TYPE.includes("PART")) tCntPart += 1;
            if (tObj.STSIN_TYPE.includes("FULL")) tCntFull += 1;
            return tObj;
        });

        if (tCntFull > 0 && tCntPart > 0) {
            alert("Full-In , Part-In을 함께 Cancel 할수 없습니다<br><br>Full-In and Part-In cannot be canceled together.");
            return;
        }

        setLoadingTBL_KSV_PO_MRP2(true);

        serviceS043001_STSIN_LIST
            .mgrDelete_CANCEL_STSIN(tInputArray)
            .then((data) => {
                setLoadingTBL_KSV_PO_MRP2(false);
                if (typeof data.graphQLErrors === "undefined") {
                    if (data.length > 0) {
                        alert(data[0].CODE);

                        setSelectedTBL_KSV_PO_MRP2([]);

                        if (data[0].CODE.includes("SUCC")) {
                            var tObj0 = { ...dataTBL_KSV_PO_MRP };
                            var tInput0 = {};
                            tInput0.PU_CD = tObj0.PU_CD;
                            search_LIST_2(tInput0);
                        }
                    }
                } else {
                    // console.log("mgrQuery_PO_CD error => " + JSON.stringify(data.graphQLErrors));
                    toast.current.show({
                        severity: "success",
                        summary: "Fail:Stock_in Cancel",
                        detail: "",
                        life: 3000,
                    });
                }
            });
    };

    const process_Leader_Confirm = () => {
        var _tDatas = [...selectedTBL_KSV_PO_MRP2];
        if (_tDatas.length <= 0) return;

        var tFlag = 0;
        var tArray = [];
        var tInputArray = _tDatas.map((col, i) => {
            var tObj = { ...col };
            if (typeof tObj.id !== "undefined") delete tObj.id;
            if (typeof tObj.__typename !== "undefined") delete tObj.__typename;
            if (tObj.BILL_TO === "SHINTS") tArray.push(tObj);
            return tObj;
        });

        setLoadingTBL_KSV_PO_MRP2(true);

        serviceS043001_STSIN_LIST
            .mgrUpdate_Leader_Confirm(tArray)
            .then((data) => {
                setLoadingTBL_KSV_PO_MRP2(false);
                if (typeof data.graphQLErrors === "undefined") {
                    if (data.length > 0) alert(data[0].CODE);
                    if (data[0].CODE.includes("SUCC")) {
                        setSelectedTBL_KSV_PO_MRP2([]);
                        var tObj0 = { ...dataTBL_KSV_PO_MRP };
                        var tInput0 = {};
                        tInput0.PU_CD = tObj0.PU_CD;
                        search_LIST_2(tInput0);
                    }
                } else {
                    // console.log("mgrQuery_PO_CD error => " + JSON.stringify(data.graphQLErrors));
                    toast.current.show({
                        severity: "success",
                        summary: "Fail:Stock_in Cancel",
                        detail: "",
                        life: 3000,
                    });
                }
            });
    };

    /* QRY KSV_PO_MRP*/
    const [dataQRY_KSV_PO_MRP, setDataQRY_KSV_PO_MRP] =
        useState(emptyQRY_KSV_PO_MRP);

    const [datasQRY_KSV_PO_MRP_PU_STATUS, setDatasQRY_KSV_PO_MRP_PU_STATUS] =
        useState([]);
    const [dataQRY_KSV_PO_MRP_PU_STATUS, setDataQRY_KSV_PO_MRP_PU_STATUS] =
        useState({});

    /* QRY KSV_PO_MRP*/
    const [dataQRY_KSV_PO_MRP2, setDataQRY_KSV_PO_MRP2] =
        useState(emptyQRY_KSV_PO_MRP2);

    /* QRY KSV_PO_MRP*/
    const [dataQRY_KSV_PO_MRP1, setDataQRY_KSV_PO_MRP1] =
        useState(emptyQRY_KSV_PO_MRP1);

    const onInputChangeQRY_KSV_PO_MRP1_PU_CD = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_PO_MRP1 = { ...dataQRY_KSV_PO_MRP1 };

        let tTypeVal = _dataQRY_KSV_PO_MRP1[`${name}`];
        if (typeof tTypeVal === "string") _dataQRY_KSV_PO_MRP1[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_PO_MRP1[`${name}`] = parseInt(val);

        setDataQRY_KSV_PO_MRP1(_dataQRY_KSV_PO_MRP1);
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

    const onCalChangeQRY_KSV_PO_MRP1_S_EX_FACTORY = (e, name) => {
        let val1 = e.value || "";
        let val = "";
        if (val1 === "") {
            val = "";
        } else {
            val = getDateVal(val1);
        }

        let _dataQRY_KSV_PO_MRP1 = { ...dataQRY_KSV_PO_MRP1 };
        _dataQRY_KSV_PO_MRP1[`${name}`] = val;
        setDataQRY_KSV_PO_MRP1(_dataQRY_KSV_PO_MRP1);
    };

    const onCalChangeQRY_KSV_PO_MRP1_E_EX_FACTORY = (e, name) => {
        let val1 = e.value || "";
        let val = "";
        if (val1 === "") {
            val = "";
        } else {
            val = getDateVal(val1);
        }

        let _dataQRY_KSV_PO_MRP1 = { ...dataQRY_KSV_PO_MRP1 };
        _dataQRY_KSV_PO_MRP1[`${name}`] = val;
        setDataQRY_KSV_PO_MRP1(_dataQRY_KSV_PO_MRP1);
    };

    const onInputChangeQRY_KSV_PO_MRP1_REG_USER = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_PO_MRP1 = { ...dataQRY_KSV_PO_MRP1 };

        let tTypeVal = _dataQRY_KSV_PO_MRP1[`${name}`];
        if (typeof tTypeVal === "string") _dataQRY_KSV_PO_MRP1[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_PO_MRP1[`${name}`] = parseInt(val);

        setDataQRY_KSV_PO_MRP1(_dataQRY_KSV_PO_MRP1);
    };

    const [
        datasQRY_KSV_PO_MRP1_VENDOR_TYPE,
        setDatasQRY_KSV_PO_MRP1_VENDOR_TYPE,
    ] = useState([]);
    const [
        dataQRY_KSV_PO_MRP1_VENDOR_TYPE,
        setDataQRY_KSV_PO_MRP1_VENDOR_TYPE,
    ] = useState({});

    const onDropdownChangeQRY_KSV_PO_MRP1_VENDOR_TYPE = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataQRY_KSV_PO_MRP1 = { ...dataQRY_KSV_PO_MRP1 };

        let tTypeVal = _dataQRY_KSV_PO_MRP1[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_PO_MRP1[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_PO_MRP1[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_PO_MRP1(_dataQRY_KSV_PO_MRP1);
        setDataQRY_KSV_PO_MRP1_VENDOR_TYPE(e.value);
    };

    const onCalChangeQRY_KSV_PO_MRP1_S_PAY_DATE = (e, name) => {
        let val1 = e.value || "";
        let val = "";
        if (val1 === "") {
            val = "";
        } else {
            val = getDateVal(val1);
        }

        let _dataQRY_KSV_PO_MRP1 = { ...dataQRY_KSV_PO_MRP1 };
        _dataQRY_KSV_PO_MRP1[`${name}`] = val;
        setDataQRY_KSV_PO_MRP1(_dataQRY_KSV_PO_MRP1);
    };

    const onCalChangeQRY_KSV_PO_MRP1_E_PAY_DATE = (e, name) => {
        let val1 = e.value || "";
        let val = "";
        if (val1 === "") {
            val = "";
        } else {
            val = getDateVal(val1);
        }

        let _dataQRY_KSV_PO_MRP1 = { ...dataQRY_KSV_PO_MRP1 };
        _dataQRY_KSV_PO_MRP1[`${name}`] = val;
        setDataQRY_KSV_PO_MRP1(_dataQRY_KSV_PO_MRP1);
    };

    const [datasQRY_KSV_PO_MRP1_BUYER_CD, setDatasQRY_KSV_PO_MRP1_BUYER_CD] =
        useState([]);
    const [dataQRY_KSV_PO_MRP1_BUYER_CD, setDataQRY_KSV_PO_MRP1_BUYER_CD] =
        useState({});

    const onDropdownChangeQRY_KSV_PO_MRP1_BUYER_CD = (e, name) => {
        let val = (e.value && e.value.BUYER_CD) || "";

        let _dataQRY_KSV_PO_MRP1 = { ...dataQRY_KSV_PO_MRP1 };

        let tTypeVal = _dataQRY_KSV_PO_MRP1[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_PO_MRP1[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_PO_MRP1[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_PO_MRP1(_dataQRY_KSV_PO_MRP1);
        setDataQRY_KSV_PO_MRP1_BUYER_CD(e.value);
    };

    const onInputChangeQRY_KSV_PO_MRP1_SHIP_TO = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_PO_MRP1 = { ...dataQRY_KSV_PO_MRP1 };

        let tTypeVal = _dataQRY_KSV_PO_MRP1[`${name}`];
        if (typeof tTypeVal === "string") _dataQRY_KSV_PO_MRP1[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_PO_MRP1[`${name}`] = parseInt(val);

        setDataQRY_KSV_PO_MRP1(_dataQRY_KSV_PO_MRP1);
    };

    const onInputChangeQRY_KSV_PO_MRP1_BILL_TO = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_PO_MRP1 = { ...dataQRY_KSV_PO_MRP1 };

        let tTypeVal = _dataQRY_KSV_PO_MRP1[`${name}`];
        if (typeof tTypeVal === "string") _dataQRY_KSV_PO_MRP1[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_PO_MRP1[`${name}`] = parseInt(val);

        setDataQRY_KSV_PO_MRP1(_dataQRY_KSV_PO_MRP1);
    };

    const onInputChangeQRY_KSV_PO_MRP1_PO_CD = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_PO_MRP1 = { ...dataQRY_KSV_PO_MRP1 };

        let tTypeVal = _dataQRY_KSV_PO_MRP1[`${name}`];
        if (typeof tTypeVal === "string") _dataQRY_KSV_PO_MRP1[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_PO_MRP1[`${name}`] = parseInt(val);

        setDataQRY_KSV_PO_MRP1(_dataQRY_KSV_PO_MRP1);
    };

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

    const onRowClick1TBL_KSV_PO_MRP2 = useCallback((argData0) => {
        var sumVal = 0;
        argData0.forEach((col, i) => {
            sumVal += parseFloat(col.STSIN_QTY);
        });
        setSumInQty(String(sumVal));
    }, []);

    const onRowSelectTBL_KSV_PO_MRP2 = useCallback((event) => {}, []);

    const onRowUnSelectTBL_KSV_PO_MRP2 = useCallback((event) => {}, []);

    const onRowClickTBL_KSV_PO_MRP2 = useCallback(
        (event) => {
            let argTBL_KSV_PO_MRP2 = event.data;
            if (flagSelectModeTBL_KSV_PO_MRP2) return;

            // Service : NawooAll:mgrQueryTBL_KSV_PO_MRP2

            var tInObj = {};
            tInObj.STSIN_CD = event.data.STSIN_CD;
            tInObj.PO_CD = event.data.PO_CD;
            tInObj.VENDOR_CD = event.data.VENDOR_CD;
            tInObj.IN_DATETIME = event.data.IN_DATETIME;

            search_LIST_3(tInObj);
        },
        [flagSelectModeTBL_KSV_PO_MRP2, search_LIST_3],
    );

    const exportExcelTBL_KSV_PO_MRP2 = () => {
        var tArray = [];
        datasTBL_KSV_PO_MRP2.forEach((col, i) => {
            var tObj = { ...col };
            tObj.STSIN_QTY = parseFloat(tObj.STSIN_QTY);
            tObj.LC_QTY = parseFloat(tObj.LC_QTY);
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
            saveAsExcelFileTBL_KSV_PO_MRP2(excelBuffer, "스타일목록");
        });
    };

    const saveAsExcelFileTBL_KSV_PO_MRP2 = (buffer, fileName) => {
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
    // DEFINE DATAGRID : TBL_KSV_PO_MRP3
    const [loadingTBL_KSV_PO_MRP3, setLoadingTBL_KSV_PO_MRP3] = useState(false);

    const [datasTBL_KSV_PO_MRP3, setDatasTBL_KSV_PO_MRP3] = useState([]);
    const dt_TBL_KSV_PO_MRP3 = useRef(null);
    const [dataTBL_KSV_PO_MRP3, setDataTBL_KSV_PO_MRP3] =
        useState(emptyTBL_KSV_PO_MRP3);
    const [selectedTBL_KSV_PO_MRP3, setSelectedTBL_KSV_PO_MRP3] = useState([]);
    const [flagSelectModeTBL_KSV_PO_MRP3, setFlagSelectModeTBL_KSV_PO_MRP3] =
        useState(false);

    // DATAGRID CODE : TBL_KSV_PO_MRP3

    /* QRY KSV_PO_MRP*/
    const [dataEDT_KSV_PO_MRP, setDataEDT_KSV_PO_MRP] =
        useState(emptyEDT_KSV_PO_MRP);

    ///

    useEffect(() => {
        var tObj = {};
        serviceS043001_STSIN_LIST.mgrQuery_CODE(tObj).then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                setDatasQRY_KSV_PO_MRP1_BUYER_CD(data.BUYER_CD);
                setDataQRY_KSV_PO_MRP1_BUYER_CD(data.BUYER_CD[0]);

                setDatasQRY_KSV_PO_MRP1_VENDOR_CD(data.VENDOR_CD);
                setDataQRY_KSV_PO_MRP1_VENDOR_CD(data.VENDOR_CD[0]);

                setDatasQRY_KSV_PO_MRP1_VENDOR_TYPE(data.PUR_FACTORY);
                setDataQRY_KSV_PO_MRP1_VENDOR_TYPE(data.PUR_FACTORY[0]);

                var tRetDate = serviceLib.getCurrDate().substring(0, 8);
                var tObj0 = { ...dataQRY_KSV_PO_MRP1 };
                tObj0.S_EX_FACTORY = `${tRetDate.substring(0, 6)}01`;
                tObj0.E_EX_FACTORY = `${tRetDate}`;
                tObj0.S_PAY_DATE = `${tRetDate.substring(0, 6)}01`;
                tObj0.E_PAY_DATE = `${tRetDate}`;
                setDataQRY_KSV_PO_MRP1(tObj0);
            } else {
                console.log(
                    "mgrQuery_PO_CD error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });

        // search_LIST_1();
    }, []);

    const blankFn = () => {
        var tRetDate = serviceLib.getCurrDate().substring(0, 8);
        var tObj = { ...emptyQRY_KSV_PO_MRP1 };
        tObj.S_EX_FACTORY = `${tRetDate.substring(0, 6)}01`;
        tObj.E_EX_FACTORY = `${tRetDate}`;
        tObj.S_PAY_DATE = `${tRetDate.substring(0, 6)}01`;
        tObj.E_PAY_DATE = `${tRetDate}`;

        if (datasQRY_KSV_PO_MRP1_BUYER_CD.length > 0) {
            tObj.BUYER_CD = datasQRY_KSV_PO_MRP1_BUYER_CD[0].BUYER_CD;
            setDataQRY_KSV_PO_MRP1_BUYER_CD(datasQRY_KSV_PO_MRP1_BUYER_CD[0]);
        } else {
            setDataQRY_KSV_PO_MRP1_BUYER_CD({});
        }

        if (datasQRY_KSV_PO_MRP1_VENDOR_TYPE.length > 0) {
            tObj.VENDOR_TYPE = datasQRY_KSV_PO_MRP1_VENDOR_TYPE[0].CD_CODE;
            setDataQRY_KSV_PO_MRP1_VENDOR_TYPE(
                datasQRY_KSV_PO_MRP1_VENDOR_TYPE[0],
            );
        } else {
            setDataQRY_KSV_PO_MRP1_VENDOR_TYPE({});
        }

        setDataQRY_KSV_PO_MRP1(tObj);
        setSumInQty("");
    };

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

    const tableArea = useMemo(
        () => (
            <div
                className="af-div-first"
                style={{ width: "123rem", height: "50rem" }}
            >
                <AFDataTable preventUnrelatedRerender
                    ref={dt_TBL_KSV_PO_MRP2}
                    size="small"
                    value={datasTBL_KSV_PO_MRP2}
                    tableStyle={{ tableLayout: "fixed" }}
                    resizableColumns
                    columnResizeMode="expand"
                    loading={loadingTBL_KSV_PO_MRP2}
                    // metaKeySelection={false}
                    showGridlines
                    selectionMode="checkbox"
                    dataKey="id"
                    className="datatable-responsive"
                    selection={selectedTBL_KSV_PO_MRP2}
                    onSelectionChange={(e) => {
                        setSelectedTBL_KSV_PO_MRP2(e.value);
                        onRowClick1TBL_KSV_PO_MRP2(e.value);
                    }}
                    onRowClick={onRowClickTBL_KSV_PO_MRP2}
                    onRowSelect={onRowSelectTBL_KSV_PO_MRP2}
                    onRowUnselect={onRowUnSelectTBL_KSV_PO_MRP2}
                    // onRowDoubleClick={onRowDoubleClickTBL_KSV_PO_MRP2}
                    virtualScrollerOptions={{ itemSize: 20 }}
                    emptyMessage=" " //header={headerTBL_KSV_PO_MRP2}
                    responsiveLayout="scroll"
                    scrollable
                    scrollHeight="50rem"
                >
                    <AFColumn selectionMode="multiple" field="__checkbox__" reorderable={false} headerClassName="t-header" headerStyle={{ width: "3rem" }} ></AFColumn>

                    <AFColumn field="IN_DATETIME" headerClassName="t-header" header="In Date" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="VENDOR_NAME" headerClassName="t-header" header="Supplier" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="PU_CD" headerClassName="t-header" header="PU#" style={{ width: "8rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="MATL_CD" headerClassName="t-header" header="Matl#" style={{ width: "8rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="MATL_NAME" headerClassName="t-header" header="Description" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="COLOR" headerClassName="t-header" header="Color" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="SPEC" headerClassName="t-header" header="Spec" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="PO_CD" headerClassName="t-header" header="PO#" style={{ width: "8rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="REG_USER" headerClassName="t-header" header="Purchaser" style={{ width: "6rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="BUYER_CD" headerClassName="t-header" header="Buyer#.C" style={{ width: "3rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="MATL_TYPE" headerClassName="t-header" header="Matl Type" style={{ width: "4rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="TRADE_TERM" headerClassName="t-header" header="Term" style={{ width: "4rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="BILL_TO" headerClassName="t-header" header="Bill To" style={{ width: "5rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="CURR_CD" headerClassNamFe="t-header" header="Curr" style={{ width: "3rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="PO_AMT" headerClassName="t-header" header="Po Amount" style={{ width: "6rem", flexBasis: "auto" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.PO_AMT, 4) } ></AFColumn>
                    <AFColumn field="PO_PRICE" headerClassName="t-header" header="Po Price" style={{ width: "6rem", flexBasis: "auto" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.PO_PRICE, 4) } ></AFColumn>
                    <AFColumn field="PO_QTY" headerClassName="t-header" header="Po Qty" style={{ width: "6rem", flexBasis: "auto" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.PO_QTY, 4) } ></AFColumn>
                    <AFColumn field="STSIN_AMT" headerClassName="t-header" header="In Amount" style={{ width: "6rem", flexBasis: "auto" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.STSIN_AMT, 4) } ></AFColumn>
                    <AFColumn field="PAY_PRICE" headerClassName="t-header" header="In Price" style={{ width: "6rem", flexBasis: "auto" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.PAY_PRICE, 4) } ></AFColumn>
                    <AFColumn field="STSIN_QTY" headerClassName="t-header" header="In Qty" style={{ width: "6rem", flexBasis: "auto" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.STSIN_QTY, 2) } ></AFColumn>
                    <AFColumn field="FOC_QTY" headerClassName="t-header" header="Foc Qty" style={{ width: "6rem", flexBasis: "auto" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.FOC_QTY, 2) } ></AFColumn>
                    <AFColumn field="LC_QTY" headerClassName="t-header" header="LC&Deposit" style={{ width: "6rem", flexBasis: "auto" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.LC_QTY, 2) } ></AFColumn>
                    <AFColumn field="MOQ_AMT" headerClassName="t-header" header="Moq Amt" style={{ width: "6rem", flexBasis: "auto" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.MOQ_AMT, 4) } ></AFColumn>
                    <AFColumn field="SURCHARGE_AMT" headerClassName="t-header" header="Surcharge" style={{ width: "6rem", flexBasis: "auto" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.SURCHARGE_AMT, 4) } ></AFColumn>
                    <AFColumn field="OVERSHORT_NAME" headerClassName="t-header" header="Over/Short" style={{ width: "6rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="STSIN_TYPE" headerClassName="t-header" header="Kind" style={{ width: "4rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="EX_FACTORY" headerClassName="t-header" header="Ex-Factory" style={{ width: "6rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="PAY_DATE" headerClassName="t-header" header="Pay Date" style={{ width: "6rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="PAY_TERM" headerClassName="t-header" header="Period" style={{ width: "3rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="PAY_CONDITION" headerClassName="t-header" header="Condition" style={{ width: "6rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="LEADER_CONFIRM" headerClassName="t-header" header="Leader Confirm" style={{ width: "6rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="MOQ_CONFIRM" headerClassName="t-header" header="Stock Reason Check" style={{ width: "6rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="SURCHARGE_CONFIRM" headerClassName="t-header" header="Surcharge Confirm" style={{ width: "6rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="IN_DATETIME" headerClassName="t-header" header="In Date" style={{ width: "8rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="VENDOR_CD" headerClassName="t-header" header="Supplier.C" style={{ width: "6rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="STOCK_AMT" headerClassName="t-header" header="Stock Amt" style={{ width: "6rem", flexBasis: "auto" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.STOCK_AMT, 4) } ></AFColumn>
                    <AFColumn field="STSIN_CD" headerClassName="t-header" header="Stsin#" style={{ width: "20rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="MOQ_QTY" headerClassName="t-header" header="Moq Qty" style={{ width: "6rem", flexBasis: "auto" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.MOQ_QTY, 2) } ></AFColumn>
                    <AFColumn field="OVER_QTY" headerClassName="t-header" header="Over Qty" style={{ width: "6rem", flexBasis: "auto" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.OVER_QTY, 2) } ></AFColumn>
                </AFDataTable>
            </div>
        ),
        [
            datasTBL_KSV_PO_MRP2,
            loadingTBL_KSV_PO_MRP2,
            selectedTBL_KSV_PO_MRP2,
            onRowClick1TBL_KSV_PO_MRP2,
            onRowClickTBL_KSV_PO_MRP2,
            onRowSelectTBL_KSV_PO_MRP2,
            onRowUnSelectTBL_KSV_PO_MRP2,
            serviceLib,
        ],
    );

    return (
        <div className="af-div-main">
            <div
                className="af-div-first"
                style={{ width: "123rem", height: "10rem" }}
            >
                <span className="af-span-3" style={{ width: "16rem" }}>
                    <p className="af-span-p" style={{ width: "6rem" }}>PU#</p>
                    <div className="af-span-div" style={{ width: "9rem" }}>
                        <InputText
                            style={{ width: "9rem" }}
                            id="id_TARGET_ETA"
                            value={dataQRY_KSV_PO_MRP1.PU_CD}
                            onChange={(e) =>
                                onInputChangeQRY_KSV_PO_MRP1_PU_CD(e, "PU_CD")
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "19rem" }}>
                    <p className="af-span-p" style={{ width: "6rem" }}>Supplier</p>
                    <div className="af-span-div" style={{ width: "12rem" }}>
                        <InputText
                            style={{ width: "12rem" }}
                            id="id_TARGET_ETA"
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
                <span className="af-span-3-0" style={{ width: "16rem" }}>
                    <p className="af-span-p" style={{ width: "7rem" }}>In Date</p>
                    <div className="af-span-div" style={{ width: "8rem" }}>
                        <Calendar
                            showButtonBar
                            style={{ width: "8rem" }}
                            dateFormat="yy-mm-dd"
                            id="id_S_PO_DATE"
                            value={changeDateVal(
                                dataQRY_KSV_PO_MRP1.S_EX_FACTORY,
                            )}
                            onChange={(e) =>
                                onCalChangeQRY_KSV_PO_MRP1_S_EX_FACTORY(
                                    e,
                                    "S_EX_FACTORY",
                                )
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
                            id="id_S_PO_DATE"
                            value={changeDateVal(
                                dataQRY_KSV_PO_MRP1.E_EX_FACTORY,
                            )}
                            onChange={(e) =>
                                onCalChangeQRY_KSV_PO_MRP1_E_EX_FACTORY(
                                    e,
                                    "E_EX_FACTORY",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "10rem" }}>
                    <div className="af-span-div" style={{ width: "9rem" }}>
                        <Tooltip
                            className="menuCodeTooltip"
                            target={`#btnSearch`}
                            content={`Alt+S`}
                            position="bottom"
                        />

                        <Button
                            style={{ width: "9rem" }}
                            label={
                                <span>
                                    Search(<u>S</u>)
                                </span>
                            }
                            accessKey="S"
                            id="btnSearch"
                            className="p-button-text"
                            onClick={search_LIST_2}
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "10rem" }}>
                    <div className="af-span-div" style={{ width: "9rem" }}>
                        <Button
                            style={{ width: "9rem" }}
                            label="Reset"
                            className="p-button-text"
                            onClick={blankFn}
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "30rem" }}>
                    <div className="af-span-div-btn" style={{ width: "9rem" }}>
                        <Button
                            style={{ width: "9rem" }}
                            label="Excel"
                            className="p-button-text green"
                            onClick={exportExcelTBL_KSV_PO_MRP2}
                        />
                    </div>
                </span>

                <span className="af-span-3" style={{ width: "16rem" }}>
                    <p className="af-span-p" style={{ width: "6rem" }}>Purchaser</p>
                    <div className="af-span-div" style={{ width: "9rem" }}>
                        <InputText
                            style={{ width: "9rem" }}
                            id="id_TARGET_ETA"
                            value={dataQRY_KSV_PO_MRP1.REG_USER}
                            onChange={(e) =>
                                onInputChangeQRY_KSV_PO_MRP1_REG_USER(
                                    e,
                                    "REG_USER",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "19rem" }}>
                    <p className="af-span-p" style={{ width: "6rem" }}>Type</p>
                    <div className="af-span-div" style={{ width: "12rem" }}>
                        <Dropdown
                            style={{ width: "12rem" }}
                            id="id_PO_CD"
                            value={dataQRY_KSV_PO_MRP1_VENDOR_TYPE}
                            onChange={(e) =>
                                onDropdownChangeQRY_KSV_PO_MRP1_VENDOR_TYPE(
                                    e,
                                    "VENDOR_TYPE",
                                )
                            }
                            options={datasQRY_KSV_PO_MRP1_VENDOR_TYPE}
                            optionLabel="CD_NAME"
                            placeholder=""
                            editable
                            filter
                        ></Dropdown>
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "16rem" }}>
                    <p className="af-span-p" style={{ width: "7rem" }}>Pay Date</p>
                    <div className="af-span-div" style={{ width: "8rem" }}>
                        <Calendar
                            showButtonBar
                            style={{ width: "8rem" }}
                            dateFormat="yy-mm-dd"
                            id="id_S_PO_DATE"
                            value={changeDateVal(
                                dataQRY_KSV_PO_MRP1.S_PAY_DATE,
                            )}
                            onChange={(e) =>
                                onCalChangeQRY_KSV_PO_MRP1_S_PAY_DATE(
                                    e,
                                    "S_PAY_DATE",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "10rem" }}>
                    <p className="af-span-p" style={{ width: "1rem" }}>~</p>
                    <div className="af-span-div" style={{ width: "8rem" }}>
                        <Calendar
                            showButtonBar
                            style={{ width: "8rem" }}
                            dateFormat="yy-mm-dd"
                            id="id_S_PO_DATE"
                            value={changeDateVal(
                                dataQRY_KSV_PO_MRP1.E_PAY_DATE,
                            )}
                            onChange={(e) =>
                                onCalChangeQRY_KSV_PO_MRP1_E_PAY_DATE(
                                    e,
                                    "E_PAY_DATE",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "10rem" }}>
                    <div className="af-span-div" style={{ width: "9rem" }}>
                        <Button
                            style={{ width: "9rem" }}
                            label="Cancel"
                            className="p-button-text"
                            onClick={process_CANCEL_STSIN}
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "40rem" }}>
                    <div className="af-span-div" style={{ width: "9rem" }}>
                        <Button
                            style={{ width: "9rem" }}
                            label="Confirm"
                            className="p-button-text"
                            onClick={process_Leader_Confirm}
                        />
                    </div>
                </span>

                <span className="af-span-3" style={{ width: "16rem" }}>
                    <p className="af-span-p" style={{ width: "6rem" }}>Buyer</p>
                    <div className="af-span-div" style={{ width: "9rem" }}>
                        <Dropdown
                            style={{ width: "9rem" }}
                            id="id_PO_CD"
                            value={dataQRY_KSV_PO_MRP1_BUYER_CD}
                            onChange={(e) =>
                                onDropdownChangeQRY_KSV_PO_MRP1_BUYER_CD(
                                    e,
                                    "BUYER_CD",
                                )
                            }
                            options={datasQRY_KSV_PO_MRP1_BUYER_CD}
                            optionLabel="BUYER_NAME"
                            placeholder=""
                            editable
                            filter
                        ></Dropdown>
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "19rem" }}>
                    <p className="af-span-p" style={{ width: "6rem" }}>Ship To</p>
                    <div className="af-span-div" style={{ width: "12rem" }}>
                        <InputText
                            style={{ width: "12rem" }}
                            id="id_TARGET_ETA"
                            value={dataQRY_KSV_PO_MRP1.SHIP_TO}
                            onChange={(e) =>
                                onInputChangeQRY_KSV_PO_MRP1_SHIP_TO(
                                    e,
                                    "SHIP_TO",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "17rem" }}>
                    <p className="af-span-p" style={{ width: "7rem" }}>Bill To</p>
                    <div className="af-span-div" style={{ width: "9rem" }}>
                        <InputText
                            style={{ width: "8rem" }}
                            id="id_TARGET_ETA"
                            value={dataQRY_KSV_PO_MRP1.BILL_TO}
                            onChange={(e) =>
                                onInputChangeQRY_KSV_PO_MRP1_BILL_TO(
                                    e,
                                    "BILL_TO",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "12rem" }}>
                    <p className="af-span-p" style={{ width: "2rem" }}>PO#</p>
                    <div className="af-span-div" style={{ width: "9rem" }}>
                        <InputText
                            style={{ width: "8rem" }}
                            id="id_TARGET_ETA"
                            value={dataQRY_KSV_PO_MRP1.PO_CD}
                            onChange={(e) =>
                                onInputChangeQRY_KSV_PO_MRP1_PO_CD(e, "PO_CD")
                            }
                        />
                    </div>
                </span>
                <br />
                <span className="af-span-3" style={{ width: "16rem" }}>
                    <p className="af-span-p" style={{ width: "6rem" }}>Matl#</p>
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
                <span className="af-span-3" style={{ width: "36rem" }}>
                    <p className="af-span-p" style={{ width: "6rem" }}>Desc</p>
                    <div className="af-span-div" style={{ width: "28.5rem" }}>
                        <InputText
                            style={{ width: "28.5rem" }}
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
                <span className="af-span-3" style={{ width: "12rem" }}>
                    <p className="af-span-p" style={{ width: "11rem" }}> {sumInQty}</p>
                </span>
            </div>

            {tableArea}

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

export default React.memo(S043001_STSIN_LIST, comparisonFn);
