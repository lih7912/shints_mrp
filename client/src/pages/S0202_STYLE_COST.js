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
import { ServiceS0202_STYLE_COST } from "../service/service_biz/ServiceS0202_STYLE_COST";

//import './page_common.scss';

const emptyKCD_CODE = {
    id: 0,
    CD_GROUP: "",
    CD_CODE: "",
    CD_NAME: "",
    CD_FLAG: "",
};

const emptyQRY_KCD_STYLE = {
    STYLE_NAME: "",
    STYLE_CD: "",
    BUYER_CD: "",
};

const emptyTBL_KCD_STYLE = {
    id: 0,
    STYLE_NAME: "",
    STYLE_CD: "",
};

const emptyTBL_KSV_PROD_MST = {
    id: 0,
    PROD_TYPE_NAME: "",
    COLOR: "",
    COLLECTION: "",
    PROD_UNIT: "",
    PROD_CD: "",
    PROD_TYPE: "",
};

const emptyEDT_STYLE_COST = {
    QTY: "",
    USE_SIZE: "",
    IS_PRICE: "1",
    STYLE_NAME: "",
    STYLE_CD: "",
    SIZE_GROUP: "",
};

const S0202_STYLE_COST = () => {
    const serviceLibRef = useRef(null);
    if (!serviceLibRef.current) {
        serviceLibRef.current = new ServiceLib();
        serviceLibRef.current.loginConfirm();
    }
    const serviceLib = serviceLibRef.current;
    const serviceS0202_STYLE_COSTRef = useRef(null);
    if (!serviceS0202_STYLE_COSTRef.current) serviceS0202_STYLE_COSTRef.current = new ServiceS0202_STYLE_COST();
    const serviceS0202_STYLE_COST = serviceS0202_STYLE_COSTRef.current;

    const toast = useRef(null);

    const [loading, setLoading] = useState(false);
    const [fileUrl, setFileUrl] = useState("");
    const [fileName, setFileName] = useState("");

    /* splitter 관련 */
    const [styleVal, setStyleVal] = useState({ width: "65vw" });

    const search_SIZE_GROUP = (argData) => {
        var tInObj = {};
        tInObj.BUYER_CD = argData;
        serviceS0202_STYLE_COST
            .mgrQuery_SIZE_GROUP_BY_BUYER(tInObj)
            .then((data) => {
                if (typeof data.graphQLErrors === "undefined") {
                    if (data.length > 0) {
                        setDatasEDT_STYLE_COST_SIZE_GROUP(data);
                        setDataEDT_STYLE_COST_SIZE_GROUP(data[0]);
                    }
                } else {
                }
            });
    };

    const search_REPORT_1 = () => {
        if (selectedTBL_KCD_STYLE === null) return;

        if (selectedTBL_KSV_PROD_MST.length <= 0) {
            alert("컬러를 선택하세요.<br><br>Select color.");
            return;
        }

        if (dataEDT_STYLE_COST.QTY === "") {
            alert("수량 정보를 입력하세요.<br><br>Input the Qty.");
            return;
        }

        if (
            datasEDT_STYLE_COST_USE_SIZE.length > 0 &&
            dataEDT_STYLE_COST.USE_SIZE === ""
        ) {
            alert("Select the Use Size");
            return;
        }

        // var tData1 = { ...selectedTBL_KCD_STYLE };
        var tData1 = { ...selectedTBL_KCD_STYLE };
        // var tData2 = [ ...datasTBL_KSV_PROD_MST ];
        var tData2 = [...selectedTBL_KSV_PROD_MST];
        var tData3 = { ...dataEDT_STYLE_COST };

        tData3.STYLE_CD = tData1.STYLE_CD;
        tData3.STYLE_NAME = tData1.STYLE_NAME;

        var tIn2Array = [];

        tData2.forEach((col, i) => {
            var tObj = { ...col };
            var tWObj = {};
            tWObj.PROD_CD = tObj.PROD_CD;
            tWObj.COLOR = tObj.COLOR;
            tIn2Array.push(tWObj);
        });

        // setSelectedTBL_KCD_STYLE({});
        // setSelectedTBL_KSV_PROD_MST([]);

        setLoading(true);
        serviceS0202_STYLE_COST
            .mgrQuery_REPORT_1(tData3, tIn2Array)
            .then((data) => {
                setLoading(false);
                if (typeof data.graphQLErrors === "undefined") {
                    if (data.length > 0) {
                        if (data[0].CODE.includes("ERROR")) {
                            // var tStr = data.graphQLErrors[0].message;
                            console.log(
                                "ServiceNawooAll.mgrQueryTBL_KCD_STYLE()error => " +
                                    JSON.stringify(data.graphQLErrors),
                            );
                            toast.current.show({
                                severity: "success",
                                summary: "REPORT_1_QL_ERROR",
                                detail: JSON.stringify(data.graphQLErrors),
                                life: 3000,
                            });
                        } else {
                            console.log(
                                "ServiceNawooAll.mgrQueryTBL_KCD_STYLE() call => " +
                                    data[0].CODE,
                            );
                            toast.current.show({
                                severity: "success",
                                summary: "REPORT_1",
                                detail: data[0].CODE,
                                life: 3000,
                            });
                            console.log(data[0].CODE);
                            setFileName(data[0].CODE.split("?")[0].toString());
                            setFileUrl(data[0].CODE.split("?")[1].toString());

                            serviceLib.downloadFile(
                                data[0].CODE.split("?")[2].toString(),
                                data[0].CODE.split("?")[1].toString(),
                            );
                        }
                    }
                } else {
                    // var tStr = data.graphQLErrors[0].message;
                    console.log(
                        "ServiceNawooAll.mgrQueryTBL_KCD_STYLE()error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                    toast.current.show({
                        severity: "success",
                        summary: "REPORT_1_QL_ERROR",
                        detail: JSON.stringify(data.graphQLErrors),
                        life: 3000,
                    });
                }
            });

        // Service : NawooAll:mgrQueryTBL_KCD_STYLE
    };

    const search_REPORT_3 = () => {
        if (selectedTBL_KCD_STYLE === null) return;

        if (selectedTBL_KSV_PROD_MST.length <= 0) {
            alert("컬러를 선택하세요.<br><br>Select color.");
            return;
        }

        if (dataEDT_STYLE_COST.QTY === "") {
            alert("수량 정보를 입력하세요.<br><br>Input the Qty.");
            return;
        }
        if (
            datasEDT_STYLE_COST_USE_SIZE.length > 0 &&
            dataEDT_STYLE_COST.USE_SIZE === ""
        ) {
            alert("Select the Use Size");
            return;
        }
        if (
            datasEDT_STYLE_COST_SIZE_GROUP.length > 0 &&
            dataEDT_STYLE_COST.SIZE_GROUP === ""
        ) {
            alert(
                "사이즈 그룹 정보를 입력하세요.<br><br>Select the size group.",
            );
            return;
        }

        // var tData1 = { ...selectedTBL_KCD_STYLE };
        var tData1 = { ...selectedTBL_KCD_STYLE };
        // var tData2 = [ ...datasTBL_KSV_PROD_MST ];
        var tData2 = [...selectedTBL_KSV_PROD_MST];
        var tData3 = { ...dataEDT_STYLE_COST };

        tData3.STYLE_CD = tData1.STYLE_CD;
        tData3.STYLE_NAME = tData1.STYLE_NAME;

        var tIn2Array = [];

        tData2.forEach((col, i) => {
            var tObj = { ...col };
            var tWObj = {};
            tWObj.PROD_CD = tObj.PROD_CD;
            tWObj.COLOR = tObj.COLOR;
            tIn2Array.push(tWObj);
        });

        // setSelectedTBL_KCD_STYLE({});
        // setSelectedTBL_KSV_PROD_MST([]);

        setLoading(true);
        serviceS0202_STYLE_COST
            .mgrQuery_REPORT_3(tData3, tIn2Array)
            .then((data) => {
                setLoading(false);
                if (typeof data.graphQLErrors === "undefined") {
                    if (data.length > 0) {
                        if (data[0].CODE.includes("ERROR")) {
                            // var tStr = data.graphQLErrors[0].message;
                            console.log(
                                "ServiceNawooAll.mgrQueryTBL_KCD_STYLE()error => " +
                                    JSON.stringify(data.graphQLErrors),
                            );
                            toast.current.show({
                                severity: "success",
                                summary: "REPORT_1_QL_ERROR",
                                detail: JSON.stringify(data.graphQLErrors),
                                life: 3000,
                            });
                        } else {
                            console.log(
                                "ServiceNawooAll.mgrQueryTBL_KCD_STYLE() call => " +
                                    data[0].CODE,
                            );
                            toast.current.show({
                                severity: "success",
                                summary: "REPORT_1",
                                detail: data[0].CODE,
                                life: 3000,
                            });
                            console.log(data[0].CODE);
                            setFileName(data[0].CODE.split("?")[0].toString());
                            setFileUrl(data[0].CODE.split("?")[1].toString());

                            serviceLib.downloadFile(
                                data[0].CODE.split("?")[2].toString(),
                                data[0].CODE.split("?")[1].toString(),
                            );
                        }
                    }
                } else {
                    // var tStr = data.graphQLErrors[0].message;
                    console.log(
                        "ServiceNawooAll.mgrQueryTBL_KCD_STYLE()error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                    toast.current.show({
                        severity: "success",
                        summary: "REPORT_1_QL_ERROR",
                        detail: JSON.stringify(data.graphQLErrors),
                        life: 3000,
                    });
                }
            });

        // Service : NawooAll:mgrQueryTBL_KCD_STYLE
    };

    /* QRY KCD_STYLE*/
    const [dataQRY_KCD_STYLE, setDataQRY_KCD_STYLE] =
        useState(emptyQRY_KCD_STYLE);

    const onInputChangeQRY_KCD_STYLE_STYLE_NAME = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KCD_STYLE = { ...dataQRY_KCD_STYLE };

        let tTypeVal = _dataQRY_KCD_STYLE[`${name}`];
        if (typeof tTypeVal === "string") _dataQRY_KCD_STYLE[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KCD_STYLE[`${name}`] = parseInt(val);

        setDataQRY_KCD_STYLE(_dataQRY_KCD_STYLE);
    };

    const onInputChangeQRY_KCD_STYLE_BUYER_CD = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KCD_STYLE = { ...dataQRY_KCD_STYLE };

        let tTypeVal = _dataQRY_KCD_STYLE[`${name}`];
        if (typeof tTypeVal === "string") _dataQRY_KCD_STYLE[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KCD_STYLE[`${name}`] = parseInt(val);

        setDataQRY_KCD_STYLE(_dataQRY_KCD_STYLE);
    };

    const [datasQRY_KCD_STYLE_STYLE_CD, setDatasQRY_KCD_STYLE_STYLE_CD] =
        useState([]);
    const [dataQRY_KCD_STYLE_STYLE_CD, setDataQRY_KCD_STYLE_STYLE_CD] =
        useState({});

    const [datasQRY_KCD_STYLE_BUYER_CD, setDatasQRY_KCD_STYLE_BUYER_CD] =
        useState([]);
    const [dataQRY_KCD_STYLE_BUYER_CD, setDataQRY_KCD_STYLE_BUYER_CD] =
        useState({});

    /*TABLE_KCD_STYLE */
    // DEFINE DATAGRID : TBL_KCD_STYLE
    const [datasTBL_KCD_STYLE, setDatasTBL_KCD_STYLE] = useState([]);
    const dt_TBL_KCD_STYLE = useRef(null);
    const [dataTBL_KCD_STYLE, setDataTBL_KCD_STYLE] =
        useState(emptyTBL_KCD_STYLE);
    const [selectedTBL_KCD_STYLE, setSelectedTBL_KCD_STYLE] = useState({});
    const [flagSelectModeTBL_KCD_STYLE, setFlagSelectModeTBL_KCD_STYLE] =
        useState(false);

    // DATAGRID CODE : TBL_KCD_STYLE

    const onRowClick1TBL_KCD_STYLE = (argData0) => {
        if (argData0 === null) {
            setDatasTBL_KSV_PROD_MST([]);
            return;
        }

        var argData = {};

        if (typeof argData0.length !== "undefined") {
            argData = { ...argData0[0] };
        } else {
            argData = { ...argData0 };
        }

        let argTBL_KCD_STYLE = argData;

        setDataTBL_KCD_STYLE(argTBL_KCD_STYLE);

        // Effect
        var tObj = {};
        tObj.STYLE_CD = argData.STYLE_CD;

        setSelectedTBL_KSV_PROD_MST([]);

        serviceS0202_STYLE_COST.mgrQueryTBL_KSV_PROD_MST(tObj).then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                console.log(
                    "serviceS0202_STYLE_COST.mgrQueryTBL_KSV_PROD_MST call => " +
                        data.length,
                );
                setDatasTBL_KSV_PROD_MST(data);
            } else {
                console.log(
                    "serviceS0202_STYLE_COST.mgrQueryTBL_KSV_PROD_MST error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });

        serviceS0202_STYLE_COST.mgrQuery_STYLE_COST_CODE(tObj).then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                console.log(
                    "serviceS0202_STYLE_COST.mgrQuery_STYLE_COST_CODE call => " +
                        data.USE_SIZE.length,
                );

                let exceptALLelement = [...data.USE_SIZE];

                exceptALLelement.shift();

                setDatasEDT_STYLE_COST_USE_SIZE(exceptALLelement);
                setDataEDT_STYLE_COST_USE_SIZE(data.USE_SIZE[0]);
                if (exceptALLelement.length == 0) {
                    setDisabledUSE_SIZE(true);
                } else {
                    setDisabledUSE_SIZE(false);
                }
            } else {
                console.log(
                    "serviceS0202_STYLE_COST.mgrQuery_STYLE_COST_CODE error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });

        search_SIZE_GROUP(argData.BUYER_CD);
    };

    const onRowClickTBL_KCD_STYLE = (event) => {
        let argTBL_KCD_STYLE = event.data;
        if (flagSelectModeTBL_KCD_STYLE) return;

        // Service : NawooAll:mgrQueryTBL_KCD_STYLE
    };

    const search_LIST_1 = () => {
        // clearSelectedTBL_KCD_STYLE();
        setDatasTBL_KCD_STYLE([]);
        setSelectedTBL_KCD_STYLE([]);
        setDatasTBL_KSV_PROD_MST([]);
        setSelectedTBL_KSV_PROD_MST([]);

        setLoading(true);
        serviceS0202_STYLE_COST
            .mgrQueryTBL_KCD_STYLE(dataQRY_KCD_STYLE)
            .then((data) => {
                if (typeof data.graphQLErrors === "undefined") {
                    console.log(
                        "ServiceNawooAll.mgrQueryTBL_KCD_STYLE() call => " +
                            data.length,
                    );
                    setDatasTBL_KCD_STYLE(data);
                    setLoading(false);
                } else {
                    // var tStr = data.graphQLErrors[0].message;
                    console.log(
                        "ServiceNawooAll.mgrQueryTBL_KCD_STYLE()error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });

        // Service : NawooAll:mgrQueryTBL_KCD_STYLE
    };

    /**TABLE_KSV_PROD_MST */
    // DEFINE DATAGRID : TBL_KSV_PROD_MST
    const [datasTBL_KSV_PROD_MST, setDatasTBL_KSV_PROD_MST] = useState([]);
    const dt_TBL_KSV_PROD_MST = useRef(null);
    const [dataTBL_KSV_PROD_MST, setDataTBL_KSV_PROD_MST] = useState(
        emptyTBL_KSV_PROD_MST,
    );
    const [selectedTBL_KSV_PROD_MST, setSelectedTBL_KSV_PROD_MST] = useState(
        [],
    );
    const [flagSelectModeTBL_KSV_PROD_MST, setFlagSelectModeTBL_KSV_PROD_MST] =
        useState(false);

    // DATAGRID CODE : TBL_KSV_PROD_MST

    const onRowClick1TBL_KSV_PROD_MST = (argData0) => {
        if (argData0.length <= 0) return;

        var argData = { ...argData0[0] };
        let argTBL_KSV_PROD_MST = argData;

        setDataTBL_KSV_PROD_MST(argTBL_KSV_PROD_MST);
    };

    const onRowClickTBL_KSV_PROD_MST = (event) => {
        let argTBL_KSV_PROD_MST = event.data;
        if (flagSelectModeTBL_KSV_PROD_MST) return;

        // Service : NawooAll:mgrQueryTBL_KSV_PROD_MST
    };

    // const searchTBL_KSV_PROD_MST = () => {
    //     clearSelectedTBL_KSV_PROD_MST();

    //     serviceS0202_STYLE_COST.mgrQueryTBL_KSV_PROD_MST(dataQRY_KSV_PROD_MST).then(data => {
    //         if (typeof data.graphQLErrors === 'undefined') {
    //             console.log("ServiceNawooAll.mgrQueryTBL_KSV_PROD_MST() call => " + data.length);
    //             setDatasTBL_KSV_PROD_MST(data);
    //         } else {
    //             // var tStr = data.graphQLErrors[0].message;
    //             console.log("ServiceNawooAll.mgrQueryTBL_KSV_PROD_MST()error => " + JSON.stringify(data.graphQLErrors));
    //
    //         }
    //     });

    //     // Service : NawooAll:mgrQueryTBL_KSV_PROD_MST
    // }

    /**EDIT_STYLE_COST */
    const [disabledUSE_SIZE, setDisabledUSE_SIZE] = useState(false);

    const [datasEDT_STYLE_COST, setDatasEDT_STYLE_COST] = useState([]);
    const [dataEDT_STYLE_COST, setDataEDT_STYLE_COST] =
        useState(emptyEDT_STYLE_COST);

    const onInputChangeEDT_STYLE_COST_QTY = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_STYLE_COST = { ...dataEDT_STYLE_COST };

        let tTypeVal = _dataEDT_STYLE_COST[`${name}`];
        if (typeof tTypeVal === "string") _dataEDT_STYLE_COST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_STYLE_COST[`${name}`] = parseInt(val);

        setDataEDT_STYLE_COST(_dataEDT_STYLE_COST);
    };

    const [datasEDT_STYLE_COST_USE_SIZE, setDatasEDT_STYLE_COST_USE_SIZE] =
        useState([]);
    const [dataEDT_STYLE_COST_USE_SIZE, setDataEDT_STYLE_COST_USE_SIZE] =
        useState({});

    const onDropdownChangeEDT_STYLE_COST_USE_SIZE = (e, name) => {
        let val = (e.value && e.value.USE_SIZE) || "";

        let _dataEDT_STYLE_COST = { ...dataEDT_STYLE_COST };

        let tTypeVal = _dataEDT_STYLE_COST[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_STYLE_COST[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_STYLE_COST[`${name}`] = parseInt(val);
        }

        setDataEDT_STYLE_COST(_dataEDT_STYLE_COST);
        setDataEDT_STYLE_COST_USE_SIZE(e.value);
    };

    const [datasEDT_STYLE_COST_SIZE_GROUP, setDatasEDT_STYLE_COST_SIZE_GROUP] =
        useState([]);
    const [dataEDT_STYLE_COST_SIZE_GROUP, setDataEDT_STYLE_COST_SIZE_GROUP] =
        useState({});

    const onDropdownChangeEDT_STYLE_COST_SIZE_GROUP = (e, name) => {
        let val = (e.value && e.value.SIZE_GROUP) || "";

        let _dataEDT_STYLE_COST = { ...dataEDT_STYLE_COST };

        let tTypeVal = _dataEDT_STYLE_COST[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_STYLE_COST[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_STYLE_COST[`${name}`] = parseInt(val);
        }

        setDataEDT_STYLE_COST(_dataEDT_STYLE_COST);
        setDataEDT_STYLE_COST_SIZE_GROUP(e.value);
    };

    const onCheckboxChangeEDT_STYLE_COST_IS_PRICE = (e, name) => {
        let val = "";
        let _dataEDT_STYLE_COST = { ...dataEDT_STYLE_COST };
        if (e.checked) {
            val = "1";
        } else {
            val = "0";
        }
        _dataEDT_STYLE_COST[`${name}`] = val;
        setDataEDT_STYLE_COST(_dataEDT_STYLE_COST);
    };

    /**중복 선언으로 에러나서 주석 처리 해놓았습니다 */
    // const editEDT_STYLE_COST_SIZE = (argValue) => {
    //     let _dataEDT_STYLE_COST_SIZE = datasEDT_STYLE_COST_SIZE.filter(val => val.SIZE_MEMBER === argValue);
    //     setDataEDT_STYLE_COST_SIZE(_dataEDT_STYLE_COST_SIZE[0]);
    // }

    // const onDropdownChangeEDT_STYLE_COST_SIZE = (e, name) => {
    //     let val = (e.value && e.value.SIZE_MEMBER) || '';

    //     let _dataEDT_STYLE_COST = { ...dataEDT_STYLE_COST };

    //     let tTypeVal = _dataEDT_STYLE_COST[`${name}`];
    //     if (typeof tTypeVal === "string" && typeof val === "string") {
    //         _dataEDT_STYLE_COST[`${name}`] = String(val);
    //     }
    //     else if (typeof tTypeVal === "number" && typeof val === "string") {
    //         _dataEDT_STYLE_COST[`${name}`] = parseInt(val);
    //     }

    //     setDataEDT_STYLE_COST(_dataEDT_STYLE_COST);
    //     setDataEDT_STYLE_COST_SIZE(e.value);
    // }

    useEffect(() => {
        // Effect
        //처음 리스트는 필요가 없다고 함.
        // serviceS0202_STYLE_COST.mgrQueryTBL_KCD_STYLE(dataQRY_KCD_STYLE).then(data => {
        //   if (typeof data.graphQLErrors === 'undefined') {
        //     console.log("serviceS0202_STYLE_COST.mgrQueryTBL_KCD_STYLE call => " + data.length);
        //     console.log(data);
        //     setDatasTBL_KCD_STYLE(data);
        //   } else {
        //     console.log("serviceS0202_STYLE_COST.mgrQueryTBL_KCD_STYLE error => " + JSON.stringify(data.graphQLErrors));
        //
        //   }
        // });

        setLoading(true);

        serviceS0202_STYLE_COST
            .mgrQuery_STYLE_COST_CODE(dataQRY_KCD_STYLE)
            .then((data) => {
                if (typeof data.graphQLErrors === "undefined") {
                    // console.log("serviceS0202_STYLE_COST.mgrQuery_STYLE_COST_CODE call => " + data.USE_SIZE.length);
                    setDatasEDT_STYLE_COST_USE_SIZE(data.USE_SIZE);
                    setDataEDT_STYLE_COST_USE_SIZE(data.USE_SIZE[0]);
                    if (data.USE_SIZE.length <= 1) {
                        setDisabledUSE_SIZE(true);
                    } else {
                        setDisabledUSE_SIZE(false);
                    }

                    setDatasQRY_KCD_STYLE_BUYER_CD(data.BUYER_CD);
                    setDataQRY_KCD_STYLE_BUYER_CD(data.BUYER_CD[0]);

                    setLoading(false);
                } else {
                    console.log(
                        "serviceS0202_STYLE_COST.mgrQuery_STYLE_COST_CODE error => " +
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

    const onQryStyleNameKeyPress = (e) => {
        if (e.key === "Enter") {
            console.log("enter press here! ");

            setLoading(false);

            serviceS0202_STYLE_COST
                .mgrQuery_STYLE_CODE(dataQRY_KCD_STYLE)
                .then((data) => {
                    if (typeof data.graphQLErrors === "undefined") {
                        setDatasQRY_KCD_STYLE_STYLE_CD(data.STYLE_CD);
                        setDataQRY_KCD_STYLE_STYLE_CD(data.STYLE_CD[0]);

                        setLoading(false);
                    } else {
                        console.log(
                            "serviceS0202_STYLE_COST.mgrQuery_STYLE_COST_CODE error => " +
                                JSON.stringify(data.graphQLErrors),
                        );
                    }
                });
        }
    };

    return (
        <div className="af-div-main">
            <div
                className="af-div-first"
                style={{ width: "100%", height: "3rem" }}
            >
                <span className="af-span-3-0" style={{ width: "13rem" }}>
                    <p className="af-span-p" style={{ width: "7rem" }}>Buyer#</p>
                    <div className="af-span-div" style={{ width: "5rem" }}>
                        <InputText
                            style={{ width: "5rem" }}
                            id="id_STYLE_CD"
                            value={dataQRY_KCD_STYLE.BUYER_CD}
                            onChange={(e) =>
                                onInputChangeQRY_KCD_STYLE_BUYER_CD(
                                    e,
                                    "BUYER_CD",
                                )
                            }
                            onKeyPress={(e) => onQryStyleNameKeyPress(e)}
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "33rem" }}>
                    <p className="af-span-p" style={{ width: "7rem" }}>Style</p>
                    <div className="af-span-div" style={{ width: "25rem" }}>
                        <InputText
                            style={{ width: "25rem" }}
                            id="id_STYLE_CD"
                            value={dataQRY_KCD_STYLE.STYLE_NAME}
                            onChange={(e) =>
                                onInputChangeQRY_KCD_STYLE_STYLE_NAME(
                                    e,
                                    "STYLE_NAME",
                                )
                            }
                            onKeyPress={(e) => onQryStyleNameKeyPress(e)}
                        />
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
                            onClick={search_LIST_1}
                        />
                    </div>
                </span>
            </div>

            <div
                className="af-div-first"
                style={{ width: "50%", height: "85vh" }}
            >
                <AFDataTable preventUnrelatedRerender
                    ref={dt_TBL_KCD_STYLE}
                    size="small"
                    value={datasTBL_KCD_STYLE}
                    tableStyle={{ tableLayout: "fixed" }}
                    resizableColumns
                    columnResizeMode="expand"
                    showGridlines
                    metaKeySelection={false}
                    selection={selectedTBL_KCD_STYLE}
                    onSelectionChange={(e) => {
                        setSelectedTBL_KCD_STYLE(e.value);
                        onRowClick1TBL_KCD_STYLE(e.value);
                    }}
                    onRowClick={onRowClickTBL_KCD_STYLE}
                    dataKey="STYLE_CD"
                    className="datatable-responsive"
                    virtualScrollerOptions={{ itemSize: 20 }}
                    emptyMessage=" "
                    loading={loading}
                    //header={headerTBL_KCD_STYLE}
                    responsiveLayout="scroll"
                    scrollable
                    scrollHeight="flex"
                >
                    <AFColumn selectionMode="single" field="__checkbox__" reorderable={false} headerStyle={{ width: "5px" }} style={{ width: "5px" }} ></AFColumn>
                    <AFColumn field="STYLE_NAME" headerClassName="t-header" header="Style" style={{ width: "16rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="STYLE_CD" headerClassName="t-header" header="CD" style={{ width: "4rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="BUYER_CD" headerClassName="t-header" header="Buyer" style={{ width: "4rem", flexBasis: "auto" }} ></AFColumn>
                </AFDataTable>
            </div>

            <div
                className="af-div-first"
                style={{ width: "45%", height: "70vh", marginLeft: "10px" }}
            >
                <div
                    className="af-div-first"
                    style={{ width: "100%", height: "100%", marginTop: "0" }}
                >
                    <AFDataTable preventUnrelatedRerender
                        ref={dt_TBL_KSV_PROD_MST}
                        size="small"
                        value={datasTBL_KSV_PROD_MST}
                        metaKeySelection={false}
                        tableStyle={{ tableLayout: "fixed" }}
                        resizableColumns
                        columnResizeMode="expand"
                        showGridlines
                        selectionMode="checkbox"
                        selection={selectedTBL_KSV_PROD_MST}
                        onSelectionChange={(e) => {
                            setSelectedTBL_KSV_PROD_MST(e.value);
                            onRowClick1TBL_KSV_PROD_MST(e.value);
                        }}
                        onRowClick={onRowClickTBL_KSV_PROD_MST}
                        dataKey="COLOR"
                        className="datatable-responsive"
                        virtualScrollerOptions={{ itemSize: 20 }}
                        emptyMessage=" "
                        // header={headerTBL_KSV_PROD_MST}
                        responsiveLayout="scroll"
                        scrollable
                        scrollHeight="flex"
                    >
                        <AFColumn selectionMode="multiple" field="__checkbox__" reorderable={false} headerClassName="t-header" headerStyle={{ width: "1rem" }} ></AFColumn>
                        <AFColumn field="PROD_TYPE_NAME" headerClassName="t-header" header="Type" style={{ width: "5rem", flexBasis: "auto" }} ></AFColumn>
                        <AFColumn field="COLOR" headerClassName="t-header" header="Color" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>

                        <AFColumn field="PROD_UNIT" headerClassName="t-header" header="Unit" style={{ width: "6rem", flexBasis: "auto" }} ></AFColumn>
                        <AFColumn field="PROD_CD" headerClassName="t-header" header="CD" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                        <AFColumn field="PROD_TYPE" headerClassName="t-header" header="Type" style={{ width: "5rem", flexBasis: "auto" }} ></AFColumn>
                    </AFDataTable>
                </div>
                <div
                    className="af-div-second"
                    style={{
                        width: "100%",
                        paddingTop: "20px",
                        display: "flex",
                        flexDirection: "row",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "1rem",
                            alignSelf: "center",
                            width: "100%",
                        }}
                    >
                        {/* 수량 (QTY) + 체크박스 */}
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "0.5rem",
                                width: "100%",
                            }}
                        >
                            <p className="af-span-p" style={{ width: "10rem" }}>Qty</p>
                            <InputText
                                style={{ width: "20rem" }}
                                id="id_QTY"
                                value={dataEDT_STYLE_COST.QTY}
                                onChange={(e) =>
                                    onInputChangeEDT_STYLE_COST_QTY(e, "QTY")
                                }
                            />

                            <Checkbox
                                id="id_SINGAPORE_COMBINE"
                                checked={changeCheckBoxVal(
                                    dataEDT_STYLE_COST.IS_PRICE,
                                )}
                                onChange={(e) =>
                                    onCheckboxChangeEDT_STYLE_COST_IS_PRICE(
                                        e,
                                        "IS_PRICE",
                                    )
                                }
                            />

                            <p
                                className="af-span-p"
                                style={{ whiteSpace: "nowrap" }}
                            >Include Price</p>
                        </div>

                        {/* USE_SIZE 드롭다운 */}
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "0.5rem",
                                width: "100%",
                            }}
                        >
                            <p className="af-span-p red" style={{ width: "10rem" }} >*Use Size</p>
                            <Dropdown
                                id="id_SIZE"
                                disabled={disabledUSE_SIZE}
                                style={{ width: "20rem" }}
                                value={dataEDT_STYLE_COST_USE_SIZE}
                                onChange={(e) =>
                                    onDropdownChangeEDT_STYLE_COST_USE_SIZE(
                                        e,
                                        "USE_SIZE",
                                    )
                                }
                                options={datasEDT_STYLE_COST_USE_SIZE}
                                optionLabel="USE_SIZE_NAME"
                                placeholder=""
                            />
                        </div>

                        {/* SIZE_GROUP 드롭다운 */}
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "0.5rem",
                                width: "100%",
                            }}
                        >
                            <p className="af-span-p" style={{ width: "10rem" }}>Size Group</p>
                            <Dropdown
                                id="id_SIZE"
                                style={{ width: "calc(100% - 10rem)" }}
                                value={dataEDT_STYLE_COST_SIZE_GROUP}
                                onChange={(e) =>
                                    onDropdownChangeEDT_STYLE_COST_SIZE_GROUP(
                                        e,
                                        "SIZE_GROUP",
                                    )
                                }
                                options={datasEDT_STYLE_COST_SIZE_GROUP}
                                optionLabel="SIZE_MEMBER"
                                placeholder=""
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div
                className="af-div-first"
                style={{ width: "123rem", height: "3rem" }}
            >
                <span className="af-span-3-0" style={{ width: "11rem" }}>
                    <div className="af-span-div-btn" style={{ width: "10rem" }}>
                        <Button
                            style={{ width: "10rem" }}
                            label="Report"
                            className="p-button-text green"
                            onClick={search_REPORT_1}
                        />
                    </div>
                </span>

                <span className="af-span-3-0" style={{ width: "11rem" }}>
                    <div className="af-span-div-btn" style={{ width: "10rem" }}>
                        <Button
                            style={{ width: "10rem" }}
                            label="MRP List"
                            className="p-button-text green"
                            onClick={search_REPORT_3}
                        />
                    </div>
                </span>
            </div>
            <Toast ref={toast} />
        </div>
    );
};

const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(S0202_STYLE_COST, comparisonFn);
