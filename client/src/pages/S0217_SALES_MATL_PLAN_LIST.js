/* eslint-disable */
import React, { useState, useEffect, useRef } from "react";
import classNames from "classnames";
import axios from "axios";
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
    S_DATE: "202501",
    E_DATE: "202512",
    USER_CD: "",

    BUYER_CD: "",

    TEAM_CD: "",
    FACTORY_CD: "",
};

const emptyTBL_KSV_ORDER_MST = {
    id: 0,
    CHARGER: "",
    BUYER_NAME: "",
    COLLECTION: "",
    TOTAL_QTY: "",
    TOTAL_AMT: "",
    CURR: "",
    QUARTER: "",
    H: "",
    J: "",
};

const emptyTBL_KSV_ORDER_MST1 = {
    id: 0,
    COLLECTION: "",
    QTY1: "",
    AMT1: "",
    D: "",
    QTY2: "",
    AMT2: "",
    G: "",
    QTY3: "",
    AMT3: "",
    J: "",
    QTY4: "",
    AMT4: "",
    M: "",
    QTY5: "",
    AMT5: "",
};

const S0217_SALES_MATL_PLAN_LIST = () => {
    const serviceLibRef = useRef(null);
    if (!serviceLibRef.current) {
        serviceLibRef.current = new ServiceLib();
        serviceLibRef.current.loginConfirm();
    }
    const serviceLib = serviceLibRef.current;
    const serviceS0217_SALES_MATL_PLAN_LIST =
        new ServiceS0217_SALES_MATL_PLAN_LIST();

    const toast = useRef(null);

    /* splitter 관련 */
    const [styleVal, setStyleVal] = useState({ width: "65vw" });

    /* QRY KSV_ORDER_PLAN*/
    const [dataQRY_KSV_ORDER_PLAN, setDataQRY_KSV_ORDER_PLAN] = useState(
        emptyQRY_KSV_ORDER_PLAN,
    );

    const [datasQRY_KSV_ORDER_PLAN_S_DATE, setDatasQRY_KSV_ORDER_PLAN_S_DATE] =
        useState([]);
    const [dataQRY_KSV_ORDER_PLAN_S_DATE, setDataQRY_KSV_ORDER_PLAN_S_DATE] =
        useState({});

    const onDropdownChangeQRY_KSV_ORDER_PLAN_S_DATE = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataQRY_KSV_ORDER_PLAN = { ...dataQRY_KSV_ORDER_PLAN };

        let tTypeVal = _dataQRY_KSV_ORDER_PLAN[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_ORDER_PLAN[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_ORDER_PLAN[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_ORDER_PLAN(_dataQRY_KSV_ORDER_PLAN);
        setDataQRY_KSV_ORDER_PLAN_S_DATE(e.value);
    };

    const [datasQRY_KSV_ORDER_PLAN_E_DATE, setDatasQRY_KSV_ORDER_PLAN_E_DATE] =
        useState([]);
    const [dataQRY_KSV_ORDER_PLAN_E_DATE, setDataQRY_KSV_ORDER_PLAN_E_DATE] =
        useState({});

    const onDropdownChangeQRY_KSV_ORDER_PLAN_E_DATE = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataQRY_KSV_ORDER_PLAN = { ...dataQRY_KSV_ORDER_PLAN };

        let tTypeVal = _dataQRY_KSV_ORDER_PLAN[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_ORDER_PLAN[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_ORDER_PLAN[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_ORDER_PLAN(_dataQRY_KSV_ORDER_PLAN);
        setDataQRY_KSV_ORDER_PLAN_E_DATE(e.value);
    };

    const [
        datasQRY_KSV_ORDER_PLAN_USER_CD,
        setDatasQRY_KSV_ORDER_PLAN_USER_CD,
    ] = useState([]);
    const [dataQRY_KSV_ORDER_PLAN_USER_CD, setDataQRY_KSV_ORDER_PLAN_USER_CD] =
        useState({});

    const onDropdownChangeQRY_KSV_ORDER_PLAN_USER_CD = (e, name) => {
        let val = (e.value && e.value.USER_ID) || "";

        let _dataQRY_KSV_ORDER_PLAN = { ...dataQRY_KSV_ORDER_PLAN };

        let tTypeVal = _dataQRY_KSV_ORDER_PLAN[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_ORDER_PLAN[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_ORDER_PLAN[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_ORDER_PLAN(_dataQRY_KSV_ORDER_PLAN);
        setDataQRY_KSV_ORDER_PLAN_USER_CD(e.value);
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
        datasQRY_KSV_ORDER_PLAN_TEAM_CD,
        setDatasQRY_KSV_ORDER_PLAN_TEAM_CD,
    ] = useState([]);
    const [dataQRY_KSV_ORDER_PLAN_TEAM_CD, setDataQRY_KSV_ORDER_PLAN_TEAM_CD] =
        useState({});

    const onDropdownChangeQRY_KSV_ORDER_PLAN_TEAM_CD = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataQRY_KSV_ORDER_PLAN = { ...dataQRY_KSV_ORDER_PLAN };

        let tTypeVal = _dataQRY_KSV_ORDER_PLAN[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_ORDER_PLAN[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_ORDER_PLAN[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_ORDER_PLAN(_dataQRY_KSV_ORDER_PLAN);
        setDataQRY_KSV_ORDER_PLAN_TEAM_CD(e.value);
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

    const search_LIST_1 = () => {
        if (
            dataQRY_KSV_ORDER_PLAN.S_DATE === "" ||
            dataQRY_KSV_ORDER_PLAN.E_DATE === ""
        ) {
            alert("날짜를 입력해야 합니다<br><br>You must enter a date");
            return;
        }
        if (dataQRY_KSV_ORDER_PLAN.FACTORY === "") {
            alert("Factory를 입력해야 합니다<br><br>You must enter Factory");
            return;
        }

        clearSelectedTBL_KSV_ORDER_MST();

        setLoadingTBL_KSV_ORDER_MST(true);

        setDatasTBL_KSV_ORDER_MST([]);
        setDatasTBL_KSV_ORDER_MST1([]);

        serviceS0217_SALES_MATL_PLAN_LIST
            .mgrQuery_LIST_1(dataQRY_KSV_ORDER_PLAN)
            .then((data) => {
                setLoadingTBL_KSV_ORDER_MST(false);
                if (typeof data.graphQLErrors === "undefined") {
                    console.log(
                        "ServiceNawooAll.mgrQueryTBL_KSV_ORDER_MST() call => " +
                            data.length,
                    );

                    var tArray = data.map((col, i) => {
                        var tObj = {};
                        tObj.id = i + 1;
                        tObj.USER_NAME = col.USER_NAME;
                        tObj.CURR_CD = col.CURR_CD;
                        tObj.BUYER_NAME = col.BUYER_NAME;
                        tObj.COLLECTION = col.COLLECTION;
                        tObj.TOTAL_QTY = col.TOTAL_QTY;
                        tObj.TOTAL_AMT = col.TOTAL_AMT;

                        let tObj0 = col.LINE_SUM.filter((col, i) => {
                            if (col.LINE_TYPE === "1") return col;
                        });
                        if (tObj0.length <= 0) {
                            tObj.LINE_1_QTY = 0;
                            tObj.LINE_1_AMT = 0;
                        } else {
                            tObj.LINE_1_QTY = tObj0[0].LINE_QTY;
                            tObj.LINE_1_AMT = tObj0[0].LINE_AMT;
                        }

                        tObj0 = col.LINE_SUM.filter((col, i) => {
                            if (col.LINE_TYPE === "G") return col;
                        });
                        if (tObj0.length <= 0) {
                            tObj.LINE_G_QTY = 0;
                            tObj.LINE_G_AMT = 0;
                        } else {
                            tObj.LINE_G_QTY = tObj0[0].LINE_QTY;
                            tObj.LINE_G_AMT = tObj0[0].LINE_AMT;
                        }

                        tObj0 = col.LINE_SUM.filter((col, i) => {
                            if (col.LINE_TYPE === "S") return col;
                        });
                        if (tObj0.length <= 0) {
                            tObj.LINE_S_QTY = 0;
                            tObj.LINE_S_AMT = 0;
                        } else {
                            tObj.LINE_S_QTY = tObj0[0].LINE_QTY;
                            tObj.LINE_S_AMT = tObj0[0].LINE_AMT;
                        }

                        tObj0 = col.LINE_SUM.filter((col, i) => {
                            if (col.LINE_TYPE === "3") return col;
                        });
                        if (tObj0.length <= 0) {
                            tObj.LINE_3_QTY = 0;
                            tObj.LINE_3_AMT = 0;
                        } else {
                            tObj.LINE_3_QTY = tObj0[0].LINE_QTY;
                            tObj.LINE_3_AMT = tObj0[0].LINE_AMT;
                        }

                        tObj0 = col.LINE_SUM.filter((col, i) => {
                            if (col.LINE_TYPE === "D") return col;
                        });
                        if (tObj0.length <= 0) {
                            tObj.LINE_D_QTY = 0;
                            tObj.LINE_D_AMT = 0;
                        } else {
                            tObj.LINE_D_QTY = tObj0[0].LINE_QTY;
                            tObj.LINE_D_AMT = tObj0[0].LINE_AMT;
                        }

                        tObj0 = col.LINE_SUM.filter((col, i) => {
                            if (col.LINE_TYPE === "W") return col;
                        });
                        if (tObj0.length <= 0) {
                            tObj.LINE_W_QTY = 0;
                            tObj.LINE_W_AMT = 0;
                        } else {
                            tObj.LINE_W_QTY = tObj0[0].LINE_QTY;
                            tObj.LINE_W_AMT = tObj0[0].LINE_AMT;
                        }

                        return tObj;
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
        serviceS0217_SALES_MATL_PLAN_LIST
            .mgrQueryTBL_KSV_ORDER_MST1(dataQRY_KSV_ORDER_PLAN)
            .then((data) => {
                if (typeof data.graphQLErrors === "undefined") {
                    console.log(
                        "ServiceNawooAll.mgrQueryTBL_KSV_ORDER_MST1() call => " +
                            data.length,
                    );

                    var tOneObj = data[0];

                    var tColArray = [];
                    var tIdx = 0;
                    for (tIdx = 0; tIdx < tOneObj.YYMM_SUM.length; tIdx++) {
                        var tOne = tOneObj.YYMM_SUM[tIdx];
                        tColArray.push(`QTY-${tOne.YYMM}`);
                        tColArray.push(`AMT-${tOne.YYMM}`);
                    }

                    var tColArray1 = tColArray.map((col, i) => {
                        var tObj = {};
                        tObj.field = col;
                        tObj.field_name = col;
                        return tObj;
                    });
                    console.log(tColArray1);
                    setDatasTBL_KSV_ORDER_MST1_COLS(tColArray1);

                    var tDataArray = data.map((col, i) => {
                        var tObj = {};
                        tObj.id = i + 1;
                        tObj.COLLECTION = col.COLLECTION;
                        tObj.CURR_CD = col.CURR_CD;

                        var tIdx1 = 0;
                        for (tIdx1 = 0; tIdx1 < col.YYMM_SUM.length; tIdx1++) {
                            var tOne = col.YYMM_SUM[tIdx1];
                            tObj[`QTY-${tOne.YYMM}`] = serviceLib.numWithCommas(
                                parseFloat(tOne.YYMM_QTY),
                                0,
                            );
                            tObj[`AMT-${tOne.YYMM}`] = serviceLib.numWithCommas(
                                parseFloat(tOne.YYMM_AMT),
                                2,
                            );
                        }

                        return tObj;
                    });

                    setDatasTBL_KSV_ORDER_MST1(tDataArray);
                } else {
                    // var tStr = data.graphQLErrors[0].message;
                    console.log(
                        "ServiceNawooAll.mgrQueryTBL_KSV_ORDER_MST1()error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });
    };

    const exportExcelTBL_KSV_ORDER_MST = () => {
        var tArray = [];
        datasTBL_KSV_ORDER_MST.forEach((col, i) => {
            var tObj = {};
            tObj.Seq = col.id;
            tObj.Charge = col.USER_NAME;
            tObj.Buyer = col.BUYER_NAME;
            tObj.Collection = col.COLLECTION;
            tObj.Total_Qty = col.TOTAL_QTY;
            tObj.Total_Amt = col.TOTAL_AMT;
            tObj.Curr = col.CURR_CD;
            tObj.Qty_1 = col.LINE_1_QTY;
            tObj.Amt_1 = col.LINE_1_AMT;
            tObj.Qty_G = col.LINE_G_QTY;
            tObj.Amt_G = col.LINE_G_AMT;
            tObj.Qty_S = col.LINE_S_QTY;
            tObj.Amt_S = col.LINE_S_AMT;
            tObj.Qty_3 = col.LINE_3_QTY;
            tObj.Amt_3 = col.LINE_3_AMT;
            tObj.Qty_D = col.LINE_D_QTY;
            tObj.Amt_D = col.LINE_D_AMT;
            tObj.Qty_W = col.LINE_W_QTY;
            tObj.Amt_W = col.LINE_W_AMT;
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
            saveAsExcelFileTBL_KSV_ORDER_MST(excelBuffer, "Matl_Plan_List_1");
        });
    };

    const exportExcelTBL_KSV_ORDER_MST1 = () => {
        import("xlsx").then((xlsx) => {
            const worksheet = xlsx.utils.json_to_sheet(datasTBL_KSV_ORDER_MST1);
            const workbook = {
                Sheets: { data: worksheet },
                SheetNames: ["data"],
            };
            const excelBuffer = xlsx.write(workbook, {
                bookType: "xlsx",
                type: "array",
            });
            saveAsExcelFileTBL_KSV_ORDER_MST(excelBuffer, "Matl_Plan_List_2");
        });
    };

    const exportEXCEL = () => {
        exportExcelTBL_KSV_ORDER_MST();
        exportExcelTBL_KSV_ORDER_MST1();
    };

    const process_EXCEL_PRINT = () => {
        if (
            dataQRY_KSV_ORDER_PLAN.S_DATE === "" ||
            dataQRY_KSV_ORDER_PLAN.E_DATE === ""
        ) {
            alert("날짜를 입력해야 합니다<br><br>You must enter a date");
            return;
        }
        if (dataQRY_KSV_ORDER_PLAN.FACTORY === "") {
            alert("Factory를 입력해야 합니다<br><br>You must enter Factory");
            return;
        }

        clearSelectedTBL_KSV_ORDER_MST();

        setLoadingTBL_KSV_ORDER_MST(true);

        setDatasTBL_KSV_ORDER_MST([]);
        setDatasTBL_KSV_ORDER_MST1([]);

        var tInObj = { ...dataQRY_KSV_ORDER_PLAN };
        tInObj.REPORT_KIND = 'Grand Total';

        serviceS0217_SALES_MATL_PLAN_LIST
            .mgrQuery_EXCEL_PRINT(tInObj)
            .then((data) => {
                setLoadingTBL_KSV_ORDER_MST(false);
                if (typeof data.graphQLErrors === "undefined") {
                    if (data.length > 0) {
                        if (data[0].CODE.includes("SUCC")) {
                            serviceLib.downloadFile(
                                data[0].CODE.split("?")[2].toString(),
                                data[0].CODE.split("?")[1].toString(),
                            );
                        } else {
                            alert(data[0].CODE)
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

    const process_EXCEL_PRINT_NSR = () => {
        if (
            dataQRY_KSV_ORDER_PLAN.S_DATE === "" ||
            dataQRY_KSV_ORDER_PLAN.E_DATE === ""
        ) {
            alert("날짜를 입력해야 합니다<br><br>You must enter a date");
            return;
        }
        if (dataQRY_KSV_ORDER_PLAN.FACTORY === "") {
            alert("Factory를 입력해야 합니다<br><br>You must enter Factory");
            return;
        }

        clearSelectedTBL_KSV_ORDER_MST();

        setLoadingTBL_KSV_ORDER_MST(true);

        setDatasTBL_KSV_ORDER_MST([]);
        setDatasTBL_KSV_ORDER_MST1([]);

        var tInObj = { ...dataQRY_KSV_ORDER_PLAN };
        tInObj.REPORT_KIND = 'NSR';

        serviceS0217_SALES_MATL_PLAN_LIST
            .mgrQuery_EXCEL_PRINT(tInObj)
            .then((data) => {
                setLoadingTBL_KSV_ORDER_MST(false);
                if (typeof data.graphQLErrors === "undefined") {
                    if (data.length > 0) {
                        if (data[0].CODE.includes("SUCC")) {
                            serviceLib.downloadFile(
                                data[0].CODE.split("?")[2].toString(),
                                data[0].CODE.split("?")[1].toString(),
                            );
                        } else {
                            alert(data[0].CODE)
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

    const process_EXCEL_PRINT_EXCL_GLOVE = () => {
        if (
            dataQRY_KSV_ORDER_PLAN.S_DATE === "" ||
            dataQRY_KSV_ORDER_PLAN.E_DATE === ""
        ) {
            alert("날짜를 입력해야 합니다<br><br>You must enter a date");
            return;
        }
        if (dataQRY_KSV_ORDER_PLAN.FACTORY === "") {
            alert("Factory를 입력해야 합니다<br><br>You must enter Factory");
            return;
        }

        clearSelectedTBL_KSV_ORDER_MST();

        setLoadingTBL_KSV_ORDER_MST(true);

        setDatasTBL_KSV_ORDER_MST([]);
        setDatasTBL_KSV_ORDER_MST1([]);

        var tInObj = { ...dataQRY_KSV_ORDER_PLAN };
        tInObj.REPORT_KIND = 'EXCL_GLOVE';

        serviceS0217_SALES_MATL_PLAN_LIST
            .mgrQuery_EXCEL_PRINT(tInObj)
            .then((data) => {
                setLoadingTBL_KSV_ORDER_MST(false);
                if (typeof data.graphQLErrors === "undefined") {
                    if (data.length > 0) {
                        if (data[0].CODE.includes("SUCC")) {
                            serviceLib.downloadFile(
                                data[0].CODE.split("?")[2].toString(),
                                data[0].CODE.split("?")[1].toString(),
                            );
                        } else {
                            alert(data[0].CODE)
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

    const process_EXCEL_PRINT_EXCL_G_N = () => {
        if (
            dataQRY_KSV_ORDER_PLAN.S_DATE === "" ||
            dataQRY_KSV_ORDER_PLAN.E_DATE === ""
        ) {
            alert("날짜를 입력해야 합니다<br><br>You must enter a date");
            return;
        }
        if (dataQRY_KSV_ORDER_PLAN.FACTORY === "") {
            alert("Factory를 입력해야 합니다<br><br>You must enter Factory");
            return;
        }

        clearSelectedTBL_KSV_ORDER_MST();

        setLoadingTBL_KSV_ORDER_MST(true);

        setDatasTBL_KSV_ORDER_MST([]);
        setDatasTBL_KSV_ORDER_MST1([]);

        var tInObj = { ...dataQRY_KSV_ORDER_PLAN };
        tInObj.REPORT_KIND = 'EXCL_G_N';

        serviceS0217_SALES_MATL_PLAN_LIST
            .mgrQuery_EXCEL_PRINT(tInObj)
            .then((data) => {
                setLoadingTBL_KSV_ORDER_MST(false);
                if (typeof data.graphQLErrors === "undefined") {
                    if (data.length > 0) {
                        if (data[0].CODE.includes("SUCC")) {
                            serviceLib.downloadFile(
                                data[0].CODE.split("?")[2].toString(),
                                data[0].CODE.split("?")[1].toString(),
                            );
                        } else {
                            alert(data[0].CODE)
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

    const process_EXCEL_PRINT_EXCL_NSR = () => {
        if (
            dataQRY_KSV_ORDER_PLAN.S_DATE === "" ||
            dataQRY_KSV_ORDER_PLAN.E_DATE === ""
        ) {
            alert("날짜를 입력해야 합니다<br><br>You must enter a date");
            return;
        }
        if (dataQRY_KSV_ORDER_PLAN.FACTORY === "") {
            alert("Factory를 입력해야 합니다<br><br>You must enter Factory");
            return;
        }

        clearSelectedTBL_KSV_ORDER_MST();

        setLoadingTBL_KSV_ORDER_MST(true);

        setDatasTBL_KSV_ORDER_MST([]);
        setDatasTBL_KSV_ORDER_MST1([]);

        var tInObj = { ...dataQRY_KSV_ORDER_PLAN };
        tInObj.REPORT_KIND = 'EXCL_NSR';

        serviceS0217_SALES_MATL_PLAN_LIST
            .mgrQuery_EXCEL_PRINT(tInObj)
            .then((data) => {
                setLoadingTBL_KSV_ORDER_MST(false);
                if (typeof data.graphQLErrors === "undefined") {
                    if (data.length > 0) {
                        if (data[0].CODE.includes("SUCC")) {
                            serviceLib.downloadFile(
                                data[0].CODE.split("?")[2].toString(),
                                data[0].CODE.split("?")[1].toString(),
                            );
                        } else {
                            alert(data[0].CODE)
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

    const process_EXCEL_PRINT_TENT = () => {
        if (
            dataQRY_KSV_ORDER_PLAN.S_DATE === "" ||
            dataQRY_KSV_ORDER_PLAN.E_DATE === ""
        ) {
            alert("날짜를 입력해야 합니다<br><br>You must enter a date");
            return;
        }
        if (dataQRY_KSV_ORDER_PLAN.FACTORY === "") {
            alert("Factory를 입력해야 합니다<br><br>You must enter Factory");
            return;
        }

        clearSelectedTBL_KSV_ORDER_MST();

        setLoadingTBL_KSV_ORDER_MST(true);

        setDatasTBL_KSV_ORDER_MST([]);
        setDatasTBL_KSV_ORDER_MST1([]);

        var tInObj = { ...dataQRY_KSV_ORDER_PLAN };
        tInObj.REPORT_KIND = 'TENT';

        serviceS0217_SALES_MATL_PLAN_LIST
            .mgrQuery_EXCEL_PRINT(tInObj)
            .then((data) => {
                setLoadingTBL_KSV_ORDER_MST(false);
                if (typeof data.graphQLErrors === "undefined") {
                    if (data.length > 0) {
                        if (data[0].CODE.includes("SUCC")) {
                            serviceLib.downloadFile(
                                data[0].CODE.split("?")[2].toString(),
                                data[0].CODE.split("?")[1].toString(),
                            );
                        } else {
                            alert(data[0].CODE)
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

    const process_EXCEL_PRINT_GLOVE = () => {
        if (
            dataQRY_KSV_ORDER_PLAN.S_DATE === "" ||
            dataQRY_KSV_ORDER_PLAN.E_DATE === ""
        ) {
            alert("날짜를 입력해야 합니다<br><br>You must enter a date");
            return;
        }
        if (dataQRY_KSV_ORDER_PLAN.FACTORY === "") {
            alert("Factory를 입력해야 합니다<br><br>You must enter Factory");
            return;
        }

        clearSelectedTBL_KSV_ORDER_MST();

        setLoadingTBL_KSV_ORDER_MST(true);

        setDatasTBL_KSV_ORDER_MST([]);
        setDatasTBL_KSV_ORDER_MST1([]);

        var tInObj = { ...dataQRY_KSV_ORDER_PLAN };
        tInObj.REPORT_KIND = 'GLOVE';

        serviceS0217_SALES_MATL_PLAN_LIST
            .mgrQuery_EXCEL_PRINT(tInObj)
            .then((data) => {
                setLoadingTBL_KSV_ORDER_MST(false);
                if (typeof data.graphQLErrors === "undefined") {
                    if (data.length > 0) {
                        if (data[0].CODE.includes("SUCC")) {
                            serviceLib.downloadFile(
                                data[0].CODE.split("?")[2].toString(),
                                data[0].CODE.split("?")[1].toString(),
                            );
                        } else {
                            alert(data[0].CODE)
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

    const process_EXCEL_PRINT_DOWN = () => {
        if (
            dataQRY_KSV_ORDER_PLAN.S_DATE === "" ||
            dataQRY_KSV_ORDER_PLAN.E_DATE === ""
        ) {
            alert("날짜를 입력해야 합니다<br><br>You must enter a date");
            return;
        }
        if (dataQRY_KSV_ORDER_PLAN.FACTORY === "") {
            alert("Factory를 입력해야 합니다<br><br>You must enter Factory");
            return;
        }

        clearSelectedTBL_KSV_ORDER_MST();

        setLoadingTBL_KSV_ORDER_MST(true);

        setDatasTBL_KSV_ORDER_MST([]);
        setDatasTBL_KSV_ORDER_MST1([]);

        var tInObj = { ...dataQRY_KSV_ORDER_PLAN };
        tInObj.REPORT_KIND = 'DOWN';

        serviceS0217_SALES_MATL_PLAN_LIST
            .mgrQuery_EXCEL_PRINT(tInObj)
            .then((data) => {
                setLoadingTBL_KSV_ORDER_MST(false);
                if (typeof data.graphQLErrors === "undefined") {
                    if (data.length > 0) {
                        if (data[0].CODE.includes("SUCC")) {
                            serviceLib.downloadFile(
                                data[0].CODE.split("?")[2].toString(),
                                data[0].CODE.split("?")[1].toString(),
                            );
                        } else {
                            alert(data[0].CODE)
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

    const process_EXCEL_PRINT_QUTER = () => {
        if (
            dataQRY_KSV_ORDER_PLAN.S_DATE === "" ||
            dataQRY_KSV_ORDER_PLAN.E_DATE === ""
        ) {
            alert("날짜를 입력해야 합니다<br><br>You must enter a date");
            return;
        }
        if (dataQRY_KSV_ORDER_PLAN.FACTORY === "") {
            alert("Factory를 입력해야 합니다<br><br>You must enter Factory");
            return;
        }

        clearSelectedTBL_KSV_ORDER_MST();

        setLoadingTBL_KSV_ORDER_MST(true);

        setDatasTBL_KSV_ORDER_MST([]);
        setDatasTBL_KSV_ORDER_MST1([]);

        var tInObj = { ...dataQRY_KSV_ORDER_PLAN };
        tInObj.REPORT_KIND = 'Quter';

        serviceS0217_SALES_MATL_PLAN_LIST
            .mgrQuery_EXCEL_PRINT_QUTER(tInObj)
            .then((data) => {
                setLoadingTBL_KSV_ORDER_MST(false);
                if (typeof data.graphQLErrors === "undefined") {
                    if (data.length > 0) {
                        if (data[0].CODE.includes("SUCC")) {
                            serviceLib.downloadFile(
                                data[0].CODE.split("?")[2].toString(),
                                data[0].CODE.split("?")[1].toString(),
                            );
                        } else {
                            alert(data[0].CODE)
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
        if (
            dataQRY_KSV_ORDER_PLAN.S_DATE === "" ||
            dataQRY_KSV_ORDER_PLAN.E_DATE === ""
        ) {
            alert("날짜를 입력해야 합니다<br><br>You must enter a date");
            return;
        }
        if (dataQRY_KSV_ORDER_PLAN.FACTORY === "") {
            alert("Factory를 입력해야 합니다<br><br>You must enter Factory");
            return;
        }

        clearSelectedTBL_KSV_ORDER_MST();

        setLoadingTBL_KSV_ORDER_MST(true);

        setDatasTBL_KSV_ORDER_MST([]);
        setDatasTBL_KSV_ORDER_MST1([]);

        serviceS0217_SALES_MATL_PLAN_LIST
            .mgrQuery_EXCEL_PRINT_TOT(dataQRY_KSV_ORDER_PLAN)
            .then((data) => {
                setLoadingTBL_KSV_ORDER_MST(false);
                if (typeof data.graphQLErrors === "undefined") {
                    if (data.length > 0) {
                        if (data[0].CODE.includes("SUCC")) {
                            serviceLib.downloadFile(
                                data[0].CODE.split("?")[2].toString(),
                                data[0].CODE.split("?")[1].toString(),
                            );
                        } else {
                            alert(data[0].CODE)
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

    const clearSelectedTBL_KSV_ORDER_MST = () => {
        setSelectedTBL_KSV_ORDER_MST([]);
        setFlagSelectModeTBL_KSV_ORDER_MST(false);
    };

    /**TABLE KSV_ORDER_MST1 */
    // DEFINE DATAGRID : TBL_KSV_ORDER_MST1
    const [datasTBL_KSV_ORDER_MST1_COLS, setDatasTBL_KSV_ORDER_MST1_COLS] =
        useState([]);

    const [datasTBL_KSV_ORDER_MST1, setDatasTBL_KSV_ORDER_MST1] = useState([]);
    const dt_TBL_KSV_ORDER_MST1 = useRef(null);
    const [dataTBL_KSV_ORDER_MST1, setDataTBL_KSV_ORDER_MST1] = useState(
        emptyTBL_KSV_ORDER_MST1,
    );
    const [selectedTBL_KSV_ORDER_MST1, setSelectedTBL_KSV_ORDER_MST1] =
        useState([]);
    const [
        flagSelectModeTBL_KSV_ORDER_MST1,
        setFlagSelectModeTBL_KSV_ORDER_MST1,
    ] = useState(false);

    // DATAGRID CODE : TBL_KSV_ORDER_MST1

    const onRowClick1TBL_KSV_ORDER_MST1 = (argData0) => {
        var argData = {};

        if (typeof argData0.length !== "undefined") {
            argData = argData0[0];
        } else {
            argData = argData0;
        }

        let argTBL_KSV_ORDER_MST1 = argData;

        setDataTBL_KSV_ORDER_MST1(argTBL_KSV_ORDER_MST1);
    };

    const onRowClickTBL_KSV_ORDER_MST1 = (event) => {
        let argTBL_KSV_ORDER_MST1 = event.data;
        if (flagSelectModeTBL_KSV_ORDER_MST1) return;

        // Service : NawooAll:mgrQueryTBL_KSV_ORDER_MST1
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

    const dynamicColumnsTBL_KSV_ORDER_MST1_COLS =
        datasTBL_KSV_ORDER_MST1_COLS.map((col, i) => {
            var tHeader = `id_msg_${col.field_name}_KSV_ORDER_MST_dt`;
            var tHeaderStr = serviceLib.getLocaleMessage(tHeader);
            // return  <AFColumn field={col.field} header={tHeaderStr} headerStyle={{ width: '10rem',height:'1.8rem' }} bodyStyle={{ width: '10rem',height:'1.8rem' }} editor={(options) => cellEditorKSV_ORDER_MEM(options)} onCellEditComplete={onCellEditCompleteKSV_ORDER_MEM}></AFColumn>
            return (
                <AFColumn field={col.field} header={tHeaderStr} headerClassName="t-header" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ textAlign: "right", width: "10rem", height: "1.8rem", }} ></AFColumn>
            );
        });

    useEffect(() => {
        serviceS0217_SALES_MATL_PLAN_LIST
            .mgrQueryTBL_KSV_ORDER_MST_CODE()
            .then((data) => {
                if (typeof data.graphQLErrors === "undefined") {
                    console.log(
                        "ServiceNawooAll.mgrQueryTBL_KSV_ORDER_MST() call => " +
                            data.TEAM.length,
                    );

                    var tRetDate = serviceLib.getCurrDate().substring(0, 8);
                    var tSMonth = `${tRetDate.substring(0, 4)}01`;
                    var tEMonth = `${tRetDate.substring(0, 4)}12`;

                    var tQry = { ...dataQRY_KSV_ORDER_PLAN };
                    tQry.S_DATE = tSMonth;
                    tQry.E_DATE = tEMonth;
                    setDataQRY_KSV_ORDER_PLAN(tQry);

                    setDatasQRY_KSV_ORDER_PLAN_S_DATE(data.S_DATE);

                    var tObj1 = {};
                    data.S_DATE.forEach((col, i) => {
                        if (col.CD_CODE === tSMonth) tObj1 = { ...col };
                    });
                    if (typeof tObj1.CD_CODE !== "undefined")
                        setDataQRY_KSV_ORDER_PLAN_S_DATE(tObj1);
                    else setDataQRY_KSV_ORDER_PLAN_S_DATE(data.S_DATE[0]);

                    setDatasQRY_KSV_ORDER_PLAN_E_DATE(data.S_DATE);
                    var tObj2 = {};
                    data.S_DATE.forEach((col, i) => {
                        if (col.CD_CODE === tEMonth) tObj2 = { ...col };
                    });
                    if (typeof tObj2.CD_CODE !== "undefined")
                        setDataQRY_KSV_ORDER_PLAN_E_DATE(tObj2);
                    else setDataQRY_KSV_ORDER_PLAN_E_DATE(data.S_DATE[0]);

                    setDatasQRY_KSV_ORDER_PLAN_BUYER_CD(data.BUYER_CD);
                    setDataQRY_KSV_ORDER_PLAN_BUYER_CD(data.BUYER_CD[0]);

                    setDatasQRY_KSV_ORDER_PLAN_FACTORY_CD(data.FACTORY_CD);
                    setDataQRY_KSV_ORDER_PLAN_FACTORY_CD(data.FACTORY_CD[0]);

                    setDatasQRY_KSV_ORDER_PLAN_USER_CD(data.USER);
                    setDataQRY_KSV_ORDER_PLAN_USER_CD(data.USER[0]);

                    setDatasQRY_KSV_ORDER_PLAN_TEAM_CD(data.TEAM);
                    setDataQRY_KSV_ORDER_PLAN_TEAM_CD(data.TEAM[0]);
                } else {
                    // var tStr = data.graphQLErrors[0].message;
                    console.log(
                        "ServiceNawooAll.mgrQueryTBL_KSV_ORDER_MST()error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });
    }, []);

    const blankFn = () => {
        var tRetDate = serviceLib.getCurrDate().substring(0, 8);
        var tSMonth = `${tRetDate.substring(0, 4)}01`;
        var tEMonth = `${tRetDate.substring(0, 4)}12`;

        var tObjSDate = {};
        datasQRY_KSV_ORDER_PLAN_S_DATE.forEach((col, i) => {
            if (col.CD_CODE === tSMonth) tObjSDate = { ...col };
        });
        if (typeof tObjSDate.CD_CODE === "undefined") {
            tObjSDate = datasQRY_KSV_ORDER_PLAN_S_DATE[0] || {};
        }

        var tObjEDate = {};
        datasQRY_KSV_ORDER_PLAN_E_DATE.forEach((col, i) => {
            if (col.CD_CODE === tEMonth) tObjEDate = { ...col };
        });
        if (typeof tObjEDate.CD_CODE === "undefined") {
            tObjEDate = datasQRY_KSV_ORDER_PLAN_E_DATE[0] || {};
        }

        setDataQRY_KSV_ORDER_PLAN_S_DATE(tObjSDate);
        setDataQRY_KSV_ORDER_PLAN_E_DATE(tObjEDate);
        setDataQRY_KSV_ORDER_PLAN_BUYER_CD(
            datasQRY_KSV_ORDER_PLAN_BUYER_CD[0] || {},
        );
        setDataQRY_KSV_ORDER_PLAN_FACTORY_CD(
            datasQRY_KSV_ORDER_PLAN_FACTORY_CD[0] || {},
        );
        setDataQRY_KSV_ORDER_PLAN_USER_CD(
            datasQRY_KSV_ORDER_PLAN_USER_CD[0] || {},
        );
        setDataQRY_KSV_ORDER_PLAN_TEAM_CD(
            datasQRY_KSV_ORDER_PLAN_TEAM_CD[0] || {},
        );

        var tQry = { ...emptyQRY_KSV_ORDER_PLAN };
        tQry.S_DATE = tObjSDate.CD_CODE || tSMonth;
        tQry.E_DATE = tObjEDate.CD_CODE || tEMonth;
        setDataQRY_KSV_ORDER_PLAN(tQry);

        setLoadingTBL_KSV_ORDER_MST(false);
        setDatasTBL_KSV_ORDER_MST([]);
        setDatasTBL_KSV_ORDER_MST1([]);
        setDatasTBL_KSV_ORDER_MST1_COLS([]);
        setDataTBL_KSV_ORDER_MST(emptyTBL_KSV_ORDER_MST);
        setDataTBL_KSV_ORDER_MST1(emptyTBL_KSV_ORDER_MST1);
        setSelectedTBL_KSV_ORDER_MST([]);
        setSelectedTBL_KSV_ORDER_MST1([]);
        setFlagSelectModeTBL_KSV_ORDER_MST(false);
        setFlagSelectModeTBL_KSV_ORDER_MST1(false);
    };

    // Support Area

    return (
        <div className="af-div-main">
            <div
                className="af-div-first"
                style={{ width: "123rem", height: "9rem" }}
            >
                <span className="af-span-3-0" style={{ width: "18rem" }}>
                    <p className="af-span-p" style={{ width: "5rem" }}>Factory</p>
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
                </span>
                <span className="af-span-3-0" style={{ width: "28rem" }}>
                    <p className="af-span-p" style={{ width: "7rem" }}>Period</p>
                    <div className="af-span-div" style={{ width: "9rem" }}>
                        <Dropdown
                            filter
                            style={{ width: "9rem" }}
                            id="id_S_DATE"
                            value={dataQRY_KSV_ORDER_PLAN_S_DATE}
                            onChange={(e) =>
                                onDropdownChangeQRY_KSV_ORDER_PLAN_S_DATE(
                                    e,
                                    "S_DATE",
                                )
                            }
                            options={datasQRY_KSV_ORDER_PLAN_S_DATE}
                            optionLabel="CD_NAME"
                            placeholder=""
                            editable
                        ></Dropdown>
                    </div>
                    <p className="af-span-p" style={{ width: "1rem" }}>~</p>
                    <div className="af-span-div" style={{ width: "9rem" }}>
                        <Dropdown
                            filter
                            style={{ width: "9rem" }}
                            id="id_E_DATE"
                            value={dataQRY_KSV_ORDER_PLAN_E_DATE}
                            onChange={(e) =>
                                onDropdownChangeQRY_KSV_ORDER_PLAN_E_DATE(
                                    e,
                                    "E_DATE",
                                )
                            }
                            options={datasQRY_KSV_ORDER_PLAN_E_DATE}
                            optionLabel="CD_NAME"
                            placeholder=""
                            editable
                        ></Dropdown>
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "18rem" }}>
                    <p className="af-span-p" style={{ width: "5rem" }}>Charger</p>
                    <div className="af-span-div" style={{ width: "12rem" }}>
                        <Dropdown
                            filter
                            style={{ width: "12rem" }}
                            id="id_USER_CD"
                            value={dataQRY_KSV_ORDER_PLAN_USER_CD}
                            onChange={(e) =>
                                onDropdownChangeQRY_KSV_ORDER_PLAN_USER_CD(
                                    e,
                                    "USER_CD",
                                )
                            }
                            options={datasQRY_KSV_ORDER_PLAN_USER_CD}
                            optionLabel="USER_NAME"
                            placeholder=""
                            editable
                        ></Dropdown>
                    </div>
                </span>

                <span className="af-span-3" style={{ width: "18rem" }}>
                    <p className="af-span-p" style={{ width: "5rem" }}>Team</p>
                    <div className="af-span-div" style={{ width: "12rem" }}>
                        <Dropdown
                            filter
                            style={{ width: "12rem" }}
                            id="id_TEAM_CD"
                            value={dataQRY_KSV_ORDER_PLAN_TEAM_CD}
                            onChange={(e) =>
                                onDropdownChangeQRY_KSV_ORDER_PLAN_TEAM_CD(
                                    e,
                                    "TEAM_CD",
                                )
                            }
                            options={datasQRY_KSV_ORDER_PLAN_TEAM_CD}
                            optionLabel="CD_NAME"
                            placeholder=""
                            editable
                        ></Dropdown>
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "28rem" }}>
                    <p className="af-span-p" style={{ width: "7rem" }}>Buyer#</p>
                    <div className="af-span-div" style={{ width: "20rem" }}>
                        <Dropdown
                            filter
                            style={{ width: "20rem" }}
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
                        ></Dropdown>
                    </div>
                </span>

                <span className="af-span-3" style={{ width: "11rem" }}>
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
                </span>
                <span className="af-span-3" style={{ width: "42rem" }}>
                    <div className="af-span-div-btn" style={{ width: "10rem" }}>
                        <Button
                            label="Reset"
                            style={{ width: "10rem" }}
                            className="p-button-text"
                            onClick={blankFn}
                        />
                    </div>
                </span>
                <span
                    className="af-span-3"
                    style={{ maxWidth: "123rem", flexBasis: "100%", marginLeft: '10px' }}
                >
                    <div
                        style={{
                            display: "flex",
                            flexWrap: "nowrap",
                            gap: "0.5rem",
                            alignItems: "center",
                            overflowX: "auto",
                            paddingTop: "0.2rem",
                        }}
                    >
                        <Button
                            label="Report(Grand Total)"
                            style={{ width: "11rem", height: "1.7rem" }}
                            className="p-button-text green"
                            onClick={process_EXCEL_PRINT}
                        />
                        <Button
                            label="Report(Total)"
                            style={{ width: "11rem", height: "1.7rem" }}
                            className="p-button-text green"
                            onClick={process_EXCEL_PRINT_TOT}
                        />
                        <Button
                            label="Report(분기별)"
                            style={{ width: "11rem", height: "1.7rem" }}
                            className="p-button-text green"
                            onClick={process_EXCEL_PRINT_QUTER}
                        />
                        <Button
                            label="Report(NSR)"
                            style={{ width: "11rem", height: "1.7rem" }}
                            className="p-button-text green"
                            onClick={process_EXCEL_PRINT_NSR}
                        />
                        <Button
                            label="Report(Exclude Glove)"
                            style={{ width: "11rem", height: "1.7rem" }}
                            className="p-button-text green"
                            onClick={process_EXCEL_PRINT_EXCL_GLOVE}
                        />
                        <Button
                            label="Report(Excl. G-N)"
                            style={{ width: "11rem", height: "1.7rem" }}
                            className="p-button-text green"
                            onClick={process_EXCEL_PRINT_EXCL_G_N}
                        />
                        <Button
                            label="Report(Exclude NSR)"
                            style={{ width: "11rem", height: "1.7rem" }}
                            className="p-button-text green"
                            onClick={process_EXCEL_PRINT_EXCL_NSR}
                        />
                        <Button
                            label="Report(Tent)"
                            style={{ width: "11rem", height: "1.7rem" }}
                            className="p-button-text green"
                            onClick={process_EXCEL_PRINT_TENT}
                        />
                        <Button
                            label="Report(Glove)"
                            style={{ width: "11rem", height: "1.7rem" }}
                            className="p-button-text green"
                            onClick={process_EXCEL_PRINT_GLOVE}
                        />
                        <Button
                            label="Report(Down)"
                            style={{ width: "11rem", height: "1.7rem" }}
                            className="p-button-text green"
                            onClick={process_EXCEL_PRINT_DOWN}
                        />
                        <Button
                            label="Excel"
                            style={{ width: "11rem", height: "1.7rem" }}
                            className="p-button-text green"
                            onClick={exportEXCEL}
                        />
                    </div>
                </span>
            </div>
            <div
                className="af-div-first"
                style={{ width: "123rem", height: "26.3rem", marginTop: "-1.5rem" }}
            >
                <AFDataTable preventUnrelatedRerender
                    ref={dt_TBL_KSV_ORDER_MST}
                    size="small"
                    value={datasTBL_KSV_ORDER_MST}
                    loading={loadingTBL_KSV_ORDER_MST}
                    tableStyle={{ tableLayout: "fixed" }}
                    resizableColumns
                    columnResizeMode="expand"
                    showGridlines
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
                    scrollHeight="287px"
                >
                    <AFColumn selectionMode="single" field="__checkbox__" reorderable={false} headerStyle={{ width: "5px" }} style={{ width: "5px" }} ></AFColumn>
                    <AFColumn field="USER_NAME" headerClassName="t-header" header="Charge" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="BUYER_NAME" headerClassName="t-header" header="Buyer" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="COLLECTION" headerClassName="t-header" header="Collection" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="TOTAL_QTY" headerClassName="t-header" header="Total Qty" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.TOTAL_QTY, 0) } ></AFColumn>
                    <AFColumn field="TOTAL_AMT" headerClassName="t-header" header="Total Amt" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.TOTAL_AMT, 2) } ></AFColumn>
                    <AFColumn field="CURR_CD" headerClassName="t-header" header="Curr" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="LINE_1_QTY" headerClassName="t-header" header="1-Qty" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.LINE_1_QTY, 0) } ></AFColumn>
                    <AFColumn field="LINE_1_AMT" headerClassName="t-header" header="1-Amt" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.LINE_1_AMT, 2) } ></AFColumn>
                    <AFColumn field="LINE_G_QTY" headerClassName="t-header" header="G-Qty" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.LINE_G_QTY, 0) } ></AFColumn>
                    <AFColumn field="LINE_G_AMT" headerClassName="t-header" header="G-Amt" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.LINE_G_AMT, 2) } ></AFColumn>
                    <AFColumn field="LINE_S_QTY" headerClassName="t-header" header="S-Qty" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.LINE_S_QTY, 0) } ></AFColumn>
                    <AFColumn field="LINE_S_AMT" headerClassName="t-header" header="S-Amt" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.LINE_S_AMT, 2) } ></AFColumn>
                    <AFColumn field="LINE_3_QTY" headerClassName="t-header" header="3-Qty" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.LINE_3_QTY, 0) } ></AFColumn>
                    <AFColumn field="LINE_3_AMT" headerClassName="t-header" header="3-Amt" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.LINE_3_AMT, 2) } ></AFColumn>
                    <AFColumn field="LINE_D_QTY" headerClassName="t-header" header="D-Qty" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.LINE_D_QTY, 0) } ></AFColumn>
                    <AFColumn field="LINE_D_AMT" headerClassName="t-header" header="D-Amt" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.LINE_D_AMT, 2) } ></AFColumn>
                    <AFColumn field="LINE_W_QTY" headerClassName="t-header" header="W-Qty" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.LINE_W_QTY, 0) } ></AFColumn>
                    <AFColumn field="LINE_W_AMT" headerClassName="t-header" header="W-Amt" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.LINE_W_AMT, 2) } ></AFColumn>
                </AFDataTable>
            </div>

            <div
                className="af-div-first"
                style={{ width: "123rem", height: "25rem" }}
            >
                <AFDataTable preventUnrelatedRerender
                    ref={dt_TBL_KSV_ORDER_MST1}
                    size="small"
                    value={datasTBL_KSV_ORDER_MST1}
                    tableStyle={{ tableLayout: "fixed" }}
                    resizableColumns
                    columnResizeMode="expand"
                    showGridlines
                    selection={selectedTBL_KSV_ORDER_MST1}
                    onSelectionChange={(e) => {
                        setFlagSelectModeTBL_KSV_ORDER_MST1(true);
                        setSelectedTBL_KSV_ORDER_MST1(e.value);
                        console.log(
                            "selected length:" +
                                selectedTBL_KSV_ORDER_MST1.length,
                        );
                        onRowClick1TBL_KSV_ORDER_MST1(e.value);
                    }}
                    onRowClick={onRowClickTBL_KSV_ORDER_MST1}
                    dataKey="id"
                    className="datatable-responsive"
                    virtualScrollerOptions={{ itemSize: 20 }}
                    emptyMessage=" "
                    //header={headerTBL_KSV_ORDER_MST1}
                    responsiveLayout="scroll"
                    scrollable
                    scrollHeight="25rem"
                >
                    <AFColumn selectionMode="single" field="__checkbox__" reorderable={false} headerStyle={{ width: "5px" }} style={{ width: "5px" }} ></AFColumn>
                    <AFColumn field="COLLECTION" headerClassName="t-header" header="Collection" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    {dynamicColumnsTBL_KSV_ORDER_MST1_COLS}
                </AFDataTable>
            </div>
            <Toast ref={toast} />
        </div>
    );
};

const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(S0217_SALES_MATL_PLAN_LIST, comparisonFn);
