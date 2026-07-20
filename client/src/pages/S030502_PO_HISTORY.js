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
import { ServiceS030502_PO_HISTORY } from "../service/service_biz/ServiceS030502_PO_HISTORY";
import { ServiceS030513_MRP_LIST } from "../service/service_biz/ServiceS030513_MRP_LIST";

import "./page_common.scss";

const emptyKCD_CODE = {
    id: 0,
    CD_GROUP: "",
    CD_CODE: "",
    CD_NAME: "",
    CD_FLAG: "",
};

const emptyQRY_KSV_PO_MST = {
    PO_CD: "",
    PO_SEQ: "",
    STYLE_NAME: "",
    SALES_FLAG: "",
    BUYER_FLAG: "",
    CAD_FLAG: "",
    MRP_FLAG: "",
    MRP2_FLAG: "",
    MATL_FLAG: "",
    ETC_FLAG: "",
    REASON: "",
    COMMENT: "",
};

const emptyTBL_KSV_PO_MST = {
    id: 0,
    ORDER_CD: "",
    STYLE_NAME: "",
    TOT_CNT: "",
    SIZE1_CNT: "",
};

const emptyTBL_KSV_PO_MST1 = {
    id: 0,
    PO_SEQ: "",
    ORDER_CD: "",
    MATL_CD: "",
    MATL_NAME: "",
    COLOR: "",
    SPEC: "",
    UNIT: "",
    ORDER_STATUS: "",
    MRP_QTY: "",
    ORDER_QTY: "",
    CHANGE_QTY: "",
    CHANGE_KIND: "",
    PRICE: "",
    CURR_CD: "",
    AMOUNT: "",
    VENDOR_NAME: "",
    VENDOR_CD: "",
};

const emptyTBL_KSV_PO_MST2 = {
    id: 0,
    PO_SEQ: "",
    ORDER_CD: "",
    MATL_CD: "",
    MATL_NAME: "",
    COLOR: "",
    SPEC: "",
    UNIT: "",
    ORDER_STATUS: "",
    ORG_SEQ: "",
    ORDER_QTY: "",
    CHANGE_QTY: "",
    CHANGE_KIND: "",
    REMARK: "",
    PRICE: "",
    CURR_CD: "",
    AMOUNT: "",
    VENDOR_NAME: "",
    VENDOR_CD: "",
};

const S030502_PO_HISTORY = () => {
    const serviceLibRef = useRef(null);
    if (!serviceLibRef.current) {
        serviceLibRef.current = new ServiceLib();
        serviceLibRef.current.loginConfirm();
    }
    const serviceLib = serviceLibRef.current;
    const serviceS030502_PO_HISTORYRef = useRef(null);
    if (!serviceS030502_PO_HISTORYRef.current) serviceS030502_PO_HISTORYRef.current = new ServiceS030502_PO_HISTORY();
    const serviceS030502_PO_HISTORY = serviceS030502_PO_HISTORYRef.current;
    const serviceS030513_MRP_LISTRef = useRef(null);
    if (!serviceS030513_MRP_LISTRef.current) serviceS030513_MRP_LISTRef.current = new ServiceS030513_MRP_LIST();
    const serviceS030513_MRP_LIST = serviceS030513_MRP_LISTRef.current;

    const toast = useRef(null);

    /* splitter 관련 */
    const [styleVal, setStyleVal] = useState({ width: "65vw" });

    //
    const search_LIST_1 = () => {
        var tQryObj = { ...dataQRY_KSV_PO_MST };
        if (tQryObj.PO_SEQ === "") search_QRY_ORDER(tQryObj);
        search_QRY_SEQ_COMMENT(tQryObj);
        search_QRY_PO_MRP1(tQryObj);
        search_QRY_PO_MRP2(tQryObj);

        setIsSearch_LIST_1(true);
    };

    const search_QRY_ORDER = (argData) => {
        var tInObj = {};
        tInObj.PO_CD = argData.PO_CD;
        tInObj.PO_SEQ = argData.PO_SEQ;

        setLoadingTBL_KSV_PO_MST(true);
        setDatasTBL_KSV_PO_MST([]);
        serviceS030502_PO_HISTORY.mgrQuery_QRY_ORDER(tInObj).then((data) => {
            setLoadingTBL_KSV_PO_MST(false);
            if (typeof data.graphQLErrors === "undefined") {
                if (data.length > 0) {
                    if (data[0].ORDER_CD.includes("ERROR")) {
                        alert(data[0].ORDER_CD);
                    } else {
                        setDatasTBL_KSV_PO_MST_COLS(data[0].USE_SIZE);
                        var tRetObjs = data.map((col, i) => {
                            var tObj = { ...col };
                            var tIdx = 0;
                            for (tIdx = 0; tIdx < col.USE_SIZE.length; tIdx++) {
                                var tColOne = col.USE_SIZE[tIdx];
                                tObj[`SIZE_${tColOne.SIZE_NAME}`] =
                                    tColOne.SIZE_CNT;
                            }
                            return tObj;
                        });
                        setDatasTBL_KSV_PO_MST(tRetObjs);
                    }
                }
            } else {
                console.log(
                    "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });
    };

    const search_QRY_SEQ_COMMENT = (argData) => {
        var tInObj = {};
        tInObj.PO_CD = argData.PO_CD;
        tInObj.PO_SEQ = argData.PO_SEQ;

        setLoadingTBL_KSV_PO_MST1(true);
        setDatasTBL_KSV_PO_MST1([]);
        serviceS030502_PO_HISTORY
            .mgrQuery_QRY_SEQ_COMMENT(tInObj)
            .then((data) => {
                setLoadingTBL_KSV_PO_MST1(false);
                if (typeof data.graphQLErrors === "undefined") {
                    if (data.length > 0) {
                        var tOne = { ...data[0] };
                        var tQry = { ...dataQRY_KSV_PO_MST };
                        tQry.COMMENT = tOne.SEQ_COMMENT;
                        tQry.REASON = tOne.SEQ_REASON;
                        tQry.BUYER_FLAG = tOne.CHK_BUYER;
                        tQry.SALES_FLAG = tOne.CHK_SALES;
                        tQry.CAD_FLAG = tOne.CHK_CAD;
                        tQry.MRP_FLAG = tOne.CHK_MRP;
                        tQry.MRP2_FLAG = tOne.CHK_MRP2;
                        tQry.MATL_FLAG = tOne.CHK_MATL;
                        tQry.ETC_FLAG = tOne.CHK_ETC;
                        setDataQRY_KSV_PO_MST(tQry);
                        editQRY_KSV_PO_MST_REASON(tOne.SEQ_REASON);
                    }
                } else {
                    console.log(
                        "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });
    };

    const search_REPORT_1 = (argData) => {
        var tQryObj = { ...dataQRY_KSV_PO_MST };

        var tInObj = {};
        tInObj.PO_CD = tQryObj.PO_CD;
        tInObj.PO_SEQ = tQryObj.PO_SEQ;

        if (!isSearch_LIST_1 || tInObj.PO_SEQ === "") {
            alert("먼저 PO_SEQ을 선택하여 조회후 처리하십시요<br><br>First, select PO_SEQ to search and process.");
            return;
        }

        setLoadingTBL_KSV_PO_MST1(true);
        serviceS030502_PO_HISTORY.mgrQuery_REPORT_1(tInObj).then((data) => {
            setLoadingTBL_KSV_PO_MST1(false);
            if (typeof data.graphQLErrors === "undefined") {
                if (data.length > 0) {
                    alert(data[0].CODE);
                    if (data[0].CODE.includes("SUCC")) {
                        downloadFile(
                            data[0].CODE.split("?")[2].toString(),
                            data[0].CODE.split("?")[1].toString(),
                        );
                    }
                }
            } else {
                console.log(
                    "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });
    };

    const search_REPORT_MRP_LIST = (argData) => {
        var tQryObj0 = { ...dataQRY_KSV_PO_MST };
        var tQryObj = {};
        tQryObj.PO_CD = tQryObj0.PO_CD;
        tQryObj.PO_SEQ = "";
        tQryObj.MRP_BY_ORDER = "1";
        tQryObj.MRP_BY_STYLE = "0";
        tQryObj.CURR_DATE = "";
        tQryObj.LOCAL_WORD = "0";
        tQryObj.WITHOUT_PRICE = "0";
        tQryObj.ORDER_CDS = [];
        datasTBL_KSV_PO_MST.forEach((col, i) => {
            tQryObj.ORDER_CDS.push(col.ORDER_CD);
        });

        setLoadingTBL_KSV_PO_MST1(true);
        serviceS030513_MRP_LIST
            .mgrQuery_REPORT_MRP_LIST(tQryObj)
            .then((data) => {
                setLoadingTBL_KSV_PO_MST1(false);
                if (typeof data.graphQLErrors === "undefined") {
                    if (data.length > 0) {
                        alert(data[0].CODE);
                        if (data[0].CODE.includes("SUCC")) {
                            downloadFile(
                                data[0].CODE.split("?")[2].toString(),
                                data[0].CODE.split("?")[1].toString(),
                            );
                            var tQryObj = { ...dataQRY_KSV_PO_MST };
                            tQryObj.PO_SEQ = "";
                            search_QRY_ORDER(tQryObj);
                        } else {
                            var tQryObj = { ...dataQRY_KSV_PO_MST };
                            tQryObj.PO_SEQ = "";
                            search_QRY_ORDER(tQryObj);
                        }
                    }
                } else {
                    alert("현재 작업중입니다. 잠시후에 다시 조회하세요 <br><br>Currently working on it. Please check again later");
                    // console.log("ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " + JSON.stringify(data.graphQLErrors));
                }
            });
    };

    const search_REPORT_ADD_MATL_REQ = (argData) => {
        var tQryObj = { ...dataQRY_KSV_PO_MST };

        var tInObj = {};
        tInObj.PO_CD = tQryObj.PO_CD;
        tInObj.PO_SEQ = tQryObj.PO_SEQ;

        if (!isSearch_LIST_1 || tInObj.PO_SEQ === "") {
            alert("먼저 PO_SEQ을 선택하여 조회후 처리하십시요<br><br>First, select PO_SEQ to search and process.");
            return;
        }

        setLoadingTBL_KSV_PO_MST1(true);
        serviceS030502_PO_HISTORY
            .mgrQuery_REPORT_ADD_MATL_REQ(tInObj)
            .then((data) => {
                setLoadingTBL_KSV_PO_MST1(false);
                if (typeof data.graphQLErrors === "undefined") {
                    if (data.length > 0) {
                        alert(data[0].CODE);
                        if (data[0].CODE.includes("SUCC")) {
                            downloadFile(
                                data[0].CODE.split("?")[2].toString(),
                                data[0].CODE.split("?")[1].toString(),
                            );
                        }
                    }
                } else {
                    console.log(
                        "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });
    };

    const downloadFile = async (argFileUrl, argFileName) => {
        serviceLib.downloadFile(argFileUrl, argFileName);
    };

    const search_QRY_PO_MRP1 = (argData) => {
        var tInObj = {};
        tInObj.PO_CD = argData.PO_CD;
        tInObj.PO_SEQ = argData.PO_SEQ;

        setLoadingTBL_KSV_PO_MST1(true);
        setDatasTBL_KSV_PO_MST1([]);
        serviceS030502_PO_HISTORY.mgrQuery_QRY_PO_MRP1(tInObj).then((data) => {
            setLoadingTBL_KSV_PO_MST1(false);
            if (typeof data.graphQLErrors === "undefined") {
                if (data.length > 0) {
                    setDatasTBL_KSV_PO_MST1(data);
                }
            } else {
                console.log(
                    "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });
    };

    const search_QRY_PO_MRP2 = (argData) => {
        var tInObj = {};
        tInObj.PO_CD = argData.PO_CD;
        tInObj.PO_SEQ = argData.PO_SEQ;

        setLoadingTBL_KSV_PO_MST2(true);
        setDatasTBL_KSV_PO_MST2([]);
        serviceS030502_PO_HISTORY.mgrQuery_QRY_PO_MRP2(tInObj).then((data) => {
            setLoadingTBL_KSV_PO_MST2(false);
            if (typeof data.graphQLErrors === "undefined") {
                if (data.length > 0) {
                    setDatasTBL_KSV_PO_MST2(data);
                }
            } else {
                console.log(
                    "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });
    };

    /* QRY KSV_PO_MST*/
    const [dataQRY_KSV_PO_MST, setDataQRY_KSV_PO_MST] =
        useState(emptyQRY_KSV_PO_MST);

    const onInputChangeQRY_KSV_PO_MST_PO_CD = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_PO_MST = { ...dataQRY_KSV_PO_MST };

        let tTypeVal = _dataQRY_KSV_PO_MST[`${name}`];
        if (typeof tTypeVal === "string") _dataQRY_KSV_PO_MST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_PO_MST[`${name}`] = parseInt(val);

        setDataQRY_KSV_PO_MST(_dataQRY_KSV_PO_MST);
    };

    const onInputChangeQRY_KSV_PO_MST_COMMENT = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_PO_MST = { ...dataQRY_KSV_PO_MST };

        let tTypeVal = _dataQRY_KSV_PO_MST[`${name}`];
        if (typeof tTypeVal === "string") _dataQRY_KSV_PO_MST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_PO_MST[`${name}`] = parseInt(val);

        setDataQRY_KSV_PO_MST(_dataQRY_KSV_PO_MST);
    };

    const [datasQRY_KSV_PO_MST_PO_SEQ, setDatasQRY_KSV_PO_MST_PO_SEQ] =
        useState([]);
    const [dataQRY_KSV_PO_MST_PO_SEQ, setDataQRY_KSV_PO_MST_PO_SEQ] = useState(
        {},
    );

    const onDropdownChangeQRY_KSV_PO_MST_PO_SEQ = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataQRY_KSV_PO_MST = { ...dataQRY_KSV_PO_MST };

        let tTypeVal = _dataQRY_KSV_PO_MST[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_PO_MST[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_PO_MST[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_PO_MST(_dataQRY_KSV_PO_MST);
        setDataQRY_KSV_PO_MST_PO_SEQ(e.value);
    };

    const [datasQRY_KSV_PO_MST_REASON, setDatasQRY_KSV_PO_MST_REASON] =
        useState([]);
    const [dataQRY_KSV_PO_MST_REASON, setDataQRY_KSV_PO_MST_REASON] = useState(
        {},
    );

    const editQRY_KSV_PO_MST_REASON = (argValue) => {
        let _dataQRY_KSV_PO_MST_REASON = datasQRY_KSV_PO_MST_REASON.filter(
            (val) => val.CD_CODE === argValue,
        );
        setDataQRY_KSV_PO_MST_REASON(_dataQRY_KSV_PO_MST_REASON[0]);
    };

    const onDropdownChangeQRY_KSV_PO_MST_REASON = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataQRY_KSV_PO_MST = { ...dataQRY_KSV_PO_MST };

        let tTypeVal = _dataQRY_KSV_PO_MST[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_PO_MST[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_PO_MST[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_PO_MST(_dataQRY_KSV_PO_MST);
        setDataQRY_KSV_PO_MST_REASON(e.value);
    };

    const onInputChangeQRY_KSV_PO_MST_STYLE_NAME = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_PO_MST = { ...dataQRY_KSV_PO_MST };

        let tTypeVal = _dataQRY_KSV_PO_MST[`${name}`];
        if (typeof tTypeVal === "string") _dataQRY_KSV_PO_MST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_PO_MST[`${name}`] = parseInt(val);

        setDataQRY_KSV_PO_MST(_dataQRY_KSV_PO_MST);
    };

    const onCheckboxChangeQRY_KSV_PO_MST_SALES_FLAG = (e, name) => {
        let val = "";
        let _dataQRY_KSV_PO_MST = { ...dataQRY_KSV_PO_MST };
        if (e.checked) {
            val = "1";
        } else {
            val = "0";
        }
        _dataQRY_KSV_PO_MST[`${name}`] = val;
        setDataQRY_KSV_PO_MST(_dataQRY_KSV_PO_MST);
    };

    const onCheckboxChangeQRY_KSV_PO_MST_BUYER_FLAG = (e, name) => {
        let val = "";
        let _dataQRY_KSV_PO_MST = { ...dataQRY_KSV_PO_MST };
        if (e.checked) {
            val = "1";
        } else {
            val = "0";
        }
        _dataQRY_KSV_PO_MST[`${name}`] = val;
        setDataQRY_KSV_PO_MST(_dataQRY_KSV_PO_MST);
    };

    const onCheckboxChangeQRY_KSV_PO_MST_CAD_FLAG = (e, name) => {
        let val = "";
        let _dataQRY_KSV_PO_MST = { ...dataQRY_KSV_PO_MST };
        if (e.checked) {
            val = "1";
        } else {
            val = "0";
        }
        _dataQRY_KSV_PO_MST[`${name}`] = val;
        setDataQRY_KSV_PO_MST(_dataQRY_KSV_PO_MST);
    };

    const onCheckboxChangeQRY_KSV_PO_MST_MRP_FLAG = (e, name) => {
        let val = "";
        let _dataQRY_KSV_PO_MST = { ...dataQRY_KSV_PO_MST };
        if (e.checked) {
            val = "1";
        } else {
            val = "0";
        }
        _dataQRY_KSV_PO_MST[`${name}`] = val;
        setDataQRY_KSV_PO_MST(_dataQRY_KSV_PO_MST);
    };

    const onCheckboxChangeQRY_KSV_PO_MST_MRP2_FLAG = (e, name) => {
        let val = "";
        let _dataQRY_KSV_PO_MST = { ...dataQRY_KSV_PO_MST };
        if (e.checked) {
            val = "1";
        } else {
            val = "0";
        }
        _dataQRY_KSV_PO_MST[`${name}`] = val;
        setDataQRY_KSV_PO_MST(_dataQRY_KSV_PO_MST);
    };

    const onCheckboxChangeQRY_KSV_PO_MST_MATL_FLAG = (e, name) => {
        let val = "";
        let _dataQRY_KSV_PO_MST = { ...dataQRY_KSV_PO_MST };
        if (e.checked) {
            val = "1";
        } else {
            val = "0";
        }
        _dataQRY_KSV_PO_MST[`${name}`] = val;
        setDataQRY_KSV_PO_MST(_dataQRY_KSV_PO_MST);
    };

    const onCheckboxChangeQRY_KSV_PO_MST_ETC_FLAG = (e, name) => {
        let val = "";
        let _dataQRY_KSV_PO_MST = { ...dataQRY_KSV_PO_MST };
        if (e.checked) {
            val = "1";
        } else {
            val = "0";
        }
        _dataQRY_KSV_PO_MST[`${name}`] = val;
        setDataQRY_KSV_PO_MST(_dataQRY_KSV_PO_MST);
    };

    /*TABLE KSV_PO_MST */
    // DEFINE DATAGRID : TBL_KSV_PO_MST
    const [isSearch_LIST_1, setIsSearch_LIST_1] = useState(false);

    const [loadingTBL_KSV_PO_MST, setLoadingTBL_KSV_PO_MST] = useState(false);
    const [datasTBL_KSV_PO_MST_COLS, setDatasTBL_KSV_PO_MST_COLS] = useState(
        [],
    );
    const [datasTBL_KSV_PO_MST, setDatasTBL_KSV_PO_MST] = useState([]);
    const dt_TBL_KSV_PO_MST = useRef(null);
    const [dataTBL_KSV_PO_MST, setDataTBL_KSV_PO_MST] =
        useState(emptyTBL_KSV_PO_MST);
    const [selectedTBL_KSV_PO_MST, setSelectedTBL_KSV_PO_MST] = useState([]);
    const [flagSelectModeTBL_KSV_PO_MST, setFlagSelectModeTBL_KSV_PO_MST] =
        useState(false);

    // DATAGRID CODE : TBL_KSV_PO_MST
    const dynamicColumnsTBL_KSV_PO_MST = datasTBL_KSV_PO_MST_COLS.map(
        (col, i) => {
            var tHeader = `id_msg_${col.SIZE_NAME}_KSV_PO_MST_dt`;
            var tHeaderStr = serviceLib.getLocaleMessage(tHeader);
            var tColName = `SIZE_${col.SIZE_NAME}`;
            // return  <AFColumn field={col.field} header={tHeaderStr} headerStyle={{ width: '10rem',height:'1.8rem' }} bodyStyle={{ width: '10rem',height:'1.8rem' }} editor={(options) => cellEditorKSV_ORDER_MEM(options)} onCellEditComplete={onCellEditCompleteKSV_ORDER_MEM}></AFColumn>
            return (
                <AFColumn field={tColName} header={tHeaderStr} headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
            );
        },
    );

    const onRowDoubleClickTBL_KSV_PO_MST = (argData0) => {
        var tRemark = "";
        var tColName = "";
        var tKeys = Object.keys(argData0.data);
        tKeys.forEach((col, i) => {
            var tValue = argData0.data[`${col}`];
            if (tValue === argData0.originalEvent.target.innerText) {
                tColName = col;
            }
        });
        console.log("Col Name:" + tColName);
        if (tColName === "MRP_LIST_FILE") {
            downloadFile(
                argData0.data[`MRP_LIST_FILE_URL`],
                argData0.data[`MRP_LIST_FILE_URL`],
            );
        }
    };

    const onRowClick1TBL_KSV_PO_MST = (argData0) => {
        var argData = {};

        if (typeof argData0.length !== "undefined") {
            argData = argData0[0];
        } else {
            argData = argData0;
        }

        let argTBL_KSV_PO_MST = argData;

        setDataTBL_KSV_PO_MST(argTBL_KSV_PO_MST);
    };

    const onRowClickTBL_KSV_PO_MST = (event) => {
        let argTBL_KSV_PO_MST = event.data;
        if (flagSelectModeTBL_KSV_PO_MST) return;

        // Service : NawooAll:mgrQueryTBL_KSV_PO_MST
    };

    /**TABLE KSV_PO_MST1 */
    // DEFINE DATAGRID : TBL_KSV_PO_MST1
    const [loadingTBL_KSV_PO_MST1, setLoadingTBL_KSV_PO_MST1] = useState(false);
    const [datasTBL_KSV_PO_MST1, setDatasTBL_KSV_PO_MST1] = useState([]);
    const dt_TBL_KSV_PO_MST1 = useRef(null);
    const [dataTBL_KSV_PO_MST1, setDataTBL_KSV_PO_MST1] =
        useState(emptyTBL_KSV_PO_MST1);
    const [selectedTBL_KSV_PO_MST1, setSelectedTBL_KSV_PO_MST1] = useState([]);
    const [flagSelectModeTBL_KSV_PO_MST1, setFlagSelectModeTBL_KSV_PO_MST1] =
        useState(false);

    // DATAGRID CODE : TBL_KSV_PO_MST1

    const onRowClick1TBL_KSV_PO_MST1 = (argData0) => {
        var argData = {};

        if (typeof argData0.length !== "undefined") {
            argData = argData0[0];
        } else {
            argData = argData0;
        }

        let argTBL_KSV_PO_MST1 = argData;

        setDataTBL_KSV_PO_MST1(argTBL_KSV_PO_MST1);
    };

    const onRowClickTBL_KSV_PO_MST1 = (event) => {
        let argTBL_KSV_PO_MST1 = event.data;
        if (flagSelectModeTBL_KSV_PO_MST1) return;

        // Service : NawooAll:mgrQueryTBL_KSV_PO_MST1
    };

    /**TABLE KSV_PO_MST2 */
    // DEFINE DATAGRID : TBL_KSV_PO_MST2
    const [loadingTBL_KSV_PO_MST2, setLoadingTBL_KSV_PO_MST2] = useState(false);
    const [datasTBL_KSV_PO_MST2, setDatasTBL_KSV_PO_MST2] = useState([]);
    const dt_TBL_KSV_PO_MST2 = useRef(null);
    const [dataTBL_KSV_PO_MST2, setDataTBL_KSV_PO_MST2] =
        useState(emptyTBL_KSV_PO_MST2);
    const [selectedTBL_KSV_PO_MST2, setSelectedTBL_KSV_PO_MST2] = useState([]);
    const [flagSelectModeTBL_KSV_PO_MST2, setFlagSelectModeTBL_KSV_PO_MST2] =
        useState(false);

    // DATAGRID CODE : TBL_KSV_PO_MST2

    const onRowClick1TBL_KSV_PO_MST2 = (argData0) => {
        var argData = {};

        if (typeof argData0.length !== "undefined") {
            argData = argData0[0];
        } else {
            argData = argData0;
        }

        let argTBL_KSV_PO_MST2 = argData;

        setDataTBL_KSV_PO_MST2(argTBL_KSV_PO_MST2);
    };

    const onRowClickTBL_KSV_PO_MST2 = (event) => {
        let argTBL_KSV_PO_MST2 = event.data;
        if (flagSelectModeTBL_KSV_PO_MST2) return;

        // Service : NawooAll:mgrQueryTBL_KSV_PO_MST2
    };

    useEffect(() => {
        let tPO_CD = "";
        let tPO_SEQ = "";

        var tUrls = window.location.href.split("?");
        if (tUrls.length <= 1) {
        } else {
            var tParams1 = tUrls[1].split("&");
            var tParams2 = tParams1.map((col, i) => {
                var tObj = {};
                var tCols = col.split("=");

                if (tCols[0].includes("PO_CD")) {
                    tObj.key = tCols[0];
                    tObj.value = tCols[1];
                    console.log(tObj);
                    tPO_CD = tObj.value;
                    return tObj;
                }
            });
        }

        if (tPO_CD !== "") {
            console.log("S0305 Po Cd :(param)" + tPO_CD);
        } else {
            tPO_CD = localStorage.getItem("AF_S0305_PO_CD");
            console.log("S0305 Po Cd: (localstorage)" + tPO_CD);
            if (tPO_CD === null) tPO_CD = "PO23-0233";
        }

        var tQryObj = { ...dataQRY_KSV_PO_MST };
        tQryObj.PO_CD = tPO_CD;
        tQryObj.PO_SEQ = "";
        setDataQRY_KSV_PO_MST(tQryObj);

        var tObj = {};
        tObj.PO_CD = tPO_CD;
        serviceS030502_PO_HISTORY.mgrQuery_CODE(tObj).then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                console.log(
                    "mgrQuery_KSV_ORDER_MST call => " + data.PO_SEQ.length,
                );
                setDatasQRY_KSV_PO_MST_PO_SEQ(data.PO_SEQ);
                setDataQRY_KSV_PO_MST_PO_SEQ(data.PO_SEQ[0]);

                setDatasQRY_KSV_PO_MST_REASON(data.SEQ_REASON);
                setDataQRY_KSV_PO_MST_REASON(data.SEQ_REASON[0]);
            } else {
                console.log(
                    "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });

        var tObj1 = {};
        tObj1.PO_CD = tPO_CD;
        tObj1.PO_SEQ = "";

        search_QRY_ORDER(tObj1);

        search_QRY_PO_MRP1(tObj1);

        search_QRY_PO_MRP2(tObj1);
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
                style={{ width: "123rem", height: "8.5rem" }}
            >
                <span className="af-span-3-0" style={{ width: "27rem" }}>
                    <p className="af-span-p" style={{ width: "14rem" }}>PO#</p>
                    <div className="af-span-div" style={{ width: "12rem" }}>
                        <InputText
                            style={{ width: "12rem" }}
                            id="id_PO_CD"
                            value={dataQRY_KSV_PO_MST.PO_CD}
                            onChange={(e) =>
                                onInputChangeQRY_KSV_PO_MST_PO_CD(e, "PO_CD")
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "15rem" }}>
                    <p className="af-span-p" style={{ width: "7rem" }}>PO Seq</p>
                    <div className="af-span-div" style={{ width: "7rem" }}>
                        <Dropdown
                            style={{ width: "7rem" }}
                            id="id_PO_SEQ"
                            value={dataQRY_KSV_PO_MST_PO_SEQ}
                            onChange={(e) =>
                                onDropdownChangeQRY_KSV_PO_MST_PO_SEQ(
                                    e,
                                    "PO_SEQ",
                                )
                            }
                            options={datasQRY_KSV_PO_MST_PO_SEQ}
                            optionLabel="CD_NAME"
                            placeholder=""
                            editable
                        ></Dropdown>
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "41rem" }}>
                    <p className="af-span-p" style={{ width: "7rem" }}>Style</p>
                    <div className="af-span-div" style={{ width: "33rem" }}>
                        <InputText
                            style={{ width: "33rem" }}
                            id="id_STYLE_NAME"
                            value={dataQRY_KSV_PO_MST.STYLE_NAME}
                            onChange={(e) =>
                                onInputChangeQRY_KSV_PO_MST_STYLE_NAME(
                                    e,
                                    "STYLE_NAME",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "9rem" }}>
                    <p className="af-span-p" style={{ width: "7rem" }}>All</p>
                    <div className="af-span-checkbox">
                        <Checkbox
                            id="id_SALES_FLAG"
                            checked={changeCheckBoxVal(
                                dataQRY_KSV_PO_MST.SALES_FLAG,
                            )}
                            onChange={(e) =>
                                onCheckboxChangeQRY_KSV_PO_MST_SALES_FLAG(
                                    e,
                                    "SALES_FLAG",
                                )
                            }
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
                <span className="af-span-3-0" style={{ width: "14rem" }}>
                    <div className="af-span-div-btn" style={{ width: "10rem" }}>
                        <Button
                            label="발주내역"
                            style={{ width: "10rem" }}
                            className="p-button-text green"
                            onClick={search_REPORT_1}
                        />
                    </div>
                </span>

                <span className="af-span-3" style={{ width: "15rem" }}>
                    <p className="af-span-p" style={{ width: "14rem" }}>Reason/Responsibility</p>
                </span>
                <span className="af-span-3" style={{ width: "9rem" }}>
                    <p className="af-span-p" style={{ width: "7rem" }}>Sales</p>
                    <div className="af-span-checkbox">
                        <Checkbox
                            id="id_SALES_FLAG"
                            checked={changeCheckBoxVal(
                                dataQRY_KSV_PO_MST.SALES_FLAG,
                            )}
                            onChange={(e) =>
                                onCheckboxChangeQRY_KSV_PO_MST_SALES_FLAG(
                                    e,
                                    "SALES_FLAG",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "6rem" }}>
                    <p className="af-span-p" style={{ width: "4rem" }}>Buyer</p>
                    <div className="af-span-checkbox">
                        <Checkbox
                            id="id_BUYER_FLAG"
                            checked={changeCheckBoxVal(
                                dataQRY_KSV_PO_MST.BUYER_FLAG,
                            )}
                            onChange={(e) =>
                                onCheckboxChangeQRY_KSV_PO_MST_BUYER_FLAG(
                                    e,
                                    "BUYER_FLAG",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "6rem" }}>
                    <p className="af-span-p" style={{ width: "4rem" }}>CAD</p>
                    <div className="af-span-checkbox">
                        <Checkbox
                            id="id_CAD_FLAG"
                            checked={changeCheckBoxVal(
                                dataQRY_KSV_PO_MST.CAD_FLAG,
                            )}
                            onChange={(e) =>
                                onCheckboxChangeQRY_KSV_PO_MST_CAD_FLAG(
                                    e,
                                    "CAD_FLAG",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "6rem" }}>
                    <p className="af-span-p" style={{ width: "4rem" }}>MRP</p>
                    <div className="af-span-checkbox">
                        <Checkbox
                            id="id_MRP_FLAG"
                            checked={changeCheckBoxVal(
                                dataQRY_KSV_PO_MST.MRP_FLAG,
                            )}
                            onChange={(e) =>
                                onCheckboxChangeQRY_KSV_PO_MST_MRP_FLAG(
                                    e,
                                    "MRP_FLAG",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "6rem" }}>
                    <p className="af-span-p" style={{ width: "4rem" }}>MRP2</p>
                    <div className="af-span-checkbox">
                        <Checkbox
                            id="id_MRP2_FLAG"
                            checked={changeCheckBoxVal(
                                dataQRY_KSV_PO_MST.MRP2_FLAG,
                            )}
                            onChange={(e) =>
                                onCheckboxChangeQRY_KSV_PO_MST_MRP2_FLAG(
                                    e,
                                    "MRP2_FLAG",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "6rem" }}>
                    <p className="af-span-p" style={{ width: "4rem" }}>MATL</p>
                    <div className="af-span-checkbox">
                        <Checkbox
                            id="id_MATL_FLAG"
                            checked={changeCheckBoxVal(
                                dataQRY_KSV_PO_MST.MATL_FLAG,
                            )}
                            onChange={(e) =>
                                onCheckboxChangeQRY_KSV_PO_MST_MATL_FLAG(
                                    e,
                                    "MATL_FLAG",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "6rem" }}>
                    <p className="af-span-p" style={{ width: "4rem" }}>ETC</p>
                    <div className="af-span-checkbox">
                        <Checkbox
                            id="id_ETC_FLAG"
                            checked={changeCheckBoxVal(
                                dataQRY_KSV_PO_MST.ETC_FLAG,
                            )}
                            onChange={(e) =>
                                onCheckboxChangeQRY_KSV_PO_MST_ETC_FLAG(
                                    e,
                                    "ETC_FLAG",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "30rem" }}>
                    <p className="af-span-p" style={{ width: "7rem" }}>Reason</p>
                    <div className="af-span-div" style={{ width: "22rem" }}>
                        <Dropdown
                            style={{ width: "22rem" }}
                            id="id_PO_SEQ"
                            value={dataQRY_KSV_PO_MST_REASON}
                            onChange={(e) =>
                                onDropdownChangeQRY_KSV_PO_MST_REASON(
                                    e,
                                    "REASON",
                                )
                            }
                            options={datasQRY_KSV_PO_MST_REASON}
                            optionLabel="CD_NAME"
                            placeholder=""
                            editable
                        ></Dropdown>
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "11rem" }}>
                    <div className="af-span-div-btn" style={{ width: "10rem" }}>
                        <Button
                            label="MRP List"
                            style={{ width: "10rem" }}
                            className="p-button-text green"
                            onClick={search_REPORT_MRP_LIST}
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "11rem" }}>
                    <div className="af-span-div-btn" style={{ width: "10rem" }}>
                        <Button
                            label="추가발주"
                            style={{ width: "10rem" }}
                            className="p-button-text green"
                            onClick={search_REPORT_ADD_MATL_REQ}
                        />
                    </div>
                </span>

                <span className="af-span-3" style={{ width: "93rem" }}>
                    <p className="af-span-p" style={{ width: "14rem" }}>Seq Comment</p>
                    <div className="af-span-div" style={{ width: "78rem" }}>
                        <InputText
                            style={{ width: "78rem" }}
                            id="id_PO_CD"
                            value={dataQRY_KSV_PO_MST.COMMENT}
                            onChange={(e) =>
                                onInputChangeQRY_KSV_PO_MST_COMMENT(
                                    e,
                                    "COMMENT",
                                )
                            }
                        />
                    </div>
                </span>
            </div>

            <div
                className="af-div-first"
                style={{ width: "123rem", height: "15rem" }}
            >
                <AFDataTable preventUnrelatedRerender
                    ref={dt_TBL_KSV_PO_MST}
                    size="small"
                    value={datasTBL_KSV_PO_MST}
                    loading={loadingTBL_KSV_PO_MST}
                    tableStyle={{ tableLayout: "fixed" }}
                    resizableColumns
                    columnResizeMode="expand"
                    showGridlines
                    selectionMode="checkbox"
                    selection={selectedTBL_KSV_PO_MST}
                    onSelectionChange={(e) => {
                        setFlagSelectModeTBL_KSV_PO_MST(true);
                        setSelectedTBL_KSV_PO_MST(e.value);
                        console.log(
                            "selected length:" + selectedTBL_KSV_PO_MST.length,
                        );
                        onRowClick1TBL_KSV_PO_MST(e.value);
                    }}
                    onRowClick={onRowClickTBL_KSV_PO_MST}
                    dataKey="ORDER_CD"
                    className="datatable-responsive"
                    onRowDoubleClick={onRowDoubleClickTBL_KSV_PO_MST}
                    virtualScrollerOptions={{ itemSize: 20 }}
                    emptyMessage=" "
                    //header={headerTBL_KSV_PO_MST}
                    responsiveLayout="scroll"
                    scrollable
                    scrollHeight="15rem"
                >
                    <AFColumn field="ORDER_CD" header="Order" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="STYLE_NAME" header="Style" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="TOT_CNT" header="Qty" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="DUE_DATE" header="Due Date" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="ORDER_RATE" header="Order Rate" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="MRP_LIST_FILE" header="Mrp List" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    {dynamicColumnsTBL_KSV_PO_MST}
                </AFDataTable>
            </div>

            <div
                className="af-div-first"
                style={{ width: "123rem", height: "20rem" }}
            >
                <AFDataTable preventUnrelatedRerender
                    ref={dt_TBL_KSV_PO_MST1}
                    size="small"
                    value={datasTBL_KSV_PO_MST1}
                    loading={loadingTBL_KSV_PO_MST1}
                    tableStyle={{ tableLayout: "fixed" }}
                    resizableColumns
                    columnResizeMode="expand"
                    showGridlines
                    selectionMode="checkbox"
                    selection={selectedTBL_KSV_PO_MST1}
                    onSelectionChange={(e) => {
                        setFlagSelectModeTBL_KSV_PO_MST1(true);
                        setSelectedTBL_KSV_PO_MST1(e.value);
                        console.log(
                            "selected length:" + selectedTBL_KSV_PO_MST1.length,
                        );
                        onRowClick1TBL_KSV_PO_MST1(e.value);
                    }}
                    onRowClick={onRowClickTBL_KSV_PO_MST1}
                    dataKey="id"
                    className="datatable-responsive"
                    virtualScrollerOptions={{ itemSize: 20 }}
                    emptyMessage=" "
                    //header={headerTBL_KSV_PO_MST1}
                    responsiveLayout="scroll"
                    scrollable
                    scrollHeight="20rem"
                >
                    <AFColumn field="po_seq" header="Seq" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="order_cd" header="Order" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="matl_cd" header="Matl" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="matl_name" header="Description" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="color" header="Color" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="spec" header="Spec" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="unit" header="Unit" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="use_po_type_n" header="Use Po type" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="use_qty" header="Use Qty" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="po_qty" header="Po Qty" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="diff_qty" header="Diff Qty" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="diff_po_type_n" header="Diff Po type" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="matl_price" header="Matl Price" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="curr_cd" header="Curr Cd" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="po_amt" header="Matl Amt" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="vendor_name" header="Supplier" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="mrp_seq" header="Mrp Seq" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="matl_seq" header="Matl Seq" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="reg_datetime" header="Reg Date" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                </AFDataTable>
            </div>

            <div
                className="af-div-first"
                style={{ width: "123rem", height: "16rem" }}
            >
                <AFDataTable preventUnrelatedRerender
                    ref={dt_TBL_KSV_PO_MST2}
                    size="small"
                    value={datasTBL_KSV_PO_MST2}
                    loading={loadingTBL_KSV_PO_MST2}
                    tableStyle={{ tableLayout: "fixed" }}
                    resizableColumns
                    columnResizeMode="expand"
                    showGridlines
                    selectionMode="checkbox"
                    selection={selectedTBL_KSV_PO_MST2}
                    onSelectionChange={(e) => {
                        setFlagSelectModeTBL_KSV_PO_MST2(true);
                        setSelectedTBL_KSV_PO_MST2(e.value);
                        console.log(
                            "selected length:" + selectedTBL_KSV_PO_MST2.length,
                        );
                        onRowClick1TBL_KSV_PO_MST2(e.value);
                    }}
                    onRowClick={onRowClickTBL_KSV_PO_MST2}
                    dataKey="id"
                    className="datatable-responsive"
                    virtualScrollerOptions={{ itemSize: 20 }}
                    emptyMessage=" "
                    // header={headerTBL_KSV_PO_MST2}
                    responsiveLayout="scroll"
                    scrollable
                    scrollHeight="16rem"
                >
                    <AFColumn field="po_seq" header="Seq" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="order_cd" header="Order" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="matl_cd" header="Matl" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="matl_name" header="Description" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="color" header="Color" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="spec" header="Spec" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="unit" header="Unit" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="org_po_seq" header="Org Po Seq" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="po_qty" header="Po Qty" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="diff_qty" header="Diff Qty" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="diff_po_type_n" header="Diff Po type" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="matl_price" header="Matl Price" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="curr_cd" header="Curr Cd" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="po_amt" header="Matl Amt" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="vendor_name" header="Supplier" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="mrp_seq" header="Mrp Seq" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="seq_comment" header="Seq Comment" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                </AFDataTable>
            </div>
            <Toast ref={toast} />
        </div>
    );
};

const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(S030502_PO_HISTORY, comparisonFn);
