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
import { ServiceS0520_FACOUT_RECORD } from "../service/service_biz/ServiceS0520_FACOUT_RECORD";

import "./page_common.scss";

const emptyKCD_CODE = {
    id: 0,
    CD_GROUP: "",
    CD_CODE: "",
    CD_NAME: "",
    CD_FLAG: "",
};

const emptyQRY_KSV_PO_MRP = {
    BUYER_CD: "",
    PO_CD: "",
    ORDER_CD: "",
    VENDOR_CD: "",
    FACOUT_CD: "",
    IS_BALANCE: "0",

    USER_ID: "",
    S_IN_DATE: "",
    E_IN_DATE: "",
    PURPOSE: "",
    REMARK: "",
    OUT_DATE: "",

    DESCRIPTION: "",
    MATL_CD: "",
    SPEC: "",
    COLOR: "",
    UNIT: "",
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
    INVOICE_NO: "",
    PAY_TERM: "",
    CT_QTY: "",

    READY_DATE: "",
    ORIGIN_PORT: "",
    WEIGHT: "",

    TARGET_ETA: "",
    DESTINATION: "",
    CBM: "",
};

const S0520_FACOUT_RECORD = () => {
    const serviceLibRef = useRef(null);
    if (!serviceLibRef.current) {
        serviceLibRef.current = new ServiceLib();
        serviceLibRef.current.loginConfirm();
    }
    const serviceLib = serviceLibRef.current;
    const serviceS0520_FACOUT_RECORDRef = useRef(null);
    if (!serviceS0520_FACOUT_RECORDRef.current) serviceS0520_FACOUT_RECORDRef.current = new ServiceS0520_FACOUT_RECORD();
    const serviceS0520_FACOUT_RECORD = serviceS0520_FACOUT_RECORDRef.current;

    const toast = useRef(null);

    /* progress */
    const [isProgress, setIsProgress] = useState(false);

    /* splitter 관련 */
    const [styleVal, setStyleVal] = useState({ width: "65vw" });

    // dialog
    const [urlIframe, setUrlIframe] = useState("");
    const [createDialog, setCreateDialog] = useState(false);
    const hideDialog = () => {
        setCreateDialog(false);
    };

    // Search
    const process_RESET = () => {
        setDataQRY_KSV_PO_MRP(emptyQRY_KSV_PO_MRP);

        var tArray = [];
        var tObj = {};
        tObj.BUYER_CD = "";
        tObj.BUYER_NAME = " ";
        tArray.push(tObj);
        setDatasQRY_KSV_PO_MRP_BUYER_CD(tArray);
        setDataQRY_KSV_PO_MRP_BUYER_CD(tArray[0]);

        tArray = [];
        tObj = {};
        tObj.CD_CODE = "";
        tObj.CD_NAME = " ";
        tArray.push(tObj);
        setDatasQRY_KSV_PO_MRP_PO_CD(tArray);
        setDataQRY_KSV_PO_MRP_PO_CD(tArray[0]);

        tArray = [];
        tObj = {};
        tObj.CD_CODE = "";
        tObj.CD_NAME = " ";
        tArray.push(tObj);
        setDatasQRY_KSV_PO_MRP_ORDER_CD(tArray);
        setDataQRY_KSV_PO_MRP_ORDER_CD(tArray[0]);

        tArray = [];
        tObj = {};
        tObj.CD_CODE = "";
        tObj.CD_NAME = " ";
        tArray.push(tObj);
        setDatasQRY_KSV_PO_MRP_FACOUT_CD(tArray);
        setDataQRY_KSV_PO_MRP_FACOUT_CD(tArray[0]);

        // setDatasQRY_KSV_PO_MRP_PO_CD([]);
        // setDatasQRY_KSV_PO_MRP_ORDER_CD([]);
        setDataQRY_KSV_PO_MRP_PURPOSE(datasQRY_KSV_PO_MRP_PURPOSE[0]);
        setDatasTBL_KSV_PO_MRP2([]);
    };

    const search_CODE = (argData0) => {
        var argData = {};
        if (typeof argData0 === "undefined")
            argData = { ...dataQRY_KSV_PO_MRP };
        else argData = { ...argData0 };
        var tObj = {};
        tObj.BUYER_CD = argData.BUYER_CD;
        tObj.PO_CD = argData.PO_CD;
        tObj.ORDER_CD = argData.ORDER_CD;
        serviceS0520_FACOUT_RECORD.mgrQuery_CODE(tObj).then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                if (data.BUYER_CD.length > 0) {
                    setDatasQRY_KSV_PO_MRP_BUYER_CD(data.BUYER_CD);
                    setDataQRY_KSV_PO_MRP_BUYER_CD(data.BUYER_CD[0]);

                    setDatasQRY_KSV_PO_MRP_PO_CD(data.PO_CD);
                    setDataQRY_KSV_PO_MRP_PO_CD(data.PO_CD[0]);

                    console.log(data.PO_CD);

                    setDatasQRY_KSV_PO_MRP_ORDER_CD(data.ORDER_CD);
                    setDataQRY_KSV_PO_MRP_ORDER_CD(data.ORDER_CD[0]);

                    setDatasQRY_KSV_PO_MRP_PURPOSE(data.PURPOSE);
                    setDataQRY_KSV_PO_MRP_PURPOSE(data.PURPOSE[0]);

                    setDatasQRY_KSV_PO_MRP_FACOUT_CD(data.FACOUT_CD);
                    setDataQRY_KSV_PO_MRP_FACOUT_CD(data.FACOUT_CD[0]);
                } else {
                    setDatasQRY_KSV_PO_MRP_FACOUT_CD(data.FACOUT_CD);
                    setDataQRY_KSV_PO_MRP_FACOUT_CD(data.FACOUT_CD[0]);
                }
            } else {
                console.log(
                    "mgrQuery_PO_CD error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });
    };

    const search_CODE_DETAIL = (argData, argKind) => {
        var tObj = {};
        if (argKind === "BUYER_CD") tObj.BUYER_CD = argData;
        if (argKind === "PO_CD") tObj.PO_CD = argData;
        if (argKind === "ORDER_CD") tObj.ORDER_CD = argData;
        serviceS0520_FACOUT_RECORD.mgrQuery_CODE_DETAIL(tObj).then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                if (argKind === "BUYER_CD") {
                    setDatasQRY_KSV_PO_MRP_BUYER_CD(data.BUYER_CD);
                    setDataQRY_KSV_PO_MRP_BUYER_CD(data.BUYER_CD[0]);
                }
                if (argKind === "PO_CD") {
                    setDatasQRY_KSV_PO_MRP_PO_CD(data.PO_CD);
                    setDataQRY_KSV_PO_MRP({
                        ...dataQRY_KSV_PO_MRP,
                        PO_CD: argData,
                    });

                    if (data.PO_CD?.length) {
                        setDataQRY_KSV_PO_MRP_PO_CD(data.PO_CD[1]);
                    }

                    if (data.BUYER_CD?.length) {
                        setDataQRY_KSV_PO_MRP_BUYER_CD(
                            data.BUYER_CD[0].BUYER_CD,
                        );
                        setDataQRY_KSV_PO_MRP({
                            ...dataQRY_KSV_PO_MRP,
                            BUYER_CD: data.BUYER_CD[0].BUYER_CD,
                        });
                    }

                    if (data.ORDER_CD?.length) {
                        setDatasQRY_KSV_PO_MRP_ORDER_CD(data.ORDER_CD);
                        setDataQRY_KSV_PO_MRP_ORDER_CD(data.ORDER_CD[0]);
                    }
                }
                if (argKind === "ORDER_CD") {
                    setDatasQRY_KSV_PO_MRP_ORDER_CD(data.ORDER_CD);
                    setDataQRY_KSV_PO_MRP_ORDER_CD(data.ORDER_CD[0]);
                }
            } else {
                console.log(
                    "mgrQuery_PO_CD error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });
    };

    // Search KSV_STOCK_MEM
    const search_LIST_1 = (argData) => {
        console.log(argData);

        var tObj = {};
        if (typeof argData.BUYER_CD !== "undefined") tObj = { ...argData };
        else tObj = { ...dataQRY_KSV_PO_MRP };

        console.log(tObj);

        tObj.PO_CD = dataQRY_KSV_PO_MRP_PO_CD.CD_CODE;

        if (tObj.BUYER_CD === "" || tObj.BUYER_CD === null) {
            alert("Buyer# is required. Input PO# and press Enter key.");

            return;
        }
        if (tObj.PO_CD === "" || tObj.PO_CD === null) {
            alert("PO# is required.");
            return;
        }

        setLoadingTBL_KSV_PO_MRP2(true);

        // 2
        serviceS0520_FACOUT_RECORD.mgrQuery_LIST_1(tObj).then((data) => {
            setLoadingTBL_KSV_PO_MRP2(false);
            if (typeof data.graphQLErrors === "undefined") {
                if (data.length <= 0) {
                    setDatasTBL_KSV_PO_MRP2([]);
                    return;
                }

                var tColArray = [];
                data.forEach((col, i) => {
                    var tObj = { ...col };
                    tObj.id = i + 1;
                    col.FACOUT_ARRAY.forEach((col1, i1) => {
                        var chk1 = 0;
                        tColArray.forEach((col2, i2) => {
                            if (col2.field_name === col1.OUT_NAME) chk1 = 1;
                        });
                        if (chk1 === 0) {
                            var tInObj = {};
                            tInObj.field = `COL_${tColArray.length}`;
                            tInObj.field_name = col1.OUT_NAME;
                            tColArray.push(tInObj);
                        }
                    });
                });
                setDatasTBL_KSV_PO_MRP2_COL(tColArray);

                var tArray = [];
                data.forEach((col, i) => {
                    var tObj = { ...col };
                    tObj.id = i + 1;
                    tColArray.forEach((col2, i2) => {
                        tObj[`${col2.field}`] = "0";
                    });

                    col.FACOUT_ARRAY.forEach((col1, i1) => {
                        tColArray.forEach((col2, i2) => {
                            if (col2.field_name === col1.OUT_NAME) {
                                var tColName = col2.field;
                                var tmpVal = parseFloat(tObj[`${tColName}`]);
                                tmpVal += parseFloat(col1.OUT_QTY);
                                tObj[`${tColName}`] = tmpVal.toFixed(0);
                            }
                        });
                    });
                    tArray.push(tObj);
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

    const process_FACOUT = () => {
        if (dataQRY_KSV_PO_MRP.ORDER_CD === "") {
            alert("Order로 조회된 것만 작업가능합니다<br><br>You can only work on items viewed by order.");
            return;
        }

        var tObj0 = { ...dataQRY_KSV_PO_MRP };
        if (tObj0.PURPOSE === "") {
            alert("Purpose을 입력해야 합니다<br><br>You must enter Purpose");
            return;
        }

        var tEdit = {};
        tEdit.PURPOSE = tObj0.PURPOSE;
        tEdit.REMARK = tObj0.REMARK;
        tEdit.OUT_DATE = tObj0.OUT_DATE;

        const sourceRows =
            Array.isArray(selectedTBL_KSV_PO_MRP2) &&
            selectedTBL_KSV_PO_MRP2.length > 0
                ? datasTBL_KSV_PO_MRP2.filter((row) =>
                      selectedTBL_KSV_PO_MRP2.some((sel) => sel.id === row.id),
                  )
                : datasTBL_KSV_PO_MRP2;

        var tSelObj = { ...(sourceRows[0] || {}) };
        var tKeys = Object.keys(tSelObj);

        var tObjs = [];
        sourceRows.forEach((col, i) => {
            var tObj = { ...col };
            tObj.ORDER_CD = dataQRY_KSV_PO_MRP.ORDER_CD;

            tKeys.forEach((col1, i1) => {
                if (col1 === "__typename") delete tObj[`${col1}`];
                else if (col1 === "id") delete tObj[`${col1}`];
                else if (col1.includes("COL_")) delete tObj[`${col1}`];
            });

            delete tObj.FACOUT_ARRAY;
            const outQty = Number(
                String(tObj.OUT_QTY ?? "")
                    .replace(/,/g, "")
                    .trim(),
            );

            if (!Number.isFinite(outQty) || outQty <= 0) {
            } else {
                tObj.OUT_QTY = String(outQty);
                tObj.REMARK = tObj0.PURPOSE;
                tObjs.push(tObj);
            }
        });

        if (tObjs.length <= 0) {
            alert("Out Qty > 0 인 항목이 없습니다.\nPlease input Out Qty first.");
            return;
        }

        //setIsProgress(true);
        setSelectedTBL_KSV_PO_MRP2([]);
        setDatasTBL_KSV_PO_MRP2([]);
        setLoadingTBL_KSV_PO_MRP2(true);
        serviceS0520_FACOUT_RECORD
            .mgrInsert_FACOUT(tObjs, tEdit)
            .then((data) => {
                setLoadingTBL_KSV_PO_MRP2(false);
                setIsProgress(false);
                if (typeof data.graphQLErrors === "undefined") {
                    if (data.length > 0) {
                        alert(data[0].CODE);
                        if (data[0].CODE.includes("SUCC")) {
                            search_LIST_1({});
                            // search_CODE(tObj0);
                        }
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

    const [datasQRY_KSV_PO_MRP_BUYER_CD, setDatasQRY_KSV_PO_MRP_BUYER_CD] =
        useState([]);
    const [dataQRY_KSV_PO_MRP_BUYER_CD, setDataQRY_KSV_PO_MRP_BUYER_CD] =
        useState({});

    const editQRY_KSV_PO_MRP_BUYER_CD = (argValue) => {
        let _dataQRY_KSV_PO_MRP_BUYER_CD = datasQRY_KSV_PO_MRP_BUYER_CD.filter(
            (val) => val.BUYER_CD === argValue,
        );
        setDataQRY_KSV_PO_MRP_BUYER_CD(_dataQRY_KSV_PO_MRP_BUYER_CD[0]);
    };

    const onKeyPressQRY_KSV_PO_MRP = (e, name) => {
        if (e.key === "Enter") {
            search_CODE_DETAIL(e.target.value, name);
        }
    };

    const onKeyPressQRY_KSV_PO_MRP_BUYER_CD = (e, name) => {
        if (e.key === "Enter") {
            var tInObj = {};
            tInObj.BUYER_CD = e.target.value;
            tInObj.PO_CD = "";

            setDatasTBL_KSV_PO_MRP2([]);

            serviceS0520_FACOUT_RECORD.mgrQuery_CODE0(tInObj).then((data) => {
                if (typeof data.graphQLErrors === "undefined") {
                    setDatasQRY_KSV_PO_MRP_PO_CD(data.PO_CD);
                    setDataQRY_KSV_PO_MRP_PO_CD(data.PO_CD[0]);
                } else {
                    console.log(
                        "mgrQuery_PO_CD error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });
        }
    };

    const onInputChangeQRY_KSV_PO_MRP_BUYER_CD = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_PO_MRP = { ...dataQRY_KSV_PO_MRP };

        let tTypeVal = _dataQRY_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string") _dataQRY_KSV_PO_MRP[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_PO_MRP[`${name}`] = parseInt(val);

        setDataQRY_KSV_PO_MRP(_dataQRY_KSV_PO_MRP);

        if (val.length >= 2) {
            var tInObj = {};
            tInObj.BUYER_CD = val;
            tInObj.PO_CD = "";

            serviceS0520_FACOUT_RECORD.mgrQuery_CODE0(tInObj).then((data) => {
                if (typeof data.graphQLErrors === "undefined") {
                    setDatasQRY_KSV_PO_MRP_PO_CD(data.PO_CD);
                    setDataQRY_KSV_PO_MRP_PO_CD(data.PO_CD[0]);
                } else {
                    console.log(
                        "mgrQuery_PO_CD error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });
        }
    };

    const onCalChangeQRY_KSV_PO_MRP_OUT_DATE = (e, name) => {
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

    const onInputChangeQRY_KSV_PO_MRP_REMARK = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_PO_MRP = { ...dataQRY_KSV_PO_MRP };

        let tTypeVal = _dataQRY_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string") _dataQRY_KSV_PO_MRP[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_PO_MRP[`${name}`] = parseInt(val);

        setDataQRY_KSV_PO_MRP(_dataQRY_KSV_PO_MRP);
    };

    const [datasQRY_KSV_PO_MRP_PO_CD, setDatasQRY_KSV_PO_MRP_PO_CD] = useState(
        [],
    );
    const [dataQRY_KSV_PO_MRP_PO_CD, setDataQRY_KSV_PO_MRP_PO_CD] = useState(
        {},
    );

    const onDropdownChangeQRY_KSV_PO_MRP_PO_CD = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataQRY_KSV_PO_MRP = { ...dataQRY_KSV_PO_MRP };

        let tTypeVal = _dataQRY_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_PO_MRP[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_PO_MRP[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_PO_MRP(_dataQRY_KSV_PO_MRP);
        setDataQRY_KSV_PO_MRP_PO_CD(e.value);

        var tInObj = {};
        tInObj.PO_CD = val;
        tInObj.BUYER_CD = "";

        setDatasTBL_KSV_PO_MRP2([]);

        serviceS0520_FACOUT_RECORD.mgrQuery_CODE0(tInObj).then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                setDatasQRY_KSV_PO_MRP_ORDER_CD(data.ORDER_CD);
                setDataQRY_KSV_PO_MRP_ORDER_CD(data.ORDER_CD[0]);
            } else {
                console.log(
                    "mgrQuery_PO_CD error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });

        var tInObj1 = { ...dataQRY_KSV_PO_MRP };
        tInObj1.PO_CD = val;
        tInObj1.ORDER_CD = "";
        //search_LIST_1(tInObj1);
    };

    const [datasQRY_KSV_PO_MRP_ORDER_CD, setDatasQRY_KSV_PO_MRP_ORDER_CD] =
        useState([]);
    const [dataQRY_KSV_PO_MRP_ORDER_CD, setDataQRY_KSV_PO_MRP_ORDER_CD] =
        useState({});

    const onDropdownChangeQRY_KSV_PO_MRP_ORDER_CD = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";
        var tBuyerCd = val.substring(0, 2);

        let _dataQRY_KSV_PO_MRP = { ...dataQRY_KSV_PO_MRP };

        let tTypeVal = _dataQRY_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_PO_MRP[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_PO_MRP[`${name}`] = parseInt(val);
        }

        // _dataQRY_KSV_PO_MRP.BUYER_CD = tBuyerCd;

        setDataQRY_KSV_PO_MRP(_dataQRY_KSV_PO_MRP);
        setDataQRY_KSV_PO_MRP_ORDER_CD(e.value);

        editQRY_KSV_PO_MRP_BUYER_CD(tBuyerCd);

        // search_CODE(_dataQRY_KSV_PO_MRP);

        setDatasTBL_KSV_PO_MRP2([]);
        if (val === "") {
            var tInObj1 = { ...dataQRY_KSV_PO_MRP };
            tInObj1.ORDER_CD = "";
            search_LIST_1(tInObj1);
        } else {
            var tInObj1 = { ...dataQRY_KSV_PO_MRP };
            tInObj1.ORDER_CD = val;
            search_LIST_1(tInObj1);
        }
    };

    const [datasQRY_KSV_PO_MRP_PURPOSE, setDatasQRY_KSV_PO_MRP_PURPOSE] =
        useState([]);
    const [dataQRY_KSV_PO_MRP_PURPOSE, setDataQRY_KSV_PO_MRP_PURPOSE] =
        useState({});

    const onDropdownChangeQRY_KSV_PO_MRP_PURPOSE = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataQRY_KSV_PO_MRP = { ...dataQRY_KSV_PO_MRP };

        let tTypeVal = _dataQRY_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_PO_MRP[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_PO_MRP[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_PO_MRP(_dataQRY_KSV_PO_MRP);
        setDataQRY_KSV_PO_MRP_PURPOSE(e.value);
    };

    const [datasQRY_KSV_PO_MRP_FACOUT_CD, setDatasQRY_KSV_PO_MRP_FACOUT_CD] =
        useState([]);
    const [dataQRY_KSV_PO_MRP_FACOUT_CD, setDataQRY_KSV_PO_MRP_FACOUT_CD] =
        useState({});

    const onDropdownChangeQRY_KSV_PO_MRP_FACOUT_CD = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataQRY_KSV_PO_MRP = { ...dataQRY_KSV_PO_MRP };

        let tTypeVal = _dataQRY_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_PO_MRP[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_PO_MRP[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_PO_MRP(_dataQRY_KSV_PO_MRP);
        setDataQRY_KSV_PO_MRP_FACOUT_CD(e.value);
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

    const [datasQRY_KSV_PO_MRP_PU_STATUS, setDatasQRY_KSV_PO_MRP_PU_STATUS] =
        useState([]);
    const [dataQRY_KSV_PO_MRP_PU_STATUS, setDataQRY_KSV_PO_MRP_PU_STATUS] =
        useState({});

    const onCheckboxChangeQRY_KSV_PO_MRP_IS_BALANCE = (e, name) => {
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

    const [datasTBL_KSV_PO_MRP2_COL, setDatasTBL_KSV_PO_MRP2_COL] = useState(
        [],
    );
    const [datasTBL_KSV_PO_MRP2, setDatasTBL_KSV_PO_MRP2] = useState([]);
    const dt_TBL_KSV_PO_MRP2 = useRef(null);
    const [dataTBL_KSV_PO_MRP2, setDataTBL_KSV_PO_MRP2] =
        useState(emptyTBL_KSV_PO_MRP2);
    const [selectedTBL_KSV_PO_MRP2, setSelectedTBL_KSV_PO_MRP2] = useState([]);
    const [flagSelectModeTBL_KSV_PO_MRP2, setFlagSelectModeTBL_KSV_PO_MRP2] =
        useState(false);

    const copyQtyToOutQty = () => {
        const targetRows =
            Array.isArray(selectedTBL_KSV_PO_MRP2) &&
            selectedTBL_KSV_PO_MRP2.length > 0
                ? selectedTBL_KSV_PO_MRP2
                : [];
        if (targetRows.length === 0) {
            alert("복사할 항목을 선택해주세요.<br><br>Please select items to copy.");
            return;
        }
        const selectedIds = new Set(targetRows.map((r) => r.id));
        setDatasTBL_KSV_PO_MRP2((prev) => {
            const nextRows = prev.map((row) => {
                if (selectedIds.has(row.id)) {
                    return { ...row, OUT_QTY: String(row.MRP_QTY ?? 0) };
                }
                return row;
            });
            setSelectedTBL_KSV_PO_MRP2(
                nextRows.filter((row) => selectedIds.has(row.id)),
            );
            return nextRows;
        });
    };

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

    const exportExcelTBL_KSV_PO_MRP2 = () => {
        var tArray = [];
        datasTBL_KSV_PO_MRP2.forEach((col, i) => {
            var tObj = {};
            tObj.NO = col.id;
            tObj.Supplier = col.VENDOR_NAME;
            tObj.Matl = col.MATL_CD;
            tObj.Description = col.MATL_NAME;
            tObj.Color = col.COLOR;
            tObj.Spec = col.SPEC;
            tObj.Unit = col.UNIT;
            tObj.FacIn_Qty = col.INFAC_QTY;
            tObj.MRP_Qty = col.MRP_QTY;
            tObj.FacOut_Qty = col.OUTFAC_QTY;
            tObj.Use = col.LINEOUT_QTY;
            tObj.Return = col.RETURN_QTY;
            tObj.Stock = col.STOCK_QTY;
            tObj.Lost = col.LOST_QTY;
            tObj.Balance = col.BAL_QTY;
            tObj.Out_Qty = col.OUTFAC_QTY2;
            tObj.Remark = col.REMARK;
            datasTBL_KSV_PO_MRP2_COL.forEach((col1, i1) => {
                tObj[`${col1.field_name}`] = col[`COL_${i1}`];
            });
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
            saveAsExcelFileTBL_KSV_PO_MRP2(excelBuffer, "Fac Out List");
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

    const dynamicColumnsTBL_KSV_PO_MRP2 = datasTBL_KSV_PO_MRP2_COL.map(
        (col, i) => {
            var tHeader = `id_msg_${col.field_name}_KSV_ORDER_MST_dt`;
            var tHeaderStr = serviceLib.getLocaleMessage(tHeader);
            var tFieldLeng = col.field_name.length;
            return (
                <AFColumn field={col.field} className="af-col" header={tHeaderStr} style={{ width: "12rem" }} bodyStyle={{ textAlign: "right" }} ></AFColumn>
            );
        },
    );

    /* QRY KSV_PO_MRP*/
    const [dataEDT_KSV_PO_MRP, setDataEDT_KSV_PO_MRP] =
        useState(emptyEDT_KSV_PO_MRP);

    ///

    useEffect(() => {
        let buyerCd = serviceLib.getQueryParam("BUYER_CD");
        let poCd = serviceLib.getQueryParam("PO_CD");
        let matlCd = serviceLib.getQueryParam("MATL_CD");

        console.log(buyerCd, poCd, matlCd);

        var tRetDate = serviceLib.getCurrDate().substring(0, 8);
        var tObj = { ...dataQRY_KSV_PO_MRP };
        tObj.OUT_DATE = tRetDate;

        if (buyerCd && poCd && matlCd) {
            tObj.BUYER_CD = buyerCd;
            tObj.PO_CD = poCd;
            tObj.MATL_CD = matlCd;

            setDataQRY_KSV_PO_MRP_PO_CD(poCd);
        }

        setDataQRY_KSV_PO_MRP(tObj);

        if (buyerCd && poCd && matlCd) {
            search_LIST_1(tObj);
            search_CODE(tObj);
        } else {
            search_CODE();
        }
    }, []);

    useEffect(() => {
        if (!Array.isArray(datasQRY_KSV_PO_MRP_PURPOSE)) return;
        if (datasQRY_KSV_PO_MRP_PURPOSE.length === 0) return;

        let isChanged = false;
        const nextPurposeOptions = datasQRY_KSV_PO_MRP_PURPOSE.map((item) => {
            const name = (item?.CD_NAME || "").toString().trim().toLowerCase();
            if (name === "defect") {
                isChanged = true;
                return {
                    ...item,
                    CD_NAME: "defect(A)",
                };
            }
            return item;
        });

        if (!isChanged) return;

        setDatasQRY_KSV_PO_MRP_PURPOSE(nextPurposeOptions);

        const selectedCode = dataQRY_KSV_PO_MRP_PURPOSE?.CD_CODE;
        if (!selectedCode) return;

        const selectedNext = nextPurposeOptions.find(
            (item) => item.CD_CODE === selectedCode,
        );

        if (selectedNext) {
            setDataQRY_KSV_PO_MRP_PURPOSE(selectedNext);
        }
    }, [datasQRY_KSV_PO_MRP_PURPOSE, dataQRY_KSV_PO_MRP_PURPOSE]);

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

    const onCellEditCompleteKSV_PO_MRP2 = (e) => {
        let { rowData, newValue, field, originalEvent: event } = e;

        if (field === "OUT_QTY") {
            rowData[field] = newValue;
        }

        var tArray = [];

        datasTBL_KSV_PO_MRP2.forEach((col, i) => {
            var tObj = { ...col };
            tArray.push(tObj);
        });

        setDatasTBL_KSV_PO_MRP2(tArray);
    };

    // GUIDE: 에디터 컴포넌트에 onKeyDown 이벤트를 연결한다.
    const onChangeTextEdit = (e, options) => {
        options.editorCallback(e.target.value);
    };

    const handleFocus = (event, row) => {
        event.target.select();
    };

    const cellEditorKSV_PO_MRP2 = (options) => {
        return textEditor(options);
    };

    const textEditor = (options) => {
        return (
            <InputText
                type="number"
                value={options.value}
                onChange={(e) => onChangeTextEdit(e, options)}
                onFocus={(e) => handleFocus(e, options.rowData)}
            />
        );
    };

    const onInputChangeQRY_KSV_PO_MRP = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_PO_MRP = { ...dataQRY_KSV_PO_MRP };

        let tTypeVal = _dataQRY_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string") _dataQRY_KSV_PO_MRP[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_PO_MRP[`${name}`] = parseInt(val);

        setDataQRY_KSV_PO_MRP(_dataQRY_KSV_PO_MRP);
    };

    return (
        <div className="af-div-main">
            <div
                className="af-div-first"
                style={{ width: "123rem", height: "5.5rem" }}
            >
                <span className="af-span-3-0" style={{ width: "11rem" }}>
                    <p className="af-span-p" style={{ width: "7rem" }}>Buyer#</p>
                    <div className="af-span-div" style={{ width: "3rem" }}>
                        <InputText
                            style={{ width: "3rem" }}
                            id="id_TARGET_ETA"
                            value={dataQRY_KSV_PO_MRP.BUYER_CD}
                            onChange={(e) =>
                                onInputChangeQRY_KSV_PO_MRP_BUYER_CD(
                                    e,
                                    "BUYER_CD",
                                )
                            }
                            onKeyPress={(e) =>
                                onKeyPressQRY_KSV_PO_MRP_BUYER_CD(e, "BUYER_CD")
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "19rem" }}>
                    <p className="af-span-p" style={{ width: "7rem" }}>PO#</p>
                    <div className="af-span-div" style={{ width: "11rem" }}>
                        <Dropdown
                            style={{ width: "11rem" }}
                            id="id_PO_CD"
                            value={dataQRY_KSV_PO_MRP_PO_CD}
                            onChange={(e) =>
                                onDropdownChangeQRY_KSV_PO_MRP_PO_CD(e, "PO_CD")
                            }
                            options={datasQRY_KSV_PO_MRP_PO_CD}
                            optionLabel="CD_NAME"
                            placeholder=""
                            editable
                            filter
                            onKeyPress={(e) =>
                                onKeyPressQRY_KSV_PO_MRP(e, "PO_CD")
                            }
                        ></Dropdown>
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "19rem" }}>
                    <p className="af-span-p" style={{ width: "7rem" }}>Order#</p>
                    <div className="af-span-div" style={{ width: "11rem" }}>
                        <Dropdown
                            style={{ width: "11rem" }}
                            id="id_PO_CD"
                            value={dataQRY_KSV_PO_MRP_ORDER_CD}
                            onChange={(e) =>
                                onDropdownChangeQRY_KSV_PO_MRP_ORDER_CD(
                                    e,
                                    "ORDER_CD",
                                )
                            }
                            options={datasQRY_KSV_PO_MRP_ORDER_CD}
                            optionLabel="CD_NAME"
                            filter
                            onKeyPress={(e) =>
                                onKeyPressQRY_KSV_PO_MRP(e, "ORDER_CD")
                            }
                            placeholder="Select"
                        ></Dropdown>
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "17rem" }}>
                    <p className="af-span-p" style={{ width: "7rem" }}>Supplier</p>
                    <div className="af-span-div" style={{ width: "9rem" }}>
                        <InputText
                            style={{ width: "9rem" }}
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
                <span className="af-span-3-0" style={{ width: "19rem" }}>
                    <p className="af-span-p" style={{ width: "7rem" }}>FacOut#</p>
                    <div className="af-span-div" style={{ width: "11rem" }}>
                        <Dropdown
                            style={{ width: "11rem" }}
                            id="id_PO_CD"
                            value={dataQRY_KSV_PO_MRP_FACOUT_CD}
                            onChange={(e) =>
                                onDropdownChangeQRY_KSV_PO_MRP_FACOUT_CD(
                                    e,
                                    "FACOUT_CD",
                                )
                            }
                            options={datasQRY_KSV_PO_MRP_FACOUT_CD}
                            optionLabel="CD_NAME"
                            placeholder=""
                            editable
                            filter
                        ></Dropdown>
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "12rem" }}>
                    <p className="af-span-p" style={{ width: "10rem" }}>Balance Only</p>
                    <div className="af-span-checkbox">
                        <Checkbox
                            id="id_SINGAPORE_COMBINE"
                            checked={changeCheckBoxVal(
                                dataQRY_KSV_PO_MRP.IS_BALANCE,
                            )}
                            onChange={(e) =>
                                onCheckboxChangeQRY_KSV_PO_MRP_IS_BALANCE(
                                    e,
                                    "IS_BALANCE",
                                )
                            }
                        />
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
                            style={{ width: "6rem" }}
                            label="Reset"
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
                            onClick={exportExcelTBL_KSV_PO_MRP2}
                        />
                    </div>
                </span>

                <span
                    className="af-span-3"
                    style={{ width: "100%", marginTop: "4px" }}
                >
                    <p className="af-span-p" style={{ width: "6rem" }}>Description</p>
                    <InputText
                        style={{ width: "9rem", marginLeft: "5px" }}
                        value={dataQRY_KSV_PO_MRP.DESCRIPTION}
                        onChange={(e) =>
                            onInputChangeQRY_KSV_PO_MRP(e, "DESCRIPTION")
                        }
                    />

                    <p className="af-span-p" style={{ width: "6rem" }}>Matl#</p>
                    <InputText
                        style={{ width: "9rem", marginLeft: "5px" }}
                        value={dataQRY_KSV_PO_MRP.MATL_CD}
                        onChange={(e) =>
                            onInputChangeQRY_KSV_PO_MRP(e, "MATL_CD")
                        }
                    />

                    <p className="af-span-p" style={{ width: "6rem" }}>Spec</p>
                    <InputText
                        style={{ width: "9rem", marginLeft: "5px" }}
                        value={dataQRY_KSV_PO_MRP.SPEC}
                        onChange={(e) => onInputChangeQRY_KSV_PO_MRP(e, "SPEC")}
                    />

                    <p className="af-span-p" style={{ width: "6rem" }}>Color</p>
                    <InputText
                        style={{ width: "9rem", marginLeft: "5px" }}
                        value={dataQRY_KSV_PO_MRP.COLOR}
                        onChange={(e) =>
                            onInputChangeQRY_KSV_PO_MRP(e, "COLOR")
                        }
                    />

                    <p className="af-span-p" style={{ width: "6rem" }}>UNIT</p>
                    <InputText
                        style={{ width: "9rem", marginLeft: "5px" }}
                        value={dataQRY_KSV_PO_MRP.UNIT}
                        onChange={(e) => onInputChangeQRY_KSV_PO_MRP(e, "UNIT")}
                    />
                </span>
            </div>

            <div
                className="af-div-first"
                style={{ width: "123rem", height: "54rem" }}
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
                    selection={selectedTBL_KSV_PO_MRP2}
                    onSelectionChange={(e) => {
                        setSelectedTBL_KSV_PO_MRP2(e.value);
                        onRowClick1TBL_KSV_PO_MRP2(e.value);
                    }}
                    dataKey="id"
                    className="datatable-responsive"
                    virtualScrollerOptions={{ itemSize: 20 }}
                    emptyMessage=" "
                    responsiveLayout="scroll"
                    scrollable
                    scrollHeight="589px"
                >
                    <AFColumn selectionMode="multiple" field="__checkbox__" reorderable={false} headerClassName="t-header" headerStyle={{ width: "3rem" }} ></AFColumn>
                    <AFColumn field="VENDOR_NAME" headerClassName="t-header" header="Supplier" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="MATL_CD" headerClassName="t-header" header="Matl" style={{ width: "6rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="MATL_NAME" headerClassName="t-header" header="Desc" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="COLOR" headerClassName="t-header" header="Color" style={{ width: "8rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="SPEC" headerClassName="t-header" header="Spec" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="UNIT" headerClassName="t-header" header="Unit" style={{ width: "5rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="MRP_QTY" headerClassName="t-header" header="Mrp Qty" style={{ width: "6rem", flexBasis: "auto" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.MRP_QTY, 2) } ></AFColumn>
                    <AFColumn field="STOCK_QTY" headerClassName="t-header" header="Stock" style={{ width: "6rem", flexBasis: "auto" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.STOCK_QTY, 2) } ></AFColumn>
                    <AFColumn field="FAC_IN_QTY" headerClassName="t-header" header="FacIn Qty" style={{ width: "6rem", flexBasis: "auto" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.FAC_IN_QTY, 2) } ></AFColumn>
                    <AFColumn field="SHORT_QTY" headerClassName="t-header" header="Short" style={{ width: "6rem", flexBasis: "auto" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.SHORT_QTY, 2) } ></AFColumn>
                    <AFColumn field="DEFECT_QTY" headerClassName="t-header" header="Defect" style={{ width: "6rem", flexBasis: "auto" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.DEFECT_QTY, 2) } ></AFColumn>
                    <AFColumn field="MAIN_USE_QTY" headerClassName="t-header" header="Main Use" style={{ width: "6rem", flexBasis: "auto" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.MAIN_USE_QTY, 2) } ></AFColumn>
                    <AFColumn field="OTHER_USE_QTY" headerClassName="t-header" header="Other Use" style={{ width: "6rem", flexBasis: "auto" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.OTHER_USE_QTY, 2) } ></AFColumn>
                    <AFColumn field="TABLE_SHORT_QTY" headerClassName="t-header" header="Table Short" style={{ width: "6rem", flexBasis: "auto" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.TABLE_SHORT_QTY, 2) } ></AFColumn>
                    <AFColumn field="KEEP_STOCK_QTY" headerClassName="t-header" header="Keep Stock" style={{ width: "6rem", flexBasis: "auto" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.KEEP_STOCK_QTY, 2) } ></AFColumn>
                    <AFColumn field="LOST_QTY" headerClassName="t-header" header="Lost" style={{ width: "6rem", flexBasis: "auto" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.LOST_QTY, 2) } ></AFColumn>
                    <AFColumn field="LINE_RETURN_QTY" headerClassName="t-header" header="Line Return" style={{ width: "6rem", flexBasis: "auto" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.LINE_RETURN_QTY, 2) } ></AFColumn>
                    <AFColumn field="FAC_OUT_QTY" headerClassName="t-header" header="Fac Out" style={{ width: "6rem", flexBasis: "auto" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.FAC_OUT_QTY, 2) } ></AFColumn>
                    <AFColumn field="REMAIN_A_QTY" headerClassName="t-header" header="Remain(A)" style={{ width: "6rem", flexBasis: "auto" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.REMAIN_A_QTY, 2) } ></AFColumn>
                    <AFColumn field="OUT_QTY" headerClassName="t-header" headerStyle={{ color: "green" }} header="Out Qty" style={{ width: "6rem", flexBasis: "auto" }} editor={(options) => cellEditorKSV_PO_MRP2(options)} onCellEditComplete={onCellEditCompleteKSV_PO_MRP2} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.OUT_QTY, 2) } ></AFColumn>
                    <AFColumn field="REMARK" headerClassName="t-header" header="Remark" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    {dynamicColumnsTBL_KSV_PO_MRP2}
                </AFDataTable>
            </div>

            <div
                className="af-div-first"
                style={{ width: "123rem", height: "3.5rem" }}
            >
                <span className="af-span-3-0" style={{ width: "17rem" }}>
                    <p className="af-span-p" style={{ width: "7rem" }}>Purpose</p>
                    <div className="af-span-div" style={{ width: "9rem" }}>
                        <Dropdown
                            style={{ width: "9rem" }}
                            id="id_PO_CD"
                            value={dataQRY_KSV_PO_MRP_PURPOSE}
                            onChange={(e) =>
                                onDropdownChangeQRY_KSV_PO_MRP_PURPOSE(
                                    e,
                                    "PURPOSE",
                                )
                            }
                            options={datasQRY_KSV_PO_MRP_PURPOSE}
                            optionLabel="CD_NAME"
                            placeholder=""
                            editable
                            filter
                        ></Dropdown>
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "28rem" }}>
                    <p className="af-span-p" style={{ width: "7rem" }}>Remark</p>
                    <div className="af-span-div" style={{ width: "20rem" }}>
                        <InputText
                            style={{ width: "20rem" }}
                            id="id_TARGET_ETA"
                            value={dataQRY_KSV_PO_MRP.REMAKK}
                            onChange={(e) =>
                                onInputChangeQRY_KSV_PO_MRP_REMARK(e, "REMARK")
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "17rem" }}>
                    <p className="af-span-p" style={{ width: "7rem" }}>Out Date</p>
                    <div className="af-span-div" style={{ width: "9rem" }}>
                        <Calendar
                            showButtonBar
                            style={{ width: "9rem" }}
                            dateFormat="yy-mm-dd"
                            id="id_ETA"
                            value={changeDateVal(dataQRY_KSV_PO_MRP.OUT_DATE)}
                            onChange={(e) =>
                                onCalChangeQRY_KSV_PO_MRP_OUT_DATE(
                                    e,
                                    "OUT_DATE",
                                )
                            }
                        />
                    </div>
                </span>

                <span className="af-span-3-0" style={{ width: "10rem" }}>
                    <div className="af-span-div-btn" style={{ width: "9rem" }}>
                        <Button
                            style={{ width: "9rem" }}
                            label="Save"
                            className="p-button-text"
                            onClick={process_FACOUT}
                        />
                    </div>
                </span>

                <span className="af-span-3-0" style={{ width: "10rem" }}>
                    <div className="af-span-div-btn" style={{ width: "9rem" }}>
                        <Button
                            style={{ width: "9rem" }}
                            label="Copy Qty"
                            className="p-button-text"
                            onClick={copyQtyToOutQty}
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

export default React.memo(S0520_FACOUT_RECORD, comparisonFn);
