/* eslint-disable */
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
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
import apolloOption from "../assets/env_graphql";

import { ServiceLib } from "../service/service_lib/ServiceLib";
import { ServiceS0305_MRP_MANAGER } from "../service/service_biz/ServiceS0305_MRP_MANAGER";
import { ServiceS030504_REVISE } from "../service/service_biz/ServiceS030504_REVISE";
import { ServiceS030514_PO_LIST } from "../service/service_biz/ServiceS030514_PO_LIST";
import { ServiceS030513_MRP_LIST } from "../service/service_biz/ServiceS030513_MRP_LIST";

import $ from "jquery";

import "./page_common.scss";

const emptyKCD_CODE = {
    id: 0,
    CD_GROUP: "",
    CD_CODE: "",
    CD_NAME: "",
    CD_FLAG: "",
};

const emptyQRY_KSV_PO_MST = {
    PO_TYPE: "",
    PO_STATUS: "all(ing)",
    PO_CD: "",
    BUYER_CD: "",
    S_PO_DATE: "",
    E_PO_DATE: "",
    REG_USER: "",
    ORDER_CD: "",
    STYLE_CD: "",
};

const S0305_SEARCH_STORAGE_KEY = "S0305_MRP_MANAGER_SEARCH";
const S0305_REQUERY_STORAGE_KEY = "S0305_MRP_MANAGER_REQUERY";
const S0305_AUTO_PO_FIX_KEY = "S0305_AUTO_PO_FIX";
const S0305_QRY_FIELDS = Object.keys(emptyQRY_KSV_PO_MST);

const pickS0305SearchQuery = (source) => {
    if (!source || typeof source !== "object") return {};

    return S0305_QRY_FIELDS.reduce((acc, key) => {
        if (typeof source[key] !== "undefined") {
            acc[key] = source[key];
        }
        return acc;
    }, {});
};

const getS0305StoredQuery = (storageKey) => {
    const raw = sessionStorage.getItem(storageKey);
    if (!raw) return null;

    try {
        const parsed = JSON.parse(raw);
        const query = pickS0305SearchQuery(parsed);
        return Object.keys(query).length > 0 ? query : null;
    } catch (error) {
        console.log(`${storageKey} parse error => ${error}`);
        return null;
    }
};

const getS0305AutoPoFixTarget = () => {
    const raw = sessionStorage.getItem(S0305_AUTO_PO_FIX_KEY);
    if (!raw) return null;

    try {
        const parsed = JSON.parse(raw);
        if (!parsed?.PO_CD) return null;
        return {
            PO_CD: parsed.PO_CD,
            PO_SEQ: String(parsed.PO_SEQ ?? ""),
        };
    } catch (error) {
        console.log(`${S0305_AUTO_PO_FIX_KEY} parse error => ${error}`);
        return null;
    }
};

const emptyTBL_KSV_PO_MST = {
    id: 0,
    PO_STATUS_NAME: "",
    PO_STATUS: "",
    PO_SEQ: "",
    BUYER_NAME: "",
    BUYER_CD: "",
    PO_TYPE_NAME: "",
    PO_TYPE: "",
    PO_CD: "",
    TARGET_ETA: "",
    REG_DATETIME: "",
    REG_USER: "",
    UPD_DATETIME: "",
    UPD_USER: "",
    MRP_PACK_FLAG: "",
    BUYER_NAME: "",
    BUYER_CD: "",
    DOMESTIC_FLAG: "",
    IMPORT_FLAG: "",
    FACTORY_FLAG: "",
};

const emptyTBL_KSV_ORDER_PIMST2 = {
    id: 0,
    STATUS_NAME: "",
    STATUS_CD: "",
    BUYER_NAME: "",
    BUYER_CD: "",
    REG_DATETIME: "",
    PO_CD: "",
    QTY: "",
    AMT: "",
    REG_USER: "",
    File: "",
};

const S0305_MRP_MANAGER = () => {
    const serviceLibRef = useRef(null);
    if (!serviceLibRef.current) {
        serviceLibRef.current = new ServiceLib();
        serviceLibRef.current.loginConfirm();
    }
    const serviceLib = serviceLibRef.current;
    const serviceS0305_MRP_MANAGERRef = useRef(null);
    if (!serviceS0305_MRP_MANAGERRef.current) serviceS0305_MRP_MANAGERRef.current = new ServiceS0305_MRP_MANAGER();
    const serviceS0305_MRP_MANAGER = serviceS0305_MRP_MANAGERRef.current;
    const serviceS030504_REVISERef = useRef(null);
    if (!serviceS030504_REVISERef.current) serviceS030504_REVISERef.current = new ServiceS030504_REVISE();
    const serviceS030504_REVISE = serviceS030504_REVISERef.current;
    const serviceS030514_PO_LISTRef = useRef(null);
    if (!serviceS030514_PO_LISTRef.current) serviceS030514_PO_LISTRef.current = new ServiceS030514_PO_LIST();
    const serviceS030514_PO_LIST = serviceS030514_PO_LISTRef.current;
    const serviceS030513_MRP_LISTRef = useRef(null);
    if (!serviceS030513_MRP_LISTRef.current) serviceS030513_MRP_LISTRef.current = new ServiceS030513_MRP_LIST();
    const serviceS030513_MRP_LIST = serviceS030513_MRP_LISTRef.current;

    const toast = useRef(null);

    /* */
    const [isTimer, setIsTimer] = useState("");

    /* progress */
    const [isProgress, setIsProgress] = useState(false);

    /* msg Dialog */
    const [msgMakeOrderMrp, setMsgMakeOrderMrp] = useState(false);
    const msgMakeOrderMrpResolveRef = useRef(null);

    const openMakeOrderMrpDialog = () =>
        new Promise((resolve) => {
            msgMakeOrderMrpResolveRef.current = resolve;
            setMsgMakeOrderMrp(true);
        });

    const closeMakeOrderMrpDialog = (result) => {
        setMsgMakeOrderMrp(false);
        if (msgMakeOrderMrpResolveRef.current) {
            msgMakeOrderMrpResolveRef.current(result);
            msgMakeOrderMrpResolveRef.current = null;
        }
    };

    const onFooterNo = () => {
        closeMakeOrderMrpDialog("NO");
    };
    const onFooterYes = () => {
        closeMakeOrderMrpDialog("YES");
    };

    useEffect(() => {
        if (!msgMakeOrderMrp) return;
        const handleKey = (e) => {
            const key = e.key.toLowerCase();
            if (key === "y") { e.preventDefault(); onFooterYes(); }
            else if (key === "n") { e.preventDefault(); onFooterNo(); }
            else if (key === "c" || key === "escape") { e.preventDefault(); closeMakeOrderMrpDialog("CANCEL"); }
        };
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [msgMakeOrderMrp]);

    const footerContent = (
        <div style={{ display: "flex", gap: "0.5rem", justifyContent: "center" }}>
            <Button
                label={<span>MRP Record(Style)(<u>Y</u>)</span>}
                accessKey="Y"
                onClick={onFooterYes}
                className="p-button-text"
                style={{ minWidth: "12rem", height: "2.5rem", fontSize: "1rem" }}
            />
            <Button
                label={<span>MRP Record(Order)(<u>N</u>)</span>}
                accessKey="N"
                onClick={onFooterNo}
                className="p-button-text"
                style={{ minWidth: "12rem", height: "2.5rem", fontSize: "1rem" }}
            />
            <Button
                label={<span>Cancel(<u>C</u>)</span>}
                accessKey="C"
                onClick={() => closeMakeOrderMrpDialog("CANCEL")}
                className="p-button-text"
                style={{ minWidth: "12rem", height: "2.5rem", fontSize: "1rem" }}
                autoFocus
            />
        </div>
    );

    /* splitter 관련 */
    const [styleVal, setStyleVal] = useState({ width: "65vw" });

    const [urlIframe, setUrlIframe] = useState("");
    const [createDialog, setCreateDialog] = useState(false);
    const hideDialog = () => {
        setCreateDialog(false);
    };

    //

    //

    const search_REPORT_SEQ_LIST = () => {
        var tObj = { ...dataQRY_KSV_PO_MST };

        if (tObj.S_PO_DATE === "" || tObj.E_PO_DATE === "") {
            alert("기간을 입력해야 합니다.<br><br>Please enter a period.");
            return;
        }

        var tInObj = {};
        tInObj.S_DATE = tObj.S_PO_DATE;
        tInObj.E_DATE = tObj.E_PO_DATE;

        setLoadingTBL_KSV_PO_MST(true);
        serviceS0305_MRP_MANAGER
            .mgrQuery_REPORT_SEQ_LIST(tInObj)
            .then((data) => {
                setLoadingTBL_KSV_PO_MST(false);
                if (typeof data.graphQLErrors === "undefined") {
                    if (data.length > 0) {
                        alert(data[0].CODE);
                        if (data[0].CODE.includes("SUCC")) {
                            serviceLib.downloadFile(
                                data[0].CODE.split("?")[2].toString(),
                                data[0].CODE.split("?")[1].toString(),
                            );
                        }
                    }
                } else {
                    alert("작업중 에러가 발생했습니다.<br><br>An error occurred during processing.");
                }
            });
    };

    const search_REPORT_SEQ_LIST2 = () => {
        var tObj = { ...dataQRY_KSV_PO_MST };

        if (tObj.S_PO_DATE === "" || tObj.E_PO_DATE === "") {
            alert("기간을 입력해야 합니다.<br><br>Please enter a period.");
            return;
        }

        var tInObj = {};
        tInObj.S_DATE = tObj.S_PO_DATE;
        tInObj.E_DATE = tObj.E_PO_DATE;

        setLoadingTBL_KSV_PO_MST(true);
        serviceS0305_MRP_MANAGER
            .mgrQuery_REPORT_SEQ_LIST2(tInObj)
            .then((data) => {
                setLoadingTBL_KSV_PO_MST(false);
                if (typeof data.graphQLErrors === "undefined") {
                    if (data.length > 0) {
                        alert(data[0].CODE);
                        if (data[0].CODE.includes("SUCC")) {
                            serviceLib.downloadFile(
                                data[0].CODE.split("?")[2].toString(),
                                data[0].CODE.split("?")[1].toString(),
                            );
                        }
                    }
                } else {
                    alert("작업중 에러가 발생했습니다.<br><br>An error occurred during processing.");
                }
            });
    };

    const workStatusInit = async (poCd) => {
        if (!selectedTBL_KSV_PO_MST.length) {
            alert("초기화 할 대상을 선택하세요.<br><br>Please select a target to initialize.");
            return;
        }

        async function ajaxToRouter(method, url, data) {
            return new Promise((resolve) => {
                $.ajax({
                    type: method,
                    url: url,
                    headers: {
                        "Content-Type": "application/json",
                    },
                    Accept: "application/json",
                    dataType: "text",
                    data: JSON.stringify(data),
                    success: function (result) {
                        resolve(JSON.parse(result));
                    },
                    error: function (request, status, error) {
                        console.log(error);
                    },
                });
            });
        }

        var tUserInfo = serviceLib.getUserInfo();
        let userId = tUserInfo.USER_ID;

        return await ajaxToRouter(
            "post",
            `${window.location.protocol}//${window.location.hostname}:${apolloOption.server_port}/restapi/mrp/working_status/init`,
            {
                userId: userId,
                poCd: selectedTBL_KSV_PO_MST[0].PO_CD,
            },
        );
    };

    const search_REPORT_STOCK_LOG = () => {
        var tObj = { ...dataQRY_KSV_PO_MST };

        if (tObj.S_PO_DATE === "" || tObj.E_PO_DATE === "") {
            alert("기간을 입력해야 합니다.<br><br>Please enter a period.");
            return;
        }

        var tInObj = {};
        tInObj.S_DATE = tObj.S_PO_DATE;
        tInObj.E_DATE = tObj.E_PO_DATE;

        setLoadingTBL_KSV_PO_MST(true);
        serviceS0305_MRP_MANAGER
            .mgrQuery_REPORT_STOCK_LOG(tInObj)
            .then((data) => {
                setLoadingTBL_KSV_PO_MST(false);
                if (typeof data.graphQLErrors === "undefined") {
                    if (data.length > 0) {
                        alert(data[0].CODE);
                        if (data[0].CODE.includes("SUCC")) {
                            serviceLib.downloadFile(
                                data[0].CODE.split("?")[2].toString(),
                                data[0].CODE.split("?")[1].toString(),
                            );
                        }
                    }
                } else {
                    alert("작업중 에러가 발생했습니다.<br><br>An error occurred during processing.");
                }
            });
    };

    const popup_DEL_MRP_PACK = () => {
        const row = selectedTBL_KSV_PO_MST?.[0];
        if (!row) {
            alert("작업할 PO를 선택하세요.<br><br>Please select a PO to process.");
            return;
        }

        serviceS0305_MRP_MANAGER
            .mgrQuery_WORK_STATUS({
                PO_CD: row.PO_CD,
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
                        `해당 PO(${row.PO_CD})에 대해서 Mrp or Revise작업중이거나 미처리된 작업결과가 있습니다. <br><br>There are ongoing or unprocessed MRP/Revise tasks for this PO.`,
                    );
                    return;
                }

                sessionStorage.setItem(
                    S0305_SEARCH_STORAGE_KEY,
                    JSON.stringify(dataQRY_KSV_PO_MST),
                );

                window.parent.postMessage(
                    {
                        func: "call_url",
                        message: {
                            key: "2-6",
                            label: "Del Pack",
                            icon: "pi pi-fw pi-user-edit",
                            url1: `S030501_DEL_MRP_PACK?PO_CD=${row.PO_CD}`,
                        },
                    },
                    "*",
                );
            });
    };

    const popup_PO_HISTORY = () => {
        const row = selectedTBL_KSV_PO_MST?.[0];
        if (!row) {
            alert("작업할 PO를 선택하세요.<br><br>Please select a PO to process.");
            return;
        }

        serviceS0305_MRP_MANAGER
            .mgrQuery_WORK_STATUS({
                PO_CD: row.PO_CD,
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
                    const tWorkStatus = data[0].WORK_STATUS;
                    const tJobCnt = parseInt(data[0].JOB_CNT);

                    if (tWorkStatus === "" && tJobCnt > 0) {
                        alert(
                            "다른 PO에 대해서 MRP / Revise작업중에 있습니다. <br><br>MRP/Revise is in progress for another PO.",
                        );
                        return;
                    }
                }

                window.parent.postMessage(
                    {
                        func: "call_url",
                        message: {
                            key: "2-7",
                            label: "PO History",
                            icon: "pi pi-fw pi-user-edit",
                            url1: `S030502_PO_HISTORY?PO_CD=${row.PO_CD}`,
                        },
                    },
                    "*",
                );
            });
    };
    const popup_MRP_PACK = () => {
        const row = selectedTBL_KSV_PO_MST?.[0];
        if (!row) {
            alert("작업할 PO를 선택하세요.<br><br>Please select a PO to process.");
            return;
        }

        serviceS0305_MRP_MANAGER
            .mgrQuery_WORK_STATUS({
                PO_CD: row.PO_CD,
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
                        `해당 PO(${row.PO_CD})에 대해서 Mrp or Revise작업중이거나 미처리된 작업결과가 있습니다. <br><br>There are ongoing or unprocessed MRP/Revise tasks for this PO.`,
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
                            url1: `S030515_MRP_PACK?PO_CD=${row.PO_CD}`,
                        },
                    },
                    "*",
                );
            });
    };

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
                                url1: "S030513_MRP_LIST?PO_CD=",
                            },
                        },
                        "*",
                    );
                }
            });
    };

    const popup_PO_LIST = () => {
        serviceS0305_MRP_MANAGER.mgrQuery_WORK_STATUS({}).then((data) => {
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
                            key: "2-26",
                            label: "PO_LIST",
                            icon: "pi pi-fw pi-user-edit",
                            url1: "S030514_PO_LIST?PO_CD=",
                        },
                    },
                    "*",
                );
            }
        });
    };

    const popup_MATERIAL_PO_LIST = () => {
        serviceS0305_MRP_MANAGER.mgrQuery_WORK_STATUS({}).then((data) => {
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
                            key: "2-28",
                            label: "Material Po List",
                            icon: "pi pi-fw pi-user-edit",
                            url1: "S030516_MATERIAL_PO_LIST",
                        },
                    },
                    "*",
                );
            }
        });
    };

    const popup_STOCK_CHECK = () => {
        const row = selectedTBL_KSV_PO_MST?.[0];
        if (!row) {
            alert("작업할 PO를 선택하세요.<br><br>Please select a PO to process.");
            return;
        }

        serviceS0305_MRP_MANAGER
            .mgrQuery_WORK_STATUS({
                PO_CD: row.PO_CD,
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
                        "해당 PO에 대해 make MRP, Revise작업중이거나 미처리 작업 결과가 있습니다.<br><br>There are ongoing or unprocessed MRP/Revise tasks for this PO.",
                    );
                    return;
                }

                if (parseInt(row.PO_STATUS) < 2) {
                    alert("PO 상태가 등록상태입니다.<br><br>PO status is in registered state.");
                    return;
                }

                sessionStorage.setItem(
                    S0305_SEARCH_STORAGE_KEY,
                    JSON.stringify(dataQRY_KSV_PO_MST),
                );

                window.parent.postMessage(
                    {
                        func: "call_url",
                        message: {
                            key: "2-8",
                            label: "Stock Check",
                            icon: "pi pi-fw pi-user-edit",
                            url1: `S030503_STOCK_CHECK?PO_CD=${row.PO_CD}&PO_SEQ=${row.PO_SEQ}`,
                        },
                    },
                    "*",
                );
            });
    };

    const popup_REVISE = () => {
        const row = selectedTBL_KSV_PO_MST?.[0];
        if (!row) {
            alert("작업할 PO를 선택하세요.<br><br>Please select a PO to process.");
            return;
        }

        serviceS0305_MRP_MANAGER
            .mgrQuery_WORK_STATUS({
                PO_CD: row.PO_CD,
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
                    const tWorkStatus = data[0].WORK_STATUS;
                    const tJobCnt = parseInt(data[0].JOB_CNT);

                    if (tWorkStatus.includes("WORK")) {
                        alert(
                            `해당 PO(${row.PO_CD})에 대해서 Mrp or Revise작업중입니다. 작업이 완료된후 작업할수 있습니다.<br><br>MRP or Revise is in progress for this PO. You can proceed after the task is completed.`,
                        );
                        return;
                    }

                    if (tWorkStatus.includes("SUCCESS:MRP MAKE")) {
                        alert(
                            `해당 PO(${row.PO_CD})에 대해서Mrp Make 처리 완료된 결과가 있습니다. Mrp Save만 작업가능합니다 <br><br>MRP Make processing is completed for this PO. Only MRP Save is available.`,
                        );
                        return;
                    }

                    if (row.PO_STATUS === "5") {
                        alert("PO 상태가 종료상태입니다.<br><br>PO status is in end state.");
                        return;
                    }

                    if (row.PO_STATUS !== "4") {
                        alert("먼저 PO를 수정하세요.<br><br>First PO Fix.");
                        return;
                    }

                    if (row.PO_TYPE === "S" && parseInt(row.PO_SEQ) === 2) {
                        alert("이미 조정된 샘플 발주입니다.<br><br>This sample PO has already been adjusted.");
                        return;
                    }

                    if (
                        !tWorkStatus.includes("SUCCESS:REVISE MAKE") &&
                        tJobCnt > 0
                    ) {
                        alert(
                            "다른 PO에 대해서 MRP / Revise작업중에 있습니다. <br><br>MRP/Revise is in progress for another PO.",
                        );
                        return;
                    }

                    sessionStorage.setItem(
                        S0305_SEARCH_STORAGE_KEY,
                        JSON.stringify(dataQRY_KSV_PO_MST),
                    );

                    window.parent.postMessage(
                        {
                            func: "call_url",
                            message: {
                                key: "2-9",
                                label: "Revise",
                                icon: "pi pi-fw pi-user-edit",
                                url1: `S030504_REVISE?PO_CD=${row.PO_CD}&PO_SEQ=${row.PO_SEQ}`,
                            },
                        },
                        "*",
                    );
                }
            });
    };

    const popup_PO_RECORD_MATL_ADD = () => {
        const row = selectedTBL_KSV_PO_MST?.[0];
        if (!row) {
            alert("작업할 PO를 선택하세요.<br><br>Please select a PO to process.");
            return;
        }

        if (row.PO_STATUS !== "4") {
            alert("PO Fix상태에서만 가능합니다.<br><br>This is only available in PO Fix status.");
            return;
        }

        serviceS0305_MRP_MANAGER
            .mgrQuery_WORK_STATUS({
                PO_CD: row.PO_CD,
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
                        `해당 PO(${row.PO_CD})에 대해서 Mrp or Revise작업중이거나 미처리된 작업결과가 있습니다.<br><br>There are ongoing or unprocessed MRP/Revise tasks for this PO.`,
                    );
                    return;
                }

                window.parent.postMessage(
                    {
                        func: "call_url",
                        message: {
                            key: "2-10",
                            label: "Matl Add",
                            icon: "pi pi-fw pi-user-edit",
                            url1: `S030505_PO_RECORD_MATL_ADD?PO_CD=${row.PO_CD}`,
                        },
                    },
                    "*",
                );
            });
    };

    const popup_NEW_PO_SAMPLE = () => {
        window.parent.postMessage(
            {
                func: "call_url",
                message: {
                    key: "2-11",
                    label: "PO Regist(Material)",
                    icon: "pi pi-fw pi-user-edit",
                    url1: "S030506_NEW_PO_SAMPLE?PO_CD=",
                },
            },
            "*",
        );
    };
    const process_PURCHASE_REQUEST = () => {
        if (selectedTBL_KSV_PO_MST.length <= 0) return;

        var tInput = [];
        selectedTBL_KSV_PO_MST.forEach((col, i) => {
            var tObj = { ...col };
            if (typeof tObj.id !== "undefined") delete tObj.id;
            if (typeof tObj.__typename !== "undefined") delete tObj.__typename;
            tInput.push(tObj);
        });

        setIsProgress(true);
        serviceS0305_MRP_MANAGER.processPurchaseRequest(tInput).then((data) => {
            setIsProgress(false);
            if (typeof data.graphQLErrors === "undefined") {
                if (data.length > 0) {
                    if (data[0].CODE.includes("SUCC")) {
                        const targetKeys = new Set(
                            selectedTBL_KSV_PO_MST.map(
                                (row) => `${row.PO_CD}::${row.PO_SEQ}`,
                            ),
                        );

                        setDatasTBL_KSV_PO_MST((prev) =>
                            prev.map((row) => {
                                const rowKey = `${row.PO_CD}::${row.PO_SEQ}`;
                                if (!targetKeys.has(rowKey)) return row;

                                const curr = String(
                                    row.PURCHASE_REQUEST ?? "",
                                ).trim();
                                const nextVal = curr === "" ? "O" : "";
                                return {
                                    ...row,
                                    PURCHASE_REQUEST: nextVal,
                                };
                            }),
                        );

                        setSelectedTBL_KSV_PO_MST((prev) =>
                            prev.map((row) => {
                                const curr = String(
                                    row.PURCHASE_REQUEST ?? "",
                                ).trim();
                                const nextVal = curr === "" ? "O" : "";
                                return {
                                    ...row,
                                    PURCHASE_REQUEST: nextVal,
                                };
                            }),
                        );

                        toast.current?.show({
                            severity: "success",
                            summary: "Success",
                            detail: "Purchase Req Updated",
                            life: 2000,
                        });
                    } else {
                        alert(data[0].CODE);
                    }
                }
            } else {
            }
        });
    };

    const runProcessPoSettle = (row) => {
        if (!row) {
            alert("작업할 PO를 선택하세요.<br><br>Please select a PO to process.");
            return;
        }

        serviceS0305_MRP_MANAGER
            .mgrQuery_WORK_STATUS({
                PO_CD: row.PO_CD,
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
                        `해당 PO(${row.PO_CD})에 대해서 Mrp or Revise작업중이거나 미처리 작업결과가 있습니다.<br><br>There are ongoing or unprocessed MRP/Revise tasks for this PO.`,
                    );
                    return;
                }

                const tInput0 = { ...row };
                delete tInput0.id;
                delete tInput0.__typename;

                if (tInput0.PO_STATUS === "4") {
                    alert("Already Po fix.");
                    return;
                }

                if (tInput0.PO_STATUS === "5") {
                    alert("Already Po End.");
                    return;
                }

                if (tInput0.PO_STATUS === "2") {
                    alert("First check Stock..");
                    return;
                }

                if (tInput0.PO_STATUS === "0") {
                    alert("First Required quantity calculation.");
                    return;
                }

                setIsProgress(true);

                serviceS0305_MRP_MANAGER
                    .processPoSettle(tInput0)
                    .then((data) => {
                        setIsProgress(false);

                        if (typeof data.graphQLErrors !== "undefined") {
                            console.log(
                                "Service processPoSettle error => " +
                                    JSON.stringify(data.graphQLErrors),
                            );
                            alert("Error Po Fix: 전산팀에 문의하세요 <br><br>Error during PO Fix: please contact the IT team.");
                            return;
                        }

                        if (data.length > 0) {
                            if (data[0].CODE.includes("SUCC")) {
                                alert(
                                    data[0].CODE + ". MRP Excel을 생성합니다 <br><br>MRP Excel will be generated.",
                                );
                                setDatasTBL_KSV_PO_MST([]);
                                searchTBL_KSV_PO_MST({
                                    __preserveSelection: true,
                                });
                            } else {
                                alert(data[0].CODE);
                            }
                        }
                    });
            });
    };

    const process_PO_SETTLE = () => {
        runProcessPoSettle(selectedTBL_KSV_PO_MST?.[0]);
    };

    const process_PO_CANCEL = async () => {
        const row = selectedTBL_KSV_PO_MST?.[0];
        if (!row) {
            alert("작업할 PO를 선택하세요.<br><br>Please select a PO to process.");
            return;
        }

        serviceS0305_MRP_MANAGER
            .mgrQuery_WORK_STATUS({
                PO_CD: row.PO_CD,
                OP_KIND: "0",
            })
            .then(async (data) => {
                if (typeof data.graphQLErrors !== "undefined") {
                    console.log(
                        "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                    return;
                }

                if (data.length > 0 && data[0].WORK_STATUS.includes("WORK")) {
                    alert(
                        `해당 PO(${row.PO_CD})에 대해서 Mrp or Revise작업중이거나 미처리 작업결과가 있습니다.<br><br>There are ongoing or unprocessed MRP/Revise tasks for this PO.`,
                    );
                    return;
                }

                const tInput0 = { ...row };
                delete tInput0.id;
                delete tInput0.__typename;

                if (
                    !(await confirm(
                        `${tInput0.PO_CD}을 Cancel 처리하시겠습니까? 작업된 모든 MRP을 지웁니다.<br><br>Do you want to cancel ${tInput0.PO_CD}? All processed MRP will be deleted.`,
                    ))
                ) {
                    return;
                }

                setIsProgress(true);

                serviceS0305_MRP_MANAGER
                    .processPoCancel(tInput0)
                    .then((data) => {
                        setIsProgress(false);

                        if (typeof data.graphQLErrors !== "undefined") {
                            console.log(
                                "Service processPoCancel error => " +
                                    JSON.stringify(data.graphQLErrors),
                            );
                            alert('Error Po Cancel: 전산팀에 문의하세요 <br><br>Error during PO Cancel: please contact the IT team.');
                            return;
                        }

                        if (data.length > 0) {
                            alert(data[0].CODE);
                            if (data[0].CODE.includes("SUCC")) {
                                setDatasTBL_KSV_ORDER_PIMST2([]);
                                searchTBL_KSV_PO_MST({
                                    __preserveSelection: true,
                                });
                            } else {
                                alert('Succes PO Cancel.');
                            }
                        }
                    });
            });
    };

    const process_ADJUST_LOSS = (argData) => {
        setIsProgress(true);

        serviceS0305_MRP_MANAGER.adjustLoss(argData).then((data) => {
            setIsProgress(false);

            if (typeof data.graphQLErrors !== "undefined") {
                console.log(
                    "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                        JSON.stringify(data.graphQLErrors),
                );
                return;
            }

            if (data.length > 0 && data[0].CODE.includes("SUCC")) {
                popup_PO_MAKE_MRP(argData);
            }
        });
    };

    const process_PO_MAKE_MRP = () => {
        const row = selectedTBL_KSV_PO_MST?.[0];
        if (!row) {
            alert("작업할 PO를 선택하세요.<br><br>Please select a PO to process.");
            return;
        }

        serviceS0305_MRP_MANAGER
            .mgrQuery_WORK_STATUS({
                PO_CD: row.PO_CD,
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

                if (data.length <= 0) return;

                const tWorkStatus = data[0].WORK_STATUS;
                const tJobCnt = parseInt(data[0].JOB_CNT);

                if (tWorkStatus.includes("WORK")) {
                    alert(
                        `해당 PO(${row.PO_CD})에 대해서 Mrp or Revise작업중입니다. 작업이 완료된후 작업할수 있습니다 <br><br>MRP or Revise is in progress for this PO. You can proceed after the task is completed.`,
                    );
                    return;
                }

                if (tWorkStatus !== "") {
                    alert(
                        `해당 PO(${row.PO_CD})의 Work Status가 비어있지 않습니다. Make MRP Pack 전에 Work Status Initialize를 먼저 누르세요.<br><br>Work status is not empty for this PO. Please click Work Status Initialize before Make MRP Pack.`,
                    );
                    return;
                }

                const tInput = { ...row };
                delete tInput.id;
                delete tInput.__typename;

                const _userInfo = serviceLib.getUserInfo();
                const tInput0 = {
                    PO_CD: tInput.PO_CD,
                    USER_ID: _userInfo.USER_ID,
                };

                if (tInput.PO_TYPE === "S") {
                    alert("샘플 PO는 계산할 수 없습니다.<br><br>Sample PO can't be calculated.");
                    return;
                }

                if (tInput.PO_STATUS === "5") {
                    alert("종료된 PO는 계산할 수 없습니다.<br><br>End PO can't be calculated.");
                    return;
                }

                if (tInput.PO_STATUS === "4") {
                    alert("수정된 PO는 계산할 수 없습니다. Revise를 사용하세요.<br><br>Fix PO can't be calculated. Use Revise.");
                    return;
                }

                if (tJobCnt > 0) {
                    alert("다른 PO에 대해서 MRP / Revise작업중에 있습니다. <br><br>MRP/Revise is in progress for another PO.");
                    return;
                }

                serviceS0305_MRP_MANAGER
                    .mgrQuery_ORDER_MRP_CNT({ PO_CD: tInput0.PO_CD })
                    .then(async (data) => {
                        if (typeof data.graphQLErrors !== "undefined") {
                            console.log(
                                "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                                    JSON.stringify(data.graphQLErrors),
                            );
                            return;
                        }

                        const tOrderMrpCnt = parseFloat(data.ORDER_MRP_CNT);
                        let tFlag = 0;

                        if (tOrderMrpCnt > 0) {
                            const tRetAction = await openMakeOrderMrpDialog();
                            if (tRetAction === "YES") {
                                tFlag = 1;
                            } else if (tRetAction === "NO") {
                                popup_PO_MAKE_MRP(tInput);
                                return;
                            } else {
                                return;
                            }
                        } else {
                            tFlag = 1;
                        }

                        if (tFlag === 1) {
                            serviceS0305_MRP_MANAGER
                                .makeOrderMrp(tInput0)
                                .then((data) => {
                                    if (
                                        typeof data.graphQLErrors !==
                                        "undefined"
                                    ) {
                                        console.log(
                                            "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                                                JSON.stringify(
                                                    data.graphQLErrors,
                                                ),
                                        );
                                        return;
                                    }

                                    if (
                                        data.length > 0 &&
                                        data[0].CODE.includes("SUCC")
                                    ) {
                                        process_ADJUST_LOSS(tInput);
                                    }
                                });
                        }
                    });
            });
    };

    const popup_PO_MAKE_MRP = (rowArg) => {
        const row = rowArg || selectedTBL_KSV_PO_MST?.[0];
        if (!row) {
            alert("작업할 PO를 선택하세요.<br><br>Please select a PO to process.");
            return;
        }

        const _userInfo = serviceLib.getUserInfo();

        sessionStorage.setItem(
            S0305_SEARCH_STORAGE_KEY,
            JSON.stringify(dataQRY_KSV_PO_MST),
        );

        window.parent.postMessage(
            {
                func: "call_url",
                message: {
                    key: "2-12",
                    label: "Make MRP",
                    icon: "pi pi-fw pi-user-edit",
                    url1: `S030510_PO_MAKE_MRP?PO_CD=${row.PO_CD}&PO_SEQ=${row.PO_SEQ}&USER_ID=${_userInfo.USER_ID}`,
                },
            },
            "*",
        );
    };

    /* QRY KSV_PO_MST*/
    const [dataQRY_KSV_PO_MST, setDataQRY_KSV_PO_MST] =
        useState(emptyQRY_KSV_PO_MST);

    const [datasQRY_KSV_PO_MST_PO_TYPE, setDatasQRY_KSV_PO_MST_PO_TYPE] =
        useState([]);
    const [dataQRY_KSV_PO_MST_PO_TYPE, setDataQRY_KSV_PO_MST_PO_TYPE] =
        useState({});

    const onDropdownChangeQRY_KSV_PO_MST_PO_TYPE = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataQRY_KSV_PO_MST = { ...dataQRY_KSV_PO_MST };

        let tTypeVal = _dataQRY_KSV_PO_MST[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_PO_MST[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_PO_MST[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_PO_MST(_dataQRY_KSV_PO_MST);
        setDataQRY_KSV_PO_MST_PO_TYPE(e.value);
    };

    const [datasQRY_KSV_PO_MST_PO_STATUS, setDatasQRY_KSV_PO_MST_PO_STATUS] =
        useState([]);
    const [dataQRY_KSV_PO_MST_PO_STATUS, setDataQRY_KSV_PO_MST_PO_STATUS] =
        useState({});

    const onDropdownChangeQRY_KSV_PO_MST_PO_STATUS = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataQRY_KSV_PO_MST = { ...dataQRY_KSV_PO_MST };

        let tTypeVal = _dataQRY_KSV_PO_MST[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_PO_MST[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_PO_MST[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_PO_MST(_dataQRY_KSV_PO_MST);
        setDataQRY_KSV_PO_MST_PO_STATUS(e.value);
    };

    const [datasQRY_KSV_PO_MST_REG_USER, setDatasQRY_KSV_PO_MST_REG_USER] =
        useState([]);
    const [dataQRY_KSV_PO_MST_REG_USER, setDataQRY_KSV_PO_MST_REG_USER] =
        useState({});

    const onDropdownChangeQRY_KSV_PO_MST_REG_USER = (e, name) => {
        let val = (e.value && e.value.USER_ID) || "";

        let _dataQRY_KSV_PO_MST = { ...dataQRY_KSV_PO_MST };

        let tTypeVal = _dataQRY_KSV_PO_MST[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_PO_MST[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_PO_MST[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_PO_MST(_dataQRY_KSV_PO_MST);
        setDataQRY_KSV_PO_MST_REG_USER(e.value);
    };

    const onInputChangeQRY_KSV_PO_MST_ORDER_CD = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_PO_MST = { ...dataQRY_KSV_PO_MST };

        let tTypeVal = _dataQRY_KSV_PO_MST[`${name}`];
        if (typeof tTypeVal === "string") _dataQRY_KSV_PO_MST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_PO_MST[`${name}`] = parseInt(val);

        setDataQRY_KSV_PO_MST(_dataQRY_KSV_PO_MST);
    };

    const onInputChangeQRY_KSV_PO_MST_STYLE_CD = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_PO_MST = { ...dataQRY_KSV_PO_MST };

        let tTypeVal = _dataQRY_KSV_PO_MST[`${name}`];
        if (typeof tTypeVal === "string") _dataQRY_KSV_PO_MST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_PO_MST[`${name}`] = parseInt(val);

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

    const [datasQRY_KSV_PO_MST_BUYER_CD, setDatasQRY_KSV_PO_MST_BUYER_CD] =
        useState([]);
    const [dataQRY_KSV_PO_MST_BUYER_CD, setDataQRY_KSV_PO_MST_BUYER_CD] =
        useState({});

    const onInputChangeQRY_KSV_PO_MST_BUYER_CD = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_PO_MST = { ...dataQRY_KSV_PO_MST };

        let tTypeVal = _dataQRY_KSV_PO_MST[`${name}`];
        if (typeof tTypeVal === "string") _dataQRY_KSV_PO_MST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_PO_MST[`${name}`] = parseInt(val);

        setDataQRY_KSV_PO_MST(_dataQRY_KSV_PO_MST);
    };

    const onCalChangeQRY_KSV_PO_MST_S_PO_DATE = (e, name) => {
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

    const onCalChangeQRY_KSV_PO_MST_E_PO_DATE = (e, name) => {
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

    const resetQRY_KSV_PO_MST = () => {
        const { S_PO_DATE, E_PO_DATE } = dataQRY_KSV_PO_MST;

        setDataQRY_KSV_PO_MST({
            ...emptyQRY_KSV_PO_MST,
            S_PO_DATE,
            E_PO_DATE,
        });

        const resetPoType =
            datasQRY_KSV_PO_MST_PO_TYPE.find(
                (item) => item.CD_CODE === emptyQRY_KSV_PO_MST.PO_TYPE,
            ) || {};
        const resetPoStatus =
            datasQRY_KSV_PO_MST_PO_STATUS.find(
                (item) => item.CD_CODE === emptyQRY_KSV_PO_MST.PO_STATUS,
            ) || {};
        const resetRegUser =
            datasQRY_KSV_PO_MST_REG_USER.find(
                (item) => item.USER_ID === emptyQRY_KSV_PO_MST.REG_USER,
            ) || {};

        setDataQRY_KSV_PO_MST_PO_TYPE(resetPoType);
        setDataQRY_KSV_PO_MST_PO_STATUS(resetPoStatus);
        setDataQRY_KSV_PO_MST_REG_USER(resetRegUser);
        setDataQRY_KSV_PO_MST_BUYER_CD({});
    };

    useEffect(() => {
        const nextPoType =
            datasQRY_KSV_PO_MST_PO_TYPE.find(
                (item) => item.CD_CODE === dataQRY_KSV_PO_MST.PO_TYPE,
            ) || {};
        const nextPoStatus =
            datasQRY_KSV_PO_MST_PO_STATUS.find(
                (item) => item.CD_CODE === dataQRY_KSV_PO_MST.PO_STATUS,
            ) || {};
        const nextRegUser =
            datasQRY_KSV_PO_MST_REG_USER.find(
                (item) => item.USER_ID === dataQRY_KSV_PO_MST.REG_USER,
            ) || {};

        setDataQRY_KSV_PO_MST_PO_TYPE(nextPoType);
        setDataQRY_KSV_PO_MST_PO_STATUS(nextPoStatus);
        setDataQRY_KSV_PO_MST_REG_USER(nextRegUser);
    }, [
        dataQRY_KSV_PO_MST.PO_STATUS,
        dataQRY_KSV_PO_MST.PO_TYPE,
        dataQRY_KSV_PO_MST.REG_USER,
        datasQRY_KSV_PO_MST_PO_STATUS,
        datasQRY_KSV_PO_MST_PO_TYPE,
        datasQRY_KSV_PO_MST_REG_USER,
    ]);

    /* TABLE_KSV_PO_MST*/
    // DEFINE DATAGRID : TBL_KSV_PO_MST
    const [datasTBL_KSV_PO_MST, setDatasTBL_KSV_PO_MST] = useState([]);
    const dt_TBL_KSV_PO_MST = useRef(null);
    const [dataTBL_KSV_PO_MST, setDataTBL_KSV_PO_MST] =
        useState(emptyTBL_KSV_PO_MST);
    const [selectedTBL_KSV_PO_MST, setSelectedTBL_KSV_PO_MST] = useState([]);
    const [flagSelectModeTBL_KSV_PO_MST, setFlagSelectModeTBL_KSV_PO_MST] =
        useState(false);
    const [loadingTBL_KSV_PO_MST, setLoadingTBL_KSV_PO_MST] = useState(false);

    // DATAGRID CODE : TBL_KSV_PO_MST

    const onRowDoubleClickTBL_KSV_PO_MST = useCallback((argData0) => {
        var tRemark = "";
        var tColName = "";
        var tKeys = Object.keys(argData0.data);
        tKeys.forEach((col, i) => {
            var tValue = argData0.data[`${col}`];
            if (col === "REMARK") tRemark = tValue;
            if (tValue === argData0.originalEvent.target.innerText) {
                tColName = col;
            }
        });
        console.log("Col Name:" + tColName);
        if (tColName === "PO_CD9990") {
            popup_PO_HISTORY(argData0.data);
        }
    }, []);

    const onRowClickTBL_KSV_PO_MST = useCallback((event) => {
        let argTBL_KSV_PO_MST = event.data;
        if (flagSelectModeTBL_KSV_PO_MST) return;

        // Service : NawooAll:mgrQueryTBL_KSV_PO_MST
    }, [flagSelectModeTBL_KSV_PO_MST]);

    const searchTBL_KSV_PO_MST = useCallback((argData) => {
        const queryPatch = pickS0305SearchQuery(argData);
        const preserveSelection = argData?.__preserveSelection === true;
        const prevSelected = preserveSelection
            ? selectedTBL_KSV_PO_MST.map((row) => `${row.PO_CD}::${row.PO_SEQ}`)
            : [];
        var tClearObj = {};
        sessionStorage.setItem("S0305_SEL_INFO", JSON.stringify(tClearObj));

        if (!preserveSelection) {
            setSelectedTBL_KSV_PO_MST([]);
        }
        setDatasTBL_KSV_PO_MST([]);

        var tQry = { ...dataQRY_KSV_PO_MST, ...queryPatch };
        tQry.S_PO_DATE = "";
        tQry.E_PO_DATE = "";

        setLoadingTBL_KSV_PO_MST(true);
        serviceS0305_MRP_MANAGER.mgrQueryTBL_KSV_PO_MST(tQry).then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                setLoadingTBL_KSV_PO_MST(false);
                console.log("mgrQueryTBL_KSV_PO_MST call => " + data.length);
                const nextRows = data.map((col, i) => ({ ...col, id: `${i}` }));
                setDatasTBL_KSV_PO_MST(nextRows);

                if (preserveSelection) {
                    const selectedRows = nextRows.filter((row) =>
                        prevSelected.includes(`${row.PO_CD}::${row.PO_SEQ}`),
                    );
                    setSelectedTBL_KSV_PO_MST(selectedRows);
                }

                const autoPoFixTarget = getS0305AutoPoFixTarget();
                if (autoPoFixTarget) {
                    const targetRow = nextRows.find(
                        (row) =>
                            row.PO_CD === autoPoFixTarget.PO_CD &&
                            String(row.PO_SEQ ?? "") === autoPoFixTarget.PO_SEQ,
                    );

                    if (targetRow) {
                        setSelectedTBL_KSV_PO_MST([targetRow]);
                        sessionStorage.removeItem(S0305_AUTO_PO_FIX_KEY);
                        setTimeout(() => {
                            runProcessPoSettle(targetRow);
                        }, 0);
                    }
                }
            } else {
                console.log(
                    "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });
    }, [
        dataQRY_KSV_PO_MST,
        selectedTBL_KSV_PO_MST,
        serviceS0305_MRP_MANAGER,
    ]);

    const handleSearchInputKeyDown = (e) => {
        if (e.key !== "Enter") return;
        e.preventDefault();
        searchTBL_KSV_PO_MST();
    };

    const applyS0305SearchCondition = useCallback((queryArg) => {
        const nextQuery = {
            ...emptyQRY_KSV_PO_MST,
            ...pickS0305SearchQuery(queryArg),
        };

        setDataQRY_KSV_PO_MST(nextQuery);

        const nextPoType =
            datasQRY_KSV_PO_MST_PO_TYPE.find(
                (item) => item.CD_CODE === nextQuery.PO_TYPE,
            ) || {};
        const nextPoStatus =
            datasQRY_KSV_PO_MST_PO_STATUS.find(
                (item) => item.CD_CODE === nextQuery.PO_STATUS,
            ) || {};
        const nextRegUser =
            datasQRY_KSV_PO_MST_REG_USER.find(
                (item) => item.USER_ID === nextQuery.REG_USER,
            ) || {};

        setDataQRY_KSV_PO_MST_PO_TYPE(nextPoType);
        setDataQRY_KSV_PO_MST_PO_STATUS(nextPoStatus);
        setDataQRY_KSV_PO_MST_REG_USER(nextRegUser);
    }, [
        datasQRY_KSV_PO_MST_PO_STATUS,
        datasQRY_KSV_PO_MST_PO_TYPE,
        datasQRY_KSV_PO_MST_REG_USER,
    ]);

    const runS0305PendingRequery = useCallback((queryArg) => {
        const nextQuery = pickS0305SearchQuery(queryArg);
        if (Object.keys(nextQuery).length <= 0) return false;

        applyS0305SearchCondition(nextQuery);
        searchTBL_KSV_PO_MST({
            ...nextQuery,
            __preserveSelection: true,
        });
        sessionStorage.removeItem(S0305_REQUERY_STORAGE_KEY);
        return true;
    }, [applyS0305SearchCondition, searchTBL_KSV_PO_MST]);

    const search_ORDER_LIST = useCallback((argData) => {
        if (!argData) return;
        var tInObj = {};
        tInObj.PO_CD = argData.PO_CD;
        tInObj.BUYER_CD = "";

        setSelectedTBL_KSV_ORDER_PIMST2([]);
        setDatasTBL_KSV_ORDER_PIMST2([]);

        setLoadingTBL_KSV_ORDER_PIMST2(true);
        serviceS0305_MRP_MANAGER.mgrQuery_ORDER_LIST(tInObj).then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                setLoadingTBL_KSV_ORDER_PIMST2(false);
                console.log("mgrQueryTBL_KSV_PO_MST call => " + data.length);
                var tArray = data.map((col, i) => {
                    var tObj = { ...col };
                    tObj.id = i + 1;
                    return tObj;
                });
                setDatasTBL_KSV_ORDER_PIMST2(tArray);
            } else {
                console.log(
                    "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });
    }, [serviceS0305_MRP_MANAGER]);

    const onRowClick1TBL_KSV_PO_MST = useCallback((argData0) => {
        let argTBL_KSV_PO_MST = argData0;

        setDataTBL_KSV_PO_MST(argTBL_KSV_PO_MST);

        console.log(argData0);
        search_ORDER_LIST(argData0);
    }, [search_ORDER_LIST]);

    const handleSelectionChangeTBL_KSV_PO_MST = useCallback((e) => {
        const value = Array.isArray(e.value) ? e.value : e.value ? [e.value] : [];
        const one = value.length ? [value[value.length - 1]] : [];

        setFlagSelectModeTBL_KSV_PO_MST(true);
        setSelectedTBL_KSV_PO_MST(one);
        onRowClick1TBL_KSV_PO_MST(one[0] || null);
    }, [onRowClick1TBL_KSV_PO_MST]);

    const handleRowClickTBL_KSV_PO_MST = useCallback((e) => {
        const row = e.data;
        if (!row) return;
        const oneRow = [row];

        setFlagSelectModeTBL_KSV_PO_MST(true);
        setSelectedTBL_KSV_PO_MST(oneRow);
        onRowClick1TBL_KSV_PO_MST(row);

        onRowClickTBL_KSV_PO_MST(e);
    }, [onRowClick1TBL_KSV_PO_MST, onRowClickTBL_KSV_PO_MST]);

    /*TABLE KSV_ORDER_PIMST2*/
    // DEFINE DATAGRID : TBL_KSV_ORDER_PIMST2
    const [loadingTBL_KSV_ORDER_PIMST2, setLoadingTBL_KSV_ORDER_PIMST2] =
        useState(false);

    const [datasTBL_KSV_ORDER_PIMST2, setDatasTBL_KSV_ORDER_PIMST2] = useState(
        [],
    );
    const dt_TBL_KSV_ORDER_PIMST2 = useRef(null);
    const [dataTBL_KSV_ORDER_PIMST2, setDataTBL_KSV_ORDER_PIMST2] = useState(
        emptyTBL_KSV_ORDER_PIMST2,
    );
    const [selectedTBL_KSV_ORDER_PIMST2, setSelectedTBL_KSV_ORDER_PIMST2] =
        useState([]);
    const [
        flagSelectModeTBL_KSV_ORDER_PIMST2,
        setFlagSelectModeTBL_KSV_ORDER_PIMST2,
    ] = useState(false);

    const onRowClick1TBL_KSV_ORDER_PIMST2 = useCallback((argData0) => {
        var argData = {};

        if (typeof argData0.length !== "undefined") {
            argData = argData0[0];
        } else {
            argData = argData0;
        }

        let argTBL_KSV_ORDER_PIMST2 = argData;

        setDataTBL_KSV_ORDER_PIMST2(argTBL_KSV_ORDER_PIMST2);
    }, []);

    const onRowClickTBL_KSV_ORDER_PIMST2 = useCallback((event) => {
        let argTBL_KSV_ORDER_PIMST2 = event.data;
        if (flagSelectModeTBL_KSV_ORDER_PIMST2) return;

        // Service : NawooAll:mgrQueryTBL_KSV_ORDER_PIMST2
    }, [flagSelectModeTBL_KSV_ORDER_PIMST2]);

    const handleSelectionChangeTBL_KSV_ORDER_PIMST2 = useCallback((e) => {
        setFlagSelectModeTBL_KSV_ORDER_PIMST2(true);
        setSelectedTBL_KSV_ORDER_PIMST2(e.value);
        onRowClick1TBL_KSV_ORDER_PIMST2(e.value);
    }, [onRowClick1TBL_KSV_ORDER_PIMST2]);

    const poTable = useMemo(() => (
        <AFDataTable preventUnrelatedRerender
            ref={dt_TBL_KSV_PO_MST}
            size="small"
            value={datasTBL_KSV_PO_MST}
            tableStyle={{ tableLayout: "fixed", width: "100%" }}
            resizableColumns
            columnResizeMode="expand"
            showGridlines
            selection={selectedTBL_KSV_PO_MST}
            loading={loadingTBL_KSV_PO_MST}
            onSelectionChange={handleSelectionChangeTBL_KSV_PO_MST}
            onRowClick={handleRowClickTBL_KSV_PO_MST}
            className="datatable-responsive"
            onRowDoubleClick={onRowDoubleClickTBL_KSV_PO_MST}
            virtualScrollerOptions={{ itemSize: 20 }}
            totalRecords={datasTBL_KSV_PO_MST.length}
            emptyMessage=" "
            dataKey="id"
            responsiveLayout="scroll"
            scrollable
            scrollHeight="flex"
        >
            <AFColumn selectionMode="multiple" field="__checkbox__" reorderable={false} headerClassName="t-header" headerStyle={{ width: "3rem" }} ></AFColumn>
            <AFColumn field="PO_STATUS_NAME" header="PO Status" headerClassName="t-header" style={{ width: "7rem", flexBasis: "auto" }}></AFColumn>
            <AFColumn field="PO_CD" header="PO#" headerClassName="t-header" style={{ width: "7rem", flexBasis: "auto" }}></AFColumn>
            <AFColumn field="PO_SEQ" header="Seq" headerClassName="t-header" style={{ width: "3rem", flexBasis: "auto" }}></AFColumn>
            <AFColumn field="BUYER_NAME" header="Buyer" headerClassName="t-header" style={{ width: "12rem", flexBasis: "auto" }}></AFColumn>
            <AFColumn field="PO_TYPE_NAME" header="Kind" headerClassName="t-header" style={{ width: "7rem", flexBasis: "auto" }}></AFColumn>
            <AFColumn field="PO_TYPE" header="Kind" headerClassName="t-header" style={{ width: "3rem", flexBasis: "auto" }}></AFColumn>
            <AFColumn field="TARGET_ETA" header="Target ETA" headerClassName="t-header" style={{ width: "7rem", flexBasis: "auto" }} body={(rowData) => serviceLib.dateFormat(rowData.TARGET_ETA)}></AFColumn>
            <AFColumn field="MRP_PACK_FLAG" header="MRP Pack" headerClassName="t-header" style={{ width: "5rem", flexBasis: "auto" }}></AFColumn>
            <AFColumn field="DOMESTIC_FLAG" header="Domestic" headerClassName="t-header" style={{ width: "5rem", flexBasis: "auto" }}></AFColumn>
            <AFColumn field="IMPORT_FLAG" header="Import" headerClassName="t-header" style={{ width: "4rem", flexBasis: "auto" }}></AFColumn>
            <AFColumn field="FACTORY_FLAG" header="Factory" headerClassName="t-header" style={{ width: "4rem", flexBasis: "auto" }}></AFColumn>
            <AFColumn field="FACTORY2_FLAG" header="Factory" headerClassName="t-header" style={{ width: "4rem", flexBasis: "auto" }}></AFColumn>
            <AFColumn field="FACTORY3_FLAG" header="Factory" headerClassName="t-header" style={{ width: "4rem", flexBasis: "auto" }}></AFColumn>
            <AFColumn field="FACTORY4_FLAG" header="Factory" headerClassName="t-header" style={{ width: "4rem", flexBasis: "auto" }}></AFColumn>
            <AFColumn field="FACTORY5_FLAG" header="Factory" headerClassName="t-header" style={{ width: "4rem", flexBasis: "auto" }}></AFColumn>
            <AFColumn field="PURCHASE_REQUEST" header="Purchase Req" headerClassName="t-header" style={{ width: "7rem", flexBasis: "auto", textAlign: 'center' }} body={(rowData) => {
                const tVal = String(rowData.PURCHASE_REQUEST ?? "").trim();
                return tVal !== "" ? (
                    <i className="pi pi-check" style={{ color: "#16a34a", fontSize: "1.15rem", fontWeight: 700, lineHeight: 1 }} />
                ) : "";
            }} bodyStyle={{ textAlign: "center" }}></AFColumn>
            <AFColumn field="REG_DATETIME" header="Reg Date" headerClassName="t-header" style={{ width: "7rem", flexBasis: "auto" }} body={(rowData) => serviceLib.dateFormat(rowData.REG_DATETIME)}></AFColumn>
            <AFColumn field="REG_USER" header="Reg User" headerClassName="t-header" style={{ width: "6rem", flexBasis: "auto" }}></AFColumn>
            <AFColumn field="UPD_DATETIME" header="MRP Date" headerClassName="t-header" style={{ width: "7rem", flexBasis: "auto" }} body={(rowData) => serviceLib.dateFormat(rowData.UPD_DATETIME)}></AFColumn>
            <AFColumn field="UPD_USER" header="MRP User" headerClassName="t-header" style={{ width: "6rem", flexBasis: "auto" }}></AFColumn>
            <AFColumn field="WORK_STATUS" header="Work Status" headerClassName="t-header" style={{ width: "8rem", flexBasis: "auto" }}></AFColumn>
            <AFColumn field="REQ_STATUS" header="Req Status" headerClassName="t-header" style={{ width: "8rem", flexBasis: "auto" }}></AFColumn>
            <AFColumn field="P_STATUS_CD" header="Process" headerClassName="t-header" style={{ width: "8rem", flexBasis: "auto" }}></AFColumn>
        </AFDataTable>
    ), [
        datasTBL_KSV_PO_MST,
        selectedTBL_KSV_PO_MST,
        loadingTBL_KSV_PO_MST,
        handleSelectionChangeTBL_KSV_PO_MST,
        handleRowClickTBL_KSV_PO_MST,
        onRowDoubleClickTBL_KSV_PO_MST,
        serviceLib,
    ]);

    const orderListTable = useMemo(() => (
        <AFDataTable preventUnrelatedRerender
            tableStyle={{ tableLayout: "fixed", width: "100%" }}
            loading={loadingTBL_KSV_ORDER_PIMST2}
            ref={dt_TBL_KSV_ORDER_PIMST2}
            size="small"
            value={datasTBL_KSV_ORDER_PIMST2}
            resizableColumns
            columnResizeMode="expand"
            showGridlines
            selectionMode="checkbox"
            selection={selectedTBL_KSV_ORDER_PIMST2}
            onSelectionChange={handleSelectionChangeTBL_KSV_ORDER_PIMST2}
            onRowClick={onRowClickTBL_KSV_ORDER_PIMST2}
            dataKey="id"
            rowClassName={(rowData) => ({ "row-cancel": rowData.ORDER_STATUS_NAME === "Cancel" })}
            className="datatable-responsive"
            virtualScrollerOptions={{ itemSize: 20 }}
            emptyMessage=" "
            responsiveLayout="scroll"
            scrollable
            scrollHeight="235px"
        >
            <AFColumn field="REF_ORDER_NO" headerClassName="t-header" header="Buyer.Po" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }}></AFColumn>
            <AFColumn field="PO_CD" headerClassName="t-header" header="PO#" headerStyle={{ width: "7rem", height: "1.8rem" }} bodyStyle={{ width: "7rem" }}></AFColumn>
            <AFColumn field="ORDER_CD" headerClassName="t-header" header="ORDER#" headerStyle={{ width: "7rem", height: "1.8rem" }} bodyStyle={{ width: "7rem" }}></AFColumn>
            <AFColumn field="STYLE_NAME" headerClassName="t-header" header="Style" headerStyle={{ width: "24rem", height: "1.8rem" }} bodyStyle={{ width: "24rem" }}></AFColumn>
            <AFColumn field="TOT_CNT" headerClassName="t-header" header="Qty" headerStyle={{ width: "7rem", height: "1.8rem" }} bodyStyle={{ width: "7rem", textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.TOT_CNT)}></AFColumn>
            <AFColumn field="UNIT" headerClassName="t-header" header="Unit" headerStyle={{ width: "4rem", height: "1.8rem" }} bodyStyle={{ width: "4rem" }}></AFColumn>
            <AFColumn field="PRICE_TERM" headerClassName="t-header" header="Term" headerStyle={{ width: "7rem", height: "1.8rem" }} bodyStyle={{ width: "7rem" }}></AFColumn>
            <AFColumn field="AVR_PRICE" headerClassName="t-header" header="U.Price" headerStyle={{ width: "7rem", height: "1.8rem" }} bodyStyle={{ width: "7rem", textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.AVR_PRICE, 2)}></AFColumn>
            <AFColumn field="AMT" headerClassName="t-header" header="Amt" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem", textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.AMT, 2)}></AFColumn>
            <AFColumn field="CURR_CD" headerClassName="t-header" header="Curr" headerStyle={{ width: "4rem", height: "1.8rem" }} bodyStyle={{ width: "4rem" }}></AFColumn>
            <AFColumn field="DUE_DATE" headerClassName="t-header" header="ETD" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }} body={(rowData) => serviceLib.dateFormat(rowData.DUE_DATE)}></AFColumn>
            <AFColumn field="STYLE_CD" headerClassName="t-header" header="Style#" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }}></AFColumn>
            <AFColumn field="ORDER_CD2" headerClassName="t-header" header="자재누락여부" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }}></AFColumn>
            <AFColumn field="ORDER_STATUS_NAME" headerClassName="t-header" header="Order Status" headerStyle={{ width: "10rem", height: "1.8rem" }} bodyStyle={{ width: "10rem" }}></AFColumn>
        </AFDataTable>
    ), [
        loadingTBL_KSV_ORDER_PIMST2,
        datasTBL_KSV_ORDER_PIMST2,
        selectedTBL_KSV_ORDER_PIMST2,
        handleSelectionChangeTBL_KSV_ORDER_PIMST2,
        onRowClickTBL_KSV_ORDER_PIMST2,
        serviceLib,
    ]);

    useEffect(() => {
        let mPoCd = "";
        let mPoSeq = "";

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
                    mPoCd = tObj.value;
                }
                if (tCols[0].includes("PO_SEQ")) {
                    tObj.key = tCols[0];
                    tObj.value = tCols[1];
                    mPoSeq = tObj.value;
                }
            });
        }

        var tRetDate = serviceLib.getCurrDate().substring(0, 8);
        serviceS0305_MRP_MANAGER.mgrQueryCODE().then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                console.log(
                    "ServiceMgrKCD_BUYER.mgr1KcdStyle call => " + data.length,
                );
                setDatasQRY_KSV_PO_MST_BUYER_CD(data.BUYER_CD);
                setDataQRY_KSV_PO_MST_BUYER_CD(data.BUYER_CD[0]);

                setDatasQRY_KSV_PO_MST_PO_TYPE(data.PO_TYPE);
                setDataQRY_KSV_PO_MST_PO_TYPE(data.PO_TYPE[0]);

                setDatasQRY_KSV_PO_MST_PO_STATUS(data.PO_STATUS);
                setDataQRY_KSV_PO_MST_PO_STATUS(data.PO_STATUS[0]);

                setDatasQRY_KSV_PO_MST_REG_USER(data.REG_USER);
                setDataQRY_KSV_PO_MST_REG_USER(data.REG_USER[0]);

                var tObj = { ...dataQRY_KSV_PO_MST };
                tObj.S_PO_DATE = `${tRetDate.substring(0, 6)}01`;
                tObj.E_PO_DATE = tRetDate;
                setDataQRY_KSV_PO_MST(tObj);

                const pendingRequery = getS0305StoredQuery(
                    S0305_REQUERY_STORAGE_KEY,
                );
                if (pendingRequery) {
                    runS0305PendingRequery(pendingRequery);
                }
            } else {
                console.log(
                    "serviceS0305_MRP_MANAGER.mgrQueryCODE gql error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });

        if (mPoCd !== "") {
            var tQryObj = {};
            tQryObj.PO_CD = mPoCd;
            searchTBL_KSV_PO_MST(tQryObj);
        }
    }, []);

    useEffect(() => {
        const handleMessage = (event) => {
            if (event?.data?.func !== "requery_s0305_mrp_manager") return;

            const pendingRequery =
                getS0305StoredQuery(S0305_REQUERY_STORAGE_KEY) ||
                pickS0305SearchQuery(event?.data?.message?.searchCondition);

            if (Object.keys(pendingRequery || {}).length > 0) {
                runS0305PendingRequery(pendingRequery);
                return;
            }

            searchTBL_KSV_PO_MST({
                ...dataQRY_KSV_PO_MST,
                __preserveSelection: true,
            });
        };

        window.addEventListener("message", handleMessage);
        return () => window.removeEventListener("message", handleMessage);
    }, [dataQRY_KSV_PO_MST, runS0305PendingRequery, searchTBL_KSV_PO_MST]);

    useEffect(() => {
        var timeout = "";
        if (sessionStorage.getItem("S0305_SEL_INFO")) {
        } else {
            return;
        }
        var tSaveInfo0 = sessionStorage.getItem("S0305_SEL_INFO", "{}");
        var tSaveInfo = JSON.parse(tSaveInfo0);
        if (typeof tSaveInfo.PO_CD !== "undefined") {
            if (selectedTBL_KSV_PO_MST.length > 0) {
                var tSelObj = { ...selectedTBL_KSV_PO_MST[0] };
                var tArray = [];
                var tSelArray = [];
                datasTBL_KSV_PO_MST.forEach((col, i) => {
                    var tObj = { ...col };
                    if (col.PO_CD !== tSelObj.PO_CD) tArray.push(col);
                    else {
                        tArray.push(tSaveInfo);
                        tSelArray.push(tSaveInfo);
                    }
                });
                setSelectedTBL_KSV_PO_MST(tSelArray);
                setDatasTBL_KSV_PO_MST(tArray);

                timeout = setTimeout(() => {
                    var tCurrTime = serviceLib.getCurrDate();
                    setIsTimer(tCurrTime);
                }, 1000); // 타이밍 이슈 방지를 위해 약간의 지연
            }
        }
        return () => clearTimeout(timeout);
    }, [isTimer]);

    const blankFn = () => {
        alert("기능구현중.<br><br>This feature is under implementation.");
    };

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
        <div className="af-div-main" style={{ width: "100%", minWidth: "123rem", display: "flex", flexDirection: "column", height: "100vh" }}>
            <div style={{ width: "123rem", backgroundColor: "white", marginTop: "0.5rem", flexShrink: 0 }}>
                <div style={{ display: "flex", alignItems: "center", height: "2.8rem", flexWrap: "nowrap" }}>
                    <span className="af-span-3-0" style={{ width: "17rem", flexShrink: 0 }}>
                        <p className="af-span-p" style={{ width: "7rem" }}>PO Kind</p>
                        <div className="af-span-div" style={{ width: "9rem" }}>
                            <Dropdown
                                style={{ width: "9rem" }}
                                id="id_PO_TYPE"
                                value={dataQRY_KSV_PO_MST_PO_TYPE}
                                onChange={(e) =>
                                    onDropdownChangeQRY_KSV_PO_MST_PO_TYPE(
                                        e,
                                        "PO_TYPE",
                                    )
                                }
                                options={datasQRY_KSV_PO_MST_PO_TYPE}
                                optionLabel="CD_NAME"
                                placeholder=""
                            ></Dropdown>
                        </div>
                    </span>
                    <span className="af-span-3-0" style={{ width: "17rem", flexShrink: 0 }}>
                        <p className="af-span-p" style={{ width: "7rem" }}>PO Status</p>
                        <div className="af-span-div" style={{ width: "9rem" }}>
                            <Dropdown
                                style={{ width: "9rem" }}
                                id="id_PO_STATUS"
                                value={dataQRY_KSV_PO_MST_PO_STATUS}
                                onChange={(e) =>
                                    onDropdownChangeQRY_KSV_PO_MST_PO_STATUS(
                                        e,
                                        "PO_STATUS",
                                    )
                                }
                                options={datasQRY_KSV_PO_MST_PO_STATUS}
                                optionLabel="CD_NAME"
                                placeholder=""
                            ></Dropdown>
                        </div>
                    </span>
                    <span className="af-span-3-0" style={{ width: "13rem", flexShrink: 0 }}>
                        <p className="af-span-p" style={{ width: "3rem" }}>PO#</p>
                        <div className="af-span-div" style={{ width: "9rem" }}>
                            <InputText
                                style={{ width: "9rem" }}
                                id="id_PO_CD"
                                value={dataQRY_KSV_PO_MST.PO_CD}
                                onKeyDown={handleSearchInputKeyDown}
                                onChange={(e) =>
                                    onInputChangeQRY_KSV_PO_MST_PO_CD(e, "PO_CD")
                                }
                            />
                        </div>
                    </span>
                    <span className="af-span-3-0" style={{ width: "13rem", flexShrink: 0 }}>
                        <p className="af-span-p" style={{ width: "3rem" }}>Order#</p>
                        <div className="af-span-div" style={{ width: "9rem" }}>
                            <InputText
                                style={{ width: "9rem" }}
                                id="id_PO_CD"
                                value={dataQRY_KSV_PO_MST.ORDER_CD}
                                onKeyDown={handleSearchInputKeyDown}
                                onChange={(e) =>
                                    onInputChangeQRY_KSV_PO_MST_ORDER_CD(
                                        e,
                                        "ORDER_CD",
                                    )
                                }
                            />
                        </div>
                    </span>
                    <span className="af-span-3-0" style={{ width: "17rem", flexShrink: 0 }}>
                        <p className="af-span-p" style={{ width: "7rem" }}>MRP Date</p>
                        <div className="af-span-div" style={{ width: "9rem" }}>
                            <Calendar
                                showButtonBar
                                style={{ width: "9rem" }}
                                dateFormat="yy-mm-dd"
                                id="id_S_PO_DATE"
                                value={changeDateVal(dataQRY_KSV_PO_MST.S_PO_DATE)}
                                onChange={(e) =>
                                    onCalChangeQRY_KSV_PO_MST_S_PO_DATE(
                                        e,
                                        "S_PO_DATE",
                                    )
                                }
                            />
                        </div>
                    </span>
                    <span className="af-span-3-0" style={{ width: "11rem", flexShrink: 0 }}>
                        <p className="af-span-p" style={{ width: "1rem" }}>~</p>
                        <div className="af-span-div" style={{ width: "9rem" }}>
                            <Calendar
                                showButtonBar
                                style={{ width: "9rem" }}
                                dateFormat="yy-mm-dd"
                                id="id_E_PO_DATE"
                                value={changeDateVal(dataQRY_KSV_PO_MST.E_PO_DATE)}
                                onChange={(e) =>
                                    onCalChangeQRY_KSV_PO_MST_E_PO_DATE(
                                        e,
                                        "E_PO_DATE",
                                    )
                                }
                            />
                        </div>
                    </span>
                    <span className="af-span-3-0" style={{ width: "13rem", flexShrink: 0 }}>
                        <div className="af-span-div" style={{ width: "12rem" }}>
                            <Button
                                label="PO Regist(Material)"
                                style={{ width: "12rem" }}
                                className="p-button-text orange"
                                onClick={popup_NEW_PO_SAMPLE}
                            />
                        </div>
                    </span>
                    <span className="af-span-3-0" style={{ width: "13rem", flexShrink: 0 }}>
                        <div className="af-span-div" style={{ width: "12rem" }}>
                            <Button
                                label="Work Status Initialize"
                                style={{ width: "12rem" }}
                                className="p-button-text orange"
                                onClick={workStatusInit}
                            />
                        </div>
                    </span>
                </div>
                {/* Row 2: Buyer# | Reg User | Style | Search/Reset | Seq List | Po Period | Stock Log | Timer */}
                <div style={{ display: "flex", alignItems: "center", height: "2.8rem", flexWrap: "nowrap" }}>
                    <span className="af-span-3-0" style={{ width: "17rem", flexShrink: 0 }}>
                        <p className="af-span-p" style={{ width: "7rem" }}>Buyer#</p>
                        <div className="af-span-div" style={{ width: "9rem" }}>
                            <InputText
                                style={{ width: "9rem" }}
                                id="id_PO_CD"
                                value={dataQRY_KSV_PO_MST.BUYER_CD}
                                onKeyDown={handleSearchInputKeyDown}
                                onChange={(e) =>
                                    onInputChangeQRY_KSV_PO_MST_BUYER_CD(
                                        e,
                                        "BUYER_CD",
                                    )
                                }
                            />
                        </div>
                    </span>
                    <span className="af-span-3-0" style={{ width: "17rem", flexShrink: 0 }}>
                        <p className="af-span-p" style={{ width: "7rem" }}>Reg User</p>
                        <div className="af-span-div" style={{ width: "9rem" }}>
                            <Dropdown
                                style={{ width: "9rem" }}
                                id="id_BUYER_CD"
                                filter
                                value={dataQRY_KSV_PO_MST_REG_USER}
                                onChange={(e) =>
                                    onDropdownChangeQRY_KSV_PO_MST_REG_USER(
                                        e,
                                        "REG_USER",
                                    )
                                }
                                options={datasQRY_KSV_PO_MST_REG_USER}
                                optionLabel="USER_NAME"
                                placeholder=""
                            ></Dropdown>
                        </div>
                    </span>
                    <span className="af-span-3-0" style={{ width: "13rem", flexShrink: 0 }}>
                        <p className="af-span-p" style={{ width: "3rem" }}>Style</p>
                        <div className="af-span-div" style={{ width: "9rem" }}>
                            <InputText
                                style={{ width: "9rem" }}
                                id="id_PO_CD"
                                value={dataQRY_KSV_PO_MST.STYLE_CD}
                                onKeyDown={handleSearchInputKeyDown}
                                onChange={(e) =>
                                    onInputChangeQRY_KSV_PO_MST_STYLE_CD(
                                        e,
                                        "STYLE_CD",
                                    )
                                }
                            />
                        </div>
                    </span>
                    <span className="af-span-3-0" style={{ width: "16rem", flexShrink: 0 }}>
                        <div className="af-span-div" style={{ width: "15rem", display: "flex", gap: "0.5rem" }}>
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
                                onClick={searchTBL_KSV_PO_MST}
                            />
                            <Button
                                label="Reset"
                                style={{ width: "7rem" }}
                                className="p-button-text"
                                onClick={resetQRY_KSV_PO_MST}
                            />
                        </div>
                    </span>
                    <span className="af-span-3-0" style={{ width: "9rem", flexShrink: 0 }}>
                        <div className="af-span-div" style={{ width: "8rem" }}>
                            <Button
                                label="Seq List"
                                style={{ width: "8rem" }}
                                className="p-button-text green"
                                onClick={search_REPORT_SEQ_LIST}
                            />
                        </div>
                    </span>
                    <span className="af-span-3-0" style={{ width: "9rem", flexShrink: 0 }}>
                        <div className="af-span-div" style={{ width: "8rem" }}>
                            <Button
                                label="Po Period"
                                style={{ width: "8rem" }}
                                className="p-button-text green"
                                onClick={search_REPORT_SEQ_LIST2}
                            />
                        </div>
                    </span>
                    <span className="af-span-3-0" style={{ width: "9rem", flexShrink: 0 }}>
                        <div className="af-span-div" style={{ width: "8rem" }}>
                            <Button
                                label="Stock Log"
                                style={{ width: "8rem" }}
                                className="p-button-text green"
                                onClick={search_REPORT_STOCK_LOG}
                            />
                        </div>
                    </span>
                    <span className="af-span-3-0" style={{ width: "8rem", flexShrink: 0 }}>
                        <div className="af-span-div" style={{ width: "7rem" }}>
                            {isTimer}
                        </div>
                    </span>
                </div>
            </div>

            <div
                className="af-div-first"
                style={{ width: "100%", flex: 1, minHeight: 0 }}
            >
                {poTable}
            </div>

            <div
                className="af-div-first"
                style={{
                    width: "100%",
                    maxWidth: "123rem",
                    minHeight: "6rem",
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.75rem",
                    margin: "10px 0px -20px 10px",
                    flexShrink: 0,
                }}
            >
                <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
                    <Button
                        style={{ width: "13rem" }}
                        label="Make MRP Pack"
                        className="p-button-text orange"
                        onClick={process_PO_MAKE_MRP}
                    />
                    <Button
                        style={{ width: "13rem" }}
                        label="Stock Check"
                        className="p-button-text orange"
                        onClick={popup_STOCK_CHECK}
                    />
                    <Button
                        style={{ width: "13rem" }}
                        label="PO Fix"
                        className="p-button-text"
                        onClick={process_PO_SETTLE}
                    />
                    <Button
                        style={{ width: "13rem" }}
                        label="Purchase Request"
                        className="p-button-text"
                        onClick={process_PURCHASE_REQUEST}
                    />
                    <Button
                        style={{ width: "13rem" }}
                        label="PO Return"
                        className="p-button-text"
                        onClick={process_PO_CANCEL}
                    />
                    <div style={{ flex: 1 }} />
                    <Button
                        style={{ width: "13rem" }}
                        label="PO List"
                        className="p-button-text orange"
                        onClick={popup_PO_LIST}
                    />
                    <Button
                        style={{ width: "13rem" }}
                        label="Material Po List"
                        className="p-button-text orange"
                        onClick={popup_MATERIAL_PO_LIST}
                    />
                </div>

                <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
                    <Button
                        style={{ width: "13rem" }}
                        label="PO Revise"
                        className="p-button-text orange"
                        onClick={popup_REVISE}
                    />
                    <Button
                        style={{ width: "13rem" }}
                        label="Seq Delete"
                        className="p-button-text orange"
                        onClick={popup_DEL_MRP_PACK}
                    />
                    <Button
                        style={{ width: "13rem" }}
                        label="#PO End"
                        className="p-button-text"
                        onClick={blankFn}
                    />
                    <Button
                        style={{ width: "13rem" }}
                        label="Material Add"
                        className="p-button-text orange"
                        onClick={popup_PO_RECORD_MATL_ADD}
                    />
                    <div style={{ flex: 1 }} />
                    <Button
                        style={{ width: "13rem", marginRight: "20rem" }}
                        label="MRP Pack Down"
                        className="p-button-text orange"
                        onClick={popup_MRP_PACK}
                    />
                    <Button
                        style={{ width: "13rem" }}
                        label="MRP List"
                        className="p-button-text orange"
                        onClick={popup_MRP_LIST}
                    />
                </div>
            </div>

            <div
                className="af-div-first"
                style={{ width: "100%", height: "35rem", flexShrink: 0 }}
            >
                {orderListTable}
            </div>

            <Toast ref={toast} />

            <Dialog class="loadingModal" visible={isProgress} modal>
                <ProgressSpinner />
            </Dialog>

            <Dialog
                visible={createDialog}
                position="mid-center"
                header=""
                modal={true}
                className="p-fluid"
                onHide={hideDialog}
            >
                <iframe
                    src={urlIframe}
                    frameBorder="0"
                    width="1300px"
                    height="670px"
                    id="id1"
                    className="myClassname"
                    scrolling="yes"
                />
            </Dialog>

            <Dialog
                header="Confirm"
                visible={msgMakeOrderMrp}
                style={{ width: "fit-content", minWidth: "34rem", maxWidth: "42rem" }}
                onHide={() => setMsgMakeOrderMrp(false)}
                footer={footerContent}
            >
                <p className="m-0" style={{ fontSize: "1.2rem", lineHeight: "1.5", textAlign: "center" }}>
                    MRP by Order Seq=1 Create a new one?
                </p>
            </Dialog>
        </div>
    );
};

const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(S0305_MRP_MANAGER, comparisonFn);
