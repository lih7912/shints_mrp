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
import { ServiceS0402_PO_LIST_NEW } from "../service/service_biz/ServiceS0402_PO_LIST_NEW";

import "./page_common.scss";

const emptyKCD_CODE = {
    id: 0,
    CD_GROUP: "",
    CD_CODE: "",
    CD_NAME: "",
    CD_FLAG: "",
};

const emptyQRY_KSV_PO_MRP0 = {
    PO_STATUS: "",
    PO_STATUS_N: "",
};

const emptyQRY_KSV_PO_MRP = {
    PO_CD: "",
    PO_SEQ: "",
    VENDOR_TYPE: "",
    MATL_TYPE: "",
    VENDOR_NAME: "",
    MATL_CD: "",
    MATL_NAME: "",
    COLOR: "",
    SPEC: "",
    TARGET_ETD: "",
    TARGET_ETA: "",
};

const emptyTBL_KSV_PO_MRP = {
    id: 0,
    PO_CD: "",
    PO_SEQ: "",
    ORDER_CD: "",
    VENDOR_NAME: "",
    VENDOR_CD: "",
    MATL_CD: "",
    MATL_NAME: "",
    COLOR: "",
    SPEC: "",
    USE_PO_TYPE_NAME: "",
    USE_PO_TYPE: "",
    USE_QTY: "",
    DIFF_QTY: "",
    LEFT_OVER: "",
    STOCK_QTY: "",
    PO_QTY: "",
    ADJ_PO_QTY: "",
    DIFF_PO_TYPE_NAME: "",
    DIFF_PO_TYPE: "",
    UNIT: "",
    MATL_PRICE: "",
    CURR_CD: "",
    TOT_AMT: "",
    MRP_SEQ: "",
    MATL_SEQ: "",
    REG_DATETIME: "",
    PO_MATL_CD: "",
};

const emptyTBL_KSV_PO_MRP1 = {
    id: 0,
    SEQ: "",
    ORDER_CD: "",
    MATL_CD: "",
    MATL_NAME: "",
    COLOR: "",
    SPEC: "",
    STATUS_NAME: "",
    STATUS_CD: "",
    ORG_SEQ: "",
    ORDER_QTY: "",
    CHG_QTY: "",
    REVISE: "",
    CHANGE: "",
    MT: "",
    REMARK: "",
};

const S0402_PO_LIST_NEW = () => {
    const serviceLibRef = useRef(null);
    if (!serviceLibRef.current) {
        serviceLibRef.current = new ServiceLib();
        serviceLibRef.current.loginConfirm();
    }
    const serviceLib = serviceLibRef.current;
    const serviceS0402_PO_LIST_NEWRef = useRef(null);
    if (!serviceS0402_PO_LIST_NEWRef.current) serviceS0402_PO_LIST_NEWRef.current = new ServiceS0402_PO_LIST_NEW();
    const serviceS0402_PO_LIST_NEW = serviceS0402_PO_LIST_NEWRef.current;

    const toast = useRef(null);

    /* splitter 관련 */
    const [styleVal, setStyleVal] = useState({ width: "65vw" });

    const [urlIframe, setUrlIframe] = useState("");
    const [createDialog, setCreateDialog] = useState(false);
    const hideDialog = () => {
        setCreateDialog(false);
    };

    const popup_ORDER_SHEET = () => {
        var tUrls = window.location.href.split("/");
        console.log("URL=>" + tUrls[2]);
        var tUrl1 = "";
        if (window.location.href.includes("3288")) {
            tUrl1 = "http://afroba.iptime.org:3288/webapp/mrpapp/index.html#/";
        } else if (window.location.href.includes("3201")) {
            tUrl1 = "http://afroba.iptime.org:3201/#/";
        } else if (window.location.href.includes("3203")) {
            tUrl1 = "http://192.168.0.105:3203/#/";
        } else if (window.location.href.includes("3301")) {
            tUrl1 = "http://localhost:3301/#/";
        } else {
            tUrl1 = "http://localhost:3201/#/";
        }

        // var tSTYLE_CD = 'ST23-0734';
        var tPO_CD = datasTBL_KSV_PO_MRP[0].PO_CD;
        var tBUYER_CD = datasTBL_KSV_PO_MRP[0].ORDER_CD.substring(0, 2);

        tUrl1 +=
            "S040202_ORDER_SHEET?PO_CD=" + tPO_CD + "&BUYER_CD=" + tBUYER_CD;
        setUrlIframe(tUrl1);
        setCreateDialog(true);
    };

    const search_PO_LIST_NEW = () => {
        var tObj = { ...dataQRY_KSV_PO_MRP };
        tObj.PO_CD = tObj.PO_CD.trim();
        serviceS0402_PO_LIST_NEW.mgrQuery_CODE2(tObj).then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                console.log(
                    "ServiceMgrKCD_BUYER.mgr1KcdStyle call => " +
                        data.PO_SEQ.length,
                );
                setDatasQRY_KSV_PO_MRP_VENDOR_NAME(data.VENDOR_CD);
                setDataQRY_KSV_PO_MRP_VENDOR_NAME(data.VENDOR_CD[0]);

                setDatasQRY_KSV_PO_MRP_PO_SEQ(data.PO_SEQ);
                setDataQRY_KSV_PO_MRP_PO_SEQ(data.PO_SEQ[0]);

                setDatasQRY_KSV_PO_MRP0_PO_STATUS(data.PO_STATUS);
                editQRY_KSV_PO_MRP0_PO_STATUS(tObj.PO_STATUS);

                var _tObj = { ...dataQRY_KSV_PO_MRP0 };
                _tObj.PO_STATUS = tObj.PO_STATUS;
                _tObj.PO_STATUS_N = tObj.PO_STATUS;
                setDataQRY_KSV_PO_MRP0(_tObj);
            } else {
                console.log(
                    "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });

        serviceS0402_PO_LIST_NEW.mgrQueryTBL_KSV_PO_MRP(tObj).then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                console.log(
                    "ServiceMgrKCD_BUYER.mgr1KcdStyle call => " + data.length,
                );
                setDatasTBL_KSV_PO_MRP(data);
            } else {
                console.log(
                    "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });

        serviceS0402_PO_LIST_NEW.mgrQueryTBL_KSV_PO_MRP1(tObj).then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                console.log(
                    "ServiceMgrKCD_BUYER.mgr1KcdStyle call => " + data.length,
                );
                setDatasTBL_KSV_PO_MRP1(data);
            } else {
                console.log(
                    "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });
    };

    /* QRY KSV_PO_MRP*/
    const [dataQRY_KSV_PO_MRP0, setDataQRY_KSV_PO_MRP0] =
        useState(emptyQRY_KSV_PO_MRP0);

    const [datasQRY_KSV_PO_MRP0_PO_STATUS, setDatasQRY_KSV_PO_MRP0_PO_STATUS] =
        useState([]);
    const [dataQRY_KSV_PO_MRP0_PO_STATUS, setDataQRY_KSV_PO_MRP0_PO_STATUS] =
        useState({});

    const editQRY_KSV_PO_MRP0_PO_STATUS = (argValue) => {
        let _dataQRY_KSV_PO_MRP0_PO_STATUS =
            datasQRY_KSV_PO_MRP0_PO_STATUS.filter(
                (val) => val.CD_CODE === argValue,
            );
        setDataQRY_KSV_PO_MRP0_PO_STATUS(_dataQRY_KSV_PO_MRP0_PO_STATUS[0]);
    };

    const onInputChangeQRY_KSV_PO_MRP0_PO_STATUS_N = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_PO_MRP0 = { ...dataQRY_KSV_PO_MRP0 };

        let tTypeVal = _dataQRY_KSV_PO_MRP0[`${name}`];
        if (typeof tTypeVal === "string") _dataQRY_KSV_PO_MRP0[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_PO_MRP0[`${name}`] = parseInt(val);

        setDataQRY_KSV_PO_MRP0(_dataQRY_KSV_PO_MRP0);
    };

    /* QRY KSV_PO_MRP*/

    const processPoFix = () => {
        var tObj = {};
        tObj.PO_CD = dataQRY_KSV_PO_MRP.PO_CD;
        tObj.FACTORY_CD = "";
        tObj.USER_ID = serviceLib.getUserInfo().USER_ID;
        serviceS0402_PO_LIST_NEW.mgrQueryPoFix(tObj).then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                console.log("mgrQueryPoFix call => " + data.length);
                toast.current.show({
                    severity: "success",
                    summary: "Success Pofix",
                    detail: data[0].CODE,
                    life: 3000,
                });
                if (data[0].CODE.includes("ERROR")) {
                } else {
                    var tCols = data[0].CODE.split(":");
                    var tObj = { ...dataQRY_KSV_PO_MRP0 };
                    tObj.PO_STATUS = tCols[2];
                    setDataQRY_KSV_PO_MRP0(tObj);
                }
            } else {
                console.log(
                    "PoFix error => " + JSON.stringify(data.graphQLErrors),
                );
                toast.current.show({
                    severity: "success",
                    summary: "Error Pofix",
                    detail: "",
                    life: 3000,
                });
            }
        });
    };

    const [dataQRY_KSV_PO_MRP, setDataQRY_KSV_PO_MRP] =
        useState(emptyQRY_KSV_PO_MRP);

    const [datasQRY_KSV_PO_MRP_PO_CD, setDatasQRY_KSV_PO_MRP_PO_CD] = useState(
        [],
    );
    const [dataQRY_KSV_PO_MRP_PO_CD, setDataQRY_KSV_PO_MRP_PO_CD] = useState(
        {},
    );

    const onDropdownChangeQRY_KSV_PO_MRP_PO_CD = (e, name) => {
        let val = "";
        if (typeof e.value === "string") val = e.value;
        else val = (e.value && e.value.PO_CD) || "";

        let _dataQRY_KSV_PO_MRP = { ...dataQRY_KSV_PO_MRP };

        let tTypeVal = _dataQRY_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_PO_MRP[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_PO_MRP[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_PO_MRP(_dataQRY_KSV_PO_MRP);
        setDataQRY_KSV_PO_MRP_PO_CD(e.value);

        if (typeof e.value === "string") return;

        var tObj = { ...dataQRY_KSV_PO_MRP };
        tObj.PO_CD = val;

        serviceS0402_PO_LIST_NEW.mgrQuery_CODE2(tObj).then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                console.log(
                    "ServiceMgrKCD_BUYER.mgr1KcdStyle call => " +
                        data.PO_SEQ.length,
                );
                setDatasQRY_KSV_PO_MRP_VENDOR_NAME(data.VENDOR_CD);
                setDataQRY_KSV_PO_MRP_VENDOR_NAME(data.VENDOR_CD[0]);

                setDatasQRY_KSV_PO_MRP_PO_SEQ(data.PO_SEQ);
                setDataQRY_KSV_PO_MRP_PO_SEQ(data.PO_SEQ[0]);

                setDatasQRY_KSV_PO_MRP0_PO_STATUS(data.PO_STATUS);
                editQRY_KSV_PO_MRP0_PO_STATUS(e.value.PO_STATUS);

                var _tObj = { ...dataQRY_KSV_PO_MRP0 };
                _tObj.PO_STATUS = e.value.PO_STATUS;
                _tObj.PO_STATUS_N = e.value.PO_STATUS;
                setDataQRY_KSV_PO_MRP0(_tObj);
            } else {
                console.log(
                    "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });

        serviceS0402_PO_LIST_NEW.mgrQueryTBL_KSV_PO_MRP(tObj).then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                console.log(
                    "ServiceMgrKCD_BUYER.mgr1KcdStyle call => " + data.length,
                );
                setDatasTBL_KSV_PO_MRP(data);
            } else {
                console.log(
                    "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });

        serviceS0402_PO_LIST_NEW.mgrQueryTBL_KSV_PO_MRP1(tObj).then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                console.log(
                    "ServiceMgrKCD_BUYER.mgr1KcdStyle call => " + data.length,
                );
                setDatasTBL_KSV_PO_MRP1(data);
            } else {
                console.log(
                    "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });
    };

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

    const [
        datasQRY_KSV_PO_MRP_VENDOR_TYPE,
        setDatasQRY_KSV_PO_MRP_VENDOR_TYPE,
    ] = useState([]);
    const [dataQRY_KSV_PO_MRP_VENDOR_TYPE, setDataQRY_KSV_PO_MRP_VENDOR_TYPE] =
        useState({});

    const onDropdownChangeQRY_KSV_PO_MRP_VENDOR_TYPE = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataQRY_KSV_PO_MRP = { ...dataQRY_KSV_PO_MRP };

        let tTypeVal = _dataQRY_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_PO_MRP[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_PO_MRP[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_PO_MRP(_dataQRY_KSV_PO_MRP);
        setDataQRY_KSV_PO_MRP_VENDOR_TYPE(e.value);
    };

    const [datasQRY_KSV_PO_MRP_MATL_TYPE, setDatasQRY_KSV_PO_MRP_MATL_TYPE] =
        useState([]);
    const [dataQRY_KSV_PO_MRP_MATL_TYPE, setDataQRY_KSV_PO_MRP_MATL_TYPE] =
        useState({});

    const onDropdownChangeQRY_KSV_PO_MRP_MATL_TYPE = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataQRY_KSV_PO_MRP = { ...dataQRY_KSV_PO_MRP };

        let tTypeVal = _dataQRY_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_PO_MRP[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_PO_MRP[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_PO_MRP(_dataQRY_KSV_PO_MRP);
        setDataQRY_KSV_PO_MRP_MATL_TYPE(e.value);
    };

    const [
        datasQRY_KSV_PO_MRP_VENDOR_NAME,
        setDatasQRY_KSV_PO_MRP_VENDOR_NAME,
    ] = useState([]);
    const [dataQRY_KSV_PO_MRP_VENDOR_NAME, setDataQRY_KSV_PO_MRP_VENDOR_NAME] =
        useState({});

    const onDropdownChangeQRY_KSV_PO_MRP_VENDOR_NAME = (e, name) => {
        let val = (e.value && e.value.VENDOR_CD) || "";

        let _dataQRY_KSV_PO_MRP = { ...dataQRY_KSV_PO_MRP };

        let tTypeVal = _dataQRY_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_PO_MRP[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_PO_MRP[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_PO_MRP(_dataQRY_KSV_PO_MRP);
        setDataQRY_KSV_PO_MRP_VENDOR_NAME(e.value);
    };

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

    const onInputChangeQRY_KSV_PO_MRP_COLOR = (e, name) => {
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

    const onInputChangeQRY_KSV_PO_MRP_TARGET_ETD = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_PO_MRP = { ...dataQRY_KSV_PO_MRP };

        let tTypeVal = _dataQRY_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string") _dataQRY_KSV_PO_MRP[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_PO_MRP[`${name}`] = parseInt(val);

        setDataQRY_KSV_PO_MRP(_dataQRY_KSV_PO_MRP);
    };

    const onInputChangeQRY_KSV_PO_MRP_TARGET_ETA = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_PO_MRP = { ...dataQRY_KSV_PO_MRP };

        let tTypeVal = _dataQRY_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string") _dataQRY_KSV_PO_MRP[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_PO_MRP[`${name}`] = parseInt(val);

        setDataQRY_KSV_PO_MRP(_dataQRY_KSV_PO_MRP);
    };

    /* TABLE KSV_PO_MRP*/
    // DEFINE DATAGRID : TBL_KSV_PO_MRP
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
            argData = argData0[0];
        } else {
            argData = argData0;
        }

        let argTBL_KSV_PO_MRP = argData;

        setDataTBL_KSV_PO_MRP(argTBL_KSV_PO_MRP);
    };

    const onRowClickTBL_KSV_PO_MRP = (event) => {
        let argTBL_KSV_PO_MRP = event.data;
        if (flagSelectModeTBL_KSV_PO_MRP) return;

        // Service : NawooAll:mgrQueryTBL_KSV_PO_MRP
    };

    const searchTBL_KSV_PO_MRP = () => {
        clearSelectedTBL_KSV_PO_MRP();

        serviceS0402_PO_LIST_NEW
            .mgrQueryTBL_KSV_PO_MRP(dataQRY_KSV_PO_MRP)
            .then((data) => {
                if (typeof data.graphQLErrors === "undefined") {
                    console.log(
                        "ServiceNawooAll.mgrQueryTBL_KSV_PO_MRP() call => " +
                            data.length,
                    );
                    setDatasTBL_KSV_PO_MRP(data);
                } else {
                    // var tStr = data.graphQLErrors[0].message;
                    console.log(
                        "ServiceNawooAll.mgrQueryTBL_KSV_PO_MRP()error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });

        // Service : NawooAll:mgrQueryTBL_KSV_PO_MRP
    };

    const clearSelectedTBL_KSV_PO_MRP = () => {
        setSelectedTBL_KSV_PO_MRP([]);
        setFlagSelectModeTBL_KSV_PO_MRP(false);
    };

    const exportExcelTBL_KSV_PO_MRP = () => {
        import("xlsx").then((xlsx) => {
            const worksheet = xlsx.utils.json_to_sheet(datasTBL_KSV_PO_MRP);
            const workbook = {
                Sheets: { data: worksheet },
                SheetNames: ["data"],
            };
            const excelBuffer = xlsx.write(workbook, {
                bookType: "xlsx",
                type: "array",
            });
            saveAsExcelFileTBL_KSV_PO_MRP(excelBuffer, "스타일목록");
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

    /**TABLE KSV_PO_MRP1 */
    // DEFINE DATAGRID : TBL_KSV_PO_MRP1
    const [datasTBL_KSV_PO_MRP1, setDatasTBL_KSV_PO_MRP1] = useState([]);
    const dt_TBL_KSV_PO_MRP1 = useRef(null);
    const [dataTBL_KSV_PO_MRP1, setDataTBL_KSV_PO_MRP1] =
        useState(emptyTBL_KSV_PO_MRP1);
    const [selectedTBL_KSV_PO_MRP1, setSelectedTBL_KSV_PO_MRP1] = useState([]);
    const [flagSelectModeTBL_KSV_PO_MRP1, setFlagSelectModeTBL_KSV_PO_MRP1] =
        useState(false);

    // DATAGRID CODE : TBL_KSV_PO_MRP1

    useEffect(() => {
        serviceS0402_PO_LIST_NEW.mgrQuery_CODE().then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                console.log(
                    "ServiceMgrKCD_BUYER.mgr1KcdStyle call => " +
                        data.PO_CD.length,
                );
                setDatasQRY_KSV_PO_MRP_PO_CD(data.PO_CD);
                setDataQRY_KSV_PO_MRP_PO_CD(data.PO_CD[0]);

                setDatasQRY_KSV_PO_MRP_VENDOR_TYPE(data.VENDOR_TYPE);
                setDataQRY_KSV_PO_MRP_VENDOR_TYPE(data.VENDOR_TYPE[0]);

                setDatasQRY_KSV_PO_MRP_MATL_TYPE(data.MATL_TYPE);
                setDataQRY_KSV_PO_MRP_MATL_TYPE(data.MATL_TYPE[0]);
            } else {
                console.log(
                    "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });
    }, []);

    const blankFn = () => {};

    // Support Area

    return (
        <div>
            <div
                style={{
                    marginLeft: "1rem",
                    marginTop: "1rem",
                    width: "100rem",
                    height: "5rem",
                }}
            >
                <span
                    style={{
                        marginLeft: "0.5rem",
                        height: "2rem",
                        display: "inline-block",
                        width: "23rem",
                    }}
                >
                    <p style={{ width: "6rem", display: "inline-block" }}>PO</p>
                    <div
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "10rem",
                        }}
                    >
                        <Dropdown
                            id="id_PO_CD"
                            value={dataQRY_KSV_PO_MRP_PO_CD}
                            onChange={(e) =>
                                onDropdownChangeQRY_KSV_PO_MRP_PO_CD(e, "PO_CD")
                            }
                            options={datasQRY_KSV_PO_MRP_PO_CD}
                            optionLabel="PO_CD"
                            placeholder=""
                            editable
                        ></Dropdown>
                    </div>
                    <span style={{ display: "inline-block" }}>
                        <Button
                            label="Reset"
                            style={{ height: "1.1rem" }}
                            className="p-button-text"
                            onClick={searchTBL_KSV_PO_MRP}
                        />
                    </span>
                </span>
                <span
                    style={{
                        marginLeft: "0.5rem",
                        height: "2rem",
                        display: "inline-block",
                        width: "9rem",
                    }}
                >
                    <p style={{ width: "3rem", display: "inline-block" }}>seq</p>
                    <div
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "5rem",
                        }}
                    >
                        <Dropdown
                            id="id_PO_SEQ"
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
                <span
                    style={{
                        marginLeft: "0.5rem",
                        height: "2rem",
                        display: "inline-block",
                        width: "50rem",
                    }}
                >
                    <p style={{ width: "10rem", display: "inline-block" }}>Supplier Type</p>
                    <div
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "12rem",
                        }}
                    >
                        <Dropdown
                            id="id_VENDOR_TYPE"
                            value={dataQRY_KSV_PO_MRP_VENDOR_TYPE}
                            onChange={(e) =>
                                onDropdownChangeQRY_KSV_PO_MRP_VENDOR_TYPE(
                                    e,
                                    "VENDOR_TYPE",
                                )
                            }
                            options={datasQRY_KSV_PO_MRP_VENDOR_TYPE}
                            optionLabel="CD_NAME"
                            placeholder=""
                            editable
                        ></Dropdown>
                    </div>
                    <span style={{ display: "inline-block" }}>
                        <Button
                            label="PO Fix"
                            style={{ height: "1.1rem" }}
                            className="p-button-text"
                            onClick={processPoFix}
                        />
                    </span>
                </span>
                <span
                    style={{
                        marginLeft: "0.5rem",
                        height: "2rem",
                        display: "inline-block",
                        width: "20rem",
                    }}
                >
                    <p style={{ width: "6rem", display: "inline-block" }}>Status</p>
                    <InputText
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "11rem",
                        }}
                        id="id_MATL_CD"
                        value={dataQRY_KSV_PO_MRP0.PO_STATUS_N}
                        onChange={(e) =>
                            onInputChangeQRY_KSV_PO_MRP0_PO_STATUS_N(
                                e,
                                "PO_STATUS_N",
                            )
                        }
                    />
                </span>
                <span
                    style={{
                        marginLeft: "0.5rem",
                        height: "2rem",
                        display: "inline-block",
                        width: "23rem",
                    }}
                >
                    <p style={{ width: "6rem", display: "inline-block" }}>Matl Type</p>
                    <div
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "15rem",
                        }}
                    >
                        <Dropdown
                            id="id_MATL_TYPE"
                            value={dataQRY_KSV_PO_MRP_MATL_TYPE}
                            onChange={(e) =>
                                onDropdownChangeQRY_KSV_PO_MRP_MATL_TYPE(
                                    e,
                                    "MATL_TYPE",
                                )
                            }
                            options={datasQRY_KSV_PO_MRP_MATL_TYPE}
                            optionLabel="CD_NAME"
                            placeholder=""
                            editable
                        ></Dropdown>
                    </div>
                </span>

                <span
                    style={{
                        marginLeft: "0.5rem",
                        height: "2rem",
                        display: "inline-block",
                        width: "23rem",
                    }}
                >
                    <p style={{ width: "7rem", display: "inline-block" }}>Supplier</p>
                    <div
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "15rem",
                        }}
                    >
                        <Dropdown
                            id="id_VENDOR_NAME"
                            value={dataQRY_KSV_PO_MRP_VENDOR_NAME}
                            onChange={(e) =>
                                onDropdownChangeQRY_KSV_PO_MRP_VENDOR_NAME(
                                    e,
                                    "VENDOR_NAME",
                                )
                            }
                            options={datasQRY_KSV_PO_MRP_VENDOR_NAME}
                            optionLabel="VENDOR_NAME"
                            placeholder=""
                            editable
                        ></Dropdown>
                    </div>
                </span>
                <span
                    style={{
                        marginLeft: "0.5rem",
                        height: "2rem",
                        display: "inline-block",
                        width: "23rem",
                    }}
                >
                    <p style={{ width: "6rem", display: "inline-block" }}>Matl Cd</p>
                    <InputText
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "15rem",
                        }}
                        id="id_MATL_CD"
                        value={dataQRY_KSV_PO_MRP.MATL_CD}
                        onChange={(e) =>
                            onInputChangeQRY_KSV_PO_MRP_MATL_CD(e, "MATL_CD")
                        }
                    />
                </span>
                <span
                    style={{
                        marginLeft: "0.5rem",
                        height: "2rem",
                        display: "inline-block",
                        width: "22rem",
                    }}
                >
                    <p style={{ width: "6rem", display: "inline-block" }}>Description</p>
                    <InputText
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "15rem",
                        }}
                        id="id_MATL_NAME"
                        value={dataQRY_KSV_PO_MRP.MATL_NAME}
                        onChange={(e) =>
                            onInputChangeQRY_KSV_PO_MRP_MATL_NAME(
                                e,
                                "MATL_NAME",
                            )
                        }
                    />
                </span>
                <span
                    style={{
                        marginLeft: "0.5rem",
                        height: "2rem",
                        display: "inline-block",
                        width: "15rem",
                    }}
                >
                    <p style={{ width: "4rem", display: "inline-block" }}>Color</p>
                    <InputText
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "10rem",
                        }}
                        id="id_COLOR"
                        value={dataQRY_KSV_PO_MRP.COLOR}
                        onChange={(e) =>
                            onInputChangeQRY_KSV_PO_MRP_COLOR(e, "COLOR")
                        }
                    />
                </span>
                <span
                    style={{
                        marginLeft: "0.5rem",
                        height: "2rem",
                        display: "inline-block",
                        width: "15rem",
                    }}
                >
                    <p style={{ width: "4rem", display: "inline-block" }}>Spec</p>
                    <InputText
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "10rem",
                        }}
                        id="id_SPEC"
                        value={dataQRY_KSV_PO_MRP.SPEC}
                        onChange={(e) =>
                            onInputChangeQRY_KSV_PO_MRP_SPEC(e, "SPEC")
                        }
                    />
                </span>
                <span
                    style={{
                        marginLeft: "0.5rem",
                        height: "2rem",
                        display: "inline-block",
                        width: "13rem",
                    }}
                >
                    <p style={{ width: "6rem", display: "inline-block" }}>Target ETD</p>
                    <InputText
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "6rem",
                        }}
                        id="id_TARGET_ETD"
                        value={dataQRY_KSV_PO_MRP.TARGET_ETD}
                        onChange={(e) =>
                            onInputChangeQRY_KSV_PO_MRP_TARGET_ETD(
                                e,
                                "TARGET_ETD",
                            )
                        }
                    />
                </span>
                <span
                    style={{
                        marginLeft: "1rem",
                        height: "2rem",
                        display: "inline-block",
                        width: "13rem",
                    }}
                >
                    <p style={{ width: "6rem", display: "inline-block" }}>Target ETA</p>
                    <InputText
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "6rem",
                        }}
                        id="id_TARGET_ETA"
                        value={dataQRY_KSV_PO_MRP.TARGET_ETA}
                        onChange={(e) =>
                            onInputChangeQRY_KSV_PO_MRP_TARGET_ETA(
                                e,
                                "TARGET_ETA",
                            )
                        }
                    />
                </span>
                <span style={{ display: "inline-block" }}>
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
                        style={{ height: "1.1rem" }}
                        icon="pi pi-search"
                        className="p-button-text"
                        onClick={search_PO_LIST_NEW}
                    />

                    <Button
                        label="Excel"
                        style={{ height: "1.1rem", color: "green" }}
                        icon="pi pi-upload"
                        className="p-button-text"
                        onClick={exportExcelTBL_KSV_PO_MRP}
                    />
                </span>
            </div>
            <div style={{ width: "100rem", height: "2rem" }}></div>

            <div
                style={{
                    marginLeft: "1rem",
                    marginTop: "1rem",
                    width: "99rem",
                    height: "30rem",
                }}
            >
                <AFDataTable preventUnrelatedRerender
                    ref={dt_TBL_KSV_PO_MRP}
                    size="small"
                    value={datasTBL_KSV_PO_MRP}
                    resizableColumns
                    columnResizeMode="fit"
                    showGridlines
                    selectionMode="checkbox"
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
                    virtualScrollerOptions={{ itemSize: 28 }}
                    emptyMessage=" " //header={headerTBL_KSV_PO_MRP}
                    responsiveLayout="scroll"
                    scrollable
                    scrollHeight="28rem"
                >
                    <AFColumn field="PO_CD" headerClassName="t-header" header="PO" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="PO_SEQ" headerClassName="t-header" header="Seq" style={{ width: "6rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="ORDER_CD" headerClassName="t-header" header="Order" style={{ width: "8rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="VENDOR_NAME" headerClassName="t-header" header="Supplier" style={{ width: "15rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="VENDOR_CD" headerClassName="t-header" header="Supplier Cd" style={{ width: "8rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="MATL_CD" headerClassName="t-header" header="Matl Cd" style={{ width: "8rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="MATL_NAME" headerClassName="t-header" header="Description" style={{ width: "15rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="COLOR" headerClassName="t-header" header="Color" style={{ width: "13rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="SPEC" headerClassName="t-header" header="Spec" style={{ width: "15rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="USE_PO_TYPE_NAME" headerClassName="t-header" header="Status" style={{ width: "8rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="USE_PO_TYPE" headerClassName="t-header" header="Status Cd" style={{ width: "8rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="USE_QTY" headerClassName="t-header" header="Mrp Qty" style={{ width: "8rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="DIFF_QTY" headerClassName="t-header" header="Chg Qty" style={{ width: "8rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="LEFT_OVER" headerClassName="t-header" header="Left Over" style={{ width: "8rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="STOCK_QTY" headerClassName="t-header" header="Stock Qty" style={{ width: "8rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="PO_QTY" headerClassName="t-header" header="Ord Qty" style={{ width: "8rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="ADJ_PO_QTY" headerClassName="t-header" header="Adj Qty" style={{ width: "8rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="DIFF_PO_TYPE_NAME" headerClassName="t-header" header="Change" style={{ width: "8rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="DIFF_PO_TYPE" headerClassName="t-header" header="Change Cd" style={{ width: "8rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="UNIT" headerClassName="t-header" header="Unit" style={{ width: "8rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="MATL_PRICE" headerClassName="t-header" header="Price" style={{ width: "8rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="CURR_CD" headerClassName="t-header" header="Curr" style={{ width: "8rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="TOT_AMT" headerClassName="t-header" header="Amt" style={{ width: "8rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="MRP_SEQ" headerClassName="t-header" header="Mrp Seq" style={{ width: "8rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="MATL_SEQ" headerClassName="t-header" header="Matl Seq" style={{ width: "8rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="REG_DATETIME" headerClassName="t-header" header="Reg Date" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="PO_MATL_CD" headerClassName="t-header" header="Po Matl Cd" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                </AFDataTable>
            </div>

            <Divider />

            <div
                style={{ width: "100rem", height: "2rem", marginLeft: "35rem" }}
            >
                <div className="formgrid grid">
                    <div>
                        <Button
                            style={{ display: "inline-block", width: "10rem" }}
                            label="MTBS ADD"
                            className="p-button-text"
                            onClick={blankFn}
                        />

                        <Button
                            style={{ display: "inline-block", width: "10rem" }}
                            label="Order Sheet"
                            className="p-button-text"
                            onClick={popup_ORDER_SHEET}
                        />

                        <Button
                            style={{ display: "inline-block", width: "10rem" }}
                            label="Order Qty"
                            className="p-button-text"
                            onClick={blankFn}
                        />

                        <Button
                            style={{ display: "inline-block", width: "15rem" }}
                            label="Matl List(New Qty)"
                            className="p-button-text"
                            onClick={blankFn}
                        />

                        <Button
                            style={{ display: "inline-block", width: "10rem" }}
                            label="Excel(Ord.)"
                            className="p-button-text green"
                            onClick={blankFn}
                        />

                        <Button
                            style={{ display: "inline-block", width: "10rem" }}
                            label="Excel (Matl)"
                            className="p-button-text green"
                            onClick={blankFn}
                        />
                    </div>
                </div>
            </div>

            <Divider />

            <div style={{ width: "100rem", height: "30rem" }}>
                <div className="flex flex-row justify-content-start align-items-top">
                    <div style={{ width: "60rem", height: "30rem" }}></div>

                    <div style={{ width: "40rem", height: "30rem" }}></div>
                </div>
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

export default React.memo(S0402_PO_LIST_NEW, comparisonFn);
