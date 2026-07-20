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
import { ServiceS0517_STOCK_HISTORY } from "../service/service_biz/ServiceS0517_STOCK_HISTORY";

import "./page_common.scss";

const emptyKCD_CODE = {
    id: 0,
    CD_GROUP: "",
    CD_CODE: "",
    CD_NAME: "",
    CD_FLAG: "",
};

const emptyQRY_KSV_STOCK_MATL = {
    MATL_CD: "",
    STOCK_IDX: "",
    VENDOR_NAME: "",
    PO_CD: "",
    ORDER_CD: "",
    MATL_NAME: "",
    COLOR: "",
    SPEC: "",
    UNIT: "",
    BUYER_CD: "",
    STOCK_QTY: "",
    REMAIN_QTY: "",
    USE_QTY: "",
    OUT_QTY: "",
};

const emptyTBL_KSV_STOCK_MATL = {
    id: 0,
    MATL_CD: "",
    MATL_NAME: "",
    COLOR: "",
    SPEC: "",
    UNIT: "",
    STOCK_QTY: "",
};

const S0517_STOCK_HISTORY = () => {
    const serviceLibRef = useRef(null);
    if (!serviceLibRef.current) {
        serviceLibRef.current = new ServiceLib();
        serviceLibRef.current.loginConfirm();
    }
    const serviceLib = serviceLibRef.current;
    const serviceS0517_STOCK_HISTORYRef = useRef(null);
    if (!serviceS0517_STOCK_HISTORYRef.current) serviceS0517_STOCK_HISTORYRef.current = new ServiceS0517_STOCK_HISTORY();
    const serviceS0517_STOCK_HISTORY = serviceS0517_STOCK_HISTORYRef.current;

    const toast = useRef(null);
    const matlCdBlinkTimerRef = useRef(null);

    /* splitter 관련 */
    const [styleVal, setStyleVal] = useState({ width: "65vw" });

    const buildDropdownOptionsByKey = (rows, key, selectedValue = "") => {
        const tSet = new Set();
        (rows || []).forEach((row) => {
            const tValue = String((row && row[key]) || "").trim();
            if (tValue !== "") tSet.add(tValue);
        });

        const tSelected = String(selectedValue || "").trim();
        if (tSelected !== "") tSet.add(tSelected);

        return [
            { label: "", value: "" },
            ...Array.from(tSet).map((value) => ({
                label: value,
                value,
            })),
        ];
    };

    const search_LIST_1 = (argData) => {
        var _tData = {};
        if (typeof argData.STOCK_IDX !== "undefined") {
            _tData.STOCK_IDX = argData.STOCK_IDX;
        } else {
            return;
        }

        setDatasTBL_KSV_STOCK_MATL([]);
        setSelectedTBL_KSV_STOCK_MATL([]);

        setLoadingTBL_KSV_STOCK_MATL(true);
        serviceS0517_STOCK_HISTORY.mgrQuery_LIST_1(_tData).then((data) => {
            setLoadingTBL_KSV_STOCK_MATL(false);
            if (typeof data.graphQLErrors === "undefined") {
                console.log(
                    "ServiceMgrKCD_BUYER.mgr1KcdStyle call => " +
                        data.DATAS.length,
                );
                var tArray2 = data.DATAS.map((col, i) => {
                    var tObj = { ...col };
                    tObj.id = i + 1;
                    return tObj;
                });
                setDatasTBL_KSV_STOCK_MATL(tArray2);

                var tQry = { ...dataQRY_KSV_STOCK_MATL };
                tQry.MATL_CD = data.INFO.MATL_CD;
                tQry.STOCK_IDX = data.INFO.STOCK_IDX;
                tQry.VENDOR_NAME = data.INFO.VENDOR_NAME;
                tQry.PO_CD = data.INFO.PO_CD;
                tQry.ORDER_CD = data.INFO.ORDER_CD;
                tQry.MATL_NAME = data.INFO.MATL_NAME;
                tQry.COLOR = data.INFO.COLOR;
                tQry.SPEC = data.INFO.SPEC;
                tQry.UNIT = data.INFO.UNIT;
                tQry.BUYER_CD = data.INFO.BUYER_CD;
                tQry.STOCK_QTY = data.INFO.STOCK_QTY;
                tQry.REMAIN_QTY = data.INFO.REMAIN_QTY;
                tQry.USE_QTY = data.INFO.USE_QTY;
                tQry.OUT_QTY = data.INFO.OUT_QTY;
                setDataQRY_KSV_STOCK_MATL(tQry);
            } else {
                console.log(
                    "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });
    };
    /* QRY KSV_STOCK_MATL*/
    const [dataQRY_KSV_STOCK_MATL, setDataQRY_KSV_STOCK_MATL] = useState(
        emptyQRY_KSV_STOCK_MATL,
    );

    const onInputChangeQRY_KSV_STOCK_MATL_MATL_CD = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_STOCK_MATL = { ...dataQRY_KSV_STOCK_MATL };

        let tTypeVal = _dataQRY_KSV_STOCK_MATL[`${name}`];
        if (typeof tTypeVal === "string")
            _dataQRY_KSV_STOCK_MATL[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_STOCK_MATL[`${name}`] = parseInt(val);

        setDataQRY_KSV_STOCK_MATL(_dataQRY_KSV_STOCK_MATL);
    };

    const onInputChangeQRY_KSV_STOCK_MATL_STOCK_IDX = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_STOCK_MATL = { ...dataQRY_KSV_STOCK_MATL };

        let tTypeVal = _dataQRY_KSV_STOCK_MATL[`${name}`];
        if (typeof tTypeVal === "string")
            _dataQRY_KSV_STOCK_MATL[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_STOCK_MATL[`${name}`] = parseInt(val);

        setDataQRY_KSV_STOCK_MATL(_dataQRY_KSV_STOCK_MATL);
    };

    const onInputChangeQRY_KSV_STOCK_MATL_VENDOR_NAME = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_STOCK_MATL = { ...dataQRY_KSV_STOCK_MATL };

        let tTypeVal = _dataQRY_KSV_STOCK_MATL[`${name}`];
        if (typeof tTypeVal === "string")
            _dataQRY_KSV_STOCK_MATL[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_STOCK_MATL[`${name}`] = parseInt(val);

        setDataQRY_KSV_STOCK_MATL(_dataQRY_KSV_STOCK_MATL);
    };

    const onInputChangeQRY_KSV_STOCK_MATL_PO_CD = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_STOCK_MATL = { ...dataQRY_KSV_STOCK_MATL };

        let tTypeVal = _dataQRY_KSV_STOCK_MATL[`${name}`];
        if (typeof tTypeVal === "string")
            _dataQRY_KSV_STOCK_MATL[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_STOCK_MATL[`${name}`] = parseInt(val);

        setDataQRY_KSV_STOCK_MATL(_dataQRY_KSV_STOCK_MATL);
    };

    const onInputChangeQRY_KSV_STOCK_MATL_ORDER_CD = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_STOCK_MATL = { ...dataQRY_KSV_STOCK_MATL };

        let tTypeVal = _dataQRY_KSV_STOCK_MATL[`${name}`];
        if (typeof tTypeVal === "string")
            _dataQRY_KSV_STOCK_MATL[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_STOCK_MATL[`${name}`] = parseInt(val);

        setDataQRY_KSV_STOCK_MATL(_dataQRY_KSV_STOCK_MATL);
    };

    const onInputChangeQRY_KSV_STOCK_MATL_MATL_NAME = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_STOCK_MATL = { ...dataQRY_KSV_STOCK_MATL };

        let tTypeVal = _dataQRY_KSV_STOCK_MATL[`${name}`];
        if (typeof tTypeVal === "string")
            _dataQRY_KSV_STOCK_MATL[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_STOCK_MATL[`${name}`] = parseInt(val);

        setDataQRY_KSV_STOCK_MATL(_dataQRY_KSV_STOCK_MATL);
    };

    const onInputChangeQRY_KSV_STOCK_MATL_COLOR = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_STOCK_MATL = { ...dataQRY_KSV_STOCK_MATL };

        let tTypeVal = _dataQRY_KSV_STOCK_MATL[`${name}`];
        if (typeof tTypeVal === "string")
            _dataQRY_KSV_STOCK_MATL[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_STOCK_MATL[`${name}`] = parseInt(val);

        setDataQRY_KSV_STOCK_MATL(_dataQRY_KSV_STOCK_MATL);
    };

    const onInputChangeQRY_KSV_STOCK_MATL_SPEC = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_STOCK_MATL = { ...dataQRY_KSV_STOCK_MATL };

        let tTypeVal = _dataQRY_KSV_STOCK_MATL[`${name}`];
        if (typeof tTypeVal === "string")
            _dataQRY_KSV_STOCK_MATL[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_STOCK_MATL[`${name}`] = parseInt(val);

        setDataQRY_KSV_STOCK_MATL(_dataQRY_KSV_STOCK_MATL);
    };

    const onInputChangeQRY_KSV_STOCK_MATL_UNIT = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_STOCK_MATL = { ...dataQRY_KSV_STOCK_MATL };

        let tTypeVal = _dataQRY_KSV_STOCK_MATL[`${name}`];
        if (typeof tTypeVal === "string")
            _dataQRY_KSV_STOCK_MATL[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_STOCK_MATL[`${name}`] = parseInt(val);

        setDataQRY_KSV_STOCK_MATL(_dataQRY_KSV_STOCK_MATL);
    };

    const onInputChangeQRY_KSV_STOCK_MATL_STOCK_QTY = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_STOCK_MATL = { ...dataQRY_KSV_STOCK_MATL };

        let tTypeVal = _dataQRY_KSV_STOCK_MATL[`${name}`];
        if (typeof tTypeVal === "string")
            _dataQRY_KSV_STOCK_MATL[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_STOCK_MATL[`${name}`] = parseInt(val);

        setDataQRY_KSV_STOCK_MATL(_dataQRY_KSV_STOCK_MATL);
    };

    const onInputChangeQRY_KSV_STOCK_MATL_REMAIN_QTY = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_STOCK_MATL = { ...dataQRY_KSV_STOCK_MATL };

        let tTypeVal = _dataQRY_KSV_STOCK_MATL[`${name}`];
        if (typeof tTypeVal === "string")
            _dataQRY_KSV_STOCK_MATL[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_STOCK_MATL[`${name}`] = parseInt(val);

        setDataQRY_KSV_STOCK_MATL(_dataQRY_KSV_STOCK_MATL);
    };

    const onInputChangeQRY_KSV_STOCK_MATL_USE_QTY = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_STOCK_MATL = { ...dataQRY_KSV_STOCK_MATL };

        let tTypeVal = _dataQRY_KSV_STOCK_MATL[`${name}`];
        if (typeof tTypeVal === "string")
            _dataQRY_KSV_STOCK_MATL[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_STOCK_MATL[`${name}`] = parseInt(val);

        setDataQRY_KSV_STOCK_MATL(_dataQRY_KSV_STOCK_MATL);
    };

    const onInputChangeQRY_KSV_STOCK_MATL_OUT_QTY = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_STOCK_MATL = { ...dataQRY_KSV_STOCK_MATL };

        let tTypeVal = _dataQRY_KSV_STOCK_MATL[`${name}`];
        if (typeof tTypeVal === "string")
            _dataQRY_KSV_STOCK_MATL[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_STOCK_MATL[`${name}`] = parseInt(val);

        setDataQRY_KSV_STOCK_MATL(_dataQRY_KSV_STOCK_MATL);
    };

    const [
        datasQRY_KSV_STOCK_MATL_BUYER_CD,
        setDatasQRY_KSV_STOCK_MATL_BUYER_CD,
    ] = useState([]);
    const [
        dataQRY_KSV_STOCK_MATL_BUYER_CD,
        setDataQRY_KSV_STOCK_MATL_BUYER_CD,
    ] = useState({});
    const [datasQRY_KSV_STOCK_MATL_PO_CD, setDatasQRY_KSV_STOCK_MATL_PO_CD] =
        useState([]);
    const [
        datasQRY_KSV_STOCK_MATL_ORDER_CD,
        setDatasQRY_KSV_STOCK_MATL_ORDER_CD,
    ] = useState([]);

    const onDropdownChangeQRY_KSV_STOCK_MATL_BUYER_CD = (e, name) => {
        let val = (e.value && e.value.BUYER_CD) || "";

        let _dataQRY_KSV_STOCK_MATL = { ...dataQRY_KSV_STOCK_MATL };

        let tTypeVal = _dataQRY_KSV_STOCK_MATL[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_STOCK_MATL[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_STOCK_MATL[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_STOCK_MATL(_dataQRY_KSV_STOCK_MATL);
        setDataQRY_KSV_STOCK_MATL_BUYER_CD(e.value);
    };

    const onDropdownChangeQRY_KSV_STOCK_MATL_PO_CD = (e, name) => {
        const tPoCd = String(e.value || "");
        setDataQRY_KSV_STOCK_MATL((prev) => ({
            ...prev,
            [name]: tPoCd,
            ORDER_CD: "",
        }));
    };

    const onDropdownChangeQRY_KSV_STOCK_MATL_ORDER_CD = (e, name) => {
        const tOrderCd = String(e.value || "");
        setDataQRY_KSV_STOCK_MATL({
            ...dataQRY_KSV_STOCK_MATL,
            [name]: tOrderCd,
        });
    };

    /*TABLE KSV_STOCK_MATL */
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
    const [loadingTBL_KSV_STOCK_MATL, setLoadingTBL_KSV_STOCK_MATL] =
        useState(false);
    const [flagMatlCdBlink, setFlagMatlCdBlink] = useState(false);

    // DATAGRID CODE : TBL_KSV_STOCK_MATL

    const triggerMatlCdBlink = () => {
        if (matlCdBlinkTimerRef.current) {
            clearTimeout(matlCdBlinkTimerRef.current);
        }

        setFlagMatlCdBlink(false);
        setTimeout(() => {
            setFlagMatlCdBlink(true);
        }, 0);

        matlCdBlinkTimerRef.current = setTimeout(() => {
            setFlagMatlCdBlink(false);
            matlCdBlinkTimerRef.current = null;
        }, 700);
    };

    const setMatlCdFromRow = (argRow) => {
        const tMatlCd = String((argRow && argRow.MATL_CD) || "");
        if (String(dataQRY_KSV_STOCK_MATL.MATL_CD || "") !== tMatlCd) {
            triggerMatlCdBlink();
        }
        setDataQRY_KSV_STOCK_MATL((prev) => ({
            ...prev,
            STOCK_IDX: String((argRow && argRow.STOCK_IDX) || ""),
            PO_CD: String((argRow && argRow.PO_CD) || ""),
            ORDER_CD: String((argRow && argRow.ORDER_CD) || ""),
            USE_QTY: String((argRow && argRow.USE_QTY) || ""),
            MATL_CD: tMatlCd,
        }));
    };

    const getUpdateTargetRow = () => {
        if (selectedTBL_KSV_STOCK_MATL.length > 0) {
            return selectedTBL_KSV_STOCK_MATL[0];
        }
        if ((dataTBL_KSV_STOCK_MATL.STOCK_IDX || "").trim() !== "") {
            return dataTBL_KSV_STOCK_MATL;
        }
        return null;
    };

    const onRowClick1TBL_KSV_STOCK_MATL = (argData0) => {
        var argData = {};

        if (typeof argData0.length !== "undefined") {
            argData = argData0[0];
        } else {
            argData = argData0;
        }

        let argTBL_KSV_STOCK_MATL = argData;

        setDataTBL_KSV_STOCK_MATL(argTBL_KSV_STOCK_MATL);
        setMatlCdFromRow(argTBL_KSV_STOCK_MATL);
    };

    const onRowClickTBL_KSV_STOCK_MATL = (event) => {
        let argTBL_KSV_STOCK_MATL = event.data;
        if (flagSelectModeTBL_KSV_STOCK_MATL) return;

        setDataTBL_KSV_STOCK_MATL(argTBL_KSV_STOCK_MATL);
        setMatlCdFromRow(argTBL_KSV_STOCK_MATL);

        // Service : NawooAll:mgrQueryTBL_KSV_STOCK_MATL
    };

    useEffect(() => {
        let tStockIdx = "";

        var tUrls = window.location.href.split("?");
        if (tUrls.length <= 1) {
        } else {
            var tParams1 = tUrls[1].split("&");
            var tParams2 = tParams1.map((col, i) => {
                var tObj = {};
                var tCols = col.split("=");
                if (tCols[0].includes("STOCK_IDX")) {
                    tObj.key = tCols[0];
                    tObj.value = tCols[1];
                    tStockIdx = tObj.value;
                }
            });
        }

        var _tObj = {};
        _tObj.VENDOR_CD = "";

        serviceS0517_STOCK_HISTORY.mgrQuery_CODE(_tObj).then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                setDatasQRY_KSV_STOCK_MATL_BUYER_CD(data.BUYER_CD);
                setDataQRY_KSV_STOCK_MATL_BUYER_CD(data.BUYER_CD[0]);
                setDatasQRY_KSV_STOCK_MATL_PO_CD(
                    buildDropdownOptionsByKey(data.PO_CD, "PO_CD"),
                );
                setDatasQRY_KSV_STOCK_MATL_ORDER_CD(
                    buildDropdownOptionsByKey(data.ORDER_CD, "ORDER_CD"),
                );

                if (tStockIdx !== "") {
                    var tObj0 = { ...dataQRY_KSV_STOCK_MATL };
                    tObj0.STOCK_IDX = tStockIdx;
                    setDataQRY_KSV_STOCK_MATL(tObj0);

                    search_LIST_1(tObj0);
                }
            } else {
                console.log(
                    "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });
    }, []);

    useEffect(() => {
        const tPoCd = String(dataQRY_KSV_STOCK_MATL.PO_CD || "").trim();
        let tIsUnmounted = false;

        const searchOrderCdByPo = async () => {
            const tObj = { VENDOR_CD: "", PO_CD: tPoCd };
            const data = await serviceS0517_STOCK_HISTORY.mgrQuery_CODE(tObj);
            if (tIsUnmounted) return;

            if (typeof data.graphQLErrors === "undefined") {
                const tOrderOptions = buildDropdownOptionsByKey(
                    data.ORDER_CD,
                    "ORDER_CD",
                    dataQRY_KSV_STOCK_MATL.ORDER_CD,
                );
                const tHasOrder = tOrderOptions.some(
                    (col) => col.value === dataQRY_KSV_STOCK_MATL.ORDER_CD,
                );

                setDatasQRY_KSV_STOCK_MATL_ORDER_CD(tOrderOptions);
                if (!tHasOrder) {
                    setDataQRY_KSV_STOCK_MATL((prev) => ({
                        ...prev,
                        ORDER_CD: "",
                    }));
                }
            }
        };

        searchOrderCdByPo();

        return () => {
            tIsUnmounted = true;
        };
    }, [dataQRY_KSV_STOCK_MATL.PO_CD]);

    useEffect(() => {
        return () => {
            if (matlCdBlinkTimerRef.current) {
                clearTimeout(matlCdBlinkTimerRef.current);
            }
        };
    }, []);

    const updateMATL_CD = async () => {
        const tTargetRow = getUpdateTargetRow();
        const tStockIdx = (
            (tTargetRow && tTargetRow.STOCK_IDX) ||
            dataQRY_KSV_STOCK_MATL.STOCK_IDX ||
            ""
        ).trim();
        const tMatlCd = (dataQRY_KSV_STOCK_MATL.MATL_CD || "").trim();
        const tUseQty = parseFloat(
            String(
                (tTargetRow && tTargetRow.USE_QTY) ||
                    dataQRY_KSV_STOCK_MATL.USE_QTY ||
                    "0",
            ).replace(/,/g, ""),
        );

        if (tStockIdx === "") {
            alert("Stock Idx is required");
            return;
        }

        if (tMatlCd === "") {
            alert("Matl# is required");
            return;
        }

        if (!Number.isNaN(tUseQty) && tUseQty > 0) {
            alert("Can't update already used qty<br><br>사용수량이 있는 자재의 코드는 변경할 수 없습니다.");
            return;
        }
        const tObj = {
            STOCK_IDX: tStockIdx,
            MATL_CD: tMatlCd,
        };

        setLoadingTBL_KSV_STOCK_MATL(true);
        const data = await serviceS0517_STOCK_HISTORY.mgrUpdate_MATL_CD(tObj);
        setLoadingTBL_KSV_STOCK_MATL(false);

        if (typeof data?.graphQLErrors === "undefined") {
            if (Array.isArray(data) && data.length > 0 && data[0].CODE) {
                alert(data[0].CODE);
            } else {
                alert("Update completed");
            }
            search_LIST_1({ STOCK_IDX: tStockIdx });
        } else {
            console.log(
                "mgrUpdate_MATL_CD error => " +
                    JSON.stringify(data.graphQLErrors),
            );
        }
    };

    const updateBUYER_CD = async () => {
        const tStockIdx = (dataQRY_KSV_STOCK_MATL.STOCK_IDX || "").trim();
        const tBuyerCd = (dataQRY_KSV_STOCK_MATL.BUYER_CD || "").trim();

        if (tStockIdx === "") {
            alert("Stock Idx is required");
            return;
        }

        if (tBuyerCd === "") {
            alert("Buyer is required");
            return;
        }

        const tObj = {
            STOCK_IDX: tStockIdx,
            BUYER_CD: tBuyerCd,
        };

        setLoadingTBL_KSV_STOCK_MATL(true);
        const data = await serviceS0517_STOCK_HISTORY.mgrUpdate_BUYER_CD(tObj);
        setLoadingTBL_KSV_STOCK_MATL(false);

        if (typeof data?.graphQLErrors === "undefined") {
            if (Array.isArray(data) && data.length > 0 && data[0].CODE) {
                alert(data[0].CODE);
            } else {
                alert("Update completed");
            }
            search_LIST_1({ STOCK_IDX: tStockIdx });
        } else {
            console.log(
                "mgrUpdate_BUYER_CD error => " +
                    JSON.stringify(data.graphQLErrors),
            );
        }
    };

    const cellEditorREMARK = (options) => {
        return (
            <InputText
                type="text"
                value={options.value || ""}
                onChange={(e) => options.editorCallback(e.target.value)}
                autoFocus
            />
        );
    };

    const onCellEditCompleteREMARK = (e) => {
        const { rowData, newValue, field } = e;
        if (rowData[field] === newValue) return;
        const updated = datasTBL_KSV_STOCK_MATL.map((row) =>
            row.id === rowData.id ? { ...row, [field]: newValue } : row,
        );
        setDatasTBL_KSV_STOCK_MATL(updated);
    };

    const parseQty = (value) => {
        const tVal = String(value || "").replace(/,/g, "").trim();
        if (tVal === "") return 0;
        const tNum = parseFloat(tVal);
        if (Number.isNaN(tNum)) return Number.NaN;
        return tNum;
    };

    const cellEditorSTOCK_QTY = (options) => {
        return (
            <InputText
                type="text"
                value={options.value || ""}
                onChange={(e) => options.editorCallback(e.target.value)}
                autoFocus
            />
        );
    };

    const onCellEditCompleteSTOCK_QTY = (e) => {
        const { rowData, newValue } = e;
        const tStockQty = parseQty(newValue);
        if (Number.isNaN(tStockQty)) {
            alert("Qty must be numeric");
            return;
        }

        const tUseQty = parseQty(rowData.USE_QTY);
        if (Number.isNaN(tUseQty)) {
            alert("Use Qty must be numeric");
            return;
        }

        const tRemainQty = tStockQty - tUseQty;
        const updated = datasTBL_KSV_STOCK_MATL.map((row) =>
            row.id === rowData.id
                ? {
                      ...row,
                      STOCK_QTY: String(tStockQty),
                      USE_QTY: String(tUseQty),
                      REMAIN_QTY: String(tRemainQty),
                  }
                : row,
        );
        setDatasTBL_KSV_STOCK_MATL(updated);
    };

    const updateREMARK = async () => {
        const tStockIdx = (dataQRY_KSV_STOCK_MATL.STOCK_IDX || "").trim();

        if (tStockIdx === "") {
            alert("Stock Idx is required");
            return;
        }

        const tRows = datasTBL_KSV_STOCK_MATL
            .filter((row) => (row.STOCK_IDX || "").trim() !== "")
            .map((row) => ({
                STOCK_IDX: (row.STOCK_IDX || "").trim(),
                REMARK: (row.REMARK || "").trim(),
            }));

        if (tRows.length === 0) {
            alert("No rows to update");
            return;
        }

        setLoadingTBL_KSV_STOCK_MATL(true);
        const data = await serviceS0517_STOCK_HISTORY.mgrUpdate_REMARK({ DATAS: tRows });
        setLoadingTBL_KSV_STOCK_MATL(false);

        if (typeof data?.graphQLErrors === "undefined") {
            if (Array.isArray(data) && data.length > 0 && data[0].CODE) {
                alert(data[0].CODE);
            } else {
                alert("Update completed");
            }
            search_LIST_1({ STOCK_IDX: tStockIdx });
        } else {
            console.log(
                "mgrUpdate_REMARK error => " + JSON.stringify(data.graphQLErrors),
            );
        }
    };

    const updateQTY = async () => {
        const tStockIdx = (dataQRY_KSV_STOCK_MATL.STOCK_IDX || "").trim();

        if (tStockIdx === "") {
            alert("Stock Idx is required");
            return;
        }

        const tSelectedIds = selectedTBL_KSV_STOCK_MATL.map((r) => r.id);
        const tTargetRows = tSelectedIds.length > 0
            ? datasTBL_KSV_STOCK_MATL.filter((row) => tSelectedIds.includes(row.id))
            : datasTBL_KSV_STOCK_MATL.filter((row) => row.id === dataTBL_KSV_STOCK_MATL.id);

        if (tTargetRows.length === 0) {
            alert("Select one or more rows to update");
            return;
        }

        const tRows = [];
        for (let i = 0; i < tTargetRows.length; i++) {
            const tRow = tTargetRows[i];
            const tRowStockIdx = String(tRow.STOCK_IDX || "").trim();
            const tStockQty = parseQty(tRow.STOCK_QTY); // QTY
            const tUseQty = parseQty(tRow.USE_QTY); // USE QTY
            const tRemainQty = parseQty(tRow.REMAIN_QTY); // REMAIN QTY

            if (tRowStockIdx === "") continue;

            if (
                Number.isNaN(tStockQty) ||
                Number.isNaN(tUseQty) ||
                Number.isNaN(tRemainQty)
            ) {
                alert(`Invalid qty value. Stock#: ${tRowStockIdx}`);
                return;
            }

            if ((tUseQty + tRemainQty) - tStockQty > 0) {
                alert("Not same Qty - Total stock qty must equal use qty + remain qty.\n\n재고 총수량과 사용수량+남은수량이 같지 않습니다.");
                return;
            }

            tRows.push({
                STOCK_IDX: tRowStockIdx,
                STOCK_QTY: String(tStockQty),
                REMAIN_QTY: String(tRemainQty),
            });
        }

        if (tRows.length === 0) {
            alert("No rows to update");
            return;
        }

        setLoadingTBL_KSV_STOCK_MATL(true);
        const data = await serviceS0517_STOCK_HISTORY.mgrUpdate_QTY({ DATAS: tRows });
        setLoadingTBL_KSV_STOCK_MATL(false);

        if (typeof data?.graphQLErrors === "undefined") {
            if (Array.isArray(data) && data.length > 0 && data[0].CODE) {
                alert(data[0].CODE);
            } else {
                alert("Update completed");
            }
            search_LIST_1({ STOCK_IDX: tStockIdx });
        } else {
            console.log(
                "mgrUpdate_QTY error => " + JSON.stringify(data.graphQLErrors),
            );
        }
    };

    const updatePO_ORDER = async () => {
        const tTargetRow = getUpdateTargetRow();
        const tStockIdx = (
            (tTargetRow && tTargetRow.STOCK_IDX) ||
            dataQRY_KSV_STOCK_MATL.STOCK_IDX ||
            ""
        ).trim();
        const tPoCd = (dataQRY_KSV_STOCK_MATL.PO_CD || "").trim();
        const tOrderCd = (dataQRY_KSV_STOCK_MATL.ORDER_CD || "").trim();

        if (tStockIdx === "") {
            alert("Stock Idx is required");
            return;
        }

        const tObj = {
            STOCK_IDX: tStockIdx,
            PO_CD: tPoCd,
            ORDER_CD: tOrderCd,
        };

        setLoadingTBL_KSV_STOCK_MATL(true);
        const data = await serviceS0517_STOCK_HISTORY.mgrUpdate_PO_ORDER(tObj);
        setLoadingTBL_KSV_STOCK_MATL(false);

        if (typeof data?.graphQLErrors === "undefined") {
            if (Array.isArray(data) && data.length > 0 && data[0].CODE) {
                alert(data[0].CODE);
            } else {
                alert("Update completed");
            }
            search_LIST_1({ STOCK_IDX: tStockIdx });
        } else {
            console.log(
                "mgrUpdate_PO_ORDER error => " + JSON.stringify(data.graphQLErrors),
            );
        }
    };

    const printLIST = async () => {
        const tStockIdx = (dataQRY_KSV_STOCK_MATL.STOCK_IDX || "").trim();

        if (tStockIdx === "") {
            alert("Stock Idx is required");
            return;
        }

        setLoadingTBL_KSV_STOCK_MATL(true);
        const data = await serviceS0517_STOCK_HISTORY.mgrQuery_LIST_EXCEL({
            STOCK_IDX: tStockIdx,
        });
        setLoadingTBL_KSV_STOCK_MATL(false);

        if (typeof data?.graphQLErrors === "undefined") {
            if (Array.isArray(data) && data.length > 0 && String(data[0].CODE || "").includes("SUCCEED:?")) {
                const tCodes = String(data[0].CODE).split("?");
                if (tCodes.length >= 3) {
                    serviceLib.downloadFile(tCodes[2].toString(), tCodes[1].toString());
                    return;
                }
            }

            if (Array.isArray(data) && data.length > 0 && data[0].CODE) {
                alert(data[0].CODE);
            } else {
                alert("Excel print failed");
            }
        } else {
            console.log(
                "mgrQuery_LIST_EXCEL error => " + JSON.stringify(data.graphQLErrors),
            );
        }
    };

    const blankFn = () => {};

    // Support Area

    return (
        <div className="af-div-main">
            <div
                className="af-div-first"
                style={{ width: "123rem", height: "16rem" }}
            >
                <span className="af-span-3-0" style={{ width: "21rem" }}>
                    <p className="af-span-p" style={{ width: "10rem" }}>Matl#</p>
                    <div className="af-span-div" style={{ width: "10rem" }}>
                        <InputText
                            style={{ width: "10rem" }}
                            id="id_MATL_NAME"
                            className={classNames({
                                "af-matl-cd-blink": flagMatlCdBlink,
                            })}
                            value={dataQRY_KSV_STOCK_MATL.MATL_CD}
                            onChange={(e) =>
                                onInputChangeQRY_KSV_STOCK_MATL_MATL_CD(
                                    e,
                                    "MATL_CD",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "13rem" }}>
                    <div className="af-span-div-btn" style={{ width: "12rem" }}>
                        <Button
                            label="Matl Code Update"
                            accessKey="S"
                            id="btnSearch"
                            style={{ width: "11rem" }}
                            className="p-button-text"
                            onClick={updateMATL_CD}
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "76rem" }}>
                    <p className="af-span-p" style={{ width: "10rem" }}>Stock Idx</p>
                    <div className="af-span-div" style={{ width: "10rem" }}>
                        <InputText
                            disabled
                            style={{ width: "9rem" }}
                            id="id_MATL_NAME"
                            value={dataQRY_KSV_STOCK_MATL.STOCK_IDX}
                            onChange={(e) =>
                                onInputChangeQRY_KSV_STOCK_MATL_STOCK_IDX(
                                    e,
                                    "STOCK_IDX",
                                )
                            }
                        />
                    </div>
                </span>

                <span className="af-span-3" style={{ width: "55rem" }}>
                    <p className="af-span-p" style={{ width: "10rem" }}>Supplier</p>
                    <div className="af-span-div" style={{ width: "44rem" }}>
                        <InputText
                            disabled
                            style={{ width: "44rem" }}
                            id="id_MATL_NAME"
                            value={dataQRY_KSV_STOCK_MATL.VENDOR_NAME}
                            onChange={(e) =>
                                onInputChangeQRY_KSV_STOCK_MATL_VENDOR_NAME(
                                    e,
                                    "VENDOR_NAME",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "13rem" }}>
                    <p className="af-span-p" style={{ width: "2rem" }}>PO#</p>
                    <div className="af-span-div" style={{ width: "10rem" }}>
                        <Dropdown
                            style={{ width: "10rem" }}
                            id="id_PO_CD"
                            value={dataQRY_KSV_STOCK_MATL.PO_CD}
                            onChange={(e) =>
                                onDropdownChangeQRY_KSV_STOCK_MATL_PO_CD(
                                    e,
                                    "PO_CD",
                                )
                            }
                            options={datasQRY_KSV_STOCK_MATL_PO_CD}
                            filter
                            editable
                        ></Dropdown>
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "14rem" }}>
                    <p className="af-span-p" style={{ width: "3rem" }}>Order#</p>
                    <div className="af-span-div" style={{ width: "10rem" }}>
                        <Dropdown
                            style={{ width: "10rem" }}
                            id="id_ORDER_CD"
                            value={dataQRY_KSV_STOCK_MATL.ORDER_CD}
                            onChange={(e) =>
                                onDropdownChangeQRY_KSV_STOCK_MATL_ORDER_CD(
                                    e,
                                    "ORDER_CD",
                                )
                            }
                            options={datasQRY_KSV_STOCK_MATL_ORDER_CD}
                            filter
                            editable
                        ></Dropdown>
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "13rem" }}>
                    <div className="af-span-div-btn" style={{ width: "13rem" }}>
                        <Button
                            label="PO/ORDER Update"
                            id="btnSearch"
                            style={{ width: "11rem" }}
                            className="p-button-text"
                            onClick={updatePO_ORDER}
                        />
                    </div>
                </span>

                <span className="af-span-3" style={{ width: "120rem" }}>
                    <p className="af-span-p" style={{ width: "10rem" }}>Description</p>
                    <div className="af-span-div" style={{ width: "44rem" }}>
                        <InputText
                            disabled
                            style={{ width: "44rem" }}
                            id="id_MATL_NAME"
                            value={dataQRY_KSV_STOCK_MATL.MATL_NAME}
                            onChange={(e) =>
                                onInputChangeQRY_KSV_STOCK_MATL_MATL_NAME(
                                    e,
                                    "MATL_NAME",
                                )
                            }
                        />
                    </div>
                </span>

                <span className="af-span-3" style={{ width: "120rem" }}>
                    <p className="af-span-p" style={{ width: "10rem" }}>Color</p>
                    <div className="af-span-div" style={{ width: "44rem" }}>
                        <InputText
                            disabled
                            style={{ width: "44rem" }}
                            id="id_MATL_NAME"
                            value={dataQRY_KSV_STOCK_MATL.COLOR}
                            onChange={(e) =>
                                onInputChangeQRY_KSV_STOCK_MATL_COLOR(
                                    e,
                                    "COLOR",
                                )
                            }
                        />
                    </div>
                </span>

                <span className="af-span-3" style={{ width: "120rem" }}>
                    <p className="af-span-p" style={{ width: "10rem" }}>Spec</p>
                    <div className="af-span-div" style={{ width: "44rem" }}>
                        <InputText
                            disabled
                            style={{ width: "44rem" }}
                            id="id_MATL_NAME"
                            value={dataQRY_KSV_STOCK_MATL.SPEC}
                            onChange={(e) =>
                                onInputChangeQRY_KSV_STOCK_MATL_SPEC(e, "SPEC")
                            }
                        />
                    </div>
                </span>

                <span className="af-span-3" style={{ width: "120rem" }}>
                    <p className="af-span-p" style={{ width: "10rem" }}>Unit</p>
                    <div className="af-span-div" style={{ width: "44rem" }}>
                        <InputText
                            disabled
                            style={{ width: "44rem" }}
                            id="id_MATL_NAME"
                            value={dataQRY_KSV_STOCK_MATL.UNIT}
                            onChange={(e) =>
                                onInputChangeQRY_KSV_STOCK_MATL_UNIT(e, "UNIT")
                            }
                        />
                    </div>
                </span>

                <span className="af-span-3" style={{ width: "55rem" }}>
                    <p className="af-span-p" style={{ width: "10rem" }}>Buyer</p>
                    <div className="af-span-div" style={{ width: "34rem" }}>
                        <Dropdown
                            style={{ width: "34rem" }}
                            id="id_FACTORY_CD"
                            value={dataQRY_KSV_STOCK_MATL_BUYER_CD}
                            onChange={(e) =>
                                onDropdownChangeQRY_KSV_STOCK_MATL_BUYER_CD(
                                    e,
                                    "BUYER_CD",
                                )
                            }
                            options={datasQRY_KSV_STOCK_MATL_BUYER_CD}
                            optionLabel="BUYER_NAME"
                            placeholder=""
                            filter
                        ></Dropdown>
                    </div>
                    <div className="af-span-div-btn" style={{ width: "10rem" }}>
                        
                        <Button
                            label="Buyer Update"
                            id="btnSearch"
                            style={{ width: "10rem" }}
                            className="p-button-text"
                            onClick={updateBUYER_CD}
                        />
                    </div>
                </span>

                <span className="af-span-3" style={{ width: "55rem" }}>
                    <div className="af-span-div-btn" style={{ width: "10rem" }}>
                        
                        <Button
                            label="Remark Update"
                            id="btnSearch"
                            style={{ width: "10rem" }}
                            className="p-button-text"
                            onClick={updateREMARK}
                        />
                    </div>
                    <div className="af-span-div-btn" style={{ width: "10rem" }}>
                        
                        <Button
                            label="Qty Update"
                            id="btnSearch"
                            style={{ width: "10rem" }}
                            className="p-button-text"
                            onClick={updateQTY}
                        />
                    </div>
                    <div className="af-span-div-btn" style={{ width: "10rem" }}>

                        <Button
                            label="List"
                            id="btnSearch"
                            style={{ width: "10rem" }}
                            className="p-button-text green"
                            onClick={printLIST}
                        />
                    </div>
                </span>
            </div>

            <div
                className="af-div-first"
                style={{ width: "123rem", height: "3rem", display: "none" }}
            >
                <span className="af-span-3-0" style={{ width: "12rem" }}>
                    <p className="af-span-p" style={{ width: "1rem" }}> </p>
                    <div className="af-span-div" style={{ width: "10rem" }}>
                        <InputText
                            disabled
                            style={{ width: "10rem" }}
                            id="id_MATL_NAME"
                            value={dataQRY_KSV_STOCK_MATL.STOCK_QTY}
                            onChange={(e) =>
                                onInputChangeQRY_KSV_STOCK_MATL_STOCK_QTY(
                                    e,
                                    "STOCK_QTY",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "12rem" }}>
                    <p className="af-span-p" style={{ width: "1rem" }}> </p>
                    <div className="af-span-div" style={{ width: "10rem" }}>
                        <InputText
                            disabled
                            style={{ width: "10rem" }}
                            id="id_MATL_NAME"
                            value={dataQRY_KSV_STOCK_MATL.REMAIN_QTY}
                            onChange={(e) =>
                                onInputChangeQRY_KSV_STOCK_MATL_REMAIN_QTY(
                                    e,
                                    "REMAIN_QTY",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "12rem" }}>
                    <p className="af-span-p" style={{ width: "1rem" }}> </p>
                    <div className="af-span-div" style={{ width: "10rem" }}>
                        <InputText
                            disabled
                            style={{ width: "10rem" }}
                            id="id_MATL_NAME"
                            value={dataQRY_KSV_STOCK_MATL.USE_QTY}
                            onChange={(e) =>
                                onInputChangeQRY_KSV_STOCK_MATL_USE_QTY(
                                    e,
                                    "USE_QTY",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "12rem" }}>
                    <p className="af-span-p" style={{ width: "1rem" }}> </p>
                    <div className="af-span-div" style={{ width: "10rem" }}>
                        <InputText
                            disabled
                            style={{ width: "10rem" }}
                            id="id_MATL_NAME"
                            value={dataQRY_KSV_STOCK_MATL.OUT_QTY}
                            onChange={(e) =>
                                onInputChangeQRY_KSV_STOCK_MATL_OUT_QTY(
                                    e,
                                    "OUT_QTY",
                                )
                            }
                        />
                    </div>
                </span>
            </div>

            <div
                className="af-div-first"
                style={{ width: "123rem", height: "36rem" }}
            >
                <AFDataTable preventUnrelatedRerender
                    ref={dt_TBL_KSV_STOCK_MATL}
                    size="small"
                    value={datasTBL_KSV_STOCK_MATL}
                    tableStyle={{ tableLayout: "fixed" }}
                    loading={loadingTBL_KSV_STOCK_MATL}
                    resizableColumns
                    columnResizeMode="expand"
                    showGridlines
                    selectionMode="checkbox"
                    selection={selectedTBL_KSV_STOCK_MATL}
                    onSelectionChange={(e) => {
                        setSelectedTBL_KSV_STOCK_MATL(e.value);
                        onRowClick1TBL_KSV_STOCK_MATL(e.value);
                    }}
                    onRowClick={onRowClickTBL_KSV_STOCK_MATL}
                    dataKey="id"
                    className="datatable-responsive"
                    virtualScrollerOptions={{ itemSize: 20 }}
                    emptyMessage=" " //header={headerTBL_KSV_STOCK_MATL}
                    responsiveLayout="scroll"
                    scrollable
                    scrollHeight="36rem"
                >
                    <AFColumn field="STOCK_IDX" headerClassName="t-header" header="Stock#" style={{ width: "8rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="ORG_STOCK_IDX" headerClassName="t-header" header="Org Stock#" style={{ width: "8rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="PO_CD" headerClassName="t-header" header="PO#" style={{ width: "7rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="ORDER_CD" headerClassName="t-header" header="Order#" style={{ width: "7rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="MATL_CD" headerClassName="t-header" header="Matl#" style={{ width: "6rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="STOCK_DATE" headerClassName="t-header" header="Out Date" style={{ width: "8rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="REG_DATETIME" headerClassName="t-header" header="Reg Date" style={{ width: "8rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="STOCK_STATUS_S_N" headerClassName="t-header" header="Status" style={{ width: "4rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="STOCK_STATUS_2" headerClassName="t-header" header="Status2" style={{ width: "4rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="STOCK_QTY" headerClassName="t-header" header="Qty" style={{ width: "6rem", flexBasis: "auto" }} className="green" editor={(options) => cellEditorSTOCK_QTY(options)} onCellEditComplete={onCellEditCompleteSTOCK_QTY}></AFColumn>
                    <AFColumn field="REMAIN_QTY" headerClassName="t-header" header="Remain Qty" style={{ width: "6rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="USE_QTY" headerClassName="t-header" header="Use Qty" style={{ width: "6rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="OUT_QTY" headerClassName="t-header" header="Out Qty" style={{ width: "6rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="REG_USER" headerClassName="t-header" header="Reg User" style={{ width: "6rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="REMARK" headerClassName="t-header" header="Remark" style={{ width: "10rem", flexBasis: "auto" }} className="green" editor={(options) => cellEditorREMARK(options)} onCellEditComplete={onCellEditCompleteREMARK}></AFColumn>
                    <AFColumn field="USE_PO_CD" headerClassName="t-header" header="Use Po Cd" style={{ width: "6rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="USE_PO_SEQ" headerClassName="t-header" header="Use Po Seq" style={{ width: "6rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="USE_ORDER_CD" headerClassName="t-header" header="Use Order Cd" style={{ width: "6rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="USE_QTY2" headerClassName="t-header" header="Use Order Cd" style={{ width: "6rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="USE_DATETIME" headerClassName="t-header" header="Use Date" style={{ width: "6rem", flexBasis: "auto" }} ></AFColumn>
                </AFDataTable>
            </div>

            <Toast ref={toast} />
        </div>
    );
};

const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(S0517_STOCK_HISTORY, comparisonFn);
