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
import { ServiceS030514_PO_LIST } from "../service/service_biz/ServiceS030514_PO_LIST";

import "./page_common.scss";

const emptyKCD_CODE = {
    id: 0,
    CD_GROUP: "",
    CD_CODE: "",
    CD_NAME: "",
    CD_FLAG: "",
};

const emptyQRY_PO_LIST = {
    PO_CD: "",
    IS_PRICE: "",

    ORDER_CD: "",
    BUYER_CD: "",
    FACTORY_CD: "",

    ORDER_KIND: "",
};

const emptyQRY_PO_LIST2 = {
    PO_CD: "",
    IS_PRICE: "",

    ORDER_CD: "",
    BUYER_CD: "",
    FACTORY_CD: "",

    ORDER_KIND: "",
};

const emptyTBL_PO_LIST = {
    id: 0,
    ORDER_CD: "",
    STYLE_NAME: "",
    TOT_CNT: "",
    SIZE1_CNT: "",
};

const emptyTBL_PO_LIST2 = {
    id: 0,
    ORDER_CD: "",
    STYLE_NAME: "",
    TOT_CNT: "",
    SIZE1_CNT: "",
};

const emptyTBL_PO_LIST3 = {
    id: 0,
    PO_CD: "",
};

const emptyTBL_PO_LIST4 = {
    id: 0,
    PO_CD: "",
};

const emptyTBL_PO_LIST5 = {
    id: 0,
    PO_CD: "",
};

const S030514_PO_LIST = () => {
    const serviceLibRef = useRef(null);
    if (!serviceLibRef.current) {
        serviceLibRef.current = new ServiceLib();
        serviceLibRef.current.loginConfirm();
    }
    const serviceLib = serviceLibRef.current;
    const serviceS030514_PO_LISTRef = useRef(null);
    if (!serviceS030514_PO_LISTRef.current) serviceS030514_PO_LISTRef.current = new ServiceS030514_PO_LIST();
    const serviceS030514_PO_LIST = serviceS030514_PO_LISTRef.current;

    const toast = useRef(null);

    /* splitter 관련 */
    const [styleVal, setStyleVal] = useState({ width: "65vw" });

    // dialog
    const [createDialog, setCreateDialog] = useState(false);
    const hideDialog = () => {
        setCreateDialog(false);
    };

    //

    const process_MATL_LIST_INSERT = (poCd) => {
        var tInObj0 = { ...dataQRY_PO_LIST };
        var tInObj = {};
        tInObj.PO_CD = tInObj0.PO_CD;

        console.log(dataQRY_PO_LIST);

        if (poCd && typeof poCd === "string") {
            console.log(poCd);
            tInObj.PO_CD = poCd.trim();
        }

        setLoadingTBL_PO_LIST(true);
        setDatasTBL_PO_LIST([]);
        serviceS030514_PO_LIST.mgrMATL_LIST_INSERT(tInObj).then((data) => {
            setLoadingTBL_PO_LIST(false);
            if (typeof data.graphQLErrors === "undefined") {
                if (data.length > 0) {
                    alert(data[0].CODE);
                    if (data[0].CODE.includes("SUCC")) {
                        search_LIST_1();
                    }
                }
            } else {
                console.log(
                    "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });

        search_LIST_2(tInObj);
    };

    const search_LIST_1 = (poCd) => {
        var tInObj = { ...dataQRY_PO_LIST };

        console.log(dataQRY_PO_LIST);

        if (poCd && typeof poCd === "string") {
            console.log(poCd);
            tInObj.PO_CD = poCd.trim();
        }

        setLoadingTBL_PO_LIST(true);
        setDatasTBL_PO_LIST([]);
        serviceS030514_PO_LIST.mgrQuery_LIST_1(tInObj).then((data) => {
            setLoadingTBL_PO_LIST(false);
            if (typeof data.graphQLErrors === "undefined") {
                if (data.length > 0) {
                    setDatasTBL_PO_LIST(
                        data.map((col, i) => ({ ...col, id: i + 1 })),
                    );
                    // 첫번째 PO_CD를 상단 입력란에 세팅
                    const firstPoCd = data[0].PO_CD;
                    setDataQRY_PO_LIST({ ...dataQRY_PO_LIST, PO_CD: firstPoCd });
                    tInObj.PO_CD = firstPoCd;
                }
            } else {
                console.log(
                    "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });

        search_LIST_2(tInObj);
    };

    const search_LIST_2 = (argData0) => {
        var tInObj = { ...dataQRY_PO_LIST };
        if (argData0.PO_CD) tInObj.PO_CD = argData0.PO_CD;

        setLoadingTBL_PO_LIST1(true);
        setDatasTBL_PO_LIST1([]);
        serviceS030514_PO_LIST.mgrQuery_LIST_2(tInObj).then((data) => {
            setLoadingTBL_PO_LIST1(false);
            if (typeof data.graphQLErrors === "undefined") {
                if (data.length > 0) {
                    var tArray = [];
                    data.forEach((col, i) => {
                        var tObj = { ...col };
                        tObj.id = i + 1;
                        tArray.push(tObj);
                    });
                    setDatasTBL_PO_LIST1(tArray);
                }
            } else {
                console.log(
                    "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });
    };

    const search_LIST_3 = () => {
        var tInObj = { ...dataQRY_PO_LIST };

        setLoadingTBL_PO_LIST1(true);
        setDatasTBL_PO_LIST1([]);
        serviceS030514_PO_LIST.mgrQuery_LIST_3(tInObj).then((data) => {
            setLoadingTBL_PO_LIST1(false);
            if (typeof data.graphQLErrors === "undefined") {
                if (data.length > 0) {
                    var tArray = [];
                    data.forEach((col, i) => {
                        var tObj = { ...col };
                        tObj.id = i + 1;
                        tArray.push(tObj);
                    });
                    setDatasTBL_PO_LIST1(tArray);
                }
            } else {
                console.log(
                    "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });
    };

    const searchDialogPoCd = (argPo) => {
        serviceS030514_PO_LIST
            .mgrQuery_QRY_PO({ PO_CD: dataQRY_PO_LIST2.PO_CD.trim() })
            .then((data) => {
                if (typeof data.graphQLErrors === "undefined") {
                    if (data.length > 0) {
                        console.log(data);
                        let [first, ...rest] = data;
                        setDatasTBL_PO_LIST3(rest);
                    }
                }
            });
    };

    const search_QRY_BUYER = (argBuyer) => {
        var tInObj = {};
        tInObj.BUYER_CD = argBuyer.trim();

        serviceS030514_PO_LIST.mgrQuery_QRY_BUYER(tInObj).then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                if (data.length > 0) {
                    setDatasQRY_PO_LIST_BUYER_CD(data);
                    setDataQRY_PO_LIST_BUYER_CD(data[0]);
                }
            } else {
            }
        });
    };

    const search_QRY_PO_BY_BUYER = (argBuyer) => {
        var tInObj = {};
        if (argBuyer === "") return;
        tInObj.BUYER_CD = argBuyer.trim();

        serviceS030514_PO_LIST.mgrQuery_QRY_PO_BY_BUYER(tInObj).then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                if (data.length > 0) {
                    setDatasQRY_PO_LIST_PO_CD(data);
                    setDataQRY_PO_LIST_PO_CD(data[0]);
                    setDataQRY_PO_LIST({ ...dataQRY_PO_LIST, PO_CD: "" });
                }
            } else {
            }
        });
    };

    const search_REPORT_MATL_LIST_NET_QTY = (argData) => {
        var tQryObj = { ...dataQRY_PO_LIST };

        if (tQryObj.PO_CD === "") {
            alert("작업할 PO을 선택하십시요<br><br>Select the PO you want to work on");
            return;
        }
        tQryObj.OP_KIND = "0";
        tQryObj.IS_PRICE = dataQRY_PO_LIST.IS_PRICE;

        setLoadingTBL_PO_LIST(true);
        serviceS030514_PO_LIST
            .mgrQuery_REPORT_MATL_LIST_NET_QTY(tQryObj)
            .then((data) => {
                setLoadingTBL_PO_LIST(false);
                if (typeof data.graphQLErrors === "undefined") {
                    if (data.length > 0) {
                        if (data[0].CODE.includes("SUCC")) {
                            downloadFile(
                                data[0].CODE.split("?")[2].toString(),
                                data[0].CODE.split("?")[1].toString(),
                            );
                            search_LIST_2(tQryObj);
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

    const search_REPORT_ORDER_QTY = (argData) => {
        var tQryObj = { ...dataQRY_PO_LIST };

        if (tQryObj.PO_CD === "") {
            alert("작업할 PO을 선택하십시요<br><br>Select the PO you want to work on");
            return;
        }

        setLoadingTBL_PO_LIST(true);
        serviceS030514_PO_LIST
            .mgrQuery_REPORT_ORDER_QTY(tQryObj)
            .then((data) => {
                setLoadingTBL_PO_LIST(false);
                if (typeof data.graphQLErrors === "undefined") {
                    if (data.length > 0) {
                        if (data[0].CODE.includes("SUCC")) {
                            downloadFile(
                                data[0].CODE.split("?")[2].toString(),
                                data[0].CODE.split("?")[1].toString(),
                            );
                            search_LIST_2(tQryObj);
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

    const search_REPORT_BUYER_ORDER_QTY = (argData) => {
        var tQryObj = { ...dataQRY_PO_LIST };

        tQryObj.SAMPLE_FLAG = dataQRY_PO_LIST_ORDER_KIND.CD_CODE;
        tQryObj.BUYER_CD = dataQRY_PO_LIST_BUYER_CD.BUYER_CD;
        tQryObj.BUYER_NAME = dataQRY_PO_LIST_BUYER_CD.BUYER_NAME;

        if (!tQryObj.SAMPLE_FLAG || !tQryObj.BUYER_CD || !tQryObj.FACTORY_CD) {
            alert(
                "Select the Buyer, Factory, and Sample category you want to work with.",
            );
            return;
        }

        setLoadingTBL_PO_LIST(true);

        serviceS030514_PO_LIST
            .mgrQuery_REPORT_BUYER_ORDER_QTY(tQryObj)
            .then((data) => {
                setLoadingTBL_PO_LIST(false);
                if (typeof data.graphQLErrors === "undefined") {
                    if (data.length > 0) {
                        if (data[0].CODE.includes("SUCC")) {
                            downloadFile(
                                data[0].CODE.split("?")[2].toString(),
                                data[0].CODE.split("?")[1].toString(),
                            );
                            search_LIST_2(tQryObj);
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

    const createDialog_ORDER_QTY2 = (argData) => {
        setDataQRY_PO_LIST2({ ...dataQRY_PO_LIST2, PO_CD: "" });
        setDatasTBL_PO_LIST3([]);
        setDatasTBL_PO_LIST4([]);
        setDatasTBL_PO_LIST5([]);
        setCreateDialog(true);
    };

    const search_REPORT_ORDER_QTY2 = (argData) => {
        var tQryObj0 = [...datasTBL_PO_LIST4];
        var tQryObj = [];
        tQryObj0.forEach((col, i) => {
            var tObj = { ...col };
            delete tObj.id;
            delete tObj.__typename;
            tQryObj.push(tObj);
        });

        if (tQryObj.PO_CD === "") {
            alert("작업할 PO을 선택하십시요<br><br>Select the PO you want to work on");
            return;
        }

        console.log(tQryObj);

        setLoadingTBL_PO_LIST(true);
        serviceS030514_PO_LIST
            .mgrQuery_REPORT_ORDER_QTY2(tQryObj)
            .then((data) => {
                setLoadingTBL_PO_LIST(false);
                if (typeof data.graphQLErrors === "undefined") {
                    if (data.length > 0) {
                        if (data[0].CODE.includes("SUCC")) {
                            downloadFile(
                                data[0].CODE.split("?")[2].toString(),
                                data[0].CODE.split("?")[1].toString(),
                            );
                            search_LIST_3();
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

    const search_QRY_ORDER_COMBINED = (argData) => {
        if (typeof argData.PO_CD === "undefined") return;

        var tInObj = {};
        tInObj.PO_CD = argData.PO_CD;
        tInObj.PO_SEQ = argData.PO_SEQ;
        tInObj.ORDER_CD = argData.ORDER_CD;

        setLoadingTBL_PO_LIST2(true);
        setDatasTBL_PO_LIST2([]);
        serviceS030514_PO_LIST
            .mgrQuery_QRY_ORDER_COMBINED(tInObj)
            .then((data) => {
                setLoadingTBL_PO_LIST2(false);
                if (typeof data.graphQLErrors === "undefined") {
                    if (data.length > 0) {
                        if (data[0].ORDER_CD.includes("ERROR")) {
                            alert(data[0].ORDER_CD);
                        } else {
                            setDatasTBL_PO_LIST2(data);
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

    /* QRY KSV_PO_MST*/
    const [dataQRY_PO_LIST, setDataQRY_PO_LIST] = useState(emptyQRY_PO_LIST);

    const onInputChangeQRY_PO_LIST_ORDER_CD = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_PO_LIST = { ...dataQRY_PO_LIST };

        let tTypeVal = _dataQRY_PO_LIST[`${name}`];
        if (typeof tTypeVal === "string") _dataQRY_PO_LIST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_PO_LIST[`${name}`] = parseInt(val);

        setDataQRY_PO_LIST(_dataQRY_PO_LIST);
    };

    const [datasQRY_PO_LIST_PO_CD, setDatasQRY_PO_LIST_PO_CD] = useState([]);
    const [dataQRY_PO_LIST_PO_CD, setDataQRY_PO_LIST_PO_CD] = useState({});

    const onInputChangeQRY_PO_LIST_PO_CD = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_PO_LIST = { ...dataQRY_PO_LIST };

        let tTypeVal = _dataQRY_PO_LIST[`${name}`];
        if (typeof tTypeVal === "string") _dataQRY_PO_LIST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_PO_LIST[`${name}`] = parseInt(val);

        setDataQRY_PO_LIST(_dataQRY_PO_LIST);
        setDataQRY_PO_LIST_PO_CD(e.value);
    };

    const [datasQRY_PO_LIST_BUYER_CD, setDatasQRY_PO_LIST_BUYER_CD] = useState(
        [],
    );
    const [dataQRY_PO_LIST_BUYER_CD, setDataQRY_PO_LIST_BUYER_CD] = useState(
        {},
    );

    const onDropdownChangeQRY_PO_LIST_BUYER_CD = (e, name) => {
        let val = (e.value && e.value.BUYER_CD) || "";

        let _dataQRY_PO_LIST = { ...dataQRY_PO_LIST };

        let tTypeVal = _dataQRY_PO_LIST[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_PO_LIST[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_PO_LIST[`${name}`] = parseInt(val);
        }

        setDataQRY_PO_LIST(_dataQRY_PO_LIST);
        setDataQRY_PO_LIST_BUYER_CD(e.value);

        search_QRY_PO_BY_BUYER(val);
    };
    const onKeyPressQRY_PO_LIST_BUYER_CD = (e, name) => {
        if (e.key === "Enter") {
            search_QRY_BUYER(e.target.value);
        }
    };

    const [datasQRY_PO_LIST_FACTORY_CD, setDatasQRY_PO_LIST_FACTORY_CD] =
        useState([]);
    const [dataQRY_PO_LIST_FACTORY_CD, setDataQRY_PO_LIST_FACTORY_CD] =
        useState({});

    const onDropdownChangeQRY_PO_LIST_FACTORY_CD = (e, name) => {
        let val = (e.value && e.value.FACTORY_CD) || "";

        let _dataQRY_PO_LIST = { ...dataQRY_PO_LIST };

        let tTypeVal = _dataQRY_PO_LIST[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_PO_LIST[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_PO_LIST[`${name}`] = parseInt(val);
        }

        setDataQRY_PO_LIST(_dataQRY_PO_LIST);
        setDataQRY_PO_LIST_FACTORY_CD(e.value);
    };

    const [datasQRY_PO_LIST_ORDER_KIND, setDatasQRY_PO_LIST_ORDER_KIND] =
        useState([]);
    const [dataQRY_PO_LIST_ORDER_KIND, setDataQRY_PO_LIST_ORDER_KIND] =
        useState({});

    const onDropdownChangeQRY_PO_LIST_ORDER_KIND = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataQRY_PO_LIST = { ...dataQRY_PO_LIST };

        let tTypeVal = _dataQRY_PO_LIST[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_PO_LIST[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_PO_LIST[`${name}`] = parseInt(val);
        }

        setDataQRY_PO_LIST(_dataQRY_PO_LIST);
        setDataQRY_PO_LIST_ORDER_KIND(e.value);
    };

    const onCheckboxChangeQRY_PO_LIST_IS_PRICE = (e, name) => {
        let val = "";
        let _dataQRY_PO_LIST = { ...dataQRY_PO_LIST };
        if (e.checked) {
            val = "1";
        } else {
            val = "0";
        }
        _dataQRY_PO_LIST[`${name}`] = val;
        setDataQRY_PO_LIST(_dataQRY_PO_LIST);
    };

    /* QRY KSV_PO_MST*/
    const [dataQRY_PO_LIST2, setDataQRY_PO_LIST2] = useState(emptyQRY_PO_LIST2);

    const onInputChangeQRY_PO_LIST2_PO_CD = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_PO_LIST2 = { ...dataQRY_PO_LIST2 };

        let tTypeVal = _dataQRY_PO_LIST2[`${name}`];
        if (typeof tTypeVal === "string") _dataQRY_PO_LIST2[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_PO_LIST2[`${name}`] = parseInt(val);

        setDataQRY_PO_LIST2(_dataQRY_PO_LIST2);
    };

    const [datasQRY_PO_LIST2_PO_CD, setDatasQRY_PO_LIST2_PO_CD] = useState([]);
    const [dataQRY_PO_LIST2_PO_CD, setDataQRY_PO_LIST2_PO_CD] = useState({});

    const [datasQRY_PO_LIST2_BUYER_CD, setDatasQRY_PO_LIST2_BUYER_CD] =
        useState([]);
    const [dataQRY_PO_LIST2_BUYER_CD, setDataQRY_PO_LIST2_BUYER_CD] = useState(
        {},
    );

    const [datasQRY_PO_LIST2_FACTORY_CD, setDatasQRY_PO_LIST2_FACTORY_CD] =
        useState([]);
    const [dataQRY_PO_LIST2_FACTORY_CD, setDataQRY_PO_LIST2_FACTORY_CD] =
        useState({});

    const [datasQRY_PO_LIST2_ORDER_KIND, setDatasQRY_PO_LIST2_ORDER_KIND] =
        useState([]);
    const [dataQRY_PO_LIST2_ORDER_KIND, setDataQRY_PO_LIST2_ORDER_KIND] =
        useState({});

    /*TABLE KSV_PO_MST */
    // DEFINE DATAGRID : TBL_PO_LIST
    const [isSearch_LIST_1, setIsSearch_LIST_1] = useState(false);

    const [loadingTBL_PO_LIST, setLoadingTBL_PO_LIST] = useState(false);
    const [datasTBL_PO_LIST_COLS, setDatasTBL_PO_LIST_COLS] = useState([]);
    const [datasTBL_PO_LIST, setDatasTBL_PO_LIST] = useState([]);
    const dt_TBL_PO_LIST = useRef(null);
    const [dataTBL_PO_LIST, setDataTBL_PO_LIST] = useState(emptyTBL_PO_LIST);
    const [selectedTBL_PO_LIST, setSelectedTBL_PO_LIST] = useState([]);
    const [flagSelectModeTBL_PO_LIST, setFlagSelectModeTBL_PO_LIST] =
        useState(false);

    // DATAGRID CODE : TBL_PO_LIST
    const dynamicColumnsTBL_PO_LIST = datasTBL_PO_LIST_COLS.map((col, i) => {
        var tHeader = `id_msg_${col.SIZE_NAME}_KSV_PO_MST_dt`;
        var tHeaderStr = serviceLib.getLocaleMessage(tHeader);
        var tColName = `SIZE_${col.SIZE_NAME}`;
        // return  <AFColumn field={col.field} header={tHeaderStr} headerStyle={{ width: '10rem',height:'1.8rem' }} bodyStyle={{ width: '10rem',height:'1.8rem' }} editor={(options) => cellEditorKSV_ORDER_MEM(options)} onCellEditComplete={onCellEditCompleteKSV_ORDER_MEM}></AFColumn>
        return (
            <AFColumn field={tColName} header={tHeaderStr} headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
        );
    });

    const onRowDoubleClickTBL_PO_LIST = (argData0) => {
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
                argData0.data[`MRP_LIST_FILE`],
            );
        }
        if (tColName === "MRP_LIST2_FILE") {
            downloadFile(
                argData0.data[`MRP_LIST2_FILE_URL`],
                argData0.data[`MRP_LIST2_FILE`],
            );
        }
    };

    const onRowClick1TBL_PO_LIST = (argData0) => {
        if (!argData0) return;

        var argData = {};

        console.log(argData0);

        if (typeof argData0.length !== "undefined") {
            if (argData0.length > 0) argData = argData0[argData0.length - 1];
        } else {
            argData = argData0;
        }

        let argTBL_PO_LIST = argData;

        setDataTBL_PO_LIST(argTBL_PO_LIST);

        search_QRY_ORDER_COMBINED(argData);
    };

    const onRowClickTBL_PO_LIST = (event) => {
        let argTBL_PO_LIST = event.data;
        if (flagSelectModeTBL_PO_LIST) return;

        // Service : NawooAll:mgrQueryTBL_PO_LIST
    };

    const onCellEditCompleteTBL_PO_LIST = (e) => {
        let { rowData, newValue, value, field, originalEvent: event } = e;

        var tRowData = { ...rowData };
        tRowData[field] = newValue;

        var tArray = [];
        datasTBL_PO_LIST.forEach((col, i) => {
            var tObj = { ...col };
            if (tObj.id === tRowData.id) tArray.push(tRowData);
            else tArray.push(tObj);
        });

        setDatasTBL_PO_LIST(tArray);
    };

    const cellEditorTBL_PO_LIST = (options) => {
        return textEditor(options);
    };

    const textEditor = (options) => {
        return (
            <InputText
                type="text"
                value={options.value}
                onFocus={(e) => e.target.select()}
                onChange={(e) => options.editorCallback(e.target.value)}
            />
        );
    };

    /*TABLE KSV_PO_MST */
    // DEFINE DATAGRID : TBL_PO_LIST2
    const [loadingTBL_PO_LIST2, setLoadingTBL_PO_LIST2] = useState(false);
    const [datasTBL_PO_LIST2_COLS, setDatasTBL_PO_LIST2_COLS] = useState([]);
    const [datasTBL_PO_LIST2, setDatasTBL_PO_LIST2] = useState([]);
    const dt_TBL_PO_LIST2 = useRef(null);
    const [dataTBL_PO_LIST2, setDataTBL_PO_LIST2] = useState(emptyTBL_PO_LIST2);
    const [selectedTBL_PO_LIST2, setSelectedTBL_PO_LIST2] = useState([]);
    const [flagSelectModeTBL_PO_LIST2, setFlagSelectModeTBL_PO_LIST2] =
        useState(false);

    // DATAGRID CODE : TBL_PO_LIST2

    /**TABLE KSV_PO_MST1 */
    // DEFINE DATAGRID : TBL_PO_LIST1
    let emptyTBL_PO_LIST1 = {};

    const [loadingTBL_PO_LIST1, setLoadingTBL_PO_LIST1] = useState(false);
    const [datasTBL_PO_LIST1, setDatasTBL_PO_LIST1] = useState([]);
    const dt_TBL_PO_LIST1 = useRef(null);
    const [dataTBL_PO_LIST1, setDataTBL_PO_LIST1] = useState(emptyTBL_PO_LIST1);
    const [selectedTBL_PO_LIST1, setSelectedTBL_PO_LIST1] = useState([]);
    const [flagSelectModeTBL_PO_LIST1, setFlagSelectModeTBL_PO_LIST1] =
        useState(false);

    // DATAGRID CODE : TBL_PO_LIST1

    const onRowClick1TBL_PO_LIST1 = (argData0) => {
        setDataTBL_PO_LIST1(selectedTBL_PO_LIST1);
    };

    const onRowClickTBL_PO_LIST1 = (event) => {
        let argTBL_PO_LIST1 = event.data;
        if (flagSelectModeTBL_PO_LIST1) return;

        // Service : NawooAll:mgrQueryTBL_PO_LIST1
    };

    const onRowDoubleClickTBL_PO_LIST1 = (argData0) => {
        console.log(argData0.data);

        if (typeof argData0.data.FILE_NAME !== "undefined") {
            var tFileUrl = argData0.data.FILE_URL;
            var tFileName = argData0.data.FILE_NAME;
            downloadFile(tFileUrl, tFileName);
        }
    };

    /*TABLE KSV_PO_MST */
    // DEFINE DATAGRID : TBL_PO_LIST3
    const [loadingTBL_PO_LIST3, setLoadingTBL_PO_LIST3] = useState(false);
    const [datasTBL_PO_LIST3_COLS, setDatasTBL_PO_LIST3_COLS] = useState([]);
    const [datasTBL_PO_LIST3, setDatasTBL_PO_LIST3] = useState([]);
    const dt_TBL_PO_LIST3 = useRef(null);
    const [dataTBL_PO_LIST3, setDataTBL_PO_LIST3] = useState(emptyTBL_PO_LIST3);
    const [selectedTBL_PO_LIST3, setSelectedTBL_PO_LIST3] = useState([]);
    const [flagSelectModeTBL_PO_LIST3, setFlagSelectModeTBL_PO_LIST3] =
        useState(false);

    const onRowDoubleClickTBL_PO_LIST3 = (argData0) => {
        var tArray = [...datasTBL_PO_LIST4];
        var tFlag = 0;
        tArray.forEach((col, i) => {
            if (col.PO_CD === argData0.PO_CD) tFlag = 1;
        });
        if (tFlag === 0) {
            tArray.push(argData0.data);
            setDatasTBL_PO_LIST4(tArray);
        }
    };

    /*TABLE KSV_PO_MST */
    // DEFINE DATAGRID : TBL_PO_LIST4
    const [loadingTBL_PO_LIST4, setLoadingTBL_PO_LIST4] = useState(false);
    const [datasTBL_PO_LIST4_COLS, setDatasTBL_PO_LIST4_COLS] = useState([]);
    const [datasTBL_PO_LIST4, setDatasTBL_PO_LIST4] = useState([]);
    const dt_TBL_PO_LIST4 = useRef(null);
    const [dataTBL_PO_LIST4, setDataTBL_PO_LIST4] = useState(emptyTBL_PO_LIST4);
    const [selectedTBL_PO_LIST4, setSelectedTBL_PO_LIST4] = useState([]);
    const [flagSelectModeTBL_PO_LIST4, setFlagSelectModeTBL_PO_LIST4] =
        useState(false);

    // DATAGRID CODE : TBL_PO_LIST4

    const onRowDoubleClickTBL_PO_LIST4 = (argData0) => {
        setDatasTBL_PO_LIST4([
            ...datasTBL_PO_LIST4.filter((v) => v !== argData0.data),
        ]);
    };

    const onRowClickTBL_PO_LIST4 = (event) => {};

    const onRowClickTBL_PO_LIST3 = (event) => {};

    /*TABLE KSV_PO_MST */
    // DEFINE DATAGRID : TBL_PO_LIST5
    const [loadingTBL_PO_LIST5, setLoadingTBL_PO_LIST5] = useState(false);
    const [datasTBL_PO_LIST5_COLS, setDatasTBL_PO_LIST5_COLS] = useState([]);
    const [datasTBL_PO_LIST5, setDatasTBL_PO_LIST5] = useState([]);
    const dt_TBL_PO_LIST5 = useRef(null);
    const [dataTBL_PO_LIST5, setDataTBL_PO_LIST5] = useState(emptyTBL_PO_LIST5);
    const [selectedTBL_PO_LIST5, setSelectedTBL_PO_LIST5] = useState([]);
    const [flagSelectModeTBL_PO_LIST5, setFlagSelectModeTBL_PO_LIST5] =
        useState(false);

    // DATAGRID CODE : TBL_PO_LIST5
    const onRowDoubleClickTBL_PO_LIST5 = (argData0) => {
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
                argData0.data[`MRP_LIST_FILE`],
            );
        }
        if (tColName === "MRP_LIST2_FILE") {
            downloadFile(
                argData0.data[`MRP_LIST2_FILE_URL`],
                argData0.data[`MRP_LIST2_FILE`],
            );
        }
    };

    const onRowClickTBL_PO_LIST5 = (event) => {};

    //

    const blankFn = () => {};

    const reset_SCREEN = () => {
        // Reset PO#, Order#, Price
        setDataQRY_PO_LIST({
            ...emptyQRY_PO_LIST,
            BUYER_CD: datasQRY_PO_LIST_BUYER_CD.length > 0 ? datasQRY_PO_LIST_BUYER_CD[0].BUYER_CD : "",
            FACTORY_CD: datasQRY_PO_LIST_FACTORY_CD.length > 3 ? datasQRY_PO_LIST_FACTORY_CD[3].FACTORY_CD : "",
            ORDER_KIND: datasQRY_PO_LIST_ORDER_KIND.length > 2 ? datasQRY_PO_LIST_ORDER_KIND[2].CD_CODE : "",
        });
        // Reset Sample, Factory, Buyer# to initial values from useEffect
        if (datasQRY_PO_LIST_BUYER_CD.length > 0)
            setDataQRY_PO_LIST_BUYER_CD(datasQRY_PO_LIST_BUYER_CD[0]);
        if (datasQRY_PO_LIST_FACTORY_CD.length > 3)
            setDataQRY_PO_LIST_FACTORY_CD(datasQRY_PO_LIST_FACTORY_CD[3]);
        if (datasQRY_PO_LIST_ORDER_KIND.length > 2)
            setDataQRY_PO_LIST_ORDER_KIND(datasQRY_PO_LIST_ORDER_KIND[2]);
        // Clear all tables
        setDatasTBL_PO_LIST([]);
        setDatasTBL_PO_LIST1([]);
        setDatasTBL_PO_LIST2([]);
    };

    useEffect(() => {
        serviceS030514_PO_LIST.mgrQuery_CODE({ PO_CD: "" }).then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                setDatasQRY_PO_LIST_BUYER_CD(data.BUYER_CD);
                setDataQRY_PO_LIST_BUYER_CD(data.BUYER_CD[0]);

                setDatasQRY_PO_LIST_FACTORY_CD(data.FACTORY_CD);
                setDataQRY_PO_LIST_FACTORY_CD(data.FACTORY_CD[3]);

                setDatasQRY_PO_LIST_ORDER_KIND(data.ORDER_KIND);
                setDataQRY_PO_LIST_ORDER_KIND(data.ORDER_KIND[2]);

                search_QRY_BUYER("");

                //search_LIST_1(tPO_CD);
            } else {
                console.log(
                    "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
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
                style={{ width: "35rem", height: "6rem" }}
            >
                <span className="af-span-3-0" style={{ width: "19rem" }}>
                    <p className="af-span-p" style={{ width: "7rem" }}>PO#</p>
                    <div className="af-span-div" style={{ width: "11rem" }}>
                        {/*<Dropdown  style={{ width: '11rem' }} id="id_PO_SEQ" value={dataQRY_PO_LIST_PO_CD} onChange={(e) => onDropdownChangeQRY_PO_LIST_PO_CD(e, 'PO_CD')} options={datasQRY_PO_LIST_PO_CD} optionLabel="PO_NAME" placeholder="" editable filter onKeyPress={(e) => onKeyPressQRY_PO_LIST_PO_CD(e)}></Dropdown>*/}
                        <InputText
                            style={{ width: "11rem" }}
                            id="id_PO_CD"
                            value={dataQRY_PO_LIST.PO_CD}
                            onChange={(e) =>
                                onInputChangeQRY_PO_LIST_PO_CD(e, "PO_CD")
                            }
                            placeholder="Ex) PO26-0001"
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "14rem" }}>
                    <div className="af-span-div" style={{ width: "13rem" }}>
                        <Button
                            label={
                                <span>
                                    Search(<u>S</u>)
                                </span>
                            }
                            accessKey="S"
                            id="btnSearch"
                            style={{ width: "13rem" }}
                            className="p-button-text"
                            onClick={search_LIST_1}
                        />
                    </div>
                </span>
                {/*
                <span className="af-span-3" style={{ width: "19rem" }}>
                    <p className="af-span-p" style={{ width: "7rem" }}>Order#</p>
                    <div className="af-span-div" style={{ width: "11rem" }}>
                        <InputText
                            style={{ width: "11rem" }}
                            id="id_ORDER_CD"
                            value={dataQRY_PO_LIST.ORDER_CD}
                            onChange={(e) =>
                                onInputChangeQRY_PO_LIST_ORDER_CD(e, "ORDER_CD")
                            }
                        />
                    </div>
                </span>
                */}
                <span className="af-span-3" style={{ width: "19rem" }}></span>
                <span className="af-span-3" style={{ width: "14rem" }}>
                    <div className="af-span-div" style={{ width: "13rem" }}>
                        <Button
                            label="Reset"
                            style={{ width: "13rem" }}
                            className="p-button-text"
                            onClick={reset_SCREEN}
                        />
                    </div>
                </span>

                <span className="af-span-3" style={{ width: "14em" }}>
                    <div
                        className="af-span-div"
                        style={{ width: "13rem" }}
                    ></div>
                </span>

                <span className="af-span-3" style={{ width: "14rem" }}>
                    <div
                        className="af-span-div"
                        style={{ width: "13rem" }}
                    ></div>
                </span>

                <span className="af-span-3" style={{ width: "14rem" }}>
                    <div
                        className="af-span-div"
                        style={{ width: "13rem" }}
                    ></div>
                </span>
            </div>

            <div
                className="af-div-first"
                style={{ width: "14rem", height: "6rem", paddingTop: "7px" }}
            >
                <div
                    style={{ gap: "0.5rem", display: "flex", flexWrap: "wrap" }}
                >
                    <Button
                        label="Matl List Insert"
                        style={{ width: "13rem" }}
                        className="p-button-text"
                        onClick={process_MATL_LIST_INSERT}
                    />
                </div>
            </div>

            <div
                className="af-div-second"
                style={{
                    width: "70rem",
                    height: "6rem",
                    paddingTop: "7px",
                    paddingLeft: "7px",
                }}
            >
                <div
                    style={{ gap: "0.5rem", display: "flex", flexWrap: "wrap" }}
                >
                    <Button
                        label="Matl List(Net Qty)"
                        style={{ width: "14rem" }}
                        className="p-button-text green"
                        onClick={search_REPORT_MATL_LIST_NET_QTY}
                    />

                    <Button
                        label="Order Qty"
                        style={{ width: "14rem" }}
                        className="p-button-text green"
                        onClick={search_REPORT_ORDER_QTY}
                    />

                    <Button
                        label="Order Qty2"
                        style={{ width: "14rem" }}
                        className="p-button-text green"
                        onClick={createDialog_ORDER_QTY2}
                    />

                    <Button
                        label="Buyer Order Qty"
                        style={{ width: "14rem" }}
                        className="p-button-text green"
                        onClick={search_REPORT_BUYER_ORDER_QTY}
                    />
                </div>

                <div>
                    <span className="af-span-3-0" style={{ width: "6rem" }}>
                        <p className="af-span-p" style={{ width: "4rem" }}>Price</p>
                        <div className="af-span-checkbox">
                            <Checkbox
                                id="id_SALES_FLAG"
                                checked={changeCheckBoxVal(
                                    dataQRY_PO_LIST.IS_PRICE,
                                )}
                                onChange={(e) =>
                                    onCheckboxChangeQRY_PO_LIST_IS_PRICE(
                                        e,
                                        "IS_PRICE",
                                    )
                                }
                            />
                        </div>
                    </span>
                    <span
                        className="af-span-3"
                        style={{ width: "18rem", paddingTop: "7px" }}
                    >
                        <p className="af-span-p" style={{ width: "5rem" }}>Sample</p>
                        <div className="af-span-div" style={{ width: "11rem" }}>
                            <Dropdown
                                style={{ width: "11rem" }}
                                id="id_PO_SEQ"
                                value={dataQRY_PO_LIST_ORDER_KIND}
                                onChange={(e) =>
                                    onDropdownChangeQRY_PO_LIST_ORDER_KIND(
                                        e,
                                        "ORDER_KIND",
                                    )
                                }
                                options={datasQRY_PO_LIST_ORDER_KIND}
                                optionLabel="CD_NAME"
                                placeholder=""
                                editable
                            ></Dropdown>
                        </div>
                    </span>
                    <span className="af-span-3" style={{ width: "17rem" }}>
                        <p className="af-span-p" style={{ width: "4rem" }}>Factory</p>
                        <div className="af-span-div" style={{ width: "11rem" }}>
                            <Dropdown
                                style={{ width: "11rem" }}
                                id="id_PO_SEQ"
                                value={dataQRY_PO_LIST_FACTORY_CD}
                                onChange={(e) =>
                                    onDropdownChangeQRY_PO_LIST_FACTORY_CD(
                                        e,
                                        "FACTORY_CD",
                                    )
                                }
                                options={datasQRY_PO_LIST_FACTORY_CD}
                                optionLabel="FACTORY_NAME"
                                placeholder=""
                                editable
                            ></Dropdown>
                        </div>
                    </span>

                    <span className="af-span-3" style={{ width: "18rem" }}>
                        <p className="af-span-p" style={{ width: "4rem" }}>Buyer#</p>
                        <div className="af-span-div" style={{ width: "11rem" }}>
                            <Dropdown
                                style={{ width: "11rem" }}
                                id="id_PO_SEQ"
                                value={dataQRY_PO_LIST_BUYER_CD}
                                onChange={(e) =>
                                    onDropdownChangeQRY_PO_LIST_BUYER_CD(
                                        e,
                                        "BUYER_CD",
                                    )
                                }
                                options={datasQRY_PO_LIST_BUYER_CD}
                                optionLabel="BUYER_NAME"
                                placeholder=""
                                editable
                                filter
                                onKeyPress={(e) =>
                                    onKeyPressQRY_PO_LIST_BUYER_CD(e)
                                }
                            ></Dropdown>
                        </div>
                    </span>
                </div>
            </div>

            <div
                className="af-div-first"
                style={{ width: "123rem", height: "39rem" }}
            >
                <AFDataTable preventUnrelatedRerender
                    ref={dt_TBL_PO_LIST}
                    editMode="cell"
                    size="small"
                    value={datasTBL_PO_LIST}
                    loading={loadingTBL_PO_LIST}
                    tableStyle={{ tableLayout: "fixed" }}
                    resizableColumns
                    columnResizeMode="expand"
                    metaKeySelection={false}
                    showGridlines
                    selection={selectedTBL_PO_LIST}
                    onSelectionChange={(e) => {
                        setSelectedTBL_PO_LIST(e.value);
                        onRowClick1TBL_PO_LIST(e.value);
                    }}
                    onRowClick={onRowClickTBL_PO_LIST}
                    dataKey="PR_NUM"
                    className="datatable-responsive"
                    onRowDoubleClick={onRowDoubleClickTBL_PO_LIST}
                    virtualScrollerOptions={{ itemSize: 20 }}
                    emptyMessage=" "
                    //header={headerTBL_PO_LIST}
                    responsiveLayout="scroll"
                    scrollable
                    scrollHeight="425px"
                >
                    <AFColumn selectionMode="single" field="__checkbox__" reorderable={false} headerStyle={{ width: "5px" }} style={{ width: "5px" }} ></AFColumn>
                    <AFColumn field="PO_CD" header="PO#" headerStyle={{ width: "auto", height: "1.8rem" }} bodyStyle={{ width: "auto" }} ></AFColumn>
                    <AFColumn field="PO_STATUS" header="Status" headerStyle={{ width: "auto", height: "1.8rem" }} bodyStyle={{ width: "auto" }} ></AFColumn>
                    <AFColumn field="PO_DATE" header="PO Date" headerStyle={{ width: "auto", height: "1.8rem" }} bodyStyle={{ width: "auto" }} className="text-center" body={(row) => serviceLib.dateFormat(row.PO_DATE)} ></AFColumn>
                    <AFColumn field="REG_USER" header="Reg User" headerStyle={{ width: "auto", height: "1.8rem" }} bodyStyle={{ width: "auto" }} ></AFColumn>
                    <AFColumn field="VENDOR_NAME" header="Supplier" headerStyle={{ width: "auto", height: "1.8rem" }} bodyStyle={{ width: "auto" }} ></AFColumn>
                    <AFColumn field="PR_NUM" header="NO" headerStyle={{ width: "auto", height: "1.8rem" }} bodyStyle={{ width: "auto" }} ></AFColumn>
                    <AFColumn field="MATL_CD" header="Matl#" headerStyle={{ width: "auto", height: "1.8rem" }} bodyStyle={{ width: "auto" }} ></AFColumn>
                    <AFColumn field="COLOR" header="Color" headerStyle={{ width: "auto", height: "1.8rem" }} bodyStyle={{ width: "auto" }} ></AFColumn>
                    <AFColumn field="MATL_NAME" header="Description" headerStyle={{ width: "15rem", height: "1.8rem" }} bodyStyle={{ width: "15rem" }} ></AFColumn>
                    <AFColumn field="SPEC" header="Spec" headerStyle={{ width: "auto", height: "1.8rem" }} bodyStyle={{ width: "auto" }} ></AFColumn>
                    <AFColumn field="UNIT" header="Unit" headerStyle={{ width: "auto", height: "1.8rem" }} bodyStyle={{ width: "auto" }} ></AFColumn>
                    <AFColumn field="TOT_CNT" header="Qty" headerStyle={{ width: "auto", height: "1.8rem" }} bodyStyle={{ width: "auto" }} className="text-right" body={(row) => serviceLib.formatNumber(row.TOT_CNT)} ></AFColumn>
                    <AFColumn field="STOCK_QTY" header="Stock" headerStyle={{ width: "auto", height: "1.8rem" }} bodyStyle={{ width: "auto" }} className="text-right" body={(row) => serviceLib.formatNumber(row.STOCK_QTY)} ></AFColumn>
                    <AFColumn field="BAL" header="Balance" headerStyle={{ width: "auto", height: "1.8rem" }} bodyStyle={{ width: "auto" }} className="text-right" body={(row) => serviceLib.formatNumber(row.BAL)} ></AFColumn>
                    <AFColumn field="REMARK" header="Remark" headerStyle={{ width: "auto", height: "1.8rem", color: "green", }} bodyStyle={{ width: "auto" }} editor={(options) => cellEditorTBL_PO_LIST(options)} onCellEditComplete={onCellEditCompleteTBL_PO_LIST} ></AFColumn>
                </AFDataTable>
            </div>
            <div
                className="af-div-first"
                style={{ width: "123rem", height: "11rem", paddingTop: "10px" }}
            >
                <AFDataTable preventUnrelatedRerender
                    ref={dt_TBL_PO_LIST1}
                    size="small"
                    value={datasTBL_PO_LIST1}
                    loading={loadingTBL_PO_LIST1}
                    tableStyle={{ tableLayout: "fixed" }}
                    resizableColumns
                    columnResizeMode="expand"
                    metaKeySelection={false}
                    showGridlines
                    selection={selectedTBL_PO_LIST1}
                    onSelectionChange={(e) => {
                        setFlagSelectModeTBL_PO_LIST1(true);
                        setSelectedTBL_PO_LIST1(e.value);
                        onRowClick1TBL_PO_LIST1(e.value);
                    }}
                    onRowClick={onRowClickTBL_PO_LIST1}
                    dataKey="id"
                    className="datatable-responsive"
                    onRowDoubleClick={onRowDoubleClickTBL_PO_LIST1}
                    virtualScrollerOptions={{ itemSize: 20 }}
                    emptyMessage=" "
                    //header={headerTBL_PO_LIST1}
                    responsiveLayout="scroll"
                    scrollable
                    scrollHeight="10rem"
                >
                    <AFColumn selectionMode="single" field="__checkbox__" reorderable={false} headerStyle={{ width: "5px" }} style={{ width: "5px" }} ></AFColumn>
                    <AFColumn field="TITLE" header="Title" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="FILE_NAME" header="Name" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="FILE_URL" header="Url" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="UPD_DATETIME" header="Date" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="UPD_USER" header="User" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                </AFDataTable>
            </div>

            <Toast ref={toast} />
            <Dialog
                visible={createDialog}
                position="mid-center"
                style={{
                    width: "53rem",
                    height: "30rem",
                    marginLeft: "0rem",
                    marginTop: "0rem",
                    paddingLeft: "0rem",
                    paddingTop: "0rem",
                }}
                header="Order Qty2"
                modal={true}
                className="p-fluid"
                onHide={hideDialog}
            >
                <div
                    className="af-div-first"
                    style={{ width: "51rem", height: "4rem" }}
                >
                    <span className="af-span-3-0" style={{ width: "19rem" }}>
                        <p className="af-span-p" style={{ width: "7rem" }}>PO#</p>
                        <div className="af-span-div" style={{ width: "11rem" }}>
                            <InputText
                                style={{ width: "11rem" }}
                                id="id_ORDER_CD"
                                value={dataQRY_PO_LIST2.PO_CD}
                                onChange={(e) =>
                                    onInputChangeQRY_PO_LIST2_PO_CD(e, "PO_CD")
                                }
                            />
                        </div>
                    </span>
                    <span className="af-span-3-0" style={{ width: "15rem" }}>
                        <div className="af-span-div" style={{ width: "13rem" }}>
                            <Tooltip
                                className="menuCodeTooltip"
                                target={`btnSearch`}
                                content={`Alt+S`}
                                position="bottom"
                            />

                            <Button
                                label="Search"
                                id="btnSearch"
                                style={{ width: "13rem" }}
                                className="p-button-text"
                                onClick={searchDialogPoCd}
                            />
                        </div>
                    </span>
                    <span className="af-span-3-0" style={{ width: "15rem" }}>
                        <div className="af-span-div" style={{ width: "13rem" }}>
                            <Button
                                label="Order Qty2"
                                style={{ width: "13rem" }}
                                className="p-button-text green"
                                onClick={search_REPORT_ORDER_QTY2}
                            />
                        </div>
                    </span>
                </div>
                <div
                    className="af-div-first"
                    style={{ width: "25rem", height: "15rem" }}
                >
                    <AFDataTable preventUnrelatedRerender
                        ref={dt_TBL_PO_LIST3}
                        size="small"
                        value={datasTBL_PO_LIST3}
                        loading={loadingTBL_PO_LIST3}
                        tableStyle={{ tableLayout: "fixed" }}
                        resizableColumns
                        columnResizeMode="expand"
                        metaKeySelection={false}
                        showGridlines
                        selection={selectedTBL_PO_LIST3}
                        onSelectionChange={(e) => {
                            setFlagSelectModeTBL_PO_LIST3(true);
                            setSelectedTBL_PO_LIST3(e.value);
                        }}
                        onRowClick={onRowClickTBL_PO_LIST3}
                        dataKey="id"
                        className="datatable-responsive"
                        onRowDoubleClick={onRowDoubleClickTBL_PO_LIST3}
                        virtualScrollerOptions={{ itemSize: 20 }}
                        emptyMessage=" "
                        //header={headerTBL_PO_LIST3}
                        responsiveLayout="scroll"
                        scrollable
                        scrollHeight="15rem"
                    >
                        <AFColumn selectionMode="single" field="__checkbox__" reorderable={false} headerStyle={{ width: "5px" }} style={{ width: "5px" }} ></AFColumn>
                        <AFColumn field="PO_CD" header="PO#" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    </AFDataTable>
                </div>
                <div
                    className="af-div-second"
                    style={{
                        width: "25rem",
                        height: "15rem",
                        marginLeft: "1rem",
                    }}
                >
                    <AFDataTable preventUnrelatedRerender
                        ref={dt_TBL_PO_LIST4}
                        size="small"
                        value={datasTBL_PO_LIST4}
                        loading={loadingTBL_PO_LIST4}
                        tableStyle={{ tableLayout: "fixed" }}
                        resizableColumns
                        columnResizeMode="expand"
                        metaKeySelection={false}
                        showGridlines
                        selection={selectedTBL_PO_LIST4}
                        onSelectionChange={(e) => {
                            setFlagSelectModeTBL_PO_LIST4(true);
                            setSelectedTBL_PO_LIST4(e.value);
                        }}
                        onRowClick={onRowClickTBL_PO_LIST4}
                        dataKey="id"
                        className="datatable-responsive"
                        onRowDoubleClick={onRowDoubleClickTBL_PO_LIST4}
                        virtualScrollerOptions={{ itemSize: 20 }}
                        emptyMessage=" "
                        //header={headerTBL_PO_LIST4}
                        responsiveLayout="scroll"
                        scrollable
                        scrollHeight="15rem"
                    >
                        <AFColumn selectionMode="single" field="__checkbox__" reorderable={false} headerStyle={{ width: "5px" }} style={{ width: "5px" }} ></AFColumn>
                        <AFColumn field="PO_CD" header="PO#" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    </AFDataTable>
                </div>
                <div
                    className="af-div-first"
                    style={{ width: "80rem", height: "10rem", display: "none" }}
                >
                    <AFDataTable preventUnrelatedRerender
                        ref={dt_TBL_PO_LIST5}
                        size="small"
                        value={datasTBL_PO_LIST5}
                        loading={loadingTBL_PO_LIST5}
                        tableStyle={{ tableLayout: "fixed" }}
                        resizableColumns
                        columnResizeMode="expand"
                        metaKeySelection={false}
                        showGridlines
                        selection={selectedTBL_PO_LIST5}
                        onSelectionChange={(e) => {
                            setFlagSelectModeTBL_PO_LIST5(true);
                            setSelectedTBL_PO_LIST5(e.value);
                        }}
                        onRowClick={onRowClickTBL_PO_LIST5}
                        dataKey="id"
                        className="datatable-responsive"
                        onRowDoubleClick={onRowDoubleClickTBL_PO_LIST5}
                        virtualScrollerOptions={{ itemSize: 20 }}
                        emptyMessage=" "
                        //header={headerTBL_PO_LIST5}
                        responsiveLayout="scroll"
                        scrollable
                        scrollHeight="10rem"
                    >
                        <AFColumn selectionMode="single" field="__checkbox__" reorderable={false} headerStyle={{ width: "5px" }} style={{ width: "5px" }} ></AFColumn>
                        <AFColumn field="TITLE" header="Title" headerStyle={{ width: "13rem", height: "1.8rem" }} ></AFColumn>
                        <AFColumn field="FILE_NAME" header="Name" headerStyle={{ width: "13rem", height: "1.8rem" }} ></AFColumn>
                        <AFColumn field="FILE_URL" header="Url" headerStyle={{ width: "13rem", height: "1.8rem" }} ></AFColumn>
                        <AFColumn field="UPD_DATETIME" header="Date" headerStyle={{ width: "5rem", height: "1.8rem" }} ></AFColumn>
                        <AFColumn field="UPD_USER" header="User" headerStyle={{ width: "5rem", height: "1.8rem" }} ></AFColumn>
                    </AFDataTable>
                </div>
            </Dialog>
        </div>
    );
};

const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(S030514_PO_LIST, comparisonFn);
