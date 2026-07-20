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
import { ServiceS030302_COPY_STYLE } from "../service/service_biz/ServiceS030302_COPY_STYLE";
import { ServiceS030303_MRP_BY_SEARCH } from "../service/service_biz/ServiceS030303_MRP_BY_SEARCH";

import "./page_common.scss";

const emptyKCD_CODE = {
    id: 0,
    CD_GROUP: "",
    CD_CODE: "",
    CD_NAME: "",
    CD_FLAG: "",
};

const emptyQRY_KCD_STYLE = {
    STYLE_NAME: "",
    COLOR: "",
    ORDER_CD: "",
};

const emptyQRY_KCD_STYLE1 = {
    COLOR: "",
    STYLE_CD: "",
    STYLE_NAME: "",
};

const emptyTBL_KCD_STYLE = {
    id: 0,
    STYLE_NAME: "",
    STYLE_CD: "",
};

const emptyTBL_KSV_PROD_MEM = {
    id: 0,
    MATL_TYPE2: "",
    MATL_CD: "",
    MATL_NAME: "",
    COLOR: "",
    SPEC: "",
    MATL_PRICE: "",
    CURR_CD: "",
    UNIT: "",
    ADD_LOSS: "",
    USE_SIZE: "",
    REMARK: "",
    BVT_REMARK: "",
    COUNTRY: "",
    STD_NET: "",
    STD_LOSS: "",
    STD_GROSS: "",
    NET: "",
    LOSS: "",
    GROSS: "",
    VENDOR_NAME: "",
    VENDOR_CD: "",
    SEQ: "",
};

const emptyTBL_KSV_PROD_MEM1 = {
    id: 0,
    MATL_TYPE2: "",
    MATL_CD: "",
    MATL_NAME: "",
    COLOR: "",
    SPEC: "",
    MATL_PRICE: "",
    CURR_CD: "",
    UNIT: "",
    ADD_LOSS: "",
    USE_SIZE: "",
    REMARK: "",
    BVT_REMARK: "",
    COUNTRY: "",
    STD_NET: "",
    STD_LOSS: "",
    STD_GROSS: "",
    NET: "",
    LOSS: "",
    GROSS: "",
    VENDOR_NAME: "",
    VENDOR_CD: "",
    SEQ: "",
};

const emptyTBL_KSV_PROD_MST = {
    id: 0,
};

const emptyTBL_KSV_ORDER_MST = {
    id: 0,
};

const S030303_MRP_BY_SEARCH = () => {
    const serviceLibRef = useRef(null);
    if (!serviceLibRef.current) {
        serviceLibRef.current = new ServiceLib();
        serviceLibRef.current.loginConfirm();
    }
    const serviceLib = serviceLibRef.current;
    const serviceS030303_MRP_BY_SEARCHRef = useRef(null);
    if (!serviceS030303_MRP_BY_SEARCHRef.current) serviceS030303_MRP_BY_SEARCHRef.current = new ServiceS030303_MRP_BY_SEARCH();
    const serviceS030303_MRP_BY_SEARCH = serviceS030303_MRP_BY_SEARCHRef.current;
    const serviceS030302_COPY_STYLERef = useRef(null);
    if (!serviceS030302_COPY_STYLERef.current) serviceS030302_COPY_STYLERef.current = new ServiceS030302_COPY_STYLE();
    const serviceS030302_COPY_STYLE = serviceS030302_COPY_STYLERef.current;

    const toast = useRef(null);

    const [saveOrderCd, setSaveOrderCd] = useState("");
    const [saveOrderMrpSeq, setSaveOrderMrpSeq] = useState("");
    const [saveStyleCd, setSaveStyleCd] = useState("");
    const [saveProdCd, setSaveProdCd] = useState("");
    const [parentSource, setParentSource] = useState("S0306");

    const normalizeSource = (value = "") => {
        const tSource = String(value || "")
            .split("?")[0]
            .split("&")[0]
            .trim()
            .toUpperCase();
        return tSource === "S0303" ? "S0303" : "S0306";
    };

    const emitParentCenterRefreshEvent = (trigger = "SAVE") => {
        window.parent.postMessage(
            {
                func: "mrp_requery_parent_center",
                message: {
                    SOURCE: parentSource,
                    TRIGGER: trigger,
                    STYLE_CD: saveStyleCd || dataQRY_KCD_STYLE1?.STYLE_CD || "",
                    ORDER_CD: saveOrderCd || dataTBL_KSV_ORDER_MST?.ORDER_CD || "",
                    ORDER_MRP_SEQ:
                        saveOrderMrpSeq ||
                        dataTBL_KSV_ORDER_MST?.ORDER_MRP_SEQ ||
                        "",
                    PROD_CD:
                        saveProdCd ||
                        dataQRY_KCD_STYLE1_COLOR?.PROD_CD ||
                        dataTBL_KSV_ORDER_MST?.PROD_CD ||
                        "",
                },
            },
            "*",
        );
    };

    /* splitter 관련 */
    const [styleVal, setStyleVal] = useState({ width: "65vw" });

    //
    const search_SRC_PROD_MEM = (argData) => {
        var _tObj1 = { ...dataQRY_KCD_STYLE1 };
        var tInObj = {};

        if (!argData) {
            tInObj.STYLE_CD = dataQRY_KCD_STYLE1.STYLE_CD;
            tInObj.PROD_CD = dataQRY_KCD_STYLE1_COLOR.PROD_CD;
        } else {
            tInObj.STYLE_CD = dataQRY_KCD_STYLE1.STYLE_CD;
            tInObj.PROD_CD = argData.PROD_CD;
        }

        setDatasTBL_KSV_PROD_MEM1([]);
        serviceS030302_COPY_STYLE
            .mgrQueryTBL_KSV_PROD_MEM(tInObj)
            .then((data) => {
                if (typeof data.graphQLErrors === "undefined") {
                    console.log(
                        "mgrQueryTBL_KSV_PROD_MEM call => " + data.length,
                    );
                    setDatasTBL_KSV_PROD_MEM1(
                        data.map((val, idx) => {
                            return {
                                ...val,
                                id: idx + 1,
                            };
                        }),
                    );
                } else {
                    console.log(
                        "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });
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

    const [datasQRY_KCD_STYLE_COLOR, setDatasQRY_KCD_STYLE_COLOR] = useState(
        [],
    );
    const [dataQRY_KCD_STYLE_COLOR, setDataQRY_KCD_STYLE_COLOR] = useState({});

    const [datasQRY_KCD_STYLE_ORDER_CD, setDatasQRY_KCD_STYLE_ORDER_CD] =
        useState([]);
    const [dataQRY_KCD_STYLE_ORDER_CD, setDataQRY_KCD_STYLE_ORDER_CD] =
        useState("");

    const onDropdownChangeQRY_KCD_STYLE_ORDER_CD = (e, name) => {
        let val = e.value || "";

        let _dataQRY_KCD_STYLE = { ...dataQRY_KCD_STYLE };

        let tTypeVal = _dataQRY_KCD_STYLE[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KCD_STYLE[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KCD_STYLE[`${name}`] = parseInt(val);
        }

        setDataQRY_KCD_STYLE(_dataQRY_KCD_STYLE);
        setDataQRY_KCD_STYLE_ORDER_CD(e.value);

        var tArray = [];
        datasTBL_KSV_ORDER_MST_SAVE.forEach((col, i) => {
            if (col.ORDER_CD === val) tArray.push(col);
        });
        setDatasTBL_KSV_ORDER_MST(tArray);

        if (tArray.length > 0) {
            const tFirstRow = tArray[0];
            setSelectedTBL_KSV_ORDER_MST([tFirstRow]);
            onRowClick1TBL_KSV_ORDER_MST(tFirstRow);
        } else {
            setSelectedTBL_KSV_ORDER_MST([]);
            setDataTBL_KSV_ORDER_MST(emptyTBL_KSV_ORDER_MST);
            setDatasTBL_KSV_PROD_MEM([]);
            setSelectedTBL_KSV_PROD_MEM([]);
        }
    };

    const search_ORDER_MST = (argStyleCd) => {
        var argObj = {};
        argObj.PROD_CD = argStyleCd;

        serviceS030303_MRP_BY_SEARCH
            .mgrQuery_SEARCH_ORDER_MRP(argObj)
            .then((data) => {
                if (typeof data.graphQLErrors === "undefined") {
                    console.log(
                        "ServiceMgrKCD_BUYER.mgr1KcdStyle call => " +
                            data.length,
                    );
                    // setDatasTBL_KSV_PROD_MST (data);
                    if (data.length > 0) {
                        var tArray = [];
                        var tOrderArray = [];
                        data.forEach((col, i) => {
                            var tOne = { ...col };
                            tOne.id = i + 1;
                            var tCheck = 0;
                            tOrderArray.forEach((col1, i1) => {
                                if (col1.ORDER_CD === col.ORDER_CD) tCheck = 1;
                            });
                            if (tCheck === 0) tOrderArray.push(tOne);
                            tArray.push(tOne);
                        });
                        setDatasTBL_KSV_ORDER_MST_SAVE(tArray);
                        setDatasQRY_KCD_STYLE_ORDER_CD(tOrderArray);
                        setDataQRY_KCD_STYLE_ORDER_CD(tOrderArray[0]?.ORDER_CD || "");

                        var tArray0 = [];
                        tArray.forEach((col, i) => {
                            if (col.ORDER_CD === tOrderArray[0]?.ORDER_CD)
                                tArray0.push(col);
                        });
                        setDatasTBL_KSV_ORDER_MST(tArray0);

                        var tArray1 = [];
                        tArray1.push(tArray0[0]);
                        setSelectedTBL_KSV_ORDER_MST(tArray1);
                        onRowClick1TBL_KSV_ORDER_MST(tArray0[0]);
                    }
                } else {
                    console.log(
                        "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });
    };

    const search_ORDER_MST_BY_STYLE = (argStyleCd) => {
        var argObj = {};
        argObj.PROD_CD = dataQRY_KCD_STYLE.STYLE_NAME;

        setLoadingTBL_KSV_ORDER_MST(true);
        serviceS030303_MRP_BY_SEARCH
            .mgrQuery_SEARCH_ORDER_MRP_BY_STYLE(argObj)
            .then((data) => {
                console.log(data);

                setLoadingTBL_KSV_ORDER_MST(false);
                if (typeof data.graphQLErrors === "undefined") {
                    console.log(
                        "ServiceMgrKCD_BUYER.mgr1KcdStyle call => " +
                            data.length,
                    );
                    // setDatasTBL_KSV_PROD_MST (data);

                    if (data.length > 0) {
                        var tArray = [];
                        var tOrderArray = [];
                        data.forEach((col, i) => {
                            var tOne = { ...col };
                            tOne.id = i + 1;
                            var tCheck = 0;
                            tOrderArray.forEach((col1, i1) => {
                                if (col1.ORDER_CD === col.ORDER_CD) tCheck = 1;
                            });
                            if (tCheck === 0) tOrderArray.push(tOne);
                            tArray.push(tOne);
                        });
                        setDatasTBL_KSV_ORDER_MST_SAVE(tArray);
                        setDatasQRY_KCD_STYLE_ORDER_CD(tOrderArray);
                        setDataQRY_KCD_STYLE_ORDER_CD(tOrderArray[0]?.ORDER_CD || "");

                        var tArray0 = [];
                        tArray.forEach((col, i) => {
                            if (col.ORDER_CD === tOrderArray[0]?.ORDER_CD)
                                tArray0.push(col);
                        });
                        setDatasTBL_KSV_ORDER_MST(tArray0);

                        var tArray1 = [];
                        tArray1.push(tArray0[0]);
                        setSelectedTBL_KSV_ORDER_MST(tArray1);
                        onRowClick1TBL_KSV_ORDER_MST(tArray0[0]);
                    }
                } else {
                    console.log(
                        "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });
    };

    /*QRY KCD_STYLE1 */
    const [dataQRY_KCD_STYLE1, setDataQRY_KCD_STYLE1] =
        useState(emptyQRY_KCD_STYLE1);

    const [datasQRY_KCD_STYLE1_COLOR, setDatasQRY_KCD_STYLE1_COLOR] = useState(
        [],
    );
    const [dataQRY_KCD_STYLE1_COLOR, setDataQRY_KCD_STYLE1_COLOR] = useState(
        {},
    );

    const onDropdownChangeQRY_KCD_STYLE1_COLOR = (e, name) => {
        let val = (e.value && e.value.PROD_CD) || "";

        let _dataQRY_KCD_STYLE1 = { ...dataQRY_KCD_STYLE1 };

        let tTypeVal = _dataQRY_KCD_STYLE1[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KCD_STYLE1[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KCD_STYLE1[`${name}`] = parseInt(val);
        }

        setDataQRY_KCD_STYLE1(_dataQRY_KCD_STYLE1);
        setDataQRY_KCD_STYLE1_COLOR(e.value);

        var tInObj = { ...dataQRY_KCD_STYLE1 };
        tInObj.PROD_CD = e.value.PROD_CD;

        search_SRC_PROD_MEM(tInObj);
    };

    const onInputChangeQRY_KCD_STYLE1_STYLE_NAME = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KCD_STYLE1 = { ...dataQRY_KCD_STYLE1 };

        let tTypeVal = _dataQRY_KCD_STYLE1[`${name}`];
        if (typeof tTypeVal === "string") _dataQRY_KCD_STYLE1[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KCD_STYLE1[`${name}`] = parseInt(val);

        setDataQRY_KCD_STYLE1(_dataQRY_KCD_STYLE1);
    };

    const onInputChangeQRY_KCD_STYLE1_STYLE_CD = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KCD_STYLE1 = { ...dataQRY_KCD_STYLE1 };

        let tTypeVal = _dataQRY_KCD_STYLE1[`${name}`];
        if (typeof tTypeVal === "string") _dataQRY_KCD_STYLE1[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KCD_STYLE1[`${name}`] = parseInt(val);

        setDataQRY_KCD_STYLE1(_dataQRY_KCD_STYLE1);
    };

    /**TABLE KCD_STYLE */
    // DEFINE DATAGRID : TBL_KCD_STYLE
    const [datasTBL_KCD_STYLE, setDatasTBL_KCD_STYLE] = useState([]);
    const dt_TBL_KCD_STYLE = useRef(null);
    const [dataTBL_KCD_STYLE, setDataTBL_KCD_STYLE] =
        useState(emptyTBL_KCD_STYLE);
    const [selectedTBL_KCD_STYLE, setSelectedTBL_KCD_STYLE] = useState([]);
    const [flagSelectModeTBL_KCD_STYLE, setFlagSelectModeTBL_KCD_STYLE] =
        useState(false);

    // DATAGRID CODE : TBL_KCD_STYLE

    /**TABLE KSV_PROD_MEM */
    // DEFINE DATAGRID : TBL_KSV_PROD_MEM
    const [datasTBL_KSV_PROD_MEM, setDatasTBL_KSV_PROD_MEM] = useState([]);
    const dt_TBL_KSV_PROD_MEM = useRef(null);
    const [dataTBL_KSV_PROD_MEM, setDataTBL_KSV_PROD_MEM] = useState(
        emptyTBL_KSV_PROD_MEM,
    );
    const [selectedTBL_KSV_PROD_MEM, setSelectedTBL_KSV_PROD_MEM] = useState(
        [],
    );
    const [flagSelectModeTBL_KSV_PROD_MEM, setFlagSelectModeTBL_KSV_PROD_MEM] =
        useState(false);

    // DATAGRID CODE : TBL_KSV_PROD_MEM

    const onRowClick1TBL_KSV_PROD_MEM = (argData0) => {
        var argData = {};

        if (typeof argData0.length !== "undefined") {
            argData = argData0[0];
        } else {
            argData = argData0;
        }

        let argTBL_KSV_PROD_MEM = argData;

        setDataTBL_KSV_PROD_MEM(argTBL_KSV_PROD_MEM);
    };

    const onRowClickTBL_KSV_PROD_MEM = (event) => {
        let argTBL_KSV_PROD_MEM = event.data;

        if (flagSelectModeTBL_KSV_PROD_MEM) {
            setFlagSelectModeTBL_KSV_PROD_MEM(false);
            return;
        }

        setSelectedTBL_KSV_PROD_MEM([argTBL_KSV_PROD_MEM]);
        onRowClick1TBL_KSV_PROD_MEM(argTBL_KSV_PROD_MEM);

        // Service : NawooAll:mgrQueryTBL_KSV_PROD_MEM
    };

    /**TABLE KSV_PROD_MEM1 */

    // DEFINE DATAGRID : TBL_KSV_PROD_MEM1
    const [datasTBL_KSV_PROD_MEM1, setDatasTBL_KSV_PROD_MEM1] = useState([]);
    const dt_TBL_KSV_PROD_MEM1 = useRef(null);
    const [dataTBL_KSV_PROD_MEM1, setDataTBL_KSV_PROD_MEM1] = useState(
        emptyTBL_KSV_PROD_MEM1,
    );
    const [selectedTBL_KSV_PROD_MEM1, setSelectedTBL_KSV_PROD_MEM1] = useState(
        [],
    );
    const [
        flagSelectModeTBL_KSV_PROD_MEM1,
        setFlagSelectModeTBL_KSV_PROD_MEM1,
    ] = useState(false);

    const getRowsInTableOrder = (rows, selectedRows, dataKey = "SEQ") => {
        const selectedKeySet = new Set(
            (selectedRows || []).map((row) => row?.[dataKey]),
        );

        return (rows || []).filter((row) => selectedKeySet.has(row?.[dataKey]));
    };

    // DATAGRID CODE : TBL_KSV_PROD_MEM1
    const addMaterial = () => {
        if (
            !selectedTBL_KSV_PROD_MEM ||
            selectedTBL_KSV_PROD_MEM.length === 0
        ) {
            alert("첫 번째 테이블에서 추가할 항목을 선택하세요.<br><br>Select the items you want to add from the first table.");
            return;
        }

        const isTable2Empty = datasTBL_KSV_PROD_MEM1.length === 0;
        let insertIndex = 0;

        if (!isTable2Empty) {
            if (
                !selectedTBL_KSV_PROD_MEM1 ||
                selectedTBL_KSV_PROD_MEM1.length === 0
            ) {
                alert("두 번째 테이블에서 삽입할 위치를 선택하세요.<br><br>Select where you want to insert in the second table.");
                return;
            }

            const insertAfterSEQ = selectedTBL_KSV_PROD_MEM1[0].SEQ;
            insertIndex = datasTBL_KSV_PROD_MEM1.findIndex(
                (item) => item.SEQ === insertAfterSEQ,
            );
            if (insertIndex === -1) {
                alert("선택된 행의 SEQ를 찾을 수 없습니다.<br><br>The SEQ for the selected row could not be found.");
                return;
            }
            insertIndex += 1; // 다음 위치에 삽입
        }

        const orderedSelectedItems = getRowsInTableOrder(
            datasTBL_KSV_PROD_MEM,
            selectedTBL_KSV_PROD_MEM,
        );

        const newItems = orderedSelectedItems.filter((newItem) => {
            const isDuplicate = datasTBL_KSV_PROD_MEM1.some(
                (existingItem) =>
                    existingItem.MATL_CD === newItem.MATL_CD &&
                    existingItem.MATL_NAME === newItem.MATL_NAME &&
                    existingItem.SPEC === newItem.SPEC &&
                    existingItem.COLOR === newItem.COLOR &&
                    existingItem.USE_SIZE === newItem.USE_SIZE &&
                    existingItem.REMARK === newItem.REMARK,
            );
            if (isDuplicate) {
                console.log("중복됨:", newItem);
            }
            return !isDuplicate;
        });

        if (newItems.length === 0) {
            alert("추가할 새로운 항목이 없습니다 (모두 중복).<br><br>There are no new items to add (all duplicates).");
            return;
        }

        const updated = [...datasTBL_KSV_PROD_MEM1];
        updated.splice(insertIndex, 0, ...newItems); // index 위치에 삽입

        const renumbered = updated.map((item, idx) => ({
            ...item,
            SEQ: String(idx + 1),
        }));

        setDatasTBL_KSV_PROD_MEM1(renumbered);
    };

    const delMaterial = () => {
        var _tDelObj = [...selectedTBL_KSV_PROD_MEM1];
        var _tSrcObj = [...datasTBL_KSV_PROD_MEM1];
        var _tNew = _tSrcObj.filter((col, i) => {
            var _tNewOne = col;
            var _tFlags = _tDelObj.filter((col, i) => {
                if (col.SEQ === _tNewOne.SEQ) return col;
            });
            if (_tFlags.length <= 0) return _tNewOne;
        });

        var tArray1 = [];
        _tNew.forEach((col, i) => {
            var tObj = { ...col };
            tObj.SEQ = String(i + 1);
            tArray1.push(tObj);
        });
        setDatasTBL_KSV_PROD_MEM1(tArray1);
        setSelectedTBL_KSV_PROD_MEM1([]);
    };

    const saveMaterial = () => {
        if (!dataQRY_KCD_STYLE1_COLOR?.PROD_CD) {
            toast.current.show({
                severity: "warn",
                summary: "Save",
                detail: "Select color first.",
                life: 2500,
            });
            return;
        }

        const saveKey = {
            PROD_CD: dataQRY_KCD_STYLE1_COLOR.PROD_CD,
        };

        console.log(datasTBL_KSV_PROD_MEM1);
        let _insertObj = datasTBL_KSV_PROD_MEM1.map((col, i) => {
            var tObj = { ...col };
            if (typeof tObj.__typename !== "undefined") delete tObj.__typename;
            if (typeof tObj.id !== "undefined") delete tObj.id;
            tObj.PROD_CD = saveKey.PROD_CD;
            return tObj;
        });

        setDatasTBL_KSV_PROD_MEM1([]);

        console.log(_insertObj);

        serviceS030302_COPY_STYLE
            .mgrInsertEDT_KSV_PROD_MEM(_insertObj, saveKey)
            .then((data) => {
                if (typeof data.graphQLErrors === "undefined") {
                    console.log(
                        "ServiceS030302_COPY_STYLE.mgrInsertEDT_KSV_PROD_MEM() call => " +
                            data.length,
                    );
                    toast.current.show({
                        severity: "success",
                        summary: "Insert Prod Mem",
                        detail: `insert lengh:${data.length}`,
                        life: 3000,
                    });
                    //emitParentCenterRefreshEvent("COPY_STYLE_SAVE");
                    search_SRC_PROD_MEM();
                    // Search
                } else {
                    var tStr = data.graphQLErrors[0].message;
                    console.log(
                        "ServiceNawooAll.mgrInsertS0303_MRP_RECORD_STYLE( error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                    toast.current.show({
                        severity: "error",
                        summary: "Query Error",
                        detail: tStr,
                        life: 3000,
                    });
                }
            });
    };

    const processExit = () => {
        emitParentCenterRefreshEvent("EXIT");

        // Let parent activate the target tab (S0303/S0306) first, then close this tab.
        setTimeout(() => {
            window.parent.postMessage(
                {
                    type: "closeTab",
                    url: window.location.href,
                },
                "*",
            );
        }, 220);

        if (window.parent === window) {
            window.history.back();
        }
    };

    const onRowClick1TBL_KSV_PROD_MEM1 = (argData0) => {
        var argData = {};

        if (typeof argData0.length !== "undefined") {
            argData = argData0[0];
        } else {
            argData = argData0;
        }

        let argTBL_KSV_PROD_MEM1 = argData;

        setDataTBL_KSV_PROD_MEM1(argTBL_KSV_PROD_MEM1);
    };

    const onRowClickTBL_KSV_PROD_MEM1 = (event) => {
        let argTBL_KSV_PROD_MEM1 = event.data;
        if (flagSelectModeTBL_KSV_PROD_MEM1) return;

        // Service : NawooAll:mgrQueryTBL_KSV_PROD_MEM1
    };

    /**TABLE KSV_PROD_MST */
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

    /**TABLE KSV_ORDER_MST */
    // DEFINE DATAGRID : TBL_KSV_ORDER_MST
    const [datasTBL_KSV_ORDER_MST, setDatasTBL_KSV_ORDER_MST] = useState([]);
    const [datasTBL_KSV_ORDER_MST_SAVE, setDatasTBL_KSV_ORDER_MST_SAVE] =
        useState([]);
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

        setDatasTBL_KSV_PROD_MEM([]);
        setSelectedTBL_KSV_PROD_MEM([]);

        var argObj = {};
        argObj.ORDER_CD = argData.ORDER_CD;
        argObj.PROD_CD = argData.PROD_CD;

        serviceS030302_COPY_STYLE
            .mgrQueryTBL_KSV_ORDER_MRP(argObj)
            .then((data) => {
                if (typeof data.graphQLErrors === "undefined") {
                    console.log(
                        "ServiceMgrKCD_BUYER.mgr1KcdStyle call => " +
                            data.length,
                    );
                    setDatasTBL_KSV_PROD_MEM(
                        data.map((col, i) => {
                            return {
                                ...col,
                                id: i + 1,
                            };
                        }),
                    );
                    console.log(data);
                } else {
                    console.log(
                        "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });
    };

    const onRowClickTBL_KSV_ORDER_MST = (event) => {
        let argTBL_KSV_ORDER_MST = event.data;
        if (flagSelectModeTBL_KSV_ORDER_MST) return;

        // Service : NawooAll:mgrQueryTBL_KSV_ORDER_MST
    };

    useEffect(() => {
        let tOrderCd = "";
        let tOrderMrpSeq = "";
        let tStyleCd = "";
        let tProdCd = "";
        let tSource = "S0306";

        var tUrls = window.location.href.split("?");
        if (tUrls.length <= 1) {
        } else {
            var tParams1 = tUrls[1].split("&");
            tParams1.forEach((col, i) => {
                var tCols = col.split("=");
                var tKey = String(tCols[0] || "").toUpperCase();
                var tValue = decodeURIComponent(tCols[1] || "");

                if (tKey.includes("STYLE_CD")) {
                    tOrderCd = tValue;
                }

                if (tKey.includes("ORDER_CD")) {
                    tOrderCd = tValue;
                }

                if (tKey.includes("ORDER_MRP_SEQ")) {
                    tOrderMrpSeq = tValue;
                }

                if (tKey.includes("PROD_CD")) {
                    tProdCd = tValue;
                }

                if (tKey.includes("SOURCE")) {
                    tSource = tValue;
                }
            });
        }

        setSaveOrderCd(tOrderCd);
        setSaveOrderMrpSeq(tOrderMrpSeq);
        setSaveStyleCd(tStyleCd || tOrderCd);
        setSaveProdCd(tProdCd);
        setParentSource(normalizeSource(tSource));

        if (tOrderCd !== "") {
            tStyleCd = tOrderCd;
            console.log("S0303 Order Cd :(param)" + tOrderCd);
        } else {
            tOrderCd = localStorage.getItem("AF_S0303_STYLE_CD");
            console.log("S0303 Order Cd: (localstorage)" + tOrderCd);
            if (tOrderCd === null) tOrderCd = "ST23-0734";
        }

        search_ORDER_MST(tStyleCd);
        //  searchTBL_KCD_STYLE();

        var argObj1 = {};
        // argObj1.STYLE_NAME = 'ST23-0734';
        argObj1.STYLE_NAME = tOrderCd;

        serviceS030302_COPY_STYLE
            .mgrQueryTBL_KCD_STYLE_SRC(argObj1)
            .then((data) => {
                if (typeof data.graphQLErrors === "undefined") {
                    console.log(
                        "ServiceMgrKCD_BUYER.mgr1KcdStyle call => " +
                            data.PROD_MST.length,
                    );

                    var tObj = {};
                    tObj.STYLE_CD = data.STYLE.STYLE_CD;

                    var _tObj1 = { ...dataQRY_KCD_STYLE1 };
                    _tObj1.STYLE_NAME = data.STYLE.STYLE_NAME;
                    _tObj1.STYLE_CD = data.STYLE.STYLE_CD;
                    setDataQRY_KCD_STYLE1(_tObj1);

                    if (data.PROD_MST.length > 0) {
                        const tMatchedProd =
                            data.PROD_MST.find(
                                (row) => row.PROD_CD === tProdCd,
                            ) || data.PROD_MST[0];

                        setDatasQRY_KCD_STYLE1_COLOR(data.PROD_MST);
                        setDataQRY_KCD_STYLE1_COLOR(tMatchedProd);

                        if (tMatchedProd?.PROD_CD) {
                            setSaveProdCd(tMatchedProd.PROD_CD);
                        }

                        tObj.PROD_CD = tMatchedProd.PROD_CD;
                        serviceS030302_COPY_STYLE
                            .mgrQueryTBL_KSV_PROD_MEM(tObj)
                            .then((data) => {
                                if (typeof data.graphQLErrors === "undefined") {
                                    console.log(
                                        "mgrQueryTBL_KSV_PROD_MEM call => " +
                                            data.length,
                                    );
                                    setDatasTBL_KSV_PROD_MEM1(data);
                                } else {
                                    console.log(
                                        "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                                            JSON.stringify(data.graphQLErrors),
                                    );
                                }
                            });
                    }
                } else {
                    console.log(
                        "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });
    }, []);

    // Support Area

    const renderOrderDropdownLabel = (option) => {
        if (!option) return "";

        const orderCd = String(option.ORDER_CD || "");
        const styleName = String(option.STYLE_NAME || "");

        return (
            <span>
                <span>{orderCd}</span>
                {styleName !== "" && (
                    <span style={{ color: "#1f8a3b", marginLeft: "0.35rem" }}>
                        {styleName}
                    </span>
                )}
            </span>
        );
    };

    const orderDropdownItemTemplate = (option) => {
        return renderOrderDropdownLabel(option);
    };

    const orderDropdownValueTemplate = (option, props) => {
        const selectedOption =
            typeof option === "string"
                ? datasQRY_KCD_STYLE_ORDER_CD.find(
                      (row) => row.ORDER_CD === option,
                  )
                : option;

        if (!selectedOption) {
            return <span>{props.placeholder || ""}</span>;
        }

        return renderOrderDropdownLabel(selectedOption);
    };

    return (
        <div className="af-div-main S030303_MRP_BY_SEARCH">
            <div style={{ width: "123rem" }}>
                <div
                    className="af-div-first"
                    style={{ width: "123rem", height: "3rem" }}
                >
                    <span className="af-span-3-0" style={{ width: "31rem" }}>
                        <p className="af-span-p" style={{ width: "7rem" }}>Style</p>
                        <div className="af-span-div" style={{ width: "23rem" }}>
                            <InputText
                                style={{ width: "23rem" }}
                                id="id_STYLE_NAME"
                                value={dataQRY_KCD_STYLE.STYLE_NAME}
                                onChange={(e) =>
                                    onInputChangeQRY_KCD_STYLE_STYLE_NAME(
                                        e,
                                        "STYLE_NAME",
                                    )
                                }
                            />
                        </div>
                    </span>
                    <span
                        className="af-span-3-0"
                        style={{ width: "26rem" }}
                    >
                        <p className="af-span-p" style={{ width: "4rem" }}>Order</p>
                        <div
                            className="af-span-div"
                            style={{ width: "11rem" }}
                        >
                            <Dropdown
                                style={{ width: "10rem" }}
                                value={dataQRY_KCD_STYLE_ORDER_CD}
                                onChange={(e) =>
                                    onDropdownChangeQRY_KCD_STYLE_ORDER_CD(
                                        e,
                                        "ORDER_CD",
                                    )
                                }
                                options={datasQRY_KCD_STYLE_ORDER_CD}
                                optionLabel="ORDER_CD"
                                optionValue="ORDER_CD"
                                itemTemplate={orderDropdownItemTemplate}
                                valueTemplate={orderDropdownValueTemplate}
                                placeholder=""
                                editable
                            ></Dropdown>
                        </div>
                    </span>
                    <span className="af-span-3-0" style={{ width: "13rem" }}>
                        <div
                            className="af-span-div-btn"
                            style={{ width: "12rem" }}
                        >
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
                                style={{ width: "12rem" }}
                                className="p-button-text"
                                onClick={search_ORDER_MST_BY_STYLE}
                            />
                        </div>
                    </span>
                </div>
                
            </div>
            <div style={{ width: "100%", display: "flex", flexDirection: "row", gap: "0.5rem", }}>
                <div
                    className="af-div-first"
                    style={{ width: "50rem", height: "20rem" }}
                >
                    <div
                        className="af-div-second"
                        style={{ width: "50rem", height: "21.3rem", marginLeft: "0.5rem" }}
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
                            dataKey="id"
                            className="datatable-responsive"
                            virtualScrollerOptions={{ itemSize: 20 }}
                            emptyMessage=" "
                            responsiveLayout="scroll"
                            scrollable
                            scrollHeight="216px"
                        >
                            <AFColumn forceWidth field="STYLE_NAME" headerClassName="t-header" header="Style" style={{ width: "18rem", flexBasis: "auto" }} ></AFColumn>
                            <AFColumn forceWidth field="ORDER_CD" headerClassName="t-header" header="Order#" style={{ width: "5rem", flexBasis: "auto" }} ></AFColumn>
                            <AFColumn forceWidth field="COLOR" headerClassName="t-header" header="Color" style={{ width: "5rem",flexBasis: "auto" }} ></AFColumn>
                            <AFColumn forceWidth field="PROD_CD" headerClassName="t-header" header="Prod#" style={{ width: "5rem", flexBasis: "auto" }} ></AFColumn>
                        </AFDataTable>
                    </div>
                </div>
                <div
                    className="af-div-second"
                    style={{ width: "calc(100% - 50rem)", height: "218px", marginRight: "0.5rem", marginLeft: "0.5rem" }}
                >
                    <AFDataTable preventUnrelatedRerender
                        ref={dt_TBL_KSV_PROD_MEM}
                        size="small"
                        value={datasTBL_KSV_PROD_MEM}
                        tableStyle={{ tableLayout: "fixed" }}
                        resizableColumns
                        columnResizeMode="expand"
                        metaKeySelection={false}
                        showGridlines
                        selectionMode="checkbox"
                        selection={selectedTBL_KSV_PROD_MEM}
                        onSelectionChange={(e) => {
                            const orderedSelection = getRowsInTableOrder(
                                datasTBL_KSV_PROD_MEM,
                                e.value,
                            );
                            setFlagSelectModeTBL_KSV_PROD_MEM(true);
                            setSelectedTBL_KSV_PROD_MEM(orderedSelection);
                            console.log(
                                "selected length:" +
                                    selectedTBL_KSV_PROD_MEM.length,
                            );
                            onRowClick1TBL_KSV_PROD_MEM(orderedSelection);
                        }}
                        onRowClick={onRowClickTBL_KSV_PROD_MEM}
                        dataKey="SEQ"
                        className="datatable-responsive"
                        virtualScrollerOptions={{ itemSize: 20 }}
                        emptyMessage=" "
                        //header={headerTBL_KSV_PROD_MEM}
                        responsiveLayout="scroll"
                        scrollable
                        scrollHeight="259px"
                    >
                        <AFColumn selectionMode="multiple" field="__checkbox__" reorderable={false} headerClassName="t-header" headerStyle={{ width: "3rem" }} ></AFColumn>
                        {/*<AFColumn field="MATL_TYPE2" headerClassName='t-header' header="Type2" style={{ width: '10rem',height:'1.8rem',flexBasis:'auto' }}></AFColumn>*/}
                        <AFColumn forceWidth field="MATL_CD" headerClassName="t-header" header="Matl#" style={{ width: "6rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                        <AFColumn forceWidth field="MATL_NAME" headerClassName="t-header" header="Matl Name" style={{ width: "20rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                        <AFColumn field="COLOR" headerClassName="t-header" header="Color" style={{ width: "12rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                        <AFColumn field="SPEC" headerClassName="t-header" header="Spec" style={{ width: "15rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                        <AFColumn field="MATL_PRICE" headerClassName="t-header" header="Price" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                        <AFColumn field="CURR_CD" headerClassName="t-header" header="Curr" style={{ width: "8rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                        <AFColumn field="UNIT" headerClassName="t-header" header="Unit" style={{ width: "5rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                        <AFColumn field="ADD_LOSS" headerClassName="t-header" header="Add Loss" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                        <AFColumn field="USE_SIZE" headerClassName="t-header" header="Size" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                        <AFColumn forceWidth field="REMARK" headerClassName="t-header" header="Remark" style={{ width: "20rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                        {/*<AFColumn field="BVT_REMARK" headerClassName='t-header' header="Bvt Remark" style={{ width: '15rem' ,height:'1.8rem',flexBasis:'auto'}}></AFColumn>*/}
                        <AFColumn field="COUNTRY" headerClassName="t-header" header="Country" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                        <AFColumn field="STD_NET" headerClassName="t-header" header="Net(s)" style={{ width: "7rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                        <AFColumn field="STD_LOSS" headerClassName="t-header" header="Loss(S)" style={{ width: "7rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                        {/*<AFColumn field="STD_GROSS" headerClassName='t-header' header="Std Gross" style={{ width: '10rem',height:'1.8rem',flexBasis:'auto' }}></AFColumn>*/}
                        <AFColumn field="NET" headerClassName="t-header" header="Net" style={{ width: "5rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                        <AFColumn field="LOSS" headerClassName="t-header" header="Loss" style={{ width: "5rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                        <AFColumn field="GROSS" headerClassName="t-header" header="Gross" style={{ width: "6rem", height: "1.8rem", flexBasis: "auto", }} body={(rowData) => serviceLib.numWithCommas(rowData.GROSS, 2) } ></AFColumn>
                        <AFColumn field="VENDOR_NAME" headerClassName="t-header" header="Vendor" style={{ width: "10rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                        {/*<AFColumn field="VENDOR_CD" headerClassName='t-header' header="Vendor" style={{ width: '5rem',height:'1.8rem',flexBasis:'auto' }}></AFColumn>*/}
                        <AFColumn field="SEQ" headerClassName="t-header" header="Seq" style={{ width: "4rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    </AFDataTable>
                </div>
            </div>
                
            <div style={{ width: "100%" }}>
                <div
                    className="af-div-first"
                    style={{ width: "123rem", height: "3rem" }}
                >
                    <span className="af-span-3-0" style={{ width: "23rem" }}>
                        <p className="af-span-p" style={{ width: "7rem" }}>Style</p>
                        <div className="af-span-div" style={{ width: "15rem" }}>
                            <InputText
                                disabled
                                style={{ width: "15rem" }}
                                id="id_STYLE_NAME"
                                value={dataQRY_KCD_STYLE1.STYLE_NAME}
                                onChange={(e) =>
                                    onInputChangeQRY_KCD_STYLE1_STYLE_NAME(
                                        e,
                                        "STYLE_NAME",
                                    )
                                }
                            />
                        </div>
                    </span>
                    <span className="af-span-3-0" style={{ width: "11rem" }}>
                        <div className="af-span-div" style={{ width: "10rem" }}>
                            <InputText
                                disabled
                                style={{ width: "10rem" }}
                                id="id_STYLE_CD"
                                value={dataQRY_KCD_STYLE1.STYLE_CD}
                                onChange={(e) =>
                                    onInputChangeQRY_KCD_STYLE1_STYLE_CD(
                                        e,
                                        "STYLE_CD",
                                    )
                                }
                            />
                        </div>
                    </span>
                    <span className="af-span-3-0" style={{ width: "18rem" }}>
                        <p className="af-span-p" style={{ width: "7rem" }}>Style</p>
                        <div className="af-span-div" style={{ width: "10rem" }}>
                            <Dropdown
                                style={{ width: "10rem" }}
                                id="id_COLOR"
                                value={dataQRY_KCD_STYLE1_COLOR}
                                onChange={(e) =>
                                    onDropdownChangeQRY_KCD_STYLE1_COLOR(
                                        e,
                                        "COLOR",
                                    )
                                }
                                options={datasQRY_KCD_STYLE1_COLOR}
                                optionLabel="COLOR"
                                placeholder=""
                                editable
                            ></Dropdown>
                        </div>
                    </span>

                    <span className="af-span-3-0" style={{ width: "13rem" }}>
                        <div
                            className="af-span-div-btn"
                            style={{ width: "12rem" }}
                        >
                            <Button
                                label="Add"
                                style={{ width: "12rem" }}
                                className="p-button-text"
                                onClick={addMaterial}
                            />
                        </div>
                    </span>
                    <span className="af-span-3-0" style={{ width: "13rem" }}>
                        <div
                            className="af-span-div-btn"
                            style={{ width: "12rem" }}
                        >
                            <Button
                                label="Delete"
                                style={{ width: "12rem" }}
                                className="p-button-text"
                                onClick={delMaterial}
                            />
                        </div>
                    </span>

                    <span className="af-span-3-0" style={{ width: "13rem" }}>
                        <div
                            className="af-span-div-btn"
                            style={{ width: "12rem" }}
                        >
                            <Button
                                label="Save"
                                style={{ width: "12rem" }}
                                className="p-button-text"
                                onClick={saveMaterial}
                            />
                        </div>
                    </span>
                    <span className="af-span-3-0" style={{ width: "13rem" }}>
                        <div
                            className="af-span-div-btn"
                            style={{ width: "12rem" }}
                        >
                            <Button
                                label="Exit"
                                style={{ width: "12rem" }}
                                className="p-button-text"
                                onClick={processExit}
                            />
                        </div>
                    </span>
                </div>
            </div>
            <div
                style={{
                    width: "100%",
                    height: "calc(100vh - 220px - 7rem)",
                    padding: "5px",
                    paddingTop: "30px",
                }}
            >
                <AFDataTable preventUnrelatedRerender
                    ref={dt_TBL_KSV_PROD_MEM1}
                    size="small"
                    value={datasTBL_KSV_PROD_MEM1}
                    tableStyle={{ tableLayout: "fixed" }}
                    resizableColumns
                    columnResizeMode="expand"
                    metaKeySelection={false}
                    showGridlines
                    selectionMode="checkbox"
                    selection={selectedTBL_KSV_PROD_MEM1}
                    onSelectionChange={(e) => {
                        setFlagSelectModeTBL_KSV_PROD_MEM1(true);
                        setSelectedTBL_KSV_PROD_MEM1(e.value);
                        console.log(
                            "selected length:" +
                                selectedTBL_KSV_PROD_MEM1.length,
                        );
                        onRowClick1TBL_KSV_PROD_MEM1(e.value);
                    }}
                    onRowClick={onRowClickTBL_KSV_PROD_MEM1}
                    dataKey="SEQ"
                    className="datatable-responsive"
                    virtualScrollerOptions={{ itemSize: 20 }}
                    emptyMessage=" "
                    //header={headerTBL_KSV_PROD_MEM1}
                    responsiveLayout="scroll"
                    scrollable
                >
                    <AFColumn selectionMode="multiple" field="__checkbox__" reorderable={false} headerClassName="t-header" headerStyle={{ width: "3rem" }} ></AFColumn>
                    {/*<AFColumn field="MATL_TYPE2" headerClassName='t-header' header="Type2" style={{ width: '10rem',height:'1.8rem',flexBasis:'auto' }}></AFColumn>*/}
                    <AFColumn forceWidth field="MATL_CD" headerClassName="t-header" header="Matl#" style={{ width: "6rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn forceWidth field="MATL_NAME" headerClassName="t-header" header="Matl Name" style={{ width: "22rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="COLOR" headerClassName="t-header" header="Color" style={{ width: "14rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="SPEC" headerClassName="t-header" header="Spec" style={{ width: "15rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="MATL_PRICE" headerClassName="t-header" header="Price" style={{ width: "8rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="CURR_CD" headerClassName="t-header" header="Curr" style={{ width: "7rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="UNIT" headerClassName="t-header" header="Unit" style={{ width: "5rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="ADD_LOSS" headerClassName="t-header" header="Add Loss" style={{ width: "8rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="USE_SIZE" headerClassName="t-header" header="Size" style={{ width: "12rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn forceWidth field="REMARK" headerClassName="t-header" header="Remark" style={{ width: "22rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    {/*<AFColumn field="BVT_REMARK" headerClassName='t-header' header="Bvt Remark" style={{ width: '12rem',height:'1.8rem',flexBasis:'auto' }}></AFColumn>*/}
                    <AFColumn field="COUNTRY" headerClassName="t-header" header="Country" style={{ width: "8rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="STD_NET" headerClassName="t-header" header="Net(S)" style={{ width: "6rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="STD_LOSS" headerClassName="t-header" header="Loss(S)" style={{ width: "7rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    {/*<AFColumn field="STD_GROSS" headerClassName='t-header' header="Gross(S)" style={{ width: '7rem',height:'1.8rem',flexBasis:'auto' }} ></AFColumn>*/}
                    <AFColumn field="NET" headerClassName="t-header" header="Net" style={{ width: "5rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="LOSS" headerClassName="t-header" header="Loss" style={{ width: "5rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    <AFColumn field="GROSS" headerClassName="t-header" header="Gross" style={{ width: "6rem", height: "1.8rem", flexBasis: "auto", }} body={(rowData) => serviceLib.numWithCommas(rowData.GROSS, 2) } ></AFColumn>
                    <AFColumn field="VENDOR_NAME" headerClassName="t-header" header="Vendor" style={{ width: "8rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                    {/*<AFColumn field="VENDOR_CD" headerClassName='t-header' header="Vendor" style={{ width: '8rem',height:'1.8rem',flexBasis:'auto' }}></AFColumn>*/}
                    <AFColumn field="SEQ" headerClassName="t-header" header="Seq" style={{ width: "5rem", height: "1.8rem", flexBasis: "auto", }} ></AFColumn>
                </AFDataTable>
            </div>
            <Toast ref={toast} />
        </div>
    );
};

const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(S030303_MRP_BY_SEARCH, comparisonFn);
