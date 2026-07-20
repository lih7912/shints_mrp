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
import { ServiceS0305_MRP_MANAGER } from "../service/service_biz/ServiceS0305_MRP_MANAGER";
import { ServiceS030506_NEW_PO_SAMPLE } from "../service/service_biz/ServiceS030506_NEW_PO_SAMPLE";
import { ServiceS030513_MRP_LIST } from "../service/service_biz/ServiceS030513_MRP_LIST";

import "./page_common.scss";

const emptyKCD_CODE = {
    id: 0,
    CD_GROUP: "",
    CD_CODE: "",
    CD_NAME: "",
    CD_FLAG: "",
};

const emptyQRY_KSV_PO_MRP = {
    BUYER_CD: "",
    FACTORY_CD: "",
    PLACE_CD: "",
    PO_CD: "",
    PO_SEQ: "",
    ORDER_CD: "",
    PO_TYPE: "",
    END_REMARK: "",
    PO_DATE: "",
    DELIVERY_DATE: "",
    MATERIAL_DUE_DATE: "",
};

const emptyQRY_KSV_PO_MRP1 = {
    MATL_CD: "",
    MATL_NAME: "",
    COLOR: "",
    SPEC: "",
    VENDOR_CD: "",
    VENDOR_NAME: "",
    FACTORY_CD: "",
};

const emptyTBL_KSV_PO_MRP = {
    MATL_CD: "",
    MATL_NAME: "",
    COLOR: "",
    SPEC: "",
    MATL_PRICE: "0",
    CURR_CD: "",
    UNIT: "",
    COL1: "0",
    PO_QTY: "0",
    CD_NAME: "",
    REASON_TYPE: "",
    FARE_TYPE: "",
    REMARK: "",
    VENDOR_NAME: "",
    COL2: "",
    USE_PO_TYPE: "",
    PO_CD: "",
    PO_SEQ: "0",
    ORDER_CD: "",
    MRP_SEQ: "0",
    MATL_SEQ: "0",
    COL3: "",
    STOCK_IDX: "",
    VENDOR_CD: "",
};

const emptyTBL_KSV_PO_MRP1 = {
    id: 0,
    MATL_CD: "",
    MATL_NAME: "",
    COLOR: "",
    SPEC: "",
    MATL_PRICE: "",
    CURR_CD: "",
    UNIT: "",
    PO_QTY: "",
    USE_PO_TYPE_NAME: "",
    USE_PO_TYPE: "",
    REASON_TYPE: "",
    FARE_TYPE: "",
    REMARK: "",
    VENDOR_NAME: "",
    PO_SEQ: "",
    ORDER_CD: "",
    STOCK_IDX: "",
};

const S030506_NEW_PO_SAMPLE = () => {
    const serviceLibRef = useRef(null);
    if (!serviceLibRef.current) {
        serviceLibRef.current = new ServiceLib();
        serviceLibRef.current.loginConfirm();
    }
    const serviceLib = serviceLibRef.current;
    const serviceS0305_MRP_MANAGERRef = useRef(null);
    if (!serviceS0305_MRP_MANAGERRef.current) serviceS0305_MRP_MANAGERRef.current = new ServiceS0305_MRP_MANAGER();
    const serviceS0305_MRP_MANAGER = serviceS0305_MRP_MANAGERRef.current;
    const serviceS030506_NEW_PO_SAMPLERef = useRef(null);
    if (!serviceS030506_NEW_PO_SAMPLERef.current) serviceS030506_NEW_PO_SAMPLERef.current = new ServiceS030506_NEW_PO_SAMPLE();
    const serviceS030506_NEW_PO_SAMPLE = serviceS030506_NEW_PO_SAMPLERef.current;
    const serviceS030513_MRP_LISTRef = useRef(null);
    if (!serviceS030513_MRP_LISTRef.current) serviceS030513_MRP_LISTRef.current = new ServiceS030513_MRP_LIST();
    const serviceS030513_MRP_LIST = serviceS030513_MRP_LISTRef.current;

    const toast = useRef(null);
    const parent1 = useRef(null);

    /* splitter 관련 */
    const [styleVal, setStyleVal] = useState({ width: "65vw" });

    const resetInput = () => {
        setDataQRY_KSV_PO_MRP(emptyQRY_KSV_PO_MRP);
        setDataQRY_KSV_PO_MRP_BUYER_CD(datasQRY_KSV_PO_MRP_BUYER_CD[0]);
        setDataQRY_KSV_PO_MRP_FACTORY_CD(datasQRY_KSV_PO_MRP_FACTORY_CD[0]);
        setDataQRY_KSV_PO_MRP_PLACE_CD(datasQRY_KSV_PO_MRP_PLACE_CD[0]);
        setDataQRY_KSV_PO_MRP_PO_TYPE(datasQRY_KSV_PO_MRP_PO_TYPE[0]);

        setDataQRY_KSV_PO_MRP1_VENDOR_CD(datasQRY_KSV_PO_MRP1_VENDOR_CD[0]);

        setDatasTBL_KSV_PO_MRP([]);
        setSelectedTBL_KSV_PO_MRP([]);
    };

    const resetMaterial = () => {
        setDataQRY_KSV_PO_MRP1(emptyQRY_KSV_PO_MRP1);
        setDataQRY_KSV_PO_MRP1_VENDOR_CD(datasQRY_KSV_PO_MRP1_VENDOR_CD[0]);
        setDatasTBL_KSV_PO_MRP1([]);
    };

    const search_LIST_1 = (argData) => {
        var tObj = {};
        if (typeof argData.PO_CD === "undefined")
            tObj = { ...dataQRY_KSV_PO_MRP };
        else tObj = { ...argData };

        setDatasTBL_KSV_PO_MRP([]);
        setLoadingTBL_KSV_PO_MRP(true);
        serviceS030506_NEW_PO_SAMPLE.mgrQuery_LIST_1(tObj).then((data) => {
            setLoadingTBL_KSV_PO_MRP(false);
            if (typeof data.graphQLErrors === "undefined") {
                if (data.PO_MRP.length > 0) {
                    var tArray = [];
                    data.PO_MRP.forEach((col, i) => {
                        var tObj1 = { ...col };
                        tObj1.id = i + 1;
                        // tObj1.PO_SEQ = tObj.PO_SEQ;
                        tArray.push(tObj1);
                    });
                    setDatasTBL_KSV_PO_MRP(tArray);

                    var tOne = { ...data.PO_MRP[0] };

                    var tQryObj = { ...dataQRY_KSV_PO_MRP };
                    tQryObj.BUYER_CD = tOne.ORDER_CD.substring(0, 2);
                    tQryObj.FACTORY_CD = tOne.FACTORY_CD;
                    tQryObj.PLACE_CD = tOne.PLACE_CD;
                    tQryObj.PO_SEQ = tOne.PO_SEQ;
                    tQryObj.ORDER_CD = tOne.ORDER_CD;
                    tQryObj.PO_TYPE = tOne.PO_TYPE;
                    tQryObj.PO_DATE = tOne.PO_DATE;
                    tQryObj.MATERIAL_DUE_DATE = tOne.MATERIAL_DUE_DATE;
                    tQryObj.DELIVERY_DATE = tOne.PROD_DUE_DATE;
                    tQryObj.END_REMARK = tOne.REMARK;
                    setDataQRY_KSV_PO_MRP(tQryObj);

                    var tArray1 = [];
                    var tObjBuyer = {};
                    tObjBuyer.BUYER_CD = tQryObj.BUYER_CD;
                    tObjBuyer.BUYER_NAME = tOne.BUYER_NAME;
                    tArray1.push(tObjBuyer);

                    var tObjBuyer1 = {};
                    tObjBuyer1.BUYER_CD = "";
                    tObjBuyer1.BUYER_NAME = " ";
                    tArray1.unshift(tObjBuyer1);
                    setDatasQRY_KSV_PO_MRP_BUYER_CD(tArray1);
                    setDataQRY_KSV_PO_MRP_BUYER_CD(tArray1[1]);

                    editQRY_KSV_PO_MRP_FACTORY_CD(tQryObj.FACTORY_CD);
                    editQRY_KSV_PO_MRP_PLACE_CD(tQryObj.PLACE_CD);
                    editQRY_KSV_PO_MRP_PO_TYPE(tQryObj.PO_TYPE);
                }
            } else {
                console.log(
                    "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });
    };

    const search_QRY_BUYER = (argVendor) => {
        var tObj = {};
        tObj.BUYER_CD = argVendor.trim();

        serviceS030506_NEW_PO_SAMPLE.mgrQuery_BUYER(tObj).then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                if (data.length > 0) {
                    setDatasQRY_KSV_PO_MRP_BUYER_CD(data);
                }
            } else {
                console.log(
                    "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });
    };

    /* QRY KSV_PO_MST*/
    const [dataQRY_KSV_PO_MRP, setDataQRY_KSV_PO_MRP] =
        useState(emptyQRY_KSV_PO_MRP);

    const [
        datasQRY_KSV_PO_MRP_DELIVERY_TYPE,
        setDatasQRY_KSV_PO_MRP_DELIVERY_TYPE,
    ] = useState([]);
    const [
        dataQRY_KSV_PO_MRP_DELIVERY_TYPE,
        setDataQRY_KSV_PO_MRP_DELIVERY_TYPE,
    ] = useState({});

    const [
        datasQRY_KSV_PO_MRP_REASON_TYPE,
        setDatasQRY_KSV_PO_MRP_REASON_TYPE,
    ] = useState([]);
    const [dataQRY_KSV_PO_MRP_REASON_TYPE, setDataQRY_KSV_PO_MRP_REASON_TYPE] =
        useState({});

    const [datasQRY_KSV_PO_MRP_FARE_TYPE, setDatasQRY_KSV_PO_MRP_FARE_TYPE] =
        useState([]);
    const [dataQRY_KSV_PO_MRP_FARE_TYPE, setDataQRY_KSV_PO_MRP_FARE_TYPE] =
        useState({});

    const [dataOP_KIND, setDataOP_KIND] = useState("");

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

    const editQRY_KSV_PO_MRP_FACTORY_CD = (argValue) => {
        let _dataQRY_KSV_PO_MRP_FACTORY_CD =
            datasQRY_KSV_PO_MRP_FACTORY_CD.filter(
                (val) => val.FACTORY_CD === argValue,
            );
        setDataQRY_KSV_PO_MRP_FACTORY_CD(_dataQRY_KSV_PO_MRP_FACTORY_CD[0]);
    };

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

        var tObj1 = { ...dataQRY_KSV_PO_MRP1 };
        tObj1.FACTORY_CD = val;
        setDataQRY_KSV_PO_MRP1(tObj1);
    };

    const [datasQRY_KSV_PO_MRP_PLACE_CD, setDatasQRY_KSV_PO_MRP_PLACE_CD] =
        useState([]);
    const [dataQRY_KSV_PO_MRP_PLACE_CD, setDataQRY_KSV_PO_MRP_PLACE_CD] =
        useState({});

    const editQRY_KSV_PO_MRP_PLACE_CD = (argValue) => {
        let _dataQRY_KSV_PO_MRP_PLACE_CD = datasQRY_KSV_PO_MRP_PLACE_CD.filter(
            (val) => val.PLACE_CD === argValue,
        );
        setDataQRY_KSV_PO_MRP_PLACE_CD(_dataQRY_KSV_PO_MRP_PLACE_CD[0]);
    };

    const onDropdownChangeQRY_KSV_PO_MRP_PLACE_CD = (e, name) => {
        let val = (e.value && e.value.PLACE_CD) || "";

        let _dataQRY_KSV_PO_MRP = { ...dataQRY_KSV_PO_MRP };

        let tTypeVal = _dataQRY_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_PO_MRP[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_PO_MRP[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_PO_MRP(_dataQRY_KSV_PO_MRP);
        setDataQRY_KSV_PO_MRP_PLACE_CD(e.value);
    };

    const [datasQRY_KSV_PO_MRP_PO_TYPE, setDatasQRY_KSV_PO_MRP_PO_TYPE] =
        useState([]);
    const [dataQRY_KSV_PO_MRP_PO_TYPE, setDataQRY_KSV_PO_MRP_PO_TYPE] =
        useState({});

    const editQRY_KSV_PO_MRP_PO_TYPE = (argValue) => {
        let _dataQRY_KSV_PO_MRP_PO_TYPE = datasQRY_KSV_PO_MRP_PO_TYPE.filter(
            (val) => val.CD_CODE === argValue,
        );
        setDataQRY_KSV_PO_MRP_PO_TYPE(_dataQRY_KSV_PO_MRP_PO_TYPE[0]);
    };

    const onDropdownChangeQRY_KSV_PO_MRP_PO_TYPE = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataQRY_KSV_PO_MRP = { ...dataQRY_KSV_PO_MRP };

        let tTypeVal = _dataQRY_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_PO_MRP[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_PO_MRP[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_PO_MRP(_dataQRY_KSV_PO_MRP);
        setDataQRY_KSV_PO_MRP_PO_TYPE(e.value);
    };

    const onInputChangeQRY_KSV_PO_MRP_PO_CD = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_PO_MRP = { ...dataQRY_KSV_PO_MRP };

        let tTypeVal = _dataQRY_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string") _dataQRY_KSV_PO_MRP[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_PO_MRP[`${name}`] = parseInt(val);

        setDataQRY_KSV_PO_MRP(_dataQRY_KSV_PO_MRP);
    };

    const [datasQRY_KSV_PO_MRP_PO_SEQ, setDatasQRY_KSV_PO_MRP_PO_SEQ] =
        useState([]);
    const [dataQRY_KSV_PO_MRP_PO_SEQ, setDataQRY_KSV_PO_MRP_PO_SEQ] = useState(
        {},
    );

    const onInputChangeQRY_KSV_PO_MRP_PO_SEQ = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_PO_MRP = { ...dataQRY_KSV_PO_MRP };

        let tTypeVal = _dataQRY_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string") _dataQRY_KSV_PO_MRP[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_PO_MRP[`${name}`] = parseInt(val);

        setDataQRY_KSV_PO_MRP(_dataQRY_KSV_PO_MRP);
    };

    const [datasQRY_KSV_PO_MRP_ORDER_CD, setDatasQRY_KSV_PO_MRP_ORDER_CD] =
        useState([]);
    const [dataQRY_KSV_PO_MRP_ORDER_CD, setDataQRY_KSV_PO_MRP_ORDER_CD] =
        useState({});

    const onInputChangeQRY_KSV_PO_MRP_ORDER_CD = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_PO_MRP = { ...dataQRY_KSV_PO_MRP };

        let tTypeVal = _dataQRY_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string") _dataQRY_KSV_PO_MRP[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_PO_MRP[`${name}`] = parseInt(val);

        setDataQRY_KSV_PO_MRP(_dataQRY_KSV_PO_MRP);
    };
    const onInputChangeQRY_KSV_PO_MRP_END_REMARK = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_PO_MRP = { ...dataQRY_KSV_PO_MRP };

        let tTypeVal = _dataQRY_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string") _dataQRY_KSV_PO_MRP[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_PO_MRP[`${name}`] = parseInt(val);

        setDataQRY_KSV_PO_MRP(_dataQRY_KSV_PO_MRP);
    };
    const onCalChangeQRY_KSV_PO_MRP_PO_DATE = (e, name) => {
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

    const onCalChangeQRY_KSV_PO_MRP_MATERIAL_DUE_DATE = (e, name) => {
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

    const onKeyPressQRY_KSV_PO_MRP_BUYER_CD = (e, name) => {
        if (e.key === "Enter") {
            console.log(e);
            search_QRY_BUYER(e.target.value);
            // process_SEARCH_VENDOR();
            // search_LIST_1();
        }
    };

    /* QRY KSV_PO_MST1*/
    const [dataQRY_KSV_PO_MRP1, setDataQRY_KSV_PO_MRP1] =
        useState(emptyQRY_KSV_PO_MRP1);

    const onInputChangeQRY_KSV_PO_MRP1_MATL_CD = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_PO_MRP1 = { ...dataQRY_KSV_PO_MRP1 };

        let tTypeVal = _dataQRY_KSV_PO_MRP1[`${name}`];
        if (typeof tTypeVal === "string") _dataQRY_KSV_PO_MRP1[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_PO_MRP1[`${name}`] = parseInt(val);

        setDataQRY_KSV_PO_MRP1(_dataQRY_KSV_PO_MRP1);
    };

    const onInputChangeQRY_KSV_PO_MRP1_MATL_NAME = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_PO_MRP1 = { ...dataQRY_KSV_PO_MRP1 };

        let tTypeVal = _dataQRY_KSV_PO_MRP1[`${name}`];
        if (typeof tTypeVal === "string") _dataQRY_KSV_PO_MRP1[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_PO_MRP1[`${name}`] = parseInt(val);

        setDataQRY_KSV_PO_MRP1(_dataQRY_KSV_PO_MRP1);
    };

    const onInputChangeQRY_KSV_PO_MRP1_COLOR = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_PO_MRP1 = { ...dataQRY_KSV_PO_MRP1 };

        let tTypeVal = _dataQRY_KSV_PO_MRP1[`${name}`];
        if (typeof tTypeVal === "string") _dataQRY_KSV_PO_MRP1[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_PO_MRP1[`${name}`] = parseInt(val);

        setDataQRY_KSV_PO_MRP1(_dataQRY_KSV_PO_MRP1);
    };

    const onInputChangeQRY_KSV_PO_MRP1_SPEC = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_PO_MRP1 = { ...dataQRY_KSV_PO_MRP1 };

        let tTypeVal = _dataQRY_KSV_PO_MRP1[`${name}`];
        if (typeof tTypeVal === "string") _dataQRY_KSV_PO_MRP1[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_PO_MRP1[`${name}`] = parseInt(val);

        setDataQRY_KSV_PO_MRP1(_dataQRY_KSV_PO_MRP1);
    };

    const onInputChangeQRY_KSV_PO_MRP1_VENDOR_NAME = (e, name) => {
        let val = (e.target && e.target.value) || "";
        let _dataQRY_KSV_PO_MRP1 = { ...dataQRY_KSV_PO_MRP1 };

        let tTypeVal = _dataQRY_KSV_PO_MRP1[`${name}`];
        if (typeof tTypeVal === "string") _dataQRY_KSV_PO_MRP1[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_PO_MRP1[`${name}`] = parseInt(val);

        setDataQRY_KSV_PO_MRP1(_dataQRY_KSV_PO_MRP1);
    };

    const [
        datasQRY_KSV_PO_MRP1_FACTORY_CD,
        setDatasQRY_KSV_PO_MRP1_FACTORY_CD,
    ] = useState([]);
    const [dataQRY_KSV_PO_MRP1_FACTORY_CD, setDataQRY_KSV_PO_MRP1_FACTORY_CD] =
        useState({});

    const onInputChangeQRY_KSV_PO_MRP1_FACTORY_CD = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_PO_MRP1 = { ...dataQRY_KSV_PO_MRP1 };

        let tTypeVal = _dataQRY_KSV_PO_MRP1[`${name}`];
        if (typeof tTypeVal === "string") _dataQRY_KSV_PO_MRP1[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_PO_MRP1[`${name}`] = parseInt(val);

        setDataQRY_KSV_PO_MRP1(_dataQRY_KSV_PO_MRP1);
    };

    const [datasQRY_KSV_PO_MRP1_VENDOR_CD, setDatasQRY_KSV_PO_MRP1_VENDOR_CD] =
        useState([]);
    const [dataQRY_KSV_PO_MRP1_VENDOR_CD, setDataQRY_KSV_PO_MRP1_VENDOR_CD] =
        useState({});

    /**TABLE KSV_ORDER_MST1 */
    // DEFINE DATAGRID : TBL_KSV_PO_MRP
    const [datasTBL_KSV_PO_MRP, setDatasTBL_KSV_PO_MRP] = useState([]);
    const dt_TBL_KSV_PO_MRP = useRef(null);
    const [dataTBL_KSV_PO_MRP, setDataTBL_KSV_PO_MRP] =
        useState(emptyTBL_KSV_PO_MRP);
    const [selectedTBL_KSV_PO_MRP, setSelectedTBL_KSV_PO_MRP] = useState([]);
    const [flagSelectModeTBL_KSV_PO_MRP, setFlagSelectModeTBL_KSV_PO_MRP] =
        useState(false);
    const [loadingTBL_KSV_PO_MRP, setLoadingTBL_KSV_PO_MRP] = useState(false);

    // DATAGRID CODE : TBL_KSV_PO_MRP
    const onCellEditCompleteKSV_PO_MST_TEXT = (e) => {
        // console.log(e);
        let { rowData, newValue, field, originalEvent: event } = e;
        if (field === "REASON_TYPE") {
            var tRetObj = JSON.parse(
                window.localStorage.getItem("S030506_REASON_TYPE"),
            );
            rowData[field] = tRetObj.CD_CODE;
        }
        if (field === "FARE_TYPE") {
            var tRetObj = JSON.parse(
                window.localStorage.getItem("S030506_FARE_TYPE"),
            );
            rowData[field] = tRetObj.CD_CODE;
        }
        if (field === "PO_QTY") rowData[field] = newValue;
        if (field === "REMARK") rowData[field] = newValue;
    };

    const cellEditorKSV_PO_MST_TEXT = (options) => {
        return textEditor(options);
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

    const onChangeTextEdit = (e, options) => {
        console.log("onChangeTextEdit=>", e.target.value);
        options.editorCallback(e.target.value);
    };

    const handleFocus = (event) => event.target.select();

    const textEditor = (options) => {
        return (
            <InputText
                type="text"
                value={changeInputValue(options.value)}
                onChange={(e) => onChangeTextEdit(e, options)}
                onFocus={handleFocus}
            />
        );
    };

    const onRowClick1TBL_KSV_PO_MRP = (argData0) => {
        var argData = {};

        if (typeof argData0.length !== "undefined") {
            argData = argData0[0];
        } else {
            argData = argData0;
        }

        if (typeof argData === "undefined") return;

        let argTBL_KSV_PO_MRP = argData;

        setDataTBL_KSV_PO_MRP(argTBL_KSV_PO_MRP);

        if (argData.PO_SEQ === "") return;
        if (dataQRY_KSV_PO_MRP.PO_CD) return;

        var tObj = { ...dataQRY_KSV_PO_MRP };
        tObj.BUYER_CD = argData.ORDER_CD.substring(0, 2);
        tObj.FACTORY_CD = argData.FACTORY_CD;
        tObj.PLACE_CD = argData.PLACE_CD;
        tObj.PO_SEQ = argData.PO_SEQ;
        tObj.ORDER_CD = argData.ORDER_CD;
        tObj.PO_TYPE = argData.PO_TYPE;
        tObj.END_REMARK = "";
        tObj.PO_DATE = argData.PO_DATE;
        tObj.DELIVERY_DATE = argData.DELIVERY_DATE;
        tObj.MATERIAL_DUE_DATE = argData.MATERIAL_DUE_DATE;
        setDataQRY_KSV_PO_MRP(tObj);

        var tArray = [];
        var tObj1 = {};
        tObj1.BUYER_CD = tObj.BUYER_CD;
        tObj1.BUYER_NAME = tObj.BUYER_CD;
        tArray.push(tObj1);
        setDatasQRY_KSV_PO_MRP_BUYER_CD(tArray);
        setDataQRY_KSV_PO_MRP_BUYER_CD(tArray[0]);

        editQRY_KSV_PO_MRP_PO_TYPE(tObj.PO_TYPE);
        editQRY_KSV_PO_MRP_PLACE_CD(tObj.PLACE_CD);
        editQRY_KSV_PO_MRP_FACTORY_CD(tObj.FACTORY_CD);

        var tObj1 = { ...dataQRY_KSV_PO_MRP1 };
        tObj1.FACTORY_CD = argData.FACTORY_CD;
        setDataQRY_KSV_PO_MRP1(tObj1);
    };

    const onRowClickTBL_KSV_PO_MRP = (event) => {
        let argTBL_KSV_PO_MRP = event.data;
        if (flagSelectModeTBL_KSV_PO_MRP) return;

        // Service : NawooAll:mgrQueryTBL_KSV_PO_MRP
    };

    /**TABLE KSV_R_MST */
    // DEFINE DATAGRID : TBL_KSV_PO_MRP1
    const [datasTBL_KSV_PO_MRP1, setDatasTBL_KSV_PO_MRP1] = useState([]);
    const dt_TBL_KSV_PO_MRP1 = useRef(null);
    const [dataTBL_KSV_PO_MRP1, setDataTBL_KSV_PO_MRP1] =
        useState(emptyTBL_KSV_PO_MRP1);
    const [selectedTBL_KSV_PO_MRP1, setSelectedTBL_KSV_PO_MRP1] = useState([]);
    const [flagSelectModeTBL_KSV_PO_MRP1, setFlagSelectModeTBL_KSV_PO_MRP1] =
        useState(false);

    const [loadingTBL_KSV_PO_MRP1, setLoadingTBL_KSV_PO_MRP1] = useState(false);

    // DATAGRID CODE : TBL_KSV_PO_MRP1
    const searchMATL_MST = () => {
        setDataOP_KIND("발주");
        var tObj = { ...dataQRY_KSV_PO_MRP1 };
        if (tObj.FACTORY_CD === "" || tObj.FACTORY_CD === " ") {
            //alert('FACTORY가 입력되지 않았습니다');
            // alert('위 테이블에서 PO를 선택하세요');
            // alert('Matl Inquer시 Factory을 선택해야 합니다');
            tObj.FACTORY_CD = "FC034";
        }

        if (
            tObj.VENDOR_NAME === "" &&
            tObj.MATL_CD === "" &&
            tObj.MATL_NAME === "" &&
            tObj.COLOR === "" &&
            tObj.SPEC === ""
        ) {
            alert(
                "Supplier, Matl Cd, Matl Name, Color, Spec중 하나는 필수입력값 입니다.",
            );
            return;
        }

        setDatasTBL_KSV_PO_MRP1([]);
        setLoadingTBL_KSV_PO_MRP1(true);
        serviceS030506_NEW_PO_SAMPLE
            .mgrQueryTBL_KCD_MATL_MST(dataQRY_KSV_PO_MRP1)
            .then((data) => {
                setLoadingTBL_KSV_PO_MRP1(false);
                console.log(data);
                if (typeof data.graphQLErrors === "undefined") {
                    if (data.length > 0) {
                        var tObjs = data.map((col, i) => {
                            var tObj = { ...col };
                            tObj.id = i + 1;
                            return tObj;
                        });
                        setDatasTBL_KSV_PO_MRP1(tObjs);
                    }
                } else {
                    console.log(
                        "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });
    };

    const searchMATL_STOCK = () => {
        setDataOP_KIND("재고사용");
        var tObj = { ...dataQRY_KSV_PO_MRP1 };
        if (tObj.FACTORY_CD === "" || tObj.FACTORY_CD === " ") {
            // alert('FACTORY가 입력되지 않았습니다');
            // return;
            tObj.FACTORY_CD = "FC034";
        }
        if (
            tObj.VENDOR_NAME === "" &&
            tObj.MATL_CD === "" &&
            tObj.MATL_NAME === "" &&
            tObj.COLOR === "" &&
            tObj.SPEC === ""
        ) {
            alert(
                "Supplier, Matl Cd, Matl Name, Color, Spec중 하나는 필수입력값 입니다.",
            );
            return;
        }

        setDatasTBL_KSV_PO_MRP1([]);
        setLoadingTBL_KSV_PO_MRP1(true);

        serviceS030506_NEW_PO_SAMPLE
            .mgrQueryTBL_KCD_MATL_MST2(tObj)
            .then((data) => {
                setLoadingTBL_KSV_PO_MRP1(false);
                if (typeof data.graphQLErrors === "undefined") {
                    if (data.length > 0) {
                        if (data.length > 0) {
                            var tObjs = data.map((col, i) => {
                                var tObj = { ...col };
                                tObj.id = i + 1;
                                return tObj;
                            });
                            setDatasTBL_KSV_PO_MRP1(tObjs);
                        }
                    }
                } else {
                    console.log(
                        "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });
    };

    const addPo = () => {
        if (!dataQRY_KSV_PO_MRP.END_REMARK) {
            alert("End Remark는 필수 입력값입니다.<br><br>End Remark is a required input.");
            return;
        }

        if (dataQRY_KSV_PO_MRP.PO_CD !== "") {
            alert("등록된 Po는 수정만 가능합니다.<br><br>Registered Pos can only be modified.");
            return;
        }

        if (dataQRY_KSV_PO_MRP.BUYER_CD === "") {
            alert("Select Buyer.");
            return;
        }
        if (dataQRY_KSV_PO_MRP.FACTORY_CD === "") {
            alert("Select Factory.");
            return;
        }
        if (dataQRY_KSV_PO_MRP.PLACE_CD === "") {
            alert("Select Place.");
            return;
        }

        var tData1 = { ...dataQRY_KSV_PO_MRP };

        var tData2 = [];
        var tCheck = 0;
        datasTBL_KSV_PO_MRP.forEach((col, i) => {
            var tObj = { ...col };
            if (typeof tObj.__typename !== "undefined") delete tObj.__typename;
            if (typeof tObj.id !== "undefined") delete tObj.id;
            if (typeof tObj.PO_SEQ !== "undefined") delete tObj.PO_SEQ;
            if (
                dataQRY_KSV_PO_MRP.PO_TYPE === "1" &&
                tObj.PO_TYPE_NAME === "재고사용"
            )
                tCheck = 1;
            if (col.PO_SEQ === "" && parseInt(col.PO_QTY) > 0) {
                tData2.push(tObj);
            }
        });
        if (tCheck > 0) {
            alert("Storage 등록은 발주만 가능합니다. <br><br>Storage registration is only available for ordering.");
            return;
        }
        if (tData2.length <= 0) {
            alert("추가할 데이타가 없습니다. PO_QTY 을 입력했는지 확인하세요<br><br>There is no data to add. Make sure you enter PO_QTY");
            return;
        }

        setLoadingTBL_KSV_PO_MRP(true);
        serviceS030506_NEW_PO_SAMPLE.mgrAddPo(tData1, tData2).then((data) => {
            setLoadingTBL_KSV_PO_MRP(false);
            if (typeof data.graphQLErrors === "undefined") {
                if (data.length > 0) {
                    alert(data[0].CODE);
                    if (data[0].CODE.includes("SUCC")) {
                        var tPoCd = data[0].CODE.split(":")[1];
                        var tPoSeq = data[0].CODE.split(":")[2];
                        var tOrderCd = data[0].CODE.split(":")[3];
                        tData1.PO_CD = tPoCd;
                        tData1.ORDER_CD = tOrderCd;
                        tData1.PO_SEQ = tPoSeq;
                        setDataQRY_KSV_PO_MRP(tData1);
                        // search_LIST_1(tData1);

                        var tObjs = [...datasQRY_KSV_PO_MRP_PO_SEQ];
                        var tFlag2 = 0;
                        datasQRY_KSV_PO_MRP_PO_SEQ.forEach((col, i) => {
                            if (col.PO_SEQ === tPoSeq) tFlag2 = 1;
                        });
                        if (tFlag2 === 0) {
                            var tObj = {};
                            tObj.PO_SEQ = tPoSeq;
                            tObjs.push(tObj);
                            setDatasQRY_KSV_PO_MRP_PO_SEQ(tObjs);
                            setDataQRY_KSV_PO_MRP_PO_SEQ(tObjs[tObjs.length]);
                        }
                    }
                }
            } else {
                alert("Po Add Error(Server Error)");
            }
        });
    };

    const updatePo = () => {
        if (!dataQRY_KSV_PO_MRP.END_REMARK) {
            alert("End Remark는 필수 입력값입니다.<br><br>End Remark is a required input.");
            return;
        }

        if (dataQRY_KSV_PO_MRP.PO_CD === "") {
            alert("Po가 등록된것만 수정가능합니다.<br><br>Only registered Pos can be modified.");
            return;
        }

        var tData1 = { ...dataQRY_KSV_PO_MRP };

        var tData2 = [];
        var tCheck = 0;
        datasTBL_KSV_PO_MRP.forEach((col, i) => {
            var tObj = { ...col };
            if (typeof tObj.__typename !== "undefined") delete tObj.__typename;
            if (typeof tObj.id !== "undefined") delete tObj.id;
            if (typeof tObj.PO_SEQ !== "undefined") delete tObj.PO_SEQ;
            if (
                dataQRY_KSV_PO_MRP.PO_TYPE === "1" &&
                tObj.PO_TYPE_NAME === "재고사용"
            )
                tCheck = 1;

            if (parseInt(col.PO_QTY) > 0) {
                tData2.push(tObj);
            }
        });
        if (tCheck > 0) {
            alert("Storage 등록은 발주만 가능합니다. <br><br>Storage registration is only available for ordering.");
            return;
        }
        if (tData2.length <= 0) {
            alert("작업할 자재를 선택하십시요<br><br>Choose the material you want to work with");
            return;
        }

        setLoadingTBL_KSV_PO_MRP(true);
        serviceS030506_NEW_PO_SAMPLE
            .mgrUpdatePo(tData1, tData2)
            .then((data) => {
                setLoadingTBL_KSV_PO_MRP(false);
                if (typeof data.graphQLErrors === "undefined") {
                    if (data.length > 0) {
                        alert(data[0].CODE);
                        if (data[0].CODE.includes("SUCC")) {
                            var tPoSeq = data[0].CODE.split(":")[1];
                            search_LIST_1(tData1);
                        }
                    }
                } else {
                    toast.current.show({
                        severity: "success",
                        summary: "Po Add Error",
                        detail: "",
                        life: 3000,
                    });
                }
            });
    };

    const process_DEL_MATL = () => {
        if (selectedTBL_KSV_PO_MRP.length <= 0) {
            alert("작업할 자재를 선택하세요.<br><br>Choose the material you want to work with.");
            return;
        }

        var tArray = [];
        datasTBL_KSV_PO_MRP.forEach((col, i) => {
            var tCheck = 0;
            selectedTBL_KSV_PO_MRP.forEach((col1, i1) => {
                if (col.id === col1.id) tCheck = 1;
            });
            if (tCheck === 0) {
                var tObj = { ...col };
                tArray.push(tObj);
            }
        });

        var tArray1 = [];
        tArray.forEach((col, i) => {
            var tObj = { ...col };
            tObj.id = i + 1;
            tArray1.push(tObj);
        });
        setDatasTBL_KSV_PO_MRP(tArray1);

        alert("삭제한 자재는 Update를 해야 반영됩니다<br><br>Deleted materials must be updated to be reflected.");
    };

    const deletePo = () => {
        if (dataQRY_KSV_PO_MRP.PO_CD === "") {
            alert("Po가 등록된것만 삭제가능합니다.<br><br>Only registered Pos can be deleted.");
            return;
        }

        var tData1 = { ...dataQRY_KSV_PO_MRP };

        var tData2 = [];
        datasTBL_KSV_PO_MRP.forEach((col, i) => {
            var tObj = { ...col };
            if (typeof tObj.__typename !== "undefined") delete tObj.__typename;
            if (typeof tObj.id !== "undefined") delete tObj.id;
            if (typeof tObj.PO_SEQ !== "undefined") delete tObj.PO_SEQ;
            if (col.PO_SEQ !== "" && parseInt(col.PO_QTY) > 0) {
                tData2.push(tObj);
            }
        });

        if (tData2.length <= 0) {
            alert("작업할 자재를 선택하십시요<br><br>Choose the material you want to work with");
            return;
        }

        console.log(tData2);

        setLoadingTBL_KSV_PO_MRP(true);
        serviceS030506_NEW_PO_SAMPLE
            .mgrDeletePo(tData1, tData2)
            .then((data) => {
                setLoadingTBL_KSV_PO_MRP(false);
                if (typeof data.graphQLErrors === "undefined") {
                    if (data.length > 0) {
                        alert(data[0].CODE);
                        if (data[0].CODE.includes("SUCC")) {
                            var tPoSeq = data[0].CODE.split(":")[1];
                            search_LIST_1(tData1);
                        }
                    }
                } else {
                    toast.current.show({
                        severity: "success",
                        summary: "Po Add Error",
                        detail: "",
                        life: 3000,
                    });
                }
            });
    };

    const addMaterial = () => {
        var tQryObj = { ...dataQRY_KSV_PO_MRP };

        if (selectedTBL_KSV_PO_MRP1.length <= 0) {
            alert("추가할 자재를 선택하십시요<br><br>Select the material you want to add");
            return;
        }

        var tSrcObj = { ...selectedTBL_KSV_PO_MRP1[0] };
        var tDestObj = { ...selectedTBL_KSV_PO_MRP1[0] };
        if (dataOP_KIND === "재고사용") {
            tDestObj.PO_TYPE_NAME = "재고사용";
            tDestObj.USE_PO_TYPE = "2";
            tDestObj.STOCK_IDX = String(tSrcObj.STOCK_IDX);
        } else {
            tDestObj.PO_TYPE_NAME = "발주";
            tDestObj.USE_PO_TYPE = "1";
            tDestObj.STOCK_IDX = "0";
        }
        tDestObj.ORDER_CD = tQryObj.ORDER_CD;
        tDestObj.PO_SEQ = "";

        var tFlag = 0;
        datasTBL_KSV_PO_MRP.forEach((col, i) => {
            if (col.MATL_CD === tDestObj.MATL_CD) tFlag = 1;
        });

        if (tFlag === 1) {
            alert(
                `${tDestObj.MATL_CD} 는 동일한 matl cd가 있어서 추가 불가합니다`,
            );
            return;
        }

        var _tArray = [...datasTBL_KSV_PO_MRP];
        if (!tDestObj.FACTORY_NAME)
            tDestObj.FACTORY_NAME = dataQRY_KSV_PO_MRP_FACTORY_CD.FACTORY_NAME;
        _tArray.push(tDestObj);

        var tArray = _tArray.map((col, i) => {
            var tObj = { ...col };
            tObj.id = i + 1;
            return tObj;
        });

        setDatasTBL_KSV_PO_MRP(tArray);
    };

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

    useEffect(() => {
        let tParam = "";
        var tPoCd = "";

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
                    tPoCd = tObj.value;
                    console.log(tObj);
                    return tObj;
                }
            });
            if (tParams2.length > 0) {
                tParam = tParams2[0].value;
            }
            console.log(tParams2);
        }

        mqryQuery_CODE(tPoCd);
    }, []);

    const mqryQuery_CODE = (poCd, clickSearch) => {
        setLoadingTBL_KSV_PO_MRP(true);
        serviceS030506_NEW_PO_SAMPLE
            .mgrQuery_CODE({ PO_CD: poCd })
            .then((data) => {
                setLoadingTBL_KSV_PO_MRP(false);
                if (typeof data.graphQLErrors === "undefined") {
                    console.log(data);

                    setDatasQRY_KSV_PO_MRP_REASON_TYPE(data.REASON_TYPE);
                    setDataQRY_KSV_PO_MRP_REASON_TYPE(data.REASON_TYPE[0]);

                    setDatasQRY_KSV_PO_MRP_FARE_TYPE(data.FARE_TYPE);
                    setDataQRY_KSV_PO_MRP_FARE_TYPE(data.FARE_TYPE[0]);

                    setDatasQRY_KSV_PO_MRP_BUYER_CD(data.BUYER_CD);
                    setDataQRY_KSV_PO_MRP_BUYER_CD(data.BUYER_CD[0]);

                    setDatasQRY_KSV_PO_MRP_FACTORY_CD(data.FACTORY_CD);
                    setDataQRY_KSV_PO_MRP_FACTORY_CD(data.FACTORY_CD[0]);

                    setDatasQRY_KSV_PO_MRP_PLACE_CD(data.PLACE_CD);
                    setDataQRY_KSV_PO_MRP_PLACE_CD(data.PLACE_CD[0]);

                    setDatasQRY_KSV_PO_MRP_PO_TYPE(data.PO_TYPE);
                    setDataQRY_KSV_PO_MRP_PO_TYPE(data.PO_TYPE[0]);

                    setDatasQRY_KSV_PO_MRP1_VENDOR_CD(data.VENDOR_CD);
                    setDataQRY_KSV_PO_MRP1_VENDOR_CD(data.VENDOR_CD[0]);

                    var tObj1 = { ...dataQRY_KSV_PO_MRP };
                    tObj1.PO_DATE = serviceLib.getCurrDate1();
                    tObj1.DELIVERY_DATE = serviceLib.getCurrDate1();
                    tObj1.MATERIAL_DUE_DATE = serviceLib.getCurrDate1();
                    tObj1.PO_CD = poCd;
                    setDataQRY_KSV_PO_MRP(tObj1);

                    document.getElementById("btnSearch").click();
                } else {
                    console.log(
                        "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });
    };

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

    const dt_TBL_KSV_PO_INQ = useRef(null);
    const [valPoCdInq, setValPoCdInq] = useState("");
    const [datasTBL_KSV_PO_INQ, setDatasTBL_KSV_PO_INQ] = useState([]);
    const [dataTBL_KSV_PO_INQ, setDataTBL_KSV_PO_INQ] = useState({});
    const [loadingTBL_KSV_PO_INQ, setLoadingTBL_KSV_PO_INQ] = useState(false);

    const onRowClickTBL_KSV_PO_INQ = (event) => {
        let argTBL_KSV_PO_INQ = event.data;
        if (argTBL_KSV_PO_INQ === null) return;

        setValPoCdInq(argTBL_KSV_PO_INQ.PO_CD);
        resetInput();
        mqryQuery_CODE(argTBL_KSV_PO_INQ.PO_CD, "clickSearch");
    };

    const searchPoCd = () => {
        setLoadingTBL_KSV_PO_INQ(true);
        serviceS030506_NEW_PO_SAMPLE
            .mgrQuery_SEARCH_PO_CD({
                PO_CD: valPoCdInq,
            })
            .then((data) => {
                setLoadingTBL_KSV_PO_INQ(false);
                setDatasTBL_KSV_PO_INQ(data);
            });
    };

    return (
        <div className="af-div-main">
            <div
                className="af-div-first"
                style={{ width: "90rem", height: "13rem", marginRight: "1rem" }}
            >
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(4, 1fr)",
                        gap: "0.5rem",
                        alignItems: "center",
                        marginBottom: "2rem",
                        padding: "1rem",
                    }}
                >
                    {/* Row 1 */}
                    <div style={{ display: "flex" }}>
                        <label style={{ width: "7rem" }}> Buyer# </label>
                        <Dropdown
                            filter
                            style={{ flex: 1 }}
                            id="id_PO_CD"
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
                            onKeyPress={(e) =>
                                onKeyPressQRY_KSV_PO_MRP_BUYER_CD(e)
                            }
                        />
                    </div>

                    <div style={{ display: "flex" }}>
                        <label style={{ width: "7rem" }}> PO# </label>
                        <InputText
                            disabled
                            style={{ flex: 1 }}
                            id="id_PO_CD"
                            value={dataQRY_KSV_PO_MRP.PO_CD}
                            onChange={(e) =>
                                onInputChangeQRY_KSV_PO_MRP_PO_CD(e, "PO_CD")
                            }
                        />
                    </div>

                    <div style={{ display: "flex" }}>
                        <label style={{ width: "5rem" }}> Po Seq </label>
                        <InputText
                            disabled
                            style={{ flex: 1 }}
                            id="id_PO_SEQ"
                            value={dataQRY_KSV_PO_MRP.PO_SEQ}
                            onChange={(e) =>
                                onInputChangeQRY_KSV_PO_MRP_PO_SEQ(e, "PO_SEQ")
                            }
                        />
                    </div>

                    <div style={{ display: "flex" }}>
                        <label style={{ width: "8rem" }}> Regist Date </label>
                        <Calendar
                            disabled
                            showButtonBar
                            style={{ flex: 1 }}
                            dateFormat="yy-mm-dd"
                            id="id_CURRENCY"
                            value={changeDateVal(dataQRY_KSV_PO_MRP.PO_DATE)}
                            onChange={(e) =>
                                onCalChangeQRY_KSV_PO_MRP_PO_DATE(e, "PO_DATE")
                            }
                        />
                    </div>

                    {/* Row 2 */}
                    <div style={{ display: "flex" }}>
                        <label style={{ width: "7rem" }}> Factory# </label>
                        <Dropdown
                            style={{ flex: 1 }}
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
                        />
                    </div>

                    <div style={{ display: "flex" }}>
                        <label style={{ width: "7rem" }}> Order# </label>
                        <InputText
                            disabled
                            style={{ flex: 1 }}
                            id="id_ORDER_CD"
                            value={dataQRY_KSV_PO_MRP.ORDER_CD}
                            onChange={(e) =>
                                onInputChangeQRY_KSV_PO_MRP_ORDER_CD(
                                    e,
                                    "ORDER_CD",
                                )
                            }
                        />
                    </div>

                    <div style={{ display: "flex" }}>
                        <label style={{ width: "6rem" }}> Po Type </label>
                        <Dropdown
                            style={{ flex: 1 }}
                            id="id_PO_TYPE"
                            value={dataQRY_KSV_PO_MRP_PO_TYPE}
                            onChange={(e) =>
                                onDropdownChangeQRY_KSV_PO_MRP_PO_TYPE(
                                    e,
                                    "PO_TYPE",
                                )
                            }
                            options={datasQRY_KSV_PO_MRP_PO_TYPE}
                            optionLabel="CD_NAME"
                            placeholder=""
                            editable
                        />
                    </div>

                    <div style={{ display: "flex" }}>
                        <label style={{ width: "8rem" }}> Place# </label>
                        <Dropdown
                            filter
                            style={{ flex: 1 }}
                            id="id_PLACE_CD"
                            value={dataQRY_KSV_PO_MRP_PLACE_CD}
                            onChange={(e) =>
                                onDropdownChangeQRY_KSV_PO_MRP_PLACE_CD(
                                    e,
                                    "PLACE_CD",
                                )
                            }
                            options={datasQRY_KSV_PO_MRP_PLACE_CD}
                            optionLabel="PLACE_NAME"
                            placeholder=""
                            editable
                        />
                    </div>

                    {/* Row 3 */}
                    <div style={{ display: "flex", gridColumn: "span 2" }}>
                        <label className="red" style={{ width: "7rem" }}>
                            
                            *End Remark
                        </label>
                        <InputText
                            style={{ flex: 1 }}
                            id="id_END_REMARK"
                            value={dataQRY_KSV_PO_MRP.END_REMARK}
                            onChange={(e) =>
                                onInputChangeQRY_KSV_PO_MRP_END_REMARK(
                                    e,
                                    "END_REMARK",
                                )
                            }
                        />
                    </div>

                    <div style={{ display: "flex" }}>
                        <label style={{ width: "6rem" }}> Target ETA </label>
                        <Calendar
                            showButtonBar
                            style={{ flex: 1 }}
                            dateFormat="yy-mm-dd"
                            id="id_TARGET_ETA"
                            value={changeDateVal(
                                dataQRY_KSV_PO_MRP.MATERIAL_DUE_DATE,
                            )}
                            onChange={(e) =>
                                onCalChangeQRY_KSV_PO_MRP_MATERIAL_DUE_DATE(
                                    e,
                                    "MATERIAL_DUE_DATE",
                                )
                            }
                        />
                    </div>

                    <div></div>

                    {/* Row 4: 버튼 6개 (2개씩 병렬 정렬) */}
                    <div
                        style={{
                            justifyContent: "center",
                            gridColumn: "span 4",
                            display: "flex",
                            flexWrap: "wrap",
                            gap: "0.5rem",
                            marginTop: "0rem",
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
                            style={{ width: "10rem" }}
                            className="p-button-text"
                            onClick={search_LIST_1}
                        />

                        <Button
                            label="Reset"
                            style={{ width: "10rem" }}
                            className="p-button-text"
                            onClick={resetInput}
                        />

                        <Button
                            label="Insert"
                            style={{ width: "10rem" }}
                            className="p-button-text"
                            onClick={addPo}
                        />
                        <Button
                            label="Update"
                            style={{ width: "10rem" }}
                            className="p-button-text"
                            onClick={updatePo}
                        />

                        <Button
                            label="Delete"
                            style={{ width: "10rem" }}
                            className="p-button-text"
                            onClick={deletePo}
                        />

                        <Button
                            label="Del Matl"
                            style={{ width: "10rem" }}
                            className="p-button-text"
                            onClick={process_DEL_MATL}
                        />
                    </div>
                </div>
            </div>
            <div
                className="af-div-first"
                style={{ width: "32rem", height: "10rem" }}
            >
                <div
                    className="af-span-div"
                    style={{ padding: "0.5rem", marginBottom: "10px" }}
                >
                    <label style={{ width: "3rem", marginRight: "1rem" }}>
                        
                        PO#
                    </label>
                    <InputText
                        style={{ width: "9rem", marginRight: "1rem" }}
                        value={valPoCdInq}
                        onChange={(e) => setValPoCdInq(e.target.value)}
                    />

                    <Button
                        label="Inquiry"
                        style={{ width: "10rem" }}
                        className="p-button-text"
                        onClick={searchPoCd}
                    />
                </div>
                <AFDataTable preventUnrelatedRerender
                    ref={dt_TBL_KSV_PO_INQ}
                    size="small"
                    value={datasTBL_KSV_PO_INQ}
                    tableStyle={{ tableLayout: "fixed" }}
                    resizableColumns
                    columnResizeMode="expand"
                    showGridlines
                    selectionMode="checkbox"
                    loading={loadingTBL_KSV_PO_INQ}
                    onRowClick={onRowClickTBL_KSV_PO_INQ}
                    dataKey="PO_CD"
                    className="datatable-responsive"
                    virtualScrollerOptions={{ itemSize: 20 }}
                    responsiveLayout="scroll"
                    scrollable
                    scrollHeight="87px"
                >
                    <AFColumn field="PO_CD" header="PO#" headerClassName="t-header" style={{ width: "7rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="PO_SEQ" header="Seq" headerClassName="t-header" style={{ width: "3rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="PO_STATUS_NAME" header="PO Status" headerClassName="t-header" style={{ width: "7rem", flexBasis: "auto" }} ></AFColumn>
                </AFDataTable>
            </div>

            <div
                className="af-div-first"
                style={{ width: "123rem", height: "22rem" }}
            >
                <AFDataTable preventUnrelatedRerender
                    ref={dt_TBL_KSV_PO_MRP}
                    editMode="cell"
                    size="small"
                    value={datasTBL_KSV_PO_MRP}
                    loading={loadingTBL_KSV_PO_MRP}
                    tableStyle={{ tableLayout: "fixed" }}
                    resizableColumns
                    columnResizeMode="expand"
                    metaKeySelection={false}
                    showGridlines
                    selectionMode="multiple"
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
                    virtualScrollerOptions={{ itemSize: 20 }}
                    emptyMessage=" " //header={headerTBL_KSV_PO_MRP}
                    responsiveLayout="scroll"
                    scrollable
                    scrollHeight="235px"
                >
                    <AFColumn field="PO_SEQ" headerClassName="t-header" header="Po Seq" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="VENDOR_NAME" headerClassName="t-header" header="Supplier" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="MATL_CD" headerClassName="t-header" header="Matl Cd" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="MATL_NAME" headerClassName="t-header" header="Description" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="COLOR" headerClassName="t-header" header="Color" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="SPEC" headerClassName="t-header" header="Spec" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="MATL_PRICE" headerClassName="t-header" header="Price" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="CURR_CD" headerClassName="t-header" header="Curr" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="UNIT" headerClassName="t-header" header="Unit" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="STOCK_QTY" headerClassName="t-header" header="Stock Qty" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="PO_QTY" headerClassName="t-header" header="Po Qty" headerStyle={{ color: "green" }} style={{ width: "10rem", flexBasis: "auto" }} editor={(options) => cellEditorKSV_PO_MST_TEXT(options)} onCellEditComplete={onCellEditCompleteKSV_PO_MST_TEXT} ></AFColumn>
                    <AFColumn field="PO_TYPE_NAME" headerClassName="t-header" header="Po Type" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>

                    <AFColumn field="STOCK_STATUS" headerClassName="t-header" header="Stock.S" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="USE_PO_TYPE" headerClassName="t-header" header="Use Po Type.S" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="USE_PO_CD" headerClassName="t-header" header="Use Po Cd" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="USE_PO_SEQ" headerClassName="t-header" header="Use Po Seq" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="USE_ORDER_CD" headerClassName="t-header" header="Use Order" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="USE_MRP_SEQ" headerClassName="t-header" header="Use Mrp Seq" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="USE_MATL_SEQ" headerClassName="t-header" header="Use Matl Seq" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="MATL_SEQ" headerClassName="t-header" header="Matl Seq" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>

                    <AFColumn field="FACTORY_NAME" headerClassName="t-header" header="Factory" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="STOCK_IDX" headerClassName="t-header" header="Stock Idx" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="ORDER_CD" headerClassName="t-header" header="Order Cd" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                </AFDataTable>
            </div>

            <div
                className="af-div-first"
                style={{ width: "123rem", height: "6rem" }}
            >
                <span className="af-span-3-0" style={{ width: "17rem" }}>
                    <p className="af-span-p" style={{ width: "7rem" }}>Matl#</p>
                    <div className="af-span-div" style={{ width: "9rem" }}>
                        <InputText
                            style={{ width: "9rem" }}
                            id="id_MATL_CD"
                            value={dataQRY_KSV_PO_MRP1.MATL_CD}
                            onChange={(e) =>
                                onInputChangeQRY_KSV_PO_MRP1_MATL_CD(
                                    e,
                                    "MATL_CD",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "34rem" }}>
                    <p className="af-span-p" style={{ width: "7rem" }}>Desc</p>
                    <div className="af-span-div" style={{ width: "26rem" }}>
                        <InputText
                            style={{ width: "26rem" }}
                            id="id_MATL_NAME"
                            value={dataQRY_KSV_PO_MRP1.MATL_NAME}
                            onChange={(e) =>
                                onInputChangeQRY_KSV_PO_MRP1_MATL_NAME(
                                    e,
                                    "MATL_NAME",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "26rem" }}>
                    <p className="af-span-p" style={{ width: "7rem" }}>Color</p>
                    <div className="af-span-div" style={{ width: "18rem" }}>
                        <InputText
                            style={{ width: "18rem" }}
                            id="id_COLOR"
                            value={dataQRY_KSV_PO_MRP1.COLOR}
                            onChange={(e) =>
                                onInputChangeQRY_KSV_PO_MRP1_COLOR(e, "COLOR")
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "11rem" }}>
                    <div className="af-span-div-btn" style={{ width: "10rem" }}>
                        <Button
                            label="Matl Inquiry"
                            style={{ width: "10rem" }}
                            className="p-button-text"
                            onClick={searchMATL_MST}
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "24rem" }}>
                    <div className="af-span-div-btn" style={{ width: "10rem" }}>
                        <Button
                            label="Stock Inquiry"
                            style={{ width: "10rem" }}
                            className="p-button-text"
                            onClick={searchMATL_STOCK}
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "34rem" }}>
                    <p className="af-span-p" style={{ width: "7rem" }}>Spec</p>
                    <div className="af-span-div" style={{ width: "26rem" }}>
                        <InputText
                            style={{ width: "26rem" }}
                            id="id_SPEC"
                            value={dataQRY_KSV_PO_MRP1.SPEC}
                            onChange={(e) =>
                                onInputChangeQRY_KSV_PO_MRP1_SPEC(e, "SPEC")
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "17rem" }}>
                    <p className="af-span-p" style={{ width: "7rem" }}>Supplier</p>
                    <div className="af-span-div" style={{ width: "9rem" }}>
                        {/*<Dropdown filter style={{ width: '9rem' }} value={dataQRY_KSV_PO_MRP1_VENDOR_CD} onChange={(e) => onDropdownChangeQRY_KSV_PO_MRP1_VENDOR_CD(e, 'VENDOR_CD')} options={datasQRY_KSV_PO_MRP1_VENDOR_CD} optionLabel="VENDOR_NAME" placeholder="" editable onKeyPress={(e) => onKeyPressQRY_KSV_PO_MRP1_VENDOR_CD(e)} ></Dropdown>*/}
                        <InputText
                            style={{ width: "26rem" }}
                            value={dataQRY_KSV_PO_MRP1.VENDOR_NAME}
                            onChange={(e) =>
                                onInputChangeQRY_KSV_PO_MRP1_VENDOR_NAME(
                                    e,
                                    "VENDOR_NAME",
                                )
                            }
                        />
                    </div>
                </span>
                <span
                    className="af-span-3"
                    style={{ width: "26rem", display: "none" }}
                >
                    <p className="af-span-p" style={{ width: "7rem" }}>Factory#</p>
                    <div className="af-span-div" style={{ width: "18rem" }}>
                        <InputText
                            style={{ width: "18rem" }}
                            id="id_COLOR"
                            value={dataQRY_KSV_PO_MRP1.FACTORY_CD}
                            onChange={(e) =>
                                onInputChangeQRY_KSV_PO_MRP1_FACTORY_CD(
                                    e,
                                    "FACTORY_CD",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "26rem" }}></span>
                <span className="af-span-3" style={{ width: "11rem" }}>
                    <div className="af-span-div-btn" style={{ width: "10rem" }}>
                        <Button
                            label="Matl Add"
                            style={{ width: "10rem" }}
                            className="p-button-text"
                            onClick={addMaterial}
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "11rem" }}>
                    <div className="af-span-div-btn" style={{ width: "10rem" }}>
                        <Button
                            label="Reset"
                            style={{ width: "10rem" }}
                            className="p-button-text"
                            onClick={resetMaterial}
                        />
                    </div>
                </span>
            </div>

            <div
                className="af-div-first"
                style={{ width: "123rem", height: "22rem" }}
            >
                <AFDataTable preventUnrelatedRerender
                    ref={dt_TBL_KSV_PO_MRP1}
                    editMode="cell"
                    size="small"
                    value={datasTBL_KSV_PO_MRP1}
                    tableStyle={{ tableLayout: "fixed" }}
                    loading={loadingTBL_KSV_PO_MRP1}
                    resizableColumns
                    columnResizeMode="expand"
                    showGridlines
                    selectionMode="checkbox"
                    selection={selectedTBL_KSV_PO_MRP1}
                    onSelectionChange={(e) => {
                        setFlagSelectModeTBL_KSV_PO_MRP1(true);
                        setSelectedTBL_KSV_PO_MRP1(e.value);
                        console.log(
                            "selected length:" + selectedTBL_KSV_PO_MRP1.length,
                        );
                        onRowClick1TBL_KSV_PO_MRP1(e.value);
                    }}
                    onRowClick={onRowClickTBL_KSV_PO_MRP1}
                    dataKey="id"
                    className="datatable-responsive"
                    virtualScrollerOptions={{ itemSize: 20 }}
                    emptyMessage=" " //header={headerTBL_KSV_PO_MRP1}
                    responsiveLayout="scroll"
                    scrollable
                    scrollHeight="230px"
                >
                    <AFColumn field="MATL_CD" headerClassName="t-header" header="Matl Cd" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="MATL_NAME" headerClassName="t-header" header="Description" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>

                    <AFColumn field="COLOR" headerClassName="t-header" header="Color" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="SPEC" headerClassName="t-header" header="Spec" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="MATL_PRICE" headerClassName="t-header" header="Price" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="CURR_CD" headerClassName="t-header" header="Curr" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="UNIT" headerClassName="t-header" header="Unit" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="STOCK_QTY" headerClassName="t-header" header="Stock Qty" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>

                    <AFColumn field="RACK" headerClassName="t-header" header="Rack" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="REASON_TYPE" headerClassName="t-header" header="Reason Type" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="FARE_TYPE" headerClassName="t-header" header="Fare Type" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="REMARK" headerClassName="t-header" header="Remark" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="VENDOR_NAME" headerClassName="t-header" header="Supplier" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="STOCK_STATUS" headerClassName="t-header" header="Stock.S" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="USE_PO_TYPE" headerClassName="t-header" header="Use Po Type.S" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="USE_PO_CD" headerClassName="t-header" header="Use Po Cd" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="USE_PO_SEQ" headerClassName="t-header" header="Use Po Seq" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="USE_ORDER_CD" headerClassName="t-header" header="Use Order" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="USE_MRP_SEQ" headerClassName="t-header" header="Use Mrp Seq" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="USE_MATL_SEQ" headerClassName="t-header" header="Use Matl Seq" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="MATL_SEQ" headerClassName="t-header" header="Matl Seq" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>

                    <AFColumn field="FACTORY_NAME" headerClassName="t-header" header="Factory" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="STOCK_IDX" headerClassName="t-header" header="Stock Idx" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="ORDER_CD" headerClassName="t-header" header="Order Cd" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                </AFDataTable>
            </div>

            <Toast ref={toast} />
        </div>
    );
};

const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(S030506_NEW_PO_SAMPLE, comparisonFn);
