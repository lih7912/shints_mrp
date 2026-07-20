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
import { ServiceS0212_NEGO_CMPT } from "../service/service_biz/ServiceS0212_NEGO_CMPT";

const moment = require("moment");

// import './page_common.scss';

const emptyKCD_CODE = {
    id: 0,
    CD_GROUP: "",
    CD_CODE: "",
    CD_NAME: "",
    CD_FLAG: "",
};

const emptyQRY_KSV_ORDER_CMPT = {
    FACTORY_CD: "",
    BUYER_CD: "",
    STYLE_NAME: "",
    FC_NEGO_TYPE: "",
    PO_CD: "",
    ORDER_CD: "",
    DUE_DATE_FLAG: "",
    S_DUE_DATE: "",
    E_DUE_DATE: "",
    EXFACTORY_DATE_FLAG: "",
    S_EXFACTORY_DATE: "",
    E_EXFACTORY_DATE: "",
};

const emptyTBL_KSV_ORDER_CMPT = {
    id: 0,
    PO_CD: "",
    ORDER_CD: "",
    STYLE_NAME: "",
    STYLE_CD: "",
    DUE_DATE: "",
    TOT_CNT: "",
    LOC: "",
    CMPT: "",
    SCREEN_PRINT: "",
    HEAT_SILICON: "",
    EMBROIDERY: "",
    TPR: "",
    WELDING: "",
    QUILTING: "",
    DIGITAL_PRINT: "",
    LABEL_PRINT: "",
    LINE_CHARGE: "",
    TOTAL_COST: "",
    FC_NEGO_TYPE_NAME: "",
    FC_NEGO_TYPE: "",
    REMARK: "",
};

const emptyTBL_KSV_ORDER_CMPT2 = {
    id: 0,
    PO_CD: "",
    ORDER_CD: "",
    STYLE_NAME: "",
    STYLE_CD: "",
    DUE_DATE: "",
    TOT_CNT: "",
    LOC: "",
    CMPT: "",
    SCREEN_PRINT: "",
    HEAT_SILICON: "",
    EMBROIDERY: "",
    TPR: "",
    WELDING: "",
    QUILTING: "",
    DIGITAL_PRINT: "",
    LABEL_PRINT: "",
    LINE_CHARGE: "",
    TOTAL_COST: "",
    FC_NEGO_TYPE_NAME: "",
    FC_NEGO_TYPE: "",
    REMARK: "",
};

const emptyEDT_KSV_ORDER_CMPT = {
    PO_CD: "",
    ORDER_CD: "",
    STYLE_NAME: "",
    STYLE_CD: "",
    DUE_DATE: "",
    TOT_CNT: "",
    LOC: "",
    CMPT: "",
    SCREEN_PRINT: "",
    HEAT_SILICON: "",
    EMBROIDERY: "",
    TPR: "",
    WELDING: "",
    QUILTING: "",
    DIGITAL_PRINT: "",
    LABEL_PRINT: "",
    LINE_CHARGE: "",
    TOTAL_COST: "",
    FC_NEGO_TYPE_NAME: "",
    FC_NEGO_TYPE: "",
    REMARK: "",
};

const S0212_NEGO_CMPT = () => {
    const serviceLibRef = useRef(null);
    if (!serviceLibRef.current) {
        serviceLibRef.current = new ServiceLib();
        serviceLibRef.current.loginConfirm();
    }
    const serviceLib = serviceLibRef.current;
    const serviceS0212_NEGO_CMPTRef = useRef(null);
    if (!serviceS0212_NEGO_CMPTRef.current) serviceS0212_NEGO_CMPTRef.current = new ServiceS0212_NEGO_CMPT();
    const serviceS0212_NEGO_CMPT = serviceS0212_NEGO_CMPTRef.current;

    const toast = useRef(null);

    const [isNegoHistory, setIsNegoHistory] = useState(false);
    const hideDialog = () => {
        setDatasTBL_KSV_ORDER_CMPT2([]);
        setIsNegoHistory(false);
    };

    /* splitter 관련 */
    const [styleVal, setStyleVal] = useState({ width: "65vw" });

    const process_RESET = () => {
        setDataQRY_KSV_ORDER_CMPT(emptyQRY_KSV_ORDER_CMPT);
        setDataQRY_KSV_ORDER_CMPT_FACTORY_CD(
            datasQRY_KSV_ORDER_CMPT_FACTORY_CD[0],
        );
        setDataQRY_KSV_ORDER_CMPT_BUYER_CD(datasQRY_KSV_ORDER_CMPT_BUYER_CD[0]);
        setDataQRY_KSV_ORDER_CMPT_FC_NEGO_TYPE(
            datasQRY_KSV_ORDER_CMPT_FC_NEGO_TYPE[0],
        );
        setDatasTBL_KSV_ORDER_CMPT([]);
    };

    const process_NEGO_HISTORY = () => {
        if (selectedTBL_KSV_ORDER_CMPT.length <= 0) return;

        var tInObj = {};
        tInObj.ORDER_CD = selectedTBL_KSV_ORDER_CMPT[0].ORDER_CD;

        setDatasTBL_KSV_ORDER_CMPT2([]);

        serviceS0212_NEGO_CMPT.mgrQuery_NEGO_HISTORY(tInObj).then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                if (data.length > 0) {
                    var tArray = data.map((col, i) => {
                        var tObj = { ...col };
                        tObj.id = i + 1;
                        return tObj;
                    });
                    setDatasTBL_KSV_ORDER_CMPT2(tArray);
                    setIsNegoHistory(true);
                } else {
                }
            } else {
                toast.current.show({
                    severity: "success",
                    summary: "FAILED: Delete Order",
                    detail: "fatal error",
                    life: 3000,
                });
            }
        });
    };

    const process_EXCEL_PRINT = (isLocalDetail) => {
        if (
            selectedTBL_KSV_ORDER_CMPT.length > 1 ||
            selectedTBL_KSV_ORDER_CMPT.length === 0
        ) {
            alert("Please select only one item.");
            return;
        }

        var tInObj = {};
        tInObj.ORDER_CD = selectedTBL_KSV_ORDER_CMPT[0].ORDER_CD;
        tInObj.PO_CD = selectedTBL_KSV_ORDER_CMPT[0].PO_CD;
        tInObj.IS_LOCAL_DETAIL = isLocalDetail || "";

        console.log(tInObj);

        setDatasTBL_KSV_ORDER_CMPT2([]);
        setLoadingTBL_KSV_ORDER_CMPT(true);
        serviceS0212_NEGO_CMPT.mgrQuery_EXCEL_PRINT(tInObj).then((data) => {
            setLoadingTBL_KSV_ORDER_CMPT(false);
            if (typeof data.graphQLErrors === "undefined") {
                if (data.length > 0 && data[0].CODE.includes("SUCC")) {
                    console.log("Order Sheet Succeed => " + data[0].CODE);
                    if (data[0].CODE.includes("SUCC")) {
                        serviceLib.downloadFile(
                            data[0].CODE.split("?")[2].toString(),
                            data[0].CODE.split("?")[1].toString(),
                        );
                    }
                }
            } else {
                toast.current.show({
                    severity: "success",
                    summary: "FAILED: Delete Order",
                    detail: "fatal error",
                    life: 3000,
                });
            }
        });
    };

    const process_FAC_PRESENT = () => {
        if (selectedTBL_KSV_ORDER_CMPT.length <= 0) return;

        var tIns = [];
        selectedTBL_KSV_ORDER_CMPT.forEach((col, i) => {
            var tObj = { ...col };
            if (typeof tObj.__typename !== "undefined") delete tObj.__typename;
            if (typeof tObj.id !== "undefined") delete tObj.id;
            tObj.OP_MODE = "PRESENT";
            tIns.push(tObj);
        });

        setLoadingTBL_KSV_ORDER_CMPT(true);
        serviceS0212_NEGO_CMPT.mgrInsert_NEGO_PRESENT(tIns).then((data) => {
            setLoadingTBL_KSV_ORDER_CMPT(false);
            if (typeof data.graphQLErrors === "undefined") {
                if (data.length > 0) {
                    alert(data[0].CODE);
                }
                search_LIST_1();
            } else {
                toast.current.show({
                    severity: "success",
                    summary: "FAILED: Delete Order",
                    detail: "fatal error",
                    life: 3000,
                });
            }
        });
    };

    const process_GET_PHERQDL = () => {
        if (selectedTBL_KSV_ORDER_CMPT.length <= 0) return;

        var tIns = [];
        selectedTBL_KSV_ORDER_CMPT.forEach((col, i) => {
            var tObj = { ...col };
            if (typeof tObj.__typename !== "undefined") delete tObj.__typename;
            if (typeof tObj.id !== "undefined") delete tObj.id;
            tObj.OP_MODE = "PRESENT";
            tIns.push(tObj);
        });

        setLoadingTBL_KSV_ORDER_CMPT(true);
        serviceS0212_NEGO_CMPT.mgrInsert_NEGO_GET_PHERQDL(tIns).then((data) => {
            setLoadingTBL_KSV_ORDER_CMPT(false);
            if (typeof data.graphQLErrors === "undefined") {
                if (data.length > 0) {
                    alert(data[0].CODE);
                }
                search_LIST_1();
            } else {
                toast.current.show({
                    severity: "success",
                    summary: "FAILED: Delete Order",
                    detail: "fatal error",
                    life: 3000,
                });
            }
        });
    };

    const process_FAC_REPRESENT = () => {
        if (selectedTBL_KSV_ORDER_CMPT.length <= 0) return;

        var tIns = [];
        selectedTBL_KSV_ORDER_CMPT.forEach((col, i) => {
            var tObj = { ...col };
            if (typeof tObj.__typename !== "undefined") delete tObj.__typename;
            if (typeof tObj.id !== "undefined") delete tObj.id;
            tObj.OP_MODE = "REPRESENT";
            tIns.push(tObj);
        });

        setLoadingTBL_KSV_ORDER_CMPT(true);
        serviceS0212_NEGO_CMPT.mgrInsert_NEGO_PRESENT(tIns).then((data) => {
            setLoadingTBL_KSV_ORDER_CMPT(false);
            if (typeof data.graphQLErrors === "undefined") {
                if (data.length > 0) {
                    alert(data[0].CODE);
                }
                search_LIST_1();
            } else {
                toast.current.show({
                    severity: "success",
                    summary: "FAILED: Delete Order",
                    detail: "fatal error",
                    life: 3000,
                });
            }
        });
    };

    const process_STS_ACCEPT = () => {
        if (selectedTBL_KSV_ORDER_CMPT.length <= 0) return;

        var tIns = [];
        selectedTBL_KSV_ORDER_CMPT.forEach((col, i) => {
            var tObj = { ...col };
            if (typeof tObj.__typename !== "undefined") delete tObj.__typename;
            if (typeof tObj.id !== "undefined") delete tObj.id;
            tObj.OP_MODE = "ACCEPT";
            tIns.push(tObj);
        });

        setLoadingTBL_KSV_ORDER_CMPT(true);
        serviceS0212_NEGO_CMPT.mgrInsert_NEGO_ACCEPT(tIns).then((data) => {
            setLoadingTBL_KSV_ORDER_CMPT(false);
            if (typeof data.graphQLErrors === "undefined") {
                if (data.length > 0) {
                    alert(data[0].CODE);
                }
                search_LIST_1();
            } else {
                toast.current.show({
                    severity: "success",
                    summary: "FAILED: Delete Order",
                    detail: "fatal error",
                    life: 3000,
                });
            }
        });
    };

    const process_STS_REJECT = () => {
        if (selectedTBL_KSV_ORDER_CMPT.length <= 0) return;

        var tIns = [];
        selectedTBL_KSV_ORDER_CMPT.forEach((col, i) => {
            var tObj = { ...col };
            if (typeof tObj.__typename !== "undefined") delete tObj.__typename;
            if (typeof tObj.id !== "undefined") delete tObj.id;
            tObj.OP_MODE = "REJECT";
            tIns.push(tObj);
        });

        setLoadingTBL_KSV_ORDER_CMPT(true);
        serviceS0212_NEGO_CMPT.mgrInsert_NEGO_ACCEPT(tIns).then((data) => {
            setLoadingTBL_KSV_ORDER_CMPT(false);
            if (typeof data.graphQLErrors === "undefined") {
                if (data.length > 0) {
                    alert(data[0].CODE);
                }
                search_LIST_1();
            } else {
                toast.current.show({
                    severity: "success",
                    summary: "FAILED: Delete Order",
                    detail: "fatal error",
                    life: 3000,
                });
            }
        });
    };

    const process_STS_CANCEL = () => {
        if (selectedTBL_KSV_ORDER_CMPT.length <= 0) return;

        var tIns = [];
        selectedTBL_KSV_ORDER_CMPT.forEach((col, i) => {
            var tObj = { ...col };
            if (typeof tObj.__typename !== "undefined") delete tObj.__typename;
            if (typeof tObj.id !== "undefined") delete tObj.id;
            tObj.OP_MODE = "CANCEL";
            tIns.push(tObj);
        });

        setLoadingTBL_KSV_ORDER_CMPT(true);
        serviceS0212_NEGO_CMPT.mgrInsert_NEGO_CANCEL(tIns).then((data) => {
            setLoadingTBL_KSV_ORDER_CMPT(false);
            if (typeof data.graphQLErrors === "undefined") {
                if (data.length > 0) {
                    alert(data[0].CODE);
                }
                search_LIST_1();
            } else {
                toast.current.show({
                    severity: "success",
                    summary: "FAILED: Delete Order",
                    detail: "fatal error",
                    life: 3000,
                });
            }
        });
    };

    const process_STS_RESET = () => {
        if (selectedTBL_KSV_ORDER_CMPT.length <= 0) return;

        var tIns = [];
        selectedTBL_KSV_ORDER_CMPT.forEach((col, i) => {
            var tObj = { ...col };
            if (typeof tObj.__typename !== "undefined") delete tObj.__typename;
            if (typeof tObj.id !== "undefined") delete tObj.id;
            tObj.OP_MODE = "RESET";
            tIns.push(tObj);
        });

        setLoadingTBL_KSV_ORDER_CMPT(true);
        serviceS0212_NEGO_CMPT.mgrInsert_NEGO_RESET(tIns).then((data) => {
            setLoadingTBL_KSV_ORDER_CMPT(false);
            if (typeof data.graphQLErrors === "undefined") {
                if (data.length > 0) {
                    alert(data[0].CODE);
                }
                search_LIST_1();
            } else {
                toast.current.show({
                    severity: "success",
                    summary: "FAILED: Delete Order",
                    detail: "fatal error",
                    life: 3000,
                });
            }
        });
    };

    /*QRY KSV_ORDER_CMPT */
    const [isFactory, setIsFactory] = useState(false);
    const [isSMD, setIsSMD] = useState(false);
    const [isMRP, setIsMRP] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    const [dataQRY_KSV_ORDER_CMPT, setDataQRY_KSV_ORDER_CMPT] = useState(
        emptyQRY_KSV_ORDER_CMPT,
    );
    const [
        datasQRY_KSV_ORDER_CMPT_FACTORY_CD,
        setDatasQRY_KSV_ORDER_CMPT_FACTORY_CD,
    ] = useState([]);
    const [
        dataQRY_KSV_ORDER_CMPT_FACTORY_CD,
        setDataQRY_KSV_ORDER_CMPT_FACTORY_CD,
    ] = useState({});

    const onDropdownChangeQRY_KSV_ORDER_CMPT_FACTORY_CD = (e, name) => {
        let val = (e.value && e.value.FACTORY_CD) || "";

        let _dataQRY_KSV_ORDER_CMPT = { ...dataQRY_KSV_ORDER_CMPT };

        let tTypeVal = _dataQRY_KSV_ORDER_CMPT[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_ORDER_CMPT[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_ORDER_CMPT[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_ORDER_CMPT(_dataQRY_KSV_ORDER_CMPT);
        setDataQRY_KSV_ORDER_CMPT_FACTORY_CD(e.value);
    };

    const [
        datasQRY_KSV_ORDER_CMPT_BUYER_CD,
        setDatasQRY_KSV_ORDER_CMPT_BUYER_CD,
    ] = useState([]);
    const [
        dataQRY_KSV_ORDER_CMPT_BUYER_CD,
        setDataQRY_KSV_ORDER_CMPT_BUYER_CD,
    ] = useState({});

    const onDropdownChangeQRY_KSV_ORDER_CMPT_BUYER_CD = (e, name) => {
        let val = (e.value && e.value.BUYER_CD) || "";

        let _dataQRY_KSV_ORDER_CMPT = { ...dataQRY_KSV_ORDER_CMPT };

        let tTypeVal = _dataQRY_KSV_ORDER_CMPT[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_ORDER_CMPT[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_ORDER_CMPT[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_ORDER_CMPT(_dataQRY_KSV_ORDER_CMPT);
        setDataQRY_KSV_ORDER_CMPT_BUYER_CD(e.value);
    };

    const onInputChangeQRY_KSV_ORDER_CMPT_STYLE_NAME = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_ORDER_CMPT = { ...dataQRY_KSV_ORDER_CMPT };

        let tTypeVal = _dataQRY_KSV_ORDER_CMPT[`${name}`];
        if (typeof tTypeVal === "string")
            _dataQRY_KSV_ORDER_CMPT[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_ORDER_CMPT[`${name}`] = parseInt(val);

        setDataQRY_KSV_ORDER_CMPT(_dataQRY_KSV_ORDER_CMPT);
    };

    const [
        datasQRY_KSV_ORDER_CMPT_FC_NEGO_TYPE,
        setDatasQRY_KSV_ORDER_CMPT_FC_NEGO_TYPE,
    ] = useState([]);
    const [
        dataQRY_KSV_ORDER_CMPT_FC_NEGO_TYPE,
        setDataQRY_KSV_ORDER_CMPT_FC_NEGO_TYPE,
    ] = useState({});

    const onDropdownChangeQRY_KSV_ORDER_CMPT_FC_NEGO_TYPE = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataQRY_KSV_ORDER_CMPT = { ...dataQRY_KSV_ORDER_CMPT };

        let tTypeVal = _dataQRY_KSV_ORDER_CMPT[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_ORDER_CMPT[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_ORDER_CMPT[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_ORDER_CMPT(_dataQRY_KSV_ORDER_CMPT);
        setDataQRY_KSV_ORDER_CMPT_FC_NEGO_TYPE(e.value);
    };

    const [datasQRY_KSV_ORDER_CMPT_PO_CD, setDatasQRY_KSV_ORDER_CMPT_PO_CD] =
        useState([]);
    const [dataQRY_KSV_ORDER_CMPT_PO_CD, setDataQRY_KSV_ORDER_CMPT_PO_CD] =
        useState({});

    const onInputChangeQRY_KSV_ORDER_CMPT_PO_CD = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_ORDER_CMPT = { ...dataQRY_KSV_ORDER_CMPT };

        let tTypeVal = _dataQRY_KSV_ORDER_CMPT[`${name}`];
        if (typeof tTypeVal === "string")
            _dataQRY_KSV_ORDER_CMPT[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_ORDER_CMPT[`${name}`] = parseInt(val);

        setDataQRY_KSV_ORDER_CMPT(_dataQRY_KSV_ORDER_CMPT);
    };

    const onInputChangeQRY_KSV_ORDER_CMPT_ORDER_CD = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_ORDER_CMPT = { ...dataQRY_KSV_ORDER_CMPT };

        let tTypeVal = _dataQRY_KSV_ORDER_CMPT[`${name}`];
        if (typeof tTypeVal === "string")
            _dataQRY_KSV_ORDER_CMPT[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_ORDER_CMPT[`${name}`] = parseInt(val);

        setDataQRY_KSV_ORDER_CMPT(_dataQRY_KSV_ORDER_CMPT);
    };

    const onCheckboxChangeQRY_KSV_ORDER_CMPT_DUE_DATE_FLAG = (e, name) => {
        let val = "";
        let _dataQRY_KSV_ORDER_CMPT = { ...dataQRY_KSV_ORDER_CMPT };
        if (e.checked) {
            val = "1";
        } else {
            val = "0";
        }
        _dataQRY_KSV_ORDER_CMPT[`${name}`] = val;
        setDataQRY_KSV_ORDER_CMPT(_dataQRY_KSV_ORDER_CMPT);
    };

    const onCalChangeQRY_KSV_ORDER_CMPT_S_DUE_DATE = (e, name) => {
        let val1 = e.value || "";
        let val = "";
        if (val1 === "") {
            val = "";
        } else {
            val = getDateVal(val1);
        }

        let _dataQRY_KSV_ORDER_CMPT = { ...dataQRY_KSV_ORDER_CMPT };
        _dataQRY_KSV_ORDER_CMPT[`${name}`] = val;
        setDataQRY_KSV_ORDER_CMPT(_dataQRY_KSV_ORDER_CMPT);
    };

    const onCalChangeQRY_KSV_ORDER_CMPT_E_DUE_DATE = (e, name) => {
        let val1 = e.value || "";
        let val = "";
        if (val1 === "") {
            val = "";
        } else {
            val = getDateVal(val1);
        }

        let _dataQRY_KSV_ORDER_CMPT = { ...dataQRY_KSV_ORDER_CMPT };
        _dataQRY_KSV_ORDER_CMPT[`${name}`] = val;
        setDataQRY_KSV_ORDER_CMPT(_dataQRY_KSV_ORDER_CMPT);
    };

    const onCheckboxChangeQRY_KSV_ORDER_CMPT_EXFACTORY_DATE_FLAG = (
        e,
        name,
    ) => {
        let val = "";
        let _dataQRY_KSV_ORDER_CMPT = { ...dataQRY_KSV_ORDER_CMPT };
        if (e.checked) {
            val = "1";
        } else {
            val = "0";
        }
        _dataQRY_KSV_ORDER_CMPT[`${name}`] = val;
        setDataQRY_KSV_ORDER_CMPT(_dataQRY_KSV_ORDER_CMPT);
    };

    const onCalChangeQRY_KSV_ORDER_CMPT_S_EXFACTORY_DATE = (e, name) => {
        let val1 = e.value || "";
        let val = "";
        if (val1 === "") {
            val = "";
        } else {
            val = getDateVal(val1);
        }

        let _dataQRY_KSV_ORDER_CMPT = { ...dataQRY_KSV_ORDER_CMPT };
        _dataQRY_KSV_ORDER_CMPT[`${name}`] = val;
        setDataQRY_KSV_ORDER_CMPT(_dataQRY_KSV_ORDER_CMPT);
    };

    const onCalChangeQRY_KSV_ORDER_CMPT_E_EXFACTORY_DATE = (e, name) => {
        let val1 = e.value || "";
        let val = "";
        if (val1 === "") {
            val = "";
        } else {
            val = getDateVal(val1);
        }

        let _dataQRY_KSV_ORDER_CMPT = { ...dataQRY_KSV_ORDER_CMPT };
        _dataQRY_KSV_ORDER_CMPT[`${name}`] = val;
        setDataQRY_KSV_ORDER_CMPT(_dataQRY_KSV_ORDER_CMPT);
    };

    /*TABLE KSV_ORDER_CMPT */
    // DEFINE DATAGRID : TBL_KSV_ORDER_CMPT
    const [datasTBL_KSV_ORDER_CMPT, setDatasTBL_KSV_ORDER_CMPT] = useState([]);
    const dt_TBL_KSV_ORDER_CMPT = useRef(null);
    const [dataTBL_KSV_ORDER_CMPT, setDataTBL_KSV_ORDER_CMPT] = useState(
        emptyTBL_KSV_ORDER_CMPT,
    );
    const [selectedTBL_KSV_ORDER_CMPT, setSelectedTBL_KSV_ORDER_CMPT] =
        useState([]);
    const [
        flagSelectModeTBL_KSV_ORDER_CMPT,
        setFlagSelectModeTBL_KSV_ORDER_CMPT,
    ] = useState(false);

    const [loadingTBL_KSV_ORDER_CMPT, setLoadingTBL_KSV_ORDER_CMPT] =
        useState(false);

    // DATAGRID CODE : TBL_KSV_ORDER_CMPT

    const onRowClick1TBL_KSV_ORDER_CMPT = (argData0) => {
        var argData = {};

        if (typeof argData0.length !== "undefined") {
            argData = argData0[0];
        } else {
            argData = argData0;
        }

        let argTBL_KSV_ORDER_CMPT = argData;

        setDataTBL_KSV_ORDER_CMPT(argTBL_KSV_ORDER_CMPT);
    };

    const search_LIST_1 = () => {
        if (
            dataQRY_KSV_ORDER_CMPT.ORDER_CD === "" &&
            dataQRY_KSV_ORDER_CMPT.PO_CD === ""
        ) {
            if (dataQRY_KSV_ORDER_CMPT.FACTORY_CD === "") {
                alert("Please select a factory.");
                return;
            }

            if (dataQRY_KSV_ORDER_CMPT.BUYER_CD === "") {
                alert("Please select a buyer.");
                return;
            }
        }

        if (
            dataQRY_KSV_ORDER_CMPT.DUE_DATE_FLAG === "" &&
            dataQRY_KSV_ORDER_CMPT.EXFACTORY_DATE_FLAG === ""
        ) {
            alert("Please select a date search option.");
            return;
        }

        if (
            dataQRY_KSV_ORDER_CMPT.DUE_DATE_FLAG === "1" &&
            dataQRY_KSV_ORDER_CMPT.S_DUE_DATE === "" &&
            dataQRY_KSV_ORDER_CMPT.E_DUE_DATE === ""
        ) {
            alert("Please select a due date.");
            return;
        }

        if (
            dataQRY_KSV_ORDER_CMPT.EXFACTORY_DATE_FLAG === "1" &&
            dataQRY_KSV_ORDER_CMPT.S_EXFACTORY_DATE === "" &&
            dataQRY_KSV_ORDER_CMPT.E_EXFACTORY_DATE === ""
        ) {
            alert("Please select a exfactory date.");
            return;
        }

        clearSelectedTBL_KSV_ORDER_CMPT();
        setLoadingTBL_KSV_ORDER_CMPT(true);

        serviceS0212_NEGO_CMPT
            .mgrQuery_LIST_1(dataQRY_KSV_ORDER_CMPT)
            .then((data) => {
                setLoadingTBL_KSV_ORDER_CMPT(false);
                if (typeof data.graphQLErrors === "undefined") {
                    console.log(
                        "ServiceNawooAll.mgrQueryTBL_KSV_ORDER_CMPT() call => " +
                            data.length,
                    );
                    if (data.length > 0) {
                        var tArray = data.map((col, i) => {
                            var tObj = { ...col };
                            tObj.id = i + 1;
                            return tObj;
                        });
                        setDatasTBL_KSV_ORDER_CMPT(tArray);
                    } else {
                        alert("No data found.");
                        setDatasTBL_KSV_ORDER_CMPT([]);
                        return;
                    }
                } else {
                    // var tStr = data.graphQLErrors[0].message;
                    console.log(
                        "ServiceNawooAll.mgrQueryTBL_KSV_ORDER_CMPT()error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });

        // Service : NawooAll:mgrQueryTBL_KSV_ORDER_CMPT
    };

    const clearSelectedTBL_KSV_ORDER_CMPT = () => {
        setSelectedTBL_KSV_ORDER_CMPT([]);
        setFlagSelectModeTBL_KSV_ORDER_CMPT(false);
    };

    const exportExcelTBL_KSV_ORDER_CMPT = () => {
        import("xlsx").then((xlsx) => {
            const worksheet = xlsx.utils.json_to_sheet(datasTBL_KSV_ORDER_CMPT);
            const workbook = {
                Sheets: { data: worksheet },
                SheetNames: ["data"],
            };
            const excelBuffer = xlsx.write(workbook, {
                bookType: "xlsx",
                type: "array",
            });
            saveAsExcelFileTBL_KSV_ORDER_CMPT(excelBuffer, "CMPT목록");
        });
    };

    const saveAsExcelFileTBL_KSV_ORDER_CMPT = (buffer, fileName) => {
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

    /*TABLE KSV_ORDER_CMPT */
    // DEFINE DATAGRID : TBL_KSV_ORDER_CMPT2
    const [datasTBL_KSV_ORDER_CMPT2, setDatasTBL_KSV_ORDER_CMPT2] = useState(
        [],
    );
    const dt_TBL_KSV_ORDER_CMPT2 = useRef(null);
    const [dataTBL_KSV_ORDER_CMPT2, setDataTBL_KSV_ORDER_CMPT2] = useState(
        emptyTBL_KSV_ORDER_CMPT2,
    );
    const [selectedTBL_KSV_ORDER_CMPT2, setSelectedTBL_KSV_ORDER_CMPT2] =
        useState([]);
    const [
        flagSelectModeTBL_KSV_ORDER_CMPT2,
        setFlagSelectModeTBL_KSV_ORDER_CMPT2,
    ] = useState(false);

    // DATAGRID CODE : TBL_KSV_ORDER_CMPT2

    const onRowClick1TBL_KSV_ORDER_CMPT2 = (argData0) => {
        var argData = {};

        if (typeof argData0.length !== "undefined") {
            argData = argData0[0];
        } else {
            argData = argData0;
        }

        let argTBL_KSV_ORDER_CMPT2 = argData;

        setDataTBL_KSV_ORDER_CMPT2(argTBL_KSV_ORDER_CMPT2);
    };

    const onRowClickTBL_KSV_ORDER_CMPT2 = (event) => {
        let argTBL_KSV_ORDER_CMPT2 = event.data;
        if (flagSelectModeTBL_KSV_ORDER_CMPT2) return;

        // Service : NawooAll:mgrQueryTBL_KSV_ORDER_CMPT2
    };

    /**EDIT KSV_ORDER_CMPT */

    const [datasEDT_KSV_ORDER_CMPT, setDatasEDT_KSV_ORDER_CMPT] = useState([]);
    const [dataEDT_KSV_ORDER_CMPT, setDataEDT_KSV_ORDER_CMPT] = useState(
        emptyEDT_KSV_ORDER_CMPT,
    );

    useEffect(() => {
        serviceS0212_NEGO_CMPT
            .mgrQueryTBL_KSV_ORDER_CMPT_CODE()
            .then((data) => {
                if (typeof data.graphQLErrors === "undefined") {
                    console.log(
                        "serviceS0212_NEGO_CMPT.mgrQueryTBL_KSV_ORDER_CMPT_CODE call => " +
                            data.PO_CD.length,
                    );
                    setDatasQRY_KSV_ORDER_CMPT_FACTORY_CD(data.FACTORY_CD);
                    setDataQRY_KSV_ORDER_CMPT_FACTORY_CD(data.FACTORY_CD[0]);

                    setDatasQRY_KSV_ORDER_CMPT_BUYER_CD(data.BUYER_CD);
                    setDataQRY_KSV_ORDER_CMPT_BUYER_CD(data.BUYER_CD[0]);

                    setDatasQRY_KSV_ORDER_CMPT_FC_NEGO_TYPE(data.NEGO_TYPE);
                    setDataQRY_KSV_ORDER_CMPT_FC_NEGO_TYPE(data.NEGO_TYPE[0]);

                    setDatasQRY_KSV_ORDER_CMPT_PO_CD(data.PO_CD);
                    setDataQRY_KSV_ORDER_CMPT_PO_CD(data.PO_CD[0]);

                    var tRetDate = serviceLib.getCurrDate().substring(0, 8);
                    var tObj = { ...dataQRY_KSV_ORDER_CMPT };

                    const monthStart = moment()
                        .startOf("month")
                        .format("YYYYMMDD");
                    const monthEnd = moment().endOf("month").format("YYYYMMDD");

                    tObj.S_DUE_DATE = monthStart;
                    tObj.E_DUE_DATE = monthEnd;
                    tObj.S_EXFACTORY_DATE = monthStart;
                    tObj.E_EXFACTORY_DATE = monthEnd;
                    setDataQRY_KSV_ORDER_CMPT(tObj);

                    setDataQRY_KSV_ORDER_CMPT({ ...tObj, DUE_DATE_FLAG: "1" });
                } else {
                    console.log(
                        "serviceS0212_NEGO_CMPT.mgrQueryTBL_KSV_ORDER_CMPT_CODE error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });

        let userInfo = serviceLib.getUserInfo();

        if (
            userInfo.USER_ID !== "won21kr" &&
            userInfo.USER_ID !== "lih7912" &&
            userInfo.USER_ID !== "chibumy"
        ) {
            console.log(userInfo);

            if (
                userInfo.FACTORY_CD !== "FC010" ||
                userInfo.PART === "VS" ||
                userInfo.PART === "ES"
            ) {
                // Factory User
                console.log("Factory User");
                setIsFactory(true);
            }

            if (userInfo.PART === "08") {
                // MRP
                console.log("MRP User");
                setIsMRP(true);
            }

            if (
                userInfo.PART === "S01" ||
                userInfo.PART === "S02" ||
                userInfo.PART === "S03" ||
                userInfo.PART === "S04" ||
                userInfo.PART === "S05" ||
                userInfo.PART === "S06"
            ) {
                console.log("SMD User");
                console.log(isFactory && !isMRP && !isSMD && !isAdmin);
                setIsSMD(true);
            }
        } else {
            setIsAdmin(true);
        }
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

    const onCellEditCompleteKSV_ORDER_CMPT = (e) => {
        let { rowData, newValue, value, field, originalEvent: event } = e;
        var tRowData = { ...rowData };
        tRowData[field] = newValue;

        rowData[field] = newValue;

        var tSubTotal = 0;
        tSubTotal += parseFloat(tRowData["CMPT"]);
        tSubTotal += parseFloat(tRowData["SCREEN_PRINT"]);
        tSubTotal += parseFloat(tRowData["HEAT_SILICON"]);
        tSubTotal += parseFloat(tRowData["EMBROIDERY"]);
        tSubTotal += parseFloat(tRowData["TPR"]);
        tSubTotal += parseFloat(tRowData["WELDING"]);
        tSubTotal += parseFloat(tRowData["QUILTING"]);
        tSubTotal += parseFloat(tRowData["DIGITAL_PRINT"]);
        tSubTotal += parseFloat(tRowData["LABEL_PRINT"]);

        var tTotal = tSubTotal + parseFloat(tRowData["LOCAL"]);

        rowData["SUB_TOTAL_COST"] = String(tSubTotal);
        rowData["TOTAL_COST"] = String(tTotal);
    };

    // GUIDE: 에디터 컴포넌트에 onKeyDown 이벤트를 연결한다.
    const onChangeTextEdit = (e, options) => {
        options.editorCallback(e.target.value);
    };

    const handleFocus = (event) => event.target.select();

    const cellEditorKSV_ORDER_CMPT = (options) => {
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

    return (
        <div className="af-div-main">
            <div
                className="af-div-first"
                style={{ width: "81.5rem", height: "13rem" }}
            >
                <span className="af-span-3-0" style={{ width: "39rem" }}>
                    <p className="af-span-p" style={{ width: "10rem" }}>Factory</p>
                    <div className="af-span-div" style={{ width: "20rem" }}>
                        <Dropdown
                            style={{ width: "20rem" }}
                            id="id_FACTORY_CD"
                            value={dataQRY_KSV_ORDER_CMPT_FACTORY_CD}
                            onChange={(e) =>
                                onDropdownChangeQRY_KSV_ORDER_CMPT_FACTORY_CD(
                                    e,
                                    "FACTORY_CD",
                                )
                            }
                            options={datasQRY_KSV_ORDER_CMPT_FACTORY_CD}
                            optionLabel="FACTORY_NAME"
                            placeholder=""
                            editable
                        ></Dropdown>
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "39rem" }}>
                    <p className="af-span-p" style={{ width: "10rem" }}>Buyer</p>
                    <div className="af-span-div" style={{ width: "20rem" }}>
                        <Dropdown
                            style={{ width: "20rem" }}
                            id="id_BUYER_CD"
                            value={dataQRY_KSV_ORDER_CMPT_BUYER_CD}
                            onChange={(e) =>
                                onDropdownChangeQRY_KSV_ORDER_CMPT_BUYER_CD(
                                    e,
                                    "BUYER_CD",
                                )
                            }
                            options={datasQRY_KSV_ORDER_CMPT_BUYER_CD}
                            optionLabel="BUYER_NAME"
                            placeholder=""
                            editable
                            filter
                        ></Dropdown>
                    </div>
                </span>

                <span className="af-span-3" style={{ width: "39rem" }}>
                    <p className="af-span-p" style={{ width: "10rem" }}>Style</p>
                    <div className="af-span-div" style={{ width: "20rem" }}>
                        <InputText
                            style={{ width: "20rem" }}
                            id="id_STYLE_NAME"
                            value={dataQRY_KSV_ORDER_CMPT.STYLE_NAME}
                            onChange={(e) =>
                                onInputChangeQRY_KSV_ORDER_CMPT_STYLE_NAME(
                                    e,
                                    "STYLE_NAME",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "39rem" }}>
                    <p className="af-span-p" style={{ width: "10rem" }}>Nego Type</p>
                    <div className="af-span-div" style={{ width: "20rem" }}>
                        <Dropdown
                            style={{ width: "20rem" }}
                            id="id_FC_NEGO_TYPE"
                            value={dataQRY_KSV_ORDER_CMPT_FC_NEGO_TYPE}
                            onChange={(e) =>
                                onDropdownChangeQRY_KSV_ORDER_CMPT_FC_NEGO_TYPE(
                                    e,
                                    "FC_NEGO_TYPE",
                                )
                            }
                            options={datasQRY_KSV_ORDER_CMPT_FC_NEGO_TYPE}
                            optionLabel="CD_NAME"
                            placeholder=""
                            editable
                        ></Dropdown>
                    </div>
                </span>

                <span className="af-span-3" style={{ width: "39rem" }}>
                    <p className="af-span-p" style={{ width: "10rem" }}>PO#</p>
                    <div className="af-span-div" style={{ width: "20rem" }}>
                        <InputText
                            style={{ width: "20rem" }}
                            id="id_STYLE_NAME"
                            value={dataQRY_KSV_ORDER_CMPT.PO_CD}
                            onChange={(e) =>
                                onInputChangeQRY_KSV_ORDER_CMPT_PO_CD(
                                    e,
                                    "PO_CD",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "39rem" }}>
                    <p className="af-span-p" style={{ width: "10rem" }}>Order#</p>
                    <div className="af-span-div" style={{ width: "20rem" }}>
                        <InputText
                            style={{
                                marginLeft: "0.5rem",
                                display: "inline-block",
                                width: "15rem",
                            }}
                            id="id_ORDER_CD"
                            value={dataQRY_KSV_ORDER_CMPT.ORDER_CD}
                            onChange={(e) =>
                                onInputChangeQRY_KSV_ORDER_CMPT_ORDER_CD(
                                    e,
                                    "ORDER_CD",
                                )
                            }
                        />
                    </div>
                </span>

                <span className="af-span-3" style={{ width: "10rem" }}>
                    <p className="af-span-p" style={{ width: "7rem" }}>EXF date</p>
                    <div className="af-span-checkbox">
                        <Checkbox
                            id="id_DUE_DATE_FLAG"
                            checked={changeCheckBoxVal(
                                dataQRY_KSV_ORDER_CMPT.DUE_DATE_FLAG,
                            )}
                            onChange={(e) =>
                                onCheckboxChangeQRY_KSV_ORDER_CMPT_DUE_DATE_FLAG(
                                    e,
                                    "DUE_DATE_FLAG",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "11rem" }}>
                    <div className="af-span-div" style={{ width: "10rem" }}>
                        <Calendar
                            showButtonBar
                            style={{ width: "10rem" }}
                            dateFormat="yy-mm-dd"
                            id="id_S_DUE_DATE"
                            value={changeDateVal(
                                dataQRY_KSV_ORDER_CMPT.S_DUE_DATE,
                            )}
                            onChange={(e) =>
                                onCalChangeQRY_KSV_ORDER_CMPT_S_DUE_DATE(
                                    e,
                                    "S_DUE_DATE",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "12rem" }}>
                    <p className="af-span-p" style={{ width: "1rem" }}>~</p>
                    <div className="af-span-div" style={{ width: "10rem" }}>
                        <Calendar
                            showButtonBar
                            style={{ width: "10rem" }}
                            dateFormat="yy-mm-dd"
                            id="id_E_DUE_DATE"
                            value={changeDateVal(
                                dataQRY_KSV_ORDER_CMPT.E_DUE_DATE,
                            )}
                            onChange={(e) =>
                                onCalChangeQRY_KSV_ORDER_CMPT_E_DUE_DATE(
                                    e,
                                    "E_DUE_DATE",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "42rem" }}>
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

                <span className="af-span-3" style={{ width: "10rem" }}>
                    <p className="af-span-p" style={{ width: "7rem" }}>Ship Date</p>
                    <div className="af-span-checkbox">
                        <Checkbox
                            id="id_EXFACTORY_DATE_FLAG"
                            checked={changeCheckBoxVal(
                                dataQRY_KSV_ORDER_CMPT.EXFACTORY_DATE_FLAG,
                            )}
                            onChange={(e) =>
                                onCheckboxChangeQRY_KSV_ORDER_CMPT_EXFACTORY_DATE_FLAG(
                                    e,
                                    "EXFACTORY_DATE_FLAG",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "11rem" }}>
                    <div className="af-span-div" style={{ width: "10rem" }}>
                        <Calendar
                            showButtonBar
                            style={{ width: "10rem" }}
                            dateFormat="yy-mm-dd"
                            id="id_S_EXFACTORY_DATE"
                            value={changeDateVal(
                                dataQRY_KSV_ORDER_CMPT.S_EXFACTORY_DATE,
                            )}
                            onChange={(e) =>
                                onCalChangeQRY_KSV_ORDER_CMPT_S_EXFACTORY_DATE(
                                    e,
                                    "S_EXFACTORY_DATE",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "12rem" }}>
                    <p className="af-span-p" style={{ width: "1rem" }}>~</p>
                    <div className="af-span-div" style={{ width: "10rem" }}>
                        <Calendar
                            showButtonBar
                            style={{ width: "10rem" }}
                            dateFormat="yy-mm-dd"
                            id="id_E_EXFACTORY_DATE"
                            value={changeDateVal(
                                dataQRY_KSV_ORDER_CMPT.E_EXFACTORY_DATE,
                            )}
                            onChange={(e) =>
                                onCalChangeQRY_KSV_ORDER_CMPT_E_EXFACTORY_DATE(
                                    e,
                                    "E_EXFACTORY_DATE",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "42rem" }}>
                    <div className="af-span-div-btn" style={{ width: "10rem" }}>
                        <Button
                            label="Excel"
                            style={{ width: "10rem" }}
                            className="p-button-text green"
                            onClick={exportExcelTBL_KSV_ORDER_CMPT}
                        />
                    </div>
                </span>
            </div>
            <div
                className="af-div-second"
                style={{ width: "20rem", height: "13rem" }}
            >
                <span className="af-span-0" style={{ width: "19rem" }}>
                    <p className="af-span-p" style={{ width: "19rem" }}>FAC</p>
                </span>
                <span className="af-span" style={{ width: "19rem" }}>
                    <div className="af-span-div-btn" style={{ width: "18rem" }}>
                        <Button
                            disabled={!isFactory && !isAdmin}
                            style={{ width: "18rem" }}
                            label="Present"
                            className="p-button-text"
                            onClick={process_FAC_PRESENT}
                        />
                    </div>
                </span>
                <span className="af-span" style={{ width: "19rem" }}>
                    <div className="af-span-div-btn" style={{ width: "18rem" }}>
                        <Button
                            disabled={!isFactory && !isAdmin}
                            label="Re-Present"
                            style={{ width: "18rem" }}
                            className="p-button-text"
                            onClick={process_FAC_REPRESENT}
                        />
                    </div>
                </span>
                <span className="af-span" style={{ width: "19rem" }}>
                    <div className="af-span-div-btn" style={{ width: "18rem" }}>
                        <Button
                            disabled={!isFactory && !isSMD && !isMRP && !isAdmin}
                            label="Get PHERQDL"
                            style={{ width: "18em" }}
                            className="p-button-text"
                            onClick={process_GET_PHERQDL}
                        />
                    </div>
                </span>
                <span className="af-span" style={{ width: "19rem" }}>
                    <div className="af-span-div-btn" style={{ width: "18rem" }}>
                        <Button
                            disabled={isMRP && !isAdmin}
                            label="All Reset"
                            style={{ width: "18rem" }}
                            className="p-button-text"
                            onClick={process_STS_RESET}
                        />
                    </div>
                </span>
            </div>
            <div
                className="af-div-second"
                style={{ width: "20rem", height: "13rem" }}
            >
                <span className="af-span-0" style={{ width: "19rem" }}>
                    <p className="af-span-p" style={{ width: "19rem" }}>ShinTS</p>
                </span>
                <span className="af-span" style={{ width: "19rem" }}>
                    <div className="af-span-div-btn" style={{ width: "18rem" }}>
                        <Button
                            disabled={isFactory && !isMRP && !isSMD && !isAdmin}
                            label="Accept"
                            style={{ width: "18rem" }}
                            className="p-button-text"
                            onClick={process_STS_ACCEPT}
                        />
                    </div>
                </span>
                <span className="af-span" style={{ width: "19rem" }}>
                    <div className="af-span-div-btn" style={{ width: "18rem" }}>
                        <Button
                            disabled={isFactory && !isMRP && !isSMD && !isAdmin}
                            label="Reject"
                            style={{ width: "18rem" }}
                            className="p-button-text"
                            onClick={process_STS_REJECT}
                        />
                    </div>
                </span>
                <span className="af-span" style={{ width: "19rem" }}>
                    <div className="af-span-div-btn" style={{ width: "18rem" }}>
                        <Button
                            disabled={isFactory && !isMRP && !isSMD && !isAdmin}
                            label="Acc/Rej Cancel"
                            style={{ width: "18rem" }}
                            className="p-button-text"
                            onClick={process_STS_CANCEL}
                        />
                    </div>
                </span>
                <span className="af-span" style={{ width: "19rem" }}>
                    <div className="af-span-div-btn" style={{ width: "18rem" }}>
                        <Button
                            disabled={isMRP}
                            label="All Reset"
                            style={{ width: "18rem" }}
                            className="p-button-text"
                            onClick={process_STS_RESET}
                        />
                    </div>
                </span>
            </div>

            <div
                className="af-div-first"
                style={{ width: "123rem", height: "42rem" }}
            >
                <AFDataTable preventUnrelatedRerender
                    ref={dt_TBL_KSV_ORDER_CMPT}
                    editMode="cell"
                    size="small"
                    value={datasTBL_KSV_ORDER_CMPT}
                    tableStyle={{ tableLayout: "fixed" }}
                    loading={loadingTBL_KSV_ORDER_CMPT}
                    resizableColumns
                    columnResizeMode="expand"
                    // metaKeySelection={false}
                    showGridlines
                    selectionMode="checkbox"
                    selection={selectedTBL_KSV_ORDER_CMPT}
                    onSelectionChange={(e) => {
                        setSelectedTBL_KSV_ORDER_CMPT(e.value);
                        onRowClick1TBL_KSV_ORDER_CMPT(e.value);
                    }}
                    // onRowClick={onRowClickTBL_KSV_ORDER_CMPT}
                    dataKey="id"
                    className="datatable-responsive"
                    virtualScrollerOptions={{ itemSize: 20 }}
                    emptyMessage=" "
                    //header={headerTBL_KSV_ORDER_CMPT}
                    responsiveLayout="scroll"
                    scrollable
                    scrollHeight="42rem"
                >
                    <AFColumn selectionMode="multiple" field="__checkbox__" reorderable={false} headerClassName="t-header" headerStyle={{ width: "3rem" }} ></AFColumn>
                    <AFColumn field="NEGO_TYPE_N" headerClassName="t-header" header="Nego Status" style={{ width: "8rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="PO_CD" headerClassName="t-header" header="Po#" style={{ width: "8rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="ORDER_CD" headerClassName="t-header" header="Order#" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="STYLE_NAME" headerClassName="t-header" header="Style Name" style={{ width: "30rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="DUE_DATE" headerClassName="t-header" header="Due Date" style={{ width: "10rem", flexBasis: "auto" }} body={(rowData) => serviceLib.dateFormat(rowData.DUE_DATE) } ></AFColumn>

                    <AFColumn field="PRICE" headerClassName="t-header" header="Price" style={{ width: "6rem", flexBasis: "auto" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.PRICE, 4) } ></AFColumn>
                    <AFColumn field="TOT_CNT" headerClassName="t-header" header="Order Qty" style={{ width: "6rem", flexBasis: "auto" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.TOT_CNT) } ></AFColumn>
                    <AFColumn field="CMPT" headerStyle={{ color: "green" }} headerClassName="t-header" header="CMPT" style={{ width: "6rem", flexBasis: "auto" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numToFixed(rowData.CMPT, 2) } editor={(options) => cellEditorKSV_ORDER_CMPT(options)} onCellEditComplete={onCellEditCompleteKSV_ORDER_CMPT} ></AFColumn>
                    <AFColumn field="STS_CMPT" headerStyle={{ color: "green" }} headerClassName="t-header" header="STS CMPT" style={{ width: "6rem", flexBasis: "auto" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numToFixed(rowData.STS_CMPT, 2) } editor={(options) => cellEditorKSV_ORDER_CMPT(options)} onCellEditComplete={onCellEditCompleteKSV_ORDER_CMPT} ></AFColumn>
                    <AFColumn field="SCREEN_PRINT" headerClassName="t-header" header="Screen P" style={{ width: "9rem", flexBasis: "auto" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numToFixed(rowData.SCREEN_PRINT, 2) } ></AFColumn>
                    <AFColumn field="HEAT_SILICON" headerClassName="t-header" header="Embossing" style={{ width: "12rem", flexBasis: "auto" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numToFixed(rowData.HEAT_SILICON, 2) } ></AFColumn>
                    <AFColumn field="EMBROIDERY" headerClassName="t-header" header="EMB" style={{ width: "8rem", flexBasis: "auto" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numToFixed(rowData.EMBROIDERY, 2) } ></AFColumn>
                    <AFColumn field="TPR" headerClassName="t-header" header="TPR" style={{ width: "8rem", flexBasis: "auto" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numToFixed(rowData.TPR, 2) } ></AFColumn>
                    <AFColumn field="WELDING" headerStyle={{ color: "green" }} headerClassName="t-header" header="Welding" style={{ color: "green", width: "8rem", flexBasis: "auto", }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numToFixed(rowData.WELDING, 2) } editor={(options) => cellEditorKSV_ORDER_CMPT(options)} onCellEditComplete={onCellEditCompleteKSV_ORDER_CMPT} ></AFColumn>
                    <AFColumn field="QUILTING" headerClassName="t-header" header="Quilting" style={{ width: "8rem", flexBasis: "auto" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numToFixed(rowData.QUILTING, 2) } ></AFColumn>
                    <AFColumn field="DIGITAL_PRINT" headerClassName="t-header" header="Digital P" style={{ width: "8rem", flexBasis: "auto" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numToFixed(rowData.DIGITAL_PRINT, 2) } ></AFColumn>
                    <AFColumn field="LABEL_PRINT" headerClassName="t-header" header="Label P" style={{ width: "8rem", flexBasis: "auto" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numToFixed(rowData.LABEL_PRINT, 2) } ></AFColumn>
                    <AFColumn field="SUB_TOTAL_COST" headerStyle={{ color: "green" }} headerClassName="t-header" header="Sub Total" style={{ color: "green", width: "8rem", flexBasis: "auto", }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numToFixed(rowData.SUB_TOTAL_COST, 2) } editor={(options) => cellEditorKSV_ORDER_CMPT(options)} onCellEditComplete={onCellEditCompleteKSV_ORDER_CMPT} ></AFColumn>
                    <AFColumn field="LOCAL" headerClassName="t-header" header="Local Matl" style={{ width: "8rem", flexBasis: "auto" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numToFixed(rowData.LOCAL, 2) } ></AFColumn>

                    <AFColumn field="TOTAL_COST" headerClassName="t-header" header="Total Cost" style={{ width: "8rem", flexBasis: "auto" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numToFixed(rowData.TOTAL_COST, 2) } ></AFColumn>
                    <AFColumn field="NEGO_SEQ" headerClassName="t-header" header="Cmpt #" style={{ width: "3rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="LOC" headerClassName="t-header" header="Loc" style={{ width: "4rem", flexBasis: "auto" }} ></AFColumn>
                </AFDataTable>
            </div>

            <div
                className="af-div-first"
                style={{
                    width: "123rem",
                    height: "6rem",
                    paddingTop: "20px",
                    paddingLeft: "20px",
                }}
            >
                <span className="af-span" style={{ width: "14rem" }}>
                    <div className="af-span-div-btn" style={{ width: "13rem" }}>
                        <Button
                            style={{ width: "13rem" }}
                            label="Reset"
                            className="p-button-text"
                            onClick={process_RESET}
                        />
                    </div>
                </span>
                <span className="af-span" style={{ width: "14rem" }}>
                    <div className="af-span-div-btn" style={{ width: "13rem" }}>
                        <Button
                            style={{ width: "13rem", color: "blue" }}
                            label="Nego History"
                            className="p-button-text"
                            onClick={process_NEGO_HISTORY}
                        />
                    </div>
                </span>
                <span className="af-span" style={{ width: "14rem" }}>
                    <div className="af-span-div-btn" style={{ width: "13rem" }}>
                        <Button
                            style={{ width: "13rem" }}
                            label="List"
                            className="p-button-text green"
                            onClick={exportExcelTBL_KSV_ORDER_CMPT}
                        />
                    </div>
                </span>
                <span className="af-span" style={{ width: "14rem" }}>
                    <div className="af-span-div-btn" style={{ width: "13rem" }}>
                        <Button
                            style={{ width: "13rem" }}
                            label="CMPT Detail"
                            className="p-button-text green"
                            onClick={() => process_EXCEL_PRINT()}
                        />
                    </div>
                </span>
                <span className="af-span" style={{ width: "14rem" }}>
                    <div className="af-span-div-btn" style={{ width: "13rem" }}>
                        <Button
                            style={{ width: "13rem" }}
                            label="Local Detail"
                            className="p-button-text green"
                            onClick={() => process_EXCEL_PRINT("LOCAL")}
                        />
                    </div>
                </span>
            </div>

            <Toast ref={toast} />
            <Dialog
                visible={isNegoHistory}
                position="mid-center"
                style={{ width: "100vw" }}
                header="Nego History"
                modal={true}
                className="p-fluid"
                onHide={hideDialog}
            >
                <div
                    className="af-div-first"
                    style={{ width: "120rem", height: "30rem" }}
                >
                    <AFDataTable preventUnrelatedRerender
                        ref={dt_TBL_KSV_ORDER_CMPT2}
                        size="small"
                        value={datasTBL_KSV_ORDER_CMPT2}
                        tableStyle={{ tableLayout: "fixed" }}
                        resizableColumns
                        columnResizeMode="expand"
                        showGridlines
                        selectionMode="checkbox"
                        selection={selectedTBL_KSV_ORDER_CMPT2}
                        onSelectionChange={(e) => {
                            setFlagSelectModeTBL_KSV_ORDER_CMPT2(true);
                            setSelectedTBL_KSV_ORDER_CMPT2(e.value);
                            console.log(
                                "selected length:" +
                                    selectedTBL_KSV_ORDER_CMPT2.length,
                            );
                            onRowClick1TBL_KSV_ORDER_CMPT2(e.value);
                        }}
                        onRowClick={onRowClickTBL_KSV_ORDER_CMPT2}
                        dataKey="id"
                        className="datatable-responsive"
                        virtualScrollerOptions={{ itemSize: 20 }}
                        emptyMessage=" "
                        //header={headerTBL_KSV_ORDER_CMPT2}
                        responsiveLayout="scroll"
                        scrollable
                        scrollHeight="30rem"
                    >
                        <AFColumn field="NEGO_SEQ" headerClassName="t-header" header="Nego#" style={{ width: "8rem", flexBasis: "auto" }} ></AFColumn>
                        <AFColumn field="CMPT" headerClassName="t-header" header="Bvt Cmpt" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                        <AFColumn field="CD_NAME" headerClassName="t-header" header="Cmpt Type" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                        <AFColumn field="STS_CMPT" headerClassName="t-header" header="Sts Cmpt" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                        <AFColumn field="REMARK" headerClassName="t-header" header="Remark" style={{ width: "20rem", flexBasis: "auto" }} ></AFColumn>
                        <AFColumn field="REG_USER" headerClassName="t-header" header="Reg User" style={{ width: "8rem", flexBasis: "auto" }} ></AFColumn>
                        <AFColumn field="REG_DATETIME" headerClassName="t-header" header="Reg Datetime" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    </AFDataTable>
                </div>
            </Dialog>
        </div>
    );
};

const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(S0212_NEGO_CMPT, comparisonFn);
