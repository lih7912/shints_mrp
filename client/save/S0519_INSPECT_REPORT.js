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
import { ProgressSpinner } from "primereact/progressspinner";

import axios from "axios";
import apiOption from "../assets/env_graphql";

import { ServiceLib } from "../service/service_lib/ServiceLib";
import { ServiceS0519_INSPECT_REPORT } from "../service/service_biz/ServiceS0519_INSPECT_REPORT";

import "./page_common.scss";

const S0519_INSPECT_REPORT = () => {
    let emptyKCD_CODE = {
        id: 0,
        CD_GROUP: "",
        CD_CODE: "",
        CD_NAME: "",
        CD_FLAG: "",
    };

    const serviceLib = new ServiceLib();
    serviceLib.loginConfirm();
    const serviceS0519_INSPECT_REPORT = new ServiceS0519_INSPECT_REPORT();

    const toast = useRef(null);

    // File
    const [fileObj, setFileObj] = useState({});
    const [dataUrlFile1, setDataUrlFile1] = useState("");
    const onFileUploadFile1 = (data) => {};

    /* progress */
    const [isProgress, setIsProgress] = useState(false);

    /* splitter 관련 */
    const [styleVal, setStyleVal] = useState({ width: "65vw" });
    const onCall = (e) => {
        const rVal = {};
        rVal.width = e.sizes[0] + "vw";
        setStyleVal(rVal);
        console.log(e);
    };

    // dialog
    const [urlIframe, setUrlIframe] = useState("");
    const [createDialog, setCreateDialog] = useState(false);
    const hideDialog = () => {
        setCreateDialog(false);
    };

    // Search

    // Search KSV_STOCK_MEM
    const search_LIST_1 = (argData) => {
        var tObj = {};
        if (typeof argData.STSOUT_CD !== "undefined") tObj = { ...argData };
        else tObj = { ...dataQRY_KSV_PO_MRP };

        /*
         var tInObj = {};
         tInObj.STSOUT_CD = tObj.STSOUT_CD;
         */

        setLoadingTBL_KSV_PO_MRP2(true);

        // 2
        serviceS0519_INSPECT_REPORT.mgrQuery_LIST_1(tObj).then((data) => {
            setLoadingTBL_KSV_PO_MRP2(false);
            if (typeof data.graphQLErrors === "undefined") {
                var tArray = data.map((col, i) => {
                    var tObj = { ...col };
                    tObj.id = i + 1;
                    tObj.BAL_QTY =
                        parseFloat(tObj.S_OUT_QTY) -
                        parseFloat(tObj.SHORTAGE_QTY) -
                        parseFloat(tObj.DEFECT_QTY) -
                        parseFloat(tObj.FACIN_QTY);
                    return tObj;
                });
                setDatasTBL_KSV_PO_MRP2(tArray);

                if (tArray.length > 0) {
                    var tEdit = { ...dataEDT_KSV_PO_MRP };
                    tEdit.FACIN_DATE = tArray[0].FACIN_DATE;
                    tEdit.LOCATION = tArray[0].LOCATION;
                    tEdit.FILE_NAME = tArray[0].FILE_NAME;
                    setDataEDT_KSV_PO_MRP(tEdit);
                }
            } else {
                console.log(
                    "mgrQuery_PO_CD error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });
    };

    const search_LIST_2 = (argData) => {
        var tObj = {};
        tObj.PU_CD = argData.PU_CD;

        setLoadingTBL_KSV_PO_MRP2(true);

        // 4_2
        serviceS0519_INSPECT_REPORT.mgrQuery_LIST_2(tObj).then((data) => {
            setLoadingTBL_KSV_PO_MRP2(false);
            if (typeof data.graphQLErrors === "undefined") {
                var tArray = data.map((col, i) => {
                    var tObj = { ...col };
                    tObj.id = i + 1;
                    return tObj;
                });
                setDatasTBL_KSV_PO_MRP2(tArray);
            } else {
                console.log(
                    "mgrQuery_PO_CD error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });
    };

    const process_DOWNLOAD_MANUAL = async () => {
        const anchor = document.createElement("a");
        anchor.href = `${apiOption.apiuri}/restapi/filedown_manual`;
        anchor.download = "Inspect Manual";
        anchor.click(); // anchor를 다운로드 링크로 만들고 강제로 클릭 이벤트 발생
        window.URL.revokeObjectURL(anchor.href);
    };

    const process_RESET = () => {
        setDataQRY_KSV_PO_MRP_STATUS_CD(datasQRY_KSV_PO_MRP_STATUS_CD[0]);

        var tRetDate = serviceLib.getCurrDate().substring(0, 8);
        var tQry = { ...emptyQRY_KSV_PO_MRP };
        tQry.S_ATA = tRetDate;
        tQry.E_ATA = tRetDate;
        tQry.S_UPLOAD_DATE = tRetDate;
        tQry.E_UPLOAD_DATE = tRetDate;
        setDataQRY_KSV_PO_MRP(tQry);

        setDatasTBL_KSV_PO_MRP2([]);
        setSelectedTBL_KSV_PO_MRP2([]);
    };

    const process_ALL_SELECT = () => {
        if (selectedTBL_KSV_PO_MRP2.length === datasTBL_KSV_PO_MRP2.length) {
            setSelectedTBL_KSV_PO_MRP2([]);
        } else {
            setSelectedTBL_KSV_PO_MRP2(datasTBL_KSV_PO_MRP2);
        }
    };

    const process_STSIN_DIVIDE = () => {
        if (selectedTBL_KSV_PO_MRP2.length <= 0) return;

        var tDivideQty = parseFloat(dataQRY_KSV_PO_MRP2.IN_QTY);

        var tArray = [...datasTBL_KSV_PO_MRP2];
        var tOneObj = { ...selectedTBL_KSV_PO_MRP2[0] };

        var tRetArray = [];
        var tIndex = 1;
        tArray.forEach((col, i) => {
            var tObj = { ...col };
            if (i + 1 === tOneObj.id) {
                var tObj1 = { ...tObj };

                tObj.id = tIndex;
                tIndex += 1;
                tObj.PO_QTY -= tDivideQty;
                tObj.BAL_QTY -= tDivideQty;
                tObj.SHIP_QTY -= tDivideQty;
                tObj.IN_QTY -= tDivideQty;
                tRetArray.push(tObj);

                tObj1.id = tIndex;
                tIndex += 1;
                tObj1.PO_QTY = 0;
                tObj1.BAL_QTY = 0;
                tObj1.SHIP_QTY = tDivideQty;
                tObj1.IN_QTY = tDivideQty;
                tRetArray.push(tObj1);
            } else {
                tObj.id = tIndex;
                tIndex += 1;
                tRetArray.push(tObj);
            }
        });

        // setSelectedTBL_KSV_PO_MRP2([]);
        setDatasTBL_KSV_PO_MRP2(tRetArray);
    };

    const process_INSERT_STSIN = () => {};

    const process_UPDATE_LOCATION = () => {
        var tFileObj = {};
        if (typeof fileObj.TITLE === "undefined") {
            /*
             alert('검사 완료된 File을 먼저 등록하세요');
             return;
             */
            tFileObj.TITLE = "";
        } else {
            tFileObj = { ...fileObj };
        }
        tFileObj.FILE_KEY = dataQRY_KSV_PO_MRP.STSOUT_CD;
        tFileObj.STSOUT_CD = dataQRY_KSV_PO_MRP.STSOUT_CD;

        var tObjs = [];
        selectedTBL_KSV_PO_MRP2.forEach((col, i) => {
            var tObj = { ...col };
            var tBalQty = parseFloat(tObj.BAL_QTY);
            // var tVal = parseFloat(tObj.FACIN_QTY) + parseFloat(tObj.BAL_QTY);
            // var tVal = parseFloat(tObj.FACIN_QTY);
            var tVal = parseFloat(tBalQty);
            tObj.FACIN_QTY = String(tVal);
            if (typeof tObj.__typename !== "undefined") delete tObj.__typename;
            if (typeof tObj.id !== "undefined") delete tObj.id;
            if (typeof tObj.BAL_QTY !== "undefined") delete tObj.BAL_QTY;
            tObj.FILE_NAME = fileObj.NAME;
            tObj.FILE_URL = fileObj.URL;
            tObj.FILE_OBJECT = fileObj.OBJECT_NAME;
            tObj.IN_DATE = dataEDT_KSV_PO_MRP.FACIN_DATE;
            tObj.LOCATION = dataEDT_KSV_PO_MRP.LOCATION;
            tObj.STSOUT_CD = "";
            tObjs.push(tObj);
            // tObj.STSOUT_CD = dataQRY_KSV_PO_MRP.STSOUT_CD;
            // if (tBalQty > 0) tObjs.push(tObj);
        });

        //setIsProgress(true);
        setLoadingTBL_KSV_PO_MRP2(true);
        serviceS0519_INSPECT_REPORT
            .mgrInsert_UPDATE_LOCATION(tObjs, tFileObj)
            .then((data) => {
                setIsProgress(false);
                setLoadingTBL_KSV_PO_MRP2(false);
                if (typeof data.graphQLErrors === "undefined") {
                    if (data.length > 0) {
                        alert(data[0].CODE);
                        setSelectedTBL_KSV_PO_MRP2([]);
                        search_LIST_1({});
                    }
                } else {
                    // console.log("mgrQuery_PO_CD error => " + JSON.stringify(data.graphQLErrors));
                    toast.current.show({
                        severity: "success",
                        summary: "Fail:Stock_in",
                        detail: "",
                        life: 3000,
                    });
                }
            });
    };

    const process_FACIN = () => {
        var tFileObj = {};
        if (typeof fileObj.TITLE === "undefined") {
            /*
             alert('검사 완료된 File을 먼저 등록하세요');
             return;
             */
            tFileObj.TITLE = "";
        } else {
            tFileObj = { ...fileObj };
        }
        tFileObj.FILE_KEY = dataQRY_KSV_PO_MRP.STSOUT_CD;
        tFileObj.STSOUT_CD = dataQRY_KSV_PO_MRP.STSOUT_CD;

        var tObjs = [];
        selectedTBL_KSV_PO_MRP2.forEach((col, i) => {
            var tObj = { ...col };
            var tBalQty = parseFloat(tObj.BAL_QTY);
            // var tVal = parseFloat(tObj.FACIN_QTY) + parseFloat(tObj.BAL_QTY);
            // var tVal = parseFloat(tObj.FACIN_QTY);
            var tVal = parseFloat(tBalQty);
            tObj.FACIN_QTY = String(tVal);
            if (typeof tObj.__typename !== "undefined") delete tObj.__typename;
            if (typeof tObj.id !== "undefined") delete tObj.id;
            if (typeof tObj.BAL_QTY !== "undefined") delete tObj.BAL_QTY;
            tObj.FILE_NAME = fileObj.NAME;
            tObj.FILE_URL = fileObj.URL;
            tObj.FILE_OBJECT = fileObj.OBJECT_NAME;
            tObj.IN_DATE = dataEDT_KSV_PO_MRP.FACIN_DATE;
            tObj.LOCATION = dataEDT_KSV_PO_MRP.LOCATION;
            tObj.STSOUT_CD = "";
            tObjs.push(tObj);
            // tObj.STSOUT_CD = dataQRY_KSV_PO_MRP.STSOUT_CD;
            // if (tBalQty > 0) tObjs.push(tObj);
        });

        //setIsProgress(true);
        setLoadingTBL_KSV_PO_MRP2(true);
        serviceS0519_INSPECT_REPORT
            .mgrInsert_FACIN(tObjs, tFileObj)
            .then((data) => {
                setIsProgress(false);
                setLoadingTBL_KSV_PO_MRP2(false);
                if (typeof data.graphQLErrors === "undefined") {
                    if (data.length > 0) {
                        alert(data[0].CODE);
                        setSelectedTBL_KSV_PO_MRP2([]);
                        search_LIST_1({});
                        setFileObj({});
                        var tEdtObj = { ...dataEDT_KSV_PO_MRP };
                        tEdtObj.FILE_NAME = "";
                        setDataEDT_KSV_PO_MRP(tEdtObj);
                    }
                } else {
                    // console.log("mgrQuery_PO_CD error => " + JSON.stringify(data.graphQLErrors));
                    toast.current.show({
                        severity: "success",
                        summary: "Fail:Stock_in",
                        detail: "",
                        life: 3000,
                    });
                }
            });
    };

    const process_DELETE_PU_MST = () => {
        if (selectedTBL_KSV_PO_MRP.length <= 0) return;

        var tObjs = selectedTBL_KSV_PO_MRP.map((col, i) => {
            var tObj = { ...col };
            if (typeof tObj.__typename !== "undefined") delete tObj.__typename;
            if (typeof tObj.id !== "undefined") delete tObj.id;
            return tObj;
        });

        var tInput = {};
        tInput.PU_CD = tObjs[0].PU_CD;

        serviceS0519_INSPECT_REPORT.mgrDelete_PU_MST(tInput).then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                console.log("mgrInsert_STOCK_IN call => " + data.length);
                toast.current.show({
                    severity: "success",
                    summary: "Success:Stock_in",
                    detail: data[0].CODE,
                    life: 3000,
                });

                setSelectedTBL_KSV_PO_MRP([]);
                // search_LIST_2();
                // search_LIST_1();

                // queryNew(tVendorCd);
            } else {
                console.log(
                    "mgrQuery_PO_CD error => " +
                        JSON.stringify(data.graphQLErrors),
                );
                toast.current.show({
                    severity: "success",
                    summary: "Fail:Stock_in",
                    detail: data[0].CODE,
                    life: 3000,
                });
            }
        });
    };

    /* QRY KSV_PO_MRP*/
    let emptyQRY_KSV_PO_MRP_bak = {
        STSOUT_CD: "",
        S_ATA: "",
        E_ATA: "",
        STATUS_CD: "0",
        BUYER_CD: "",
        USER_ID: "",
        PO_CD: "",
        VENDOR_CD: "",
        S_UPLOAD_DATE: "",
        E_UPLOAD_DATE: "",
    };

    let emptyQRY_KSV_PO_MRP = {
        BUYER_CD: "",
        PO_CD: "",
        VENDOR_CD: "",
        MATL_NAME: "",
        SPEC: "",
        COLOR: "",
        UNIT: "",
        STSOUT_CD: "",
    };

    const [dataQRY_KSV_PO_MRP, setDataQRY_KSV_PO_MRP] =
        useState(emptyQRY_KSV_PO_MRP);

    const onCalChangeQRY_KSV_PO_MRP_S_ATA = (e, name) => {
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

    const onCalChangeQRY_KSV_PO_MRP_E_ATA = (e, name) => {
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

    const [datasQRY_KSV_PO_MRP_STATUS_CD, setDatasQRY_KSV_PO_MRP_STATUS_CD] =
        useState([]);
    const [dataQRY_KSV_PO_MRP_STATUS_CD, setDataQRY_KSV_PO_MRP_STATUS_CD] =
        useState({});

    const editQRY_KSV_PO_MRP_STATUS_CD = (argValue) => {
        let _dataQRY_KSV_PO_MRP_STATUS_CD =
            datasQRY_KSV_PO_MRP_STATUS_CD.filter(
                (val) => val.CD_CODE === argValue,
            );
        setDataQRY_KSV_PO_MRP_STATUS_CD(_dataQRY_KSV_PO_MRP_STATUS_CD[0]);
    };

    const onDropdownChangeQRY_KSV_PO_MRP_STATUS_CD = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataQRY_KSV_PO_MRP = { ...dataQRY_KSV_PO_MRP };

        let tTypeVal = _dataQRY_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_PO_MRP[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_PO_MRP[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_PO_MRP(_dataQRY_KSV_PO_MRP);
        setDataQRY_KSV_PO_MRP_STATUS_CD(e.value);
    };

    const onInputChangeQRY_KSV_PO_MRP_BUYER_CD = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_PO_MRP = { ...dataQRY_KSV_PO_MRP };

        let tTypeVal = _dataQRY_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string") _dataQRY_KSV_PO_MRP[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_PO_MRP[`${name}`] = parseInt(val);

        setDataQRY_KSV_PO_MRP(_dataQRY_KSV_PO_MRP);
    };

    const onInputChangeQRY_KSV_PO_MRP_USER_ID = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_PO_MRP = { ...dataQRY_KSV_PO_MRP };

        let tTypeVal = _dataQRY_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string") _dataQRY_KSV_PO_MRP[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_PO_MRP[`${name}`] = parseInt(val);

        setDataQRY_KSV_PO_MRP(_dataQRY_KSV_PO_MRP);
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

    const onInputChangeQRY_KSV_PO_MRP_VENDOR_CD = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_PO_MRP = { ...dataQRY_KSV_PO_MRP };

        let tTypeVal = _dataQRY_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string") _dataQRY_KSV_PO_MRP[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_PO_MRP[`${name}`] = parseInt(val);

        setDataQRY_KSV_PO_MRP(_dataQRY_KSV_PO_MRP);
    };

    const onInputChangeQRY_KSV_PO_MRP_MATL_NAME = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_PO_MRP = { ...dataQRY_KSV_PO_MRP };

        let tTypeVal = _dataQRY_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string") _dataQRY_KSV_PO_MRP[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_PO_MRP[`${name}`] = parseInt(val);

        setDataQRY_KSV_PO_MRP(_dataQRY_KSV_PO_MRP);
    };

    const onInputChangeQRY_KSV_PO_MRP_SPEC = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_PO_MRP = { ...dataQRY_KSV_PO_MRP };

        let tTypeVal = _dataQRY_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string") _dataQRY_KSV_PO_MRP[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_PO_MRP[`${name}`] = parseInt(val);

        setDataQRY_KSV_PO_MRP(_dataQRY_KSV_PO_MRP);
    };

    const onInputChangeQRY_KSV_PO_MRP_COLOR = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_PO_MRP = { ...dataQRY_KSV_PO_MRP };

        let tTypeVal = _dataQRY_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string") _dataQRY_KSV_PO_MRP[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_PO_MRP[`${name}`] = parseInt(val);

        setDataQRY_KSV_PO_MRP(_dataQRY_KSV_PO_MRP);
    };

    const onInputChangeQRY_KSV_PO_MRP_UNIT = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_PO_MRP = { ...dataQRY_KSV_PO_MRP };

        let tTypeVal = _dataQRY_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string") _dataQRY_KSV_PO_MRP[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_PO_MRP[`${name}`] = parseInt(val);

        setDataQRY_KSV_PO_MRP(_dataQRY_KSV_PO_MRP);
    };

    const onCalChangeQRY_KSV_PO_MRP_S_UPLOAD_DATE = (e, name) => {
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

    const onCalChangeQRY_KSV_PO_MRP_E_UPLOAD_DATE = (e, name) => {
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

    /* QRY KSV_PO_MRP*/
    let emptyQRY_KSV_PO_MRP2 = {
        IN_QTY: "",
    };
    const [dataQRY_KSV_PO_MRP2, setDataQRY_KSV_PO_MRP2] =
        useState(emptyQRY_KSV_PO_MRP2);

    const onInputChangeQRY_KSV_PO_MRP2_IN_QTY = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_PO_MRP2 = { ...dataQRY_KSV_PO_MRP2 };

        let tTypeVal = _dataQRY_KSV_PO_MRP2[`${name}`];
        if (typeof tTypeVal === "string") _dataQRY_KSV_PO_MRP2[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_PO_MRP2[`${name}`] = parseInt(val);

        setDataQRY_KSV_PO_MRP2(_dataQRY_KSV_PO_MRP2);
    };

    /* QRY KSV_PO_MRP*/
    let emptyQRY_KSV_PO_MRP1 = {
        BUYER_CD: "",
        PO_CD: "",
        VENDOR_CD: "",
        MRP_DATE: "",
    };

    const [dataQRY_KSV_PO_MRP1, setDataQRY_KSV_PO_MRP1] =
        useState(emptyQRY_KSV_PO_MRP1);

    const [datasQRY_KSV_PO_MRP1_BUYER_CD, setDatasQRY_KSV_PO_MRP1_BUYER_CD] =
        useState([]);
    const [dataQRY_KSV_PO_MRP1_BUYER_CD, setDataQRY_KSV_PO_MRP1_BUYER_CD] =
        useState({});

    const editQRY_KSV_PO_MRP1_BUYER_CD = (argValue) => {
        let _dataQRY_KSV_PO_MRP1_BUYER_CD =
            datasQRY_KSV_PO_MRP1_BUYER_CD.filter(
                (val) => val.BUYER_CD === argValue,
            );
        setDataQRY_KSV_PO_MRP1_BUYER_CD(_dataQRY_KSV_PO_MRP1_BUYER_CD[0]);
    };

    const onDropdownChangeQRY_KSV_PO_MRP1_BUYER_CD = (e, name) => {
        let val = (e.value && e.value.BUYER_CD) || "";

        let _dataQRY_KSV_PO_MRP1 = { ...dataQRY_KSV_PO_MRP1 };

        let tTypeVal = _dataQRY_KSV_PO_MRP1[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_PO_MRP1[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_PO_MRP1[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_PO_MRP1(_dataQRY_KSV_PO_MRP1);
        setDataQRY_KSV_PO_MRP1_BUYER_CD(e.value);
    };

    const onInputChangeQRY_KSV_PO_MRP1_USER_ID = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_PO_MRP1 = { ...dataQRY_KSV_PO_MRP1 };

        let tTypeVal = _dataQRY_KSV_PO_MRP1[`${name}`];
        if (typeof tTypeVal === "string") _dataQRY_KSV_PO_MRP1[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_PO_MRP1[`${name}`] = parseInt(val);

        setDataQRY_KSV_PO_MRP1(_dataQRY_KSV_PO_MRP1);
    };

    const onInputChangeQRY_KSV_PO_MRP1_PO_CD = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_PO_MRP1 = { ...dataQRY_KSV_PO_MRP1 };

        let tTypeVal = _dataQRY_KSV_PO_MRP1[`${name}`];
        if (typeof tTypeVal === "string") _dataQRY_KSV_PO_MRP1[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_PO_MRP1[`${name}`] = parseInt(val);

        setDataQRY_KSV_PO_MRP1(_dataQRY_KSV_PO_MRP1);
    };

    const onInputChangeQRY_KSV_PO_MRP1_VENDOR_CD = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_PO_MRP1 = { ...dataQRY_KSV_PO_MRP1 };

        let tTypeVal = _dataQRY_KSV_PO_MRP1[`${name}`];
        if (typeof tTypeVal === "string") _dataQRY_KSV_PO_MRP1[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_PO_MRP1[`${name}`] = parseInt(val);

        setDataQRY_KSV_PO_MRP1(_dataQRY_KSV_PO_MRP1);
    };

    const onCalChangeQRY_KSV_PO_MRP1_MRP_DATE = (e, name) => {
        let val1 = e.value || "";
        let val = "";
        if (val1 === "") {
            val = "";
        } else {
            val = getDateVal(val1);
        }

        let _dataQRY_KSV_PO_MRP1 = { ...dataQRY_KSV_PO_MRP1 };
        _dataQRY_KSV_PO_MRP1[`${name}`] = val;
        setDataQRY_KSV_PO_MRP1(_dataQRY_KSV_PO_MRP1);
    };

    const [datasQRY_KSV_PO_MRP1_PO_CD, setDatasQRY_KSV_PO_MRP1_PO_CD] =
        useState([]);
    const [dataQRY_KSV_PO_MRP1_PO_CD, setDataQRY_KSV_PO_MRP1_PO_CD] = useState(
        {},
    );

    const editQRY_KSV_PO_MRP1_PO_CD = (argValue) => {
        let _dataQRY_KSV_PO_MRP1_PO_CD = datasQRY_KSV_PO_MRP1_PO_CD.filter(
            (val) => val.PO_CD === argValue,
        );
        setDataQRY_KSV_PO_MRP1_PO_CD(_dataQRY_KSV_PO_MRP1_PO_CD[0]);
    };

    const onDropdownChangeQRY_KSV_PO_MRP1_PO_CD = (e, name) => {
        let val = (e.value && e.value.PO_CD) || "";

        let _dataQRY_KSV_PO_MRP1 = { ...dataQRY_KSV_PO_MRP1 };

        let tTypeVal = _dataQRY_KSV_PO_MRP1[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_PO_MRP1[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_PO_MRP1[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_PO_MRP1(_dataQRY_KSV_PO_MRP1);
        setDataQRY_KSV_PO_MRP1_PO_CD(e.value);
    };

    const [datasQRY_KSV_PO_MRP1_PU_STATUS, setDatasQRY_KSV_PO_MRP1_PU_STATUS] =
        useState([]);
    const [dataQRY_KSV_PO_MRP1_PU_STATUS, setDataQRY_KSV_PO_MRP1_PU_STATUS] =
        useState({});

    const editQRY_KSV_PO_MRP1_PU_STATUS = (argValue) => {
        let _dataQRY_KSV_PO_MRP1_PU_STATUS =
            datasQRY_KSV_PO_MRP1_PU_STATUS.filter(
                (val) => val.PU_STATUS === argValue,
            );
        setDataQRY_KSV_PO_MRP1_PU_STATUS(_dataQRY_KSV_PO_MRP1_PU_STATUS[0]);
    };

    const onDropdownChangeQRY_KSV_PO_MRP1_PU_STATUS = (e, name) => {
        let val = (e.value && e.value.PU_STATUS) || "";

        let _dataQRY_KSV_PO_MRP1 = { ...dataQRY_KSV_PO_MRP1 };

        let tTypeVal = _dataQRY_KSV_PO_MRP1[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_PO_MRP1[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_PO_MRP1[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_PO_MRP1(_dataQRY_KSV_PO_MRP1);
        setDataQRY_KSV_PO_MRP1_PU_STATUS(e.value);
    };

    /* TABLE KSV_PO_MRP*/
    // DEFINE DATAGRID : TBL_KSV_PO_MRP
    let emptyTBL_KSV_PO_MRP = {
        id: 0,
        OP_KIND: "",
        BUYER_NAME: "",
        BUYER_CD: "",
        PO_CD: "",
        VENDOR_NAME: "",
        VENDOR_CD: "",
        KIND1: "",
        MRP_DATE: "",
        ORDER_DATE: "",
        TARGET_ETA: "",
        READY_DATE: "",
        PI_ISSUE: "",
        PI_FIX: "",
        PI_FILE: "",
        PI_CD: "",
        AMOUNT: "",
        PAY_TYPE: "",
        TERM: "",
        REQUEST_DATE: "",
        BANKCOPY_DATE: "",
        CONFIRM_NO: "",
    };

    const [loadingTBL_KSV_PO_MRP, setLoadingTBL_KSV_PO_MRP] = useState(false);

    const [datasTBL_KSV_PO_MRP, setDatasTBL_KSV_PO_MRP] = useState([]);
    const dt_TBL_KSV_PO_MRP = useRef(null);
    const [dataTBL_KSV_PO_MRP, setDataTBL_KSV_PO_MRP] =
        useState(emptyTBL_KSV_PO_MRP);
    const [selectedTBL_KSV_PO_MRP, setSelectedTBL_KSV_PO_MRP] = useState([]);
    const [flagSelectModeTBL_KSV_PO_MRP, setFlagSelectModeTBL_KSV_PO_MRP] =
        useState(false);

    // DATAGRID CODE : TBL_KSV_PO_MRP
    const searchRefreshTBL_KSV_PO_MRP = () => {
        clearSelectedTBL_KSV_PO_MRP();
        // Service : NawooAll:mgrQueryTBL_KSV_PO_MRP
    };

    const editTBL_KSV_PO_MRP = (argData) => {};

    const onRowClick1TBL_KSV_PO_MRP = (argData0) => {
        var argData = {};

        if (typeof argData0.length !== "undefined") {
            argData = argData0[0];
        } else {
            argData = argData0;
        }

        let argTBL_KSV_PO_MRP = argData;
        editTBL_KSV_PO_MRP(argTBL_KSV_PO_MRP);
        setDataTBL_KSV_PO_MRP(argTBL_KSV_PO_MRP);

        search_LIST_2(argData);
        resetEDT_KSV_PO_MRP(argData);
    };

    const onRowClickTBL_KSV_PO_MRP = (event) => {
        let argTBL_KSV_PO_MRP = event.data;
        if (flagSelectModeTBL_KSV_PO_MRP) return;

        // Service : NawooAll:mgrQueryTBL_KSV_PO_MRP
    };

    const searchTBL_KSV_PO_MRP = () => {
        clearSelectedTBL_KSV_PO_MRP();

        serviceS0519_INSPECT_REPORT
            .mgrQueryTBL_KSV_PO_MRP(dataQRY_KSV_PO_MRP)
            .then((data) => {
                if (typeof data.graphQLErrors === "undefined") {
                    console.log(
                        "ServiceNawooAll.mgrQueryTBL_KSV_PO_MRP() call => " +
                            data.length,
                    );
                    setDatasTBL_KSV_PO_MRP(data);
                } else {
                    // var tStr = data.graphQLErrors[0].message;
                    console.log(
                        "ServiceNawooAll.mgrQueryTBL_KSV_PO_MRP()error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });

        // Service : NawooAll:mgrQueryTBL_KSV_PO_MRP
    };

    const clearSelectedTBL_KSV_PO_MRP = () => {
        setSelectedTBL_KSV_PO_MRP([]);
        setFlagSelectModeTBL_KSV_PO_MRP(false);
    };

    const findIndexByIdTBL_KSV_PO_MRP = (id) => {
        let index = -1;
        for (let i = 0; i < datasTBL_KSV_PO_MRP.length; i++) {
            if (datasTBL_KSV_PO_MRP[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    };

    /*
    const headerTBL_KSV_PO_MRP = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-top">
            <span className="block mt-2 md:mt-0 p-input-icon-left">
                <p style={{ width: '20rem', display: 'inline-block', marginTop: 10, marginLeft: 2 }}> ({datasTBL_KSV_PO_MRP.length}건이 조회되었습니다.)</p>
            </span>
            <span className="block mt-2 md:mt-0 p-input-icon-left">
			<Tooltip className="menuCodeTooltip" target={`#btnSearch`} content={`Alt+S`} position="bottom" />
                <Button label={<span>Search(<u>S</u>)</span>}  accessKey='S' id="btnSearch" icon="pi pi-search" className="p-button-text" onClick={searchTBL_KSV_PO_MRP} />
                <Button label="Excel" icon="pi pi-upload" className="p-button-text" onClick={exportExcelTBL_KSV_PO_MRP} />
            </span>
        </div>
    );
*/

    /*
    const headerTBL_KSV_PO_MRP = (
        <div style={{width: '100rem', height: '3rem' }}>
            <span style={{width: '40rem', display: 'inline-block' }}>
                <p style={{textAlign: 'left', width: '20rem', display: 'inline-block', height: '2rem'}}> ({datasTBL_KSV_PO_MRP.length}건이 조회되었습니다.)</p>
            </span>
            <span style={{width: '40rem', display: 'inline-block' }}>
			<Tooltip className="menuCodeTooltip" target={`#btnSearch`} content={`Alt+S`} position="bottom" />
                <Button label={<span>Search(<u>S</u>)</span>}  accessKey='S' id="btnSearch" icon="pi pi-search" className="p-button-text" onClick={searchTBL_KSV_PO_MRP} />
                <Button label="Excel" icon="pi pi-upload" className="p-button-text" onClick={exportExcel} />
            </span>
        </div>
    ); 
    */

    const exportExcelTBL_KSV_PO_MRP = () => {
        import("xlsx").then((xlsx) => {
            const worksheet = xlsx.utils.json_to_sheet(datasTBL_KSV_PO_MRP);
            const workbook = {
                Sheets: { data: worksheet },
                SheetNames: ["data"],
            };
            const excelBuffer = xlsx.write(workbook, {
                bookType: "xlsx",
                type: "array",
            });
            saveAsExcelFileTBL_KSV_PO_MRP(excelBuffer, "스타일목록");
        });
    };

    const saveAsExcelFileTBL_KSV_PO_MRP = (buffer, fileName) => {
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

    /* TABLE KSV_PO_MRP*/
    // DEFINE DATAGRID : TBL_KSV_PO_MRP1
    let emptyTBL_KSV_PO_MRP1 = {
        id: 0,
        OP_KIND: "",
        BUYER_NAME: "",
        BUYER_CD: "",
        PO_CD: "",
        VENDOR_NAME: "",
        VENDOR_CD: "",
        KIND1: "",
        MRP_DATE: "",
        ORDER_DATE: "",
        TARGET_ETA: "",
        READY_DATE: "",
        PI_ISSUE: "",
        PI_FIX: "",
        PI_FILE: "",
        PI_CD: "",
        AMOUNT: "",
        PAY_TYPE: "",
        TERM: "",
        REQUEST_DATE: "",
        BANKCOPY_DATE: "",
        CONFIRM_NO: "",
    };

    const [loadingTBL_KSV_PO_MRP1, setLoadingTBL_KSV_PO_MRP1] = useState(false);

    const [datasTBL_KSV_PO_MRP1, setDatasTBL_KSV_PO_MRP1] = useState([]);
    const dt_TBL_KSV_PO_MRP1 = useRef(null);
    const [dataTBL_KSV_PO_MRP1, setDataTBL_KSV_PO_MRP1] =
        useState(emptyTBL_KSV_PO_MRP1);
    const [selectedTBL_KSV_PO_MRP1, setSelectedTBL_KSV_PO_MRP1] = useState([]);
    const [flagSelectModeTBL_KSV_PO_MRP1, setFlagSelectModeTBL_KSV_PO_MRP1] =
        useState(false);

    // DATAGRID CODE : TBL_KSV_PO_MRP1
    const searchRefreshTBL_KSV_PO_MRP1 = () => {
        clearSelectedTBL_KSV_PO_MRP1();
        // Service : NawooAll:mgrQueryTBL_KSV_PO_MRP1
    };

    const editTBL_KSV_PO_MRP1 = (argData) => {};

    const onRowClick1TBL_KSV_PO_MRP1 = (argData0) => {
        var argData = {};

        if (typeof argData0.length !== "undefined") {
            argData = argData0[0];
        } else {
            argData = argData0;
        }

        let argTBL_KSV_PO_MRP1 = argData;
        editTBL_KSV_PO_MRP1(argTBL_KSV_PO_MRP1);
        setDataTBL_KSV_PO_MRP1(argTBL_KSV_PO_MRP1);
    };

    const onRowClickTBL_KSV_PO_MRP1 = (event) => {
        let argTBL_KSV_PO_MRP1 = event.data;
        if (flagSelectModeTBL_KSV_PO_MRP1) return;

        // Service : NawooAll:mgrQueryTBL_KSV_PO_MRP1
    };

    const searchTBL_KSV_PO_MRP1 = () => {
        clearSelectedTBL_KSV_PO_MRP1();

        serviceS0519_INSPECT_REPORT
            .mgrQueryTBL_KSV_PO_MRP1(dataQRY_KSV_PO_MRP)
            .then((data) => {
                if (typeof data.graphQLErrors === "undefined") {
                    console.log(
                        "ServiceNawooAll.mgrQueryTBL_KSV_PO_MRP1() call => " +
                            data.length,
                    );
                    setDatasTBL_KSV_PO_MRP1(data);
                } else {
                    // var tStr = data.graphQLErrors[0].message;
                    console.log(
                        "ServiceNawooAll.mgrQueryTBL_KSV_PO_MRP1()error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });

        // Service : NawooAll:mgrQueryTBL_KSV_PO_MRP1
    };

    const clearSelectedTBL_KSV_PO_MRP1 = () => {
        setSelectedTBL_KSV_PO_MRP1([]);
        setFlagSelectModeTBL_KSV_PO_MRP1(false);
    };

    const findIndexByIdTBL_KSV_PO_MRP1 = (id) => {
        let index = -1;
        for (let i = 0; i < datasTBL_KSV_PO_MRP1.length; i++) {
            if (datasTBL_KSV_PO_MRP1[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    };

    /*
    const headerTBL_KSV_PO_MRP1 = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-top">
            <span className="block mt-2 md:mt-0 p-input-icon-left">
                <p style={{ width: '20rem', display: 'inline-block', marginTop: 10, marginLeft: 2 }}> ({datasTBL_KSV_PO_MRP1.length}건이 조회되었습니다.)</p>
            </span>
            <span className="block mt-2 md:mt-0 p-input-icon-left">
			<Tooltip className="menuCodeTooltip" target={`#btnSearch`} content={`Alt+S`} position="bottom" />
                <Button label={<span>Search(<u>S</u>)</span>}  accessKey='S' id="btnSearch" icon="pi pi-search" className="p-button-text" onClick={searchTBL_KSV_PO_MRP1} />
                <Button label="Excel" icon="pi pi-upload" className="p-button-text" onClick={exportExcelTBL_KSV_PO_MRP1} />
            </span>
        </div>
    );
*/

    /*
    const headerTBL_KSV_PO_MRP1 = (
        <div style={{width: '100rem', height: '3rem' }}>
            <span style={{width: '40rem', display: 'inline-block' }}>
                <p style={{textAlign: 'left', width: '20rem', display: 'inline-block', height: '2rem'}}> ({datasTBL_KSV_PO_MRP1.length}건이 조회되었습니다.)</p>
            </span>
            <span style={{width: '40rem', display: 'inline-block' }}>
			<Tooltip className="menuCodeTooltip" target={`#btnSearch`} content={`Alt+S`} position="bottom" />
                <Button label={<span>Search(<u>S</u>)</span>}  accessKey='S' id="btnSearch" icon="pi pi-search" className="p-button-text" onClick={searchTBL_KSV_PO_MRP1} />
                <Button label="Excel" icon="pi pi-upload" className="p-button-text" onClick={exportExcel} />
            </span>
        </div>
    ); 
    */

    const exportExcelTBL_KSV_PO_MRP1 = () => {
        import("xlsx").then((xlsx) => {
            const worksheet = xlsx.utils.json_to_sheet(datasTBL_KSV_PO_MRP1);
            const workbook = {
                Sheets: { data: worksheet },
                SheetNames: ["data"],
            };
            const excelBuffer = xlsx.write(workbook, {
                bookType: "xlsx",
                type: "array",
            });
            saveAsExcelFileTBL_KSV_PO_MRP1(excelBuffer, "스타일목록");
        });
    };

    const saveAsExcelFileTBL_KSV_PO_MRP1 = (buffer, fileName) => {
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

    /* TABLE KSV_PO_MRP*/
    // DEFINE DATAGRID : TBL_KSV_PO_MRP2
    let emptyTBL_KSV_PO_MRP2 = {
        id: 0,
        OP_KIND: "",
        BUYER_NAME: "",
        BUYER_CD: "",
        PO_CD: "",
        VENDOR_NAME: "",
        VENDOR_CD: "",
        KIND1: "",
        MRP_DATE: "",
        ORDER_DATE: "",
        TARGET_ETA: "",
        READY_DATE: "",
        PI_ISSUE: "",
        PI_FIX: "",
        PI_FILE: "",
        PI_CD: "",
        AMOUNT: "",
        PAY_TYPE: "",
        TERM: "",
        REQUEST_DATE: "",
        BANKCOPY_DATE: "",
        CONFIRM_NO: "",
    };

    const [loadingTBL_KSV_PO_MRP2, setLoadingTBL_KSV_PO_MRP2] = useState(false);

    const [datasTBL_KSV_PO_MRP2, setDatasTBL_KSV_PO_MRP2] = useState([]);
    const dt_TBL_KSV_PO_MRP2 = useRef(null);
    const [dataTBL_KSV_PO_MRP2, setDataTBL_KSV_PO_MRP2] =
        useState(emptyTBL_KSV_PO_MRP2);
    const [selectedTBL_KSV_PO_MRP2, setSelectedTBL_KSV_PO_MRP2] = useState([]);
    const [flagSelectModeTBL_KSV_PO_MRP2, setFlagSelectModeTBL_KSV_PO_MRP2] =
        useState(false);

    // DATAGRID CODE : TBL_KSV_PO_MRP2
    const searchRefreshTBL_KSV_PO_MRP2 = () => {
        clearSelectedTBL_KSV_PO_MRP2();
        // Service : NawooAll:mgrQueryTBL_KSV_PO_MRP2
    };

    const editTBL_KSV_PO_MRP2 = (argData) => {};

    const onRowClick1TBL_KSV_PO_MRP2 = (argData0) => {
        var argData = {};

        if (typeof argData0.length !== "undefined") {
            argData = argData0[0];
        } else {
            argData = argData0;
        }

        let argTBL_KSV_PO_MRP2 = argData;
        editTBL_KSV_PO_MRP2(argTBL_KSV_PO_MRP2);
        setDataTBL_KSV_PO_MRP2(argTBL_KSV_PO_MRP2);

        if (typeof argData === "undefined") return;

        var tFileCd = `${argData.STSOUT_CD}-${argData.PO_CD}-${argData.MATL_CD}`;

        let _url1 = `${window.location.protocol}//${window.location.hostname}:3202/restapi/`;
        var tUrl = `${_url1}fileupload2/facin/${tFileCd}/1`;
        setDataUrlFile1(tUrl);
    };

    const onRowClickTBL_KSV_PO_MRP2 = (event) => {
        let argTBL_KSV_PO_MRP2 = event.data;
        if (flagSelectModeTBL_KSV_PO_MRP2) return;

        // Service : NawooAll:mgrQueryTBL_KSV_PO_MRP2
    };

    const searchTBL_KSV_PO_MRP2 = () => {
        clearSelectedTBL_KSV_PO_MRP2();
        // Service : NawooAll:mgrQueryTBL_KSV_PO_MRP2
    };

    const clearSelectedTBL_KSV_PO_MRP2 = () => {
        setSelectedTBL_KSV_PO_MRP2([]);
        setFlagSelectModeTBL_KSV_PO_MRP2(false);
    };

    const findIndexByIdTBL_KSV_PO_MRP2 = (id) => {
        let index = -1;
        for (let i = 0; i < datasTBL_KSV_PO_MRP2.length; i++) {
            if (datasTBL_KSV_PO_MRP2[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    };

    /*
    const headerTBL_KSV_PO_MRP2 = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-top">
            <span className="block mt-2 md:mt-0 p-input-icon-left">
                <p style={{ width: '20rem', display: 'inline-block', marginTop: 10, marginLeft: 2 }}> ({datasTBL_KSV_PO_MRP2.length}건이 조회되었습니다.)</p>
            </span>
            <span className="block mt-2 md:mt-0 p-input-icon-left">
			<Tooltip className="menuCodeTooltip" target={`#btnSearch`} content={`Alt+S`} position="bottom" />
                <Button label={<span>Search(<u>S</u>)</span>}  accessKey='S' id="btnSearch" icon="pi pi-search" className="p-button-text" onClick={searchTBL_KSV_PO_MRP2} />
                <Button label="Excel" icon="pi pi-upload" className="p-button-text" onClick={exportExcelTBL_KSV_PO_MRP2} />
            </span>
        </div>
    );
*/

    /*
    const headerTBL_KSV_PO_MRP2 = (
        <div style={{width: '100rem', height: '3rem' }}>
            <span style={{width: '40rem', display: 'inline-block' }}>
                <p style={{textAlign: 'left', width: '20rem', display: 'inline-block', height: '2rem'}}> ({datasTBL_KSV_PO_MRP2.length}건이 조회되었습니다.)</p>
            </span>
            <span style={{width: '40rem', display: 'inline-block' }}>
			<Tooltip className="menuCodeTooltip" target={`#btnSearch`} content={`Alt+S`} position="bottom" />
                <Button label={<span>Search(<u>S</u>)</span>}  accessKey='S' id="btnSearch" icon="pi pi-search" className="p-button-text" onClick={searchTBL_KSV_PO_MRP2} />
                <Button label="Excel" icon="pi pi-upload" className="p-button-text" onClick={exportExcel} />
            </span>
        </div>
    ); 
    */

    const exportExcelTBL_KSV_PO_MRP2 = () => {
        var tArray = [];
        datasTBL_KSV_PO_MRP2.forEach((col, i) => {
            var tObj = {};
            tObj.ATA = col.ATA;
            tObj.Status = col.STATUS_CD_N;
            tObj.BL_NO = col.BL_NO;
            tObj.CLEARANCE_NO = col.CLEARANCE_NO;
            tObj.Buyer = col.BUYER_CD;
            tObj.Po = col.PO_CD;
            tObj.Supplier = col.VENDOR_NAME;
            tObj.Matl = col.MATL_CD;
            tObj.Description = col.MATL_NAME;
            tObj.Color = col.COLOR;
            tObj.Spec = col.SPEC;
            tObj.Unit = col.UNIT;
            tObj.Ship_Qty = col.S_OUT_QTY;
            tObj.Shortage_Qty = col.SHORTAGE_QTY;
            tObj.Defect_Qty = col.DEFECT_QTY;
            tObj.Bal_Qty = col.BAL_QTY;
            tObj.Facin_Qty = col.FACIN_QTY;
            tObj.Report = col.FILE_NAME;
            tObj.User = col.REG_USER;
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
            saveAsExcelFileTBL_KSV_PO_MRP2(excelBuffer, "Facin List");
        });
    };

    const saveAsExcelFileTBL_KSV_PO_MRP2 = (buffer, fileName) => {
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

    const onCellEditCompleteKSV_PO_MRP2 = (e) => {
        let { rowData, newValue, field, originalEvent: event } = e;
        // rowData[field] = String(serviceLib.getFloat(parseFloat(newValue), 2));

        var tUPDATE_QTY = parseFloat(rowData["UPDATE_QTY"]);
        if (tUPDATE_QTY <= 0) return;

        rowData[field] = newValue;

        var tFACIN_QTY = parseFloat(rowData["FACIN_QTY"]);
        var tS_OUT_QTY = parseFloat(rowData["S_OUT_QTY"]);
        var tBAL_QTY = parseFloat(rowData["BAL_QTY"]);
        if (field === "SHORTAGE_QTY") {
            var tDEFECT_QTY = parseFloat(rowData["DEFECT_QTY"]);
            var tSHORTAGE_QTY = parseFloat(newValue);
            tBAL_QTY = tS_OUT_QTY - (tDEFECT_QTY + tSHORTAGE_QTY + tFACIN_QTY);
            rowData["BAL_QTY"] = String(tBAL_QTY);
            // rowData['UPDATE_QTY'] = String(tBAL_QTY);
        }
        if (field === "DEFECT_QTY") {
            var tSHORTAGE_QTY = parseFloat(rowData["SHORTAGE_QTY"]);
            var tDEFECT_QTY = parseFloat(newValue);
            tBAL_QTY = tS_OUT_QTY - (tDEFECT_QTY + tSHORTAGE_QTY + tFACIN_QTY);
            rowData["BAL_QTY"] = String(tBAL_QTY);
            // rowData['UPDATE_QTY'] = String(tBAL_QTY);
        }
        /*
        if (field === 'UPDATE_QTY') {
            var tDEFECT_QTY = parseFloat(rowData['DEFECT_QTY']);
            var tUpdateQty =  parseFloat(newValue);
            var tShortAge_Qty = 0;
            var tVal1 = tS_OUT_QTY - tDEFECT_QTY;
            var tShortAge_Qty = tUpdateQty - tVal1; 
            rowData['SHORTAGE_QTY'] = String(tShortAge_Qty);
            rowData['UPDATE_QTY'] = String(tUpdateQty);
        }
        */
        // rowData['FACIN_QTY'] = String(tFACIN_QTY);
    };

    /*
    const cellEditorKSV_PO_MRP2 = (options) => {
        return textEditor(options);
    }

    const textEditor = (options) => {
        return <InputText type="text" value={options.value} onChange={(e) => options.editorCallback(e.target.value)} />;
    }
    */

    const cellEditorKSV_PO_MRP2 = (options) => {
        if (options.field === "SURCHARGE_REMARK")
            return textEditorText(options);
        else return textEditorNum(options);
    };

    const onChangeTextEdit = (e, options) => {
        options.editorCallback(e.target.value);
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

    const handleFocus = (event) => event.target.select();

    const textEditorNum = (options) => {
        return (
            <InputText
                type="text"
                value={changeInputValue(options.value)}
                onChange={(e) => onChangeTextEdit(e, options)}
                onFocus={handleFocus}
            />
        );
    };

    const textEditorText = (options) => {
        return (
            <InputText
                type="text"
                value={changeInputValue(options.value)}
                onChange={(e) => onChangeTextEdit(e, options)}
                onFocus={handleFocus}
            />
        );
    };

    /* QRY KSV_PO_MRP*/
    let emptyEDT_KSV_PO_MRP = {
        FILE_NAME: "",
        LOCATION: "",
        FACIN_DATE: "",
    };

    const [dataEDT_KSV_PO_MRP, setDataEDT_KSV_PO_MRP] =
        useState(emptyEDT_KSV_PO_MRP);

    const resetEDT_KSV_PO_MRP = (argData) => {
        var tObj = { ...emptyEDT_KSV_PO_MRP };
        tObj.TARGET_ETA = argData.TARGET_ETA;
        if (argData.FACTORY_CD === "FC034") tObj.DESTINATION = "BVT";
        else if (argData.FACTORY_CD === "FC044") tObj.DESTINATION = "ETP";
        else if (argData.FACTORY_CD === "FC010") tObj.DESTINATION = "SHINTS";
        else tObj.DESTINATION = "OTHER";
        tObj.PAY_TERM = argData.TRADE_TERM;
        setDataEDT_KSV_PO_MRP(tObj);
    };

    const onCalChangeEDT_KSV_PO_MRP_FACIN_DATE = (e, name) => {
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

    const onInputChangeEDT_KSV_PO_MRP_FILE_NAME = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_PO_MRP = { ...dataEDT_KSV_PO_MRP };

        let tTypeVal = _dataEDT_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string") _dataEDT_KSV_PO_MRP[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_PO_MRP[`${name}`] = parseInt(val);

        setDataEDT_KSV_PO_MRP(_dataEDT_KSV_PO_MRP);
    };

    const onInputChangeEDT_KSV_PO_MRP_LOCATION = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_PO_MRP = { ...dataEDT_KSV_PO_MRP };

        let tTypeVal = _dataEDT_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string") _dataEDT_KSV_PO_MRP[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_PO_MRP[`${name}`] = parseInt(val);

        setDataEDT_KSV_PO_MRP(_dataEDT_KSV_PO_MRP);
    };

    const onInputChangeEDT_KSV_PO_MRP_INVOICE_NO = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_PO_MRP = { ...dataEDT_KSV_PO_MRP };

        let tTypeVal = _dataEDT_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string") _dataEDT_KSV_PO_MRP[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_PO_MRP[`${name}`] = parseInt(val);

        setDataEDT_KSV_PO_MRP(_dataEDT_KSV_PO_MRP);
    };

    const onInputChangeEDT_KSV_PO_MRP_PAY_TERM = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_PO_MRP = { ...dataEDT_KSV_PO_MRP };

        let tTypeVal = _dataEDT_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string") _dataEDT_KSV_PO_MRP[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_PO_MRP[`${name}`] = parseInt(val);

        setDataEDT_KSV_PO_MRP(_dataEDT_KSV_PO_MRP);
    };

    const onInputChangeEDT_KSV_PO_MRP_CT_QTY = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_PO_MRP = { ...dataEDT_KSV_PO_MRP };

        let tTypeVal = _dataEDT_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string") _dataEDT_KSV_PO_MRP[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_PO_MRP[`${name}`] = parseInt(val);

        setDataEDT_KSV_PO_MRP(_dataEDT_KSV_PO_MRP);
    };

    const onCalChangeEDT_KSV_PO_MRP_READY_DATE = (e, name) => {
        let val1 = e.value || "";
        let val = "";
        if (val1 === "") {
            val = "";
        } else {
            val = getDateVal(val1);
        }

        let _dataEDT_KSV_PO_MRP = { ...dataEDT_KSV_PO_MRP };
        _dataEDT_KSV_PO_MRP[`${name}`] = val;
        setDataEDT_KSV_PO_MRP(_dataEDT_KSV_PO_MRP);
    };

    const onInputChangeEDT_KSV_PO_MRP_ORIGIN_PORT = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_PO_MRP = { ...dataEDT_KSV_PO_MRP };

        let tTypeVal = _dataEDT_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string") _dataEDT_KSV_PO_MRP[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_PO_MRP[`${name}`] = parseInt(val);

        setDataEDT_KSV_PO_MRP(_dataEDT_KSV_PO_MRP);
    };

    const onInputChangeEDT_KSV_PO_MRP_WEIGHT = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_PO_MRP = { ...dataEDT_KSV_PO_MRP };

        let tTypeVal = _dataEDT_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string") _dataEDT_KSV_PO_MRP[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_PO_MRP[`${name}`] = parseInt(val);

        setDataEDT_KSV_PO_MRP(_dataEDT_KSV_PO_MRP);
    };

    const onCalChangeEDT_KSV_PO_MRP_TARGET_ETA = (e, name) => {
        let val1 = e.value || "";
        let val = "";
        if (val1 === "") {
            val = "";
        } else {
            val = getDateVal(val1);
        }

        let _dataEDT_KSV_PO_MRP = { ...dataEDT_KSV_PO_MRP };
        _dataEDT_KSV_PO_MRP[`${name}`] = val;
        setDataEDT_KSV_PO_MRP(_dataEDT_KSV_PO_MRP);
    };

    const onInputChangeEDT_KSV_PO_MRP_DESTINATION = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_PO_MRP = { ...dataEDT_KSV_PO_MRP };

        let tTypeVal = _dataEDT_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string") _dataEDT_KSV_PO_MRP[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_PO_MRP[`${name}`] = parseInt(val);

        setDataEDT_KSV_PO_MRP(_dataEDT_KSV_PO_MRP);
    };

    const onInputChangeEDT_KSV_PO_MRP_CBM = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_PO_MRP = { ...dataEDT_KSV_PO_MRP };

        let tTypeVal = _dataEDT_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string") _dataEDT_KSV_PO_MRP[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_PO_MRP[`${name}`] = parseInt(val);

        setDataEDT_KSV_PO_MRP(_dataEDT_KSV_PO_MRP);
    };

    const s3FileUpload = async (e) => {
        var tSelArray = [...selectedTBL_KSV_PO_MRP2];
        /*
        if (tSelArray.length <= 0) {
            alert('작업할 데이타를 선택하세요');
            return;
        }
        */

        const fileName = e.target.files[0].name;
        const img = e.target.files[0];
        const formData = new FormData();
        formData.append("file", img);

        try {
            var tUrl = `${apiOption.apiuri}/restapi/imgUpload`;
            const s3UrlResponse = await axios.get(tUrl);
            console.log(s3UrlResponse.data.uploadURL);

            const presignedUrl = s3UrlResponse.data.uploadURL;
            const objectName = s3UrlResponse.data.imageName;
            await fetch(presignedUrl, {
                method: "PUT",
                headers: {
                    "Content-Type": img.type,
                },
                body: img,
            });

            const imgURL = s3UrlResponse.data.uploadURL.split("?")[0];
            var tArray = [...selectedTBL_KSV_PO_MRP];
            var tInObj2 = [];
            tArray.forEach((col, i) => {
                var tObj = { ...col };
                if (typeof tObj.__typename !== "undefined")
                    delete tObj.__typename;
                if (typeof tObj.id !== "undefined") delete tObj.id;
                tInObj2.push(tObj);
            });

            var tInObj = {};
            tInObj.FILE_KEY = "";
            tInObj.TITLE = `inspect doc`;
            tInObj.NAME = fileName;
            tInObj.URL = imgURL;
            tInObj.OBJECT_NAME = objectName;
            setFileObj(tInObj);

            var tEdtObj = { ...dataEDT_KSV_PO_MRP };
            tEdtObj.FILE_NAME = tInObj.NAME;
            setDataEDT_KSV_PO_MRP(tEdtObj);
        } catch (err) {
            console.log(err);
        }
    };

    ///
    useEffect(() => {
        var tStsoutCds = "";

        var tUrls = window.location.href.split("?");
        if (tUrls.length <= 1) {
        } else {
            var tParams1 = tUrls[1].split("&");
            var tParams2 = tParams1.map((col, i) => {
                var tObj = {};
                var tCols = col.split("=");

                if (tCols[0].includes("STSOUT_CD")) {
                    tObj.key = tCols[0];
                    tObj.value = tCols[1];
                    tStsoutCds = tObj.value;
                }
            });
        }

        var tStsoutCdArray = tStsoutCds.split("|");

        var tObj = {};
        /*
         serviceS0519_INSPECT_REPORT.mgrQuery_CODE(tObj).then(data => {
                  if (typeof data.graphQLErrors === 'undefined') {
                    setDatasQRY_KSV_PO_MRP_STATUS_CD(data.STATUS_CD);
                    setDataQRY_KSV_PO_MRP_STATUS_CD(data.STATUS_CD[0]);

                    var tRetDate = serviceLib.getCurrDate().substring(0, 8);
                    var tQry = { ...dataQRY_KSV_PO_MRP };
                    tQry.S_ATA = `${tRetDate}`;
                    tQry.E_ATA = ``;
                    tQry.S_UPLOAD_DATE = `${tRetDate}`;
                    tQry.E_UPLOAD_DATE = ``;
                    setDataQRY_KSV_PO_MRP(tQry);

                  } else {
                    console.log("mgrQuery_PO_CD error => " + JSON.stringify(data.graphQLErrors));
                  }
         });
         */

        var tQry = { ...dataQRY_KSV_PO_MRP };
        tQry.STSOUT_CD = tStsoutCds;
        setDataQRY_KSV_PO_MRP(tQry);

        search_LIST_1(tQry);
    }, []);

    const blankFn = () => {};

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

    const formatCurrency = (value) => {
        return value.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
        });
    };

    const getDateYYYYMMDD = () => {
        var tDate = new Date();
        var mm = tDate.getMonth() + 1;
        var mm_str = "";
        if (mm > 9) mm_str = mm.toString();
        else mm_str = "0" + mm;

        var dd = tDate.getDate();
        var dd_str = "";
        if (dd > 9) dd_str = dd.toString();
        else dd_str = "0" + dd;

        var hours = tDate.getHours();
        var hours_str = "";
        if (hours > 9) hours_str = hours.toString();
        else hours_str = "0" + hours;

        var minutes = tDate.getMinutes();
        var minutes_str = "";
        if (minutes > 9) minutes_str = minutes.toString();
        else minutes_str = "0" + minutes;

        var seconds = tDate.getSeconds();
        var seconds_str = "";
        if (seconds > 9) seconds_str = seconds.toString();
        else seconds_str = "0" + seconds;

        var yyyy = tDate.getFullYear();

        var tRet =
            yyyy.toString() +
            mm_str +
            dd_str +
            hours_str +
            minutes_str +
            seconds_str;
        return tRet;
    };

    const getDateYYMM = () => {
        var tDate = new Date();
        var mm = tDate.getMonth() + 1;
        var mm_str = "";
        if (mm > 9) mm_str = mm.toString();
        else mm_str = "0" + mm;

        var dd = tDate.getDate();
        var dd_str = "";
        if (dd > 9) dd_str = dd.toString();
        else dd_str = "0" + dd;

        var hours = tDate.getHours();
        var hours_str = "";
        if (hours > 9) hours_str = hours.toString();
        else hours_str = "0" + hours;

        var minutes = tDate.getMinutes();
        var minutes_str = "";
        if (minutes > 9) minutes_str = minutes.toString();
        else minutes_str = "0" + minutes;

        var seconds = tDate.getSeconds();
        var seconds_str = "";
        if (seconds > 9) seconds_str = seconds.toString();
        else seconds_str = "0" + seconds;

        var yyyy = tDate.getFullYear();
        var yyyy_str = yyyy.toString();

        var tRet = yyyy_str.substring(2, 4) + mm_str;
        return tRet;
    };

    const createId = () => {
        let id = "";
        let chars =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (let i = 0; i < 6; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    };

    return (
        <div className="af-div-main">
            <div
                className="af-div-first"
                style={{ width: "123rem", height: "6rem" }}
            >
                <span className="af-span-3-0" style={{ width: "17rem" }}>
                    <p className="af-span-p" style={{ width: "7rem" }}>
                        {" "}
                        {serviceLib.getLocaleMessage(
                            "id_msg_Buyer#_ORDER_CD",
                        )}{" "}
                    </p>
                    <div className="af-span-div" style={{ width: "9rem" }}>
                        <InputText
                            style={{ width: "9rem" }}
                            id="id_TARGET_ETA"
                            value={dataQRY_KSV_PO_MRP.BUYER_CD}
                            onChange={(e) =>
                                onInputChangeQRY_KSV_PO_MRP_BUYER_CD(
                                    e,
                                    "BUYER_CD",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "17rem" }}>
                    <p className="af-span-p" style={{ width: "7rem" }}>
                        {" "}
                        {serviceLib.getLocaleMessage(
                            "id_msg_PO#_ORDER_CD",
                        )}{" "}
                    </p>
                    <div className="af-span-div" style={{ width: "9rem" }}>
                        <InputText
                            style={{ width: "9rem" }}
                            id="id_TARGET_ETA"
                            value={dataQRY_KSV_PO_MRP.PO_CD}
                            onChange={(e) =>
                                onInputChangeQRY_KSV_PO_MRP_PO_CD(e, "PO_CD")
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "23rem" }}>
                    <p className="af-span-p" style={{ width: "7rem" }}>
                        {" "}
                        {serviceLib.getLocaleMessage(
                            "id_msg_Supplier_ORDER_CD",
                        )}{" "}
                    </p>
                    <div className="af-span-div" style={{ width: "15rem" }}>
                        <InputText
                            style={{ width: "15rem" }}
                            id="id_TARGET_ETA"
                            value={dataQRY_KSV_PO_MRP.VENDOR_CD}
                            onChange={(e) =>
                                onInputChangeQRY_KSV_PO_MRP_VENDOR_CD(
                                    e,
                                    "VENDOR_CD",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "23rem" }}>
                    <p className="af-span-p" style={{ width: "7rem" }}>
                        {" "}
                        {serviceLib.getLocaleMessage(
                            "id_msg_Spec_ORDER_CD",
                        )}{" "}
                    </p>
                    <div className="af-span-div" style={{ width: "15rem" }}>
                        <InputText
                            style={{ width: "15rem" }}
                            id="id_TARGET_ETA"
                            value={dataQRY_KSV_PO_MRP.SPEC}
                            onChange={(e) =>
                                onInputChangeQRY_KSV_PO_MRP_SPEC(e, "SPEC")
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "10rem" }}>
                    <div className="af-span-div" style={{ width: "9rem" }}>
                        <Button
                            label="Excel"
                            style={{ width: "9rem" }}
                            className="p-button-text green"
                            onClick={exportExcelTBL_KSV_PO_MRP2}
                        />
                    </div>
                </span>

                <span
                    className="af-span-3-0"
                    style={{ width: "20rem", display: "none" }}
                >
                    <p className="af-span-p" style={{ width: "10rem" }}>
                        {" "}
                        {serviceLib.getLocaleMessage("id_msg_ _ORDER_CD")}{" "}
                    </p>
                    <div className="af-span-div" style={{ width: "9rem" }}>
                        <Button
                            label="Manual"
                            style={{ width: "9rem" }}
                            className="p-button-text"
                            onClick={process_DOWNLOAD_MANUAL}
                        />
                    </div>
                </span>

                <span className="af-span-3" style={{ width: "34.5rem" }}>
                    <p className="af-span-p" style={{ width: "7rem" }}>
                        {" "}
                        {serviceLib.getLocaleMessage(
                            "id_msg_Desc_ORDER_CD",
                        )}{" "}
                    </p>
                    <div className="af-span-div" style={{ width: "26rem" }}>
                        <InputText
                            style={{ width: "26rem" }}
                            id="id_TARGET_ETA"
                            value={dataQRY_KSV_PO_MRP.MATL_NAME}
                            onChange={(e) =>
                                onInputChangeQRY_KSV_PO_MRP_MATL_NAME(
                                    e,
                                    "MATL_NAME",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "23rem" }}>
                    <p className="af-span-p" style={{ width: "7rem" }}>
                        {" "}
                        {serviceLib.getLocaleMessage(
                            "id_msg_Color_ORDER_CD",
                        )}{" "}
                    </p>
                    <div className="af-span-div" style={{ width: "15rem" }}>
                        <InputText
                            style={{ width: "15rem" }}
                            id="id_TARGET_ETA"
                            value={dataQRY_KSV_PO_MRP.COLOR}
                            onChange={(e) =>
                                onInputChangeQRY_KSV_PO_MRP_COLOR(e, "COLOR")
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "23rem" }}>
                    <p className="af-span-p" style={{ width: "7rem" }}>
                        {" "}
                        {serviceLib.getLocaleMessage(
                            "id_msg_Unit_ORDER_CD",
                        )}{" "}
                    </p>
                    <div className="af-span-div" style={{ width: "15rem" }}>
                        <InputText
                            style={{ width: "15rem" }}
                            id="id_TARGET_ETA"
                            value={dataQRY_KSV_PO_MRP.UNIT}
                            onChange={(e) =>
                                onInputChangeQRY_KSV_PO_MRP_SPEC(e, "SPEC")
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "10rem" }}>
                    <div className="af-span-div" style={{ width: "9rem" }}>
                        <Button
                            label="Search"
                            style={{ width: "9rem" }}
                            className="p-button-text"
                            onClick={search_LIST_1}
                        />
                    </div>
                </span>

                {/*
                <span className="af-span-3-0" style={{ width: '28rem' }}>
                    <p className="af-span-p" style={{ width: '7rem' }}> {serviceLib.getLocaleMessage('id_msg_ATA_ORDER_CD')} </p>
                    <div className="af-span-div" style={{ width: '9rem' }}>
                        <Calendar showButtonBar  style={{ width: '9rem' }} dateFormat="yy-mm-dd" id="id_ETA" value={changeDateVal(dataQRY_KSV_PO_MRP.S_ATA)} onChange={(e) => onCalChangeQRY_KSV_PO_MRP_S_ATA(e, 'S_ATA')} />
                    </div>
                    <p className="af-span-p" style={{ width: '1rem' }}> {serviceLib.getLocaleMessage('id_msg_~_ORDER_CD')} </p>
                    <div className="af-span-div" style={{ width: '9rem' }}>
                        <Calendar showButtonBar  style={{ width: '9rem' }} dateFormat="yy-mm-dd" id="id_ETA" value={changeDateVal(dataQRY_KSV_PO_MRP.E_ATA)} onChange={(e) => onCalChangeQRY_KSV_PO_MRP_E_ATA(e, 'E_ATA')} />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: '17rem' }}>
                    <p className="af-span-p" style={{ width: '7rem' }}> {serviceLib.getLocaleMessage('id_msg_Status_ORDER_CD')} </p>
                    <div className="af-span-div" style={{ width: '9rem' }}>
                       <Dropdown style={{ width: '9rem' }} id="id_PO_CD" value={dataQRY_KSV_PO_MRP_STATUS_CD} onChange={(e) => onDropdownChangeQRY_KSV_PO_MRP_STATUS_CD(e, 'STATUS_CD')} options={datasQRY_KSV_PO_MRP_STATUS_CD} optionLabel="CD_NAME" placeholder="" editable filter></Dropdown>
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: '17rem' }}>
                    <p className="af-span-p" style={{ width: '7rem' }}> {serviceLib.getLocaleMessage('id_msg_User_ORDER_CD')} </p>
                    <div className="af-span-div" style={{ width: '9rem' }}>
                       <InputText style={{ width: '9rem' }} id="id_TARGET_ETA" value={dataQRY_KSV_PO_MRP.USER_ID} onChange={(e) => onInputChangeQRY_KSV_PO_MRP_USER_ID(e, 'USER_ID')} />
                    </div> 
                </span>
                <span className="af-span-3-0" style={{ width: '10rem' }}>
                    <div className="af-span-div" style={{ width: '9rem' }}>
			            <Tooltip className="menuCodeTooltip" target={`#btnSearch`} content={`Alt+S`} position="bottom" />
                        <Button label={<span>Search(<u>S</u>)</span>}  accessKey='S' id="btnSearch" style={{width:'9rem'}} className="p-button-text" onClick={search_LIST_1} />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: '10rem' }}>
                    <div className="af-span-div" style={{ width: '9rem' }}>
                        <Button label="Reset" style={{width:'9rem'}} className="p-button-text" onClick={process_RESET} />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: '20rem' }}>
                    <p className="af-span-p" style={{ width: '10rem' }}> {serviceLib.getLocaleMessage('id_msg_ _ORDER_CD')} </p>
                    <div className="af-span-div" style={{ width: '9rem' }}>
                        <Button label="Manual" style={{width:'9rem'}} className="p-button-text" onClick={process_DOWNLOAD_MANUAL} />
                    </div>
                </span>

                <span className="af-span-3" style={{ width: '28rem' }}>
                    <p className="af-span-p" style={{ width: '7rem' }}> {serviceLib.getLocaleMessage('id_msg_Upload_ETA_ORDER_CD')} </p>
                    <div className="af-span-div" style={{ width: '9rem' }}>
                        <Calendar showButtonBar  style={{ width: '9rem' }} dateFormat="yy-mm-dd" id="id_ETA" value={changeDateVal(dataQRY_KSV_PO_MRP.S_UPLOAD_DATE)} onChange={(e) => onCalChangeQRY_KSV_PO_MRP_S_UPLOAD_DATE(e, 'S_UPLOAD_DATE')} />
                    </div>
                    <p className="af-span-p" style={{ width: '1rem' }}> {serviceLib.getLocaleMessage('id_msg_~_ORDER_CD')} </p>
                    <div className="af-span-div" style={{ width: '9rem' }}>
                        <Calendar showButtonBar  style={{ width: '9rem' }} dateFormat="yy-mm-dd" id="id_ETA" value={changeDateVal(dataQRY_KSV_PO_MRP.E_UPLOAD_DATE)} onChange={(e) => onCalChangeQRY_KSV_PO_MRP_E_UPLOAD_DATE(e, 'E_UPLOAD_DATE')} />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: '17rem' }}>
                    <p className="af-span-p" style={{ width: '7rem' }}> {serviceLib.getLocaleMessage('id_msg_PO_ORDER_CD')} </p>
                    <div className="af-span-div" style={{ width: '9rem' }}>
                       <InputText style={{ width: '9rem' }} id="id_TARGET_ETA" value={dataQRY_KSV_PO_MRP.PO_CD} onChange={(e) => onInputChangeQRY_KSV_PO_MRP_PO_CD(e, 'PO_CD')} />
                    </div> 
                </span>
                <span className="af-span-3" style={{ width: '17rem' }}>
                    <p className="af-span-p" style={{ width: '7rem' }}> {serviceLib.getLocaleMessage('id_msg_Supplier_ORDER_CD')} </p>
                    <div className="af-span-div" style={{ width: '9rem' }}>
                       <InputText style={{ width: '9rem' }} id="id_TARGET_ETA" value={dataQRY_KSV_PO_MRP.VENDOR_CD} onChange={(e) => onInputChangeQRY_KSV_PO_MRP_VENDOR_CD(e, 'VENDOR_CD')} />
                    </div> 
                </span>
                <span className="af-span-3" style={{ width: '17rem' }}>
                    <p className="af-span-p" style={{ width: '7rem' }}> {serviceLib.getLocaleMessage('id_msg_ _ORDER_CD')} </p>
                </span>
                <span className="af-span-3" style={{ width: '10rem' }}>
                    <div className="af-span-div" style={{ width: '9rem' }}>
                        <Button label="Excel" style={{width:'9rem'}} className="p-button-text green" onClick={exportExcelTBL_KSV_PO_MRP2} />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: '10rem' }}>
                    <div className="af-span-div" style={{ width: '9rem' }}>
                        <Button label="All Sel" style={{width:'9rem'}}  className="p-button-text" onClick={process_ALL_SELECT} />
                    </div>
                </span>
                */}
            </div>

            <div
                className="af-div-first"
                style={{ width: "123rem", height: "49rem" }}
            >
                <AFDataTable
                    ref={dt_TBL_KSV_PO_MRP2}
                    editMode="cell"
                    size="small"
                    value={datasTBL_KSV_PO_MRP2}
                    tableStyle={{ tableLayout: "fixed" }}
                    resizableColumns
                    columnResizeMode="expand"
                    loading={loadingTBL_KSV_PO_MRP2}
                    // metaKeySelection={false}
                    showGridlines
                    selectionMode="checkbox"
                    selection={selectedTBL_KSV_PO_MRP2}
                    onSelectionChange={(e) => {
                        setSelectedTBL_KSV_PO_MRP2(e.value);
                        onRowClick1TBL_KSV_PO_MRP2(e.value);
                    }}
                    // onRowClick={onRowClickTBL_KSV_PO_MRP2}
                    dataKey="id"
                    className="datatable-responsive"
                    virtualScrollerOptions={{ itemSize: 20 }}
                    emptyMessage=" " //header={headerTBL_KSV_PO_MRP2}
                    responsiveLayout="scroll"
                    // scrollable scrollHeight="555px"
                    scrollable
                    scrollHeight="49rem"
                >
                    <AFColumn
                        selectionMode="multiple"
                        field="__checkbox__"
                        reorderable={false}
                        headerClassName="t-header"
                        headerStyle={{ width: "3rem" }}
                    ></AFColumn>
                    <AFColumn
                        field="PO_CD"
                        headerClassName="t-header"
                        header={serviceLib.getLocaleMessage(
                            "id_msg_PO_OP_KIND",
                        )}
                        style={{ width: "6rem", flexBasis: "auto" }}
                    ></AFColumn>
                    <AFColumn
                        field="MATL_CD"
                        headerClassName="t-header"
                        header={serviceLib.getLocaleMessage(
                            "id_msg_Matl_OP_KIND",
                        )}
                        style={{ width: "6rem", flexBasis: "auto" }}
                    ></AFColumn>
                    <AFColumn
                        field="MATL_NAME"
                        headerClassName="t-header"
                        header={serviceLib.getLocaleMessage(
                            "id_msg_Description_OP_KIND",
                        )}
                        style={{ width: "10rem", flexBasis: "auto" }}
                    ></AFColumn>
                    <AFColumn
                        field="COLOR"
                        headerClassName="t-header"
                        header={serviceLib.getLocaleMessage(
                            "id_msg_Color_OP_KIND",
                        )}
                        style={{ width: "8rem", flexBasis: "auto" }}
                    ></AFColumn>
                    <AFColumn
                        field="SPEC"
                        headerClassName="t-header"
                        header={serviceLib.getLocaleMessage(
                            "id_msg_Spec_OP_KIND",
                        )}
                        style={{ width: "10rem", flexBasis: "auto" }}
                    ></AFColumn>
                    <AFColumn
                        field="UNIT"
                        headerClassName="t-header"
                        header={serviceLib.getLocaleMessage(
                            "id_msg_Unit_OP_KIND",
                        )}
                        style={{ width: "5rem", flexBasis: "auto" }}
                    ></AFColumn>
                    <AFColumn
                        field="S_OUT_QTY"
                        headerClassName="t-header"
                        header={serviceLib.getLocaleMessage(
                            "id_msg_Ship Qty_OP_KIND",
                        )}
                        style={{ width: "6rem", flexBasis: "auto" }}
                        bodyStyle={{ textAlign: "right" }}
                        body={(rowData) =>
                            serviceLib.numWithCommas(rowData.S_OUT_QTY, 2)
                        }
                    ></AFColumn>
                    <AFColumn
                        field="FACIN_QTY"
                        headerClassName="t-header"
                        header={serviceLib.getLocaleMessage(
                            "id_msg_Pre FacIn Qty_OP_KIND",
                        )}
                        style={{ width: "6rem", flexBasis: "auto" }}
                        bodyStyle={{ textAlign: "right" }}
                        body={(rowData) =>
                            serviceLib.numWithCommas(rowData.FACIN_QTY, 2)
                        }
                    ></AFColumn>
                    <AFColumn
                        field="SHORTAGE_QTY"
                        headerClassName="t-header"
                        header={serviceLib.getLocaleMessage(
                            "id_msg_Short/Over_OP_KIND",
                        )}
                        style={{
                            color: "green",
                            width: "6rem",
                            flexBasis: "auto",
                        }}
                        editor={(options) => cellEditorKSV_PO_MRP2(options)}
                        onCellEditComplete={onCellEditCompleteKSV_PO_MRP2}
                        bodyStyle={{ textAlign: "right" }}
                        body={(rowData) =>
                            serviceLib.numWithCommas(rowData.SHORTAGE_QTY, 2)
                        }
                    ></AFColumn>
                    <AFColumn
                        field="DEFECT_QTY"
                        headerClassName="t-header"
                        header={serviceLib.getLocaleMessage(
                            "id_msg_Defect_OP_KIND",
                        )}
                        style={{
                            color: "green",
                            width: "6rem",
                            flexBasis: "auto",
                        }}
                        bodyStyle={{ textAlign: "right" }}
                        body={(rowData) =>
                            serviceLib.numWithCommas(rowData.DEFECT_QTY, 2)
                        }
                        editor={(options) => cellEditorKSV_PO_MRP2(options)}
                        onCellEditComplete={onCellEditCompleteKSV_PO_MRP2}
                    ></AFColumn>
                    <AFColumn
                        field="BAL_QTY"
                        headerClassName="t-header"
                        header={serviceLib.getLocaleMessage(
                            "id_msg_Facin Qty_OP_KIND",
                        )}
                        style={{ width: "6rem", flexBasis: "auto" }}
                        bodyStyle={{ textAlign: "right" }}
                        body={(rowData) =>
                            serviceLib.numWithCommas(rowData.BAL_QTY, 2)
                        }
                    ></AFColumn>
                    <AFColumn
                        field="LOCATION"
                        headerClassName="t-header"
                        header={serviceLib.getLocaleMessage(
                            "id_msg_Location_OP_KIND",
                        )}
                        style={{ width: "7rem", flexBasis: "auto" }}
                    ></AFColumn>
                </AFDataTable>
            </div>

            <div
                className="af-div-first"
                style={{ width: "123rem", height: "4rem" }}
            >
                <span className="af-span-3-0" style={{ width: "24rem" }}>
                    <p className="af-span-p" style={{ width: "7rem" }}>
                        Location
                    </p>
                    <div className="af-span-div" style={{ width: "10rem" }}>
                        <InputText
                            style={{ width: "10rem" }}
                            id="id_TARGET_ETA"
                            value={dataEDT_KSV_PO_MRP.LOCATION}
                            onChange={(e) =>
                                onInputChangeEDT_KSV_PO_MRP_LOCATION(
                                    e,
                                    "LOCATION",
                                )
                            }
                        />
                    </div>
                    <div className="af-span-div-btn" style={{ width: "5rem" }}>
                        <Button
                            style={{ width: "5rem" }}
                            label="Update"
                            className="p-button-text"
                            onClick={process_UPDATE_LOCATION}
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "22rem" }}>
                    <p className="af-span-p" style={{ width: "12rem" }}>
                        {" "}
                        Inspection Report{" "}
                    </p>
                    <div className="af-span-div-btn" style={{ width: "9rem" }}>
                        <button style={{ width: "7rem", height: "1.5rem" }}>
                            <label
                                className="inputFileCustom"
                                htmlFor="inputFileAdd"
                            >
                                Upload
                            </label>
                        </button>
                        <input
                            type="file"
                            id="inputFileAdd"
                            onChange={s3FileUpload}
                            style={{ display: "none" }}
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "17rem" }}>
                    <p className="af-span-p" style={{ width: "1rem" }}>
                        {" "}
                    </p>
                    <div className="af-span-div" style={{ width: "9rem" }}>
                        <InputText
                            style={{ width: "9rem" }}
                            id="id_TARGET_ETA"
                            value={dataEDT_KSV_PO_MRP.FILE_NAME}
                            onChange={(e) =>
                                onInputChangeEDT_KSV_PO_MRP_FILE_NAME(
                                    e,
                                    "FILE_NAME",
                                )
                            }
                        />
                    </div>
                </span>

                <span className="af-span-3" style={{ width: "11rem" }}>
                    <p className="af-span-p" style={{ width: "1rem" }}>
                        {" "}
                        {serviceLib.getLocaleMessage(
                            "id_msg_ _ETA_ORDER_CD",
                        )}{" "}
                    </p>
                    <div className="af-span-div" style={{ width: "9rem" }}>
                        <Calendar
                            showButtonBar
                            style={{ width: "9rem" }}
                            dateFormat="yy-mm-dd"
                            id="id_ETA"
                            value={changeDateVal(dataEDT_KSV_PO_MRP.FACIN_DATE)}
                            onChange={(e) =>
                                onCalChangeEDT_KSV_PO_MRP_FACIN_DATE(
                                    e,
                                    "FACIN_DATE",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "10rem" }}>
                    <div className="af-span-di-btnv" style={{ width: "9rem" }}>
                        <Button
                            style={{ width: "9rem" }}
                            label="Save"
                            className="p-button-text"
                            onClick={process_FACIN}
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
            </div>

            <Toast ref={toast} />

            <Dialog
                visible={createDialog}
                position="top-right"
                style={{ width: "98vw" }}
                header=""
                modal={true}
                className="p-fluid"
                onHide={hideDialog}
            ></Dialog>

            <Dialog class="loadingModal" visible={isProgress} modal>
                <ProgressSpinner />
            </Dialog>
        </div>
    );
};

const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(S0519_INSPECT_REPORT, comparisonFn);
