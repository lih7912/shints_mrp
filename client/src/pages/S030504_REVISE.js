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

import { ServiceLib } from "../service/service_lib/ServiceLib";
import { ServiceS030504_REVISE } from "../service/service_biz/ServiceS030504_REVISE";
import { ServiceS0305_MRP_MANAGER } from "../service/service_biz/ServiceS0305_MRP_MANAGER";
import { ServiceS030514_PO_LIST } from "../service/service_biz/ServiceS030514_PO_LIST";
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
    S_PO_DATE: "",
    E_PO_DATE: "",
    APPROVAL: "",
    SEQ_COMMENT: "",
    SEQ_REASON: "",
    BUYER_CHK: "0",
    SALES_CHK: "0",
    MATL_CHK: "0",
    CAD_CHK: "0",
    MRP_CHK: "0",
    MRP2_CHK: "0",
    ETC_CHK: "0",
    IS_ALL: "0",
};

const normalizeQRY_KSV_PO_MST = (data = {}) => ({
    ...emptyQRY_KSV_PO_MST,
    ...data,
    APPROVAL: data?.APPROVAL ?? "",
    SEQ_COMMENT: data?.SEQ_COMMENT ?? "",
    SEQ_REASON: data?.SEQ_REASON ?? "",
    BUYER_CHK: data?.BUYER_CHK ?? "0",
    SALES_CHK: data?.SALES_CHK ?? "0",
    MATL_CHK: data?.MATL_CHK ?? "0",
    CAD_CHK: data?.CAD_CHK ?? "0",
    MRP_CHK: data?.MRP_CHK ?? "0",
    MRP2_CHK: data?.MRP2_CHK ?? "0",
    ETC_CHK: data?.ETC_CHK ?? "0",
    IS_ALL: data?.IS_ALL ?? "0",
});

const emptyTBL_KSV_ORDER_MST = {
    id: 0,
    ORDER_CD: "",
    STYLE_NAME: "",
    BUYER_NAME: "",
    TOT_CNT: "",
    DUE_DATE: "",
    FACTORY_NAME: "",
    CONS_F: "",
    CONS_A: "",
    ORDER_STATUS_NAME: "",
    ORDER_STATUS: "",
};

const emptyTBL_KSV_PO_MST = {
    id: 0,
    PO_SEQ: "",
    ORDER_CD: "",
    MATL_CD: "",
    MATL_NAME: "",
    COLOR: "",
    SPEC: "",
    STATUS_NAME: "",
    BEF_QTY: "",
    STOCK_QTY: "",
    MRP_QTY: "",
    NEW_QTY: "",
    BAL_QTY: "",
    DIFF_PO_TYPE_NAME: "",
    DIFF_PO_TYPE: "",
};

const emptyTBL_KSV_PO_MST1 = {
    id: 0,
    PO_SEQ: "",
    ORDER_CD: "",
    MATL_CD: "",
    MATL_NAME: "",
    COLOR: "",
    SPEC: "",
    BEF_PO_QTY: "",
    USE_STOCK_QTY: "",
    DIFF_RE_QTY: "",
    PROCESS: "",
    USED_QTY: "",
    SUM_QTY: "",
    VENDOR_NAME: "",
};

const S030504_REVISE = () => {
    const serviceLibRef = useRef(null);
    if (!serviceLibRef.current) {
        serviceLibRef.current = new ServiceLib();
        serviceLibRef.current.loginConfirm();
    }
    const serviceLib = serviceLibRef.current;
    const serviceS030504_REVISERef = useRef(null);
    if (!serviceS030504_REVISERef.current) serviceS030504_REVISERef.current = new ServiceS030504_REVISE();
    const serviceS030504_REVISE = serviceS030504_REVISERef.current;
    const serviceS0305_MRP_MANAGERRef = useRef(null);
    if (!serviceS0305_MRP_MANAGERRef.current) serviceS0305_MRP_MANAGERRef.current = new ServiceS0305_MRP_MANAGER();
    const serviceS0305_MRP_MANAGER = serviceS0305_MRP_MANAGERRef.current;
    const serviceS030514_PO_LISTRef = useRef(null);
    if (!serviceS030514_PO_LISTRef.current) serviceS030514_PO_LISTRef.current = new ServiceS030514_PO_LIST();
    const serviceS030514_PO_LIST = serviceS030514_PO_LISTRef.current;
    const serviceS030513_MRP_LISTRef = useRef(null);
    if (!serviceS030513_MRP_LISTRef.current) serviceS030513_MRP_LISTRef.current = new ServiceS030513_MRP_LIST();
    const serviceS030513_MRP_LIST = serviceS030513_MRP_LISTRef.current;

    const toast = useRef(null);

    /* progress */
    const [isProgress, setIsProgress] = useState(false);
    const [count, setCount] = useState(0);

    /* splitter 관련 */
    const [styleVal, setStyleVal] = useState({ width: "65vw" });

    const popup_MRP_LIST = () => {
        serviceS0305_MRP_MANAGER
            .mgrQuery_WORK_STATUS({
                OP_KIND: "0",
            })
            .then((data) => {
                if (typeof data.graphQLErrors !== "undefined") {
                    console.log(
                        "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                    return;
                }

                if (data.length > 0) {
                    window.parent.postMessage(
                        {
                            func: "call_url",
                            message: {
                                key: "2-25",
                                label: "MRP_LIST",
                                icon: "pi pi-fw pi-user-edit",
                                url1: `S030513_MRP_LIST?PO_CD=${dataQRY_KSV_PO_MST.PO_CD}`,
                            },
                        },
                        "*",
                    );
                }
            });
    };
    
    const search_REPORT_MRP_LIST = (argData) => {
        var tRetDate = serviceLib.getCurrDate();

        var tInObj0 = { ...dataQRY_KSV_PO_MST };

        var tInObj = {};
        tInObj.PO_CD = tInObj0.PO_CD;
        tInObj.PO_SEQ = tInObj0.PO_SEQ;
        tInObj.CURR_DATE = tRetDate.substring(0, 8);
        tInObj.LOCAL_WORD = "0";
        tInObj.MRP_BY_ORDER = "1";
        tInObj.MRP_BY_STYLE = "0";
        tInObj.WITHOUT_PRICE = "0";
        tInObj.ORDER_CDS = [];
        datasTBL_KSV_ORDER_MST.forEach((col, i) => {
            tInObj.ORDER_CDS.push(col.ORDER_CD);
        });

        if (tInObj0.PO_SEQ === "") {
            alert("PO Seq을 선택하십시요<br><br>Select PO Seq");
            return;
        }

        setLoadingTBL_KSV_ORDER_MST(true);
        serviceS030513_MRP_LIST
            .mgrQuery_REPORT_MRP_LIST(tInObj)
            .then((data) => {
                setLoadingTBL_KSV_ORDER_MST(false);
                if (typeof data.graphQLErrors === "undefined") {
                    if (data.length > 0) {
                        alert(data[0].CODE);
                        if (data[0].CODE.includes("SUCC")) {
                            // downloadFile(data[0].CODE.split('?')[2].toString(), data[0].CODE.split('?')[1].toString());
                            // var tQryObj = { ...dataQRY_KSV_PO_MST };
                            // tQryObj.PO_SEQ = '';
                            // search_QRY_ORDER(tQryObj);
                        } else {
                            // var tQryObj = { ...dataQRY_KSV_PO_MST };
                            // tQryObj.PO_SEQ = '';
                            // search_QRY_ORDER(tQryObj);
                        }
                    }
                } else {
                    alert("현재 작업중입니다. 잠시후에 다시 조회하세요 <br><br>Currently working on it. Please check again later"); // console.log("ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " + JSON.stringify(data.graphQLErrors));
                }
            });

        // 부모 프레임에 메시지 보내기
        window.parent.postMessage(
            "WorkingMrp",
            `https://${window.location.hostname}:3211`,
        );

        window.addEventListener("message", function (event) {
            console.log("👂 메시지 수신:", event.origin, event.data);
            if (event.origin === `https://${window.location.hostname}:3211`) {
                if (event.data === "ReloadData") {
                    console.log("✅ ReloadData 수신됨!");
                }
            }
        });

        popup_MRP_LIST();
    };
    const search_REPORT_MATL_LIST_NET_QTY = (argData) => {
        if (dataQRY_KSV_PO_MST.PO_CD === "") {
            alert("작업할 PO을 선택하십시요<br><br>Select the PO you want to work on");
            return;
        }

        var tOne = { ...datasTBL_KSV_ORDER_MST[0] };
        var tQryObj = {};
        tQryObj.PO_CD = dataQRY_KSV_PO_MST.PO_CD;
        tQryObj.IS_PRICE = "1";
        tQryObj.ORDER_CD = "";
        tQryObj.BUYER_CD = tOne.ORDER_CD.substring(0, 2);
        tQryObj.FACTORY_CD = tOne.FACTORY_CD;
        tQryObj.ORDER_KIND = "";
        tQryObj.OP_KIND = "0";

        setLoadingTBL_KSV_ORDER_MST(true);
        serviceS030514_PO_LIST
            .mgrQuery_REPORT_MATL_LIST_NET_QTY(tQryObj)
            .then((data) => {
                setLoadingTBL_KSV_ORDER_MST(false);
                if (typeof data.graphQLErrors === "undefined") {
                    if (data.length > 0) {
                        alert(data[0].CODE);
                        if (data[0].CODE.includes("SUCC")) {
                            downloadFile(
                                data[0].CODE.split("?")[2].toString(),
                                data[0].CODE.split("?")[1].toString(),
                            );
                            // search_LIST_2();
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

    const popup_STOCK_CHECK = (argData) => {
        var tObj = {};
        if (typeof argData.PO_CD !== "undefined") tObj = { ...argData };
        else tObj = { ...dataQRY_KSV_PO_MST };

        if (tObj.PO_SEQ === "") {
            alert("PO_SEQ을 입력해야합니다<br><br>PO_SEQ must be entered");
            return;
            // tObj.PO_SEQ = datasQRY_KSV_PO_MST_PO_SEQ[datasQRY_KSV_PO_MST_PO_SEQ.length - 1].CD_CODE;
        }

        var tLastObj = {};
        datasQRY_KSV_PO_MST_PO_SEQ.forEach((col, i) => {
            if (parseFloat(col.CD_CODE) < 97) {
                tLastObj = { ...col };
            }
        });

        // tObj.PO_SEQ = dataQRY_KSV_PO_MST_PO_SEQ.CD_CODE;

        // alert(`Last PO Seq:${tObj.PO_SEQ}/${tLastObj.CD_CODE}`);

        var tUrls = window.location.href.split("/");
        console.log("URL=>" + tUrls[2]);
        var tUrl1 = "";
        if (window.location.href.includes("3288")) {
            tUrl1 = "http://afroba.iptime.org:3288/webapp/mrpapp/index.html#/";
        } else if (
            window.location.href.includes("3201") &&
            window.location.href.includes("afroba")
        ) {
            tUrl1 = "http://afroba.iptime.org:3201/#/";
        } else if (window.location.href.includes("3203")) {
            tUrl1 = "http://192.168.0.105:3203/#/";
        } else if (window.location.href.includes("3301")) {
            tUrl1 = "http://localhost:3301/#/";
        } else {
            tUrl1 = "http://localhost:3201/#/";
        }

        // var tSTYLE_CD = 'ST23-0734';
        var tPO_CD = tObj.PO_CD;
        var tPO_SEQ = tObj.PO_SEQ;

        tUrl1 += `S030503_STOCK_CHECK?PO_CD=${tPO_CD}&PO_SEQ=${tPO_SEQ}`;

        var tUrl2 = `S030503_STOCK_CHECK?PO_CD=${tPO_CD}&PO_SEQ=${tPO_SEQ}`;
        var tValObj = {
            key: "2-8",
            label: "Stock Check",
            icon: "pi pi-fw pi-user-edit",
            url1: "S030503_STOCK_CHECK",
        };
        var tArgObj = { ...tValObj };
        tArgObj.url1 = tUrl2;
        var tFuncObj = {};
        tFuncObj.func = "call_url";
        tFuncObj.message = { ...tArgObj };
        window.parent.postMessage(tFuncObj, "*");
    };

    const search_CODE = (argPoCd) => {
        var tObj = {};
        tObj.PO_CD = argPoCd;
        tObj.PO_SEQ = "";

        serviceS030504_REVISE.mgrQuery_CODE(tObj).then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                setDatasQRY_KSV_PO_MST_PO_SEQ(data.PO_SEQ);
                setDataQRY_KSV_PO_MST_PO_SEQ(data.PO_SEQ[0]);
            } else {
                console.log(
                    "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });
    };

    const search_ALL_LIST = (argData) => {
        var tObj0 = {};
        if (
            typeof argData !== "undefined" &&
            typeof argData.PO_CD !== "undefined"
        ) {
            tObj0 = { ...argData };
        } else {
            tObj0 = { ...dataQRY_KSV_PO_MST };
        }
        tObj0.ORDER_CD = "";

        setSelectedTBL_KSV_ORDER_MST([]);

        setDatasTBL_KSV_PO_MST([]);
        setDatasTBL_KSV_PO_MST_BASE([]);
        setSelectedTBL_KSV_PO_MST([]);

        setDatasTBL_KSV_PO_MST1([]);
        setSelectedTBL_KSV_PO_MST1([]);

        var tQRY = { ...dataQRY_KSV_PO_MST };
        tQRY.SEQ_COMMENT = "";
        tQRY.SEQ_REASON = "";
        tQRY.BUYER_CHK = "0";
        tQRY.SALES_CHK = "0";
        tQRY.MATL_CHK = "0";
        tQRY.CAD_CHK = "0";
        tQRY.MRP_CHK = "0";
        tQRY.MRP2_CHK = "0";
        tQRY.ETC_CHK = "0";
        tQRY.IS_ALL = "0";
        setDataQRY_KSV_PO_MST(tQRY);
        setDataQRY_KSV_PO_MST_SEQ_REASON(datasQRY_KSV_PO_MST_SEQ_REASON[0]);

        searchPO_MST(tObj0);
        // searchPO_MST1(tObj0);
    };

    const search_ORDER_MST = (argData0) => {
        var tObj = {};
        if (typeof argData0.PO_CD === "undefined") {
            var tObj0 = { ...dataQRY_KSV_PO_MST };
            tObj.PO_CD = tObj0.PO_CD;
            tObj.PO_SEQ = tObj0.PO_SEQ;
        } else {
            tObj.PO_CD = argData0.PO_CD;
            tObj.PO_SEQ = argData0.PO_SEQ;
        }
        serviceS030504_REVISE.mgrQueryTBL_KSV_ORDER_MST(tObj).then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                console.log("mgrQueryTBL_KSV_ORDER_MST call => " + data.length);
                var tArray = data.map((col, i) => {
                    var tObj = { ...col };
                    tObj.id = i + 1;
                    if (tObj.CONS_F !== "Y") tObj.CONS_F = "N";
                    if (tObj.CONS_A !== "Y") tObj.CONS_A = "N";
                    return tObj;
                });
                setDatasTBL_KSV_ORDER_MST(tArray);
            } else {
                console.log(
                    "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });
    };

    /* QRY KSV_PO_MST */
    const [dataQRY_KSV_PO_MST, setDataQRY_KSV_PO_MST] =
        useState(emptyQRY_KSV_PO_MST);

    const onCheckboxChangeQRY_KSV_PO_MST_BUYER_CHK = (e, name) => {
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

    const onCheckboxChangeQRY_KSV_PO_MST_SALES_CHK = (e, name) => {
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

    const onCheckboxChangeQRY_KSV_PO_MST_CAD_CHK = (e, name) => {
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

    const onCheckboxChangeQRY_KSV_PO_MST_MRP_CHK = (e, name) => {
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

    const onCheckboxChangeQRY_KSV_PO_MST_MRP2_CHK = (e, name) => {
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

    const onCheckboxChangeQRY_KSV_PO_MST_ETC_CHK = (e, name) => {
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

    const onInputChangeQRY_KSV_PO_MST_PO_CD = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_PO_MST = { ...dataQRY_KSV_PO_MST };

        let tTypeVal = _dataQRY_KSV_PO_MST[`${name}`];
        if (typeof tTypeVal === "string") _dataQRY_KSV_PO_MST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_PO_MST[`${name}`] = parseInt(val);

        setDataQRY_KSV_PO_MST(_dataQRY_KSV_PO_MST);
    };

    const onInputChangeQRY_KSV_PO_MST_SEQ_COMMENT = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_PO_MST = normalizeQRY_KSV_PO_MST({
            ...dataQRY_KSV_PO_MST,
        });
        _dataQRY_KSV_PO_MST[`${name}`] = val;

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

        var tQry = { ...dataQRY_KSV_PO_MST };
        tQry.PO_SEQ = e.value.CD_CODE;
        tQry.ORDER_CD = "";

        console.log("PO_SEQ change => " + tQry.PO_SEQ);
        setDataQRY_KSV_PO_MST(tQry);
        search_ALL_LIST(tQry);
    };

    const [datasQRY_KSV_PO_MST_SEQ_REASON, setDatasQRY_KSV_PO_MST_SEQ_REASON] =
        useState([]);
    const [dataQRY_KSV_PO_MST_SEQ_REASON, setDataQRY_KSV_PO_MST_SEQ_REASON] =
        useState({});

    const editQRY_KSV_PO_MST_SEQ_REASON = (argValue) => {
        let _dataQRY_KSV_PO_MST_SEQ_REASON =
            datasQRY_KSV_PO_MST_SEQ_REASON.filter(
                (val) => val.CD_CODE === argValue,
            );
        setDataQRY_KSV_PO_MST_SEQ_REASON(_dataQRY_KSV_PO_MST_SEQ_REASON[0]);
    };

    const onDropdownChangeQRY_KSV_PO_MST_SEQ_REASON = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataQRY_KSV_PO_MST = normalizeQRY_KSV_PO_MST({
            ...dataQRY_KSV_PO_MST,
        });
        _dataQRY_KSV_PO_MST[`${name}`] = String(val);

        setDataQRY_KSV_PO_MST(_dataQRY_KSV_PO_MST);
        setDataQRY_KSV_PO_MST_SEQ_REASON(e.value);
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
    const process_UPDATE_COMMENT = () => {
        var tInObj = normalizeQRY_KSV_PO_MST({ ...dataQRY_KSV_PO_MST });
        if (dataQRY_KSV_PO_MST_SEQ_REASON?.CD_CODE) {
            tInObj.SEQ_REASON = dataQRY_KSV_PO_MST_SEQ_REASON.CD_CODE;
        }

        setLoadingTBL_KSV_PO_MST(true);
        serviceS030504_REVISE.updateComment(tInObj).then((data) => {
            // setIsProgress(false);
            setLoadingTBL_KSV_PO_MST(false);
            if (typeof data.graphQLErrors === "undefined") {
                if (data.length > 0) {
                    alert(data[0].CODE);
                    if (data[0].CODE.includes("SUCC")) {
                        search_ALL_LIST();
                    }
                }
                // console.log("mgrQueryTBL_KSV_PO_MST call => " + data.length);
            } else {
                toast.current.show({
                    severity: "success",
                    summary: "Recalc MRP Error",
                    detail: "",
                    life: 3000,
                });
                console.log(
                    "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });
    };

    const process_UPDATE_RESP = () => {
        var tInObj = normalizeQRY_KSV_PO_MST({ ...dataQRY_KSV_PO_MST });
        if (dataQRY_KSV_PO_MST_SEQ_REASON?.CD_CODE) {
            tInObj.SEQ_REASON = dataQRY_KSV_PO_MST_SEQ_REASON.CD_CODE;
        }

        setLoadingTBL_KSV_PO_MST(true);
        serviceS030504_REVISE.updateResp(tInObj).then((data) => {
            // setIsProgress(false);
            setLoadingTBL_KSV_PO_MST(false);
            if (typeof data.graphQLErrors === "undefined") {
                if (data.length > 0) {
                    alert(data[0].CODE);
                    if (data[0].CODE.includes("SUCC")) {
                        search_ALL_LIST();
                    }
                }
                // console.log("mgrQueryTBL_KSV_PO_MST call => " + data.length);
            } else {
                toast.current.show({
                    severity: "success",
                    summary: "Recalc MRP Error",
                    detail: "",
                    life: 3000,
                });
                console.log(
                    "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });
    };

    const process_RECALC_MRP = () => {
        var _tObj = { ...dataQRY_KSV_PO_MST };
        var tObj = {};
        tObj.PO_CD = _tObj.PO_CD;
        tObj.USER_ID = serviceLib.getUserInfo().USER_ID;

        setDatasTBL_KSV_PO_MST([]);
        setDatasTBL_KSV_PO_MST_BASE([]);
        setDatasTBL_KSV_PO_MST1([]);
        setSelectedTBL_KSV_PO_MST([]);
        setSelectedTBL_KSV_PO_MST1([]);

        setLoadingTBL_KSV_PO_MST(true);
        serviceS030504_REVISE.makeMRP(tObj).then((data) => {
            setLoadingTBL_KSV_PO_MST(false);
            if (typeof data.graphQLErrors === "undefined") {
                if (data.length > 0) {
                    if (data[0].CODE.includes("SUCC")) {
                        var tQry0 = { ...dataQRY_KSV_PO_MST };
                        var tQry = { ...emptyQRY_KSV_PO_MST };
                        tQry.PO_CD = tQry0.PO_CD;
                        tQry.PO_SEQ = tQry0.PO_SEQ;
                        setDataQRY_KSV_PO_MST(tQry);
                       
                        // Revise결과 조회
                        searchPO_MST_ADJ(data[0], data[0].CODE);

                        // Revise결과의 첫번째 항목의 세부사항 조회 
                        // 임시로 막음. 260715. Won
                        /*
                        var tInObj = { ...data[0] };
                        tInObj.PO_CD = tQry0.PO_CD;
                        tInObj.PO_SEQ = tQry0.PO_SEQ;
                        searchPO_MST(tInObj);
                        */
                    } else if (data[0].CODE.includes("WORK")) {
                        // alert(data[0].CODE);
                        // setCount(60*10);
                    } else {
                        // alert(data[0].CODE);
                        setIsProgress(false);
                    }
                }
                // console.log("mgrQueryTBL_KSV_PO_MST call => " + data.length);
            } else {
                toast.current.show({
                    severity: "success",
                    summary: "Recalc MRP Error",
                    detail: "",
                    life: 3000,
                });
                console.log(
                    "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                        JSON.stringify(data.graphQLErrors),
                );

                setDatasTBL_KSV_PO_MST([]);
                setDatasTBL_KSV_PO_MST_BASE([]);
                setDatasTBL_KSV_PO_MST1([]);
            }
        });
    };

    const reset_CHANGE_MRP = (argData) => {
        var tUserInfo = serviceLib.getUserInfo();
        var tObj = { ...dataQRY_KSV_PO_MST };
        var _tObj = { ...dataQRY_KSV_PO_MST };
        tObj.USER_ID = tUserInfo.USER_ID;

        var tInput2 = [...datasTBL_KSV_ORDER_MST];
        var tIn2 = tInput2.map((col, i) => {
            var tObj = { ...col };
            if (typeof tObj.id !== "undefined") delete tObj.id;
            if (typeof tObj.__typename !== "undefined") delete tObj.__typename;
            return tObj;
        });

        var tInput3 = [...datasTBL_KSV_PO_MST];
        var tFlag = 0;
        var tIn3 = tInput3.map((col, i) => {
            var tObj = { ...col };
            if (typeof tObj.id !== "undefined") delete tObj.id;
            if (typeof tObj.__typename !== "undefined") delete tObj.__typename;
            if (parseInt(tObj.ORDER_STATUS) > 7) tFlag = 1;
            return tObj;
        });

        //setIsProgress(true);
        serviceS030504_REVISE.resetMRP(tObj, tIn3, tIn2).then(async (data) => {
            setIsProgress(false);
            if (typeof data.graphQLErrors === "undefined") {
                if (data.length > 0) {
                    alert(data[0].CODE);
                    if (data[0].CODE.includes("SUCC")) {
                        setDatasTBL_KSV_PO_MST([]);
                        setDatasTBL_KSV_PO_MST_BASE([]);
                        setSelectedTBL_KSV_PO_MST([]);
                        setDatasTBL_KSV_PO_MST1([]);
                        setSelectedTBL_KSV_PO_MST1([]);
                    }
                }
            } else {
                toast.current.show({
                    severity: "success",
                    summary: "Recalc MRP Error",
                    detail: "",
                    life: 3000,
                });
                console.log(
                    "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });
    };

    const process_CHANGE_MRP = (argData) => {
        var tUserInfo = serviceLib.getUserInfo();

        var tObj = normalizeQRY_KSV_PO_MST({ ...dataQRY_KSV_PO_MST });
        var _tObj = normalizeQRY_KSV_PO_MST({ ...dataQRY_KSV_PO_MST });
        if (dataQRY_KSV_PO_MST_SEQ_REASON?.CD_CODE) {
            tObj.SEQ_REASON = dataQRY_KSV_PO_MST_SEQ_REASON.CD_CODE;
            _tObj.SEQ_REASON = dataQRY_KSV_PO_MST_SEQ_REASON.CD_CODE;
        }
        tObj.USER_ID = tUserInfo.USER_ID;

        if (_tObj.SEQ_COMMENT === "") {
            alert("SEQ Comment을 입력해야 합니다<br><br>You must enter a SEQ Comment");
            return;
        }
        if (_tObj.SEQ_REASON === "") {
            alert("SEQ Reason을 입력해야 합니다<br><br>You must enter SEQ Reason");
            return;
        }
        if (
            _tObj.BUYER_CHK !== "1" &&
            _tObj.SALES_CHK !== "1" &&
            _tObj.MATL_CHK !== "1" &&
            _tObj.CAD_CHK !== "1" &&
            _tObj.MRP_CHK !== "1" &&
            _tObj.ETC_CHK !== "1" &&
            _tObj.MRP2_CHK !== "1"
        ) {
            alert("Responsiblity를 Check해야 합니다<br><br>Responsiblity must be checked");
            return;
        }

        if (selectedTBL_KSV_PO_MST.length <= 0) {
            alert("처리할 데이타가 없습니다<br><br>There is no data to process");
            return;
        }

        var tInput2 = [...datasTBL_KSV_ORDER_MST];
        var tIn2 = tInput2.map((col, i) => {
            var tObj = { ...col };
            if (typeof tObj.id !== "undefined") delete tObj.id;
            if (typeof tObj.__typename !== "undefined") delete tObj.__typename;
            return tObj;
        });

        // var tInput3 = [...datasTBL_KSV_PO_MST];
        var tInput3 = [...selectedTBL_KSV_PO_MST];
        var tFlag = 0;
        var tIn3 = tInput3.map((col, i) => {
            var tObj = { ...col };
            if (typeof tObj.id !== "undefined") delete tObj.id;
            if (typeof tObj.__typename !== "undefined") delete tObj.__typename;
            if (parseInt(tObj.ORDER_STATUS) > 7) tFlag = 1;
            return tObj;
        });

        if (tIn3.length <= 0) {
            alert("처리할 데이타가 없습니다<br><br>There is no data to process");
            return;
        }

        if (tFlag === 1) {
            alert("Order Status END인것은 선택할수 없습니다<br><br>Order Status END cannot be selected.");
            return;
        }

        setIsProgress(true);
        serviceS030504_REVISE.changeMRP(tObj, tIn3, tIn2).then(async (data) => {
            setIsProgress(false);
            if (typeof data.graphQLErrors === "undefined") {
                // console.log("mgrQueryTBL_KSV_PO_MST call => " + data.length);

                if (data.length > 0) {
                    alert(data[0].CODE);
                    if (data[0].CODE.includes("SUCC")) {
                        setDatasTBL_KSV_PO_MST([]);
                        setDatasTBL_KSV_PO_MST_BASE([]);
                        setSelectedTBL_KSV_PO_MST([]);
                        setDatasTBL_KSV_PO_MST1([]);
                        setSelectedTBL_KSV_PO_MST1([]);

                        // searchPO_MST_ADJ({});
                        // searchPO_MST1({});
                        search_CODE(tObj.PO_CD);

                        var tQry = { ...emptyQRY_KSV_PO_MST };
                        tQry.PO_CD = tObj.PO_CD;
                        tQry.PO_SEQ = tIn3[0].PO_SEQ;
                        setDataQRY_KSV_PO_MST(tQry);

                        var tSaveInfo0 =
                            sessionStorage.getItem("S0305_SEL_INFO");
                        var tSaveInfo = JSON.parse(tSaveInfo0);
                        tSaveInfo.PO_SEQ = tQry.PO_SEQ;
                        sessionStorage.setItem(
                            "S0305_SEL_INFO",
                            JSON.stringify(tSaveInfo),
                        );

                        var tRet = await confirm(
                            `Po Seq=${tQry.PO_SEQ}에 대해 Stock Check진행하시겠습니까?<br><br>Do you want to proceed with Stock Check for Po Seq=${tQry.PO_SEQ}?`,
                        );
                        if (tRet) popup_STOCK_CHECK(tQry);
                    }
                }
            } else {
                toast.current.show({
                    severity: "success",
                    summary: "Save Change Proc Server Error. Contact IT Team",
                    detail: "",
                    life: 3000,
                });
                console.log(
                    "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                        JSON.stringify(data.graphQLErrors),
                );
                alert('Save Change Proc Server Error. Contact IT Team');

                // setDatasTBL_KSV_PO_MST([]);
                // setDatasTBL_KSV_PO_MST1([]);
            }
        });
    };

    const process_CHANGE_CONS = (argData) => {
        var _tObj = { ...dataQRY_KSV_PO_MST };
        var tObj = { ...dataQRY_KSV_PO_MST };
        tObj.PO_CD = _tObj.PO_CD;
        tObj.USER_ID = serviceLib.getUserInfo().USER_ID;

        // //setIsProgress(true);
        var tInput2 = { ...argData };
        delete tInput2.id;
        delete tInput2.__typename;

        setLoadingTBL_KSV_ORDER_MST(true);
        serviceS030504_REVISE.changeCONS(tObj, tInput2).then((data) => {
            setLoadingTBL_KSV_ORDER_MST(false);
            if (typeof data.graphQLErrors === "undefined") {
                if (data.length > 0 && data[0].CODE.includes("SUCC")) {
                    var tQryObj1 = {};
                    tQryObj1.PO_CD = _tObj.PO_CD;
                    tQryObj1.PO_SEQ = "";
                    search_ORDER_MST(tQryObj1);
                }
            } else {
                toast.current.show({
                    severity: "success",
                    summary: "Recalc MRP Error",
                    detail: "",
                    life: 3000,
                });
                console.log(
                    "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                        JSON.stringify(data.graphQLErrors),
                );

                // setDatasTBL_KSV_PO_MST([]);
                // setDatasTBL_KSV_PO_MST1([]);
            }
        });
    };

    const searchPO_MST_ADJ = (argData, argMessage) => {
        var _tObj = { ...dataQRY_KSV_PO_MST };

        var tObj = {};
        tObj.PO_CD = _tObj.PO_CD;
        if (typeof argData.PO_CD !== "undefined") tObj.PO_CD = argData.PO_CD;
        if (typeof argData.NEW_PO_SEQ === "undefined")
            tObj.PO_SEQ = _tObj.PO_SEQ;
        else tObj.PO_SEQ = argData.NEW_PO_SEQ;
        tObj.ORDER_CD = "";

        var tObj1 = { ...argData };
        delete tObj1.__typename;

        setLoadingTBL_KSV_PO_MST(true);
        serviceS030504_REVISE
            .mgrQueryTBL_KSV_PO_MST_ADJ(tObj, tObj1)
            .then((data) => {
                setLoadingTBL_KSV_PO_MST(false);
                if (typeof data.graphQLErrors === "undefined") {
                    console.log(
                        "mgrQueryTBL_KSV_PO_MST call => " + data.length,
                    );
                    var tObjs = data.map((col, i) => {
                        var tObj = { ...col };
                        tObj.id = i + 1;
                        return tObj;
                    });
                    if (tObjs.length <= 0) {
                        alert(`변경된 내역이 없습니다<br><br>No changes have been made`);
                    } else {
                        if (argMessage) alert(argMessage);
                        setDatasTBL_KSV_PO_MST(tObjs);
                        setDatasTBL_KSV_PO_MST_BASE(tObjs);
                    }
                } else {
                    console.log(
                        "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });
    };

    const searchPO_MST = (argData) => {
        var _tObj = {};
        if (typeof argData.PO_CD !== "undefined") {
            _tObj = { ...argData };
        } else {
            _tObj = { ...dataQRY_KSV_PO_MST };
        }

        var tObj = {};
        tObj.PO_CD = _tObj.PO_CD;
        tObj.PO_SEQ = _tObj.PO_SEQ;
        tObj.ORDER_CD = _tObj.ORDER_CD;

        var tObj1 = { ...argData };
        delete tObj1.__typename;
        delete tObj1.id;

        setLoadingTBL_KSV_PO_MST(true);
        serviceS030504_REVISE.mgrQueryTBL_KSV_PO_MST(tObj).then((data) => {
            setLoadingTBL_KSV_PO_MST(false);
            if (typeof data.graphQLErrors === "undefined") {
                var tObjs = data.DATA1.map((col, i) => {
                    var tObj = { ...col };
                    tObj.id = i + 1;
                    return tObj;
                });
                setDatasTBL_KSV_PO_MST(tObjs);
                setDatasTBL_KSV_PO_MST_BASE(tObjs);

                if (data.DATA2.length > 0) {
                    var tOne = { ...data.DATA2[0] };
                    var tQryObj = normalizeQRY_KSV_PO_MST({
                        ...dataQRY_KSV_PO_MST,
                    });
                    tQryObj.PO_SEQ = tObj.PO_SEQ;
                    tQryObj.APPROVAL = tOne.APPROVAL ?? "";
                    tQryObj.SEQ_COMMENT = tOne.SEQ_COMMENT ?? "";
                    tQryObj.SEQ_REASON = tOne.SEQ_REASON ?? "";
                    tQryObj.BUYER_CHK = tOne.BUYER_CHK ?? "0";
                    tQryObj.SALES_CHK = tOne.SALES_CHK ?? "0";
                    tQryObj.MATL_CHK = tOne.MATL_CHK ?? "0";
                    tQryObj.CAD_CHK = tOne.CAD_CHK ?? "0";
                    tQryObj.MRP_CHK = tOne.MRP_CHK ?? "0";
                    tQryObj.MRP2_CHK = tOne.MRP2_CHK ?? "0";
                    tQryObj.ETC_CHK = tOne.ETC_CHK ?? "0";
                    setDataQRY_KSV_PO_MST(tQryObj);
                    editQRY_KSV_PO_MST_SEQ_REASON(tOne.SEQ_REASON ?? "");
                }
            } else {
                console.log(
                    "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });
    };

    const searchPO_MST1 = (argData) => {
        var _tObj = { ...dataQRY_KSV_PO_MST };

        var tObj = {};
        tObj.PO_CD = _tObj.PO_CD;
        tObj.PO_SEQ = argData.PO_SEQ;
        tObj.ORDER_CD = argData.ORDER_CD;
        tObj.MATL_CD = argData.MATL_CD;
        tObj.MRP_SEQ = argData.MRP_SEQ;
        tObj.SEQ = argData.SEQ;

        var tObj1 = { ...argData };
        delete tObj1.__typename;

        setLoadingTBL_KSV_PO_MST1(true);
        serviceS030504_REVISE
            .mgrQueryTBL_KSV_PO_MST1(tObj, tObj1)
            .then((data) => {
                setLoadingTBL_KSV_PO_MST1(false);
                if (typeof data.graphQLErrors === "undefined") {
                    console.log(
                        "mgrQueryTBL_KSV_PO_MST call => " + data.length,
                    );
                    var tObjs = data.map((col, i) => {
                        var tObj = { ...col };
                        tObj.id = i + 1;
                        return tObj;
                    });
                    setDatasTBL_KSV_PO_MST1(tObjs);
                } else {
                    console.log(
                        "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });
    };

    const onRowClick1TBL_KSV_ORDER_MST = (argData0) => {
        var argData = {};

        if (typeof argData0.length !== "undefined") {
            argData = argData0[0];
        } else {
            argData = argData0;
        }

        let argTBL_KSV_ORDER_MST = argData;

        setDataTBL_KSV_ORDER_MST(argTBL_KSV_ORDER_MST);

        setDatasTBL_KSV_PO_MST1([]);

        argData.PO_CD = dataQRY_KSV_PO_MST.PO_CD;
        argData.PO_SEQ = dataQRY_KSV_PO_MST.PO_SEQ;
        searchPO_MST(argData);
        // searchPO_MST1(argData);
    };

    const onRowClickTBL_KSV_ORDER_MST = (argData0) => {
        var tColName = "";
        var tKeys = Object.keys(argData0.data);
        tKeys.forEach((col, i) => {
            var tValue = argData0.data[`${col}`];
            if (tValue === argData0.originalEvent.target.innerText) {
                tColName = col;
            }
        });
        console.log("Col Name:" + tColName);
        if (tColName === "CONS_F") {
            var tInObj = { ...argData0.data };
            if (tInObj.CONS_F === "N") tInObj.CONS_F = "Y";
            else tInObj.CONS_F = "N";
            process_CHANGE_CONS(tInObj);
            // popup_MATL_MST(argData0.originalEvent.target.innerText);
        }
        if (tColName === "CONS_A") {
            var tInObj = { ...argData0.data };
            if (tInObj.CONS_A === "N") tInObj.CONS_A = "Y";
            else tInObj.CONS_A = "N";
            process_CHANGE_CONS(tInObj);
            // popup_MATL_MST(argData0.originalEvent.target.innerText);
        }

        // Service : NawooAll:mgrQueryTBL_KSV_ORDER_MST
    };

    /**TABLE KSV_PO_MST */
    /*
              a.PO_SEQ,
              a.ORDER_CD,
              a.MATL_CD,
              c.MATL_NAME,
              c.COLOR,
              c.SPEC,
              b.cd_name as USE_PO_TYPE_N,  // PO_TYPE
                    a.USE_QTY,
              a.PO_QTY,
              0 as COL1,                   // BEF_PO_QTY
              0 as COL2,                   // NEW_QTY
              a.DIFF_QTY,
              e.cd_name as DIFF_PO_TYPE_N,
              '0' as COL3,                 // CHK_DIFF3 
              d.VENDOR_NAME,
                    a.MRP_SEQ,
              a.MATL_SEQ,
              a.MATL_PRICE,
              a.CURR_CD,
              a.TOT_AMT,
              a.USE_SIZE,
              '' as COL3,                  // ORDER_STATUS
              '' as COL4                   // SEQ - ksv_po_mrptempre_detail.seq
  */

    // DEFINE DATAGRID : TBL_KSV_PO_MST
    const [loadingTBL_KSV_PO_MST, setLoadingTBL_KSV_PO_MST] = useState(false);
    const [datasTBL_KSV_PO_MST, setDatasTBL_KSV_PO_MST] = useState([]);
    const [datasTBL_KSV_PO_MST_BASE, setDatasTBL_KSV_PO_MST_BASE] = useState([]);
    const [dataFILTER_TBL_KSV_PO_MST, setDataFILTER_TBL_KSV_PO_MST] = useState({
        MATL_CD: "",
        VENDOR_NAME: "",
        COLOR: "",
        SPEC: "",
        MATL_NAME: "",
    });
    const dt_TBL_KSV_PO_MST = useRef(null);
    const [dataTBL_KSV_PO_MST, setDataTBL_KSV_PO_MST] =
        useState(emptyTBL_KSV_PO_MST);
    const [selectedTBL_KSV_PO_MST, setSelectedTBL_KSV_PO_MST] = useState([]);
    const isVendorNameClickRef = useRef(false);
    const [flagSelectModeTBL_KSV_PO_MST, setFlagSelectModeTBL_KSV_PO_MST] =
        useState(false);

    // DATAGRID CODE : TBL_KSV_PO_MST

    const onRowClick1TBL_KSV_PO_MST = (argData0) => {
        console.log("Click1", argData0);

        if (typeof argData0 === "undefined") return;

        var argData = {};

        if (typeof argData0.length !== "undefined") {
            argData = argData0[argData0.length - 1];
        } else {
            argData = argData0;
        }

        let argTBL_KSV_PO_MST = argData;

        setDataTBL_KSV_PO_MST(argTBL_KSV_PO_MST);
    };

    const handleVendorNameClick = (e, vendorName) => {
        e.stopPropagation();
        e.preventDefault();
        isVendorNameClickRef.current = true;
        setTimeout(() => {
            isVendorNameClickRef.current = false;
        }, 0);

        const vendorKey = String(vendorName ?? "").trim();
        if (vendorKey === "") return;

        setSelectedTBL_KSV_PO_MST((prevSelected) => {
            const isAlreadySelected = prevSelected.some(
                (col) => String(col.VENDOR_NAME ?? "").trim() === vendorKey,
            );
            if (isAlreadySelected) {
                return prevSelected.filter(
                    (col) => String(col.VENDOR_NAME ?? "").trim() !== vendorKey,
                );
            } else {
                const toAdd = datasTBL_KSV_PO_MST.filter(
                    (col) =>
                        String(col.VENDOR_NAME ?? "").trim() === vendorKey &&
                        !prevSelected.some((r) => r.id === col.id),
                );
                return [...prevSelected, ...toAdd];
            }
        });
    };

    const onRowClickTBL_KSV_PO_MST = (event) => {
        if (typeof event.data.PO_SEQ !== "undefined") searchPO_MST1(event.data);
    };

    const onCellEditCompleteTBL_KSV_PO_MST = (e) => {
        let { rowData, newValue, field, originalEvent: event } = e;
        rowData[field] = newValue;
    };

    const textEditor = (options) => {
        return (
            <InputText
                type="text"
                value={options.value}
                autoFocus
                onFocus={(e) => e.target.select()}
                onChange={(e) => options.editorCallback(e.target.value)}
            />
        );
    };

    const cellEditorTBL_KSV_PO_MST = (options) => {
        return textEditor(options);
    };

    /**TABLE KSV_PO_MST1 */
    // DEFINE DATAGRID : TBL_KSV_PO_MST1
    const [datasTBL_KSV_PO_MST1, setDatasTBL_KSV_PO_MST1] = useState([]);
    const dt_TBL_KSV_PO_MST1 = useRef(null);
    const [dataTBL_KSV_PO_MST1, setDataTBL_KSV_PO_MST1] =
        useState(emptyTBL_KSV_PO_MST1);
    const [selectedTBL_KSV_PO_MST1, setSelectedTBL_KSV_PO_MST1] = useState([]);
    const [flagSelectModeTBL_KSV_PO_MST1, setFlagSelectModeTBL_KSV_PO_MST1] =
        useState(false);
    const [loadingTBL_KSV_PO_MST1, setLoadingTBL_KSV_PO_MST1] = useState(false);

    const onInputChangeFILTER_TBL_KSV_PO_MST = (e, name) => {
        const val = (e.target && e.target.value) || "";
        setDataFILTER_TBL_KSV_PO_MST((prev) => ({
            ...prev,
            [name]: val,
        }));
    };

    const onKeyDownFILTER_TBL_KSV_PO_MST = (e) => {
        if (e.key === "Enter") {
            process_FILTER_TBL_KSV_PO_MST();
        }
    };

    const process_FILTER_TBL_KSV_PO_MST = () => {
        const sourceRows =
            datasTBL_KSV_PO_MST_BASE.length > 0
                ? datasTBL_KSV_PO_MST_BASE
                : datasTBL_KSV_PO_MST;

        const matlCd = dataFILTER_TBL_KSV_PO_MST.MATL_CD.trim().toLowerCase();
        const vendor = dataFILTER_TBL_KSV_PO_MST.VENDOR_NAME.trim().toLowerCase();
        const color = dataFILTER_TBL_KSV_PO_MST.COLOR.trim().toLowerCase();
        const spec = dataFILTER_TBL_KSV_PO_MST.SPEC.trim().toLowerCase();
        const desc = dataFILTER_TBL_KSV_PO_MST.MATL_NAME.trim().toLowerCase();

        const filteredRows = sourceRows.filter((row) => {
            const rowMatlCd = String(row.MATL_CD || "").toLowerCase();
            const rowVendor = String(row.VENDOR_NAME || "").toLowerCase();
            const rowColor = String(row.COLOR || "").toLowerCase();
            const rowSpec = String(row.SPEC || "").toLowerCase();
            const rowDesc = String(row.MATL_NAME || "").toLowerCase();

            if (matlCd !== "" && !rowMatlCd.includes(matlCd)) return false;
            if (vendor !== "" && !rowVendor.includes(vendor)) return false;
            if (color !== "" && !rowColor.includes(color)) return false;
            if (spec !== "" && !rowSpec.includes(spec)) return false;
            if (desc !== "" && !rowDesc.includes(desc)) return false;
            return true;
        });

        setDatasTBL_KSV_PO_MST(filteredRows);
        setSelectedTBL_KSV_PO_MST((prev) =>
            prev.filter((one) => filteredRows.some((row) => row.id === one.id)),
        );
    };

    const process_RESET_FILTER_TBL_KSV_PO_MST = () => {
        setDataFILTER_TBL_KSV_PO_MST({
            MATL_CD: "",
            VENDOR_NAME: "",
            COLOR: "",
            SPEC: "",
            MATL_NAME: "",
        });

        if (datasTBL_KSV_PO_MST_BASE.length > 0) {
            setDatasTBL_KSV_PO_MST(datasTBL_KSV_PO_MST_BASE);
        }
    };

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

    const initSearch  = (argPoCd, argPoSeq) => {
         var tObj = {};
         tObj.PO_CD = argPoCd;
         tObj.PO_SEQ = argPoSeq;

         serviceS030504_REVISE
             .mgrQuery_CODE(tObj)
             .then((data) => {
                 if (
                     typeof data.graphQLErrors ===
                     "undefined"
                 ) {
                     console.log(
                         "mgrQueryTBL_KSV_ORDER_MST call => " +
                             data.PO_SEQ.length,
                     );
                     setDatasQRY_KSV_PO_MST_PO_SEQ(
                         data.PO_SEQ,
                     );

                     var tObj0 = {};
                     data.PO_SEQ.forEach((col, i) => {
                         if (col.CD_CODE === argPoSeq)
                             tObj0 = { ...col };
                     });
                     setDataQRY_KSV_PO_MST_PO_SEQ(tObj0);

                     setDatasQRY_KSV_PO_MST_SEQ_REASON(
                         data.SEQ_REASON,
                     );
                     setDataQRY_KSV_PO_MST_SEQ_REASON(
                         data.SEQ_REASON[0],
                     );

                     var _tObj = { ...dataQRY_KSV_PO_MST };
                     _tObj.PO_CD = argPoCd;
                     _tObj.PO_SEQ = argPoSeq;
                     setDataQRY_KSV_PO_MST(_tObj);
                 } else {
                     console.log(
                         "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                             JSON.stringify(
                                 data.graphQLErrors,
                             ),
                     );
                 }
             });

         var tQryObj1 = {};
         tQryObj1.PO_CD = argPoCd;
         tQryObj1.PO_SEQ = "";
         search_ORDER_MST(tQryObj1);

         var tQryObj2 = {};
         tQryObj2.PO_CD = argPoCd;
         tQryObj2.PO_SEQ = argPoSeq;
    }

    const processWorkCheck = (argPoCd, argPoSeq) => {
        var _userInfo = serviceLib.getUserInfo();

        var tIn1 = {};
        tIn1.PO_CD = argPoCd;
        tIn1.OP_KIND = "1";

        var tWorkStatus = "";
        serviceS0305_MRP_MANAGER
            .mgrQuery_WORK_STATUS(tIn1)
            .then(async (data) => {
                if (typeof data.graphQLErrors === "undefined") {
                    if (data.length > 0) {
                        tWorkStatus = data[0].WORK_STATUS;
                        // alert(tWorkStatus);
                        if (tWorkStatus.includes("SUCCESS:REVISE MAKE")) {
                            setCount(0);
                            /*
                            alert(
                                "계산 완료된 Revise 결과가 있습니다. 확인후 New Seq진행해 주세요",
                            );
                            */
                            setIsProgress(false);

                            var tObj2 = {};
                            tObj2.PO_CD = argPoCd;
                            tObj2.PO_SEQ = argPoSeq;

                            serviceS030504_REVISE
                                .mgrQuery_CODE(tObj2)
                                .then((data) => {
                                    if (
                                        typeof data.graphQLErrors ===
                                        "undefined"
                                    ) {
                                        console.log(
                                            "mgrQueryTBL_KSV_ORDER_MST call => " +
                                                data.PO_SEQ.length,
                                        );
                                        setDatasQRY_KSV_PO_MST_PO_SEQ(
                                            data.PO_SEQ,
                                        );

                                        var tObj0 = {};
                                        data.PO_SEQ.forEach((col, i) => {
                                            if (col.CD_CODE === argPoSeq)
                                                tObj0 = { ...col };
                                        });
                                        setDataQRY_KSV_PO_MST_PO_SEQ(tObj0);

                                        setDatasQRY_KSV_PO_MST_SEQ_REASON(
                                            data.SEQ_REASON,
                                        );
                                        setDataQRY_KSV_PO_MST_SEQ_REASON(
                                            data.SEQ_REASON[0],
                                        );

                                        var _tObj = { ...dataQRY_KSV_PO_MST };
                                        _tObj.PO_CD = argPoCd;
                                        _tObj.PO_SEQ = argPoSeq;
                                        setDataQRY_KSV_PO_MST(_tObj);
                                    } else {
                                        console.log(
                                            "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                                                JSON.stringify(
                                                    data.graphQLErrors,
                                                ),
                                        );
                                    }
                                });

                            var tCols = tWorkStatus.split(":");
                            var tObj = {};
                            tObj.PO_CD = argPoCd;
                            tObj.NEW_PO_SEQ = tCols[4];
                            tObj.ORDER_CD = "";
                            searchPO_MST_ADJ(tObj);

                            var tObj1 = {};
                            tObj1.PO_CD = argPoCd;
                            tObj1.PO_SEQ = "";
                            search_ORDER_MST(tObj1);
                        } else if (
                            tWorkStatus.includes("SUCCESS:REVISE CHANGE")
                        ) {
                            setIsProgress(false);
                            setCount(0);

                            var tCols = tWorkStatus.split(":");
                            var tPoCd = tCols[2];
                            var tPoSeq = tCols[3];
                            searchPO_MST_ADJ({});
                            // searchPO_MST1({});
                            search_CODE(tPoCd);
                            var tObj = {};
                            tObj.PO_CD = tPoCd;
                            tObj.PO_SEQ = tPoSeq;
                            var tRet = await confirm(
                                `Po Seq=${tPoSeq}에 대해 Stock Check진행하시겠습니까?<br><br>Do you want to proceed with Stock Check for Po Seq=${tPoSeq}?`,
                            );
                            if (tRet) popup_STOCK_CHECK(tObj);
                        } else if (tWorkStatus.includes("WORK")) {
                        } else if (tWorkStatus === "") {
                            setIsProgress(false);
                            setCount(0);

                            var tObj = {};
                            tObj.PO_CD = argPoCd;
                            tObj.PO_SEQ = argPoSeq;

                            serviceS030504_REVISE
                                .mgrQuery_CODE(tObj)
                                .then((data) => {
                                    if (
                                        typeof data.graphQLErrors ===
                                        "undefined"
                                    ) {
                                        console.log(
                                            "mgrQueryTBL_KSV_ORDER_MST call => " +
                                                data.PO_SEQ.length,
                                        );
                                        setDatasQRY_KSV_PO_MST_PO_SEQ(
                                            data.PO_SEQ,
                                        );

                                        var tObj0 = {};
                                        data.PO_SEQ.forEach((col, i) => {
                                            if (col.CD_CODE === argPoSeq)
                                                tObj0 = { ...col };
                                        });
                                        setDataQRY_KSV_PO_MST_PO_SEQ(tObj0);

                                        setDatasQRY_KSV_PO_MST_SEQ_REASON(
                                            data.SEQ_REASON,
                                        );
                                        setDataQRY_KSV_PO_MST_SEQ_REASON(
                                            data.SEQ_REASON[0],
                                        );

                                        var _tObj = { ...dataQRY_KSV_PO_MST };
                                        _tObj.PO_CD = argPoCd;
                                        _tObj.PO_SEQ = argPoSeq;
                                        setDataQRY_KSV_PO_MST(_tObj);
                                    } else {
                                        console.log(
                                            "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                                                JSON.stringify(
                                                    data.graphQLErrors,
                                                ),
                                        );
                                    }
                                });

                            var tQryObj1 = {};
                            tQryObj1.PO_CD = argPoCd;
                            tQryObj1.PO_SEQ = "";
                            search_ORDER_MST(tQryObj1);

                            var tQryObj2 = {};
                            tQryObj2.PO_CD = argPoCd;
                            tQryObj2.PO_SEQ = argPoSeq;
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

    /*
    useEffect(() => {
        const id = setInterval(() => {
            if (count > 0) {
                processWorkCheck(dataQRY_KSV_PO_MST.PO_CD, "");
            }
            setCount((count) => count - 1);
        }, 1000);

        console.log(`timer: ${count} `);

        if (count === 0) {
            clearInterval(id);
        }
        return () => clearInterval(id);
    }, [count]);
    */

    useEffect(() => {
        let tPO_CD = "";
        let tPO_SEQ = "";

        var tUrls = window.location.href.split("?");
        if (tUrls.length <= 1) {
        } else {
            var tParams1 = tUrls[1].split("&");
            tParams1.forEach((col, i) => {
                var tObj = {};
                var tCols = col.split("=");
                if (tCols[0].includes("PO_CD")) {
                    tObj.key = tCols[0];
                    tObj.value = tCols[1];
                    console.log(tObj);
                    tPO_CD = tObj.value;
                }
                if (tCols[0].includes("PO_SEQ")) {
                    tObj.key = tCols[0];
                    tObj.value = tCols[1];
                    console.log(tObj);
                    tPO_SEQ = tObj.value;
                }
            });
            // console.log(tParams2);
        }

        if (tPO_CD !== "") {
            console.log("S0305 Po Cd :(param)" + tPO_CD);
        } else {
            tPO_CD = localStorage.getItem("AF_S0305_PO_CD");
            console.log("S0305 Po Cd: (localstorage)" + tPO_CD);
            if (tPO_CD === null) tPO_CD = "PO23-0226";
        }

        var tObj = {};
        tObj.PO_CD = tPO_CD;
        tObj.PO_SEQ = "";

        initSearch (tPO_CD, tPO_SEQ);
        // processWorkCheck(tPO_CD, tPO_SEQ);
        // search_ALL_LIST();
        // search_ALL_LIST (tQryObj2);
    }, []);

    const blankFn = () => {};

    // Support Area

    const changeCheckBoxVal = (argVal) => {
        if (argVal === "1") return true;
        else return false;
    };

    const popup_MRP_PACK = () => {
        serviceS0305_MRP_MANAGER
            .mgrQuery_WORK_STATUS({
                PO_CD:  dataQRY_KSV_PO_MST.PO_CD,
                OP_KIND: "0",
            })
            .then((data) => {
                if (typeof data.graphQLErrors !== "undefined") {
                    console.log(
                        "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                    return;
                }

                if (data.length > 0 && data[0].WORK_STATUS !== "") {
                    alert(
                        `해당 PO(${dataQRY_KSV_PO_MST.PO_CD})에 대해서 Mrp or Revise작업중이거나 미처리된 작업결과가 있습니다.`,
                    );
                    return;
                }

                window.parent.postMessage(
                    {
                        func: "call_url",
                        message: {
                            key: "2-27",
                            label: "MRP PACK",
                            icon: "pi pi-fw pi-user-edit",
                            url1: `S030515_MRP_PACK?PO_CD=${dataQRY_KSV_PO_MST.PO_CD}`,
                        },
                    },
                    "*",
                );
            });
    };

    return (
        <div className="af-div-main">
            <div
                className="af-div-first"
                style={{ width: "123rem", height: "8rem" }}
            >
                <span className="af-span-3-0" style={{ width: "11rem" }}>
                    <p className="af-span-p" style={{ width: "4rem" }}>PO#</p>
                    <div className="af-span-div" style={{ width: "6rem" }}>
                        <InputText
                            style={{ width: "6rem" }}
                            id="id_PO_CD"
                            value={dataQRY_KSV_PO_MST.PO_CD}
                            onChange={(e) =>
                                onInputChangeQRY_KSV_PO_MST_PO_CD(e, "PO_CD")
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "11rem" }}>
                    <p className="af-span-p" style={{ width: "4rem" }}>Seq</p>
                    <div className="af-span-div" style={{ width: "6rem" }}>
                        <Dropdown
                            id="id_PO_SEQ"
                            style={{ width: "6rem" }}
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
                        ></Dropdown>
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "61rem" }}>
                    <div className="af-span-div-btn" style={{ width: "8rem" }}>
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
                            style={{ width: "8rem" }}
                            className="p-button-text"
                            onClick={search_ALL_LIST}
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "11rem" }}>
                    <div className="af-span-div-btn" style={{ width: "10rem" }}>
                        <Button
                            label="Need Q'ty Revise"
                            style={{ width: "10rem" }}
                            className="p-button-text"
                            onClick={process_RECALC_MRP}
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "14rem" }}>
                    <div className="af-span-div-btn" style={{ width: "13rem" }}>
                        <Button
                            label="New Seq"
                            style={{ width: "13rem" }}
                            className="p-button-text"
                            onClick={process_CHANGE_MRP}
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "9rem" }}>
                    <div className="af-span-div-btn" style={{ width: "8rem" }}>
                        <Button
                            label="Reset Result"
                            style={{ width: "8rem" }}
                            className="p-button-text"
                            onClick={reset_CHANGE_MRP}
                        />
                    </div>
                </span>

                <span className="af-span-3" style={{ width: "84rem" }}>
                    <p className="af-span-p" style={{ width: "11rem" }}>Seq Comment</p>
                    <div className="af-span-div" style={{ width: "72rem" }}>
                        <InputText
                            style={{ width: "72rem" }}
                            id="id_REASON"
                            value={dataQRY_KSV_PO_MST.SEQ_COMMENT}
                            onChange={(e) =>
                                onInputChangeQRY_KSV_PO_MST_SEQ_COMMENT(
                                    e,
                                    "SEQ_COMMENT",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "11rem" }}>
                    <div className="af-span-div-btn" style={{ width: "10rem" }}>
                        <Button
                            style={{ width: "10rem" }}
                            label="Comm.Upd."
                            className="p-button-text"
                            onClick={process_UPDATE_COMMENT}
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "22rem" }}>
                    <div className="af-span-div-btn " style={{ width: "13rem" }}>
                        <Button
                            label="MRP Pack"
                            style={{ width: "13rem" }}
                            className="p-button-text orange"
                            //onClick={search_REPORT_MATL_LIST_NET_QTY}
                            onClick={popup_MRP_PACK}
                        />
                    </div>
                </span>

                <span className="af-span-3" style={{ width: "12rem" }}>
                    <p className="af-span-p" style={{ width: "11rem" }}>Reason/Responsibility:</p>
                </span>
                <span className="af-span-3" style={{ width: "5rem" }}>
                    <p className="af-span-p" style={{ width: "3rem" }}>Sales</p>
                    <div className="af-span-checkbox">
                        <Checkbox
                            id="id_SALES_CHK"
                            checked={changeCheckBoxVal(
                                dataQRY_KSV_PO_MST.SALES_CHK,
                            )}
                            onChange={(e) =>
                                onCheckboxChangeQRY_KSV_PO_MST_SALES_CHK(
                                    e,
                                    "SALES_CHK",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "5rem" }}>
                    <p className="af-span-p" style={{ width: "3rem" }}>Buyer</p>
                    <div className="af-span-checkbox">
                        <Checkbox
                            id="id_BUYER_CHK"
                            checked={changeCheckBoxVal(
                                dataQRY_KSV_PO_MST.BUYER_CHK,
                            )}
                            onChange={(e) =>
                                onCheckboxChangeQRY_KSV_PO_MST_BUYER_CHK(
                                    e,
                                    "BUYER_CHK",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "5rem" }}>
                    <p className="af-span-p" style={{ width: "3rem" }}>CAD</p>
                    <div className="af-span-checkbox">
                        <Checkbox
                            id="id_CAD_CHK"
                            checked={changeCheckBoxVal(
                                dataQRY_KSV_PO_MST.CAD_CHK,
                            )}
                            onChange={(e) =>
                                onCheckboxChangeQRY_KSV_PO_MST_CAD_CHK(
                                    e,
                                    "CAD_CHK",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "5rem" }}>
                    <p className="af-span-p" style={{ width: "3rem" }}>MRP</p>
                    <div className="af-span-checkbox">
                        <Checkbox
                            id="id_MRP_CHK"
                            checked={changeCheckBoxVal(
                                dataQRY_KSV_PO_MST.MRP_CHK,
                            )}
                            onChange={(e) =>
                                onCheckboxChangeQRY_KSV_PO_MST_MRP_CHK(
                                    e,
                                    "MRP_CHK",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "5rem" }}>
                    <p className="af-span-p" style={{ width: "3rem" }}>MRP2</p>
                    <div className="af-span-checkbox">
                        <Checkbox
                            id="id_MRP2_CHK"
                            checked={changeCheckBoxVal(
                                dataQRY_KSV_PO_MST.MRP2_CHK,
                            )}
                            onChange={(e) =>
                                onCheckboxChangeQRY_KSV_PO_MST_MRP2_CHK(
                                    e,
                                    "MRP2_CHK",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "5rem" }}>
                    <p className="af-span-p" style={{ width: "3rem" }}>MATL</p>
                    <div className="af-span-checkbox">
                        <Checkbox
                            checked={changeCheckBoxVal(
                                dataQRY_KSV_PO_MST.MATL_CHK,
                            )}
                            onChange={(e) =>
                                onCheckboxChangeQRY_KSV_PO_MST_MATL_CHK(
                                    e,
                                    "MATL_CHK",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "5rem" }}>
                    <p className="af-span-p" style={{ width: "3rem" }}>ETC</p>
                    <div className="af-span-checkbox">
                        <Checkbox
                            id="id_ETC_CHK"
                            checked={changeCheckBoxVal(
                                dataQRY_KSV_PO_MST.ETC_CHK,
                            )}
                            onChange={(e) =>
                                onCheckboxChangeQRY_KSV_PO_MST_ETC_CHK(
                                    e,
                                    "ETC_CHK",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "33rem" }}>
                    <div className="af-span-div" style={{ width: "19rem" }}>
                        <Dropdown
                            istyle={{ width: "19rem" }}
                            id="id_SEQ_REASON"
                            value={dataQRY_KSV_PO_MST_SEQ_REASON}
                            onChange={(e) =>
                                onDropdownChangeQRY_KSV_PO_MST_SEQ_REASON(
                                    e,
                                    "SEQ_REASON",
                                )
                            }
                            options={datasQRY_KSV_PO_MST_SEQ_REASON}
                            optionLabel="CD_NAME"
                            placeholder=""
                            editable
                            filter
                        ></Dropdown>
                    </div>
                </span>

                <span className="af-span-3" style={{ width: "11rem" }}>
                    <div className="af-span-div-btn" style={{ width: "10rem" }}>
                        <Button
                            label="Resp.Upd"
                            style={{ width: "10rem" }}
                            className="p-button-text"
                            onClick={process_UPDATE_RESP}
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "14rem" }}>
                    <div className="af-span-div-btn" style={{ width: "13rem" }}>
                        <Button
                            label="Stock Check"
                            style={{ width: "13rem" }}
                            className="p-button-text orange"
                            onClick={popup_STOCK_CHECK}
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "8rem" }}>
                    <div className="af-span-div-btn" style={{ width: "8rem" }}>
                        <Button
                            label="MRP List"
                            style={{ width: "8rem" }}
                            className="p-button-text green"
                            onClick={search_REPORT_MRP_LIST}
                        />
                    </div>
                </span>
            </div>

            <div
                className="af-div-first"
                style={{ width: "123rem", height: "12rem" }}
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
                    dataKey="ORDER_CD"
                    className="datatable-responsive"
                    virtualScrollerOptions={{ itemSize: 17 }}
                    emptyMessage=" " //header={headerTBL_KSV_ORDER_MST}
                    responsiveLayout="scroll"
                    scrollable
                    scrollHeight="12rem"
                >
                    <AFColumn field="ORDER_CD" headerClassName="t-header" header="Order" style={{ width: "8rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="STYLE_NAME" headerClassName="t-header" header="Style" style={{ width: "15rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="BUYER_NAME" headerClassName="t-header" header="Buyer" style={{ width: "8rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="TOT_CNT" headerClassName="t-header" header="Qty" style={{ width: "5rem", flexBasis: "auto" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.TOT_CNT) } ></AFColumn>
                    <AFColumn field="DUE_DATE" headerClassName="t-header" header="Due Date" style={{ width: "8rem", flexBasis: "auto" }} body={(rowData) => serviceLib.dateFormat(rowData.DUE_DATE) } ></AFColumn>
                    <AFColumn field="FACTORY_NAME" headerClassName="t-header" header="Factory" style={{ width: "12rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="CONS_F" headerClassName="t-header" header="F" style={{ width: "6rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="CONS_A" headerClassName="t-header" header="A" style={{ width: "6rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="ORDER_STATUS_N" headerClassName="t-header" header="Ord Status" style={{ width: "8rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="ORDER_STATUS" headerClassName="t-header" header="Ord Status CD" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                </AFDataTable>
            </div>
            <div
                className="af-div-first"
                style={{ width: "123rem", height: "3rem", flexWrap: "nowrap", marginBottom: "-0.7rem" }}
            >
                <span className="af-span-3" style={{ width: "16rem" }}>
                    <p className="af-span-p" style={{ width: "6rem" }}>Matl Cd</p>
                    <div className="af-span-div" style={{ width: "9rem" }}>
                        <InputText
                            style={{ width: "9rem" }}
                            value={dataFILTER_TBL_KSV_PO_MST.MATL_CD}
                            onChange={(e) =>
                                onInputChangeFILTER_TBL_KSV_PO_MST(e, "MATL_CD")
                            }
                            onKeyDown={onKeyDownFILTER_TBL_KSV_PO_MST}
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "22rem" }}>
                    <p className="af-span-p" style={{ width: "8rem" }}>Description</p>
                    <div className="af-span-div" style={{ width: "13rem" }}>
                        <InputText
                            style={{ width: "13rem" }}
                            value={dataFILTER_TBL_KSV_PO_MST.MATL_NAME}
                            onChange={(e) =>
                                onInputChangeFILTER_TBL_KSV_PO_MST(e, "MATL_NAME")
                            }
                            onKeyDown={onKeyDownFILTER_TBL_KSV_PO_MST}
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "16rem" }}>
                    <p className="af-span-p" style={{ width: "5rem" }}>Color</p>
                    <div className="af-span-div" style={{ width: "10rem" }}>
                        <InputText
                            style={{ width: "10rem" }}
                            value={dataFILTER_TBL_KSV_PO_MST.COLOR}
                            onChange={(e) =>
                                onInputChangeFILTER_TBL_KSV_PO_MST(e, "COLOR")
                            }
                            onKeyDown={onKeyDownFILTER_TBL_KSV_PO_MST}
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "20rem" }}>
                    <p className="af-span-p" style={{ width: "4rem" }}>Spec</p>
                    <div className="af-span-div" style={{ width: "14rem" }}>
                        <InputText
                            style={{ width: "14rem" }}
                            value={dataFILTER_TBL_KSV_PO_MST.SPEC}
                            onChange={(e) =>
                                onInputChangeFILTER_TBL_KSV_PO_MST(e, "SPEC")
                            }
                            onKeyDown={onKeyDownFILTER_TBL_KSV_PO_MST}
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "20rem" }}>
                    <p className="af-span-p" style={{ width: "7rem" }}>Supplier</p>
                    <div className="af-span-div" style={{ width: "12rem" }}>
                        <InputText
                            style={{ width: "12rem" }}
                            value={dataFILTER_TBL_KSV_PO_MST.VENDOR_NAME}
                            onChange={(e) =>
                                onInputChangeFILTER_TBL_KSV_PO_MST(
                                    e,
                                    "VENDOR_NAME",
                                )
                            }
                            onKeyDown={onKeyDownFILTER_TBL_KSV_PO_MST}
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "8rem" }}>
                    <div className="af-span-div-btn" style={{ width: "7rem" }}>
                        <Button
                            label="Filter"
                            style={{ width: "7rem" }}
                            className="p-button-text"
                            onClick={process_FILTER_TBL_KSV_PO_MST}
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "7rem" }}>
                    <div className="af-span-div-btn" style={{ width: "6rem" }}>
                        <Button
                            label="Reset"
                            style={{ width: "6rem" }}
                            className="p-button-text"
                            onClick={process_RESET_FILTER_TBL_KSV_PO_MST}
                        />
                    </div>
                </span>
            </div>
            <div
                className="af-div-first"
                style={{ width: "123rem", height: "36rem" }}
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
                        if (isVendorNameClickRef.current) return;
                        setFlagSelectModeTBL_KSV_PO_MST(true);
                        setSelectedTBL_KSV_PO_MST(e.value);
                        console.log(
                            "selected length:" + selectedTBL_KSV_PO_MST.length,
                        );
                        onRowClick1TBL_KSV_PO_MST(e.value);
                    }}
                    onRowClick={onRowClickTBL_KSV_PO_MST}
                    dataKey="id"
                    className="datatable-responsive"
                    virtualScrollerOptions={{ itemSize: 20 }}
                    emptyMessage=" " //header={headerTBL_KSV_PO_MST}
                    responsiveLayout="scroll"
                    scrollable
                    scrollHeight="36rem"
                >
                    <AFColumn selectionMode="multiple" field="__checkbox__" reorderable={false} headerClassName="t-header" headerStyle={{ width: "3rem" }} ></AFColumn>
                    <AFColumn field="PO_SEQ" headerClassName="t-header" header="Seq" style={{ width: "5rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="ORDER_CD" headerClassName="t-header" header="Order" style={{ width: "8rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="MATL_CD" headerClassName="t-header" header="Matl Cd" style={{ width: "8rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="MATL_NAME" headerClassName="t-header" header="Description" style={{ width: "15rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="COLOR" headerClassName="t-header" header="Color" style={{ width: "8rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="SPEC" headerClassName="t-header" header="Spec" style={{ width: "15rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="USE_PO_TYPE_N" headerClassName="t-header" header="Po Type" style={{ width: "8rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="USE_QTY" headerClassName="t-header" header="Use Qty" style={{ width: "7rem", flexBasis: "auto" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.USE_QTY) } ></AFColumn>
                    <AFColumn field="PO_QTY" headerClassName="t-header" header="Po Qty" style={{ width: "7rem", flexBasis: "auto" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.PO_QTY) } ></AFColumn>
                    <AFColumn field="OLD_QTY" headerClassName="t-header" header="Old Qty" style={{ width: "7rem", flexBasis: "auto" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.OLD_QTY) } ></AFColumn>
                    <AFColumn field="NEW_QTY" headerClassName="t-header" header="New Qty" style={{ width: "7rem", flexBasis: "auto" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.NEW_QTY) } ></AFColumn>
                    <AFColumn field="DIFF_QTY" headerClassName="t-header" header="Diff Qty" headerStyle={{ color: "green" }} style={{ width: "7rem", height: "1.8rem", flexBasis: "auto", }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.DIFF_QTY) } editor={(options) => cellEditorTBL_KSV_PO_MST(options)} onCellEditComplete={onCellEditCompleteTBL_KSV_PO_MST} ></AFColumn>
                    <AFColumn field="DIFF_PO_TYPE_N" headerClassName="t-header" header="Diff.Po.T" style={{ width: "7rem", flexBasis: "auto" }} bodyStyle={{ textAlign: "right" }} ></AFColumn>
                    <AFColumn field="VENDOR_NAME" headerClassName="t-header" header="Supplier" style={{ width: "15rem", flexBasis: "auto" }} body={(rowData) => <span style={{ display: 'block', width: '100%', cursor: 'pointer', userSelect: 'none' }} onMouseDown={(e) => { e.stopPropagation(); e.preventDefault(); }} onClick={(e) => handleVendorNameClick(e, rowData.VENDOR_NAME)}>{rowData.VENDOR_NAME}</span>} ></AFColumn>
                    <AFColumn field="MRP_SEQ" headerClassName="t-header" header="Mrp Seq" style={{ width: "6rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="MATL_PRICE" headerClassName="t-header" header="Matl Price" style={{ width: "8rem", flexBasis: "auto" }} body={(rowData) => serviceLib.numWithCommas(rowData.MATL_PRICE,4)} bodyClassName="text-right" ></AFColumn>
                    <AFColumn field="CURR_CD" headerClassName="t-header" header="Curr" style={{ width: "5rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="TOT_AMT" headerClassName="t-header" header="Tot Amt" style={{ width: "7rem", flexBasis: "auto" }} body={(rowData) => serviceLib.numWithCommas(rowData.TOT_AMT,4)} bodyClassName="text-right" ></AFColumn>
                    <AFColumn field="USE_SIZE" headerClassName="t-header" header="Use Size" style={{ width: "7rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="ORDER_STATUS" headerClassName="t-header" header="Order.S" style={{ width: "7rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="SEQ" headerClassName="t-header" header="Seq" style={{ width: "5rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="SEND_DATETIME" headerClassName="t-header" header="Send" style={{ width: "5rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="PO_FACTORY_CD" headerClassName="t-header" header="Po Factory" style={{ width: "7rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="STOCK_FACTORY_CD" headerClassName="t-header" header="Stock Factory" style={{ width: "7rem", flexBasis: "auto" }} ></AFColumn>
                </AFDataTable>
            </div>

            <div
                className="af-div-first"
                style={{ width: "123rem", height: "30rem", paddingTop: "0.5rem" }}
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
                    virtualScrollerOptions={{ itemSize: 17 }}
                    emptyMessage=" " //header={headerTBL_KSV_PO_MST1}
                    responsiveLayout="scroll"
                    scrollable
                    scrollHeight="10rem"
                >
                    <AFColumn field="SEQ" headerClassName="t-header" header="Mrp Seq" style={{ width: "3rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="PO_SEQ" headerClassName="t-header" header="Po Seq" style={{ width: "5rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="ORDER_CD" headerClassName="t-header" header="Order" style={{ width: "8rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="MATL_CD" headerClassName="t-header" header="Matl Cd" style={{ width: "8rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="MATL_NAME" headerClassName="t-header" header="Description" style={{ width: "15rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="COLOR" headerClassName="t-header" header="Color" style={{ width: "12rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="SPEC" headerClassName="t-header" header="Spec" style={{ width: "15rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="bef_po_qty" headerClassName="t-header" header="bef.po.qty" style={{ width: "7rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="use_stock_qty" headerClassName="t-header" header="used.po.qty" style={{ width: "7rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="DIFF_RE_QTY" headerClassName="t-header" header="balance" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="DIFF_RE_TYPE_N" headerClassName="t-header" header="process" style={{ width: "7rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="DIFF_RE_TYPE" headerClassName="t-header" header="diff.re" style={{ width: "7rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="org_po_seq" headerClassName="t-header" header="org.po.seq" style={{ width: "7rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="MRP_SEQ" headerClassName="t-header" eader="mrp.seq" style={{ width: "7rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="MATL_SEQ" headerClassName="t-header" header="M.seq" style={{ width: "7rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="MATL_PRICE" headerClassName="t-header" header="M.price" style={{ width: "7rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="CURR_CD" headerClassName="t-header" header="Curr" style={{ width: "7rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="TOT_AMT" headerClassName="t-header" header="Tot.Amt" style={{ width: "7rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="USE_SIZE" headerClassName="t-header" header="use size" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="stock_idx" headerClassName="t-header" header="stock idx" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="root_idx" headerClassName="t-header" header="root idx" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="factory_cd" headerClassName="t-header" header="factory" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                </AFDataTable>
            </div>

            <div
                className="af-div-first"
                style={{ display: "none", width: "123rem", height: "15rem" }}
            >
                <span className="af-span-3" style={{ width: "11rem" }}>
                    <div className="af-span-div-btn" style={{ width: "10rem" }}>
                        <Button
                            style={{ width: "10rem" }}
                            label="Reset"
                            className="p-button-text"
                            onClick={blankFn}
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "11rem" }}>
                    <div className="af-span-div-btn" style={{ width: "10rem" }}>
                        <Button
                            style={{ width: "10rem" }}
                            label="Save"
                            className="p-button-text"
                            onClick={blankFn}
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "11rem" }}>
                    <div className="af-span-div-btn" style={{ width: "10rem" }}>
                        <Button
                            style={{ width: "10rem" }}
                            label="Copy"
                            className="p-button-text"
                            onClick={blankFn}
                        />
                    </div>
                </span>
            </div>

            <Toast ref={toast} />
            <Dialog class="loadingModal" visible={isProgress} modal>
                <ProgressSpinner />
            </Dialog>
        </div>
    );
};

const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(S030504_REVISE, comparisonFn);
