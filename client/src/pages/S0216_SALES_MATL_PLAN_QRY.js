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
import { ContextMenu } from "primereact/contextmenu";

import { ServiceLib } from "../service/service_lib/ServiceLib";
import { ServiceS0216_SALES_MATL_PLAN_QRY } from "../service/service_biz/ServiceS0216_SALES_MATL_PLAN_QRY";
import { ServiceS0217_SALES_MATL_PLAN_LIST } from "../service/service_biz/ServiceS0217_SALES_MATL_PLAN_LIST";

// import './page_common.scss';

const emptyKCD_CODE = {
    id: 0,
    CD_GROUP: "",
    CD_CODE: "",
    CD_NAME: "",
    CD_FLAG: "",
};

const emptyQRY_KSV_ORDER_PLAN = {
    FACTORY_CD: "",
    USER_NAME: "",

    BUYER_CD: "",

    COLLECTION_CD: "All",

    YEAR: "2026",
    MONTH: "01",
    TYPE: "",

    CUR: "USD",
};

const emptyTBL_KSV_ORDER_MST = {
    id: 0,
    YY_MM: "",
    TYPE: "",
    PLAN_QTY: "",
    PLAN_PRICE: "",
    PLAN_Amt: "",
    PLAN_CM_PRICE: "",
    PLAN_CM_Amt: "",
    CURR: "",
    ORDER_FIX_QTY: "",
    ORDER_FIX_AMT: "",
    ORDER_CM_AMT: "",
    LAST_ORDER_FIX_AMT: "",
    LAST_ORDER_CM_AMT: "",
    LAST_ORDER_CM_AMT: "",
};

const S0216_SALES_MATL_PLAN_QRY = () => {
    const serviceLibRef = useRef(null);
    if (!serviceLibRef.current) {
        serviceLibRef.current = new ServiceLib();
        serviceLibRef.current.loginConfirm();
    }
    const serviceLib = serviceLibRef.current;
    const serviceS0216_SALES_MATL_PLAN_QRY =
        new ServiceS0216_SALES_MATL_PLAN_QRY();
    const serviceS0217_SALES_MATL_PLAN_LIST =
        new ServiceS0217_SALES_MATL_PLAN_LIST();

    const toast = useRef(null);
    const cm = useRef(null);

    /* splitter 관련 */
    const [styleVal, setStyleVal] = useState({ width: "65vw" });

    /*QRY KSV_ORDER_PLAN */
    const [disableVal, setDisableVal] = useState(true);
    const [dataQRY_KSV_ORDER_PLAN, setDataQRY_KSV_ORDER_PLAN] = useState(
        emptyQRY_KSV_ORDER_PLAN,
    );

    const onInputChangeQRY_KSV_ORDER_PLAN_USER_NAME = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_ORDER_PLAN = { ...dataQRY_KSV_ORDER_PLAN };

        let tTypeVal = _dataQRY_KSV_ORDER_PLAN[`${name}`];
        if (typeof tTypeVal === "string")
            _dataQRY_KSV_ORDER_PLAN[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_ORDER_PLAN[`${name}`] = parseInt(val);

        setDataQRY_KSV_ORDER_PLAN(_dataQRY_KSV_ORDER_PLAN);
    };

    const [
        datasQRY_KSV_ORDER_PLAN_BUYER_CD,
        setDatasQRY_KSV_ORDER_PLAN_BUYER_CD,
    ] = useState([]);
    const [
        dataQRY_KSV_ORDER_PLAN_BUYER_CD,
        setDataQRY_KSV_ORDER_PLAN_BUYER_CD,
    ] = useState({});

    const onDropdownChangeQRY_KSV_ORDER_PLAN_BUYER_CD = (e, name) => {
        let val = (e.value && e.value.BUYER_CD) || "";

        let _dataQRY_KSV_ORDER_PLAN = { ...dataQRY_KSV_ORDER_PLAN };

        let tTypeVal = _dataQRY_KSV_ORDER_PLAN[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_ORDER_PLAN[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_ORDER_PLAN[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_ORDER_PLAN(_dataQRY_KSV_ORDER_PLAN);
        setDataQRY_KSV_ORDER_PLAN_BUYER_CD(e.value);
    };

    const [
        datasQRY_KSV_ORDER_PLAN_FACTORY_CD,
        setDatasQRY_KSV_ORDER_PLAN_FACTORY_CD,
    ] = useState([]);
    const [
        dataQRY_KSV_ORDER_PLAN_FACTORY_CD,
        setDataQRY_KSV_ORDER_PLAN_FACTORY_CD,
    ] = useState({});

    const onDropdownChangeQRY_KSV_ORDER_PLAN_FACTORY_CD = (e, name) => {
        let val = (e.value && e.value.FACTORY_CD) || "";

        let _dataQRY_KSV_ORDER_PLAN = { ...dataQRY_KSV_ORDER_PLAN };

        let tTypeVal = _dataQRY_KSV_ORDER_PLAN[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_ORDER_PLAN[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_ORDER_PLAN[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_ORDER_PLAN(_dataQRY_KSV_ORDER_PLAN);
        setDataQRY_KSV_ORDER_PLAN_FACTORY_CD(e.value);
    };

    const [
        datasQRY_KSV_ORDER_PLAN_COLLECTION_CD,
        setDatasQRY_KSV_ORDER_PLAN_COLLECTION_CD,
    ] = useState([]);
    const [
        dataQRY_KSV_ORDER_PLAN_COLLECTION_CD,
        setDataQRY_KSV_ORDER_PLAN_COLLECTION_CD,
    ] = useState({});

    const [datasQRY_KSV_ORDER_PLAN_YEAR, setDatasQRY_KSV_ORDER_PLAN_YEAR] =
        useState([]);
    const [dataQRY_KSV_ORDER_PLAN_YEAR, setDataQRY_KSV_ORDER_PLAN_YEAR] =
        useState({});

    const onDropdownChangeQRY_KSV_ORDER_PLAN_YEAR = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataQRY_KSV_ORDER_PLAN = { ...dataQRY_KSV_ORDER_PLAN };

        let tTypeVal = _dataQRY_KSV_ORDER_PLAN[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_ORDER_PLAN[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_ORDER_PLAN[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_ORDER_PLAN(_dataQRY_KSV_ORDER_PLAN);
        setDataQRY_KSV_ORDER_PLAN_YEAR(e.value);
    };

    const [datasQRY_KSV_ORDER_PLAN_MONTH, setDatasQRY_KSV_ORDER_PLAN_MONTH] =
        useState([]);
    const [dataQRY_KSV_ORDER_PLAN_MONTH, setDataQRY_KSV_ORDER_PLAN_MONTH] =
        useState({});

    const onDropdownChangeQRY_KSV_ORDER_PLAN_MONTH = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataQRY_KSV_ORDER_PLAN = { ...dataQRY_KSV_ORDER_PLAN };

        let tTypeVal = _dataQRY_KSV_ORDER_PLAN[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_ORDER_PLAN[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_ORDER_PLAN[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_ORDER_PLAN(_dataQRY_KSV_ORDER_PLAN);
        setDataQRY_KSV_ORDER_PLAN_MONTH(e.value);
    };

    const [datasQRY_KSV_ORDER_PLAN_TYPE, setDatasQRY_KSV_ORDER_PLAN_TYPE] =
        useState([]);
    const [dataQRY_KSV_ORDER_PLAN_TYPE, setDataQRY_KSV_ORDER_PLAN_TYPE] =
        useState({});

    const onDropdownChangeQRY_KSV_ORDER_PLAN_TYPE = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataQRY_KSV_ORDER_PLAN = { ...dataQRY_KSV_ORDER_PLAN };

        let tTypeVal = _dataQRY_KSV_ORDER_PLAN[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_ORDER_PLAN[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_ORDER_PLAN[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_ORDER_PLAN(_dataQRY_KSV_ORDER_PLAN);
        setDataQRY_KSV_ORDER_PLAN_TYPE(e.value);
    };

    const [datasQRY_KSV_ORDER_PLAN_CUR, setDatasQRY_KSV_ORDER_PLAN_CUR] =
        useState([]);
    const [dataQRY_KSV_ORDER_PLAN_CUR, setDataQRY_KSV_ORDER_PLAN_CUR] =
        useState({});

    const onDropdownChangeQRY_KSV_ORDER_PLAN_CUR = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataQRY_KSV_ORDER_PLAN = { ...dataQRY_KSV_ORDER_PLAN };

        let tTypeVal = _dataQRY_KSV_ORDER_PLAN[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_ORDER_PLAN[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_ORDER_PLAN[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_ORDER_PLAN(_dataQRY_KSV_ORDER_PLAN);
        setDataQRY_KSV_ORDER_PLAN_CUR(e.value);
    };

    /*TABLE KSV_ORDER_MST */
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

    //

    const process_ALL_SELECT = () => {
        setSelectedTBL_KSV_ORDER_MST(datasTBL_KSV_ORDER_MST);
    };
    const process_ALL_CLEAR = () => {
        setSelectedTBL_KSV_ORDER_MST([]);
    };

    const process_SELECT_COPY = () => {
        var tArray = [];
        datasTBL_KSV_ORDER_MST.forEach((col, i) => {
            var tObj = { ...col };
            var tCheck = 0;
            selectedTBL_KSV_ORDER_MST.forEach((col1, i1) => {
                if (
                    col.YYMM === col1.YYMM &&
                    col.LINE_TYPE_N === col1.LINE_TYPE_N
                )
                    tCheck = 1;
            });
            if (tCheck === 1) {
                tObj.PLAN_QTY = tObj.ORDER_QTY;
                tObj.PLAN_AMT = tObj.ORDER_AMT;
                tObj.CM_AMT = tObj.CURR_CM_AMT;
                if (parseFloat(tObj.PLAN_QTY) <= 0) tObj.PLAN_PRICE = "0";
                else
                    tObj.PLAN_PRICE = String(
                        parseFloat(tObj.PLAN_AMT) / parseFloat(tObj.PLAN_QTY),
                    );
                if (parseFloat(tObj.PLAN_QTY) <= 0) tObj.CM_PRICE = "0";
                else
                    tObj.CM_PRICE = String(
                        parseFloat(tObj.CM_AMT) / parseFloat(tObj.PLAN_QTY),
                    );
            }
            tArray.push(tObj);
        });
        setDatasTBL_KSV_ORDER_MST(tArray);
    };

    const process_SELECT_DELETE = () => {
        var tArray = [];
        datasTBL_KSV_ORDER_MST.forEach((col, i) => {
            var tObj = { ...col };
            var tCheck = 0;
            selectedTBL_KSV_ORDER_MST.forEach((col1, i1) => {
                if (
                    col.YYMM === col1.YYMM &&
                    col.LINE_TYPE_N === col1.LINE_TYPE_N
                )
                    tCheck = 1;
            });
            if (tCheck === 1) {
                tObj.PLAN_QTY = "0";
                tObj.PLAN_AMT = "0";
                tObj.CM_AMT = "0";
                tObj.PLAN_PRICE = "0";
                tObj.CM_PRICE = "0";
            }
            tArray.push(tObj);
        });
        setDatasTBL_KSV_ORDER_MST(tArray);
    };

    const process_EXCEL_PRINT = () => {
        if (dataQRY_KSV_ORDER_PLAN.FACTORY_CD === "") {
            alert("Factory는 필수 입력입니다<br><br>Factory is required");
            return;
        }

        /*
        if (dataQRY_KSV_ORDER_PLAN.BUYER_CD === "") {
            alert("Buyer는 필수 입력입니다<br><br>Buyer is required");
            return;
        }
        */

        var tInObj = {};
        tInObj.S_DATE = dataQRY_KSV_ORDER_PLAN.YEAR + dataQRY_KSV_ORDER_PLAN.MONTH;
        tInObj.E_DATE = dataQRY_KSV_ORDER_PLAN.YEAR + "12";
        tInObj.USER_CD = "";
        tInObj.BUYER_CD = dataQRY_KSV_ORDER_PLAN.BUYER_CD;
        tInObj.TEAM_CD = "";
        tInObj.FACTORY_CD = dataQRY_KSV_ORDER_PLAN.FACTORY_CD;
        tInObj.CUR = dataQRY_KSV_ORDER_PLAN.CUR;

        if (tInObj.S_DATE === "" || tInObj.E_DATE === "") {
            alert("날짜를 입력해야 합니다<br><br>You must enter a date");
            return;
        }
        if (tInObj.FACTORY === "") {
            alert("Factory를 입력해야 합니다<br><br>You must enter Factory");
            return;
        }

        clearSelectedTBL_KSV_ORDER_MST();
        setLoadingTBL_KSV_ORDER_MST(true);
        serviceS0216_SALES_MATL_PLAN_QRY
            .mgrQuery_EXCEL_PRINT(tInObj)
            .then((data) => {
                setLoadingTBL_KSV_ORDER_MST(false);
                if (typeof data.graphQLErrors === "undefined") {
                    if (data.length > 0) {
                        // alert("Return =>" + JSON.stringify(data[0].CODE));
                        if (data[0].CODE.includes("SUCC")) {
                            serviceLib.downloadFile(
                                data[0].CODE.split("?")[2].toString(),
                                data[0].CODE.split("?")[1].toString(),
                            );
                        }
                    }
                } else {
                    // var tStr = data.graphQLErrors[0].message;
                    alert(
                        "Graphql Error=>" + JSON.stringify(data.graphQLErrors),
                    );
                    console.log(
                        "ServiceNawooAll.mgrQueryTBL_KSV_ORDER_MST()error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });
    };

    const process_EXCEL_PRINT_TOT = () => {
        if (dataQRY_KSV_ORDER_PLAN.FACTORY_CD === "") {
            alert("Factory는 필수 입력입니다<br><br>Factory is required");
            return;
        }

        if (dataQRY_KSV_ORDER_PLAN.BUYER_CD === "") {
            alert("Buyer는 필수 입력입니다<br><br>Buyer is required");
            return;
        }

        var tInObj = {};
        tInObj.S_DATE = dataQRY_KSV_ORDER_PLAN.YEAR + "01";
        tInObj.E_DATE = dataQRY_KSV_ORDER_PLAN.YEAR + "12";
        tInObj.USER_CD = "";
        tInObj.BUYER_CD = dataQRY_KSV_ORDER_PLAN.BUYER_CD;
        tInObj.TEAM_CD = "";
        tInObj.FACTORY_CD = dataQRY_KSV_ORDER_PLAN.FACTORY_CD;
        tInObj.TYPE = '';

        if (tInObj.S_DATE === "" || tInObj.E_DATE === "") {
            alert("날짜를 입력해야 합니다<br><br>You must enter a date");
            return;
        }
        if (tInObj.FACTORY === "") {
            alert("Factory를 입력해야 합니다<br><br>You must enter Factory");
            return;
        }

        clearSelectedTBL_KSV_ORDER_MST();

        setLoadingTBL_KSV_ORDER_MST(true);

        setDatasTBL_KSV_ORDER_MST([]);

        serviceS0216_SALES_MATL_PLAN_QRY
            .mgrQuery_EXCEL_PRINT_TOT(tInObj)
            .then((data) => {
                setLoadingTBL_KSV_ORDER_MST(false);
                if (typeof data.graphQLErrors === "undefined") {
                    alert("Return =>" + JSON.stringify(data));
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
                    alert(
                        "Graphql Error=>" + JSON.stringify(data.graphQLErrors),
                    );
                    console.log(
                        "ServiceNawooAll.mgrQueryTBL_KSV_ORDER_MST()error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });
    };


    const process_EXCEL_PRINT_TOT_1 = () => {
        if (dataQRY_KSV_ORDER_PLAN.FACTORY_CD === "") {
            alert("Factory는 필수 입력입니다<br><br>Factory is required");
            return;
        }

        if (dataQRY_KSV_ORDER_PLAN.BUYER_CD === "") {
            alert("Buyer는 필수 입력입니다<br><br>Buyer is required");
            return;
        }

        var tInObj = {};
        tInObj.S_DATE = dataQRY_KSV_ORDER_PLAN.YEAR + "01";
        tInObj.E_DATE = dataQRY_KSV_ORDER_PLAN.YEAR + "12";
        tInObj.USER_CD = "";
        tInObj.BUYER_CD = dataQRY_KSV_ORDER_PLAN.BUYER_CD;
        tInObj.TEAM_CD = "";
        tInObj.FACTORY_CD = dataQRY_KSV_ORDER_PLAN.FACTORY_CD;
        tInObj.TYPE = '1';

        if (tInObj.S_DATE === "" || tInObj.E_DATE === "") {
            alert("날짜를 입력해야 합니다<br><br>You must enter a date");
            return;
        }
        if (tInObj.FACTORY === "") {
            alert("Factory를 입력해야 합니다<br><br>You must enter Factory");
            return;
        }

        clearSelectedTBL_KSV_ORDER_MST();

        setLoadingTBL_KSV_ORDER_MST(true);

        setDatasTBL_KSV_ORDER_MST([]);

        serviceS0216_SALES_MATL_PLAN_QRY
            .mgrQuery_EXCEL_PRINT_TOT(tInObj)
            .then((data) => {
                setLoadingTBL_KSV_ORDER_MST(false);
                if (typeof data.graphQLErrors === "undefined") {
                    alert("Return =>" + JSON.stringify(data));
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
                    alert(
                        "Graphql Error=>" + JSON.stringify(data.graphQLErrors),
                    );
                    console.log(
                        "ServiceNawooAll.mgrQueryTBL_KSV_ORDER_MST()error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });
    };

    const process_EXCEL_PRINT_TOT_3 = () => {
        if (dataQRY_KSV_ORDER_PLAN.FACTORY_CD === "") {
            alert("Factory는 필수 입력입니다<br><br>Factory is required");
            return;
        }

        if (dataQRY_KSV_ORDER_PLAN.BUYER_CD === "") {
            alert("Buyer는 필수 입력입니다<br><br>Buyer is required");
            return;
        }

        var tInObj = {};
        tInObj.S_DATE = dataQRY_KSV_ORDER_PLAN.YEAR + "01";
        tInObj.E_DATE = dataQRY_KSV_ORDER_PLAN.YEAR + "12";
        tInObj.USER_CD = "";
        tInObj.BUYER_CD = dataQRY_KSV_ORDER_PLAN.BUYER_CD;
        tInObj.TEAM_CD = "";
        tInObj.FACTORY_CD = dataQRY_KSV_ORDER_PLAN.FACTORY_CD;
        tInObj.TYPE = '3';

        if (tInObj.S_DATE === "" || tInObj.E_DATE === "") {
            alert("날짜를 입력해야 합니다<br><br>You must enter a date");
            return;
        }
        if (tInObj.FACTORY === "") {
            alert("Factory를 입력해야 합니다<br><br>You must enter Factory");
            return;
        }

        clearSelectedTBL_KSV_ORDER_MST();

        setLoadingTBL_KSV_ORDER_MST(true);

        setDatasTBL_KSV_ORDER_MST([]);

        serviceS0216_SALES_MATL_PLAN_QRY
            .mgrQuery_EXCEL_PRINT_TOT(tInObj)
            .then((data) => {
                setLoadingTBL_KSV_ORDER_MST(false);
                if (typeof data.graphQLErrors === "undefined") {
                    alert("Return =>" + JSON.stringify(data));
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
                    alert(
                        "Graphql Error=>" + JSON.stringify(data.graphQLErrors),
                    );
                    console.log(
                        "ServiceNawooAll.mgrQueryTBL_KSV_ORDER_MST()error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });
    };


    const process_EXCEL_PRINT_TOT_D = () => {
        if (dataQRY_KSV_ORDER_PLAN.FACTORY_CD === "") {
            alert("Factory는 필수 입력입니다<br><br>Factory is required");
            return;
        }

        if (dataQRY_KSV_ORDER_PLAN.BUYER_CD === "") {
            alert("Buyer는 필수 입력입니다<br><br>Buyer is required");
            return;
        }

        var tInObj = {};
        tInObj.S_DATE = dataQRY_KSV_ORDER_PLAN.YEAR + "01";
        tInObj.E_DATE = dataQRY_KSV_ORDER_PLAN.YEAR + "12";
        tInObj.USER_CD = "";
        tInObj.BUYER_CD = dataQRY_KSV_ORDER_PLAN.BUYER_CD;
        tInObj.TEAM_CD = "";
        tInObj.FACTORY_CD = dataQRY_KSV_ORDER_PLAN.FACTORY_CD;
        tInObj.TYPE = 'D';

        if (tInObj.S_DATE === "" || tInObj.E_DATE === "") {
            alert("날짜를 입력해야 합니다<br><br>You must enter a date");
            return;
        }
        if (tInObj.FACTORY === "") {
            alert("Factory를 입력해야 합니다<br><br>You must enter Factory");
            return;
        }

        clearSelectedTBL_KSV_ORDER_MST();

        setLoadingTBL_KSV_ORDER_MST(true);

        setDatasTBL_KSV_ORDER_MST([]);

        serviceS0216_SALES_MATL_PLAN_QRY
            .mgrQuery_EXCEL_PRINT_TOT(tInObj)
            .then((data) => {
                setLoadingTBL_KSV_ORDER_MST(false);
                if (typeof data.graphQLErrors === "undefined") {
                    alert("Return =>" + JSON.stringify(data));
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
                    alert(
                        "Graphql Error=>" + JSON.stringify(data.graphQLErrors),
                    );
                    console.log(
                        "ServiceNawooAll.mgrQueryTBL_KSV_ORDER_MST()error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });
    };

    const process_EXCEL_PRINT_TOT_W = () => {
        if (dataQRY_KSV_ORDER_PLAN.FACTORY_CD === "") {
            alert("Factory는 필수 입력입니다<br><br>Factory is required");
            return;
        }

        if (dataQRY_KSV_ORDER_PLAN.BUYER_CD === "") {
            alert("Buyer는 필수 입력입니다<br><br>Buyer is required");
            return;
        }

        var tInObj = {};
        tInObj.S_DATE = dataQRY_KSV_ORDER_PLAN.YEAR + "01";
        tInObj.E_DATE = dataQRY_KSV_ORDER_PLAN.YEAR + "12";
        tInObj.USER_CD = "";
        tInObj.BUYER_CD = dataQRY_KSV_ORDER_PLAN.BUYER_CD;
        tInObj.TEAM_CD = "";
        tInObj.FACTORY_CD = dataQRY_KSV_ORDER_PLAN.FACTORY_CD;
        tInObj.TYPE = 'W';

        if (tInObj.S_DATE === "" || tInObj.E_DATE === "") {
            alert("날짜를 입력해야 합니다<br><br>You must enter a date");
            return;
        }
        if (tInObj.FACTORY === "") {
            alert("Factory를 입력해야 합니다<br><br>You must enter Factory");
            return;
        }

        clearSelectedTBL_KSV_ORDER_MST();

        setLoadingTBL_KSV_ORDER_MST(true);

        setDatasTBL_KSV_ORDER_MST([]);

        serviceS0216_SALES_MATL_PLAN_QRY
            .mgrQuery_EXCEL_PRINT_TOT(tInObj)
            .then((data) => {
                setLoadingTBL_KSV_ORDER_MST(false);
                if (typeof data.graphQLErrors === "undefined") {
                    alert("Return =>" + JSON.stringify(data));
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
                    alert(
                        "Graphql Error=>" + JSON.stringify(data.graphQLErrors),
                    );
                    console.log(
                        "ServiceNawooAll.mgrQueryTBL_KSV_ORDER_MST()error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });
    };

    const process_EXCEL_PRINT_TOT_S = () => {
        if (dataQRY_KSV_ORDER_PLAN.FACTORY_CD === "") {
            alert("Factory는 필수 입력입니다<br><br>Factory is required");
            return;
        }

        if (dataQRY_KSV_ORDER_PLAN.BUYER_CD === "") {
            alert("Buyer는 필수 입력입니다<br><br>Buyer is required");
            return;
        }

        var tInObj = {};
        tInObj.S_DATE = dataQRY_KSV_ORDER_PLAN.YEAR + "01";
        tInObj.E_DATE = dataQRY_KSV_ORDER_PLAN.YEAR + "12";
        tInObj.USER_CD = "";
        tInObj.BUYER_CD = dataQRY_KSV_ORDER_PLAN.BUYER_CD;
        tInObj.TEAM_CD = "";
        tInObj.FACTORY_CD = dataQRY_KSV_ORDER_PLAN.FACTORY_CD;
        tInObj.TYPE = 'S';

        if (tInObj.S_DATE === "" || tInObj.E_DATE === "") {
            alert("날짜를 입력해야 합니다<br><br>You must enter a date");
            return;
        }
        if (tInObj.FACTORY === "") {
            alert("Factory를 입력해야 합니다<br><br>You must enter Factory");
            return;
        }

        clearSelectedTBL_KSV_ORDER_MST();

        setLoadingTBL_KSV_ORDER_MST(true);

        setDatasTBL_KSV_ORDER_MST([]);

        serviceS0216_SALES_MATL_PLAN_QRY
            .mgrQuery_EXCEL_PRINT_TOT(tInObj)
            .then((data) => {
                setLoadingTBL_KSV_ORDER_MST(false);
                if (typeof data.graphQLErrors === "undefined") {
                    alert("Return =>" + JSON.stringify(data));
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
                    alert(
                        "Graphql Error=>" + JSON.stringify(data.graphQLErrors),
                    );
                    console.log(
                        "ServiceNawooAll.mgrQueryTBL_KSV_ORDER_MST()error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });
    };

    const process_EXCEL_PRINT_TOT_G = () => {
        if (dataQRY_KSV_ORDER_PLAN.FACTORY_CD === "") {
            alert("Factory는 필수 입력입니다<br><br>Factory is required");
            return;
        }

        if (dataQRY_KSV_ORDER_PLAN.BUYER_CD === "") {
            alert("Buyer는 필수 입력입니다<br><br>Buyer is required");
            return;
        }

        var tInObj = {};
        tInObj.S_DATE = dataQRY_KSV_ORDER_PLAN.YEAR + "01";
        tInObj.E_DATE = dataQRY_KSV_ORDER_PLAN.YEAR + "12";
        tInObj.USER_CD = "";
        tInObj.BUYER_CD = dataQRY_KSV_ORDER_PLAN.BUYER_CD;
        tInObj.TEAM_CD = "";
        tInObj.FACTORY_CD = dataQRY_KSV_ORDER_PLAN.FACTORY_CD;
        tInObj.TYPE = 'G';

        if (tInObj.S_DATE === "" || tInObj.E_DATE === "") {
            alert("날짜를 입력해야 합니다<br><br>You must enter a date");
            return;
        }
        if (tInObj.FACTORY === "") {
            alert("Factory를 입력해야 합니다<br><br>You must enter Factory");
            return;
        }

        clearSelectedTBL_KSV_ORDER_MST();

        setLoadingTBL_KSV_ORDER_MST(true);

        setDatasTBL_KSV_ORDER_MST([]);

        serviceS0216_SALES_MATL_PLAN_QRY
            .mgrQuery_EXCEL_PRINT_TOT(tInObj)
            .then((data) => {
                setLoadingTBL_KSV_ORDER_MST(false);
                if (typeof data.graphQLErrors === "undefined") {
                    alert("Return =>" + JSON.stringify(data));
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
                    alert(
                        "Graphql Error=>" + JSON.stringify(data.graphQLErrors),
                    );
                    console.log(
                        "ServiceNawooAll.mgrQueryTBL_KSV_ORDER_MST()error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });
    };


    const process_INSERT = () => {
        if (dataQRY_KSV_ORDER_PLAN.BUYER_CD === "") {
            alert("Buyer는 필수 입력입니다<br><br>Buyer is required");
            return;
        }

        var tObj = { ...dataQRY_KSV_ORDER_PLAN };
        if (
            tObj.FACTORY_CD === "" ||
            tObj.BUYER_CD === "" ||
            tObj.YEAR === "" ||
            tObj.MONTH === ""
        ) {
            alert("Factory, Buyer, YY은 입력되어야 합니다<br><br>Factory, Buyer, YY must be entered");
            return;
        }

        var tObj2_0 = [...datasTBL_KSV_ORDER_MST];
        var tObj2 = [];
        tObj2_0.forEach((col, i) => {
            var tObj1 = { ...col };
            if (typeof tObj1.id !== "undefined") delete tObj1.id;
            if (typeof tObj1.__typename !== "undefined")
                delete tObj1.__typename;
            tObj2.push(tObj1);
        });

        clearSelectedTBL_KSV_ORDER_MST();

        setDatasTBL_KSV_ORDER_MST([]);
        setSelectedTBL_KSV_ORDER_MST([]);

        setLoadingTBL_KSV_ORDER_MST(true);

        serviceS0216_SALES_MATL_PLAN_QRY
            .mgrInsert_INSERT(tObj, tObj2)
            .then((data) => {
                setLoadingTBL_KSV_ORDER_MST(false);
                if (typeof data.graphQLErrors === "undefined") {
                    if (data.length > 0) {
                        alert(data[0].CODE);
                        search_LIST_1();
                    }
                } else {
                    alert(JSON.stringify(data.graphQLErrors));
                    // var tStr = data.graphQLErrors[0].message;
                    // console.log("ServiceNawooAll.mgrQueryTBL_KSV_ORDER_MST()error => " + JSON.stringify(data.graphQLErrors));
                }
            });
    };

    const process_DELETE = () => {
        if (dataQRY_KSV_ORDER_PLAN.FACTORY_CD === "") {
            alert("Factory는 필수 입력입니다<br><br>Factory is required");
            return;
        }

        if (dataQRY_KSV_ORDER_PLAN.BUYER_CD === "") {
            alert("Buyer는 필수 입력입니다<br><br>Buyer is required");
            return;
        }

        var tObj = { ...dataQRY_KSV_ORDER_PLAN };
        if (
            tObj.FACTORY_CD === "" ||
            tObj.BUYER_CD === "" ||
            tObj.YEAR === "" ||
            tObj.MONTH === ""
        ) {
            alert("Factory, Buyer, YY은 입력되어야 합니다<br><br>Factory, Buyer, YY must be entered");
            return;
        }

        if (selectedTBL_KSV_ORDER_MST.length <= 0) {
            alert("데이타를 하나이상 선택하세요<br><br>Please select one or more data");
            return;
        }

        var tObj2_0 = [...selectedTBL_KSV_ORDER_MST];
        var tObj2 = [];
        tObj2_0.forEach((col, i) => {
            var tObj1 = { ...col };
            if (typeof tObj1.id !== "undefined") delete tObj1.id;
            if (typeof tObj1.__typename !== "undefined")
                delete tObj1.__typename;
            tObj2.push(tObj1);
        });

        clearSelectedTBL_KSV_ORDER_MST();

        setDatasTBL_KSV_ORDER_MST([]);
        setSelectedTBL_KSV_ORDER_MST([]);

        setLoadingTBL_KSV_ORDER_MST(true);

        serviceS0216_SALES_MATL_PLAN_QRY
            .mgrInsert_DELETE(tObj, tObj2)
            .then((data) => {
                setLoadingTBL_KSV_ORDER_MST(false);
                if (typeof data.graphQLErrors === "undefined") {
                    if (data.length > 0) {
                        alert(data[0].CODE);
                        search_LIST_1();
                    }
                } else {
                    alert(JSON.stringify(data.graphQLErrors));
                    // var tStr = data.graphQLErrors[0].message;
                    // console.log("ServiceNawooAll.mgrQueryTBL_KSV_ORDER_MST()error => " + JSON.stringify(data.graphQLErrors));
                }
            });
    };

    const process_COPY_YEAR = async () => {
        if (dataQRY_KSV_ORDER_PLAN.BUYER_CD === "") {
            alert("Buyer는 필수 입력입니다<br><br>Buyer is required");
            return;
        }
        if (dataQRY_KSV_ORDER_PLAN.FACTORY_CD === "") {
            alert("Factory는 필수 입력입니다<br><br>Factory is required");
            return;
        }

        var tObj = { ...dataQRY_KSV_ORDER_PLAN };
        if (
            tObj.FACTORY_CD === "" ||
            tObj.BUYER_CD === "" ||
            tObj.YEAR === "" ||
            tObj.MONTH === ""
        ) {
            alert("Factory, Buyer, YY은 입력되어야 합니다<br><br>Factory, Buyer, YY must be entered");
            return;
        }

        var tObj2_0 = [...selectedTBL_KSV_ORDER_MST];
        var tObj2 = [];
        tObj2_0.forEach((col, i) => {
            var tObj1 = { ...col };
            if (typeof tObj1.id !== "undefined") delete tObj1.id;
            if (typeof tObj1.__typename !== "undefined")
                delete tObj1.__typename;
            tObj2.push(tObj1);
        });

        var tConfirm = await confirm(
            `Selected ${tObj.YEAR} copy to next year?`,
        );
        if (!tConfirm) return;

        clearSelectedTBL_KSV_ORDER_MST();

        setDatasTBL_KSV_ORDER_MST([]);
        setSelectedTBL_KSV_ORDER_MST([]);

        setLoadingTBL_KSV_ORDER_MST(true);

        serviceS0216_SALES_MATL_PLAN_QRY
            .mgrInsert_COPY_YEAR(tObj, tObj2)
            .then((data) => {
                setLoadingTBL_KSV_ORDER_MST(false);
                if (typeof data.graphQLErrors === "undefined") {
                    if (data.length > 0) {
                        alert(data[0].CODE);
                        search_LIST_1();
                    }
                } else {
                    alert(JSON.stringify(data.graphQLErrors));
                    // var tStr = data.graphQLErrors[0].message;
                    // console.log("ServiceNawooAll.mgrQueryTBL_KSV_ORDER_MST()error => " + JSON.stringify(data.graphQLErrors));
                }
            });
    };

    const process_RECALC = () => {
        if (dataQRY_KSV_ORDER_PLAN.BUYER_CD === "") {
            alert("Buyer는 필수 입력입니다<br><br>Buyer is required");
            return;
        }
        if (dataQRY_KSV_ORDER_PLAN.BUYER_CD === "") {
            alert("Factory는 필수 입력입니다<br><br>Factory is required");
            return;
        }

        var tObj = { ...dataQRY_KSV_ORDER_PLAN };
        if (
            tObj.FACTORY_CD === "" ||
            tObj.BUYER_CD === "" ||
            tObj.YEAR === "" ||
            tObj.MONTH === ""
        ) {
            alert("Factory, Buyer, YY은 입력되어야 합니다<br><br>Factory, Buyer, YY must be entered");
            return;
        }

        clearSelectedTBL_KSV_ORDER_MST();

        setDatasTBL_KSV_ORDER_MST([]);
        setSelectedTBL_KSV_ORDER_MST([]);

        setLoadingTBL_KSV_ORDER_MST(true);

        serviceS0216_SALES_MATL_PLAN_QRY.mgrInsert_RECALC(tObj).then((data) => {
            setLoadingTBL_KSV_ORDER_MST(false);
            if (typeof data.graphQLErrors === "undefined") {
                if (data.length > 0) {
                    alert(data[0].CODE);
                    search_LIST_1();
                }
            } else {
                alert(JSON.stringify(data.graphQLErrors));
                // var tStr = data.graphQLErrors[0].message;
                // console.log("ServiceNawooAll.mgrQueryTBL_KSV_ORDER_MST()error => " + JSON.stringify(data.graphQLErrors));
            }
        });
    };

    //

    const search_LIST_1 = () => {
        if (dataQRY_KSV_ORDER_PLAN.BUYER_CD === "") {
            alert("Buyer는 필수 입력입니다<br><br>Buyer is required");
            return;
        }
        if (dataQRY_KSV_ORDER_PLAN.FACTORY_CD === "") {
            alert("Factory는 필수 입력입니다<br><br>Factory is required");
            return;
        }

        var tQryObj = { ...dataQRY_KSV_ORDER_PLAN };
        if (
            tQryObj.FACTORY_CD === "" ||
            tQryObj.BUYER_CD === "" ||
            tQryObj.YEAR === "" ||
            tQryObj.MONTH === ""
        ) {
            alert("Factory, Buyer, YY은 입력되어야 합니다<br><br>Factory, Buyer, YY must be entered");
            return;
        }

        clearSelectedTBL_KSV_ORDER_MST();

        setDatasTBL_KSV_ORDER_MST([]);
        setSelectedTBL_KSV_ORDER_MST([]);

        setLoadingTBL_KSV_ORDER_MST(true);

        serviceS0216_SALES_MATL_PLAN_QRY
            .mgrQueryTBL_KSV_ORDER_MST(dataQRY_KSV_ORDER_PLAN)
            .then((data) => {
                setLoadingTBL_KSV_ORDER_MST(false);
                if (typeof data.graphQLErrors === "undefined") {
                    console.log(
                        "ServiceNawooAll.mgrQueryTBL_KSV_ORDER_MST() call => " +
                            data.length,
                    );
                    var tArray = [];
                    data.forEach((col, i) => {
                        var tObj = { ...col };
                        tObj.id = i + 1;
                        tObj.PLAN_QTY = String(
                            serviceLib.getFloat(parseFloat(tObj.PLAN_QTY), 0),
                        );
                        tObj.PLAN_PRICE = String(
                            serviceLib.getFloat(parseFloat(tObj.PLAN_PRICE), 4),
                        );
                        tObj.PLAN_AMT = String(
                            serviceLib.getFloat(parseFloat(tObj.PLAN_AMT), 2),
                        );
                        tObj.CM_PRICE = String(
                            serviceLib.getFloat(parseFloat(tObj.CM_PRICE), 4),
                        );
                        tObj.CM_AMT = String(
                            serviceLib.getFloat(parseFloat(tObj.CM_AMT), 2),
                        );
                        if (tQryObj.TYPE !== "") {
                            if (tObj.LINE_TYPE === tQryObj.TYPE)
                                tArray.push(tObj);
                        } else {
                            tArray.push(tObj);
                        }
                    });
                    setDatasTBL_KSV_ORDER_MST(tArray);
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

    const menuModel = [
        {
            label: "All Select",
            icon: "pi pi-fw pi-search",
            command: () => process_ALL_SELECT({}),
        },
        {
            label: "All Clear",
            icon: "pi pi-fw pi-search",
            command: () => process_ALL_CLEAR({}),
        },
    ];

    const exportExcelTBL_KSV_ORDER_MST = () => {
        var tArray = [];
        datasTBL_KSV_ORDER_MST.forEach((col, i) => {
            var tObj = {};
            tObj.YYMNM = col.YYMM;
            tObj.Type = col.LINE_TYPE_N;
            tObj.Qty_Plan = col.PLAN_QTY;
            tObj.Price_Plan = col.PLAN_PRICE;
            tObj.Amt_Plan = col.PLAN_AMT;
            tObj.CmPrice_Plan = col.CM_PRICE;
            tObj.CmAmt_Plan = col.CM_AMT;
            tObj.Curr = col.CURR_CD;
            tObj.Charger = col.USER_ID;
            tObj.Order_Fix_Qty = col.ORDER_QTY;
            tObj.Order_Fix_Amt = col.ORDER_AMT;
            tObj.Cm_Amt = col.CURR_CM_AMT;
            tObj.Last_Order_Fix_Qty = col.OLD_ORDER_QTY;
            tObj.Last_Order_Fix_Amt = col.OLD_ORDER_AMT;
            tObj.Last_Cm_Amt = col.OLD_CM_AMT;
            tArray.push(tObj);
        });

        import("xlsx").then((xlsx) => {
            const worksheet = xlsx.utils.json_to_sheet(tArray);
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
                "Sale Plan Qry(LIST)",
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


    useEffect(() => {

        var tPart = serviceLib.getUserInfo().PART;
        var tUserId = serviceLib.getUserInfo().USER_ID;
        if (tUserId === 'won21kr' || tUserId === 'lih7912' || tPart === 'S06' || tUserId === 'kevin1') setDisableVal(false);

        serviceS0216_SALES_MATL_PLAN_QRY
            .mgrQueryTBL_KSV_ORDER_MST_CODE()
            .then((data) => {
                if (typeof data.graphQLErrors === "undefined") {
                    console.log(
                        "mgrQueryTBL_KSV_ORDER_MST_CODE:" +
                            data.LINE_TYPE.length,
                    );
                    setDatasQRY_KSV_ORDER_PLAN_BUYER_CD(data.BUYER_CD);
                    setDataQRY_KSV_ORDER_PLAN_BUYER_CD(data.BUYER_CD[0]);

                    setDatasQRY_KSV_ORDER_PLAN_FACTORY_CD(data.FACTORY_CD);
                    setDataQRY_KSV_ORDER_PLAN_FACTORY_CD(data.FACTORY_CD[0]);

                    setDatasQRY_KSV_ORDER_PLAN_COLLECTION_CD(data.COLLECTION);
                    setDataQRY_KSV_ORDER_PLAN_COLLECTION_CD(data.COLLECTION[0]);

                    setDatasQRY_KSV_ORDER_PLAN_YEAR(data.YY);
                    var tObj = {};
                    data.YY.forEach((col, i) => {
                        if (col.CD_CODE === "2026") tObj = { ...col };
                    });
                    if (typeof tObj.CD_CODE !== "undefined")
                        setDataQRY_KSV_ORDER_PLAN_YEAR(tObj);
                    else setDataQRY_KSV_ORDER_PLAN_YEAR(data.YY[0]);

                    setDatasQRY_KSV_ORDER_PLAN_MONTH(data.MM);
                    setDataQRY_KSV_ORDER_PLAN_MONTH(data.MM[1]);

                    setDatasQRY_KSV_ORDER_PLAN_TYPE(data.LINE_TYPE);
                    setDataQRY_KSV_ORDER_PLAN_TYPE(data.LINE_TYPE[0]);

                    setDatasQRY_KSV_ORDER_PLAN_CUR(data.CURR_CD);
                    setDataQRY_KSV_ORDER_PLAN_CUR(data.CURR_CD[10]);

                    var tUserInfo = serviceLib.getUserInfo();
                    var tObj = { ...dataQRY_KSV_ORDER_PLAN };
                    tObj.USER_NAME = tUserInfo.USER_ID;
                    setDataQRY_KSV_ORDER_PLAN(tObj);
                } else {
                    // var tStr = data.graphQLErrors[0].message;
                    console.log(
                        "ServiceNawooAll.mgrQueryTBL_KSV_ORDER_MST()error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });
    }, []);

    //
    const onCellEditComplete = (e) => {
        let { rowData, newValue, value, field, originalEvent: event } = e;

        rowData[field] = newValue;
        var tRowData = { ...rowData };

        if (field === "PLAN_QTY") {
            rowData["PLAN_AMT"] = String(
                parseFloat(tRowData.PLAN_QTY) * parseFloat(tRowData.PLAN_PRICE),
            );
            rowData["CM_AMT"] = String(
                parseFloat(tRowData.PLAN_QTY) * parseFloat(tRowData.CM_PRICE),
            );
        }
        if (field === "PLAN_PRICE") {
            rowData["PLAN_AMT"] = String(
                parseFloat(tRowData.PLAN_QTY) * parseFloat(tRowData.PLAN_PRICE),
            );
        }
        if (field === "PLAN_AMT") {
            if (parseFloat(tRowData.PLAN_QTY) > 0)
                rowData["PLAN_PRICE"] = String(
                    parseFloat(tRowData.PLAN_AMT) /
                        parseFloat(tRowData.PLAN_QTY),
                );
            else {
                rowData["PLAN_QTY"] = "1";
                rowData["PLAN_PRICE"] = rowData["PLAN_AMT"];
            }
        }
        if (field === "CM_PRICE") {
            rowData["CM_AMT"] = String(
                parseFloat(tRowData.PLAN_QTY) * parseFloat(tRowData.CM_PRICE),
            );
        }
        if (field === "CM_AMT") {
            if (parseFloat(tRowData.PLAN_QTY) > 0)
                rowData["CM_PRICE"] = String(
                    parseFloat(tRowData.CM_AMT) / parseFloat(tRowData.PLAN_QTY),
                );
        }
    };
    const cellEditor = (options) => {
        return textEditor(options);
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
                keyfilter="pint"
                value={options.value}
                onChange={(e) => onChangeTextEdit(e, options)}
                onFocus={handleFocus}
            />
        );
    };

    const blankFn = () => {
        alert("사용 여부 확인 부탁합니다<br><br>Please check whether you are using it or not");
    };

    // Support Area

    return (
        <div className="af-div-main">
            <div
                className="af-div-first"
                style={{ width: "123rem", height: "14rem" }}
            >
                <span className="af-span-3-0" style={{ width: "60rem" }}>
                    <p className="af-span-p" style={{ width: "7rem" }}>Factory#</p>
                    <div className="af-span-div" style={{ width: "12rem" }}>
                        <Dropdown
                            style={{ width: "12rem" }}
                            id="id_FACTORY_CD"
                            value={dataQRY_KSV_ORDER_PLAN_FACTORY_CD}
                            onChange={(e) =>
                                onDropdownChangeQRY_KSV_ORDER_PLAN_FACTORY_CD(
                                    e,
                                    "FACTORY_CD",
                                )
                            }
                            options={datasQRY_KSV_ORDER_PLAN_FACTORY_CD}
                            optionLabel="FACTORY_NAME"
                            placeholder=""
                            editable
                        ></Dropdown>
                    </div>
                    <p className="af-span-p" style={{ width: "7rem" }}>Charger#</p>
                    <div className="af-span-div" style={{ width: "12rem" }}>
                        <InputText
                            disabled
                            style={{ width: "12rem" }}
                            id="id_USER_NAME"
                            value={dataQRY_KSV_ORDER_PLAN.USER_NAME}
                            onChange={(e) =>
                                onInputChangeQRY_KSV_ORDER_PLAN_USER_NAME(
                                    e,
                                    "USER_NAME",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "15rem" }}>
                    <p className="af-span-p" style={{ width: "14rem" }}>Sales/Matl Plan</p>
                </span>
                <span className="af-span-3-0" style={{ width: "13rem" }}>
                    <div className="af-span-div-btn" style={{ width: "12rem" }}>
                        <Button
                            label="Report"
                            style={{ width: "12rem" }}
                            className="p-button-text green"
                            onClick={process_EXCEL_PRINT}
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "25rem" }}>
                    <div className="af-span-div-btn" style={{ width: "12rem" }}>
                        <Button
                            disabled
                            label="Report(Total)"
                            style={{ width: "12rem" }}
                            className="p-button-text green"
                            onClick={process_EXCEL_PRINT_TOT}
                        />
                    </div>
                </span>

                <span className="af-span-3" style={{ width: "60rem" }}>
                    <p className="af-span-p" style={{ width: "7rem" }}>Buyer#</p>
                    <div className="af-span-div" style={{ width: "25rem" }}>
                        <Dropdown
                            style={{ width: "25rem" }}
                            id="id_BUYER_CD"
                            value={dataQRY_KSV_ORDER_PLAN_BUYER_CD}
                            onChange={(e) =>
                                onDropdownChangeQRY_KSV_ORDER_PLAN_BUYER_CD(
                                    e,
                                    "BUYER_CD",
                                )
                            }
                            options={datasQRY_KSV_ORDER_PLAN_BUYER_CD}
                            optionLabel="BUYER_NAME"
                            placeholder=""
                            editable
                            filter
                        ></Dropdown>
                    </div>
                    <p className="af-span-p" style={{ width: "3rem" }}> </p>
                    <div className="af-span-div-btn" style={{ width: "12rem" }}>
                        <Button
                            label="Order Recalc"
                            style={{ width: "12rem" }}
                            className="p-button-text"
                            onClick={process_RECALC}
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "15rem" }}>
                    <p className="af-span-p" style={{ width: "14rem" }}> </p>
                </span>
                <span className="af-span-3" style={{ width: "13rem" }}>
                    <div className="af-span-div-btn" style={{ width: "12rem" }}>
                        <Button
                            disabled
                            label="Report(3/4)"
                            style={{ width: "12rem" }}
                            className="p-button-text green"
                            onClick={process_EXCEL_PRINT_TOT_3}
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "25rem" }}>
                    <div className="af-span-div-btn" style={{ width: "12rem" }}>
                        <Button
                            disabled
                            label="Report(Glove)"
                            style={{ width: "12rem" }}
                            className="p-button-text green"
                            onClick={process_EXCEL_PRINT_TOT_G}
                        />
                    </div>
                </span>

                <span className="af-span-3" style={{ width: "75.5rem" }}>
                    <p className="af-span-p" style={{ width: "74rem" }}> </p>
                </span>
                <span className="af-span-3" style={{ width: "13rem" }}>
                    <div className="af-span-div-btn" style={{ width: "12rem" }}>
                        <Button
                            disabled
                            label="Report(Normal)"
                            style={{ width: "12rem" }}
                            className="p-button-text green"
                            onClick={process_EXCEL_PRINT_TOT_1}
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "25rem" }}>
                    <div className="af-span-div-btn" style={{ width: "12rem" }}>
                        <Button
                            disabled
                            label="Report(Down)"
                            style={{ width: "12rem" }}
                            className="p-button-text green"
                            onClick={process_EXCEL_PRINT_TOT_D}
                        />
                    </div>
                </span>

                <span className="af-span-3" style={{ width: "60rem" }}>
                    <p className="af-span-p" style={{ width: "7rem" }}>YY/MM</p>
                    <div className="af-span-div" style={{ width: "8rem" }}>
                        <Dropdown
                            style={{ width: "8rem" }}
                            id="id_YEAR"
                            value={dataQRY_KSV_ORDER_PLAN_YEAR}
                            onChange={(e) =>
                                onDropdownChangeQRY_KSV_ORDER_PLAN_YEAR(
                                    e,
                                    "YEAR",
                                )
                            }
                            options={datasQRY_KSV_ORDER_PLAN_YEAR}
                            optionLabel="CD_NAME"
                            placeholder=""
                            editable
                        ></Dropdown>
                    </div>
                    <div className="af-span-div" style={{ width: "5rem" }}>
                        <Dropdown
                            style={{ width: "5rem" }}
                            id="id_MONTH"
                            value={dataQRY_KSV_ORDER_PLAN_MONTH}
                            onChange={(e) =>
                                onDropdownChangeQRY_KSV_ORDER_PLAN_MONTH(
                                    e,
                                    "MONTH",
                                )
                            }
                            options={datasQRY_KSV_ORDER_PLAN_MONTH}
                            optionLabel="CD_NAME"
                            placeholder=""
                            editable
                        ></Dropdown>
                    </div>
                    <div className="af-span-div-btn" style={{ width: "11rem" }}>
                        <Button
                            label="연복사"
                            style={{ width: "10rem" }}
                            className="p-button-text"
                            onClick={process_COPY_YEAR}
                        />
                    </div>
                    <div className="af-span-div-btn" style={{ width: "11rem" }}>
                        <Button
                            label="List"
                            style={{ width: "10rem" }}
                            className="p-button-text green"
                            onClick={exportExcelTBL_KSV_ORDER_MST}
                        />
                    </div>
                    <div className="af-span-div" style={{ width: "10rem" }}>
                        <Dropdown
                            style={{ width: "10rem" }}
                            id="id_TYPE"
                            value={dataQRY_KSV_ORDER_PLAN_TYPE}
                            onChange={(e) =>
                                onDropdownChangeQRY_KSV_ORDER_PLAN_TYPE(
                                    e,
                                    "TYPE",
                                )
                            }
                            options={datasQRY_KSV_ORDER_PLAN_TYPE}
                            optionLabel="CD_NAME"
                            placeholder=""
                            editable
                        ></Dropdown>
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "15rem" }}>
                    <p className="af-span-p" style={{ width: "14rem" }}> </p>
                </span>
                <span className="af-span-3" style={{ width: "33rem" }}>
                    <div className="af-span-div-btn" style={{ width: "12rem" }}>
                        <Button
                            disabled
                            label="Report(S/S)"
                            style={{ width: "12rem" }}
                            className="p-button-text green"
                            onClick={process_EXCEL_PRINT_TOT_S}
                        />
                    </div>
                </span>

                <span className="af-span-3" style={{ width: "60rem" }}>
                    <p className="af-span-p" style={{ width: "7rem" }}>Curr</p>
                    <div className="af-span-div" style={{ width: "8rem" }}>
                        <Dropdown
                            style={{ width: "8rem" }}
                            id="id_CUR"
                            value={dataQRY_KSV_ORDER_PLAN_CUR}
                            onChange={(e) =>
                                onDropdownChangeQRY_KSV_ORDER_PLAN_CUR(e, "CUR")
                            }
                            options={datasQRY_KSV_ORDER_PLAN_CUR}
                            optionLabel="CD_NAME"
                            placeholder=""
                            editable
                        ></Dropdown>
                    </div>
                    <p className="af-span-p" style={{ width: "40rem" }}>* User ID컬럼에 두개이상의 ID가 있을경우 중복입력</p>
                </span>
                <span className="af-span-3" style={{ width: "15rem" }}>
                    <p className="af-span-p" style={{ width: "14rem" }}> </p>
                </span>
                <span className="af-span-3" style={{ width: "33rem" }}>
                    <div className="af-span-div-btn" style={{ width: "12rem" }}>
                        <Button
                            disabled
                            label="Report(G/S)"
                            style={{ width: "12rem" }}
                            className="p-button-text green"
                            onClick={process_EXCEL_PRINT_TOT_G}
                        />
                    </div>
                </span>
            </div>
            <div
                className="af-div-first"
                style={{ width: "123rem", height: "3rem" }}
            >
                <span className="af-span-3" style={{ width: "60rem" }}>
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
                            onClick={search_LIST_1}
                        />
                    </div>
                    <div className="af-span-div-btn" style={{ width: "10rem" }}>
                        <Button
                            disabled={disableVal}
                            label="Insert"
                            style={{ width: "10rem" }}
                            className="p-button-text"
                            onClick={process_INSERT}
                        />
                    </div>
                    <div className="af-span-div-btn" style={{ width: "10rem" }}>
                        <Button
                            disabled={disableVal}
                            label="Update"
                            style={{ width: "10rem" }}
                            className="p-button-text"
                            onClick={process_INSERT}
                        />
                    </div>
                    <div className="af-span-div-btn" style={{ width: "10rem" }}>
                        <Button
                            disabled={disableVal}
                            label="Delete"
                            style={{ width: "10rem" }}
                            className="p-button-text"
                            onClick={process_DELETE}
                        />
                    </div>
                    <div className="af-span-div-btn" style={{ width: "10rem" }}>
                        <Button
                            label="#Reset"
                            style={{ width: "10rem" }}
                            className="p-button-text"
                            onClick={blankFn}
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "60rem" }}>
                    <div className="af-span-div-btn" style={{ width: "15rem" }}>
                        <Button
                            label="Select Copy"
                            style={{ width: "14rem" }}
                            className="p-button-text"
                            onClick={process_SELECT_COPY}
                        />
                    </div>
                    <div className="af-span-div-btn" style={{ width: "15rem" }}>
                        <Button
                            label="Select Delete"
                            style={{ width: "14rem" }}
                            className="p-button-text"
                            onClick={process_SELECT_DELETE}
                        />
                    </div>
                </span>
            </div>

            <div
                className="af-div-first"
                style={{ width: "123rem", height: "42rem" }}
            >
                <ContextMenu model={menuModel} ref={cm} />
                <AFDataTable preventUnrelatedRerender
                    ref={dt_TBL_KSV_ORDER_MST}
                    editMode="cell"
                    size="small"
                    value={datasTBL_KSV_ORDER_MST}
                    onContextMenu={(e) => cm.current.show(e.originalEvent)}
                    loading={loadingTBL_KSV_ORDER_MST}
                    tableStyle={{ tableLayout: "fixed" }}
                    resizableColumns
                    columnResizeMode="expand"
                    metaKeySelection={false}
                    showGridlines
                    selectionMode="multiple"
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
                    //header={headerTBL_KSV_ORDER_MST}
                    responsiveLayout="scroll"
                    scrollable
                    scrollHeight="42rem"
                >
                    <AFColumn field="YYMM" headerClassName="t-header" header="YYMM" style={{ width: "8rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="LINE_TYPE_N" headerClassName="t-header" header="Type" style={{ width: "8rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="PLAN_QTY" headerStyle={{ color: "green" }} headerClassName="t-header" header="Qty/Plan" bodyClassName="col-right" style={{ width: "8rem", height: "1.8rem", flexBasis: "auto", }} editor={(options) => cellEditor(options)} onCellEditComplete={onCellEditComplete} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.PLAN_QTY, 0) } ></AFColumn>
                    <AFColumn field="PLAN_PRICE" headerStyle={{ color: "green" }} headerClassName="t-header" header="Price/Plan" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} editor={(options) => cellEditor(options)} onCellEditComplete={onCellEditComplete} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.PLAN_PRICE, 2) } ></AFColumn>
                    <AFColumn field="PLAN_AMT" headerStyle={{ color: "green" }} headerClassName="t-header" header="Amt/Plan" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} editor={(options) => cellEditor(options)} onCellEditComplete={onCellEditComplete} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.PLAN_AMT, 2) } ></AFColumn>
                    <AFColumn field="CM_PRICE" headerStyle={{ color: "green" }} headerClassName="t-header" header="CmPrice/Plan" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} editor={(options) => cellEditor(options)} onCellEditComplete={onCellEditComplete} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.CM_PRICE, 2) } ></AFColumn>
                    <AFColumn field="CM_AMT" headerStyle={{ color: "green" }} headerClassName="t-header" header="CmAmt/Plan" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} editor={(options) => cellEditor(options)} onCellEditComplete={onCellEditComplete} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.CM_AMT, 2) } ></AFColumn>
                    <AFColumn field="CURR_CD" headerClassName="t-header" header="Curr" style={{ width: "8rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="USER_ID" headerClassName="t-header" header="Charger" style={{ width: "8rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="ORDER_QTY" headerClassName="t-header" header="Order Fix Qty" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.ORDER_QTY, 0) } ></AFColumn>
                    <AFColumn field="ORDER_AMT" headerClassName="t-header" header="Order Fix Amt" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.ORDER_AMT, 2) } ></AFColumn>
                    <AFColumn field="CURR_CM_AMT" headerClassName="t-header" header="Cm Amt" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.CURR_CM_AMT, 2) } ></AFColumn>
                    <AFColumn field="OLD_ORDER_QTY" headerClassName="t-header" header="Last Order Fix Qty" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.OLD_ORDER_QTY, 0) } ></AFColumn>
                    <AFColumn field="OLD_ORDER_AMT" headerClassName="t-header" header="Last Order Fix Amt" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.OLD_ORDER_AMT, 2) } ></AFColumn>
                    <AFColumn field="OLD_CM_AMT" headerClassName="t-header" header="Last Cm Amt" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.OLD_CM_AMT, 2) } ></AFColumn>
                </AFDataTable>
            </div>

            <Toast ref={toast} />
        </div>
    );
};

const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(S0216_SALES_MATL_PLAN_QRY, comparisonFn);
