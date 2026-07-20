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

import axios from "axios";
import apiOption from "../assets/env_graphql";

import { ServiceLib } from "../service/service_lib/ServiceLib";
import { ServiceS0518_FACTORY_ARRIVAL } from "../service/service_biz/ServiceS0518_FACTORY_ARRIVAL";

import "./page_common.scss";

const emptyKCD_CODE = {
    id: 0,
    CD_GROUP: "",
    CD_CODE: "",
    CD_NAME: "",
    CD_FLAG: "",
};

const emptyQRY_KSV_PO_MRP = {
    STATUS_CD: "1",
    SHIP_MODE: "",
    ORIGIN_PORT: "",
    DESTINATION: "",
    S_ETA: "",
    E_ETA: "",
    REMARK: "",
    BL_NO: "",
    CUSTOMER_NO: "",
    INVOICE_NO: "",
};

const emptyQRY_KSV_PO_MRP2 = {
    IN_QTY: "",
};

const emptyTBL_KSV_PO_MRP = {
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

const emptyTBL_KSV_PO_MRP1 = {
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

const emptyTBL_KSV_PO_MRP2 = {
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

const emptyEDT_KSV_PO_MRP = {
    CUSTOMER_NO: "",
    CUSTOMER_FILE: "",
    ARRIVAL_DATE: "",
};

const S0518_FACTORY_ARRIVAL = () => {
    const serviceLibRef = useRef(null);
    if (!serviceLibRef.current) {
        serviceLibRef.current = new ServiceLib();
        serviceLibRef.current.loginConfirm();
    }
    const serviceLib = serviceLibRef.current;
    const serviceS0518_FACTORY_ARRIVALRef = useRef(null);
    if (!serviceS0518_FACTORY_ARRIVALRef.current) serviceS0518_FACTORY_ARRIVALRef.current = new ServiceS0518_FACTORY_ARRIVAL();
    const serviceS0518_FACTORY_ARRIVAL = serviceS0518_FACTORY_ARRIVALRef.current;

    const toast = useRef(null);

    // File
    const [dataUrlFile1, setDataUrlFile1] = useState("");

    /* splitter 관련 */
    const [styleVal, setStyleVal] = useState({ width: "65vw" });

    //
    const [factoryInfo, setFactoryInfo] = useState("");
    const [urlIframe, setUrlIframe] = useState("");
    const [createDialog, setCreateDialog] = useState(false);
    const hideDialog = () => {
        setCreateDialog(false);
    };

    // Search

    // Search KSV_STOCK_MEM
    const search_LIST_1 = (argData, saveData) => {
        setSelectedTBL_KSV_PO_MRP2([]);
        setDatasTBL_KSV_PO_MRP2([]);
        setDataEDT_KSV_PO_MRP(emptyEDT_KSV_PO_MRP);

        var tObj = {};
        if (typeof argData.REMARK !== "undefined") {
            // alert(JSON.stringify(argData, null, 4));
            tObj = { ...argData };
        } else tObj = { ...dataQRY_KSV_PO_MRP };

        tObj.FACTORY = tObj.FACTORY || factoryInfo;

        setLoadingTBL_KSV_PO_MRP(true);

        // 3_1
        serviceS0518_FACTORY_ARRIVAL.mgrQuery_LIST_1(tObj).then((data) => {
            setLoadingTBL_KSV_PO_MRP(false);
            if (typeof data.graphQLErrors === "undefined") {
                var tArray = data.map((col, i) => {
                    var tObj = { ...col };
                    tObj.id = i + 1;
                    return tObj;
                });
                if (!saveData) setDatasTBL_KSV_PO_MRP(tArray);
                else {
                    var tArray1 = [];
                    saveData.forEach((col, i) => {
                        var tCheck = 0;
                        var tFindObj = 0;
                        tArray.forEach((col1, i1) => {
                            if (col.REMARK === col1.REMARK) {
                                tCheck = 1;
                                tFindObj = { ...col1 };
                            }
                        });
                        if (tArray.length <= 0 && col.REMARK === tObj.REMARK);
                        else {
                            if (tCheck === 0) tArray1.push(col);
                            else tArray1.push(tFindObj);
                        }
                    });

                    var tArray2 = [];
                    tArray1.forEach((col, i) => {
                        var tObj = { ...col };
                        tObj.id = i + 1;
                        tArray2.push(tObj);
                    });
                    setDatasTBL_KSV_PO_MRP(tArray2);
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
        tObj.SHIPMENT_CD = argData.SHIPMENT_CD;
        tObj.PACK_CD = argData.REMARK;

        setLoadingTBL_KSV_PO_MRP2(true);

        // 3_2
        serviceS0518_FACTORY_ARRIVAL.mgrQuery_LIST_2(tObj).then((data) => {
            setLoadingTBL_KSV_PO_MRP2(false);
            if (typeof data.graphQLErrors === "undefined") {
                var tArray = data.map((col, i) => {
                    var tObj = { ...col };
                    tObj.id = i + 1;
                    var tShipQty =
                        parseFloat(tObj.OUT_QTY) - parseFloat(tObj.ERR_QTY);
                    tObj.SHIP_QTY = String(tShipQty);
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

    const process_CUSTOMER_NO = () => {
        var tInput0 = { ...dataEDT_KSV_PO_MRP };
        var tInput = [...selectedTBL_KSV_PO_MRP];

        console.log(selectedTBL_KSV_PO_MRP.length);

        if (!selectedTBL_KSV_PO_MRP.length) {
            alert("대상을 선택하세요.<br><br>Please select a destination.");
            return;
        }
        if (selectedTBL_KSV_PO_MRP.length > 1) {
            alert("한개만 선태가능합니다<br><br>Only one can be selected");
            return;
        }
        if (tInput.SHIP_STATUS_N === "Not Fixed") {
            alert("Not Fixed는 작업할수 없습니다<br><br>Not Fixed cannot be operated");
            return;
        }

        var tObjs = tInput.map((col, i) => {
            var tObj = { ...col };
            if (typeof tObj.__typename !== "undefined") delete tObj.__typename;
            if (typeof tObj.id !== "undefined") delete tObj.id;
            return tObj;
        });

        setLoadingTBL_KSV_PO_MRP(true);
        serviceS0518_FACTORY_ARRIVAL
            .mgrUpdate_CUSTOMER_NO(tInput0, tObjs)
            .then((data) => {
                setLoadingTBL_KSV_PO_MRP(false);
                if (typeof data.graphQLErrors === "undefined") {
                    if (data.length > 0) {
                        alert(data[0].CODE);
                        setSelectedTBL_KSV_PO_MRP([]);
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

    const process_ARRIVAL = () => {
        var tInput0 = { ...dataEDT_KSV_PO_MRP };
        var tInput = [...selectedTBL_KSV_PO_MRP];

        if (!selectedTBL_KSV_PO_MRP.length) {
            alert("대상을 선택하세요.<br><br>Please select a destination.");
            return;
        }
        if (selectedTBL_KSV_PO_MRP.length > 1) {
            alert("한개만 선태가능합니다<br><br>Only one can be selected");
            return;
        }

        var tSelObj = { ...selectedTBL_KSV_PO_MRP[0] };
        if (
            tSelObj.SHIP_STATUS_N === "Fixed" ||
            tSelObj.SHIP_STATUS_N === "Discharged"
        ) {
        } else {
            /*
            alert(`Allowed only for Fix or Discharged status`);
            return;
            */
            ;
        }

        var tObjs = tInput.map((col, i) => {
            var tObj = { ...col };
            if (typeof tObj.__typename !== "undefined") delete tObj.__typename;
            if (typeof tObj.id !== "undefined") delete tObj.id;
            return tObj;
        });

        var tInput2 = [];
        datasTBL_KSV_PO_MRP2.forEach((col, i) => {
            var tObj = { ...col };
            if (typeof tObj.__typename !== "undefined") delete tObj.__typename;
            if (typeof tObj.id !== "undefined") delete tObj.id;

            var tInObj = {};
            tInObj.PO_CD = tObj.PO_CD; 
            tInObj.MATL_CD = tObj.MATL_CD; 
            tInObj.MATL_NAME = tObj.MATL_NAME; 
            tInObj.COLOR = tObj.COLOR; 
            tInObj.SPEC = tObj.SPEC; 
            tInObj.UNIT = tObj.UNIT; 
            tInObj.S_OUT_QTY = tObj.OUT_QTY; 
            tInObj.SHORTAGE_QTY =  '0';
            tInObj.DEFECT_QTY =  '0';; 
            tInObj.FACIN_QTY = tObj.OUT_QTY; 
            tInObj.LOCATION =  '';
            tInObj.STSOUT_CD = tObj.STSOUT_CD; 
            tInObj.FILE_NAME = ''; 
            tInObj.FILE_URL = ''; 
            tInObj.FILE_OBJECT = ''; 
            tInObj.IN_DATE = tObj.READY_DATE; 
            tInObj.FACIN_DATE = tInput0.ARRIVAL_DATE;  
            tInObj.PACK_CD = tObj.PACK_CD;
            tInObj.CUSTOMS_NO = tInput0.CUSTOMER_NO;
            tInObj.CT_QTY = tInput.S_CT_QTY;  
            tInObj.WEIGHT = tInput.S_WEIGHT; 
            tInObj.CBM = tInput.S_CBM; 
            tInObj.PU_CD = tObj.PU_CD; 
            tInput2.push(tInObj);
        });

        setLoadingTBL_KSV_PO_MRP(true);
        serviceS0518_FACTORY_ARRIVAL
            .mgrUpdate_ARRIVAL(tInput0, tObjs, tInput2)
            .then((data) => {
                setLoadingTBL_KSV_PO_MRP(false);
                if (typeof data.graphQLErrors === "undefined") {
                    if (data.length > 0) {
                        alert(data[0].CODE);
                        // setDatasTBL_KSV_PO_MRP([]);
                        setSelectedTBL_KSV_PO_MRP([]);
                        setDatasTBL_KSV_PO_MRP2([]);

                        var tQryObj = { ...dataQRY_KSV_PO_MRP };
                        tQryObj.REMARK = tSelObj.REMARK;
                        search_LIST_1(tQryObj, datasTBL_KSV_PO_MRP);
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

    const process_FIXED = () => {
        var tInput0 = { ...dataEDT_KSV_PO_MRP };
        var tInput = [...selectedTBL_KSV_PO_MRP];

        if (!selectedTBL_KSV_PO_MRP.length) {
            alert("대상을 선택하세요.<br><br>Please select a destination.");
            return;
        }
        if (selectedTBL_KSV_PO_MRP.length > 1) {
            alert("한개만 선태가능합니다<br><br>Only one can be selected");
            return;
        }

        var tSelObj = { ...selectedTBL_KSV_PO_MRP[0] };
        if (tSelObj.SHIP_STATUS_N !== "Arrival") {
            alert(`Arrival 상태만 작업가능합니다:(${tSelObj.SHIP_STATUS_N})`);
            return;
        }

        var tObjs = tInput.map((col, i) => {
            var tObj = { ...col };
            if (typeof tObj.__typename !== "undefined") delete tObj.__typename;
            if (typeof tObj.id !== "undefined") delete tObj.id;
            return tObj;
        });

        setLoadingTBL_KSV_PO_MRP(true);
        serviceS0518_FACTORY_ARRIVAL
            .mgrUpdate_FIXED(tInput0, tObjs)
            .then((data) => {
                setLoadingTBL_KSV_PO_MRP(false);
                if (typeof data.graphQLErrors === "undefined") {
                    if (data.length > 0) {
                        alert(data[0].CODE);
                        // setDatasTBL_KSV_PO_MRP([]);
                        setSelectedTBL_KSV_PO_MRP([]);
                        setDatasTBL_KSV_PO_MRP2([]);

                        var tQryObj = { ...dataQRY_KSV_PO_MRP };
                        tQryObj.REMARK = tSelObj.REMARK;
                        search_LIST_1(tQryObj, datasTBL_KSV_PO_MRP);
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

    const process_UPDATE_ERROR_QTY = () => {
        if (selectedTBL_KSV_PO_MRP.length <= 0) return;

        var tSelObj = { ...selectedTBL_KSV_PO_MRP[0] };

        var tInput = [];
        selectedTBL_KSV_PO_MRP2.forEach((col, i) => {
            var tObj = { ...col };
            if (typeof tObj.__typename !== "undefined") delete tObj.__typename;
            if (typeof tObj.id !== "undefined") delete tObj.id;
            tObj.ERR_QTY = String(tObj.ERR_QTY);
            tInput.push(tObj);
        });

        setLoadingTBL_KSV_PO_MRP(true);
        serviceS0518_FACTORY_ARRIVAL
            .mgrUpdate_UPDATE_ERROR_QTY(tInput)
            .then((data) => {
                setLoadingTBL_KSV_PO_MRP(false);
                if (typeof data.graphQLErrors === "undefined") {
                    if (data.length > 0) {
                        alert(data[0].CODE);
                        // setSelectedTBL_KSV_PO_MRP([]);
                        search_LIST_2(tSelObj);
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

    /* QRY KSV_PO_MRP*/
    const [dataQRY_KSV_PO_MRP, setDataQRY_KSV_PO_MRP] =
        useState(emptyQRY_KSV_PO_MRP);

    const onInputChangeQRY_KSV_PO_MRP = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_PO_MRP = { ...dataQRY_KSV_PO_MRP };

        let tTypeVal = _dataQRY_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string") _dataQRY_KSV_PO_MRP[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_PO_MRP[`${name}`] = parseInt(val);

        setDataQRY_KSV_PO_MRP(_dataQRY_KSV_PO_MRP);
    };

    const onInputChangeQRY_KSV_PO_MRP_REMARK = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_PO_MRP = { ...dataQRY_KSV_PO_MRP };

        let tTypeVal = _dataQRY_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string") _dataQRY_KSV_PO_MRP[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_PO_MRP[`${name}`] = parseInt(val);

        setDataQRY_KSV_PO_MRP(_dataQRY_KSV_PO_MRP);
    };

    const onInputChangeQRY_KSV_PO_MRP_INVOICE_NO = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_PO_MRP = { ...dataQRY_KSV_PO_MRP };

        let tTypeVal = _dataQRY_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string") _dataQRY_KSV_PO_MRP[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_PO_MRP[`${name}`] = parseInt(val);

        setDataQRY_KSV_PO_MRP(_dataQRY_KSV_PO_MRP);
    };


    const onCalChangeQRY_KSV_PO_MRP_S_ETA = (e, name) => {
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

    const onCalChangeQRY_KSV_PO_MRP_E_ETA = (e, name) => {
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

    const [
        datasQRY_KSV_PO_MRP_ORIGIN_PORT,
        setDatasQRY_KSV_PO_MRP_ORIGIN_PORT,
    ] = useState([]);
    const [dataQRY_KSV_PO_MRP_ORIGIN_PORT, setDataQRY_KSV_PO_MRP_ORIGIN_PORT] =
        useState({});

    const onDropdownChangeQRY_KSV_PO_MRP_ORIGIN_PORT = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataQRY_KSV_PO_MRP = { ...dataQRY_KSV_PO_MRP };

        let tTypeVal = _dataQRY_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_PO_MRP[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_PO_MRP[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_PO_MRP(_dataQRY_KSV_PO_MRP);
        setDataQRY_KSV_PO_MRP_ORIGIN_PORT(e.value);
    };

    const [
        datasQRY_KSV_PO_MRP_DESTINATION,
        setDatasQRY_KSV_PO_MRP_DESTINATION,
    ] = useState([]);
    const [dataQRY_KSV_PO_MRP_DESTINATION, setDataQRY_KSV_PO_MRP_DESTINATION] =
        useState({});

    const onDropdownChangeQRY_KSV_PO_MRP_DESTINATION = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataQRY_KSV_PO_MRP = { ...dataQRY_KSV_PO_MRP };

        let tTypeVal = _dataQRY_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_PO_MRP[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_PO_MRP[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_PO_MRP(_dataQRY_KSV_PO_MRP);
        setDataQRY_KSV_PO_MRP_DESTINATION(e.value);
    };

    const [datasQRY_KSV_PO_MRP_SHIP_MODE, setDatasQRY_KSV_PO_MRP_SHIP_MODE] =
        useState([]);
    const [dataQRY_KSV_PO_MRP_SHIP_MODE, setDataQRY_KSV_PO_MRP_SHIP_MODE] =
        useState({});

    const onDropdownChangeQRY_KSV_PO_MRP_SHIP_MODE = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataQRY_KSV_PO_MRP = { ...dataQRY_KSV_PO_MRP };

        let tTypeVal = _dataQRY_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_PO_MRP[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_PO_MRP[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_PO_MRP(_dataQRY_KSV_PO_MRP);
        setDataQRY_KSV_PO_MRP_SHIP_MODE(e.value);
    };

    const [datasQRY_KSV_PO_MRP_STATUS_CD, setDatasQRY_KSV_PO_MRP_STATUS_CD] =
        useState([]);
    const [dataQRY_KSV_PO_MRP_STATUS_CD, setDataQRY_KSV_PO_MRP_STATUS_CD] =
        useState({});

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

    /* QRY KSV_PO_MRP*/
    const [dataQRY_KSV_PO_MRP2, setDataQRY_KSV_PO_MRP2] =
        useState(emptyQRY_KSV_PO_MRP2);

    /* TABLE KSV_PO_MRP*/
    // DEFINE DATAGRID : TBL_KSV_PO_MRP
    const [loadingTBL_KSV_PO_MRP, setLoadingTBL_KSV_PO_MRP] = useState(false);

    const [datasTBL_KSV_PO_MRP, setDatasTBL_KSV_PO_MRP] = useState([]);
    const dt_TBL_KSV_PO_MRP = useRef(null);
    const [dataTBL_KSV_PO_MRP, setDataTBL_KSV_PO_MRP] =
        useState(emptyTBL_KSV_PO_MRP);
    const [selectedTBL_KSV_PO_MRP, setSelectedTBL_KSV_PO_MRP] = useState([]);
    const [flagSelectModeTBL_KSV_PO_MRP, setFlagSelectModeTBL_KSV_PO_MRP] =
        useState(false);

    // DATAGRID CODE : TBL_KSV_PO_MRP
    const onRowDoubleClickTBL_KSV_PO_MRP = (argData0) => {
        var tClearNo = "";
        var tColName = "";
        var tFileName = "";
        var tFileUrl = "";
        var tKeys = Object.keys(argData0.data);
        tKeys.forEach((col, i) => {
            var tValue = argData0.data[`${col}`];
            if (tValue !== "") {
                if (tValue === argData0.originalEvent.target.innerText) {
                    if (col === "FILE_NAME") {
                        tFileName = argData0.data["FILE_NAME"];
                        tFileUrl = argData0.data["FILE_URL"];
                    }
                    if (col === "BL_FILE") {
                        tFileName = argData0.data["BL_FILE"];
                        tFileUrl = argData0.data["BL_FILE_URL"];
                    }
                    if (col === "PL_FILE") {
                        tFileName = argData0.data["PL_FILE"];
                        tFileUrl = argData0.data["PL_FILE_URL"];
                    }
                    if (col === "CI_FILE") {
                        tFileName = argData0.data["CI_FILE"];
                        tFileUrl = argData0.data["CI_FILE_URL"];
                    }
                }
            }
        });
        if (tFileName !== "" && tFileUrl !== "") {
            serviceLib.downloadFile(tFileUrl, tFileName);
        }
    };

    const onRowClick1TBL_KSV_PO_MRP = (argData0) => {
        var argData = {};

        if (typeof argData0.length !== "undefined") {
            if (argData0.length <= 0) return;
            argData = argData0[0];
        } else {
            argData = argData0;
        }

        let argTBL_KSV_PO_MRP = argData;

        setDataTBL_KSV_PO_MRP(argTBL_KSV_PO_MRP);

        let _url1 = `${window.location.protocol}//${window.location.hostname}:3202/restapi/`;
        var tUrl = `${_url1}fileupload2/arrival/${argData.SHIPMENT_CD}/1`;
        setDataUrlFile1(tUrl);

        var tRetDate = serviceLib.getCurrDate().substring(0, 8);

        var tObj = { ...dataEDT_KSV_PO_MRP };
        tObj.CUSTOMER_NO = argData.CLEARANCE_NO;
        if (argData.ATA !== "") tObj.ARRIVAL_DATE = argData.ATA;
        else tObj.ARRIVAL_DATE = tRetDate;
        setDataEDT_KSV_PO_MRP(tObj);

        search_LIST_2(argData);
        // resetEDT_KSV_PO_MRP(argData);
    };

    const onRowClickTBL_KSV_PO_MRP = (event) => {
        let argTBL_KSV_PO_MRP = event.data;
        if (flagSelectModeTBL_KSV_PO_MRP) return;

        // Service : NawooAll:mgrQueryTBL_KSV_PO_MRP
    };

    /* TABLE KSV_PO_MRP*/
    // DEFINE DATAGRID : TBL_KSV_PO_MRP1
    const [loadingTBL_KSV_PO_MRP1, setLoadingTBL_KSV_PO_MRP1] = useState(false);

    const [datasTBL_KSV_PO_MRP1, setDatasTBL_KSV_PO_MRP1] = useState([]);
    const dt_TBL_KSV_PO_MRP1 = useRef(null);
    const [dataTBL_KSV_PO_MRP1, setDataTBL_KSV_PO_MRP1] =
        useState(emptyTBL_KSV_PO_MRP1);
    const [selectedTBL_KSV_PO_MRP1, setSelectedTBL_KSV_PO_MRP1] = useState([]);
    const [flagSelectModeTBL_KSV_PO_MRP1, setFlagSelectModeTBL_KSV_PO_MRP1] =
        useState(false);

    // DATAGRID CODE : TBL_KSV_PO_MRP1

    /* TABLE KSV_PO_MRP*/
    // DEFINE DATAGRID : TBL_KSV_PO_MRP2
    const [loadingTBL_KSV_PO_MRP2, setLoadingTBL_KSV_PO_MRP2] = useState(false);

    const [datasTBL_KSV_PO_MRP2, setDatasTBL_KSV_PO_MRP2] = useState([]);
    const dt_TBL_KSV_PO_MRP2 = useRef(null);
    const [dataTBL_KSV_PO_MRP2, setDataTBL_KSV_PO_MRP2] =
        useState(emptyTBL_KSV_PO_MRP2);
    const [selectedTBL_KSV_PO_MRP2, setSelectedTBL_KSV_PO_MRP2] = useState([]);
    const [flagSelectModeTBL_KSV_PO_MRP2, setFlagSelectModeTBL_KSV_PO_MRP2] =
        useState(false);

    // DATAGRID CODE : TBL_KSV_PO_MRP2

    const onRowClick1TBL_KSV_PO_MRP2 = (argData0) => {
        var argData = {};

        if (typeof argData0.length !== "undefined") {
            argData = argData0[0];
        } else {
            argData = argData0;
        }

        let argTBL_KSV_PO_MRP2 = argData;

        setDataTBL_KSV_PO_MRP2(argTBL_KSV_PO_MRP2);
    };

    const onRowClickTBL_KSV_PO_MRP2 = (event) => {
        let argTBL_KSV_PO_MRP2 = event.data;
        if (flagSelectModeTBL_KSV_PO_MRP2) return;

        // Service : NawooAll:mgrQueryTBL_KSV_PO_MRP2
    };

    const exportExcelTBL_KSV_PO_MRP2 = async () => {
        serviceLib.exportExcel(
            "Factory arrival",
            "Factory arrival",
            datasTBL_KSV_PO_MRP2,
        );
    };

    const onCellEditCompleteKSV_PO_MRP2 = (e) => {
        let { rowData, newValue, field, originalEvent: event } = e;

        rowData[field] = serviceLib.getFloat(parseFloat(newValue), 2);

        var tOutQty = parseFloat(rowData[`OUT_QTY`]);
        var tShipQty = tOutQty - parseFloat(newValue);

        rowData[`SHIP_QTY`] = String(tShipQty);
        setDataTBL_KSV_PO_MRP2(rowData);
    };

    const cellEditorKSV_PO_MRP2 = (options) => {
        return textEditor(options);
    };

    const textEditor = (options) => {
        return (
            <InputText
                type="text"
                value={options.value}
                onChange={(e) => options.editorCallback(e.target.value)}
            />
        );
    };

    /* QRY KSV_PO_MRP*/
    const [dataEDT_KSV_PO_MRP, setDataEDT_KSV_PO_MRP] =
        useState(emptyEDT_KSV_PO_MRP);

    const onCalChangeEDT_KSV_PO_MRP_ARRIVAL_DATE = (e, name) => {
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

    const onInputChangeEDT_KSV_PO_MRP_CUSTOMER_NO = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_PO_MRP = { ...dataEDT_KSV_PO_MRP };

        let tTypeVal = _dataEDT_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string") _dataEDT_KSV_PO_MRP[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_PO_MRP[`${name}`] = parseInt(val);

        setDataEDT_KSV_PO_MRP(_dataEDT_KSV_PO_MRP);
    };

    const s3FileUpload = async (e) => {
        if (!selectedTBL_KSV_PO_MRP.length) {
            alert("Please select the target you want to upload.");
            return;
        }
        var tSelObj = { ...selectedTBL_KSV_PO_MRP[0] };
        if (
            tSelObj.SHIP_STATUS_N === "Fixed" ||
            tSelObj.SHIP_STATUS_N === "END" ||
            tSelObj.SHIP_STATUS_N === "Discharged"
        ) {
        } else {
        }

        var tEdtObj = { ...dataEDT_KSV_PO_MRP };

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
            tInObj.FILE_KEY = tEdtObj.CUSTOMER_NO;
            //tInObj.TITLE = `clearance doc:${tInObj.FILE_KEY}`;
            //tInObj.NAME = `clearance_file_${tInObj.FILE_KEY}`;
            tInObj.TITLE = fileName;
            tInObj.NAME = fileName;
            tInObj.URL = imgURL;
            tInObj.OBJECT_NAME = objectName;
            serviceS0518_FACTORY_ARRIVAL
                .mgrInsert_FILE_ADD(tInObj, tInObj2)
                .then((data) => {
                    if (typeof data.graphQLErrors === "undefined") {
                        if (data.length > 0) {
                            alert(data[0].CODE);
                            if (data[0].CODE.includes("SUCC")) {
                                // setDatasTBL_KSV_PO_MRP([]);
                                setSelectedTBL_KSV_PO_MRP([]);
                                setDatasTBL_KSV_PO_MRP2([]);

                                var tQryObj = { ...dataQRY_KSV_PO_MRP };
                                tQryObj.REMARK = tSelObj.REMARK;
                                search_LIST_1(tQryObj, datasTBL_KSV_PO_MRP);
                            }
                        }
                    } else {
                        toast.current.show({
                            severity: "success",
                            summary: "Info",
                            detail: "",
                            life: 3000,
                        });
                        // console.log("ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " + JSON.stringify(data.graphQLErrors));
                    }
                });
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        const initPage = async () => {
            var tFactory = "";

            var tUrls = window.location.href.split("?");
            if (tUrls.length > 1) {
                var tParams1 = tUrls[1].split("&");
                tParams1.forEach((col) => {
                    var tCols = col.split("=");
                    if (tCols[0].includes("FACTORY")) {
                        tFactory = tCols[1];
                    }
                });
            }

            setFactoryInfo(tFactory);

            try {
                const data = await serviceS0518_FACTORY_ARRIVAL.mgrQuery_CODE({});
                if (typeof data.graphQLErrors !== "undefined") {
                    console.log(
                        "mgrQuery_PO_CD error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                    return;
                }

                var tQry = { ...dataQRY_KSV_PO_MRP };

                setDatasQRY_KSV_PO_MRP_SHIP_MODE(data.SHIP_MODE);
                setDataQRY_KSV_PO_MRP_SHIP_MODE(data.SHIP_MODE[0]);
                tQry.SHIP_MODE = "";

                var tDestArray = [];
                if (tFactory === 'BVT') {
                    data.DESTINATION.forEach((col, i) => {
                        if (col.CD_CODE === 'BVT' || col.CD_CODE === 'TN') {
                            tDestArray.push(col);
                        }
                    });
                }
                if (tFactory === 'ETP') {
                    data.DESTINATION.forEach((col, i) => {
                        if (col.CD_CODE === 'ETP') {
                            tDestArray.push(col);
                        }
                    });
                }
                setDatasQRY_KSV_PO_MRP_DESTINATION(tDestArray);
                let tDestinationObj = tDestArray[0];
                setDataQRY_KSV_PO_MRP_DESTINATION(tDestinationObj);
                tQry.DESTINATION = (tDestinationObj && tDestinationObj.CD_CODE) || "";
                
                setDatasQRY_KSV_PO_MRP_ORIGIN_PORT(data.ORIGIN_PORT);
                setDataQRY_KSV_PO_MRP_ORIGIN_PORT(data.ORIGIN_PORT[0]);
                tQry.ORIGIN_PORT = "";

                setDatasQRY_KSV_PO_MRP_STATUS_CD(data.STATUS_CD);
                setDataQRY_KSV_PO_MRP_STATUS_CD(data.STATUS_CD[2]);
                tQry.STATUS_CD = data.STATUS_CD[2].CD_CODE;

                var tRetDate = serviceLib.getCurrDate();
                tQry.S_ETA = `${tRetDate.substring(0, 6)}01`;
                tQry.E_ETA = `${tRetDate.substring(0, 6)}31`;
                tQry.FACTORY = tFactory;
                setDataQRY_KSV_PO_MRP(tQry);

                var tEdt = { ...dataEDT_KSV_PO_MRP };
                tEdt.ARRIVAL_DATE = tRetDate.substring(0, 8);
                setDataEDT_KSV_PO_MRP(tEdt);

                // Run list query only after destination/options are initialized.
                search_LIST_1(tQry);
            } catch (err) {
                console.log(err);
            }
        };

        initPage();
    }, []);

    // Support Area

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
                style={{ width: "123rem", height: "6rem" }}
            >
                <span className="af-span-3-0" style={{ width: "17rem" }}>
                    <p className="af-span-p" style={{ width: "7rem" }}>Origin</p>
                    <div className="af-span-div" style={{ width: "9rem" }}>
                        <Dropdown
                            style={{ width: "9rem" }}
                            id="id_ORIGIN_PORT"
                            value={dataQRY_KSV_PO_MRP_ORIGIN_PORT}
                            onChange={(e) =>
                                onDropdownChangeQRY_KSV_PO_MRP_ORIGIN_PORT(
                                    e,
                                    "ORIGIN_PORT",
                                )
                            }
                            options={datasQRY_KSV_PO_MRP_ORIGIN_PORT}
                            optionLabel="CD_NAME"
                            placeholder=""
                            editable
                            filter
                        ></Dropdown>
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "17rem" }}>
                    <p className="af-span-p" style={{ width: "7rem" }}>Destination</p>
                    <div className="af-span-div" style={{ width: "9rem" }}>
                        <Dropdown
                            style={{ width: "9rem" }}
                            id="id_DESTINATION"
                            value={dataQRY_KSV_PO_MRP_DESTINATION}
                            onChange={(e) =>
                                onDropdownChangeQRY_KSV_PO_MRP_DESTINATION(
                                    e,
                                    "DESTINATION",
                                )
                            }
                            options={datasQRY_KSV_PO_MRP_DESTINATION}
                            optionLabel="CD_NAME"
                            placeholder=""
                            editable
                            filter
                        ></Dropdown>
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "17rem" }}>
                    <p className="af-span-p" style={{ width: "7rem" }}>Status</p>
                    <div className="af-span-div" style={{ width: "9rem" }}>
                        <Dropdown
                            style={{ width: "9rem" }}
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
                            filter
                        ></Dropdown>
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "17rem" }}>
                    <p className="af-span-p" style={{ width: "7rem" }}>Ship Mode</p>
                    <div className="af-span-div" style={{ width: "9rem" }}>
                        <Dropdown
                            style={{ width: "9rem" }}
                            id="id_SHIP_MODE"
                            value={dataQRY_KSV_PO_MRP_SHIP_MODE}
                            onChange={(e) =>
                                onDropdownChangeQRY_KSV_PO_MRP_SHIP_MODE(
                                    e,
                                    "SHIP_MODE",
                                )
                            }
                            options={datasQRY_KSV_PO_MRP_SHIP_MODE}
                            optionLabel="CD_NAME"
                            placeholder=""
                            editable
                            filter
                        ></Dropdown>
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "28rem" }}>
                    <p className="af-span-p" style={{ width: "7rem" }}>ETA</p>
                    <div className="af-span-div" style={{ width: "9rem" }}>
                        <Calendar
                            showButtonBar
                            style={{ width: "9rem" }}
                            dateFormat="yy-mm-dd"
                            id="id_ETA"
                            value={changeDateVal(dataQRY_KSV_PO_MRP.S_ETA)}
                            onChange={(e) =>
                                onCalChangeQRY_KSV_PO_MRP_S_ETA(e, "S_ETA")
                            }
                        />
                    </div>
                    <p className="af-span-p" style={{ width: "1rem" }}>~</p>
                    <div className="af-span-div" style={{ width: "9rem" }}>
                        <Calendar
                            showButtonBar
                            style={{ width: "9rem" }}
                            dateFormat="yy-mm-dd"
                            id="id_ETA"
                            value={changeDateVal(dataQRY_KSV_PO_MRP.E_ETA)}
                            onChange={(e) =>
                                onCalChangeQRY_KSV_PO_MRP_E_ETA(e, "E_ETA")
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
                <span className="af-span-3-0" style={{ width: "34.5rem" }}>
                    <p className="af-span-p" style={{ width: "7rem" }}>Remark</p>
                    <div className="af-span-div" style={{ width: "27rem" }}>
                        <InputText
                            style={{ width: "27rem" }}
                            value={dataQRY_KSV_PO_MRP.REMARK}
                            onChange={(e) =>
                                onInputChangeQRY_KSV_PO_MRP_REMARK(e, "REMARK")
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "17rem" }}>
                    <p className="af-span-p" style={{ width: "7rem" }}>BL#</p>
                    <div className="af-span-div" style={{ width: "9rem" }}>
                        <InputText
                            style={{ width: "9rem" }}
                            value={dataQRY_KSV_PO_MRP.BL_NO}
                            onChange={(e) =>
                                onInputChangeQRY_KSV_PO_MRP(e, "BL_NO")
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "17rem" }}>
                    <p className="af-span-p" style={{ width: "7rem" }}>Customs#</p>
                    <div className="af-span-div" style={{ width: "9rem" }}>
                        <InputText
                            style={{ width: "9rem" }}
                            value={dataQRY_KSV_PO_MRP.CUSTOMER_NO}
                            onChange={(e) =>
                                onInputChangeQRY_KSV_PO_MRP(e, "CUSTOMER_NO")
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "27rem" }}>
                    <p className="af-span-p" style={{ width: "7rem" }}>Invoice#</p>
                    <div className="af-span-div" style={{ width: "19rem" }}>
                        <InputText
                            style={{ width: "19rem" }}
                            value={dataQRY_KSV_PO_MRP.INVOICE_NO}
                            onChange={(e) =>
                                onInputChangeQRY_KSV_PO_MRP(e, "INVOICE_NO")
                            }
                        />
                    </div>
                </span>
            </div>

            <div
                className="af-div-first"
                style={{ width: "123rem", height: "24rem" }}
            >
                <AFDataTable preventUnrelatedRerender
                    ref={dt_TBL_KSV_PO_MRP}
                    editMode="cell"
                    size="small"
                    value={datasTBL_KSV_PO_MRP}
                    tableStyle={{ tableLayout: "fixed" }}
                    loading={loadingTBL_KSV_PO_MRP}
                    showGridlines
                    selectionMode="checkbox"
                    resizableColumns
                    columnResizeMode="expand"
                    selection={selectedTBL_KSV_PO_MRP}
                    onSelectionChange={(e) => {
                        setFlagSelectModeTBL_KSV_PO_MRP(true);
                        setSelectedTBL_KSV_PO_MRP(e.value);
                        console.log(
                            "selected length:" + selectedTBL_KSV_PO_MRP.length,
                        );
                        onRowClick1TBL_KSV_PO_MRP(e.value);
                    }}
                    onRowClick={onRowClickTBL_KSV_PO_MRP}
                    dataKey="id"
                    className="datatable-responsive"
                    onRowDoubleClick={onRowDoubleClickTBL_KSV_PO_MRP}
                    virtualScrollerOptions={{ itemSize: 20 }}
                    emptyMessage=" " //header={headerTBL_KSV_PO_MRP}
                    responsiveLayout="scroll"
                    scrollable
                    scrollHeight="264px"
                >
                    <AFColumn field="SHIP_STATUS_N" headerClassName="t-header" header="Status" style={{ width: "6rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="ETA" headerClassName="t-header" header="ETA" style={{ width: "6rem", flexBasis: "auto" }} body={(rowData) => serviceLib.dateFormatHMS(rowData.ETA) } ></AFColumn>
                    <AFColumn field="ATA" headerClassName="t-header" header="ATA" style={{ width: "10rem", flexBasis: "auto" }} body={(rowData) => serviceLib.dateFormatHMS(rowData.ATA) } ></AFColumn>
                    <AFColumn field="SHIP_MODE_N" headerClassName="t-header" header="Ship.M" style={{ width: "6rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="ORG_ORIGIN_PORT" headerClassName="t-header" header="Origin" style={{ width: "8rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="ORG_DESTINATION" headerClassName="t-header" header="Dest" style={{ width: "6rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="S_WEIGHT" headerClassName="t-header" header="Weight" style={{ width: "6rem", flexBasis: "auto" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.S_WEIGHT, 2) } ></AFColumn>
                    <AFColumn field="S_CBM" headerClassName="t-header" header="CBM" style={{ width: "6rem", flexBasis: "auto" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.S_CBM, 2) } ></AFColumn>
                    <AFColumn field="BL_NO" headerClassName="t-header" header="BL#" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="ETD" headerClassName="t-header" header="ETD" style={{ width: "6rem", flexBasis: "auto" }} body={(rowData) => serviceLib.dateFormatHMS(rowData.ETD) } ></AFColumn>
                    <AFColumn field="SHIPPING_COST" headerClassName="t-header" header="Cost(S)" style={{ width: "6rem", flexBasis: "auto" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.SHIPPING_COST, 2) } ></AFColumn>
                    <AFColumn field="IMPORT_COST" headerClassName="t-header" header="Cost(I)" style={{ width: "6rem", flexBasis: "auto" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.IMPORT_COST, 2) } ></AFColumn>
                    <AFColumn field="REMARK" headerClassName="t-header" header="Remark" style={{ width: "6rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="INVOICE_NO" headerClassName="t-header" header="Invoice#" style={{ width: "6rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="S_CT_QTY" headerClassName="t-header" header="Total C/T#" style={{ width: "6rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="CLEARANCE_NO" headerClassName="t-header" header="Customs#" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="DELIVERY" headerClassName="t-header" header="Delivery" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="FILE_NAME" headerClassName="t-header" className="orange" header="Customs File" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="IS_SINGAPORE" headerClassName="t-header" header="Singapore.Comb" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="BL_FILE" className="orange" headerClassName="t-header" header="BL File" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="PL_FILE" className="orange" headerClassName="t-header" header="PL File" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="CI_FILE" className="orange" headerClassName="t-header" header="CI File" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="SHIPMENT_CD" headerClassName="t-header" header="Ship#" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="STATUS_CD" headerClassName="t-header" header="Status" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="REG_DATETIME" headerClassName="t-header" header="Ship Date" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="SHIP_MODE" headerClassName="t-header" header="Ship.Mode" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="DESTINATION" headerClassName="t-header" header="Temp.Destination" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="SHIP_MODE_N" headerClassName="t-header" header="Delivery Type" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                </AFDataTable>
            </div>

            <div
                className="af-div-first"
                style={{ width: "123rem", height: "3.5rem" }}
            >
                <span className="af-span-3-0">
                    <p className="af-span-p" style={{ width: "7rem" }}>Customs#</p>
                    <div className="af-span-div" style={{ width: "40rem" }}>
                        <InputText
                            style={{ width: "40rem" }}
                            id="id_CONTAINER_NO"
                            value={dataEDT_KSV_PO_MRP.CUSTOMER_NO}
                            onChange={(e) =>
                                onInputChangeEDT_KSV_PO_MRP_CUSTOMER_NO(
                                    e,
                                    "CUSTOMER_NO",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "7rem" }}>
                    <div className="af-span-div-btn" style={{ width: "6rem" }}>
                        <Button
                            label="Save"
                            style={{ width: "6rem" }}
                            className="p-button-text"
                            onClick={process_CUSTOMER_NO}
                        />
                    </div>
                </span>
                <span className="af-span-3-2" style={{ width: "7rem" }}>
                    <div className="af-span-div-btn" style={{ width: "6rem" }}>
                        <Button style={{ width: "6rem", textAlign: "center" }}>
                            <label
                                style={{ textAlign: "center", width: "6rem" }}
                                className="inputFileCustom"
                                htmlFor="inputFileAdd"
                            >
                                Upload
                            </label>
                        </Button>
                        <input
                            type="file"
                            id="inputFileAdd"
                            onChange={s3FileUpload}
                            style={{ display: "none" }}
                        />
                    </div>
                </span>

                <span className="af-span-3-0" style={{ width: "17rem" }}>
                    <p className="af-span-p" style={{ width: "7rem" }}>ATA</p>
                    <div className="af-span-div" style={{ width: "9rem" }}>
                        <Calendar
                            showButtonBar
                            style={{ width: "9rem" }}
                            dateFormat="yy-mm-dd"
                            id="id_ETA"
                            value={changeDateVal(
                                dataEDT_KSV_PO_MRP.ARRIVAL_DATE,
                            )}
                            onChange={(e) =>
                                onCalChangeEDT_KSV_PO_MRP_ARRIVAL_DATE(
                                    e,
                                    "ARRIVAL_DATE",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "7rem" }}>
                    <div className="af-span-div-btn" style={{ width: "6rem" }}>
                        <Button
                            label="Arrival"
                            style={{ width: "6rem" }}
                            className="p-button-text"
                            onClick={process_ARRIVAL}
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "7rem" }}>
                    <div className="af-span-div-btn" style={{ width: "6rem" }}>
                        <Button
                            label="Fixed"
                            style={{ width: "6rem" }}
                            className="p-button-text"
                            onClick={process_FIXED}
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "13rem" }}>
                    <div className="af-span-div-btn" style={{ width: "12rem" }}>
                        <Button
                            label="Error Qty Update"
                            style={{ width: "12rem" }}
                            className="p-button-text"
                            onClick={process_UPDATE_ERROR_QTY}
                        />
                    </div>
                </span>

                <span className="af-span-3-0" style={{ width: "7rem" }}>
                    <div className="af-span-div-btn" style={{ width: "6rem" }}>
                        <Button
                            label="Excel"
                            style={{ width: "6rem" }}
                            className="p-button-text green"
                            onClick={exportExcelTBL_KSV_PO_MRP2}
                        />
                    </div>
                </span>
            </div>

            <div
                className="af-div-first"
                style={{ width: "123rem", height: "45rem" }}
            >
                <AFDataTable preventUnrelatedRerender
                    ref={dt_TBL_KSV_PO_MRP2}
                    editMode="cell"
                    size="small"
                    value={datasTBL_KSV_PO_MRP2}
                    tableStyle={{ tableLayout: "fixed" }}
                    resizableColumns
                    columnResizeMode="expand"
                    loading={loadingTBL_KSV_PO_MRP2}
                    showGridlines
                    selectionMode="checkbox"
                    selection={selectedTBL_KSV_PO_MRP2}
                    onSelectionChange={(e) => {
                        setSelectedTBL_KSV_PO_MRP2(e.value);
                        onRowClick1TBL_KSV_PO_MRP2(e.value);
                    }}
                    onRowClick={onRowClickTBL_KSV_PO_MRP2}
                    dataKey="id"
                    className="datatable-responsive"
                    virtualScrollerOptions={{ itemSize: 20 }}
                    emptyMessage=" " //header={headerTBL_KSV_PO_MRP2}
                    responsiveLayout="scroll"
                    scrollable
                    scrollHeight="292px"
                >
                    <AFColumn selectionMode="multiple" field="__checkbox__" reorderable={false} headerClassName="t-header" headerStyle={{ width: "3rem" }} ></AFColumn>
                    <AFColumn field="PU_CD" headerClassName="t-header" header="Pu#" style={{ width: "8rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="PO_CD" headerClassName="t-header" header="PO#" style={{ width: "6rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="ORDER_CD" headerClassName="t-header" header="Order#" style={{ width: "6rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="BUYER_CD" headerClassName="t-header" header="Buyer" style={{ width: "3rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="VENDOR_NAME" headerClassName="t-header" header="Supplier" style={{ width: "6rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="TRADE_TERM" headerClassName="t-header" header="Trade.Term" style={{ width: "3rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="MATL_CD" headerClassName="t-header" header="Matl#" style={{ width: "6rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="MATL_NAME" headerClassName="t-header" header="Desc" style={{ width: "6rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="COLOR" headerClassName="t-header" header="Color" style={{ width: "6rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="SPEC" headerClassName="t-header" header="Spec" style={{ width: "6rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="UNIT" headerClassName="t-header" header="Unit" style={{ width: "6rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="OUT_QTY" headerClassName="t-header" header="Out Qty" style={{ width: "6rem", flexBasis: "auto" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.OUT_QTY, 2) } ></AFColumn>
                    <AFColumn field="ERR_QTY" headerClassName="t-header" header="Err Qty" style={{ color: "green", width: "6rem", flexBasis: "auto", }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.ERR_QTY, 2) } editor={(options) => cellEditorKSV_PO_MRP2(options)} onCellEditComplete={onCellEditCompleteKSV_PO_MRP2} ></AFColumn>
                    <AFColumn field="SHIP_QTY" headerClassName="t-header" header="Ship Qty" style={{ width: "6rem", flexBasis: "auto" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.SHIP_QTY, 2) } ></AFColumn>
                    <AFColumn field="BL_NO" headerClassName="t-header" header="B/L#" style={{ width: "6rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="HS_CODE" headerClassName="t-header" header="HS Code" style={{ width: "6rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="COMPOSITION" headerClassName="t-header" header="Composition" style={{ width: "6rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="CUSTOMS_CODE" headerClassName="t-header" header="Customs Code" style={{ width: "6rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="CUSTOMS_UNIT" headerClassName="t-header" header="Customs Unit" style={{ width: "6rem", flexBasis: "auto" }} ></AFColumn>
                </AFDataTable>
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
            >
                <iframe
                    src={urlIframe}
                    width="1400px"
                    height="1000px"
                    id="id1"
                    className="myClassname"
                    scrolling="yes"
                />
            </Dialog>
        </div>
    );
};

const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(S0518_FACTORY_ARRIVAL, comparisonFn);
