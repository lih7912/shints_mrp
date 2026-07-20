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
import { ServiceS0408_MATL_PRICE_UPDATE } from "../service/service_biz/ServiceS0408_MATL_PRICE_UPDATE";

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
    IS_CURR_CHANGE: "",
    CURR_CD: "",
    PRICE: "",
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

const S0408_MATL_PRICE_UPDATE = () => {
    const serviceLibRef = useRef(null);
    if (!serviceLibRef.current) {
        serviceLibRef.current = new ServiceLib();
        serviceLibRef.current.loginConfirm();
    }
    const serviceLib = serviceLibRef.current;
    const serviceS0408_MATL_PRICE_UPDATERef = useRef(null);
    if (!serviceS0408_MATL_PRICE_UPDATERef.current) serviceS0408_MATL_PRICE_UPDATERef.current = new ServiceS0408_MATL_PRICE_UPDATE();
    const serviceS0408_MATL_PRICE_UPDATE = serviceS0408_MATL_PRICE_UPDATERef.current;

    const toast = useRef(null);

    /* splitter 관련 */
    const [styleVal, setStyleVal] = useState({ width: "65vw" });

    const setSalePrice = () => {
        var _tArray = datasTBL_KSV_PO_MRP1.map((col, i) => {
            var tObj = { ...col };
            if (tObj.BEF_PRICE <= 0 && tObj.SALE_PRICE > 0) {
                tObj.MATL_NEGO_PRICE = tObj.SALE_PRICE;
            }
            return tObj;
        });
        setDatasTBL_KSV_PO_MRP1(_tArray);
    };

    const queryNew = (argVENDOR_CD) => {
        var tObj0 = {};
        tObj0.PO_CD_ARRAY = datasTBL_KSV_PO_MST1.map((col, i) => {
            var tObj = { ...col };
            return tObj.PO_CD;
        });
        tObj0.VENDOR_CD = argVENDOR_CD;
        tObj0.PRICE_STATUS = "";
        tObj0.MATL_NAME = "";
        tObj0.SPEC = "";
        tObj0.COLOR = "";

        serviceS0408_MATL_PRICE_UPDATE
            .mgrQuery_MATL_PRICE(tObj0)
            .then((data) => {
                if (typeof data.graphQLErrors === "undefined") {
                    console.log("mgrQuery_STOCK_IN_PRE call => " + data.length);
                    setDatasTBL_KSV_PO_MRP1(data);
                } else {
                    console.log(
                        "mgrQuery_STOCK_IN_PRE error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });
    };
    const processPriceUpdate = () => {
        var tObjs = datasTBL_KSV_PO_MRP1.map((col, i) => {
            var tObj = { ...col };
            if (typeof tObj.__typename !== "undefined") delete tObj.__typename;
            if (typeof tObj.id !== "undefined") delete tObj.id;
            return tObj;
        });

        var tVendorCd = tObjs[0].VENDOR_CD;

        serviceS0408_MATL_PRICE_UPDATE
            .mgrInsert_MATL_PRICE_UPDATE(tObjs)
            .then((data) => {
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

        serviceS0408_MATL_PRICE_UPDATE.mgrQuery_PO_CD(tObj).then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                console.log("mgrQuery_PO_CD call => " + data.PO_CD.length);
                setDatasTBL_KSV_PO_MST(data.PO_CD);
                setDatasTBL_KSV_PO_MST1([]);
            } else {
                console.log(
                    "mgrQuery_PO_CD error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });
    };

    /**  QRY KSV_STOCK_IN*/
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

    /* QRY KSV_STOCK_IN1*/
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

    const onInputChangeQRY_KSV_STOCK_IN1_PRICE = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_STOCK_IN1 = { ...dataQRY_KSV_STOCK_IN1 };

        let tTypeVal = _dataQRY_KSV_STOCK_IN1[`${name}`];
        if (typeof tTypeVal === "string")
            _dataQRY_KSV_STOCK_IN1[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_STOCK_IN1[`${name}`] = parseInt(val);

        setDataQRY_KSV_STOCK_IN1(_dataQRY_KSV_STOCK_IN1);
    };

    const [datasQRY_KSV_STOCK_IN1_CURR_CD, setDatasQRY_KSV_STOCK_IN1_CURR_CD] =
        useState([]);
    const [dataQRY_KSV_STOCK_IN1_CURR_CD, setDataQRY_KSV_STOCK_IN1_CURR_CD] =
        useState({});

    const onDropdownChangeQRY_KSV_STOCK_IN1_CURR_CD = (e, name) => {
        let val = (e.value && e.value.CD_NAME) || "";

        let _dataQRY_KSV_STOCK_IN1 = { ...dataQRY_KSV_STOCK_IN1 };

        let tTypeVal = _dataQRY_KSV_STOCK_IN1[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_STOCK_IN1[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_STOCK_IN1[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_STOCK_IN1(_dataQRY_KSV_STOCK_IN1);
        setDataQRY_KSV_STOCK_IN1_CURR_CD(e.value);
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
        tObj0.PRICE_STATUS = "";
        tObj0.MATL_NAME = "";
        tObj0.SPEC = "";
        tObj0.COLOR = "";

        serviceS0408_MATL_PRICE_UPDATE
            .mgrQuery_MATL_PRICE(tObj0)
            .then((data) => {
                if (typeof data.graphQLErrors === "undefined") {
                    console.log("mgrQuery_STOCK_IN_PRE call => " + data.length);
                    setDatasTBL_KSV_PO_MRP1(data);
                } else {
                    console.log(
                        "mgrQuery_STOCK_IN_PRE error => " +
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

    /**TABLE_KSV_PO_MRP */
    // DEFINE DATAGRID : TBL_KSV_PO_MRP
    const [datasTBL_KSV_PO_MRP, setDatasTBL_KSV_PO_MRP] = useState([]);
    const dt_TBL_KSV_PO_MRP = useRef(null);
    const [dataTBL_KSV_PO_MRP, setDataTBL_KSV_PO_MRP] =
        useState(emptyTBL_KSV_PO_MRP);
    const [selectedTBL_KSV_PO_MRP, setSelectedTBL_KSV_PO_MRP] = useState([]);
    const [flagSelectModeTBL_KSV_PO_MRP, setFlagSelectModeTBL_KSV_PO_MRP] =
        useState(false);

    // DATAGRID CODE : TBL_KSV_PO_MRP

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

            serviceS0408_MATL_PRICE_UPDATE
                .mgrQuery_VENDOR_CD(tObj0)
                .then((data) => {
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

        serviceS0408_MATL_PRICE_UPDATE
            .mgrQuery_VENDOR_CD(tObj0)
            .then((data) => {
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

        // serviceS0408_MATL_PRICE_UPDATE.mgrQueryTBL_KSV_PO_MST1(dataQRY_KSV_PO_MST1).then(data => {
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

    useEffect(() => {
        var tObj = { ...emptyQRY_KSV_STOCK_IN };

        serviceS0408_MATL_PRICE_UPDATE.mgrQuery_PO_CD(tObj).then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                console.log("mgrQuery_PO_CD call => " + data.PO_CD.length);
                setDatasTBL_KSV_PO_MST(data.PO_CD);
                setDatasTBL_KSV_PO_MST1([]);

                setDatasQRY_KSV_STOCK_IN1_CURR_CD(data.CURR_CD);
                setDataQRY_KSV_STOCK_IN1_CURR_CD(data.CURR_CD[0]);
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
                        virtualScrollerOptions={{ itemSize: 50 }}
                        emptyMessage="No TBL_KSV_PO_MST found." //header={headerTBL_KSV_PO_MST}
                        responsiveLayout="scroll"
                        scrollable
                        scrollHeight="18rem"
                    >
                        <AFColumn field="PO_CD" header="Pp No" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
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
                        virtualScrollerOptions={{ itemSize: 50 }}
                        emptyMessage="No TBL_KSV_PO_MST1 found." //header={headerTBL_KSV_PO_MST1}
                        responsiveLayout="scroll"
                        scrollable
                        scrollHeight="18rem"
                    >
                        <AFColumn field="PO_CD" header="Pp No" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
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
                        <AFColumn field="VENDOR_CD" header="Supplier" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                        <AFColumn field="VENDOR_NAME" header="Supplier1" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
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
                        width: "74rem",
                        height: "10rem",
                        marginTop: "1rem",
                    }}
                >
                    <span
                        style={{
                            marginLeft: "0.5rem",
                            height: "2rem",
                            display: "inline-block",
                            width: "22rem",
                        }}
                    >
                        <p style={{ width: "4rem", display: "inline-block" }}>Matl</p>
                        <InputText
                            style={{
                                marginLeft: "0.5rem",
                                display: "inline-block",
                                width: "17rem",
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
                            width: "22rem",
                        }}
                    >
                        <p style={{ width: "4rem", display: "inline-block" }}>Color</p>
                        <InputText
                            style={{
                                marginLeft: "0.5rem",
                                display: "inline-block",
                                width: "17rem",
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
                            width: "22rem",
                        }}
                    >
                        <p style={{ width: "4rem", display: "inline-block" }}>Spec</p>
                        <InputText
                            style={{
                                marginLeft: "0.5rem",
                                display: "inline-block",
                                width: "17rem",
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
                            width: "70rem",
                        }}
                    >
                        <p style={{ width: "4rem", display: "inline-block" }}>Price</p>
                        <InputText
                            style={{
                                marginLeft: "0.5rem",
                                display: "inline-block",
                                width: "20rem",
                            }}
                            id="id_PRICE"
                            value={dataQRY_KSV_STOCK_IN1.PRICE}
                            onChange={(e) =>
                                onInputChangeQRY_KSV_STOCK_IN1_PRICE(e, "PRICE")
                            }
                        />

                        <Button
                            label="Set Price"
                            style={{ display: "inline-block" }}
                            className="p-button-text"
                            onClick={blankFn}
                        />

                        <Button
                            label="Update Price"
                            style={{ display: "inline-block" }}
                            className="p-button-text"
                            onClick={blankFn}
                        />

                        <Button
                            label="Update Temp Price"
                            style={{ display: "inline-block" }}
                            className="p-button-text"
                            onClick={blankFn}
                        />

                        <Button
                            label="Set Sale Price"
                            style={{ display: "inline-block" }}
                            className="p-button-text"
                            onClick={setSalePrice}
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
                        <p style={{ width: "4rem", display: "inline-block" }}>Curr</p>
                        <div
                            style={{
                                marginLeft: "0.5rem",
                                display: "inline-block",
                                width: "13rem",
                            }}
                        >
                            <Dropdown
                                id="id_CURR_CD"
                                value={dataQRY_KSV_STOCK_IN1_CURR_CD}
                                onChange={(e) =>
                                    onDropdownChangeQRY_KSV_STOCK_IN1_CURR_CD(
                                        e,
                                        "CURR_CD",
                                    )
                                }
                                options={datasQRY_KSV_STOCK_IN1_CURR_CD}
                                optionLabel="CD_NAME"
                                placeholder=""
                                editable
                            ></Dropdown>
                        </div>
                        <Button
                            label="Change"
                            style={{ display: "inline-block" }}
                            className="p-button-text"
                            onClick={searchTBL_KSV_PO_MST1}
                        />
                    </span>
                </div>

                <div
                    style={{
                        marginLeft: "1rem",
                        marginTop: "1rem",
                        width: "74rem",
                        height: "40rem",
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
                        virtualScrollerOptions={{ itemSize: 19 }}
                        emptyMessage="No TBL_KSV_PO_MRP1 found." //header={headerTBL_KSV_PO_MRP1}
                        responsiveLayout="scroll"
                        scrollable
                        scrollHeight="38rem"
                    >
                        <AFColumn field="MATL_CD" header="Matl#" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                        <AFColumn field="MATL_NAME" header="Desc" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                        <AFColumn field="COLOR" header="Color" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                        <AFColumn field="SPEC" header="Spec" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                        <AFColumn field="PO_QTY" header="Po Qty" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                        <AFColumn field="CURR_CD" header="Curr" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                        <AFColumn field="TYPE" header="Type" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                        <AFColumn field="BEF_PRICE" header="Bef Price" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                        <AFColumn field="SALE_PRICE" header="Sale Price" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                        <AFColumn field="MATL_PRICE" header="Matl Price" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                        <AFColumn field="MATL_NEGO_PRICE" header="Matl Nego.P" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                        <AFColumn field="RATE" header="%" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                        <AFColumn field="SALE_NEGO_PRICE" header="Sale Nego.P" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                        <AFColumn field="BALANCE" header="Balance" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                        <AFColumn field="REMARK" header="Remark" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                        <AFColumn field="CONF_NAME" header="Conf" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                        <AFColumn field="TEMP_PRICE" header="Temp Price" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                        <AFColumn field="CONF_FLAG" header="Conf flag" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                        <AFColumn field="MATL_SEQ" header="Matl Seq" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                        <AFColumn field="VENDOR_NAME" header="Supplier" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                        <AFColumn field="MAX_MATL_SEQ" header="Max Matl.S" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                        <AFColumn field="MAX_SALE_SEQ" header="Max Sale.S" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    </AFDataTable>
                </div>

                <Divider />

                <div
                    style={{
                        width: "75rem",
                        height: "2rem",
                        marginLeft: "42rem",
                    }}
                >
                    <div className="formgrid grid">
                        <div className="field col-6 md:col-6">
                            <Button
                                style={{
                                    display: "inline-block",
                                    width: "10rem",
                                }}
                                label="Reset"
                                icon="pi pi-times"
                                className="p-button-text"
                                onClick={blankFn}
                            />

                            <Button
                                style={{
                                    display: "inline-block",
                                    width: "10rem",
                                }}
                                label="Save"
                                icon="pi pi-check"
                                className="p-button-text"
                                onClick={processPriceUpdate}
                            />

                            <Button
                                style={{
                                    display: "inline-block",
                                    width: "10rem",
                                }}
                                label="Copy"
                                icon="pi pi-check"
                                className="p-button-text"
                                onClick={blankFn}
                            />
                        </div>
                    </div>
                </div>

                <Divider />
            </div>

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

export default React.memo(S0408_MATL_PRICE_UPDATE, comparisonFn);
