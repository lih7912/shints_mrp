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
import { ServiceS051201_STOCK_QTY_UPDATE_LOG } from "../service/service_biz/ServiceS051201_STOCK_QTY_UPDATE_LOG";

import "./page_common.scss";

const emptyKCD_CODE = {
    id: 0,
    CD_GROUP: "",
    CD_CODE: "",
    CD_NAME: "",
    CD_FLAG: "",
};

const emptyTBL_KSV_STOCK_MATL = {
    id: 0,
    IDX: "",
    ORG_IDX: "",
    PO_CD: "",
    ORDER_CD: "",
    MATL_CD: "",
    STOCK_DATE: "",
    REG_DATE: "",
    STOCK_STATUS: "",
    STOCK_QTY: "",
    REMAIN_QTY: "",
    USE_QTY: "",
    OUT_QTY: "",
    REG_USER: "",
    REMARK: "",
    USE_PO_CD: "",
    USE_PO_SEQ: "",
    USE_ORDER_CD: "",
    USE_QTY: "",
    USE_DATE: "",
};

const emptyEDT_KSV_STOCK_MATL1 = {
    MATL_CD: "",
    STYLE_CD: "",
    VENDOR_NAME: "",
    MATL_NAME: "",
    COLOR: "",
    SPEC: "",
    UNIT: "",
    BUYER_CD: "",
    PO_CD: "",
    ORDER_CD: "",
    STOCK_QTY: "",
    REMAIN_QTY: "",
    USE_QTY: "",
    OUT_QTY: "",
};

const S051201_STOCK_QTY_UPDATE_LOG = () => {
    const serviceLibRef = useRef(null);
    if (!serviceLibRef.current) {
        serviceLibRef.current = new ServiceLib();
        serviceLibRef.current.loginConfirm();
    }
    const serviceLib = serviceLibRef.current;
    const serviceS051201_STOCK_QTY_UPDATE_LOG =
        new ServiceS051201_STOCK_QTY_UPDATE_LOG();

    const toast = useRef(null);

    /* splitter 관련 */
    const [styleVal, setStyleVal] = useState({ width: "65vw" });

    const search_LIST_1 = (argStockIdx) => {
        var tSrcData = { ...JSON.parse(localStorage.getItem("S0512_DATA")) };

        var _tData = {};
        _tData.ROOT_IDX = argStockIdx;
        // _tData.ROOT_IDX = tSrcData.ROOT_IDX;
        // _tData.ROOT_IDX = 'S000833744';

        serviceS051201_STOCK_QTY_UPDATE_LOG
            .mgrQuery_LIST_1(_tData)
            .then((data) => {
                if (typeof data.graphQLErrors === "undefined") {
                    console.log(
                        "ServiceMgrKCD_BUYER.mgr1KcdStyle call => " +
                            data.DATA.length,
                    );
                    var tArray2 = data.DATA.map((col, i) => {
                        var tObj = { ...col };
                        tObj.id = i + 1;
                        return tObj;
                    });
                    setDatasTBL_KSV_STOCK_MATL(tArray2);

                    if (data.SUM_INFO.length > 0) {
                        var _tObj = { ...dataEDT_KSV_STOCK_MATL1 };
                        _tObj.STOCK_QTY = data.SUM_INFO[0].SUM_STOCK_QTY;
                        _tObj.REMAIN_QTY = data.SUM_INFO[0].SUM_REMAIN_QTY;
                        _tObj.USE_QTY = data.SUM_INFO[0].SUM_USE_QTY;
                        _tObj.OUT_QTY = data.SUM_INFO[0].SUM_OUT_QTY;
                        _tObj.STYLE_CD = tSrcData.ROOT_IDX;
                        setDataEDT_KSV_STOCK_MATL1(_tObj);
                    }
                } else {
                    console.log(
                        "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });
    };

    /* TABLE KSV_STOCK_MATL */

    // DEFINE DATAGRID : TBL_KSV_STOCK_MATL
    const [datasTBL_KSV_STOCK_MATL, setDatasTBL_KSV_STOCK_MATL] = useState([]);
    const dt_TBL_KSV_STOCK_MATL = useRef(null);
    const [dataTBL_KSV_STOCK_MATL, setDataTBL_KSV_STOCK_MATL] = useState(
        emptyTBL_KSV_STOCK_MATL,
    );
    const [selectedTBL_KSV_STOCK_MATL, setSelectedTBL_KSV_STOCK_MATL] =
        useState([]);
    const [
        flagSelectModeTBL_KSV_STOCK_MATL,
        setFlagSelectModeTBL_KSV_STOCK_MATL,
    ] = useState(false);

    // DATAGRID CODE : TBL_KSV_STOCK_MATL

    const onRowClick1TBL_KSV_STOCK_MATL = (argData0) => {
        var argData = {};

        if (typeof argData0.length !== "undefined") {
            argData = argData0[0];
        } else {
            argData = argData0;
        }

        let argTBL_KSV_STOCK_MATL = argData;

        setDataTBL_KSV_STOCK_MATL(argTBL_KSV_STOCK_MATL);

        var _tData = { ...dataEDT_KSV_STOCK_MATL1 };
        _tData.MATL_CD = argData.MATL_CD;
        _tData.MATL_NAME = argData.MATL_NAME;
        _tData.COLOR = argData.COLOR;
        _tData.SPEC = argData.SPEC;
        _tData.UNIT = argData.UNIT;
        _tData.BUYER_CD = argData.ORDER_CD.substring(0, 2);
        _tData.PO_CD = argData.PO_CD;
        _tData.ORDER_CD = argData.ORDER_CD;
        setDataEDT_KSV_STOCK_MATL1(_tData);

        editEDT_KSV_STOCK_MATL1_BUYER_CD(_tData.BUYER_CD);
        editEDT_KSV_STOCK_MATL1_PO_CD(_tData.PO_CD);
        editEDT_KSV_STOCK_MATL1_ORDER_CD(_tData.ORDER_CD);
    };

    const onRowClickTBL_KSV_STOCK_MATL = (event) => {
        let argTBL_KSV_STOCK_MATL = event.data;
        if (flagSelectModeTBL_KSV_STOCK_MATL) return;

        // Service : NawooAll:mgrQueryTBL_KSV_STOCK_MATL
    };

    /*EDIT KSV_STOCK_MATL1 */
    const [datasEDT_KSV_STOCK_MATL1, setDatasEDT_KSV_STOCK_MATL1] = useState(
        [],
    );
    const [dataEDT_KSV_STOCK_MATL1, setDataEDT_KSV_STOCK_MATL1] = useState(
        emptyEDT_KSV_STOCK_MATL1,
    );

    const onInputChangeEDT_KSV_STOCK_MATL1_MATL_CD = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_STOCK_MATL1 = { ...dataEDT_KSV_STOCK_MATL1 };

        let tTypeVal = _dataEDT_KSV_STOCK_MATL1[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_STOCK_MATL1[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_STOCK_MATL1[`${name}`] = parseInt(val);

        setDataEDT_KSV_STOCK_MATL1(_dataEDT_KSV_STOCK_MATL1);
    };

    const onInputChangeEDT_KSV_STOCK_MATL1_STYLE_CD = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_STOCK_MATL1 = { ...dataEDT_KSV_STOCK_MATL1 };

        let tTypeVal = _dataEDT_KSV_STOCK_MATL1[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_STOCK_MATL1[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_STOCK_MATL1[`${name}`] = parseInt(val);

        setDataEDT_KSV_STOCK_MATL1(_dataEDT_KSV_STOCK_MATL1);
    };

    const onInputChangeEDT_KSV_STOCK_MATL1_VENDOR_NAME = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_STOCK_MATL1 = { ...dataEDT_KSV_STOCK_MATL1 };

        let tTypeVal = _dataEDT_KSV_STOCK_MATL1[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_STOCK_MATL1[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_STOCK_MATL1[`${name}`] = parseInt(val);

        setDataEDT_KSV_STOCK_MATL1(_dataEDT_KSV_STOCK_MATL1);
    };

    const onInputChangeEDT_KSV_STOCK_MATL1_MATL_NAME = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_STOCK_MATL1 = { ...dataEDT_KSV_STOCK_MATL1 };

        let tTypeVal = _dataEDT_KSV_STOCK_MATL1[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_STOCK_MATL1[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_STOCK_MATL1[`${name}`] = parseInt(val);

        setDataEDT_KSV_STOCK_MATL1(_dataEDT_KSV_STOCK_MATL1);
    };

    const onInputChangeEDT_KSV_STOCK_MATL1_COLOR = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_STOCK_MATL1 = { ...dataEDT_KSV_STOCK_MATL1 };

        let tTypeVal = _dataEDT_KSV_STOCK_MATL1[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_STOCK_MATL1[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_STOCK_MATL1[`${name}`] = parseInt(val);

        setDataEDT_KSV_STOCK_MATL1(_dataEDT_KSV_STOCK_MATL1);
    };

    const onInputChangeEDT_KSV_STOCK_MATL1_SPEC = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_STOCK_MATL1 = { ...dataEDT_KSV_STOCK_MATL1 };

        let tTypeVal = _dataEDT_KSV_STOCK_MATL1[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_STOCK_MATL1[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_STOCK_MATL1[`${name}`] = parseInt(val);

        setDataEDT_KSV_STOCK_MATL1(_dataEDT_KSV_STOCK_MATL1);
    };

    const onInputChangeEDT_KSV_STOCK_MATL1_UNIT = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_STOCK_MATL1 = { ...dataEDT_KSV_STOCK_MATL1 };

        let tTypeVal = _dataEDT_KSV_STOCK_MATL1[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_STOCK_MATL1[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_STOCK_MATL1[`${name}`] = parseInt(val);

        setDataEDT_KSV_STOCK_MATL1(_dataEDT_KSV_STOCK_MATL1);
    };

    const [
        datasEDT_KSV_STOCK_MATL1_BUYER_CD,
        setDatasEDT_KSV_STOCK_MATL1_BUYER_CD,
    ] = useState([]);
    const [
        dataEDT_KSV_STOCK_MATL1_BUYER_CD,
        setDataEDT_KSV_STOCK_MATL1_BUYER_CD,
    ] = useState({});

    const editEDT_KSV_STOCK_MATL1_BUYER_CD = (argValue) => {
        let _dataEDT_KSV_STOCK_MATL1_BUYER_CD =
            datasEDT_KSV_STOCK_MATL1_BUYER_CD.filter(
                (val) => val.BUYER_CD === argValue,
            );
        setDataEDT_KSV_STOCK_MATL1_BUYER_CD(
            _dataEDT_KSV_STOCK_MATL1_BUYER_CD[0],
        );
    };

    const onDropdownChangeEDT_KSV_STOCK_MATL1_BUYER_CD = (e, name) => {
        let val = (e.value && e.value.BUYER_CD) || "";

        let _dataEDT_KSV_STOCK_MATL1 = { ...dataEDT_KSV_STOCK_MATL1 };

        let tTypeVal = _dataEDT_KSV_STOCK_MATL1[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_KSV_STOCK_MATL1[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_KSV_STOCK_MATL1[`${name}`] = parseInt(val);
        }

        setDataEDT_KSV_STOCK_MATL1(_dataEDT_KSV_STOCK_MATL1);
        setDataEDT_KSV_STOCK_MATL1_BUYER_CD(e.value);
    };

    const [datasEDT_KSV_STOCK_MATL1_PO_CD, setDatasEDT_KSV_STOCK_MATL1_PO_CD] =
        useState([]);
    const [dataEDT_KSV_STOCK_MATL1_PO_CD, setDataEDT_KSV_STOCK_MATL1_PO_CD] =
        useState({});

    const editEDT_KSV_STOCK_MATL1_PO_CD = (argValue) => {
        let _dataEDT_KSV_STOCK_MATL1_PO_CD =
            datasEDT_KSV_STOCK_MATL1_PO_CD.filter(
                (val) => val.PO_CD === argValue,
            );
        if (_dataEDT_KSV_STOCK_MATL1_PO_CD.length <= 0) {
            var tObjs = [...datasEDT_KSV_STOCK_MATL1_PO_CD];
            var tObj = { ...tObjs[0] };
            tObj.PO_CD = argValue;
            tObjs.unshift(tObj);
            setDatasEDT_KSV_STOCK_MATL1_PO_CD(tObjs);
            setDataEDT_KSV_STOCK_MATL1_PO_CD(tObjs[0]);
        }
        setDataEDT_KSV_STOCK_MATL1_PO_CD(_dataEDT_KSV_STOCK_MATL1_PO_CD[0]);
    };

    const onDropdownChangeEDT_KSV_STOCK_MATL1_PO_CD = (e, name) => {
        let val = (e.value && e.value.PO_CD) || "";

        let _dataEDT_KSV_STOCK_MATL1 = { ...dataEDT_KSV_STOCK_MATL1 };

        let tTypeVal = _dataEDT_KSV_STOCK_MATL1[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_KSV_STOCK_MATL1[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_KSV_STOCK_MATL1[`${name}`] = parseInt(val);
        }

        setDataEDT_KSV_STOCK_MATL1(_dataEDT_KSV_STOCK_MATL1);
        setDataEDT_KSV_STOCK_MATL1_PO_CD(e.value);
    };

    const [
        datasEDT_KSV_STOCK_MATL1_ORDER_CD,
        setDatasEDT_KSV_STOCK_MATL1_ORDER_CD,
    ] = useState([]);
    const [
        dataEDT_KSV_STOCK_MATL1_ORDER_CD,
        setDataEDT_KSV_STOCK_MATL1_ORDER_CD,
    ] = useState({});

    const editEDT_KSV_STOCK_MATL1_ORDER_CD = (argValue) => {
        let _dataEDT_KSV_STOCK_MATL1_ORDER_CD =
            datasEDT_KSV_STOCK_MATL1_ORDER_CD.filter(
                (val) => val.ORDER_CD === argValue,
            );
        if (_dataEDT_KSV_STOCK_MATL1_ORDER_CD.length <= 0) {
            var tObjs = [...datasEDT_KSV_STOCK_MATL1_ORDER_CD];
            var tObj = { ...tObjs[0] };
            tObj.ORDER_CD = argValue;
            tObjs.unshift(tObj);
            setDatasEDT_KSV_STOCK_MATL1_ORDER_CD(tObjs);
            setDataEDT_KSV_STOCK_MATL1_ORDER_CD(tObjs[0]);
        }
        setDataEDT_KSV_STOCK_MATL1_ORDER_CD(
            _dataEDT_KSV_STOCK_MATL1_ORDER_CD[0],
        );
    };

    const onDropdownChangeEDT_KSV_STOCK_MATL1_ORDER_CD = (e, name) => {
        let val = (e.value && e.value.ORDER_CD) || "";

        let _dataEDT_KSV_STOCK_MATL1 = { ...dataEDT_KSV_STOCK_MATL1 };

        let tTypeVal = _dataEDT_KSV_STOCK_MATL1[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_KSV_STOCK_MATL1[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_KSV_STOCK_MATL1[`${name}`] = parseInt(val);
        }

        setDataEDT_KSV_STOCK_MATL1(_dataEDT_KSV_STOCK_MATL1);
        setDataEDT_KSV_STOCK_MATL1_ORDER_CD(e.value);
    };

    const onInputChangeEDT_KSV_STOCK_MATL1_STOCK_QTY = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_STOCK_MATL1 = { ...dataEDT_KSV_STOCK_MATL1 };

        let tTypeVal = _dataEDT_KSV_STOCK_MATL1[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_STOCK_MATL1[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_STOCK_MATL1[`${name}`] = parseInt(val);

        setDataEDT_KSV_STOCK_MATL1(_dataEDT_KSV_STOCK_MATL1);
    };

    const onInputChangeEDT_KSV_STOCK_MATL1_REMAIN_QTY = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_STOCK_MATL1 = { ...dataEDT_KSV_STOCK_MATL1 };

        let tTypeVal = _dataEDT_KSV_STOCK_MATL1[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_STOCK_MATL1[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_STOCK_MATL1[`${name}`] = parseInt(val);

        setDataEDT_KSV_STOCK_MATL1(_dataEDT_KSV_STOCK_MATL1);
    };

    const onInputChangeEDT_KSV_STOCK_MATL1_USE_QTY = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_STOCK_MATL1 = { ...dataEDT_KSV_STOCK_MATL1 };

        let tTypeVal = _dataEDT_KSV_STOCK_MATL1[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_STOCK_MATL1[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_STOCK_MATL1[`${name}`] = parseInt(val);

        setDataEDT_KSV_STOCK_MATL1(_dataEDT_KSV_STOCK_MATL1);
    };

    const onInputChangeEDT_KSV_STOCK_MATL1_OUT_QTY = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_STOCK_MATL1 = { ...dataEDT_KSV_STOCK_MATL1 };

        let tTypeVal = _dataEDT_KSV_STOCK_MATL1[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_STOCK_MATL1[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_STOCK_MATL1[`${name}`] = parseInt(val);

        setDataEDT_KSV_STOCK_MATL1(_dataEDT_KSV_STOCK_MATL1);
    };

    useEffect(() => {
        let tRootIdx = "S000833744";

        var tUrls = window.location.href.split("?");
        if (tUrls.length <= 1) {
        } else {
            var tParams1 = tUrls[1].split("&");
            var tParams2 = tParams1.map((col, i) => {
                var tObj = {};
                var tCols = col.split("=");

                if (tCols[0].includes("ROOT_IDX")) {
                    tObj.key = tCols[0];
                    tObj.value = tCols[1];
                    console.log(tObj);
                    return tObj;
                }
            });
            if (tParams2.length > 0) {
                tRootIdx = tParams2[0].value;
            }
            console.log(tParams2);
        }

        if (tRootIdx === "") return;

        var _tObj = {};
        _tObj.ROOT_IDX = tRootIdx;

        serviceS051201_STOCK_QTY_UPDATE_LOG
            .mgrQuery_CODE(_tObj)
            .then((data) => {
                if (typeof data.graphQLErrors === "undefined") {
                    setDatasEDT_KSV_STOCK_MATL1_BUYER_CD(data.BUYER_CD);
                    setDataEDT_KSV_STOCK_MATL1_BUYER_CD(data.BUYER_CD[0]);

                    setDatasEDT_KSV_STOCK_MATL1_PO_CD(data.PO_CD);
                    setDataEDT_KSV_STOCK_MATL1_PO_CD(data.PO_CD[0]);

                    setDatasEDT_KSV_STOCK_MATL1_ORDER_CD(data.ORDER_CD);
                    setDataEDT_KSV_STOCK_MATL1_ORDER_CD(data.ORDER_CD[0]);
                } else {
                    console.log(
                        "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });

        if (tRootIdx !== "") search_LIST_1(tRootIdx);
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
                    height: "2rem",
                }}
            ></div>

            <div
                style={{
                    marginLeft: "1rem",
                    marginTop: "1rem",
                    width: "99rem",
                    height: "30rem",
                }}
            >
                <AFDataTable preventUnrelatedRerender
                    ref={dt_TBL_KSV_STOCK_MATL}
                    size="small"
                    value={datasTBL_KSV_STOCK_MATL}
                    resizableColumns
                    columnResizeMode="fit"
                    showGridlines
                    selectionMode="checkbox"
                    selection={selectedTBL_KSV_STOCK_MATL}
                    onSelectionChange={(e) => {
                        setFlagSelectModeTBL_KSV_STOCK_MATL(true);
                        setSelectedTBL_KSV_STOCK_MATL(e.value);
                        console.log(
                            "selected length:" +
                                selectedTBL_KSV_STOCK_MATL.length,
                        );
                        onRowClick1TBL_KSV_STOCK_MATL(e.value);
                    }}
                    onRowClick={onRowClickTBL_KSV_STOCK_MATL}
                    dataKey="id"
                    className="datatable-responsive"
                    virtualScrollerOptions={{ itemSize: 14 }}
                    emptyMessage=" " //header={headerTBL_KSV_STOCK_MATL}
                    responsiveLayout="scroll"
                    scrollable
                    scrollHeight="28rem"
                >
                    <AFColumn field="STOCK_IDX" headerClassName="t-header" header="idx" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="ORG_STOCK_IDX" headerClassName="t-header" header="org idx" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="PO_CD" headerClassName="t-header" header="PO" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="ORDER_CD" headerClassName="t-header" header="Order" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="MATL_CD" headerClassName="t-header" header="Matl Cd" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="STOCK_DATE" headerClassName="t-header" header="Stock Date" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="REG_DATE" headerClassName="t-header" header="Reg Date" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="STOCK_STATUS_N" headerClassName="t-header" header="Status" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="STOCK_QTY" headerClassName="t-header" header="Stock Qty" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="REMAIN_QTY" headerClassName="t-header" header="Remain Qty" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="USE_QTY" headerClassName="t-header" header="Use Qty" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="OUT_QTY" headerClassName="t-header" header="Out Qty" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="REG_USER" headerClassName="t-header" header="User" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="REMARK" headerClassName="t-header" header="Remark" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="USE_PO" headerClassName="t-header" header="Use Po" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="USE_PO_SEQ" headerClassName="t-header" header="Use Po Seq" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="USE_ORDER" headerClassName="t-header" header="Use Order" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="USE_POQTY" headerClassName="t-header" header="Use Qty" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="USE_DATETIME" headerClassName="t-header" header="Use Date" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                </AFDataTable>
            </div>

            <div style={{ width: "100rem", height: "20rem" }}>
                <div className="flex flex-row justify-content-start align-items-top">
                    <div style={{ width: "100rem", height: "20rem" }}>
                        <span
                            style={{
                                marginLeft: "0.5rem",
                                height: "2rem",
                                display: "inline-block",
                                width: "19rem",
                            }}
                        >
                            <p style={{ width: "8rem", display: "inline-block", }}>Matl Cd</p>
                            <InputText
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "10rem",
                                }}
                                id="id_MATL_CD"
                                value={dataEDT_KSV_STOCK_MATL1.MATL_CD}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_STOCK_MATL1_MATL_CD(
                                        e,
                                        "MATL_CD",
                                    )
                                }
                            />
                        </span>

                        <span style={{ display: "inline-block" }}>
                            <Button
                                label="Matl Code Update"
                                style={{ height: "1.1rem" }}
                                className="p-button-text"
                                onClick={blankFn}
                            />
                        </span>
                        <span
                            style={{
                                marginLeft: "3.5rem",
                                height: "2rem",
                                display: "inline-block",
                                width: "50rem",
                            }}
                        >
                            <InputText
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "10rem",
                                }}
                                id="id_STYLE_CD"
                                value={dataEDT_KSV_STOCK_MATL1.STYLE_CD}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_STOCK_MATL1_STYLE_CD(
                                        e,
                                        "STYLE_CD",
                                    )
                                }
                            />
                        </span>
                        <span
                            style={{
                                marginLeft: "0.5rem",
                                height: "2rem",
                                display: "inline-block",
                                width: "28rem",
                            }}
                        >
                            <p style={{ width: "8rem", display: "inline-block", }}>Supplier</p>
                            <InputText
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "18rem",
                                }}
                                id="id_VENDOR_NAME"
                                value={dataEDT_KSV_STOCK_MATL1.VENDOR_NAME}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_STOCK_MATL1_VENDOR_NAME(
                                        e,
                                        "VENDOR_NAME",
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
                                width: "28rem",
                            }}
                        >
                            <p style={{ width: "5.5rem", display: "inline-block", }}>PO</p>
                            <div
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "18rem",
                                }}
                            >
                                <Dropdown
                                    id="id_PO_CD"
                                    value={dataEDT_KSV_STOCK_MATL1_PO_CD}
                                    onChange={(e) =>
                                        onDropdownChangeEDT_KSV_STOCK_MATL1_PO_CD(
                                            e,
                                            "PO_CD",
                                        )
                                    }
                                    options={datasEDT_KSV_STOCK_MATL1_PO_CD}
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
                                width: "24rem",
                            }}
                        >
                            <p style={{ width: "5rem", display: "inline-block", }}>Order</p>
                            <div
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "18rem",
                                }}
                            >
                                <Dropdown
                                    id="id_ORDER_CD"
                                    value={dataEDT_KSV_STOCK_MATL1_ORDER_CD}
                                    onChange={(e) =>
                                        onDropdownChangeEDT_KSV_STOCK_MATL1_ORDER_CD(
                                            e,
                                            "ORDER_CD",
                                        )
                                    }
                                    options={datasEDT_KSV_STOCK_MATL1_ORDER_CD}
                                    optionLabel="ORDER_CD"
                                    placeholder=""
                                    editable
                                ></Dropdown>
                            </div>
                        </span>
                        <span style={{ display: "inline-block" }}>
                            <Button
                                label="Update"
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
                                width: "80rem",
                            }}
                        >
                            <p style={{ width: "8rem", display: "inline-block", }}>Description</p>
                            <InputText
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "23rem",
                                }}
                                id="id_MATL_NAME"
                                value={dataEDT_KSV_STOCK_MATL1.MATL_NAME}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_STOCK_MATL1_MATL_NAME(
                                        e,
                                        "MATL_NAME",
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
                                width: "80rem",
                            }}
                        >
                            <p style={{ width: "8rem", display: "inline-block", }}>Color</p>
                            <InputText
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "23rem",
                                }}
                                id="id_COLOR"
                                value={dataEDT_KSV_STOCK_MATL1.COLOR}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_STOCK_MATL1_COLOR(
                                        e,
                                        "COLOR",
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
                                width: "80rem",
                            }}
                        >
                            <p style={{ width: "8rem", display: "inline-block", }}>Spec</p>
                            <InputText
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "23rem",
                                }}
                                id="id_SPEC"
                                value={dataEDT_KSV_STOCK_MATL1.SPEC}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_STOCK_MATL1_SPEC(
                                        e,
                                        "SPEC",
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
                                width: "80rem",
                            }}
                        >
                            <p style={{ width: "8rem", display: "inline-block", }}>Unit</p>
                            <InputText
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "10rem",
                                }}
                                id="id_UNIT"
                                value={dataEDT_KSV_STOCK_MATL1.UNIT}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_STOCK_MATL1_UNIT(
                                        e,
                                        "UNIT",
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
                                width: "28rem",
                            }}
                        >
                            <p style={{ width: "8rem", display: "inline-block", }}>Buyer</p>
                            <div
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "18rem",
                                }}
                            >
                                <Dropdown
                                    id="id_BUYER_CD"
                                    value={dataEDT_KSV_STOCK_MATL1_BUYER_CD}
                                    onChange={(e) =>
                                        onDropdownChangeEDT_KSV_STOCK_MATL1_BUYER_CD(
                                            e,
                                            "BUYER_CD",
                                        )
                                    }
                                    options={datasEDT_KSV_STOCK_MATL1_BUYER_CD}
                                    optionLabel="BUYER_NAME"
                                    placeholder=""
                                    editable
                                ></Dropdown>
                            </div>
                        </span>
                        <span
                            style={{ display: "inline-block", width: "60rem" }}
                        >
                            <Button
                                label="Buyer Update"
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
                                width: "14rem",
                            }}
                        >
                            <p style={{ width: "8rem", display: "inline-block", }}>Stock Qty</p>
                            <InputText
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "5rem",
                                }}
                                id="id_STOCK_QTY"
                                value={dataEDT_KSV_STOCK_MATL1.STOCK_QTY}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_STOCK_MATL1_STOCK_QTY(
                                        e,
                                        "STOCK_QTY",
                                    )
                                }
                            />
                        </span>
                        <span
                            style={{
                                marginLeft: "0.5rem",
                                height: "2rem",
                                display: "inline-block",
                                width: "14rem",
                            }}
                        >
                            <p style={{ width: "8rem", display: "inline-block", }}>Remain Qty</p>
                            <InputText
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "5rem",
                                }}
                                id="id_REMAIN_QTY"
                                value={dataEDT_KSV_STOCK_MATL1.REMAIN_QTY}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_STOCK_MATL1_REMAIN_QTY(
                                        e,
                                        "REMAIN_QTY",
                                    )
                                }
                            />
                        </span>
                        <span
                            style={{
                                marginLeft: "0.5rem",
                                height: "2rem",
                                display: "inline-block",
                                width: "14rem",
                            }}
                        >
                            <p style={{ width: "8rem", display: "inline-block", }}>Use Qty</p>
                            <InputText
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "5rem",
                                }}
                                id="id_USE_QTY"
                                value={dataEDT_KSV_STOCK_MATL1.USE_QTY}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_STOCK_MATL1_USE_QTY(
                                        e,
                                        "USE_QTY",
                                    )
                                }
                            />
                        </span>
                        <span
                            style={{
                                marginLeft: "0.5rem",
                                height: "2rem",
                                display: "inline-block",
                                width: "14rem",
                            }}
                        >
                            <p style={{ width: "8rem", display: "inline-block", }}>Out Qty</p>
                            <InputText
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "5rem",
                                }}
                                id="id_OUT_QTY"
                                value={dataEDT_KSV_STOCK_MATL1.OUT_QTY}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_STOCK_MATL1_OUT_QTY(
                                        e,
                                        "OUT_QTY",
                                    )
                                }
                            />
                        </span>
                    </div>
                </div>
            </div>

            <Toast ref={toast} />
            <Divider />

            <div
                style={{ width: "100rem", height: "2rem", marginLeft: "65rem" }}
            >
                <div className="formgrid grid">
                    <div className="field col-6 md:col-6">
                        <Button
                            style={{ display: "inline-block", width: "15rem" }}
                            label="Remark Update"
                            icon="pi pi-times"
                            className="p-button-text"
                            onClick={blankFn}
                        />

                        <Button
                            style={{ display: "inline-block", width: "10rem" }}
                            label="Q'ty Update"
                            icon="pi pi-check"
                            className="p-button-text"
                            onClick={blankFn}
                        />

                        <Button
                            style={{ display: "inline-block", width: "10rem" }}
                            label="List"
                            icon="pi pi-check"
                            className="p-button-text"
                            onClick={blankFn}
                        />
                    </div>
                </div>
            </div>

            <Divider />
        </div>
    );
};

const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(S051201_STOCK_QTY_UPDATE_LOG, comparisonFn);
