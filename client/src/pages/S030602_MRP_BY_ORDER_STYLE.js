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
import { ServiceS030602_MRP_BY_ORDER_STYLE } from "../service/service_biz/ServiceS030602_MRP_BY_ORDER_STYLE";

import "./page_common.scss";

const emptyKCD_CODE = {
    id: 0,
    CD_GROUP: "",
    CD_CODE: "",
    CD_NAME: "",
    CD_FLAG: "",
};

const emptyQRY_KCD_STYLE = {
    STYLE_NAME: "",
};

const emptyQRY_KCD_STYLE1 = {
    COLOR: "",
    STYLE_CD: "",
    STYLE_NAME: "",
    ORDER_CD: "",
    ORDER_MRP_SEQ: "",
};

const emptyTBL_KCD_STYLE = {
    id: 0,
    STYLE_NAME: "",
    STYLE_CD: "",
};

const emptyTBL_KSV_PROD_MEM = {
    id: 0,
    MATL_TYPE2: "",
    MATL_CD: "",
    MATL_NAME: "",
    COLOR: "",
    SPEC: "",
    MATL_PRICE: "",
    CURR_CD: "",
    UNIT: "",
    ADD_LOSS: "",
    USE_SIZE: "",
    REMARK: "",
    BVT_REMARK: "",
    COUNTRY: "",
    STD_NET: "",
    STD_LOSS: "",
    STD_GROSS: "",
    NET: "",
    LOSS: "",
    GROSS: "",
    VENDOR_NAME: "",
    VENDOR_CD: "",
    SEQ: "",
};

const emptyTBL_KSV_PROD_MEM1 = {
    id: 0,
    MATL_TYPE2: "",
    MATL_CD: "",
    MATL_NAME: "",
    COLOR: "",
    SPEC: "",
    MATL_PRICE: "",
    CURR_CD: "",
    UNIT: "",
    ADD_LOSS: "",
    USE_SIZE: "",
    REMARK: "",
    BVT_REMARK: "",
    COUNTRY: "",
    STD_NET: "",
    STD_LOSS: "",
    STD_GROSS: "",
    NET: "",
    LOSS: "",
    GROSS: "",
    VENDOR_NAME: "",
    VENDOR_CD: "",
    SEQ: "",
};

const emptyTBL_KSV_PROD_MST = {
    id: 0,
};

const S030602_MRP_BY_ORDER_STYLE = () => {
    const serviceLibRef = useRef(null);
    if (!serviceLibRef.current) {
        serviceLibRef.current = new ServiceLib();
        serviceLibRef.current.loginConfirm();
    }
    const serviceLib = serviceLibRef.current;
    const serviceS030602_MRP_BY_ORDER_STYLE =
        new ServiceS030602_MRP_BY_ORDER_STYLE();

    const toast = useRef(null);

    /* splitter 관련 */
    const [styleVal, setStyleVal] = useState({ width: "65vw" });

    const process_ALL_SEL = () => {
        if (selectedTBL_KSV_PROD_MEM.length > 1)
            setSelectedTBL_KSV_PROD_MEM([]);
        else setSelectedTBL_KSV_PROD_MEM(datasTBL_KSV_PROD_MEM);
    };

    //
    const search_SRC_PROD_MEM = () => {
        var _tObj1 = { ...dataQRY_KCD_STYLE1 };
        var tInObj = {};
        tInObj.PROD_CD = dataQRY_KCD_STYLE1_COLOR.PROD_CD;
        tInObj.ORDER_CD = _tObj1.ORDER_CD;
        tInObj.ORDER_MRP_SEQ = _tObj1.ORDER_MRP_SEQ;

        setDatasTBL_KSV_PROD_MEM1([]);
        serviceS030602_MRP_BY_ORDER_STYLE
            .mgrQueryTBL_KSV_ORDER_MRP(tInObj)
            .then((data) => {
                if (typeof data.graphQLErrors === "undefined") {
                    console.log(
                        "mgrQueryTBL_KSV_PROD_MEM call => " + data.length,
                    );
                    setDatasTBL_KSV_PROD_MEM1(data);
                } else {
                    console.log(
                        "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });
    };

    /* QRY KCD_STYLE*/
    const [dataQRY_KCD_STYLE, setDataQRY_KCD_STYLE] =
        useState(emptyQRY_KCD_STYLE);

    const onInputChangeQRY_KCD_STYLE_STYLE_NAME = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KCD_STYLE = { ...dataQRY_KCD_STYLE };

        let tTypeVal = _dataQRY_KCD_STYLE[`${name}`];
        if (typeof tTypeVal === "string") _dataQRY_KCD_STYLE[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KCD_STYLE[`${name}`] = parseInt(val);

        setDataQRY_KCD_STYLE(_dataQRY_KCD_STYLE);
    };

    /*QRY KCD_STYLE1 */
    const [dataQRY_KCD_STYLE1, setDataQRY_KCD_STYLE1] =
        useState(emptyQRY_KCD_STYLE1);

    const [datasQRY_KCD_STYLE1_COLOR, setDatasQRY_KCD_STYLE1_COLOR] = useState(
        [],
    );
    const [dataQRY_KCD_STYLE1_COLOR, setDataQRY_KCD_STYLE1_COLOR] = useState(
        {},
    );

    const onDropdownChangeQRY_KCD_STYLE1_COLOR = (e, name) => {
        let val = (e.value && e.value.PROD_CD) || "";

        let _dataQRY_KCD_STYLE1 = { ...dataQRY_KCD_STYLE1 };

        let tTypeVal = _dataQRY_KCD_STYLE1[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KCD_STYLE1[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KCD_STYLE1[`${name}`] = parseInt(val);
        }

        setDataQRY_KCD_STYLE1(_dataQRY_KCD_STYLE1);
        setDataQRY_KCD_STYLE1_COLOR(e.value);
    };

    const onInputChangeQRY_KCD_STYLE1_ORDER_CD = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KCD_STYLE1 = { ...dataQRY_KCD_STYLE1 };

        let tTypeVal = _dataQRY_KCD_STYLE1[`${name}`];
        if (typeof tTypeVal === "string") _dataQRY_KCD_STYLE1[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KCD_STYLE1[`${name}`] = parseInt(val);

        setDataQRY_KCD_STYLE1(_dataQRY_KCD_STYLE1);
    };

    const onInputChangeQRY_KCD_STYLE1_ORDER_MRP_SEQ = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KCD_STYLE1 = { ...dataQRY_KCD_STYLE1 };

        let tTypeVal = _dataQRY_KCD_STYLE1[`${name}`];
        if (typeof tTypeVal === "string") _dataQRY_KCD_STYLE1[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KCD_STYLE1[`${name}`] = parseInt(val);

        setDataQRY_KCD_STYLE1(_dataQRY_KCD_STYLE1);
    };

    const onInputChangeQRY_KCD_STYLE1_STYLE_NAME = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KCD_STYLE1 = { ...dataQRY_KCD_STYLE1 };

        let tTypeVal = _dataQRY_KCD_STYLE1[`${name}`];
        if (typeof tTypeVal === "string") _dataQRY_KCD_STYLE1[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KCD_STYLE1[`${name}`] = parseInt(val);

        setDataQRY_KCD_STYLE1(_dataQRY_KCD_STYLE1);
    };

    const onInputChangeQRY_KCD_STYLE1_STYLE_CD = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KCD_STYLE1 = { ...dataQRY_KCD_STYLE1 };

        let tTypeVal = _dataQRY_KCD_STYLE1[`${name}`];
        if (typeof tTypeVal === "string") _dataQRY_KCD_STYLE1[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KCD_STYLE1[`${name}`] = parseInt(val);

        setDataQRY_KCD_STYLE1(_dataQRY_KCD_STYLE1);
    };

    /**TABLE KCD_STYLE */
    // DEFINE DATAGRID : TBL_KCD_STYLE
    const [datasTBL_KCD_STYLE, setDatasTBL_KCD_STYLE] = useState([]);
    const dt_TBL_KCD_STYLE = useRef(null);
    const [dataTBL_KCD_STYLE, setDataTBL_KCD_STYLE] =
        useState(emptyTBL_KCD_STYLE);
    const [selectedTBL_KCD_STYLE, setSelectedTBL_KCD_STYLE] = useState([]);
    const [flagSelectModeTBL_KCD_STYLE, setFlagSelectModeTBL_KCD_STYLE] =
        useState(false);
    const [loadingTBL_KCD_STYLE, setLoadingTBL_KCD_STYLE] = useState(false);

    // DATAGRID CODE : TBL_KCD_STYLE

    const onRowClick1TBL_KCD_STYLE = (argData0) => {
        var argData = {};

        if (typeof argData0.length !== "undefined") {
            argData = argData0[0];
        } else {
            argData = argData0;
        }

        let argTBL_KCD_STYLE = argData;

        setDataTBL_KCD_STYLE(argTBL_KCD_STYLE);

        var argObj = {};
        argObj.STYLE_CD = argData.STYLE_CD;
        setDatasTBL_KSV_PROD_MST([]);
        setDatasTBL_KSV_PROD_MEM([]);

        serviceS030602_MRP_BY_ORDER_STYLE
            .mgrQueryTBL_KSV_PROD_MST(argObj)
            .then((data) => {
                if (typeof data.graphQLErrors === "undefined") {
                    console.log(
                        "ServiceMgrKCD_BUYER.mgr1KcdStyle call => " +
                            data.length,
                    );
                    setDatasTBL_KSV_PROD_MST(data);
                } else {
                    console.log(
                        "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });
    };

    const onRowClickTBL_KCD_STYLE = (event) => {
        let argTBL_KCD_STYLE = event.data;
        if (flagSelectModeTBL_KCD_STYLE) return;

        // Service : NawooAll:mgrQueryTBL_KCD_STYLE
    };

    const searchTBL_KCD_STYLE = () => {
        clearSelectedTBL_KCD_STYLE();

        var argObj = {};
        argObj.STYLE_NAME = dataQRY_KCD_STYLE.STYLE_NAME;

        setDatasTBL_KCD_STYLE([]);
        setDatasTBL_KSV_PROD_MST([]);
        setDatasTBL_KSV_PROD_MEM([]);

        serviceS030602_MRP_BY_ORDER_STYLE
            .mgrQueryTBL_KCD_STYLE(argObj)
            .then((data) => {
                if (typeof data.graphQLErrors === "undefined") {
                    console.log(
                        "ServiceMgrKCD_BUYER.mgr1KcdStyle call => " +
                            data.length,
                    );
                    setDatasTBL_KCD_STYLE(data);
                } else {
                    console.log(
                        "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });
    };

    const clearSelectedTBL_KCD_STYLE = () => {
        setSelectedTBL_KCD_STYLE([]);
        setFlagSelectModeTBL_KCD_STYLE(false);
    };

    const exportExcelTBL_KCD_STYLE = () => {};

    /**TABLE KSV_PROD_MEM */
    // DEFINE DATAGRID : TBL_KSV_PROD_MEM
    const [datasTBL_KSV_PROD_MEM, setDatasTBL_KSV_PROD_MEM] = useState([]);
    const dt_TBL_KSV_PROD_MEM = useRef(null);
    const [dataTBL_KSV_PROD_MEM, setDataTBL_KSV_PROD_MEM] = useState(
        emptyTBL_KSV_PROD_MEM,
    );
    const [selectedTBL_KSV_PROD_MEM, setSelectedTBL_KSV_PROD_MEM] = useState(
        [],
    );
    const [flagSelectModeTBL_KSV_PROD_MEM, setFlagSelectModeTBL_KSV_PROD_MEM] =
        useState(false);

    // DATAGRID CODE : TBL_KSV_PROD_MEM

    const onRowClick1TBL_KSV_PROD_MEM = (argData0) => {
        var argData = {};

        if (typeof argData0.length !== "undefined") {
            argData = argData0[0];
        } else {
            argData = argData0;
        }

        let argTBL_KSV_PROD_MEM = argData;

        setDataTBL_KSV_PROD_MEM(argTBL_KSV_PROD_MEM);
    };

    const onRowClickTBL_KSV_PROD_MEM = (event) => {
        let argTBL_KSV_PROD_MEM = event.data;
        if (flagSelectModeTBL_KSV_PROD_MEM) return;

        // Service : NawooAll:mgrQueryTBL_KSV_PROD_MEM
    };

    /**TABLE KSV_PROD_MEM1 */

    // DEFINE DATAGRID : TBL_KSV_PROD_MEM1
    const [datasTBL_KSV_PROD_MEM1, setDatasTBL_KSV_PROD_MEM1] = useState([]);
    const dt_TBL_KSV_PROD_MEM1 = useRef(null);
    const [dataTBL_KSV_PROD_MEM1, setDataTBL_KSV_PROD_MEM1] = useState(
        emptyTBL_KSV_PROD_MEM1,
    );
    const [selectedTBL_KSV_PROD_MEM1, setSelectedTBL_KSV_PROD_MEM1] = useState(
        [],
    );
    const [
        flagSelectModeTBL_KSV_PROD_MEM1,
        setFlagSelectModeTBL_KSV_PROD_MEM1,
    ] = useState(false);

    // DATAGRID CODE : TBL_KSV_PROD_MEM1
    const addMaterial = () => {
        if (
            datasTBL_KSV_PROD_MEM1.length > 0 &&
            selectedTBL_KSV_PROD_MEM1.length <= 0
        ) {
            alert("자재를 추가할 위치를 선택하세요<br><br>Select where to add materials");
            return;
        }

        var _tInsObj0 = [...selectedTBL_KSV_PROD_MEM];
        var _tSrcObj = [...datasTBL_KSV_PROD_MEM1];
        var addPos = { ...selectedTBL_KSV_PROD_MEM1[0] };

        var _tInsObj = [];
        _tInsObj0.forEach((col, i) => {
            var tFlag = 0;
            _tSrcObj.forEach((col1, i1) => {
                if (
                    col.MATL_CD === col1.MATL_CD &&
                    col.USE_SIZE === col1.USE_SIZE &&
                    col.REMARK === col1.REMARK
                ) {
                    tFlag = 1;
                } else {
                }
            });
            if (tFlag === 0) {
                var tOne = { ...col };
                _tInsObj.push(tOne);
            }
        });

        var tSelArray = [];
        var tArray = [];
        datasTBL_KSV_PROD_MEM1.forEach((col, i) => {
            var tOne = { ...col };
            var tFlag = 0;
            if (
                addPos.MATL_CD === col.MATL_CD &&
                addPos.USE_SIZE === col.USE_SIZE &&
                addPos.REMARK === col.REMARK &&
                tFlag === 0
            ) {
                tFlag = 1;
                tArray.push(tOne);
                _tInsObj.forEach((col1, i1) => {
                    var tOne1 = { ...col1 };
                    tArray.push(tOne1);
                    tSelArray.push(tOne1);
                });
            } else {
                tArray.push(tOne);
            }
        });
        setDatasTBL_KSV_PROD_MEM1(tArray);
        setSelectedTBL_KSV_PROD_MEM([]);
        setSelectedTBL_KSV_PROD_MEM1(tSelArray);
    };

    const delMaterial = () => {
        var _tDelObj = [...selectedTBL_KSV_PROD_MEM1];
        var _tSrcObj = [...datasTBL_KSV_PROD_MEM1];
        var _tNew = _tSrcObj.filter((col, i) => {
            var _tNewOne = col;
            var _tFlags = _tDelObj.filter((col, i) => {
                if (col.SEQ === _tNewOne.SEQ) return col;
            });
            if (_tFlags.length <= 0) return _tNewOne;
        });
        setDatasTBL_KSV_PROD_MEM1(_tNew);
    };

    const allDelMaterial = () => {};

    const saveMaterial = () => {
        if (!Array.isArray(datasTBL_KSV_PROD_MEM1) || datasTBL_KSV_PROD_MEM1.length <= 0) {
            toast.current.show({
                severity: "warn",
                summary: "Save Material",
                detail: "There are no material rows to save.",
                life: 3000,
            });
            return;
        }

        if (
            !dataQRY_KCD_STYLE1_COLOR?.PROD_CD ||
            !dataQRY_KCD_STYLE1?.ORDER_CD ||
            !dataQRY_KCD_STYLE1?.ORDER_MRP_SEQ
        ) {
            toast.current.show({
                severity: "warn",
                summary: "Save Material",
                detail: "Select color and order information first.",
                life: 3000,
            });
            return;
        }

        let _insertObj = datasTBL_KSV_PROD_MEM1.map((col, i) => {
            var tObj = { ...col };
            if (typeof tObj.__typename !== "undefined") delete tObj.__typename;
            if (typeof tObj.id !== "undefined") delete tObj.id;
            tObj.PROD_CD = dataQRY_KCD_STYLE1_COLOR.PROD_CD;
            tObj.ORDER_CD = dataQRY_KCD_STYLE1.ORDER_CD;
            tObj.ORDER_MRP_SEQ = dataQRY_KCD_STYLE1.ORDER_MRP_SEQ;
            return tObj;
        });

        serviceS030602_MRP_BY_ORDER_STYLE
            .mgrInsertEDT_KSV_PROD_MEM(_insertObj)
            .then((data) => {
                if (typeof data.graphQLErrors === "undefined") {
                    if (Array.isArray(data) && data[0]?.CODE?.startsWith("ERROR:")) {
                        toast.current.show({
                            severity: "error",
                            summary: "Save Material",
                            detail: data[0].CODE,
                            life: 3000,
                        });
                        return;
                    }

                    console.log(
                        "ServiceS030602_MRP_BY_ORDER_STYLE.mgrInsertEDT_KSV_PROD_MEM() call => " +
                            data.length,
                    );
                    toast.current.show({
                        severity: "success",
                        summary: "Insert Prod Mem",
                        detail: `insert lengh:${data.length}`,
                        life: 3000,
                    });
                    search_SRC_PROD_MEM();
                    // Search
                } else {
                    var tStr = data.graphQLErrors[0].message;
                    console.log(
                        "ServiceNawooAll.mgrInsertS0306_MRP_RECORD_STYLE( error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                    toast.current.show({
                        severity: "error",
                        summary: "Query Error",
                        detail: tStr,
                        life: 3000,
                    });
                }
            });
    };

    const resetMaterial = () => {};

    const onRowClick1TBL_KSV_PROD_MEM1 = (argData0) => {
        var argData = {};

        if (typeof argData0.length !== "undefined") {
            argData = argData0[0];
        } else {
            argData = argData0;
        }

        let argTBL_KSV_PROD_MEM1 = argData;

        setDataTBL_KSV_PROD_MEM1(argTBL_KSV_PROD_MEM1);
    };

    const onRowClickTBL_KSV_PROD_MEM1 = (event) => {
        let argTBL_KSV_PROD_MEM1 = event.data;
        if (flagSelectModeTBL_KSV_PROD_MEM1) return;

        // Service : NawooAll:mgrQueryTBL_KSV_PROD_MEM1
    };

    /**TABLE KSV_PROD_MST */
    // DEFINE DATAGRID : TBL_KSV_PROD_MST
    const [datasTBL_KSV_PROD_MST, setDatasTBL_KSV_PROD_MST] = useState([]);
    const dt_TBL_KSV_PROD_MST = useRef(null);
    const [dataTBL_KSV_PROD_MST, setDataTBL_KSV_PROD_MST] = useState(
        emptyTBL_KSV_PROD_MST,
    );
    const [selectedTBL_KSV_PROD_MST, setSelectedTBL_KSV_PROD_MST] = useState(
        [],
    );
    const [flagSelectModeTBL_KSV_PROD_MST, setFlagSelectModeTBL_KSV_PROD_MST] =
        useState(false);

    // DATAGRID CODE : TBL_KSV_PROD_MST

    const onRowClick1TBL_KSV_PROD_MST = (argData0) => {
        var argData = {};

        if (typeof argData0.length !== "undefined") {
            argData = argData0[0];
        } else {
            argData = argData0;
        }

        let argTBL_KSV_PROD_MST = argData;

        setDataTBL_KSV_PROD_MST(argTBL_KSV_PROD_MST);

        var argObj = {};
        argObj.STYLE_CD = "";
        argObj.PROD_CD = argData.PROD_CD;

        setDatasTBL_KSV_PROD_MEM([]);

        serviceS030602_MRP_BY_ORDER_STYLE
            .mgrQueryTBL_KSV_PROD_MEM(argObj)
            .then((data) => {
                if (typeof data.graphQLErrors === "undefined") {
                    console.log(
                        "ServiceMgrKCD_BUYER.mgr1KcdStyle call => " +
                            data.length,
                    );
                    setDatasTBL_KSV_PROD_MEM(data);
                } else {
                    console.log(
                        "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });
    };

    const onRowClickTBL_KSV_PROD_MST = (event) => {
        let argTBL_KSV_PROD_MST = event.data;
        if (flagSelectModeTBL_KSV_PROD_MST) return;

        // Service : NawooAll:mgrQueryTBL_KSV_PROD_MST
    };

    useEffect(() => {
        let tOrderCd = "";
        let tOrderMrpSeq = "";
        let tStyleCd = "";

        var tUrls = window.location.href.split("?");
        if (tUrls.length <= 1) {
        } else {
            var tParams1 = tUrls[1].split("&");
            var tParams2 = tParams1.map((col, i) => {
                var tObj = {};
                var tCols = col.split("=");

                if (tCols[0].includes("ORDER_CD")) {
                    tObj.key = tCols[0];
                    tObj.value = tCols[1];
                    tOrderCd = tObj.value;
                    console.log(tObj);
                    return tObj;
                }
                if (tCols[0].includes("ORDER_MRP_SEQ")) {
                    tObj.key = tCols[0];
                    tObj.value = tCols[1];
                    tOrderMrpSeq = tObj.value;
                    console.log(tObj);
                    return tObj;
                }
            });
            if (tParams2.length > 0) {
                tOrderCd = tParams2[0].value;
            }
            console.log(tParams2);
        }

        console.log("S030602:" + tOrderCd + "," + tOrderMrpSeq);

        var argObj = {};
        argObj.STYLE_NAME = "";

        setLoadingTBL_KCD_STYLE(true);

        serviceS030602_MRP_BY_ORDER_STYLE
            .mgrQueryTBL_KCD_STYLE(argObj)
            .then((data) => {
                setLoadingTBL_KCD_STYLE(false);
                if (typeof data.graphQLErrors === "undefined") {
                    console.log(
                        "ServiceMgrKCD_BUYER.mgr1KcdStyle call => " +
                            data.length,
                    );
                    setDatasTBL_KCD_STYLE(data);
                } else {
                    console.log(
                        "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });

        var argObj1 = {};
        // argObj1.STYLE_NAME = 'ST23-0734';
        argObj1.ORDER_CD = tOrderCd;
        argObj1.ORDER_MRP_SEQ = tOrderMrpSeq;

        serviceS030602_MRP_BY_ORDER_STYLE
            .mgrQueryTBL_KCD_STYLE_SRC(argObj1)
            .then((data) => {
                if (typeof data.graphQLErrors === "undefined") {
                    console.log(
                        "ServiceMgrKCD_BUYER.mgr1KcdStyle call => " +
                            data.PROD_MST.length,
                    );

                    var tObj = {};
                    tObj.STYLE_CD = data.STYLE.STYLE_CD;

                    var _tObj1 = { ...dataQRY_KCD_STYLE1 };
                    _tObj1.STYLE_NAME = data.STYLE.STYLE_NAME;
                    _tObj1.STYLE_CD = data.STYLE.STYLE_CD;
                    _tObj1.ORDER_CD = tOrderCd;
                    _tObj1.ORDER_MRP_SEQ = tOrderMrpSeq;
                    setDataQRY_KCD_STYLE1(_tObj1);

                    if (data.PROD_MST.length > 0) {
                        setDatasQRY_KCD_STYLE1_COLOR(data.PROD_MST);
                        setDataQRY_KCD_STYLE1_COLOR(data.PROD_MST[0]);

                        tObj.PROD_CD = data.PROD_MST[0].PROD_CD;
                        tObj.ORDER_CD = data.PROD_MST[0].ORDER_CD;
                        tObj.ORDER_MRP_SEQ = data.PROD_MST[0].ORDER_MRP_SEQ;
                        serviceS030602_MRP_BY_ORDER_STYLE
                            .mgrQueryTBL_KSV_PROD_MEM(tObj)
                            .then((data) => {
                                if (typeof data.graphQLErrors === "undefined") {
                                    console.log(
                                        "mgrQueryTBL_KSV_PROD_MEM call => " +
                                            data.length,
                                    );
                                    setDatasTBL_KSV_PROD_MEM1(data);
                                } else {
                                    console.log(
                                        "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                                            JSON.stringify(data.graphQLErrors),
                                    );
                                }
                            });
                    }
                } else {
                    console.log(
                        "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });
    }, []);

    // Support Area

    return (
        <div className="af-div-main">
            <div
                className="af-div-first"
                style={{ width: "110rem", height: "3rem" }}
            >
                <span className="af-span-3-0" style={{ width: "31rem" }}>
                    <p className="af-span-p" style={{ width: "7rem" }}>Style</p>
                    <div className="af-span-div" style={{ width: "23rem" }}>
                        <InputText
                            style={{ width: "23rem" }}
                            id="id_STYLE_NAME"
                            value={dataQRY_KCD_STYLE.STYLE_NAME}
                            onChange={(e) =>
                                onInputChangeQRY_KCD_STYLE_STYLE_NAME(
                                    e,
                                    "STYLE_NAME",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "13rem" }}>
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
                            onClick={searchTBL_KCD_STYLE}
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "13rem" }}>
                    <div className="af-span-div-btn" style={{ width: "12rem" }}>
                        <Button
                            label="All Sel"
                            style={{ width: "12rem" }}
                            className="p-button-text"
                            onClick={process_ALL_SEL}
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "13rem" }}>
                    <div className="af-span-div-btn" style={{ width: "12rem" }}>
                        <Button
                            label="Excel"
                            style={{ width: "12rem" }}
                            className="p-button-text green"
                            onClick={exportExcelTBL_KCD_STYLE}
                        />
                    </div>
                </span>
            </div>

            <div
                className="af-div-first"
                style={{ width: "30rem", height: "24rem" }}
            >
                <div
                    className="af-div-first"
                    style={{ width: "30rem", height: "13rem" }}
                >
                    <AFDataTable preventUnrelatedRerender
                        ref={dt_TBL_KCD_STYLE}
                        size="small"
                        value={datasTBL_KCD_STYLE}
                        loading={loadingTBL_KCD_STYLE}
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
                                "selected length:" +
                                    selectedTBL_KCD_STYLE.length,
                            );
                            onRowClick1TBL_KCD_STYLE(e.value);
                        }}
                        onRowClick={onRowClickTBL_KCD_STYLE}
                        dataKey="STYLE_CD"
                        className="datatable-responsive"
                        virtualScrollerOptions={{ itemSize: 20 }}
                        emptyMessage=" "
                        //header={headerTBL_KCD_STYLE}
                        responsiveLayout="scroll"
                        scrollable
                        scrollHeight="13rem"
                    >
                        <AFColumn field="STYLE_NAME" headerClassName="t-header" header="STYLE NAME" style={{ width: "14rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                        <AFColumn field="STYLE_CD" headerClassName="t-header" header="STYLE CD" style={{ width: "6rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    </AFDataTable>
                </div>
                <div
                    className="af-div-second"
                    style={{ width: "30rem", height: "10rem" }}
                >
                    <AFDataTable preventUnrelatedRerender
                        ref={dt_TBL_KSV_PROD_MST}
                        size="small"
                        value={datasTBL_KSV_PROD_MST}
                        tableStyle={{ tableLayout: "fixed" }}
                        resizableColumns
                        columnResizeMode="expand"
                        showGridlines
                        selectionMode="checkbox"
                        selection={selectedTBL_KSV_PROD_MST}
                        onSelectionChange={(e) => {
                            setFlagSelectModeTBL_KSV_PROD_MST(true);
                            setSelectedTBL_KSV_PROD_MST(e.value);
                            console.log(
                                "selected length:" +
                                    selectedTBL_KSV_PROD_MST.length,
                            );
                            onRowClick1TBL_KSV_PROD_MST(e.value);
                        }}
                        onRowClick={onRowClickTBL_KSV_PROD_MST}
                        dataKey="COLOR"
                        className="datatable-responsive"
                        virtualScrollerOptions={{ itemSize: 20 }}
                        emptyMessage=" "
                        //header={headerTBL_KSV_PROD_MST}
                        responsiveLayout="scroll"
                        scrollable
                        scrollHeight="10rem"
                    >
                        <AFColumn field="STATUS" headerClassName="t-header" header="STATUS" style={{ width: "14rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                        <AFColumn field="COLOR" headerClassName="t-header" header="COLOR" style={{ width: "6rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    </AFDataTable>
                </div>
            </div>

            <div
                className="af-div-second"
                style={{ width: "80rem", height: "24rem" }}
            >
                <AFDataTable preventUnrelatedRerender
                    ref={dt_TBL_KSV_PROD_MEM}
                    size="small"
                    value={datasTBL_KSV_PROD_MEM}
                    tableStyle={{ tableLayout: "fixed" }}
                    resizableColumns
                    columnResizeMode="fit"
                    metaKeySelection={false}
                    showGridlines
                    selectionMode="multiple"
                    selection={selectedTBL_KSV_PROD_MEM}
                    onSelectionChange={(e) => {
                        setFlagSelectModeTBL_KSV_PROD_MEM(true);
                        setSelectedTBL_KSV_PROD_MEM(e.value);
                        console.log(
                            "selected length:" +
                                selectedTBL_KSV_PROD_MEM.length,
                        );
                        onRowClick1TBL_KSV_PROD_MEM(e.value);
                    }}
                    onRowClick={onRowClickTBL_KSV_PROD_MEM}
                    dataKey="SEQ"
                    className="datatable-responsive"
                    virtualScrollerOptions={{ itemSize: 20 }}
                    emptyMessage=" "
                    //header={headerTBL_KSV_PROD_MEM}
                    responsiveLayout="scroll"
                    scrollable
                    scrollHeight="24rem"
                >
                    <AFColumn field="MATL_TYPE2" headerClassName="t-header" header="A" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="MATL_CD" headerClassName="t-header" header="Matl" style={{ width: "8rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="MATL_NAME" headerClassName="t-header" header="Matl Name" style={{ width: "15rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="COLOR" headerClassName="t-header" header="Color" style={{ width: "12rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="SPEC" headerClassName="t-header" header="Spec" style={{ width: "15rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="MATL_PRICE" headerClassName="t-header" header="Price" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="CURR_CD" headerClassName="t-header" header="Curr" style={{ width: "8rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="UNIT" headerClassName="t-header" header="Unit" style={{ width: "5rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="ADD_LOSS" headerClassName="t-header" header="add loss" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="USE_SIZE" headerClassName="t-header" header="Size" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="REMARK" headerClassName="t-header" header="Remark" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="BVT_REMARK" headerClassName="t-header" header="Bvt Remark" style={{ width: "15rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="COUNTRY" headerClassName="t-header" header="Country" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="STD_NET" headerClassName="t-header" header="Std Net" style={{ width: "7rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="STD_LOSS" headerClassName="t-header" header="Std Loss" style={{ width: "7rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="STD_GROSS" headerClassName="t-header" header="Std Gross" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="NET" headerClassName="t-header" header="Net" style={{ width: "5rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="LOSS" headerClassName="t-header" header="Loss" style={{ width: "5rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="GROSS" headerClassName="t-header" header="Gross" style={{ width: "6rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="VENDOR_NAME" headerClassName="t-header" header="Vendor" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="VENDOR_CD" headerClassName="t-header" header="Vendor" style={{ width: "5rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="SEQ" headerClassName="t-header" header="Seq" style={{ width: "4rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                </AFDataTable>
            </div>

            <div
                className="af-div-first"
                style={{ width: "110rem", height: "3rem" }}
            >
                <span className="af-span-3-0" style={{ width: "39rem" }}>
                    <p className="af-span-p" style={{ width: "7rem" }}>Order</p>
                    <div className="af-span-div" style={{ width: "15rem" }}>
                        <InputText
                            disabled
                            style={{ width: "15rem" }}
                            id="id_STYLE_NAME"
                            value={dataQRY_KCD_STYLE1.ORDER_CD}
                            onChange={(e) =>
                                onInputChangeQRY_KCD_STYLE1_ORDER_CD(
                                    e,
                                    "ORDER_CD",
                                )
                            }
                        />
                    </div>
                    <div className="af-span-div" style={{ width: "15rem" }}>
                        <InputText
                            disabled
                            style={{ width: "15rem" }}
                            id="id_STYLE_NAME"
                            value={dataQRY_KCD_STYLE1.ORDER_MRP_SEQ}
                            onChange={(e) =>
                                onInputChangeQRY_KCD_STYLE1_ORDER_MRP_SEQ(
                                    e,
                                    "ORDER_MRP_SEQ",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "23rem" }}>
                    <p className="af-span-p" style={{ width: "7rem" }}>Style</p>
                    <div className="af-span-div" style={{ width: "15rem" }}>
                        <InputText
                            disabled
                            style={{ width: "15rem" }}
                            id="id_STYLE_NAME"
                            value={dataQRY_KCD_STYLE1.STYLE_NAME}
                            onChange={(e) =>
                                onInputChangeQRY_KCD_STYLE1_STYLE_NAME(
                                    e,
                                    "STYLE_NAME",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "11rem" }}>
                    <div className="af-span-div" style={{ width: "10rem" }}>
                        <InputText
                            disabled
                            style={{ width: "10rem" }}
                            id="id_STYLE_CD"
                            value={dataQRY_KCD_STYLE1.STYLE_CD}
                            onChange={(e) =>
                                onInputChangeQRY_KCD_STYLE1_STYLE_CD(
                                    e,
                                    "STYLE_CD",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "18rem" }}>
                    <p className="af-span-p" style={{ width: "7rem" }}>Style</p>
                    <div className="af-span-div" style={{ width: "10rem" }}>
                        <Dropdown
                            style={{ width: "10rem" }}
                            id="id_COLOR"
                            value={dataQRY_KCD_STYLE1_COLOR}
                            onChange={(e) =>
                                onDropdownChangeQRY_KCD_STYLE1_COLOR(e, "COLOR")
                            }
                            options={datasQRY_KCD_STYLE1_COLOR}
                            optionLabel="COLOR"
                            placeholder=""
                            editable
                        ></Dropdown>
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "13rem" }}>
                    <div className="af-span-div-btn" style={{ width: "12rem" }}>
                        <Button
                            label={
                                <span>
                                    Search(<u>S</u>)
                                </span>
                            }
                            style={{ width: "12rem" }}
                            className="p-button-text"
                            onClick={search_SRC_PROD_MEM}
                        />
                    </div>
                </span>
            </div>
            <div
                className="af-div-first"
                style={{ width: "110rem", height: "25rem" }}
            >
                <AFDataTable preventUnrelatedRerender
                    ref={dt_TBL_KSV_PROD_MEM1}
                    size="small"
                    value={datasTBL_KSV_PROD_MEM1}
                    tableStyle={{ tableLayout: "fixed" }}
                    resizableColumns
                    columnResizeMode="expand"
                    metaKeySelection={false}
                    showGridlines
                    selectionMode="multiple"
                    selection={selectedTBL_KSV_PROD_MEM1}
                    onSelectionChange={(e) => {
                        setFlagSelectModeTBL_KSV_PROD_MEM1(true);
                        setSelectedTBL_KSV_PROD_MEM1(e.value);
                        console.log(
                            "selected length:" +
                                selectedTBL_KSV_PROD_MEM1.length,
                        );
                        onRowClick1TBL_KSV_PROD_MEM1(e.value);
                    }}
                    onRowClick={onRowClickTBL_KSV_PROD_MEM1}
                    dataKey="MATL_CD"
                    className="datatable-responsive"
                    virtualScrollerOptions={{ itemSize: 20 }}
                    emptyMessage=" "
                    //header={headerTBL_KSV_PROD_MEM1}
                    responsiveLayout="scroll"
                    scrollable
                    scrollHeight="25rem"
                >
                    <AFColumn field="MATL_TYPE2" headerClassName="t-header" header="A" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="MATL_CD" headerClassName="t-header" header="Matl" style={{ width: "8rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="MATL_NAME" headerClassName="t-header" header="Matl Name" style={{ width: "14rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="COLOR" headerClassName="t-header" header="Color" style={{ width: "14rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="SPEC" headerClassName="t-header" header="Spec" style={{ width: "15rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="MATL_PRICE" headerClassName="t-header" header="Price" style={{ width: "8rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="CURR_CD" headerClassName="t-header" header="Curr" style={{ width: "7rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="UNIT" headerClassName="t-header" header="Unit" style={{ width: "5rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="ADD_LOSS" headerClassName="t-header" header="add loss" style={{ width: "8rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="USE_SIZE" headerClassName="t-header" header="Size" style={{ width: "12rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="REMARK" headerClassName="t-header" header="Remark" style={{ width: "15rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="BVT_REMARK" headerClassName="t-header" header="Bvt Remark" style={{ width: "12rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="COUNTRY" headerClassName="t-header" header="Country" style={{ width: "8rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="STD_NET" headerClassName="t-header" header="Std Net" style={{ width: "6rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="STD_LOSS" headerClassName="t-header" header="Std Loss" style={{ width: "7rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="STD_GROSS" headerClassName="t-header" header="Std Gross" style={{ width: "7rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="NET" headerClassName="t-header" header="Net" style={{ width: "5rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="LOSS" headerClassName="t-header" header="Loss" style={{ width: "5rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="GROSS" headerClassName="t-header" header="Gross" style={{ width: "6rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="VENDOR_NAME" headerClassName="t-header" header="Vendor" style={{ width: "8rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="VENDOR_CD" headerClassName="t-header" header="Vendor" style={{ width: "8rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="SEQ" headerClassName="t-header" header="Seq" style={{ width: "5rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                </AFDataTable>
            </div>
            <div
                className="af-div-first"
                style={{ width: "110rem", height: "3rem" }}
            >
                <span className="af-span-3-0" style={{ width: "13rem" }}>
                    <div className="af-span-div-btn" style={{ width: "12rem" }}>
                        <Button
                            label="Add"
                            style={{ width: "12rem" }}
                            className="p-button-text"
                            onClick={addMaterial}
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "13rem" }}>
                    <div className="af-span-div-btn" style={{ width: "12rem" }}>
                        <Button
                            label="Delete"
                            style={{ width: "12rem" }}
                            className="p-button-text"
                            onClick={delMaterial}
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "13rem" }}>
                    <div className="af-span-div-btn" style={{ width: "12rem" }}>
                        <Button
                            label="All Del"
                            style={{ width: "12rem" }}
                            className="p-button-text"
                            onClick={allDelMaterial}
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "13rem" }}>
                    <div className="af-span-div-btn" style={{ width: "12rem" }}>
                        <Button
                            label="Reset"
                            style={{ width: "12rem" }}
                            className="p-button-text"
                            onClick={resetMaterial}
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "13rem" }}>
                    <div className="af-span-div-btn" style={{ width: "12rem" }}>
                        <Button
                            label="Save"
                            style={{ width: "12rem" }}
                            className="p-button-text"
                            onClick={saveMaterial}
                        />
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

export default React.memo(S030602_MRP_BY_ORDER_STYLE, comparisonFn);
