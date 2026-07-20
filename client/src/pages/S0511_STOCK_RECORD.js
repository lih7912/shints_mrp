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
import { ServiceS0511_STOCK_RECORD } from "../service/service_biz/ServiceS0511_STOCK_RECORD";

import "./page_common.scss";

const emptyKCD_CODE = {
    id: 0,
    CD_GROUP: "",
    CD_CODE: "",
    CD_NAME: "",
    CD_FLAG: "",
};

const emptyQRY_KSV_STOCK_MATL = {
    FACTORY_CD: "",
    PO_CD: "",
    ORDER_CD: "",
    BUYER_CD: "",
    PO_SEQ: "",
    STATUS_CD: "",
};

const emptyTBL_KSV_STOCK_MATL = {
    id: 0,
    MATL_CD: "",
    MATL_NAME: "",
    COLOR: "",
    SPEC: "",
    UNIT: "",
    STOCK_QTY: "",
    RACK: "",
    LOCATION: "",
    REMARK: "",
    VENDOR_NAME: "",
};

const emptyTBL_KSV_STOCK_MATL1 = {
    id: 0,
    MATL_CD: "",
    MATL_NAME: "",
    COLOR: "",
    SPEC: "",
    UNIT: "",
    STOCK_QTY: "",
    RACK: "",
    LOCATION: "",
    REMARK: "",
    VENDOR_NAME: "",
};

const emptyTBL_KSV_STOCK_MATL2 = {
    id: 0,
    MATL_CD: "",
    ORDER_CD: "",
    MATL_NAME: "",
    COLOR: "",
    SPEC: "",
    UNIT: "",
    STOCK_QTY: "",
    REMAIN_QTY: "",
    STATUS: "",
    RACK: "",
    LOCATION: "",
    REMARK: "",
    REMARK0: "",
    VENDOR_NAME: "",
};

const emptyEDT_KSV_STOCK_MATL = {
    MATL_NAME: "",
    COLOR: "",
    MATL_CD: "",
    SPEC: "",
    VENDOR_NAME: "",
    IS_UNUSABLE: "",
    STOCK_REMARK: "",
};

const S0511_STOCK_RECORD = () => {
    const serviceLibRef = useRef(null);
    if (!serviceLibRef.current) {
        serviceLibRef.current = new ServiceLib();
        serviceLibRef.current.loginConfirm();
    }
    const serviceLib = serviceLibRef.current;
    const serviceS0511_STOCK_RECORDRef = useRef(null);
    if (!serviceS0511_STOCK_RECORDRef.current) serviceS0511_STOCK_RECORDRef.current = new ServiceS0511_STOCK_RECORD();
    const serviceS0511_STOCK_RECORD = serviceS0511_STOCK_RECORDRef.current;

    const toast = useRef(null);

    /* splitter 관련 */
    const [styleVal, setStyleVal] = useState({ width: "65vw" });

    const search_LIST_STOCK = (argStockIdx) => {
        var _tData = { ...dataQRY_KSV_STOCK_MATL };
        var _tData0 = { ...dataEDT_KSV_STOCK_MATL };

        setDatasTBL_KSV_STOCK_MATL2([]);
        setSelectedTBL_KSV_STOCK_MATL2([]);

        var _tObj = {};

        _tObj.MATL_NAME = "";
        _tObj.VENDOR_NAME = "";
        _tObj.COLOR = "";
        _tObj.SPEC = "";
        _tObj.MATL_CD = "";
        _tObj.PO_CD = _tData.PO_CD.trim();
        _tObj.ORDER_CD = _tData.ORDER_CD.trim();

        // 3
        serviceS0511_STOCK_RECORD.mgrQuery_LIST_STOCK(_tObj).then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                console.log(
                    "ServiceMgrKCD_BUYER.mgr1KcdStyle call => " + data.length,
                );
                var tArray2 = data.map((col, i) => {
                    var tObj = { ...col };
                    tObj.id = i + 1;
                    return tObj;
                });
                setDatasTBL_KSV_STOCK_MATL2(tArray2);
            } else {
                console.log(
                    "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });

        var _tObj = {};
        _tObj.PO_CD = _tData.PO_CD.trim();
        _tObj.FACTORY_CD = _tData.FACTORY_CD.trim();

        serviceS0511_STOCK_RECORD.mgrQuery_CODE(_tObj).then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                console.log(
                    "ServiceMgrKCD_BUYER.mgr1KcdStyle call => " +
                        data.FACTORY_CD.length,
                );

                if (datasQRY_KSV_STOCK_MATL_ORDER_CD.length <= 1) {
                    setDatasQRY_KSV_STOCK_MATL_ORDER_CD(data.ORDER_CD);
                    setDataQRY_KSV_STOCK_MATL_ORDER_CD(data.ORDER_CD[0]);
                }

                setDatasQRY_KSV_STOCK_MATL_BUYER_CD([]);
            } else {
                console.log(
                    "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });
    };

    const search_LIST_MATL = (argStockIdx) => {
        var _tData = { ...dataEDT_KSV_STOCK_MATL };

        var _tObj = {};
        _tObj.MATL_NAME = _tData.MATL_NAME;
        _tObj.VENDOR_NAME = _tData.VENDOR_NAME;
        _tObj.COLOR = _tData.COLOR;
        _tObj.SPEC = _tData.SPEC;
        _tObj.MATL_CD = _tData.MATL_CD;

        setDatasTBL_KSV_STOCK_MATL1([]);
        setSelectedTBL_KSV_STOCK_MATL1([]);

        serviceS0511_STOCK_RECORD.mgrQuery_LIST_MATL(_tObj).then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                console.log(
                    "ServiceMgrKCD_BUYER.mgr1KcdStyle call => " + data.length,
                );
                var tArray2 = data.map((col, i) => {
                    var tObj = { ...col };
                    tObj.id = i + 1;
                    return tObj;
                });
                setDatasTBL_KSV_STOCK_MATL1(tArray2);
            } else {
                console.log(
                    "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });
    };

    const process_MOVE_STOCK = () => {
        var _tData0 = { ...dataQRY_KSV_STOCK_MATL };
        var _tDataArray = [...datasTBL_KSV_STOCK_MATL];

        var tArray = _tDataArray.map((col, i) => {
            var _tData = { ...col };
            _tData.USER_ID = serviceLib.getUserInfo().USER_ID;
            _tData.ORG_REMARK = _tData.REMARK;
            delete _tData.id;
            delete _tData.__typename;
            return _tData;
        });

        serviceS0511_STOCK_RECORD.mgrInsert_MOVE_STOCK(tArray).then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                console.log(
                    "ServiceMgrKCD_BUYER.mgr1KcdStyle call => " + data.length,
                );
                toast.current.show({
                    severity: "success",
                    summary: "SUCCEED:Insert Facin",
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
                    summary: "ERROR:Insert Facin",
                    detail: "",
                    life: 3000,
                });
            }
            setDatasTBL_KSV_STOCK_MATL([]);
        });
    };

    /*QRY KSV_STOCK_MATL */
    const [dataQRY_KSV_STOCK_MATL, setDataQRY_KSV_STOCK_MATL] = useState(
        emptyQRY_KSV_STOCK_MATL,
    );

    const [
        datasQRY_KSV_STOCK_MATL_FACTORY_CD,
        setDatasQRY_KSV_STOCK_MATL_FACTORY_CD,
    ] = useState([]);
    const [
        dataQRY_KSV_STOCK_MATL_FACTORY_CD,
        setDataQRY_KSV_STOCK_MATL_FACTORY_CD,
    ] = useState({});

    const onDropdownChangeQRY_KSV_STOCK_MATL_FACTORY_CD = (e, name) => {
        let val = (e.value && e.value.FACTORY_CD) || "";

        let _dataQRY_KSV_STOCK_MATL = { ...dataQRY_KSV_STOCK_MATL };

        let tTypeVal = _dataQRY_KSV_STOCK_MATL[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_STOCK_MATL[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_STOCK_MATL[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_STOCK_MATL(_dataQRY_KSV_STOCK_MATL);
        setDataQRY_KSV_STOCK_MATL_FACTORY_CD(e.value);
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

    const [
        datasQRY_KSV_STOCK_MATL_ORDER_CD,
        setDatasQRY_KSV_STOCK_MATL_ORDER_CD,
    ] = useState([]);
    const [
        dataQRY_KSV_STOCK_MATL_ORDER_CD,
        setDataQRY_KSV_STOCK_MATL_ORDER_CD,
    ] = useState({});

    const onDropdownChangeQRY_KSV_STOCK_MATL_ORDER_CD = (e, name) => {
        let val = "";
        if (typeof e.value === "string") val = e.value;
        else val = (e.value && e.value.ORDER_CD) || "";

        let _dataQRY_KSV_STOCK_MATL = { ...dataQRY_KSV_STOCK_MATL };

        let tTypeVal = _dataQRY_KSV_STOCK_MATL[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_STOCK_MATL[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_STOCK_MATL[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_STOCK_MATL(_dataQRY_KSV_STOCK_MATL);
        setDataQRY_KSV_STOCK_MATL_ORDER_CD(e.value);
    };

    const [
        datasQRY_KSV_STOCK_MATL_BUYER_CD,
        setDatasQRY_KSV_STOCK_MATL_BUYER_CD,
    ] = useState([]);
    const [
        dataQRY_KSV_STOCK_MATL_BUYER_CD,
        setDataQRY_KSV_STOCK_MATL_BUYER_CD,
    ] = useState({});

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

    const onInputChangeQRY_KSV_STOCK_MATL_PO_SEQ = (e, name) => {
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
        datasQRY_KSV_STOCK_MATL_STATUS_CD,
        setDatasQRY_KSV_STOCK_MATL_STATUS_CD,
    ] = useState([]);
    const [
        dataQRY_KSV_STOCK_MATL_STATUS_CD,
        setDataQRY_KSV_STOCK_MATL_STATUS_CD,
    ] = useState({});

    const onDropdownChangeQRY_KSV_STOCK_MATL_STATUS_CD = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataQRY_KSV_STOCK_MATL = { ...dataQRY_KSV_STOCK_MATL };

        let tTypeVal = _dataQRY_KSV_STOCK_MATL[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_STOCK_MATL[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_STOCK_MATL[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_STOCK_MATL(_dataQRY_KSV_STOCK_MATL);
        setDataQRY_KSV_STOCK_MATL_STATUS_CD(e.value);
    };

    const onKeyPressQRY_KSV_STOCK_MATL_PO_CD = (e) => {
        if (e.key !== "Enter") return;

        var _tObj0 = { ...dataQRY_KSV_STOCK_MATL };

        var _tObj = {};
        _tObj.PO_CD = _tObj0.PO_CD;
        _tObj.FACTORY_CD = _tObj0.FACTORY_CD;

        serviceS0511_STOCK_RECORD.mgrQuery_CODE(_tObj).then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                console.log(
                    "ServiceMgrKCD_BUYER.mgr1KcdStyle call => " +
                        data.FACTORY_CD.length,
                );

                setDatasQRY_KSV_STOCK_MATL_FACTORY_CD(data.FACTORY_CD);
                setDataQRY_KSV_STOCK_MATL_FACTORY_CD(data.FACTORY_CD[0]);

                setDatasQRY_KSV_STOCK_MATL_ORDER_CD(data.ORDER_CD);
                setDataQRY_KSV_STOCK_MATL_ORDER_CD(data.ORDER_CD[0]);

                setDatasQRY_KSV_STOCK_MATL_BUYER_CD([]);

                setDatasEDT_KSV_STOCK_MATL_STOCK_REMARK(data.STOCK_REMARK);
                setDataEDT_KSV_STOCK_MATL_STOCK_REMARK(data.STOCK_REMARK[0]);
            } else {
                console.log(
                    "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
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
    };

    const onRowClickTBL_KSV_STOCK_MATL = (event) => {
        let argTBL_KSV_STOCK_MATL = event.data;
        if (flagSelectModeTBL_KSV_STOCK_MATL) return;

        // Service : NawooAll:mgrQueryTBL_KSV_STOCK_MATL
    };

    const exportExcelTBL_KSV_STOCK_MATL = () => {};

    /**TABLE KSV_STOCK_MATL1 */

    // DEFINE DATAGRID : TBL_KSV_STOCK_MATL1
    const [datasTBL_KSV_STOCK_MATL1, setDatasTBL_KSV_STOCK_MATL1] = useState(
        [],
    );
    const dt_TBL_KSV_STOCK_MATL1 = useRef(null);
    const [dataTBL_KSV_STOCK_MATL1, setDataTBL_KSV_STOCK_MATL1] = useState(
        emptyTBL_KSV_STOCK_MATL1,
    );
    const [selectedTBL_KSV_STOCK_MATL1, setSelectedTBL_KSV_STOCK_MATL1] =
        useState([]);
    const [
        flagSelectModeTBL_KSV_STOCK_MATL1,
        setFlagSelectModeTBL_KSV_STOCK_MATL1,
    ] = useState(false);

    // DATAGRID CODE : TBL_KSV_STOCK_MATL1

    const onRowClick1TBL_KSV_STOCK_MATL1 = (argData0) => {
        var argData = {};

        if (typeof argData0.length !== "undefined") {
            argData = argData0[0];
        } else {
            argData = argData0;
        }

        let argTBL_KSV_STOCK_MATL1 = argData;

        setDataTBL_KSV_STOCK_MATL1(argTBL_KSV_STOCK_MATL1);
    };

    const onRowClickTBL_KSV_STOCK_MATL1 = (event) => {
        let argTBL_KSV_STOCK_MATL1 = event.data;
        if (flagSelectModeTBL_KSV_STOCK_MATL1) return;

        // Service : NawooAll:mgrQueryTBL_KSV_STOCK_MATL1
    };

    const searchTBL_KSV_STOCK_MATL1 = () => {
        clearSelectedTBL_KSV_STOCK_MATL1();

        // serviceS0511_STOCK_RECORD.mgrQueryTBL_KSV_STOCK_MATL1(dataQRY_KSV_STOCK_MATL1).then(data => {
        //     if (typeof data.graphQLErrors === 'undefined') {
        //         console.log("ServiceNawooAll.mgrQueryTBL_KSV_STOCK_MATL1() call => " + data.length);
        //         setDatasTBL_KSV_STOCK_MATL1(data);
        //     } else {
        //         // var tStr = data.graphQLErrors[0].message;
        //         console.log("ServiceNawooAll.mgrQueryTBL_KSV_STOCK_MATL1()error => " + JSON.stringify(data.graphQLErrors));
        //
        //     }
        // });

        // Service : NawooAll:mgrQueryTBL_KSV_STOCK_MATL1
    };

    const clearSelectedTBL_KSV_STOCK_MATL1 = () => {
        setSelectedTBL_KSV_STOCK_MATL1([]);
        setFlagSelectModeTBL_KSV_STOCK_MATL1(false);
    };

    /**TABLE KSV_STOCK_MATL2 */
    // DEFINE DATAGRID : TBL_KSV_STOCK_MATL2
    const [datasTBL_KSV_STOCK_MATL2, setDatasTBL_KSV_STOCK_MATL2] = useState(
        [],
    );
    const dt_TBL_KSV_STOCK_MATL2 = useRef(null);
    const [dataTBL_KSV_STOCK_MATL2, setDataTBL_KSV_STOCK_MATL2] = useState(
        emptyTBL_KSV_STOCK_MATL2,
    );
    const [selectedTBL_KSV_STOCK_MATL2, setSelectedTBL_KSV_STOCK_MATL2] =
        useState([]);
    const [
        flagSelectModeTBL_KSV_STOCK_MATL2,
        setFlagSelectModeTBL_KSV_STOCK_MATL2,
    ] = useState(false);

    // DATAGRID CODE : TBL_KSV_STOCK_MATL2

    const onRowClick1TBL_KSV_STOCK_MATL2 = (argData0) => {
        var argData = {};

        if (typeof argData0.length !== "undefined") {
            argData = argData0[0];
        } else {
            argData = argData0;
        }

        let argTBL_KSV_STOCK_MATL2 = argData;

        setDataTBL_KSV_STOCK_MATL2(argTBL_KSV_STOCK_MATL2);

        var tFlag = 0;
        datasTBL_KSV_STOCK_MATL.forEach((col, i) => {
            if (col.MATL_CD === argData.MATL_CD) tFlag = 1;
        });

        if (tFlag === 1) return;

        var _tData0 = { ...argData };
        _tData0.id = datasTBL_KSV_STOCK_MATL.length + 1;

        var _tObj = [...datasTBL_KSV_STOCK_MATL];
        _tObj.unshift(_tData0);
        setDatasTBL_KSV_STOCK_MATL(_tObj);
    };

    const onRowClickTBL_KSV_STOCK_MATL2 = (event) => {
        let argTBL_KSV_STOCK_MATL2 = event.data;
        if (flagSelectModeTBL_KSV_STOCK_MATL2) return;

        // Service : NawooAll:mgrQueryTBL_KSV_STOCK_MATL2
    };

    /**EDIT KSV_STOCK_MATL */
    const [datasEDT_KSV_STOCK_MATL, setDatasEDT_KSV_STOCK_MATL] = useState([]);
    const [dataEDT_KSV_STOCK_MATL, setDataEDT_KSV_STOCK_MATL] = useState(
        emptyEDT_KSV_STOCK_MATL,
    );

    const onInputChangeEDT_KSV_STOCK_MATL_MATL_NAME = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_STOCK_MATL = { ...dataEDT_KSV_STOCK_MATL };

        let tTypeVal = _dataEDT_KSV_STOCK_MATL[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_STOCK_MATL[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_STOCK_MATL[`${name}`] = parseInt(val);

        setDataEDT_KSV_STOCK_MATL(_dataEDT_KSV_STOCK_MATL);
    };

    const onInputChangeEDT_KSV_STOCK_MATL_COLOR = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_STOCK_MATL = { ...dataEDT_KSV_STOCK_MATL };

        let tTypeVal = _dataEDT_KSV_STOCK_MATL[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_STOCK_MATL[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_STOCK_MATL[`${name}`] = parseInt(val);

        setDataEDT_KSV_STOCK_MATL(_dataEDT_KSV_STOCK_MATL);
    };

    const onInputChangeEDT_KSV_STOCK_MATL_MATL_CD = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_STOCK_MATL = { ...dataEDT_KSV_STOCK_MATL };

        let tTypeVal = _dataEDT_KSV_STOCK_MATL[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_STOCK_MATL[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_STOCK_MATL[`${name}`] = parseInt(val);

        setDataEDT_KSV_STOCK_MATL(_dataEDT_KSV_STOCK_MATL);
    };

    const onInputChangeEDT_KSV_STOCK_MATL_SPEC = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_STOCK_MATL = { ...dataEDT_KSV_STOCK_MATL };

        let tTypeVal = _dataEDT_KSV_STOCK_MATL[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_STOCK_MATL[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_STOCK_MATL[`${name}`] = parseInt(val);

        setDataEDT_KSV_STOCK_MATL(_dataEDT_KSV_STOCK_MATL);
    };

    const onInputChangeEDT_KSV_STOCK_MATL_VENDOR_NAME = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_STOCK_MATL = { ...dataEDT_KSV_STOCK_MATL };

        let tTypeVal = _dataEDT_KSV_STOCK_MATL[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_STOCK_MATL[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_STOCK_MATL[`${name}`] = parseInt(val);

        setDataEDT_KSV_STOCK_MATL(_dataEDT_KSV_STOCK_MATL);
    };

    const onCheckboxChangeEDT_KSV_STOCK_MATL_IS_UNUSABLE = (e, name) => {
        let val = "";
        let _dataEDT_KSV_STOCK_MATL = { ...dataEDT_KSV_STOCK_MATL };
        if (e.checked) {
            val = "1";
        } else {
            val = "0";
        }
        _dataEDT_KSV_STOCK_MATL[`${name}`] = val;
        setDataEDT_KSV_STOCK_MATL(_dataEDT_KSV_STOCK_MATL);
    };

    const [
        datasEDT_KSV_STOCK_MATL_STOCK_REMARK,
        setDatasEDT_KSV_STOCK_MATL_STOCK_REMARK,
    ] = useState([]);
    const [
        dataEDT_KSV_STOCK_MATL_STOCK_REMARK,
        setDataEDT_KSV_STOCK_MATL_STOCK_REMARK,
    ] = useState({});

    const onDropdownChangeEDT_KSV_STOCK_MATL_STOCK_REMARK = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataEDT_KSV_STOCK_MATL = { ...dataEDT_KSV_STOCK_MATL };

        let tTypeVal = _dataEDT_KSV_STOCK_MATL[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_KSV_STOCK_MATL[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_KSV_STOCK_MATL[`${name}`] = parseInt(val);
        }

        setDataEDT_KSV_STOCK_MATL(_dataEDT_KSV_STOCK_MATL);
        setDataEDT_KSV_STOCK_MATL_STOCK_REMARK(e.value);
    };

    useEffect(() => {
        var _tObj = {};
        _tObj.PO_CD = "";
        _tObj.FACTORY_CD = "";

        serviceS0511_STOCK_RECORD.mgrQuery_CODE(_tObj).then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                console.log(
                    "ServiceMgrKCD_BUYER.mgr1KcdStyle call => " +
                        data.FACTORY_CD.length,
                );

                setDatasQRY_KSV_STOCK_MATL_FACTORY_CD(data.FACTORY_CD);
                setDataQRY_KSV_STOCK_MATL_FACTORY_CD(data.FACTORY_CD[0]);

                setDatasQRY_KSV_STOCK_MATL_ORDER_CD(data.ORDER_CD);
                setDataQRY_KSV_STOCK_MATL_ORDER_CD(data.ORDER_CD[0]);

                setDatasQRY_KSV_STOCK_MATL_BUYER_CD([]);

                setDatasEDT_KSV_STOCK_MATL_STOCK_REMARK(data.STOCK_REMARK);
                setDataEDT_KSV_STOCK_MATL_STOCK_REMARK(data.STOCK_REMARK[0]);
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

    return (
        <div>
            <div
                style={{
                    marginLeft: "1rem",
                    marginTop: "1rem",
                    width: "100rem",
                    height: "3rem",
                }}
            >
                <span
                    style={{
                        marginLeft: "0.5rem",
                        height: "2rem",
                        display: "inline-block",
                        width: "33rem",
                    }}
                >
                    <p style={{ width: "8rem", display: "inline-block" }}>Factory</p>
                    <div
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "23rem",
                        }}
                    >
                        <Dropdown
                            id="id_FACTORY_CD"
                            value={dataQRY_KSV_STOCK_MATL_FACTORY_CD}
                            onChange={(e) =>
                                onDropdownChangeQRY_KSV_STOCK_MATL_FACTORY_CD(
                                    e,
                                    "FACTORY_CD",
                                )
                            }
                            options={datasQRY_KSV_STOCK_MATL_FACTORY_CD}
                            optionLabel="FACTORY_NAME"
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
                        width: "13rem",
                    }}
                >
                    <p style={{ width: "4rem", display: "inline-block" }}>Po</p>
                    <InputText
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "8rem",
                        }}
                        id="id_PO_SEQ"
                        value={dataQRY_KSV_STOCK_MATL.PO_CD}
                        onChange={(e) =>
                            onInputChangeQRY_KSV_STOCK_MATL_PO_CD(e, "PO_CD")
                        }
                        onKeyPress={(e) =>
                            onKeyPressQRY_KSV_STOCK_MATL_PO_CD(e)
                        }
                    />
                </span>
                <span
                    style={{
                        marginLeft: "0.5rem",
                        height: "2rem",
                        display: "inline-block",
                        width: "16rem",
                    }}
                >
                    <p style={{ width: "7rem", display: "inline-block" }}>Order</p>
                    <div
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "8rem",
                        }}
                    >
                        <Dropdown
                            id="id_ORDER_CD"
                            value={dataQRY_KSV_STOCK_MATL_ORDER_CD}
                            onChange={(e) =>
                                onDropdownChangeQRY_KSV_STOCK_MATL_ORDER_CD(
                                    e,
                                    "ORDER_CD",
                                )
                            }
                            options={datasQRY_KSV_STOCK_MATL_ORDER_CD}
                            optionLabel="ORDER_CD"
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
                    <p style={{ width: "8rem", display: "inline-block" }}>Buyer</p>
                    <div
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "23rem",
                        }}
                    >
                        <Dropdown
                            id="id_BUYER_CD"
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
                            editable
                        ></Dropdown>
                    </div>
                </span>
                <span
                    style={{
                        marginLeft: "0.5rem",
                        height: "2rem",
                        display: "inline-block",
                        width: "14rem",
                    }}
                >
                    <p style={{ width: "8rem", display: "inline-block" }}>Po Seq</p>
                    <InputText
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "5rem",
                        }}
                        id="id_PO_SEQ"
                        value={dataQRY_KSV_STOCK_MATL.PO_SEQ}
                        onChange={(e) =>
                            onInputChangeQRY_KSV_STOCK_MATL_PO_SEQ(e, "PO_SEQ")
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
                    <p style={{ width: "8rem", display: "inline-block" }}>Status</p>
                    <div
                        style={{
                            marginLeft: "0.5rem",
                            display: "inline-block",
                            width: "23rem",
                        }}
                    >
                        <Dropdown
                            id="id_STATUS_CD"
                            value={dataQRY_KSV_STOCK_MATL_STATUS_CD}
                            onChange={(e) =>
                                onDropdownChangeQRY_KSV_STOCK_MATL_STATUS_CD(
                                    e,
                                    "STATUS_CD",
                                )
                            }
                            options={datasQRY_KSV_STOCK_MATL_STATUS_CD}
                            optionLabel="CD_NAME"
                            placeholder=""
                            editable
                            disabled
                        ></Dropdown>
                    </div>
                </span>
                <span style={{ display: "inline-block", marginLeft: "30rem" }}>
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
                        onClick={search_LIST_STOCK}
                    />

                    <Button
                        label="Excel"
                        style={{ height: "1.1rem", color: "green" }}
                        icon="pi pi-upload"
                        className="p-button-text"
                        onClick={exportExcelTBL_KSV_STOCK_MATL}
                    />
                </span>
            </div>
            <div style={{ width: "100rem", height: "2rem" }}></div>

            <div
                style={{
                    marginLeft: "1rem",
                    marginTop: "0.5rem",
                    width: "99rem",
                    height: "20rem",
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
                    virtualScrollerOptions={{ itemSize: 9 }}
                    emptyMessage=" " //header={headerTBL_KSV_STOCK_MATL}
                    responsiveLayout="scroll"
                    scrollable
                    scrollHeight="18rem"
                >
                    <AFColumn field="MATL_CD" headerClassName="t-header" header="Matl Cd" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="MATL_NAME" headerClassName="t-header" header="Description" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="COLOR" headerClassName="t-header" header="Color" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="SPEC" headerClassName="t-header" header="Spec" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="UNIT" headerClassName="t-header" header="Unit" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="STOCK_QTY" headerClassName="t-header" header="Stock Qty" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="RACK" headerClassName="t-header" header="Rack" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="LOCATION" headerClassName="t-header" header="Location" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="REMARK" headerClassName="t-header" header="Remark" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="VENDOR_NAME" headerClassName="t-header" header="Supplier" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                </AFDataTable>
            </div>

            <div
                style={{
                    marginLeft: "1rem",
                    marginTop: "0.5rem",
                    width: "99rem",
                    height: "24rem",
                }}
            >
                <div>
                    <span
                        style={{
                            marginLeft: "0.5rem",
                            height: "2rem",
                            display: "inline-block",
                            width: "28rem",
                        }}
                    >
                        <p style={{ width: "8rem", display: "inline-block" }}>Description</p>
                        <InputText
                            style={{
                                marginLeft: "0.5rem",
                                display: "inline-block",
                                width: "18rem",
                            }}
                            id="id_MATL_NAME"
                            value={dataEDT_KSV_STOCK_MATL.MATL_NAME}
                            onChange={(e) =>
                                onInputChangeEDT_KSV_STOCK_MATL_MATL_NAME(
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
                            width: "13rem",
                        }}
                    >
                        <p style={{ width: "4rem", display: "inline-block" }}>Color</p>
                        <InputText
                            style={{
                                marginLeft: "0.5rem",
                                display: "inline-block",
                                width: "8rem",
                            }}
                            id="id_COLOR"
                            value={dataEDT_KSV_STOCK_MATL.COLOR}
                            onChange={(e) =>
                                onInputChangeEDT_KSV_STOCK_MATL_COLOR(
                                    e,
                                    "COLOR",
                                )
                            }
                        />
                    </span>
                    <span
                        style={{
                            marginLeft: "0.5rem",
                            height: "2rem",
                            display: "inline-block",
                            width: "12rem",
                        }}
                    >
                        <p style={{ width: "6rem", display: "inline-block" }}>Matl Cd</p>
                        <InputText
                            style={{
                                marginLeft: "0.5rem",
                                display: "inline-block",
                                width: "5rem",
                            }}
                            id="id_MATL_CD"
                            value={dataEDT_KSV_STOCK_MATL.MATL_CD}
                            onChange={(e) =>
                                onInputChangeEDT_KSV_STOCK_MATL_MATL_CD(
                                    e,
                                    "MATL_CD",
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
                        <p style={{ width: "8rem", display: "inline-block" }}>Unusable</p>
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
                                id="id_IS_UNUSABLE"
                                checked={changeCheckBoxVal(
                                    dataEDT_KSV_STOCK_MATL.IS_UNUSABLE,
                                )}
                                onChange={(e) =>
                                    onCheckboxChangeEDT_KSV_STOCK_MATL_IS_UNUSABLE(
                                        e,
                                        "IS_UNUSABLE",
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
                            width: "28rem",
                        }}
                    >
                        <p style={{ width: "8rem", display: "inline-block" }}>Stock Remark</p>
                        <div
                            style={{
                                marginLeft: "0.5rem",
                                display: "inline-block",
                                width: "18rem",
                            }}
                        >
                            <Dropdown
                                id="id_STOCK_REMARK"
                                value={dataEDT_KSV_STOCK_MATL_STOCK_REMARK}
                                onChange={(e) =>
                                    onDropdownChangeEDT_KSV_STOCK_MATL_STOCK_REMARK(
                                        e,
                                        "STOCK_REMARK",
                                    )
                                }
                                options={datasEDT_KSV_STOCK_MATL_STOCK_REMARK}
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
                            width: "25rem",
                        }}
                    >
                        <p style={{ width: "8rem", display: "inline-block" }}>Spec</p>
                        <InputText
                            style={{
                                marginLeft: "0.5rem",
                                display: "inline-block",
                                width: "15rem",
                            }}
                            id="id_SPEC"
                            value={dataEDT_KSV_STOCK_MATL.SPEC}
                            onChange={(e) =>
                                onInputChangeEDT_KSV_STOCK_MATL_SPEC(e, "SPEC")
                            }
                        />
                    </span>
                    <span
                        style={{
                            marginLeft: "0.5rem",
                            height: "2rem",
                            display: "inline-block",
                            width: "25rem",
                        }}
                    >
                        <p style={{ width: "8rem", display: "inline-block" }}>Supplier</p>
                        <InputText
                            style={{
                                marginLeft: "0.5rem",
                                display: "inline-block",
                                width: "15rem",
                            }}
                            id="id_VENDOR_NAME"
                            value={dataEDT_KSV_STOCK_MATL.VENDOR_NAME}
                            onChange={(e) =>
                                onInputChangeEDT_KSV_STOCK_MATL_VENDOR_NAME(
                                    e,
                                    "VENDOR_NAME",
                                )
                            }
                        />
                    </span>
                    <span style={{ display: "inline-block" }}>
                        <Button
                            label="Matl Query"
                            style={{ height: "1.1rem" }}
                            className="p-button-text"
                            onClick={search_LIST_MATL}
                        />
                    </span>

                    <span
                        style={{ display: "inline-block", marginLeft: "20rem" }}
                    >
                        <Button
                            label="Matl Reset"
                            style={{ height: "1.1rem" }}
                            className="p-button-text"
                            onClick={searchTBL_KSV_STOCK_MATL1}
                        />

                        <Button
                            label="Matl Add"
                            style={{ height: "1.1rem" }}
                            className="p-button-text"
                            onClick={blankFn}
                        />
                    </span>
                </div>
                <div>
                    <AFDataTable preventUnrelatedRerender
                        ref={dt_TBL_KSV_STOCK_MATL1}
                        size="small"
                        value={datasTBL_KSV_STOCK_MATL1}
                        resizableColumns
                        columnResizeMode="fit"
                        showGridlines
                        selectionMode="checkbox"
                        selection={selectedTBL_KSV_STOCK_MATL1}
                        onSelectionChange={(e) => {
                            setFlagSelectModeTBL_KSV_STOCK_MATL1(true);
                            setSelectedTBL_KSV_STOCK_MATL1(e.value);
                            console.log(
                                "selected length:" +
                                    selectedTBL_KSV_STOCK_MATL1.length,
                            );
                            onRowClick1TBL_KSV_STOCK_MATL1(e.value);
                        }}
                        onRowClick={onRowClickTBL_KSV_STOCK_MATL1}
                        dataKey="id"
                        className="datatable-responsive"
                        virtualScrollerOptions={{ itemSize: 9 }}
                        emptyMessage=" " //header={headerTBL_KSV_STOCK_MATL1}
                        responsiveLayout="scroll"
                        scrollable
                        scrollHeight="18rem"
                    >
                        <AFColumn field="MATL_CD" headerClassName="t-header" header="Matl Cd" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                        <AFColumn field="MATL_NAME" headerClassName="t-header" header="Description" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                        <AFColumn field="COLOR" headerClassName="t-header" header="Color" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                        <AFColumn field="SPEC" headerClassName="t-header" header="Spec" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                        <AFColumn field="UNIT" headerClassName="t-header" header="Unit" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                        <AFColumn field="STOCK_QTY" headerClassName="t-header" header="Stock Qty" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                        <AFColumn field="RACK" headerClassName="t-header" header="Rack" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                        <AFColumn field="LOCATION" headerClassName="t-header" header="Location" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                        <AFColumn field="REMARK" headerClassName="t-header" header="Remark" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                        <AFColumn field="VENDOR_NAME" headerClassName="t-header" header="Supplier" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    </AFDataTable>
                </div>
            </div>

            <div
                style={{
                    marginLeft: "1rem",
                    marginTop: "1rem",
                    width: "99rem",
                    height: "18rem",
                }}
            >
                <AFDataTable preventUnrelatedRerender
                    ref={dt_TBL_KSV_STOCK_MATL2}
                    size="small"
                    value={datasTBL_KSV_STOCK_MATL2}
                    resizableColumns
                    columnResizeMode="fit"
                    showGridlines
                    selectionMode="checkbox"
                    selection={selectedTBL_KSV_STOCK_MATL2}
                    onSelectionChange={(e) => {
                        setFlagSelectModeTBL_KSV_STOCK_MATL2(true);
                        setSelectedTBL_KSV_STOCK_MATL2(e.value);
                        console.log(
                            "selected length:" +
                                selectedTBL_KSV_STOCK_MATL2.length,
                        );
                        onRowClick1TBL_KSV_STOCK_MATL2(e.value);
                    }}
                    onRowClick={onRowClickTBL_KSV_STOCK_MATL2}
                    dataKey="id"
                    className="datatable-responsive"
                    virtualScrollerOptions={{ itemSize: 8 }}
                    emptyMessage=" " //eader={headerTBL_KSV_STOCK_MATL2}
                    responsiveLayout="scroll"
                    scrollable
                    scrollHeight="16rem"
                >
                    <AFColumn field="MATL_CD" headerClassName="t-header" header="Matl Cd" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="ORDER_CD" headerClassName="t-header" header="Order" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="MATL_NAME" headerClassName="t-header" header="Description" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="COLOR" headerClassName="t-header" header="Color" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="SPEC" headerClassName="t-header" header="Spec" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="UNIT" headerClassName="t-header" header="Unit" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="STOCK_QTY" headerClassName="t-header" header="Stock Qty" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="REMAIN_QTY" headerClassName="t-header" header="Remain Qty" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="STATUS" headerClassName="t-header" header="Stat" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="RACK" headerClassName="t-header" header="Rack" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="LOCATION" headerClassName="t-header" header="Location" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="REMARK" headerClassName="t-header" header="Remark" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="REMARK0" headerClassName="t-header" header="Remark0" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="VENDOR_NAME" headerClassName="t-header" header="Supplier" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="STOCK_IDX" headerClassName="t-header" header="Stock.Idx" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="ROOT_IDX" headerClassName="t-header" header="Root.Idx" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
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
                            onClick={process_MOVE_STOCK}
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

export default React.memo(S0511_STOCK_RECORD, comparisonFn);
