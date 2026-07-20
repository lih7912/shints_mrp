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
import { ProgressSpinner } from "primereact/progressspinner";

import { ServiceLib } from "../service/service_lib/ServiceLib";
import { ServiceS030503_STOCK_CHECK } from "../service/service_biz/ServiceS030503_STOCK_CHECK";
import { ServiceS0305_MRP_MANAGER } from "../service/service_biz/ServiceS0305_MRP_MANAGER";
import { ServiceS030514_PO_LIST } from "../service/service_biz/ServiceS030514_PO_LIST";
import { ServiceS030513_MRP_LIST } from "../service/service_biz/ServiceS030513_MRP_LIST";

import "./page_common.scss";

const emptyKCD_CODE = {
    id: 0,
    CD_GROUP: "",
    CD_CODE: "",
    CD_NAME: "",
    CD_FLAG: "",
};

const emptyQRY_KCD_MATL_MST = {
    MATL_NAME: "",
    COLOR: "",
    MATL_CD: "",
    RACK: "",
    FACTORY_CD: "",
    SPEC: "",
    VENDOR_CD: "",
    MATL_KIND2: "",
    STATUS_CD: "",
};

const emptyQRY_KSV_PO_MST = {
    PO_CD: "",
    PO_SEQ: "",
    PO_LOG_TYPE: "",
    MATL_CD: "",
    FACTORY_NAME: "",
    ORDER_STATUS: "",
};

const S0305_SEARCH_STORAGE_KEY = "S0305_MRP_MANAGER_SEARCH";
const S0305_REQUERY_STORAGE_KEY = "S0305_MRP_MANAGER_REQUERY";
const S0305_AUTO_PO_FIX_KEY = "S0305_AUTO_PO_FIX";

const emptyTBL_KCD_MATL_MST = {
    id: 0,
    PO_SEQ: "",
    ORDER_CD: "",
    MATL_CD: "",
    MATL_NAME: "",
    COLOR: "",
    SPEC: "",
    UNIT: "",
    RACK: "",
    LOCATION: "",
    REMATION_QTY: "",
    USED_QTY: "",
    VENDOR_NAME: "",
    VENDOR_CD: "",
};

const emptyTBL_KSV_ORDER_MEM = {
    id: 0,
    ORDER_CD: "",
    MATL_CD: "",
    MATL_NAME: "",
    COLOR: "",
    SPEC: "",
    UNIT: "",
    STOCK: "",
    RACK: "",
    IO_STATUS: "",
    MRP_QTY: "",
    PO_QTY: "",
    SUM_QTY: "",
    VENDOR_NAME: "",
    VENDOR_CD: "",
    STOCK_FLAG: "",
};

const emptyTBL_KSV_ORDER_MST = {
    id: 0,
    ORDER_CD: "",
    STYLE_NAME: "",
    BUYER_NAME: "",
    TOT_CNT: "",
    DUE_DATE: "",
    FACTORY_NAME: "",
};

const emptyEDT_CHECK_FACTORY = {
    PO_CD: "",
    MATL_CD: "",
    MATL_NAME: "",
    COLOR: "",
    SPEC: "",
    PO_FACTORY: "",
    STOCK_FACTORY: "",
};

const S030503_STOCK_CHECK = () => {
    const serviceLibRef = useRef(null);
    if (!serviceLibRef.current) {
        serviceLibRef.current = new ServiceLib();
        serviceLibRef.current.loginConfirm();
    }
    const serviceLib = serviceLibRef.current;
    const serviceS030503_STOCK_CHECKRef = useRef(null);
    if (!serviceS030503_STOCK_CHECKRef.current) serviceS030503_STOCK_CHECKRef.current = new ServiceS030503_STOCK_CHECK();
    const serviceS030503_STOCK_CHECK = serviceS030503_STOCK_CHECKRef.current;
    const serviceS0305_MRP_MANAGERRef = useRef(null);
    if (!serviceS0305_MRP_MANAGERRef.current) serviceS0305_MRP_MANAGERRef.current = new ServiceS0305_MRP_MANAGER();
    const serviceS0305_MRP_MANAGER = serviceS0305_MRP_MANAGERRef.current;
    const serviceS030514_PO_LISTRef = useRef(null);
    if (!serviceS030514_PO_LISTRef.current) serviceS030514_PO_LISTRef.current = new ServiceS030514_PO_LIST();
    const serviceS030514_PO_LIST = serviceS030514_PO_LISTRef.current;
    const serviceS030513_MRP_LISTRef = useRef(null);
    if (!serviceS030513_MRP_LISTRef.current) serviceS030513_MRP_LISTRef.current = new ServiceS030513_MRP_LIST();
    const serviceS030513_MRP_LIST = serviceS030513_MRP_LISTRef.current;

    const toast = useRef(null);

    const requestS0305Requery = () => {
        let searchCondition = null;
        const raw = sessionStorage.getItem(S0305_SEARCH_STORAGE_KEY);

        if (raw) {
            try {
                searchCondition = JSON.parse(raw);
                sessionStorage.setItem(
                    S0305_REQUERY_STORAGE_KEY,
                    JSON.stringify(searchCondition),
                );
            } catch (error) {
                console.log(`S0305 search parse error => ${error}`);
            }
        }

        window.parent.postMessage(
            {
                func: "requery_s0305_mrp_manager",
                message: {
                    searchCondition,
                },
            },
            "*",
        );
    };

    const [isProgress, setIsProgress] = useState(false);

    /* splitter 관련 */
    const [styleVal, setStyleVal] = useState({ width: "65vw" });

    ///

    ///

    const searchSTOCK_MATL = (argData0) => {
        console.log(argData0);
        var argData = {};
        if (typeof argData0.PO_CD === "undefined") {
            argData = { ...dataQRY_KCD_MATL_MST };
        } else {
            argData = { ...argData0 };
        }

        setSelectedTBL_KCD_MATL_MST([]);
        setDatasTBL_KCD_MATL_MST([]);

        // if (argData.STOCK_CHK !== '*') return;

        var tObj2 = {};
        tObj2.PO_CD = "";
        tObj2.MATL_CD = argData.MATL_CD;
        tObj2.MATL_NAME = argData.MATL_NAME;
        tObj2.COLOR = argData.COLOR;
        tObj2.RACK = argData.RACK;
        tObj2.FACTORY_CD = argData.FACTORY_CD;
        tObj2.SPEC = argData.SPEC;
        tObj2.VENDOR_CD = argData.VENDOR_CD;
        tObj2.MATL_KIND2 = argData.MATL_KIND2;
        tObj2.STATUS_CD = argData.STATUS_CD;

        // 2
        setLoadingTBL_KCD_MATL_MST(true);
        serviceS030503_STOCK_CHECK
            .mgrQueryTBL_KCD_MATL_MST(tObj2)
            .then((data) => {
                setLoadingTBL_KCD_MATL_MST(false);
                if (typeof data.graphQLErrors === "undefined") {
                    console.log(
                        "mgrQueryTBL_KCD_MATL_MST call => " + data.length,
                    );
                    var tArray = data.map((col, i) => {
                        var tObj = { ...col };
                        tObj.id = i + 1;
                        return tObj;
                    });
                    setDatasTBL_KCD_MATL_MST(addCompositeKeyToRows(tArray));
                } else {
                    console.log(
                        "mgrQueryTBL_KSV_PO_MRP error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });
    };

    /* EDT CHECK FACTORY */
    const [createDialog1, setCreateDialog1] = useState(false);
    const [saveEDT_CHECK_FACTORY, setSaveEDT_CHECK_FACTORY] = useState(
        emptyEDT_CHECK_FACTORY,
    );
    const [dataEDT_CHECK_FACTORY, setDataEDT_CHECK_FACTORY] = useState(
        emptyEDT_CHECK_FACTORY,
    );
    const resetEDT_CHECK_FACTORY = () => {
        setDataEDT_CHECK_FACTORY(emptyEDT_CHECK_FACTORY);
    };
    const popup_CHECK_FACTORY = (argData) => {
        setDataEDT_CHECK_FACTORY(argData);
        setCreateDialog1(true);
    };
    const unpopup_CHECK_FACTORY = () => {
        setCreateDialog1(false);
    };
    const process_SEL_STOCK_FACTORY = () => {
        setCreateDialog1(false);

        var tQryObj = { ...dataQRY_KSV_PO_MST };
        var tObj1 = { ...saveEDT_CHECK_FACTORY };

        var tObj = {};
        tObj.PO_CD = tQryObj.PO_CD;
        tObj.PO_SEQ = tQryObj.PO_SEQ;
        tObj.USER_ID = serviceLib.getUserInfo().USER_ID;
        tObj.DEST_DATA = [];

        delete tObj1.id;
        delete tObj1.__typename;

        tObj1.NEW_FACTORY_CD = tObj1.STOCK_FACTORY;
        delete tObj1.STOCK_FACTORY;
        delete tObj1.PO_FACTORY;
        tObj.DEST_DATA.push(tObj1);
        tObj.SRC_DATA = [];

        setLoadingTBL_KSV_ORDER_MEM(true);
        serviceS030503_STOCK_CHECK.mgrStockCancel(tObj).then((data) => {
            setLoadingTBL_KSV_ORDER_MEM(false);
            if (typeof data.graphQLErrors === "undefined") {
                if (data.length > 0) {
                    alert(data[0].CODE);
                    if (data[0].CODE.includes("SUCC")) {
                        searchSTOCK_MATL(dataQRY_KCD_MATL_MST);
                        var tInObj = {};
                        tInObj.PO_CD = tQryObj.PO_CD;
                        tInObj.PO_SEQ = tQryObj.PO_SEQ;
                        tInObj.MATL_CD = '';
                        tInObj.USER_ID = '';
                        tInObj.ORDER_CD = "";
                        searchPO_MRP(tInObj);
                    }
                }
            } else {
                console.log(
                    "mgrStockCancel error => " +
                        JSON.stringify(data.graphQLErrors),
                );
                toast.current.show({
                    severity: "success",
                    summary: "use Stock Error",
                    detail: "",
                    life: 3000,
                });
            }
        });
    };

    const process_SEL_PO_FACTORY = () => {
        setCreateDialog1(false);

        var tQryObj = { ...dataQRY_KSV_PO_MST };
        var tObj1 = { ...saveEDT_CHECK_FACTORY };

        var tObj = {};
        tObj.PO_CD = tQryObj.PO_CD;
        tObj.PO_SEQ = tQryObj.PO_SEQ;
        tObj.USER_ID = serviceLib.getUserInfo().USER_ID;
        tObj.DEST_DATA = [];

        delete tObj1.id;
        delete tObj1.__typename;

        tObj1.NEW_FACTORY_CD = tObj1.PO_FACTORY;
        delete tObj1.STOCK_FACTORY;
        delete tObj1.PO_FACTORY;
        tObj.DEST_DATA.push(tObj1);
        tObj.SRC_DATA = [];

        setLoadingTBL_KSV_ORDER_MEM(true);
        serviceS030503_STOCK_CHECK.mgrStockCancel(tObj).then((data) => {
            setLoadingTBL_KSV_ORDER_MEM(false);
            if (typeof data.graphQLErrors === "undefined") {
                if (data.length > 0) {
                    alert(data[0].CODE);
                    if (data[0].CODE.includes("SUCC")) {
                        searchSTOCK_MATL(dataQRY_KCD_MATL_MST);
                        var tInObj = {};
                        tInObj.PO_CD = tQryObj.PO_CD;
                        tInObj.PO_SEQ = tQryObj.PO_SEQ;
                        tInObj.MATL_CD = '';
                        tInObj.USER_ID = '';
                        tInObj.ORDER_CD = "";
                        searchPO_MRP(tInObj);
                    }
                }
            } else {
                console.log(
                    "mgrStockCancel error => " +
                        JSON.stringify(data.graphQLErrors),
                );
                toast.current.show({
                    severity: "success",
                    summary: "use Stock Error",
                    detail: "",
                    life: 3000,
                });
            }
        });


    };

    const onInputChangeEDT_CHECK_FACTORY_PO_CD = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_CHECK_FACTORY = { ...dataEDT_CHECK_FACTORY };

        let tTypeVal = _dataEDT_CHECK_FACTORY[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_CHECK_FACTORY[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_CHECK_FACTORY[`${name}`] = parseInt(val);

        setDataEDT_CHECK_FACTORY(_dataEDT_CHECK_FACTORY);
    };
    const onInputChangeEDT_CHECK_FACTORY_MATL_CD = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_CHECK_FACTORY = { ...dataEDT_CHECK_FACTORY };

        let tTypeVal = _dataEDT_CHECK_FACTORY[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_CHECK_FACTORY[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_CHECK_FACTORY[`${name}`] = parseInt(val);

        setDataEDT_CHECK_FACTORY(_dataEDT_CHECK_FACTORY);
    };
    const onInputChangeEDT_CHECK_FACTORY_MATL_NAME = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_CHECK_FACTORY = { ...dataEDT_CHECK_FACTORY };

        let tTypeVal = _dataEDT_CHECK_FACTORY[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_CHECK_FACTORY[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_CHECK_FACTORY[`${name}`] = parseInt(val);

        setDataEDT_CHECK_FACTORY(_dataEDT_CHECK_FACTORY);
    };
    const onInputChangeEDT_CHECK_FACTORY_COLOR = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_CHECK_FACTORY = { ...dataEDT_CHECK_FACTORY };

        let tTypeVal = _dataEDT_CHECK_FACTORY[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_CHECK_FACTORY[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_CHECK_FACTORY[`${name}`] = parseInt(val);

        setDataEDT_CHECK_FACTORY(_dataEDT_CHECK_FACTORY);
    };
    const onInputChangeEDT_CHECK_SPEC = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_CHECK_FACTORY = { ...dataEDT_CHECK_FACTORY };

        let tTypeVal = _dataEDT_CHECK_FACTORY[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_CHECK_FACTORY[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_CHECK_FACTORY[`${name}`] = parseInt(val);

        setDataEDT_CHECK_FACTORY(_dataEDT_CHECK_FACTORY);
    };
    const onInputChangeEDT_CHECK_PO_FACTORY = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_CHECK_FACTORY = { ...dataEDT_CHECK_FACTORY };

        let tTypeVal = _dataEDT_CHECK_FACTORY[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_CHECK_FACTORY[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_CHECK_FACTORY[`${name}`] = parseInt(val);

        setDataEDT_CHECK_FACTORY(_dataEDT_CHECK_FACTORY);
    };
    const onInputChangeEDT_CHECK_STOCK_FACTORY = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_CHECK_FACTORY = { ...dataEDT_CHECK_FACTORY };

        let tTypeVal = _dataEDT_CHECK_FACTORY[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_CHECK_FACTORY[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_CHECK_FACTORY[`${name}`] = parseInt(val);

        setDataEDT_CHECK_FACTORY(_dataEDT_CHECK_FACTORY);
    };

    /* QRY KCD_MATL_MST*/
    const [dataQRY_KCD_MATL_MST, setDataQRY_KCD_MATL_MST] = useState(
        emptyQRY_KCD_MATL_MST,
    );

    const resetQRY_KCD_MATL_MST = () => {

        var col = { ...emptyQRY_KCD_MATL_MST };
        if (dataQRY_KCD_MATL_MST.FACTORY_CD) col.FACTORY_CD = dataQRY_KCD_MATL_MST.FACTORY_CD;

        setDataQRY_KCD_MATL_MST(col);
        setDatasTBL_KCD_MATL_MST([]);
        setSelectedTBL_KCD_MATL_MST([]);
        if (dataQRY_KCD_MATL_MST.FACTORY_CD) ; 
        else  setDataQRY_KCD_MATL_MST_FACTORY_CD(datasQRY_KCD_MATL_MST_FACTORY_CD[0]);
        setDataQRY_KCD_MATL_MST_MATL_KIND2(datasQRY_KCD_MATL_MST_MATL_KIND2[0]);
        setDataQRY_KCD_MATL_MST_STATUS_CD(datasQRY_KCD_MATL_MST_STATUS_CD[0]);
    };

    const onInputChangeQRY_KCD_MATL_MST_MATL_NAME = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KCD_MATL_MST = { ...dataQRY_KCD_MATL_MST };

        let tTypeVal = _dataQRY_KCD_MATL_MST[`${name}`];
        if (typeof tTypeVal === "string")
            _dataQRY_KCD_MATL_MST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KCD_MATL_MST[`${name}`] = parseInt(val);

        setDataQRY_KCD_MATL_MST(_dataQRY_KCD_MATL_MST);
    };

    const onInputChangeQRY_KCD_MATL_MST_VENDOR_CD = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KCD_MATL_MST = { ...dataQRY_KCD_MATL_MST };

        let tTypeVal = _dataQRY_KCD_MATL_MST[`${name}`];
        if (typeof tTypeVal === "string")
            _dataQRY_KCD_MATL_MST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KCD_MATL_MST[`${name}`] = parseInt(val);

        setDataQRY_KCD_MATL_MST(_dataQRY_KCD_MATL_MST);
    };

    const onInputChangeQRY_KCD_MATL_MST_COLOR = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KCD_MATL_MST = { ...dataQRY_KCD_MATL_MST };

        let tTypeVal = _dataQRY_KCD_MATL_MST[`${name}`];
        if (typeof tTypeVal === "string")
            _dataQRY_KCD_MATL_MST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KCD_MATL_MST[`${name}`] = parseInt(val);

        setDataQRY_KCD_MATL_MST(_dataQRY_KCD_MATL_MST);
    };

    const onInputChangeQRY_KCD_MATL_MST_MATL_CD = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KCD_MATL_MST = { ...dataQRY_KCD_MATL_MST };

        let tTypeVal = _dataQRY_KCD_MATL_MST[`${name}`];
        if (typeof tTypeVal === "string")
            _dataQRY_KCD_MATL_MST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KCD_MATL_MST[`${name}`] = parseInt(val);

        setDataQRY_KCD_MATL_MST(_dataQRY_KCD_MATL_MST);
    };

    const onInputChangeQRY_KCD_MATL_MST_RACK = (e, name) => {
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
        datasQRY_KCD_MATL_MST_FACTORY_CD,
        setDatasQRY_KCD_MATL_MST_FACTORY_CD,
    ] = useState([]);
    const [
        dataQRY_KCD_MATL_MST_FACTORY_CD,
        setDataQRY_KCD_MATL_MST_FACTORY_CD,
    ] = useState({});

    const editQRY_KCD_MATL_MST_FACTORY_CD = (argValue) => {
        let _dataQRY_KCD_MATL_MST_FACTORY_CD =
            datasQRY_KCD_MATL_MST_FACTORY_CD.filter(
                (val) => val.FACTORY_CD === argValue,
            );
        console.log(argValue);

        console.log(datasQRY_KCD_MATL_MST_FACTORY_CD);
        console.log(dataQRY_KCD_MATL_MST_FACTORY_CD);

        setDataQRY_KCD_MATL_MST_FACTORY_CD(_dataQRY_KCD_MATL_MST_FACTORY_CD[0]);
    };

    const onDropdownChangeQRY_KCD_MATL_MST_FACTORY_CD = (e, name) => {
        let val = (e.value && e.value.FACTORY_CD) || "";

        let _dataQRY_KCD_MATL_MST = { ...dataQRY_KCD_MATL_MST };

        let tTypeVal = _dataQRY_KCD_MATL_MST[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KCD_MATL_MST[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KCD_MATL_MST[`${name}`] = parseInt(val);
        }

        setDataQRY_KCD_MATL_MST(_dataQRY_KCD_MATL_MST);
        setDataQRY_KCD_MATL_MST_FACTORY_CD(e.value);
    };

    const onInputChangeQRY_KCD_MATL_MST_SPEC = (e, name) => {
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
        datasQRY_KCD_MATL_MST_VENDOR_CD,
        setDatasQRY_KCD_MATL_MST_VENDOR_CD,
    ] = useState([]);
    const [dataQRY_KCD_MATL_MST_VENDOR_CD, setDataQRY_KCD_MATL_MST_VENDOR_CD] =
        useState({});

    const [
        datasQRY_KCD_MATL_MST_MATL_KIND2,
        setDatasQRY_KCD_MATL_MST_MATL_KIND2,
    ] = useState([]);
    const [
        dataQRY_KCD_MATL_MST_MATL_KIND2,
        setDataQRY_KCD_MATL_MST_MATL_KIND2,
    ] = useState({});

    const editQRY_KCD_MATL_MST_MATL_KIND2 = (argValue) => {
        let _dataQRY_KCD_MATL_MST_MATL_KIND2 =
            datasQRY_KCD_MATL_MST_MATL_KIND2.filter(
                (val) => val.SEQ === argValue,
            );
        setDataQRY_KCD_MATL_MST_MATL_KIND2(_dataQRY_KCD_MATL_MST_MATL_KIND2[0]);
    };

    const onDropdownChangeQRY_KCD_MATL_MST_MATL_KIND2 = (e, name) => {
        let val = (e.value && e.value.SEQ) || "";

        let _dataQRY_KCD_MATL_MST = { ...dataQRY_KCD_MATL_MST };

        let tTypeVal = _dataQRY_KCD_MATL_MST[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KCD_MATL_MST[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KCD_MATL_MST[`${name}`] = parseInt(val);
        }

        setDataQRY_KCD_MATL_MST(_dataQRY_KCD_MATL_MST);
        setDataQRY_KCD_MATL_MST_MATL_KIND2(e.value);
    };

    const [
        datasQRY_KCD_MATL_MST_STATUS_CD,
        setDatasQRY_KCD_MATL_MST_STATUS_CD,
    ] = useState([]);
    const [dataQRY_KCD_MATL_MST_STATUS_CD, setDataQRY_KCD_MATL_MST_STATUS_CD] =
        useState({});

    const editQRY_KCD_MATL_MST_STATUS_CD = (argValue) => {
        let _dataQRY_KCD_MATL_MST_STATUS_CD =
            datasQRY_KCD_MATL_MST_STATUS_CD.filter(
                (val) => val.CD_CODE === argValue,
            );
        setDataQRY_KCD_MATL_MST_STATUS_CD(_dataQRY_KCD_MATL_MST_STATUS_CD[0]);
    };

    const onDropdownChangeQRY_KCD_MATL_MST_STATUS_CD = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataQRY_KCD_MATL_MST = { ...dataQRY_KCD_MATL_MST };

        let tTypeVal = _dataQRY_KCD_MATL_MST[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KCD_MATL_MST[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KCD_MATL_MST[`${name}`] = parseInt(val);
        }

        setDataQRY_KCD_MATL_MST(_dataQRY_KCD_MATL_MST);
        setDataQRY_KCD_MATL_MST_STATUS_CD(e.value);
    };

    /* QRY KSV_PO_MST*/
    const [dataQRY_KSV_PO_MST, setDataQRY_KSV_PO_MST] =
        useState(emptyQRY_KSV_PO_MST);

    const onInputChangeQRY_KSV_PO_MST_PO_CD = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_PO_MST = { ...dataQRY_KSV_PO_MST };

        let tTypeVal = _dataQRY_KSV_PO_MST[`${name}`];
        if (typeof tTypeVal === "string") _dataQRY_KSV_PO_MST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_PO_MST[`${name}`] = parseInt(val);

        setDataQRY_KSV_PO_MST(_dataQRY_KSV_PO_MST);
    };

    const [datasQRY_KSV_PO_MST_PO_SEQ, setDatasQRY_KSV_PO_MST_PO_SEQ] =
        useState([]);
    const [dataQRY_KSV_PO_MST_PO_SEQ, setDataQRY_KSV_PO_MST_PO_SEQ] = useState(
        {},
    );

    const onDropdownChangeQRY_KSV_PO_MST_PO_SEQ = (e, name) => {
        let val = (e.value && e.value.PO_SEQ) || "";

        let _dataQRY_KSV_PO_MST = { ...dataQRY_KSV_PO_MST };

        let tTypeVal = _dataQRY_KSV_PO_MST[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_PO_MST[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_PO_MST[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_PO_MST(_dataQRY_KSV_PO_MST);
        setDataQRY_KSV_PO_MST_PO_SEQ(e.value);

        //searchPO_MRP(_dataQRY_KSV_PO_MST);
    };

    const [
        datasQRY_KSV_PO_MST_PO_LOG_TYPE,
        setDatasQRY_KSV_PO_MST_PO_LOG_TYPE,
    ] = useState([]);
    const [dataQRY_KSV_PO_MST_PO_LOG_TYPE, setDataQRY_KSV_PO_MST_PO_LOG_TYPE] =
        useState({});

    const onDropdownChangeQRY_KSV_PO_MST_PO_LOG_TYPE = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataQRY_KSV_PO_MST = { ...dataQRY_KSV_PO_MST };

        let tTypeVal = _dataQRY_KSV_PO_MST[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_PO_MST[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_PO_MST[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_PO_MST(_dataQRY_KSV_PO_MST);
        setDataQRY_KSV_PO_MST_PO_LOG_TYPE(e.value);
    };

    const [
        datasQRY_KSV_PO_MST_ORDER_STATUS,
        setDatasQRY_KSV_PO_MST_ORDER_STATUS,
    ] = useState([]);
    const [
        dataQRY_KSV_PO_MST_ORDER_STATUS,
        setDataQRY_KSV_PO_MST_ORDER_STATUS,
    ] = useState({});

    /**TABLE KCD_MATL_MST */
    // DEFINE DATAGRID : TBL_KCD_MATL_MST
    const [datasTBL_KCD_MATL_MST, setDatasTBL_KCD_MATL_MST] = useState([]);
    const dt_TBL_KCD_MATL_MST = useRef(null);
    const [dataTBL_KCD_MATL_MST, setDataTBL_KCD_MATL_MST] = useState(
        emptyTBL_KCD_MATL_MST,
    );
    const [selectedTBL_KCD_MATL_MST, setSelectedTBL_KCD_MATL_MST] = useState(
        [],
    );
    const [flagSelectModeTBL_KCD_MATL_MST, setFlagSelectModeTBL_KCD_MATL_MST] =
        useState(false);
    const [loadingTBL_KCD_MATL_MST, setLoadingTBL_KCD_MATL_MST] =
        useState(false);

    const [dataKSV_PO_MST, setDataKSV_PO_MST] = useState({});

    // DATAGRID CODE : TBL_KCD_MATL_MST

    const onSelectionChangeTBL_KCD_MATL_MST = (event) => {
        setFlagSelectModeTBL_KCD_MATL_MST(true);
        // 선택 상태만 변경 - 데이터는 수정하지 않음
        setSelectedTBL_KCD_MATL_MST(event.value);
    };

    const onSingleSelectAreaClickTBL_KCD_MATL_MST = (rowData) => {
        setFlagSelectModeTBL_KCD_MATL_MST(false);
        onSelectionChangeTBL_KCD_MATL_MST({ value: [rowData] });
    };

    const singleSelectAreaBodyTBL_KCD_MATL_MST = (field) => {
        return (rowData) => (
            <span
                style={{ display: "block", width: "100%", cursor: "pointer" }}
                onClick={(e) => {
                    e.stopPropagation();
                    onSingleSelectAreaClickTBL_KCD_MATL_MST(rowData);
                }}
            >
                {rowData[field]}
            </span>
        );
    };

    const onRowClickTBL_KCD_MATL_MST = (event) => {
        let argTBL_KCD_MATL_MST = event.data;
        if (flagSelectModeTBL_KCD_MATL_MST) {
            setFlagSelectModeTBL_KCD_MATL_MST(false);
            return;
        }

        // Service : NawooAll:mgrQueryTBL_KCD_MATL_MST
    };

    const onCellEditCompleteTBL_KCD_MATL_MST = (e) => {
        let { rowData, newValue, field, originalEvent: event } = e;
        rowData[field] = newValue;
    };

    const cellEditorTBL_KCD_MATL_MST = (options) => {
        return textEditor(options);
    };

    // Helper function to add composite key to table rows (with index for uniqueness)
    const addCompositeKeyToRows = (rows) => {
        if (!rows || rows.length === 0) return rows;
        return rows.map((row, idx) => ({
            ...row,
            COMPOSITE_KEY: `${idx}|${row.PO_CD || ""}|${row.MATL_CD || ""}|${row.STOCK_IDX || ""}|${row.ORDER_CD || ""}`,
        }));
    };

    const changeInputValue = (argData) => {
        var tRet = "";
        if (argData === "") tRet = "";
        else {
            if (String(argData) === "0") tRet = "";
            else tRet = String(argData);
        }
        return tRet;
    };

    const textEditor = (options) => {
        return (
            <InputText
                type="text"
                value={changeInputValue(options.value)}
                onChange={(e) => options.editorCallback(e.target.value)}
            />
        );
    };

    /**TABLE KSV_ORDER_MEM */
    // DEFINE DATAGRID : TBL_KSV_ORDER_MEM
    const [datasTBL_KSV_ORDER_MEM, setDatasTBL_KSV_ORDER_MEM] = useState([]);
    const dt_TBL_KSV_ORDER_MEM = useRef(null);
    const [dataTBL_KSV_ORDER_MEM, setDataTBL_KSV_ORDER_MEM] = useState(
        emptyTBL_KSV_ORDER_MEM,
    );
    const [selectedTBL_KSV_ORDER_MEM, setSelectedTBL_KSV_ORDER_MEM] = useState(
        [],
    );
    const [
        flagSelectModeTBL_KSV_ORDER_MEM,
        setFlagSelectModeTBL_KSV_ORDER_MEM,
    ] = useState(false);
    const [loadingTBL_KSV_ORDER_MEM, setLoadingTBL_KSV_ORDER_MEM] =
        useState(false);

    // DATAGRID CODE : TBL_KSV_ORDER_MEM
    const toNumberOrZero = (value) => {
        const parsed = parseFloat(value);
        return Number.isNaN(parsed) ? 0 : parsed;
    };

    const applyUseStockQtyToBottomTable = (sourceRows) => {
        if (!sourceRows || sourceRows.length <= 0) return;

        const nextRemainByStockIdx = new Map();
        sourceRows.forEach((row) => {
            const stockIdx = String(row.STOCK_IDX || "");
            if (!stockIdx) return;

            const currentRemainQty = toNumberOrZero(row.REMAIN_QTY);
            const enteredUseQty = toNumberOrZero(row.USE_QTY);
            const nextRemainQty =
                enteredUseQty > 0
                    ? Math.max(0, currentRemainQty - enteredUseQty)
                    : 0;

            nextRemainByStockIdx.set(stockIdx, nextRemainQty.toFixed(2));
        });

        if (nextRemainByStockIdx.size <= 0) return;

        setDatasTBL_KCD_MATL_MST((prevRows) =>
            addCompositeKeyToRows(
                prevRows.map((row) => {
                    const stockIdx = String(row.STOCK_IDX || "");
                    if (!nextRemainByStockIdx.has(stockIdx)) return row;
                    return {
                        ...row,
                        REMAIN_QTY: nextRemainByStockIdx.get(stockIdx),
                    };
                })
            ),
        );

        setSelectedTBL_KCD_MATL_MST((prevRows) =>
            addCompositeKeyToRows(
                prevRows.map((row) => {
                    const stockIdx = String(row.STOCK_IDX || "");
                    if (!nextRemainByStockIdx.has(stockIdx)) return row;
                    return {
                        ...row,
                        REMAIN_QTY: nextRemainByStockIdx.get(stockIdx),
                    };
                })
            ),
        );
    };

    const useStock = async () => {
        const sanitizeUseStockDestData = (row) => {
            return {
                PO_SEQ: row.PO_SEQ,
                ORDER_CD: row.ORDER_CD,
                MATL_CD: row.MATL_CD,
                MATL_NAME: row.MATL_NAME,
                COLOR: row.COLOR,
                SPEC: row.SPEC,
                UNIT: row.UNIT,
                PO_MATL_CD: row.PO_MATL_CD,
                USE_PO_TYPE_N: row.USE_PO_TYPE_N,
                USE_QTY: row.USE_QTY,
                PO_QTY: row.PO_QTY,
                CANCEL_QTY: row.CANCEL_QTY,
                SUM_QTY: row.SUM_QTY,
                VENDOR_NAME: row.VENDOR_NAME,
                STOCK_CHK: row.STOCK_CHK,
                MRP_SEQ: row.MRP_SEQ,
                MATL_SEQ: row.MATL_SEQ,
                MATL_PRICE: row.MATL_PRICE,
                CURR_CD: row.CURR_CD,
                PO_MRP_SEQ: row.PO_MRP_SEQ,
                REG_DATETIME: row.REG_DATETIME,
                STOCK_IDX: row.STOCK_IDX,
                RACK: row.RACK,
                ROOT_IDX: row.ROOT_IDX,
                VENDOR_CD: row.VENDOR_CD,
                MATL_KIND2: row.MATL_KIND2,
                STATUS_CD: row.STATUS_CD,
                FACTORY_CD: row.FACTORY_CD,
                NEW_FACTORY_CD: row.NEW_FACTORY_CD,
                CANCEL_REASON: row.CANCEL_REASON,
                STOCK_PO_CD: row.STOCK_PO_CD,
                STOCK_PO_SEQ: row.STOCK_PO_SEQ,
            };
        };

        const sanitizeUseStockSrcData = (row) => {
            return {
                PO_CD: row.PO_CD,
                ORDER_CD: row.ORDER_CD,
                MATL_CD: row.MATL_CD,
                MATL_NAME: row.MATL_NAME,
                COLOR: row.COLOR,
                SPEC: row.SPEC,
                UNIT: row.UNIT,
                RACK: row.RACK,
                LOCATION: row.LOCATION,
                REMAIN_QTY: row.REMAIN_QTY,
                VENDOR_NAME: row.VENDOR_NAME,
                STOCK_STATUS: row.STOCK_STATUS,
                FACTORY_NAME: row.FACTORY_NAME,
                FACTORY_CD: row.FACTORY_CD,
                NEW_FACTORY_CD: row.NEW_FACTORY_CD,
                REMARK: row.REMARK,
                PLAN_REMARK: row.PLAN_REMARK,
                REASON_REMARK: row.REASON_REMARK,
                PO_SEQ: row.PO_SEQ,
                MRP_SEQ: row.MRP_SEQ,
                MATL_SEQ: row.MATL_SEQ,
                MATL_PRICE: row.MATL_PRICE,
                CURR_CD: row.CURR_CD,
                STOCK_IDX: row.STOCK_IDX,
                ORG_STOCK_IDX: row.ORG_STOCK_IDX,
                ROOT_IDX: row.ROOT_IDX,
                VENDOR_CD: row.VENDOR_CD,
                MATL_KIND2: row.MATL_KIND2,
                STATUS_CD: row.STATUS_CD,
                USE_QTY: row.USE_QTY,
                MATL_TYPE: row.MATL_TYPE,
                MATL_TYPE2: row.MATL_TYPE2,
                MATL_TYPE_N: row.MATL_TYPE_N,
                MATL_TYPE2_N: row.MATL_TYPE2_N,
                AUTHORITY: row.AUTHORITY,
                CANCEL_REASON: row.CANCEL_REASON,
            };
        };

        var tQryObj = { ...dataQRY_KSV_PO_MST };

        if (
            selectedTBL_KSV_ORDER_MEM.length <= 0 ||
            selectedTBL_KCD_MATL_MST.length <= 0
        ) {
            alert("소스/타켓 데이터를 지정해야 합니다<br><br>Source/target data must be specified");
            return;
        }

        if (
            selectedTBL_KSV_ORDER_MEM.length > 1 &&
            selectedTBL_KCD_MATL_MST.length > 1
        ) {
            alert(
                "소스/타켓 둘다 갯수가 1보다 클수 없습니다. 둘중에 하나는 한 개만 선택되어야 합니다.<br><br>Both source and target cannot have more than one item. One of them must have only one item selected.",
            );
            return;
        }

        const selectedSourceRows = selectedTBL_KCD_MATL_MST.map((row) => ({
            ...row,
        }));

        var tObj = {};
        tObj.PO_CD = tQryObj.PO_CD;
        tObj.PO_SEQ = tQryObj.PO_SEQ;
        tObj.USER_ID = serviceLib.getUserInfo().USER_ID;
        tObj.DEST_DATA = [];
        var tDestTotal = 0;
        selectedTBL_KSV_ORDER_MEM.forEach((col, i) => {
            var tObj1 = sanitizeUseStockDestData(col);
            tDestTotal += parseFloat(tObj1.SUM_QTY);  
            tObj.DEST_DATA.push(tObj1);
        });

        const normalizeMatlCd = (value) =>
            String(
                value === null || typeof value === "undefined" ? "" : value,
            )
                .trim()
                .toUpperCase();

        const formatMatlCdWithAttributes = (row) =>
            `${row?.MATL_CD || ""}(${row?.COLOR || ""}, ${row?.SPEC || ""}, ${row?.MATL_NAME || ""})`;

        const confirmMatlMismatch = async () =>
            new Promise((resolve) => {
                const sourceText = selectedTBL_KCD_MATL_MST
                    .map((row) => formatMatlCdWithAttributes(row))
                    .join("\n");
                const targetText = selectedTBL_KSV_ORDER_MEM
                    .map((row) => formatMatlCdWithAttributes(row))
                    .join("\n");

                resolve(
                    window.confirm(
                        `선택한 Stock/Target의 Matl#가 서로 다릅니다.\n계속 진행하시겠습니까?\nThe selected Stock/Target Matl# values are different. Do you want to continue?\n\nStock:\n${sourceText}\n\nTarget:\n${targetText}`,
                    ),
                );
            });

        const selectedDestMatlSet = new Set(
            selectedTBL_KSV_ORDER_MEM.map((row) => normalizeMatlCd(row.MATL_CD)),
        );
        const selectedSourceMatlSet = new Set(
            selectedTBL_KCD_MATL_MST.map((row) => normalizeMatlCd(row.MATL_CD)),
        );
        const hasMatlMismatch =
            selectedDestMatlSet.size !== selectedSourceMatlSet.size ||
            [...selectedDestMatlSet].some(
                (matlCd) => !selectedSourceMatlSet.has(matlCd),
            );

        if (hasMatlMismatch) {
            const isConfirmed = await confirmMatlMismatch();
            if (!isConfirmed) return;
        }

        const resolveRequiredQty = (row) => {
            const qtyCandidates = [row?.PO_QTY, row?.SUM_QTY, row?.USE_QTY];
            for (const candidate of qtyCandidates) {
                const qty = parseFloat(candidate);
                if (!Number.isNaN(qty) && qty > 0) return qty;
            }
            return 0;
        };

        // MATL_CD로 SOURCE 행들을 그룹화
        const groupByMatlCd = (rows) => {
            const groups = {};
            rows.forEach((row) => {
                const key = normalizeMatlCd(row.MATL_CD);
                if (!groups[key]) {
                    groups[key] = [];
                }
                groups[key].push(row);
            });
            return groups;
        };

        tObj.SRC_DATA = [];
        var tSrcTotal = 0;

        if (tObj.DEST_DATA.length === 1) {
            let remainingQty = resolveRequiredQty(tObj.DEST_DATA[0]);

            selectedSourceRows.forEach((row) => {
                if (remainingQty <= 0) return;

                const rowRemainQty = parseFloat(row.REMAIN_QTY) || 0;
                const useQty = Math.min(rowRemainQty, remainingQty);

                if (useQty > 0) {
                    var tObj1 = sanitizeUseStockSrcData(row);
                    tObj1.USE_QTY = useQty.toFixed(2);
                    tObj.SRC_DATA.push(tObj1);

                    tSrcTotal += useQty;
                    remainingQty -= useQty;
                }
            });
        } else {
            const sourceGroups = groupByMatlCd(selectedSourceRows);

            // 각 MATL_CD 그룹별로 처리
            Object.keys(sourceGroups).forEach((matlCd) => {
                const group = sourceGroups[matlCd];

                // 해당 MATL_CD에 대한 TARGET 찾기
                const targetForMatl = selectedTBL_KSV_ORDER_MEM.find(
                    (target) => normalizeMatlCd(target.MATL_CD) === matlCd,
                );
                if (!targetForMatl) return;

                // TARGET의 필요 수량 (PO_QTY 또는 SUM_QTY)
                let remainingQty = resolveRequiredQty(targetForMatl);

                // 그룹의 첫 번째부터 순차적으로 차감
                group.forEach((row) => {
                    if (remainingQty <= 0) return;

                    const rowRemainQty = parseFloat(row.REMAIN_QTY) || 0;
                    const useQty = Math.min(rowRemainQty, remainingQty);

                    if (useQty > 0) {
                        var tObj1 = sanitizeUseStockSrcData(row);
                        tObj1.USE_QTY = useQty.toFixed(2);
                        tObj.SRC_DATA.push(tObj1);

                        tSrcTotal += useQty;
                        remainingQty -= useQty;
                    }
                });
            });
        }

        if (tObj.SRC_DATA.length <= 0) {
            alert("Use Qty을 입력하신후 작업하세요<br><br>Enter Use Qty and start working.");
            return;
        }

        if (tObj.DEST_DATA.length > 1) {
            setLoadingTBL_KSV_ORDER_MEM(true);
            serviceS030503_STOCK_CHECK.mgrUseStock_N_1(tObj).then((data) => {
                setLoadingTBL_KSV_ORDER_MEM(false);
                if (typeof data.graphQLErrors === "undefined") {
                    if (data.length > 0) {
                        alert(data[0].CODE);
                        if (data[0].CODE.includes("SUCC")) {
                            // USE_QTY가 있는 행들만 applyUseStockQtyToBottomTable에 전달
                            applyUseStockQtyToBottomTable(tObj.SRC_DATA);
                            var tInObj = {};
                            tInObj.PO_CD = tQryObj.PO_CD;
                            tInObj.PO_SEQ = tQryObj.PO_SEQ;
                            tInObj.MATL_CD = '';
                            tInObj.USER_ID = '';
                            tInObj.ORDER_CD = "";
                            searchPO_MRP(tInObj);
                        }
                    }
                } else {
                    console.log(
                        "mgrUseStock error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                    toast.current.show({
                        severity: "success",
                        summary: "use Stock Error",
                        detail: "",
                        life: 3000,
                    });
                }
            });
        } else {
            setLoadingTBL_KSV_ORDER_MEM(true);
            serviceS030503_STOCK_CHECK.mgrUseStock_1_N(tObj).then((data) => {
                setLoadingTBL_KSV_ORDER_MEM(false);
                if (typeof data.graphQLErrors === "undefined") {
                    if (data.length > 0) {
                        alert(data[0].CODE);
                        if (data[0].CODE.includes("SUCC")) {
                            // USE_QTY가 있는 행들만 applyUseStockQtyToBottomTable에 전달
                            applyUseStockQtyToBottomTable(tObj.SRC_DATA);
                            var tInObj = {};
                            tInObj.PO_CD = tQryObj.PO_CD;
                            tInObj.PO_SEQ = tQryObj.PO_SEQ;
                            tInObj.MATL_CD = '';
                            tInObj.USER_ID = '';
                            tInObj.ORDER_CD = "";
                            searchPO_MRP(tInObj);
                        }
                    }
                } else {
                    console.log(
                        "mgrUseStock error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                    toast.current.show({
                        severity: "success",
                        summary: "use Stock Error",
                        detail: "",
                        life: 3000,
                    });
                }
            });
        }
    };

    const cancelStock = async () => {
        var tQryObj = { ...dataQRY_KSV_PO_MST };

        var tOrderMst = { ...datasTBL_KSV_ORDER_MST[0] };

        if (selectedTBL_KSV_ORDER_MEM.length <= 0) {
            alert("데이터를 지정해야 합니다<br><br>You must specify data");
            return;
        }

        var tFlag = 0;
        var tObj = {};
        tObj.PO_CD = tQryObj.PO_CD;
        tObj.PO_SEQ = tQryObj.PO_SEQ;
        tObj.USER_ID = serviceLib.getUserInfo().USER_ID;
        tObj.DEST_DATA = [];

        var tChkFactory = 0;
        var objChkFactory = {};
        for (const col of selectedTBL_KSV_ORDER_MEM) {
            var tObj1 = { ...col };
            delete tObj1.id;
            delete tObj1.__typename;

            let stockFactoryCd = tObj1.FACTORY_CD;
            if (tObj1.STOCK_IDX) {
                const stockFactoryRows =
                    await serviceS030503_STOCK_CHECK.mgrQueryFactoryByStockIdx(
                        tObj1.STOCK_IDX,
                    );
                if (typeof stockFactoryRows?.graphQLErrors === "undefined") {
                    if (Array.isArray(stockFactoryRows) && stockFactoryRows.length > 0) {
                        stockFactoryCd = stockFactoryRows[0].FACTORY_CD || stockFactoryCd;
                    }
                }
            }

            tObj1.STOCK_FACTORY = stockFactoryCd;

            console.log(stockFactoryCd, tOrderMst.FACTORY_CD);

            if (stockFactoryCd !== tOrderMst.FACTORY_CD) {
                tChkFactory += 1;
                objChkFactory = { ...tObj1, FACTORY_CD: stockFactoryCd };
            }

            if (tObj1.USE_PO_TYPE_N !== "Using Stock") tFlag = 1;
            tObj.DEST_DATA.push(tObj1);
        }

        tObj.SRC_DATA = [];

        if (tFlag === 1) {
            alert("Use type이 재고적용인것을 선택하세요<br><br>Select Use type as Inventory application");
            return;
        }

        if (tChkFactory > 1) {
            alert("Po Factory와 Stock Factory 가 다른것은 한개씩만 Cancel가능합니다.<br><br>Only one can be canceled if the Po Factory and Stock Factory are different.");
            return;
        } else if (tChkFactory === 1) {
            var tEditObj = {};
            tEditObj.PO_CD = tQryObj.PO_CD;
            tEditObj.MATL_CD = objChkFactory.MATL_CD;
            tEditObj.MATL_NAME = objChkFactory.MATL_NAME;
            tEditObj.COLOR = objChkFactory.COLOR;
            tEditObj.SPEC = objChkFactory.SPEC;
            tEditObj.PO_FACTORY = tOrderMst.FACTORY_CD;
            tEditObj.STOCK_FACTORY = objChkFactory.FACTORY_CD;

            objChkFactory.PO_CD = tQryObj.PO_CD;
            objChkFactory.NEW_FACTORY_CD = '';
            objChkFactory.PO_FACTORY = tOrderMst.FACTORY_CD;
            objChkFactory.STOCK_FACTORY = objChkFactory.FACTORY_CD;
            setSaveEDT_CHECK_FACTORY(objChkFactory);

            popup_CHECK_FACTORY(tEditObj);
            return;
        }

        setLoadingTBL_KSV_ORDER_MEM(true);
        serviceS030503_STOCK_CHECK.mgrStockCancel(tObj).then((data) => {
            setLoadingTBL_KSV_ORDER_MEM(false);
            if (typeof data.graphQLErrors === "undefined") {
                if (data.length > 0) {
                    alert(data[0].CODE);
                    if (data[0].CODE.includes("SUCC")) {
                        var tInObj = {};
                        tInObj.PO_CD = tQryObj.PO_CD;
                        tInObj.PO_SEQ = tQryObj.PO_SEQ;
                        tInObj.MATL_CD = '';
                        tInObj.USER_ID = '';
                        tInObj.ORDER_CD = "";
                        searchPO_MRP(tInObj);
                    }
                }
            } else {
                console.log(
                    "mgrStockCancel error => " +
                        JSON.stringify(data.graphQLErrors),
                );
                toast.current.show({
                    severity: "success",
                    summary: "use Stock Error",
                    detail: "",
                    life: 3000,
                });
            }
        });
    };

    const process_auto_usestock = () => {
        var tQryObj = { ...dataQRY_KSV_PO_MST };

        var tObj = {};
        tObj.PO_CD = tQryObj.PO_CD;
        tObj.PO_SEQ = tQryObj.PO_SEQ;
        tObj.USER_ID = serviceLib.getUserInfo().USER_ID;

        var tCheck = 0;
        datasQRY_KSV_PO_MST_PO_SEQ.forEach((col, i) => {
            if (
                parseFloat(col.PO_SEQ) < 97 &&
                parseFloat(col.PO_SEQ) > parseFloat(tObj.PO_SEQ)
            )
                tCheck = 1;
        });

        if (tCheck === 1) {
            alert(
                "PO SEQ가 97이하인 마지막 Seq에 대해서만 Auto Stock 가능합니다",
            );
            return;
        }

        setLoadingTBL_KSV_ORDER_MEM(true);
        serviceS030503_STOCK_CHECK.mgrAutoUseStock(tObj).then((data) => {
            setLoadingTBL_KSV_ORDER_MEM(false);
            if (typeof data.graphQLErrors === "undefined") {
                if (data.length > 0) {
                    alert(data[0].CODE);
                    if (data[0].CODE.includes("SUCC")) {
                        var tInObj = {};
                        tInObj.ORDER_CD = "";
                        searchPO_MRP(tInObj);
                    }
                }
            } else {
                console.log(
                    "mgrUseStock error => " +
                        JSON.stringify(data.graphQLErrors),
                );
                toast.current.show({
                    severity: "success",
                    summary: "use Stock Error",
                    detail: "",
                    life: 3000,
                });
            }
        });
    };

    const confirmUseStock = async () => {
        var tQryObj = { ...dataQRY_KSV_PO_MST };

        if (!tQryObj.PO_LOG_TYPE || tQryObj.PO_LOG_TYPE === ' ')  {
            alert (`Confirm Reason은 필수 입력입니다. `);
            return;
        }

        var tObj = {};
        tObj.PO_CD = tQryObj.PO_CD;
        tObj.PO_SEQ = tQryObj.PO_SEQ;
        tObj.USER_ID = serviceLib.getUserInfo().USER_ID;
        tObj.PO_LOG_TYPE = tQryObj.PO_LOG_TYPE;

        setDatasTBL_KSV_ORDER_MEM([]);
        setSelectedTBL_KSV_ORDER_MEM([]);

        //setIsProgress(true);
        setLoadingTBL_KSV_ORDER_MEM(true);
        serviceS030503_STOCK_CHECK.mgrConfirmUseStock(tObj).then( async (data) => {
            setLoadingTBL_KSV_ORDER_MEM(false);
            if (typeof data.graphQLErrors === "undefined") {
                if (data.length > 0) {
                    alert(data[0].CODE);
                    if (data[0].CODE.includes("SUCC")) {
                        console.log("SUCC condition passed");

                        requestS0305Requery();

                        const rawSelInfo = sessionStorage.getItem("S0305_SEL_INFO");
                        let nextSelInfo = {};
                        try {
                            nextSelInfo = rawSelInfo ? JSON.parse(rawSelInfo) : {};
                        } catch (error) {
                            console.log(`S0305_SEL_INFO parse error => ${error}`);
                        }
                        sessionStorage.setItem(
                            "S0305_SEL_INFO",
                            JSON.stringify(nextSelInfo),
                        );
                        sessionStorage.setItem(
                            S0305_AUTO_PO_FIX_KEY,
                            JSON.stringify({
                                PO_CD: tObj.PO_CD,
                                PO_SEQ: tObj.PO_SEQ,
                            }),
                        );

                        var tCols = data[0].CODE.split(":");
                        console.log("tCols:", tCols, "tCols.length:", tCols.length, "PO_SEQ:", tObj.PO_SEQ);
                        // 항상 close_tabs 실행 (조건 단순화)
                        if (parseInt(tObj.PO_SEQ) < 97) {
                            console.log("PO_SEQ < 97 condition passed");
                            console.log("dataKSV_PO_MST.PO_STATUS:", dataKSV_PO_MST.PO_STATUS);
                            if (parseInt(dataKSV_PO_MST.PO_STATUS) >= 4) {
                                console.log("PO_STATUS >= 4, entering first branch");
                                tObj.BUYER_CD = "";
                                tObj.FACTORY_CD = "";
                                setIsProgress(false);
                                
                                // close_tabs 실행
                                setTimeout(() => {
                                    console.log("Sending close_tabs_and_activate_mrp_manager message from PO_STATUS >= 4 branch");
                                    window.parent.postMessage(
                                        {
                                            func: "close_tabs_and_activate_mrp_manager",
                                            message: {
                                                tabsToClose: ["Revise", "Stock Check"],
                                                activateTab: "MRP Manager",
                                            },
                                        },
                                        "*",
                                    );
                                }, 100);
                                // search_EXCEL_MRP_PACK(tObj);
                            } else {
                                console.log("PO_STATUS < 4, entering close_tabs branch");
                                var tSaveInfo0 =
                                    sessionStorage.getItem("S0305_SEL_INFO");
                                var tSaveInfo = JSON.parse(tSaveInfo0);
                                tSaveInfo.PO_STATUS = "3";
                                tSaveInfo.PO_STATUS_NAME = "Check Stock";
                                sessionStorage.setItem(
                                    "S0305_SEL_INFO",
                                    JSON.stringify(tSaveInfo),
                                );

                                // 상단 PO# 입력 필드에 적용
                                setDataQRY_KSV_PO_MST((prev) => ({
                                    ...prev,
                                    PO_CD: tObj.PO_CD,
                                }));

                                setIsProgress(false);
                                
                                // 100ms 대기 후 탭 전환
                                setTimeout(() => {
                                    console.log("Sending close_tabs_and_activate_mrp_manager message");
                                    window.parent.postMessage(
                                        {
                                            func: "close_tabs_and_activate_mrp_manager",
                                            message: {
                                                tabsToClose: ["Revise", "Stock Check"],
                                                activateTab: "MRP Manager",
                                            },
                                        },
                                        "*",
                                    );
                                }, 100);
                            }
                        } else {
                            console.log("PO_SEQ >= 97, skip close_tabs");
                            setIsProgress(false);
                            // popup_MRP_MANAGER();
                        }
                    } else {
                        console.log("SUCC condition FAILED");
                        setIsProgress(false);
                    }
                }
            } else {
                setIsProgress(false);
                console.log(
                    "mgrUseStock error => " +
                        JSON.stringify(data.graphQLErrors),
                );
                toast.current.show({
                    severity: "success",
                    summary: "Confirm use Stock Error",
                    detail: "",
                    life: 3000,
                });
            }
        });
    };

    const searchPO_MRP = (argData) => {
        var tQryObj = {};
        if (typeof argData.PO_CD !== "undefined") tQryObj = { ...argData };
        else tQryObj = { ...dataQRY_KSV_PO_MST };
        var tUserInfo = serviceLib.getUserInfo();

        var tObj1 = {};
        tObj1.PO_CD = tQryObj.PO_CD;
        tObj1.PO_SEQ = tQryObj.PO_SEQ;
        tObj1.MATL_CD = tQryObj.MATL_CD;
        tObj1.USER_ID = tUserInfo.USER_ID;
        if (typeof argData.ORDER_CD !== "undefined")
            tObj1.ORDER_CD = argData.ORDER_CD;
        else tObj1.ORDER_CD = "";

        setSelectedTBL_KSV_ORDER_MEM([]);
        //setDatasTBL_KSV_ORDER_MEM([]);

        setLoadingTBL_KSV_ORDER_MEM(true);

        // 1
        serviceS030503_STOCK_CHECK
            .mgrQueryTBL_KSV_PO_MRP(tObj1)
            .then((data) => {
                setLoadingTBL_KSV_ORDER_MEM(false);
                if (typeof data.graphQLErrors === "undefined") {
                    console.log(
                        "mgrQueryTBL_KSV_PO_MRP call => " + data.length,
                    );

                    var tArray1 = data.map((col, i) => {
                        var tObj = { ...col };
                        tObj.id = i + 1;
                        return tObj;
                    });
                    setDatasTBL_KSV_ORDER_MEM(tArray1);
                } else {
                    console.log(
                        "mgrQueryTBL_KSV_PO_MRP error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });

        var tQry = {};
        tQry.PO_CD = tQryObj.PO_CD;
        tQry.PO_SEQ = tQryObj.PO_SEQ;
        tQry.MATL_CD = "";
        setLoadingTBL_KSV_ORDER_MST(true);
        serviceS030503_STOCK_CHECK.mgrQueryTBL_KSV_PO_MST(tQry).then((data) => {
            setLoadingTBL_KSV_ORDER_MST(false);
            if (typeof data.graphQLErrors === "undefined") {
                console.log("mgrQueryTBL_KSV_PO_MST call => " + data.length);
                var tArray = data.map((col, i) => {
                    var tObj = { ...col };
                    tObj.id = i + 1;
                    return tObj;
                });

                var tPoLogType = '';
                if (tArray.length > 0) tPoLogType = tArray[0].PO_LOG_TYPE;

                if (datasQRY_KSV_PO_MST_PO_LOG_TYPE.length && datasQRY_KSV_PO_MST_PO_LOG_TYPE.length > 0) {
                    var selPoLogType = { ...datasQRY_KSV_PO_MST_PO_LOG_TYPE[0] };
                    datasQRY_KSV_PO_MST_PO_LOG_TYPE.forEach((col, i) => {
                        if (col.CD_CODE === tPoLogType) selPoLogType = { ...col };
                    });
                    setDataQRY_KSV_PO_MST_PO_LOG_TYPE(selPoLogType);
                    setDataQRY_KSV_PO_MST((prev) => ({
                        ...prev,
                        PO_LOG_TYPE: selPoLogType.CD_CODE || "",
                    }));
                }

                setDatasTBL_KSV_ORDER_MST(tArray);
            } else {
                console.log(
                    "mgrQueryTBL_KSV_PO_MST error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });
    };

    const onRowClick1TBL_KSV_ORDER_MEM = (argData0) => {
        var argData = {};

        if (typeof argData0.length !== "undefined") {
            argData = argData0[0];
        } else {
            argData = argData0;
        }

        let argTBL_KSV_ORDER_MEM = argData;

        setDataTBL_KSV_ORDER_MEM(argTBL_KSV_ORDER_MEM);
    };

    const syncQRYFromTBL_KSV_ORDER_MEM = (argData) => {
        var tObj0 = { ...emptyQRY_KCD_MATL_MST };
        tObj0.MATL_NAME = argData.MATL_NAME;
        tObj0.MATL_CD = argData.MATL_CD;
        tObj0.FACTORY_CD = argData.FACTORY_CD;
        setDataQRY_KCD_MATL_MST(tObj0);

        editQRY_KCD_MATL_MST_FACTORY_CD(tObj0.FACTORY_CD);
        // editQRY_KCD_MATL_MST_VENDOR_CD(tObj0.VENDOR_CD);
        editQRY_KCD_MATL_MST_MATL_KIND2(tObj0.MATL_KIND2);
        editQRY_KCD_MATL_MST_STATUS_CD(tObj0.STATUS_CD);
    };

    const onSingleSelectAreaClickTBL_KSV_ORDER_MEM = (rowData) => {
        setFlagSelectModeTBL_KSV_ORDER_MEM(false);
        setSelectedTBL_KSV_ORDER_MEM([rowData]);
        onRowClick1TBL_KSV_ORDER_MEM(rowData);
        syncQRYFromTBL_KSV_ORDER_MEM(rowData);
    };

    const singleSelectAreaBodyTBL_KSV_ORDER_MEM = (field) => {
        return (rowData) => (
            <span
                style={{ display: "block", width: "100%", cursor: "pointer" }}
                onClick={(e) => {
                    e.stopPropagation();
                    onSingleSelectAreaClickTBL_KSV_ORDER_MEM(rowData);
                }}
            >
                {rowData[field]}
            </span>
        );
    };

    const onRowClickTBL_KSV_ORDER_MEM = (event) => {
        if (flagSelectModeTBL_KSV_ORDER_MEM) {
            setFlagSelectModeTBL_KSV_ORDER_MEM(false);
            return;
        }

        var argData = { ...event.data };
        syncQRYFromTBL_KSV_ORDER_MEM(argData);
        console.log(argData);

        // setDatasTBL_KCD_MATL_MST([]);
        // setSelectedTBL_KCD_MATL_MST([]);

        // let argTBL_KSV_ORDER_MEM = event.data;
        // if (flagSelectModeTBL_KSV_ORDER_MEM) return;

        // Service : NawooAll:mgrQueryTBL_KSV_ORDER_MEM
    };

    /**TABLE KSV_ORDER_MST */
    // DEFINE DATAGRID : TBL_KSV_ORDER_MST
    const [datasTBL_KSV_ORDER_MST, setDatasTBL_KSV_ORDER_MST] = useState([]);
    const dt_TBL_KSV_ORDER_MST = useRef(null);
    const [dataTBL_KSV_ORDER_MST, setDataTBL_KSV_ORDER_MST] = useState(
        emptyTBL_KSV_ORDER_MST,
    );
    const [selectedTBL_KSV_ORDER_MST, setSelectedTBL_KSV_ORDER_MST] = useState(
        [],
    );
    const [
        flagSelectModeTBL_KSV_ORDER_MST,
        setFlagSelectModeTBL_KSV_ORDER_MST,
    ] = useState(false);
    const [loadingTBL_KSV_ORDER_MST, setLoadingTBL_KSV_ORDER_MST] =
        useState(false);

    // DATAGRID CODE : TBL_KSV_ORDER_MST

    const onRowClick1TBL_KSV_ORDER_MST = (argData0) => {
        var argData = {};

        if (typeof argData0.length !== "undefined") {
            argData = argData0[0];
        } else {
            argData = argData0;
        }

        let argTBL_KSV_ORDER_MST = argData;

        setDataTBL_KSV_ORDER_MST(argTBL_KSV_ORDER_MST);

        var tInObj = {};
        tInObj.ORDER_CD = argData.ORDER_CD;

        searchPO_MRP(tInObj);
    };

    const onRowClickTBL_KSV_ORDER_MST = (event) => {
        let argTBL_KSV_ORDER_MST = event.data;
        if (flagSelectModeTBL_KSV_ORDER_MST) return;
    };

    useEffect(() => {
        let tPO_CD = ""; // PO_CD
        let tPO_SEQ = "1"; // PO_SEQ
        let tMATL_CD = ""; // MATL_CD

        var tUrls = window.location.href.split("?");
        if (tUrls.length <= 1) {
        } else {
            var tParams1 = tUrls[1].split("&");
            var tParams2 = tParams1.forEach((col, i) => {
                var tObj = {};
                var tCols = col.split("=");
                if (tCols[0].includes("PO_CD")) {
                    tObj.key = tCols[0];
                    tObj.value = tCols[1];
                    console.log(tObj);
                    tPO_CD = tObj.value;
                }
                if (tCols[0].includes("PO_SEQ")) {
                    tObj.key = tCols[0];
                    tObj.value = tCols[1];
                    console.log(tObj);
                    tPO_SEQ = tObj.value;
                }
                if (tCols[0].includes("MATL_CD")) {
                    tObj.key = tCols[0];
                    tObj.value = tCols[1];
                    console.log(tObj);
                    tMATL_CD = tObj.value;
                }
            });
            // console.log(tParams2);
        }

        var tQryObj = { ...dataQRY_KSV_PO_MST };
        tQryObj.PO_CD = tPO_CD;
        tQryObj.PO_SEQ = tPO_SEQ;
        tQryObj.MATL_CD = tMATL_CD;
        setDataQRY_KSV_PO_MST(tQryObj);

        var tObj = {};
        tObj.PO_CD = tPO_CD;
        tObj.PO_SEQ = tPO_SEQ;
        tObj.MATL_CD = tMATL_CD;

        let codePoLogTypes;

        serviceS030503_STOCK_CHECK.mgrQuery_CODE(tObj).then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                console.log("mgrQuery_CODE call => " + data.VENDOR_CD.length);

                setDatasQRY_KCD_MATL_MST_FACTORY_CD(data.FACTORY_CD);
                setDataQRY_KCD_MATL_MST_FACTORY_CD(data.FACTORY_CD[0]);

                setDatasQRY_KCD_MATL_MST_MATL_KIND2(data.TYPE2);
                setDataQRY_KCD_MATL_MST_MATL_KIND2(data.TYPE2[0]);

                setDatasQRY_KCD_MATL_MST_STATUS_CD(data.STATUS_CD);
                setDataQRY_KCD_MATL_MST_STATUS_CD(data.STATUS_CD[0]);

                setDatasQRY_KSV_PO_MST_ORDER_STATUS(data.PO_STATUS);
                setDataQRY_KSV_PO_MST_ORDER_STATUS(data.PO_STATUS[0]);

                setDatasQRY_KSV_PO_MST_PO_LOG_TYPE(data.PO_LOG_TYPE);
                setDataQRY_KSV_PO_MST_PO_LOG_TYPE(data.PO_LOG_TYPE[0]);
                setDataQRY_KSV_PO_MST((prev) => ({
                    ...prev,
                    PO_LOG_TYPE: (data.PO_LOG_TYPE[0] && data.PO_LOG_TYPE[0].CD_CODE) || "",
                }));

                setDatasQRY_KSV_PO_MST_PO_SEQ(data.PO_SEQ);

                setLoadingTBL_KSV_ORDER_MST(true);

                serviceS030503_STOCK_CHECK
                    .mgrQueryTBL_KSV_PO_MST(tObj)
                    .then((data2) => {
                        setLoadingTBL_KSV_ORDER_MST(false);

                        if (typeof data2.graphQLErrors === "undefined") {
                            console.log(
                                "mgrQueryTBL_KSV_PO_MST call => " +
                                    data2.length,
                            );

                            var tArray = data2.map((col, i) => {
                                var tObj = { ...col };
                                tObj.id = i + 1;
                                return tObj;
                            });

                            setDatasTBL_KSV_ORDER_MST(tArray);

                            if (tArray.length > 0) {
                                console.log(tArray[0]);

                                //setSelectedTBL_KSV_ORDER_MST(tArray[0]);

                                const filtered = data.PO_LOG_TYPE.filter(
                                    (col) =>
                                        col.CD_NAME === tArray[0].PO_LOG_TYPE_N,
                                );
                                console.log(filtered);
                                if (filtered.length > 0) {
                                    setDataQRY_KSV_PO_MST_PO_LOG_TYPE(
                                        filtered[0],
                                    );
                                    setDataQRY_KSV_PO_MST((prev) => ({
                                        ...prev,
                                        PO_LOG_TYPE: filtered[0].CD_CODE || "",
                                    }));
                                }
                            }
                        } else {
                            console.log(
                                "mgrQueryTBL_KSV_PO_MST error => " +
                                    JSON.stringify(data2.graphQLErrors),
                            );
                        }
                    });

                var tObj2 = {};

                data.PO_SEQ.forEach((col) => {
                    if (parseInt(col.PO_SEQ) === parseInt(tPO_SEQ)) {
                        tObj2 = { ...col };
                    }
                });

                if (typeof tObj2.PO_SEQ !== "undefined") {
                    setDataQRY_KSV_PO_MST_PO_SEQ(tObj2);
                } else {
                    setDataQRY_KSV_PO_MST_PO_SEQ(data.PO_SEQ[0]);
                }

                setDataKSV_PO_MST(data.PO_MST[0]);
            } else {
                console.log(
                    "mgrQueryTBL_KSV_PO_MST error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });

        var tInObj = {};
        tInObj.PO_CD = tQryObj.PO_CD;
        tInObj.PO_SEQ = tQryObj.PO_SEQ;
        tInObj.MATL_CD = tQryObj.MATL_CD;
        tInObj.USER_ID = "";
        tInObj.ORDER_CD = "";
        //searchPO_MRP(tInObj);
    }, []);

    const getStockMatlCdMismatchClass = (rowData) => {
        const orderMatlCd = (rowData.MATL_CD || "").trim();
        const stockMatlCd = (rowData.PO_MATL_CD || "").trim();
        return stockMatlCd !== "" && stockMatlCd !== "재고발주" && orderMatlCd !== stockMatlCd
            ? "stock-matl-mismatch"
            : "";
    };

    useEffect(() => {
        if (!selectedTBL_KSV_ORDER_MST[0]) return;

        const filtered = datasQRY_KSV_PO_MST_PO_LOG_TYPE.filter(
            (col) => col.CD_NAME === selectedTBL_KSV_ORDER_MST[0].PO_LOG_TYPE_N,
        );

        if (filtered.length > 0) {
            setDataQRY_KSV_PO_MST_PO_LOG_TYPE(filtered[0]);
        }
    }, [selectedTBL_KSV_ORDER_MST]);

    return (
        <div className="af-div-main">
            <div
                className="af-div-first"
                style={{ width: "123rem", height: "3rem" }}
            >
                <span className="af-span-3-0" style={{ width: "14rem" }}>
                    <p className="af-span-p" style={{ width: "4rem" }}>PO#</p>
                    <div className="af-span-div" style={{ width: "9rem" }}>
                        <InputText
                            disabled
                            style={{ width: "9rem" }}
                            id="id_PO_CD"
                            value={dataQRY_KSV_PO_MST.PO_CD}
                            onChange={(e) =>
                                onInputChangeQRY_KSV_PO_MST_PO_CD(e, "PO_CD")
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "12rem" }}>
                    <p className="af-span-p" style={{ width: "4rem" }}>Po Seq</p>
                    <div className="af-span-div" style={{ width: "7rem" }}>
                        <Dropdown
                            style={{ width: "7rem" }}
                            id="id_FACTORY_CD"
                            value={dataQRY_KSV_PO_MST_PO_SEQ}
                            onChange={(e) =>
                                onDropdownChangeQRY_KSV_PO_MST_PO_SEQ(
                                    e,
                                    "PO_SEQ",
                                )
                            }
                            options={datasQRY_KSV_PO_MST_PO_SEQ}
                            optionLabel="PO_SEQ_N"
                            placeholder=""
                            editable
                        ></Dropdown>
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "30rem" }}>
                    <p className="af-span-p" style={{ width: "6rem" }}>Reason</p>
                    <div className="af-span-div" style={{ width: "23rem" }}>
                        <Dropdown
                            style={{ width: "23rem" }}
                            id="id_FACTORY_CD"
                            value={dataQRY_KSV_PO_MST_PO_LOG_TYPE}
                            onChange={(e) =>
                                onDropdownChangeQRY_KSV_PO_MST_PO_LOG_TYPE(
                                    e,
                                    "PO_LOG_TYPE",
                                )
                            }
                            options={datasQRY_KSV_PO_MST_PO_LOG_TYPE}
                            optionLabel="CD_NAME"
                            placeholder=""
                            editable
                        ></Dropdown>
                    </div>
                </span>

                <span className="af-span-3-0" style={{ width: "11rem" }}>
                    <div className="af-span-div-btn" style={{ width: "10rem" }}>
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
                            style={{ width: "10rem" }}
                            className="p-button-text"
                            onClick={searchPO_MRP}
                        />
                    </div>
                </span>

                <span className="af-span-3-0" style={{ width: "11rem" }}>
                    <div className="af-span-div-btn" style={{ width: "10rem" }}>
                        <Button
                            label="Auto Stock"
                            style={{ width: "10rem" }}
                            className="p-button-text"
                            onClick={process_auto_usestock}
                        />
                    </div>
                </span>

                <span className="af-span-3-0" style={{ width: "11rem" }}>
                    <div className="af-span-div-btn" style={{ width: "10rem" }}>
                        <Button
                            label="PO Fix"
                            style={{ width: "10rem" }}
                            className="p-button-text"
                            onClick={confirmUseStock}
                        />
                    </div>
                </span>
            </div>
            <div
                className="af-div-first"
                style={{ width: "100%", height: "10rem" }}
            >
                <AFDataTable preventUnrelatedRerender
                    ref={dt_TBL_KSV_ORDER_MST}
                    size="small"
                    value={datasTBL_KSV_ORDER_MST}
                    tableStyle={{ tableLayout: "fixed" }}
                    resizableColumns
                    columnResizeMode="expand"
                    loading={loadingTBL_KSV_ORDER_MST}
                    showGridlines
                    selectionMode="checkbox"
                    selection={selectedTBL_KSV_ORDER_MST}
                    onSelectionChange={(e) => {
                        /*
                        setFlagSelectModeTBL_KSV_ORDER_MST(true);
                        setSelectedTBL_KSV_ORDER_MST(e.value);
                        console.log(
                            "selected length:" +
                                selectedTBL_KSV_ORDER_MST.length,
                        );
                        onRowClick1TBL_KSV_ORDER_MST(e.value);
                        */
                    }}
                    onRowClick={onRowClickTBL_KSV_ORDER_MST}
                    dataKey="id"
                    className="datatable-responsive"
                    virtualScrollerOptions={{ itemSize: 20 }}
                    emptyMessage=" " //header={headerTBL_KSV_ORDER_MST}
                    responsiveLayout="scroll"
                    scrollable
                    scrollHeight="10rem"
                >
                    <AFColumn field="ORDER_CD" headerClassName="t-header" header="Order" style={{ width: "8rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="STYLE_NAME" headerClassName="t-header" header="Style" style={{ width: "16rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="BUYER_NAME" headerClassName="t-header" header="Buyer" style={{ width: "8rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="TOT_CNT" headerClassName="t-header" header="Qty" style={{ width: "5rem", flexBasis: "auto" }} body={(rowData) => serviceLib.numWithCommas(rowData.TOT_CNT) } bodyStyle={{ textAlign: "right" }} ></AFColumn>
                    <AFColumn field="DUE_DATE" headerClassName="t-header" header="Due Date" style={{ width: "8rem", flexBasis: "auto" }} body={(rowData) => serviceLib.dateFormat(rowData.DUE_DATE) } ></AFColumn>
                    <AFColumn field="FACTORY_NAME" headerClassName="t-header" header="Factory" style={{ width: "15rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="PO_LOG_TYPE_N" headerClassName="t-header" header="Log" style={{ width: "15rem", flexBasis: "auto" }} ></AFColumn>
                    {/*<AFColumn field="PO_LOG_TYPE" headerClassName='t-header' header="Log#" style={{ width: '15rem' ,flexBasis:'auto' }} ></AFColumn>*/}
                </AFDataTable>
            </div>
            <div
                className="af-div-first"
                style={{ width: "123rem", height: "26rem", paddingTop: "0.7rem" }}
            >
                <AFDataTable preventUnrelatedRerender
                    ref={dt_TBL_KSV_ORDER_MEM}
                    size="small"
                    value={datasTBL_KSV_ORDER_MEM}
                    tableStyle={{ tableLayout: "fixed" }}
                    resizableColumns
                    columnResizeMode="expand"
                    showGridlines
                    selectionMode="checkbox"
                    selection={selectedTBL_KSV_ORDER_MEM}
                    loading={loadingTBL_KSV_ORDER_MEM}
                    onSelectionChange={(e) => {
                        setFlagSelectModeTBL_KSV_ORDER_MEM(true);
                        setSelectedTBL_KSV_ORDER_MEM(e.value);
                        onRowClick1TBL_KSV_ORDER_MEM(e.value);
                    }}
                    onRowClick={onRowClickTBL_KSV_ORDER_MEM}
                    dataKey="id"
                    className="datatable-responsive"
                    emptyMessage=" " //header={headerTBL_KSV_ORDER_MEM}
                    responsiveLayout="scroll"
                    scrollable
                    scrollHeight="10rem"
                >
                    <AFColumn selectionMode="multiple" field="__checkbox__" reorderable={false} headerClassName="t-header" headerStyle={{ width: "3rem" }} ></AFColumn>
                    <AFColumn field="STOCK_CHK" className="text-center" headerClassName="t-header" header="Stock.Chk" style={{ width: "3rem", flexBasis: "auto" }} body={(rowData) => { if ((rowData.STOCK_CHK || "").trim() === "*") { return <i className="pi pi-check"></i>; } }} />
                    <AFColumn field="PO_SEQ" headerClassName="t-header" header="Po Seq" style={{ width: "8rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="ORDER_CD" headerClassName="t-header" header="Order#" style={{ width: "8rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="MATL_CD" headerClassName="t-header" header="Matl#" style={{ width: "8rem", flexBasis: "auto" }} body={singleSelectAreaBodyTBL_KSV_ORDER_MEM("MATL_CD")} ></AFColumn>
                    <AFColumn field="MATL_NAME" headerClassName="t-header" header="Description" style={{ width: "15rem", flexBasis: "auto" }} body={singleSelectAreaBodyTBL_KSV_ORDER_MEM("MATL_NAME")} ></AFColumn>
                    <AFColumn field="COLOR" headerClassName="t-header" header="Color" style={{ width: "10rem", flexBasis: "auto" }} body={singleSelectAreaBodyTBL_KSV_ORDER_MEM("COLOR")} ></AFColumn>
                    <AFColumn field="SPEC" headerClassName="t-header" header="Spec" style={{ width: "15rem", flexBasis: "auto" }} body={singleSelectAreaBodyTBL_KSV_ORDER_MEM("SPEC")} ></AFColumn>
                    <AFColumn field="UNIT" headerClassName="t-header" header="Unit" style={{ width: "5rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="PO_MATL_CD" headerClassName="t-header" header="Stock" style={{ width: "8rem", flexBasis: "auto" }} bodyClassName={getStockMatlCdMismatchClass} ></AFColumn>
                    <AFColumn field="RACK" headerClassName="t-header" header="Rack" style={{ width: "8rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="USE_PO_TYPE_N" headerClassName="t-header" header="I/O Stat" style={{ width: "9rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="USE_QTY" headerClassName="t-header" header="MRP Qty" style={{ width: "8rem", flexBasis: "auto" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.USE_QTY) } ></AFColumn>
                    <AFColumn field="PO_QTY" headerClassName="t-header" header="Po Qty" style={{ width: "5rem", flexBasis: "auto" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.PO_QTY) } ></AFColumn>
                    <AFColumn field="SUM_QTY" headerClassName="t-header" header="Bal Qty" style={{ width: "5rem", flexBasis: "auto" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.SUM_QTY) } ></AFColumn>
                    <AFColumn field="VENDOR_NAME" headerClassName="t-header" header="Supplier" style={{ width: "14rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="MRP_SEQ" headerClassName="t-header" header="Mrp Seq" style={{ width: "7rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="MATL_SEQ" headerClassName="t-header" header="Matl Seq" style={{ width: "7rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="MATL_PRICE" headerClassName="t-header" header="M Price" style={{ width: "6rem", flexBasis: "auto" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.MATL_PRICE) } ></AFColumn>
                    <AFColumn field="CURR_CD" headerClassName="t-header" header="Curr" style={{ width: "5rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="PO_MRP_SEQ" headerClassName="t-header" header="Po Mrp Seq" style={{ width: "8rem", flexBasis: "auto" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.PO_MRP_SEQ) } ></AFColumn>
                    <AFColumn field="REG_DATETIME" headerClassName="t-header" header="Reg Date" style={{ width: "10rem", flexBasis: "auto" }} body={(rowData) => serviceLib.dateFormatHMS(rowData.REG_DATETIME) } ></AFColumn>
                    <AFColumn field="STOCK_IDX" headerClassName="t-header" header="Stock Idx" style={{ width: "8rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="ROOT_IDX" headerClassName="t-header" header="Root Idx" style={{ width: "9rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="NEW_FACTORY_CD" headerClassName="t-header" header="Stock Factory" style={{ width: "9rem", flexBasis: "auto" }} ></AFColumn>
                </AFDataTable>
            </div>
            <div className="af-div-first" style={{ width: "100%" }}>
                <span className="af-span-3-0" style={{ width: "23rem" }}>
                    <p className="af-span-p" style={{ width: "7rem" }}>Matl Name</p>
                    <div className="af-span-div" style={{ width: "15rem" }}>
                        <InputText
                            style={{ width: "15rem" }}
                            id="id_MATL_NAME"
                            value={dataQRY_KCD_MATL_MST.MATL_NAME}
                            onChange={(e) =>
                                onInputChangeQRY_KCD_MATL_MST_MATL_NAME(
                                    e,
                                    "MATL_NAME",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "20rem" }}>
                    <p className="af-span-p" style={{ width: "4rem" }}>Color</p>
                    <div className="af-span-div" style={{ width: "15rem" }}>
                        <InputText
                            style={{ width: "15rem" }}
                            id="id_COLOR"
                            value={dataQRY_KCD_MATL_MST.COLOR}
                            onChange={(e) =>
                                onInputChangeQRY_KCD_MATL_MST_COLOR(e, "COLOR")
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "14rem" }}>
                    <p className="af-span-p" style={{ width: "4rem" }}>Matl#</p>
                    <div className="af-span-div" style={{ width: "9rem" }}>
                        <InputText
                            style={{ width: "9rem" }}
                            id="id_MATL_CD"
                            value={dataQRY_KCD_MATL_MST.MATL_CD}
                            onChange={(e) =>
                                onInputChangeQRY_KCD_MATL_MST_MATL_CD(
                                    e,
                                    "MATL_CD",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "14rem" }}>
                    <p className="af-span-p" style={{ width: "4rem" }}>Rack</p>
                    <div className="af-span-div" style={{ width: "9rem" }}>
                        <InputText
                            style={{ width: "9rem" }}
                            id="id_RACK"
                            value={dataQRY_KCD_MATL_MST.RACK}
                            onChange={(e) =>
                                onInputChangeQRY_KCD_MATL_MST_RACK(e, "RACK")
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "23rem" }}>
                    <p className="af-span-p" style={{ width: "4rem" }}>Factory</p>
                    <div className="af-span-div" style={{ width: "18rem" }}>
                        <Dropdown
                            style={{ width: "18rem" }}
                            id="id_FACTORY_CD"
                            value={dataQRY_KCD_MATL_MST_FACTORY_CD}
                            onChange={(e) =>
                                onDropdownChangeQRY_KCD_MATL_MST_FACTORY_CD(
                                    e,
                                    "FACTORY_CD",
                                )
                            }
                            options={datasQRY_KCD_MATL_MST_FACTORY_CD}
                            optionLabel="FACTORY_NAME"
                            placeholder=""
                            editable
                        ></Dropdown>
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "9rem" }}>
                    <div className="af-span-div-btn" style={{ width: "8rem" }}>
                        <Button
                            style={{ width: "8rem" }}
                            label={<span>Search</span>}
                            id="btnSearch"
                            className="p-button-text"
                            onClick={searchSTOCK_MATL}
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "9rem" }}>
                    <div className="af-span-div-btn" style={{ width: "8rem" }}>
                        <Button
                            style={{ width: "8rem" }}
                            label="Reset"
                            className="p-button-text"
                            onClick={resetQRY_KCD_MATL_MST}
                        />
                    </div>
                </span>

                <div>
                    <span className="af-span-3" style={{ width: "23rem" }}>
                        <p className="af-span-p" style={{ width: "7rem" }}>Spec</p>
                        <div className="af-span-div" style={{ width: "15rem" }}>
                            <InputText
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "inline-block",
                                    width: "15rem",
                                }}
                                id="id_SPEC"
                                value={dataQRY_KCD_MATL_MST.SPEC}
                                onChange={(e) =>
                                    onInputChangeQRY_KCD_MATL_MST_SPEC(
                                        e,
                                        "SPEC",
                                    )
                                }
                            />
                        </div>
                    </span>
                    <span className="af-span-3" style={{ width: "20rem" }}>
                        <p className="af-span-p" style={{ width: "4rem" }}>Supplier</p>
                        <div className="af-span-div" style={{ width: "15rem" }}>
                            <InputText
                                style={{ width: "15rem" }}
                                id="id_SPEC"
                                value={dataQRY_KCD_MATL_MST.VENDOR_CD}
                                onChange={(e) =>
                                    onInputChangeQRY_KCD_MATL_MST_VENDOR_CD(
                                        e,
                                        "VENDOR_CD",
                                    )
                                }
                            />
                        </div>
                    </span>
                    <span className="af-span-3" style={{ width: "14rem" }}>
                        <p className="af-span-p" style={{ width: "4rem" }}>Kind2</p>
                        <div className="af-span-div" style={{ width: "9rem" }}>
                            <Dropdown
                                style={{ width: "9rem" }}
                                id="id_MATL_KIND2"
                                value={dataQRY_KCD_MATL_MST_MATL_KIND2}
                                onChange={(e) =>
                                    onDropdownChangeQRY_KCD_MATL_MST_MATL_KIND2(
                                        e,
                                        "MATL_KIND2",
                                    )
                                }
                                options={datasQRY_KCD_MATL_MST_MATL_KIND2}
                                optionLabel="MATL_TYPE2"
                                placeholder=""
                                filter
                                editable
                            ></Dropdown>
                        </div>
                    </span>
                    <span className="af-span-3" style={{ width: "14rem" }}>
                        <p className="af-span-p" style={{ width: "4rem" }}>Status</p>
                        <div className="af-span-div" style={{ width: "9rem" }}>
                            <Dropdown
                                style={{ width: "9rem" }}
                                id="id_STATUS_CD"
                                value={dataQRY_KCD_MATL_MST_STATUS_CD}
                                onChange={(e) =>
                                    onDropdownChangeQRY_KCD_MATL_MST_STATUS_CD(
                                        e,
                                        "STATUS_CD",
                                    )
                                }
                                options={datasQRY_KCD_MATL_MST_STATUS_CD}
                                optionLabel="CD_NAME"
                                placeholder=""
                                editable
                            ></Dropdown>
                        </div>
                    </span>
                    <span
                        className="af-span-3"
                        style={{ width: "23rem" }}
                    ></span>
                    <span className="af-span-3" style={{ width: "9rem" }}>
                        <div
                            className="af-span-div-btn"
                            style={{ width: "8rem" }}
                        >
                            <Button
                                style={{ width: "8rem" }}
                                label="Use Stock"
                                className="p-button-text"
                                onClick={useStock}
                            />
                        </div>
                    </span>
                    <span className="af-span-3" style={{ width: "9rem" }}>
                        <div
                            className="af-span-div-btn"
                            style={{ width: "8rem" }}
                        >
                            <Button
                                style={{ width: "8rem" }}
                                label="Cancel Stock"
                                className="p-button-text"
                                onClick={cancelStock}
                            />
                        </div>
                    </span>
                </div>
            </div>
            <div
                className="af-div-first"
                style={{ width: "100%", height: "25rem" }}
            >
                <AFDataTable preventUnrelatedRerender
                    ref={dt_TBL_KCD_MATL_MST}
                    editMode="cell"
                    size="small"
                    value={datasTBL_KCD_MATL_MST}
                    tableStyle={{ tableLayout: "fixed" }}
                    resizableColumns
                    columnResizeMode="expand"
                    showGridlines
                    selectionMode="checkbox"
                    loading={loadingTBL_KCD_MATL_MST}
                    selection={selectedTBL_KCD_MATL_MST}
                    // onSelectionChange={(e) => { setSelectedTBL_KCD_MATL_MST(e.value); onRowClick1TBL_KCD_MATL_MST(e.value); }}
                    onSelectionChange={onSelectionChangeTBL_KCD_MATL_MST}
                    onRowClick={onRowClickTBL_KCD_MATL_MST}
                    dataKey="COMPOSITE_KEY"
                    className="datatable-responsive"
                    virtualScrollerOptions={{ itemSize: 17 }}
                    emptyMessage=" " //header={headerTBL_KCD_MATL_MST}
                    responsiveLayout="scroll"
                    scrollable
                    scrollHeight="25rem"
                >
                    <AFColumn selectionMode="multiple" field="__checkbox__" reorderable={false} headerClassName="t-header" headerStyle={{ width: "3rem" }} ></AFColumn>

                    <AFColumn field="PO_CD" headerClassName="t-header" header="PO#" style={{ width: "8rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="PO_SEQ" headerClassName="t-header" header="Seq" style={{ width: "5rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="ORDER_CD" headerClassName="t-header" header="Order" style={{ width: "8rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="MATL_CD" headerClassName="t-header" header="Matl#" style={{ width: "8rem", flexBasis: "auto" }} body={singleSelectAreaBodyTBL_KCD_MATL_MST("MATL_CD")} ></AFColumn>
                    <AFColumn field="VENDOR_NAME" headerClassName="t-header" header="Supplier" style={{ width: "14rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="MATL_NAME" headerClassName="t-header" header="Description" style={{ width: "15rem", flexBasis: "auto" }} body={singleSelectAreaBodyTBL_KCD_MATL_MST("MATL_NAME")} ></AFColumn>
                    <AFColumn field="COLOR" headerClassName="t-header" header="Color" style={{ width: "12rem", flexBasis: "auto" }} body={singleSelectAreaBodyTBL_KCD_MATL_MST("COLOR")} ></AFColumn>
                    <AFColumn field="SPEC" headerClassName="t-header" header="Spec" style={{ width: "15rem", flexBasis: "auto" }} body={singleSelectAreaBodyTBL_KCD_MATL_MST("SPEC")} ></AFColumn>
                    <AFColumn field="REMAIN_QTY" headerClassName="t-header" header="Stock Qty" style={{ width: "7rem", flexBasis: "auto" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.REMAIN_QTY) } ></AFColumn>
                    <AFColumn field="USE_QTY" headerClassName="t-header" header="Use Qty" style={{ color: "green", width: "7rem", flexBasis: "auto", }} editor={(options) => cellEditorTBL_KCD_MATL_MST(options) } onCellEditComplete={onCellEditCompleteTBL_KCD_MATL_MST} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.USE_QTY) } ></AFColumn>
                    <AFColumn field="FACTORY_NAME" headerClassName="t-header" header="Factory" style={{ width: "15rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="AUTHORITY" headerClassName="t-header" header="Authority" style={{ width: "15rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="STOCK_STATUS_N" headerClassName="t-header" header="Status" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="UNIT" headerClassName="t-header" header="Unit" style={{ width: "5rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="RACK" headerClassName="t-header" header="Rack" style={{ width: "7rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="LOCATION" headerClassName="t-header" header="Location" style={{ width: "7rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="USED_QTY" headerClassName="t-header" header="Used Qty" style={{ width: "7rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="VENDOR_CD" headerClassName="t-header" header="Supplier CD" style={{ width: "8rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="STOCK_IDX" headerClassName="t-header" header="Stock Idx" style={{ width: "8rem", flexBasis: "auto" }} ></AFColumn>
                </AFDataTable>
            </div>
            <Toast ref={toast} />
            <Dialog
                visible={createDialog1}
                position="mid-center"
                style={{ width: "44rem", height: "26rem" }}
                header="Factory Check"
                modal={true}
                className="p-fluid"
                onHide={unpopup_CHECK_FACTORY}
            >
                <div
                    className="af-div-first"
                    style={{ width: "41rem", height: "3rem" }}
                >
                    <span className="af-span-3-0" style={{ width: "41rem" }}>
                        <p className="af-span-p" style={{ width: "10rem" }}>PO#</p>
                        <div className="af-span-div" style={{ width: "10rem" }}>
                            <InputText
                                style={{ width: "10rem" }}
                                id="id_NET"
                                value={dataEDT_CHECK_FACTORY.PO_CD}
                                onChange={(e) =>
                                    onInputChangeEDT_CHECK_FACTORY_PO_CD(
                                        e,
                                        "PO_CD",
                                    )
                                }
                            />
                        </div>
                    </span>
                    <span className="af-span-3-0" style={{ width: "41rem" }}>
                        <p className="af-span-p" style={{ width: "10rem" }}>Matl#</p>
                        <div className="af-span-div" style={{ width: "10rem" }}>
                            <InputText
                                style={{ width: "10rem" }}
                                id="id_NET"
                                value={dataEDT_CHECK_FACTORY.MATL_CD}
                                onChange={(e) =>
                                    onInputChangeEDT_CHECK_FACTORY_MATL_CD(
                                        e,
                                        "MATL_CD",
                                    )
                                }
                            />
                        </div>
                    </span>
                    <span className="af-span-3-0" style={{ width: "41rem" }}>
                        <p className="af-span-p" style={{ width: "10rem" }}>Description</p>
                        <div className="af-span-div" style={{ width: "30rem" }}>
                            <InputText
                                style={{ width: "30rem" }}
                                id="id_NET"
                                value={dataEDT_CHECK_FACTORY.MATL_NAME}
                                onChange={(e) =>
                                    onInputChangeEDT_CHECK_FACTORY_MATL_NAME(
                                        e,
                                        "MATL_NAME",
                                    )
                                }
                            />
                        </div>
                    </span> 
                    <span className="af-span-3-0" style={{ width: "41rem" }}>
                        <p className="af-span-p" style={{ width: "10rem" }}>Color</p>
                        <div className="af-span-div" style={{ width: "30rem" }}>
                            <InputText
                                style={{ width: "30rem" }}
                                id="id_NET"
                                value={dataEDT_CHECK_FACTORY.COLOR}
                                onChange={(e) =>
                                    onInputChangeEDT_CHECK_FACTORY_COLOR(
                                        e,
                                        "COLOR",
                                    )
                                }
                            />
                        </div>
                    </span>
                    <span className="af-span-3-0" style={{ width: "41rem" }}>
                        <p className="af-span-p" style={{ width: "10rem" }}>Spec</p>
                        <div className="af-span-div" style={{ width: "30rem" }}>
                            <InputText
                                style={{ width: "30rem" }}
                                id="id_NET"
                                value={dataEDT_CHECK_FACTORY.SPEC}
                                onChange={(e) =>
                                    onInputChangeEDT_CHECK_FACTORY_SPEC(
                                        e,
                                        "SPEC",
                                    )
                                }
                            />
                        </div>
                    </span>
                    <span className="af-span-3-0" style={{ width: "41rem" }}>
                        <p className="af-span-p" style={{ width: "10rem" }}>Po Factory</p>
                        <div className="af-span-div" style={{ width: "30rem" }}>
                            <InputText
                                style={{ width: "30rem" }}
                                id="id_NET"
                                value={dataEDT_CHECK_FACTORY.PO_FACTORY}
                                onChange={(e) =>
                                    onInputChangeEDT_CHECK_FACTORY_PO_FACTORY(
                                        e,
                                        "PO_FACTORY",
                                    )
                                }
                            />
                        </div>
                    </span>
                    <span className="af-span-3-0" style={{ width: "41rem" }}>
                        <p className="af-span-p" style={{ width: "10rem" }}>Stock Factory</p>
                        <div className="af-span-div" style={{ width: "30rem" }}>
                            <InputText
                                style={{ width: "30rem" }}
                                id="id_NET"
                                value={dataEDT_CHECK_FACTORY.STOCK_FACTORY}
                                onChange={(e) =>
                                    onInputChangeEDT_CHECK_FACTORY_STOCK_FACTORY(
                                        e,
                                        "STOCK_FACTORY",
                                    )
                                }
                            />
                        </div>
                    </span>
                    <span className="af-span-3-0" style={{ width: "41rem" }}>
                        <div className="af-span-div" style={{ width: "13rem" }}>
                            <Button
                                label="Po Factory"
                                style={{ width: "13rem" }}
                                className="p-button-text"
                                onClick={process_SEL_PO_FACTORY}
                            />
                        </div>
                        <div className="af-span-div" style={{ width: "13rem" }}>
                            <Button
                                label="Stock Factory"
                                style={{ width: "13rem" }}
                                className="p-button-text"
                                onClick={process_SEL_STOCK_FACTORY}
                            />
                        </div>
                        <div className="af-span-div" style={{ width: "13rem" }}>
                            <Button
                                label="Exit"
                                style={{ width: "13rem" }}
                                className="p-button-text"
                                onClick={unpopup_CHECK_FACTORY}
                            />
                        </div>
                    </span>
                </div>
            </Dialog>
            <Dialog class="loadingModal" visible={isProgress} modal>
                <ProgressSpinner />
            </Dialog>
        </div>
    );
};

const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(S030503_STOCK_CHECK, comparisonFn);
