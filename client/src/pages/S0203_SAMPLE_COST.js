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
import axios from "axios";

import { ServiceLib } from "../service/service_lib/ServiceLib";
import { ServiceS0203_SAMPLE_COST } from "../service/service_biz/ServiceS0203_SAMPLE_COST";

// import './page_common.scss';

const emptyKCD_CODE = {
    id: 0,
    CD_GROUP: "",
    CD_CODE: "",
    CD_NAME: "",
    CD_FLAG: "",
};

const emptyQRY_KZZ_SAMPLE_COST = {
    IS_DATE: "",
    S_DATE: "",
    E_DATE: "",
    STYLE_CD: "",
    ORDER_CD: "",
    BUYER_CD: "",
    WORK_TYPE: "",
    PATT_USER: "",
    SEW_USER: "",
};

const emptyTBL_KCD_STYLE = {
    id: 0,
    SAMPLE_SEQ: "",
    BUYER_NAME: "",
    BUYER_CD: "",
    STYLE_NAME: "",
    STYLE_CD: "",
    ORDER_CD: "",
    ORG_DUE_DATE: "",
    DUE_DATE: "",
    WORK_TYPE_NAME: "",
    WORK_TYPE: "",
    TOTAL_COST: "",
    PATT_USER: "",
    PATT_COST: "",
    ORDER_QTY: "",
    SEW_USER: "",
    SEW_COST: "",
    WELDING_COST: "",
    SUB_PATT_COST: "",
    SUB_SEW_COST: "",
    SUB_WELDING_COST: "",
    REPAIR_QTY: "",
    REPAIR_COST: "",
    REMARK: "",
    ETC_AMOUNT: "",
    SAMPLE_END_FLAG: "",
    SAMPLE_END_DATE: "",
    ORDER_STATUS: "",
    REG_USER: "",
    REG_DATETIME: "",
    CUTTING_USER: "",
    COMPLETE_USER: "",
    COMPLETE_COST: "",
    WORK_TYPE_NAME: "",
    PATT_LOSS_TIME: "",
    SEW_LOSS_TIME: "",
    PATT3D_USER: "",
    PATT3D_COST: "",
    WORK3D_USER: "",
    WORK3D_COST: "",
    COLOR3D_COST: "",
};

const emptyEDT_KZZ_SAMPLE_COST = {
    SAMPLE_END_DATE: "",
    WORK_TYPE: " ",
    WORK_KIND: " ",
    REPAIR_QTY: "",
    ORDER_CD: "",
    BUYER_CD: "",
    STYLE_CD: "",
    REMARK: "",
    PATT_LOSS: " ",
    PATT_LOSS_TIME: "",
    SEW_LOSS: " ",
    SEW_LOSS_TIME: "",
    ETC_AMOUNT: "",
    SAMPLE_CD: "",
    SAMPLE_CD_1: "",
    SAMPLE_CD_2: "",
    PATT_USER: " ",
    PATT_COST: " ",
    PATT_AMT: "",
    SEW_USER: " ",
    SEW_COST: " ",
    SEW_AMT: "",
    WELDING_COST: "",
    WELDING_AMT: "",
    CUTTING_USER: " ",
    COMPLETE_USER: " ",
    PATT3D_USER: " ",
    PATT3D_COST: " ",
    PATT3D_AMT: "",
    WORK3D_USER: " ",
    WORK3D_COST: " ",
    WORK3D_AMT: "",
    COLOR3D_QTY: "",
    COLOR3D_AMT: "",
};

const S0203_SAMPLE_COST = () => {
    const serviceLibRef = useRef(null);
    if (!serviceLibRef.current) {
        serviceLibRef.current = new ServiceLib();
        serviceLibRef.current.loginConfirm();
    }
    const serviceLib = serviceLibRef.current;
    const serviceS0203_SAMPLE_COSTRef = useRef(null);
    if (!serviceS0203_SAMPLE_COSTRef.current) serviceS0203_SAMPLE_COSTRef.current = new ServiceS0203_SAMPLE_COST();
    const serviceS0203_SAMPLE_COST = serviceS0203_SAMPLE_COSTRef.current;

    const toast = useRef(null);

    const [loading, setLoading] = useState(false);

    const [disabled1, setDisabled1] = useState(true);
    const [disabled2, setDisabled2] = useState(true);
    const [disabled3, setDisabled3] = useState(true);
    const [disabled4, setDisabled4] = useState(true);
    const [disabled5, setDisabled5] = useState(true);

    /* splitter 관련 */
    const [styleVal, setStyleVal] = useState({ width: "65vw" });

    const process_UPDATE_SAMPLE_COST = () => {
        var tInObj = { ...dataEDT_KZZ_SAMPLE_COST };
        tInObj.PATT3D_AMT = String(tInObj.PATT3D_AMT);
        tInObj.WORK3D_AMT = String(tInObj.WORK3D_AMT);

        console.log(tInObj);
        serviceS0203_SAMPLE_COST
            .mgrUpdateEDT_KZZ_SAMPLE_COST(tInObj)
            .then((data) => {
                if (typeof data.graphQLErrors === "undefined") {
                    if (data.length > 0 && data[0].CODE.includes("SUCC")) {
                        toast.current.show({
                            severity: "success",
                            summary: "Sample cost Success",
                            detail: data[0].CODE,
                            life: 3000,
                        });

                        search_LIST_1();
                    } else {
                        toast.current.show({
                            severity: "success",
                            summary: "Sample cost Fail",
                            detail: data[0].CODE,
                            life: 3000,
                        });
                        console.log(
                            "serviceS0203_SAMPLE_COST.mgrQueryTBL_KCD_STYLE error => " +
                                JSON.stringify(data.graphQLErrors),
                        );
                    }
                } else {
                    console.log(
                        "serviceS0203_SAMPLE_COST.mgrQueryTBL_KCD_STYLE error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                    toast.current.show({
                        severity: "success",
                        summary: "Query Error",
                        detail: JSON.stringify(data.graphQLErrors),
                        life: 3000,
                    });
                }
            });
    };

    const process_UPDATE_SAMPLE_COST_END = () => {
        var tInObj = { ...dataEDT_KZZ_SAMPLE_COST };

        if (tInObj.SAMPLE_END_DATE === "" || tInObj.SAMPLE_END_DATE === null) {
            toast.current.show({
                severity: "success",
                summary: "Info",
                detail: "End Date을 넣으세요",
                life: 3000,
            });
            return;
        }

        serviceS0203_SAMPLE_COST
            .mgrUpdateEDT_KZZ_SAMPLE_COST_END(tInObj)
            .then((data) => {
                if (typeof data.graphQLErrors === "undefined") {
                    if (data.length > 0 && data[0].CODE.includes("SUCC")) {
                        toast.current.show({
                            severity: "success",
                            summary: "Sample cost Success",
                            detail: data[0].CODE,
                            life: 3000,
                        });

                        search_LIST_1();
                    } else {
                        toast.current.show({
                            severity: "success",
                            summary: "Sample cost Fail",
                            detail: data[0].CODE,
                            life: 3000,
                        });
                        console.log(
                            "serviceS0203_SAMPLE_COST.mgrQueryTBL_KCD_STYLE error => " +
                                JSON.stringify(data.graphQLErrors),
                        );
                    }
                } else {
                    console.log(
                        "serviceS0203_SAMPLE_COST.mgrQueryTBL_KCD_STYLE error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                    toast.current.show({
                        severity: "success",
                        summary: "Query Error",
                        detail: JSON.stringify(data.graphQLErrors),
                        life: 3000,
                    });
                }
            });
    };

    const process_UPDATE_SAMPLE_COST_SPW_3D = () => {
        var tInObj = { ...dataEDT_KZZ_SAMPLE_COST };

        serviceS0203_SAMPLE_COST
            .mgrUpdateEDT_KZZ_SAMPLE_COST_SPW_3D(tInObj)
            .then((data) => {
                if (typeof data.graphQLErrors === "undefined") {
                    if (data.length > 0 && data[0].CODE.includes("SUCC")) {
                        toast.current.show({
                            severity: "success",
                            summary: "Sample cost Success",
                            detail: data[0].CODE,
                            life: 3000,
                        });

                        search_LIST_1();
                    } else {
                        toast.current.show({
                            severity: "success",
                            summary: "Sample cost Fail",
                            detail: data[0].CODE,
                            life: 3000,
                        });
                        console.log(
                            "serviceS0203_SAMPLE_COST.mgrQueryTBL_KCD_STYLE error => " +
                                JSON.stringify(data.graphQLErrors),
                        );
                    }
                } else {
                    console.log(
                        "serviceS0203_SAMPLE_COST.mgrQueryTBL_KCD_STYLE error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                    toast.current.show({
                        severity: "success",
                        summary: "Query Error",
                        detail: JSON.stringify(data.graphQLErrors),
                        life: 3000,
                    });
                }
            });
    };

    const search_LIST_1 = () => {
        var tObj = { ...dataQRY_KZZ_SAMPLE_COST };
        // tObj.S_DATE = getDateVal(tObj.S_DATE);
        // tObj.E_DATE = getDateVal(tObj.E_DATE);
        tObj.STYLE_CD = tObj.STYLE_CD.trim();

        setLoading(true);
        // Effect
        serviceS0203_SAMPLE_COST.mgrQueryTBL_KCD_STYLE(tObj).then((data) => {
            setLoading(false);
            if (typeof data.graphQLErrors === "undefined") {
                console.log(
                    "serviceS0203_SAMPLE_COST.mgrQueryTBL_KCD_STYLE call => " +
                        data.length,
                );
                var tArray = [];
                data.forEach((col, i) => {
                    var tObj = { ...col };
                    tObj.id = i + 1;
                    tArray.push(tObj);
                });
                setDatasTBL_KCD_STYLE(tArray);
            } else {
                console.log(
                    "serviceS0203_SAMPLE_COST.mgrQueryTBL_KCD_STYLE error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });
    };

    const search_KCD_STYLE = (argData) => {
        setLoading(true);
        serviceS0203_SAMPLE_COST
            .mgrQuery_KCD_STYLE_BUYER_CD(argData)
            .then((data) => {
                setLoading(false);
                if (typeof data.graphQLErrors === "undefined") {
                    if (data.length > 0) {
                        setDatasQRY_KZZ_SAMPLE_COST_STYLE_CD(data);
                        setDataQRY_KZZ_SAMPLE_COST_STYLE_CD(data[0]);
                    }
                } else {
                    console.log(
                        "serviceS0203_SAMPLE_COST.mgrQueryTBL_KCD_STYLE error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });
    };

    const search_KCD_STYLE2 = (argData, argData1) => {
        var tInObj = {};
        tInObj.BUYER_CD = argData.BUYER_CD;

        setLoading(true);
        serviceS0203_SAMPLE_COST
            .mgrQuery_KCD_STYLE_BUYER_CD(tInObj)
            .then((data) => {
                setLoading(false);
                if (typeof data.graphQLErrors === "undefined") {
                    if (data.length > 0) {
                        setDatasEDT_KZZ_SAMPLE_COST_STYLE_CD(data);
                        var tObj = {};
                        data.forEach((col, i) => {
                            if (col.STYLE_CD === argData1.STYLE_CD)
                                tObj = { ...col };
                        });
                        if (typeof tObj.STYLE_CD !== "undefined")
                            setDataEDT_KZZ_SAMPLE_COST_STYLE_CD(tObj);
                        else setDataEDT_KZZ_SAMPLE_COST_STYLE_CD(data[0]);
                    }
                } else {
                    console.log(
                        "serviceS0203_SAMPLE_COST.mgrQueryTBL_KCD_STYLE error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });
    };

    const excel_REPORT_1 = () => {
        var tObj = { ...dataQRY_KZZ_SAMPLE_COST };
        // tObj.S_DATE = getDateVal(tObj.S_DATE);
        // tObj.E_DATE = getDateVal(tObj.E_DATE);

        setLoading(true);
        // Effect
        serviceS0203_SAMPLE_COST.mgrQuery_REPORT_1(tObj).then((data) => {
            setLoading(false);
            if (typeof data.graphQLErrors === "undefined") {
                if (data.length > 0) {
                    console.log(
                        "ServiceNawooAll.mgrQueryTBL_KCD_STYLE() call => " +
                            data[0].CODE,
                    );
                    toast.current.show({
                        severity: "success",
                        summary: "REPORT_1",
                        detail: data[0].CODE,
                        life: 3000,
                    });
                    if (data[0].CODE.includes("SUCC")) {
                        alert(data[0].CODE);
                        const fileUrl = data[0].CODE.split("?")[2].toString();
                        const fileName = data[0].CODE.split("?")[1].toString();
                        serviceLib.downloadFile(fileUrl, fileName);
                    }
                }
            } else {
                console.log(
                    "serviceS0203_SAMPLE_COST.mgrQueryTBL_KCD_STYLE error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });
    };

    /* QRY KZZ_SAMPLE_COST*/
    const [dataQRY_KZZ_SAMPLE_COST, setDataQRY_KZZ_SAMPLE_COST] = useState(
        emptyQRY_KZZ_SAMPLE_COST,
    );

    const onCheckboxChangeQRY_KZZ_SAMPLE_COST_IS_DATE = (e, name) => {
        let val = "";
        let _dataQRY_KZZ_SAMPLE_COST = { ...dataQRY_KZZ_SAMPLE_COST };
        if (e.checked) {
            val = "1";
        } else {
            val = "0";
        }
        _dataQRY_KZZ_SAMPLE_COST[`${name}`] = val;
        setDataQRY_KZZ_SAMPLE_COST(_dataQRY_KZZ_SAMPLE_COST);
    };

    const onCalChangeQRY_KZZ_SAMPLE_COST_S_DATE = (e, name) => {
        let val1 = e.value || "";
        let val = "";
        if (val1 === "") {
            val = "";
        } else {
            val = getDateVal(val1);
        }

        let _dataQRY_KZZ_SAMPLE_COST = { ...dataQRY_KZZ_SAMPLE_COST };
        _dataQRY_KZZ_SAMPLE_COST[`${name}`] = val;
        setDataQRY_KZZ_SAMPLE_COST(_dataQRY_KZZ_SAMPLE_COST);
    };

    const onCalChangeQRY_KZZ_SAMPLE_COST_E_DATE = (e, name) => {
        let val1 = e.value || "";
        let val = "";
        if (val1 === "") {
            val = "";
        } else {
            val = getDateVal(val1);
        }

        let _dataQRY_KZZ_SAMPLE_COST = { ...dataQRY_KZZ_SAMPLE_COST };
        _dataQRY_KZZ_SAMPLE_COST[`${name}`] = val;
        setDataQRY_KZZ_SAMPLE_COST(_dataQRY_KZZ_SAMPLE_COST);
    };

    const onInputChangeQRY_KZZ_SAMPLE_COST_ORDER_CD = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KZZ_SAMPLE_COST = { ...dataQRY_KZZ_SAMPLE_COST };

        let tTypeVal = _dataQRY_KZZ_SAMPLE_COST[`${name}`];
        if (typeof tTypeVal === "string")
            _dataQRY_KZZ_SAMPLE_COST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KZZ_SAMPLE_COST[`${name}`] = parseInt(val);

        setDataQRY_KZZ_SAMPLE_COST(_dataQRY_KZZ_SAMPLE_COST);
    };

    const [
        datasQRY_KZZ_SAMPLE_COST_BUYER_CD,
        setDatasQRY_KZZ_SAMPLE_COST_BUYER_CD,
    ] = useState([]);
    const [
        dataQRY_KZZ_SAMPLE_COST_BUYER_CD,
        setDataQRY_KZZ_SAMPLE_COST_BUYER_CD,
    ] = useState({});

    const onDropdownChangeQRY_KZZ_SAMPLE_COST_BUYER_CD = (e, name) => {
        let val = (e.value && e.value.BUYER_CD) || "";

        let _dataQRY_KZZ_SAMPLE_COST = { ...dataQRY_KZZ_SAMPLE_COST };

        let tTypeVal = _dataQRY_KZZ_SAMPLE_COST[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KZZ_SAMPLE_COST[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KZZ_SAMPLE_COST[`${name}`] = parseInt(val);
        }

        setDataQRY_KZZ_SAMPLE_COST(_dataQRY_KZZ_SAMPLE_COST);
        setDataQRY_KZZ_SAMPLE_COST_BUYER_CD(e.value);

        search_KCD_STYLE(_dataQRY_KZZ_SAMPLE_COST);
    };

    const [
        datasQRY_KZZ_SAMPLE_COST_STYLE_CD,
        setDatasQRY_KZZ_SAMPLE_COST_STYLE_CD,
    ] = useState([]);
    const [
        dataQRY_KZZ_SAMPLE_COST_STYLE_CD,
        setDataQRY_KZZ_SAMPLE_COST_STYLE_CD,
    ] = useState({});

    const onDropdownChangeQRY_KZZ_SAMPLE_COST_STYLE_CD = (e, name) => {
        if (typeof e.value === "string") {
        } else {
            let val = (e.value && e.value.STYLE_CD) || "";

            let _dataQRY_KZZ_SAMPLE_COST = { ...dataQRY_KZZ_SAMPLE_COST };

            let tTypeVal = _dataQRY_KZZ_SAMPLE_COST[`${name}`];
            if (typeof tTypeVal === "string" && typeof val === "string") {
                _dataQRY_KZZ_SAMPLE_COST[`${name}`] = String(val);
            } else if (
                typeof tTypeVal === "number" &&
                typeof val === "string"
            ) {
                _dataQRY_KZZ_SAMPLE_COST[`${name}`] = parseInt(val);
            }
            setDataQRY_KZZ_SAMPLE_COST(_dataQRY_KZZ_SAMPLE_COST);
            setDataQRY_KZZ_SAMPLE_COST_STYLE_CD(e.value);
        }
    };

    const [
        datasQRY_KZZ_SAMPLE_COST_WORK_TYPE,
        setDatasQRY_KZZ_SAMPLE_COST_WORK_TYPE,
    ] = useState([]);
    const [
        dataQRY_KZZ_SAMPLE_COST_WORK_TYPE,
        setDataQRY_KZZ_SAMPLE_COST_WORK_TYPE,
    ] = useState({});

    const onDropdownChangeQRY_KZZ_SAMPLE_COST_WORK_TYPE = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataQRY_KZZ_SAMPLE_COST = { ...dataQRY_KZZ_SAMPLE_COST };

        let tTypeVal = _dataQRY_KZZ_SAMPLE_COST[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KZZ_SAMPLE_COST[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KZZ_SAMPLE_COST[`${name}`] = parseInt(val);
        }

        setDataQRY_KZZ_SAMPLE_COST(_dataQRY_KZZ_SAMPLE_COST);
        setDataQRY_KZZ_SAMPLE_COST_WORK_TYPE(e.value);
    };

    const [
        datasQRY_KZZ_SAMPLE_COST_PATT_USER,
        setDatasQRY_KZZ_SAMPLE_COST_PATT_USER,
    ] = useState([]);
    const [
        dataQRY_KZZ_SAMPLE_COST_PATT_USER,
        setDataQRY_KZZ_SAMPLE_COST_PATT_USER,
    ] = useState({});

    const onDropdownChangeQRY_KZZ_SAMPLE_COST_PATT_USER = (e, name) => {
        let val = (e.value && e.value.USER_ID) || "";

        let _dataQRY_KZZ_SAMPLE_COST = { ...dataQRY_KZZ_SAMPLE_COST };

        let tTypeVal = _dataQRY_KZZ_SAMPLE_COST[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KZZ_SAMPLE_COST[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KZZ_SAMPLE_COST[`${name}`] = parseInt(val);
        }

        setDataQRY_KZZ_SAMPLE_COST(_dataQRY_KZZ_SAMPLE_COST);
        setDataQRY_KZZ_SAMPLE_COST_PATT_USER(e.value);
    };

    const [
        datasQRY_KZZ_SAMPLE_COST_SEW_USER,
        setDatasQRY_KZZ_SAMPLE_COST_SEW_USER,
    ] = useState([]);
    const [
        dataQRY_KZZ_SAMPLE_COST_SEW_USER,
        setDataQRY_KZZ_SAMPLE_COST_SEW_USER,
    ] = useState({});

    const onDropdownChangeQRY_KZZ_SAMPLE_COST_SEW_USER = (e, name) => {
        let val = (e.value && e.value.USER_ID) || "";

        let _dataQRY_KZZ_SAMPLE_COST = { ...dataQRY_KZZ_SAMPLE_COST };

        let tTypeVal = _dataQRY_KZZ_SAMPLE_COST[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KZZ_SAMPLE_COST[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KZZ_SAMPLE_COST[`${name}`] = parseInt(val);
        }

        setDataQRY_KZZ_SAMPLE_COST(_dataQRY_KZZ_SAMPLE_COST);
        setDataQRY_KZZ_SAMPLE_COST_SEW_USER(e.value);
    };

    const reset_QRY = () => {
        setDataQRY_KZZ_SAMPLE_COST(emptyQRY_KZZ_SAMPLE_COST);
        setDataQRY_KZZ_SAMPLE_COST_BUYER_CD(
            datasQRY_KZZ_SAMPLE_COST_BUYER_CD[0],
        );
        setDataQRY_KZZ_SAMPLE_COST_STYLE_CD(
            datasQRY_KZZ_SAMPLE_COST_STYLE_CD[0],
        );
        setDataQRY_KZZ_SAMPLE_COST_WORK_TYPE(
            datasQRY_KZZ_SAMPLE_COST_WORK_TYPE[0],
        );
        setDataQRY_KZZ_SAMPLE_COST_SEW_USER(
            datasQRY_KZZ_SAMPLE_COST_SEW_USER[0],
        );
        setDataQRY_KZZ_SAMPLE_COST_PATT_USER(
            datasQRY_KZZ_SAMPLE_COST_PATT_USER[0],
        );
        setDatasTBL_KCD_STYLE([]);
        setSelectedTBL_KCD_STYLE([]);
        reset_EDT();
    };

    /*TABLE KZZ_SAMPLE_COST */
    // DEFINE DATAGRID : TBL_KCD_STYLE
    const [datasTBL_KCD_STYLE, setDatasTBL_KCD_STYLE] = useState([]);
    const dt_TBL_KCD_STYLE = useRef(null);
    const [dataTBL_KCD_STYLE, setDataTBL_KCD_STYLE] =
        useState(emptyTBL_KCD_STYLE);
    const [selectedTBL_KCD_STYLE, setSelectedTBL_KCD_STYLE] = useState([]);
    const [flagSelectModeTBL_KCD_STYLE, setFlagSelectModeTBL_KCD_STYLE] =
        useState(false);

    // DATAGRID CODE : TBL_KCD_STYLE

    const editTBL_KCD_STYLE = (argData) => {
        datasetEDT_KZZ_SAMPLE_COST(argData);
    };

    const onRowClick1TBL_KCD_STYLE = (argData0) => {
        var argData = {};

        if (typeof argData0.length !== "undefined") {
            argData = argData0[0];
        } else {
            argData = argData0;
        }

        let argTBL_KCD_STYLE = argData;
        editTBL_KCD_STYLE(argTBL_KCD_STYLE);
        setDataTBL_KCD_STYLE(argTBL_KCD_STYLE);
    };

    const onRowClickTBL_KCD_STYLE = (event) => {
        let argTBL_KCD_STYLE = event.data;
        if (flagSelectModeTBL_KCD_STYLE) return;

        // Service : NawooAll:mgrQueryTBL_KCD_STYLE
    };

    /**EDIT KZZ_SAMPLE_COST */
    const [datasEDT_KZZ_SAMPLE_COST, setDatasEDT_KZZ_SAMPLE_COST] = useState(
        [],
    );
    const [dataEDT_KZZ_SAMPLE_COST, setDataEDT_KZZ_SAMPLE_COST] = useState(
        emptyEDT_KZZ_SAMPLE_COST,
    );

    const datasetEDT_KZZ_SAMPLE_COST = (argData) => {
        var _argData = { ...dataEDT_KZZ_SAMPLE_COST };
        if (argData.SAMPLE_END_DATE === "" || argData.SAMPLE_END_DATE === null)
            _argData.SAMPLE_END_DATE = getDateYYYYMMDD_1();
        else
            //dataEDT_KZZ_SAMPLE_COST_WORK_TYPE
            _argData.SAMPLE_END_DATE = argData.SAMPLE_END_DATE;
        _argData.WORK_TYPE = argData.WORK_TYPE;
        _argData.WORK_KIND = argData.WORK_KIND;
        _argData.REPAIR_QTY = argData.REPAIR_QTY;
        _argData.ORDER_CD = argData.ORDER_CD;
        _argData.BUYER_CD = argData.BUYER_CD;
        _argData.STYLE_CD = argData.STYLE_CD;
        _argData.REMARK = argData.REMARK;
        _argData.PATT_LOSS = argData.PATT_LOSS_CODE;
        _argData.PATT_LOSS_TIME = argData.PATT_LOSS_TIME;
        _argData.SEW_LOSS = argData.SEW_LOSS_CODE;
        _argData.SEW_LOSS_TIME = argData.SEW_LOSS_TIME;
        _argData.ETC_AMOUNT = argData.ETC_AMOUNT;
        _argData.SAMPLE_CD = argData.SAMPLE_CD;
        _argData.PATT_USER = argData.PATT_USER;
        _argData.PATT_COST = argData.PATT_COST_CODE;
        _argData.PATT_AMT = argData.PATT_COST;
        _argData.SEW_USER = argData.SEW_USER;
        _argData.SEW_COST = argData.SEW_COST_CODE;
        _argData.SEW_AMT = argData.SEW_COST;
        _argData.WELDING_COST = argData.WELDING_COST;
        _argData.WELDING_AMT = argData.WELDING_AMT;
        _argData.CUTTING_USER = argData.CUTTING_USER;
        _argData.COMPLETE_USER = argData.COMPLETE_USER;
        _argData.PATT3D_USER = argData.PATT3D_USER;
        _argData.PATT3D_COST = argData.PATT3D_COST_CODE;
        _argData.PATT3D_AMT = argData.PATT3D_COST;
        _argData.WORK3D_USER = argData.WORK3D_USER;
        _argData.WORK3D_COST = argData.WORK3D_COST_CODE;
        _argData.WORK3D_AMT = argData.WORK3D_COST;
        _argData.COLOR3D_QTY = argData.COLOR3D_QTY;
        _argData.COLOR3D_AMT = argData.COLOR3D_AMT;
        setDataEDT_KZZ_SAMPLE_COST(_argData);

        editEDT_KZZ_SAMPLE_COST_WORK_TYPE(argData.WORK_TYPE);
        editEDT_KZZ_SAMPLE_COST_WORK_KIND(argData.WORK_KIND);
        editEDT_KZZ_SAMPLE_COST_PATT_LOSS(argData.PATT_LOSS_CODE);
        editEDT_KZZ_SAMPLE_COST_SEW_LOSS(argData.SEW_LOSS_CODE);
        editEDT_KZZ_SAMPLE_COST_PATT_USER(argData.PATT_USER);
        editEDT_KZZ_SAMPLE_COST_PATT_COST(argData.PATT_COST_CODE);
        editEDT_KZZ_SAMPLE_COST_SEW_USER(argData.SEW_USER);
        editEDT_KZZ_SAMPLE_COST_SEW_COST(argData.SEW_COST_CODE);
        editEDT_KZZ_SAMPLE_COST_CUTTING_USER(argData.CUTTING_USER);
        editEDT_KZZ_SAMPLE_COST_COMPLETE_USER(argData.COMPLETE_USER);
        editEDT_KZZ_SAMPLE_COST_PATT3D_USER(argData.PATT3D_USER);
        editEDT_KZZ_SAMPLE_COST_PATT3D_COST(argData.PATT3D_COST_CODE);
        editEDT_KZZ_SAMPLE_COST_WORK3D_USER(argData.WORK3D_USER);
        editEDT_KZZ_SAMPLE_COST_WORK3D_COST(argData.WORK3D_COST_CODE);

        var tObj = {};
        datasEDT_KZZ_SAMPLE_COST_BUYER_CD.forEach((col, i) => {
            if (col.BUYER_CD === argData.BUYER_CD) tObj = { ...col };
        });
        if (typeof tObj.BUYER_CD === "undefined") {
            setDataEDT_KZZ_SAMPLE_COST_BUYER_CD(
                datasEDT_KZZ_SAMPLE_COST_BUYER_CD[0],
            );
        } else {
            setDataEDT_KZZ_SAMPLE_COST_BUYER_CD(tObj);
        }

        if (typeof tObj.BUYER_CD !== "undefined") {
            search_KCD_STYLE2(tObj, argData);
        }

        if (argData.WORK_KIND_NAME === "수선") {
            setDisabled1(false);
            setDisabled2(false);
            setDisabled3(false);
            setDisabled4(true);
            setDisabled5(false);
        } else {
            setDisabled1(true);
            setDisabled2(true);
            setDisabled3(false);
            setDisabled4(false);
            setDisabled5(false);
        }
    };

    const onCalChangeEDT_KZZ_SAMPLE_COST_SAMPLE_END_DATE = (e, name) => {
        let val1 = e.value || "";
        let val = "";
        if (val1 === "") {
            val = "";
        } else {
            val = getDateVal(val1);
        }

        let _dataEDT_KZZ_SAMPLE_COST = { ...dataEDT_KZZ_SAMPLE_COST };
        _dataEDT_KZZ_SAMPLE_COST[`${name}`] = val;
        setDataEDT_KZZ_SAMPLE_COST(_dataEDT_KZZ_SAMPLE_COST);
    };

    const [
        datasEDT_KZZ_SAMPLE_COST_WORK_TYPE,
        setDatasEDT_KZZ_SAMPLE_COST_WORK_TYPE,
    ] = useState([]);
    const [
        dataEDT_KZZ_SAMPLE_COST_WORK_TYPE,
        setDataEDT_KZZ_SAMPLE_COST_WORK_TYPE,
    ] = useState({});
    const editEDT_KZZ_SAMPLE_COST_WORK_TYPE = (argValue) => {
        if (argValue == "") {
            setDataEDT_KZZ_SAMPLE_COST_WORK_TYPE(
                datasEDT_KZZ_SAMPLE_COST_WORK_TYPE[0],
            );
        } else {
            let _dataEDT_KZZ_SAMPLE_COST_WORK_TYPE =
                datasEDT_KZZ_SAMPLE_COST_WORK_TYPE.filter(
                    (val) => val.CD_CODE === argValue,
                );
            setDataEDT_KZZ_SAMPLE_COST_WORK_TYPE(
                _dataEDT_KZZ_SAMPLE_COST_WORK_TYPE[0],
            );
        }
    };
    const onDropdownChangeEDT_KZZ_SAMPLE_COST_WORK_TYPE = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";
        let _dataEDT_KZZ_SAMPLE_COST = { ...dataEDT_KZZ_SAMPLE_COST };
        let tTypeVal = _dataEDT_KZZ_SAMPLE_COST[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_KZZ_SAMPLE_COST[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_KZZ_SAMPLE_COST[`${name}`] = parseInt(val);
        } else {
            _dataEDT_KZZ_SAMPLE_COST[`${name}`] = String(val);
        }
        setDataEDT_KZZ_SAMPLE_COST(_dataEDT_KZZ_SAMPLE_COST);
        setDataEDT_KZZ_SAMPLE_COST_WORK_TYPE(e.value);
    };

    const [
        datasEDT_KZZ_SAMPLE_COST_WORK_KIND,
        setDatasEDT_KZZ_SAMPLE_COST_WORK_KIND,
    ] = useState([]);
    const [
        dataEDT_KZZ_SAMPLE_COST_WORK_KIND,
        setDataEDT_KZZ_SAMPLE_COST_WORK_KIND,
    ] = useState({});
    const editEDT_KZZ_SAMPLE_COST_WORK_KIND = (argValue) => {
        if (argValue == "") {
            setDataEDT_KZZ_SAMPLE_COST_WORK_KIND(
                datasEDT_KZZ_SAMPLE_COST_WORK_KIND[0],
            );
        } else {
            let _dataEDT_KZZ_SAMPLE_COST_WORK_KIND =
                datasEDT_KZZ_SAMPLE_COST_WORK_KIND.filter(
                    (val) => val.CD_CODE === argValue,
                );
            setDataEDT_KZZ_SAMPLE_COST_WORK_KIND(
                _dataEDT_KZZ_SAMPLE_COST_WORK_KIND[0],
            );
        }
    };
    const onDropdownChangeEDT_KZZ_SAMPLE_COST_WORK_KIND = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";
        let _dataEDT_KZZ_SAMPLE_COST = { ...dataEDT_KZZ_SAMPLE_COST };
        let tTypeVal = _dataEDT_KZZ_SAMPLE_COST[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_KZZ_SAMPLE_COST[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_KZZ_SAMPLE_COST[`${name}`] = parseInt(val);
        } else {
            _dataEDT_KZZ_SAMPLE_COST[`${name}`] = String(val);
        }
        setDataEDT_KZZ_SAMPLE_COST(_dataEDT_KZZ_SAMPLE_COST);
        setDataEDT_KZZ_SAMPLE_COST_WORK_KIND(e.value);

        if (e.value.CD_NAME === "수선") {
            setDisabled1(false);
            setDisabled2(false);
            setDisabled3(false);
            setDisabled4(true);
            setDisabled5(false);
        } else {
            setDisabled1(true);
            setDisabled2(true);
            setDisabled3(false);
            setDisabled4(false);
            setDisabled5(false);
        }
    };

    const onInputChangeEDT_KZZ_SAMPLE_COST_REPAIR_QTY = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KZZ_SAMPLE_COST = { ...dataEDT_KZZ_SAMPLE_COST };

        let tTypeVal = _dataEDT_KZZ_SAMPLE_COST[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KZZ_SAMPLE_COST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KZZ_SAMPLE_COST[`${name}`] = parseInt(val);

        setDataEDT_KZZ_SAMPLE_COST(_dataEDT_KZZ_SAMPLE_COST);
    };

    const onInputChangeEDT_KZZ_SAMPLE_COST_ORDER_CD = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KZZ_SAMPLE_COST = { ...dataEDT_KZZ_SAMPLE_COST };

        let tTypeVal = _dataEDT_KZZ_SAMPLE_COST[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KZZ_SAMPLE_COST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KZZ_SAMPLE_COST[`${name}`] = parseInt(val);

        setDataEDT_KZZ_SAMPLE_COST(_dataEDT_KZZ_SAMPLE_COST);
    };

    const [
        datasEDT_KZZ_SAMPLE_COST_BUYER_CD,
        setDatasEDT_KZZ_SAMPLE_COST_BUYER_CD,
    ] = useState([]);
    const [
        dataEDT_KZZ_SAMPLE_COST_BUYER_CD,
        setDataEDT_KZZ_SAMPLE_COST_BUYER_CD,
    ] = useState({});

    const onDropdownChangeEDT_KZZ_SAMPLE_COST_BUYER_CD = (e, name) => {
        let val = (e.value && e.value.BUYER_CD) || "";
        let _dataEDT_KZZ_SAMPLE_COST = { ...dataEDT_KZZ_SAMPLE_COST };
        let tTypeVal = _dataEDT_KZZ_SAMPLE_COST[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_KZZ_SAMPLE_COST[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_KZZ_SAMPLE_COST[`${name}`] = parseInt(val);
        } else {
            _dataEDT_KZZ_SAMPLE_COST[`${name}`] = String(val);
        }
        setDataEDT_KZZ_SAMPLE_COST(_dataEDT_KZZ_SAMPLE_COST);
        setDataEDT_KZZ_SAMPLE_COST_BUYER_CD(e.value);

        var tObj = {};
        tObj.STYLE_CD = "";
        search_KCD_STYLE2(e.value, tObj);
    };

    const [
        datasEDT_KZZ_SAMPLE_COST_STYLE_CD,
        setDatasEDT_KZZ_SAMPLE_COST_STYLE_CD,
    ] = useState([]);
    const [
        dataEDT_KZZ_SAMPLE_COST_STYLE_CD,
        setDataEDT_KZZ_SAMPLE_COST_STYLE_CD,
    ] = useState({});

    const onDropdownChangeEDT_KZZ_SAMPLE_COST_STYLE_CD = (e, name) => {
        let val = (e.value && e.value.STYLE_CD) || "";
        let _dataEDT_KZZ_SAMPLE_COST = { ...dataEDT_KZZ_SAMPLE_COST };
        let tTypeVal = _dataEDT_KZZ_SAMPLE_COST[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_KZZ_SAMPLE_COST[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_KZZ_SAMPLE_COST[`${name}`] = parseInt(val);
        } else {
            _dataEDT_KZZ_SAMPLE_COST[`${name}`] = String(val);
        }
        setDataEDT_KZZ_SAMPLE_COST(_dataEDT_KZZ_SAMPLE_COST);
        setDataEDT_KZZ_SAMPLE_COST_STYLE_CD(e.value);
    };

    const [
        datasEDT_KZZ_SAMPLE_COST_PATT_LOSS,
        setDatasEDT_KZZ_SAMPLE_COST_PATT_LOSS,
    ] = useState([]);
    const [
        dataEDT_KZZ_SAMPLE_COST_PATT_LOSS,
        setDataEDT_KZZ_SAMPLE_COST_PATT_LOSS,
    ] = useState({});

    const editEDT_KZZ_SAMPLE_COST_PATT_LOSS = (argValue) => {
        let _dataEDT_KZZ_SAMPLE_COST_PATT_LOSS =
            datasEDT_KZZ_SAMPLE_COST_PATT_LOSS.filter(
                (val) => val.CD_CODE === argValue,
            );
        setDataEDT_KZZ_SAMPLE_COST_PATT_LOSS(
            _dataEDT_KZZ_SAMPLE_COST_PATT_LOSS[0],
        );
    };

    const [
        datasEDT_KZZ_SAMPLE_COST_SEW_LOSS,
        setDatasEDT_KZZ_SAMPLE_COST_SEW_LOSS,
    ] = useState([]);
    const [
        dataEDT_KZZ_SAMPLE_COST_SEW_LOSS,
        setDataEDT_KZZ_SAMPLE_COST_SEW_LOSS,
    ] = useState({});

    const editEDT_KZZ_SAMPLE_COST_SEW_LOSS = (argValue) => {
        let _dataEDT_KZZ_SAMPLE_COST_SEW_LOSS =
            datasEDT_KZZ_SAMPLE_COST_SEW_LOSS.filter(
                (val) => val.CD_CODE === argValue,
            );
        setDataEDT_KZZ_SAMPLE_COST_SEW_LOSS(
            _dataEDT_KZZ_SAMPLE_COST_SEW_LOSS[0],
        );
    };

    const [
        datasEDT_KZZ_SAMPLE_COST_PATT_USER,
        setDatasEDT_KZZ_SAMPLE_COST_PATT_USER,
    ] = useState([]);
    const [
        dataEDT_KZZ_SAMPLE_COST_PATT_USER,
        setDataEDT_KZZ_SAMPLE_COST_PATT_USER,
    ] = useState({});

    const editEDT_KZZ_SAMPLE_COST_PATT_USER = (argValue) => {
        let _dataEDT_KZZ_SAMPLE_COST_PATT_USER =
            datasEDT_KZZ_SAMPLE_COST_PATT_USER.filter(
                (val) => val.USER_ID === argValue,
            );
        setDataEDT_KZZ_SAMPLE_COST_PATT_USER(
            _dataEDT_KZZ_SAMPLE_COST_PATT_USER[0],
        );
    };

    const onDropdownChangeEDT_KZZ_SAMPLE_COST_PATT_USER = (e, name) => {
        let val = (e.value && e.value.USER_ID) || "";

        let _dataEDT_KZZ_SAMPLE_COST = { ...dataEDT_KZZ_SAMPLE_COST };

        let tTypeVal = _dataEDT_KZZ_SAMPLE_COST[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_KZZ_SAMPLE_COST[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_KZZ_SAMPLE_COST[`${name}`] = parseInt(val);
        }
        setDataEDT_KZZ_SAMPLE_COST(_dataEDT_KZZ_SAMPLE_COST);
        setDataEDT_KZZ_SAMPLE_COST_PATT_USER(e.value);
    };

    const [
        datasEDT_KZZ_SAMPLE_COST_PATT_COST,
        setDatasEDT_KZZ_SAMPLE_COST_PATT_COST,
    ] = useState([]);
    const [
        dataEDT_KZZ_SAMPLE_COST_PATT_COST,
        setDataEDT_KZZ_SAMPLE_COST_PATT_COST,
    ] = useState({});

    const editEDT_KZZ_SAMPLE_COST_PATT_COST = (argValue) => {
        let _dataEDT_KZZ_SAMPLE_COST_PATT_COST =
            datasEDT_KZZ_SAMPLE_COST_PATT_COST.filter(
                (val) => val.CD_CODE === argValue,
            );
        setDataEDT_KZZ_SAMPLE_COST_PATT_COST(
            _dataEDT_KZZ_SAMPLE_COST_PATT_COST[0],
        );
    };

    const onDropdownChangeEDT_KZZ_SAMPLE_COST_PATT_COST = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataEDT_KZZ_SAMPLE_COST = { ...dataEDT_KZZ_SAMPLE_COST };

        let tTypeVal = _dataEDT_KZZ_SAMPLE_COST[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_KZZ_SAMPLE_COST[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_KZZ_SAMPLE_COST[`${name}`] = parseInt(val);
        }

        _dataEDT_KZZ_SAMPLE_COST[`PATT_AMT`] = String(
            parseFloat(e.value.CD_FLAG) * 10000,
        );

        setDataEDT_KZZ_SAMPLE_COST(_dataEDT_KZZ_SAMPLE_COST);
        setDataEDT_KZZ_SAMPLE_COST_PATT_COST(e.value);
    };

    const onInputChangeEDT_KZZ_SAMPLE_COST_PATT_AMT = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KZZ_SAMPLE_COST = { ...dataEDT_KZZ_SAMPLE_COST };

        let tTypeVal = _dataEDT_KZZ_SAMPLE_COST[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KZZ_SAMPLE_COST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KZZ_SAMPLE_COST[`${name}`] = parseInt(val);

        setDataEDT_KZZ_SAMPLE_COST(_dataEDT_KZZ_SAMPLE_COST);
    };

    const [
        datasEDT_KZZ_SAMPLE_COST_SEW_USER,
        setDatasEDT_KZZ_SAMPLE_COST_SEW_USER,
    ] = useState([]);
    const [
        dataEDT_KZZ_SAMPLE_COST_SEW_USER,
        setDataEDT_KZZ_SAMPLE_COST_SEW_USER,
    ] = useState({});

    const editEDT_KZZ_SAMPLE_COST_SEW_USER = (argValue) => {
        let _dataEDT_KZZ_SAMPLE_COST_SEW_USER =
            datasEDT_KZZ_SAMPLE_COST_SEW_USER.filter(
                (val) => val.USER_ID === argValue,
            );
        setDataEDT_KZZ_SAMPLE_COST_SEW_USER(
            _dataEDT_KZZ_SAMPLE_COST_SEW_USER[0],
        );
    };

    const onDropdownChangeEDT_KZZ_SAMPLE_COST_SEW_USER = (e, name) => {
        let val = (e.value && e.value.USER_ID) || "";

        let _dataEDT_KZZ_SAMPLE_COST = { ...dataEDT_KZZ_SAMPLE_COST };

        let tTypeVal = _dataEDT_KZZ_SAMPLE_COST[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_KZZ_SAMPLE_COST[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_KZZ_SAMPLE_COST[`${name}`] = parseInt(val);
        }

        setDataEDT_KZZ_SAMPLE_COST(_dataEDT_KZZ_SAMPLE_COST);
        setDataEDT_KZZ_SAMPLE_COST_SEW_USER(e.value);
    };

    const [
        datasEDT_KZZ_SAMPLE_COST_SEW_COST,
        setDatasEDT_KZZ_SAMPLE_COST_SEW_COST,
    ] = useState([]);
    const [
        dataEDT_KZZ_SAMPLE_COST_SEW_COST,
        setDataEDT_KZZ_SAMPLE_COST_SEW_COST,
    ] = useState({});

    const editEDT_KZZ_SAMPLE_COST_SEW_COST = (argValue) => {
        let _dataEDT_KZZ_SAMPLE_COST_SEW_COST =
            datasEDT_KZZ_SAMPLE_COST_SEW_COST.filter(
                (val) => val.CD_CODE === argValue,
            );
        setDataEDT_KZZ_SAMPLE_COST_SEW_COST(
            _dataEDT_KZZ_SAMPLE_COST_SEW_COST[0],
        );
    };

    const onDropdownChangeEDT_KZZ_SAMPLE_COST_SEW_COST = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataEDT_KZZ_SAMPLE_COST = { ...dataEDT_KZZ_SAMPLE_COST };

        let tTypeVal = _dataEDT_KZZ_SAMPLE_COST[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_KZZ_SAMPLE_COST[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_KZZ_SAMPLE_COST[`${name}`] = parseInt(val);
        }

        _dataEDT_KZZ_SAMPLE_COST[`SEW_AMT`] = String(
            parseFloat(e.value.CD_FLAG) * 10000,
        );

        setDataEDT_KZZ_SAMPLE_COST(_dataEDT_KZZ_SAMPLE_COST);
        setDataEDT_KZZ_SAMPLE_COST_SEW_COST(e.value);
    };

    const onInputChangeEDT_KZZ_SAMPLE_COST_SEW_AMT = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KZZ_SAMPLE_COST = { ...dataEDT_KZZ_SAMPLE_COST };

        let tTypeVal = _dataEDT_KZZ_SAMPLE_COST[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KZZ_SAMPLE_COST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KZZ_SAMPLE_COST[`${name}`] = parseInt(val);

        setDataEDT_KZZ_SAMPLE_COST(_dataEDT_KZZ_SAMPLE_COST);
    };

    const onInputChangeEDT_KZZ_SAMPLE_COST_WELDING_COST = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KZZ_SAMPLE_COST = { ...dataEDT_KZZ_SAMPLE_COST };

        let tTypeVal = _dataEDT_KZZ_SAMPLE_COST[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KZZ_SAMPLE_COST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KZZ_SAMPLE_COST[`${name}`] = parseInt(val);

        setDataEDT_KZZ_SAMPLE_COST(_dataEDT_KZZ_SAMPLE_COST);
    };

    const onInputChangeEDT_KZZ_SAMPLE_COST_WELDING_AMT = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KZZ_SAMPLE_COST = { ...dataEDT_KZZ_SAMPLE_COST };

        let tTypeVal = _dataEDT_KZZ_SAMPLE_COST[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KZZ_SAMPLE_COST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KZZ_SAMPLE_COST[`${name}`] = parseInt(val);

        setDataEDT_KZZ_SAMPLE_COST(_dataEDT_KZZ_SAMPLE_COST);
    };

    const [
        datasEDT_KZZ_SAMPLE_COST_CUTTING_USER,
        setDatasEDT_KZZ_SAMPLE_COST_CUTTING_USER,
    ] = useState([]);
    const [
        dataEDT_KZZ_SAMPLE_COST_CUTTING_USER,
        setDataEDT_KZZ_SAMPLE_COST_CUTTING_USER,
    ] = useState({});

    const editEDT_KZZ_SAMPLE_COST_CUTTING_USER = (argValue) => {
        let _dataEDT_KZZ_SAMPLE_COST_CUTTING_USER =
            datasEDT_KZZ_SAMPLE_COST_CUTTING_USER.filter(
                (val) => val.USER_ID === argValue,
            );
        setDataEDT_KZZ_SAMPLE_COST_CUTTING_USER(
            _dataEDT_KZZ_SAMPLE_COST_CUTTING_USER[0],
        );
    };

    const onDropdownChangeEDT_KZZ_SAMPLE_COST_CUTTING_USER = (e, name) => {
        let val = (e.value && e.value.USER_ID) || "";

        let _dataEDT_KZZ_SAMPLE_COST = { ...dataEDT_KZZ_SAMPLE_COST };

        let tTypeVal = _dataEDT_KZZ_SAMPLE_COST[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_KZZ_SAMPLE_COST[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_KZZ_SAMPLE_COST[`${name}`] = parseInt(val);
        }

        setDataEDT_KZZ_SAMPLE_COST(_dataEDT_KZZ_SAMPLE_COST);
        setDataEDT_KZZ_SAMPLE_COST_CUTTING_USER(e.value);
    };

    const [
        datasEDT_KZZ_SAMPLE_COST_COMPLETE_USER,
        setDatasEDT_KZZ_SAMPLE_COST_COMPLETE_USER,
    ] = useState([]);
    const [
        dataEDT_KZZ_SAMPLE_COST_COMPLETE_USER,
        setDataEDT_KZZ_SAMPLE_COST_COMPLETE_USER,
    ] = useState({});

    const editEDT_KZZ_SAMPLE_COST_COMPLETE_USER = (argValue) => {
        let _dataEDT_KZZ_SAMPLE_COST_COMPLETE_USER =
            datasEDT_KZZ_SAMPLE_COST_COMPLETE_USER.filter(
                (val) => val.USER_ID === argValue,
            );
        setDataEDT_KZZ_SAMPLE_COST_COMPLETE_USER(
            _dataEDT_KZZ_SAMPLE_COST_COMPLETE_USER[0],
        );
    };

    const onDropdownChangeEDT_KZZ_SAMPLE_COST_COMPLETE_USER = (e, name) => {
        let val = (e.value && e.value.USER_ID) || "";

        let _dataEDT_KZZ_SAMPLE_COST = { ...dataEDT_KZZ_SAMPLE_COST };

        let tTypeVal = _dataEDT_KZZ_SAMPLE_COST[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_KZZ_SAMPLE_COST[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_KZZ_SAMPLE_COST[`${name}`] = parseInt(val);
        }

        setDataEDT_KZZ_SAMPLE_COST(_dataEDT_KZZ_SAMPLE_COST);
        setDataEDT_KZZ_SAMPLE_COST_COMPLETE_USER(e.value);
    };

    const [
        datasEDT_KZZ_SAMPLE_COST_PATT3D_USER,
        setDatasEDT_KZZ_SAMPLE_COST_PATT3D_USER,
    ] = useState([]);
    const [
        dataEDT_KZZ_SAMPLE_COST_PATT3D_USER,
        setDataEDT_KZZ_SAMPLE_COST_PATT3D_USER,
    ] = useState({});

    const editEDT_KZZ_SAMPLE_COST_PATT3D_USER = (argValue) => {
        let _dataEDT_KZZ_SAMPLE_COST_PATT3D_USER =
            datasEDT_KZZ_SAMPLE_COST_PATT3D_USER.filter(
                (val) => val.USER_ID === argValue,
            );
        setDataEDT_KZZ_SAMPLE_COST_PATT3D_USER(
            _dataEDT_KZZ_SAMPLE_COST_PATT3D_USER[0],
        );
    };

    const onDropdownChangeEDT_KZZ_SAMPLE_COST_PATT3D_USER = (e, name) => {
        let val = (e.value && e.value.USER_ID) || "";

        let _dataEDT_KZZ_SAMPLE_COST = { ...dataEDT_KZZ_SAMPLE_COST };

        let tTypeVal = _dataEDT_KZZ_SAMPLE_COST[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_KZZ_SAMPLE_COST[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_KZZ_SAMPLE_COST[`${name}`] = parseInt(val);
        }

        setDataEDT_KZZ_SAMPLE_COST(_dataEDT_KZZ_SAMPLE_COST);
        setDataEDT_KZZ_SAMPLE_COST_PATT3D_USER(e.value);
    };

    const [
        datasEDT_KZZ_SAMPLE_COST_PATT3D_COST,
        setDatasEDT_KZZ_SAMPLE_COST_PATT3D_COST,
    ] = useState([]);
    const [
        dataEDT_KZZ_SAMPLE_COST_PATT3D_COST,
        setDataEDT_KZZ_SAMPLE_COST_PATT3D_COST,
    ] = useState({});

    const editEDT_KZZ_SAMPLE_COST_PATT3D_COST = (argValue) => {
        let _dataEDT_KZZ_SAMPLE_COST_PATT3D_COST =
            datasEDT_KZZ_SAMPLE_COST_PATT3D_COST.filter(
                (val) => val.CD_CODE === argValue,
            );
        setDataEDT_KZZ_SAMPLE_COST_PATT3D_COST(
            _dataEDT_KZZ_SAMPLE_COST_PATT3D_COST[0],
        );
    };

    const onDropdownChangeEDT_KZZ_SAMPLE_COST_PATT3D_COST = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataEDT_KZZ_SAMPLE_COST = { ...dataEDT_KZZ_SAMPLE_COST };

        let tTypeVal = _dataEDT_KZZ_SAMPLE_COST[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_KZZ_SAMPLE_COST[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_KZZ_SAMPLE_COST[`${name}`] = parseInt(val);
        }

        _dataEDT_KZZ_SAMPLE_COST[`PATT3D_AMT`] =
            parseFloat(e.value.CD_FLAG) * 10000;

        setDataEDT_KZZ_SAMPLE_COST(_dataEDT_KZZ_SAMPLE_COST);
        setDataEDT_KZZ_SAMPLE_COST_PATT3D_COST(e.value);
    };

    const onInputChangeEDT_KZZ_SAMPLE_COST_PATT3D_AMT = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KZZ_SAMPLE_COST = { ...dataEDT_KZZ_SAMPLE_COST };

        let tTypeVal = _dataEDT_KZZ_SAMPLE_COST[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KZZ_SAMPLE_COST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KZZ_SAMPLE_COST[`${name}`] = parseInt(val);

        setDataEDT_KZZ_SAMPLE_COST(_dataEDT_KZZ_SAMPLE_COST);
    };

    const [
        datasEDT_KZZ_SAMPLE_COST_WORK3D_USER,
        setDatasEDT_KZZ_SAMPLE_COST_WORK3D_USER,
    ] = useState([]);
    const [
        dataEDT_KZZ_SAMPLE_COST_WORK3D_USER,
        setDataEDT_KZZ_SAMPLE_COST_WORK3D_USER,
    ] = useState({});

    const editEDT_KZZ_SAMPLE_COST_WORK3D_USER = (argValue) => {
        let _dataEDT_KZZ_SAMPLE_COST_WORK3D_USER =
            datasEDT_KZZ_SAMPLE_COST_WORK3D_USER.filter(
                (val) => val.USER_ID === argValue,
            );
        setDataEDT_KZZ_SAMPLE_COST_WORK3D_USER(
            _dataEDT_KZZ_SAMPLE_COST_WORK3D_USER[0],
        );
    };

    const onDropdownChangeEDT_KZZ_SAMPLE_COST_WORK3D_USER = (e, name) => {
        let val = (e.value && e.value.USER_ID) || "";

        let _dataEDT_KZZ_SAMPLE_COST = { ...dataEDT_KZZ_SAMPLE_COST };

        let tTypeVal = _dataEDT_KZZ_SAMPLE_COST[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_KZZ_SAMPLE_COST[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_KZZ_SAMPLE_COST[`${name}`] = parseInt(val);
        }

        setDataEDT_KZZ_SAMPLE_COST(_dataEDT_KZZ_SAMPLE_COST);
        setDataEDT_KZZ_SAMPLE_COST_WORK3D_USER(e.value);
    };

    const [
        datasEDT_KZZ_SAMPLE_COST_WORK3D_COST,
        setDatasEDT_KZZ_SAMPLE_COST_WORK3D_COST,
    ] = useState([]);
    const [
        dataEDT_KZZ_SAMPLE_COST_WORK3D_COST,
        setDataEDT_KZZ_SAMPLE_COST_WORK3D_COST,
    ] = useState({});

    const editEDT_KZZ_SAMPLE_COST_WORK3D_COST = (argValue) => {
        let _dataEDT_KZZ_SAMPLE_COST_WORK3D_COST =
            datasEDT_KZZ_SAMPLE_COST_WORK3D_COST.filter(
                (val) => val.CD_CODE === argValue,
            );
        setDataEDT_KZZ_SAMPLE_COST_WORK3D_COST(
            _dataEDT_KZZ_SAMPLE_COST_WORK3D_COST[0],
        );
    };

    const onDropdownChangeEDT_KZZ_SAMPLE_COST_WORK3D_COST = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataEDT_KZZ_SAMPLE_COST = { ...dataEDT_KZZ_SAMPLE_COST };

        let tTypeVal = _dataEDT_KZZ_SAMPLE_COST[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_KZZ_SAMPLE_COST[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_KZZ_SAMPLE_COST[`${name}`] = parseInt(val);
        }

        _dataEDT_KZZ_SAMPLE_COST[`WORK3D_AMT`] =
            parseFloat(e.value.CD_FLAG) * 10000;

        setDataEDT_KZZ_SAMPLE_COST(_dataEDT_KZZ_SAMPLE_COST);
        setDataEDT_KZZ_SAMPLE_COST_WORK3D_COST(e.value);
    };

    const onInputChangeEDT_KZZ_SAMPLE_COST_WORK3D_AMT = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KZZ_SAMPLE_COST = { ...dataEDT_KZZ_SAMPLE_COST };

        let tTypeVal = _dataEDT_KZZ_SAMPLE_COST[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KZZ_SAMPLE_COST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KZZ_SAMPLE_COST[`${name}`] = parseInt(val);

        setDataEDT_KZZ_SAMPLE_COST(_dataEDT_KZZ_SAMPLE_COST);
    };

    const onInputChangeEDT_KZZ_SAMPLE_COST_COLOR3D_QTY = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KZZ_SAMPLE_COST = { ...dataEDT_KZZ_SAMPLE_COST };

        let tTypeVal = _dataEDT_KZZ_SAMPLE_COST[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KZZ_SAMPLE_COST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KZZ_SAMPLE_COST[`${name}`] = parseInt(val);

        setDataEDT_KZZ_SAMPLE_COST(_dataEDT_KZZ_SAMPLE_COST);
    };

    const onInputChangeEDT_KZZ_SAMPLE_COST_COLOR3D_AMT = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KZZ_SAMPLE_COST = { ...dataEDT_KZZ_SAMPLE_COST };

        let tTypeVal = _dataEDT_KZZ_SAMPLE_COST[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KZZ_SAMPLE_COST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KZZ_SAMPLE_COST[`${name}`] = parseInt(val);

        setDataEDT_KZZ_SAMPLE_COST(_dataEDT_KZZ_SAMPLE_COST);
    };

    const reset_EDT = () => {
        setDataEDT_KZZ_SAMPLE_COST(emptyEDT_KZZ_SAMPLE_COST);

        setDataEDT_KZZ_SAMPLE_COST_WORK_TYPE(
            datasEDT_KZZ_SAMPLE_COST_WORK_TYPE[0],
        );
        setDataEDT_KZZ_SAMPLE_COST_PATT_LOSS(
            datasEDT_KZZ_SAMPLE_COST_PATT_LOSS[0],
        );
        setDataEDT_KZZ_SAMPLE_COST_SEW_LOSS(
            datasEDT_KZZ_SAMPLE_COST_SEW_LOSS[0],
        );
        setDataEDT_KZZ_SAMPLE_COST_PATT_USER(
            datasEDT_KZZ_SAMPLE_COST_PATT_USER[0],
        );
        setDataEDT_KZZ_SAMPLE_COST_PATT_COST(
            datasEDT_KZZ_SAMPLE_COST_PATT_COST[0],
        );
        setDataEDT_KZZ_SAMPLE_COST_SEW_USER(
            datasEDT_KZZ_SAMPLE_COST_SEW_USER[0],
        );
        setDataEDT_KZZ_SAMPLE_COST_SEW_COST(
            datasEDT_KZZ_SAMPLE_COST_SEW_COST[0],
        );
        setDataEDT_KZZ_SAMPLE_COST_CUTTING_USER(
            datasEDT_KZZ_SAMPLE_COST_CUTTING_USER[0],
        );
        setDataEDT_KZZ_SAMPLE_COST_COMPLETE_USER(
            datasEDT_KZZ_SAMPLE_COST_COMPLETE_USER[0],
        );
        setDataEDT_KZZ_SAMPLE_COST_PATT3D_USER(
            datasEDT_KZZ_SAMPLE_COST_PATT3D_USER[0],
        );
        setDataEDT_KZZ_SAMPLE_COST_PATT3D_COST(
            datasEDT_KZZ_SAMPLE_COST_PATT3D_COST[0],
        );
        setDataEDT_KZZ_SAMPLE_COST_WORK3D_USER(
            datasEDT_KZZ_SAMPLE_COST_WORK3D_USER[0],
        );
        setDataEDT_KZZ_SAMPLE_COST_WORK3D_COST(
            datasEDT_KZZ_SAMPLE_COST_WORK3D_COST[0],
        );
    };

    //
    useEffect(() => {
        // search_LIST_1();

        setLoading(true);
        serviceS0203_SAMPLE_COST.mgrQuerySAMPLE_COST_CODE().then((data) => {
            setLoading(false);
            if (typeof data.graphQLErrors === "undefined") {
                console.log(
                    "serviceS0203_SAMPLE_COST.mgrQuery_SAMPLE_COST_CODE call => " +
                        data.BUYER_CD.length,
                );
                setDatasQRY_KZZ_SAMPLE_COST_BUYER_CD(data.BUYER_CD);
                setDataQRY_KZZ_SAMPLE_COST_BUYER_CD(data.BUYER_CD[0]);

                setDatasEDT_KZZ_SAMPLE_COST_BUYER_CD(data.BUYER_CD);
                setDataEDT_KZZ_SAMPLE_COST_BUYER_CD(data.BUYER_CD[0]);

                setDatasQRY_KZZ_SAMPLE_COST_STYLE_CD(data.STYLE_CD);
                setDataQRY_KZZ_SAMPLE_COST_STYLE_CD(data.STYLE_CD[0]);

                setDatasEDT_KZZ_SAMPLE_COST_STYLE_CD(data.STYLE_CD);
                setDataEDT_KZZ_SAMPLE_COST_STYLE_CD(data.STYLE_CD[0]);

                setDatasQRY_KZZ_SAMPLE_COST_WORK_TYPE(data.WORK_TYPE);
                setDataQRY_KZZ_SAMPLE_COST_WORK_TYPE(data.WORK_TYPE[0]);

                setDatasQRY_KZZ_SAMPLE_COST_PATT_USER(data.PATT_USER);
                setDataQRY_KZZ_SAMPLE_COST_PATT_USER(data.PATT_USER[0]);

                setDatasQRY_KZZ_SAMPLE_COST_SEW_USER(data.SEW_USER);
                setDataQRY_KZZ_SAMPLE_COST_SEW_USER(data.SEW_USER[0]);

                setDatasEDT_KZZ_SAMPLE_COST_WORK_TYPE(data.WORK_TYPE);
                setDataEDT_KZZ_SAMPLE_COST_WORK_TYPE(data.WORK_TYPE[0]);

                setDatasEDT_KZZ_SAMPLE_COST_WORK_KIND(data.WORK_KIND);
                setDataEDT_KZZ_SAMPLE_COST_WORK_KIND(data.WORK_KIND[0]);

                setDatasEDT_KZZ_SAMPLE_COST_PATT_LOSS(data.PATT_LOSS);
                setDataEDT_KZZ_SAMPLE_COST_PATT_LOSS(data.PATT_LOSS[0]);

                setDatasEDT_KZZ_SAMPLE_COST_SEW_LOSS(data.SEW_LOSS);
                setDataEDT_KZZ_SAMPLE_COST_SEW_LOSS(data.SEW_LOSS[0]);

                setDatasEDT_KZZ_SAMPLE_COST_PATT_USER(data.PATT_USER);
                setDataEDT_KZZ_SAMPLE_COST_PATT_USER(data.PATT_USER[0]);

                setDatasEDT_KZZ_SAMPLE_COST_PATT_COST(data.PATT_COST);
                setDataEDT_KZZ_SAMPLE_COST_PATT_COST(data.PATT_COST[0]);

                setDatasEDT_KZZ_SAMPLE_COST_SEW_USER(data.SEW_USER);
                setDataEDT_KZZ_SAMPLE_COST_SEW_USER(data.SEW_USER[0]);

                setDatasEDT_KZZ_SAMPLE_COST_SEW_COST(data.SEW_COST);
                setDataEDT_KZZ_SAMPLE_COST_SEW_COST(data.SEW_COST[0]);

                setDatasEDT_KZZ_SAMPLE_COST_CUTTING_USER(data.CUTTING_USER);
                setDataEDT_KZZ_SAMPLE_COST_CUTTING_USER(data.CUTTING_USER[0]);

                setDatasEDT_KZZ_SAMPLE_COST_COMPLETE_USER(data.COMPLETE_USER);
                setDataEDT_KZZ_SAMPLE_COST_COMPLETE_USER(data.COMPLETE_USER[0]);

                setDatasEDT_KZZ_SAMPLE_COST_PATT3D_USER(data.PATT3D_USER);
                setDataEDT_KZZ_SAMPLE_COST_PATT3D_USER(data.PATT3D_USER[0]);

                setDatasEDT_KZZ_SAMPLE_COST_PATT3D_COST(data.PATT3D_COST);
                setDataEDT_KZZ_SAMPLE_COST_PATT3D_COST(data.PATT3D_COST[0]);

                setDatasEDT_KZZ_SAMPLE_COST_WORK3D_USER(data.WORK3D_USER);
                setDataEDT_KZZ_SAMPLE_COST_WORK3D_USER(data.WORK3D_USER[0]);

                setDatasEDT_KZZ_SAMPLE_COST_WORK3D_COST(data.WORK3D_COST);
                setDataEDT_KZZ_SAMPLE_COST_WORK3D_COST(data.WORK3D_COST[0]);

                setDatasEDT_KZZ_SAMPLE_COST_WORK_TYPE(data.WORK_TYPE);
                setDataEDT_KZZ_SAMPLE_COST_WORK_TYPE(data.WORK_TYPE[0]);

                var tObj = { ...dataEDT_KZZ_SAMPLE_COST };
                tObj.SAMPLE_END_DATE = getDateYYYYMMDD_1();
                setDataEDT_KZZ_SAMPLE_COST(tObj);
            } else {
                console.log(
                    "serviceS0203_SAMPLE_COST.mgrQuery_SAMPLE_COST_CODE error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });
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
        // if (argVal === '' || argVal === null) return (argVal);

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

    const getDateYYYYMMDD_1 = () => {
        var tDate = new Date();
        var mm = tDate.getMonth() + 1;
        var mm_str = "";
        if (mm > 9) mm_str = mm.toString();
        else mm_str = "0" + mm;

        var dd = tDate.getDate();
        var dd_str = "";
        if (dd > 9) dd_str = dd.toString();
        else dd_str = "0" + dd;

        var hours = tDate.getHours();
        var hours_str = "";
        if (hours > 9) hours_str = hours.toString();
        else hours_str = "0" + hours;

        var minutes = tDate.getMinutes();
        var minutes_str = "";
        if (minutes > 9) minutes_str = minutes.toString();
        else minutes_str = "0" + minutes;

        var seconds = tDate.getSeconds();
        var seconds_str = "";
        if (seconds > 9) seconds_str = seconds.toString();
        else seconds_str = "0" + seconds;

        var yyyy = tDate.getFullYear();

        var tRet = yyyy.toString() + mm_str + dd_str;
        return tRet;
    };

    return (
        <div className="af-div-main">
            <div
                className="af-div-first"
                style={{ width: "123rem", height: "7rem" }}
            >
                <span className="af-span-3-0" style={{ width: "28rem" }}>
                    <p className="af-span-p" style={{ width: "7rem" }}>Buyer</p>
                    <div className="af-span-div" style={{ width: "20rem" }}>
                        <Dropdown
                            style={{ width: "20rem" }}
                            id="id_BUYER_CD"
                            value={dataQRY_KZZ_SAMPLE_COST_BUYER_CD}
                            onChange={(e) =>
                                onDropdownChangeQRY_KZZ_SAMPLE_COST_BUYER_CD(
                                    e,
                                    "BUYER_CD",
                                )
                            }
                            options={datasQRY_KZZ_SAMPLE_COST_BUYER_CD}
                            optionLabel="BUYER_NAME"
                            placeholder=""
                            editable
                            filter
                        ></Dropdown>
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "28rem" }}>
                    <p className="af-span-p" style={{ width: "7rem" }}>Style</p>
                    <div className="af-span-div" style={{ width: "20rem" }}>
                        <Dropdown
                            style={{ width: "20rem" }}
                            id="id_BUYER_CD"
                            value={dataQRY_KZZ_SAMPLE_COST_STYLE_CD}
                            onChange={(e) =>
                                onDropdownChangeQRY_KZZ_SAMPLE_COST_STYLE_CD(
                                    e,
                                    "STYLE_CD",
                                )
                            }
                            options={datasQRY_KZZ_SAMPLE_COST_STYLE_CD}
                            optionLabel="STYLE_NAME"
                            placeholder=""
                            editable
                            filter
                        ></Dropdown>
                    </div>
                </span>

                <span className="af-span-3-0" style={{ width: "65rem" }}>
                    <p className="af-span-p" style={{ width: "7rem" }}>Order</p>
                    <div className="af-span-div" style={{ width: "20rem" }}>
                        <InputText
                            style={{ width: "20rem" }}
                            id="id_ORDER_CD"
                            value={dataQRY_KZZ_SAMPLE_COST.ORDER_CD}
                            onChange={(e) =>
                                onInputChangeQRY_KZZ_SAMPLE_COST_ORDER_CD(
                                    e,
                                    "ORDER_CD",
                                )
                            }
                        />
                    </div>
                </span>

                <span className="af-span-3" style={{ width: "28rem" }}>
                    <p className="af-span-p" style={{ width: "7rem" }}>Type</p>
                    <div className="af-span-div" style={{ width: "20rem" }}>
                        <Dropdown
                            style={{ width: "20rem" }}
                            id="id_WORK_TYPE"
                            value={dataQRY_KZZ_SAMPLE_COST_WORK_TYPE}
                            onChange={(e) =>
                                onDropdownChangeQRY_KZZ_SAMPLE_COST_WORK_TYPE(
                                    e,
                                    "WORK_TYPE",
                                )
                            }
                            options={datasQRY_KZZ_SAMPLE_COST_WORK_TYPE}
                            optionLabel="CD_NAME"
                            placeholder=""
                            editable
                        ></Dropdown>
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "28rem" }}>
                    <p className="af-span-p" style={{ width: "7rem" }}>패턴유저</p>
                    <div className="af-span-div" style={{ width: "20rem" }}>
                        <Dropdown
                            style={{ width: "20rem" }}
                            id="id_PATT_USER"
                            value={dataQRY_KZZ_SAMPLE_COST_PATT_USER}
                            onChange={(e) =>
                                onDropdownChangeQRY_KZZ_SAMPLE_COST_PATT_USER(
                                    e,
                                    "PATT_USER",
                                )
                            }
                            options={datasQRY_KZZ_SAMPLE_COST_PATT_USER}
                            optionLabel="USER_NAME"
                            placeholder=""
                            editable
                            filter
                        ></Dropdown>
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "65rem" }}>
                    <p className="af-span-p" style={{ width: "7rem" }}>봉제유저</p>
                    <div className="af-span-div" style={{ width: "20rem" }}>
                        <Dropdown
                            style={{ width: "20rem" }}
                            id="id_SEW_USER"
                            value={dataQRY_KZZ_SAMPLE_COST_SEW_USER}
                            onChange={(e) =>
                                onDropdownChangeQRY_KZZ_SAMPLE_COST_SEW_USER(
                                    e,
                                    "SEW_USER",
                                )
                            }
                            options={datasQRY_KZZ_SAMPLE_COST_SEW_USER}
                            optionLabel="USER_NAME"
                            placeholder=""
                            editable
                            filter
                        ></Dropdown>
                    </div>
                </span>

                <span className="af-span-3" style={{ width: "11rem" }}>
                    <p className="af-span-p" style={{ width: "7rem" }}>Sample End</p>
                    <div className="af-span-checkbox">
                        <Checkbox
                            id="id_IS_DATE"
                            checked={changeCheckBoxVal(
                                dataQRY_KZZ_SAMPLE_COST.IS_DATE,
                            )}
                            onChange={(e) =>
                                onCheckboxChangeQRY_KZZ_SAMPLE_COST_IS_DATE(
                                    e,
                                    "IS_DATE",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "13rem" }}>
                    <p className="af-span-p" style={{ width: "1rem" }}>.</p>
                    <div className="af-span-div" style={{ width: "11rem" }}>
                        <Calendar
                            showButtonBar
                            dateFormat="yy-mm-dd"
                            style={{ width: "11rem" }}
                            id="id_S_DATE"
                            value={changeDateVal(
                                dataQRY_KZZ_SAMPLE_COST.S_DATE,
                            )}
                            onChange={(e) =>
                                onCalChangeQRY_KZZ_SAMPLE_COST_S_DATE(
                                    e,
                                    "S_DATE",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "13rem" }}>
                    <p className="af-span-p" style={{ width: "1rem" }}>~</p>
                    <div className="af-span-div" style={{ width: "11rem" }}>
                        <Calendar
                            showButtonBar
                            dateFormat="yy-mm-dd"
                            style={{ width: "11rem" }}
                            id="id_E_DATE"
                            value={changeDateVal(
                                dataQRY_KZZ_SAMPLE_COST.E_DATE,
                            )}
                            onChange={(e) =>
                                onCalChangeQRY_KZZ_SAMPLE_COST_E_DATE(
                                    e,
                                    "E_DATE",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "12rem" }}>
                    <div className="af-span-div-btn" style={{ width: "12rem" }}>
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
                            style={{ width: "12rem" }}
                            className="p-button-text"
                            onClick={search_LIST_1}
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "12rem" }}>
                    <div className="af-span-div-btn" style={{ width: "12rem" }}>
                        <Button
                            label="Excel"
                            style={{ width: "12rem" }}
                            className="p-button-text green"
                            onClick={excel_REPORT_1}
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "12rem" }}>
                    <div className="af-span-div-btn" style={{ width: "12rem" }}>
                        <Button
                            label="Reset"
                            style={{ width: "12rem" }}
                            className="p-button-text"
                            onClick={reset_QRY}
                        />
                    </div>
                </span>
            </div>

            <div
                className="af-div-first"
                style={{ width: "123rem", height: "27.5rem" }}
            >
                <AFDataTable preventUnrelatedRerender
                    ref={dt_TBL_KCD_STYLE}
                    size="small"
                    value={datasTBL_KCD_STYLE}
                    tableStyle={{ tableLayout: "fixed" }}
                    resizableColumns
                    columnResizeMode="expand"
                    showGridlines
                    selectionMode="checkbox"
                    selection={selectedTBL_KCD_STYLE}
                    onSelectionChange={(e) => {
                        setFlagSelectModeTBL_KCD_STYLE(true);
                        setSelectedTBL_KCD_STYLE(e.value);
                        console.log(
                            "selected length:" + selectedTBL_KCD_STYLE.length,
                        );
                        onRowClick1TBL_KCD_STYLE(e.value);
                    }}
                    onRowClick={onRowClickTBL_KCD_STYLE}
                    dataKey="id"
                    className="datatable-responsive"
                    virtualScrollerOptions={{ itemSize: 20 }}
                    loading={loading}
                    emptyMessage=" "
                    //header={headerTBL_KCD_STYLE}
                    responsiveLayout="scroll"
                    scrollable
                    scrollHeight="27rem"
                >
                    <AFColumn field="SAMPLE_SEQ" headerClassName="t-header" header="외주" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="BUYER_NAME" headerClassName="t-header" header="Buyer" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="STYLE_NAME" headerClassName="t-header" header="Style" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="ORDER_CD" headerClassName="t-header" header="Order" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="ORG_DUE_DATE" headerClassName="t-header" header="Org Due" body={(rowData) => serviceLib.dateFormat(rowData.ORG_DUE_DATE) } style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="DUE_DATE" headerClassName="t-header" header="Due Date" body={(rowData) => serviceLib.dateFormat(rowData.DUE_DATE) } style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="TOTAL_COST" headerClassName="t-header" header="Total Cost" bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.TOTAL_COST) } style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="PATT_USER" headerClassName="t-header" header="Patt User" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="PATT_COST" headerClassName="t-header" header="Patt Cost" bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.PATT_COST) } style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="ORDER_QTY" headerClassName="t-header" header="Qty" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="SEW_USER" headerClassName="t-header" header="Sew User" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="SEW_COST" headerClassName="t-header" header="Sew Cost" bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.SEW_COST) } style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="WELDING_COST" headerClassName="t-header" header="Weld" bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.WELDING_COST) } style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>

                    <AFColumn field="WORK_TYPE_NAME" headerClassName="t-header" header="WORK Type" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="REPAIR_QTY" headerClassName="t-header" header="수선수량" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="REPAIR_COST" headerClassName="t-header" header="수선Cost" style={{ width: "10rem", flexBasis: "auto" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.REPAIR_COST) } ></AFColumn>

                    <AFColumn field="SAMPLE_END_FLAG_N" headerClassName="t-header" header="Sample End Flag" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="SAMPLE_END_DATE" headerClassName="t-header" header="Sample End Date" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="END_FLAG" headerClassName="t-header" header="End Flag" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="END_DATE" headerClassName="t-header" header="End Date" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="REG_USER" headerClassName="t-header" header="Reg User" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="REG_DATETIME" headerClassName="t-header" header="Reg Date" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="CONFIRM_FLAG" headerClassName="t-header" header="Confirm Flag" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>

                    <AFColumn field="PATT_GRADE" headerClassName="t-header" header="Patt Grade" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="SEW_GRADE" headerClassName="t-header" header="Sew Grade" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="FC_PRICE" headerClassName="t-header" header="Fc Price" body={(rowData) => serviceLib.numWithCommas(rowData.FC_PRICE) } bodyStyle={{ textAlign: "right" }} style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="PATT_LOSS_NAME" headerClassName="t-header" header="Patt Loss" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="PATT_LOSS_TIME" headerClassName="t-header" header="Patt Loss(T)" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="SEW_LOSS_NAME" headerClassName="t-header" header="Sew Loss" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="SEW_LOSS_TIME" headerClassName="t-header" header="Sew Loss(T)" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="PATT_REMARK" headerClassName="t-header" header="Patt Remark" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="SEW_REMARK" headerClassName="t-header" header="Sew Remark" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="PATT" headerClassName="t-header" header="패턴타입" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="SEW" headerClassName="t-header" header="봉제타입" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="WELDING" headerClassName="t-header" header="Welding" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="PATT_FLAG" headerClassName="t-header" header="Patt Flag" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="SEW_FLAG" headerClassName="t-header" header="Sew Flag" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="WELDING_FLAG" headerClassName="t-header" header="Sew Flag" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="PATT3D_USER" headerClassName="t-header" header="자수 User" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="PATT3D_COST" headerClassName="t-eader" header="자수 Cost" style={{ width: "10rem", flexBasis: "auto" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.PATT3D_COST) } ></AFColumn>
                    <AFColumn field="WORK3D_USER" headerClassName="t-header" header="Work3d User" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="WORK3D_COST" headerClassName="t-header" header="Work3d Cost" style={{ width: "10rem", flexBasis: "auto" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.WORK3D_COST) } ></AFColumn>
                    <AFColumn field="COLOR3D_COST" headerClassName="t-header" header="Color3d Qty" style={{ width: "10rem", flexBasis: "auto" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.COLOR3D_COST) } ></AFColumn>
                    <AFColumn field="PATT3D" headerClassName="t-eader" header="자수" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="WORK3D" headerClassName="t-header" header="Work3d" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="COLOR3D_QTY" headerClassName="t-header" header="Color3d Qty" style={{ width: "10rem", flexBasis: "auto" }} bodyStyle={{ textAlign: "right" }} ></AFColumn>

                    <AFColumn field="SAMPLE_TYPE" headerClassName="t-header" header="Sample Type" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                </AFDataTable>
            </div>

            <div
                className="af-div-first"
                style={{
                    width: "61rem",
                    height: "23rem",
                    display: "flex",
                    flexWrap: "wrap",
                    alignContent: "flex-start",
                    columnGap: "0.25rem",
                    rowGap: "0.2rem",
                }}
            >
                <span className="af-span-3-0" style={{ width: "60rem" }}>
                    <p className="af-span-p" style={{ width: "10rem" }}>End Date</p>
                    <div className="af-span-div" style={{ width: "49rem" }}>
                        <Calendar
                            showButtonBar
                            style={{ width: "49rem" }}
                            dateFormat="yy-mm-dd"
                            id="id_ETA"
                            value={changeDateVal(
                                dataEDT_KZZ_SAMPLE_COST.SAMPLE_END_DATE,
                            )}
                            onChange={(e) =>
                                onCalChangeEDT_KZZ_SAMPLE_COST_SAMPLE_END_DATE(
                                    e,
                                    "SAMPLE_END_DATE",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "60rem" }}>
                    <p className="af-span-p" style={{ width: "10rem" }}>Kind</p>
                    <div className="af-span-div" style={{ width: "49rem" }}>
                        <Dropdown
                            style={{ width: "49rem" }}
                            id="id_WORK_TYPE"
                            value={dataEDT_KZZ_SAMPLE_COST_WORK_KIND}
                            onChange={(e) =>
                                onDropdownChangeEDT_KZZ_SAMPLE_COST_WORK_KIND(
                                    e,
                                    "WORK_KIND",
                                )
                            }
                            options={datasEDT_KZZ_SAMPLE_COST_WORK_KIND}
                            optionLabel="CD_NAME"
                            placeholder=""
                            editable
                        ></Dropdown>
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "60rem" }}>
                    <p className="af-span-p" style={{ width: "10rem" }}>Type</p>
                    <div className="af-span-div" style={{ width: "49rem" }}>
                        <Dropdown
                            style={{ width: "49rem" }}
                            disabled={disabled1}
                            id="id_WORK_TYPE"
                            value={dataEDT_KZZ_SAMPLE_COST_WORK_TYPE}
                            onChange={(e) =>
                                onDropdownChangeEDT_KZZ_SAMPLE_COST_WORK_TYPE(
                                    e,
                                    "WORK_TYPE",
                                )
                            }
                            options={datasEDT_KZZ_SAMPLE_COST_WORK_TYPE}
                            optionLabel="CD_NAME"
                            placeholder=""
                            editable
                        ></Dropdown>
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "30rem" }}>
                    <p className="af-span-p" style={{ width: "10rem" }}>수선수량</p>
                    <div className="af-span-div" style={{ width: "19rem" }}>
                        <InputText
                            style={{ width: "19rem" }}
                            disabled={disabled1}
                            id="id_REPAIR_QTY"
                            value={dataEDT_KZZ_SAMPLE_COST.REPAIR_QTY}
                            onChange={(e) =>
                                onInputChangeEDT_KZZ_SAMPLE_COST_REPAIR_QTY(
                                    e,
                                    "REPAIR_QTY",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "29rem" }}>
                    <p className="af-span-p" style={{ width: "10rem" }}>Order</p>
                    <div className="af-span-div" style={{ width: "18rem" }}>
                        <InputText
                            style={{ width: "18rem" }}
                            disabled
                            id="id_REPAIR_QTY"
                            value={dataEDT_KZZ_SAMPLE_COST.ORDER_CD}
                            onChange={(e) =>
                                onInputChangeEDT_KZZ_SAMPLE_COST_ORDER_CD(
                                    e,
                                    "ORDER_CD",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "60rem" }}>
                    <p className="af-span-p" style={{ width: "10rem" }}>Buyer</p>
                    <div className="af-span-div" style={{ width: "49rem" }}>
                        <Dropdown
                            style={{ width: "49rem" }}
                            disabled={disabled2}
                            id="id_PATT_LOSS"
                            value={dataEDT_KZZ_SAMPLE_COST_BUYER_CD}
                            onChange={(e) =>
                                onDropdownChangeEDT_KZZ_SAMPLE_COST_BUYER_CD(
                                    e,
                                    "BUYER_CD",
                                )
                            }
                            options={datasEDT_KZZ_SAMPLE_COST_BUYER_CD}
                            optionLabel="BUYER_NAME"
                            placeholder=""
                            editable
                        ></Dropdown>
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "60rem" }}>
                    <p className="af-span-p" style={{ width: "10rem" }}>Style</p>
                    <div className="af-span-div" style={{ width: "49rem" }}>
                        <Dropdown
                            style={{ width: "49rem" }}
                            disabled={disabled2}
                            id="id_PATT_LOSS"
                            value={dataEDT_KZZ_SAMPLE_COST_STYLE_CD}
                            onChange={(e) =>
                                onDropdownChangeEDT_KZZ_SAMPLE_COST_STYLE_CD(
                                    e,
                                    "STYLE_CD",
                                )
                            }
                            options={datasEDT_KZZ_SAMPLE_COST_STYLE_CD}
                            optionLabel="STYLE_NAME"
                            placeholder=""
                            filter
                        ></Dropdown>
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "60rem" }}>
                    <p className="af-span-p" style={{ width: "59rem" }}> </p>
                </span>
                <span className="af-span-3" style={{ width: "60rem" }}>
                    <p className="af-span-p" style={{ width: "59rem" }}> </p>
                </span>
                <span className="af-span-3" style={{ width: "60rem" }}>
                    <p className="af-span-p" style={{ width: "59rem" }}> </p>
                </span>
                <span className="af-span-3" style={{ width: "60rem" }}>
                    <p className="af-span-p" style={{ width: "59rem" }}> </p>
                </span>
                <span className="af-span-3" style={{ width: "38rem" }}>
                    <p className="af-span-p" style={{ width: "37rem" }}> </p>
                </span>
            </div>

            <div
                className="af-div-second"
                style={{
                    width: "61rem",
                    height: "23rem",
                    display: "flex",
                    flexWrap: "wrap",
                    alignContent: "flex-start",
                    columnGap: "0.25rem",
                    rowGap: "0.2rem",
                }}
            >
                <span className="af-span-3-0" style={{ width: "60rem" }}>
                    <p className="af-span-p" style={{ width: "10rem" }}>봉제유저</p>
                    <div className="af-span-div" style={{ width: "10rem" }}>
                        <Dropdown
                            style={{ width: "10rem" }}
                            disabled={disabled3}
                            id="id_SEW_USER"
                            value={dataEDT_KZZ_SAMPLE_COST_SEW_USER}
                            onChange={(e) =>
                                onDropdownChangeEDT_KZZ_SAMPLE_COST_SEW_USER(
                                    e,
                                    "SEW_USER",
                                )
                            }
                            options={datasEDT_KZZ_SAMPLE_COST_SEW_USER}
                            optionLabel="USER_NAME"
                            placeholder=""
                            editable
                            filter
                        ></Dropdown>
                    </div>
                    <div className="af-span-div" style={{ width: "25rem" }}>
                        <Dropdown
                            style={{ width: "25rem" }}
                            disabled={disabled4}
                            id="id_SEW_COST"
                            value={dataEDT_KZZ_SAMPLE_COST_SEW_COST}
                            onChange={(e) =>
                                onDropdownChangeEDT_KZZ_SAMPLE_COST_SEW_COST(
                                    e,
                                    "SEW_COST",
                                )
                            }
                            options={datasEDT_KZZ_SAMPLE_COST_SEW_COST}
                            optionLabel="CD_NAME"
                            placeholder=""
                            editable
                            filter
                        ></Dropdown>
                    </div>
                    <div className="af-span-div" style={{ width: "13rem" }}>
                        <InputText
                            style={{ width: "13rem" }}
                            disabled={disabled4}
                            id="id_SEW_AMT"
                            value={dataEDT_KZZ_SAMPLE_COST.SEW_AMT}
                            onChange={(e) =>
                                onInputChangeEDT_KZZ_SAMPLE_COST_SEW_AMT(
                                    e,
                                    "SEW_AMT",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "60rem" }}>
                    <p className="af-span-p" style={{ width: "10rem" }}>패턴유저</p>
                    <div className="af-span-div" style={{ width: "10rem" }}>
                        <Dropdown
                            style={{ width: "10rem" }}
                            disabled={disabled4}
                            id="id_PATT_USER"
                            value={dataEDT_KZZ_SAMPLE_COST_PATT_USER}
                            onChange={(e) =>
                                onDropdownChangeEDT_KZZ_SAMPLE_COST_PATT_USER(
                                    e,
                                    "PATT_USER",
                                )
                            }
                            options={datasEDT_KZZ_SAMPLE_COST_PATT_USER}
                            optionLabel="USER_NAME"
                            placeholder=""
                            editable
                            filter
                        ></Dropdown>
                    </div>
                    <div className="af-span-div" style={{ width: "25rem" }}>
                        <Dropdown
                            style={{ width: "25rem" }}
                            disabled={disabled4}
                            id="id_PATT_COST"
                            value={dataEDT_KZZ_SAMPLE_COST_PATT_COST}
                            onChange={(e) =>
                                onDropdownChangeEDT_KZZ_SAMPLE_COST_PATT_COST(
                                    e,
                                    "PATT_COST",
                                )
                            }
                            options={datasEDT_KZZ_SAMPLE_COST_PATT_COST}
                            optionLabel="CD_NAME"
                            placeholder=""
                            editable
                            filter
                        ></Dropdown>
                    </div>
                    <div className="af-span-div" style={{ width: "13rem" }}>
                        <InputText
                            style={{ width: "13rem" }}
                            disabled={disabled4}
                            id="id_PATT_AMT"
                            value={dataEDT_KZZ_SAMPLE_COST.PATT_AMT}
                            onChange={(e) =>
                                onInputChangeEDT_KZZ_SAMPLE_COST_PATT_AMT(
                                    e,
                                    "PATT_AMT",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "60rem" }}>
                    <p className="af-span-p" style={{ width: "10rem" }}>웰딩비용</p>
                    <div className="af-span-div" style={{ width: "35rem" }}>
                        <InputText
                            style={{ width: "35rem" }}
                            disabled={disabled4}
                            id="id_WELDING_COST"
                            value={dataEDT_KZZ_SAMPLE_COST.WELDING_COST}
                            onChange={(e) =>
                                onInputChangeEDT_KZZ_SAMPLE_COST_WELDING_COST(
                                    e,
                                    "WELDING_COST",
                                )
                            }
                        />
                    </div>
                    <div className="af-span-div" style={{ width: "13rem" }}>
                        <InputText
                            style={{ width: "13rem" }}
                            disabled={disabled4}
                            id="id_WELDING_AMT"
                            value={dataEDT_KZZ_SAMPLE_COST.WELDING_AMT}
                            onChange={(e) =>
                                onInputChangeEDT_KZZ_SAMPLE_COST_WELDING_AMT(
                                    e,
                                    "WELDING_AMT",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "60rem" }}>
                    <p className="af-span-p" style={{ width: "10rem" }}>재단</p>
                    <div className="af-span-div" style={{ width: "49rem" }}>
                        <Dropdown
                            style={{ width: "49rem" }}
                            disabled={disabled4}
                            id="id_CUTTING_USER"
                            value={dataEDT_KZZ_SAMPLE_COST_CUTTING_USER}
                            onChange={(e) =>
                                onDropdownChangeEDT_KZZ_SAMPLE_COST_CUTTING_USER(
                                    e,
                                    "CUTTING_USER",
                                )
                            }
                            options={datasEDT_KZZ_SAMPLE_COST_CUTTING_USER}
                            optionLabel="USER_NAME"
                            placeholder=""
                            editable
                            filter
                        ></Dropdown>
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "60rem" }}>
                    <p className="af-span-p" style={{ width: "10rem" }}>완성</p>
                    <div className="af-span-div" style={{ width: "49rem" }}>
                        <Dropdown
                            style={{ width: "49rem" }}
                            disabled={disabled4}
                            id="id_COMPLETE_USER"
                            value={dataEDT_KZZ_SAMPLE_COST_COMPLETE_USER}
                            onChange={(e) =>
                                onDropdownChangeEDT_KZZ_SAMPLE_COST_COMPLETE_USER(
                                    e,
                                    "COMPLETE_USER",
                                )
                            }
                            options={datasEDT_KZZ_SAMPLE_COST_COMPLETE_USER}
                            optionLabel="USER_NAME"
                            placeholder=""
                            editable
                            filter
                        ></Dropdown>
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "60rem" }}>
                    <p className="af-span-p" style={{ width: "10rem" }}>자수</p>
                    <div className="af-span-div" style={{ width: "10rem" }}>
                        <Dropdown
                            style={{ width: "10rem" }}
                            disabled={disabled4}
                            id="id_PATT3D_USER"
                            value={dataEDT_KZZ_SAMPLE_COST_PATT3D_USER}
                            onChange={(e) =>
                                onDropdownChangeEDT_KZZ_SAMPLE_COST_PATT3D_USER(
                                    e,
                                    "PATT3D_USER",
                                )
                            }
                            options={datasEDT_KZZ_SAMPLE_COST_PATT3D_USER}
                            optionLabel="USER_NAME"
                            placeholder=""
                            editable
                            filter
                        ></Dropdown>
                    </div>
                    <div className="af-span-div" style={{ width: "25rem" }}>
                        <Dropdown
                            style={{ width: "25rem" }}
                            disabled={disabled4}
                            id="id_PATT3D_COST"
                            value={dataEDT_KZZ_SAMPLE_COST_PATT3D_COST}
                            onChange={(e) =>
                                onDropdownChangeEDT_KZZ_SAMPLE_COST_PATT3D_COST(
                                    e,
                                    "PATT3D_COST",
                                )
                            }
                            options={datasEDT_KZZ_SAMPLE_COST_PATT3D_COST}
                            optionLabel="CD_NAME"
                            placeholder=""
                            editable
                        ></Dropdown>
                    </div>
                    <div className="af-span-div" style={{ width: "13rem" }}>
                        <InputText
                            style={{ width: "13rem" }}
                            disabled={disabled4}
                            id="id_PATT3D_AMT"
                            value={dataEDT_KZZ_SAMPLE_COST.PATT3D_AMT}
                            onChange={(e) =>
                                onInputChangeEDT_KZZ_SAMPLE_COST_PATT3D_AMT(
                                    e,
                                    "PATT3D_AMT",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "60rem" }}>
                    <p className="af-span-p" style={{ width: "10rem" }}>3D작업유저</p>
                    <div className="af-span-div" style={{ width: "10rem" }}>
                        <Dropdown
                            style={{ width: "10rem" }}
                            disabled={disabled4}
                            id="id_WORK3D_USER"
                            value={dataEDT_KZZ_SAMPLE_COST_WORK3D_USER}
                            onChange={(e) =>
                                onDropdownChangeEDT_KZZ_SAMPLE_COST_WORK3D_USER(
                                    e,
                                    "WORK3D_USER",
                                )
                            }
                            options={datasEDT_KZZ_SAMPLE_COST_WORK3D_USER}
                            optionLabel="USER_NAME"
                            placeholder=""
                            editable
                            filter
                        ></Dropdown>
                    </div>
                    <div className="af-span-div" style={{ width: "25rem" }}>
                        <Dropdown
                            style={{ width: "25rem" }}
                            disabled={disabled4}
                            id="id_WORK3D_COST"
                            value={dataEDT_KZZ_SAMPLE_COST_WORK3D_COST}
                            onChange={(e) =>
                                onDropdownChangeEDT_KZZ_SAMPLE_COST_WORK3D_COST(
                                    e,
                                    "WORK3D_COST",
                                )
                            }
                            options={datasEDT_KZZ_SAMPLE_COST_WORK3D_COST}
                            optionLabel="CD_NAME"
                            placeholder=""
                            editable
                        ></Dropdown>
                    </div>
                    <div className="af-span-div" style={{ width: "13rem" }}>
                        <InputText
                            style={{ width: "13rem" }}
                            disabled={disabled4}
                            id="id_argData.WORK3D_AMT"
                            value={dataEDT_KZZ_SAMPLE_COST.WORK3D_AMT}
                            onChange={(e) =>
                                onInputChangeEDT_KZZ_SAMPLE_COST_WORK3D_AMT(
                                    e,
                                    "WORK3D_AMT",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "60rem" }}>
                    <p className="af-span-p" style={{ width: "10rem" }}>3D컬러추가</p>
                    <div className="af-span-div" style={{ width: "49rem" }}>
                        <InputText
                            style={{ width: "49rem" }}
                            disabled={disabled4}
                            id="id_COLOR3D_QTY"
                            value={dataEDT_KZZ_SAMPLE_COST.COLOR3D_QTY}
                            onChange={(e) =>
                                onInputChangeEDT_KZZ_SAMPLE_COST_COLOR3D_QTY(
                                    e,
                                    "COLOR3D_QTY",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "60rem" }}>
                    <p className="af-span-p" style={{ width: "10rem" }}>3D컬러추가Cost</p>
                    <div className="af-span-div" style={{ width: "49rem" }}>
                        <InputText
                            style={{ width: "49rem" }}
                            disabled={disabled4}
                            id="id_COLOR3D_AMT"
                            value={dataEDT_KZZ_SAMPLE_COST.COLOR3D_AMT}
                            onChange={(e) =>
                                onInputChangeEDT_KZZ_SAMPLE_COST_COLOR3D_AMT(
                                    e,
                                    "COLOR3D_AMT",
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
                <span className="af-span-3-0" style={{ width: "15rem" }}>
                    <div className="af-span-div-btn" style={{ width: "14rem" }}>
                        <Button
                            style={{ width: "14rem" }}
                            label="Reset"
                            className="p-button-text"
                            onClick={reset_EDT}
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "15rem" }}>
                    <div className="af-span-div-btn" style={{ width: "14rem" }}>
                        <Button
                            style={{ width: "14rem" }}
                            label="Save"
                            className="p-button-text"
                            onClick={process_UPDATE_SAMPLE_COST}
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "15rem" }}>
                    <div className="af-span-div-btn" style={{ width: "14rem" }}>
                        <Button
                            style={{ width: "14rem" }}
                            label="Sample End"
                            className="p-button-text"
                            onClick={process_UPDATE_SAMPLE_COST_END}
                        ></Button>
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "15rem" }}>
                    <div className="af-span-div-btn" style={{ width: "14rem" }}>
                        <Button
                            style={{ width: "14rem" }}
                            label="SPW-3D Update"
                            className="p-button-text"
                            onClick={process_UPDATE_SAMPLE_COST_SPW_3D}
                        ></Button>
                    </div>
                </span>
            </div>

            <Toast ref={toast} />
        </div>
    );
};

const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(S0203_SAMPLE_COST, comparisonFn);
