/* eslint-disable */
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
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
import { ServiceS0301_MATL_RECORD } from "../service/service_biz/ServiceS0301_MATL_RECORD";

const moment = require("moment");

import "./page_common.scss";

const emptyKCD_CODE = {
    id: 0,
    CD_GROUP: "",
    CD_CODE: "",
    CD_NAME: "",
    CD_FLAG: "",
};

const emptyQRY_KCD_MATL_MST = {
    MATL_CD: "",
    MATL_NAME: "",
    MOM_CD: "",
    COLOR: "",
    SPEC: "",
    VENDOR_CD: "",
    STATUS_CD: "",
    MATL_TYPE: "",
    MATL_TYPE2: "",
    VENDOR_NAME: "",
};

const emptyQRY_KCD_MATL_MST2 = {
    MATL_CD: "",
    MATL_NAME: "",
    MOM_CD: "",
    COLOR: "",
    SPEC: "",
    VENDOR_CD: "",
    STATUS_CD: "",
    MATL_TYPE: "",
};

const emptyQRY_KCD_MATL_MST3 = {
    MATL_CD: "",
    MATL_NAME: "",
    MOM_CD: "",
    COLOR: "",
    SPEC: "",
    VENDOR_CD: "",
    STATUS_CD: "",
    MATL_TYPE: "",
};

const emptyQRY_KCD_MATL_MST4 = {
    MATL_CD: "",
    MATL_NAME: "",
    MOM_CD: "",
    COLOR: "",
    SPEC: "",
    VENDOR_CD: "",
    STATUS_CD: "",
    MATL_TYPE: "",
};

const emptyQRY_KCD_MATL_MST5 = {
    MATL_CD: "",
    VENDOR_NAME: "",
    MOM_CD: "",
    COLOR: "",
    SPEC: "",
    VENDOR_CD: "",
    STATUS_CD: "",
    MATL_TYPE: "",
};

const emptyTBL_KCD_MATL_MEM = {
    id: 0,
    MATL_CD: "",
    MATL_SEQ: "",
    MATL_PRICE: "",
    CURR_CD: "",
    CONF_FLAG: "",
    PRICE_TYPE: "",
};

const emptyTBL_KCD_MATL_MST = {
    id: 0,
    MATL_TYPE2: "",
    MATL_CD: "",
    MATL_TYPE: "",
    MATL_TYPE_NAME: "",
    VENDOR_CD: "",
    VENDOR_NAME: "",
    MATL_NAME: "",
    COLOR: "",
    SPEC: "",
    UNIT: "",
    UNIT_NAME: "",
    MATL_PRICE: "",
    CURR_CD: "",
    S_MATL_PRICE: "",
    S_CURR_CD: "",
    WEIGHT: "",
    BOX_UNIT: "",
    BOX_UNIT_NAME: "",
    STATUS_CD: "",
    STATUS_NAME: "",
    UPD_USER: "",
    REG_USER: "",
    VENDOR_TYPE: "",
    HS_CD: "",
    ADD_RATE: "",
    ADD_AMT: "",
    ADD_LOSS: "",
    REG_DATETIME: "",
};

const emptyTBL_KCD_MATL_MST2 = {
    id: 0,
    MATL_TYPE2: "",
    MATL_CD: "",
    MATL_TYPE: "",
    MATL_TYPE_NAME: "",
    VENDOR_CD: "",
    VENDOR_NAME: "",
    MATL_NAME: "",
    COLOR: "",
    SPEC: "",
    UNIT: "",
    UNIT_NAME: "",
    MATL_PRICE: "",
    CURR_CD: "",
    S_MATL_PRICE: "",
    S_CURR_CD: "",
    WEIGHT: "",
    BOX_UNIT: "",
    BOX_UNIT_NAME: "",
    STATUS_CD: "",
    STATUS_NAME: "",
    UPD_USER: "",
    REG_USER: "",
    VENDOR_TYPE: "",
    HS_CD: "",
    ADD_RATE: "",
    ADD_AMT: "",
    ADD_LOSS: "",
    REG_DATETIME: "",
};

const emptyTBL_KCD_MATL_MST3 = {
    id: 0,
    MATL_TYPE2: "",
    MATL_CD: "",
    MATL_TYPE: "",
    MATL_TYPE_NAME: "",
    VENDOR_CD: "",
    VENDOR_NAME: "",
    MATL_NAME: "",
    COLOR: "",
    SPEC: "",
    UNIT: "",
    UNIT_NAME: "",
    MATL_PRICE: "",
    CURR_CD: "",
    S_MATL_PRICE: "",
    S_CURR_CD: "",
    WEIGHT: "",
    BOX_UNIT: "",
    BOX_UNIT_NAME: "",
    STATUS_CD: "",
    STATUS_NAME: "",
    UPD_USER: "",
    REG_USER: "",
    VENDOR_TYPE: "",
    HS_CD: "",
    ADD_RATE: "",
    ADD_AMT: "",
    ADD_LOSS: "",
    REG_DATETIME: "",
};

const emptyTBL_KCD_MATL_MST4 = {
    id: 0,
    MATL_TYPE2: "",
    MATL_CD: "",
    MATL_TYPE: "",
    MATL_TYPE_NAME: "",
    VENDOR_CD: "",
    VENDOR_NAME: "",
    MATL_NAME: "",
    COLOR: "",
    SPEC: "",
    UNIT: "",
    UNIT_NAME: "",
    MATL_PRICE: "",
    CURR_CD: "",
    S_MATL_PRICE: "",
    S_CURR_CD: "",
    WEIGHT: "",
    BOX_UNIT: "",
    BOX_UNIT_NAME: "",
    STATUS_CD: "",
    STATUS_NAME: "",
    UPD_USER: "",
    REG_USER: "",
    VENDOR_TYPE: "",
    HS_CD: "",
    ADD_RATE: "",
    ADD_AMT: "",
    ADD_LOSS: "",
    REG_DATETIME: "",
};

const emptyTBL_KCD_MATL_MST5 = {
    id: 0,
    MATL_TYPE2: "",
    MATL_CD: "",
    MATL_TYPE: "",
    MATL_TYPE_NAME: "",
    VENDOR_CD: "",
    VENDOR_NAME: "",
    MATL_NAME: "",
    COLOR: "",
    SPEC: "",
    UNIT: "",
    UNIT_NAME: "",
    MATL_PRICE: "",
    CURR_CD: "",
    S_MATL_PRICE: "",
    S_CURR_CD: "",
    WEIGHT: "",
    BOX_UNIT: "",
    BOX_UNIT_NAME: "",
    STATUS_CD: "",
    STATUS_NAME: "",
    UPD_USER: "",
    REG_USER: "",
    VENDOR_TYPE: "",
    HS_CD: "",
    ADD_RATE: "",
    ADD_AMT: "",
    ADD_LOSS: "",
    REG_DATETIME: "",
};

const emptyTBL_KCD_MATL_MST6 = {
    id: 0,
    MATL_TYPE2: "",
    MATL_CD: "",
    MATL_TYPE: "",
    MATL_TYPE_NAME: "",
    VENDOR_CD: "",
    VENDOR_NAME: "",
    MATL_NAME: "",
    COLOR: "",
    SPEC: "",
    UNIT: "",
    UNIT_NAME: "",
    MATL_PRICE: "",
    CURR_CD: "",
    S_MATL_PRICE: "",
    S_CURR_CD: "",
    WEIGHT: "",
    BOX_UNIT: "",
    BOX_UNIT_NAME: "",
    STATUS_CD: "",
    STATUS_NAME: "",
    UPD_USER: "",
    REG_USER: "",
    VENDOR_TYPE: "",
    HS_CD: "",
    ADD_RATE: "",
    ADD_AMT: "",
    ADD_LOSS: "",
    REG_DATETIME: "",
};

const emptyTBL_KCD_MATL_SALE = {
    id: 0,
    MATL_CD: "",
    MATL_SEQ: "",
    MATL_PRICE: "",
    CURR_CD: "",
    CONF_FLAG: "",
    PRICE_TYPE: "",
};

const emptyEDT_KCD_MATL_MEM = {
    MATL_CD: "",
    MATL_SEQ: "",
    MATL_PRICE: "",
    CURR_CD: "USD",
    CONF_FLAG: "",
    PRICE_TYPE: "",
    CURR_DATE: "",
};

const emptyEDT_KCD_MATL_MST = {
    MATL_TYPE2: "",
    MATL_TYPE2_NAME: "",
    MATL_CD: "",
    MATL_TYPE: "",
    MATL_TYPE_NAME: "",
    VENDOR_CD: "",
    VENDOR_NAME: "",
    MATL_NAME: "",
    COLOR: "",
    SPEC: "",
    UNIT: "",
    MATL_UNIT_NAME: "",
    MATL_PRICE: "",
    CURR_CD: "",
    S_MATL_PRICE: "",
    S_CURR_CD: "",
    WEIGHT: "",
    BOX_UNIT: "",
    BOX_UNIT_NAME: "",
    STATUS_CD: "",
    STATUS_CD_NAME: "",
    UPD_USER: "",
    REG_USER: "",
    VENDOR_TYPE: "",
    HS_CD: "",
    V_COMP: "",
    ADD_RATE: "",
    ADD_AMT: "",
    ADD_LOSS: "",
    REG_DATETIME: "",
    MATL_SEQ_MAX: "",
    PRICE_TYPE: "",
    COMP1: "",
    COMP1_P: "",
    COMP2: "",
    COMP2_P: "",
    COMP3: "",
    COMP3_P: "",
    COMP4: "",
    COMP4_P: "",
    OFFER_SPEC: "",
    UPDATE_REASON: "",
};

const emptyEDT_KCD_MATL_MST6 = {
    MATL_TYPE2: "",
    MATL_TYPE2_NAME: "",
    MATL_CD: "",
    MATL_TYPE: "",
    MATL_TYPE_NAME: "",
    VENDOR_CD: "",
    VENDOR_NAME: "",
    MATL_NAME: "",
    COLOR: "",
    SPEC: "",
    UNIT: "",
    MATL_UNIT_NAME: "",
    MATL_PRICE: "",
    CURR_CD: "",
    S_MATL_PRICE: "",
    S_CURR_CD: "",
    WEIGHT: "",
    BOX_UNIT: "",
    BOX_UNIT_NAME: "",
    STATUS_CD: "",
    STATUS_CD_NAME: "",
    UPD_USER: "",
    REG_USER: "",
    VENDOR_TYPE: "",
    HS_CD: "",
    ADD_RATE: "",
    ADD_AMT: "",
    ADD_LOSS: "",
    REG_DATETIME: "",
    MATL_SEQ_MAX: "",
    PRICE_TYPE: "",
    COMP1: "",
    COMP1_P: "",
    COMP2: "",
    COMP2_P: "",
    COMP3: "",
    COMP3_P: "",
    COMP4: "",
    COMP4_P: "",
    OFFER_SPEC: "",
    UPDATE_REASON: "",
};

const emptyEDT_KCD_MATL_MST1 = {
    UNIT: "",
    MATL_PRICE: "",
    CURR_CD_M: "USD",
    CURR_CD_S: "USD",
    VENDOR_CD: "",
};

const emptyEDT_KCD_MATL_SALE = {
    MATL_CD: "",
    MATL_SEQ: "",
    MATL_PRICE: "",
    CURR_CD: "USD",
    CONF_FLAG: "",
    PRICE_TYPE: "",
    CURR_DATE: "",
};

const S0301_MATL_RECORD = () => {
    const serviceLibRef = useRef(null);
    if (!serviceLibRef.current) {
        serviceLibRef.current = new ServiceLib();
        serviceLibRef.current.loginConfirm();
    }
    const serviceLib = serviceLibRef.current;
    const serviceS0301_MATL_RECORDRef = useRef(null);
    if (!serviceS0301_MATL_RECORDRef.current) serviceS0301_MATL_RECORDRef.current = new ServiceS0301_MATL_RECORD();
    const serviceS0301_MATL_RECORD = serviceS0301_MATL_RECORDRef.current;

    const toast = useRef(null);

    /* splitter 관련 */
    const [styleVal, setStyleVal] = useState({ width: "65vw" });

    //

    const process_ETC_UPDATE = () => {
        console.log(dataEDT_KCD_MATL_MST);

        let _datasEDT_KCD_MATL_MST = [...datasEDT_KCD_MATL_MST];
        let _dataEDT_KCD_MATL_MST = { ...dataEDT_KCD_MATL_MST };

        if (typeof _dataEDT_KCD_MATL_MST.__typename !== "undefined")
            delete _dataEDT_KCD_MATL_MST.__typename;

        let tArray = [];
        _dataEDT_KCD_MATL_MST.MATL_MEM = [];
        _dataEDT_KCD_MATL_MST.MATL_SALE = [];
        tArray.push(_dataEDT_KCD_MATL_MST);

        var tComp1 = "";
        if (dataEDT_KCD_MATL_MST.COMP1) tComp1 = dataEDT_KCD_MATL_MST.COMP1;
        var tComp2 = "";
        if (dataEDT_KCD_MATL_MST.COMP2) tComp2 = dataEDT_KCD_MATL_MST.COMP2;
        var tComp3 = "";
        if (dataEDT_KCD_MATL_MST.COMP3) tComp3 = dataEDT_KCD_MATL_MST.COMP3;
        var tComp4 = "";
        if (dataEDT_KCD_MATL_MST.COMP4) tComp4 = dataEDT_KCD_MATL_MST.COMP4;

        var tChk = 0;
        if (
            dataEDT_KCD_MATL_MST.COMP1_P &&
            parseFloat(dataEDT_KCD_MATL_MST.COMP1_P) > 0 &&
            !tComp1
        )
            tChk = 1;
        if (
            dataEDT_KCD_MATL_MST.COMP2_P &&
            parseFloat(dataEDT_KCD_MATL_MST.COMP2_P) > 0 &&
            !tComp2
        )
            tChk = 1;
        if (
            dataEDT_KCD_MATL_MST.COMP3_P &&
            parseFloat(dataEDT_KCD_MATL_MST.COMP3_P) > 0 &&
            !tComp3
        )
            tChk = 1;
        if (
            dataEDT_KCD_MATL_MST.COMP4_P &&
            parseFloat(dataEDT_KCD_MATL_MST.COMP4_P) > 0 &&
            !tComp4
        )
            tChk = 1;

        if (tChk > 0) {
            alert(
                `Check Composition Input Value.(${tComp1}/${tComp2}/${tComp3}/${tComp4})`,
            );
            return;
        }

        _dataEDT_KCD_MATL_MST.COMP1 = tComp1;
        _dataEDT_KCD_MATL_MST.COMP2 = tComp2;
        _dataEDT_KCD_MATL_MST.COMP3 = tComp3;
        _dataEDT_KCD_MATL_MST.COMP4 = tComp4;

        serviceS0301_MATL_RECORD.mgrUpdate_ETC_UPDATE(tArray).then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                if (data.length > 0) {
                    alert(data[0].CODE);
                    if (data[0].CODE.includes("SUCC")) {
                        refreshSingleMatlRow(dataEDT_KCD_MATL_MST.MATL_CD);
                    }
                }
            } else {
                // var tStr = data.graphQLErrors[0].message;
                alert(JSON.stringify(data.graphQLErrors));
                console.log(
                    "ServiceNawooAll.mgrUpdateS0301_MATL_RECORD( error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });
    };

    const search_QRY_VENDOR = (argData) => {
        var tInObj = {};
        tInObj.VENDOR_CD = argData;
        serviceS0301_MATL_RECORD.mgrQuery_QRY_VENDOR(tInObj).then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                if (data.length > 0) {
                    setDatasQRY_KCD_MATL_MST_VENDOR_CD(data);
                    setDataQRY_KCD_MATL_MST_VENDOR_CD(data[0]);

                    setDatasQRY_KCD_MATL_MST2_VENDOR_CD(data);
                    setDataQRY_KCD_MATL_MST2_VENDOR_CD(data[0]);

                    setDatasEDT_KCD_MATL_MST_VENDOR_CD(data);
                    setDataEDT_KCD_MATL_MST_VENDOR_CD(data[0]);
                }
            } else {
                // var tStr = data.graphQLErrors[0].message;
                console.log(
                    "mgrQueryTBL_KCD_MATL_SALE()error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });
    };

    const search_QRY_BATCH_SAVE = (reg_user, reg_datetime) => {
        var tQry = { ...dataEDT_KCD_MATL_MST6 };
        tQry.REG_USER = reg_user;
        tQry.REG_DATETIME = reg_datetime;
        setDataEDT_KCD_MATL_MST6(tQry);

        var tInObj = {};
        tInObj.reg_user = reg_user;
        tInObj.reg_datetime = reg_datetime;

        setLoadingTBL_KCD_MATL_MST6(true);
        serviceS0301_MATL_RECORD
            .mgrQuery_QRY_BATCH_SAVE(tInObj)
            .then((data) => {
                setLoadingTBL_KCD_MATL_MST6(false);
                if (typeof data.graphQLErrors === "undefined") {
                    if (data.length > 0) {
                        const updatedData = data.map((item, index) => ({
                            id: index + 1,
                            ...item,
                        }));
                        setDatasTBL_KCD_MATL_MST6(updatedData);
                    }
                } else {
                    // var tStr = data.graphQLErrors[0].message;
                    console.log(
                        "mgrQueryTBL_KCD_MATL_SALE()error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });
    };

    /*QRY KCD_MATL_MST */
    const [dataQRY_KCD_MATL_MST, setDataQRY_KCD_MATL_MST] = useState(
        emptyQRY_KCD_MATL_MST,
    );
    const dataQRY_KCD_MATL_MSTRef = useRef(dataQRY_KCD_MATL_MST);
    dataQRY_KCD_MATL_MSTRef.current = dataQRY_KCD_MATL_MST;
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

    const onInputChangeQRY_KCD_MATL_MST_VENDOR_NAME = (e, name) => {
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

    const [
        datasQRY_KCD_MATL_MST_VENDOR_CD,
        setDatasQRY_KCD_MATL_MST_VENDOR_CD,
    ] = useState([]);
    const [dataQRY_KCD_MATL_MST_VENDOR_CD, setDataQRY_KCD_MATL_MST_VENDOR_CD] =
        useState({});

    const onKeyPressQRY_KCD_MATL_MST_VENDOR_CD = (e, name) => {
        if (e.key === "Enter") {
            console.log(e);
            search_QRY_VENDOR(e.target.value);
            // process_SEARCH_VENDOR();
            // search_LIST_1();
        }
    };

    const [
        datasQRY_KCD_MATL_MST_STATUS_CD,
        setDatasQRY_KCD_MATL_MST_STATUS_CD,
    ] = useState([]);
    const [dataQRY_KCD_MATL_MST_STATUS_CD, setDataQRY_KCD_MATL_MST_STATUS_CD] =
        useState({});

    const [
        datasQRY_KCD_MATL_MST_MATL_TYPE,
        setDatasQRY_KCD_MATL_MST_MATL_TYPE,
    ] = useState([]);
    const [dataQRY_KCD_MATL_MST_MATL_TYPE, setDataQRY_KCD_MATL_MST_MATL_TYPE] =
        useState({});
    const [
        datasQRY_KCD_MATL_MST_MATL_TYPE2,
        setDatasQRY_KCD_MATL_MST_MATL_TYPE2,
    ] = useState([]);
    const [
        dataQRY_KCD_MATL_MST_MATL_TYPE2,
        setDataQRY_KCD_MATL_MST_MATL_TYPE2,
    ] = useState({});

    const onDropdownChangeQRY_KCD_MATL_MST_MATL_TYPE = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataQRY_KCD_MATL_MST = { ...dataQRY_KCD_MATL_MST };

        let tTypeVal = _dataQRY_KCD_MATL_MST[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KCD_MATL_MST[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KCD_MATL_MST[`${name}`] = parseInt(val);
        }

        setDataQRY_KCD_MATL_MST(_dataQRY_KCD_MATL_MST);
        setDataQRY_KCD_MATL_MST_MATL_TYPE(e.value);
    };

    const onDropdownChangeQRY_KCD_MATL_MST_MATL_TYPE2 = (e, name) => {
        let val = (e.value && e.value.SEQ) || "";

        let _dataQRY_KCD_MATL_MST = { ...dataQRY_KCD_MATL_MST };

        let tTypeVal = _dataQRY_KCD_MATL_MST[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KCD_MATL_MST[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KCD_MATL_MST[`${name}`] = parseInt(val);
        }

        setDataQRY_KCD_MATL_MST(_dataQRY_KCD_MATL_MST);
        setDataQRY_KCD_MATL_MST_MATL_TYPE2(e.value);
    };

    /*QRY KCD_MATL_MST */
    const [dataQRY_KCD_MATL_MST2, setDataQRY_KCD_MATL_MST2] = useState(
        emptyQRY_KCD_MATL_MST2,
    );
    const onInputChangeQRY_KCD_MATL_MST2_SPEC = (e, name) => {
        let val = (e.target && e.target.value) || "";
        let _dataQRY_KCD_MATL_MST2 = { ...dataQRY_KCD_MATL_MST2 };
        let tTypeVal = _dataQRY_KCD_MATL_MST2[`${name}`];
        if (typeof tTypeVal === "string")
            _dataQRY_KCD_MATL_MST2[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KCD_MATL_MST2[`${name}`] = parseInt(val);
        setDataQRY_KCD_MATL_MST2(_dataQRY_KCD_MATL_MST2);
    };

    const onInputChangeQRY_KCD_MATL_MST2_COLOR = (e, name) => {
        let val = (e.target && e.target.value) || "";
        let _dataQRY_KCD_MATL_MST2 = { ...dataQRY_KCD_MATL_MST2 };
        let tTypeVal = _dataQRY_KCD_MATL_MST2[`${name}`];
        if (typeof tTypeVal === "string")
            _dataQRY_KCD_MATL_MST2[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KCD_MATL_MST2[`${name}`] = parseInt(val);
        setDataQRY_KCD_MATL_MST2(_dataQRY_KCD_MATL_MST2);
    };

    const onInputChangeQRY_KCD_MATL_MST2_MATL_NAME = (e, name) => {
        let val = (e.target && e.target.value) || "";
        let _dataQRY_KCD_MATL_MST2 = { ...dataQRY_KCD_MATL_MST2 };
        let tTypeVal = _dataQRY_KCD_MATL_MST2[`${name}`];
        if (typeof tTypeVal === "string")
            _dataQRY_KCD_MATL_MST2[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KCD_MATL_MST2[`${name}`] = parseInt(val);
        setDataQRY_KCD_MATL_MST2(_dataQRY_KCD_MATL_MST2);
    };

    const onInputChangeQRY_KCD_MATL_MST2_MATL_CD = (e, name) => {
        let val = (e.target && e.target.value) || "";
        let _dataQRY_KCD_MATL_MST2 = { ...dataQRY_KCD_MATL_MST2 };
        let tTypeVal = _dataQRY_KCD_MATL_MST2[`${name}`];
        if (typeof tTypeVal === "string")
            _dataQRY_KCD_MATL_MST2[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KCD_MATL_MST2[`${name}`] = parseInt(val);
        setDataQRY_KCD_MATL_MST2(_dataQRY_KCD_MATL_MST2);
    };

    const onInputChangeQRY_KCD_MATL_MST2_MOM_CD = (e, name) => {
        let val = (e.target && e.target.value) || "";
        let _dataQRY_KCD_MATL_MST2 = { ...dataQRY_KCD_MATL_MST2 };
        let tTypeVal = _dataQRY_KCD_MATL_MST2[`${name}`];
        if (typeof tTypeVal === "string")
            _dataQRY_KCD_MATL_MST2[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KCD_MATL_MST2[`${name}`] = parseInt(val);
        setDataQRY_KCD_MATL_MST2(_dataQRY_KCD_MATL_MST2);
    };

    const [
        datasQRY_KCD_MATL_MST2_VENDOR_CD,
        setDatasQRY_KCD_MATL_MST2_VENDOR_CD,
    ] = useState([]);
    const [
        dataQRY_KCD_MATL_MST2_VENDOR_CD,
        setDataQRY_KCD_MATL_MST2_VENDOR_CD,
    ] = useState({});

    const onDropdownChangeQRY_KCD_MATL_MST2_VENDOR_CD = (e, name) => {
        let val = (e.value && e.value.VENDOR_CD) || "";

        let _dataQRY_KCD_MATL_MST2 = { ...dataQRY_KCD_MATL_MST2 };

        let tTypeVal = _dataQRY_KCD_MATL_MST2[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KCD_MATL_MST2[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KCD_MATL_MST2[`${name}`] = parseInt(val);
        }

        setDataQRY_KCD_MATL_MST2(_dataQRY_KCD_MATL_MST2);
        setDataQRY_KCD_MATL_MST2_VENDOR_CD(e.value);
    };

    const onKeyPressQRY_KCD_MATL_MST2_VENDOR_CD = (e, name) => {
        if (e.key === "Enter") {
            console.log(e);
            search_QRY_VENDOR(e.target.value);
            // process_SEARCH_VENDOR();
            // search_LIST_1();
        }
    };

    const [
        datasQRY_KCD_MATL_MST2_STATUS_CD,
        setDatasQRY_KCD_MATL_MST2_STATUS_CD,
    ] = useState([]);
    const [
        dataQRY_KCD_MATL_MST2_STATUS_CD,
        setDataQRY_KCD_MATL_MST2_STATUS_CD,
    ] = useState({});

    const [
        datasQRY_KCD_MATL_MST2_MATL_TYPE,
        setDatasQRY_KCD_MATL_MST2_MATL_TYPE,
    ] = useState([]);
    const [
        dataQRY_KCD_MATL_MST2_MATL_TYPE,
        setDataQRY_KCD_MATL_MST2_MATL_TYPE,
    ] = useState({});

    /*QRY KCD_MATL_MST */
    const [dataQRY_KCD_MATL_MST3, setDataQRY_KCD_MATL_MST3] = useState(
        emptyQRY_KCD_MATL_MST3,
    );

    const onInputChangeQRY_KCD_MATL_MST3_MATL_CD = (e, name) => {
        let val = (e.target && e.target.value) || "";
        let _dataQRY_KCD_MATL_MST3 = { ...dataQRY_KCD_MATL_MST3 };
        let tTypeVal = _dataQRY_KCD_MATL_MST3[`${name}`];
        if (typeof tTypeVal === "string")
            _dataQRY_KCD_MATL_MST3[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KCD_MATL_MST3[`${name}`] = parseInt(val);
        setDataQRY_KCD_MATL_MST3(_dataQRY_KCD_MATL_MST3);
    };

    const [
        datasQRY_KCD_MATL_MST3_VENDOR_CD,
        setDatasQRY_KCD_MATL_MST3_VENDOR_CD,
    ] = useState([]);
    const [
        dataQRY_KCD_MATL_MST3_VENDOR_CD,
        setDataQRY_KCD_MATL_MST3_VENDOR_CD,
    ] = useState({});

    const [
        datasQRY_KCD_MATL_MST3_STATUS_CD,
        setDatasQRY_KCD_MATL_MST3_STATUS_CD,
    ] = useState([]);
    const [
        dataQRY_KCD_MATL_MST3_STATUS_CD,
        setDataQRY_KCD_MATL_MST3_STATUS_CD,
    ] = useState({});

    const [
        datasQRY_KCD_MATL_MST3_MATL_TYPE,
        setDatasQRY_KCD_MATL_MST3_MATL_TYPE,
    ] = useState([]);
    const [
        dataQRY_KCD_MATL_MST3_MATL_TYPE,
        setDataQRY_KCD_MATL_MST3_MATL_TYPE,
    ] = useState({});

    /*QRY KCD_MATL_MST */
    const [dataQRY_KCD_MATL_MST4, setDataQRY_KCD_MATL_MST4] = useState(
        emptyQRY_KCD_MATL_MST4,
    );

    const onInputChangeQRY_KCD_MATL_MST4_MATL_CD = (e, name) => {
        let val = (e.target && e.target.value) || "";
        let _dataQRY_KCD_MATL_MST4 = { ...dataQRY_KCD_MATL_MST4 };
        let tTypeVal = _dataQRY_KCD_MATL_MST4[`${name}`];
        if (typeof tTypeVal === "string")
            _dataQRY_KCD_MATL_MST4[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KCD_MATL_MST4[`${name}`] = parseInt(val);
        setDataQRY_KCD_MATL_MST4(_dataQRY_KCD_MATL_MST4);
    };

    const [
        datasQRY_KCD_MATL_MST4_VENDOR_CD,
        setDatasQRY_KCD_MATL_MST4_VENDOR_CD,
    ] = useState([]);
    const [
        dataQRY_KCD_MATL_MST4_VENDOR_CD,
        setDataQRY_KCD_MATL_MST4_VENDOR_CD,
    ] = useState({});

    const [
        datasQRY_KCD_MATL_MST4_STATUS_CD,
        setDatasQRY_KCD_MATL_MST4_STATUS_CD,
    ] = useState([]);
    const [
        dataQRY_KCD_MATL_MST4_STATUS_CD,
        setDataQRY_KCD_MATL_MST4_STATUS_CD,
    ] = useState({});

    const [
        datasQRY_KCD_MATL_MST4_MATL_TYPE,
        setDatasQRY_KCD_MATL_MST4_MATL_TYPE,
    ] = useState([]);
    const [
        dataQRY_KCD_MATL_MST4_MATL_TYPE,
        setDataQRY_KCD_MATL_MST4_MATL_TYPE,
    ] = useState({});

    /*QRY KCD_MATL_MST */
    const [dataQRY_KCD_MATL_MST5, setDataQRY_KCD_MATL_MST5] = useState(
        emptyQRY_KCD_MATL_MST5,
    );

    const onInputChangeQRY_KCD_MATL_MST5_VENDOR_NAME = (e, name) => {
        let val = (e.target && e.target.value) || "";
        let _dataQRY_KCD_MATL_MST5 = { ...dataQRY_KCD_MATL_MST5 };
        let tTypeVal = _dataQRY_KCD_MATL_MST5[`${name}`];
        if (typeof tTypeVal === "string")
            _dataQRY_KCD_MATL_MST5[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KCD_MATL_MST5[`${name}`] = parseInt(val);
        setDataQRY_KCD_MATL_MST5(_dataQRY_KCD_MATL_MST5);
    };

    const onInputChangeQRY_KCD_MATL_MST5_MATL_CD = (e, name) => {
        let val = (e.target && e.target.value) || "";
        let _dataQRY_KCD_MATL_MST5 = { ...dataQRY_KCD_MATL_MST5 };
        let tTypeVal = _dataQRY_KCD_MATL_MST5[`${name}`];
        if (typeof tTypeVal === "string")
            _dataQRY_KCD_MATL_MST5[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KCD_MATL_MST5[`${name}`] = parseInt(val);
        setDataQRY_KCD_MATL_MST5(_dataQRY_KCD_MATL_MST5);
    };

    const [
        datasQRY_KCD_MATL_MST5_VENDOR_CD,
        setDatasQRY_KCD_MATL_MST5_VENDOR_CD,
    ] = useState([]);
    const [
        dataQRY_KCD_MATL_MST5_VENDOR_CD,
        setDataQRY_KCD_MATL_MST5_VENDOR_CD,
    ] = useState({});

    const [
        datasQRY_KCD_MATL_MST5_STATUS_CD,
        setDatasQRY_KCD_MATL_MST5_STATUS_CD,
    ] = useState([]);
    const [
        dataQRY_KCD_MATL_MST5_STATUS_CD,
        setDataQRY_KCD_MATL_MST5_STATUS_CD,
    ] = useState({});

    const [
        datasQRY_KCD_MATL_MST5_MATL_TYPE,
        setDatasQRY_KCD_MATL_MST5_MATL_TYPE,
    ] = useState([]);
    const [
        dataQRY_KCD_MATL_MST5_MATL_TYPE,
        setDataQRY_KCD_MATL_MST5_MATL_TYPE,
    ] = useState({});

    /* TABLE KCD_MATL_MEM*/
    // DEFINE DATAGRID : TBL_KCD_MATL_MEM
    const [datasTBL_KCD_MATL_MEM, setDatasTBL_KCD_MATL_MEM] = useState([]);
    const dt_TBL_KCD_MATL_MEM = useRef(null);
    const [dataTBL_KCD_MATL_MEM, setDataTBL_KCD_MATL_MEM] = useState(
        emptyTBL_KCD_MATL_MEM,
    );
    const [selectedTBL_KCD_MATL_MEM, setSelectedTBL_KCD_MATL_MEM] = useState(
        {},
    );
    const [flagSelectModeTBL_KCD_MATL_MEM, setFlagSelectModeTBL_KCD_MATL_MEM] =
        useState(false);

    // DATAGRID CODE : TBL_KCD_MATL_MEM

    const onRowClick1TBL_KCD_MATL_MEM = (argData0) => {
        var argData = {};

        if (argData0 === null) {
            argData = { ...emptyEDT_KCD_MATL_MEM };
        } else if (typeof argData0.length !== "undefined") {
            argData = { ...argData0[0] };
        } else {
            argData = { ...argData0 };
        }

        let argTBL_KCD_MATL_MEM = { ...argData };

        setDataTBL_KCD_MATL_MEM(argTBL_KCD_MATL_MEM);

        var tEDT = { ...dataEDT_KCD_MATL_MEM };
        tEDT.MATL_CD = argTBL_KCD_MATL_MEM.MATL_CD;
        tEDT.MATL_SEQ = argTBL_KCD_MATL_MEM.MATL_SEQ;
        //tEDT.MATL_PRICE = argTBL_KCD_MATL_MEM.MATL_PRICE;
        tEDT.CURR_CD = argTBL_KCD_MATL_MEM.CURR_CD;
        tEDT.CONF_FLAG = argTBL_KCD_MATL_MEM.CONF_FLAG;
        tEDT.PRICE_TYPE = argTBL_KCD_MATL_MEM.PRICE_TYPE;
        tEDT.CURR_DATE = argTBL_KCD_MATL_MEM.CURR_DATE;
        setDataEDT_KCD_MATL_MEM(tEDT);

        editEDT_KCD_MATL_MEM_CURR_CD(tEDT.CURR_CD);
    };

    const onRowClickTBL_KCD_MATL_MEM = (event) => {
        let argTBL_KCD_MATL_MEM = event.data;
        if (flagSelectModeTBL_KCD_MATL_MEM) return;

        // Service : NawooAll:mgrQueryTBL_KCD_MATL_MEM
    };

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
    const [selectedTBL_KCD_MATL_MST_CELL, setSelectedTBL_KCD_MATL_MST_CELL] =
        useState([]);

    // DATAGRID CODE : TBL_KCD_MATL_MST

    const editTBL_KCD_MATL_MST = (argData) => {

        // editEDT_KCD_MATL_MST_VENDOR_CD(argData.VENDOR_CD);
        var tArray = [];
        var tObj = {};

        tObj = {};
        tObj.VENDOR_CD = argData.VENDOR_CD;
        tObj.VENDOR_NAME = argData.VENDOR_NAME;
        tArray.push(tObj);

        const foundVendor = datasEDT_KCD_MATL_MST_VENDOR_CD.find(
            (vendor) =>
                String(vendor.VENDOR_CD) === String(argData.VENDOR_CD),
        );

        console.log(argData);
        setDataEDT_KCD_MATL_MST_VENDOR_CD(
            foundVendor || datasEDT_KCD_MATL_MST_VENDOR_CD[0] || {},
        );
        editEDT_KCD_MATL_MST_STATUS_CD(argData.STATUS_CD);
        editEDT_KCD_MATL_MST_MATL_TYPE(argData.MATL_TYPE);
        editEDT_KCD_MATL_MST_UNIT(argData.UNIT);
        editEDT_KCD_MATL_MST_BOX_UNIT(argData.BOX_UNIT);
        editEDT_KCD_MATL_MST_MATL_TYPE2(argData.MATL_TYPE2);
        editEDT_KCD_MATL_MST_CURR_CD(argData.CURR_CD);
        editEDT_KCD_MATL_MST_PRICE_TYPE(argData.PRICE_TYPE);
        editEDT_KCD_MATL_MST_HS_CD(argData.HS_CD);
        editEDT_KCD_MATL_MST_COMP1(argData.COMP1);
        editEDT_KCD_MATL_MST_COMP2(argData.COMP2);
        editEDT_KCD_MATL_MST_COMP3(argData.COMP3);
        editEDT_KCD_MATL_MST_COMP4(argData.COMP4);

        let _dataEDT_KCD_MATL_MST = {
            ...dataEDT_KCD_MATL_MST,
            ...argData,
        };
        _dataEDT_KCD_MATL_MST.MATL_CD = argData.MATL_CD;
        _dataEDT_KCD_MATL_MST.MATL_NAME = argData.MATL_NAME;
        _dataEDT_KCD_MATL_MST.SPEC = argData.SPEC;
        _dataEDT_KCD_MATL_MST.COLOR = argData.COLOR;
        _dataEDT_KCD_MATL_MST.ADD_RATE = argData.ADD_RATE;
        _dataEDT_KCD_MATL_MST.ADD_AMT = argData.ADD_AMT;
        _dataEDT_KCD_MATL_MST.ADD_LOSS = argData.ADD_LOSS;
        _dataEDT_KCD_MATL_MST.WEIGHT = argData.WEIGHT;
        _dataEDT_KCD_MATL_MST.PRICE_TYPE = argData.PRICE_TYPE;
        _dataEDT_KCD_MATL_MST.VENDOR_CD = argData.VENDOR_CD;
        _dataEDT_KCD_MATL_MST.VENDOR_NAME = argData.VENDOR_NAME;
        _dataEDT_KCD_MATL_MST.STATUS_CD = argData.STATUS_CD;
        _dataEDT_KCD_MATL_MST.UNIT = argData.UNIT;
        _dataEDT_KCD_MATL_MST.BOX_UNIT = argData.BOX_UNIT;
        _dataEDT_KCD_MATL_MST.MATL_TYPE = argData.MATL_TYPE;
        _dataEDT_KCD_MATL_MST.MATL_TYPE2 = argData.MATL_TYPE2;
        _dataEDT_KCD_MATL_MST.CURR_CD = argData.CURR_CD;
        _dataEDT_KCD_MATL_MST.HS_CD = argData.HS_CD;

        /* Sub Material 선택시 COMP DISABLE 처리 */
        if ((argData.MATL_TYPE || "").startsWith("S")) {
            const defaultComp1 = datasEDT_KCD_MATL_MST_COMP1[0];
            const defaultComp2 = datasEDT_KCD_MATL_MST_COMP2[0];
            const defaultComp3 = datasEDT_KCD_MATL_MST_COMP3[0];
            const defaultComp4 = datasEDT_KCD_MATL_MST_COMP4[0];

            setIsSub(true);
            _dataEDT_KCD_MATL_MST.COMP1_P = "";
            _dataEDT_KCD_MATL_MST.COMP2_P = "";
            _dataEDT_KCD_MATL_MST.COMP3_P = "";
            _dataEDT_KCD_MATL_MST.COMP4_P = "";
            setDataEDT_KCD_MATL_MST_COMP1(defaultComp1 || {});
            setDataEDT_KCD_MATL_MST_COMP2(defaultComp2 || {});
            setDataEDT_KCD_MATL_MST_COMP3(defaultComp3 || {});
            setDataEDT_KCD_MATL_MST_COMP4(defaultComp4 || {});

            _dataEDT_KCD_MATL_MST.COMP1 = defaultComp1?.CD_CODE || "";
            _dataEDT_KCD_MATL_MST.COMP2 = defaultComp2?.CD_CODE || "";
            _dataEDT_KCD_MATL_MST.COMP3 = defaultComp3?.CD_CODE || "";
            _dataEDT_KCD_MATL_MST.COMP4 = defaultComp4?.CD_CODE || "";
        } else {
            setIsSub(false);
            setDataEDT_KCD_MATL_MST_COMP1(argData.COMP1);
            setDataEDT_KCD_MATL_MST_COMP2(argData.COMP2);
            setDataEDT_KCD_MATL_MST_COMP3(argData.COMP3);
            setDataEDT_KCD_MATL_MST_COMP4(argData.COMP4);

            _dataEDT_KCD_MATL_MST.COMP1 = argData.COMP1;
            _dataEDT_KCD_MATL_MST.COMP2 = argData.COMP2;
            _dataEDT_KCD_MATL_MST.COMP3 = argData.COMP3;
            _dataEDT_KCD_MATL_MST.COMP4 = argData.COMP4;
        }

        _dataEDT_KCD_MATL_MST.COMP1_P = argData.COMP1_P;
        _dataEDT_KCD_MATL_MST.COMP2_P = argData.COMP2_P;
        _dataEDT_KCD_MATL_MST.COMP3_P = argData.COMP3_P;
        _dataEDT_KCD_MATL_MST.COMP4_P = argData.COMP4_P;

        setDataEDT_KCD_MATL_MST(_dataEDT_KCD_MATL_MST);
    };

    const searchListStyleRef = useRef(null);
    const searchListRemarkRef = useRef(null);

    const onRowDoubleClickTBL_KCD_MATL_MST = useCallback((argData0) => {
        var tRemark = "";
        var tColName = "";
        var tKeys = Object.keys(argData0.data);
        var tFlag = 0;
        tKeys.forEach((col, i) => {
            var tValue = argData0.data[`${col}`];
            if (
                tFlag === 0 &&
                tValue === argData0.originalEvent.target.innerText
            ) {
                tColName = col;
                tFlag = 1;
            }
        });
        console.log("Double Click=>" + tColName);
        if (tColName === "MATL_CD") {
            var tObj = {};
            tObj.MATL_CD = argData0.data.MATL_CD;
            searchListStyleRef.current?.(tObj);
        }
        if (tColName === "MATL_TYPE2_NAME") {
            var tObj = {};
            tObj.MATL_CD = argData0.data.MATL_CD;
            searchListRemarkRef.current?.(tObj);
        }
    }, []);

    const onRowClick1TBL_KCD_MATL_MST = useCallback((argData0) => {
        let row = null;

        if (Array.isArray(argData0)) row = argData0[0] || null;
        else row = argData0 || null;

        if (!row?.MATL_CD) return;

        onRowClickTBL_KCD_MATL_MST({
            data: row,
            originalEvent: { target: null },
        });
    }, [onRowClickTBL_KCD_MATL_MST]);

    function onRowClickTBL_KCD_MATL_MST(event) {
        var argData = {};

        if (typeof event.data.MATL_CD !== "undefined") {
            argData = { ...event.data };
        } else {
            return;
        }

        if (!event?.data) return;

        const row = event.data;

        // Check if the click was on the checkbox
        const clickTarget = event.originalEvent?.target;
        const isCheckboxClick = clickTarget?.type === 'checkbox' || 
                               clickTarget?.closest('input[type="checkbox"]') ||
                               clickTarget?.closest('[role="checkbox"]');

        let newSelected;

        if (isCheckboxClick) {
            // If checkbox was clicked, don't modify here - let onSelectionChange handle it
            return;
        } else {
            // If row was clicked (not checkbox), select ONLY this row (Single selection)
            newSelected = [row];
        }

        setSelectedTBL_KCD_MATL_MST_CELL(newSelected);

        let argTBL_KCD_MATL_MST = argData;
        editTBL_KCD_MATL_MST(argTBL_KCD_MATL_MST);
        setDataTBL_KCD_MATL_MST(argTBL_KCD_MATL_MST);

        var _tQryObj = { ...dataQRY_KCD_MATL_MSTRef.current };
        _tQryObj.MATL_CD = argData.MATL_CD;

        serviceS0301_MATL_RECORD
            .mgrQueryTBL_KCD_MATL_MEM(_tQryObj)
            .then((data) => {
                if (typeof data.graphQLErrors === "undefined") {
                    console.log(
                        "mgrQueryTBL_KCD_MATL_MEM() call => " + data.length,
                    );
                    setDatasTBL_KCD_MATL_MEM(data);

                    console.log(data);

                    if (data.length > 0) {
                        var tCurrObj = {};
                        datasEDT_KCD_MATL_MEM_CURR_CDRef.current.forEach((col, i) => {
                            console.log(col);
                            if (col.CD_CODE === data[0].CURR_CD) {
                                tCurrObj = { ...col };
                            }
                        });
                        if (typeof tCurrObj.CD_CODE !== "undefined") {
                            setDataEDT_KCD_MATL_MEM_CURR_CD(tCurrObj);
                        }

                        let argTBL_KCD_MATL_MST = { ...argData };
                        argTBL_KCD_MATL_MST.UPDATE_REASON =
                            data[0].UPDATE_REASON;
                        editTBL_KCD_MATL_MST(argTBL_KCD_MATL_MST);
                        setDataTBL_KCD_MATL_MST(argTBL_KCD_MATL_MST);

                        // setDataEDT_KCD_MATL_MST({...dataEDT_KCD_MATL_MST, UPDATE_REASON:data[0].UPDATE_REASON});
                    } else {
                        setDataEDT_KCD_MATL_MEM_CURR_CD(
                            datasEDT_KCD_MATL_MEM_CURR_CDRef.current[0],
                        );

                        let argTBL_KCD_MATL_MST = { ...argData };
                        argTBL_KCD_MATL_MST.UPDATE_REASON = "";
                        editTBL_KCD_MATL_MST(argTBL_KCD_MATL_MST);
                        setDataTBL_KCD_MATL_MST(argTBL_KCD_MATL_MST);
                    }
                } else {
                    // var tStr = data.graphQLErrors[0].message;
                    console.log(
                        "mgrQueryTBL_KCD_MATL_MEM()error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });

        serviceS0301_MATL_RECORD
            .mgrQueryTBL_KCD_MATL_SALE(_tQryObj)
            .then((data) => {
                if (typeof data.graphQLErrors === "undefined") {
                    console.log(
                        "mgrQueryTBL_KCD_MATL_SALE() call => " + data.length,
                    );
                    setDatasTBL_KCD_MATL_SALE(data);
                } else {
                    // var tStr = data.graphQLErrors[0].message;
                    console.log(
                        "mgrQueryTBL_KCD_MATL_SALE()error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });
    }

    const toPlainNumberString = (value) => {
        if (value === null || typeof value === "undefined" || value === "")
            return "";

        const num = Number(value);
        if (!Number.isFinite(num)) return String(value);

        return num.toLocaleString("en-US", {
            useGrouping: false,
            maximumSignificantDigits: 21,
        });
    };

    const refreshSingleMatlRow = (matlCd, options = {}) => {
        if (!matlCd) return;

        const statusCd = dataEDT_KCD_MATL_MSTRef.current.STATUS_CD;
        const statusCdObj = datasEDT_KCD_MATL_MST_STATUS_CD.find(
            (val) => String(val.CD_CODE) === String(statusCd),
        );

        const edited = {
            ...dataEDT_KCD_MATL_MSTRef.current,
            MATL_CD: matlCd,
            VENDOR_NAME:
                dataEDT_KCD_MATL_MST_VENDOR_CD?.VENDOR_NAME ||
                dataEDT_KCD_MATL_MSTRef.current.VENDOR_NAME,
            MATL_TYPE_NAME:
                dataEDT_KCD_MATL_MST_MATL_TYPE?.CD_NAME ||
                dataEDT_KCD_MATL_MSTRef.current.MATL_TYPE_NAME,
            MATL_TYPE2_NAME:
                dataEDT_KCD_MATL_MST_MATL_TYPE2?.MATL_TYPE2 ||
                dataEDT_KCD_MATL_MSTRef.current.MATL_TYPE2_NAME,
            MATL_UNIT_NAME:
                dataEDT_KCD_MATL_MST_UNIT?.CD_NAME ||
                dataEDT_KCD_MATL_MSTRef.current.MATL_UNIT_NAME,
            BOX_UNIT_NAME:
                dataEDT_KCD_MATL_MST_BOX_UNIT?.CD_NAME ||
                dataEDT_KCD_MATL_MSTRef.current.BOX_UNIT_NAME,
            STATUS_CD_NAME:
                statusCdObj?.CD_NAME ||
                dataEDT_KCD_MATL_MST_STATUS_CD?.CD_NAME ||
                dataEDT_KCD_MATL_MSTRef.current.STATUS_CD_NAME,
            WEIGHT: toPlainNumberString(dataEDT_KCD_MATL_MSTRef.current.WEIGHT),
            UPDATE_REASON: dataEDT_KCD_MATL_MSTRef.current.UPDATE_REASON || "",
        };

        setDatasTBL_KCD_MATL_MST((prevRows) => {
            const nextRows = Array.isArray(prevRows)
                ? prevRows.map((row) => ({ ...row }))
                : [];

            const foundIndex = nextRows.findIndex(
                (row) => String(row.MATL_CD) === String(matlCd),
            );

            if (foundIndex >= 0) nextRows[foundIndex] = edited;
            else {
                const insertAfterMatlCd = options.insertAfterMatlCd;
                const anchorIndex = nextRows.findIndex(
                    (row) =>
                        String(row.MATL_CD) === String(insertAfterMatlCd),
                );

                if (anchorIndex >= 0) nextRows.splice(anchorIndex + 1, 0, edited);
                else nextRows.unshift(edited);
            }

            return nextRows.map((row, idx) => ({
                ...row,
                id: idx + 1,
            }));
        });

        setSelectedTBL_KCD_MATL_MST([edited]);
        setDataTBL_KCD_MATL_MST(edited);
        editTBL_KCD_MATL_MST(edited);
    };

    const searchTBL_KCD_MATL_MST = (argData, matlCdFilterSet) => {
        setDatasTBL_KCD_MATL_MST([]);
        setSelectedTBL_KCD_MATL_MST([]);
        setSelectedTBL_KCD_MATL_MST_CELL([]);

        var _tQryObj = {};
        if (typeof argData.MATL_CD === "undefined")
            _tQryObj = { ...dataQRY_KCD_MATL_MST };
        else _tQryObj = { ...argData };

        setLoadingTBL_KCD_MATL_MST(true);
        resetEDT_KCD_MATL_MST();
        serviceS0301_MATL_RECORD
            .mgrQueryTBL_KCD_MATL_MST(_tQryObj)
            .then((data) => {
                setLoadingTBL_KCD_MATL_MST(false);
                if (typeof data.graphQLErrors === "undefined") {
                    var tArray = [];
                    data.datas.forEach((col, i) => {
                        if (
                            matlCdFilterSet &&
                            matlCdFilterSet.size > 0 &&
                            !matlCdFilterSet.has(String(col.MATL_CD))
                        )
                            return;
                        var tObj = { ...col };
                        tObj.UPDATE_REASON = "";
                        tObj.id = i + 1;
                        tObj.WEIGHT = toPlainNumberString(col.WEIGHT);
                        tArray.push(tObj);
                    });

                    //if (data.message !== "") alert(data.message);

                    setDatasTBL_KCD_MATL_MST(tArray);

                    if (tArray.length <= 0) return;

                    if (tArray.length === 1) {
                        onRowClickTBL_KCD_MATL_MST({
                            data: tArray[0],
                            originalEvent: { target: null },
                        });
                    }

                    console.log(tArray[0].CURR_CD);
                    console.log(
                        datasEDT_KCD_MATL_MEM_CURR_CD.find(
                            (col) => col.CD_CODE == tArray[0].CURR_CD,
                        ),
                    );
                    setDataEDT_KCD_MATL_MEM_CURR_CD(
                        datasEDT_KCD_MATL_MEM_CURR_CD.find(
                            (col) => col.CD_CODE == tArray[0].CURR_CD,
                        ) || datasEDT_KCD_MATL_MEM_CURR_CD[10],
                    );
                } else {
                    // var tStr = data.graphQLErrors[0].message;
                    console.log(
                        "mgrQueryTBL_KCD_MATL_MST()error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });
    };

    const onKeyDownTopSearchInput = (e) => {
        if (e.key !== "Enter") return;
        e.preventDefault();
        searchTBL_KCD_MATL_MST(dataQRY_KCD_MATL_MST);
    };

    const search_SET_MOMCODE = (argData) => {
        var _tQryObj = {};
        if (
            typeof argData === "undefined" ||
            typeof argData.MATL_CD === "undefined"
        )
            _tQryObj = { ...dataQRY_KCD_MATL_MST2 };
        else _tQryObj = { ...argData };

        setLoadingTBL_KCD_MATL_MST2(true);
        setSelectedTBL_KCD_MATL_MST2([]);
        setDatasTBL_KCD_MATL_MST2([]);
        serviceS0301_MATL_RECORD
            .mgrQueryTBL_KCD_MATL_MST(_tQryObj)
            .then((data) => {
                setLoadingTBL_KCD_MATL_MST2(false);
                if (typeof data.graphQLErrors === "undefined") {
                    var tArray = [];

                    data.datas.forEach((col, i) => {
                        var tObj = { ...col };
                        tArray.push(tObj);
                        tObj.id = i + 1;
                    });
                    setDatasTBL_KCD_MATL_MST2(tArray);

                    console.log(data[0]);
                    //setDataEDT_KCD_MATL_MEM_CURR_CD
                } else {
                    // var tStr = data.graphQLErrors[0].message;
                    console.log(
                        "mgrQueryTBL_KCD_MATL_MST()error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });
    };

    const search_LIST_STYLE = (argData) => {
        var _tQryObj = {};
        _tQryObj.MATL_CD = argData.MATL_CD;

        setLoadingTBL_KCD_MATL_MST3(true);
        setSelectedTBL_KCD_MATL_MST3([]);
        setDatasTBL_KCD_MATL_MST3([]);
        serviceS0301_MATL_RECORD
            .mgrQuery_QRY_STYLE_LIST(_tQryObj)
            .then((data) => {
                setLoadingTBL_KCD_MATL_MST3(false);
                if (typeof data.graphQLErrors === "undefined") {
                    console.log(
                        "mgrQueryTBL_KCD_MATL_MST() call => " + data.length,
                    );
                    setDatasTBL_KCD_MATL_MST3(
                        data.map((col, i) => {
                            var tObj = { ...col };
                            tObj.id = i + 1;
                            return tObj;
                        }),
                    );
                    popup_LIST_STYLE();
                } else {
                    // var tStr = data.graphQLErrors[0].message;
                    console.log(
                        "mgrQueryTBL_KCD_MATL_MST()error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });
    };

    const search_LIST_REMARK = (argData) => {
        var _tQryObj = {};
        _tQryObj.MATL_CD = argData.MATL_CD;

        setLoadingTBL_KCD_MATL_MST4(true);
        setSelectedTBL_KCD_MATL_MST4([]);
        setDatasTBL_KCD_MATL_MST4([]);
        serviceS0301_MATL_RECORD
            .mgrQuery_QRY_REMARK_LIST(_tQryObj)
            .then((data) => {
                setLoadingTBL_KCD_MATL_MST4(false);
                if (typeof data.graphQLErrors === "undefined") {
                    console.log(
                        "mgrQueryTBL_KCD_MATL_MST() call => " + data.length,
                    );
                    setDatasTBL_KCD_MATL_MST4(
                        data.map((col, i) => {
                            var tObj = { ...col };
                            tObj.id = i + 1;
                            return tObj;
                        }),
                    );
                    popup_LIST_REMARK();
                } else {
                    // var tStr = data.graphQLErrors[0].message;
                    console.log(
                        "mgrQueryTBL_KCD_MATL_MST()error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });
    };

    searchListStyleRef.current = search_LIST_STYLE;
    searchListRemarkRef.current = search_LIST_REMARK;

    const exportExcelTBL_KCD_MATL_MST = async () => {
        serviceLib.exportExcel("Matl List", "Matl List", datasTBL_KCD_MATL_MST);
    };

    /**TABLE KCD_MATL_MST */
    // DEFINE DATAGRID : TBL_KCD_MATL_MST2
    const [datasTBL_KCD_MATL_MST2, setDatasTBL_KCD_MATL_MST2] = useState([]);
    const dt_TBL_KCD_MATL_MST2 = useRef(null);
    const [dataTBL_KCD_MATL_MST2, setDataTBL_KCD_MATL_MST2] = useState(
        emptyTBL_KCD_MATL_MST2,
    );
    const [selectedTBL_KCD_MATL_MST2, setSelectedTBL_KCD_MATL_MST2] = useState(
        [],
    );
    const [
        flagSelectModeTBL_KCD_MATL_MST2,
        setFlagSelectModeTBL_KCD_MATL_MST2,
    ] = useState(false);
    const [loadingTBL_KCD_MATL_MST2, setLoadingTBL_KCD_MATL_MST2] =
        useState(false);
    const [selectedTBL_KCD_MATL_MST2_CELL, setSelectedTBL_KCD_MATL_MST2_CELL] =
        useState([]);

    // DATAGRID CODE : TBL_KCD_MATL_MST2

    /**TABLE KCD_MATL_MST */
    // DEFINE DATAGRID : TBL_KCD_MATL_MST3
    const [datasTBL_KCD_MATL_MST3, setDatasTBL_KCD_MATL_MST3] = useState([]);
    const dt_TBL_KCD_MATL_MST3 = useRef(null);
    const [dataTBL_KCD_MATL_MST3, setDataTBL_KCD_MATL_MST3] = useState(
        emptyTBL_KCD_MATL_MST3,
    );
    const [selectedTBL_KCD_MATL_MST3, setSelectedTBL_KCD_MATL_MST3] = useState(
        [],
    );
    const [
        flagSelectModeTBL_KCD_MATL_MST3,
        setFlagSelectModeTBL_KCD_MATL_MST3,
    ] = useState(false);
    const [loadingTBL_KCD_MATL_MST3, setLoadingTBL_KCD_MATL_MST3] =
        useState(false);
    const [selectedTBL_KCD_MATL_MST3_CELL, setSelectedTBL_KCD_MATL_MST3_CELL] =
        useState([]);

    // DATAGRID CODE : TBL_KCD_MATL_MST3

    /**TABLE KCD_MATL_MST */
    // DEFINE DATAGRID : TBL_KCD_MATL_MST4
    const [datasTBL_KCD_MATL_MST4, setDatasTBL_KCD_MATL_MST4] = useState([]);
    const dt_TBL_KCD_MATL_MST4 = useRef(null);
    const [dataTBL_KCD_MATL_MST4, setDataTBL_KCD_MATL_MST4] = useState(
        emptyTBL_KCD_MATL_MST4,
    );
    const [selectedTBL_KCD_MATL_MST4, setSelectedTBL_KCD_MATL_MST4] = useState(
        [],
    );
    const [
        flagSelectModeTBL_KCD_MATL_MST4,
        setFlagSelectModeTBL_KCD_MATL_MST4,
    ] = useState(false);
    const [loadingTBL_KCD_MATL_MST4, setLoadingTBL_KCD_MATL_MST4] =
        useState(false);
    const [selectedTBL_KCD_MATL_MST4_CELL, setSelectedTBL_KCD_MATL_MST4_CELL] =
        useState([]);

    // DATAGRID CODE : TBL_KCD_MATL_MST4

    // DEFINE DATAGRID : TBL_KCD_MATL_MST5
    const [datasTBL_KCD_MATL_MST5, setDatasTBL_KCD_MATL_MST5] = useState([]);
    const dt_TBL_KCD_MATL_MST5 = useRef(null);
    const [dataTBL_KCD_MATL_MST5, setDataTBL_KCD_MATL_MST5] = useState(
        emptyTBL_KCD_MATL_MST5,
    );
    const [selectedTBL_KCD_MATL_MST5, setSelectedTBL_KCD_MATL_MST5] = useState(
        [],
    );
    const [
        flagSelectModeTBL_KCD_MATL_MST5,
        setFlagSelectModeTBL_KCD_MATL_MST5,
    ] = useState(false);
    const [loadingTBL_KCD_MATL_MST5, setLoadingTBL_KCD_MATL_MST5] =
        useState(false);
    const [selectedTBL_KCD_MATL_MST5_CELL, setSelectedTBL_KCD_MATL_MST5_CELL] =
        useState([]);

    const onCellEditCompleteTBL_KCD_MATL_MST5 = (e) => {
        const { rowData, field, newValue } = e;
        const updatedData = datasTBL_KCD_MATL_MST5.map((item) =>
            item.id === rowData.id ? { ...item, [field]: newValue } : item,
        );

        setDatasTBL_KCD_MATL_MST5(updatedData);
    };

    const onCellEditCompleteTBL_KCD_MATL_MST6 = (e) => {
        const { rowData, field, newValue } = e;
        console.log(datasTBL_KCD_MATL_MST6);
        const updatedData = datasTBL_KCD_MATL_MST6.map((item) =>
            item.MATL_CD === rowData.MATL_CD
                ? { ...item, [field]: newValue }
                : item,
        );

        console.log(updatedData);

        setDatasTBL_KCD_MATL_MST6(updatedData);
    };

    // GUIDE: 에디터 컴포넌트에 onKeyDown 이벤트를 연결한다.
    const onChangeTextEdit = (e, options) => {
        options.editorCallback(e.target.value);
    };

    const handleFocus = (event) => event.target.select();

    const textEditor = (options) => {
        return (
            <InputText
                type="text"
                value={options.value}
                onChange={(e) => {
                    onChangeTextEdit(e, options);
                }}
                onFocus={handleFocus}
            />
        );
    };

    const textEditor2 = (options) => {
        return (
            <InputText
                type="text"
                value={options.value}
                onChange={(e) => {
                    onChangeTextEdit(e, options);
                }}
                onFocus={handleFocus}
            />
        );
    };

    // DATAGRID CODE : TBL_KCD_MATL_MST5

    // DEFINE DATAGRID : TBL_KCD_MATL_MST6
    const [datasTBL_KCD_MATL_MST6, setDatasTBL_KCD_MATL_MST6] = useState([]);
    const dt_TBL_KCD_MATL_MST6 = useRef(null);
    const [dataTBL_KCD_MATL_MST6, setDataTBL_KCD_MATL_MST6] = useState(
        emptyTBL_KCD_MATL_MST6,
    );
    const [selectedTBL_KCD_MATL_MST6, setSelectedTBL_KCD_MATL_MST6] = useState(
        [],
    );
    const [
        flagSelectModeTBL_KCD_MATL_MST6,
        setFlagSelectModeTBL_KCD_MATL_MST6,
    ] = useState(false);
    const [loadingTBL_KCD_MATL_MST6, setLoadingTBL_KCD_MATL_MST6] =
        useState(false);
    const [selectedTBL_KCD_MATL_MST6_CELL, setSelectedTBL_KCD_MATL_MST6_CELL] =
        useState([]);

    // DATAGRID CODE : TBL_KCD_MATL_MST6

    /**TABLE KCD_MATL_SALE */
    // DEFINE DATAGRID : TBL_KCD_MATL_SALE
    const [datasTBL_KCD_MATL_SALE, setDatasTBL_KCD_MATL_SALE] = useState([]);
    const dt_TBL_KCD_MATL_SALE = useRef(null);
    const [dataTBL_KCD_MATL_SALE, setDataTBL_KCD_MATL_SALE] = useState(
        emptyTBL_KCD_MATL_SALE,
    );
    const [selectedTBL_KCD_MATL_SALE, setSelectedTBL_KCD_MATL_SALE] = useState(
        {},
    );
    const [
        flagSelectModeTBL_KCD_MATL_SALE,
        setFlagSelectModeTBL_KCD_MATL_SALE,
    ] = useState(false);

    // DATAGRID CODE : TBL_KCD_MATL_SALE

    const onRowClick1TBL_KCD_MATL_SALE = (argData0) => {
        var argData = {};

        if (argData0 === null) {
            argData = { ...emptyEDT_KCD_MATL_MEM };
        } else if (typeof argData0.length !== "undefined") {
            argData = argData0[0];
        } else {
            argData = argData0;
        }

        let argTBL_KCD_MATL_SALE = argData;

        setDataTBL_KCD_MATL_SALE(argTBL_KCD_MATL_SALE);

        var tEDT = { ...dataEDT_KCD_MATL_MEM };
        tEDT.MATL_CD = argTBL_KCD_MATL_SALE.MATL_CD;
        tEDT.MATL_SEQ = argTBL_KCD_MATL_SALE.MATL_SEQ;
        //tEDT.MATL_PRICE = argTBL_KCD_MATL_SALE.MATL_PRICE;
        tEDT.CURR_CD = argTBL_KCD_MATL_SALE.CURR_CD;
        setDataEDT_KCD_MATL_MEM(tEDT);

        editEDT_KCD_MATL_MEM_CURR_CD(tEDT.CURR_CD);
    };

    const onRowClickTBL_KCD_MATL_SALE = (event) => {
        let argTBL_KCD_MATL_SALE = event.data;
        if (flagSelectModeTBL_KCD_MATL_SALE) return;

        // Service : NawooAll:mgrQueryTBL_KCD_MATL_SALE
    };

    /**EDIT KCD_MATL_MEM */
    const [datasEDT_KCD_MATL_MEM, setDatasEDT_KCD_MATL_MEM] = useState([]);
    const [dataEDT_KCD_MATL_MEM, setDataEDT_KCD_MATL_MEM] = useState(
        emptyEDT_KCD_MATL_MEM,
    );

    const [isSalesPrice, setIsSalesPrice] = useState("0");
    const [isMasterPrice, setIsMasterPrice] = useState("1");

    const search_PRICE = (argQry) => {
        var _tQryObj = { ...argQry };

        serviceS0301_MATL_RECORD
            .mgrQueryTBL_KCD_MATL_MEM(_tQryObj)
            .then((data) => {
                if (typeof data.graphQLErrors === "undefined") {
                    console.log(
                        "mgrQueryTBL_KCD_MATL_MEM() call => " + data.length,
                    );
                    setDatasTBL_KCD_MATL_MEM(data);
                } else {
                    // var tStr = data.graphQLErrors[0].message;
                    console.log(
                        "mgrQueryTBL_KCD_MATL_MEM()error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });

        serviceS0301_MATL_RECORD
            .mgrQueryTBL_KCD_MATL_SALE(_tQryObj)
            .then((data) => {
                if (typeof data.graphQLErrors === "undefined") {
                    console.log(
                        "mgrQueryTBL_KCD_MATL_SALE() call => " + data.length,
                    );
                    setDatasTBL_KCD_MATL_SALE(data);
                } else {
                    // var tStr = data.graphQLErrors[0].message;
                    console.log(
                        "mgrQueryTBL_KCD_MATL_SALE()error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });
    };

    const process_BATCH_PRICE = () => {
        var tInArray = [];
        selectedTBL_KCD_MATL_MST_CELL.forEach((col, i) => {
            var tObj = {};
            tObj.MATL_CD = col.MATL_CD;
            tInArray.push(tObj);
        });

        if (tInArray.length <= 0) {
            if (dataEDT_KCD_MATL_MST.MATL_CD !== "") {
                var tObj = {};
                tObj.MATL_CD = dataEDT_KCD_MATL_MST.MATL_CD;
                tInArray.push(tObj);
            }
        }
        if (tInArray.length <= 0) {
            return;
        }

        var tEditObj0 = {
            ...dataEDT_KCD_MATL_MEM,
            CURR_CD: dataEDT_KCD_MATL_MEM_CURR_CD?.CD_CODE || "",
        };

        if (tEditObj0.CURR_CD === "") {
            tEditObj0.CURR_CD = "USD";
            //alert('Curr Cd을 선택하세요 ');
            //return;
        }
        if (tEditObj0.MATL_PRICE === "") {
            alert("가격을 입력하세요 <br><br>Please enter a price.");
            return;
        }
        if (isMasterPrice === "0" && isSalesPrice === "0") {
            alert("가격 종류를 선택하세요 <br><br>Please select a price type.");
            return;
        }

        var tEditObj = {};
        tEditObj.IS_MASTER = isMasterPrice;
        tEditObj.IS_SALES = isSalesPrice;
        tEditObj.CURR_CD = tEditObj0.CURR_CD;
        tEditObj.PRICE = tEditObj0.MATL_PRICE;

        console.log(tInArray, tEditObj);

        let targetMATLCodes = [];

        tInArray.forEach((e) => {
            targetMATLCodes.push(e.MATL_CD);
        });

        setDatasTBL_KCD_MATL_SALE([]);
        setDatasTBL_KCD_MATL_MEM([]);
        serviceS0301_MATL_RECORD
            .process_BATCH_PRICE(tInArray, tEditObj)
            .then((data) => {
                if (typeof data.graphQLErrors === "undefined") {
                    if (data.length > 0) {
                        //alert(data[0].CODE);
                        if (data[0].CODE.includes("SUCC")) {
                            // setDatasTBL_KCD_MATL_SALE([]);
                            //setDatasTBL_KCD_MATL_MEM([]);
                            //searchTBL_KCD_MATL_MST({});

                            var tQryObj = {};
                            tQryObj.MATL_CD = "";
                            if (!dataEDT_KCD_MATL_MST.MATL_CD);
                            else {
                                tQryObj.MATL_CD = dataEDT_KCD_MATL_MST.MATL_CD;
                                search_PRICE(tQryObj);
                            }
                        } else {
                            alert(data[0].CODE);
                            
                            var tQryObj = {};
                            tQryObj.MATL_CD = "";
                            if (!dataEDT_KCD_MATL_MST.MATL_CD);
                            else {
                                tQryObj.MATL_CD = dataEDT_KCD_MATL_MST.MATL_CD;
                                search_PRICE(tQryObj);
                            }
                        }
                    }
                } else {
                    // var tStr = data.graphQLErrors[0].message;
                    console.log(
                        "ServiceNawooAll.mgrInsertS0301_MATL_RECORD( error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });
    };

    const reset_BATCH_PRICE_INPUT = () => {
        let tObj = { ...dataEDT_KCD_MATL_MEM };
        tObj.MATL_PRICE = "";
        setDataEDT_KCD_MATL_MEM(tObj);
        setIsMasterPrice("0");
        setIsSalesPrice("0");
    };

    const onInputChangeEDT_KCD_MATL_MEM_MATL_PRICE = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KCD_MATL_MEM = { ...dataEDT_KCD_MATL_MEM };

        let tTypeVal = _dataEDT_KCD_MATL_MEM[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KCD_MATL_MEM[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KCD_MATL_MEM[`${name}`] = parseInt(val);

        setDataEDT_KCD_MATL_MEM(_dataEDT_KCD_MATL_MEM);
    };

    const [datasEDT_KCD_MATL_MEM_CURR_CD, setDatasEDT_KCD_MATL_MEM_CURR_CD] =
        useState([]);
    const [dataEDT_KCD_MATL_MEM_CURR_CD, setDataEDT_KCD_MATL_MEM_CURR_CD] =
        useState(emptyKCD_CODE);
    const datasEDT_KCD_MATL_MEM_CURR_CDRef = useRef(
        datasEDT_KCD_MATL_MEM_CURR_CD,
    );
    datasEDT_KCD_MATL_MEM_CURR_CDRef.current = datasEDT_KCD_MATL_MEM_CURR_CD;

    const editEDT_KCD_MATL_MEM_CURR_CD = (argValue) => {
        let _dataEDT_KCD_MATL_MEM_CURR_CD =
            datasEDT_KCD_MATL_MEM_CURR_CD.filter(
                (val) => val.CD_CODE === argValue,
            );
        setDataEDT_KCD_MATL_MEM_CURR_CD(
            _dataEDT_KCD_MATL_MEM_CURR_CD[0] || emptyKCD_CODE,
        );
    };

    const onDropdownChangeEDT_KCD_MATL_MEM_CURR_CD = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataEDT_KCD_MATL_MEM = { ...dataEDT_KCD_MATL_MEM };

        let tTypeVal = _dataEDT_KCD_MATL_MEM[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_KCD_MATL_MEM[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_KCD_MATL_MEM[`${name}`] = parseInt(val);
        }

        setDataEDT_KCD_MATL_MEM(_dataEDT_KCD_MATL_MEM);
        setDataEDT_KCD_MATL_MEM_CURR_CD(e.value || emptyKCD_CODE);
    };

    const onCalChangeEDT_KCD_MATL_MEM_CURR_DATE = (e, name) => {
        let val1 = e.value || "";
        let val = "";
        if (val1 === "") {
            val = "";
        } else {
            val = getDateVal(val1);
        }

        let _dataEDT_KCD_MATL_MEM = { ...dataEDT_KCD_MATL_MEM };
        _dataEDT_KCD_MATL_MEM[`${name}`] = val;
        setDataEDT_KCD_MATL_MEM(_dataEDT_KCD_MATL_MEM);
    };

    const onCheckboxChangeIS_SALES_PRICE = (e, name) => {
        let val = "";
        if (e.checked) {
            val = "1";
        } else {
            val = "0";
        }
        if (name === "IS_SALES_PRICE") setIsSalesPrice(val);
        else setIsMasterPrice(val);
    };

    /**EDIT KCD_MATL_MST */

    const [datasEDT_KCD_MATL_MST, setDatasEDT_KCD_MATL_MST] = useState([]);
    const [dataEDT_KCD_MATL_MST, setDataEDT_KCD_MATL_MST] = useState(
        emptyEDT_KCD_MATL_MST,
    );
    const dataEDT_KCD_MATL_MSTRef = useRef(dataEDT_KCD_MATL_MST);
    dataEDT_KCD_MATL_MSTRef.current = dataEDT_KCD_MATL_MST;
    const updateReasonPromptDefaultRef = useRef("");
    const copySourceMatlCdRef = useRef("");
    const copySourceRowRef = useRef(null);

    const resetQRY_KCD_MATL_MST = () => {
        setDataQRY_KCD_MATL_MST(emptyQRY_KCD_MATL_MST);
        setDataQRY_KCD_MATL_MST_VENDOR_CD(datasQRY_KCD_MATL_MST_VENDOR_CD[0]);
        setDataQRY_KCD_MATL_MST_MATL_TYPE(datasQRY_KCD_MATL_MST_MATL_TYPE[0]);
        setDataQRY_KCD_MATL_MST_MATL_TYPE2(
            datasQRY_KCD_MATL_MST_MATL_TYPE2[0],
        );
    };

    const handleSelectionChangeTBL_KCD_MATL_MST = useCallback((e) => {
        setSelectedTBL_KCD_MATL_MST_CELL(e.value);
    }, []);

    const mainMatlTable = useMemo(() => (
        <AFDataTable preventUnrelatedRerender
            ref={dt_TBL_KCD_MATL_MST}
            size="small"
            value={datasTBL_KCD_MATL_MST}
            loading={loadingTBL_KCD_MATL_MST}
            resizableColumns
            columnResizeMode="expand"
            showGridlines
            selectionMode="checkbox"
            selection={selectedTBL_KCD_MATL_MST_CELL}
            onSelectionChange={handleSelectionChangeTBL_KCD_MATL_MST}
            onRowClick={onRowClickTBL_KCD_MATL_MST}
            onRowDoubleClick={onRowDoubleClickTBL_KCD_MATL_MST}
            dataKey="MATL_CD"
            className="datatable-responsive"
            virtualScrollerOptions={{ itemSize: 20 }}
            emptyMessage=" "
            responsiveLayout="scroll"
            scrollable
            scrollHeight="250px"
            rowClassName={(rowData) => {
                const statusCd = String(rowData.STATUS_CD || "").trim();
                const statusName = String(rowData.STATUS_CD_NAME || "")
                    .trim()
                    .toLowerCase();
                return statusCd !== "" && statusCd !== "0"
                    ? "unusable-row"
                    : statusName === "unusable"
                      ? "unusable-row"
                      : "";
            }}
        >
            <AFColumn selectionMode="multiple" field="__checkbox__" reorderable={false} headerClassName="t-header" headerStyle={{ width: "3rem" }}></AFColumn>
            <AFColumn field="MATL_TYPE_NAME" headerClassName="t-header" header="Kind" style={{ width: "5rem", flexBasis: "auto" }}></AFColumn>
            <AFColumn field="MATL_TYPE2_NAME" headerClassName="t-header" className="orange" header="Kind2" style={{ width: "5rem", flexBasis: "auto" }}></AFColumn>
            <AFColumn field="MATL_CD" headerClassName="t-header" className="orange" header="Matl#" style={{ width: "5rem", flexBasis: "auto" }}></AFColumn>
            <AFColumn field="VENDOR_NAME" headerClassName="t-header" header="Supplier" style={{ width: "10rem", flexBasis: "auto" }}></AFColumn>
            <AFColumn field="MATL_NAME" headerClassName="t-header" header="Description" style={{ width: "10rem", flexBasis: "auto" }}></AFColumn>
            <AFColumn field="COLOR" headerClassName="t-header" header="Color" style={{ width: "8rem", flexBasis: "auto" }}></AFColumn>
            <AFColumn field="SPEC" headerClassName="t-header" header="Spec" style={{ width: "10rem", flexBasis: "auto" }}></AFColumn>
            <AFColumn field="UNIT" headerClassName="t-header" header="Unit" style={{ width: "5rem", flexBasis: "auto" }}></AFColumn>
            <AFColumn field="MATL_PRICE" headerClassName="t-header" header="Price" style={{ width: "5rem", flexBasis: "auto" }} body={(rowData) => serviceLib.numWithCommas(rowData.MATL_PRICE, 4)} bodyStyle={{ textAlign: "right" }}></AFColumn>
            <AFColumn field="CURR_CD" headerClassName="t-header" header="Curr" style={{ width: "5rem", flexBasis: "auto" }}></AFColumn>
            <AFColumn field="S_MATL_PRICE" headerClassName="t-header" header="S/Price" style={{ width: "5rem", flexBasis: "auto" }}></AFColumn>
            <AFColumn field="S_CURR_CD" headerClassName="t-header" header="S/Curr" style={{ width: "5rem", flexBasis: "auto" }}></AFColumn>
            <AFColumn field="WEIGHT" headerClassName="t-header" header="Weight" style={{ width: "5rem", flexBasis: "auto" }} body={(rowData) => serviceLib.numWithCommas(rowData.WEIGHT, 4)} bodyStyle={{ textAlign: "right" }}></AFColumn>
            <AFColumn field="BOX_UNIT_NAME" headerClassName="t-header" header="Box" style={{ width: "5rem", flexBasis: "auto" }}></AFColumn>
            <AFColumn field="STATUS_CD_NAME" headerClassName="t-header" header="Status" style={{ width: "8rem", flexBasis: "auto" }}></AFColumn>
            <AFColumn field="UPD_USER" headerClassName="t-header" header="Upd User" style={{ width: "8rem", flexBasis: "auto" }}></AFColumn>
            <AFColumn field="REG_USER" headerClassName="t-header" header="Reg User" style={{ width: "8rem", flexBasis: "auto" }}></AFColumn>
            <AFColumn field="VENDOR_TYPE" headerClassName="t-header" header={"Supplier type"} style={{ width: "8rem", flexBasis: "auto" }}></AFColumn>
            <AFColumn field="HS_CD" headerClassName="t-header" header="Hs Cd" style={{ width: "8rem", flexBasis: "auto" }}></AFColumn>
            <AFColumn field="ADD_RATE" headerClassName="t-header" header="Add Rate" style={{ width: "8rem", flexBasis: "auto" }}></AFColumn>
            <AFColumn field="ADD_AMT" header="Add Amt" style={{ width: "8rem", flexBasis: "auto" }} body={(rowData) => serviceLib.numWithCommas(rowData.ADD_AMT, 2)} bodyStyle={{ textAlign: "right" }}></AFColumn>
            <AFColumn field="ADD_LOSS" headerClassName="t-header" header="Add Loss" style={{ width: "8rem", flexBasis: "auto" }}></AFColumn>
            <AFColumn field="REG_DATETIME" headerClassName="t-header" header="Reg Time" style={{ width: "8rem", flexBasis: "auto" }} body={(rowData) => serviceLib.dateFormatHMS(rowData.REG_DATETIME)}></AFColumn>
            <AFColumn field="rep_matl_cd" headerClassName="t-header" header="Mom Matl#" style={{ width: "8rem", flexBasis: "auto" }}></AFColumn>
        </AFDataTable>
    ), [
        datasTBL_KCD_MATL_MST,
        loadingTBL_KCD_MATL_MST,
        selectedTBL_KCD_MATL_MST_CELL,
        handleSelectionChangeTBL_KCD_MATL_MST,
        onRowClickTBL_KCD_MATL_MST,
        onRowDoubleClickTBL_KCD_MATL_MST,
        serviceLib,
    ]);

    const resetEDT_KCD_MATL_MST = () => {
        copySourceMatlCdRef.current = "";
        copySourceRowRef.current = null;
        updateReasonPromptDefaultRef.current = "";
        var tRetDate = serviceLib.getCurrDate();
        var tUserInfo = serviceLib.getUserInfo();

        var tObj = { ...emptyEDT_KCD_MATL_MST };
        tObj.REG_USER = tUserInfo.USER_ID;
        tObj.REG_DATETIME = tRetDate;

        setDataEDT_KCD_MATL_MST(tObj);
        setDatasTBL_KCD_MATL_MEM([]);
        setDatasTBL_KCD_MATL_SALE([]);

        setDataEDT_KCD_MATL_MST_VENDOR_CD(datasEDT_KCD_MATL_MST_VENDOR_CD[0]);

        editEDT_KCD_MATL_MST_STATUS_CD(emptyEDT_KCD_MATL_MST.STATUS_CD);
        editEDT_KCD_MATL_MST_MATL_TYPE(emptyEDT_KCD_MATL_MST.MATL_TYPE);
        editEDT_KCD_MATL_MST_UNIT(emptyEDT_KCD_MATL_MST.UNIT);
        editEDT_KCD_MATL_MST_BOX_UNIT(emptyEDT_KCD_MATL_MST.BOX_UNIT);
        editEDT_KCD_MATL_MST_MATL_TYPE2(emptyEDT_KCD_MATL_MST.MATL_TYPE2);
        editEDT_KCD_MATL_MST_CURR_CD(emptyEDT_KCD_MATL_MST.CURR_CD);
        editEDT_KCD_MATL_MST_PRICE_TYPE(emptyEDT_KCD_MATL_MST.PRICE_TYPE);
        editEDT_KCD_MATL_MST_HS_CD(emptyEDT_KCD_MATL_MST.HS_CD);
        editEDT_KCD_MATL_MST_COMP1(emptyEDT_KCD_MATL_MST.COMP1);
        editEDT_KCD_MATL_MST_COMP2(emptyEDT_KCD_MATL_MST.COMP2);
        editEDT_KCD_MATL_MST_COMP3(emptyEDT_KCD_MATL_MST.COMP3);
        editEDT_KCD_MATL_MST_COMP4(emptyEDT_KCD_MATL_MST.COMP4);

        var tObj99 = { ...emptyEDT_KCD_MATL_MEM };
        setDataEDT_KCD_MATL_MEM(tObj99);
        editEDT_KCD_MATL_MEM_CURR_CD(datasEDT_KCD_MATL_MEM_CURR_CD[0]);

        // setDataQRY_KCD_MATL_MST(emptyQRY_KCD_MATL_MST);

        // clearSelectedKCD_STYLE();
    };

    const copyEDT_KCD_MATL_MST = () => {
        copySourceRowRef.current = { ...dataEDT_KCD_MATL_MST };
        copySourceMatlCdRef.current = dataEDT_KCD_MATL_MST.MATL_CD || "";
        var _tObj = { ...dataEDT_KCD_MATL_MST };
        _tObj.MATL_CD = "";
        setDataEDT_KCD_MATL_MST(_tObj);

        // dataEDT_KCD_MATL_MST.MATL_CD = '';
        // saveEDT_KCD_MATL_MST();
    };

    const popup_LIST_STYLE = (argData) => {
        var tObj = { ...dataEDT_KCD_MATL_MST };
        if (tObj.MATL_CD === "") return;

        var tObj1 = { ...dataQRY_KCD_MATL_MST3 };
        tObj1.MATL_CD = tObj.MATL_CD;
        setDataQRY_KCD_MATL_MST3(tObj1);

        setCreateDialog_LIST_STYLE(true);
    };

    const popup_LIST_REMARK = (argData) => {
        var tObj = { ...dataEDT_KCD_MATL_MST };
        if (tObj.MATL_CD === "") return;

        var tObj1 = { ...dataQRY_KCD_MATL_MST3 };
        tObj1.MATL_CD = tObj.MATL_CD;
        setDataQRY_KCD_MATL_MST4(tObj1);

        setCreateDialog_LIST_REMARK(true);
    };

    const popup_BATCH_SAVE = (argData) => {
        var tObj = { ...dataEDT_KCD_MATL_MST };
        if (tObj.MATL_CD === "") return;

        var tObj1 = { ...dataQRY_KCD_MATL_MST5 };
        tObj1.MATL_CD = tObj.MATL_CD;
        tObj1.VENDOR_NAME = datasEDT_KCD_MATL_MST_VENDOR_CD[0].VENDOR_NAME;
        setDataQRY_KCD_MATL_MST5(tObj1);

        setSelectedTBL_KCD_MATL_MST6([]);
        setDatasTBL_KCD_MATL_MST6([]);
        setDataEDT_KCD_MATL_MST6(emptyEDT_KCD_MATL_MST6);

        var tArray = [];
        var tObj2 = {};
        tObj2.id = 1;
        tObj2.MATL_NAME = tObj.MATL_NAME;
        tObj2.COLOR = tObj.COLOR;
        tObj2.SPEC = tObj.SPEC;
        var tIdx = 0;
        for (tIdx = 0; tIdx < 30; tIdx++) {
            var tObj3 = { ...tObj2 };
            if (tIdx === 0) {
                tObj3.id = tIdx + 1;
                tObj3.MATL_NAME = tObj.MATL_NAME;
                tObj3.COLOR = tObj.COLOR;
                tObj3.SPEC = tObj.SPEC;
            } else {
                tObj3.id = tIdx + 1;
                tObj3.MATL_NAME = "";
                tObj3.COLOR = "";
                tObj3.SPEC = "";
            }
            tArray.push(tObj3);
        }

        setDatasTBL_KCD_MATL_MST5(tArray);
        setCreateDialog_BATCH_SAVE(true);
    };

    const process_REMOVE = async (argData) => {
        const selectedItems = Array.isArray(selectedTBL_KCD_MATL_MST_CELL) && selectedTBL_KCD_MATL_MST_CELL.length > 0
            ? selectedTBL_KCD_MATL_MST_CELL
            : [dataEDT_KCD_MATL_MST];

        if (selectedItems.length === 0 || !selectedItems[0].MATL_CD) return;

        const tRet = await confirm(
            "삭제하시겠습니까?<br><br>Are you sure you want to delete?",
        );
        if (!tRet) return;

        let tArray = selectedItems.map((item) => {
            var _tObj = { ...item };
            if (typeof _tObj.__typename !== "undefined") delete _tObj.__typename;
            _tObj.MATL_MEM = [];
            _tObj.MATL_SALE = [];
            return _tObj;
        });

        serviceS0301_MATL_RECORD
            .mgrDeleteEDT_KCD_MATL_MST(tArray)
            .then((data) => {
                if (typeof data.graphQLErrors === "undefined") {
                    if (data.length > 0) {
                        if (data[0].CODE.includes("SUCC")) {
                            const deletedMatlCds = new Set(tArray.map((o) => String(o.MATL_CD)));

                            setDatasTBL_KCD_MATL_MST((prevRows) => {
                                const nextRows = (Array.isArray(prevRows)
                                    ? prevRows
                                    : []
                                )
                                    .filter(
                                        (row) =>
                                            !deletedMatlCds.has(String(row.MATL_CD)),
                                    )
                                    .map((row, idx) => ({
                                        ...row,
                                        id: idx + 1,
                                    }));

                                return nextRows;
                            });

                            setSelectedTBL_KCD_MATL_MST((prev) =>
                                (Array.isArray(prev) ? prev : []).filter(
                                    (row) => !deletedMatlCds.has(String(row.MATL_CD)),
                                ),
                            );
                            setSelectedTBL_KCD_MATL_MST_CELL((prev) =>
                                (Array.isArray(prev) ? prev : []).filter(
                                    (row) => !deletedMatlCds.has(String(row.MATL_CD)),
                                ),
                            );

                            if (
                                deletedMatlCds.has(String(dataEDT_KCD_MATL_MSTRef.current.MATL_CD))
                            ) {
                                resetEDT_KCD_MATL_MST();
                                setDataTBL_KCD_MATL_MST(emptyTBL_KCD_MATL_MST);
                            }
                        } else if (data[0].CODE.includes("ERROR")) {
                            alert(data[0].CODE);
                        }
                    }
                    // Search
                } else {
                    // var tStr = data.graphQLErrors[0].message;
                    console.log(
                        "ServiceNawooAll.mgrInsertS0301_MATL_RECORD( error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });
    };

    const process_SET_MOMCODE = (argData) => {
        var tDatas = { ...dataQRY_KCD_MATL_MST2 };
        var tDatas1 = [];
        selectedTBL_KCD_MATL_MST2.forEach((col, i) => {
            var tObj = {};
            tObj.MATL_CD = col.MATL_CD;
            tDatas1.push(tObj);
        });

        serviceS0301_MATL_RECORD
            .mgrUpdate_SET_MOMCODE(tDatas, tDatas1)
            .then((data) => {
                if (typeof data.graphQLErrors === "undefined") {
                    if (data.length > 0) {
                        //alert(data[0].CODE);
                        if (data[0].CODE.includes("SUCC")) {
                            search_SET_MOMCODE();
                        }
                    }
                    // Search
                } else {
                    // var tStr = data.graphQLErrors[0].message;
                    console.log(
                        "ServiceNawooAll.mgrInsertS0301_MATL_RECORD( error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });
    };

    const process_BATCH_SAVE = (argData) => {
        var tDatas0 = { ...dataQRY_KCD_MATL_MST5 };

        var tDatas = {};
        tDatas.MATL_CD = tDatas0.MATL_CD;

        var tDatas1 = [];
        var tCheck1 = 0;

        var tIdx = 0;
        for (tIdx = 0; tIdx < datasTBL_KCD_MATL_MST5.length; tIdx++) {
            var col = { ...datasTBL_KCD_MATL_MST5[tIdx] };
            if (col.MATL_NAME === "") break;

            var tIdx1 = 0;
            for (tIdx1 = 0; tIdx1 < datasTBL_KCD_MATL_MST5.length; tIdx1++) {
                var col1 = { ...datasTBL_KCD_MATL_MST5[tIdx1] };
                if (tIdx1 > 0 && col1.COLOR === "") break;

                var tIdx2 = 0;
                for (
                    tIdx2 = 0;
                    tIdx2 < datasTBL_KCD_MATL_MST5.length;
                    tIdx2++
                ) {
                    var col2 = { ...datasTBL_KCD_MATL_MST5[tIdx2] };
                    if (col2.SPEC === "") break;

                    var tObj = {};
                    tObj.MATL_NAME = col.MATL_NAME;
                    tObj.COLOR = col1.COLOR;
                    tObj.SPEC = col2.SPEC;

                    tDatas1.push(tObj);
                }
            }
        }

        if (tDatas1.length <= 0) {
            alert(
                "처리할 데이타가 없습니다.  Desc, Spec이 입력되었는지 확인하세요",
            );
            return;
        }

        serviceS0301_MATL_RECORD
            .mgrInsert_BATCH_SAVE(tDatas, tDatas1)
            .then((data) => {
                if (typeof data.graphQLErrors === "undefined") {
                    if (data.length > 0) {
                        if (data[0].CODE.includes("SUCC")) {
                            search_QRY_BATCH_SAVE(
                                data[0].CODE.split(":")[1],
                                data[0].CODE.split(":")[2],
                            );
                        }
                    }
                    // Search
                } else {
                    // var tStr = data.graphQLErrors[0].message;
                    console.log(
                        "ServiceNawooAll.mgrInsertS0301_MATL_RECORD( error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });
    };

    const resetBatchSave = () => {
        setDatasTBL_KCD_MATL_MST6([]);
    };

    const process_BATCH_UPDATE = () => {
        var tDatas0 = { ...dataEDT_KCD_MATL_MST6 };

        var tDatas = {};
        tDatas.MATL_TYPE = tDatas0.MATL_TYPE;
        tDatas.MATL_TYPE2 = tDatas0.MATL_TYPE2;
        tDatas.BOX_UNIT = tDatas0.BOX_UNIT;
        tDatas.STATUS_CD = tDatas0.STATUS_CD;
        tDatas.ADD_RATE = tDatas0.ADD_RATE;

        var tDatas1 = [];
        selectedTBL_KCD_MATL_MST6.forEach((col, i) => {
            var tObj = {};
            tObj.MATL_CD = col.MATL_CD;
            tObj.MATL_NAME = col.MATL_NAME;
            tObj.COLOR = col.COLOR;
            tObj.SPEC = col.SPEC;
            tDatas1.push(tObj);
        });

        console.log(tDatas1);

        serviceS0301_MATL_RECORD
            .mgrInsert_BATCH_UPDATE(tDatas, tDatas1)
            .then((data) => {
                if (typeof data.graphQLErrors === "undefined") {
                    if (data.length > 0) {
                        //alert(data[0].CODE);
                        if (data[0].CODE.includes("SUCC")) {
                            search_QRY_BATCH_SAVE(
                                tDatas0.REG_USER,
                                tDatas0.REG_DATETIME,
                            );
                        }
                    }
                    // Search
                } else {
                    // var tStr = data.graphQLErrors[0].message;
                    console.log(
                        "ServiceNawooAll.mgrInsertS0301_MATL_RECORD( error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });
    };

    const process_BATCH_DELETE = () => {
        var tDatas0 = { ...dataEDT_KCD_MATL_MST6 };

        var tDatas = {};
        tDatas.MATL_TYPE = tDatas0.MATL_TYPE;
        tDatas.MATL_TYPE2 = tDatas0.MATL_TYPE2;
        tDatas.BOX_UNIT = tDatas0.BOX_UNIT;
        tDatas.STATUS_CD = tDatas0.STATUS_CD;
        tDatas.ADD_RATE = tDatas0.ADD_RATE;

        var tDatas1 = [];
        selectedTBL_KCD_MATL_MST6.forEach((col, i) => {
            var tObj = {};
            tObj.MATL_CD = col.MATL_CD;
            tDatas1.push(tObj);
        });

        serviceS0301_MATL_RECORD
            .mgrInsert_BATCH_DELETE(tDatas, tDatas1)
            .then((data) => {
                if (typeof data.graphQLErrors === "undefined") {
                    if (data.length > 0) {
                        //alert(data[0].CODE);
                        if (data[0].CODE.includes("SUCC")) {
                            search_QRY_BATCH_SAVE(
                                tDatas0.REG_USER,
                                tDatas0.REG_DATETIME,
                            );
                        }
                    }
                    // Search
                } else {
                    // var tStr = data.graphQLErrors[0].message;
                    console.log(
                        "ServiceNawooAll.mgrInsertS0301_MATL_RECORD( error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });
    };

    const process_SAVE_SUPPLIER = () => {
        if (selectedTBL_KCD_MATL_MST_CELL.length > 0) {
            alert("선택된 Matl에 대한 Supplier를 변경합니다.<br><br>The Supplier for the selected material will be changed.");
            saveEDT_KCD_MATL_MST_UPDATE_MULTI("SUPPLIER");
        }
    };

    const process_SAVE_DESC = () => {
        if (selectedTBL_KCD_MATL_MST_CELL.length > 0) {
            alert("선택된 Matl에 대한 DESC를 변경합니다.<br><br>The DESC for the selected material will be changed.");
            saveEDT_KCD_MATL_MST_UPDATE_MULTI("DESC");
        }
    };

    const process_SAVE_COLOR = () => {
        if (selectedTBL_KCD_MATL_MST_CELL.length > 0) {
            alert("선택된 Matl에 대한 COLOR를 변경합니다.<br><br>The COLOR for the selected material will be changed.");
            saveEDT_KCD_MATL_MST_UPDATE_MULTI("COLOR");
        }
    };

    const process_SAVE_STATUS = () => {
        if (selectedTBL_KCD_MATL_MST_CELL.length > 0) {
            alert("선택된 Matl에 대한 STATUS를 변경합니다.<br><br>The STATUS for the selected material will be changed.");
            saveEDT_KCD_MATL_MST_UPDATE_MULTI("STATUS");
        }
    };

    const process_SAVE_SPEC = () => {
        if (selectedTBL_KCD_MATL_MST_CELL.length > 0) {
            alert("선택된 Matl에 대한 SPEC을 변경합니다.<br><br>The SPEC for the selected material will be changed.");
            saveEDT_KCD_MATL_MST_UPDATE_MULTI("SPEC");
        }
    };

    const process_SAVE_KIND = () => {
        if (selectedTBL_KCD_MATL_MST_CELL.length > 0) {
            alert("선택된 Matl에 대한 KIND를 변경합니다.<br><br>The KIND for the selected material will be changed.");
            saveEDT_KCD_MATL_MST_UPDATE_MULTI("KIND");
        }
    };

    const process_SAVE_KIND2 = () => {
        if (selectedTBL_KCD_MATL_MST_CELL.length > 0) {
            alert("선택된 Matl에 대한 KIND2를 변경합니다.<br><br>The KIND2 for the selected material will be changed.");
            saveEDT_KCD_MATL_MST_UPDATE_MULTI("KIND2");
        }
    };

    const process_SAVE_UNIT = () => {
        if (selectedTBL_KCD_MATL_MST_CELL.length > 0) {
            alert("선택된 Matl에 대한 Unit을 변경합니다.<br><br>The Unit for the selected material will be changed.");
            saveEDT_KCD_MATL_MST_UPDATE_MULTI("UNIT");
        }
    };

    const process_SAVE = () => {
        const clearedData = { ...dataEDT_KCD_MATL_MST, MATL_CD: "" };
        setDataEDT_KCD_MATL_MST(clearedData);

        const currCd = dataEDT_KCD_MATL_MEM_CURR_CD?.CD_CODE || "";
        if (currCd === "") {
            setDataEDT_KCD_MATL_MEM_CURR_CD(
                datasEDT_KCD_MATL_MEM_CURR_CD[10] ||
                    datasEDT_KCD_MATL_MEM_CURR_CD[0] ||
                    emptyKCD_CODE,
            );
            //alert('Currency를 선택해주세요.');
            //return;
        }
        if (clearedData.MATL_CD !== "") {
            alert("자재 신규 등록만 가능합니다. Reset후 등록하십시요.<br><br>Only new material registration is allowed. Please reset and register.");
            return;
        }

        if (clearedData.MATL_CD === "") {
            saveEDT_KCD_MATL_MST_INSERT();
        } else {
            alert("현재 표시된 Matl에 대한 Update을 실행합니다.<br><br>An update will be performed for the currently displayed material.");
            saveEDT_KCD_MATL_MST_UPDATE();
        }
    };

    const process_UPDATE = () => {
        if (dataEDT_KCD_MATL_MST.MATL_CD === "") {
            alert("자재 수정만 가능합니다. 조회후 등록하십시요.<br><br>Only material modification is allowed. Please search and then register.");
            return;
        }

        if (dataEDT_KCD_MATL_MST.MATL_CD === "") {
            saveEDT_KCD_MATL_MST_INSERT();
        } else {
            saveEDT_KCD_MATL_MST_UPDATE();
        }
    };

    const saveEDT_KCD_MATL_MST_INSERT = () => {
        let _datasEDT_KCD_MATL_MST = [...datasEDT_KCD_MATL_MST];
        let _dataEDT_KCD_MATL_MST = { ...dataEDT_KCD_MATL_MST };
        const insertAfterMatlCd =
            copySourceMatlCdRef.current ||
            dataTBL_KCD_MATL_MST.MATL_CD ||
            selectedTBL_KCD_MATL_MST[0]?.MATL_CD ||
            selectedTBL_KCD_MATL_MST_CELL[0]?.MATL_CD ||
            "";

        if (typeof _dataEDT_KCD_MATL_MST.__typename !== "undefined")
            delete _dataEDT_KCD_MATL_MST.__typename;

        var tMATL_MEM_ARRAY = datasTBL_KCD_MATL_MEM.map((col, i) => {
            var tObj = { ...col };
            tObj.CURR_DATE = _dataEDT_KCD_MATL_MST.CURR_DATE;
            if (typeof tObj.__typename !== "undefined") delete tObj.__typename;
            return tObj;
        });

        var tMATL_SALE_ARRAY = datasTBL_KCD_MATL_SALE.map((col, i) => {
            var tObj = { ...col };
            if (typeof tObj.__typename !== "undefined") delete tObj.__typename;
            tObj.CURR_DATE = _dataEDT_KCD_MATL_MST.CURR_DATE;
            return tObj;
        });

        _dataEDT_KCD_MATL_MST.MATL_MEM = [...tMATL_MEM_ARRAY];
        _dataEDT_KCD_MATL_MST.MATL_SALE = [...tMATL_SALE_ARRAY];

        if (!_dataEDT_KCD_MATL_MST.CURR_CD) _dataEDT_KCD_MATL_MST.CURR_CD = 'USD';
        if (!_dataEDT_KCD_MATL_MST.S_CURR_CD) _dataEDT_KCD_MATL_MST.S_CURR_CD = 'USD';

        let tArray = [];
        tArray.push(_dataEDT_KCD_MATL_MST);

        serviceS0301_MATL_RECORD
            .mgrInsertEDT_KCD_MATL_MST(tArray)
            .then((data) => {
                if (typeof data.graphQLErrors === "undefined") {
                    if (data.length > 0) {
                        if (data[0].CODE.includes("SUCC")) {
                            var _tObj = { ...dataEDT_KCD_MATL_MST };
                            _tObj.MATL_CD = data[0].CODE.split(":")[1];
                            setDataEDT_KCD_MATL_MST(_tObj);
                            copySourceMatlCdRef.current = "";
                            copySourceRowRef.current = null;
                            refreshSingleMatlRow(_tObj.MATL_CD, {
                                insertAfterMatlCd,
                            });
                        } else if (data[0].CODE.includes("ERROR")) {
                            alert(data[0].CODE.replace("ERROR:", ""));
                        }
                    }
                } else {
                    // var tStr = data.graphQLErrors[0].message;
                    alert(JSON.stringify(data.graphQLErrors));
                    console.log(
                        "ServiceNawooAll.mgrInsertS0301_MATL_RECORD( error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });
    };

    const saveEDT_KCD_MATL_MST_UPDATE = () => {
        let _dataEDT_KCD_MATL_MST = { ...dataEDT_KCD_MATL_MST };

        console.log(_dataEDT_KCD_MATL_MST);

        if (typeof _dataEDT_KCD_MATL_MST.__typename !== "undefined")
            delete _dataEDT_KCD_MATL_MST.__typename;

        let tArray = [];
        _dataEDT_KCD_MATL_MST.MATL_MEM = [];
        _dataEDT_KCD_MATL_MST.MATL_SALE = [];
        _dataEDT_KCD_MATL_MST.UPDATE_REASON = "";
        tArray.push(_dataEDT_KCD_MATL_MST);

        console.log(tArray);

        serviceS0301_MATL_RECORD
            .mgrUpdateEDT_KCD_MATL_MST(tArray)
            .then(async (data) => {
                if (typeof data.graphQLErrors === "undefined") {
                    if (data.length > 0) {
                        if (data[0].CODE.includes("SUCC")) {
                            refreshSingleMatlRow(
                                dataEDT_KCD_MATL_MST.MATL_CD,
                            );
                        } else if (data[0].CODE.includes("Confirm")) {
                            var tCols1 = data[0].CODE.split(":");
                            var tRet1 = await confirm(
                                `${tCols1[2]} 와 같은 PO에 사용된 자재를 Update 하시겠습니까?<br><br>Do you want to update the material used in the same PO as ${tCols1[2]}?`,
                            );

                            if (!tRet1) {
                                return;
                            }

                            // 사용자로부터 사유 입력 받기
                            const previousUpdateReason =
                                updateReasonPromptDefaultRef.current || "";
                            var updateReason =
                                await prompt(
                                    "Update 사유를 입력해주세요.<br><br>Please enter the reason for the update.",
                                    { inputValue: previousUpdateReason },
                                );

                            // 사용자가 취소하거나 빈 값을 입력한 경우 처리
                            if (!updateReason) {
                                alert(
                                    "Update 사유가 입력되지 않았습니다. 작업을 취소합니다.<br><br>The reason for the update was not entered. The operation is canceled.",
                                );
                                return;
                            }

                            let _dataEDT_KCD_MATL_MST = {
                                ...dataEDT_KCD_MATL_MST,
                            };
                            _dataEDT_KCD_MATL_MST["UPDATE_REASON"] =
                                updateReason;

                            if (
                                typeof _dataEDT_KCD_MATL_MST.__typename !==
                                "undefined"
                            )
                                delete _dataEDT_KCD_MATL_MST.__typename;

                            _dataEDT_KCD_MATL_MST.MATL_MEM = [];
                            _dataEDT_KCD_MATL_MST.MATL_SALE = [];
                            updateReasonPromptDefaultRef.current = updateReason;

                            setDataEDT_KCD_MATL_MST(_dataEDT_KCD_MATL_MST);

                            serviceS0301_MATL_RECORD
                                .mgrUpdateEDT_KCD_MATL_MST([
                                    _dataEDT_KCD_MATL_MST,
                                ])
                                .then((data) => {
                                    if (
                                        typeof data.graphQLErrors ===
                                        "undefined"
                                    ) {
                                        if (data.length > 0) {
                                            if (data[0].CODE.includes("SUCC")) {
                                                alert(data[0].CODE);
                                                refreshSingleMatlRow(
                                                    dataEDT_KCD_MATL_MST.MATL_CD,
                                                );
                                            }
                                        }
                                    }
                                });
                        } else if (data[0].CODE.includes("ERROR")) {
                            alert(data[0].CODE);
                            return;
                        }
                    }
                } else {
                    // var tStr = data.graphQLErrors[0].message;
                    alert(JSON.stringify(data.graphQLErrors));
                    console.log(
                        "ServiceNawooAll.mgrUpdateS0301_MATL_RECORD( error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });
    };

    const saveEDT_KCD_MATL_MST_UPDATE_MULTI = (argOpMode) => {
        var tInArray = [];
        selectedTBL_KCD_MATL_MST_CELL.forEach((col, i) => {
            var tObj = {};
            tObj.MATL_CD = col.MATL_CD;
            tInArray.push(tObj);
        });

        let _datasEDT_KCD_MATL_MST = [...datasEDT_KCD_MATL_MST];
        let _dataEDT_KCD_MATL_MST = { ...dataEDT_KCD_MATL_MST };

        if (typeof _dataEDT_KCD_MATL_MST.__typename !== "undefined")
            delete _dataEDT_KCD_MATL_MST.__typename;

        let tArray = [];
        _dataEDT_KCD_MATL_MST.MATL_MEM = [];
        _dataEDT_KCD_MATL_MST.MATL_SALE = [];

        if (argOpMode === "SUPPLIER") {
            _dataEDT_KCD_MATL_MST.MATL_NAME = "";
            _dataEDT_KCD_MATL_MST.COLOR = "";
            _dataEDT_KCD_MATL_MST.SPEC = "";
            _dataEDT_KCD_MATL_MST.MATL_TYPE = "";
            _dataEDT_KCD_MATL_MST.MATL_TYPE2 = "";
        }
        if (argOpMode === "DESC") {
            _dataEDT_KCD_MATL_MST.VENDOR_CD = "";
            _dataEDT_KCD_MATL_MST.COLOR = "";
            _dataEDT_KCD_MATL_MST.SPEC = "";
            _dataEDT_KCD_MATL_MST.MATL_TYPE = "";
            _dataEDT_KCD_MATL_MST.MATL_TYPE2 = "";
        }
        if (argOpMode === "COLOR") {
            _dataEDT_KCD_MATL_MST.VENDOR_CD = "";
            _dataEDT_KCD_MATL_MST.MATL_NAME = "";
            _dataEDT_KCD_MATL_MST.SPEC = "";
            _dataEDT_KCD_MATL_MST.MATL_TYPE = "";
            _dataEDT_KCD_MATL_MST.MATL_TYPE2 = "";
        }
        if (argOpMode === "STATUS") {
            _dataEDT_KCD_MATL_MST.VENDOR_CD = "";
            _dataEDT_KCD_MATL_MST.MATL_NAME = "";
            _dataEDT_KCD_MATL_MST.COLOR = "";
            _dataEDT_KCD_MATL_MST.SPEC = "";
            _dataEDT_KCD_MATL_MST.MATL_TYPE = "";
            _dataEDT_KCD_MATL_MST.MATL_TYPE2 = "";
        }
        if (argOpMode === "SPEC") {
            _dataEDT_KCD_MATL_MST.VENDOR_CD = "";
            _dataEDT_KCD_MATL_MST.MATL_NAME = "";
            _dataEDT_KCD_MATL_MST.COLOR = "";
            _dataEDT_KCD_MATL_MST.MATL_TYPE = "";
            _dataEDT_KCD_MATL_MST.MATL_TYPE2 = "";
        }
        if (argOpMode === "KIND") {
            _dataEDT_KCD_MATL_MST.VENDOR_CD = "";
            _dataEDT_KCD_MATL_MST.MATL_NAME = "";
            _dataEDT_KCD_MATL_MST.COLOR = "";
            _dataEDT_KCD_MATL_MST.SPEC = "";
            _dataEDT_KCD_MATL_MST.MATL_TYPE2 = "";
        }
        if (argOpMode === "KIND2") {
            _dataEDT_KCD_MATL_MST.VENDOR_CD = "";
            _dataEDT_KCD_MATL_MST.MATL_NAME = "";
            _dataEDT_KCD_MATL_MST.COLOR = "";
            _dataEDT_KCD_MATL_MST.SPEC = "";
            _dataEDT_KCD_MATL_MST.MATL_TYPE = "";
        }
        if (argOpMode === "UNIT") {
            _dataEDT_KCD_MATL_MST.VENDOR_CD = "";
            _dataEDT_KCD_MATL_MST.MATL_NAME = "";
            _dataEDT_KCD_MATL_MST.COLOR = "";
            _dataEDT_KCD_MATL_MST.SPEC = "";
            _dataEDT_KCD_MATL_MST.MATL_TYPE = "";
            _dataEDT_KCD_MATL_MST.MATL_TYPE2 = "";
        }
        tArray.push(_dataEDT_KCD_MATL_MST);

        serviceS0301_MATL_RECORD
            .mgrUpdateEDT_KCD_MATL_MST_MULTI(tArray, tInArray)
            .then((data) => {
                if (typeof data.graphQLErrors === "undefined") {
                    if (data.length > 0) {
                        //alert(data[0].CODE);
                        if (data[0].CODE.includes("SUCC")) {
                            var tQry = { ...dataQRY_KCD_MATL_MST };
                            searchTBL_KCD_MATL_MST(tQry);
                        } else if (data[0].CODE.includes("Confirm")) {
                            var tArray1 = [];
                            let _tEdit = { ...tArray[0] };
                            if (typeof _tEdit.__typename !== "undefined")
                                delete _tEdit.__typename;
                            tArray1.push(_tEdit);

                            _dataEDT_KCD_MATL_MST.MATL_MEM = [];
                            _dataEDT_KCD_MATL_MST.MATL_SALE = [];

                            setDataEDT_KCD_MATL_MST(_dataEDT_KCD_MATL_MST);

                            serviceS0301_MATL_RECORD
                                .mgrUpdateEDT_KCD_MATL_MST_MULTI(
                                    tArray1,
                                    tInArray,
                                )
                                .then((data) => {
                                    if (
                                        typeof data.graphQLErrors ===
                                        "undefined"
                                    ) {
                                        if (data.length > 0) {
                                            alert(data[0].CODE);
                                            if (data[0].CODE.includes("SUCC")) {
                                                var tQry = {
                                                    ...dataQRY_KCD_MATL_MST,
                                                };
                                                //tQry.MATL_CD = _dataEDT_KCD_MATL_MST.MATL_CD;
                                                searchTBL_KCD_MATL_MST(tQry);
                                            }
                                        }
                                    }
                                });
                        }
                        else {
                            alert(data[0].CODE);
                        }
                    }
                } else {
                    // var tStr = data.graphQLErrors[0].message;
                    alert(JSON.stringify(data.graphQLErrors));
                    console.log(
                        "ServiceNawooAll.mgrUpdateS0301_MATL_RECORD( error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });
    };

    const onInputChangeEDT_KCD_MATL_MST_MATL_CD = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KCD_MATL_MST = { ...dataEDT_KCD_MATL_MST };

        let tTypeVal = _dataEDT_KCD_MATL_MST[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KCD_MATL_MST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KCD_MATL_MST[`${name}`] = parseInt(val);

        setDataEDT_KCD_MATL_MST(_dataEDT_KCD_MATL_MST);
    };

    const onInputChangeEDT_KCD_MATL_MST_UPDATE_REASON = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KCD_MATL_MST = { ...dataEDT_KCD_MATL_MST };

        let tTypeVal = _dataEDT_KCD_MATL_MST[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KCD_MATL_MST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KCD_MATL_MST[`${name}`] = parseInt(val);

        setDataEDT_KCD_MATL_MST(_dataEDT_KCD_MATL_MST);
    };

    const onInputChangeEDT_KCD_MATL_MST_MATL_SEQ_MAX = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KCD_MATL_MST = { ...dataEDT_KCD_MATL_MST };

        let tTypeVal = _dataEDT_KCD_MATL_MST[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KCD_MATL_MST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KCD_MATL_MST[`${name}`] = parseInt(val);

        setDataEDT_KCD_MATL_MST(_dataEDT_KCD_MATL_MST);
    };

    const [
        datasEDT_KCD_MATL_MST_VENDOR_CD,
        setDatasEDT_KCD_MATL_MST_VENDOR_CD,
    ] = useState([]);
    const [dataEDT_KCD_MATL_MST_VENDOR_CD, setDataEDT_KCD_MATL_MST_VENDOR_CD] =
        useState({});

    const onDropdownChangeEDT_KCD_MATL_MST_VENDOR_CD = (e, name) => {
        let val = (e.value && e.value.VENDOR_CD) || "";

        let _dataEDT_KCD_MATL_MST = { ...dataEDT_KCD_MATL_MST };

        let tTypeVal = _dataEDT_KCD_MATL_MST[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_KCD_MATL_MST[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_KCD_MATL_MST[`${name}`] = parseInt(val);
        }

        setDataEDT_KCD_MATL_MST(_dataEDT_KCD_MATL_MST);
        setDataEDT_KCD_MATL_MST_VENDOR_CD(e.value);
    };

    const onInputChangeEDT_KCD_MATL_MST_MATL_NAME = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KCD_MATL_MST = { ...dataEDT_KCD_MATL_MST };

        let tTypeVal = _dataEDT_KCD_MATL_MST[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KCD_MATL_MST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KCD_MATL_MST[`${name}`] = parseInt(val);

        setDataEDT_KCD_MATL_MST(_dataEDT_KCD_MATL_MST);
    };

    const onInputChangeEDT_KCD_MATL_MST_COLOR = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KCD_MATL_MST = { ...dataEDT_KCD_MATL_MST };

        let tTypeVal = _dataEDT_KCD_MATL_MST[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KCD_MATL_MST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KCD_MATL_MST[`${name}`] = parseInt(val);

        setDataEDT_KCD_MATL_MST(_dataEDT_KCD_MATL_MST);
    };

    const onInputChangeEDT_KCD_MATL_MST_SPEC = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KCD_MATL_MST = { ...dataEDT_KCD_MATL_MST };

        let tTypeVal = _dataEDT_KCD_MATL_MST[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KCD_MATL_MST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KCD_MATL_MST[`${name}`] = parseInt(val);

        setDataEDT_KCD_MATL_MST(_dataEDT_KCD_MATL_MST);
    };

    const [
        datasEDT_KCD_MATL_MST_STATUS_CD,
        setDatasEDT_KCD_MATL_MST_STATUS_CD,
    ] = useState([]);
    const [dataEDT_KCD_MATL_MST_STATUS_CD, setDataEDT_KCD_MATL_MST_STATUS_CD] =
        useState({});

    const editEDT_KCD_MATL_MST_STATUS_CD = (argValue) => {
        let _dataEDT_KCD_MATL_MST_STATUS_CD =
            datasEDT_KCD_MATL_MST_STATUS_CD.filter(
                (val) => String(val.CD_CODE) === String(argValue),
            );
        setDataEDT_KCD_MATL_MST_STATUS_CD(
            _dataEDT_KCD_MATL_MST_STATUS_CD[0] ||
                datasEDT_KCD_MATL_MST_STATUS_CD[0] ||
                {},
        );
    };

    const onDropdownChangeEDT_KCD_MATL_MST_STATUS_CD = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataEDT_KCD_MATL_MST = { ...dataEDT_KCD_MATL_MST };

        let tTypeVal = _dataEDT_KCD_MATL_MST[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_KCD_MATL_MST[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_KCD_MATL_MST[`${name}`] = parseInt(val);
        }

        setDataEDT_KCD_MATL_MST(_dataEDT_KCD_MATL_MST);
        setDataEDT_KCD_MATL_MST_STATUS_CD(e.value);
    };

    const [
        datasEDT_KCD_MATL_MST_MATL_TYPE,
        setDatasEDT_KCD_MATL_MST_MATL_TYPE,
    ] = useState([]);
    const [dataEDT_KCD_MATL_MST_MATL_TYPE, setDataEDT_KCD_MATL_MST_MATL_TYPE] =
        useState({});

    const editEDT_KCD_MATL_MST_MATL_TYPE = (argValue) => {
        let _dataEDT_KCD_MATL_MST_MATL_TYPE =
            datasEDT_KCD_MATL_MST_MATL_TYPE.filter(
                (val) => val.CD_CODE === argValue,
            );
        setDataEDT_KCD_MATL_MST_MATL_TYPE(_dataEDT_KCD_MATL_MST_MATL_TYPE[0]);
    };

    const onDropdownChangeEDT_KCD_MATL_MST_MATL_TYPE = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataEDT_KCD_MATL_MST = { ...dataEDT_KCD_MATL_MST };

        let tTypeVal = _dataEDT_KCD_MATL_MST[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_KCD_MATL_MST[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_KCD_MATL_MST[`${name}`] = parseInt(val);
        }

        /* Sub Material 선택시 COMP DISABLE 처리 */
        if (val === "S") {
            setIsSub(true);
            _dataEDT_KCD_MATL_MST.COMP1_P = "";
            _dataEDT_KCD_MATL_MST.COMP2_P = "";
            _dataEDT_KCD_MATL_MST.COMP3_P = "";
            _dataEDT_KCD_MATL_MST.COMP4_P = "";
            setDataEDT_KCD_MATL_MST_COMP1(datasEDT_KCD_MATL_MST_COMP1[0]);
            setDataEDT_KCD_MATL_MST_COMP2(datasEDT_KCD_MATL_MST_COMP2[0]);
            setDataEDT_KCD_MATL_MST_COMP3(datasEDT_KCD_MATL_MST_COMP3[0]);
            setDataEDT_KCD_MATL_MST_COMP4(datasEDT_KCD_MATL_MST_COMP4[0]);
        } else {
            setIsSub(false);
        }

        setDataEDT_KCD_MATL_MST(_dataEDT_KCD_MATL_MST);
        setDataEDT_KCD_MATL_MST_MATL_TYPE(e.value);
    };

    const [datasEDT_KCD_MATL_MST_UNIT, setDatasEDT_KCD_MATL_MST_UNIT] =
        useState([]);
    const [dataEDT_KCD_MATL_MST_UNIT, setDataEDT_KCD_MATL_MST_UNIT] = useState(
        {},
    );

    const editEDT_KCD_MATL_MST_UNIT = (argValue) => {
        let _dataEDT_KCD_MATL_MST_UNIT = datasEDT_KCD_MATL_MST_UNIT.filter(
            (val) => String(val.CD_CODE) === String(argValue),
        );
        setDataEDT_KCD_MATL_MST_UNIT(
            _dataEDT_KCD_MATL_MST_UNIT[0] || datasEDT_KCD_MATL_MST_UNIT[0] || {},
        );
    };

    const onDropdownChangeEDT_KCD_MATL_MST_UNIT = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataEDT_KCD_MATL_MST = { ...dataEDT_KCD_MATL_MST };

        let tTypeVal = _dataEDT_KCD_MATL_MST[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_KCD_MATL_MST[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_KCD_MATL_MST[`${name}`] = parseInt(val);
        }

        setDataEDT_KCD_MATL_MST(_dataEDT_KCD_MATL_MST);
        setDataEDT_KCD_MATL_MST_UNIT(e.value);
    };

    const [datasEDT_KCD_MATL_MST_BOX_UNIT, setDatasEDT_KCD_MATL_MST_BOX_UNIT] =
        useState([]);
    const [dataEDT_KCD_MATL_MST_BOX_UNIT, setDataEDT_KCD_MATL_MST_BOX_UNIT] =
        useState({});

    const editEDT_KCD_MATL_MST_BOX_UNIT = (argValue) => {
        let _dataEDT_KCD_MATL_MST_BOX_UNIT =
            datasEDT_KCD_MATL_MST_BOX_UNIT.filter(
                (val) => String(val.CD_CODE) === String(argValue),
            );
        setDataEDT_KCD_MATL_MST_BOX_UNIT(
            _dataEDT_KCD_MATL_MST_BOX_UNIT[0] ||
                datasEDT_KCD_MATL_MST_BOX_UNIT[0] ||
                {},
        );
    };

    const onDropdownChangeEDT_KCD_MATL_MST_BOX_UNIT = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataEDT_KCD_MATL_MST = { ...dataEDT_KCD_MATL_MST };

        let tTypeVal = _dataEDT_KCD_MATL_MST[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_KCD_MATL_MST[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_KCD_MATL_MST[`${name}`] = parseInt(val);
        }

        setDataEDT_KCD_MATL_MST(_dataEDT_KCD_MATL_MST);
        setDataEDT_KCD_MATL_MST_BOX_UNIT(e.value);
    };

    const [
        datasEDT_KCD_MATL_MST_MATL_TYPE2,
        setDatasEDT_KCD_MATL_MST_MATL_TYPE2,
    ] = useState([]);
    const [
        dataEDT_KCD_MATL_MST_MATL_TYPE2,
        setDataEDT_KCD_MATL_MST_MATL_TYPE2,
    ] = useState({});

    const editEDT_KCD_MATL_MST_MATL_TYPE2 = (argValue) => {
        let _dataEDT_KCD_MATL_MST_MATL_TYPE2 =
            datasEDT_KCD_MATL_MST_MATL_TYPE2.filter(
                (val) => String(val.SEQ) === String(argValue),
            );
        setDataEDT_KCD_MATL_MST_MATL_TYPE2(
            _dataEDT_KCD_MATL_MST_MATL_TYPE2[0] ||
                datasEDT_KCD_MATL_MST_MATL_TYPE2[0],
        );
    };

    const onDropdownChangeEDT_KCD_MATL_MST_MATL_TYPE2 = (e, name) => {
        let val = (e.value && e.value.SEQ) || "";

        let _dataEDT_KCD_MATL_MST = { ...dataEDT_KCD_MATL_MST };

        let tTypeVal = _dataEDT_KCD_MATL_MST[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_KCD_MATL_MST[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_KCD_MATL_MST[`${name}`] = parseInt(val);
        }

        setDataEDT_KCD_MATL_MST(_dataEDT_KCD_MATL_MST);
        setDataEDT_KCD_MATL_MST_MATL_TYPE2(e.value);
    };

    const viewEDT_KCD_MATL_MST_MATL_TYPE = useMemo(() => {
        const matched = datasEDT_KCD_MATL_MST_MATL_TYPE.find(
            (val) => String(val.CD_CODE) === String(dataEDT_KCD_MATL_MST.MATL_TYPE),
        );
        return matched || dataEDT_KCD_MATL_MST_MATL_TYPE || datasEDT_KCD_MATL_MST_MATL_TYPE[0] || {};
    }, [
        datasEDT_KCD_MATL_MST_MATL_TYPE,
        dataEDT_KCD_MATL_MST.MATL_TYPE,
        dataEDT_KCD_MATL_MST_MATL_TYPE,
    ]);

    const viewEDT_KCD_MATL_MST_MATL_TYPE2 = useMemo(() => {
        const matched = datasEDT_KCD_MATL_MST_MATL_TYPE2.find(
            (val) => String(val.SEQ) === String(dataEDT_KCD_MATL_MST.MATL_TYPE2),
        );
        return matched || dataEDT_KCD_MATL_MST_MATL_TYPE2 || datasEDT_KCD_MATL_MST_MATL_TYPE2[0] || {};
    }, [
        datasEDT_KCD_MATL_MST_MATL_TYPE2,
        dataEDT_KCD_MATL_MST.MATL_TYPE2,
        dataEDT_KCD_MATL_MST_MATL_TYPE2,
    ]);

    useEffect(() => {
        const hasCodes =
            datasEDT_KCD_MATL_MST_VENDOR_CD.length > 0 &&
            datasEDT_KCD_MATL_MST_STATUS_CD.length > 0 &&
            datasEDT_KCD_MATL_MST_UNIT.length > 0 &&
            datasEDT_KCD_MATL_MST_BOX_UNIT.length > 0 &&
            datasEDT_KCD_MATL_MST_MATL_TYPE.length > 0 &&
            datasEDT_KCD_MATL_MST_MATL_TYPE2.length > 0;

        if (!hasCodes) return;

        const row =
            dataTBL_KCD_MATL_MST?.MATL_CD
                ? dataTBL_KCD_MATL_MST
                : selectedTBL_KCD_MATL_MST_CELL?.[0];

        if (!row?.MATL_CD) return;

        // Re-apply row binding after dropdown options are ready (auto-open path).
        editTBL_KCD_MATL_MST(row);
    }, [
        dataTBL_KCD_MATL_MST,
        selectedTBL_KCD_MATL_MST_CELL,
        datasEDT_KCD_MATL_MST_VENDOR_CD,
        datasEDT_KCD_MATL_MST_STATUS_CD,
        datasEDT_KCD_MATL_MST_UNIT,
        datasEDT_KCD_MATL_MST_BOX_UNIT,
        datasEDT_KCD_MATL_MST_MATL_TYPE,
        datasEDT_KCD_MATL_MST_MATL_TYPE2,
    ]);

    useEffect(() => {
        if (!dataEDT_KCD_MATL_MST.MATL_CD) return;

        if (datasEDT_KCD_MATL_MST_MATL_TYPE.length > 0) {
            editEDT_KCD_MATL_MST_MATL_TYPE(dataEDT_KCD_MATL_MST.MATL_TYPE);
        }
        if (datasEDT_KCD_MATL_MST_MATL_TYPE2.length > 0) {
            editEDT_KCD_MATL_MST_MATL_TYPE2(dataEDT_KCD_MATL_MST.MATL_TYPE2);
        }
    }, [
        dataEDT_KCD_MATL_MST.MATL_CD,
        dataEDT_KCD_MATL_MST.MATL_TYPE,
        dataEDT_KCD_MATL_MST.MATL_TYPE2,
        datasEDT_KCD_MATL_MST_MATL_TYPE,
        datasEDT_KCD_MATL_MST_MATL_TYPE2,
    ]);

    const [datasEDT_KCD_MATL_MST_CURR_CD, setDatasEDT_KCD_MATL_MST_CURR_CD] =
        useState([]);
    const [dataEDT_KCD_MATL_MST_CURR_CD, setDataEDT_KCD_MATL_MST_CURR_CD] =
        useState({});

    const editEDT_KCD_MATL_MST_CURR_CD = (argValue) => {
        let _dataEDT_KCD_MATL_MST_CURR_CD =
            datasEDT_KCD_MATL_MST_CURR_CD.filter(
                (val) => val.CD_CODE === argValue,
            );
        setDataEDT_KCD_MATL_MST_CURR_CD(_dataEDT_KCD_MATL_MST_CURR_CD[0]);
    };

    const onInputChangeEDT_KCD_MATL_MST_REG_USER = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KCD_MATL_MST = { ...dataEDT_KCD_MATL_MST };

        let tTypeVal = _dataEDT_KCD_MATL_MST[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KCD_MATL_MST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KCD_MATL_MST[`${name}`] = parseInt(val);

        setDataEDT_KCD_MATL_MST(_dataEDT_KCD_MATL_MST);
    };

    const onInputChangeEDT_KCD_MATL_MST_ADD_RATE = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KCD_MATL_MST = { ...dataEDT_KCD_MATL_MST };

        let tTypeVal = _dataEDT_KCD_MATL_MST[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KCD_MATL_MST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KCD_MATL_MST[`${name}`] = parseInt(val);

        setDataEDT_KCD_MATL_MST(_dataEDT_KCD_MATL_MST);
    };

    const onInputChangeEDT_KCD_MATL_MST_ADD_AMT = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KCD_MATL_MST = { ...dataEDT_KCD_MATL_MST };

        let tTypeVal = _dataEDT_KCD_MATL_MST[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KCD_MATL_MST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KCD_MATL_MST[`${name}`] = parseInt(val);

        setDataEDT_KCD_MATL_MST(_dataEDT_KCD_MATL_MST);
    };

    const onInputChangeEDT_KCD_MATL_MST_ADD_LOSS = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KCD_MATL_MST = { ...dataEDT_KCD_MATL_MST };

        let tTypeVal = _dataEDT_KCD_MATL_MST[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KCD_MATL_MST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KCD_MATL_MST[`${name}`] = parseInt(val);

        setDataEDT_KCD_MATL_MST(_dataEDT_KCD_MATL_MST);
    };

    const [
        datasEDT_KCD_MATL_MST_PRICE_TYPE,
        setDatasEDT_KCD_MATL_MST_PRICE_TYPE,
    ] = useState([]);
    const [
        dataEDT_KCD_MATL_MST_PRICE_TYPE,
        setDataEDT_KCD_MATL_MST_PRICE_TYPE,
    ] = useState({});

    const editEDT_KCD_MATL_MST_PRICE_TYPE = (argValue) => {
        let _dataEDT_KCD_MATL_MST_PRICE_TYPE =
            datasEDT_KCD_MATL_MST_PRICE_TYPE.filter(
                (val) => val.CD_CODE === argValue,
            );
        setDataEDT_KCD_MATL_MST_PRICE_TYPE(_dataEDT_KCD_MATL_MST_PRICE_TYPE[0]);
    };

    const onDropdownChangeEDT_KCD_MATL_MST_PRICE_TYPE = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataEDT_KCD_MATL_MST = { ...dataEDT_KCD_MATL_MST };

        let tTypeVal = _dataEDT_KCD_MATL_MST[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_KCD_MATL_MST[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_KCD_MATL_MST[`${name}`] = parseInt(val);
        }

        setDataEDT_KCD_MATL_MST(_dataEDT_KCD_MATL_MST);
        setDataEDT_KCD_MATL_MST_PRICE_TYPE(e.value);
    };

    const onInputChangeEDT_KCD_MATL_MST_WEIGHT = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KCD_MATL_MST = { ...dataEDT_KCD_MATL_MST };

        let tTypeVal = _dataEDT_KCD_MATL_MST[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KCD_MATL_MST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KCD_MATL_MST[`${name}`] = parseInt(val);

        setDataEDT_KCD_MATL_MST(_dataEDT_KCD_MATL_MST);
    };

    const onInputChangeEDT_KCD_MATL_MST_REG_DATETIME = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KCD_MATL_MST = { ...dataEDT_KCD_MATL_MST };

        let tTypeVal = _dataEDT_KCD_MATL_MST[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KCD_MATL_MST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KCD_MATL_MST[`${name}`] = parseInt(val);

        setDataEDT_KCD_MATL_MST(_dataEDT_KCD_MATL_MST);
    };

    const [datasEDT_KCD_MATL_MST_HS_CD, setDatasEDT_KCD_MATL_MST_HS_CD] =
        useState([]);
    const [dataEDT_KCD_MATL_MST_HS_CD, setDataEDT_KCD_MATL_MST_HS_CD] =
        useState({});
    const editEDT_KCD_MATL_MST_HS_CD = (argValue) => {
        let _dataEDT_KCD_MATL_MST_HS_CD = datasEDT_KCD_MATL_MST_HS_CD.filter(
            (val) => val.HS_NO === argValue,
        );
        setDataEDT_KCD_MATL_MST_HS_CD(_dataEDT_KCD_MATL_MST_HS_CD[0]);
    };
    const onDropdownChangeEDT_KCD_MATL_MST_HS_CD = (e, name) => {
        let val = (e.value && e.value.HS_NO) || "";

        let _dataEDT_KCD_MATL_MST = { ...dataEDT_KCD_MATL_MST };

        let tTypeVal = _dataEDT_KCD_MATL_MST[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_KCD_MATL_MST[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_KCD_MATL_MST[`${name}`] = parseInt(val);
        }

        setDataEDT_KCD_MATL_MST(_dataEDT_KCD_MATL_MST);
        setDataEDT_KCD_MATL_MST_HS_CD(e.value);
    };

    const [datasEDT_KCD_MATL_MST_COMP1, setDatasEDT_KCD_MATL_MST_COMP1] =
        useState([]);
    const [dataEDT_KCD_MATL_MST_COMP1, setDataEDT_KCD_MATL_MST_COMP1] =
        useState({});

    const editEDT_KCD_MATL_MST_COMP1 = (argValue) => {
        let _dataEDT_KCD_MATL_MST_COMP1 = datasEDT_KCD_MATL_MST_COMP1.filter(
            (val) => val.CD_CODE === argValue,
        );
        setDataEDT_KCD_MATL_MST_COMP1(_dataEDT_KCD_MATL_MST_COMP1[0]);
    };

    const onDropdownChangeEDT_KCD_MATL_MST_COMP1 = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataEDT_KCD_MATL_MST = { ...dataEDT_KCD_MATL_MST };

        let tTypeVal = _dataEDT_KCD_MATL_MST[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_KCD_MATL_MST[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_KCD_MATL_MST[`${name}`] = parseInt(val);
        }

        setDataEDT_KCD_MATL_MST(_dataEDT_KCD_MATL_MST);
        setDataEDT_KCD_MATL_MST_COMP1(e.value);
    };

    const [datasEDT_KCD_MATL_MST_COMP2, setDatasEDT_KCD_MATL_MST_COMP2] =
        useState([]);
    const [dataEDT_KCD_MATL_MST_COMP2, setDataEDT_KCD_MATL_MST_COMP2] =
        useState({});

    const editEDT_KCD_MATL_MST_COMP2 = (argValue) => {
        let _dataEDT_KCD_MATL_MST_COMP2 = datasEDT_KCD_MATL_MST_COMP2.filter(
            (val) => val.CD_CODE === argValue,
        );
        setDataEDT_KCD_MATL_MST_COMP2(_dataEDT_KCD_MATL_MST_COMP2[0]);
    };

    const onDropdownChangeEDT_KCD_MATL_MST_COMP2 = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataEDT_KCD_MATL_MST = { ...dataEDT_KCD_MATL_MST };

        let tTypeVal = _dataEDT_KCD_MATL_MST[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_KCD_MATL_MST[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_KCD_MATL_MST[`${name}`] = parseInt(val);
        }

        setDataEDT_KCD_MATL_MST(_dataEDT_KCD_MATL_MST);
        setDataEDT_KCD_MATL_MST_COMP2(e.value);
    };

    const [datasEDT_KCD_MATL_MST_COMP3, setDatasEDT_KCD_MATL_MST_COMP3] =
        useState([]);
    const [dataEDT_KCD_MATL_MST_COMP3, setDataEDT_KCD_MATL_MST_COMP3] =
        useState({});

    const editEDT_KCD_MATL_MST_COMP3 = (argValue) => {
        let _dataEDT_KCD_MATL_MST_COMP3 = datasEDT_KCD_MATL_MST_COMP3.filter(
            (val) => val.CD_CODE === argValue,
        );
        setDataEDT_KCD_MATL_MST_COMP3(_dataEDT_KCD_MATL_MST_COMP3[0]);
    };

    const onDropdownChangeEDT_KCD_MATL_MST_COMP3 = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataEDT_KCD_MATL_MST = { ...dataEDT_KCD_MATL_MST };

        let tTypeVal = _dataEDT_KCD_MATL_MST[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_KCD_MATL_MST[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_KCD_MATL_MST[`${name}`] = parseInt(val);
        }

        setDataEDT_KCD_MATL_MST(_dataEDT_KCD_MATL_MST);
        setDataEDT_KCD_MATL_MST_COMP3(e.value);
    };

    const [datasEDT_KCD_MATL_MST_COMP4, setDatasEDT_KCD_MATL_MST_COMP4] =
        useState([]);
    const [dataEDT_KCD_MATL_MST_COMP4, setDataEDT_KCD_MATL_MST_COMP4] =
        useState({});

    const editEDT_KCD_MATL_MST_COMP4 = (argValue) => {
        let _dataEDT_KCD_MATL_MST_COMP4 = datasEDT_KCD_MATL_MST_COMP4.filter(
            (val) => val.CD_CODE === argValue,
        );
        setDataEDT_KCD_MATL_MST_COMP4(_dataEDT_KCD_MATL_MST_COMP4[0]);
    };

    const onDropdownChangeEDT_KCD_MATL_MST_COMP4 = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataEDT_KCD_MATL_MST = { ...dataEDT_KCD_MATL_MST };

        let tTypeVal = _dataEDT_KCD_MATL_MST[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_KCD_MATL_MST[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_KCD_MATL_MST[`${name}`] = parseInt(val);
        }

        setDataEDT_KCD_MATL_MST(_dataEDT_KCD_MATL_MST);
        setDataEDT_KCD_MATL_MST_COMP4(e.value);
    };

    const onInputChangeEDT_KCD_MATL_MST_COMP1_P = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KCD_MATL_MST = { ...dataEDT_KCD_MATL_MST };

        let tTypeVal = _dataEDT_KCD_MATL_MST[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KCD_MATL_MST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KCD_MATL_MST[`${name}`] = parseInt(val);

        setDataEDT_KCD_MATL_MST(_dataEDT_KCD_MATL_MST);
    };

    const onInputChangeEDT_KCD_MATL_MST_COMP2_P = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KCD_MATL_MST = { ...dataEDT_KCD_MATL_MST };

        let tTypeVal = _dataEDT_KCD_MATL_MST[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KCD_MATL_MST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KCD_MATL_MST[`${name}`] = parseInt(val);

        setDataEDT_KCD_MATL_MST(_dataEDT_KCD_MATL_MST);
    };

    const onInputChangeEDT_KCD_MATL_MST_COMP3_P = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KCD_MATL_MST = { ...dataEDT_KCD_MATL_MST };

        let tTypeVal = _dataEDT_KCD_MATL_MST[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KCD_MATL_MST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KCD_MATL_MST[`${name}`] = parseInt(val);

        setDataEDT_KCD_MATL_MST(_dataEDT_KCD_MATL_MST);
    };

    const onInputChangeEDT_KCD_MATL_MST_COMP4_P = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KCD_MATL_MST = { ...dataEDT_KCD_MATL_MST };

        let tTypeVal = _dataEDT_KCD_MATL_MST[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KCD_MATL_MST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KCD_MATL_MST[`${name}`] = parseInt(val);

        setDataEDT_KCD_MATL_MST(_dataEDT_KCD_MATL_MST);
    };

    const onInputChangeEDT_KCD_MATL_MST_OFFER_SPEC = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KCD_MATL_MST = { ...dataEDT_KCD_MATL_MST };

        let tTypeVal = _dataEDT_KCD_MATL_MST[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KCD_MATL_MST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KCD_MATL_MST[`${name}`] = parseInt(val);

        setDataEDT_KCD_MATL_MST(_dataEDT_KCD_MATL_MST);
    };

    const [datasEDT_KCD_MATL_MST6, setDatasEDT_KCD_MATL_MST6] = useState([]);
    const [dataEDT_KCD_MATL_MST6, setDataEDT_KCD_MATL_MST6] = useState(
        emptyEDT_KCD_MATL_MST6,
    );

    const [
        datasEDT_KCD_MATL_MST6_VENDOR_CD,
        setDatasEDT_KCD_MATL_MST6_VENDOR_CD,
    ] = useState([]);
    const [
        dataEDT_KCD_MATL_MST6_VENDOR_CD,
        setDataEDT_KCD_MATL_MST6_VENDOR_CD,
    ] = useState({});

    const [
        datasEDT_KCD_MATL_MST6_STATUS_CD,
        setDatasEDT_KCD_MATL_MST6_STATUS_CD,
    ] = useState([]);
    const [
        dataEDT_KCD_MATL_MST6_STATUS_CD,
        setDataEDT_KCD_MATL_MST6_STATUS_CD,
    ] = useState({});

    const [
        datasEDT_KCD_MATL_MST6_MATL_TYPE,
        setDatasEDT_KCD_MATL_MST6_MATL_TYPE,
    ] = useState([]);
    const [
        dataEDT_KCD_MATL_MST6_MATL_TYPE,
        setDataEDT_KCD_MATL_MST6_MATL_TYPE,
    ] = useState({});

    const onDropdownChangeEDT_KCD_MATL_MST6_MATL_TYPE = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataEDT_KCD_MATL_MST6 = { ...dataEDT_KCD_MATL_MST6 };

        let tTypeVal = _dataEDT_KCD_MATL_MST6[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_KCD_MATL_MST6[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_KCD_MATL_MST6[`${name}`] = parseInt(val);
        }

        setDataEDT_KCD_MATL_MST6(_dataEDT_KCD_MATL_MST6);
        setDataEDT_KCD_MATL_MST6_MATL_TYPE(e.value);
    };

    const [datasEDT_KCD_MATL_MST6_UNIT, setDatasEDT_KCD_MATL_MST6_UNIT] =
        useState([]);
    const [dataEDT_KCD_MATL_MST6_UNIT, setDataEDT_KCD_MATL_MST6_UNIT] =
        useState({});

    const [
        datasEDT_KCD_MATL_MST6_BOX_UNIT,
        setDatasEDT_KCD_MATL_MST6_BOX_UNIT,
    ] = useState([]);
    const [dataEDT_KCD_MATL_MST6_BOX_UNIT, setDataEDT_KCD_MATL_MST6_BOX_UNIT] =
        useState({});

    const onDropdownChangeEDT_KCD_MATL_MST6_BOX_UNIT = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataEDT_KCD_MATL_MST6 = { ...dataEDT_KCD_MATL_MST6 };

        let tTypeVal = _dataEDT_KCD_MATL_MST6[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_KCD_MATL_MST6[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_KCD_MATL_MST6[`${name}`] = parseInt(val);
        }

        setDataEDT_KCD_MATL_MST6(_dataEDT_KCD_MATL_MST6);
        setDataEDT_KCD_MATL_MST6_BOX_UNIT(e.value);
    };

    const [
        datasEDT_KCD_MATL_MST6_MATL_TYPE2,
        setDatasEDT_KCD_MATL_MST6_MATL_TYPE2,
    ] = useState([]);
    const [
        dataEDT_KCD_MATL_MST6_MATL_TYPE2,
        setDataEDT_KCD_MATL_MST6_MATL_TYPE2,
    ] = useState({});

    const onDropdownChangeEDT_KCD_MATL_MST6_MATL_TYPE2 = (e, name) => {
        let val = (e.value && e.value.SEQ) || "";

        let _dataEDT_KCD_MATL_MST6 = { ...dataEDT_KCD_MATL_MST6 };

        let tTypeVal = _dataEDT_KCD_MATL_MST6[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_KCD_MATL_MST6[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_KCD_MATL_MST6[`${name}`] = parseInt(val);
        }

        setDataEDT_KCD_MATL_MST6(_dataEDT_KCD_MATL_MST6);
        setDataEDT_KCD_MATL_MST6_MATL_TYPE2(e.value);
    };

    const [datasEDT_KCD_MATL_MST6_CURR_CD, setDatasEDT_KCD_MATL_MST6_CURR_CD] =
        useState([]);
    const [dataEDT_KCD_MATL_MST6_CURR_CD, setDataEDT_KCD_MATL_MST6_CURR_CD] =
        useState({});

    const onInputChangeEDT_KCD_MATL_MST6_REG_USER = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KCD_MATL_MST6 = { ...dataEDT_KCD_MATL_MST6 };

        let tTypeVal = _dataEDT_KCD_MATL_MST6[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KCD_MATL_MST6[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KCD_MATL_MST6[`${name}`] = parseInt(val);

        setDataEDT_KCD_MATL_MST6(_dataEDT_KCD_MATL_MST6);
    };

    const [
        datasEDT_KCD_MATL_MST6_PRICE_TYPE,
        setDatasEDT_KCD_MATL_MST6_PRICE_TYPE,
    ] = useState([]);
    const [
        dataEDT_KCD_MATL_MST6_PRICE_TYPE,
        setDataEDT_KCD_MATL_MST6_PRICE_TYPE,
    ] = useState({});

    const onInputChangeEDT_KCD_MATL_MST6_REG_DATETIME = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KCD_MATL_MST6 = { ...dataEDT_KCD_MATL_MST6 };

        let tTypeVal = _dataEDT_KCD_MATL_MST6[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KCD_MATL_MST6[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KCD_MATL_MST6[`${name}`] = parseInt(val);

        setDataEDT_KCD_MATL_MST6(_dataEDT_KCD_MATL_MST6);
    };

    const [datasEDT_KCD_MATL_MST6_HS_CD, setDatasEDT_KCD_MATL_MST6_HS_CD] =
        useState([]);
    const [dataEDT_KCD_MATL_MST6_HS_CD, setDataEDT_KCD_MATL_MST6_HS_CD] =
        useState({});

    const [datasEDT_KCD_MATL_MST6_COMP1, setDatasEDT_KCD_MATL_MST6_COMP1] =
        useState([]);
    const [dataEDT_KCD_MATL_MST6_COMP1, setDataEDT_KCD_MATL_MST6_COMP1] =
        useState({});

    const [datasEDT_KCD_MATL_MST6_COMP2, setDatasEDT_KCD_MATL_MST6_COMP2] =
        useState([]);
    const [dataEDT_KCD_MATL_MST6_COMP2, setDataEDT_KCD_MATL_MST6_COMP2] =
        useState({});

    const [datasEDT_KCD_MATL_MST6_COMP3, setDatasEDT_KCD_MATL_MST6_COMP3] =
        useState([]);
    const [dataEDT_KCD_MATL_MST6_COMP3, setDataEDT_KCD_MATL_MST6_COMP3] =
        useState({});

    const [datasEDT_KCD_MATL_MST6_COMP4, setDatasEDT_KCD_MATL_MST6_COMP4] =
        useState([]);
    const [dataEDT_KCD_MATL_MST6_COMP4, setDataEDT_KCD_MATL_MST6_COMP4] =
        useState({});

    /**EDIT KCD_MATL_MST1 */
    const [datasEDT_KCD_MATL_MST1, setDatasEDT_KCD_MATL_MST1] = useState([]);
    const [dataEDT_KCD_MATL_MST1, setDataEDT_KCD_MATL_MST1] = useState(
        emptyEDT_KCD_MATL_MST1,
    );

    const [datasEDT_KCD_MATL_MST1_UNIT, setDatasEDT_KCD_MATL_MST1_UNIT] =
        useState([]);
    const [dataEDT_KCD_MATL_MST1_UNIT, setDataEDT_KCD_MATL_MST1_UNIT] =
        useState({});

    const [
        datasEDT_KCD_MATL_MST1_CURR_CD_M,
        setDatasEDT_KCD_MATL_MST1_CURR_CD_M,
    ] = useState([]);
    const [
        dataEDT_KCD_MATL_MST1_CURR_CD_M,
        setDataEDT_KCD_MATL_MST1_CURR_CD_M,
    ] = useState({});

    const [
        datasEDT_KCD_MATL_MST1_CURR_CD_S,
        setDatasEDT_KCD_MATL_MST1_CURR_CD_S,
    ] = useState([]);
    const [
        dataEDT_KCD_MATL_MST1_CURR_CD_S,
        setDataEDT_KCD_MATL_MST1_CURR_CD_S,
    ] = useState({});

    const [
        datasEDT_KCD_MATL_MST1_VENDOR_CD,
        setDatasEDT_KCD_MATL_MST1_VENDOR_CD,
    ] = useState([]);
    const [
        dataEDT_KCD_MATL_MST1_VENDOR_CD,
        setDataEDT_KCD_MATL_MST1_VENDOR_CD,
    ] = useState({});

    /***EDIT KCD_MATL_SALE */
    const [datasEDT_KCD_MATL_SALE, setDatasEDT_KCD_MATL_SALE] = useState([]);
    const [dataEDT_KCD_MATL_SALE, setDataEDT_KCD_MATL_SALE] = useState(
        emptyEDT_KCD_MATL_SALE,
    );

    const [datasEDT_KCD_MATL_SALE_CURR_CD, setDatasEDT_KCD_MATL_SALE_CURR_CD] =
        useState([]);
    const [dataEDT_KCD_MATL_SALE_CURR_CD, setDataEDT_KCD_MATL_SALE_CURR_CD] =
        useState({});

    // Dialog
    const [dlgHeader_SET_MOMCODE, setDlgHeader_SET_MOMCODE] =
        useState("Upate Mom Code");
    const [createDialog_SET_MOMCODE, setCreateDialog_SET_MOMCODE] =
        useState(false);
    const hideDialog_SET_MOMCODE = () => {
        setCreateDialog_SET_MOMCODE(false);
    };

    const [dlgHeader_LIST_STYLE, setDlgHeader_LIST_STYLE] =
        useState("List Style");
    const [createDialog_LIST_STYLE, setCreateDialog_LIST_STYLE] =
        useState(false);
    const hideDialog_LIST_STYLE = () => {
        setCreateDialog_LIST_STYLE(false);
    };

    const [dlgHeader_LIST_REMARK, setDlgHeader_LIST_REMARK] =
        useState("List Update Remark");
    const [createDialog_LIST_REMARK, setCreateDialog_LIST_REMARK] =
        useState(false);
    const hideDialog_LIST_REMARK = () => {
        setCreateDialog_LIST_REMARK(false);
    };

    const [dlgHeader_BATCH_SAVE, setDlgHeader_BATCH_SAVE] =
        useState("Save Batch");
    const [createDialog_BATCH_SAVE, setCreateDialog_BATCH_SAVE] =
        useState(false);
    const hideDialog_BATCH_SAVE = () => {
        setCreateDialog_BATCH_SAVE(false);
    };
    const CODE_CACHE_KEY = "S0301_MATL_RECORD_CODE_CACHE";

    const applyMatlCdQueryAndSearch = (matlCd) => {
        const tMatlCd = String(matlCd || "").trim();
        if (!tMatlCd) return;

        // Initialize all filters except MATL_CD when called from S0303/S0306
        const tObj = { ...emptyQRY_KCD_MATL_MST };
        tObj.MATL_CD = tMatlCd;
        setDataQRY_KCD_MATL_MST(tObj);
        setDataQRY_KCD_MATL_MST_MATL_TYPE({});
        setDataQRY_KCD_MATL_MST_MATL_TYPE2({});
        searchTBL_KCD_MATL_MST(tObj);
    };

    const consumeOpenRequestFromStorage = () => {
        const tKey = "S0301_MATL_RECORD_OPEN_REQUEST";
        const tRaw = window.localStorage.getItem(tKey);
        if (!tRaw) return "";

        try {
            const tSaved = JSON.parse(tRaw);
            window.localStorage.removeItem(tKey);
            return tSaved?.MATL_CD || "";
        } catch (error) {
            window.localStorage.removeItem(tKey);
            return "";
        }
    };

    const applyCodeData = (data) => {
        if (!data) return;

        const hasSelectedMatl = !!dataEDT_KCD_MATL_MSTRef.current?.MATL_CD;

        setDatasQRY_KCD_MATL_MST_VENDOR_CD(data.VENDOR_CD || []);
        setDataQRY_KCD_MATL_MST_VENDOR_CD((data.VENDOR_CD || [])[0] || {});

        setDatasQRY_KCD_MATL_MST2_VENDOR_CD(data.VENDOR_CD || []);
        setDataQRY_KCD_MATL_MST2_VENDOR_CD((data.VENDOR_CD || [])[0] || {});

        setDatasEDT_KCD_MATL_MST_VENDOR_CD(data.VENDOR_CD || []);
        setDataEDT_KCD_MATL_MST_VENDOR_CD((data.VENDOR_CD || [])[0] || {});

        setDatasEDT_KCD_MATL_MST_STATUS_CD(data.STATUS_CD || []);
        setDataEDT_KCD_MATL_MST_STATUS_CD((data.STATUS_CD || [])[0] || {});

        setDatasQRY_KCD_MATL_MST_STATUS_CD(data.STATUS_CD || []);
        setDataQRY_KCD_MATL_MST_STATUS_CD((data.STATUS_CD || [])[0] || {});

        setDatasEDT_KCD_MATL_MST6_STATUS_CD(data.STATUS_CD || []);
        setDataEDT_KCD_MATL_MST6_STATUS_CD((data.STATUS_CD || [])[0] || {});

        setDatasEDT_KCD_MATL_MST_MATL_TYPE(data.MATL_TYPE || []);
        if (!hasSelectedMatl)
            setDataEDT_KCD_MATL_MST_MATL_TYPE((data.MATL_TYPE || [])[0] || {});

        setDatasQRY_KCD_MATL_MST_MATL_TYPE(data.MATL_TYPE || []);
        setDataQRY_KCD_MATL_MST_MATL_TYPE((data.MATL_TYPE || [])[0] || {});

        setDatasEDT_KCD_MATL_MST6_MATL_TYPE(data.MATL_TYPE || []);
        setDataEDT_KCD_MATL_MST6_MATL_TYPE((data.MATL_TYPE || [])[0] || {});

        setDatasEDT_KCD_MATL_MST_UNIT(data.MATL_UNIT || []);
        setDataEDT_KCD_MATL_MST_UNIT((data.MATL_UNIT || [])[0] || {});

        setDatasEDT_KCD_MATL_MST_BOX_UNIT(data.BOX_UNIT || []);
        setDataEDT_KCD_MATL_MST_BOX_UNIT((data.BOX_UNIT || [])[0] || {});

        setDatasEDT_KCD_MATL_MST6_BOX_UNIT(data.BOX_UNIT || []);
        setDataEDT_KCD_MATL_MST6_BOX_UNIT((data.BOX_UNIT || [])[0] || {});

        setDatasEDT_KCD_MATL_MST_MATL_TYPE2(data.KIND2 || []);
        if (!hasSelectedMatl)
            setDataEDT_KCD_MATL_MST_MATL_TYPE2((data.KIND2 || [])[0] || {});

        setDatasQRY_KCD_MATL_MST_MATL_TYPE2(data.KIND2 || []);
        setDataQRY_KCD_MATL_MST_MATL_TYPE2((data.KIND2 || [])[0] || {});

        setDatasEDT_KCD_MATL_MST6_MATL_TYPE2(data.KIND2 || []);
        setDataEDT_KCD_MATL_MST6_MATL_TYPE2((data.KIND2 || [])[0] || {});

        setDatasEDT_KCD_MATL_MST_CURR_CD(data.CURR_CD || []);
        setDataEDT_KCD_MATL_MST_CURR_CD((data.CURR_CD || [])[0] || {});

        setDatasEDT_KCD_MATL_MEM_CURR_CD(data.CURR_CD || []);
        setDataEDT_KCD_MATL_MEM_CURR_CD((data.CURR_CD || [])[9] || {});

        setDatasEDT_KCD_MATL_MST_PRICE_TYPE(data.PRICE_TYPE || []);
        setDataEDT_KCD_MATL_MST_PRICE_TYPE((data.PRICE_TYPE || [])[0] || {});

        setDatasEDT_KCD_MATL_MST_COMP1(data.COMP || []);
        setDataEDT_KCD_MATL_MST_COMP1((data.COMP || [])[0] || {});

        setDatasEDT_KCD_MATL_MST_COMP2(data.COMP || []);
        setDataEDT_KCD_MATL_MST_COMP2((data.COMP || [])[0] || {});

        setDatasEDT_KCD_MATL_MST_COMP3(data.COMP || []);
        setDataEDT_KCD_MATL_MST_COMP3((data.COMP || [])[0] || {});

        setDatasEDT_KCD_MATL_MST_COMP4(data.COMP || []);
        setDataEDT_KCD_MATL_MST_COMP4((data.COMP || [])[0] || {});

        setDatasEDT_KCD_MATL_MST_HS_CD(data.HS_CD || []);
        setDataEDT_KCD_MATL_MST_HS_CD((data.HS_CD || [])[0] || {});

        // USD Default
        setDataEDT_KCD_MATL_MEM_CURR_CD((data.CURR_CD || [])[9] || {});
    };

    useEffect(() => {
        updateReasonPromptDefaultRef.current = "";
        setDataEDT_KCD_MATL_MST((prev) => ({
            ...prev,
            UPDATE_REASON: "",
        }));

        let tMatlCd = "";

        var tUrls = window.location.href.split("?");
        if (tUrls.length <= 1) {
        } else {
            var tParams1 = tUrls[1].split("&");
            var tParams2 = tParams1.map((col, i) => {
                var tObj = {};
                var tCols = col.split("=");
                if (tCols[0].includes("MATL_CD")) {
                    tObj.key = tCols[0];
                    tObj.value = tCols[1];
                    tMatlCd = tObj.value;
                }
            });
        }

        if (!tMatlCd) {
            tMatlCd = consumeOpenRequestFromStorage();
        }

        const runAutoSearch = () => {
            if (tMatlCd === "") return;
            setTimeout(() => {
                applyMatlCdQueryAndSearch(tMatlCd);
            }, 0);
        };

        const tCachedRaw = window.sessionStorage.getItem(CODE_CACHE_KEY);
        if (tCachedRaw) {
            try {
                const tCachedData = JSON.parse(tCachedRaw);
                applyCodeData(tCachedData);
                runAutoSearch();
                return;
            } catch (error) {
                window.sessionStorage.removeItem(CODE_CACHE_KEY);
            }
        }

        serviceS0301_MATL_RECORD.mgrQueryCODE().then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                console.log("mgrQueryCODE() call => " + data.KIND2.length);
                console.log(data);
                applyCodeData(data);
                window.sessionStorage.setItem(CODE_CACHE_KEY, JSON.stringify(data));
                runAutoSearch();
            } else {
                // var tStr = data.graphQLErrors[0].message;
                console.log(
                    "mgrQueryCODE ()error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });
    }, []);

    useEffect(() => {
        const handleMessage = (event) => {
            const tData = event?.data || {};
            if (tData.func === "s0301_clear_code_cache") {
                window.sessionStorage.removeItem(CODE_CACHE_KEY);
                return;
            }

            if (tData.func !== "s0301_set_matl_cd") return;

            const tMatlCd = tData?.message?.MATL_CD || "";
            if (!tMatlCd) return;

            window.localStorage.removeItem("S0301_MATL_RECORD_OPEN_REQUEST");
            applyMatlCdQueryAndSearch(tMatlCd);
        };

        window.addEventListener("message", handleMessage);
        return () => window.removeEventListener("message", handleMessage);
    }, []);

    // Support Area

    const changeCheckBoxVal = (argVal) => {
        if (argVal === "1") return true;
        else return false;
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

    const btnInsert = useRef(null);
    const btnUpdate = useRef(null);
    const btnRemove = useRef(null);
    const btnSave = useRef(null);

    const [isSub, setIsSub] = useState(false);

    useEffect(() => {
        const handleKeyDown = (event) => {
            switch (event.key) {
                case "F2":
                    event.preventDefault();
                    btnInsert.current.click();
                    break;
                case "F3":
                    event.preventDefault();
                    btnUpdate.current.click();
                    break;
                case "F4":
                    event.preventDefault();
                    btnRemove.current.click();
                    break;
                case "F6":
                    event.preventDefault(); // 기본 새로고침 방지
                    btnSave.current.click();
                    break;
                default:
                    break;
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    const process_UPDATE_REMARK = async () => {
        try {
            const datas = datasTBL_KCD_MATL_MST4
                .filter((row) => row.isChanged)
                .map((row) => ({
                    MATL_CD: dataQRY_KCD_MATL_MST4.MATL_CD,
                    update_remark: row.update_remark,
                    update_user: row.upd_user,
                    update_datetime: row.upd_datetime,
                }));

            if (datas.length === 0) {
                await alert("No changes to save.");
                return;
            }

            const result =
                await serviceS0301_MATL_RECORD.mgrUpdate_REMARK(datas);

            if (result?.CODE === "SUCCESS") {
                await alert("Saved successfully.");
            } else {
                await alert("Failed to save the changes.");
            }
        } catch (err) {
            console.error(err);
            await alert("A server error occurred.");
        }
    };

    return (
        <div className="af-div-main">
            <div
                className="af-div-first"
                style={{ width: "123rem", height: "6rem" }}
            >
                <span className="af-span-3-0" style={{ width: "13rem" }}>
                    <p className="af-span-p" style={{ width: "4rem" }}>Matl#</p>
                    <div className="af-span-div" style={{ width: "8rem" }}>
                        <InputText
                            style={{ width: "8rem" }}
                            id="id_MATL_CD"
                            value={dataQRY_KCD_MATL_MST.MATL_CD}
                            onChange={(e) =>
                                onInputChangeQRY_KCD_MATL_MST_MATL_CD(
                                    e,
                                    "MATL_CD",
                                )
                            }
                            onKeyDown={onKeyDownTopSearchInput}
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "28rem" }}>
                    <p className="af-span-p" style={{ width: "4rem" }}>Desc</p>
                    <div className="af-span-div" style={{ width: "23rem" }}>
                        <InputText
                            style={{ width: "23rem" }}
                            id="id_MATL_CD"
                            value={dataQRY_KCD_MATL_MST.MATL_NAME}
                            onChange={(e) =>
                                onInputChangeQRY_KCD_MATL_MST_MATL_NAME(
                                    e,
                                    "MATL_NAME",
                                )
                            }
                            onKeyDown={onKeyDownTopSearchInput}
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "13rem" }}>
                    <p className="af-span-p" style={{ width: "4rem" }}>Color</p>
                    <div className="af-span-div" style={{ width: "8rem" }}>
                        <InputText
                            style={{ width: "8rem" }}
                            id="id_MATL_CD"
                            value={dataQRY_KCD_MATL_MST.COLOR}
                            onChange={(e) =>
                                onInputChangeQRY_KCD_MATL_MST_COLOR(e, "COLOR")
                            }
                            onKeyDown={onKeyDownTopSearchInput}
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "28rem" }}>
                    <p className="af-span-p" style={{ width: "4rem" }}>Spec</p>
                    <div className="af-span-div" style={{ width: "23rem" }}>
                        <InputText
                            style={{ width: "23rem" }}
                            id="id_MATL_CD"
                            value={dataQRY_KCD_MATL_MST.SPEC}
                            onChange={(e) =>
                                onInputChangeQRY_KCD_MATL_MST_SPEC(e, "SPEC")
                            }
                            onKeyDown={onKeyDownTopSearchInput}
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "15rem" }}>
                    <p className="af-span-p" style={{ width: "4rem" }}>Supplier</p>
                    <div className="af-span-div" style={{ width: "10rem" }}>
                        {/*<Dropdown style={{ width: '10rem' }} id="id_VENDOR_CD" value={dataQRY_KCD_MATL_MST_VENDOR_CD} onChange={(e) => onDropdownChangeQRY_KCD_MATL_MST_VENDOR_CD(e, 'VENDOR_CD')} options={datasQRY_KCD_MATL_MST_VENDOR_CD} optionLabel="VENDOR_NAME" placeholder="" filter onKeyPress={(e) => onKeyPressQRY_KCD_MATL_MST_VENDOR_CD(e)}></Dropdown>*/}
                        <InputText
                            style={{ width: "10rem" }}
                            value={dataQRY_KCD_MATL_MST.VENDOR_CD}
                            onChange={(e) =>
                                onInputChangeQRY_KCD_MATL_MST_VENDOR_NAME(
                                    e,
                                    "VENDOR_CD",
                                )
                            }
                            onKeyDown={onKeyDownTopSearchInput}
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "6rem" }}>
                    <div className="af-span-div-bin" style={{ width: "5rem" }}>
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
                            style={{ width: "5rem" }}
                            className="p-button-text"
                            onClick={searchTBL_KCD_MATL_MST}
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "6rem" }}>
                    <div className="af-span-div-bin" style={{ width: "5rem" }}>
                        <Button
                            label="Reset"
                            style={{ width: "5rem" }}
                            className="p-button-text"
                            onClick={resetQRY_KCD_MATL_MST}
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "6rem" }}>
                    <div className="af-span-div-bin" style={{ width: "5rem" }}>
                        <Button
                            label="Excel"
                            style={{ width: "5rem" }}
                            className="p-button-text green"
                            onClick={exportExcelTBL_KCD_MATL_MST}
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "13rem" }}>
                    <p className="af-span-p" style={{ width: "4rem" }}>Kind</p>
                    <div className="af-span-div" style={{ width: "8rem" }}>
                        <Dropdown
                            filter
                            style={{ width: "8rem" }}
                            id="id_QRY_MATL_TYPE"
                            value={dataQRY_KCD_MATL_MST_MATL_TYPE}
                            onChange={(e) =>
                                onDropdownChangeQRY_KCD_MATL_MST_MATL_TYPE(
                                    e,
                                    "MATL_TYPE",
                                )
                            }
                            options={datasQRY_KCD_MATL_MST_MATL_TYPE}
                            optionLabel="CD_NAME"
                            placeholder=""
                        ></Dropdown>
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "13rem" }}>
                    <p className="af-span-p" style={{ width: "4rem" }}>Kind2</p>
                    <div className="af-span-div" style={{ width: "8rem" }}>
                        <Dropdown
                            filter
                            style={{ width: "8rem" }}
                            id="id_QRY_MATL_TYPE2"
                            value={dataQRY_KCD_MATL_MST_MATL_TYPE2}
                            onChange={(e) =>
                                onDropdownChangeQRY_KCD_MATL_MST_MATL_TYPE2(
                                    e,
                                    "MATL_TYPE2",
                                )
                            }
                            options={datasQRY_KCD_MATL_MST_MATL_TYPE2}
                            optionLabel="MATL_TYPE2"
                            placeholder=""
                        ></Dropdown>
                    </div>
                </span>
            </div>
            <div className="af-div-first" style={{ width: "123rem" }}>
                {mainMatlTable}
            </div>

            <div style={{ height: "34.5rem" }}>
                <div
                    className="af-div-first"
                    style={{ width: "60rem", height: "34.5rem" }}
                >
                    <span className="af-span-3-0" style={{ width: "17rem" }}>
                        <p className="af-span-p" style={{ width: "6rem" }}>Matl#</p>
                        <div className="af-span-div" style={{ width: "10rem" }}>
                            <InputText
                                disabled
                                style={{ width: "10rem" }}
                                id="id_MATL_CD"
                                value={dataEDT_KCD_MATL_MST.MATL_CD}
                                onChange={(e) =>
                                    onInputChangeEDT_KCD_MATL_MST_MATL_CD(
                                        e,
                                        "MATL_CD",
                                    )
                                }
                            />
                        </div>
                    </span>
                    <span className="af-span-3-0" style={{ width: "11rem" }}>
                        <p className="af-span-p" style={{ width: "5rem" }}>Seq</p>
                        <div className="af-span-div" style={{ width: "5rem" }}>
                            <InputText
                                style={{ width: "5rem" }}
                                id="id_MATL_SEQ"
                                value={dataEDT_KCD_MATL_MST.MATL_SEQ_MAX}
                                onChange={(e) =>
                                    onInputChangeEDT_KCD_MATL_MST_MATL_SEQ_MAX(
                                        e,
                                        "MATL_SEQ_MAX",
                                    )
                                }
                            />
                        </div>
                    </span>
                    <span className="af-span-3-0" style={{ width: "27rem" }}>
                        <p className="af-span-p" style={{ width: "6rem" }}>Reg</p>
                        <div className="af-span-div" style={{ width: "10rem" }}>
                            <InputText
                                disabled
                                style={{ width: "10rem" }}
                                id="id_MATL_CD"
                                value={dataEDT_KCD_MATL_MST.REG_USER}
                                onChange={(e) =>
                                    onInputChangeEDT_KCD_MATL_MST_REG_USER(
                                        e,
                                        "REG_USER",
                                    )
                                }
                            />
                        </div>
                        <div className="af-span-div" style={{ width: "10rem" }}>
                            <InputText
                                disabled
                                style={{ width: "10rem" }}
                                id="id_MATL_CD"
                                value={dataEDT_KCD_MATL_MST.REG_DATETIME}
                                onChange={(e) =>
                                    onInputChangeEDT_KCD_MATL_MST_REG_DATETIME(
                                        e,
                                        "REG_DATETIME",
                                    )
                                }
                            />
                        </div>
                    </span>

                    <span className="af-span-3" style={{ width: "29rem" }}>
                        <p className="af-span-p red" style={{ width: "6rem" }}>*Supplier</p>
                        <div className="af-span-div" style={{ width: "18.5rem" }}>
                            <Dropdown
                                style={{ width: "18.5rem" }}
                                id="id_VENDOR_CD"
                                value={dataEDT_KCD_MATL_MST_VENDOR_CD}
                                onChange={(e) =>
                                    onDropdownChangeEDT_KCD_MATL_MST_VENDOR_CD(
                                        e,
                                        "VENDOR_CD",
                                    )
                                }
                                options={datasEDT_KCD_MATL_MST_VENDOR_CD}
                                optionLabel="VENDOR_NAME"
                                placeholder=""
                                filter
                                onKeyPress={(e) =>
                                    onKeyPressQRY_KCD_MATL_MST_VENDOR_CD(e)
                                }
                            ></Dropdown>
                        </div>
                        <div className="af-span-div" style={{ width: "2rem" }}>
                            <Button
                                label="U"
                                style={{ width: "2rem" }}
                                className="p-button-text"
                                onClick={process_SAVE_SUPPLIER}
                            />
                        </div>
                    </span>
                    <span className="af-span-3" style={{ width: "29rem" }}>
                        <p className="af-span-p" style={{ width: "6rem" }}>Status</p>
                        <div className="af-span-div" style={{ width: "18rem" }}>
                            <Dropdown
                                style={{ width: "18rem" }}
                                id="id_STATUS_CD"
                                value={dataEDT_KCD_MATL_MST_STATUS_CD}
                                onChange={(e) =>
                                    onDropdownChangeEDT_KCD_MATL_MST_STATUS_CD(
                                        e,
                                        "STATUS_CD",
                                    )
                                }
                                options={datasEDT_KCD_MATL_MST_STATUS_CD}
                                optionLabel="CD_NAME"
                                placeholder=""
                            ></Dropdown>
                        </div>
                        <div className="af-span-div" style={{ width: "2rem" }}>
                            <Button
                                label="U"
                                style={{ width: "2rem" }}
                                className="p-button-text"
                                onClick={process_SAVE_STATUS}
                            />
                        </div>
                    </span>

                    <span className="af-span-3" style={{ width: "58rem" }}>
                        <p className="af-span-p red" style={{ width: "6rem" }}>*Desc</p>
                        <div
                            className="af-span-div"
                            style={{ width: "47.5rem" }}
                        >
                            <InputText
                                style={{ width: "47.5rem" }}
                                id="id_MATL_NAME"
                                value={dataEDT_KCD_MATL_MST.MATL_NAME}
                                onChange={(e) =>
                                    onInputChangeEDT_KCD_MATL_MST_MATL_NAME(
                                        e,
                                        "MATL_NAME",
                                    )
                                }
                            />
                        </div>
                        <div className="af-span-div" style={{ width: "2rem" }}>
                            <Button
                                label="U"
                                style={{ width: "2rem" }}
                                className="p-button-text"
                                onClick={process_SAVE_DESC}
                            />
                        </div>
                    </span>

                    <span className="af-span-3" style={{ width: "29rem" }}>
                        <p className="af-span-p red" style={{ width: "6rem" }}>*Color</p>
                        <div
                            className="af-span-div"
                            style={{ width: "17.5rem" }}
                        >
                            <InputText
                                style={{ width: "17.5rem" }}
                                id="id_COLOR"
                                value={dataEDT_KCD_MATL_MST.COLOR}
                                onChange={(e) =>
                                    onInputChangeEDT_KCD_MATL_MST_COLOR(
                                        e,
                                        "COLOR",
                                    )
                                }
                            />
                        </div>
                        <div className="af-span-div" style={{ width: "2rem" }}>
                            <Button
                                label="U"
                                style={{ width: "2rem" }}
                                className="p-button-text"
                                onClick={process_SAVE_COLOR}
                            />
                        </div>
                    </span>
                    <span className="af-span-3" style={{ width: "29rem" }}>
                        <p className="af-span-p" style={{ width: "6rem" }}>Weight(g)</p>
                        <div className="af-span-div" style={{ width: "21rem" }}>
                            <InputText
                                style={{ width: "21rem" }}
                                id="id_WEIGHT"
                                value={dataEDT_KCD_MATL_MST.WEIGHT}
                                onChange={(e) =>
                                    onInputChangeEDT_KCD_MATL_MST_WEIGHT(
                                        e,
                                        "WEIGHT",
                                    )
                                }
                            />
                        </div>
                    </span>

                    <span className="af-span-3" style={{ width: "30rem" }}>
                        <p className="af-span-p red" style={{ width: "6rem" }}>*Unit</p>
                        <div className="af-span-div" style={{ width: "21rem" }}>
                            <Dropdown
                                style={{ width: "21rem" }}
                                id="id_UNIT"
                                value={dataEDT_KCD_MATL_MST_UNIT}
                                onChange={(e) =>
                                    onDropdownChangeEDT_KCD_MATL_MST_UNIT(
                                        e,
                                        "UNIT",
                                    )
                                }
                                options={datasEDT_KCD_MATL_MST_UNIT}
                                optionLabel="CD_NAME"
                                placeholder=""
                            ></Dropdown>
                        </div>
                        <div className="af-span-div" style={{ width: "2rem" }}>
                            <Button
                                label="U"
                                style={{ width: "2rem" }}
                                className="p-button-text"
                                onClick={process_SAVE_UNIT}
                            />
                        </div>
                    </span>
                    <span className="af-span-3" style={{ width: "29rem" }}>
                        <p className="af-span-p" style={{ width: "6rem" }}>Box</p>
                        <div className="af-span-div" style={{ width: "21rem" }}>
                            <Dropdown
                                style={{ width: "21rem" }}
                                id="id_BOX_UNIT"
                                value={dataEDT_KCD_MATL_MST_BOX_UNIT}
                                onChange={(e) =>
                                    onDropdownChangeEDT_KCD_MATL_MST_BOX_UNIT(
                                        e,
                                        "BOX_UNIT",
                                    )
                                }
                                options={datasEDT_KCD_MATL_MST_BOX_UNIT}
                                optionLabel="CD_NAME"
                                placeholder=""
                            ></Dropdown>
                        </div>
                    </span>

                    <span className="af-span-3" style={{ width: "58rem" }}>
                        <p className="af-span-p red" style={{ width: "6rem" }}>*Spec</p>
                        <div
                            className="af-span-div"
                            style={{ width: "47.5rem" }}
                        >
                            <InputText
                                style={{ width: "47.5rem" }}
                                id="id_SPEC"
                                value={dataEDT_KCD_MATL_MST.SPEC}
                                onChange={(e) =>
                                    onInputChangeEDT_KCD_MATL_MST_SPEC(
                                        e,
                                        "SPEC",
                                    )
                                }
                            />
                        </div>
                        <div className="af-span-div" style={{ width: "2rem" }}>
                            <Button
                                label="U"
                                style={{ width: "2rem" }}
                                className="p-button-text"
                                onClick={process_SAVE_SPEC}
                            />
                        </div>
                    </span>

                    <span className="af-span-3" style={{ width: "19rem" }}>
                        <p className="af-span-p" style={{ width: "6rem" }}>Add Rate</p>
                        <div className="af-span-div" style={{ width: "12rem" }}>
                            <InputText
                                style={{ width: "12rem" }}
                                id="id_ADD_RATE"
                                value={dataEDT_KCD_MATL_MST.ADD_RATE}
                                onChange={(e) =>
                                    onInputChangeEDT_KCD_MATL_MST_ADD_RATE(
                                        e,
                                        "ADD_RATE",
                                    )
                                }
                            />
                        </div>
                    </span>
                    <span className="af-span-3" style={{ width: "19rem" }}>
                        <p className="af-span-p" style={{ width: "6rem" }}>Add Amt</p>
                        <div className="af-span-div" style={{ width: "12rem" }}>
                            <InputText
                                style={{ width: "12rem" }}
                                id="id_ADD_AMT"
                                value={dataEDT_KCD_MATL_MST.ADD_AMT}
                                onChange={(e) =>
                                    onInputChangeEDT_KCD_MATL_MST_ADD_AMT(
                                        e,
                                        "ADD_AMT",
                                    )
                                }
                            />
                        </div>
                    </span>
                    <span className="af-span-3" style={{ width: "19rem" }}>
                        <p className="af-span-p" style={{ width: "6rem" }}>Add Loss</p>
                        <div className="af-span-div" style={{ width: "12rem" }}>
                            <InputText
                                style={{ width: "12rem" }}
                                id="id_ADD_AMT"
                                value={dataEDT_KCD_MATL_MST.ADD_LOSS}
                                onChange={(e) =>
                                    onInputChangeEDT_KCD_MATL_MST_ADD_LOSS(
                                        e,
                                        "ADD_LOSS",
                                    )
                                }
                            />
                        </div>
                    </span>

                    <span className="af-span-3" style={{ width: "29rem" }}>
                        <p className="af-span-p" style={{ width: "6rem" }}>C/F</p>
                        <div className="af-span-div" style={{ width: "21rem" }}>
                            <Dropdown
                                style={{ width: "21rem" }}
                                id="id_CF"
                                value={dataEDT_KCD_MATL_MST_PRICE_TYPE}
                                onChange={(e) =>
                                    onDropdownChangeEDT_KCD_MATL_MST_PRICE_TYPE(
                                        e,
                                        "PRICE_TYPE",
                                    )
                                }
                                options={datasEDT_KCD_MATL_MST_PRICE_TYPE}
                                optionLabel="CD_NAME"
                                placeholder=""
                            ></Dropdown>
                        </div>
                    </span>

                    <div>
                        <span className="af-span-3" style={{ width: "29rem" }}>
                            <p
                                className="af-span-p red"
                                style={{ width: "6rem" }}
                            >*Kind</p>
                            <div
                                className="af-span-div"
                                style={{ width: "21rem" }}
                            >
                                <Dropdown
                                    filter
                                    style={{ width: "18rem" }}
                                    id="id_MATL_TYPE"
                                    value={viewEDT_KCD_MATL_MST_MATL_TYPE}
                                    onChange={(e) =>
                                        onDropdownChangeEDT_KCD_MATL_MST_MATL_TYPE(
                                            e,
                                            "MATL_TYPE",
                                        )
                                    }
                                    options={datasEDT_KCD_MATL_MST_MATL_TYPE}
                                    optionLabel="CD_NAME"
                                    placeholder=""
                                ></Dropdown>
                                <div
                                    className="af-span-div"
                                    style={{ width: "2rem" }}
                                >
                                    <Button
                                        label="U"
                                        style={{ width: "2rem" }}
                                        className="p-button-text"
                                        onClick={process_SAVE_KIND}
                                    />
                                </div>
                            </div>
                        </span>
                        <span className="af-span-3" style={{ width: "29rem" }}>
                            <p
                                className="af-span-p red"
                                style={{ width: "6rem" }}
                            >*Kind2</p>
                            <div
                                className="af-span-div"
                                style={{ width: "21rem" }}
                            >
                                <Dropdown
                                    filter
                                    style={{ width: "18rem" }}
                                    id="id_MATL_TYPE2"
                                    value={viewEDT_KCD_MATL_MST_MATL_TYPE2}
                                    onChange={(e) =>
                                        onDropdownChangeEDT_KCD_MATL_MST_MATL_TYPE2(
                                            e,
                                            "MATL_TYPE2",
                                        )
                                    }
                                    options={datasEDT_KCD_MATL_MST_MATL_TYPE2}
                                    optionLabel="MATL_TYPE2"
                                    placeholder=""
                                ></Dropdown>
                                <div
                                    className="af-span-div"
                                    style={{ width: "2rem" }}
                                >
                                    <Button
                                        label="U"
                                        style={{ width: "2rem" }}
                                        className="p-button-text"
                                        onClick={process_SAVE_KIND2}
                                    />
                                </div>
                            </div>
                        </span>
                    </div>

                    <span className="af-span-3" style={{ width: "58rem" }}>
                        <p className="af-span-p" style={{ width: "8rem" }}>Update Reason</p>
                        <div className="af-span-div" style={{ width: "40rem" }}>
                            <InputText
                                disabled
                                style={{ width: "49rem" }}
                                value={dataEDT_KCD_MATL_MST.UPDATE_REASON}
                                onChange={(e) =>
                                    onInputChangeEDT_KCD_MATL_MST_UPDATE_REASON(
                                        e,
                                        "UPDATE_REASON",
                                    )
                                }
                            />
                        </div>
                    </span>

                    <div style={{ marginTop: "10px" }}>
                        <span className="af-span-3" style={{ width: "9rem" }}>
                            <div
                                className="af-span-div"
                                style={{ width: "9rem" }}
                            >
                                <Button
                                    id="btnInsert"
                                    ref={btnInsert}
                                    label="Insert(F2)"
                                    style={{ width: "9rem" }}
                                    className="p-button-text"
                                    onClick={process_SAVE}
                                />
                            </div>
                        </span>
                        <span className="af-span-3" style={{ width: "9rem" }}>
                            <div
                                className="af-span-div"
                                style={{ width: "9rem" }}
                            >
                                <Button
                                    id="btnUpdate"
                                    ref={btnUpdate}
                                    label="Update(F3)"
                                    style={{ width: "9rem" }}
                                    className="p-button-text"
                                    onClick={process_UPDATE}
                                />
                            </div>
                        </span>
                        <span className="af-span-3" style={{ width: "9rem" }}>
                            <div
                                className="af-span-div"
                                style={{ width: "9rem" }}
                            >
                                <Button
                                    label="Reset"
                                    style={{ width: "9rem" }}
                                    className="p-button-text"
                                    onClick={resetEDT_KCD_MATL_MST}
                                />
                            </div>
                        </span>
                        <span className="af-span-3" style={{ width: "9rem" }}>
                            <div
                                className="af-span-div"
                                style={{ width: "9rem" }}
                            >
                                <Button
                                    id="btnRemove"
                                    ref={btnRemove}
                                    label="Remove(F4)"
                                    style={{ width: "9rem" }}
                                    className="p-button-text"
                                    onClick={process_REMOVE}
                                />
                            </div>
                        </span>
                        <span className="af-span-3" style={{ width: "9rem" }}>
                            <div
                                className="af-span-div"
                                style={{ width: "9rem" }}
                            >
                                <Button
                                    label="Batch Update"
                                    style={{ width: "9rem" }}
                                    className="p-button-text orange"
                                    onClick={popup_BATCH_SAVE}
                                />
                            </div>
                        </span>

                    </div>
                    <div style={{ marginTop: "0px" }}>
                        <div>
                            <span
                                className="af-span-3"
                                style={{ width: "38rem" }}
                            >
                                <p
                                    className="af-span-p"
                                    style={{ width: "6rem" }}
                                >Hs Code</p>
                                <div
                                    className="af-span-div"
                                    style={{ width: "31rem" }}
                                >
                                    <Dropdown
                                        style={{ width: "31rem" }}
                                        id="id_CURR_CD"
                                        value={dataEDT_KCD_MATL_MST_HS_CD}
                                        onChange={(e) =>
                                            onDropdownChangeEDT_KCD_MATL_MST_HS_CD(
                                                e,
                                                "HS_CD",
                                            )
                                        }
                                        options={datasEDT_KCD_MATL_MST_HS_CD}
                                        optionLabel="HS_NAME"
                                        placeholder=""
                                        filter
                                    ></Dropdown>
                                </div>
                            </span>
                        </div>
                        <div>
                            <span
                                className="af-span-3"
                                style={{ width: "19rem" }}
                            >
                                <p
                                    className="af-span-p"
                                    style={{ width: "6rem" }}
                                >COMP1</p>
                                <div
                                    className="af-span-div"
                                    style={{ width: "12rem" }}
                                >
                                    <Dropdown
                                        disabled={isSub}
                                        style={{ width: "12rem" }}
                                        id="id_CURR_CD"
                                        value={dataEDT_KCD_MATL_MST_COMP1}
                                        onChange={(e) =>
                                            onDropdownChangeEDT_KCD_MATL_MST_COMP1(
                                                e,
                                                "COMP1",
                                            )
                                        }
                                        options={datasEDT_KCD_MATL_MST_COMP1}
                                        optionLabel="CD_NAME"
                                        placeholder=""
                                    ></Dropdown>
                                </div>
                            </span>
                            <span
                                className="af-span-3"
                                style={{ width: "7rem" }}
                            >
                                <div
                                    className="af-span-div"
                                    style={{ width: "5rem" }}
                                >
                                    <InputText
                                        disabled={isSub}
                                        style={{ width: "5rem" }}
                                        id="id_ADD_AMT"
                                        value={dataEDT_KCD_MATL_MST.COMP1_P}
                                        onChange={(e) =>
                                            onInputChangeEDT_KCD_MATL_MST_COMP1_P(
                                                e,
                                                "COMP1_P",
                                            )
                                        }
                                    />
                                </div>
                                <p
                                    className="af-span-p"
                                    style={{ width: "1rem" }}
                                >%</p>
                            </span>
                            <span
                                className="af-span-3"
                                style={{ width: "19rem" }}
                            >
                                <p
                                    className="af-span-p"
                                    style={{ width: "6rem" }}
                                >COMP2</p>
                                <div
                                    className="af-span-div"
                                    style={{ width: "12rem" }}
                                >
                                    <Dropdown
                                        disabled={isSub}
                                        style={{ width: "12rem" }}
                                        id="id_CURR_CD"
                                        value={dataEDT_KCD_MATL_MST_COMP2}
                                        onChange={(e) =>
                                            onDropdownChangeEDT_KCD_MATL_MST_COMP2(
                                                e,
                                                "COMP2",
                                            )
                                        }
                                        options={datasEDT_KCD_MATL_MST_COMP2}
                                        optionLabel="CD_NAME"
                                        placeholder=""
                                    ></Dropdown>
                                </div>
                            </span>
                            <span
                                className="af-span-3"
                                style={{ width: "7rem" }}
                            >
                                <div
                                    className="af-span-div"
                                    style={{ width: "5rem" }}
                                >
                                    <InputText
                                        disabled={isSub}
                                        style={{ width: "5rem" }}
                                        id="id_ADD_AMT"
                                        value={dataEDT_KCD_MATL_MST.COMP2_P}
                                        onChange={(e) =>
                                            onInputChangeEDT_KCD_MATL_MST_COMP2_P(
                                                e,
                                                "COMP2_P",
                                            )
                                        }
                                    />
                                </div>
                                <p
                                    className="af-span-p"
                                    style={{ width: "1rem" }}
                                >%</p>
                            </span>
                        </div>

                        <div>
                            <span
                                className="af-span-3"
                                style={{ width: "19rem" }}
                            >
                                <p
                                    className="af-span-p"
                                    style={{ width: "6rem" }}
                                >COMP3</p>
                                <div
                                    className="af-span-div"
                                    style={{ width: "12rem" }}
                                >
                                    <Dropdown
                                        disabled={isSub}
                                        style={{ width: "12rem" }}
                                        id="id_CURR_CD"
                                        value={dataEDT_KCD_MATL_MST_COMP3}
                                        onChange={(e) =>
                                            onDropdownChangeEDT_KCD_MATL_MST_COMP3(
                                                e,
                                                "COMP3",
                                            )
                                        }
                                        options={datasEDT_KCD_MATL_MST_COMP3}
                                        optionLabel="CD_NAME"
                                        placeholder=""
                                    ></Dropdown>
                                </div>
                            </span>
                            <span
                                className="af-span-3"
                                style={{ width: "7rem" }}
                            >
                                <div
                                    className="af-span-div"
                                    style={{ width: "5rem" }}
                                >
                                    <InputText
                                        disabled={isSub}
                                        style={{ width: "5rem" }}
                                        id="id_ADD_AMT"
                                        value={dataEDT_KCD_MATL_MST.COMP3_P}
                                        onChange={(e) =>
                                            onInputChangeEDT_KCD_MATL_MST_COMP3_P(
                                                e,
                                                "COMP3_P",
                                            )
                                        }
                                    />
                                </div>
                                <p
                                    className="af-span-p"
                                    style={{ width: "1rem" }}
                                >%</p>
                            </span>
                            <span
                                className="af-span-3"
                                style={{ width: "19rem" }}
                            >
                                <p
                                    className="af-span-p"
                                    style={{ width: "6rem" }}
                                >COMP4</p>
                                <div
                                    className="af-span-div"
                                    style={{ width: "12rem" }}
                                >
                                    <Dropdown
                                        disabled={isSub}
                                        style={{ width: "12rem" }}
                                        id="id_CURR_CD"
                                        value={dataEDT_KCD_MATL_MST_COMP4}
                                        onChange={(e) =>
                                            onDropdownChangeEDT_KCD_MATL_MST_COMP4(
                                                e,
                                                "COMP4",
                                            )
                                        }
                                        options={datasEDT_KCD_MATL_MST_COMP4}
                                        optionLabel="CD_NAME"
                                        placeholder=""
                                    ></Dropdown>
                                </div>
                            </span>
                            <span
                                className="af-span-3"
                                style={{ width: "7rem" }}
                            >
                                <div
                                    className="af-span-div"
                                    style={{ width: "5rem" }}
                                >
                                    <InputText
                                        disabled={isSub}
                                        style={{ width: "5rem" }}
                                        id="id_ADD_AMT"
                                        value={dataEDT_KCD_MATL_MST.COMP4_P}
                                        onChange={(e) =>
                                            onInputChangeEDT_KCD_MATL_MST_COMP4_P(
                                                e,
                                                "COMP4_P",
                                            )
                                        }
                                    />
                                </div>
                                <p
                                    className="af-span-p"
                                    style={{ width: "1rem" }}
                                >%</p>
                            </span>
                        </div>
                    </div>

                    <div style={{ marginTop: "5px" }}>
                        <span className="af-span-3" style={{ width: "10rem" }}>
                            <div
                                className="af-span-div"
                                style={{ width: "10rem" }}
                            >
                                <Button
                                    label="Update Comp"
                                    style={{ width: "10rem" }}
                                    className="p-button-text"
                                    onClick={process_ETC_UPDATE}
                                />
                            </div>
                        </span>
                    </div>
                </div>

                <div
                    className="af-div-first"
                    style={{
                        width: "40rem",
                        height: "34.5rem",
                        marginLeft: "0.5rem",
                    }}
                >
                    <div
                        className="af-div-first"
                        style={{ width: "40rem", height: "11rem", paddingTop: "3px" }}
                    >
                        <AFDataTable preventUnrelatedRerender
                            ref={dt_TBL_KCD_MATL_MEM}
                            size="small"
                            value={datasTBL_KCD_MATL_MEM}
                            tableStyle={{ tableLayout: "fixed" }}
                            resizableColumns
                            columnResizeMode="expand"
                            showGridlines
                            selection={selectedTBL_KCD_MATL_MEM}
                            onSelectionChange={(e) => {
                                setSelectedTBL_KCD_MATL_MEM(e.value);
                                onRowClick1TBL_KCD_MATL_MEM(e.value);
                            }}
                            onRowClick={onRowClickTBL_KCD_MATL_MEM}
                            dataKey="MATL_SEQ"
                            className="datatable-responsive"
                            virtualScrollerOptions={{ itemSize: 20 }}
                            emptyMessage=" "
                            //header={headerTBL_KCD_MATL_MEM}
                            responsiveLayout="scroll"
                            scrollable
                            scrollHeight="127px"
                        >
                            <AFColumn selectionMode="single" field="__checkbox__" reorderable={false} headerStyle={{ width: "5px" }} style={{ width: "5px" }} ></AFColumn>
                            <AFColumn style={{ width: "3rem", flexBasis: "auto" }} field="MATL_SEQ" headerClassName="t-header" header="seq" ></AFColumn>
                            <AFColumn style={{ width: "6rem", flexBasis: "auto" }} field="MATL_PRICE" headerClassName="t-header" header="M Price" body={(rowData) => serviceLib.numWithCommas( rowData.MATL_PRICE, 4, ) } bodyStyle={{ textAlign: "right" }} ></AFColumn>
                            <AFColumn style={{ width: "3rem", flexBasis: "auto" }} field="CURR_CD" headerClassName="t-header" header="Curr" ></AFColumn>
                            <AFColumn style={{ width: "3rem", flexBasis: "auto" }} field="CONF_FLAG" headerClassName="t-header" header="Conf" ></AFColumn>
                            <AFColumn style={{ width: "3rem", flexBasis: "auto" }} field="PRICE_TYPE" headerClassName="t-header" header="Type" ></AFColumn>
                            <AFColumn style={{ width: "10rem", flexBasis: "auto" }} field="UPD_DATETIME" headerClassName="t-header" header="Upd Date" ></AFColumn>
                            <AFColumn style={{ width: "10rem", flexBasis: "auto" }} field="REG_DATETIME" headerClassName="t-header" header="Reg Date" ></AFColumn>
                            <AFColumn style={{ width: "10rem", flexBasis: "auto" }} field="UPD_USER" headerClassName="t-header" header="Upd User" ></AFColumn>
                        </AFDataTable>
                    </div>

                    <div
                        className="af-div-second"
                        style={{ width: "40rem", height: "11rem", paddingTop: "7px" }}
                    >
                        <AFDataTable preventUnrelatedRerender
                            ref={dt_TBL_KCD_MATL_SALE}
                            size="small"
                            value={datasTBL_KCD_MATL_SALE}
                            tableStyle={{ tableLayout: "fixed" }}
                            resizableColumns
                            columnResizeMode="expand"
                            showGridlines
                            selectionMode="checkbox"
                            selection={selectedTBL_KCD_MATL_SALE}
                            onSelectionChange={(e) => {
                                setSelectedTBL_KCD_MATL_SALE(e.value);
                                onRowClick1TBL_KCD_MATL_SALE(e.value);
                            }}
                            onRowClick={onRowClickTBL_KCD_MATL_SALE}
                            dataKey="MATL_SEQ"
                            className="datatable-responsive"
                            virtualScrollerOptions={{ itemSize: 4 }}
                            emptyMessage=" "
                            //header={headerTBL_KCD_MATL_SALE}
                            responsiveLayout="scroll"
                            scrollable
                            scrollHeight="127px"
                        >
                            <AFColumn selectionMode="single" field="__checkbox__" reorderable={false} headerStyle={{ width: "5px" }} style={{ width: "5px" }} ></AFColumn>
                            <AFColumn style={{ width: "3rem", flexBasis: "auto" }} field="MATL_SEQ" headerClassName="t-header" header="seq" ></AFColumn>
                            <AFColumn style={{ width: "6rem", flexBasis: "auto" }} field="MATL_PRICE" headerClassName="t-header" header="S Price" body={(rowData) => serviceLib.numWithCommas( rowData.MATL_PRICE, 4, ) } bodyStyle={{ textAlign: "right" }} ></AFColumn>
                            <AFColumn style={{ width: "3rem", flexBasis: "auto" }} field="CURR_CD" headerClassName="t-header" header="Curr" ></AFColumn>
                            <AFColumn style={{ width: "3rem", flexBasis: "auto" }} field="CONF_FLAG" headerClassName="t-header" header="Conf" ></AFColumn>
                            <AFColumn style={{ width: "3rem", flexBasis: "auto" }} field="PRICE_TYPE" headerClassName="t-header" header="Type" ></AFColumn>
                            <AFColumn style={{ width: "10rem", flexBasis: "auto" }} field="UPD_DATETIME" headerClassName="t-header" header="Upd Date" ></AFColumn>
                            <AFColumn style={{ width: "10rem", flexBasis: "auto" }} field="REG_DATETIME" headerClassName="t-header" header="Reg Date" ></AFColumn>
                            <AFColumn style={{ width: "10rem", flexBasis: "auto" }} field="UPD_USER" headerClassName="t-header" header="Upd User" ></AFColumn>
                        </AFDataTable>
                    </div>
                    <div
                        className="af-div-second"
                        style={{ width: "40rem", height: "6rem" }}
                    >
                        <span className="af-span-3" style={{ width: "13rem" }}>
                            <p className="af-span-p" style={{ width: "5rem" }}>Price</p>
                            <div
                                className="af-span-div"
                                style={{ width: "7rem" }}
                            >
                                <InputText
                                    style={{ width: "7rem" }}
                                    id="id_MATL_PRICE"
                                    value={dataEDT_KCD_MATL_MEM.MATL_PRICE}
                                    onChange={(e) =>
                                        onInputChangeEDT_KCD_MATL_MEM_MATL_PRICE(
                                            e,
                                            "MATL_PRICE",
                                        )
                                    }
                                />
                            </div>
                        </span>

                        <span className="af-span-3" style={{ width: "13rem" }}>
                            <p className="af-span-p" style={{ width: "5rem" }}>Date</p>
                            <div
                                className="af-span-div"
                                style={{ width: "7rem" }}
                            >
                                <Calendar
                                    showButtonBar
                                    disabled
                                    style={{ width: "7rem" }}
                                    dateFormat="yy-mm-dd"
                                    id="id_CURR_DATE"
                                    value={new Date()}
                                    onChange={(e) =>
                                        onCalChangeEDT_KCD_MATL_MEM_CURR_DATE(
                                            e,
                                            "CURR_DATE",
                                        )
                                    }
                                />
                            </div>
                        </span>

                        <span className="af-span-3" style={{ width: "26rem" }}>
                            <p
                                className="af-span-p red"
                                style={{ width: "5rem" }}
                            >*Curr</p>
                            <div
                                className="af-span-div"
                                style={{ width: "7rem" }}
                            >
                                <Dropdown
                                    style={{ width: "7rem" }}
                                    id="id_CURR_CD"
                                    value={dataEDT_KCD_MATL_MEM_CURR_CD}
                                    onChange={(e) =>
                                        onDropdownChangeEDT_KCD_MATL_MEM_CURR_CD(
                                            e,
                                            "CURR_CD",
                                        )
                                    }
                                    options={datasEDT_KCD_MATL_MEM_CURR_CD}
                                    optionLabel="CD_NAME"
                                    placeholder=""
                                ></Dropdown>
                            </div>
                        </span>
                        <span
                            className="af-span-3"
                            style={{ display: "flex", width: "100%" }}
                        >
                            <div>
                                <p className="af-span-p"> Master Price </p>
                                <div className="af-span-checkbox">
                                    <Checkbox
                                        checked={changeCheckBoxVal(
                                            isMasterPrice,
                                        )}
                                        onChange={(e) =>
                                            onCheckboxChangeIS_SALES_PRICE(
                                                e,
                                                "IS_MASTER_PRICE",
                                            )
                                        }
                                    />
                                </div>
                            </div>

                            <div style={{ marginLeft: "10px" }}>
                                <p className="af-span-p"> Sales Price </p>
                                <div className="af-span-checkbox">
                                    <Checkbox
                                        checked={changeCheckBoxVal(
                                            isSalesPrice,
                                        )}
                                        onChange={(e) =>
                                            onCheckboxChangeIS_SALES_PRICE(
                                                e,
                                                "IS_SALES_PRICE",
                                            )
                                        }
                                    />
                                </div>
                            </div>
                            <div style={{ marginLeft: "10px" }}>
                                <Button
                                    id="btnSave"
                                    ref={btnSave}
                                    label="Save(F6)"
                                    style={{ width: "6rem" }}
                                    className="p-button-text"
                                    onClick={process_BATCH_PRICE}
                                />

                                <Button
                                    label="Batch Price Update"
                                    style={{ width: "10rem" }}
                                    className="p-button-text"
                                    onClick={process_BATCH_PRICE}
                                />

                                <Button
                                    label="Reset"
                                    style={{ width: "6rem" }}
                                    className="p-button-text"
                                    onClick={reset_BATCH_PRICE_INPUT}
                                />
                            </div>
                        </span>
                    </div>
                </div>

                <div
                    className="af-div-first"
                    style={{
                        marginLeft: "5px",
                        width: "22rem",
                        height: "34.5rem",
                    }}
                >
                    <p className="af-span-p" style={{ width: "6rem" }}>Offer Spec</p>

                    <span
                        className="af-span-3"
                        style={{ width: "32rem", height: "26rem" }}
                    >
                        <div className="af-span-div" style={{ width: "20rem" }}>
                            <InputTextarea
                                style={{ height: "282px", width: "20rem" }}
                                id="id_OFFER_SPEC"
                                value={dataEDT_KCD_MATL_MST.OFFER_SPEC}
                                onChange={(e) =>
                                    onInputChangeEDT_KCD_MATL_MST_OFFER_SPEC(
                                        e,
                                        "OFFER_SPEC",
                                    )
                                }
                                rows={23}
                                cols={1}
                            />
                        </div>
                    </span>

                    <span className="af-span-3-0" style={{ width: "6rem" }}>
                        <div className="af-span-div" style={{ width: "12rem" }}>
                            <Button
                                label="Update Offer Spec"
                                style={{ width: "12rem", marginLeft: "46px" }}
                                className="p-button-text"
                                onClick={process_ETC_UPDATE}
                            />
                        </div>
                    </span>
                </div>
            </div>

            <Toast ref={toast} />

            <Dialog
                visible={createDialog_SET_MOMCODE}
                position="mid-center"
                header={dlgHeader_SET_MOMCODE}
                modal={true}
                className="p-fluid"
                onHide={hideDialog_SET_MOMCODE}
            >
                <div
                    className="af-div-first"
                    style={{ width: "85rem", height: "13rem" }}
                >
                    <span className="af-span-3-0" style={{ width: "15rem" }}>
                        <p className="af-span-p" style={{ width: "6rem" }}>Matl#</p>
                        <div className="af-span-div" style={{ width: "8rem" }}>
                            <InputText
                                style={{ width: "8rem" }}
                                id="id_MATL_CD"
                                value={dataQRY_KCD_MATL_MST2.MATL_CD}
                                onChange={(e) =>
                                    onInputChangeQRY_KCD_MATL_MST2_MATL_CD(
                                        e,
                                        "MATL_CD",
                                    )
                                }
                            />
                        </div>
                    </span>
                    <span className="af-span-3-0" style={{ width: "11rem" }}>
                        <div
                            className="af-span-div-bin"
                            style={{ width: "10rem" }}
                        >
                            <Button
                                label={
                                    <span>
                                        Search(<u>S</u>)
                                    </span>
                                }
                                style={{ width: "10rem" }}
                                className="p-button-text"
                                onClick={search_SET_MOMCODE}
                            />
                        </div>
                    </span>
                    <span className="af-span-3-0" style={{ width: "19rem" }}>
                        <p className="af-span-p" style={{ width: "10rem" }}>Mom Matl#</p>
                        <div className="af-span-div" style={{ width: "8rem" }}>
                            <InputText
                                disabled
                                style={{ width: "8rem" }}
                                id="id_MATL_CD"
                                value={dataQRY_KCD_MATL_MST2.MOM_CD}
                                onChange={(e) =>
                                    onInputChangeQRY_KCD_MATL_MST2_MOM_CD(
                                        e,
                                        "MOM_CD",
                                    )
                                }
                            />
                        </div>
                    </span>
                    <span className="af-span-3-0" style={{ width: "40rem" }}>
                        <div
                            className="af-span-div-bin"
                            style={{ width: "10rem" }}
                        >
                            <Button
                                label="Save"
                                style={{ width: "10rem" }}
                                className="p-button-text"
                                onClick={process_SET_MOMCODE}
                            />
                        </div>
                    </span>

                    <span className="af-span-3-0" style={{ width: "90rem" }}>
                        <p className="af-span-p" style={{ width: "6rem" }}>Desc</p>
                        <div className="af-span-div" style={{ width: "70rem" }}>
                            <InputText
                                style={{ width: "70rem" }}
                                id="id_MATL_CD"
                                value={dataQRY_KCD_MATL_MST2.MATL_NAME}
                                onChange={(e) =>
                                    onInputChangeQRY_KCD_MATL_MST2_MATL_NAME(
                                        e,
                                        "MATL_NAME",
                                    )
                                }
                            />
                        </div>
                    </span>

                    <span className="af-span-3-0" style={{ width: "90rem" }}>
                        <p className="af-span-p" style={{ width: "6rem" }}>Color</p>
                        <div className="af-span-div" style={{ width: "70rem" }}>
                            <InputText
                                style={{ width: "70rem" }}
                                id="id_MATL_CD"
                                value={dataQRY_KCD_MATL_MST2.COLOR}
                                onChange={(e) =>
                                    onInputChangeQRY_KCD_MATL_MST2_COLOR(
                                        e,
                                        "COLOR",
                                    )
                                }
                            />
                        </div>
                    </span>

                    <span className="af-span-3-0" style={{ width: "90rem" }}>
                        <p className="af-span-p" style={{ width: "6rem" }}>Spec</p>
                        <div className="af-span-div" style={{ width: "70rem" }}>
                            <InputText
                                style={{ width: "70rem" }}
                                id="id_MATL_CD"
                                value={dataQRY_KCD_MATL_MST2.SPEC}
                                onChange={(e) =>
                                    onInputChangeQRY_KCD_MATL_MST2_SPEC(
                                        e,
                                        "SPEC",
                                    )
                                }
                            />
                        </div>
                    </span>

                    <span className="af-span-3-0" style={{ width: "90rem" }}>
                        <p className="af-span-p" style={{ width: "6rem" }}>Supplier</p>
                        <div className="af-span-div" style={{ width: "70rem" }}>
                            <Dropdown
                                style={{ width: "70rem" }}
                                id="id_VENDOR_CD"
                                value={dataQRY_KCD_MATL_MST2_VENDOR_CD}
                                onChange={(e) =>
                                    onDropdownChangeQRY_KCD_MATL_MST2_VENDOR_CD(
                                        e,
                                        "VENDOR_CD",
                                    )
                                }
                                options={datasQRY_KCD_MATL_MST2_VENDOR_CD}
                                optionLabel="VENDOR_NAME"
                                placeholder=""
                                filter
                                onKeyPress={(e) =>
                                    onKeyPressQRY_KCD_MATL_MST2_VENDOR_CD(e)
                                }
                            ></Dropdown>
                        </div>
                    </span>
                </div>
                <div
                    className="af-div-first"
                    style={{ width: "85rem", height: "40rem" }}
                >
                    <AFDataTable preventUnrelatedRerender
                        ref={dt_TBL_KCD_MATL_MST2}
                        size="small"
                        value={datasTBL_KCD_MATL_MST2}
                        tableStyle={{ tableLayout: "fixed" }}
                        loading={loadingTBL_KCD_MATL_MST2}
                        resizableColumns
                        columnResizeMode="expand"
                        metaKeySelection={false}
                        showGridlines
                        selectionMode="multiple"
                        selection={selectedTBL_KCD_MATL_MST2}
                        onSelectionChange={(e) => {
                            setSelectedTBL_KCD_MATL_MST2(e.value);
                        }}
                        dataKey="MATL_CD"
                        className="datatable-responsive"
                        virtualScrollerOptions={{ itemSize: 20 }}
                        emptyMessage=" "
                        responsiveLayout="scroll"
                        scrollable
                        scrollHeight="40rem"
                    >
                        <AFColumn field="MATL_TYPE_NAME" headerClassName="t-header" header="Kind" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                        <AFColumn field="MATL_TYPE2_NAME" headerClassName="t-header" header="Kind2" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                        <AFColumn field="MATL_CD" headerClassName="t-header" header="Matl#" style={{ width: "8rem", flexBasis: "auto" }} ></AFColumn>
                        <AFColumn field="MATL_TYPE" headerClassName="t-header" header="Matl Type#" style={{ width: "2rem", flexBasis: "auto" }} ></AFColumn>
                        <AFColumn field="VENDOR_CD" headerClassName="t-header" header="Vendor" style={{ width: "8rem", flexBasis: "auto" }} ></AFColumn>
                        <AFColumn field="VENDOR_NAME" headerClassName="t-header" header="Supplier" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                        <AFColumn field="MATL_NAME" headerClassName="t-header" header="Description" style={{ width: "18rem", flexBasis: "auto" }} ></AFColumn>
                        <AFColumn field="COLOR" headerClassName="t-header" header="Color" style={{ width: "8rem", flexBasis: "auto" }} ></AFColumn>
                        <AFColumn field="SPEC" headerClassName="t-header" header="Spec" style={{ width: "15rem", flexBasis: "auto" }} ></AFColumn>
                        <AFColumn field="UNIT" headerClassName="t-header" header="Unit" style={{ width: "5rem", flexBasis: "auto" }} ></AFColumn>
                        <AFColumn field="MATL_UNIT_NAME" headerClassName="t-header" header="Unit" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                        <AFColumn field="MATL_PRICE" headerClassName="t-header" header="Price" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                        <AFColumn field="CURR_CD" headerClassName="t-header" header="Curr" style={{ width: "5rem", flexBasis: "auto" }} ></AFColumn>
                        <AFColumn field="S_MATL_PRICE" headerClassName="t-header" header="S/Price" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                        <AFColumn field="S_CURR_CD" headerClassName="t-header" header="S/Curr" style={{ width: "5rem", flexBasis: "auto" }} ></AFColumn>
                        <AFColumn field="WEIGHT" headerClassName="t-header" header="Weight" style={{ width: "8rem", flexBasis: "auto" }} ></AFColumn>
                        <AFColumn field="BOX_UNIT" headerClassName="t-header" header="Box" style={{ width: "8rem", flexBasis: "auto" }} ></AFColumn>
                        <AFColumn field="BOX_UNIT_NAME" headerClassName="t-header" header="Box" style={{ width: "8rem", flexBasis: "auto" }} ></AFColumn>
                        <AFColumn field="STATUS_CD" headerClassName="t-header" header="Status" style={{ width: "8rem", flexBasis: "auto" }} ></AFColumn>
                        <AFColumn field="STATUS_CD_NAME" headerClassName="t-header" header="Status" style={{ width: "8rem", flexBasis: "auto" }} ></AFColumn>
                        <AFColumn field="UPD_USER" headerClassName="t-header" header="Upd User" style={{ width: "8rem", flexBasis: "auto" }} ></AFColumn>
                        <AFColumn field="REG_USER" headerClassName="t-header" header="Reg User" style={{ width: "8rem", flexBasis: "auto" }} ></AFColumn>
                        <AFColumn field="VENDOR_TYPE" headerClassName="t-header" header="Vendor Type" style={{ width: "8rem", flexBasis: "auto" }} ></AFColumn>
                        <AFColumn field="HS_CD" headerClassName="t-header" header="Hs Cd" style={{ width: "8rem", flexBasis: "auto" }} ></AFColumn>
                        <AFColumn field="ADD_RATE" headerClassName="t-header" header="Add Rate" style={{ width: "8rem", flexBasis: "auto" }} ></AFColumn>
                        <AFColumn field="ADD_AMT" header="Add Amt" style={{ width: "8rem", flexBasis: "auto" }} ></AFColumn>
                        <AFColumn field="ADD_LOSS" headerClassName="t-header" header="Add Loss" style={{ width: "8rem", flexBasis: "auto" }} ></AFColumn>
                        <AFColumn field="REG_DATETIME" headerClassName="t-header" header="Reg Time" style={{ width: "8rem", flexBasis: "auto" }} ></AFColumn>
                        <AFColumn field="rep_matl_cd" headerClassName="t-header" header="Mom Matl#" style={{ width: "8rem", flexBasis: "auto" }} ></AFColumn>
                    </AFDataTable>
                </div>
            </Dialog>

            <Dialog
                visible={createDialog_LIST_STYLE}
                style={{ width: "86rem" }}
                position="mid-center"
                header={dlgHeader_LIST_STYLE}
                modal={true}
                className="p-fluid"
                onHide={hideDialog_LIST_STYLE}
            >
                <div
                    className="af-div-first"
                    style={{ width: "84rem", height: "3rem" }}
                >
                    <span className="af-span-3-0" style={{ width: "15rem" }}>
                        <p className="af-span-p" style={{ width: "6rem" }}>Matl#</p>
                        <div className="af-span-div" style={{ width: "8rem" }}>
                            <InputText
                                style={{ width: "8rem" }}
                                id="id_MATL_CD"
                                value={dataQRY_KCD_MATL_MST3.MATL_CD}
                                onChange={(e) =>
                                    onInputChangeQRY_KCD_MATL_MST3_MATL_CD(
                                        e,
                                        "MATL_CD",
                                    )
                                }
                            />
                        </div>
                    </span>
                </div>
                <div
                    className="af-div-first"
                    style={{ width: "84rem", height: "40rem" }}
                >
                    <AFDataTable preventUnrelatedRerender
                        ref={dt_TBL_KCD_MATL_MST3}
                        size="small"
                        value={datasTBL_KCD_MATL_MST3}
                        tableStyle={{ tableLayout: "fixed" }}
                        loading={loadingTBL_KCD_MATL_MST3}
                        resizableColumns
                        columnResizeMode="expand"
                        metaKeySelection={false}
                        showGridlines
                        selectionMode="multiple"
                        selection={selectedTBL_KCD_MATL_MST3}
                        onSelectionChange={(e) => {
                            setSelectedTBL_KCD_MATL_MST3(e.value);
                        }}
                        dataKey="MATL_CD"
                        className="datatable-responsive"
                        virtualScrollerOptions={{ itemSize: 20 }}
                        emptyMessage=" "
                        responsiveLayout="scroll"
                        scrollable
                        scrollHeight="40rem"
                    >
                        <AFColumn field="matl_cd" headerClassName="t-header" header="Matl#" style={{ width: "7rem", flexBasis: "auto" }} ></AFColumn>
                        <AFColumn field="prod_cd" headerClassName="t-header" header="Prod#" style={{ width: "7rem", flexBasis: "auto" }} ></AFColumn>
                        <AFColumn field="style_name" headerClassName="t-header" header="Style" style={{ width: "25rem", flexBasis: "auto" }} ></AFColumn>
                        <AFColumn field="net" headerClassName="t-header" header="Net" style={{ width: "5rem", flexBasis: "auto" }} ></AFColumn>
                        <AFColumn field="loss" headerClassName="t-header" header="Loss" style={{ width: "5rem", flexBasis: "auto" }} ></AFColumn>
                        <AFColumn field="use_size" headerClassName="t-header" header="Use size" style={{ width: "7rem", flexBasis: "auto" }} ></AFColumn>
                        <AFColumn field="remark" headerClassName="t-header" header="Remark" style={{ width: "25rem", flexBasis: "auto" }} ></AFColumn>
                        <AFColumn field="order_cd" headerClassName="t-header" header="Order#" style={{ width: "7rem", flexBasis: "auto" }} ></AFColumn>
                    </AFDataTable>
                </div>
            </Dialog>

            <Dialog
                visible={createDialog_LIST_REMARK}
                style={{ width: "86rem" }}
                position="mid-center"
                header={dlgHeader_LIST_REMARK}
                modal={true}
                className="p-fluid"
                onHide={hideDialog_LIST_REMARK}
            >
                <div
                    className="af-div-first"
                    style={{ width: "84rem", height: "3rem" }}
                >
                    <span
                        className="af-span-3-0"
                        style={{
                            width: "84rem",
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            gap: "0.5rem",
                        }}
                    >
                        <p style={{ width: "6rem" }}> Matl# </p>
                        <InputText
                            style={{ width: "8rem" }}
                            id="id_MATL_CD"
                            value={dataQRY_KCD_MATL_MST4.MATL_CD}
                            onChange={(e) =>
                                onInputChangeQRY_KCD_MATL_MST4_MATL_CD(
                                    e,
                                    "MATL_CD",
                                )
                            }
                        />

                        <Button
                            label="Update Remark"
                            style={{ width: "10rem" }}
                            className="p-button-text"
                            onClick={process_UPDATE_REMARK}
                        />
                    </span>
                </div>
                <div
                    className="af-div-first"
                    style={{ width: "84rem", height: "40rem" }}
                >
                    <AFDataTable preventUnrelatedRerender
                        ref={dt_TBL_KCD_MATL_MST4}
                        size="small"
                        value={datasTBL_KCD_MATL_MST4}
                        tableStyle={{ tableLayout: "fixed" }}
                        loading={loadingTBL_KCD_MATL_MST4}
                        resizableColumns
                        columnResizeMode="expand"
                        metaKeySelection={false}
                        showGridlines
                        selectionMode="multiple"
                        selection={selectedTBL_KCD_MATL_MST4}
                        onSelectionChange={(e) => {
                            setSelectedTBL_KCD_MATL_MST4(e.value);
                        }}
                        dataKey="MATL_CD"
                        className="datatable-responsive"
                        virtualScrollerOptions={{ itemSize: 20 }}
                        emptyMessage=" "
                        responsiveLayout="scroll"
                        editMode="cell"
                        scrollable
                        scrollHeight="40rem"
                    >
                        <AFColumn forceWidth style={{ width: "10rem" }} field="upd_user" headerClassName="t-header" header="User" ></AFColumn>
                        <AFColumn forceWidth style={{ width: "10rem" }} field="upd_datetime" headerClassName="t-header" header="Date" body={(r) => serviceLib.dateFormat(r.upd_datetime)} ></AFColumn>
                        <AFColumn field="update_remark" headerClassName="t-header" header="Remark" editor={(options) => { return ( <InputText value={options.value || ""} autoFocus style={{ width: "100%" }} onChange={(e) => options.editorCallback( e.target.value, ) } onFocus={(e) => e.target.select()} /> ); }} onCellEditComplete={(e) => { const { rowIndex, newValue, field } = e; const updated = [...datasTBL_KCD_MATL_MST4]; const oldValue = updated[rowIndex][field]; updated[rowIndex] = { ...updated[rowIndex], [field]: newValue, isChanged: oldValue !== newValue, }; setDatasTBL_KCD_MATL_MST4(updated); }} />
                    </AFDataTable>
                </div>
            </Dialog>

            <Dialog
                visible={createDialog_BATCH_SAVE}
                style={{ width: "88rem" }}
                position="mid-center"
                header={dlgHeader_BATCH_SAVE}
                modal={true}
                className="p-fluid"
                onHide={hideDialog_BATCH_SAVE}
            >
                <div
                    className="af-div-first"
                    style={{ width: "85rem", height: "5rem" }}
                >
                    <span className="af-span-3-0" style={{ width: "15rem" }}>
                        <p className="af-span-p" style={{ width: "6rem" }}>Matl#</p>
                        <div className="af-span-div" style={{ width: "8rem" }}>
                            <InputText
                                style={{ width: "8rem" }}
                                id="id_MATL_CD"
                                value={dataQRY_KCD_MATL_MST5.MATL_CD}
                                onChange={(e) =>
                                    onInputChangeQRY_KCD_MATL_MST5_MATL_CD(
                                        e,
                                        "MATL_CD",
                                    )
                                }
                            />
                        </div>
                    </span>
                    <span className="af-span-3-0" style={{ width: "22rem" }}>
                        <p className="af-span-p" style={{ width: "6rem" }}>Supplier#</p>
                        <div className="af-span-div" style={{ width: "15rem" }}>
                            <InputText
                                style={{ width: "15rem" }}
                                id="id_MATL_CD"
                                value={dataQRY_KCD_MATL_MST5.VENDOR_NAME}
                                onChange={(e) =>
                                    onInputChangeQRY_KCD_MATL_MST5_VENDOR_NAME(
                                        e,
                                        "VENDOR_NAME",
                                    )
                                }
                            />
                        </div>
                    </span>
                    <span className="af-span-3-0" style={{ width: "26rem" }}>
                        <p className="af-span-p" style={{ width: "0rem" }}></p>
                        <div className="af-span-div" style={{ width: "26rem", display: "flex", gap: "1rem" }}>
                            <Button
                                label="Save"
                                style={{ width: "12rem" }}
                                className="p-button-text"
                                onClick={process_BATCH_SAVE}
                            />
                            <Button
                                label="Reset"
                                style={{ width: "12rem" }}
                                className="p-button-text"
                                onClick={resetBatchSave}
                            />
                        </div>
                    </span>
                </div>
                <div
                    className="af-div-first"
                    style={{ width: "85rem", height: "20rem" }}
                >
                    <AFDataTable preventUnrelatedRerender
                        ref={dt_TBL_KCD_MATL_MST5}
                        size="small"
                        value={datasTBL_KCD_MATL_MST5}
                        editMode="cell"
                        tableStyle={{ tableLayout: "fixed" }}
                        loading={loadingTBL_KCD_MATL_MST5}
                        resizableColumns
                        columnResizeMode="expand"
                        metaKeySelection={false}
                        showGridlines
                        selection={selectedTBL_KCD_MATL_MST5}
                        onSelectionChange={(e) => {
                            setSelectedTBL_KCD_MATL_MST5(e.value);
                        }}
                        dataKey="id"
                        className="datatable-responsive"
                        virtualScrollerOptions={{ itemSize: 20 }}
                        emptyMessage=" "
                        responsiveLayout="scroll"
                        scrollable
                        scrollHeight="20rem"
                    >
                        <AFColumn selectionMode="single" field="__checkbox__" reorderable={false} headerStyle={{ width: "5px" }} style={{ width: "5px" }} ></AFColumn>
                        <AFColumn field="MATL_NAME" headerClassName="t-header" header="Desc" style={{ width: "30rem", flexBasis: "auto", color: "green", }} editor={(options) => textEditor(options)} onCellEditComplete={ onCellEditCompleteTBL_KCD_MATL_MST5 } ></AFColumn>
                        <AFColumn field="COLOR" headerClassName="t-header" header="Color" style={{ width: "30rem", flexBasis: "auto", color: "green", }} editor={(options) => textEditor(options)} onCellEditComplete={ onCellEditCompleteTBL_KCD_MATL_MST5 } ></AFColumn>
                        <AFColumn field="SPEC" headerClassName="t-header" header="Spec" style={{ width: "30rem", flexBasis: "auto", color: "green", }} editor={(options) => textEditor(options)} onCellEditComplete={ onCellEditCompleteTBL_KCD_MATL_MST5 } ></AFColumn>
                    </AFDataTable>
                </div>
                <div
                    className="af-div-first"
                    style={{ width: "85rem", height: "3rem" }}
                >
                    <span className="af-span-3-0" style={{ width: "29rem" }}>
                        <p className="af-span-p" style={{ width: "6rem" }}>Reg User</p>
                        <div className="af-span-div" style={{ width: "12rem" }}>
                            <InputText
                                disabled
                                style={{ width: "12rem" }}
                                id="id_MATL_CD"
                                value={dataEDT_KCD_MATL_MST6.REG_USER}
                                onChange={(e) =>
                                    onInputChangeEDT_KCD_MATL_MST6_REG_USER(
                                        e,
                                        "REG_USER",
                                    )
                                }
                            />
                        </div>
                        <div className="af-span-div" style={{ width: "10rem" }}>
                            <InputText
                                disabled
                                style={{ width: "10rem" }}
                                id="id_MATL_CD"
                                value={dataEDT_KCD_MATL_MST6.REG_DATETIME}
                                onChange={(e) =>
                                    onInputChangeEDT_KCD_MATL_MST6_REG_DATETIME(
                                        e,
                                        "REG_DATETIME",
                                    )
                                }
                            />
                        </div>
                    </span>

                    <span className="af-span-3-0" style={{ width: "11rem" }}>
                        <div className="af-span-div" style={{ width: "10rem" }}>
                            <Button
                                label="Update"
                                style={{ width: "10rem" }}
                                className="p-button-text"
                                onClick={process_BATCH_UPDATE}
                            />
                        </div>
                    </span>
                    <span className="af-span-3-0" style={{ width: "11rem" }}>
                        <div className="af-span-div" style={{ width: "10rem" }}>
                            <Button
                                label="Delete"
                                style={{ width: "10rem" }}
                                className="p-button-text"
                                onClick={process_BATCH_DELETE}
                            />
                        </div>
                    </span>
                </div>
                <div
                    className="af-div-first"
                    style={{ width: "85rem", height: "3rem" }}
                >
                    <span className="af-span-3" style={{ width: "15rem" }}>
                        <p className="af-span-p" style={{ width: "6rem" }}>Unit</p>
                        <div className="af-span-div" style={{ width: "8rem" }}>
                            <Dropdown
                                style={{ width: "8rem" }}
                                id="id_BOX_UNIT"
                                value={dataEDT_KCD_MATL_MST6_BOX_UNIT}
                                onChange={(e) =>
                                    onDropdownChangeEDT_KCD_MATL_MST6_BOX_UNIT(
                                        e,
                                        "BOX_UNIT",
                                    )
                                }
                                options={datasEDT_KCD_MATL_MST6_BOX_UNIT}
                                optionLabel="CD_NAME"
                                placeholder=""
                            ></Dropdown>
                        </div>
                    </span>
                    <span className="af-span-3" style={{ width: "22rem" }}>
                        <p className="af-span-p" style={{ width: "6rem" }}>Kind</p>
                        <div className="af-span-div" style={{ width: "15rem" }}>
                            <Dropdown
                                filter
                                style={{ width: "15rem" }}
                                id="id_MATL_TYPE"
                                value={dataEDT_KCD_MATL_MST6_MATL_TYPE}
                                onChange={(e) =>
                                    onDropdownChangeEDT_KCD_MATL_MST6_MATL_TYPE(
                                        e,
                                        "MATL_TYPE",
                                    )
                                }
                                options={datasEDT_KCD_MATL_MST6_MATL_TYPE}
                                optionLabel="CD_NAME"
                                placeholder=""
                            ></Dropdown>
                        </div>
                    </span>
                    <span className="af-span-3" style={{ width: "22rem" }}>
                        <p className="af-span-p" style={{ width: "6rem" }}>Kind2</p>
                        <div className="af-span-div" style={{ width: "15rem" }}>
                            <Dropdown
                                filter
                                style={{ width: "15rem" }}
                                id="id_MATL_TYPE2"
                                value={dataEDT_KCD_MATL_MST6_MATL_TYPE2}
                                onChange={(e) =>
                                    onDropdownChangeEDT_KCD_MATL_MST6_MATL_TYPE2(
                                        e,
                                        "MATL_TYPE2",
                                    )
                                }
                                options={datasEDT_KCD_MATL_MST6_MATL_TYPE2}
                                optionLabel="MATL_TYPE2"
                                placeholder=""
                            ></Dropdown>
                        </div>
                    </span>
                </div>
                <div
                    className="af-div-first"
                    style={{ width: "85rem", height: "20rem" }}
                >
                    <AFDataTable preventUnrelatedRerender
                        ref={dt_TBL_KCD_MATL_MST6}
                        size="small"
                        value={datasTBL_KCD_MATL_MST6}
                        editMode="cell"
                        tableStyle={{ tableLayout: "fixed" }}
                        loading={loadingTBL_KCD_MATL_MST6}
                        resizableColumns
                        columnResizeMode="expand"
                        metaKeySelection={false}
                        showGridlines
                        selectionMode="multiple"
                        selection={selectedTBL_KCD_MATL_MST6}
                        onSelectionChange={(e) => {
                            const isCheckboxClick =
                                e.originalEvent.target.tagName === "INPUT" ||
                                e.originalEvent.target.classList.contains(
                                    "p-checkbox-box",
                                );

                            if (isCheckboxClick) {
                                setSelectedTBL_KCD_MATL_MST6(e.value);
                            } else {
                            }
                        }}
                        dataKey="MATL_CD"
                        className="datatable-responsive"
                        virtualScrollerOptions={{ itemSize: 20 }}
                        emptyMessage=" "
                        //header={headerTBL_KCD_MATL_MST6}
                        responsiveLayout="scroll"
                        scrollable
                        scrollHeight="20rem"
                    >
                        <AFColumn selectionMode="multiple" field="__checkbox__" reorderable={false} headerClassName="t-header" headerStyle={{ width: "3rem" }} ></AFColumn>

                        <AFColumn field="MATL_TYPE_NAME" headerClassName="t-header" header="Kind" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                        <AFColumn field="MATL_TYPE2_NAME" headerClassName="t-header" header="Kind2" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                        <AFColumn field="MATL_CD" headerClassName="t-header" header="Matl#" style={{ width: "8rem", flexBasis: "auto" }} ></AFColumn>
                        {/*<AFColumn field="MATL_TYPE" headerClassName='t-header' header="Matl Type#" style={{ width: '2rem' , flexBasis: 'auto' }}></AFColumn>*/}
                        <AFColumn field="VENDOR_NAME" headerClassName="t-header" header="Supplier" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                        <AFColumn field="MATL_NAME" headerClassName="t-header" header="Description" style={{ width: "18rem", flexBasis: "auto", color: "green", }} editor={(options) => textEditor2(options)} onCellEditComplete={ onCellEditCompleteTBL_KCD_MATL_MST6 } ></AFColumn>
                        <AFColumn field="COLOR" headerClassName="t-header" header="Color" style={{ width: "8rem", flexBasis: "auto", color: "green", }} editor={(options) => textEditor2(options)} onCellEditComplete={ onCellEditCompleteTBL_KCD_MATL_MST6 } ></AFColumn>
                        <AFColumn field="SPEC" headerClassName="t-header" header="Spec" style={{ width: "8rem", flexBasis: "auto", color: "green", }} editor={(options) => textEditor2(options)} onCellEditComplete={ onCellEditCompleteTBL_KCD_MATL_MST6 } ></AFColumn>
                        <AFColumn field="UNIT" headerClassName="t-header" header="Unit" style={{ width: "8rem", flexBasis: "auto" }} ></AFColumn>
                        <AFColumn field="MATL_PRICE" headerClassName="t-header" header="Price" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                        <AFColumn field="CURR_CD" headerClassName="t-header" header="Curr" style={{ width: "5rem", flexBasis: "auto" }} ></AFColumn>
                        <AFColumn field="S_MATL_PRICE" headerClassName="t-header" header="S/Price" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                        <AFColumn field="S_CURR_CD" headerClassName="t-header" header="S/Curr" style={{ width: "5rem", flexBasis: "auto" }} ></AFColumn>
                        <AFColumn field="WEIGHT" headerClassName="t-header" header="Weight" style={{ width: "8rem", flexBasis: "auto" }} ></AFColumn>
                        <AFColumn field="BOX_UNIT" headerClassName="t-header" header="Box" style={{ width: "8rem", flexBasis: "auto" }} ></AFColumn>
                        <AFColumn field="BOX_UNIT_NAME" headerClassName="t-header" header="Box" style={{ width: "8rem", flexBasis: "auto" }} ></AFColumn>
                        <AFColumn field="STATUS_CD" headerClassName="t-header" header="Status" style={{ width: "8rem", flexBasis: "auto" }} ></AFColumn>
                        <AFColumn field="STATUS_CD_NAME" headerClassName="t-header" header="Status" style={{ width: "8rem", flexBasis: "auto" }} ></AFColumn>
                        <AFColumn field="UPD_USER" headerClassName="t-header" header="Upd User" style={{ width: "8rem", flexBasis: "auto" }} ></AFColumn>
                        <AFColumn field="REG_USER" headerClassName="t-header" header="Reg User" style={{ width: "8rem", flexBasis: "auto" }} ></AFColumn>
                        <AFColumn field="VENDOR_TYPE" headerClassName="t-header" header="Vendor Type" style={{ width: "8rem", flexBasis: "auto" }} ></AFColumn>
                        <AFColumn field="HS_CD" headerClassName="t-header" header="Hs Cd" style={{ width: "8rem", flexBasis: "auto" }} ></AFColumn>
                        <AFColumn field="ADD_RATE" headerClassName="t-header" header="Add Rate" style={{ width: "8rem", flexBasis: "auto" }} ></AFColumn>
                        <AFColumn field="ADD_AMT" header="Add Amt" style={{ width: "8rem", flexBasis: "auto" }} ></AFColumn>
                        <AFColumn field="ADD_LOSS" headerClassName="t-header" header="Add Loss" style={{ width: "8rem", flexBasis: "auto" }} ></AFColumn>
                        <AFColumn field="REG_DATETIME" headerClassName="t-header" header="Reg Time" style={{ width: "8rem", flexBasis: "auto" }} ></AFColumn>
                        <AFColumn field="rep_matl_cd" headerClassName="t-header" header="Mom Matl#" style={{ width: "8rem", flexBasis: "auto" }} ></AFColumn>
                    </AFDataTable>
                </div>
            </Dialog>
        </div>
    );
};

const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(S0301_MATL_RECORD, comparisonFn);
