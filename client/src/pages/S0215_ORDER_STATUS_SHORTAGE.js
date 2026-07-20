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
import { ServiceS0215_ORDER_STATUS_SHORTAGE } from "../service/service_biz/ServiceS0215_ORDER_STATUS_SHORTAGE";

// import './page_common.scss';

const emptyKCD_CODE = {
    id: 0,
    CD_GROUP: "",
    CD_CODE: "",
    CD_NAME: "",
    CD_FLAG: "",
};

const emptyQRY_KSV_ORDER_MST = {
    ALL_FLAG: "0",
    BVT_FLAG: "0",
    ETP_FLAG: "0",
    SHIP_DATE: "", // db
    TYPE: "", //db
    END_TYPE: "", //db

    TEAM: "", //db
    BUYER_CD: "", // left(ORDER_CD, 2)
    PO_CD: "", // PO_CD
    ORDER_CD: "", // ORDER_CD

    STS_COMMENT: "", // STS_COMMENT
    BVT_COMMENT: "", // BVT_COMMENT

    END_DATE: "",
};

const emptyTBL_KSV_ORDER_MST = {
    id: 0,
    PO_CD: "",
    ORDER_CD: "",
    STYLE_NAME: "",
    STYLE_CD: "",
    TOT_CNT: "",
    SHIP_CNT: "",
    BAL: "",
    AGREED_QTY1: "",
    AGREED_QTY2: "",
    AGREED_QTY3: "",
    SHIP_DATE: "",
    CONF: "",
    CONFIRM_AMT: "",
    U_PRICE: "",
    FC_PRICE: "",
    ORDER_STATUS: "",
    STS_REMARK: "",
    FACTORY_REMARK: "",
    CHARGED_SUP: "",
    CHARGED_BUYER: "",
    CHARGED_STS: "",
    REMARK: "",
    END_FLAG: "",
    END_DATE: "",
};

const S0215_ORDER_STATUS_SHORTAGE = () => {
    const serviceLibRef = useRef(null);
    if (!serviceLibRef.current) {
        serviceLibRef.current = new ServiceLib();
        serviceLibRef.current.loginConfirm();
    }
    const serviceLib = serviceLibRef.current;
    const serviceS0215_ORDER_STATUS_SHORTAGE =
        new ServiceS0215_ORDER_STATUS_SHORTAGE();

    const toast = useRef(null);

    /* splitter 관련 */
    const [styleVal, setStyleVal] = useState({ width: "65vw" });

    /* */
    const [isShints, setIsShints] = useState(true);
    const [isFactory, setIsFactory] = useState(true);
    const [isShintsEnd, setIsShintsEnd] = useState(true);

    /* */ 
    function getDateVal(argVal) {
        const tDate = argVal;
        const mm = String(tDate.getMonth() + 1).padStart(2, "0");
        const dd = String(tDate.getDate()).padStart(2, "0");
        const yyyy = String(tDate.getFullYear());
        return yyyy + mm + dd;
    }

    const onCalChange = (setter) => (e, name) => {
        const value = e?.value ? getDateVal(e.value) : "";
        setter((prev) => ({             
            ...prev,
            [name]: value,      
        })); 
    };

    function changeDateVal(argVal) {
        if (argVal === "") return argVal;
        if (typeof argVal !== "string") return null;

        const tYear = parseInt(argVal.substring(0, 4), 10);
        const tMon = parseInt(argVal.substring(4, 6), 10); 
        const tDay = parseInt(argVal.substring(6, 8), 10);

        return new Date(tYear, tMon - 1, tDay);
    }

    const process_RESET = () => {
        var tObj = { ...emptyQRY_KSV_ORDER_MST };
        tObj.SHIP_DATE = datasQRY_KSV_ORDER_MST_SHIP_DATE[0].CD_CODE;
        setDataQRY_KSV_ORDER_MST(tObj);
        setDataQRY_KSV_ORDER_MST_SHIP_DATE(datasQRY_KSV_ORDER_MST_SHIP_DATE[0]);
        setDataQRY_KSV_ORDER_MST_BUYER_CD(datasQRY_KSV_ORDER_MST_BUYER_CD[0]);
        setDataQRY_KSV_ORDER_MST_TEAM(datasQRY_KSV_ORDER_MST_TEAM[0]);
        setDataQRY_KSV_ORDER_MST_END_TYPE(datasQRY_KSV_ORDER_MST_END_TYPE[0]);
        setDataQRY_KSV_ORDER_MST_TYPE(datasQRY_KSV_ORDER_MST_TYPE[0]);
    };

    const search_LIST_1 = () => {
        var tObj = { ...dataQRY_KSV_ORDER_MST };

        setLoadingTBL_KSV_ORDER_MST(true);
        setDatasTBL_KSV_ORDER_MST([]);
        setSelectedTBL_KSV_ORDER_MST([]);
        serviceS0215_ORDER_STATUS_SHORTAGE
            .mgrQuery_LIST_1(tObj)
            .then((data) => {
                setLoadingTBL_KSV_ORDER_MST(false);
                if (typeof data.graphQLErrors === "undefined") {
                    console.log(data);
                    if (data.length > 0) {
                        var tArray = [];
                        data.forEach((col, i) => {
                            var tObj = { ...col };
                            tObj.id = i + 1;
                            if (
                                tObj.CONFIRM_USER === "" ||
                                tObj.CONFIRM_USER === null
                            )
                                tObj.CONFIRM_AMT = String(
                                    parseFloat(tObj.DIFF_CNT) *
                                        parseFloat(tObj.FC_PRICE),
                                );
                            tArray.push(tObj);
                        });
                        setDatasTBL_KSV_ORDER_MST(tArray);
                    }
                } else {
                    // var tStr = data.graphQLErrors[0].message;
                    console.log(
                        "ServiceNawooAll.mgrQueryTBL_KSV_ORDER_MST()error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });
    };

    const process_EXCEL_REPORT = () => {
        var tObj = { ...dataQRY_KSV_ORDER_MST };

        setLoadingTBL_KSV_ORDER_MST(true);
        setDatasTBL_KSV_ORDER_MST([]);
        setSelectedTBL_KSV_ORDER_MST([]);
        serviceS0215_ORDER_STATUS_SHORTAGE
            .mgrQuery_EXCEL_REPORT(tObj)
            .then((data) => {
                setLoadingTBL_KSV_ORDER_MST(false);
                if (typeof data.graphQLErrors === "undefined") {
                    if (data.length > 0) {
                        alert(data[0].CODE);
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

                            if (data[0].URL) {
                                serviceLib.downloadFile(
                                    data[0].URL,
                                    data[0].FILE_NAME || `${data.filename || "S0214"}.xlsx`,
                                );
                            }
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
    };

    const process_STS_END = () => {
        if (selectedTBL_KSV_ORDER_MST.length <= 0) return;

        var tObj0 = { ...dataQRY_KSV_ORDER_MST };

        var tArray = [];
        selectedTBL_KSV_ORDER_MST.forEach((col, i) => {
            var tObj = { ...col };
            if (typeof tObj.id !== "undefined") delete tObj.id;
            if (typeof tObj.__typename !== "undefined") delete tObj.__typename;
            if (tObj0.END_DATE) tObj.END_DATE = tObj0.END_DATE;
            tArray.push(tObj);
        });

        setLoadingTBL_KSV_ORDER_MST(true);
        serviceS0215_ORDER_STATUS_SHORTAGE
            .mgrUpdate_STS_END(tArray)
            .then((data) => {
                setLoadingTBL_KSV_ORDER_MST(false);
                if (typeof data.graphQLErrors === "undefined") {
                    if (data.length > 0) {
                        if (data[0].CODE.includes("SUCC")) {
                            alert(data[0].CODE);

                            search_LIST_1();
                        } else {
                            alert(data[0].CODE);
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
    };

    const process_STS_SAVE = () => {
        if (selectedTBL_KSV_ORDER_MST.length <= 0) return;

        var tArray = [];
        var tCheck = 0;
        var tCheckStr = '';
        selectedTBL_KSV_ORDER_MST.forEach((col, i) => {
            var tObj = { ...col };
            if (typeof tObj.id !== "undefined") delete tObj.id;
            if (typeof tObj.__typename !== "undefined") delete tObj.__typename;

            if (!tObj.VMD_QTY) tObj.VMT_QTY = '0';
            if (!tObj.VMD_SUB_QTY) tObj.VMD_SUB_QTY = '0';
            if (!tObj.SUP_QTY) tObj.SUP_QTY = '0';
            if (!tObj.BUYER_QTY) tObj.BUYER_QTY = '0';
            if (!tObj.STS_QTY) tObj.STS_QTY = '0';

            tArray.push(tObj);

            var tDiff = parseFloat(tObj.DIFF_CNT); 
            var tVmdQty = parseFloat(tObj.VMD_QTY); 
            var tVmdSubQty = parseFloat(tObj.VMD_SUB_QTY); 
            var tSupQty = parseFloat(tObj.SUP_QTY); 
            var tBuyerQty = parseFloat(tObj.BUYER_QTY); 
            var tStsQty = parseFloat(tObj.STS_QTY); 

            if (tDiff !== (tVmdQty + tVmdSubQty+ tSupQty + tBuyerQty + tStsQty)) {
                tCheck = 1;
                tCheckStr = `${tDiff} === ${tVmdQty} + ${tVmdSubQty}+ ${tSupQty} + ${tBuyerQty} + ${tStsQty}`;
            }
        });
        if (tCheck > 0) {
            alert (`Bal Qty의 합계가 맞지 않습니다. 확인해 주세요: ${tCheckStr}`)
            return;
        }

        setLoadingTBL_KSV_ORDER_MST(true);
        serviceS0215_ORDER_STATUS_SHORTAGE
            .mgrInsert_STS_SAVE(tArray)
            .then((data) => {
                setLoadingTBL_KSV_ORDER_MST(false);
                if (typeof data.graphQLErrors === "undefined") {
                    if (data.length > 0) {
                        if (data[0].CODE.includes("SUCC")) {
                            alert(data[0].CODE);

                            search_LIST_1();
                        } else {
                            alert(data[0].CODE);
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
    };

    const process_STS_CANCEL = () => {
        if (selectedTBL_KSV_ORDER_MST.length <= 0) return;

        var tArray = [];
        selectedTBL_KSV_ORDER_MST.forEach((col, i) => {
            var tObj = { ...col };
            if (typeof tObj.id !== "undefined") delete tObj.id;
            if (typeof tObj.__typename !== "undefined") delete tObj.__typename;
            tArray.push(tObj);
        });

        setLoadingTBL_KSV_ORDER_MST(true);
        serviceS0215_ORDER_STATUS_SHORTAGE
            .mgrInsert_STS_CANCEL(tArray)
            .then((data) => {
                setLoadingTBL_KSV_ORDER_MST(false);
                if (typeof data.graphQLErrors === "undefined") {
                    if (data.length > 0) {
                        if (data[0].CODE.includes("SUCC")) {
                            alert(data[0].CODE);

                            search_LIST_1();
                        } else {
                            alert(data[0].CODE);
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
    };

    const process_BVT_SAVE = () => {
        if (selectedTBL_KSV_ORDER_MST.length <= 0) return;

        var tArray = [];
        selectedTBL_KSV_ORDER_MST.forEach((col, i) => {
            var tObj = { ...col };
            if (typeof tObj.id !== "undefined") delete tObj.id;
            if (typeof tObj.__typename !== "undefined") delete tObj.__typename;
            tArray.push(tObj);
        });

        setLoadingTBL_KSV_ORDER_MST(true);
        serviceS0215_ORDER_STATUS_SHORTAGE
            .mgrInsert_BVT_SAVE(tArray)
            .then((data) => {
                setLoadingTBL_KSV_ORDER_MST(false);
                if (typeof data.graphQLErrors === "undefined") {
                    if (data.length > 0) {
                        if (data[0].CODE.includes("SUCC")) {
                            alert(data[0].CODE);

                            search_LIST_1();
                        } else {
                            alert(data[0].CODE);
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
    };

    const process_INSERT_STS_COMMENT = () => {
        if (selectedTBL_KSV_ORDER_MST.length <= 0) return;
        setSelectedTBL_KSV_ORDER_MST([]);

        var tArray = [];
        var tArray2 = [];
        var tIdx = 0;
        for (tIdx = 0; tIdx < datasTBL_KSV_ORDER_MST.length; tIdx++) {
            var tObj = { ...datasTBL_KSV_ORDER_MST[tIdx] };
            var tFlag = 0;

            var tIdx1 = 0;
            for (tIdx1 = 0; tIdx1 < selectedTBL_KSV_ORDER_MST.length; tIdx1++) {
                var tObj1 = { ...selectedTBL_KSV_ORDER_MST[tIdx1] };
                if (tObj.ORDER_CD === tObj1.ORDER_CD) {
                    tFlag = 1;
                    break;
                }
            }

            if (tFlag === 1) {
                tObj.STS_COMMENT = dataQRY_KSV_ORDER_MST.STS_COMMENT;
                tArray2.push(tObj);
            }
            tArray.push(tObj);
        }

        setDatasTBL_KSV_ORDER_MST(tArray);
        setSelectedTBL_KSV_ORDER_MST(tArray2);
    };

    const process_INSERT_FAC_COMMENT = () => {
        if (selectedTBL_KSV_ORDER_MST.length <= 0) return;
        setSelectedTBL_KSV_ORDER_MST([]);

        var tArray = [];
        var tArray2 = [];
        var tIdx = 0;
        for (tIdx = 0; tIdx < datasTBL_KSV_ORDER_MST.length; tIdx++) {
            var tObj = { ...datasTBL_KSV_ORDER_MST[tIdx] };
            var tFlag = 0;

            var tIdx1 = 0;
            for (tIdx1 = 0; tIdx1 < selectedTBL_KSV_ORDER_MST.length; tIdx1++) {
                var tObj1 = { ...selectedTBL_KSV_ORDER_MST[tIdx1] };
                if (tObj.ORDER_CD === tObj1.ORDER_CD) {
                    tFlag = 1;
                    break;
                }
            }

            if (tFlag === 1) {
                tObj.BVT_COMMENT = dataQRY_KSV_ORDER_MST.BVT_COMMENT;
                tArray2.push(tObj);
            }
            tArray.push(tObj);
        }
        setDatasTBL_KSV_ORDER_MST(tArray);
        setSelectedTBL_KSV_ORDER_MST(tArray2);
    };

    /*QRY KSV_ORDER_MST */
    const [dataQRY_KSV_ORDER_MST, setDataQRY_KSV_ORDER_MST] = useState(
        emptyQRY_KSV_ORDER_MST,
    );

    const onCheckboxChangeQRY_KSV_ORDER_MST_ALL_FLAG = (e, name) => {
        let val = "";
        let _dataQRY_KSV_ORDER_MST = { ...dataQRY_KSV_ORDER_MST };
        if (e.checked) {
            val = "1";
            _dataQRY_KSV_ORDER_MST.BVT_FLAG = "0";
            _dataQRY_KSV_ORDER_MST.ETP_FLAG = "0";
        } else {
            val = "0";
        }
        _dataQRY_KSV_ORDER_MST[`${name}`] = val;
        setDataQRY_KSV_ORDER_MST(_dataQRY_KSV_ORDER_MST);
    };

    const onCheckboxChangeQRY_KSV_ORDER_MST_BVT_FLAG = (e, name) => {
        let val = "";
        let _dataQRY_KSV_ORDER_MST = { ...dataQRY_KSV_ORDER_MST };
        if (e.checked) {
            val = "1";
            _dataQRY_KSV_ORDER_MST.ALL_FLAG = "0";
            _dataQRY_KSV_ORDER_MST.ETP_FLAG = "0";
        } else {
            val = "0";
        }
        _dataQRY_KSV_ORDER_MST[`${name}`] = val;
        setDataQRY_KSV_ORDER_MST(_dataQRY_KSV_ORDER_MST);
    };

    const onCheckboxChangeQRY_KSV_ORDER_MST_ETP_FLAG = (e, name) => {
        let val = "";
        let _dataQRY_KSV_ORDER_MST = { ...dataQRY_KSV_ORDER_MST };
        if (e.checked) {
            val = "1";
            _dataQRY_KSV_ORDER_MST.ALL_FLAG = "0";
            _dataQRY_KSV_ORDER_MST.BVT_FLAG = "0";
        } else {
            val = "0";
        }
        _dataQRY_KSV_ORDER_MST[`${name}`] = val;
        setDataQRY_KSV_ORDER_MST(_dataQRY_KSV_ORDER_MST);
    };

    const [
        datasQRY_KSV_ORDER_MST_SHIP_DATE,
        setDatasQRY_KSV_ORDER_MST_SHIP_DATE,
    ] = useState([]);
    const [
        dataQRY_KSV_ORDER_MST_SHIP_DATE,
        setDataQRY_KSV_ORDER_MST_SHIP_DATE,
    ] = useState({});

    const onDropdownChangeQRY_KSV_ORDER_MST_SHIP_DATE = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataQRY_KSV_ORDER_MST = { ...dataQRY_KSV_ORDER_MST };

        let tTypeVal = _dataQRY_KSV_ORDER_MST[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_ORDER_MST[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_ORDER_MST[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_ORDER_MST(_dataQRY_KSV_ORDER_MST);
        setDataQRY_KSV_ORDER_MST_SHIP_DATE(e.value);
    };

    const [datasQRY_KSV_ORDER_MST_TYPE, setDatasQRY_KSV_ORDER_MST_TYPE] =
        useState([]);
    const [dataQRY_KSV_ORDER_MST_TYPE, setDataQRY_KSV_ORDER_MST_TYPE] =
        useState({});

    const onDropdownChangeQRY_KSV_ORDER_MST_TYPE = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataQRY_KSV_ORDER_MST = { ...dataQRY_KSV_ORDER_MST };

        let tTypeVal = _dataQRY_KSV_ORDER_MST[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_ORDER_MST[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_ORDER_MST[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_ORDER_MST(_dataQRY_KSV_ORDER_MST);
        setDataQRY_KSV_ORDER_MST_TYPE(e.value);
    };

    const [
        datasQRY_KSV_ORDER_MST_END_TYPE,
        setDatasQRY_KSV_ORDER_MST_END_TYPE,
    ] = useState([]);
    const [dataQRY_KSV_ORDER_MST_END_TYPE, setDataQRY_KSV_ORDER_MST_END_TYPE] =
        useState({});

    const onDropdownChangeQRY_KSV_ORDER_MST_END_TYPE = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataQRY_KSV_ORDER_MST = { ...dataQRY_KSV_ORDER_MST };

        let tTypeVal = _dataQRY_KSV_ORDER_MST[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_ORDER_MST[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_ORDER_MST[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_ORDER_MST(_dataQRY_KSV_ORDER_MST);
        setDataQRY_KSV_ORDER_MST_END_TYPE(e.value);
    };

    const [datasQRY_KSV_ORDER_MST_TEAM, setDatasQRY_KSV_ORDER_MST_TEAM] =
        useState([]);
    const [dataQRY_KSV_ORDER_MST_TEAM, setDataQRY_KSV_ORDER_MST_TEAM] =
        useState({});

    const onDropdownChangeQRY_KSV_ORDER_MST_TEAM = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataQRY_KSV_ORDER_MST = { ...dataQRY_KSV_ORDER_MST };

        let tTypeVal = _dataQRY_KSV_ORDER_MST[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_ORDER_MST[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_ORDER_MST[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_ORDER_MST(_dataQRY_KSV_ORDER_MST);
        setDataQRY_KSV_ORDER_MST_TEAM(e.value);
    };

    const [
        datasQRY_KSV_ORDER_MST_BUYER_CD,
        setDatasQRY_KSV_ORDER_MST_BUYER_CD,
    ] = useState([]);
    const [dataQRY_KSV_ORDER_MST_BUYER_CD, setDataQRY_KSV_ORDER_MST_BUYER_CD] =
        useState({});

    const onInputChangeQRY_KSV_ORDER_MST_BUYER_CD = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_ORDER_MST = { ...dataQRY_KSV_ORDER_MST };

        let tTypeVal = _dataQRY_KSV_ORDER_MST[`${name}`];
        if (typeof tTypeVal === "string")
            _dataQRY_KSV_ORDER_MST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_ORDER_MST[`${name}`] = parseInt(val);

        setDataQRY_KSV_ORDER_MST(_dataQRY_KSV_ORDER_MST);
    };

    const onInputChangeQRY_KSV_ORDER_MST_PO_CD = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_ORDER_MST = { ...dataQRY_KSV_ORDER_MST };

        let tTypeVal = _dataQRY_KSV_ORDER_MST[`${name}`];
        if (typeof tTypeVal === "string")
            _dataQRY_KSV_ORDER_MST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_ORDER_MST[`${name}`] = parseInt(val);

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

    const onInputChangeQRY_KSV_ORDER_MST_STS_COMMENT = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_ORDER_MST = { ...dataQRY_KSV_ORDER_MST };

        let tTypeVal = _dataQRY_KSV_ORDER_MST[`${name}`];
        if (typeof tTypeVal === "string")
            _dataQRY_KSV_ORDER_MST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_ORDER_MST[`${name}`] = parseInt(val);

        setDataQRY_KSV_ORDER_MST(_dataQRY_KSV_ORDER_MST);
    };

    const onInputChangeQRY_KSV_ORDER_MST_BVT_COMMENT = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_ORDER_MST = { ...dataQRY_KSV_ORDER_MST };

        let tTypeVal = _dataQRY_KSV_ORDER_MST[`${name}`];
        if (typeof tTypeVal === "string")
            _dataQRY_KSV_ORDER_MST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_ORDER_MST[`${name}`] = parseInt(val);

        setDataQRY_KSV_ORDER_MST(_dataQRY_KSV_ORDER_MST);
    };

    /* TABLE KSV_ORDER_MST*/
    // DEFINE DATAGRID : TBL_KSV_ORDER_MST
    const [loadingTBL_KSV_ORDER_MST, setLoadingTBL_KSV_ORDER_MST] =
        useState(false);

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

    // DATAGRID CODE : TBL_KSV_ORDER_MST

    const onRowClick1TBL_KSV_ORDER_MST = (argData0) => {
        var argData = {};

        if (typeof argData0.length !== "undefined") {
            argData = argData0[argData0.length - 1];
        } else {
            argData = argData0;
        }

        let argTBL_KSV_ORDER_MST = argData;

        setDataTBL_KSV_ORDER_MST(argTBL_KSV_ORDER_MST);

        if (typeof argData === "undefined" || argData === null) {
        } else {
            var tObj = { ...dataQRY_KSV_ORDER_MST };
            tObj.STS_COMMENT = argData.STS_COMMENT;
            tObj.BVT_COMMENT = argData.BVT_COMMENT;
            setDataQRY_KSV_ORDER_MST(tObj);
        }
    };

    const onRowClickTBL_KSV_ORDER_MST = (event) => {
        // Service : NawooAll:mgrQueryTBL_KSV_ORDER_MST
    };

    const exportExcelTBL_KSV_ORDER_MST = () => {
        import("xlsx").then((xlsx) => {
            const worksheet = xlsx.utils.json_to_sheet(datasTBL_KSV_ORDER_MST);
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
                "오더 Over_Short목록",
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

    const onCellEditCompleteKSV_ORDER_MST = (e) => {
        let { rowData, newValue, field, originalEvent: event } = e;
        rowData[field] = String(newValue);
    };

    const cellEditorKSV_ORDER_MST = (options) => {
        return textEditor(options);
    };

    const bodyTemplate_BAL = (data) => {
        if (parseFloat(data.DIFF_CNT) < 0) {
            // return <p style={{ backgroundColor:'red', opacity:'0.1', color:'black'  }}>{data.MATL_CD}</p>;
            return <p style={{ color: "red" }}>{data.DIFF_CNT}</p>;
        } else {
            return <p>{data.DIFF_CNT}</p>;
        }
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
                keyfilter="int"
                value={options.value}
                onChange={(e) => onChangeTextEdit(e, options)}
                onFocus={handleFocus}
            />
        );
    };

    useEffect(() => {

        var tPart = serviceLib.getUserInfo().PART;
        var tUserId = serviceLib.getUserInfo().USER_ID;
        if (tPart === 'S06' || tPart === 'S03' ||tUserId === 'won21kr' || tUserId === 'kevin1' ) setIsShints(false);
        if (tPart === 'ES' || tPart === 'VS' || tUserId === 'won21kr' || tUserId === 'kevin1') setIsFactory(false);
        if (tUserId === 'won21kr' || tUserId === 'jhoen' || tUserId === 'kevin1') setIsShintsEnd(false);

        serviceS0215_ORDER_STATUS_SHORTAGE
            .mgrQueryTBL_KSV_ORDER_MST_CODE()
            .then((data) => {
                if (typeof data.graphQLErrors === "undefined") {
                    console.log(
                        "ServiceNawooAll.mgrQueryTBL_KSV_ORDER_MST() call => " +
                            data.BUYER_CD.length,
                    );

                    setDatasQRY_KSV_ORDER_MST_SHIP_DATE(data.SHIP_DATE);
                    setDataQRY_KSV_ORDER_MST_SHIP_DATE(data.SHIP_DATE[0]);

                    setDataQRY_KSV_ORDER_MST({
                        ...dataQRY_KSV_ORDER_MST,
                        SHIP_DATE: data.SHIP_DATE[0].CD_CODE,
                    });

                    setDatasQRY_KSV_ORDER_MST_BUYER_CD(data.BUYER_CD);
                    setDataQRY_KSV_ORDER_MST_BUYER_CD(data.BUYER_CD[0]);

                    setDatasQRY_KSV_ORDER_MST_TEAM(data.BUYER_TEAM);
                    setDataQRY_KSV_ORDER_MST_TEAM(data.BUYER_TEAM[0]);

                    setDatasQRY_KSV_ORDER_MST_END_TYPE(data.END_TYPE);
                    setDataQRY_KSV_ORDER_MST_END_TYPE(data.END_TYPE[0]);

                    setDatasQRY_KSV_ORDER_MST_TYPE(data.TYPE);
                    setDataQRY_KSV_ORDER_MST_TYPE(data.TYPE[0]);
                } else {
                    // var tStr = data.graphQLErrors[0].message;
                    console.log(
                        "ServiceNawooAll.mgrQueryTBL_KSV_ORDER_MST()error => " +
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

    return (
        <div className="af-div-main">
            <div
                className="af-div-first"
                style={{ width: "123rem", height: "12rem" }}
            >
                <span className="af-span-3-0" style={{ width: "8rem" }}>
                    <p className="af-span-p" style={{ width: "4rem" }}>All</p>
                    <div className="af-span-checkbox">
                        <Checkbox
                            id="id_IS_SAMPLE"
                            checked={changeCheckBoxVal(
                                dataQRY_KSV_ORDER_MST.ALL_FLAG,
                            )}
                            onChange={(e) =>
                                onCheckboxChangeQRY_KSV_ORDER_MST_ALL_FLAG(
                                    e,
                                    "ALL_FLAG",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "8rem" }}>
                    <p className="af-span-p" style={{ width: "4rem" }}>BVT</p>
                    <div className="af-span-checkbox">
                        <Checkbox
                            id="id_IS_SAMPLE"
                            checked={changeCheckBoxVal(
                                dataQRY_KSV_ORDER_MST.BVT_FLAG,
                            )}
                            onChange={(e) =>
                                onCheckboxChangeQRY_KSV_ORDER_MST_BVT_FLAG(
                                    e,
                                    "BVT_FLAG",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "8rem" }}>
                    <p className="af-span-p" style={{ width: "4rem" }}>ETP</p>
                    <div className="af-span-checkbox">
                        <Checkbox
                            id="id_IS_SAMPLE"
                            checked={changeCheckBoxVal(
                                dataQRY_KSV_ORDER_MST.ETP_FLAG,
                            )}
                            onChange={(e) =>
                                onCheckboxChangeQRY_KSV_ORDER_MST_ETP_FLAG(
                                    e,
                                    "ETP_FLAG",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "16rem" }}>
                    <p className="af-span-p" style={{ width: "6rem" }}>End Month</p>
                    <div className="af-span-div" style={{ width: "9rem" }}>
                        <Dropdown
                            id="id_SHIP_DATE"
                            style={{ width: "9rem" }}
                            value={dataQRY_KSV_ORDER_MST_SHIP_DATE}
                            onChange={(e) =>
                                onDropdownChangeQRY_KSV_ORDER_MST_SHIP_DATE(
                                    e,
                                    "SHIP_DATE",
                                )
                            }
                            options={datasQRY_KSV_ORDER_MST_SHIP_DATE}
                            optionLabel="CD_NAME"
                            placeholder=""
                        ></Dropdown>
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "16rem" }}>
                    <p className="af-span-p" style={{ width: "6rem" }}>Type</p>
                    <div className="af-span-div" style={{ width: "9rem" }}>
                        <Dropdown
                            id="id_SHIP_DATE"
                            style={{ width: "9rem" }}
                            value={dataQRY_KSV_ORDER_MST_TYPE}
                            onChange={(e) =>
                                onDropdownChangeQRY_KSV_ORDER_MST_TYPE(
                                    e,
                                    "TYPE",
                                )
                            }
                            options={datasQRY_KSV_ORDER_MST_TYPE}
                            optionLabel="CD_NAME"
                            placeholder=""
                        ></Dropdown>
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "16rem" }}>
                    <p className="af-span-p" style={{ width: "6rem" }}>End</p>
                    <div className="af-span-div" style={{ width: "9rem" }}>
                        <Dropdown
                            id="id_SHIP_DATE"
                            style={{ width: "9rem" }}
                            value={dataQRY_KSV_ORDER_MST_END_TYPE}
                            onChange={(e) =>
                                onDropdownChangeQRY_KSV_ORDER_MST_END_TYPE(
                                    e,
                                    "END_TYPE",
                                )
                            }
                            options={datasQRY_KSV_ORDER_MST_END_TYPE}
                            optionLabel="CD_NAME"
                            placeholder=""
                        ></Dropdown>
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "7rem" }}>
                    <div className="af-span-div-btn" style={{ width: "6rem" }}>
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
                            style={{ width: "6rem" }}
                            className="p-button-text"
                            onClick={search_LIST_1}
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "7rem" }}>
                    <div className="af-span-div-btn" style={{ width: "6rem" }}>
                        <Button
                            label="Reset"
                            style={{ width: "6rem" }}
                            className="p-button-text"
                            onClick={process_RESET}
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "7rem" }}>
                    <div className="af-span-div-btn" style={{ width: "6rem" }}>
                        <Button
                            label="Excel"
                            style={{ width: "6rem" }}
                            className="p-button-text green"
                            onClick={exportExcelTBL_KSV_ORDER_MST}
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "7rem" }}>
                    <div className="af-span-div-btn" style={{ width: "6rem" }}>
                        <Button
                            label="Report"
                            style={{ width: "6rem" }}
                            className="p-button-text green"
                            onClick={process_EXCEL_REPORT}
                        />
                    </div>
                </span>

                <span className="af-span-3" style={{ width: "25rem" }}>
                    <p className="af-span-p" style={{ width: "9rem" }}>Team</p>
                    <div className="af-span-div" style={{ width: "15rem" }}>
                        <Dropdown
                            id="id_SHIP_DATE"
                            style={{ width: "15rem" }}
                            value={dataQRY_KSV_ORDER_MST_TEAM}
                            onChange={(e) =>
                                onDropdownChangeQRY_KSV_ORDER_MST_TEAM(
                                    e,
                                    "TEAM",
                                )
                            }
                            options={datasQRY_KSV_ORDER_MST_TEAM}
                            optionLabel="CD_NAME"
                            placeholder=""
                        ></Dropdown>
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "16rem" }}>
                    <p className="af-span-p" style={{ width: "6rem" }}>Buyer#</p>
                    <div className="af-span-div" style={{ width: "9rem" }}>
                        <InputText
                            style={{ width: "9rem" }}
                            id="id_PO_CD"
                            value={dataQRY_KSV_ORDER_MST.BUYER_CD}
                            onChange={(e) =>
                                onInputChangeQRY_KSV_ORDER_MST_BUYER_CD(
                                    e,
                                    "BUYER_CD",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "16rem" }}>
                    <p className="af-span-p" style={{ width: "6rem" }}>PO#</p>
                    <div className="af-span-div" style={{ width: "9rem" }}>
                        <InputText
                            style={{ width: "9rem" }}
                            id="id_PO_CD"
                            value={dataQRY_KSV_ORDER_MST.PO_CD}
                            onChange={(e) =>
                                onInputChangeQRY_KSV_ORDER_MST_PO_CD(e, "PO_CD")
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "16rem" }}>
                    <p className="af-span-p" style={{ width: "6rem" }}>Order#</p>
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
                <span className="af-span-3" style={{ width: "14.5rem" }}>
                    <p className="af-span-p" style={{ width: "5rem" }}></p>
                    <div className="af-span-div" style={{ width: "9rem" }}>
                         <Calendar
                                showButtonBar
                                style={{ width: "9rem" }}
                                dateFormat="yy-mm-dd"
                                id="id_S_PO_DATE"
                                value={changeDateVal(
                                    dataQRY_KSV_ORDER_MST.END_DATE,
                                )}
                                onChange={(e) =>
                                    onCalChange(setDataQRY_KSV_ORDER_MST)(
                                        e,
                                        "END_DATE", 
                                    )
                                }
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "12rem" }}>
                    <div className="af-span-div-btn" style={{ width: "11rem" }}>
                        <Button
                            disabled={isShintsEnd}
                            label="SHINTS End"
                            style={{ width: "11rem" }}
                            className="p-button-text"
                            onClick={process_STS_END}
                        />
                    </div>
                </span>

                <span className="af-span-3" style={{ width: "59rem" }}>
                    <p className="af-span-p" style={{ width: "9rem" }}>Fac Comment</p>
                    <div className="af-span-div" style={{ width: "49rem" }}>
                        <InputText
                            style={{ width: "49rem" }}
                            id="id_BVT_COMMENT"
                            value={dataQRY_KSV_ORDER_MST.BVT_COMMENT}
                            onChange={(e) =>
                                onInputChangeQRY_KSV_ORDER_MST_BVT_COMMENT(
                                    e,
                                    "BVT_COMMENT",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "13rem" }}>
                    <div className="af-span-div-btn" style={{ width: "12rem" }}>
                        <Button
                            disabled={isFactory}
                            label="Factory Insert"
                            style={{ width: "12rem" }}
                            className="p-button-text"
                            onClick={process_INSERT_FAC_COMMENT}
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "48rem" }}>
                    <div className="af-span-div-btn" style={{ width: "12rem" }}>
                        <Button
                            disabled={isFactory}
                            label="Factory Save"
                            style={{ width: "12rem" }}
                            className="p-button-text"
                            onClick={process_BVT_SAVE}
                        />
                    </div>
                </span>

                <span className="af-span-3" style={{ width: "59rem" }}>
                    <p className="af-span-p" style={{ width: "9rem" }}>Sts Comment</p>
                    <div className="af-span-div" style={{ width: "49rem" }}>
                        <InputText
                            style={{ width: "49rem" }}
                            id="id_STS_COMMENT"
                            value={dataQRY_KSV_ORDER_MST.STS_COMMENT}
                            onChange={(e) =>
                                onInputChangeQRY_KSV_ORDER_MST_STS_COMMENT(
                                    e,
                                    "STS_COMMENT",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "13rem" }}>
                    <div className="af-span-div-btn" style={{ width: "12rem" }}>
                        <Button
                            disabled={isShints}
                            label="SHINTS Insert"
                            style={{ width: "12rem" }}
                            className="p-button-text"
                            onClick={process_INSERT_STS_COMMENT}
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "13rem" }}>
                    <div className="af-span-div-btn" style={{ width: "12rem" }}>
                        <Button
                            disabled={isShints}
                            label="SHINTS Save"
                            style={{ width: "12rem" }}
                            className="p-button-text"
                            onClick={process_STS_SAVE}
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "13rem" }}>
                    <div className="af-span-div-btn" style={{ width: "12rem" }}>
                        <Button
                            label="Save Cancel"
                            style={{ width: "12rem" }}
                            className="p-button-text"
                            onClick={process_STS_CANCEL}
                        />
                    </div>
                </span>
            </div>
            <div
                className="af-div-first"
                style={{ width: "123rem", height: "49rem" }}
            >
                <AFDataTable preventUnrelatedRerender
                    ref={dt_TBL_KSV_ORDER_MST}
                    editMode="cell"
                    size="small"
                    value={datasTBL_KSV_ORDER_MST}
                    tableStyle={{ tableLayout: "fixed" }}
                    loading={loadingTBL_KSV_ORDER_MST}
                    metaKeySelection={false}
                    showGridlines
                    selectionMode="multiple"
                    resizableColumns
                    columnResizeMode="expand"
                    selection={selectedTBL_KSV_ORDER_MST}
                    onSelectionChange={(e) => {
                        setSelectedTBL_KSV_ORDER_MST(e.value);
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
                    scrollHeight="534px"
                >
                    <AFColumn selectionMode="multiple" field="__checkbox__" reorderable={false} headerClassName="t-header" headerStyle={{ width: "1rem" }} ></AFColumn>
                    <AFColumn field="PO_CD" headerClassName="t-header" header="PO#" style={{ width: "8rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="ORDER_CD" headerClassName="t-header" header="Order#" style={{ width: "9rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="STYLE_NAME" headerClassName="t-header" header="Style" style={{ width: "20rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="ORDER_STATUS_NAME" headerClassName="t-header" header="Order Status" style={{ width: "4rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="ORDER_END_DATE" headerClassName="t-header" header="Order End Date" style={{ width: "4rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="MAX_SHIP_DATE" headerClassName="t-header" header="Ship Date" style={{ width: "6rem", flexBasis: "auto" }} body={(rowData) => serviceLib.dateFormat(rowData.MAX_SHIP_DATE) } ></AFColumn>
                    <AFColumn field="END_DATE" headerClassName="t-header" header="End Date" style={{ width: "6rem", flexBasis: "auto" }} body={(rowData) => serviceLib.dateFormat(rowData.END_DATE) } ></AFColumn>
                    <AFColumn field="USD_PRICE" headerClassName="t-header" header="U.Price($)" bodyClassName="col-right" style={{ width: "5rem", flexBasis: "auto" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.USD_PRICE, 2) } ></AFColumn>
                    <AFColumn field="FC_PRICE" headerClassName="t-header" header="CMPT($)" bodyClassName="col-right" style={{ width: "5rem", flexBasis: "auto" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.FC_PRICE, 2) } ></AFColumn>
                    <AFColumn field="TOT_CNT" headerClassName="t-header" header="Ord Qty" bodyClassName="col-right" style={{ width: "5rem", flexBasis: "auto" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.TOT_CNT) } ></AFColumn>
                    <AFColumn field="SHIP_CNT" headerClassName="t-header" header="Ship Qty" bodyClassName="col-right" style={{ width: "5rem", flexBasis: "auto" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.SHIP_CNT) } ></AFColumn>

                    <AFColumn field="DIFF_CNT" headerClassName="t-header" header="Bal Qty" bodyClassName="col-right" style={{ width: "5rem", flexBasis: "auto" }} bodyStyle={{ textAlign: "right" }} body={bodyTemplate_BAL} ></AFColumn>
                    <AFColumn field="VMD_QTY" headerClassName="t-header" header="Factory" headerStyle={{ color: "green" }} style={{ width: "5rem", flexBasis: "auto" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.VMD_QTY) } editor={(options) => cellEditorKSV_ORDER_MST(options)} onCellEditComplete={onCellEditCompleteKSV_ORDER_MST} ></AFColumn>
                    <AFColumn field="VMD_SUB_QTY" headerClassName="t-header" header="Sub-Fac" headerStyle={{ color: "green" }} style={{ width: "5rem", flexBasis: "auto" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.VMD_SUB_QTY) } editor={(options) => cellEditorKSV_ORDER_MST(options)} onCellEditComplete={onCellEditCompleteKSV_ORDER_MST} ></AFColumn>
                    <AFColumn field="CONFIRM_AMT" headerClassName="t-header" header="Amount($)" headerStyle={{ color: "green" }} style={{ width: "5rem", flexBasis: "auto" }} bodyStyle={{ textAlign: "right" }} editor={(options) => cellEditorKSV_ORDER_MST(options)} onCellEditComplete={onCellEditCompleteKSV_ORDER_MST} ></AFColumn>
                    <AFColumn field="CONFIRM_USER" headerClassName="t-header" header="Confirm" bodyClassName="col-right" style={{ width: "6rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="SUP_QTY" headerClassName="t-header" headerStyle={{ color: "green" }} header="Sup." style={{ width: "5rem", flexBasis: "auto" }} bodyStyle={{ textAlign: "right" }} editor={(options) => cellEditorKSV_ORDER_MST(options)} onCellEditComplete={onCellEditCompleteKSV_ORDER_MST} ></AFColumn>
                    <AFColumn field="BUYER_QTY" headerClassName="t-header" headerStyle={{ color: "green" }} header="Buyer" style={{ width: "5rem", flexBasis: "auto" }} bodyStyle={{ textAlign: "right" }} editor={(options) => cellEditorKSV_ORDER_MST(options)} onCellEditComplete={onCellEditCompleteKSV_ORDER_MST} ></AFColumn>
                    <AFColumn field="STS_QTY" headerClassName="t-header" headerStyle={{ color: "green" }} header="STS" style={{ width: "5rem", flexBasis: "auto" }} bodyStyle={{ textAlign: "right" }} editor={(options) => cellEditorKSV_ORDER_MST(options)} onCellEditComplete={onCellEditCompleteKSV_ORDER_MST} ></AFColumn>

                    <AFColumn field="BVT_COMMENT" headerClassName="t-header" header="Factory Comment" style={{ width: "20rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="STS_COMMENT" headerClassName="t-header" header="STS Comment" style={{ width: "20rem", flexBasis: "auto" }} ></AFColumn>
                </AFDataTable>
            </div>
            <Toast ref={toast} />
        </div>
    );
};

const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(S0215_ORDER_STATUS_SHORTAGE, comparisonFn);
