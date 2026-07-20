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
import { ServiceS0603_INVOICE_LIST } from "../service/service_biz/ServiceS0603_INVOICE_LIST";

import "./page_common.scss";

const emptyKCD_CODE = {
    id: 0,
    CD_GROUP: "",
    CD_CODE: "",
    CD_NAME: "",
    CD_FLAG: "",
};

const emptyQRY_KSV_INVOICE_MST = {
    S_SHIP_DATE: "",
    E_SHIP_DATE: "",
    BUYER_CD: "",
    FROM: "",
    NAT_CD: "",
    PAYMENT_TYPE: "",
    TRADE_TYPE: "",
    DELIVERY_TYPE: "",
};

const emptyTBL_KSV_INVOICE_MST = {
    id: 0,
    INVOICE_NO: "",
    EXT_INVOICE_NO: "",
    SHIP_DATE: "",
    DUE_DATE: "",
    TRANSFER_DATE: "",
    MANAGE_AMT: "",
    ADD_AMT: "",
    BILL_AMT: "",
    NEGO_AMT: "",
    REMAIN_AMT: "",
    REMARK: "",
};

const emptyTBL_KSV_INVOICE_MST1 = {
    id: 0,
    DUE_DATE: "",
    BILL_AMT: "",
};

const emptyTBL_KSV_INVOICE_MST2 = {
    id: 0,
    INVOICE_NO: "",
    ORDER_CD: "",
    STYLE_NAME: "",
    SHIP_QTY: "",
    PRICE: "",
    TOT_AMT: "",
};

const emptyTBL_KSV_INVOICE_MST3 = {
    id: 0,
    INVOICE_NO: "",
    ORDER_NO: "",
    QTY: "",
    SHIP_PROD_TYPE: "",
};

const S0603_INVOICE_LIST = () => {
    const serviceLibRef = useRef(null);
    if (!serviceLibRef.current) {
        serviceLibRef.current = new ServiceLib();
        serviceLibRef.current.loginConfirm();
    }
    const serviceLib = serviceLibRef.current;
    const serviceS0603_INVOICE_LISTRef = useRef(null);
    if (!serviceS0603_INVOICE_LISTRef.current) serviceS0603_INVOICE_LISTRef.current = new ServiceS0603_INVOICE_LIST();
    const serviceS0603_INVOICE_LIST = serviceS0603_INVOICE_LISTRef.current;

    const toast = useRef(null);

    /* splitter 관련 */
    const [styleVal, setStyleVal] = useState({ width: "65vw" });

    const search_LIST_1 = () => {
        var _tData = { ...dataQRY_KSV_INVOICE_MST };

        setDatasTBL_KSV_INVOICE_MST([]);
        setSelectedTBL_KSV_INVOICE_MST([]);

        setLoadingTBL_KSV_INVOICE_MST(true);

        serviceS0603_INVOICE_LIST.mgrQuery_LIST_1(_tData).then((data) => {
            setLoadingTBL_KSV_INVOICE_MST(false);
            if (typeof data.graphQLErrors === "undefined") {
                console.log(
                    "ServiceMgrKCD_BUYER.mgr1KcdStyle call => " + data.length,
                );

                var tArray2 = data.map((col, i) => {
                    var tObj = { ...col };
                    tObj.id = i + 1;
                    return tObj;
                });
                setDatasTBL_KSV_INVOICE_MST(tArray2);
            } else {
                console.log(
                    "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });
    };

    const search_LIST_2 = (argData) => {
        var tInput = {};
        tInput.INVOICE_NO = argData.INVOICE_NO.trim();
        tInput.SHIP_DATE = argData.SHIP_DATE;

        setDatasTBL_KSV_INVOICE_MST2([]);
        setSelectedTBL_KSV_INVOICE_MST2([]);

        setLoadingTBL_KSV_INVOICE_MST2(true);

        serviceS0603_INVOICE_LIST.mgrQuery_LIST_2(tInput).then((data) => {
            setLoadingTBL_KSV_INVOICE_MST2(false);
            if (typeof data.graphQLErrors === "undefined") {
                console.log(
                    "ServiceMgrKCD_BUYER.mgr1KcdStyle call => " + data.length,
                );

                var tArray2 = data.map((col, i) => {
                    var tObj = { ...col };
                    tObj.id = i + 1;
                    return tObj;
                });
                setDatasTBL_KSV_INVOICE_MST2(tArray2);
            } else {
                console.log(
                    "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });
    };

    const search_LIST_3 = (argData) => {
        var tInput = {};
        tInput.INVOICE_NO = argData.INVOICE_NO.trim();
        tInput.SHIP_DATE = argData.SHIP_DATE;

        setDatasTBL_KSV_INVOICE_MST3([]);
        setSelectedTBL_KSV_INVOICE_MST3([]);

        setLoadingTBL_KSV_INVOICE_MST3(true);

        serviceS0603_INVOICE_LIST.mgrQuery_LIST_3(tInput).then((data) => {
            setLoadingTBL_KSV_INVOICE_MST3(false);
            if (typeof data.graphQLErrors === "undefined") {
                console.log(
                    "ServiceMgrKCD_BUYER.mgr1KcdStyle call => " + data.length,
                );

                var tArray2 = data.map((col, i) => {
                    var tObj = { ...col };
                    tObj.id = i + 1;
                    return tObj;
                });
                setDatasTBL_KSV_INVOICE_MST3(tArray2);
            } else {
                console.log(
                    "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });
    };

    /* QRY KSV_INVOICE_MST*/
    const [dataQRY_KSV_INVOICE_MST, setDataQRY_KSV_INVOICE_MST] = useState(
        emptyQRY_KSV_INVOICE_MST,
    );

    const onCalChangeQRY_KSV_INVOICE_MST_S_SHIP_DATE = (e, name) => {
        let val1 = e.value || "";
        let val = "";
        if (val1 === "") {
            val = "";
        } else {
            val = getDateVal(val1);
        }

        let _dataQRY_KSV_INVOICE_MST = { ...dataQRY_KSV_INVOICE_MST };
        _dataQRY_KSV_INVOICE_MST[`${name}`] = val;
        setDataQRY_KSV_INVOICE_MST(_dataQRY_KSV_INVOICE_MST);
    };

    const onCalChangeQRY_KSV_INVOICE_MST_E_SHIP_DATE = (e, name) => {
        let val1 = e.value || "";
        let val = "";
        if (val1 === "") {
            val = "";
        } else {
            val = getDateVal(val1);
        }

        let _dataQRY_KSV_INVOICE_MST = { ...dataQRY_KSV_INVOICE_MST };
        _dataQRY_KSV_INVOICE_MST[`${name}`] = val;
        setDataQRY_KSV_INVOICE_MST(_dataQRY_KSV_INVOICE_MST);
    };

    const [
        datasQRY_KSV_INVOICE_MST_BUYER_CD,
        setDatasQRY_KSV_INVOICE_MST_BUYER_CD,
    ] = useState([]);
    const [
        dataQRY_KSV_INVOICE_MST_BUYER_CD,
        setDataQRY_KSV_INVOICE_MST_BUYER_CD,
    ] = useState({});

    const onDropdownChangeQRY_KSV_INVOICE_MST_BUYER_CD = (e, name) => {
        let val = (e.value && e.value.BUYER_CD) || "";

        let _dataQRY_KSV_INVOICE_MST = { ...dataQRY_KSV_INVOICE_MST };

        let tTypeVal = _dataQRY_KSV_INVOICE_MST[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_INVOICE_MST[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_INVOICE_MST[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_INVOICE_MST(_dataQRY_KSV_INVOICE_MST);
        setDataQRY_KSV_INVOICE_MST_BUYER_CD(e.value);
    };

    const [datasQRY_KSV_INVOICE_MST_FROM, setDatasQRY_KSV_INVOICE_MST_FROM] =
        useState([]);
    const [dataQRY_KSV_INVOICE_MST_FROM, setDataQRY_KSV_INVOICE_MST_FROM] =
        useState({});

    const onDropdownChangeQRY_KSV_INVOICE_MST_FROM = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataQRY_KSV_INVOICE_MST = { ...dataQRY_KSV_INVOICE_MST };

        let tTypeVal = _dataQRY_KSV_INVOICE_MST[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_INVOICE_MST[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_INVOICE_MST[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_INVOICE_MST(_dataQRY_KSV_INVOICE_MST);
        setDataQRY_KSV_INVOICE_MST_FROM(e.value);
    };

    const [
        datasQRY_KSV_INVOICE_MST_NAT_CD,
        setDatasQRY_KSV_INVOICE_MST_NAT_CD,
    ] = useState([]);
    const [dataQRY_KSV_INVOICE_MST_NAT_CD, setDataQRY_KSV_INVOICE_MST_NAT_CD] =
        useState({});

    const onDropdownChangeQRY_KSV_INVOICE_MST_NAT_CD = (e, name) => {
        let val = (e.value && e.value.NAT_CD) || "";

        let _dataQRY_KSV_INVOICE_MST = { ...dataQRY_KSV_INVOICE_MST };

        let tTypeVal = _dataQRY_KSV_INVOICE_MST[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_INVOICE_MST[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_INVOICE_MST[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_INVOICE_MST(_dataQRY_KSV_INVOICE_MST);
        setDataQRY_KSV_INVOICE_MST_NAT_CD(e.value);
    };

    const [
        datasQRY_KSV_INVOICE_MST_PAYMENT_TYPE,
        setDatasQRY_KSV_INVOICE_MST_PAYMENT_TYPE,
    ] = useState([]);
    const [
        dataQRY_KSV_INVOICE_MST_PAYMENT_TYPE,
        setDataQRY_KSV_INVOICE_MST_PAYMENT_TYPE,
    ] = useState({});

    const onDropdownChangeQRY_KSV_INVOICE_MST_PAYMENT_TYPE = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataQRY_KSV_INVOICE_MST = { ...dataQRY_KSV_INVOICE_MST };

        let tTypeVal = _dataQRY_KSV_INVOICE_MST[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_INVOICE_MST[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_INVOICE_MST[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_INVOICE_MST(_dataQRY_KSV_INVOICE_MST);
        setDataQRY_KSV_INVOICE_MST_PAYMENT_TYPE(e.value);
    };

    const [
        datasQRY_KSV_INVOICE_MST_TRADE_TYPE,
        setDatasQRY_KSV_INVOICE_MST_TRADE_TYPE,
    ] = useState([]);
    const [
        dataQRY_KSV_INVOICE_MST_TRADE_TYPE,
        setDataQRY_KSV_INVOICE_MST_TRADE_TYPE,
    ] = useState({});

    const onDropdownChangeQRY_KSV_INVOICE_MST_TRADE_TYPE = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataQRY_KSV_INVOICE_MST = { ...dataQRY_KSV_INVOICE_MST };

        let tTypeVal = _dataQRY_KSV_INVOICE_MST[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_INVOICE_MST[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_INVOICE_MST[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_INVOICE_MST(_dataQRY_KSV_INVOICE_MST);
        setDataQRY_KSV_INVOICE_MST_TRADE_TYPE(e.value);
    };

    const [
        datasQRY_KSV_INVOICE_MST_DELIVERY_TYPE,
        setDatasQRY_KSV_INVOICE_MST_DELIVERY_TYPE,
    ] = useState([]);
    const [
        dataQRY_KSV_INVOICE_MST_DELIVERY_TYPE,
        setDataQRY_KSV_INVOICE_MST_DELIVERY_TYPE,
    ] = useState({});

    const onDropdownChangeQRY_KSV_INVOICE_MST_DELIVERY_TYPE = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataQRY_KSV_INVOICE_MST = { ...dataQRY_KSV_INVOICE_MST };

        let tTypeVal = _dataQRY_KSV_INVOICE_MST[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_INVOICE_MST[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_INVOICE_MST[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_INVOICE_MST(_dataQRY_KSV_INVOICE_MST);
        setDataQRY_KSV_INVOICE_MST_DELIVERY_TYPE(e.value);
    };

    /* TABLE KSV_INVOICE_MST*/
    // DEFINE DATAGRID : TBL_KSV_INVOICE_MST
    const [loadingTBL_KSV_INVOICE_MST, setLoadingTBL_KSV_INVOICE_MST] =
        useState(false);

    const [datasTBL_KSV_INVOICE_MST, setDatasTBL_KSV_INVOICE_MST] = useState(
        [],
    );
    const dt_TBL_KSV_INVOICE_MST = useRef(null);
    const [dataTBL_KSV_INVOICE_MST, setDataTBL_KSV_INVOICE_MST] = useState(
        emptyTBL_KSV_INVOICE_MST,
    );
    const [selectedTBL_KSV_INVOICE_MST, setSelectedTBL_KSV_INVOICE_MST] =
        useState([]);
    const [
        flagSelectModeTBL_KSV_INVOICE_MST,
        setFlagSelectModeTBL_KSV_INVOICE_MST,
    ] = useState(false);

    // DATAGRID CODE : TBL_KSV_INVOICE_MST

    const onRowClick1TBL_KSV_INVOICE_MST = (argData0) => {
        var argData = {};

        if (typeof argData0.length !== "undefined") {
            argData = argData0[0];
        } else {
            argData = argData0;
        }

        let argTBL_KSV_INVOICE_MST = argData;

        setDataTBL_KSV_INVOICE_MST(argTBL_KSV_INVOICE_MST);

        search_LIST_2(argData);
        search_LIST_3(argData);
    };

    const onRowClickTBL_KSV_INVOICE_MST = (event) => {
        let argTBL_KSV_INVOICE_MST = event.data;
        if (flagSelectModeTBL_KSV_INVOICE_MST) return;

        // Service : NawooAll:mgrQueryTBL_KSV_INVOICE_MST
    };

    const searchTBL_KSV_INVOICE_MST = () => {
        clearSelectedTBL_KSV_INVOICE_MST();

        serviceS0603_INVOICE_LIST
            .mgrQueryTBL_KSV_INVOICE_MST(dataQRY_KSV_INVOICE_MST)
            .then((data) => {
                if (typeof data.graphQLErrors === "undefined") {
                    console.log(
                        "ServiceNawooAll.mgrQueryTBL_KSV_INVOICE_MST() call => " +
                            data.length,
                    );
                    setDatasTBL_KSV_INVOICE_MST(data);
                } else {
                    // var tStr = data.graphQLErrors[0].message;
                    console.log(
                        "ServiceNawooAll.mgrQueryTBL_KSV_INVOICE_MST()error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });

        // Service : NawooAll:mgrQueryTBL_KSV_INVOICE_MST
    };

    const clearSelectedTBL_KSV_INVOICE_MST = () => {
        setSelectedTBL_KSV_INVOICE_MST([]);
        setFlagSelectModeTBL_KSV_INVOICE_MST(false);
    };

    const exportExcelTBL_KSV_INVOICE_MST = () => {};

    /**TABLE KSV_INVOICE_MST1 */
    // DEFINE DATAGRID : TBL_KSV_INVOICE_MST1
    const [loadingTBL_KSV_INVOICE_MST1, setLoadingTBL_KSV_INVOICE_MST1] =
        useState(false);

    const [datasTBL_KSV_INVOICE_MST1, setDatasTBL_KSV_INVOICE_MST1] = useState(
        [],
    );
    const dt_TBL_KSV_INVOICE_MST1 = useRef(null);
    const [dataTBL_KSV_INVOICE_MST1, setDataTBL_KSV_INVOICE_MST1] = useState(
        emptyTBL_KSV_INVOICE_MST1,
    );
    const [selectedTBL_KSV_INVOICE_MST1, setSelectedTBL_KSV_INVOICE_MST1] =
        useState([]);
    const [
        flagSelectModeTBL_KSV_INVOICE_MST1,
        setFlagSelectModeTBL_KSV_INVOICE_MST1,
    ] = useState(false);

    // DATAGRID CODE : TBL_KSV_INVOICE_MST1

    const onRowClick1TBL_KSV_INVOICE_MST1 = (argData0) => {
        var argData = {};

        if (typeof argData0.length !== "undefined") {
            argData = argData0[0];
        } else {
            argData = argData0;
        }

        let argTBL_KSV_INVOICE_MST1 = argData;

        setDataTBL_KSV_INVOICE_MST1(argTBL_KSV_INVOICE_MST1);
    };

    const onRowClickTBL_KSV_INVOICE_MST1 = (event) => {
        let argTBL_KSV_INVOICE_MST1 = event.data;
        if (flagSelectModeTBL_KSV_INVOICE_MST1) return;

        // Service : NawooAll:mgrQueryTBL_KSV_INVOICE_MST1
    };

    /**TABLE KSV_INVOICE_MST2 */
    // DEFINE DATAGRID : TBL_KSV_INVOICE_MST2
    const [loadingTBL_KSV_INVOICE_MST2, setLoadingTBL_KSV_INVOICE_MST2] =
        useState(false);

    const [datasTBL_KSV_INVOICE_MST2, setDatasTBL_KSV_INVOICE_MST2] = useState(
        [],
    );
    const dt_TBL_KSV_INVOICE_MST2 = useRef(null);
    const [dataTBL_KSV_INVOICE_MST2, setDataTBL_KSV_INVOICE_MST2] = useState(
        emptyTBL_KSV_INVOICE_MST2,
    );
    const [selectedTBL_KSV_INVOICE_MST2, setSelectedTBL_KSV_INVOICE_MST2] =
        useState([]);
    const [
        flagSelectModeTBL_KSV_INVOICE_MST2,
        setFlagSelectModeTBL_KSV_INVOICE_MST2,
    ] = useState(false);

    // DATAGRID CODE : TBL_KSV_INVOICE_MST2

    const onRowClick1TBL_KSV_INVOICE_MST2 = (argData0) => {
        var argData = {};

        if (typeof argData0.length !== "undefined") {
            argData = argData0[0];
        } else {
            argData = argData0;
        }

        let argTBL_KSV_INVOICE_MST2 = argData;

        setDataTBL_KSV_INVOICE_MST2(argTBL_KSV_INVOICE_MST2);
    };

    const onRowClickTBL_KSV_INVOICE_MST2 = (event) => {
        let argTBL_KSV_INVOICE_MST2 = event.data;
        if (flagSelectModeTBL_KSV_INVOICE_MST2) return;

        // Service : NawooAll:mgrQueryTBL_KSV_INVOICE_MST2
    };

    /**TABLE KSV_INVOICE_MST3 */
    // DEFINE DATAGRID : TBL_KSV_INVOICE_MST3
    const [loadingTBL_KSV_INVOICE_MST3, setLoadingTBL_KSV_INVOICE_MST3] =
        useState(false);

    const [datasTBL_KSV_INVOICE_MST3, setDatasTBL_KSV_INVOICE_MST3] = useState(
        [],
    );
    const dt_TBL_KSV_INVOICE_MST3 = useRef(null);
    const [dataTBL_KSV_INVOICE_MST3, setDataTBL_KSV_INVOICE_MST3] = useState(
        emptyTBL_KSV_INVOICE_MST3,
    );
    const [selectedTBL_KSV_INVOICE_MST3, setSelectedTBL_KSV_INVOICE_MST3] =
        useState([]);
    const [
        flagSelectModeTBL_KSV_INVOICE_MST3,
        setFlagSelectModeTBL_KSV_INVOICE_MST3,
    ] = useState(false);

    // DATAGRID CODE : TBL_KSV_INVOICE_MST3

    const onRowClick1TBL_KSV_INVOICE_MST3 = (argData0) => {
        var argData = {};

        if (typeof argData0.length !== "undefined") {
            argData = argData0[0];
        } else {
            argData = argData0;
        }

        let argTBL_KSV_INVOICE_MST3 = argData;

        setDataTBL_KSV_INVOICE_MST3(argTBL_KSV_INVOICE_MST3);
    };

    const onRowClickTBL_KSV_INVOICE_MST3 = (event) => {
        let argTBL_KSV_INVOICE_MST3 = event.data;
        if (flagSelectModeTBL_KSV_INVOICE_MST3) return;

        // Service : NawooAll:mgrQueryTBL_KSV_INVOICE_MST3
    };

    useEffect(() => {
        var _tObj = {};
        _tObj.INVOICE_NO = "";

        serviceS0603_INVOICE_LIST.mgrQuery_CODE(_tObj).then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                setDatasQRY_KSV_INVOICE_MST_DELIVERY_TYPE(data.DELIVERY_TYPE);
                setDataQRY_KSV_INVOICE_MST_DELIVERY_TYPE(data.DELIVERY_TYPE[0]);

                setDatasQRY_KSV_INVOICE_MST_BUYER_CD(data.BUYER_CD);
                setDataQRY_KSV_INVOICE_MST_BUYER_CD(data.BUYER_CD[0]);

                setDatasQRY_KSV_INVOICE_MST_FROM(data.FACTORY_CD);
                setDataQRY_KSV_INVOICE_MST_FROM(data.FACTORY_CD[0]);

                setDatasQRY_KSV_INVOICE_MST_NAT_CD(data.NAT_CD);
                setDataQRY_KSV_INVOICE_MST_NAT_CD(data.NAT_CD[0]);

                setDatasQRY_KSV_INVOICE_MST_PAYMENT_TYPE(data.PAYMENT_TYPE);
                setDataQRY_KSV_INVOICE_MST_PAYMENT_TYPE(data.PAYMENT_TYPE[0]);

                setDatasQRY_KSV_INVOICE_MST_TRADE_TYPE(data.TRADE_TYPE);
                setDataQRY_KSV_INVOICE_MST_TRADE_TYPE(data.TRADE_TYPE[0]);
            } else {
                console.log(
                    "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });

        search_LIST_1();
    }, []);

    const blankFn = () => {};

    // Support Area

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
                    height: "4rem",
                }}
            >
                <span
                    style={{
                        marginLeft: "0.5rem",
                        height: "2rem",
                        display: "inline-block",
                        width: "19rem",
                    }}
                >
                    <p style={{ width: "8rem", display: "inline-block" }}>선적일</p>
                    <div
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "10rem",
                        }}
                    >
                        <Calendar
                            showButtonBar
                            dateFormat="yy-mm-dd"
                            id="id_S_SHIP_DATE"
                            value={changeDateVal(
                                dataQRY_KSV_INVOICE_MST.S_SHIP_DATE,
                            )}
                            onChange={(e) =>
                                onCalChangeQRY_KSV_INVOICE_MST_S_SHIP_DATE(
                                    e,
                                    "S_SHIP_DATE",
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
                        width: "13rem",
                    }}
                >
                    <p style={{ width: "1rem", display: "inline-block" }}>~</p>
                    <div
                        style={{
                            marginLeft: "1rem",
                            display: "inline-block",
                            width: "10rem",
                        }}
                    >
                        <Calendar
                            showButtonBar
                            dateFormat="yy-mm-dd"
                            id="id_E_SHIP_DATE"
                            value={changeDateVal(
                                dataQRY_KSV_INVOICE_MST.E_SHIP_DATE,
                            )}
                            onChange={(e) =>
                                onCalChangeQRY_KSV_INVOICE_MST_E_SHIP_DATE(
                                    e,
                                    "E_SHIP_DATE",
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
                        width: "20rem",
                    }}
                >
                    <p style={{ width: "6rem", display: "inline-block" }}>Buyer</p>
                    <div
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "13rem",
                        }}
                    >
                        <Dropdown
                            id="id_BUYER_CD"
                            value={dataQRY_KSV_INVOICE_MST_BUYER_CD}
                            onChange={(e) =>
                                onDropdownChangeQRY_KSV_INVOICE_MST_BUYER_CD(
                                    e,
                                    "BUYER_CD",
                                )
                            }
                            options={datasQRY_KSV_INVOICE_MST_BUYER_CD}
                            optionLabel="BUYER_NAME"
                            placeholder=""
                            editable
                            filter
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
                    <p style={{ width: "4rem", display: "inline-block" }}>From</p>
                    <div
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "10rem",
                        }}
                    >
                        <Dropdown
                            id="id_FROM"
                            value={dataQRY_KSV_INVOICE_MST_FROM}
                            onChange={(e) =>
                                onDropdownChangeQRY_KSV_INVOICE_MST_FROM(
                                    e,
                                    "FROM",
                                )
                            }
                            options={datasQRY_KSV_INVOICE_MST_FROM}
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
                        width: "15rem",
                    }}
                >
                    <p style={{ width: "4rem", display: "inline-block" }}>Country</p>
                    <div
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "10rem",
                        }}
                    >
                        <Dropdown
                            id="id_NAT_CD"
                            value={dataQRY_KSV_INVOICE_MST_NAT_CD}
                            onChange={(e) =>
                                onDropdownChangeQRY_KSV_INVOICE_MST_NAT_CD(
                                    e,
                                    "NAT_CD",
                                )
                            }
                            options={datasQRY_KSV_INVOICE_MST_NAT_CD}
                            optionLabel="NAT_NAME"
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
                    <p style={{ width: "8rem", display: "inline-block" }}>Payment</p>
                    <div
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "13rem",
                        }}
                    >
                        <Dropdown
                            id="id_PAYMENT_TYPE"
                            value={dataQRY_KSV_INVOICE_MST_PAYMENT_TYPE}
                            onChange={(e) =>
                                onDropdownChangeQRY_KSV_INVOICE_MST_PAYMENT_TYPE(
                                    e,
                                    "PAYMENT_TYPE",
                                )
                            }
                            options={datasQRY_KSV_INVOICE_MST_PAYMENT_TYPE}
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
                        width: "11rem",
                    }}
                >
                    {/* <p style={{ width: '8rem', display: 'inline-block' }}> . </p> */}
                    <div
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "10rem",
                        }}
                    >
                        <Dropdown
                            id="id_TRADE_TYPE"
                            value={dataQRY_KSV_INVOICE_MST_TRADE_TYPE}
                            onChange={(e) =>
                                onDropdownChangeQRY_KSV_INVOICE_MST_TRADE_TYPE(
                                    e,
                                    "TRADE_TYPE",
                                )
                            }
                            options={datasQRY_KSV_INVOICE_MST_TRADE_TYPE}
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
                    <p style={{ width: "6rem", display: "inline-block" }}>Freight</p>
                    <div
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "13rem",
                        }}
                    >
                        <Dropdown
                            id="id_DELIVERY_TYPE"
                            value={dataQRY_KSV_INVOICE_MST_DELIVERY_TYPE}
                            onChange={(e) =>
                                onDropdownChangeQRY_KSV_INVOICE_MST_DELIVERY_TYPE(
                                    e,
                                    "DELIVERY_TYPE",
                                )
                            }
                            options={datasQRY_KSV_INVOICE_MST_DELIVERY_TYPE}
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
                    <p style={{ width: "8rem", display: "inline-block" }}>NEOE거래처</p>
                    <div
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "13rem",
                        }}
                    >
                        <Dropdown
                            id="id_NEOE"
                            style={{ width: "13rem" }}
                        ></Dropdown>
                    </div>
                </span>
                <span style={{ display: "inline-block" }}>
                    <Button
                        label="자동전표생성"
                        style={{ height: "1.1rem" }}
                        className="p-button-text"
                        onClick={searchTBL_KSV_INVOICE_MST}
                    />

                    <Button
                        label="전표 취소"
                        style={{ height: "1.1rem" }}
                        className="p-button-text"
                        onClick={searchTBL_KSV_INVOICE_MST}
                    />
                </span>
                <span style={{ display: "inline-block", marginLeft: "72rem" }}>
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
                        onClick={searchTBL_KSV_INVOICE_MST}
                    />

                    <Button
                        label="Excel"
                        icon="pi pi-upload"
                        style={{ height: "1.1rem" }}
                        className="p-button-text green"
                        onClick={exportExcelTBL_KSV_INVOICE_MST}
                    />

                    <Button
                        label="Country"
                        icon="pi pi-check"
                        style={{ height: "1.1rem" }}
                        className="p-button-text"
                        onClick={searchTBL_KSV_INVOICE_MST}
                    />
                </span>
            </div>
            <div style={{ width: "100rem", height: "2rem" }}></div>

            <div
                style={{
                    marginLeft: "1rem",
                    marginTop: "1rem",
                    width: "69rem",
                    height: "26rem",
                    float: "left",
                }}
            >
                <AFDataTable preventUnrelatedRerender
                    ref={dt_TBL_KSV_INVOICE_MST}
                    size="small"
                    value={datasTBL_KSV_INVOICE_MST}
                    resizableColumns
                    columnResizeMode="fit"
                    showGridlines
                    selectionMode="checkbox"
                    selection={selectedTBL_KSV_INVOICE_MST}
                    onSelectionChange={(e) => {
                        setFlagSelectModeTBL_KSV_INVOICE_MST(true);
                        setSelectedTBL_KSV_INVOICE_MST(e.value);
                        console.log(
                            "selected length:" +
                                selectedTBL_KSV_INVOICE_MST.length,
                        );
                        onRowClick1TBL_KSV_INVOICE_MST(e.value);
                    }}
                    onRowClick={onRowClickTBL_KSV_INVOICE_MST}
                    dataKey="id"
                    className="datatable-responsive"
                    virtualScrollerOptions={{ itemSize: 12 }}
                    loading={loadingTBL_KSV_INVOICE_MST}
                    emptyMessage=" " //header={headerTBL_KSV_INVOICE_MST}
                    responsiveLayout="scroll"
                    scrollable
                    scrollHeight="24rem"
                >
                    <AFColumn field="INVOICE_NO" headerClassName="t-header" header="Invoice No" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="EXT_INVOICE" headerClassName="t-header" header="Ext Invoice No" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="SHIP_DATE" headerClassName="t-header" header="선적일" style={{ width: "8rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="DUE_DATE" headerClassName="t-header" header="입금예정일" style={{ width: "8rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="TRANSFER_DATE" headerClassName="t-header" header="전달일" style={{ width: "8rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="CURR_CD" headerClassName="t-header" header="Curr" style={{ width: "5rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="TOT_AMT" headerClassName="t-header" header="Tot Amt" style={{ width: "7rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="ADJ_AMT" headerClassName="t-header" header="Adj Amt" style={{ width: "7rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="IN_AMT" headerClassName="t-header" header="In Amt" style={{ width: "5rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="OA_NEGO" headerClassName="t-header" header="nego" style={{ width: "5rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="REST_AMT" headerClassName="t-header" header="Rest Amt" style={{ width: "8rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="REMARK" headerClassName="t-header" header="Remark" style={{ width: "15rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="DELIVERY_TYPE_N" headerClassName="t-header" header="Delivery" style={{ width: "8rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="BUYER_CD" headerClassName="t-header" header="Buyer" style={{ width: "9rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="BUYER_NAME" headerClassName="t-header" header="Buyer" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="DOCU_NO" headerClassName="t-header" header="전표" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="NEOE_BUYER_CD" headerClassName="t-header" header="Neoe Buyer" style={{ width: "9rem", flexBasis: "auto" }} ></AFColumn>
                </AFDataTable>
            </div>

            <div
                style={{
                    marginLeft: "1rem",
                    marginTop: "1rem",
                    width: "29rem",
                    height: "26rem",
                    float: "left",
                }}
            >
                <AFDataTable preventUnrelatedRerender
                    ref={dt_TBL_KSV_INVOICE_MST1}
                    size="small"
                    value={datasTBL_KSV_INVOICE_MST1}
                    resizableColumns
                    columnResizeMode="fit"
                    showGridlines
                    selectionMode="checkbox"
                    selection={selectedTBL_KSV_INVOICE_MST1}
                    onSelectionChange={(e) => {
                        setFlagSelectModeTBL_KSV_INVOICE_MST1(true);
                        setSelectedTBL_KSV_INVOICE_MST1(e.value);
                        console.log(
                            "selected length:" +
                                selectedTBL_KSV_INVOICE_MST1.length,
                        );
                        onRowClick1TBL_KSV_INVOICE_MST1(e.value);
                    }}
                    onRowClick={onRowClickTBL_KSV_INVOICE_MST1}
                    dataKey="id"
                    className="datatable-responsive"
                    virtualScrollerOptions={{ itemSize: 12 }}
                    emptyMessage=" " //header={headerTBL_KSV_INVOICE_MST1}
                    responsiveLayout="scroll"
                    loading={loadingTBL_KSV_INVOICE_MST1}
                    scrollable
                    scrollHeight="24rem"
                >
                    <AFColumn field="DUE_DATE" headerClassName="t-header" header="입금일자" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="BILL_AMT" headerClassName="t-header" header="입금액" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                </AFDataTable>
            </div>
            <Divider />
            <div
                style={{
                    marginLeft: "1rem",
                    marginTop: "1rem",
                    width: "59rem",
                    height: "22rem",
                    float: "left",
                }}
            >
                <AFDataTable preventUnrelatedRerender
                    ref={dt_TBL_KSV_INVOICE_MST2}
                    size="small"
                    value={datasTBL_KSV_INVOICE_MST2}
                    resizableColumns
                    columnResizeMode="fit"
                    showGridlines
                    selectionMode="checkbox"
                    selection={selectedTBL_KSV_INVOICE_MST2}
                    onSelectionChange={(e) => {
                        setFlagSelectModeTBL_KSV_INVOICE_MST2(true);
                        setSelectedTBL_KSV_INVOICE_MST2(e.value);
                        console.log(
                            "selected length:" +
                                selectedTBL_KSV_INVOICE_MST2.length,
                        );
                        onRowClick1TBL_KSV_INVOICE_MST2(e.value);
                    }}
                    onRowClick={onRowClickTBL_KSV_INVOICE_MST2}
                    dataKey="id"
                    className="datatable-responsive"
                    virtualScrollerOptions={{ itemSize: 10 }}
                    emptyMessage=" " //header={headerTBL_KSV_INVOICE_MST2}
                    responsiveLayout="scroll"
                    loading={loadingTBL_KSV_INVOICE_MST2}
                    scrollable
                    scrollHeight="20rem"
                >
                    <AFColumn field="INVOICE_NO" headerClassName="t-header" header="Invoice No" style={{ width: "8rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="ORDER_CD" headerClassName="t-header" header="오더 No" style={{ width: "8rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="STYLE_NAME" headerClassName="t-header" header="스타일" style={{ width: "13rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="SHIP_QTY" headerClassName="t-header" header="선적수량" style={{ width: "5rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="SHIP_PRICE" headerClassName="t-header" header="단가" style={{ width: "4rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="TOT_AMT" headerClassName="t-header" header="금액" style={{ width: "5rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="BUYER_CD" headerClassName="t-header" header="Buyer" style={{ width: "5rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="PO_CD" headerClassName="t-header" header="PO Cd" style={{ width: "8rem", flexBasis: "auto" }} ></AFColumn>
                </AFDataTable>
            </div>

            <div
                style={{
                    marginLeft: "1rem",
                    marginTop: "1rem",
                    width: "39rem",
                    height: "22rem",
                    float: "left",
                }}
            >
                <AFDataTable preventUnrelatedRerender
                    ref={dt_TBL_KSV_INVOICE_MST3}
                    size="small"
                    value={datasTBL_KSV_INVOICE_MST3}
                    resizableColumns
                    columnResizeMode="fit"
                    showGridlines
                    selectionMode="checkbox"
                    selection={selectedTBL_KSV_INVOICE_MST3}
                    onSelectionChange={(e) => {
                        setFlagSelectModeTBL_KSV_INVOICE_MST3(true);
                        setSelectedTBL_KSV_INVOICE_MST3(e.value);
                        console.log(
                            "selected length:" +
                                selectedTBL_KSV_INVOICE_MST3.length,
                        );
                        onRowClick1TBL_KSV_INVOICE_MST3(e.value);
                    }}
                    onRowClick={onRowClickTBL_KSV_INVOICE_MST3}
                    dataKey="id"
                    className="datatable-responsive"
                    virtualScrollerOptions={{ itemSize: 10 }}
                    emptyMessage=" " //eader={headerTBL_KSV_INVOICE_MST3}
                    responsiveLayout="scroll"
                    loading={loadingTBL_KSV_INVOICE_MST3}
                    scrollable
                    scrollHeight="20rem"
                >
                    <AFColumn field="INVOICE_NO" headerClassName="t-header" header="Invoice No" style={{ width: "8rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="ORDER_CD" headerClassName="t-header" header="Order No" style={{ width: "8rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="SHIP_CNT" headerClassName="t-header" header="Qty" style={{ width: "5rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="SHIP_PTYPE_N" headerClassName="t-header" header="Ship Type" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="DELIVERY_TYPE_N" headerClassName="t-header" header="Delivery" style={{ width: "8rem", flexBasis: "auto" }} ></AFColumn>
                </AFDataTable>
            </div>
            <Divider />

            <div
                style={{ width: "100rem", height: "2rem", marginLeft: "39rem" }}
            >
                <div className="formgrid grid">
                    <div>
                        <Button
                            style={{ display: "inline-block", width: "15rem" }}
                            label="출고금액리스트(간단)"
                            className="p-button-text"
                            onClick={blankFn}
                        />

                        <Button
                            style={{ display: "inline-block", width: "15rem" }}
                            label="출고금액리스트(기간)"
                            className="p-button-text"
                            onClick={blankFn}
                        />

                        <Button
                            style={{ display: "inline-block", width: "15rem" }}
                            label="출고금액리스트(바이어)"
                            className="p-button-text"
                            onClick={blankFn}
                        />

                        <Button
                            style={{ display: "inline-block", width: "15rem" }}
                            label="출고금액리스트 (기간)다"
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

export default React.memo(S0603_INVOICE_LIST, comparisonFn);
