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
import { MultiSelect } from "primereact/multiselect";
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
import { ServiceS0523_STOCK_MANAGER } from "../service/service_biz/ServiceS0523_STOCK_MANAGER";
import ExcelJS from "exceljs";

const moment = require("moment");

import "./page_common.scss";

const emptyKCD_CODE = {
    id: 0,
    CD_GROUP: "",
    CD_CODE: "",
    CD_NAME: "",
    CD_FLAG: "",
};

const emptyQRY_KSV_PO_MRP = {
    FACTORY_CD: "",
    BUYER_CD: "",
    STATUS_CD2: "",
    PO_CD: "",
    VENDOR_CD: "",
    S_STOCK_DATE: "",
    E_STOCK_DATE: "",
    IS_STOCK_DATE: "",
    S_REG_DATE: "",
    E_REG_DATE: "",
    IS_REG_DATE: "",
    RACK: "",
    KIND2: "",
    MATL_CD: "",
    DESC: "",
    COLOR: "",
    SPEC: "",
    OWNER_SHIP: "",
    REMAIN_QTY: "",
    AUTHORITY: "",
    CONDITION: "",
    PURPOSE: "",
    LOCATION: "",
    STOCK_IDX: "",
    ROOT_IDX: "",
};

const emptyQRY_KSV_PO_MRP1 = {
    BUYER_CD: "",
    PO_CD: "",
    VENDOR_CD: "",
    MRP_DATE: "",
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
    STOCK_DATE: "",
    CHARGER: "",
    OWNER_SHIP: "",
    REASON_MAKE: "",
    AUTHORITY: "",
    CONDITION: "",
    MANAGER: "",
    REMARK: "",
    REASON_REMARK: "",
    PLAN_REMARK: "",
    PURPOSE: "",
    RACK: "",
    LOCATION: "",
    WARE_CD: "",
    DEBIT_DATE: "",
    DEBIT_AMT: "",
    DEFECT_QTY: "",
    FACTORY_CD: "",
    BUYER_CD: "",
    STOCK_PRICE: "",
    STOCK_STATUS_1: "",
    STOCK_STATUS_S: "",
};

const emptyEDT_KSV_PO_MRP2 = {
    STOCK_DATE: "",
    CHARGER: "",
    OWNER_SHIP: "",
    REASON_MAKE: "",
    AUTHORITY: "",
    CONDITION: "",
    MANAGER: "",
    REMARK: "",
    REASON_REMARK: "",
    PLAN_REMARK: "",
    PURPOSE: "",
    RACK: "",
    LOCATION: "",
    WARE_CD: "",
    DEBIT_DATE: "",
    DEBIT_AMT: "",
    DEFECT_QTY: "",
    FACTORY_CD: "",
    BUYER_CD: "",
    STOCK_PRICE: "",
};


const S0523_STOCK_MANAGER = () => {
    const serviceLibRef = useRef(null);
    if (!serviceLibRef.current) {
        serviceLibRef.current = new ServiceLib();
        serviceLibRef.current.loginConfirm();
    }
    const serviceLib = serviceLibRef.current;
    const serviceS0523_STOCK_MANAGERRef = useRef(null);
    if (!serviceS0523_STOCK_MANAGERRef.current) serviceS0523_STOCK_MANAGERRef.current = new ServiceS0523_STOCK_MANAGER();
    const serviceS0523_STOCK_MANAGER = serviceS0523_STOCK_MANAGERRef.current;

    const toast = useRef(null);

    /* splitter 관련 */
    const [styleVal, setStyleVal] = useState({ width: "65vw" });

    // dialog
    const [urlIframe, setUrlIframe] = useState("");
    const [createDialog, setCreateDialog] = useState(false);
    const hideDialog = () => {
        setCreateDialog(false);
    };

    const renderConditionLabel = (option) => {
        if (!option) return "";

        const conditionName = option.CD_NAME || "";
        const conditionCode = option.CD_CODE || "";

        if (!conditionName && !conditionCode) {
            return "";
        }

        return (
            <div
                style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "0.5rem",
                }}
            >
                <span style={{ overflow: "hidden", textOverflow: "ellipsis" }}>
                    {conditionName}
                </span>
                {conditionCode ? (
                    <span
                        style={{
                            color: "#1e7f4f",
                            fontSize: "0.85rem",
                            flexShrink: 0,
                        }}
                    >
                        {conditionCode}
                    </span>
                ) : null}
            </div>
        );
    };

    const conditionItemTemplate = (option) => renderConditionLabel(option);

    const conditionValueTemplate = (option, props) => {
        if (!option) {
            return <span>{props.placeholder || ""}</span>;
        }

        const conditionName = option.CD_NAME || "";
        const conditionCode = option.CD_CODE || "";

        if (conditionName && conditionCode && conditionName !== conditionCode) {
            return <span>{`${conditionName} (${conditionCode})`}</span>;
        }

        return <span>{conditionName || conditionCode || props.placeholder || ""}</span>;
    };

    const renderReasonMakeLabel = (option) => {
        if (!option) return "";

        const reasonName = option.CD_NAME || "";
        const reasonCode = option.CD_CODE || "";

        if (!reasonName && !reasonCode) {
            return "";
        }

        return (
            <div
                style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "0.5rem",
                }}
            >
                <span style={{ overflow: "hidden", textOverflow: "ellipsis" }}>
                    {reasonName}
                </span>
                {reasonCode ? (
                    <span
                        style={{
                            color: "#1e7f4f",
                            fontSize: "0.85rem",
                            flexShrink: 0,
                        }}
                    >
                        {reasonCode}
                    </span>
                ) : null}
            </div>
        );
    };

    const reasonMakeItemTemplate = (option) => renderReasonMakeLabel(option);

    const reasonMakeValueTemplate = (option, props) => {
        if (!option) {
            return <span>{props.placeholder || ""}</span>;
        }

        const reasonName = option.CD_NAME || "";
        const reasonCode = option.CD_CODE || "";

        if (reasonName && reasonCode && reasonName !== reasonCode) {
            return <span>{`${reasonName} (${reasonCode})`}</span>;
        }

        return <span>{reasonName || reasonCode || props.placeholder || ""}</span>;
    };

    // Popup
    const popup_STOCK_HISTORY = (argData) => {
        var tUrl2 = `S0517_STOCK_HISTORY?STOCK_IDX=${argData.STOCK_IDX}`;
        var tValObj = {
            key: "5-13",
            label: "Stock I/O History",
            icon: "pi pi-fw pi-user-edit",
            url1: "S0517_STOCK_HISTORY",
        };
        var tArgObj = { ...tValObj };
        tArgObj.url1 = tUrl2;
        var tFuncObj = {};
        tFuncObj.func = "call_url";
        tFuncObj.message = { ...tArgObj };
        window.parent.postMessage(tFuncObj, "*");
    };

    const onRowDoubleClickTBL_KSV_PO_MRP = (event) => {
        if (typeof event.data.STOCK_IDX !== "undefined")
            popup_STOCK_HISTORY(event.data);
    };

    // Popup Update Qty
    const un_popup_update_qty = () => {
        setCreateDialog(false);
    };

    const popup_update_qty = () => {

        var _tObj0 = { ...selectedTBL_KSV_PO_MRP[0] };

        if (parseFloat(_tObj0.REMAIN_QTY) <= 0) {
            alert('Remain Qty 가 0보다 커야 수정이 가능합니다. ');
            return;
        }

        var tObj = { ...dataEDT_KSV_PO_MRP };
        tObj.DEFECT_QTY = _tObj0.REMAIN_QTY;

        setDataEDT_KSV_PO_MRP2(tObj);
        editEDT_KSV_PO_MRP2_OWNER_SHIP(tObj.OWNER_SHIP);
        editEDT_KSV_PO_MRP2_REASON_MAKE(tObj.REASON_MAKE);
        editEDT_KSV_PO_MRP2_AUTHORITY(tObj.AUTHORITY);
        editEDT_KSV_PO_MRP2_CONDITION(tObj.CONDITION);
        editEDT_KSV_PO_MRP2_MANAGER(tObj.MANAGER);
        editEDT_KSV_PO_MRP2_REASON_REMARK(tObj.REASON_REMARK);
        editEDT_KSV_PO_MRP2_PLAN_REMARK(tObj.PLAN_REMARK);
        editEDT_KSV_PO_MRP2_PURPOSE(tObj.PURPOSE);
        editEDT_KSV_PO_MRP2_WARE_CD(tObj.WARE_CD);
        editEDT_KSV_PO_MRP2_FACTORY_CD(tObj.FACTORY_CD);
        editEDT_KSV_PO_MRP2_BUYER_CD(tObj.BUYER_CD);
        setCreateDialog(true);
    };

    const process_UPDATE_QTY = () => {
        if (selectedTBL_KSV_PO_MRP.length <= 0) {
            alert(`No data is selected. Please select the data to work with.`);
            return;
        }

        var _tObj0 = { ...selectedTBL_KSV_PO_MRP[0] };

        if (parseFloat(_tObj0.REMAIN_QTY) <= 0) {
            alert('Remain Qty 가 0보다 커야 수정이 가능합니다. ');
            return;
        }

        var tInput = { ...dataEDT_KSV_PO_MRP2 };
        tInput.STOCK_IDX = _tObj0.STOCK_IDX;
        tInput.CHANGE_QTY = tInput.DEFECT_QTY; // 현재는  Defect Qty에 Stock qty가 들어가 있음. 260323
        tInput.STOCK_STATUS_S = dataEDT_KSV_PO_MRP.STOCK_STATUS_S; // 변경할 Stock Status

        var tInput1 = [...datasTBL_KSV_PO_MRP2];

        setLoadingTBL_KSV_PO_MRP(true);
        serviceS0523_STOCK_MANAGER
            .mgrUpdate_UPDATE_QTY(tInput, tInput1)
            .then((data) => {
                setLoadingTBL_KSV_PO_MRP(false);
                if (typeof data.graphQLErrors === "undefined") {
                    alert(data[0].CODE);
                    // process_RESET_EDT();
                    if (data[0].CODE.includes("SUCC")) {
                        // setSelectedTBL_KSV_PO_MRP([]);
                        setCreateDialog(false);
                        search_LIST_1();
                    }
                } else {
                    toast.current.show({
                        severity: "success",
                        summary: "Fail:Stock_in",
                        detail: "",
                        life: 3000,
                    });
                }
            });
    };

    // Search
    const process_RESET_QRY = () => {
        var tRetDate = serviceLib.getCurrDate().substring(0, 8);
        setDataQRY_KSV_PO_MRP(
            {
                ...emptyQRY_KSV_PO_MRP, 
                S_STOCK_DATE: `${tRetDate.substring(0, 6)}01`,
                E_STOCK_DATE:`${tRetDate}`,
                S_REG_DATE: `${tRetDate.substring(0, 6)}01`,
                E_REG_DATE:`${tRetDate}`,
                VENDOR_CD: "",
                REMAIN_QTY:
                    datasQRY_KSV_PO_MRP_REMAIN_QTY[0] &&
                    datasQRY_KSV_PO_MRP_REMAIN_QTY[0].CD_CODE
                        ? datasQRY_KSV_PO_MRP_REMAIN_QTY[0].CD_CODE
                        : "",
            }
        );

        setDataQRY_KSV_PO_MRP_FACTORY_CD({});
        setDataQRY_KSV_PO_MRP_BUYER_CD({});
        setDataQRY_KSV_PO_MRP_STATUS_CD2({});
        setDataQRY_KSV_PO_MRP_KIND2({});
        setDataQRY_KSV_PO_MRP_REMAIN_QTY(datasQRY_KSV_PO_MRP_REMAIN_QTY[0]);
        setDataQRY_KSV_PO_MRP_VENDOR_CD('');
        setDataQRY_KSV_PO_MRP_AUTHORITY(datasQRY_KSV_PO_MRP_AUTHORITY[0]);
        setDataQRY_KSV_PO_MRP_CONDITION(datasQRY_KSV_PO_MRP_CONDITION[0]);
        setDataQRY_KSV_PO_MRP_PURPOSE(datasQRY_KSV_PO_MRP_PURPOSE[0]);
        setDataQRY_KSV_PO_MRP_OWNER_SHIP([]);
                
        process_RESET_EDT();
    };

    const process_RESET_EDT = () => {
        setDataEDT_KSV_PO_MRP(emptyEDT_KSV_PO_MRP);
        editEDT_KSV_PO_MRP_OWNER_SHIP("");
        editEDT_KSV_PO_MRP_REASON_MAKE("");
        editEDT_KSV_PO_MRP_AUTHORITY("");
        editEDT_KSV_PO_MRP_CONDITION("");
        editEDT_KSV_PO_MRP_MANAGER("");
        editEDT_KSV_PO_MRP_REASON_REMARK("");
        editEDT_KSV_PO_MRP_PURPOSE("");
        editEDT_KSV_PO_MRP_WARE_CD("");
        editEDT_KSV_PO_MRP_FACTORY_CD("");
        setDatasTBL_KSV_PO_MRP([]);
    };

    function download_FULL_DATA(data) {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("StockManager");

        worksheet.columns = [
            { header: "Matl Type", key: "MATL_TYPE2_N", width: 20 },
            { header: "Factory", key: "FACTORY_NAME", width: 20 },
            { header: "Out Date", key: "STOCK_DATE", width: 15 },
            { header: "Reg Date", key: "REG_DATETIME", width: 15 },
            { header: "PO#", key: "PO_CD", width: 15 },
            { header: "Order#", key: "ORDER_CD", width: 15 },
            { header: "Buyer", key: "BUYER_NAME", width: 20 },
            { header: "Supplier", key: "VENDOR_NAME", width: 20 },
            { header: "Matl#", key: "MATL_CD", width: 15 },
            { header: "Desc", key: "MATL_NAME", width: 25 },
            { header: "Color", key: "COLOR", width: 15 },
            { header: "Spec", key: "SPEC", width: 20 },
            { header: "Unit", key: "UNIT", width: 10 },
            { header: "Type", key: "STOCK_STATUS_2_N", width: 10 },
            { header: "Type(Bef)", key: "STOCK_STATUS_N", width: 10 },
            { header: "Org Qty", key: "ORG_QTY", width: 15 },
            { header: "Stock Qty", key: "STOCK_QTY", width: 15 },
            { header: "Remain Qty", key: "REMAIN_QTY", width: 15 },
            { header: "Use Qty", key: "USE_QTY", width: 15 },
            { header: "Out Qty", key: "OUT_QTY", width: 15 },
            { header: "Rack", key: "RACK", width: 20 },
            { header: "Location", key: "LOCATION", width: 20 },
            { header: "Remark", key: "REMARK", width: 20 },
            { header: "Exp Date", key: "EXP_DATE", width: 15 },
            { header: "Reason", key: "REASON_MAKE_N", width: 20 },
            { header: "Plan", key: "PLAN_REMARK", width: 20 },
            { header: "Debit#", key: "DEBIT_CD", width: 20 },
            { header: "Defect Qty", key: "DEFECT_QTY", width: 15 },
            { header: "Waiting Qty", key: "WAITING_QTY", width: 15 },
            { header: "Owner", key: "OWNER_SHIP", width: 15 },
            { header: "Authority", key: "AUTHORITY", width: 15 },
            { header: "Condition", key: "CONDITION", width: 15 },
            { header: "Manager", key: "MANAGER", width: 10 },
            { header: "Purpose", key: "PURPOSE", width: 15 },
            { header: "Charger", key: "CHARGER", width: 15 },
            { header: "Curr", key: "CURR_CD", width: 10 },
            { header: "Po Price", key: "PO_PRICE", width: 15 },
        ];

        const numberColumns = [
            "ORG_QTY",
            "STOCK_QTY",
            "REMAIN_QTY",
            "USE_QTY",
            "OUT_QTY",
            "DEFECT_QTY",
            "WAITING_QTY",
            "PO_PRICE",
        ];

        numberColumns.forEach((colKey) => {
            const col = worksheet.getColumn(colKey);
            col.alignment = { horizontal: "right" }; // 우측정렬
            col.numFmt = "#,##0"; // 천단위
        });

        const mappedData = data.map((row) => ({
            ...row,
            STOCK_DATE: row.STOCK_DATE
                ? serviceLib.dateFormat(row.STOCK_DATE)
                : "",
            REG_DATETIME: row.REG_DATETIME
                ? serviceLib.dateFormat(row.REG_DATETIME)
                : "",
            ORG_QTY: Number(row.ORG_QTY) || 0,
            STOCK_QTY: Number(row.STOCK_QTY) || 0,
            REMAIN_QTY: Number(row.REMAIN_QTY) || 0,
            USE_QTY: Number(row.USE_QTY) || 0,
            OUT_QTY: Number(row.OUT_QTY) || 0,
            DEFECT_QTY: Number(row.DEFECT_QTY) || 0,
            WAITING_QTY: Number(row.WAITING_QTY) || 0,
            PO_PRICE: Number(row.PO_PRICE) || 0,
        }));

        worksheet.getColumn("PO_PRICE").numFmt = "#,##0.0000";

        worksheet.addRows(mappedData);

        const headerRow = worksheet.getRow(1);

        headerRow.eachCell((cell) => {
            cell.font = { bold: true };

            cell.fill = {
                type: "pattern",
                pattern: "solid",
                fgColor: { argb: "FFFFFFCC" }, // 아주 연한 노란색
            };

            cell.alignment = { vertical: "middle", horizontal: "center" };
        });

        const lastRow = worksheet.rowCount;

        for (let i = 1; i <= lastRow; i++) {
            for (let j = 1; j <= 37; j++) {
                // A~AK
                const cell = worksheet.getRow(i).getCell(j);

                cell.border = {
                    top: { style: "thin" },
                    left: { style: "thin" },
                    bottom: { style: "thin" },
                    right: { style: "thin" },
                };
            }
        }

        workbook.xlsx.writeBuffer().then(function (data) {
            const a = document.createElement("a");
            a.href = URL.createObjectURL(
                new Blob([data], {
                    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                }),
            );
            a.setAttribute("download", "StockManager.xlsx");
            a.style.display = "none";
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(a.href);
        });
    }

    // Search KSV_STOCK_MEM
    const getQueryObj_LIST_1 = (buyerTeam) => {
        var tObj = { ...dataQRY_KSV_PO_MRP };

        // REMAIN_QTY가 드롭다운 객체로 오는 경우 CD_CODE 추출
        if (tObj.REMAIN_QTY && typeof tObj.REMAIN_QTY === "object") {
            tObj.REMAIN_QTY = tObj.REMAIN_QTY.CD_CODE || "";
        }

        if (buyerTeam) {
            tObj.BUYER_TEAM = buyerTeam;
        }

        if (!tObj.STOCK_STATUS_S) {
            tObj.STOCK_STATUS_S = "";
        }

        return tObj;
    };

    const getListData_LIST_1 = async (buyerTeam) => {
        const tObj = getQueryObj_LIST_1(buyerTeam);
        const data = await serviceS0523_STOCK_MANAGER.mgrQuery_LIST_1(tObj);

        if (typeof data.graphQLErrors !== "undefined") {
            console.log(
                "mgrQuery_PO_CD error => " + JSON.stringify(data.graphQLErrors),
            );
            return null;
        }

        return data.DATAS || [];
    };

    const search_LIST_1 = async (buyerTeam) => {
        var tObj = getQueryObj_LIST_1(buyerTeam);
        console.log(tObj);

        setDatasTBL_KSV_PO_MRP([]);
        setSelectedTBL_KSV_PO_MRP([]);
        setLoadingTBL_KSV_PO_MRP(true);

        return new Promise(async (resolve) => {
            const countData =
                await serviceS0523_STOCK_MANAGER.mgrQuery_LIST_1_COUNT(tObj);

            if (typeof countData.graphQLErrors === "undefined") {
                const totalCount = Number(countData.TOT_CNT || 0);

                if (totalCount > 1000) {
                    setLoadingTBL_KSV_PO_MRP(false);
                    if (
                        await confirm(
                            `1000건 초과 전체 데이터는 다운로드만 가능합니다.<br>계속하시겠습니까?<BR><BR>There are more than 1000 records. Only downloading the full data is possible.<br>Do you want to continue?<br><br>TOTAL:${totalCount}`,
                        )
                    ) {
                        const fullData =
                            await serviceS0523_STOCK_MANAGER.mgrQuery_LIST_1(
                                tObj,
                            );
                        if (typeof fullData.graphQLErrors === "undefined") {
                            resolve(await download_FULL_DATA(fullData.DATAS));
                            return;
                        }
                    }
                    resolve(null);
                    return;
                }

                let data = await serviceS0523_STOCK_MANAGER.mgrQuery_LIST_1(tObj);
                setLoadingTBL_KSV_PO_MRP(false);
                if (typeof data.graphQLErrors === "undefined") {
                //if (data.MESSAGE !== '' && !buyerTeam) alert(data.MESSAGE);
                    var tArray = data.DATAS.map((col, i) => {
                        var tObj = { ...col };
                        tObj.id = i + 1;
                        return tObj;
                    });

                    setDatasTBL_KSV_PO_MRP(tArray);

                    if (buyerTeam) {
                        await export_STOCK_LIST(buyerTeam);
                        resolve(buyerTeam);
                    } else {
                        resolve(null);
                    }
                } else {
                    console.log(
                        "mgrQuery_PO_CD error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                    resolve(null);
                }
            } else {
                setLoadingTBL_KSV_PO_MRP(false);
                console.log(
                    "mgrQuery_PO_CD error => " +
                        JSON.stringify(countData.graphQLErrors),
                );
                resolve(null);
            }
        });
    };

    const handleSearchInputKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            search_LIST_1();
        }
    };

    const process_BATCH_UPDATE_AUTHORITY = () => {
        process_BATCH_UPDATE("authority");
    };
    const process_BATCH_UPDATE_CONDITION = () => {
        process_BATCH_UPDATE("condition");
    };
    const process_BATCH_UPDATE_STOCK_STATUS_S = () => {
        process_BATCH_UPDATE("stock_status_s");
    };
    const process_BATCH_UPDATE_PURPOSE = () => {
        process_BATCH_UPDATE("purpose");
    };
    const process_BATCH_UPDATE_RACK = () => {
        process_BATCH_UPDATE("rack");
    };
    const process_BATCH_UPDATE_LOCATION = () => {
        process_BATCH_UPDATE("location");
    };

    const process_BATCH_UPDATE = (argKind) => {
        if (selectedTBL_KSV_PO_MRP.length <= 0) {
            alert("작업할 재고 데이터를 선택하세요<br><br>Select the inventory data you want to work with");
            return;
        }

        var tInput = { ...dataEDT_KSV_PO_MRP };
        if (argKind === "authority") {
            tInput.REMARK = "AUTHORITY";
        }
        if (argKind === "condition") {
            tInput.REMARK = "CONDITION";
        }
        if (argKind === "purpose") {
            tInput.REMARK = "PURPOSE";
        }
        if (argKind === "rack") {
            tInput.REMARK = "RACK";
        }
        if (argKind === "location") {
            tInput.REMARK = "LOCATION";
        }

        var tInput1 = [];
        selectedTBL_KSV_PO_MRP.forEach((col, i) => {
            var tObj = {};
            tObj.STOCK_IDX = col.STOCK_IDX;
            tInput1.push(tObj);
        });

        setLoadingTBL_KSV_PO_MRP(true);
        serviceS0523_STOCK_MANAGER
            .mgrUpdate_BATCH_UPDATE(tInput, tInput1)
            .then((data) => {
                setLoadingTBL_KSV_PO_MRP(false);
                if (typeof data.graphQLErrors === "undefined") {
                    alert(data[0].CODE);
                    process_RESET_EDT();
                    if (data[0].CODE.includes("SUCC")) {
                        setSelectedTBL_KSV_PO_MRP([]);
                        search_LIST_1();
                    }
                } else {
                    toast.current.show({
                        severity: "success",
                        summary: "Fail:Stock_in",
                        detail: "",
                        life: 3000,
                    });
                }
            });
    };

    const process_STOCK_UPDATE = () => {
        if (selectedTBL_KSV_PO_MRP.length <= 0) {
            alert(`No data is selected. Please select the data to work with.`);
            return;
        }

        var _tObj0 = { ...selectedTBL_KSV_PO_MRP[0] };

        var tInput = { ...dataEDT_KSV_PO_MRP };
        tInput.STOCK_IDX = _tObj0.STOCK_IDX;
        tInput.CHANGE_QTY = tInput.DEFECT_QTY; // 현재는  Defect Qty에 Stock qty가 들어가 있음. 260323

        var tInput1 = [...datasTBL_KSV_PO_MRP2];

        setLoadingTBL_KSV_PO_MRP(true);
        serviceS0523_STOCK_MANAGER
            .mgrUpdate_STOCK_UPDATE(tInput, tInput1)
            .then((data) => {
                setLoadingTBL_KSV_PO_MRP(false);
                if (typeof data.graphQLErrors === "undefined") {
                    alert(data[0].CODE);
                    process_RESET_EDT();
                    if (data[0].CODE.includes("SUCC")) {
                        setSelectedTBL_KSV_PO_MRP([]);
                        search_LIST_1();
                    }
                } else {
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
    const [datasQRY_KSV_PO_MRP_FACTORY_CD, setDatasQRY_KSV_PO_MRP_FACTORY_CD] =
        useState([]);
    const [dataQRY_KSV_PO_MRP_FACTORY_CD, setDataQRY_KSV_PO_MRP_FACTORY_CD] =
        useState({});

    const editQRY_KSV_PO_MRP_FACTORY_CD = (argValue) => {
        let _dataQRY_KSV_PO_MRP_FACTORY_CD =
            datasQRY_KSV_PO_MRP_FACTORY_CD.filter(
                (val) => val.FACTORY_CD === argValue,
            );
        setDataQRY_KSV_PO_MRP_FACTORY_CD(_dataQRY_KSV_PO_MRP_FACTORY_CD[0]);
    };

    const onDropdownChangeQRY_KSV_PO_MRP_FACTORY_CD = (e, name) => {
        let val = (e.value && e.value.FACTORY_CD) || "";

        let _dataQRY_KSV_PO_MRP = { ...dataQRY_KSV_PO_MRP };

        let tTypeVal = _dataQRY_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_PO_MRP[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_PO_MRP[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_PO_MRP(_dataQRY_KSV_PO_MRP);
        setDataQRY_KSV_PO_MRP_FACTORY_CD(e.value);
    };

    const [datasQRY_KSV_PO_MRP_REMAIN_QTY, setDatasQRY_KSV_PO_MRP_REMAIN_QTY] =
        useState([]);
    const [dataQRY_KSV_PO_MRP_REMAIN_QTY, setDataQRY_KSV_PO_MRP_REMAIN_QTY] =
        useState({});

    const onDropdownChangeQRY_KSV_PO_MRP_REMAIN_QTY = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataQRY_KSV_PO_MRP = { ...dataQRY_KSV_PO_MRP };

        let tTypeVal = _dataQRY_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_PO_MRP[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_PO_MRP[`${name}`] = parseInt(val);
        } else {
            _dataQRY_KSV_PO_MRP[`${name}`] = String(val);
        }

        setDataQRY_KSV_PO_MRP(_dataQRY_KSV_PO_MRP);
        setDataQRY_KSV_PO_MRP_REMAIN_QTY(e.value);
    };

    const [
        savesQRY_KSV_PO_MRP_STOCK_STATUS_S,
        setSavesQRY_KSV_PO_MRP_STOCK_STATUS_S,
    ] = useState([]);
    const [
        datasQRY_KSV_PO_MRP_STOCK_STATUS_S,
        setDatasQRY_KSV_PO_MRP_STOCK_STATUS_S,
    ] = useState([]);
    const [
        dataQRY_KSV_PO_MRP_STOCK_STATUS_S,
        setDataQRY_KSV_PO_MRP_STOCK_STATUS_S,
    ] = useState(null);

    const [datasQRY_KSV_PO_MRP_OWNER_SHIP, setDatasQRY_KSV_PO_MRP_OWNER_SHIP] =
        useState([]);
    const [dataQRY_KSV_PO_MRP_OWNER_SHIP, setDataQRY_KSV_PO_MRP_OWNER_SHIP] =
        useState([]);

    const editQRY_KSV_PO_MRP_OWNER_SHIP = (argValue) => {
        let _dataQRY_KSV_PO_MRP_OWNER_SHIP =
            datasQRY_KSV_PO_MRP_OWNER_SHIP.filter(
                (val) => val.CD_CODE === argValue,
            );
        setDataQRY_KSV_PO_MRP_OWNER_SHIP(_dataQRY_KSV_PO_MRP_OWNER_SHIP[0]);
    };

    const onDropdownChangeQRY_KSV_PO_MRP_OWNER_SHIP = (e, name) => {
        let val = e.value;

        let _dataQRY_KSV_PO_MRP = { ...dataQRY_KSV_PO_MRP };

        let tTypeVal = _dataQRY_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_PO_MRP[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_PO_MRP[`${name}`] = parseInt(val);
        } else {
            _dataQRY_KSV_PO_MRP[`${name}`] = val
                .map((item) => `${item.CD_CODE}`)
                .join(",");
        }

        setDataQRY_KSV_PO_MRP(_dataQRY_KSV_PO_MRP);
        setDataQRY_KSV_PO_MRP_OWNER_SHIP(e.value);
    };

    const [datasQRY_KSV_PO_MRP_AUTHORITY, setDatasQRY_KSV_PO_MRP_AUTHORITY] =
        useState([]);
    const [dataQRY_KSV_PO_MRP_AUTHORITY, setDataQRY_KSV_PO_MRP_AUTHORITY] =
        useState({});

    const editQRY_KSV_PO_MRP_AUTHORITY = (argValue) => {
        let _dataQRY_KSV_PO_MRP_AUTHORITY =
            datasQRY_KSV_PO_MRP_AUTHORITY.filter(
                (val) => val.CD_CODE === argValue,
            );
        setDataQRY_KSV_PO_MRP_AUTHORITY(_dataQRY_KSV_PO_MRP_AUTHORITY[0]);
    };

    const onDropdownChangeQRY_KSV_PO_MRP_AUTHORITY = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataQRY_KSV_PO_MRP = { ...dataQRY_KSV_PO_MRP };

        let tTypeVal = _dataQRY_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_PO_MRP[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_PO_MRP[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_PO_MRP(_dataQRY_KSV_PO_MRP);
        setDataQRY_KSV_PO_MRP_AUTHORITY(e.value);
    };

    const [datasQRY_KSV_PO_MRP_CONDITION, setDatasQRY_KSV_PO_MRP_CONDITION] =
        useState([]);
    const [dataQRY_KSV_PO_MRP_CONDITION, setDataQRY_KSV_PO_MRP_CONDITION] =
        useState({});

    const editQRY_KSV_PO_MRP_CONDITION = (argValue) => {
        let _dataQRY_KSV_PO_MRP_CONDITION =
            datasQRY_KSV_PO_MRP_CONDITION.filter(
                (val) => val.CD_CODE === argValue,
            );
        setDataQRY_KSV_PO_MRP_CONDITION(_dataQRY_KSV_PO_MRP_CONDITION[0]);
    };

    const onDropdownChangeQRY_KSV_PO_MRP_CONDITION = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";
        let val_name = (e.value && e.value.CD_NAME) || "";

        let _dataQRY_KSV_PO_MRP = { ...dataQRY_KSV_PO_MRP };

        let tTypeVal = _dataQRY_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_PO_MRP[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_PO_MRP[`${name}`] = parseInt(val);
        }

        if (val.length > 2 || val_name === 'ALL') {
            if (val_name === 'ALL') {
                var tArray = [];
                tArray.push(e.value);
                savesQRY_KSV_PO_MRP_STOCK_STATUS_S.forEach((col, i) => {
                    if (col.CD_CODE.length <= 2) {
                        tArray.push(col);
                    } 
                });
                setDatasQRY_KSV_PO_MRP_STOCK_STATUS_S(tArray);
                setDataQRY_KSV_PO_MRP_STOCK_STATUS_S(tArray[0]);
                _dataQRY_KSV_PO_MRP.STOCK_STATUS_S = tArray[0].CD_CODE;
            } else {
                var strArray = val.split('');
                var tArray = [];
                var allObj = {};
                 allObj.CD_CODE = '';
                 allObj.CD_NAME = 'ALL';
                tArray.push(allObj);
                strArray.forEach((col1, i1) => {
                    savesQRY_KSV_PO_MRP_STOCK_STATUS_S.forEach((col2, i2) => {
                         if (col1 === col2.CD_CODE) tArray.push(col2);
                    });
                });
                setDatasQRY_KSV_PO_MRP_STOCK_STATUS_S(tArray);
                setDataQRY_KSV_PO_MRP_STOCK_STATUS_S(tArray[0]);
                _dataQRY_KSV_PO_MRP.STOCK_STATUS_S = tArray[0].CD_CODE;
            }
        } else {
            var tArray = [];
            tArray.push(e.value);
            setDatasQRY_KSV_PO_MRP_STOCK_STATUS_S(tArray);
            setDataQRY_KSV_PO_MRP_STOCK_STATUS_S(tArray[0]);
            _dataQRY_KSV_PO_MRP.STOCK_STATUS_S = tArray[0].CD_CODE;
        }

        setDataQRY_KSV_PO_MRP(_dataQRY_KSV_PO_MRP);
        setDataQRY_KSV_PO_MRP_CONDITION(e.value);
    };

    const [datasQRY_KSV_PO_MRP_PURPOSE, setDatasQRY_KSV_PO_MRP_PURPOSE] =
        useState([]);
    const [dataQRY_KSV_PO_MRP_PURPOSE, setDataQRY_KSV_PO_MRP_PURPOSE] =
        useState({});

    const editQRY_KSV_PO_MRP_PURPOSE = (argValue) => {
        let _dataQRY_KSV_PO_MRP_PURPOSE = datasQRY_KSV_PO_MRP_PURPOSE.filter(
            (val) => val.CD_CODE === argValue,
        );
        setDataQRY_KSV_PO_MRP_PURPOSE(_dataQRY_KSV_PO_MRP_PURPOSE[0]);
    };

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

    const onDropdownChangeQRY_KSV_PO_MRP_BUYER_CD = (e, name) => {
        let val = (e.value && e.value.BUYER_CD) || "";

        let _dataQRY_KSV_PO_MRP = { ...dataQRY_KSV_PO_MRP };

        let tTypeVal = _dataQRY_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_PO_MRP[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_PO_MRP[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_PO_MRP(_dataQRY_KSV_PO_MRP);
        setDataQRY_KSV_PO_MRP_BUYER_CD(e.value);
    };

    const [datasQRY_KSV_PO_MRP_STATUS_CD2, setDatasQRY_KSV_PO_MRP_STATUS_CD2] =
        useState([]);
    const [dataQRY_KSV_PO_MRP_STATUS_CD2, setDataQRY_KSV_PO_MRP_STATUS_CD2] =
        useState({});

    const editQRY_KSV_PO_MRP_STATUS_CD2 = (argValue) => {
        let _dataQRY_KSV_PO_MRP_STATUS_CD2 =
            datasQRY_KSV_PO_MRP_STATUS_CD2.filter(
                (val) => val.CD_CODE === argValue,
            );
        setDataQRY_KSV_PO_MRP_STATUS_CD2(_dataQRY_KSV_PO_MRP_STATUS_CD2[0]);
    };

    const onDropdownChangeQRY_KSV_PO_MRP_STATUS_CD2 = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataQRY_KSV_PO_MRP = { ...dataQRY_KSV_PO_MRP };

        let tTypeVal = _dataQRY_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_PO_MRP[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_PO_MRP[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_PO_MRP(_dataQRY_KSV_PO_MRP);
        setDataQRY_KSV_PO_MRP_STATUS_CD2(e.value);
    };

    const onInputChangeQRY_KSV_PO_MRP_PO_CD = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_PO_MRP = { ...dataQRY_KSV_PO_MRP };

        let tTypeVal = _dataQRY_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string") _dataQRY_KSV_PO_MRP[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_PO_MRP[`${name}`] = parseInt(val);

        setDataQRY_KSV_PO_MRP(_dataQRY_KSV_PO_MRP);
    };

    const onInputChangeQRY_KSV_PO_MRP_VENDOR_CD = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_PO_MRP = { ...dataQRY_KSV_PO_MRP };

        let tTypeVal = _dataQRY_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string") _dataQRY_KSV_PO_MRP[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_PO_MRP[`${name}`] = parseInt(val);

        setDataQRY_KSV_PO_MRP(_dataQRY_KSV_PO_MRP);
        setDataQRY_KSV_PO_MRP_VENDOR_CD(val);
    };

    const onInputChangeQRY_KSV_PO_MRP_STOCK_IDX = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_PO_MRP = { ...dataQRY_KSV_PO_MRP };

        let tTypeVal = _dataQRY_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string") _dataQRY_KSV_PO_MRP[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_PO_MRP[`${name}`] = parseInt(val);

        setDataQRY_KSV_PO_MRP(_dataQRY_KSV_PO_MRP);
    };

    const onInputChangeQRY_KSV_PO_MRP_ROOT_IDX = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_PO_MRP = { ...dataQRY_KSV_PO_MRP };

        let tTypeVal = _dataQRY_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string") _dataQRY_KSV_PO_MRP[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_PO_MRP[`${name}`] = parseInt(val);

        setDataQRY_KSV_PO_MRP(_dataQRY_KSV_PO_MRP);
    };

    const onInputChangeQRY_KSV_PO_MRP_LOCATION = (e, name) => {
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

    const [datasQRY_KSV_PO_MRP_VENDOR_CD, setDatasQRY_KSV_PO_MRP_VENDOR_CD] =
        useState([]);
    const [dataQRY_KSV_PO_MRP_VENDOR_CD, setDataQRY_KSV_PO_MRP_VENDOR_CD] =
        useState("");

    const editQRY_KSV_PO_MRP_VENDOR_CD = (argValue) => {
        let _dataQRY_KSV_PO_MRP_VENDOR_CD =
            datasQRY_KSV_PO_MRP_VENDOR_CD.filter(
                (val) => val.VENDOR_CD === argValue,
            );
        setDataQRY_KSV_PO_MRP_VENDOR_CD(_dataQRY_KSV_PO_MRP_VENDOR_CD[0]);
    };

    const onCalChangeQRY_KSV_PO_MRP_S_STOCK_DATE = (e, name) => {
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

    const onCalChangeQRY_KSV_PO_MRP_E_STOCK_DATE = (e, name) => {
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

    const onCalChangeQRY_KSV_PO_MRP_S_REG_DATE = (e, name) => {
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

    const onCalChangeQRY_KSV_PO_MRP_E_REG_DATE = (e, name) => {
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

    const onInputChangeQRY_KSV_PO_MRP_RACK = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_PO_MRP = { ...dataQRY_KSV_PO_MRP };

        let tTypeVal = _dataQRY_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string") _dataQRY_KSV_PO_MRP[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_PO_MRP[`${name}`] = parseInt(val);

        setDataQRY_KSV_PO_MRP(_dataQRY_KSV_PO_MRP);
    };

    const [datasQRY_KSV_PO_MRP_KIND2, setDatasQRY_KSV_PO_MRP_KIND2] = useState(
        [],
    );
    const [dataQRY_KSV_PO_MRP_KIND2, setDataQRY_KSV_PO_MRP_KIND2] = useState(
        {},
    );

    const editQRY_KSV_PO_MRP_KIND2 = (argValue) => {
        let _dataQRY_KSV_PO_MRP_KIND2 = datasQRY_KSV_PO_MRP_KIND2.filter(
            (val) => val.CD_CODE === argValue,
        );
        setDataQRY_KSV_PO_MRP_KIND2(_dataQRY_KSV_PO_MRP_KIND2[0]);
    };

    const onDropdownChangeQRY_KSV_PO_MRP_KIND2 = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataQRY_KSV_PO_MRP = { ...dataQRY_KSV_PO_MRP };

        let tTypeVal = _dataQRY_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_PO_MRP[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_PO_MRP[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_PO_MRP(_dataQRY_KSV_PO_MRP);
        setDataQRY_KSV_PO_MRP_KIND2(e.value);
    };

    const onInputChangeQRY_KSV_PO_MRP_MATL_CD = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_PO_MRP = { ...dataQRY_KSV_PO_MRP };

        let tTypeVal = _dataQRY_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string") _dataQRY_KSV_PO_MRP[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_PO_MRP[`${name}`] = parseInt(val);

        setDataQRY_KSV_PO_MRP(_dataQRY_KSV_PO_MRP);
    };

    const onInputChangeQRY_KSV_PO_MRP_DESC = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_PO_MRP = { ...dataQRY_KSV_PO_MRP };

        let tTypeVal = _dataQRY_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string") _dataQRY_KSV_PO_MRP[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_PO_MRP[`${name}`] = parseInt(val);

        setDataQRY_KSV_PO_MRP(_dataQRY_KSV_PO_MRP);
    };

    const onInputChangeQRY_KSV_PO_MRP_COLOR = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_PO_MRP = { ...dataQRY_KSV_PO_MRP };

        let tTypeVal = _dataQRY_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string") _dataQRY_KSV_PO_MRP[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_PO_MRP[`${name}`] = parseInt(val);

        setDataQRY_KSV_PO_MRP(_dataQRY_KSV_PO_MRP);
    };

    const onInputChangeQRY_KSV_PO_MRP_SPEC = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataQRY_KSV_PO_MRP = { ...dataQRY_KSV_PO_MRP };

        let tTypeVal = _dataQRY_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string") _dataQRY_KSV_PO_MRP[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataQRY_KSV_PO_MRP[`${name}`] = parseInt(val);

        setDataQRY_KSV_PO_MRP(_dataQRY_KSV_PO_MRP);
    };

    const onCheckboxChangeQRY_KSV_PO_MRP_IS_STOCK_DATE = (e, name) => {
        let val = "";
        let _dataQRY_KSV_PO_MRP = { ...dataQRY_KSV_PO_MRP };
        if (e.checked) {
            val = "1";
        } else {
            val = "0";
        }

        _dataQRY_KSV_PO_MRP[`${name}`] = val;
        _dataQRY_KSV_PO_MRP.IS_REG_DATE = "0";
        setDataQRY_KSV_PO_MRP(_dataQRY_KSV_PO_MRP);
    };

    const onCheckboxChangeQRY_KSV_PO_MRP_IS_REG_DATE = (e, name) => {
        let val = "";
        let _dataQRY_KSV_PO_MRP = { ...dataQRY_KSV_PO_MRP };
        if (e.checked) {
            val = "1";
        } else {
            val = "0";
        }
        _dataQRY_KSV_PO_MRP[`${name}`] = val;
        _dataQRY_KSV_PO_MRP.IS_STOCK_DATE = "0";
        setDataQRY_KSV_PO_MRP(_dataQRY_KSV_PO_MRP);
    };

    /* QRY KSV_PO_MRP*/
    const [dataQRY_KSV_PO_MRP1, setDataQRY_KSV_PO_MRP1] =
        useState(emptyQRY_KSV_PO_MRP1);

    const [datasQRY_KSV_PO_MRP1_BUYER_CD, setDatasQRY_KSV_PO_MRP1_BUYER_CD] =
        useState([]);
    const [dataQRY_KSV_PO_MRP1_BUYER_CD, setDataQRY_KSV_PO_MRP1_BUYER_CD] =
        useState({});

    const [datasQRY_KSV_PO_MRP1_PO_CD, setDatasQRY_KSV_PO_MRP1_PO_CD] =
        useState([]);
    const [dataQRY_KSV_PO_MRP1_PO_CD, setDataQRY_KSV_PO_MRP1_PO_CD] = useState(
        {},
    );

    const [datasQRY_KSV_PO_MRP1_PU_STATUS, setDatasQRY_KSV_PO_MRP1_PU_STATUS] =
        useState([]);
    const [dataQRY_KSV_PO_MRP1_PU_STATUS, setDataQRY_KSV_PO_MRP1_PU_STATUS] =
        useState({});

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

    const editTBL_KSV_PO_MRP = (argData) => {};

    const onRowClick1TBL_KSV_PO_MRP = (argData0) => {
        var argData = {};

        if (typeof argData0.length !== "undefined") {
            if (argData0.length <= 0) return;
            argData = argData0[0];
        } else {
            argData = argData0;
        }

        let argTBL_KSV_PO_MRP = argData;
        editTBL_KSV_PO_MRP(argTBL_KSV_PO_MRP);
        setDataTBL_KSV_PO_MRP(argTBL_KSV_PO_MRP);

        var tTotAmt = String(
            parseFloat(argData.REMAIN_QTY) * parseFloat(argData.PO_PRICE),
        );

        var tObj = { ...dataEDT_KSV_PO_MRP };
        tObj.STOCK_DATE = argData.STOCK_DATE;
        tObj.CHARGER = argData.CHARGER;
        tObj.LOCATION = argData.LOCATION;
        tObj.RACK = argData.RACK;
        tObj.OWNER_SHIP = argData.OWNER_SHIP;
        tObj.REASON_MAKE = argData.REASON_MAKE;
        tObj.AUTHORITY = argData.AUTHORITY;
        tObj.CONDITION = argData.CONDITION;
        tObj.MANAGER = argData.MANAGER;
        tObj.REASON_REMARK = argData.REASON_REMARK;
        tObj.PLAN_REMARK = argData.PLAN_REMARK;
        tObj.REMARK = argData.REMARK;
        tObj.PURPOSE = argData.PURPOSE;
        tObj.WARE_CD = argData.WARE_CD;
        tObj.FACTORY_CD = argData.FACTORY_CD;
        tObj.BUYER_CD = argData.BUYER_CD;
        if (argData.CRDB_DATE === "") {
            tObj.DEBIT_DATE = "";
            tObj.DEBIT_AMT = tTotAmt;
        } else {
            tObj.DEBIT_DATE = argData.CRDB_DATE;
            tObj.DEBIT_AMT = argData.CRDB_AMT;
        }
        tObj.STOCK_STATUS_S = argData.STOCK_STATUS;

        //
        tObj.DEFECT_QTY = argData.STOCK_QTY;

        setDataEDT_KSV_PO_MRP(tObj);

        editEDT_KSV_PO_MRP_OWNER_SHIP(tObj.OWNER_SHIP);
        editEDT_KSV_PO_MRP_REASON_MAKE(tObj.REASON_MAKE);
        editEDT_KSV_PO_MRP_AUTHORITY(tObj.AUTHORITY);
        editEDT_KSV_PO_MRP_CONDITION(tObj.CONDITION);
        editEDT_KSV_PO_MRP_MANAGER(tObj.MANAGER);
        editEDT_KSV_PO_MRP_REASON_REMARK(tObj.REASON_REMARK);
        editEDT_KSV_PO_MRP_PLAN_REMARK(tObj.PLAN_REMARK);
        editEDT_KSV_PO_MRP_PURPOSE(tObj.PURPOSE);
        editEDT_KSV_PO_MRP_WARE_CD(tObj.WARE_CD);
        editEDT_KSV_PO_MRP_FACTORY_CD(tObj.FACTORY_CD);
        editEDT_KSV_PO_MRP_BUYER_CD(tObj.BUYER_CD);

        // editEDT_KSV_PO_MRP_STOCK_STATUS_S(tObj.STOCK_STATUS);
        setDatasEDT_KSV_PO_MRP_STOCK_STATUS_S(savesQRY_KSV_PO_MRP_STOCK_STATUS_S);
        var tFindObj = {};
        savesQRY_KSV_PO_MRP_STOCK_STATUS_S.forEach((col, i) => {
            if (col.CD_CODE === tObj.STOCK_STATUS_S) tFindObj = { ...col };
        });
        if (typeof tFindObj.CD_CODE === 'undefined') setDataEDT_KSV_PO_MRP_STOCK_STATUS_S(savesQRY_KSV_PO_MRP_STOCK_STATUS_S[2]);
        else  setDataEDT_KSV_PO_MRP_STOCK_STATUS_S(tFindObj);

        var tRetArray = [];

        var tArray = ["1", "2", "3", "4", "5", "LOST"];
        tArray.forEach((col, i) => {
            var tObj = {};
            tObj.SEQ = col;
            if (col === "LOST") tObj.QTY = parseFloat(argData.STOCK_QTY);
            else tObj.QTY = 0;
            tObj.LOCATION = "";
            tRetArray.push(tObj);
        });

        setDatasTBL_KSV_PO_MRP2(tRetArray);

        // search_LIST_2(argData);
        // resetEDT_KSV_PO_MRP(argData);
    };

    const onRowClickTBL_KSV_PO_MRP = (event) => {
        var argData = { ...event.data };

        let argTBL_KSV_PO_MRP = argData;
        editTBL_KSV_PO_MRP(argTBL_KSV_PO_MRP);
        setDataTBL_KSV_PO_MRP(argTBL_KSV_PO_MRP);

        var tTotAmt = String(
            parseFloat(argData.REMAIN_QTY) * parseFloat(argData.PO_PRICE),
        );

        var tObj = { ...dataEDT_KSV_PO_MRP };
        tObj.STOCK_DATE = argData.STOCK_DATE;
        tObj.CHARGER = argData.CHARGER;
        tObj.LOCATION = argData.LOCATION;
        tObj.RACK = argData.RACK;
        tObj.OWNER_SHIP = argData.OWNER_SHIP;
        tObj.REASON_MAKE = argData.REASON_MAKE;
        tObj.AUTHORITY = argData.AUTHORITY;
        tObj.CONDITION = argData.CONDITION;
        tObj.MANAGER = argData.MANAGER;
        tObj.REASON_REMARK = argData.REASON_REMARK;
        tObj.PLAN_REMARK = argData.PLAN_REMARK;
        tObj.REMARK = argData.REMARK;
        tObj.PURPOSE = argData.PURPOSE;
        tObj.WARE_CD = argData.WARE_CD;
        tObj.FACTORY_CD = argData.FACTORY_CD;
        tObj.BUYER_CD = argData.BUYER_CD;
        if (argData.CRDB_DATE === "") {
            tObj.DEBIT_DATE = "";
            tObj.DEBIT_AMT = tTotAmt;
        } else {
            tObj.DEBIT_DATE = argData.CRDB_DATE;
            tObj.DEBIT_AMT = argData.CRDB_AMT;
        }
        tObj.STOCK_STATUS_S = argData.STOCK_STATUS;
        setDataEDT_KSV_PO_MRP(tObj);

        editEDT_KSV_PO_MRP_OWNER_SHIP(tObj.OWNER_SHIP);
        editEDT_KSV_PO_MRP_REASON_MAKE(tObj.REASON_MAKE);
        editEDT_KSV_PO_MRP_AUTHORITY(tObj.AUTHORITY);
        editEDT_KSV_PO_MRP_CONDITION(tObj.CONDITION);
        editEDT_KSV_PO_MRP_MANAGER(tObj.MANAGER);
        editEDT_KSV_PO_MRP_REASON_REMARK(tObj.REASON_REMARK);
        editEDT_KSV_PO_MRP_PLAN_REMARK(tObj.PLAN_REMARK);
        editEDT_KSV_PO_MRP_PURPOSE(tObj.PURPOSE);
        editEDT_KSV_PO_MRP_WARE_CD(tObj.WARE_CD);
        editEDT_KSV_PO_MRP_FACTORY_CD(tObj.FACTORY_CD);
        editEDT_KSV_PO_MRP_BUYER_CD(tObj.BUYER_CD);

        setDatasEDT_KSV_PO_MRP_STOCK_STATUS_S(savesQRY_KSV_PO_MRP_STOCK_STATUS_S);
        var tFindObj = {};
        savesQRY_KSV_PO_MRP_STOCK_STATUS_S.forEach((col, i) => {
            if (col.CD_CODE === tObj.STOCK_STATUS_S) tFindObj = { ...col };
        });
        if (typeof tFindObj.CD_CODE === 'undefined') setDataEDT_KSV_PO_MRP_STOCK_STATUS_S(savesQRY_KSV_PO_MRP_STOCK_STATUS_S[0]);
        else  setDataEDT_KSV_PO_MRP_STOCK_STATUS_S(tFindObj);

        var tRetArray = [];

        var tArray = ["1", "2", "3", "4", "5", "LOST"];
        tArray.forEach((col, i) => {
            var tObj = {};
            tObj.SEQ = col;
            if (col === "LOST") tObj.QTY = parseFloat(argData.STOCK_QTY);
            else tObj.QTY = 0;
            tObj.LOCATION = "";
            tRetArray.push(tObj);
        });

        setDatasTBL_KSV_PO_MRP2(tRetArray);

        // let argTBL_KSV_PO_MRP = event.data;
        // if (flagSelectModeTBL_KSV_PO_MRP) return;
        // Service : NawooAll:mgrQueryTBL_KSV_PO_MRP
    };

    const exportExcelTBL_KSV_PO_MRP = () => {
        var tArray = [];
        datasTBL_KSV_PO_MRP.forEach((col, i) => {
            var tObj = {};
            tObj.Matl_Type2 = col.MATL_TYPE2_N;
            tObj.Factory = col.FACTORY_NAME;
            tObj.Stock_Date = col.STOCK_DATE;
            tObj.Reg_Date = col.REG_DATETIME;
            tObj.Po = col.PO_CD;
            tObj.Order = col.ORDER_CD;
            tObj.Buyer = col.BUYER_NAME;
            tObj.Supplier = col.VENDOR_NAME;
            tObj.Matl = col.MATL_CD;
            tObj.Description = col.MATL_NAME;
            tObj.Color = col.COLOR;
            tObj.Spec = col.SPEC;
            tObj.Unit = col.UNIT;
            tObj.Type = col.STOCK_STATUS_2_N;
            tObj.Type_Bef = col.STOCK_STATUS_N;
            tObj.Org_Qty = col.ORG_QTY;
            tObj.Stock_Qty = col.STOCK_QTY;
            tObj.Remain_Qty = col.REMAIN_QTY;
            tObj.Use_Qty = col.USE_QTY;
            tObj.Out_Qty = col.OUT_QTY;
            tObj.Rack = col.RACK;
            tObj.Location = col.LOCATION;
            tObj.Org_Stock_Idx = col.ORG_STOCK_IDX;
            tObj.Stock_Idx = col.STOCK_IDX;
            tObj.Root_Idx = col.ROOT_IDX;
            tObj.Remark = col.REMARK;
            tObj.Exp_Date = col.EXP_DATE;
            tObj.Reason_Remark = col.REASON_REMARK_N;
            tObj.Plan_Remark = col.PLAN_REMARK;
            tObj.Debit = col.DEBIT_CD;
            tObj.Remark0 = col.REMARK0;
            tObj.Org_Reason = col.ORG_REASON;
            tObj.Defect_Qty = col.DEFECT_QTY;
            tObj.Waiting_Qty = col.WAITING_QTY;
            tObj.Owner_Ship = col.OWNER_SHIP;
            tObj.Reason_Make = col.REASON_MAKE;
            tObj.Authority = col.AUTHORITY;
            tObj.Condition = col.CONDITION;
            tObj.Manager = col.MANAGER;
            tObj.Purpose = col.PURPOSE;
            tObj.Charger = col.CHARGER;
            tObj.Curr = col.CURR_CD;
            tObj.Po_Price = col.PO_PRICE;
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
            saveAsExcelFileTBL_KSV_PO_MRP(excelBuffer, "Stock List");
        });
    };

    const saveAsExcelFileTBL_KSV_PO_MRP = (buffer, fileName) => {
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

    const [datasTBL_KSV_PO_MRP2, setDatasTBL_KSV_PO_MRP2] = useState([]);
    const dt_TBL_KSV_PO_MRP2 = useRef(null);
    const [dataTBL_KSV_PO_MRP2, setDataTBL_KSV_PO_MRP2] =
        useState(emptyTBL_KSV_PO_MRP2);
    const [selectedTBL_KSV_PO_MRP2, setSelectedTBL_KSV_PO_MRP2] = useState([]);
    const [flagSelectModeTBL_KSV_PO_MRP2, setFlagSelectModeTBL_KSV_PO_MRP2] =
        useState(false);

    // DATAGRID CODE : TBL_KSV_PO_MRP2

    /* QRY KSV_PO_MRP*/
    const [dataEDT_KSV_PO_MRP, setDataEDT_KSV_PO_MRP] =
        useState(emptyEDT_KSV_PO_MRP);

    const onInputChangeEDT_KSV_PO_MRP_DEFECT_QTY = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_PO_MRP = { ...dataEDT_KSV_PO_MRP };

        let tTypeVal = _dataEDT_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string") _dataEDT_KSV_PO_MRP[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_PO_MRP[`${name}`] = parseInt(val);

        setDataEDT_KSV_PO_MRP(_dataEDT_KSV_PO_MRP);
    };

    const onInputChangeEDT_KSV_PO_MRP_STOCK_PRICE = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_PO_MRP = { ...dataEDT_KSV_PO_MRP };

        let tTypeVal = _dataEDT_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string") _dataEDT_KSV_PO_MRP[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_PO_MRP[`${name}`] = parseInt(val);

        setDataEDT_KSV_PO_MRP(_dataEDT_KSV_PO_MRP);
    };

    const onInputChangeEDT_KSV_PO_MRP_STOCK_DATE = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_PO_MRP = { ...dataEDT_KSV_PO_MRP };

        let tTypeVal = _dataEDT_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string") _dataEDT_KSV_PO_MRP[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_PO_MRP[`${name}`] = parseInt(val);

        setDataEDT_KSV_PO_MRP(_dataEDT_KSV_PO_MRP);
    };

    const onInputChangeEDT_KSV_PO_MRP_CHARGER = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_PO_MRP = { ...dataEDT_KSV_PO_MRP };

        let tTypeVal = _dataEDT_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string") _dataEDT_KSV_PO_MRP[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_PO_MRP[`${name}`] = parseInt(val);

        setDataEDT_KSV_PO_MRP(_dataEDT_KSV_PO_MRP);
    };

    const [datasEDT_KSV_PO_MRP_WARE_CD, setDatasEDT_KSV_PO_MRP_WARE_CD] =
        useState([]);
    const [dataEDT_KSV_PO_MRP_WARE_CD, setDataEDT_KSV_PO_MRP_WARE_CD] =
        useState({});

    const editEDT_KSV_PO_MRP_WARE_CD = (argValue) => {
        let _dataEDT_KSV_PO_MRP_WARE_CD = datasEDT_KSV_PO_MRP_WARE_CD.filter(
            (val) => val.WARE_CD === argValue,
        );
        setDataEDT_KSV_PO_MRP_WARE_CD(_dataEDT_KSV_PO_MRP_WARE_CD[0]);
    };

    const [datasEDT_KSV_PO_MRP_BUYER_CD, setDatasEDT_KSV_PO_MRP_BUYER_CD] =
        useState([]);
    const [dataEDT_KSV_PO_MRP_BUYER_CD, setDataEDT_KSV_PO_MRP_BUYER_CD] =
        useState({});

    const editEDT_KSV_PO_MRP_BUYER_CD = (argValue) => {
        let _dataEDT_KSV_PO_MRP_BUYER_CD = datasEDT_KSV_PO_MRP_BUYER_CD.filter(
            (val) => val.BUYER_CD === argValue,
        );
        setDataEDT_KSV_PO_MRP_BUYER_CD(_dataEDT_KSV_PO_MRP_BUYER_CD[0]);
    };

    const onDropdownChangeEDT_KSV_PO_MRP_BUYER_CD = (e, name) => {
        let val = (e.value && e.value.BUYER_CD) || "";

        let _dataEDT_KSV_PO_MRP = { ...dataEDT_KSV_PO_MRP };

        let tTypeVal = _dataEDT_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_KSV_PO_MRP[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_KSV_PO_MRP[`${name}`] = parseInt(val);
        }

        setDataEDT_KSV_PO_MRP(_dataEDT_KSV_PO_MRP);
        setDataEDT_KSV_PO_MRP_BUYER_CD(e.value);
    };

    const [datasEDT_KSV_PO_MRP_FACTORY_CD, setDatasEDT_KSV_PO_MRP_FACTORY_CD] =
        useState([]);
    const [dataEDT_KSV_PO_MRP_FACTORY_CD, setDataEDT_KSV_PO_MRP_FACTORY_CD] =
        useState({});

    const editEDT_KSV_PO_MRP_FACTORY_CD = (argValue) => {
        let _dataEDT_KSV_PO_MRP_FACTORY_CD =
            datasEDT_KSV_PO_MRP_FACTORY_CD.filter(
                (val) => val.FACTORY_CD === argValue,
            );
        setDataEDT_KSV_PO_MRP_FACTORY_CD(_dataEDT_KSV_PO_MRP_FACTORY_CD[0]);
    };

    const onDropdownChangeEDT_KSV_PO_MRP_FACTORY_CD = (e, name) => {
        let val = (e.value && e.value.FACTORY_CD) || "";

        let _dataEDT_KSV_PO_MRP = { ...dataEDT_KSV_PO_MRP };

        let tTypeVal = _dataEDT_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_KSV_PO_MRP[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_KSV_PO_MRP[`${name}`] = parseInt(val);
        }

        setDataEDT_KSV_PO_MRP(_dataEDT_KSV_PO_MRP);
        setDataEDT_KSV_PO_MRP_FACTORY_CD(e.value);
    };

    const [datasEDT_KSV_PO_MRP_OWNER_SHIP, setDatasEDT_KSV_PO_MRP_OWNER_SHIP] =
        useState([]);
    const [dataEDT_KSV_PO_MRP_OWNER_SHIP, setDataEDT_KSV_PO_MRP_OWNER_SHIP] =
        useState({});

    const editEDT_KSV_PO_MRP_OWNER_SHIP = (argValue) => {
        let _dataEDT_KSV_PO_MRP_OWNER_SHIP =
            datasEDT_KSV_PO_MRP_OWNER_SHIP.filter(
                (val) => val.CD_CODE === argValue,
            );
        setDataEDT_KSV_PO_MRP_OWNER_SHIP(_dataEDT_KSV_PO_MRP_OWNER_SHIP[0]);
    };

    const onDropdownChangeEDT_KSV_PO_MRP_OWNER_SHIP = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataEDT_KSV_PO_MRP = { ...dataEDT_KSV_PO_MRP };

        let tTypeVal = _dataEDT_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_KSV_PO_MRP[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_KSV_PO_MRP[`${name}`] = parseInt(val);
        }

        console.log(e.value);

        setDataEDT_KSV_PO_MRP(_dataEDT_KSV_PO_MRP);
        setDataEDT_KSV_PO_MRP_OWNER_SHIP(e.value);
    };

    const [
        datasEDT_KSV_PO_MRP_REASON_MAKE,
        setDatasEDT_KSV_PO_MRP_REASON_MAKE,
    ] = useState([]);
    const [dataEDT_KSV_PO_MRP_REASON_MAKE, setDataEDT_KSV_PO_MRP_REASON_MAKE] =
        useState({});

    const editEDT_KSV_PO_MRP_REASON_MAKE = (argValue) => {
        let _dataEDT_KSV_PO_MRP_REASON_MAKE =
            datasEDT_KSV_PO_MRP_REASON_MAKE.filter(
                (val) => val.CD_CODE === argValue,
            );
        setDataEDT_KSV_PO_MRP_REASON_MAKE(_dataEDT_KSV_PO_MRP_REASON_MAKE[0]);
    };

    const onDropdownChangeEDT_KSV_PO_MRP_REASON_MAKE = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataEDT_KSV_PO_MRP = { ...dataEDT_KSV_PO_MRP };

        let tTypeVal = _dataEDT_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_KSV_PO_MRP[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_KSV_PO_MRP[`${name}`] = parseInt(val);
        }

        setDataEDT_KSV_PO_MRP(_dataEDT_KSV_PO_MRP);
        setDataEDT_KSV_PO_MRP_REASON_MAKE(e.value);
    };

    const [datasEDT_KSV_PO_MRP_AUTHORITY, setDatasEDT_KSV_PO_MRP_AUTHORITY] =
        useState([]);
    const [dataEDT_KSV_PO_MRP_AUTHORITY, setDataEDT_KSV_PO_MRP_AUTHORITY] =
        useState({});

    const editEDT_KSV_PO_MRP_AUTHORITY = (argValue) => {
        let _dataEDT_KSV_PO_MRP_AUTHORITY =
            datasEDT_KSV_PO_MRP_AUTHORITY.filter(
                (val) => val.CD_CODE === argValue,
            );
        setDataEDT_KSV_PO_MRP_AUTHORITY(_dataEDT_KSV_PO_MRP_AUTHORITY[0]);
    };

    const onDropdownChangeEDT_KSV_PO_MRP_AUTHORITY = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataEDT_KSV_PO_MRP = { ...dataEDT_KSV_PO_MRP };

        let tTypeVal = _dataEDT_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_KSV_PO_MRP[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_KSV_PO_MRP[`${name}`] = parseInt(val);
        }

        setDataEDT_KSV_PO_MRP(_dataEDT_KSV_PO_MRP);
        setDataEDT_KSV_PO_MRP_AUTHORITY(e.value);
    };

    const [datasEDT_KSV_PO_MRP_CONDITION, setDatasEDT_KSV_PO_MRP_CONDITION] =
        useState([]);
    const [dataEDT_KSV_PO_MRP_CONDITION, setDataEDT_KSV_PO_MRP_CONDITION] =
        useState({});
    const editEDT_KSV_PO_MRP_CONDITION = (argValue) => {
        let _dataEDT_KSV_PO_MRP_CONDITION =
            datasEDT_KSV_PO_MRP_CONDITION.filter(
                (val) => val.CD_CODE === argValue,
            );
        setDataEDT_KSV_PO_MRP_CONDITION(_dataEDT_KSV_PO_MRP_CONDITION[0]);
    };
    const onDropdownChangeEDT_KSV_PO_MRP_CONDITION = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataEDT_KSV_PO_MRP = { ...dataEDT_KSV_PO_MRP };

        let tTypeVal = _dataEDT_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_KSV_PO_MRP[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_KSV_PO_MRP[`${name}`] = parseInt(val);
        }

        setDataEDT_KSV_PO_MRP(_dataEDT_KSV_PO_MRP);
        setDataEDT_KSV_PO_MRP_CONDITION(e.value);
    };

    const [datasEDT_KSV_PO_MRP_STOCK_STATUS_1, setDatasEDT_KSV_PO_MRP_STOCK_STATUS_1] =
        useState([]);
    const [dataEDT_KSV_PO_MRP_STOCK_STATUS_1, setDataEDT_KSV_PO_MRP_STOCK_STATUS_1] =
        useState({});
    const editEDT_KSV_PO_MRP_STOCK_STATUS_1 = (argValue) => {
        let _dataEDT_KSV_PO_MRP_STOCK_STATUS_1 =
            datasEDT_KSV_PO_MRP_STOCK_STATUS_1.filter(
                (val) => val.CD_CODE === argValue,
            );
        setDataEDT_KSV_PO_MRP_STOCK_STATUS_1(_dataEDT_KSV_PO_MRP_STOCK_STATUS_1[0]);
    };
    const onDropdownChangeEDT_KSV_PO_MRP_STOCK_STATUS_1 = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";
        let val_name = (e.value && e.value.CD_NAME) || "";

        let _dataEDT_KSV_PO_MRP = { ...dataEDT_KSV_PO_MRP };

        let tTypeVal = _dataEDT_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_KSV_PO_MRP[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_KSV_PO_MRP[`${name}`] = parseInt(val);
        }

        if (val.length > 2 || val_name === 'ALL') {
            if (val_name === 'ALL') {
                var tArray = [];
                tArray.push(e.value);
                savesQRY_KSV_PO_MRP_STOCK_STATUS_S.forEach((col, i) => {
                    if (col.CD_CODE.length <= 2) {
                        tArray.push(col);
                    } 
                });
                setDatasEDT_KSV_PO_MRP_STOCK_STATUS_S(tArray);
                setDataEDT_KSV_PO_MRP_STOCK_STATUS_S(tArray[0]);
                _dataEDT_KSV_PO_MRP.STOCK_STATUS_S = tArray[0].CD_CODE;
            } else {
                var strArray = val.split('');
                var tArray = [];
                var allObj = {};
                allObj.CD_CODE = '';
                allObj.CD_NAME = 'ALL';
                strArray.forEach((col1, i1) => {
                    savesQRY_KSV_PO_MRP_STOCK_STATUS_S.forEach((col2, i2) => {
                         if (col1 === col2.CD_CODE) tArray.push(col2);
                    });
                });
                setDatasEDT_KSV_PO_MRP_STOCK_STATUS_S(tArray);
                setDataEDT_KSV_PO_MRP_STOCK_STATUS_S(tArray[0]);
                _dataEDT_KSV_PO_MRP.STOCK_STATUS_S = tArray[0].CD_CODE;
            }
        } else {
            var tArray = [];
            tArray.push(e.value);
            setDatasEDT_KSV_PO_MRP_STOCK_STATUS_S(tArray);
            setDataEDT_KSV_PO_MRP_STOCK_STATUS_S(tArray[0]);
            _dataEDT_KSV_PO_MRP.STOCK_STATUS_S = tArray[0].CD_CODE;
        }

        setDataEDT_KSV_PO_MRP(_dataEDT_KSV_PO_MRP);
        setDataEDT_KSV_PO_MRP_STOCK_STATUS_1(e.value);
    };

    const [datasEDT_KSV_PO_MRP_STOCK_STATUS_S, setDatasEDT_KSV_PO_MRP_STOCK_STATUS_S] =
        useState([]);
    const [dataEDT_KSV_PO_MRP_STOCK_STATUS_S, setDataEDT_KSV_PO_MRP_STOCK_STATUS_S] =
        useState({});
    const editEDT_KSV_PO_MRP_STOCK_STATUS_S = (argValue) => {
        let _dataEDT_KSV_PO_MRP_STOCK_STATUS_S =
            datasEDT_KSV_PO_MRP_STOCK_STATUS_S.filter(
                (val) => val.CD_CODE === argValue,
            );
        setDataEDT_KSV_PO_MRP_STOCK_STATUS_S(_dataEDT_KSV_PO_MRP_STOCK_STATUS_S[0]);
    };
    const onDropdownChangeEDT_KSV_PO_MRP_STOCK_STATUS_S = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataEDT_KSV_PO_MRP = { ...dataEDT_KSV_PO_MRP };

        let tTypeVal = _dataEDT_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_KSV_PO_MRP[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_KSV_PO_MRP[`${name}`] = parseInt(val);
        }

        setDataEDT_KSV_PO_MRP(_dataEDT_KSV_PO_MRP);
        setDataEDT_KSV_PO_MRP_STOCK_STATUS_S(e.value);
    };



    const [datasEDT_KSV_PO_MRP_MANAGER, setDatasEDT_KSV_PO_MRP_MANAGER] =
        useState([]);
    const [dataEDT_KSV_PO_MRP_MANAGER, setDataEDT_KSV_PO_MRP_MANAGER] =
        useState({});

    const editEDT_KSV_PO_MRP_MANAGER = (argValue) => {
        let _dataEDT_KSV_PO_MRP_MANAGER = datasEDT_KSV_PO_MRP_MANAGER.filter(
            (val) => val.CD_CODE === argValue,
        );
        setDataEDT_KSV_PO_MRP_MANAGER(_dataEDT_KSV_PO_MRP_MANAGER[0]);
    };

    const [
        datasEDT_KSV_PO_MRP_REASON_REMARK,
        setDatasEDT_KSV_PO_MRP_REASON_REMARK,
    ] = useState([]);
    const [
        dataEDT_KSV_PO_MRP_REASON_REMARK,
        setDataEDT_KSV_PO_MRP_REASON_REMARK,
    ] = useState({});

    const editEDT_KSV_PO_MRP_REASON_REMARK = (argValue) => {
        let _dataEDT_KSV_PO_MRP_REASON_REMARK =
            datasEDT_KSV_PO_MRP_REASON_REMARK.filter(
                (val) => val.CD_CODE === argValue,
            );
        setDataEDT_KSV_PO_MRP_REASON_REMARK(
            _dataEDT_KSV_PO_MRP_REASON_REMARK[0],
        );
    };

    const onDropdownChangeEDT_KSV_PO_MRP_REASON_REMARK = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataEDT_KSV_PO_MRP = { ...dataEDT_KSV_PO_MRP };

        let tTypeVal = _dataEDT_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_KSV_PO_MRP[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_KSV_PO_MRP[`${name}`] = parseInt(val);
        }

        setDataEDT_KSV_PO_MRP(_dataEDT_KSV_PO_MRP);
        setDataEDT_KSV_PO_MRP_REASON_REMARK(e.value);
    };

    const [datasEDT_KSV_PO_MRP_PURPOSE, setDatasEDT_KSV_PO_MRP_PURPOSE] =
        useState([]);
    const [dataEDT_KSV_PO_MRP_PURPOSE, setDataEDT_KSV_PO_MRP_PURPOSE] =
        useState({});

    const editEDT_KSV_PO_MRP_PURPOSE = (argValue) => {
        let _dataEDT_KSV_PO_MRP_PURPOSE = datasEDT_KSV_PO_MRP_PURPOSE.filter(
            (val) => val.CD_CODE === argValue,
        );
        setDataEDT_KSV_PO_MRP_PURPOSE(_dataEDT_KSV_PO_MRP_PURPOSE[0]);
    };

    const onDropdownChangeEDT_KSV_PO_MRP_PURPOSE = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataEDT_KSV_PO_MRP = { ...dataEDT_KSV_PO_MRP };

        let tTypeVal = _dataEDT_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_KSV_PO_MRP[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_KSV_PO_MRP[`${name}`] = parseInt(val);
        }

        setDataEDT_KSV_PO_MRP(_dataEDT_KSV_PO_MRP);
        setDataEDT_KSV_PO_MRP_PURPOSE(e.value);
    };

    const [datasEDT_KSV_PO_MRP_PLAN_REMARK, setDatasEDT_KSV_PO_MRP_PLAN_REMARK] =
        useState([]);
    const [dataEDT_KSV_PO_MRP_PLAN_REMARK, setDataEDT_KSV_PO_MRP_PLAN_REMARK] =
        useState({});

    const editEDT_KSV_PO_MRP_PLAN_REMARK = (argValue) => {
        let _dataEDT_KSV_PO_MRP_PLAN_REMARK =
            datasEDT_KSV_PO_MRP_PLAN_REMARK.filter(
                (val) => val.CD_CODE === argValue,
            );
        setDataEDT_KSV_PO_MRP_PLAN_REMARK(_dataEDT_KSV_PO_MRP_PLAN_REMARK[0]);
    };

    const onDropdownChangeEDT_KSV_PO_MRP_PLAN_REMARK = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataEDT_KSV_PO_MRP = { ...dataEDT_KSV_PO_MRP };

        let tTypeVal = _dataEDT_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_KSV_PO_MRP[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_KSV_PO_MRP[`${name}`] = parseInt(val);
        }

        setDataEDT_KSV_PO_MRP(_dataEDT_KSV_PO_MRP);
        setDataEDT_KSV_PO_MRP_PLAN_REMARK(e.value);
    };

    const onInputChangeEDT_KSV_PO_MRP_REMARK = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_PO_MRP = { ...dataEDT_KSV_PO_MRP };

        let tTypeVal = _dataEDT_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string") _dataEDT_KSV_PO_MRP[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_PO_MRP[`${name}`] = parseInt(val);

        setDataEDT_KSV_PO_MRP(_dataEDT_KSV_PO_MRP);
    };



    const onInputChangeEDT_KSV_PO_MRP_RACK = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_PO_MRP = { ...dataEDT_KSV_PO_MRP };

        let tTypeVal = _dataEDT_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string") _dataEDT_KSV_PO_MRP[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_PO_MRP[`${name}`] = parseInt(val);

        setDataEDT_KSV_PO_MRP(_dataEDT_KSV_PO_MRP);
    };

    const onInputChangeEDT_KSV_PO_MRP_LOCATION = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_PO_MRP = { ...dataEDT_KSV_PO_MRP };

        let tTypeVal = _dataEDT_KSV_PO_MRP[`${name}`];
        if (typeof tTypeVal === "string") _dataEDT_KSV_PO_MRP[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_PO_MRP[`${name}`] = parseInt(val);

        setDataEDT_KSV_PO_MRP(_dataEDT_KSV_PO_MRP);
    };

    // EDT_KSV_PO_MRP2
    const [dataEDT_KSV_PO_MRP2, setDataEDT_KSV_PO_MRP2] =
        useState(emptyEDT_KSV_PO_MRP2);

    const onInputChangeEDT_KSV_PO_MRP2_DEFECT_QTY = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_PO_MRP2 = { ...dataEDT_KSV_PO_MRP2 };

        let tTypeVal = _dataEDT_KSV_PO_MRP2[`${name}`];
        if (typeof tTypeVal === "string") _dataEDT_KSV_PO_MRP2[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_PO_MRP2[`${name}`] = parseInt(val);

        setDataEDT_KSV_PO_MRP2(_dataEDT_KSV_PO_MRP2);
    };

    const onInputChangeEDT_KSV_PO_MRP2_STOCK_PRICE = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_PO_MRP2 = { ...dataEDT_KSV_PO_MRP2 };

        let tTypeVal = _dataEDT_KSV_PO_MRP2[`${name}`];
        if (typeof tTypeVal === "string") _dataEDT_KSV_PO_MRP2[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_PO_MRP2[`${name}`] = parseInt(val);

        setDataEDT_KSV_PO_MRP2(_dataEDT_KSV_PO_MRP2);
    };

    const onInputChangeEDT_KSV_PO_MRP2_STOCK_DATE = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_PO_MRP2 = { ...dataEDT_KSV_PO_MRP2 };

        let tTypeVal = _dataEDT_KSV_PO_MRP2[`${name}`];
        if (typeof tTypeVal === "string") _dataEDT_KSV_PO_MRP2[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_PO_MRP2[`${name}`] = parseInt(val);

        setDataEDT_KSV_PO_MRP2(_dataEDT_KSV_PO_MRP2);
    };

    const onInputChangeEDT_KSV_PO_MRP2_CHARGER = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_PO_MRP2 = { ...dataEDT_KSV_PO_MRP2 };

        let tTypeVal = _dataEDT_KSV_PO_MRP2[`${name}`];
        if (typeof tTypeVal === "string") _dataEDT_KSV_PO_MRP2[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_PO_MRP2[`${name}`] = parseInt(val);

        setDataEDT_KSV_PO_MRP2(_dataEDT_KSV_PO_MRP2);
    };

    const [datasEDT_KSV_PO_MRP2_WARE_CD, setDatasEDT_KSV_PO_MRP2_WARE_CD] =
        useState([]);
    const [dataEDT_KSV_PO_MRP2_WARE_CD, setDataEDT_KSV_PO_MRP2_WARE_CD] =
        useState({});

    const editEDT_KSV_PO_MRP2_WARE_CD = (argValue) => {
        let _dataEDT_KSV_PO_MRP2_WARE_CD = datasEDT_KSV_PO_MRP2_WARE_CD.filter(
            (val) => val.WARE_CD === argValue,
        );
        setDataEDT_KSV_PO_MRP2_WARE_CD(_dataEDT_KSV_PO_MRP2_WARE_CD[0]);
    };

    const [datasEDT_KSV_PO_MRP2_BUYER_CD, setDatasEDT_KSV_PO_MRP2_BUYER_CD] =
        useState([]);
    const [dataEDT_KSV_PO_MRP2_BUYER_CD, setDataEDT_KSV_PO_MRP2_BUYER_CD] =
        useState({});

    const editEDT_KSV_PO_MRP2_BUYER_CD = (argValue) => {
        let _dataEDT_KSV_PO_MRP2_BUYER_CD = datasEDT_KSV_PO_MRP2_BUYER_CD.filter(
            (val) => val.BUYER_CD === argValue,
        );
        setDataEDT_KSV_PO_MRP2_BUYER_CD(_dataEDT_KSV_PO_MRP2_BUYER_CD[0]);
    };

    const onDropdownChangeEDT_KSV_PO_MRP2_BUYER_CD = (e, name) => {
        let val = (e.value && e.value.BUYER_CD) || "";

        let _dataEDT_KSV_PO_MRP2 = { ...dataEDT_KSV_PO_MRP2 };

        let tTypeVal = _dataEDT_KSV_PO_MRP2[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_KSV_PO_MRP2[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_KSV_PO_MRP2[`${name}`] = parseInt(val);
        }

        setDataEDT_KSV_PO_MRP2(_dataEDT_KSV_PO_MRP2);
        setDataEDT_KSV_PO_MRP2_BUYER_CD(e.value);
    };

    const [datasEDT_KSV_PO_MRP2_FACTORY_CD, setDatasEDT_KSV_PO_MRP2_FACTORY_CD] =
        useState([]);
    const [dataEDT_KSV_PO_MRP2_FACTORY_CD, setDataEDT_KSV_PO_MRP2_FACTORY_CD] =
        useState({});

    const editEDT_KSV_PO_MRP2_FACTORY_CD = (argValue) => {
        let _dataEDT_KSV_PO_MRP2_FACTORY_CD =
            datasEDT_KSV_PO_MRP2_FACTORY_CD.filter(
                (val) => val.FACTORY_CD === argValue,
            );
        setDataEDT_KSV_PO_MRP2_FACTORY_CD(_dataEDT_KSV_PO_MRP2_FACTORY_CD[0]);
    };

    const onDropdownChangeEDT_KSV_PO_MRP2_FACTORY_CD = (e, name) => {
        let val = (e.value && e.value.FACTORY_CD) || "";

        let _dataEDT_KSV_PO_MRP2 = { ...dataEDT_KSV_PO_MRP2 };

        let tTypeVal = _dataEDT_KSV_PO_MRP2[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_KSV_PO_MRP2[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_KSV_PO_MRP2[`${name}`] = parseInt(val);
        }

        setDataEDT_KSV_PO_MRP2(_dataEDT_KSV_PO_MRP2);
        setDataEDT_KSV_PO_MRP2_FACTORY_CD(e.value);
    };

    const [datasEDT_KSV_PO_MRP2_OWNER_SHIP, setDatasEDT_KSV_PO_MRP2_OWNER_SHIP] =
        useState([]);
    const [dataEDT_KSV_PO_MRP2_OWNER_SHIP, setDataEDT_KSV_PO_MRP2_OWNER_SHIP] =
        useState({});

    const editEDT_KSV_PO_MRP2_OWNER_SHIP = (argValue) => {
        let _dataEDT_KSV_PO_MRP2_OWNER_SHIP =
            datasEDT_KSV_PO_MRP2_OWNER_SHIP.filter(
                (val) => val.CD_CODE === argValue,
            );
        setDataEDT_KSV_PO_MRP2_OWNER_SHIP(_dataEDT_KSV_PO_MRP2_OWNER_SHIP[0]);
    };

    const onDropdownChangeEDT_KSV_PO_MRP2_OWNER_SHIP = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataEDT_KSV_PO_MRP2 = { ...dataEDT_KSV_PO_MRP2 };

        let tTypeVal = _dataEDT_KSV_PO_MRP2[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_KSV_PO_MRP2[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_KSV_PO_MRP2[`${name}`] = parseInt(val);
        }

        console.log(e.value);

        setDataEDT_KSV_PO_MRP2(_dataEDT_KSV_PO_MRP2);
        setDataEDT_KSV_PO_MRP2_OWNER_SHIP(e.value);
    };

    const [
        datasEDT_KSV_PO_MRP2_REASON_MAKE,
        setDatasEDT_KSV_PO_MRP2_REASON_MAKE,
    ] = useState([]);
    const [dataEDT_KSV_PO_MRP2_REASON_MAKE, setDataEDT_KSV_PO_MRP2_REASON_MAKE] =
        useState({});

    const editEDT_KSV_PO_MRP2_REASON_MAKE = (argValue) => {
        let _dataEDT_KSV_PO_MRP2_REASON_MAKE =
            datasEDT_KSV_PO_MRP2_REASON_MAKE.filter(
                (val) => val.CD_CODE === argValue,
            );
        setDataEDT_KSV_PO_MRP2_REASON_MAKE(_dataEDT_KSV_PO_MRP2_REASON_MAKE[0]);
    };

    const onDropdownChangeEDT_KSV_PO_MRP2_REASON_MAKE = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataEDT_KSV_PO_MRP2 = { ...dataEDT_KSV_PO_MRP2 };

        let tTypeVal = _dataEDT_KSV_PO_MRP2[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_KSV_PO_MRP2[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_KSV_PO_MRP2[`${name}`] = parseInt(val);
        }

        setDataEDT_KSV_PO_MRP2(_dataEDT_KSV_PO_MRP2);
        setDataEDT_KSV_PO_MRP2_REASON_MAKE(e.value);
    };

    const [datasEDT_KSV_PO_MRP2_AUTHORITY, setDatasEDT_KSV_PO_MRP2_AUTHORITY] =
        useState([]);
    const [dataEDT_KSV_PO_MRP2_AUTHORITY, setDataEDT_KSV_PO_MRP2_AUTHORITY] =
        useState({});

    const editEDT_KSV_PO_MRP2_AUTHORITY = (argValue) => {
        let _dataEDT_KSV_PO_MRP2_AUTHORITY =
            datasEDT_KSV_PO_MRP2_AUTHORITY.filter(
                (val) => val.CD_CODE === argValue,
            );
        setDataEDT_KSV_PO_MRP2_AUTHORITY(_dataEDT_KSV_PO_MRP2_AUTHORITY[0]);
    };

    const onDropdownChangeEDT_KSV_PO_MRP2_AUTHORITY = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataEDT_KSV_PO_MRP2 = { ...dataEDT_KSV_PO_MRP2 };

        let tTypeVal = _dataEDT_KSV_PO_MRP2[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_KSV_PO_MRP2[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_KSV_PO_MRP2[`${name}`] = parseInt(val);
        }

        setDataEDT_KSV_PO_MRP2(_dataEDT_KSV_PO_MRP2);
        setDataEDT_KSV_PO_MRP2_AUTHORITY(e.value);
    };

    const [datasEDT_KSV_PO_MRP2_CONDITION, setDatasEDT_KSV_PO_MRP2_CONDITION] =
        useState([]);
    const [dataEDT_KSV_PO_MRP2_CONDITION, setDataEDT_KSV_PO_MRP2_CONDITION] =
        useState({});

    const editEDT_KSV_PO_MRP2_CONDITION = (argValue) => {
        let _dataEDT_KSV_PO_MRP2_CONDITION =
            datasEDT_KSV_PO_MRP2_CONDITION.filter(
                (val) => val.CD_CODE === argValue,
            );
        setDataEDT_KSV_PO_MRP2_CONDITION(_dataEDT_KSV_PO_MRP2_CONDITION[0]);
    };

    const onDropdownChangeEDT_KSV_PO_MRP2_CONDITION = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataEDT_KSV_PO_MRP2 = { ...dataEDT_KSV_PO_MRP2 };

        let tTypeVal = _dataEDT_KSV_PO_MRP2[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_KSV_PO_MRP2[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_KSV_PO_MRP2[`${name}`] = parseInt(val);
        }

        setDataEDT_KSV_PO_MRP2(_dataEDT_KSV_PO_MRP2);
        setDataEDT_KSV_PO_MRP2_CONDITION(e.value);
    };

    const [datasEDT_KSV_PO_MRP2_MANAGER, setDatasEDT_KSV_PO_MRP2_MANAGER] =
        useState([]);
    const [dataEDT_KSV_PO_MRP2_MANAGER, setDataEDT_KSV_PO_MRP2_MANAGER] =
        useState({});

    const editEDT_KSV_PO_MRP2_MANAGER = (argValue) => {
        let _dataEDT_KSV_PO_MRP2_MANAGER = datasEDT_KSV_PO_MRP2_MANAGER.filter(
            (val) => val.CD_CODE === argValue,
        );
        setDataEDT_KSV_PO_MRP2_MANAGER(_dataEDT_KSV_PO_MRP2_MANAGER[0]);
    };

    const [
        datasEDT_KSV_PO_MRP2_REASON_REMARK,
        setDatasEDT_KSV_PO_MRP2_REASON_REMARK,
    ] = useState([]);
    const [
        dataEDT_KSV_PO_MRP2_REASON_REMARK,
        setDataEDT_KSV_PO_MRP2_REASON_REMARK,
    ] = useState({});

    const editEDT_KSV_PO_MRP2_REASON_REMARK = (argValue) => {
        let _dataEDT_KSV_PO_MRP2_REASON_REMARK =
            datasEDT_KSV_PO_MRP2_REASON_REMARK.filter(
                (val) => val.CD_CODE === argValue,
            );
        setDataEDT_KSV_PO_MRP2_REASON_REMARK(
            _dataEDT_KSV_PO_MRP2_REASON_REMARK[0],
        );
    };

    const onDropdownChangeEDT_KSV_PO_MRP2_REASON_REMARK = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataEDT_KSV_PO_MRP2 = { ...dataEDT_KSV_PO_MRP2 };

        let tTypeVal = _dataEDT_KSV_PO_MRP2[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_KSV_PO_MRP2[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_KSV_PO_MRP2[`${name}`] = parseInt(val);
        }

        setDataEDT_KSV_PO_MRP2(_dataEDT_KSV_PO_MRP2);
        setDataEDT_KSV_PO_MRP2_REASON_REMARK(e.value);
    };

    const [datasEDT_KSV_PO_MRP2_PURPOSE, setDatasEDT_KSV_PO_MRP2_PURPOSE] =
        useState([]);
    const [dataEDT_KSV_PO_MRP2_PURPOSE, setDataEDT_KSV_PO_MRP2_PURPOSE] =
        useState({});

    const editEDT_KSV_PO_MRP2_PURPOSE = (argValue) => {
        let _dataEDT_KSV_PO_MRP2_PURPOSE = datasEDT_KSV_PO_MRP2_PURPOSE.filter(
            (val) => val.CD_CODE === argValue,
        );
        setDataEDT_KSV_PO_MRP2_PURPOSE(_dataEDT_KSV_PO_MRP2_PURPOSE[0]);
    };

    const onDropdownChangeEDT_KSV_PO_MRP2_PURPOSE = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataEDT_KSV_PO_MRP2 = { ...dataEDT_KSV_PO_MRP2 };

        let tTypeVal = _dataEDT_KSV_PO_MRP2[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_KSV_PO_MRP2[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_KSV_PO_MRP2[`${name}`] = parseInt(val);
        }

        setDataEDT_KSV_PO_MRP2(_dataEDT_KSV_PO_MRP2);
        setDataEDT_KSV_PO_MRP2_PURPOSE(e.value);
    };

    const onInputChangeEDT_KSV_PO_MRP2_REMARK = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_PO_MRP2 = { ...dataEDT_KSV_PO_MRP2 };

        let tTypeVal = _dataEDT_KSV_PO_MRP2[`${name}`];
        if (typeof tTypeVal === "string") _dataEDT_KSV_PO_MRP2[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_PO_MRP2[`${name}`] = parseInt(val);

        setDataEDT_KSV_PO_MRP2(_dataEDT_KSV_PO_MRP2);
    };

    const [datasEDT_KSV_PO_MRP2_PLAN_REMARK, setDatasEDT_KSV_PO_MRP2_PLAN_REMARK] =
        useState([]);
    const [dataEDT_KSV_PO_MRP2_PLAN_REMARK, setDataEDT_KSV_PO_MRP2_PLAN_REMARK] =
        useState({});

    const editEDT_KSV_PO_MRP2_PLAN_REMARK = (argValue) => {
        let _dataEDT_KSV_PO_MRP2_PLAN_REMARK =
            datasEDT_KSV_PO_MRP2_PLAN_REMARK.filter(
                (val) => val.CD_CODE === argValue,
            );
        setDataEDT_KSV_PO_MRP2_PLAN_REMARK(_dataEDT_KSV_PO_MRP2_PLAN_REMARK[0]);
    };

    const onDropdownChangeEDT_KSV_PO_MRP2_PLAN_REMARK = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";

        let _dataEDT_KSV_PO_MRP2 = { ...dataEDT_KSV_PO_MRP2 };

        let tTypeVal = _dataEDT_KSV_PO_MRP2[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_KSV_PO_MRP2[`${name}`] = String(val);
        } else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_KSV_PO_MRP2[`${name}`] = parseInt(val);
        }

        setDataEDT_KSV_PO_MRP2(_dataEDT_KSV_PO_MRP2);
        setDataEDT_KSV_PO_MRP2_PLAN_REMARK(e.value);
    };

    const onInputChangeEDT_KSV_PO_MRP2_RACK = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_PO_MRP2 = { ...dataEDT_KSV_PO_MRP2 };

        let tTypeVal = _dataEDT_KSV_PO_MRP2[`${name}`];
        if (typeof tTypeVal === "string") _dataEDT_KSV_PO_MRP2[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_PO_MRP2[`${name}`] = parseInt(val);

        setDataEDT_KSV_PO_MRP2(_dataEDT_KSV_PO_MRP2);
    };

    const onInputChangeEDT_KSV_PO_MRP2_LOCATION = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataEDT_KSV_PO_MRP2 = { ...dataEDT_KSV_PO_MRP2 };

        let tTypeVal = _dataEDT_KSV_PO_MRP2[`${name}`];
        if (typeof tTypeVal === "string") _dataEDT_KSV_PO_MRP2[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataEDT_KSV_PO_MRP2[`${name}`] = parseInt(val);

        setDataEDT_KSV_PO_MRP2(_dataEDT_KSV_PO_MRP2);
    };


    ///

    useEffect(() => {
        var tObj = {};
        tObj.BUYER_CD = "";
        tObj.VENDOR_CD = "";
        serviceS0523_STOCK_MANAGER.mgrQuery_CODE(tObj).then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                var tRetDate = serviceLib.getCurrDate().substring(0, 8);
                var tObj0 = { ...dataQRY_KSV_PO_MRP };
                tObj0.S_STOCK_DATE = `${tRetDate.substring(0, 6)}01`;
                tObj0.E_STOCK_DATE = `${tRetDate}`;
                tObj0.S_REG_DATE = `${tRetDate.substring(0, 6)}01`;
                tObj0.E_REG_DATE = `${tRetDate}`;
                tObj0.REMAIN_QTY = `not 0`;
                tObj0.IS_STOCK_DATE = "0";
                setDataQRY_KSV_PO_MRP(tObj0);

                setDatasQRY_KSV_PO_MRP_FACTORY_CD(data.FACTORY_CD);
                setDataQRY_KSV_PO_MRP_FACTORY_CD(data.FACTORY_CD[0]);

                setDatasQRY_KSV_PO_MRP_BUYER_CD(data.BUYER_CD);
                setDataQRY_KSV_PO_MRP_BUYER_CD(data.BUYER_CD[0]);

                setDatasQRY_KSV_PO_MRP_PO_CD(data.PO_CD);
                setDataQRY_KSV_PO_MRP_PO_CD(data.PO_CD[0]);

                setDatasQRY_KSV_PO_MRP_STATUS_CD2(data.STOCK_CODE);
                setDataQRY_KSV_PO_MRP_STATUS_CD2(data.STOCK_CODE[0]);

                //setDatasQRY_KSV_PO_MRP_VENDOR_CD(data.VENDOR_CD);
                //setDataQRY_KSV_PO_MRP_VENDOR_CD(data.VENDOR_CD[0]);

                setDatasQRY_KSV_PO_MRP_KIND2(data.KIND2);
                setDataQRY_KSV_PO_MRP_KIND2(data.KIND2[0]);

                var tArray = ["not 0", "all", "0", "error"];
                var tArray1 = [];
                tArray.forEach((col, i) => {
                    var tObj = {};
                    tObj.CD_CODE = col;
                    tObj.CD_NAME = col;
                    tArray1.push(tObj);
                });
                setDatasQRY_KSV_PO_MRP_REMAIN_QTY(tArray1);
                setDataQRY_KSV_PO_MRP_REMAIN_QTY(tArray1[0]);

                // setDatasQRY_KSV_PO_MRP_ORDER_CD(data.ORDER_CD);
                // setDataQRY_KSV_PO_MRP_ORDER_CD(data.ORDER_CD[0]);

                setDatasEDT_KSV_PO_MRP2_OWNER_SHIP(data.OWNER_SHIP);
                setDatasEDT_KSV_PO_MRP_OWNER_SHIP(data.OWNER_SHIP);
                setDataEDT_KSV_PO_MRP_OWNER_SHIP(data.OWNER_SHIP[0]);

                setDatasQRY_KSV_PO_MRP_OWNER_SHIP(data.OWNER_SHIP);
                setDataQRY_KSV_PO_MRP_OWNER_SHIP([]);

                setSavesQRY_KSV_PO_MRP_STOCK_STATUS_S(data.STOCK_STATUS_S);
                setDatasQRY_KSV_PO_MRP_STOCK_STATUS_S(data.STOCK_STATUS_S);
                setDataQRY_KSV_PO_MRP_STOCK_STATUS_S(data.STOCK_STATUS_S[0]);

                setDatasEDT_KSV_PO_MRP_STOCK_STATUS_S(data.STOCK_STATUS_S);
                setDataEDT_KSV_PO_MRP_STOCK_STATUS_S(data.STOCK_STATUS_S[0]);

                setDatasEDT_KSV_PO_MRP2_REASON_MAKE(data.REASON_MAKE);
                setDatasEDT_KSV_PO_MRP_REASON_MAKE(data.REASON_MAKE);
                setDataEDT_KSV_PO_MRP_REASON_MAKE(data.REASON_MAKE[0]);

                if (data.PLAN && data.PLAN.length > 0) {
                    setDatasEDT_KSV_PO_MRP2_PLAN_REMARK(data.PLAN);
                    setDatasEDT_KSV_PO_MRP_PLAN_REMARK(data.PLAN);
                    setDataEDT_KSV_PO_MRP_PLAN_REMARK(data.PLAN[0]);
                }

                setDatasEDT_KSV_PO_MRP2_AUTHORITY(data.AUTHORITY);
                setDatasEDT_KSV_PO_MRP_AUTHORITY(data.AUTHORITY);
                setDataEDT_KSV_PO_MRP_AUTHORITY(data.AUTHORITY[0]);

                setDatasQRY_KSV_PO_MRP_AUTHORITY(data.AUTHORITY);
                setDataQRY_KSV_PO_MRP_AUTHORITY(data.AUTHORITY[0]);

                setDatasEDT_KSV_PO_MRP2_CONDITION(data.CONDITION);
                setDatasEDT_KSV_PO_MRP_CONDITION(data.CONDITION);
                setDataEDT_KSV_PO_MRP_CONDITION(data.CONDITION[0]);

                setDatasEDT_KSV_PO_MRP_STOCK_STATUS_1(data.CONDITION);
                setDataEDT_KSV_PO_MRP_STOCK_STATUS_1(data.CONDITION[0]);


                setDatasQRY_KSV_PO_MRP_CONDITION(data.CONDITION);
                setDataQRY_KSV_PO_MRP_CONDITION(data.CONDITION[1]);

                setDatasEDT_KSV_PO_MRP2_MANAGER(data.MANAGER);
                setDatasEDT_KSV_PO_MRP_MANAGER(data.MANAGER);
                setDataEDT_KSV_PO_MRP_MANAGER(data.MANAGER[0]);

                setDatasEDT_KSV_PO_MRP2_REASON_REMARK(data.REMARK);
                setDatasEDT_KSV_PO_MRP_REASON_REMARK(data.REMARK);
                setDataEDT_KSV_PO_MRP_REASON_REMARK(data.REMARK[0]);

                setDatasEDT_KSV_PO_MRP2_PURPOSE(data.PURPOSE);
                setDatasEDT_KSV_PO_MRP_PURPOSE(data.PURPOSE);
                setDataEDT_KSV_PO_MRP_PURPOSE(data.PURPOSE[0]);

                setDatasQRY_KSV_PO_MRP_PURPOSE(data.PURPOSE);
                setDataQRY_KSV_PO_MRP_PURPOSE(data.PURPOSE[0]);

                setDatasEDT_KSV_PO_MRP2_WARE_CD(data.WARE_CD);
                setDatasEDT_KSV_PO_MRP_WARE_CD(data.WARE_CD);
                setDataEDT_KSV_PO_MRP_WARE_CD(data.WARE_CD[0]);

                setDatasEDT_KSV_PO_MRP2_FACTORY_CD(data.FACTORY_CD);
                setDatasEDT_KSV_PO_MRP_FACTORY_CD(data.FACTORY_CD);
                setDataEDT_KSV_PO_MRP_FACTORY_CD(data.FACTORY_CD[0]);

                setDatasEDT_KSV_PO_MRP2_BUYER_CD(data.BUYER_CD);
                setDatasEDT_KSV_PO_MRP_BUYER_CD(data.BUYER_CD);
                setDataEDT_KSV_PO_MRP_BUYER_CD(data.BUYER_CD[0]);
            } else {
                console.log(
                    "mgrQuery_PO_CD error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });

        // search_LIST_1();
        // search_LIST_2();
    }, []);

    const blankFn = () => {};

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

    const parseExportCode = (code) => {
        const rawCode = String(code || "");
        if (!rawCode.includes("SUCC")) {
            return null;
        }

        const firstQ = rawCode.indexOf("?");
        if (firstQ < 0) {
            return null;
        }

        const payload = rawCode.slice(firstQ + 1);
        const secondQ = payload.indexOf("?");
        if (secondQ < 0) {
            return null;
        }

        const rawFileName = payload.slice(0, secondQ) || "";
        const fileUrl = payload.slice(secondQ + 1) || "";

        let fileName = rawFileName;
        try {
            fileName = decodeURIComponent(rawFileName);
        } catch (e) {
            fileName = rawFileName;
        }

        // 서버가 경로를 같이 주는 경우 마지막 파일명만 사용
        fileName = String(fileName).split("/").pop().split("\\").pop();

        return {
            fileName,
            fileUrl,
        };
    };

    const downloadByExportCode = async (code) => {
        const parsed = parseExportCode(code);
        if (!parsed || !parsed.fileUrl) {
            return false;
        }

        try {
            const response = await fetch(parsed.fileUrl);
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }

            const blob = await response.blob();
            const objectUrl = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = objectUrl;
            a.download = parsed.fileName || "download.xlsx";
            a.style.display = "none";
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(objectUrl);
            return true;
        } catch (error) {
            console.log("blob download fallback", error);
        }

        await serviceLib.downloadFile(parsed.fileUrl, parsed.fileName);
        return true;
    };

    const EXPORT_GRID_FIELD_MAP = {
        MATL_TYPE_N: "MATL_TYPE_N",
        MATL_TYPE2_N: "MATL_TYPE2_N",
        FACTORY_NAME: "FACTORY_NAME",
        STOCK_DATE: "STOCK_DATE",
        REG_DATETIME: "REG_DATETIME",
        PO_CD: "PO_CD",
        ORDER_CD: "ORDER_CD",
        BUYER_NAME: "BUYER_NAME",
        VENDOR_NAME: "VENDOR_NAME",
        MATL_CD: "MATL_CD",
        MATL_NAME: "MATL_NAME",
        COLOR: "COLOR",
        SPEC: "SPEC",
        UNIT: "UNIT",
        STOCK_STATUS_N: "STOCK_STATUS_N",
        STOCK_STATUS_2_N: "STOCK_STATUS_2_N",
        STOCK_STATUS_S: "STOCK_STATUS_S",
        STOCK_STATUS: "STOCK_STATUS",
        STOCK_STATUS_2: "STOCK_STATUS_2",
        ORG_QTY: "ORG_QTY",
        STOCK_QTY: "STOCK_QTY",
        REMAIN_QTY: "REMAIN_QTY",
        USE_QTY: "USE_QTY",
        OUT_QTY: "OUT_QTY",
        RACK: "RACK",
        LOCATION: "LOCATION",
        ORG_STOCK_IDX: "ORG_STOCK_IDX",
        STOCK_IDX: "STOCK_IDX",
        ROOT_IDX: "ROOT_IDX",
        REMARK: "REMARK",
        EXP_DATE: "EXP_DATE",
        REASON_REMARK: "REASON_REMARK",
        PLAN_REMARK: "PLAN_REMARK",
        DEBIT: "DEBIT_CD",
        DEBIT_CD: "DEBIT_CD",
        REMARK0: "REMARK0",
        ORG_REASON: "ORG_REASON",
        MATL_TYPE: "MATL_TYPE",
        WARE_CD: "WARE_CD",
        PO_PRICE: "PO_PRICE",
        CURR_CD: "CURR_CD",
    };

    const buildExportGridRows = (rows) => {
        if (!Array.isArray(rows)) {
            return [];
        }

        return rows.map((row) => {
            const compact = {};
            Object.entries(EXPORT_GRID_FIELD_MAP).forEach(([source, target]) => {
                if (typeof row[source] !== "undefined") {
                    const value = row[source];
                    compact[target] = value == null ? "" : String(value);
                }
            });
            return compact;
        });
    };

    const splitExportGridRows = (rows, maxChunkBytes = 900000) => {
        if (!Array.isArray(rows) || rows.length === 0) {
            return [];
        }

        const chunks = [];
        let currentChunk = [];
        let currentSize = 2;

        for (const row of rows) {
            const rowSize = JSON.stringify(row).length + 1;
            if (currentChunk.length > 0 && currentSize + rowSize > maxChunkBytes) {
                chunks.push(currentChunk);
                currentChunk = [row];
                currentSize = 2 + rowSize;
            } else {
                currentChunk.push(row);
                currentSize += rowSize;
            }
        }

        if (currentChunk.length > 0) {
            chunks.push(currentChunk);
        }

        return chunks;
    };

    const export_STOCK_LIST = async (buyerTeam) => {
        let _dataQRY_KSV_PO_MRP = getQueryObj_LIST_1(buyerTeam);
        delete _dataQRY_KSV_PO_MRP.STOCK_STATUS_S;
        delete _dataQRY_KSV_PO_MRP.ROOT_IDX;

        setLoadingTBL_KSV_PO_MRP(true);

        return new Promise(async (resolve) => {
            const data =
                await serviceS0523_STOCK_MANAGER.mgrQuery_EXPORT_STOCK_LIST(
                    _dataQRY_KSV_PO_MRP,
                    [],
                );

            setLoadingTBL_KSV_PO_MRP(false);

            if (typeof data.graphQLErrors !== "undefined") {
                alert("File export failed.");
                resolve(null);
                return;
            }

            if (!data || data.length === 0) {
                alert("No downloadable file was generated.");
                resolve(null);
                return;
            }

            if (await downloadByExportCode(data[0].CODE)) {
                resolve(buyerTeam);
            } else {
                alert(data[0].CODE);
                resolve(null);
            }
        });
    };

    const export_USED_STOCK = () => {
        const queryData = { ...dataQRY_KSV_PO_MRP };
        delete queryData.ROOT_IDX;

        setLoadingTBL_KSV_PO_MRP(true);
        serviceS0523_STOCK_MANAGER
            .mgrQuery_EXPORT_USED_STOCK(queryData)
            .then((data) => {
                console.log(data);
                setLoadingTBL_KSV_PO_MRP(false);
                if (typeof data.graphQLErrors === "undefined") {
                    if (data.length > 0) {
                        console.log(data[0].CODE);
                        if (data[0].CODE.includes("SUCC")) {
                            downloadByExportCode(data[0].CODE);
                        } else {
                            alert(data[0].CODE);
                        }
                    }
                }
            });
    };

    const export_PERIOD_BUYER_STOCK = () => {
        if (!dataQRY_KSV_PO_MRP.BUYER_CD) {
            //alert('SELECT BUYER CODE.');
            //return;
        }

        const queryData = { ...dataQRY_KSV_PO_MRP };
        delete queryData.ROOT_IDX;

        setLoadingTBL_KSV_PO_MRP(true);
        serviceS0523_STOCK_MANAGER
            .mgrQuery_EXPORT_PERIOD_BUYER_STOCK(queryData)
            .then((data) => {
                console.log(data);
                setLoadingTBL_KSV_PO_MRP(false);
                if (typeof data.graphQLErrors === "undefined") {
                    if (data.length > 0) {
                        console.log(data[0].CODE);
                        if (data[0].CODE.includes("SUCC")) {
                            downloadByExportCode(data[0].CODE);
                        } else {
                            alert(data[0].CODE);
                        }
                    }
                }
            });
    };

    const export_STOCK_LIST2 = () => {
        let _dataQRY_KSV_PO_MRP = getQueryObj_LIST_1();
        delete _dataQRY_KSV_PO_MRP.STOCK_STATUS_S;
        delete _dataQRY_KSV_PO_MRP.ROOT_IDX;

        setLoadingTBL_KSV_PO_MRP(true);

        serviceS0523_STOCK_MANAGER
            .mgrQuery_EXPORT_STOCK_LIST2(_dataQRY_KSV_PO_MRP, [])
            .then(async (data) => {
                setLoadingTBL_KSV_PO_MRP(false);

                if (typeof data.graphQLErrors === "undefined") {
                    if (!data || data.length === 0) {
                        alert("No downloadable file was generated.");
                        return;
                    }

                    const successRows = data.filter(
                        (row) => row?.CODE && row.CODE.includes("SUCC"),
                    );
                    const failRows = data.filter(
                        (row) => !row?.CODE || !row.CODE.includes("SUCC"),
                    );

                    for (const row of successRows) {
                        const ok = await downloadByExportCode(row.CODE);
                        if (!ok) {
                            failRows.push(row);
                        }
                    }

                    if (failRows.length > 0) {
                        alert(failRows[0].CODE || "File export failed.");
                    }
                }
            });
    };

    return (
        <div className="af-div-main">
            <div style={{ height: "11rem" }}>
                <div
                    className="af-div-first"
                    style={{ width: "123rem", height: "11rem" }}
                >
                    <span className="af-span-3-0" style={{ width: "17rem" }}>
                        <p className="af-span-p" style={{ width: "7rem" }}>Factory</p>
                        <div className="af-span-div" style={{ width: "9rem" }}>
                            <Dropdown
                                style={{ width: "9rem" }}
                                id="id_ORIGIN_PORT"
                                value={dataQRY_KSV_PO_MRP_FACTORY_CD}
                                onChange={(e) =>
                                    onDropdownChangeQRY_KSV_PO_MRP_FACTORY_CD(
                                        e,
                                        "FACTORY_CD",
                                    )
                                }
                                options={datasQRY_KSV_PO_MRP_FACTORY_CD}
                                optionLabel="FACTORY_NAME"
                                placeholder=""
                                filter
                            ></Dropdown>
                        </div>
                    </span>
                    <span className="af-span-3-0" style={{ width: "14rem" }}>
                        <p className="af-span-p" style={{ width: "4rem" }}>Buyer</p>
                        <div className="af-span-div" style={{ width: "9rem" }}>
                            <Dropdown
                                style={{ width: "9rem" }}
                                id="id_ORIGIN_PORT"
                                value={dataQRY_KSV_PO_MRP_BUYER_CD}
                                onChange={(e) =>
                                    onDropdownChangeQRY_KSV_PO_MRP_BUYER_CD(
                                        e,
                                        "BUYER_CD",
                                    )
                                }
                                options={datasQRY_KSV_PO_MRP_BUYER_CD}
                                optionLabel="BUYER_NAME"
                                placeholder=""
                                filter
                            ></Dropdown>
                        </div>
                    </span>
                    <span className="af-span-3-0" style={{ width: "17rem" }}>
                        <p className="af-span-p" style={{ width: "7rem" }}>Stock Code</p>
                        <div className="af-span-div" style={{ width: "9rem" }}>
                            <Dropdown
                                style={{ width: "9rem" }}
                                id="id_ORIGIN_PORT"
                                value={dataQRY_KSV_PO_MRP_STATUS_CD2}
                                onChange={(e) =>
                                    onDropdownChangeQRY_KSV_PO_MRP_STATUS_CD2(
                                        e,
                                        "STATUS_CD2",
                                    )
                                }
                                options={datasQRY_KSV_PO_MRP_STATUS_CD2}
                                optionLabel="CD_NAME"
                                placeholder=""
                                filter
                            ></Dropdown>
                        </div>
                    </span>
                    <span className="af-span-3-0" style={{ width: "17rem" }}>
                        <p className="af-span-p" style={{ width: "7rem" }}>PO#</p>
                        <div className="af-span-div" style={{ width: "9rem" }}>
                            <InputText
                                style={{ width: "9rem" }}
                                id="id_TARGET_ETA"
                                value={dataQRY_KSV_PO_MRP.PO_CD}
                                onChange={(e) =>
                                    onInputChangeQRY_KSV_PO_MRP_PO_CD(
                                        e,
                                        "PO_CD",
                                    )
                                }
                                onKeyDown={handleSearchInputKeyDown}
                            />
                        </div>
                    </span>
                    <span className="af-span-3-0" style={{ width: "17rem" }}>
                        <p className="af-span-p" style={{ width: "7rem" }}>Supplier</p>
                        <div className="af-span-div" style={{ width: "9rem" }}>
                            <InputText
                                style={{ width: "9rem" }}
                                id="id_TARGET_ETA"
                                value={dataQRY_KSV_PO_MRP_VENDOR_CD}
                                onChange={(e) =>
                                    onInputChangeQRY_KSV_PO_MRP_VENDOR_CD(
                                        e,
                                        "VENDOR_CD",
                                    )
                                }
                                onKeyDown={handleSearchInputKeyDown}
                            />
                        </div>
                    </span>
                    <span className="af-span-3-0" style={{ width: "17rem" }}>
                        <p className="af-span-p" style={{ width: "7rem" }}>Owner Ship</p>
                        <div className="af-span-div" style={{ width: "9rem" }}>
                            <MultiSelect
                                style={{ width: "9rem" }}
                                value={dataQRY_KSV_PO_MRP_OWNER_SHIP}
                                onChange={(e) =>
                                    onDropdownChangeQRY_KSV_PO_MRP_OWNER_SHIP(
                                        e,
                                        "OWNER_SHIP",
                                    )
                                }
                                options={datasQRY_KSV_PO_MRP_OWNER_SHIP}
                                optionLabel="CD_NAME"
                                placeholder=""
                            />
                        </div>
                    </span>
                    <span className="af-span-3-0" style={{ width: "6rem" }}>
                        <div
                            className="af-span-div-btn"
                            style={{ width: "5rem" }}
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
                                style={{ width: "5rem" }}
                                className="p-button-text"
                                onClick={() => search_LIST_1()}
                            />
                        </div>
                    </span>
                    <span className="af-span-3-0" style={{ width: "6rem" }}>
                        <div
                            className="af-span-div-btn"
                            style={{ width: "5rem" }}
                        >
                            <Button
                                label="Reset"
                                style={{ width: "5rem" }}
                                className="p-button-text"
                                onClick={process_RESET_QRY}
                            />
                        </div>
                    </span>
                    <span className="af-span-3-0" style={{ width: "6rem" }}>
                        <div
                            className="af-span-div-btn"
                            style={{ width: "5rem" }}
                        >
                            <Button
                                style={{ width: "5rem" }}
                                label="Excel"
                                className="p-button-text green"
                                onClick={exportExcelTBL_KSV_PO_MRP}
                            />
                        </div>
                    </span>

                    <span className="af-span-3" style={{ width: "17rem" }}>
                        <p className="af-span-p" style={{ width: "7rem" }}>Stock Date</p>
                        <div className="af-span-div" style={{ width: "9rem" }}>
                            <Calendar
                                showButtonBar
                                style={{ width: "9rem" }}
                                dateFormat="yy-mm-dd"
                                id="id_S_PO_DATE"
                                value={changeDateVal(
                                    dataQRY_KSV_PO_MRP.S_STOCK_DATE,
                                )}
                                onChange={(e) =>
                                    onCalChangeQRY_KSV_PO_MRP_S_STOCK_DATE(
                                        e,
                                        "S_STOCK_DATE",
                                    )
                                }
                            />
                        </div>
                    </span>
                    <span className="af-span-3" style={{ width: "17rem" }}>
                        <p className="af-span-p" style={{ width: "1rem" }}>~</p>
                        <div className="af-span-div" style={{ width: "9rem" }}>
                            <Calendar
                                showButtonBar
                                style={{ width: "9rem" }}
                                dateFormat="yy-mm-dd"
                                id="id_S_PO_DATE"
                                value={changeDateVal(
                                    dataQRY_KSV_PO_MRP.E_STOCK_DATE,
                                )}
                                onChange={(e) =>
                                    onCalChangeQRY_KSV_PO_MRP_E_STOCK_DATE(
                                        e,
                                        "E_STOCK_DATE",
                                    )
                                }
                            />
                        </div>
                        <div className="af-span-checkbox">
                            <Checkbox
                                id="id_IS_MAIN"
                                checked={changeCheckBoxVal(
                                    dataQRY_KSV_PO_MRP.IS_STOCK_DATE,
                                )}
                                onChange={(e) =>
                                    onCheckboxChangeQRY_KSV_PO_MRP_IS_STOCK_DATE(
                                        e,
                                        "IS_STOCK_DATE",
                                    )
                                }
                            />
                        </div>
                    </span>
                    <span className="af-span-3" style={{ width: "14rem" }}>
                        <p className="af-span-p" style={{ width: "4rem" }}>Matl#</p>
                        <div className="af-span-div" style={{ width: "9rem" }}>
                            <InputText
                                style={{ width: "9rem" }}
                                id="id_TARGET_ETA"
                                value={dataQRY_KSV_PO_MRP.MATL_CD}
                                onChange={(e) =>
                                    onInputChangeQRY_KSV_PO_MRP_MATL_CD(
                                        e,
                                        "MATL_CD",
                                    )
                                }
                                onKeyDown={handleSearchInputKeyDown}
                            />
                        </div>
                    </span>
                    <span className="af-span-3" style={{ width: "17rem" }}>
                        <p className="af-span-p" style={{ width: "7rem" }}>Rack</p>
                        <div className="af-span-div" style={{ width: "9rem" }}>
                            <InputText
                                style={{ width: "9rem" }}
                                id="id_TARGET_ETA"
                                value={dataQRY_KSV_PO_MRP.RACK}
                                onChange={(e) =>
                                    onInputChangeQRY_KSV_PO_MRP_RACK(e, "RACK")
                                }
                                onKeyDown={handleSearchInputKeyDown}
                            />
                        </div>
                    </span>
                    <span className="af-span-3" style={{ width: "17rem" }}>
                        <p className="af-span-p" style={{ width: "7rem" }}>Kind2</p>
                        <div className="af-span-div" style={{ width: "9rem" }}>
                            <Dropdown
                                style={{ width: "9rem" }}
                                id="id_ORIGIN_PORT"
                                value={dataQRY_KSV_PO_MRP_KIND2}
                                onChange={(e) =>
                                    onDropdownChangeQRY_KSV_PO_MRP_KIND2(
                                        e,
                                        "KIND2",
                                    )
                                }
                                options={datasQRY_KSV_PO_MRP_KIND2}
                                optionLabel="CD_NAME"
                                placeholder=""
                                filter
                            ></Dropdown>
                        </div>
                    </span>
                    <span className="af-span-3" style={{ width: "31rem" }}>
                        <p className="af-span-p" style={{ width: "4rem" }}>Spec</p>
                        <div className="af-span-div" style={{ width: "26rem" }}>
                            <InputText
                                style={{ width: "26rem" }}
                                id="id_TARGET_ETA"
                                value={dataQRY_KSV_PO_MRP.SPEC}
                                onChange={(e) =>
                                    onInputChangeQRY_KSV_PO_MRP_SPEC(e, "SPEC")
                                }
                                onKeyDown={handleSearchInputKeyDown}
                            />
                        </div>
                    </span>

                    <span className="af-span-3" style={{ width: "17rem" }}>
                        <p className="af-span-p" style={{ width: "7rem" }}>Reg Date</p>
                        <div className="af-span-div" style={{ width: "9rem" }}>
                            <Calendar
                                showButtonBar
                                style={{ width: "9rem" }}
                                dateFormat="yy-mm-dd"
                                id="id_S_PO_DATE"
                                value={changeDateVal(
                                    dataQRY_KSV_PO_MRP.S_REG_DATE,
                                )}
                                onChange={(e) =>
                                    onCalChangeQRY_KSV_PO_MRP_S_REG_DATE(
                                        e,
                                        "S_REG_DATE",
                                    )
                                }
                            />
                        </div>
                    </span>
                    <span className="af-span-3" style={{ width: "17rem" }}>
                        <p className="af-span-p" style={{ width: "1rem" }}>~</p>
                        <div className="af-span-div" style={{ width: "9rem" }}>
                            <Calendar
                                showButtonBar
                                style={{ width: "9rem" }}
                                dateFormat="yy-mm-dd"
                                id="id_S_PO_DATE"
                                value={changeDateVal(
                                    dataQRY_KSV_PO_MRP.E_REG_DATE,
                                )}
                                onChange={(e) =>
                                    onCalChangeQRY_KSV_PO_MRP_E_REG_DATE(
                                        e,
                                        "E_REG_DATE",
                                    )
                                }
                            />
                        </div>
                        <div className="af-span-checkbox">
                            <Checkbox
                                id="id_IS_MAIN"
                                checked={changeCheckBoxVal(
                                    dataQRY_KSV_PO_MRP.IS_REG_DATE,
                                )}
                                onChange={(e) =>
                                    onCheckboxChangeQRY_KSV_PO_MRP_IS_REG_DATE(
                                        e,
                                        "IS_REG_DATE",
                                    )
                                }
                            />
                        </div>
                    </span>
                    <span className="af-span-3" style={{ width: "49rem" }}>
                        <p className="af-span-p" style={{ width: "4rem" }}>Desc</p>
                        <div className="af-span-div" style={{ width: "44rem" }}>
                            <InputText
                                style={{ width: "44rem" }}
                                id="id_TARGET_ETA"
                                value={dataQRY_KSV_PO_MRP.DESC}
                                onChange={(e) =>
                                    onInputChangeQRY_KSV_PO_MRP_DESC(e, "DESC")
                                }
                                onKeyDown={handleSearchInputKeyDown}
                            />
                        </div>
                    </span>
                    <span className="af-span-3" style={{ width: "13rem" }}>
                        <p className="af-span-p" style={{ width: "4rem" }}>Color</p>
                        <div className="af-span-div" style={{ width: "8rem" }}>
                            <InputText
                                style={{ width: "8rem" }}
                                id="id_TARGET_ETA"
                                value={dataQRY_KSV_PO_MRP.COLOR}
                                onChange={(e) =>
                                    onInputChangeQRY_KSV_PO_MRP_COLOR(
                                        e,
                                        "COLOR",
                                    )
                                }
                                onKeyDown={handleSearchInputKeyDown}
                            />
                        </div>
                    </span>
                    <span className="af-span-3" style={{ width: "14rem" }}>
                        <p className="af-span-p" style={{ width: "4rem" }}>Remain</p>
                        <div className="af-span-div" style={{ width: "9rem" }}>
                            <Dropdown
                                style={{ width: "9rem" }}
                                id="id_ORIGIN_PORT"
                                value={dataQRY_KSV_PO_MRP_REMAIN_QTY}
                                onChange={(e) =>
                                    onDropdownChangeQRY_KSV_PO_MRP_REMAIN_QTY(
                                        e,
                                        "REMAIN_QTY",
                                    )
                                }
                                options={datasQRY_KSV_PO_MRP_REMAIN_QTY}
                                optionLabel="CD_NAME"
                                placeholder=""
                                filter
                            ></Dropdown>
                        </div>
                    </span>

                    <span className="af-span-3" style={{ width: "17rem" }}>
                        <p className="af-span-p" style={{ width: "7rem" }}>Authority</p>
                        <div className="af-span-div" style={{ width: "9rem" }}>
                            <Dropdown
                                style={{ width: "9rem" }}
                                id="id_ORIGIN_PORT"
                                value={dataQRY_KSV_PO_MRP_AUTHORITY}
                                onChange={(e) =>
                                    onDropdownChangeQRY_KSV_PO_MRP_AUTHORITY(
                                        e,
                                        "AUTHORITY",
                                    )
                                }
                                options={datasQRY_KSV_PO_MRP_AUTHORITY}
                                optionLabel="CD_NAME"
                                placeholder=""
                                filter
                            ></Dropdown>
                        </div>
                    </span>
                    <span className="af-span-3" style={{ width: "17rem" }}>
                        <p className="af-span-p" style={{ width: "7rem" }}>Purpose</p>
                        <div className="af-span-div" style={{ width: "9rem" }}>
                            <Dropdown
                                style={{ width: "9rem" }}
                                id="id_ORIGIN_PORT"
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
                                filter
                            ></Dropdown>
                        </div>
                    </span>
                    <span className="af-span-3" style={{ width: "17rem" }}>
                        <p className="af-span-p" style={{ width: "7rem" }}>Location</p>
                        <div className="af-span-div" style={{ width: "9rem" }}>
                            <InputText
                                style={{ width: "9rem" }}
                                id="id_TARGET_ETA"
                                value={dataQRY_KSV_PO_MRP.LOCATION}
                                onChange={(e) =>
                                    onInputChangeQRY_KSV_PO_MRP_LOCATION(
                                        e,
                                        "LOCATION",
                                    )
                                }
                                onKeyDown={handleSearchInputKeyDown}
                            />
                        </div>
                    </span>
                    <span className="af-span-3" style={{ width: "17rem" }}>
                        <p className="af-span-p" style={{ width: "7rem" }}>Stock#</p>
                        <div className="af-span-div" style={{ width: "9rem" }}>
                            <InputText
                                style={{ width: "9rem" }}
                                id="id_TARGET_ETA"
                                value={dataQRY_KSV_PO_MRP.STOCK_IDX}
                                onChange={(e) =>
                                    onInputChangeQRY_KSV_PO_MRP_STOCK_IDX(
                                        e,
                                        "STOCK_IDX",
                                    )
                                }
                                onKeyDown={handleSearchInputKeyDown}
                            />
                        </div>
                    </span>
                    <span className="af-span-3" style={{ width: "14rem" }}>
                        <p className="af-span-p" style={{ width: "4rem" }}>Root#</p>
                        <div className="af-span-div" style={{ width: "8rem" }}>
                            <InputText
                                style={{ width: "8rem" }}
                                id="id_TARGET_ETA"
                                value={dataQRY_KSV_PO_MRP.ROOT_IDX}
                                onChange={(e) =>
                                    onInputChangeQRY_KSV_PO_MRP_ROOT_IDX(
                                        e,
                                        "ROOT_IDX",
                                    )
                                }
                                onKeyDown={handleSearchInputKeyDown}
                            />
                        </div>
                    </span>
                    <span className="af-span-3" style={{ width: "15rem" }}>
                        <p className="af-span-p" style={{ width: "4rem" }}>Type(Bef)</p>
                        <div className="af-span-div" style={{ width: "10rem" }}>
                            <Dropdown
                                style={{ width: "10rem" }}
                                id="id_ORIGIN_PORT"
                                value={dataQRY_KSV_PO_MRP_CONDITION}
                                onChange={(e) =>
                                    onDropdownChangeQRY_KSV_PO_MRP_CONDITION(
                                        e,
                                        "CONDITION",
                                    )
                                }
                                options={datasQRY_KSV_PO_MRP_CONDITION}
                                optionLabel="CD_NAME"
                                itemTemplate={conditionItemTemplate}
                                valueTemplate={conditionValueTemplate}
                                placeholder=""
                                filter
                            ></Dropdown>
                        </div>
                    </span>
                    <span className="af-span-3" style={{ width: "17rem" }}>
                        <p className="af-span-p" style={{ width: "1rem" }}> </p>
                        <div className="af-span-div" style={{ width: "9rem" }}>
                            <Dropdown
                                style={{ width: "9rem" }}
                                value={dataQRY_KSV_PO_MRP.STOCK_STATUS_S}
                                onChange={(e) =>
                                    setDataQRY_KSV_PO_MRP({
                                        ...dataQRY_KSV_PO_MRP,
                                        STOCK_STATUS_S: e.value,
                                    })
                                }
                                options={datasQRY_KSV_PO_MRP_STOCK_STATUS_S}
                                optionLabel="CD_NAME"
                                optionValue="CD_CODE"
                                filter
                            />
                        </div>
                    </span>
                    <span className="af-span-3">
                        <Button
                            style={{ width: "11rem" }}
                            label="Stock List"
                            className="p-button-text green"
                            onClick={() => export_STOCK_LIST()}
                        />

                        <Button
                            style={{ width: "11rem" }}
                            label="Used Stock"
                            className="p-button-text green"
                            onClick={export_USED_STOCK}
                        />

                        <Button
                            style={{ width: "11rem" }}
                            label="기간-바이어별 재고현황"
                            className="p-button-text green"
                            onClick={export_PERIOD_BUYER_STOCK}
                        />

                        <Button
                            style={{ width: "11rem" }}
                            label="Stock List2"
                            className="p-button-text green"
                            onClick={export_STOCK_LIST2}
                        />
                    </span>
                </div>
            </div>

            <div
                className="af-div-first"
                style={{ width: "123rem", height: "32rem" }}
            >
                <AFDataTable preventUnrelatedRerender
                    ref={dt_TBL_KSV_PO_MRP}
                    size="small"
                    value={datasTBL_KSV_PO_MRP}
                    tableStyle={{ tableLayout: "fixed" }}
                    loading={loadingTBL_KSV_PO_MRP}
                    showGridlines
                    selectionMode="checkbox"
                    resizableColumns
                    columnResizeMode="expand"
                    selection={selectedTBL_KSV_PO_MRP}
                    onSelectionChange={(e) => {
                        setFlagSelectModeTBL_KSV_PO_MRP(true);
                        setSelectedTBL_KSV_PO_MRP(e.value);
                        console.log(
                            "selected length:" + selectedTBL_KSV_PO_MRP.length,
                        );
                        onRowClick1TBL_KSV_PO_MRP(e.value);
                    }}
                    onRowClick={onRowClickTBL_KSV_PO_MRP}
                    dataKey="id"
                    className="datatable-responsive"
                    onRowDoubleClick={onRowDoubleClickTBL_KSV_PO_MRP}
                    virtualScrollerOptions={{ itemSize: 20 }}
                    emptyMessage=" " //header={headerTBL_KSV_PO_MRP}
                    responsiveLayout="scroll"
                    scrollable
                    scrollHeight="360px"
                >
                    <AFColumn selectionMode="multiple" field="__checkbox__" reorderable={false} headerClassName="t-header" headerStyle={{ width: "3rem" }} ></AFColumn>

                    <AFColumn forceWidth field="MATL_TYPE2_N" headerClassName="t-header" header="Matl Type" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn forceWidth field="FACTORY_NAME" headerClassName="t-header" header="Factory" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="STOCK_DATE" headerClassName="t-header" header="Stock Date" style={{ width: "8rem", flexBasis: "auto" }} body={(rowData) => serviceLib.dateFormat(rowData.STOCK_DATE) } ></AFColumn>
                    <AFColumn field="REG_DATETIME" headerClassName="t-header" header="Reg Date" style={{ width: "8rem", flexBasis: "auto" }} body={(rowData) => serviceLib.dateFormat(rowData.REG_DATETIME) } ></AFColumn>
                    <AFColumn field="PO_CD" headerClassName="t-header" header="PO#" style={{ width: "7rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="ORDER_CD" headerClassName="t-header" header="Order#" style={{ width: "7rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn forceWidth field="BUYER_NAME" headerClassName="t-header" header="Buyer" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn forceWidth field="VENDOR_NAME" headerClassName="t-header" header="Supplier" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="MATL_CD" headerClassName="t-header" className="orange" header="Matl#" style={{ width: "6rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn forceWidth field="MATL_NAME" headerClassName="t-header" header="Desc" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn forceWidth field="COLOR" headerClassName="t-header" header="Color" style={{ width: "8rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn forceWidth field="SPEC" headerClassName="t-header" header="Spec" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="UNIT" headerClassName="t-header" header="Unit" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="STOCK_STATUS_2_N" headerClassName="t-header" header="Type" style={{ width: "4rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn forceWidth field="STOCK_STATUS_N" headerClassName="t-header" header="Type(Bef)" style={{ width: "4rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="AUTHORITY" headerClassName="t-header" header="Authority" style={{ width: "6rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="ORG_QTY" headerClassName="t-header" header="Org Qty" style={{ width: "6rem", flexBasis: "auto" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.ORG_QTY, 2) } ></AFColumn>
                    <AFColumn field="STOCK_QTY" headerClassName="t-header" header="Stock Qty" style={{ width: "6rem", flexBasis: "auto" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.STOCK_QTY, 2) } ></AFColumn>
                    <AFColumn field="REMAIN_QTY" headerClassName="t-header" header="Remain Qty" style={{ width: "6rem", flexBasis: "auto" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.REMAIN_QTY, 2) } ></AFColumn>
                    <AFColumn field="USE_QTY" headerClassName="t-header" header="Use Qty" style={{ width: "6rem", flexBasis: "auto" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.USE_QTY, 2) } ></AFColumn>
                    <AFColumn field="OUT_QTY" headerClassName="t-header" header="Out Qty" style={{ width: "6rem", flexBasis: "auto" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.OUT_QTY, 2) } ></AFColumn>
                    <AFColumn field="RACK" headerClassName="t-header" header="Rack" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="LOCATION" headerClassName="t-header" header="Location" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="ORG_STOCK_IDX" headerClassName="t-header" header="Org Stock Idx" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="STOCK_IDX" headerClassName="t-header" header="Stock Idx" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="ROOT_IDX" headerClassName="t-header" header="Root Idx" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="REMARK" headerClassName="t-header" header="Remark" style={{ width: "6rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="EXP_DATE" headerClassName="t-header" header="Exp Date" style={{ width: "8rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="REASON_MAKE_N" headerClassName="t-header" header="Reason" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="PLAN_REMARK" headerClassName="t-header" header="Plan" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="DEBIT_CD" headerClassName="t-header" header="Debit#" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="REMARK0" headerClassName="t-header" header="Remark0" style={{ width: "6rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="ORG_REASON" headerClassName="t-header" header="Org Reason" style={{ width: "6rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="DEFECT_QTY" headerClassName="t-header" header="Defect Qty" style={{ width: "6rem", flexBasis: "auto" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.DEFECT_QTY, 2) } ></AFColumn>
                    <AFColumn field="WAITING_QTY" headerClassName="t-header" header="Waiting Qty" style={{ width: "6rem", flexBasis: "auto" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.WAITING_QTY, 2) } ></AFColumn>
                    <AFColumn field="OWNER_SHIP" headerClassName="t-header" header="Owner" style={{ width: "6rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="REASON_MAKE" headerClassName="t-header" header="Reason" style={{ width: "10rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="CONDITION" headerClassName="t-header" header="Condition" style={{ width: "6rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="MANAGER" headerClassName="t-header" header="Manager" style={{ width: "4rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="PURPOSE" headerClassName="t-header" header="Purpose" style={{ width: "6rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="CHARGER" headerClassName="t-header" header="Charger" style={{ width: "6rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="CURR_CD" headerClassName="t-header" header="Curr" style={{ width: "6rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="PO_PRICE" headerClassName="t-header" header="Po Price" style={{ width: "6rem", flexBasis: "auto" }} bodyStyle={{ textAlign: "right" }} body={(rowData) => serviceLib.numWithCommas(rowData.PO_PRICE, 4) } ></AFColumn>
                </AFDataTable>
            </div>

            <div style={{ height: "14rem" }}>
                <div
                    className="af-div-first"
                    style={{ width: "82rem", height: "14rem" }}
                >
                    <span className="af-span-3-0" style={{ width: "20rem" }}>
                        <p className="af-span-p" style={{ width: "7rem" }}>Stock Date</p>
                        <div className="af-span-div" style={{ width: "9rem" }}>
                            <InputText
                                style={{ width: "9rem" }}
                                id="id_BL_FILE"
                                value={dataEDT_KSV_PO_MRP.STOCK_DATE}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_PO_MRP_STOCK_DATE(
                                        e,
                                        "STOCK_DATE",
                                    )
                                }
                            />
                        </div>
                    </span>
                    <span className="af-span-3-0" style={{ width: "20rem" }}>
                        <p className="af-span-p" style={{ width: "7rem" }}>Charger</p>
                        <div className="af-span-div" style={{ width: "9rem" }}>
                            <InputText
                                disabled
                                style={{ width: "9rem" }}
                                id="id_BL_FILE"
                                value={dataEDT_KSV_PO_MRP.CHARGER}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_PO_MRP_CHARGER(
                                        e,
                                        "CHARGER",
                                    )
                                }
                            />
                        </div>
                    </span>
                    <span className="af-span-3-0" style={{ width: "20rem" }}>
                        <p className="af-span-p" style={{ width: "9rem" }}>Owner Ship</p>
                        <div className="af-span-div" style={{ width: "9rem" }}>
                            <Dropdown
                                style={{ width: "9rem" }}
                                id="id_OWNER_SHIP"
                                value={dataEDT_KSV_PO_MRP_OWNER_SHIP}
                                onChange={(e) =>
                                    onDropdownChangeEDT_KSV_PO_MRP_OWNER_SHIP(
                                        e,
                                        "OWNER_SHIP",
                                    )
                                }
                                options={datasEDT_KSV_PO_MRP_OWNER_SHIP}
                                optionLabel="CD_NAME"
                                placeholder=""
                            ></Dropdown>
                        </div>
                    </span>
                    <span className="af-span-3-0" style={{ width: "17rem" }}>
                        <p className="af-span-p" style={{ width: "7rem" }}>Reason</p>
                        <div className="af-span-div" style={{ width: "9rem" }}>
                            <Dropdown
                                style={{ width: "9rem" }}
                                id="id_REASON_MAKE"
                                value={dataEDT_KSV_PO_MRP_REASON_MAKE}
                                onChange={(e) =>
                                    onDropdownChangeEDT_KSV_PO_MRP_REASON_MAKE(
                                        e,
                                        "REASON_MAKE",
                                    )
                                }
                                options={datasEDT_KSV_PO_MRP_REASON_MAKE}
                                optionLabel="CD_NAME"
                                itemTemplate={reasonMakeItemTemplate}
                                valueTemplate={reasonMakeValueTemplate}
                                placeholder=""
                            ></Dropdown>
                        </div>
                    </span>

                    <span className="af-span-3" style={{ width: "20rem" }}>
                        <p className="af-span-p" style={{ width: "7rem" }}>Authority</p>
                        <div className="af-span-div" style={{ width: "9rem" }}>
                            <Dropdown
                                style={{ width: "9rem" }}
                                id="id_AUTHORITY"
                                value={dataEDT_KSV_PO_MRP_AUTHORITY}
                                onChange={(e) =>
                                    onDropdownChangeEDT_KSV_PO_MRP_AUTHORITY(
                                        e,
                                        "AUTHORITY",
                                    )
                                }
                                options={datasEDT_KSV_PO_MRP_AUTHORITY}
                                optionLabel="CD_NAME"
                                placeholder=""
                            ></Dropdown>
                        </div>
                        <div className="af-span-div" style={{ width: "2rem" }}>
                            <Button
                                label="U"
                                style={{ width: "2rem" }}
                                className="p-button-text"
                                onClick={process_BATCH_UPDATE_AUTHORITY}
                            />
                        </div>
                    </span>
                    <span className="af-span-3" style={{ width: "20rem" }}>
                        <p className="af-span-p" style={{ width: "7rem" }}>Location</p>
                        <div className="af-span-div" style={{ width: "9rem" }}>
                            <InputText
                                style={{ width: "9rem" }}
                                id="id_TARGET_ETA"
                                value={dataEDT_KSV_PO_MRP.LOCATION}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_PO_MRP_LOCATION(
                                        e,
                                        "LOCATION",
                                    )
                                }
                            />
                        </div>
                        <div className="af-span-div" style={{ width: "2rem" }}>
                            <Button
                                label="U"
                                style={{ width: "2rem" }}
                                className="p-button-text"
                                onClick={process_BATCH_UPDATE_LOCATION}
                            />
                        </div>
                    </span>

                    <span className="af-span-3" style={{ width: "37rem" }}>
                        <p className="af-span-p" style={{ width: "9em" }}>Reason Remark</p>
                        <div className="af-span-div" style={{ width: "27rem" }}>
                            <Dropdown
                                style={{ width: "27rem" }}
                                id="id_REMARK"
                                value={dataEDT_KSV_PO_MRP_REASON_REMARK}
                                onChange={(e) =>
                                    onDropdownChangeEDT_KSV_PO_MRP_REASON_REMARK(
                                        e,
                                        "REASON_REMARK",
                                    )
                                }
                                options={datasEDT_KSV_PO_MRP_REASON_REMARK}
                                optionLabel="CD_NAME"
                                placeholder=""
                            ></Dropdown>
                        </div>
                    </span>

                    <span className="af-span-3" style={{ width: "20rem" }}>
                        <p className="af-span-p" style={{ width: "7rem" }}>Purpose</p>
                        <div className="af-span-div" style={{ width: "9rem" }}>
                            <Dropdown
                                style={{ width: "9rem" }}
                                id="id_PURPOSE"
                                value={dataEDT_KSV_PO_MRP_PURPOSE}
                                onChange={(e) =>
                                    onDropdownChangeEDT_KSV_PO_MRP_PURPOSE(
                                        e,
                                        "PURPOSE",
                                    )
                                }
                                options={datasEDT_KSV_PO_MRP_PURPOSE}
                                optionLabel="CD_NAME"
                                placeholder=""
                            ></Dropdown>
                        </div>
                        <div className="af-span-div" style={{ width: "2rem" }}>
                            <Button
                                label="U"
                                style={{ width: "2rem" }}
                                className="p-button-text"
                                onClick={process_BATCH_UPDATE_PURPOSE}
                            />
                        </div>
                    </span>
                    <span className="af-span-3" style={{ width: "20rem" }}>
                        <p className="af-span-p" style={{ width: "7rem" }}>Rack</p>
                        <div className="af-span-div" style={{ width: "9rem" }}>
                            <InputText
                                style={{ width: "9rem" }}
                                id="id_TARGET_ETA"
                                value={dataEDT_KSV_PO_MRP.RACK}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_PO_MRP_RACK(e, "RACK")
                                }
                            />
                        </div>
                        <div className="af-span-div" style={{ width: "2rem" }}>
                            <Button
                                label="U"
                                style={{ width: "2rem" }}
                                className="p-button-text"
                                onClick={process_BATCH_UPDATE_RACK}
                            />
                        </div>
                    </span>
                    <span className="af-span-3" style={{ width: "37rem" }}>
                        <p className="af-span-p" style={{ width: "9rem" }}>Plan Remark</p>
                        <div className="af-span-div" style={{ width: "27rem" }}>
                            <Dropdown
                                style={{ width: "27rem" }}
                                id="id_PLAN_REMARK"
                                value={dataEDT_KSV_PO_MRP_PLAN_REMARK}
                                onChange={(e) =>
                                    onDropdownChangeEDT_KSV_PO_MRP_PLAN_REMARK(
                                        e,
                                        "PLAN_REMARK",
                                    )
                                }
                                options={datasEDT_KSV_PO_MRP_PLAN_REMARK}
                                optionLabel="CD_NAME"
                                placeholder=""
                            />
                        </div>
                    </span>

                    <span className="af-span-3" style={{ width: "40.5rem" }}>
                        <p className="af-span-p" style={{ width: "7rem" }}>Remark</p>
                        <div
                            className="af-span-div"
                            style={{ width: "29.5rem" }}
                        >
                            <InputText
                                style={{ width: "29.5rem" }}
                                id="id_TARGET_ETA"
                                value={dataEDT_KSV_PO_MRP.REMARK}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_PO_MRP_REMARK(
                                        e,
                                        "REMARK",
                                    )
                                }
                            />
                        </div>
                    </span>
                    <span className="af-span-3" style={{ width: "40rem" }}>
                        <p className="af-span-p" style={{ width: "9rem" }}>Type(Bef)</p>
                        <div className="af-span-div" style={{ width: "10rem" }}>
                            <Dropdown
                                style={{ width: "10rem" }}
                                id="id_CONDITION"
                                value={dataEDT_KSV_PO_MRP_STOCK_STATUS_1}
                                onChange={(e) =>
                                    onDropdownChangeEDT_KSV_PO_MRP_STOCK_STATUS_1(
                                        e,
                                        "STOCK_STATUS_1",
                                    )
                                }
                                options={datasEDT_KSV_PO_MRP_STOCK_STATUS_1}
                                optionLabel="CD_NAME"
                                itemTemplate={conditionItemTemplate}
                                valueTemplate={conditionValueTemplate}
                                placeholder=""
                            ></Dropdown>
                        </div>
                        <div className="af-span-div" style={{ width: "10rem" }}>
                            <Dropdown
                                style={{ width: "10rem" }}
                                id="id_CONDITION"
                                value={dataEDT_KSV_PO_MRP_STOCK_STATUS_S}
                                onChange={(e) =>
                                    onDropdownChangeEDT_KSV_PO_MRP_STOCK_STATUS_S(
                                        e,
                                        "STOCK_STATUS_S",
                                    )
                                }
                                options={datasEDT_KSV_PO_MRP_STOCK_STATUS_S}
                                optionLabel="CD_NAME"
                                itemTemplate={conditionItemTemplate}
                                valueTemplate={conditionValueTemplate}
                                placeholder=""
                            ></Dropdown>
                        </div>
                        <div className="af-span-div" style={{ width: "2rem" }}>
                            <Button
                                label="U"
                                style={{ width: "2rem" }}
                                className="p-button-text"
                                onClick={process_BATCH_UPDATE_STOCK_STATUS_S}
                            />
                        </div>
                        <p className="af-span-p" style={{ width: "2rem" }}>{dataTBL_KSV_PO_MRP.STOCK_STATUS}</p>
                    </span>

                    <span className="af-span-3" style={{ width: "6.5rem" }}>
                        <p className="af-span-p" style={{ width: "6rem" }}></p>
                    </span>

                    <span className="af-span-3" style={{ width: "6rem" }}>
                        <div
                            className="af-span-div-btn"
                            style={{ width: "5rem" }}
                        >
                            <Button
                                style={{ width: "5rem" }}
                                label="Reset"
                                className="p-button-text"
                                onClick={process_RESET_EDT}
                            />
                        </div>
                    </span>
                    <span className="af-span-3" style={{ width: "6rem" }}>
                        <div
                            className="af-span-div-btn"
                            style={{ width: "5rem" }}
                        >
                            <Button
                                style={{ width: "5rem" }}
                                label="Save"
                                className="p-button-text"
                                onClick={process_STOCK_UPDATE}
                            />
                        </div>
                    </span>
                    <span className="af-span-3" style={{ width: "10rem" }}>
                        <div
                            className="af-span-div-btn"
                            style={{ width: "9rem" }}
                        >
                            <Button
                                style={{ width: "9rem" }}
                                label="Update Qty"
                                className="p-button-text"
                                onClick={popup_update_qty}
                            />
                        </div>
                    </span>
                </div>

                <div
                    className="af-div-second"
                    style={{ width: "41rem", height: "14rem" }}
                >
                    <span className="af-span-3-0" style={{ width: "24.5rem" }}>
                        <p className="af-span-p" style={{ width: "7rem" }}>
                            
                            {serviceLib.getLocaleMessage(
                                "id_Stock Price_$_ORDER_CD",
                            )}
                        </p>
                        <div className="af-span-div" style={{ width: "17rem" }}>
                            <InputText
                                style={{ width: "17rem" }}
                                id="id_TARGET_ETA"
                                value={dataEDT_KSV_PO_MRP.STOCK_PRICE}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_PO_MRP_STOCK_PRICE(
                                        e,
                                        "STOCK_PRICE",
                                    )
                                }
                            />
                        </div>
                    </span>
                    <span className="af-span-3-0" style={{ width: "13rem" }}>
                        <div
                            className="af-span-div-btn"
                            style={{ width: "12rem" }}
                        >
                            <Button
                                style={{ width: "12rem" }}
                                label="#Stock Sales"
                                className="p-button-text"
                                onClick={blankFn}
                            />
                        </div>
                    </span>

                    <span className="af-span-3" style={{ width: "24.5rem" }}>
                        <p className="af-span-p" style={{ width: "7rem" }}>Qty</p>
                        <div className="af-span-div" style={{ width: "17rem" }}>
                            <InputText
                                style={{ width: "17rem" }}
                                id="id_TARGET_ETA"
                                value={dataEDT_KSV_PO_MRP.DEFECT_QTY}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_PO_MRP_DEFECT_QTY(
                                        e,
                                        "DEFECT_QTY",
                                    )
                                }
                            />
                        </div>
                    </span>
                    <span className="af-span-3" style={{ width: "13rem" }}>
                        <div
                            className="af-span-div-btn"
                            style={{ width: "12rem" }}
                        >
                            <Button
                                style={{ width: "12rem" }}
                                label="#Stock Change"
                                className="p-button-text"
                                onClick={blankFn}
                            />
                        </div>
                    </span>

                    <span className="af-span-3" style={{ width: "24.5rem" }}>
                        <p className="af-span-p" style={{ width: "7rem" }}>Factory#</p>
                        <div className="af-span-div" style={{ width: "17rem" }}>
                            <Dropdown
                                style={{ width: "17rem" }}
                                id="id_ORIGIN_PORT"
                                value={dataEDT_KSV_PO_MRP_FACTORY_CD}
                                onChange={(e) =>
                                    onDropdownChangeEDT_KSV_PO_MRP_FACTORY_CD(
                                        e,
                                        "FACTORY_CD",
                                    )
                                }
                                options={datasEDT_KSV_PO_MRP_FACTORY_CD}
                                optionLabel="FACTORY_NAME"
                                placeholder=""
                                editable
                                filter
                            ></Dropdown>
                        </div>
                    </span>
                    <span className="af-span-3" style={{ width: "13rem" }}>
                        <div
                            className="af-span-div-btn"
                            style={{ width: "12rem" }}
                        >
                            <Button
                                style={{ width: "12rem" }}
                                label="#Stock Transfer"
                                className="p-button-text"
                                onClick={blankFn}
                            />
                        </div>
                    </span>

                    <span className="af-span-3" style={{ width: "24.5rem" }}>
                        <p className="af-span-p" style={{ width: "7rem" }}>Buyer#</p>
                        <div className="af-span-div" style={{ width: "17rem" }}>
                            <Dropdown
                                style={{ width: "17rem" }}
                                id="id_ORIGIN_PORT"
                                value={dataEDT_KSV_PO_MRP_BUYER_CD}
                                onChange={(e) =>
                                    onDropdownChangeEDT_KSV_PO_MRP_BUYER_CD(
                                        e,
                                        "BUYER_CD",
                                    )
                                }
                                options={datasEDT_KSV_PO_MRP_BUYER_CD}
                                optionLabel="BUYER_NAME"
                                placeholder=""
                                editable
                                filter
                            ></Dropdown>
                        </div>
                    </span>
                    <span className="af-span-3" style={{ width: "13rem" }}>
                        <div
                            className="af-span-div-btn"
                            style={{ width: "12rem" }}
                        >
                            <Button
                                style={{ width: "12rem" }}
                                label="#Stock Dispose"
                                className="p-button-text"
                                onClick={blankFn}
                            />
                        </div>
                    </span>
                </div>
            </div>

            <Toast ref={toast} />

            <Dialog
                visible={createDialog}
                position="top-center"
                style={{ width: "90vw" }}
                header="Update Qty"
                modal={true}
                className="p-fluid"
                onHide={hideDialog}
            >
                <div
                    className="af-div-first"
                    style={{ width: "82rem", height: "14rem" }}
                >
                    <span className="af-span-3-0" style={{ width: "20rem" }}>
                        <p className="af-span-p" style={{ width: "7rem" }}>Stock Date</p>
                        <div className="af-span-div" style={{ width: "9rem" }}>
                            <InputText
                                style={{ width: "9rem" }}
                                id="id_BL_FILE"
                                value={dataEDT_KSV_PO_MRP2.STOCK_DATE}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_PO_MRP2_STOCK_DATE(
                                        e,
                                        "STOCK_DATE",
                                    )
                                }
                            />
                        </div>
                    </span>
                    <span className="af-span-3-0" style={{ width: "20rem" }}>
                        <p className="af-span-p" style={{ width: "7rem" }}>Charger</p>
                        <div className="af-span-div" style={{ width: "9rem" }}>
                            <InputText
                                disabled
                                style={{ width: "9rem" }}
                                id="id_BL_FILE"
                                value={dataEDT_KSV_PO_MRP2.CHARGER}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_PO_MRP2_CHARGER(
                                        e,
                                        "CHARGER",
                                    )
                                }
                            />
                        </div>
                    </span>
                    <span className="af-span-3-0" style={{ width: "20rem" }}>
                        <p className="af-span-p" style={{ width: "9rem" }}>Owner Ship</p>
                        <div className="af-span-div" style={{ width: "9rem" }}>
                            <Dropdown
                                style={{ width: "9rem" }}
                                id="id_OWNER_SHIP"
                                value={dataEDT_KSV_PO_MRP2_OWNER_SHIP}
                                onChange={(e) =>
                                    onDropdownChangeEDT_KSV_PO_MRP2_OWNER_SHIP(
                                        e,
                                        "OWNER_SHIP",
                                    )
                                }
                                options={datasEDT_KSV_PO_MRP2_OWNER_SHIP}
                                optionLabel="CD_NAME"
                                placeholder=""
                            ></Dropdown>
                        </div>
                    </span>
                    <span className="af-span-3-0" style={{ width: "17rem" }}>
                        <p className="af-span-p" style={{ width: "7rem" }}>Reason</p>
                        <div className="af-span-div" style={{ width: "9rem" }}>
                            <Dropdown
                                style={{ width: "9rem" }}
                                id="id_REASON_MAKE"
                                value={dataEDT_KSV_PO_MRP2_REASON_MAKE}
                                onChange={(e) =>
                                    onDropdownChangeEDT_KSV_PO_MRP2_REASON_MAKE(
                                        e,
                                        "REASON_MAKE",
                                    )
                                }
                                options={datasEDT_KSV_PO_MRP2_REASON_MAKE}
                                optionLabel="CD_NAME"
                                itemTemplate={reasonMakeItemTemplate}
                                valueTemplate={reasonMakeValueTemplate}
                                placeholder=""
                            ></Dropdown>
                        </div>
                    </span>

                    <span className="af-span-3" style={{ width: "20rem" }}>
                        <p className="af-span-p" style={{ width: "7rem" }}>Authority</p>
                        <div className="af-span-div" style={{ width: "9rem" }}>
                            <Dropdown
                                style={{ width: "9rem" }}
                                id="id_AUTHORITY"
                                value={dataEDT_KSV_PO_MRP2_AUTHORITY}
                                onChange={(e) =>
                                    onDropdownChangeEDT_KSV_PO_MRP2_AUTHORITY(
                                        e,
                                        "AUTHORITY",
                                    )
                                }
                                options={datasEDT_KSV_PO_MRP2_AUTHORITY}
                                optionLabel="CD_NAME"
                                placeholder=""
                            ></Dropdown>
                        </div>
                    </span>
                    <span className="af-span-3" style={{ width: "20rem" }}>
                        <p className="af-span-p" style={{ width: "7rem" }}>Location</p>
                        <div className="af-span-div" style={{ width: "9rem" }}>
                            <InputText
                                style={{ width: "9rem" }}
                                id="id_TARGET_ETA"
                                value={dataEDT_KSV_PO_MRP2.LOCATION}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_PO_MRP2_LOCATION(
                                        e,
                                        "LOCATION",
                                    )
                                }
                            />
                        </div>
                    </span>
                    <span className="af-span-3" style={{ width: "37rem" }}>
                        <p className="af-span-p" style={{ width: "9em" }}>Reason Remark</p>
                        <div className="af-span-div" style={{ width: "27rem" }}>
                            <Dropdown
                                style={{ width: "27rem" }}
                                id="id_REMARK"
                                value={dataEDT_KSV_PO_MRP2_REASON_REMARK}
                                onChange={(e) =>
                                    onDropdownChangeEDT_KSV_PO_MRP2_REASON_REMARK(
                                        e,
                                        "REASON_REMARK",
                                    )
                                }
                                options={datasEDT_KSV_PO_MRP2_REASON_REMARK}
                                optionLabel="CD_NAME"
                                placeholder=""
                            ></Dropdown>
                        </div>
                    </span>

                    <span className="af-span-3" style={{ width: "20rem" }}>
                        <p className="af-span-p" style={{ width: "7rem" }}>Purpose</p>
                        <div className="af-span-div" style={{ width: "9rem" }}>
                            <Dropdown
                                style={{ width: "9rem" }}
                                id="id_PURPOSE"
                                value={dataEDT_KSV_PO_MRP2_PURPOSE}
                                onChange={(e) =>
                                    onDropdownChangeEDT_KSV_PO_MRP2_PURPOSE(
                                        e,
                                        "PURPOSE",
                                    )
                                }
                                options={datasEDT_KSV_PO_MRP2_PURPOSE}
                                optionLabel="CD_NAME"
                                placeholder=""
                            ></Dropdown>
                        </div>
                    </span>
                    <span className="af-span-3" style={{ width: "20rem" }}>
                        <p className="af-span-p" style={{ width: "7rem" }}>Rack</p>
                        <div className="af-span-div" style={{ width: "9rem" }}>
                            <InputText
                                style={{ width: "9rem" }}
                                id="id_TARGET_ETA"
                                value={dataEDT_KSV_PO_MRP2.RACK}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_PO_MRP2_RACK(e, "RACK")
                                }
                            />
                        </div>
                    </span>
                    <span className="af-span-3" style={{ width: "37rem" }}>
                        <p className="af-span-p" style={{ width: "9rem" }}>Plan Remark</p>
                        <div className="af-span-div" style={{ width: "27rem" }}>
                            <Dropdown
                                style={{ width: "27rem" }}
                                id="id_PLAN_REMARK"
                                value={dataEDT_KSV_PO_MRP2_PLAN_REMARK}
                                onChange={(e) =>
                                    onDropdownChangeEDT_KSV_PO_MRP2_PLAN_REMARK(
                                        e,
                                        "PLAN_REMARK",
                                    )
                                }
                                options={datasEDT_KSV_PO_MRP2_PLAN_REMARK}
                                optionLabel="CD_NAME"
                                placeholder=""
                            />
                        </div>
                    </span>

                    <span className="af-span-3" style={{ width: "40.5rem" }}>
                        <p className="af-span-p" style={{ width: "7rem" }}>Remark</p>
                        <div
                            className="af-span-div"
                            style={{ width: "29.5rem" }}
                        >
                            <InputText
                                style={{ width: "29.5rem" }}
                                id="id_TARGET_ETA"
                                value={dataEDT_KSV_PO_MRP2.REMARK}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_PO_MRP2_REMARK(
                                        e,
                                        "REMARK",
                                    )
                                }
                            />
                        </div>
                    </span>
                    <span className="af-span-3" style={{ width: "40rem" }}>
                        <p className="af-span-p" style={{ width: "9rem" }}>Type(Bef)</p>
                        <div className="af-span-div" style={{ width: "10rem" }}>
                            <Dropdown
                                style={{ width: "10rem" }}
                                id="id_CONDITION"
                                value={dataEDT_KSV_PO_MRP_STOCK_STATUS_1}
                                onChange={(e) =>
                                    onDropdownChangeEDT_KSV_PO_MRP_STOCK_STATUS_1(
                                        e,
                                        "STOCK_STATUS_1",
                                    )
                                }
                                options={datasEDT_KSV_PO_MRP_STOCK_STATUS_1}
                                optionLabel="CD_NAME"
                                itemTemplate={conditionItemTemplate}
                                valueTemplate={conditionValueTemplate}
                                placeholder=""
                            ></Dropdown>
                        </div>
                        <div className="af-span-div" style={{ width: "10rem" }}>
                            <Dropdown
                                style={{ width: "10rem" }}
                                id="id_CONDITION"
                                value={dataEDT_KSV_PO_MRP_STOCK_STATUS_S}
                                onChange={(e) =>
                                    onDropdownChangeEDT_KSV_PO_MRP_STOCK_STATUS_S(
                                        e,
                                        "STOCK_STATUS_S",
                                    )
                                }
                                options={datasEDT_KSV_PO_MRP_STOCK_STATUS_S}
                                optionLabel="CD_NAME"
                                itemTemplate={conditionItemTemplate}
                                valueTemplate={conditionValueTemplate}
                                placeholder=""
                            ></Dropdown>
                        </div>
                        <div className="af-span-div" style={{ width: "2rem" }}>
                            <Button
                                label="U"
                                style={{ width: "2rem" }}
                                className="p-button-text"
                                onClick={process_BATCH_UPDATE_STOCK_STATUS_S}
                            />
                        </div>
                        <p className="af-span-p" style={{ width: "2rem" }}>{dataTBL_KSV_PO_MRP.STOCK_STATUS}</p>
                    </span>

                    <span className="af-span-3" style={{ width: "24.5rem" }}>
                        <p className="af-span-p" style={{ width: "7rem" }}>Qty</p>
                        <div className="af-span-div" style={{ width: "17rem" }}>
                            <InputText
                                style={{ width: "17rem" }}
                                id="id_TARGET_ETA"
                                value={dataEDT_KSV_PO_MRP2.DEFECT_QTY}
                                onChange={(e) =>
                                    onInputChangeEDT_KSV_PO_MRP2_DEFECT_QTY(
                                        e,
                                        "DEFECT_QTY",
                                    )
                                }
                            />
                        </div>
                    </span>
                    <span className="af-span-3" style={{ width: "24.5rem" }}>
                        <p className="af-span-p" style={{ width: "7rem" }}>Factory#</p>
                        <div className="af-span-div" style={{ width: "17rem" }}>
                            <Dropdown
                                style={{ width: "17rem" }}
                                id="id_ORIGIN_PORT"
                                value={dataEDT_KSV_PO_MRP2_FACTORY_CD}
                                onChange={(e) =>
                                    onDropdownChangeEDT_KSV_PO_MRP2_FACTORY_CD(
                                        e,
                                        "FACTORY_CD",
                                    )
                                }
                                options={datasEDT_KSV_PO_MRP2_FACTORY_CD}
                                optionLabel="FACTORY_NAME"
                                placeholder=""
                                editable
                                filter
                            ></Dropdown>
                        </div>
                    </span>
                    <span className="af-span-3" style={{ width: "24.5rem" }}>
                        <p className="af-span-p" style={{ width: "7rem" }}>Buyer#</p>
                        <div className="af-span-div" style={{ width: "17rem" }}>
                            <Dropdown
                                style={{ width: "17rem" }}
                                id="id_ORIGIN_PORT"
                                value={dataEDT_KSV_PO_MRP2_BUYER_CD}
                                onChange={(e) =>
                                    onDropdownChangeEDT_KSV_PO_MRP2_BUYER_CD(
                                        e,
                                        "BUYER_CD",
                                    )
                                }
                                options={datasEDT_KSV_PO_MRP2_BUYER_CD}
                                optionLabel="BUYER_NAME"
                                placeholder=""
                                editable
                                filter
                            ></Dropdown>
                        </div>
                    </span>


                    <span className="af-span-3" style={{ width: "6.5rem" }}>
                        <p className="af-span-p" style={{ width: "6rem" }}></p>
                    </span>
                    <span className="af-span-3" style={{ width: "6rem" }}>
                        <div
                            className="af-span-div-btn"
                            style={{ width: "5rem" }}
                        >
                            <Button
                                style={{ width: "5rem" }}
                                label="Save"
                                className="p-button-text"
                                onClick={process_UPDATE_QTY}
                            />
                        </div>
                    </span>
                    <span className="af-span-3" style={{ width: "10rem" }}>
                        <div
                            className="af-span-div-btn"
                            style={{ width: "9rem" }}
                        >
                            <Button
                                style={{ width: "9rem" }}
                                label="Exit"
                                className="p-button-text"
                                onClick={un_popup_update_qty}
                            />
                        </div>
                    </span>
                </div>
            </Dialog>
        </div>
    );
};

const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(S0523_STOCK_MANAGER, comparisonFn);
