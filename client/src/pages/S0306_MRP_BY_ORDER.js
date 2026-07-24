/* eslint-disable no-restricted-globals, no-unused-vars, no-redeclare, react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef, useCallback } from "react";
import ReactDOM from "react-dom";
import { AFDataTable } from "../components/AFDataTable";
import { AFColumn } from "../components/AFColumn";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { Tooltip } from "primereact/tooltip";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Checkbox } from "primereact/checkbox";

import { ServiceLib } from "../service/service_lib/ServiceLib";
import { ServiceS0305_MRP_MANAGER } from "../service/service_biz/ServiceS0305_MRP_MANAGER";
import { ServiceS0306_MRP_BY_ORDER } from "../service/service_biz/ServiceS0306_MRP_BY_ORDER";
import { ServiceS0301_MATL_RECORD } from "../service/service_biz/ServiceS0301_MATL_RECORD";
import { ServiceS0303_MRP_RECORD_STYLE } from "../service/service_biz/ServiceS0303_MRP_RECORD_STYLE";
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
    ORDER_MRP_SEQ: "",
};

const emptyQRY_KCD_STYLE = {
    STYLE_CD: "",
    BUYER_CD: "",
    ORDER_CD: "",
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

const emptyTBL_KSV_ORDER_MST = {
    PO_CD: "",
    ORDER_CD: "",
    ORDER_MRP_SEQ: "",
};

const emptyTBL_KSV_PROD_MEM = {
    id: 0,
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

const emptyEDT_KSV_PROD_MEM = {
    STD_FLAG: "",
    ALL_FLAG: "",
    ALL_COLOR_FLAG: "",
    NET: "",
    LOSS: "",
    USE_SIZE: "",
    REMARK: "",
};

const emptyEDT_KSV_PROD_MEM_USAGE = {
    USAGE: "",
    NET_S: "",
    NET: "",
    LOSS: "",
};

const S0306_MRP_BY_ORDER = () => {
    const serviceLibRef = useRef(null);
    if (!serviceLibRef.current) {
        serviceLibRef.current = new ServiceLib();
        serviceLibRef.current.loginConfirm();
    }
    const serviceLib = serviceLibRef.current;
    const serviceS0306_MRP_BY_ORDERRef = useRef(null);
    if (!serviceS0306_MRP_BY_ORDERRef.current) serviceS0306_MRP_BY_ORDERRef.current = new ServiceS0306_MRP_BY_ORDER();
    const serviceS0306_MRP_BY_ORDER = serviceS0306_MRP_BY_ORDERRef.current;
    const serviceS0305_MRP_MANAGERRef = useRef(null);
    if (!serviceS0305_MRP_MANAGERRef.current) serviceS0305_MRP_MANAGERRef.current = new ServiceS0305_MRP_MANAGER();
    const serviceS0305_MRP_MANAGER = serviceS0305_MRP_MANAGERRef.current;
    const serviceS0301_MATL_RECORDRef = useRef(null);
    if (!serviceS0301_MATL_RECORDRef.current) serviceS0301_MATL_RECORDRef.current = new ServiceS0301_MATL_RECORD();
    const serviceS0301_MATL_RECORD = serviceS0301_MATL_RECORDRef.current;
    const serviceS0303_MRP_RECORD_STYLERef = useRef(null);
    if (!serviceS0303_MRP_RECORD_STYLERef.current) serviceS0303_MRP_RECORD_STYLERef.current = new ServiceS0303_MRP_RECORD_STYLE();
    const serviceS0303_MRP_RECORD_STYLE = serviceS0303_MRP_RECORD_STYLERef.current;

    const toast = useRef(null);

    /* splitter 관련 */
    const [styleVal, setStyleVal] = useState({ width: "65vw" });

    /* 중앙 테이블 가상스크롤 높이 (ResizeObserver로 확정 픽셀값 제공) */
    const prodMemContainerRef = useRef(null);
    const [prodMemScrollHeight, setProdMemScrollHeight] = useState("300px");

    const [urlIframe, setUrlIframe] = useState("");
    const [createDialog, setCreateDialog] = useState(false);
    const hideDialog = () => {
        setCreateDialog(false);
    };

    const [createDialog1, setCreateDialog1] = useState(false);

    const [createDialog2, setCreateDialog2] = useState(false);
    const overCheckActionRef = useRef("");
    const popupSpecSourceRowKeyRef = useRef("");
    const patchingProdMemByUsageRef = useRef(false);
    const hideDialog2 = () => {
        setCreateDialog2(false);
        if (overCheckActionRef.current === "update") {
            var argData = {};
            argData.KIND = "check";
            updateMaterial(argData);
        }
        overCheckActionRef.current = "";
    };

    ////

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
            SOURCE: "S0306",
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

        window.parent.postMessage(
            {
                func: "s0301_set_matl_cd",
                message: tMatlRecordPayload,
            },
            "*",
        );
    };

    const popup_STYLE_SEARCH = () => {
        const tOrderRow =
            selectedTBL_KSV_ORDER_MST?.[0] || dataTBL_KSV_ORDER_MST || {};
        const tProdRow = selectedTBL_KSV_PROD_MST?.[0] || {};

        if (!tOrderRow.STYLE_CD || !tProdRow.ORDER_CD || !tProdRow.ORDER_MRP_SEQ) {
            alert("작업할 color를 선택하세요<br><br>Select the color you want to work with");
            return;
        }

        var tStyleCd = tOrderRow.STYLE_CD;
        var tOrderCd = tProdRow.ORDER_CD;
        var tOrderMrpSeq = tProdRow.ORDER_MRP_SEQ;
        var tProdCd = tProdRow.PROD_CD || "";

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

        tUrl1 = `${window.location.origin}/#/`;
        tUrl1 += `S030302_COPY_STYLE?STYLE_CD=${tStyleCd}&ORDER_CD=${tOrderCd}&ORDER_MRP_SEQ=${tOrderMrpSeq}&PROD_CD=${tProdCd}&SOURCE=S0306`;

        var tUrl2 = `S030302_COPY_STYLE?STYLE_CD=${tStyleCd}&ORDER_CD=${tOrderCd}&ORDER_MRP_SEQ=${tOrderMrpSeq}&PROD_CD=${tProdCd}&SOURCE=S0306`;
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

    const search_PROD_MST = (argData = {}) => {
        const shouldUseMaxOrderMrpSeq = true;

        const tOrderCd =
            argData.ORDER_CD ||
            selectedTBL_KSV_ORDER_MST?.[0]?.ORDER_CD ||
            selectedTBL_KSV_PROD_MST?.[0]?.ORDER_CD ||
            "";

        if (tOrderCd === "") {
            setLoadingTBL_KSV_ORDER_MST(false);
            setLoadingTBL_KSV_PROD_MST(false);
            return;
        }

        var tObj = {};
        tObj.STYLE_CD = "";
        tObj.ORDER_CD = tOrderCd;

        setDatasTBL_KSV_PROD_MST([]);

        setLoadingTBL_KSV_ORDER_MST(true);
        setLoadingTBL_KSV_PROD_MST(true);

        serviceS0306_MRP_BY_ORDER
            .mgrQueryTBL_KSV_PROD_MST(tObj)
            .then((data) => {
                if (typeof data.graphQLErrors === "undefined") {
                    const dataRows = Array.isArray(data)
                        ? data
                        : data
                          ? [data]
                          : [];
                    console.log(
                        "mgrQueryTBL_KSV_PROD_MST() call => " + dataRows.length,
                    );
                    const copiedData = dataRows.map((item, index) => ({
                        ...item,
                        id: index,
                    }));

                    // useEffect paint 이후 auto-select 보다 빠르게
                    // 데이터와 선택을 한 배치로 렌더하여 타이밍 갭 제거
                    const tPreferredCd = preferredProdCdRef.current || "";
                    const tMaxOrderMrpSeqRow = shouldUseMaxOrderMrpSeq
                        ? copiedData.reduce((maxRow, row) => {
                              const maxVal = Number(maxRow?.ORDER_MRP_SEQ);
                              const currVal = Number(row?.ORDER_MRP_SEQ);

                              if (!Number.isFinite(maxVal) && Number.isFinite(currVal)) {
                                  return row;
                              }
                              if (Number.isFinite(maxVal) && !Number.isFinite(currVal)) {
                                  return maxRow;
                              }
                              if (Number.isFinite(maxVal) && Number.isFinite(currVal)) {
                                  return currVal > maxVal ? row : maxRow;
                              }

                              return String(row?.ORDER_MRP_SEQ || "") >
                                  String(maxRow?.ORDER_MRP_SEQ || "")
                                  ? row
                                  : maxRow;
                          }, copiedData[0])
                        : null;
                    const tAutoRow =
                        (tPreferredCd &&
                            copiedData.find((r) => r.PROD_CD === tPreferredCd)) ||
                        tMaxOrderMrpSeqRow ||
                        copiedData[0] ||
                        null;
                    ReactDOM.unstable_batchedUpdates(() => {
                        setLoadingTBL_KSV_ORDER_MST(false);
                        setLoadingTBL_KSV_PROD_MST(false);
                        setDatasTBL_KSV_PROD_MST(copiedData);
                        if (tAutoRow?.PROD_CD) {
                            setSelectedTBL_KSV_PROD_MST([tAutoRow]);
                            setDataTBL_KSV_PROD_MST(tAutoRow);
                        }
                    });
                } else {
                    // var tStr = data.graphQLErrors[0].message;
                    console.log(
                        "mgrQueryTBL_KSV_PROD_MST()error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                    setLoadingTBL_KSV_ORDER_MST(false);
                    setLoadingTBL_KSV_PROD_MST(false);
                }
            });

        setDatasQRY_KCD_STYLE2_ORDER_MRP_SEQ([]);
        var tObj1 = {};
        tObj1.ORDER_CD = tOrderCd;
        serviceS0306_MRP_BY_ORDER
            .mgrQuery_QRY_ORDER_MRP_SEQ(tObj1)
            .then((data) => {
                if (typeof data.graphQLErrors === "undefined") {
                    console.log(
                        "mgrQueryTBL_KSV_PROD_MST() call => " + data.length,
                    );
                    if (data.length > 0) {
                        const tSelectedOrderMrpSeqRow =
                            shouldUseMaxOrderMrpSeq
                                ? data.reduce((maxRow, row) => {
                                      const maxVal = Number(maxRow?.ORDER_MRP_SEQ);
                                      const currVal = Number(row?.ORDER_MRP_SEQ);

                                      if (!Number.isFinite(maxVal) && Number.isFinite(currVal)) {
                                          return row;
                                      }
                                      if (Number.isFinite(maxVal) && !Number.isFinite(currVal)) {
                                          return maxRow;
                                      }
                                      if (Number.isFinite(maxVal) && Number.isFinite(currVal)) {
                                          return currVal > maxVal ? row : maxRow;
                                      }

                                      return String(row?.ORDER_MRP_SEQ || "") >
                                          String(maxRow?.ORDER_MRP_SEQ || "")
                                          ? row
                                          : maxRow;
                                  }, data[0])
                                : data[0];

                        setDatasQRY_KCD_STYLE2_ORDER_MRP_SEQ(data);
                        setDataQRY_KCD_STYLE2_ORDER_MRP_SEQ(
                            tSelectedOrderMrpSeqRow,
                        );
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

    const search_QRY_CHECK = () => {
        if (selectedTBL_KSV_ORDER_MST.length <= 0) {
            alert("작업할 Color를 선택하세요<br><br>Select the color you want to work with");
            return;
        }

        // alert('최종버전과 이전버전을 비교합니다');
        var tObj0 = { ...selectedTBL_KSV_ORDER_MST[0] };

        var tObj = {};
        tObj.ORDER_CD = tObj0.ORDER_CD;
        tObj.PROD_CD = "";

        setLoadingTBL_KSV_PROD_MST(true);
        serviceS0306_MRP_BY_ORDER.mgrQuery_QRY_CHECK(tObj).then((data) => {
            setLoadingTBL_KSV_PROD_MST(false);
            if (typeof data.graphQLErrors === "undefined") {
                console.log(
                    "mgrQueryTBL_KSV_PROD_MST() call => " + data.length,
                );
                var tArray = [];
                data.forEach((col, i) => {
                    var tObj = { ...col };
                    tObj.id = i + 1;
                    tArray.push(tObj);
                });
                setDatasTBL_KSV_PROD_MEM2(tArray);
                setCreateDialog(true);
            } else {
                // var tStr = data.graphQLErrors[0].message;
                console.log(
                    "mgrQueryTBL_KSV_PROD_MST()error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });
    };

    const search_LIST_1 = () => {
        const tQryStyle = getQRY_KCD_STYLE();
        if (
            tQryStyle.STYLE_CD === "" &&
            tQryStyle.ORDER_CD === ""
        ) {
            alert("Style, Order 중 하나는 필수입력값 입니다.<br><br>One of Style and Order is a required input value.");
            return;
        }

        setDatasTBL_KSV_ORDER_MST([]);
        setDatasTBL_KSV_PROD_MST([]);
        setDatasTBL_KSV_PROD_MEM([]);

        setDataQRY_KCD_STYLE(tQryStyle);
        var tObj = { ...tQryStyle };
        
        setLoadingTBL_KSV_ORDER_MST(true);
        serviceS0306_MRP_BY_ORDER.mgrQuery_QRY_ORDER_MST(tObj).then((data) => {
            setLoadingTBL_KSV_ORDER_MST(false);

            if (typeof data.graphQLErrors === "undefined") {
                console.log(
                    "mgrQueryTBL_KSV_PROD_MST() call => " + data.length,
                );
                data.forEach((item, index) => {
                    item.id = index;
                });
                setDatasTBL_KSV_ORDER_MST(data);
            } else {
                console.log(
                    "mgrQueryTBL_KSV_PROD_MST()error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });
    };

            const handleSearchInputKeyDown = (e) => {
                if (e.key !== "Enter") return;
                e.preventDefault();
                search_LIST_1();
            };

    const search_QRY_VENDOR = (argData, argKind) => {
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

    const search_QRY_BUYER = (argData) => {
        var tObj = {};
        tObj.BUYER_CD = argData.trim();

        setDatasQRY_KCD_STYLE_BUYER_CD([]);

        serviceS0306_MRP_BY_ORDER.mgrQuery_QRY_BUYER(tObj).then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                if (data.length > 0) {
                    setDatasQRY_KCD_STYLE_BUYER_CD(data);
                    setDataQRY_KCD_STYLE_BUYER_CD(data[0]);
                }
            } else {
                console.log(
                    "mgrQueryTBL_KSV_PROD_MEM()error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
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
        const newMap = new Map(newList.map((item) => [getKey(item), item]));
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

    const applyOrderQtyAndPoQty = (row, orderQty) => {
        const orderQtyNum = parseFloat(orderQty) || 0;
        const grossNum = parseFloat(row.GROSS) || 0;

        return {
            ...row,
            ORDER_QTY: orderQty,
            PO_QTY: parseFloat((orderQtyNum * grossNum).toFixed(4)),
        };
    };

    const sanitizeProdMemPayload = (row) => {
        const payload = { ...row };
        payload.COUNTRY = getCountryCode(payload.COUNTRY);
        delete payload.__typename;
        delete payload.id;
        delete payload.__ROW_KEY;
        delete payload.ORDER_MRP_SEQ_MAX;
        delete payload.ORDER_QTY;
        delete payload.PO_QTY;
        return payload;
    };

    const cloneArrayData = (data) =>
        JSON.parse(JSON.stringify(Array.isArray(data) ? data : data ? [data] : []));

    const withProdMemDataKeys = (rows) => {
        const tRows = Array.isArray(rows) ? rows : [];
        const tDupCounter = new Map();

        return tRows.map((row, index) => {
            const tBaseKey = [
                row?.PROD_CD || "",
                row?.ORDER_CD || "",
                row?.ORDER_MRP_SEQ || "",
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

    const search_PROD_MEM = (argData, argKind, argOptions = {}) => {
        setLoadingTBL_KSV_PROD_MEM(true);

        const tResolvedOrderQty =
            typeof argOptions.orderQty !== "undefined"
                ? argOptions.orderQty
                : typeof selectedTBL_KSV_PROD_MSTRef?.current?.[0]?.ORDER_QTY !==
                    "undefined"
                  ? selectedTBL_KSV_PROD_MSTRef.current[0].ORDER_QTY
                  : typeof selectedTBL_KSV_PROD_MST?.[0]?.ORDER_QTY !==
                      "undefined"
                    ? selectedTBL_KSV_PROD_MST[0].ORDER_QTY
                    : undefined;

        serviceS0306_MRP_BY_ORDER
            .mgrQueryTBL_KSV_PROD_MEM(argData)
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

                    // Keep transformation lightweight: shallow clone each row only.
                    let copiedData = dataRows.map((item) => ({ ...item }));

                    // FORMATTING
                    for (let item of copiedData) {
                        item.NET = parseFloat(item.NET).toFixed(4);
                        item.LOSS = parseFloat(item.LOSS).toFixed(2);
                        item.GROSS = parseFloat(item.GROSS).toFixed(5);

                        item.STD_NET = parseFloat(item.STD_NET).toFixed(4);
                        item.STD_LOSS = parseFloat(item.STD_LOSS).toFixed(2);
                        item.STD_GROSS = parseFloat(item.STD_GROSS).toFixed(5);

                        item.S_FLAG = "0";
                    }

                    if (typeof tResolvedOrderQty !== "undefined") {
                        copiedData = copiedData.map((item) =>
                            applyOrderQtyAndPoQty(item, tResolvedOrderQty),
                        );
                    }

                    // Full refresh from server: avoid expensive merge/stringify compare.
                    copiedData.sort(
                        (a, b) => parseInt(a.SEQ) - parseInt(b.SEQ),
                    );

                    // 고유 VENDOR_CD 추출
                    const vendorMap = new Map();
                    copiedData.forEach((item) => {
                        const tVendorCd = String(item?.VENDOR_CD || "").trim();
                        const tVendorName = String(item?.VENDOR_NAME || "").trim();
                        if (!tVendorCd && !tVendorName) return;

                        const tKey = tVendorCd || `name:${tVendorName}`;
                        if (!vendorMap.has(tKey)) {
                            vendorMap.set(tKey, {
                                VENDOR_CD: tVendorCd,
                                VENDOR_NAME: tVendorName,
                            });
                        }
                    });
                    const uniqueVendors = Array.from(vendorMap.values());
                    console.log(uniqueVendors);

                    // React 17: async 콜백 내 다중 setState를 단일 렌더로 묶음
                    const keyedRows = withProdMemDataKeys(copiedData);

                    ReactDOM.unstable_batchedUpdates(() => {
                        setDatasTBL_KSV_PROD_MEM(keyedRows);
                        setDataETC_ROW_COUNT(dataRows.length);
                        syncVendorCd1State(
                            uniqueVendors,
                            argOptions.preserveVendorCd1,
                        );
                        setSelectedTBL_KSV_PROD_MEM([]);
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

    /* QRY KCD_MATL_MST*/
    const [dataQRY_KCD_MATL_MST, setDataQRY_KCD_MATL_MST] = useState(
        emptyQRY_KCD_MATL_MST,
    );
    const [dataQRY_KCD_MATL_MST_MATL_NAME, setDataQRY_KCD_MATL_MST_MATL_NAME] =
        useState("");
    const [dataQRY_KCD_MATL_MST_COLOR, setDataQRY_KCD_MATL_MST_COLOR] =
        useState("");
    const [dataQRY_KCD_MATL_MST_MATL_CD, setDataQRY_KCD_MATL_MST_MATL_CD] =
        useState("");
    const [dataQRY_KCD_MATL_MST_SPEC, setDataQRY_KCD_MATL_MST_SPEC] =
        useState("");
    const [
        dataQRY_KCD_MATL_MST_VENDOR_NAME,
        setDataQRY_KCD_MATL_MST_VENDOR_NAME,
    ] = useState("");
    const matlSearchQueryDraftRef = useRef({ ...emptyQRY_KCD_MATL_MST });
    const [matlSearchInputVersion, setMatlSearchInputVersion] = useState(0);

    const getQRY_KCD_MATL_MST = () => {
        const tDraft = matlSearchQueryDraftRef.current || {};
        return {
            MATL_NAME: tDraft.MATL_NAME || "",
            COLOR: tDraft.COLOR || "",
            MATL_CD: tDraft.MATL_CD || "",
            SPEC: tDraft.SPEC || "",
            VENDOR_NAME: tDraft.VENDOR_NAME || "",
        };
    };

    const putQRY_KCD_MATL_MST = (argData) => {
        const tNextQRY = {
            MATL_NAME: argData?.MATL_NAME || "",
            COLOR: argData?.COLOR || "",
            MATL_CD: argData?.MATL_CD || "",
            SPEC: argData?.SPEC || "",
            VENDOR_NAME: argData?.VENDOR_NAME || "",
        };

        matlSearchQueryDraftRef.current = tNextQRY;
        setDataQRY_KCD_MATL_MST_MATL_NAME(tNextQRY.MATL_NAME);
        setDataQRY_KCD_MATL_MST_MATL_CD(tNextQRY.MATL_CD);
        setDataQRY_KCD_MATL_MST_SPEC(tNextQRY.SPEC);
        setDataQRY_KCD_MATL_MST_COLOR(tNextQRY.COLOR);
        setDataQRY_KCD_MATL_MST_VENDOR_NAME(tNextQRY.VENDOR_NAME);
        setMatlSearchInputVersion((prev) => prev + 1);
    };

    const onInputChangeQRY_KCD_MATL_MST_MATL_NAME = (e, name) => {
        let val = (e.target && e.target.value) || "";
        matlSearchQueryDraftRef.current.MATL_NAME = val;
    };

    const onInputChangeQRY_KCD_MATL_MST_COLOR = (e, name) => {
        let val = (e.target && e.target.value) || "";
        matlSearchQueryDraftRef.current.COLOR = val;
        /**
         * COLOR가 선택되면 P.Search의 이전 찾았던 인덱스 초기화
         * Reset the previously found index of P.Search when COLOR is selected
         */
        processPSearchStateRef.current = {
            keyword: "",
            lastKey: "",
            scopeKey: "",
        };
    };

    const onInputChangeQRY_KCD_MATL_MST_MATL_CD = (e, name) => {
        let val = (e.target && e.target.value) || "";
        matlSearchQueryDraftRef.current.MATL_CD = val;
    };

    const onInputChangeQRY_KCD_MATL_MST_SPEC = (e, name) => {
        let val = (e.target && e.target.value) || "";
        matlSearchQueryDraftRef.current.SPEC = val;
    };

    const onInputChangeQRY_KCD_MATL_MST_VENDOR_NAME = (e, name) => {
        let val = (e.target && e.target.value) || "";
        matlSearchQueryDraftRef.current.VENDOR_NAME = val;
    };

    /* QRY KCD_STYLE2 */
    const [dataQRY_KCD_STYLE2, setDataQRY_KCD_STYLE2] =
        useState(emptyQRY_KCD_STYLE2);

    const [datasQRY_KCD_STYLE2_VENDOR_CD1, setDatasQRY_KCD_STYLE2_VENDOR_CD1] =
        useState([]);
    const [dataQRY_KCD_STYLE2_VENDOR_CD1, setDataQRY_KCD_STYLE2_VENDOR_CD1] =
        useState({});

    const syncVendorCd1State = (vendorList, preferredVendor = null) => {
        let tVendorList = [...(vendorList || [])].filter((vendor) => {
            const tVendorCd = String(vendor?.VENDOR_CD || "").trim();
            const tVendorName = String(vendor?.VENDOR_NAME || "").trim();
            return tVendorCd !== "" || tVendorName !== "";
        });

        if (
            preferredVendor &&
            preferredVendor.VENDOR_CD &&
            !tVendorList.some(
                (vendor) => vendor.VENDOR_CD === preferredVendor.VENDOR_CD,
            )
        ) {
            tVendorList = [preferredVendor, ...tVendorList];
        }

        setDatasQRY_KCD_STYLE2_VENDOR_CD1(tVendorList);

        if (tVendorList.length <= 0) {
            setDataQRY_KCD_STYLE2_VENDOR_CD1({});
            return;
        }

        if (preferredVendor && preferredVendor.VENDOR_CD) {
            const tPreferredVendor = tVendorList.find(
                (vendor) => vendor.VENDOR_CD === preferredVendor.VENDOR_CD,
            );
            if (tPreferredVendor) {
                setDataQRY_KCD_STYLE2_VENDOR_CD1(tPreferredVendor);
                return;
            }
        }

        const tCurrentVendorCd = dataQRY_KCD_STYLE2_VENDOR_CD1?.VENDOR_CD;
        const tMatchedVendor = tVendorList.find(
            (vendor) => vendor.VENDOR_CD === tCurrentVendorCd,
        );

        setDataQRY_KCD_STYLE2_VENDOR_CD1(tMatchedVendor || tVendorList[0]);
    };

    const clearQRY_KCD_STYLE2_VENDOR_CD1 = () => {
        setDataQRY_KCD_STYLE2((prev) => ({
            ...prev,
            VENDOR_CD1: "",
        }));
        setDataQRY_KCD_STYLE2_VENDOR_CD1({});
    };

    const applyVendorCd1Selection = (vendor) => {
        const tVendorCd = String(vendor?.VENDOR_CD || "").trim();
        const tVendorName = String(vendor?.VENDOR_NAME || "").trim();

        if (!tVendorCd && !tVendorName) {
            setSelectedTBL_KSV_PROD_MEM([]);
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

        // Keep original row references so DataTable controlled selection can sync reliably.
        setSelectedTBL_KSV_PROD_MEM(tArray1);
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

    const [
        datasQRY_KCD_STYLE2_ORDER_MRP_SEQ,
        setDatasQRY_KCD_STYLE2_ORDER_MRP_SEQ,
    ] = useState([]);
    const [
        dataQRY_KCD_STYLE2_ORDER_MRP_SEQ,
        setDataQRY_KCD_STYLE2_ORDER_MRP_SEQ,
    ] = useState({});

    const onDropdownChangeQRY_KCD_STYLE2_ORDER_MRP_SEQ = (e, name) => {
        let val = (e.value && e.value.ORDER_MRP_SEQ) || "";

        let _dataQRY_KCD_STYLE2 = { ...dataQRY_KCD_STYLE2 };

        let tTypeVal = _dataQRY_KCD_STYLE2[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KCD_STYLE2[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KCD_STYLE2[`${name}`] = parseInt(val);
        }

        setDataQRY_KCD_STYLE2(_dataQRY_KCD_STYLE2);
        setDataQRY_KCD_STYLE2_ORDER_MRP_SEQ(e.value);

        setDatasTBL_KSV_PROD_MEM([]);

        if (selectedTBL_KSV_PROD_MST.length > 0) {
            var tSelObj0 = { ...selectedTBL_KSV_ORDER_MST[0] };
            var tSelObj = { ...selectedTBL_KSV_PROD_MST[0] };
            var tObj = {};
            tObj.PROD_CD = tSelObj.PROD_CD;
            tObj.ORDER_CD = tSelObj0.ORDER_CD;
            tObj.ORDER_MRP_SEQ = val;
            tObj.DL_FLAG = "";
            search_PROD_MEM(tObj, "1");
        }
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
    const [dataQRY_KCD_STYLE, setDataQRY_KCD_STYLE] =
        useState(emptyQRY_KCD_STYLE);
    const qryKcdStyleDraftRef = useRef({ ...emptyQRY_KCD_STYLE });
    const [qryKcdStyleInputVersion, setQryKcdStyleInputVersion] = useState(0);

    const getQRY_KCD_STYLE = () => {
        const tDraft = qryKcdStyleDraftRef.current || {};
        return {
            STYLE_CD: tDraft.STYLE_CD || "",
            BUYER_CD: tDraft.BUYER_CD || "",
            ORDER_CD: tDraft.ORDER_CD || "",
        };
    };

    const onInputChangeQRY_KCD_STYLE_ORDER_CD = (e, name) => {
        let val = (e.target && e.target.value) || "";
        qryKcdStyleDraftRef.current.ORDER_CD = val;
    };

    const [datasQRY_KCD_STYLE_STYLE_CD, setDatasQRY_KCD_STYLE_STYLE_CD] =
        useState([]);
    const [dataQRY_KCD_STYLE_STYLE_CD, setDataQRY_KCD_STYLE_STYLE_CD] =
        useState({});

    const onInputChangeQRY_KCD_STYLE_STYLE_CD = (e, name) => {
        let val = (e.target && e.target.value) || "";
        qryKcdStyleDraftRef.current.STYLE_CD = val;
    };

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

    const buildTargetProdCds = (options = {}) => {
        const { prodOnly = false, forceAllColors = false } = options;
        const tEdit = getEDT_KSV_PROD_MEM();
        const tIsAllColor = forceAllColors || tEdit.ALL_COLOR_FLAG === "1";

        const tSelectedProdRows =
            Array.isArray(selectedTBL_KSV_PROD_MST) &&
            selectedTBL_KSV_PROD_MST.length > 0
                ? selectedTBL_KSV_PROD_MST
                : Array.isArray(selectedTBL_KSV_PROD_MSTRef.current)
                  ? selectedTBL_KSV_PROD_MSTRef.current
                  : [];

        const tSourceRows = tIsAllColor
            ? datasTBL_KSV_PROD_MST
            : tSelectedProdRows;

        const tResult = [];
        const tSeen = new Set();

        tSourceRows.forEach((row) => {
            const tProdCd = row?.PROD_CD || "";
            if (!tProdCd) return;

            const tKey = prodOnly
                ? tProdCd
                : `${tProdCd}_${row?.ORDER_CD || ""}_${row?.ORDER_MRP_SEQ || ""}`;

            if (tSeen.has(tKey)) return;
            tSeen.add(tKey);

            if (prodOnly) {
                tResult.push({ PROD_CD: tProdCd });
                return;
            }

            tResult.push({
                PROD_CD: tProdCd,
                ORDER_CD: row?.ORDER_CD || "",
                ORDER_MRP_SEQ: row?.ORDER_MRP_SEQ || "",
                SIZE_LOSS: row?.SIZE_LOSS,
            });
        });

        return tResult;
    };

    const buildUsageListTargetProdCds = (rows) => {
        const tRows = Array.isArray(rows) ? rows : [];
        const tResult = [];
        const tSeen = new Set();

        tRows.forEach((row) => {
            const tProdCd = row?.PROD_CD || "";
            const tOrderCd = row?.ORDER_CD || "";
            const tOrderMrpSeq = row?.ORDER_MRP_SEQ || "";
            if (!tProdCd) return;

            const tKey = `${tProdCd}_${tOrderCd}_${tOrderMrpSeq}`;
            if (tSeen.has(tKey)) return;
            tSeen.add(tKey);

            tResult.push({
                PROD_CD: tProdCd,
                ORDER_CD: tOrderCd,
                ORDER_MRP_SEQ: tOrderMrpSeq,
            });
        });

        return tResult;
    };

    const showActionToast = (detail) => {
        toast.current?.show({
            severity: "success",
            summary: "Success",
            detail,
            life: 3000,
        });
    };

    // DATAGRID CODE : TBL_KCD_MATL_MST

    const addMaterial = () => {
        if (selectedTBL_KSV_PROD_MST.length <= 0) {
            alert("작업할 Color를 선택하세요<br><br>Select the color you want to work with");
            return;
        }

        if (selectedTBL_KCD_MATL_MST.length <= 0) return;

        var tEdit = getEDT_KSV_PROD_MEM();
        const normalizeNumberInput = (value) => {
            if (value === null || typeof value === "undefined") return "0";
            const str = String(value).trim();
            if (str === "") return "0";
            return isNaN(parseFloat(str)) ? "0" : str;
        };
        var tNet = normalizeNumberInput(tEdit.NET);
        var tLoss = normalizeNumberInput(tEdit.LOSS);
        const tSelectedProdRow = selectedTBL_KSV_PROD_MST[0] || {};

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
            tObj.PROD_CD = tSelectedProdRow.PROD_CD || "";
            tObj.ORDER_CD = tSelectedProdRow.ORDER_CD || "";
            tObj.ORDER_MRP_SEQ = tSelectedProdRow.ORDER_MRP_SEQ || "";
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
        var tAddPosition = {};
        if (selectedTBL_KSV_PROD_MEM.length > 0) {
            const tLastSelected = selectedTBL_KSV_PROD_MEM[selectedTBL_KSV_PROD_MEM.length - 1];
            tAddPosition = { ...tLastSelected };
        } else if (datasTBL_KSV_PROD_MEM.length <= 0) {
            var tTempObj = { ...emptyTBL_KSV_PROD_MEM };
            tTempObj.SEQ = "0";
            tAddPosition = { ...tTempObj };
        } else {
            tAddPosition = {
                ...datasTBL_KSV_PROD_MEM[datasTBL_KSV_PROD_MEM.length - 1],
            };
        }
        delete tAddPosition.__typename;
        delete tAddPosition.__ROW_KEY;
        var tAddPosition1 = { ...tAddPosition };

        var tProdCds = buildTargetProdCds();

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
        serviceS0306_MRP_BY_ORDER
            .mgrInsert_ALL_ADD_MATERIAL(tInArray, tProdCds, tAddPosition1)
            .then((data) => {
                setLoadingTBL_KSV_PROD_MEM(false);
                if (typeof data.graphQLErrors === "undefined") {
                    if (isFailedCodeResult(data)) {
                        alert(data[0].CODE);
                    } else {
                        showActionToast("Material added successfully.");
                        search_PROD_MEM(
                            {
                                PROD_CD: tSelectedProdRow.PROD_CD || "",
                                ORDER_CD: tSelectedProdRow.ORDER_CD || "",
                                ORDER_MRP_SEQ:
                                    tSelectedProdRow.ORDER_MRP_SEQ || "",
                                DL_FLAG: "",
                            },
                            "1",
                            {
                                orderQty: tSelectedProdRow.ORDER_QTY,
                            },
                        );
                    }
                } else {
                    // var tStr = data.graphQLErrors[0].message;
                    console.log(
                        "ServiceNawooAll.mgrInsertS0306_MRP_BY_ORDER( error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });
    };

    const updateMaterial = async (argOpMode) => {
        await flushPendingEditsBeforeAction();

        if (typeof argOpMode?.KIND === "undefined") {
            var tArray = [];
            datasTBL_KSV_PROD_MEM.forEach((col, i) => {
                var tNet = parseFloat(col.NET);
                var tStdNet = parseFloat(col.STD_NET);
                if (tNet <= tStdNet * 1.3 && tNet >= tStdNet * 0.7) {

                } else {
                    var tObj = { ...col };
                    tObj.id = `${tObj.PROD_CD || ""}_${tObj.ORDER_CD || ""}_${tObj.ORDER_MRP_SEQ || ""}_${tObj.SEQ || ""}_${i}`;
                    tArray.push(tObj);
                }
            });

            if (tArray.length > 0) {
                var tRet = await confirm(
                    "30% over인 data가 있습니다. 확인하시겠습니가?<br><br>There is data that is over 30%. Do you want to check it?",
                );
                if (tRet) {
                    setDatasTBL_KSV_PROD_MEM3(tArray);
                    overCheckActionRef.current = "update";
                    setCreateDialog2(true);
                    return;
                }
            }
        }

        var tInArray0 = [...datasTBL_KSV_PROD_MEM];
        var tInArray = [];
        tInArray0.forEach((col, i) => {
            tInArray.push(sanitizeProdMemPayload(col));
        });
        var tAddPosition = {};
        var tProdCds = buildTargetProdCds();

        setLoadingTBL_KSV_PROD_MEM(true);
        serviceS0306_MRP_BY_ORDER
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
                        "ServiceNawooAll.mgrInsertS0306_MRP_BY_ORDER( error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });
    };

    const updateMaterial_net_loss = async () => {
        await flushPendingEditsBeforeAction();

        var tArray = [];
        /*
        datasTBL_KSV_PROD_MEM.forEach((col, i) => {
            var tNet = parseFloat(col.NET);
            var tStdNet = parseFloat(col.STD_NET);
            if (tNet <= tStdNet * 1.3 && tNet >= tStdNet * 0.7) {
            } else {
                if (tNet > 0 && tStdNet > 0) {
                    var tObj = { ...col };
                    tObj.id = `${tObj.PROD_CD || ""}_${tObj.ORDER_CD || ""}_${tObj.ORDER_MRP_SEQ || ""}_${tObj.SEQ || ""}_${i}`;
                    tArray.push(tObj);
                }
            }
        });

        if (tArray.length > 0) {
            var tRet = await confirm(
                "30% over인 data가 있습니다. 확인하시겠습니까?<br><br>There is data that is over 30%. Do you want to check it?",
            );
            if (tRet) {
                setDatasTBL_KSV_PROD_MEM3(tArray);
                setCreateDialog2(true);
                return;
            }
        }
        */

        var tEdit = getEDT_KSV_PROD_MEM();
        if (tEdit.ALL_FLAG === "1") {
            if (
                await confirm(
                    "전체 Material에 동일하게 적용됩니다. 진행하시겠습니까?<br><br>The same will be applied to all materials. Do you want to proceed?",
                )
            ) {
                updateMaterial_net_loss_sub();
            }
        } else {
            updateMaterial_net_loss_sub();
        }
    };

    const updateMaterial_net_loss_sub = () => {
        var tEdit = getEDT_KSV_PROD_MEM();

        if (selectedTBL_KSV_PROD_MEM.length <= 0) {
            if (tEdit.ALL_FLAG !== "1") return;
        }

        var tInArray = [];
        if (tEdit.ALL_FLAG === "1") {
            datasTBL_KSV_PROD_MEM.forEach((col, i) => {
                var tObj = { ...col };
                if (tEdit.STD_FLAG === "1") {
                    if (tEdit.NET !== "") {
                        tObj.STD_NET = tEdit.NET;
                        tObj.NET = tEdit.NET;
                    }
                    if (tEdit.LOSS !== "") {
                        tObj.STD_LOSS = tEdit.LOSS;
                        tObj.LOSS = tEdit.LOSS;
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
                    if (tEdit.NET !== "") tObj.NET = tEdit.NET;
                    if (tEdit.LOSS !== "") tObj.LOSS = tEdit.LOSS;
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
            selectedTBL_KSV_PROD_MEM.forEach((col, i) => {
                var tObj = { ...col };
                if (tEdit.STD_FLAG === "1") {
                    if (tEdit.NET !== "") {
                        tObj.STD_NET = tEdit.NET;
                        tObj.NET = tEdit.NET;
                    }
                    if (tEdit.LOSS !== "") {
                        tObj.STD_LOSS = tEdit.LOSS;
                        tObj.LOSS = tEdit.LOSS;
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
                    if (tEdit.NET !== "") tObj.NET = tEdit.NET;
                    if (tEdit.LOSS !== "") tObj.LOSS = tEdit.LOSS;
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

        var tAddPosition = getEDT_KSV_PROD_MEM();

        // SL Update is always applied across all visible color rows.
        var tProdCds = buildTargetProdCds({ forceAllColors: true });
        if (tProdCds.length <= 0) return;

        setLoadingTBL_KSV_PROD_MEM(true);
        serviceS0306_MRP_BY_ORDER
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
                    tObj.ORDER_CD = selectedTBL_KSV_PROD_MST[0].ORDER_CD;
                    tObj.ORDER_MRP_SEQ =
                        selectedTBL_KSV_PROD_MST[0].ORDER_MRP_SEQ;
                    tObj.DL_FLAG = "";
                    search_PROD_MEM(tObj);
                } else {
                    // var tStr = data.graphQLErrors[0].message;
                    console.log(
                        "ServiceNawooAll.mgrInsertS0306_MRP_BY_ORDER( error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });
    };

    const updateMaterial_size_loss = async () => {
        if (selectedTBL_KSV_PROD_MST.length <= 0) {
            alert("작업할 Color를 선택하세요<br><br>Select the color you want to work with");
            return;
        }

        var tInArray = [];
        var tAddPosition = {};

        const tOrderCd =
            selectedTBL_KSV_ORDER_MST?.[0]?.ORDER_CD ||
            selectedTBL_KSV_PROD_MST?.[0]?.ORDER_CD ||
            "";

        // Match S0303 behavior: use currently loaded color rows first.
        let tProdRows = Array.isArray(datasTBL_KSV_PROD_MST)
            ? [...datasTBL_KSV_PROD_MST]
            : [];

        // Fallback to server refresh when local rows are empty.
        if (tProdRows.length <= 0 && tOrderCd) {
            try {
                const tQueryResult =
                    await serviceS0306_MRP_BY_ORDER.mgrQueryTBL_KSV_PROD_MST({
                        STYLE_CD: "",
                        ORDER_CD: tOrderCd,
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
        tProdRows.forEach((row) => {
            const tProdCd = String(row?.PROD_CD || "");
            if (!tProdCd || tSeen.has(tProdCd)) return;
            tSeen.add(tProdCd);
            const tRowOrderCd = String(row?.ORDER_CD || tOrderCd || "");
            tProdCds.push({
                PROD_CD: tProdCd,
                ORDER_CD: tRowOrderCd,
                ORDER_MRP_SEQ: row?.ORDER_MRP_SEQ || "",
                SIZE_LOSS: row?.SIZE_LOSS,
            });
        });
        if (tProdCds.length <= 0) return;
        console.log("S0306 SL Update payload rows => " + tProdCds.length);

        setLoadingTBL_KSV_PROD_MEM(true);
        serviceS0306_MRP_BY_ORDER
            .mgrInsert_UPDATE_SIZE_LOSS(tInArray, tProdCds, tAddPosition)
            .then((data) => {
                setLoadingTBL_KSV_PROD_MEM(false);
                if (typeof data.graphQLErrors === "undefined") {
                    setSelectedTBL_KSV_PROD_MST([]);
                    if (data.length > 0) {
                        alert(data[0].CODE);
                        const tSearchArg =
                            selectedTBL_KSV_ORDER_MST?.[0] ||
                            selectedTBL_KSV_PROD_MST?.[0] ||
                            {};
                        search_PROD_MST(tSearchArg);
                    }
                } else {
                    // var tStr = data.graphQLErrors[0].message;
                    console.log(
                        "ServiceNawooAll.mgrInsertS0306_MRP_BY_ORDER( error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });
    };

    const updateMaterial_change_vendor = async () => {
        if (selectedTBL_KSV_PROD_MST?.length <= 0) {
            alert("작업할 Color를 선택하세요<br><br>Select the color you want to work with");
            return;
        }
        var tRet1 = await confirm("Change Supplier을 진행하시겠습니까?<br><br>Would you like to proceed with Change Supplier?");
        if (tRet1);
        else return;

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

        var tProdCds = buildTargetProdCds();

        //
        var tProdMems = [];
        selectedTBL_KSV_PROD_MEM.forEach((col, i) => {
            var tObj = { ...col };
            tObj = sanitizeProdMemPayload(tObj);
            delete tObj.SALES_CURR_CD;
            delete tObj.SALES_MATL_PRICE;
            tProdMems.push(tObj);
        });

        setLoadingTBL_KSV_PROD_MEM(true);
        serviceS0306_MRP_BY_ORDER
            .mgrInsert_CHANGE_VENDOR(tInArray, tProdCds, tProdMems)
            .then((data) => {
                setLoadingTBL_KSV_PROD_MEM(false);
                if (typeof data.graphQLErrors === "undefined") {
                    var tObj = {};
                    tObj.PROD_CD = selectedTBL_KSV_PROD_MST[0].PROD_CD;
                    tObj.ORDER_CD = selectedTBL_KSV_PROD_MST[0].ORDER_CD;
                    tObj.ORDER_MRP_SEQ =
                        selectedTBL_KSV_PROD_MST[0].ORDER_MRP_SEQ;
                    tObj.DL_FLAG = "";
                    search_PROD_MEM(tObj, "1", {
                        preserveVendorCd1: tObj1_1,
                    });
                    
                } else {
                    // var tStr = data.graphQLErrors[0].message;
                    console.log(
                        "ServiceNawooAll.mgrInsertS0306_MRP_BY_ORDER( error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });
    };

    const updateMaterial_add_seq = async () => {
        var tRet1 = await confirm("Add Seq을 진행하시겠습니까?<br><br>Would you like to proceed with Add Seq?");
        if (tRet1);
        else return;

        var tInArray = [];

        var tAddPosition = {};
        //
        var tProdCds = buildTargetProdCds({ forceAllColors: true });

        var tProdMems = [];
        datasTBL_KSV_PROD_MEM.forEach((col, i) => {
            var tObj = { ...col };
            tObj = sanitizeProdMemPayload(tObj);
            tProdMems.push(tObj);
        });

        setLoadingTBL_KSV_PROD_MEM(true);
        serviceS0306_MRP_BY_ORDER
            .mgrInsert_ADD_SEQ(tProdCds, tProdMems)
            .then((data) => {
                setLoadingTBL_KSV_PROD_MEM(false);
                setDatasTBL_KSV_PROD_MEM([]);
                if (typeof data.graphQLErrors === "undefined") {
                    if (data.length > 0) {
                        alert(data[0].CODE);
                        if (data[0].CODE.includes("SUCC")) {
                            const tSearchArg =
                                selectedTBL_KSV_ORDER_MST?.[0] ||
                                selectedTBL_KSV_PROD_MST?.[0] ||
                                {};
                            search_PROD_MST(tSearchArg);
                        }
                    }
                } else {
                    // var tStr = data.graphQLErrors[0].message;
                    console.log(
                        "ServiceNawooAll.mgrInsertS0306_MRP_BY_ORDER( error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });
    };

    const updateMaterial_del_last_seq = () => {
        var tInArray = [];

        var tAddPosition = {};
        //
        var tProdCds = [];
        var tEdit = getEDT_KSV_PROD_MEM();
        // 무조건 선택된것 하나만
        selectedTBL_KSV_PROD_MST.forEach((col, i) => {
            var tObj = {};
            tObj.PROD_CD = col.PROD_CD;
            tObj.ORDER_CD = col.ORDER_CD;
            tObj.ORDER_MRP_SEQ = col.ORDER_MRP_SEQ;
            tObj.SIZE_LOSS = col.SIZE_LOSS;
            tProdCds.push(tObj);
        });

        setLoadingTBL_KSV_PROD_MEM(true);
        serviceS0306_MRP_BY_ORDER
            .mgrInsert_DEL_LAST_SEQ(tProdCds)
            .then((data) => {
                setLoadingTBL_KSV_PROD_MEM(false);
                setDatasTBL_KSV_PROD_MEM([]);
                if (typeof data.graphQLErrors === "undefined") {
                    if (data.length > 0) {
                        alert(data[0].CODE);
                        if (data[0].CODE.includes("SUCC")) {
                            const tSearchArg =
                                selectedTBL_KSV_ORDER_MST?.[0] ||
                                selectedTBL_KSV_PROD_MST?.[0] ||
                                {};
                            search_PROD_MST(tSearchArg);
                        }
                    }
                } else {
                    // var tStr = data.graphQLErrors[0].message;
                    console.log(
                        "ServiceNawooAll.mgrInsertS0306_MRP_BY_ORDER( error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });
    };

    const updateMaterial_move_up = () => {
        const selectedProdMst = Array.isArray(selectedTBL_KSV_PROD_MST)
            ? selectedTBL_KSV_PROD_MST[0]
            : selectedTBL_KSV_PROD_MST;

        if (!selectedProdMst || typeof selectedProdMst.PROD_CD === "undefined") {
            alert("작업할 color를 선택하세요<br><br>Select the color you want to work with");
            return;
        }

        var tEdit = getEDT_KSV_PROD_MEM();

        if (selectedTBL_KSV_PROD_MEM.length !== 1) {
            alert("이동할 자재를 1개만 선택하세요<br><br>Please select only 1 material to move");
            return;
        }
        if (parseInt(selectedTBL_KSV_PROD_MEM[0].SEQ) === 1) {
            alert("첫번째 자재는 이동 할 수 없습니다 <br><br>The first material cannot be moved");
            return;
        }

        var tInArray = [];
        var tSelObj = sanitizeProdMemPayload(selectedTBL_KSV_PROD_MEM[0]);
        tInArray.push(tSelObj);

        var tAddPosition = getEDT_KSV_PROD_MEM();
        tAddPosition.IS_TOP = "0";
        tAddPosition.MOVE_CNT = dataETC_MOVE_COUNT;
        //
        var tProdCds = [{ PROD_CD: selectedProdMst.PROD_CD }];

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
        serviceS0306_MRP_BY_ORDER
            .mgrInsert_ALL_UPDATE_MATERIAL_MOVE_UP(
                tInArray,
                tProdCds,
                tAddPosition,
            )
            .then((data) => {
                setLoadingTBL_KSV_PROD_MEM(false);
                if (typeof data.graphQLErrors === "undefined") {
                    if (isFailedCodeResult(data)) {
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
        const selectedProdMst = Array.isArray(selectedTBL_KSV_PROD_MST)
            ? selectedTBL_KSV_PROD_MST[0]
            : selectedTBL_KSV_PROD_MST;

        if (!selectedProdMst || typeof selectedProdMst.PROD_CD === "undefined") {
            alert("작업할 color를 선택하세요<br><br>Select the color you want to work with");
            return;
        }

        var tEdit = getEDT_KSV_PROD_MEM();

        if (selectedTBL_KSV_PROD_MEM.length !== 1) {
            alert("이동할 자재를 1개만 선택하세요<br><br>Please select only 1 material to move");
            return;
        }
        if (parseInt(selectedTBL_KSV_PROD_MEM[0].SEQ) === 1) {
            alert("첫번째 자재는 이동 할 수 없습니다 <br><br>The first material cannot be moved");
            return;
        }

        var tInArray = [];
        var tSelObj = sanitizeProdMemPayload(selectedTBL_KSV_PROD_MEM[0]);
        tInArray.push(tSelObj);

        var tAddPosition = getEDT_KSV_PROD_MEM();
        tAddPosition.IS_TOP = "1";
        tAddPosition.MOVE_CNT = "1";

        //
        var tProdCds = [{ PROD_CD: selectedProdMst.PROD_CD }];

        const tLocalMoved = applyMoveToRows(
            datasTBL_KSV_PROD_MEM,
            selectedTBL_KSV_PROD_MEM[0].SEQ,
            0,
        );

        setDatasTBL_KSV_PROD_MEM(tLocalMoved.rows);
        setSelectedTBL_KSV_PROD_MEM(tLocalMoved.selectedRows);
        setDataETC_ROW_COUNT(tLocalMoved.rows.length);

        setLoadingTBL_KSV_PROD_MEM(true);
        serviceS0306_MRP_BY_ORDER
            .mgrInsert_ALL_UPDATE_MATERIAL_MOVE_UP(
                tInArray,
                tProdCds,
                tAddPosition,
            )
            .then((data) => {
                setLoadingTBL_KSV_PROD_MEM(false);
                if (typeof data.graphQLErrors === "undefined") {
                    if (isFailedCodeResult(data)) {
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
        const selectedProdMst = Array.isArray(selectedTBL_KSV_PROD_MST)
            ? selectedTBL_KSV_PROD_MST[0]
            : selectedTBL_KSV_PROD_MST;

        if (!selectedProdMst || typeof selectedProdMst.PROD_CD === "undefined") {
            alert("작업할 color를 선택하세요<br><br>Select the color you want to work with");
            return;
        }

        var tEdit = getEDT_KSV_PROD_MEM();

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
        var tSelObj = sanitizeProdMemPayload(selectedTBL_KSV_PROD_MEM[0]);
        tInArray.push(tSelObj);

        var tAddPosition = getEDT_KSV_PROD_MEM();
        tAddPosition.IS_BOTTOM = "0";
        tAddPosition.MOVE_CNT = dataETC_MOVE_COUNT;

        //
        var tProdCds = [{ PROD_CD: selectedProdMst.PROD_CD }];

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
        serviceS0306_MRP_BY_ORDER
            .mgrInsert_ALL_UPDATE_MATERIAL_MOVE_DOWN(
                tInArray,
                tProdCds,
                tAddPosition,
            )
            .then((data) => {
                setLoadingTBL_KSV_PROD_MEM(false);
                if (typeof data.graphQLErrors === "undefined") {
                    if (isFailedCodeResult(data)) {
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
        const selectedProdMst = Array.isArray(selectedTBL_KSV_PROD_MST)
            ? selectedTBL_KSV_PROD_MST[0]
            : selectedTBL_KSV_PROD_MST;

        if (!selectedProdMst || typeof selectedProdMst.PROD_CD === "undefined") {
            alert("작업할 color를 선택하세요<br><br>Select the color you want to work with");
            return;
        }

        var tEdit = getEDT_KSV_PROD_MEM();

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
        var tSelObj = sanitizeProdMemPayload(selectedTBL_KSV_PROD_MEM[0]);
        tInArray.push(tSelObj);

        var tAddPosition = getEDT_KSV_PROD_MEM();
        tAddPosition.IS_BOTTOM = "1";
        tAddPosition.MOVE_CNT = dataETC_MOVE_COUNT;

        //
        var tProdCds = [{ PROD_CD: selectedProdMst.PROD_CD }];

        const tLocalMoved = applyMoveToRows(
            datasTBL_KSV_PROD_MEM,
            selectedTBL_KSV_PROD_MEM[0].SEQ,
            datasTBL_KSV_PROD_MEM.length - 1,
        );

        setDatasTBL_KSV_PROD_MEM(tLocalMoved.rows);
        setSelectedTBL_KSV_PROD_MEM(tLocalMoved.selectedRows);
        setDataETC_ROW_COUNT(tLocalMoved.rows.length);

        setLoadingTBL_KSV_PROD_MEM(true);
        serviceS0306_MRP_BY_ORDER
            .mgrInsert_ALL_UPDATE_MATERIAL_MOVE_DOWN(
                tInArray,
                tProdCds,
                tAddPosition,
            )
            .then((data) => {
                setLoadingTBL_KSV_PROD_MEM(false);
                if (typeof data.graphQLErrors === "undefined") {
                    if (isFailedCodeResult(data)) {
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

        var tEdit = getEDT_KSV_PROD_MEM();
        if (tEdit.ALL_FLAG === "1") {
            if (
                await confirm(
                    "전체 Material에 동일하게 적용됩니다. 진행하시겠습니까?<br><br>The same will be applied to all materials. Do you want to proceed?",
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
            alert("작업할 Color를 선택하세요<br><br>Select the color you want to work with");
            return;
        }

        var tEdit = getEDT_KSV_PROD_MEM();

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

        var tAddPosition = { ...tEdit };

        //
        var tProdCds = buildTargetProdCds();

        setLoadingTBL_KSV_PROD_MEM(true);
        serviceS0306_MRP_BY_ORDER
            .mgrInsert_ALL_UPDATE_MATERIAL_SIZE_USAGE(
                tInArray,
                tProdCds,
                tAddPosition,
            )
            .then((data) => {
                setLoadingTBL_KSV_PROD_MEM(false);
                if (typeof data.graphQLErrors === "undefined") {
                    setSelectedTBL_KCD_MATL_MST([]);
                    // Search - 이미 구성한 tProdCds에서 첫 번째 row 데이터 사용
                    var tObj = {};
                    tObj.PROD_CD = tProdCds[0].PROD_CD;
                    tObj.ORDER_CD = tProdCds[0].ORDER_CD;
                    tObj.ORDER_MRP_SEQ = tProdCds[0].ORDER_MRP_SEQ;
                    tObj.DL_FLAG = "";
                    search_PROD_MEM(tObj);
                } else {
                    // var tStr = data.graphQLErrors[0].message;
                    console.log(
                        "ServiceNawooAll.mgrInsertS0306_MRP_BY_ORDER( error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });
    };

    const updateMaterial_std_loss_to_loss = async () => {
        await flushPendingEditsBeforeAction();

        var tEdit = getEDT_KSV_PROD_MEM();
        if (tEdit.ALL_FLAG === "1") {
            if (
                await confirm(
                    "전체 Material에 동일하게 적용됩니다. 진행하시겠습니까?<br><br>The same will be applied to all materials. Do you want to proceed?",
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
            alert("작업할 Color를 선택하세요<br><br>Select the color you want to work with");
            return;
        }

        var tEdit = getEDT_KSV_PROD_MEM();

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

        var tAddPosition = getEDT_KSV_PROD_MEM();

        //
        var tProdCds = buildTargetProdCds();

        setLoadingTBL_KSV_PROD_MEM(true);
        serviceS0306_MRP_BY_ORDER
            .mgrInsert_ALL_UPDATE_MATERIAL_STD_LOSS_TO_LOSS(
                tInArray,
                tProdCds,
                tAddPosition,
            )
            .then((data) => {
                setLoadingTBL_KSV_PROD_MEM(false);
                if (typeof data.graphQLErrors === "undefined") {
                    setSelectedTBL_KCD_MATL_MST([]);
                    // Search - 이미 구성한 tProdCds에서 첫 번째 row 데이터 사용
                    var tObj = {};
                    tObj.PROD_CD = tProdCds[0].PROD_CD;
                    tObj.ORDER_CD = tProdCds[0].ORDER_CD;
                    tObj.ORDER_MRP_SEQ = tProdCds[0].ORDER_MRP_SEQ;
                    tObj.DL_FLAG = "";
                    search_PROD_MEM(tObj);
                } else {
                    // var tStr = data.graphQLErrors[0].message;
                    console.log(
                        "ServiceNawooAll.mgrInsertS0306_MRP_BY_ORDER( error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });
    };

    const deleteMaterial = async () => {
        if (selectedTBL_KSV_PROD_MST.length <= 0) {
            alert("작업할 Color를 선택하세요<br><br>Select the color you want to work with");
            return;
        }

        if (selectedTBL_KSV_PROD_MEM.length <= 0) return;

        if (!(await confirm("Delete selected material?"))) return;

        var tInArray0 = [...selectedTBL_KSV_PROD_MEM];
        var tInArray = [];
        tInArray0.forEach((col, i) => {
            tInArray.push(sanitizeProdMemPayload(col));
        });
        var tAddPosition = {};

        //
        var tProdCds = buildTargetProdCds();

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
        serviceS0306_MRP_BY_ORDER
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
                        "ServiceNawooAll.mgrInsertS0306_MRP_BY_ORDER( error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });
    };

    const changeMaterial = () => {
        if (selectedTBL_KSV_PROD_MST.length <= 0) {
            alert("작업할 Color를 선택하세요<br><br>Select the color you want to work with");
            return;
        }

        if (
            selectedTBL_KSV_PROD_MEM.length < 1 ||
            selectedTBL_KCD_MATL_MST.length !== 1
        ) {
            alert("자재 change를 위해서는 중앙테이블에서 1개 이상, 하단에서 1개의 자재를 선택해야 합니다 <br><br>Select at least 1 material from the center table and 1 from the bottom.");
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
            var tObj = sanitizeProdMemPayload(selectedRow);
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
        var tProdCds = buildTargetProdCds();

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
        serviceS0306_MRP_BY_ORDER
            .mgrInsert_ALL_CHANGE_MATERIAL(tInArray, tProdCds, tAddPosition)
            .then((data) => {
                setLoadingTBL_KSV_PROD_MEM(false);
                if (typeof data.graphQLErrors === "undefined") {
                    if (isFailedCodeResult(data)) {
                        alert(data[0].CODE);
                    } else {
                        showActionToast("Material changed successfully.");
                    }
                } else {
                    // var tStr = data.graphQLErrors[0].message;
                    console.log(
                        "ServiceNawooAll.mgrInsertS0306_MRP_BY_ORDER( error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });
    };

    const onRowClick1TBL_KCD_MATL_MST = (argData0) => {
        /**
         * COLOR가 선택되면 P.Search의 이전 찾았던 인덱스 초기화
         * Reset the previously found index of P.Search when COLOR is selected
         */
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

    const process_LOSS_ADJUST = () => {
        const tSelectedOrderRows = Array.isArray(selectedTBL_KSV_ORDER_MST)
            ? selectedTBL_KSV_ORDER_MST
            : [];
        const tSelectedProdRows = Array.isArray(selectedTBL_KSV_PROD_MST)
            ? selectedTBL_KSV_PROD_MST
            : [];
        const tSelectedProdRowsRef = Array.isArray(
            selectedTBL_KSV_PROD_MSTRef.current,
        )
            ? selectedTBL_KSV_PROD_MSTRef.current
            : [];

        const tOrderRow = tSelectedOrderRows[0] || dataTBL_KSV_ORDER_MST || {};
        const tProdRow =
            tSelectedProdRows[0] ||
            tSelectedProdRowsRef[0] ||
            (dataTBL_KSV_PROD_MST?.ORDER_CD ? dataTBL_KSV_PROD_MST : null) ||
            datasTBL_KSV_PROD_MST?.[0] ||
            {};
        
        if (selectedTBL_KSV_PROD_MST.length <= 0) {
            alert("작업할 color를 선택하세요<br><br>Select the color you want to work with");
            return;
        }

        var tInput0 = {};
        tInput0.BUYER_CD = String(tProdRow.ORDER_CD).substring(0, 2);
        tInput0.PO_CD = tOrderRow.PO_CD;
        tInput0.ORDER_CD = tProdRow.ORDER_CD;
        tInput0.ORDER_MRP_SEQ = tProdRow.ORDER_MRP_SEQ;

        setLoadingTBL_KSV_PROD_MEM(true);
        serviceS0305_MRP_MANAGER
            .adjustLoss_mrp_by_order(tInput0)
            .then((data) => {
                setLoadingTBL_KSV_PROD_MEM(false);
                if (typeof data.graphQLErrors === "undefined") {
                    if (data.length > 0) {
                        alert(data[0].CODE);
                        if (data[0].CODE.includes("SUCC")) {
                            preferredOrderRef.current = {
                                ORDER_CD: tOrderRow.ORDER_CD || tInput0.ORDER_CD || "",
                                PO_CD: tOrderRow.PO_CD || tInput0.PO_CD || "",
                            };
                            preferredProdCdRef.current =
                                tProdRow.PROD_CD || selectedTBL_KSV_PROD_MST?.[0]?.PROD_CD || "";

                            // Requery all sections and then restore the previous Order/Color selection.
                            search_LIST_1();
                        }
                    }
                } else {
                    alert("Graphsql Error");
                    console.log(
                        "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });
    };

    const processPSearchStateRef = useRef({
        keyword: "",
        lastKey: "",
        scopeKey: "",
    });
    const prodMemRestoreOffsetPx = 0;
    const usagePopupScrollStateRef = useRef({
        top: 0,
        left: 0,
        pendingRestore: false,
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

        return (
            tRootElement.querySelector(".p-datatable-scrollable-body") ||
            tRootElement.querySelector(".p-virtualscroller") ||
            tRootElement.querySelector(".p-datatable-wrapper")
        );
    };

    const saveProdMemScrollPosition = () => {
        const tScrollElement = getProdMemScrollElement();
        if (!tScrollElement) return;

        usagePopupScrollStateRef.current = {
            top: tScrollElement.scrollTop || 0,
            left: tScrollElement.scrollLeft || 0,
            pendingRestore: true,
        };
    };

    const restoreProdMemScrollPosition = () => {
        if (!usagePopupScrollStateRef.current.pendingRestore) return;

        const tScrollElement = getProdMemScrollElement();
        if (!tScrollElement) return false;

        const tTargetTop =
            (usagePopupScrollStateRef.current.top || 0) +
            prodMemRestoreOffsetPx;
        const tTargetLeft = usagePopupScrollStateRef.current.left || 0;

        tScrollElement.scrollTop = tTargetTop;
        tScrollElement.scrollLeft = tTargetLeft;
        const tAppliedTop = tScrollElement.scrollTop || 0;
        const tAppliedLeft = tScrollElement.scrollLeft || 0;
        const tSameTop = Math.abs(tAppliedTop - tTargetTop) <= 2;
        const tSameLeft = Math.abs(tAppliedLeft - tTargetLeft) <= 1;

        if (tSameTop && tSameLeft) {
            usagePopupScrollStateRef.current.pendingRestore = false;
            return true;
        }

        return false;
    };

    const scheduleRestoreProdMemScrollPosition = () => {
        let tRetryCount = 0;
        const tMaxRetry = 20;

        const tRetryRestore = () => {
            if (!usagePopupScrollStateRef.current.pendingRestore) return;

            const tDone = restoreProdMemScrollPosition();
            if (tDone) return;

            tRetryCount += 1;
            if (tRetryCount <= tMaxRetry) {
                setTimeout(tRetryRestore, 30);
                return;
            }

            usagePopupScrollStateRef.current.pendingRestore = false;
        };

        setTimeout(tRetryRestore, 0);
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
        const tQryObj = getQRY_KCD_MATL_MST();
        var tKeyword = String(tQryObj.MATL_NAME || "").trim();
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

        /*
        if (tArray.length > 0) {
            alert(
                "해당 데이타는 이미 존재합니다. 데이타 조회창의 선택된 데이타를 확인해주세요.<br><br>The data already exists. Please check the selected data in the data query window.",
            );
            setSelectedTBL_KSV_PROD_MEM(tArray);
            setDataETC_ROW_COUNT(tArray.length);
        } else {
            alert("해당 데이타는 등록 등록가능합니다<br><br>The data can be registered");
        }
        */
    };

    const searchTBL_KCD_MATL_MST = () => {
        const tQryInput = getQRY_KCD_MATL_MST();
        var tQryObj = {};
        tQryObj.MATL_CD = tQryInput.MATL_CD;
        tQryObj.MATL_NAME = tQryInput.MATL_NAME;
        tQryObj.COLOR = tQryInput.COLOR;
        tQryObj.SPEC = tQryInput.SPEC;
        tQryObj.VENDOR_CD = tQryInput.VENDOR_NAME;
        tQryObj.STATUS_CD = "2";
        tQryObj.MATL_TYPE = "";

        clearSelectedTBL_KCD_MATL_MST();

        /**
         * M.Search 실행 시 P.Search 상태 초기화
         * Reset P.Search state when M.Search is executed
         */
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
                setLoadingTBL_KCD_MATL_MST(false);
                if (typeof data.graphQLErrors === "undefined") {
                    // console.log("ServiceNawooAll.mgrQueryTBL_KCD_MATL_MST() call => " + data.length);
                    // setDatasTBL_KCD_MATL_MST(data);
                    //if (data.message !== "") alert(data.message);
                    var tArray = [];
                    data.datas.forEach((col, i) => {
                        var tObj = { ...col };
                        tArray.push(tObj);
                    });
                    if (tArray.length <= 0)
                        alert("검색된 자재 정보가 없습니다 <br><br>No material information found");
                    setDatasTBL_KCD_MATL_MST(tArray);
                    // if (tArray.length === 1) onRowClick1TBL_KCD_MATL_MST(tArray);
                } else {
                    // var tStr = data.graphQLErrors[0].message;
                    console.log(
                        "ServiceNawooAll.mgrQueryTBL_KCD_MATL_MST()error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
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

    /**TABLE KSV_ORDER_MST */
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

    const onRowClickTBL_KSV_ORDER_MST = (event) => {
        var argData = {};

        console.log(event);

        if (typeof event.data.ORDER_CD !== "undefined") {
            argData = { ...event.data };
        } else {
            return;
        }

        setSelectedTBL_KSV_PROD_MST([]);
        setSelectedTBL_KSV_PROD_MEM([]);

        setDatasTBL_KSV_PROD_MST([]);
        setDatasTBL_KSV_PROD_MEM([]);

        setDatasQRY_KCD_STYLE2_ORDER_MRP_SEQ([]);

        let argTBL_KSV_ORDER_MST = argData;
        setDataTBL_KSV_ORDER_MST(argTBL_KSV_ORDER_MST);

        var tArray = [];
        tArray.push(argData);
        setSelectedTBL_KSV_ORDER_MST(tArray);

        search_PROD_MST(argData);

        // let argTBL_KSV_ORDER_MST = event.data;
        // if (flagSelectModeTBL_KSV_ORDER_MST) return;
        // Service : NawooAll:mgrQueryTBL_KSV_ORDER_MST
    };

    /**TABLE KSV_PROD_MEM */

    // DEFINE DATAGRID : TBL_KSV_PROD_MEM3
    let emptyTBL_KSV_PROD_MEM3 = {};

    const [loadingTBL_KSV_PROD_MEM3, setLoadingTBL_KSV_PROD_MEM3] =
        useState(false);

    const [datasTBL_KSV_PROD_MEM3, setDatasTBL_KSV_PROD_MEM3] = useState([]);
    const dt_TBL_KSV_PROD_MEM3 = useRef(null);
    const [dataTBL_KSV_PROD_MEM3, setDataTBL_KSV_PROD_MEM3] = useState(
        emptyTBL_KSV_PROD_MEM3,
    );
    const [selectedTBL_KSV_PROD_MEM3, setSelectedTBL_KSV_PROD_MEM3] = useState(
        [],
    );
    const [
        flagSelectModeTBL_KSV_PROD_MEM3,
        setFlagSelectModeTBL_KSV_PROD_MEM3,
    ] = useState(false);

    const onRowClickTBL_KSV_PROD_MEM3 = (event) => {};

    /**TABLE KSV_PROD_MEM */

    // DEFINE DATAGRID : TBL_KSV_PROD_MEM2
    let emptyTBL_KSV_PROD_MEM2 = {};

    const [loadingTBL_KSV_PROD_MEM2, setLoadingTBL_KSV_PROD_MEM2] =
        useState(false);

    const [datasTBL_KSV_PROD_MEM2, setDatasTBL_KSV_PROD_MEM2] = useState([]);
    const dt_TBL_KSV_PROD_MEM2 = useRef(null);
    const [dataTBL_KSV_PROD_MEM2, setDataTBL_KSV_PROD_MEM2] = useState(
        emptyTBL_KSV_PROD_MEM2,
    );
    const [selectedTBL_KSV_PROD_MEM2, setSelectedTBL_KSV_PROD_MEM2] = useState(
        [],
    );
    const [
        flagSelectModeTBL_KSV_PROD_MEM2,
        setFlagSelectModeTBL_KSV_PROD_MEM2,
    ] = useState(false);

    const onRowClickTBL_KSV_PROD_MEM2 = (event) => {};

    /**TABLE KSV_PROD_MEM */

    // DEFINE DATAGRID : TBL_KSV_PROD_MEM1
    let emptyTBL_KSV_PROD_MEM1 = {};

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

    const onRowClickTBL_KSV_PROD_MEM1 = (event) => {};

    useEffect(() => {
        datasTBL_KSV_PROD_MEM1Ref.current = datasTBL_KSV_PROD_MEM1;
    }, [datasTBL_KSV_PROD_MEM1]);

    /**TABLE KSV_PROD_MEM */

    // DEFINE DATAGRID : TBL_KSV_PROD_MEM
    const [loadingTBL_KSV_PROD_MEM, setLoadingTBL_KSV_PROD_MEM] =
        useState(false);

    const [datasTBL_KSV_PROD_MEM, setDatasTBL_KSV_PROD_MEM] = useState([]);
    const datasTBL_KSV_PROD_MEMRef = useRef([]);
    const dt_TBL_KSV_PROD_MEM = useRef(null);
    const [dataTBL_KSV_PROD_MEM, setDataTBL_KSV_PROD_MEM] = useState(
        emptyTBL_KSV_PROD_MEM,
    );
    const [selectedTBL_KSV_PROD_MEM, setSelectedTBL_KSV_PROD_MEM] = useState(
        [],
    );
    const selectedTBL_KSV_PROD_MEMRef = useRef([]);
    const [flagSelectModeTBL_KSV_PROD_MEM, setFlagSelectModeTBL_KSV_PROD_MEM] =
        useState(false);

    useEffect(() => {
        datasTBL_KSV_PROD_MEMRef.current = datasTBL_KSV_PROD_MEM;
    }, [datasTBL_KSV_PROD_MEM]);

    useEffect(() => {
        selectedTBL_KSV_PROD_MEMRef.current = selectedTBL_KSV_PROD_MEM;
    }, [selectedTBL_KSV_PROD_MEM]);

    useEffect(() => {
        setActiveCountryCell(null);
    }, [datasTBL_KSV_PROD_MEM, datasTBL_KSV_PROD_MEM1]);

    const onCellEditCompleteTBL_KSV_PROD_MEM = (e) => {
        let { rowData, newValue, field } = e;

        // Clone only the row being edited
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
                    (row.__ROW_KEY && updatedRow.__ROW_KEY
                        ? row.__ROW_KEY === updatedRow.__ROW_KEY
                        : row.SEQ === updatedRow.SEQ)
                        ? { ...row, ...updatedRow }
                        : row,
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
                //updatedRow.STD_GROSS = String(stdNet + stdNet * (stdLoss + addLoss) * 0.01);
                //updatedRow.GROSS = String(net + net * (loss + addLoss) * 0.01);
                updatedRow.STD_GROSS = String(stdNet + stdNet * (stdLoss) * 0.01);
                updatedRow.GROSS = String(net + net * (loss) * 0.01);
            }

            if (field === "LOSS" || field === "NET") {
                //updatedRow.GROSS = String(net + net * (loss + addLoss) * 0.01);
                updatedRow.GROSS = String(net + net * (loss) * 0.01);
            }

            // FORMATTING
            updatedRow.NET = parseFloat(updatedRow.NET).toFixed(4);
            updatedRow.LOSS = parseFloat(updatedRow.LOSS).toFixed(2);
            updatedRow.GROSS = parseFloat(updatedRow.GROSS).toFixed(5);

            updatedRow.STD_NET = parseFloat(updatedRow.STD_NET).toFixed(4);
            updatedRow.STD_LOSS = parseFloat(updatedRow.STD_LOSS).toFixed(2);
            updatedRow.STD_GROSS = parseFloat(updatedRow.STD_GROSS).toFixed(5);
            updatedRow.PO_QTY = parseFloat(updatedRow.GROSS * updatedRow.ORDER_QTY).toFixed(0);

            updatedRow.S_FLAG = "1";

            setDatasTBL_KSV_PROD_MEM((prevRows) =>
                prevRows.map((row) =>
                    (row.__ROW_KEY && updatedRow.__ROW_KEY
                        ? row.__ROW_KEY === updatedRow.__ROW_KEY
                        : row.SEQ === updatedRow.SEQ)
                        ? { ...row, ...updatedRow }
                        : row,
                ),
            );
        } else {
            e.preventDefault();
        }
    };

    const cellEditorTBL_KSV_PROD_MEM = (options) => {
        if (options.field === "COUNTRY") return dropboxEditor(options);
        else return textEditor(options);
    };

    const handleEditorCommit = (options) => (event) => {
        if (event.type === "blur" || event.key === "Enter") {
            options.editorCallback(event.currentTarget.value);
        }
    };

    const textEditor = useCallback((options) => {
        let latestValue = options.value ?? "";
        const onInputTrack = (event) => { latestValue = event.target.value; };
        const commitValue = (event) => {
            if (event.key === "Enter" || event.type === "blur") {
                options.editorCallback(latestValue);
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
    }, [])

    const dropboxEditor = (options) => {
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
            />
        );
    };

    const onRowDoubleClickTBL_KSV_PROD_MEM = (argData0) => {
        if (!argData0?.data) return;

        var tRemark = "";
        var tColName = "";
        var tKeys = Object.keys(argData0.data);

        const normalizeSpace = (str) => String(str ?? "").replace(/\s+/g, " ").trim();
        var clickedText = normalizeSpace(argData0?.originalEvent?.target?.innerText);

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
            "ORDER_QTY",
            "PO_QTY",
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
            popup_MATL_MST(argData0?.data?.MATL_CD || "");
        }

        if (tColName === "SPEC") {
            popup_SPEC(argData0.data);
        }
    };

    const onCellDoubleClickTBL_KSV_PROD_MEM = (event) => {
        if (!event?.data) return;

        const tCell = event?.originalEvent?.target?.closest?.("td");
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
            "ORDER_QTY",
            "PO_QTY",
            "VENDOR_NAME",
            "SEQ",
        ];

        const fieldByCellIndex =
            tCell && typeof tCell.cellIndex === "number"
                ? tFieldOrder[tCell.cellIndex]
                : "";

        const tField =
            event.field ||
            event?.columnProps?.field ||
            event?.column?.props?.field ||
            fieldByCellIndex ||
            "";

        if (tField === "SPEC") {
            popup_SPEC(event.data);
            return;
        }

        if (tField === "MATL_CD" || tField === "S_MATL_CD") {
            popup_MATL_MST(event.data.MATL_CD);
        }
    };

    const renderDoubleClickCell = useCallback((value, rowData, onDoubleClick) => (
        <span
            style={{ display: "block", width: "100%", minHeight: "1rem", cursor: "pointer" }}
            onDoubleClick={(event) => {
                event.stopPropagation();
                onDoubleClick?.(rowData);
            }}
        >
            {value ?? ""}
        </span>
    ), []);

    /**TABLE KSV_PROD_MST */
    // DEFINE DATAGRID : TBL_KSV_PROD_MST
    const [loadingTBL_KSV_PROD_MST, setLoadingTBL_KSV_PROD_MST] =
        useState(false);
    const [datasTBL_KSV_PROD_MST, setDatasTBL_KSV_PROD_MST] = useState([]);
    const dt_TBL_KSV_PROD_MST = useRef(null);
    const [dataTBL_KSV_PROD_MST, setDataTBL_KSV_PROD_MST] = useState(
        emptyTBL_KSV_PROD_MST,
    );
    const [selectedTBL_KSV_PROD_MST, setSelectedTBL_KSV_PROD_MST] = useState(
        [],
    );
    const selectedTBL_KSV_PROD_MSTRef = useRef([]);
    const [flagSelectModeTBL_KSV_PROD_MST, setFlagSelectModeTBL_KSV_PROD_MST] =
        useState(false);

    const editTBL_KSV_PROD_MST = (argData) => {};

    const onRowClick1TBL_KSV_PROD_MST = (argData0) => {
        if (!argData0) return;

        var argData = {};

        if (typeof argData0.length !== "undefined") {
            argData = argData0[argData0.length - 1];
        } else {
            argData = argData0;
        }

        if (!argData) return;

        let argTBL_KSV_PROD_MST = argData;
        selectedTBL_KSV_PROD_MSTRef.current = [argTBL_KSV_PROD_MST];
        editTBL_KSV_PROD_MST(argTBL_KSV_PROD_MST);
        setDataTBL_KSV_PROD_MST(argTBL_KSV_PROD_MST);

        var tObj = {};
        tObj.PROD_CD = argData.PROD_CD;
        tObj.ORDER_CD = argData.ORDER_CD;
        tObj.ORDER_MRP_SEQ = argData.ORDER_MRP_SEQ;
        tObj.DL_FLAG = "";

        setDatasTBL_KSV_PROD_MEM([]);
        setSelectedTBL_KSV_PROD_MEM([]);
        setLoadingTBL_KSV_PROD_MEM(true);

        serviceS0306_MRP_BY_ORDER
            .mgrQueryTBL_KSV_PROD_MEM(tObj)
            .then((data) => {
                if (typeof data.graphQLErrors === "undefined") {
                    const dataRows = Array.isArray(data)
                        ? data
                        : data
                          ? [data]
                          : [];
                    if (dataRows.length <= 0) return;

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
                    }

                    if (typeof argData.ORDER_QTY !== "undefined") {
                        copiedData = copiedData.map((item) =>
                            applyOrderQtyAndPoQty(item, argData.ORDER_QTY),
                        );
                    }

                    console.log(copiedData);

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
                    syncVendorCd1State(uniqueVendors);

                    const keyedRows = withProdMemDataKeys(copiedData);
                    setDatasTBL_KSV_PROD_MEM(keyedRows);
                    setDataETC_ROW_COUNT(dataRows.length);

                    scheduleRestoreProdMemScrollPosition();
                } else {
                    // var tStr = data.graphQLErrors[0].message;
                    console.log(
                        "mgrQueryTBL_KSV_PROD_MEM()error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }

                setLoadingTBL_KSV_PROD_MEM(false);
            });
    };

    const onRowClickTBL_KSV_PROD_MST = (event) => {
        var argData = {};

        if (typeof event.data.PROD_CD !== "undefined") {
            argData = { ...event.data };
        } else {
            return;
        }

        let argTBL_KSV_PROD_MST = argData;
        selectedTBL_KSV_PROD_MSTRef.current = [argTBL_KSV_PROD_MST];
        editTBL_KSV_PROD_MST(argTBL_KSV_PROD_MST);
        setDataTBL_KSV_PROD_MST(argTBL_KSV_PROD_MST);

        var tArray = [];
        tArray.push(argData);
        setSelectedTBL_KSV_PROD_MST(tArray);

        if (datasQRY_KCD_STYLE2_ORDER_MRP_SEQ.length > 0) {
            const tMaxOrderMrpSeqRow = datasQRY_KCD_STYLE2_ORDER_MRP_SEQ.reduce(
                (maxRow, row) => {
                    const maxVal = Number(maxRow?.ORDER_MRP_SEQ);
                    const currVal = Number(row?.ORDER_MRP_SEQ);

                    if (!Number.isFinite(maxVal) && Number.isFinite(currVal)) {
                        return row;
                    }
                    if (Number.isFinite(maxVal) && !Number.isFinite(currVal)) {
                        return maxRow;
                    }
                    if (Number.isFinite(maxVal) && Number.isFinite(currVal)) {
                        return currVal > maxVal ? row : maxRow;
                    }

                    return String(row?.ORDER_MRP_SEQ || "") >
                        String(maxRow?.ORDER_MRP_SEQ || "")
                        ? row
                        : maxRow;
                },
                datasQRY_KCD_STYLE2_ORDER_MRP_SEQ[0],
            );
            setDataQRY_KCD_STYLE2_ORDER_MRP_SEQ(tMaxOrderMrpSeqRow);
        }

        var tObj = {};
        tObj.PROD_CD = argData.PROD_CD;
        tObj.ORDER_CD = argData.ORDER_CD;
        tObj.ORDER_MRP_SEQ = argData.ORDER_MRP_SEQ;
        tObj.DL_FLAG = "";

        setDatasTBL_KSV_PROD_MEM([]);
        search_PROD_MEM(tObj, "1", {
            orderQty: argData.ORDER_QTY,
        });

        // let argTBL_KSV_PROD_MST = event.data;
        // if (flagSelectModeTBL_KSV_PROD_MST) return;

        // Service : NawooAll:mgrQueryTBL_KSV_PROD_MST
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

    /**EDIT KSV_PROD_MEM */
    const [datasEDT_KSV_PROD_MEM, setDatasEDT_KSV_PROD_MEM] = useState([]);
    const [dataEDT_KSV_PROD_MEM, setDataEDT_KSV_PROD_MEM] = useState(
        emptyEDT_KSV_PROD_MEM,
    );
    const edtKsvProdMemDraftRef = useRef({ ...emptyEDT_KSV_PROD_MEM });
    const [edtKsvProdMemInputVersion, setEdtKsvProdMemInputVersion] =
        useState(0);

    const getEDT_KSV_PROD_MEM = () => {
        return { ...edtKsvProdMemDraftRef.current };
    };

    const commitEDT_KSV_PROD_MEM_InputState = () => {
        const tDraft = getEDT_KSV_PROD_MEM();
        setDataEDT_KSV_PROD_MEM((prev) => ({
            ...prev,
            NET: tDraft.NET || "",
            LOSS: tDraft.LOSS || "",
            USE_SIZE: tDraft.USE_SIZE || "",
            REMARK: tDraft.REMARK || "",
        }));
    };

    const onCheckboxChangeEDT_KSV_PROD_MEM_STD_FLAG = (e, name) => {
        let val = "";
        let _dataEDT_KSV_PROD_MEM = getEDT_KSV_PROD_MEM();
        if (e.checked) {
            val = "1";
        } else {
            val = "0";
        }
        _dataEDT_KSV_PROD_MEM[`${name}`] = val;
        edtKsvProdMemDraftRef.current = _dataEDT_KSV_PROD_MEM;
        setDataEDT_KSV_PROD_MEM(_dataEDT_KSV_PROD_MEM);
    };

    const onCheckboxChangeEDT_KSV_PROD_MEM_ALL_FLAG = (e, name) => {
        let val = "";
        let _dataEDT_KSV_PROD_MEM = getEDT_KSV_PROD_MEM();
        if (e.checked) {
            val = "1";
        } else {
            val = "0";
        }
        _dataEDT_KSV_PROD_MEM[`${name}`] = val;
        edtKsvProdMemDraftRef.current = _dataEDT_KSV_PROD_MEM;
        setDataEDT_KSV_PROD_MEM(_dataEDT_KSV_PROD_MEM);
    };

    const onCheckboxChangeEDT_KSV_PROD_MEM_ALL_COLOR_FLAG = (e, name) => {
        let val = "";
        let _dataEDT_KSV_PROD_MEM = getEDT_KSV_PROD_MEM();
        if (e.checked) {
            val = "1";
        } else {
            val = "0";
        }
        _dataEDT_KSV_PROD_MEM[`${name}`] = val;
        edtKsvProdMemDraftRef.current = _dataEDT_KSV_PROD_MEM;
        setDataEDT_KSV_PROD_MEM(_dataEDT_KSV_PROD_MEM);
    };

    const onInputChangeEDT_KSV_PROD_MEM_NET = (e, name) => {
        let val = (e.target && e.target.value) || "";
        edtKsvProdMemDraftRef.current.NET = val;
    };

    const onInputChangeEDT_KSV_PROD_MEM_LOSS = (e, name) => {
        let val = (e.target && e.target.value) || "";
        edtKsvProdMemDraftRef.current.LOSS = val;
    };

    const onInputChangeEDT_KSV_PROD_MEM_USE_SIZE = (e, name) => {
        let val = (e.target && e.target.value) || "";
        edtKsvProdMemDraftRef.current.USE_SIZE = val;
    };

    const onInputChangeEDT_KSV_PROD_MEM_REMARK = (e, name) => {
        let val = (e.target && e.target.value) || "";
        edtKsvProdMemDraftRef.current.REMARK = val;
    };

    const resetStdFlag = () => {
        const tNext = {
            ...getEDT_KSV_PROD_MEM(),
            STD_FLAG: "0",
            ALL_FLAG: "0",
            NET: "",
            LOSS: "",
            USE_SIZE: "",
            REMARK: "",
        };
        edtKsvProdMemDraftRef.current = tNext;
        setDataEDT_KSV_PROD_MEM(tNext);
        setEdtKsvProdMemInputVersion((prev) => prev + 1);
    };

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

    useEffect(async () => {
        var tArray = [];
        var tObj0 = { ...emptyTBL_KCD_MATL_MST1 };
        tObj0.id = 1;
        tArray.push(tObj0);

        setDatasTBL_KCD_MATL_MST1(tArray);
        // setFrozenTBL_KCD_MATL_MST(tArray);

        var tArray2 = [];
        var tObj = {};
        tObj.STYLE_CD = "";
        tObj.STYLE_NAME = " ";
        tArray2.push(tObj);
        setDatasQRY_KCD_STYLE_STYLE_CD(tArray2);
        setDataQRY_KCD_STYLE_STYLE_CD(tArray2[0]);

        await search_QRY_NATION();

        search_QRY_BUYER("");

        let ret = await search_QRY_VENDOR("", 1);
        console.log(ret);
        setDatasQRY_KCD_STYLE2_VENDOR_CD2([...ret]);
        setDataQRY_KCD_STYLE2_VENDOR_CD2(ret[0]);

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

        setDataQRY_KCD_STYLE2_ORDER_MRP_SEQ([]);
    }, []);

    const openCountryEditor = async (tableKey, rowKey) => {
        await search_QRY_NATION();
        setActiveCountryCell({ tableKey, rowKey });
    };

    const closeCountryEditor = () => {
        setActiveCountryCell(null);
    };

    const isCountryEditorOpen = (tableKey, rowKey) => {
        return (
            activeCountryCell?.tableKey === tableKey &&
            activeCountryCell?.rowKey === rowKey
        );
    };

    const countryEditorRenderDependency = activeCountryCell
        ? `${activeCountryCell.tableKey}::${activeCountryCell.rowKey}`
        : "";

    const processReset = () => {
        qryKcdStyleDraftRef.current = { ...emptyQRY_KCD_STYLE };
        setDataQRY_KCD_STYLE({ ...emptyQRY_KCD_STYLE });
        setQryKcdStyleInputVersion((prev) => prev + 1);

        setDatasTBL_KSV_ORDER_MST([]);
        setDataTBL_KSV_ORDER_MST({ ...emptyTBL_KSV_ORDER_MST });
        setSelectedTBL_KSV_ORDER_MST([]);

        setDatasTBL_KSV_PROD_MST([]);
        setDataTBL_KSV_PROD_MST({ ...emptyTBL_KSV_PROD_MST });
        setSelectedTBL_KSV_PROD_MST([]);

        setDatasTBL_KSV_PROD_MEM([]);
        setDataTBL_KSV_PROD_MEM({ ...emptyTBL_KSV_PROD_MEM });
        setSelectedTBL_KSV_PROD_MEM([]);

        setDataETC_ROW_COUNT("");
        setDatasQRY_KCD_STYLE2_ORDER_MRP_SEQ([]);
        setDataQRY_KCD_STYLE2_ORDER_MRP_SEQ({});
    };

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

    const preferredProdCdRef = useRef("");
    const preferredOrderRef = useRef({
        ORDER_CD: "",
        PO_CD: "",
    });

    useEffect(() => {
        const handleMessage = (event) => {
            const tData = event?.data || {};
            if (tData.func !== "mrp_requery_parent_center") return;

            const tMessage = tData.message || {};
            if (String(tMessage.SOURCE || "").toUpperCase() !== "S0306") return;

            const tOrderCd =
                tMessage.ORDER_CD ||
                selectedTBL_KSV_ORDER_MST?.[0]?.ORDER_CD ||
                dataTBL_KSV_ORDER_MST?.ORDER_CD ||
                "";

            if (!tOrderCd) return;

            const tMatchedOrder =
                datasTBL_KSV_ORDER_MST.find((row) => row.ORDER_CD === tOrderCd) ||
                selectedTBL_KSV_ORDER_MST?.[0] ||
                dataTBL_KSV_ORDER_MST;

            if (!tMatchedOrder?.ORDER_CD) {
                search_PROD_MST({ ORDER_CD: tOrderCd });
                return;
            }

            const tKeepProdCd =
                tMessage.PROD_CD ||
                selectedTBL_KSV_PROD_MST?.[0]?.PROD_CD ||
                dataTBL_KSV_PROD_MST?.PROD_CD ||
                "";

            setLoadingTBL_KSV_PROD_MST(true);
            serviceS0306_MRP_BY_ORDER
                .mgrQueryTBL_KSV_PROD_MST({ STYLE_CD: "", ORDER_CD: tMatchedOrder.ORDER_CD })
                .then((data) => {
                    setLoadingTBL_KSV_PROD_MST(false);
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

                    const tFormattedRows = tProdRows.map((item, index) => ({
                        ...item,
                        id: index,
                    }));

                    preferredProdCdRef.current = tKeepProdCd;
                    setDatasTBL_KSV_PROD_MST(tFormattedRows);
                });
        };

        window.addEventListener("message", handleMessage);
        return () => window.removeEventListener("message", handleMessage);
    }, [datasTBL_KSV_ORDER_MST, selectedTBL_KSV_ORDER_MST, dataTBL_KSV_ORDER_MST]);

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
        const el = prodMemContainerRef.current;
        if (!el) return;
        const obs = new ResizeObserver((entries) => {
            const h = entries[0].contentRect.height;
            // 헤더 행 높이(~28px)를 빼서 스크롤 바디 높이만 전달
            setProdMemScrollHeight(`${Math.max(80, Math.floor(h) - 28)}px`);
        });
        obs.observe(el);
        return () => obs.disconnect();
    }, []);

    useEffect(() => {
        if (datasTBL_KSV_ORDER_MST.length > 0) {
            console.log(datasTBL_KSV_ORDER_MST);

            const tPreferredOrder = preferredOrderRef.current || {};
            const tMatchedByOrderAndPo = datasTBL_KSV_ORDER_MST.find(
                (row) =>
                    row.ORDER_CD === tPreferredOrder.ORDER_CD &&
                    (!tPreferredOrder.PO_CD || row.PO_CD === tPreferredOrder.PO_CD),
            );
            const tMatchedByOrder = datasTBL_KSV_ORDER_MST.find(
                (row) => row.ORDER_CD === tPreferredOrder.ORDER_CD,
            );
            const tNextOrderRow =
                tMatchedByOrderAndPo || tMatchedByOrder || datasTBL_KSV_ORDER_MST[0];

            preferredOrderRef.current = {
                ORDER_CD: "",
                PO_CD: "",
            };

            setSelectedTBL_KSV_ORDER_MST([tNextOrderRow]);
            onRowClickTBL_KSV_ORDER_MST({ data: tNextOrderRow });
        }
    }, [datasTBL_KSV_ORDER_MST]);

    useEffect(() => {
        if (datasTBL_KSV_PROD_MST.length > 0) {
            const tPreferredProdCd =
                preferredProdCdRef.current ||
                selectedTBL_KSV_PROD_MST?.[0]?.PROD_CD ||
                dataTBL_KSV_PROD_MST?.PROD_CD ||
                "";

            const tMatchedRow =
                datasTBL_KSV_PROD_MST.find(
                    (row) => row.PROD_CD === tPreferredProdCd,
                ) || datasTBL_KSV_PROD_MST[0];

            preferredProdCdRef.current = "";

            if (tMatchedRow?.PROD_CD) {
                setSelectedTBL_KSV_PROD_MST([tMatchedRow]);
                onRowClick1TBL_KSV_PROD_MST(tMatchedRow);
            }
        }
    }, [datasTBL_KSV_PROD_MST]);

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

        const updatedData = currentRows.map((col) => {
            const shouldApply = hasSelectedRows ? selectedIds.has(col.id) : true;
            if (!shouldApply) return col;

            const tObj = { ...col };
            if (argOpMode === "USAGE") {
                tObj.REMARK = argValue;
            }
            if (argOpMode === "NET_S") {
                tObj.STD_NET = argValue;
                tObj.NET = argValue;
            }
            if (argOpMode === "NET") {
                tObj.NET = argValue;
            }
            if (argOpMode === "LOSS") {
                tObj.LOSS = argValue;
            }

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

    const select_UPDATE_SPEC = (argSpec) => {
        var argData = { ...(argSpec || saveUPDATE_SPEC) };

        var tObj = {};
        tObj.PROD_CD = argData.PROD_CD;
        tObj.REMARK = argData.REMARK;
        tObj.ORDER_CD = argData.ORDER_CD;
        tObj.ORDER_MRP_SEQ = argData.ORDER_MRP_SEQ;
        tObj.DL_FLAG = "";

        datasTBL_KSV_PROD_MEM1Ref.current = [];
        setDatasTBL_KSV_PROD_MEM1([]);
        setSelectedTBL_KSV_PROD_MEM1([]);
        var tArray = [];

        setLoadingTBL_KSV_PROD_MEM(true);
        serviceS0306_MRP_BY_ORDER
            .mgrQueryTBL_KSV_PROD_MEM_BY_USAGE(tObj)
            .then((data) => {
                setLoadingTBL_KSV_PROD_MEM(false);
                if (typeof data.graphQLErrors === "undefined") {
                    let copiedData = cloneArrayData(data);
                    var tArray = [];
                    copiedData.forEach((col, i) => {
                        var item = { ...col };
                        item.id = `${item.PROD_CD || ""}_${item.ORDER_CD || ""}_${item.ORDER_MRP_SEQ || ""}_${item.SEQ || ""}_${i}`;
                        // item.PROD_CD_N = col.COLOR;
                        item.NET = parseFloat(item.NET).toFixed(4);
                        item.LOSS = parseFloat(item.LOSS).toFixed(2);
                        item.GROSS = parseFloat(item.GROSS).toFixed(4);

                        item.STD_NET = parseFloat(item.STD_NET).toFixed(4);
                        item.STD_LOSS = parseFloat(item.STD_LOSS).toFixed(2);
                        item.STD_GROSS = parseFloat(item.STD_GROSS).toFixed(4);
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

    const process_UPDATE_SPEC = (argData) => {
        const toSafeNumber = (value, fallback = 0) => {
            const tNumber = Number(value);
            return Number.isFinite(tNumber) ? tNumber : fallback;
        };
        const toSafeNumberString = (value, fallback = "0") => {
            const tNumber = Number(value);
            return Number.isFinite(tNumber) ? String(tNumber) : fallback;
        };

        var tInArray = [];
        var tSelectedProd = selectedTBL_KSV_PROD_MST[0] || {};
        var tSavedSpec = saveUPDATE_SPEC || {};
        const currentRows = datasTBL_KSV_PROD_MEM1Ref.current || [];
        const selectedIds = new Set(
            (selectedTBL_KSV_PROD_MEM1 || []).map((row) => row.id),
        );

        const hasSelectedRows = selectedIds.size > 0;

        currentRows.forEach((col, i) => {
            const isSelected = selectedIds.has(col.id);
            const isChanged = col.S_FLAG === "1";
            const shouldSave = hasSelectedRows ? isSelected : isChanged;
            if (!shouldSave) return;

            var tObj = { ...col };
            delete tObj.__typename;
            delete tObj.id;
            delete tObj.__ROW_KEY;
            tObj.PROD_CD =
                tObj.PROD_CD || tSavedSpec.PROD_CD || tSelectedProd.PROD_CD;
            tObj.ORDER_CD =
                tObj.ORDER_CD || tSavedSpec.ORDER_CD || tSelectedProd.ORDER_CD;
            tObj.ORDER_MRP_SEQ =
                tObj.ORDER_MRP_SEQ_MAX ||
                tObj.ORDER_MRP_SEQ ||
                tSavedSpec.ORDER_MRP_SEQ ||
                tSelectedProd.ORDER_MRP_SEQ;
            delete tObj.ORDER_MRP_SEQ_MAX;

            // GraphQL 입력 타입에 맞춰 NaN/타입 오류를 방지한다.
            // PO_QTY 는 Float, 나머지 수치 컬럼은 String 스키마를 사용한다.
            tObj.PO_QTY = toSafeNumber(tObj.PO_QTY);
            tObj.ORDER_QTY = toSafeNumberString(tObj.ORDER_QTY);
            tObj.NET = toSafeNumberString(tObj.NET);
            tObj.LOSS = toSafeNumberString(tObj.LOSS);
            tObj.GROSS = toSafeNumberString(tObj.GROSS);
            tObj.STD_NET = toSafeNumberString(tObj.STD_NET);
            tObj.STD_LOSS = toSafeNumberString(tObj.STD_LOSS);
            tObj.STD_GROSS = toSafeNumberString(tObj.STD_GROSS);

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
        serviceS0306_MRP_BY_ORDER
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
                    alert("저장 중 오류가 발생했습니다.<br><br>An error occurred while saving. " + data.graphQLErrors);
                    console.log(
                        "ServiceNawooAll.mgrInsertS0303_MRP_RECORD_STYLE( error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });
    };

    const buildProdMemPatchKey = (row) =>
        `${row?.PROD_CD || ""}|${row?.SEQ || ""}|${row?.MATL_CD || ""}`;

    // BY_USAGE 조회 결과는 화면 상태/선택 상황에 따라 키가 섞일 수 있어
    // strict key(SEQ 기반)가 실패할 때 fallback key로만 사용한다.
    // strict key(SEQ 기반)가 실패할 때의 fallback으로만 사용하므로
    // 두 필드를 제거해 양쪽 행이 동일한 키를 생성하도록 수정한다.
    const buildProdMemPatchLooseKey = (row) =>
        `${row?.PROD_CD || ""}|${row?.MATL_CD || ""}|${row?.USE_SIZE || ""}|${row?.REMARK || ""}`;

    const formatProdMemPatchedRow = (item, fallbackId = 0) => {
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
        const tSaveSpec = saveUPDATE_SPEC || {};
        const tProdCd = tSaveSpec.PROD_CD || "";
        if (!tProdCd) {
            patchingProdMemByUsageRef.current = false;
            return;
        }

        const tSavedScrollTop = (() => {
            saveProdMemScrollPosition();
            return usagePopupScrollStateRef.current?.top || 0;
        })();

        const tObj = {
            PROD_CD: tProdCd,
            ORDER_CD: tSaveSpec.ORDER_CD || "",
            ORDER_MRP_SEQ: tSaveSpec.ORDER_MRP_SEQ || "",
            REMARK: tSaveSpec.REMARK || "",
            DL_FLAG: "",
        };

        patchingProdMemByUsageRef.current = true;

        const tSelectedSnapshot = [...(selectedTBL_KSV_PROD_MEMRef.current || [])];
        const tSelectedStrictSet = new Set(
            tSelectedSnapshot.map((row) => buildProdMemPatchKey(row)),
        );
        const tSelectedLooseSet = new Set(
            tSelectedSnapshot.map((row) => buildProdMemPatchLooseKey(row)),
        );

        const data = await serviceS0306_MRP_BY_ORDER.mgrQueryTBL_KSV_PROD_MEM_BY_USAGE(
            tObj,
        );

        if (typeof data.graphQLErrors !== "undefined") {
            console.log(
                "mgrQueryTBL_KSV_PROD_MEM_BY_USAGE()error => " +
                    JSON.stringify(data.graphQLErrors),
            );
            patchingProdMemByUsageRef.current = false;
            return;
        }

        const tFetchedRows = (Array.isArray(data) ? data : data ? [data] : []).map(
            (row, idx) => formatProdMemPatchedRow(row, idx),
        );

        // usage 기반 조회 결과가 비면 부분 patch 대신 전체 재조회로 보정한다.
        if (tFetchedRows.length <= 0) {
            patchingProdMemByUsageRef.current = false;
            search_PROD_MEM(
                {
                    PROD_CD: tSaveSpec.PROD_CD || "",
                    ORDER_CD: tSaveSpec.ORDER_CD || "",
                    ORDER_MRP_SEQ: tSaveSpec.ORDER_MRP_SEQ || "",
                    DL_FLAG: "",
                },
                "1",
                { preserveVendorCd1: true },
            );
            return;
        }

        // 다건 편집 시 동일 키가 여러 건일 수 있어, 키별 큐를 만들어 순차 매칭한다.
        const tFetchedStrictQueues = new Map();
        const tFetchedLooseQueues = new Map();
        tFetchedRows.forEach((row) => {
            const sk = buildProdMemPatchKey(row);
            if (!tFetchedStrictQueues.has(sk)) tFetchedStrictQueues.set(sk, []);
            tFetchedStrictQueues.get(sk).push(row);

            const lk = buildProdMemPatchLooseKey(row);
            if (!tFetchedLooseQueues.has(lk)) tFetchedLooseQueues.set(lk, []);
            tFetchedLooseQueues.get(lk).push(row);
        });

        const tCurrentRows = datasTBL_KSV_PROD_MEMRef.current || [];
        let tMatchedCount = 0;
        const tUpdatedRows = tCurrentRows.map((row, idx) => {
            const tStrictKey = buildProdMemPatchKey(row);
            const tLooseKey = buildProdMemPatchLooseKey(row);
            let tFetched = null;
            const tStrictQueue = tFetchedStrictQueues.get(tStrictKey);
            if (Array.isArray(tStrictQueue) && tStrictQueue.length > 0) {
                tFetched = tStrictQueue.shift();
            }

            if (!tFetched) {
                const tLooseQueue = tFetchedLooseQueues.get(tLooseKey);
                if (Array.isArray(tLooseQueue) && tLooseQueue.length > 0) {
                    tFetched = tLooseQueue.shift();
                }
            }

            if (!tFetched) return row;

            tMatchedCount += 1;

            return {
                ...row,
                ...tFetched,
                id: typeof row.id !== "undefined" ? row.id : idx,
            };
        });

        // 다건 저장 후 키 조합 불일치로 patch 0건이면 전체 재조회로 화면을 확정한다.
        if (tMatchedCount <= 0) {
            patchingProdMemByUsageRef.current = false;
            search_PROD_MEM(
                {
                    PROD_CD: tSaveSpec.PROD_CD || "",
                    ORDER_CD: tSaveSpec.ORDER_CD || "",
                    ORDER_MRP_SEQ: tSaveSpec.ORDER_MRP_SEQ || "",
                    DL_FLAG: "",
                },
                "1",
                { preserveVendorCd1: true },
            );
            return;
        }

        const tNextSelection = tUpdatedRows.filter((row) => {
            const tStrictKey = buildProdMemPatchKey(row);
            const tLooseKey = buildProdMemPatchLooseKey(row);
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
            setSelectedTBL_KSV_PROD_MEM(tNextSelection);
            syncVendorCd1State(uniqueVendors);
            setDataETC_ROW_COUNT(tUpdatedRows.length);
        });

        usagePopupScrollStateRef.current = {
            ...usagePopupScrollStateRef.current,
            top: tSavedScrollTop,
            pendingRestore: true,
        };
        scheduleRestoreProdMemScrollPosition();
        setTimeout(() => {
            scheduleRestoreProdMemScrollPosition();
        }, 120);
        setTimeout(() => {
            patchingProdMemByUsageRef.current = false;
        }, 320);
    };

    const unpopup_SPEC = (argData) => {
        setCreateDialog1(false);
        setDataEDT_KSV_PROD_MEM_USAGE({ ...emptyEDT_KSV_PROD_MEM_USAGE });
        refreshCheckedProdMemRowsByUsage();
    };

    const popup_SPEC = (argData) => {
        saveProdMemScrollPosition();
        setDataEDT_KSV_PROD_MEM_USAGE({ ...emptyEDT_KSV_PROD_MEM_USAGE });
        popupSpecSourceRowKeyRef.current = buildProdMemPatchKey(argData);
        var tColor = selectedTBL_KSV_PROD_MST[0]?.COLOR || "";

        const tSelectedProdRow =
            selectedTBL_KSV_PROD_MST?.[0] ||
            selectedTBL_KSV_PROD_MSTRef.current?.[0] ||
            {};

        var tObj = {};
        tObj.PROD_CD = tSelectedProdRow.PROD_CD || argData.PROD_CD;
        tObj.REMARK = argData.REMARK;
        tObj.ORDER_CD = tSelectedProdRow.ORDER_CD || argData.ORDER_CD;
        tObj.ORDER_MRP_SEQ =
            tSelectedProdRow.ORDER_MRP_SEQ || argData.ORDER_MRP_SEQ;
        tObj.DL_FLAG = "";

        datasTBL_KSV_PROD_MEM1Ref.current = [];
        setDatasTBL_KSV_PROD_MEM1([]);
        setSelectedTBL_KSV_PROD_MEM1([]);

        setSaveUPDATE_SPEC(tObj);

        setLoadingTBL_KSV_PROD_MEM1(true);
        serviceS0306_MRP_BY_ORDER
            .mgrQueryTBL_KSV_PROD_MEM_BY_USAGE(tObj)
            .then((data) => {
                setLoadingTBL_KSV_PROD_MEM1(false);
                if (typeof data.graphQLErrors === "undefined") {
                    let copiedData = cloneArrayData(data);
                    var tArray = [];
                    copiedData.forEach((col, i) => {
                        var item = { ...col };
                        item.id = `${item.PROD_CD || ""}_${item.ORDER_CD || ""}_${item.ORDER_MRP_SEQ || ""}_${item.SEQ || ""}_${i}`;
                        // item.PROD_CD_N = col.COLOR;
                        item.NET = parseFloat(item.NET).toFixed(4);
                        item.LOSS = parseFloat(item.LOSS).toFixed(2);
                        item.GROSS = parseFloat(item.GROSS).toFixed(4);

                        item.STD_NET = parseFloat(item.STD_NET).toFixed(4);
                        item.STD_LOSS = parseFloat(item.STD_LOSS).toFixed(2);
                        item.STD_GROSS = parseFloat(item.STD_GROSS).toFixed(4);
                        tArray.push(item);
                    });
                    datasTBL_KSV_PROD_MEM1Ref.current = tArray;
                    setDatasTBL_KSV_PROD_MEM1(tArray);
                    setCreateDialog1(true);
                } else {
                    console.log(
                        "mgrQueryTBL_KSV_PROD_MEM()error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });
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

    const bodyTemplateTBL_KSV_PROD_MEM_MATL_CD = useCallback((data) => {
        if (data.MATL_STATUS_CD !== "0") {
            // return <p style={{ backgroundColor:'red', opacity:'0.1', color:'black'  }}>{data.MATL_CD}</p>;
            return <p style={{ color: "red" }}>{data.MATL_CD}</p>;
        } else {
            return <p>{data.MATL_CD}</p>;
        }
    }, []);

    const bodyTemplateTBL_KSV_PROD_MEM_NET = useCallback((data) => {
        if (parseFloat(data.NET) <= 0) {
            // return <p style={{ backgroundColor:'blue', opacity:'0.01', color:'black'}}>{data.NET}</p>;
            return <p style={{ color: "blue" }}>{data.NET}</p>;
            // return <div style={{ backgroundColor:'blue', opacity:'0.1' }} ><p style={{ zIndex:'100', color:'black'}}>{data.NET}</p></div>;
        } else {
            return <p>{data.NET}</p>;
        }
    }, []);

    const bodySpecTBL_KSV_PROD_MEM = useCallback(
        (rowData) => renderDoubleClickCell(rowData.SPEC, rowData, popup_SPEC),
        [popup_SPEC, renderDoubleClickCell],
    );

    const bodyMatlCdTBL_KSV_PROD_MEM = useCallback(
        (rowData) =>
            renderDoubleClickCell(rowData.MATL_CD, rowData, (data) =>
                popup_MATL_MST(data.MATL_CD),
            ),
        [renderDoubleClickCell],
    );

    const bodySalesMatlPriceTBL_KSV_PROD_MEM = useCallback(
        (rowData) => serviceLib.numWithCommas(rowData.SALES_MATL_PRICE, 4),
        [],
    );

    const bodyMatlPriceTBL_KSV_PROD_MEM = useCallback(
        (rowData) => serviceLib.numWithCommas(rowData.MATL_PRICE, 4),
        [],
    );

    const bodyStdNetTBL_KSV_PROD_MEM = useCallback(
        (rowData) => serviceLib.formatNumber(rowData.STD_NET, 4),
        [],
    );

    const bodyStdLossTBL_KSV_PROD_MEM = useCallback(
        (rowData) => serviceLib.formatNumber(rowData.STD_LOSS, 2),
        [],
    );

    const bodyNetTBL_KSV_PROD_MEM = useCallback(
        (rowData) => serviceLib.formatNumber(rowData.NET, 4),
        [],
    );

    const bodyLossTBL_KSV_PROD_MEM = useCallback(
        (rowData) => serviceLib.formatNumber(rowData.LOSS, 2),
        [],
    );

    const bodyGrossTBL_KSV_PROD_MEM = useCallback(
        (rowData) => serviceLib.formatNumber(rowData.GROSS, 4),
        [],
    );

    const bodyOrderQtyTBL_KSV_PROD_MEM = useCallback(
        (rowData) => serviceLib.formatNumber(rowData.ORDER_QTY),
        [],
    );

    const bodyPoQtyTBL_KSV_PROD_MEM = useCallback(
        (rowData) => serviceLib.formatNumber(rowData.PO_QTY),
        [],
    );

    const bodyMatlPriceTBL_KSV_PROD_MEM1 = useCallback(
        (rowData) => serviceLib.numWithCommas(rowData.MATL_PRICE, 4),
        [],
    );

    const bodyAddLossTBL_KSV_PROD_MEM1 = useCallback(
        (rowData) => serviceLib.numWithCommas(rowData.ADD_LOSS, 2),
        [],
    );

    const bodyStdNetTBL_KSV_PROD_MEM1 = useCallback(
        (rowData) => serviceLib.numToFixed(rowData.STD_NET, 4),
        [],
    );

    const bodyStdLossTBL_KSV_PROD_MEM1 = useCallback(
        (rowData) => serviceLib.numToFixed(rowData.STD_LOSS, 4),
        [],
    );

    const bodyLossTBL_KSV_PROD_MEM1 = useCallback(
        (rowData) => serviceLib.numToFixed(rowData.LOSS, 4),
        [],
    );

    const onCellEditCompleteTBL_KSV_PROD_MEM1 = (e) => {
        let { rowData, newValue, field } = e;

        if (rowData[field] === newValue) {
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
                    //updatedRow.STD_GROSS = String(stdNet + stdNet * (stdLoss + addLoss) * 0.01,);
                    //updatedRow.GROSS = String(net + net * (loss + addLoss) * 0.01);
                    updatedRow.STD_GROSS = String(stdNet + stdNet * (stdLoss) * 0.01,);
                    updatedRow.GROSS = String(net + net * (loss) * 0.01);
                }

                if (field === "LOSS" || field === "NET") {
                    //updatedRow.GROSS = String(net + net * (loss + addLoss) * 0.01);
                    console.log(loss);
                    updatedRow.GROSS = String(net + net * (loss) * 0.01);
                }

                updatedRow.NET = parseFloat(updatedRow.NET).toFixed(4);
                updatedRow.LOSS = parseFloat(updatedRow.LOSS).toFixed(2);
                updatedRow.GROSS = parseFloat(updatedRow.GROSS).toFixed(4);
                updatedRow.STD_NET = parseFloat(updatedRow.STD_NET).toFixed(4);
                updatedRow.STD_LOSS = parseFloat(updatedRow.STD_LOSS).toFixed(2);
                updatedRow.STD_GROSS = parseFloat(updatedRow.STD_GROSS).toFixed(4);
                updatedRow.PO_QTY = parseFloat(updatedRow.GROSS * updatedRow.ORDER_QTY).toFixed(0);
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

    const [saveUPDATE_SPEC, setSaveUPDATE_SPEC] = useState({});

    const onRowClickTBL_KSV_PROD_MEM = (event) => {
        const t = event.originalEvent?.target;
        const isCheckbox = !!t?.closest(".p-checkbox");
        const isEditor = !!t?.closest(
            'input, textarea, select, .p-inputtext, .p-dropdown, [contenteditable="true"]',
        );

        clearQRY_KCD_STYLE2_VENDOR_CD1();

        if (event?.data) {
            setDataTBL_KSV_PROD_MEM({ ...event.data });
            // 중앙 row 선택 시 하단 Desc 입력란에 MATL NAME 표시
            putQRY_KCD_MATL_MST({
                ...getQRY_KCD_MATL_MST(),
                MATL_NAME: event.data.MATL_NAME || "",
            });
        }

        if (isEditor || isCheckbox) return;

        event.originalEvent?.preventDefault?.();
        event.originalEvent?.stopPropagation?.();

        if (event?.data?.MATL_CD) {
            const tRowKey = event.data.__ROW_KEY;
            const tSourceRow =
                (datasTBL_KSV_PROD_MEM || []).find(
                    (row) => row.__ROW_KEY === tRowKey,
                ) || event.data;

            setSelectedTBL_KSV_PROD_MEM([tSourceRow]);

            setDataTBL_KSV_PROD_MEM(tSourceRow);
        }
    };

    const isUnusableMaterialRow = (row) => {
        const matlStatus = String(row?.MATL_STATUS_CD ?? "").trim();
        const vendorStatus = String(row?.VENDOR_STATUS_CD ?? "").trim();
        const isInvalidStatus = (status) => status !== "" && status !== "0";

        return isInvalidStatus(matlStatus) || isInvalidStatus(vendorStatus);
    };

    const rowClassNameTBL_KSV_PROD_MEM = (data) =>
        isUnusableMaterialRow(data) ? "unusable-row" : "";

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
                if (input) {
                    input.focus();
                    return;
                }
                targetTd = tr.children[Array.from(tr.children).indexOf(targetTd) + delta];
            }
        }
    };

    const renderCountryCell = ({
        tableKey,
        rowData,
        rowKey,
        field,
        onCommit,
    }) => {
        if (!isCountryEditorOpen(tableKey, rowKey)) {
            return (
                <div
                    onClick={() => openCountryEditor(tableKey, rowKey)}
                    style={{
                        width: "100%",
                        minHeight: "1.7rem",
                        display: "flex",
                        alignItems: "center",
                        cursor: "pointer",
                    }}
                    title="Click to edit country"
                >
                    {getCountryDisplayText(rowData[field])}
                </div>
            );
        }

        return (
            <Dropdown
                autoFocus
                style={{ width: "9rem" }}
                value={getCountryCode(rowData[field])}
                onChange={(e) => {
                    onCommit(e.value);
                    closeCountryEditor();
                }}
                onHide={closeCountryEditor}
                options={datasETC_KCD_NATION}
                optionLabel="label"
                optionValue="value"
                itemTemplate={countryItemTemplate}
                valueTemplate={createCountryValueTemplate(rowData[field])}
                placeholder="Select"
                filter
                filterPlaceholder="Search country"
            />
        );
    };

    const inlineBodyTBL_KSV_PROD_MEM = (rowData, field) => {
        if (field === "COUNTRY") {
            return renderCountryCell({
                tableKey: "TBL_KSV_PROD_MEM",
                rowData,
                rowKey:
                    rowData.__ROW_KEY ||
                    rowData.id ||
                    `${rowData.PROD_CD || ""}_${rowData.ORDER_CD || ""}_${rowData.ORDER_MRP_SEQ || ""}_${rowData.MATL_CD || ""}_${rowData.USE_SIZE || ""}`,
                field,
                onCommit: (newValue) =>
                    onCellEditCompleteTBL_KSV_PROD_MEM({
                        rowData,
                        newValue,
                        field,
                        preventDefault: () => {},
                    }),
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

            if (event.key !== "Enter") return;
            event.preventDefault();
            event.target.dataset.skipBlurCommit = "1";
            onCellEditCompleteTBL_KSV_PROD_MEM({ rowData, newValue: event.target.value, field, preventDefault: () => {} });
            const td = event.target.closest("td");
            const tr = td?.closest("tr");
            const nextTr = tr?.nextElementSibling;
            const nextInput = nextTr
                ? nextTr.children[Array.from(tr.children).indexOf(td)]?.querySelector("input")
                : null;
            if (nextInput) nextInput.focus();
            else event.target.blur();
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
                key={`${rowData.__ROW_KEY || rowData.SEQ || rowData.id || ""}_${field}_${rowData[field] ?? ""}`}
                type="text"
                style={{ width: "100%", border: "none", backgroundColor: "#e8f5e9", ...(inputColor ? { color: inputColor } : {}) }}
                className="p-inputtext p-component"
                defaultValue={rowData[field]}
                onFocus={(e) => {
                    e.target.select();
                }}
                onKeyDown={(e) => { commitValue(e); moveFocusByArrow(e); }}
                onBlur={commitValue}
            />
        );
    };

    const inlineBodyTBL_KSV_PROD_MEM1 = (rowData, field) => {
        if (field === "COUNTRY") {
            return renderCountryCell({
                tableKey: "TBL_KSV_PROD_MEM1",
                rowData,
                rowKey: rowData.id,
                field,
                onCommit: (newValue) =>
                    onCellEditCompleteTBL_KSV_PROD_MEM1({
                        rowData,
                        newValue,
                        field,
                        preventDefault: () => {},
                    }),
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

            if (event.key !== "Enter") return;
            event.preventDefault();
            event.target.dataset.skipBlurCommit = "1";
            onCellEditCompleteTBL_KSV_PROD_MEM1({ rowData, newValue: event.target.value, field, preventDefault: () => {} });
            const td = event.target.closest("td");
            const tr = td?.closest("tr");
            const nextTr = tr?.nextElementSibling;
            const nextInput = nextTr
                ? nextTr.children[Array.from(tr.children).indexOf(td)]?.querySelector("input")
                : null;
            if (nextInput) nextInput.focus();
            else event.target.blur();
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

    const inlineBodyTBL_KSV_PROD_MST_S0306 = (rowData, field) => {
        const normalizeSizeLossValue = (rawValue) => {
            const value = String(rawValue ?? "").trim();
            if (value === "") return "";

            const tSign = value.startsWith("-") ? "-" : "";
            const unsigned = tSign ? value.substring(1) : value;
            const parts = unsigned.split(".");
            const integerPart = (parts[0] || "0").replace(/^0+(?=\d)/, "");

            if (parts.length > 1) {
                return `${tSign}${integerPart}.${parts.slice(1).join(".")}`;
            }
            return `${tSign}${integerPart}`;
        };

        const commitValue = (event) => {
            if (event.type === "blur") {
                const normalizedValue = normalizeSizeLossValue(event.target.value);
                event.target.value = normalizedValue;
                onCellEditCompleteTBL_KSV_PROD_MST({ rowData, newValue: normalizedValue, field, originalEvent: event });
                return;
            }

            if (event.key !== "Enter") return;
            event.preventDefault();
            const td = event.target.closest("td");
            const tr = td?.closest("tr");
            const nextTr = tr?.nextElementSibling;
            const nextInput = nextTr
                ? nextTr.children[Array.from(tr.children).indexOf(td)]?.querySelector("input")
                : null;
            if (nextInput) nextInput.focus();
            else event.target.blur();
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

    const dropboxEditor1 = (options) => {
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
        }
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
    };

    return (
        <div
            className="af-div-main S0306_MRP_BY_ORDER"
            style={{
                paddingLeft: "5px",
                width: "100%",
                minWidth: 0,
                maxWidth: "100vw",
                boxSizing: "border-box",
            }}
        >
            {/* 1단 */}
            <div
                className="af-div-first"
                style={{
                    width: "100%",
                    height: "11rem",
                    marginRight: "0px",
                }}
            >
                <div
                    className="af-div-first"
                    style={{
                        width: "61rem",
                        height: "3rem",
                        display: "flex",
                        flexDirection: "row",
                        gap: "5px",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            gap: "5px",
                        }}
                    >
                        <p className="af-span-p" style={{ width: "4rem" }}>Order#</p>
                        <InputText
                            key={`order-cd-${qryKcdStyleInputVersion}`}
                            style={{ width: "10rem" }}
                            id="id_ORDER_CD"
                            autoComplete="off"
                            defaultValue={dataQRY_KCD_STYLE.ORDER_CD}
                            onKeyDown={handleSearchInputKeyDown}
                            onChange={(e) =>
                                onInputChangeQRY_KCD_STYLE_ORDER_CD(
                                    e,
                                    "ORDER_CD",
                                )
                            }
                        />

                        <p className="af-span-p" style={{ width: "4rem" }}>Style</p>
                        <InputText
                            key={`style-cd-${qryKcdStyleInputVersion}`}
                            style={{ width: "25rem" }}
                            id="id_STYLE_CD"
                            autoComplete="off"
                            defaultValue={dataQRY_KCD_STYLE.STYLE_CD}
                            onKeyDown={handleSearchInputKeyDown}
                            onChange={(e) =>
                                onInputChangeQRY_KCD_STYLE_STYLE_CD(
                                    e,
                                    "STYLE_CD",
                                )
                            }
                        />
                    </div>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            gap: "5px",
                        }}
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
                            style={{ width: "7rem" }}
                            className="p-button-text"
                            onClick={search_LIST_1}
                        />

                        <Button
                            label={<span>Reset</span>}
                            style={{ width: "7rem" }}
                            className="p-button-text"
                            onClick={processReset}
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
                            style={{ width: "55%", height: "10rem" }}
                        >
                            <AFDataTable preventUnrelatedRerender
                                ref={dt_TBL_KSV_ORDER_MST}
                                size="small"
                                value={datasTBL_KSV_ORDER_MST}
                                loading={loadingTBL_KSV_ORDER_MST}
                                tableStyle={{ tableLayout: "fixed" }}
                                metaKeySelection={false}
                                resizableColumns
                                columnResizeMode="expand"
                                showGridlines
                                selectionMode="checkbox"
                                selection={selectedTBL_KSV_ORDER_MST}
                                onSelectionChange={(e) => {
                                    setSelectedTBL_KSV_ORDER_MST(e.value || []);
                                }}
                                onRowClick={onRowClickTBL_KSV_ORDER_MST}
                                dataKey="id"
                                className="fixed-table"
                                virtualScrollerOptions={{ itemSize: 20 }}
                                emptyMessage=" "
                                responsiveLayout="scroll"
                                scrollable
                                scrollHeight="16rem"
                            >
                                <AFColumn
                                    field="PO_CD"
                                    headerClassName="t-header"
                                    header="PO#"
                                    style={{ width: "3rem", flexBasis: "auto" }}
                                ></AFColumn>
                                <AFColumn
                                    field="ORDER_CD"
                                    headerClassName="t-header"
                                    header="Order#"
                                    style={{ width: "3rem", flexBasis: "auto" }}
                                ></AFColumn>
                                <AFColumn
                                    field="STYLE_NAME"
                                    headerClassName="t-header"
                                    header="Style"
                                    style={{ width: "70rem", flexBasis: "auto" }}
                                ></AFColumn>
                            </AFDataTable>
                        </div>

                        <div
                            className="af-div-first"
                            style={{ width: "45%", height: "10rem" }}
                        >
                            <AFDataTable 
                                ref={dt_TBL_KSV_PROD_MST}
                                editMode="cell"
                                size="small"
                                value={datasTBL_KSV_PROD_MST}
                                loading={loadingTBL_KSV_PROD_MST}
                                metaKeySelection={false}
                                tableStyle={{ tableLayout: "fixed" }}
                                resizableColumns
                                columnResizeMode="expand"
                                showGridlines
                                selectionMode="checkbox"
                                selection={selectedTBL_KSV_PROD_MST}
                                onSelectionChange={(e) => {
                                    if (!e.value || e.value.length === 0) return;
                                    const tActiveRow = e.value[e.value.length - 1];
                                    selectedTBL_KSV_PROD_MSTRef.current =
                                        tActiveRow ? [tActiveRow] : [];
                                    setSelectedTBL_KSV_PROD_MST(e.value);
                                    onRowClick1TBL_KSV_PROD_MST(tActiveRow || e.value);
                                }}
                                onRowClick={onRowClickTBL_KSV_PROD_MST}
                                dataKey="PROD_CD"
                                className="fixed-table"
                                virtualScrollerOptions={{ itemSize: 20 }}
                                emptyMessage=" "
                                responsiveLayout="scroll"
                                scrollable
                                scrollHeight="16rem"
                            >
                                <AFColumn
                                    field="COLOR"
                                    headerClassName="t-header"
                                    header="COLOR"
                                    style={{ width: "12rem", flexBasis: "auto" }}
                                ></AFColumn>
                                <AFColumn
                                    field="SIZE_LOSS"
                                    headerClassName="t-header"
                                    header="SL"
                                    style={{ width: "3rem", flexBasis: "auto" }}
                                    body={(rowData) => inlineBodyTBL_KSV_PROD_MST_S0306(rowData, "SIZE_LOSS")}
                                    bodyStyle={{ backgroundColor: "#e8f5e9" }}
                                ></AFColumn>
                                <AFColumn
                                    field="PROD_CD"
                                    headerClassName="t-header"
                                    header="Prod#"
                                    style={{ width: "6rem", flexBasis: "auto" }}
                                ></AFColumn>
                                <AFColumn
                                    field="ORDER_MRP_SEQ"
                                    headerClassName="t-header"
                                    header="SEQ"
                                    style={{ width: "3rem", flexBasis: "auto" }}
                                ></AFColumn>
                                <AFColumn field="ORDER_QTY" headerClassName="t-header" header="OrdQty" style={{ width: "5rem" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.formatNumber(rowData.ORDER_QTY)}   ></AFColumn>
                            </AFDataTable>
                        </div>
                    </div>

                    <div
                        className="af-div-second"
                        style={{
                            width: "40rem",
                            minWidth: "40rem",
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
                                style={{ width: "9rem" }}
                                className="p-button-text orange"
                                onClick={popup_STYLE_SEARCH}
                            />
                            <Button
                                label="Reset"
                                style={{ width: "7rem" }}
                                className="p-button-text"
                                onClick={processReset}
                            />
                            <Button
                                label="SL Update"
                                style={{ width: "7rem" }}
                                className="p-button-text"
                                onClick={updateMaterial_size_loss}
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
                                label="Add Seq"
                                style={{ width: "7rem", flexShrink: 0 }}
                                className="p-button-text orange"
                                onClick={updateMaterial_add_seq}
                            />

                            <Button
                                label="Check Changes"
                                style={{ width: "7rem", flexShrink: 0 }}
                                className="p-button-text"
                                onClick={search_QRY_CHECK}
                            />

                            <Button
                                label="Del Last Seq"
                                style={{ width: "7rem", flexShrink: 0 }}
                                className="p-button-text"
                                onClick={updateMaterial_del_last_seq}
                            />
                            <p className="af-span-p" style={{ width: "4rem", paddingTop:'3px' }}>Ord SEQ</p>
                            <Dropdown
                                style={{ width: "6rem", textAlign: "center" }}
                                id="id_BOX_UNIT"
                                value={dataQRY_KCD_STYLE2_ORDER_MRP_SEQ}
                                onChange={(e) =>
                                    onDropdownChangeQRY_KCD_STYLE2_ORDER_MRP_SEQ(
                                        e,
                                        "ORDER_MRP_SEQ",
                                    )
                                }
                                options={datasQRY_KCD_STYLE2_ORDER_MRP_SEQ}
                                optionLabel="ORDER_MRP_SEQ"
                                placeholder=""
                                editable
                                filter
                            ></Dropdown>
                        </div>
                    </div>
                </div>
            </div>

            <div
                className="af-div-first"
                style={{
                    width: "calc(100% - 1.8rem)",
                    height: "calc( ( 100vh - 20rem ) / 2 )",
                    marginTop: "35px",
                    display: "flex",
                }}
            >
                <div ref={prodMemContainerRef} style={{ flex: 1, minWidth: 0, minHeight: 0, display: "flex", flexDirection: "column" }}>
                    <AFDataTable 
                        ref={dt_TBL_KSV_PROD_MEM}
                        renderDependency={countryEditorRenderDependency}
                        editMode="cell"
                        size="small"
                        value={datasTBL_KSV_PROD_MEM}
                        tableStyle={{ tableLayout: "fixed" }}
                        style={{ flex: 1, minHeight: 0 }}
                        resizableColumns
                        columnResizeMode="expand"
                        loading={loadingTBL_KSV_PROD_MEM}
                        showGridlines
                        onRowClick={onRowClickTBL_KSV_PROD_MEM}
                        onCellDoubleClick={onCellDoubleClickTBL_KSV_PROD_MEM}
                        selectionMode="checkbox"
                        autoCheckboxOnRowClick={false}
                        selection={selectedTBL_KSV_PROD_MEM}
                        onSelectionChange={(e) => {
                            if (patchingProdMemByUsageRef.current) return;
                            clearQRY_KCD_STYLE2_VENDOR_CD1();
                            setSelectedTBL_KSV_PROD_MEM(e.value || []);
                        }}
                        dataKey="__ROW_KEY"
                        onRowDoubleClick={onRowDoubleClickTBL_KSV_PROD_MEM}
                        className="datatable-responsive"
                        emptyMessage=" " //header={headerTBL_KSV_PROD_MEM}
                        responsiveLayout="scroll"
                        rememberScroll={false}
                        rowClassName={rowClassNameTBL_KSV_PROD_MEM}
                        disableSort={true}
                        scrollable
                        scrollHeight={prodMemScrollHeight}
                    >
                        <AFColumn selectionMode="multiple" field="__checkbox__" reorderable={false} headerClassName="t-header" headerStyle={{ width: "3rem" }} ></AFColumn>
                        <AFColumn field="MATL_NAME" headerClassName="t-header" header="MATL NAME" style={{ width: "13rem", flexBasis: "auto" }} ></AFColumn>
                        <AFColumn field="MATL_CD" headerClassName="t-header" header="MATL#" style={{ width: "5rem", flexBasis: "auto" }} className="orange" body={bodyMatlCdTBL_KSV_PROD_MEM} ></AFColumn>
                        <AFColumn forceWidth field="COLOR" headerClassName="t-header" header="COLOR" style={{ width: "8rem", flexBasis: "auto" }} ></AFColumn>
                        <AFColumn forceWidth field="SPEC" headerClassName="t-header" header="SPEC" style={{ width: "10rem", flexBasis: "auto" }} className="orange" body={bodySpecTBL_KSV_PROD_MEM} ></AFColumn>
                        <AFColumn field="SALES_MATL_PRICE" headerClassName="t-header" header="S.Price" style={{ width: "4rem" }} body={bodySalesMatlPriceTBL_KSV_PROD_MEM} bodyStyle={{ textAlign: "right" }} ></AFColumn>
                        <AFColumn field="MATL_PRICE" headerClassName="t-header" header="M.Price" style={{ width: "4rem" }} body={bodyMatlPriceTBL_KSV_PROD_MEM} bodyStyle={{ textAlign: "right" }} ></AFColumn>
                        <AFColumn field="CURR_CD" headerClassName="t-header" header="Curr" style={{ width: "4rem" }} ></AFColumn>
                        <AFColumn field="UNIT" headerClassName="t-header" header="UNIT" style={{ width: "4rem", flexBasis: "auto" }} ></AFColumn>
                        <AFColumn field="ADD_LOSS" headerClassName="t-header" header="Add Loss" style={{ width: "4rem", flexBasis: "auto" }} ></AFColumn>
                        <AFColumn field="USE_SIZE" headerClassName="t-header" header="USE SIZE" style={{ width: "5rem", flexBasis: "auto", color: "green", }} body={(rowData) => inlineBodyTBL_KSV_PROD_MEM(rowData, "USE_SIZE")} bodyStyle={{ backgroundColor: "#e8f5e9" }} ></AFColumn>
                        <AFColumn field="REMARK" headerClassName="t-header" header="Usage" style={{ width: "26rem", flexBasis: "auto", color: "green", }} body={(rowData) => inlineBodyTBL_KSV_PROD_MEM(rowData, "REMARK")} bodyStyle={{ backgroundColor: "#e8f5e9" }} ></AFColumn>
                        <AFColumn field="COUNTRY" headerClassName="t-header" header="Country" style={{ width: "10rem", flexBasis: "auto", color: "green", }} body={(rowData) => inlineBodyTBL_KSV_PROD_MEM(rowData, "COUNTRY")} bodyStyle={{ backgroundColor: "#e8f5e9" }} ></AFColumn>
                        <AFColumn field="STD_NET" headerClassName="t-header" header="Net(S)" style={{ width: "5rem", color: "green" }} body={(rowData) => inlineBodyTBL_KSV_PROD_MEM(rowData, "STD_NET")} bodyStyle={{ textAlign: "right", backgroundColor: "#e8f5e9" }} ></AFColumn>
                        <AFColumn field="STD_LOSS" headerClassName="t-header" header="Loss(S)" style={{ width: "5rem", color: "green" }} body={(rowData) => inlineBodyTBL_KSV_PROD_MEM(rowData, "STD_LOSS")} bodyStyle={{ textAlign: "right", backgroundColor: "#e8f5e9" }} ></AFColumn>
                        <AFColumn field="NET" headerClassName="t-header" header="NET" style={{ width: "5rem", color: "green" }} body={(rowData) => inlineBodyTBL_KSV_PROD_MEM(rowData, "NET")} bodyStyle={{ textAlign: "right", backgroundColor: "#e8f5e9" }} ></AFColumn>
                        <AFColumn field="LOSS" headerClassName="t-header" header="LOSS" style={{ width: "5rem", color: "green" }} body={(rowData) => inlineBodyTBL_KSV_PROD_MEM(rowData, "LOSS")} bodyStyle={{ textAlign: "right", backgroundColor: "#e8f5e9" }} ></AFColumn>
                        <AFColumn field="GROSS" headerClassName="t-header" header="GROSS" style={{ width: "5rem" }} bodyStyle={{ textAlign: "right" }} body={bodyGrossTBL_KSV_PROD_MEM} ></AFColumn>
                        <AFColumn field="ORDER_QTY" headerClassName="t-header" header="OrdQty" style={{ width: "5rem" }} bodyStyle={{ textAlign: "right" }} className="text-right" body={bodyOrderQtyTBL_KSV_PROD_MEM} ></AFColumn>
                        <AFColumn field="PO_QTY" headerClassName="t-header" header="PoQty" style={{ width: "5rem" }} bodyStyle={{ textAlign: "right" }} className="text-right" body={bodyPoQtyTBL_KSV_PROD_MEM} ></AFColumn>
                        <AFColumn field="VENDOR_NAME" headerClassName="t-header" header="Supplier" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                        <AFColumn field="DL_FLAG" headerClassName="t-header" header="DL" style={{ width: "2rem", flexBasis: "auto" }} ></AFColumn>
                        <AFColumn field="SEQ" headerClassName="t-header" header="#" style={{ width: "2.5rem" }} ></AFColumn>
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
                    margin: "5px 5px 0 0px",
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
                                    key={`matl-name-${matlSearchInputVersion}`}
                                    style={{ width: "100%" }}
                                    defaultValue={dataQRY_KCD_MATL_MST_MATL_NAME}
                                    onKeyDown={handleMatlSearchInputKeyDown}
                                    onChange={(e) =>
                                        onInputChangeQRY_KCD_MATL_MST_MATL_NAME(
                                            e,
                                            "MATL_NAME",
                                        )
                                    }
                                />
                            </div>
                            <div style={{ flex: "0.7 1 0", minWidth: 0, display: "flex", alignItems: "center", gap: "6px" }}>
                                <p style={{ width: "2.7rem", margin: 0, textAlign: "right", flexShrink: 0 }}>Color</p>
                                <InputText
                                    key={`matl-color-${matlSearchInputVersion}`}
                                    style={{ width: "100%" }}
                                    defaultValue={dataQRY_KCD_MATL_MST_COLOR}
                                    onKeyDown={handleMatlSearchInputKeyDown}
                                    onChange={(e) =>
                                        onInputChangeQRY_KCD_MATL_MST_COLOR(
                                            e,
                                            "COLOR",
                                        )
                                    }
                                />
                            </div>
                            <div style={{ flex: "0.7 1 0", minWidth: 0, display: "flex", alignItems: "center", gap: "6px" }}>
                                <p style={{ width: "3.2rem", margin: 0, textAlign: "right", flexShrink: 0 }}>Matl#</p>
                                <InputText
                                    key={`matl-cd-${matlSearchInputVersion}`}
                                    style={{ width: "100%" }}
                                    defaultValue={dataQRY_KCD_MATL_MST_MATL_CD}
                                    onKeyDown={handleMatlSearchInputKeyDown}
                                    onChange={(e) =>
                                        onInputChangeQRY_KCD_MATL_MST_MATL_CD(
                                            e,
                                            "MATL_CD",
                                        )
                                    }
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
                                    key={`matl-spec-${matlSearchInputVersion}`}
                                    style={{ width: "100%" }}
                                    defaultValue={dataQRY_KCD_MATL_MST_SPEC}
                                    onKeyDown={handleMatlSearchInputKeyDown}
                                    onChange={(e) =>
                                        onInputChangeQRY_KCD_MATL_MST_SPEC(
                                            e,
                                            "SPEC",
                                        )
                                    }
                                />
                            </div>
                            <div style={{ flex: "0.3 1 0", minWidth: 0, display: "flex", alignItems: "center", gap: "6px" }}>
                                <p style={{ width: "4.1rem", margin: 0, textAlign: "right", flexShrink: 0 }}>Supplier</p>
                                <InputText
                                    key={`matl-vendor-${matlSearchInputVersion}`}
                                    style={{ width: "100%" }}
                                    defaultValue={dataQRY_KCD_MATL_MST_VENDOR_NAME}
                                    onKeyDown={handleMatlSearchInputKeyDown}
                                    onChange={(e) =>
                                        onInputChangeQRY_KCD_MATL_MST_VENDOR_NAME(
                                            e,
                                            "VENDOR_NAME",
                                        )
                                    }
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
                                    key={`edt-net-${edtKsvProdMemInputVersion}`}
                                    style={{ width: "4rem", marginLeft: "5px" }}
                                    id="id_NET"
                                    defaultValue={dataEDT_KSV_PROD_MEM.NET}
                                    onChange={(e) =>
                                        onInputChangeEDT_KSV_PROD_MEM_NET(e, "NET")
                                    }
                                    onBlur={commitEDT_KSV_PROD_MEM_InputState}
                                />
                            </span>
                            <span className="af-span-3-0" style={{ width: "14rem", flexShrink: 0 }}>
                                <p className="af-span-p" style={{ width: "3rem" }}>SIZE</p>
                                <InputText
                                    key={`edt-use-size-${edtKsvProdMemInputVersion}`}
                                    style={{ width: "10.5rem", marginLeft: "5px" }}
                                    id="id_USE_SIZE_EDIT"
                                    defaultValue={dataEDT_KSV_PROD_MEM.USE_SIZE}
                                    onChange={(e) =>
                                        onInputChangeEDT_KSV_PROD_MEM_USE_SIZE(
                                            e,
                                            "USE_SIZE",
                                        )
                                    }
                                    onBlur={commitEDT_KSV_PROD_MEM_InputState}
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
                                    key={`edt-loss-${edtKsvProdMemInputVersion}`}
                                    style={{ width: "4rem", marginLeft: "5px" }}
                                    id="id_LOSS"
                                    defaultValue={dataEDT_KSV_PROD_MEM.LOSS}
                                    onChange={(e) =>
                                        onInputChangeEDT_KSV_PROD_MEM_LOSS(e, "LOSS")
                                    }
                                    onBlur={commitEDT_KSV_PROD_MEM_InputState}
                                />
                            </span>
                            <span className="af-span-3" style={{ width: "26.3rem", flexShrink: 0 }}>
                                <p className="af-span-p" style={{ width: "3rem" }}>Usage</p>
                                <InputText
                                    key={`edt-remark-${edtKsvProdMemInputVersion}`}
                                    style={{ width: "22rem", marginLeft: "5px" }}
                                    id="id_REMARK_EDIT"
                                    defaultValue={dataEDT_KSV_PROD_MEM.REMARK}
                                    onChange={(e) =>
                                        onInputChangeEDT_KSV_PROD_MEM_REMARK(
                                            e,
                                            "REMARK",
                                        )
                                    }
                                    onBlur={commitEDT_KSV_PROD_MEM_InputState}
                                />
                            </span>
                            <Button
                                label="Reset"
                                style={{ width: "5rem", flexShrink: 0 }}
                                className="p-button-text"
                                onClick={resetStdFlag}
                            />
                            <Button
                                style={{ width: "8rem", flexShrink: 0, whiteSpace: "nowrap" }}
                                label="Loss Adjust"
                                className="p-button-text"
                                onClick={process_LOSS_ADJUST}
                            />
                        </div>
                    </div>
                </div>
                <div
                    className="af-div-first"
                    style={{
                        width: "100%",
                        height: "calc( ( 100vh - 30rem ) / 2 + 1rem )",
                        display: "flex",
                        paddingBottom: "10px"
                    }}
                >
                    <div
                        className="af-div-second"
                        style={{ width: "calc(100% - 90px)", height: "100%" }}
                    >
                        <AFDataTable 
                            ref={dt_TBL_KCD_MATL_MST}
                            size="small"
                            value={datasTBL_KCD_MATL_MST}
                            tableStyle={{ tableLayout: "fixed" }}
                            // frozenValue={frozenTBL_KCD_MATL_MST}
                            resizableColumns
                            columnResizeMode="expand"
                            metaKeySelection={false}
                            showGridlines
                            selectionMode="checkbox"
                            autoCheckboxOnRowClick={false}
                            selection={selectedTBL_KCD_MATL_MST}
                            onSelectionChange={(e) => {
                                setSelectedTBL_KCD_MATL_MST(e.value);
                                onRowClick1TBL_KCD_MATL_MST(e.value);
                            }}
                            onRowClick={onRowClickTBL_KCD_MATL_MST}
                            dataKey="MATL_CD"
                            className="datatable-responsive"
                            virtualScrollerOptions={{ itemSize: 20 }}
                            emptyMessage=" "
                            //header={headerTBL_KCD_MATL_MST}
                            responsiveLayout="scroll"
                            loading={loadingTBL_KCD_MATL_MST}
                            scrollable
                            scrollHeight="160px"
                        >
                            <AFColumn selectionMode="multiple" field="__checkbox__" reorderable={false} headerClassName="t-header" headerStyle={{ width: "3rem" }} ></AFColumn>
                            <AFColumn field="MATL_CD" headerClassName="t-header" header="Matl#" style={{ width: "7rem" }} ></AFColumn>
                            <AFColumn field="MATL_NAME" headerClassName="t-header" header="Description" style={{ width: "auto" }} ></AFColumn>
                            <AFColumn field="COLOR" headerClassName="t-header" header="Color" style={{ width: "auto" }} ></AFColumn>
                            <AFColumn field="SPEC" headerClassName="t-header" header="Spec" style={{ width: "auto" }} ></AFColumn>
                            <AFColumn field="UNIT" headerClassName="t-header" header="Unit" style={{ width: "4rem" }} ></AFColumn>
                            <AFColumn field="CURR_CD" headerClassName="t-header" header="M.Curr" style={{ width: "4rem" }} ></AFColumn>
                            <AFColumn field="MATL_PRICE" headerClassName="t-header" header="M.Price" style={{ width: "4rem" }} className="text-right" body={(row) => serviceLib.formatNumber(row.MATL_PRICE, 4) } ></AFColumn>
                            <AFColumn field="S_CURR_CD" headerClassName="t-header" header="S.Curr" style={{ width: "4rem" }} ></AFColumn>
                            <AFColumn field="S_MATL_PRICE" headerClassName="t-header" header="S.Price" style={{ width: "4rem" }} className="text-right" body={(row) => serviceLib.formatNumber(row.S_MATL_PRICE, 4) } ></AFColumn>
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
                visible={createDialog1}
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
                                id="id_NET"
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
                                id="id_NET"
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
                                id="id_NET"
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
                                id="id_NET"
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
                    <AFDataTable 
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
                        autoCheckboxOnRowClick={false}
                        selection={selectedTBL_KSV_PROD_MEM1}
                        onSelectionChange={(e) => {
                            setSelectedTBL_KSV_PROD_MEM1(e.value);
                        }}
                        onRowClick={onRowClickTBL_KSV_PROD_MEM1}
                        dataKey="id"
                        className="datatable-responsive"
                        virtualScrollerOptions={{ itemSize: 20 }}
                        emptyMessage=" " //header={headerTBL_KSV_PROD_MEM1}
                        responsiveLayout="scroll"
                        rowClassName={(data) =>
                            isUnusableMaterialRow(data) ? "unusable-row" : ""
                        }
                        scrollable
                        scrollHeight="31rem"
                    >
                        <AFColumn selectionMode="multiple" field="__checkbox__" reorderable={false} headerClassName="t-header" headerStyle={{ width: "3rem" }} ></AFColumn>

                        {/*<AFColumn field="id" headerClassName='t-header' header="#" style={{ width: '8rem'}}></AFColumn>*/}
                        <AFColumn field="PROD_CD_N" headerClassName="t-header" header="Product" style={{ width: "8rem" }} ></AFColumn>
                        <AFColumn field="MATL_NAME" headerClassName="t-header" header="MATL NAME" style={{ width: "13rem" }} ></AFColumn>
                        <AFColumn field="MATL_CD" headerClassName="t-header" header="MATL CD" style={{ width: "5rem" }} body={bodyTemplateTBL_KSV_PROD_MEM_MATL_CD} ></AFColumn>
                        <AFColumn field="COLOR" headerClassName="t-header" header="COLOR" style={{ width: "8rem" }} ></AFColumn>
                        <AFColumn field="SPEC" headerClassName="t-header" header="SPEC" style={{ width: "10rem" }} ></AFColumn>
                        <AFColumn field="MATL_PRICE" headerClassName="t-header" header="Master Price" style={{ width: "4rem" }} body={bodyMatlPriceTBL_KSV_PROD_MEM1} bodyStyle={{ textAlign: "right" }} ></AFColumn>
                        <AFColumn field="CURR_CD" headerClassName="t-header" header="Curr" style={{ width: "4rem" }} ></AFColumn>
                        <AFColumn field="UNIT" headerClassName="t-header" header="UNIT" style={{ width: "4rem" }} ></AFColumn>
                        <AFColumn field="ADD_LOSS" headerClassName="t-header" header="Add Loss" style={{ width: "4rem" }} body={bodyAddLossTBL_KSV_PROD_MEM1} bodyStyle={{ textAlign: "right" }} ></AFColumn>
                        <AFColumn field="USE_SIZE" headerClassName="t-header" header="USE SIZE" style={{ width: "5rem", color: "green" }} body={(rowData) => inlineBodyTBL_KSV_PROD_MEM1(rowData, "USE_SIZE")} bodyStyle={{ backgroundColor: "#e8f5e9" }} ></AFColumn>
                        <AFColumn field="REMARK" headerClassName="t-header" header="Usage" style={{ width: "13rem", color: "green" }} body={(rowData) => inlineBodyTBL_KSV_PROD_MEM1(rowData, "REMARK")} bodyStyle={{ backgroundColor: "#e8f5e9" }} ></AFColumn>
                        <AFColumn field="COUNTRY" headerClassName="t-header" header="Country" style={{ width: "10rem", color: "green" }} body={(rowData) => inlineBodyTBL_KSV_PROD_MEM1(rowData, "COUNTRY")} bodyStyle={{ backgroundColor: "#e8f5e9" }} ></AFColumn>
                        <AFColumn field="STD_NET" headerClassName="t-header" header="Net(S)" style={{ width: "5rem", color: "green" }} body={(rowData) => inlineBodyTBL_KSV_PROD_MEM1(rowData, "STD_NET")} bodyStyle={{ textAlign: "right", backgroundColor: "#e8f5e9" }} ></AFColumn>
                        <AFColumn field="STD_LOSS" headerClassName="t-header" header="Loss(S)" style={{ width: "5rem", color: "green" }} body={(rowData) => inlineBodyTBL_KSV_PROD_MEM1(rowData, "STD_LOSS")} bodyStyle={{ textAlign: "right", backgroundColor: "#e8f5e9" }} ></AFColumn>
                        <AFColumn field="NET" headerClassName="t-header" header="NET" style={{ width: "5rem", color: "green" }} body={(rowData) => inlineBodyTBL_KSV_PROD_MEM1(rowData, "NET")} bodyStyle={{ textAlign: "right", backgroundColor: "#e8f5e9" }} ></AFColumn>
                        <AFColumn field="LOSS" headerClassName="t-header" header="LOSS" style={{ width: "5rem", color: "green" }} body={(rowData) => inlineBodyTBL_KSV_PROD_MEM1(rowData, "LOSS")} bodyStyle={{ textAlign: "right", backgroundColor: "#e8f5e9" }} ></AFColumn>
                        <AFColumn field="GROSS" headerClassName="t-header" header="GROSS" style={{ width: "5rem" }} bodyStyle={{ textAlign: "right" }} ></AFColumn>

                        <AFColumn field="VENDOR_NAME" headerClassName="t-header" header="Supplier" style={{ width: "10rem" }} ></AFColumn>
                    </AFDataTable>
                </div>
            </Dialog>

            <Dialog
                visible={createDialog}
                position="mid-center"
                style={{ width: "122rem", height: "61rem" }}
                header="Before-After Check"
                modal={true}
                className="p-fluid"
                onHide={hideDialog}
            >
                <div
                    className="af-div-first"
                    style={{ width: "120rem", height: "50rem" }}
                >
                    <AFDataTable 
                        ref={dt_TBL_KSV_PROD_MEM2}
                        size="small"
                        value={datasTBL_KSV_PROD_MEM2}
                        tableStyle={{ tableLayout: "fixed" }}
                        resizableColumns
                        columnResizeMode="expand"
                        loading={loadingTBL_KSV_PROD_MEM2}
                        metaKeySelection={false}
                        showGridlines
                        selectionMode="multiple"
                        selection={selectedTBL_KSV_PROD_MEM2}
                        onSelectionChange={(e) => {
                            setSelectedTBL_KSV_PROD_MEM2(e.value);
                        }}
                        onRowClick={onRowClickTBL_KSV_PROD_MEM2}
                        dataKey="id"
                        className="datatable-responsive"
                        virtualScrollerOptions={{ itemSize: 20 }}
                        emptyMessage=" " //header={headerTBL_KSV_PROD_MEM2}
                        responsiveLayout="scroll"
                        scrollable
                        scrollHeight="30rem"
                    >
                        <AFColumn field="ORDER_CD" headerClassName="t-header" header="Order#" style={{ width: "5rem", flexBasis: "auto" }} ></AFColumn>
                        <AFColumn field="PROD_CD" headerClassName="t-header" header="Prod#" style={{ width: "5rem", flexBasis: "auto" }} ></AFColumn>
                        <AFColumn field="MATL_CD" headerClassName="t-header" header="Matl#" style={{ width: "5rem", flexBasis: "auto" }} ></AFColumn>
                        <AFColumn field="MATL_NAME" headerClassName="t-header" header="Desc" style={{ width: "13rem", flexBasis: "auto" }} ></AFColumn>
                        <AFColumn field="COLOR" headerClassName="t-header" header="COLOR" style={{ width: "8rem", flexBasis: "auto" }} ></AFColumn>
                        <AFColumn field="SPEC" headerClassName="t-header" header="SPEC" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                        <AFColumn field="NET" headerClassName="t-header" header="Net" style={{ width: "5rem", flexBasis: "auto" }} ></AFColumn>
                        <AFColumn field="LOSS" headerClassName="t-header" header="Loss" style={{ width: "5rem", flexBasis: "auto" }} ></AFColumn>
                        <AFColumn field="BEF_NET" headerClassName="t-header" header="Bef Net" style={{ width: "5rem", flexBasis: "auto" }} ></AFColumn>
                        <AFColumn field="BEF_LOSS" headerClassName="t-header" header="Bef Loss" style={{ width: "5rem", flexBasis: "auto" }} ></AFColumn>
                    </AFDataTable>
                </div>
            </Dialog>

            <Dialog
                visible={createDialog2}
                position="mid-center"
                style={{ width: "122rem", height: "45rem" }}
                header="30% Over Check"
                modal={true}
                className="p-fluid"
                onHide={hideDialog2}
            >
                <div
                    className="af-div-first"
                    style={{ width: "120.5rem", height: "40rem" }}
                >
                    <AFDataTable 
                        ref={dt_TBL_KSV_PROD_MEM3}
                        editMode="cell"
                        size="small"
                        value={datasTBL_KSV_PROD_MEM3}
                        tableStyle={{ tableLayout: "fixed" }}
                        resizableColumns
                        columnResizeMode="expand"
                        loading={loadingTBL_KSV_PROD_MEM3}
                        metaKeySelection={false}
                        showGridlines
                        selectionMode="multiple"
                        selection={selectedTBL_KSV_PROD_MEM3}
                        onSelectionChange={(e) => {
                            setSelectedTBL_KSV_PROD_MEM3(e.value);
                        }}
                        onRowClick={onRowClickTBL_KSV_PROD_MEM3}
                        dataKey="id"
                        className="datatable-responsive"
                        virtualScrollerOptions={{ itemSize: 20 }}
                        emptyMessage=" " //header={headerTBL_KSV_PROD_MEM3}
                        responsiveLayout="scroll"
                        scrollable
                        scrollHeight="40rem"
                    >
                        <AFColumn field="SEQ" headerClassName="t-header" header="#" style={{ width: "2rem", flexBasis: "auto" }} ></AFColumn>

                        <AFColumn field="DL_FLAG" headerClassName="t-header" header="DL" style={{ width: "2rem", flexBasis: "auto" }} ></AFColumn>
                        {/*<AFColumn field="MATL_TYPE2" headerClassName='t-header' header="M.Type2" style={{ width: '4rem',flexBasis:'auto'}}></AFColumn>*/}
                        <AFColumn field="MATL_NAME" headerClassName="t-header" header="MATL NAME" style={{ width: "17rem", flexBasis: "auto" }} ></AFColumn>
                        <AFColumn field="MATL_CD" headerClassName="t-header" header="Matl#" style={{ width: "5rem", flexBasis: "auto" }} ></AFColumn>
                        <AFColumn field="COLOR" headerClassName="t-header" header="COLOR" style={{ width: "8rem", flexBasis: "auto" }} ></AFColumn>
                        <AFColumn field="SPEC" headerClassName="t-header" header="SPEC" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                        <AFColumn field="MATL_PRICE" headerClassName="t-header" header="Master Price" style={{ width: "4rem", flexBasis: "auto" }} ></AFColumn>
                        <AFColumn field="CURR_CD" headerClassName="t-header" header="Curr" style={{ width: "4rem", flexBasis: "auto" }} ></AFColumn>
                        <AFColumn field="UNIT" headerClassName="t-header" header="UNIT" style={{ width: "4rem", flexBasis: "auto" }} ></AFColumn>
                        <AFColumn field="ADD_LOSS" headerClassName="t-header" header="Add Loss" style={{ width: "4rem", flexBasis: "auto", color: "green", }} ></AFColumn>
                        <AFColumn field="USE_SIZE" headerClassName="t-header" header="USE SIZE" style={{ width: "5rem", flexBasis: "auto", color: "green", }} ></AFColumn>
                        <AFColumn field="REMARK" headerClassName="t-header" header="Usage" style={{ width: "13rem", flexBasis: "auto", color: "green", }} ></AFColumn>
                        <AFColumn field="COUNTRY" headerClassName="t-header" header="Country" style={{ width: "4rem", flexBasis: "auto" }} ></AFColumn>
                        <AFColumn field="STD_NET" headerClassName="t-header" header="Net(S)" style={{ width: "5rem", flexBasis: "auto", color: "green", }} ></AFColumn>
                        <AFColumn field="STD_LOSS" headerClassName="t-header" header="Loss(S)" style={{ width: "5rem", flexBasis: "auto", color: "green", }} ></AFColumn>
                        <AFColumn field="NET" headerClassName="t-header" header="NET" style={{ width: "5rem", flexBasis: "auto", color: "green", }} ></AFColumn>
                        <AFColumn field="LOSS" headerClassName="t-header" header="LOSS" style={{ width: "5rem", flexBasis: "auto", color: "green", }} ></AFColumn>
                        <AFColumn field="GROSS" headerClassName="t-header" header="GROSS" style={{ width: "5rem", flexBasis: "auto" }} ></AFColumn>
                        <AFColumn field="VENDOR_NAME" headerClassName="t-header" header="Supplier" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    </AFDataTable>
                </div>
            </Dialog>

            <datalist id="natList">
                {datasETC_KCD_NATION.map((nat, idx) => (
                    <option value={`${nat.NAT_CD}`}> {nat.NAT_NAME} {nat.NAT_CD}</option>
                ))}
            </datalist>
        </div>
    );
};

const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(S0306_MRP_BY_ORDER, comparisonFn);
