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
import { Card } from "primereact/card";

import { ServiceLib } from "../service/service_lib/ServiceLib";
import { ServiceS0208_CAPABOOK_RECORD_BVT } from "../service/service_biz/ServiceS0208_CAPABOOK_RECORD_BVT";
import { ServiceS0200_KCD_STYLE } from "../service/service_biz/ServiceS0200_KCD_STYLE";
import { ServiceS020602_ORDER_REG } from "../service/service_biz/ServiceS020602_ORDER_REG";

// import './page_common.scss';

const emptyKCD_CODE = {
    id: 0,
    CD_GROUP: "",
    CD_CODE: "",
    CD_NAME: "",
    CD_FLAG: "",
};

const emptyQRY_CAPA_ORDER2 = {
    ORDER_CD: "",
    STYLE_CD: "",
    STYLE_NAME: "",
    ORDER_CD2: "",
    STYLE_CD2: "",
};

const emptyQRY_KSV_CAPABOOK_MEM = {
    BOOK_DATE: "",
    USER_NAME: "",
    NEW_DATE: "",
    PO_CD: "",
    BUYER_CD: "",
    ORDER_CD: "",
    IS_SAMPLE: "",
    FACTORY_CD: "",
};

const emptyTBL_KSV_CAPABOOK_MEM = {
    id: 0,
    JOB_CD: "",
    IN_DATE: "",
    BUYER_NAME: "",
    BUYER_CD: "",
    PO_CD: "",
    ORDER_CD: "",
    STYLE_NAME: "",
    STYLE_CD: "",
    NR: "",
    QTY: "",
    MW: "",
    SHIP_DATE: "",
    EXF: "",
    M_ETA: "",
    ETD: "",
    FOB: "",
    EXP_CMPT: "",
    NEGO_TYPE: "",
    EMBRO: "",
    TP: "",
    SP: "",
    LTHR: "",
    G: "",
    W: "",
    S: "",
    FND: "",
    DL: "",
    TPR: "",
    EMBOSSING: "",
    WASHING: "",
    DOWN: "",
    CUT: "",
    FTP: "",
    DTP: "",
    LAZE: "",
    BVT_KIND: "",
    SEQ: "",
    REMARK: "",
};

const emptyTBL_KSV_CAPABOOK_MEM1 = {
    id: 0,
    IN_DATE: "",
    STYLE_CD: "",
    STYLE_NAME: "",
    BUYER_NAME: "",
    BUYER_CD: "",
    SHIP_DATE: "",
    JOB_CD: "",
    PO_CD: "",
    ORDER_CD: "",
    FOB: "",
    QTY: "",
    NR: "",
    REMARK: "",
    MW: "",
    SHIP_ETA: "",
    SAMPLE_ETA: "",
    MATL_ETA: "",
    EXF: "",
    M_ETA: "",
    ETD: "",
    EXP_CMPT: "",
    NEGO_TYPE: "",
    EMBRO: "",
    TP: "",
    SP: "",
    LTHR: "",
    G: "",
    W: "",
    S: "",
    FND: "",
    DL: "",
    TPR: "",
    EMBOSSING: "",
    WASHING: "",
    DOWN: "",
    CUT: "",
    FTP: "",
    DTP: "",
    LAZE: "",
    BVT_KIND: "",
    SEQ: "",
    USAGE: "",
};

const emptyTBL_KSV_CAPABOOK_MEM5 = {
    id: 0,
    IN_DATE: "",
    STYLE_CD: "",
    STYLE_NAME: "",
    BUYER_NAME: "",
    BUYER_CD: "",
    SHIP_DATE: "",
    JOB_CD: "",
    PO_CD: "",
    ORDER_CD: "",
    FOB: "",
    QTY: "",
    NR: "",
    REMARK: "",
    MW: "",
    SHIP_ETA: "",
    SAMPLE_ETA: "",
    MATL_ETA: "",
    EXF: "",
    M_ETA: "",
    ETD: "",
    EXP_CMPT: "",
    NEGO_TYPE: "",
    EMBRO: "",
    TP: "",
    SP: "",
    LTHR: "",
    G: "",
    W: "",
    S: "",
    FND: "",
    DL: "",
    TPR: "",
    EMBOSSING: "",
    WASHING: "",
    DOWN: "",
    CUT: "",
    FTP: "",
    DTP: "",
    LAZE: "",
    BVT_KIND: "",
    SEQ: "",
};

const emptyEDT_KSV_CAPABOOK_MEM = {
    IN_DATE: "",
    STYLE_CD: "",
    STYLE_NAME: "",
    BUYER_CD: "",
    BUYER_NAME: "",
    JOB_CD: "",
    PO_CD: "",
    ORDER_CD: "",
    FOB: "",
    QTY: "",
    NR: "",
    REMARK: "",
    EXF: "",
    M_ETA: "",
    ETD: "",
    APPROVAL_DATE: "",
    EXP_CMPT: "",
    EMBOSSING: "",
    WASHING: "",
    TPR: "",
    DTP: "",
    DOWN: "",
    TP: "",
    FND: "",
    W: "",
    LAZE: "",
    CUT: "",
    SP: "",
    FTP: "",
    EMBRO: "",
    LTHR: "",
    BVT_KIND: "",

    MW: "",
    DL: "",
    G: "",
    S: "",

    UNIT: "",
    PURPOSE: "",
    FABRIC: "",

    ETD: "",
    NEGO_TYPE: "",
    SEQ: "",
    BUYER_TEAM: "",
    USAGE: "",
};

const emptyTBL_QRY_CAPA_STYLE3 = {
    id: 0,
};

const emptyTBL_QRY_CAPA_ORDER3 = {
    id: 0,
};

const S0208_CAPABOOK_RECORD_BVT = () => {
    const serviceLibRef = useRef(null);
    if (!serviceLibRef.current) {
        serviceLibRef.current = new ServiceLib();
        serviceLibRef.current.loginConfirm();
    }
    const serviceLib = serviceLibRef.current;
    const serviceS0208_CAPABOOK_RECORD_BVT =
        new ServiceS0208_CAPABOOK_RECORD_BVT();
    const serviceS0200_KCD_STYLERef = useRef(null);
    if (!serviceS0200_KCD_STYLERef.current) serviceS0200_KCD_STYLERef.current = new ServiceS0200_KCD_STYLE();
    const serviceS0200_KCD_STYLE = serviceS0200_KCD_STYLERef.current;
    const serviceS020602_ORDER_REGRef = useRef(null);
    if (!serviceS020602_ORDER_REGRef.current) serviceS020602_ORDER_REGRef.current = new ServiceS020602_ORDER_REG();
    const serviceS020602_ORDER_REG = serviceS020602_ORDER_REGRef.current;

    const toast = useRef(null);

    /* */
    const [isNR, setIsNR] = useState(false);
    const [widthNR, setWidthNR] = useState({ width: "6rem" });
    const [colNR, setColNR] = useState("N/R");
    const [isSystem, setIsSystem] = useState(true);
    const [saveOrderArray, setSaveOrderArray] = useState([]);

    /* splitter 관련 */
    const [styleVal, setStyleVal] = useState({ width: "65vw" });

    const [styleSample, setStyleSample] = useState({
        width: "26rem",
        display: "none",
    });
    const set_SAMPLE_ON = () => {
        let rVal = { ...styleSample };
        rVal.display = "inline-block";
        setStyleSample(rVal);
    };
    const set_SAMPLE_OFF = () => {
        let rVal = { ...styleSample };
        rVal.display = "none";
        setStyleSample(rVal);
    };

    /*QRY KSV_CAPABOOK_MEM */

    const [dataQRY_CAPA_ORDER2, setDataQRY_CAPA_ORDER2] =
        useState(emptyQRY_CAPA_ORDER2);

    const onInputChangeQRY_CAPA_ORDER2_ORDER_CD = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_CAPA_ORDER2 = { ...dataQRY_CAPA_ORDER2 };

        let tTypeVal = _dataQRY_CAPA_ORDER2[`${name}`];
        if (typeof tTypeVal === "string") _dataQRY_CAPA_ORDER2[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_CAPA_ORDER2[`${name}`] = parseInt(val);

        setDataQRY_CAPA_ORDER2(_dataQRY_CAPA_ORDER2);
    };

    const onInputChangeQRY_CAPA_ORDER2_STYLE_CD = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_CAPA_ORDER2 = { ...dataQRY_CAPA_ORDER2 };

        let tTypeVal = _dataQRY_CAPA_ORDER2[`${name}`];
        if (typeof tTypeVal === "string") _dataQRY_CAPA_ORDER2[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_CAPA_ORDER2[`${name}`] = parseInt(val);

        setDataQRY_CAPA_ORDER2(_dataQRY_CAPA_ORDER2);
    };
    const onInputChangeQRY_CAPA_ORDER2_STYLE_NAME = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_CAPA_ORDER2 = { ...dataQRY_CAPA_ORDER2 };

        let tTypeVal = _dataQRY_CAPA_ORDER2[`${name}`];
        if (typeof tTypeVal === "string") _dataQRY_CAPA_ORDER2[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_CAPA_ORDER2[`${name}`] = parseInt(val);

        setDataQRY_CAPA_ORDER2(_dataQRY_CAPA_ORDER2);
    };

    const [dataQRY_CAPA_ORDER2_ORDER_CD2, setDataQRY_CAPA_ORDER2_ORDER_CD2] =
        useState("");

    const [dataQRY_CAPA_ORDER2_STYLE_CD2, setDataQRY_CAPA_ORDER2_STYLE_CD2] =
        useState("");

    /*QRY KSV_CAPABOOK_MEM */

    const [dataQRY_KSV_CAPABOOK_MEM, setDataQRY_KSV_CAPABOOK_MEM] = useState(
        emptyQRY_KSV_CAPABOOK_MEM,
    );

    const onInputChangeQRY_KSV_CAPABOOK_MEM_NEW_DATE = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_CAPABOOK_MEM = { ...dataQRY_KSV_CAPABOOK_MEM };

        let tTypeVal = _dataQRY_KSV_CAPABOOK_MEM[`${name}`];
        if (typeof tTypeVal === "string")
            _dataQRY_KSV_CAPABOOK_MEM[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_CAPABOOK_MEM[`${name}`] = parseInt(val);

        setDataQRY_KSV_CAPABOOK_MEM(_dataQRY_KSV_CAPABOOK_MEM);
    };

    const onInputChangeQRY_KSV_CAPABOOK_MEM_PO_CD = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_CAPABOOK_MEM = { ...dataQRY_KSV_CAPABOOK_MEM };

        let tTypeVal = _dataQRY_KSV_CAPABOOK_MEM[`${name}`];
        if (typeof tTypeVal === "string")
            _dataQRY_KSV_CAPABOOK_MEM[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_CAPABOOK_MEM[`${name}`] = parseInt(val);

        setDataQRY_KSV_CAPABOOK_MEM(_dataQRY_KSV_CAPABOOK_MEM);
    };

    const onInputChangeQRY_KSV_CAPABOOK_MEM_ORDER_CD = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_CAPABOOK_MEM = { ...dataQRY_KSV_CAPABOOK_MEM };

        let tTypeVal = _dataQRY_KSV_CAPABOOK_MEM[`${name}`];
        if (typeof tTypeVal === "string")
            _dataQRY_KSV_CAPABOOK_MEM[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_CAPABOOK_MEM[`${name}`] = parseInt(val);

        setDataQRY_KSV_CAPABOOK_MEM(_dataQRY_KSV_CAPABOOK_MEM);
    };

    const onInputChangeQRY_KSV_CAPABOOK_MEM_BUYER_CD = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_CAPABOOK_MEM = { ...dataQRY_KSV_CAPABOOK_MEM };

        let tTypeVal = _dataQRY_KSV_CAPABOOK_MEM[`${name}`];
        if (typeof tTypeVal === "string")
            _dataQRY_KSV_CAPABOOK_MEM[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_CAPABOOK_MEM[`${name}`] = parseInt(val);

        setDataQRY_KSV_CAPABOOK_MEM(_dataQRY_KSV_CAPABOOK_MEM);
    };

    const onCheckboxChangeQRY_KSV_CAPABOOK_MEM_IS_SAMPLE = (e, name) => {
        let val = "";
        let _dataQRY_KSV_CAPABOOK_MEM = { ...dataQRY_KSV_CAPABOOK_MEM };
        if (e.checked) {
            val = "1";
        } else {
            val = "0";
        }
        _dataQRY_KSV_CAPABOOK_MEM[`${name}`] = val;

        setDataQRY_KSV_CAPABOOK_MEM(_dataQRY_KSV_CAPABOOK_MEM);

        if (val === "1") {
            set_SAMPLE_ON();
            setIsNR(true);
            setWidthNR({ width: "0.5rem" });
            setColNR(" ");
        } else {
            set_SAMPLE_OFF();
            setIsNR(false);
            setWidthNR({ width: "6rem" });
            setColNR("N/R");
        }
    };

    const [
        datasQRY_KSV_CAPABOOK_MEM_FACTORY_CD,
        setDatasQRY_KSV_CAPABOOK_MEM_FACTORY_CD,
    ] = useState([]);
    const [
        dataQRY_KSV_CAPABOOK_MEM_FACTORY_CD,
        setDataQRY_KSV_CAPABOOK_MEM_FACTORY_CD,
    ] = useState({});

    const [expCmptDisable, setExpCmptDisable] = useState(true);

    const onDropdownChangeQRY_KSV_CAPABOOK_MEM_FACTORY_CD = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataQRY_KSV_CAPABOOK_MEM = { ...dataQRY_KSV_CAPABOOK_MEM };

        let tTypeVal = _dataQRY_KSV_CAPABOOK_MEM[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_CAPABOOK_MEM[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_CAPABOOK_MEM[`${name}`] = parseInt(val);
        }

        if (e.value.CD_CODE === "ETP") {
            setExpCmptDisable(false);
        } else {
            setExpCmptDisable(true);
        }

        setDataQRY_KSV_CAPABOOK_MEM(_dataQRY_KSV_CAPABOOK_MEM);
        setDataQRY_KSV_CAPABOOK_MEM_FACTORY_CD(e.value);

        var tNRCd = [];
        if (e.value.CD_CODE === "BVT") tNRCd = ["", "NEW", "VR"];
        if (e.value.CD_CODE === "ETP") tNRCd = ["", "NEW", "ER"];

        var tObjArray1 = tNRCd.map((col, i) => {
            var tObj = {};
            tObj.id = i;
            if (col === "NEW") tObj.CD_NAME = "NEW";
            else if (col === "ER") tObj.CD_NAME = "REPEAT_ETP";
            else if (col === "VR") tObj.CD_NAME = "REPEAT_BVT";
            else if (col === "") tObj.CD_NAME = " ";
            tObj.CD_CODE = col;
            tObj.CD_GROUP = "NR_TYPEY";
            return tObj;
        });
        setDatasEDT_KSV_CAPABOOK_MEM_NR(tObjArray1);
        setDataEDT_KSV_CAPABOOK_MEM_NR(tObjArray1[0]);
    };

    const [
        datasQRY_KSV_CAPABOOK_MEM_USER_NAME,
        setDatasQRY_KSV_CAPABOOK_MEM_USER_NAME,
    ] = useState([]);
    const [
        dataQRY_KSV_CAPABOOK_MEM_USER_NAME,
        setDataQRY_KSV_CAPABOOK_MEM_USER_NAME,
    ] = useState({});

    const onDropdownChangeQRY_KSV_CAPABOOK_MEM_USER_NAME = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataQRY_KSV_CAPABOOK_MEM = { ...dataQRY_KSV_CAPABOOK_MEM };

        let tTypeVal = _dataQRY_KSV_CAPABOOK_MEM[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_CAPABOOK_MEM[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_CAPABOOK_MEM[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_CAPABOOK_MEM(_dataQRY_KSV_CAPABOOK_MEM);
        setDataQRY_KSV_CAPABOOK_MEM_USER_NAME(e.value);

        resetEDT_KSV_CAPABOOK_MEM();
    };

    /*TABLE KSV_CAPABOOK_MEM */
    // DEFINE DATAGRID : TBL_KSV_CAPABOOK_MEM
    const [dataCAPABOOK_DATE, setDataCAPABOOK_DATE] = useState({});

    const [datasTBL_KSV_CAPABOOK_MEM, setDatasTBL_KSV_CAPABOOK_MEM] = useState(
        [],
    );
    const dt_TBL_KSV_CAPABOOK_MEM = useRef(null);
    const [dataTBL_KSV_CAPABOOK_MEM, setDataTBL_KSV_CAPABOOK_MEM] = useState(
        emptyTBL_KSV_CAPABOOK_MEM,
    );
    const [selectedTBL_KSV_CAPABOOK_MEM, setSelectedTBL_KSV_CAPABOOK_MEM] =
        useState([]);
    const [
        flagSelectModeTBL_KSV_CAPABOOK_MEM,
        setFlagSelectModeTBL_KSV_CAPABOOK_MEM,
    ] = useState(false);
    const [loadingTBL_KSV_CAPABOOK_MEM, setLoadingTBL_KSV_CAPABOOK_MEM] =
        useState(false);

    // DATAGRID CODE : TBL_KSV_CAPABOOK_MEM

    const search_LIST_1 = (argData, argOpMode) => {
        if (dataQRY_KSV_CAPABOOK_MEM.USER_NAME === "") {
            alert("Team 아이디를 선택하세요<br><br>Please select your Team ID");
            return;
        }

        if (dataQRY_KSV_CAPABOOK_MEM.FACTORY_CD === "") {
            alert("Factory는 반드시 선택되어야 합니다<br><br>Factory must be selected");
            return;
        }

        clearSelectedTBL_KSV_CAPABOOK_MEM();
        setSelectedTBL_KSV_CAPABOOK_MEM([]);
        setSelectedTBL_KSV_CAPABOOK_MEM1([]);

        var _tUserId = dataQRY_KSV_CAPABOOK_MEM_USER_NAME.CD_CODE;
        setDataQRY_KSV_CAPABOOK_MEM({
            ...dataQRY_KSV_CAPABOOK_MEM,
            USER_NAME: _tUserId,
        });
        console.log(_tUserId);

        serviceS0208_CAPABOOK_RECORD_BVT
            .mgrQueryCAPABOOK_DATE(_tUserId)
            .then((data) => {
                if (typeof data.graphQLErrors === "undefined") {
                    setDataCAPABOOK_DATE(data);

                    var _dataQRY_KSV_CAPABOOK_MEM = {
                        ...dataQRY_KSV_CAPABOOK_MEM,
                    };

                    if (
                        dataQRY_KSV_CAPABOOK_MEM.FACTORY_CD === "BVT" &&
                        dataQRY_KSV_CAPABOOK_MEM.IS_SAMPLE !== "1"
                    ) {
                        _dataQRY_KSV_CAPABOOK_MEM.BOOK_DATE =
                            data.BOOK_DATE_BVT;
                        _dataQRY_KSV_CAPABOOK_MEM.NEW_DATE = data.NEW_DATE_BVT;
                    }
                    if (
                        dataQRY_KSV_CAPABOOK_MEM.FACTORY_CD === "BVT" &&
                        dataQRY_KSV_CAPABOOK_MEM.IS_SAMPLE === "1"
                    ) {
                        _dataQRY_KSV_CAPABOOK_MEM.BOOK_DATE =
                            data.BOOK_DATE_SAMPLE_BVT;
                        _dataQRY_KSV_CAPABOOK_MEM.NEW_DATE =
                            data.NEW_DATE_SAMPLE_BVT;
                    }
                    if (
                        dataQRY_KSV_CAPABOOK_MEM.FACTORY_CD === "ETP" &&
                        dataQRY_KSV_CAPABOOK_MEM.IS_SAMPLE !== "1"
                    ) {
                        _dataQRY_KSV_CAPABOOK_MEM.BOOK_DATE =
                            data.BOOK_DATE_ETP;
                        _dataQRY_KSV_CAPABOOK_MEM.NEW_DATE = data.NEW_DATE_ETP;
                    }
                    if (
                        dataQRY_KSV_CAPABOOK_MEM.FACTORY_CD === "ETP" &&
                        dataQRY_KSV_CAPABOOK_MEM.IS_SAMPLE === "1"
                    ) {
                        _dataQRY_KSV_CAPABOOK_MEM.BOOK_DATE =
                            data.BOOK_DATE_SAMPLE_ETP;
                        _dataQRY_KSV_CAPABOOK_MEM.NEW_DATE =
                            data.NEW_DATE_SAMPLE_ETP;
                    }
                    setDataQRY_KSV_CAPABOOK_MEM(_dataQRY_KSV_CAPABOOK_MEM);

                    console.log(data);

                    let _tQryObj = {};
                    _tQryObj.FACTORY_CD = _dataQRY_KSV_CAPABOOK_MEM.FACTORY_CD; // FC034 : BVT, FC044 : ETP
                    _tQryObj.IS_SAMPLE = _dataQRY_KSV_CAPABOOK_MEM.IS_SAMPLE;
                    _tQryObj.PO_CD = _dataQRY_KSV_CAPABOOK_MEM.PO_CD;
                    _tQryObj.BUYER_CD = _dataQRY_KSV_CAPABOOK_MEM.BUYER_CD;
                    _tQryObj.BOOK_DATE = _dataQRY_KSV_CAPABOOK_MEM.BOOK_DATE;
                    _tQryObj.NEW_DATE = _dataQRY_KSV_CAPABOOK_MEM.NEW_DATE;
                    _tQryObj.USER_NAME = _dataQRY_KSV_CAPABOOK_MEM.USER_NAME;
                    _tQryObj.ORDER_CD = _dataQRY_KSV_CAPABOOK_MEM.ORDER_CD;

                    setDatasTBL_KSV_CAPABOOK_MEM([]);

                    serviceS0208_CAPABOOK_RECORD_BVT
                        .mgrQueryTBL_KSV_CAPABOOK_MEM(_tQryObj)
                        .then((data) => {
                            if (typeof data.graphQLErrors === "undefined") {
                                var _tObj = { ...dataQRY_KSV_CAPABOOK_MEM };
                                _tObj.BOOK_DATE = _tQryObj.BOOK_DATE;
                                _tObj.NEW_DATE = _tQryObj.NEW_DATE;
                                _tObj.PO_CD = _tQryObj.PO_CD;
                                _tObj.BUYER_CD = _tQryObj.BUYER_CD;
                                _tObj.USER_NAME = _tQryObj.USER_NAME;
                                setDataQRY_KSV_CAPABOOK_MEM(_tObj);

                                var tArray = [];
                                data.forEach((col, i) => {
                                    var tObj = { ...col };
                                    tObj.id = i + 1;
                                    tArray.push(tObj);
                                });

                                setDatasTBL_KSV_CAPABOOK_MEM(tArray);
                                console.log(
                                    "serviceS0208_CAPABOOK_RECORD_BVT.mgrQueryTBL_KSV_CAPABOOK_MEM call(1) => " +
                                        data.length,
                                );
                            } else {
                                console.log(
                                    "serviceS0208_CAPABOOK_RECORD_BVT.mgrQueryTBL_KSV_CAPABOOK_MEM error => " +
                                        JSON.stringify(data.graphQLErrors),
                                );
                            }
                        });

                    let _tQryObj1 = {};
                    _tQryObj1.FACTORY_CD = _dataQRY_KSV_CAPABOOK_MEM.FACTORY_CD; // FC034 : BVT, FC044 : ETP
                    _tQryObj1.IS_SAMPLE = _dataQRY_KSV_CAPABOOK_MEM.IS_SAMPLE;
                    _tQryObj1.PO_CD = _dataQRY_KSV_CAPABOOK_MEM.PO_CD;
                    _tQryObj1.BUYER_CD = _dataQRY_KSV_CAPABOOK_MEM.BUYER_CD;
                    _tQryObj1.BOOK_DATE = _dataQRY_KSV_CAPABOOK_MEM.NEW_DATE;
                    _tQryObj1.NEW_DATE = _dataQRY_KSV_CAPABOOK_MEM.NEW_DATE;
                    _tQryObj1.USER_NAME = _dataQRY_KSV_CAPABOOK_MEM.USER_NAME;
                    _tQryObj1.ORDER_CD = _dataQRY_KSV_CAPABOOK_MEM.ORDER_CD;

                    setDatasTBL_KSV_CAPABOOK_MEM1([]);
                    setLoadingTBL_KSV_CAPABOOK_MEM1(true);

                    serviceS0208_CAPABOOK_RECORD_BVT
                        .mgrQueryTBL_KSV_CAPABOOK_MEM(_tQryObj1)
                        .then((data) => {
                            setLoadingTBL_KSV_CAPABOOK_MEM1(false);
                            if (typeof data.graphQLErrors === "undefined") {
                                var tArray = [];
                                var tSelObj = {};
                                data.forEach((col, i) => {
                                    var tObj = { ...col };
                                    tObj.id = i + 1;
                                    if (
                                        typeof argData !== "undefined" &&
                                        typeof argData.ORDER_CD !== "undefined"
                                    ) {
                                        if (argData.ORDER_CD === tObj.ORDER_CD)
                                            tSelObj = { ...tObj };
                                    }
                                    tArray.push(tObj);
                                });
                                setDatasTBL_KSV_CAPABOOK_MEM1(tArray);
                                if (
                                    typeof argData !== "undefined" &&
                                    typeof argData.ORDER_CD !== "undefined"
                                ) {
                                    if (
                                        typeof tSelObj.ORDER_CD !== "undefined"
                                    ) {
                                        setDataTBL_KSV_CAPABOOK_MEM1(tSelObj);
                                        var tArray1 = [];
                                        tArray1.push(tSelObj);
                                        // setSelectedTBL_KSV_CAPABOOK_MEM1(tArray1);

                                        console.log(tSelObj);

                                        setClickedRowId(tSelObj.id);

                                        onRowClick1TBL_KSV_CAPABOOK_MEM1(
                                            tSelObj,
                                        );
                                    } else {
                                        setDataEDT_KSV_CAPABOOK_MEM(
                                            emptyEDT_KSV_CAPABOOK_MEM,
                                        );
                                    }
                                } else {
                                    if (typeof argOpMode !== "undefined");
                                    else
                                        setDataEDT_KSV_CAPABOOK_MEM(
                                            emptyEDT_KSV_CAPABOOK_MEM,
                                        );
                                }

                                console.log(
                                    "serviceS0208_CAPABOOK_RECORD_BVT.mgrQueryTBL_KSV_CAPABOOK_MEM call(1) => " +
                                        data.length,
                                );
                            } else {
                                console.log(
                                    "serviceS0208_CAPABOOK_RECORD_BVT.mgrQueryTBL_KSV_CAPABOOK_MEM error => " +
                                        JSON.stringify(data.graphQLErrors),
                                );
                            }
                        });
                } else {
                    toast.current.show({
                        severity: "success",
                        summary: "Query Error",
                        detail: "Error",
                        life: 3000,
                    });
                }
            });

        // Service : NawooAll:mgrQueryTBL_KSV_CAPABOOK_MEM
    };

    const clearSelectedTBL_KSV_CAPABOOK_MEM = () => {
        setSelectedTBL_KSV_CAPABOOK_MEM([]);
        setFlagSelectModeTBL_KSV_CAPABOOK_MEM(false);
    };

    const exportExcelTBL_KSV_CAPABOOK_MEM = () => {
        import("xlsx").then((xlsx) => {
            const worksheet = xlsx.utils.json_to_sheet(
                datasTBL_KSV_CAPABOOK_MEM1,
            );
            const workbook = {
                Sheets: { data: worksheet },
                SheetNames: ["data"],
            };
            const excelBuffer = xlsx.write(workbook, {
                bookType: "xlsx",
                type: "array",
            });
            saveAsExcelFileTBL_KSV_CAPABOOK_MEM(excelBuffer, "CapaList");
        });
    };

    const saveAsExcelFileTBL_KSV_CAPABOOK_MEM = (buffer, fileName) => {
        import("file-saver").then((module) => {
            if (module && module.default) {
                let EXCEL_TYPE =
                    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
                let EXCEL_EXTENSION = ".xlsx";
                const data = new Blob([buffer], {
                    type: EXCEL_TYPE,
                });
                module.default.saveAs(
                    data,
                    fileName +
                        "_export_" +
                        new Date().getTime() +
                        EXCEL_EXTENSION,
                );
            }
        });
    };

    /**TABLE KSV_CAPABOOK_MEM1 */
    // DEFINE DATAGRID : TBL_KSV_CAPABOOK_MEM1
    const [datasTBL_KSV_CAPABOOK_MEM1, setDatasTBL_KSV_CAPABOOK_MEM1] =
        useState([]);
    const dt_TBL_KSV_CAPABOOK_MEM1 = useRef(null);
    const [dataTBL_KSV_CAPABOOK_MEM1, setDataTBL_KSV_CAPABOOK_MEM1] = useState(
        emptyTBL_KSV_CAPABOOK_MEM1,
    );
    const [selectedTBL_KSV_CAPABOOK_MEM1, setSelectedTBL_KSV_CAPABOOK_MEM1] =
        useState([]);
    const [
        flagSelectModeTBL_KSV_CAPABOOK_MEM1,
        setFlagSelectModeTBL_KSV_CAPABOOK_MEM1,
    ] = useState(false);

    const [loadingTBL_KSV_CAPABOOK_MEM1, setLoadingTBL_KSV_CAPABOOK_MEM1] =
        useState(false);

    // DATAGRID CODE : TBL_KSV_CAPABOOK_MEM1

    const editTBL_KSV_CAPABOOK_MEM1 = (argData) => {
        if (typeof argData !== "undefined")
            datasetEDT_KSV_CAPABOOK_MEM(argData);
    };

    const onRowClick1TBL_KSV_CAPABOOK_MEM1 = (argData0) => {
        var argData = {};

        if (typeof argData0.length !== "undefined") {
            argData = argData0[argData0.length - 1];
        } else {
            argData = argData0;
        }

        let argTBL_KSV_CAPABOOK_MEM1 = argData;
        editTBL_KSV_CAPABOOK_MEM1(argTBL_KSV_CAPABOOK_MEM1);
        setDataTBL_KSV_CAPABOOK_MEM1(argTBL_KSV_CAPABOOK_MEM1);
    };

    const onRowClickTBL_KSV_CAPABOOK_MEM1 = (event) => {
        setClickedRowId(event.data.id);

        if (typeof event.data.ORDER_CD === "undefined") return;

        var argData = { ...event.data };

        let argTBL_KSV_CAPABOOK_MEM1 = { ...argData };
        editTBL_KSV_CAPABOOK_MEM1(argTBL_KSV_CAPABOOK_MEM1);
        setDataTBL_KSV_CAPABOOK_MEM1(argTBL_KSV_CAPABOOK_MEM1);

        //var tArray = [];
        //tArray.push(argTBL_KSV_CAPABOOK_MEM1);
        //setSelectedTBL_KSV_CAPABOOK_MEM1(tArray);

        // let argTBL_KSV_CAPABOOK_MEM1 = event.data;
        // if (flagSelectModeTBL_KSV_CAPABOOK_MEM1) return;
        // Service : NawooAll:mgrQueryTBL_KSV_CAPABOOK_MEM1
    };

    // TBL_KSV_CAPABOOK_MEM5
    const [datasTBL_KSV_CAPABOOK_MEM5, setDatasTBL_KSV_CAPABOOK_MEM5] =
        useState([]);
    const dt_TBL_KSV_CAPABOOK_MEM5 = useRef(null);
    const [dataTBL_KSV_CAPABOOK_MEM5, setDataTBL_KSV_CAPABOOK_MEM5] = useState(
        emptyTBL_KSV_CAPABOOK_MEM5,
    );
    const [selectedTBL_KSV_CAPABOOK_MEM5, setSelectedTBL_KSV_CAPABOOK_MEM5] =
        useState([]);
    const [
        flagSelectModeTBL_KSV_CAPABOOK_MEM5,
        setFlagSelectModeTBL_KSV_CAPABOOK_MEM5,
    ] = useState(false);

    const [loadingTBL_KSV_CAPABOOK_MEM5, setLoadingTBL_KSV_CAPABOOK_MEM5] =
        useState(false);

    // DATAGRID CODE : TBL_KSV_CAPABOOK_MEM5

    const editTBL_KSV_CAPABOOK_MEM5 = (argData) => {
        if (typeof argData !== "undefined")
            datasetEDT_KSV_CAPABOOK_MEM(argData);
    };

    const onRowClick1TBL_KSV_CAPABOOK_MEM5 = (argData0) => {
        var argData = {};

        if (typeof argData0.length !== "undefined") {
            argData = argData0[argData0.length - 1];
        } else {
            argData = argData0;
        }

        let argTBL_KSV_CAPABOOK_MEM5 = argData;
        editTBL_KSV_CAPABOOK_MEM5(argTBL_KSV_CAPABOOK_MEM5);
        setDataTBL_KSV_CAPABOOK_MEM5(argTBL_KSV_CAPABOOK_MEM5);
    };

    const onRowClickTBL_KSV_CAPABOOK_MEM5 = (event) => {
        setClickedRowId(event.data.id);
        setClickedRow(event.data);

        if (typeof event.data.ORDER_CD === "undefined") return;

        var argData = { ...event.data };

        let argTBL_KSV_CAPABOOK_MEM5 = { ...argData };
        editTBL_KSV_CAPABOOK_MEM5(argTBL_KSV_CAPABOOK_MEM5);
        setDataTBL_KSV_CAPABOOK_MEM5(argTBL_KSV_CAPABOOK_MEM5);

        //var tArray = [];
        //tArray.push(argTBL_KSV_CAPABOOK_MEM5);
        //setSelectedTBL_KSV_CAPABOOK_MEM5(tArray);

        // let argTBL_KSV_CAPABOOK_MEM5 = event.data;
        // if (flagSelectModeTBL_KSV_CAPABOOK_MEM5) return;
        // Service : NawooAll:mgrQueryTBL_KSV_CAPABOOK_MEM5
    };

    /**EDIT KSV_CAPABOOK_MEM */

    const [datasEDT_KSV_CAPABOOK_MEM, setDatasEDT_KSV_CAPABOOK_MEM] = useState(
        [],
    );
    const [dataEDT_KSV_CAPABOOK_MEM, setDataEDT_KSV_CAPABOOK_MEM] = useState(
        emptyEDT_KSV_CAPABOOK_MEM,
    );

    const datasetEDT_KSV_CAPABOOK_MEM = (argData) => {
        var _argData = { ...dataEDT_KSV_CAPABOOK_MEM };
        _argData.IN_DATE = argData.IN_DATE;
        _argData.STYLE_CD = argData.STYLE_CD;
        _argData.STYLE_NAME = argData.STYLE_NAME;
        _argData.BUYER_NAME = argData.BUYER_NAME;
        _argData.BUYER_CD = argData.BUYER_CD;
        _argData.JOB_CD = argData.JOB_CD;
        _argData.PO_CD = argData.PO_CD;
        _argData.ORDER_CD = argData.ORDER_CD;
        _argData.FOB = argData.FOB;
        _argData.QTY = argData.QTY;
        _argData.NR = argData.NR;
        _argData.REMARK = argData.REMARK;
        _argData.MW = argData.MW;

        _argData.APPROVAL_DATE = argData.S_ETA;
        _argData.M_ETA = argData.M_ETA;
        _argData.EXF = argData.EXF;
        _argData.ETD = argData.SD;
        _argData.EXP_CMPT = argData.EXP_CMPT;
        _argData.BVT_KIND = argData.BVT_KIND;
        _argData.TPR = argData.TPR;
        _argData.EMBOSSING = argData.EMBOSSING;
        _argData.WASHING = argData.WASHING;
        _argData.DL = argData.DL;
        _argData.S = argData.S;
        _argData.FND = argData.FND;
        _argData.DOWN = argData.DOWN;
        _argData.CUT = argData.CUT;
        _argData.EMBRO = argData.EMBRO;
        _argData.TP = argData.TP;
        _argData.SP = argData.SP;
        _argData.LTHR = argData.LTHR;
        _argData.G = argData.G;
        _argData.W = argData.W;
        _argData.FTP = argData.FTP;
        _argData.DTP = argData.DTP;
        _argData.ETD = argData.ETD;
        _argData.NEGO_TYPE = argData.NEGO_TYPE;
        _argData.LAZE = argData.LAZE;
        _argData.USAGE = argData.USAGE;
        _argData.SEQ = argData.SEQ;

        setDataEDT_KSV_CAPABOOK_MEM(_argData);

        editEDT_KSV_CAPABOOK_MEM_NR(_argData.NR);
        editEDT_KSV_CAPABOOK_MEM_BVT_KIND(_argData.BVT_KIND);

        // editEDT_KSV_CAPABOOK_MEM_STATUS_CD(_argData.STATUS_CD);
        // editEDT_KSV_CAPABOOK_MEM_BUYER_CD(_argData.BUYER_CD);
        // editEDT_KSV_CAPABOOK_MEM_KIND(_argData.KIND);
        editEDT_KSV_CAPABOOK_MEM_DL(_argData.DL);
        editEDT_KSV_CAPABOOK_MEM_MW(_argData.MW);
        editEDT_KSV_CAPABOOK_MEM_EMBRO(_argData.EMBRO);
        editEDT_KSV_CAPABOOK_MEM_SP(_argData.SP);
        editEDT_KSV_CAPABOOK_MEM_TP(_argData.TP);
        editEDT_KSV_CAPABOOK_MEM_LTHR(_argData.LTHR);
        editEDT_KSV_CAPABOOK_MEM_G(_argData.G);
        editEDT_KSV_CAPABOOK_MEM_W(_argData.W);
        editEDT_KSV_CAPABOOK_MEM_LAZE(_argData.LAZE);
        editEDT_KSV_CAPABOOK_MEM_S(_argData.S);
        editEDT_KSV_CAPABOOK_MEM_FND(_argData.FND);
        editEDT_KSV_CAPABOOK_MEM_EMBOSSING(_argData.EMBOSSING);
        editEDT_KSV_CAPABOOK_MEM_WASHING(_argData.WASHING);
        editEDT_KSV_CAPABOOK_MEM_CUT(_argData.CUT);
        editEDT_KSV_CAPABOOK_MEM_FTP(_argData.FTP);
        editEDT_KSV_CAPABOOK_MEM_DTP(_argData.DTP);
        editEDT_KSV_CAPABOOK_MEM_DOWN(_argData.DOWN);
        editEDT_KSV_CAPABOOK_MEM_UNIT(_argData.STYLE_UNIT);
        editEDT_KSV_CAPABOOK_MEM_PURPOSE(_argData.PURPOSE);
        editEDT_KSV_CAPABOOK_MEM_FABRIC(_argData.FABRIC);
        editEDT_KSV_CAPABOOK_MEM_USAGE(_argData.USAGE);
    };

    const resetEDT_KSV_CAPABOOK_MEM = () => {
        setSelectedTBL_KSV_CAPABOOK_MEM1([]);
        setDataTBL_KSV_CAPABOOK_MEM1(emptyTBL_KSV_CAPABOOK_MEM1);
        datasetEDT_KSV_CAPABOOK_MEM(emptyTBL_KSV_CAPABOOK_MEM1);

        // clearSelectedKCD_STYLE();
    };

    const insertCancel = async () => {
        if (selectedTBL_KSV_CAPABOOK_MEM1.length > 1) {
            if (!(await confirm("모두 삭제하시겠습니까?<br><br>Are you sure you want to delete all?"))) {
                return;
            }
        }

        var _selArray = [];
        if (selectedTBL_KSV_CAPABOOK_MEM1.length <= 0) {
            _selArray.push(dataTBL_KSV_CAPABOOK_MEM1);
        } else {
            _selArray = [...selectedTBL_KSV_CAPABOOK_MEM1];
        }
        var tCheck = 0;
        _selArray.forEach((col, i) => {
            if (col.JOB_CD !== "I") tCheck = 1;
        });
        if (_selArray.length <= 0) {
            alert(`작업할 데이타를 선택하십시요<br><br>Select the data you want to work with`);
            return;
        }

        if (tCheck === 1) {
            alert("Job(I) 만 Cancel 가능합니다<br><br>Only Job(I) can be canceled");
            return;
        }

        if (dataEDT_KSV_CAPABOOK_MEM.ORDER_CD === "") {
            alert("선택된 데이타가 없습니다<br><br>No data selected");
            return;
        }
        saveEDT_KSV_CAPABOOK_MEM_CANCEL("I");
    };
    const updateCAPA = (argKind) => {
        var _selArray = [];
        if (typeof argKind !== "undefined" && argKind === "SEL_UPDATE") {
            _selArray = [...datasTBL_KSV_CAPABOOK_MEM5];
        } else {
            if (selectedTBL_KSV_CAPABOOK_MEM1.length <= 0) {
                var tObj = { ...dataTBL_KSV_CAPABOOK_MEM1 };
                _selArray.push(tObj);
            } else {
                _selArray = [...selectedTBL_KSV_CAPABOOK_MEM1];
            }
        }

        var tCheck = 0;
        _selArray.forEach((col, i) => {
            if (
                col.JOB_CD !== "0" &&
                col.JOB_CD !== "I" &&
                col.JOB_CD !== "U"
            ) {
                alert(`${col.JOB_CD}:${col.ORDER_CD}`);
                tCheck = 1;
            }
        });
        if (_selArray.length <= 0) {
            alert(`작업할 데이타를 선택하십시요<br><br>Select the data you want to work with`);
            return;
        }
        if (tCheck === 1) {
            alert(`Job(I,O,U) 만 Update 가능합니다<br><br>Only Job(I,O,U) can be updated`);
            return;
        }

        /*
        if (selectedTBL_KSV_CAPABOOK_MEM1.length > 1) {
            var nRet = confirm(
                `You're about to update ${selectedTBL_KSV_CAPABOOK_MEM1.length} data points. Do you wish to proceed(UPDATE)? `,
            );
            if (!nRet) return;
        }
        */

        saveEDT_KSV_CAPABOOK_MEM_UPDATE("U");
    };
    const updateCancel = () => {
        var _selArray = [];
        if (selectedTBL_KSV_CAPABOOK_MEM1.length <= 0) {
            _selArray.push(dataTBL_KSV_CAPABOOK_MEM1);
        } else {
            _selArray = [...selectedTBL_KSV_CAPABOOK_MEM1];
        }
        var tCheck = 0;
        _selArray.forEach((col, i) => {
            if (col.JOB_CD !== "U" && col.JOB_CD !== "0") tCheck = 1;
        });
        if (_selArray.length <= 0) {
            alert(`작업할 데이타를 선택하십시요<br><br>Select the data you want to work with`);
            return;
        }
        if (tCheck === 1) {
            alert("Job(O,U) 만 Update 가능합니다<br><br>Only Job(O,U) can be updated");
            return;
        }
        saveEDT_KSV_CAPABOOK_MEM_CANCEL("U");
    };
    const deleteCAPA = () => {
        var _selArray = [];
        if (selectedTBL_KSV_CAPABOOK_MEM1.length <= 0) {
            _selArray.push(dataTBL_KSV_CAPABOOK_MEM1);
        } else {
            _selArray = [...selectedTBL_KSV_CAPABOOK_MEM1];
        }
        var tCheck = 0;
        _selArray.forEach((col, i) => {
            if (col.JOB_CD === "D" || col.JOB_CD === "I" || col.JOB_CD === "E")
                tCheck = 1;
        });
        if (_selArray.length <= 0) {
            alert(`작업할 데이타를 선택하십시요<br><br>Select the data you want to work with`);
            return;
        }
        if (tCheck === 1) {
            alert("Job(I, D, E) 는 Delete할수 없습니다<br><br>Job(I, D, E) cannot be deleted");
            return;
        }

        if (selectedTBL_KSV_CAPABOOK_MEM1.length > 1) {
            var nRet = confirm(
                `You're about to Delete ${selectedTBL_KSV_CAPABOOK_MEM1.length} data points. Do you wish to proceed(DELETE)? `,
            );
            if (!nRet) return;
        }

        saveEDT_KSV_CAPABOOK_MEM_UPDATE("D");
    };
    const deleteCancel = () => {
        var _selArray = [];
        if (selectedTBL_KSV_CAPABOOK_MEM1.length <= 0) {
            _selArray.push(dataTBL_KSV_CAPABOOK_MEM1);
        } else {
            _selArray = [...selectedTBL_KSV_CAPABOOK_MEM1];
        }
        var tCheck = 0;
        _selArray.forEach((col, i) => {
            if (col.JOB_CD !== "D") tCheck = 1;
        });
        if (_selArray.length <= 0) {
            alert(`작업할 데이타를 선택하십시요<br><br>Select the data you want to work with`);
            return;
        }
        if (tCheck === 1) {
            alert("Job(D) 만 Cancel 가능합니다<br><br>Only Job(D) can be canceled");
            return;
        }
        saveEDT_KSV_CAPABOOK_MEM_CANCEL("D");
    };
    const endCAPA = () => {
        var _selArray = [];
        if (selectedTBL_KSV_CAPABOOK_MEM1.length <= 0) {
            _selArray.push(dataTBL_KSV_CAPABOOK_MEM1);
        } else {
            _selArray = [...selectedTBL_KSV_CAPABOOK_MEM1];
        }
        var tCheck = 0;
        _selArray.forEach((col, i) => {
            if (col.JOB_CD === "D" || col.JOB_CD === "E") tCheck = 1;
            if (col.JOB_CD === "I") tCheck = 2;
        });
        if (_selArray.length <= 0) {
            alert(`작업할 데이타를 선택하십시요<br><br>Select the data you want to work with`);
            return;
        }
        if (tCheck === 1) {
            alert("Job(D, E) 는 End할수 없습니다<br><br>Job(D, E) cannot be ended");
            return;
        }
        if (tCheck === 2) {
            alert("Job(I) 는 End할수 없습니다<br><br>Job(I) cannot be ended");
            return;
        }

        if (selectedTBL_KSV_CAPABOOK_MEM1.length > 1) {
            var nRet = confirm(
                `You're about to END ${selectedTBL_KSV_CAPABOOK_MEM1.length} data points. Do you wish to proceed(END)? `,
            );
            if (!nRet) return;
        }

        saveEDT_KSV_CAPABOOK_MEM_UPDATE("E");
    };
    const endCancel = () => {
        var _selArray = [];
        if (selectedTBL_KSV_CAPABOOK_MEM1.length <= 0) {
            _selArray.push(dataTBL_KSV_CAPABOOK_MEM1);
        } else {
            _selArray = [...selectedTBL_KSV_CAPABOOK_MEM1];
        }
        var tCheck = 0;
        _selArray.forEach((col, i) => {
            if (col.JOB_CD !== "E") tCheck = 1;
        });
        if (_selArray.length <= 0) {
            alert(`작업할 데이타를 선택하십시요<br><br>Select the data you want to work with`);
            return;
        }
        if (tCheck === 1) {
            alert("Job(E) 만 Cancel 가능합니다<br><br>Only Job(E) can be canceled");
            return;
        }
        saveEDT_KSV_CAPABOOK_MEM_CANCEL("E");
    };

    const saveEDT_KSV_CAPABOOK_MEM_UPDATE = (argKind) => {
        let _datasTBL_KSV_CAPABOOK_MEM1 = [...datasTBL_KSV_CAPABOOK_MEM1];
        let _dataTBL_KSV_CAPABOOK_MEM1 = { ...dataTBL_KSV_CAPABOOK_MEM1 };

        if (typeof _dataTBL_KSV_CAPABOOK_MEM1.__typename !== "undefined")
            delete _dataTBL_KSV_CAPABOOK_MEM1.__typename;

        var tEDT = { ...dataEDT_KSV_CAPABOOK_MEM };

        var tInObj = {};
        tInObj.JOB_CD = argKind;
        tInObj.REMARK = tEDT.REMARK;
        tInObj.NR = tEDT.NR;
        tInObj.EXF = tEDT.EXF;
        tInObj.M_ETA = tEDT.M_ETA;
        tInObj.APPROVAL_DATE = tEDT.APPROVAL_DATE;
        tInObj.BOOK_DATE = dataQRY_KSV_CAPABOOK_MEM.NEW_DATE;
        tInObj.FACTORY_CD = dataQRY_KSV_CAPABOOK_MEM.FACTORY_CD;
        tInObj.IS_SAMPLE = dataQRY_KSV_CAPABOOK_MEM.IS_SAMPLE;
        tInObj.USER_NAME = dataQRY_KSV_CAPABOOK_MEM.USER_NAME;
        tInObj.USAGE = tEDT.USAGE;
        tInObj.EXP_CMPT = tEDT.EXP_CMPT;
        tInObj.PO_CD = tEDT.PO_CD;
        tInObj.QTY = String(tEDT.QTY);
        tInObj.FOB = String(tEDT.FOB);

        var tInObjs = [];

        selectedTBL_KSV_CAPABOOK_MEM1.forEach((col, i) => {
            var tObj = {};
            tObj.ORDER_CD = col.ORDER_CD;
            tInObjs.push(tObj);
        });
        if (tInObjs.length <= 0) {
            if (!_dataTBL_KSV_CAPABOOK_MEM1.ORDER_CD);
            else {
                var tObj = {};
                tObj.ORDER_CD = _dataTBL_KSV_CAPABOOK_MEM1.ORDER_CD;
                tInObjs.push(tObj);
            }
        }
        if (tInObjs.length <= 0) {
            alert(
                `작업할 데이타를 선택하세요.(${_dataTBL_KSV_CAPABOOK_MEM1.ORDER_CD})`,
            );
            return;
        }

        if (argKind === "U") {
            if (tInObjs.length > 1 && !isSelUpdate) {
                alert("여러개 업데이터는 Sel Update 기능을 이용해 주세요<br><br>For multiple updaters, please use the Sel Update function.");
                return;
            }
        }

        setLoadingTBL_KSV_CAPABOOK_MEM1(true);
        serviceS0208_CAPABOOK_RECORD_BVT
            .mgrUpdateEDT_KSV_CAPABOOK_MEM(tInObj, tInObjs)
            .then((data) => {
                setLoadingTBL_KSV_CAPABOOK_MEM1(false);
                if (typeof data.graphQLErrors === "undefined") {
                    if (data.length > 0) {
                        alert(data[0].CODE);
                        if (data[0].CODE.includes("SUCC")) {
                            search_LIST_1(tEDT);
                            // setDataEDT_KSV_CAPABOOK_MEM(emptyEDT_KSV_CAPABOOK_MEM);
                        } else {
                            setDataEDT_KSV_CAPABOOK_MEM(
                                emptyEDT_KSV_CAPABOOK_MEM,
                            );
                        }
                    }
                    console.log(
                        "ServiceS0208_CAPABOOK_RECORD_BVT.mgrUpdateEDT_KSV_CAPABOOK_MEM() call => " +
                            data.length,
                    );
                    if (isSelUpdate) hideDialogSelUpdate();
                    // Search
                } else {
                    // var tStr = data.graphQLErrors[0].message;
                    console.log(
                        "ServiceNawooAll.mgrUpdateS0208_CAPABOOK_RECORD_BVT( error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });
    };

    const process_CAPA_REFRESH = () => {
        var tInObj = {};
        tInObj.IS_SAMPLE = dataQRY_KSV_CAPABOOK_MEM.IS_SAMPLE;
        tInObj.FACTORY_CD = dataQRY_KSV_CAPABOOK_MEM.FACTORY_CD;

        var tInObjs = [];
        selectedTBL_KSV_CAPABOOK_MEM1.forEach((col, i) => {
            var tObj = {};
            tObj.ORDER_CD = col.ORDER_CD;
            tInObjs.push(tObj);
        });
        if (tInObjs.length <= 0) {
            alert("작업할 데이터를 선택하세요<br><br>Choose the data you want to work with");
            return;
        }

        setLoadingTBL_KSV_CAPABOOK_MEM1(true);
        serviceS0208_CAPABOOK_RECORD_BVT
            .mgrUpdate_CAPA_REFRESH(tInObj, tInObjs)
            .then((data) => {
                setLoadingTBL_KSV_CAPABOOK_MEM1(false);
                if (typeof data.graphQLErrors === "undefined") {
                    if (data.length > 0) {
                        alert(data[0].CODE);
                        if (data[0].CODE.includes("SUCC")) {
                            var tEDT = { ...dataEDT_KSV_CAPABOOK_MEM };
                            search_LIST_1(tEDT);
                            // setDataEDT_KSV_CAPABOOK_MEM(emptyEDT_KSV_CAPABOOK_MEM);
                        } else {
                            setDataEDT_KSV_CAPABOOK_MEM(
                                emptyEDT_KSV_CAPABOOK_MEM,
                            );
                        }
                    }
                    console.log(
                        "ServiceS0208_CAPABOOK_RECORD_BVT.mgrUpdateEDT_KSV_CAPABOOK_MEM() call => " +
                            data.length,
                    );
                    // Search
                } else {
                    // var tStr = data.graphQLErrors[0].message;
                    console.log(
                        "ServiceNawooAll.mgrUpdateS0208_CAPABOOK_RECORD_BVT( error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });
    };

    const saveEDT_KSV_CAPABOOK_MEM_CANCEL = (argKind) => {
        let _datasTBL_KSV_CAPABOOK_MEM1 = [...datasTBL_KSV_CAPABOOK_MEM1];
        let _dataTBL_KSV_CAPABOOK_MEM1 = { ...dataTBL_KSV_CAPABOOK_MEM1 };

        var tEDT = { ...dataEDT_KSV_CAPABOOK_MEM };

        var tInObj = {};
        tInObj.JOB_CD = argKind;
        tInObj.REMARK = tEDT.REMARK;
        tInObj.NR = tEDT.NR;
        tInObj.EXF = tEDT.EXF;
        tInObj.M_ETA = tEDT.M_ETA;
        tInObj.APPROVAL_DATE = tEDT.APPROVAL_DATE;
        tInObj.BOOK_DATE = dataQRY_KSV_CAPABOOK_MEM.NEW_DATE;
        tInObj.FACTORY_CD = dataQRY_KSV_CAPABOOK_MEM.FACTORY_CD;
        tInObj.IS_SAMPLE = dataQRY_KSV_CAPABOOK_MEM.IS_SAMPLE;
        tInObj.USER_NAME = dataQRY_KSV_CAPABOOK_MEM.USER_NAME;

        var tInObjs = [];
        selectedTBL_KSV_CAPABOOK_MEM1.forEach((col, i) => {
            var tObj = {};
            tObj.ORDER_CD = col.ORDER_CD;
            tInObjs.push(tObj);
        });
        if (tInObjs.length <= 0) {
            if (!_dataTBL_KSV_CAPABOOK_MEM1.ORDER_CD);
            else {
                var tObj = {};
                tObj.ORDER_CD = _dataTBL_KSV_CAPABOOK_MEM1.ORDER_CD;
                tInObjs.push(tObj);
            }
        }
        if (tInObjs.length <= 0) {
            alert(
                `작업할 데이타를 선택하세요.(${_dataTBL_KSV_CAPABOOK_MEM1.ORDER_CD})`,
            );
            return;
        }

        setLoadingTBL_KSV_CAPABOOK_MEM1(true);
        serviceS0208_CAPABOOK_RECORD_BVT
            .mgrUpdateEDT_KSV_CAPABOOK_MEM_CANCEL(tInObj, tInObjs)
            .then((data) => {
                setLoadingTBL_KSV_CAPABOOK_MEM1(true);
                if (typeof data.graphQLErrors === "undefined") {
                    if (data.length > 0) {
                        alert(data[0].CODE);
                        if (data[0].CODE.includes("SUCC")) {
                            search_LIST_1();
                            setDataEDT_KSV_CAPABOOK_MEM(
                                emptyEDT_KSV_CAPABOOK_MEM,
                            );
                        } else {
                            setDataEDT_KSV_CAPABOOK_MEM(
                                emptyEDT_KSV_CAPABOOK_MEM,
                            );
                        }
                    }
                    console.log(
                        "ServiceS0208_CAPABOOK_RECORD_BVT.mgrUpdateEDT_KSV_CAPABOOK_MEM() call => " +
                            data.length,
                    );
                } else {
                    // var tStr = data.graphQLErrors[0].message;
                    console.log(
                        "ServiceNawooAll.mgrUpdateS0208_CAPABOOK_RECORD_BVT( error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });
    };

    const onInputChangeEDT_KSV_CAPABOOK_MEM_IN_DATE = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_CAPABOOK_MEM = { ...dataEDT_KSV_CAPABOOK_MEM };

        let tTypeVal = _dataEDT_KSV_CAPABOOK_MEM[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_CAPABOOK_MEM[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_CAPABOOK_MEM[`${name}`] = parseInt(val);

        setDataEDT_KSV_CAPABOOK_MEM(_dataEDT_KSV_CAPABOOK_MEM);
    };

    const onInputChangeEDT_KSV_CAPABOOK_MEM_STYLE_CD = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_CAPABOOK_MEM = { ...dataEDT_KSV_CAPABOOK_MEM };

        let tTypeVal = _dataEDT_KSV_CAPABOOK_MEM[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_CAPABOOK_MEM[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_CAPABOOK_MEM[`${name}`] = parseInt(val);

        setDataEDT_KSV_CAPABOOK_MEM(_dataEDT_KSV_CAPABOOK_MEM);
    };

    const onInputChangeEDT_KSV_CAPABOOK_MEM_STYLE_NAME = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_CAPABOOK_MEM = { ...dataEDT_KSV_CAPABOOK_MEM };

        let tTypeVal = _dataEDT_KSV_CAPABOOK_MEM[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_CAPABOOK_MEM[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_CAPABOOK_MEM[`${name}`] = parseInt(val);

        setDataEDT_KSV_CAPABOOK_MEM(_dataEDT_KSV_CAPABOOK_MEM);
    };

    const onInputChangeEDT_KSV_CAPABOOK_MEM_BUYER_CD = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_CAPABOOK_MEM = { ...dataEDT_KSV_CAPABOOK_MEM };

        let tTypeVal = _dataEDT_KSV_CAPABOOK_MEM[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_CAPABOOK_MEM[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_CAPABOOK_MEM[`${name}`] = parseInt(val);

        setDataEDT_KSV_CAPABOOK_MEM(_dataEDT_KSV_CAPABOOK_MEM);
    };

    // const onInputChangeEDT_KSV_CAPABOOK_MEM_BUYER_CD = (e, name) => {
    //     let val = (e.target && e.target.value) || '';

    //     let _dataEDT_KSV_CAPABOOK_MEM = { ...dataEDT_KSV_CAPABOOK_MEM };

    //     let tTypeVal = _dataEDT_KSV_CAPABOOK_MEM[`${name}`];
    //     if (typeof tTypeVal === "string") _dataEDT_KSV_CAPABOOK_MEM[`${name}`] = val;
    //     else if (typeof tTypeVal === "number") _dataEDT_KSV_CAPABOOK_MEM[`${name}`] = parseInt(val);

    //     setDataEDT_KSV_CAPABOOK_MEM(_dataEDT_KSV_CAPABOOK_MEM);
    // }

    const onInputChangeEDT_KSV_CAPABOOK_MEM_PO_CD = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_CAPABOOK_MEM = { ...dataEDT_KSV_CAPABOOK_MEM };

        let tTypeVal = _dataEDT_KSV_CAPABOOK_MEM[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_CAPABOOK_MEM[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_CAPABOOK_MEM[`${name}`] = parseInt(val);

        setDataEDT_KSV_CAPABOOK_MEM(_dataEDT_KSV_CAPABOOK_MEM);
    };

    const onInputChangeEDT_KSV_CAPABOOK_MEM_ORDER_CD = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_CAPABOOK_MEM = { ...dataEDT_KSV_CAPABOOK_MEM };

        let tTypeVal = _dataEDT_KSV_CAPABOOK_MEM[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_CAPABOOK_MEM[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_CAPABOOK_MEM[`${name}`] = parseInt(val);

        setDataEDT_KSV_CAPABOOK_MEM(_dataEDT_KSV_CAPABOOK_MEM);
    };

    const onInputChangeEDT_KSV_CAPABOOK_MEM_FOB = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_CAPABOOK_MEM = { ...dataEDT_KSV_CAPABOOK_MEM };

        let tTypeVal = _dataEDT_KSV_CAPABOOK_MEM[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_CAPABOOK_MEM[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_CAPABOOK_MEM[`${name}`] = parseInt(val);

        setDataEDT_KSV_CAPABOOK_MEM(_dataEDT_KSV_CAPABOOK_MEM);
    };

    const onInputChangeEDT_KSV_CAPABOOK_MEM_QTY = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_CAPABOOK_MEM = { ...dataEDT_KSV_CAPABOOK_MEM };

        let tTypeVal = _dataEDT_KSV_CAPABOOK_MEM[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_CAPABOOK_MEM[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_CAPABOOK_MEM[`${name}`] = parseInt(val);

        setDataEDT_KSV_CAPABOOK_MEM(_dataEDT_KSV_CAPABOOK_MEM);
    };

    const [datasEDT_KSV_CAPABOOK_MEM_NR, setDatasEDT_KSV_CAPABOOK_MEM_NR] =
        useState([]);
    const [dataEDT_KSV_CAPABOOK_MEM_NR, setDataEDT_KSV_CAPABOOK_MEM_NR] =
        useState({});

    const editEDT_KSV_CAPABOOK_MEM_NR = (argValue) => {
        let _dataEDT_KSV_CAPABOOK_MEM_NR = datasEDT_KSV_CAPABOOK_MEM_NR.filter(
            (val) => val.CD_CODE === argValue,
        );
        setDataEDT_KSV_CAPABOOK_MEM_NR(_dataEDT_KSV_CAPABOOK_MEM_NR[0]);
    };

    const onDropdownChangeEDT_KSV_CAPABOOK_MEM_NR = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataEDT_KSV_CAPABOOK_MEM = { ...dataEDT_KSV_CAPABOOK_MEM };

        let tTypeVal = _dataEDT_KSV_CAPABOOK_MEM[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_KSV_CAPABOOK_MEM[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_KSV_CAPABOOK_MEM[`${name}`] = parseInt(val);
        }

        setDataEDT_KSV_CAPABOOK_MEM(_dataEDT_KSV_CAPABOOK_MEM);
        setDataEDT_KSV_CAPABOOK_MEM_NR(e.value);
    };

    const [
        datasEDT_KSV_CAPABOOK_MEM_USAGE,
        setDatasEDT_KSV_CAPABOOK_MEM_USAGE,
    ] = useState([]);
    const [dataEDT_KSV_CAPABOOK_MEM_USAGE, setDataEDT_KSV_CAPABOOK_MEM_USAGE] =
        useState({});

    const editEDT_KSV_CAPABOOK_MEM_USAGE = (argValue) => {
        let _dataEDT_KSV_CAPABOOK_MEM_USAGE =
            datasEDT_KSV_CAPABOOK_MEM_USAGE.filter(
                (val) => val.CD_CODE === argValue,
            );
        setDataEDT_KSV_CAPABOOK_MEM_USAGE(_dataEDT_KSV_CAPABOOK_MEM_USAGE[0]);
    };

    const onDropdownChangeEDT_KSV_CAPABOOK_MEM_USAGE = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataEDT_KSV_CAPABOOK_MEM = { ...dataEDT_KSV_CAPABOOK_MEM };

        let tTypeVal = _dataEDT_KSV_CAPABOOK_MEM[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_KSV_CAPABOOK_MEM[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_KSV_CAPABOOK_MEM[`${name}`] = parseInt(val);
        }

        setDataEDT_KSV_CAPABOOK_MEM(_dataEDT_KSV_CAPABOOK_MEM);
        setDataEDT_KSV_CAPABOOK_MEM_USAGE(e.value);
    };

    const onInputChangeEDT_KSV_CAPABOOK_MEM_REMARK = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_CAPABOOK_MEM = { ...dataEDT_KSV_CAPABOOK_MEM };

        let tTypeVal = _dataEDT_KSV_CAPABOOK_MEM[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_CAPABOOK_MEM[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_CAPABOOK_MEM[`${name}`] = parseInt(val);

        setDataEDT_KSV_CAPABOOK_MEM(_dataEDT_KSV_CAPABOOK_MEM);
    };

    const onInputChangeEDT_KSV_CAPABOOK_MEM_MW = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_CAPABOOK_MEM = { ...dataEDT_KSV_CAPABOOK_MEM };

        let tTypeVal = _dataEDT_KSV_CAPABOOK_MEM[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_CAPABOOK_MEM[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_CAPABOOK_MEM[`${name}`] = parseInt(val);

        setDataEDT_KSV_CAPABOOK_MEM(_dataEDT_KSV_CAPABOOK_MEM);
    };

    const onCalChangeEDT_KSV_CAPABOOK_MEM_EXF = (e, name) => {
        let val1 = e.value || "";
        let val = "";
        if (val1 === "") {
            val = "";
        } else {
            val = getDateVal(val1);
        }

        let _dataEDT_KSV_CAPABOOK_MEM = { ...dataEDT_KSV_CAPABOOK_MEM };
        _dataEDT_KSV_CAPABOOK_MEM[`${name}`] = val;
        setDataEDT_KSV_CAPABOOK_MEM(_dataEDT_KSV_CAPABOOK_MEM);
    };

    // const onCalChangeEDT_KSV_CAPABOOK_MEM_EXF = (e, name) => {
    //     let val1 = e.value || '';
    //     let val = '';
    //     if (val1 === '') {
    //         val = '';
    //     } else {
    //         val = getDateVal(val1);
    //     }

    //     let _dataEDT_KSV_CAPABOOK_MEM = { ...dataEDT_KSV_CAPABOOK_MEM };
    //     _dataEDT_KSV_CAPABOOK_MEM[`${name}`] = val;
    //     setDataEDT_KSV_CAPABOOK_MEM(_dataEDT_KSV_CAPABOOK_MEM);

    //  }

    const onCalChangeEDT_KSV_CAPABOOK_MEM_M_ETA = (e, name) => {
        let val1 = e.value || "";
        let val = "";
        if (val1 === "") {
            val = "";
        } else {
            val = getDateVal(val1);
        }

        let _dataEDT_KSV_CAPABOOK_MEM = { ...dataEDT_KSV_CAPABOOK_MEM };
        _dataEDT_KSV_CAPABOOK_MEM[`${name}`] = val;
        setDataEDT_KSV_CAPABOOK_MEM(_dataEDT_KSV_CAPABOOK_MEM);
    };

    const onCalChangeEDT_KSV_CAPABOOK_MEM_APPROVAL_DATE = (e, name) => {
        let val1 = e.value || "";
        let val = "";
        if (val1 === "") {
            val = "";
        } else {
            val = getDateVal(val1);
        }

        let _dataEDT_KSV_CAPABOOK_MEM = { ...dataEDT_KSV_CAPABOOK_MEM };
        _dataEDT_KSV_CAPABOOK_MEM[`${name}`] = val;
        setDataEDT_KSV_CAPABOOK_MEM(_dataEDT_KSV_CAPABOOK_MEM);
    };

    const onInputChangeEDT_KSV_CAPABOOK_MEM_EXP_CMPT = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_CAPABOOK_MEM = { ...dataEDT_KSV_CAPABOOK_MEM };

        let tTypeVal = _dataEDT_KSV_CAPABOOK_MEM[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_CAPABOOK_MEM[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_CAPABOOK_MEM[`${name}`] = parseInt(val);

        setDataEDT_KSV_CAPABOOK_MEM(_dataEDT_KSV_CAPABOOK_MEM);
    };

    const [
        datasEDT_KSV_CAPABOOK_MEM_BVT_KIND,
        setDatasEDT_KSV_CAPABOOK_MEM_BVT_KIND,
    ] = useState([]);
    const [
        dataEDT_KSV_CAPABOOK_MEM_BVT_KIND,
        setDataEDT_KSV_CAPABOOK_MEM_BVT_KIND,
    ] = useState({});

    const editEDT_KSV_CAPABOOK_MEM_BVT_KIND = (argValue) => {
        let _dataEDT_KSV_CAPABOOK_MEM_BVT_KIND =
            datasEDT_KSV_CAPABOOK_MEM_BVT_KIND.filter(
                (val) => val.CD_CODE === argValue,
            );
        setDataEDT_KSV_CAPABOOK_MEM_BVT_KIND(
            _dataEDT_KSV_CAPABOOK_MEM_BVT_KIND[0],
        );
    };

    const onDropdownChangeEDT_KSV_CAPABOOK_MEM_BVT_KIND = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataEDT_KSV_CAPABOOK_MEM = { ...dataEDT_KSV_CAPABOOK_MEM };

        let tTypeVal = _dataEDT_KSV_CAPABOOK_MEM[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_KSV_CAPABOOK_MEM[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_KSV_CAPABOOK_MEM[`${name}`] = parseInt(val);
        }

        setDataEDT_KSV_CAPABOOK_MEM(_dataEDT_KSV_CAPABOOK_MEM);
        setDataEDT_KSV_CAPABOOK_MEM_BVT_KIND(e.value);
    };

    const onInputChangeEDT_KSV_CAPABOOK_MEM_TPR = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_CAPABOOK_MEM = { ...dataEDT_KSV_CAPABOOK_MEM };

        let tTypeVal = _dataEDT_KSV_CAPABOOK_MEM[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_CAPABOOK_MEM[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_CAPABOOK_MEM[`${name}`] = parseInt(val);

        setDataEDT_KSV_CAPABOOK_MEM(_dataEDT_KSV_CAPABOOK_MEM);
    };

    const onInputChangeEDT_KSV_CAPABOOK_MEM_EMBOSSING = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_CAPABOOK_MEM = { ...dataEDT_KSV_CAPABOOK_MEM };

        let tTypeVal = _dataEDT_KSV_CAPABOOK_MEM[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_CAPABOOK_MEM[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_CAPABOOK_MEM[`${name}`] = parseInt(val);

        setDataEDT_KSV_CAPABOOK_MEM(_dataEDT_KSV_CAPABOOK_MEM);
    };

    const onInputChangeEDT_KSV_CAPABOOK_MEM_WASHING = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_CAPABOOK_MEM = { ...dataEDT_KSV_CAPABOOK_MEM };

        let tTypeVal = _dataEDT_KSV_CAPABOOK_MEM[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_CAPABOOK_MEM[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_CAPABOOK_MEM[`${name}`] = parseInt(val);

        setDataEDT_KSV_CAPABOOK_MEM(_dataEDT_KSV_CAPABOOK_MEM);
    };

    const onInputChangeEDT_KSV_CAPABOOK_MEM_DL = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_CAPABOOK_MEM = { ...dataEDT_KSV_CAPABOOK_MEM };

        let tTypeVal = _dataEDT_KSV_CAPABOOK_MEM[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_CAPABOOK_MEM[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_CAPABOOK_MEM[`${name}`] = parseInt(val);

        setDataEDT_KSV_CAPABOOK_MEM(_dataEDT_KSV_CAPABOOK_MEM);
    };

    const onInputChangeEDT_KSV_CAPABOOK_MEM_S = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_CAPABOOK_MEM = { ...dataEDT_KSV_CAPABOOK_MEM };

        let tTypeVal = _dataEDT_KSV_CAPABOOK_MEM[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_CAPABOOK_MEM[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_CAPABOOK_MEM[`${name}`] = parseInt(val);

        setDataEDT_KSV_CAPABOOK_MEM(_dataEDT_KSV_CAPABOOK_MEM);
    };

    const onInputChangeEDT_KSV_CAPABOOK_MEM_FND = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_CAPABOOK_MEM = { ...dataEDT_KSV_CAPABOOK_MEM };

        let tTypeVal = _dataEDT_KSV_CAPABOOK_MEM[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_CAPABOOK_MEM[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_CAPABOOK_MEM[`${name}`] = parseInt(val);

        setDataEDT_KSV_CAPABOOK_MEM(_dataEDT_KSV_CAPABOOK_MEM);
    };

    const onInputChangeEDT_KSV_CAPABOOK_MEM_DOWN = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_CAPABOOK_MEM = { ...dataEDT_KSV_CAPABOOK_MEM };

        let tTypeVal = _dataEDT_KSV_CAPABOOK_MEM[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_CAPABOOK_MEM[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_CAPABOOK_MEM[`${name}`] = parseInt(val);

        setDataEDT_KSV_CAPABOOK_MEM(_dataEDT_KSV_CAPABOOK_MEM);
    };

    const onInputChangeEDT_KSV_CAPABOOK_MEM_CUT = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_CAPABOOK_MEM = { ...dataEDT_KSV_CAPABOOK_MEM };

        let tTypeVal = _dataEDT_KSV_CAPABOOK_MEM[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_CAPABOOK_MEM[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_CAPABOOK_MEM[`${name}`] = parseInt(val);

        setDataEDT_KSV_CAPABOOK_MEM(_dataEDT_KSV_CAPABOOK_MEM);
    };

    const onInputChangeEDT_KSV_CAPABOOK_MEM_EMBRO = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_CAPABOOK_MEM = { ...dataEDT_KSV_CAPABOOK_MEM };

        let tTypeVal = _dataEDT_KSV_CAPABOOK_MEM[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_CAPABOOK_MEM[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_CAPABOOK_MEM[`${name}`] = parseInt(val);

        setDataEDT_KSV_CAPABOOK_MEM(_dataEDT_KSV_CAPABOOK_MEM);
    };

    const onInputChangeEDT_KSV_CAPABOOK_MEM_TP = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_CAPABOOK_MEM = { ...dataEDT_KSV_CAPABOOK_MEM };

        let tTypeVal = _dataEDT_KSV_CAPABOOK_MEM[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_CAPABOOK_MEM[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_CAPABOOK_MEM[`${name}`] = parseInt(val);

        setDataEDT_KSV_CAPABOOK_MEM(_dataEDT_KSV_CAPABOOK_MEM);
    };

    const onInputChangeEDT_KSV_CAPABOOK_MEM_SP = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_CAPABOOK_MEM = { ...dataEDT_KSV_CAPABOOK_MEM };

        let tTypeVal = _dataEDT_KSV_CAPABOOK_MEM[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_CAPABOOK_MEM[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_CAPABOOK_MEM[`${name}`] = parseInt(val);

        setDataEDT_KSV_CAPABOOK_MEM(_dataEDT_KSV_CAPABOOK_MEM);
    };

    const onInputChangeEDT_KSV_CAPABOOK_MEM_LTHR = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_CAPABOOK_MEM = { ...dataEDT_KSV_CAPABOOK_MEM };

        let tTypeVal = _dataEDT_KSV_CAPABOOK_MEM[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_CAPABOOK_MEM[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_CAPABOOK_MEM[`${name}`] = parseInt(val);

        setDataEDT_KSV_CAPABOOK_MEM(_dataEDT_KSV_CAPABOOK_MEM);
    };

    const onInputChangeEDT_KSV_CAPABOOK_MEM_G = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_CAPABOOK_MEM = { ...dataEDT_KSV_CAPABOOK_MEM };

        let tTypeVal = _dataEDT_KSV_CAPABOOK_MEM[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_CAPABOOK_MEM[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_CAPABOOK_MEM[`${name}`] = parseInt(val);

        setDataEDT_KSV_CAPABOOK_MEM(_dataEDT_KSV_CAPABOOK_MEM);
    };

    const onInputChangeEDT_KSV_CAPABOOK_MEM_W = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_CAPABOOK_MEM = { ...dataEDT_KSV_CAPABOOK_MEM };

        let tTypeVal = _dataEDT_KSV_CAPABOOK_MEM[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_CAPABOOK_MEM[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_CAPABOOK_MEM[`${name}`] = parseInt(val);

        setDataEDT_KSV_CAPABOOK_MEM(_dataEDT_KSV_CAPABOOK_MEM);
    };

    const onInputChangeEDT_KSV_CAPABOOK_MEM_FTP = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_CAPABOOK_MEM = { ...dataEDT_KSV_CAPABOOK_MEM };

        let tTypeVal = _dataEDT_KSV_CAPABOOK_MEM[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_CAPABOOK_MEM[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_CAPABOOK_MEM[`${name}`] = parseInt(val);

        setDataEDT_KSV_CAPABOOK_MEM(_dataEDT_KSV_CAPABOOK_MEM);
    };

    const onInputChangeEDT_KSV_CAPABOOK_MEM_DTP = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_CAPABOOK_MEM = { ...dataEDT_KSV_CAPABOOK_MEM };

        let tTypeVal = _dataEDT_KSV_CAPABOOK_MEM[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_CAPABOOK_MEM[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_CAPABOOK_MEM[`${name}`] = parseInt(val);

        setDataEDT_KSV_CAPABOOK_MEM(_dataEDT_KSV_CAPABOOK_MEM);
    };

    const [
        datasEDT_KSV_CAPABOOK_MEM_EMBOSSING,
        setDatasEDT_KSV_CAPABOOK_MEM_EMBOSSING,
    ] = useState([]);
    const [
        dataEDT_KSV_CAPABOOK_MEM_EMBOSSING,
        setDataEDT_KSV_CAPABOOK_MEM_EMBOSSING,
    ] = useState({});

    const editEDT_KSV_CAPABOOK_MEM_EMBOSSING = (argValue) => {
        let _dataEDT_KSV_CAPABOOK_MEM_EMBOSSING =
            datasEDT_KSV_CAPABOOK_MEM_EMBOSSING.filter(
                (val) => val.CD_CODE === argValue,
            );
        setDataEDT_KSV_CAPABOOK_MEM_EMBOSSING(
            _dataEDT_KSV_CAPABOOK_MEM_EMBOSSING[0],
        );
    };

    const [
        datasEDT_KSV_CAPABOOK_MEM_WASHING,
        setDatasEDT_KSV_CAPABOOK_MEM_WASHING,
    ] = useState([]);
    const [
        dataEDT_KSV_CAPABOOK_MEM_WASHING,
        setDataEDT_KSV_CAPABOOK_MEM_WASHING,
    ] = useState({});

    const editEDT_KSV_CAPABOOK_MEM_WASHING = (argValue) => {
        let _dataEDT_KSV_CAPABOOK_MEM_WASHING =
            datasEDT_KSV_CAPABOOK_MEM_WASHING.filter(
                (val) => val.CD_CODE === argValue,
            );
        setDataEDT_KSV_CAPABOOK_MEM_WASHING(
            _dataEDT_KSV_CAPABOOK_MEM_WASHING[0],
        );
    };

    const [datasEDT_KSV_CAPABOOK_MEM_DTP, setDatasEDT_KSV_CAPABOOK_MEM_DTP] =
        useState([]);
    const [dataEDT_KSV_CAPABOOK_MEM_DTP, setDataEDT_KSV_CAPABOOK_MEM_DTP] =
        useState({});

    const editEDT_KSV_CAPABOOK_MEM_DTP = (argValue) => {
        let _dataEDT_KSV_CAPABOOK_MEM_DTP =
            datasEDT_KSV_CAPABOOK_MEM_DTP.filter(
                (val) => val.CD_CODE === argValue,
            );
        setDataEDT_KSV_CAPABOOK_MEM_DTP(_dataEDT_KSV_CAPABOOK_MEM_DTP[0]);
    };

    const [datasEDT_KSV_CAPABOOK_MEM_DOWN, setDatasEDT_KSV_CAPABOOK_MEM_DOWN] =
        useState([]);
    const [dataEDT_KSV_CAPABOOK_MEM_DOWN, setDataEDT_KSV_CAPABOOK_MEM_DOWN] =
        useState({});

    const editEDT_KSV_CAPABOOK_MEM_DOWN = (argValue) => {
        let _dataEDT_KSV_CAPABOOK_MEM_DOWN =
            datasEDT_KSV_CAPABOOK_MEM_DOWN.filter(
                (val) => val.CD_CODE === argValue,
            );
        setDataEDT_KSV_CAPABOOK_MEM_DOWN(_dataEDT_KSV_CAPABOOK_MEM_DOWN[0]);
    };

    const [datasEDT_KSV_CAPABOOK_MEM_TP, setDatasEDT_KSV_CAPABOOK_MEM_TP] =
        useState([]);
    const [dataEDT_KSV_CAPABOOK_MEM_TP, setDataEDT_KSV_CAPABOOK_MEM_TP] =
        useState({});

    const editEDT_KSV_CAPABOOK_MEM_TP = (argValue) => {
        let _dataEDT_KSV_CAPABOOK_MEM_TP = datasEDT_KSV_CAPABOOK_MEM_TP.filter(
            (val) => val.CD_CODE === argValue,
        );
        setDataEDT_KSV_CAPABOOK_MEM_TP(_dataEDT_KSV_CAPABOOK_MEM_TP[0]);
    };

    const [datasEDT_KSV_CAPABOOK_MEM_FND, setDatasEDT_KSV_CAPABOOK_MEM_FND] =
        useState([]);
    const [dataEDT_KSV_CAPABOOK_MEM_FND, setDataEDT_KSV_CAPABOOK_MEM_FND] =
        useState({});

    const editEDT_KSV_CAPABOOK_MEM_FND = (argValue) => {
        let _dataEDT_KSV_CAPABOOK_MEM_FND =
            datasEDT_KSV_CAPABOOK_MEM_FND.filter(
                (val) => val.CD_CODE === argValue,
            );
        setDataEDT_KSV_CAPABOOK_MEM_FND(_dataEDT_KSV_CAPABOOK_MEM_FND[0]);
    };

    const [datasEDT_KSV_CAPABOOK_MEM_W, setDatasEDT_KSV_CAPABOOK_MEM_W] =
        useState([]);
    const [dataEDT_KSV_CAPABOOK_MEM_W, setDataEDT_KSV_CAPABOOK_MEM_W] =
        useState({});

    const editEDT_KSV_CAPABOOK_MEM_W = (argValue) => {
        let _dataEDT_KSV_CAPABOOK_MEM_W = datasEDT_KSV_CAPABOOK_MEM_W.filter(
            (val) => val.CD_CODE === argValue,
        );
        setDataEDT_KSV_CAPABOOK_MEM_W(_dataEDT_KSV_CAPABOOK_MEM_W[0]);
    };

    const [datasEDT_KSV_CAPABOOK_MEM_LAZE, setDatasEDT_KSV_CAPABOOK_MEM_LAZE] =
        useState([]);
    const [dataEDT_KSV_CAPABOOK_MEM_LAZE, setDataEDT_KSV_CAPABOOK_MEM_LAZE] =
        useState({});

    const editEDT_KSV_CAPABOOK_MEM_LAZE = (argValue) => {
        let _dataEDT_KSV_CAPABOOK_MEM_LAZE =
            datasEDT_KSV_CAPABOOK_MEM_LAZE.filter(
                (val) => val.CD_CODE === argValue,
            );
        setDataEDT_KSV_CAPABOOK_MEM_LAZE(_dataEDT_KSV_CAPABOOK_MEM_LAZE[0]);
    };

    const [datasEDT_KSV_CAPABOOK_MEM_CUT, setDatasEDT_KSV_CAPABOOK_MEM_CUT] =
        useState([]);
    const [dataEDT_KSV_CAPABOOK_MEM_CUT, setDataEDT_KSV_CAPABOOK_MEM_CUT] =
        useState({});

    const editEDT_KSV_CAPABOOK_MEM_CUT = (argValue) => {
        let _dataEDT_KSV_CAPABOOK_MEM_CUT =
            datasEDT_KSV_CAPABOOK_MEM_CUT.filter(
                (val) => val.CD_CODE === argValue,
            );
        setDataEDT_KSV_CAPABOOK_MEM_CUT(_dataEDT_KSV_CAPABOOK_MEM_CUT[0]);
    };

    const [datasEDT_KSV_CAPABOOK_MEM_SP, setDatasEDT_KSV_CAPABOOK_MEM_SP] =
        useState([]);
    const [dataEDT_KSV_CAPABOOK_MEM_SP, setDataEDT_KSV_CAPABOOK_MEM_SP] =
        useState({});

    const editEDT_KSV_CAPABOOK_MEM_SP = (argValue) => {
        let _dataEDT_KSV_CAPABOOK_MEM_SP = datasEDT_KSV_CAPABOOK_MEM_SP.filter(
            (val) => val.CD_CODE === argValue,
        );
        setDataEDT_KSV_CAPABOOK_MEM_SP(_dataEDT_KSV_CAPABOOK_MEM_SP[0]);
    };

    const [datasEDT_KSV_CAPABOOK_MEM_FTP, setDatasEDT_KSV_CAPABOOK_MEM_FTP] =
        useState([]);
    const [dataEDT_KSV_CAPABOOK_MEM_FTP, setDataEDT_KSV_CAPABOOK_MEM_FTP] =
        useState({});

    const editEDT_KSV_CAPABOOK_MEM_FTP = (argValue) => {
        let _dataEDT_KSV_CAPABOOK_MEM_FTP =
            datasEDT_KSV_CAPABOOK_MEM_FTP.filter(
                (val) => val.CD_CODE === argValue,
            );
        setDataEDT_KSV_CAPABOOK_MEM_FTP(_dataEDT_KSV_CAPABOOK_MEM_FTP[0]);
    };

    const [
        datasEDT_KSV_CAPABOOK_MEM_EMBRO,
        setDatasEDT_KSV_CAPABOOK_MEM_EMBRO,
    ] = useState([]);
    const [dataEDT_KSV_CAPABOOK_MEM_EMBRO, setDataEDT_KSV_CAPABOOK_MEM_EMBRO] =
        useState({});

    const editEDT_KSV_CAPABOOK_MEM_EMBRO = (argValue) => {
        let _dataEDT_KSV_CAPABOOK_MEM_EMBRO =
            datasEDT_KSV_CAPABOOK_MEM_EMBRO.filter(
                (val) => val.CD_CODE === argValue,
            );
        setDataEDT_KSV_CAPABOOK_MEM_EMBRO(_dataEDT_KSV_CAPABOOK_MEM_EMBRO[0]);
    };

    const [datasEDT_KSV_CAPABOOK_MEM_LTHR, setDatasEDT_KSV_CAPABOOK_MEM_LTHR] =
        useState([]);
    const [dataEDT_KSV_CAPABOOK_MEM_LTHR, setDataEDT_KSV_CAPABOOK_MEM_LTHR] =
        useState({});

    const editEDT_KSV_CAPABOOK_MEM_LTHR = (argValue) => {
        let _dataEDT_KSV_CAPABOOK_MEM_LTHR =
            datasEDT_KSV_CAPABOOK_MEM_LTHR.filter(
                (val) => val.CD_CODE === argValue,
            );
        setDataEDT_KSV_CAPABOOK_MEM_LTHR(_dataEDT_KSV_CAPABOOK_MEM_LTHR[0]);
    };

    const [datasEDT_KSV_CAPABOOK_MEM_KIND, setDatasEDT_KSV_CAPABOOK_MEM_KIND] =
        useState([]);
    const [dataEDT_KSV_CAPABOOK_MEM_KIND, setDataEDT_KSV_CAPABOOK_MEM_KIND] =
        useState({});

    const [datasEDT_KSV_CAPABOOK_MEM_DL, setDatasEDT_KSV_CAPABOOK_MEM_DL] =
        useState([]);
    const [dataEDT_KSV_CAPABOOK_MEM_DL, setDataEDT_KSV_CAPABOOK_MEM_DL] =
        useState({});

    const editEDT_KSV_CAPABOOK_MEM_DL = (argValue) => {
        let _dataEDT_KSV_CAPABOOK_MEM_DL = datasEDT_KSV_CAPABOOK_MEM_DL.filter(
            (val) => val.CD_CODE === argValue,
        );
        setDataEDT_KSV_CAPABOOK_MEM_DL(_dataEDT_KSV_CAPABOOK_MEM_DL[0]);
    };

    const [datasEDT_KSV_CAPABOOK_MEM_MW, setDatasEDT_KSV_CAPABOOK_MEM_MW] =
        useState([]);
    const [dataEDT_KSV_CAPABOOK_MEM_MW, setDataEDT_KSV_CAPABOOK_MEM_MW] =
        useState({});

    const editEDT_KSV_CAPABOOK_MEM_MW = (argValue) => {
        let _dataEDT_KSV_CAPABOOK_MEM_MW = datasEDT_KSV_CAPABOOK_MEM_MW.filter(
            (val) => val.CD_CODE === argValue,
        );
        setDataEDT_KSV_CAPABOOK_MEM_MW(_dataEDT_KSV_CAPABOOK_MEM_MW[0]);
    };

    const [datasEDT_KSV_CAPABOOK_MEM_G, setDatasEDT_KSV_CAPABOOK_MEM_G] =
        useState([]);
    const [dataEDT_KSV_CAPABOOK_MEM_G, setDataEDT_KSV_CAPABOOK_MEM_G] =
        useState({});

    const editEDT_KSV_CAPABOOK_MEM_G = (argValue) => {
        let _dataEDT_KSV_CAPABOOK_MEM_G = datasEDT_KSV_CAPABOOK_MEM_G.filter(
            (val) => val.CD_CODE === argValue,
        );
        setDataEDT_KSV_CAPABOOK_MEM_G(_dataEDT_KSV_CAPABOOK_MEM_G[0]);
    };

    const [datasEDT_KSV_CAPABOOK_MEM_S, setDatasEDT_KSV_CAPABOOK_MEM_S] =
        useState([]);
    const [dataEDT_KSV_CAPABOOK_MEM_S, setDataEDT_KSV_CAPABOOK_MEM_S] =
        useState({});

    const editEDT_KSV_CAPABOOK_MEM_S = (argValue) => {
        let _dataEDT_KSV_CAPABOOK_MEM_S = datasEDT_KSV_CAPABOOK_MEM_S.filter(
            (val) => val.CD_CODE === argValue,
        );
        setDataEDT_KSV_CAPABOOK_MEM_S(_dataEDT_KSV_CAPABOOK_MEM_S[0]);
    };

    const [datasEDT_KSV_CAPABOOK_MEM_UNIT, setDatasEDT_KSV_CAPABOOK_MEM_UNIT] =
        useState([]);
    const [dataEDT_KSV_CAPABOOK_MEM_UNIT, setDataEDT_KSV_CAPABOOK_MEM_UNIT] =
        useState({});

    const editEDT_KSV_CAPABOOK_MEM_UNIT = (argValue) => {
        let _dataEDT_KSV_CAPABOOK_MEM_UNIT =
            datasEDT_KSV_CAPABOOK_MEM_UNIT.filter(
                (val) => val.CD_CODE === argValue,
            );
        setDataEDT_KSV_CAPABOOK_MEM_UNIT(_dataEDT_KSV_CAPABOOK_MEM_UNIT[0]);
    };

    const [
        datasEDT_KSV_CAPABOOK_MEM_PURPOSE,
        setDatasEDT_KSV_CAPABOOK_MEM_PURPOSE,
    ] = useState([]);
    const [
        dataEDT_KSV_CAPABOOK_MEM_PURPOSE,
        setDataEDT_KSV_CAPABOOK_MEM_PURPOSE,
    ] = useState({});

    const editEDT_KSV_CAPABOOK_MEM_PURPOSE = (argValue) => {
        let _dataEDT_KSV_CAPABOOK_MEM_PURPOSE =
            datasEDT_KSV_CAPABOOK_MEM_PURPOSE.filter(
                (val) => val.CD_CODE === argValue,
            );
        setDataEDT_KSV_CAPABOOK_MEM_PURPOSE(
            _dataEDT_KSV_CAPABOOK_MEM_PURPOSE[0],
        );
    };

    const [
        datasEDT_KSV_CAPABOOK_MEM_FABRIC,
        setDatasEDT_KSV_CAPABOOK_MEM_FABRIC,
    ] = useState([]);
    const [
        dataEDT_KSV_CAPABOOK_MEM_FABRIC,
        setDataEDT_KSV_CAPABOOK_MEM_FABRIC,
    ] = useState({});

    const editEDT_KSV_CAPABOOK_MEM_FABRIC = (argValue) => {
        let _dataEDT_KSV_CAPABOOK_MEM_FABRIC =
            datasEDT_KSV_CAPABOOK_MEM_FABRIC.filter(
                (val) => val.CD_CODE === argValue,
            );
        setDataEDT_KSV_CAPABOOK_MEM_FABRIC(_dataEDT_KSV_CAPABOOK_MEM_FABRIC[0]);
    };

    // Search Order
    // DEFINE DATAGRID : TBL_QRY_CAPA_STYLE3
    const [datasTBL_QRY_CAPA_STYLE3, setDatasTBL_QRY_CAPA_STYLE3] = useState(
        [],
    );
    const dt_TBL_QRY_CAPA_STYLE3 = useRef(null);
    const [dataTBL_QRY_CAPA_STYLE3, setDataTBL_QRY_CAPA_STYLE3] = useState(
        emptyTBL_QRY_CAPA_STYLE3,
    );
    const [selectedTBL_QRY_CAPA_STYLE3, setSelectedTBL_QRY_CAPA_STYLE3] =
        useState([]);
    const [
        flagSelectModeTBL_QRY_CAPA_STYLE3,
        setFlagSelectModeTBL_QRY_CAPA_STYLE3,
    ] = useState(false);
    const [loadingTBL_QRY_CAPA_STYLE3, setLoadingTBL_QRY_CAPA_STYLE3] =
        useState(false);

    // DATAGRID CODE : TBL_QRY_CAPA_STYLE3

    const search_ORDER2 = () => {
        if (
            dataQRY_CAPA_ORDER2_STYLE_CD2 === "" &&
            dataQRY_CAPA_ORDER2_ORDER_CD2 === ""
        ) {
            alert("Style , Order에 검색어를 입력하세요 <br><br>Please enter search terms in Style and Order.");
            return;
        }

        setDatasTBL_QRY_CAPA_ORDER3([]);

        var tQryObj = { ...dataQRY_KSV_CAPABOOK_MEM };
        var tQryObj2 = { ...dataQRY_CAPA_ORDER2 };

        var tInObj = {};
        tInObj.STYLE_CD = dataQRY_CAPA_ORDER2_STYLE_CD2;
        tInObj.ORDER_CD = dataQRY_CAPA_ORDER2_ORDER_CD2;
        tInObj.USER_NAME = tQryObj.USER_NAME;
        tInObj.FACTORY_CD = tQryObj.FACTORY_CD;
        tInObj.IS_SAMPLE = tQryObj.IS_SAMPLE;
        setLoadingTBL_QRY_CAPA_ORDER3(true);
        serviceS0208_CAPABOOK_RECORD_BVT
            .mgrQuery_SEARCH_ORDER2(tInObj)
            .then((data) => {
                setLoadingTBL_QRY_CAPA_ORDER3(false);
                if (typeof data.graphQLErrors === "undefined") {
                    if (data.length > 0) {
                        setSaveOrderArray(data);
                        console.log(`save Order:${saveOrderArray.length1}`);
                        var tArray = [];
                        data.forEach((col, i) => {
                            var tObj = {};
                            tObj.ORDER_CD = col.ORDER.ORDER_CD;
                            tObj.STYLE_CD = col.ORDER.STYLE_CD;
                            tObj.STYLE_NAME = col.STYLE.STYLE_NAME;
                            tObj.BOOK_DATE = col.CAPA_DATE;
                            tArray.push(tObj);
                        });
                        setDatasTBL_QRY_CAPA_ORDER3(tArray);
                    }
                } else {
                    toast.current.show({
                        severity: "success",
                        summary: "Query Error",
                        detail: "Error",
                        life: 3000,
                    });
                }
            });
    };

    const process_SEARCH_ORDER = () => {
        var tQryObj = { ...dataQRY_KSV_CAPABOOK_MEM };
        if (tQryObj.FACTORY_CD === "") {
            alert("Please select [Factory] first ");
            return;
        }

        setDataQRY_CAPA_ORDER2(emptyQRY_CAPA_ORDER2);
        setDatasTBL_QRY_CAPA_ORDER3([]);
        setSelectedTBL_QRY_CAPA_ORDER3([]);
        setIsAddOrder(true);
    };

    const process_RESET = () => {
        setDatasTBL_KSV_CAPABOOK_MEM1([]);
        setDataEDT_KSV_CAPABOOK_MEM(emptyEDT_KSV_CAPABOOK_MEM);
        //setDataQRY_KSV_CAPABOOK_MEM({...emptyQRY_KSV_CAPABOOK_MEM, USER_NAME:dataQRY_KSV_CAPABOOK_MEM_USER_NAME.CD_CODE});
        //setDataQRY_KSV_CAPABOOK_MEM_USER_NAME(datasQRY_KSV_CAPABOOK_MEM_USER_NAME[0]);
        setDataQRY_KSV_CAPABOOK_MEM_FACTORY_CD(
            datasQRY_KSV_CAPABOOK_MEM_FACTORY_CD[0],
        );
    };

    const popup_SEL_UPDATE = () => {
        if (selectedTBL_KSV_CAPABOOK_MEM1.length <= 0) {
            alert("작업할 데이터를 선택하세요<br><br>Choose the data you want to work with");
            return;
        }
        var tArray = [...selectedTBL_KSV_CAPABOOK_MEM1];
        setDatasTBL_KSV_CAPABOOK_MEM5(tArray);
        setIsSelUpdate(true);
    };
    const process_SEL_UPDATE = () => {
        updateCAPA("SEL_UPDATE");
    };

    const cancel_SEL_UPDATE = () => {
        hideDialogSelUpdate();
    };

    const process_INSERT_CAPA = () => {
        var _tObj = { ...dataEDT_KSV_CAPABOOK_MEM };

        if (!_tObj.ORDER_CD) {
            alert("ORDER_CD가 입력되지 않았습니다<br><br>ORDER_CD is not entered");
            return;
        }
        if (!_tObj.BUYER_TEAM) {
            alert(
                "Buyer Team이 입력되지 않았습니다.  Sch Order을 이용해서 Insert할 Order을 선택하세요",
            );
            return;
        }
        if (!_tObj.NR && dataQRY_KSV_CAPABOOK_MEM.IS_SAMPLE !== "1") {
            alert("New/Repeat이 입력되지 않았습니다.  <br><br>New/Repeat has not been entered.");
            return;
        }
        if (!_tObj.APPROVAL_DATE) {
            alert("Approval Date가 입력되지 않았습니다.  <br><br>Approval Date has not been entered.");
            return;
        }
        if (!_tObj.M_ETA) {
            alert("M_ETA가 입력되지 않았습니다.  <br><br>M_ETA has not been entered.");
            return;
        }
        if (!_tObj.EXF) {
            alert("EXF가 입력되지 않았습니다.  <br><br>EXF is not entered.");
            return;
        }

        var tQryObj = { ...dataQRY_KSV_CAPABOOK_MEM };

        var tObj = {};
        tObj.ORDER_CD = _tObj.ORDER_CD;
        // tObj.USER_ID  = tQryObj.USER_NAME;
        tObj.USER_ID = _tObj.BUYER_TEAM;
        tObj.CAPA_M_ETA = _tObj.M_ETA;
        tObj.NR = _tObj.NR;
        tObj.EXF = _tObj.EXF;
        tObj.APPROVAL_DATE = _tObj.APPROVAL_DATE;
        tObj.REMARK = _tObj.REMARK;
        tObj.USAGE = _tObj.USAGE;

        serviceS020602_ORDER_REG.mgrInsert_INSERT_CAPA(tObj).then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                if (data.length > 0 && data[0].CODE.includes("SUCC")) {
                    alert(`Success Insert Capa: ${tObj.ORDER_CD}`);
                    search_LIST_1({}, "INSERT");

                    var tOldEdit = { ...dataEDT_KSV_CAPABOOK_MEM };
                    var tNewEdit = { ...emptyEDT_KSV_CAPABOOK_MEM };
                    tNewEdit.NR = tOldEdit.NR;
                    tNewEdit.REMARK = tOldEdit.REMARK;
                    tNewEdit.EXF = tOldEdit.EXF;
                    tNewEdit.M_ETA = tOldEdit.M_ETA;
                    tNewEdit.APPROVAL_DATE = tOldEdit.APPROVAL_DATE;
                    tNewEdit.USAGE = tOldEdit.USAGE;

                    setDataEDT_KSV_CAPABOOK_MEM(tNewEdit);
                } else {
                    alert(data[0].CODE);
                }
            } else {
                alert(`Fail Insert Capa: ${tObj.ORDER_CD} `);
            }
        });
    };

    const process_REFRESH = () => {
        var tRowObj = { ...dataTBL_KSV_CAPABOOK_MEM1 };
        if (
            tRowObj.JOB_CD === "0" ||
            tRowObj.JOB_CD === "I" ||
            tRowObj.JOB_CD === "U"
        ) {
        } else {
            alert("JOB CD가 I, 0, U 인것만 refresh가능합니다<br><br>Only JOB CDs of I, 0, and U can be refreshed.");
            return;
        }

        var tEdtObj = { ...dataEDT_KSV_CAPABOOK_MEM };
        var tQryObj = { ...dataQRY_KSV_CAPABOOK_MEM };
        var tQryObj2 = { ...dataQRY_CAPA_ORDER2 };

        if (tEdtObj.ORDER_CD === "") return;

        var tInObj = {};
        tInObj.STYLE_CD = "";
        tInObj.ORDER_CD = tEdtObj.ORDER_CD;
        tInObj.USER_NAME = tQryObj.USER_NAME;
        tInObj.FACTORY_CD = tQryObj.FACTORY_CD;
        tInObj.IS_SAMPLE = tQryObj.IS_SAMPLE;

        setLoadingTBL_KSV_CAPABOOK_MEM1(true);
        serviceS0208_CAPABOOK_RECORD_BVT
            .mgrQuery_SEARCH_ORDER2(tInObj)
            .then((data) => {
                setLoadingTBL_KSV_CAPABOOK_MEM1(false);
                if (typeof data.graphQLErrors === "undefined") {
                    if (data.length > 0) {
                        setSaveOrderArray(data);
                        var tInObj2 = {};
                        tInObj2.ORDER_CD = tEdtObj.ORDER_CD;
                        process_REFRESH_SUB(tInObj2, data);
                    }
                } else {
                    toast.current.show({
                        severity: "success",
                        summary: "Query Error",
                        detail: "Error",
                        life: 3000,
                    });
                }
            });
    };

    const process_REFRESH_SUB = (argData1, argData2) => {
        var tObj = { ...argData1 };
        var tSelOrder = {};
        var tSelStyle = {};

        var tFlag = 0;
        var tPoCd = "";
        argData2.forEach((col, i) => {
            if (col.ORDER.ORDER_CD === tObj.ORDER_CD) {
                tSelOrder = { ...col.ORDER };
                tSelStyle = { ...col.STYLE };
                tPoCd = col.PO_CD;
                tFlag = 1;
            }
        });

        if (tFlag === 0) {
            console.log(`Search Record: ${tFlag}, ${saveOrderArray.length} `);
            return;
        }

        var tRetDate = serviceLib.getCurrDate().substring(0, 8);

        var tRowObj = { ...dataTBL_KSV_CAPABOOK_MEM1 };

        var _argData = { ...dataEDT_KSV_CAPABOOK_MEM };
        _argData.IN_DATE = tRetDate;
        _argData.STYLE_CD = tSelOrder.STYLE_CD;
        _argData.STYLE_NAME = tSelStyle.STYLE_NAME;
        _argData.BUYER_NAME = _argData.BUYEr_NAME;
        _argData.BUYER_CD = tSelOrder.ORDER_CD.substring(0, 2);
        if (tRowObj.JOB_CD === "I") _argData.JOB_CD = "I";
        else _argData.JOB_CD = "U";
        _argData.PO_CD = tPoCd;
        _argData.ORDER_CD = tSelOrder.ORDER_CD;
        _argData.FOB = tSelOrder.USD_PRICE;
        _argData.QTY = tSelOrder.TOT_CNT;
        _argData.NR = _argData.NR;
        _argData.REMARK = _argData.REMARK;

        // _argData.EXF = tSelOrder.MATL_DUE_DATE;
        // _argData.M_ETA = tSelOrder.PO_M_ETA;
        _argData.EXF = _argData.EXF;
        _argData.M_ETA = _argData.M_ETA;

        _argData.ETD = tSelOrder.DUE_DATE;
        _argData.EXP_CMPT = _argData.EXP_CMPT;

        _argData.MW = tSelStyle.MW;
        _argData.BVT_KIND = tSelStyle.BVT_KIND;
        _argData.TPR = tSelStyle.TPR;
        _argData.EMBOSSING = tSelStyle.EMBOSSING;
        _argData.WASHING = tSelStyle.WASHING;
        _argData.DL = tSelStyle.DL;
        _argData.S = tSelStyle.S;
        _argData.FND = tSelStyle.FND;
        _argData.DOWN = tSelStyle.DOWN;
        _argData.CUT = tSelStyle.CUT;
        _argData.EMBRO = tSelStyle.EMBRO;
        _argData.TP = tSelStyle.TP;
        _argData.SP = tSelStyle.SP;
        _argData.LTHR = tSelStyle.LTHR;
        _argData.G = tSelStyle.G;
        _argData.W = tSelStyle.W;
        _argData.FTP = tSelStyle.FTP;
        _argData.DTP = tSelStyle.DTP;
        _argData.ETD = _argData.ETD;
        _argData.NEGO_TYPE = _argData.NEGO_TYPE;
        _argData.LAZE = tSelStyle.LAZE;
        _argData.SEQ = _argData.SEQ;
        _argData.BUYER_TEAM = tSelOrder.BUYER_TEAM;
        setDataEDT_KSV_CAPABOOK_MEM(_argData);

        // setDataEDT_KSV_CAPABOOK_MEM_NR(datasEDT_KSV_CAPABOOK_MEM_NR[0]);

        var tObj1 = {};
        var tFlag1 = 0;
        datasEDT_KSV_CAPABOOK_MEM_BVT_KIND.forEach((col, i) => {
            if (col.CD_CODE === tSelStyle.BVT_KIND) {
                tObj1 = { ...col };
                tFlag1 = 1;
            }
        });
        if (tFlag === 1) setDataEDT_KSV_CAPABOOK_MEM_BVT_KIND(tObj1);
        else
            setDataEDT_KSV_CAPABOOK_MEM_BVT_KIND(
                datasEDT_KSV_CAPABOOK_MEM_BVT_KIND[0],
            );

        // setDatasTBL_KSV_CAPABOOK_MEM1([]);

        setDatasTBL_QRY_CAPA_ORDER3([]);
        setSelectedTBL_QRY_CAPA_ORDER3([]);
    };

    const process_APPLY = () => {
        var tObj = { ...dataQRY_CAPA_ORDER2 };
        var tSelOrder = {};
        var tSelStyle = {};
        var tSelBookDate = "";

        var tFlag = 0;
        var tPoCd = 0;
        saveOrderArray.forEach((col, i) => {
            if (col.ORDER.ORDER_CD === tObj.ORDER_CD) {
                tSelOrder = { ...col.ORDER };
                tSelStyle = { ...col.STYLE };
                tSelBookDate = col.BOOK_DATE;
                tPoCd = col.PO_CD;
                tFlag = 1;
            }
        });

        if (tSelBookDate !== "" && typeof tSelBookDate !== "undefined") {
            alert(`이미 Capa처리된 Order 입니다.(${tSelBookDate})`);
            return;
        }
        if (tFlag === 0) {
            console.log(`Search Record: ${tFlag}, ${saveOrderArray.length} `);
            return;
        }

        var tRetDate = serviceLib.getCurrDate().substring(0, 8);

        var _argData = { ...dataEDT_KSV_CAPABOOK_MEM };
        _argData.IN_DATE = tRetDate;
        _argData.STYLE_CD = tSelOrder.STYLE_CD;
        _argData.STYLE_NAME = tSelStyle.STYLE_NAME;
        _argData.BUYER_NAME = "";
        _argData.BUYER_CD = tSelOrder.ORDER_CD.substring(0, 2);
        _argData.JOB_CD = "I";
        _argData.PO_CD = tPoCd;
        _argData.ORDER_CD = tSelOrder.ORDER_CD;
        _argData.FOB = tSelOrder.USD_PRICE;
        _argData.QTY = tSelOrder.TOT_CNT;

        // _argData.NR = '';
        // _argData.REMARK = '';
        _argData.EXF = tSelOrder.DUE_DATE;
        if (_argData.M_ETA === "") _argData.M_ETA = tSelOrder.PO_M_ETA;
        var tCurrDate = serviceLib.getCurrDate().substring(0, 8);
        if (_argData.APPROVAL_DATE === "") _argData.APPROVAL_DATE = tCurrDate;

        _argData.EXP_CMPT = "0";

        _argData.MW = tSelStyle.MW;
        _argData.BVT_KIND = tSelStyle.BVT_KIND;
        _argData.TPR = tSelStyle.TPR;
        _argData.EMBOSSING = tSelStyle.EMBOSSING;
        _argData.WASHING = tSelStyle.WASHING;
        _argData.DL = tSelStyle.DL;
        _argData.S = tSelStyle.S;
        _argData.FND = tSelStyle.FND;
        _argData.DOWN = tSelStyle.DOWN;
        _argData.CUT = tSelStyle.CUT;
        _argData.EMBRO = tSelStyle.EMBRO;
        _argData.TP = tSelStyle.TP;
        _argData.SP = tSelStyle.SP;
        _argData.LTHR = tSelStyle.LTHR;
        _argData.G = tSelStyle.G;
        _argData.W = tSelStyle.W;
        _argData.FTP = tSelStyle.FTP;
        _argData.DTP = tSelStyle.DTP;
        _argData.ETD = "";
        _argData.NEGO_TYPE = "0";
        _argData.LAZE = tSelStyle.LAZE;
        _argData.SEQ = 1;
        _argData.BUYER_TEAM = tSelOrder.BUYER_TEAM;
        console.log(datasEDT_KSV_CAPABOOK_MEM_NR);
        _argData.NR = datasEDT_KSV_CAPABOOK_MEM_NR[1]?.CD_CODE;
        setDataEDT_KSV_CAPABOOK_MEM(_argData);
        setDataEDT_KSV_CAPABOOK_MEM_NR(datasEDT_KSV_CAPABOOK_MEM_NR[1] || {});

        var tObj1 = {};
        var tFlag1 = 0;
        datasEDT_KSV_CAPABOOK_MEM_BVT_KIND.forEach((col, i) => {
            if (col.CD_CODE === tSelStyle.BVT_KIND) {
                tObj1 = { ...col };
                tFlag1 = 1;
            }
        });
        if (tFlag === 1) setDataEDT_KSV_CAPABOOK_MEM_BVT_KIND(tObj1);
        else
            setDataEDT_KSV_CAPABOOK_MEM_BVT_KIND(
                datasEDT_KSV_CAPABOOK_MEM_BVT_KIND[0],
            );

        setDatasTBL_KSV_CAPABOOK_MEM1([]);

        setDatasTBL_QRY_CAPA_ORDER3([]);
        setSelectedTBL_QRY_CAPA_ORDER3([]);

        setDataQRY_CAPA_ORDER2(emptyQRY_CAPA_ORDER2);
        setIsAddOrder(false);
    };

    const process_CANCEL = () => {
        hideDialog();
    };

    /*TABLE KSV_CAPABOOK_MEM */
    // DEFINE DATAGRID : TBL_QRY_CAPA_ORDER3
    const [datasTBL_QRY_CAPA_ORDER3, setDatasTBL_QRY_CAPA_ORDER3] = useState(
        [],
    );
    const dt_TBL_QRY_CAPA_ORDER3 = useRef(null);
    const [dataTBL_QRY_CAPA_ORDER3, setDataTBL_QRY_CAPA_ORDER3] = useState(
        emptyTBL_QRY_CAPA_ORDER3,
    );
    const [selectedTBL_QRY_CAPA_ORDER3, setSelectedTBL_QRY_CAPA_ORDER3] =
        useState([]);
    const [
        flagSelectModeTBL_QRY_CAPA_ORDER3,
        setFlagSelectModeTBL_QRY_CAPA_ORDER3,
    ] = useState(false);
    const [loadingTBL_QRY_CAPA_ORDER3, setLoadingTBL_QRY_CAPA_ORDER3] =
        useState(false);

    // DATAGRID CODE : TBL_QRY_CAPA_ORDER3

    const onRowClick1TBL_QRY_CAPA_ORDER3 = (argData0) => {
        var tObj = { ...dataQRY_CAPA_ORDER2 };
        tObj.ORDER_CD = argData0?.ORDER_CD || "";
        tObj.STYLE_CD = argData0?.STYLE_CD || "";
        tObj.STYLE_NAME = argData0?.STYLE_NAME || "";
        setDataQRY_CAPA_ORDER2(tObj);
    };

    const onRowClickTBL_QRY_CAPA_ORDER3 = (event) => {};

    const [isAddOrder, setIsAddOrder] = useState(false);
    const hideDialog = () => {
        setIsAddOrder(false);
        setDataQRY_CAPA_ORDER2_STYLE_CD2("");
        setDataQRY_CAPA_ORDER2_ORDER_CD2("");
        setDatasTBL_QRY_CAPA_ORDER3([]);
    };

    const [isSelUpdate, setIsSelUpdate] = useState(false);
    const hideDialogSelUpdate = () => {
        setIsSelUpdate(false);
        setDatasTBL_KSV_CAPABOOK_MEM5([]);
    };

    const reset_ORDER2 = () => {
        setDataQRY_CAPA_ORDER2_STYLE_CD2("");
        setDataQRY_CAPA_ORDER2_ORDER_CD2("");
        setDatasTBL_QRY_CAPA_ORDER3([]);
    };

    // Program Start
    useEffect(() => {
        var tUserInfo = serviceLib.getUserInfo();

        // 아래 Sales 팀유저만  사용할수 있도록 함.
        // won21kr, lih7912 는 권한강제 부여함.  그외 사용자는 조회및 수정불가.
        if (tUserInfo.USER_ID === "won21kr" || tUserInfo.USER_ID === "lih7912")
            setIsSystem(false);

        let _tUserId = "";

        serviceS0208_CAPABOOK_RECORD_BVT
            .mgrQueryCAPABOOK_CODE(_tUserId)
            .then((data) => {
                if (typeof data.graphQLErrors === "undefined") {
                    setDatasEDT_KSV_CAPABOOK_MEM_BVT_KIND(data.BVT_KIND);
                    setDataEDT_KSV_CAPABOOK_MEM_BVT_KIND(data.BVT_KIND[0]);

                    setDatasQRY_KSV_CAPABOOK_MEM_FACTORY_CD(data.FACTORY_CD);
                    setDataQRY_KSV_CAPABOOK_MEM_FACTORY_CD(data.FACTORY_CD[0]);

                    let _tQryObj = { ...emptyQRY_KSV_CAPABOOK_MEM };
                    var tUserInfo = serviceLib.getUserInfo();
                    setDatasQRY_KSV_CAPABOOK_MEM_USER_NAME(data.CAPA_USER);
                    var tObj0 = {};
                    data.CAPA_USER.forEach((col, i) => {
                        if (col.CD_CODE === tUserInfo.USER_ID) {
                            tObj0 = { ...col };
                        }
                    });
                    if (typeof tObj0.CD_CODE !== "undefined") {
                        setDataQRY_KSV_CAPABOOK_MEM_USER_NAME(tObj0);
                        _tQryObj.USER_NAME = tObj0.CD_CODE;
                    } else {
                        setDataQRY_KSV_CAPABOOK_MEM_USER_NAME(
                            data.CAPA_USER[0],
                        );
                        _tQryObj.USER_NAME = "";
                    }
                    setDataQRY_KSV_CAPABOOK_MEM(_tQryObj);
                } else {
                    // console.log("serviceS0208_CAPABOOK_RECORD_BVT.mgrQueryCAPABOOK_DATE error => " + JSON.stringify(data.graphQLErrors));
                    toast.current.show({
                        severity: "success",
                        summary: "Query Error",
                        detail: "ERROR",
                        life: 3000,
                    });
                }
            });

        var tArray0 = [];
        var tObj0 = {};
        tObj0.CD_CODE = "";
        tObj0.CD_NAME = " ";
        tArray0.push(tObj0);
        setDatasEDT_KSV_CAPABOOK_MEM_NR(tArray0);
        setDataEDT_KSV_CAPABOOK_MEM_NR(tArray0[0]);

        // 공장쪽 Style Parameter
        serviceS0200_KCD_STYLE.mgr1KcdStyleCode("").then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                setDatasEDT_KSV_CAPABOOK_MEM_BVT_KIND(data.T_KCD_STYLE_KIND);
                setDataEDT_KSV_CAPABOOK_MEM_BVT_KIND(data.T_KCD_STYLE_KIND[0]);

                setDatasEDT_KSV_CAPABOOK_MEM_DL(data.T_KCD_STYLE_DL);
                setDataEDT_KSV_CAPABOOK_MEM_DL(data.T_KCD_STYLE_DL[0]);

                setDatasEDT_KSV_CAPABOOK_MEM_MW(data.T_KCD_STYLE_MW);
                setDataEDT_KSV_CAPABOOK_MEM_MW(data.T_KCD_STYLE_MW[0]);

                setDatasEDT_KSV_CAPABOOK_MEM_EMBRO(data.T_KCD_STYLE_EMBRO);
                setDataEDT_KSV_CAPABOOK_MEM_EMBRO(data.T_KCD_STYLE_EMBRO[0]);

                setDatasEDT_KSV_CAPABOOK_MEM_SP(data.T_KCD_STYLE_SP);
                setDataEDT_KSV_CAPABOOK_MEM_SP(data.T_KCD_STYLE_SP[0]);

                setDatasEDT_KSV_CAPABOOK_MEM_TP(data.T_KCD_STYLE_TP);
                setDataEDT_KSV_CAPABOOK_MEM_TP(data.T_KCD_STYLE_TP[0]);

                setDatasEDT_KSV_CAPABOOK_MEM_LTHR(data.T_KCD_STYLE_LTHR);
                setDataEDT_KSV_CAPABOOK_MEM_LTHR(data.T_KCD_STYLE_LTHR[0]);

                setDatasEDT_KSV_CAPABOOK_MEM_G(data.T_KCD_STYLE_G);
                setDataEDT_KSV_CAPABOOK_MEM_G(data.T_KCD_STYLE_G[0]);

                setDatasEDT_KSV_CAPABOOK_MEM_W(data.T_KCD_STYLE_W);
                setDataEDT_KSV_CAPABOOK_MEM_W(data.T_KCD_STYLE_W[0]);

                setDatasEDT_KSV_CAPABOOK_MEM_LAZE(data.T_KCD_STYLE_LAZE);
                setDataEDT_KSV_CAPABOOK_MEM_LAZE(data.T_KCD_STYLE_LAZE[0]);

                setDatasEDT_KSV_CAPABOOK_MEM_S(data.T_KCD_STYLE_S);
                setDataEDT_KSV_CAPABOOK_MEM_S(data.T_KCD_STYLE_S[0]);

                setDatasEDT_KSV_CAPABOOK_MEM_FND(data.T_KCD_STYLE_FND);
                setDataEDT_KSV_CAPABOOK_MEM_FND(data.T_KCD_STYLE_FND[0]);

                setDatasEDT_KSV_CAPABOOK_MEM_EMBOSSING(
                    data.T_KCD_STYLE_EMBOSSING,
                );
                setDataEDT_KSV_CAPABOOK_MEM_EMBOSSING(
                    data.T_KCD_STYLE_EMBOSSING[0],
                );

                setDatasEDT_KSV_CAPABOOK_MEM_WASHING(data.T_KCD_STYLE_WASHING);
                setDataEDT_KSV_CAPABOOK_MEM_WASHING(
                    data.T_KCD_STYLE_WASHING[0],
                );

                setDatasEDT_KSV_CAPABOOK_MEM_CUT(data.T_KCD_STYLE_CUT);
                setDataEDT_KSV_CAPABOOK_MEM_CUT(data.T_KCD_STYLE_CUT[0]);

                setDatasEDT_KSV_CAPABOOK_MEM_FTP(data.T_KCD_STYLE_FTP);
                setDataEDT_KSV_CAPABOOK_MEM_FTP(data.T_KCD_STYLE_FTP[0]);

                setDatasEDT_KSV_CAPABOOK_MEM_DTP(data.T_KCD_STYLE_DTP);
                setDataEDT_KSV_CAPABOOK_MEM_DTP(data.T_KCD_STYLE_DTP[0]);

                setDatasEDT_KSV_CAPABOOK_MEM_DOWN(data.T_KCD_STYLE_DOWN);
                setDataEDT_KSV_CAPABOOK_MEM_DOWN(data.T_KCD_STYLE_DOWN[0]);

                setDatasEDT_KSV_CAPABOOK_MEM_UNIT(data.T_KCD_STYLE_UNIT);
                setDataEDT_KSV_CAPABOOK_MEM_UNIT(data.T_KCD_STYLE_UNIT[0]);

                setDatasEDT_KSV_CAPABOOK_MEM_PURPOSE(data.T_KCD_STYLE_PURPOSE);
                setDataEDT_KSV_CAPABOOK_MEM_PURPOSE(
                    data.T_KCD_STYLE_PURPOSE[0],
                );

                setDatasEDT_KSV_CAPABOOK_MEM_FABRIC(data.T_KCD_STYLE_FABRIC);
                setDataEDT_KSV_CAPABOOK_MEM_FABRIC(data.T_KCD_STYLE_FABRIC[0]);

                setDatasEDT_KSV_CAPABOOK_MEM_USAGE(
                    data.T_KCD_STYLE_SAMPLE_USAGE,
                );
                setDataEDT_KSV_CAPABOOK_MEM_USAGE(
                    data.T_KCD_STYLE_SAMPLE_USAGE[0],
                );
            } else {
            }
        });
    }, []);

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

    const [clickedRowId, setClickedRowId] = useState(null);

    useEffect(() => {
        if (clickedRowId !== null && datasTBL_KSV_CAPABOOK_MEM1.length > 0) {
        }
    }, [clickedRowId, datasTBL_KSV_CAPABOOK_MEM1]);

    return (
        <div className="af-div-main">
            <div style={{ width: "123rem", height: "22rem " }}>
                <div
                    style={{
                        marginTop: "5px",
                        padding: "5px",
                        width: "123rem",
                        height: "2.5rem ",
                        gap: "10px",
                        display: "flex",
                    }}
                >
                    <span style={{ marginLeft: "22px" }}> Book Date </span>
                    <InputText
                        disabled
                        style={{ width: "9rem" }}
                        value={dataQRY_KSV_CAPABOOK_MEM.NEW_DATE}
                        onChange={(e) =>
                            onInputChangeQRY_KSV_CAPABOOK_MEM_NEW_DATE(
                                e,
                                "NEW_DATE",
                            )
                        }
                    />

                    <span> Dept </span>
                    <Dropdown
                        disabled={isSystem}
                        style={{ width: "9rem" }}
                        value={dataQRY_KSV_CAPABOOK_MEM_USER_NAME}
                        onChange={(e) =>
                            onDropdownChangeQRY_KSV_CAPABOOK_MEM_USER_NAME(
                                e,
                                "USER_NAME",
                            )
                        }
                        options={datasQRY_KSV_CAPABOOK_MEM_USER_NAME}
                        optionLabel="CD_NAME"
                        placeholder=""
                        editable
                    ></Dropdown>
                    <span> Sample </span>
                    <Checkbox
                        id="id_IS_SAMPLE"
                        checked={changeCheckBoxVal(
                            dataQRY_KSV_CAPABOOK_MEM.IS_SAMPLE,
                        )}
                        onChange={(e) =>
                            onCheckboxChangeQRY_KSV_CAPABOOK_MEM_IS_SAMPLE(
                                e,
                                "IS_SAMPLE",
                            )
                        }
                    />

                    <span> Factory </span>
                    <Dropdown
                        style={{ width: "9rem" }}
                        value={dataQRY_KSV_CAPABOOK_MEM_FACTORY_CD}
                        onChange={(e) =>
                            onDropdownChangeQRY_KSV_CAPABOOK_MEM_FACTORY_CD(
                                e,
                                "FACTORY_CD",
                            )
                        }
                        options={datasQRY_KSV_CAPABOOK_MEM_FACTORY_CD}
                        optionLabel="CD_NAME"
                        placeholder=""
                        editable
                    ></Dropdown>
                    <span> PO# </span>
                    <InputText
                        style={{ width: "9rem" }}
                        value={dataQRY_KSV_CAPABOOK_MEM.PO_CD}
                        onChange={(e) =>
                            onInputChangeQRY_KSV_CAPABOOK_MEM_PO_CD(e, "PO_CD")
                        }
                    />

                    <span> Buyer# </span>
                    <InputText
                        style={{ width: "9rem" }}
                        value={dataQRY_KSV_CAPABOOK_MEM.BUYER_CD}
                        onChange={(e) =>
                            onInputChangeQRY_KSV_CAPABOOK_MEM_BUYER_CD(
                                e,
                                "BUYER_CD",
                            )
                        }
                    />

                    <span> Order# </span>
                    <InputText
                        style={{ width: "9rem" }}
                        value={dataQRY_KSV_CAPABOOK_MEM.ORDER_CD}
                        onChange={(e) =>
                            onInputChangeQRY_KSV_CAPABOOK_MEM_ORDER_CD(
                                e,
                                "ORDER_CD",
                            )
                        }
                    />

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
                        style={{ width: "9rem", marginLeft: "20px" }}
                        className="p-button-text"
                        onClick={search_LIST_1}
                    />

                    <Button
                        label="Excel"
                        style={{ width: "9rem" }}
                        className="p-button-text green"
                        onClick={exportExcelTBL_KSV_CAPABOOK_MEM}
                    />
                </div>

                <div
                    className="af-div-first"
                    style={{ width: "85rem", height: "15rem" }}
                >
                    <span className="af-span-3-0" style={{ width: "26rem" }}>
                        <p className="af-span-p" style={{ width: "7rem" }}>Book Date</p>
                        <div className="af-span-div" style={{ width: "18rem" }}>
                            <Calendar
                                showButtonBar
                                disabled
                                style={{ width: "18rem" }}
                                dateFormat="yy-mm-dd"
                                id="id_EXF"
                                value={changeDateVal(
                                    dataEDT_KSV_CAPABOOK_MEM.IN_DATE,
                                )}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_CAPABOOK_MEM_IN_DATE(
                                        e,
                                        "IN_DATE",
                                    )
                                }
                            />
                        </div>
                    </span>
                    <span className="af-span-3-0" style={{ width: "26rem" }}>
                        <p className="af-span-p" style={{ width: "7rem" }}>Style#</p>
                        <div className="af-span-div" style={{ width: "10rem" }}>
                            <InputText
                                disabled
                                style={{ width: "10rem" }}
                                id="id_STYLE_CD"
                                value={dataEDT_KSV_CAPABOOK_MEM.STYLE_CD}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_CAPABOOK_MEM_STYLE_CD(
                                        e,
                                        "STYLE_CD",
                                    )
                                }
                            />
                        </div>
                        <div
                            className="af-span-div-btn"
                            style={{ width: "8rem" }}
                        >
                            <Button
                                label="Search Order"
                                style={{ width: "9rem" }}
                                className="p-button-text orange"
                                onClick={process_SEARCH_ORDER}
                            />
                        </div>
                    </span>
                    <span className="af-span-3-0" style={{ width: "26rem" }}>
                        <p className="af-span-p" style={{ width: "7rem" }}>M/W</p>
                        <div className="af-span-div" style={{ width: "18rem" }}>
                            <InputText
                                disabled
                                style={{ width: "18rem" }}
                                id="id_MW"
                                value={dataEDT_KSV_CAPABOOK_MEM.MW}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_CAPABOOK_MEM_MW(
                                        e,
                                        "MW",
                                    )
                                }
                            />
                        </div>
                    </span>

                    <span className="af-span-3" style={{ width: "26rem" }}>
                        <p className="af-span-p" style={{ width: "7rem" }}>Style Name</p>
                        <div className="af-span-div" style={{ width: "18rem" }}>
                            <InputText
                                disabled
                                style={{ width: "18rem" }}
                                id="id_STYLE_NAME"
                                value={dataEDT_KSV_CAPABOOK_MEM.STYLE_NAME}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_CAPABOOK_MEM_STYLE_NAME(
                                        e,
                                        "STYLE_NAME",
                                    )
                                }
                            />
                        </div>
                    </span>
                    <span className="af-span-3" style={{ width: "26rem" }}>
                        <p className="af-span-p" style={{ width: "7rem" }}>Order#</p>
                        <div className="af-span-div" style={{ width: "10rem" }}>
                            <InputText
                                disabled
                                style={{ width: "10rem" }}
                                id="id_ORDER_CD"
                                value={dataEDT_KSV_CAPABOOK_MEM.ORDER_CD}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_CAPABOOK_MEM_ORDER_CD(
                                        e,
                                        "ORDER_CD",
                                    )
                                }
                            />
                        </div>
                        <div
                            className="af-span-div-btn"
                            style={{ width: "7rem" }}
                        >
                            <Button
                                label="Refresh"
                                style={{ width: "9rem" }}
                                className="p-button-text"
                                onClick={process_REFRESH}
                            />
                        </div>
                    </span>
                    <span className="af-span-3" style={{ width: "26rem" }}>
                        <p className="af-span-p" style={{ width: "7rem" }}>Buyer#</p>
                        <div className="af-span-div" style={{ width: "18rem" }}>
                            <InputText
                                disabled
                                style={{ width: "18rem" }}
                                id="id_BUYER_CD"
                                value={dataEDT_KSV_CAPABOOK_MEM.BUYER_CD}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_CAPABOOK_MEM_BUYER_CD(
                                        e,
                                        "BUYER_CD",
                                    )
                                }
                            />
                        </div>
                    </span>
                    <span className="af-span-3" style={{ width: "26rem" }}>
                        <p className="af-span-p" style={{ width: "7rem" }}>Approval Date</p>
                        <div className="af-span-div" style={{ width: "18rem" }}>
                            <Calendar
                                showButtonBar
                                style={{ width: "18rem" }}
                                dateFormat="yy-mm-dd"
                                id="id_EXF"
                                value={changeDateVal(
                                    dataEDT_KSV_CAPABOOK_MEM.APPROVAL_DATE,
                                )}
                                onChange={(e) =>
                                    onCalChangeEDT_KSV_CAPABOOK_MEM_APPROVAL_DATE(
                                        e,
                                        "APPROVAL_DATE",
                                    )
                                }
                            />
                        </div>
                    </span>
                    <span className="af-span-3" style={{ width: "26rem" }}>
                        <p className="af-span-p" style={{ width: "7rem" }}>M ETA</p>
                        <div className="af-span-div" style={{ width: "18rem" }}>
                            <Calendar
                                showButtonBar
                                style={{ width: "18rem" }}
                                dateFormat="yy-mm-dd"
                                id="id_M_ETA"
                                value={changeDateVal(
                                    dataEDT_KSV_CAPABOOK_MEM.M_ETA,
                                )}
                                onChange={(e) =>
                                    onCalChangeEDT_KSV_CAPABOOK_MEM_M_ETA(
                                        e,
                                        "M_ETA",
                                    )
                                }
                            />
                        </div>
                    </span>
                    <span className="af-span-3" style={{ width: "26rem" }}>
                        <p className="af-span-p" style={{ width: "7rem" }}>EXF</p>
                        <div className="af-span-div" style={{ width: "18rem" }}>
                            <Calendar
                                showButtonBar
                                style={{ width: "18rem" }}
                                dateFormat="yy-mm-dd"
                                id="id_EXF"
                                value={changeDateVal(
                                    dataEDT_KSV_CAPABOOK_MEM.EXF,
                                )}
                                onChange={(e) =>
                                    onCalChangeEDT_KSV_CAPABOOK_MEM_EXF(
                                        e,
                                        "EXF",
                                    )
                                }
                            />
                        </div>
                    </span>

                    <span className="af-span-3" style={{ width: "26rem" }}>
                        <p className="af-span-p" style={{ width: "7rem" }}>PO#</p>
                        <div className="af-span-div" style={{ width: "18rem" }}>
                            <InputText
                                disabled
                                style={{ width: "18rem" }}
                                id="id_PO_CD"
                                value={dataEDT_KSV_CAPABOOK_MEM.PO_CD}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_CAPABOOK_MEM_PO_CD(
                                        e,
                                        "PO_CD",
                                    )
                                }
                            />
                        </div>
                    </span>
                    <span className="af-span-3" style={{ width: "26rem" }}>
                        <p className="af-span-p" style={{ width: "7rem" }}>FOB</p>
                        <div className="af-span-div" style={{ width: "18rem" }}>
                            <InputText
                                disabled
                                style={{ width: "18rem" }}
                                id="id_FOB"
                                value={dataEDT_KSV_CAPABOOK_MEM.FOB}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_CAPABOOK_MEM_FOB(
                                        e,
                                        "FOB",
                                    )
                                }
                            />
                        </div>
                    </span>
                    <span className="af-span-3" style={{ width: "26rem" }}>
                        <p className="af-span-p" style={{ width: "7rem" }}>Exp CMPT</p>
                        <div className="af-span-div" style={{ width: "18rem" }}>
                            <InputText
                                disabled={expCmptDisable}
                                style={{ width: "18rem" }}
                                id="id_EXP_CMPT"
                                value={dataEDT_KSV_CAPABOOK_MEM.EXP_CMPT}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_CAPABOOK_MEM_EXP_CMPT(
                                        e,
                                        "EXP_CMPT",
                                    )
                                }
                            />
                        </div>
                    </span>

                    <span className="af-span-3" style={{ width: "26rem" }}>
                        <p className="af-span-p" style={{ width: "7rem" }}>Qty</p>
                        <div className="af-span-div" style={{ width: "18rem" }}>
                            <InputText
                                disabled
                                style={{ width: "18rem" }}
                                id="id_QTY"
                                value={dataEDT_KSV_CAPABOOK_MEM.QTY}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_CAPABOOK_MEM_QTY(
                                        e,
                                        "QTY",
                                    )
                                }
                            />
                        </div>
                    </span>
                    <span className="af-span-3" style={{ width: "26rem" }}>
                        <p className="af-span-p" style={{ width: "7rem" }}>New/Repeat</p>
                        <div className="af-span-div" style={{ width: "18rem" }}>
                            <Dropdown
                                disabled={isNR}
                                style={{ width: "18rem" }}
                                id="id_NR"
                                value={dataEDT_KSV_CAPABOOK_MEM_NR}
                                onChange={(e) =>
                                    onDropdownChangeEDT_KSV_CAPABOOK_MEM_NR(
                                        e,
                                        "NR",
                                    )
                                }
                                options={datasEDT_KSV_CAPABOOK_MEM_NR}
                                optionLabel="CD_NAME"
                                placeholder=""
                                editable
                            ></Dropdown>
                        </div>
                    </span>
                    <span className="af-span-3" style={styleSample}>
                        <p className="af-span-p" style={{ width: "7rem" }}>Usage</p>
                        <div className="af-span-div" style={{ width: "18rem" }}>
                            <Dropdown
                                style={{ width: "18rem" }}
                                id="id_NR"
                                value={dataEDT_KSV_CAPABOOK_MEM_USAGE}
                                onChange={(e) =>
                                    onDropdownChangeEDT_KSV_CAPABOOK_MEM_USAGE(
                                        e,
                                        "USAGE",
                                    )
                                }
                                options={datasEDT_KSV_CAPABOOK_MEM_USAGE}
                                optionLabel="CD_NAME"
                                placeholder=""
                                editable
                            ></Dropdown>
                        </div>
                    </span>

                    <span className="af-span-3" style={{ width: "52rem" }}>
                        <p className="af-span-p" style={{ width: "7rem" }}>Remark</p>
                        <div className="af-span-div" style={{ width: "40rem" }}>
                            <InputText
                                style={{ width: "44rem" }}
                                id="id_REMARK"
                                value={dataEDT_KSV_CAPABOOK_MEM.REMARK}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_CAPABOOK_MEM_REMARK(
                                        e,
                                        "REMARK",
                                    )
                                }
                            />
                        </div>
                    </span>
                </div>

                <div
                    className="af-div-second"
                    style={{ width: "38rem", height: "14rem" }}
                >
                    <span className="af-span-3-0" style={{ width: "12rem" }}>
                        <p className="af-span-p" style={{ width: "7rem" }}>TPR</p>
                        <div className="af-span-div" style={{ width: "4rem" }}>
                            <InputText
                                style={{ width: "4rem" }}
                                id="id_TPR"
                                value={dataEDT_KSV_CAPABOOK_MEM.TPR}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_CAPABOOK_MEM_TPR(
                                        e,
                                        "TPR",
                                    )
                                }
                                disabled
                            />
                        </div>
                    </span>
                    <span className="af-span-3-0" style={{ width: "12rem" }}>
                        <p className="af-span-p" style={{ width: "7rem" }}>Embossing</p>
                        <div className="af-span-div" style={{ width: "4rem" }}>
                            <InputText
                                style={{ width: "4rem" }}
                                id="id_EMBOSSING"
                                value={dataEDT_KSV_CAPABOOK_MEM.EMBOSSING}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_CAPABOOK_MEM_EMBOSSING(
                                        e,
                                        "EMBOSSING",
                                    )
                                }
                                disabled
                            />
                        </div>
                    </span>
                    <span className="af-span-3-0" style={{ width: "12rem" }}>
                        <p className="af-span-p" style={{ width: "7rem" }}>Washing</p>
                        <div className="af-span-div" style={{ width: "4rem" }}>
                            <InputText
                                style={{ width: "4rem" }}
                                id="id_WASHING"
                                value={dataEDT_KSV_CAPABOOK_MEM.WASHING}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_CAPABOOK_MEM_WASHING(
                                        e,
                                        "WASHING",
                                    )
                                }
                                disabled
                            />
                        </div>
                    </span>
                    <span className="af-span-3" style={{ width: "12rem" }}>
                        <p className="af-span-p" style={{ width: "7rem" }}>DL</p>
                        <div className="af-span-div" style={{ width: "4rem" }}>
                            <InputText
                                style={{ width: "4rem" }}
                                id="id_DL"
                                value={dataEDT_KSV_CAPABOOK_MEM.DL}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_CAPABOOK_MEM_DL(
                                        e,
                                        "DL",
                                    )
                                }
                                disabled
                            />
                        </div>
                    </span>
                    <span className="af-span-3" style={{ width: "12rem" }}>
                        <p className="af-span-p" style={{ width: "7rem" }}>S</p>
                        <div className="af-span-div" style={{ width: "4rem" }}>
                            <InputText
                                style={{ width: "4rem" }}
                                id="id_S"
                                value={dataEDT_KSV_CAPABOOK_MEM.S}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_CAPABOOK_MEM_S(e, "S")
                                }
                                disabled
                            />
                        </div>
                    </span>
                    <span className="af-span-3" style={{ width: "12rem" }}>
                        <p className="af-span-p" style={{ width: "7rem" }}>4ND</p>
                        <div className="af-span-div" style={{ width: "4rem" }}>
                            <InputText
                                style={{ width: "4rem" }}
                                id="id_FND"
                                value={dataEDT_KSV_CAPABOOK_MEM.FND}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_CAPABOOK_MEM_FND(
                                        e,
                                        "FND",
                                    )
                                }
                                disabled
                            />
                        </div>
                    </span>
                    <span className="af-span-3" style={{ width: "12rem" }}>
                        <p className="af-span-p" style={{ width: "7rem" }}>Down</p>
                        <div className="af-span-div" style={{ width: "4rem" }}>
                            <InputText
                                style={{ width: "4rem" }}
                                id="id_DOWN"
                                value={dataEDT_KSV_CAPABOOK_MEM.DOWN}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_CAPABOOK_MEM_DOWN(
                                        e,
                                        "DOWN",
                                    )
                                }
                                disabled
                            />
                        </div>
                    </span>
                    <span className="af-span-3" style={{ width: "12rem" }}>
                        <p className="af-span-p" style={{ width: "7rem" }}>Cut</p>
                        <div className="af-span-div" style={{ width: "4rem" }}>
                            <InputText
                                style={{ width: "4rem" }}
                                id="id_CUT"
                                value={dataEDT_KSV_CAPABOOK_MEM.CUT}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_CAPABOOK_MEM_CUT(
                                        e,
                                        "CUT",
                                    )
                                }
                                disabled
                            />
                        </div>
                    </span>
                    <span className="af-span-3" style={{ width: "12rem" }}>
                        <p className="af-span-p" style={{ width: "7rem" }}>Embrodery</p>
                        <div className="af-span-div" style={{ width: "4rem" }}>
                            <InputText
                                style={{ width: "4rem" }}
                                id="id_EMBRO"
                                value={dataEDT_KSV_CAPABOOK_MEM.EMBRO}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_CAPABOOK_MEM_EMBRO(
                                        e,
                                        "EMBRO",
                                    )
                                }
                                disabled
                            />
                        </div>
                    </span>
                    <span className="af-span-3" style={{ width: "12rem" }}>
                        <p className="af-span-p" style={{ width: "7rem" }}>T/P</p>
                        <div className="af-span-div" style={{ width: "4rem" }}>
                            <InputText
                                style={{ width: "4rem" }}
                                id="id_TP"
                                value={dataEDT_KSV_CAPABOOK_MEM.TP}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_CAPABOOK_MEM_TP(
                                        e,
                                        "TP",
                                    )
                                }
                                disabled
                            />
                        </div>
                    </span>
                    <span className="af-span-3" style={{ width: "12rem" }}>
                        <p className="af-span-p" style={{ width: "7rem" }}>S/P</p>
                        <div className="af-span-div" style={{ width: "4rem" }}>
                            <InputText
                                style={{ width: "4rem" }}
                                id="id_SP"
                                value={dataEDT_KSV_CAPABOOK_MEM.SP}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_CAPABOOK_MEM_SP(
                                        e,
                                        "SP",
                                    )
                                }
                                disabled
                            />
                        </div>
                    </span>
                    <span className="af-span-3" style={{ width: "12rem" }}>
                        <p className="af-span-p" style={{ width: "7rem" }}>LTHR</p>
                        <div className="af-span-div" style={{ width: "4rem" }}>
                            <InputText
                                style={{ width: "4rem" }}
                                id="id_LTHR"
                                value={dataEDT_KSV_CAPABOOK_MEM.LTHR}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_CAPABOOK_MEM_LTHR(
                                        e,
                                        "LTHR",
                                    )
                                }
                                disabled
                            />
                        </div>
                    </span>
                    <span className="af-span-3" style={{ width: "12rem" }}>
                        <p className="af-span-p" style={{ width: "7rem" }}>G</p>
                        <div className="af-span-div" style={{ width: "4rem" }}>
                            <InputText
                                style={{ width: "4rem" }}
                                id="id_G"
                                value={dataEDT_KSV_CAPABOOK_MEM.G}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_CAPABOOK_MEM_G(e, "G")
                                }
                                disabled
                            />
                        </div>
                    </span>
                    <span className="af-span-3" style={{ width: "12rem" }}>
                        <p className="af-span-p" style={{ width: "7rem" }}>W</p>
                        <div className="af-span-div" style={{ width: "4rem" }}>
                            <InputText
                                style={{ width: "4rem" }}
                                id="id_W"
                                value={dataEDT_KSV_CAPABOOK_MEM.W}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_CAPABOOK_MEM_W(e, "W")
                                }
                                disabled
                            />
                        </div>
                    </span>
                    <span className="af-span-3" style={{ width: "12rem" }}>
                        <p className="af-span-p" style={{ width: "7rem" }}>FTP</p>
                        <div className="af-span-div" style={{ width: "4rem" }}>
                            <InputText
                                style={{ width: "4rem" }}
                                id="id_FTP"
                                value={dataEDT_KSV_CAPABOOK_MEM.FTP}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_CAPABOOK_MEM_FTP(
                                        e,
                                        "FTP",
                                    )
                                }
                                disabled
                            />
                        </div>
                    </span>
                    <span className="af-span-3" style={{ width: "12rem" }}>
                        <p className="af-span-p" style={{ width: "7rem" }}>DTP</p>
                        <div className="af-span-div" style={{ width: "4rem" }}>
                            <InputText
                                style={{ width: "4rem" }}
                                id="id_DTP"
                                value={dataEDT_KSV_CAPABOOK_MEM.DTP}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_CAPABOOK_MEM_DTP(
                                        e,
                                        "DTP",
                                    )
                                }
                                disabled
                            />
                        </div>
                    </span>

                    <span className="af-span-3" style={{ width: "25rem" }}>
                        <p className="af-span-p" style={{ width: "7rem" }}>Kind</p>
                        <div
                            className="af-span-div"
                            style={{ width: "16.5rem" }}
                        >
                            <Dropdown
                                disabled
                                style={{ width: "16.5rem" }}
                                id="id_BVT_KIND"
                                value={dataEDT_KSV_CAPABOOK_MEM_BVT_KIND}
                                onChange={(e) =>
                                    onDropdownChangeEDT_KSV_CAPABOOK_MEM_BVT_KIND(
                                        e,
                                        "BVT_KIND",
                                    )
                                }
                                options={datasEDT_KSV_CAPABOOK_MEM_BVT_KIND}
                                optionLabel="CD_NAME"
                                placeholder=""
                                editable
                            ></Dropdown>
                        </div>
                    </span>
                </div>

                <div
                    className="af-div-first"
                    style={{ width: "123rem", height: "3rem" }}
                >
                    <span className="af-span-3-0" style={{ width: "10rem" }}>
                        <div
                            className="af-span-div-btn"
                            style={{ width: "9rem" }}
                        >
                            <Button
                                style={{ width: "9rem" }}
                                label="Insert"
                                className="p-button-text"
                                onClick={process_INSERT_CAPA}
                            />
                        </div>
                    </span>
                    <span className="af-span-3-0" style={{ width: "10rem" }}>
                        <div
                            className="af-span-div-btn"
                            style={{ width: "9rem" }}
                        >
                            <Button
                                style={{ width: "9rem" }}
                                label="Ins Cancel"
                                className="p-button-text"
                                onClick={insertCancel}
                            />
                        </div>
                    </span>
                    <span className="af-span-3-0" style={{ width: "10rem" }}>
                        <div
                            className="af-span-div-btn"
                            style={{ width: "9rem" }}
                        >
                            <Button
                                style={{ width: "9rem" }}
                                label="Update"
                                className="p-button-text"
                                onClick={updateCAPA}
                            />
                        </div>
                    </span>
                    <span className="af-span-3-0" style={{ width: "10rem" }}>
                        <div
                            className="af-span-div-btn"
                            style={{ width: "9rem" }}
                        >
                            <Button
                                style={{ width: "9rem" }}
                                label="Upd Cancel"
                                className="p-button-text"
                                onClick={updateCancel}
                            />
                        </div>
                    </span>
                    <span className="af-span-3-0" style={{ width: "10rem" }}>
                        <div
                            className="af-span-div-btn"
                            style={{ width: "9rem" }}
                        >
                            <Button
                                style={{ width: "9rem" }}
                                label="Delete"
                                className="p-button-text"
                                onClick={deleteCAPA}
                            />
                        </div>
                    </span>
                    <span className="af-span-3-0" style={{ width: "10rem" }}>
                        <div
                            className="af-span-div-btn"
                            style={{ width: "9rem" }}
                        >
                            <Button
                                style={{ width: "9rem" }}
                                label="Del Cancel"
                                className="p-button-text"
                                onClick={deleteCancel}
                            />
                        </div>
                    </span>
                    <span className="af-span-3-0" style={{ width: "10rem" }}>
                        <div
                            className="af-span-div-btn"
                            style={{ width: "9rem" }}
                        >
                            <Button
                                style={{ width: "9rem" }}
                                label="End"
                                className="p-button-text"
                                onClick={endCAPA}
                            />
                        </div>
                    </span>
                    <span className="af-span-3-0" style={{ width: "10rem" }}>
                        <div
                            className="af-span-div-btn"
                            style={{ width: "9rem" }}
                        >
                            <Button
                                style={{ width: "9rem" }}
                                label="End Cancel"
                                className="p-button-text"
                                onClick={endCancel}
                            />
                        </div>
                    </span>
                    <span className="af-span-3-0" style={{ width: "10rem" }}>
                        <div
                            className="af-span-div-btn"
                            style={{ width: "9rem" }}
                        >
                            <Button
                                style={{ width: "9rem" }}
                                label="Reset"
                                className="p-button-text"
                                onClick={process_RESET}
                            />
                        </div>
                    </span>
                    <span className="af-span-3-0" style={{ width: "10rem" }}>
                        <div
                            className="af-span-div-btn"
                            style={{ width: "9rem" }}
                        >
                            <Button
                                style={{ width: "9rem" }}
                                label="Sel Update"
                                className="p-button-text"
                                onClick={popup_SEL_UPDATE}
                            />
                        </div>
                    </span>
                    <span className="af-span-3-0" style={{ width: "10rem" }}>
                        <div
                            className="af-span-div-btn"
                            style={{ width: "9rem" }}
                        >
                            <Button
                                style={{ width: "9rem" }}
                                label="Sel Refresh"
                                className="p-button-text"
                                onClick={process_CAPA_REFRESH}
                            />
                        </div>
                    </span>
                </div>
            </div>

            <div
                className="af-div-first"
                style={{ width: "123rem", height: "40rem" }}
            >
                <AFDataTable preventUnrelatedRerender
                    ref={dt_TBL_KSV_CAPABOOK_MEM1}
                    size="small"
                    value={datasTBL_KSV_CAPABOOK_MEM1}
                    loading={loadingTBL_KSV_CAPABOOK_MEM1}
                    tableStyle={{ tableLayout: "fixed" }}
                    resizableColumns
                    columnResizeMode="expand"
                    showGridlines
                    selectionMode="checkbox"
                    metaKeySelection={false}
                    selection={selectedTBL_KSV_CAPABOOK_MEM1}
                    onSelectionChange={(e) => {
                        setSelectedTBL_KSV_CAPABOOK_MEM1(e.value);
                        onRowClick1TBL_KSV_CAPABOOK_MEM1(e.value);
                    }}
                    onRowClick={(e) => {
                        onRowClickTBL_KSV_CAPABOOK_MEM1(e);
                    }}
                    dataKey="id"
                    className="datatable-responsive"
                    rowKey="id"
                    rowClassName={(rowData) =>
                        rowData.id === clickedRowId
                            ? `selected-bold-row scroll-row row-id-${rowData.id}`
                            : `scroll-row row-id-${rowData.id}`
                    }
                    virtualScrollerOptions={{ itemSize: 20, lazy: true }}
                    emptyMessage=" "
                    //header={headerTBL_KSV_CAPABOOK_MEM1}
                    responsiveLayout="scroll"
                    scrollable
                    scrollHeight="410px"
                >
                    <AFColumn selectionMode="multiple" field="__checkbox__" reorderable={false} headerClassName="t-header" headerStyle={{ width: "3rem" }} ></AFColumn>

                    <AFColumn style={{ width: "2rem" }} className="af-col" field="JOB_CD" headerClassName="t-header" header="Job" ></AFColumn>
                    <AFColumn style={{ width: "7rem" }} className="af-col" field="IN_DATE" headerClassName="t-header" header="In Date" body={(rowData) => serviceLib.dateFormat(rowData.IN_DATE) } ></AFColumn>
                    <AFColumn style={{ width: "10rem" }} className="af-col" field="BUYER_NAME" headerClassName="t-header" header="Buyer Name" ></AFColumn>
                    <AFColumn style={{ width: "6rem" }} className="af-col" field="BUYER_CD" headerClassName="t-header" header="Buyer CD" ></AFColumn>
                    <AFColumn style={{ width: "6rem" }} className="af-col" field="PO_CD" headerClassName="t-header" header="po#" ></AFColumn>
                    <AFColumn style={{ width: "7rem" }} className="af-col" field="ORDER_CD" headerClassName="t-header" header="Order#" ></AFColumn>
                    <AFColumn style={{ width: "10rem" }} className="af-col" field="STYLE_NAME" headerClassName="t-header" header="Style Name" ></AFColumn>
                    <AFColumn style={{ width: "6rem" }} className="af-col" field="STYLE_CD" headerClassName="t-header" header="Style CD" ></AFColumn>
                    <AFColumn style={widthNR} className="af-col" field="NR" headerClassName="t-header" header={colNR} ></AFColumn>

                    <AFColumn style={{ width: "6rem" }} className="af-col" field="QTY" headerClassName="t-header" header="Qty" bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.QTY) } ></AFColumn>
                    <AFColumn style={{ width: "6rem" }} className="af-col" field="MW" headerClassName="t-header" header="M/W" ></AFColumn>
                    {/*<AFColumn style={{ width: '7rem' }} className="af-col" field="SHIP_DATE" headerClassName='t-header' header="Ship Date" body ={rowData => serviceLib.dateFormat(rowData.SHIP_DATE)}></AFColumn>*/}
                    <AFColumn style={{ width: "7rem" }} className="af-col" field="S_ETA" headerClassName="t-header" header="Approval Date" body={(rowData) => serviceLib.dateFormat(rowData.S_ETA)} ></AFColumn>
                    <AFColumn style={{ width: "7rem" }} className="af-col" field="M_ETA" headerClassName="t-header" header="M ETA" body={(rowData) => serviceLib.dateFormat(rowData.M_ETA)} ></AFColumn>
                    <AFColumn style={{ width: "7rem" }} className="af-col" field="EXF" headerClassName="t-header" header="EXF" body={(rowData) => serviceLib.dateFormat(rowData.EXF)} ></AFColumn>

                    <AFColumn style={{ width: "4rem" }} className="af-col" field="REMARK" headerClassName="t-header" header="Remark" ></AFColumn>
                    <AFColumn style={{ width: "4rem" }} className="af-col" field="USAGE_N" headerClassName="t-header" header="Usage" ></AFColumn>
                    <AFColumn style={{ width: "6rem" }} className="af-col" field="FOB" headerClassName="t-header" header="FOB" bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.FOB, 4) } ></AFColumn>
                    <AFColumn style={{ width: "6rem" }} className="af-col" field="EXP_CMPT" headerClassName="t-header" header="Exp CMPT" bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.EXP_CMPT, 2) } ></AFColumn>
                    <AFColumn style={{ width: "6rem" }} className="af-col" field="NEGO_TYPE" headerClassName="t-header" header="Nego" ></AFColumn>
                    <AFColumn style={{ width: "4rem" }} className="af-col" field="EMBRO" headerClassName="t-header" header="EMBRO" ></AFColumn>
                    <AFColumn style={{ width: "4rem" }} className="af-col" field="TP" headerClassName="t-header" header="T/P" ></AFColumn>
                    <AFColumn style={{ width: "4rem" }} className="af-col" field="SP" headerClassName="t-header" header="S/P" ></AFColumn>
                    <AFColumn style={{ width: "4rem" }} className="af-col" field="LTHR" headerClassName="t-header" header="LTHR" ></AFColumn>
                    <AFColumn style={{ width: "4rem" }} className="af-col" field="G" headerClassName="t-header" header="G" ></AFColumn>
                    <AFColumn style={{ width: "4rem" }} className="af-col" field="W" headerClassName="t-header" header="W" ></AFColumn>
                    <AFColumn style={{ width: "4rem" }} className="af-col" field="S" headerClassName="t-header" header="S" ></AFColumn>
                    <AFColumn style={{ width: "4rem" }} className="af-col" field="FND" headerClassName="t-header" header="FND" ></AFColumn>
                    <AFColumn style={{ width: "4rem" }} className="af-col" field="DL" headerClassName="t-header" header="DL" ></AFColumn>
                    <AFColumn style={{ width: "4rem" }} className="af-col" field="TPR" headerClassName="t-header" header="TPR" ></AFColumn>
                    <AFColumn style={{ width: "4rem" }} className="af-col" field="EMBOSSING" headerClassName="t-header" header="EMBOSSING" ></AFColumn>
                    <AFColumn style={{ width: "4rem" }} className="af-col" field="WASHING" headerClassName="t-header" header="WASHING" ></AFColumn>
                    <AFColumn style={{ width: "4rem" }} className="af-col" field="DOWN" headerClassName="t-header" header="DOWN" ></AFColumn>
                    <AFColumn style={{ width: "4rem" }} className="af-col" field="CUT" headerClassName="t-header" header="CUT" ></AFColumn>
                    <AFColumn style={{ width: "4rem" }} className="af-col" field="FTP" headerClassName="t-header" header="FTP" ></AFColumn>
                    <AFColumn style={{ width: "4rem" }} className="af-col" field="DTP" headerClassName="t-header" header="DTP" ></AFColumn>
                    <AFColumn style={{ width: "4rem" }} className="af-col" field="LAZE" headerClassName="t-header" header="LAZE" ></AFColumn>
                    <AFColumn style={{ width: "4rem" }} className="af-col" field="BVT_KIND" headerClassName="t-header" header="BVT" ></AFColumn>
                    <AFColumn style={{ width: "4rem" }} className="af-col" field="SEQ" headerClassName="t-header" header="SEQ" ></AFColumn>
                </AFDataTable>
            </div>

            <Toast ref={toast} />

            <Dialog
                visible={isAddOrder}
                position="mid-center"
                style={{ width: "86rem" }}
                header="주문조회"
                modal={true}
                className="p-fluid"
                onHide={hideDialog}
            >
                <div
                    className="af-div-first"
                    style={{ width: "85rem", height: "3rem" }}
                >
                    <span className="af-span-3-0" style={{ width: "16rem" }}>
                        <p className="af-span-p" style={{ width: "5rem" }}>Order#</p>
                        <div className="af-span-div" style={{ width: "10rem" }}>
                            <InputText
                                disabled
                                style={{ width: "10rem" }}
                                id="id_PI_CD"
                                value={dataQRY_CAPA_ORDER2.ORDER_CD}
                                onChange={(e) =>
                                    onInputChangeQRY_CAPA_ORDER2_ORDER_CD(
                                        e,
                                        "ORDER_CD",
                                    )
                                }
                            />
                        </div>
                    </span>
                    <span className="af-span-3-0" style={{ width: "16rem" }}>
                        <p className="af-span-p" style={{ width: "5rem" }}>Style#</p>
                        <div className="af-span-div" style={{ width: "10rem" }}>
                            <InputText
                                disabled
                                style={{ width: "10rem" }}
                                id="id_PI_CD"
                                value={dataQRY_CAPA_ORDER2.STYLE_CD}
                                onChange={(e) =>
                                    onInputChangeQRY_CAPA_ORDER2_STYLE_CD(
                                        e,
                                        "STYLE_CD",
                                    )
                                }
                            />
                        </div>
                    </span>
                    <span className="af-span-3-0" style={{ width: "31rem" }}>
                        <p className="af-span-p" style={{ width: "5rem" }}>Style</p>
                        <div className="af-span-div" style={{ width: "25rem" }}>
                            <InputText
                                disabled
                                style={{ width: "25rem" }}
                                id="id_PI_CD"
                                value={dataQRY_CAPA_ORDER2.STYLE_NAME}
                                onChange={(e) =>
                                    onInputChangeQRY_CAPA_ORDER2_STYLE_NAME(
                                        e,
                                        "STYLE_NAME",
                                    )
                                }
                            />
                        </div>
                    </span>
                    <span className="af-span-3-0" style={{ width: "8rem" }}>
                        <div
                            className="af-span-div-btn"
                            style={{ width: "7rem" }}
                        >
                            <Button
                                label="Apply"
                                style={{ width: "7rem" }}
                                className="p-button-text"
                                onClick={process_APPLY}
                            />
                        </div>
                    </span>
                    <span className="af-span-3-0" style={{ width: "8rem" }}>
                        <div
                            className="af-span-div-btn"
                            style={{ width: "7rem" }}
                        >
                            <Button
                                label="Cancel"
                                style={{ width: "7rem" }}
                                className="p-button-text"
                                onClick={process_CANCEL}
                            />
                        </div>
                    </span>
                </div>
                <div
                    className="af-div-first"
                    style={{ width: "85rem", height: "3rem" }}
                >
                    <span className="af-span-3-0" style={{ width: "26rem" }}>
                        <p className="af-span-p" style={{ width: "5rem" }}>Style</p>
                        <div className="af-span-div" style={{ width: "20rem" }}>
                            <InputText
                                style={{ width: "20rem" }}
                                id="id_PI_CD"
                                value={dataQRY_CAPA_ORDER2_STYLE_CD2}
                                onChange={(e) =>
                                    setDataQRY_CAPA_ORDER2_STYLE_CD2(
                                        e.target.value,
                                    )
                                }
                            />
                        </div>
                    </span>
                    <span className="af-span-3-0" style={{ width: "27rem" }}>
                        <p className="af-span-p" style={{ width: "6rem" }}>Order</p>
                        <div className="af-span-div" style={{ width: "20rem" }}>
                            <InputText
                                style={{ width: "20rem" }}
                                id="id_PI_CD"
                                value={dataQRY_CAPA_ORDER2_ORDER_CD2}
                                onChange={(e) =>
                                    setDataQRY_CAPA_ORDER2_ORDER_CD2(
                                        e.target.value,
                                    )
                                }
                            />
                        </div>
                    </span>
                    <span className="af-span-3-0" style={{ width: "8rem" }}>
                        <div
                            className="af-span-div-btn"
                            style={{ width: "7rem" }}
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
                                style={{ width: "7rem" }}
                                className="p-button-text"
                                onClick={search_ORDER2}
                            />
                        </div>
                    </span>
                    <span className="af-span-3-0" style={{ width: "8rem" }}>
                        <div
                            className="af-span-div-btn"
                            style={{ width: "7rem" }}
                        >
                            <Button
                                label="Reset"
                                id="btnSearch"
                                style={{ width: "7rem" }}
                                className="p-button-text"
                                onClick={reset_ORDER2}
                            />
                        </div>
                    </span>
                </div>
                <div
                    className="af-div-first"
                    style={{ width: "85rem", height: "40rem" }}
                >
                    <AFDataTable preventUnrelatedRerender
                        metaKeySelection={false}
                        tableStyle={{ tableLayout: "fixed" }}
                        showGridlines
                        loading={loadingTBL_QRY_CAPA_ORDER3}
                        ref={dt_TBL_QRY_CAPA_ORDER3}
                        size="small"
                        value={datasTBL_QRY_CAPA_ORDER3}
                        resizableColumns
                        columnResizeMode="expand"
                        selection={selectedTBL_QRY_CAPA_ORDER3}
                        onSelectionChange={(e) => {
                            setSelectedTBL_QRY_CAPA_ORDER3(e.value);
                            onRowClick1TBL_QRY_CAPA_ORDER3(e.value);
                        }}
                        onRowClick={onRowClickTBL_QRY_CAPA_ORDER3}
                        dataKey="ORDER_CD"
                        className="datatable-responsive"
                        virtualScrollerOptions={{ itemSize: 20 }}
                        emptyMessage=" "
                        // header={headerTBL_QRY_CAPA_ORDER}
                        responsiveLayout="scroll"
                        scrollable
                        scrollHeight="40rem"
                    >
                        <AFColumn selectionMode="single" field="__checkbox__" reorderable={false} headerClassName="t-header" style={{ width: "1rem" }} headerStyle={{ width: "1rem" }} ></AFColumn>
                        <AFColumn field="ORDER_CD" headerClassName="t-header" header="Order#" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                        <AFColumn field="STYLE_CD" headerClassName="t-header" header="Style#" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                        <AFColumn field="STYLE_NAME" headerClassName="t-header" header="Style Name" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                        <AFColumn field="BOOK_DATE" headerClassName="t-header" header="Book Date" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", height: "1.8rem" }} ></AFColumn>
                    </AFDataTable>
                </div>
            </Dialog>

            <Dialog
                visible={isSelUpdate}
                position="mid-center"
                style={{ width: "86rem" }}
                header="Sel Update"
                modal={true}
                className="p-fluid"
                onHide={hideDialogSelUpdate}
            >
                <div
                    className="af-div-first"
                    style={{ width: "85rem", height: "6rem" }}
                >
                    <span className="af-span-3" style={{ width: "26rem" }}>
                        <p className="af-span-p" style={{ width: "7rem" }}>Approval Date</p>
                        <div className="af-span-div" style={{ width: "18rem" }}>
                            <Calendar
                                showButtonBar
                                style={{ width: "18rem" }}
                                dateFormat="yy-mm-dd"
                                id="id_EXF"
                                value={changeDateVal(
                                    dataEDT_KSV_CAPABOOK_MEM.APPROVAL_DATE,
                                )}
                                onChange={(e) =>
                                    onCalChangeEDT_KSV_CAPABOOK_MEM_APPROVAL_DATE(
                                        e,
                                        "APPROVAL_DATE",
                                    )
                                }
                            />
                        </div>
                    </span>
                    <span className="af-span-3" style={{ width: "26rem" }}>
                        <p className="af-span-p" style={{ width: "7rem" }}>M ETA</p>
                        <div className="af-span-div" style={{ width: "18rem" }}>
                            <Calendar
                                showButtonBar
                                style={{ width: "18rem" }}
                                dateFormat="yy-mm-dd"
                                id="id_M_ETA"
                                value={changeDateVal(
                                    dataEDT_KSV_CAPABOOK_MEM.M_ETA,
                                )}
                                onChange={(e) =>
                                    onCalChangeEDT_KSV_CAPABOOK_MEM_M_ETA(
                                        e,
                                        "M_ETA",
                                    )
                                }
                            />
                        </div>
                    </span>
                    <span className="af-span-3" style={{ width: "26rem" }}>
                        <p className="af-span-p" style={{ width: "7rem" }}>EXF</p>
                        <div className="af-span-div" style={{ width: "18rem" }}>
                            <Calendar
                                showButtonBar
                                style={{ width: "18rem" }}
                                dateFormat="yy-mm-dd"
                                id="id_EXF"
                                value={changeDateVal(
                                    dataEDT_KSV_CAPABOOK_MEM.EXF,
                                )}
                                onChange={(e) =>
                                    onCalChangeEDT_KSV_CAPABOOK_MEM_EXF(
                                        e,
                                        "EXF",
                                    )
                                }
                            />
                        </div>
                    </span>

                    <span className="af-span-3" style={{ width: "54rem" }}>
                        <p className="af-span-p" style={{ width: "7rem" }}>Remark</p>
                        <div className="af-span-div" style={{ width: "46rem" }}>
                            <InputText
                                style={{ width: "46rem" }}
                                id="id_REMARK"
                                value={dataEDT_KSV_CAPABOOK_MEM.REMARK}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_CAPABOOK_MEM_REMARK(
                                        e,
                                        "REMARK",
                                    )
                                }
                            />
                        </div>
                    </span>
                    <span className="af-span-3" style={styleSample}>
                        <p className="af-span-p" style={{ width: "7rem" }}>Usage</p>
                        <div className="af-span-div" style={{ width: "18rem" }}>
                            <Dropdown
                                style={{ width: "18rem" }}
                                id="id_NR"
                                value={dataEDT_KSV_CAPABOOK_MEM_USAGE}
                                onChange={(e) =>
                                    onDropdownChangeEDT_KSV_CAPABOOK_MEM_USAGE(
                                        e,
                                        "USAGE",
                                    )
                                }
                                options={datasEDT_KSV_CAPABOOK_MEM_USAGE}
                                optionLabel="CD_NAME"
                                placeholder=""
                                editable
                            ></Dropdown>
                        </div>
                    </span>

                </div>

                <div
                    className="af-div-first"
                    style={{ width: "85rem", height: "3rem" }}
                >
                    <span className="af-span-3-0" style={{ width: "10rem" }}>
                        <div
                            className="af-span-div-btn"
                            style={{ width: "9rem" }}
                        >
                            <Button
                                style={{ width: "9rem" }}
                                label="Update"
                                className="p-button-text"
                                onClick={process_SEL_UPDATE}
                            />
                        </div>
                    </span>
                    <span className="af-span-3-0" style={{ width: "10rem" }}>
                        <div
                            className="af-span-div-btn"
                            style={{ width: "9rem" }}
                        >
                            <Button
                                style={{ width: "9rem" }}
                                label="Cancel"
                                className="p-button-text"
                                onClick={cancel_SEL_UPDATE}
                            />
                        </div>
                    </span>
                </div>

                <div
                    className="af-div-first"
                    style={{ width: "85rem", height: "40rem" }}
                >
                    <AFDataTable preventUnrelatedRerender
                        ref={dt_TBL_KSV_CAPABOOK_MEM5}
                        size="small"
                        value={datasTBL_KSV_CAPABOOK_MEM5}
                        loading={loadingTBL_KSV_CAPABOOK_MEM5}
                        tableStyle={{ tableLayout: "fixed" }}
                        resizableColumns
                        columnResizeMode="expand"
                        showGridlines
                        selectionMode="checkbox"
                        metaKeySelection={false}
                        selection={selectedTBL_KSV_CAPABOOK_MEM5}
                        onSelectionChange={(e) => {
                            setSelectedTBL_KSV_CAPABOOK_MEM5(e.value);
                            onRowClick1TBL_KSV_CAPABOOK_MEM5(e.value);
                        }}
                        onRowClick={(e) => {
                            onRowClickTBL_KSV_CAPABOOK_MEM5(e);
                        }}
                        dataKey="id"
                        className="datatable-responsive"
                        rowKey="id"
                        virtualScrollerOptions={{ itemSize: 20, lazy: true }}
                        emptyMessage=" "
                        //header={headerTBL_KSV_CAPABOOK_MEM5}
                        responsiveLayout="scroll"
                        scrollable
                        scrollHeight="410px"
                    >
                        <AFColumn style={{ width: "2rem" }} className="af-col" field="JOB_CD" headerClassName="t-header" header="Job" ></AFColumn>
                        <AFColumn style={{ width: "7rem" }} className="af-col" field="IN_DATE" headerClassName="t-header" header="In Date" body={(rowData) => serviceLib.dateFormat(rowData.IN_DATE) } ></AFColumn>
                        <AFColumn style={{ width: "10rem" }} className="af-col" field="BUYER_NAME" headerClassName="t-header" header="Buyer Name" ></AFColumn>
                        <AFColumn style={{ width: "6rem" }} className="af-col" field="BUYER_CD" headerClassName="t-header" header="Buyer CD" ></AFColumn>
                        <AFColumn style={{ width: "6rem" }} className="af-col" field="PO_CD" headerClassName="t-header" header="po#" ></AFColumn>
                        <AFColumn style={{ width: "7rem" }} className="af-col" field="ORDER_CD" headerClassName="t-header" header="Order#" ></AFColumn>
                        <AFColumn style={{ width: "10rem" }} className="af-col" field="STYLE_NAME" headerClassName="t-header" header="Style Name" ></AFColumn>
                        <AFColumn style={{ width: "6rem" }} className="af-col" field="STYLE_CD" headerClassName="t-header" header="Style CD" ></AFColumn>
                        <AFColumn style={widthNR} className="af-col" field="NR" headerClassName="t-header" header={colNR} ></AFColumn>

                        <AFColumn style={{ width: "6rem" }} className="af-col" field="QTY" headerClassName="t-header" header="Qty" bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.QTY) } ></AFColumn>
                        <AFColumn style={{ width: "6rem" }} className="af-col" field="MW" headerClassName="t-header" header="M/W" ></AFColumn>
                        {/*<AFColumn style={{ width: '7rem' }} className="af-col" field="SHIP_DATE" headerClassName='t-header' header="Ship Date" body ={rowData => serviceLib.dateFormat(rowData.SHIP_DATE)}></AFColumn>*/}
                        <AFColumn style={{ width: "7rem" }} className="af-col" field="S_ETA" headerClassName="t-header" header="Approval Date" body={(rowData) => serviceLib.dateFormat(rowData.S_ETA) } ></AFColumn>
                        <AFColumn style={{ width: "7rem" }} className="af-col" field="M_ETA" headerClassName="t-header" header="M ETA" body={(rowData) => serviceLib.dateFormat(rowData.M_ETA) } ></AFColumn>
                        <AFColumn style={{ width: "7rem" }} className="af-col" field="EXF" headerClassName="t-header" header="EXF" body={(rowData) => serviceLib.dateFormat(rowData.EXF) } ></AFColumn>

                        <AFColumn style={{ width: "6rem" }} className="af-col" field="FOB" headerClassName="t-header" header="FOB" bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.FOB, 4) } ></AFColumn>
                        <AFColumn style={{ width: "6rem" }} className="af-col" field="EXP_CMPT" headerClassName="t-header" header="Exp CMPT" bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.EXP_CMPT, 2) } ></AFColumn>
                        <AFColumn style={{ width: "6rem" }} className="af-col" field="NEGO_TYPE" headerClassName="t-header" header="Nego" ></AFColumn>
                        <AFColumn style={{ width: "4rem" }} className="af-col" field="EMBRO" headerClassName="t-header" header="EMBRO" ></AFColumn>
                        <AFColumn style={{ width: "4rem" }} className="af-col" field="TP" headerClassName="t-header" header="T/P" ></AFColumn>
                        <AFColumn style={{ width: "4rem" }} className="af-col" field="SP" headerClassName="t-header" header="S/P" ></AFColumn>
                        <AFColumn style={{ width: "4rem" }} className="af-col" field="LTHR" headerClassName="t-header" header="LTHR" ></AFColumn>
                        <AFColumn style={{ width: "4rem" }} className="af-col" field="G" headerClassName="t-header" header="G" ></AFColumn>
                        <AFColumn style={{ width: "4rem" }} className="af-col" field="W" headerClassName="t-header" header="W" ></AFColumn>
                        <AFColumn style={{ width: "4rem" }} className="af-col" field="S" headerClassName="t-header" header="S" ></AFColumn>
                        <AFColumn style={{ width: "4rem" }} className="af-col" field="FND" headerClassName="t-header" header="FND" ></AFColumn>
                        <AFColumn style={{ width: "4rem" }} className="af-col" field="DL" headerClassName="t-header" header="DL" ></AFColumn>
                        <AFColumn style={{ width: "4rem" }} className="af-col" field="TPR" headerClassName="t-header" header="TPR" ></AFColumn>
                        <AFColumn style={{ width: "4rem" }} className="af-col" field="EMBOSSING" headerClassName="t-header" header="EMBOSSING" ></AFColumn>
                        <AFColumn style={{ width: "4rem" }} className="af-col" field="WASHING" headerClassName="t-header" header="WASHING" ></AFColumn>
                        <AFColumn style={{ width: "4rem" }} className="af-col" field="DOWN" headerClassName="t-header" header="DOWN" ></AFColumn>
                        <AFColumn style={{ width: "4rem" }} className="af-col" field="CUT" headerClassName="t-header" header="CUT" ></AFColumn>
                        <AFColumn style={{ width: "4rem" }} className="af-col" field="FTP" headerClassName="t-header" header="FTP" ></AFColumn>
                        <AFColumn style={{ width: "4rem" }} className="af-col" field="DTP" headerClassName="t-header" header="DTP" ></AFColumn>
                        <AFColumn style={{ width: "4rem" }} className="af-col" field="LAZE" headerClassName="t-header" header="LAZE" ></AFColumn>
                        <AFColumn style={{ width: "4rem" }} className="af-col" field="BVT_KIND" headerClassName="t-header" header="BVT" ></AFColumn>
                        <AFColumn style={{ width: "4rem" }} className="af-col" field="SEQ" headerClassName="t-header" header="SEQ" ></AFColumn>
                        <AFColumn style={{ width: "4rem" }} className="af-col" field="REMARK" headerClassName="t-header" header="Remark" ></AFColumn>
                    </AFDataTable>
                </div>
            </Dialog>
        </div>
    );
};

const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(S0208_CAPABOOK_RECORD_BVT, comparisonFn);
