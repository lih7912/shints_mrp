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
    CURR_DATE: "",
    LOCAL_WORD: "",
    BUYER_CD: "",
    STYLE_NAME: "",

    MRP_BY_ORDER: "1",
    MRP_BY_STYLE: "",
    WITHOUT_PRICE: "1",
};

const emptyTBL_KSV_PO_MST = {
    id: 0,
    ORDER_CD: "",
    STYLE_NAME: "",
    TOT_CNT: "",
    SIZE1_CNT: "",
};

const emptyTBL_KSV_PO_MST2 = {
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

const S030513_MRP_LIST = () => {
    const serviceLibRef = useRef(null);
    if (!serviceLibRef.current) {
        serviceLibRef.current = new ServiceLib();
        serviceLibRef.current.loginConfirm();
    }
    const serviceLib = serviceLibRef.current;
    const serviceS030513_MRP_LISTRef = useRef(null);
    if (!serviceS030513_MRP_LISTRef.current) serviceS030513_MRP_LISTRef.current = new ServiceS030513_MRP_LIST();
    const serviceS030513_MRP_LIST = serviceS030513_MRP_LISTRef.current;

    const toast = useRef(null);

    /* splitter 관련 */
    const [styleVal, setStyleVal] = useState({ width: "65vw" });

    const search_QRY_ORDER = (argData) => {
        var tInObj = {};
        const tCurrentQry = { ...dataQRY_KSV_PO_MST };

        if (typeof argData.PO_CD !== "undefined") {
            tInObj.PO_CD = argData.PO_CD;
            tInObj.PO_SEQ = argData.PO_SEQ;
            tInObj.BUYER_CD =
                typeof argData.BUYER_CD !== "undefined"
                    ? argData.BUYER_CD
                    : tCurrentQry.BUYER_CD;
            tInObj.STYLE_NAME =
                typeof argData.STYLE_NAME !== "undefined"
                    ? argData.STYLE_NAME
                    : tCurrentQry.STYLE_NAME;
        } else {
            var tQryObj = { ...tCurrentQry };
            tInObj.PO_CD = tQryObj.PO_CD;
            tInObj.PO_SEQ = tQryObj.PO_SEQ;
            tInObj.BUYER_CD = tQryObj.BUYER_CD;
            tInObj.STYLE_NAME = tQryObj.STYLE_NAME;

            if (!tInObj.PO_CD && !tInObj.BUYER_CD && !tInObj.STYLE_NAME) {
                alert("검색조건을 입력해주세요.<br><br>Please enter search criteria.");
                return;
            }
        }

        setLoadingTBL_KSV_PO_MST(true);
        setSelectedTBL_KSV_PO_MST([]);
        setDatasTBL_KSV_PO_MST([]);
        serviceS030513_MRP_LIST.mgrQuery_QRY_ORDER(tInObj).then((data) => {
            setLoadingTBL_KSV_PO_MST(false);
            if (typeof data.graphQLErrors === "undefined") {
                console.log(data);
                if (data.length > 0) {
                    if (data[0].ORDER_CD.includes("ERROR")) {
                        alert(data[0].ORDER_CD);
                    } else {
                        const mappedData = data.map((item, i) => {
                            return { ...item, id: i + 1 };
                        });
                        setDatasTBL_KSV_PO_MST(mappedData);
                        if (mappedData.length > 0) {
                            const firstRow = mappedData[0];
                            setSelectedTBL_KSV_PO_MST([firstRow]);
                            onRowClickTBL_KSV_PO_MST({ data: firstRow });
                            onRowClick1TBL_KSV_PO_MST(firstRow);
                        }
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

        setLoadingTBL_KSV_PO_MST2(true);
        setDatasTBL_KSV_PO_MST2([]);
        serviceS030513_MRP_LIST
            .mgrQuery_QRY_ORDER_COMBINED(tInObj)
            .then((data) => {
                setLoadingTBL_KSV_PO_MST2(false);
                if (typeof data.graphQLErrors === "undefined") {
                    if (data.length > 0) {
                        if (data[0].ORDER_CD.includes("ERROR")) {
                            alert(data[0].ORDER_CD);
                        } else {
                            setDatasTBL_KSV_PO_MST2(data);
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

    const search_REPORT_MRP_LIST = async (argData) => {
        var tInObj = { ...dataQRY_KSV_PO_MST };

        const buildOrderInfosByPo = async (selectedRows) => {
            const poSeqByPoCd = {};
            const uniquePoCds = [
                ...new Set(
                    selectedRows
                        .map((row) => (row && row.PO_CD ? String(row.PO_CD) : ""))
                        .filter((poCd) => poCd !== ""),
                ),
            ];

            for (const poCd of uniquePoCds) {
                let resolvedPoSeq = "";
                try {
                    const codeData = await serviceS030513_MRP_LIST.mgrQuery_CODE({
                        PO_CD: poCd,
                    });
                    if (
                        typeof codeData.graphQLErrors === "undefined" &&
                        Array.isArray(codeData.PO_SEQ) &&
                        codeData.PO_SEQ.length > 0
                    ) {
                        let maxSeq = codeData.PO_SEQ[0].CD_CODE || "";
                        codeData.PO_SEQ.forEach((seqRow) => {
                            const currVal = parseInt(seqRow.CD_CODE || "0", 10);
                            const maxVal = parseInt(maxSeq || "0", 10);
                            if (currVal > maxVal) maxSeq = seqRow.CD_CODE;
                        });
                        resolvedPoSeq = maxSeq;
                    }
                } catch (e) {
                    console.log("PO_SEQ resolve error", e);
                }
                poSeqByPoCd[poCd] = resolvedPoSeq;
            }

            const orderInfos = selectedRows.map((row) => {
                const poCd = row && row.PO_CD ? String(row.PO_CD) : "";
                const fallbackPoSeq = row && row.PO_SEQ ? String(row.PO_SEQ) : "";
                return {
                    ORDER_CD: row && row.ORDER_CD ? row.ORDER_CD : "",
                    PO_CD: poCd,
                    PO_SEQ: poSeqByPoCd[poCd] || fallbackPoSeq,
                };
            });

            const firstPoCd =
                selectedRows.length > 0 && selectedRows[0].PO_CD
                    ? String(selectedRows[0].PO_CD)
                    : "";
            const firstPoSeq =
                poSeqByPoCd[firstPoCd] ||
                (selectedRows.length > 0 && selectedRows[0].PO_SEQ
                    ? String(selectedRows[0].PO_SEQ)
                    : "");

            return {
                orderInfos,
                firstPoCd,
                firstPoSeq,
            };
        };

        if (tInObj.MRP_BY_ORDER !== "1" && tInObj.MRP_BY_STYLE !== "1") {
            alert("MRP_BY_ORDER, MRP_BY_STYLE중 하나는 선택해야합니다.<br><br>Please select either MRP_BY_ORDER or MRP_BY_STYLE.");
            return;
        }
        if (selectedTBL_KSV_PO_MST.length <= 0) {
            alert("Order가 하나 이상 선택해야합니다.<br><br>Please select at least one Order.");
            return;
        }
        tInObj.ORDER_CDS = [];
        tInObj.ORDER_INFOS = [];
        var tFlag = 0;
        // datasTBL_KSV_PO_MST.forEach((col, i) => {
        selectedTBL_KSV_PO_MST.forEach((col, i) => {
            tInObj.ORDER_CDS.push(col.ORDER_CD);
            if (col.MRP_LIST_FILE !== "") {
                tFlag = 1;
            }
        });
        if (tFlag === 1) {
            if (
                await confirm(
                    "이미 생성된 MRP List가 있습니다. 새로 Mrp List을 생성하시겠습니까?.<br><br>An MRP List already exists. Do you want to create a new MRP List?",
                )
            ) {
                var tArray = [...datasTBL_KSV_PO_MST];
                var tArray1 = [];
                tArray.forEach((col, i) => {
                    var tObj = { ...col };
                    tObj.MRP_LIST_FILE = "";
                    tObj.MRP_LIST_FILE_URL = "";
                    tArray1.push(tObj);
                });
                setDatasTBL_KSV_PO_MST(tArray1);
            } else {
                alert("MRP List항목을 클릭하여 파일을 다운로드 하세요.<br><br>Click the MRP List item to download the file.");
                return;
            }
        }

        const resolvedOrderMeta = await buildOrderInfosByPo(
            selectedTBL_KSV_PO_MST,
        );

        tInObj.PO_CD = resolvedOrderMeta.firstPoCd;
        let targetPoSeq = resolvedOrderMeta.firstPoSeq;

        if (targetPoSeq === "") {
            alert("PO_SEQ가 선택되어야 합니다.<br><br>PO_SEQ must be selected.");
            return;
        }

        tInObj.PO_SEQ = targetPoSeq;
        tInObj.ORDER_INFOS = resolvedOrderMeta.orderInfos;

        console.log("REPORT_MRP_LIST request", {
            WITHOUT_PRICE: tInObj.WITHOUT_PRICE,
            MRP_BY_ORDER: tInObj.MRP_BY_ORDER,
            MRP_BY_STYLE: tInObj.MRP_BY_STYLE,
            ORDER_CDS: tInObj.ORDER_CDS,
            PO_CD: tInObj.PO_CD,
            PO_SEQ: tInObj.PO_SEQ,
        });

        // 부모 프레임에 메시지 보내기
        /*
        window.parent.postMessage(
            "WorkingMrp",
            `https://${window.location.hostname}:3211`,
        );

        window.addEventListener("message", function (event) {
            console.log("메시지 수신:", event.origin, event.data);
            if (event.origin === `https://${window.location.hostname}:3211`) {
                if (event.data === "ReloadData") {
                    console.log("✅ ReloadData 수신됨!");

                    console.log(tInObj);
                    search_QRY_ORDER(tInObj);
                }
            }
        });
        */

        setLoadingTBL_KSV_PO_MST(true);

        serviceS030513_MRP_LIST
            .mgrQuery_REPORT_MRP_LIST(tInObj)
            .then((data) => {
                setLoadingTBL_KSV_PO_MST(false);
                if (typeof data.graphQLErrors === "undefined") {
                    if (data.length > 0) {
                        if (
                            typeof data[0].CODE === "string" &&
                            data[0].CODE.includes("ERROR")
                        ) {
                            alert(data[0].CODE);
                            return;
                        }

                        if (
                            typeof data[0].CODE === "string" &&
                            data[0].CODE.startsWith("SUCCESS:BATCH_FILES:")
                        ) {
                            const encoded = data[0].CODE.replace(
                                "SUCCESS:BATCH_FILES:",
                                "",
                            );
                            try {
                                const decoded = atob(encoded);
                                const batchFiles = JSON.parse(decoded);
                                if (Array.isArray(batchFiles)) {
                                    downloadBatchFilesSequentially(batchFiles);
                                }
                            } catch (e) {
                                console.log("BATCH_FILES parse error", e);
                            }
                        }
                        if (data[0].CODE.includes("SUCC")) {
                            // downloadFile(data[0].CODE.split('?')[2].toString(), data[0].CODE.split('?')[1].toString());
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
                    alert("현재 작업중입니다. 잠시후에 다시 조회하세요.<br><br>A process is currently running. Please try again shortly.");
                    // console.log("ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " + JSON.stringify(data.graphQLErrors));
                }
            });
    };

    const search_REPORT_MRP_LIST2 = async (argData) => {
        var tInObj = { ...dataQRY_KSV_PO_MST };

        const buildOrderInfosByPo = async (selectedRows) => {
            const poSeqByPoCd = {};
            const uniquePoCds = [
                ...new Set(
                    selectedRows
                        .map((row) => (row && row.PO_CD ? String(row.PO_CD) : ""))
                        .filter((poCd) => poCd !== ""),
                ),
            ];

            for (const poCd of uniquePoCds) {
                let resolvedPoSeq = "";
                try {
                    const codeData = await serviceS030513_MRP_LIST.mgrQuery_CODE({
                        PO_CD: poCd,
                    });
                    if (
                        typeof codeData.graphQLErrors === "undefined" &&
                        Array.isArray(codeData.PO_SEQ) &&
                        codeData.PO_SEQ.length > 0
                    ) {
                        let maxSeq = codeData.PO_SEQ[0].CD_CODE || "";
                        codeData.PO_SEQ.forEach((seqRow) => {
                            const currVal = parseInt(seqRow.CD_CODE || "0", 10);
                            const maxVal = parseInt(maxSeq || "0", 10);
                            if (currVal > maxVal) maxSeq = seqRow.CD_CODE;
                        });
                        resolvedPoSeq = maxSeq;
                    }
                } catch (e) {
                    console.log("PO_SEQ resolve error", e);
                }
                poSeqByPoCd[poCd] = resolvedPoSeq;
            }

            const orderInfos = selectedRows.map((row) => {
                const poCd = row && row.PO_CD ? String(row.PO_CD) : "";
                const fallbackPoSeq = row && row.PO_SEQ ? String(row.PO_SEQ) : "";
                return {
                    ORDER_CD: row && row.ORDER_CD ? row.ORDER_CD : "",
                    PO_CD: poCd,
                    PO_SEQ: poSeqByPoCd[poCd] || fallbackPoSeq,
                };
            });

            const firstPoCd =
                selectedRows.length > 0 && selectedRows[0].PO_CD
                    ? String(selectedRows[0].PO_CD)
                    : "";
            const firstPoSeq =
                poSeqByPoCd[firstPoCd] ||
                (selectedRows.length > 0 && selectedRows[0].PO_SEQ
                    ? String(selectedRows[0].PO_SEQ)
                    : "");

            return {
                orderInfos,
                firstPoCd,
                firstPoSeq,
            };
        };

        if (tInObj.MRP_BY_ORDER !== "1" && tInObj.MRP_BY_STYLE !== "1") {
            alert("MRP_BY_ORDER, MRP_BY_STYLE중 하나는 선택해야합니다.<br><br>Please select either MRP_BY_ORDER or MRP_BY_STYLE.");
            return;
        }
        if (selectedTBL_KSV_PO_MST.length <= 0) {
            alert("Order가 하나 이상 선택해야합니다.<br><br>Please select at least one Order.");
            return;
        }

        tInObj.ORDER_CDS = [];
        tInObj.ORDER_INFOS = [];
        var tFlag = 0;
        // datasTBL_KSV_PO_MST.forEach((col, i) => {
        selectedTBL_KSV_PO_MST.forEach((col, i) => {
            tInObj.ORDER_CDS.push(col.ORDER_CD);
            if (col.MRP_LIST2_FILE !== "") {
                tFlag = 1;
            }
        });
        const resolvedOrderMeta = await buildOrderInfosByPo(
            selectedTBL_KSV_PO_MST,
        );

        tInObj.PO_CD = resolvedOrderMeta.firstPoCd;
        tInObj.PO_SEQ = resolvedOrderMeta.firstPoSeq;
        tInObj.ORDER_INFOS = resolvedOrderMeta.orderInfos;

        if (tFlag === 1) {
            if (
                await confirm(
                    "이미 생성된 MRP List2가 있습니다. 새로 Mrp List2을 생성하시겠습니까?<br><br>An MRP List2 already exists. Do you want to create a new MRP List2?",
                )
            ) {
                var tArray = [...datasTBL_KSV_PO_MST];
                var tArray1 = [];
                tArray.forEach((col, i) => {
                    var tObj = { ...col };
                    tObj.MRP_LIST2_FILE = "";
                    tObj.MRP_LIST2_FILE_URL = "";
                    tArray1.push(tObj);
                });
                setDatasTBL_KSV_PO_MST(tArray1);
            } else {
                alert("MRP List2항목을 클릭하여 파일을 다운로드 하세요.<br><br>Click the MRP List2 item to download the file.");
                return;
            }
        }

        tInObj.PO_CD = selectedTBL_KSV_PO_MST[0].PO_CD;

        // 부모 프레임에 메시지 보내기
        /*
        window.parent.postMessage(
            "WorkingMrp",
            `https://${window.location.hostname}:3211`,
        );
        */

        console.log("REPORT_MRP_LIST2 request", {
            WITHOUT_PRICE: tInObj.WITHOUT_PRICE,
            MRP_BY_ORDER: tInObj.MRP_BY_ORDER,
            MRP_BY_STYLE: tInObj.MRP_BY_STYLE,
            ORDER_CDS: tInObj.ORDER_CDS,
            PO_CD: tInObj.PO_CD,
            PO_SEQ: tInObj.PO_SEQ,
        });

        setLoadingTBL_KSV_PO_MST(true);
        serviceS030513_MRP_LIST
            .mgrQuery_REPORT_MRP_LIST2(tInObj)
            .then((data) => {
                setLoadingTBL_KSV_PO_MST(false);
                if (typeof data.graphQLErrors === "undefined") {
                    if (data.length > 0) {
                        alert(data[0].CODE);
                        if (data[0].CODE.includes("SUCC")) {
                            // downloadFile(data[0].CODE.split('?')[2].toString(), data[0].CODE.split('?')[1].toString());
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
                    alert("현재 작업중입니다. 잠시후에 다시 조회하세요.<br><br>A process is currently running. Please try again shortly.");
                    // console.log("ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " + JSON.stringify(data.graphQLErrors));
                }
            });
    };

    const search_REPORT_MRP_LIST3 = async (argData) => {
        var tInObj = { ...dataQRY_KSV_PO_MST };

        const buildOrderInfosByPo = async (selectedRows) => {
            const poSeqByPoCd = {};
            const uniquePoCds = [
                ...new Set(
                    selectedRows
                        .map((row) => (row && row.PO_CD ? String(row.PO_CD) : ""))
                        .filter((poCd) => poCd !== ""),
                ),
            ];

            for (const poCd of uniquePoCds) {
                let resolvedPoSeq = "";
                try {
                    const codeData = await serviceS030513_MRP_LIST.mgrQuery_CODE({
                        PO_CD: poCd,
                    });
                    if (
                        typeof codeData.graphQLErrors === "undefined" &&
                        Array.isArray(codeData.PO_SEQ) &&
                        codeData.PO_SEQ.length > 0
                    ) {
                        let maxSeq = codeData.PO_SEQ[0].CD_CODE || "";
                        codeData.PO_SEQ.forEach((seqRow) => {
                            const currVal = parseInt(seqRow.CD_CODE || "0", 10);
                            const maxVal = parseInt(maxSeq || "0", 10);
                            if (currVal > maxVal) maxSeq = seqRow.CD_CODE;
                        });
                        resolvedPoSeq = maxSeq;
                    }
                } catch (e) {
                    console.log("PO_SEQ resolve error", e);
                }
                poSeqByPoCd[poCd] = resolvedPoSeq;
            }

            const orderInfos = selectedRows.map((row) => {
                const poCd = row && row.PO_CD ? String(row.PO_CD) : "";
                const fallbackPoSeq = row && row.PO_SEQ ? String(row.PO_SEQ) : "";
                return {
                    ORDER_CD: row && row.ORDER_CD ? row.ORDER_CD : "",
                    PO_CD: poCd,
                    PO_SEQ: poSeqByPoCd[poCd] || fallbackPoSeq,
                };
            });

            const firstPoCd =
                selectedRows.length > 0 && selectedRows[0].PO_CD
                    ? String(selectedRows[0].PO_CD)
                    : "";
            const firstPoSeq =
                poSeqByPoCd[firstPoCd] ||
                (selectedRows.length > 0 && selectedRows[0].PO_SEQ
                    ? String(selectedRows[0].PO_SEQ)
                    : "");

            return {
                orderInfos,
                firstPoCd,
                firstPoSeq,
            };
        };

        if (tInObj.MRP_BY_ORDER !== "1" && tInObj.MRP_BY_STYLE !== "1") {
            alert("MRP_BY_ORDER, MRP_BY_STYLE중 하나는 선택해야합니다.<br><br>Please select either MRP_BY_ORDER or MRP_BY_STYLE.");
            return;
        }
        if (selectedTBL_KSV_PO_MST.length <= 0) {
            alert("Order가 하나 이상 선택해야합니다.<br><br>Please select at least one Order.");
            return;
        }

        tInObj.ORDER_CDS = [];
        tInObj.ORDER_INFOS = [];
        var tFlag = 0;
        // datasTBL_KSV_PO_MST.forEach((col, i) => {
        selectedTBL_KSV_PO_MST.forEach((col, i) => {
            tInObj.ORDER_CDS.push(col.ORDER_CD);
            if (col.MRP_LIST3_FILE !== "") {
                tFlag = 1;
            }
        });
        if (tFlag === 1) {
            if (
                await confirm(
                    "이미 생성된 MRP List3가 있습니다. 새로 Mrp List3을 생성하시겠습니까?<br><br>An MRP List3 already exists. Do you want to create a new MRP List3?",
                )
            ) {
                var tArray = [...datasTBL_KSV_PO_MST];
                var tArray1 = [];
                tArray.forEach((col, i) => {
                    var tObj = { ...col };
                    tObj.MRP_LIST3_FILE = "";
                    tObj.MRP_LIST3_FILE_URL = "";
                    tArray1.push(tObj);
                });
                setDatasTBL_KSV_PO_MST(tArray1);
            } else {
                alert("MRP List3항목을 클릭하여 파일을 다운로드 하세요.<br><br>Click the MRP List3 item to download the file.");
                return;
            }
        }

        const resolvedOrderMeta = await buildOrderInfosByPo(
            selectedTBL_KSV_PO_MST,
        );

        tInObj.PO_CD = resolvedOrderMeta.firstPoCd;
        tInObj.PO_SEQ = resolvedOrderMeta.firstPoSeq;
        tInObj.ORDER_INFOS = resolvedOrderMeta.orderInfos;

        // 부모 프레임에 메시지 보내기
        /*
        window.parent.postMessage(
            "WorkingMrp",
            `https://${window.location.hostname}:3211`,
        );
        */

        console.log("REPORT_MRP_LIST3 request", {
            WITHOUT_PRICE: tInObj.WITHOUT_PRICE,
            MRP_BY_ORDER: tInObj.MRP_BY_ORDER,
            MRP_BY_STYLE: tInObj.MRP_BY_STYLE,
            ORDER_CDS: tInObj.ORDER_CDS,
            PO_CD: tInObj.PO_CD,
            PO_SEQ: tInObj.PO_SEQ,
        });

        setLoadingTBL_KSV_PO_MST(true);
        serviceS030513_MRP_LIST
            .mgrQuery_REPORT_MRP_LIST3(tInObj)
            .then((data) => {
                setLoadingTBL_KSV_PO_MST(false);
                if (typeof data.graphQLErrors === "undefined") {
                    if (data.length > 0) {
                        alert(data[0].CODE);
                        if (data[0].CODE.includes("SUCC")) {
                            // downloadFile(data[0].CODE.split('?')[2].toString(), data[0].CODE.split('?')[1].toString());
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
                    alert("현재 작업중입니다. 잠시후에 다시 조회하세요.<br><br>A process is currently running. Please try again shortly.");
                    // console.log("ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " + JSON.stringify(data.graphQLErrors));
                }
            });
    };

    const downloadFile = async (argFileUrl, argFileName) => {
        serviceLib.downloadFile(argFileUrl, argFileName);
    };

    const downloadBatchFilesSequentially = async (batchFiles) => {
        for (const f of batchFiles) {
            if (f && f.URL && f.NAME) {
                downloadFile(f.URL, f.NAME);
                await new Promise((resolve) => setTimeout(resolve, 350));
            }
        }
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

    const onInputChangeQRY_KSV_PO_MST_BUYER_CD = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_PO_MST = { ...dataQRY_KSV_PO_MST };

        let tTypeVal = _dataQRY_KSV_PO_MST[`${name}`];
        if (typeof tTypeVal === "string") _dataQRY_KSV_PO_MST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_PO_MST[`${name}`] = parseInt(val);

        setDataQRY_KSV_PO_MST(_dataQRY_KSV_PO_MST);
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

    const onCalChangeQRY_KSV_PO_MST_CURR_DATE = (e, name) => {
        let val1 = e.value || "";
        let val = "";
        if (val1 === "") {
            val = "";
        } else {
            val = getDateVal(val1);
        }

        let _dataQRY_KSV_PO_MST = { ...dataQRY_KSV_PO_MST };
        _dataQRY_KSV_PO_MST[`${name}`] = val;
        setDataQRY_KSV_PO_MST(_dataQRY_KSV_PO_MST);
    };

    const onCheckboxChangeQRY_KSV_PO_MST_LOCAL_WORD = (e, name) => {
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

    const onCheckboxChangeQRY_KSV_PO_MST_MRP_BY_ORDER = (e, name) => {
        let val = "";
        let _dataQRY_KSV_PO_MST = { ...dataQRY_KSV_PO_MST };
        if (e.checked) {
            val = "1";
        } else {
            val = "0";
        }
        _dataQRY_KSV_PO_MST[`${name}`] = val;
        if (val === "1") _dataQRY_KSV_PO_MST["MRP_BY_STYLE"] = "0";
        setDataQRY_KSV_PO_MST(_dataQRY_KSV_PO_MST);
    };

    const onCheckboxChangeQRY_KSV_PO_MST_MRP_BY_STYLE = (e, name) => {
        let val = "";
        let _dataQRY_KSV_PO_MST = { ...dataQRY_KSV_PO_MST };
        if (e.checked) {
            val = "1";
        } else {
            val = "0";
        }
        _dataQRY_KSV_PO_MST[`${name}`] = val;
        if (val === "1") _dataQRY_KSV_PO_MST["MRP_BY_ORDER"] = "0";
        setDataQRY_KSV_PO_MST(_dataQRY_KSV_PO_MST);
    };

    const onCheckboxChangeQRY_KSV_PO_MST_WITHOUT_PRICE = (e, name) => {
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
                argData0.data[`MRP_LIST_FILE`],
            );
        }
        if (tColName === "MRP_LIST2_FILE") {
            downloadFile(
                argData0.data[`MRP_LIST2_FILE_URL`],
                argData0.data[`MRP_LIST2_FILE`],
            );
        }
        if (tColName === "MRP_LIST3_FILE") {
            downloadFile(
                argData0.data[`MRP_LIST3_FILE_URL`],
                argData0.data[`MRP_LIST3_FILE`],
            );
        }
    };

    const onRowClick1TBL_KSV_PO_MST = (argData0) => {
        var argData = {};

        if (typeof argData0.length !== "undefined") {
            if (argData0.length > 0) argData = argData0[argData0.length - 1];
        } else {
            argData = argData0;
        }

        let argTBL_KSV_PO_MST = argData;

        setDataTBL_KSV_PO_MST(argTBL_KSV_PO_MST);

        search_QRY_ORDER_COMBINED(argData);
    };

    const onRowClickTBL_KSV_PO_MST = (event) => {
        let argTBL_KSV_PO_MST = event.data;

        console.log(argTBL_KSV_PO_MST);

        serviceS030513_MRP_LIST
            .mgrQuery_CODE({ PO_CD: argTBL_KSV_PO_MST.PO_CD })
            .then((data) => {
                if (typeof data.graphQLErrors === "undefined") {
                    console.log(
                        "mgrQuery_KSV_ORDER_MST call => " + data.PO_SEQ.length,
                    );
                    setDatasQRY_KSV_PO_MST_PO_SEQ(data.PO_SEQ);
                    setDataQRY_KSV_PO_MST_PO_SEQ(
                        data.PO_SEQ[data.PO_SEQ.length - 1],
                    );
                    setDataQRY_KSV_PO_MST({
                        ...dataQRY_KSV_PO_MST,
                        PO_SEQ: data.PO_SEQ[data.PO_SEQ.length - 1].PO_SEQ,
                    });
                } else {
                    console.log(
                        "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                }
            });

        if (flagSelectModeTBL_KSV_PO_MST) return;
        // Service : NawooAll:mgrQueryTBL_KSV_PO_MST
    };

    /*TABLE KSV_PO_MST */
    // DEFINE DATAGRID : TBL_KSV_PO_MST2
    const [loadingTBL_KSV_PO_MST2, setLoadingTBL_KSV_PO_MST2] = useState(false);
    const [datasTBL_KSV_PO_MST2_COLS, setDatasTBL_KSV_PO_MST2_COLS] = useState(
        [],
    );
    const [datasTBL_KSV_PO_MST2, setDatasTBL_KSV_PO_MST2] = useState([]);
    const dt_TBL_KSV_PO_MST2 = useRef(null);
    const [dataTBL_KSV_PO_MST2, setDataTBL_KSV_PO_MST2] =
        useState(emptyTBL_KSV_PO_MST2);
    const [selectedTBL_KSV_PO_MST2, setSelectedTBL_KSV_PO_MST2] = useState([]);
    const [flagSelectModeTBL_KSV_PO_MST2, setFlagSelectModeTBL_KSV_PO_MST2] =
        useState(false);

    // DATAGRID CODE : TBL_KSV_PO_MST2

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

    useEffect(() => {
        var tCurrDate = serviceLib.getCurrDate1();
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
            if (tPO_CD === null) tPO_CD = "";
        }

        var tQryObj = { ...dataQRY_KSV_PO_MST };
        tQryObj.PO_CD = tPO_CD;
        tQryObj.PO_SEQ = "";
        tQryObj.CURR_DATE = tCurrDate;
        tQryObj.MRP_BY_ORDER = "1";

        var tObj = {};
        tObj.PO_CD = tPO_CD;

        serviceS030513_MRP_LIST.mgrQuery_CODE(tObj).then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                console.log(
                    "mgrQuery_KSV_ORDER_MST call => " + data.PO_SEQ.length,
                );
                setDatasQRY_KSV_PO_MST_PO_SEQ(data.PO_SEQ);
                setDataQRY_KSV_PO_MST_PO_SEQ(
                    data.PO_SEQ[data.PO_SEQ.length - 1],
                );

                var tQry = { ...emptyQRY_KSV_PO_MST };
                tQry.PO_CD = tPO_CD;
                tQry.PO_SEQ = (data.PO_SEQ && data.PO_SEQ.length > 0) ? data.PO_SEQ[data.PO_SEQ.length - 1].CD_CODE : '';

                setDataQRY_KSV_PO_MST(tQry);
            } else {
                console.log(
                    "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });

        if (tPO_CD) {
            search_QRY_ORDER(tQryObj);
        }
    }, []);

    // Support Area

    const changeCheckBoxVal = (argVal) => {
        if (argVal === "1") return true;
        else return false;
    };

    const changeDateVal = (argVal) => {
        if (argVal === "" || argVal == null) {
            return new Date(); // 오늘 날짜 반환
        }
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
                style={{ width: "123rem", height: "3rem" }}
            >
                <span className="af-span-3-0" style={{ width: "20rem" }}>
                    <p className="af-span-p" style={{ width: "7rem" }}>PO#</p>
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
                <span className="af-span-3-0" style={{ width: "22rem" }}>
                    <p className="af-span-p" style={{ width: "9rem" }}>Buyer Name or CD</p>
                    <div className="af-span-div" style={{ width: "12rem" }}>
                        <InputText
                            style={{ width: "12rem" }}
                            value={dataQRY_KSV_PO_MST.BUYER_CD}
                            onChange={(e) =>
                                onInputChangeQRY_KSV_PO_MST_BUYER_CD(
                                    e,
                                    "BUYER_CD",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "20rem" }}>
                    <p className="af-span-p" style={{ width: "7rem" }}>Style Name</p>
                    <div className="af-span-div" style={{ width: "12rem" }}>
                        <InputText
                            style={{ width: "12rem" }}
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
                <span className="af-span-3-0" style={{ width: "15rem" }}>
                    <div className="af-span-div-btn" style={{ width: "14rem" }}>
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
                            style={{ width: "14rem" }}
                            className="p-button-text"
                            onClick={search_QRY_ORDER}
                        />
                    </div>
                </span>
            </div>
            <div
                className="af-div-first"
                style={{ width: "123rem", height: "49rem" }}
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
                        const tSelectedRows = e.value || [];
                        setFlagSelectModeTBL_KSV_PO_MST(true);
                        setSelectedTBL_KSV_PO_MST(tSelectedRows);
                        console.log(
                            "selected length:" +
                                tSelectedRows.length,
                        );
                        onRowClick1TBL_KSV_PO_MST(tSelectedRows);
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
                    scrollHeight="535px"
                >
                    <AFColumn selectionMode="multiple" field="__checkbox__" reorderable={false} headerClassName="t-header" headerStyle={{ width: "3rem" }} ></AFColumn>
                    <AFColumn field="PO_CD" header="PO#" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="PO_SEQ" header="Seq" headerStyle={{ width: "3rem", height: "1.8rem" }} bodyStyle={{ width: "3rem" }} ></AFColumn>
                    <AFColumn field="ORDER_CD" header="Order#" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="BUYER_NAME" header="Buyer" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="STYLE_NAME" header="Style" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} ></AFColumn>
                    <AFColumn field="TOT_CNT" header="Order Qty" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} className="text-right" body={(row) => serviceLib.formatNumber(row.TOT_CNT)} ></AFColumn>
                    <AFColumn field="MRP_LIST_FILE" header="Mrp List" headerStyle={{ width: "25rem", height: "1.8rem" }} bodyStyle={{ width: "25rem" }} ></AFColumn>
                    <AFColumn field="MRP_LIST2_FILE" header="Mrp List(Color)" headerStyle={{ width: "25rem", height: "1.8rem" }} bodyStyle={{ width: "25rem" }} ></AFColumn>
                    <AFColumn field="MRP_LIST3_FILE" header="Mrp List(Sub Order)" headerStyle={{ width: "25rem", height: "1.8rem" }} bodyStyle={{ width: "25rem" }} ></AFColumn>
                </AFDataTable>
            </div>

            <div
                className="af-div-first"
                style={{ width: "123rem", height: "9rem" }}
            >
                <span className="af-span-3-0" style={{ width: "21rem" }}>
                    <p className="af-span-p" style={{ width: "8rem" }}>Seq</p>
                    <div className="af-span-div" style={{ width: "9rem" }}>
                        <Dropdown
                            style={{ width: "9rem" }}
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
                <span className="af-span-3-0" style={{ width: "20rem" }}>
                    <p className="af-span-p" style={{ width: "12rem" }}>MRP By Order</p>
                    <div className="af-span-div" style={{ width: "3rem" }}>
                        <Checkbox
                            id="id_SALES_FLAG"
                            checked={changeCheckBoxVal(
                                dataQRY_KSV_PO_MST.MRP_BY_ORDER,
                            )}
                            onChange={(e) =>
                                onCheckboxChangeQRY_KSV_PO_MST_MRP_BY_ORDER(
                                    e,
                                    "MRP_BY_ORDER",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "80rem" }}>
                    <div className="af-span-div-btn" style={{ width: "14rem" }}>
                        <Button
                            label="MRP List"
                            style={{ width: "14rem" }}
                            className="p-button-text green"
                            onClick={search_REPORT_MRP_LIST}
                        />
                    </div>
                </span>

                <span className="af-span-3" style={{ width: "21rem" }}>
                    <p className="af-span-p" style={{ width: "8rem" }}>Curr Date</p>
                    <div className="af-span-div" style={{ width: "10rem" }}>
                        <Calendar
                            showButtonBar
                            style={{ width: "10rem" }}
                            dateFormat="yy-mm-dd"
                            id="id_S_PO_DATE"
                            value={changeDateVal(dataQRY_KSV_PO_MST.CURR_DATE)}
                            onChange={(e) =>
                                onCalChangeQRY_KSV_PO_MST_CURR_DATE(
                                    e,
                                    "CURR_DATE",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "20rem" }}>
                    <p className="af-span-p" style={{ width: "12rem" }}>MRP By Style</p>
                    <div className="af-span-div" style={{ width: "3rem" }}>
                        <Checkbox
                            id="id_SALES_FLAG"
                            checked={changeCheckBoxVal(
                                dataQRY_KSV_PO_MST.MRP_BY_STYLE,
                            )}
                            onChange={(e) =>
                                onCheckboxChangeQRY_KSV_PO_MST_MRP_BY_STYLE(
                                    e,
                                    "MRP_BY_STYLE",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "80rem" }}>
                    <div className="af-span-div-btn" style={{ width: "14rem" }}>
                        <Button
                            label="MRP List(Color)"
                            style={{ width: "14rem" }}
                            className="p-button-text green"
                            onClick={search_REPORT_MRP_LIST2}
                        />
                    </div>
                </span>

                <span className="af-span-3" style={{ width: "21rem" }}>
                    <p className="af-span-p" style={{ width: "12rem" }}>Without Price</p>
                    <div className="af-span-div" style={{ width: "3rem" }}>
                        <Checkbox
                            id="id_SALES_FLAG"
                            checked={changeCheckBoxVal(
                                dataQRY_KSV_PO_MST.WITHOUT_PRICE,
                            )}
                            onChange={(e) =>
                                onCheckboxChangeQRY_KSV_PO_MST_WITHOUT_PRICE(
                                    e,
                                    "WITHOUT_PRICE",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "20rem" }}>
                    <p className="af-span-p" style={{ width: "10rem" }}>Local Word</p>
                    <div className="af-span-checkbox">
                        <Checkbox
                            id="id_SALES_FLAG"
                            checked={changeCheckBoxVal(
                                dataQRY_KSV_PO_MST.LOCAL_WORD,
                            )}
                            onChange={(e) =>
                                onCheckboxChangeQRY_KSV_PO_MST_LOCAL_WORD(
                                    e,
                                    "LOCAL_WORD",
                                )
                            }
                        />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: "80rem" }}>
                    <div className="af-span-div-btn" style={{ width: "14rem" }}>
                        <Button
                            label="MRP List(Sub Order)"
                            style={{ width: "14rem" }}
                            className="p-button-text green"
                            onClick={search_REPORT_MRP_LIST3}
                        />
                    </div>
                </span>
            </div>

            <Toast ref={toast} />
        </div>
    );
};

const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(S030513_MRP_LIST, comparisonFn);
