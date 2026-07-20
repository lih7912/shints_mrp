/* eslint-disable */
import React, { useState, useEffect, useRef } from "react";
import classNames from "classnames";
import { AFDataTable } from "../components/AFDataTable";
import { AFColumn } from "../components/AFColumn";
import { Toast } from "primereact/toast";
import { Column } from "primereact/column";
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
import { ServiceS0508_CAPABOOK_LIST_BVT } from "../service/service_biz/ServiceS0508_CAPABOOK_LIST_BVT";
import { ServiceS0513_SHIPPING_LIST } from "../service/service_biz/ServiceS0513_SHIPPING_LIST";

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
    BUYER_CD: "",
    ORDER_CD: "",
    FINISH_DATE: "",
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

const S0508_CAPABOOK_LIST_BVT = () => {
    const serviceLibRef = useRef(null);
    if (!serviceLibRef.current) {
        serviceLibRef.current = new ServiceLib();
        serviceLibRef.current.loginConfirm();
    }
    const serviceLib = serviceLibRef.current;
    const serviceS0508_CAPABOOK_LIST_BVTRef = useRef(null);
    if (!serviceS0508_CAPABOOK_LIST_BVTRef.current) serviceS0508_CAPABOOK_LIST_BVTRef.current = new ServiceS0508_CAPABOOK_LIST_BVT();
    const serviceS0508_CAPABOOK_LIST_BVT = serviceS0508_CAPABOOK_LIST_BVTRef.current;
    const serviceS0513_SHIPPING_LISTRef = useRef(null);
    if (!serviceS0513_SHIPPING_LISTRef.current) serviceS0513_SHIPPING_LISTRef.current = new ServiceS0513_SHIPPING_LIST();
    const serviceS0513_SHIPPING_LIST = serviceS0513_SHIPPING_LISTRef.current;

    const toast = useRef(null);
    const [fileUrl, setFileUrl] = useState("");

    /* splitter 관련 */
    const [styleVal, setStyleVal] = useState({ width: "65vw" });

    //

    //

    const process_END = () => {
        if (selectedTBL_KSV_CAPABOOK_MEM.length <= 0) {
            alert("You must select work Record ");
            return;
        }
        var tQryObj = { ...dataQRY_KSV_CAPABOOK_MEM };

        let tArray = [];

        var tCheck = 0;
        selectedTBL_KSV_CAPABOOK_MEM.forEach((col, i) => {
            var tObj = {};
            tObj.ORDER_CD = col.ORDER_CD;
            tObj.PO_CD = col.PO_CD;
            tObj.USER_ID = tQryObj.USER_NAME;
            tObj.FACTORY_CD = tQryObj.FACTORY_CD;
            tObj.BOOK_DATE = tQryObj.BOOK_DATE;
            tObj.IS_SAMPLE = tQryObj.IS_SAMPLE;
            tObj.FINISH_DATE = dataEDT_KSV_CAPABOOK_MEM.FINISH_DATE;
            tArray.push(tObj);

            if (col.END_PRODUCTION_DATE !== "") tCheck = 1;
        });
        if (tCheck === 1) {
            // alert('Job Cd가 I, O, U인것만 Production End 처리가능합니다');
            alert("이미 Production Finish 된것은 Finish 처리 할수 없습니다 <br><br>Items that have already been Production Finished cannot be Finished.");
            return;
        }

        let tArray1 = [];
        var tSizeCnt = "";
        var tSaveColor = "";
        var tObj1 = {};
        datasTBL_KSV_ORDER_SHIP1.forEach((col, i) => {
            if (col.ORDER_CD === "") {
                tSizeCnt += serviceLib.printF(col.PROD_CNT, 6);
                if (i === datasTBL_KSV_ORDER_SHIP1.length - 1) {
                    var tWObj = {};
                    tWObj.ORDER_CD = tObj1.ORDER_CD;
                    tWObj.PROD_CD = tObj1.PROD_CD;
                    tWObj.COLOR = tObj1.COLOR;
                    tWObj.END_SIZE_CNT = tSizeCnt;
                    tWObj.FINISH_DATE = dataEDT_KSV_CAPABOOK_MEM.FINISH_DATE;
                    tArray1.push(tWObj);
                }
            } else {
                if (i > 0) {
                    var tWObj = {};
                    tWObj.ORDER_CD = tObj1.ORDER_CD;
                    tWObj.PROD_CD = tObj1.PROD_CD;
                    tWObj.COLOR = tObj1.COLOR;
                    tWObj.END_SIZE_CNT = tSizeCnt;
                    tWObj.FINISH_DATE = dataEDT_KSV_CAPABOOK_MEM.FINISH_DATE;
                    tArray1.push(tWObj);
                }
                tObj1 = { ...col };
                tSizeCnt = "";
                tSizeCnt += serviceLib.printF(col.PROD_CNT, 6);
            }
        });

        setLoadingTBL_KSV_CAPABOOK_MEM(true);
        serviceS0508_CAPABOOK_LIST_BVT
            .mgrUpdate_END_PRODUCTION(tArray, tArray1)
            .then((data) => {
                setLoadingTBL_KSV_CAPABOOK_MEM(false);
                if (typeof data.graphQLErrors === "undefined") {
                    if (data.length > 0) {
                        alert(data[0].CODE);
                        search_LIST_1();
                    }
                } else {
                    // var tStr = data.graphQLErrors[0].message;
                    console.log(
                        "ServiceNawooAll.mgrUpdateCAPA_END( error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });
    };

    const process_END_CANCEL = () => {
        if (selectedTBL_KSV_CAPABOOK_MEM.length <= 0) {
            alert("You must select work Record ");
            return;
        }
        var tQryObj = { ...dataQRY_KSV_CAPABOOK_MEM };

        let tArray = [];

        var tCheck = 0;
        selectedTBL_KSV_CAPABOOK_MEM.forEach((col, i) => {
            var tObj = {};
            tObj.ORDER_CD = col.ORDER_CD;
            tObj.USER_ID = tQryObj.USER_NAME;
            tObj.FACTORY_CD = tQryObj.FACTORY_CD;
            tObj.BOOK_DATE = tQryObj.BOOK_DATE;
            tObj.IS_SAMPLE = tQryObj.IS_SAMPLE;
            tArray.push(tObj);
            if (col.END_PRODUCTION_DATE !== "");
            else tCheck = 1;
        });
        if (tCheck === 1) {
            alert("Finish 된것만 Cancel 처리 가능합니다<br><br>Only finished items can be canceled.");
            return;
        }

        let tArray1 = [];
        var tSizeCnt = "";
        var tSaveColor = "";
        var tObj1 = {};
        datasTBL_KSV_ORDER_SHIP1.forEach((col, i) => {
            if (col.ORDER_CD === "") {
                tSizeCnt += serviceLib.printF(col.PROD_CNT, 6);
                if (i === datasTBL_KSV_ORDER_SHIP1.length - 1) {
                    var tWObj = {};
                    tWObj.ORDER_CD = tObj1.ORDER_CD;
                    tWObj.PROD_CD = tObj1.PROD_CD;
                    tWObj.COLOR = tObj1.COLOR;
                    tWObj.END_SIZE_CNT = tSizeCnt;
                    tArray1.push(tWObj);
                }
            } else {
                if (i > 0) {
                    var tWObj = {};
                    tWObj.ORDER_CD = tObj1.ORDER_CD;
                    tWObj.PROD_CD = tObj1.PROD_CD;
                    tWObj.COLOR = tObj1.COLOR;
                    tWObj.END_SIZE_CNT = tSizeCnt;
                    tArray1.push(tWObj);
                }
                tObj1 = { ...col };
                tSizeCnt = "";
                tSizeCnt += serviceLib.printF(col.PROD_CNT, 6);
            }
        });

        setLoadingTBL_KSV_CAPABOOK_MEM(true);
        serviceS0508_CAPABOOK_LIST_BVT
            .mgrUpdate_END_CANCEL(tArray, tArray1)
            .then((data) => {
                setLoadingTBL_KSV_CAPABOOK_MEM(false);
                if (typeof data.graphQLErrors === "undefined") {
                    if (data.length > 0) {
                        alert(data[0].CODE);
                        search_LIST_1();
                    }
                } else {
                    // var tStr = data.graphQLErrors[0].message;
                    console.log(
                        "ServiceNawooAll.mgrUpdateCAPA_END( error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });
    };

    const search_CAPA_DATE = (argData) => {
        // let _tUserId = 'sales1';
        // console.log(argData);

        var tUserName = datasQRY_KSV_CAPABOOK_MEM_USER_NAME[1].CD_CODE;
        let _tUserId = tUserName;

        serviceS0508_CAPABOOK_LIST_BVT
            .mgrQueryCAPABOOK_DATE(_tUserId)
            .then((data) => {
                if (typeof data.graphQLErrors === "undefined") {
                    setDataCAPABOOK_DATE(data);
                    console.log(
                        "serviceS0508_CAPABOOK_LIST_BVT.mgrQueryCAPABOOK_DATE call(1) => " +
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
                        "serviceS0508_CAPABOOK_LIST_BVT.mgrQueryCAPABOOK_DATE error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });
    };

    /*QRY KSV_CAPABOOK_MEM */

    const [dataQRY_KSV_CAPABOOK_MEM, setDataQRY_KSV_CAPABOOK_MEM] = useState(
        emptyQRY_KSV_CAPABOOK_MEM,
    );

    const onInputChangeQRY_KSV_CAPABOOK_MEM_BOOK_DATE = (e, name) => {
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
        datasQRY_KSV_CAPABOOK_MEM_BUYER_CD,
        setDatasQRY_KSV_CAPABOOK_MEM_BUYER_CD,
    ] = useState([]);
    const [
        dataQRY_KSV_CAPABOOK_MEM_BUYER_CD,
        setDataQRY_KSV_CAPABOOK_MEM_BUYER_CD,
    ] = useState({});

    const onDropdownChangeQRY_KSV_CAPABOOK_MEM_BUYER_CD = (e, name) => {
        let val = (e.value && e.value.BUYER_CD) || "";

        let _dataQRY_KSV_CAPABOOK_MEM = { ...dataQRY_KSV_CAPABOOK_MEM };

        let tTypeVal = _dataQRY_KSV_CAPABOOK_MEM[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_CAPABOOK_MEM[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_CAPABOOK_MEM[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_CAPABOOK_MEM(_dataQRY_KSV_CAPABOOK_MEM);
        setDataQRY_KSV_CAPABOOK_MEM_BUYER_CD(e.value);

        // search_CAPA_DATE(_dataQRY_KSV_CAPABOOK_MEM);
    };

    const [
        datasQRY_KSV_CAPABOOK_MEM_USER_NAME,
        setDatasQRY_KSV_CAPABOOK_MEM_USER_NAME,
    ] = useState([]);
    const [
        dataQRY_KSV_CAPABOOK_MEM_USER_NAME,
        setDataQRY_KSV_CAPABOOK_MEM_USER_NAME,
    ] = useState({});

    /* TABLE KSV_STOCK_FACOUT*/
    // DEFINE DATAGRID : TBL_KSV_ORDER_SHIP1
    let emptyTBL_KSV_ORDER_SHIP1 = {};

    const [datasTBL_KSV_ORDER_SHIP1, setDatasTBL_KSV_ORDER_SHIP1] = useState(
        [],
    );
    const dt_TBL_KSV_ORDER_SHIP1 = useRef(null);
    const [dataTBL_KSV_ORDER_SHIP1, setDataTBL_KSV_ORDER_SHIP1] = useState(
        emptyTBL_KSV_ORDER_SHIP1,
    );
    const [selectedTBL_KSV_ORDER_SHIP1, setSelectedTBL_KSV_ORDER_SHIP1] =
        useState([]);
    const [
        flagSelectModeTBL_KSV_ORDER_SHIP1,
        setFlagSelectModeTBL_KSV_ORDER_SHIP1,
    ] = useState(false);

    // DATAGRID CODE : TBL_KSV_ORDER_SHIP1

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

    const onRowClickTBL_KSV_CAPABOOK_MEM = (event) => {
        // search_LIST_2(event.data);
    };

    const search_LIST_1 = () => {
        if (dataQRY_KSV_CAPABOOK_MEM.FACTORY_CD === "") {
            alert("Factory는 반드시 입력되어야 합니다<br><br>Factory must be entered");
            return;
        }

        clearSelectedTBL_KSV_CAPABOOK_MEM();

        setSelectedTBL_KSV_CAPABOOK_MEM([]);

        setLoadingTBL_KSV_CAPABOOK_MEM(true);

        // var _tUserId = dataQRY_KSV_CAPABOOK_MEM.USER_NAME;

        if (1) {
            var _dataQRY_KSV_CAPABOOK_MEM = { ...dataQRY_KSV_CAPABOOK_MEM };
            let _tQryObj = {};
            _tQryObj.FACTORY_CD = _dataQRY_KSV_CAPABOOK_MEM.FACTORY_CD; // FC034 : BVT, FC044 : ETP
            _tQryObj.IS_SAMPLE = _dataQRY_KSV_CAPABOOK_MEM.IS_SAMPLE;
            _tQryObj.PO_CD = "";
            // _tQryObj.BUYER_CD = '';
            // _tQryObj.BOOK_DATE = _dataQRY_KSV_CAPABOOK_MEM.BOOK_DATE;
            _tQryObj.BOOK_DATE = _dataQRY_KSV_CAPABOOK_MEM.NEW_DATE;
            _tQryObj.NEW_DATE = _dataQRY_KSV_CAPABOOK_MEM.NEW_DATE;
            _tQryObj.USER_NAME = _dataQRY_KSV_CAPABOOK_MEM.USER_NAME;
            _tQryObj.BUYER_CD = _dataQRY_KSV_CAPABOOK_MEM.BUYER_CD;
            _tQryObj.ORDER_CD = _dataQRY_KSV_CAPABOOK_MEM.ORDER_CD;

            setDatasTBL_KSV_CAPABOOK_MEM([]);

            setLoadingTBL_KSV_CAPABOOK_MEM(true);
            serviceS0508_CAPABOOK_LIST_BVT
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

                        setDatasTBL_KSV_CAPABOOK_MEM(data);
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
        }

        // Service : NawooAll:mgrQueryTBL_KSV_CAPABOOK_MEM
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

    const onCalChangedataEDT_KSV_CAPABOOK_MEM_FINISH_DATE = (e, name) => {
        let _dataEDT_KSV_CAPABOOK_MEM = { ...dataEDT_KSV_CAPABOOK_MEM };
        _dataEDT_KSV_CAPABOOK_MEM.FINISH_DATE = getDateVal(e.value);
        setDataEDT_KSV_CAPABOOK_MEM(_dataEDT_KSV_CAPABOOK_MEM);
    };

    useEffect(() => {
        var tUserInfo = serviceLib.getUserInfo();
        // console.log(tUserInfo);

        let _tUserId = "";
        serviceS0508_CAPABOOK_LIST_BVT
            .mgrQueryCAPABOOK_CODE(_tUserId)
            .then((data) => {
                if (typeof data.graphQLErrors === "undefined") {
                    setDatasQRY_KSV_CAPABOOK_MEM_USER_NAME(data.CAPA_USER);
                    setDataQRY_KSV_CAPABOOK_MEM_USER_NAME(data.CAPA_USER[0]);

                    setDatasQRY_KSV_CAPABOOK_MEM_BUYER_CD(data.BUYER_CD);
                    setDataQRY_KSV_CAPABOOK_MEM_BUYER_CD(data.BUYER_CD[0]);

                    let _tQryObj = {
                        ...emptyEDT_KSV_CAPABOOK_MEM,
                        FINISH_DATE: serviceLib.getCurrDate().substring(0, 8),
                    };
                    setDataEDT_KSV_CAPABOOK_MEM(_tQryObj);
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

        var tFactoryCd = [];
        if (tUserInfo.PART === "EPS") tFactoryCd = [" ", "ETP"];
        else if (tUserInfo.PART === "VPS") tFactoryCd = [" ", "BVT"];
        else tFactoryCd = [" ", "BVT", "ETP"];
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

    const exportExcelTBL_KSV_ORDER_MST = () => {
        import("xlsx").then((xlsx) => {
            const worksheet = xlsx.utils.json_to_sheet(
                datasTBL_KSV_CAPABOOK_MEM,
            );
            const workbook = {
                Sheets: { data: worksheet },
                SheetNames: ["data"],
            };
            const excelBuffer = xlsx.write(workbook, {
                bookType: "xlsx",
                type: "array",
            });
            saveAsExcelFileTBL_KSV_ORDER_MST(
                excelBuffer,
                "Production Finish List",
            );
        });
    };

    const saveAsExcelFileTBL_KSV_ORDER_MST = (buffer, fileName) => {
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

    const renderIcon = (value) => {
        if (value === 0)
            return <i className="pi pi-check" style={{ color: "green" }} />;
        if (value === "O")
            return <i className="pi pi-check" style={{ color: "green" }} />;
        if (value === "X")
            return <i className="pi pi-times" style={{ color: "red" }} />;
        return value;
    };

    return (
        <div className="af-div-main">
            <div
                className="af-div-first"
                style={{ width: "123rem", height: "3rem" }}
            >
                <span className="af-span-3-0" style={{ width: "17rem" }}>
                    <p className="af-span-p" style={{ width: "7rem" }}>Last Date</p>
                    <div className="af-span-div" style={{ width: "9rem" }}>
                        <InputText
                            style={{ width: "9rem" }}
                            id="id_BOOK_DATE"
                            value={dataQRY_KSV_CAPABOOK_MEM.BOOK_DATE}
                            onChange={(e) =>
                                onInputChangeQRY_KSV_CAPABOOK_MEM_BOOK_DATE(
                                    e,
                                    "BOOK_DATE",
                                )
                            }
                        />
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
                <span className="af-span-3-0" style={{ width: "17rem" }}>
                    <p className="af-span-p" style={{ width: "7rem" }}>Buyer#</p>
                    <div className="af-span-div" style={{ width: "9rem" }}>
                        <Dropdown
                            style={{ width: "9rem" }}
                            id="id_FACTORY"
                            value={dataQRY_KSV_CAPABOOK_MEM_BUYER_CD}
                            onChange={(e) =>
                                onDropdownChangeQRY_KSV_CAPABOOK_MEM_BUYER_CD(
                                    e,
                                    "BUYER_CD",
                                )
                            }
                            options={datasQRY_KSV_CAPABOOK_MEM_BUYER_CD}
                            optionLabel="BUYER_NAME"
                            placeholder=""
                            editable
                            filter
                        ></Dropdown>
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "17rem" }}>
                    <p className="af-span-p" style={{ width: "7rem" }}>Order#</p>
                    <div className="af-span-div" style={{ width: "9rem" }}>
                        <InputText
                            style={{ width: "9rem" }}
                            id="id_BOOK_DATE"
                            value={dataQRY_KSV_CAPABOOK_MEM.ORDER_CD}
                            onChange={(e) =>
                                onInputChangeQRY_KSV_CAPABOOK_MEM_ORDER_CD(
                                    e,
                                    "ORDER_CD",
                                )
                            }
                        />
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
                <span className="af-span-3" style={{ width: "10rem" }}>
                    <div className="af-span-div-btn" style={{ width: "9rem" }}>
                        <Button
                            style={{ width: "9rem" }}
                            label="Excel"
                            className="p-button-text green"
                            onClick={exportExcelTBL_KSV_ORDER_MST}
                        />
                    </div>
                </span>
            </div>

            <div
                className="af-div-first"
                style={{ width: "123rem", height: "32rem" }}
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
                        setSelectedTBL_KSV_CAPABOOK_MEM(e.value);
                    }}
                    onRowClick={onRowClickTBL_KSV_CAPABOOK_MEM}
                    dataKey="ORDER_CD"
                    className="datatable-responsive"
                    virtualScrollerOptions={{ itemSize: 20 }}
                    emptyMessage=" " //header={headerTBL_KSV_CAPABOOK_MEM}
                    responsiveLayout="scroll"
                    scrollable
                    scrollHeight="32rem"
                >
                    <AFColumn selectionMode="multiple" field="__checkbox__" reorderable={false} headerClassName="t-header" headerStyle={{ width: "3rem" }} ></AFColumn>
                    <AFColumn style={{ width: "2rem" }} className="af-col" field="JOB_CD" headerClassName="t-header" header="Job" ></AFColumn>
                    <AFColumn style={{ width: "7rem" }} className="af-col" field="IN_DATE" headerClassName="t-header" header="In Date" body={(rowData) => serviceLib.dateFormat(rowData.IN_DATE) } ></AFColumn>
                    <AFColumn style={{ width: "7rem" }} className="af-col" field="END_PRODUCTION_DATE" headerClassName="t-header" header="Finish Date" body={(rowData) => serviceLib.dateFormat(rowData.END_PRODUCTION_DATE) } ></AFColumn>
                    <AFColumn style={{ width: "10rem" }} className="af-col" field="BUYER_NAME" headerClassName="t-header" header="Buyer Name" ></AFColumn>
                    <AFColumn style={{ width: "3rem" }} className="af-col" field="BUYER_CD" headerClassName="t-header" header="Buyer CD" ></AFColumn>
                    <AFColumn style={{ width: "6rem" }} className="af-col" field="PO_CD" headerClassName="t-header" header="PO#" ></AFColumn>
                    <AFColumn style={{ width: "7rem" }} className="af-col" field="ORDER_CD" headerClassName="t-header" header="Order#" ></AFColumn>
                    <AFColumn style={{ width: "10rem" }} className="af-col" field="STYLE_NAME" headerClassName="t-header" header="Style Name" ></AFColumn>
                    <AFColumn style={{ width: "7rem" }} className="af-col" field="STYLE_CD" headerClassName="t-header" header="Style CD" ></AFColumn>
                    <AFColumn style={{ width: "6rem" }} className="af-col" field="NR" headerClassName="t-header" header="N/R" ></AFColumn>
                    <AFColumn style={{ width: "6rem" }} className="af-col" field="QTY" headerClassName="t-header" header="Qty" bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.QTY) } ></AFColumn>
                    <AFColumn style={{ width: "6rem" }} className="af-col" field="MW" headerClassName="t-header" header="M/W" ></AFColumn>
                    <AFColumn style={{ width: "7rem" }} className="af-col" field="SHIP_DATE" headerClassName="t-header" header="Ship Date" body={(rowData) => serviceLib.dateFormat(rowData.SHIP_DATE) } ></AFColumn>
                    <AFColumn style={{ width: "7rem" }} className="af-col" field="S_ETA" headerClassName="t-header" header="S ETA" body={(rowData) => serviceLib.dateFormat(rowData.S_ETA)} ></AFColumn>
                    <AFColumn style={{ width: "7rem" }} className="af-col" field="M_ETA" headerClassName="t-header" header="M ETA" body={(rowData) => serviceLib.dateFormat(rowData.M_ETA)} ></AFColumn>
                    <AFColumn style={{ width: "7rem" }} className="af-col" field="SD" headerClassName="t-header" header="S/D" body={(rowData) => serviceLib.dateFormat(rowData.SD)} ></AFColumn>
                    <AFColumn style={{ width: "6rem" }} className="af-col" field="FOB" headerClassName="t-header" header="FOB" bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numToFixed(rowData.FOB, 2) } ></AFColumn>
                    <AFColumn style={{ width: "6rem" }} className="af-col" field="EXP_CMPT" headerClassName="t-header" header="Exp CMPT" bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numToFixed(rowData.EXP_CMPT, 2) } ></AFColumn>
                    <AFColumn style={{ width: "4rem" }} className="af-col" field="NEGO_TYPE" headerClassName="t-header" header="Nego TYPE" ></AFColumn>
                    {[
                        "EMBRO",
                        "TP",
                        "SP",
                        "LTHR",
                        "G",
                        "W",
                        "S",
                        "FND",
                        "DL",
                        "TPR",
                        "EMBOSSING",
                        "WASHING",
                        "DOWN",
                        "CUT",
                        "FTP",
                        "DTP",
                        "LAZE",
                    ].map((field) => (
                        <Column
                            key={field}
                            field={field}
                            className="af-col"
                            headerClassName="t-header"
                            header={serviceLib.getLocaleMessage(
                                `id_msg_${field}_${field}`,
                            )}
                            style={{
                                width: "10rem",
                                height: "1.8rem",
                                flexBasis: "auto",
                                textAlign: "center",
                            }}
                            bodyStyle={{ textAlign: "center" }}
                            body={(rowData) => renderIcon(rowData[field])}
                        />
                    ))}
                    <AFColumn style={{ width: "8rem" }} className="af-col" field="BVT_KIND" headerClassName="t-header" header="BVT" ></AFColumn>
                    <AFColumn style={{ width: "4rem" }} className="af-col" field="SEQ" headerClassName="t-header" header="SEQ" ></AFColumn>
                    <AFColumn style={{ width: "10rem" }} className="af-col" field="REMARK" headerClassName="t-header" header="Remark" ></AFColumn>
                </AFDataTable>
            </div>

            <div
                className="af-div-first"
                style={{ width: "123rem", height: "3rem" }}
            >
                <span className="af-span-3-0" style={{ width: "20rem" }}>
                    <div className="af-span-div-btn" style={{ width: "19rem" }}>
                        <Button
                            style={{ width: "19rem" }}
                            label="Production Finish"
                            className="p-button-text"
                            onClick={process_END}
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "20rem" }}>
                    <div className="af-span-div-btn" style={{ width: "19rem" }}>
                        <Button
                            style={{ width: "19rem" }}
                            label="Production End Cancel"
                            className="p-button-text"
                            onClick={process_END_CANCEL}
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "20rem" }}>
                    <span style={{ width: "6rem", marginRight: "5px" }}>
                        Finish Date
                    </span>
                    <Calendar
                        showButtonBar
                        style={{ width: "9rem" }}
                        dateFormat="yy-mm-dd"
                        value={changeDateVal(
                            dataEDT_KSV_CAPABOOK_MEM.FINISH_DATE,
                        )}
                        onChange={(e) =>
                            onCalChangedataEDT_KSV_CAPABOOK_MEM_FINISH_DATE(e)
                        }
                    />
                </span>
            </div>

            <Toast ref={toast} />

            <Dialog
                visible={isAllList}
                position="mid-center"
                style={{ width: "85vw" }}
                header="전체목록"
                modal={true}
                className="p-fluid"
                onHide={hideDialog}
            >
                <div
                    className="af-div-first"
                    style={{ width: "59rem", height: "40rem" }}
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
                        <AFColumn selectionMode="single" field="__checkbox__" reorderable={false} headerStyle={{ width: "5px" }} style={{ width: "5px" }} ></AFColumn>
                        <AFColumn field="KIND" headerClassName="t-header" header="Kind" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                        <AFColumn field="USER_ID" headerClassName="t-header" header="User" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                        <AFColumn field="BOOK_DATE" headerClassName="t-header" header="Book Date" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} body={(rowData) => serviceLib.dateFormat(rowData.BOOK_DATE) } ></AFColumn>
                    </AFDataTable>
                </div>
            </Dialog>
        </div>
    );
};

const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(S0508_CAPABOOK_LIST_BVT, comparisonFn);
