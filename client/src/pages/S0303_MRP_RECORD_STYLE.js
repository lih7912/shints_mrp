/* eslint-disable */
import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
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
import { ServiceS0303_MRP_RECORD_STYLE } from "../service/service_biz/ServiceS0303_MRP_RECORD_STYLE";
import { ServiceS030304_ADD_SEQ_MRP_BY_ORDER } from "../service/service_biz/ServiceS030304_ADD_SEQ_MRP_BY_ORDER";
import { ServiceS0301_MATL_RECORD } from "../service/service_biz/ServiceS0301_MATL_RECORD";
import "./page_common.scss";

const emptyKCD_CODE = {
    id: 0,
    CD_GROUP: "",
    CD_CODE: "",
    CD_NAME: "",
    CD_FLAG: "",
};

const emptyQRY_KCD_MATL_MST = {
    MATL_NAME: "",
    COLOR: "",
    MATL_CD: "",
    SPEC: "",
    VENDOR_NAME: "",
};

const emptyQRY_KCD_STYLE2 = {
    VENDOR_CD1: "",
    VENDOR_CD2: "",
};

const emptyQRY_KCD_STYLE = {
    STYLE_CD: "",
    BUYER_CD: "",
};

const emptyQRY_KSV_PROD_MEM = {
    MATL_CD: "",
};

const emptyTBL_KCD_MATL_MST1 = {
    id: 0,
    MATL_NAME: "",
    COLOR: "",
    SPEC: "",
    MATL_PRICE: "",
    CURR_CD: "",
    UNIT: "",
    VENDOR_NAME: "",
    VENDOR_CD: "",
    MATL_CD: "",
    STATUS_CD: "",
    STATUS_NAME: "",
};

const emptyTBL_KCD_MATL_MST = {
    id: 0,
    MATL_NAME: "",
    COLOR: "",
    SPEC: "",
    MATL_PRICE: "",
    CURR_CD: "",
    UNIT: "",
    VENDOR_NAME: "",
    VENDOR_CD: "",
    MATL_CD: "",
    STATUS_CD: "",
    STATUS_NAME: "",
};

const emptyTBL_KCD_STYLE = {
    id: 0,
    STYLE_NAME: "",
    STYLE_CD: "",
};

const emptyTBL_KSV_PROD_MEM1 = {
    MRP_CHECK: "",
    MATL_TYPE2: "",
    MATL_NAME: "",
    MATL_CD: "",
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
    NET: "",
    LOSS: "",
    GROSS: "",
    VENDOR_NAME: "",
    VENDOR_CD: "",
    STD_GROSS: "",
    SEQ: "",
};

const emptyTBL_KSV_PROD_MEM = {
    MRP_CHECK: "",
    MATL_TYPE2: "",
    MATL_NAME: "",
    MATL_CD: "",
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
    NET: "",
    LOSS: "",
    GROSS: "",
    VENDOR_NAME: "",
    VENDOR_CD: "",
    STD_GROSS: "",
    SEQ: "",
};

const emptyTBL_KSV_PROD_MST = {
    id: 0,
};

const emptyEDT_KSV_PROD_MEM_USAGE = {
    USAGE: "",
    NET_S: "",
    NET: "",
    LOSS: "",
};

const emptyEDT_KSV_PROD_MEM = {
    STD_FLAG: "",
    ALL_FLAG: "",
    ALL_COLOR_FLAG: "",
    NET: "",
    LOSS: "",
    USE_SIZE: "",
    REMARK: "",
};

const S0303_MRP_RECORD_STYLE = () => {
    const serviceLibRef = useRef(null);
    if (!serviceLibRef.current) {
        serviceLibRef.current = new ServiceLib();
        serviceLibRef.current.loginConfirm();
    }
    const serviceLib = serviceLibRef.current;
    const serviceS0303_MRP_RECORD_STYLERef = useRef(null);
    if (!serviceS0303_MRP_RECORD_STYLERef.current) serviceS0303_MRP_RECORD_STYLERef.current = new ServiceS0303_MRP_RECORD_STYLE();
    const serviceS0303_MRP_RECORD_STYLE = serviceS0303_MRP_RECORD_STYLERef.current;
    const serviceS030304_ADD_SEQ_MRP_BY_ORDER =
        new ServiceS030304_ADD_SEQ_MRP_BY_ORDER();
    const serviceS0301_MATL_RECORDRef = useRef(null);
    if (!serviceS0301_MATL_RECORDRef.current) serviceS0301_MATL_RECORDRef.current = new ServiceS0301_MATL_RECORD();
    const serviceS0301_MATL_RECORD = serviceS0301_MATL_RECORDRef.current;

    const toast = useRef(null);
    const prodMemRestoreOffsetPx = 0;
    const matlMstRestoreOffsetPx = 20;

    /* splitter 관련 */
    const [styleVal, setStyleVal] = useState({ width: "65vw" });

    const [urlIframe, setUrlIframe] = useState("");
    const [createDialog, setCreateDialog] = useState(false);
    const hideDialog = () => {
        setCreateDialog(false);
    };

    const [createDialog2, setCreateDialog2] = useState(false);

    const [saveUPDATE_SPEC, setSaveUPDATE_SPEC] = useState({});
    const popupSpecSourceRowKeyRef = useRef("");
    const patchingProdMemRef = useRef(false);
    const prodMemScrollTopRef = useRef(0);
    const shouldRestoreProdMemScrollRef = useRef(false);
    const matlMstScrollTopRef = useRef(0);
    const matlMstScrollFirstIndexRef = useRef(0);
    const matlMstScrollOffsetInRowRef = useRef(0);
    const matlMstScrollAnchorMatlCdRef = useRef("");
    const matlMstVisibleAnchorMatlCdRef = useRef("");
    const shouldRestoreMatlMstScrollRef = useRef(false);

    //

    const process_SEARCH_DL_KIND = () => {
        var tArray = [];
        datasTBL_KSV_PROD_MEM.forEach((col, i) => {
            var tObj = { ...col };
            if (
                dataETC_DL_KIND.CD_CODE !== "" &&
                dataETC_DL_KIND.CD_CODE !== "X"
            ) {
                if (dataETC_DL_KIND.CD_CODE === "All") {
                    if (tObj.DL_FLAG !== "") tArray.push(tObj);
                } else {
                    if (
                        tObj.DL_FLAG === dataETC_DL_KIND.CD_CODE ||
                        dataETC_DL_KIND.CD_CODE === "All"
                    )
                        tArray.push(tObj);
                }
            }
        });
        setSelectedTBL_KSV_PROD_MEM(tArray);
    };

    const process_UPDATE_DL_KIND = () => {
        if (selectedTBL_KSV_PROD_MEM.length <= 0) return;
        var tArray = [];
        var tSelArray = [];
        datasTBL_KSV_PROD_MEM.forEach((col, i) => {
            var tObj = { ...col };
            selectedTBL_KSV_PROD_MEM.forEach((col1, i1) => {
                if (col.SEQ === col1.SEQ) {
                    if (dataETC_DL_KIND.CD_CODE === "X") tObj.DL_FLAG = "";
                    else if (dataETC_DL_KIND.CD_CODE === "D")
                        tObj.DL_FLAG = "D";
                    else if (dataETC_DL_KIND.CD_CODE === "Z")
                        tObj.DL_FLAG = "Z";
                    else if (dataETC_DL_KIND.CD_CODE === "DZ")
                        tObj.DL_FLAG = "DZ";
                    tObj.S_FLAG = "1";
                    tSelArray.push(tObj);
                    console.log(dataETC_DL_KIND.CD_CODE, tObj.DL_FLAG);
                }
            });
            tArray.push(tObj);
        });
        setSelectedTBL_KSV_PROD_MEM(tSelArray);
        setDatasTBL_KSV_PROD_MEM(tArray);
    };

    const cloneArrayData = (data) =>
        JSON.parse(JSON.stringify(Array.isArray(data) ? data : data ? [data] : []));

    const withProdMemDataKeys = (rows) => {
        const tRows = Array.isArray(rows) ? rows : [];
        const tDupCounter = new Map();

        return tRows.map((row, index) => {
            const tBaseKey = [
                row?.PROD_CD || "",
                row?.SEQ || "",
                row?.MATL_CD || "",
                row?.COLOR || "",
                row?.SPEC || "",
                row?.USE_SIZE || "",
                row?.REMARK || "",
            ].join("|");

            const tDupNo = (tDupCounter.get(tBaseKey) || 0) + 1;
            tDupCounter.set(tBaseKey, tDupNo);

            return {
                ...row,
                __ROW_KEY: `${tBaseKey}|${tDupNo}|${index}`,
            };
        });
    };

    const sanitizeProdMemPayload = (row) => {
        const payload = { ...row };
        payload.COUNTRY = getCountryCode(payload.COUNTRY);
        delete payload.__typename;
        delete payload.id;
        delete payload.__ROW_KEY;
        return payload;
    };

    const process_MRP_CHECK = () => {
        if (selectedTBL_KSV_PROD_MEM.length <= 0) return;

        var tArray = [];
        datasTBL_KSV_PROD_MEM.forEach((col, i) => {
            var tObj = { ...col };
            var tCheck = 0;
            selectedTBL_KSV_PROD_MEM.forEach((col1, i1) => {
                if (parseInt(col.SEQ) === parseInt(col1.SEQ)) {
                    if (tObj.MRP_CHECK === "") {
                        tObj.MRP_CHECK = "0";
                        tObj.S_FLAG = "1";
                    } else if (tObj.MRP_CHECK === "0") {
                        tObj.MRP_CHECK = "";
                        tObj.S_FLAG = "1";
                    }
                }
            });
            tArray.push(tObj);
        });
        console.log("mrp check:" + tArray.length);
        setDatasTBL_KSV_PROD_MEM(tArray);
        setDataETC_ROW_COUNT(tArray.length);
    };

    const process_RESET = () => {
        refQRY_KCD_STYLE.current = { ...emptyQRY_KCD_STYLE };
        if (inputRefStyleCD.current) inputRefStyleCD.current.value = "";
        if (inputRefBuyerCD.current) inputRefBuyerCD.current.value = "";
        syncEDT_TEXT(emptyEDT_KSV_PROD_MEM);
        syncEDT_FLAGS(emptyEDT_KSV_PROD_MEM);
        setDataEDT_KSV_PROD_MEM(emptyEDT_KSV_PROD_MEM);

        var tArray = [];
        var tObj = {};
        tObj.BUYER_CD = "";
        tObj.BUYER_NAME = " ";
        setDatasQRY_KCD_STYLE_BUYER_CD(tArray);
        setDataQRY_KCD_STYLE_BUYER_CD(tArray[0]);

        tArray = [];
        tObj = {};
        tObj.STYLE_CD = "";
        tObj.STYLE_NAME = " ";
        // setDatasQRY_KCD_STYLE_STYLE_CD(tArray);
        // setDataQRY_KCD_STYLE_STYLE_CD(tArray[0]);
        setDataQRY_KCD_STYLE_STYLE_CD("");

        setDatasTBL_KCD_STYLE([]);
        setSelectedTBL_KCD_STYLE([]);
        setDataTBL_KCD_STYLE(emptyTBL_KCD_STYLE);
        setDatasTBL_KSV_PROD_MST([]);
        setDatasTBL_KSV_PROD_MEM([]);
    };

    const resetStdFlag = () => {
        syncEDT_TEXT({ NET: "", LOSS: "", USE_SIZE: "", REMARK: "" });
        syncEDT_FLAGS({ STD_FLAG: "0", ALL_FLAG: "0", ALL_COLOR_FLAG: "0" });
        setDataEDT_KSV_PROD_MEM({
            ...dataEDT_KSV_PROD_MEM,
            STD_FLAG: "0",
            ALL_FLAG: "0",
            ALL_COLOR_FLAG: "0",
            NET: "",
            LOSS: "",
            USE_SIZE: "",
            REMARK: "",
        });
    };

    const search_QRY_VENDOR = async (argData, argKind) => {
        return new Promise((resolve) => {
            var tObj = {};
            tObj.VENDOR_CD = argData.trim();

            if (argKind === "1") setDatasQRY_KCD_STYLE2_VENDOR_CD1([]);
            if (argKind === "2") setDatasQRY_KCD_STYLE2_VENDOR_CD2([]);

            serviceS0303_MRP_RECORD_STYLE
                .mgrQuery_QRY_VENDOR(tObj)
                .then((data) => {
                    if (typeof data.graphQLErrors === "undefined") {
                        if (data.length > 0) {
                            if (argKind === "1")
                                setDatasQRY_KCD_STYLE2_VENDOR_CD1([...data]);
                            if (argKind === "2")
                                setDatasQRY_KCD_STYLE2_VENDOR_CD2([...data]);
                            resolve(data);
                        }
                    } else {
                        // var tStr = data.graphQLErrors[0].message;
                        console.log(
                            "mgrQueryTBL_KSV_PROD_MEM()error => " +
                                JSON.stringify(data.graphQLErrors),
                        );
                    }
                });
        });
    };

    const search_QRY_NATION = async () => {
        if (datasETC_KCD_NATION.length > 0) return datasETC_KCD_NATION;

        var tObj = {};
        tObj.NAT_CD = "";

        const data = await serviceS0303_MRP_RECORD_STYLE.mgrQuery_QRY_NATION(tObj);
        if (typeof data.graphQLErrors === "undefined") {
            const dataRows = Array.isArray(data)
                ? data
                : data
                  ? [data]
                  : [];
            let dataArr = [];

            if (dataRows.length > 0) {
                dataArr = JSON.parse(JSON.stringify(dataRows));

                for (let element of dataArr) {
                    element.id = element.NAT_CD;
                    element.label = `${element.NAT_NAME} ${element.NAT_CD}`;
                    element.value = element.NAT_CD;
                }

                setDataETC_KCD_NATION(dataRows[0]);
            }

            setDatasETC_KCD_NATION(dataArr);
            return dataArr;
        }

        console.log(
            "mgrQueryTBL_KSV_PROD_MEM()error => " +
                JSON.stringify(data.graphQLErrors),
        );
        return [];
    };

    const getCountryCode = (countryValue) => {
        const rawValue = String(countryValue || "").trim();
        if (rawValue === "") return "";

        const countryRows = Array.isArray(datasETC_KCD_NATION)
            ? datasETC_KCD_NATION
            : [];

        const matchedByCode = countryRows.find(
            (country) => country.NAT_CD === rawValue,
        );
        if (matchedByCode) return matchedByCode.NAT_CD;

        const matchedByName = countryRows.find(
            (country) => country.NAT_NAME === rawValue,
        );
        if (matchedByName) return matchedByName.NAT_CD;

        const splitTokens = rawValue.split(/\s+/);
        const tailToken = splitTokens[splitTokens.length - 1] || "";
        if (/^[A-Za-z]{2}$/.test(tailToken)) {
            const matchedByTail = countryRows.find(
                (country) =>
                    String(country.NAT_CD || "").toUpperCase() ===
                    tailToken.toUpperCase(),
            );
            if (matchedByTail) return matchedByTail.NAT_CD;
            return tailToken.toUpperCase();
        }

        return rawValue;
    };

    const getCountryDisplayText = (countryValue) => {
        const countryCode = getCountryCode(countryValue);
        if (countryCode === "") return "";

        const matchedCountry = (datasETC_KCD_NATION || []).find(
            (country) => country.NAT_CD === countryCode,
        );
        if (matchedCountry) {
            return `${matchedCountry.NAT_NAME} ${matchedCountry.NAT_CD}`;
        }

        return String(countryValue || "").trim();
    };

    const countryItemTemplate = (option) => option?.label || "";

    const createCountryValueTemplate = (countryValue) => (option, props) =>
        option?.label || getCountryDisplayText(countryValue) || props.placeholder;

    const mergeListByKey = (oldList, newList, getKey) => {
        if (!newList) return;
        const newMap = new Map(newList?.map((item) => [getKey(item), item]));
        const updatedList = [];
        const existingKeys = new Set();

        oldList.forEach((oldItem) => {
            const key = getKey(oldItem);
            const newItem = newMap.get(key);
            if (newItem) {
                const isChanged =
                    JSON.stringify(oldItem) !== JSON.stringify(newItem);
                updatedList.push(isChanged ? newItem : oldItem);
                existingKeys.add(key);
            }
        });

        newList.forEach((newItem) => {
            const key = getKey(newItem);
            if (!existingKeys.has(key)) {
                updatedList.push(newItem);
            }
        });

        return updatedList;
    };

    const search_PROD_MEM = (argData) => {
        const tSaveArray = [...selectedTBL_KSV_PROD_MEMRef.current];
        saveProdMemScrollPosition();
        shouldRestoreProdMemScrollRef.current = true;
        setLoadingTBL_KSV_PROD_MEM(true);

        serviceS0303_MRP_RECORD_STYLE
            .mgrQueryTBL_KSV_PROD_MEM(argData)
            .then((data) => {
                if (typeof data.graphQLErrors === "undefined") {
                    console.log(
                        "mgrQueryTBL_KSV_PROD_MEM() call => " + data.length,
                    );

                    const dataRows = Array.isArray(data)
                        ? cloneArrayData(data)
                        : data
                          ? cloneArrayData([data])
                          : [];

                    dataRows.forEach((item, index) => {
                        item.NET = parseFloat(item.NET).toFixed(4);
                        item.LOSS = parseFloat(item.LOSS).toFixed(2);
                        item.GROSS = parseFloat(item.GROSS).toFixed(5);
                        item.STD_NET = parseFloat(item.STD_NET).toFixed(4);
                        item.STD_LOSS = parseFloat(item.STD_LOSS).toFixed(2);
                        item.STD_GROSS = parseFloat(item.STD_GROSS).toFixed(5);
                        item.id = index;
                    });

                    const uniqueVendors = Object.values(
                        dataRows.reduce((acc, item) => {
                            if (!acc[item.VENDOR_CD]) {
                                acc[item.VENDOR_CD] = {
                                    VENDOR_CD: item.VENDOR_CD,
                                    VENDOR_NAME: item.VENDOR_NAME,
                                };
                            }
                            return acc;
                        }, {}),
                    );

                    const keyedDataRows = withProdMemDataKeys(dataRows);

                    const restoredSelection = keyedDataRows.filter((item) =>
                        tSaveArray.some(
                            (sel) =>
                                item.MATL_CD === sel.MATL_CD &&
                                item.MATL_NAME === sel.MATL_NAME &&
                                item.COLOR === sel.COLOR &&
                                item.SPEC === sel.SPEC &&
                                item.USE_SIZE === sel.USE_SIZE &&
                                item.REMARK === sel.REMARK,
                        ),
                    );

                    // React 17: async 콜백 내 다중 setState를 단일 렌더로 묶음
                    ReactDOM.unstable_batchedUpdates(() => {
                        setDatasTBL_KSV_PROD_MEM(keyedDataRows);
                        setDatasQRY_KCD_STYLE2_VENDOR_CD1(uniqueVendors);
                        setDataETC_ROW_COUNT(dataRows.length);
                        setSelectedTBL_KSV_PROD_MEM(restoredSelection);
                        setLoadingTBL_KSV_PROD_MEM(false);
                    });
                } else {
                    console.log(
                        "mgrQueryTBL_KSV_PROD_MEM()error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                    setLoadingTBL_KSV_PROD_MEM(false);
                }
            });
    };

    const search_KCD_STYLE = () => {
        setDatasTBL_KCD_STYLE([]);
        setSelectedTBL_KCD_STYLE([]);

        setDatasTBL_KSV_PROD_MST([]);
        setSelectedTBL_KSV_PROD_MST([]);

        setDatasTBL_KCD_MATL_MST([]);
        setSelectedTBL_KCD_MATL_MST([]);

        setDatasTBL_KSV_PROD_MEM([]);
        setSelectedTBL_KSV_PROD_MEM([]);

        var tObj = { ...refQRY_KCD_STYLE.current };
        if (tObj.STYLE_CD === "" && tObj.BUYER_CD === "") {
            alert("Style, Buyer중 하나는 필수입력값 입니다.<br><br>One of Style and Buyer is a required input value.");
            return;
        }

        setLoadingTBL_KCD_STYLE(true);
        serviceS0303_MRP_RECORD_STYLE
            .mgrQueryTBL_KCD_STYLE(tObj)
            .then((data) => {
                setLoadingTBL_KCD_STYLE(false);
                if (typeof data.graphQLErrors === "undefined") {
                    console.log(
                        "mgrQueryTBL_KCD_STYLE() call => " + data.length,
                    );
                    setDatasTBL_KCD_STYLE(data);
                } else {
                    // var tStr = data.graphQLErrors[0].message;
                    console.log(
                        "mgrQueryTBL_KCD_STYLE()error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });
    };

    const handleSearchInputKeyDown = (e) => {
        if (e.key !== "Enter") return;
        e.preventDefault();
        search_KCD_STYLE();
    };

    const select_UPDATE_SPEC = (argSpec) => {
        var argData = { ...(argSpec || saveUPDATE_SPEC) };

        var tObj = {};
        tObj.PROD_CD = argData.PROD_CD;
        tObj.REMARK = argData.REMARK;
        tObj.DL_FLAG = "";

        datasTBL_KSV_PROD_MEM1Ref.current = [];
        setDatasTBL_KSV_PROD_MEM1([]);
        setSelectedTBL_KSV_PROD_MEM1([]);
        var tArray = [];

        setLoadingTBL_KSV_PROD_MEM(true);
        serviceS0303_MRP_RECORD_STYLE
            .mgrQueryTBL_KSV_PROD_MEM_BY_USAGE(tObj)
            .then((data) => {
                setLoadingTBL_KSV_PROD_MEM(false);
                if (typeof data.graphQLErrors === "undefined") {
                    let copiedData = cloneArrayData(data);
                    var tArray = [];
                    copiedData.forEach((col, i) => {
                        var item = { ...col };
                        item.id = `${item.PROD_CD || ""}_${item.SEQ || ""}_${item.MATL_CD || ""}_${i}`;
                        // item.PROD_CD_N = col.COLOR;
                        item.NET = parseFloat(item.NET).toFixed(4);
                        item.LOSS = parseFloat(item.LOSS).toFixed(2);
                        item.GROSS = parseFloat(item.GROSS).toFixed(5);

                        item.STD_NET = parseFloat(item.STD_NET).toFixed(4);
                        item.STD_LOSS = parseFloat(item.STD_LOSS).toFixed(2);
                        item.STD_GROSS = parseFloat(item.STD_GROSS).toFixed(5);
                        tArray.push(item);
                    });
                    datasTBL_KSV_PROD_MEM1Ref.current = tArray;
                    setDatasTBL_KSV_PROD_MEM1(tArray);
                } else {
                    console.log(
                        "mgrQueryTBL_KSV_PROD_MEM()error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });
    };

    const process_UPDATE_SPEC_USAGE = () => {
        if (
            typeof dataEDT_KSV_PROD_MEM_USAGE.USAGE === "undefined" ||
            dataEDT_KSV_PROD_MEM_USAGE.USAGE === ""
        )
            return;

        var tValue = dataEDT_KSV_PROD_MEM_USAGE.USAGE;
        process_UPDATE_SPEC_BATCH("USAGE", tValue);
    };
    const process_UPDATE_SPEC_NET_S = () => {
        if (
            typeof dataEDT_KSV_PROD_MEM_USAGE.NET_S === "undefined" ||
            dataEDT_KSV_PROD_MEM_USAGE.NET_S === ""
        )
            return;

        var tValue = dataEDT_KSV_PROD_MEM_USAGE.NET_S;
        process_UPDATE_SPEC_BATCH("NET_S", tValue);
    };
    const process_UPDATE_SPEC_NET = () => {
        if (
            typeof dataEDT_KSV_PROD_MEM_USAGE.NET === "undefined" ||
            dataEDT_KSV_PROD_MEM_USAGE.NET === ""
        )
            return;

        var tValue = dataEDT_KSV_PROD_MEM_USAGE.NET;
        process_UPDATE_SPEC_BATCH("NET", tValue);
    };
    const process_UPDATE_SPEC_LOSS = () => {
        if (
            typeof dataEDT_KSV_PROD_MEM_USAGE.LOSS === "undefined" ||
            dataEDT_KSV_PROD_MEM_USAGE.LOSS === ""
        )
            return;

        var tValue = dataEDT_KSV_PROD_MEM_USAGE.LOSS;
        process_UPDATE_SPEC_BATCH("LOSS", tValue);
    };

    const process_UPDATE_SPEC_BATCH = (argOpMode, argValue) => {
        const currentRows = datasTBL_KSV_PROD_MEM1Ref.current || [];
        const selectedIds = new Set(
            (selectedTBL_KSV_PROD_MEM1 || []).map((row) => row.id),
        );
        const hasSelectedRows = selectedIds.size > 0;

        // 선택된 행이 없으면 경고 표시 후 반환
        if (!hasSelectedRows) {
            alert("행을 선택한 후에 버튼을 눌러주세요.\nPlease select rows first.");
            return;
        }

        const updatedData = currentRows.map((col) => {
            const shouldApply = selectedIds.has(col.id);
            if (!shouldApply) return col;

            const tObj = { ...col };
            if (argOpMode === "USAGE") tObj.REMARK = argValue;
            if (argOpMode === "NET_S") {
                tObj.STD_NET = argValue;
                tObj.NET = argValue;
            }
            if (argOpMode === "NET") tObj.NET = argValue;
            if (argOpMode === "LOSS") tObj.LOSS = argValue;

            const net = parseFloat(tObj.NET) || 0;
            const loss = parseFloat(tObj.LOSS) || 0;
            const addLoss = parseFloat(tObj.ADD_LOSS) || 0;
            const stdNet = parseFloat(tObj.STD_NET) || 0;
            const stdLoss = parseFloat(tObj.STD_LOSS) || 0;

            tObj.GROSS = String(net + net * (loss + addLoss) * 0.01);
            tObj.STD_GROSS = String(stdNet + stdNet * (stdLoss + addLoss) * 0.01);

            tObj.NET = parseFloat(tObj.NET).toFixed(4);
            tObj.LOSS = parseFloat(tObj.LOSS).toFixed(2);
            tObj.GROSS = parseFloat(tObj.GROSS).toFixed(5);
            tObj.STD_NET = parseFloat(tObj.STD_NET).toFixed(4);
            tObj.STD_LOSS = parseFloat(tObj.STD_LOSS).toFixed(2);
            tObj.STD_GROSS = parseFloat(tObj.STD_GROSS).toFixed(5);
            tObj.S_FLAG = "1";
            return tObj;
        });

        datasTBL_KSV_PROD_MEM1Ref.current = updatedData;
        setDatasTBL_KSV_PROD_MEM1(updatedData);

        if (argOpMode === "USAGE") {
            var tNextSpec = { ...saveUPDATE_SPEC };
            tNextSpec.REMARK = argValue;
            setSaveUPDATE_SPEC(tNextSpec);
        }
    };

    const process_UPDATE_SPEC = (argData) => {
        var tInArray = [];
        const currentRows = datasTBL_KSV_PROD_MEM1Ref.current || [];
        const selectedIds = new Set(
            (selectedTBL_KSV_PROD_MEM1 || []).map((row) => row.id),
        );

        currentRows.forEach((col, i) => {
            const isSelected = selectedIds.has(col.id);
            const isChanged = col.S_FLAG === "1";
            if (!isSelected && !isChanged) return;

            var tObj = { ...col };
            delete tObj.__typename;
            delete tObj.id;
            delete tObj.__ROW_KEY;
            tInArray.push(tObj);
        });

        if (tInArray.length <= 0) {
            alert("저장할 변경 데이터가 없습니다.<br><br>There is no changed data to save.");
            return;
        }

        const tSaveCount = tInArray.length;

        var tAddPosition = {};
        var tProdCds = buildUsageListTargetProdCds(tInArray);

        if (tProdCds.length <= 0) {
            alert("저장 대상 품번을 확인할 수 없습니다.<br><br>Unable to determine target products to save.");
            return;
        }

        setLoadingTBL_KSV_PROD_MEM1(true);
        serviceS0303_MRP_RECORD_STYLE
            .mgrInsert_ALL_UPDATE_MATERIAL(tInArray, tProdCds, tAddPosition)
            .then((data) => {
                setLoadingTBL_KSV_PROD_MEM1(false);
                if (typeof data.graphQLErrors === "undefined") {
                    if (data.length > 0) {
                        const tResultCode = data[0].CODE || "";
                        alert(
                            `Save result : ${tResultCode}<br><br>저장 건수 : ${tSaveCount}건<br><br>Saved rows : ${tSaveCount}`,
                        );
                        if (data[0].CODE.includes("SUCC")) {
                            const tRemarkSet = [
                                ...new Set(
                                    tInArray.map((row) =>
                                        typeof row.REMARK === "undefined"
                                            ? ""
                                            : row.REMARK,
                                    ),
                                ),
                            ];
                            if (tRemarkSet.length === 1) {
                                var tNextSpec = { ...saveUPDATE_SPEC };
                                tNextSpec.REMARK = tRemarkSet[0];
                                setSaveUPDATE_SPEC(tNextSpec);
                                select_UPDATE_SPEC(tNextSpec);
                            } else {
                                select_UPDATE_SPEC();
                            }
                        }
                    } else {
                        alert(
                            `Save completed.<br><br>저장 건수 : ${tSaveCount}건<br><br>Saved rows : ${tSaveCount}`,
                        );
                        select_UPDATE_SPEC();
                    }
                } else {
                    alert("저장 중 오류가 발생했습니다.<br><br>An error occurred while saving.");
                    // var tStr = data.graphQLErrors[0].message;
                    console.log(
                        "ServiceNawooAll.mgrInsertS0303_MRP_RECORD_STYLE( error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });
    };

    const buildProdMemStrictKey = (row) =>
        `${row?.PROD_CD || ""}|${row?.SEQ || ""}|${row?.MATL_CD || ""}`;

    const buildProdMemLooseKey = (row) =>
        `${row?.PROD_CD || ""}|${row?.MATL_CD || ""}|${row?.USE_SIZE || ""}|${row?.REMARK || ""}`;

    const buildUsageListTargetProdCds = (rows) => {
        const tRows = Array.isArray(rows) ? rows : [];
        const tResult = [];
        const tSeen = new Set();

        tRows.forEach((row) => {
            const tProdCd = row?.PROD_CD || "";
            if (!tProdCd || tSeen.has(tProdCd)) return;
            tSeen.add(tProdCd);
            tResult.push({ PROD_CD: tProdCd });
        });

        return tResult;
    };

    const formatProdMemRow = (item, fallbackId = 0) => {
        const tRow = { ...item };
        tRow.NET = parseFloat(tRow.NET).toFixed(4);
        tRow.LOSS = parseFloat(tRow.LOSS).toFixed(2);
        tRow.GROSS = parseFloat(tRow.GROSS).toFixed(5);
        tRow.STD_NET = parseFloat(tRow.STD_NET).toFixed(4);
        tRow.STD_LOSS = parseFloat(tRow.STD_LOSS).toFixed(2);
        tRow.STD_GROSS = parseFloat(tRow.STD_GROSS).toFixed(5);
        if (typeof tRow.id === "undefined") tRow.id = fallbackId;
        return tRow;
    };

    const refreshCheckedProdMemRowsByUsage = async () => {
        const tProdCd = saveUPDATE_SPEC?.PROD_CD || "";
        if (!tProdCd) return;

        const tObj = {
            PROD_CD: tProdCd,
            REMARK: saveUPDATE_SPEC?.REMARK || "",
            DL_FLAG: "",
        };

        const tSavedSelectedRows = [...(selectedTBL_KSV_PROD_MEMRef.current || [])];
        const tSavedScrollTop = (() => {
            saveProdMemScrollPosition();
            return prodMemScrollTopRef.current || 0;
        })();

        const tSelectedStrictSet = new Set(
            tSavedSelectedRows.map((row) => buildProdMemStrictKey(row)),
        );
        const tSelectedLooseSet = new Set(
            tSavedSelectedRows.map((row) => buildProdMemLooseKey(row)),
        );

        patchingProdMemRef.current = true;

        const data =
            await serviceS0303_MRP_RECORD_STYLE.mgrQueryTBL_KSV_PROD_MEM_BY_USAGE(
                tObj,
            );

        if (typeof data.graphQLErrors !== "undefined") {
            console.log(
                "mgrQueryTBL_KSV_PROD_MEM_BY_USAGE()error => " +
                    JSON.stringify(data.graphQLErrors),
            );
            patchingProdMemRef.current = false;
            return;
        }

        const tFetchedRows = (Array.isArray(data) ? data : data ? [data] : []).map(
            (row, idx) => formatProdMemRow(row, idx),
        );

        // usage 기반 조회 결과가 비면 부분 patch 대신 전체 재조회로 보정한다.
        if (tFetchedRows.length <= 0) {
            patchingProdMemRef.current = false;
            search_PROD_MEM({
                PROD_CD: tProdCd,
                DL_FLAG: "",
            });
            return;
        }

        // 다건 편집 시 동일 키가 여러 건일 수 있어, 키별 큐를 만들어 순차 매칭한다.
        const tFetchedStrictQueues = new Map();
        const tFetchedLooseQueues = new Map();
        tFetchedRows.forEach((row) => {
            const sk = buildProdMemStrictKey(row);
            if (!tFetchedStrictQueues.has(sk)) tFetchedStrictQueues.set(sk, []);
            tFetchedStrictQueues.get(sk).push(row);

            const lk = buildProdMemLooseKey(row);
            if (!tFetchedLooseQueues.has(lk)) tFetchedLooseQueues.set(lk, []);
            tFetchedLooseQueues.get(lk).push(row);
        });

        const tPrevRows = datasTBL_KSV_PROD_MEMRef.current || [];
        let tMatchedCount = 0;
        const tUpdatedRows = tPrevRows.map((row, idx) => {
            const tStrictKey = buildProdMemStrictKey(row);
            const tLooseKey = buildProdMemLooseKey(row);

            let tFetchedRow = null;
            const tStrictQueue = tFetchedStrictQueues.get(tStrictKey);
            if (Array.isArray(tStrictQueue) && tStrictQueue.length > 0) {
                tFetchedRow = tStrictQueue.shift();
            }

            if (!tFetchedRow) {
                const tLooseQueue = tFetchedLooseQueues.get(tLooseKey);
                if (Array.isArray(tLooseQueue) && tLooseQueue.length > 0) {
                    tFetchedRow = tLooseQueue.shift();
                }
            }

            if (!tFetchedRow) return row;

            tMatchedCount += 1;

            return {
                ...row,
                ...tFetchedRow,
                id: typeof row.id !== "undefined" ? row.id : idx,
            };
        });

        // 다건 저장 후 키 조합 불일치로 patch 0건이면 전체 재조회로 화면을 확정한다.
        if (tMatchedCount <= 0) {
            patchingProdMemRef.current = false;
            search_PROD_MEM({
                PROD_CD: tProdCd,
                DL_FLAG: "",
            });
            return;
        }

        const tNextSelectedRows = tUpdatedRows.filter((row) => {
            const tStrictKey = buildProdMemStrictKey(row);
            const tLooseKey = buildProdMemLooseKey(row);
            return (
                tSelectedStrictSet.has(tStrictKey) ||
                (tSelectedLooseSet.size > 0 && tSelectedLooseSet.has(tLooseKey))
            );
        });

        const uniqueVendors = Object.values(
            tUpdatedRows.reduce((acc, item) => {
                if (!acc[item.VENDOR_CD]) {
                    acc[item.VENDOR_CD] = {
                        VENDOR_CD: item.VENDOR_CD,
                        VENDOR_NAME: item.VENDOR_NAME,
                    };
                }
                return acc;
            }, {}),
        );

        ReactDOM.unstable_batchedUpdates(() => {
            setDatasTBL_KSV_PROD_MEM(tUpdatedRows);
            setSelectedTBL_KSV_PROD_MEM(tNextSelectedRows);
            setDatasQRY_KCD_STYLE2_VENDOR_CD1(uniqueVendors);
            setDataETC_ROW_COUNT(tUpdatedRows.length);
        });

        prodMemScrollTopRef.current = tSavedScrollTop;
        shouldRestoreProdMemScrollRef.current = true;
        setTimeout(() => {
            restoreProdMemScrollPosition();
        }, 0);
        setTimeout(() => {
            shouldRestoreProdMemScrollRef.current = true;
            restoreProdMemScrollPosition();
        }, 90);
        setTimeout(() => {
            patchingProdMemRef.current = false;
        }, 220);
    };

    const unpopup_SPEC = (argData) => {
        const tProdCd = saveUPDATE_SPEC?.PROD_CD || "";
        setCreateDialog2(false);
        setDataEDT_KSV_PROD_MEM_USAGE({ ...emptyEDT_KSV_PROD_MEM_USAGE });
        // S0303 는 다건 저장 후 부분 patch 매칭 누락이 있어, 닫기 시 전체 재조회로 확정한다.
        if (tProdCd) {
            search_PROD_MEM({
                PROD_CD: tProdCd,
                DL_FLAG: "",
            });
            return;
        }

        refreshCheckedProdMemRowsByUsage();
    };

    const popup_SPEC = (argData) => {
        saveProdMemScrollPosition();
        setDataEDT_KSV_PROD_MEM_USAGE({ ...emptyEDT_KSV_PROD_MEM_USAGE });
        popupSpecSourceRowKeyRef.current = buildProdMemStrictKey(argData);
        var tColor = selectedTBL_KSV_PROD_MST[0]?.COLOR || "";

        var tObj = {};
        tObj.PROD_CD = argData.PROD_CD;
        tObj.REMARK = argData.REMARK;
        tObj.DL_FLAG = "";

        datasTBL_KSV_PROD_MEM1Ref.current = [];
        setDatasTBL_KSV_PROD_MEM1([]);
        setSelectedTBL_KSV_PROD_MEM1([]);
        var tArray = [];

        setSaveUPDATE_SPEC(tObj);

        setLoadingTBL_KSV_PROD_MEM1(true);
        serviceS0303_MRP_RECORD_STYLE
            .mgrQueryTBL_KSV_PROD_MEM_BY_USAGE(tObj)
            .then((data) => {
            setLoadingTBL_KSV_PROD_MEM1(false);
                if (typeof data.graphQLErrors === "undefined") {
                    let copiedData = cloneArrayData(data);
                    var tArray = [];
                    copiedData.forEach((col, i) => {
                        var item = { ...col };
                        item.id = `${item.PROD_CD || ""}_${item.SEQ || ""}_${item.MATL_CD || ""}_${i}`;
                        // item.PROD_CD_N = col.COLOR;
                        item.NET = parseFloat(item.NET).toFixed(4);
                        item.LOSS = parseFloat(item.LOSS).toFixed(2);
                        item.GROSS = parseFloat(item.GROSS).toFixed(5);

                        item.STD_NET = parseFloat(item.STD_NET).toFixed(4);
                        item.STD_LOSS = parseFloat(item.STD_LOSS).toFixed(2);
                        item.STD_GROSS = parseFloat(item.STD_GROSS).toFixed(5);
                        tArray.push(item);
                    });
                    datasTBL_KSV_PROD_MEM1Ref.current = tArray;
                    setDatasTBL_KSV_PROD_MEM1(tArray);
                    setCreateDialog2(true);
                } else {
                    console.log(
                        "mgrQueryTBL_KSV_PROD_MEM()error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });
    };

    const popup_MATL_MST = (argData) => {
        const tMatlCd = String(argData || "").trim();
        if (!tMatlCd) return;

        var tUrls = window.location.href.split("/");
        console.log("URL=>" + tUrls[2]);
        var tUrl1 = "";
        if (window.location.href.includes("3288")) {
            tUrl1 = "http://afroba.iptime.org:3288/webapp/mrpapp/index.html#/";
        } else if (window.location.href.includes("3201")) {
            tUrl1 = "http://afroba.iptime.org:3201/#/";
        } else if (window.location.href.includes("3203")) {
            tUrl1 = "http://192.168.0.105:3203/#/";
        } else {
            tUrl1 = "http://localhost:3201/#/";
        }

        tUrl1 = "S030301_COPY_PRODUCT";

        const tMatlRecordPayload = {
            MATL_CD: tMatlCd,
            SOURCE: "S0303",
            TS: Date.now(),
        };

        // Fallback payload for the case where S0301 tab mounts after this postMessage.
        window.localStorage.setItem(
            "S0301_MATL_RECORD_OPEN_REQUEST",
            JSON.stringify(tMatlRecordPayload),
        );

        var tUrl2 = "S0301_MATL_RECORD";
        var tValObj = {
            key: "2-1",
            label: "Material Record",
            icon: "pi pi-fw pi-user-edit",
            url1: "S0301_MATL_RECORD",
        };
        var tArgObj = { ...tValObj };
        tArgObj.url1 = tUrl2;
        tArgObj.keepStateIfOpen = true;
        var tFuncObj = {};
        tFuncObj.func = "call_url";
        tFuncObj.message = { ...tArgObj };
        window.parent.postMessage(tFuncObj, "*");

        // Ask S0301 to apply MATL_CD without forcing route reload.
        window.parent.postMessage(
            {
                func: "s0301_set_matl_cd",
                message: tMatlRecordPayload,
            },
            "*",
        );
    };

    const getCurrentStyleRow = () => {
        return selectedTBL_KCD_STYLE?.[0] || dataTBL_KCD_STYLE || {};
    };

    const popup_STYLE_SEARCH = () => {
        if (selectedTBL_KSV_PROD_MST.length <= 0) {
            alert("작업할 color를 선택하세요<br><br>Select the color you want to work with");
            return;
        }

        const tStyleRow = getCurrentStyleRow();
        if (!tStyleRow.STYLE_CD) {
            alert("작업할 style을 선택하세요<br><br>Select the style you want to work with");
            return;
        }

        var tUrls = window.location.href.split("/");
        console.log("URL=>" + tUrls[2]);
        var tUrl1 = "";
        if (window.location.href.includes("3288")) {
            tUrl1 = "http://afroba.iptime.org:3288/webapp/mrpapp/index.html#/";
        } else if (window.location.href.includes("3201")) {
            tUrl1 = "http://afroba.iptime.org:3201/#/";
        } else if (window.location.href.includes("3203")) {
            tUrl1 = "http://192.168.0.105:3203/#/";
        } else {
            tUrl1 = "http://localhost:3201/#/";
        }

        // var tSTYLE_CD = 'ST23-0734';
        var tSTYLE_CD = tStyleRow.STYLE_CD;
        var tProdCd = selectedTBL_KSV_PROD_MST?.[0]?.PROD_CD || "";

        tUrl1 = `${window.location.origin}/#/`;
        tUrl1 +=
            "S030302_COPY_STYLE?STYLE_CD=" +
            tSTYLE_CD +
            "&PROD_CD=" +
            tProdCd +
            "&SOURCE=S0303";

        var tUrl2 =
            "S030302_COPY_STYLE?STYLE_CD=" +
            tSTYLE_CD +
            "&PROD_CD=" +
            tProdCd +
            "&SOURCE=S0303";
        var tValObj = {
            key: "2-21",
            label: "Style MRP Search",
            icon: "pi pi-fw pi-user-edit",
            url1: "S030302_COPY_STYLE",
        };
        var tArgObj = { ...tValObj };
        tArgObj.url1 = tUrl2;
        var tFuncObj = {};
        tFuncObj.func = "call_url";
        tFuncObj.message = { ...tArgObj };
        window.parent.postMessage(tFuncObj, "*");
    };

    const popup_MRP_BY_ORDER_SRCH = () => {
        if (selectedTBL_KSV_PROD_MST.length <= 0) {
            alert("작업할 color를 선택하세요<br><br>Select the color you want to work with");
            return;
        }

        const tStyleRow = getCurrentStyleRow();
        if (!tStyleRow.STYLE_CD) {
            alert("작업할 style을 선택하세요<br><br>Select the style you want to work with");
            return;
        }

        var tUrls = window.location.href.split("/");
        console.log("URL=>" + tUrls[2]);
        var tUrl1 = "";
        if (window.location.href.includes("3288")) {
            tUrl1 = "http://afroba.iptime.org:3288/webapp/mrpapp/index.html#/";
        } else if (window.location.href.includes("3201")) {
            tUrl1 = "http://afroba.iptime.org:3201/#/";
        } else if (window.location.href.includes("3203")) {
            tUrl1 = "http://192.168.0.105:3203/#/";
        } else {
            tUrl1 = "http://localhost:3201/#/";
        }

        var tSTYLE_CD = tStyleRow.STYLE_CD;
        var tProdCd = selectedTBL_KSV_PROD_MST?.[0]?.PROD_CD || "";

        tUrl1 = `${window.location.origin}/#/`;
        tUrl1 +=
            "S030303_MRP_BY_SEARCH?STYLE_CD=" +
            tSTYLE_CD +
            "&PROD_CD=" +
            tProdCd +
            "&SOURCE=S0303";

        var tUrl2 =
            "S030303_MRP_BY_SEARCH?STYLE_CD=" +
            tSTYLE_CD +
            "&PROD_CD=" +
            tProdCd +
            "&SOURCE=S0303";
        var tValObj = {
            key: "2-22",
            label: "Order MRP Search",
            icon: "pi pi-fw pi-user-edit",
            url1: "S030303_MRP_BY_SEARCH",
        };
        var tArgObj = { ...tValObj };
        tArgObj.url1 = tUrl2;
        var tFuncObj = {};
        tFuncObj.func = "call_url";
        tFuncObj.message = { ...tArgObj };
        window.parent.postMessage(tFuncObj, "*");
    };

    const popup_ADD_SEQ = async () => {
        const tStyleRow = getCurrentStyleRow();
        if (!tStyleRow.STYLE_CD) {
            alert("작업할 style을 선택하세요<br><br>Select the style you want to work with");
            return;
        }

        console.log(tStyleRow.STYLE_CD);

        let tUrl1 = `${window.location.origin}/#/`;
        tUrl1 +=
            "S030304_ADD_SEQ_MRP_BY_ORDER?STYLE_CD=" +
            tStyleRow.STYLE_CD;
        setUrlIframe(tUrl1);
        setCreateDialog(true);
    };

    /* QRY KCD_MATL_MST*/
    const refQRY_KCD_MATL_MST_MATL_NAME = useRef("");
    const refQRY_KCD_MATL_MST_COLOR = useRef("");
    const refQRY_KCD_MATL_MST_MATL_CD = useRef("");
    const refQRY_KCD_MATL_MST_SPEC = useRef("");
    const refQRY_KCD_MATL_MST_VENDOR_NAME = useRef("");
    const inputRefMatlName = useRef(null);
    const inputRefMatlColor = useRef(null);
    const inputRefMatlCD = useRef(null);
    const inputRefMatlSpec = useRef(null);
    const inputRefMatlVendorName = useRef(null);

    const putQRY_KCD_MATL_MST = (argData) => {
        refQRY_KCD_MATL_MST_MATL_NAME.current = argData.MATL_NAME ?? "";
        refQRY_KCD_MATL_MST_MATL_CD.current = argData.MATL_CD ?? "";
        refQRY_KCD_MATL_MST_SPEC.current = argData.SPEC ?? "";
        refQRY_KCD_MATL_MST_COLOR.current = argData.COLOR ?? "";
        refQRY_KCD_MATL_MST_VENDOR_NAME.current = argData.VENDOR_NAME ?? "";
        if (inputRefMatlName.current) inputRefMatlName.current.value = refQRY_KCD_MATL_MST_MATL_NAME.current;
        if (inputRefMatlCD.current) inputRefMatlCD.current.value = refQRY_KCD_MATL_MST_MATL_CD.current;
        if (inputRefMatlSpec.current) inputRefMatlSpec.current.value = refQRY_KCD_MATL_MST_SPEC.current;
        if (inputRefMatlColor.current) inputRefMatlColor.current.value = refQRY_KCD_MATL_MST_COLOR.current;
        if (inputRefMatlVendorName.current) inputRefMatlVendorName.current.value = refQRY_KCD_MATL_MST_VENDOR_NAME.current;
    };

    /* QRY KCD_STYLE2 */
    const [dataQRY_KCD_STYLE2, setDataQRY_KCD_STYLE2] =
        useState(emptyQRY_KCD_STYLE2);

    const [datasQRY_KCD_STYLE2_VENDOR_CD1, setDatasQRY_KCD_STYLE2_VENDOR_CD1] =
        useState([]);
    const [dataQRY_KCD_STYLE2_VENDOR_CD1, setDataQRY_KCD_STYLE2_VENDOR_CD1] =
        useState({});

    const clearQRY_KCD_STYLE2_VENDOR_CD1 = () => {
        setDataQRY_KCD_STYLE2({
            ...dataQRY_KCD_STYLE2,
            VENDOR_CD1: "",
        });
        setDataQRY_KCD_STYLE2_VENDOR_CD1({});
    };

    const applyVendorCd1Selection = (vendor) => {
        const tVendorCd = String(vendor?.VENDOR_CD || "").trim();
        const tVendorName = String(vendor?.VENDOR_NAME || "").trim();

        if (!tVendorCd && !tVendorName) {
            setSelectedTBL_KSV_PROD_MEM([]);
            setDataETC_ROW_COUNT(0);
            return;
        }

        const tArray1 = (datasTBL_KSV_PROD_MEM || []).filter((row) => {
            const tRowVendorCd = String(row?.VENDOR_CD || "").trim();
            const tRowVendorName = String(row?.VENDOR_NAME || "").trim();

            if (tVendorCd && tRowVendorCd) {
                return tRowVendorCd === tVendorCd;
            }

            return tVendorName !== "" && tRowVendorName === tVendorName;
        });

        setSelectedTBL_KSV_PROD_MEM(tArray1);
        setDataETC_ROW_COUNT(tArray1.length);
    };

    const onDropdownChangeQRY_KCD_STYLE2_VENDOR_CD1 = (e, name) => {
        let val = (e.value && e.value.VENDOR_CD) || "";

        let _dataQRY_KCD_STYLE2 = { ...dataQRY_KCD_STYLE2 };

        let tTypeVal = _dataQRY_KCD_STYLE2[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KCD_STYLE2[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KCD_STYLE2[`${name}`] = parseInt(val);
        }

        setDataQRY_KCD_STYLE2(_dataQRY_KCD_STYLE2);
        setDataQRY_KCD_STYLE2_VENDOR_CD1(e.value);
        applyVendorCd1Selection(e?.value || {});
    };

    const [datasQRY_KCD_STYLE2_VENDOR_CD2, setDatasQRY_KCD_STYLE2_VENDOR_CD2] =
        useState([]);
    const [dataQRY_KCD_STYLE2_VENDOR_CD2, setDataQRY_KCD_STYLE2_VENDOR_CD2] =
        useState({});

    const applyVendorCd2Selection = (vendor) => {
        const tVendor = vendor || {};
        const tVendorCd = String(tVendor.VENDOR_CD || "").trim();

        setDataQRY_KCD_STYLE2((prev) => ({
            ...prev,
            VENDOR_CD2: tVendorCd,
        }));
        setDataQRY_KCD_STYLE2_VENDOR_CD2(tVendor);
    };

    const onDropdownChangeQRY_KCD_STYLE2_VENDOR_CD2 = (e, name) => {
        let val = (e.value && e.value.VENDOR_CD) || "";

        let _dataQRY_KCD_STYLE2 = { ...dataQRY_KCD_STYLE2 };

        let tTypeVal = _dataQRY_KCD_STYLE2[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KCD_STYLE2[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KCD_STYLE2[`${name}`] = parseInt(val);
        }

        setDataQRY_KCD_STYLE2(_dataQRY_KCD_STYLE2);
        applyVendorCd2Selection(e?.value || {});
    };

    /* QRY KCD_STYLE */
    const refQRY_KCD_STYLE = useRef({ ...emptyQRY_KCD_STYLE });
    const inputRefStyleCD = useRef(null);
    const inputRefBuyerCD = useRef(null);

    const [datasQRY_KCD_STYLE_STYLE_CD0, setDatasQRY_KCD_STYLE_STYLE_CD0] =
        useState([]);
    const [dataQRY_KCD_STYLE_STYLE_CD0, setDataQRY_KCD_STYLE_STYLE_CD0] =
        useState({});

    const [dataQRY_KCD_STYLE_STYLE_CD, setDataQRY_KCD_STYLE_STYLE_CD] =
        useState("");

    const [datasQRY_KCD_STYLE_BUYER_CD, setDatasQRY_KCD_STYLE_BUYER_CD] =
        useState([]);
    const [dataQRY_KCD_STYLE_BUYER_CD, setDataQRY_KCD_STYLE_BUYER_CD] =
        useState({});

    /* QRY KSV_PROD_MEM*/

    const [dataQRY_KSV_PROD_MEM, setDataQRY_KSV_PROD_MEM] = useState(
        emptyQRY_KSV_PROD_MEM,
    );

    /**TABLE KCD_MATL_MST1 */
    // DEFINE DATAGRID : TBL_KCD_MATL_MST1
    const [datasTBL_KCD_MATL_MST1, setDatasTBL_KCD_MATL_MST1] = useState([]);
    const dt_TBL_KCD_MATL_MST1 = useRef(null);
    const [dataTBL_KCD_MATL_MST1, setDataTBL_KCD_MATL_MST1] = useState(
        emptyTBL_KCD_MATL_MST1,
    );
    const [selectedTBL_KCD_MATL_MST1, setSelectedTBL_KCD_MATL_MST1] = useState(
        [],
    );
    const [
        flagSelectModeTBL_KCD_MATL_MST1,
        setFlagSelectModeTBL_KCD_MATL_MST1,
    ] = useState(false);
    const [frozenTBL_KCD_MATL_MST1, setFrozenTBL_KCD_MATL_MST1] = useState([]);
    const [loadingTBL_KCD_MATL_MST1, setLoadingTBL_KCD_MATL_MST1] =
        useState(false);

    /**TABLE KCD_MATL_MST */

    // DEFINE DATAGRID : TBL_KCD_MATL_MST
    const [datasTBL_KCD_MATL_MST, setDatasTBL_KCD_MATL_MST] = useState([]);
    const dt_TBL_KCD_MATL_MST = useRef(null);
    const [dataTBL_KCD_MATL_MST, setDataTBL_KCD_MATL_MST] = useState(
        emptyTBL_KCD_MATL_MST,
    );
    const [selectedTBL_KCD_MATL_MST, setSelectedTBL_KCD_MATL_MST] = useState(
        [],
    );
    const [flagSelectModeTBL_KCD_MATL_MST, setFlagSelectModeTBL_KCD_MATL_MST] =
        useState(false);
    const [frozenTBL_KCD_MATL_MST, setFrozenTBL_KCD_MATL_MST] = useState([]);
    const [loadingTBL_KCD_MATL_MST, setLoadingTBL_KCD_MATL_MST] =
        useState(false);

    const resequenceProdMemRows = (rows) =>
        withProdMemDataKeys(
            rows.map((row, index) => ({
                ...row,
                SEQ: String(index + 1),
            })),
        );

    const applyMoveToRows = (rows, selectedSeq, targetIndex) => {
        const tRows = [...rows];
        const tFromIndex = tRows.findIndex(
            (row) => String(row.SEQ) === String(selectedSeq),
        );

        if (tFromIndex < 0) {
            return {
                rows,
                selectedRows: [],
            };
        }

        const [tMovedRow] = tRows.splice(tFromIndex, 1);
        const tBoundedIndex = Math.max(0, Math.min(targetIndex, tRows.length));
        tRows.splice(tBoundedIndex, 0, tMovedRow);

        const tResequencedRows = resequenceProdMemRows(tRows);
        return {
            rows: tResequencedRows,
            selectedRows: [tResequencedRows[tBoundedIndex]],
        };
    };

    const isFailedCodeResult = (data) =>
        data.length > 0 &&
        typeof data[0].CODE !== "undefined" &&
        !data[0].CODE.includes("SUCC");

    const showActionToast = (detail) => {
        toast.current?.show({
            severity: "success",
            summary: "Success",
            detail,
            life: 3000,
        });
    };

    const getFriendlyActionErrorMessage = (code) => {
        const tCode = String(code || "");
        if (tCode.includes("ERROR:Same material exist")) {
            return "동일한 자재/사이즈/비고 조합이 이미 존재합니다.<br><br>The same material/use-size/remark combination already exists.";
        }
        return tCode || "작업 중 오류가 발생했습니다.<br><br>An error occurred while processing.";
    };

    // DATAGRID CODE : TBL_KCD_MATL_MST
    const addMaterial = () => {
        var tCheck = 0;
        if (typeof dataTBL_KSV_PROD_MEM.MATL_CD !== "undefined") {
            if (typeof dataTBL_KSV_PROD_MEM.MATL_CD !== "") {
                tCheck = 1;
            }
        }

        if (tCheck === 0) {
            alert("변경할 소스 Matl을 선택하세요<br><br>Select the source Matl to change");
            return;
        }

        if (selectedTBL_KCD_MATL_MST.length <= 0) {
            alert("변경할 대상 Matl을 선택하세요<br><br>Select Matl to change");
            return;
        }

        // 중복 체크 로직 추가
        /*
        const currentMatlCd = dataTBL_KSV_PROD_MEM.MATL_CD;
        const currentRemark = dataEDT_KSV_PROD_MEM.REMARK || "";
        */
        const currentMatlCd = selectedTBL_KCD_MATL_MST[0].MATL_CD;
        const currentRemark = refEDT_TEXT.current.REMARK || "";
        const currentUseSize = refEDT_TEXT.current.USE_SIZE || "";

        const isDuplicate = datasTBL_KSV_PROD_MEM.some(
            (item) =>
                item.MATL_CD === currentMatlCd && item.REMARK === currentRemark && item.USE_SIZE === currentUseSize,
        );

        if (isDuplicate) {
            alert("같은 항목은 중복으로 입력할수 없습니다.<br><br>The same item cannot be entered repeatedly.");
            return;
        }

        var tEdit = getEDT();
        const normalizeNumberInput = (value) => {
            if (value === null || typeof value === "undefined") return "0";
            const str = String(value).trim();
            if (str === "") return "0";
            return isNaN(parseFloat(str)) ? "0" : str;
        };
        var tNet = normalizeNumberInput(tEdit.NET);
        var tLoss = normalizeNumberInput(tEdit.LOSS);

        var tObjArray = [...datasTBL_KSV_PROD_MEM];
        var tInArray = [];

        var tUseSizeArray = [];
        if (tEdit.USE_SIZE && tEdit.USE_SIZE !== "") {
            tUseSizeArray = tEdit.USE_SIZE.split(/,/);
        }

        selectedTBL_KCD_MATL_MST.forEach((col, i) => {
            var el = { ...col };
            var tObj = { ...emptyTBL_KSV_PROD_MEM };
            tObj.COLOR = el.COLOR;
            tObj.SPEC = el.SPEC;
            tObj.MATL_PRICE = el.MATL_PRICE;
            tObj.CURR_CD = el.CURR_CD;
            tObj.UNIT = el.UNIT;
            tObj.VENDOR_CD = el.VENDOR_CD;
            tObj.MATL_CD = el.MATL_CD;
            tObj.STD_NET = tNet;
            tObj.STD_LOSS = tLoss;
            tObj.ADD_LOSS = normalizeNumberInput(el.ADD_LOSS);
            tObj.STD_GROSS =
                parseFloat(tNet) +
                parseFloat(tNet) *
                    (parseFloat(tLoss) + parseFloat(tObj.ADD_LOSS)) *
                    0.01;
            tObj.STD_GROSS = String(tObj.STD_GROSS);
            tObj.PROD_CD = selectedTBL_KSV_PROD_MST[0].PROD_CD;
            tObj.MATL_NAME = el.MATL_NAME;
            tObj.MATL_TYPE2 = el.MATL_TYPE2;
            // tObj.DL_FLAG = selectedTBL_KCD_STYLE[0].DL;
            tObj.DL_FLAG = "";
            tObj.NET = tNet;
            tObj.LOSS = tLoss;
            tObj.GROSS =
                parseFloat(tNet) +
                parseFloat(tNet) *
                    (parseFloat(tLoss) + parseFloat(tObj.ADD_LOSS)) *
                    0.01;
            tObj.GROSS = String(tObj.GROSS);
            tObj.SEQ = "0";
            if (tUseSizeArray.length <= 0) tObj.USE_SIZE = "";
            else tObj.USE_SIZE = tUseSizeArray[0];
            tObj.REMARK = tEdit.REMARK || "";
            tInArray.push(tObj);

            var i = 0;
            for (i = 1; i < tUseSizeArray.length; i++) {
                var tObj1 = { ...tObj };
                tObj1.USE_SIZE = tUseSizeArray[i];
                tInArray.push(tObj1);
            }
        });

        // console.log('Add Material(1)=>' + tObjArray.length);
        var tAddPosition = { ...dataTBL_KSV_PROD_MEM };
        if (selectedTBL_KSV_PROD_MEM.length > 0) {
            tAddPosition = {
                ...selectedTBL_KSV_PROD_MEM[
                    selectedTBL_KSV_PROD_MEM.length - 1
                ],
            };
        } else {
            if (datasTBL_KSV_PROD_MEM.length <= 0) {
                var tTempObj = { ...emptyTBL_KSV_PROD_MEM };
                tTempObj.SEQ = "0";
                tAddPosition = { ...tTempObj };
            } else {
                tAddPosition = {
                    ...datasTBL_KSV_PROD_MEM[datasTBL_KSV_PROD_MEM.length - 1],
                };
            }
        }
        delete tAddPosition.__typename;
        delete tAddPosition.__ROW_KEY;
        var tAddPosition1 = { ...tAddPosition };

        //
        var tProdCds = [];
        var tEdit = getEDT();
        if (tEdit.ALL_COLOR_FLAG === "1") {
            datasTBL_KSV_PROD_MST.forEach((col, i) => {
                var tObj = {};
                tObj.PROD_CD = col.PROD_CD;
                tProdCds.push(tObj);
            });
        } else {
            var tObj = {};
            tObj.PROD_CD = selectedTBL_KSV_PROD_MST[0].PROD_CD;
            tProdCds.push(tObj);
        }

        const tInsertAfterSeq =
            selectedTBL_KSV_PROD_MEM.length > 0
                ? Math.max(
                      ...selectedTBL_KSV_PROD_MEM.map((row) =>
                          parseInt(row.SEQ) || 0,
                      ),
                  )
                : parseInt(
                      datasTBL_KSV_PROD_MEM[datasTBL_KSV_PROD_MEM.length - 1]
                          ?.SEQ,
                  ) || 0;

        const tInsertAtIndex =
            tInsertAfterSeq <= 0
                ? datasTBL_KSV_PROD_MEM.length
                : Math.max(
                      0,
                      datasTBL_KSV_PROD_MEM.findIndex(
                          (row) =>
                              (parseInt(row.SEQ) || 0) === tInsertAfterSeq,
                      ) + 1,
                  );

        const tLocalAddRows = tInArray.map((row) => ({
            ...row,
            VENDOR_NAME:
                selectedTBL_KCD_MATL_MST.find(
                    (matl) => matl.MATL_CD === row.MATL_CD,
                )?.VENDOR_NAME || "",
            S_FLAG: "1",
        }));

        const tLocalRows = [...datasTBL_KSV_PROD_MEM];
        tLocalRows.splice(tInsertAtIndex, 0, ...tLocalAddRows);

        const tResequencedLocalRows = resequenceProdMemRows(tLocalRows);
        const tSelectedLocalRows = tResequencedLocalRows.slice(
            tInsertAtIndex,
            tInsertAtIndex + tLocalAddRows.length,
        );

        setDatasTBL_KSV_PROD_MEM(tResequencedLocalRows);
        setSelectedTBL_KSV_PROD_MEM(tSelectedLocalRows);
        setDataETC_ROW_COUNT(tResequencedLocalRows.length);

        setLoadingTBL_KSV_PROD_MEM(true);
        serviceS0303_MRP_RECORD_STYLE
            .mgrInsert_ALL_ADD_MATERIAL(tInArray, tProdCds, tAddPosition1)
            .then((data) => {
                setLoadingTBL_KSV_PROD_MEM(false);
                if (typeof data.graphQLErrors === "undefined") {
                    if (!isFailedCodeResult(data)) {
                        console.log(
                            "ServiceS0303_MRP_RECORD_STYLE.mgrInsertEDT_KSV_PROD_MEM() call => " +
                                data.length,
                        );
                        /*
                        onRowClick1TBL_KSV_PROD_MST(
                            selectedTBL_KSV_PROD_MST[0],
                            { preserveScroll: true },
                        );
                        */
                        //searchTBL_KCD_MATL_MST();
                        showActionToast("Material added successfully.");
                    } else {
                        alert(data[0].CODE);
                    }
                } else {
                    console.log(
                        "ServiceNawooAll.mgrInsertS0303_MRP_RECORD_STYLE( error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });
    };

    const updateMaterial = () => {
        var tInArray0 = [...datasTBL_KSV_PROD_MEM];
        var tInArray = [];
        tInArray0.forEach((col, i) => {
            var tObj = { ...col };

            delete tObj.__typename;
            delete tObj.__ROW_KEY;
            tInArray.push(tObj);
        });
        var tAddPosition = {};

        var tProdCds = [];
        var tEdit = getEDT();

        if (tEdit.ALL_COLOR_FLAG === "1") {
            datasTBL_KSV_PROD_MST.forEach((col, i) => {
                var tObj = {};
                tObj.PROD_CD = col.PROD_CD;
                tProdCds.push(tObj);
            });
        } else {
            var tObj = {};
            tObj.PROD_CD = selectedTBL_KSV_PROD_MST[0].PROD_CD;
            tProdCds.push(tObj);
        }

        setLoadingTBL_KSV_PROD_MEM(true);
        serviceS0303_MRP_RECORD_STYLE
            .mgrInsert_ALL_UPDATE_MATERIAL(tInArray, tProdCds, tAddPosition)
            .then((data) => {
                setLoadingTBL_KSV_PROD_MEM(false);
                if (typeof data.graphQLErrors === "undefined") {
                    if (isFailedCodeResult(data)) {
                        alert(data[0].CODE);
                    } else {
                        showActionToast("Material updated successfully.");
                    }
                } else {
                    // var tStr = data.graphQLErrors[0].message;
                    console.log(
                        "ServiceNawooAll.mgrInsertS0303_MRP_RECORD_STYLE( error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });
    };

    const updateMaterial_net_loss = async () => {
        await flushPendingEditsBeforeAction();
        var tEdit = getEDT();
        if (tEdit.ALL_FLAG === "1") {
            if (
                await confirm(
                    "전체 Material에 동일하게 적용됩니다. 진행하시겠습니까?<br><br>It will be applied the same to all materials. Do you want to proceed?",
                )
            ) {
                updateMaterial_net_loss_sub();
            }
        } else {
            updateMaterial_net_loss_sub();
        }
    };

    const updateMaterial_net_loss_sub = () => {
        if (selectedTBL_KSV_PROD_MST.length <= 0) {
            console.warn("No color selected for Net/Loss update");
            return;
        }

        var tEdit = getEDT();
        const latestDatas = datasTBL_KSV_PROD_MEMRef.current;
        const latestSelected = selectedTBL_KSV_PROD_MEMRef.current;

        // Capture any inline cell edits that may not have flushed to state yet.
        const domOverrides = {};
        document
            .querySelectorAll('input[data-table="KSV_PROD_MEM"][data-seq][data-field]')
            .forEach((inp) => {
                const seq = inp.dataset.seq;
                const field = inp.dataset.field;
                if (!domOverrides[seq]) domOverrides[seq] = {};
                domOverrides[seq][field] = inp.value;
            });

        const applyOverrides = (row) => {
            const ov = domOverrides[String(row.SEQ)];
            return ov ? { ...row, ...ov } : row;
        };

        // For selected-row updates, preserve each row's edited NET/LOSS values.
        // Form NET/LOSS inputs are used only for ALL update mode.
        const rowEdit =
            tEdit.ALL_FLAG === "1"
                ? tEdit
                : { ...tEdit, NET: "", LOSS: "" };

        if (latestSelected.length <= 0) {
            if (tEdit.ALL_FLAG !== "1") return;
        }

        var tInArray = [];
        if (tEdit.ALL_FLAG === "1") {
            latestDatas.forEach((col, i) => {
                var tObj = { ...applyOverrides(col) };
                if (rowEdit.STD_FLAG === "1") {
                    if (rowEdit.NET !== "") {
                        tObj.STD_NET = rowEdit.NET;
                        tObj.NET = rowEdit.NET;
                    }
                    if (rowEdit.LOSS !== "") {
                        tObj.STD_LOSS = rowEdit.LOSS;
                        tObj.LOSS = rowEdit.LOSS;
                    }
                    tObj.STD_GROSS =
                        parseFloat(tObj.STD_NET) +
                        parseFloat(tObj.STD_NET) *
                            (parseFloat(tObj.STD_LOSS) +
                                parseFloat(tObj.ADD_LOSS)) *
                            0.01;
                    tObj.STD_GROSS = String(tObj.STD_GROSS);
                    tObj.GROSS =
                        parseFloat(tObj.NET) +
                        parseFloat(tObj.NET) *
                            (parseFloat(tObj.LOSS) +
                                parseFloat(tObj.ADD_LOSS)) *
                            0.01;
                    tObj.GROSS = String(tObj.GROSS);
                } else {
                    if (rowEdit.NET !== "") tObj.NET = rowEdit.NET;
                    if (rowEdit.LOSS !== "") tObj.LOSS = rowEdit.LOSS;
                    tObj.GROSS =
                        parseFloat(tObj.NET) +
                        parseFloat(tObj.NET) *
                            (parseFloat(tObj.LOSS) +
                                parseFloat(tObj.ADD_LOSS)) *
                            0.01;
                    tObj.GROSS = String(tObj.GROSS);
                }
                tInArray.push(sanitizeProdMemPayload(tObj));
            });
        } else {
            latestSelected.forEach((col, i) => {
                const fullRow =
                    latestDatas.find((r) => String(r.SEQ) === String(col.SEQ)) || col;
                var tObj = { ...applyOverrides(fullRow) };
                if (rowEdit.STD_FLAG === "1") {
                    if (rowEdit.NET !== "") {
                        tObj.STD_NET = rowEdit.NET;
                        tObj.NET = rowEdit.NET;
                    }
                    if (rowEdit.LOSS !== "") {
                        tObj.STD_LOSS = rowEdit.LOSS;
                        tObj.LOSS = rowEdit.LOSS;
                    }
                    tObj.STD_GROSS =
                        parseFloat(tObj.STD_NET) +
                        parseFloat(tObj.STD_NET) *
                            (parseFloat(tObj.STD_LOSS) +
                                parseFloat(tObj.ADD_LOSS)) *
                            0.01;
                    tObj.STD_GROSS = String(tObj.STD_GROSS);
                    tObj.GROSS =
                        parseFloat(tObj.NET) +
                        parseFloat(tObj.NET) *
                            (parseFloat(tObj.LOSS) +
                                parseFloat(tObj.ADD_LOSS)) *
                            0.01;
                    tObj.GROSS = String(tObj.GROSS);
                } else {
                    if (rowEdit.NET !== "") tObj.NET = rowEdit.NET;
                    if (rowEdit.LOSS !== "") tObj.LOSS = rowEdit.LOSS;
                    tObj.GROSS =
                        parseFloat(tObj.NET) +
                        parseFloat(tObj.NET) *
                            (parseFloat(tObj.LOSS) +
                                parseFloat(tObj.ADD_LOSS)) *
                            0.01;
                    tObj.GROSS = String(tObj.GROSS);
                }
                tInArray.push(sanitizeProdMemPayload(tObj));
            });
        }

        // datas2 must include the latest text inputs from refEDT_TEXT (NET/LOSS).
        let tAddPosition = { ...getEDT() };
        if (tEdit.ALL_FLAG !== "1") {
            // S0303 mutation prioritizes datas2.NET/LOSS over each row value.
            // For selected-row save, clear them so row-level edited values are used.
            tAddPosition = {
                ...tAddPosition,
                NET: "",
                LOSS: "",
            };
        }

        var tProdCds = [];
        var tEdit = getEDT();
        if (tEdit.ALL_COLOR_FLAG === "1") {
            datasTBL_KSV_PROD_MST.forEach((col, i) => {
                var tObj = {};
                tObj.PROD_CD = col.PROD_CD;
                tProdCds.push(tObj);
            });
        } else {
            var tObj = {};
            tObj.PROD_CD = selectedTBL_KSV_PROD_MST[0].PROD_CD;
            tProdCds.push(tObj);
        }

        setLoadingTBL_KSV_PROD_MEM(true);
        serviceS0303_MRP_RECORD_STYLE
            .mgrInsert_ALL_UPDATE_MATERIAL_NET_LOSS(
                tInArray,
                tProdCds,
                tAddPosition,
            )
            .then((data) => {
                setLoadingTBL_KSV_PROD_MEM(false);
                if (typeof data.graphQLErrors === "undefined") {
                    setSelectedTBL_KCD_MATL_MST([]);
                    // Search
                    var tObj = {};
                    tObj.PROD_CD = selectedTBL_KSV_PROD_MST[0].PROD_CD;
                    tObj.DL_FLAG = "";
                    search_PROD_MEM(tObj);
                } else {
                    // var tStr = data.graphQLErrors[0].message;
                    console.log(
                        "ServiceNawooAll.mgrInsertS0303_MRP_RECORD_STYLE( error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });
    };

    const updateMaterial_size_loss = async () => {
        if (selectedTBL_KSV_PROD_MST.length <= 0) {
            alert("작업할 color를 선택하세요<br><br>Select the color you want to work with");
            return;
        }

        var tInArray = [];
        var tAddPosition = {};

        // Use currently loaded rows first so edited SIZE_LOSS is not lost.
        let tProdRows = Array.isArray(datasTBL_KSV_PROD_MST)
            ? [...datasTBL_KSV_PROD_MST]
            : [];

        // Fallback to server refresh when local rows are empty.
        if (tProdRows.length <= 0) {
            const tStyleRow = getCurrentStyleRow();
            const tStyleCd = String(tStyleRow?.STYLE_CD || "");
            if (!tStyleCd) return;

            try {
                const tQueryResult =
                    await serviceS0303_MRP_RECORD_STYLE.mgrQueryTBL_KSV_PROD_MST({
                        STYLE_CD: tStyleCd,
                    });
                if (typeof tQueryResult?.graphQLErrors === "undefined") {
                    tProdRows = Array.isArray(tQueryResult) ? tQueryResult : [];
                }
            } catch (e) {
                console.log("updateMaterial_size_loss query error => " + e);
                return;
            }
        }

        var tProdCds = [];
        const tSeen = new Set();
        tProdRows.forEach((col) => {
            const tProdCd = String(col?.PROD_CD || "");
            if (!tProdCd || tSeen.has(tProdCd)) return;
            tSeen.add(tProdCd);
            var tObj = {};
            tObj.PROD_CD = tProdCd;
            tObj.SIZE_LOSS = col.SIZE_LOSS;
            tProdCds.push(tObj);
        });
        if (tProdCds.length <= 0) return;
        console.log("S0303 SL Update payload rows => " + tProdCds.length);

        setLoadingTBL_KSV_PROD_MEM(true);
        serviceS0303_MRP_RECORD_STYLE
            .mgrInsert_UPDATE_SIZE_LOSS(tInArray, tProdCds, tAddPosition)
            .then((data) => {
                setLoadingTBL_KSV_PROD_MEM(false);
                if (typeof data.graphQLErrors === "undefined") {
                    setSelectedTBL_KSV_PROD_MST([]);
                    if (data.length > 0) {
                        alert(data[0].CODE);
                        const tStyleRow = getCurrentStyleRow();
                        if (tStyleRow?.STYLE_CD) {
                            onRowClick1TBL_KCD_STYLE(tStyleRow);
                        }
                    }
                } else {
                    // var tStr = data.graphQLErrors[0].message;
                    console.log(
                        "ServiceNawooAll.mgrInsertS0303_MRP_RECORD_STYLE( error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });
    };

    const updateMaterial_change_vendor = () => {
        if (selectedTBL_KSV_PROD_MST.length <= 0) {
            alert("작업할 color를 선택하세요<br><br>Select the color you want to work with");
            return;
        }

        var tInArray = [];

        var tObj1 = { ...dataQRY_KCD_STYLE2_VENDOR_CD1 };
        var tObj1_1 = {};
        if (typeof tObj1.VENDOR_CD === "undefined") {
            tObj1_1.VENDOR_CD = "";
            tObj1_1.VENDOR_NAME = " ";
        } else {
            tObj1_1.VENDOR_CD = tObj1.VENDOR_CD;
            tObj1_1.VENDOR_NAME = tObj1.VENDOR_NAME;
        }
        tInArray.push(tObj1_1);

        var tObj2 = { ...dataQRY_KCD_STYLE2_VENDOR_CD2 };
        var tObj2_1 = {};
        tObj2_1.VENDOR_CD = tObj2.VENDOR_CD;
        tObj2_1.VENDOR_NAME = tObj2.VENDOR_NAME;
        tInArray.push(tObj2_1);

        var tAddPosition = {};

        //
        var tProdCds = [];
        var tEdit = getEDT();
        if (tEdit.ALL_COLOR_FLAG === "1") {
            datasTBL_KSV_PROD_MST.forEach((col, i) => {
                var tObj = {};
                tObj.PROD_CD = col.PROD_CD;
                tProdCds.push(tObj);
            });
        } else {
            var tObj = {};
            tObj.PROD_CD = selectedTBL_KSV_PROD_MST[0].PROD_CD;
            tProdCds.push(tObj);
        }

        //
        var tProdMems = [];
        selectedTBL_KSV_PROD_MEM.forEach((col, i) => {
            var tObj = { ...col };
            if (typeof tObj.id !== "undefined") delete tObj.id;
            if (typeof tObj.__typename !== "undefined") delete tObj.__typename;
            if (typeof tObj.__ROW_KEY !== "undefined") delete tObj.__ROW_KEY;
            delete tObj.SALES_CURR_CD;
            delete tObj.SALES_MATL_PRICE;
            tProdMems.push(tObj);
        });

        setLoadingTBL_KSV_PROD_MEM(true);
        serviceS0303_MRP_RECORD_STYLE
            .mgrInsert_CHANGE_VENDOR(tInArray, tProdCds, tProdMems)
            .then((data) => {
                setLoadingTBL_KSV_PROD_MEM(false);
                if (typeof data.graphQLErrors === "undefined") {
                    var tObj = {};
                    tObj.PROD_CD = selectedTBL_KSV_PROD_MST[0].PROD_CD;
                    tObj.DL_FLAG = "";
                    search_PROD_MEM(tObj);
                } else {
                    // var tStr = data.graphQLErrors[0].message;
                    console.log(
                        "ServiceNawooAll.mgrInsertS0303_MRP_RECORD_STYLE( error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });
    };

    const updateMaterial_move_up = () => {
        if (selectedTBL_KSV_PROD_MST.length <= 0) {
            alert("작업할 color를 선택하세요<br><br>Select the color you want to work with");
            return;
        }

        var tEdit = getEDT();

        if (selectedTBL_KSV_PROD_MEM.length !== 1) {
            alert("이동할 자재를 1개만 선택하세요<br><br>Please select only 1 material to move");
            return;
        }
        if (parseInt(selectedTBL_KSV_PROD_MEM[0].SEQ) === 1) {
            alert("첫번째 자재는 이동 할 수 없습니다 <br><br>The first material cannot be moved");
            return;
        }

        var tInArray = [];
        var tSelObj = { ...selectedTBL_KSV_PROD_MEM[0] };
        delete tSelObj.__typename;
        delete tSelObj.__ROW_KEY;
        tInArray.push(tSelObj);

        var tAddPosition = { ...dataEDT_KSV_PROD_MEM };
        tAddPosition.IS_TOP = "0";
        tAddPosition.MOVE_CNT = dataETC_MOVE_COUNT;
        //
        var tProdCds = [{ PROD_CD: selectedTBL_KSV_PROD_MST[0].PROD_CD }];

        const tMoveCnt = Math.max(1, parseInt(dataETC_MOVE_COUNT) || 1);
        const tCurrentIndex = datasTBL_KSV_PROD_MEM.findIndex(
            (row) =>
                String(row.SEQ) === String(selectedTBL_KSV_PROD_MEM[0].SEQ),
        );
        const tTargetIndex = Math.max(0, tCurrentIndex - tMoveCnt);
        const tLocalMoved = applyMoveToRows(
            datasTBL_KSV_PROD_MEM,
            selectedTBL_KSV_PROD_MEM[0].SEQ,
            tTargetIndex,
        );

        setDatasTBL_KSV_PROD_MEM(tLocalMoved.rows);
        setSelectedTBL_KSV_PROD_MEM(tLocalMoved.selectedRows);
        setDataETC_ROW_COUNT(tLocalMoved.rows.length);

        setLoadingTBL_KSV_PROD_MEM(true);
        serviceS0303_MRP_RECORD_STYLE
            .mgrInsert_ALL_UPDATE_MATERIAL_MOVE_UP(
                tInArray,
                tProdCds,
                tAddPosition,
            )
            .then((data) => {
                setLoadingTBL_KSV_PROD_MEM(false);
                if (typeof data.graphQLErrors === "undefined") {
                    if (
                        data.length > 0 &&
                        typeof data[0].CODE !== "undefined" &&
                        !data[0].CODE.includes("SUCC")
                    ) {
                        alert(data[0].CODE);
                    }
                } else {
                    // var tStr = data.graphQLErrors[0].message;
                    console.log(
                        "ServiceNawooAll.mgrInsertS0303_MRP_RECORD_STYLE( error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });
    };
    const updateMaterial_move_up_first = () => {
        if (selectedTBL_KSV_PROD_MST.length <= 0) {
            alert("작업할 color를 선택하세요<br><br>Select the color you want to work with");
            return;
        }

        var tEdit = getEDT();

        if (selectedTBL_KSV_PROD_MEM.length !== 1) {
            alert("이동할 자재를 1개만 선택하세요<br><br>Please select only 1 material to move");
            return;
        }
        if (parseInt(selectedTBL_KSV_PROD_MEM[0].SEQ) === 1) {
            alert("첫번째 자재는 이동 할 수 없습니다 <br><br>The first material cannot be moved");
            return;
        }

        var tInArray = [];
        var tSelObj = { ...selectedTBL_KSV_PROD_MEM[0] };
        delete tSelObj.__typename;
        delete tSelObj.__ROW_KEY;
        tInArray.push(tSelObj);

        var tAddPosition = { ...dataEDT_KSV_PROD_MEM };
        tAddPosition.IS_TOP = "1";
        tAddPosition.MOVE_CNT = "1";

        //
        var tProdCds = [{ PROD_CD: selectedTBL_KSV_PROD_MST[0].PROD_CD }];

        const tLocalMoved = applyMoveToRows(
            datasTBL_KSV_PROD_MEM,
            selectedTBL_KSV_PROD_MEM[0].SEQ,
            0,
        );

        setDatasTBL_KSV_PROD_MEM(tLocalMoved.rows);
        setSelectedTBL_KSV_PROD_MEM(tLocalMoved.selectedRows);
        setDataETC_ROW_COUNT(tLocalMoved.rows.length);

        setLoadingTBL_KSV_PROD_MEM(true);
        serviceS0303_MRP_RECORD_STYLE
            .mgrInsert_ALL_UPDATE_MATERIAL_MOVE_UP(
                tInArray,
                tProdCds,
                tAddPosition,
            )
            .then((data) => {
                setLoadingTBL_KSV_PROD_MEM(false);
                if (typeof data.graphQLErrors === "undefined") {
                    if (
                        data.length > 0 &&
                        typeof data[0].CODE !== "undefined" &&
                        !data[0].CODE.includes("SUCC")
                    ) {
                        alert(data[0].CODE);
                    }
                } else {
                    // var tStr = data.graphQLErrors[0].message;
                    console.log(
                        "ServiceNawooAll.mgrInsertS0303_MRP_RECORD_STYLE( error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });
    };

    const updateMaterial_move_down = () => {
        if (selectedTBL_KSV_PROD_MST.length <= 0) {
            alert("작업할 color를 선택하세요<br><br>Select the color you want to work with");
            return;
        }

        var tEdit = getEDT();

        if (selectedTBL_KSV_PROD_MEM.length !== 1) {
            alert("이동할 자재를 1개만 선택하세요<br><br>Please select only 1 material to move");
            return;
        }
        if (
            parseInt(selectedTBL_KSV_PROD_MEM[0].SEQ) ===
            datasTBL_KSV_PROD_MEM.length
        ) {
            alert("마지막  자재는 이동 할 수 없습니다 <br><br>The last material cannot be moved");
            return;
        }

        var tInArray = [];
        var tSelObj = { ...selectedTBL_KSV_PROD_MEM[0] };
        delete tSelObj.__typename;
        delete tSelObj.__ROW_KEY;
        tInArray.push(tSelObj);

        var tAddPosition = { ...dataEDT_KSV_PROD_MEM };
        tAddPosition.IS_BOTTOM = "0";
        tAddPosition.MOVE_CNT = dataETC_MOVE_COUNT;

        //
        var tProdCds = [{ PROD_CD: selectedTBL_KSV_PROD_MST[0].PROD_CD }];

        const tMoveCnt = Math.max(1, parseInt(dataETC_MOVE_COUNT) || 1);
        const tCurrentIndex = datasTBL_KSV_PROD_MEM.findIndex(
            (row) =>
                String(row.SEQ) === String(selectedTBL_KSV_PROD_MEM[0].SEQ),
        );
        const tTargetIndex = Math.min(
            datasTBL_KSV_PROD_MEM.length - 1,
            tCurrentIndex + tMoveCnt,
        );
        const tLocalMoved = applyMoveToRows(
            datasTBL_KSV_PROD_MEM,
            selectedTBL_KSV_PROD_MEM[0].SEQ,
            tTargetIndex,
        );

        setDatasTBL_KSV_PROD_MEM(tLocalMoved.rows);
        setSelectedTBL_KSV_PROD_MEM(tLocalMoved.selectedRows);
        setDataETC_ROW_COUNT(tLocalMoved.rows.length);

        setLoadingTBL_KSV_PROD_MEM(true);
        serviceS0303_MRP_RECORD_STYLE
            .mgrInsert_ALL_UPDATE_MATERIAL_MOVE_DOWN(
                tInArray,
                tProdCds,
                tAddPosition,
            )
            .then((data) => {
                setLoadingTBL_KSV_PROD_MEM(false);
                if (typeof data.graphQLErrors === "undefined") {
                    if (
                        data.length > 0 &&
                        typeof data[0].CODE !== "undefined" &&
                        !data[0].CODE.includes("SUCC")
                    ) {
                        alert(data[0].CODE);
                    }
                } else {
                    // var tStr = data.graphQLErrors[0].message;
                    console.log(
                        "ServiceNawooAll.mgrInsertS0303_MRP_RECORD_STYLE( error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });
    };

    const updateMaterial_move_down_bottom = () => {
        if (selectedTBL_KSV_PROD_MST.length <= 0) {
            alert("작업할 color를 선택하세요<br><br>Select the color you want to work with");
            return;
        }

        var tEdit = getEDT();

        if (selectedTBL_KSV_PROD_MEM.length !== 1) {
            alert("이동할 자재를 1개만 선택하세요<br><br>Please select only 1 material to move");
            return;
        }
        if (
            parseInt(selectedTBL_KSV_PROD_MEM[0].SEQ) ===
            datasTBL_KSV_PROD_MEM.length
        ) {
            alert("마지막  자재는 이동 할 수 없습니다 <br><br>The last material cannot be moved");
            return;
        }

        var tInArray = [];
        var tSelObj = { ...selectedTBL_KSV_PROD_MEM[0] };
        delete tSelObj.__typename;
        delete tSelObj.__ROW_KEY;
        tInArray.push(tSelObj);

        var tAddPosition = { ...dataEDT_KSV_PROD_MEM };
        tAddPosition.IS_BOTTOM = "1";
        tAddPosition.MOVE_CNT = dataETC_MOVE_COUNT;

        //
        var tProdCds = [{ PROD_CD: selectedTBL_KSV_PROD_MST[0].PROD_CD }];

        const tLocalMoved = applyMoveToRows(
            datasTBL_KSV_PROD_MEM,
            selectedTBL_KSV_PROD_MEM[0].SEQ,
            datasTBL_KSV_PROD_MEM.length - 1,
        );

        setDatasTBL_KSV_PROD_MEM(tLocalMoved.rows);
        setSelectedTBL_KSV_PROD_MEM(tLocalMoved.selectedRows);
        setDataETC_ROW_COUNT(tLocalMoved.rows.length);

        setLoadingTBL_KSV_PROD_MEM(true);
        serviceS0303_MRP_RECORD_STYLE
            .mgrInsert_ALL_UPDATE_MATERIAL_MOVE_DOWN(
                tInArray,
                tProdCds,
                tAddPosition,
            )
            .then((data) => {
                setLoadingTBL_KSV_PROD_MEM(false);
                if (typeof data.graphQLErrors === "undefined") {
                    if (
                        data.length > 0 &&
                        typeof data[0].CODE !== "undefined" &&
                        !data[0].CODE.includes("SUCC")
                    ) {
                        alert(data[0].CODE);
                    }
                } else {
                    // var tStr = data.graphQLErrors[0].message;
                    console.log(
                        "ServiceNawooAll.mgrInsertS0303_MRP_RECORD_STYLE( error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });
    };

    const updateMaterial_size_usage = async () => {
        await flushPendingEditsBeforeAction();
        var tEdit = getEDT();
        if (tEdit.ALL_FLAG === "1") {
            if (
                await confirm(
                    "전체 Material에 동일하게 적용됩니다. 진행하시겠습니까?<br><br>It will be applied the same to all materials. Do you want to proceed?",
                )
            ) {
                updateMaterial_size_usage_sub();
            }
        } else {
            updateMaterial_size_usage_sub();
        }
    };

    const updateMaterial_size_usage_sub = () => {
        if (selectedTBL_KSV_PROD_MST.length <= 0) {
            alert("작업할 color를 선택하세요<br><br>Select the color you want to work with");
            return;
        }

        var tEdit = getEDT();

        if (selectedTBL_KSV_PROD_MEM.length <= 0) {
            if (tEdit.ALL_FLAG !== "1") return;
        }

        var tInArray = [];
        if (tEdit.ALL_FLAG === "1") {
            datasTBL_KSV_PROD_MEM.forEach((col, i) => {
                var tObj = { ...col };
                tInArray.push(sanitizeProdMemPayload(tObj));
            });
        } else {
            selectedTBL_KSV_PROD_MEM.forEach((col, i) => {
                var tObj = { ...col };
                tInArray.push(sanitizeProdMemPayload(tObj));
            });
        }

        // Prevent PK collisions (KSV_PROD_MEM_PK) before sending update.
        const tSelectedSeqSet = new Set(
            selectedTBL_KSV_PROD_MEM.map((row) => String(row.SEQ)),
        );
        const tWillApplyAll = tEdit.ALL_FLAG === "1";
        const tNextRows = datasTBL_KSV_PROD_MEM.map((row) => {
            const tWillApplyToRow =
                tWillApplyAll || tSelectedSeqSet.has(String(row.SEQ));
            if (!tWillApplyToRow) return row;

            return {
                ...row,
                USE_SIZE:
                    tEdit.USE_SIZE !== "" && typeof tEdit.USE_SIZE !== "undefined"
                        ? tEdit.USE_SIZE
                        : row.USE_SIZE,
                REMARK:
                    tEdit.REMARK !== "" && typeof tEdit.REMARK !== "undefined"
                        ? tEdit.REMARK
                        : row.REMARK,
            };
        });

        const tSeenKeyMap = new Map();
        const tDupRows = [];
        tNextRows.forEach((row) => {
            const tKey = [
                String(row.PROD_CD || selectedTBL_KSV_PROD_MST?.[0]?.PROD_CD || ""),
                String(row.MATL_CD || ""),
                String(row.USE_SIZE || ""),
                String(row.REMARK || ""),
            ].join("||");

            if (tSeenKeyMap.has(tKey)) {
                tDupRows.push(row);
            } else {
                tSeenKeyMap.set(tKey, true);
            }
        });

        if (tDupRows.length > 0) {
            alert(
                "중복 키가 발생하여 저장할 수 없습니다. (MATL# + USE SIZE + USAGE)\n\n"
                    + "Cannot save because duplicate key would be created. (MATL# + USE SIZE + USAGE)",
            );
            return;
        }

        console.log("updateMaterial_size_usage - tInArray:", tInArray);
        console.log("updateMaterial_size_usage - tEdit:", tEdit);

        // Use edit panel values (getEDT) so Chg Size/Usage sends updated input values.
        var tAddPosition = { ...tEdit };

        //
        var tProdCds = [];
        if (tEdit.ALL_COLOR_FLAG === "1") {
            datasTBL_KSV_PROD_MST.forEach((col, i) => {
                var tObj = {};
                tObj.PROD_CD = col.PROD_CD;
                tProdCds.push(tObj);
            });
        } else {
            var tObj = {};
            tObj.PROD_CD = selectedTBL_KSV_PROD_MST[0].PROD_CD;
            tProdCds.push(tObj);
        }

        console.log("updateMaterial_size_usage - tAddPosition:", tAddPosition);
        console.log("updateMaterial_size_usage - tProdCds:", tProdCds);

        setLoadingTBL_KSV_PROD_MEM(true);
        serviceS0303_MRP_RECORD_STYLE
            .mgrInsert_ALL_UPDATE_MATERIAL_SIZE_USAGE(
                tInArray,
                tProdCds,
                tAddPosition,
            )
            .then((data) => {
                setLoadingTBL_KSV_PROD_MEM(false);
                console.log("updateMaterial_size_usage - response:", data);
                if (typeof data.graphQLErrors === "undefined") {
                    setSelectedTBL_KCD_MATL_MST([]);
                    // Search
                    var tObj = {};
                    tObj.PROD_CD = selectedTBL_KSV_PROD_MST[0].PROD_CD;
                    tObj.DL_FLAG = "";
                    search_PROD_MEM(tObj);
                } else {
                    console.log(
                        "updateMaterial_size_usage error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });
    };

    const updateMaterial_std_loss_to_loss = async () => {
        var tEdit = getEDT();
        if (tEdit.ALL_FLAG === "1") {
            if (
                await confirm(
                    "전체 Material에 동일하게 적용됩니다. 진행하시겠습니까?<br><br>It will be applied the same to all materials. Do you want to proceed?",
                )
            ) {
                updateMaterial_std_loss_to_loss_sub();
            }
        } else {
            updateMaterial_std_loss_to_loss_sub();
        }
    };

    const updateMaterial_std_loss_to_loss_sub = () => {
        if (selectedTBL_KSV_PROD_MST.length <= 0) {
            alert("작업할 color를 선택하세요<br><br>Select the color you want to work with");
            return;
        }

        var tEdit = getEDT();

        if (selectedTBL_KSV_PROD_MEM.length <= 0) {
            if (tEdit.ALL_FLAG !== "1") return;
        }

        var tInArray = [];
        if (tEdit.ALL_FLAG === "1") {
            datasTBL_KSV_PROD_MEM.forEach((col, i) => {
                var tObj = { ...col };
                delete tObj.__typename;
                delete tObj.__ROW_KEY;
                tInArray.push(tObj);
            });
        } else {
            selectedTBL_KSV_PROD_MEM.forEach((col, i) => {
                var tObj = { ...col };
                delete tObj.__typename;
                delete tObj.__ROW_KEY;
                tInArray.push(tObj);
            });
        }

        var tAddPosition = { ...dataEDT_KSV_PROD_MEM };

        //
        var tProdCds = [];
        var tEdit = getEDT();
        if (tEdit.ALL_COLOR_FLAG === "1") {
            datasTBL_KSV_PROD_MST.forEach((col, i) => {
                var tObj = {};
                tObj.PROD_CD = col.PROD_CD;
                tProdCds.push(tObj);
            });
        } else {
            var tObj = {};
            tObj.PROD_CD = selectedTBL_KSV_PROD_MST[0].PROD_CD;
            tProdCds.push(tObj);
        }

        setLoadingTBL_KSV_PROD_MEM(true);
        serviceS0303_MRP_RECORD_STYLE
            .mgrInsert_ALL_UPDATE_MATERIAL_STD_LOSS_TO_LOSS(
                tInArray,
                tProdCds,
                tAddPosition,
            )
            .then((data) => {
                setLoadingTBL_KSV_PROD_MEM(false);
                if (typeof data.graphQLErrors === "undefined") {
                    setSelectedTBL_KCD_MATL_MST([]);
                    // Search
                    var tObj = {};
                    tObj.PROD_CD = selectedTBL_KSV_PROD_MST[0].PROD_CD;
                    tObj.DL_FLAG = "";
                    search_PROD_MEM(tObj);
                } else {
                    // var tStr = data.graphQLErrors[0].message;
                    console.log(
                        "ServiceNawooAll.mgrInsertS0303_MRP_RECORD_STYLE( error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });
    };

    const deleteMaterial = async () => {
        if (selectedTBL_KSV_PROD_MST.length <= 0) {
            alert("작업할 color를 선택하세요<br><br>Select the color you want to work with");
            return;
        }

        if (selectedTBL_KSV_PROD_MEM.length <= 0) return;

        if (!(await confirm("Delete selected material?"))) return;

        var tInArray0 = [...selectedTBL_KSV_PROD_MEM];
        var tInArray = [];
        tInArray0.forEach((col, i) => {
            var tObj = { ...col };
            delete tObj.__typename;
            delete tObj.__ROW_KEY;
            tInArray.push(tObj);
        });
        var tAddPosition = {};

        //
        var tProdCds = [];
        var tEdit = getEDT();
        if (tEdit.ALL_COLOR_FLAG === "1") {
            datasTBL_KSV_PROD_MST.forEach((col, i) => {
                var tObj = {};
                tObj.PROD_CD = col.PROD_CD;
                tProdCds.push(tObj);
            });
        } else {
            var tObj = {};
            tObj.PROD_CD = selectedTBL_KSV_PROD_MST[0].PROD_CD;
            tProdCds.push(tObj);
        }

        const tDeleteSeqSet = new Set(
            selectedTBL_KSV_PROD_MEM.map((row) => String(row.SEQ)),
        );
        const tMaxDeletedIndex = Math.max(
            ...datasTBL_KSV_PROD_MEM
                .map((row, idx) =>
                    tDeleteSeqSet.has(String(row.SEQ)) ? idx : -1,
                )
                .filter((idx) => idx >= 0),
        );
        const tLocalDeletedRows = resequenceProdMemRows(
            datasTBL_KSV_PROD_MEM.filter(
                (row) => !tDeleteSeqSet.has(String(row.SEQ)),
            ),
        );
        const tNextSelected =
            tLocalDeletedRows.length > 0
                ? [
                      tLocalDeletedRows[
                          Math.min(
                              tMaxDeletedIndex,
                              tLocalDeletedRows.length - 1,
                          )
                      ],
                  ]
                : [];
        setDatasTBL_KSV_PROD_MEM(tLocalDeletedRows);
        setSelectedTBL_KSV_PROD_MEM(tNextSelected);
        setDataETC_ROW_COUNT(tLocalDeletedRows.length);

        setLoadingTBL_KSV_PROD_MEM(true);
        serviceS0303_MRP_RECORD_STYLE
            .mgrInsert_ALL_DELETE_MATERIAL(tInArray, tProdCds, tAddPosition)
            .then((data) => {
                setLoadingTBL_KSV_PROD_MEM(false);
                if (typeof data.graphQLErrors === "undefined") {
                    if (isFailedCodeResult(data)) {
                        alert(data[0].CODE);
                    } else {
                        showActionToast("Material deleted successfully.");
                    }
                } else {
                    // var tStr = data.graphQLErrors[0].message;
                    console.log(
                        "ServiceNawooAll.mgrInsertS0303_MRP_RECORD_STYLE( error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });
    };

    const changeMaterial = () => {
        if (selectedTBL_KSV_PROD_MEM.length < 1) {
            alert("변경할 소스 Matl을 1개 이상 선택하세요<br><br>Select at least 1 source Matl to change");
            return;
        }

        if (selectedTBL_KCD_MATL_MST.length !== 1) {
            alert("변경할 대상 Matl을 1개만 선택하세요<br><br>Select exactly 1 target Matl to change");
            return;
        }

        const tTargetMatl = selectedTBL_KCD_MATL_MST[0];
        const tTargetSalesMatlPrice =
            typeof tTargetMatl?.S_MATL_PRICE !== "undefined"
                ? tTargetMatl.S_MATL_PRICE
                : tTargetMatl?.SALES_MATL_PRICE;
        const tTargetSalesCurrCd =
            typeof tTargetMatl?.S_CURR_CD !== "undefined"
                ? tTargetMatl.S_CURR_CD
                : tTargetMatl?.SALES_CURR_CD;

        var tInArray = [];
        // 선택된 모든 중앙테이블 행에 대해 변경 적용
        selectedTBL_KSV_PROD_MEM.forEach((selectedRow) => {
            var tObj = { ...selectedRow };
            delete tObj.__typename;
            delete tObj.__ROW_KEY;
            tObj.MATL_CD = tTargetMatl.MATL_CD;
            if (typeof tTargetSalesMatlPrice !== "undefined") {
                tObj.SALES_MATL_PRICE = tTargetSalesMatlPrice;
            }
            if (typeof tTargetSalesCurrCd !== "undefined") {
                tObj.SALES_CURR_CD = tTargetSalesCurrCd;
            }
            tInArray.push(tObj);
        });

        var tAddPosition = {};

        //
        var tProdCds = [];
        var tEdit = getEDT();
        if (tEdit.ALL_COLOR_FLAG === "1") {
            datasTBL_KSV_PROD_MST.forEach((col, i) => {
                var tObj = {};
                tObj.PROD_CD = col.PROD_CD;
                tProdCds.push(tObj);
            });
        } else {
            var tObj = {};
            tObj.PROD_CD = selectedTBL_KSV_PROD_MST[0].PROD_CD;
            tProdCds.push(tObj);
        }

        const tSelectedSeqSet = new Set(
            selectedTBL_KSV_PROD_MEM.map((row) => String(row.SEQ))
        );
        const tLocalChangedRows = datasTBL_KSV_PROD_MEM.map((row) => {
            if (!tSelectedSeqSet.has(String(row.SEQ))) return row;

            const tNextSalesMatlPrice =
                typeof tTargetSalesMatlPrice !== "undefined"
                    ? tTargetSalesMatlPrice
                    : row.SALES_MATL_PRICE;
            const tNextSalesCurrCd =
                typeof tTargetSalesCurrCd !== "undefined"
                    ? tTargetSalesCurrCd
                    : row.SALES_CURR_CD;

            return {
                ...row,
                MATL_CD: tTargetMatl.MATL_CD,
                MATL_NAME: tTargetMatl.MATL_NAME,
                COLOR: tTargetMatl.COLOR,
                SPEC: tTargetMatl.SPEC,
                MATL_PRICE: tTargetMatl.MATL_PRICE,
                CURR_CD: tTargetMatl.CURR_CD,
                UNIT: tTargetMatl.UNIT,
                VENDOR_CD: tTargetMatl.VENDOR_CD,
                VENDOR_NAME: tTargetMatl.VENDOR_NAME,
                ADD_LOSS:
                    tTargetMatl.ADD_LOSS === null ? "0" : tTargetMatl.ADD_LOSS,
                SALES_MATL_PRICE: tNextSalesMatlPrice,
                SALES_CURR_CD: tNextSalesCurrCd,
                S_FLAG: "1",
            };
        });
        const tLocalSelectedRows = tLocalChangedRows.filter(
            (row) => tSelectedSeqSet.has(String(row.SEQ))
        );

        setDatasTBL_KSV_PROD_MEM(tLocalChangedRows);
        setSelectedTBL_KSV_PROD_MEM(tLocalSelectedRows);
        setDataETC_ROW_COUNT(tLocalChangedRows.length);

        setLoadingTBL_KSV_PROD_MEM(true);
        serviceS0303_MRP_RECORD_STYLE
            .mgrInsert_ALL_CHANGE_MATERIAL(tInArray, tProdCds, tAddPosition)
            .then((data) => {
                setLoadingTBL_KSV_PROD_MEM(false);
                if (typeof data.graphQLErrors === "undefined") {
                    if (isFailedCodeResult(data)) {
                        alert(getFriendlyActionErrorMessage(data?.[0]?.CODE));
                    } else {
                        showActionToast("Material changed successfully.");
                    }
                } else {
                    // var tStr = data.graphQLErrors[0].message;
                    console.log(
                        "ServiceNawooAll.mgrInsertS0303_MRP_RECORD_STYLE( error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });
    };

    const onRowClick1TBL_KCD_MATL_MST = (argData0) => {
        var argData = {};

        if (typeof argData0.length !== "undefined") {
            argData = argData0[argData0.length - 1];
        } else {
            argData = argData0;
        }

        if (!argData) return;

        let argTBL_KCD_MATL_MST = argData;

        setDataTBL_KCD_MATL_MST(argTBL_KCD_MATL_MST);

        var tObj = { ...argData };
        var tArray = [];
        tArray.push(tObj);
        setDatasTBL_KCD_MATL_MST1(tArray);
        processPSearchStateRef.current = {
            keyword: "",
            lastKey: "",
            scopeKey: "",
        };
    };

    const onRowClickTBL_KCD_MATL_MST = (event) => {
        const t = event.originalEvent?.target;
        const isCheckbox = !!t?.closest(".p-checkbox");
        const isEditor = !!t?.closest(
            'input, textarea, select, .p-inputtext, .p-dropdown, [contenteditable="true"]',
        );

        if (!isCheckbox) {
            event.originalEvent?.preventDefault?.();
            event.originalEvent?.stopPropagation?.();
        }

        if (!isCheckbox && !isEditor && event?.data) {
            const clickedRow = event.data;
            const next = [clickedRow];
            setFlagSelectModeTBL_KCD_MATL_MST(true);
            setSelectedTBL_KCD_MATL_MST(next);
            onRowClick1TBL_KCD_MATL_MST(next);
        }

        processPSearchStateRef.current = {
            keyword: "",
            lastKey: "",
            scopeKey: "",
        };
    };

    const resetTBL_KCD_MATL_MST = () => {
        putQRY_KCD_MATL_MST(emptyQRY_KCD_MATL_MST);
        setDatasTBL_KCD_MATL_MST([]);
        setSelectedTBL_KCD_MATL_MST([]);
    };

    const processPSearchStateRef = useRef({
        keyword: "",
        lastKey: "",
        scopeKey: "",
    });

    const getProdMemScrollElement = () => {
        const tDtRef = dt_TBL_KSV_PROD_MEM?.current;

        const tRootElement =
            tDtRef?.container ||
            (typeof tDtRef?.getElement === "function"
                ? tDtRef.getElement()
                : null) ||
            tDtRef?.el ||
            null;

        if (!tRootElement) return null;

        let tScrollElement = tRootElement.querySelector(".p-virtualscroller");
        if (tScrollElement) return tScrollElement;

        tScrollElement = tRootElement.querySelector(".p-datatable-wrapper");
        if (tScrollElement) return tScrollElement;

        tScrollElement = tRootElement.querySelector(
            ".p-datatable-scrollable-body",
        );
        if (tScrollElement) return tScrollElement;

        return tRootElement.querySelector('[style*="overflow"]');
    };

    const saveProdMemScrollPosition = () => {
        const tScrollElement = getProdMemScrollElement();
        if (!tScrollElement) return;
        prodMemScrollTopRef.current = tScrollElement.scrollTop || 0;
    };

    const restoreProdMemScrollPosition = () => {
        if (!shouldRestoreProdMemScrollRef.current) return;

        const tSavedTop = prodMemScrollTopRef.current || 0;
        const tTargetScrollTop =
            tSavedTop <= 2 ? 0 : tSavedTop + prodMemRestoreOffsetPx;

        const tryRestore = (attempt) => {
            const tScrollElement = getProdMemScrollElement();
            if (tScrollElement) {
                tScrollElement.scrollTop = tTargetScrollTop;

                const tCurrentTop = tScrollElement.scrollTop || 0;
                if (Math.abs(tCurrentTop - tTargetScrollTop) <= 2 && attempt >= 2) {
                    shouldRestoreProdMemScrollRef.current = false;
                    return;
                }

                if (attempt < 20) {
                    setTimeout(() => tryRestore(attempt + 1), 30);
                    return;
                }

                shouldRestoreProdMemScrollRef.current = false;
                return;
            }

            if (attempt < 20) {
                setTimeout(() => tryRestore(attempt + 1), 30);
                return;
            }

            shouldRestoreProdMemScrollRef.current = false;
        };

        requestAnimationFrame(() => tryRestore(0));
    };

    const scrollSelectedProdMemRowIntoView = () => {
        setTimeout(() => {
            const tDtRef = dt_TBL_KSV_PROD_MEM?.current;

            const tRootElement =
                tDtRef?.container ||
                (typeof tDtRef?.getElement === "function"
                    ? tDtRef.getElement()
                    : null) ||
                tDtRef?.el ||
                null;

            if (!tRootElement) return;

            const tSelectedRow = tRootElement.querySelector(
                ".p-datatable-tbody > tr.p-highlight",
            );

            if (!tSelectedRow) return;

            const tScrollElement = getProdMemScrollElement();
            if (tScrollElement) {
                const tRowRect = tSelectedRow.getBoundingClientRect();
                const tScrollRect = tScrollElement.getBoundingClientRect();
                const tTopOffset = tRowRect.top - tScrollRect.top;
                tScrollElement.scrollTop =
                    (tScrollElement.scrollTop || 0) + tTopOffset - 20;
                return;
            }

            if (typeof tSelectedRow.scrollIntoView === "function") {
                tSelectedRow.scrollIntoView({
                    block: "start",
                    inline: "nearest",
                });
            }
        }, 0);
    };

    const process_P_SRCH = () => {
        var tKeyword = String(refQRY_KCD_MATL_MST_MATL_NAME.current || "").trim();
        var tKeywordLower = tKeyword.toLowerCase();
        var tScopeKey = "";

        if (selectedTBL_KSV_PROD_MST.length > 0) {
            tScopeKey = [
                selectedTBL_KSV_PROD_MST[0].ORDER_MRP_SEQ || "",
                selectedTBL_KSV_PROD_MST[0].COLOR || "",
                selectedTBL_KSV_PROD_MST[0].PROD_CD || "",
            ].join("||");
        }

        if (tKeywordLower === "") {
            setSelectedTBL_KSV_PROD_MEM([]);
            return;
        }

        var tMatchedRows = datasTBL_KSV_PROD_MEM.filter((col) => {
            var tMatlName = String(col.MATL_NAME || "").toLowerCase();
            return tMatlName.includes(tKeywordLower);
        });

        if (tMatchedRows.length <= 0) {
            setSelectedTBL_KSV_PROD_MEM([]);
            processPSearchStateRef.current = {
                keyword: tKeywordLower,
                lastKey: "",
                scopeKey: tScopeKey,
            };
            return;
        }

        var getRowKey = (row) =>
            [
                row.MATL_CD || "",
                row.MATL_NAME || "",
                row.COLOR || "",
                row.SPEC || "",
                row.USE_SIZE || "",
                row.REMARK || "",
                row.VENDOR_CD || "",
                row.VENDOR_NAME || "",
                row.SEQ || "",
            ].join("||");

        var tNextIndex = 0;
        if (
            processPSearchStateRef.current.keyword === tKeywordLower &&
            processPSearchStateRef.current.scopeKey === tScopeKey &&
            processPSearchStateRef.current.lastKey !== ""
        ) {
            var tPrevIndex = tMatchedRows.findIndex(
                (row) => getRowKey(row) === processPSearchStateRef.current.lastKey,
            );

            if (tPrevIndex >= 0) {
                tNextIndex = (tPrevIndex + 1) % tMatchedRows.length;
            }
        }

        var tTargetRow = { ...tMatchedRows[tNextIndex] };
        setSelectedTBL_KSV_PROD_MEM([tTargetRow]);
        processPSearchStateRef.current = {
            keyword: tKeywordLower,
            lastKey: getRowKey(tTargetRow),
            scopeKey: tScopeKey,
        };
        scrollSelectedProdMemRowIntoView();
    };

    const getMatlMstScrollElements = () => {
        const tDtRef = dt_TBL_KCD_MATL_MST?.current;

        const tRootElement =
            tDtRef?.container ||
            (typeof tDtRef?.getElement === "function"
                ? tDtRef.getElement()
                : null) ||
            tDtRef?.el ||
            null;

        if (!tRootElement) return [];

        const tCandidates = [
            tRootElement.querySelector(".p-datatable-scrollable-body"),
            tRootElement.querySelector(".p-virtualscroller"),
            tRootElement.querySelector(".p-datatable-wrapper"),
            tRootElement.querySelector('[style*="overflow"]'),
        ].filter(Boolean);

        const tDynamicCandidates = Array.from(
            tRootElement.querySelectorAll("*") || [],
        ).filter((el) => {
            const tStyle = window.getComputedStyle(el);
            const tOverflowY = (tStyle?.overflowY || "").toLowerCase();
            return (
                ((tOverflowY === "auto" || tOverflowY === "scroll") &&
                    (el.scrollHeight || 0) > (el.clientHeight || 0)) ||
                (el.classList?.contains("p-virtualscroller") ?? false)
            );
        });

        const tAll = [...tCandidates, ...tDynamicCandidates];
        return Array.from(new Set(tAll));
    };

    const getMatlMstRootElement = () => {
        const tDtRef = dt_TBL_KCD_MATL_MST?.current;
        return (
            tDtRef?.container ||
            (typeof tDtRef?.getElement === "function"
                ? tDtRef.getElement()
                : null) ||
            tDtRef?.el ||
            null
        );
    };

    const getFirstVisibleMatlMstIndex = () => {
        const tRootElement = getMatlMstRootElement();
        if (!tRootElement) return -1;

        const tScrollContainer =
            tRootElement.querySelector(".p-datatable-wrapper") ||
            tRootElement.querySelector(".p-datatable-scrollable-body") ||
            tRootElement;

        const tRows = Array.from(
            tRootElement.querySelectorAll(".p-datatable-tbody > tr") || [],
        );
        if (tRows.length <= 0) return -1;

        const tScrollRect = tScrollContainer.getBoundingClientRect();
        const tIndex = tRows.findIndex((row) => {
            const tRowRect = row.getBoundingClientRect();
            return tRowRect.bottom > tScrollRect.top + 1;
        });

        return tIndex >= 0 ? tIndex : 0;
    };

    const scrollMatlMstToIndex = (argIndex, argOffset = 0) => {
        const tIndex = Math.max(0, parseInt(argIndex) || 0);
        const tOffset = parseInt(argOffset) || 0;
        const tItemSize = 20;
        const tTargetScrollTop =
            tIndex * tItemSize + tOffset + matlMstRestoreOffsetPx;

        const tDtRef = dt_TBL_KCD_MATL_MST?.current;
        const tVirtualScroller = tDtRef?.getVirtualScroller?.();

        if (typeof tVirtualScroller?.scrollToIndex === "function") {
            tVirtualScroller.scrollToIndex(tIndex);
        }

        const tScrollElements = getMatlMstScrollElements();
        tScrollElements.forEach((el) => {
            el.scrollTop = tTargetScrollTop;
        });

        return {
            targetScrollTop: tTargetScrollTop,
            scrollElements: tScrollElements,
        };
    };

    const saveMatlMstScrollPosition = () => {
        const tScrollElements = getMatlMstScrollElements();
        if (tScrollElements.length <= 0) return;
        const tCurrentScrollTop = Math.max(
            ...tScrollElements.map((el) => el.scrollTop || 0),
            0,
        );
        const tItemSize = 20;
        const tFirstIndex = Math.max(0, Math.floor(tCurrentScrollTop / tItemSize));

        matlMstScrollTopRef.current = tCurrentScrollTop;
        matlMstScrollFirstIndexRef.current = tFirstIndex;
        matlMstScrollOffsetInRowRef.current = tCurrentScrollTop - tFirstIndex * tItemSize;
        matlMstScrollAnchorMatlCdRef.current =
            datasTBL_KCD_MATL_MST[tFirstIndex]?.MATL_CD || "";

        const tVisibleIndex = getFirstVisibleMatlMstIndex();
        if (tVisibleIndex >= 0) {
            matlMstVisibleAnchorMatlCdRef.current =
                datasTBL_KCD_MATL_MST[tVisibleIndex]?.MATL_CD || "";
        }
    };

    const restoreMatlMstScrollPosition = () => {
        if (!shouldRestoreMatlMstScrollRef.current) return;
        const tRows = Array.isArray(datasTBL_KCD_MATL_MST)
            ? datasTBL_KCD_MATL_MST
            : [];
        if (tRows.length <= 0) {
            shouldRestoreMatlMstScrollRef.current = false;
            return;
        }

        const tVisibleAnchorMatlCd =
            matlMstVisibleAnchorMatlCdRef.current || "";
        const tAnchorMatlCd =
            tVisibleAnchorMatlCd || matlMstScrollAnchorMatlCdRef.current || "";
        let tTargetIndex = matlMstScrollFirstIndexRef.current || 0;

        if (tAnchorMatlCd !== "") {
            const tAnchorIndex = tRows.findIndex(
                (row) => String(row.MATL_CD || "") === String(tAnchorMatlCd),
            );
            if (tAnchorIndex >= 0) {
                tTargetIndex = tAnchorIndex;
            }
        }

        tTargetIndex = Math.max(0, Math.min(tTargetIndex, tRows.length - 1));

        const tTargetOffset = matlMstScrollOffsetInRowRef.current || 0;

        const tryRestore = (attempt) => {
            const tRootElement = getMatlMstRootElement();
            const tRowElements = Array.from(
                tRootElement?.querySelectorAll(".p-datatable-tbody > tr") || [],
            );

            if (tRowElements.length > tTargetIndex && tTargetIndex >= 0) {
                const tTargetRow = tRowElements[tTargetIndex];
                if (typeof tTargetRow?.scrollIntoView === "function") {
                    tTargetRow.scrollIntoView({ block: "start", inline: "nearest" });
                }
            }

            const { targetScrollTop: tTargetScrollTop, scrollElements: tScrollElements } =
                scrollMatlMstToIndex(tTargetIndex, tTargetOffset);

            if (tScrollElements.length > 0) {
                requestAnimationFrame(() => {
                    scrollMatlMstToIndex(tTargetIndex, tTargetOffset);
                });

                const tIsRestored = tScrollElements.some(
                    (el) => Math.abs((el.scrollTop || 0) - tTargetScrollTop) <= 2,
                );

                if (tIsRestored && attempt >= 2) {
                    shouldRestoreMatlMstScrollRef.current = false;
                    return;
                }

                if (attempt < 20) {
                    setTimeout(() => tryRestore(attempt + 1), 30);
                    return;
                }

                shouldRestoreMatlMstScrollRef.current = false;
                return;
            }

            if (attempt < 20) {
                setTimeout(() => tryRestore(attempt + 1), 30);
                return;
            }

            shouldRestoreMatlMstScrollRef.current = false;
        };

        requestAnimationFrame(() => tryRestore(0));
    };

    const searchTBL_KCD_MATL_MST = (options = {}) => {
        const { preserveScroll = false } = options;
        var tQryObj = {};
        tQryObj.MATL_CD = refQRY_KCD_MATL_MST_MATL_CD.current;
        tQryObj.MATL_NAME = refQRY_KCD_MATL_MST_MATL_NAME.current;
        tQryObj.COLOR = refQRY_KCD_MATL_MST_COLOR.current;
        tQryObj.SPEC = refQRY_KCD_MATL_MST_SPEC.current;
        tQryObj.VENDOR_CD = refQRY_KCD_MATL_MST_VENDOR_NAME.current;
        tQryObj.STATUS_CD = "2";
        tQryObj.MATL_TYPE = "";

        if (preserveScroll) {
            saveMatlMstScrollPosition();
            shouldRestoreMatlMstScrollRef.current = true;
        } else {
            shouldRestoreMatlMstScrollRef.current = false;
        }

        clearSelectedTBL_KCD_MATL_MST();
        processPSearchStateRef.current = {
            keyword: "",
            lastKey: "",
            scopeKey: "",
        };

        setLoadingTBL_KCD_MATL_MST(true);
        serviceS0301_MATL_RECORD
            .mgrQueryTBL_KCD_MATL_MST(tQryObj)
            .then((data) => {
                // serviceS0302_MATL_SEARCH.mgrQueryTBL_KCD_MATL_MST(dataQRY_KCD_MATL_MST).then(data => {
                if (typeof data.graphQLErrors === "undefined") {
                    // console.log("ServiceNawooAll.mgrQueryTBL_KCD_MATL_MST() call => " + data.length);
                    // setDatasTBL_KCD_MATL_MST(data);
                    //if (data.message !== "") alert(data.message);

                    var tArray = [];
                    data.datas.forEach((col, i) => {
                        var tObj = { ...col };
                        tArray.push(tObj);
                    });

                    if (tArray.length) {
                        setDatasTBL_KCD_MATL_MST(tArray);
                    } else {
                        shouldRestoreMatlMstScrollRef.current = false;
                        alert("검색된 자재 정보가 없습니다 <br><br>No material information found");
                    }
                } else {
                    shouldRestoreMatlMstScrollRef.current = false;
                    console.log(
                        "ServiceNawooAll.mgrQueryTBL_KCD_MATL_MST()error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
                setLoadingTBL_KCD_MATL_MST(false);
            });

        // Service : NawooAll:mgrQueryTBL_KCD_MATL_MST
    };

    const handleMatlSearchInputKeyDown = (e) => {
        if (e.key !== "Enter") return;
        e.preventDefault();
        searchTBL_KCD_MATL_MST();
    };

    const clearSelectedTBL_KCD_MATL_MST = () => {
        setSelectedTBL_KCD_MATL_MST([]);
        setFlagSelectModeTBL_KCD_MATL_MST(false);
    };

    const isUnusableMaterialRow = (row) => {
        const matlStatus = String(row?.MATL_STATUS_CD ?? "").trim();
        const vendorStatus = String(row?.VENDOR_STATUS_CD ?? "").trim();
        const isInvalidStatus = (status) => status !== "" && status !== "0";

        return isInvalidStatus(matlStatus) || isInvalidStatus(vendorStatus);
    };

    /**TABLE KCD_STYLE */
    // DEFINE DATAGRID : TBL_KCD_STYLE
    const [loadingTBL_KCD_STYLE, setLoadingTBL_KCD_STYLE] = useState(false);
    const [datasTBL_KCD_STYLE, setDatasTBL_KCD_STYLE] = useState([]);
    const dt_TBL_KCD_STYLE = useRef(null);
    const [dataTBL_KCD_STYLE, setDataTBL_KCD_STYLE] =
        useState(emptyTBL_KCD_STYLE);
    const [selectedTBL_KCD_STYLE, setSelectedTBL_KCD_STYLE] = useState([]);
    const [flagSelectModeTBL_KCD_STYLE, setFlagSelectModeTBL_KCD_STYLE] =
        useState(false);

    // DATAGRID CODE : TBL_KCD_STYLE

    const onRowClick1TBL_KCD_STYLE = (argData0) => {
        var argData = {};

        if (typeof argData0.length !== "undefined") {
            argData = argData0[0];
        } else {
            argData = argData0;
        }

        if (!argData) return;

        setSelectedTBL_KSV_PROD_MST([]);
        setSelectedTBL_KSV_PROD_MEM([]);

        setDatasTBL_KSV_PROD_MST([]);
        setDatasTBL_KSV_PROD_MEM([]);

        let argTBL_KCD_STYLE = argData;

        setDataTBL_KCD_STYLE(argTBL_KCD_STYLE);

        var tObj = {};
        tObj.STYLE_CD = argData.STYLE_CD;

        serviceS0303_MRP_RECORD_STYLE
            .mgrQueryTBL_KSV_PROD_MST(tObj)
            .then((data) => {
                if (typeof data.graphQLErrors === "undefined") {
                    console.log(
                        "mgrQueryTBL_KSV_PROD_MST() call => " + data.length,
                    );
                    setDatasTBL_KSV_PROD_MST(data);
                    if (data.length > 0) {
                        var tArray = [];
                        tArray.push(data[0]);
                        setSelectedTBL_KSV_PROD_MST(tArray);
                        onRowClick1TBL_KSV_PROD_MST(data[0]);
                    }
                } else {
                    // var tStr = data.graphQLErrors[0].message;
                    console.log(
                        "mgrQueryTBL_KSV_PROD_MST()error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });
    };

    const onRowClickTBL_KCD_STYLE = (event) => {
        let argTBL_KCD_STYLE = event.data;
        if (flagSelectModeTBL_KCD_STYLE) return;

        // Service : NawooAll:mgrQueryTBL_KCD_STYLE
    };

    /**TABLE KSV_PROD_MEM */

    // DEFINE DATAGRID : TBL_KSV_PROD_MEM1
    const [loadingTBL_KSV_PROD_MEM1, setLoadingTBL_KSV_PROD_MEM1] =
        useState(false);

    const [datasTBL_KSV_PROD_MEM1, setDatasTBL_KSV_PROD_MEM1] = useState([]);
    const datasTBL_KSV_PROD_MEM1Ref = useRef([]);
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

    const onRowClickTBL_KSV_PROD_MEM1 = (event) => {
        const t = event.originalEvent?.target;
        const isCheckbox = !!t?.closest(".p-checkbox");
        const isEditor = !!t?.closest(
            'input, textarea, select, .p-inputtext, .p-dropdown, [contenteditable="true"]',
        );
        if (isCheckbox || isEditor) return;
        event.originalEvent?.preventDefault?.();
        event.originalEvent?.stopPropagation?.();
        const rowData = event.data;
        if (!rowData) return;
        setSelectedTBL_KSV_PROD_MEM1((prev) => {
            const prevArr = prev || [];
            const idx = prevArr.findIndex((r) => r.id === rowData.id);
            return idx >= 0
                ? prevArr.filter((r) => r.id !== rowData.id)
                : [...prevArr, rowData];
        });
    };

    useEffect(() => {
        datasTBL_KSV_PROD_MEM1Ref.current = datasTBL_KSV_PROD_MEM1;
    }, [datasTBL_KSV_PROD_MEM1]);

    /**TABLE KSV_PROD_MEM */

    // DEFINE DATAGRID : TBL_KSV_PROD_MEM
    const [loadingTBL_KSV_PROD_MEM, setLoadingTBL_KSV_PROD_MEM] =
        useState(false);

    const [datasTBL_KSV_PROD_MEM, setDatasTBL_KSV_PROD_MEM] = useState([]);
    const datasTBL_KSV_PROD_MEMRef = useRef([]);
    const selectedTBL_KSV_PROD_MEMRef = useRef([]);
    const dt_TBL_KSV_PROD_MEM = useRef(null);
    const [dataTBL_KSV_PROD_MEM, setDataTBL_KSV_PROD_MEM] = useState(
        emptyTBL_KSV_PROD_MEM,
    );
    const [selectedTBL_KSV_PROD_MEM, setSelectedTBL_KSV_PROD_MEM] = useState(
        [],
    );
    const [flagSelectModeTBL_KSV_PROD_MEM, setFlagSelectModeTBL_KSV_PROD_MEM] =
        useState(false);

    useEffect(() => {
        if (createDialog2) return;
        if (loadingTBL_KSV_PROD_MEM) return;
        restoreProdMemScrollPosition();
    }, [datasTBL_KSV_PROD_MEM, loadingTBL_KSV_PROD_MEM, createDialog2]);

    useEffect(() => {
        // Middle table uses AFDataTable rememberScroll option for restoration.
        if (loadingTBL_KCD_MATL_MST) return;
    }, [datasTBL_KCD_MATL_MST, loadingTBL_KCD_MATL_MST]);

    useEffect(() => {
        datasTBL_KSV_PROD_MEMRef.current = datasTBL_KSV_PROD_MEM;
    }, [datasTBL_KSV_PROD_MEM]);

    useEffect(() => {
        selectedTBL_KSV_PROD_MEMRef.current = selectedTBL_KSV_PROD_MEM;
    }, [selectedTBL_KSV_PROD_MEM]);

    useEffect(() => {
        setActiveCountryCell(null);
    }, [datasTBL_KSV_PROD_MEM, datasTBL_KSV_PROD_MEM1]);

    // DATAGRID CODE : TBL_KSV_PROD_MEM

    // GUIDE: 에디터 컴포넌트에 onKeyDown 이벤트를 연결한다.
    const onChangeTextEdit = (e, options) => {
        const updatedValue = e.target.value;
        options.editorCallback(updatedValue);
    };

    const handleFocus = (event) => event.target.select();

    const textEditor = (options) => {
        let latestValue = options.value ?? "";
        const onInputTrack = (event) => { latestValue = event.target.value; };
        const commitValue = (event) => {
            if (event.key === "Enter" || event.type === "blur") {
                Promise.resolve().then(() => {
                    options.editorCallback(latestValue);
                });
            }
        };
        const refCallback = (el) => {
            if (!el) return;
            Promise.resolve().then(() => {
                el.focus();
                el.select();
            });
        };
        if (options.field === "REMARK") {
            return (
                <input
                    style={{ width: "25rem" }}
                    type="text"
                    className="p-inputtext p-component"
                    defaultValue={options.value}
                    ref={refCallback}
                    onInput={onInputTrack}
                    onKeyDown={commitValue}
                    onBlur={commitValue}
                />
            );
        } else {
            return (
                <input
                    type="text"
                    className="p-inputtext p-component"
                    defaultValue={options.value}
                    ref={refCallback}
                    onInput={onInputTrack}
                    onKeyDown={commitValue}
                    onBlur={commitValue}
                />
            );
        }
    };

    const dropboxEditor = (options) => {
        //return <InputText list="natList" type="text" value={options.value} onChange={(e) => { onChangeTextEdit(e, options); } } onKeyDown={onKeyDown} onFocus={handleFocus}/>

        return (
            <Dropdown
                appendTo={"self"}
                style={{ width: "9rem" }}
                value={getCountryCode(options.value)}
                onChange={(e) => {
                    options.editorCallback(e.value);
                }}
                options={datasETC_KCD_NATION}
                optionLabel="label"
                optionValue="value"
                itemTemplate={countryItemTemplate}
                valueTemplate={createCountryValueTemplate(options.value)}
                placeholder="Select"
                filter
            />
        );
    };

    const textEditor1 = (options) => {
        let latestValue = options.value ?? "";
        const onInputTrack = (event) => { latestValue = event.target.value; };
        const commitValue = (event) => {
            if (event.key === "Enter" || event.type === "blur") {
                Promise.resolve().then(() => {
                    options.editorCallback(latestValue);
                });
            }
        };
        const refCallback = (el) => {
            if (!el) return;
            Promise.resolve().then(() => {
                el.focus();
                el.select();
            });
        };
        if (options.field === "REMARK") {
            return (
                <input
                    type="text"
                    className="p-inputtext p-component"
                    style={{ width: "25rem" }}
                    defaultValue={options.value}
                    ref={refCallback}
                    onInput={onInputTrack}
                    onKeyDown={commitValue}
                    onBlur={commitValue}
                />
            );
        } else {
            return (
                <input
                    type="text"
                    className="p-inputtext p-component"
                    defaultValue={options.value}
                    ref={refCallback}
                    onInput={onInputTrack}
                    onKeyDown={commitValue}
                    onBlur={commitValue}
                />
            );
        }
    };

    const dropboxEditor1 = (options) => {
        //return <InputText list="natList" type="text" value={options.value} onChange={(e) => { onChangeTextEdit(e, options); } } onKeyDown={onKeyDown} onFocus={handleFocus}/>

        return (
            <Dropdown
                appendTo={"self"}
                style={{ width: "9rem" }}
                value={getCountryCode(options.value)}
                onChange={(e) => {
                    console.log(e);
                    console.log("-------OnChange Dropdown", e.value);
                    options.editorCallback(e.value);
                }}
                options={datasETC_KCD_NATION}
                optionLabel="label"
                optionValue="value"
                itemTemplate={countryItemTemplate}
                valueTemplate={createCountryValueTemplate(options.value)}
                placeholder="Select"
            />
        );
    };

    const cellEditorTBL_KSV_PROD_MEM = (options) => {
        if (options.field === "COUNTRY") return dropboxEditor(options);
        else return textEditor(options);
    };

    const cellEditorTBL_KSV_PROD_MEM1 = (options) => {
        if (options.field === "COUNTRY") return dropboxEditor1(options);
        else return textEditor1(options);
    };

    const moveFocusByArrow = (event) => {
        const key = event.key;
        if (!["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(key)) return;
        const td = event.target.closest("td");
        const tr = td?.closest("tr");
        if (!td || !tr) return;
        const colIndex = Array.from(tr.children).indexOf(td);
        if (key === "ArrowDown" || key === "ArrowUp") {
            event.preventDefault();
            const targetTr = key === "ArrowDown" ? tr.nextElementSibling : tr.previousElementSibling;
            const targetTd = targetTr?.children[colIndex];
            targetTd?.querySelector("input")?.focus();
        } else if (key === "ArrowRight" || key === "ArrowLeft") {
            const isAtEdge = key === "ArrowRight"
                ? event.target.selectionStart === event.target.value.length
                : event.target.selectionStart === 0;
            if (!isAtEdge) return;
            event.preventDefault();
            const delta = key === "ArrowRight" ? 1 : -1;
            let targetTd = tr.children[colIndex + delta];
            while (targetTd) {
                const input = targetTd.querySelector("input");
                if (input) { input.focus(); return; }
                targetTd = tr.children[Array.from(tr.children).indexOf(targetTd) + delta];
            }
        }
    };

    const renderCountryCell = (tableName, rowData, rowKey, onCommit) => {
        if (!isCountryEditorOpen(tableName, rowKey)) {
            return (
                <div
                    style={{
                        width: "100%",
                        minHeight: "1.75rem",
                        display: "flex",
                        alignItems: "center",
                        cursor: "pointer",
                    }}
                    onMouseDown={(event) => {
                        event.preventDefault();
                        event.stopPropagation();
                    }}
                    onClick={(event) => {
                        event.preventDefault();
                        event.stopPropagation();
                        openCountryEditor(tableName, rowKey);
                    }}
                >
                    {getCountryDisplayText(rowData.COUNTRY) || " "}
                </div>
            );
        }

        return (
            <div
                onMouseDown={(event) => {
                    event.stopPropagation();
                }}
                onClick={(event) => {
                    event.stopPropagation();
                }}
            >
                <Dropdown
                    autoFocus
                    style={{ width: "9rem" }}
                    value={getCountryCode(rowData.COUNTRY)}
                    onChange={(e) => {
                        onCommit(e.value || "");
                        closeCountryEditor();
                    }}
                    onHide={closeCountryEditor}
                    options={datasETC_KCD_NATION}
                    optionLabel="label"
                    optionValue="value"
                    itemTemplate={countryItemTemplate}
                    valueTemplate={createCountryValueTemplate(rowData.COUNTRY)}
                    placeholder="Select"
                    filter
                    filterPlaceholder="Search country"
                />
            </div>
        );
    };

    const inlineBodyTBL_KSV_PROD_MEM = (rowData, field) => {
        if (field === "COUNTRY") {
            return renderCountryCell("KSV_PROD_MEM", rowData, rowData.SEQ, (newValue) => {
                onCellEditCompleteTBL_KSV_PROD_MEM({ rowData, newValue, field, preventDefault: () => {} });
            });
        }
        const commitValue = (event) => {
            if (event.type === "blur") {
                if (event.target.dataset.skipBlurCommit === "1") {
                    event.target.dataset.skipBlurCommit = "";
                    return;
                }
                onCellEditCompleteTBL_KSV_PROD_MEM({ rowData, newValue: event.target.value, field, preventDefault: () => {} });
                return;
            }

            if (event.key === "Enter") {
                event.preventDefault();
                event.target.dataset.skipBlurCommit = "1";
                onCellEditCompleteTBL_KSV_PROD_MEM({ rowData, newValue: event.target.value, field, preventDefault: () => {} });
                const td = event.target.closest("td");
                const tr = td?.closest("tr");
                const nextTr = tr?.nextElementSibling;
                if (nextTr) {
                    const colIndex = Array.from(tr.children).indexOf(td);
                    const nextTd = nextTr.children[colIndex];
                    nextTd?.querySelector("input")?.focus();
                } else {
                    event.target.blur();
                }
            }
        };
        const netSNetFields = ["STD_NET", "STD_LOSS", "NET", "LOSS"];
        let inputColor = undefined;
        if (netSNetFields.includes(field)) {
            const fieldVal = parseFloat(rowData[field]);
            const netS = parseFloat(rowData.STD_NET);
            const net = parseFloat(rowData.NET);
            const isLossField = field === "STD_LOSS" || field === "LOSS";
            const isZero = fieldVal === 0 || isNaN(fieldVal);
            const ref = Math.max(Math.abs(netS || 0), Math.abs(net || 0));
            const isDiff = !isNaN(netS) && !isNaN(net) && ref > 0 && Math.abs(netS - net) / ref >= 0.3;
            if ((!isLossField && isZero) || isDiff) inputColor = "red";
        }
        return (
            <input
                key={`${rowData.SEQ || rowData.id || ""}_${field}_${rowData[field] ?? ""}`}
                type="text"
                data-seq={rowData.SEQ}
                data-field={field}
                data-table="KSV_PROD_MEM"
                style={{ width: "100%", border: "none", backgroundColor: "#e8f5e9", ...(inputColor ? { color: inputColor } : {}) }}
                className="p-inputtext p-component"
                defaultValue={rowData[field]}
                onFocus={(e) => e.target.select()}
                onKeyDown={(e) => { commitValue(e); moveFocusByArrow(e); }}
                onBlur={commitValue}
            />
        );
    };

    const inlineBodyTBL_KSV_PROD_MEM1 = (rowData, field) => {
        if (field === "COUNTRY") {
            return renderCountryCell("KSV_PROD_MEM1", rowData, rowData.id, (newValue) => {
                onCellEditCompleteTBL_KSV_PROD_MEM1({ rowData, newValue, field, preventDefault: () => {} });
            });
        }
        const commitValue = (event) => {
            if (event.type === "blur") {
                if (event.target.dataset.skipBlurCommit === "1") {
                    event.target.dataset.skipBlurCommit = "";
                    return;
                }
                onCellEditCompleteTBL_KSV_PROD_MEM1({ rowData, newValue: event.target.value, field, preventDefault: () => {} });
                return;
            }

            if (event.key === "Enter") {
                event.preventDefault();
                event.target.dataset.skipBlurCommit = "1";
                onCellEditCompleteTBL_KSV_PROD_MEM1({ rowData, newValue: event.target.value, field, preventDefault: () => {} });
                const td = event.target.closest("td");
                const tr = td?.closest("tr");
                const nextTr = tr?.nextElementSibling;
                if (nextTr) {
                    const colIndex = Array.from(tr.children).indexOf(td);
                    const nextTd = nextTr.children[colIndex];
                    nextTd?.querySelector("input")?.focus();
                } else {
                    event.target.blur();
                }
            }
        };
        const netSNetFields1 = ["STD_NET", "STD_LOSS", "NET", "LOSS"];
        let inputColor1 = undefined;
        if (netSNetFields1.includes(field)) {
            const fieldVal = parseFloat(rowData[field]);
            const netS = parseFloat(rowData.STD_NET);
            const net = parseFloat(rowData.NET);
            const isLossField = field === "STD_LOSS" || field === "LOSS";
            const isZero = fieldVal === 0 || isNaN(fieldVal);
            const ref = Math.max(Math.abs(netS || 0), Math.abs(net || 0));
            const isDiff = !isNaN(netS) && !isNaN(net) && ref > 0 && Math.abs(netS - net) / ref >= 0.3;
            if ((!isLossField && isZero) || isDiff) inputColor1 = "red";
        }
        return (
            <input
                key={`${rowData.id}_${field}_${rowData[field] ?? ""}`}
                type="text"
                style={{ width: "100%", border: "none", backgroundColor: "#e8f5e9", ...(inputColor1 ? { color: inputColor1 } : {}) }}
                className="p-inputtext p-component"
                defaultValue={rowData[field]}
                onFocus={(e) => e.target.select()}
                onKeyDown={(e) => { commitValue(e); moveFocusByArrow(e); }}
                onBlur={commitValue}
            />
        );
    };

    const onCellEditCompleteTBL_KSV_PROD_MEM = (e) => {
        let { rowData, newValue, field } = e;

        const updatedRow = { ...rowData };
        updatedRow[field] = newValue;
        if (rowData[field] === newValue) {
            // e.preventDefault();
            return;
        }

        if (["USE_SIZE", "COUNTRY", "ADD_LOSS", "REMARK"].includes(field)) {
            updatedRow.S_FLAG = "1";

            setDatasTBL_KSV_PROD_MEM((prevRows) =>
                prevRows.map((row) =>
                    row.SEQ === updatedRow.SEQ ? { ...row, ...updatedRow } : row,
                ),
            );
        } else if (["STD_NET", "STD_LOSS", "LOSS", "NET"].includes(field)) {
            var addLoss = parseFloat(updatedRow.ADD_LOSS) || 0;
            var stdNet = parseFloat(updatedRow.STD_NET) || 0;
            var stdLoss = parseFloat(updatedRow.STD_LOSS) || 0;
            var net = parseFloat(updatedRow.NET) || 0;
            var loss = parseFloat(updatedRow.LOSS) || 0;

            if (field === "STD_NET" || field === "STD_LOSS") {
                if (field === "STD_NET") updatedRow.NET = String(newValue);
                if (field === "STD_LOSS") updatedRow.LOSS = String(newValue);
                net = parseFloat(updatedRow.NET);
                loss = parseFloat(updatedRow.LOSS);
                updatedRow.STD_GROSS = String(
                    stdNet + stdNet * (stdLoss + addLoss) * 0.01,
                );
                updatedRow.GROSS = String(net + net * (loss + addLoss) * 0.01);
            }

            if (field === "LOSS" || field === "NET") {
                updatedRow.GROSS = String(net + net * (loss + addLoss) * 0.01);
            }

            // FORMATTING
            updatedRow.NET = parseFloat(updatedRow.NET).toFixed(4);
            updatedRow.LOSS = parseFloat(updatedRow.LOSS).toFixed(2);
            updatedRow.GROSS = parseFloat(updatedRow.GROSS).toFixed(5);

            updatedRow.STD_NET = parseFloat(updatedRow.STD_NET).toFixed(4);
            updatedRow.STD_LOSS = parseFloat(updatedRow.STD_LOSS).toFixed(2);
            updatedRow.STD_GROSS = parseFloat(updatedRow.STD_GROSS).toFixed(5);

            updatedRow.S_FLAG = "1";

            setDatasTBL_KSV_PROD_MEM((prevRows) =>
                prevRows.map((row) =>
                    row.SEQ === updatedRow.SEQ ? { ...row, ...updatedRow } : row,
                ),
            );
        } else {
            e.preventDefault();
        }
    };

    const onCellEditCompleteTBL_KSV_PROD_MEM1 = (e) => {
        let { rowData, newValue, field } = e;

        if (rowData[field] === newValue) {
            // e.preventDefault();
            return;
        }

        const rowId = rowData.id;

        setDatasTBL_KSV_PROD_MEM1((prevRows) => {
            const rowIndex = prevRows.findIndex((row) => row.id === rowId);
            if (rowIndex < 0) return prevRows;

            const currentRow = prevRows[rowIndex];
            let nextRow = currentRow;

            if (["USE_SIZE", "COUNTRY", "ADD_LOSS", "REMARK"].includes(field)) {
                console.log(`cellComplete: ${field}`);
                nextRow = {
                    ...currentRow,
                    [field]: newValue,
                    S_FLAG: "1",
                };
            } else if (["STD_NET", "STD_LOSS", "LOSS", "NET"].includes(field)) {
                const updatedRow = {
                    ...currentRow,
                    [field]: newValue,
                };

                var addLoss = parseFloat(updatedRow.ADD_LOSS) || 0;
                var stdNet = parseFloat(updatedRow.STD_NET) || 0;
                var stdLoss = parseFloat(updatedRow.STD_LOSS) || 0;
                var net = parseFloat(updatedRow.NET) || 0;
                var loss = parseFloat(updatedRow.LOSS) || 0;

                if (field === "STD_NET" || field === "STD_LOSS") {
                    if (field === "STD_NET") updatedRow.NET = String(newValue);
                    if (field === "STD_LOSS") updatedRow.LOSS = String(newValue);
                    net = parseFloat(updatedRow.NET) || 0;
                    loss = parseFloat(updatedRow.LOSS) || 0;
                    updatedRow.STD_GROSS = String(
                        stdNet + stdNet * (stdLoss + addLoss) * 0.01,
                    );
                    updatedRow.GROSS = String(net + net * (loss + addLoss) * 0.01);
                }

                if (field === "LOSS" || field === "NET") {
                    updatedRow.GROSS = String(net + net * (loss + addLoss) * 0.01);
                }

                updatedRow.NET = parseFloat(updatedRow.NET).toFixed(4);
                updatedRow.LOSS = parseFloat(updatedRow.LOSS).toFixed(2);
                updatedRow.GROSS = parseFloat(updatedRow.GROSS).toFixed(5);

                updatedRow.STD_NET = parseFloat(updatedRow.STD_NET).toFixed(4);
                updatedRow.STD_LOSS = parseFloat(updatedRow.STD_LOSS).toFixed(2);
                updatedRow.STD_GROSS = parseFloat(updatedRow.STD_GROSS).toFixed(5);
                updatedRow.S_FLAG = "1";

                nextRow = updatedRow;
            } else {
                e.preventDefault();
                return prevRows;
            }

            if (nextRow === currentRow) return prevRows;

            const nextRows = [...prevRows];
            nextRows[rowIndex] = nextRow;
            datasTBL_KSV_PROD_MEM1Ref.current = nextRows;
            return nextRows;
        });
    };

    const onRowClickTBL_KSV_PROD_MEM = (event) => {
        const t = event.originalEvent?.target;

        const isCheckbox = !!t?.closest(".p-checkbox");
        const isEditor = !!t?.closest(
            'input, textarea, select, .p-inputtext, .p-dropdown, [contenteditable="true"]',
        );

        clearQRY_KCD_STYLE2_VENDOR_CD1();

        // Detect clicked column
        const tFieldOrder = [
            "__checkbox__",
            "MATL_NAME",
            "MATL_CD",
            "COLOR",
            "SPEC",
            "SALES_MATL_PRICE",
            "MATL_PRICE",
            "CURR_CD",
            "UNIT",
            "ADD_LOSS",
            "USE_SIZE",
            "REMARK",
            "COUNTRY",
            "STD_NET",
            "STD_LOSS",
            "NET",
            "LOSS",
            "GROSS",
            "VENDOR_NAME",
            "SEQ",
        ];
        const checkboxToggleFields = new Set([
            "MATL_NAME",
            "MATL_CD",
            "COLOR",
            "SPEC",
            "SALES_MATL_PRICE",
            "MATL_PRICE",
            "CURR_CD",
            "UNIT",
            "ADD_LOSS",
        ]);
        const tCell = t?.closest("td");
        const tClickedField =
            tCell && typeof tCell.cellIndex === "number"
                ? tFieldOrder[tCell.cellIndex]
                : null;
        const isCheckboxToggleArea =
            !isCheckbox && !!tClickedField && checkboxToggleFields.has(tClickedField);

        if (!isCheckbox && !isCheckboxToggleArea) {
            event.originalEvent.preventDefault?.();
            event.originalEvent.stopPropagation?.();
        }

        if (isCheckboxToggleArea && !isEditor) {
            event.originalEvent?.preventDefault?.();
            event.originalEvent?.stopPropagation?.();
            const rowData = event.data;
            if (rowData) setSelectedTBL_KSV_PROD_MEM([rowData]);
        }

        if (isEditor || isCheckbox) return;

        if (
            typeof event.data !== "undefined" &&
            typeof event.data.MATL_CD !== "undefined"
        ) {
            const tData = { ...event.data };
            const tQry = {
                MATL_CD: refQRY_KCD_MATL_MST_MATL_CD.current,
                MATL_NAME: tData.MATL_NAME,
                COLOR: refQRY_KCD_MATL_MST_COLOR.current,
                SPEC: refQRY_KCD_MATL_MST_SPEC.current,
                VENDOR_NAME: refQRY_KCD_MATL_MST_VENDOR_NAME.current,
            };
            putQRY_KCD_MATL_MST(tQry);
            setDataTBL_KSV_PROD_MEM(tData);
        }
    };

    const onRowDoubleClickTBL_KSV_PROD_MEM = (argData0) => {
        var tRemark = "";
        var tColName = "";
        var tKeys = Object.keys(argData0.data);

        const normalizeSpace = (str) => str?.replace(/\s+/g, " ").trim();
        var clickedText = normalizeSpace(
            argData0.originalEvent.target.innerText,
        );

        const tCell = argData0.originalEvent.target?.closest?.("td");
        const tFieldOrder = [
            "__checkbox__",
            "DL_FLAG",
            "MATL_NAME",
            "MATL_CD",
            "COLOR",
            "SPEC",
            "SALES_MATL_PRICE",
            "MATL_PRICE",
            "CURR_CD",
            "UNIT",
            "ADD_LOSS",
            "USE_SIZE",
            "REMARK",
            "COUNTRY",
            "STD_NET",
            "STD_LOSS",
            "NET",
            "LOSS",
            "GROSS",
            "VENDOR_NAME",
            "SEQ",
        ];

        if (tCell && typeof tCell.cellIndex === "number") {
            const tFieldByIndex = tFieldOrder[tCell.cellIndex];
            if (tFieldByIndex) {
                tColName = tFieldByIndex;
            }
        }

        tKeys.forEach((col) => {
            var tValue = argData0.data[col];
            if (col === "REMARK") tRemark = tValue;

            if (!tColName && normalizeSpace(String(tValue)) === clickedText) {
                tColName = col;
            }
        });

        console.log("Col Name:" + tColName);

        if (tColName === "MATL_CD" || tColName === "S_MATL_CD") {
            popup_MATL_MST(argData0.originalEvent.target.innerText);
        }

        if (tColName === "SPEC") {
            popup_SPEC(argData0.data);
        }
    };

    const onCellDoubleClickTBL_KSV_PROD_MEM = (event) => {
        if (!event?.data) return;

        if (event.field === "SPEC") {
            popup_SPEC(event.data);
            return;
        }

        if (event.field === "MATL_CD" || event.field === "S_MATL_CD") {
            popup_MATL_MST(event.data.MATL_CD);
        }
    };

    const renderDoubleClickCell = (value, rowData, field, onDoubleClick) => (
        <span
            style={{ display: "block", width: "100%", minHeight: "1rem", cursor: "pointer" }}
            onDoubleClick={(event) => {
                event.stopPropagation();
                onDoubleClick?.(rowData, field);
            }}
        >
            {value ?? ""}
        </span>
    );

    const bodyMatlCdTBL_KSV_PROD_MEM = (rowData) =>
        renderDoubleClickCell(
            rowData.MATL_CD,
            rowData,
            "MATL_CD",
            (data) => popup_MATL_MST(data.MATL_CD),
        );

    const bodyMrpCheckTBL_KSV_PROD_MEM = (rowData) => (
        <div 
            style={{ cursor: "pointer", padding: "4px", display: "block", width: "100%", textAlign: "center" }}
            onClick={(e) => {
                e.stopPropagation();
                const newData = [...datasTBL_KSV_PROD_MEM];
                const index = newData.findIndex(item => item.SEQ === rowData.SEQ);
                if (index !== -1) {
                    // Toggle: "" -> "0", "0" -> ""
                    const newMrpCheck = rowData.MRP_CHECK === "" ? "0" : "";
                    const updatedRow = { ...newData[index], MRP_CHECK: newMrpCheck, S_FLAG: "1" };
                    newData[index] = updatedRow;
                    setDatasTBL_KSV_PROD_MEM(newData);
                    
                    // Auto-save to server
                    autoSaveMrpCheck(updatedRow);
                }
            }}
        >
            {rowData.MRP_CHECK}
        </div>
    );

    const autoSaveMrpCheck = async (updatedRows) => {
        try {
            const rows = Array.isArray(updatedRows)
                ? updatedRows
                : updatedRows
                  ? [updatedRows]
                  : [];

            if (rows.length <= 0) return;

            const tInArray = rows.map((row) => {
                const payload = { ...row };
                delete payload.__typename;
                delete payload.id;
                delete payload.__ROW_KEY;
                return payload;
            });
            
            const tProdCds = [];
            datasTBL_KSV_PROD_MST.forEach((col) => {
                tProdCds.push({ PROD_CD: col.PROD_CD });
            });
            
            const result = await serviceS0303_MRP_RECORD_STYLE.mgrInsert_ALL_UPDATE_MATERIAL(
                tInArray,
                tProdCds,
                {}
            );
            
            if (!(result && result.length > 0 && result[0].CODE?.includes("SUCC"))) {
                toast.current?.show({
                    severity: "error",
                    summary: "Error",
                    detail: "Failed to update MRP_CHECK",
                    life: 2000,
                });
            }
        } catch (error) {
            console.log("autoSaveMrpCheck error:", error);
            toast.current?.show({
                severity: "error",
                summary: "Error",
                detail: "Error updating MRP_CHECK",
                life: 2000,
            });
        }
    };

    const onClickHeaderMrpCheck = () => {
        if (!Array.isArray(datasTBL_KSV_PROD_MEM) || datasTBL_KSV_PROD_MEM.length <= 0) {
            return;
        }

        const allChecked = datasTBL_KSV_PROD_MEM.every((row) => row.MRP_CHECK === "0");
        const targetMrpCheck = allChecked ? "" : "0";

        const updatedRows = datasTBL_KSV_PROD_MEM.map((row) => {
            if ((row.MRP_CHECK || "") === targetMrpCheck) return row;
            return {
                ...row,
                MRP_CHECK: targetMrpCheck,
                S_FLAG: "1",
            };
        });

        const changedRows = updatedRows.filter(
            (row, idx) => (datasTBL_KSV_PROD_MEM[idx].MRP_CHECK || "") !== (row.MRP_CHECK || ""),
        );

        if (changedRows.length <= 0) return;

        setDatasTBL_KSV_PROD_MEM(updatedRows);
        autoSaveMrpCheck(changedRows);
    };

    const exportExcelTBL_KSV_PROD_MEM = () => {
        import("xlsx").then((xlsx) => {
            const worksheet = xlsx.utils.json_to_sheet(datasTBL_KSV_PROD_MEM);
            const workbook = {
                Sheets: { data: worksheet },
                SheetNames: ["data"],
            };
            const excelBuffer = xlsx.write(workbook, {
                bookType: "xlsx",
                type: "array",
            });
            saveAsExcelFileTBL_KSV_PROD_MEM(excelBuffer, "스타일레코드");
        });
    };

    const saveAsExcelFileTBL_KSV_PROD_MEM = (buffer, fileName) => {
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

    const downloadFile = async (argFileUrl, argFileName) => {
        serviceLib.downloadFile(argFileUrl, argFileName);
    };

    const export_CONSUMPTION = async () => {
        const tStyleRow = getCurrentStyleRow();
        const tProdRow = selectedTBL_KSV_PROD_MST?.[0] || {};

        if (!tStyleRow.STYLE_NAME || !tProdRow.COLOR) {
            alert("작업할 Style/Color를 선택하세요<br><br>Select the style/color you want to work with");
            return;
        }

        let gridExportConsumption = [];

        selectedTBL_KSV_PROD_MEM.map((el) => {
            gridExportConsumption.push({
                MATL_NAME: el.MATL_NAME,
                COLOR: el.COLOR,
                SPEC: el.SPEC,
                UNIT: el.UNIT,
                REMARK: el.S_REMARK,
                USAGE: el.REMARK,
            });
        });

        console.log(selectedTBL_KCD_STYLE);

        setLoadingTBL_KSV_PROD_MEM(true);
        let data =
            await serviceS0303_MRP_RECORD_STYLE.mgrQuery_EXPORT_CONSUMPTION(
                {
                    STYLE_NAME: tStyleRow.STYLE_NAME,
                    COLOR: tProdRow.COLOR,
                },
                gridExportConsumption,
            );

        setLoadingTBL_KSV_PROD_MEM(false);
        if (typeof data.graphQLErrors === "undefined") {
            if (data.length > 0) {
                //alert(data[0].CODE);
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

    const onRowClick1TBL_KSV_PROD_MST = (argData0, options = {}) => {
        const { preserveRows = false, preserveScroll = true } = options;
        var argData = {};

        if (typeof argData0.length !== "undefined") {
            argData = argData0[0];
        } else {
            argData = argData0;
        }

        if (!argData) return;

        let argTBL_KSV_PROD_MST = argData;

        setDataTBL_KSV_PROD_MST(argTBL_KSV_PROD_MST);

        var tObj = {};
        tObj.PROD_CD = argData.PROD_CD;
        tObj.DL_FLAG = "";

        if (preserveScroll) {
            // 새로운 데이터 조회시 스크롤을 맨 위(0)에서 시작하도록 설정
            prodMemScrollTopRef.current = 0;
            shouldRestoreProdMemScrollRef.current = true;
        }

        setSelectedTBL_KSV_PROD_MEM([]);
        if (!preserveRows) {
            setDatasTBL_KSV_PROD_MEM([]);
        }
        setLoadingTBL_KSV_PROD_MEM(true);

        serviceS0303_MRP_RECORD_STYLE
            .mgrQueryTBL_KSV_PROD_MEM(tObj)
            .then((data) => {
                if (typeof data.graphQLErrors === "undefined") {
                    const dataRows = Array.isArray(data)
                        ? data
                        : data
                          ? [data]
                          : [];
                    console.log(
                        "mgrQueryTBL_KSV_PROD_MEM() call => " + dataRows.length,
                    );

                    let copiedData = cloneArrayData(dataRows);

                    // FORMATTING
                    let id = 0;
                    for (let item of copiedData) {
                        item.NET = parseFloat(item.NET).toFixed(4);
                        item.LOSS = parseFloat(item.LOSS).toFixed(2);
                        item.GROSS = parseFloat(item.GROSS).toFixed(5);

                        item.STD_NET = parseFloat(item.STD_NET).toFixed(4);
                        item.STD_LOSS = parseFloat(item.STD_LOSS).toFixed(2);
                        item.STD_GROSS = parseFloat(item.STD_GROSS).toFixed(5);
                        item.id = id++;

                        // Convert Full name of Nat
                        //let fullName = datasETC_KCD_NATION.find( (e) => e.NAT_CD === item.COUNTRY );
                        //console.log(fullName);
                    }

                    const uniqueVendors = Object.values(
                        copiedData.reduce((acc, item) => {
                            if (!acc[item.VENDOR_CD]) {
                                acc[item.VENDOR_CD] = {
                                    VENDOR_CD: item.VENDOR_CD,
                                    VENDOR_NAME: item.VENDOR_NAME,
                                };
                            }
                            return acc;
                        }, {}),
                    );

                    console.log(uniqueVendors);

                    // React 17: async 콜백 내 다중 setState를 단일 렌더로 묶음
                    ReactDOM.unstable_batchedUpdates(() => {
                        setDatasTBL_KSV_PROD_MEM(withProdMemDataKeys(copiedData));
                        setDatasQRY_KCD_STYLE2_VENDOR_CD1(uniqueVendors);
                        setDataETC_ROW_COUNT(dataRows.length);
                        setLoadingTBL_KSV_PROD_MEM(false);
                    });
                } else {
                    // var tStr = data.graphQLErrors[0].message;
                    console.log(
                        "mgrQueryTBL_KSV_PROD_MEM()error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                    setLoadingTBL_KSV_PROD_MEM(false);
                }
            });
    };

    const [selectedTBL_KCD_PROD_MST, setSelectedTBL_KCD_PROD_MST] = useState(
        [],
    );
    const onRowClickTBL_KSV_PROD_MST = (event) => {
        let argTBL_KSV_PROD_MST = event.data;
        if (flagSelectModeTBL_KSV_PROD_MST) return;

        // Service : NawooAll:mgrQueryTBL_KSV_PROD_MST
        if (flagSelectModeTBL_KSV_PROD_MST) return;

        const clickedRow = event.data;

        // 이미 선택되어 있으면 해제
        if (
            flagSelectModeTBL_KSV_PROD_MST.length === 1 &&
            flagSelectModeTBL_KSV_PROD_MST[0].MATL_CD === clickedRow.MATL_CD
        ) {
            setSelectedTBL_KCD_PROD_MST([]); // 선택 해제
        } else {
            setSelectedTBL_KCD_PROD_MST([clickedRow]); // 해당 항목만 선택
        }
    };

    const onCellEditCompleteTBL_KSV_PROD_MST = (e) => {
        let { rowData, newValue, value, field, originalEvent: event } = e;
        if (rowData[field] === newValue) return;
        rowData[field] = newValue;
        rowData.S_FLAG = "1";
    };

    const cellEditorTBL_KSV_PROD_MST = (options) => {
        return textEditor(options);
    };

    const inlineBodyTBL_KSV_PROD_MST = (rowData, field) => {
        const commitValue = (event) => {
            if (event.type === "blur") {
                onCellEditCompleteTBL_KSV_PROD_MST({ rowData, newValue: event.target.value, field, originalEvent: event });
                return;
            }

            if (event.key === "Enter") {
                event.preventDefault();
                const td = event.target.closest("td");
                const tr = td?.closest("tr");
                const nextTr = tr?.nextElementSibling;
                if (nextTr) {
                    const colIndex = Array.from(tr.children).indexOf(td);
                    const nextTd = nextTr.children[colIndex];
                    nextTd?.querySelector("input")?.focus();
                } else {
                    event.target.blur();
                }
            }
        };
        return (
            <input
                key={`${rowData.COLOR}_${field}`}
                className="p-inputtext p-component"
                style={{ border: "none", backgroundColor: "#e8f5e9", width: "100%" }}
                defaultValue={rowData[field]}
                onFocus={(e) => e.target.select()}
                onKeyDown={(e) => { commitValue(e); moveFocusByArrow(e); }}
                onBlur={commitValue}
            />
        );
    };

    /**EDIT KSV_PROD_MEM_USAGE */
    const [datasEDT_KSV_PROD_MEM_USAGE, setDatasEDT_KSV_PROD_MEM_USAGE] =
        useState([]);
    const [dataEDT_KSV_PROD_MEM_USAGE, setDataEDT_KSV_PROD_MEM_USAGE] =
        useState(emptyEDT_KSV_PROD_MEM_USAGE);

    const onInputChangeEDT_KSV_PROD_MEM_USAGE_NET = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_PROD_MEM = { ...dataEDT_KSV_PROD_MEM_USAGE };

        let tTypeVal = _dataEDT_KSV_PROD_MEM[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_PROD_MEM[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_PROD_MEM[`${name}`] = parseInt(val);

        setDataEDT_KSV_PROD_MEM_USAGE(_dataEDT_KSV_PROD_MEM);
    };

    const onInputChangeEDT_KSV_PROD_MEM_USAGE_NET_S = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_PROD_MEM = { ...dataEDT_KSV_PROD_MEM_USAGE };

        let tTypeVal = _dataEDT_KSV_PROD_MEM[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_PROD_MEM[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_PROD_MEM[`${name}`] = parseInt(val);

        setDataEDT_KSV_PROD_MEM_USAGE(_dataEDT_KSV_PROD_MEM);
    };

    const onInputChangeEDT_KSV_PROD_MEM_USAGE_USAGE = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_PROD_MEM = { ...dataEDT_KSV_PROD_MEM_USAGE };

        let tTypeVal = _dataEDT_KSV_PROD_MEM[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_PROD_MEM[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_PROD_MEM[`${name}`] = parseInt(val);

        setDataEDT_KSV_PROD_MEM_USAGE(_dataEDT_KSV_PROD_MEM);
    };

    const onInputChangeEDT_KSV_PROD_MEM_USAGE_LOSS = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_PROD_MEM = { ...dataEDT_KSV_PROD_MEM_USAGE };

        let tTypeVal = _dataEDT_KSV_PROD_MEM[`${name}`];
        if (typeof tTypeVal === "string")
            _dataEDT_KSV_PROD_MEM[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_PROD_MEM[`${name}`] = parseInt(val);

        setDataEDT_KSV_PROD_MEM_USAGE(_dataEDT_KSV_PROD_MEM);
    };

    /**EDIT KSV_PROD_MEM */
    const [datasEDT_KSV_PROD_MEM, setDatasEDT_KSV_PROD_MEM] = useState([]);
    const [dataEDT_KSV_PROD_MEM, setDataEDT_KSV_PROD_MEM] = useState(
        emptyEDT_KSV_PROD_MEM,
    );

    const onCheckboxChangeEDT_KSV_PROD_MEM_STD_FLAG = (e, name) => {
        let val = "";
        let _dataEDT_KSV_PROD_MEM = { ...dataEDT_KSV_PROD_MEM };
        if (e.checked) {
            val = "1";
        } else {
            val = "0";
        }
        _dataEDT_KSV_PROD_MEM[`${name}`] = val;
        syncEDT_FLAGS(_dataEDT_KSV_PROD_MEM);
        setDataEDT_KSV_PROD_MEM(_dataEDT_KSV_PROD_MEM);
    };

    const onCheckboxChangeEDT_KSV_PROD_MEM_ALL_FLAG = (e, name) => {
        let val = "";
        let _dataEDT_KSV_PROD_MEM = { ...dataEDT_KSV_PROD_MEM };
        if (e.checked) {
            val = "1";
        } else {
            val = "0";
        }
        _dataEDT_KSV_PROD_MEM[`${name}`] = val;
        syncEDT_FLAGS(_dataEDT_KSV_PROD_MEM);
        setDataEDT_KSV_PROD_MEM(_dataEDT_KSV_PROD_MEM);
    };

    const onCheckboxChangeEDT_KSV_PROD_MEM_ALL_COLOR_FLAG = (e, name) => {
        let val = "";
        let _dataEDT_KSV_PROD_MEM = { ...dataEDT_KSV_PROD_MEM };
        if (e.checked) {
            val = "1";
        } else {
            val = "0";
        }
        _dataEDT_KSV_PROD_MEM[`${name}`] = val;
        syncEDT_FLAGS(_dataEDT_KSV_PROD_MEM);
        setDataEDT_KSV_PROD_MEM(_dataEDT_KSV_PROD_MEM);
    };

    const refEDT_FLAGS = useRef({
        STD_FLAG: "",
        ALL_FLAG: "",
        ALL_COLOR_FLAG: "",
    });
    const refEDT_TEXT = useRef({ NET: "", LOSS: "", USE_SIZE: "", REMARK: "" });
    const inputRefEDT_NET = useRef(null);
    const inputRefEDT_LOSS = useRef(null);
    const inputRefEDT_USE_SIZE = useRef(null);
    const inputRefEDT_REMARK = useRef(null);

    const syncEDT_FLAGS = (obj) => {
        refEDT_FLAGS.current.STD_FLAG = obj.STD_FLAG ?? "";
        refEDT_FLAGS.current.ALL_FLAG = obj.ALL_FLAG ?? "";
        refEDT_FLAGS.current.ALL_COLOR_FLAG = obj.ALL_COLOR_FLAG ?? "";
    };

    const syncEDT_TEXT = (obj) => {
        refEDT_TEXT.current.NET = obj.NET ?? "";
        refEDT_TEXT.current.LOSS = obj.LOSS ?? "";
        refEDT_TEXT.current.USE_SIZE = obj.USE_SIZE ?? "";
        refEDT_TEXT.current.REMARK = obj.REMARK ?? "";
        if (inputRefEDT_NET.current) inputRefEDT_NET.current.value = refEDT_TEXT.current.NET;
        if (inputRefEDT_LOSS.current) inputRefEDT_LOSS.current.value = refEDT_TEXT.current.LOSS;
        if (inputRefEDT_USE_SIZE.current) inputRefEDT_USE_SIZE.current.value = refEDT_TEXT.current.USE_SIZE;
        if (inputRefEDT_REMARK.current) inputRefEDT_REMARK.current.value = refEDT_TEXT.current.REMARK;
    };

    const getEDT = () => ({
        ...dataEDT_KSV_PROD_MEM,
        ...refEDT_FLAGS.current,
        ...refEDT_TEXT.current,
    });

    const [dataETC_ROW_COUNT, setDataETC_ROW_COUNT] = useState("");
    const [dataETC_MOVE_COUNT, setDataETC_MOVE_COUNT] = useState("1");

    const [dataETC_KCD_NATION, setDataETC_KCD_NATION] = useState({});
    const [datasETC_KCD_NATION, setDatasETC_KCD_NATION] = useState([]);
    const [activeCountryCell, setActiveCountryCell] = useState(null);

    const [dataETC_DL_KIND, setDataETC_DL_KIND] = useState({});
    const [datasETC_DL_KIND, setDatasETC_DL_KIND] = useState([]);

    const onInputChangeETC_ROW_COUNT = (e, name) => {
        let val = (e.target && e.target.value) || "";
        setDataETC_ROW_COUNT(val);
    };
    const onInputChangeETC_MOVE_COUNT = (e, name) => {
        let val = (e.target && e.target.value) || "";
        setDataETC_MOVE_COUNT(val);
    };

    const openCountryEditor = async (tableName, rowKey) => {
        await search_QRY_NATION();
        setActiveCountryCell({ tableName, rowKey });
    };

    const closeCountryEditor = () => {
        setActiveCountryCell(null);
    };

    const isCountryEditorOpen = (tableName, rowKey) => {
        return (
            activeCountryCell?.tableName === tableName &&
            activeCountryCell?.rowKey === rowKey
        );
    };

    const countryEditorRenderDependency = activeCountryCell
        ? `${activeCountryCell.tableName}::${activeCountryCell.rowKey}`
        : "";

    useEffect(async () => {
        var tArray = [];
        var tObj0 = { ...emptyTBL_KCD_MATL_MST1 };
        tObj0.id = 1;
        tArray.push(tObj0);

        setDatasTBL_KCD_MATL_MST1(tArray);

        var tArray2 = [];
        var tObj = {};
        tObj.STYLE_CD = "";
        tObj.STYLE_NAME = " ";
        tArray2.push(tObj);
        setDatasQRY_KCD_STYLE_STYLE_CD0(tArray2);
        setDataQRY_KCD_STYLE_STYLE_CD0(tArray2[0]);

        await search_QRY_NATION();

        let ret = await search_QRY_VENDOR("", 1);
        setDatasQRY_KCD_STYLE2_VENDOR_CD1([...ret]);
        setDatasQRY_KCD_STYLE2_VENDOR_CD2([...ret]);

        var tInArray4 = ["", "All", "X", "D", "Z", "DZ"];
        var tInArray4_1 = [" ", "All", "X", "D", "Z", "DZ"];
        var tArray4 = [];
        tInArray4.forEach((col, i) => {
            var tObj = {};
            tObj.CD_CODE = tInArray4[i];
            tObj.CD_NAME = tInArray4_1[i];
            tArray4.push(tObj);
        });
        setDatasETC_DL_KIND(tArray4);
        setDataETC_DL_KIND(tArray4[0]);
    }, []);

    useEffect(async () => {}, []);

    // Support Area
    const changeCheckBoxVal = (argVal) => {
        if (argVal === "1") return true;
        else return false;
    };

    const btnAddMaterialRef = useRef(null);
    const btnChangeMaterialRef = useRef(null);
    const btnUpdateMaterialRef = useRef(null);
    const btnDeleteMaterialRef = useRef(null);
    const btnMatlSearchRef = useRef(null);

    const commitActiveEditorBeforeAction = () => {
        const activeElement = document.activeElement;
        if (
            activeElement &&
            activeElement !== document.body &&
            typeof activeElement.blur === "function"
        ) {
            activeElement.blur();
        }
    };

    const flushPendingEditsBeforeAction = async () => {
        commitActiveEditorBeforeAction();
        await new Promise((resolve) => setTimeout(resolve, 0));
    };

    useEffect(() => {
        const handleMessage = (event) => {
            const tData = event?.data || {};
            if (tData.func !== "mrp_requery_parent_center") return;

            const tMessage = tData.message || {};
            if (String(tMessage.SOURCE || "").toUpperCase() !== "S0303") return;

            const tStyleCd =
                tMessage.STYLE_CD ||
                selectedTBL_KCD_STYLE?.[0]?.STYLE_CD ||
                dataTBL_KCD_STYLE?.STYLE_CD ||
                "";

            if (!tStyleCd) return;

            const tMatchedStyle =
                datasTBL_KCD_STYLE.find((row) => row.STYLE_CD === tStyleCd) ||
                selectedTBL_KCD_STYLE?.[0] ||
                dataTBL_KCD_STYLE;

            if (!tMatchedStyle?.STYLE_CD) return;

            const tKeepProdCd =
                tMessage.PROD_CD ||
                selectedTBL_KSV_PROD_MST?.[0]?.PROD_CD ||
                dataTBL_KSV_PROD_MST?.PROD_CD ||
                "";

            serviceS0303_MRP_RECORD_STYLE
                .mgrQueryTBL_KSV_PROD_MST({ STYLE_CD: tMatchedStyle.STYLE_CD })
                .then((data) => {
                    if (typeof data.graphQLErrors !== "undefined") {
                        console.log(
                            "mgrQueryTBL_KSV_PROD_MST()error => " +
                                JSON.stringify(data.graphQLErrors),
                        );
                        return;
                    }

                    const tProdRows = Array.isArray(data)
                        ? data
                        : data
                          ? [data]
                          : [];

                    setDatasTBL_KSV_PROD_MST(tProdRows);

                    const tMatchedProd =
                        tProdRows.find((row) => row.PROD_CD === tKeepProdCd) ||
                        tProdRows[0];

                    if (tMatchedProd?.PROD_CD) {
                        setSelectedTBL_KSV_PROD_MST([tMatchedProd]);
                        onRowClick1TBL_KSV_PROD_MST(tMatchedProd, {
                            preserveRows: false,
                            preserveScroll: true,
                        });
                    }
                });
        };

        window.addEventListener("message", handleMessage);
        return () => window.removeEventListener("message", handleMessage);
    }, [datasTBL_KCD_STYLE, selectedTBL_KCD_STYLE, dataTBL_KCD_STYLE]);

    useEffect(() => {
        const handleKeyDown = (event) => {
            switch (event.key) {
                case "F2":
                    event.preventDefault();
                    btnAddMaterialRef.current.click();
                    break;
                case "F3":
                    event.preventDefault();
                    btnChangeMaterialRef.current.click();
                    break;
                case "F4":
                    event.preventDefault();
                    commitActiveEditorBeforeAction();
                    Promise.resolve().then(() => {
                        btnUpdateMaterialRef.current?.click();
                    });
                    break;
                case "F5":
                    event.preventDefault();
                    btnMatlSearchRef.current.click();
                    break;
                case "F6":
                    event.preventDefault(); // 기본 새로고침 방지
                    btnDeleteMaterialRef.current.click();
                    break;
                default:
                    break;
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    useEffect(() => {
        if (datasTBL_KCD_STYLE.length > 0) {
            setFlagSelectModeTBL_KCD_STYLE(true);
            var tArray = [];
            tArray.push(datasTBL_KCD_STYLE[0]);
            setSelectedTBL_KCD_STYLE(tArray);
            onRowClick1TBL_KCD_STYLE(datasTBL_KCD_STYLE[0]);
        }
    }, [datasTBL_KCD_STYLE]); // datasTBL_KCD_STYLE 변경 시 실행

    const selectedStyleInfo = getCurrentStyleRow();

    return (
        <div
            className="af-div-main"
            style={{
                padding: "5px",
                width: "100%",
                minWidth: "123rem",
                maxWidth: "100vw",
                boxSizing: "border-box",
            }}
        >
            <div
                className="af-div-first"
                style={{
                    width: "100%",
                    height: "13rem",
                    marginRight: "5px",
                }}
            >
                <div
                    className="af-div-first"
                    style={{
                        width: "100%",
                        height: "3rem",
                        display: "flex",
                        gap: "5px",
                        alignItems: "center",
                    }}
                >
                    <p
                        className="af-span-p"
                        style={{
                            width: "4rem",
                            margin: 0,
                            height: "2rem",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "flex-end",
                            paddingRight: "0.25rem",
                        }}
                    >
                        Style
                    </p>
                    <InputText
                        style={{ width: "32rem" }}
                        ref={inputRefStyleCD}
                        defaultValue={refQRY_KCD_STYLE.current.STYLE_CD}
                        onChange={(e) => { refQRY_KCD_STYLE.current.STYLE_CD = e.target.value; }}
                        onKeyDown={handleSearchInputKeyDown}
                    />

                    <p
                        className="af-span-p"
                        style={{
                            width: "4rem",
                            margin: 0,
                            height: "2rem",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "flex-end",
                            paddingRight: "0.25rem",
                        }}
                    >
                        Buyer
                    </p>
                    <InputText
                        style={{ width: "9rem" }}
                        ref={inputRefBuyerCD}
                        defaultValue={refQRY_KCD_STYLE.current.BUYER_CD}
                        onChange={(e) => { refQRY_KCD_STYLE.current.BUYER_CD = e.target.value; }}
                        onKeyDown={handleSearchInputKeyDown}
                    />

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
                        style={{ width: "7rem", flexShrink: 0 }}
                        className="p-button-text"
                        onClick={search_KCD_STYLE}
                    />

                    <Button
                        label="Reset"
                        style={{ width: "7rem", flexShrink: 0 }}
                        className="p-button-text"
                        onClick={process_RESET}
                    />
                    <Button
                        label="Excel"
                        style={{ width: "7rem", flexShrink: 0 }}
                        className="p-button-text green"
                        onClick={exportExcelTBL_KSV_PROD_MEM}
                    />

                    <div
                        style={{
                            display: "flex",
                            gap: "6px",
                            alignItems: "center",
                            marginLeft: "8px",
                        }}
                    >
                        <p
                            className="af-span-p"
                            style={{
                                width: "3rem",
                                flexShrink: 0,
                                margin: 0,
                                height: "2rem",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "flex-end",
                                paddingRight: "0.25rem",
                            }}
                        >
                            Style
                        </p>
                        <InputText
                            disabled
                            style={{ width: "25rem", height: "2rem" }}
                            value={selectedStyleInfo.STYLE_NAME || ""}
                        />
                        <InputText
                            disabled
                            style={{ width: "8rem", height: "2rem" }}
                            value={selectedStyleInfo.STYLE_CD || ""}
                        />
                    </div>
                </div>
                <div
                    style={{
                        width: "100%",
                        height: "10rem",
                        display: "flex",
                        gap: "8px",
                    }}
                >
                    <div
                        style={{
                            flex: "1 1 auto",
                            minWidth: 0,
                            display: "flex",
                            gap: "6px",
                        }}
                    >
                        <div
                            className="af-div-first"
                            style={{ width: "50%", height: "10rem" }}
                        >
                            <AFDataTable preventUnrelatedRerender
                                ref={dt_TBL_KCD_STYLE}
                                size="small"
                                value={datasTBL_KCD_STYLE}
                                loading={loadingTBL_KCD_STYLE}
                                tableStyle={{ tableLayout: "auto" }}
                                resizableColumns
                                columnResizeMode="expand"
                                showGridlines
                                selectionMode="checkbox"
                                selection={selectedTBL_KCD_STYLE}
                                onSelectionChange={(e) => {
                                    const tSelectedRows = e.value || [];
                                    setFlagSelectModeTBL_KCD_STYLE(true);
                                    setSelectedTBL_KCD_STYLE(tSelectedRows);
                                    console.log(
                                        "selected length:" +
                                            tSelectedRows.length,
                                    );
                                    onRowClick1TBL_KCD_STYLE(tSelectedRows);
                                }}
                                onRowClick={onRowClickTBL_KCD_STYLE}
                                dataKey="STYLE_CD"
                                className="datatable-responsive"
                                virtualScrollerOptions={{ itemSize: 20 }}
                                emptyMessage=" "
                                responsiveLayout="scroll"
                                scrollable
                                scrollHeight="160px"
                            >
                                <AFColumn field="STYLE_NAME" headerClassName="t-header" header={"STYLE"} ></AFColumn>
                            </AFDataTable>
                        </div>
                        <div
                            className="af-div-second"
                            style={{ width: "50%", height: "10rem" }}
                        >
                            <AFDataTable preventUnrelatedRerender
                                ref={dt_TBL_KSV_PROD_MST}
                                editMode="cell"
                                size="small"
                                value={datasTBL_KSV_PROD_MST}
                                tableStyle={{ tableLayout: "fixed" }}
                                resizableColumns
                                columnResizeMode="expand"
                                showGridlines
                                selectionMode="checkbox"
                                selection={selectedTBL_KSV_PROD_MST}
                                onSelectionChange={(e) => {
                                    const tSelectedRows = e.value || [];
                                    setFlagSelectModeTBL_KSV_PROD_MST(true);
                                    setSelectedTBL_KSV_PROD_MST(tSelectedRows);
                                    console.log(
                                        "selected length:" +
                                            tSelectedRows.length,
                                    );
                                    onRowClick1TBL_KSV_PROD_MST(tSelectedRows);
                                }}
                                onRowClick={onRowClickTBL_KSV_PROD_MST}
                                dataKey="PROD_CD"
                                className="datatable-responsive"
                                virtualScrollerOptions={{ itemSize: 20 }}
                                emptyMessage=" "
                                responsiveLayout="scroll"
                                scrollable
                                scrollHeight="160px"
                            >
                                <AFColumn field="COLOR" headerClassName="t-header" header={"COLOR"} style={{ width: "12rem" }} ></AFColumn>
                                <AFColumn field="SIZE_LOSS" headerClassName="t-header" header={"SL"} style={{ width: "3rem" }} body={(rowData) => inlineBodyTBL_KSV_PROD_MST(rowData, "SIZE_LOSS")} bodyStyle={{ backgroundColor: "#e8f5e9" }} ></AFColumn>
                                <AFColumn field="UPD_USER" headerClassName="t-header" header={"Upd User"} style={{ width: "6rem" }} ></AFColumn>
                                <AFColumn field="UPD_DATETIME" headerClassName="t-header" header={"Upd Time"} style={{ width: "6rem" }} ></AFColumn>
                                <AFColumn field="PROD_TYPE_NAME" headerClassName="t-header" header={"Type"} style={{ width: "6rem" }} ></AFColumn>
                                <AFColumn field="PROD_CD" headerClassName="t-header" header={"Prod#"} style={{ width: "8rem" }} ></AFColumn>
                            </AFDataTable>
                        </div>
                    </div>

                    <div
                        className="af-div-second"
                        style={{
                            width: "32rem",
                            minWidth: "32rem",
                            display: "flex",
                            flexDirection: "column",
                            gap: "8px",
                            padding: "4px",
                            justifyContent: "flex-start",
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                gap: "6px",
                                flexWrap: "wrap",
                                alignItems: "center",
                                justifyContent: "flex-start",
                            }}
                        >
                            <Button
                                label="Style MRP Search"
                                style={{ width: "10rem" }}
                                className="p-button-text orange"
                                onClick={popup_STYLE_SEARCH}
                            />
                            <Button
                                label="Order MRP Search"
                                style={{ width: "10rem" }}
                                className="p-button-text orange"
                                onClick={popup_MRP_BY_ORDER_SRCH}
                            />
                        </div>

                        <div
                            style={{
                                display: "flex",
                                gap: "4px",
                                flexWrap: "nowrap",
                                alignItems: "center",
                                justifyContent: "flex-start",
                            }}
                        >
                            <Dropdown
                                style={{ width: "7rem" }}
                                id="id_BOX_UNIT"
                                value={dataETC_DL_KIND}
                                onChange={(e) => setDataETC_DL_KIND(e.value)}
                                options={datasETC_DL_KIND}
                                optionLabel="CD_NAME"
                                placeholder=""
                                
                                filter
                            ></Dropdown>
                            <Button
                                label="S"
                                style={{ width: "2rem" }}
                                className="p-button-text"
                                onClick={process_SEARCH_DL_KIND}
                            ></Button>
                            <Button
                                label="U"
                                style={{ width: "2rem" }}
                                className="p-button-text"
                                onClick={process_UPDATE_DL_KIND}
                            ></Button>
                        </div>

                        <div
                            style={{
                                display: "flex",
                                gap: "4px",
                                flexWrap: "nowrap",
                                alignItems: "center",
                                justifyContent: "flex-start",
                            }}
                        >
                            <Dropdown
                                style={{ width: "13rem" }}
                                id="id_BOX_UNIT"
                                value={
                                    String(
                                        dataQRY_KCD_STYLE2_VENDOR_CD1?.VENDOR_CD ||
                                            dataQRY_KCD_STYLE2_VENDOR_CD1?.VENDOR_NAME ||
                                            "",
                                    ).trim() !== ""
                                        ? dataQRY_KCD_STYLE2_VENDOR_CD1
                                        : null
                                }
                                onHide={() =>
                                    applyVendorCd1Selection(
                                        dataQRY_KCD_STYLE2_VENDOR_CD1 || {},
                                    )
                                }
                                onChange={(e) =>
                                    onDropdownChangeQRY_KCD_STYLE2_VENDOR_CD1(
                                        e,
                                        "VENDOR_CD1",
                                    )
                                }
                                options={datasQRY_KCD_STYLE2_VENDOR_CD1}
                                optionLabel="VENDOR_NAME"
                                valueTemplate={(option) =>
                                    option?.VENDOR_NAME || ""
                                }
                                filter
                            ></Dropdown>
                            <p className="af-span-p" style={{ width: "0.8rem", flexShrink: 0 }}>▶</p>
                            <Dropdown
                                style={{ width: "13rem" }}
                                id="id_BOX_UNIT"
                                value={
                                    String(
                                        dataQRY_KCD_STYLE2_VENDOR_CD2?.VENDOR_CD ||
                                            dataQRY_KCD_STYLE2_VENDOR_CD2?.VENDOR_NAME ||
                                            "",
                                    ).trim() !== ""
                                        ? dataQRY_KCD_STYLE2_VENDOR_CD2
                                        : null
                                }
                                onHide={() =>
                                    applyVendorCd2Selection(
                                        dataQRY_KCD_STYLE2_VENDOR_CD2 || {},
                                    )
                                }
                                onChange={(e) =>
                                    onDropdownChangeQRY_KCD_STYLE2_VENDOR_CD2(
                                        e,
                                        "VENDOR_CD2",
                                    )
                                }
                                options={datasQRY_KCD_STYLE2_VENDOR_CD2}
                                optionLabel="VENDOR_NAME"
                                valueTemplate={(option) =>
                                    option?.VENDOR_NAME || ""
                                }
                                filter
                            ></Dropdown>
                            <Button
                                label="Chg Supp."
                                style={{ width: "5rem", flexShrink: 0 }}
                                className="p-button-text"
                                onClick={updateMaterial_change_vendor}
                            />
                        </div>

                        <div
                            style={{
                                display: "flex",
                                gap: "4px",
                                flexWrap: "nowrap",
                                alignItems: "center",
                                justifyContent: "flex-start",
                            }}
                        >
                            <Button
                                style={{ width: "7rem", flexShrink: 0 }}
                                label="Add Seq"
                                className="p-button-text orange"
                                onClick={popup_ADD_SEQ}
                            />
                            <Button
                                label="#Mrp Chk"
                                style={{ width: "7rem", flexShrink: 0 }}
                                className="p-button-text"
                                onClick={process_MRP_CHECK}
                            />
                            <Button
                                style={{ width: "7rem", flexShrink: 0 }}
                                label="Consum."
                                className="p-button-text green"
                                onClick={export_CONSUMPTION}
                            />
                            <Button
                                label="SL Update"
                                style={{ width: "7rem", flexShrink: 0 }}
                                className="p-button-text"
                                onClick={updateMaterial_size_loss}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    backgroundColor: "white",
                    paddingTop: "20px",
                    height: "80px",
                    gap: "8px",
                }}
            >
                <div style={{ display: "flex", flexDirection: "row", gap: "6px" }}>
                    <Button
                        label="Net/Loss Update"
                        style={{ width: "10rem" }}
                        className="p-button-text"
                        onClick={updateMaterial_net_loss}
                    />

                    <Button
                        label="Loss(S)->Loss"
                        style={{ width: "10rem" }}
                        className="p-button-text"
                        onClick={updateMaterial_std_loss_to_loss}
                    />
                    <Button
                        label="Chg Size/Usage"
                        style={{ width: "12.5rem" }}
                        className="p-button-text"
                        onClick={updateMaterial_size_usage}
                    />
                    <Button
                        label="P.Search"
                        style={{ width: "7rem" }}
                        className="p-button-text"
                        onClick={process_P_SRCH}
                    />
                </div>
            </div>

            <div
                className="af-div-first"
                style={{
                    width: "calc(100% - 1.5rem)",
                    height: "calc( ( 100vh - 20rem ) / 2 )",
                    marginTop: "20px",
                    display: "flex",
                }}
            >
                {/* 테이블 영역 */}
                <div style={{ flex: 1, minWidth: 0 }}>
                    <AFDataTable preventUnrelatedRerender
                        ref={dt_TBL_KSV_PROD_MEM}
                        renderDependency={countryEditorRenderDependency}
                        editMode="cell"
                        size="small"
                        value={datasTBL_KSV_PROD_MEM}
                        tableStyle={{ tableLayout: "fixed" }}
                        style={{ flex: 1, minWidth: 0 }}
                        resizableColumns
                        columnResizeMode="expand"
                        loading={loadingTBL_KSV_PROD_MEM}
                        showGridlines
                        selection={selectedTBL_KSV_PROD_MEM}
                        selectionMode="checkbox"
                        onSelectionChange={(e) => {
                            if (patchingProdMemRef.current) return;
                            clearQRY_KCD_STYLE2_VENDOR_CD1();
                            setSelectedTBL_KSV_PROD_MEM(e.value || []);
                        }}
                        onRowClick={onRowClickTBL_KSV_PROD_MEM}
                        dataKey="__ROW_KEY"
                        className="datatable-responsive"
                        useVirtualScroller={true}
                        onCellDoubleClick={onCellDoubleClickTBL_KSV_PROD_MEM}
                        onRowDoubleClick={onRowDoubleClickTBL_KSV_PROD_MEM}
                        emptyMessage=" "
                        responsiveLayout="scroll"
                        scrollable
                        rememberScroll={true}
                        virtualScrollerOptions={{ itemSize: 20 }}
                        scrollHeight="160px"
                        disableSort={true}
                        rowClassName={(data) =>
                            isUnusableMaterialRow(data) ? "unusable-row" : ""
                        }
                    >
                        <AFColumn selectionMode="multiple" field="__checkbox__" reorderable={false} headerClassName="t-header" headerStyle={{ width: "3rem" }} ></AFColumn>
                        {/*<AFColumn field="MATL_TYPE2_N" headerClassName='t-header' header={"M.Type2"} style={{ width: '4rem'}}></AFColumn>*/}
                        <AFColumn
                            field="MRP_CHECK"
                            headerClassName="t-header"
                            header={<span style={{ cursor: "pointer" }} onClick={onClickHeaderMrpCheck}>A</span>}
                            style={{ width: "4rem" }}
                            body={bodyMrpCheckTBL_KSV_PROD_MEM}
                        ></AFColumn>
                        <AFColumn field="MATL_NAME" headerClassName="t-header" header={"MATL NAME"} style={{ width: "17rem" }} ></AFColumn>
                        <AFColumn field="MATL_CD" headerClassName="t-header" header={"MATL#"} style={{ width: "5rem" }} className="orange" body={bodyMatlCdTBL_KSV_PROD_MEM} ></AFColumn>
                        <AFColumn forceWidth field="COLOR" headerClassName="t-header" header={"COLOR"} style={{ width: "8rem" }} ></AFColumn>
                        <AFColumn forceWidth field="SPEC" headerClassName="t-header" header={"SPEC"} style={{ width: "10rem" }} className="orange" body={(rowData) => renderDoubleClickCell(rowData.SPEC, rowData, "SPEC", (data) => popup_SPEC(data))} ></AFColumn>
                        <AFColumn field="SALES_MATL_PRICE" headerClassName="t-header" header={"S.Price"} style={{ width: "4rem" }} body={(rowData) => serviceLib.numWithCommas( rowData.SALES_MATL_PRICE, 4, ) } bodyStyle={{ textAlign: "right" }} ></AFColumn>
                        {/*<AFColumn field="SALES_CURR_CD" headerClassName='t-header' header={"S.Curr"} style={{ width: '4rem'}}></AFColumn>*/}
                        <AFColumn field="MATL_PRICE" headerClassName="t-header" header={"M.Price"} style={{ width: "4rem" }} body={(rowData) => serviceLib.numWithCommas(rowData.MATL_PRICE, 4) } bodyStyle={{ textAlign: "right" }} ></AFColumn>
                        <AFColumn field="CURR_CD" headerClassName="t-header" header={"Curr"} style={{ width: "4rem" }} ></AFColumn>
                        <AFColumn field="UNIT" headerClassName="t-header" header={"UNIT"} style={{ width: "4rem" }} ></AFColumn>
                        <AFColumn field="ADD_LOSS" headerClassName="t-header" header={"Add Loss"} style={{ width: "4rem" }} body={(rowData) => serviceLib.numWithCommas(rowData.ADD_LOSS, 2) } bodyStyle={{ textAlign: "right" }} ></AFColumn>
                        <AFColumn field="USE_SIZE" headerClassName="t-header" header={"Size"} style={{ width: "5rem", color: "green" }} body={(rowData) => inlineBodyTBL_KSV_PROD_MEM(rowData, "USE_SIZE")} bodyStyle={{ backgroundColor: "#e8f5e9" }} ></AFColumn>
                        <AFColumn field="REMARK" headerClassName="t-header" header={"Usage"} style={{ width: "25rem", color: "green" }} body={(rowData) => inlineBodyTBL_KSV_PROD_MEM(rowData, "REMARK")} bodyStyle={{ backgroundColor: "#e8f5e9" }} ></AFColumn>
                        <AFColumn field="COUNTRY" headerClassName="t-header" header={"Country"} style={{ width: "10rem", color: "green" }} body={(rowData) => inlineBodyTBL_KSV_PROD_MEM(rowData, "COUNTRY")} bodyStyle={{ backgroundColor: "#e8f5e9" }} ></AFColumn>
                        <AFColumn field="STD_NET" headerClassName="t-header" header={"Net(S)"} style={{ width: "5rem", color: "green" }} body={(rowData) => inlineBodyTBL_KSV_PROD_MEM(rowData, "STD_NET")} bodyStyle={{ textAlign: "right", backgroundColor: "#e8f5e9" }} ></AFColumn>
                        <AFColumn field="STD_LOSS" headerClassName="t-header" header={"Loss(S)"} style={{ width: "5rem", color: "green" }} body={(rowData) => inlineBodyTBL_KSV_PROD_MEM(rowData, "STD_LOSS")} bodyStyle={{ textAlign: "right", backgroundColor: "#e8f5e9" }} ></AFColumn>
                        <AFColumn field="NET" headerClassName="t-header" header={"NET"} style={{ width: "5rem", color: "green" }} body={(rowData) => inlineBodyTBL_KSV_PROD_MEM(rowData, "NET")} bodyStyle={{ textAlign: "right", backgroundColor: "#e8f5e9" }} ></AFColumn>
                        <AFColumn field="LOSS" headerClassName="t-header" header={"LOSS"} style={{ width: "5rem", color: "green" }} body={(rowData) => inlineBodyTBL_KSV_PROD_MEM(rowData, "LOSS")} bodyStyle={{ textAlign: "right", backgroundColor: "#e8f5e9" }} ></AFColumn>
                        <AFColumn field="GROSS" headerClassName="t-header" header={"GROSS"} style={{ width: "5rem" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.GROSS, 4) } ></AFColumn>
                        <AFColumn field="VENDOR_NAME" headerClassName="t-header" header={"Supplier"} style={{ width: "10rem" }} ></AFColumn>
                        <AFColumn field="DL_FLAG" headerClassName="t-header" header={"DL"} style={{ width: "2rem" }} ></AFColumn>
                        <AFColumn field="SEQ" headerClassName="t-header" header={"#"} style={{ width: "2.5rem" }} ></AFColumn>
                    </AFDataTable>
                </div>

                <div
                    className="af-div-second"
                    style={{
                        paddingLeft: "15px",
                        width: "3rem",
                        height: "20rem",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <InputText
                        disabled
                        style={{ width: "2.7rem", textAlign: "center" }}
                        id="id_REMARK"
                        value={dataETC_ROW_COUNT}
                        onChange={(e) =>
                            onInputChangeETC_ROW_COUNT(e, "ETC_ROW_COUNT")
                        }
                    />

                    <Button
                        label="▲"
                        rounded
                        style={{ width: "2.7rem", height: "2.7rem" }}
                        onClick={updateMaterial_move_up_first}
                    />

                    <Button
                        label="△"
                        rounded
                        style={{ width: "2.7rem", height: "2.7rem" }}
                        onClick={updateMaterial_move_up}
                    />

                    <InputText
                        style={{ width: "2.7rem", textAlign: "center" }}
                        id="id_REMARK"
                        value={dataETC_MOVE_COUNT}
                        onChange={(e) =>
                            onInputChangeETC_MOVE_COUNT(e, "ETC_MOVE_COUNT")
                        }
                    />

                    <Button
                        label="▽"
                        rounded
                        style={{ width: "2.7rem", height: "2.7rem" }}
                        onClick={updateMaterial_move_down}
                    />

                    <Button
                        label="▼"
                        rounded
                        style={{ width: "2.7rem", height: "2.7rem" }}
                        onClick={updateMaterial_move_down_bottom}
                    />
                </div>
            </div>

            <div
                className="af-div-second"
                style={{
                    width: "100%",
                    padding: "0",
                    margin: "5px 5px 0 5px",
                    boxSizing: "border-box",
                    overflowX: "hidden",
                    overflowY: "hidden",
                }}
            >
                <div
                    className="af-div-first"
                    style={{
                        width: "100%",
                        display: "flex",
                        gap: "12px",
                        alignItems: "stretch",
                        flexWrap: "nowrap",
                        minWidth: "123rem",
                    }}
                >
                    <div
                        style={{
                            flex: "0 0 61rem",
                            display: "flex",
                            flexDirection: "column",
                            gap: "6px",
                            minWidth: "61rem",
                            padding: "6px",
                            border: "1px solid #d9d9d9",
                            borderRadius: "4px",
                        }}
                    >
                        <div style={{ display: "flex", gap: "8px", flexWrap: "nowrap", alignItems: "center" }}>
                            <div style={{ flex: "1.7 1 0", minWidth: 0, display: "flex", alignItems: "center", gap: "6px" }}>
                                <p style={{ width: "3rem", margin: 0, textAlign: "right", flexShrink: 0 }}>Desc</p>
                                <InputText
                                    style={{ width: "100%" }}
                                    ref={inputRefMatlName}
                                    defaultValue={refQRY_KCD_MATL_MST_MATL_NAME.current}
                                    onKeyDown={handleMatlSearchInputKeyDown}
                                    onChange={(e) => { refQRY_KCD_MATL_MST_MATL_NAME.current = e.target.value; }}
                                />
                            </div>
                            <div style={{ flex: "0.7 1 0", minWidth: 0, display: "flex", alignItems: "center", gap: "6px" }}>
                                <p style={{ width: "2.7rem", margin: 0, textAlign: "right", flexShrink: 0 }}>Color</p>
                                <InputText
                                    style={{ width: "100%" }}
                                    ref={inputRefMatlColor}
                                    defaultValue={refQRY_KCD_MATL_MST_COLOR.current}
                                    onKeyDown={handleMatlSearchInputKeyDown}
                                    onChange={(e) => {
                                        refQRY_KCD_MATL_MST_COLOR.current = e.target.value;
                                        processPSearchStateRef.current = { keyword: "", lastKey: "", scopeKey: "" };
                                    }}
                                />
                            </div>
                            <div style={{ flex: "0.7 1 0", minWidth: 0, display: "flex", alignItems: "center", gap: "6px" }}>
                                <p style={{ width: "3.2rem", margin: 0, textAlign: "right", flexShrink: 0 }}>Matl#</p>
                                <InputText
                                    style={{ width: "100%" }}
                                    ref={inputRefMatlCD}
                                    defaultValue={refQRY_KCD_MATL_MST_MATL_CD.current}
                                    onKeyDown={handleMatlSearchInputKeyDown}
                                    onChange={(e) => { refQRY_KCD_MATL_MST_MATL_CD.current = e.target.value; }}
                                />
                            </div>
                            <Button
                                label="P.Search"
                                style={{ width: "6.25rem", flexShrink: 0 }}
                                className="p-button-text"
                                onClick={process_P_SRCH}
                            />
                        </div>
                        <div style={{ display: "flex", gap: "8px", flexWrap: "nowrap", alignItems: "center" }}>
                            <div style={{ flex: "0.7 1 0", minWidth: 0, display: "flex", alignItems: "center", gap: "6px" }}>
                                <p style={{ width: "3rem", margin: 0, textAlign: "right", flexShrink: 0 }}>Spec</p>
                                <InputText
                                    style={{ width: "100%" }}
                                    ref={inputRefMatlSpec}
                                    defaultValue={refQRY_KCD_MATL_MST_SPEC.current}
                                    onKeyDown={handleMatlSearchInputKeyDown}
                                    onChange={(e) => { refQRY_KCD_MATL_MST_SPEC.current = e.target.value; }}
                                />
                            </div>
                            <div style={{ flex: "0.3 1 0", minWidth: 0, display: "flex", alignItems: "center", gap: "6px" }}>
                                <p style={{ width: "4.1rem", margin: 0, textAlign: "right", flexShrink: 0 }}>Supplier</p>
                                <InputText
                                    style={{ width: "100%" }}
                                    ref={inputRefMatlVendorName}
                                    defaultValue={refQRY_KCD_MATL_MST_VENDOR_NAME.current}
                                    onKeyDown={handleMatlSearchInputKeyDown}
                                    onChange={(e) => { refQRY_KCD_MATL_MST_VENDOR_NAME.current = e.target.value; }}
                                />
                            </div>
                            <Button
                                label="M.Search(F5)"
                                style={{ width: "7rem", flexShrink: 0 }}
                                className="p-button-text"
                                onClick={searchTBL_KCD_MATL_MST}
                                ref={btnMatlSearchRef}
                            />
                            <Button
                                label="Reset"
                                style={{ width: "6.25rem", flexShrink: 0 }}
                                className="p-button-text"
                                onClick={resetTBL_KCD_MATL_MST}
                            />
                        </div>
                    </div>

                    <div
                        style={{
                            flex: "0 0 61rem",
                            display: "flex",
                            flexDirection: "column",
                            gap: "6px",
                            minWidth: "61rem",
                            marginRight: "5px",
                            padding: "6px",
                            border: "1px solid #d9d9d9",
                            borderRadius: "4px",
                        }}
                    >
                        <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "nowrap" }}>
                            <span className="af-span-3-0" style={{ width: "6.5rem" }}>
                                <p className="af-span-p" style={{ width: "5rem" }}>Standard</p>
                                <div className="af-span-checkbox">
                                    <Checkbox
                                        id="id_STD_FLAG"
                                        checked={changeCheckBoxVal(
                                            dataEDT_KSV_PROD_MEM.STD_FLAG,
                                        )}
                                        onChange={(e) =>
                                            onCheckboxChangeEDT_KSV_PROD_MEM_STD_FLAG(
                                                e,
                                                "STD_FLAG",
                                            )
                                        }
                                    />
                                </div>
                            </span>
                            <span className="af-span-3-0" style={{ width: "8rem" }}>
                                <p className="af-span-p" style={{ width: "3rem", whiteSpace: "nowrap" }}>NET</p>
                                    <InputText
                                        style={{ width: "4rem", marginLeft: "5px" }}
                                        ref={inputRefEDT_NET}
                                        defaultValue={refEDT_TEXT.current.NET}
                                        onChange={(e) => { refEDT_TEXT.current.NET = e.target.value; }}
                                    />
                            </span>
                            <span className="af-span-3-0" style={{ width: "14rem", flexShrink: 0 }}>
                                <p className="af-span-p" style={{ width: "3rem" }}>SIZE</p>
                                    <InputText
                                        style={{ width: "10rem", marginLeft: "5px" }}
                                        id="id_USE_SIZE"
                                        ref={inputRefEDT_USE_SIZE}
                                        defaultValue={refEDT_TEXT.current.USE_SIZE}
                                        onChange={(e) => { refEDT_TEXT.current.USE_SIZE = e.target.value; }}
                                    />
                            </span>
                            <Button
                                label="Net/Loss Update"
                                style={{ width: "8rem", flexShrink: 0, whiteSpace: "nowrap" }}
                                className="p-button-text"
                                onClick={updateMaterial_net_loss}
                            />
                            <Button
                                label="Loss(S)->Loss"
                                style={{ width: "8rem", flexShrink: 0, whiteSpace: "nowrap" }}
                                className="p-button-text"
                                onClick={updateMaterial_std_loss_to_loss}
                            />
                            <Button
                                label="Chg Size/Usage"
                                style={{ width: "8rem", flexShrink: 0, whiteSpace: "nowrap" }}
                                className="p-button-text"
                                onClick={updateMaterial_size_usage}
                            />
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "nowrap" }}>
                            <span className="af-span-3" style={{ width: "6.5rem" }}>
                                <p className="af-span-p" style={{ width: "5rem" }}>All Matl</p>
                                <div className="af-span-checkbox">
                                    <Checkbox
                                        id="id_STD_FLAG"
                                        checked={changeCheckBoxVal(
                                            dataEDT_KSV_PROD_MEM.ALL_FLAG,
                                        )}
                                        onChange={(e) =>
                                            onCheckboxChangeEDT_KSV_PROD_MEM_ALL_FLAG(
                                                e,
                                                "ALL_FLAG",
                                            )
                                        }
                                    />
                                </div>
                            </span>
                            <span className="af-span-3" style={{ width: "8rem" }}>
                                <p className="af-span-p" style={{ width: "3rem", whiteSpace: "nowrap" }}>LOSS</p>
                                    <InputText
                                        style={{ width: "4rem", marginLeft: "5px" }}
                                        id="id_LOSS"
                                        ref={inputRefEDT_LOSS}
                                        defaultValue={refEDT_TEXT.current.LOSS}
                                        onChange={(e) => { refEDT_TEXT.current.LOSS = e.target.value; }}
                                    />
                            </span>
                            <span className="af-span-3" style={{ width: "35.5rem", flexShrink: 0 }}>
                                <p className="af-span-p" style={{ width: "3rem" }}>Usage</p>
                                    <InputText
                                        style={{ width: "31rem", marginLeft: "5px" }}
                                        id="id_REMARK"
                                        ref={inputRefEDT_REMARK}
                                        defaultValue={refEDT_TEXT.current.REMARK}
                                        onChange={(e) => { refEDT_TEXT.current.REMARK = e.target.value; }}
                                    />
                            </span>
                            <Button
                                label="Reset"
                                style={{ width: "5rem", flexShrink: 0 }}
                                className="p-button-text"
                                onClick={resetStdFlag}
                            />
                        </div>
                    </div>
                </div>
                <div
                    className="af-div-first"
                    style={{
                        width: "100%",
                        height: "calc( ( 100vh - 30rem ) / 2 - 0rem )",
                        display: "flex",
                        marginLeft: '-5px',
                        paddingBottom: '10px',
                    }}
                >
                    <div
                        className="af-div-first"
                        style={{ width: "calc(100% - 100px)", height: "100%" }}
                    >
                        <AFDataTable preventUnrelatedRerender
                            ref={dt_TBL_KCD_MATL_MST}
                            rememberScroll={true}
                            useVirtualScroller={true}
                            virtualScrollerOptions={{ itemSize: 20 }}
                            size="small"
                            value={datasTBL_KCD_MATL_MST}
                            tableStyle={{ tableLayout: "fixed" }}
                            resizableColumns
                            columnResizeMode="expand"
                            metaKeySelection={false}
                            showGridlines
                            selectionMode="checkbox"
                            selection={selectedTBL_KCD_MATL_MST}
                            onSelectionChange={(e) => {
                                const tSelectedRows = e.value || [];
                                setFlagSelectModeTBL_KCD_MATL_MST(true);
                                setSelectedTBL_KCD_MATL_MST(tSelectedRows);
                                console.log(
                                    "selected length:" +
                                        tSelectedRows.length,
                                );
                                onRowClick1TBL_KCD_MATL_MST(tSelectedRows);
                            }}
                            onRowClick={onRowClickTBL_KCD_MATL_MST}
                            dataKey="MATL_CD"
                            className="datatable-responsive"
                            emptyMessage=" "
                            responsiveLayout="scroll"
                            loading={loadingTBL_KCD_MATL_MST}
                            scrollable
                            scrollHeight="160px"
                            rowClassName={(data) =>
                                isUnusableMaterialRow(data) ? "unusable-row" : ""
                            }
                        >
                            <AFColumn selectionMode="multiple" field="__checkbox__" reorderable={false} headerClassName="t-header" headerStyle={{ width: "3rem" }} ></AFColumn>
                            <AFColumn field="MATL_CD" headerClassName="t-header" header="Matl#" style={{ width: "7rem" }} ></AFColumn>
                            <AFColumn field="MATL_NAME" headerClassName="t-header" header="Description" style={{ width: "auto" }} ></AFColumn>
                            <AFColumn field="COLOR" headerClassName="t-header" header="Color" style={{ width: "auto" }} ></AFColumn>
                            <AFColumn field="SPEC" headerClassName="t-header" header="Spec" style={{ width: "auto" }} ></AFColumn>
                            <AFColumn field="UNIT" headerClassName="t-header" header="Unit" style={{ width: "4rem" }} ></AFColumn>
                            <AFColumn field="CURR_CD" headerClassName="t-header" header={"M.Curr"} style={{ width: "4rem" }} ></AFColumn>
                            <AFColumn field="MATL_PRICE" headerClassName="t-header" header={"M.Price"} style={{ width: "4rem" }} className="text-right" body={(row) => serviceLib.formatNumber(row.MATL_PRICE, 4) } ></AFColumn>
                            <AFColumn field="S_CURR_CD" headerClassName="t-header" header={"S.Curr"} style={{ width: "4rem" }} ></AFColumn>
                            <AFColumn field="S_MATL_PRICE" headerClassName="t-header" header={"S.Price"} style={{ width: "4rem" }} className="text-right" body={(row) => serviceLib.formatNumber(row.S_MATL_PRICE, 4) } ></AFColumn>
                            <AFColumn field="VENDOR_NAME" headerClassName="t-header" header="Supplier" style={{ width: "auto" }} ></AFColumn>
                        </AFDataTable>
                    </div>
                    <div style={{ width: "100px" }}>
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "5px",
                                marginTop: "5px",
                            }}
                        >
                            <Button
                                style={{ width: "9rem" }}
                                label="Matl Add(F2)"
                                className="p-button-text"
                                onClick={addMaterial}
                                ref={btnAddMaterialRef}
                            />

                            <Button
                                style={{ width: "9rem" }}
                                label="Matl Change(F3)"
                                className="p-button-text"
                                onClick={changeMaterial}
                                ref={btnChangeMaterialRef}
                            />

                            <Button
                                style={{ width: "9rem" }}
                                label="Matl Update(F4)"
                                className="p-button-text"
                                onClick={updateMaterial}
                                ref={btnUpdateMaterialRef}
                            />

                            <Button
                                style={{ width: "9rem" }}
                                label="Matl Delete(F6)"
                                className="p-button-text"
                                onClick={deleteMaterial}
                                ref={btnDeleteMaterialRef}
                            />
                        </div>
                        <span className="af-span-3-0" style={{ width: "6rem" }}>
                            <p className="af-span-p" style={{ width: "4rem" }}>All Color</p>
                            <div className="af-span-checkbox">
                                <Checkbox
                                    id="id_STD_FLAG"
                                    checked={changeCheckBoxVal(
                                        dataEDT_KSV_PROD_MEM.ALL_COLOR_FLAG,
                                    )}
                                    onChange={(e) =>
                                        onCheckboxChangeEDT_KSV_PROD_MEM_ALL_COLOR_FLAG(
                                            e,
                                            "ALL_COLOR_FLAG",
                                        )
                                    }
                                />
                            </div>
                        </span>
                    </div>
                </div>
            </div>

            <Toast ref={toast} />

            <Dialog
                visible={createDialog}
                position="mid-center"
                style={{ overflow: "hidden", width: "630px", height: "300px" }}
                header=""
                modal={true}
                className="p-fluid"
                onHide={hideDialog}
            >
                <iframe
                    src={urlIframe}
                    width="600px"
                    height="250px"
                    id="id1"
                    className="myClassname"
                    style={{
                        overflow: "hidden",
                        border: "none",
                        backgroundColor: "white",
                    }}
                />
            </Dialog>
            <Dialog
                visible={createDialog2}
                position="mid-center"
                style={{ width: "119rem", height: "61rem" }}
                header="Usage List"
                modal={true}
                className="p-fluid"
                onHide={unpopup_SPEC}
            >
                <div
                    className="af-div-first"
                    style={{ width: "117rem", height: "3rem" }}
                >
                    <span className="af-span-3-0" style={{ width: "19rem" }}>
                        <p className="af-span-p" style={{ width: "5rem" }}>Usage</p>
                        <div className="af-span-div" style={{ width: "10rem" }}>
                            <InputText
                                style={{ width: "10rem" }}
                                value={dataEDT_KSV_PROD_MEM_USAGE.USAGE}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_PROD_MEM_USAGE_USAGE(
                                        e,
                                        "USAGE",
                                    )
                                }
                            />
                        </div>
                        <div className="af-span-div" style={{ width: "2rem" }}>
                            <Button
                                label="U"
                                style={{ width: "2rem" }}
                                className="p-button-text"
                                onClick={process_UPDATE_SPEC_USAGE}
                            />
                        </div>
                    </span>
                    <span className="af-span-3-0" style={{ width: "19rem" }}>
                        <p className="af-span-p" style={{ width: "5rem" }}>Net(S)</p>
                        <div className="af-span-div" style={{ width: "10em" }}>
                            <InputText
                                style={{ width: "10rem" }}
                                value={dataEDT_KSV_PROD_MEM_USAGE.NET_S}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_PROD_MEM_USAGE_NET_S(
                                        e,
                                        "NET_S",
                                    )
                                }
                                onKeyDown={(e) => {
                                    if (e.key !== "Enter") return;
                                    e.preventDefault();
                                    const val = (e.target && e.target.value) || "";
                                    setDataEDT_KSV_PROD_MEM_USAGE((prev) => ({
                                        ...prev,
                                        NET_S: val,
                                        NET: val,
                                    }));
                                    if (val !== "") process_UPDATE_SPEC_BATCH("NET_S", val);
                                }}
                            />
                        </div>
                        <div className="af-span-div" style={{ width: "2rem" }}>
                            <Button
                                label="U"
                                style={{ width: "2rem" }}
                                className="p-button-text"
                                onClick={process_UPDATE_SPEC_NET_S}
                            />
                        </div>
                    </span>
                    <span className="af-span-3-0" style={{ width: "19rem" }}>
                        <p className="af-span-p" style={{ width: "5rem" }}>Net</p>
                        <div className="af-span-div" style={{ width: "10em" }}>
                            <InputText
                                style={{ width: "10rem" }}
                                value={dataEDT_KSV_PROD_MEM_USAGE.NET}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_PROD_MEM_USAGE_NET(
                                        e,
                                        "NET",
                                    )
                                }
                            />
                        </div>
                        <div className="af-span-div" style={{ width: "2rem" }}>
                            <Button
                                label="U"
                                style={{ width: "2rem" }}
                                className="p-button-text"
                                onClick={process_UPDATE_SPEC_NET}
                            />
                        </div>
                    </span>
                    <span className="af-span-3-0" style={{ width: "19rem" }}>
                        <p className="af-span-p" style={{ width: "5rem" }}>Loss</p>
                        <div className="af-span-div" style={{ width: "10em" }}>
                            <InputText
                                style={{ width: "10rem" }}
                                value={dataEDT_KSV_PROD_MEM_USAGE.LOSS}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_PROD_MEM_USAGE_LOSS(
                                        e,
                                        "LOSS",
                                    )
                                }
                                onKeyDown={(e) => {
                                    if (e.key !== "Enter") return;
                                    e.preventDefault();
                                    const val = (e.target && e.target.value) || "";
                                    setDataEDT_KSV_PROD_MEM_USAGE((prev) => ({
                                        ...prev,
                                        LOSS: val,
                                    }));
                                    if (val !== "") process_UPDATE_SPEC_BATCH("LOSS", val);
                                }}
                            />
                        </div>
                        <div className="af-span-div" style={{ width: "2rem" }}>
                            <Button
                                label="U"
                                style={{ width: "2rem" }}
                                className="p-button-text"
                                onClick={process_UPDATE_SPEC_LOSS}
                            />
                        </div>
                    </span>
                    <span className="af-span-3-0" style={{ width: "8rem" }}>
                        <div className="af-span-div" style={{ width: "7rem" }}>
                            <Button
                                label="Save"
                                style={{ width: "7rem" }}
                                className="p-button-text"
                                onClick={process_UPDATE_SPEC}
                            />
                        </div>
                    </span>
                    <span className="af-span-3-0" style={{ width: "8rem" }}>
                        <div className="af-span-div" style={{ width: "7rem" }}>
                            <Button
                                label="Exit"
                                style={{ width: "7rem" }}
                                className="p-button-text"
                                onClick={unpopup_SPEC}
                            />
                        </div>
                    </span>
                </div>

                <div
                    className="af-div-first"
                    style={{ width: "100%", height: "49rem" }}
                >
                    <AFDataTable preventUnrelatedRerender
                        ref={dt_TBL_KSV_PROD_MEM1}
                        renderDependency={countryEditorRenderDependency}
                        editMode="cell"
                        size="small"
                        value={datasTBL_KSV_PROD_MEM1}
                        tableStyle={{ tableLayout: "fixed" }}
                        resizableColumns
                        columnResizeMode="expand"
                        loading={loadingTBL_KSV_PROD_MEM1}
                        metaKeySelection={false}
                        showGridlines
                        selectionMode="checkbox"
                        selection={selectedTBL_KSV_PROD_MEM1}
                        onSelectionChange={(e) => {
                            setSelectedTBL_KSV_PROD_MEM1(e.value || []);
                        }}
                        onRowClick={onRowClickTBL_KSV_PROD_MEM1}
                        dataKey="id"
                        className="datatable-responsive"
                        virtualScrollerOptions={{ itemSize: 20 }}
                        emptyMessage=" " //header={headerTBL_KSV_PROD_MEM1}
                        responsiveLayout="scroll"
                        scrollable
                        scrollHeight="31rem"
                    >
                        <AFColumn selectionMode="multiple" field="__checkbox__" reorderable={false} headerClassName="t-header" headerStyle={{ width: "3rem" }} ></AFColumn>

                        {/*<AFColumn field="id" headerClassName='t-header' header={"#"} style={{ width: '8rem'}}></AFColumn>*/}
                        <AFColumn field="PROD_CD_N" headerClassName="t-header" header={"Product"} style={{ width: "8rem" }} ></AFColumn>
                        <AFColumn field="MATL_NAME" headerClassName="t-header" header={"MATL NAME"} style={{ width: "13rem" }} ></AFColumn>
                        <AFColumn field="MATL_CD" headerClassName="t-header" header={"MATL CD"} style={{ width: "5rem" }} ></AFColumn>
                        <AFColumn field="COLOR" headerClassName="t-header" header={"COLOR"} style={{ width: "8rem" }} ></AFColumn>
                        <AFColumn field="SPEC" headerClassName="t-header" header={"SPEC"} style={{ width: "10rem" }} ></AFColumn>
                        <AFColumn field="MATL_PRICE" headerClassName="t-header" header={"Master Price"} style={{ width: "4rem" }} body={(rowData) => serviceLib.numWithCommas(rowData.MATL_PRICE, 4) } bodyStyle={{ textAlign: "right" }} ></AFColumn>
                        <AFColumn field="CURR_CD" headerClassName="t-header" header={"Curr"} style={{ width: "4rem" }} ></AFColumn>
                        <AFColumn field="UNIT" headerClassName="t-header" header={"UNIT"} style={{ width: "4rem" }} ></AFColumn>
                        <AFColumn field="ADD_LOSS" headerClassName="t-header" header={"Add Loss"} style={{ width: "4rem" }} body={(rowData) => serviceLib.numWithCommas(rowData.ADD_LOSS, 2) } bodyStyle={{ textAlign: "right" }} ></AFColumn>
                        <AFColumn field="USE_SIZE" headerClassName="t-header" header={"USE SIZE"} style={{ width: "5rem", color: "green" }} body={(rowData) => inlineBodyTBL_KSV_PROD_MEM1(rowData, "USE_SIZE")} bodyStyle={{ backgroundColor: "#e8f5e9" }} ></AFColumn>
                        <AFColumn field="REMARK" headerClassName="t-header" header={"Usage"} style={{ width: "13rem", color: "green" }} body={(rowData) => inlineBodyTBL_KSV_PROD_MEM1(rowData, "REMARK")} bodyStyle={{ backgroundColor: "#e8f5e9" }} ></AFColumn>
                        <AFColumn field="COUNTRY" headerClassName="t-header" header={"Country"} style={{ width: "10rem", color: "green" }} body={(rowData) => inlineBodyTBL_KSV_PROD_MEM1(rowData, "COUNTRY")} bodyStyle={{ backgroundColor: "#e8f5e9" }} ></AFColumn>
                        <AFColumn field="STD_NET" headerClassName="t-header" header={"Net(S)"} style={{ width: "5rem", color: "green" }} body={(rowData) => inlineBodyTBL_KSV_PROD_MEM1(rowData, "STD_NET")} bodyStyle={{ textAlign: "right", backgroundColor: "#e8f5e9" }} ></AFColumn>
                        <AFColumn field="STD_LOSS" headerClassName="t-header" header={"Loss(S)"} style={{ width: "5rem", color: "green" }} body={(rowData) => inlineBodyTBL_KSV_PROD_MEM1(rowData, "STD_LOSS")} bodyStyle={{ textAlign: "right", backgroundColor: "#e8f5e9" }} ></AFColumn>
                        <AFColumn field="NET" headerClassName="t-header" header={"NET"} style={{ width: "5rem", color: "green" }} body={(rowData) => inlineBodyTBL_KSV_PROD_MEM1(rowData, "NET")} bodyStyle={{ textAlign: "right", backgroundColor: "#e8f5e9" }} ></AFColumn>
                        <AFColumn field="LOSS" headerClassName="t-header" header={"LOSS"} style={{ width: "5rem", color: "green" }} body={(rowData) => inlineBodyTBL_KSV_PROD_MEM1(rowData, "LOSS")} bodyStyle={{ textAlign: "right", backgroundColor: "#e8f5e9" }} ></AFColumn>
                        <AFColumn field="GROSS" headerClassName="t-header" header={"GROSS"} style={{ width: "5rem" }} bodyStyle={{ textAlign: "right" }} ></AFColumn>
                        <AFColumn field="VENDOR_NAME" headerClassName="t-header" header={"Supplier"} style={{ width: "10rem" }} ></AFColumn>
                    </AFDataTable>
                </div>
            </Dialog>

            <datalist id="natList">
                {datasETC_KCD_NATION.map((nat, idx) => (
                    <option value={`${nat.NAT_CD}`}>{nat.NAT_NAME} {nat.NAT_CD}</option>
                ))}
            </datalist>
        </div>
    );
};

const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(S0303_MRP_RECORD_STYLE, comparisonFn);
