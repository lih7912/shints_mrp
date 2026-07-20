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
import { ServiceS0406_STSIN_RECORD } from "../service/service_biz/ServiceS0406_STSIN_RECORD";

import "./page_common.scss";

const emptyKCD_CODE = {
    id: 0,
    CD_GROUP: "",
    CD_CODE: "",
    CD_NAME: "",
    CD_FLAG: "",
};

const emptyQRY_KSV_STOCK_IN = {
    PO_CD: "",
    VENDOR_TYPE: "",
};

const emptyQRY_KSV_STOCK_IN1 = {
    MATL_NAME: "",
    COLOR: "",
    SPEC: "",
    REMAIN_SUM: "",
    T_INQTY: "",
    INQTY_SEL: "",
    IS_M_PO: "",
    IS_INPUT_END: "",
    PAY_DATE: "",
    IN_DATE: "",
};

const emptyTBL_KCD_VENDOR = {
    id: 0,
    VENDOR_CD: "",
    VENDOR_NAME: "",
};

const emptyTBL_KSV_PO_MRP = {
    id: 0,
    MATL_NAME: "",
    COLOR: "",
    SPEC: "",
    UNIT: "",
    MATL_PRICE: "",
    PO_QTY: "",
    IN_QTY: "",
    MATL_CD: "",
    P_STATUS: "",
    CONF_FLAG: "",
    CURR_CD: "",
    TEMP_PRICE: "",
};

const emptyTBL_KSV_PO_MRP1 = {
    id: 0,
    PO_CD: "",
    ORDER_CD: "",
    VENDOR_NAME: "",
    VENDOR_CD: "",
    MATL_NAME: "",
    COLOR: "",
    SPEC: "",
    UNIT: "",
    MATL_PRICE: "",
    PO_QTY: "",
    IN_QTY_BEF: "",
    IN_QTY: "",
    T_QTY: "",
    IN: "",
    MIN_FLAG: "",
    MATL_CD: "",
    LC_QTY: "",
    BILL_TYPE: "",
};

const emptyTBL_KSV_PO_MST = {
    id: 0,
    PO_CD: "",
};

const emptyTBL_KSV_PO_MST1 = {
    id: 0,
    PO_CD: "",
};

const S0406_STSIN_RECORD = () => {
    const serviceLibRef = useRef(null);
    if (!serviceLibRef.current) {
        serviceLibRef.current = new ServiceLib();
        serviceLibRef.current.loginConfirm();
    }
    const serviceLib = serviceLibRef.current;
    const serviceS0406_STSIN_RECORDRef = useRef(null);
    if (!serviceS0406_STSIN_RECORDRef.current) serviceS0406_STSIN_RECORDRef.current = new ServiceS0406_STSIN_RECORD();
    const serviceS0406_STSIN_RECORD = serviceS0406_STSIN_RECORDRef.current;

    const toast = useRef(null);

    /* splitter 관련 */
    const [styleVal, setStyleVal] = useState({ width: "65vw" });

    /**/
    const queryNew = (argVENDOR_CD) => {
        var tObj0 = {};
        tObj0.PO_CD_ARRAY = datasTBL_KSV_PO_MST1.map((col, i) => {
            var tObj = { ...col };
            return tObj.PO_CD;
        });
        tObj0.VENDOR_CD = argVENDOR_CD;

        serviceS0406_STSIN_RECORD.mgrQuery_STOCK_IN_PRE(tObj0).then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                console.log("mgrQuery_STOCK_IN_PRE call => " + data.length);
                setDatasTBL_KSV_PO_MRP(data);
            } else {
                console.log(
                    "mgrQuery_STOCK_IN_PRE error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });

        var tObj1 = {};
        tObj1.PO_CD_ARRAY = datasTBL_KSV_PO_MST1.map((col, i) => {
            var tObj = { ...col };
            return tObj.PO_CD;
        });
        tObj1.VENDOR_CD = argVENDOR_CD;
        tObj1.MATL_CD = "";
        serviceS0406_STSIN_RECORD.mgrQuery_STOCK_IN_WORK(tObj1).then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                console.log("mgrQuery_STOCK_IN_WORK call => " + data.length);
                var tSumQty = 0;
                var tSumRemain = 0;
                var tArray = data.map((col, i) => {
                    var tObj = { ...col };
                    tObj.id = i + 1;
                    tObj.IN_QTY = tObj.REMAIN_QTY;
                    tObj.TOT_QTY = tObj.REMAIN_QTY;
                    tSumQty += parseInt(tObj.IN_QTY);
                    tSumRemain += parseInt(tObj.IN_QTY);
                    return tObj;
                });
                var _tObj = { ...dataQRY_KSV_STOCK_IN1 };
                _tObj.T_INQTY = tSumQty;
                _tObj.REMAIN_SUM = tSumRemain;
                setDataQRY_KSV_STOCK_IN(_tObj);

                setDatasTBL_KSV_PO_MRP1(tArray);
            } else {
                console.log(
                    "mgrQuery_STOCK_IN_WORK error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });
    };
    const processStockIn = () => {
        var tObjs = datasTBL_KSV_PO_MRP1.map((col, i) => {
            var tObj = { ...col };
            if (typeof tObj.__typename !== "undefined") delete tObj.__typename;
            if (typeof tObj.id !== "undefined") delete tObj.id;
            return tObj;
        });

        var tVendorCd = tObjs[0].VENDOR_CD;

        serviceS0406_STSIN_RECORD.mgrInsert_STOCK_IN(tObjs).then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                console.log("mgrInsert_STOCK_IN call => " + data.length);
                toast.current.show({
                    severity: "success",
                    summary: "Success:Stock_in",
                    detail: data[0].CODE,
                    life: 3000,
                });
                queryNew(tVendorCd);
            } else {
                console.log(
                    "mgrQuery_PO_CD error => " +
                        JSON.stringify(data.graphQLErrors),
                );
                toast.current.show({
                    severity: "success",
                    summary: "Fail:Stock_in",
                    detail: data[0].CODE,
                    life: 3000,
                });
            }
        });
    };

    const searchPO_CD = () => {
        var tObj = { ...dataQRY_KSV_STOCK_IN };
        tObj.VENDOR_TYPE = "";

        serviceS0406_STSIN_RECORD.mgrQuery_PO_CD(tObj).then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                console.log("mgrQuery_PO_CD call => " + data.length);
                setDatasTBL_KSV_PO_MST(data);
                setDatasTBL_KSV_PO_MST1([]);
            } else {
                console.log(
                    "mgrQuery_PO_CD error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });
    };

    /*QRY KSV_STOCK_IN */
    const [dataQRY_KSV_STOCK_IN, setDataQRY_KSV_STOCK_IN] = useState(
        emptyQRY_KSV_STOCK_IN,
    );

    const onInputChangeQRY_KSV_STOCK_IN_PO_CD = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_STOCK_IN = { ...dataQRY_KSV_STOCK_IN };

        let tTypeVal = _dataQRY_KSV_STOCK_IN[`${name}`];
        if (typeof tTypeVal === "string")
            _dataQRY_KSV_STOCK_IN[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_STOCK_IN[`${name}`] = parseInt(val);

        setDataQRY_KSV_STOCK_IN(_dataQRY_KSV_STOCK_IN);
    };

    const onInputChangeQRY_KSV_STOCK_IN_VENDOR_TYPE = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_STOCK_IN = { ...dataQRY_KSV_STOCK_IN };

        let tTypeVal = _dataQRY_KSV_STOCK_IN[`${name}`];
        if (typeof tTypeVal === "string")
            _dataQRY_KSV_STOCK_IN[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_STOCK_IN[`${name}`] = parseInt(val);

        setDataQRY_KSV_STOCK_IN(_dataQRY_KSV_STOCK_IN);
    };

    /*QRY KSV_STOCK_IN1 */

    const [dataQRY_KSV_STOCK_IN1, setDataQRY_KSV_STOCK_IN1] = useState(
        emptyQRY_KSV_STOCK_IN1,
    );

    const onInputChangeQRY_KSV_STOCK_IN1_MATL_NAME = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_STOCK_IN1 = { ...dataQRY_KSV_STOCK_IN1 };

        let tTypeVal = _dataQRY_KSV_STOCK_IN1[`${name}`];
        if (typeof tTypeVal === "string")
            _dataQRY_KSV_STOCK_IN1[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_STOCK_IN1[`${name}`] = parseInt(val);

        setDataQRY_KSV_STOCK_IN1(_dataQRY_KSV_STOCK_IN1);
    };

    const onInputChangeQRY_KSV_STOCK_IN1_COLOR = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_STOCK_IN1 = { ...dataQRY_KSV_STOCK_IN1 };

        let tTypeVal = _dataQRY_KSV_STOCK_IN1[`${name}`];
        if (typeof tTypeVal === "string")
            _dataQRY_KSV_STOCK_IN1[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_STOCK_IN1[`${name}`] = parseInt(val);

        setDataQRY_KSV_STOCK_IN1(_dataQRY_KSV_STOCK_IN1);
    };

    const onInputChangeQRY_KSV_STOCK_IN1_SPEC = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_STOCK_IN1 = { ...dataQRY_KSV_STOCK_IN1 };

        let tTypeVal = _dataQRY_KSV_STOCK_IN1[`${name}`];
        if (typeof tTypeVal === "string")
            _dataQRY_KSV_STOCK_IN1[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_STOCK_IN1[`${name}`] = parseInt(val);

        setDataQRY_KSV_STOCK_IN1(_dataQRY_KSV_STOCK_IN1);
    };

    const onInputChangeQRY_KSV_STOCK_IN1_REMAIN_SUM = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_STOCK_IN1 = { ...dataQRY_KSV_STOCK_IN1 };

        let tTypeVal = _dataQRY_KSV_STOCK_IN1[`${name}`];
        if (typeof tTypeVal === "string")
            _dataQRY_KSV_STOCK_IN1[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_STOCK_IN1[`${name}`] = parseInt(val);

        setDataQRY_KSV_STOCK_IN1(_dataQRY_KSV_STOCK_IN1);
    };

    const onInputChangeQRY_KSV_STOCK_IN1_T_INQTY = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_STOCK_IN1 = { ...dataQRY_KSV_STOCK_IN1 };

        let tTypeVal = _dataQRY_KSV_STOCK_IN1[`${name}`];
        if (typeof tTypeVal === "string")
            _dataQRY_KSV_STOCK_IN1[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_STOCK_IN1[`${name}`] = parseInt(val);

        setDataQRY_KSV_STOCK_IN1(_dataQRY_KSV_STOCK_IN1);
    };

    const onInputChangeQRY_KSV_STOCK_IN1_INQTY_SEL = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_STOCK_IN1 = { ...dataQRY_KSV_STOCK_IN1 };

        let tTypeVal = _dataQRY_KSV_STOCK_IN1[`${name}`];
        if (typeof tTypeVal === "string")
            _dataQRY_KSV_STOCK_IN1[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_STOCK_IN1[`${name}`] = parseInt(val);

        setDataQRY_KSV_STOCK_IN1(_dataQRY_KSV_STOCK_IN1);
    };

    const onCheckboxChangeQRY_KSV_STOCK_IN1_IS_M_PO = (e, name) => {
        let val = "";
        let _dataQRY_KSV_STOCK_IN1 = { ...dataQRY_KSV_STOCK_IN1 };
        if (e.checked) {
            val = "1";
        } else {
            val = "0";
        }
        _dataQRY_KSV_STOCK_IN1[`${name}`] = val;
        setDataQRY_KSV_STOCK_IN1(_dataQRY_KSV_STOCK_IN1);
    };

    const onCheckboxChangeQRY_KSV_STOCK_IN1_IS_INPUT_END = (e, name) => {
        let val = "";
        let _dataQRY_KSV_STOCK_IN1 = { ...dataQRY_KSV_STOCK_IN1 };
        if (e.checked) {
            val = "1";
        } else {
            val = "0";
        }
        _dataQRY_KSV_STOCK_IN1[`${name}`] = val;
        setDataQRY_KSV_STOCK_IN1(_dataQRY_KSV_STOCK_IN1);
    };

    const onCalChangeQRY_KSV_STOCK_IN1_PAY_DATE = (e, name) => {
        let val1 = e.value || "";
        let val = "";
        if (val1 === "") {
            val = "";
        } else {
            val = getDateVal(val1);
        }

        let _dataQRY_KSV_STOCK_IN1 = { ...dataQRY_KSV_STOCK_IN1 };
        _dataQRY_KSV_STOCK_IN1[`${name}`] = val;
        setDataQRY_KSV_STOCK_IN1(_dataQRY_KSV_STOCK_IN1);
    };

    const onCalChangeQRY_KSV_STOCK_IN1_IN_DATE = (e, name) => {
        let val1 = e.value || "";
        let val = "";
        if (val1 === "") {
            val = "";
        } else {
            val = getDateVal(val1);
        }

        let _dataQRY_KSV_STOCK_IN1 = { ...dataQRY_KSV_STOCK_IN1 };
        _dataQRY_KSV_STOCK_IN1[`${name}`] = val;
        setDataQRY_KSV_STOCK_IN1(_dataQRY_KSV_STOCK_IN1);
    };

    /**TABLE KCD_VENDOR */
    // DEFINE DATAGRID : TBL_KCD_VENDOR
    const [datasTBL_KCD_VENDOR, setDatasTBL_KCD_VENDOR] = useState([]);
    const dt_TBL_KCD_VENDOR = useRef(null);
    const [dataTBL_KCD_VENDOR, setDataTBL_KCD_VENDOR] =
        useState(emptyTBL_KCD_VENDOR);
    const [selectedTBL_KCD_VENDOR, setSelectedTBL_KCD_VENDOR] = useState([]);
    const [flagSelectModeTBL_KCD_VENDOR, setFlagSelectModeTBL_KCD_VENDOR] =
        useState(false);

    // DATAGRID CODE : TBL_KCD_VENDOR

    const onRowClick1TBL_KCD_VENDOR = (argData0) => {
        var argData = {};

        if (typeof argData0.length !== "undefined") {
            argData = argData0[0];
        } else {
            argData = argData0;
        }

        let argTBL_KCD_VENDOR = argData;

        setDataTBL_KCD_VENDOR(argTBL_KCD_VENDOR);

        var tObj0 = {};
        tObj0.PO_CD_ARRAY = datasTBL_KSV_PO_MST1.map((col, i) => {
            var tObj = { ...col };
            return tObj.PO_CD;
        });
        tObj0.VENDOR_CD = argData.VENDOR_CD;

        serviceS0406_STSIN_RECORD.mgrQuery_STOCK_IN_PRE(tObj0).then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                console.log("mgrQuery_STOCK_IN_PRE call => " + data.length);
                setDatasTBL_KSV_PO_MRP(data);
            } else {
                console.log(
                    "mgrQuery_STOCK_IN_PRE error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });

        var tObj1 = {};
        tObj1.PO_CD_ARRAY = datasTBL_KSV_PO_MST1.map((col, i) => {
            var tObj = { ...col };
            return tObj.PO_CD;
        });
        tObj1.VENDOR_CD = argData.VENDOR_CD;
        tObj1.MATL_CD = "";
        serviceS0406_STSIN_RECORD.mgrQuery_STOCK_IN_WORK(tObj1).then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                console.log("mgrQuery_STOCK_IN_WORK call => " + data.length);
                var tSumQty = 0;
                var tSumRemain = 0;
                var tArray = data.map((col, i) => {
                    var tObj = { ...col };
                    tObj.id = i + 1;
                    tObj.IN_QTY = tObj.REMAIN_QTY;
                    tObj.TOT_QTY = tObj.REMAIN_QTY;
                    tSumQty += parseInt(tObj.IN_QTY);
                    tSumRemain += parseInt(tObj.IN_QTY);
                    return tObj;
                });
                var _tObj = { ...dataQRY_KSV_STOCK_IN1 };
                _tObj.T_INQTY = tSumQty;
                _tObj.REMAIN_SUM = tSumRemain;
                setDataQRY_KSV_STOCK_IN1(_tObj);

                setDatasTBL_KSV_PO_MRP1(tArray);
            } else {
                console.log(
                    "mgrQuery_STOCK_IN_WORK error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });
    };

    const onRowClickTBL_KCD_VENDOR = (event) => {
        let argTBL_KCD_VENDOR = event.data;
        if (flagSelectModeTBL_KCD_VENDOR) return;

        // Service : NawooAll:mgrQueryTBL_KCD_VENDOR
    };

    /**TABLE KSV_PO_MRP */

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

    const onCellEditCompleteKSV_PO_MRP1 = (e) => {
        let { rowData, newValue, field, originalEvent: event } = e;
        var _dataTBL_KSV_PO_MRP1 = { ...dataTBL_KSV_PO_MRP1 };
        rowData[field] = newValue;
    };

    const cellEditorKSV_PO_MRP1 = (options) => {
        return textEditor(options);
    };

    const textEditor = (options) => {
        return (
            <InputText
                type="text"
                value={options.value}
                onChange={(e) => options.editorCallback(e.target.value)}
            />
        );
    };

    const onRowClick1TBL_KSV_PO_MRP1 = (argData0) => {
        var argData = {};

        if (typeof argData0.length !== "undefined") {
            argData = argData0[0];
        } else {
            argData = argData0;
        }

        let argTBL_KSV_PO_MRP1 = argData;

        setDataTBL_KSV_PO_MRP1(argTBL_KSV_PO_MRP1);
    };

    const onRowClickTBL_KSV_PO_MRP1 = (event) => {
        let argTBL_KSV_PO_MRP1 = event.data;
        if (flagSelectModeTBL_KSV_PO_MRP1) return;

        // Service : NawooAll:mgrQueryTBL_KSV_PO_MRP1
    };

    /**TABLE KSV_PO_MST */
    // DEFINE DATAGRID : TBL_KSV_PO_MST
    const [datasTBL_KSV_PO_MST, setDatasTBL_KSV_PO_MST] = useState([]);
    const dt_TBL_KSV_PO_MST = useRef(null);
    const [dataTBL_KSV_PO_MST, setDataTBL_KSV_PO_MST] =
        useState(emptyTBL_KSV_PO_MST);
    const [selectedTBL_KSV_PO_MST, setSelectedTBL_KSV_PO_MST] = useState([]);
    const [flagSelectModeTBL_KSV_PO_MST, setFlagSelectModeTBL_KSV_PO_MST] =
        useState(false);

    // DATAGRID CODE : TBL_KSV_PO_MST

    const onRowClick1TBL_KSV_PO_MST = (argData0) => {
        var argData = {};

        if (typeof argData0.length !== "undefined") {
            argData = argData0[0];
        } else {
            argData = argData0;
        }

        let argTBL_KSV_PO_MST = argData;

        setDataTBL_KSV_PO_MST(argTBL_KSV_PO_MST);

        var _tObjs = datasTBL_KSV_PO_MST1.filter((col, i) => {
            var tObj = { ...col };
            var tFlag = 0;
            if (tObj.PO_CD === argData.PO_CD) return tObj;
        });

        if (_tObjs.length > 0) {
        } else {
            var tArray1 = [...datasTBL_KSV_PO_MST1];
            tArray1.push(argData);
            setDatasTBL_KSV_PO_MST1(tArray1);

            var tObj0 = {};
            tObj0.PO_CD_ARRAY = tArray1.map((col, i) => {
                var tObj = { ...col };
                return tObj.PO_CD;
            });

            serviceS0406_STSIN_RECORD.mgrQuery_VENDOR_CD(tObj0).then((data) => {
                if (typeof data.graphQLErrors === "undefined") {
                    console.log("mgrQuery_PO_CD call => " + data.length);
                    setDatasTBL_KCD_VENDOR(data);
                    setDatasTBL_KSV_PO_MRP([]);
                    setDatasTBL_KSV_PO_MRP1([]);
                } else {
                    console.log(
                        "mgrQuery_PO_CD error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });
        }
    };

    const onRowClickTBL_KSV_PO_MST = (event) => {
        let argTBL_KSV_PO_MST = event.data;
        if (flagSelectModeTBL_KSV_PO_MST) return;

        // Service : NawooAll:mgrQueryTBL_KSV_PO_MST
    };

    /**TABLE KSV_PO_MST1 */

    // DEFINE DATAGRID : TBL_KSV_PO_MST1
    const [datasTBL_KSV_PO_MST1, setDatasTBL_KSV_PO_MST1] = useState([]);
    const dt_TBL_KSV_PO_MST1 = useRef(null);
    const [dataTBL_KSV_PO_MST1, setDataTBL_KSV_PO_MST1] =
        useState(emptyTBL_KSV_PO_MST1);
    const [selectedTBL_KSV_PO_MST1, setSelectedTBL_KSV_PO_MST1] = useState([]);
    const [flagSelectModeTBL_KSV_PO_MST1, setFlagSelectModeTBL_KSV_PO_MST1] =
        useState(false);

    // DATAGRID CODE : TBL_KSV_PO_MST1

    const onRowClick1TBL_KSV_PO_MST1 = (argData0) => {
        var argData = {};

        if (typeof argData0.length !== "undefined") {
            argData = argData0[0];
        } else {
            argData = argData0;
        }

        let argTBL_KSV_PO_MST1 = argData;

        setDataTBL_KSV_PO_MST1(argTBL_KSV_PO_MST1);

        var _tObjs = datasTBL_KSV_PO_MST1.filter((col, i) => {
            var tObj = { ...col };
            var tFlag = 0;
            if (tObj.PO_CD !== argData.PO_CD) return tObj;
        });

        var tArray1 = [..._tObjs];
        setDatasTBL_KSV_PO_MST1(tArray1);

        var tObj0 = {};
        tObj0.PO_CD_ARRAY = tArray1.map((col, i) => {
            var tObj = { ...col };
            return tObj.PO_CD;
        });

        serviceS0406_STSIN_RECORD.mgrQuery_VENDOR_CD(tObj0).then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                console.log("mgrQuery_PO_CD call => " + data.length);
                setDatasTBL_KCD_VENDOR(data);
                setDatasTBL_KSV_PO_MRP([]);
                setDatasTBL_KSV_PO_MRP1([]);
            } else {
                console.log(
                    "mgrQuery_PO_CD error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });
    };

    const onRowClickTBL_KSV_PO_MST1 = (event) => {
        let argTBL_KSV_PO_MST1 = event.data;
        if (flagSelectModeTBL_KSV_PO_MST1) return;

        // Service : NawooAll:mgrQueryTBL_KSV_PO_MST1
    };

    const searchTBL_KSV_PO_MST1 = () => {
        clearSelectedTBL_KSV_PO_MST1();

        // serviceS0406_STSIN_RECORD.mgrQueryTBL_KSV_PO_MST1(dataQRY_KSV_PO_MST1).then(data => {
        //     if (typeof data.graphQLErrors === 'undefined') {
        //         console.log("ServiceNawooAll.mgrQueryTBL_KSV_PO_MST1() call => " + data.length);
        //         setDatasTBL_KSV_PO_MST1(data);
        //     } else {
        //         // var tStr = data.graphQLErrors[0].message;
        //         console.log("ServiceNawooAll.mgrQueryTBL_KSV_PO_MST1()error => " + JSON.stringify(data.graphQLErrors));
        //
        //     }
        // });

        // Service : NawooAll:mgrQueryTBL_KSV_PO_MST1
    };

    const clearSelectedTBL_KSV_PO_MST1 = () => {
        setSelectedTBL_KSV_PO_MST1([]);
        setFlagSelectModeTBL_KSV_PO_MST1(false);
    };

    const exportExcelTBL_KSV_PO_MST1 = () => {};

    useEffect(() => {
        var tObj = { ...emptyQRY_KSV_STOCK_IN };

        serviceS0406_STSIN_RECORD.mgrQuery_PO_CD(tObj).then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                console.log("mgrQuery_PO_CD call => " + data.length);
                setDatasTBL_KSV_PO_MST(data);
                setDatasTBL_KSV_PO_MST1([]);
            } else {
                console.log(
                    "mgrQuery_PO_CD error => " +
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
        <div style={{ width: "100rem" }}>
            <div style={{ width: "20rem", float: "left", height: "4rem" }}>
                <div
                    style={{
                        marginLeft: "1rem",
                        marginTop: "1rem",
                        width: "19rem",
                        height: "4rem",
                    }}
                >
                    <span
                        style={{
                            marginLeft: "0.5rem",
                            height: "2rem",
                            display: "inline-block",
                            width: "9rem",
                        }}
                    >
                        <InputText
                            style={{
                                marginLeft: "0.5rem",
                                display: "inline-block",
                                width: "9rem",
                            }}
                            id="id_PO_CD"
                            value={dataQRY_KSV_STOCK_IN.PO_CD}
                            onChange={(e) =>
                                onInputChangeQRY_KSV_STOCK_IN_PO_CD(e, "PO_CD")
                            }
                        />
                    </span>
                    <span style={{ display: "inline-block", width: "8rem" }}>
                        <div
                            style={{
                                marginLeft: "0.5rem",
                                display: "inline-block",
                                width: "8rem",
                            }}
                        >
                            <Button
                                label={
                                    <span>
                                        Search(<u>S</u>)
                                    </span>
                                }
                                style={{ height: "1.1rem" }}
                                className="p-button-text"
                                onClick={searchPO_CD}
                            />
                        </div>
                    </span>
                    <span
                        style={{
                            marginLeft: "0.5rem",
                            height: "2rem",
                            display: "inline-block",
                            width: "18rem",
                            marginTop: "0.5rem",
                        }}
                    >
                        <InputText
                            style={{
                                marginLeft: "0.5rem",
                                display: "inline-block",
                                width: "13rem",
                            }}
                            id="id_VENDOR_TYPE"
                            value={dataQRY_KSV_STOCK_IN.VENDOR_TYPE}
                            onChange={(e) =>
                                onInputChangeQRY_KSV_STOCK_IN_VENDOR_TYPE(
                                    e,
                                    "VENDOR_TYPE",
                                )
                            }
                        />
                    </span>
                </div>
                <div
                    style={{
                        marginLeft: "1rem",
                        marginTop: "1rem",
                        width: "18rem",
                        height: "22rem",
                    }}
                >
                    <AFDataTable preventUnrelatedRerender
                        ref={dt_TBL_KSV_PO_MST}
                        size="small"
                        value={datasTBL_KSV_PO_MST}
                        resizableColumns
                        columnResizeMode="fit"
                        showGridlines
                        selectionMode="checkbox"
                        selection={selectedTBL_KSV_PO_MST}
                        onSelectionChange={(e) => {
                            setFlagSelectModeTBL_KSV_PO_MST(true);
                            setSelectedTBL_KSV_PO_MST(e.value);
                            console.log(
                                "selected length:" +
                                    selectedTBL_KSV_PO_MST.length,
                            );
                            onRowClick1TBL_KSV_PO_MST(e.value);
                        }}
                        onRowClick={onRowClickTBL_KSV_PO_MST}
                        dataKey="PO_CD"
                        className="datatable-responsive"
                        virtualScrollerOptions={{ itemSize: 9 }}
                        emptyMessage=" " //header={headerTBL_KSV_PO_MST}
                        responsiveLayout="scroll"
                        scrollable
                        scrollHeight="18rem"
                    >
                        <AFColumn field="PO_CD" headerClassName="t-header" header="Pp No" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    </AFDataTable>
                </div>

                <div
                    style={{
                        marginLeft: "1rem",
                        marginTop: "1rem",
                        width: "18rem",
                        height: "22rem",
                    }}
                >
                    <AFDataTable preventUnrelatedRerender
                        ref={dt_TBL_KSV_PO_MST1}
                        size="small"
                        value={datasTBL_KSV_PO_MST1}
                        resizableColumns
                        columnResizeMode="fit"
                        showGridlines
                        selectionMode="checkbox"
                        selection={selectedTBL_KSV_PO_MST1}
                        onSelectionChange={(e) => {
                            setFlagSelectModeTBL_KSV_PO_MST1(true);
                            setSelectedTBL_KSV_PO_MST1(e.value);
                            console.log(
                                "selected length:" +
                                    selectedTBL_KSV_PO_MST1.length,
                            );
                            onRowClick1TBL_KSV_PO_MST1(e.value);
                        }}
                        onRowClick={onRowClickTBL_KSV_PO_MST1}
                        dataKey="PO_CD"
                        className="datatable-responsive"
                        virtualScrollerOptions={{ itemSize: 9 }}
                        emptyMessage=" " //header={headerTBL_KSV_PO_MST1}
                        responsiveLayout="scroll"
                        scrollable
                        scrollHeight="18rem"
                    >
                        <AFColumn field="PO_CD" headerClassName="t-header" header="Pp No" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    </AFDataTable>
                </div>

                <div
                    style={{
                        marginLeft: "1rem",
                        marginTop: "1rem",
                        width: "18rem",
                        height: "22rem",
                    }}
                >
                    <AFDataTable preventUnrelatedRerender
                        ref={dt_TBL_KCD_VENDOR}
                        size="small"
                        value={datasTBL_KCD_VENDOR}
                        resizableColumns
                        columnResizeMode="fit"
                        showGridlines
                        selectionMode="checkbox"
                        selection={selectedTBL_KCD_VENDOR}
                        onSelectionChange={(e) => {
                            setFlagSelectModeTBL_KCD_VENDOR(true);
                            setSelectedTBL_KCD_VENDOR(e.value);
                            console.log(
                                "selected length:" +
                                    selectedTBL_KCD_VENDOR.length,
                            );
                            onRowClick1TBL_KCD_VENDOR(e.value);
                        }}
                        onRowClick={onRowClickTBL_KCD_VENDOR}
                        dataKey="VENDOR_CD"
                        className="datatable-responsive"
                        virtualScrollerOptions={{ itemSize: 9 }}
                        emptyMessage=" " //header={headerTBL_KCD_VENDOR}
                        responsiveLayout="scroll"
                        scrollable
                        scrollHeight="18rem"
                    >
                        <AFColumn field="VENDOR_CD" headerClassName="t-header" header="Supplier" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                        <AFColumn field="VENDOR_NAME" headerClassName="t-header" header="Supplier1" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    </AFDataTable>
                </div>
            </div>

            <Divider
                layout="vertical"
                style={{
                    float: "left",
                    height: "70.5rem",
                    marginLeft: "1.5rem",
                }}
            />

            <div style={{ width: "75rem", float: "left" }}>
                <div
                    style={{
                        marginLeft: "1rem",
                        marginTop: "1rem",
                        width: "74rem",
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
                                "selected length:" +
                                    selectedTBL_KSV_PO_MRP.length,
                            );
                            onRowClick1TBL_KSV_PO_MRP(e.value);
                        }}
                        onRowClick={onRowClickTBL_KSV_PO_MRP}
                        dataKey="MATL_CD"
                        className="datatable-responsive"
                        virtualScrollerOptions={{ itemSize: 14 }}
                        emptyMessage=" " //header={headerTBL_KSV_PO_MRP}
                        responsiveLayout="scroll"
                        scrollable
                        scrollHeight="28rem"
                    >
                        <AFColumn field="MATL_NAME" headerClassName="t-header" header="Description" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                        <AFColumn field="COLOR" headerClassName="t-header" header="Color" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                        <AFColumn field="SPEC" headerClassName="t-header" header="Spec" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                        <AFColumn field="UNIT" headerClassName="t-header" header="Unit" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                        <AFColumn field="MATL_PRICE" headerClassName="t-header" header="M Price" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                        <AFColumn field="PO_QTY" headerClassName="t-header" header="Po Qty" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                        <AFColumn field="IN_QTY" headerClassName="t-header" header="In Qty" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                        <AFColumn field="MATL_CD" headerClassName="t-header" header="Matl Cd" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                        <AFColumn field="P_STATUS" headerClassName="t-header" header="P Status" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                        <AFColumn field="CONF_FLAG" headerClassName="t-header" header="st" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                        <AFColumn field="CURR_CD" headerClassName="t-header" header="curr cd" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                        <AFColumn field="TEMP_PRICE" headerClassName="t-header" header="temp price" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    </AFDataTable>
                </div>

                <div
                    style={{
                        width: "74rem",
                        height: "8rem",
                        marginTop: "1rem",
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
                        <p style={{ width: "8rem", display: "inline-block" }}>Description</p>
                        <InputText
                            style={{
                                marginLeft: "0.5rem",
                                display: "inline-block",
                                width: "13rem",
                            }}
                            id="id_MATL_NAME"
                            value={dataQRY_KSV_STOCK_IN1.MATL_NAME}
                            onChange={(e) =>
                                onInputChangeQRY_KSV_STOCK_IN1_MATL_NAME(
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
                            width: "23rem",
                        }}
                    >
                        <p style={{ width: "8rem", display: "inline-block" }}>Color</p>
                        <InputText
                            style={{
                                marginLeft: "0.5rem",
                                display: "inline-block",
                                width: "13rem",
                            }}
                            id="id_COLOR"
                            value={dataQRY_KSV_STOCK_IN1.COLOR}
                            onChange={(e) =>
                                onInputChangeQRY_KSV_STOCK_IN1_COLOR(e, "COLOR")
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
                        <p style={{ width: "8rem", display: "inline-block" }}>Spec</p>
                        <InputText
                            style={{
                                marginLeft: "0.5rem",
                                display: "inline-block",
                                width: "13rem",
                            }}
                            id="id_SPEC"
                            value={dataQRY_KSV_STOCK_IN1.SPEC}
                            onChange={(e) =>
                                onInputChangeQRY_KSV_STOCK_IN1_SPEC(e, "SPEC")
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
                        <p style={{ width: "8rem", display: "inline-block" }}>Remain Sum</p>
                        <InputText
                            style={{
                                marginLeft: "0.5rem",
                                display: "inline-block",
                                width: "8rem",
                            }}
                            id="id_REMAIN_SUM"
                            value={dataQRY_KSV_STOCK_IN1.REMAIN_SUM}
                            onChange={(e) =>
                                onInputChangeQRY_KSV_STOCK_IN1_REMAIN_SUM(
                                    e,
                                    "REMAIN_SUM",
                                )
                            }
                            disabled
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
                        <p style={{ width: "8rem", display: "inline-block" }}>Total InQty</p>
                        <InputText
                            style={{
                                marginLeft: "0.5rem",
                                display: "inline-block",
                                width: "13rem",
                            }}
                            id="id_T_INQTY"
                            value={dataQRY_KSV_STOCK_IN1.T_INQTY}
                            onChange={(e) =>
                                onInputChangeQRY_KSV_STOCK_IN1_T_INQTY(
                                    e,
                                    "T_INQTY",
                                )
                            }
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
                        <p style={{ width: "8rem", display: "inline-block" }}>Minimun PO</p>
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
                                id="id_IS_M_PO"
                                checked={changeCheckBoxVal(
                                    dataQRY_KSV_STOCK_IN1.IS_M_PO,
                                )}
                                onChange={(e) =>
                                    onCheckboxChangeQRY_KSV_STOCK_IN1_IS_M_PO(
                                        e,
                                        "IS_M_PO",
                                    )
                                }
                            />
                        </div>
                    </span>
                    <span style={{ display: "inline-block" }}>
                        <Button
                            label="Distribute"
                            style={{ height: "1.1rem", marginLeft: "1rem" }}
                            className="p-button-text"
                            onClick={searchTBL_KSV_PO_MST1}
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
                        <p style={{ width: "8rem", display: "inline-block" }}>Include InputEnd</p>
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
                                id="id_IS_INPUT_END"
                                checked={changeCheckBoxVal(
                                    dataQRY_KSV_STOCK_IN1.IS_INPUT_END,
                                )}
                                onChange={(e) =>
                                    onCheckboxChangeQRY_KSV_STOCK_IN1_IS_INPUT_END(
                                        e,
                                        "IS_INPUT_END",
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
                            width: "23rem",
                        }}
                    >
                        <p style={{ width: "8rem", display: "inline-block" }}>Pay Date</p>
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
                                id="id_PAY_DATE"
                                value={changeDateVal(
                                    dataQRY_KSV_STOCK_IN1.PAY_DATE,
                                )}
                                onChange={(e) =>
                                    onCalChangeQRY_KSV_STOCK_IN1_PAY_DATE(
                                        e,
                                        "PAY_DATE",
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
                                id="id_IN_DATE"
                                value={changeDateVal(
                                    dataQRY_KSV_STOCK_IN1.IN_DATE,
                                )}
                                onChange={(e) =>
                                    onCalChangeQRY_KSV_STOCK_IN1_IN_DATE(
                                        e,
                                        "IN_DATE",
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
                            width: "22rem",
                        }}
                    >
                        <p style={{ width: "8rem", display: "inline-block" }}>InQty Sel</p>
                        <InputText
                            style={{
                                marginLeft: "0.5rem",
                                display: "inline-block",
                                width: "13rem",
                            }}
                            id="id_INQTY_SEL"
                            value={dataQRY_KSV_STOCK_IN1.INQTY_SEL}
                            onChange={(e) =>
                                onInputChangeQRY_KSV_STOCK_IN1_INQTY_SEL(
                                    e,
                                    "INQTY_SEL",
                                )
                            }
                            disabled
                        />
                    </span>
                    <span style={{ display: "inline-block" }}>
                        <Button
                            label="Input"
                            style={{ height: "1.1rem" }}
                            className="p-button-text"
                            onClick={processStockIn}
                        />

                        <Button
                            label="Set InQty Auto"
                            style={{ height: "1.1rem" }}
                            className="p-button-text"
                            onClick={searchTBL_KSV_PO_MST1}
                        />
                    </span>
                    <span
                        style={{ marginLeft: "12rem", display: "inline-block" }}
                    >
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
                            onClick={searchTBL_KSV_PO_MST1}
                        />

                        <Button
                            label="Reset"
                            style={{ height: "1.1rem" }}
                            icon="pi pi-check"
                            className="p-button-text"
                            onClick={searchTBL_KSV_PO_MST1}
                        />

                        <Button
                            label="Excel"
                            style={{ height: "1.1rem", color: "green" }}
                            icon="pi pi-upload"
                            className="p-button-text"
                            onClick={exportExcelTBL_KSV_PO_MST1}
                        />
                    </span>
                </div>

                <div
                    style={{
                        marginLeft: "1rem",
                        marginTop: "1rem",
                        width: "74rem",
                        height: "26rem",
                    }}
                >
                    <AFDataTable preventUnrelatedRerender
                        ref={dt_TBL_KSV_PO_MRP1}
                        size="small"
                        value={datasTBL_KSV_PO_MRP1}
                        resizableColumns
                        columnResizeMode="fit"
                        showGridlines
                        selectionMode="checkbox"
                        selection={selectedTBL_KSV_PO_MRP1}
                        onSelectionChange={(e) => {
                            setFlagSelectModeTBL_KSV_PO_MRP1(true);
                            setSelectedTBL_KSV_PO_MRP1(e.value);
                            console.log(
                                "selected length:" +
                                    selectedTBL_KSV_PO_MRP1.length,
                            );
                            onRowClick1TBL_KSV_PO_MRP1(e.value);
                        }}
                        onRowClick={onRowClickTBL_KSV_PO_MRP1}
                        dataKey="id"
                        className="datatable-responsive"
                        virtualScrollerOptions={{ itemSize: 12 }}
                        emptyMessage=" " //header={headerTBL_KSV_PO_MRP1}
                        responsiveLayout="scroll"
                        scrollable
                        scrollHeight="24rem"
                    >
                        <AFColumn field="PO_CD" headerClassName="t-header" header="Po No" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                        <AFColumn field="ORDER_CD" headerClassName="t-header" header="Order" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                        <AFColumn field="VENDOR_NAME" headerClassName="t-header" header="Supplier" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                        <AFColumn field="VENDOR_CD" headerClassName="t-header" header="Supplier Cd" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                        <AFColumn field="MATL_NAME" headerClassName="t-header" header="Description" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                        <AFColumn field="COLOR" headerClassName="t-header" header="Color" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                        <AFColumn field="SPEC" headerClassName="t-header" header="Spec" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                        <AFColumn field="UNIT" headerClassName="t-header" header="Unit" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                        <AFColumn field="MATL_PRICE" headerClassName="t-header" header="M Price" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                        <AFColumn field="PO_QTY" headerClassName="t-header" header="Po Qty" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                        <AFColumn field="BEF_IN_QTY" headerClassName="t-header" header="In Qty(Bef)" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                        <AFColumn field="IN_QTY" headerClassName="t-header" header="In Qty" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} editor={(options) => cellEditorKSV_PO_MRP1(options)} onCellEditComplete={onCellEditCompleteKSV_PO_MRP1} ></AFColumn>
                        <AFColumn field="TOT_QTY" headerClassName="t-header" header="Total" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                        <AFColumn field="PO_CD_CNT" headerClassName="t-header" header="IN" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                        <AFColumn field="MIN_FLAG" headerClassName="t-header" header="Min" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                        <AFColumn field="MATL_CD" headerClassName="t-header" header="Matl Cd" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                        <AFColumn field="LC_QTY" headerClassName="t-header" header="LC Qty" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                        <AFColumn field="BILL_TYPE" headerClassName="t-header" header="Bill type" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                        <AFColumn field="PO_SEQ" headerClassName="t-header" header="PO Seq" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                        <AFColumn field="MRP_SEQ" headerClassName="t-header" header="Mrp Seq" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                        <AFColumn field="VENDOR_CD" headerClassName="t-header" header="Vendor" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                        <AFColumn field="VENDOR_TYPE" headerClassName="t-header" header="Vendor.T" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                        <AFColumn field="REMAIN_QTY" headerClassName="t-header" header="Remain Qty" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                        <AFColumn field="TEMP_PRICE" headerClassName="t-header" header="Temp Price" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                        <AFColumn field="MIN_CONF_USER" headerClassName="t-header" header="Min Conf User" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                        <AFColumn field="MIN_CONF_DATETIME" headerClassName="t-header" header="Min Conf Date" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                        <AFColumn field="MIN_STOCK_IDX" headerClassName="t-header" header="Min Stock Idx" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    </AFDataTable>
                </div>

                <Divider />

                <div
                    style={{
                        width: "76rem",
                        height: "2rem",
                        marginLeft: "42rem",
                    }}
                >
                    <div className="formgrid grid">
                        <div className="field col-6 md:col-6">
                            <Button
                                style={{
                                    display: "inline-block",
                                    width: "13rem",
                                }}
                                label="PO(Extra Charge)"
                                className="p-button-text"
                                onClick={blankFn}
                            />

                            <Button
                                style={{
                                    display: "inline-block",
                                    width: "10rem",
                                }}
                                label="PO(Freight)"
                                className="p-button-text"
                                onClick={blankFn}
                            />

                            <Button
                                style={{
                                    display: "inline-block",
                                    width: "10rem",
                                }}
                                label="Reset(All)"
                                className="p-button-text"
                                onClick={blankFn}
                            />
                        </div>
                    </div>
                </div>

                <Divider />
            </div>

            <Toast ref={toast} />
        </div>
    );
};

const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(S0406_STSIN_RECORD, comparisonFn);
