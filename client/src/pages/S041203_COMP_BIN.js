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
import { ServiceS041203_COMP_BIN } from "../service/service_biz/ServiceS041203_COMP_BIN";

import "./page_common.scss";

const emptyKCD_CODE = {
    id: 0,
    CD_GROUP: "",
    CD_CODE: "",
    CD_NAME: "",
    CD_FLAG: "",
};

const emptyEDT_KSV_STOCK_OUT = {
    PL_NO: "",
    IS_MAIN: "",
    IS_SUB: "",
    HS_NAME: "",
    HS_CODE: "",
    COMP1: "",
    COMP1_P: "",
    COMP2: "",
    COMP2_P: "",
    COMP3: "",
    COMP3_P: "",
    COMP4: "",
    COMP4_P: "",
    MATL_TYPE: "",
};

const emptyTBL_KSV_STOCK_OUT = {
    id: 0,
    PL_NO: "",
    HS_CODE: "",
    COMP1_PERCENT: "",
    COMP2_PERCENT: "",
    COMP3_PERCENT: "",
    COMP4_PERCENT: "",
};

const S041203_COMP_BIN = () => {
    const serviceLibRef = useRef(null);
    if (!serviceLibRef.current) {
        serviceLibRef.current = new ServiceLib();
        serviceLibRef.current.loginConfirm();
    }
    const serviceLib = serviceLibRef.current;
    const serviceS041203_COMP_BINRef = useRef(null);
    if (!serviceS041203_COMP_BINRef.current) serviceS041203_COMP_BINRef.current = new ServiceS041203_COMP_BIN();
    const serviceS041203_COMP_BIN = serviceS041203_COMP_BINRef.current;

    const toast = useRef(null);

    /* splitter 관련 */
    const [styleVal, setStyleVal] = useState({ width: "65vw" });

    const update_COMP = () => {
        var _tObj = { ...dataEDT_KSV_STOCK_OUT };

        if (selectedTBL_KSV_STOCK_OUT.length <= 0) return;

        var _tInput = { ...selectedTBL_KSV_STOCK_OUT[0] };
        _tInput.HS_CD = dataEDT_KSV_STOCK_OUT_HS_NAME.HS_NO;
        _tInput.COMP1 = dataEDT_KSV_STOCK_OUT.COMP1;
        _tInput.COMP1_PERCENT = dataEDT_KSV_STOCK_OUT.COMP1_P;
        _tInput.COMP2 = dataEDT_KSV_STOCK_OUT.COMP2;
        _tInput.COMP2_PERCENT = dataEDT_KSV_STOCK_OUT.COMP2_P;
        _tInput.COMP3 = dataEDT_KSV_STOCK_OUT.COMP3;
        _tInput.COMP3_PERCENT = dataEDT_KSV_STOCK_OUT.COMP3_P;
        _tInput.COMP4 = dataEDT_KSV_STOCK_OUT.COMP4;
        _tInput.COMP4_PERCENT = dataEDT_KSV_STOCK_OUT.COMP4_P;
        delete _tInput.__typename;
        delete _tInput.id;

        console.log(_tInput);

        var tArray = [];
        tArray.push(_tInput);

        serviceS041203_COMP_BIN.mgrInsert_COMP_BIN(tArray).then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                console.log(
                    "ServiceMgrKCD_BUYER.mgr1KcdStyle call => " + data.length,
                );
                toast.current.show({
                    severity: "success",
                    summary: "SUCCESS:Comp_bin Update",
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
                    summary: "ERROR:Comp_bin Update",
                    detail: "",
                    life: 3000,
                });
            }
        });
    };

    const search_COMP = () => {
        var tSrcData = { ...JSON.parse(localStorage.getItem("S041201_DATA")) };
        console.log(tSrcData);
        // setDataQRY_KSV_STOCK_OUT(tSrcData);

        // datasTBL_KSV_STOCK_OUT
        var _tObj = {};
        _tObj.PACK_CD = tSrcData.PACK_CD;

        serviceS041203_COMP_BIN.mgrQuery_COMP(_tObj).then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                console.log(
                    "ServiceMgrKCD_BUYER.mgr1KcdStyle call => " + data.length,
                );
                var tArray = data.map((col, i) => {
                    var tObj = { ...col };
                    tObj.id = i + 1;
                    return tObj;
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

    // EDT_
    const [datasEDT_KSV_STOCK_OUT, setDatasEDT_KSV_STOCK_OUT] = useState([]);
    const [dataEDT_KSV_STOCK_OUT, setDataEDT_KSV_STOCK_OUT] = useState(
        emptyEDT_KSV_STOCK_OUT,
    );

    const [datasEDT_KSV_STOCK_OUT_HS_NAME, setDatasEDT_KSV_STOCK_OUT_HS_NAME] =
        useState([]);
    const [dataEDT_KSV_STOCK_OUT_HS_NAME, setDataEDT_KSV_STOCK_OUT_HS_NAME] =
        useState({});

    const editEDT_KSV_STOCK_OUT_HS_NAME = (argValue) => {
        let _dataEDT_KSV_STOCK_OUT_HS_NAME =
            datasEDT_KSV_STOCK_OUT_HS_NAME.filter(
                (val) => val.HS_NAME === argValue,
            );
        setDataEDT_KSV_STOCK_OUT_HS_NAME(_dataEDT_KSV_STOCK_OUT_HS_NAME[0]);
    };

    const onDropdownChangeEDT_KSV_STOCK_OUT_HS_NAME = (e, name) => {
        let val = (e.value && e.value.HS_NAME) || "";

        let _dataEDT_KSV_STOCK_OUT = { ...dataEDT_KSV_STOCK_OUT };

        let tTypeVal = _dataEDT_KSV_STOCK_OUT[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_KSV_STOCK_OUT[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_KSV_STOCK_OUT[`${name}`] = parseInt(val);
        }
        setDataEDT_KSV_STOCK_OUT(_dataEDT_KSV_STOCK_OUT);
        setDataEDT_KSV_STOCK_OUT_HS_NAME(e.value);
    };

    const [datasEDT_KSV_STOCK_OUT_COMP1, setDatasEDT_KSV_STOCK_OUT_COMP1] =
        useState([]);
    const [dataEDT_KSV_STOCK_OUT_COMP1, setDataEDT_KSV_STOCK_OUT_COMP1] =
        useState({});

    const editEDT_KSV_STOCK_OUT_COMP1 = (argValue) => {
        let _dataEDT_KSV_STOCK_OUT_COMP1 = datasEDT_KSV_STOCK_OUT_COMP1.filter(
            (val) => val.CD_NAME === argValue,
        );
        setDataEDT_KSV_STOCK_OUT_COMP1(_dataEDT_KSV_STOCK_OUT_COMP1[0]);
    };

    const onDropdownChangeEDT_KSV_STOCK_OUT_COMP1 = (e, name) => {
        let val = (e.value && e.value.CD_NAME) || "";

        let _dataEDT_KSV_STOCK_OUT = { ...dataEDT_KSV_STOCK_OUT };

        let tTypeVal = _dataEDT_KSV_STOCK_OUT[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_KSV_STOCK_OUT[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_KSV_STOCK_OUT[`${name}`] = parseInt(val);
        }
        setDataEDT_KSV_STOCK_OUT(_dataEDT_KSV_STOCK_OUT);
        setDataEDT_KSV_STOCK_OUT_COMP1(e.value);
    };

    const [datasEDT_KSV_STOCK_OUT_COMP2, setDatasEDT_KSV_STOCK_OUT_COMP2] =
        useState([]);
    const [dataEDT_KSV_STOCK_OUT_COMP2, setDataEDT_KSV_STOCK_OUT_COMP2] =
        useState({});

    const editEDT_KSV_STOCK_OUT_COMP2 = (argValue) => {
        let _dataEDT_KSV_STOCK_OUT_COMP2 = datasEDT_KSV_STOCK_OUT_COMP2.filter(
            (val) => val.CD_NAME === argValue,
        );
        setDataEDT_KSV_STOCK_OUT_COMP2(_dataEDT_KSV_STOCK_OUT_COMP2[0]);
    };

    const onDropdownChangeEDT_KSV_STOCK_OUT_COMP2 = (e, name) => {
        let val = (e.value && e.value.CD_NAME) || "";

        let _dataEDT_KSV_STOCK_OUT = { ...dataEDT_KSV_STOCK_OUT };

        let tTypeVal = _dataEDT_KSV_STOCK_OUT[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_KSV_STOCK_OUT[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_KSV_STOCK_OUT[`${name}`] = parseInt(val);
        }
        setDataEDT_KSV_STOCK_OUT(_dataEDT_KSV_STOCK_OUT);
        setDataEDT_KSV_STOCK_OUT_COMP2(e.value);
    };

    const [datasEDT_KSV_STOCK_OUT_COMP3, setDatasEDT_KSV_STOCK_OUT_COMP3] =
        useState([]);
    const [dataEDT_KSV_STOCK_OUT_COMP3, setDataEDT_KSV_STOCK_OUT_COMP3] =
        useState({});

    const editEDT_KSV_STOCK_OUT_COMP3 = (argValue) => {
        let _dataEDT_KSV_STOCK_OUT_COMP3 = datasEDT_KSV_STOCK_OUT_COMP3.filter(
            (val) => val.CD_NAME === argValue,
        );
        setDataEDT_KSV_STOCK_OUT_COMP3(_dataEDT_KSV_STOCK_OUT_COMP3[0]);
    };

    const onDropdownChangeEDT_KSV_STOCK_OUT_COMP3 = (e, name) => {
        let val = (e.value && e.value.CD_NAME) || "";

        let _dataEDT_KSV_STOCK_OUT = { ...dataEDT_KSV_STOCK_OUT };

        let tTypeVal = _dataEDT_KSV_STOCK_OUT[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_KSV_STOCK_OUT[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_KSV_STOCK_OUT[`${name}`] = parseInt(val);
        }
        setDataEDT_KSV_STOCK_OUT(_dataEDT_KSV_STOCK_OUT);
        setDataEDT_KSV_STOCK_OUT_COMP3(e.value);
    };

    const [datasEDT_KSV_STOCK_OUT_COMP4, setDatasEDT_KSV_STOCK_OUT_COMP4] =
        useState([]);
    const [dataEDT_KSV_STOCK_OUT_COMP4, setDataEDT_KSV_STOCK_OUT_COMP4] =
        useState({});

    const editEDT_KSV_STOCK_OUT_COMP4 = (argValue) => {
        let _dataEDT_KSV_STOCK_OUT_COMP4 = datasEDT_KSV_STOCK_OUT_COMP4.filter(
            (val) => val.CD_NAME === argValue,
        );
        setDataEDT_KSV_STOCK_OUT_COMP4(_dataEDT_KSV_STOCK_OUT_COMP4[0]);
    };

    const onDropdownChangeEDT_KSV_STOCK_OUT_COMP4 = (e, name) => {
        let val = (e.value && e.value.CD_NAME) || "";

        let _dataEDT_KSV_STOCK_OUT = { ...dataEDT_KSV_STOCK_OUT };

        let tTypeVal = _dataEDT_KSV_STOCK_OUT[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_KSV_STOCK_OUT[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_KSV_STOCK_OUT[`${name}`] = parseInt(val);
        }
        setDataEDT_KSV_STOCK_OUT(_dataEDT_KSV_STOCK_OUT);
        setDataEDT_KSV_STOCK_OUT_COMP4(e.value);
    };

    const [
        datasEDT_KSV_STOCK_OUT_MATL_TYPE,
        setDatasEDT_KSV_STOCK_OUT_MATL_TYPE,
    ] = useState([]);
    const [
        dataEDT_KSV_STOCK_OUT_MATL_TYPE,
        setDataEDT_KSV_STOCK_OUT_MATL_TYPE,
    ] = useState({});

    const onDropdownChangeEDT_KSV_STOCK_OUT_MATL_TYPE = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataEDT_KSV_STOCK_OUT = { ...dataEDT_KSV_STOCK_OUT };

        let tTypeVal = _dataEDT_KSV_STOCK_OUT[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_KSV_STOCK_OUT[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_KSV_STOCK_OUT[`${name}`] = parseInt(val);
        }
        setDataEDT_KSV_STOCK_OUT(_dataEDT_KSV_STOCK_OUT);
        setDataEDT_KSV_STOCK_OUT_MATL_TYPE(e.value);
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

    const onInputChangeEDT_KSV_STOCK_OUT_HS_CODE = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_STOCK_OUT = { ...dataEDT_KSV_STOCK_OUT };

        let tTypeVal = _dataEDT_KSV_STOCK_OUT[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_STOCK_OUT[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_STOCK_OUT[`${name}`] = parseInt(val);

        setDataEDT_KSV_STOCK_OUT(_dataEDT_KSV_STOCK_OUT);
    };

    const onInputChangeEDT_KSV_STOCK_OUT_COMP1_P = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_STOCK_OUT = { ...dataEDT_KSV_STOCK_OUT };

        let tTypeVal = _dataEDT_KSV_STOCK_OUT[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_STOCK_OUT[`${name}`] = val;
        else if (typeof tTypeVal === "number") {
            if (val === "") val = "0";
            _dataEDT_KSV_STOCK_OUT[`${name}`] = parseInt(val);
        }

        setDataEDT_KSV_STOCK_OUT(_dataEDT_KSV_STOCK_OUT);
    };

    const onInputChangeEDT_KSV_STOCK_OUT_COMP2_P = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_STOCK_OUT = { ...dataEDT_KSV_STOCK_OUT };

        let tTypeVal = _dataEDT_KSV_STOCK_OUT[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_STOCK_OUT[`${name}`] = val;
        else if (typeof tTypeVal === "number") {
            if (val === "") val = "0";
            _dataEDT_KSV_STOCK_OUT[`${name}`] = parseInt(val);
        }

        setDataEDT_KSV_STOCK_OUT(_dataEDT_KSV_STOCK_OUT);
    };

    const onInputChangeEDT_KSV_STOCK_OUT_COMP3_P = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_STOCK_OUT = { ...dataEDT_KSV_STOCK_OUT };

        let tTypeVal = _dataEDT_KSV_STOCK_OUT[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_STOCK_OUT[`${name}`] = val;
        else if (typeof tTypeVal === "number") {
            if (val === "") val = "0";
            _dataEDT_KSV_STOCK_OUT[`${name}`] = parseInt(val);
        }

        setDataEDT_KSV_STOCK_OUT(_dataEDT_KSV_STOCK_OUT);
    };

    const onInputChangeEDT_KSV_STOCK_OUT_COMP4_P = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_STOCK_OUT = { ...dataEDT_KSV_STOCK_OUT };

        let tTypeVal = _dataEDT_KSV_STOCK_OUT[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_STOCK_OUT[`${name}`] = val;
        else if (typeof tTypeVal === "number") {
            if (val === "") val = "0";
            _dataEDT_KSV_STOCK_OUT[`${name}`] = parseInt(val);
        }

        setDataEDT_KSV_STOCK_OUT(_dataEDT_KSV_STOCK_OUT);
    };

    const onCheckboxChangeEDT_KSV_STOCK_OUT_IS_MAIN = (e, name) => {
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

    const onCheckboxChangeEDT_KSV_STOCK_OUT_IS_SUB = (e, name) => {
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
        // editTBL_KSV_STOCK_OUT(argTBL_KSV_STOCK_OUT);
        setDataTBL_KSV_STOCK_OUT(argTBL_KSV_STOCK_OUT);

        var tEdit = { ...dataEDT_KSV_STOCK_OUT };
        tEdit.HS_CODE = argData.HS_CD;
        tEdit.COMP1_P = argData.COMP1_PERCENT;
        tEdit.COMP2_P = argData.COMP2_PERCENT;
        tEdit.COMP3_P = argData.COMP3_PERCENT;
        tEdit.COMP4_P = argData.COMP4_PERCENT;
        tEdit.COMP1 = argData.COMP1;
        tEdit.COMP2 = argData.COMP2;
        tEdit.COMP3 = argData.COMP3;
        tEdit.COMP4 = argData.COMP4;
        setDataEDT_KSV_STOCK_OUT(tEdit);

        editEDT_KSV_STOCK_OUT_HS_NAME(argData.HS_NAME);
        editEDT_KSV_STOCK_OUT_COMP1(argData.COMP1);
        editEDT_KSV_STOCK_OUT_COMP2(argData.COMP2);
        editEDT_KSV_STOCK_OUT_COMP3(argData.COMP3);
        editEDT_KSV_STOCK_OUT_COMP4(argData.COMP4);
    };

    const onRowClickTBL_KSV_STOCK_OUT = (event) => {
        let argTBL_KSV_STOCK_OUT = event.data;
        if (flagSelectModeTBL_KSV_STOCK_OUT) return;

        // Service : NawooAll:mgrQueryTBL_KSV_STOCK_OUT
    };

    /* */

    useEffect(() => {
        var tSrcData = { ...JSON.parse(localStorage.getItem("S041201_DATA")) };
        console.log(tSrcData);

        var tEdit = { ...dataEDT_KSV_STOCK_OUT };
        tEdit.PL_NO = tSrcData.PACK_CD;
        setDataEDT_KSV_STOCK_OUT(tEdit);

        // datasTBL_KSV_STOCK_OUT
        var _tObj = {};
        _tObj.PACK_CD = "";

        serviceS041203_COMP_BIN.mgrQuery_CODE(_tObj).then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                console.log(
                    "ServiceMgrKCD_BUYER.mgr1KcdStyle call => " +
                        data.COMP.length,
                );

                setDatasEDT_KSV_STOCK_OUT_HS_NAME(data.HS_CODE);
                setDataEDT_KSV_STOCK_OUT_HS_NAME(data.HS_CODE[0]);

                setDatasEDT_KSV_STOCK_OUT_COMP1(data.COMP);
                setDataEDT_KSV_STOCK_OUT_COMP1(data.COMP[0]);

                setDatasEDT_KSV_STOCK_OUT_COMP2(data.COMP);
                setDataEDT_KSV_STOCK_OUT_COMP2(data.COMP[0]);

                setDatasEDT_KSV_STOCK_OUT_COMP3(data.COMP);
                setDataEDT_KSV_STOCK_OUT_COMP3(data.COMP[0]);

                setDatasEDT_KSV_STOCK_OUT_COMP4(data.COMP);
                setDataEDT_KSV_STOCK_OUT_COMP4(data.COMP[0]);

                setDatasEDT_KSV_STOCK_OUT_MATL_TYPE(data.MATL_TYPE);
                setDataEDT_KSV_STOCK_OUT_MATL_TYPE(data.MATL_TYPE[0]);
            } else {
                console.log(
                    "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });

        search_COMP();
    }, []);

    const blankFn = () => {};

    // Support Area

    const changeCheckBoxVal = (argVal) => {
        if (argVal === "1") return true;
        else return false;
    };

    return (
        <div>
            <div
                style={{ width: "100rem", height: "11rem", marginTop: "1rem" }}
            >
                <div style={{ width: "20rem", height: "10rem", float: "left" }}>
                    <span
                        style={{
                            marginLeft: "0.5rem",
                            height: "2rem",
                            display: "inline-block",
                            width: "19rem",
                        }}
                    >
                        <p style={{ width: "4rem", display: "inline-block" }}>PL No</p>
                        <InputText
                            style={{
                                marginLeft: "0.5rem",
                                display: "inline-block",
                                width: "13rem",
                            }}
                            id="id_CD_QTY"
                            value={dataEDT_KSV_STOCK_OUT.PL_NO}
                            onChange={(e) =>
                                onInputChangeEDT_KSV_STOCK_OUT_PL_NO(e, "PL_NO")
                            }
                        />
                    </span>
                    <span
                        style={{
                            marginLeft: "0.5rem",
                            height: "2rem",
                            display: "inline-block",
                            width: "19rem",
                        }}
                    >
                        <p style={{ width: "4rem", display: "inline-block" }}>Main</p>
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
                                    dataEDT_KSV_STOCK_OUT.IS_MAIN,
                                )}
                                onChange={(e) =>
                                    onCheckboxChangeEDT_KSV_STOCK_OUT_IS_MAIN(
                                        e,
                                        "IS_MAIN",
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
                            width: "19rem",
                        }}
                    >
                        <p style={{ width: "4rem", display: "inline-block" }}>Sub</p>
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
                                    dataEDT_KSV_STOCK_OUT.IS_SUB,
                                )}
                                onChange={(e) =>
                                    onCheckboxChangeEDT_KSV_STOCK_OUT_IS_SUB(
                                        e,
                                        "IS_SUB",
                                    )
                                }
                            />
                        </div>
                    </span>
                </div>
                <div style={{ width: "30rem", height: "10rem", float: "left" }}>
                    <span
                        style={{
                            marginLeft: "0.5rem",
                            height: "2rem",
                            display: "inline-block",
                            width: "28rem",
                        }}
                    >
                        <p style={{ width: "4rem", display: "inline-block" }}>HS CD</p>
                        <div
                            style={{
                                marginLeft: "0.5rem",
                                display: "inline-block",
                                width: "18rem",
                            }}
                        >
                            <Dropdown
                                id="id_FROM_TYPE"
                                value={dataEDT_KSV_STOCK_OUT_HS_NAME}
                                onChange={(e) =>
                                    onDropdownChangeEDT_KSV_STOCK_OUT_HS_NAME(
                                        e,
                                        "HS_NAME",
                                    )
                                }
                                options={datasEDT_KSV_STOCK_OUT_HS_NAME}
                                optionLabel="HS_NAME"
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
                            width: "28rem",
                        }}
                    >
                        <p style={{ width: "4rem", display: "inline-block" }}> </p>
                        <InputText
                            style={{
                                marginLeft: "0.5rem",
                                display: "inline-block",
                                width: "13rem",
                            }}
                            id="id_CD_QTY"
                            value={dataEDT_KSV_STOCK_OUT.HS_CODE}
                            onChange={(e) =>
                                onInputChangeEDT_KSV_STOCK_OUT_HS_CODE(
                                    e,
                                    "HS_CODE",
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
                        <Tooltip
                            className="menuCodeTooltip"
                            target={`#btnSearch`}
                            content={`Alt+S`}
                            position="bottom"
                        />

                        <Button
                            style={{ width: "8rem", height: "1.1rem" }}
                            label={
                                <span>
                                    Search(<u>S</u>)
                                </span>
                            }
                            accessKey="S"
                            id="btnSearch"
                            icon="pi pi-times"
                            className="p-button-text"
                            onClick={search_COMP}
                        />

                        <Button
                            style={{ width: "8rem", height: "1.1rem" }}
                            label="Update"
                            icon="pi pi-times"
                            className="p-button-text"
                            onClick={update_COMP}
                        />

                        <Button
                            style={{ width: "6rem", height: "1.1rem" }}
                            label="Exit"
                            icon="pi pi-times"
                            className="p-button-text"
                            onClick={blankFn}
                        />
                    </span>
                </div>
                <div style={{ width: "30rem", height: "10rem", float: "left" }}>
                    <span
                        style={{
                            marginLeft: "0.5rem",
                            height: "2rem",
                            display: "inline-block",
                            width: "20rem",
                        }}
                    >
                        <p style={{ width: "4rem", display: "inline-block" }}>Comp1</p>
                        <div
                            style={{
                                marginLeft: "0.5rem",
                                display: "inline-block",
                                width: "15rem",
                            }}
                        >
                            <Dropdown
                                id="id_FROM_TYPE"
                                value={dataEDT_KSV_STOCK_OUT_COMP1}
                                onChange={(e) =>
                                    onDropdownChangeEDT_KSV_STOCK_OUT_COMP1(
                                        e,
                                        "COMP1",
                                    )
                                }
                                options={datasEDT_KSV_STOCK_OUT_COMP1}
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
                            width: "8rem",
                        }}
                    >
                        <InputText
                            style={{
                                marginLeft: "0.5rem",
                                display: "inline-block",
                                width: "5rem",
                            }}
                            id="id_CD_QTY"
                            value={dataEDT_KSV_STOCK_OUT.COMP1_P}
                            onChange={(e) =>
                                onInputChangeEDT_KSV_STOCK_OUT_COMP1_P(
                                    e,
                                    "COMP1_P",
                                )
                            }
                        />

                        <p style={{ width: "2rem", display: "inline-block" }}>%</p>
                    </span>
                    <span
                        style={{
                            marginLeft: "0.5rem",
                            height: "2rem",
                            display: "inline-block",
                            width: "20rem",
                        }}
                    >
                        <p style={{ width: "4rem", display: "inline-block" }}>Comp2</p>
                        <div
                            style={{
                                marginLeft: "0.5rem",
                                display: "inline-block",
                                width: "15rem",
                            }}
                        >
                            <Dropdown
                                id="id_FROM_TYPE"
                                value={dataEDT_KSV_STOCK_OUT_COMP2}
                                onChange={(e) =>
                                    onDropdownChangeEDT_KSV_STOCK_OUT_COMP2(
                                        e,
                                        "COMP2",
                                    )
                                }
                                options={datasEDT_KSV_STOCK_OUT_COMP2}
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
                            width: "8rem",
                        }}
                    >
                        <InputText
                            style={{
                                marginLeft: "0.5rem",
                                display: "inline-block",
                                width: "5rem",
                            }}
                            id="id_CD_QTY"
                            value={dataEDT_KSV_STOCK_OUT.COMP2_P}
                            onChange={(e) =>
                                onInputChangeEDT_KSV_STOCK_OUT_COMP2_P(
                                    e,
                                    "COMP2_P",
                                )
                            }
                        />

                        <p style={{ width: "2rem", display: "inline-block" }}>%</p>
                    </span>
                    <span
                        style={{
                            marginLeft: "0.5rem",
                            height: "2rem",
                            display: "inline-block",
                            width: "20rem",
                        }}
                    >
                        <p style={{ width: "4rem", display: "inline-block" }}>Comp3</p>
                        <div
                            style={{
                                marginLeft: "0.5rem",
                                display: "inline-block",
                                width: "15rem",
                            }}
                        >
                            <Dropdown
                                id="id_FROM_TYPE"
                                value={dataEDT_KSV_STOCK_OUT_COMP3}
                                onChange={(e) =>
                                    onDropdownChangeEDT_KSV_STOCK_OUT_COMP3(
                                        e,
                                        "COMP1",
                                    )
                                }
                                options={datasEDT_KSV_STOCK_OUT_COMP3}
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
                            width: "8rem",
                        }}
                    >
                        <InputText
                            style={{
                                marginLeft: "0.5rem",
                                display: "inline-block",
                                width: "5rem",
                            }}
                            id="id_CD_QTY"
                            value={dataEDT_KSV_STOCK_OUT.COMP3_P}
                            onChange={(e) =>
                                onInputChangeEDT_KSV_STOCK_OUT_COMP3_P(
                                    e,
                                    "COMP3_P",
                                )
                            }
                        />

                        <p style={{ width: "2rem", display: "inline-block" }}>%</p>
                    </span>
                    <span
                        style={{
                            marginLeft: "0.5rem",
                            height: "2rem",
                            display: "inline-block",
                            width: "20rem",
                        }}
                    >
                        <p style={{ width: "4rem", display: "inline-block" }}>Comp4</p>
                        <div
                            style={{
                                marginLeft: "0.5rem",
                                display: "inline-block",
                                width: "15rem",
                            }}
                        >
                            <Dropdown
                                id="id_FROM_TYPE"
                                value={dataEDT_KSV_STOCK_OUT_COMP4}
                                onChange={(e) =>
                                    onDropdownChangeEDT_KSV_STOCK_OUT_COMP4(
                                        e,
                                        "COMP4",
                                    )
                                }
                                options={datasEDT_KSV_STOCK_OUT_COMP4}
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
                            width: "8rem",
                        }}
                    >
                        <InputText
                            style={{
                                marginLeft: "0.5rem",
                                display: "inline-block",
                                width: "5rem",
                            }}
                            id="id_CD_QTY"
                            value={dataEDT_KSV_STOCK_OUT.COMP4_P}
                            onChange={(e) =>
                                onInputChangeEDT_KSV_STOCK_OUT_COMP4_P(
                                    e,
                                    "COMP4_P",
                                )
                            }
                        />

                        <p style={{ width: "2rem", display: "inline-block" }}>%</p>
                    </span>
                </div>
                <div style={{ width: "18rem", height: "10rem", float: "left" }}>
                    <span
                        style={{
                            marginLeft: "0.5rem",
                            height: "2rem",
                            display: "inline-block",
                            width: "16rem",
                        }}
                    >
                        <p style={{ width: "4rem", display: "inline-block" }}>Matl</p>
                        <div
                            style={{
                                marginLeft: "0.5rem",
                                display: "inline-block",
                                width: "11rem",
                            }}
                        >
                            <Dropdown
                                id="id_FROM_TYPE"
                                value={dataEDT_KSV_STOCK_OUT_MATL_TYPE}
                                onChange={(e) =>
                                    onDropdownChangeEDT_KSV_STOCK_OUT_MATL_TYPE(
                                        e,
                                        "MATL_TYPE",
                                    )
                                }
                                options={datasEDT_KSV_STOCK_OUT_MATL_TYPE}
                                optionLabel="CD_NAME"
                                placeholder=""
                                editable
                            ></Dropdown>
                        </div>
                    </span>
                </div>
            </div>

            <Divider />

            <div
                style={{
                    marginLeft: "1rem",
                    marginTop: "1rem",
                    width: "99rem",
                    height: "22rem",
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
                    virtualScrollerOptions={{ itemSize: 9 }}
                    emptyMessage=" " //header={headerTBL_KSV_STOCK_OUT}
                    responsiveLayout="scroll"
                    scrollable
                    scrollHeight="18rem"
                >
                    <AFColumn field="VENDOR_NAME" headerClassName="t-header" header="Vendor" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="MATL_NAME" headerClassName="t-header" header="Matl" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="SPEC" headerClassName="t-header" header="Spec" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="WIDTH" headerClassName="t-header" header="Width" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="HS_NAME" headerClassName="t-header" header="Hs Name" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="HS_CD" headerClassName="t-header" header="Hs Cd" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="COMP1" headerClassName="t-header" header="Comp1" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="COMP1_PERCENT" headerClassName="t-header" header="." style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="COMP2" headerClassName="t-header" header="Comp1" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="COMP2_PERCENT" headerClassName="t-header" header="." style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="COMP3" headerClassName="t-header" header="Comp1" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="COMP3_PERCENT" headerClassName="t-header" header="." style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="COMP4" headerClassName="t-header" header="Comp1" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="COMP4_PERCENT" headerClassName="t-header" header="." style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                </AFDataTable>
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

            <div style={{ width: "100rem", height: "30rem" }}>
                <div className="flex flex-row justify-content-start align-items-top">
                    <div style={{ width: "60rem", height: "30rem" }}></div>

                    <div style={{ width: "40rem", height: "30rem" }}></div>
                </div>
            </div>

            <Toast ref={toast} />
        </div>
    );
};

const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(S041203_COMP_BIN, comparisonFn);
