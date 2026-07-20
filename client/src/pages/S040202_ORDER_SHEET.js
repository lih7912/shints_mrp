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
import { ServiceS040202_ORDER_SHEET } from "../service/service_biz/ServiceS040202_ORDER_SHEET";

import "./page_common.scss";

const emptyKCD_CODE = {
    id: 0,
    CD_GROUP: "",
    CD_CODE: "",
    CD_NAME: "",
    CD_FLAG: "",
};

const emptyQRY_KCD_MATL_MST = {
    PO_CD: "",
    PO_SEQ: "",
    ETD: "",
    BUYER_CD: "",
    PLACE_NAME: "",
    FACTORY_NAME: "",
    FACTORY_CD: "",
    IS_SHIP_PLAN: "",
    TARGET_ETD: "",
    TARGET_ETA: "",
};

const emptyTBL_KCD_USER = {
    id: 0,
    USER_ID: "",
    USER_NAME: "",
    EMAIL: "",
};

const emptyTBL_KSV_PO_MRP = {
    id: 0,
    VENDOR_NAME: "",
    VENDOR_CD: "",
    SEND_DATETIME: "",
    PU: "",
    REMARK: "",
};

const emptyEDT_KSV_PO_MRP = {
    TITLE: "",
};

const S040202_ORDER_SHEET = () => {
    const serviceLibRef = useRef(null);
    if (!serviceLibRef.current) {
        serviceLibRef.current = new ServiceLib();
        serviceLibRef.current.loginConfirm();
    }
    const serviceLib = serviceLibRef.current;
    const serviceS040202_ORDER_SHEETRef = useRef(null);
    if (!serviceS040202_ORDER_SHEETRef.current) serviceS040202_ORDER_SHEETRef.current = new ServiceS040202_ORDER_SHEET();
    const serviceS040202_ORDER_SHEET = serviceS040202_ORDER_SHEETRef.current;

    const toast = useRef(null);

    /* splitter 관련 */
    const [styleVal, setStyleVal] = useState({ width: "65vw" });

    /* QRY KCD_MATL_MST*/

    const [dataQRY_KCD_MATL_MST, setDataQRY_KCD_MATL_MST] = useState(
        emptyQRY_KCD_MATL_MST,
    );

    const onInputChangeQRY_KCD_MATL_MST_PO_CD = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KCD_MATL_MST = { ...dataQRY_KCD_MATL_MST };

        let tTypeVal = _dataQRY_KCD_MATL_MST[`${name}`];
        if (typeof tTypeVal === "string")
            _dataQRY_KCD_MATL_MST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KCD_MATL_MST[`${name}`] = parseInt(val);

        setDataQRY_KCD_MATL_MST(_dataQRY_KCD_MATL_MST);
    };

    const [datasQRY_KCD_MATL_MST_PO_SEQ, setDatasQRY_KCD_MATL_MST_PO_SEQ] =
        useState([]);
    const [dataQRY_KCD_MATL_MST_PO_SEQ, setDataQRY_KCD_MATL_MST_PO_SEQ] =
        useState({});

    const onDropdownChangeQRY_KCD_MATL_MST_PO_SEQ = (e, name) => {
        let val = (e.value && e.value.PO_SEQ) || "";

        let _dataQRY_KCD_MATL_MST = { ...dataQRY_KCD_MATL_MST };

        let tTypeVal = _dataQRY_KCD_MATL_MST[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KCD_MATL_MST[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KCD_MATL_MST[`${name}`] = parseInt(val);
        }

        setDataQRY_KCD_MATL_MST(_dataQRY_KCD_MATL_MST);
        setDataQRY_KCD_MATL_MST_PO_SEQ(e.value);
    };

    const onInputChangeQRY_KCD_MATL_MST_ETD = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KCD_MATL_MST = { ...dataQRY_KCD_MATL_MST };

        let tTypeVal = _dataQRY_KCD_MATL_MST[`${name}`];
        if (typeof tTypeVal === "string")
            _dataQRY_KCD_MATL_MST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KCD_MATL_MST[`${name}`] = parseInt(val);

        setDataQRY_KCD_MATL_MST(_dataQRY_KCD_MATL_MST);
    };

    const onInputChangeQRY_KCD_MATL_MST_BUYER_CD = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KCD_MATL_MST = { ...dataQRY_KCD_MATL_MST };

        let tTypeVal = _dataQRY_KCD_MATL_MST[`${name}`];
        if (typeof tTypeVal === "string")
            _dataQRY_KCD_MATL_MST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KCD_MATL_MST[`${name}`] = parseInt(val);

        setDataQRY_KCD_MATL_MST(_dataQRY_KCD_MATL_MST);
    };

    const [
        datasQRY_KCD_MATL_MST_PLACE_NAME,
        setDatasQRY_KCD_MATL_MST_PLACE_NAME,
    ] = useState([]);
    const [
        dataQRY_KCD_MATL_MST_PLACE_NAME,
        setDataQRY_KCD_MATL_MST_PLACE_NAME,
    ] = useState({});

    const onDropdownChangeQRY_KCD_MATL_MST_PLACE_NAME = (e, name) => {
        let val = (e.value && e.value.PLACE_NAME) || "";

        let _dataQRY_KCD_MATL_MST = { ...dataQRY_KCD_MATL_MST };

        let tTypeVal = _dataQRY_KCD_MATL_MST[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KCD_MATL_MST[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KCD_MATL_MST[`${name}`] = parseInt(val);
        }

        setDataQRY_KCD_MATL_MST(_dataQRY_KCD_MATL_MST);
        setDataQRY_KCD_MATL_MST_PLACE_NAME(e.value);
    };

    const onInputChangeQRY_KCD_MATL_MST_FACTORY_NAME = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KCD_MATL_MST = { ...dataQRY_KCD_MATL_MST };

        let tTypeVal = _dataQRY_KCD_MATL_MST[`${name}`];
        if (typeof tTypeVal === "string")
            _dataQRY_KCD_MATL_MST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KCD_MATL_MST[`${name}`] = parseInt(val);

        setDataQRY_KCD_MATL_MST(_dataQRY_KCD_MATL_MST);
    };

    const onInputChangeQRY_KCD_MATL_MST_FACTORY_CD = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KCD_MATL_MST = { ...dataQRY_KCD_MATL_MST };

        let tTypeVal = _dataQRY_KCD_MATL_MST[`${name}`];
        if (typeof tTypeVal === "string")
            _dataQRY_KCD_MATL_MST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KCD_MATL_MST[`${name}`] = parseInt(val);

        setDataQRY_KCD_MATL_MST(_dataQRY_KCD_MATL_MST);
    };

    const onCheckboxChangeQRY_KCD_MATL_MST_IS_SHIP_PLAN = (e, name) => {
        let val = "";
        let _dataQRY_KCD_MATL_MST = { ...dataQRY_KCD_MATL_MST };
        if (e.checked) {
            val = "1";
        } else {
            val = "0";
        }
        _dataQRY_KCD_MATL_MST[`${name}`] = val;
        setDataQRY_KCD_MATL_MST(_dataQRY_KCD_MATL_MST);
    };

    const onCalChangeQRY_KCD_MATL_MST_TARGET_ETD = (e, name) => {
        let val1 = e.value || "";
        let val = "";
        if (val1 === "") {
            val = "";
        } else {
            val = getDateVal(val1);
        }

        let _dataQRY_KCD_MATL_MST = { ...dataQRY_KCD_MATL_MST };
        _dataQRY_KCD_MATL_MST[`${name}`] = val;
        setDataQRY_KCD_MATL_MST(_dataQRY_KCD_MATL_MST);
    };

    const onCalChangeQRY_KCD_MATL_MST_TARGET_ETA = (e, name) => {
        let val1 = e.value || "";
        let val = "";
        if (val1 === "") {
            val = "";
        } else {
            val = getDateVal(val1);
        }

        let _dataQRY_KCD_MATL_MST = { ...dataQRY_KCD_MATL_MST };
        _dataQRY_KCD_MATL_MST[`${name}`] = val;
        setDataQRY_KCD_MATL_MST(_dataQRY_KCD_MATL_MST);
    };

    /*TABLE KCD_USER */
    // DEFINE DATAGRID : TBL_KCD_USER
    const [datasTBL_KCD_USER, setDatasTBL_KCD_USER] = useState([]);
    const dt_TBL_KCD_USER = useRef(null);
    const [dataTBL_KCD_USER, setDataTBL_KCD_USER] = useState(emptyTBL_KCD_USER);
    const [selectedTBL_KCD_USER, setSelectedTBL_KCD_USER] = useState([]);
    const [flagSelectModeTBL_KCD_USER, setFlagSelectModeTBL_KCD_USER] =
        useState(false);

    // DATAGRID CODE : TBL_KCD_USER
    const processPoPlan = () => {
        var tArray = [];
        var tObj = { ...dataQRY_KCD_MATL_MST };
        tObj.USER_ID1 = "aftest";
        tObj.USER_ID2 = "aftest2";

        serviceS040202_ORDER_SHEET.mgrQuery_PoPlan(tObj).then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                console.log(
                    "ServiceMgrKCD_BUYER.mgr1KcdStyle call => " + data.length,
                );
                toast.current.show({
                    severity: "success",
                    summary: "Succeed Po Plan",
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
                    summary: "Error Po Plan",
                    detail: data[0].CODE,
                    life: 3000,
                });
            }
        });
    };

    const onRowClick1TBL_KCD_USER = (argData0) => {
        var argData = {};

        if (typeof argData0.length !== "undefined") {
            argData = argData0[0];
        } else {
            argData = argData0;
        }

        let argTBL_KCD_USER = argData;

        setDataTBL_KCD_USER(argTBL_KCD_USER);
    };

    const onRowClickTBL_KCD_USER = (event) => {
        let argTBL_KCD_USER = event.data;
        if (flagSelectModeTBL_KCD_USER) return;

        // Service : NawooAll:mgrQueryTBL_KCD_USER
    };

    const searchTBL_KCD_USER = () => {
        clearSelectedTBL_KCD_USER();

        // serviceS040202_ORDER_SHEET.mgrQueryTBL_KCD_USER(dataQRY_KCD_USER).then(data => {
        //     if (typeof data.graphQLErrors === 'undefined') {
        //         console.log("ServiceNawooAll.mgrQueryTBL_KCD_USER() call => " + data.length);
        //         setDatasTBL_KCD_USER(data);
        //     } else {
        //         // var tStr = data.graphQLErrors[0].message;
        //         console.log("ServiceNawooAll.mgrQueryTBL_KCD_USER()error => " + JSON.stringify(data.graphQLErrors));
        //
        //     }
        // });

        // Service : NawooAll:mgrQueryTBL_KCD_USER
    };

    const clearSelectedTBL_KCD_USER = () => {
        setSelectedTBL_KCD_USER([]);
        setFlagSelectModeTBL_KCD_USER(false);
    };

    const exportExcelTBL_KCD_USER = () => {};

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

    /**EDIT KSV_PO_MRP */
    const [datasEDT_KSV_PO_MRP, setDatasEDT_KSV_PO_MRP] = useState([]);
    const [dataEDT_KSV_PO_MRP, setDataEDT_KSV_PO_MRP] =
        useState(emptyEDT_KSV_PO_MRP);

    const onInputChangeEDT_KSV_PO_MRP_TITLE = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_PO_MRP = { ...dataEDT_KSV_PO_MRP };

        let tTypeVal = _dataEDT_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string") _dataEDT_KSV_PO_MRP[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_PO_MRP[`${name}`] = parseInt(val);

        setDataEDT_KSV_PO_MRP(_dataEDT_KSV_PO_MRP);
    };

    useEffect(() => {
        let tPO_CD = "";
        let tBUYER_CD = "";
        let tParam = "";

        var tUrls = window.location.href.split("?");
        if (tUrls.length <= 1) {
        } else {
            var tParams1 = tUrls[1].split("&");
            var tParams2 = tParams1.map((col, i) => {
                var tObj = {};
                var tCols = col.split("=");

                if (tCols[0].includes("PO_CD")) {
                    tObj.key = tCols[0];
                    tObj.value = tCols[1];
                    console.log(tObj);
                    tPO_CD = tObj.value;
                    return tObj;
                }
                if (tCols[0].includes("BUYER_CD")) {
                    tObj.key = tCols[0];
                    tObj.value = tCols[1];
                    console.log(tObj);
                    tBUYER_CD = tObj.value;
                    return tObj;
                }
            });
            if (tParams2.length > 0) {
                tParam = tParams2[0].value;
            }
            console.log(tParams2);
        }

        if (tParam !== "") {
            console.log("S0402 PO Cd :(param)" + tPO_CD);
        } else {
            tPO_CD = localStorage.getItem("AF_S0402_PO_CD");
            tBUYER_CD = localStorage.getItem("AF_S0402_BUYER_CD");
            console.log("S0303 Order Cd: (localstorage)" + tPO_CD);
            if (tParam === null) tParam = "PO23-0229";
        }

        var tObj = {};
        // tObj.PO_CD = 'PO23-0229';
        tObj.PO_CD = tPO_CD;
        tObj.PO_SEQ = "all";
        // tObj.BUYER_CD = '1W';
        tObj.BUYER_CD = tBUYER_CD;
        serviceS040202_ORDER_SHEET.mgrQuery_CODE(tObj).then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                console.log(
                    "ServiceMgrKCD_BUYER.mgr1KcdStyle call => " +
                        data.PO_SEQ.length,
                );
                setDatasQRY_KCD_MATL_MST_PO_SEQ(data.PO_SEQ);
                setDataQRY_KCD_MATL_MST_PO_SEQ(data.PO_SEQ[0]);

                setDatasQRY_KCD_MATL_MST_PLACE_NAME(data.PLACE_CD);
                setDataQRY_KCD_MATL_MST_PLACE_NAME(data.PLACE_CD[0]);
            } else {
                console.log(
                    "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });

        serviceS040202_ORDER_SHEET.mgrQuery_CODE2(tObj).then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                console.log(
                    "ServiceMgrKCD_BUYER.mgr1KcdStyle call => " +
                        data.MD_LIST.length,
                );
                setDatasTBL_KCD_USER(data.MD_LIST);

                var _tObj = { ...dataQRY_KCD_MATL_MST };
                _tObj.PO_CD = tObj.PO_CD;
                _tObj.ETD = data.PLAN[0].PROD_DUE_DATE;
                _tObj.BUYER_CD = tObj.BUYER_CD;
                _tObj.FACTORY_NAME = "";
                _tObj.FACTORY_CD = data.PLAN[0].FACTORY_CD;
                _tObj.IS_SHIP_PLAN = data.PLAN[0].PLAN_FLAG;
                _tObj.TARGET_ETD = data.PLAN[0].PLAN_ETD;
                _tObj.TARGET_ETA = data.PLAN[0].PLAN_ETA;
                setDataQRY_KCD_MATL_MST(_tObj);
            } else {
                console.log(
                    "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });

        serviceS040202_ORDER_SHEET.mgrQuery_ORDER_LIST(tObj).then((data) => {
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
                    width: "65rem",
                    height: "2rem",
                    float: "left",
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
                    <p style={{ width: "5rem", display: "inline-block" }}>PO</p>
                    <InputText
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "10rem",
                        }}
                        id="id_PO_CD"
                        value={dataQRY_KCD_MATL_MST.PO_CD}
                        onChange={(e) =>
                            onInputChangeQRY_KCD_MATL_MST_PO_CD(e, "PO_CD")
                        }
                        disabled
                    />
                </span>
                <span
                    style={{
                        marginLeft: "0.5rem",
                        height: "2rem",
                        display: "inline-block",
                        width: "9rem",
                    }}
                >
                    <p style={{ width: "3rem", display: "inline-block" }}>Seq</p>
                    <div
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "5rem",
                        }}
                    >
                        <Dropdown
                            id="id_PO_SEQ"
                            value={dataQRY_KCD_MATL_MST_PO_SEQ}
                            onChange={(e) =>
                                onDropdownChangeQRY_KCD_MATL_MST_PO_SEQ(
                                    e,
                                    "PO_SEQ",
                                )
                            }
                            options={datasQRY_KCD_MATL_MST_PO_SEQ}
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
                        width: "30rem",
                    }}
                >
                    <p style={{ width: "8rem", display: "inline-block" }}>Ship Plan</p>
                    <div
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "3em",
                        }}
                    >
                        <Checkbox
                            style={{
                                display: "inline-block",
                                width: "2rem",
                                marginLeft: "0.5rem",
                            }}
                            id="id_IS_SHIP_PLAN"
                            checked={changeCheckBoxVal(
                                dataQRY_KCD_MATL_MST.IS_SHIP_PLAN,
                            )}
                            onChange={(e) =>
                                onCheckboxChangeQRY_KCD_MATL_MST_IS_SHIP_PLAN(
                                    e,
                                    "IS_SHIP_PLAN",
                                )
                            }
                        />
                    </div>

                    <Button
                        label="Plan Fix/Cancel"
                        className="p-button-text"
                        onClick={processPoPlan}
                    />
                    <Button
                        label="Reset"
                        className="p-button-text"
                        onClick={blankFn}
                    />
                </span>
                <span
                    style={{
                        marginLeft: "0.5rem",
                        height: "2rem",
                        marginTop: "0.5rem",
                        display: "inline-block",
                        width: "17rem",
                    }}
                >
                    <p style={{ width: "5rem", display: "inline-block" }}>ETD</p>
                    <InputText
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "10rem",
                        }}
                        id="id_ETD"
                        value={dataQRY_KCD_MATL_MST.ETD}
                        onChange={(e) =>
                            onInputChangeQRY_KCD_MATL_MST_ETD(e, "ETD")
                        }
                        disabled
                    />
                </span>
                <span
                    style={{
                        marginLeft: "0.5rem",
                        height: "2rem",
                        display: "inline-block",
                        width: "9rem",
                    }}
                >
                    <p style={{ width: "3rem", display: "inline-block" }}>Buyer</p>
                    <InputText
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "5rem",
                        }}
                        id="id_BUYER_CD"
                        value={dataQRY_KCD_MATL_MST.BUYER_CD}
                        onChange={(e) =>
                            onInputChangeQRY_KCD_MATL_MST_BUYER_CD(
                                e,
                                "BUYER_CD",
                            )
                        }
                    />
                </span>
                <span
                    style={{
                        marginLeft: "0.5rem",
                        height: "2rem",
                        display: "inline-block",
                        width: "33rem",
                    }}
                >
                    <p style={{ width: "8rem", display: "inline-block" }}>Target ETD</p>
                    <div
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "23rem",
                        }}
                    >
                        <Calendar
                            showButtonBar
                            dateFormat="yy-mm-dd"
                            id="id_TARGET_ETD"
                            value={changeDateVal(
                                dataQRY_KCD_MATL_MST.TARGET_ETD,
                            )}
                            onChange={(e) =>
                                onCalChangeQRY_KCD_MATL_MST_TARGET_ETD(
                                    e,
                                    "TARGET_ETD",
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
                        width: "28.5rem",
                    }}
                >
                    <p style={{ width: "5rem", display: "inline-block" }}>To Place</p>
                    <div
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "23rem",
                        }}
                    >
                        <Dropdown
                            id="id_PLACE_NAME"
                            value={dataQRY_KCD_MATL_MST_PLACE_NAME}
                            onChange={(e) =>
                                onDropdownChangeQRY_KCD_MATL_MST_PLACE_NAME(
                                    e,
                                    "PLACE_NAME",
                                )
                            }
                            options={datasQRY_KCD_MATL_MST_PLACE_NAME}
                            optionLabel="undefined"
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
                    <p style={{ width: "6rem", display: "inline-block" }}>Target ETA</p>
                    <div
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "23rem",
                        }}
                    >
                        <Calendar
                            showButtonBar
                            dateFormat="yy-mm-dd"
                            id="id_TARGET_ETA"
                            value={changeDateVal(
                                dataQRY_KCD_MATL_MST.TARGET_ETA,
                            )}
                            onChange={(e) =>
                                onCalChangeQRY_KCD_MATL_MST_TARGET_ETA(
                                    e,
                                    "TARGET_ETA",
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
                        width: "40rem",
                    }}
                >
                    <p style={{ width: "5rem", display: "inline-block" }}>Factory</p>
                    <InputText
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "10rem",
                        }}
                        id="id_FACTORY_NAME"
                        value={dataQRY_KCD_MATL_MST.FACTORY_NAME}
                        onChange={(e) =>
                            onInputChangeQRY_KCD_MATL_MST_FACTORY_NAME(
                                e,
                                "FACTORY_NAME",
                            )
                        }
                    />

                    <InputText
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "19rem",
                        }}
                        id="id_FACTORY_CD"
                        value={dataQRY_KCD_MATL_MST.FACTORY_CD}
                        onChange={(e) =>
                            onInputChangeQRY_KCD_MATL_MST_FACTORY_CD(
                                e,
                                "FACTORY_CD",
                            )
                        }
                    />
                </span>

                <span style={{ display: "inline-block", marginLeft: "50rem" }}>
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
                        style={{ height: "1.1rem" }}
                        className="p-button-text"
                        onClick={searchTBL_KCD_USER}
                    />

                    <Button
                        label="Excel"
                        icon="pi pi-upload"
                        style={{ height: "1.1rem" }}
                        className="p-button-text green"
                        onClick={exportExcelTBL_KCD_USER}
                    />
                </span>
            </div>

            <div
                style={{
                    marginLeft: "1rem",
                    marginTop: "1rem",
                    width: "30rem",
                    height: "12rem",
                    float: "left",
                }}
            >
                <AFDataTable preventUnrelatedRerender
                    ref={dt_TBL_KCD_USER}
                    size="small"
                    value={datasTBL_KCD_USER}
                    resizableColumns
                    columnResizeMode="fit"
                    showGridlines
                    selectionMode="checkbox"
                    selection={selectedTBL_KCD_USER}
                    onSelectionChange={(e) => {
                        setFlagSelectModeTBL_KCD_USER(true);
                        setSelectedTBL_KCD_USER(e.value);
                        console.log(
                            "selected length:" + selectedTBL_KCD_USER.length,
                        );
                        onRowClick1TBL_KCD_USER(e.value);
                    }}
                    onRowClick={onRowClickTBL_KCD_USER}
                    dataKey="id"
                    className="datatable-responsive"
                    virtualScrollerOptions={{ itemSize: 5 }}
                    emptyMessage=" " //header={headerTBL_KCD_USER}
                    responsiveLayout="scroll"
                    scrollable
                    scrollHeight="10rem"
                >
                    {/* <AFColumn field="USER_ID" header="MD Cd" headerStyle={{ width: '10rem',height:'1.8rem' }} bodyStyle={{ width: '10rem',height:'1.8rem' }}></AFColumn> */}
                    <AFColumn field="MD" header="MD" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="EMAIL" header="Email" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                </AFDataTable>
            </div>

            <Divider />

            <div
                style={{
                    marginLeft: "1rem",
                    marginTop: "1rem",
                    width: "65rem",
                    height: "22rem",
                    float: "left",
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
                    virtualScrollerOptions={{ itemSize: 9 }}
                    emptyMessage=" " //header={headerTBL_KSV_PO_MRP}
                    responsiveLayout="scroll"
                    scrollable
                    scrollHeight="18rem"
                >
                    <AFColumn field="VENDOR_NAME" header="Supplier" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="VENDOR_CD" header="Vendor" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="END_DATE" header="Send Date" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="EMAIL" header="Email" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="VENDOR_TYPE" header="Vendor Type" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="PU" header="PU" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    <AFColumn field="REMARK" header="Remark" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                </AFDataTable>
            </div>

            <div
                style={{
                    marginLeft: "1.5rem",
                    width: "30rem",
                    height: "30rem",
                    float: "left",
                    marginTop: "1rem",
                }}
            >
                <div className="flex flex-row justify-content-start align-items-top">
                    <div style={{ width: "30rem", height: "30rem" }}>
                        <span
                            style={{
                                marginLeft: "0.5rem",
                                height: "2rem",
                                display: "inline-block",
                                width: "33rem",
                            }}
                        >
                            <p style={{ width: "10rem", display: "inline-block", }}>Content for Email</p>
                            <InputText
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "25rem",
                                }}
                                id="id_TITLE"
                                value={dataEDT_KSV_PO_MRP.TITLE}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_PO_MRP_TITLE(
                                        e,
                                        "TITLE",
                                    )
                                }
                            />

                            <InputTextarea
                                style={{
                                    marginLeft: "0.5rem",
                                    marginTop: "1rem",
                                    display: "inline-block",
                                    width: "25rem",
                                    height: "23rem",
                                }}
                            />
                        </span>
                    </div>

                    <div style={{ width: "40rem", height: "30rem" }}></div>
                </div>
            </div>

            <Divider />

            <div
                style={{ width: "100rem", height: "2rem", marginLeft: "69rem" }}
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

export default React.memo(S040202_ORDER_SHEET, comparisonFn);
