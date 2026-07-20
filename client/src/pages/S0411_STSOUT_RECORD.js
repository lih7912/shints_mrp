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
import { ServiceS0411_STSOUT_RECORD } from "../service/service_biz/ServiceS0411_STSOUT_RECORD";

import "./page_common.scss";

const emptyKCD_CODE = {
    id: 0,
    CD_GROUP: "",
    CD_CODE: "",
    CD_NAME: "",
    CD_FLAG: "",
};

const emptyQRY_KSV_STOCK_OUT = {
    S_IN_DATE: "",
    E_IN_DATE: "",
    PO_CD: "",
    VENDOR_TYPE: "",
    USER_ID: "",
    VENDOR_CD: "",
    S_STOCKOUT_DATE: "",
    E_STOCKOUT_DATE: "",
    IS_ALL_STOCK: "",
    IS_SAME_FAC: "",
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
    IN_DATE: "",
    TOT_QTY: "",
    BAL_QTY: "",
    OUT_QTY: "",
    IN_TYPE: "",
    MATL_CD: "",
};

const emptyTBL_KSV_STOCK_OUT2 = {
    id: 0,
    USE_MATL_CD: "",
    MATL_NAME: "",
    COLOR: "",
    SPEC: "",
    UNIT: "",
    MATL_PRICE: "",
    CURR_CD: "",
    USE_QTY: "",
    VENDOR_NAME: "",
    VENDOR_CD: "",
    WARE_NAME: "",
    OUT_FLAG: "",
    STOCK_IDX: "",
    USE_DATETIME: "",
};

const emptyEDT_KSV_STOCK_OUT = {
    FROM_TYPE: "",
    TO_TYPE: "",
    DELIVERY_TYPE: "",
    OUT_DATE: "",
    CD_QTY: "",
    CT_NO: "",
    REASON_TYPE: "",
    WEIGHT_CBM: "",
    CHARGE1: "",
    CHARGE2: "",
    REMARK: "",
    PL_NO: "",
    SENDOR: "",
    RECEIVER: "",
    IS_STOCKOUT: "",
    STOCKOUT_PO_CD: "",
};

const S0411_STSOUT_RECORD = () => {
    const serviceLibRef = useRef(null);
    if (!serviceLibRef.current) {
        serviceLibRef.current = new ServiceLib();
        serviceLibRef.current.loginConfirm();
    }
    const serviceLib = serviceLibRef.current;
    const serviceS0411_STSOUT_RECORDRef = useRef(null);
    if (!serviceS0411_STSOUT_RECORDRef.current) serviceS0411_STSOUT_RECORDRef.current = new ServiceS0411_STSOUT_RECORD();
    const serviceS0411_STSOUT_RECORD = serviceS0411_STSOUT_RECORDRef.current;

    const toast = useRef(null);

    /* splitter 관련 */
    const [styleVal, setStyleVal] = useState({ width: "65vw" });

    const processOutput = () => {
        var tObj = { ...dataEDT_KSV_STOCK_OUT };
        if (tObj.IS_STOCKOUT !== "1") processOutput1();
        else processOutput2();
    };

    const processOutput1 = () => {
        var tObj = { ...dataEDT_KSV_STOCK_OUT };
        tObj.FROM_TYPE = dataEDT_KSV_STOCK_OUT_FROM_TYPE.CD_CODE;
        tObj.TO_TYPE = dataEDT_KSV_STOCK_OUT_TO_TYPE.CD_CODE;
        tObj.DELIVERY_TYPE = dataEDT_KSV_STOCK_OUT_DELIVERY_TYPE.CD_CODE;
            tObj.USER_ID = serviceLib.getUserInfo().USER_ID;

        var tDeliveryName = dataEDT_KSV_STOCK_OUT_DELIVERY_TYPE.CD_NAME;
        if (
            tObj.DELIVERY_TYPE === "7" ||
            tObj.DELIVERY_TYPE === "6" ||
            tObj.DELIVERY_TYPE === "D" ||
            tObj.DELIVERY_TYPE === "A" ||
            tObj.DELIVERY_TYPE === "42" ||
            tObj.DELIVERY_TYPE === "31" ||
            tDeliveryName.substring(0, 3) === "AIR"
        ) {
            if (tObj.RECEIVER === "" || tObj.SENDOR === "") {
                console.log("ERROR : check sender/receciver");
                return;
            }
            if (tObj.CHARGE1 === "" || tObj.CHARGE2 === "") {
                console.log("ERROR : check charge kind/code");
                return;
            }
            if (tObj.WEIGHT_CBM === "") {
                console.log("ERROR : input weight");
                return;
            }
        }

        var tArray = datasTBL_KSV_STOCK_OUT.map((col, i) => {
            var tObj1 = { ...col };
            delete tObj1.id;
            delete tObj1.__typename;
            return tObj1;
        });

        if (tArray.length <= 0) return;

        serviceS0411_STSOUT_RECORD
            .mgrInsert_OUTPUT_STOCK_OUT(tArray, tObj)
            .then((data) => {
                if (typeof data.graphQLErrors === "undefined") {
                    console.log(
                        "ServiceMgrKCD_BUYER.mgr1KcdStyle call => " +
                            data.length,
                    );
                    toast.current.show({
                        severity: "success",
                        summary: "Output Stock Out",
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
                        summary: "Output Stock Error",
                        detail: "",
                        life: 3000,
                    });
                }
            });

        console.log(tObj);
    };

    const processOutput2 = () => {
        var tObj = { ...dataEDT_KSV_STOCK_OUT };
        tObj.FROM_TYPE = dataEDT_KSV_STOCK_OUT_FROM_TYPE.CD_CODE;
        tObj.TO_TYPE = dataEDT_KSV_STOCK_OUT_TO_TYPE.CD_CODE;
        tObj.DELIVERY_TYPE = dataEDT_KSV_STOCK_OUT_DELIVERY_TYPE.CD_CODE;
            tObj.USER_ID = serviceLib.getUserInfo().USER_ID;

        var tDeliveryName = dataEDT_KSV_STOCK_OUT_DELIVERY_TYPE.CD_NAME;
        if (
            tObj.DELIVERY_TYPE === "7" ||
            tObj.DELIVERY_TYPE === "6" ||
            tObj.DELIVERY_TYPE === "D" ||
            tObj.DELIVERY_TYPE === "A" ||
            tObj.DELIVERY_TYPE === "42" ||
            tObj.DELIVERY_TYPE === "31" ||
            tDeliveryName.substring(0, 3) === "AIR"
        ) {
            if (tObj.RECEIVER === "" || tObj.SENDOR === "") {
                console.log("ERROR : check sender/receciver");
                return;
            }
            if (tObj.CHARGE1 === "" || tObj.CHARGE2 === "") {
                console.log("ERROR : check charge kind/code");
                return;
            }
            if (tObj.WEIGHT_CBM === "") {
                console.log("ERROR : input weight");
                return;
            }
        }

        var tArray = datasTBL_KSV_STOCK_OUT2.map((col, i) => {
            var tObj1 = { ...col };
            delete tObj1.id;
            delete tObj1.__typename;
            return tObj1;
        });

        if (tArray.length <= 0) return;

        serviceS0411_STSOUT_RECORD
            .mgrInsert_OUTPUT_STOCK_OUT2(tArray, tObj)
            .then((data) => {
                if (typeof data.graphQLErrors === "undefined") {
                    console.log(
                        "ServiceMgrKCD_BUYER.mgr1KcdStyle call => " +
                            data.length,
                    );
                    toast.current.show({
                        severity: "success",
                        summary: "Output Stock Out2",
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
                        summary: "Output Stock2 Error",
                        detail: "",
                        life: 3000,
                    });
                }
            });
        console.log(tObj);
    };

    const search_STOCK_OUT = () => {
        // QRY_KSV_STOCK_OUT

        if (dataEDT_KSV_STOCK_OUT.IS_STOCKOUT !== "1") {
            var tObj = {};
            tObj.S_IN_DATE = dataQRY_KSV_STOCK_OUT.S_IN_DATE.trim();
            tObj.E_IN_DATE = dataQRY_KSV_STOCK_OUT.E_IN_DATE.trim();
            tObj.PO_CD = dataQRY_KSV_STOCK_OUT.PO_CD.trim();
            tObj.VENDOR_TYPE = "";
            tObj.VENDOR_CD = "";
            tObj.USER_ID = "";
            serviceS0411_STSOUT_RECORD
                .mgrQueryTBL_KSV_STOCK_OUT(tObj)
                .then((data) => {
                    if (typeof data.graphQLErrors === "undefined") {
                        console.log(
                            "ServiceMgrKCD_BUYER.mgr1KcdStyle call => " +
                                data.length,
                        );

                        var tArray = data.map((col, i) => {
                            var tObj = { ...col };
                            tObj.id = i + 1;
                            return tObj;
                        });

                        setDatasTBL_KSV_STOCK_OUT(tArray);
                        setDatasTBL_KSV_STOCK_OUT2([]);
                    } else {
                        console.log(
                            "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                                JSON.stringify(data.graphQLErrors),
                        );
                    }
                });
        } else {
            var tObj1 = {};
            tObj1.PO_CD = dataEDT_KSV_STOCK_OUT.STOCKOUT_PO_CD.trim();
            serviceS0411_STSOUT_RECORD
                .mgrQueryTBL_KSV_STOCK_OUT2(tObj1)
                .then((data) => {
                    if (typeof data.graphQLErrors === "undefined") {
                        console.log(
                            "ServiceMgrKCD_BUYER.mgr1KcdStyle call => " +
                                data.length,
                        );
                        var tArray = data.map((col, i) => {
                            var tObj = { ...col };
                            tObj.id = i + 1;
                            return tObj;
                        });

                        setDatasTBL_KSV_STOCK_OUT2(tArray);
                        setDatasTBL_KSV_STOCK_OUT([]);
                    } else {
                        console.log(
                            "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                                JSON.stringify(data.graphQLErrors),
                        );
                    }
                });
        }
    };

    /* QRY KSV_STOCK_OUT*/
    const [data_CODE, setData_CODE] = useState({});
    const [dataQRY_KSV_STOCK_OUT, setDataQRY_KSV_STOCK_OUT] = useState(
        emptyQRY_KSV_STOCK_OUT,
    );

    const onCalChangeQRY_KSV_STOCK_OUT_S_IN_DATE = (e, name) => {
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

    const onCalChangeQRY_KSV_STOCK_OUT_E_IN_DATE = (e, name) => {
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

    const [
        datasQRY_KSV_STOCK_OUT_VENDOR_TYPE,
        setDatasQRY_KSV_STOCK_OUT_VENDOR_TYPE,
    ] = useState([]);
    const [
        dataQRY_KSV_STOCK_OUT_VENDOR_TYPE,
        setDataQRY_KSV_STOCK_OUT_VENDOR_TYPE,
    ] = useState({});

    const onDropdownChangeQRY_KSV_STOCK_OUT_VENDOR_TYPE = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataQRY_KSV_STOCK_OUT = { ...dataQRY_KSV_STOCK_OUT };

        let tTypeVal = _dataQRY_KSV_STOCK_OUT[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_STOCK_OUT[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_STOCK_OUT[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_STOCK_OUT(_dataQRY_KSV_STOCK_OUT);
        setDataQRY_KSV_STOCK_OUT_VENDOR_TYPE(e.value);
    };

    const [datasQRY_KSV_STOCK_OUT_USER_ID, setDatasQRY_KSV_STOCK_OUT_USER_ID] =
        useState([]);
    const [dataQRY_KSV_STOCK_OUT_USER_ID, setDataQRY_KSV_STOCK_OUT_USER_ID] =
        useState({});

    const onDropdownChangeQRY_KSV_STOCK_OUT_USER_ID = (e, name) => {
        let val = (e.value && e.value.USER_ID) || "";

        let _dataQRY_KSV_STOCK_OUT = { ...dataQRY_KSV_STOCK_OUT };

        let tTypeVal = _dataQRY_KSV_STOCK_OUT[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_STOCK_OUT[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_STOCK_OUT[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_STOCK_OUT(_dataQRY_KSV_STOCK_OUT);
        setDataQRY_KSV_STOCK_OUT_USER_ID(e.value);
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

    const onCalChangeQRY_KSV_STOCK_OUT_S_STOCKOUT_DATE = (e, name) => {
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

    const onCalChangeQRY_KSV_STOCK_OUT_E_STOCKOUT_DATE = (e, name) => {
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

    const onCheckboxChangeQRY_KSV_STOCK_OUT_IS_ALL_STOCK = (e, name) => {
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

    const onCheckboxChangeQRY_KSV_STOCK_OUT_IS_SAME_FAC = (e, name) => {
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

    /*TABLE KSV_STOCK_OUT */
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
    };

    const onRowClickTBL_KSV_STOCK_OUT = (event) => {
        let argTBL_KSV_STOCK_OUT = event.data;
        if (flagSelectModeTBL_KSV_STOCK_OUT) return;

        // Service : NawooAll:mgrQueryTBL_KSV_STOCK_OUT
    };

    /**TABLE KSV_STOCK_OUT2 */
    // DEFINE DATAGRID : TBL_KSV_STOCK_OUT2
    const [datasTBL_KSV_STOCK_OUT2, setDatasTBL_KSV_STOCK_OUT2] = useState([]);
    const dt_TBL_KSV_STOCK_OUT2 = useRef(null);
    const [dataTBL_KSV_STOCK_OUT2, setDataTBL_KSV_STOCK_OUT2] = useState(
        emptyTBL_KSV_STOCK_OUT2,
    );
    const [selectedTBL_KSV_STOCK_OUT2, setSelectedTBL_KSV_STOCK_OUT2] =
        useState([]);
    const [
        flagSelectModeTBL_KSV_STOCK_OUT2,
        setFlagSelectModeTBL_KSV_STOCK_OUT2,
    ] = useState(false);

    // DATAGRID CODE : TBL_KSV_STOCK_OUT2

    const onRowClick1TBL_KSV_STOCK_OUT2 = (argData0) => {
        var argData = {};

        if (typeof argData0.length !== "undefined") {
            argData = argData0[0];
        } else {
            argData = argData0;
        }

        let argTBL_KSV_STOCK_OUT2 = argData;

        setDataTBL_KSV_STOCK_OUT2(argTBL_KSV_STOCK_OUT2);
    };

    const onRowClickTBL_KSV_STOCK_OUT2 = (event) => {
        let argTBL_KSV_STOCK_OUT2 = event.data;
        if (flagSelectModeTBL_KSV_STOCK_OUT2) return;

        // Service : NawooAll:mgrQueryTBL_KSV_STOCK_OUT2
    };

    /**EDIT KSV_STOCK_OUT */
    const [datasEDT_KSV_STOCK_OUT, setDatasEDT_KSV_STOCK_OUT] = useState([]);
    const [dataEDT_KSV_STOCK_OUT, setDataEDT_KSV_STOCK_OUT] = useState(
        emptyEDT_KSV_STOCK_OUT,
    );

    const [
        datasEDT_KSV_STOCK_OUT_FROM_TYPE,
        setDatasEDT_KSV_STOCK_OUT_FROM_TYPE,
    ] = useState([]);
    const [
        dataEDT_KSV_STOCK_OUT_FROM_TYPE,
        setDataEDT_KSV_STOCK_OUT_FROM_TYPE,
    ] = useState({});

    const onDropdownChangeEDT_KSV_STOCK_OUT_FROM_TYPE = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataEDT_KSV_STOCK_OUT = { ...dataEDT_KSV_STOCK_OUT };

        let tTypeVal = _dataEDT_KSV_STOCK_OUT[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_KSV_STOCK_OUT[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_KSV_STOCK_OUT[`${name}`] = parseInt(val);
        }
        setDataEDT_KSV_STOCK_OUT(_dataEDT_KSV_STOCK_OUT);
        setDataEDT_KSV_STOCK_OUT_FROM_TYPE(e.value);

        var _tObj = { ...dataEDT_KSV_STOCK_OUT };
        var _tFromType = e.value.CD_NAME.substring(0, 1);
        var _tToType = dataEDT_KSV_STOCK_OUT_TO_TYPE.CD_NAME.substring(0, 1);
        var _tDeliveryType =
            dataEDT_KSV_STOCK_OUT_DELIVERY_TYPE.CD_NAME.substring(0, 1);
        var _tOutDate = _tObj.OUT_DATE.substring(2, 4);
        _tObj.PL_NO = `${_tFromType}T${_tToType}-${_tDeliveryType}${_tOutDate}`;

        var tObj0 = {};
        tObj0.PACK_CD = _tObj.PL_NO;
        serviceS0411_STSOUT_RECORD.mgrQuery_CODE_1(tObj0).then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                console.log(
                    "ServiceMgrKCD_BUYER.mgr1KcdStyle call => " + data.MAX_SEQ,
                );
                var tMax = 1;
                if (data.MAX_SEQ.length >= 11) {
                    tMax = parseInt(data.MAX_SEQ.substring(8, 11));
                    tMax += 1;
                }
                var tZero = "000";
                var tMaxStr =
                    tZero.substring(0, 3 - String(tMax).length) + String(tMax);
                _tObj.PL_NO = `${_tObj.PL_NO}-${tMaxStr}`;
                var _tObj1 = { ...dataEDT_KSV_STOCK_OUT };
                _tObj1.PL_NO = _tObj.PL_NO;
                setDataEDT_KSV_STOCK_OUT(_tObj1);
            } else {
                console.log(
                    "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });

        /*
    FROM_TYPE: "",
    TO_TYPE: "",
    DELIVERY_TYPE: "",
    */
    };

    const [datasEDT_KSV_STOCK_OUT_TO_TYPE, setDatasEDT_KSV_STOCK_OUT_TO_TYPE] =
        useState([]);
    const [dataEDT_KSV_STOCK_OUT_TO_TYPE, setDataEDT_KSV_STOCK_OUT_TO_TYPE] =
        useState({});

    const onDropdownChangeEDT_KSV_STOCK_OUT_TO_TYPE = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataEDT_KSV_STOCK_OUT = { ...dataEDT_KSV_STOCK_OUT };

        let tTypeVal = _dataEDT_KSV_STOCK_OUT[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_KSV_STOCK_OUT[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_KSV_STOCK_OUT[`${name}`] = parseInt(val);
        }

        setDataEDT_KSV_STOCK_OUT(_dataEDT_KSV_STOCK_OUT);
        setDataEDT_KSV_STOCK_OUT_TO_TYPE(e.value);

        var _tObj = { ...dataEDT_KSV_STOCK_OUT };
        var _tFromType = dataEDT_KSV_STOCK_OUT_FROM_TYPE.CD_NAME.substring(
            0,
            1,
        );
        var _tToType = e.value.CD_NAME.substring(0, 1);
        var _tDeliveryType =
            dataEDT_KSV_STOCK_OUT_DELIVERY_TYPE.CD_NAME.substring(0, 1);
        var _tOutDate = _tObj.OUT_DATE.substring(2, 4);
        _tObj.PL_NO = `${_tFromType}T${_tToType}-${_tDeliveryType}${_tOutDate}`;

        var tObj0 = {};
        tObj0.PACK_CD = _tObj.PL_NO;
        serviceS0411_STSOUT_RECORD.mgrQuery_CODE_1(tObj0).then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                console.log(
                    "ServiceMgrKCD_BUYER.mgr1KcdStyle call => " + data.MAX_SEQ,
                );
                var tMax = 1;
                if (data.MAX_SEQ.length >= 11) {
                    tMax = parseInt(data.MAX_SEQ.substring(8, 11));
                    tMax += 1;
                }
                var tZero = "000";
                var tMaxStr =
                    tZero.substring(0, 3 - String(tMax).length) + String(tMax);
                _tObj.PL_NO = `${_tObj.PL_NO}-${tMaxStr}`;
                var _tObj1 = { ...dataEDT_KSV_STOCK_OUT };
                console.log(_tObj1);
                _tObj1.PL_NO = _tObj.PL_NO;
                setDataEDT_KSV_STOCK_OUT(_tObj1);
            } else {
                console.log(
                    "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });
    };

    const [
        datasEDT_KSV_STOCK_OUT_DELIVERY_TYPE,
        setDatasEDT_KSV_STOCK_OUT_DELIVERY_TYPE,
    ] = useState([]);
    const [
        dataEDT_KSV_STOCK_OUT_DELIVERY_TYPE,
        setDataEDT_KSV_STOCK_OUT_DELIVERY_TYPE,
    ] = useState({});

    const onDropdownChangeEDT_KSV_STOCK_OUT_DELIVERY_TYPE = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataEDT_KSV_STOCK_OUT = { ...dataEDT_KSV_STOCK_OUT };

        let tTypeVal = _dataEDT_KSV_STOCK_OUT[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_KSV_STOCK_OUT[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_KSV_STOCK_OUT[`${name}`] = parseInt(val);
        }

        setDataEDT_KSV_STOCK_OUT(_dataEDT_KSV_STOCK_OUT);
        setDataEDT_KSV_STOCK_OUT_DELIVERY_TYPE(e.value);

        var _tObj = { ...dataEDT_KSV_STOCK_OUT };
        var _tFromType = dataEDT_KSV_STOCK_OUT_FROM_TYPE.CD_NAME.substring(
            0,
            1,
        );
        var _tToType = dataEDT_KSV_STOCK_OUT_TO_TYPE.CD_NAME.substring(0, 1);
        var _tDeliveryType = e.value.CD_NAME.substring(0, 1);
        var _tOutDate = _tObj.OUT_DATE.substring(2, 4);
        _tObj.PL_NO = `${_tFromType}T${_tToType}-${_tDeliveryType}${_tOutDate}`;

        var tObj0 = {};
        tObj0.PACK_CD = _tObj.PL_NO;
        serviceS0411_STSOUT_RECORD.mgrQuery_CODE_1(tObj0).then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                console.log(
                    "ServiceMgrKCD_BUYER.mgr1KcdStyle call => " + data.MAX_SEQ,
                );
                var tMax = 1;
                if (data.MAX_SEQ.length >= 11) {
                    tMax = parseInt(data.MAX_SEQ.substring(8, 11));
                    tMax += 1;
                }
                var tZero = "000";
                var tMaxStr =
                    tZero.substring(0, 3 - String(tMax).length) + String(tMax);
                _tObj.PL_NO = `${_tObj.PL_NO}-${tMaxStr}`;
                var _tObj1 = { ...dataEDT_KSV_STOCK_OUT };
                console.log(_tObj1);
                _tObj1.PL_NO = _tObj.PL_NO;
                setDataEDT_KSV_STOCK_OUT(_tObj1);
            } else {
                console.log(
                    "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });
    };

    const onCalChangeEDT_KSV_STOCK_OUT_OUT_DATE = (e, name) => {
        let val1 = e.value || "";
        let val = "";
        if (val1 === "") {
            val = "";
        } else {
            val = getDateVal(val1);
        }

        let _dataEDT_KSV_STOCK_OUT = { ...dataEDT_KSV_STOCK_OUT };
        _dataEDT_KSV_STOCK_OUT[`${name}`] = val;
        setDataEDT_KSV_STOCK_OUT(_dataEDT_KSV_STOCK_OUT);
    };

    const onInputChangeEDT_KSV_STOCK_OUT_CD_QTY = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_STOCK_OUT = { ...dataEDT_KSV_STOCK_OUT };

        let tTypeVal = _dataEDT_KSV_STOCK_OUT[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_STOCK_OUT[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_STOCK_OUT[`${name}`] = parseInt(val);

        setDataEDT_KSV_STOCK_OUT(_dataEDT_KSV_STOCK_OUT);
    };

    const onInputChangeEDT_KSV_STOCK_OUT_CT_NO = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_STOCK_OUT = { ...dataEDT_KSV_STOCK_OUT };

        let tTypeVal = _dataEDT_KSV_STOCK_OUT[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_STOCK_OUT[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_STOCK_OUT[`${name}`] = parseInt(val);

        setDataEDT_KSV_STOCK_OUT(_dataEDT_KSV_STOCK_OUT);
    };

    const [
        datasEDT_KSV_STOCK_OUT_REASON_TYPE,
        setDatasEDT_KSV_STOCK_OUT_REASON_TYPE,
    ] = useState([]);
    const [
        dataEDT_KSV_STOCK_OUT_REASON_TYPE,
        setDataEDT_KSV_STOCK_OUT_REASON_TYPE,
    ] = useState({});

    const onDropdownChangeEDT_KSV_STOCK_OUT_REASON_TYPE = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataEDT_KSV_STOCK_OUT = { ...dataEDT_KSV_STOCK_OUT };

        let tTypeVal = _dataEDT_KSV_STOCK_OUT[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_KSV_STOCK_OUT[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_KSV_STOCK_OUT[`${name}`] = parseInt(val);
        }

        setDataEDT_KSV_STOCK_OUT(_dataEDT_KSV_STOCK_OUT);
        setDataEDT_KSV_STOCK_OUT_REASON_TYPE(e.value);
    };

    const onInputChangeEDT_KSV_STOCK_OUT_WEIGHT_CBM = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_STOCK_OUT = { ...dataEDT_KSV_STOCK_OUT };

        let tTypeVal = _dataEDT_KSV_STOCK_OUT[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_STOCK_OUT[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_STOCK_OUT[`${name}`] = parseInt(val);

        setDataEDT_KSV_STOCK_OUT(_dataEDT_KSV_STOCK_OUT);
    };

    const [datasEDT_KSV_STOCK_OUT_CHARGE1, setDatasEDT_KSV_STOCK_OUT_CHARGE1] =
        useState([]);
    const [dataEDT_KSV_STOCK_OUT_CHARGE1, setDataEDT_KSV_STOCK_OUT_CHARGE1] =
        useState({});

    const onDropdownChangeEDT_KSV_STOCK_OUT_CHARGE1 = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataEDT_KSV_STOCK_OUT = { ...dataEDT_KSV_STOCK_OUT };

        let tTypeVal = _dataEDT_KSV_STOCK_OUT[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_KSV_STOCK_OUT[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_KSV_STOCK_OUT[`${name}`] = parseInt(val);
        }

        setDataEDT_KSV_STOCK_OUT(_dataEDT_KSV_STOCK_OUT);
        setDataEDT_KSV_STOCK_OUT_CHARGE1(e.value);

        /*
    Charge오른쪽 : charge_kind가 1일때 kcd_buyer, 
           2일때 kcd_vendor, 3일때 kcd_code where cd_group=‘buyer_team’ and cd_flag=‘’ 
           4일때 kcd_factory
    */
        if (val === "1") {
            var tArray = data_CODE.BUYER_CD.map((col, i) => {
                var tObj = { ...col };
                tObj.CD_CODE = col.BUYER_CD;
                tObj.CD_NAME = col.BUYER_NAME;
                return tObj;
            });
            setDatasEDT_KSV_STOCK_OUT_CHARGE2(tArray);
            setDataEDT_KSV_STOCK_OUT_CHARGE2(tArray[0]);
        }
        if (val === "2") {
            var tArray = data_CODE.VENDOR_CD.map((col, i) => {
                var tObj = { ...col };
                tObj.CD_CODE = col.VENDOR_CD;
                tObj.CD_NAME = col.VENDOR_NAME;
                return tObj;
            });
            setDatasEDT_KSV_STOCK_OUT_CHARGE2(tArray);
            setDataEDT_KSV_STOCK_OUT_CHARGE2(tArray[0]);
        }
        if (val === "3") {
            var tArray = data_CODE.BUYER_TEAM.map((col, i) => {
                var tObj = { ...col };
                tObj.CD_CODE = col.CD_CODE;
                tObj.CD_NAME = col.CD_NAME;
                return tObj;
            });
            setDatasEDT_KSV_STOCK_OUT_CHARGE2(tArray);
            setDataEDT_KSV_STOCK_OUT_CHARGE2(tArray[0]);
        }
        if (val === "4") {
            var tArray = data_CODE.FACTORY_CD.map((col, i) => {
                var tObj = { ...col };
                tObj.CD_CODE = col.FACTORY_CD;
                tObj.CD_NAME = col.FACTORY_NAME;
                return tObj;
            });
            setDatasEDT_KSV_STOCK_OUT_CHARGE2(tArray);
            setDataEDT_KSV_STOCK_OUT_CHARGE2(tArray[0]);
        }
    };

    const [datasEDT_KSV_STOCK_OUT_CHARGE2, setDatasEDT_KSV_STOCK_OUT_CHARGE2] =
        useState([]);
    const [dataEDT_KSV_STOCK_OUT_CHARGE2, setDataEDT_KSV_STOCK_OUT_CHARGE2] =
        useState({});

    const onDropdownChangeEDT_KSV_STOCK_OUT_CHARGE2 = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataEDT_KSV_STOCK_OUT = { ...dataEDT_KSV_STOCK_OUT };

        let tTypeVal = _dataEDT_KSV_STOCK_OUT[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_KSV_STOCK_OUT[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_KSV_STOCK_OUT[`${name}`] = parseInt(val);
        }

        setDataEDT_KSV_STOCK_OUT(_dataEDT_KSV_STOCK_OUT);
        setDataEDT_KSV_STOCK_OUT_CHARGE2(e.value);
    };

    const onInputChangeEDT_KSV_STOCK_OUT_REMARK = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_STOCK_OUT = { ...dataEDT_KSV_STOCK_OUT };

        let tTypeVal = _dataEDT_KSV_STOCK_OUT[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_STOCK_OUT[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_STOCK_OUT[`${name}`] = parseInt(val);

        setDataEDT_KSV_STOCK_OUT(_dataEDT_KSV_STOCK_OUT);
    };

    const onInputChangeEDT_KSV_STOCK_OUT_PL_NO = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_STOCK_OUT = { ...dataEDT_KSV_STOCK_OUT };

        let tTypeVal = _dataEDT_KSV_STOCK_OUT[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_STOCK_OUT[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_STOCK_OUT[`${name}`] = parseInt(val);

        setDataEDT_KSV_STOCK_OUT(_dataEDT_KSV_STOCK_OUT);
    };

    const [datasEDT_KSV_STOCK_OUT_SENDOR, setDatasEDT_KSV_STOCK_OUT_SENDOR] =
        useState([]);
    const [dataEDT_KSV_STOCK_OUT_SENDOR, setDataEDT_KSV_STOCK_OUT_SENDOR] =
        useState({});

    const onDropdownChangeEDT_KSV_STOCK_OUT_SENDOR = (e, name) => {
        let val = (e.value && e.value.RECEIVER_ID) || "";

        let _dataEDT_KSV_STOCK_OUT = { ...dataEDT_KSV_STOCK_OUT };

        let tTypeVal = _dataEDT_KSV_STOCK_OUT[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_KSV_STOCK_OUT[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_KSV_STOCK_OUT[`${name}`] = parseInt(val);
        }

        setDataEDT_KSV_STOCK_OUT(_dataEDT_KSV_STOCK_OUT);
        setDataEDT_KSV_STOCK_OUT_SENDOR(e.value);
    };

    const [
        datasEDT_KSV_STOCK_OUT_RECEIVER,
        setDatasEDT_KSV_STOCK_OUT_RECEIVER,
    ] = useState([]);
    const [dataEDT_KSV_STOCK_OUT_RECEIVER, setDataEDT_KSV_STOCK_OUT_RECEIVER] =
        useState({});

    const onDropdownChangeEDT_KSV_STOCK_OUT_RECEIVER = (e, name) => {
        let val = (e.value && e.value.RECEIVER_ID) || "";

        let _dataEDT_KSV_STOCK_OUT = { ...dataEDT_KSV_STOCK_OUT };

        let tTypeVal = _dataEDT_KSV_STOCK_OUT[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_KSV_STOCK_OUT[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_KSV_STOCK_OUT[`${name}`] = parseInt(val);
        }

        setDataEDT_KSV_STOCK_OUT(_dataEDT_KSV_STOCK_OUT);
        setDataEDT_KSV_STOCK_OUT_RECEIVER(e.value);
    };

    const onInputChangeEDT_KSV_STOCK_OUT_STOCKOUT_PO_CD = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_STOCK_OUT = { ...dataEDT_KSV_STOCK_OUT };

        let tTypeVal = _dataEDT_KSV_STOCK_OUT[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_STOCK_OUT[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_STOCK_OUT[`${name}`] = parseInt(val);

        setDataEDT_KSV_STOCK_OUT(_dataEDT_KSV_STOCK_OUT);
    };

    const onCheckboxChangeEDT_KSV_STOCK_OUT_IS_STOCKOUT = (e, name) => {
        let val = "";
        let _dataEDT_KSV_STOCK_OUT = { ...dataEDT_KSV_STOCK_OUT };
        if (e.checked) {
            val = "1";
        } else {
            val = "0";
        }
        _dataEDT_KSV_STOCK_OUT[`${name}`] = val;
        setDataEDT_KSV_STOCK_OUT(_dataEDT_KSV_STOCK_OUT);
    };

    useEffect(() => {
        var tObj = {};
        tObj.S_IN_DATE = "20220101";
        tObj.E_IN_DATE = "20231231";
        tObj.PO_CD = "";
        tObj.VENDOR_TYPE = "";
        serviceS0411_STSOUT_RECORD.mgrQuery_CODE(tObj).then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                console.log(
                    "ServiceMgrKCD_BUYER.mgr1KcdStyle call => " +
                        data.PO_CD.length,
                );
                setData_CODE(data);

                setDatasQRY_KSV_STOCK_OUT_PO_CD(data.PO_CD);
                setDataQRY_KSV_STOCK_OUT_PO_CD(data.PO_CD[0]);

                setDatasQRY_KSV_STOCK_OUT_VENDOR_TYPE(data.VENDOR_TYPE);
                setDataQRY_KSV_STOCK_OUT_VENDOR_TYPE(data.VENDOR_TYPE[0]);

                setDatasQRY_KSV_STOCK_OUT_USER_ID(data.USER_ID);
                setDataQRY_KSV_STOCK_OUT_USER_ID(data.USER_ID[0]);

                setDatasQRY_KSV_STOCK_OUT_VENDOR_CD(data.VENDOR_CD);
                setDataQRY_KSV_STOCK_OUT_VENDOR_CD(data.VENDOR_CD[0]);

                setDatasEDT_KSV_STOCK_OUT_FROM_TYPE(data.FROM_TYPE);
                setDataEDT_KSV_STOCK_OUT_FROM_TYPE(data.FROM_TYPE[0]);

                setDatasEDT_KSV_STOCK_OUT_TO_TYPE(data.FROM_TYPE);
                setDataEDT_KSV_STOCK_OUT_TO_TYPE(data.FROM_TYPE[0]);

                setDatasEDT_KSV_STOCK_OUT_DELIVERY_TYPE(data.DELIVERY_TYPE);
                setDataEDT_KSV_STOCK_OUT_DELIVERY_TYPE(data.DELIVERY_TYPE[0]);

                setDatasEDT_KSV_STOCK_OUT_REASON_TYPE(data.REASON_TYPE);
                setDataEDT_KSV_STOCK_OUT_REASON_TYPE(data.REASON_TYPE[0]);

                setDatasEDT_KSV_STOCK_OUT_CHARGE1(data.CHARGE1);
                setDataEDT_KSV_STOCK_OUT_CHARGE1(data.CHARGE1[0]);

                /*
        Charge오른쪽 : charge_kind가 1일때 kcd_buyer, 
        2일때 kcd_vendor, 3일때 kcd_code where cd_group=‘buyer_team’ and cd_flag=‘’ 
        4일때 kcd_factory
        */
                setDatasEDT_KSV_STOCK_OUT_CHARGE2([]);

                setDatasEDT_KSV_STOCK_OUT_SENDOR(data.RECEIVER);
                setDataEDT_KSV_STOCK_OUT_SENDOR(data.RECEIVER[0]);

                setDatasEDT_KSV_STOCK_OUT_RECEIVER(data.RECEIVER);
                setDataEDT_KSV_STOCK_OUT_RECEIVER(data.RECEIVER[0]);
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
                    height: "10rem",
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
                    <p style={{ width: "8rem", display: "inline-block" }}>In Date</p>
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
                            id="id_S_IN_DATE"
                            value={changeDateVal(
                                dataQRY_KSV_STOCK_OUT.S_IN_DATE,
                            )}
                            onChange={(e) =>
                                onCalChangeQRY_KSV_STOCK_OUT_S_IN_DATE(
                                    e,
                                    "S_IN_DATE",
                                )
                            }
                        />
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
                    <p style={{ width: "1rem", display: "inline-block" }}>~</p>
                    <div
                        style={{
                            marginLeft: "2rem",
                            display: "inline-block",
                            width: "13rem",
                        }}
                    >
                        <Calendar
                            showButtonBar
                            dateFormat="yy-mm-dd"
                            id="id_E_IN_DATE"
                            value={changeDateVal(
                                dataQRY_KSV_STOCK_OUT.E_IN_DATE,
                            )}
                            onChange={(e) =>
                                onCalChangeQRY_KSV_STOCK_OUT_E_IN_DATE(
                                    e,
                                    "E_IN_DATE",
                                )
                            }
                        />
                    </div>
                </span>
                <span
                    style={{
                        marginLeft: "0.5rem",
                        height: "2rem",
                        display: "inline-block",
                        width: "33rem",
                    }}
                >
                    <p style={{ width: "8rem", display: "inline-block" }}>PO</p>
                    <div
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "23rem",
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
                        width: "33rem",
                    }}
                >
                    <p style={{ width: "8rem", display: "inline-block" }}>Supplier Type</p>
                    <div
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "23rem",
                        }}
                    >
                        <Dropdown
                            id="id_VENDOR_TYPE"
                            value={dataQRY_KSV_STOCK_OUT_VENDOR_TYPE}
                            onChange={(e) =>
                                onDropdownChangeQRY_KSV_STOCK_OUT_VENDOR_TYPE(
                                    e,
                                    "VENDOR_TYPE",
                                )
                            }
                            options={datasQRY_KSV_STOCK_OUT_VENDOR_TYPE}
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
                        width: "33rem",
                    }}
                >
                    <p style={{ width: "8rem", display: "inline-block" }}>User</p>
                    <div
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "23rem",
                        }}
                    >
                        <Dropdown
                            id="id_USER_ID"
                            value={dataQRY_KSV_STOCK_OUT_USER_ID}
                            onChange={(e) =>
                                onDropdownChangeQRY_KSV_STOCK_OUT_USER_ID(
                                    e,
                                    "USER_ID",
                                )
                            }
                            options={datasQRY_KSV_STOCK_OUT_USER_ID}
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
                        width: "50rem",
                    }}
                >
                    <p style={{ width: "8rem", display: "inline-block" }}>Supplier</p>
                    <div
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "23rem",
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
                        width: "23rem",
                    }}
                >
                    <p style={{ width: "8rem", display: "inline-block" }}>Stockout Date</p>
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
                            id="id_S_STOCKOUT_DATE"
                            value={changeDateVal(
                                dataQRY_KSV_STOCK_OUT.S_STOCKOUT_DATE,
                            )}
                            onChange={(e) =>
                                onCalChangeQRY_KSV_STOCK_OUT_S_STOCKOUT_DATE(
                                    e,
                                    "S_STOCKOUT_DATE",
                                )
                            }
                        />
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
                    <p style={{ width: "1rem", display: "inline-block" }}>~</p>
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
                            id="id_E_STOCKOUT_DATE"
                            value={changeDateVal(
                                dataQRY_KSV_STOCK_OUT.E_STOCKOUT_DATE,
                            )}
                            onChange={(e) =>
                                onCalChangeQRY_KSV_STOCK_OUT_E_STOCKOUT_DATE(
                                    e,
                                    "E_STOCKOUT_DATE",
                                )
                            }
                        />
                    </div>
                </span>
                <span
                    style={{
                        marginLeft: "0.5rem",
                        height: "2rem",
                        display: "inline-block",
                        width: "33rem",
                    }}
                >
                    <p style={{ width: "8rem", display: "inline-block" }}>All Stock</p>
                    <div
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "23rem",
                        }}
                    >
                        <Checkbox
                            style={{
                                display: "inline-block",
                                width: "1rem",
                                marginLeft: "0.5rem",
                            }}
                            id="id_IS_ALL_STOCK"
                            checked={changeCheckBoxVal(
                                dataQRY_KSV_STOCK_OUT.IS_ALL_STOCK,
                            )}
                            onChange={(e) =>
                                onCheckboxChangeQRY_KSV_STOCK_OUT_IS_ALL_STOCK(
                                    e,
                                    "IS_ALL_STOCK",
                                )
                            }
                        />
                    </div>
                </span>
                <span
                    style={{
                        marginLeft: "0.5rem",
                        height: "2rem",
                        display: "inline-block",
                        width: "10rem",
                    }}
                >
                    <p style={{ width: "8rem", display: "inline-block" }}>Same Fac</p>
                    <div
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "1rem",
                        }}
                    >
                        <Checkbox
                            style={{
                                display: "inline-block",
                                width: "1rem",
                                marginLeft: "0.5rem",
                            }}
                            id="id_IS_SAME_FAC"
                            checked={changeCheckBoxVal(
                                dataQRY_KSV_STOCK_OUT.IS_SAME_FAC,
                            )}
                            onChange={(e) =>
                                onCheckboxChangeQRY_KSV_STOCK_OUT_IS_SAME_FAC(
                                    e,
                                    "IS_SAME_FAC",
                                )
                            }
                        />
                    </div>
                </span>
                <span style={{ display: "inline-block" }}>
                    <Button
                        label="Air"
                        style={{ marginLeft: "2.1rem", height: "1.1rem" }}
                        className="p-button-text"
                    ></Button>
                </span>
                <span style={{ marginLeft: "53rem" }}>
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
                        icon="pi pi-search"
                        className="p-button-text"
                        onClick={search_STOCK_OUT}
                    />

                    <Button
                        label="List"
                        icon="pi pi-check"
                        className="p-button-text"
                        onClick={blankFn}
                    />
                    <Button
                        label="Save"
                        icon="pi pi-check"
                        className="p-button-text"
                        onClick={processOutput}
                    />
                    <Button
                        label="Auto QTY"
                        icon="pi pi-check"
                        className="p-button-text"
                        onClick={blankFn}
                    />
                    <Button
                        label="Reset"
                        icon="pi pi-check"
                        className="p-button-text"
                        onClick={blankFn}
                    />
                    <Button
                        label="Excel"
                        icon="pi pi-upload"
                        className="p-button-text"
                        onClick={blankFn}
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
                    <AFColumn field="MATL_NAME" headerClassName="t-header" header="Description" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="COLOR" headerClassName="t-header" header="Color" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="SPEC" headerClassName="t-header" header="Spec" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="UNIT" headerClassName="t-header" header="Unit" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="IN_DATE" headerClassName="t-header" header="In Date" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="INFAC_QTY" headerClassName="t-header" header="In Qty" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="REMAIN_QTY" headerClassName="t-header" header="Bal Qty" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="OUT_QTY" headerClassName="t-header" header="Out Qty" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="IN_TYPE_NAME" headerClassName="t-header" header="In Type" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="MATL_CD" headerClassName="t-header" header="Matl Cd" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="IN_TYPE" headerClassName="t-header" header="In Type.C" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="PO_SEQ" headerClassName="t-header" header="Po Seq.C" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="MRP_SEQ" headerClassName="t-header" header="Mrp Seq.C" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="IN_DATETIME" headerClassName="t-header" header="In DAte" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="REG_USER" headerClassName="t-header" header="Reg User" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="VENDOR_CD" headerClassName="t-header" header="Vendor Cd" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="VENDOR_TYPE" headerClassName="t-header" header="Vendor Type" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="MATL_SEQ" headerClassName="t-header" header="Matl Seq" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                </AFDataTable>
            </div>

            <div
                style={{
                    marginLeft: "1rem",
                    marginTop: "1rem",
                    width: "99rem",
                    height: "22rem",
                }}
            >
                <AFDataTable preventUnrelatedRerender
                    ref={dt_TBL_KSV_STOCK_OUT2}
                    size="small"
                    value={datasTBL_KSV_STOCK_OUT2}
                    resizableColumns
                    columnResizeMode="fit"
                    showGridlines
                    selectionMode="checkbox"
                    selection={selectedTBL_KSV_STOCK_OUT2}
                    onSelectionChange={(e) => {
                        setFlagSelectModeTBL_KSV_STOCK_OUT2(true);
                        setSelectedTBL_KSV_STOCK_OUT2(e.value);
                        console.log(
                            "selected length:" +
                                selectedTBL_KSV_STOCK_OUT2.length,
                        );
                        onRowClick1TBL_KSV_STOCK_OUT2(e.value);
                    }}
                    onRowClick={onRowClickTBL_KSV_STOCK_OUT2}
                    dataKey="id"
                    className="datatable-responsive"
                    virtualScrollerOptions={{ itemSize: 9 }}
                    emptyMessage=" " // header={headerTBL_KSV_STOCK_OUT2}
                    responsiveLayout="scroll"
                    scrollable
                    scrollHeight="18rem"
                >
                    <AFColumn field="USE_MATL_CD" headerClassName="t-header" header="Matl Cd" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="MATL_NAME" headerClassName="t-header" header="Description" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="COLOR" headerClassName="t-header" header="Color" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="SPEC" headerClassName="t-header" header="Spec" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="MATL_PRICE" headerClassName="t-header" header="Price" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="CURR_CD" headerClassName="t-header" header="Curr" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="UNIT" headerClassName="t-header" header="Unit" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="STOCK_QTY" headerClassName="t-header" header="Stock Qty" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="OUT_QTY" headerClassName="t-header" header="Out Qty" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="VENDOR_NAME" headerClassName="t-header" header="Vendor" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="FACTORY" headerClassName="t-header" header="Factory" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="OUT_FLAG" headerClassName="t-header" header="Out" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="STOCK_IDX" headerClassName="t-header" header="Stock Qty" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="USE_DATETIME" headerClassName="t-header" header="UseDatetime" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="FACTORY_CD" headerClassName="t-header" header="Factory Cd" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="USE_PO_CD" headerClassName="t-header" header="Use Po cd" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="USE_ORDER_CD" headerClassName="t-header" header="Use Order cd" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                </AFDataTable>
            </div>

            <Divider />

            <div
                style={{ width: "100rem", height: "14rem", marginTop: "1rem" }}
            >
                <div className="flex flex-row justify-content-start align-items-top">
                    <div style={{ width: "100rem", height: "14rem" }}>
                        <span
                            style={{
                                marginLeft: "0.5rem",
                                height: "2rem",
                                display: "inline-block",
                                width: "28rem",
                            }}
                        >
                            <p style={{ width: "8rem", display: "inline-block", }}>From</p>
                            <div
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "18rem",
                                }}
                            >
                                <Dropdown
                                    id="id_FROM_TYPE"
                                    value={dataEDT_KSV_STOCK_OUT_FROM_TYPE}
                                    onChange={(e) =>
                                        onDropdownChangeEDT_KSV_STOCK_OUT_FROM_TYPE(
                                            e,
                                            "FROM_TYPE",
                                        )
                                    }
                                    options={datasEDT_KSV_STOCK_OUT_FROM_TYPE}
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
                                width: "22rem",
                            }}
                        >
                            <p style={{ width: "2rem", display: "inline-block", }}>To</p>
                            <div
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "18rem",
                                }}
                            >
                                <Dropdown
                                    id="id_TO_TYPE"
                                    value={dataEDT_KSV_STOCK_OUT_TO_TYPE}
                                    onChange={(e) =>
                                        onDropdownChangeEDT_KSV_STOCK_OUT_TO_TYPE(
                                            e,
                                            "TO_TYPE",
                                        )
                                    }
                                    options={datasEDT_KSV_STOCK_OUT_TO_TYPE}
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
                                width: "20rem",
                            }}
                        >
                            {/* <p style={{ width: '8rem', display: 'inline-block' }}> . </p> */}
                            <div
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "18rem",
                                }}
                            >
                                <Dropdown
                                    id="id_DELIVERY_TYPE"
                                    value={dataEDT_KSV_STOCK_OUT_DELIVERY_TYPE}
                                    onChange={(e) =>
                                        onDropdownChangeEDT_KSV_STOCK_OUT_DELIVERY_TYPE(
                                            e,
                                            "DELIVERY_TYPE",
                                        )
                                    }
                                    options={
                                        datasEDT_KSV_STOCK_OUT_DELIVERY_TYPE
                                    }
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
                                width: "26rem",
                            }}
                        >
                            <p style={{ width: "6rem", display: "inline-block", }}>Out Date</p>
                            <div
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "18rem",
                                }}
                            >
                                <Calendar
                                    showButtonBar
                                    dateFormat="yy-mm-dd"
                                    id="id_OUT_DATE"
                                    value={changeDateVal(
                                        dataEDT_KSV_STOCK_OUT.OUT_DATE,
                                    )}
                                    onChange={(e) =>
                                        onCalChangeEDT_KSV_STOCK_OUT_OUT_DATE(
                                            e,
                                            "OUT_DATE",
                                        )
                                    }
                                />
                            </div>
                        </span>
                        <span
                            style={{
                                marginLeft: "0.5rem",
                                height: "2rem",
                                display: "inline-block",
                                width: "12rem",
                            }}
                        >
                            <p style={{ width: "8rem", display: "inline-block", }}>CT Qty</p>
                            <InputText
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "3rem",
                                }}
                                id="id_CD_QTY"
                                value={dataEDT_KSV_STOCK_OUT.CD_QTY}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_STOCK_OUT_CD_QTY(
                                        e,
                                        "CD_QTY",
                                    )
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
                            <p style={{ width: "4rem", display: "inline-block", }}>CT No</p>
                            <InputText
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "8rem",
                                }}
                                id="id_CT_NO"
                                value={dataEDT_KSV_STOCK_OUT.CT_NO}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_STOCK_OUT_CT_NO(
                                        e,
                                        "CT_NO",
                                    )
                                }
                            />
                        </span>
                        <span
                            style={{
                                marginLeft: "0.5rem",
                                height: "2rem",
                                display: "inline-block",
                                width: "70rem",
                            }}
                        >
                            <p style={{ width: "8rem", display: "inline-block", }}>Reason</p>
                            <div
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "30rem",
                                }}
                            >
                                <Dropdown
                                    id="id_REASON_TYPE"
                                    style={{ width: "30rem" }}
                                    value={dataEDT_KSV_STOCK_OUT_REASON_TYPE}
                                    onChange={(e) =>
                                        onDropdownChangeEDT_KSV_STOCK_OUT_REASON_TYPE(
                                            e,
                                            "REASON_TYPE",
                                        )
                                    }
                                    options={datasEDT_KSV_STOCK_OUT_REASON_TYPE}
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
                                width: "27rem",
                            }}
                        >
                            <p style={{ width: "8rem", display: "inline-block", }}>Weight/CBM</p>
                            <InputText
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "17rem",
                                }}
                                id="id_WEIGHT_CBM"
                                value={dataEDT_KSV_STOCK_OUT.WEIGHT_CBM}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_STOCK_OUT_WEIGHT_CBM(
                                        e,
                                        "WEIGHT_CBM",
                                    )
                                }
                            />
                        </span>
                        <span
                            style={{
                                marginLeft: "0.5rem",
                                height: "2rem",
                                display: "inline-block",
                                width: "30rem",
                            }}
                        >
                            <p style={{ width: "6.5rem", display: "inline-block", }}>Charge</p>
                            <div
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "23rem",
                                }}
                            >
                                <Dropdown
                                    id="id_CHARGE1"
                                    style={{ width: "23rem" }}
                                    value={dataEDT_KSV_STOCK_OUT_CHARGE1}
                                    onChange={(e) =>
                                        onDropdownChangeEDT_KSV_STOCK_OUT_CHARGE1(
                                            e,
                                            "CHARGE1",
                                        )
                                    }
                                    options={datasEDT_KSV_STOCK_OUT_CHARGE1}
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
                                disay: "inline-block",
                                width: "40rem",
                            }}
                        >
                            {/* <p style={{ width: '8rem', display: 'inline-block' }}> Charge2 </p> */}
                            <div
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "37rem",
                                }}
                            >
                                <Dropdown
                                    id="id_CHARGE2"
                                    style={{ width: "36rem" }}
                                    onChange={(e) =>
                                        onDropdownChangeEDT_KSV_STOCK_OUT_CHARGE2(
                                            e,
                                            "CHARGE2",
                                        )
                                    }
                                    options={datasEDT_KSV_STOCK_OUT_CHARGE2}
                                    optionLabel="CD_NAME"
                                    placeholder=""
                                    editable
                                ></Dropdown>
                            </div>
                        </span>
                        <span
                            style={{
                                marginLeft: "0.5rem",
                                height: "4rem",
                                display: "inline-block",
                                width: "70rem",
                            }}
                        >
                            <p style={{ width: "8rem", display: "inline-block", }}>Remark</p>
                            <InputText
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "50rem",
                                }}
                                id="id_REMARK"
                                value={dataEDT_KSV_STOCK_OUT.REMARK}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_STOCK_OUT_REMARK(
                                        e,
                                        "REMARK",
                                    )
                                }
                            />

                            <p style={{ width: "50rem", display: "inline-block", }} > MIXED BOX, PO_MIXED, JOIN MIXED, SUPPLIER MIXED </p> </span> <span style={{ marginLeft: "0.5rem", height: "2rem", display: "inline-block", width: "30rem", }} > <p style={{ width: "8rem", display: "inline-block", }}>PL No</p>
                            <InputText
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "20rem",
                                }}
                                id="id_PL_NO"
                                value={dataEDT_KSV_STOCK_OUT.PL_NO}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_STOCK_OUT_PL_NO(
                                        e,
                                        "PL_NO",
                                    )
                                }
                            />
                        </span>
                        <span
                            style={{
                                marginLeft: "0.5rem",
                                height: "2rem",
                                display: "inline-block",
                                width: "30rem",
                            }}
                        >
                            <p style={{ width: "8rem", display: "inline-block", }}>Sender</p>
                            <div
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "20rem",
                                }}
                            >
                                <Dropdown
                                    id="id_SENDOR"
                                    value={dataEDT_KSV_STOCK_OUT_SENDOR}
                                    onChange={(e) =>
                                        onDropdownChangeEDT_KSV_STOCK_OUT_SENDOR(
                                            e,
                                            "SENDOR",
                                        )
                                    }
                                    options={datasEDT_KSV_STOCK_OUT_SENDOR}
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
                                width: "30rem",
                            }}
                        >
                            <p style={{ width: "8rem", display: "inline-block", }}>Receiver</p>
                            <div
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "20rem",
                                }}
                            >
                                <Dropdown
                                    id="id_RECEIVER"
                                    value={dataEDT_KSV_STOCK_OUT_RECEIVER}
                                    onChange={(e) =>
                                        onDropdownChangeEDT_KSV_STOCK_OUT_RECEIVER(
                                            e,
                                            "RECEIVER",
                                        )
                                    }
                                    options={datasEDT_KSV_STOCK_OUT_RECEIVER}
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
                                width: "33rem",
                            }}
                        >
                            <p style={{ width: "8rem", display: "inline-block", }}>Stock Out : PO</p>
                            <div
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "2rem",
                                }}
                            >
                                <Checkbox
                                    style={{
                                        display: "inline-block",
                                        width: "1rem",
                                        marginLeft: "0.5rem",
                                    }}
                                    id="id_IS_ALL_STOCK"
                                    checked={changeCheckBoxVal(
                                        dataEDT_KSV_STOCK_OUT.IS_STOCKOUT,
                                    )}
                                    onChange={(e) =>
                                        onCheckboxChangeEDT_KSV_STOCK_OUT_IS_STOCKOUT(
                                            e,
                                            "IS_STOCKOUT",
                                        )
                                    }
                                />
                            </div>
                            <InputText
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "13rem",
                                }}
                                id="id_STOCKOUT_PO_CD"
                                value={dataEDT_KSV_STOCK_OUT.STOCKOUT_PO_CD}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_STOCK_OUT_STOCKOUT_PO_CD(
                                        e,
                                        "STOCKOUT_PO_CD",
                                    )
                                }
                            />
                        </span>
                    </div>
                </div>
            </div>
            <Divider />

            <div
                style={{ width: "100rem", height: "2rem", marginLeft: "71rem" }}
            >
                <div className="formgrid grid">
                    <div className="field col-6 md:col-6">
                        <Button
                            style={{ display: "inline-block", width: "10rem" }}
                            label="Reset"
                            icon="pi pi-times"
                            className="p-button-text"
                            onClick={blankFn}
                        />

                        <Button
                            style={{ display: "inline-block", width: "10rem" }}
                            label="Save"
                            icon="pi pi-check"
                            className="p-button-text"
                            onClick={blankFn}
                        />

                        <Button
                            style={{ display: "inline-block", width: "10rem" }}
                            label="Copy"
                            icon="pi pi-check"
                            className="p-button-text"
                            onClick={blankFn}
                        />
                    </div>
                </div>
            </div>

            <Divider />
            <Toast ref={toast} />
        </div>
    );
};

const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(S0411_STSOUT_RECORD, comparisonFn);
