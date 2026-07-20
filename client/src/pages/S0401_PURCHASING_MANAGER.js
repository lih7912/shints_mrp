/* eslint-disable */
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AFDataTable } from "../components/AFDataTable";
import { AFColumn } from "../components/AFColumn";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { Tooltip } from "primereact/tooltip";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { OverlayPanel } from "primereact/overlaypanel";

import { ServiceLib } from "../service/service_lib/ServiceLib";
import { ServiceS0401_PURCHASING_MANAGER } from "../service/service_biz/ServiceS0401_PURCHASING_MANAGER";

import "./page_common.scss";

const moment = require("moment");

const emptyQRY_KSV_PO_MRP = {
    PU_STATUS: "",
    PU_CD: "",
    BUYER_CD: "",
    VENDOR_TYPE: "",
    S_MRP_DATE: "",
    E_MRP_DATE: "",
    USER_ID: "",
    PO_CD: "",
    VENDOR_CD: "",
    S_ORDER_DATE: "",
    E_ORDER_DATE: "",
    S_PAY_DATE: "",
    E_PAY_DATE: "",
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

const S0401_PURCHASING_MANAGER = () => {
    const serviceLibRef = useRef(null);
    if (!serviceLibRef.current) {
        serviceLibRef.current = new ServiceLib();
        serviceLibRef.current.loginConfirm();
    }
    const serviceLib = serviceLibRef.current;

    const serviceS0401_PURCHASING_MANAGER =
        new ServiceS0401_PURCHASING_MANAGER();

    const toast = useRef(null);
    const op = useRef(null);
    const dt_iframe = useRef(null);
    const dt_TBL_KSV_PO_MRP = useRef(null);
    const isMountedRef = useRef(true);

    // 컴포넌트 언마운트 시 cleanup
    useEffect(() => {
        return () => {
            isMountedRef.current = false;
        };
    }, []);

    const [dlgInfo, setDlgInfo] = useState(false);
    const [urlIframe, setUrlIframe] = useState("");

    const [dataQRY_KSV_PO_MRP, setDataQRY_KSV_PO_MRP] =
        useState(emptyQRY_KSV_PO_MRP);

    const [datasQRY_KSV_PO_MRP_USER_ID, setDatasQRY_KSV_PO_MRP_USER_ID] =
        useState([]);
    const [dataQRY_KSV_PO_MRP_USER_ID, setDataQRY_KSV_PO_MRP_USER_ID] =
        useState({});

    const [datasQRY_KSV_PO_MRP_BUYER_CD, setDatasQRY_KSV_PO_MRP_BUYER_CD] =
        useState([]);
    const [dataQRY_KSV_PO_MRP_BUYER_CD, setDataQRY_KSV_PO_MRP_BUYER_CD] =
        useState({});

    const [datasQRY_KSV_PO_MRP_PU_STATUS, setDatasQRY_KSV_PO_MRP_PU_STATUS] =
        useState([]);
    const [dataQRY_KSV_PO_MRP_PU_STATUS, setDataQRY_KSV_PO_MRP_PU_STATUS] =
        useState({});

    const [
        datasQRY_KSV_PO_MRP_VENDOR_TYPE,
        setDatasQRY_KSV_PO_MRP_VENDOR_TYPE,
    ] = useState([]);
    const [dataQRY_KSV_PO_MRP_VENDOR_TYPE, setDataQRY_KSV_PO_MRP_VENDOR_TYPE] =
        useState({});

    const [loadingTBL_KSV_PO_MRP, setLoadingTBL_KSV_PO_MRP] = useState(false);
    const [datasTBL_KSV_PO_MRP, setDatasTBL_KSV_PO_MRP] = useState([]);
    const [, setDataTBL_KSV_PO_MRP] = useState(emptyTBL_KSV_PO_MRP);
    const [selectedTBL_KSV_PO_MRP, setSelectedTBL_KSV_PO_MRP] = useState([]);

    const hideDlgInfo = () => {
        setDlgInfo(false);
    };

    const onInputChange = (setter) => (e, name) => {
        const value = e?.target?.value ?? "";
        setter((prev) => ({
            ...prev,
            [name]:
                typeof prev[name] === "number"
                    ? parseInt(value || 0, 10)
                    : value,
        }));
    };

    const onCalChange = (setter) => (e, name) => {
        const value = e?.value ? getDateVal(e.value) : "";
        setter((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const onDropdownChangeByKey =
        (setter, setterSelected, key) => (e, name) => {
            const value = e?.value?.[key] || "";
            setter((prev) => ({
                ...prev,
                [name]:
                    typeof prev[name] === "number"
                        ? parseInt(value || 0, 10)
                        : value,
            }));
            setterSelected(e.value);
        };

    const process_RESET = () => {
        setDataQRY_KSV_PO_MRP(emptyQRY_KSV_PO_MRP);
        setDataQRY_KSV_PO_MRP_PU_STATUS(datasQRY_KSV_PO_MRP_PU_STATUS[0] || {});
        setDataQRY_KSV_PO_MRP_VENDOR_TYPE(
            datasQRY_KSV_PO_MRP_VENDOR_TYPE[0] || {},
        );
        setDatasTBL_KSV_PO_MRP([]);
        setSelectedTBL_KSV_PO_MRP([]);
    };

    const fetch_LIST_2 = useCallback((baseCondition) => {
        const tObj0 = { ...baseCondition };

        setLoadingTBL_KSV_PO_MRP(true);

        serviceS0401_PURCHASING_MANAGER.mgrQuery_LIST_2(tObj0).then((data) => {
            if (!isMountedRef.current) return;
            setLoadingTBL_KSV_PO_MRP(false);

            if (typeof data.graphQLErrors === "undefined") {
                if (data.length > 0 && data[0].MESSAGE !== "") {
                    alert(data[0].MESSAGE);
                }
                const tArray = data.map((col, i) => ({
                    ...col,
                    id: i + 1,
                }));
                setDatasTBL_KSV_PO_MRP(tArray);
            } else {
                console.log(
                    "mgrQuery_PO_CD error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });
    }, []);

    const search_LIST_2 = (argData) => {
        let tObj0 = {};
        if (argData && typeof argData.PO_CD !== "undefined") {
            tObj0 = { ...argData };
        } else {
            tObj0 = { ...dataQRY_KSV_PO_MRP };
        }

        const tRetDate = serviceLib.getCurrDate().substring(0, 8);
        const tEDate = tRetDate;

        if (tObj0.S_MRP_DATE === "") {
            tObj0.S_MRP_DATE = moment(tEDate, "YYYYMMDD")
                .subtract(12, "months")
                .format("YYYYMMDD");
        }
        if (tObj0.E_MRP_DATE === "") {
            tObj0.E_MRP_DATE = tEDate;
        }

        if (
            tObj0.PU_STATUS === "" &&
            tObj0.PU_CD === "" &&
            tObj0.BUYER_CD === "" &&
            tObj0.VENDOR_TYPE === "" &&
            tObj0.S_MRP_DATE === "" &&
            tObj0.E_MRP_DATE === "" &&
            tObj0.USER_ID === "" &&
            tObj0.PO_CD === "" &&
            tObj0.VENDOR_CD === "" &&
            tObj0.S_ORDER_DATE === "" &&
            tObj0.E_ORDER_DATE === "" &&
            tObj0.S_PAY_DATE === "" &&
            tObj0.E_PAY_DATE === ""
        ) {
            alert("Buyer는 필수입력값 입니다.<br><br>Buyer is a required input value.");
            return;
        }

        setSelectedTBL_KSV_PO_MRP([]);
        setDatasTBL_KSV_PO_MRP([]);
        setLoadingTBL_KSV_PO_MRP(true);

        sessionStorage.setItem(
            "S0401_QRY_INFO",
            JSON.stringify(dataQRY_KSV_PO_MRP, null, 4),
        );

        fetch_LIST_2(tObj0);
    };

    const process_UPDATE_END = () => {
        if (selectedTBL_KSV_PO_MRP.length <= 0) {
            alert("Please select the data.");
            return;
        }

        const tInArray = [];

        selectedTBL_KSV_PO_MRP.forEach((col) => {
            if (
                col.PU_STATUS !== "END" &&
                col.BAL_STS_IN === "-" &&
                col.BAL_STS_OUT === "-" &&
                col.BAL_PAY === "-" &&
                col.BAL_FACIN === "-"
            ) {
                tInArray.push({ PU_CD: col.PU_CD });
            }
        });

        if (tInArray.length <= 0) {
            alert(
                "작업할 데이타가 없습니다. 데이타 상태를 확인해 주세요. End 처리는 입고,출고,결제,공장입고가 완료된 건에 한해서 처리 가능합니다.",
            );
            return;
        }

        serviceS0401_PURCHASING_MANAGER
            .mgrInsert_UPDATE_END(tInArray)
            .then((data) => {
            if (!isMountedRef.current) return;
                if (!isMountedRef.current) return;
                if (typeof data.graphQLErrors === "undefined") {
                    console.log("mgrInsert_STOCK_IN call => " + data.length);
                    if (data.length > 0) {
                        alert(data[0].CODE);
                        if (data[0].CODE.includes("SUCC")) {
                            search_LIST_2({});
                        }
                    }
                } else {
                    toast.current?.show({
                        severity: "success",
                        summary: "Fail:Stock_in",
                        detail: "",
                        life: 3000,
                    });
                }
            });
    };

    const popup_INSERT_DEBIT = () => {
        if (selectedTBL_KSV_PO_MRP.length <= 0) {
            alert("Please select the data.");
            return;
        }
        if (selectedTBL_KSV_PO_MRP.length > 1) {
            alert("Please select 1 data only.");
            return;
        }

        const tObj = { ...selectedTBL_KSV_PO_MRP[0] };

        if (parseFloat(tObj.LC_AMT) > 0) {
            alert("Debit cannot be generated for LC payment.");
            return;
        }

        const tPoCdArray = tObj.PO_CD.split("/");
        if (tPoCdArray.length > 1) {
            alert("PUs with multiple POs can register Debit on info.");
            return;
        }

        const tSaveObj = {
            PO_CD: tObj.PO_CD,
            ORDER_CD: "",
            BUYER_CD: tObj.BUYER_CD,
            BUYER_NAME: tObj.BUYER_NAME,
            CURR_CD: tObj.CURR_CD,
            TOT_AMT: String(tObj.PU_AMT),
            VENDOR_CD: tObj.VENDOR_CD,
            VENDOR_NAME: tObj.VENDOR_NAME,
            FACTORY_CD: tObj.FACTORY_CD,
            PU_CD: tObj.PU_CD,
        };

        window.localStorage.setItem(
            "S0702_DEBIT_NOTE",
            JSON.stringify(tSaveObj),
        );

        const tUrl2 = `S0702_DEBIT_NOTE?PO_CD=${tSaveObj.PO_CD}&ORDER_CD=${tSaveObj.ORDER_CD}`;
        const tFuncObj = {
            func: "call_url",
            message: {
                key: "6-4",
                label: "Debit Note",
                icon: "pi pi-fw pi-user-edit",
                width: "1365px",
                height: "675px",
                url1: tUrl2,
            },
        };

        window.parent.postMessage(tFuncObj, "*");
    };

    const popup_REGIST = () => {
        const tQry = { ...dataQRY_KSV_PO_MRP };
        window.sessionStorage.setItem(
            "S0401_QRY_INFO",
            JSON.stringify(tQry, null, 4),
        );

        let tPuCd = "";
        if (selectedTBL_KSV_PO_MRP && selectedTBL_KSV_PO_MRP.length > 0) {
            const tOne = { ...selectedTBL_KSV_PO_MRP[0] };
            if (tOne.PU_STATUS === "Update") {
                tPuCd = tOne.PU_CD;
                window.localStorage.setItem(
                    "S040101_PURCHASER_REG",
                    JSON.stringify(tOne),
                );
            }
        }

        const tUrl2 = `S040101_PURCHASER_REG?PU_CD=${tPuCd}`;
        const tFuncObj = {
            func: "call_url",
            message: {
                key: "3-10",
                label: "Purchase Reg",
                icon: "pi pi-fw pi-user-edit",
                url1: tUrl2,
            },
        };

        window.parent.postMessage(tFuncObj, "*");
    };

    const popup_STS_IN = () => {
        if (selectedTBL_KSV_PO_MRP.length <= 0) {
            alert("Please select the data.");
            return;
        }

        const tQry = { ...dataQRY_KSV_PO_MRP };
        window.sessionStorage.setItem(
            "S0401_QRY_INFO",
            JSON.stringify(tQry, null, 4),
        );

        const validateSTSIN = (rows) => {
            const firstVendor = rows[0]?.VENDOR_NAME;

            if (rows.some((r) => r.PU_STATUS === "Registered")) {
                return "Only ordered data (Order Date input) can be STSIN.";
            }
            if (rows.some((r) => r.VENDOR_NAME !== firstVendor)) {
                return "Only the same SUPPLIER can be STS IN.";
            }
            if (rows.some((r) => !r.ORDER_DATE)) {
                return "Only those with Order Date entered can be STS-IN.";
            }

            return null;
        };

        const error = validateSTSIN(selectedTBL_KSV_PO_MRP);
        if (error) {
            alert(error);
            return;
        }

        window.sessionStorage.setItem(
            "S0401_STSIN_INFO",
            JSON.stringify(selectedTBL_KSV_PO_MRP, null, 4),
        );

        const tPuCd = selectedTBL_KSV_PO_MRP[0].PU_CD;
        const tUrl2 = `S0430_STSIN_RECORD?PU_CD=${tPuCd}`;
        const tFuncObj = {
            func: "call_url",
            message: {
                key: "3-2",
                label: "STSIN Record",
                icon: "pi pi-fw pi-user-edit",
                url1: tUrl2,
            },
        };

        window.parent.postMessage(tFuncObj, "*");
    };

    const popup_STS_OUT = () => {
        const tQry = { ...dataQRY_KSV_PO_MRP };
        window.sessionStorage.setItem(
            "S0401_QRY_INFO",
            JSON.stringify(tQry, null, 4),
        );

        if (selectedTBL_KSV_PO_MRP.length <= 0) {
            alert("Please select the data.");
            return;
        }

        let tPuCds = "";
        let tCheck = 0;
        let saveSupplier = "";
        let tCheckStatus = 0;

        selectedTBL_KSV_PO_MRP.forEach((col, i) => {
            if (i === 0) {
                tPuCds = `${col.PU_CD}`;
                saveSupplier = col.VENDOR_NAME;
            } else {
                tPuCds += `,${col.PU_CD}`;
                if (saveSupplier !== col.VENDOR_NAME) tCheck = 1;
                saveSupplier = col.VENDOR_NAME;
            }

            if (col.PU_STATUS === "Update") tCheckStatus = 1;
        });

        if (tCheck === 1) {
            alert("Only the same supplier can do STS OUT.");
            return;
        }

        window.sessionStorage.setItem(
            "S0401_STSOUT_INFO",
            JSON.stringify(selectedTBL_KSV_PO_MRP, null, 4),
        );

        const tUrl2 = `S0431_STSOUT_RECORD?PU_CD=${tPuCds}`;
        const tFuncObj = {
            func: "call_url",
            message: {
                key: "3-5",
                label: "STSOUT Record",
                icon: "pi pi-fw pi-user-edit",
                url1: tUrl2,
            },
        };

        window.parent.postMessage(tFuncObj, "*");
    };

    const popup_INFO = useCallback((e) => {
        const tObj = { ...e.data };
        const tUrl2 = `S040102_PURCHASER_INFO?PU_CD=${tObj.PU_CD}&PU_STATUS=${tObj.PU_STATUS}`;
        const tFuncObj = {
            func: "call_url",
            message: {
                key: "3-11",
                label: "Purchase Info",
                icon: "pi pi-fw pi-user-edit",
                url1: tUrl2,
            },
        };

        window.parent.postMessage(tFuncObj, "*");
    }, []);

    const exportExcelTBL_KSV_PO_MRP = () => {
        import("xlsx").then((xlsx) => {
            const worksheet = xlsx.utils.json_to_sheet(datasTBL_KSV_PO_MRP);
            const workbook = {
                Sheets: { data: worksheet },
                SheetNames: ["data"],
            };
            const excelBuffer = xlsx.write(workbook, {
                bookType: "xlsx",
                type: "array",
            });
            saveAsExcelFileTBL_KSV_PO_MRP(excelBuffer, "스타일목록");
        });
    };

    const saveAsExcelFileTBL_KSV_PO_MRP = (buffer, fileName) => {
        import("file-saver").then((module) => {
            if (module && module.default) {
                const EXCEL_TYPE =
                    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
                const EXCEL_EXTENSION = ".xlsx";
                const data = new Blob([buffer], { type: EXCEL_TYPE });
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

    useEffect(() => {
        const handleMessage = (e) => {
            if (e.data.message === "hideChildWindow") {
                console.log("window message=>" + e.data.message);
                hideDlgInfo();
            }
        };

        window.addEventListener("message", handleMessage, false);

        let tOpCode = "";
        let tOpCode1 = "";
        let tPuCd = "";

        const tUrls = window.location.href.split("?");
        if (tUrls.length > 1) {
            tUrls[1].split("&").forEach((col) => {
                const tCols = col.split("=");
                if (tCols[0] === "OP_CODE") tOpCode = tCols[1];
                if (tCols[0] === "OP_CODE1") tOpCode1 = tCols[1];
                if (tCols[0] === "PU_CD") tPuCd = tCols[1];
            });
        }

        let tSaveObjArray = [];
        if (tOpCode1 === "STSIN") {
            tSaveObjArray =
                JSON.parse(sessionStorage.getItem("S0401_STSIN_INFO")) || [];
        } else if (tOpCode1 === "STSOUT") {
            tSaveObjArray =
                JSON.parse(sessionStorage.getItem("S0401_STSOUT_INFO")) || [];
        }

        let tSaveObj = {};
        if (sessionStorage.getItem("S0401_QRY_INFO")) {
            tSaveObj =
                JSON.parse(sessionStorage.getItem("S0401_QRY_INFO")) || {};
        }

        if (
            tOpCode === "SEARCH" &&
            (tOpCode1 === "STSIN" || tOpCode1 === "STSOUT")
        ) {
            let tPuCd0 = "";
            tSaveObjArray.forEach((col, i) => {
                if (i === 0) tPuCd0 = `${col.PU_CD}`;
                else tPuCd0 += `,${col.PU_CD}`;
            });

            if (typeof tSaveObj.PU_CD !== "undefined") {
                setDataQRY_KSV_PO_MRP(tSaveObj);
            }

            const tQryObj = { ...emptyQRY_KSV_PO_MRP, PU_CD: tPuCd0 };
            search_LIST_2(tQryObj);
        } else if (tOpCode === "SEARCH" && tPuCd !== "") {
            let tInObj = { ...tSaveObj };
            if (tSaveObj && typeof tSaveObj.BUYER_CD !== "undefined") {
                tInObj = { ...emptyQRY_KSV_PO_MRP };
            }
            if (typeof tSaveObj.PU_CD !== "undefined") {
                setDataQRY_KSV_PO_MRP(tInObj);
            }
            const tQryObj = { ...emptyQRY_KSV_PO_MRP, PU_CD: tPuCd };
            search_LIST_2(tQryObj);
        } else {
            sessionStorage.setItem(
                "S0401_QRY_INFO",
                JSON.stringify(emptyQRY_KSV_PO_MRP, null, 4),
            );
        }

        serviceS0401_PURCHASING_MANAGER.mgrQuery_CODE({}).then((data) => {
            if (!isMountedRef.current) return;
            if (!isMountedRef.current) return;
            if (typeof data.graphQLErrors === "undefined") {
                setDatasQRY_KSV_PO_MRP_VENDOR_TYPE(data.VENDOR_TYPE);
                setDataQRY_KSV_PO_MRP_VENDOR_TYPE(data.VENDOR_TYPE[1] || {});
                setDataQRY_KSV_PO_MRP((prev) => ({
                    ...prev,
                    VENDOR_TYPE: data.VENDOR_TYPE[1]?.CD_CODE || "",
                }));

                setDatasQRY_KSV_PO_MRP_PU_STATUS(data.PU_STATUS);
                setDataQRY_KSV_PO_MRP_PU_STATUS(data.PU_STATUS[1] || {});

                setDatasQRY_KSV_PO_MRP_BUYER_CD(data.BUYER_CD);
                setDataQRY_KSV_PO_MRP_BUYER_CD(data.BUYER_CD[0] || {});

                setDatasQRY_KSV_PO_MRP_USER_ID(data.USER);
                setDataQRY_KSV_PO_MRP_USER_ID(data.USER[0] || {});

                const tEDate = serviceLib.getCurrDate().substring(0, 8);
                const tObj99 = {
                    ...emptyQRY_KSV_PO_MRP,
                    S_MRP_DATE: moment().startOf("year").format("YYYYMMDD"),
                    E_MRP_DATE: tEDate,
                    S_ORDER_DATE: "",
                    E_ORDER_DATE: "",
                    S_PAY_DATE: "",
                    E_PAY_DATE: "",
                    VENDOR_TYPE: data.VENDOR_TYPE[1].CD_CODE,
                };

                if (tOpCode !== "SEARCH") {
                    setDataQRY_KSV_PO_MRP(tObj99);
                }
            } else {
                console.log(
                    "mgrQuery_PO_CD error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });

        return () => {
            window.removeEventListener("message", handleMessage, false);
        };
    }, []);

    const handleTableSelectionChange = useCallback((e) => {
        setSelectedTBL_KSV_PO_MRP(e.value);
        if (e.value && e.value.length > 0) {
            setDataTBL_KSV_PO_MRP(e.value[0]);
        }
    }, []);

    const purchasingManagerTable = useMemo(() => {
        const afBodyPU_CD = (rowData) => <span>{rowData.PU_CD}</span>;
        const afBodyPO_CD = (rowData) => <span>{rowData.PO_CD}</span>;
        const afBodyVENDOR_NAME = (rowData) => <span>{rowData.VENDOR_NAME}</span>;

        return (
            <AFDataTable preventUnrelatedRerender
                ref={dt_TBL_KSV_PO_MRP}
                size="small"
                value={datasTBL_KSV_PO_MRP}
                tableStyle={{ tableLayout: "Fixed" }}
                resizableColumns
                columnResizeMode="expand"
                loading={loadingTBL_KSV_PO_MRP}
                metaKeySelection={false}
                showGridlines
                selectionMode="checkbox"
                selection={selectedTBL_KSV_PO_MRP}
                onRowDoubleClick={popup_INFO}
                onSelectionChange={handleTableSelectionChange}
                dataKey="id"
                className="datatable-responsive"
                virtualScrollerOptions={{ itemSize: 20 }}
                emptyMessage=" "
                responsiveLayout="scroll"
                scrollable
                scrollHeight="550px"
            >
                <AFColumn
                    selectionMode="multiple"
                    field="__checkbox__"
                    reorderable={false}
                    headerClassName="t-header"
                    headerStyle={{ width: "24px", minWidth: "24px", maxWidth: "24px" }}
                    style={{ width: "24px", minWidth: "24px", maxWidth: "24px" }}
                    forceWidth={true}
                />
                <AFColumn field="PU_STATUS" headerClassName="t-header" header="Status" className="af-col" style={{ width: "5rem" }} />
                <AFColumn field="REG_USER" headerClassName="t-header" header="Purchaser" className="af-col" style={{ width: "6rem" }} />
                <AFColumn field="BUYER_CD" headerClassName="t-header" header="Buyer Cd" className="af-col" style={{ width: "3rem" }} />
                <AFColumn field="PU_CD" headerClassName="t-header" header="PU#" className="af-col orange" style={{ width: "9rem" }} body={afBodyPU_CD} />
                <AFColumn field="PO_CD" headerClassName="t-header" header="PO#" className="af-col" style={{ width: "6.5rem" }} body={afBodyPO_CD} />
                <AFColumn field="VENDOR_NAME" headerClassName="t-header" header="Supplier" className="af-col" style={{ width: "10rem" }} body={afBodyVENDOR_NAME} />
                <AFColumn field="MATL_TYPE" headerClassName="t-header" header="Matl" className="af-col" style={{ width: "3rem" }} />
                <AFColumn field="NORMI" headerClassName="t-header" header="Normi" className="af-col" style={{ width: "3rem" }} />
                <AFColumn field="MRP_DATE" headerClassName="t-header" header="MRP Date" className="af-col" style={{ width: "6rem" }} body={(rowData) => serviceLib.dateFormat(rowData.MRP_DATE)} />
                <AFColumn field="TARGET_ETA" body={(rowData) => serviceLib.dateFormat(rowData.TARGET_ETA)} headerClassName="t-header" header="Target ETA" className="af-col" style={{ width: "6rem" }} />
                <AFColumn field="ORDER_DATE" body={(rowData) => serviceLib.dateFormat(rowData.ORDER_DATE)} headerClassName="t-header" header="Order Date" className="af-col" style={{ width: "6rem" }} />
                <AFColumn field="PI_FILE" headerClassName="t-header" header="PI File" className="af-col" style={{ width: "4rem" }} />
                <AFColumn field="DUE_DATE" body={(rowData) => serviceLib.dateFormat(rowData.DUE_DATE)} headerClassName="t-header" header="Due Date" className="af-col" style={{ width: "6rem" }} />
                <AFColumn field="EXPECT_DATE" body={(rowData) => serviceLib.dateFormat(rowData.EXPECT_DATE)} headerClassName="t-header" header="Ready Date" className="af-col" style={{ width: "6rem" }} />
                <AFColumn field="PAY_DATE" body={(rowData) => serviceLib.dateFormat(rowData.PAY_DATE)} headerClassName="t-header" header="Pay Date" className="af-col" style={{ width: "6rem" }} />
                <AFColumn field="PAY_TERM" headerClassName="t-header" header="Term" className="af-col" style={{ width: "3rem" }} />
                <AFColumn field="CURR_CD" headerClassName="t-header" header="Curr" className="af-col" style={{ width: "3rem" }} />
                <AFColumn field="PU_AMT" headerClassName="t-header" header="Amount" className="af-col" style={{ width: "6rem" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.PU_AMT, 0)} />
                <AFColumn field="BAL_STS_IN" headerClassName="t-header" header="Bal(STS IN)" className="af-col" style={{ width: "6rem" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.BAL_STS_IN, 0)} />
                <AFColumn field="BAL_STS_OUT" headerClassName="t-header" header="Bal(STS OUT)" className="af-col" style={{ width: "6rem" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.BAL_STS_OUT, 0)} />
                <AFColumn field="BAL_FACIN" headerClassName="t-header" header="Bal(FAC IN)" className="af-col" style={{ width: "6rem" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.BAL_FACIN, 0)} />
                <AFColumn field="BAL_PAY" headerClassName="t-header" header="Bal(Bill)" className="af-col" style={{ width: "6rem" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.BAL_PAY, 0)} />
                <AFColumn field="DEBIT_AMT" headerClassName="t-header" header="Debit" className="af-col" style={{ width: "6rem" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.DEBIT_AMT, 0)} />
                <AFColumn field="DEPOSIT_AMT" headerClassName="t-header" header="Deposit Amt" className="af-col" style={{ width: "6rem" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.DEPOSIT_AMT, 0)} />
                <AFColumn field="LC_AMT" headerClassName="t-header" header="Lc Amt" className="af-col" style={{ width: "6rem" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.LC_AMT, 0)} />
            </AFDataTable>
        );
    }, [
        datasTBL_KSV_PO_MRP,
        loadingTBL_KSV_PO_MRP,
        selectedTBL_KSV_PO_MRP,
        popup_INFO,
        handleTableSelectionChange,
        serviceLib,
    ]);

    function changeDateVal(argVal) {
        if (argVal === "") return argVal;
        if (typeof argVal !== "string") return null;

        const tYear = parseInt(argVal.substring(0, 4), 10);
        const tMon = parseInt(argVal.substring(4, 6), 10);
        const tDay = parseInt(argVal.substring(6, 8), 10);

        return new Date(tYear, tMon - 1, tDay);
    }

    function getDateVal(argVal) {
        const tDate = argVal;
        const mm = String(tDate.getMonth() + 1).padStart(2, "0");
        const dd = String(tDate.getDate()).padStart(2, "0");
        const yyyy = String(tDate.getFullYear());
        return yyyy + mm + dd;
    }

    return (
        <div className="af-div-main">
            <div style={{ height: "8rem" }}>
                <div className="af-div-first" style={{ width: "81rem" }}>
                    <span className="af-span-3-0" style={{ width: "15rem" }}>
                        <p className="af-span-p" style={{ width: "5rem" }}>Status</p>
                        <div className="af-span-div" style={{ width: "9rem" }}>
                            <Dropdown
                                style={{ width: "9rem" }}
                                id="id_PO_CD"
                                filter
                                value={dataQRY_KSV_PO_MRP_PU_STATUS}
                                onChange={(e) =>
                                    onDropdownChangeByKey(
                                        setDataQRY_KSV_PO_MRP,
                                        setDataQRY_KSV_PO_MRP_PU_STATUS,
                                        "CD_CODE",
                                    )(e, "PU_STATUS")
                                }
                                options={datasQRY_KSV_PO_MRP_PU_STATUS}
                                optionLabel="CD_NAME"
                                placeholder=""
                                editable
                            />
                        </div>
                    </span>

                    <span className="af-span-3-0" style={{ width: "12rem" }}>
                        <p className="af-span-p" style={{ width: "3rem" }}>PU#</p>
                        <div className="af-span-div" style={{ width: "6rem" }}>
                            <InputText
                                style={{ width: "9rem" }}
                                value={dataQRY_KSV_PO_MRP.PU_CD}
                                onChange={(e) =>
                                    onInputChange(setDataQRY_KSV_PO_MRP)(
                                        e,
                                        "PU_CD",
                                    )
                                }
                                placeholder="PU26-0100,0101"
                            />
                        </div>
                    </span>

                    <span className="af-span-3-0" style={{ width: "12rem" }}>
                        <p className="af-span-p" style={{ width: "4.5rem" }}>Buyer</p>
                        <div className="af-span-div" style={{ width: "6rem" }}>
                            <InputText
                                style={{ width: "6rem" }}
                                id="id_TARGET_ETA"
                                value={dataQRY_KSV_PO_MRP.BUYER_CD}
                                onChange={(e) =>
                                    onInputChange(setDataQRY_KSV_PO_MRP)(
                                        e,
                                        "BUYER_CD",
                                    )
                                }
                            />
                        </div>
                    </span>

                    <span className="af-span-3-0" style={{ width: "12rem" }}>
                        <p className="af-span-p" style={{ width: "3rem" }}>Type</p>
                        <div className="af-span-div" style={{ width: "8rem" }}>
                            <Dropdown
                                style={{ width: "9rem" }}
                                id="id_PO_CD"
                                filter
                                value={dataQRY_KSV_PO_MRP_VENDOR_TYPE}
                                onChange={(e) =>
                                    onDropdownChangeByKey(
                                        setDataQRY_KSV_PO_MRP,
                                        setDataQRY_KSV_PO_MRP_VENDOR_TYPE,
                                        "CD_CODE",
                                    )(e, "VENDOR_TYPE")
                                }
                                options={datasQRY_KSV_PO_MRP_VENDOR_TYPE}
                                optionLabel="CD_NAME"
                                placeholder=""
                                editable
                            />
                        </div>
                    </span>

                    <span className="af-span-3-0" style={{ width: "15rem" }}>
                        <p className="af-span-p" style={{ width: "5rem" }}>Mrp Date</p>
                        <div className="af-span-div" style={{ width: "9rem" }}>
                            <Calendar
                                showButtonBar
                                style={{ width: "9rem" }}
                                dateFormat="yy-mm-dd"
                                id="id_S_PO_DATE"
                                value={changeDateVal(
                                    dataQRY_KSV_PO_MRP.S_MRP_DATE,
                                )}
                                onChange={(e) =>
                                    onCalChange(setDataQRY_KSV_PO_MRP)(
                                        e,
                                        "S_MRP_DATE",
                                    )
                                }
                            />
                        </div>
                    </span>

                    <span className="af-span-3-0" style={{ width: "11rem" }}>
                        <p className="af-span-p" style={{ width: "1rem" }}>~</p>
                        <div className="af-span-div" style={{ width: "9rem" }}>
                            <Calendar
                                showButtonBar
                                style={{ width: "9rem" }}
                                dateFormat="yy-mm-dd"
                                id="id_S_PO_DATE"
                                value={changeDateVal(
                                    dataQRY_KSV_PO_MRP.E_MRP_DATE,
                                )}
                                onChange={(e) =>
                                    onCalChange(setDataQRY_KSV_PO_MRP)(
                                        e,
                                        "E_MRP_DATE",
                                    )
                                }
                            />
                        </div>
                    </span>

                    <span className="af-span-3" style={{ width: "15rem" }}>
                        <p className="af-span-p" style={{ width: "5rem" }}>Purchaser</p>
                        <div className="af-span-div" style={{ width: "9rem" }}>
                            <Dropdown
                                style={{ width: "9rem" }}
                                id="id_PO_CD"
                                filter
                                value={dataQRY_KSV_PO_MRP_USER_ID}
                                onChange={(e) =>
                                    onDropdownChangeByKey(
                                        setDataQRY_KSV_PO_MRP,
                                        setDataQRY_KSV_PO_MRP_USER_ID,
                                        "USER_ID",
                                    )(e, "USER_ID")
                                }
                                options={datasQRY_KSV_PO_MRP_USER_ID}
                                optionLabel="USER_NAME"
                                placeholder=""
                                editable
                            />
                        </div>
                    </span>

                    <span className="af-span-3" style={{ width: "11.5rem" }}>
                        <p className="af-span-p" style={{ width: "3rem" }}>PO#</p>
                        <div className="af-span-div" style={{ width: "6rem" }}>
                            <InputText
                                style={{ width: "9rem" }}
                                id="id_TARGET_ETA"
                                value={dataQRY_KSV_PO_MRP.PO_CD}
                                onChange={(e) =>
                                    onInputChange(setDataQRY_KSV_PO_MRP)(
                                        e,
                                        "PO_CD",
                                    )
                                }
                                placeholder="PO26-0100,0101"
                            />
                        </div>
                    </span>

                    <span className="af-span-3-0" style={{ width: "26rem" }}>
                        <p className="af-span-p" style={{ width: "5rem" }}>Supplier</p>
                        <div className="af-span-div" style={{ width: "20rem" }}>
                            <InputText
                                style={{ width: "20rem" }}
                                id="id_TARGET_ETA"
                                value={dataQRY_KSV_PO_MRP.VENDOR_CD}
                                onChange={(e) =>
                                    onInputChange(setDataQRY_KSV_PO_MRP)(
                                        e,
                                        "VENDOR_CD",
                                    )
                                }
                            />
                        </div>
                    </span>

                    <span className="af-span-3-0" style={{ width: "14rem" }}>
                        <p className="af-span-p" style={{ width: "4rem" }}>Ord Date</p>
                        <div className="af-span-div" style={{ width: "9rem" }}>
                            <Calendar
                                showButtonBar
                                style={{ width: "9rem" }}
                                dateFormat="yy-mm-dd"
                                id="id_S_PO_DATE"
                                value={changeDateVal(
                                    dataQRY_KSV_PO_MRP.S_ORDER_DATE,
                                )}
                                onChange={(e) =>
                                    onCalChange(setDataQRY_KSV_PO_MRP)(
                                        e,
                                        "S_ORDER_DATE",
                                    )
                                }
                            />
                        </div>
                    </span>

                    <span className="af-span-3-0" style={{ width: "11rem" }}>
                        <p className="af-span-p" style={{ width: "1rem" }}>~</p>
                        <div className="af-span-div" style={{ width: "9rem" }}>
                            <Calendar
                                showButtonBar
                                style={{ width: "9rem" }}
                                dateFormat="yy-mm-dd"
                                id="id_S_PO_DATE"
                                value={changeDateVal(
                                    dataQRY_KSV_PO_MRP.E_ORDER_DATE,
                                )}
                                onChange={(e) =>
                                    onCalChange(setDataQRY_KSV_PO_MRP)(
                                        e,
                                        "E_ORDER_DATE",
                                    )
                                }
                            />
                        </div>
                    </span>

                    <span className="af-span-3-0" style={{ width: "15rem" }}>
                        <p className="af-span-p" style={{ width: "5rem" }}>Pay Date</p>
                        <div className="af-span-div" style={{ width: "9rem" }}>
                            <Calendar
                                showButtonBar
                                style={{ width: "9rem" }}
                                dateFormat="yy-mm-dd"
                                id="id_S_PAY_DATE"
                                value={changeDateVal(
                                    dataQRY_KSV_PO_MRP.S_PAY_DATE,
                                )}
                                onChange={(e) =>
                                    onCalChange(setDataQRY_KSV_PO_MRP)(
                                        e,
                                        "S_PAY_DATE",
                                    )
                                }
                            />
                        </div>
                    </span>

                    <span className="af-span-3-0" style={{ width: "13rem" }}>
                        <p className="af-span-p" style={{ width: "0.5rem" }}>~</p>
                        <div className="af-span-div" style={{ width: "11rem" }}>
                            <Calendar
                                showButtonBar
                                style={{ width: "9rem" }}
                                dateFormat="yy-mm-dd"
                                id="id_E_PAY_DATE"
                                value={changeDateVal(
                                    dataQRY_KSV_PO_MRP.E_PAY_DATE,
                                )}
                                onChange={(e) =>
                                    onCalChange(setDataQRY_KSV_PO_MRP)(
                                        e,
                                        "E_PAY_DATE",
                                    )
                                }
                            />
                        </div>
                    </span>
                </div>

                <div className="af-div-second" style={{ width: "35rem" }}>
                    <span className="af-span-3-1" style={{ width: "8rem" }}>
                        <div
                            className="af-span-div-btn"
                            style={{ width: "7rem" }}
                        >
                            <Tooltip
                                className="menuCodeTooltip"
                                target="#btnSearch"
                                content="Alt+S"
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
                                onClick={search_LIST_2}
                            />
                        </div>
                    </span>
                    <span className="af-span-3-1" style={{ width: "8rem" }}>
                        <div
                            className="af-span-div-btn"
                            style={{ width: "7.5rem" }}
                        >
                            <Button
                                label="Reset"
                                style={{ width: "7.5rem" }}
                                className="p-button-text"
                                onClick={process_RESET}
                            />
                        </div>
                    </span>
                    <span className="af-span-3-1" style={{ width: "9rem" }}>
                        <div
                            className="af-span-div-btn"
                            style={{ width: "8.5rem" }}
                        >
                            <Button
                                label="End"
                                style={{ width: "8.5rem" }}
                                className="p-button-text"
                                onClick={process_UPDATE_END}
                            />
                        </div>
                    </span>
                    <span className="af-span-3-1" style={{ width: "8rem" }}>
                        <div
                            className="af-span-div-btn"
                            style={{ width: "7rem" }}
                        >
                            <Button
                                label="List"
                                style={{ width: "7rem" }}
                                className="p-button-text green"
                                onClick={exportExcelTBL_KSV_PO_MRP}
                            />
                        </div>
                    </span>

                    <span className="af-span-3-2" style={{ width: "8rem" }}>
                        <div
                            className="af-span-div-btn"
                            style={{ width: "7rem" }}
                        >
                            <Button
                                label="Regist"
                                style={{ width: "7rem" }}
                                className="p-button-text orange"
                                onClick={popup_REGIST}
                            />
                        </div>
                    </span>
                    <span className="af-span-3-2" style={{ width: "8rem" }}>
                        <div
                            className="af-span-div-btn"
                            style={{ width: "7.5rem" }}
                        >
                            <Button
                                label="STS IN"
                                style={{ width: "7.5rem" }}
                                className="p-button-text orange"
                                onClick={popup_STS_IN}
                            />
                        </div>
                    </span>
                    <span className="af-span-3-2" style={{ width: "9rem" }}>
                        <div
                            className="af-span-div-btn"
                            style={{ width: "8.5rem" }}
                        >
                            <Button
                                label="STS OUT"
                                style={{ width: "8.5rem" }}
                                className="p-button-text orange"
                                onClick={popup_STS_OUT}
                            />
                        </div>
                    </span>
                    <span className="af-span-3-2" style={{ width: "8rem" }}>
                        <div
                            className="af-span-div-btn"
                            style={{ width: "7rem" }}
                        >
                            <Button
                                label="Debit"
                                style={{ width: "7rem" }}
                                className="p-button-text orange"
                                onClick={popup_INSERT_DEBIT}
                            />
                        </div>
                    </span>
                </div>
            </div>

            <div
                className="af-div-first"
                style={{ width: "123rem", height: "50rem" }}
            >
                {purchasingManagerTable}
            </div>

            <Toast ref={toast} />

            <OverlayPanel
                style={{
                    width: "123rem",
                    height: "60rem",
                    marginLeft: "0rem",
                    marginTop: "0rem",
                }}
                ref={op}
                showCloseIcon
            >
                <iframe
                    src={urlIframe}
                    frameBorder="0"
                    ref={dt_iframe}
                    width="1360px"
                    height="670px"
                    id="id1"
                    className="myClassname"
                    scrolling="no"
                />
            </OverlayPanel>

            <Dialog
                visible={dlgInfo}
                position="top-right"
                style={{
                    width: "123rem",
                    height: "60rem",
                    marginLeft: "0rem",
                    marginTop: "0rem",
                    paddingLeft: "0rem",
                    paddingTop: "0rem",
                }}
                header="PU Info "
                modal
                className="p-fluid"
                onHide={hideDlgInfo}
            >
                <iframe
                    src={urlIframe}
                    frameBorder="0"
                    ref={dt_iframe}
                    width="1360px"
                    height="670px"
                    id="id1"
                    className="myClassname"
                    scrolling="no"
                />
            </Dialog>
        </div>
    );
};

const comparisonFn = (prevProps, nextProps) => {
    return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(S0401_PURCHASING_MANAGER, comparisonFn);
