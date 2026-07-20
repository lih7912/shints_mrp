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
import { ServiceS051901_FACIN_LIST } from "../service/service_biz/ServiceS051901_FACIN_LIST";

import "./page_common.scss";

const S051901_FACIN_LIST = () => {
    let emptyKCD_CODE = {
        id: 0,
        CD_GROUP: "",
        CD_CODE: "",
        CD_NAME: "",
        CD_FLAG: "",
    };

    const serviceLib = new ServiceLib();
    serviceLib.loginConfirm();
    const serviceS051901_FACIN_LIST = new ServiceS051901_FACIN_LIST();

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
    const search_LIST_1 = () => {
        var tObj = { ...dataQRY_KSV_PO_MRP };

        setLoadingTBL_KSV_PO_MRP2(true);

        // 2
        serviceS051901_FACIN_LIST.mgrQuery_LIST_1(tObj).then((data) => {
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

    const search_LIST_2 = (argData) => {
        var tObj = {};
        tObj.PU_CD = argData.PU_CD;

        setLoadingTBL_KSV_PO_MRP2(true);

        // 4_2
        serviceS051901_FACIN_LIST.mgrQuery_LIST_2(tObj).then((data) => {
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

    const process_UPDATE_LOCATION = () => {
        if (selectedTBL_KSV_PO_MRP2.length <= 0) {
            alert("작업할 데이타를 선택하세요");
            return;
        }

        var tObj0 = [...selectedTBL_KSV_PO_MRP2];

        var tIdx = 0;
        var tArray = [];
        for (tIdx = 0; tIdx < tObj0.length; tIdx++) {
            var tObj = { ...tObj0[tIdx] };
            Object.keys(tObj).forEach((col, i) => {
                if (tObj[`${col}`] === null || tObj[`${col}`] === " ") {
                    tObj[`${col}`] = "";
                }
            });
            delete tObj.id;
            delete tObj.__typename;
            tArray.push(tObj);
        }

        setLoadingTBL_KSV_PO_MRP2(true);
        serviceS051901_FACIN_LIST
            .mgrInsert_UPDATE_LOCATION(tArray)
            .then((data) => {
                setLoadingTBL_KSV_PO_MRP2(false);
                if (typeof data.graphQLErrors === "undefined") {
                    if (data.length > 0) {
                        alert(data[0].CODE);
                        if (data[0].CODE.includes("SUCC")) {
                            search_LIST_1();
                        }
                    }
                } else {
                    toast.current.show({
                        severity: "success",
                        summary: "Error: Update Location",
                        detail: "",
                        life: 3000,
                    });
                }
            });
    };

    const process_CANCEL_FACIN = () => {
        if (selectedTBL_KSV_PO_MRP2.length <= 0) {
            alert("작업할 데이타를 선택하세요");
            return;
        }

        var tObj0 = [...selectedTBL_KSV_PO_MRP2];

        var tIdx = 0;
        var tArray = [];
        for (tIdx = 0; tIdx < tObj0.length; tIdx++) {
            var tObj = { ...tObj0[tIdx] };
            Object.keys(tObj).forEach((col, i) => {
                if (tObj[`${col}`] === null || tObj[`${col}`] === " ") {
                    tObj[`${col}`] = "";
                }
            });
            delete tObj.id;
            delete tObj.__typename;
            tArray.push(tObj);
        }

        setLoadingTBL_KSV_PO_MRP2(true);
        serviceS051901_FACIN_LIST
            .mgrInsert_CANCEL_FACIN(tArray)
            .then((data) => {
                setLoadingTBL_KSV_PO_MRP2(false);
                if (typeof data.graphQLErrors === "undefined") {
                    if (data.length > 0) {
                        alert(data[0].CODE);
                        if (data[0].CODE.includes("SUCC")) {
                            search_LIST_1();
                        }
                    }
                } else {
                    toast.current.show({
                        severity: "success",
                        summary: "Error: Update Location",
                        detail: "",
                        life: 3000,
                    });
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

    /* QRY KSV_PO_MRP*/
    let emptyQRY_KSV_PO_MRP = {
        IS_BVT: "",
        IS_ETP: "",
        STATUS_CD: "",
        BUYER_CD: "",
        BL_NO: "",
        PU_NO: "",

        S_ATA: "",
        E_ATA: "",
        USER_ID: "",
        MC_ID: "",
        PO_CD: "",
        SHIPMENT_CD: "",
        CUSTOMS_NO: "",
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

    const onCheckboxChangeQRY_KSV_PO_MRP_IS_BVT = (e, name) => {
        let val = "";
        let _dataQRY_KSV_PO_MRP = { ...dataQRY_KSV_PO_MRP };
        if (e.checked) {
            val = "1";
        } else {
            val = "0";
        }
        _dataQRY_KSV_PO_MRP[`${name}`] = val;
        setDataQRY_KSV_PO_MRP(_dataQRY_KSV_PO_MRP);
    };

    const onCheckboxChangeQRY_KSV_PO_MRP_IS_ETP = (e, name) => {
        let val = "";
        let _dataQRY_KSV_PO_MRP = { ...dataQRY_KSV_PO_MRP };
        if (e.checked) {
            val = "1";
        } else {
            val = "0";
        }
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

    const onInputChangeQRY_KSV_PO_MRP_SHIPMENT_CD = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_PO_MRP = { ...dataQRY_KSV_PO_MRP };

        let tTypeVal = _dataQRY_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string") _dataQRY_KSV_PO_MRP[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_PO_MRP[`${name}`] = parseInt(val);

        setDataQRY_KSV_PO_MRP(_dataQRY_KSV_PO_MRP);
    };

    const onInputChangeQRY_KSV_PO_MRP_CUSTOMS_NO = (e, name) => {
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

    const onInputChangeQRY_KSV_PO_MRP_MC_ID = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_PO_MRP = { ...dataQRY_KSV_PO_MRP };

        let tTypeVal = _dataQRY_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string") _dataQRY_KSV_PO_MRP[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_PO_MRP[`${name}`] = parseInt(val);

        setDataQRY_KSV_PO_MRP(_dataQRY_KSV_PO_MRP);
    };

    const onInputChangeQRY_KSV_PO_MRP_BL_NO = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_PO_MRP = { ...dataQRY_KSV_PO_MRP };

        let tTypeVal = _dataQRY_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string") _dataQRY_KSV_PO_MRP[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_PO_MRP[`${name}`] = parseInt(val);

        setDataQRY_KSV_PO_MRP(_dataQRY_KSV_PO_MRP);
    };

    const onInputChangeQRY_KSV_PO_MRP_PU_NO = (e, name) => {
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

    const onRowDoubleClickTBL_KSV_PO_MRP2 = (event) => {
        var tRemark = "";
        var tColName = "";
        var tKeys = Object.keys(event.data);
        tKeys.forEach((col, i) => {
            var tValue = event.data[`${col}`];
            if (tValue === event.originalEvent.target.innerText) {
                if (tColName === "" && tValue !== "") tColName = col;
            }
        });

        console.log("Col Name:" + tColName);
        if (tColName === "FILE_NAME") {
            serviceLib.downloadFile(event.data.FILE_URL, event.data.FILE_NAME);
        }

        /*
        var tUrl2 = `S0519_INSPECT_REPORT?STSOUT_CD=${event.data.STSOUT_CD}`;
        var tValObj =  { key: '5-3', label: 'Insepection Record', url: 'S0519_INSPECT_REPORT'  };
        var tArgObj = { ...tValObj };
        tArgObj.url1 = tUrl2;
        var tFuncObj = {};
        tFuncObj.func = 'call_url'; 
        tFuncObj.message = { ...tArgObj };
        window.parent.postMessage(tFuncObj, "*");
        */
    };

    const popup_FACIN = () => {
        if (selectedTBL_KSV_PO_MRP2.length <= 0) {
            alert("작업할 데이타를 선택하세요");
            return;
        }

        var tStr = "";
        selectedTBL_KSV_PO_MRP2.forEach((col, i) => {
            tStr += `${col.STSOUT_CD}|`;
        });

        var tUrl2 = `S0519_INSPECT_REPORT?STSOUT_CD=${tStr}`;
        var tValObj = {
            key: "5-3",
            label: "Insepection Record",
            url: "S0519_INSPECT_REPORT",
        };
        var tArgObj = { ...tValObj };
        tArgObj.url1 = tUrl2;
        var tFuncObj = {};
        tFuncObj.func = "call_url";
        tFuncObj.message = { ...tArgObj };
        window.parent.postMessage(tFuncObj, "*");
    };

    const searchTBL_KSV_PO_MRP = () => {
        clearSelectedTBL_KSV_PO_MRP();

        serviceS051901_FACIN_LIST
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

    const clearSelectedTBL_KSV_PO_MRP1 = () => {
        setSelectedTBL_KSV_PO_MRP1([]);
        setFlagSelectModeTBL_KSV_PO_MRP1(false);
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
            tObj.Facin_Date = col.FACIN_DATE;
            tObj.CLEARANCE_NO = col.CLEARANCE_NO;
            tObj.Buyer = col.BUYER_CD;
            tObj.Po = col.PO_CD;
            tObj.Supplier = col.VENDOR_NAME;
            tObj.Matl = col.MATL_CD;
            tObj.Description = col.MATL_NAME;
            tObj.Color = col.COLOR;
            tObj.Spec = col.SPEC;
            tObj.Unit = col.UNIT;
            tObj.Po_Qty = col.PO_QTY;
            tObj.Packing_Qty = col.PACKING_QTY;
            tObj.Ship_Qty = col.S_OUT_QTY;
            tObj.Shortage_Qty = col.SHORTAGE_QTY;
            tObj.Defect_Qty = col.DEFECT_QTY;
            tObj.Facin_Qty = col.FACIN_QTY;
            tObj.Report = col.FILE_NAME;
            tObj.Location = col.LOCATION;
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
        rowData[field] = newValue;

        /*
        var tS_OUT_QTY = parseFloat(rowData['S_OUT_QTY']);
        var tFACIN_QTY = parseFloat(rowData['FACIN_QTY']);
        var tBAL_QTY = 0;
        if (field === 'SHORTAGE_QTY') {
            var tDEFECT_QTY = parseFloat(rowData['DEFECT_QTY']) * -1;
            var tSHORTAGE_QTY = parseFloat(newValue);
            tBAL_QTY = tS_OUT_QTY + (tDEFECT_QTY  + tSHORTAGE_QTY + tFACIN_QTY);
        }
        if (field === 'DEFECT_QTY') {
            var tSHORTAGE_QTY = parseFloat(rowData['SHORTAGE_QTY']);
            var tDEFECT_QTY = parseFloat(newValue) * -1;
            tBAL_QTY = tS_OUT_QTY + (tDEFECT_QTY  + tSHORTAGE_QTY + tFACIN_QTY);
        }
        rowData['BAL_QTY'] = String(tBAL_QTY);
        */
    };

    /* QRY KSV_PO_MRP*/
    let emptyEDT_KSV_PO_MRP = {
        FILE_NAME: "",
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

    const onInputChangeEDT_KSV_PO_MRP_FILE_NAME = (e, name) => {
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
        if (tSelArray.length <= 0) {
            alert("작업할 데이타를 선택하세요");
            return;
        }

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
        var tObj = {};
        serviceS051901_FACIN_LIST.mgrQuery_CODE(tObj).then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                setDatasQRY_KSV_PO_MRP_STATUS_CD(data.STATUS_CD);
                setDataQRY_KSV_PO_MRP_STATUS_CD(data.STATUS_CD[0]);

                var tRetDate = serviceLib.getCurrDate().substring(0, 8);
                var tQry = { ...dataQRY_KSV_PO_MRP };
                tQry.S_ATA = `${tRetDate.substring(0, 4)}0101`;
                tQry.E_ATA = `${tRetDate.substring(0, 4)}1231`;
                setDataQRY_KSV_PO_MRP(tQry);
            } else {
                console.log(
                    "mgrQuery_PO_CD error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });
        // search_LIST_1();
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

    // GUIDE: 에디터 컴포넌트에 onKeyDown 이벤트를 연결한다.
    const onChangeTextEdit = (e, options) => {
        options.editorCallback(e.target.value);
    };

    const handleFocus = (event) => event.target.select();

    const cellEditorKSV_PO_MRP2 = (options) => {
        return textEditor(options);
    };

    const textEditor = (options) => {
        return (
            <InputText
                type="text"
                value={options.value}
                onChange={(e) => onChangeTextEdit(e, options)}
                onFocus={handleFocus}
            />
        );
    };

    return (
        <div className="af-div-main">
            <div
                className="af-div-first"
                style={{ width: "123rem", height: "8rem" }}
            >
                <span className="af-span-3-0" style={{ width: "7rem" }}>
                    <p className="af-span-p" style={{ width: "4rem" }}>
                        {" "}
                        {serviceLib.getLocaleMessage(
                            "id_msg_BVT_ORDER_CD",
                        )}{" "}
                    </p>
                    <div className="af-span-checkbox">
                        <Checkbox
                            id="id_IS_MAIN"
                            checked={changeCheckBoxVal(
                                dataQRY_KSV_PO_MRP.IS_BVT,
                            )}
                            onChange={(e) =>
                                onCheckboxChangeQRY_KSV_PO_MRP_IS_BVT(
                                    e,
                                    "IS_BVT",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "7rem" }}>
                    <p className="af-span-p" style={{ width: "4rem" }}>
                        {" "}
                        {serviceLib.getLocaleMessage(
                            "id_msg_ETP_ORDER_CD",
                        )}{" "}
                    </p>
                    <div className="af-span-checkbox">
                        <Checkbox
                            id="id_IS_MAIN"
                            checked={changeCheckBoxVal(
                                dataQRY_KSV_PO_MRP.IS_ETP,
                            )}
                            onChange={(e) =>
                                onCheckboxChangeQRY_KSV_PO_MRP_IS_ETP(
                                    e,
                                    "IS_ETP",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "18rem" }}>
                    <p className="af-span-p" style={{ width: "7rem" }}>
                        {" "}
                        {serviceLib.getLocaleMessage(
                            "id_msg_Status_STATUS_CD",
                        )}{" "}
                    </p>
                    <div className="af-span-div" style={{ width: "10rem" }}>
                        <Dropdown
                            style={{ width: "10rem" }}
                            id="id_STATUS_CD"
                            value={dataQRY_KSV_PO_MRP_STATUS_CD}
                            onChange={(e) =>
                                onDropdownChangeQRY_KSV_PO_MRP_STATUS_CD(
                                    e,
                                    "STATUS_CD",
                                )
                            }
                            options={datasQRY_KSV_PO_MRP_STATUS_CD}
                            optionLabel="CD_NAME"
                            placeholder=""
                            editable
                        ></Dropdown>
                    </div>
                </span>
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
                            "id_msg_BL#_ORDER_CD",
                        )}{" "}
                    </p>
                    <div className="af-span-div" style={{ width: "9rem" }}>
                        <InputText
                            style={{ width: "9rem" }}
                            id="id_TARGET_ETA"
                            value={dataQRY_KSV_PO_MRP.BL_NO}
                            onChange={(e) =>
                                onInputChangeQRY_KSV_PO_MRP_BL_NO(e, "BL_NO")
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "17rem" }}>
                    <p className="af-span-p" style={{ width: "7rem" }}>
                        {" "}
                        {serviceLib.getLocaleMessage(
                            "id_msg_PU#_ORDER_CD",
                        )}{" "}
                    </p>
                    <div className="af-span-div" style={{ width: "9rem" }}>
                        <InputText
                            style={{ width: "9rem" }}
                            id="id_TARGET_ETA"
                            value={dataQRY_KSV_PO_MRP.PU_NO}
                            onChange={(e) =>
                                onInputChangeQRY_KSV_PO_MRP_PU_NO(e, "PU_NO")
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "10rem" }}>
                    <div className="af-span-div" style={{ width: "9rem" }}>
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
                    <div className="af-span-div" style={{ width: "9rem" }}>
                        <Button
                            label="Reset"
                            style={{ width: "9rem" }}
                            className="p-button-text"
                            onClick={process_RESET}
                        />
                    </div>
                </span>

                <span className="af-span-3" style={{ width: "33rem" }}>
                    <p className="af-span-p" style={{ width: "4rem" }}>
                        {" "}
                        {serviceLib.getLocaleMessage(
                            "id_msg_ATA_ORDER_CD",
                        )}{" "}
                    </p>
                    <div className="af-span-div" style={{ width: "9rem" }}>
                        <Calendar
                            showButtonBar
                            style={{ width: "9rem" }}
                            dateFormat="yy-mm-dd"
                            id="id_ETA"
                            value={changeDateVal(dataQRY_KSV_PO_MRP.S_ATA)}
                            onChange={(e) =>
                                onCalChangeQRY_KSV_PO_MRP_S_ATA(e, "S_ATA")
                            }
                        />
                    </div>
                    <p className="af-span-p" style={{ width: "1rem" }}>
                        {" "}
                        {serviceLib.getLocaleMessage("id_msg_~_ORDER_CD")}{" "}
                    </p>
                    <div className="af-span-div" style={{ width: "9rem" }}>
                        <Calendar
                            showButtonBar
                            style={{ width: "9rem" }}
                            dateFormat="yy-mm-dd"
                            id="id_ETA"
                            value={changeDateVal(dataQRY_KSV_PO_MRP.E_ATA)}
                            onChange={(e) =>
                                onCalChangeQRY_KSV_PO_MRP_E_ATA(e, "E_ATA")
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "17rem" }}>
                    <p className="af-span-p" style={{ width: "7rem" }}>
                        {" "}
                        {serviceLib.getLocaleMessage(
                            "id_msg_Purchaser_ORDER_CD",
                        )}{" "}
                    </p>
                    <div className="af-span-div" style={{ width: "9rem" }}>
                        <InputText
                            style={{ width: "9rem" }}
                            id="id_TARGET_ETA"
                            value={dataQRY_KSV_PO_MRP.USER_ID}
                            onChange={(e) =>
                                onInputChangeQRY_KSV_PO_MRP_USER_ID(
                                    e,
                                    "USER_ID",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "17rem" }}>
                    <p className="af-span-p" style={{ width: "7rem" }}>
                        {" "}
                        {serviceLib.getLocaleMessage("id_msg_MC_ORDER_CD")}{" "}
                    </p>
                    <div className="af-span-div" style={{ width: "9rem" }}>
                        <InputText
                            style={{ width: "9rem" }}
                            id="id_TARGET_ETA"
                            value={dataQRY_KSV_PO_MRP.MC_ID}
                            onChange={(e) =>
                                onInputChangeQRY_KSV_PO_MRP_MC_ID(e, "MC_ID")
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "17rem" }}>
                    <p className="af-span-p" style={{ width: "7rem" }}>
                        {" "}
                        {serviceLib.getLocaleMessage("id_msg_PO_ORDER_CD")}{" "}
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
                <span className="af-span-3" style={{ width: "10rem" }}>
                    <div className="af-span-div" style={{ width: "9rem" }}>
                        <Button
                            label="Excel"
                            style={{ width: "9rem" }}
                            className="p-button-text green"
                            onClick={exportExcelTBL_KSV_PO_MRP2}
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "10rem" }}>
                    <div className="af-span-div" style={{ width: "9rem" }}>
                        <Button
                            label="FAC IN"
                            style={{ width: "9rem" }}
                            className="p-button-text"
                            onClick={popup_FACIN}
                        />
                    </div>
                </span>

                <span className="af-span-3" style={{ width: "33rem" }}>
                    <p className="af-span-p" style={{ width: "7rem" }}>
                        {" "}
                        {serviceLib.getLocaleMessage(
                            "id_msg_Shipment#_ORDER_CD",
                        )}{" "}
                    </p>
                    <div className="af-span-div" style={{ width: "9rem" }}>
                        <InputText
                            style={{ width: "9rem" }}
                            id="id_TARGET_ETA"
                            value={dataQRY_KSV_PO_MRP.SHIPMENT_CD}
                            onChange={(e) =>
                                onInputChangeQRY_KSV_PO_MRP_SHIPMENT_CD(
                                    e,
                                    "SHIPMENT_CD",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "17rem" }}>
                    <p className="af-span-p" style={{ width: "7rem" }}>
                        {" "}
                        {serviceLib.getLocaleMessage(
                            "id_msg_Customs#_ORDER_CD",
                        )}{" "}
                    </p>
                    <div className="af-span-div" style={{ width: "9rem" }}>
                        <InputText
                            style={{ width: "9rem" }}
                            id="id_TARGET_ETA"
                            value={dataQRY_KSV_PO_MRP.CUSTOMS_NO}
                            onChange={(e) =>
                                onInputChangeQRY_KSV_PO_MRP_CUSTOMS_NO(
                                    e,
                                    "CUSTOMS_NO",
                                )
                            }
                        />
                    </div>
                </span>
            </div>

            <div
                className="af-div-first"
                style={{ width: "123rem", height: "51rem" }}
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
                    metaKeySelection={false}
                    showGridlines
                    selectionMode="multiple"
                    selection={selectedTBL_KSV_PO_MRP2}
                    onSelectionChange={(e) => {
                        setFlagSelectModeTBL_KSV_PO_MRP2(true);
                        setSelectedTBL_KSV_PO_MRP2(e.value);
                        console.log(
                            "selected length:" + selectedTBL_KSV_PO_MRP2.length,
                        );
                        onRowClick1TBL_KSV_PO_MRP2(e.value);
                    }}
                    onRowClick={onRowClickTBL_KSV_PO_MRP2}
                    dataKey="id"
                    className="datatable-responsive"
                    onRowDoubleClick={onRowDoubleClickTBL_KSV_PO_MRP2}
                    virtualScrollerOptions={{ itemSize: 20 }}
                    emptyMessage=" " //header={headerTBL_KSV_PO_MRP2}
                    responsiveLayout="scroll"
                    scrollable
                    scrollHeight="54rem"
                >
                    <AFColumn
                        field="ATA"
                        headerClassName="t-header"
                        header={serviceLib.getLocaleMessage(
                            "id_msg_ATA_OP_KIND",
                        )}
                        style={{ width: "8rem", flexBasis: "auto" }}
                        body={(rowData) => serviceLib.dateFormat(rowData.ATA)}
                    ></AFColumn>
                    <AFColumn
                        field="STATUS_CD_N"
                        headerClassName="t-header"
                        header={serviceLib.getLocaleMessage(
                            "id_msg_Status_OP_KIND",
                        )}
                        style={{ width: "6rem", flexBasis: "auto" }}
                    ></AFColumn>
                    <AFColumn
                        field="BUYER_CD"
                        headerClassName="t-header"
                        header={serviceLib.getLocaleMessage(
                            "id_msg_Buyer#_OP_KIND",
                        )}
                        style={{ width: "6rem", flexBasis: "auto" }}
                    ></AFColumn>
                    <AFColumn
                        field="VENDOR_NAME"
                        headerClassName="t-header"
                        header={serviceLib.getLocaleMessage(
                            "id_msg_Supplier_OP_KIND",
                        )}
                        style={{ width: "10rem", flexBasis: "auto" }}
                    ></AFColumn>
                    <AFColumn
                        field="USER_ID"
                        headerClassName="t-header"
                        header={serviceLib.getLocaleMessage(
                            "id_msg_Purchaser_OP_KIND",
                        )}
                        style={{ width: "10rem", flexBasis: "auto" }}
                    ></AFColumn>
                    <AFColumn
                        field="SHIP_MODE_N"
                        headerClassName="t-header"
                        header={serviceLib.getLocaleMessage(
                            "id_msg_Ship Mode_OP_KIND",
                        )}
                        style={{ width: "10rem", flexBasis: "auto" }}
                    ></AFColumn>
                    <AFColumn
                        field="CLEARANCE_NO"
                        headerClassName="t-header"
                        header={serviceLib.getLocaleMessage(
                            "id_msg_Customs#_OP_KIND",
                        )}
                        style={{ width: "10rem", flexBasis: "auto" }}
                    ></AFColumn>
                    <AFColumn
                        field="BL_NO"
                        headerClassName="t-header"
                        header={serviceLib.getLocaleMessage(
                            "id_msg_B/L#_OP_KIND",
                        )}
                        style={{ width: "10rem", flexBasis: "auto" }}
                    ></AFColumn>
                    <AFColumn
                        field="ORIGIN_PORT"
                        headerClassName="t-header"
                        header={serviceLib.getLocaleMessage(
                            "id_msg_Origin_OP_KIND",
                        )}
                        style={{ width: "10rem", flexBasis: "auto" }}
                    ></AFColumn>
                    <AFColumn
                        field="WEIGHT"
                        headerClassName="t-header"
                        header={serviceLib.getLocaleMessage(
                            "id_msg_Weight_OP_KIND",
                        )}
                        style={{ width: "10rem", flexBasis: "auto" }}
                    ></AFColumn>
                    <AFColumn
                        field="CBM"
                        headerClassName="t-header"
                        header={serviceLib.getLocaleMessage(
                            "id_msg_CBM_OP_KIND",
                        )}
                        style={{ width: "10rem", flexBasis: "auto" }}
                    ></AFColumn>
                    <AFColumn
                        field="CT_NO"
                        headerClassName="t-header"
                        header={serviceLib.getLocaleMessage(
                            "id_msg_C/T#_OP_KIND",
                        )}
                        style={{ width: "10rem", flexBasis: "auto" }}
                    ></AFColumn>
                    <AFColumn
                        field="FILE_NAME"
                        headerClassName="t-header"
                        header={serviceLib.getLocaleMessage(
                            "id_msg_Report_OP_KIND",
                        )}
                        style={{ width: "10rem", flexBasis: "auto" }}
                    ></AFColumn>
                    <AFColumn
                        field="MC_ID"
                        headerClassName="t-header"
                        header={serviceLib.getLocaleMessage(
                            "id_msg_M/C_OP_KIND",
                        )}
                        style={{ width: "10rem", flexBasis: "auto" }}
                    ></AFColumn>
                    <AFColumn
                        field="PO_CD"
                        headerClassName="t-header"
                        header={serviceLib.getLocaleMessage(
                            "id_msg_PO#_OP_KIND",
                        )}
                        style={{ width: "10rem", flexBasis: "auto" }}
                    ></AFColumn>
                    <AFColumn
                        field="PU_CD"
                        headerClassName="t-header"
                        header={serviceLib.getLocaleMessage(
                            "id_msg_PU#_OP_KIND",
                        )}
                        style={{ width: "10rem", flexBasis: "auto" }}
                    ></AFColumn>
                    <AFColumn
                        field="SHIPMENT_CD"
                        headerClassName="t-header"
                        header={serviceLib.getLocaleMessage(
                            "id_msg_Shipment#_OP_KIND",
                        )}
                        style={{ width: "10rem", flexBasis: "auto" }}
                    ></AFColumn>
                    <AFColumn
                        field="FACTORY_CD"
                        headerClassName="t-header"
                        header={serviceLib.getLocaleMessage(
                            "id_msg_Factory_OP_KIND",
                        )}
                        style={{ width: "10rem", flexBasis: "auto" }}
                    ></AFColumn>
                </AFDataTable>
            </div>

            {/*
            <div className="af-div-first" style={{ width: '123rem', height: '4rem' }}>
                <span className="af-span-3-0" style={{ width: '13rem' }}>
                    <div className="af-span-div-btn" style={{ width: '12rem' }}>
                        <Button style={{ width: '12rem' }} label="Cancel FacIn"  className="p-button-text" onClick={process_CANCEL_FACIN} />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: '13rem' }}>
                    <div className="af-span-div-btn" style={{ width: '12rem' }}>
                        <Button style={{ width: '12rem' }} label="Location Update"  className="p-button-text green" onClick={process_UPDATE_LOCATION} />
                    </div>
                </span>
            </div>
            */}

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

export default React.memo(S051901_FACIN_LIST, comparisonFn);
