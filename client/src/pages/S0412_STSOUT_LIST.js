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
import { ServiceS0412_STSOUT_LIST } from "../service/service_biz/ServiceS0412_STSOUT_LIST";

import "./page_common.scss";

const emptyKCD_CODE = {
    id: 0,
    CD_GROUP: "",
    CD_CODE: "",
    CD_NAME: "",
    CD_FLAG: "",
};

const emptyQRY_KSV_STOCK_OUT1 = {
    ETD: "",
    ETD: "",
};

const emptyQRY_KSV_STOCK_OUT = {
    S_ETD: "",
    E_ETD: "",
    MATL_NAME: "",
    BUYER_CD: "",
    PO_CD: "",
    MATL_CD: "",
    SPEC: "",
    MATL_TYPE: "",
    PL_NO: "",
    UESR_ID: "",
    COLOR: "",
    HIS_NO: "",
    VENDOR_CD: "",
    PL_NO_UPDATE: "",
    HIS_NO_UPDATE: "",
    IS_ALL: "",
};

const emptyTBL_KSV_STOCK_OUT = {
    id: 0,
    PO_CD: "",
    ORDER_CD: "",
    VENDOR_NAME: "",
    MATL_NAME: "",
    COLOR: "",
    SPEC: "",
    UNIT: "",
    SHIP_DATE: "",
    ETA: "",
    PACK_CD: "",
    HIS_NO: "",
    OUT_QTY: "",
    OUT_FROM: "",
    CT_QTY: "",
    CT_NO: "",
    REMARK: "",
    DELIVERY_TYPE: "",
    IN_TYPE: "",
    OUT_TYPE: "",
};

const S0412_STSOUT_LIST = () => {
    const serviceLibRef = useRef(null);
    if (!serviceLibRef.current) {
        serviceLibRef.current = new ServiceLib();
        serviceLibRef.current.loginConfirm();
    }
    const serviceLib = serviceLibRef.current;
    const serviceS0412_STSOUT_LISTRef = useRef(null);
    if (!serviceS0412_STSOUT_LISTRef.current) serviceS0412_STSOUT_LISTRef.current = new ServiceS0412_STSOUT_LIST();
    const serviceS0412_STSOUT_LIST = serviceS0412_STSOUT_LISTRef.current;

    const toast = useRef(null);

    /* Dialog */
    const [isDialogS041201, setIsDialogS041201] = useState(false);
    const [isDialogS041205, setIsDialogS041205] = useState(false);

    /* splitter 관련 */
    const [styleVal, setStyleVal] = useState({ width: "65vw" });

    const confirm_PACK = () => {
        var tObj = {};
        tObj.USER_ID = serviceLib.getUserInfo().USER_ID;
        tObj.PACK_CD = selectedTBL_KSV_STOCK_OUT[0].PACK_CD;
        tObj.PACK_CONFIRM = selectedTBL_KSV_STOCK_OUT[0].PACK_CONFIRM;
        tObj.ETD = dataQRY_KSV_STOCK_OUT1.ETD;
        tObj.ETA = dataQRY_KSV_STOCK_OUT1.ETA;
        var tArray = [];
        tArray.push(tObj);

        serviceS0412_STSOUT_LIST.mgrInsert_CONFIRM_PACK(tArray).then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                console.log(
                    "serviceS0412_STSOUT_LIST.mgrQuery_CHK_CT_QTY call => " +
                        data.length,
                );
                toast.current.show({
                    severity: "success",
                    summary: "SUCCESS: Chk Ct Qty",
                    detail: data[0].CODE,
                    life: 3000,
                });
                hide_Confirm();
            } else {
                console.log(
                    "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                        JSON.stringify(data.graphQLErrors),
                );
                toast.current.show({
                    severity: "success",
                    summary: "Error: Chk Ct Qty",
                    detail: "",
                    life: 3000,
                });
            }
        });
    };

    const show_Confirm = () => {
        setIsDialogS041205(true);
    };

    const hide_Confirm = () => {
        setIsDialogS041205(false);
    };

    const search_STOCK_OUT = () => {
        var tObj = { ...dataQRY_KSV_STOCK_OUT };
        if (tObj.S_ETD === "") {
            tObj.S_ETD = "20220101";
            tObj.E_ETD = "20231231";
        }
        tObj.PO_CD = tObj.PO_CD.trim();
        tObj.PL_NO = tObj.PL_NO.trim();

        serviceS0412_STSOUT_LIST
            .mgrQueryTBL_KSV_STOCK_OUT(tObj)
            .then((data) => {
                if (typeof data.graphQLErrors === "undefined") {
                    console.log(
                        "ServiceMgrKCD_BUYER.mgr1KcdStyle call => " +
                            data.DATA1.length +
                            "," +
                            data.DATA2.length,
                    );

                    var tIdx = 0;
                    var tArray = [];
                    data.DATA1.forEach((col, i) => {
                        var tObj = { ...col };
                        tIdx += 1;
                        tObj.id = tIdx;
                        tArray.push(tObj);
                    });
                    data.DATA2.forEach((col, i) => {
                        var tObj = { ...col };
                        tIdx += 1;
                        tObj.id = tIdx;
                        tArray.push(tObj);
                    });

                    setDatasTBL_KSV_STOCK_OUT(tArray);
                } else {
                    console.log(
                        "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });
    };

    const process_CHK_CT_QTY = () => {
        var tObj = {};
        tObj.USER_ID = serviceLib.getUserInfo().USER_ID;
        tObj.PACK_CD = selectedTBL_KSV_STOCK_OUT[0].PACK_CD;
        var tArray = [];
        tArray.push(tObj);

        serviceS0412_STSOUT_LIST.mgrInsert_CHK_CT_QTY(tArray).then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                console.log(
                    "serviceS0412_STSOUT_LIST.mgrQuery_CHK_CT_QTY call => " +
                        data.length,
                );
                toast.current.show({
                    severity: "success",
                    summary: "SUCCESS: Chk Ct Qty",
                    detail: data[0].CODE,
                    life: 3000,
                });
            } else {
                console.log(
                    "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                        JSON.stringify(data.graphQLErrors),
                );
                toast.current.show({
                    severity: "success",
                    summary: "Error: Chk Ct Qty",
                    detail: "",
                    life: 3000,
                });
            }
        });
    };

    const [dataQRY_KSV_STOCK_OUT1, setDataQRY_KSV_STOCK_OUT1] = useState(
        emptyQRY_KSV_STOCK_OUT1,
    );

    const onCalChangeQRY_KSV_STOCK_OUT1_ETD = (e, name) => {
        let val1 = e.value || "";
        let val = "";
        if (val1 === "") {
            val = "";
        } else {
            val = getDateVal(val1);
        }

        let _dataQRY_KSV_STOCK_OUT1 = { ...dataQRY_KSV_STOCK_OUT1 };
        _dataQRY_KSV_STOCK_OUT1[`${name}`] = val;
        setDataQRY_KSV_STOCK_OUT1(_dataQRY_KSV_STOCK_OUT1);
    };

    const onCalChangeQRY_KSV_STOCK_OUT1_ETA = (e, name) => {
        let val1 = e.value || "";
        let val = "";
        if (val1 === "") {
            val = "";
        } else {
            val = getDateVal(val1);
        }

        let _dataQRY_KSV_STOCK_OUT1 = { ...dataQRY_KSV_STOCK_OUT1 };
        _dataQRY_KSV_STOCK_OUT1[`${name}`] = val;
        setDataQRY_KSV_STOCK_OUT1(_dataQRY_KSV_STOCK_OUT1);
    };

    /*QRY KSV_STOCK_OUT */
    const [dataQRY_KSV_STOCK_OUT, setDataQRY_KSV_STOCK_OUT] = useState(
        emptyQRY_KSV_STOCK_OUT,
    );

    const onCheckboxChangeQRY_KSV_STOCK_OUT_IS_ALL = (e, name) => {
        let val = "";
        let _dataQRY_KSV_STOCK_OUT = { ...dataQRY_KSV_STOCK_OUT };
        if (e.checked) {
            val = "1";
        } else {
            val = "0";
        }
        _dataQRY_KSV_STOCK_OUT[`${name}`] = val;
        setDataQRY_KSV_STOCK_OUT(_dataQRY_KSV_STOCK_OUT);
    };

    const onCalChangeQRY_KSV_STOCK_OUT_S_ETD = (e, name) => {
        let val1 = e.value || "";
        let val = "";
        if (val1 === "") {
            val = "";
        } else {
            val = getDateVal(val1);
        }

        let _dataQRY_KSV_STOCK_OUT = { ...dataQRY_KSV_STOCK_OUT };
        _dataQRY_KSV_STOCK_OUT[`${name}`] = val;
        setDataQRY_KSV_STOCK_OUT(_dataQRY_KSV_STOCK_OUT);
    };

    const onCalChangeQRY_KSV_STOCK_OUT_E_ETD = (e, name) => {
        let val1 = e.value || "";
        let val = "";
        if (val1 === "") {
            val = "";
        } else {
            val = getDateVal(val1);
        }

        let _dataQRY_KSV_STOCK_OUT = { ...dataQRY_KSV_STOCK_OUT };
        _dataQRY_KSV_STOCK_OUT[`${name}`] = val;
        setDataQRY_KSV_STOCK_OUT(_dataQRY_KSV_STOCK_OUT);
    };

    const onInputChangeQRY_KSV_STOCK_OUT_MATL_NAME = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_STOCK_OUT = { ...dataQRY_KSV_STOCK_OUT };

        let tTypeVal = _dataQRY_KSV_STOCK_OUT[`${name}`];
        if (typeof tTypeVal === "string")
            _dataQRY_KSV_STOCK_OUT[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_STOCK_OUT[`${name}`] = parseInt(val);

        setDataQRY_KSV_STOCK_OUT(_dataQRY_KSV_STOCK_OUT);
    };

    const [
        datasQRY_KSV_STOCK_OUT_BUYER_CD,
        setDatasQRY_KSV_STOCK_OUT_BUYER_CD,
    ] = useState([]);
    const [dataQRY_KSV_STOCK_OUT_BUYER_CD, setDataQRY_KSV_STOCK_OUT_BUYER_CD] =
        useState({});

    const onDropdownChangeQRY_KSV_STOCK_OUT_BUYER_CD = (e, name) => {
        let val = (e.value && e.value.BUYER_CD) || "";

        let _dataQRY_KSV_STOCK_OUT = { ...dataQRY_KSV_STOCK_OUT };

        let tTypeVal = _dataQRY_KSV_STOCK_OUT[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_STOCK_OUT[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_STOCK_OUT[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_STOCK_OUT(_dataQRY_KSV_STOCK_OUT);
        setDataQRY_KSV_STOCK_OUT_BUYER_CD(e.value);
    };

    const [datasQRY_KSV_STOCK_OUT_PO_CD, setDatasQRY_KSV_STOCK_OUT_PO_CD] =
        useState([]);
    const [dataQRY_KSV_STOCK_OUT_PO_CD, setDataQRY_KSV_STOCK_OUT_PO_CD] =
        useState({});

    const onDropdownChangeQRY_KSV_STOCK_OUT_PO_CD = (e, name) => {
        let val = "";
        if (typeof e.value === "string") {
            val = e.value;
        } else {
            val = (e.value && e.value.PO_CD) || "";
        }

        let _dataQRY_KSV_STOCK_OUT = { ...dataQRY_KSV_STOCK_OUT };

        let tTypeVal = _dataQRY_KSV_STOCK_OUT[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_STOCK_OUT[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_STOCK_OUT[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_STOCK_OUT(_dataQRY_KSV_STOCK_OUT);
        setDataQRY_KSV_STOCK_OUT_PO_CD(e.value);
    };

    const onInputChangeQRY_KSV_STOCK_OUT_MATL_CD = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_STOCK_OUT = { ...dataQRY_KSV_STOCK_OUT };

        let tTypeVal = _dataQRY_KSV_STOCK_OUT[`${name}`];
        if (typeof tTypeVal === "string")
            _dataQRY_KSV_STOCK_OUT[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_STOCK_OUT[`${name}`] = parseInt(val);

        setDataQRY_KSV_STOCK_OUT(_dataQRY_KSV_STOCK_OUT);
    };

    const onInputChangeQRY_KSV_STOCK_OUT_SPEC = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_STOCK_OUT = { ...dataQRY_KSV_STOCK_OUT };

        let tTypeVal = _dataQRY_KSV_STOCK_OUT[`${name}`];
        if (typeof tTypeVal === "string")
            _dataQRY_KSV_STOCK_OUT[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_STOCK_OUT[`${name}`] = parseInt(val);

        setDataQRY_KSV_STOCK_OUT(_dataQRY_KSV_STOCK_OUT);
    };

    const [
        datasQRY_KSV_STOCK_OUT_MATL_TYPE,
        setDatasQRY_KSV_STOCK_OUT_MATL_TYPE,
    ] = useState([]);
    const [
        dataQRY_KSV_STOCK_OUT_MATL_TYPE,
        setDataQRY_KSV_STOCK_OUT_MATL_TYPE,
    ] = useState({});

    const onDropdownChangeQRY_KSV_STOCK_OUT_MATL_TYPE = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataQRY_KSV_STOCK_OUT = { ...dataQRY_KSV_STOCK_OUT };

        let tTypeVal = _dataQRY_KSV_STOCK_OUT[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_STOCK_OUT[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_STOCK_OUT[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_STOCK_OUT(_dataQRY_KSV_STOCK_OUT);
        setDataQRY_KSV_STOCK_OUT_MATL_TYPE(e.value);
    };

    const [datasQRY_KSV_STOCK_OUT_PL_NO, setDatasQRY_KSV_STOCK_OUT_PL_NO] =
        useState([]);
    const [dataQRY_KSV_STOCK_OUT_PL_NO, setDataQRY_KSV_STOCK_OUT_PL_NO] =
        useState({});

    const onDropdownChangeQRY_KSV_STOCK_OUT_PL_NO = (e, name) => {
        let val = "";
        if (typeof e.value === "string") {
            val = e.value;
        } else {
            val = (e.value && e.value.PACK_CD) || "";
        }

        let _dataQRY_KSV_STOCK_OUT = { ...dataQRY_KSV_STOCK_OUT };

        let tTypeVal = _dataQRY_KSV_STOCK_OUT[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_STOCK_OUT[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_STOCK_OUT[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_STOCK_OUT(_dataQRY_KSV_STOCK_OUT);
        setDataQRY_KSV_STOCK_OUT_PL_NO(e.value);
    };

    const [datasQRY_KSV_STOCK_OUT_UESR_ID, setDatasQRY_KSV_STOCK_OUT_UESR_ID] =
        useState([]);
    const [dataQRY_KSV_STOCK_OUT_UESR_ID, setDataQRY_KSV_STOCK_OUT_UESR_ID] =
        useState({});

    const onDropdownChangeQRY_KSV_STOCK_OUT_UESR_ID = (e, name) => {
        let val = (e.value && e.value.USER_ID) || "";

        let _dataQRY_KSV_STOCK_OUT = { ...dataQRY_KSV_STOCK_OUT };

        let tTypeVal = _dataQRY_KSV_STOCK_OUT[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_STOCK_OUT[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_STOCK_OUT[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_STOCK_OUT(_dataQRY_KSV_STOCK_OUT);
        setDataQRY_KSV_STOCK_OUT_UESR_ID(e.value);
    };

    const onInputChangeQRY_KSV_STOCK_OUT_COLOR = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_STOCK_OUT = { ...dataQRY_KSV_STOCK_OUT };

        let tTypeVal = _dataQRY_KSV_STOCK_OUT[`${name}`];
        if (typeof tTypeVal === "string")
            _dataQRY_KSV_STOCK_OUT[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_STOCK_OUT[`${name}`] = parseInt(val);

        setDataQRY_KSV_STOCK_OUT(_dataQRY_KSV_STOCK_OUT);
    };

    const [datasQRY_KSV_STOCK_OUT_HIS_NO, setDatasQRY_KSV_STOCK_OUT_HIS_NO] =
        useState([]);
    const [dataQRY_KSV_STOCK_OUT_HIS_NO, setDataQRY_KSV_STOCK_OUT_HIS_NO] =
        useState({});

    const onDropdownChangeQRY_KSV_STOCK_OUT_HIS_NO = (e, name) => {
        let val = (e.value && e.value.HIS_NO) || "";

        let _dataQRY_KSV_STOCK_OUT = { ...dataQRY_KSV_STOCK_OUT };

        let tTypeVal = _dataQRY_KSV_STOCK_OUT[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_STOCK_OUT[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_STOCK_OUT[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_STOCK_OUT(_dataQRY_KSV_STOCK_OUT);
        setDataQRY_KSV_STOCK_OUT_HIS_NO(e.value);
    };

    const [
        datasQRY_KSV_STOCK_OUT_VENDOR_CD,
        setDatasQRY_KSV_STOCK_OUT_VENDOR_CD,
    ] = useState([]);
    const [
        dataQRY_KSV_STOCK_OUT_VENDOR_CD,
        setDataQRY_KSV_STOCK_OUT_VENDOR_CD,
    ] = useState({});

    const onDropdownChangeQRY_KSV_STOCK_OUT_VENDOR_CD = (e, name) => {
        let val = (e.value && e.value.VENDOR_CD) || "";

        let _dataQRY_KSV_STOCK_OUT = { ...dataQRY_KSV_STOCK_OUT };

        let tTypeVal = _dataQRY_KSV_STOCK_OUT[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_STOCK_OUT[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_STOCK_OUT[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_STOCK_OUT(_dataQRY_KSV_STOCK_OUT);
        setDataQRY_KSV_STOCK_OUT_VENDOR_CD(e.value);
    };

    /* TABLE KSV_STOCK_OUT*/
    // DEFINE DATAGRID : TBL_KSV_STOCK_OUT
    const [datasTBL_KSV_STOCK_OUT, setDatasTBL_KSV_STOCK_OUT] = useState([]);
    const dt_TBL_KSV_STOCK_OUT = useRef(null);
    const [dataTBL_KSV_STOCK_OUT, setDataTBL_KSV_STOCK_OUT] = useState(
        emptyTBL_KSV_STOCK_OUT,
    );
    const [selectedTBL_KSV_STOCK_OUT, setSelectedTBL_KSV_STOCK_OUT] = useState(
        [],
    );
    const [
        flagSelectModeTBL_KSV_STOCK_OUT,
        setFlagSelectModeTBL_KSV_STOCK_OUT,
    ] = useState(false);

    // DATAGRID CODE : TBL_KSV_STOCK_OUT

    const onRowClick1TBL_KSV_STOCK_OUT = (argData0) => {
        var argData = {};

        if (typeof argData0.length !== "undefined") {
            argData = argData0[0];
        } else {
            argData = argData0;
        }

        let argTBL_KSV_STOCK_OUT = argData;

        setDataTBL_KSV_STOCK_OUT(argTBL_KSV_STOCK_OUT);

        localStorage.setItem("S041201_DATA", JSON.stringify(argData));
    };

    const onRowClickTBL_KSV_STOCK_OUT = (event) => {
        let argTBL_KSV_STOCK_OUT = event.data;
        if (flagSelectModeTBL_KSV_STOCK_OUT) return;

        // Service : NawooAll:mgrQueryTBL_KSV_STOCK_OUT
    };

    const exportExcelTBL_KSV_STOCK_OUT = () => {};

    useEffect(() => {
        var tObj = { ...emptyQRY_KSV_STOCK_OUT };
        if (tObj.S_ETD === "") {
            tObj.S_ETD = "20220101";
            tObj.E_ETD = "20231231";
        }

        serviceS0412_STSOUT_LIST.mgrQuery_CODE(tObj).then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                console.log(
                    "ServiceMgrKCD_BUYER.mgr1KcdStyle call => " +
                        data.PO_CD.length,
                );
                setDatasQRY_KSV_STOCK_OUT_BUYER_CD(data.BUYER_CD);
                setDataQRY_KSV_STOCK_OUT_BUYER_CD(data.BUYER_CD[0]);

                setDatasQRY_KSV_STOCK_OUT_PO_CD(data.PO_CD);
                setDataQRY_KSV_STOCK_OUT_PO_CD(data.PO_CD[0]);

                setDatasQRY_KSV_STOCK_OUT_MATL_TYPE(data.VENDOR_TYPE);
                setDataQRY_KSV_STOCK_OUT_MATL_TYPE(data.VENDOR_TYPE[0]);

                setDatasQRY_KSV_STOCK_OUT_PL_NO(data.PACK_CD);
                setDataQRY_KSV_STOCK_OUT_PL_NO(data.PACK_CD[0]);

                setDatasQRY_KSV_STOCK_OUT_UESR_ID(data.USER_ID);
                setDataQRY_KSV_STOCK_OUT_UESR_ID(data.USER_ID[0]);

                setDatasQRY_KSV_STOCK_OUT_HIS_NO(data.HIS_NO);
                setDataQRY_KSV_STOCK_OUT_HIS_NO(data.HIS_NO[0]);

                setDatasQRY_KSV_STOCK_OUT_VENDOR_CD(data.VENDOR_CD);
                setDataQRY_KSV_STOCK_OUT_VENDOR_CD(data.VENDOR_CD[0]);
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
        <div>
            <div
                style={{
                    marginLeft: "1rem",
                    marginTop: "1rem",
                    width: "100rem",
                    height: "8rem",
                }}
            >
                <span
                    style={{
                        marginLeft: "0.5rem",
                        height: "2rem",
                        display: "inline-block",
                        width: "17rem",
                    }}
                >
                    <p style={{ width: "8rem", display: "inline-block" }}>ETD</p>
                    <div
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "8rem",
                        }}
                    >
                        <Calendar
                            showButtonBar
                            dateFormat="yy-mm-dd"
                            id="id_S_ETD"
                            value={changeDateVal(dataQRY_KSV_STOCK_OUT.S_ETD)}
                            onChange={(e) =>
                                onCalChangeQRY_KSV_STOCK_OUT_S_ETD(e, "S_ETD")
                            }
                        />
                    </div>
                </span>
                <span
                    style={{
                        marginLeft: "0.5rem",
                        height: "2rem",
                        display: "inline-block",
                        width: "11rem",
                    }}
                >
                    <p style={{ width: "1rem", display: "inline-block" }}>~</p>
                    <div
                        style={{
                            marginLeft: "1rem",
                            display: "inline-block",
                            width: "8rem",
                        }}
                    >
                        <Calendar
                            showButtonBar
                            dateFormat="yy-mm-dd"
                            id="id_E_ETD"
                            value={changeDateVal(dataQRY_KSV_STOCK_OUT.E_ETD)}
                            onChange={(e) =>
                                onCalChangeQRY_KSV_STOCK_OUT_E_ETD(e, "E_ETD")
                            }
                        />
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
                    <p style={{ width: "7rem", display: "inline-block" }}>Matl Name</p>
                    <InputText
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "15rem",
                        }}
                        id="id_MATL_NAME"
                        value={dataQRY_KSV_STOCK_OUT.MATL_NAME}
                        onChange={(e) =>
                            onInputChangeQRY_KSV_STOCK_OUT_MATL_NAME(
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
                        width: "34rem",
                    }}
                >
                    <p style={{ width: "6rem", display: "inline-block" }}>Buyer</p>
                    <div
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "17rem",
                        }}
                    >
                        <Dropdown
                            id="id_BUYER_CD"
                            value={dataQRY_KSV_STOCK_OUT_BUYER_CD}
                            onChange={(e) =>
                                onDropdownChangeQRY_KSV_STOCK_OUT_BUYER_CD(
                                    e,
                                    "BUYER_CD",
                                )
                            }
                            options={datasQRY_KSV_STOCK_OUT_BUYER_CD}
                            optionLabel="BUYER_NAME"
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
                        width: "17rem",
                    }}
                >
                    <p style={{ width: "8rem", display: "inline-block" }}>PO NO</p>
                    <div
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "8rem",
                        }}
                    >
                        <Dropdown
                            id="id_PO_CD"
                            value={dataQRY_KSV_STOCK_OUT_PO_CD}
                            onChange={(e) =>
                                onDropdownChangeQRY_KSV_STOCK_OUT_PO_CD(
                                    e,
                                    "PO_CD",
                                )
                            }
                            options={datasQRY_KSV_STOCK_OUT_PO_CD}
                            optionLabel="PO_CD"
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
                        width: "15rem",
                    }}
                >
                    <p style={{ width: "4rem", display: "inline-block" }}>Matl CD</p>
                    <InputText
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "8rem",
                        }}
                        id="id_MATL_CD"
                        value={dataQRY_KSV_STOCK_OUT.MATL_CD}
                        onChange={(e) =>
                            onInputChangeQRY_KSV_STOCK_OUT_MATL_CD(e, "MATL_CD")
                        }
                    />
                </span>

                <span
                    style={{
                        marginLeft: "0.5rem",
                        height: "2rem",
                        display: "inline-block",
                        width: "17rem",
                    }}
                >
                    <p style={{ width: "3rem", display: "inline-block" }}>Spec</p>
                    <InputText
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "13rem",
                        }}
                        id="id_SPEC"
                        value={dataQRY_KSV_STOCK_OUT.SPEC}
                        onChange={(e) =>
                            onInputChangeQRY_KSV_STOCK_OUT_SPEC(e, "SPEC")
                        }
                    />
                </span>
                <span
                    style={{
                        marginLeft: "0.5rem",
                        height: "2rem",
                        display: "inline-block",
                        width: "8rem",
                    }}
                >
                    <p style={{ width: "3rem", display: "inline-block" }}>Type</p>
                    <div
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "4rem",
                        }}
                    >
                        <Dropdown
                            id="id_MATL_TYPE"
                            value={dataQRY_KSV_STOCK_OUT_MATL_TYPE}
                            onChange={(e) =>
                                onDropdownChangeQRY_KSV_STOCK_OUT_MATL_TYPE(
                                    e,
                                    "MATL_TYPE",
                                )
                            }
                            options={datasQRY_KSV_STOCK_OUT_MATL_TYPE}
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
                        width: "35rem",
                    }}
                >
                    {/* <p style={{ width: '4rem', display: 'inline-block' }}> PL NO </p> */}
                    <InputText
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "14rem",
                        }}
                        id="id_SPEC"
                    />

                    <Button
                        label="PL NO Change"
                        style={{ height: "1.1rem" }}
                        className="p-button-text"
                        onClick={blankFn}
                    />

                    <Button
                        label="Sea Freight"
                        style={{ height: "1.1rem" }}
                        className="p-button-text"
                        onClick={blankFn}
                    />
                </span>
                <span
                    style={{
                        marginLeft: "0.5rem",
                        height: "2rem",
                        display: "inline-block",
                        width: "17rem",
                    }}
                >
                    <p style={{ width: "8rem", display: "inline-block" }}>PL NO</p>
                    <div
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "8rem",
                        }}
                    >
                        <Dropdown
                            id="id_PL_NO"
                            value={dataQRY_KSV_STOCK_OUT_PL_NO}
                            onChange={(e) =>
                                onDropdownChangeQRY_KSV_STOCK_OUT_PL_NO(
                                    e,
                                    "PL_NO",
                                )
                            }
                            options={datasQRY_KSV_STOCK_OUT_PL_NO}
                            optionLabel="PACK_CD"
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
                        width: "14rem",
                    }}
                >
                    <p style={{ width: "3rem", display: "inline-block" }}>User</p>
                    <div
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "9rem",
                        }}
                    >
                        <Dropdown
                            id="id_UESR_ID"
                            value={dataQRY_KSV_STOCK_OUT_UESR_ID}
                            onChange={(e) =>
                                onDropdownChangeQRY_KSV_STOCK_OUT_UESR_ID(
                                    e,
                                    "UESR_ID",
                                )
                            }
                            options={datasQRY_KSV_STOCK_OUT_UESR_ID}
                            optionLabel="USER_NAME"
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
                        width: "18rem",
                    }}
                >
                    <p style={{ width: "4rem", display: "inline-block" }}>Color</p>
                    <InputText
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "13rem",
                        }}
                        id="id_COLOR"
                        value={dataQRY_KSV_STOCK_OUT.COLOR}
                        onChange={(e) =>
                            onInputChangeQRY_KSV_STOCK_OUT_COLOR(e, "COLOR")
                        }
                    />
                </span>
                <span
                    style={{
                        marginLeft: "0.5rem",
                        height: "2rem",
                        display: "inline-block",
                        width: "43rem",
                    }}
                >
                    {/* <p style={{ width: '4rem', display: 'inline-block' }}> PL NO </p> */}
                    <InputText
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "22rem",
                        }}
                        id="id_SPEC"
                    />

                    <Button
                        label="HIS NO Insert"
                        style={{ height: "1.1rem" }}
                        className="p-button-text"
                        onClick={blankFn}
                    />

                    <Button
                        label="Comp/Offer sp"
                        style={{ height: "1.1rem" }}
                        className="p-button-text"
                        onClick={blankFn}
                    />
                </span>
                <span
                    style={{
                        marginLeft: "0.5rem",
                        height: "2rem",
                        display: "inline-block",
                        width: "31rem",
                    }}
                >
                    <p style={{ width: "8rem", display: "inline-block" }}>HIS NO</p>
                    <div
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "10rem",
                        }}
                    >
                        <Dropdown
                            id="id_HIS_NO"
                            value={dataQRY_KSV_STOCK_OUT_HIS_NO}
                            onChange={(e) =>
                                onDropdownChangeQRY_KSV_STOCK_OUT_HIS_NO(
                                    e,
                                    "HIS_NO",
                                )
                            }
                            options={datasQRY_KSV_STOCK_OUT_HIS_NO}
                            optionLabel="HIS_NO"
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
                        width: "31rem",
                    }}
                >
                    <p style={{ width: "4.5rem", display: "inline-block" }}>Supplier</p>
                    <div
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "20rem",
                        }}
                    >
                        <Dropdown
                            id="id_VENDOR_CD"
                            value={dataQRY_KSV_STOCK_OUT_VENDOR_CD}
                            onChange={(e) =>
                                onDropdownChangeQRY_KSV_STOCK_OUT_VENDOR_CD(
                                    e,
                                    "VENDOR_CD",
                                )
                            }
                            options={datasQRY_KSV_STOCK_OUT_VENDOR_CD}
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
                        width: "31rem",
                    }}
                >
                    <p style={{ width: "4.5rem", display: "inline-block" }}>all</p>
                    <div
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "20rem",
                        }}
                    >
                        <Checkbox
                            style={{
                                display: "inline-block",
                                width: "1rem",
                                marginLeft: "0.5rem",
                            }}
                            id="id_IS_M_PO"
                            checked={changeCheckBoxVal(
                                dataQRY_KSV_STOCK_OUT.IS_ALL,
                            )}
                            onChange={(e) =>
                                onCheckboxChangeQRY_KSV_STOCK_OUT_IS_ALL(
                                    e,
                                    "IS_ALL",
                                )
                            }
                        />
                    </div>
                </span>
            </div>
            <div style={{ width: "100rem", height: "2rem" }}>
                <span style={{ display: "inline-block", marginLeft: "81rem" }}>
                    <Button
                        label={
                            <span>
                                Search(<u>S</u>)
                            </span>
                        }
                        style={{ height: "1.1rem" }}
                        icon="pi pi-search"
                        className="p-button-text"
                        onClick={search_STOCK_OUT}
                    />

                    <Button
                        label="Excel"
                        style={{ height: "1.1rem", color: "green" }}
                        icon="pi pi-upload"
                        className="p-button-text"
                        onClick={exportExcelTBL_KSV_STOCK_OUT}
                    />
                </span>
            </div>

            <div
                style={{
                    marginLeft: "1rem",
                    marginTop: "1rem",
                    width: "99rem",
                    height: "30rem",
                }}
            >
                <AFDataTable preventUnrelatedRerender
                    ref={dt_TBL_KSV_STOCK_OUT}
                    size="small"
                    value={datasTBL_KSV_STOCK_OUT}
                    resizableColumns
                    columnResizeMode="fit"
                    showGridlines
                    selectionMode="checkbox"
                    selection={selectedTBL_KSV_STOCK_OUT}
                    onSelectionChange={(e) => {
                        setFlagSelectModeTBL_KSV_STOCK_OUT(true);
                        setSelectedTBL_KSV_STOCK_OUT(e.value);
                        console.log(
                            "selected length:" +
                                selectedTBL_KSV_STOCK_OUT.length,
                        );
                        onRowClick1TBL_KSV_STOCK_OUT(e.value);
                    }}
                    onRowClick={onRowClickTBL_KSV_STOCK_OUT}
                    dataKey="id"
                    className="datatable-responsive"
                    virtualScrollerOptions={{ itemSize: 14 }}
                    emptyMessage=" " //header={headerTBL_KSV_STOCK_OUT}
                    responsiveLayout="scroll"
                    scrollable
                    scrollHeight="28rem"
                >
                    <AFColumn field="PO_CD" headerClassName="t-header" header="PO" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="ORDER_CD" headerClassName="t-header" header="Order" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="VENDOR_NAME" headerClassName="t-header" header="Supplier" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="MATL_NAME" headerClassName="t-header" header="Matl Name" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="COLOR" headerClassName="t-header" header="Color" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="SPEC" headerClassName="t-header" header="Spec" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="UNIT" headerClassName="t-header" header="Unit" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="SHIP_DATE" headerClassName="t-header" header="ETD" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="ETA" headerClassName="t-header" header="ETA" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="PACK_CD" headerClassName="t-header" header="PL No" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="HIS_NO" headerClassName="t-header" header="His No" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="OUT_QTY" headerClassName="t-header" header="Out Qty" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="OUT_FROM" headerClassName="t-header" header="From" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="CT_QTY" headerClassName="t-header" header="CT" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="CT_NO" headerClassName="t-header" header="CT" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="REMARK" headerClassName="t-header" header="Remark" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="DELIVERY" headerClassName="t-header" header="Delivery" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="IN_TYPE_NAME" headerClassName="t-header" header="In Type" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="MATL_CD" headerClassName="t-header" header="Matl Cd" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="OUT_TYPE_NAME" headerClassName="t-header" header="Out Type" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="DEBIT_CD" headerClassName="t-header" header="Debit Cd" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="IN_TYPE" headerClassName="t-header" header="Intype" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="OUT_STATUS" headerClassName="t-header" header="Out Status" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="PO_SEQ" headerClassName="t-header" header="Po Seq" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="MRP_SEQ" headerClassName="t-header" header="Mrp Seq" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="IN_DATETIME" headerClassName="t-header" header="In Date" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="OUT_DATETIME" headerClassName="t-header" header="Out Date" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="VENDOR_CD" headerClassName="t-header" header="Vendor" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="VENDOR_TYPE" headerClassName="t-header" header="Vendor" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="REG_DATETIME" headerClassName="t-header" header="Reg Date" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="PACK_CONFIRM" headerClassName="t-header" header="Pack Confirm" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="STOCK_IDX" headerClassName="t-header" header="Stock Idx" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                </AFDataTable>
            </div>

            <Divider />

            <div style={{ width: "100rem", height: "2rem" }}>
                <div className="formgrid grid">
                    <div>
                        <Button
                            style={{ display: "inline-block", width: "10rem" }}
                            label="PL Print"
                            className="p-button-text"
                            onClick={blankFn}
                        />

                        <Button
                            style={{ display: "inline-block", width: "10rem" }}
                            label="Sales Contract"
                            className="p-button-text"
                            onClick={blankFn}
                        />

                        <Button
                            style={{ display: "inline-block", width: "10rem" }}
                            label="Comp"
                            className="p-button-text"
                            onClick={blankFn}
                        />

                        <Button
                            style={{ display: "inline-block", width: "10rem" }}
                            label="C.T Qty Check"
                            className="p-button-text"
                            onClick={process_CHK_CT_QTY}
                        />

                        <Button
                            style={{ display: "inline-block", width: "10rem" }}
                            label="Offer Spec"
                            className="p-button-text"
                            onClick={blankFn}
                        />

                        <Button
                            style={{ display: "inline-block", width: "13rem" }}
                            label="환율확인 -Make D"
                            className="p-button-text"
                            onClick={blankFn}
                        />

                        <Button
                            style={{ display: "inline-block", width: "10rem" }}
                            label="Pack Confirm"
                            className="p-button-text"
                            onClick={show_Confirm}
                        />

                        <Button
                            style={{ display: "inline-block", width: "10rem" }}
                            label="PL Change"
                            className="p-button-text"
                            onClick={blankFn}
                        />

                        <Button
                            style={{ display: "inline-block", width: "7rem" }}
                            label="Cancel"
                            className="p-button-text"
                            onClick={blankFn}
                        />

                        <Button
                            style={{ display: "inline-block", width: "9rem" }}
                            label="PL Excel"
                            className="p-button-text"
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
                visible={isDialogS041201}
                position="top-right"
                style={{ width: "90vw" }}
                modal={true}
                className="p-fluid"
            ></Dialog>
            <Dialog
                visible={isDialogS041205}
                position="top-right"
                style={{ width: "50vw" }}
                modal={true}
                className="p-fluid"
            >
                <div
                    style={{
                        marginLeft: "1rem",
                        marginTop: "1rem",
                        width: "30rem",
                        height: "20rem",
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
                        <p style={{ width: "8rem", display: "inline-block" }}>Confirm ETD</p>
                        <div
                            style={{
                                marginLeft: "0.5rem",
                                display: "inline-block",
                                width: "13rem",
                            }}
                        >
                            <Calendar
                                showButtonBar
                                dateFormat="yy-mm-dd"
                                id="id_ETD"
                                value={changeDateVal(
                                    dataQRY_KSV_STOCK_OUT1.ETD,
                                )}
                                onChange={(e) =>
                                    onCalChangeQRY_KSV_STOCK_OUT1_ETD(e, "ETD")
                                }
                            />
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
                        <p style={{ width: "8rem", display: "inline-block" }}>Confirm ETA</p>
                        <div
                            style={{
                                marginLeft: "0.5rem",
                                display: "inline-block",
                                width: "13rem",
                            }}
                        >
                            <Calendar
                                showButtonBar
                                dateFormat="yy-mm-dd"
                                id="id_ETA"
                                value={changeDateVal(
                                    dataQRY_KSV_STOCK_OUT1.ETA,
                                )}
                                onChange={(e) =>
                                    onCalChangeQRY_KSV_STOCK_OUT1_ETA(e, "ETA")
                                }
                            />
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
                        <p style={{ width: "20rem", display: "inline-block" }}>confirm Pack CD?</p>
                    </span>
                    <span
                        style={{
                            marginLeft: "0.5rem",
                            height: "2rem",
                            display: "inline-block",
                            width: "10rem",
                        }}
                    >
                        <Button
                            style={{ display: "inline-block", width: "9rem" }}
                            label="Yes"
                            className="p-button-text"
                            onClick={confirm_PACK}
                        />
                    </span>
                    <span
                        style={{
                            marginLeft: "0.5rem",
                            height: "2rem",
                            display: "inline-block",
                            width: "10rem",
                        }}
                    >
                        <Button
                            style={{ display: "inline-block", width: "9rem" }}
                            label="No"
                            className="p-button-text"
                            onClick={hide_Confirm}
                        />
                    </span>
                </div>
            </Dialog>
        </div>
    );
};

const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(S0412_STSOUT_LIST, comparisonFn);
