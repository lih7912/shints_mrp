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
import { ServiceS0209_CAPABOOK_LIST_BVT } from "../service/service_biz/ServiceS0209_CAPABOOK_LIST_BVT";

import axios from "axios";

// import './page_common.scss';

const emptyKCD_CODE = {
    id: 0,
    CD_GROUP: "",
    CD_CODE: "",
    CD_NAME: "",
    CD_FLAG: "",
};

const emptyQRY_KSV_CAPABOOK_MEM = {
    BOOK_DATE: "",
    USER_NAME: "",
    NEW_DATE: "",
    PO_CD: "",
    IS_SAMPLE: "",
    FACTORY_CD: "",
};

const emptyTBL_QRY_CAPA_STYLE3 = {
    KIND: "",
    BOOK_DATE: "",
    USER_ID: "",
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
    S_ETA: "",
    M_ETA: "",
    SD: "",
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
    S_ETA: "",
    M_ETA: "",
    SD: "",
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
    BUYER_CD: "",
    JOB_CD: "",
    PO_CD: "",
    ORDER_CD: "",
    FOB: "",
    QTY: "",
    NR: "",
    REMARK: "",
    MW: "",
    S_ETA: "",
    S_ETA: "",
    M_ETA: "",
    EXP_CMPT: "",
    BVT_KIND: "",
    TPR: "",
    EMBOSSING: "",
    WASHING: "",
    DL: "",
    S: "",
    FND: "",
    DOWN: "",
    CUT: "",
    EMBRO: "",
    TP: "",
    SP: "",
    LTHR: "",
    G: "",
    W: "",
    FTP: "",
    DTP: "",
    SD: "",
    NEGO_TYPE: "",
    LAZE: "",
    SEQ: "",
};

const S0209_CAPABOOK_LIST_BVT = () => {
    const serviceLibRef = useRef(null);
    if (!serviceLibRef.current) {
        serviceLibRef.current = new ServiceLib();
        serviceLibRef.current.loginConfirm();
    }
    const serviceLib = serviceLibRef.current;
    const serviceS0209_CAPABOOK_LIST_BVTRef = useRef(null);
    if (!serviceS0209_CAPABOOK_LIST_BVTRef.current) serviceS0209_CAPABOOK_LIST_BVTRef.current = new ServiceS0209_CAPABOOK_LIST_BVT();
    const serviceS0209_CAPABOOK_LIST_BVT = serviceS0209_CAPABOOK_LIST_BVTRef.current;

    const toast = useRef(null);
    const [fileUrl, setFileUrl] = useState("");

    const [isSystem, setIsSystem] = useState(true);
    const [isEnd, setIsEnd] = useState(false);
    const [isEndCancel, setIsEndCancel] = useState(true);

    /* splitter 관련 */
    const [styleVal, setStyleVal] = useState({ width: "65vw" });

    const search_CAPA_DATE = (argData) => {
        // let _tUserId = 'sales1';
        console.log(argData);
        let _tUserId = argData.USER_NAME;

        serviceS0209_CAPABOOK_LIST_BVT
            .mgrQueryCAPABOOK_DATE(_tUserId)
            .then((data) => {
                if (typeof data.graphQLErrors === "undefined") {
                    setDataCAPABOOK_DATE(data);
                    console.log(
                        "serviceS0209_CAPABOOK_LIST_BVT.mgrQueryCAPABOOK_DATE call(1) => " +
                            data.BOOK_DATE_BVT,
                    );
                    console.log(data);

                    setDatasEDT_KSV_CAPABOOK_MEM_BVT_KIND(data.BVT_KIND);
                    setDataEDT_KSV_CAPABOOK_MEM_BVT_KIND(data.BVT_KIND[0]);

                    // const serviceMgrKCD_VENDOR = new ServiceMgrKCD_VENDOR();
                    let _tQryObj = { ...dataQRY_KSV_CAPABOOK_MEM };
                    _tQryObj.FACTORY_CD = argData.FACTORY_CD;
                    // _tQryObj.IS_SAMPLE = '0';
                    // _tQryObj.PO_CD = '';
                    if (
                        argData.FACTORY_CD === "BVT" &&
                        argData.IS_SAMPLE !== "1"
                    ) {
                        _tQryObj.BOOK_DATE = data.NEW_DATE_BVT;
                        _tQryObj.NEW_DATE = data.NEW_DATE_BVT;
                    }
                    if (
                        argData.FACTORY_CD === "BVT" &&
                        argData.IS_SAMPLE === "1"
                    ) {
                        _tQryObj.BOOK_DATE = data.NEW_DATE_SAMPLE_BVT;
                        _tQryObj.NEW_DATE = data.NEW_DATE_SAMPLE_BVT;
                    }
                    if (
                        argData.FACTORY_CD === "ETP" &&
                        argData.IS_SAMPLE !== "1"
                    ) {
                        _tQryObj.BOOK_DATE = data.NEW_DATE_ETP;
                        _tQryObj.NEW_DATE = data.NEW_DATE_ETP;
                    }
                    if (
                        argData.FACTORY_CD === "ETP" &&
                        argData.IS_SAMPLE === "1"
                    ) {
                        _tQryObj.BOOK_DATE = data.NEW_DATE_SAMPLE_ETP;
                        _tQryObj.NEW_DATE = data.NEW_DATE_SAMPLE_ETP;
                    }
                    // _tQryObj.USER_NAME = argData.USER_NAME;
                    setDataQRY_KSV_CAPABOOK_MEM(_tQryObj);
                } else {
                    console.log(
                        "serviceS0209_CAPABOOK_LIST_BVT.mgrQueryCAPABOOK_DATE error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });
    };

    /*QRY KSV_CAPABOOK_MEM */

    const [dataQRY_KSV_CAPABOOK_MEM, setDataQRY_KSV_CAPABOOK_MEM] = useState(
        emptyQRY_KSV_CAPABOOK_MEM,
    );

    const onCheckboxChangeQRY_KSV_CAPABOOK_MEM_IS_SAMPLE = (e, name) => {
        let val = "";
        let _dataQRY_KSV_CAPABOOK_MEM = { ...dataQRY_KSV_CAPABOOK_MEM };
        if (e.checked) {
            val = "1";
        } else {
            val = "0";
        }

        setDataQRY_KSV_CAPABOOK_MEM([]);

        _dataQRY_KSV_CAPABOOK_MEM[`${name}`] = val;

        _dataQRY_KSV_CAPABOOK_MEM.BOOK_DATE = "";
        _dataQRY_KSV_CAPABOOK_MEM.NEW_DATE = "";

        if (val === "0" && dataQRY_KSV_CAPABOOK_MEM.FACTORY_CD === "BVT") {
            _dataQRY_KSV_CAPABOOK_MEM.BOOK_DATE =
                dataCAPABOOK_DATE.NEW_DATE_BVT;
            _dataQRY_KSV_CAPABOOK_MEM.NEW_DATE = dataCAPABOOK_DATE.NEW_DATE_BVT;
        }
        if (val === "1" && dataQRY_KSV_CAPABOOK_MEM.FACTORY_CD === "BVT") {
            _dataQRY_KSV_CAPABOOK_MEM.BOOK_DATE =
                dataCAPABOOK_DATE.NEW_DATE_SAMPLE_BVT;
            _dataQRY_KSV_CAPABOOK_MEM.NEW_DATE =
                dataCAPABOOK_DATE.NEW_DATE_SAMPLE_BVT;
        }
        if (val === "0" && dataQRY_KSV_CAPABOOK_MEM.FACTORY_CD === "ETP") {
            _dataQRY_KSV_CAPABOOK_MEM.BOOK_DATE =
                dataCAPABOOK_DATE.NEW_DATE_ETP;
            _dataQRY_KSV_CAPABOOK_MEM.NEW_DATE = dataCAPABOOK_DATE.NEW_DATE_ETP;
        }
        if (val === "1" && dataQRY_KSV_CAPABOOK_MEM.FACTORY_CD === "ETP") {
            _dataQRY_KSV_CAPABOOK_MEM.BOOK_DATE =
                dataCAPABOOK_DATE.NEW_DATE_SAMPLE_ETP;
            _dataQRY_KSV_CAPABOOK_MEM.NEW_DATE =
                dataCAPABOOK_DATE.NEW_DATE_SAMPLE_ETP;
        }

        setDataQRY_KSV_CAPABOOK_MEM(_dataQRY_KSV_CAPABOOK_MEM);
    };

    const [
        datasQRY_KSV_CAPABOOK_MEM_FACTORY_CD,
        setDatasQRY_KSV_CAPABOOK_MEM_FACTORY_CD,
    ] = useState([]);
    const [
        dataQRY_KSV_CAPABOOK_MEM_FACTORY_CD,
        setDataQRY_KSV_CAPABOOK_MEM_FACTORY_CD,
    ] = useState({});

    const editQRY_KSV_CAPABOOK_MEM_FACTORY_CD = (argValue) => {
        let _dataQRY_KSV_CAPABOOK_MEM_FACTORY_CD =
            datasQRY_KSV_CAPABOOK_MEM_FACTORY_CD.filter(
                (val) => val.CD_CODE === argValue,
            );
        setDataQRY_KSV_CAPABOOK_MEM_FACTORY_CD(
            _dataQRY_KSV_CAPABOOK_MEM_FACTORY_CD[0],
        );
    };

    const onDropdownChangeQRY_KSV_CAPABOOK_MEM_FACTORY_CD = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataQRY_KSV_CAPABOOK_MEM = { ...dataQRY_KSV_CAPABOOK_MEM };

        let tTypeVal = _dataQRY_KSV_CAPABOOK_MEM[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_CAPABOOK_MEM[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_CAPABOOK_MEM[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_CAPABOOK_MEM(_dataQRY_KSV_CAPABOOK_MEM);
        setDataQRY_KSV_CAPABOOK_MEM_FACTORY_CD(e.value);

        search_CAPA_DATE(_dataQRY_KSV_CAPABOOK_MEM);
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

    const [
        datasQRY_KSV_CAPABOOK_MEM_BOOK_DATE,
        setDatasQRY_KSV_CAPABOOK_MEM_BOOK_DATE,
    ] = useState([]);
    const [
        dataQRY_KSV_CAPABOOK_MEM_BOOK_DATE,
        setDataQRY_KSV_CAPABOOK_MEM_BOOK_DATE,
    ] = useState({});

    const onDropdownChangeQRY_KSV_CAPABOOK_MEM_BOOK_DATE = (e, name) => {
        let val = (e.value && e.value.BOOK_DATE) || "";

        let _dataQRY_KSV_CAPABOOK_MEM = { ...dataQRY_KSV_CAPABOOK_MEM };

        let tTypeVal = _dataQRY_KSV_CAPABOOK_MEM[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_CAPABOOK_MEM[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_CAPABOOK_MEM[`${name}`] = parseInt(val);
        }
        setDataQRY_KSV_CAPABOOK_MEM(_dataQRY_KSV_CAPABOOK_MEM);
        setDataQRY_KSV_CAPABOOK_MEM_BOOK_DATE(e.value);

        var tIdx = 0;
        datasQRY_KSV_CAPABOOK_MEM_BOOK_DATE.forEach((col, i) => {
            if (col.BOOK_DATE === e.value.BOOK_DATE) tIdx = i;
        });

        if (tIdx === 0) {
            setIsEnd(false);
            setIsEndCancel(true);
        } else if (tIdx === 1) {
            setIsEnd(true);
            setIsEndCancel(false);
        } else {
            setIsEnd(true);
            setIsEndCancel(true);
        }

        search_LIST_1_BOOK_DATE(e.value);
    };

    const [is_ALL_EXCEL_PRINT, setIs_ALL_EXCEL_PRINT] = useState("0");
    const onCheckboxChangeIS_ALL_EXCEL_PRINT = (e, name) => {
        let val = "";
        if (e.checked) {
            val = "1";
        } else {
            val = "0";
        }
        setIs_ALL_EXCEL_PRINT(val);
    };

    const [kind_BOOK_DATE, setKind_BOOK_DATE] = useState("");

    //

    /*TABLE KSV_CAPABOOK_MEM */
    // DEFINE DATAGRID : TBL_QRY_CAPA_STYLE3
    const [isAllList, setIsAllList] = useState(false);
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

    const onRowClickTBL_QRY_CAPA_STYLE3 = (event) => {};

    const hideDialog = () => {
        setIsAllList(false);
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

    const onRowClickTBL_KSV_CAPABOOK_MEM = (event) => {};

    const search_LIST_ALL = () => {
        var tObj = {};
        tObj.BOOK_DATE = "";
        tObj.IS_SAMPLE = dataQRY_KSV_CAPABOOK_MEM.IS_SAMPLE;
        tObj.FACTORY_CD = dataQRY_KSV_CAPABOOK_MEM.FACTORY_CD;
        serviceS0209_CAPABOOK_LIST_BVT.mgrQuery_ALL_LIST(tObj).then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                if (data.length > 0) {
                    setDatasTBL_QRY_CAPA_STYLE3(data);
                    setIsAllList(true);
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

    const search_LIST_1 = () => {
        if (dataQRY_KSV_CAPABOOK_MEM.USER_NAME === "") {
            alert("Team 아이디를 선택하세요<br><br>Please select your Team ID");
            return;
        }

        if (dataQRY_KSV_CAPABOOK_MEM.FACTORY_CD === "") {
            alert("Factory는 반드시 입력되어야 합니다<br><br>Factory must be entered");
            return;
        }

        clearSelectedTBL_KSV_CAPABOOK_MEM();

        setSelectedTBL_KSV_CAPABOOK_MEM([]);

        setLoadingTBL_KSV_CAPABOOK_MEM(true);

        var _tUserId = dataQRY_KSV_CAPABOOK_MEM.USER_NAME;
        serviceS0209_CAPABOOK_LIST_BVT
            .mgrQueryCAPABOOK_DATE(_tUserId)
            .then((data) => {
                setLoadingTBL_KSV_CAPABOOK_MEM(false);
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

                        setDatasQRY_KSV_CAPABOOK_MEM_BOOK_DATE(
                            data.BOOK_DATES_BVT,
                        );

                        var tObj0 = {};
                        data.BOOK_DATES_BVT.forEach((col, i) => {
                            if (
                                col.BOOK_DATE ===
                                _dataQRY_KSV_CAPABOOK_MEM.NEW_DATE
                            )
                                tObj0 = { ...col };
                        });
                        if (typeof tObj0.BOOK_DATE !== "undefined") {
                            setDataQRY_KSV_CAPABOOK_MEM_BOOK_DATE(tObj0);
                            if (tObj0.STATUS_CD === "0")
                                setKind_BOOK_DATE("In Proc");
                            if (tObj0.STATUS_CD === "1")
                                setKind_BOOK_DATE("End");
                        }
                    }
                    if (
                        dataQRY_KSV_CAPABOOK_MEM.FACTORY_CD === "BVT" &&
                        dataQRY_KSV_CAPABOOK_MEM.IS_SAMPLE === "1"
                    ) {
                        _dataQRY_KSV_CAPABOOK_MEM.BOOK_DATE =
                            data.BOOK_DATE_SAMPLE_BVT;
                        _dataQRY_KSV_CAPABOOK_MEM.NEW_DATE =
                            data.NEW_DATE_SAMPLE_BVT;

                        setDatasQRY_KSV_CAPABOOK_MEM_BOOK_DATE(
                            data.SAMPLE_DATES_BVT,
                        );

                        var tObj0 = {};
                        data.SAMPLE_DATES_BVT.forEach((col, i) => {
                            if (
                                col.BOOK_DATE ===
                                _dataQRY_KSV_CAPABOOK_MEM.NEW_DATE
                            )
                                tObj0 = { ...col };
                        });
                        if (typeof tObj0.BOOK_DATE !== "undefined") {
                            setDataQRY_KSV_CAPABOOK_MEM_BOOK_DATE(tObj0);
                            if (tObj0.STATUS_CD === "0")
                                setKind_BOOK_DATE("In Proc");
                            if (tObj0.STATUS_CD === "1")
                                setKind_BOOK_DATE("End");
                        }
                    }
                    if (
                        dataQRY_KSV_CAPABOOK_MEM.FACTORY_CD === "ETP" &&
                        dataQRY_KSV_CAPABOOK_MEM.IS_SAMPLE !== "1"
                    ) {
                        _dataQRY_KSV_CAPABOOK_MEM.BOOK_DATE =
                            data.BOOK_DATE_ETP;
                        _dataQRY_KSV_CAPABOOK_MEM.NEW_DATE = data.NEW_DATE_ETP;

                        setDatasQRY_KSV_CAPABOOK_MEM_BOOK_DATE(
                            data.BOOK_DATES_ETP,
                        );

                        var tObj0 = {};
                        data.BOOK_DATES_ETP.forEach((col, i) => {
                            if (
                                col.BOOK_DATE ===
                                _dataQRY_KSV_CAPABOOK_MEM.NEW_DATE
                            )
                                tObj0 = { ...col };
                        });
                        if (typeof tObj0.BOOK_DATE !== "undefined") {
                            setDataQRY_KSV_CAPABOOK_MEM_BOOK_DATE(tObj0);
                            if (tObj0.STATUS_CD === "0")
                                setKind_BOOK_DATE("In Proc");
                            if (tObj0.STATUS_CD === "1")
                                setKind_BOOK_DATE("End");
                        }
                    }
                    if (
                        dataQRY_KSV_CAPABOOK_MEM.FACTORY_CD === "ETP" &&
                        dataQRY_KSV_CAPABOOK_MEM.IS_SAMPLE === "1"
                    ) {
                        _dataQRY_KSV_CAPABOOK_MEM.BOOK_DATE =
                            data.BOOK_DATE_SAMPLE_ETP;
                        _dataQRY_KSV_CAPABOOK_MEM.NEW_DATE =
                            data.NEW_DATE_SAMPLE_ETP;

                        setDatasQRY_KSV_CAPABOOK_MEM_BOOK_DATE(
                            data.SAMPLE_DATES_ETP,
                        );

                        var tObj0 = {};
                        data.SAMPLE_DATES_ETP.forEach((col, i) => {
                            if (
                                col.BOOK_DATE ===
                                _dataQRY_KSV_CAPABOOK_MEM.NEW_DATE
                            )
                                tObj0 = { ...col };
                        });
                        if (typeof tObj0.BOOK_DATE !== "undefined") {
                            setDataQRY_KSV_CAPABOOK_MEM_BOOK_DATE(tObj0);
                            if (tObj0.STATUS_CD === "0")
                                setKind_BOOK_DATE("In Proc");
                            if (tObj0.STATUS_CD === "1")
                                setKind_BOOK_DATE("End");
                        }
                    }
                    setDataQRY_KSV_CAPABOOK_MEM(_dataQRY_KSV_CAPABOOK_MEM);

                    let _tQryObj = {};
                    _tQryObj.FACTORY_CD = _dataQRY_KSV_CAPABOOK_MEM.FACTORY_CD; // FC034 : BVT, FC044 : ETP
                    _tQryObj.IS_SAMPLE = _dataQRY_KSV_CAPABOOK_MEM.IS_SAMPLE;
                    _tQryObj.PO_CD = "";
                    // _tQryObj.BUYER_CD = '';
                    // _tQryObj.BOOK_DATE = _dataQRY_KSV_CAPABOOK_MEM.BOOK_DATE;
                    _tQryObj.BOOK_DATE = _dataQRY_KSV_CAPABOOK_MEM.NEW_DATE;
                    _tQryObj.NEW_DATE = _dataQRY_KSV_CAPABOOK_MEM.NEW_DATE;
                    _tQryObj.USER_NAME = _dataQRY_KSV_CAPABOOK_MEM.USER_NAME;

                    setDatasTBL_KSV_CAPABOOK_MEM([]);

                    setLoadingTBL_KSV_CAPABOOK_MEM(true);
                    serviceS0209_CAPABOOK_LIST_BVT
                        .mgrQueryTBL_KSV_CAPABOOK_MEM(_tQryObj)
                        .then((data) => {
                            setLoadingTBL_KSV_CAPABOOK_MEM(false);
                            if (typeof data.graphQLErrors === "undefined") {
                                var _tObj = { ...dataQRY_KSV_CAPABOOK_MEM };
                                _tObj.BOOK_DATE = _tQryObj.BOOK_DATE;
                                _tObj.NEW_DATE = _tQryObj.NEW_DATE;
                                _tObj.PO_CD = _tQryObj.PO_CD;
                                // _tObj.BUYER_CD = _tQryObj.BUYER_CD;
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

    const search_LIST_1_BOOK_DATE = (argData) => {
        if (dataQRY_KSV_CAPABOOK_MEM.USER_NAME === "") {
            alert("Team 아이디로 로그인해서 사용하세요<br><br>Please log in with your Team ID to use it.");
            return;
        }

        if (dataQRY_KSV_CAPABOOK_MEM.FACTORY_CD === "") {
            alert("Factory는 반드시 입력되어야 합니다<br><br>Factory must be entered");
            return;
        }

        var _tUserId = dataQRY_KSV_CAPABOOK_MEM.USER_NAME;

        var _dataQRY_KSV_CAPABOOK_MEM = { ...dataQRY_KSV_CAPABOOK_MEM };
        _dataQRY_KSV_CAPABOOK_MEM.NEW_DATE = argData.BOOK_DATE;
        setDataQRY_KSV_CAPABOOK_MEM(_dataQRY_KSV_CAPABOOK_MEM);

        if (argData.STATUS_CD === "0") setKind_BOOK_DATE("In Proc");
        if (argData.STATUS_CD === "1") setKind_BOOK_DATE("End");

        let _tQryObj = {};
        _tQryObj.FACTORY_CD = _dataQRY_KSV_CAPABOOK_MEM.FACTORY_CD; // FC034 : BVT, FC044 : ETP
        _tQryObj.IS_SAMPLE = _dataQRY_KSV_CAPABOOK_MEM.IS_SAMPLE;
        _tQryObj.PO_CD = "";
        _tQryObj.BOOK_DATE = _dataQRY_KSV_CAPABOOK_MEM.NEW_DATE;
        _tQryObj.NEW_DATE = _dataQRY_KSV_CAPABOOK_MEM.NEW_DATE;
        _tQryObj.USER_NAME = _dataQRY_KSV_CAPABOOK_MEM.USER_NAME;

        setDatasTBL_KSV_CAPABOOK_MEM([]);
        setSelectedTBL_KSV_CAPABOOK_MEM([]);

        setLoadingTBL_KSV_CAPABOOK_MEM(true);
        serviceS0209_CAPABOOK_LIST_BVT
            .mgrQueryTBL_KSV_CAPABOOK_MEM(_tQryObj)
            .then((data) => {
                setLoadingTBL_KSV_CAPABOOK_MEM(false);
                if (typeof data.graphQLErrors === "undefined") {
                    var _tObj = { ...dataQRY_KSV_CAPABOOK_MEM };
                    _tObj.BOOK_DATE = _tQryObj.BOOK_DATE;
                    _tObj.NEW_DATE = _tQryObj.NEW_DATE;
                    _tObj.PO_CD = _tQryObj.PO_CD;
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

        // Service : NawooAll:mgrQueryTBL_KSV_CAPABOOK_MEM
    };

    const process_EXCEL_PRINT = () => {
        if (is_ALL_EXCEL_PRINT === "1") {
            var tObj = {};
            tObj.BOOK_DATE = "";
            tObj.IS_SAMPLE = dataQRY_KSV_CAPABOOK_MEM.IS_SAMPLE;
            tObj.FACTORY_CD = dataQRY_KSV_CAPABOOK_MEM.FACTORY_CD;
            serviceS0209_CAPABOOK_LIST_BVT
                .mgrQuery_ALL_LIST(tObj)
                .then((data) => {
                    if (typeof data.graphQLErrors === "undefined") {
                        if (data.length > 0) {
                            let bookDate = dataQRY_KSV_CAPABOOK_MEM.BOOK_DATE;
                            let notEndUserArray = [];

                            data.map((row) => {
                                if (row.BOOK_DATE !== bookDate) {
                                    notEndUserArray.push(row.USER_ID);
                                }
                            });

                            let notEndUser = notEndUserArray.join(", ");

                            if (kind_BOOK_DATE !== "End") {
                                if (notEndUserArray.length) {
                                    alert(
                                        `There is a User that has not been 'END'-processed. (${notEndUser})  `,
                                    );
                                    return;
                                }
                            }

                            if (dataQRY_KSV_CAPABOOK_MEM.IS_SAMPLE === "1")
                                process_EXCEL_PRINT_SAMPLE_SUB();
                            else process_EXCEL_PRINT_SUB();

                            //if (dataQRY_KSV_CAPABOOK_MEM.IS_SAMPLE === '1') process_EXCEL_PRINT_SAMPLE_SUB();
                            //else  process_EXCEL_PRINT_SUB();
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
        } else {
            if (dataQRY_KSV_CAPABOOK_MEM.IS_SAMPLE === "1")
                process_EXCEL_PRINT_SAMPLE_SUB();
            else process_EXCEL_PRINT_SUB();
        }
    };

    const process_EXCEL_PRINT_SUB = () => {
        let _tQryObj = {};
        _tQryObj.FACTORY_CD = dataQRY_KSV_CAPABOOK_MEM.FACTORY_CD; // FC034 : BVT, FC044 : ETP
        _tQryObj.IS_SAMPLE = dataQRY_KSV_CAPABOOK_MEM.IS_SAMPLE;
        _tQryObj.PO_CD = "";
        _tQryObj.BOOK_DATE = dataQRY_KSV_CAPABOOK_MEM.NEW_DATE;
        _tQryObj.NEW_DATE = dataQRY_KSV_CAPABOOK_MEM.NEW_DATE;
        _tQryObj.USER_NAME = dataQRY_KSV_CAPABOOK_MEM.USER_NAME;
        _tQryObj.IS_ALL = is_ALL_EXCEL_PRINT;

        setLoadingTBL_KSV_CAPABOOK_MEM(true);
        serviceS0209_CAPABOOK_LIST_BVT
            .mgrQuery_EXCEL_PRINT(_tQryObj)
            .then((data) => {
                setLoadingTBL_KSV_CAPABOOK_MEM(false);
                if (typeof data.graphQLErrors === "undefined") {
                    if (data.length > 0) {
                        if (data[0].CODE.includes("SUCC")) {
                            toast.current.show({
                                severity: "success",
                                summary: "Success Order Sheet",
                                detail: data[0].CODE,
                                life: 3000,
                            });
                            console.log(
                                "Order Sheet Succeed => " + data[0].CODE,
                            );
                            serviceLib.downloadFile(
                                data[0].CODE.split("?")[2].toString(),
                                data[0].CODE.split("?")[1].toString(),
                            );
                        }
                    }
                } else {
                    console.log(
                        "ServiceS0204_ORDER_LIS.mgrQueryTBL_KSV_ORDER_MST error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });
    };

    const process_EXCEL_PRINT_SAMPLE_SUB = () => {
        let _tQryObj = {};
        _tQryObj.FACTORY_CD = dataQRY_KSV_CAPABOOK_MEM.FACTORY_CD; // FC034 : BVT, FC044 : ETP
        _tQryObj.IS_SAMPLE = dataQRY_KSV_CAPABOOK_MEM.IS_SAMPLE;
        _tQryObj.PO_CD = "";
        _tQryObj.BOOK_DATE = dataQRY_KSV_CAPABOOK_MEM.NEW_DATE;
        _tQryObj.NEW_DATE = dataQRY_KSV_CAPABOOK_MEM.NEW_DATE;
        _tQryObj.USER_NAME = dataQRY_KSV_CAPABOOK_MEM.USER_NAME;
        _tQryObj.IS_ALL = is_ALL_EXCEL_PRINT;

        setLoadingTBL_KSV_CAPABOOK_MEM(true);
        serviceS0209_CAPABOOK_LIST_BVT
            .mgrQuery_EXCEL_PRINT_SAMPLE(_tQryObj)
            .then((data) => {
                setLoadingTBL_KSV_CAPABOOK_MEM(false);
                if (typeof data.graphQLErrors === "undefined") {
                    if (data.length > 0) {
                        if (data[0].CODE.includes("SUCC")) {
                            toast.current.show({
                                severity: "success",
                                summary: "Success Order Sheet",
                                detail: data[0].CODE,
                                life: 3000,
                            });
                            console.log(
                                "Order Sheet Succeed => " + data[0].CODE,
                            );
                            serviceLib.downloadFile(
                                data[0].CODE.split("?")[2].toString(),
                                data[0].CODE.split("?")[1].toString(),
                            );

                            // var tFileName = data[0].CODE.split(':')[1];
                            // let _url1 = `${window.location.protocol}//${window.location.hostname}:3202/restapi/`;
                            // var tUrl = `${_url1}filedown/excel/${tFileName}`;
                            // console.log(tUrl);
                            // window.open(tUrl);
                        }
                    }
                } else {
                    console.log(
                        "ServiceS0204_ORDER_LIS.mgrQueryTBL_KSV_ORDER_MST error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });
    };

    const clearSelectedTBL_KSV_CAPABOOK_MEM = () => {
        setSelectedTBL_KSV_CAPABOOK_MEM([]);
        setFlagSelectModeTBL_KSV_CAPABOOK_MEM(false);
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

    // DATAGRID CODE : TBL_KSV_CAPABOOK_MEM1

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
        _argData.S_ETA = argData.S_ETA;
        _argData.S_ETA = argData.S_ETA;
        _argData.M_ETA = argData.M_ETA;
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
        _argData.SD = argData.SD;
        _argData.NEGO_TYPE = argData.NEGO_TYPE;
        _argData.LAZE = argData.LAZE;
        _argData.SEQ = argData.SEQ;

        setDataEDT_KSV_CAPABOOK_MEM(_argData);

        editEDT_KSV_CAPABOOK_MEM_NR(_argData.NR);
        editEDT_KSV_CAPABOOK_MEM_BVT_KIND(_argData.BVT_KIND);
    };

    const resetEDT_KSV_CAPABOOK_MEM = () => {
        setSelectedTBL_KSV_CAPABOOK_MEM1([]);
        setDataTBL_KSV_CAPABOOK_MEM1(emptyTBL_KSV_CAPABOOK_MEM1);
        datasetEDT_KSV_CAPABOOK_MEM(emptyTBL_KSV_CAPABOOK_MEM1);

        // clearSelectedKCD_STYLE();
    };

    const endCAPA = () => {
        if (kind_BOOK_DATE === "End") {
            alert("이미 End 처리된 데이터입니다<br><br>This data has already been End processed.");
            return;
        }

        var tCheck = 0;
        var tUserInfo = serviceLib.getUserInfo();
        datasQRY_KSV_CAPABOOK_MEM_USER_NAME.forEach((col, i) => {
            if (col.CD_CODE === tUserInfo.USER_ID) {
                tCheck = 1;
            }
        });
        if (
            tCheck === 0 &&
            (tUserInfo.USER_ID === "won21kr" || tUserInfo.USER_ID === "lih7912")
        )
            tCheck = 1;
        if (tCheck === 0) {
            alert("Capa User만 End 처리할수 있습니다<br><br>Only capacity users can process End.");
            return;
        }

        var chkFOB = 0;
        var chkEXP_CMPT = 0;
        datasTBL_KSV_CAPABOOK_MEM.forEach((col, i) => {
            if (col.JOB_CD !== "D") {
                if (parseFloat(col.FOB) <= 0) chkFOB = 1;
                if (parseFloat(col.EXP_CMPT) <= 0) chkEXP_CMPT = 1;
            }
        });

        if (
            dataQRY_KSV_CAPABOOK_MEM.IS_SAMPLE !== "1" &&
            dataQRY_KSV_CAPABOOK_MEM.FACTORY_CD === "BVT"
        ) {
            if (chkFOB > 0) {
                alert(`Check Order FOB of 0 `);
                return;
            }
        }
        if (
            dataQRY_KSV_CAPABOOK_MEM.IS_SAMPLE !== "1" &&
            dataQRY_KSV_CAPABOOK_MEM.FACTORY_CD === "ETP"
        ) {
            if (chkFOB > 0) {
                alert(`Check Order FOB of 0 `);
                return;
            }
            if (chkEXP_CMPT > 0) {
                alert(`Check Order Exp CMPT of 0 `);
                return;
            }
        }

        saveEDT_KSV_CAPABOOK_MEM_CAPA_END();
    };
    const endCancel = () => {
        if (kind_BOOK_DATE !== "End") {
            alert("End 상태인 것만 End Cancel 가능합니다 <br><br>End Cancel is only possible in End status.");
            return;
        }

        var tCheck = 0;
        var tUserInfo = serviceLib.getUserInfo();
        datasQRY_KSV_CAPABOOK_MEM_USER_NAME.forEach((col, i) => {
            if (col.CD_CODE === tUserInfo.USER_ID) {
                tCheck = 1;
            }
        });
        if (tCheck === 0 && tUserInfo.USER_ID === "won21kr") tCheck = 1;
        if (tCheck === 0) {
            alert("Capa User만 End 처리할수 있습니다<br><br>Only capacity users can process End.");
            return;
        }
        saveEDT_KSV_CAPABOOK_MEM_CAPA_CANCEL();
    };

    const saveEDT_KSV_CAPABOOK_MEM_CAPA_END = () => {
        let tArray = [];
        let tObj = {};
        tObj.FACTORY_CD = dataQRY_KSV_CAPABOOK_MEM.FACTORY_CD;
        tObj.IS_SAMPLE = dataQRY_KSV_CAPABOOK_MEM.IS_SAMPLE;
        tObj.BOOK_DATE = dataQRY_KSV_CAPABOOK_MEM.BOOK_DATE;
        tObj.USER_NAME = dataQRY_KSV_CAPABOOK_MEM.USER_NAME;
        tArray.push(tObj);

        setLoadingTBL_KSV_CAPABOOK_MEM(true);
        serviceS0209_CAPABOOK_LIST_BVT
            .mgrUpdateCAPA_END(tArray)
            .then((data) => {
                setLoadingTBL_KSV_CAPABOOK_MEM(false);
                if (typeof data.graphQLErrors === "undefined") {
                    console.log(
                        "ServiceS0209_CAPABOOK_LIST_BVT.mgrUpdateCAPA_END() call => " +
                            data.length +
                            "," +
                            data[0].CODE,
                    );
                    alert(data[0].CODE);

                    if (data[0].CODE.includes("ERROR")) {
                        // alert(data[0].CODE);

                        return;
                    }

                    setIsEnd(false);
                    setIsEndCancel(true);

                    search_LIST_1();

                    // searchTBL_KSV_CAPABOOK_MEM();
                    // Search
                } else {
                    // var tStr = data.graphQLErrors[0].message;
                    console.log(
                        "ServiceNawooAll.mgrUpdateCAPA_END( error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });
    };

    const saveEDT_KSV_CAPABOOK_MEM_CAPA_CANCEL = () => {
        let tArray = [];
        let tObj = {};
        tObj.FACTORY_CD = dataQRY_KSV_CAPABOOK_MEM.FACTORY_CD;
        tObj.IS_SAMPLE = dataQRY_KSV_CAPABOOK_MEM.IS_SAMPLE;
        tObj.BOOK_DATE = dataQRY_KSV_CAPABOOK_MEM.BOOK_DATE;
        tObj.USER_NAME = dataQRY_KSV_CAPABOOK_MEM.USER_NAME;
        tArray.push(tObj);

        setLoadingTBL_KSV_CAPABOOK_MEM(true);
        serviceS0209_CAPABOOK_LIST_BVT
            .mgrUpdateCAPA_END_CANCEL(tArray)
            .then((data) => {
                setLoadingTBL_KSV_CAPABOOK_MEM(false);
                if (typeof data.graphQLErrors === "undefined") {
                    if (data.length > 0) {
                        alert(data[0].CODE);
                        if (data[0].CODE.includes("SUCC")) {
                            setIsEnd(false);
                            setIsEndCancel(true);
                            search_LIST_1();
                        }
                    }
                    console.log(
                        "ServiceS0209_CAPABOOK_LIST_BVT.mgrUpdateCAPA_END() call => " +
                            data.length,
                    );
                    // Search
                } else {
                    // var tStr = data.graphQLErrors[0].message;
                    console.log(
                        "ServiceNawooAll.mgrUpdateCAPA_END( error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });
    };

    // const onInputChangeEDT_KSV_CAPABOOK_MEM_BUYER_CD = (e, name) => {
    //     let val = (e.target && e.target.value) || '';

    //     let _dataEDT_KSV_CAPABOOK_MEM = { ...dataEDT_KSV_CAPABOOK_MEM };

    //     let tTypeVal = _dataEDT_KSV_CAPABOOK_MEM[`${name}`];
    //     if (typeof tTypeVal === "string") _dataEDT_KSV_CAPABOOK_MEM[`${name}`] = val;
    //     else if (typeof tTypeVal === "number") _dataEDT_KSV_CAPABOOK_MEM[`${name}`] = parseInt(val);

    //     setDataEDT_KSV_CAPABOOK_MEM(_dataEDT_KSV_CAPABOOK_MEM);
    // }

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

    // const onCalChangeEDT_KSV_CAPABOOK_MEM_S_ETA = (e, name) => {
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

    //
    const fobTemplate = (rowData) => {
        if (parseFloat(rowData.FOB) <= 0) {
            return <p style={{ color: "red" }}>{rowData.FOB}</p>;
        } else {
            return <p>{rowData.FOB}</p>;
        }
    };

    ///

    useEffect(() => {
        var tUserInfo = serviceLib.getUserInfo();
        if (
            tUserInfo.USER_ID === "kr" ||
            tUserInfo.USER_ID === "mt" ||
            tUserInfo.USER_ID === "rnd" ||
            tUserInfo.USER_ID === "sales1" ||
            tUserInfo.USER_ID === "sales2" ||
            tUserInfo.USER_ID === "sales3" ||
            tUserInfo.USER_ID === "sales4" ||
            tUserInfo.USER_ID === "sales5"
        ) {
            setIsSystem(true);
        } else {
            setIsSystem(false);
        }

        let _tUserId = "";
        serviceS0209_CAPABOOK_LIST_BVT
            .mgrQueryCAPABOOK_CODE(_tUserId)
            .then((data) => {
                if (typeof data.graphQLErrors === "undefined") {
                    setDatasQRY_KSV_CAPABOOK_MEM_USER_NAME(data.CAPA_USER);
                    setDataQRY_KSV_CAPABOOK_MEM_USER_NAME(data.CAPA_USER[0]);

                    let _tQryObj = { ...emptyQRY_KSV_CAPABOOK_MEM };
                    var tUserInfo = serviceLib.getUserInfo();
                    setDatasQRY_KSV_CAPABOOK_MEM_USER_NAME(data.CAPA_USER);
                    var tObj0 = {};

                    console.log(tUserInfo);
                    data.CAPA_USER.forEach((col, i) => {
                        console.log(col.CD_CODE, tUserInfo.USER_ID);
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

        var tFactoryCd = [" ", "BVT", "ETP"];
        var tObjArray = tFactoryCd.map((col, i) => {
            var tObj = {};
            tObj.id = i;
            tObj.CD_CODE = col;
            tObj.CD_NAME = col;
            tObj.CD_GROUP = "FACTORY";
            return tObj;
        });
        setDatasQRY_KSV_CAPABOOK_MEM_FACTORY_CD(tObjArray);
        setDataQRY_KSV_CAPABOOK_MEM_FACTORY_CD(tObjArray[1]);
        editQRY_KSV_CAPABOOK_MEM_FACTORY_CD("BVT");

        var tNRCd = [" ", "NEW", "ER", "VR"];
        var tObjArray1 = tNRCd.map((col, i) => {
            var tObj = {};
            tObj.id = i;
            if (col === "NEW") tObj.CD_NAME = "NEW";
            else if (col === "ER") tObj.CD_NAME = "REPEAT_ETP";
            else if (col === "VR") tObj.CD_NAME = "REPEAT_BVT";
            tObj.CD_CODE = col;
            tObj.CD_GROUP = "NR_TYPEY";
            return tObj;
        });
        setDatasEDT_KSV_CAPABOOK_MEM_NR(tObjArray1);
        setDataEDT_KSV_CAPABOOK_MEM_NR(tObjArray1[0]);

        var tArray2 = [];
        var tObj2 = {};
        tObj2.BOOK_DATE = " ";
        tObj2.NEW_DATE = "";
        tArray2.push(tObj2);
        setDatasQRY_KSV_CAPABOOK_MEM_BOOK_DATE(tArray2);
        setDataQRY_KSV_CAPABOOK_MEM_BOOK_DATE(tArray2[0]);
    }, []);

    const blankFn = () => {};

    // Support Area

    const changeCheckBoxVal = (argVal) => {
        if (argVal === "1") return true;
        else return false;
    };

    return (
        <div className="af-div-main">
            <div
                className="af-div-first"
                style={{ width: "123rem", height: "3rem" }}
            >
                <span className="af-span-3-0" style={{ width: "17rem" }}>
                    <p className="af-span-p" style={{ width: "7rem" }}>Book Date</p>
                    <div className="af-span-div" style={{ width: "9rem" }}>
                        <Dropdown
                            style={{ width: "9rem" }}
                            id="id_FACTORY"
                            value={dataQRY_KSV_CAPABOOK_MEM_BOOK_DATE}
                            onChange={(e) =>
                                onDropdownChangeQRY_KSV_CAPABOOK_MEM_BOOK_DATE(
                                    e,
                                    "BOOK_DATE",
                                )
                            }
                            options={datasQRY_KSV_CAPABOOK_MEM_BOOK_DATE}
                            optionLabel="BOOK_DATE"
                            placeholder=""
                            editable
                        ></Dropdown>
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "11rem" }}>
                    <p className="af-span-p" style={{ width: "1rem" }}> </p>
                    <div className="af-span-div" style={{ width: "9rem" }}>
                        <InputText
                            disabled
                            style={{ width: "9rem" }}
                            id="id_BOOK_DATE"
                            value={kind_BOOK_DATE}
                            onChange={(e) => setKind_BOOK_DATE(e.target.value)}
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "17rem" }}>
                    <p className="af-span-p" style={{ width: "7rem" }}>Dept</p>
                    <div className="af-span-div" style={{ width: "9rem" }}>
                        <Dropdown
                            disabled={isSystem}
                            style={{ width: "9rem" }}
                            id="id_FACTORY"
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
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "10rem" }}>
                    <p className="af-span-p" style={{ width: "7rem" }}>Sample</p>
                    <div className="af-span-checkbox">
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
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "17rem" }}>
                    <p className="af-span-p" style={{ width: "7rem" }}>Factory</p>
                    <div className="af-span-div" style={{ width: "9rem" }}>
                        <Dropdown
                            style={{ width: "9rem" }}
                            id="id_FACTORY"
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
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "10rem" }}>
                    <div className="af-span-div-btn" style={{ width: "9rem" }}>
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
                            style={{ width: "9rem" }}
                            className="p-button-text"
                            onClick={search_LIST_1}
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "10rem" }}>
                    <div className="af-span-div-btn" style={{ width: "9rem" }}>
                        <Button
                            label="All List"
                            style={{ width: "9rem" }}
                            className="p-button-text orange"
                            onClick={search_LIST_ALL}
                        />
                    </div>
                </span>
            </div>

            <div
                className="af-div-first"
                style={{ width: "123rem", height: "54.5rem" }}
            >
                <AFDataTable preventUnrelatedRerender
                    ref={dt_TBL_KSV_CAPABOOK_MEM}
                    size="small"
                    value={datasTBL_KSV_CAPABOOK_MEM}
                    tableStyle={{ tableLayout: "fixed" }}
                    loading={loadingTBL_KSV_CAPABOOK_MEM}
                    resizableColumns
                    columnResizeMode="expand"
                    showGridlines
                    selectionMode="checkbox"
                    selection={selectedTBL_KSV_CAPABOOK_MEM}
                    onSelectionChange={(e) => {
                        setFlagSelectModeTBL_KSV_CAPABOOK_MEM(true);
                        setSelectedTBL_KSV_CAPABOOK_MEM(e.value);
                        console.log(
                            "selected length:" +
                                selectedTBL_KSV_CAPABOOK_MEM.length,
                        );
                    }}
                    onRowClick={onRowClickTBL_KSV_CAPABOOK_MEM}
                    dataKey="id"
                    className="datatable-responsive"
                    virtualScrollerOptions={{ itemSize: 20 }}
                    emptyMessage=" " //header={headerTBL_KSV_CAPABOOK_MEM}
                    responsiveLayout="scroll"
                    scrollable
                    scrollHeight="594px"
                >
                    <AFColumn style={{ width: "2rem" }} className="af-col" field="JOB_CD" headerClassName="t-header" header="Job"></AFColumn>
                    <AFColumn style={{ width: "7rem" }} className="af-col" field="IN_DATE" headerClassName="t-header" header="In Date" body={(rowData) => serviceLib.dateFormat(rowData.IN_DATE) }></AFColumn>
                    <AFColumn style={{ width: "10rem" }} className="af-col" field="BUYER_NAME" headerClassName="t-header" header="Buyer Name"></AFColumn>
                    <AFColumn style={{ width: "6rem" }} className="af-col" field="BUYER_CD" headerClassName="t-header" header="Buyer CD"></AFColumn>
                    <AFColumn style={{ width: "6rem" }} className="af-col" field="PO_CD" headerClassName="t-header" header="po#"></AFColumn>
                    <AFColumn style={{ width: "7rem" }} className="af-col" field="ORDER_CD" headerClassName="t-header" header="Order#"></AFColumn>
                    <AFColumn style={{ width: "10rem" }} className="af-col" field="STYLE_NAME" headerClassName="t-header" header="Style Name"></AFColumn>
                    <AFColumn style={{ width: "6rem" }} className="af-col" field="STYLE_CD" headerClassName="t-header" header="Style CD"></AFColumn>
                    <AFColumn style={{ width: "6rem" }} className="af-col" field="NR" headerClassName="t-header" header="N/R"></AFColumn>
                    <AFColumn style={{ width: "6rem" }} className="af-col" field="QTY" headerClassName="t-header" header="Qty" bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.QTY) }></AFColumn>
                    <AFColumn style={{ width: "6rem" }} className="af-col" field="MW" headerClassName="t-header" header="M/W"></AFColumn>
                    {/*<AFColumn style={{ width: '7rem' }} className="af-col" field="SHIP_DATE" headerClassName='t-header' header="Ship Date" body ={rowData => serviceLib.dateFormat(rowData.SHIP_DATE)}></AFColumn>*/}
                    <AFColumn style={{ width: "7rem" }} className="af-col" field="S_ETA" headerClassName="t-header" header="Approval Date" body={(rowData) => serviceLib.dateFormat(rowData.S_ETA)}></AFColumn>
                    <AFColumn style={{ width: "7rem" }} className="af-col" field="M_ETA" headerClassName="t-header" header="M ETA" body={(rowData) => serviceLib.dateFormat(rowData.M_ETA)}></AFColumn>
                    <AFColumn style={{ width: "7rem" }} className="af-col" field="EXF" headerClassName="t-header" header="EXF" body={(rowData) => serviceLib.dateFormat(rowData.EXF)}></AFColumn>

                    <AFColumn style={{ width: "4rem" }} className="af-col" field="REMARK" headerClassName="t-header" header="Remark"></AFColumn>
                    <AFColumn style={{ width: "4rem" }} className="af-col" field="USAGE_N" headerClassName="t-header" header="Usage"></AFColumn>
                    <AFColumn style={{ width: "6rem" }} className="af-col" field="FOB" headerClassName="t-header" header="FOB" bodyStyle={{ textAlign: "right" }} body={fobTemplate}></AFColumn>
                    <AFColumn style={{ width: "6rem" }} className="af-col" field="EXP_CMPT" headerClassName="t-header" header="Exp CMPT" bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.EXP_CMPT, 2) }></AFColumn>
                    <AFColumn style={{ width: "6rem" }} className="af-col" field="NEGO_TYPE" headerClassName="t-header" header="Nego"></AFColumn>
                    <AFColumn style={{ width: "4rem" }} className="af-col" field="EMBRO" headerClassName="t-header" header="EMBRO"></AFColumn>
                    <AFColumn style={{ width: "4rem" }} className="af-col" field="TP" headerClassName="t-header" header="T/P"></AFColumn>
                    <AFColumn style={{ width: "4rem" }} className="af-col" field="SP" headerClassName="t-header" header="S/P"></AFColumn>
                    <AFColumn style={{ width: "4rem" }} className="af-col" field="LTHR" headerClassName="t-header" header="LTHR"></AFColumn>
                    <AFColumn style={{ width: "4rem" }} className="af-col" field="G" headerClassName="t-header" header="G"></AFColumn>
                    <AFColumn style={{ width: "4rem" }} className="af-col" field="W" headerClassName="t-header" header="W"></AFColumn>
                    <AFColumn style={{ width: "4rem" }} className="af-col" field="S" headerClassName="t-header" header="S"></AFColumn>
                    <AFColumn style={{ width: "4rem" }} className="af-col" field="FND" headerClassName="t-header" header="FND"></AFColumn>
                    <AFColumn style={{ width: "4rem" }} className="af-col" field="DL" headerClassName="t-header" header="DL"></AFColumn>
                    <AFColumn style={{ width: "4rem" }} className="af-col" field="TPR" headerClassName="t-header" header="TPR"></AFColumn>
                    <AFColumn style={{ width: "4rem" }} className="af-col" field="EMBOSSING" headerClassName="t-header" header="EMBOSSING"></AFColumn>
                    <AFColumn style={{ width: "4rem" }} className="af-col" field="WASHING" headerClassName="t-header" header="WASHING"></AFColumn>
                    <AFColumn style={{ width: "4rem" }} className="af-col" field="DOWN" headerClassName="t-header" header="DOWN"></AFColumn>
                    <AFColumn style={{ width: "4rem" }} className="af-col" field="CUT" headerClassName="t-header" header="CUT"></AFColumn>
                    <AFColumn style={{ width: "4rem" }} className="af-col" field="FTP" headerClassName="t-header" header="FTP"></AFColumn>
                    <AFColumn style={{ width: "4rem" }} className="af-col" field="DTP" headerClassName="t-header" header="DTP"></AFColumn>
                    <AFColumn style={{ width: "4rem" }} className="af-col" field="LAZE" headerClassName="t-header" header="LAZE"></AFColumn>
                    <AFColumn style={{ width: "4rem" }} className="af-col" field="BVT_KIND" headerClassName="t-header" header="BVT"></AFColumn>
                    <AFColumn style={{ width: "4rem" }} className="af-col" field="SEQ" headerClassName="t-header" header="SEQ"></AFColumn>
                </AFDataTable>
            </div>

            <div
                className="af-div-first"
                style={{ width: "123rem", height: "3rem" }}
            >
                <span className="af-span-3-0" style={{ width: "10rem" }}>
                    <div className="af-span-div-btn" style={{ width: "9rem" }}>
                        <Button
                            disabled={isEnd}
                            style={{ width: "9rem" }}
                            label="End"
                            className="p-button-text"
                            onClick={endCAPA}
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "10rem" }}>
                    <div className="af-span-div-btn" style={{ width: "9rem" }}>
                        <Button
                            disabled={isEndCancel}
                            style={{ width: "9rem" }}
                            label="End Cancel"
                            className="p-button-text"
                            onClick={endCancel}
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "10rem" }}>
                    <div className="af-span-div-btn" style={{ width: "9rem" }}>
                        <Button
                            style={{ width: "9rem" }}
                            label="Reset"
                            className="p-button-text"
                            onClick={blankFn}
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "10rem" }}>
                    <p className="af-span-p" style={{ width: "7rem" }}>All List</p>
                    <div className="af-span-checkbox">
                        <Checkbox
                            id="isAll1"
                            checked={changeCheckBoxVal(is_ALL_EXCEL_PRINT)}
                            onChange={(e) =>
                                onCheckboxChangeIS_ALL_EXCEL_PRINT(
                                    e,
                                    "IS_ALL_EXCEL_PRINT",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "14rem" }}>
                    <div className="af-span-div-btn" style={{ width: "13rem" }}>
                        <Button
                            style={{ width: "13rem" }}
                            label="CAPABOOK List"
                            className="p-button-text green"
                            onClick={process_EXCEL_PRINT}
                        />
                    </div>
                </span>
            </div>
            <Toast ref={toast} />

            <Dialog
                visible={isAllList}
                position="mid-center"
                style={{ width: "61rem" }}
                header="전체목록"
                modal={true}
                className="p-fluid"
                onHide={hideDialog}
            >
                <div
                    className="af-div-first"
                    style={{ width: "59rem", height: "25rem" }}
                >
                    <AFDataTable preventUnrelatedRerender
                        metaKeySelection={false}
                        tableStyle={{ tableLayout: "fixed" }}
                        showGridlines
                        loading={loadingTBL_QRY_CAPA_STYLE3}
                        ref={dt_TBL_QRY_CAPA_STYLE3}
                        size="small"
                        value={datasTBL_QRY_CAPA_STYLE3}
                        resizableColumns
                        columnResizeMode="expand"
                        selection={selectedTBL_QRY_CAPA_STYLE3}
                        onSelectionChange={(e) => {
                            setSelectedTBL_QRY_CAPA_STYLE3(e.value);
                        }}
                        onRowClick={onRowClickTBL_QRY_CAPA_STYLE3}
                        dataKey="STYLE_CD"
                        className="datatable-responsive"
                        virtualScrollerOptions={{ itemSize: 20 }}
                        emptyMessage=" "
                        // header={headerTBL_QRY_CAPA_ORDER}
                        responsiveLayout="scroll"
                        scrollable
                        scrollHeight="40rem"
                    >
                        <AFColumn selectionMode="single" field="__checkbox__" reorderable={false} headerStyle={{ width: "5px" }} style={{ width: "5px" }}></AFColumn>
                        <AFColumn field="KIND" headerClassName="t-header" header="Kind" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }}></AFColumn>
                        <AFColumn field="USER_ID" headerClassName="t-header" header="User" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }}></AFColumn>
                        <AFColumn field="BOOK_DATE" headerClassName="t-header" header="Book Date" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} body={(rowData) => serviceLib.dateFormat(rowData.BOOK_DATE) }></AFColumn>
                    </AFDataTable>
                </div>
            </Dialog>
        </div>
    );
};

const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(S0209_CAPABOOK_LIST_BVT, comparisonFn);
