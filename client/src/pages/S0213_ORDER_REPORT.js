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
import { ServiceS0213_ORDER_REPORT } from "../service/service_biz/ServiceS0213_ORDER_REPORT";

// import './page_common.scss';

const moment = require("moment");

const emptyKCD_CODE = {
    id: 0,
    CD_GROUP: "",
    CD_CODE: "",
    CD_NAME: "",
    CD_FLAG: "",
};

const emptyQRY_KSV_ORDER_MST1 = {
    LAST_DATE: "",
};

const emptyQRY_KSV_ORDER_MST = {
    STYLE_CD: "",
    DUEDATE_FLAG: "0",
    S_DUE_DATE: "",
    E_DUE_DATE: "",
    ORDER_CD: "",

    BUYER_CD: "",
    SHIPDATE_FLAG: "0",

    FACTORY_CD: "",

    CHECK_FLAG_2: "0",
    CHECK_FLAG_3: "0",
    CHECK_FLAG_4: "0",
    CHECK_FLAG_7: "0",
    CHECK_FLAG_8: "0",
    CHECK_FLAG_9: "0",

    S_SHIP_DATE: "",
    E_SHIP_DATE: "",
};

const emptyTBL_KSV_ORDER_MST = {
    id: 0,
    ORDER_CD: "",
    STYLE_NAME: "",
    STYLE_CD: "",
    DUE_DATE: "",
    SHIP_DATE: "",
    TOT_CNT: "",
    SHIP_CNT: "",
    AVR_PRICE: "",
    USD_RATE: "",
    PRICE: "",
    ORDER_AMT: "",
    MATL_AMT: "",
    FC_PRICE: "",
    ETC_AMT: "",
    OVER_AMT: "",
    WORK_AMT: "",
    WORK_PRICE: "",
    WORK_PROFIT: "",
};

const S0213_ORDER_REPORT = () => {
    const serviceLibRef = useRef(null);
    if (!serviceLibRef.current) {
        serviceLibRef.current = new ServiceLib();
        serviceLibRef.current.loginConfirm();
    }
    const serviceLib = serviceLibRef.current;
    const serviceS0213_ORDER_REPORTRef = useRef(null);
    if (!serviceS0213_ORDER_REPORTRef.current) serviceS0213_ORDER_REPORTRef.current = new ServiceS0213_ORDER_REPORT();
    const serviceS0213_ORDER_REPORT = serviceS0213_ORDER_REPORTRef.current;

    const toast = useRef(null);

    /* splitter 관련 */
    const [styleVal, setStyleVal] = useState({ width: "65vw" });
    const [matlUpdateDate, setMatlUpdateDate] = useState('');

    const process_RESET = () => {
        setDataQRY_KSV_ORDER_MST(emptyQRY_KSV_ORDER_MST);
        setDataQRY_KSV_ORDER_MST_STYLE_CD(datasQRY_KSV_ORDER_MST_STYLE_CD[0]);
        setDataQRY_KSV_ORDER_MST_BUYER_CD(datasQRY_KSV_ORDER_MST_BUYER_CD[0]);
        setDataQRY_KSV_ORDER_MST_FACTORY_CD(
            datasQRY_KSV_ORDER_MST_FACTORY_CD[0],
        );
        setDatasTBL_KSV_ORDER_MST([]);
        setDatasTBL_KSV_ORDER_MST2([]);
    };

    const process_EXCEL_ORDER_STATUS = () => {
        if (dataQRY_KSV_ORDER_MST.S_DUE_DATE === "") {
            alert("시작날짜는 필수입력값 입니다.<br><br>The start date is a required input value.");
            return;
        }

        var tInObj = { ...dataQRY_KSV_ORDER_MST };
        tInObj.SHIPDATE_FLAG = "1";
        tInObj.DETAIL_FLAG = "0";

        setLoadingTBL_KSV_ORDER_MST(true);
        // setDatasTBL_KSV_ORDER_MST([]);
        // setDatasTBL_KSV_ORDER_MST2([]);

        serviceS0213_ORDER_REPORT
            .mgrQuery_EXCEL_ORDER_STATUS(tInObj)
            .then((data) => {
                setLoadingTBL_KSV_ORDER_MST(false);
                if (typeof data.graphQLErrors === "undefined") {
                    if (data.length > 0) {
                        if (data[0].CODE.includes("SUCC")) {
                            serviceLib.downloadFile(
                                data[0].CODE.split("?")[2].toString(),
                                data[0].CODE.split("?")[1].toString(),
                            );
                        }
                    }
                } else {
                    // var tStr = data.graphQLErrors[0].message;
                    console.log(
                        "ServiceNawooAll.mgrQueryTBL_KSV_ORDER_MST()error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });

        // Service : NawooAll:mgrQueryTBL_KSV_ORDER_MST
    };

    const process_EXCEL_ORDER_STATUS_DETAIL = () => {
        if (dataQRY_KSV_ORDER_MST.S_DUE_DATE === "") {
            alert("시작날짜는 필수입력값 입니다.<br><br>The start date is a required input value.");
            return;
        }

        var tInObj = { ...dataQRY_KSV_ORDER_MST };
        tInObj.SHIPDATE_FLAG = "1";
        tInObj.DETAIL_FLAG = "1";

        setLoadingTBL_KSV_ORDER_MST(true);
        setDatasTBL_KSV_ORDER_MST([]);
        setDatasTBL_KSV_ORDER_MST2([]);

        serviceS0213_ORDER_REPORT
            .mgrQuery_EXCEL_ORDER_STATUS(tInObj)
            .then((data) => {
                setLoadingTBL_KSV_ORDER_MST(false);
                if (typeof data.graphQLErrors === "undefined") {
                    if (data.length > 0) {
                        if (data[0].CODE.includes("SUCC")) {
                            serviceLib.downloadFile(
                                data[0].CODE.split("?")[2].toString(),
                                data[0].CODE.split("?")[1].toString(),
                            );
                        }
                    }
                } else {
                    // var tStr = data.graphQLErrors[0].message;
                    console.log(
                        "ServiceNawooAll.mgrQueryTBL_KSV_ORDER_MST()error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });

        // Service : NawooAll:mgrQueryTBL_KSV_ORDER_MST
    };

    const process_EXCEL_REPORT2 = () => {
        if (dataQRY_KSV_ORDER_MST.S_DUE_DATE === "") {
            alert("시작날짜는 필수입력값 입니다.<br><br>The start date is a required input value.");
            return;
        }
        var tInObj = { ...dataQRY_KSV_ORDER_MST };
        tInObj.SHIPDATE_FLAG = "1";

        setLoadingTBL_KSV_ORDER_MST(true);
        setDatasTBL_KSV_ORDER_MST([]);
        setDatasTBL_KSV_ORDER_MST2([]);

        serviceS0213_ORDER_REPORT
            .mgrQuery_EXCEL_REPORT2(tInObj)
            .then((data) => {
                setLoadingTBL_KSV_ORDER_MST(false);
                if (typeof data.graphQLErrors === "undefined") {
                    if (data.length > 0) {
                        if (data[0].CODE.includes("SUCC")) {
                            serviceLib.downloadFile(
                                data[0].CODE.split("?")[2].toString(),
                                data[0].CODE.split("?")[1].toString(),
                            );
                        }
                    }
                } else {
                    console.log(
                        "ServiceNawooAll.mgrQueryTBL_KSV_ORDER_MST()error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });
    };

    const process_EXCEL_REPORT4 = () => {
        if (dataQRY_KSV_ORDER_MST.S_DUE_DATE === "") {
            alert("시작날짜는 필수입력값 입니다.<br><br>The start date is a required input value.");
            return;
        }

        var tInObj = { ...dataQRY_KSV_ORDER_MST };
        tInObj.SHIPDATE_FLAG = "1";

        setLoadingTBL_KSV_ORDER_MST(true);
        setDatasTBL_KSV_ORDER_MST([]);
        setDatasTBL_KSV_ORDER_MST2([]);

        serviceS0213_ORDER_REPORT
            .mgrQuery_EXCEL_REPORT4(tInObj)
            .then((data) => {
                setLoadingTBL_KSV_ORDER_MST(false);
                if (typeof data.graphQLErrors === "undefined") {
                    if (data.length > 0) {
                        if (data[0].CODE.includes("SUCC")) {
                            serviceLib.downloadFile(
                                data[0].CODE.split("?")[2].toString(),
                                data[0].CODE.split("?")[1].toString(),
                            );
                        }
                    }
                } else {
                    console.log(
                        "ServiceNawooAll.mgrQueryTBL_KSV_ORDER_MST()error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });
    };

    const process_EXCEL_REPORT8 = () => {
        if (dataQRY_KSV_ORDER_MST.S_DUE_DATE === "") {
            alert("시작날짜는 필수입력값 입니다.<br><br>The start date is a required input value.");
            return;
        }

        var tInObj = { ...dataQRY_KSV_ORDER_MST };
        tInObj.SHIPDATE_FLAG = "1";

        setLoadingTBL_KSV_ORDER_MST(true);
        setDatasTBL_KSV_ORDER_MST([]);
        setDatasTBL_KSV_ORDER_MST2([]);

        serviceS0213_ORDER_REPORT
            .mgrQuery_EXCEL_REPORT8(tInObj)
            .then((data) => {
                setLoadingTBL_KSV_ORDER_MST(false);
                if (typeof data.graphQLErrors === "undefined") {
                    if (data.length > 0) {
                        if (data[0].CODE.includes("SUCC")) {
                            serviceLib.downloadFile(
                                data[0].CODE.split("?")[2].toString(),
                                data[0].CODE.split("?")[1].toString(),
                            );
                        }
                    }
                } else {
                    console.log(
                        "ServiceNawooAll.mgrQueryTBL_KSV_ORDER_MST()error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });
    };

    const process_EXCEL_REPORT9 = () => {
        if (dataQRY_KSV_ORDER_MST.S_DUE_DATE === "") {
            alert("시작날짜는 필수입력값 입니다.<br><br>The start date is a required input value.");
            return;
        }

        var tInObj = { ...dataQRY_KSV_ORDER_MST };
        tInObj.SHIPDATE_FLAG = "1";

        setLoadingTBL_KSV_ORDER_MST(true);
        setDatasTBL_KSV_ORDER_MST([]);
        setDatasTBL_KSV_ORDER_MST2([]);

        serviceS0213_ORDER_REPORT
            .mgrQuery_EXCEL_REPORT9(tInObj)
            .then((data) => {
                setLoadingTBL_KSV_ORDER_MST(false);
                if (typeof data.graphQLErrors === "undefined") {
                    if (data.length > 0) {
                        if (data[0].CODE.includes("SUCC")) {
                            serviceLib.downloadFile(
                                data[0].CODE.split("?")[2].toString(),
                                data[0].CODE.split("?")[1].toString(),
                            );
                        }
                    }
                } else {
                    console.log(
                        "ServiceNawooAll.mgrQueryTBL_KSV_ORDER_MST()error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });
    };

    const process_EXCEL_REPORT10 = () => {
        if (dataQRY_KSV_ORDER_MST.S_DUE_DATE === "") {
            alert("시작날짜는 필수입력값 입니다.<br><br>The start date is a required input value.");
            return;
        }

        var tInObj = { ...dataQRY_KSV_ORDER_MST };
        tInObj.SHIPDATE_FLAG = "1";

        setLoadingTBL_KSV_ORDER_MST(true);
        setDatasTBL_KSV_ORDER_MST([]);
        setDatasTBL_KSV_ORDER_MST2([]);

        serviceS0213_ORDER_REPORT
            .mgrQuery_EXCEL_REPORT10(tInObj)
            .then((data) => {
                setLoadingTBL_KSV_ORDER_MST(false);
                if (typeof data.graphQLErrors === "undefined") {
                    if (data.length > 0) {
                        if (data[0].CODE.includes("SUCC")) {
                            serviceLib.downloadFile(
                                data[0].CODE.split("?")[2].toString(),
                                data[0].CODE.split("?")[1].toString(),
                            );
                        }
                    }
                } else {
                    console.log(
                        "ServiceNawooAll.mgrQueryTBL_KSV_ORDER_MST()error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });
    };

    const process_UPDATE_MATLAMT = () => {
        setLoadingTBL_KSV_ORDER_MST(true);
        setDatasTBL_KSV_ORDER_MST([]);
        setDatasTBL_KSV_ORDER_MST2([]);

        serviceS0213_ORDER_REPORT
            .mgrQuery_UPDATE_MATLAMT(dataQRY_KSV_ORDER_MST)
            .then((data) => {
                setLoadingTBL_KSV_ORDER_MST(false);
                if (typeof data.graphQLErrors === "undefined") {
                    if (data.length > 0) {
                        alert(data[0].CODE);
                    }
                } else {
                    // var tStr = data.graphQLErrors[0].message;
                    console.log(
                        "ServiceNawooAll.mgrQueryTBL_KSV_ORDER_MST()error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });

        // Service : NawooAll:mgrQueryTBL_KSV_ORDER_MST
    };

    const search_QRY_STYLE_BY_BUYER = (argBuyer) => {
        var tObj = {};
        tObj.BUYER_CD = argBuyer;

        serviceS0213_ORDER_REPORT
            .mgrQuery_QRY_STYLE_BY_BUYER(tObj)
            .then((data) => {
                if (typeof data.graphQLErrors === "undefined") {
                    if (data.length > 0) {
                        setDatasQRY_KSV_ORDER_MST_STYLE_CD(data);
                    }
                } else {
                    // var tStr = data.graphQLErrors[0].message;
                    console.log(
                        "ServiceNawooAll.mgrQueryTBL_KSV_ORDER_MST()error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });

        // Service : NawooAll:mgrQueryTBL_KSV_ORDER_MST
    };

    /* QRY KSV_ORDER_MST*/
    const [dataQRY_KSV_ORDER_MST1, setDataQRY_KSV_ORDER_MST1] = useState(
        emptyQRY_KSV_ORDER_MST1,
    );

    /* QRY KSV_ORDER_MST*/
    const [dataQRY_KSV_ORDER_MST, setDataQRY_KSV_ORDER_MST] = useState(
        emptyQRY_KSV_ORDER_MST,
    );

    const [
        datasQRY_KSV_ORDER_MST_STYLE_CD,
        setDatasQRY_KSV_ORDER_MST_STYLE_CD,
    ] = useState([]);
    const [dataQRY_KSV_ORDER_MST_STYLE_CD, setDataQRY_KSV_ORDER_MST_STYLE_CD] =
        useState({});

    const [
        datasQRY_KSV_ORDER_MST_BUYER_CD,
        setDatasQRY_KSV_ORDER_MST_BUYER_CD,
    ] = useState([]);
    const [dataQRY_KSV_ORDER_MST_BUYER_CD, setDataQRY_KSV_ORDER_MST_BUYER_CD] =
        useState({});

    const onDropdownChangeQRY_KSV_ORDER_MST_BUYER_CD = (e, name) => {
        let val = (e.value && e.value.BUYER_CD) || "";

        let _dataQRY_KSV_ORDER_MST = { ...dataQRY_KSV_ORDER_MST };

        let tTypeVal = _dataQRY_KSV_ORDER_MST[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_ORDER_MST[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_ORDER_MST[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_ORDER_MST(_dataQRY_KSV_ORDER_MST);
        setDataQRY_KSV_ORDER_MST_BUYER_CD(e.value);

        search_QRY_STYLE_BY_BUYER(e.value.BUYER_CD);
    };

    const [
        datasQRY_KSV_ORDER_MST_FACTORY_CD,
        setDatasQRY_KSV_ORDER_MST_FACTORY_CD,
    ] = useState([]);
    const [
        dataQRY_KSV_ORDER_MST_FACTORY_CD,
        setDataQRY_KSV_ORDER_MST_FACTORY_CD,
    ] = useState({});

    const onDropdownChangeQRY_KSV_ORDER_MST_FACTORY_CD = (e, name) => {
        let val = (e.value && e.value.FACTORY_CD) || "";

        let _dataQRY_KSV_ORDER_MST = { ...dataQRY_KSV_ORDER_MST };

        let tTypeVal = _dataQRY_KSV_ORDER_MST[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_ORDER_MST[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_ORDER_MST[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_ORDER_MST(_dataQRY_KSV_ORDER_MST);
        setDataQRY_KSV_ORDER_MST_FACTORY_CD(e.value);
    };

    const onCalChangeMATL_UPDATE_DATE = (e) => {
        let val1 = e.value || "";
        let val = "";
        if (val1 === "") {
            val = "";
        } else {
            val = getDateVal(val1);
        }
        setMatlUpdateDate(val);
    };

    const onCalChangeQRY_KSV_ORDER_MST_S_DUE_DATE = (e, name) => {
        let val1 = e.value || "";
        let val = "";
        if (val1 === "") {
            val = "";
        } else {
            val = getDateVal(val1);
        }

        let _dataQRY_KSV_ORDER_MST = { ...dataQRY_KSV_ORDER_MST };
        _dataQRY_KSV_ORDER_MST[`${name}`] = val;
        setDataQRY_KSV_ORDER_MST(_dataQRY_KSV_ORDER_MST);
    };

    const onCalChangeQRY_KSV_ORDER_MST_E_DUE_DATE = (e, name) => {
        let val1 = e.value || "";
        let val = "";
        if (val1 === "") {
            val = "";
        } else {
            val = getDateVal(val1);
        }

        let _dataQRY_KSV_ORDER_MST = { ...dataQRY_KSV_ORDER_MST };
        _dataQRY_KSV_ORDER_MST[`${name}`] = val;
        setDataQRY_KSV_ORDER_MST(_dataQRY_KSV_ORDER_MST);
    };

    const onInputChangeQRY_KSV_ORDER_MST_ORDER_CD = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_ORDER_MST = { ...dataQRY_KSV_ORDER_MST };

        let tTypeVal = _dataQRY_KSV_ORDER_MST[`${name}`];
        if (typeof tTypeVal === "string")
            _dataQRY_KSV_ORDER_MST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_ORDER_MST[`${name}`] = parseInt(val);

        setDataQRY_KSV_ORDER_MST(_dataQRY_KSV_ORDER_MST);
    };

    const onCheckboxChangeQRY_KSV_ORDER_MST_CHECK_FLAG_3 = (e, name) => {
        let val = "";
        let _dataQRY_KSV_ORDER_MST = { ...dataQRY_KSV_ORDER_MST };
        if (e.checked) {
            val = "1";
        } else {
            val = "0";
        }
        _dataQRY_KSV_ORDER_MST[`${name}`] = val;
        setDataQRY_KSV_ORDER_MST(_dataQRY_KSV_ORDER_MST);
    };

    /* TABLE KSV_ORDER_MST*/
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
    };

    const onRowClickTBL_KSV_ORDER_MST = (event) => {
        let argTBL_KSV_ORDER_MST = event.data;
        if (flagSelectModeTBL_KSV_ORDER_MST) return;

        // Service : NawooAll:mgrQueryTBL_KSV_ORDER_MST
    };

    const search_LIST_1 = () => {
        if (dataQRY_KSV_ORDER_MST.S_DUE_DATE === "") {
            alert("시작날짜는 필수입력값 입니다.<br><br>The start date is a required input value.");
            return;
        }

        clearSelectedTBL_KSV_ORDER_MST();
        setLoadingTBL_KSV_ORDER_MST(true);
        setDatasTBL_KSV_ORDER_MST([]);
        setDatasTBL_KSV_ORDER_MST2([]);
        setSelectedTBL_KSV_ORDER_MST([]);

        serviceS0213_ORDER_REPORT
            .mgrQuery_LIST_1(dataQRY_KSV_ORDER_MST)
            .then((data) => {
                setLoadingTBL_KSV_ORDER_MST(false);
                if (typeof data.graphQLErrors === "undefined") {
                    console.log(
                        "ServiceNawooAll.mgrQueryTBL_KSV_ORDER_MST() call => " +
                            data.length,
                    );
                    var tArray = [];
                    var s_ord_amt = 0;
                    var s_matl_amt = 0;
                    var s_fc_amt = 0;
                    var s_etc_amt = 0;
                    var s_comm_amt = 0;
                    var s_tot_amt = 0;
                    var s_diff = 0;
                    var s_rate = 0;
                    var tTotalObj = [];
                    data.forEach((col, i) => {
                        var tObj = { ...col };
                        tObj.id = i + 1;

                        if (tObj.ORDER_CD !== "TOTAL") {
                            tArray.push(tObj);
                            // if (col.STYLE_CD !== '00-0000' && col.ORDER_STATUS !== '4') {
                            s_ord_amt += parseFloat(col.ORDER_AMT);
                            s_matl_amt += parseFloat(col.MATL_AMT);
                            s_fc_amt += parseFloat(col.FC_AMT);
                            s_etc_amt += parseFloat(col.ETC_AMT);
                            s_comm_amt += parseFloat(col.COMM_AMT);
                            s_tot_amt += parseFloat(col.TOT_AMT);
                            s_diff += parseFloat(col.DIFF);
                            s_rate += parseFloat(col.RATE);
                            // }
                        } else {
                            tTotalObj.push(tObj);
                        }
                    });
                    setDatasTBL_KSV_ORDER_MST(tArray);

                    var col = { ...tTotalObj[0] };
                    s_ord_amt = parseFloat(col.ORDER_AMT);
                    s_matl_amt = parseFloat(col.MATL_AMT);
                    s_fc_amt = parseFloat(col.FC_AMT);
                    s_etc_amt = parseFloat(col.ETC_AMT);
                    s_comm_amt = parseFloat(col.COMM_AMT);
                    s_tot_amt = parseFloat(col.TOT_AMT);
                    s_diff = parseFloat(col.DIFF);
                    s_rate = parseFloat(col.RATE);

                    var tQryObj = { ...dataQRY_KSV_ORDER_MST };
                    var tRetArray1 = [];
                    var tObjSum = {};
                    tObjSum.DATE = `선적일 TOTAL(${tQryObj.S_DUE_DATE} - ${tQryObj.E_DUE_DATE}) `;
                    tObjSum.ORD_AMT = String(s_ord_amt);
                    tObjSum.MATL_AMT = String(s_matl_amt);
                    tObjSum.FC_AMT = String(s_fc_amt);
                    tObjSum.ETC_AMT = String(s_etc_amt);
                    tObjSum.COMM_AMT = String(s_comm_amt);
                    tObjSum.TOT_AMT = String(s_tot_amt);
                    tObjSum.DIFF = String(s_ord_amt - s_tot_amt);
                    if (s_ord_amt > 0)
                        tObjSum.RATE = String(
                            ((s_ord_amt - s_tot_amt) / s_ord_amt) * 100,
                        );
                    else tObjSum.RATE = "0";
                    tRetArray1.push(tObjSum);
                    setDatasTBL_KSV_ORDER_MST2(tRetArray1);
                } else {
                    // var tStr = data.graphQLErrors[0].message;
                    console.log(
                        "ServiceNawooAll.mgrQueryTBL_KSV_ORDER_MST()error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });

        // Service : NawooAll:mgrQueryTBL_KSV_ORDER_MST
    };

    const clearSelectedTBL_KSV_ORDER_MST = () => {
        setSelectedTBL_KSV_ORDER_MST([]);
        setFlagSelectModeTBL_KSV_ORDER_MST(false);
    };

    const exportExcelTBL_KSV_ORDER_MST = () => {
        function fixNumber(v) {
            if (v === null || v === undefined || v === "") return "";
            const n = Number(v);
            if (isNaN(n)) return v;
            return Number(n.toFixed(2));
        }

        function fixNumber_0(v) {
            if (v === null || v === undefined || v === "") return "";
            const n = Number(v);
            if (isNaN(n)) return v;
            return Number(n.toFixed(0));
        }

        var tArray = [];
        datasTBL_KSV_ORDER_MST.forEach((col, i) => {
            var tObj = {};
            tObj.오더번호 = col.ORDER_CD;
            tObj.스타일 = col.STYLE_NAME;
            tObj.납기일 = col.DUE_DATE;
            tObj.수주량 = fixNumber_0(col.TOT_CNT);
            tObj.선적량 = fixNumber_0(col.SHIP_CNT);
            tObj.선적일 = moment(col.SHIP_DATE).format('YYYY-MM-DD');
            tObj.단가 = fixNumber(col.AVR_PRICE);
            tObj.수주금액 = fixNumber(col.ORDER_AMT);
            tObj.자재금액 = fixNumber(col.MATL_AMT);
            tObj.임가공비 = fixNumber(col.FC_AMT);
            tObj.기타비용 = fixNumber(col.ETC_AMT);
            tObj.커미션 = fixNumber(col.COMM_AMT);
            tObj.제조총액 = fixNumber(col.TOT_AMT);
            tObj.제조단가 = fixNumber(col.TOT_PRICE);
            tObj.제조손익 = fixNumber(col.DIFF);
            tObj.손익률 = fixNumber(col.RATE);
            tObj.Ship_Tot = fixNumber(col.SHIP_TOT);
            tObj.Ship_Rate = fixNumber(col.SHIP_RATE);
            tObj.Factory = col.FACTORY;
            tObj.Buyer = col.BUYER;
            tArray.push(tObj);
        });

        import("sheetjs-style").then((XLSX) => {
            const headers = [
                "오더번호",
                "스타일",
                "납기일",
                "수주량",
                "선적량",
                "선적일",
                "단가",
                "수주금액",
                "자재금액",
                "임가공비",
                "기타비용",
                "커미션",
                "제조총액",
                "제조단가",
                "제조손익",
                "손익률",
                "Ship_Tot",
                "Ship_Rate",
                "Factory",
                "Buyer",
            ];

            const rows = tArray.map((r) => [
                r.오더번호,
                r.스타일,
                r.납기일,
                r.수주량,
                r.선적량,
                r.선적일,
                r.단가,
                r.수주금액,
                r.자재금액,
                r.임가공비,
                r.기타비용,
                r.커미션,
                r.제조총액,
                r.제조단가,
                r.제조손익,
                r.손익률,
                r.Ship_Tot,
                r.Ship_Rate,
                r.Factory,
                r.Buyer,
            ]);

            const worksheet = XLSX.utils.aoa_to_sheet([headers, ...rows]);

            const rowCount = rows.length + 1;

            //  numFmt: isNumber ? "#,##0.00" : undefined,  제외. 260701 
            for (let r = 0; r < rowCount; r++) {
                for (let c = 0; c < 20; c++) {
                    const addr = XLSX.utils.encode_cell({ r, c });

                    if (!worksheet[addr]) {
                        worksheet[addr] = { v: "" };
                    }

                    const isHeader = r === 0;
                    const isNumber = c >= 3 && c <= 17;

                    worksheet[addr].s = {
                        font: {
                            name: "돋움",
                            sz: 10,
                            bold: isHeader,
                        },
                        fill: isHeader
                            ? {
                                  patternType: "solid",
                                  fgColor: { rgb: "FFFF99" },
                              }
                            : undefined,
                        alignment: isHeader
                            ? { horizontal: "center" }
                            : isNumber
                              ? { horizontal: "right" }
                              : undefined,
                        border: {
                            top: { style: "thin" },
                            bottom: { style: "thin" },
                            left: { style: "thin" },
                            right: { style: "thin" },
                        },
                    };
                }
            }

            const workbook = {
                Sheets: { data: worksheet },
                SheetNames: ["data"],
            };

            const excelBuffer = XLSX.write(workbook, {
                bookType: "xlsx",
                type: "array",
            });

            saveAsExcelFileTBL_KSV_ORDER_MST(excelBuffer, "오더현황리스트");
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

    //

    /* TABLE KSV_ORDER_MST*/
    // DEFINE DATAGRID : TBL_KSV_ORDER_MST2
    let emptyTBL_KSV_ORDER_MST2 = {};

    const [datasTBL_KSV_ORDER_MST2, setDatasTBL_KSV_ORDER_MST2] = useState([]);
    const dt_TBL_KSV_ORDER_MST2 = useRef(null);
    const [dataTBL_KSV_ORDER_MST2, setDataTBL_KSV_ORDER_MST2] = useState(
        emptyTBL_KSV_ORDER_MST2,
    );
    const [selectedTBL_KSV_ORDER_MST2, setSelectedTBL_KSV_ORDER_MST2] =
        useState([]);
    const [
        flagSelectModeTBL_KSV_ORDER_MST2,
        setFlagSelectModeTBL_KSV_ORDER_MST2,
    ] = useState(false);
    const [loadingTBL_KSV_ORDER_MST2, setLoadingTBL_KSV_ORDER_MST2] =
        useState(false);

    // DATAGRID CODE : TBL_KSV_ORDER_MST2

    const onRowClick1TBL_KSV_ORDER_MST2 = (argData0) => {
        var argData = {};
        if (typeof argData0.length !== "undefined") {
            argData = argData0[0];
        } else {
            argData = argData0;
        }

        let argTBL_KSV_ORDER_MST2 = argData;

        setDataTBL_KSV_ORDER_MST2(argTBL_KSV_ORDER_MST2);
    };

    const onRowClickTBL_KSV_ORDER_MST2 = (event) => {
        let argTBL_KSV_ORDER_MST2 = event.data;
        if (flagSelectModeTBL_KSV_ORDER_MST2) return;
    };

    //

    useEffect(() => {
        var tRetDate1 = serviceLib.getCurrDate();
        var tObj = { ...dataQRY_KSV_ORDER_MST };
        tObj.S_DUE_DATE = tRetDate1.substring(0, 8);
        tObj.E_DUE_DATE = moment().endOf("month").format("YYYYMMDD");
        setDataQRY_KSV_ORDER_MST(tObj);

        serviceS0213_ORDER_REPORT
            .mgrQueryTBL_KSV_ORDER_MST_CODE()
            .then((data) => {
                if (typeof data.graphQLErrors === "undefined") {
                    console.log(
                        "ServiceNawooAll.mgrQueryTBL_KSV_ORDER_MST_CODE() call => " +
                            data.BUYER_CD.length,
                    );
                    setDatasQRY_KSV_ORDER_MST_STYLE_CD(data.STYLE_CD);
                    setDataQRY_KSV_ORDER_MST_STYLE_CD(data.STYLE_CD[0]);

                    setDatasQRY_KSV_ORDER_MST_BUYER_CD(data.BUYER_CD);
                    setDataQRY_KSV_ORDER_MST_BUYER_CD(data.BUYER_CD[0]);

                    setDatasQRY_KSV_ORDER_MST_FACTORY_CD(data.FACTORY_CD);
                    setDataQRY_KSV_ORDER_MST_FACTORY_CD(data.FACTORY_CD[0]);

                    setMatlUpdateDate(data.MATL_UPDATE);

                } else {
                    // var tStr = data.graphQLErrors[0].message;
                    console.log(
                        "ServiceNawooAll.mgrQueryTBL_KSV_ORDER_MST_CODE()error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
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

    return (
        <div className="af-div-main">
            <div
                className="af-div-first"
                style={{ width: "90rem", height: "10rem" }}
            >
                <span className="af-span-3-0" style={{ width: "23rem" }}>
                    <p className="af-span-p" style={{ width: "5rem" }}>선적일</p>
                    <div className="af-span-div" style={{ width: "8rem" }}>
                        <Calendar
                            showButtonBar
                            style={{ width: "8rem" }}
                            dateFormat="yy-mm-dd"
                            id="id_S_SHIP_DATE"
                            value={changeDateVal(
                                dataQRY_KSV_ORDER_MST.S_DUE_DATE,
                            )}
                            onChange={(e) =>
                                onCalChangeQRY_KSV_ORDER_MST_S_DUE_DATE(
                                    e,
                                    "S_DUE_DATE",
                                )
                            }
                        />
                    </div>
                    <p className="af-span-p" style={{ width: "1rem" }}>~</p>
                    <div className="af-span-div" style={{ width: "8rem" }}>
                        <Calendar
                            showButtonBar
                            style={{ width: "8rem" }}
                            dateFormat="yy-mm-dd"
                            id="id_S_SHIP_DATE"
                            value={changeDateVal(
                                dataQRY_KSV_ORDER_MST.E_DUE_DATE,
                            )}
                            onChange={(e) =>
                                onCalChangeQRY_KSV_ORDER_MST_E_DUE_DATE(
                                    e,
                                    "E_DUE_DATE",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "15rem" }}>
                    <p className="af-span-p" style={{ width: "5rem" }}>Order#</p>
                    <div className="af-span-div" style={{ width: "9rem" }}>
                        <InputText
                            style={{ width: "9rem" }}
                            id="id_ORDER_CD"
                            value={dataQRY_KSV_ORDER_MST.ORDER_CD}
                            onChange={(e) =>
                                onInputChangeQRY_KSV_ORDER_MST_ORDER_CD(
                                    e,
                                    "ORDER_CD",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "15rem" }}>
                    <p className="af-span-p" style={{ width: "5rem" }}>Buyer#</p>
                    <div className="af-span-div" style={{ width: "9rem" }}>
                        <Dropdown
                            style={{ width: "9rem" }}
                            id="id_BUYER_CD"
                            value={dataQRY_KSV_ORDER_MST_BUYER_CD}
                            onChange={(e) =>
                                onDropdownChangeQRY_KSV_ORDER_MST_BUYER_CD(
                                    e,
                                    "BUYER_CD",
                                )
                            }
                            options={datasQRY_KSV_ORDER_MST_BUYER_CD}
                            optionLabel="BUYER_NAME"
                            placeholder=""
                            editable
                            filter
                        ></Dropdown>
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "15rem" }}>
                    <p className="af-span-p" style={{ width: "5rem" }}>Factory#</p>
                    <div className="af-span-div" style={{ width: "9rem" }}>
                        <Dropdown
                            id="id_FACTORY_CD"
                            style={{ width: "9rem" }}
                            value={dataQRY_KSV_ORDER_MST_FACTORY_CD}
                            onChange={(e) =>
                                onDropdownChangeQRY_KSV_ORDER_MST_FACTORY_CD(
                                    e,
                                    "FACTORY_CD",
                                )
                            }
                            options={datasQRY_KSV_ORDER_MST_FACTORY_CD}
                            optionLabel="FACTORY_NAME"
                            placeholder=""
                            editable
                        ></Dropdown>
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "6rem" }}>
                    <div className="af-span-checkbox">
                        <Button
                            label={
                                <span>
                                    Search(<u>S</u>)
                                </span>
                            }
                            style={{ width: "6rem" }}
                            className="p-button-text"
                            onClick={search_LIST_1}
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "7rem" }}>
                    <div className="af-span-checkbox">
                        <Button
                            label="Reset"
                            style={{ width: "6rem" }}
                            className="p-button-text"
                            onClick={process_RESET}
                        />
                    </div>
                </span>

                <span className="af-span-3" style={{ width: "11.5rem", marginTop: "1.5rem" }}>
                    <p className="af-span-p" style={{ width: "9rem" }}>3 Excl. NSR</p>
                    <div className="af-span-checkbox">
                        <Checkbox
                            id="id_IS_SAMPLE"
                            checked={changeCheckBoxVal(
                                dataQRY_KSV_ORDER_MST.CHECK_FLAG_3,
                            )}
                            onChange={(e) =>
                                onCheckboxChangeQRY_KSV_ORDER_MST_CHECK_FLAG_3(
                                    e,
                                    "CHECK_FLAG_3",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "13rem" }}>
                    <div className="af-span-checkbox">
                        <Button
                            label="오더현황(종합)"
                            style={{ width: "12rem" }}
                            className="p-button-text green"
                            onClick={process_EXCEL_ORDER_STATUS}
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "13rem" }}>
                    <div className="af-span-checkbox">
                        <Button
                            label="바이어손익"
                            style={{ width: "12rem" }}
                            className="p-button-text green"
                            onClick={process_EXCEL_REPORT4}
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "13rem" }}>
                    <div className="af-span-checkbox">
                        <Button
                            label="바이어현황"
                            style={{ width: "12rem" }}
                            className="p-button-text green"
                            onClick={process_EXCEL_REPORT2}
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "30rem" }}>
                    <div className="af-span-checkbox">
                        <Button
                            label="오더현황(종합)+Detail List"
                            style={{ width: "12rem" }}
                            className="p-button-text green"
                            onClick={process_EXCEL_ORDER_STATUS_DETAIL}
                        />
                    </div>
                </span>

                <span className="af-span-3" style={{ width: "11.5rem" }}>
                    <p className="af-span-p" style={{ width: "9rem" }}></p>
                </span>
                <span className="af-span-3" style={{ width: "13rem" }}>
                    <div className="af-span-checkbox">
                        <Button
                            label="Report(종합월보고)"
                            style={{ width: "12rem" }}
                            className="p-button-text green"
                            onClick={process_EXCEL_REPORT8}
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "13rem" }}>
                    <div className="af-span-checkbox">
                        <Button
                            disabled
                            label="#Report2(팀별/바이어)"
                            style={{ width: "12rem" }}
                            className="p-button-text green"
                            onClick={process_EXCEL_REPORT9}
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "13rem" }}>
                    <div className="af-span-checkbox">
                        <Button
                            label="Etc List"
                            style={{ width: "12rem" }}
                            className="p-button-text green"
                            onClick={process_EXCEL_REPORT10}
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "13rem" }}>
                    <div className="af-span-checkbox">
                        <Button
                            label="Excel"
                            style={{ width: "12rem" }}
                            className="p-button-text green"
                            onClick={exportExcelTBL_KSV_ORDER_MST}
                        />
                    </div>
                </span>
            </div>

            <div
                className="af-div-first"
                style={{ width: "33rem", height: "10rem" }}
            >
                <span className="af-span-3-0" style={{ width: "31rem" }}>
                    <p className="af-span-p" style={{ width: "6rem" }}>Last Date</p>
                    <div className="af-span-div" style={{ width: "8rem" }}>
                        <Calendar
                            showButtonBar
                            dateFormat="yy-mm-dd"
                            id="id_S_SHIP_DATE"
                            value={changeDateVal(
                                matlUpdateDate,
                            )}
                            onChange={(e) =>
                                onCalChangeMATL_UPDATE_DATE(
                                    e
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "31rem" }}>
                    <div className="af-span-checkbox">
                        <Button
                            label="자재금액 가져오기"
                            style={{ width: "15rem" }}
                            className="p-button-text"
                            onClick={process_UPDATE_MATLAMT}
                        />
                    </div>
                </span>
            </div>

            {/* 원래 컬럼//오더번호 스타일 납기일 수주량 선적량 선적일	단가 수주금액 자재금액 임가공비 기타비용 커미션 제조총액 제조단가 제조손익 % 
           컬럼명 조정 필요*/}
            <div
                className="af-div-first"
                style={{ width: "123rem", height: "47rem", marginTop: "-1rem" }}
            >
                <AFDataTable preventUnrelatedRerender
                    ref={dt_TBL_KSV_ORDER_MST}
                    size="small"
                    value={datasTBL_KSV_ORDER_MST}
                    tableStyle={{ tableLayout: "fixed" }}
                    loading={loadingTBL_KSV_ORDER_MST}
                    resizableColumns
                    columnResizeMode="expand"
                    showGridlines
                    selectionMode="checkbox"
                    selection={selectedTBL_KSV_ORDER_MST}
                    onSelectionChange={(e) => {
                        setFlagSelectModeTBL_KSV_ORDER_MST(true);
                        setSelectedTBL_KSV_ORDER_MST(e.value);
                        console.log(
                            "selected length:" +
                                selectedTBL_KSV_ORDER_MST.length,
                        );
                        onRowClick1TBL_KSV_ORDER_MST(e.value);
                    }}
                    onRowClick={onRowClickTBL_KSV_ORDER_MST}
                    dataKey="id"
                    className="datatable-responsive"
                    virtualScrollerOptions={{ itemSize: 20 }}
                    emptyMessage=" "
                    // header={headerTBL_KSV_ORDER_MST}
                    responsiveLayout="scroll"
                    scrollable
                    scrollHeight="512px"
                >
                    <AFColumn field="ORDER_CD" headerClassName="t-header" header="오더번호" style={{ width: "8rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="STYLE_NAME" headerClassName="t-header" header="스타일" style={{ width: "30rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="DUE_DATE" headerClassName="t-header" header="납기일" style={{ width: "8rem", height: "1.8rem", flexBasis: "auto", }} body={(rowData) => serviceLib.dateFormat(rowData.DUE_DATE) } ></AFColumn>
                    <AFColumn field="TOT_CNT" headerClassName="t-header" header="수주량" style={{ width: "8rem", height: "1.8rem", flexBasis: "auto", }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.TOT_CNT) } ></AFColumn>
                    <AFColumn field="SHIP_CNT" headerClassName="t-header" header="선적량" style={{ width: "5rem", height: "1.8rem", flexBasis: "auto", }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.SHIP_CNT) } ></AFColumn>
                    <AFColumn field="SHIP_DATE" headerClassName="t-header" header="선적일" style={{ width: "8rem", height: "1.8rem", flexBasis: "auto", }} body={(rowData) => serviceLib.dateFormat(rowData.SHIP_DATE) } ></AFColumn>
                    <AFColumn field="AVR_PRICE" headerClassName="t-header" header="단가" style={{ width: "5rem", height: "1.8rem", flexBasis: "auto", }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.AVR_PRICE, 4) } ></AFColumn>
                    <AFColumn field="ORDER_AMT" headerClassName="t-header" header="수주금액" style={{ width: "8rem", height: "1.8rem", flexBasis: "auto", }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.ORDER_AMT, 2) } ></AFColumn>
                    <AFColumn field="MATL_AMT" headerClassName="t-header" header="자재금액" style={{ width: "8rem", height: "1.8rem", flexBasis: "auto", }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.MATL_AMT, 2) } ></AFColumn>
                    <AFColumn field="BVT_LOCAL" headerClassName="t-header" header="공장구매자재" style={{ width: "8rem", height: "1.8rem", flexBasis: "auto", }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.BVT_LOCAL, 2) } ></AFColumn>
                    <AFColumn field="FC_AMT" headerClassName="t-header" header="임가공비" style={{ width: "8rem", height: "1.8rem", flexBasis: "auto", }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.FC_AMT, 2) } ></AFColumn>
                    <AFColumn field="ETC_AMT" headerClassName="t-header" header="기타비용" style={{ width: "8rem", height: "1.8rem", flexBasis: "auto", }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.ETC_AMT, 2) } ></AFColumn>
                    <AFColumn field="COMM_AMT" headerClassName="t-header" header="커미션" style={{ width: "8rem", height: "1.8rem", flexBasis: "auto", }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.COMM_AMT, 2) } ></AFColumn>
                    <AFColumn field="TOT_AMT" headerClassName="t-header" header="제조총액" style={{ width: "8rem", height: "1.8rem", flexBasis: "auto", }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.TOT_AMT, 2) } ></AFColumn>
                    <AFColumn field="TOT_PRICE" headerClassName="t-header" header="제조단가" style={{ width: "8rem", height: "1.8rem", flexBasis: "auto", }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.TOT_PRICE, 4) } ></AFColumn>
                    <AFColumn field="DIFF" headerClassName="t-header" header="제조손익" style={{ width: "8rem", height: "1.8rem", flexBasis: "auto", }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.DIFF) } ></AFColumn>
                    <AFColumn field="RATE" headerClassName="t-header" header="%" style={{ width: "8rem", height: "1.8rem", flexBasis: "auto", }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.RATE, 2) } ></AFColumn>
                    <AFColumn field="SHIP_TOT" headerClassName="t-header" header="Ship Tot" style={{ width: "8rem", height: "1.8rem", flexBasis: "auto", }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.SHIP_TOT) } ></AFColumn>
                    <AFColumn field="SHIP_RATE" headerClassName="t-header" header="Ship Rate" style={{ width: "8rem", height: "1.8rem", flexBasis: "auto", }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.SHIP_RATE, 2) } ></AFColumn>
                    <AFColumn field="FACTORY" headerClassName="t-header" header="Factory" style={{ width: "8rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="BUYER" headerClassName="t-header" header="Buyer" style={{ width: "8rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                </AFDataTable>
            </div>

            <div
                className="af-div-first"
                style={{ width: "123rem", height: "15rem", paddingTop: "1rem" }}
            >
                <AFDataTable preventUnrelatedRerender
                    ref={dt_TBL_KSV_ORDER_MST2}
                    size="small"
                    value={datasTBL_KSV_ORDER_MST2}
                    tableStyle={{ tableLayout: "fixed" }}
                    loading={loadingTBL_KSV_ORDER_MST2}
                    resizableColumns
                    columnResizeMode="expand"
                    showGridlines
                    selectionMode="checkbox"
                    selection={selectedTBL_KSV_ORDER_MST2}
                    onSelectionChange={(e) => {
                        setFlagSelectModeTBL_KSV_ORDER_MST2(true);
                        setSelectedTBL_KSV_ORDER_MST2(e.value);
                        console.log(
                            "selected length:" +
                                selectedTBL_KSV_ORDER_MST2.length,
                        );
                        onRowClick1TBL_KSV_ORDER_MST2(e.value);
                    }}
                    onRowClick={onRowClickTBL_KSV_ORDER_MST2}
                    dataKey="ORDER_CD"
                    className="datatable-responsive"
                    virtualScrollerOptions={{ itemSize: 20 }}
                    emptyMessage=" "
                    responsiveLayout="scroll"
                    scrollable
                    scrollHeight="4rem"
                >
                    <AFColumn field="DATE" headerClassName="t-header" header="Date" style={{ width: "20rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="ORD_AMT" headerClassName="t-header" header="Ord Amt" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.ORD_AMT, 2) } ></AFColumn>
                    <AFColumn field="MATL_AMT" headerClassName="t-header" header="Matl Amt" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.MATL_AMT, 2) } ></AFColumn>
                    <AFColumn field="FC_AMT" headerClassName="t-header" header="Fc Amt" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.FC_AMT, 2) } ></AFColumn>
                    <AFColumn field="ETC_AMT" headerClassName="t-header" header="Etc Amt" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.ETC_AMT, 2) } ></AFColumn>
                    <AFColumn field="COMM_AMT" headerClassName="t-header" header="Comm Amt" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.COMM_AMT, 2) } ></AFColumn>
                    <AFColumn field="TOT_AMT" headerClassName="t-header" header="Tot Amt" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.TOT_AMT, 2) } ></AFColumn>
                    <AFColumn field="DIFF" headerClassName="t-header" header="Diff" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.DIFF) } ></AFColumn>
                    <AFColumn field="RATE" headerClassName="t-header" header="Rate" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.RATE, 2) } ></AFColumn>
                </AFDataTable>
            </div>

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

export default React.memo(S0213_ORDER_REPORT, comparisonFn);
