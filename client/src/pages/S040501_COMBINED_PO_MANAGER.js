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
import { ServiceS040501_COMBINED_PO_MANAGER } from "../service/service_biz/ServiceS040501_COMBINED_PO_MANAGER";

import "./page_common.scss";

const emptyKCD_CODE = {
    id: 0,
    CD_GROUP: "",
    CD_CODE: "",
    CD_NAME: "",
    CD_FLAG: "",
};

const emptyQRY_KSV_PO_MRP = {
    VENDOR_CD: "",
    BUYER_CD: "",
    FACTORY_CD: "",
    S_DATE: "",
    E_DATE: "",
    IS_COMBINE: "",
};

const emptyQRY_KSV_PO_MRP1 = {
    VENDOR_CD: "",
    BUYER_CD: "",
    PU_NO: "",
    S_DATE: "",
    E_DATE: "",
};

const emptyTBL_KSV_PO_MEM = {
    id: 0,
    BUYER_NAME: "",
    BUYER_CD: "",
    PO_CD: "",
    PO_SEQ: "",
    VENDOR_NAME: "",
    PU_CD: "",
    BUYER_NAME: "",
    BUYER_CD: "",
    FACTORY_CD: "",
};

const emptyTBL_KSV_PO_MEM1 = {
    id: 0,
    PO_CD: "",
    PO_SEQ: "",
    ORDER_CD: "",
    MATL_CD: "",
    VENDOR_NAME: "",
    MATL_NAME: "",
    COLOR: "",
    SPEC: "",
    UNIT: "",
    PO_QTY: "",
    MRP_SEQ: "",
    VENDOR_CD: "",
};

const emptyTBL_KSV_PO_MEM2 = {
    id: 0,
    PU_NO: "",
    BUYER_NAME: "",
    VENDOR_NAME: "",
    PU_DATE: "",
    BUYER_CD: "",
    VENDOR_CD: "",
    FACTORY_CD: "",
};

const emptyTBL_KSV_PO_MEM3 = {
    id: 0,
    PO_CD: "",
    PO_SEQ: "",
    PU_CD: "",
};

const emptyTBL_KSV_PO_MEM4 = {
    id: 0,
    PO_CD: "",
    PO_SEQ: "",
    ORDER_CD: "",
    MATL_CD: "",
    VENDOR_NAME: "",
    MATL_NAME: "",
    COLOR: "",
    SPEC: "",
    UNIT: "",
    PO_QTY: "",
    MRP_SEQ: "",
    VENDOR_CD: "",
};

const S040501_COMBINED_PO_MANAGER = () => {
    const serviceLibRef = useRef(null);
    if (!serviceLibRef.current) {
        serviceLibRef.current = new ServiceLib();
        serviceLibRef.current.loginConfirm();
    }
    const serviceLib = serviceLibRef.current;
    const serviceS040501_COMBINED_PO_MANAGER =
        new ServiceS040501_COMBINED_PO_MANAGER();

    const toast = useRef(null);

    /* splitter 관련 */
    const [styleVal, setStyleVal] = useState({ width: "65vw" });

    /* QRY KSV_PO_MRP*/
    const [dataQRY_KSV_PO_MRP, setDataQRY_KSV_PO_MRP] =
        useState(emptyQRY_KSV_PO_MRP);

    const [datasQRY_KSV_PO_MRP_VENDOR_CD, setDatasQRY_KSV_PO_MRP_VENDOR_CD] =
        useState([]);
    const [dataQRY_KSV_PO_MRP_VENDOR_CD, setDataQRY_KSV_PO_MRP_VENDOR_CD] =
        useState({});

    const onDropdownChangeQRY_KSV_PO_MRP_VENDOR_CD = (e, name) => {
        let val = (e.value && e.value.VENDOR_CD) || "";

        let _dataQRY_KSV_PO_MRP = { ...dataQRY_KSV_PO_MRP };

        let tTypeVal = _dataQRY_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_PO_MRP[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_PO_MRP[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_PO_MRP(_dataQRY_KSV_PO_MRP);
        setDataQRY_KSV_PO_MRP_VENDOR_CD(e.value);
    };

    const [datasQRY_KSV_PO_MRP_BUYER_CD, setDatasQRY_KSV_PO_MRP_BUYER_CD] =
        useState([]);
    const [dataQRY_KSV_PO_MRP_BUYER_CD, setDataQRY_KSV_PO_MRP_BUYER_CD] =
        useState({});

    const onDropdownChangeQRY_KSV_PO_MRP_BUYER_CD = (e, name) => {
        let val = (e.value && e.value.BUYER_CD) || "";

        let _dataQRY_KSV_PO_MRP = { ...dataQRY_KSV_PO_MRP };

        let tTypeVal = _dataQRY_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_PO_MRP[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_PO_MRP[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_PO_MRP(_dataQRY_KSV_PO_MRP);
        setDataQRY_KSV_PO_MRP_BUYER_CD(e.value);
    };

    const [datasQRY_KSV_PO_MRP_FACTORY_CD, setDatasQRY_KSV_PO_MRP_FACTORY_CD] =
        useState([]);
    const [dataQRY_KSV_PO_MRP_FACTORY_CD, setDataQRY_KSV_PO_MRP_FACTORY_CD] =
        useState({});

    const onDropdownChangeQRY_KSV_PO_MRP_FACTORY_CD = (e, name) => {
        let val = (e.value && e.value.FACTORY_CD) || "";

        let _dataQRY_KSV_PO_MRP = { ...dataQRY_KSV_PO_MRP };

        let tTypeVal = _dataQRY_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_PO_MRP[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_PO_MRP[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_PO_MRP(_dataQRY_KSV_PO_MRP);
        setDataQRY_KSV_PO_MRP_FACTORY_CD(e.value);
    };

    const onCalChangeQRY_KSV_PO_MRP_S_DATE = (e, name) => {
        let val1 = e.value || "";
        let val = "";
        if (val1 === "") {
            val = "";
        } else {
            val = getDateVal(val1);
        }

        let _dataQRY_KSV_PO_MRP = { ...dataQRY_KSV_PO_MRP };
        _dataQRY_KSV_PO_MRP[`${name}`] = val;
        setDataQRY_KSV_PO_MRP(_dataQRY_KSV_PO_MRP);
    };

    const onCalChangeQRY_KSV_PO_MRP_E_DATE = (e, name) => {
        let val1 = e.value || "";
        let val = "";
        if (val1 === "") {
            val = "";
        } else {
            val = getDateVal(val1);
        }

        let _dataQRY_KSV_PO_MRP = { ...dataQRY_KSV_PO_MRP };
        _dataQRY_KSV_PO_MRP[`${name}`] = val;
        setDataQRY_KSV_PO_MRP(_dataQRY_KSV_PO_MRP);
    };

    const onCheckboxChangeQRY_KSV_PO_MRP_IS_COMBINE = (e, name) => {
        let val = "";
        let _dataQRY_KSV_PO_MRP = { ...dataQRY_KSV_PO_MRP };
        if (e.checked) {
            val = "1";
        } else {
            val = "0";
        }
        _dataQRY_KSV_PO_MRP[`${name}`] = val;
        setDataQRY_KSV_PO_MRP(_dataQRY_KSV_PO_MRP);
    };

    /* QRY KSV_PO_MRP1*/
    const [dataQRY_KSV_PO_MRP1, setDataQRY_KSV_PO_MRP1] =
        useState(emptyQRY_KSV_PO_MRP1);

    const [datasQRY_KSV_PO_MRP1_VENDOR_CD, setDatasQRY_KSV_PO_MRP1_VENDOR_CD] =
        useState([]);
    const [dataQRY_KSV_PO_MRP1_VENDOR_CD, setDataQRY_KSV_PO_MRP1_VENDOR_CD] =
        useState({});

    const onDropdownChangeQRY_KSV_PO_MRP1_VENDOR_CD = (e, name) => {
        let val = (e.value && e.value.VENDOR_CD) || "";

        let _dataQRY_KSV_PO_MRP1 = { ...dataQRY_KSV_PO_MRP1 };

        let tTypeVal = _dataQRY_KSV_PO_MRP1[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_PO_MRP1[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_PO_MRP1[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_PO_MRP1(_dataQRY_KSV_PO_MRP1);
        setDataQRY_KSV_PO_MRP1_VENDOR_CD(e.value);
    };

    const [datasQRY_KSV_PO_MRP1_BUYER_CD, setDatasQRY_KSV_PO_MRP1_BUYER_CD] =
        useState([]);
    const [dataQRY_KSV_PO_MRP1_BUYER_CD, setDataQRY_KSV_PO_MRP1_BUYER_CD] =
        useState({});

    const onDropdownChangeQRY_KSV_PO_MRP1_BUYER_CD = (e, name) => {
        let val = (e.value && e.value.BUYER_CD) || "";

        let _dataQRY_KSV_PO_MRP1 = { ...dataQRY_KSV_PO_MRP1 };

        let tTypeVal = _dataQRY_KSV_PO_MRP1[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_PO_MRP1[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_PO_MRP1[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_PO_MRP1(_dataQRY_KSV_PO_MRP1);
        setDataQRY_KSV_PO_MRP1_BUYER_CD(e.value);
    };

    const [datasQRY_KSV_PO_MRP1_PU_NO, setDatasQRY_KSV_PO_MRP1_PU_NO] =
        useState([]);
    const [dataQRY_KSV_PO_MRP1_PU_NO, setDataQRY_KSV_PO_MRP1_PU_NO] = useState(
        {},
    );

    const onDropdownChangeQRY_KSV_PO_MRP1_PU_NO = (e, name) => {
        let val = (e.value && e.value.PU_CD) || "";

        let _dataQRY_KSV_PO_MRP1 = { ...dataQRY_KSV_PO_MRP1 };

        let tTypeVal = _dataQRY_KSV_PO_MRP1[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_PO_MRP1[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_PO_MRP1[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_PO_MRP1(_dataQRY_KSV_PO_MRP1);
        setDataQRY_KSV_PO_MRP1_PU_NO(e.value);
    };

    const onCalChangeQRY_KSV_PO_MRP1_S_DATE = (e, name) => {
        let val1 = e.value || "";
        let val = "";
        if (val1 === "") {
            val = "";
        } else {
            val = getDateVal(val1);
        }

        let _dataQRY_KSV_PO_MRP1 = { ...dataQRY_KSV_PO_MRP1 };
        _dataQRY_KSV_PO_MRP1[`${name}`] = val;
        setDataQRY_KSV_PO_MRP1(_dataQRY_KSV_PO_MRP1);
    };

    const onCalChangeQRY_KSV_PO_MRP1_E_DATE = (e, name) => {
        let val1 = e.value || "";
        let val = "";
        if (val1 === "") {
            val = "";
        } else {
            val = getDateVal(val1);
        }

        let _dataQRY_KSV_PO_MRP1 = { ...dataQRY_KSV_PO_MRP1 };
        _dataQRY_KSV_PO_MRP1[`${name}`] = val;
        setDataQRY_KSV_PO_MRP1(_dataQRY_KSV_PO_MRP1);
    };

    /**TABLE KSV_PO_MEM */
    // DEFINE DATAGRID : TBL_KSV_PO_MEM
    const [datasTBL_KSV_PO_MEM, setDatasTBL_KSV_PO_MEM] = useState([]);
    const dt_TBL_KSV_PO_MEM = useRef(null);
    const [dataTBL_KSV_PO_MEM, setDataTBL_KSV_PO_MEM] =
        useState(emptyTBL_KSV_PO_MEM);
    const [selectedTBL_KSV_PO_MEM, setSelectedTBL_KSV_PO_MEM] = useState([]);
    const [flagSelectModeTBL_KSV_PO_MEM, setFlagSelectModeTBL_KSV_PO_MEM] =
        useState(false);

    // DATAGRID CODE : TBL_KSV_PO_MEM

    const onRowClick1TBL_KSV_PO_MEM = (argData0) => {
        var argData = {};

        if (typeof argData0.length !== "undefined") {
            argData = argData0[0];
        } else {
            argData = argData0;
        }

        let argTBL_KSV_PO_MEM = argData;

        setDataTBL_KSV_PO_MEM(argTBL_KSV_PO_MEM);

        var _tObj = {};
        _tObj.PO_CD = argData.PO_CD;
        _tObj.PO_SEQ = argData.PO_SEQ;
        _tObj.VENDOR_CD = argData.VENDOR_CD;
        serviceS040501_COMBINED_PO_MANAGER
            .mgrQueryTBL_KSV_PO_MST(_tObj)
            .then((data) => {
                if (typeof data.graphQLErrors === "undefined") {
                    console.log(
                        "serviceS040501_COMBINED_PO_MANAGER.mgrQuery_PU_POOL call => " +
                            data.length,
                    );
                    var tArray = data.map((col, i) => {
                        var tObj = { ...col };
                        tObj.id = i + 1;
                        return tObj;
                    });
                    setDatasTBL_KSV_PO_MEM1(tArray);
                } else {
                    console.log(
                        "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });
    };

    const onRowClickTBL_KSV_PO_MEM = (event) => {
        let argTBL_KSV_PO_MEM = event.data;
        if (flagSelectModeTBL_KSV_PO_MEM) return;

        // Service : NawooAll:mgrQueryTBL_KSV_PO_MEM
    };

    const searchTBL_KSV_PO_MEM = () => {
        clearSelectedTBL_KSV_PO_MEM();

        // serviceS040501_COMBINED_PO_MANAGER.mgrQueryTBL_KSV_PO_MEM(dataQRY_KSV_PO_MEM).then(data => {
        //     if (typeof data.graphQLErrors === 'undefined') {
        //         console.log("ServiceNawooAll.mgrQueryTBL_KSV_PO_MEM() call => " + data.length);
        //         setDatasTBL_KSV_PO_MEM(data);
        //     } else {
        //         // var tStr = data.graphQLErrors[0].message;
        //         console.log("ServiceNawooAll.mgrQueryTBL_KSV_PO_MEM()error => " + JSON.stringify(data.graphQLErrors));
        //
        //     }
        // });

        // Service : NawooAll:mgrQueryTBL_KSV_PO_MEM
    };

    const clearSelectedTBL_KSV_PO_MEM = () => {
        setSelectedTBL_KSV_PO_MEM([]);
        setFlagSelectModeTBL_KSV_PO_MEM(false);
    };

    const exportExcelTBL_KSV_PO_MEM = () => {};

    /***TABLE KSV_PO_MEM1 */

    // DEFINE DATAGRID : TBL_KSV_PO_MEM1
    const [datasTBL_KSV_PO_MEM1, setDatasTBL_KSV_PO_MEM1] = useState([]);
    const dt_TBL_KSV_PO_MEM1 = useRef(null);
    const [dataTBL_KSV_PO_MEM1, setDataTBL_KSV_PO_MEM1] =
        useState(emptyTBL_KSV_PO_MEM1);
    const [selectedTBL_KSV_PO_MEM1, setSelectedTBL_KSV_PO_MEM1] = useState([]);
    const [flagSelectModeTBL_KSV_PO_MEM1, setFlagSelectModeTBL_KSV_PO_MEM1] =
        useState(false);

    // DATAGRID CODE : TBL_KSV_PO_MEM1

    const onRowClick1TBL_KSV_PO_MEM1 = (argData0) => {
        var argData = {};

        if (typeof argData0.length !== "undefined") {
            argData = argData0[0];
        } else {
            argData = argData0;
        }

        let argTBL_KSV_PO_MEM1 = argData;

        setDataTBL_KSV_PO_MEM1(argTBL_KSV_PO_MEM1);
    };

    const onRowClickTBL_KSV_PO_MEM1 = (event) => {
        let argTBL_KSV_PO_MEM1 = event.data;
        if (flagSelectModeTBL_KSV_PO_MEM1) return;

        // Service : NawooAll:mgrQueryTBL_KSV_PO_MEM1
    };

    /**TABLE KSV_PO_MEM2 */
    // DEFINE DATAGRID : TBL_KSV_PO_MEM2
    const [datasTBL_KSV_PO_MEM2, setDatasTBL_KSV_PO_MEM2] = useState([]);
    const dt_TBL_KSV_PO_MEM2 = useRef(null);
    const [dataTBL_KSV_PO_MEM2, setDataTBL_KSV_PO_MEM2] =
        useState(emptyTBL_KSV_PO_MEM2);
    const [selectedTBL_KSV_PO_MEM2, setSelectedTBL_KSV_PO_MEM2] = useState([]);
    const [flagSelectModeTBL_KSV_PO_MEM2, setFlagSelectModeTBL_KSV_PO_MEM2] =
        useState(false);

    // DATAGRID CODE : TBL_KSV_PO_MEM2

    const onRowClick1TBL_KSV_PO_MEM2 = (argData0) => {
        var argData = {};

        if (typeof argData0.length !== "undefined") {
            argData = argData0[0];
        } else {
            argData = argData0;
        }

        let argTBL_KSV_PO_MEM2 = argData;

        setDataTBL_KSV_PO_MEM2(argTBL_KSV_PO_MEM2);

        var _tObj = {};
        _tObj.PU_CD = argData.PU_CD;
        serviceS040501_COMBINED_PO_MANAGER
            .mgrQuery_PU_MEM(_tObj)
            .then((data) => {
                if (typeof data.graphQLErrors === "undefined") {
                    console.log(
                        "serviceS040501_COMBINED_PO_MANAGER.mgrQuery_PU_POOL call => " +
                            data.length,
                    );
                    var tArray = data.map((col, i) => {
                        var tObj = { ...col };
                        tObj.id = i + 1;
                        return tObj;
                    });
                    setDatasTBL_KSV_PO_MEM3(tArray);
                } else {
                    console.log(
                        "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });
    };

    const onRowClickTBL_KSV_PO_MEM2 = (event) => {
        let argTBL_KSV_PO_MEM2 = event.data;
        if (flagSelectModeTBL_KSV_PO_MEM2) return;

        // Service : NawooAll:mgrQueryTBL_KSV_PO_MEM2
    };

    /**TABLE KSV_PO_MEM3 */
    // DEFINE DATAGRID : TBL_KSV_PO_MEM3
    const [datasTBL_KSV_PO_MEM3, setDatasTBL_KSV_PO_MEM3] = useState([]);
    const dt_TBL_KSV_PO_MEM3 = useRef(null);
    const [dataTBL_KSV_PO_MEM3, setDataTBL_KSV_PO_MEM3] =
        useState(emptyTBL_KSV_PO_MEM3);
    const [selectedTBL_KSV_PO_MEM3, setSelectedTBL_KSV_PO_MEM3] = useState([]);
    const [flagSelectModeTBL_KSV_PO_MEM3, setFlagSelectModeTBL_KSV_PO_MEM3] =
        useState(false);

    // DATAGRID CODE : TBL_KSV_PO_MEM3

    const onRowClick1TBL_KSV_PO_MEM3 = (argData0) => {
        var argData = {};

        if (typeof argData0.length !== "undefined") {
            argData = argData0[0];
        } else {
            argData = argData0;
        }

        let argTBL_KSV_PO_MEM3 = argData;

        setDataTBL_KSV_PO_MEM3(argTBL_KSV_PO_MEM3);

        var _tObj = {};
        _tObj.PO_CD = argData.PO_CD;
        _tObj.PO_SEQ = argData.PO_SEQ;
        _tObj.VENDOR_CD = argData.VENDOR_CD;
        serviceS040501_COMBINED_PO_MANAGER
            .mgrQueryTBL_KSV_PO_MST(_tObj)
            .then((data) => {
                if (typeof data.graphQLErrors === "undefined") {
                    console.log(
                        "serviceS040501_COMBINED_PO_MANAGER.mgrQuery_PU_POOL call => " +
                            data.length,
                    );
                    var tArray = data.map((col, i) => {
                        var tObj = { ...col };
                        tObj.id = i + 1;
                        return tObj;
                    });
                    setDatasTBL_KSV_PO_MEM4(tArray);
                } else {
                    console.log(
                        "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });
    };

    const onRowClickTBL_KSV_PO_MEM3 = (event) => {
        let argTBL_KSV_PO_MEM3 = event.data;
        if (flagSelectModeTBL_KSV_PO_MEM3) return;

        // Service : NawooAll:mgrQueryTBL_KSV_PO_MEM3
    };

    /**TABLE KSV_PO_MEM4 */

    // DEFINE DATAGRID : TBL_KSV_PO_MEM4
    const [datasTBL_KSV_PO_MEM4, setDatasTBL_KSV_PO_MEM4] = useState([]);
    const dt_TBL_KSV_PO_MEM4 = useRef(null);
    const [dataTBL_KSV_PO_MEM4, setDataTBL_KSV_PO_MEM4] =
        useState(emptyTBL_KSV_PO_MEM4);
    const [selectedTBL_KSV_PO_MEM4, setSelectedTBL_KSV_PO_MEM4] = useState([]);
    const [flagSelectModeTBL_KSV_PO_MEM4, setFlagSelectModeTBL_KSV_PO_MEM4] =
        useState(false);

    // DATAGRID CODE : TBL_KSV_PO_MEM4

    const onRowClick1TBL_KSV_PO_MEM4 = (argData0) => {
        var argData = {};

        if (typeof argData0.length !== "undefined") {
            argData = argData0[0];
        } else {
            argData = argData0;
        }

        let argTBL_KSV_PO_MEM4 = argData;

        setDataTBL_KSV_PO_MEM4(argTBL_KSV_PO_MEM4);
    };

    const onRowClickTBL_KSV_PO_MEM4 = (event) => {
        let argTBL_KSV_PO_MEM4 = event.data;
        if (flagSelectModeTBL_KSV_PO_MEM4) return;

        // Service : NawooAll:mgrQueryTBL_KSV_PO_MEM4
    };

    useEffect(() => {
        var tObj = { ...emptyQRY_KSV_PO_MRP };

        serviceS040501_COMBINED_PO_MANAGER.mgrQuery_CODE(tObj).then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                console.log(
                    "ServiceMgrKCD_BUYER.mgr1KcdStyle call => " +
                        data.BUYER_CD.length,
                );
                setDatasQRY_KSV_PO_MRP_BUYER_CD(data.BUYER_CD);
                setDataQRY_KSV_PO_MRP_BUYER_CD(data.BUYER_CD[0]);

                setDatasQRY_KSV_PO_MRP_FACTORY_CD(data.FACTORY_CD);
                setDataQRY_KSV_PO_MRP_FACTORY_CD(data.FACTORY_CD[0]);

                setDatasQRY_KSV_PO_MRP_VENDOR_CD(data.VENDOR_CD);
                setDataQRY_KSV_PO_MRP_VENDOR_CD(data.VENDOR_CD[0]);

                setDatasQRY_KSV_PO_MRP1_BUYER_CD(data.BUYER_CD);
                setDataQRY_KSV_PO_MRP1_BUYER_CD(data.BUYER_CD[0]);

                setDatasQRY_KSV_PO_MRP1_VENDOR_CD(data.VENDOR_CD);
                setDataQRY_KSV_PO_MRP1_VENDOR_CD(data.VENDOR_CD[0]);

                setDatasQRY_KSV_PO_MRP1_PU_NO(data.PU_CD);
                setDataQRY_KSV_PO_MRP1_PU_NO(data.PU_CD[0]);
            } else {
                console.log(
                    "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });

        serviceS040501_COMBINED_PO_MANAGER
            .mgrQuery_PU_POOL(tObj)
            .then((data) => {
                if (typeof data.graphQLErrors === "undefined") {
                    console.log(
                        "serviceS040501_COMBINED_PO_MANAGER.mgrQuery_PU_POOL call => " +
                            data.length,
                    );
                    var tArray = data.map((col, i) => {
                        var tObj = { ...col };
                        tObj.id = i + 1;
                        return tObj;
                    });
                    setDatasTBL_KSV_PO_MEM(tArray);
                } else {
                    console.log(
                        "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });

        var tObj1 = { ...emptyQRY_KSV_PO_MRP1 };
        serviceS040501_COMBINED_PO_MANAGER
            .mgrQuery_PU_MST(tObj1)
            .then((data) => {
                if (typeof data.graphQLErrors === "undefined") {
                    console.log(
                        "serviceS040501_COMBINED_PO_MANAGER.mgrQuery_PU_MST call => " +
                            data.length,
                    );
                    var tArray = data.map((col, i) => {
                        var tObj = { ...col };
                        tObj.id = i + 1;
                        return tObj;
                    });
                    setDatasTBL_KSV_PO_MEM2(tArray);
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
            <div style={{ float: "left", width: "50rem" }}>
                <div
                    style={{
                        marginLeft: "1rem",
                        marginTop: "1rem",
                        width: "49rem",
                        height: "10rem",
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
                        <p style={{ width: "8rem", display: "inline-block" }}>Supplier</p>
                        <div
                            style={{
                                marginLeft: "0.5rem",
                                display: "inline-block",
                                width: "23rem",
                            }}
                        >
                            <Dropdown
                                id="id_VENDOR_CD"
                                value={dataQRY_KSV_PO_MRP_VENDOR_CD}
                                onChange={(e) =>
                                    onDropdownChangeQRY_KSV_PO_MRP_VENDOR_CD(
                                        e,
                                        "VENDOR_CD",
                                    )
                                }
                                options={datasQRY_KSV_PO_MRP_VENDOR_CD}
                                optionLabel="VENDOR_NAME"
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
                                value={dataQRY_KSV_PO_MRP_BUYER_CD}
                                onChange={(e) =>
                                    onDropdownChangeQRY_KSV_PO_MRP_BUYER_CD(
                                        e,
                                        "BUYER_CD",
                                    )
                                }
                                options={datasQRY_KSV_PO_MRP_BUYER_CD}
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
                                value={dataQRY_KSV_PO_MRP_FACTORY_CD}
                                onChange={(e) =>
                                    onDropdownChangeQRY_KSV_PO_MRP_FACTORY_CD(
                                        e,
                                        "FACTORY_CD",
                                    )
                                }
                                options={datasQRY_KSV_PO_MRP_FACTORY_CD}
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
                            width: "19rem",
                        }}
                    >
                        <p style={{ width: "8rem", display: "inline-block" }}>Date</p>
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
                                id="id_S_DATE"
                                value={changeDateVal(dataQRY_KSV_PO_MRP.S_DATE)}
                                onChange={(e) =>
                                    onCalChangeQRY_KSV_PO_MRP_S_DATE(
                                        e,
                                        "S_DATE",
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
                            width: "17rem",
                        }}
                    >
                        <p style={{ width: "1rem", display: "inline-block" }}>~</p>
                        <div
                            style={{
                                marginLeft: "1.5rem",
                                display: "inline-block",
                                width: "10rem",
                            }}
                        >
                            <Calendar
                                showButtonBar
                                dateFormat="yy-mm-dd"
                                id="id_E_DATE"
                                value={changeDateVal(dataQRY_KSV_PO_MRP.E_DATE)}
                                onChange={(e) =>
                                    onCalChangeQRY_KSV_PO_MRP_E_DATE(
                                        e,
                                        "E_DATE",
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
                            width: "33rem",
                        }}
                    >
                        <p style={{ width: "8rem", display: "inline-block" }}>include Combine</p>
                        <div
                            style={{
                                marginLeft: "0.5rem",
                                display: "inline-block",
                                width: "23rem",
                            }}
                        >
                            <Checkbox
                                style={{
                                    display: "inline-block",
                                    width: "20rem",
                                }}
                                id="id_IS_COMBINE"
                                checked={changeCheckBoxVal(
                                    dataQRY_KSV_PO_MRP.IS_COMBINE,
                                )}
                                onChange={(e) =>
                                    onCheckboxChangeQRY_KSV_PO_MRP_IS_COMBINE(
                                        e,
                                        "IS_COMBINE",
                                    )
                                }
                            />
                        </div>
                    </span>
                    <span style={{ display: "inline-block" }}>
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
                            onClick={searchTBL_KSV_PO_MEM}
                        />

                        <Button
                            label="Excel"
                            style={{ height: "1.1rem", color: "green" }}
                            icon="pi pi-upload"
                            className="p-button-text"
                            onClick={exportExcelTBL_KSV_PO_MEM}
                        />
                    </span>
                </div>

                <div
                    style={{
                        marginLeft: "1rem",
                        marginTop: "1rem",
                        width: "49rem",
                        height: "30rem",
                    }}
                >
                    <AFDataTable preventUnrelatedRerender
                        ref={dt_TBL_KSV_PO_MEM}
                        size="small"
                        value={datasTBL_KSV_PO_MEM}
                        resizableColumns
                        columnResizeMode="fit"
                        showGridlines
                        selectionMode="checkbox"
                        selection={selectedTBL_KSV_PO_MEM}
                        onSelectionChange={(e) => {
                            setFlagSelectModeTBL_KSV_PO_MEM(true);
                            setSelectedTBL_KSV_PO_MEM(e.value);
                            console.log(
                                "selected length:" +
                                    selectedTBL_KSV_PO_MEM.length,
                            );
                            onRowClick1TBL_KSV_PO_MEM(e.value);
                        }}
                        onRowClick={onRowClickTBL_KSV_PO_MEM}
                        dataKey="id"
                        className="datatable-responsive"
                        virtualScrollerOptions={{ itemSize: 14 }}
                        emptyMessage=" " //header={headerTBL_KSV_PO_MEM}
                        responsiveLayout="scroll"
                        scrollable
                        scrollHeight="28rem"
                    >
                        <AFColumn field="BUYER_NAME" header="Buyer" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                        <AFColumn field="BUYER_CD" header="Buyer Cd" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                        <AFColumn field="PO_CD" header="Po" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                        <AFColumn field="PO_SEQ" header="Seq" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                        <AFColumn field="VENDOR_NAME" header="Supplier" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                        <AFColumn field="PU_CD" header="Pu No" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                        <AFColumn field="BUYER_NAME" header="Buyer" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                        <AFColumn field="BUYER_CD" header="Buyer Cd" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                        <AFColumn field="FACTORY_CD" header="Factory" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    </AFDataTable>
                </div>

                <div
                    style={{
                        marginLeft: "1rem",
                        marginTop: "1rem",
                        width: "49rem",
                        height: "22rem",
                    }}
                >
                    <AFDataTable preventUnrelatedRerender
                        ref={dt_TBL_KSV_PO_MEM1}
                        size="small"
                        value={datasTBL_KSV_PO_MEM1}
                        resizableColumns
                        columnResizeMode="fit"
                        showGridlines
                        selectionMode="checkbox"
                        selection={selectedTBL_KSV_PO_MEM1}
                        onSelectionChange={(e) => {
                            setFlagSelectModeTBL_KSV_PO_MEM1(true);
                            setSelectedTBL_KSV_PO_MEM1(e.value);
                            console.log(
                                "selected length:" +
                                    selectedTBL_KSV_PO_MEM1.length,
                            );
                            onRowClick1TBL_KSV_PO_MEM1(e.value);
                        }}
                        onRowClick={onRowClickTBL_KSV_PO_MEM1}
                        dataKey="id"
                        className="datatable-responsive"
                        virtualScrollerOptions={{ itemSize: 9 }}
                        emptyMessage=" " //header={headerTBL_KSV_PO_MEM1}
                        responsiveLayout="scroll"
                        scrollable
                        scrollHeight="18rem"
                    >
                        <AFColumn field="PO_CD" header="Po" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                        <AFColumn field="PO_SEQ" header="Seq" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                        <AFColumn field="ORDER_CD" header="Order Cd" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                        <AFColumn field="MATL_CD" header="Matl Cd" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                        <AFColumn field="VENDOR_NAME" header="Supplier" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                        <AFColumn field="MATL_NAME" header="Matl Name" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                        <AFColumn field="COLOR" header="color" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                        <AFColumn field="SPEC" header="Spec" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                        <AFColumn field="UNIT" header="Unit" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                        <AFColumn field="PO_QTY" header="Po Qty" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                        <AFColumn field="MRP_SEQ" header="Seq" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                        <AFColumn field="VENDOR_CD" header="Vendor Cd" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    </AFDataTable>
                </div>
            </div>

            <Divider
                layout="vertical"
                style={{ float: "left", height: "66rem", marginLeft: "2rem" }}
            />

            <div style={{ float: "left", width: "50rem" }}>
                <div
                    style={{
                        marginLeft: "1rem",
                        marginTop: "1rem",
                        width: "49rem",
                        height: "10rem",
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
                        <p style={{ width: "8rem", display: "inline-block" }}>Supplier</p>
                        <div
                            style={{
                                marginLeft: "0.5rem",
                                display: "inline-block",
                                width: "23rem",
                            }}
                        >
                            <Dropdown
                                id="id_VENDOR_CD"
                                value={dataQRY_KSV_PO_MRP1_VENDOR_CD}
                                onChange={(e) =>
                                    onDropdownChangeQRY_KSV_PO_MRP1_VENDOR_CD(
                                        e,
                                        "VENDOR_CD",
                                    )
                                }
                                options={datasQRY_KSV_PO_MRP1_VENDOR_CD}
                                optionLabel="VENDOR_NAME"
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
                                value={dataQRY_KSV_PO_MRP1_BUYER_CD}
                                onChange={(e) =>
                                    onDropdownChangeQRY_KSV_PO_MRP1_BUYER_CD(
                                        e,
                                        "BUYER_CD",
                                    )
                                }
                                options={datasQRY_KSV_PO_MRP1_BUYER_CD}
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
                            width: "19rem",
                        }}
                    >
                        <p style={{ width: "8rem", display: "inline-block" }}>Pu Date</p>
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
                                id="id_S_DATE"
                                value={changeDateVal(
                                    dataQRY_KSV_PO_MRP1.S_DATE,
                                )}
                                onChange={(e) =>
                                    onCalChangeQRY_KSV_PO_MRP1_S_DATE(
                                        e,
                                        "S_DATE",
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
                            width: "17rem",
                        }}
                    >
                        <p style={{ width: "1rem", display: "inline-block" }}>~</p>
                        <div
                            style={{
                                marginLeft: "1.5rem",
                                display: "inline-block",
                                width: "10rem",
                            }}
                        >
                            <Calendar
                                showButtonBar
                                dateFormat="yy-mm-dd"
                                id="id_E_DATE"
                                value={changeDateVal(
                                    dataQRY_KSV_PO_MRP1.E_DATE,
                                )}
                                onChange={(e) =>
                                    onCalChangeQRY_KSV_PO_MRP1_E_DATE(
                                        e,
                                        "E_DATE",
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
                        <p style={{ width: "8rem", display: "inline-block" }}>Pu No</p>
                        <div
                            style={{
                                marginLeft: "0.5rem",
                                display: "inline-block",
                                width: "10rem",
                            }}
                        >
                            <Dropdown
                                id="id_PU_NO"
                                value={dataQRY_KSV_PO_MRP1_PU_NO}
                                onChange={(e) =>
                                    onDropdownChangeQRY_KSV_PO_MRP1_PU_NO(
                                        e,
                                        "PU_NO",
                                    )
                                }
                                options={datasQRY_KSV_PO_MRP1_PU_NO}
                                optionLabel="PU_CD"
                                placeholder=""
                                editable
                            ></Dropdown>
                        </div>
                        <Button
                            label="STS Remark"
                            className="p-button-text"
                            onClick={searchTBL_KSV_PO_MEM}
                        />
                    </span>
                    <span
                        style={{ display: "inline-block", marginLeft: "32rem" }}
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
                            onClick={searchTBL_KSV_PO_MEM}
                        />

                        <Button
                            label="Excel"
                            style={{ height: "1.1rem", color: "green" }}
                            icon="pi pi-upload"
                            className="p-button-text"
                            onClick={exportExcelTBL_KSV_PO_MEM}
                        />
                    </span>
                </div>

                <div
                    style={{
                        marginLeft: "1rem",
                        marginTop: "1rem",
                        width: "30rem",
                        height: "22rem",
                        float: "left",
                    }}
                >
                    <AFDataTable preventUnrelatedRerender
                        ref={dt_TBL_KSV_PO_MEM2}
                        size="small"
                        value={datasTBL_KSV_PO_MEM2}
                        resizableColumns
                        columnResizeMode="fit"
                        showGridlines
                        selectionMode="checkbox"
                        selection={selectedTBL_KSV_PO_MEM2}
                        onSelectionChange={(e) => {
                            setFlagSelectModeTBL_KSV_PO_MEM2(true);
                            setSelectedTBL_KSV_PO_MEM2(e.value);
                            console.log(
                                "selected length:" +
                                    selectedTBL_KSV_PO_MEM2.length,
                            );
                            onRowClick1TBL_KSV_PO_MEM2(e.value);
                        }}
                        onRowClick={onRowClickTBL_KSV_PO_MEM2}
                        dataKey="id"
                        className="datatable-responsive"
                        virtualScrollerOptions={{ itemSize: 9 }}
                        emptyMessage=" " //header={headerTBL_KSV_PO_MEM2}
                        responsiveLayout="scroll"
                        scrollable
                        scrollHeight="18rem"
                    >
                        <AFColumn field="PU_NO" header="Pu No" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                        <AFColumn field="BUYER_NAME" header="Buyer" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                        <AFColumn field="VENDOR_NAME" header="Supplier" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                        <AFColumn field="PU_DATE" header="Pu Date" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                        <AFColumn field="BUYER_CD" header="Buyer Cd" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                        <AFColumn field="VENDOR_CD" header="Vendor Cd" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                        <AFColumn field="FACTORY_CD" header="Factory Cd" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    </AFDataTable>
                </div>

                <div
                    style={{
                        marginLeft: "1rem",
                        marginTop: "1rem",
                        width: "18rem",
                        height: "22rem",
                        float: "left",
                    }}
                >
                    <AFDataTable preventUnrelatedRerender
                        ref={dt_TBL_KSV_PO_MEM3}
                        size="small"
                        value={datasTBL_KSV_PO_MEM3}
                        resizableColumns
                        columnResizeMode="fit"
                        showGridlines
                        selectionMode="checkbox"
                        selection={selectedTBL_KSV_PO_MEM3}
                        onSelectionChange={(e) => {
                            setFlagSelectModeTBL_KSV_PO_MEM3(true);
                            setSelectedTBL_KSV_PO_MEM3(e.value);
                            console.log(
                                "selected length:" +
                                    selectedTBL_KSV_PO_MEM3.length,
                            );
                            onRowClick1TBL_KSV_PO_MEM3(e.value);
                        }}
                        onRowClick={onRowClickTBL_KSV_PO_MEM3}
                        dataKey="id"
                        className="datatable-responsive"
                        virtualScrollerOptions={{ itemSize: 9 }}
                        emptyMessage=" " //header={headerTBL_KSV_PO_MEM3}
                        responsiveLayout="scroll"
                        scrollable
                        scrollHeight="18rem"
                    >
                        <AFColumn field="PO_CD" header="Po" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                        <AFColumn field="PO_SEQ" header="Seq" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                        <AFColumn field="PU_CD" header="Pu No" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                        <AFColumn field="VENDOR_CD" header="Vendor" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    </AFDataTable>
                </div>
                <Divider />
                <div
                    style={{
                        marginLeft: "1rem",
                        marginTop: "1rem",
                        width: "49rem",
                        height: "30rem",
                    }}
                >
                    <AFDataTable preventUnrelatedRerender
                        ref={dt_TBL_KSV_PO_MEM4}
                        size="small"
                        value={datasTBL_KSV_PO_MEM4}
                        resizableColumns
                        columnResizeMode="fit"
                        showGridlines
                        selectionMode="checkbox"
                        selection={selectedTBL_KSV_PO_MEM4}
                        onSelectionChange={(e) => {
                            setFlagSelectModeTBL_KSV_PO_MEM4(true);
                            setSelectedTBL_KSV_PO_MEM4(e.value);
                            console.log(
                                "selected length:" +
                                    selectedTBL_KSV_PO_MEM4.length,
                            );
                            onRowClick1TBL_KSV_PO_MEM4(e.value);
                        }}
                        onRowClick={onRowClickTBL_KSV_PO_MEM4}
                        dataKey="id"
                        className="datatable-responsive"
                        virtualScrollerOptions={{ itemSize: 14 }}
                        emptyMessage=" " //header={headerTBL_KSV_PO_MEM4}
                        responsiveLayout="scroll"
                        scrollable
                        scrollHeight="28rem"
                    >
                        <AFColumn field="PO_CD" header="Po" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                        <AFColumn field="PO_SEQ" header="Seq" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                        <AFColumn field="ORDER_CD" header="Order Cd" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                        <AFColumn field="MATL_CD" header="Matl Cd" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                        <AFColumn field="VENDOR_NAME" header="Supplier" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                        <AFColumn field="MATL_NAME" header="Matl Name" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                        <AFColumn field="COLOR" header="color" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                        <AFColumn field="SPEC" header="Spec" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                        <AFColumn field="UNIT" header="Unit" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                        <AFColumn field="PO_QTY" header="Po Qty" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                        <AFColumn field="MRP_SEQ" header="Seq" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                        <AFColumn field="VENDOR_CD" header="Vendor Cd" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    </AFDataTable>
                </div>
            </div>

            <div style={{ width: "100rem", height: "2rem" }}></div>

            <Divider />

            <div style={{ width: "100rem", height: "2rem" }}>
                <div className="formgrid grid">
                    <div style={{ marginLeft: "22rem" }}>
                        <Button
                            style={{ display: "inline-block", width: "10rem" }}
                            label="New PU NO"
                            className="p-button-text"
                            onClick={blankFn}
                        />

                        <Button
                            style={{ display: "inline-block", width: "10rem" }}
                            label="Add Po Seq"
                            className="p-button-text"
                            onClick={blankFn}
                        />

                        <Button
                            style={{ display: "inline-block", width: "10rem" }}
                            label="Reset"
                            className="p-button-text"
                            onClick={blankFn}
                        />
                    </div>
                    <div style={{ marginLeft: "9rem" }}>
                        {/* <Button style={{ display: 'inline-block', width: '10rem' }} label="PU inquiry" className="p-button-text" onClick={blankFn} /> */}
                        <Button
                            style={{ display: "inline-block", width: "8rem" }}
                            label="Reset"
                            className="p-button-text"
                            onClick={blankFn}
                        />

                        <Button
                            style={{ display: "inline-block", width: "10rem" }}
                            label="Order Sheet"
                            className="p-button-text"
                            onClick={blankFn}
                        />

                        <Button
                            style={{ display: "inline-block", width: "10rem" }}
                            label="Delete Pu NO"
                            className="p-button-text"
                            onClick={blankFn}
                        />

                        <Button
                            style={{ display: "inline-block", width: "12rem" }}
                            label="Remove Po Seq"
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

export default React.memo(S040501_COMBINED_PO_MANAGER, comparisonFn);
